/**
 * P-PARAKKAI-003 — Parakkai Left Navigation Rail (Non-Scrolling, Single-Viewport Fit)
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.2
 * 
 * Strict non-scrolling discovery rail fitting entirely within the viewport.
 * Features compact icons, clean Light Sky-Blue styling, and quick access to all canonical experiences.
 */

import React, { useState } from 'react';
import {
  Landmark,
  Sparkles,
  Sun,
  Flame,
  Video,
  BookOpen,
  Trees,
  Compass,
  ChevronLeft,
  ChevronRight,
  Layers,
  ShoppingBag,
  Users,
  MapPin
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';

interface ParakkaiLeftRailProps {
  currentView: string;
  activeTheme: ParakkaiThemeDefinition;
  onNavigate: (view: string) => void;
}

export const ParakkaiLeftRail: React.FC<ParakkaiLeftRailProps> = ({
  currentView,
  activeTheme,
  onNavigate
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Exact primary navigation items as specified in P-PARAKKAI-004 Section 7
  const discoverItems = [
    { id: 'temple', label: 'Temple Sanctum', icon: <Landmark className="w-3.5 h-3.5 text-amber-400" />, badge: undefined },
    { id: 'darshan', label: 'Sacred Darshan', icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" />, badge: undefined },
    { id: 'today', label: 'Today at Parakkai', icon: <Sun className="w-3.5 h-3.5 text-amber-400" />, badge: '6:30 AM' },
    { id: 'events', label: 'Festivals & Events', icon: <Flame className="w-3.5 h-3.5 text-orange-400" />, badge: undefined },
    { id: 'media', label: 'Devotional Videos', icon: <Video className="w-3.5 h-3.5 text-red-400" />, badge: undefined },
    { id: 'nature', label: 'Parakkai Nature', icon: <Trees className="w-3.5 h-3.5 text-emerald-400" />, badge: undefined },
    { id: 'map', label: 'Sacred Map', icon: <Compass className="w-3.5 h-3.5 text-sky-400" />, badge: undefined },
    { id: 'blog', label: 'Temple Stories', icon: <BookOpen className="w-3.5 h-3.5 text-indigo-300" />, badge: undefined }
  ];

  return (
    <aside
      id="parakkai-discovery-left-rail"
      className={`hidden xl:flex flex-col border rounded-2xl transition-all duration-200 select-none z-20 h-full overflow-hidden shrink-0 shadow-lg ${
        isCollapsed ? 'w-14' : 'w-56'
      }`}
      style={{
        backgroundColor: activeTheme.colors.surfaceElevated || '#03162b',
        borderColor: activeTheme.colors.borderSubtle || 'rgba(0, 227, 253, 0.2)'
      }}
    >
      {/* Rail Header with Toggle */}
      <div
        className="px-3 py-2 border-b flex items-center justify-between shrink-0 border-[#00e3fd]/20"
      >
        {!isCollapsed && (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e3fd] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#00e3fd]">
              DISCOVER
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#052b4f] transition-colors mx-auto cursor-pointer"
          title={isCollapsed ? 'Expand Navigation Rail' : 'Collapse Navigation Rail'}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Primary Discovery Items (Compact, non-scrolling single-line layout) */}
      <nav className="p-1.5 space-y-1 flex-1 overflow-hidden flex flex-col justify-between">
        <div className="space-y-1">
          {discoverItems.map((item) => {
            const isSelected = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-full px-2.5 py-1.5 rounded-xl text-left transition-all flex items-center gap-2 cursor-pointer group text-xs border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/25 to-amber-600/10 border-amber-400/60 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-[#052b4f]/70 border-transparent'
                }`}
                title={item.label}
              >
                <div
                  className={`p-1 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                    isSelected
                      ? 'bg-amber-400/20 text-amber-300'
                      : 'bg-[#020914] text-slate-400 group-hover:text-[#00e3fd] group-hover:bg-[#020914]/80'
                  }`}
                >
                  {item.icon}
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0 flex items-center justify-between">
                    <span className="font-serif truncate leading-tight text-[11.5px]">{item.label}</span>
                    {item.badge && (
                      <span className="text-[8.5px] px-1.5 py-0.2 rounded-full font-mono font-bold ml-1 shrink-0 bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Compact Devotional Inscription */}
        {!isCollapsed && (
          <div className="p-2 mt-1 rounded-xl border text-center font-serif text-[11px] shrink-0 bg-[#020914]/80 border-amber-500/20">
            <div className="text-amber-300 font-bold text-[10.5px]">ஓம் நமோ நாராயணாய</div>
            <p className="text-[8.5px] text-slate-400 italic font-sans leading-tight mt-0.5">
              Daily 6:30 AM Solar Ray Alignment
            </p>
          </div>
        )}
      </nav>
    </aside>
  );
};
