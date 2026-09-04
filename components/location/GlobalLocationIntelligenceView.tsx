import React, { useState, useEffect, useCallback } from 'react';
import {
  Compass,
  MapPin,
  ListFilter,
  Layers,
  Sparkles,
  RefreshCw,
  Search,
  Navigation,
  Globe2,
  Building,
} from 'lucide-react';
import {
  NormalizedLocation,
  MapMarkerData,
  LocationFilterCriteria,
} from '@/src/contracts/location';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { LocationSearch } from './LocationSearch';
import { LocationFilterBar } from './LocationFilterBar';
import { MapView } from './MapView';
import { LocationResultList } from './LocationResultList';

export interface GlobalLocationIntelligenceViewProps {
  initialDomainId?: string | null;
  onSelectService?: (marker: MapMarkerData) => void;
  className?: string;
}

export const GlobalLocationIntelligenceView: React.FC<
  GlobalLocationIntelligenceViewProps
> = ({ initialDomainId = null, onSelectService, className = '' }) => {
  const { location, radiusKm, queryServices, t } = useArchitectAny();

  const [filters, setFilters] = useState<LocationFilterCriteria>(() => ({
    location: {
      ...location,
      radiusKm: radiusKm || 25,
    },
    domainId: initialDomainId,
    availableNow: false,
    sortBy: 'distance',
  }));

  const [markers, setMarkers] = useState<MapMarkerData[]>([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewLayout, setViewLayout] = useState<'split' | 'map' | 'list'>('split');

  // Keep filters in sync when global location or radius updates
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      location: {
        ...location,
        radiusKm: location.radiusKm || radiusKm || 25,
      },
    }));
  }, [location, radiusKm]);

  // Query location-aware services whenever filters change
  const refreshResults = useCallback(async () => {
    setIsLoading(true);
    try {
      const results = await queryServices(filters);
      setMarkers(results);
      if (results.length > 0 && !selectedMarkerId) {
        setSelectedMarkerId(results[0].id);
      }
    } finally {
      setIsLoading(false);
    }
  }, [filters, queryServices]);

  useEffect(() => {
    refreshResults();
  }, [refreshResults]);

  const handleSelectMarker = (marker: MapMarkerData) => {
    setSelectedMarkerId(marker.id);
    onSelectService?.(marker);
  };

  const domainOptions = [
    { id: 'd01-aerospace', name: 'Aerospace & Defense' },
    { id: 'd02-medical', name: 'Medical & Health' },
    { id: 'd03-transport', name: 'Transportation' },
    { id: 'd04-infra', name: 'Infrastructure' },
    { id: 'd05-energy', name: 'Energy & Power' },
    { id: 'd06-finance', name: 'Finance & Banking' },
  ];

  return (
    <div
      className={`w-full flex flex-col gap-4 text-[#eaf7ff] ${className}`}
      id="global-location-intelligence-view"
    >
      {/* 1. Header & Location Search Strip */}
      <div className="bg-[#021324]/90 border border-[#00dfff]/30 rounded-2xl p-4 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-[#00dfff]/15 border border-[#00dfff]/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,227,253,0.3)] shrink-0">
            <Compass className="w-5 h-5 text-[#00e3fd]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-wider uppercase text-[#00e3fd] font-mono">
                {t('location_intelligence_engine')}
              </h2>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold">
                LIVE SPATIAL GIS
              </span>
            </div>
            <p className="text-xs text-[#7198af] font-mono mt-0.5">
              Active Context: <span className="text-[#eaf7ff] font-bold">{location.displayName || `${location.city}, ${location.state}`}</span> ({location.pincode || 'Pincode active'})
            </p>
          </div>
        </div>

        {/* Global Location Autocomplete Input */}
        <div className="w-full md:w-96">
          <LocationSearch />
        </div>
      </div>

      {/* 2. Filter Bar (Distance radii, Domain filter, Available Now toggle, Sort) */}
      <LocationFilterBar
        filters={filters}
        onFilterChange={setFilters}
        domains={domainOptions}
        totalResultsCount={markers.length}
      />

      {/* 3. Split Layout: Interactive Synchronized Map + Synchronized Selection List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Side: Synchronized Map View */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono text-[#7198af] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00dfff]" />
              Spatial Geospatial Coverage Map
            </span>
            <button
              type="button"
              onClick={refreshResults}
              className="text-xs font-mono text-[#00dfff] hover:text-[#00e3fd] flex items-center gap-1 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh GIS
            </button>
          </div>

          <MapView
            markers={markers}
            selectedMarkerId={selectedMarkerId}
            hoveredMarkerId={hoveredMarkerId}
            onSelectMarker={handleSelectMarker}
            onHoverMarker={setHoveredMarkerId}
            centerLocation={location}
            radiusKm={filters.location.radiusKm || radiusKm || 25}
            height={500}
          />
        </div>

        {/* Right Side: Synchronized Selection List */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono text-[#7198af] flex items-center gap-1.5">
              <ListFilter className="w-3.5 h-3.5 text-[#00dfff]" />
              Matching Services in Radius ({markers.length})
            </span>
            <span className="text-[11px] font-mono text-[#00e3fd]">
              Radius: {filters.location.radiusKm || radiusKm || 25} km
            </span>
          </div>

          <LocationResultList
            markers={markers}
            selectedMarkerId={selectedMarkerId}
            hoveredMarkerId={hoveredMarkerId}
            onSelectMarker={handleSelectMarker}
            onHoverMarker={setHoveredMarkerId}
            className="max-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};
