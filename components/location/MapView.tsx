import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { MapMarkerData, NormalizedLocation } from '@/src/contracts/location';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';

export interface MapViewProps {
  markers: MapMarkerData[];
  selectedMarkerId?: string | null;
  hoveredMarkerId?: string | null;
  onSelectMarker?: (marker: MapMarkerData) => void;
  onHoverMarker?: (markerId: string | null) => void;
  centerLocation?: NormalizedLocation;
  radiusKm?: number;
  height?: number | string;
  className?: string;
  showRadiusOverlay?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({
  markers,
  selectedMarkerId,
  hoveredMarkerId,
  onSelectMarker,
  onHoverMarker,
  centerLocation,
  radiusKm = 25,
  height = 420,
  className = '',
  showRadiusOverlay = true,
}) => {
  const { location, t } = useArchitectAny();
  const activeCenter = centerLocation || location;
  const [zoomLevel, setZoomLevel] = useState<number>(12);
  const [mapType, setMapType] = useState<'osm' | 'gis'>('gis');
  const [activePopupMarker, setActivePopupMarker] = useState<MapMarkerData | null>(null);

  const centerLat = activeCenter.latitude || 11.0168;
  const centerLng = activeCenter.longitude || 76.9558;

  // Keep active popup in sync with selectedMarkerId
  useEffect(() => {
    if (selectedMarkerId) {
      const match = markers.find((m) => m.id === selectedMarkerId);
      if (match) {
        setActivePopupMarker(match);
      }
    }
  }, [selectedMarkerId, markers]);

  // Compute spatial bounding box for markers
  const bounds = React.useMemo(() => {
    if (markers.length === 0) {
      return {
        minLat: centerLat - 0.1,
        maxLat: centerLat + 0.1,
        minLng: centerLng - 0.1,
        maxLng: centerLng + 0.1,
      };
    }

    let minLat = centerLat;
    let maxLat = centerLat;
    let minLng = centerLng;
    let maxLng = centerLng;

    markers.forEach((m) => {
      if (m.latitude < minLat) minLat = m.latitude;
      if (m.latitude > maxLat) maxLat = m.latitude;
      if (m.longitude < minLng) minLng = m.longitude;
      if (m.longitude > maxLng) maxLng = m.longitude;
    });

    // Add 15% padding
    const latSpan = Math.max(maxLat - minLat, 0.05) * 1.15;
    const lngSpan = Math.max(maxLng - minLng, 0.05) * 1.15;

    return {
      minLat: centerLat - latSpan / 2,
      maxLat: centerLat + latSpan / 2,
      minLng: centerLng - lngSpan / 2,
      maxLng: centerLng + lngSpan / 2,
    };
  }, [markers, centerLat, centerLng]);

  // Project lat/lng to normalized 0..100 percentage coordinates
  const projectCoordinates = (lat: number, lng: number) => {
    const latRange = bounds.maxLat - bounds.minLat || 0.1;
    const lngRange = bounds.maxLng - bounds.minLng || 0.1;

    const x = ((lng - bounds.minLng) / lngRange) * 100;
    const y = ((bounds.maxLat - lat) / latRange) * 100; // Inverted Y for screen coordinates

    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
    };
  };

  const centerPos = projectCoordinates(centerLat, centerLng);

