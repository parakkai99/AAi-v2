/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.27 — Universal Animation Target Registry
 * Status: ACTIVE
 * Version: 2.0.0
 *
 * Backward compatibility:
 *   register(objectId, element)
 * remains valid and registers a default target.
 *
 * Production capability:
 *   register(objectId, element, "leftWing")
 *   register(objectId, element, "rightWing")
 * allows one object to own many independently addressable surfaces.
 */

import type { AnimationObjectId } from "../objects/AnimationObject";
import type { AnimationTarget } from "./AnimationTarget";
import { createAnimationTarget } from "./AnimationTarget";

const DEFAULT_TARGET_ID = "default";

type TargetInput = Element | AnimationTarget;

type TargetCollectionInput =
  | ReadonlyMap<AnimationObjectId, Element>
  | ReadonlyMap<AnimationObjectId, readonly Element[]>
  | ReadonlyMap<AnimationObjectId, readonly AnimationTarget[]>;

export class AnimationTargetRegistry {
  private readonly targets = new Map<
    AnimationObjectId,
    Map<string, AnimationTarget>
  >();

  register(
    objectId: AnimationObjectId,
    target: TargetInput,
    targetId = DEFAULT_TARGET_ID,
  ): void {
    const collection = this.targets.get(objectId) ?? new Map<string, AnimationTarget>();

    if (collection.has(targetId)) {
      throw new Error(
        `Animation target "${objectId}.${targetId}" is already registered.`,
      );
    }

    const normalized =
      "element" in target
        ? target
        : createAnimationTarget(targetId, target);

    collection.set(targetId, normalized);
    this.targets.set(objectId, collection);
  }

  registerMany(targets: TargetCollectionInput): void {
    for (const [objectId, value] of targets) {
      if (!Array.isArray(value)) {
        this.register(objectId, value as Element | AnimationTarget);
        continue;
      }

      const collection = value as readonly (Element | AnimationTarget)[];
      let index = 0;
      for (const target of collection) {
        const targetId =
          "element" in target
            ? target.id
            : index === 0
              ? DEFAULT_TARGET_ID
              : `target-${index + 1}`;
        this.register(objectId, target, targetId);
        index += 1;
      }
    }
  }

  get(objectId: AnimationObjectId): Element | undefined {
    const collection = this.targets.get(objectId);
    if (!collection) {
      return undefined;
    }

    return collection.get(DEFAULT_TARGET_ID)?.element ?? collection.values().next().value?.element;
  }

  getTarget(
    objectId: AnimationObjectId,
    targetId: string,
  ): Element | undefined {
    return this.targets.get(objectId)?.get(targetId)?.element;
  }

  getTargets(objectId: AnimationObjectId): readonly AnimationTarget[] {
    return Array.from(this.targets.get(objectId)?.values() ?? []);
  }

  getElements(
    objectId: AnimationObjectId,
    targetIds?: readonly string[],
  ): readonly Element[] {
    const collection = this.targets.get(objectId);
    if (!collection) {
      return [];
    }

    if (!targetIds || targetIds.length === 0) {
      return Array.from(collection.values()).filter((target) => target.enabled).map((target) => target.element);
    }

    return targetIds
      .map((targetId) => collection.get(targetId))
      .filter((target): target is AnimationTarget => Boolean(target?.enabled))
      .map((target) => target.element);
  }

  has(objectId: AnimationObjectId): boolean {
    return (this.targets.get(objectId)?.size ?? 0) > 0;
  }

  hasTarget(objectId: AnimationObjectId, targetId: string): boolean {
    return this.targets.get(objectId)?.has(targetId) ?? false;
  }

  remove(objectId: AnimationObjectId, targetId?: string): void {
    if (targetId === undefined) {
      this.targets.delete(objectId);
      return;
    }

    const collection = this.targets.get(objectId);
    if (!collection) {
      return;
    }

    collection.delete(targetId);
    if (collection.size === 0) {
      this.targets.delete(objectId);
    }
  }

  clear(): void {
    this.targets.clear();
  }

  getAllIds(): AnimationObjectId[] {
    return Array.from(this.targets.keys());
  }

  getTargetIds(objectId: AnimationObjectId): string[] {
    return Array.from(this.targets.get(objectId)?.keys() ?? []);
  }

  get size(): number {
    return this.targets.size;
  }

  get targetCount(): number {
    let count = 0;
    for (const collection of this.targets.values()) {
      count += collection.size;
    }
    return count;
  }
}
