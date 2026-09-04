import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Search,
  Check,
  ChevronDown,
  Globe,
  Map as MapIcon,
  Compass,
  Loader2,
  X,
} from 'lucide-react';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { POPULAR_INDIAN_LOCATIONS } from '@/src/services/locationService';
import { NormalizedLocation } from '@/src/contracts/location';

export interface LocationSelectorProps {
  onOpenMapModal?: (prefillQuery?: string) => void;
  className?: string;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onOpenMapModal,
  className = '',
}) => {
  const { location, setLocation, resolveLocation, resolvePincode, detectLocation, verifyLocation, mapConfig, t } = useArchitectAny();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pincodeInput, setPincodeInput] = useState('');
  const [detecting, setDetecting] = useState(false);
  const [resolvingPin, setResolvingPin] = useState(false);
  const [resolvingSearch, setResolvingSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocation = (loc: NormalizedLocation) => {
    setLocation(loc);
    setIsOpen(false);
  };

  const handleDetectGPS = async () => {
    setDetecting(true);
    try {
      await detectLocation();
    } finally {
      setDetecting(false);
      setIsOpen(false);
    }
  };

  const handlePincodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.trim().length >= 6) {
      setResolvingPin(true);
      try {
        await resolvePincode(pincodeInput.trim());
        setPincodeInput('');
        setIsOpen(false);
      } finally {
        setResolvingPin(false);
      }
    }
  };

  const handleSearchQuerySubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setResolvingSearch(true);
    try {
      if (/^\d{6}$/.test(trimmed)) {
        await resolvePincode(trimmed);
        setSearchQuery('');
        setIsOpen(false);
      } else {
        const ver = await verifyLocation(trimmed);
        if (ver.verified && ver.candidates.length > 0) {
          setLocation(ver.candidates[0]);
          setSearchQuery('');
          setIsOpen(false);
        } else {
          const res = await resolveLocation(trimmed);
          if (res) {
            setLocation(res);
            setSearchQuery('');
            setIsOpen(false);
          }
        }
      }
    } catch (err) {
      console.warn('Search query resolution failed:', err);
    } finally {
      setResolvingSearch(false);
    }
  };

  // Filtered popular locations
  const filteredLocations = POPULAR_INDIAN_LOCATIONS.filter((loc) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      loc.city?.toLowerCase().includes(q) ||
      loc.area?.toLowerCase().includes(q) ||
      loc.pincode?.includes(q) ||
      loc.district?.toLowerCase().includes(q)
    );
  });

  const displayShort = location.city
    ? `${location.city} · ${location.pincode || location.country || 'IN'}`
    : 'IN · Location';

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Location Badge on Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#021425]/80 hover:bg-[#031d36] border border-[#00dfff]/25 hover:border-[#00e3fd]/60 text-[#a2c8dc] hover:text-[#eaf7ff] text-xs font-mono select-none transition-all shadow-sm group"
        title={`Active Location: ${location.displayName || displayShort}`}
      >
        <MapPin className="w-3.5 h-3.5 text-[#00dfff] group-hover:scale-110 transition-transform" />
        <span className="max-w-[120px] sm:max-w-[140px] truncate font-semibold text-[#dff4ff]">
          {displayShort}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[#6e9bb3] group-hover:text-[#00e3fd] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#00e3fd]' : ''
          }`}
        />
      </button>

      {/* Location Selection Modal / Dropdown */}
      {isOpen && (
        <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-80 sm:w-96 bg-[#021324]/95 border border-[#00dfff]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(0,227,253,0.18)] backdrop-blur-2xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#00dfff]/20">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#00dfff]" />
              <strong className="text-xs font-bold uppercase tracking-wider text-[#eaf7ff] font-sans">
                {t('spatial_service_layer')}
              </strong>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00dfff]/10 text-[#00dfff] border border-[#00dfff]/20 font-medium">
              {t('live_indian_gis')}
            </span>
          </div>

          {/* Quick GPS Detector */}
          <div className="pt-3 pb-2">
            <button
              type="button"
              onClick={handleDetectGPS}
              disabled={detecting}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#00dfff]/15 hover:bg-[#00dfff]/25 text-[#00e3fd] border border-[#00dfff]/35 text-xs font-mono font-bold transition-all group cursor-pointer"
            >
              <Navigation className={`w-3.5 h-3.5 ${detecting ? 'animate-spin' : 'group-hover:rotate-45 transition-transform'}`} />
              {detecting ? t('resolving') : t('use_current_location')}
            </button>
          </div>

          {/* Pincode Resolution Box (Direct India Post API) */}
          <form onSubmit={handlePincodeSubmit} className="py-1.5">
            <div className="flex items-center gap-1.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder={t('enter_pincode')}
                  className="w-full bg-[#010e1a] border border-[#00dfff]/30 focus:border-[#00e3fd] text-[#eaf7ff] placeholder-[#9ec4db] text-xs rounded-xl px-3 py-2 pr-7 outline-none font-mono transition-all"
                />
                {pincodeInput && (
                  <button
                    type="button"
                    onClick={() => setPincodeInput('')}
                    className="absolute right-2 top-2.5 text-[#7aa1b8] hover:text-[#eaf7ff]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={pincodeInput.length < 6 || resolvingPin}
                className="px-3 py-2 rounded-xl bg-[#00e3fd]/20 hover:bg-[#00e3fd]/30 disabled:opacity-40 text-[#00e3fd] border border-[#00e3fd]/50 text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0"
              >
                {resolvingPin ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  t('resolve')
                )}
              </button>
            </div>
          </form>

          {/* Search Filter & Resolver for Locations */}
          <form onSubmit={handleSearchQuerySubmit} className="py-1.5">
            <div className="flex items-center gap-1.5">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-[#00dfff] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_location_placeholder')}
                  className="w-full bg-[#010e1a] border border-[#00dfff]/30 focus:border-[#00e3fd] text-[#eaf7ff] placeholder-[#9ec4db] text-xs rounded-xl pl-8 pr-7 py-2 outline-none font-mono transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-2.5 text-[#7aa1b8] hover:text-[#eaf7ff]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={!searchQuery.trim() || resolvingSearch}
                className="px-3 py-2 rounded-xl bg-[#00e3fd]/20 hover:bg-[#00e3fd]/30 disabled:opacity-40 text-[#00e3fd] border border-[#00e3fd]/50 text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0"
              >
                {resolvingSearch ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  t('resolve')
                )}
              </button>
            </div>
          </form>

          {/* Popular Cities / Hubs List */}
          <div className="mt-2 max-h-44 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            <div className="text-[10px] font-mono text-[#8cb6cf] uppercase tracking-wider px-1 py-0.5 font-bold">
              {t('regional_hubs')}
            </div>

            {filteredLocations.map((loc) => {
              const isSelected =
                loc.pincode === location.pincode ||
                (loc.city === location.city && loc.area === location.area);

              return (
                <button
                  key={`${loc.city}-${loc.pincode}-${loc.area}`}
                  type="button"
                  onClick={() => handleSelectLocation(loc)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00dfff]/20 border border-[#00dfff]/50 text-[#00e3fd] font-bold'
                      : 'hover:bg-[#03223d] text-[#e0f2fe] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#00dfff]" />
                    <div className="flex flex-col truncate">
                      <span className="truncate font-semibold text-[#f0f9ff]">{loc.city}, {loc.stateCode}</span>
                      <span className="text-[10.5px] text-[#9fc7de]">
                        {loc.area} · Pin: <span className="text-[#00e3fd] font-bold">{loc.pincode}</span>
                      </span>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-[#00e3fd] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* View Map Action Footer */}
          {onOpenMapModal && (
            <div className="pt-3 mt-2 border-t border-[#00dfff]/20">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  const activePrefill =
                    searchQuery.trim() ||
                    pincodeInput.trim() ||
                    location.pincode ||
                    location.city ||
                    location.displayName ||
                    '';
                  onOpenMapModal(activePrefill);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#00e3fd]/15 hover:bg-[#00e3fd]/25 text-[#00e3fd] border border-[#00e3fd]/40 text-xs font-mono font-bold transition-all shadow-sm group cursor-pointer"
              >
                <MapIcon className="w-3.5 h-3.5 text-[#00dfff] group-hover:rotate-12 transition-transform" />
                {t('view_spatial_map')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
