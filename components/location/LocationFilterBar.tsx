import React from 'react';
import {
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  Navigation,
  Sparkles,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import {
  SUPPORTED_DISTANCE_RADII,
  LocationFilterCriteria,
} from '@/src/contracts/location';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';

export interface LocationFilterBarProps {
  filters: LocationFilterCriteria;
  onFilterChange: (newFilters: LocationFilterCriteria) => void;
  domains?: Array<{ id: string; name: string }>;
  totalResultsCount?: number;
  className?: string;
}

export const LocationFilterBar: React.FC<LocationFilterBarProps> = ({
  filters,
  onFilterChange,
  domains = [],
  totalResultsCount,
  className = '',
}) => {
  const { radiusKm, setRadiusKm, t } = useArchitectAny();

  const handleRadiusSelect = (radius: number) => {
    setRadiusKm(radius);
    onFilterChange({
      ...filters,
      location: {
        ...filters.location,
        radiusKm: radius,
      },
    });
  };

  const handleDomainSelect = (domainId: string | null) => {
    onFilterChange({
      ...filters,
      domainId,
    });
  };

  const handleAvailableToggle = () => {
    onFilterChange({
      ...filters,
      availableNow: !filters.availableNow,
    });
  };

  const handleSortChange = (sortBy: 'distance' | 'rating' | 'name') => {
    onFilterChange({
      ...filters,
      sortBy,
    });
  };

  const currentRadius = filters.location.radiusKm || radiusKm || 25;

  return (
    <div
      className={`bg-[#021425]/90 border border-[#00dfff]/25 rounded-2xl p-3 sm:p-4 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-3 ${className}`}
    >
      {/* Top Row: Distance Radii Pills & Available Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Distance Radii */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-[#6e9ab2] uppercase tracking-wider flex items-center gap-1 mr-1">
            <Compass className="w-3.5 h-3.5 text-[#00dfff]" />
            {t('radius_range')}:
          </span>

          {SUPPORTED_DISTANCE_RADII.map((r) => {
            const isSelected = currentRadius === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => handleRadiusSelect(r.value)}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-medium transition-all select-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#00e3fd] text-[#001f24] font-bold shadow-[0_0_12px_rgba(0,227,253,0.5)] scale-105'
                    : 'bg-[#021f37] hover:bg-[#032b4d] text-[#8cb4cc] hover:text-[#eaf7ff] border border-[#00dfff]/20'
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Right Action: Available Now Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAvailableToggle}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer select-none ${
              filters.availableNow
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.3)] font-bold'
                : 'bg-[#021f37] text-[#7198af] hover:text-[#dff4ff] border border-[#00dfff]/20'
            }`}
          >
            <CheckCircle2
              className={`w-3.5 h-3.5 ${
                filters.availableNow ? 'text-emerald-400' : 'text-[#48738b]'
              }`}
            />
            <span>{t('available_now_only')}</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Domain Selector & Sort Options */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#00dfff]/15">
        {/* Domain Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-[#6e9ab2] uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#00dfff]" />
            {t('domain')}:
          </span>

          <button
            type="button"
            onClick={() => handleDomainSelect(null)}
            className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono transition-all select-none cursor-pointer ${
              !filters.domainId
                ? 'bg-[#00dfff]/25 text-[#00e3fd] border border-[#00dfff]/50 font-bold'
                : 'bg-[#021f37]/60 text-[#7198af] hover:text-[#dff4ff]'
            }`}
          >
            {t('all_domains')}
          </button>

          {domains.map((dom) => {
            const isSel = filters.domainId === dom.id;
            return (
              <button
                key={dom.id}
                type="button"
                onClick={() => handleDomainSelect(dom.id)}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono transition-all select-none cursor-pointer ${
                  isSel
                    ? 'bg-[#00dfff]/25 text-[#00e3fd] border border-[#00dfff]/50 font-bold'
                    : 'bg-[#021f37]/60 text-[#7198af] hover:text-[#dff4ff]'
                }`}
              >
                {dom.name}
              </button>
            );
          })}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center gap-3">
          {typeof totalResultsCount === 'number' && (
            <span className="text-[11px] font-mono text-[#00e3fd] px-2 py-0.5 rounded-md bg-[#00dfff]/10 border border-[#00dfff]/25 font-bold">
              {totalResultsCount} {totalResultsCount === 1 ? 'Service' : 'Services'}
            </span>
          )}

          <div className="flex items-center gap-1 text-[11px] font-mono text-[#6e9ab2]">
            <ArrowUpDown className="w-3 h-3 text-[#00dfff]" />
            <select
              value={filters.sortBy || 'distance'}
              onChange={(e) =>
                handleSortChange(e.target.value as 'distance' | 'rating' | 'name')
              }
              className="bg-[#021f37] text-[#eaf7ff] border border-[#00dfff]/20 rounded-lg px-2 py-0.5 text-[11px] font-mono outline-none cursor-pointer focus:border-[#00dfff]"
            >
              <option value="distance">{t('sort_nearest_distance')}</option>
              <option value="rating">{t('sort_highest_rating')}</option>
              <option value="name">{t('sort_name_az')}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
