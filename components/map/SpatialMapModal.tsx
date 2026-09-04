'use client';

import React from 'react';
import { X, Map as MapIcon, Compass, Sparkles } from 'lucide-react';
import AAiServiceMap, { LocationValue, ServiceLocation } from './AAiServiceMap';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';

export interface SpatialMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onSelectService?: (service: ServiceLocation) => void;
}

export const SpatialMapModal: React.FC<SpatialMapModalProps> = ({
  isOpen,
  onClose,
  initialQuery,
  onSelectService,
}) => {
  const { location, setLocation, mapConfig, t } = useArchitectAny();

  if (!isOpen) return null;

  const handleLocationResolved = (loc: LocationValue) => {
    setLocation({
      city: loc.city,
      pincode: loc.pincode,
      latitude: loc.latitude,
      longitude: loc.longitude,
      displayName: loc.name || `${loc.city || 'Location'} (${loc.pincode || ''})`,
      source: 'search',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#01070f]/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#020f1c] border border-[#00e3fd]/40 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,227,253,0.15)] flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#00dfff]/20 bg-[#021425]/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00dfff]/15 border border-[#00dfff]/40 flex items-center justify-center text-[#00e3fd] shadow-[0_0_12px_rgba(0,227,253,0.3)]">
              <MapIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-[#eaf7ff] font-sans">
                  {t('spatial_service_layer')}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00dfff]/15 text-[#00e3fd] border border-[#00dfff]/30 font-bold uppercase">
                  {t('live_indian_gis')}
                </span>
              </div>
              <p className="text-xs text-[#a2cbdf] font-mono">
                {t('india_post_osm_resolver')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#02182b] hover:bg-[#03243f] text-[#a2cbdf] hover:text-[#eaf7ff] border border-[#00dfff]/30 hover:border-[#00dfff]/60 transition-all cursor-pointer"
            aria-label="Close Map Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - AAiServiceMap Component */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          <AAiServiceMap
            initialQuery={initialQuery}
            location={{
              name: location.displayName,
              city: location.city,
              state: location.stateCode,
              pincode: location.pincode,
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            height={440}
            radiusKm={60}
            onLocationResolved={handleLocationResolved}
            onSelectService={(service) => {
              onSelectService?.(service);
            }}
          />
        </div>

        {/* Modal Footer Note */}
        <div className="px-5 py-3 border-t border-[#00dfff]/20 bg-[#021425]/60 flex items-center justify-between text-[11px] font-mono text-[#8cb4cc] shrink-0">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#00dfff]" />
            <span>{t('active_coordinates')}: {location.latitude?.toFixed(4)}, {location.longitude?.toFixed(4)} ({location.city || 'India'})</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#00e3fd]/20 hover:bg-[#00e3fd]/30 text-[#00e3fd] border border-[#00e3fd]/40 font-bold transition-all text-xs cursor-pointer"
          >
            {t('apply_and_close')}
          </button>
        </div>
      </div>
    </div>
  );
};
