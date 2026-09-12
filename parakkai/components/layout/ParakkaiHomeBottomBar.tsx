/**
 * P-PARAKKAI-003 — Parakkai Home Compact Bottom Context Bar
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.2
 * 
 * Compact, non-scrolling single-viewport footer for the PARAKKAI HOME experience.
 * Sits flush at the bottom of the viewport with contextual quick-jump nodes,
 * 6:30 AM solar alignment status, temple location context, and ambiance controls.
 */

import React, { useState, useEffect } from 'react';
import {
  Sun,
  Sparkles,
  Volume2,
  VolumeX,
  Compass,
  MapPin,
  Calendar,
  Flame,
  Video,
  Trees,
  ShoppingBag,
  Landmark,
  Layers,
  ChevronUp
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';

interface ParakkaiHomeBottomBarProps {
  activeTheme: ParakkaiThemeDefinition;
  sceneMode: 'facade' | 'aerial' | 'lake';
  onSceneChange: (scene: 'facade' | 'aerial' | 'lake') => void;
  onNavigate: (view: string) => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  onOpenQuickInfo?: () => void;
}

export const ParakkaiHomeBottomBar: React.FC<ParakkaiHomeBottomBarProps> = ({
  activeTheme,
  sceneMode,
  onSceneChange,
  onNavigate,
  isSoundMuted,
  onToggleSound,
  onOpenQuickInfo
}) => {
  const [sunlightStatus, setSunlightStatus] = useState(() =>
    parakkaiService.getSunlightMiracleStatus()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSunlightStatus(parakkaiService.getSunlightMiracleStatus());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const quickNodes = [
    { id: 'today', label: 'Today', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'darshan', label: 'Darshan', icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" /> },
    { id: 'events', label: 'Events', icon: <Flame className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'media', label: 'Videos', icon: <Video className="w-3.5 h-3.5 text-red-400" /> },
    { id: 'map', label: 'Map', icon: <Compass className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'temple', label: 'Explore', icon: <Landmark className="w-3.5 h-3.5 text-emerald-400" /> }
  ];

  return (
    <footer
      id="parakkai-home-compact-bar"
      className="w-full shrink-0 border-t select-none z-30 transition-colors px-3 sm:px-6 py-1.5 flex items-center justify-between gap-3 text-xs" style={{ backgroundColor: activeTheme.colors.surfaceCanvas, borderColor: activeTheme.colors.borderSubtle, color: activeTheme.colors.textSecondary }}
    >
      {/* 1. Left: 6:30 AM Miracle Indicator & Scene Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={() => onNavigate('today')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer border text-[11px]"
          style={
            sunlightStatus.isMiracleWindow
              ? {
                  backgroundColor: `${activeTheme.colors.sacredGold}30`,
                  color: activeTheme.colors.textGold,
                  borderColor: activeTheme.colors.sacredGold,
                  fontWeight: 700
                }
              : {
                  backgroundColor: activeTheme.colors.surfaceCard,
                  color: activeTheme.colors.textSecondary,
                  borderColor: activeTheme.colors.borderSubtle
                }
          }
          title="Daily 6:30 AM Solar Ray Alignment at Lotus Feet"
        >
          <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="font-serif">
            {sunlightStatus.isMiracleWindow ? (
              <span style={{ color: activeTheme.colors.textGold, fontWeight: 700 }}>6:30 AM Miracle Active Now!</span>
            ) : (
              <span>6:30 AM Ray: {Math.floor(sunlightStatus.minutesUntilNextMiracle / 60)}h {sunlightStatus.minutesUntilNextMiracle % 60}m</span>
            )}
          </span>
        </button>

        {/* Scene Switcher (Façade / Aerial / Lake) */}
        <div className="hidden md:flex items-center p-0.5 rounded-lg border text-[11px]" style={{ backgroundColor: activeTheme.colors.surfaceCard, borderColor: activeTheme.colors.borderSubtle }}>
          <button
            type="button"
            onClick={() => onSceneChange('facade')}
            className="px-2 py-0.5 rounded-md transition-all cursor-pointer font-medium"
            style={{
              backgroundColor: sceneMode === 'facade' ? `${activeTheme.colors.sacredGold}25` : 'transparent',
              color: sceneMode === 'facade' ? activeTheme.colors.sacredGold : activeTheme.colors.textSecondary,
              fontWeight: sceneMode === 'facade' ? 600 : 400
            }}
            title="Temple Façade View (Approved Artwork)"
          >
            Façade
          </button>
          <button
            type="button"
            onClick={() => onSceneChange('aerial')}
            className="px-2 py-0.5 rounded-md transition-all cursor-pointer font-medium flex items-center gap-1"
            style={{
              backgroundColor: sceneMode === 'aerial' ? `${activeTheme.colors.sacredGold}25` : 'transparent',
              color: sceneMode === 'aerial' ? activeTheme.colors.sacredGold : activeTheme.colors.textSecondary,
              fontWeight: sceneMode === 'aerial' ? 600 : 400
            }}
            title="Aerial Drone View over Coconut Groves & Kodimaram"
          >
            <span>Aerial Grove</span>
          </button>
          <button
            type="button"
            onClick={() => onSceneChange('lake')}
            className="px-2 py-0.5 rounded-md transition-all cursor-pointer font-medium"
            style={{
              backgroundColor: sceneMode === 'lake' ? `${activeTheme.colors.sacredGold}25` : 'transparent',
              color: sceneMode === 'lake' ? activeTheme.colors.sacredGold : activeTheme.colors.textSecondary,
              fontWeight: sceneMode === 'lake' ? 600 : 400
            }}
            title="Sacred Parakkai Lake at Sunrise"
          >
            Teertham Lake
          </button>
        </div>
      </div>

      {/* 2. Center: Contextual Quick Nodes per Section 9 (Today, Darshan, Events, Videos, Map, Explore) */}
      <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-0.5">
        {quickNodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => onNavigate(node.id)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium text-[11px] whitespace-nowrap border border-transparent" style={{ color: activeTheme.colors.textSecondary }}
            title={`Go to ${node.label}`}
          >
            <span>{node.icon}</span>
            <span>{node.label}</span>
          </button>
        ))}
      </nav>

      {/* 3. Right: Sound & Location Status */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onToggleSound}
          className="p-1 rounded-lg transition-colors cursor-pointer border border-transparent" style={{ color: activeTheme.colors.textSecondary }}
          title={isSoundMuted ? 'Unmute Temple Chime Synthesizer' : 'Mute Temple Chime Synthesizer'}
        >
          {isSoundMuted ? (
            <VolumeX className="w-4 h-4 text-slate-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
          )}
        </button>

        <div className="hidden sm:flex items-center gap-1 text-[11px] font-sans" style={{ color: activeTheme.colors.textSecondary }}>
          <MapPin className="w-3 h-3 text-[#00e3fd]" />
          <span className="truncate">Sannadhi St, Parakkai • 629601</span>
        </div>

        {onOpenQuickInfo && (
          <button
            type="button"
            onClick={onOpenQuickInfo}
            className="px-2 py-0.5 rounded text-[11px] font-medium border flex items-center gap-1 cursor-pointer transition-colors" style={{ color: activeTheme.colors.textSecondary, backgroundColor: activeTheme.colors.surfaceCard, borderColor: activeTheme.colors.borderSubtle }}
            title="Temple Information & Sthala Puranam"
          >
            <span>Temple Info</span>
            <ChevronUp className="w-3 h-3 text-slate-400" />
          </button>
        )}
      </div>
    </footer>
  );
};
