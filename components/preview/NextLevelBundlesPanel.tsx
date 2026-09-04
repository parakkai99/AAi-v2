import React, { useState, useEffect } from 'react';
import { Boxes, ChevronRight, ArrowRight, Layers } from 'lucide-react';
import { SolutionBundleItem, CapabilityItem, SubdomainItem } from '@/src/contracts/catalog';
import { catalogRepository } from '@/src/repositories/catalogRepository';

export interface NextLevelBundlesPanelProps {
  subdomain: SubdomainItem;
  capabilities: CapabilityItem[];
  activeCapability?: CapabilityItem | null;
  theme?: 'dark' | 'light';
  onSelectBundle: (bundle: SolutionBundleItem) => void;
  onViewAll?: () => void;
  className?: string;
}

export const NextLevelBundlesPanel: React.FC<NextLevelBundlesPanelProps> = ({
  subdomain,
  capabilities,
  activeCapability,
  theme = 'dark',
  onSelectBundle,
  onViewAll,
  className = '',
}) => {
  const isDark = theme === 'dark';
  const [bundles, setBundles] = useState<SolutionBundleItem[]>([]);
  const [activePageIndex, setActivePageIndex] = useState(0);

  // Load all L4 Solution Bundles for this subdomain or active capability
  useEffect(() => {
    let isMounted = true;
    async function loadBundles() {
      try {
        if (activeCapability) {
          const res = await catalogRepository.getSolutionBundles(activeCapability.id);
          if (isMounted) setBundles(res);
        } else if (capabilities.length > 0) {
          // Fetch bundles across capabilities in this subdomain
          const bundlePromises = capabilities.map((c) => catalogRepository.getSolutionBundles(c.id));
          const allResults = await Promise.all(bundlePromises);
          const flattened = allResults.flat();
          if (isMounted) setBundles(flattened);
        }
      } catch {
        // Fallback gracefully
      }
    }
    loadBundles();
    return () => {
      isMounted = false;
    };
  }, [subdomain?.id, activeCapability?.id, capabilities]);

  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(bundles.length / pageSize));
  const currentBundles = bundles.slice(activePageIndex * pageSize, (activePageIndex + 1) * pageSize);

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 transition-all border ${
        isDark
          ? 'bg-[#021124]/90 border-[#00dfff]/20 shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
          : 'bg-white border-slate-200 shadow-sm'
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-inherit">
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
          <Boxes className={`w-4 h-4 ${isDark ? 'text-[#00dfff]' : 'text-indigo-600'}`} />
          <span className={isDark ? 'text-[#eaf7ff]' : 'text-slate-900'}>
            NEXT LEVEL (L4) - SOLUTION BUNDLES
          </span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
              isDark ? 'bg-[#00dfff]/15 text-[#00e3fd]' : 'bg-indigo-50 text-indigo-700'
            }`}
          >
            {bundles.length}
          </span>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            type="button"
            className={`text-xs font-mono font-bold flex items-center gap-0.5 hover:underline cursor-pointer ${
              isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
            }`}
          >
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Bundles List */}
      <div className="space-y-2 mb-4">
        {currentBundles.map((bundle) => (
          <button
            key={bundle.id}
            onClick={() => onSelectBundle(bundle)}
            className={`w-full group flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
              isDark
                ? 'bg-[#031c33]/70 hover:bg-[#052847] text-[#eaf7ff] border-[#00dfff]/15 hover:border-[#00e3fd]/60'
                : 'bg-slate-50 hover:bg-indigo-50/70 text-slate-800 border-slate-200 hover:border-indigo-300'
            }`}
          >
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    isDark
                      ? 'bg-[#00dfff]/10 text-[#00dfff]'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {bundle.id}
                </span>
                <span className="font-sans text-xs font-bold truncate group-hover:text-inherit">
                  {bundle.name}
                </span>
              </div>
              <p
                className={`text-[11px] line-clamp-1 ${
                  isDark ? 'text-[#82a5bb]' : 'text-slate-500'
                }`}
              >
                {bundle.description}
              </p>
            </div>

            <ChevronRight
              className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 ${
                isDark ? 'text-[#00dfff]' : 'text-indigo-600'
              }`}
            />
          </button>
        ))}

        {bundles.length === 0 && (
          <div
            className={`py-6 text-center text-xs font-mono rounded-xl border border-dashed ${
              isDark
                ? 'text-[#6e9bb3] border-[#00dfff]/15 bg-[#020d18]/40'
                : 'text-slate-500 border-slate-300 bg-slate-50'
            }`}
          >
            No solution bundles found for this level.
          </div>
        )}
      </div>

      {/* Pagination Carousel Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActivePageIndex(idx)}
              aria-label={`Go to bundle page ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activePageIndex === idx
                  ? isDark
                    ? 'w-5 bg-[#00dfff]'
                    : 'w-5 bg-indigo-600'
                  : isDark
                    ? 'w-1.5 bg-[#00dfff]/30 hover:bg-[#00dfff]/60'
                    : 'w-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
