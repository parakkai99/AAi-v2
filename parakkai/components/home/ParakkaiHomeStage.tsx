/**
 * P-PARAKKAI-004 — Parakkai Spatial Home Hero Experience
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Product: PARAKKAI
 * Contract: P-PARAKKAI-004
 * Version: v0.1.4
 * IP Owner: ArchitectAny / Vijay Kumar K.
 *
 * CORE ARCHITECTURAL DIRECTIVES:
 * 1. ARCHITECTANY DARK THEME: Dark blue / near-black background (#020914), natural blue (#00e3fd), subtle gold (#f59e0b).
 * 2. SPATIAL EXPERIENCE: Structure follows Left Rail + Main Stage + Right Rail + Bottom Bar.
 * 3. SINGLE VIEWPORT: Fits in available viewport without normal page scrolling.
 * 4. REAL PARAKKAI IMAGES: Uses approved temple imagery, Dravidian Gopuram, Golden Kodimaram, sunrise & nature.
 * 5. SPATIAL HERO, NOT CARD GRID: Follows the exact hierarchical tree requested:
 *                  PARAKKAI TEMPLE
 *                        │
 *              ┌─────────┼─────────┐
 *              │         │         │
 *           DARSHAN    TODAY     EVENTS
 *              │         │         │
 *           VIDEOS     NATURE      MAP
 *              │                   │
 *           TEMPLE             PARAKKAI
 * 6. READABILITY: Dark glass with high contrast, legible typography, no visual clutter.
 */

import { createAnimationRuntime } from "../../../src/animation/runtime";
import React, { useEffect, useState } from "react";

import { registeredMotionDefinitions } from "../../../src/animation/motion/MotionDefinitions";

import {
  Sun,
  Sparkles,
  Layers,
  Landmark,
  Compass,
  Video,
  Trees,
  Flame,
  ChevronRight,
  Upload,
} from "lucide-react";
import { ParakkaiThemeDefinition } from "../../contracts/theme";
import { parakkaiService } from "../../services/parakkaiService";
import { parakkaiAssetService } from "../../services/parakkaiAssetService";

