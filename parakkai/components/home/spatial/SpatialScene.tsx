"use client";

import { useEffect, useRef, useState } from "react";

import type { SpatialJourneyScene } from "./spatialJourneyConfig";

import SpatialAtmosphere from "./SpatialAtmosphere";

type SpatialSceneProps = {
  scene: SpatialJourneyScene;

  /**
   * Optional index supplied by the journey stage.
   * Kept here because the stage owns journey position.
   */
  sceneIndex?: number;

  /**
   * Journey playback state.
   * Scene rendering itself does not perform automatic zoom.
   */
  isPlaying?: boolean;

  /**
   * Immersive state is owned by the journey stage.
   */
  isImmersive?: boolean;

  /**
   * Advance is owned by the journey stage.
   */
  onAdvance?: () => void;
};

const focalPointMap: Record<string, string> = {
  temple: "50% 42%",
  tree: "50% 38%",
  water: "50% 62%",
  mountain: "50% 38%",
  deity: "50% 38%",
  entrance: "50% 48%",
  horizon: "50% 45%",
  center: "50% 50%",
};

const motionMap: Record<
  NonNullable<SpatialJourneyScene["motion"]>,
  {
    x: number;
    y: number;
    scale: number;
  }
> = {
  still: {
    x: 0,
    y: 0,
    scale: 1,
  },

  drift: {
    x: 0.15,
    y: -0.05,
    scale: 1.003,
  },

  flow: {
    x: -0.2,
    y: 0.05,
    scale: 1.004,
  },

  rise: {
    x: 0,
    y: -0.1,
    scale: 1.003,
  },

  open: {
    x: 0,
    y: 0,
    scale: 1.004,
  },
};

