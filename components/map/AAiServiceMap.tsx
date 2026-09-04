'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  MapPin,
  Navigation,
  Search,
  Filter,
  Layers,
  Compass,
  Building,
  Check,
  ExternalLink,
  ChevronRight,
  Crosshair,
  AlertCircle,
  X,
} from 'lucide-react';
import { LocationResult } from '@/src/contracts/location';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { SAMPLE_SERVICES, locationService } from '@/src/services/locationService';

export type LocationValue = {
  name?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
};

export type ServiceLocation = {
  id: string;
  name: string;
  type: string;
  description?: string;
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  distanceKm?: number;
  available?: boolean;
  metadata?: Record<string, unknown>;
};

export interface AAiServiceMapProps {
  location?: LocationValue;
  initialQuery?: string;
  services?: ServiceLocation[];
  radiusKm?: number;
  height?: number;
  selectedServiceId?: string | null;
  onSelectService?: (service: ServiceLocation) => void;
  onLocationResolved?: (location: LocationValue) => void;
  className?: string;
}

export default function AAiServiceMap({
  location: propsLocation,
  initialQuery,
  services: propsServices,
  radiusKm = 50,
  height = 480,
  selectedServiceId: initialSelectedId = null,
  onSelectService,
  onLocationResolved,
  className = '',
}: AAiServiceMapProps) {
  const { location: globalLocation, setLocation: setGlobalLocation, t } = useArchitectAny();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);
  const markerLayerRef = useRef<any>(null);
  const centerMarkerRef = useRef<any>(null);
  const initialResolvedRef = useRef(false);

  const [mapReady, setMapReady] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(initialSelectedId);
  const [isSearching, setIsSearching] = useState(false);
  const [unverifiedWarning, setUnverifiedWarning] = useState<string | null>(null);

  // Initial Location Value
  const initialPrefill =
    initialQuery?.trim() ||
    propsLocation?.pincode ||
    propsLocation?.city ||
    propsLocation?.name ||
    globalLocation.pincode ||
    globalLocation.city ||
    globalLocation.displayName ||
    'Coimbatore';

  const [resolvedLocation, setResolvedLocation] = useState<LocationValue>(() => ({
    name: propsLocation?.name || globalLocation.displayName || globalLocation.city || initialPrefill,
    city: propsLocation?.city || globalLocation.city || initialPrefill,
    state: propsLocation?.state || globalLocation.stateCode,
    pincode: propsLocation?.pincode || globalLocation.pincode,
    latitude: propsLocation?.latitude ?? globalLocation.latitude ?? 11.0168,
    longitude: propsLocation?.longitude ?? globalLocation.longitude ?? 76.9558,
  }));

  const [searchText, setSearchText] = useState(initialPrefill);

  const prevInitialQueryRef = useRef<string | undefined>(initialQuery);

  // Resolve initial query when map loads or when explicit initialQuery changes
  useEffect(() => {
    if (initialQuery && initialQuery.trim() && initialQuery !== prevInitialQueryRef.current) {
      prevInitialQueryRef.current = initialQuery;
      const q = initialQuery.trim();
      setSearchText(q);
      handleResolveQuery(q);
    } else if (!initialResolvedRef.current && initialQuery && initialQuery.trim()) {
      initialResolvedRef.current = true;
      const q = initialQuery.trim();
      setSearchText(q);
      handleResolveQuery(q);
    }
  }, [initialQuery]);

  // Transform default sample services into ServiceLocation format if none provided
  const services: ServiceLocation[] = useMemo(() => {
    if (propsServices && propsServices.length > 0) {
      return propsServices;
    }
    return SAMPLE_SERVICES.map((s) => ({
      id: s.id,
      name: s.name,
      type: s.category,
      description: s.description,
      latitude: s.location.latitude,
      longitude: s.location.longitude,
      address: s.location.address,
      city: s.location.city,
      state: s.location.state,
      pincode: s.location.pincode,
      available: s.available,
    }));
  }, [propsServices]);

  /*
   * ---------------------------------------------------------
   * LOAD LEAFLET CLIENT-SIDE SAFELY
   * ---------------------------------------------------------
   */
  useEffect(() => {
    let mounted = true;

    async function loadLeaflet() {
      if (typeof window === 'undefined') return;

      try {
        const L = await import('leaflet');
        if (!mounted) return;

        leafletRef.current = L;

        // Configure default leaflet marker icons from CDN
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        setMapReady(true);
      } catch (err) {
        console.error('Failed to load Leaflet module:', err);
      }
    }

    loadLeaflet();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * INITIALIZE LEAFLET MAP
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!mapReady || !leafletRef.current || !mapContainerRef.current) return;
    if (mapRef.current) return;

    const L = leafletRef.current;

    const initialLat = Number.isFinite(resolvedLocation.latitude)
      ? (resolvedLocation.latitude as number)
      : 11.0168;

    const initialLng = Number.isFinite(resolvedLocation.longitude)
      ? (resolvedLocation.longitude as number)
      : 76.9558;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([initialLat, initialLng], 12);

    // OpenStreetMap CartoDB Dark Matter / Standard Tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Map click handler to select coordinate point directly
    map.on('click', async (e: any) => {
      const { lat, lng } = e.latlng;
      try {
        const rev = await locationService.getProvider().reverseGeocode(lat, lng);
        if (rev) {
          const next: LocationValue = {
            name: rev.displayName,
            city: rev.city,
            pincode: rev.pincode,
            state: rev.stateCode,
            latitude: lat,
            longitude: lng,
          };
          setResolvedLocation(next);
          setSearchText(rev.pincode || rev.city || rev.displayName);
          setGlobalLocation(rev);
          setUnverifiedWarning(null);
          onLocationResolved?.(next);
        }
      } catch (err) {
        console.warn('Reverse geocode click failed:', err);
      }
    });

    markerLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapReady]);

  /*
   * ---------------------------------------------------------
   * HAVERSINE DISTANCE FORMULA
   * ---------------------------------------------------------
   */
  function calculateDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371; // Earth radius in KM
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  /*
   * ---------------------------------------------------------
   * FILTER SERVICES BY TYPE & RADIUS
   * ---------------------------------------------------------
   */
  const serviceTypes = useMemo(() => {
    const types = new Set<string>();
    for (const service of services) {
      if (service.type) {
        types.add(service.type);
      }
    }
    return ['ALL', ...Array.from(types)];
  }, [services]);

  const visibleServices = useMemo(() => {
    const centerLat = resolvedLocation.latitude;
    const centerLng = resolvedLocation.longitude;

    return services
      .map((service) => {
        let distanceKm = service.distanceKm;
        if (Number.isFinite(centerLat) && Number.isFinite(centerLng)) {
          distanceKm = calculateDistanceKm(
            centerLat!,
            centerLng!,
            service.latitude,
            service.longitude,
          );
        }
        return {
          ...service,
          distanceKm,
        };
      })
      .filter((service) => {
        if (selectedType !== 'ALL' && service.type !== selectedType) {
          return false;
        }
        if (typeof service.distanceKm === 'number' && service.distanceKm > radiusKm) {
          return false;
        }
        return true;
      })
      .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  }, [services, resolvedLocation, selectedType, radiusKm]);

  /*
   * ---------------------------------------------------------
   * RENDER SERVICE MARKERS WITH POPUPS
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!mapRef.current || !leafletRef.current || !markerLayerRef.current) return;
    const L = leafletRef.current;

    markerLayerRef.current.clearLayers();

    visibleServices.forEach((service) => {
      const isSelected = service.id === selectedServiceId;

      // Custom marker icon with ArchitectAny glowing cyan dot
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            width: ${isSelected ? '28px' : '22px'};
            height: ${isSelected ? '28px' : '22px'};
            background: ${isSelected ? '#00e3fd' : '#0284c7'};
            border: 2.5px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 0 14px ${isSelected ? '#00e3fd' : 'rgba(2,132,199,0.7)'};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <div style="width: 6px; height: 6px; background: #020914; border-radius: 50%;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([service.latitude, service.longitude], {
        icon: customIcon,
      });

      marker.bindPopup(`
        <div style="
          min-width: 220px;
          max-width: 280px;
          font-family: ui-sans-serif, system-ui, sans-serif;
          color: #0c1a24;
          padding: 4px;
        ">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px;">
            <span style="
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #0284c7;
              background: #e0f2fe;
              padding: 2px 6px;
              border-radius: 4px;
            ">
              ${escapeHtml(service.type)}
            </span>
            ${
              service.distanceKm !== undefined
                ? `<span style="font-size: 11px; font-weight: 600; color: #0369a1;">
                     ${service.distanceKm.toFixed(1)} km away
                   </span>`
                : ''
            }
          </div>

          <strong style="font-size: 13px; color: #021425; display: block; line-height: 1.3; margin-bottom: 4px;">
            ${escapeHtml(service.name)}
          </strong>

          ${
            service.address
              ? `<div style="font-size: 11px; color: #475569; margin-bottom: 6px; line-height: 1.3;">
                   ${escapeHtml(service.address)}, ${escapeHtml(service.city || '')} ${escapeHtml(service.pincode ? `(${service.pincode})` : '')}
                 </div>`
              : ''
          }

          <div style="margin-top: 8px; display: flex; gap: 6px;">
            <button
              id="popup-select-${service.id}"
              style="
                flex: 1;
                padding: 6px 10px;
                border: 0;
                border-radius: 6px;
                background: #0284c7;
                color: #ffffff;
                font-weight: 600;
                font-size: 11px;
                cursor: pointer;
              "
            >
              Select Service
            </button>
          </div>
        </div>
      `);

      marker.on('click', () => {
        setSelectedServiceId(service.id);
        onSelectService?.(service);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-select-${service.id}`);
        if (btn) {
          btn.onclick = () => {
            setSelectedServiceId(service.id);
            onSelectService?.(service);
            // Sync location if requested
            if (service.pincode || service.city) {
              setSearchText(service.pincode || service.city || '');
            }
          };
        }
      });

      marker.addTo(markerLayerRef.current);
    });
  }, [visibleServices, selectedServiceId, onSelectService]);

  /*
   * ---------------------------------------------------------
   * CENTER LOCATION MARKER & VIEWPORT
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!mapRef.current || !leafletRef.current) return;

    if (
      !Number.isFinite(resolvedLocation.latitude) ||
      !Number.isFinite(resolvedLocation.longitude)
    ) {
      return;
    }

    const L = leafletRef.current;
    const lat = resolvedLocation.latitude!;
    const lng = resolvedLocation.longitude!;

    if (centerMarkerRef.current) {
      centerMarkerRef.current.remove();
    }

    centerMarkerRef.current = L.circleMarker([lat, lng], {
      radius: 10,
      color: '#00e3fd',
      weight: 3,
      fillColor: '#00e3fd',
      fillOpacity: 0.45,
    })
      .bindPopup(
        `<strong>📍 ${escapeHtml(
          resolvedLocation.name || resolvedLocation.city || 'Active Location',
        )}</strong><br/><span style="font-size:11px;color:#64748b;">${lat.toFixed(4)}, ${lng.toFixed(4)}</span>`,
      )
      .addTo(mapRef.current);

    mapRef.current.setView([lat, lng], 12);

    setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 100);
  }, [resolvedLocation]);

  /*
   * ---------------------------------------------------------
   * FLY TO SELECTED SERVICE
   * ---------------------------------------------------------
   */
  function viewServiceOnMap(service: ServiceLocation) {
    setSelectedServiceId(service.id);
    onSelectService?.(service);

    if (!mapRef.current) return;
    mapRef.current.setView([service.latitude, service.longitude], 14, {
      animate: true,
    });

    // Also update search input and resolved coordinates to focus here
    const updatedLoc: LocationValue = {
      name: service.name,
      city: service.city,
      pincode: service.pincode,
      state: service.state,
      latitude: service.latitude,
      longitude: service.longitude,
    };
    setSearchText(service.pincode || service.city || service.name);
    setResolvedLocation(updatedLoc);
    setGlobalLocation({
      city: service.city,
      pincode: service.pincode,
      latitude: service.latitude,
      longitude: service.longitude,
      displayName: `${service.name} (${service.city || ''})`,
      source: 'search',
    });
    onLocationResolved?.(updatedLoc);
  }

  /*
   * ---------------------------------------------------------
   * LIVE PINCODE & LOCATION RESOLVER (INDIA POST & OSM NOMINATIM)
   * ---------------------------------------------------------
   */
  async function handleResolveQuery(queryToResolve: string) {
    const query = queryToResolve.trim();
    if (!query) return;

    setIsSearching(true);
    setUnverifiedWarning(null);
    try {
      // Check if 6-digit Pincode
      const isPin = /^\d{6}$/.test(query);
      let result: LocationResult | null = null;

      if (isPin) {
        result = await locationService.resolvePincode(query);
        if (!result) {
          setUnverifiedWarning(`Pincode "${query}" could not be resolved. Please click on the map to pinpoint your location.`);
        }
      } else {
        const verification = await locationService.verifyLocationByName(query);
        if (verification.verified && verification.candidates.length > 0) {
          result = verification.candidates[0];
        } else {
          const searchResults = await locationService.searchLocations(query);
          if (searchResults.length > 0) {
            result = searchResults[0];
          } else {
            setUnverifiedWarning(`Location "${query}" unverified on map. Please click directly on the interactive map below to pinpoint your location.`);
          }
        }
      }

      if (result && Number.isFinite(result.latitude) && Number.isFinite(result.longitude)) {
        const nextLocation: LocationValue = {
          name: result.displayName,
          city: result.city,
          state: result.stateCode,
          pincode: result.pincode,
          latitude: result.latitude,
          longitude: result.longitude,
        };
        setResolvedLocation(nextLocation);
        setSearchText(result.displayName || result.city || result.pincode || query);
        setGlobalLocation(result);
        setUnverifiedWarning(null);
        onLocationResolved?.(nextLocation);

        if (mapRef.current) {
          mapRef.current.setView([result.latitude, result.longitude], 12);
        }
      }
    } catch (error) {
      console.error('AAi Location Lookup failed:', error);
      setUnverifiedWarning(`Could not verify location "${query}". Please click on the map to place your pin.`);
    } finally {
      setIsSearching(false);
    }
  }

  async function handleResolveLocation() {
    await handleResolveQuery(searchText);
  }

  // Detect GPS Location
  async function handleDetectGPS() {
    setIsSearching(true);
    try {
      const loc = await locationService.requestCurrentLocation();
      if (loc && loc.latitude && loc.longitude) {
        const next: LocationValue = {
          name: loc.displayName,
          city: loc.city,
          pincode: loc.pincode,
          state: loc.stateCode,
          latitude: loc.latitude,
          longitude: loc.longitude,
        };
        setResolvedLocation(next);
        setSearchText(loc.pincode || loc.city || loc.displayName);
        onLocationResolved?.(next);
      }
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className={`w-full flex flex-col gap-4 font-sans ${className}`}>
      {/* 1. LOCATION SEARCH & RESOLUTION BAR */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-[#00dfff] absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              if (!e.target.value.trim()) {
                setUnverifiedWarning(null);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleResolveLocation();
              }
            }}
            placeholder={t('map_search_placeholder')}
            className="w-full bg-[#010e1a] border border-[#00dfff]/30 focus:border-[#00e3fd] text-[#eaf7ff] placeholder-[#9ec4db] text-xs sm:text-sm rounded-xl pl-10 pr-10 py-2.5 outline-none font-mono transition-all shadow-inner"
          />
          {searchText && (
            <button
              type="button"
              onClick={() => {
                setSearchText('');
                setUnverifiedWarning(null);
              }}
              title="Clear text"
              className="absolute right-3 top-2.5 p-1 rounded-lg text-[#7ea5bd] hover:text-[#eaf7ff] hover:bg-[#00dfff]/15 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleResolveLocation}
          disabled={isSearching}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00e3fd]/20 hover:bg-[#00e3fd]/30 disabled:opacity-50 text-[#00e3fd] border border-[#00e3fd]/50 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          {isSearching ? t('resolving') : t('find_location')}
        </button>

        <button
          type="button"
          onClick={handleDetectGPS}
          disabled={isSearching}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#02182b] hover:bg-[#03233e] text-[#a2c8dc] hover:text-[#eaf7ff] border border-[#00dfff]/30 text-xs font-mono font-semibold transition-all cursor-pointer"
          title={t('use_current_location')}
        >
          <Navigation className="w-3.5 h-3.5 text-[#00dfff]" />
          <span className="hidden sm:inline">{t('near_me')}</span>
        </button>
      </div>

      {/* 2. CATEGORY FILTERS & STATS */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-1">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          <span className="text-xs font-mono text-[#6e9bb3] mr-1 uppercase font-bold flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#00dfff]" /> {t('filters')}:
          </span>

          {serviceTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                selectedType === type
                  ? 'bg-[#00e3fd]/25 text-[#00e3fd] border border-[#00e3fd]/70 font-bold shadow-[0_0_10px_rgba(0,227,253,0.25)]'
                  : 'bg-[#021425] text-[#8cb0c4] hover:text-[#eaf7ff] border border-[#00dfff]/20 hover:border-[#00dfff]/40'
              }`}
            >
              {type === 'ALL' ? t('all_categories') : type}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-[#00e3fd] bg-[#00dfff]/10 px-2.5 py-1 rounded-lg border border-[#00dfff]/20 shrink-0">
          Radius: {radiusKm} km · <strong>{visibleServices.length}</strong> services
        </div>
      </div>

      {/* Unverified Location Warning Banner */}
      {unverifiedWarning && (
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <div className="flex-1">
            <span className="font-bold">Map Verification: </span>
            <span>{unverifiedWarning}</span>
          </div>
        </div>
      )}

      {/* 3. INTERACTIVE LEAFLET SPATIAL MAP CONTAINER */}
      <div className={`relative rounded-2xl overflow-hidden border ${unverifiedWarning ? 'border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.3)] animate-pulse' : 'border-[#00dfff]/35 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'} bg-[#020b14]`}>
        <div
          ref={mapContainerRef}
          style={{ height: `${height}px`, width: '100%' }}
          className="z-10"
        />

        {/* Map Header Floating Info Pill */}
        <div className="absolute top-3 left-3 z-[400] bg-[#020e1a]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#00dfff]/40 text-[11px] font-mono text-[#eaf7ff] shadow-md flex items-center gap-2 pointer-events-none">
          <Crosshair className="w-3.5 h-3.5 text-[#00dfff] animate-pulse" />
          <span>
            {resolvedLocation.name || resolvedLocation.city || 'Selected Location'} ·{' '}
            {resolvedLocation.latitude?.toFixed(3)}, {resolvedLocation.longitude?.toFixed(3)}
          </span>
        </div>
      </div>

      {/* 4. SERVICE SELECTION TABLE & "VIEW MAP" BUTTONS */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#00dfff]/20 bg-[#02111f]/80 backdrop-blur-md">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-[#00dfff]/20 bg-[#02182b]/90 text-[#6e9bb3] uppercase tracking-wider">
              <th className="py-3 px-3.5 font-bold">Service Name</th>
              <th className="py-3 px-3 font-bold">Category</th>
              <th className="py-3 px-3 font-bold">Location / PIN</th>
              <th className="py-3 px-3 font-bold">{t('distance')}</th>
              <th className="py-3 px-3 font-bold">Status</th>
              <th className="py-3 px-3 text-right font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#00dfff]/10">
            {visibleServices.map((service) => {
              const isSelected = selectedServiceId === service.id;
              return (
                <tr
                  key={service.id}
                  className={`transition-colors ${
                    isSelected
                      ? 'bg-[#00e3fd]/15 text-[#eaf7ff]'
                      : 'hover:bg-[#031d36]/60 text-[#b4d6e7]'
                  }`}
                >
                  <td className="py-3 px-3.5 font-sans font-semibold text-[#eaf7ff]">
                    {service.name}
                  </td>
                  <td className="py-3 px-3 text-[#00dfff]">{service.type}</td>
                  <td className="py-3 px-3 text-[#8cb0c4]">
                    {service.city || service.address || service.pincode || '—'}
                  </td>
                  <td className="py-3 px-3 font-bold text-[#eaf7ff]">
                    {service.distanceKm !== undefined ? `${service.distanceKm.toFixed(1)} km` : '—'}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        service.available
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {service.available ? 'Available' : 'Busy'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => viewServiceOnMap(service)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all inline-flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-[#00e3fd] text-[#020914] shadow-[0_0_10px_rgba(0,227,253,0.5)]'
                          : 'bg-[#00dfff]/15 hover:bg-[#00dfff]/30 text-[#00e3fd] border border-[#00dfff]/40'
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      {t('view_map')}
                    </button>
                  </td>
                </tr>
              );
            })}

            {visibleServices.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#5d859b] font-mono">
                  No services found for the selected location filter within {radiusKm} km.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