interface ParakkaiHomeStageProps {
  activeTheme: ParakkaiThemeDefinition;
  sceneMode: "facade" | "aerial" | "lake";
  onSceneChange: (mode: "facade" | "aerial" | "lake") => void;
  onNavigate: (view: string) => void;
  onOpenBookingModal: (offeringId?: string) => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

export const ParakkaiHomeStage: React.FC<ParakkaiHomeStageProps> = ({
  activeTheme,
  sceneMode,
  onSceneChange,
  onNavigate,
  onOpenBookingModal,
  isSoundMuted,
  onToggleSound,
}) => {
  const [isSunbeamSimulated, setIsSunbeamSimulated] = useState(false);
  const [showAssetManager, setShowAssetManager] = useState(false);
  const [customAssetKey, setCustomAssetKey] = useState(0);

  // Sunlight miracle status
  const [sunlightStatus, setSunlightStatus] = useState(() =>
    parakkaiService.getSunlightMiracleStatus(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSunlightStatus(parakkaiService.getSunlightMiracleStatus());
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  // Listen to asset overrides
  useEffect(() => {
    const unsub = parakkaiAssetService.subscribe(() => {
      setCustomAssetKey((k) => k + 1);
    });

    return unsub;
  }, []);

  useEffect(() => {
    const root = document.getElementById("parakkai-spatial-home-stage");

    if (!root) {
      return;
    }
    const { runtime, targets } = createAnimationRuntime(root);

    runtime.startMany([
      {
        objectId: "OBJ-06",
        motionId: "RADIATE",
        triggerId: "loop",

        motionParameters: {
          fromScale: 0.98,
          toScale: 1.04,
          intensity: 1,
          pulse: true,
        },

        triggerParameters: {
          infinite: true,
          count: 0,
          delayMs: 2200,
        },
      },
      {
        objectId: "OBJ-03",
        motionId: "FLIGHT",
        triggerId: "loop",

        motionParameters: {
          distanceX: 260,
          distanceY: -18,
          arc: 26,
          rotation: 3,
          speed: 0.85,
        },

        triggerParameters: {
          infinite: true,
          count: 0,
          delayMs: 5000,
        },
      },
      {
        objectId: "OBJ-01",
        motionId: "SWAY",
        triggerId: "loop",

        motionParameters: {
          angle: 3,
          distance: 2,
          axis: "rotation",
          cycles: 2,
        },

        triggerParameters: {
          infinite: true,
          count: 0,
          delayMs: 2600,
        },
      },
    ]);

    return () => {
      runtime.stopAll();
    };
  }, [customAssetKey]);

  // ==========================================================
  // P1.27 — AAi Animation Runtime
  // Scene 01 proof targets:
  // OBJ-03 = Bird Group, OBJ-01 = Peacock, OBJ-06 = Sun Rays.
  // The approved photograph remains untouched.
  // ==========================================================

  // Image source resolution: user upload > high-res curated real imagery
  const defaultFacadeImg =
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&q=85";

  const defaultAerialImg =
    "https://images.unsplash.com/photo-1545232979-fbf68fe9f10d?auto=format&fit=crop&w=1920&q=85";

  const defaultLakeImg =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85";

  const heroFacadeUrl = parakkaiAssetService.getAssetUrl(
    "hero_facade",
    defaultFacadeImg,
  );

  const aerialBgUrl = parakkaiAssetService.getAssetUrl(
    "aerial_bg",
    defaultAerialImg,
  );

  const lakeBgUrl = parakkaiAssetService.getAssetUrl("lake_bg", defaultLakeImg);

  // POC FREEZE — Scene 01 only.
  // Keep the homepage locked to the approved Sakthi Vinayakar scene.
  // The other scene sources remain available in the existing asset model,
  // but they are intentionally not shown during this animation proof.
  const activeSceneUrl = heroFacadeUrl;

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: string,
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          parakkaiAssetService.setAssetOverride(slot, reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleTriggerMiracle = () => {
    setIsSunbeamSimulated(!isSunbeamSimulated);

    if (!isSoundMuted) {
      try {
        const ctx = new (
          window.AudioContext || (window as any).webkitAudioContext
        )();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(528, ctx.currentTime);

        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.8);
      } catch {
        // Safe AudioContext fallback
      }
    }
  };

  return (
    <div
      id="parakkai-spatial-home-stage"
      key={customAssetKey}
      className="w-full h-full min-h-0 flex-1 flex flex-col justify-between relative rounded-xl sm:rounded-2xl border border-[#00e3fd]/25 shadow-2xl overflow-hidden select-none bg-[#020914] text-white"
    >
      {/* =========================================================================
          1. CINEMATIC REAL PARAKKAI BACKGROUND SCENE
          ========================================================================= */}

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Real Photographic Layer with Slow Subtle Zoom (ONE strong motion per Sec 11) */}
        <img
          src={activeSceneUrl}
          alt="Parakkai Sri Madhusoodhana Perumal Temple"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-[12000ms] ease-out motion-safe:hover:scale-100"
          referrerPolicy="no-referrer"
        />

        {/* -----------------------------------------------------------------------
            AAi CINEMATIC MOTION TARGETS — SCENE 01
            These are lightweight independent visual layers over the approved
            photograph. The photograph itself is never moved or regenerated.
        ----------------------------------------------------------------------- */}

        {/* OBJ-03 — BIRD GROUP: real spatial movement proof */}
        <div
          data-aa-animation-object="OBJ-03"
          aria-hidden="true"
          className="absolute left-[43%] top-[47%] z-[2] w-24 h-12 pointer-events-none will-change-transform"
        >
          <svg
            viewBox="0 0 120 60"
            className="w-full h-full overflow-visible"
            fill="none"
          >
            <g
              fill="rgba(15,23,42,0.82)"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="1"
            >
              <path d="M7 25 Q17 12 28 25 Q18 19 7 25Z" />
              <path d="M40 18 Q50 5 61 18 Q51 12 40 18Z" />
              <path d="M78 29 Q90 13 102 29 Q91 21 78 29Z" />
            </g>
          </svg>
        </div>

        {/* OBJ-01 — PEACOCK: gentle feather-fan movement proof */}
        <div
          data-aa-animation-object="OBJ-01"
          aria-hidden="true"
          className="absolute left-[34%] top-[25%] z-[2] w-16 h-20 pointer-events-none origin-bottom will-change-transform"
        >
          <svg viewBox="0 0 80 100" className="w-full h-full overflow-visible">
            <g opacity="0.58">
              <g fill="none" stroke="rgba(0,227,253,0.72)" strokeWidth="2">
                <path d="M40 88 C12 68 8 40 18 18" />
                <path d="M40 88 C24 58 28 30 38 10" />
                <path d="M40 88 C40 54 46 25 58 8" />
                <path d="M40 88 C56 59 66 35 70 18" />
              </g>
              <g
                fill="rgba(245,158,11,0.75)"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="1"
              >
                <circle cx="18" cy="18" r="7" />
                <circle cx="38" cy="10" r="8" />
                <circle cx="58" cy="8" r="8" />
                <circle cx="70" cy="18" r="7" />
              </g>
              <ellipse
                cx="40"
                cy="88"
                rx="8"
                ry="10"
                fill="rgba(15,23,42,0.9)"
              />
              <circle cx="44" cy="83" r="2.2" fill="rgba(245,158,11,0.95)" />
            </g>
          </svg>
        </div>

        {/* Cinematic ArchitectAny Dark Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-[#020914]/75 to-[#020914]/45" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#020914]/85 via-transparent to-[#020914]/85" />

        {/* 6:30 AM Solar Ray Alignment Beam Effect */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            isSunbeamSimulated || sunlightStatus.isMiracleWindow
              ? "opacity-100"
              : "opacity-30"
          }`}
        >
          {/* Dawn Solar Core */}
          <div
            data-aa-animation-object="OBJ-06"
            aria-hidden="true"
            className="absolute top-[27%] right-[10%] w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.42)_0%,rgba(245,158,11,0.18)_26%,rgba(245,158,11,0.06)_48%,transparent_72%)] blur-[2px] transform-gpu origin-center"
          />

          {/* Diagonal Solar Rays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.25),rgba(0,227,253,0.05),transparent)]" />
        </div>
      </div>

      {/* =========================================================================
          2. TOP HEADER OVERLAY INSIDE HERO
          ========================================================================= */}

      <div className="relative z-10 px-3 sm:px-6 pt-3 sm:pt-4 flex items-start justify-between gap-3 shrink-0">
        {/* Temple Title & Sacred Tamil Inscription */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪷</span>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Parakkai
            </h1>

            <span className="text-xs sm:text-sm font-serif italic text-amber-300 hidden sm:inline drop-shadow">
              Sri Madhusoodhana Perumal Temple
            </span>
          </div>

          <p className="text-[11px] sm:text-xs font-serif font-medium text-[#00e3fd] drop-shadow-sm flex items-center gap-2">
            <span>A Living Temple</span>
            <span className="text-slate-500">•</span>
            <span>A Living Village</span>
            <span className="text-slate-500">•</span>
            <span>A Timeless Heritage</span>
          </p>

          <div className="text-[10px] font-mono text-slate-300 hidden sm:block drop-shadow">
            பறக்கை மதுசூதன பெருமாள் திருக்கோவில் • கன்னியாகுமரி மாவட்டம்
          </div>
        </div>

        {/* Top Right: 6:30 AM Miracle Simulated Trigger & Scene Switcher */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleTriggerMiracle}
            className={`flex items-center gap-2 px-3 py-1 rounded-full border shadow-md transition-all cursor-pointer text-xs ${
              isSunbeamSimulated || sunlightStatus.isMiracleWindow
                ? "bg-amber-500/25 text-amber-200 border-amber-400 font-bold scale-105 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "bg-[#03162b]/90 hover:bg-[#052b4f] text-slate-200 border-[#00e3fd]/30 hover:border-amber-400/50"
            }`}
            title="Click to Simulate Daily 6:30 AM Solar Ray Alignment"
          >
            <Sun
              className={`w-3.5 h-3.5 ${
                isSunbeamSimulated || sunlightStatus.isMiracleWindow
                  ? "text-amber-300 animate-spin-slow"
                  : "text-amber-400"
              }`}
            />

            <span className="font-serif text-[11px]">
              {isSunbeamSimulated
                ? "☀️ 6:30 AM Ray Active"
                : "Daily 6:30 AM Miracle"}
            </span>
          </button>

          {/* POC FREEZE — Scene 01 / Sakthi Vinayakar */}
          <div
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#03162b]/90 border border-[#00e3fd]/25 text-[10px] shadow-sm"
            aria-label="Scene 01 Sakthi Vinayakar locked for animation proof"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[#00e3fd]">SCENE 01</span>
            <span className="text-slate-300">Sakthi Vinayakar</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-300">ANIMATION TEST</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. SPATIAL HERO TREE
          ========================================================================= */}

      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center px-2 sm:px-4 py-1">
        <div className="w-full max-w-3xl flex flex-col items-center justify-center space-y-1 sm:space-y-2">
          {/* Top Node: PARAKKAI TEMPLE */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onNavigate("temple")}
              className="px-4 py-2 rounded-2xl bg-[#03162b]/95 hover:bg-[#052b4f] text-white border border-[#00e3fd]/50 hover:border-amber-400/80 shadow-[0_0_20px_rgba(0,227,253,0.15)] transition-all cursor-pointer group flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Landmark className="w-4 h-4" />
              </div>

              <div className="text-left">
                <div className="text-xs sm:text-sm font-serif font-bold tracking-wide text-white group-hover:text-amber-200">
                  PARAKKAI TEMPLE
                </div>

                <div className="text-[10px] font-mono text-[#00e3fd]/80">
                  Sri Madhusoodhana Perumal • 1000-Yr Sannadhi
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-amber-300 transition-all" />
            </button>

            {/* Vertical stem from Top Node */}
            <div className="w-px h-3 sm:h-4 bg-gradient-to-b from-[#00e3fd]/60 to-[#00e3fd]/30" />

            {/* Horizontal Branch Bar */}
            <div className="w-48 sm:w-80 h-px bg-gradient-to-r from-[#00e3fd]/10 via-[#00e3fd]/40 to-[#00e3fd]/10 relative">
              <div className="absolute left-0 top-0 w-px h-2 sm:h-3 bg-[#00e3fd]/30" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-2 sm:h-3 bg-[#00e3fd]/40" />
              <div className="absolute right-0 top-0 w-px h-2 sm:h-3 bg-[#00e3fd]/30" />
            </div>
          </div>

          {/* 3-Column Spatial Grid */}
          <div className="w-full grid grid-cols-3 gap-2 sm:gap-4 pt-1">
            {/* COLUMN 1: DARSHAN -> VIDEOS -> TEMPLE */}
            <div className="flex flex-col items-center space-y-1.5 sm:space-y-2">
              {/* Node: DARSHAN */}
              <button
                type="button"
                onClick={() => onNavigate("darshan")}
                className="w-full p-2 sm:p-2.5 rounded-xl bg-[#03162b]/90 hover:bg-[#052b4f] border border-amber-400/40 hover:border-amber-400 text-left transition-all cursor-pointer group shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-amber-300 group-hover:text-amber-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>DARSHAN</span>
                  </div>

                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                </div>

                <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                  Nindra Thirukkolam
                </p>
              </button>

              <div className="w-px h-2 bg-[#00e3fd]/25" />

              {/* Node: VIDEOS */}
              <button
                type="button"
                onClick={() => onNavigate("media")}
                className="w-full p-2 sm:p-2.5 rounded-xl bg-[#03162b]/85 hover:bg-[#052b4f] border border-[#00e3fd]/20 hover:border-[#00e3fd]/60 text-left transition-all cursor-pointer group shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-sky-200 group-hover:text-white">
                    <Video className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>VIDEOS</span>
                  </div>

                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-[#00e3fd] group-hover:translate-x-0.5 transition-all" />
                </div>

                <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                  Chants & Festivals
                </p>
              </button>

              <div className="w-px h-2 bg-[#00e3fd]/25" />

              {/* Node: TEMPLE */}
              <button
                type="button"
                onClick={() => onNavigate("temple")}
                className="w-full p-2 sm:p-2.5 rounded-xl bg-[#03162b]/85 hover:bg-[#052b4f] border border-[#00e3fd]/20 hover:border-[#00e3fd]/60 text-left transition-all cursor-pointer group shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-sky-200 group-hover:text-white">
                    <Landmark className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>TEMPLE</span>
                  </div>

                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-[#00e3fd] group-hover:translate-x-0.5 transition-all" />
                </div>

                <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                  History & Gopuram
                </p>
              </button>
            </div>

            {/* COLUMN 2: TODAY -> NATURE */}
            <div className="flex flex-col items-center space-y-1.5 sm:space-y-2">
              {/* Node: TODAY */}
              <button
                type="button"
                onClick={() => onNavigate("today")}
                className="w-full p-2 sm:p-2.5 rounded-xl bg-[#03162b]/90 hover:bg-[#052b4f] border border-amber-400/40 hover:border-amber-400 text-left transition-all cursor-pointer group shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-amber-300 group-hover:text-amber-200">
                    <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>TODAY</span>
                  </div>

                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                </div>

                <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                  6:30 AM Miracle Ray
                </p>
              </button>

              <div className="w-px h-2 bg-[#00e3fd]/25" />

              {/* Node: NATURE */}
              <button
                type="button"
                onClick={() => onNavigate("nature")}
                className="w-full p-2 sm:p-2.5 rounded-xl bg-[#03162b]/85 hover:bg-[#052b4f] border border-[#00e3fd]/20 hover:border-[#00e3fd]/60 text-left transition-all cursor-pointer group shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-emerald-300 group-hover:text-emerald-200">
                    <Trees className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>NATURE</span>
                  </div>

                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                </div>

                <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                  Lake, Birds & Palms
                </p>
              </button>

              {/* Center Quick Action Callout */}
              <div className="pt-2 w-full">
                <button
                  type="button"
                  onClick={() => onOpenBookingModal()}
                  className="w-full py-1.5 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-serif font-bold text-xs shadow-md transition-transform hover:scale-105 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Book Pooja</span>
                </button>
              </div>
            </div>

            {/* COLUMN 3: EVENTS -> MAP -> PARAKKAI */}
            <div className="flex flex-col items-center space-y-1.5 sm:space-y-2">
              {/* Node: EVENTS */}
              <button
                type="button"
                onClick={() => onNavigate("events")}
                className="w-full p-2 sm:p-2.5 rounded-xl bg-[#03162b]/90 hover:bg-[#052b4f] border border-orange-400/40 hover:border-orange-400 text-left transition-all cursor-pointer group shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-orange-300 group-hover:text-orange-200">
                    <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>EVENTS</span>
                  </div>

                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-orange-300 group-hover:translate-x-0.5 transition-all" />
                </div>

                <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                  Brahmotsavam Utsavam
                </p>
              </button>

              <div className="w-px h-2 bg-[#00e3fd]/25" />

              {/* Node: MAP */}
              <button
                type="button"
                onClick={() => onNavigate("map")}
                className="w-full p-2 sm:p-2.5 rounded-xl bg-[#03162b]/85 hover:bg-[#052b4f] border border-[#00e3fd]/20 hover:border-[#00e3fd]/60 text-left transition-all cursor-pointer group shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-sky-200 group-hover:text-white">
                    <Compass className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>MAP</span>
                  </div>

                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-[#00e3fd] group-hover:translate-x-0.5 transition-all" />
                </div>

                <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                  Sacred Pilgrim Way
                </p>
              </button>

              <div className="w-px h-2 bg-[#00e3fd]/25" />

              {/* Node: PARAKKAI */}
              <button
                type="button"
                onClick={() => onNavigate("journey")}
                className="w-full p-2 sm:p-2.5 rounded-xl bg-[#03162b]/85 hover:bg-[#052b4f] border border-[#00e3fd]/20 hover:border-[#00e3fd]/60 text-left transition-all cursor-pointer group shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-sky-200 group-hover:text-white">
                    <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>PARAKKAI</span>
                  </div>

                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-[#00e3fd] group-hover:translate-x-0.5 transition-all" />
                </div>

                <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                  7 Stations Walkway
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. BOTTOM HERO CONTEXT ACCENT & ASSET OVERRIDE MODAL TRIGGER
          ========================================================================= */}

      <div className="relative z-10 px-3 sm:px-6 py-1.5 border-t border-[#00e3fd]/20 bg-[#020914]/90 backdrop-blur-md flex items-center justify-between gap-3 text-xs shrink-0">
        <div className="flex items-center gap-2 truncate text-slate-400 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />

          <span className="truncate">
            Arulmigu Sree Devi Bhoodevi Sametha Madhusoodhana Perumal • Sannadhi
            St, Parakkai
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Devotee Asset Override Trigger for Custom Photo Testing */}
          <button
            type="button"
            onClick={() => setShowAssetManager(!showAssetManager)}
            className="px-2 py-0.5 rounded text-[10.5px] font-mono text-slate-400 hover:text-white bg-[#03162b] hover:bg-[#052b4f] border border-[#00e3fd]/30 transition-colors flex items-center gap-1 cursor-pointer"
            title="Upload or manage custom local temple images"
          >
            <Upload className="w-3 h-3 text-[#00e3fd]" />
            <span>Image Slots</span>
          </button>
        </div>
      </div>

      {/* Local Asset Upload Modal */}
      {showAssetManager && (
        <div className="absolute inset-0 z-50 bg-[#020914]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#03162b] rounded-2xl border border-[#00e3fd]/40 shadow-2xl p-5 max-w-md w-full space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-[#00e3fd]/20 pb-2">
              <h3 className="font-serif font-bold text-amber-300 flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#00e3fd]" />
                <span>Temple Artwork Image Slots</span>
              </h3>

              <button
                type="button"
                onClick={() => setShowAssetManager(false)}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Devotees and architects can supply custom temple photographs or
              approved artwork to override default slots in real-time:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl border border-[#00e3fd]/20 bg-[#020914]/60 space-y-1.5">
                <div className="font-semibold text-slate-200">
                  Temple Façade & Gopuram
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "hero_facade")}
                  className="w-full text-[11px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#052b4f] file:text-[#00e3fd] hover:file:bg-[#0284c7] cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl border border-[#00e3fd]/20 bg-[#020914]/60 space-y-1.5">
                <div className="font-semibold text-slate-200">
                  Aerial Grove & Teertham Lake
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "aerial_bg")}
                  className="w-full text-[11px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#052b4f] file:text-[#00e3fd] hover:file:bg-[#0284c7] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#00e3fd]/20">
              <button
                type="button"
                onClick={() => {
                  parakkaiAssetService.resetAllOverrides();
                  setShowAssetManager(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 cursor-pointer"
              >
                Reset to Defaults
              </button>

              <button
                type="button"
                onClick={() => setShowAssetManager(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#00e3fd] hover:bg-cyan-300 text-black cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