  // Live OSM Iframe embed URL
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    centerLng - 0.09
  }%2C${centerLat - 0.09}%2C${centerLng + 0.09}%2C${
    centerLat + 0.09
  }&layer=mapnik&marker=${centerLat}%2C${centerLng}`;

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-[#010913] border border-[#00dfff]/30 shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(0,227,253,0.05)] select-none ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {/* 1. Map Layer (Interactive Spatial GIS Vector Grid / OSM) */}
      {mapType === 'osm' ? (
        <div className="absolute inset-0 z-0">
          <iframe
            title="OpenStreetMap Live Layer"
            src={osmEmbedUrl}
            className="w-full h-full border-0 filter invert-[0.88] hue-rotate-180 contrast-125 opacity-75"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#020b18]/40 pointer-events-none" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-[#010914] overflow-hidden">
          {/* Spatial Vector Grid lines */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00e3fd_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Concentric Spatial Radius Circles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00e3fd" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#00e3fd" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#00e3fd" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Radius Circle */}
            {showRadiusOverlay && (
              <>
                <circle
                  cx={`${centerPos.x}%`}
                  cy={`${centerPos.y}%`}
                  r="35%"
                  fill="url(#centerGlow)"
                  stroke="#00e3fd"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  className="animate-pulse"
                />
                <circle
                  cx={`${centerPos.x}%`}
                  cy={`${centerPos.y}%`}
                  r="20%"
                  fill="none"
                  stroke="#00e3fd"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
              </>
            )}

            {/* Connecting lines from center to markers */}
            {markers.map((m) => {
              const pos = projectCoordinates(m.latitude, m.longitude);
              const isSel = m.id === selectedMarkerId;
              return (
                <line
                  key={`line-${m.id}`}
                  x1={`${centerPos.x}%`}
                  y1={`${centerPos.y}%`}
                  x2={`${pos.x}%`}
                  y2={`${pos.y}%`}
                  stroke={isSel ? '#00e3fd' : '#024b6d'}
                  strokeWidth={isSel ? '1.8' : '0.8'}
                  strokeDasharray={isSel ? 'none' : '3 3'}
                  strokeOpacity={isSel ? 0.8 : 0.4}
                />
              );
            })}
          </svg>
        </div>
      )}

      {/* 2. Center Location Pin (User / Resolved Location) */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: `${centerPos.x}%`, top: `${centerPos.y}%` }}
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute w-8 h-8 rounded-full bg-[#00e3fd]/30 animate-ping" />
          <div className="w-6 h-6 rounded-full bg-[#00e3fd] border-2 border-[#001f24] flex items-center justify-center shadow-[0_0_15px_#00e3fd]">
            <Navigation className="w-3.5 h-3.5 text-[#001f24] fill-[#001f24] -rotate-45" />
          </div>
          <div className="absolute top-7 px-2 py-0.5 rounded bg-[#02182b]/90 border border-[#00e3fd]/50 text-[10px] font-mono text-[#00e3fd] whitespace-nowrap shadow-md">
            {activeCenter.city || 'Center'} · {radiusKm}km
          </div>
        </div>
      </div>

      {/* 3. Render Markers (Services / Providers) */}
      {markers.map((marker) => {
        const pos = projectCoordinates(marker.latitude, marker.longitude);
        const isSelected = marker.id === selectedMarkerId;
        const isHovered = marker.id === hoveredMarkerId;

        const isExactMatch = marker.matchType === 'exact_pincode';
        const isLocalityMatch = marker.matchType === 'same_locality';

        return (
          <div
            key={marker.id}
            className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
              isSelected ? 'scale-125 z-40' : isHovered ? 'scale-110 z-35' : 'hover:scale-110'
            }`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => {
              setActivePopupMarker(marker);
              onSelectMarker?.(marker);
            }}
            onMouseEnter={() => onHoverMarker?.(marker.id)}
            onMouseLeave={() => onHoverMarker?.(null)}
          >
            <div className="relative flex flex-col items-center group">
              {/* Marker Pin Icon */}
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#00e3fd] text-[#001f24] border-2 border-white shadow-[0_0_20px_#00e3fd]'
                    : isExactMatch
                    ? 'bg-emerald-500 text-[#001f24] border border-white/80 shadow-[0_0_12px_rgba(16,185,129,0.7)]'
                    : isLocalityMatch
                    ? 'bg-[#38bdf8] text-[#001f24] border border-white/70 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                    : 'bg-[#022440] text-[#a2d4ef] border border-[#00dfff]/40 hover:border-[#00e3fd]'
                }`}
              >
                <MapPin className="w-4 h-4 fill-current" />
              </div>

              {/* Distance Tag Below Marker */}
              <div
                className={`mt-1 px-1.5 py-0.2 rounded text-[9px] font-mono whitespace-nowrap transition-all shadow-sm ${
                  isSelected
                    ? 'bg-[#00e3fd] text-[#001f24] font-bold border border-white'
                    : 'bg-[#021425]/90 text-[#dff4ff] border border-[#00dfff]/30'
                }`}
              >
                {marker.distanceKm.toFixed(1)} km
              </div>
            </div>
          </div>
        );
      })}

      {/* 4. Active Marker Detail Popup */}
      {activePopupMarker && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-50 bg-[#021425]/95 border border-[#00e3fd]/50 rounded-2xl p-3.5 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(0,227,253,0.2)] animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[9px] font-mono text-[#00dfff] uppercase tracking-wider block">
                {activePopupMarker.category || 'Service Provider'}
              </span>
              <h4 className="text-xs font-bold text-[#eaf7ff] truncate">
                {activePopupMarker.name}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setActivePopupMarker(null)}
              className="p-1 rounded text-[#7198af] hover:text-[#eaf7ff] text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#7198af]">
            <span className="flex items-center gap-1 text-[#00e3fd] font-bold">
              <Compass className="w-3 h-3" />
              {activePopupMarker.distanceKm.toFixed(1)} km away
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#00dfff]/15 text-[#00dfff] border border-[#00dfff]/30">
              {activePopupMarker.matchType.replace(/_/g, ' ')}
            </span>
          </div>

          <p className="mt-1.5 text-[10px] text-[#93bacc] truncate">
            {activePopupMarker.address || activePopupMarker.pincode}
          </p>

          <div className="mt-2.5 pt-2 border-t border-[#00dfff]/20 flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Available
            </span>
            <button
              type="button"
              onClick={() => onSelectMarker?.(activePopupMarker)}
              className="px-2.5 py-1 rounded-lg bg-[#00e3fd] hover:bg-[#00c5dc] text-[#001f24] font-bold text-[10px] font-mono transition-all shadow-[0_0_10px_rgba(0,227,253,0.4)] cursor-pointer"
            >
              Select Service
            </button>
          </div>
        </div>
      )}

      {/* 5. Map Controls Overlay (Top Right) */}
      <div className="absolute top-3 right-3 z-40 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => setMapType(mapType === 'gis' ? 'osm' : 'gis')}
          className="p-2 rounded-xl bg-[#02182b]/90 hover:bg-[#03243f] text-[#00e3fd] border border-[#00dfff]/30 hover:border-[#00e3fd] shadow-md transition-all text-xs font-mono flex items-center gap-1"
          title="Toggle OSM / Spatial GIS Grid"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline uppercase text-[10px]">
            {mapType === 'gis' ? 'GIS' : 'OSM'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.min(z + 1, 18))}
          className="p-2 rounded-xl bg-[#02182b]/90 hover:bg-[#03243f] text-[#a2c8dc] hover:text-[#eaf7ff] border border-[#00dfff]/30 shadow-md transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.max(z - 1, 6))}
          className="p-2 rounded-xl bg-[#02182b]/90 hover:bg-[#03243f] text-[#a2c8dc] hover:text-[#eaf7ff] border border-[#00dfff]/30 shadow-md transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 6. Map Footer Attribution */}
      <div className="absolute bottom-2 right-3 z-30 pointer-events-none text-[9px] font-mono text-[#44687d]">
        ArchitectAny AAi Spatial GIS · OpenStreetMap
      </div>
    </div>
  );
};
