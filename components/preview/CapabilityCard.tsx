import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Layers, Box, CheckCircle2, ArrowRight } from 'lucide-react';
import { CapabilityItem, SolutionBundleItem } from '@/src/contracts/catalog';
import { catalogRepository } from '@/src/repositories/catalogRepository';
import { CapabilityVisualScene } from './CapabilityVisualScene';

export interface CapabilityCardProps {
  capability: CapabilityItem;
  theme?: 'dark' | 'light';
  domainColor?: string;
  index?: number;
  isSelected?: boolean;
  onSelect: (capability: CapabilityItem) => void;
  onHover?: (capability: CapabilityItem | null) => void;
  className?: string;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({
  capability,
  theme = 'dark',
  domainColor = '#00dfff',
  index = 0,
  isSelected = false,
  onSelect,
  onHover,
  className = '',
}) => {
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);
  const [bundles, setBundles] = useState<SolutionBundleItem[]>([]);

  // Fetch bundles dynamically from catalog for preview context
  useEffect(() => {
    let isMounted = true;
    if (capability?.id) {
      catalogRepository.getSolutionBundles(capability.id).then((res) => {
        if (isMounted) setBundles(res);
      }).catch(() => {});
    }
    return () => {
      isMounted = false;
    };
  }, [capability?.id]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(capability);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(null);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(capability)}
      className={`group relative flex flex-col justify-between rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden border ${
        isDark
          ? isSelected || isHovered
            ? 'bg-[#041a30] border-[#00e3fd] shadow-[0_0_24px_rgba(0,227,253,0.35)] -translate-y-1'
            : 'bg-[#021122]/90 hover:bg-[#03182d] border-[#00dfff]/20 hover:border-[#00e3fd]/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5'
          : isSelected || isHovered
            ? 'bg-white border-indigo-400 shadow-xl shadow-indigo-100 -translate-y-1 ring-2 ring-indigo-200'
            : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md hover:-translate-y-0.5'
      } ${className}`}
      style={{
        minWidth: '260px',
        maxWidth: '320px',
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(capability);
        }
      }}
    >
      {/* CARD CONTENT */}
      <div className="p-4 flex flex-col h-full">
        {/* Top Header: ID Badge & Layer Indicator */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md border tracking-wider transition-colors ${
              isDark
                ? 'bg-[#00dfff]/10 text-[#00e3fd] border-[#00dfff]/30 group-hover:bg-[#00dfff]/20'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold'
            }`}
          >
            {capability.id}
          </span>
          <span
            className={`text-[10px] font-mono flex items-center gap-1 uppercase tracking-wider ${
              isDark ? 'text-[#6e9bb3]' : 'text-slate-500 font-medium'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>L3 Capability</span>
          </span>
        </div>

        {/* Dynamic Vector Visual Scene */}
        <div className="mb-3.5 transition-transform duration-300 group-hover:scale-[1.02]">
          <CapabilityVisualScene
            id={capability.id}
            name={capability.name}
            theme={theme}
            accentColor={domainColor}
          />
        </div>

        {/* Title & Description */}
        <div className="flex-1 min-h-[75px]">
          <h3
            className={`text-sm sm:text-base font-bold transition-colors line-clamp-1 mb-1.5 ${
              isDark
                ? 'text-[#eaf7ff] group-hover:text-[#00e3fd]'
                : 'text-slate-900 group-hover:text-indigo-600'
            }`}
          >
            {capability.name}
          </h3>
          <p
            className={`text-xs line-clamp-2 leading-relaxed ${
              isDark ? 'text-[#82a5bb]' : 'text-slate-600'
            }`}
          >
            {capability.description}
          </p>
        </div>

        {/* Footer Action */}
        <div
          className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-medium transition-colors ${
            isDark
              ? 'border-[#00dfff]/15 text-[#00e3fd] group-hover:text-white'
              : 'border-slate-100 text-indigo-600 group-hover:text-indigo-800'
          }`}
        >
          <span className="font-mono text-[11px]">
            {bundles.length > 0 ? `${bundles.length} Solution Bundle${bundles.length > 1 ? 's' : ''}` : 'Explore L3'}
          </span>
          <span className="flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
            <span>Explore Capabilities</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* "WHAT'S NEXT?" HOVER PREVIEW OVERLAY (Matching L2-Ok.png) */}
      <div
        className={`absolute inset-0 p-4 flex flex-col justify-between transition-all duration-300 backdrop-blur-md z-20 ${
          isHovered
            ? 'opacity-100 pointer-events-auto scale-100'
            : 'opacity-0 pointer-events-none scale-95'
        } ${
          isDark
            ? 'bg-[#020d1c]/95 text-white border-2 border-[#00e3fd]'
            : 'bg-white/95 text-slate-900 border-2 border-indigo-500 shadow-2xl'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-[11px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                isDark
                  ? 'bg-[#00dfff]/20 text-[#00e3fd] border border-[#00dfff]/40'
                  : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
              }`}
            >
              WHAT&apos;S NEXT?
            </span>
            <span className="font-mono text-[10px] text-[#82a5bb]">
              {capability.id}
            </span>
          </div>

          <p
            className={`text-xs font-bold leading-snug mb-3 ${
              isDark ? 'text-[#eaf7ff]' : 'text-slate-800'
            }`}
          >
            On click, you will go to L3 Details View
          </p>

          {/* Feature List */}
          <ul className="space-y-1.5 text-[11px]">
            <li className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#00e3fd]' : 'bg-indigo-600'}`} />
              <span className={isDark ? 'text-[#c6e4f5]' : 'text-slate-700'}>
                Subdomains (L2.1)
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#a855f7]' : 'bg-purple-600'}`} />
              <span className={isDark ? 'text-[#c6e4f5]' : 'text-slate-700'}>
                Solution Bundles (L4) {bundles.length > 0 ? `(${bundles.length})` : ''}
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#34d399]' : 'bg-emerald-600'}`} />
              <span className={isDark ? 'text-[#c6e4f5]' : 'text-slate-700'}>
                Key Metrics
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#f59e0b]' : 'bg-amber-600'}`} />
              <span className={isDark ? 'text-[#c6e4f5]' : 'text-slate-700'}>
                Popular Providers
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#ec4899]' : 'bg-pink-600'}`} />
              <span className={isDark ? 'text-[#c6e4f5]' : 'text-slate-700'}>
                Recent Activity
              </span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div
          className={`pt-2.5 border-t flex items-center justify-between font-mono text-xs font-bold ${
            isDark
              ? 'border-[#00dfff]/20 text-[#00e3fd]'
              : 'border-slate-200 text-indigo-600'
          }`}
        >
          <span>Click to explore</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
