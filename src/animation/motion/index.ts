/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.24 — Motion Registry
 * Status: ACTIVE
 * Version: 1.0.0
 */

export type {
  MotionCategory,
  MotionDefinition,
  MotionEasing,
  MotionId,
  MotionParameterDefinition,
  MotionParameterType,
  MotionParameterValue,
  MotionParameters,
} from "./MotionDefinition";

export {
  motionDefinitions,
  registeredMotionDefinitions,
} from "./MotionDefinitions";

export { MotionRegistry } from "./MotionRegistry";