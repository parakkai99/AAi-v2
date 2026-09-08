/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React, { useState, useEffect } from 'react';
import { Sun, Sparkles, Clock, Compass, Info, CheckCircle2 } from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';

interface SunlightMiracleWidgetProps {
  activeTheme: ParakkaiThemeDefinition;
  onNavigateToSchedule: () => void;
}

export const SunlightMiracleWidget: React.FC<SunlightMiracleWidgetProps> = ({
  activeTheme,
  onNavigateToSchedule
}) => {
  const [status, setStatus] = useState(() => parakkaiService.getSunlightMiracleStatus());
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const tick = () => {
      setStatus(parakkaiService.getSunlightMiracleStatus());
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const hoursLeft = Math.floor(status.minutesUntilNextMiracle / 60);
  const minutesLeft = status.minutesUntilNextMiracle % 60;

  return (
    <div
      id="sunlight-miracle-widget"
      className="w-full rounded-2xl border p-5 relative overflow-hidden transition-all shadow-xl select-none"
      style={{
        backgroundColor: `${activeTheme.colors.surfaceElevated}`,
        borderColor: status.isMiracleWindow ? '#f59e0b' : activeTheme.colors.borderGold
      }}
    >
      {/* Radiant Glow in Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Headline & Status */}
        <div className="lg:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <span
              className={`p-1.5 rounded-lg border flex items-center justify-center ${
                status.isMiracleWindow
                  ? 'bg-amber-400 text-black border-amber-300 animate-spin'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}
            >
              <Sun className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
              Solar Architectural Miracle • 6:30 AM IST
            </span>
            {status.isMiracleWindow && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-black animate-pulse">
                MIRACLE OCCURRING NOW
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
            "Daily at 6.30 AM the Sunlight directly falls on the Feet of the Lord"
          </h3>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Ancient temple architects engineered a precise east-facing solar alignment. At dawn, natural sunbeams pass through the entrance portal, strike the Golden Kodimaram (Dwajasthambam), and cast sacred golden light onto the lotus feet of Arulmigu Madhusoodhana Perumal.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Current Time: {timeStr || '06:30:00 AM'}</span>
            </div>
            <span className="opacity-30">•</span>
            <div className="flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Sanctum: Garbha Griha Portal</span>
            </div>
          </div>
        </div>

        {/* Right Column: Countdown Box & Navigation */}
        <div className="lg:col-span-4 flex flex-col items-center sm:items-end justify-center">
          <div className="w-full sm:max-w-xs p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center space-y-2">
            <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
              Next Miracle Window
            </div>

            {status.isMiracleWindow ? (
              <div className="text-2xl font-serif font-black text-amber-300 animate-pulse">
                IN PROGRESS
              </div>
            ) : (
              <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">
                {hoursLeft}h {minutesLeft}m
              </div>
            )}

            <div className="text-[10px] text-slate-400 font-sans">
              Begins at approx 6:25 AM to 6:40 AM Daily
            </div>

            <button
              type="button"
              onClick={onNavigateToSchedule}
              className="w-full py-2 px-3 rounded-lg text-xs font-medium bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1"
            >
              <span>View Full Daily Timings</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
