/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.27 — Universal Animation Target Group
 * Status: ACTIVE
 * Version: 2.0.0
 */

import type { AnimationObjectId } from "../objects/AnimationObject";
import type { AnimationTarget } from "./AnimationTarget";

export interface AnimationTargetGroup {
  readonly objectId: AnimationObjectId;
  readonly targets: readonly AnimationTarget[];
}

export function createAnimationTargetGroup(
  objectId: AnimationObjectId,
  targets: readonly AnimationTarget[],
): AnimationTargetGroup {
  return {
    objectId,
    targets: [...targets],
  };
}
