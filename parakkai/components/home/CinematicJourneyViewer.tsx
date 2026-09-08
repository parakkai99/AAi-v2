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
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  MapPin,
  Sun,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight
} from 'lucide-react';
import { CinematicJourneyStation } from '../../contracts/temple';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';

interface CinematicJourneyViewerProps {
  activeTheme: ParakkaiThemeDefinition;
  onNavigateToDarshan: () => void;
  onNavigateToToday: () => void;
  onNavigateToMap: () => void;
}

export const CinematicJourneyViewer: React.FC<CinematicJourneyViewerProps> = ({
  activeTheme,
  onNavigateToDarshan,
  onNavigateToToday,
  onNavigateToMap
}) => {
  const stations = parakkaiService.getJourneyStations();
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(true);

  const currentStation = stations[activeStationIndex];

  // Auto-play cycling (every 9 seconds if enabled)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStationIndex((prev) => (prev + 1) % stations.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, stations.length]);

  const handlePrev = () => {
    setActiveStationIndex((prev) => (prev === 0 ? stations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStationIndex((prev) => (prev === stations.length - 1 ? 0 : prev + 1));
  };

  // Play a soft synthetic temple bell chime using Web Audio API when user advances or clicks chime
  const playTempleBell = () => {
    if (isSoundMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 chime tone
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.5);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  return (
    <section
      id="cinematic-journey-stations"
      className="relative w-full rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500"
      style={{
        backgroundColor: activeTheme.colors.surfaceCanvas,
        borderColor: activeTheme.colors.borderGold
      }}
    >
      {/* Top Experience Banner: Image 2 Architectural Signature */}
      <div
        className="px-6 py-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
        style={{
          backgroundColor: `${activeTheme.colors.surfaceElevated}`,
          borderColor: activeTheme.colors.borderSubtle
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center font-serif text-lg border shadow-inner"
            style={{
              backgroundColor: `${activeTheme.colors.surfaceCanvas}`,
              borderColor: activeTheme.colors.borderGold,
              color: activeTheme.colors.textGold
            }}
          >
            🪷
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-serif font-bold" style={{ color: activeTheme.colors.textGold }}>
                The 7 Stations of Parakkai
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Image 2 Canonical Experience
              </span>
            </div>
            <p className="text-xs text-slate-300">
              A Living Temple • A Living Village • A Timeless Heritage
            </p>
          </div>
        </div>

        {/* Controls: Audio, Auto-tour, Step buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const nextMuted = !isSoundMuted;
              setIsSoundMuted(nextMuted);
              if (nextMuted === false) playTempleBell();
            }}
            className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors border cursor-pointer ${
              !isSoundMuted
                ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title={isSoundMuted ? 'Unmute Sacred Temple Chimes' : 'Mute Sound'}
          >
            {isSoundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline font-mono text-[10px]">
              {!isSoundMuted ? 'Chime Active' : 'Chime Muted'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors border cursor-pointer ${
              isAutoPlaying
                ? 'bg-sky-500/20 text-sky-300 border-sky-400 animate-pulse'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
            title="Auto-walk through all 7 Stations"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoPlaying ? 'Pause Tour' : 'Auto Tour'}</span>
          </button>

          <div className="flex items-center gap-1 ml-1">
            <button
              type="button"
              onClick={() => {
                handlePrev();
                playTempleBell();
              }}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 cursor-pointer"
              title="Previous Station"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                handleNext();
                playTempleBell();
              }}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 cursor-pointer"
              title="Next Station"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 7 Station Tab Navigation Bar directly reflecting Image 2 numbering */}
      <div
        className="px-4 py-2 border-b overflow-x-auto flex items-center gap-2 scrollbar-none"
        style={{
          backgroundColor: `${activeTheme.colors.surfaceCanvas}`,
          borderColor: activeTheme.colors.borderSubtle
        }}
      >
        {stations.map((st, idx) => {
          const isSelected = idx === activeStationIndex;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => {
                setActiveStationIndex(idx);
                playTempleBell();
              }}
              className={`px-3 py-2 rounded-xl text-left transition-all flex-shrink-0 flex items-center gap-2.5 cursor-pointer border ${
                isSelected
                  ? 'border-amber-400 bg-amber-500/15 shadow-md scale-102'
                  : 'border-slate-800/80 bg-slate-950/40 hover:bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full text-xs font-bold font-mono flex items-center justify-center ${
                  isSelected
                    ? 'bg-amber-400 text-black shadow'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {st.number}
              </span>
              <div className="flex flex-col">
                <span
                  className={`text-xs font-medium font-serif ${
                    isSelected ? 'font-bold' : ''
                  }`}
                  style={{ color: isSelected ? activeTheme.colors.textGold : undefined }}
                >
                  {st.title}
                </span>
                <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                  {st.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Station Dramatic Visual Stage */}
      <div className="relative min-h-[480px] lg:min-h-[520px] p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
        {/* Visual Environment Canvas (Specific visual scene styling for each of the 7 stations) */}
        <div className="absolute inset-0 pointer-events-none transition-all duration-700">
          {/* Station 1: Village Dawn Agrahara & Coconut Palms */}
          {currentStation.id === 1 && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c2444] via-[#081830] to-[#040d1a]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/15 rounded-full blur-2xl" />
              {/* Village street silhouette */}
              <div className="absolute bottom-0 inset-x-0 h-32 opacity-25 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-600/30 via-slate-900/60 to-transparent" />
            </div>
          )}

          {/* Station 2: Sacred Peepal Tree & Sakthi Vinayakar */}
          {currentStation.id === 2 && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b2818] via-[#051a10] to-[#020e09]">
              <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            </div>
          )}

          {/* Station 3: Approaching the Temple along Sannadhi Street */}
          {currentStation.id === 3 && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#072448] via-[#04152d] to-[#020914]">
              <div className="absolute top-0 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
            </div>
          )}

          {/* Station 4: Dasavataram Arch & Gopuram Portal */}
          {currentStation.id === 4 && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#122238] via-[#091524] to-[#030910]">
              <div className="absolute top-10 left-1/3 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-600/15 rounded-full blur-2xl" />
            </div>
          )}

          {/* Station 5: Golden Doors Open into Mandapam */}
          {currentStation.id === 5 && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#241705] via-[#150d03] to-[#080501]">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/25 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/80" />
            </div>
          )}

          {/* Station 6: Golden Kodimaram & 6:30 AM Sunlight Beam */}
          {currentStation.id === 6 && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a1c04] via-[#140e03] to-[#050301]">
              {/* Piercing Sunbeam Angle from top-left into center */}
              <div className="absolute -top-20 left-1/4 w-32 h-[600px] bg-gradient-to-b from-amber-200/40 via-amber-400/25 to-transparent rotate-12 blur-lg" />
              <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
            </div>
          )}

          {/* Station 7: Darshan — Sanctum Sanctorum */}
          {currentStation.id === 7 && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c223e] via-[#071526] to-[#020710]">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-400/20 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300/10 via-transparent to-black/80" />
            </div>
          )}
        </div>

        {/* Floating Content Card */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text narrative, quote, spiritual essence */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4xl font-serif font-black" style={{ color: activeTheme.colors.textGold }}>
                {currentStation.number}.
              </span>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold">
                  {currentStation.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {currentStation.title}
                </h3>
              </div>
            </div>

            {currentStation.tamilTitle && (
              <p className="text-sm font-sans text-amber-300/90 font-medium">
                {currentStation.tamilTitle}
              </p>
            )}

            {currentStation.quote && (
              <blockquote className="text-base sm:text-lg italic font-serif text-slate-200 border-l-2 pl-4 py-1" style={{ borderColor: activeTheme.colors.sacredGold }}>
                "{currentStation.quote}"
              </blockquote>
            )}

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {currentStation.description}
            </p>

            {/* Spiritual Meaning Pill */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-medium font-serif">Spiritual Significance: </strong>
                <span className="text-slate-300 font-sans">{currentStation.spiritualMeaning}</span>
              </div>
            </div>

            {/* Liturgical Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {currentStation.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {currentStation.id === 7 ? (
                <button
                  type="button"
                  onClick={onNavigateToDarshan}
                  className="px-5 py-2.5 rounded-xl font-serif font-bold text-xs flex items-center gap-2 shadow-lg transition-all transform hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: activeTheme.colors.sacredGold,
                    color: '#000'
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enter Sanctum & Book Pooja</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : currentStation.id === 6 ? (
                <button
                  type="button"
                  onClick={onNavigateToToday}
                  className="px-5 py-2.5 rounded-xl font-serif font-bold text-xs flex items-center gap-2 shadow-lg transition-all transform hover:scale-105 cursor-pointer bg-amber-500 hover:bg-amber-400 text-black"
                >
                  <Sun className="w-4 h-4" />
                  <span>View 6:30 AM Miracle Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    handleNext();
                    playTempleBell();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer bg-sky-600 hover:bg-sky-500 text-white"
                >
                  <span>Step to Station {currentStation.id + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={onNavigateToMap}
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center gap-1.5 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Locate on Sacred Map</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage Art Panel */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div
              className="w-full max-w-sm p-6 rounded-2xl border shadow-2xl backdrop-blur-md relative overflow-hidden"
              style={{
                backgroundColor: `${activeTheme.colors.surfaceElevated}dd`,
                borderColor: activeTheme.colors.borderGold
              }}
            >
              {/* Sacred Corner Filigrees */}
              <span className="absolute top-2 left-2 text-amber-400/40 text-xs">✦</span>
              <span className="absolute top-2 right-2 text-amber-400/40 text-xs">✦</span>
              <span className="absolute bottom-2 left-2 text-amber-400/40 text-xs">✦</span>
              <span className="absolute bottom-2 right-2 text-amber-400/40 text-xs">✦</span>

              {/* Station Specific Visual Representation */}
              <div className="h-64 rounded-xl flex flex-col items-center justify-center text-center p-6 border border-amber-500/20 relative overflow-hidden bg-slate-950/60">
                {/* Station 1 Art */}
                {currentStation.id === 1 && (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full mx-auto bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl border border-amber-500/40 shadow-inner">
                      🏡
                    </div>
                    <div className="text-sm font-serif font-bold text-amber-300">
                      Parakkai Agrahara
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      Auspicious dawn breaking over the tiled rooftops, holy basil gardens, and the temple car street.
                    </p>
                  </div>
                )}

                {/* Station 2 Art */}
                {currentStation.id === 2 && (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full mx-auto bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl border border-emerald-500/40 shadow-inner">
                      🐘
                    </div>
                    <div className="text-sm font-serif font-bold text-amber-300">
                      Arasamotu Sakthi Vinayakar
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      Ancient stone idol under centuries-old Arasa Maram, adorned with sacred marigold garlands.
                    </p>
                  </div>
                )}

                {/* Station 3 Art */}
                {currentStation.id === 3 && (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full mx-auto bg-sky-500/20 text-sky-400 flex items-center justify-center text-3xl border border-sky-500/40 shadow-inner">
                      🚶
                    </div>
                    <div className="text-sm font-serif font-bold text-sky-200">
                      Sannadhi Car Street
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      Devotees walking toward the towering white Raja Gopuram in morning reflection.
                    </p>
                  </div>
                )}

                {/* Station 4 Art */}
                {currentStation.id === 4 && (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full mx-auto bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl border border-amber-500/40 shadow-inner">
                      🏛️
                    </div>
                    <div className="text-sm font-serif font-bold text-amber-300">
                      Dasavataram Archway
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      Sri Garuda and Sri Anjaneya flanking the 10 Avatars of Lord Vishnu in sculpted relief.
                    </p>
                  </div>
                )}

                {/* Station 5 Art */}
                {currentStation.id === 5 && (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full mx-auto bg-amber-500/25 text-amber-300 flex items-center justify-center text-3xl border border-amber-400 shadow-lg animate-pulse">
                      🚪
                    </div>
                    <div className="text-sm font-serif font-bold text-amber-200">
                      Ornate Golden Doors
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      Embossed brass doors opening into the pillared maha mandapam with glowing oil lamps.
                    </p>
                  </div>
                )}

                {/* Station 6 Art */}
                {currentStation.id === 6 && (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full mx-auto bg-amber-500/30 text-amber-300 flex items-center justify-center text-3xl border border-amber-400 shadow-xl">
                      ☀️
                    </div>
                    <div className="text-sm font-serif font-bold text-amber-300">
                      Golden Kodimaram (6:30 AM)
                    </div>
                    <p className="text-[11px] text-slate-200 font-sans font-medium">
                      "Daily at 6.30 AM the Sunlight directly falls on the Feet of the Lord"
                    </p>
                  </div>
                )}

                {/* Station 7 Art */}
                {currentStation.id === 7 && (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full mx-auto bg-amber-500/30 text-amber-200 flex items-center justify-center text-3xl border border-amber-400 shadow-2xl">
                      🪷
                    </div>
                    <div className="text-sm font-serif font-bold text-amber-300">
                      Madhusoodhana Perumal
                    </div>
                    <p className="text-[11px] text-slate-200 font-sans">
                      Sri Devi & Bhoodevi Sametha Madhusoodhana Perumal giving direct divine grace (Anugraham).
                    </p>
                  </div>
                )}
              </div>

              {/* Station Context Badge */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 flex items-center gap-1 font-sans">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{currentStation.locationContext}</span>
                </span>
                <span className="font-mono text-amber-400 font-bold">
                  {currentStation.number} / 7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Station Navigation Dots & Quote (Bottom Bar) */}
        <div className="relative z-10 pt-6 mt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {stations.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveStationIndex(idx);
                  playTempleBell();
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeStationIndex
                    ? 'w-8 bg-amber-400'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Jump to Station ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-xs text-slate-400 font-serif italic text-center sm:text-right">
            Parakkai — A Divine Place, A Living Village, A Timeless Heritage
          </div>
        </div>
      </div>
    </section>
  );
};
