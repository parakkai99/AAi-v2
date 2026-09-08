/**
 * P-PARAKKAI-002 — Parakkai Cinematic Grand Hero Experience
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.1
 * 
 * Embodies the approved visual identity:
 * - Image 2: Primary temple façade, white gopuram, Dasavataram arch, Garuda & Anjaneya, 6:30 AM sunbeam callout, 5 ecosystem cards, bottom navigation.
 * - Image 1: 7-station pilgrim journey sequence (My Home -> Vinayakar -> Approaching -> Entrance -> Doors -> Kodimaram -> Darshan).
 * - Image 3: Authentic aerial drone view with tall golden Kodimaram surrounded by lush coconut grove & terracotta roofs under blue sky (Background tweak).
 */

import React, { useState, useEffect } from 'react';
import {
  Sun,
  Sparkles,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Compass,
  MapPin,
  Calendar,
  Flame,
  Users,
  Video,
  Trees,
  ShoppingBag,
  ArrowRight,
  Upload,
  RotateCcw,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { parakkaiAssetService } from '../../services/parakkaiAssetService';

interface ParakkaiGrandHeroProps {
  activeTheme: ParakkaiThemeDefinition;
  onNavigate: (viewId: string) => void;
  onOpenBookingModal: () => void;
}

export const ParakkaiGrandHero: React.FC<ParakkaiGrandHeroProps> = ({
  activeTheme,
  onNavigate,
  onOpenBookingModal
}) => {
  // Atmospheric background scene mode: 'facade' (Image 2) | 'aerial' (Image 3) | 'lake'
  const [sceneMode, setSceneMode] = useState<'facade' | 'aerial' | 'lake'>('facade');
  const [isSunbeamSimulated, setIsSunbeamSimulated] = useState(true);
  const [activeStationIdx, setActiveStationIdx] = useState(0);
  const [isJourneyDrawerOpen, setIsJourneyDrawerOpen] = useState(false);
  const [isAutoPlayingJourney, setIsAutoPlayingJourney] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(true);
  const [customAssetKey, setCustomAssetKey] = useState<number>(0);
  const [showAssetManager, setShowAssetManager] = useState(false);

  const stations = parakkaiService.getJourneyStations();
  const currentStation = stations[activeStationIdx];

  // Listen for custom image updates
  useEffect(() => {
    return parakkaiAssetService.subscribe(() => {
      setCustomAssetKey((k) => k + 1);
    });
  }, []);

  // Soft temple bell audio synthesizer (native Web Audio API)
  const playTempleChime = () => {
    if (isSoundMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.0);
    } catch {
      // AudioContext unavailable
    }
  };

  // Auto-play journey
  useEffect(() => {
    if (!isAutoPlayingJourney) return;
    const timer = setInterval(() => {
      setActiveStationIdx((prev) => (prev + 1) % stations.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlayingJourney, stations.length]);

  // Handle local file upload for slots
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, slot: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          parakkaiAssetService.setAssetOverride(slot, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const customHeroFacade = parakkaiAssetService.getAssetUrl('hero_facade', '');
  const customAerialBg = parakkaiAssetService.getAssetUrl('aerial_bg', '');

  return (
    <section
      id="parakkai-grand-hero"
      key={customAssetKey}
      className="w-full relative overflow-hidden rounded-3xl border shadow-2xl transition-all select-none"
      style={{
        borderColor: activeTheme.colors.borderGold,
        backgroundColor: activeTheme.colors.surfaceCanvas
      }}
    >
      {/* =========================================================================
          1. TOP ATMOSPHERIC HEADER & CALLOUTS (Image 2)
          ========================================================================= */}
      <div className="relative z-20 px-4 sm:px-8 pt-5 pb-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-500/20 bg-gradient-to-b from-sky-950/80 via-slate-950/60 to-transparent backdrop-blur-sm">
        {/* Left Temple Brand Inscription */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-300">
            <span className="text-xl">🪷</span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold tracking-tight text-white drop-shadow-md">
              Parakkai
            </h1>
            <span className="text-xs sm:text-sm font-serif italic text-amber-200/90 hidden sm:inline">
              Madhusoodhana Perumal Temple
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-sky-200/80">
            <span>DEVOTION</span>
            <span>•</span>
            <span>HERITAGE</span>
            <span>•</span>
            <span>COMMUNITY</span>
            <span>•</span>
            <span className="text-amber-300 font-bold">A BRIGHTER TOMORROW</span>
          </div>
          <div className="text-[11px] font-serif text-amber-300/90 flex items-center gap-2">
            <span>பரக்கை மதுசூதன பெருமாள் திருக்கோவில்</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300 hidden sm:inline">A LIVING TEMPLE • A LIVING VILLAGE • A TIMELESS HERITAGE</span>
          </div>
        </div>

        {/* Right 6:30 AM Miracle Callout (Exact text from Image 2) */}
        <div className="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-end">
          <div
            className="flex items-center gap-3 px-3.5 py-2 rounded-2xl border border-amber-400/40 bg-amber-950/40 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)] cursor-pointer hover:border-amber-300 transition-all group"
            onClick={() => setIsSunbeamSimulated(!isSunbeamSimulated)}
            title="Toggle 6:30 AM Sacred Sunbeam Simulation"
          >
            <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-300 group-hover:scale-110 transition-transform">
              <Sun className={`w-5 h-5 ${isSunbeamSimulated ? 'text-amber-300 animate-spin-slow' : 'text-slate-400'}`} />
            </div>
            <div className="text-right">
              <div className="text-[11px] sm:text-xs font-serif font-bold text-amber-200 flex items-center gap-1 justify-end">
                <span>காலை 6.30 மணிக்கு சூரியன் திருவடியைத் தொடும்</span>
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-300/80">
                DAILY AT 6.30 AM THE SUNLIGHT DIRECTLY FALLS ON THE FEET OF THE LORD
              </div>
            </div>
          </div>

          {/* Quick Scene Mode Toggle */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs">
            <button
              type="button"
              onClick={() => setSceneMode('facade')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                sceneMode === 'facade'
                  ? 'bg-amber-500 text-black font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Approved Temple Façade (Image 2)"
            >
              Façade
            </button>
            <button
              type="button"
              onClick={() => setSceneMode('aerial')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                sceneMode === 'aerial'
                  ? 'bg-sky-500 text-black font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Aerial Drone View & Golden Kodimaram (Image 3 Background Tweak)"
            >
              <span>Aerial Grove</span>
              <span className="text-[9px] px-1 py-0.2 bg-black/20 rounded font-mono">P-002</span>
            </button>
            <button
              type="button"
              onClick={() => setSceneMode('lake')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                sceneMode === 'lake'
                  ? 'bg-emerald-500 text-black font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Parakkai Sacred Lake at Dawn"
            >
              Lake
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN CINEMATIC VISUAL STAGE
          ========================================================================= */}
      <div className="relative min-h-[440px] sm:min-h-[520px] lg:min-h-[580px] w-full flex items-center justify-center overflow-hidden">
        {/* Dynamic Scene Background Layers */}
        {sceneMode === 'facade' && (
          <div className="absolute inset-0 transition-opacity duration-700">
            {customHeroFacade ? (
              <img
                src={customHeroFacade}
                alt="Parakkai Temple Façade"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            ) : (
              /* Rich Vector & Environmental Layer reproducing Image 2 */
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-600 to-[#021329] overflow-hidden">
                {/* Clear Morning Blue Sky & Flying Birds */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/30 via-sky-500/20 to-transparent pointer-events-none" />

                {/* Animated Flying Sacred Birds */}
                <div className="absolute top-12 left-1/4 text-slate-800/40 text-xs animate-pulse">🕊️ 🕊️</div>
                <div className="absolute top-16 right-1/3 text-slate-800/40 text-[10px] animate-pulse">🕊️</div>

                {/* Coconut Palm Silhouettes swaying in gentle morning breeze */}
                <div className="absolute -left-12 bottom-24 w-48 h-96 opacity-40 pointer-events-none animate-palm-breeze">
                  <svg viewBox="0 0 100 200" fill="#063814" className="w-full h-full">
                    <path d="M48,200 Q50,100 55,20 Q60,10 75,0 Q60,15 50,40 Q40,65 48,200 Z" />
                    <path d="M55,20 Q30,10 10,25 Q35,25 55,20 Z" />
                    <path d="M55,20 Q80,15 95,30 Q70,30 55,20 Z" />
                    <path d="M52,35 Q20,35 0,55 Q25,50 52,35 Z" />
                    <path d="M58,35 Q85,35 100,55 Q75,50 58,35 Z" />
                  </svg>
                </div>
                <div className="absolute -right-12 bottom-24 w-52 h-96 opacity-40 pointer-events-none animate-palm-breeze" style={{ animationDelay: '2s' }}>
                  <svg viewBox="0 0 100 200" fill="#063814" className="w-full h-full transform scale-x-[-1]">
                    <path d="M48,200 Q50,100 55,20 Q60,10 75,0 Q60,15 50,40 Q40,65 48,200 Z" />
                    <path d="M55,20 Q30,10 10,25 Q35,25 55,20 Z" />
                    <path d="M55,20 Q80,15 95,30 Q70,30 55,20 Z" />
                  </svg>
                </div>

                {/* Grand Dravidian Gopuram (Towering White Stone with Golden Kalasams) */}
                <div className="absolute top-4 inset-x-0 mx-auto w-full max-w-xl flex flex-col items-center pointer-events-none select-none">
                  {/* Kalasams / Stupis */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] text-base">🏺</span>
                    <span className="text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,1)] text-xl">🏺</span>
                    <span className="text-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,1)] text-2xl font-bold">🏺</span>
                    <span className="text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,1)] text-xl">🏺</span>
                    <span className="text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] text-base">🏺</span>
                  </div>

                  {/* Multi-tiered Sculpted Gopuram Body */}
                  <div className="w-64 sm:w-80 h-32 sm:h-44 bg-gradient-to-b from-stone-100 via-stone-200 to-stone-300 rounded-t-xl border-x-4 border-t-4 border-amber-300/70 shadow-2xl relative flex flex-col justify-between py-2 px-3">
                    <div className="flex justify-around text-[10px] text-amber-800 font-serif">
                      <span>🏛️</span><span>⚜️</span><span>🪷</span><span>⚜️</span><span>🏛️</span>
                    </div>
                    <div className="flex justify-between items-center px-4 text-xs text-amber-900 font-bold border-y border-amber-400/40 py-1">
                      <span>🔱</span>
                      <span className="font-serif tracking-widest text-[11px]">பரக்கை மகா கோபுரம்</span>
                      <span>🔱</span>
                    </div>
                    <div className="flex justify-around text-[9px] text-amber-900">
                      <span>🕉️</span><span>☸️</span><span>🪷</span><span>☸️</span><span>🕉️</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scene Mode: Authentic Aerial Drone View (Image 3 Background Tweak) */}
        {sceneMode === 'aerial' && (
          <div className="absolute inset-0 transition-opacity duration-700">
            {customAerialBg ? (
              <img
                src={customAerialBg}
                alt="Parakkai Aerial View"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            ) : (
              /* High-fidelity CSS representation of Image 3 */
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-emerald-800 to-amber-950 overflow-hidden">
                {/* Lush Coconut Grove Sea */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(16,185,129,0.4)_0%,_rgba(6,78,59,0.8)_60%,_rgba(2,44,34,1)_100%)]" />

                {/* Animated Canopy Waves */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#15803d_2px,transparent_2px)] [background-size:16px_16px] animate-palm-breeze" />

                {/* Traditional Kerala/Tamil Terracotta Tiled Roofs */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 flex flex-col items-center justify-end">
                  {/* Roof Ridge */}
                  <div className="w-full max-w-4xl h-48 bg-gradient-to-t from-[#78280f] via-[#9a3412] to-[#c2410c] rounded-t-3xl border-t-4 border-amber-400/50 shadow-2xl relative flex items-center justify-center">
                    {/* Ridge Kalasams */}
                    <div className="absolute -top-7 inset-x-0 flex justify-center gap-6">
                      <span className="text-xl text-amber-300 drop-shadow-lg">🏺</span>
                      <span className="text-2xl text-amber-300 drop-shadow-xl">🏺</span>
                      <span className="text-xl text-amber-300 drop-shadow-lg">🏺</span>
                    </div>

                    {/* Central Towering Golden Kodimaram (Image 3 Focal Point) */}
                    <div className="absolute -top-44 inset-x-0 flex flex-col items-center">
                      <div className="text-amber-300 text-3xl font-bold animate-pulse drop-shadow-[0_0_20px_rgba(245,158,11,1)]">
                        ⚜️
                      </div>
                      <div className="w-5 sm:w-6 h-52 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.8)] border border-amber-200" />
                      <div className="px-3 py-0.5 rounded-full bg-black/80 border border-amber-400 text-[10px] font-mono font-bold text-amber-300 -mt-2">
                        GOLDEN KODIMARAM (6:30 AM AXIS)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overhead Drone Perspective Badge */}
                <div className="absolute top-4 left-6 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-emerald-400/40 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Aerial Drone Heritage View • Parakkai Village & Sanctum</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scene Mode: Sacred Lake Sunrise */}
        {sceneMode === 'lake' && (
          <div className="absolute inset-0 transition-opacity duration-700 bg-gradient-to-b from-amber-500 via-sky-600 to-[#031e3d] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-300/40 via-sky-800/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-sky-950 via-sky-900 to-transparent animate-water-shimmer flex items-end justify-center pb-6">
              <span className="text-xs font-serif italic text-amber-200/80">
                Parakkai Teertham Lake • Sacred Waters Reflecting the Dawn
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            3. SACRED ENTRANCE ARCHWAY & DASAVATARAM (Image 2 Architectural Centerpiece)
            ========================================================================= */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-16 sm:mt-24 pb-6">
          <div className="rounded-3xl border-2 border-amber-400/60 bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 shadow-[0_10px_50px_rgba(0,0,0,0.8)] relative">
            {/* Arch Top Banner Inscription (Exact from Image 2) */}
            <div className="text-center pb-3 border-b border-amber-500/30 space-y-1">
              <div className="inline-block px-4 py-1 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black font-serif font-bold text-xs sm:text-sm tracking-wide shadow-md">
                அருள்மிகு ஸ்ரீதேவி பூதேவி சமேத மதுசூதன பெருமாள் திருக்கோவில் - பறக்கை
              </div>
              <div className="text-[10px] sm:text-xs font-serif font-semibold text-amber-200 tracking-wider">
                ARULMIGU SREE DEVI BOODEVI SAMETHA MADUSOOTHANA PERUMAL TEMPLE - PARAKKAI
              </div>
            </div>

            {/* Guardians Flanking the Grand Entrance (Sri Garuda & Sri Anjaneya) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center py-4">
              {/* Left Guardian: Sri Garuda */}
              <div className="p-3 rounded-2xl border border-sky-600/40 bg-gradient-to-b from-sky-950/60 to-slate-950/80 text-center space-y-1">
                <div className="text-3xl drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">🦅</div>
                <div className="text-xs font-serif font-bold text-amber-300">ஸ்ரீ கருடன்</div>
                <div className="text-[10px] font-mono text-sky-300">SRI GARUDA</div>
                <p className="text-[10px] text-slate-300 leading-tight">
                  Golden-winged carrier of Lord Vishnu facing the sanctum with folded hands.
                </p>
              </div>

              {/* Center Portal: Sanctum Gateway & 6:30 AM Light Beam */}
              <div
                className="relative p-4 rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-amber-950/50 via-slate-950 to-black text-center cursor-pointer hover:border-amber-300 transition-transform hover:scale-[1.02] shadow-[0_0_30px_rgba(245,158,11,0.3)] group"
                onClick={() => onNavigate('darshan')}
                title="Enter Inner Sanctum for Darshan"
              >
                {/* 6:30 AM Sunbeam Ray Effect */}
                {isSunbeamSimulated && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    <div className="w-full h-full bg-gradient-to-b from-amber-300/30 via-yellow-200/20 to-transparent animate-sunbeam transform -rotate-12" />
                  </div>
                )}

                <div className="text-2xl mb-1">🪷</div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                  SACRED SANCTUM ENTRANCE
                </div>
                <div className="text-sm font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                  Arulmigu Madhusoodhana Perumal
                </div>
                <div className="text-[10px] text-amber-200/80 mt-1 flex items-center justify-center gap-1">
                  <span>Daily 6:30 AM Sunbeam at Lotus Feet</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Right Guardian: Sri Anjaneya */}
              <div className="p-3 rounded-2xl border border-sky-600/40 bg-gradient-to-b from-sky-950/60 to-slate-950/80 text-center space-y-1">
                <div className="text-3xl drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">🐒</div>
                <div className="text-xs font-serif font-bold text-amber-300">ஸ்ரீ ஆஞ்சநேயர்</div>
                <div className="text-[10px] font-mono text-sky-300">SRI ANJANEYA</div>
                <p className="text-[10px] text-slate-300 leading-tight">
                  Lord of supreme strength and devotion, standing as guardian of the sacred threshold.
                </p>
              </div>
            </div>

            {/* Dasavataram Sculpted Frieze (Ten Avatars & Sriman Narayanaya Namaha) */}
            <div className="pt-3 border-t border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between px-2 text-[11px] font-serif font-bold text-amber-300">
                <span>தசாவதாரம் • DASAVATARAM</span>
                <span className="text-amber-200/90 font-mono text-[10px]">
                  ஸ்ரீமன் நாராயணாய நம: • SRIMAN NARAYANAYA NAMAHA
                </span>
              </div>

              {/* 10 Avatar Pills */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 text-center">
                {[
                  { no: '1', tamil: 'மத்ஸ்ய', name: 'Matsya', icon: '🐟' },
                  { no: '2', tamil: 'கூர்ம', name: 'Kurma', icon: '🐢' },
                  { no: '3', tamil: 'வராஹ', name: 'Varaha', icon: '🐗' },
                  { no: '4', tamil: 'நரசிம்ம', name: 'Narasimha', icon: '🦁' },
                  { no: '5', tamil: 'வாமன', name: 'Vamana', icon: '☂️' },
                  { no: '6', tamil: 'பரசுராம', name: 'Parasurama', icon: '🪓' },
                  { no: '7', tamil: 'ராம', name: 'Rama', icon: '🏹' },
                  { no: '8', tamil: 'பலராம', name: 'Balarama', icon: '🌾' },
                  { no: '9', tamil: 'புத்த', name: 'Buddha', icon: '🧘' },
                  { no: '10', tamil: 'கல்கி', name: 'Kalki', icon: '🐎' }
                ].map((av) => (
                  <div
                    key={av.no}
                    className="p-1.5 rounded-xl bg-slate-900/90 border border-amber-500/20 hover:border-amber-400 transition-colors"
                  >
                    <div className="text-base">{av.icon}</div>
                    <div className="text-[10px] font-serif font-bold text-amber-200 truncate">{av.tamil}</div>
                    <div className="text-[8px] font-mono text-slate-400 uppercase">{av.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Hero Call-to-Actions */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('darshan')}
                className="px-6 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>ENTER TEMPLE DARSHAN</span>
              </button>

              <button
                type="button"
                onClick={onOpenBookingModal}
                className="px-5 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm bg-sky-600 hover:bg-sky-500 text-white shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                <span>BOOK POOJA / SEVA</span>
              </button>

              <button
                type="button"
                onClick={() => setIsJourneyDrawerOpen(!isJourneyDrawerOpen)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold border border-amber-400/50 bg-slate-900/90 text-amber-300 hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>7 STATIONS JOURNEY (IMAGE 1)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Foreground Sacred Deepam & Stone Column Details */}
        <div className="absolute bottom-4 left-6 hidden xl:flex flex-col items-center pointer-events-none">
          <div className="text-3xl text-amber-300 animate-deepam">🪔</div>
          <div className="w-4 h-24 bg-stone-700/80 rounded-t-sm border-x border-stone-500" />
        </div>
        <div className="absolute bottom-4 right-6 hidden xl:flex flex-col items-center pointer-events-none">
          <div className="text-3xl text-amber-300 animate-deepam" style={{ animationDelay: '1.5s' }}>🪔</div>
          <div className="w-4 h-24 bg-stone-700/80 rounded-t-sm border-x border-stone-500" />
        </div>
      </div>

      {/* =========================================================================
          4. 7-STEP DEVOTIONAL JOURNEY TRAY (Image 1 Sequence)
          ========================================================================= */}
      {isJourneyDrawerOpen && (
        <div className="relative z-20 border-t border-b border-amber-500/30 bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 animate-fadeIn">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                  <Compass className="w-4 h-4" />
                  <span>THE 7 SACRED STATIONS OF PARAKKAI (IMAGE 1 PILGRIM JOURNEY)</span>
                </div>
                <p className="text-xs text-slate-300">
                  Step-by-step spiritual walkthrough from village home to the sanctum sanctorum.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSoundMuted(!isSoundMuted)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-300 cursor-pointer"
                  title={isSoundMuted ? 'Enable Temple Bell Chime' : 'Mute Temple Bell Chime'}
                >
                  {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoPlayingJourney(!isAutoPlayingJourney);
                    playTempleChime();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer ${
                    isAutoPlayingJourney
                      ? 'bg-amber-500 text-black'
                      : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  {isAutoPlayingJourney ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isAutoPlayingJourney ? 'Pause' : 'Auto Play'}</span>
                </button>
              </div>
            </div>

            {/* Station Stepper Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {stations.map((st, idx) => (
                <button
                  key={st.stationKey}
                  type="button"
                  onClick={() => {
                    setActiveStationIdx(idx);
                    playTempleChime();
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeStationIdx === idx
                      ? 'border-amber-400 bg-amber-950/60 shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-amber-300">
                    <span>{st.number}.</span>
                    {activeStationIdx === idx && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                  </div>
                  <div className="text-xs font-serif font-bold text-white truncate mt-0.5">{st.title}</div>
                  <div className="text-[10px] text-slate-400 truncate">{st.subtitle}</div>
                </button>
              ))}
            </div>

            {/* Active Station Card Detail */}
            <div className="p-4 rounded-2xl border border-amber-500/30 bg-slate-900/80 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                    STATION {currentStation.number} OF 7
                  </span>
                  <span className="text-xs font-serif italic text-amber-200">
                    "{currentStation.quote}"
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                  {currentStation.title} — {currentStation.subtitle}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {currentStation.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-amber-300/90 font-mono">
                  <span>📍 {currentStation.locationContext}</span>
                  <span>•</span>
                  <span>✨ {currentStation.spiritualMeaning}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center md:items-end">
                <button
                  type="button"
                  onClick={() => {
                    if (currentStation.stationKey === 'darshan') {
                      onNavigate('darshan');
                    } else if (currentStation.stationKey === 'kodimaram') {
                      onNavigate('today');
                    } else {
                      onNavigate('darshan');
                    }
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-serif font-bold bg-amber-500 text-black hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Experience Station</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveStationIdx((prev) => (prev === 0 ? stations.length - 1 : prev - 1));
                      playTempleChime();
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveStationIdx((prev) => (prev === stations.length - 1 ? 0 : prev + 1));
                      playTempleChime();
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. 5 LOWER VISUAL DISCOVERY PANELS (Image 2 Bottom Section)
          ========================================================================= */}
      <div className="relative z-20 border-t border-amber-500/20 bg-slate-950/90 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Card 1: Live Darshan */}
          <div
            onClick={() => onNavigate('darshan')}
            className="group relative rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-4 hover:border-amber-400 transition-all hover:scale-[1.02] cursor-pointer shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/40 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                LIVE DARSHAN
              </span>
              <span className="text-xl">🪔</span>
            </div>
            <h4 className="text-sm font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
              From Parakkai
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
              Direct sanctum view of Sri Madhusoodhana Perumal with Sree Devi & Bhoodevi.
            </p>
          </div>

          {/* Card 2: Parakkai Temple Lake */}
          <div
            onClick={() => onNavigate('map')}
            className="group relative rounded-2xl border border-sky-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-4 hover:border-sky-400 transition-all hover:scale-[1.02] cursor-pointer shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-full bg-sky-600/30 text-sky-300 border border-sky-500/40 text-[10px] font-mono font-bold">
                SACRED LAKE
              </span>
              <span className="text-xl">🌊</span>
            </div>
            <h4 className="text-sm font-serif font-bold text-white group-hover:text-sky-300 transition-colors">
              Parakkai Temple Lake
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
              A Sacred Surrounding. Reflective teppakulam waters surrounded by coconut groves.
            </p>
          </div>

          {/* Card 3: Festival Tradition */}
          <div
            onClick={() => onNavigate('events')}
            className="group relative rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-4 hover:border-amber-400 transition-all hover:scale-[1.02] cursor-pointer shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-full bg-amber-600/30 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                FESTIVAL
              </span>
              <span className="text-xl">🚩</span>
            </div>
            <h4 className="text-sm font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
              Tradition Lives On
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
              Panguni Brahmotsavam, temple car procession, nadaswaram and sacred rituals.
            </p>
          </div>

          {/* Card 4: Parakkai Village */}
          <div
            onClick={() => onNavigate('community')}
            className="group relative rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-4 hover:border-emerald-400 transition-all hover:scale-[1.02] cursor-pointer shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                VILLAGE LIFE
              </span>
              <span className="text-xl">🏘️</span>
            </div>
            <h4 className="text-sm font-serif font-bold text-white group-hover:text-emerald-300 transition-colors">
              Parakkai Village
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
              People | Culture | Together. Timeless agraharam community rooted in brotherhood.
            </p>
          </div>

          {/* Card 5: A Greener Parakkai */}
          <div
            onClick={() => onNavigate('community')}
            className="group relative rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-4 hover:border-emerald-400 transition-all hover:scale-[1.02] cursor-pointer shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                ECO HERITAGE
              </span>
              <span className="text-xl">🌳</span>
            </div>
            <h4 className="text-sm font-serif font-bold text-white group-hover:text-emerald-300 transition-colors">
              A Greener Parakkai
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
              For Generations. Water revival, native tree planting, and sacred grove care.
            </p>
          </div>
        </div>

        {/* =========================================================================
            6. BOTTOM NAVIGATION BAR & MOTTO (Exact from Image 2)
            ========================================================================= */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* 8 Bottom Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {[
              { id: 'darshan', label: 'Darshan', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
              { id: 'today', label: 'Today', icon: <Calendar className="w-3.5 h-3.5 text-sky-400" /> },
              { id: 'events', label: 'Festival', icon: <Flame className="w-3.5 h-3.5 text-amber-500" /> },
              { id: 'map', label: 'Temple Map', icon: <MapPin className="w-3.5 h-3.5 text-emerald-400" /> },
              { id: 'media', label: 'Videos', icon: <Video className="w-3.5 h-3.5 text-red-400" /> },
              { id: 'community', label: 'Community', icon: <Users className="w-3.5 h-3.5 text-purple-400" /> },
              { id: 'nearby', label: 'Local Services', icon: <ShoppingBag className="w-3.5 h-3.5 text-amber-400" /> },
              { id: 'darshan', label: 'Support Temple', icon: <span className="text-amber-300 text-xs">🤍</span> }
            ].map((nav) => (
              <button
                key={nav.label}
                type="button"
                onClick={() => onNavigate(nav.id)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {nav.icon}
                <span className="font-serif">{nav.label}</span>
              </button>
            ))}
          </div>

          {/* Right Signature & Motto */}
          <div className="flex items-center gap-2 text-right">
            <span className="text-emerald-400 text-sm">🌿</span>
            <div>
              <div className="text-[11px] font-serif font-bold text-amber-300">
                PARAKKAI
              </div>
              <div className="text-[9px] font-sans text-slate-400">
                Rooted in Devotion • Connected to a Better Tomorrow
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Local Image Ingestion Trigger for User's original files */}
        <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>P-PARAKKAI-002 Active • Media-First Visual Storytelling Engine</span>
          </span>

          <button
            type="button"
            onClick={() => setShowAssetManager(!showAssetManager)}
            className="text-[10px] font-mono text-amber-300/80 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3 h-3" />
            <span>{showAssetManager ? 'Close Asset Ingestor' : 'Ingest Local Images (1ST / 2ND / Aerial)'}</span>
          </button>
        </div>

        {/* Optional Local File Ingestor Tray */}
        {showAssetManager && (
          <div className="mt-3 p-3 rounded-xl border border-amber-500/30 bg-slate-900/90 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-amber-300 font-bold block">
                1. Upload Approved Façade (Image 2 / 2ND.png)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'hero_facade')}
                className="w-full text-[10px] text-slate-300 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-amber-500 file:text-black file:font-mono file:text-[10px] cursor-pointer"
              />
              {parakkaiAssetService.hasCustomAsset('hero_facade') && (
                <button
                  type="button"
                  onClick={() => parakkaiAssetService.clearAssetOverride('hero_facade')}
                  className="text-[9px] text-red-400 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Reset to Vector Artwork</span>
                </button>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-sky-300 font-bold block">
                2. Upload Aerial Background (Image 3 / image.png)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'aerial_bg')}
                className="w-full text-[10px] text-slate-300 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-sky-500 file:text-black file:font-mono file:text-[10px] cursor-pointer"
              />
              {parakkaiAssetService.hasCustomAsset('aerial_bg') && (
                <button
                  type="button"
                  onClick={() => parakkaiAssetService.clearAssetOverride('aerial_bg')}
                  className="text-[9px] text-red-400 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Reset to Aerial Grove View</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
