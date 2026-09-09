import type { SpatialJourneyScene } from "./spatialJourneyConfig";

type SpatialAtmosphereProps = {
  scene: SpatialJourneyScene;
};

export default function SpatialAtmosphere({ scene }: SpatialAtmosphereProps) {
  const isScene01 = scene.id === "sakthi-vinayakar";

  if (!isScene01) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* ==========================================================
          OBJ-06 — SUN RAYS / RADIATING LIGHT
          ========================================================== */}

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

      {/* ==========================================================
          BASE DAWN VEIL
          ========================================================== */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,224,164,0.06) 0%, rgba(255,214,145,0.015) 42%, rgba(2,9,20,0.12) 100%)",
        }}
      />

      {/* ==========================================================
          OBJ-09 — ENVIRONMENTAL AIR / LEAF-LIKE SWAY FIELD
          ========================================================== */}

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

      {/* ==========================================================
          OBJ-12 — PETAL / PARTICLE 01
          ========================================================== */}

      <span
        data-aa-animation-object="OBJ-12"
        className="absolute left-[31%] top-[38%] h-1 w-1 rounded-full bg-white/30"
      />

      {/* ==========================================================
          OBJ-03 — BIRD / MOVING LIGHT 01
          ========================================================== */}

      <span
        data-aa-animation-object="OBJ-03"
        className="absolute left-[67%] top-[31%] h-[3px] w-[3px] rounded-full bg-amber-100/40"
      />

      {/* ==========================================================
          OBJ-03 — BIRD / MOVING LIGHT 02
          ========================================================== */}

      <span
        data-aa-animation-object="OBJ-03"
        className="absolute left-[74%] top-[57%] h-[3px] w-[3px] rounded-full bg-white/30"
      />

      {/* ==========================================================
          CINEMATIC ORBIT RING
          Independent visual layer — no source-art modification
          ========================================================== */}

      <div
        data-aa-animation-object="OBJ-05"
        className="absolute left-1/2 top-[42%] h-[34vh] w-[60vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-amber-200/10"
        style={{
          transformOrigin: "center center",
        }}
      />

      {/* ==========================================================
          SCENE EDGE DEPTH
          ========================================================== */}

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

/*
 * CONTRACT
 * ID: P1.16-PARAKKAI-SCENE01-ATMOSPHERE
 * NAME: Scene 01 Living Atmosphere
 * STATUS: ACTIVE
 * VERSION: 1.1.0
 *
 * RULE:
 * The real photograph remains the hero.
 *
 * Independent atmospheric layers are animated by
 * the AAi Animation Runtime.
 */
