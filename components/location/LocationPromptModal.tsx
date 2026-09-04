import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Search,
  CheckCircle2,
  X,
  Sparkles,
  Loader2,
  Building2,
  ShieldCheck,
  Globe2,
} from 'lucide-react';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { POPULAR_INDIAN_LOCATIONS, locationService } from '@/src/services/locationService';
import { NormalizedLocation } from '@/src/contracts/location';
import { InteractiveMapPickerModal } from './InteractiveMapPickerModal';

export interface LocationPromptModalProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export const LocationPromptModal: React.FC<LocationPromptModalProps> = ({
  forceOpen = false,
  onClose,
}) => {
  const {
    location,
    setLocation,
    resolvePincode,
    resolvePincodePostOffices,
    resolveLocation,
    verifyLocation,
    detectLocation,
    t,
  } = useArchitectAny();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<NormalizedLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isWrongName, setIsWrongName] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Initial Check: Try Auto-Detect if permission already granted, or setup first-click trigger
  useEffect(() => {
    // Check if location is already stored in this session
    const isAlreadySet = locationService.isLocationSetInSession();
    const isPromptSeen = locationService.hasPromptBeenDismissed();

    if (isAlreadySet || isPromptSeen) {
      return;
    }

    let hasHandledFirstClick = false;

    // Check if navigator geolocation permission is already granted
    if (typeof navigator !== 'undefined' && 'permissions' in navigator) {
      navigator.permissions
        ?.query({ name: 'geolocation' as PermissionName })
        ?.then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            // Already granted: automatically silently detect location
            detectLocation().catch(() => {});
            return;
          }
        })
        ?.catch(() => {
          // Ignore permissions query failures (e.g. in some iframe environments)
        });
    }

    // First interaction listener: when user clicks any area for the first time
    const handleFirstUserInteraction = (event: MouseEvent) => {
      // Avoid intercepting if already set or modal opened
      if (hasHandledFirstClick) return;

      const sessionSet = locationService.isLocationSetInSession();
      const promptSeen = locationService.hasPromptBeenDismissed();

      if (!sessionSet && !promptSeen) {
        hasHandledFirstClick = true;
        setIsOpen(true);
      }
    };

    // Attach click listener to document
    const timer = setTimeout(() => {
      document.addEventListener('click', handleFirstUserInteraction, { once: true });
    }, 400);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleFirstUserInteraction);
    };
  }, [detectLocation]);

  // Sync with forceOpen prop if provided
  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  const handleClose = useCallback(() => {
    locationService.markPromptDismissed();
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  // GPS Auto-detect Trigger
  const handleDetectGps = async () => {
    setIsDetectingGps(true);
    setGpsError(null);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser.');
      }

      await new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const res = await locationService.getProvider().reverseGeocode(latitude, longitude);
              if (res) {
                setLocation(res);
              } else {
                setLocation({
                  latitude,
                  longitude,
                  displayName: `GPS (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`,
                  source: 'gps',
                });
              }
              resolve();
            } catch (err) {
              reject(err);
            }
          },
          (error) => {
            reject(new Error(error.message || 'Location access was denied or timed out.'));
          },
          { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
        );
      });

      handleClose();
    } catch (err: any) {
      setGpsError(err.message || 'Could not fetch current GPS coordinates.');
    } finally {
      setIsDetectingGps(false);
    }
  };

  // Search by Pincode / City
  const handleSearchChange = (val: string) => {
    setQuery(val);
    setGpsError(null);
    setIsWrongName(false);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const trimmed = val.trim();
    if (!trimmed) {
      setSearchResults([]);
      setIsWrongName(false);
      return;
    }

    setIsSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        if (/^\d{6}$/.test(trimmed)) {
          const poList = await resolvePincodePostOffices(trimmed);
          if (poList && poList.length > 0) {
            setSearchResults(poList);
            setIsWrongName(false);
          } else {
            const pinRes = await resolvePincode(trimmed);
            if (pinRes) {
              setSearchResults([pinRes]);
              setIsWrongName(false);
            } else {
              setSearchResults([]);
              setIsWrongName(true);
            }
          }
        } else {
          // Verify by live map / OSM geocoding
          const verification = await verifyLocation(trimmed);
          if (verification.verified && verification.candidates.length > 0) {
            setSearchResults(verification.candidates);
            setIsWrongName(false);
          } else {
            // Search in popular local database
            const matchedPopular = POPULAR_INDIAN_LOCATIONS.filter((l) =>
              l.city.toLowerCase().includes(trimmed.toLowerCase()) ||
              l.area?.toLowerCase().includes(trimmed.toLowerCase()) ||
              l.pincode?.includes(trimmed) ||
              l.state.toLowerCase().includes(trimmed.toLowerCase()),
            );

            if (matchedPopular.length > 0) {
              setSearchResults(matchedPopular);
              setIsWrongName(false);
            } else {
              setSearchResults([]);
              setIsWrongName(true);
            }
          }
        }
      } catch {
        setSearchResults([]);
        setIsWrongName(true);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  const handleSelectLocation = (loc: NormalizedLocation) => {
    setLocation(loc);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#010711]/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-[#021324] border border-[#00e3fd]/40 rounded-3xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,227,253,0.15)] text-[#eaf7ff] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#00e3fd]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#0099ff]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#7198af] hover:text-[#eaf7ff] hover:bg-[#00dfff]/10 transition-colors"
          title="Dismiss and keep default"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#00e3fd]/15 border border-[#00e3fd]/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,227,253,0.3)] shrink-0">
            <Compass className="w-6 h-6 text-[#00e3fd] animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00e3fd] uppercase px-2 py-0.5 rounded bg-[#00e3fd]/10 border border-[#00e3fd]/30">
                Location Intelligence
              </span>
            </div>
            <h3 id="location-modal-title" className="text-lg font-bold text-[#eaf7ff] mt-1 font-mono">
              Set Your Operating Location
            </h3>
            <p className="text-xs text-[#789fb7] mt-0.5 leading-relaxed">
              Personalize spatial GIS radar, domain services, and solution dispatch for your region.
            </p>
          </div>
        </div>

        {/* Action 1: One-Click Browser/Mobile GPS Detect */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleDetectGps}
            disabled={isDetectingGps}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00dfff] to-[#0099ff] hover:from-[#38e6ff] hover:to-[#1aa3ff] text-[#001f24] font-bold text-sm font-mono shadow-[0_0_25px_rgba(0,227,253,0.4)] transition-all cursor-pointer select-none active:scale-[0.99]"
          >
            {isDetectingGps ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#001f24]" />
                <span>Detecting Device Coordinates...</span>
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 text-[#001f24] fill-[#001f24] -rotate-45" />
                <span>Use Current Browser / Mobile Location</span>
              </>
            )}
          </button>

          {gpsError && (
            <p className="mt-2 text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl p-2.5">
              {gpsError} Please enter your pincode or select a city below.
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-[#00dfff]/20"></div>
          <span className="flex-shrink mx-3 text-[10px] font-mono text-[#5f879e] uppercase tracking-wider">
            Or search pincode / city
          </span>
          <div className="flex-grow border-t border-[#00dfff]/20"></div>
        </div>

        {/* Action 2: Input search for Pincode or City */}
        <div className="relative mb-4">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#00dfff] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Enter 6-digit Pincode (e.g. 629601) or City..."
              className={`w-full bg-[#010d1a] border ${
                isWrongName ? 'border-amber-500/60 focus:border-amber-400' : 'border-[#00dfff]/35 focus:border-[#00e3fd]'
              } text-[#eaf7ff] placeholder-[#9ec4db] rounded-xl pl-10 pr-16 py-2.5 text-xs font-mono outline-none transition-all focus:shadow-[0_0_20px_rgba(0,227,253,0.2)]`}
            />
            <div className="absolute right-3 flex items-center gap-1.5">
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSearchResults([]);
                    setIsWrongName(false);
                  }}
                  className="text-[#7ea5bd] hover:text-[#eaf7ff] p-1 cursor-pointer"
                  title="Clear"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              {isSearching && (
                <Loader2 className="w-4 h-4 text-[#00dfff] animate-spin" />
              )}
            </div>
          </div>

          {/* Search suggestions dropdown if typing */}
          {searchResults.length > 0 && (
            <div className="mt-1.5 bg-[#010e1c] border border-[#00dfff]/40 rounded-xl max-h-48 overflow-y-auto custom-scrollbar divide-y divide-[#00dfff]/10 shadow-xl">
              {searchResults.map((res) => (
                <button
                  key={res.id || `${res.pincode}-${res.city}`}
                  type="button"
                  onClick={() => handleSelectLocation(res)}
                  className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-[#00dfff]/20 text-xs font-mono text-[#f0f9ff] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#00dfff] shrink-0" />
                    <span className="font-bold truncate text-[#f0f9ff]">{res.displayName || res.city}</span>
                    {res.pincode && (
                      <span className="px-1.5 py-0.5 rounded bg-[#00dfff]/25 text-[#00e3fd] text-[10px] font-bold">
                        {res.pincode}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#a2cbdf] shrink-0 ml-2 font-semibold">{res.state}</span>
                </button>
              ))}
            </div>
          )}

          {/* Unverified Name / Wrong Name Fallback */}
          {isWrongName && !isSearching && (
            <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs font-mono">
              <div className="font-bold text-amber-300">
                Location &quot;{query}&quot; unverified on live map
              </div>
              <div className="text-[11px] text-amber-200/80 mt-0.5">
                Could not verify &quot;{query}&quot;. Pick your exact position directly on the interactive map:
              </div>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(true)}
                className="mt-2 w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                Open Interactive Map to Pinpoint
              </button>
            </div>
          )}
        </div>

        {/* Action 3: Quick Select Popular Regional Tech Hubs */}
        <div className="mb-5">
          <div className="text-[11px] font-mono text-[#6e9ab2] mb-2 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#00dfff]" />
            Quick Select Major City Hubs:
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto custom-scrollbar">
            {POPULAR_INDIAN_LOCATIONS.map((loc) => {
              const isSelected =
                location.city === loc.city && (!loc.pincode || location.pincode === loc.pincode);

              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleSelectLocation(loc)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all flex items-center gap-1 select-none cursor-pointer ${
                    isSelected
                      ? 'bg-[#00e3fd] text-[#001f24] font-bold shadow-[0_0_12px_rgba(0,227,253,0.5)]'
                      : 'bg-[#01172a] hover:bg-[#022849] text-[#8cb4cc] hover:text-[#eaf7ff] border border-[#00dfff]/20'
                  }`}
                >
                  <span>{loc.city}</span>
                  {loc.pincode && (
                    <span className="text-[10px] opacity-75 font-sans">({loc.pincode})</span>
                  )}
                  {isSelected && <CheckCircle2 className="w-3 h-3 text-[#001f24] ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info & Dismiss Action */}
        <div className="pt-3 border-t border-[#00dfff]/15 flex items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[10px] text-[#5f879e] flex items-center gap-1 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00dfff] shrink-0" />
            Saved for this session until close out
          </span>

          <button
            type="button"
            onClick={handleClose}
            className="px-3.5 py-1.5 rounded-xl bg-[#021f37] hover:bg-[#032d50] text-[#a2cbdf] hover:text-[#eaf7ff] border border-[#00dfff]/30 transition-colors text-xs font-mono font-medium whitespace-nowrap cursor-pointer"
          >
            Keep {location.city || 'Default'}
          </button>
        </div>
      </div>

      {isMapModalOpen && (
        <InteractiveMapPickerModal
          initialLocation={location}
          onSelect={(loc) => {
            handleSelectLocation(loc);
            setIsMapModalOpen(false);
          }}
          onClose={() => setIsMapModalOpen(false)}
        />
      )}
    </div>
  );
};
