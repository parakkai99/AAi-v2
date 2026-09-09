/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.23 — Object Registry
 * Status: ACTIVE
 * Version: 1.0.0
 */

import type {
  AnimationObject,
  AnimationObjectId,
} from "./AnimationObject";

export class ObjectRegistry {
  private readonly objects = new Map<AnimationObjectId, AnimationObject>();

  register(object: AnimationObject): void {
    if (this.objects.has(object.id)) {
      throw new Error(
        `Animation object "${object.id}" is already registered.`,
      );
    }

    this.objects.set(object.id, object);
  }

  registerMany(objects: readonly AnimationObject[]): void {
    for (const object of objects) {
      this.register(object);
    }
  }

  get(id: AnimationObjectId): AnimationObject | undefined {
    return this.objects.get(id);
  }

  has(id: AnimationObjectId): boolean {
    return this.objects.has(id);
  }

  getAll(): AnimationObject[] {
    return Array.from(this.objects.values());
  }

  getEnabled(): AnimationObject[] {
    return this.getAll().filter((object) => object.enabled);
  }

  clear(): void {
    this.objects.clear();
  }

  get size(): number {
    return this.objects.size;
  }
}