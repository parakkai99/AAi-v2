/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.25 — Trigger Registry
 * Status: ACTIVE
 * Version: 1.0.0
 */

import type {
  TriggerCategory,
  TriggerDefinition,
  TriggerId,
} from "./TriggerDefinition";

export class TriggerRegistry {
  private readonly triggers = new Map<
    TriggerId,
    TriggerDefinition
  >();

  register(trigger: TriggerDefinition): void {
    if (this.triggers.has(trigger.id)) {
      throw new Error(
        `Trigger "${trigger.id}" is already registered.`,
      );
    }

    this.triggers.set(trigger.id, trigger);
  }

  registerMany(
    triggers: readonly TriggerDefinition[],
  ): void {
    for (const trigger of triggers) {
      this.register(trigger);
    }
  }

  get(id: TriggerId): TriggerDefinition | undefined {
    return this.triggers.get(id);
  }

  has(id: TriggerId): boolean {
    return this.triggers.has(id);
  }

  getAll(): TriggerDefinition[] {
    return Array.from(this.triggers.values());
  }

  getByCategory(
    category: TriggerCategory,
  ): TriggerDefinition[] {
    return this.getAll().filter(
      (trigger) => trigger.category === category,
    );
  }

  getRepeatable(): TriggerDefinition[] {
    return this.getAll().filter(
      (trigger) => trigger.repeatable,
    );
  }

  clear(): void {
    this.triggers.clear();
  }

  get size(): number {
    return this.triggers.size;
  }
}