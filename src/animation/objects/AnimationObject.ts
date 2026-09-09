/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: P1.23 — Object Registry
 * Status: ACTIVE
 * Version: 1.0.0
 */

export type AnimationObjectId =
  | "OBJ-01"
  | "OBJ-02"
  | "OBJ-03"
  | "OBJ-04"
  | "OBJ-05"
  | "OBJ-06"
  | "OBJ-07"
  | "OBJ-08"
  | "OBJ-09"
  | "OBJ-10"
  | "OBJ-11"
  | "OBJ-12";

export interface AnimationObject {
  readonly id: AnimationObjectId;
  readonly name: string;
  readonly description: string;
  readonly sceneId: string;
  readonly enabled: boolean;
}