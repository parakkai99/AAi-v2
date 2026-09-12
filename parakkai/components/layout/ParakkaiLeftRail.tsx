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
        isCollapsed ? 'w-14' : 'w-64'
      }`}
      style={{
        backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated || '#03162b',
        borderColor: activeTheme.colors.borderSubtle || 'rgba(0, 227, 253, 0.2)'
      }}
    >
      {/* Rail Header with Toggle */}
      <div
        className="px-3.5 py-2.5 border-b flex items-center justify-between shrink-0"
        style={{ borderColor: activeTheme.colors.borderSubtle }}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeTheme.colors.primarySkyBlue }}
            />
            <span
              className="text-xs font-bold uppercase tracking-wider font-mono"
              style={{ color: activeTheme.colors.primarySkyBlue }}
            >
              DISCOVER
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg transition-colors mx-auto cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
          style={{ color: activeTheme.colors.textSecondary }}
          title={isCollapsed ? 'Expand Navigation Rail' : 'Collapse Navigation Rail'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Discovery Items */}
      <nav className="p-2 space-y-1.5 flex-1 overflow-y-auto flex flex-col justify-between">
        <div className="space-y-1.5">
          {discoverItems.map((item) => {
            const isSelected = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-full px-3 py-2 rounded-xl text-left transition-all flex items-center gap-2.5 cursor-pointer group text-xs sm:text-sm border relative ${
                  isSelected ? 'font-bold' : 'font-medium hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                style={
                  isSelected
                    ? {
                        color: activeTheme.colors.textPrimary,
                        backgroundColor: `${activeTheme.colors.primarySkyBlue}12`,
                        borderColor: `${activeTheme.colors.primarySkyBlue}26`
                      }
                    : {
                        color: activeTheme.colors.textSecondary,
                        borderColor: 'transparent',
                        backgroundColor: 'transparent'
                      }
                }
                title={item.label}
              >
                {isSelected && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                    style={{ backgroundColor: activeTheme.colors.primarySkyBlue || activeTheme.colors.sacredGold }}
                  />
                )}
                <div
                  className="p-1.5 rounded-lg flex items-center justify-center transition-colors shrink-0"
                  style={{
                    backgroundColor: isSelected ? 'rgba(2, 132, 199, 0.12)' : 'rgba(148, 163, 184, 0.1)',
                    color: isSelected ? activeTheme.colors.primarySkyBlue : activeTheme.colors.textSecondary
                  }}
                >
                  {item.icon}
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0 flex items-center justify-between">
                    <span className="font-serif truncate leading-tight text-xs sm:text-sm">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ml-1 shrink-0 border"
                        style={{
                          backgroundColor: activeTheme.colors.surfaceCard,
                          color: activeTheme.colors.textGold || activeTheme.colors.sacredGold,
                          borderColor: activeTheme.colors.borderGold || activeTheme.colors.borderSubtle
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Devotional Inscription */}
        {!isCollapsed && (
          <div
            className="p-3 mt-2 rounded-xl border text-center font-serif text-xs shrink-0 shadow-sm"
            style={{
              backgroundColor: activeTheme.colors.surfaceCanvas || activeTheme.colors.surfaceCard,
              borderColor: activeTheme.colors.borderSubtle
            }}
          >
            <div
              className="font-bold text-xs sm:text-sm"
              style={{ color: activeTheme.colors.textGold || activeTheme.colors.sacredGold }}
            >
              ஓம் நமோ நாராயணாய
            </div>
            <p
              className="text-[11px] font-sans leading-tight mt-1"
              style={{ color: activeTheme.colors.textSecondary }}
            >
              Daily 6:30 AM Solar Ray Alignment
            </p>
          </div>
        )}
      </nav>
    </aside>
  );
};
