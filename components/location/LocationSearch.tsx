import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Navigation,
  Loader2,
  Check,
  X,
  Compass,
  Building2,
  AlertCircle,
  Map as MapIcon,
  ShieldCheck,
  Crosshair,
} from 'lucide-react';
import { NormalizedLocation } from '@/src/contracts/location';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { POPULAR_INDIAN_LOCATIONS, locationService } from '@/src/services/locationService';
import { InteractiveMapPickerModal } from './InteractiveMapPickerModal';

export interface LocationSearchProps {
  onSelectLocation?: (location: NormalizedLocation) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  compact?: boolean;
  showCurrentLocationBtn?: boolean;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  onSelectLocation,
  placeholder = 'Enter pincode (e.g. 629601) or city/post office...',
  className = '',
  autoFocus = false,
  compact = false,
  showCurrentLocationBtn = true,
}) => {
  const {
    location,
    setLocation,
    resolveLocation,
    resolvePincode,
    resolvePincodePostOffices,
    verifyLocation,
    detectLocation,
    t,
  } = useArchitectAny();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<NormalizedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isWrongName, setIsWrongName] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleInputChange = (val: string) => {
    setQuery(val);
    setIsOpen(true);
    setIsWrongName(false);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const trimmed = val.trim();
    if (!trimmed) {
      setSuggestions(POPULAR_INDIAN_LOCATIONS.slice(0, 6));
      setIsWrongName(false);
      return;
    }

    // 1. Check if 6-digit Pincode (e.g., 629601 Parakkai)
    if (/^\d{6}$/.test(trimmed)) {
      setIsLoading(true);
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const poList = await resolvePincodePostOffices(trimmed);
          if (poList && poList.length > 0) {
            setSuggestions(poList);
            setIsWrongName(false);
          } else {
            const single = await resolvePincode(trimmed);
            if (single) {
              setSuggestions([single]);
              setIsWrongName(false);
            } else {
              setSuggestions([]);
              setIsWrongName(true);
            }
          }
        } catch {
          setSuggestions([]);
          setIsWrongName(true);
        } finally {
          setIsLoading(false);
        }
      }, 300);
      return;
    }

    // 2. Name entered: Verify by Map (OSM & Postal DB)
    setIsLoading(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const verification = await verifyLocation(trimmed);
        if (verification.verified && verification.candidates.length > 0) {
          setSuggestions(verification.candidates);
          setIsWrongName(false);
        } else {
          // Check offline matches as backup
          const matched = POPULAR_INDIAN_LOCATIONS.filter((loc) => {
            const q = trimmed.toLowerCase();
            return (
              loc.city.toLowerCase().includes(q) ||
              loc.area?.toLowerCase().includes(q) ||
              loc.pincode?.includes(q) ||
              loc.state.toLowerCase().includes(q) ||
              loc.displayName.toLowerCase().includes(q)
            );
          });

          if (matched.length > 0) {
            setSuggestions(matched);
            setIsWrongName(false);
          } else {
            setSuggestions([]);
            setIsWrongName(true);
          }
        }
      } catch {
        setSuggestions([]);
        setIsWrongName(true);
      } finally {
        setIsLoading(false);
      }
    }, 350);
  };

  const handleSelect = (loc: NormalizedLocation) => {
    setLocation(loc);
    setQuery(loc.displayName || loc.city);
    setIsOpen(false);
    setIsWrongName(false);
    onSelectLocation?.(loc);
  };

  const handleGpsDetect = async () => {
    setIsDetectingGps(true);
    try {
      await detectLocation();
      setIsOpen(false);
    } finally {
      setIsDetectingGps(false);
    }
  };

  return (
    <>
      <div ref={containerRef} className={`relative w-full ${className}`}>
        <div className="relative flex items-center">
          <div className="absolute left-3 text-[#00dfff] pointer-events-none flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => {
              setIsOpen(true);
              if (!query.trim()) {
                setSuggestions(POPULAR_INDIAN_LOCATIONS.slice(0, 6));
              }
            }}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={`w-full bg-[#021324]/90 border ${
              isWrongName ? 'border-amber-500/60 focus:border-amber-400' : 'border-[#00dfff]/30 focus:border-[#00e3fd]'
            } text-[#eaf7ff] placeholder-[#9ec4db] rounded-xl pl-9 pr-28 ${
              compact ? 'py-1.5 text-xs' : 'py-2.5 text-sm'
            } outline-none transition-all shadow-[0_0_15px_rgba(0,0,0,0.4)] focus:shadow-[0_0_20px_rgba(0,227,253,0.2)] font-mono`}
          />

          <div className="absolute right-2 flex items-center gap-1">
            {isLoading && <Loader2 className="w-4 h-4 text-[#00dfff] animate-spin" />}
            {query && !isLoading && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSuggestions(POPULAR_INDIAN_LOCATIONS.slice(0, 6));
                  setIsWrongName(false);
                }}
                className="p-1 text-[#8bb4cc] hover:text-[#eaf7ff] transition-colors cursor-pointer"
                title="Clear text"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Open Map Button */}
            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              title="Pinpoint on Interactive Map"
              className="p-1.5 rounded-lg bg-[#00dfff]/15 hover:bg-[#00dfff]/25 text-[#00e3fd] border border-[#00dfff]/35 transition-all flex items-center justify-center cursor-pointer"
            >
              <MapIcon className="w-3.5 h-3.5" />
            </button>

            {showCurrentLocationBtn && (
              <button
                type="button"
                onClick={handleGpsDetect}
                disabled={isDetectingGps}
                title="Detect GPS Location"
                className="p-1.5 rounded-lg bg-[#00dfff]/15 hover:bg-[#00dfff]/25 text-[#00dfff] border border-[#00dfff]/35 transition-all flex items-center justify-center cursor-pointer"
              >
                {isDetectingGps ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Navigation className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Autocomplete & Verification Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#021120] border border-[#00dfff]/40 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,227,253,0.1)] z-50 overflow-hidden max-h-72 overflow-y-auto custom-scrollbar">
            <div className="p-2 border-b border-[#00dfff]/15 bg-[#02182b]/80 flex items-center justify-between text-[11px] font-mono text-[#8eb5ce]">
              <span className="flex items-center gap-1.5 font-semibold">
                <Compass className="w-3 h-3 text-[#00dfff]" />
                {t('select_target_location')}
              </span>
              <span className="text-[10px] text-[#00e3fd] font-bold">
                {location.city ? `Current: ${location.city} (${location.pincode || ''})` : ''}
              </span>
            </div>

            <div className="py-1 divide-y divide-[#00dfff]/10">
              {/* Quick GPS Item */}
              <button
                type="button"
                onClick={handleGpsDetect}
                className="w-full px-3 py-2 text-left flex items-center gap-2.5 hover:bg-[#00dfff]/15 text-xs text-[#00e3fd] transition-colors group cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#00dfff] group-hover:scale-110 transition-transform shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[#eaf7ff]">{t('use_current_gps_location')}</div>
                  <div className="text-[10.5px] text-[#9fc7de] font-mono">
                    Auto reverse-geocoding via GPS
                  </div>
                </div>
              </button>

              {/* Suggestions / Verified Locations */}
              {suggestions.map((loc) => {
                const isSelected =
                  location.pincode === loc.pincode ||
                  (location.city === loc.city && location.area === loc.area);

                const isPincodePostOffice = loc.source === 'pincode';

                return (
                  <button
                    key={loc.id || `${loc.pincode}-${loc.city}-${loc.area}`}
                    type="button"
                    onClick={() => handleSelect(loc)}
                    className={`w-full px-3 py-2.5 text-left flex items-start gap-2.5 hover:bg-[#00dfff]/15 transition-colors text-xs cursor-pointer ${
                      isSelected ? 'bg-[#00dfff]/20 text-[#00e3fd]' : 'text-[#f0f9ff]'
                    }`}
                  >
                    <MapPin
                      className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                        isSelected ? 'text-[#00e3fd]' : 'text-[#00dfff]'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold flex items-center gap-2 flex-wrap text-[#eaf7ff]">
                        <span className="truncate">{loc.city || loc.displayName}</span>
                        {loc.pincode && (
                          <span className="px-1.5 py-0.5 rounded bg-[#00dfff]/25 text-[#00e3fd] font-mono text-[10px] font-bold">
                            {loc.pincode}
                          </span>
                        )}
                        {isPincodePostOffice && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/25 text-emerald-300 font-mono text-[9.5px] font-semibold">
                            Post Office
                          </span>
                        )}
                        {loc.source === 'search' && (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-500/25 text-cyan-300 font-mono text-[9.5px] font-semibold flex items-center gap-0.5">
                            <ShieldCheck className="w-2.5 h-2.5" /> Map Verified
                          </span>
                        )}
                      </div>
                      <div className="text-[10.5px] text-[#9fc7de] font-mono truncate mt-0.5">
                        {loc.district && `${loc.district}, `}{loc.state}, {loc.countryName || 'India'}
                        {loc.latitude && loc.longitude ? ` · (${loc.latitude.toFixed(3)}, ${loc.longitude.toFixed(3)})` : ''}
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#00e3fd] shrink-0 mt-0.5" />}
                  </button>
                );
              })}

              {/* If Name was entered but unverified / wrong, show Map prompt */}
              {isWrongName && !isLoading && (
                <div className="p-3 bg-amber-500/10 border-t border-amber-500/30 text-amber-200">
                  <div className="flex items-start gap-2 text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-amber-300">
                        Location &quot;{query}&quot; unverified on Map
                      </div>
                      <div className="text-[11px] text-amber-200/80 mt-0.5 leading-tight">
                        Could not locate &quot;{query}&quot;. Please pick your exact position on the interactive map:
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setIsMapModalOpen(true);
                    }}
                    className="mt-2.5 w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <MapIcon className="w-3.5 h-3.5" />
                    Open Map to Pinpoint Location
                  </button>
                </div>
              )}

              {suggestions.length === 0 && !isWrongName && !isLoading && (
                <div className="p-4 text-center text-xs text-[#5d859b] font-mono">
                  {t('no_matching_locations_found')}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Map Picker Modal */}
      {isMapModalOpen && (
        <InteractiveMapPickerModal
          initialLocation={location}
          onSelect={(loc) => {
            handleSelect(loc);
            setIsMapModalOpen(false);
          }}
          onClose={() => setIsMapModalOpen(false)}
        />
      )}
    </>
  );
};


