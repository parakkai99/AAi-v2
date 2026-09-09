/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.24 — Motion Registry
 * Status: ACTIVE
 * Version: 1.0.0
 */

import type {
  MotionDefinition,
  MotionId,
} from "./MotionDefinition";

export const motionDefinitions = {
  BLOOM: {
    id: "BLOOM",
    name: "Bloom",
    description:
      "Gradually introduces an object through scale and/or opacity, creating a natural emergence.",
    category: "appearance",
    defaultDurationMs: 900,
    defaultEasing: "easeOut",
    repeatable: true,
    reversible: true,
    interruptible: true,
    parameters: [
      {
        name: "fromScale",
        type: "number",
        description: "Starting scale.",
        required: false,
      },
      {
        name: "toScale",
        type: "number",
        description: "Ending scale.",
        required: false,
      },
      {
        name: "fromOpacity",
        type: "number",
        description: "Starting opacity from 0 to 1.",
        required: false,
      },
      {
        name: "toOpacity",
        type: "number",
        description: "Ending opacity from 0 to 1.",
        required: false,
      },
    ],
    defaults: {
      fromScale: 0.92,
      toScale: 1,
      fromOpacity: 0,
      toOpacity: 1,
    },
  },

  FLIGHT: {
    id: "FLIGHT",
    name: "Flight",
    description:
      "Moves an object through space using coordinated translation, optional rotation, and optional path variation.",
    category: "path",
    defaultDurationMs: 4000,
    defaultEasing: "natural",
    repeatable: true,
    reversible: true,
    interruptible: true,
    parameters: [
      {
        name: "distanceX",
        type: "number",
        description: "Horizontal travel distance.",
        required: false,
      },
      {
        name: "distanceY",
        type: "number",
        description: "Vertical travel distance.",
        required: false,
      },
      {
        name: "arc",
        type: "number",
        description: "Vertical or curved path influence.",
        required: false,
      },
      {
        name: "rotation",
        type: "number",
        description: "Rotation applied during movement.",
        required: false,
      },
      {
        name: "speed",
        type: "number",
        description: "Relative movement speed multiplier.",
        required: false,
      },
    ],
    defaults: {
      distanceX: 160,
      distanceY: -30,
      arc: 40,
      rotation: 2,
      speed: 1,
    },
  },

  SWAY: {
    id: "SWAY",
    name: "Sway",
    description:
      "Produces gentle repeated angular or positional movement around an anchor point.",
    category: "environmental",
    defaultDurationMs: 2200,
    defaultEasing: "easeInOut",
    repeatable: true,
    reversible: true,
    interruptible: true,
    parameters: [
      {
        name: "angle",
        type: "number",
        description: "Maximum angular displacement.",
        required: false,
      },
      {
        name: "distance",
        type: "number",
        description: "Optional positional displacement.",
        required: false,
      },
      {
        name: "axis",
        type: "string",
        description: "Movement axis or rotational axis.",
        required: false,
      },
      {
        name: "cycles",
        type: "number",
        description: "Number of sway cycles.",
        required: false,
      },
    ],
    defaults: {
      angle: 4,
      distance: 3,
      axis: "rotation",
      cycles: 2,
    },
  },

  FLOW: {
    id: "FLOW",
    name: "Flow",
    description:
      "Creates continuous directional movement suitable for environmental elements, surfaces, fabric, foliage, or similar flowing subjects.",
    category: "environmental",
    defaultDurationMs: 3000,
    defaultEasing: "linear",
    repeatable: true,
    reversible: true,
    interruptible: true,
    parameters: [
      {
        name: "distanceX",
        type: "number",
        description: "Horizontal flow distance.",
        required: false,
      },
      {
        name: "distanceY",
        type: "number",
        description: "Vertical flow distance.",
        required: false,
      },
      {
        name: "strength",
        type: "number",
        description: "Relative flow intensity.",
        required: false,
      },
      {
        name: "direction",
        type: "string",
        description: "Semantic flow direction.",
        required: false,
      },
    ],
    defaults: {
      distanceX: 12,
      distanceY: 2,
      strength: 1,
      direction: "forward",
    },
  },

  RISE: {
    id: "RISE",
    name: "Rise",
    description:
      "Moves an object upward or away from its initial position, optionally combined with gradual appearance.",
    category: "movement",
    defaultDurationMs: 1800,
    defaultEasing: "easeOut",
    repeatable: true,
    reversible: true,
    interruptible: true,
    parameters: [
      {
        name: "distance",
        type: "number",
        description: "Rise distance.",
        required: false,
      },
      {
        name: "fromOpacity",
        type: "number",
        description: "Starting opacity.",
        required: false,
      },
      {
        name: "toOpacity",
        type: "number",
        description: "Ending opacity.",
        required: false,
      },
      {
        name: "settle",
        type: "number",
        description: "Amount of final settling movement.",
        required: false,
      },
    ],
    defaults: {
      distance: 40,
      fromOpacity: 0.4,
      toOpacity: 1,
      settle: 3,
    },
  },

  RADIATE: {
    id: "RADIATE",
    name: "Radiate",
    description:
      "Expands visual energy outward through scale, opacity, glow-oriented intensity, or repeated outward motion.",
    category: "transform",
    defaultDurationMs: 2000,
    defaultEasing: "easeOut",
    repeatable: true,
    reversible: true,
    interruptible: true,
    parameters: [
      {
        name: "fromScale",
        type: "number",
        description: "Starting scale.",
        required: false,
      },
      {
        name: "toScale",
        type: "number",
        description: "Ending scale.",
        required: false,
      },
      {
        name: "intensity",
        type: "number",
        description: "Relative radiating intensity.",
        required: false,
      },
      {
        name: "pulse",
        type: "boolean",
        description: "Whether the radiating effect pulses.",
        required: false,
      },
    ],
    defaults: {
      fromScale: 0.98,
      toScale: 1.04,
      intensity: 1,
      pulse: true,
    },
  },

  DRIFT: {
    id: "DRIFT",
    name: "Drift",
    description:
      "Produces slow, lightweight movement with small directional variations and no rigid path requirement.",
    category: "environmental",
    defaultDurationMs: 5000,
    defaultEasing: "natural",
    repeatable: true,
    reversible: true,
    interruptible: true,
    parameters: [
      {
        name: "distanceX",
        type: "number",
        description: "Horizontal drift distance.",
        required: false,
      },
      {
        name: "distanceY",
        type: "number",
        description: "Vertical drift distance.",
        required: false,
      },
      {
        name: "variance",
        type: "number",
        description: "Movement variation.",
        required: false,
      },
      {
        name: "speed",
        type: "number",
        description: "Relative drift speed.",
        required: false,
      },
    ],
    defaults: {
      distanceX: 20,
      distanceY: -12,
      variance: 0.35,
      speed: 1,
    },
  },

  ORBIT: {
    id: "ORBIT",
    name: "Orbit",
    description:
      "Moves an object around a defined origin using angular motion and configurable radius.",
    category: "path",
    defaultDurationMs: 5000,
    defaultEasing: "linear",
    repeatable: true,
    reversible: true,
    interruptible: true,
    parameters: [
      {
        name: "radiusX",
        type: "number",
        description: "Horizontal orbit radius.",
        required: false,
      },
      {
        name: "radiusY",
        type: "number",
        description: "Vertical orbit radius.",
        required: false,
      },
      {
        name: "degrees",
        type: "number",
        description: "Total angular travel.",
        required: false,
      },
      {
        name: "direction",
        type: "string",
        description: "Clockwise or counter-clockwise direction.",
        required: false,
      },
      {
        name: "cycles",
        type: "number",
        description: "Number of completed orbit cycles.",
        required: false,
      },
    ],
    defaults: {
      radiusX: 20,
      radiusY: 10,
      degrees: 360,
      direction: "clockwise",
      cycles: 1,
    },
  },

  TRAVEL: {
    id: "TRAVEL",
    name: "Travel",
    description:
      "Moves an object intentionally from one spatial state to another without assuming a specific visual style.",
    category: "movement",
    defaultDurationMs: 3000,
    defaultEasing: "easeInOut",
    repeatable: true,
    reversible: true,
    interruptible: true,
    parameters: [
      {
        name: "distanceX",
        type: "number",
        description: "Horizontal travel distance.",
        required: false,
      },
      {
        name: "distanceY",
        type: "number",
        description: "Vertical travel distance.",
        required: false,
      },
      {
        name: "rotation",
        type: "number",
        description: "Optional rotation during travel.",
        required: false,
      },
      {
        name: "speed",
        type: "number",
        description: "Relative travel speed.",
        required: false,
      },
    ],
    defaults: {
      distanceX: 100,
      distanceY: 0,
      rotation: 0,
      speed: 1,
    },
  },

  REVEAL: {
    id: "REVEAL",
    name: "Reveal",
    description:
      "Introduces an object progressively through visibility, opacity, scale, or directional entry.",
    category: "reveal",
    defaultDurationMs: 1200,
    defaultEasing: "easeOut",
    repeatable: true,
    reversible: true,
    interruptible: true,
    parameters: [
      {
        name: "fromOpacity",
        type: "number",
        description: "Starting opacity.",
        required: false,
      },
      {
        name: "toOpacity",
        type: "number",
        description: "Ending opacity.",
        required: false,
      },
      {
        name: "offsetX",
        type: "number",
        description: "Optional horizontal reveal offset.",
        required: false,
      },
      {
        name: "offsetY",
        type: "number",
        description: "Optional vertical reveal offset.",
        required: false,
      },
      {
        name: "fromScale",
        type: "number",
        description: "Optional starting scale.",
        required: false,
      },
    ],
    defaults: {
      fromOpacity: 0,
      toOpacity: 1,
      offsetX: 0,
      offsetY: 20,
      fromScale: 0.98,
    },
  },
} satisfies Record<MotionId, MotionDefinition>;

export const registeredMotionDefinitions: readonly MotionDefinition[] =
  Object.values(motionDefinitions);