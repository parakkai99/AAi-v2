/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Component: AAiJsonStickyTrigger
 * Purpose:
 * Persistent, Sticky Floating Widget for AAi JSON & Data Map Inspection.
 * Stays accessible across ALL screens, tabs, and navigation states
 * (Universe L1-L6, Detail, Intent Core, Agent OS).
 *
 * Features:
 * - Microsoft Windows / AAi 4-square grid symbol
 * - Shows live layer indicator & context badge
 * - 1-Click toggle for floating non-blocking Catalog Inspector
 * - Shortcut hint (Ctrl+J)
 */

import React from 'react';
import { Database, Sparkles } from 'lucide-react';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { useUniversalNavigation } from '@/src/context/UniversalNavigationContext';

export interface AAiJsonStickyTriggerProps {
  isInspectorOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const AAiJsonStickyTrigger: React.FC<AAiJsonStickyTriggerProps> = ({
  isInspectorOpen,
  onToggle,
  className = '',
}) => {
  const { theme, intent } = useArchitectAny();
  const navContext = useUniversalNavigation();
  const isDark = theme === 'dark';

  // Determine active context layer or coordinate label
  const activeLayerLabel = React.useMemo(() => {
    if (navContext?.currentWaypoint?.layer) {
      const layer = navContext.currentWaypoint.layer;
      return layer === 1 ? 'L1 Domain'
        : layer === 2 ? 'L2 Subdomain'
        : layer === 3 ? 'L3 Capability'
        : layer === 4 ? 'L4 Bundle'
        : layer === 5 ? 'L5 Solution'
        : 'L0 Intent';
    }
    if (intent?.domainId) return 'L2 Subdomain';
    return 'L1 Universe';
  }, [navContext?.currentWaypoint, intent]);

  return (
    <aside
      aria-label="AAi JSON Inspection Quick Access"
      className={`fixed bottom-5 right-5 z-40 select-none ${className}`}
    >
      <button
        type="button"
        id="btn-sticky-aai-json-inspector"
        onClick={onToggle}
        className={`group flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-200 cursor-pointer ${
          isInspectorOpen
            ? 'bg-[#00e3fd]/20 text-[#00e3fd] border-[#00e3fd] shadow-[0_0_25px_rgba(0,227,253,0.4)] ring-2 ring-[#00e3fd]/40 scale-105'
            : isDark
            ? 'bg-[#031527]/90 hover:bg-[#062444] text-[#eaf7ff] border-[#00dfff]/40 hover:border-[#00e3fd] shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_15px_rgba(0,227,253,0.2)]'
            : 'bg-white/95 hover:bg-slate-100 text-slate-800 border-slate-300 hover:border-indigo-400 shadow-[0_8px_25px_rgba(0,0,0,0.15)]'
        }`}
        title="Toggle AAi JSON & Data Map Inspector (Ctrl+J)"
        aria-label="Toggle AAi JSON & Data Map Inspector (Ctrl+J)"
      >
        {/* AAi 4-Square Grid Icon */}
        <div
          className="grid grid-cols-2 gap-[2.5px] w-4 h-4 items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <span
            className={`w-[6px] h-[6px] rounded-[1px] transition-colors ${
              isInspectorOpen
                ? 'bg-[#00e3fd] shadow-[0_0_6px_#00e3fd]'
                : isDark
                ? 'bg-[#00e3fd] group-hover:bg-white'
                : 'bg-indigo-600 group-hover:bg-indigo-800'
            }`}
          />
          <span
            className={`w-[6px] h-[6px] rounded-[1px] transition-colors ${
              isInspectorOpen
                ? 'bg-[#00e3fd] shadow-[0_0_6px_#00e3fd]'
                : isDark
                ? 'bg-[#00e3fd] group-hover:bg-white'
                : 'bg-indigo-600 group-hover:bg-indigo-800'
            }`}
          />
          <span
            className={`w-[6px] h-[6px] rounded-[1px] transition-colors ${
              isInspectorOpen
                ? 'bg-[#00e3fd] shadow-[0_0_6px_#00e3fd]'
                : isDark
                ? 'bg-[#00e3fd] group-hover:bg-white'
                : 'bg-indigo-600 group-hover:bg-indigo-800'
            }`}
          />
          <span
            className={`w-[6px] h-[6px] rounded-[1px] transition-colors ${
              isInspectorOpen
                ? 'bg-[#00e3fd] shadow-[0_0_6px_#00e3fd]'
                : isDark
                ? 'bg-[#00e3fd] group-hover:bg-white'
                : 'bg-indigo-600 group-hover:bg-indigo-800'
            }`}
          />
        </div>

        {/* Text & Active Area Coordinates */}
        <div className="flex flex-col items-start leading-none text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-bold text-[#00e3fd]">
              {'{ }'} AAi Data Map
            </span>
            <span className="text-[9px] font-mono opacity-50 hidden sm:inline">
              Ctrl+J
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 group-hover:text-slate-200 truncate max-w-[120px]">
            {activeLayerLabel}
          </span>
        </div>

        {/* Pulse Indicator */}
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${
            isInspectorOpen
              ? 'bg-[#00e3fd] animate-ping'
              : 'bg-emerald-400 animate-pulse'
          }`}
          title="Live Context Active"
        />
      </button>
    </aside>
  );
};
