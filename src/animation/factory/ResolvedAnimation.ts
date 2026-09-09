/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.26 — Animation Factory
 * Status: ACTIVE
 * Version: 1.0.0
 */

import type {
  AnimationObject,
} from "../objects/AnimationObject";

import type {
  MotionDefinition,
  MotionParameters,
} from "../motion/MotionDefinition";

import type {
  TriggerDefinition,
  TriggerParameters,
} from "../triggers/TriggerDefinition";

export interface ResolvedAnimation {
  readonly object: AnimationObject;
  readonly motion: MotionDefinition;
  readonly trigger: TriggerDefinition;

  readonly motionParameters: MotionParameters;
  readonly triggerParameters: TriggerParameters;

  readonly enabled: boolean;
}