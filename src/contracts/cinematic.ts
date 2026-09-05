/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Contract: AAI-CONTRACT-020
 * Name: Cinematic Navigation Experience Contract
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * Purpose:
 * Canonical boundary for the AAi Spatial Navigation Engine.
 * Implements session-based, configurable, multi-layer (L1 -> L6) spatial transitions.
 *
 * Principle:
 * "User must FEEL navigation, not see a simple content replacement."
 * "I am travelling through the ArchitectAny Solution Universe."
 *
 * Three-Stage Experience:
 * 1. BEFORE   - "I am here" (Target lock, coordinate calculation, trajectory computation)
 * 2. DURING   - "I am travelling" (Spatial warp, cosmic velocity, starfield streak, HUD telemetry)
 * 3. AFTER    - "I have arrived" (Deceleration, beacon activation, smooth settling of target layer)
 */

export type CinematicStage = 'idle' | 'before' | 'travelling' | 'after';

export type CinematicDirection = 'descend' | 'ascend' | 'lateral';

export type GalaxyMood = 'CALM' | 'VIBRANT' | 'ENERGETIC' | 'MYSTIC' | 'TECH' | 'AURORA';
export type CinematicMood = GalaxyMood | 'cyber-cosmic' | 'deep-space-neon' | 'quantum-gold' | 'calm-astral';

export type TransitionStyle =
  | 'STAR_TRAIL_VOYAGE'
  | 'WORMHOLE_TRANSIT'
  | 'NEBULA_DRIFT'
  | 'GALACTIC_ORBIT'
  | 'HYPER_JUMP_FLASH'
  | 'CONSTELLATION_PATH';
export type CinematicStyle = TransitionStyle | 'domain-dive' | 'hyperspace-warp' | 'quantum-tunnel' | 'spatial-pan';

export type CinematicSpeed = 'cinematic' | 'swift' | 'instant';

export type CatalogLayerNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Intent Core

export type JourneyScale =
  | 'L1_TO_L2_UNIVERSE_DIVE'
  | 'L2_TO_L3_GALAXY_APPROACH'
  | 'L3_TO_L4_STAR_SYSTEM_ORBIT'
  | 'L4_TO_L5_PLANET_TO_CITY'
  | 'L5_TO_L6_CITY_TO_CONTROL_CENTER'
  | 'UNIVERSE_TO_INTENT_CORE'
  | 'INTENT_CORE_TO_UNIVERSE'
  | 'INTENT_CORE_TO_DOMAIN'
  | 'REVERSE_L6_TO_L5_CONTROL_TO_CITY'
  | 'REVERSE_L5_TO_L4_CITY_TO_PLANET'
  | 'REVERSE_L4_TO_L3_PLANET_TO_SYSTEM'
  | 'REVERSE_L3_TO_L2_SYSTEM_TO_GALAXY'
  | 'REVERSE_L2_TO_L1_GALAXY_TO_UNIVERSE'
  | 'SAME_LAYER_LATERAL';

export interface SpatialCoordinates {
  x: number;
  y: number;
  z: number;
  sector: string;
}

export interface CinematicWaypoint {
  layer: CatalogLayerNumber;
  layerLabel: string;
  id: string;
  name: string;
  code?: string;
  color?: string;
  coordinates: SpatialCoordinates;
  description?: string;
}

export interface CinematicFlightMetrics {
  velocity: string;
  distanceLy: string;
  warpFactor: number;
  headingAngle: number;
  estimatedFlightMs: number;
}

export interface CinematicJourney {
  id: string;
  origin: CinematicWaypoint;
  destination: CinematicWaypoint;
  direction: CinematicDirection;
  scale: JourneyScale;
  stage: CinematicStage;
  progress: number; // 0 to 100
  metrics: CinematicFlightMetrics;
  startedAt: number;
}

export interface CinematicConfig {
  enabled: boolean;
  mood: GalaxyMood;
  style: TransitionStyle;
  speed: CinematicSpeed;
  soundEnabled: boolean;
  showTelemetryHUD: boolean;
  allowSkip: boolean;
  particlesIntensity?: 'low' | 'medium' | 'high';
}

/**
 * Resolves the distinctive spatial journey scale from origin and destination waypoints.
 * Never defaults to a generic starfield - every scale transition has a unique visual signature.
 */
export function resolveJourneyScale(
  origin: CinematicWaypoint,
  destination: CinematicWaypoint
): JourneyScale {
  const from = origin.layer;
  const to = destination.layer;

  // Intent Core Transitions
  if (to === 0 || destination.id === 'INTENT-CORE') {
    return 'UNIVERSE_TO_INTENT_CORE';
  }
  if (from === 0 || origin.id === 'INTENT-CORE') {
    if (to >= 2) return 'INTENT_CORE_TO_DOMAIN';
    return 'INTENT_CORE_TO_UNIVERSE';
  }

  // Forward Descending Spatial Scales
  if (from === 1 && to === 2) return 'L1_TO_L2_UNIVERSE_DIVE';
  if (from === 2 && to === 3) return 'L2_TO_L3_GALAXY_APPROACH';
  if (from === 3 && to === 4) return 'L3_TO_L4_STAR_SYSTEM_ORBIT';
  if (from === 4 && to === 5) return 'L4_TO_L5_PLANET_TO_CITY';
  if (from === 5 && to === 6) return 'L5_TO_L6_CITY_TO_CONTROL_CENTER';

  // Multi-layer forward jumps
  if (from < to) {
    if (to === 5 || to === 6) return 'L4_TO_L5_PLANET_TO_CITY';
    if (to === 4) return 'L3_TO_L4_STAR_SYSTEM_ORBIT';
    if (to === 3) return 'L2_TO_L3_GALAXY_APPROACH';
    return 'L1_TO_L2_UNIVERSE_DIVE';
  }

  // Backward Ascending Spatial Scales (Reverse camera / scale expansion)
  if (from === 6 && to === 5) return 'REVERSE_L6_TO_L5_CONTROL_TO_CITY';
  if (from === 5 && to === 4) return 'REVERSE_L5_TO_L4_CITY_TO_PLANET';
  if (from === 4 && to === 3) return 'REVERSE_L4_TO_L3_PLANET_TO_SYSTEM';
  if (from === 3 && to === 2) return 'REVERSE_L3_TO_L2_SYSTEM_TO_GALAXY';
  if (from === 2 && to === 1) return 'REVERSE_L2_TO_L1_GALAXY_TO_UNIVERSE';

  // Multi-layer backward jumps
  if (from > to) {
    if (to === 1) return 'REVERSE_L2_TO_L1_GALAXY_TO_UNIVERSE';
    if (to === 2) return 'REVERSE_L3_TO_L2_SYSTEM_TO_GALAXY';
    if (to === 3) return 'REVERSE_L4_TO_L3_PLANET_TO_SYSTEM';
    if (to === 4) return 'REVERSE_L5_TO_L4_CITY_TO_PLANET';
    return 'REVERSE_L6_TO_L5_CONTROL_TO_CITY';
  }

  return 'SAME_LAYER_LATERAL';
}

export interface CinematicEngineState {
  config: CinematicConfig;
  journey: CinematicJourney | null;
  stage: CinematicStage;
  isTravelling: boolean;
}

export interface ICinematicEngine {
  getConfig(): CinematicConfig;
  updateConfig(partial: Partial<CinematicConfig>): void;
  startJourney(
    origin: CinematicWaypoint,
    destination: CinematicWaypoint,
    onArrived?: () => void
  ): void;
  skipJourney(): void;
  cancelJourney(): void;
}
