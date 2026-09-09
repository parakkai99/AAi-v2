/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.27 — Animation Runtime
 * Status: ACTIVE
 * Version: 1.1.0
 */

import {
  objectDefinitions,
} from "../objects/ObjectDefinitions";

import {
  ObjectRegistry,
} from "../objects/ObjectRegistry";

import {
  registeredMotionDefinitions,
} from "../motion/MotionDefinitions";

import {
  MotionRegistry,
} from "../motion/MotionRegistry";

import {
  registeredTriggerDefinitions,
} from "../triggers/TriggerDefinitions";

import {
  TriggerRegistry,
} from "../triggers/TriggerRegistry";

import {
  AnimationFactory,
} from "../factory/AnimationFactory";

import {
  AnimationTargetRegistry,
} from "./AnimationTargetRegistry";

import {
  AnimationRuntime,
} from "./AnimationRuntime";

export interface AnimationRuntimeBootstrap {
  readonly runtime: AnimationRuntime;
  readonly targets: AnimationTargetRegistry;
  readonly factory: AnimationFactory;
  readonly objectRegistry: ObjectRegistry;
  readonly motionRegistry: MotionRegistry;
  readonly triggerRegistry: TriggerRegistry;
}

function registerDomTargets(
  root: HTMLElement,
  targets: AnimationTargetRegistry,
): void {
  for (const object of objectDefinitions) {
    const selector =
      `[data-animation-object-id="${object.id}"]`;

    const elements = root.matches(selector)
      ? [root]
      : Array.from(root.querySelectorAll(selector));

    for (const element of elements) {
      const targetId =
        element.getAttribute("data-animation-target-id") ?? "default";

      if (targets.hasTarget(object.id, targetId)) {
        continue;
      }

      targets.register(
        object.id,
        element,
        targetId,
      );
    }
  }
}

export function createAnimationRuntime(
  root: HTMLElement,
): AnimationRuntimeBootstrap {
  const objectRegistry =
    new ObjectRegistry();

  objectRegistry.registerMany(
    objectDefinitions,
  );

  const motionRegistry =
    new MotionRegistry();

  motionRegistry.registerMany(
    registeredMotionDefinitions,
  );

  const triggerRegistry =
    new TriggerRegistry();

  triggerRegistry.registerMany(
    registeredTriggerDefinitions,
  );

  const factory =
    new AnimationFactory({
      objectRegistry,
      motionRegistry,
      triggerRegistry,
    });

  const targets =
    new AnimationTargetRegistry();

  registerDomTargets(
    root,
    targets,
  );

  const runtime =
    new AnimationRuntime({
      factory,
      targets,
    });

  return {
    runtime,
    targets,
    factory,
    objectRegistry,
    motionRegistry,
    triggerRegistry,
  };
}

/*
 * CONTRACT
 * ID: P1.27 — Universal Animation Runtime Bootstrap
 * STATUS: ACTIVE
 * VERSION: 1.1.0
 *
 * Purpose:
 * - Build the local object/motion/trigger registries.
 * - Create the Animation Factory.
 * - Discover scene targets from the existing DOM contract.
 * - Preserve multi-target object addressing.
 * - Keep internal animation execution local; no network/API boundary.
 *
 * Target contract:
 * data-animation-object-id="OBJ-XX"
 * data-animation-target-id="target-name"
 */
