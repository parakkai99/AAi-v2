/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.24 — Motion Registry
 * Status: ACTIVE
 * Version: 1.0.0
 */

import type {
  MotionCategory,
  MotionDefinition,
  MotionId,
} from "./MotionDefinition";

export class MotionRegistry {
  private readonly motions = new Map<MotionId, MotionDefinition>();

  register(motion: MotionDefinition): void {
    if (this.motions.has(motion.id)) {
      throw new Error(
        `Motion "${motion.id}" is already registered.`,
      );
    }

    this.motions.set(motion.id, motion);
  }

  registerMany(
    motions: readonly MotionDefinition[],
  ): void {
    for (const motion of motions) {
      this.register(motion);
    }
  }

  get(id: MotionId): MotionDefinition | undefined {
    return this.motions.get(id);
  }

  has(id: MotionId): boolean {
    return this.motions.has(id);
  }

  getAll(): MotionDefinition[] {
    return Array.from(this.motions.values());
  }

  getByCategory(
    category: MotionCategory,
  ): MotionDefinition[] {
    return this.getAll().filter(
      (motion) => motion.category === category,
    );
  }

  clear(): void {
    this.motions.clear();
  }

  get size(): number {
    return this.motions.size;
  }
}