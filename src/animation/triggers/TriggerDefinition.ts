/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.25 — Trigger Registry
 * Status: ACTIVE
 * Version: 1.0.0
 */

export type TriggerId =
  | "fixed"
  | "time"
  | "event"
  | "manual"
  | "sequence"
  | "loop";

export type TriggerCategory =
  | "schedule"
  | "event"
  | "interaction"
  | "composition";

export type TriggerParameterType =
  | "number"
  | "string"
  | "boolean";

export type TriggerParameterValue = number | string | boolean;

export type TriggerParameters = Readonly<
  Record<string, TriggerParameterValue>
>;

export interface TriggerParameterDefinition {
  readonly name: string;
  readonly type: TriggerParameterType;
  readonly description: string;
  readonly required: boolean;
}

export interface TriggerDefinition {
  readonly id: TriggerId;
  readonly name: string;
  readonly description: string;
  readonly category: TriggerCategory;

  readonly repeatable: boolean;
  readonly interruptible: boolean;

  readonly parameters: readonly TriggerParameterDefinition[];
  readonly defaults: TriggerParameters;
}