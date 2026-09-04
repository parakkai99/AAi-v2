import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  X,
  Loader2,
  Map as MapIcon,
  Navigation,
  Search,
} from 'lucide-react';
import { NormalizedLocation } from '@/src/contracts/location';
import { locationService } from '@/src/services/locationService';

export interface InteractiveMapPickerModalProps {
  initialLocation: NormalizedLocation;
  onSelect: (loc: NormalizedLocation) => void;
  onClose: () => void;
}

export const InteractiveMapPickerModal: React.FC<InteractiveMapPickerModalProps> = ({
  initialLocation,
  onSelect,
  onClose,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const [currentLoc, setCurrentLoc] = useState<NormalizedLocation>(initialLocation);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchJump = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setIsSearching(true);
    try {
      let resolved: NormalizedLocation | null = null;
      if (/^\d{6}$/.test(query)) {
        resolved = await locationService.resolvePincode(query);
      } else {
        const ver = await locationService.verifyLocationByName(query);
        if (ver.verified && ver.candidates.length > 0) {
          resolved = ver.candidates[0];
        } else {
          resolved = await locationService.resolveLocationInput(query);
        }
      }

      if (resolved && resolved.latitude && resolved.longitude && mapInstanceRef.current && markerRef.current) {
        setCurrentLoc(resolved);
        mapInstanceRef.current.setView([resolved.latitude, resolved.longitude], 14);
        markerRef.current.setLatLng([resolved.latitude, resolved.longitude]);
        markerRef.current
          .bindPopup(
            `📍 <b>${resolved.displayName || resolved.city}</b><br/>${resolved.district ? resolved.district + ', ' : ''}${resolved.state} ${resolved.pincode ? `(${resolved.pincode})` : ''}`
          )
          .openPopup();
      }
    } catch (err) {
      console.warn('Map picker search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;
      const L = (await import('leaflet')).default;

      if (!isMounted) return;

      const lat = currentLoc.latitude || 8.1485;
      const lng = currentLoc.longitude || 77.4474;

      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Custom icon or default marker
      const marker = L.marker([lat, lng], { draggable: true }).addTo(map);
      markerRef.current = marker;
      mapInstanceRef.current = map;

      const handleCoordChange = async (newLat: number, newLng: number) => {
        setIsReverseGeocoding(true);
        try {
          const res = await locationService.getProvider().reverseGeocode(newLat, newLng);
          if (res && isMounted) {
            setCurrentLoc(res);
            marker
              .bindPopup(
                `📍 <b>${res.displayName || res.city}</b><br/>${res.district ? res.district + ', ' : ''}${res.state} ${res.pincode ? `(${res.pincode})` : ''}`
              )
              .openPopup();
          }
        } catch (e) {
          console.warn('Map reverse geocode failed:', e);
        } finally {
          if (isMounted) setIsReverseGeocoding(false);
        }
      };

      // Click anywhere on map to reposition pin
      map.on('click', (e: any) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        marker.setLatLng([clickLat, clickLng]);
        handleCoordChange(clickLat, clickLng);
      });

      // Drag pin
      marker.on('dragend', (e: any) => {
        const { lat: dragLat, lng: dragLng } = e.target.getLatLng();
        handleCoordChange(dragLat, dragLng);
      });

      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-[#010711]/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-[#021324] border border-[#00e3fd]/40 rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,227,253,0.15)] text-[#eaf7ff] flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#00e3fd]/15 border border-[#00e3fd]/40 text-[#00e3fd]">
              <MapIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono text-[#eaf7ff]">
                Interactive Map Location Picker
              </h3>
              <p className="text-xs text-[#789fb7]">
                Click anywhere on the map or drag the pin to pinpoint your location
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#7198af] hover:text-[#eaf7ff] hover:bg-[#00dfff]/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search & Jump Bar */}
        <form onSubmit={handleSearchJump} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#00dfff] absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Jump to city, town, or 6-digit pincode..."
              className="w-full bg-[#010e1a] border border-[#00dfff]/30 focus:border-[#00e3fd] text-[#eaf7ff] placeholder-[#9ec4db] text-xs rounded-xl pl-9 pr-8 py-2 outline-none font-mono transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-[#7ea5bd] hover:text-[#eaf7ff] p-0.5"
                title="Clear"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!searchQuery.trim() || isSearching}
            className="px-3.5 py-2 rounded-xl bg-[#00e3fd]/20 hover:bg-[#00e3fd]/30 disabled:opacity-40 text-[#00e3fd] border border-[#00e3fd]/50 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            {isSearching ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
            Jump
          </button>
        </form>

        {/* Map Container */}
        <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-[#00dfff]/30">
          <div ref={mapContainerRef} className="w-full h-full" />

          {isReverseGeocoding && (
            <div className="absolute top-3 right-3 z-[1000] px-3 py-1.5 rounded-xl bg-[#021324]/90 border border-[#00e3fd]/50 text-[#00e3fd] text-xs font-mono flex items-center gap-2 shadow-lg backdrop-blur-sm">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Resolving coordinates...
            </div>
          )}
        </div>

        {/* Selected Location Info Bar */}
        <div className="p-3 bg-[#010e1c] border border-[#00dfff]/20 rounded-xl flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5 min-w-0">
            <MapPin className="w-4 h-4 text-[#00e3fd] shrink-0" />
            <div className="min-w-0">
              <div className="font-bold text-[#eaf7ff] truncate">
                {currentLoc.city || currentLoc.displayName || 'Selected Location'}
                {currentLoc.pincode && (
                  <span className="ml-2 px-1.5 py-0.5 rounded bg-[#00dfff]/20 text-[#00e3fd] text-[10px]">
                    {currentLoc.pincode}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-[#698c9f] truncate">
                {currentLoc.district ? `${currentLoc.district}, ` : ''}
                {currentLoc.state} · ({currentLoc.latitude ? currentLoc.latitude.toFixed(4) : ''}, {currentLoc.longitude ? currentLoc.longitude.toFixed(4) : ''})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-[#021f37] hover:bg-[#032d50] text-[#a2cbdf] hover:text-[#eaf7ff] border border-[#00dfff]/30 text-xs font-mono transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSelect(currentLoc)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#00dfff] to-[#0099ff] hover:from-[#38e6ff] hover:to-[#1aa3ff] text-[#001f24] text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
