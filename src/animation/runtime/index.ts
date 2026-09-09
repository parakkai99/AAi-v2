/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.27 — Animation Runtime Bootstrap
 * Status: ACTIVE
 * Version: 2.1.0
 *
 * Responsibilities:
 * - Re-export the universal animation runtime surface.
 * - Build the existing Object/Motion/Trigger registries from canonical definitions.
 * - Discover one or many DOM targets for each animation object.
 * - Support explicit target ids for multi-part visual objects.
 * - Preserve compatibility with the earlier data-aa-animation-object marker.
 *
 * No network/API boundary is involved.
 */

import type { AnimationObjectId } from "../objects/AnimationObject";
import { objectDefinitions } from "../objects/ObjectDefinitions";
import { ObjectRegistry } from "../objects/ObjectRegistry";
import { registeredMotionDefinitions } from "../motion/MotionDefinitions";
import { MotionRegistry } from "../motion/MotionRegistry";
import { registeredTriggerDefinitions } from "../triggers/TriggerDefinitions";
import { TriggerRegistry } from "../triggers/TriggerRegistry";
import { AnimationFactory } from "../factory";
import { AnimationRuntime } from "./AnimationRuntime";
import { AnimationTargetRegistry } from "./AnimationTargetRegistry";

export * from "./AnimationTarget";
export * from "./AnimationTargetGroup";
export * from "./AnimationTargetRegistry";
export * from "./AnimationRuntime";

const OBJECT_SELECTOR = [
  "[data-animation-object-id]",
  "[data-aa-animation-object]",
].join(",");

function createUniqueTargetId(
  targets: AnimationTargetRegistry,
  objectId: AnimationObjectId,
  preferred: string,
): string {
  if (!targets.hasTarget(objectId, preferred)) {
    return preferred;
  }

  let index = 2;
  while (targets.hasTarget(objectId, `${preferred}-${index}`)) {
    index += 1;
  }

  return `${preferred}-${index}`;
}

export interface AnimationRuntimeBootstrap {
  readonly runtime: AnimationRuntime;
  readonly targets: AnimationTargetRegistry;
  readonly factory: AnimationFactory;
}

export function createAnimationRuntime(root: ParentNode): AnimationRuntimeBootstrap {
  const objectRegistry = new ObjectRegistry();
  objectRegistry.registerMany(objectDefinitions);

  const motionRegistry = new MotionRegistry();
  motionRegistry.registerMany(registeredMotionDefinitions);

  const triggerRegistry = new TriggerRegistry();
  triggerRegistry.registerMany(registeredTriggerDefinitions);

  const factory = new AnimationFactory({
    objectRegistry,
    motionRegistry,
    triggerRegistry,
  });

  const targets = new AnimationTargetRegistry();

  for (const element of root.querySelectorAll<Element>(OBJECT_SELECTOR)) {
    const objectIdValue =
      element.getAttribute("data-animation-object-id") ??
      element.getAttribute("data-aa-animation-object");

    if (!objectIdValue) {
      continue;
    }

    const objectId = objectIdValue as AnimationObjectId;
    const requestedTargetId =
      element.getAttribute("data-animation-target-id") ??
      element.getAttribute("data-aa-animation-target") ??
      "default";

    const targetId = createUniqueTargetId(
      targets,
      objectId,
      requestedTargetId,
    );

    targets.register(objectId, element, targetId);
  }

  const runtime = new AnimationRuntime({
    factory,
    targets,
  });

  return {
    runtime,
    targets,
    factory,
  };
}
