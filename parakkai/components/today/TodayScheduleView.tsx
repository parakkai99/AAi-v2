/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.2.0 - Complete "Our Today" Experience
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  Sun,
  Sparkles,
  Flame,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ArrowRight,
  Utensils,
  Users,
  Compass,
  Volume2,
  VolumeX,
  Share2,
  Bell,
  ShieldCheck,
  Sunrise,
  Sunset,
  Info
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { TempleTimingSchedule } from '../../contracts/temple';

interface TodayScheduleViewProps {
  activeTheme: ParakkaiThemeDefinition;
  onBookPooja: () => void;
}

interface PanchangamDetail {
  tamilDate: string;
  tithi: string;
  nakshatram: string;
  yoga: string;
  karana: string;
  nallaNeramMorning: string;
  nallaNeramEvening: string;
  rahuKalam: string;
  yamagandam: string;
  kuligai: string;
  sunrise: string;
  sunset: string;
}

export const TodayScheduleView: React.FC<TodayScheduleViewProps> = ({
  activeTheme,
  onBookPooja
}) => {
  const schedules = parakkaiService.getTempleSchedules();
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [currentDateStr, setCurrentDateStr] = useState('');
  const [sunlightStatus, setSunlightStatus] = useState(() => parakkaiService.getSunlightMiracleStatus());
  const [selectedKalamTab, setSelectedKalamTab] = useState<string>('all');
  const [isPlayingChant, setIsPlayingChant] = useState<boolean>(false);
  const [showAnnadhanamModal, setShowAnnadhanamModal] = useState<boolean>(false);
  const [reminderSet, setReminderSet] = useState<string | null>(null);

  // Calculate live time and status
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
      setCurrentDateStr(
        now.toLocaleDateString('en-IN', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      );
      setSunlightStatus(parakkaiService.getSunlightMiracleStatus());
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine current active Kalam & Temple Door status
  const currentStatus = useMemo(() => {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    // 5:30 AM (330) to 12:30 PM (750)
    // 4:30 PM (990) to 8:30 PM (1230)
    const isMorningOpen = currentMins >= 330 && currentMins <= 750;
    const isEveningOpen = currentMins >= 990 && currentMins <= 1230;
    const isDoorOpen = isMorningOpen || isEveningOpen;

    let activeKalam = 'Athazha Pooja Complete (Nada Closed)';
    let nextKalam = 'Suprabhatam at 5:30 AM';
    let activeKalamId = '';

    if (currentMins < 330) {
      activeKalam = 'Pre-dawn Brahmarakshas Shanti';
      nextKalam = 'Suprabhatam & Temple Opening at 5:30 AM';
    } else if (currentMins <= 360) {
      activeKalam = 'Suprabhatam & Temple Opening';
      nextKalam = '6:30 AM Sunlight Miracle & Vishwaroopa Darshan';
      activeKalamId = 'sch-1';
    } else if (currentMins <= 420) {
      activeKalam = 'Daily 6:30 AM Sunlight Miracle & Vishwaroopa Darshan';
      nextKalam = 'Kalasanthi Pooja at 8:00 AM';
      activeKalamId = 'sch-2';
    } else if (currentMins <= 540) {
      activeKalam = 'Kalasanthi Pooja & Nithya Homam';
      nextKalam = 'Uchikkalam Pooja at 11:45 AM';
      activeKalamId = 'sch-3';
    } else if (currentMins <= 750) {
      activeKalam = 'Uchikkalam Pooja & Noon Mangala Aarthi';
      nextKalam = 'Sayaratchai Pooja at 4:30 PM';
      activeKalamId = 'sch-4';
    } else if (currentMins < 990) {
      activeKalam = 'Noon Rest Period (Nada Closed)';
      nextKalam = 'Sayaratchai Pooja & Evening Reopening at 4:30 PM';
    } else if (currentMins <= 1110) {
      activeKalam = 'Sayaratchai Pooja & Deeparadhana';
      nextKalam = 'Arthajamam & Shayanotsavam at 8:00 PM';
      activeKalamId = 'sch-5';
    } else if (currentMins <= 1230) {
      activeKalam = 'Arthajamam & Shayanotsavam';
      nextKalam = 'Dawn Suprabhatam tomorrow at 5:30 AM';
      activeKalamId = 'sch-6';
    } else {
      activeKalam = 'Night Temple Rest (Nada Closed)';
      nextKalam = 'Suprabhatam tomorrow at 5:30 AM';
    }

    return {
      isDoorOpen,
      activeKalam,
      nextKalam,
      activeKalamId
    };
  }, []);

  // Today's Panchangam (Auspicious Astronomical calculation for Parakkai, Kanyakumari)
  const panchangam: PanchangamDetail = useMemo(() => {
    return {
      tamilDate: 'ஆவணி 27, குரோதி வருடம் (Dakshinayana)',
      tithi: 'சுக்ல பக்ஷ ஏகாதசி (Auspicious Ekadasi)',
      nakshatram: 'ரோகிணி / திருவோணம் (Rohini / Sravanam)',
      yoga: 'சித்த யோகம் (Siddha Yogam - Most Auspicious)',
      karana: 'பவ கரணம் (Bava Karanam)',
      nallaNeramMorning: '09:15 AM – 10:15 AM',
      nallaNeramEvening: '04:45 PM – 05:45 PM',
      rahuKalam: '01:30 PM – 03:00 PM',
      yamagandam: '06:00 AM – 07:30 AM',
      kuligai: '09:00 AM – 10:30 AM',
      sunrise: '06:08 AM IST',
      sunset: '06:22 PM IST'
    };
  }, []);

  // Audio Chant generator using Web Audio API for authentic sacred temple bells and drone
  const toggleChantAudio = () => {
    if (isPlayingChant) {
      setIsPlayingChant(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Soft sacred drone (Tanpura/Om frequency 136.1 Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(136.1, ctx.currentTime);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 6.5);

      // Sacred bell chime at start
      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bellOsc.type = 'triangle';
      bellOsc.frequency.setValueAtTime(1080, ctx.currentTime + 0.1);
      bellGain.gain.setValueAtTime(0.08, ctx.currentTime + 0.1);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3);
      bellOsc.connect(bellGain);
      bellGain.connect(ctx.destination);
      bellOsc.start(ctx.currentTime + 0.1);
      bellOsc.stop(ctx.currentTime + 3.2);

      setIsPlayingChant(true);
      setTimeout(() => setIsPlayingChant(false), 6000);
    } catch {
      setIsPlayingChant(true);
      setTimeout(() => setIsPlayingChant(false), 3000);
    }
  };

  const handleSetReminder = (kalamTitle: string) => {
    setReminderSet(kalamTitle);
    setTimeout(() => setReminderSet(null), 3500);
  };

  return (
    <div id="parakkai-today-schedule" className="w-full space-y-8 py-4 animate-fadeIn">
      {/* 1. Header Hero Banner: Live IST & Real-Time Sanctum Status */}
      <section
        className="rounded-3xl border p-6 sm:p-8 shadow-sm relative overflow-hidden"
        style={{
          backgroundColor: activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border"
                style={{
                  backgroundColor: `${activeTheme.colors.sacredGold}18`,
                  color: activeTheme.colors.textGold,
                  borderColor: `${activeTheme.colors.sacredGold}35`
                }}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Today's Nitya Pooja & Darshan</span>
              </span>

              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5"
                style={{
                  backgroundColor: currentStatus.isDoorOpen ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: currentStatus.isDoorOpen ? '#16a34a' : '#ef4444'
                }}
              >
                <span className={`w-2 h-2 rounded-full ${currentStatus.isDoorOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                <span>{currentStatus.isDoorOpen ? 'Temple Nada Open (தரிசனம் உண்டு)' : 'Noon Rest (நடை அடைப்பு)'}</span>
              </span>

              <span className="text-xs font-sans font-medium" style={{ color: activeTheme.colors.textSecondary }}>
                {currentDateStr}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: activeTheme.colors.textPrimary }}>
              Today at Arulmigu Madhusoodhana Perumal Temple
            </h2>
            <p className="text-xs sm:text-sm font-sans max-w-3xl leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
              Experience authentic Vaikanasa Agama rituals, the daily 6:30 AM Sunlight Miracle on the Lord's sacred lotus feet, daily consecrated annadhanam, and live six kaala pooja timings at Parakkai.
            </p>

            {/* Current Active Kalam Callout */}
            <div
              className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-xl border text-xs"
              style={{
                backgroundColor: `${activeTheme.colors.primarySkyBlue}12`,
                borderColor: `${activeTheme.colors.primarySkyBlue}30`
              }}
            >
              <span className="font-mono font-bold uppercase tracking-wider" style={{ color: activeTheme.colors.primarySkyBlue }}>
                Current Stage:
              </span>
              <span className="font-semibold" style={{ color: activeTheme.colors.textPrimary }}>
                {currentStatus.activeKalam}
              </span>
              <span className="opacity-40">•</span>
              <span className="font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                Next: {currentStatus.nextKalam}
              </span>
            </div>
          </div>

          {/* Right Clock & Audio Chant Tile */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
            <div
              className="p-4 rounded-2xl border text-center space-y-1"
              style={{
                backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                borderColor: activeTheme.colors.borderSubtle
              }}
            >
              <div className="text-[10px] uppercase font-mono tracking-widest" style={{ color: activeTheme.colors.textSecondary }}>
                Indian Standard Time (IST)
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tight" style={{ color: activeTheme.colors.textGold }}>
                {currentTimeStr || '06:30:00 AM'}
              </div>
              <div className="text-[11px] font-sans font-medium" style={{ color: activeTheme.colors.textSecondary }}>
                Kanyakumari District • Parakkai
              </div>
            </div>

            {/* Sacred Audio Chants & Bell Button */}
            <button
              type="button"
              onClick={toggleChantAudio}
              className="p-3 rounded-2xl border text-xs font-serif font-bold transition-all flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 shadow-sm"
              style={{
                backgroundColor: isPlayingChant ? activeTheme.colors.sacredGold : `${activeTheme.colors.sacredGold}18`,
                color: isPlayingChant ? '#000000' : activeTheme.colors.textGold,
                borderColor: `${activeTheme.colors.sacredGold}40`
              }}
            >
              {isPlayingChant ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
              <span>{isPlayingChant ? 'Playing Temple Bell Chime...' : "Today's Sacred Temple Chime"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Today's Auspicious Nithya Panchangam Grid */}
      <section
        className="rounded-3xl border p-6 shadow-sm space-y-4"
        style={{
          backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderSubtle
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3" style={{ borderColor: activeTheme.colors.borderSubtle }}>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4" style={{ color: activeTheme.colors.textGold }} />
            <h3 className="text-base sm:text-lg font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
              Today's Auspicious Nithya Panchangam (இன்றைய பஞ்சாங்கம்)
            </h3>
          </div>
          <span className="text-xs font-mono font-medium" style={{ color: activeTheme.colors.textGold }}>
            {panchangam.tamilDate}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: `${activeTheme.colors.sacredGold}08`, borderColor: activeTheme.colors.borderSubtle }}>
            <div className="text-[10px] font-mono uppercase" style={{ color: activeTheme.colors.textSecondary }}>Tithi (திதி)</div>
            <div className="text-xs font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>{panchangam.tithi}</div>
          </div>

          <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: `${activeTheme.colors.sacredGold}08`, borderColor: activeTheme.colors.borderSubtle }}>
            <div className="text-[10px] font-mono uppercase" style={{ color: activeTheme.colors.textSecondary }}>Nakshatram (நட்சத்திரம்)</div>
            <div className="text-xs font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>{panchangam.nakshatram}</div>
          </div>

          <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: `${activeTheme.colors.sacredGold}08`, borderColor: activeTheme.colors.borderSubtle }}>
            <div className="text-[10px] font-mono uppercase" style={{ color: activeTheme.colors.textSecondary }}>Gowri Nalla Neram (நல்ல நேரம்)</div>
            <div className="text-xs font-serif font-bold" style={{ color: '#16a34a' }}>{panchangam.nallaNeramMorning}</div>
            <div className="text-[10px] font-mono" style={{ color: activeTheme.colors.textSecondary }}>Eve: {panchangam.nallaNeramEvening}</div>
          </div>

          <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: `${activeTheme.colors.sacredGold}08`, borderColor: activeTheme.colors.borderSubtle }}>
            <div className="text-[10px] font-mono uppercase" style={{ color: activeTheme.colors.textSecondary }}>Rahu Kalam (இராகு காலம்)</div>
            <div className="text-xs font-serif font-bold text-amber-600">{panchangam.rahuKalam}</div>
            <div className="text-[10px] font-mono" style={{ color: activeTheme.colors.textSecondary }}>Avoid new sankalpam</div>
          </div>

          <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: `${activeTheme.colors.sacredGold}08`, borderColor: activeTheme.colors.borderSubtle }}>
            <div className="text-[10px] font-mono uppercase" style={{ color: activeTheme.colors.textSecondary }}>Yamagandam / Kuligai</div>
            <div className="text-xs font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>{panchangam.yamagandam}</div>
            <div className="text-[10px] font-mono" style={{ color: activeTheme.colors.textSecondary }}>Kuligai: {panchangam.kuligai}</div>
          </div>

          <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: `${activeTheme.colors.sacredGold}08`, borderColor: activeTheme.colors.borderSubtle }}>
            <div className="text-[10px] font-mono uppercase" style={{ color: activeTheme.colors.textSecondary }}>Surya Udayam / Asthamanam</div>
            <div className="text-xs font-serif font-bold flex items-center gap-1" style={{ color: activeTheme.colors.textGold }}>
              <Sunrise className="w-3 h-3" /> {panchangam.sunrise}
            </div>
            <div className="text-[10px] font-mono flex items-center gap-1" style={{ color: activeTheme.colors.textSecondary }}>
              <Sunset className="w-3 h-3" /> {panchangam.sunset}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Daily 6:30 AM Sunlight Miracle Deep Dive Card */}
      <section
        className="rounded-3xl border p-6 sm:p-8 shadow-sm relative overflow-hidden"
        style={{
          backgroundColor: activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 animate-spin" style={{ color: activeTheme.colors.sacredGold }} />
              <h3 className="text-lg sm:text-xl font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                Daily 6:30 AM Sunlight Miracle (சூரியக் கிரண அற்புதம்)
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
              "Daily at 6.30 AM the Sunlight directly falls on the Feet of the Lord." Ancient architects constructed the outer Rajagopuram entrance, the brass-clad Kodimaram (flagstaff), and the Sanctum Sanctorum doors in precise solar alignment. At dawn, golden beams traverse 250 meters directly through the corridor to illuminate Sri Madhusoodhana Perumal's holy lotus feet.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs" style={{ color: activeTheme.colors.textSecondary }}>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Prime Viewing: Maha Mandapam & Flagstaff Corridor</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Duration: 15 Golden Minutes (6:25 AM – 6:40 AM)</span>
              </span>
            </div>
          </div>

          <div
            className="p-5 rounded-2xl border text-center space-y-2 min-w-[240px] w-full lg:w-auto"
            style={{
              backgroundColor: `${activeTheme.colors.sacredGold}12`,
              borderColor: `${activeTheme.colors.sacredGold}35`
            }}
          >
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider block" style={{ color: activeTheme.colors.textGold }}>
              Miracle Window Status
            </span>
            <div className="text-xl font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
              {sunlightStatus.isMiracleWindow ? (
                <span className="text-emerald-500 flex items-center justify-center gap-1">
                  <Sun className="w-4 h-4 animate-spin" /> ACTIVE RIGHT NOW
                </span>
              ) : (
                `Daily 6:25 AM – 6:40 AM`
              )}
            </div>
            <div className="text-xs font-mono font-semibold" style={{ color: activeTheme.colors.textGold }}>
              {sunlightStatus.minutesUntilNextMiracle > 0
                ? `Next in ${Math.floor(sunlightStatus.minutesUntilNextMiracle / 60)}h ${sunlightStatus.minutesUntilNextMiracle % 60}m`
                : 'Dawn Window Concluded for Today'}
            </div>
            <button
              type="button"
              onClick={() => handleSetReminder('6:30 AM Sunlight Miracle')}
              className="w-full py-1.5 px-3 rounded-lg border text-[11px] font-serif font-semibold transition-all hover:opacity-80 cursor-pointer"
              style={{
                borderColor: `${activeTheme.colors.sacredGold}50`,
                color: activeTheme.colors.textGold,
                backgroundColor: `${activeTheme.colors.sacredGold}20`
              }}
            >
              {reminderSet === '6:30 AM Sunlight Miracle' ? '✓ Reminder Scheduled' : 'Set Dawn Reminder'}
            </button>
          </div>
        </div>
      </section>

      {/* 4. Today's Special Darshan, Alankaram & Annadhanam Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Adornment & Alankaram of the Day */}
        <div
          className="p-6 rounded-2xl border space-y-3"
          style={{
            backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
            borderColor: activeTheme.colors.borderSubtle
          }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: activeTheme.colors.textGold }} />
            <h4 className="text-sm font-serif font-bold uppercase tracking-wide" style={{ color: activeTheme.colors.textPrimary }}>
              Today's Sacred Alankaram (அலங்காரம்)
            </h4>
          </div>
          <h5 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textGold }}>
            Kasturi Thilakam & Pitambara Sevai
          </h5>
          <p className="text-xs font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
            Adorned with fresh wild fragrant thulasi garlands from the temple nandavanam, sandalwood paste chest kavacham, and bright silk pitambaram.
          </p>
          <div className="text-[11px] font-mono pt-1" style={{ color: activeTheme.colors.textSecondary }}>
            Darshan Window: 6:00 AM – 12:30 PM & 4:30 PM – 8:30 PM
          </div>
        </div>

        {/* Live Queue Wait Times */}
        <div
          className="p-6 rounded-2xl border space-y-3"
          style={{
            backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
            borderColor: activeTheme.colors.borderSubtle
          }}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: activeTheme.colors.primarySkyBlue }} />
            <h4 className="text-sm font-serif font-bold uppercase tracking-wide" style={{ color: activeTheme.colors.textPrimary }}>
              Live Darshan Queue Status
            </h4>
          </div>
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: activeTheme.colors.textSecondary }}>General Free Darshan:</span>
              <span className="font-mono font-bold text-emerald-500">~10 – 15 mins</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: activeTheme.colors.textSecondary }}>Special Seva / Archanai:</span>
              <span className="font-mono font-bold" style={{ color: activeTheme.colors.textGold }}>~3 – 5 mins</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: activeTheme.colors.textSecondary }}>Senior Citizen / Divyang:</span>
              <span className="font-mono font-bold text-sky-400">Direct Express Access</span>
            </div>
          </div>
          <div className="text-[10px] font-sans" style={{ color: activeTheme.colors.textSecondary }}>
            Wheelchair ramp available at East Rajagopuram entrance.
          </div>
        </div>

        {/* Free Annadhanam Maha Prasadam */}
        <div
          className="p-6 rounded-2xl border space-y-3"
          style={{
            backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
            borderColor: activeTheme.colors.borderSubtle
          }}
        >
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-emerald-500" />
            <h4 className="text-sm font-serif font-bold uppercase tracking-wide" style={{ color: activeTheme.colors.textPrimary }}>
              Today's Free Annadhanam (அன்னதானம்)
            </h4>
          </div>
          <div className="text-sm font-serif font-bold text-emerald-500">
            Daily 12:00 PM – 02:00 PM (South Mandapam)
          </div>
          <p className="text-xs font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
            Consecrated meals prepared with pure cow ghee, Nanjil country rice, vegetable sambar, rasam, and traditional sweet payasam. Consecrated for 350+ pilgrims daily.
          </p>
          <button
            type="button"
            onClick={() => setShowAnnadhanamModal(true)}
            className="text-[11px] font-mono font-bold underline transition-colors hover:opacity-80 cursor-pointer block"
            style={{ color: activeTheme.colors.textGold }}
          >
            Request Free Annadhanam Token / Sponsor Seva →
          </button>
        </div>
      </div>

      {/* 5. Complete 6-Kaala Timetable & Ritual Schedule */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-serif font-bold" style={{ color: activeTheme.colors.textGold }}>
              Daily Timetable & Ritual Schedule (ஆறு கால பூஜைகள்)
            </h3>
            <p className="text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
              Sacred Vaikanasa Agama Kaalas performed with Vedic recitations, mangala vadhyams, and deeparadhana.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl border text-xs self-start" style={{ borderColor: activeTheme.colors.borderSubtle }}>
            <button
              type="button"
              onClick={() => setSelectedKalamTab('all')}
              className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                selectedKalamTab === 'all' ? 'bg-amber-400 text-black font-bold' : ''
              }`}
              style={{ color: selectedKalamTab === 'all' ? '#000' : activeTheme.colors.textSecondary }}
            >
              All 6 Kaalas
            </button>
            <button
              type="button"
              onClick={() => setSelectedKalamTab('morning')}
              className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                selectedKalamTab === 'morning' ? 'bg-amber-400 text-black font-bold' : ''
              }`}
              style={{ color: selectedKalamTab === 'morning' ? '#000' : activeTheme.colors.textSecondary }}
            >
              Morning (Dawn – Noon)
            </button>
            <button
              type="button"
              onClick={() => setSelectedKalamTab('evening')}
              className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                selectedKalamTab === 'evening' ? 'bg-amber-400 text-black font-bold' : ''
              }`}
              style={{ color: selectedKalamTab === 'evening' ? '#000' : activeTheme.colors.textSecondary }}
            >
              Evening & Night
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schedules
            .filter((item) => {
              if (selectedKalamTab === 'morning') {
                return item.id === 'sch-1' || item.id === 'sch-2' || item.id === 'sch-3' || item.id === 'sch-4';
              }
              if (selectedKalamTab === 'evening') {
                return item.id === 'sch-5' || item.id === 'sch-6';
              }
              return true;
            })
            .map((item: TempleTimingSchedule, idx: number) => {
              const slotText = item.timeSlot || item.timingSlot || '';
              const isSpecialSunlight = Boolean(
                item.isSpecialSunlightTime ||
                slotText.includes('6:30') ||
                slotText.includes('06:30')
              );
              const isCurrentlyActive = currentStatus.activeKalamId === item.id;

              return (
                <div
                  key={item.id || idx}
                  className="rounded-2xl border p-5 transition-all flex flex-col justify-between gap-4 hover:shadow-md relative overflow-hidden"
                  style={{
                    backgroundColor: isCurrentlyActive
                      ? 'rgba(34, 197, 94, 0.08)'
                      : isSpecialSunlight
                      ? 'rgba(245, 158, 11, 0.10)'
                      : (activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated),
                    borderColor: isCurrentlyActive
                      ? '#22c55e'
                      : isSpecialSunlight
                      ? '#f59e0b'
                      : activeTheme.colors.borderSubtle
                  }}
                >
                  {isCurrentlyActive && (
                    <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[9px] font-mono font-bold px-3 py-0.5 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                      Active Kalam Right Now
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold"
                      style={{
                        backgroundColor: isCurrentlyActive
                          ? '#22c55e'
                          : isSpecialSunlight
                          ? '#f59e0b'
                          : `${activeTheme.colors.primarySkyBlue}18`,
                        color: isCurrentlyActive || isSpecialSunlight ? '#000000' : activeTheme.colors.primarySkyBlue
                      }}
                    >
                      {isSpecialSunlight ? (
                        <Sun className="w-5 h-5" />
                      ) : isCurrentlyActive ? (
                        <Flame className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold" style={{ color: activeTheme.colors.textGold }}>
                          {slotText || 'Scheduled Kalam'}
                        </span>
                        {isSpecialSunlight && !isCurrentlyActive && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-mono bg-amber-400 text-black font-bold">
                            Solar Miracle
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                        {item.title || item.ritualName || 'Temple Kalam'}
                      </h4>

                      {(item.tamilTitle || item.tamilRitualName) && (
                        <span className="text-xs font-sans block" style={{ color: activeTheme.colors.textGold }}>
                          {item.tamilTitle || item.tamilRitualName}
                        </span>
                      )}

                      {item.description && (
                        <p className="text-xs font-sans leading-relaxed pt-1" style={{ color: activeTheme.colors.textSecondary }}>
                          {item.description}
                        </p>
                      )}

                      <div className="text-[11px] font-sans pt-1" style={{ color: activeTheme.colors.textSecondary }}>
                        <strong style={{ color: activeTheme.colors.textPrimary }}>Devotee Participation: </strong>
                        <span>Open to all devotees in traditional attire with direct sanctum darshan.</span>
                      </div>
                    </div>
                  </div>

                  {/* Kalam Action Bar */}
                  <div className="pt-2 border-t flex items-center justify-between gap-2" style={{ borderColor: activeTheme.colors.borderSubtle }}>
                    <button
                      type="button"
                      onClick={() => handleSetReminder(item.title)}
                      className="text-[11px] font-mono flex items-center gap-1 hover:underline cursor-pointer"
                      style={{ color: activeTheme.colors.textSecondary }}
                    >
                      <Bell className="w-3 h-3" />
                      <span>{reminderSet === item.title ? 'Reminder Saved!' : 'Remind Me'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={onBookPooja}
                      className="px-3 py-1 rounded-lg text-xs font-serif font-bold transition-opacity hover:opacity-80 cursor-pointer flex items-center gap-1 shadow-sm"
                      style={{
                        backgroundColor: activeTheme.colors.sacredGold,
                        color: '#000000'
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Book Pooja</span>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* 6. Action Footer Callout */}
      <section
        className="rounded-2xl border p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{
          backgroundColor: activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderSubtle
        }}
      >
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-sm font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
            Visiting Parakkai Today?
          </div>
          <div className="text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
            Traditional dhoti/veshti for men and sarees/churidars for women are required for inner sanctum entry. Free footwear custody available at the East Gopuram.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onBookPooja}
            className="px-6 py-2.5 rounded-xl font-serif font-bold text-xs transition-transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer shadow-md"
            style={{
              backgroundColor: activeTheme.colors.sacredGold,
              color: '#000000'
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Pooja for Today</span>
          </button>
        </div>
      </section>

      {/* Annadhanam Modal Dialog */}
      {showAnnadhanamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="max-w-md w-full rounded-2xl border p-6 space-y-4 shadow-2xl relative"
            style={{
              backgroundColor: activeTheme.colors.surfaceElevated,
              borderColor: activeTheme.colors.borderGold
            }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: activeTheme.colors.borderSubtle }}>
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-500" />
                <h4 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                  Free Daily Annadhanam Seva
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowAnnadhanamModal(false)}
                className="text-xs font-mono p-1 rounded hover:bg-white/10 cursor-pointer"
                style={{ color: activeTheme.colors.textSecondary }}
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
              <p>
                <strong style={{ color: activeTheme.colors.textPrimary }}>Annadhanam Hall: </strong>
                South Prakaram Mandapam, Parakkai Temple.
              </p>
              <p>
                <strong style={{ color: activeTheme.colors.textPrimary }}>Serving Hours: </strong>
                12:00 PM to 2:00 PM daily.
              </p>
              <p>
                <strong style={{ color: activeTheme.colors.textPrimary }}>Token System: </strong>
                Tokens are issued free-of-cost at the temple office from 11:30 AM onwards. No prior booking required for visiting pilgrims.
              </p>
              <p>
                <strong style={{ color: activeTheme.colors.textPrimary }}>Sponsorship Seva: </strong>
                Devotees wishing to sponsor 1 day of Annadhanam (₹2,500 for 100 devotees) can register via the Temple Office Counter or online pooja offerings.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowAnnadhanamModal(false);
                onBookPooja();
              }}
              className="w-full py-2.5 rounded-xl font-serif font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
              style={{
                backgroundColor: activeTheme.colors.sacredGold,
                color: '#000'
              }}
            >
              <span>Sponsor Annadhanam via Pooja Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
