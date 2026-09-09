 /**
  * Architect: Vijay Kumar K.
  * Platform: ArchitectAny (AAi)
  * Contract: P1.27 — Animation Runtime
  * Status: ACTIVE
  * Version: 1.0.0
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
      `[data-aa-animation-object="${object.id}"]`;

    const target =
      root.matches(selector)
        ? root
        : root.querySelector(selector);

    if (target) {
      targets.register(
        object.id,
        target,
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