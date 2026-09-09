/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.26 — Animation Factory
 * Status: ACTIVE
 * Version: 1.0.0
 */

import type {
  AnimationObjectId,
} from "../objects/AnimationObject";

import type {
  MotionId,
  MotionParameters,
} from "../motion/MotionDefinition";

import type {
  TriggerId,
  TriggerParameters,
} from "../triggers/TriggerDefinition";

export interface AnimationRequest {
  readonly objectId: AnimationObjectId;
  readonly motionId: MotionId;
  readonly triggerId: TriggerId;

  readonly motionParameters?: MotionParameters;
  readonly triggerParameters?: TriggerParameters;

  readonly enabled?: boolean;
}