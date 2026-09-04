import React from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Star,
  CheckCircle2,
  Phone,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { MapMarkerData, LocationMatchType } from '@/src/contracts/location';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';

export interface LocationResultListProps {
  markers: MapMarkerData[];
  selectedMarkerId?: string | null;
  hoveredMarkerId?: string | null;
  onSelectMarker: (marker: MapMarkerData) => void;
  onHoverMarker?: (markerId: string | null) => void;
  className?: string;
  emptyMessage?: string;
}

const MATCH_TYPE_LABELS: Record<
  LocationMatchType,
  { label: string; bg: string; text: string; border: string }
> = {
  exact_pincode: {
    label: 'Exact Pincode Match',
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-300',
    border: 'border-emerald-500/40',
  },
  same_locality: {
    label: 'Same Locality',
    bg: 'bg-[#00e3fd]/20',
    text: 'text-[#00e3fd]',
    border: 'border-[#00e3fd]/40',
  },
  same_city: {
    label: 'Same City',
    bg: 'bg-cyan-500/15',
    text: 'text-cyan-300',
    border: 'border-cyan-500/30',
  },
  same_district: {
    label: 'Same District',
    bg: 'bg-sky-500/15',
    text: 'text-sky-300',
    border: 'border-sky-500/30',
  },
  same_state: {
    label: 'Same State',
    bg: 'bg-blue-500/15',
    text: 'text-blue-300',
    border: 'border-blue-500/30',
  },
  within_radius: {
    label: 'Within Radius',
    bg: 'bg-[#00dfff]/10',
    text: 'text-[#00dfff]',
    border: 'border-[#00dfff]/20',
  },
  outside_service_area: {
    label: 'Out of Area',
    bg: 'bg-amber-500/15',
    text: 'text-amber-300',
    border: 'border-amber-500/30',
  },
};

export const LocationResultList: React.FC<LocationResultListProps> = ({
  markers,
  selectedMarkerId,
  hoveredMarkerId,
  onSelectMarker,
  onHoverMarker,
  className = '',
  emptyMessage = 'No matching services or providers found in this radius.',
}) => {
  const { t } = useArchitectAny();

  if (markers.length === 0) {
    return (
      <div
        className={`p-8 rounded-2xl bg-[#021324]/80 border border-[#00dfff]/20 text-center font-mono ${className}`}
      >
        <Compass className="w-8 h-8 text-[#5d859b] mx-auto mb-2 opacity-60" />
        <p className="text-xs text-[#82a5bb] mb-1">{emptyMessage}</p>
        <p className="text-[11px] text-[#4d7084]">
          Try expanding the radius to 50 km or 100 km.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-2.5 overflow-y-auto custom-scrollbar ${className}`}>
      {markers.map((marker) => {
        const isSelected = marker.id === selectedMarkerId;
        const isHovered = marker.id === hoveredMarkerId;
        const matchConfig =
          MATCH_TYPE_LABELS[marker.matchType] || MATCH_TYPE_LABELS.within_radius;

        return (
          <div
            key={marker.id}
            onClick={() => onSelectMarker(marker)}
            onMouseEnter={() => onHoverMarker?.(marker.id)}
            onMouseLeave={() => onHoverMarker?.(null)}
            className={`p-3.5 rounded-2xl transition-all cursor-pointer border select-none ${
              isSelected
                ? 'bg-[#03233e] border-[#00e3fd] shadow-[0_0_25px_rgba(0,227,253,0.3)] ring-1 ring-[#00e3fd]'
                : isHovered
                ? 'bg-[#021c33] border-[#00dfff]/50 shadow-md'
                : 'bg-[#021425]/90 hover:bg-[#021c33] border-[#00dfff]/20'
            }`}
          >
            {/* Header: Name, Distance Badge, Match Type */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase ${matchConfig.bg} ${matchConfig.text} ${matchConfig.border}`}
                  >
                    {matchConfig.label}
                  </span>
                  {marker.category && (
                    <span className="text-[10px] font-mono text-[#6e9ab2]">
                      {marker.category}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-[#eaf7ff] hover:text-[#00e3fd] transition-colors leading-snug">
                  {marker.name}
                </h4>
              </div>

              {/* Distance Pill */}
              <div className="shrink-0 flex flex-col items-end">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#00e3fd]/15 border border-[#00e3fd]/35 text-[#00e3fd] font-mono text-xs font-bold shadow-sm">
                  <Navigation className="w-3 h-3 -rotate-45" />
                  <span>{marker.distanceKm.toFixed(1)} km</span>
                </div>
                {marker.rating && (
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{marker.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Address / Location Details */}
            <div className="mt-2 text-xs font-mono text-[#82a5bb] flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#00dfff] shrink-0" />
              <span className="truncate">{marker.address || marker.pincode}</span>
            </div>

            {/* Footer Row: Availability, Price Model, Select Action */}
            <div className="mt-3 pt-2.5 border-t border-[#00dfff]/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`text-[11px] font-mono font-semibold flex items-center gap-1 ${
                    marker.available ? 'text-emerald-400' : 'text-[#6e9ab2]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {marker.available ? t('available_now') : t('on_demand')}
                </span>

                {marker.priceModel && (
                  <span className="text-[10px] font-mono text-[#5d859b] hidden sm:inline">
                    · {marker.priceModel}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#00e3fd] group">
                <span>{isSelected ? t('selected_active') : t('view_details')}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
