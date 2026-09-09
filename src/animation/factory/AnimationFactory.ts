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

import {
  ObjectRegistry,
} from "../objects/ObjectRegistry";

import type {
  MotionId,
  MotionParameters,
} from "../motion/MotionDefinition";

import {
  MotionRegistry,
} from "../motion/MotionRegistry";

import type {
  TriggerId,
  TriggerParameters,
} from "../triggers/TriggerDefinition";

import {
  TriggerRegistry,
} from "../triggers/TriggerRegistry";

import type {
  AnimationRequest,
} from "./AnimationRequest";

import type {
  ResolvedAnimation,
} from "./ResolvedAnimation";

export interface AnimationFactoryDependencies {
  readonly objectRegistry: ObjectRegistry;
  readonly motionRegistry: MotionRegistry;
  readonly triggerRegistry: TriggerRegistry;
}

export class AnimationFactory {
  private readonly objectRegistry: ObjectRegistry;
  private readonly motionRegistry: MotionRegistry;
  private readonly triggerRegistry: TriggerRegistry;

  constructor(
    dependencies: AnimationFactoryDependencies,
  ) {
    this.objectRegistry = dependencies.objectRegistry;
    this.motionRegistry = dependencies.motionRegistry;
    this.triggerRegistry = dependencies.triggerRegistry;
  }

  create(
    request: AnimationRequest,
  ): ResolvedAnimation {
    const object = this.objectRegistry.get(request.objectId);
    const motion = this.motionRegistry.get(request.motionId);
    const trigger = this.triggerRegistry.get(request.triggerId);

    if (!object) {
      throw new Error(
        `Animation object "${request.objectId}" is not registered.`,
      );
    }

    if (!object.enabled) {
      throw new Error(
        `Animation object "${request.objectId}" is disabled.`,
      );
    }

    if (!motion) {
      throw new Error(
        `Motion "${request.motionId}" is not registered.`,
      );
    }

    if (!trigger) {
      throw new Error(
        `Trigger "${request.triggerId}" is not registered.`,
      );
    }

    const motionParameters =
      this.mergeParameters(
        motion.defaults,
        request.motionParameters,
      );

    const triggerParameters =
      this.mergeParameters(
        trigger.defaults,
        request.triggerParameters,
      );

    return {
      object,
      motion,
      trigger,
      motionParameters,
      triggerParameters,
      enabled: request.enabled ?? true,
    };
  }

  createMany(
    requests: readonly AnimationRequest[],
  ): ResolvedAnimation[] {
    return requests.map((request) =>
      this.create(request),
    );
  }

  canCreate(
    request: AnimationRequest,
  ): boolean {
    const object = this.objectRegistry.get(
      request.objectId,
    );

    const motion = this.motionRegistry.get(
      request.motionId,
    );

    const trigger = this.triggerRegistry.get(
      request.triggerId,
    );

    return Boolean(
      object?.enabled &&
      motion &&
      trigger,
    );
  }

  hasObject(
    objectId: AnimationObjectId,
  ): boolean {
    return this.objectRegistry.has(objectId);
  }

  hasMotion(
    motionId: MotionId,
  ): boolean {
    return this.motionRegistry.has(motionId);
  }

  hasTrigger(
    triggerId: TriggerId,
  ): boolean {
    return this.triggerRegistry.has(triggerId);
  }

  private mergeParameters(
    defaults: MotionParameters | TriggerParameters,
    overrides:
      | MotionParameters
      | TriggerParameters
      | undefined,
  ): MotionParameters {
    return {
      ...defaults,
      ...(overrides ?? {}),
    };
  }
}