export default function SpatialScene({
  scene,
  sceneIndex = 0,
  isPlaying = false,
  isImmersive = false,
  onAdvance,
}: SpatialSceneProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  const [pointer, setPointer] = useState({
    x: 0,
    y: 0,
  });

  const [imageSource, setImageSource] = useState(scene.image ?? "");

  const [imageReady, setImageReady] = useState(false);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageSource(scene.image ?? "");
    setImageReady(false);
    setImageError(false);
  }, [scene.id, scene.image]);

  useEffect(() => {
    const element = stageRef.current;

    if (!element) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      setPointer({
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      });
    };

    const resetPointer = () => {
      setPointer({
        x: 0,
        y: 0,
      });
    };

    element.addEventListener("pointermove", handlePointerMove);

    element.addEventListener("pointerleave", resetPointer);

    return () => {
      element.removeEventListener("pointermove", handlePointerMove);

      element.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  const motion = motionMap[scene.motion ?? "still"];

  const objectPosition =
    focalPointMap[scene.focalPoint ?? "center"] ?? "50% 50%";

  const isScene01 = scene.id === "sakthi-vinayakar";

  /*
   * Scene 01 is the reference implementation.
   *
   * Important:
   * No automatic Ken Burns animation.
   * No zoom-in / zoom-out cycle.
   *
   * The image remains essentially stable.
   */
  const imageTransform = `
  translate3d(
    ${pointer.x * -0.35}%,
    ${pointer.y * -0.25}%,
    0
  )
  scale(1)
`;

  return (
    <section
      ref={stageRef}
      className="absolute inset-0 overflow-hidden" style={{ backgroundColor: "var(--aai-bg)", color: "var(--aai-text)" }}
      aria-label={`${scene.number} ${scene.title}`}
      data-scene-index={sceneIndex}
      data-scene-id={scene.id}
      data-playing={isPlaying}
      data-immersive={isImmersive}
    >
      {/* ============================================================
          1. BASE IMAGE
          ============================================================ */}

      {imageSource && (
        <>
          {/* Very soft depth bed.
              This is atmospheric support, not another visual scene. */}
          <div
            className="absolute inset-[-2%] scale-[1.02] bg-cover bg-center opacity-35 blur-2xl"
            style={{
              backgroundImage: `url("${imageSource}")`,
              backgroundPosition: objectPosition,
            }}
            aria-hidden="true"
          />

          {/* ========================================================
              2. REAL IMAGE HERO
              ======================================================== */}

          <div
            className="absolute inset-0 h-full w-full overflow-hidden"
            style={{
              transform: imageTransform,
              transition: "transform 1200ms ease-out",
              transformOrigin: objectPosition,
            }}
          >
            <img
              src={imageSource}
              alt={scene.title}
              draggable={false}
              className={[
                "relative z-10",
                "h-full w-full",
                "select-none object-cover object-center",
                "transition-opacity duration-700",
                imageReady ? "opacity-100" : "opacity-0",
              ].join(" ")}
              style={{
                objectPosition,
              }}
              onLoad={() => {
                setImageReady(true);
                setImageError(false);
              }}
              onError={() => {
                if (
                  scene.imageFallback &&
                  imageSource !== scene.imageFallback
                ) {
                  setImageSource(scene.imageFallback);
                  return;
                }

                setImageError(true);
              }}
            />
          </div>
        </>
      )}

      {/* ============================================================
          3. SCENE ATMOSPHERE
          ============================================================ */}

      {!imageError && <SpatialAtmosphere scene={scene} />}

      {/* ============================================================
          4. NATURAL MORNING LIGHT
          ============================================================ */}

      {isScene01 && (
        <div
          className="pointer-events-none absolute inset-0 z-20"
          aria-hidden="true"
        >
          <div
            className="absolute -right-[12%] -top-[18%] h-[62vh] w-[62vh] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,210,120,0.18) 0%, rgba(255,210,120,0.05) 35%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,220,150,0.045) 0%, transparent 38%, rgba(2,9,20,0.08) 70%, rgba(2,9,20,0.42) 100%)",
            }}
          />
        </div>
      )}

      {/* ============================================================
          5. CINEMATIC VIGNETTE
          ============================================================ */}

      <div
        className="pointer-events-none absolute inset-0 z-30"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at center, transparent 48%, rgba(0,0,0,0.30) 100%)",
        }}
      />

      {/* ============================================================
          6. VERY LIGHT FILM GRAIN
          ============================================================ */}

      <div
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.035] mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.20'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ============================================================
          7. LOADING STATE
          ============================================================ */}

      {!imageReady && !imageError && imageSource && (
        <div className="absolute inset-0 z-50 grid place-items-center" style={{ backgroundColor: "var(--aai-bg)", color: "var(--aai-text)" }}>
          <div
            className="h-4 w-4 rounded-full border border-white/20 border-t-white/70"
            aria-label="Loading scene"
          />
        </div>
      )}

      {/* ============================================================
          8. MISSING / PLANNED SCENE
          ============================================================ */}

      {!imageSource ||
        (imageError && (
          <div className="absolute inset-0 z-40 grid place-items-center" style={{ backgroundColor: "var(--aai-bg)", color: "var(--aai-text)" }}>
            <div className="text-center">
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
                Scene {scene.number}
              </div>

              <div className="mt-2 text-sm text-white/60">{scene.title}</div>

              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/25">
                Asset pending
              </div>
            </div>
          </div>
        ))}

      {/* ============================================================
          9. DOUBLE CLICK ADVANCE
          ============================================================ */}

      {onAdvance && (
        <button
          type="button"
          onDoubleClick={onAdvance}
          aria-label="Advance to next scene"
          className="absolute inset-0 z-10 cursor-default"
          style={{
            background: "transparent",
          }}
        />
      )}
    </section>
  );
}

/*
 * CONTRACT
 * ID: P1.12-SPATIAL-SCENE-REFERENCE
 * NAME: PARAKKAI Spatial Scene Reference Renderer
 * STATUS: ACTIVE
 * VERSION: 1.2.0
 *
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Project: PARAKKAI
 *
 * Reference Scene:
 * 01 — Sakthi Vinayakar
 *
 * PRINCIPLES
 *
 * 1. Real supplied imagery remains the visual source of truth.
 * 2. Scene 01 must not perform visible zoom-in / zoom-out.
 * 3. Motion is limited to extremely subtle spatial response.
 * 4. Semantic focal points are translated into CSS values.
 * 5. Atmosphere remains subordinate to the real image.
 * 6. Missing scenes remain structurally valid.
 * 7. Scene-specific meaning belongs in configuration.
 *
 * Production target:
 *
 * REAL IMAGE
 *     ↓
 * STABLE COMPOSITION
 *     ↓
 * SUBTLE PARALLAX
 *     ↓
 * NATURAL LIGHT
 *     ↓
 * ATMOSPHERE
 *     ↓
 * TRANSITION
 *
 * The renderer is a reusable reference implementation
 * for the future PARAKKAI scene framework.
 */
