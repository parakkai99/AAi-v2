"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnimationRuntime } from "@/src/animation/runtime/AnimationRuntime";
import { createAnimationRuntime } from "@/src/animation/runtime";
import SpatialScene from "./SpatialScene";
import SpatialSceneTransition from "./SpatialSceneTransition";
import SpatialActivityRail from "./SpatialActivityRail";
import {
  PARAKKAI_SPATIAL_JOURNEY,
  getSpatialScene,
} from "./spatialJourneyConfig";

const AUTOPLAY_MS = 12000;

interface SpatialJourneyStageProps {
  onNavigate?: (viewId: string) => void;
}

const CINEMATIC_NAVIGATION = [
  { id: "temple", label: "Temple" },
  { id: "darshan", label: "Darshan" },
  { id: "journey", label: "Journey" },
  { id: "today", label: "Today" },
  { id: "events", label: "Events" },
  { id: "media", label: "Media" },
  { id: "nature", label: "Nature" },
  { id: "map", label: "Sacred Map" },
  { id: "nearby", label: "Nearby" },
  { id: "hypermarket", label: "Marketplace" },
  { id: "blog", label: "Stories" },
  { id: "community", label: "Community" },
] as const;

export default function SpatialJourneyStage({
  onNavigate,
}: SpatialJourneyStageProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isImmersive, setIsImmersive] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const [pendingSceneIndex, setPendingSceneIndex] = useState<number | null>(
    null,
  );

  const stageRef = useRef<HTMLElement | null>(null);

  const scene = getSpatialScene(sceneIndex);
  const sceneCount = PARAKKAI_SPATIAL_JOURNEY.length;
  const isScene01 = scene.id === "sakthi-vinayakar";
  const isScene02 = scene.id === "sacred-tree";
  const isScene03 = scene.id === "vinayakar-to-lake";
  const isScene04 = scene.id === "parakkai-lake";

  const goPrevious = useCallback(() => {
    if (isTransitioning) {
      return;
    }

    setSceneIndex((current) => (current - 1 + sceneCount) % sceneCount);
  }, [sceneCount, isTransitioning]);

  const requestNextScene = useCallback(() => {
    if (isTransitioning) {
      return;
    }

    const nextIndex = (sceneIndex + 1) % sceneCount;

    setPendingSceneIndex(nextIndex);
    setIsTransitioning(true);
  }, [sceneIndex, sceneCount, isTransitioning]);

  const completeSceneTransition = useCallback(() => {
    if (pendingSceneIndex === null) {
      setIsTransitioning(false);
      return;
    }

    setSceneIndex(pendingSceneIndex);
    setPendingSceneIndex(null);
    setIsTransitioning(false);
  }, [pendingSceneIndex]);

  const selectScene = useCallback(
    (index: number) => {
      if (isTransitioning) {
        return;
      }

      const safeIndex = ((index % sceneCount) + sceneCount) % sceneCount;

      setSceneIndex(safeIndex);
    },
    [sceneCount, isTransitioning],
  );

  const togglePlaying = useCallback(() => {
    if (isTransitioning) {
      return;
    }

    setIsPlaying((current) => !current);
  }, [isTransitioning]);

  const toggleImmersive = useCallback(() => {
    setIsImmersive((current) => !current);
  }, []);

  useEffect(() => {
    if (!isPlaying || isTransitioning) {
      return;
    }

    const timer = window.setTimeout(() => {
      requestNextScene();
    }, AUTOPLAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [sceneIndex, isPlaying, isTransitioning, requestNextScene]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();

          if (!isTransitioning) {
            requestNextScene();
            setIsPlaying(false);
          }
          break;

        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();

          if (!isTransitioning) {
            goPrevious();
            setIsPlaying(false);
          }
          break;

        case " ":
          event.preventDefault();

          if (!isTransitioning) {
            togglePlaying();
          }
          break;

        case "Escape":
          setIsImmersive(false);
          setIsNavigationOpen(false);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [requestNextScene, goPrevious, togglePlaying, isTransitioning]);

  const runtimeRef = useRef<AnimationRuntime | null>(null);

  const startCurrentSceneAnimations = useCallback((runtime: AnimationRuntime, currentSceneId: string) => {
    if (currentSceneId === "sakthi-vinayakar") {
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
          triggerParameters: { infinite: true, count: 0, delayMs: 2200 },
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
          triggerParameters: { infinite: true, count: 0, delayMs: 5000 },
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
          triggerParameters: { infinite: true, count: 0, delayMs: 2600 },
        },
      ]);
      return;
    }

    if (currentSceneId === "sacred-tree") {
      runtime.startMany([
        {
          objectId: "OBJ-06",
          motionId: "RADIATE",
          triggerId: "loop",
          motionParameters: {
            fromScale: 0.97,
            toScale: 1.05,
            intensity: 0.9,
            pulse: true,
          },
          triggerParameters: { infinite: true, count: 0, delayMs: 2600 },
        },
        {
          objectId: "OBJ-09",
          motionId: "SWAY",
          triggerId: "loop",
          motionParameters: {
            angle: 2,
            distance: 4,
            axis: "rotation",
            cycles: 2,
          },
          triggerParameters: { infinite: true, count: 0, delayMs: 3400 },
        },
        {
          objectId: "OBJ-12",
          motionId: "DRIFT",
          triggerId: "loop",
          motionParameters: {
            distanceX: 18,
            distanceY: -14,
            variance: 0.4,
            speed: 0.8,
          },
          triggerParameters: { infinite: true, count: 0, delayMs: 4200 },
        },
      ]);
      return;
    }

    if (currentSceneId === "vinayakar-to-lake") {
      runtime.startMany([
        {
          objectId: "OBJ-06",
          motionId: "RADIATE",
          triggerId: "loop",
          motionParameters: {
            fromScale: 0.96,
            toScale: 1.06,
            intensity: 1.1,
            pulse: true,
          },
          triggerParameters: { infinite: true, count: 0, delayMs: 2400 },
        },
        {
          objectId: "OBJ-08",
          motionId: "FLOW",
          triggerId: "loop",
          motionParameters: {
            distanceX: 20,
            distanceY: 3,
            strength: 1.2,
            direction: "forward",
          },
          triggerParameters: { infinite: true, count: 0, delayMs: 3000 },
        },
        {
          objectId: "OBJ-12",
          motionId: "DRIFT",
          triggerId: "loop",
          motionParameters: {
            distanceX: 24,
            distanceY: -10,
            variance: 0.5,
            speed: 0.9,
          },
          triggerParameters: { infinite: true, count: 0, delayMs: 3800 },
        },
      ]);
      return;
    }

    if (currentSceneId === "parakkai-lake") {
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
          triggerParameters: { infinite: true, count: 0, delayMs: 2200 },
        },
        {
          objectId: "OBJ-07",
          motionId: "FLOW",
          triggerId: "loop",
          motionParameters: {
            distanceX: 16,
            distanceY: 2,
            strength: 1,
            direction: "forward",
          },
          triggerParameters: { infinite: true, count: 0, delayMs: 3200 },
        },
        {
          objectId: "OBJ-03",
          motionId: "FLIGHT",
          triggerId: "loop",
          motionParameters: {
            distanceX: 280,
            distanceY: -14,
            arc: 22,
            rotation: 2,
            speed: 0.9,
          },
          triggerParameters: { infinite: true, count: 0, delayMs: 5200 },
        },
      ]);
    }
  }, []);

  const handleAnimationAction = useCallback(
    (action: "flight" | "sway" | "radiate" | "reset") => {
      const runtime = runtimeRef.current;
      if (!runtime) return;

      if (action === "reset") {
        runtime.stopAll();
        startCurrentSceneAnimations(runtime, scene.id);
        return;
      }

      const requests = {
        flight: {
          objectId: "OBJ-03" as const,
          motionId: "FLIGHT" as const,
          triggerId: "loop" as const,
          motionParameters: {
            distanceX: 260,
            distanceY: -18,
            arc: 26,
            rotation: 3,
            speed: 0.85,
          },
          triggerParameters: { infinite: true, count: 0, delayMs: 5000 },
        },
        sway: {
          objectId: (isScene02 || isScene03 ? "OBJ-09" : "OBJ-01") as "OBJ-09" | "OBJ-01",
          motionId: "SWAY" as const,
          triggerId: "loop" as const,
          motionParameters: {
            angle: 3,
            distance: 2,
            axis: "rotation" as const,
            cycles: 2,
          },
          triggerParameters: { infinite: true, count: 0, delayMs: 2600 },
        },
        radiate: {
          objectId: "OBJ-06" as const,
          motionId: "RADIATE" as const,
          triggerId: "loop" as const,
          motionParameters: {
            fromScale: 0.98,
            toScale: 1.04,
            intensity: 1,
            pulse: true,
          },
          triggerParameters: { infinite: true, count: 0, delayMs: 2200 },
        },
      } as const;

      runtime.start(requests[action]);
    },
    [scene.id, isScene02, isScene03, startCurrentSceneAnimations],
  );

  const handleSceneSelect = useCallback(
    (sceneNumber: string) => {
      const index = PARAKKAI_SPATIAL_JOURNEY.findIndex(
        (item) => String(item.number).padStart(2, "0") === sceneNumber,
      );
      if (index >= 0) selectScene(index);
    },
    [selectScene],
  );

  const handleNavigate = useCallback(
    (viewId: string) => {
      setIsNavigationOpen(false);
      setIsPlaying(false);
      onNavigate?.(viewId);
    },
    [onNavigate],
  );

  useEffect(() => {
    const root = stageRef.current;
    if (!root) {
      runtimeRef.current = null;
      return;
    }

    const { runtime } = createAnimationRuntime(root);
    runtimeRef.current = runtime;
    startCurrentSceneAnimations(runtime, scene.id);

    return () => {
      runtime.stopAll();
      if (runtimeRef.current === runtime) runtimeRef.current = null;
    };
  }, [sceneIndex, scene.id, startCurrentSceneAnimations]);

  return (
    <main
      ref={stageRef}
      className={[
        "relative h-full w-full min-h-0 overflow-hidden",
        "text-[var(--aai-text)]",
        isImmersive ? "z-[100]" : "",
      ].join(" ")}
      aria-label="Parakkai Sacred Spatial Journey"
    >
      <SpatialScene
        scene={scene}
        sceneIndex={sceneIndex}
        isPlaying={isPlaying}
      />

      {/* =====================================================
          P1.27 — SCENE 01 UNIVERSAL ANIMATION TARGETS
          Lightweight visual layers only. The source photograph is untouched.
          ===================================================== */}
      {isScene01 ? (
        <div
          className="pointer-events-none absolute inset-0 z-[12] overflow-hidden"
          aria-hidden="true"
        >
          {/* OBJ-03 — Bird Group / multi-target proof */}
          <div
            data-animation-object-id="OBJ-03"
            data-animation-target-id="default"
            className="absolute left-[43%] top-[47%] h-12 w-24 will-change-transform"
          >
            <svg
              viewBox="0 0 120 60"
              className="h-full w-full overflow-visible"
              fill="none"
            >
              <g
                fill="rgba(15,23,42,0.82)"
                stroke="rgba(255,255,255,0.32)"
                strokeWidth="1"
              >
                <path
                  data-animation-object-id="OBJ-03"
                  data-animation-target-id="bird-01"
                  d="M7 25 Q17 12 28 25 Q18 19 7 25Z"
                />
                <path
                  data-animation-object-id="OBJ-03"
                  data-animation-target-id="bird-02"
                  d="M40 18 Q50 5 61 18 Q51 12 40 18Z"
                />
                <path
                  data-animation-object-id="OBJ-03"
                  data-animation-target-id="bird-03"
                  d="M78 29 Q90 13 102 29 Q91 21 78 29Z"
                />
              </g>
            </svg>
          </div>

          {/* OBJ-01 — Peacock */}
          <div
            data-animation-object-id="OBJ-01"
            data-animation-target-id="default"
            className="absolute left-[34%] top-[25%] h-20 w-16 origin-bottom will-change-transform"
          >
            <svg
              viewBox="0 0 80 100"
              className="h-full w-full overflow-visible"
            >
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

          {/* OBJ-06 — Sun */}
          <div
            data-animation-object-id="OBJ-06"
            data-animation-target-id="default"
            className="absolute right-[10%] top-[27%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.42)_0%,rgba(245,158,11,0.18)_26%,rgba(245,158,11,0.06)_48%,transparent_72%)] blur-[2px] will-change-transform sm:h-56 sm:w-56"
          />
        </div>
      ) : null}

      {/* =====================================================
          P1.27 — INTERNAL ANIMATION DEVELOPER PLAYGROUND
          Real Animation Factory + Runtime only.
          ===================================================== */}

      <SpatialSceneTransition
        active={isTransitioning}
        onComplete={completeSceneTransition}
      />

      <SpatialActivityRail
        currentScene={scene}
        onAnimationAction={handleAnimationAction}
        onSceneSelect={handleSceneSelect}
      />

      {/* Minimal cinematic navigation — preserves the full-screen scene without restoring the old website chrome. */}
      {onNavigate ? (
        <div className="absolute left-5 top-5 z-40">
          <button
            type="button"
            onClick={() => setIsNavigationOpen((current) => !current)}
            className="rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] shadow-lg backdrop-blur-md transition cursor-pointer"
            style={{ color: "var(--aai-text)", borderColor: "var(--aai-border)", backgroundColor: "var(--aai-surface)" }}
            aria-expanded={isNavigationOpen}
            aria-controls="parakkai-cinematic-navigation"
          >
            Explore Parakkai
          </button>

          {isNavigationOpen ? (
            <nav
              id="parakkai-cinematic-navigation"
              aria-label="Parakkai navigation"
              className="mt-2 w-56 rounded-2xl border p-2 shadow-2xl backdrop-blur-xl"
              style={{ color: "var(--aai-text)", borderColor: "var(--aai-border)", backgroundColor: "var(--aai-surface)" }}
            >
              <div className="px-3 pb-2 pt-1 text-[9px] font-mono uppercase tracking-[0.28em]" style={{ color: "var(--aai-text-muted)" }}>
                Sacred Experience
              </div>
              <div className="grid grid-cols-2 gap-1">
                {CINEMATIC_NAVIGATION.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className="rounded-xl px-3 py-2 text-left text-[11px] font-medium transition cursor-pointer hover:opacity-80"
                    style={{ color: "var(--aai-text)", backgroundColor: "var(--aai-surface-alt)" }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          ) : null}
        </div>
      ) : null}

      <div className="pointer-events-none absolute right-6 top-6 z-30 text-right">
        <div
          className="font-mono text-[11px] tracking-[0.25em] px-3 py-1.5 rounded-full backdrop-blur-md border shadow-md inline-flex items-center"
          style={{
            backgroundColor: "var(--aai-surface)",
            color: "var(--aai-text)",
            borderColor: "var(--aai-border)"
          }}
        >
          <span>{String(scene.number).padStart(2, "0")}</span>
          <span className="mx-1 opacity-40">/</span>
          <span style={{ color: "var(--aai-text-muted)" }}>{String(sceneCount).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-24 left-6 z-30 max-w-xl">
        <div
          className="p-4 sm:p-5 rounded-2xl backdrop-blur-md border shadow-xl inline-block max-w-full"
          style={{
            backgroundColor: "var(--aai-surface)",
            borderColor: "var(--aai-border)"
          }}
        >
          <div className="mb-1 text-[10px] uppercase tracking-[0.32em] font-semibold font-mono" style={{ color: "var(--aai-text-muted)" }}>
            {scene.subtitle}
          </div>

          <h1 className="text-xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: "var(--aai-text)" }}>
            {scene.title}
          </h1>
        </div>
      </div>
    </main>
  );
}

/*
 * CONTRACT
 * ID: P1.20-SPATIAL-JOURNEY-TRANSITION-ENGINE
 * NAME: Parakkai Spatial Journey Transition Engine
 * STATUS: ACTIVE
 * VERSION: 1.3.0
 *
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Project: PARAKKAI
 *
 * Responsibilities:
 * - Own journey state
 * - Drive 12-scene configuration
 * - Drive autoplay
 * - Drive keyboard navigation
 * - Coordinate renderer
 * - Coordinate scene transition
 * - Coordinate journey controls
 * - Provide minimal cinematic navigation into the full Parakkai experience
 * - Host the P1.27 internal animation playground
 *
 * Important:
 * - Scene artwork remains the hero.
 * - Animation layers are lightweight independent targets.
 * - No network/API animation boundary is used.
 * - The photograph is not modified by the animation runtime.
 * - Cinematic navigation does not restore the old header/rail/footer chrome.
 */
