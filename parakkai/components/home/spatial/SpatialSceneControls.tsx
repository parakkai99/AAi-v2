"use client";

import type { SpatialJourneyScene } from "./spatialJourneyConfig";

type SpatialSceneControlsProps = {
  scenes: SpatialJourneyScene[];
  activeIndex: number;

  isPlaying: boolean;
  isImmersive: boolean;

  onPrevious: () => void;
  onNext: () => void;

  onTogglePlaying: () => void;
  onToggleImmersive: () => void;

  onSelectScene: (index: number) => void;
};

export default function SpatialSceneControls({
  scenes,
  activeIndex,
  isPlaying,
  isImmersive,
  onPrevious,
  onNext,
  onTogglePlaying,
  onToggleImmersive,
  onSelectScene,
}: SpatialSceneControlsProps) {
  return (
    <nav
      className={[
        "absolute bottom-5 left-1/2 z-40",
        "-translate-x-1/2",
        "flex max-w-[calc(100vw-32px)]",
        "items-center gap-2",
        "rounded-full border border-white/10",
        "bg-black/25 px-2 py-2",
        "backdrop-blur-xl",
        "shadow-2xl",
        isImmersive
          ? "opacity-30 hover:opacity-100"
          : "opacity-100",
        "transition-opacity duration-500",
      ].join(" ")}
      aria-label="Parakkai journey controls"
    >
      {/* Previous */}
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous scene"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/55 transition hover:bg-white/10 hover:text-white"
      >
        <span className="text-sm">‹</span>
      </button>

      {/* Scene sequence */}
      <div className="flex max-w-[52vw] items-center gap-1 overflow-x-auto px-1 scrollbar-none">
        {scenes.map((scene, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => onSelectScene(index)}
              aria-label={`Go to scene ${scene.number}: ${scene.title}`}
              aria-current={
                active ? "step" : undefined
              }
              className={[
                "group relative flex h-7 shrink-0",
                "items-center justify-center",
                "rounded-full px-2.5",
                "transition-all duration-300",
                active
                  ? "bg-white/12 text-white"
                  : "text-white/30 hover:bg-white/7 hover:text-white/70",
              ].join(" ")}
            >
              <span className="font-mono text-[8px] tracking-[0.12em]">
                {String(scene.number).padStart(2, "0")}
              </span>

              {active && (
                <span className="ml-1.5 h-1 w-1 rounded-full bg-white/80" />
              )}
            </button>
          );
        })}
      </div>

      {/* Play / pause */}
      <button
        type="button"
        onClick={onTogglePlaying}
        aria-label={
          isPlaying
            ? "Pause journey"
            : "Play journey"
        }
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <span className="text-[10px]">
          {isPlaying ? "Ⅱ" : "▶"}
        </span>
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Next scene"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/55 transition hover:bg-white/10 hover:text-white"
      >
        <span className="text-sm">›</span>
      </button>

      {/* Immersive */}
      <button
        type="button"
        onClick={onToggleImmersive}
        aria-label={
          isImmersive
            ? "Exit immersive mode"
            : "Enter immersive mode"
        }
        className={[
          "hidden h-8 shrink-0 items-center",
          "rounded-full px-2.5",
          "text-[8px] uppercase tracking-[0.18em]",
          "transition sm:flex",
          isImmersive
            ? "bg-white/12 text-white"
            : "text-white/35 hover:bg-white/10 hover:text-white/70",
        ].join(" ")}
      >
        {isImmersive ? "Exit" : "Immersive"}
      </button>
    </nav>
  );
}

/*
 * CONTRACT
 * ID: P1.11-SPATIAL-SCENE-CONTROLS
 * NAME: Parakkai Spatial Scene Controls
 * STATUS: ACTIVE
 * VERSION: 1.1.0
 *
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Contract:
 *
 *   SpatialJourneyStage
 *          ↓
 *   scenes
 *   activeIndex
 *   isPlaying
 *   isImmersive
 *   navigation callbacks
 *          ↓
 *   SpatialSceneControls
 *
 * Design principle:
 *
 *   Controls remain secondary to the place.
 *
 *   They are:
 *   - minimal
 *   - horizontal
 *   - spatial
 *   - unobtrusive
 *
 * They are NOT dashboard cards.
 */