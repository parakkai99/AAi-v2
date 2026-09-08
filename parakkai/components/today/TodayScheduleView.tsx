/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React, { useState, useEffect } from 'react';
import {
  Clock,
  Sun,
  Sparkles,
  Flame,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { TempleTimingSchedule } from '../../contracts/temple';

interface TodayScheduleViewProps {
  activeTheme: ParakkaiThemeDefinition;
  onBookPooja: () => void;
}

export const TodayScheduleView: React.FC<TodayScheduleViewProps> = ({
  activeTheme,
  onBookPooja
}) => {
  const schedules = parakkaiService.getTempleSchedules();
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [sunlightStatus, setSunlightStatus] = useState(() => parakkaiService.getSunlightMiracleStatus());

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
      setSunlightStatus(parakkaiService.getSunlightMiracleStatus());
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="parakkai-today-schedule" className="w-full space-y-10 py-4 animate-fadeIn">
      {/* Header Banner */}
      <section
        className="rounded-3xl border p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: `${activeTheme.colors.surfaceElevated}`,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Daily Nitya Pooja Timetable</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Live Temple Hours
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Today at Parakkai Temple
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
              Arulmigu Madhusoodhana Perumal Temple adheres to ancient Vaikanasa and Travancore-Nanjil Agama traditions with 6 daily kaala poojas, daily archana, and consecrated deeparadhana.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-center space-y-1 self-start md:self-auto min-w-[200px]">
            <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
              Indian Standard Time (IST)
            </div>
            <div className="text-2xl font-mono font-bold text-amber-400">
              {currentTimeStr || '06:30:00 AM'}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">
              Temple Nada Active
            </div>
          </div>
        </div>
      </section>

      {/* Special Feature: Daily 6:30 AM Miracle Deep Dive */}
      <section
        className="rounded-2xl border p-6 shadow-xl relative overflow-hidden"
        style={{
          backgroundColor: `${activeTheme.colors.surfaceCanvas}`,
          borderColor: '#f59e0b'
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400 animate-spin" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                Daily 6:30 AM Sunlight Miracle (சூரியக் கிரண அற்புதம்)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              "Daily at 6.30 AM the Sunlight directly falls on the Feet of the Lord." Ancient architects constructed the gopuram entrance and Kodimaram flagstaff such that the rising sun illuminates the Sanctum Sanctorum, creating a golden halo around the Lord's holy feet.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 text-center space-y-1 min-w-[220px]">
            <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block">
              Status Window
            </span>
            <span className="text-base font-serif font-bold text-white">
              {sunlightStatus.isMiracleWindow ? 'ACTIVE NOW' : 'Daily 6:25 AM – 6:40 AM'}
            </span>
            <p className="text-[10px] text-slate-400 font-sans">
              Best viewed from the Maha Mandapam flagstaff corridor.
            </p>
          </div>
        </div>
      </section>

      {/* Complete Timetable Table / Grid */}
      <section className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-white" style={{ color: activeTheme.colors.textGold }}>
          Daily Timetable & Ritual Schedule
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schedules.map((item: TempleTimingSchedule, idx: number) => {
            const slotText = item.timeSlot || item.timingSlot || '';
            const isSpecialSunlight = Boolean(
              item.isSpecialSunlightTime ||
              slotText.includes('6:30') ||
              slotText.includes('06:30')
            );
            return (
              <div
                key={item.id || idx}
                className={`rounded-2xl border p-5 transition-all flex items-start gap-4 ${
                  isSpecialSunlight
                    ? 'border-amber-400 bg-amber-500/10 shadow-lg'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900/90'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold ${
                    isSpecialSunlight
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'bg-slate-800 text-amber-300'
                  }`}
                >
                  {isSpecialSunlight ? <Sun className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {slotText || 'Scheduled Kalam'}
                    </span>
                    {isSpecialSunlight && (
                      <span className="text-[9px] px-2 py-0.2 rounded-full font-mono bg-amber-400 text-black font-bold">
                        Solar Phenomenon
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-serif font-bold text-white">
                    {item.title || item.ritualName || 'Temple Kalam'}
                  </h4>

                  {(item.tamilTitle || item.tamilRitualName) && (
                    <span className="text-xs text-amber-300/80 font-sans block">
                      {item.tamilTitle || item.tamilRitualName}
                    </span>
                  )}

                  {item.description && (
                    <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
                      {item.description}
                    </p>
                  )}

                  {item.devoteeParticipation && (
                    <div className="text-[11px] text-slate-400 font-sans pt-1">
                      <strong className="text-slate-300">Sanctum Access: </strong>
                      <span>{item.devoteeParticipation}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action Footer Callout */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
        <div className="text-xs text-slate-400 font-sans">
          Special festivals (Ekadasi, Panguni Therottam) have extended darshan hours until 11:00 PM.
        </div>
        <button
          type="button"
          onClick={onBookPooja}
          className="px-5 py-2.5 rounded-xl font-serif font-bold text-xs bg-amber-500 hover:bg-amber-400 text-black transition-colors flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>Book Pooja for Today</span>
        </button>
      </div>
    </div>
  );
};
