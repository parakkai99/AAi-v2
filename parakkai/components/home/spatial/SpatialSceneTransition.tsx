"use client";

import { useEffect, useState } from "react";

type SpatialSceneTransitionProps = {
  active: boolean;
  onComplete: () => void;
};

const TRANSITION_DURATION = 1200;

export default function SpatialSceneTransition({
  active,
  onComplete,
}: SpatialSceneTransitionProps) {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!active) {
      setRendered(false);
      return;
    }

    setRendered(true);

    const timer = window.setTimeout(() => {
      onComplete();
    }, TRANSITION_DURATION);

    return () => {
      window.clearTimeout(timer);
    };
  }, [active, onComplete]);

  if (!rendered) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[90] overflow-hidden"
      aria-hidden="true"
    >
      {/* =========================================================
          FULL-SCREEN SOFT LIGHT
          ========================================================= */}

      <div
        className={[
          "absolute inset-0",
          "bg-[#f8e7bd]",
          "animate-parakkai-transition-wash",
        ].join(" ")}
      />

      {/* =========================================================
          CENTERED SACRED LIGHT
          ========================================================= */}

      <div
        className="absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,248,218,0.95) 0%, rgba(255,224,155,0.58) 25%, rgba(255,204,115,0.20) 48%, transparent 72%)",
          animation: "parakkai-transition-glow 1200ms ease-in-out forwards",
        }}
      />

      {/* =========================================================
          HORIZONTAL DAWN LIGHT
          ========================================================= */}

      <div
        className="absolute left-[-30%] top-[42%] h-[18vh] w-[160%]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,244,210,0.08) 25%, rgba(255,239,190,0.55) 50%, rgba(255,244,210,0.08) 75%, transparent 100%)",
          filter: "blur(24px)",
          animation: "parakkai-transition-sweep 1200ms ease-in-out forwards",
        }}
      />

      <style>{`
        @keyframes parakkai-transition-wash {
          0% {
            opacity: 0;
          }

          35% {
            opacity: 0.18;
          }

          65% {
            opacity: 0.55;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes parakkai-transition-glow {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.65);
          }

          45% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }

          100% {
            opacity: 0.25;
            transform: translate(-50%, -50%) scale(1.18);
          }
        }

        @keyframes parakkai-transition-sweep {
          0% {
            opacity: 0;
            transform: translateX(-20%);
          }

          35% {
            opacity: 0.35;
          }

          65% {
            opacity: 0.75;
          }

          100% {
            opacity: 0;
            transform: translateX(20%);
          }
        }

        .animate-parakkai-transition-wash {
          animation:
            parakkai-transition-wash
            1200ms
            ease-in-out
            forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-parakkai-transition-wash,
          [style*="parakkai-transition"] {
            animation-duration: 1ms !important;
          }
        }
      `}</style>
    </div>
  );
}

/*
 * CONTRACT
 * ID: P1.21-PARAKKAI-SCENE-TRANSITION
 * NAME: PARAKKAI Cinematic Scene Transition
 * STATUS: ACTIVE
 * VERSION: 1.1.0
 *
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Project: PARAKKAI
 *
 * PURPOSE:
 *
 * Provide a visible atmospheric bridge between
 * spatial journey scenes.
 *
 * Transition:
 *
 * SCENE 01
 * Sakthi Vinayakar
 *       ↓
 * warm sacred light
 *       ↓
 * soft environmental wash
 *       ↓
 * SCENE 02
 * Sacred Tree
 *
 * RULES:
 *
 * - Do not modify source artwork.
 * - Do not zoom source artwork.
 * - Do not crop source artwork.
 * - Do not use a card transition.
 * - Do not use a conventional slide transition.
 * - Do not add website header/footer.
 * - Keep transition approximately 1.2 seconds.
 */
