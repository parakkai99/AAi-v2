/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.24 — Motion Registry
 * Status: ACTIVE
 * Version: 1.0.0
 */

export type MotionId =
  | "BLOOM"
  | "FLIGHT"
  | "SWAY"
  | "FLOW"
  | "RISE"
  | "RADIATE"
  | "DRIFT"
  | "ORBIT"
  | "TRAVEL"
  | "REVEAL";

export type MotionCategory =
  | "appearance"
  | "environmental"
  | "movement"
  | "transform"
  | "path"
  | "reveal";

export type MotionEasing =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "smooth"
  | "natural";

export type MotionParameterType =
  | "number"
  | "string"
  | "boolean";

export interface MotionParameterDefinition {
  readonly name: string;
  readonly type: MotionParameterType;
  readonly description: string;
  readonly required: boolean;
}

export type MotionParameterValue = number | string | boolean;

export type MotionParameters = Readonly<
  Record<string, MotionParameterValue>
>;

export interface MotionDefinition {
  readonly id: MotionId;
  readonly name: string;
  readonly description: string;
  readonly category: MotionCategory;

  readonly defaultDurationMs: number;
  readonly defaultEasing: MotionEasing;

  readonly repeatable: boolean;
  readonly reversible: boolean;
  readonly interruptible: boolean;

  readonly parameters: readonly MotionParameterDefinition[];
  readonly defaults: MotionParameters;
}