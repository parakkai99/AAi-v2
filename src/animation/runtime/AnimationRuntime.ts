/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.27 — Universal Multi-Target Animation Runtime
 * Status: ACTIVE
 * Version: 2.0.0
 *
 * Responsibilities:
 * - Resolve animation requests through the existing factory.
 * - Resolve one object to one, many, or selected targets.
 * - Execute the same motion against all selected targets.
 * - Preserve the existing start/startMany API for current consumers.
 * - Provide restart/update-friendly methods for the internal developer panel.
 *
 * No network/API boundary is involved.
 */

import type { AnimationObjectId } from "../objects/AnimationObject";
import type { MotionParameters } from "../motion/MotionDefinition";
import type { TriggerParameters } from "../triggers/TriggerDefinition";
import type {
  AnimationRequest,
  ResolvedAnimation,
} from "../factory";
import { AnimationFactory } from "../factory";
import { MotionExecutor } from "./MotionExecutor";
import { TriggerExecutor } from "./TriggerExecutor";
import { AnimationTargetRegistry } from "./AnimationTargetRegistry";

export interface AnimationRuntimeRequest extends AnimationRequest {
  /** Optional subset of an object's registered target ids. Empty/omitted = all. */
  readonly targetIds?: readonly string[];
}

export interface AnimationRuntimeDependencies {
  readonly factory: AnimationFactory;
  readonly targets: AnimationTargetRegistry;
}

export class AnimationRuntime {
  private readonly factory: AnimationFactory;
  private readonly targets: AnimationTargetRegistry;

  private readonly motionExecutor = new MotionExecutor();
  private readonly triggerExecutor = new TriggerExecutor();

  constructor(dependencies: AnimationRuntimeDependencies) {
    this.factory = dependencies.factory;
    this.targets = dependencies.targets;
  }

  start(request: AnimationRequest | AnimationRuntimeRequest): void {
    const resolved = this.factory.create(request);
    this.startResolved(resolved, (request as AnimationRuntimeRequest).targetIds);
  }

  startMany(
    requests: readonly (AnimationRequest | AnimationRuntimeRequest)[],
  ): void {
    for (const request of requests) {
      this.start(request);
    }
  }

  startResolved(
    resolved: ResolvedAnimation,
    targetIds?: readonly string[],
  ): void {
    if (!resolved.enabled) {
      return;
    }

    const targets = this.targets.getElements(resolved.object.id, targetIds);

    if (targets.length === 0) {
      throw new Error(
        `No animation target registered for "${resolved.object.id}"${
          targetIds?.length ? ` [${targetIds.join(", ")}]` : ""
        }.`,
      );
    }

    this.triggerExecutor.execute(
      resolved.trigger,
      resolved.triggerParameters,
      {
        execute: () => {
          for (const target of targets) {
            this.motionExecutor.execute(
              target,
              resolved.motion,
              resolved.motionParameters,
            );
          }
        },
        resolveSequence: async () => undefined,
      },
    );
  }

  restart(
    request: AnimationRequest | AnimationRuntimeRequest,
  ): void {
    this.stop(request.objectId);
    this.start(request);
  }

  update(
    request: AnimationRuntimeRequest,
    patch: {
      readonly motionId?: AnimationRequest["motionId"];
      readonly motionParameters?: MotionParameters;
      readonly triggerParameters?: TriggerParameters;
      readonly targetIds?: readonly string[];
    } = {},
  ): void {
    this.stop(request.objectId);

    this.start({
      ...request,
      ...(patch.motionId ? { motionId: patch.motionId } : {}),
      ...(patch.motionParameters
        ? { motionParameters: patch.motionParameters }
        : {}),
      ...(patch.triggerParameters
        ? { triggerParameters: patch.triggerParameters }
        : {}),
      ...(patch.targetIds ? { targetIds: patch.targetIds } : {}),
    });
  }

  stop(objectId: AnimationObjectId): void {
    for (const target of this.targets.getTargets(objectId)) {
      for (const animation of target.element.getAnimations()) {
        animation.cancel();
      }
    }
  }

  stopTarget(objectId: AnimationObjectId, targetId: string): void {
    const target = this.targets.getTarget(objectId, targetId);
    if (!target) {
      return;
    }

    for (const animation of target.getAnimations()) {
      animation.cancel();
    }
  }

  stopAll(): void {
    for (const objectId of this.targets.getAllIds()) {
      this.stop(objectId);
    }
  }

  getTargetIds(objectId: AnimationObjectId): string[] {
    return this.targets.getTargetIds(objectId);
  }

  getTargetCount(objectId: AnimationObjectId): number {
    return this.targets.getTargets(objectId).length;
  }
}
