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

const AUTOPLAY_MS = 122000;

export default function SpatialJourneyStage() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isImmersive, setIsImmersive] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const [pendingSceneIndex, setPendingSceneIndex] = useState<number | null>(
    null,
  );

  const stageRef = useRef<HTMLElement | null>(null);

  const scene = getSpatialScene(sceneIndex);
  const sceneCount = PARAKKAI_SPATIAL_JOURNEY.length;
  const isScene01 = scene.id === "sakthi-vinayakar";

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

  const startScene01Animations = useCallback((runtime: AnimationRuntime) => {
    runtime.startMany([
      {
        objectId: "OBJ-06", motionId: "RADIATE", triggerId: "loop",
        motionParameters: { fromScale: 0.98, toScale: 1.04, intensity: 1, pulse: true },
        triggerParameters: { infinite: true, count: 0, delayMs: 2200 },
      },
      {
        objectId: "OBJ-03", motionId: "FLIGHT", triggerId: "loop",
        motionParameters: { distanceX: 260, distanceY: -18, arc: 26, rotation: 3, speed: 0.85 },
        triggerParameters: { infinite: true, count: 0, delayMs: 5000 },
      },
      {
        objectId: "OBJ-01", motionId: "SWAY", triggerId: "loop",
        motionParameters: { angle: 3, distance: 2, axis: "rotation", cycles: 2 },
        triggerParameters: { infinite: true, count: 0, delayMs: 2600 },
      },
    ]);
  }, []);

  const handleAnimationAction = useCallback(
    (action: "flight" | "sway" | "radiate" | "reset") => {
      const runtime = runtimeRef.current;
      if (!runtime || !isScene01) return;

      if (action === "reset") {
        runtime.stopAll();
        startScene01Animations(runtime);
        return;
      }

      const requests = {
        flight: {
          objectId: "OBJ-03" as const, motionId: "FLIGHT" as const, triggerId: "loop" as const,
          motionParameters: { distanceX: 260, distanceY: -18, arc: 26, rotation: 3, speed: 0.85 },
          triggerParameters: { infinite: true, count: 0, delayMs: 5000 },
        },
        sway: {
          objectId: "OBJ-01" as const, motionId: "SWAY" as const, triggerId: "loop" as const,
          motionParameters: { angle: 3, distance: 2, axis: "rotation" as const, cycles: 2 },
          triggerParameters: { infinite: true, count: 0, delayMs: 2600 },
        },
        radiate: {
          objectId: "OBJ-06" as const, motionId: "RADIATE" as const, triggerId: "loop" as const,
          motionParameters: { fromScale: 0.98, toScale: 1.04, intensity: 1, pulse: true },
          triggerParameters: { infinite: true, count: 0, delayMs: 2200 },
        },
      } as const;

      runtime.start(requests[action]);
    },
    [isScene01, startScene01Animations],
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

  useEffect(() => {
    const root = stageRef.current;
    if (!root || !isScene01) {
      runtimeRef.current = null;
      return;
    }

    const { runtime } = createAnimationRuntime(root);
    runtimeRef.current = runtime;
    startScene01Animations(runtime);

    return () => {
      runtime.stopAll();
      if (runtimeRef.current === runtime) runtimeRef.current = null;
    };
  }, [sceneIndex, isScene01, startScene01Animations]);

  return (
    <main
      ref={stageRef}
      className={[
        "relative h-full w-full min-h-0 overflow-hidden",
        "bg-black text-white",
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
        onAnimationAction={handleAnimationAction}
        onSceneSelect={handleSceneSelect}
      />

      <div className="pointer-events-none absolute right-6 top-6 z-30 text-right">
        <div className="font-mono text-[11px] tracking-[0.25em] text-white/55">
          {String(scene.number).padStart(2, "0")}

          <span className="mx-1 text-white/20">/</span>

          {String(sceneCount).padStart(2, "0")}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-24 left-6 z-30 max-w-xl">
        <div className="mb-2 text-[10px] uppercase tracking-[0.32em] text-white/45">
          {scene.subtitle}
        </div>

        <h1 className="text-2xl font-light tracking-wide text-white/95 md:text-4xl">
          {scene.title}
        </h1>
      </div>
    </main>
  );
}

/*
 * CONTRACT
 * ID: P1.20-SPATIAL-JOURNEY-TRANSITION-ENGINE
 * NAME: Parakkai Spatial Journey Transition Engine
 * STATUS: ACTIVE
 * VERSION: 1.2.0
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
 * - Host the P1.27 internal animation playground
 *
 * Important:
 * - Scene artwork remains the hero.
 * - Animation layers are lightweight independent targets.
 * - No network/API animation boundary is used.
 * - The photograph is not modified by the animation runtime.
 */
