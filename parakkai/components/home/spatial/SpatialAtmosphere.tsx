/**
 * P1-SPATIAL-SCENE-PRODUCTION
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract ID: P1.16-PARAKKAI-SPATIAL-ATMOSPHERE
 * Status: ACTIVE
 * Version: 2.0.0 (Phase 1 Scene 01 + Phase 2 Scene 02 Supported)
 */

import React from "react";
import type { SpatialJourneyScene } from "./spatialJourneyConfig";

type SpatialAtmosphereProps = {
  scene: SpatialJourneyScene;
};

export default function SpatialAtmosphere({ scene }: SpatialAtmosphereProps) {
  const isScene01 = scene.id === "sakthi-vinayakar";
  const isScene02 = scene.id === "sacred-tree";
  const isScene03 = scene.id === "vinayakar-to-lake";
  const isScene04 = scene.id === "parakkai-lake";

  if (!isScene01 && !isScene02 && !isScene03 && !isScene04) {
    return null;
  }

  // Phase 1: Scene 01 — Sakthi Vinayakar Golden Dawn Atmosphere
  if (isScene01) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        aria-hidden="true"
      >
        {/* OBJ-06 — SUN RAYS / RADIATING LIGHT */}
        <div
          data-aa-animation-object="OBJ-06"
          className="absolute -right-[18%] -top-[28%] h-[70vh] w-[70vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,220,150,0.24) 0%, rgba(255,205,120,0.09) 30%, transparent 70%)",
            filter: "blur(28px)",
            transformOrigin: "center center",
          }}
        />

        {/* BASE DAWN VEIL */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,224,164,0.06) 0%, rgba(255,214,145,0.015) 42%, rgba(2,9,20,0.12) 100%)",
          }}
        />

        {/* OBJ-09 — ENVIRONMENTAL AIR / LEAF-LIKE SWAY FIELD */}
        <div
          data-aa-animation-object="OBJ-09"
          className="absolute -left-[12%] top-[24%] h-[24vh] w-[72vw] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,245,215,0.035), transparent)",
            filter: "blur(24px)",
            transformOrigin: "center center",
          }}
        />

        {/* OBJ-12 — PETAL / PARTICLE 01 */}
        <span
          data-aa-animation-object="OBJ-12"
          className="absolute left-[31%] top-[38%] h-1 w-1 rounded-full bg-white/30"
        />

        {/* OBJ-03 — BIRD / MOVING LIGHT 01 */}
        <span
          data-aa-animation-object="OBJ-03"
          className="absolute left-[67%] top-[31%] h-[3px] w-[3px] rounded-full bg-amber-100/40"
        />

        {/* OBJ-03 — BIRD / MOVING LIGHT 02 */}
        <span
          data-aa-animation-object="OBJ-03"
          className="absolute left-[74%] top-[57%] h-[3px] w-[3px] rounded-full bg-white/30"
        />

        {/* CINEMATIC ORBIT RING */}
        <div
          data-aa-animation-object="OBJ-05"
          className="absolute left-1/2 top-[42%] h-[34vh] w-[60vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-amber-200/10"
          style={{
            transformOrigin: "center center",
          }}
        />

        {/* SCENE EDGE DEPTH */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 52%, rgba(0,0,0,0.22) 100%)",
          }}
        />
      </div>
    );
  }

  // Phase 2: Scene 02 — Sacred Tree (Sthala Vriksham) Living Knowledge Atmosphere
  if (isScene02) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        aria-hidden="true"
      >
        {/* OBJ-06 — DAPPLED CANOPY SUNBEAMS THROUGH SACRED FOLIAGE */}
        <div
          data-aa-animation-object="OBJ-06"
          className="absolute -left-[14%] -top-[20%] h-[75vh] w-[75vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(225,255,190,0.22) 0%, rgba(255,230,140,0.08) 36%, transparent 70%)",
            filter: "blur(30px)",
            transformOrigin: "center center",
          }}
        />

        {/* SACRED GROVE DAWN CANOPY VEIL */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(180,230,170,0.05) 0%, rgba(245,225,160,0.02) 42%, rgba(10,25,18,0.30) 100%)",
          }}
        />

        {/* OBJ-09 — ENVIRONMENTAL CANOPY BREEZE / LIVING KNOWLEDGE SWAY FIELD */}
        <div
          data-aa-animation-object="OBJ-09"
          className="absolute left-[8%] top-[20%] h-[28vh] w-[80vw] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(210,250,190,0.04), transparent)",
            filter: "blur(26px)",
            transformOrigin: "center center",
          }}
        />

        {/* OBJ-12 — SACRED POLLEN / LEAF PARTICLES */}
        <span
          data-aa-animation-object="OBJ-12"
          className="absolute left-[24%] top-[42%] h-1 w-1 rounded-full bg-emerald-100/40"
        />
        <span
          data-aa-animation-object="OBJ-12"
          className="absolute left-[58%] top-[34%] h-1 w-1 rounded-full bg-amber-200/35"
        />

        {/* OBJ-03 — TEMPLE BIRDS / CANOPY LIGHT MOTES */}
        <span
          data-aa-animation-object="OBJ-03"
          className="absolute left-[38%] top-[22%] h-[3px] w-[3px] rounded-full bg-emerald-200/50"
        />
        <span
          data-aa-animation-object="OBJ-03"
          className="absolute left-[62%] top-[28%] h-[3px] w-[3px] rounded-full bg-white/40"
        />

        {/* STHALA VRIKSHAM PRADAKSHINA ORBIT RING */}
        <div
          data-aa-animation-object="OBJ-05"
          className="absolute left-1/2 top-[48%] h-[38vh] w-[65vw] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-emerald-300/12"
          style={{
            transformOrigin: "center center",
          }}
        />

        {/* SCENE EDGE DEPTH VIGNETTE */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 48%, rgba(2,12,6,0.25) 100%)",
          }}
        />
      </div>
    );
  }

  // Phase 3: Scene 03 — Vinayakar → Lake (Blessing Becomes Flow)
  if (isScene03) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        aria-hidden="true"
      >
        {/* OBJ-06 — GOLDEN BLESSING LIGHT CORRIDOR */}
        <div
          data-aa-animation-object="OBJ-06"
          className="absolute left-[15%] -top-[10%] h-[60vh] w-[70vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,235,170,0.18) 0%, rgba(255,210,120,0.06) 45%, transparent 75%)",
            filter: "blur(32px)",
            transformOrigin: "center center",
          }}
        />

        {/* OBJ-08 — SACRED FLOW STREAM OVERLAY */}
        <div
          data-aa-animation-object="OBJ-08"
          className="absolute left-[20%] top-[38%] h-[24vh] w-[65vw] rounded-full"
          style={{
            background:
              "linear-gradient(110deg, transparent, rgba(255,240,190,0.06), rgba(157,228,239,0.08), transparent)",
            filter: "blur(20px)",
            transformOrigin: "left center",
          }}
        />

        {/* OBJ-12 — DRIFTING BLESSING LIGHT PARTICLES */}
        <span
          data-aa-animation-object="OBJ-12"
          className="absolute left-[35%] top-[45%] h-1 w-1 rounded-full bg-amber-100/50"
        />
        <span
          data-aa-animation-object="OBJ-12"
          className="absolute left-[52%] top-[52%] h-1 w-1 rounded-full bg-cyan-100/40"
        />
        <span
          data-aa-animation-object="OBJ-12"
          className="absolute left-[68%] top-[48%] h-1 w-1 rounded-full bg-amber-200/40"
        />

        {/* OBJ-03 — SACRED BIRDS GLIDING TOWARD WATER */}
        <span
          data-aa-animation-object="OBJ-03"
          className="absolute left-[45%] top-[25%] h-[3px] w-[3px] rounded-full bg-amber-100/60"
        />
        <span
          data-aa-animation-object="OBJ-03"
          className="absolute left-[58%] top-[22%] h-[3px] w-[3px] rounded-full bg-white/50"
        />

        {/* OBJ-05 — HORIZON GUIDANCE ORBIT */}
        <div
          data-aa-animation-object="OBJ-05"
          className="absolute left-1/2 top-[52%] h-[26vh] w-[75vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-amber-200/10"
          style={{
            transformOrigin: "center center",
          }}
        />

        {/* SCENE EDGE VIGNETTE */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 46%, rgba(5,15,25,0.30) 100%)",
          }}
        />
      </div>
    );
  }

  // Phase 4: Scene 04 — Parakkai Lake (Water, Life, Reflection)
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* OBJ-06 — MORNING HORIZON RADIANCE OVER WATER */}
      <div
        data-aa-animation-object="OBJ-06"
        className="absolute left-[25%] -top-[12%] h-[65vh] w-[65vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(220,245,255,0.22) 0%, rgba(180,225,250,0.07) 38%, transparent 72%)",
          filter: "blur(28px)",
          transformOrigin: "center center",
        }}
      />

      {/* AQUATIC MORN GLOW */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(160,215,240,0.05) 0%, rgba(200,235,250,0.02) 40%, rgba(4,22,35,0.28) 100%)",
        }}
      />

      {/* OBJ-07 — WATER SURFACE LIVING REFLECTION / SHIMMER */}
      <div
        data-aa-animation-object="OBJ-07"
        className="absolute left-[5%] bottom-[8%] h-[32vh] w-[90vw] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(157,228,239,0.07), rgba(255,250,230,0.05), transparent)",
          filter: "blur(24px)",
          transformOrigin: "center bottom",
        }}
      />

      {/* OBJ-08 — WATER RIPPLES & LOTUS BLOOM MOTION */}
      <div
        data-aa-animation-object="OBJ-08"
        className="absolute left-[20%] bottom-[16%] h-[18vh] w-[60vw] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(140,215,230,0.08) 0%, transparent 65%)",
          filter: "blur(18px)",
          transformOrigin: "center center",
        }}
      />

      {/* OBJ-03 — WATERFOWL / MIGRATORY BIRDS FLIGHT */}
      <span
        data-aa-animation-object="OBJ-03"
        className="absolute left-[32%] top-[24%] h-[3px] w-[3px] rounded-full bg-cyan-100/60"
      />
      <span
        data-aa-animation-object="OBJ-03"
        className="absolute left-[48%] top-[18%] h-[3px] w-[3px] rounded-full bg-white/60"
      />
      <span
        data-aa-animation-object="OBJ-03"
        className="absolute left-[64%] top-[28%] h-[3px] w-[3px] rounded-full bg-cyan-200/50"
      />

      {/* OBJ-02 — LOTUS EMBERS / WATER PARTICLES */}
      <span
        data-aa-animation-object="OBJ-02"
        className="absolute left-[28%] bottom-[22%] h-1 w-1 rounded-full bg-pink-200/45"
      />
      <span
        data-aa-animation-object="OBJ-02"
        className="absolute left-[62%] bottom-[18%] h-1 w-1 rounded-full bg-pink-100/40"
      />

      {/* OBJ-05 — TEERTHAM ORBIT HORIZON */}
      <div
        data-aa-animation-object="OBJ-05"
        className="absolute left-1/2 bottom-[24%] h-[30vh] w-[85vw] max-w-[850px] -translate-x-1/2 rounded-[50%] border border-cyan-200/12"
        style={{
          transformOrigin: "center center",
        }}
      />

      {/* SCENE EDGE VIGNETTE */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(2,15,26,0.32) 100%)",
        }}
      />
    </div>
  );
}

/*
 * CONTRACT
 * ID: P1.16-PARAKKAI-SPATIAL-ATMOSPHERE
 * NAME: Parakkai Spatial Atmospheric Renderer
 * STATUS: ACTIVE
 * VERSION: 2.0.0
 *
 * RULE:
 * The real photograph remains the hero.
 * Independent atmospheric layers are animated by the AAi Animation Runtime.
 */
