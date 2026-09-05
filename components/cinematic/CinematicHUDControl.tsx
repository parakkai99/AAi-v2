/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Component: CinematicHUDControl
 * Provides quick toggle & configuration menu for AAi Cinematic Navigation
 */

import React, { useState, useRef, useEffect } from 'react';
import { useCinematicNavigation } from '@/src/context/CinematicNavigationContext';
import {
  Rocket,
  Settings,
  Volume2,
  VolumeX,
  Zap,
  Check,
  RotateCw,
  Sparkles,
  Gauge,
  Palette,
  X,
} from 'lucide-react';

export const CinematicHUDControl: React.FC = () => {
  const { config, updateConfig, resetConfig, startJourney, isTravelling } = useCinematicNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleTestFlight = () => {
    setIsOpen(false);
    startJourney(
      {
        layer: 1,
        layerLabel: 'L1 Domain Universe',
        id: 'D06',
        name: 'Strategic Architecture & Advisory',
        code: 'D06',
        color: '#00e3fd',
        coordinates: { x: 50, y: 50, z: 0, sector: 'SEC-D06-ALPHA' },
      },
      {
        layer: 2,
        layerLabel: 'L2 Business Sub-World',
        id: 'D06.01',
        name: 'Enterprise AI Transformation',
        code: 'D06.01',
        color: '#38bdf8',
        coordinates: { x: 80, y: 120, z: -800, sector: 'SEC-D06-01-BETA' },
        description: 'Autonomous enterprise architectures and multi-agent AI ecosystems',
      }
    );
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Compact HUD Trigger Pill */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isTravelling}
        aria-label="AAi Cinematic Navigation Settings"
        className={`flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] sm:text-[11px] border transition-all cursor-pointer ${
          config.enabled
            ? 'bg-[#00e3fd]/15 text-[#00e3fd] border-[#00e3fd]/40 hover:bg-[#00e3fd]/25 shadow-[0_0_8px_rgba(0,227,253,0.2)] font-semibold'
            : 'bg-[#07192c] text-[#9ec5de] border-[#00dfff]/20 hover:text-white'
        }`}
        title="AAi Cinematic Navigation Journey Settings"
      >
        <Rocket className={`w-3 h-3 ${config.enabled ? 'text-[#00e3fd]' : 'text-[#9ec5de]'}`} />
        <span className="hidden sm:inline">Flight:</span>
        <span className="capitalize">{config.enabled ? config.speed : 'Off'}</span>
      </button>

      {/* Configuration Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#020d1a] border border-[#00dfff]/30 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] p-3.5 z-50 text-left font-sans">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#00dfff]/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00e3fd]" />
              <h4 className="font-mono text-xs font-bold text-[#eaf7ff] uppercase">
                Cinematic Navigation
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-[#07192c] text-[#9ec5de] hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#041224] border border-[#00dfff]/15 mb-3">
            <div>
              <div className="text-xs font-semibold text-[#eaf7ff]">Spatial Travel Experience</div>
              <div className="text-[10px] font-mono text-[#9ec5de]">
                Feel navigation across L1 → L6 layers
              </div>
            </div>
            <button
              onClick={() => updateConfig({ enabled: !config.enabled })}
              className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                config.enabled ? 'bg-[#00e3fd]' : 'bg-[#1e293b]'
              }`}
            >
              <div
                className={`bg-[#020914] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  config.enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Speed Presets */}
          <div className="mb-3">
            <label className="flex items-center gap-1 text-[11px] font-mono text-[#9ec5de] mb-1.5">
              <Gauge className="w-3 h-3 text-[#00e3fd]" />
              TRAVEL SPEED
            </label>
            <div className="grid grid-cols-3 gap-1 bg-[#041224] p-1 rounded-lg border border-[#00dfff]/15">
              {(['cinematic', 'swift', 'instant'] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => updateConfig({ speed: spd })}
                  className={`py-1 text-[10px] font-mono rounded capitalize transition-all cursor-pointer ${
                    config.speed === spd
                      ? 'bg-[#00e3fd] text-[#001f24] font-bold shadow-sm'
                      : 'text-[#c3d9ea] hover:text-white'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Palettes */}
          <div className="mb-3">
            <label className="flex items-center gap-1 text-[11px] font-mono text-[#9ec5de] mb-1.5">
              <Palette className="w-3 h-3 text-[#00e3fd]" />
              GALAXY MOOD
            </label>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'CALM', label: 'Calm', color: '#00e3fd' },
                { id: 'VIBRANT', label: 'Vibrant', color: '#a855f7' },
                { id: 'ENERGETIC', label: 'Energetic', color: '#f59e0b' },
                { id: 'MYSTIC', label: 'Mystic', color: '#c084fc' },
                { id: 'TECH', label: 'Tech', color: '#10b981' },
                { id: 'AURORA', label: 'Aurora', color: '#06b6d4' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => updateConfig({ mood: m.id as any })}
                  className={`flex items-center gap-1 px-1.5 py-1 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                    config.mood === m.id
                      ? 'bg-[#07192c] border-[#00e3fd] text-[#eaf7ff] font-bold'
                      : 'bg-[#041224] border-[#00dfff]/15 text-[#9ec5de] hover:text-white'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: m.color, boxShadow: `0 0 6px ${m.color}` }}
                  />
                  <span className="truncate">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Transition Style */}
          <div className="mb-3">
            <label className="flex items-center gap-1 text-[11px] font-mono text-[#9ec5de] mb-1.5">
              <Sparkles className="w-3 h-3 text-[#00e3fd]" />
              TRANSITION STYLE
            </label>
            <div className="grid grid-cols-2 gap-1">
              {[
                { id: 'STAR_TRAIL_VOYAGE', label: 'Star Trail' },
                { id: 'WORMHOLE_TRANSIT', label: 'Wormhole' },
                { id: 'NEBULA_DRIFT', label: 'Nebula Drift' },
                { id: 'GALACTIC_ORBIT', label: 'Galactic Orbit' },
                { id: 'HYPER_JUMP_FLASH', label: 'Hyper Jump' },
                { id: 'CONSTELLATION_PATH', label: 'Constellation' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => updateConfig({ style: s.id as any })}
                  className={`px-1.5 py-1 text-[9.5px] font-mono rounded border text-left truncate transition-all cursor-pointer ${
                    config.style === s.id
                      ? 'bg-[#07192c] border-[#00e3fd] text-[#eaf7ff] font-bold'
                      : 'bg-[#041224] border-[#00dfff]/15 text-[#9ec5de] hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#041224] border border-[#00dfff]/15 mb-3">
            <div className="flex items-center gap-2">
              {config.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#00e3fd]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#9ec5de]" />
              )}
              <span className="text-xs text-[#eaf7ff]">Spatial Audio FX</span>
            </div>
            <button
              onClick={() => updateConfig({ soundEnabled: !config.soundEnabled })}
              className={`px-2 py-0.5 rounded text-[10px] font-mono border cursor-pointer ${
                config.soundEnabled
                  ? 'bg-[#00e3fd]/20 text-[#00e3fd] border-[#00e3fd]/40 font-bold'
                  : 'bg-[#07192c] text-[#9ec5de] border-[#00dfff]/20'
              }`}
            >
              {config.soundEnabled ? 'ON' : 'MUTED'}
            </button>
          </div>

          {/* Actions: Test Flight & Reset */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#00dfff]/20">
            <button
              onClick={handleTestFlight}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#00e3fd] hover:bg-[#38bdf8] text-[#001f24] font-mono text-xs font-bold transition-colors cursor-pointer shadow-[0_0_12px_rgba(0,227,253,0.3)]"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Test Flight (L1 → L2)</span>
            </button>

            <button
              onClick={resetConfig}
              className="p-1.5 rounded-lg bg-[#07192c] hover:bg-[#0c2742] text-[#9ec5de] hover:text-white border border-[#00dfff]/20 transition-colors cursor-pointer"
              title="Reset to defaults"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
