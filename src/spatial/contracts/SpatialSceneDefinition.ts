/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: AAi Generic Spatial Framework
 * Status: ACTIVE
 *
 * Describes the semantic structure of a spatial scene.
 *
 * This contract does not own rendering, React state, DOM behavior, CSS,
 * or animation execution. Animation references remain declarative and are
 * executed by the existing AAi Animation Framework.
 */

export type SpatialSceneKind = string;

export type SpatialFocalPoint = string;

export type SpatialLayerRole =
  | "background"
  | "midground"
  | "subject"
  | "foreground"
  | "atmosphere"
  | "light";

export interface SpatialAnimationReference {
  readonly objectId: string;
  readonly motionId?: string;
  readonly triggerId?: string;
  readonly targetIds?: readonly string[];
}

export interface SpatialObjectDefinition {
  readonly id: string;
  readonly role?: string;
  readonly asset?: string;
  readonly focalPoint?: SpatialFocalPoint;
  readonly animation?: SpatialAnimationReference;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface SpatialLayerDefinition {
  readonly id: string;
  readonly role: SpatialLayerRole;
  readonly objects?: readonly SpatialObjectDefinition[];
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface SpatialSceneAsset {
  readonly source: string;
  readonly fallback?: string;
  readonly status?: "ready" | "planned";
}

export interface SpatialSceneDefinition {
  readonly id: string;
  readonly number?: number;
  readonly title: string;
  readonly subtitle?: string;
  readonly kind?: SpatialSceneKind;
  readonly asset?: SpatialSceneAsset;
  readonly focalPoint?: SpatialFocalPoint;
  readonly atmosphere?: string;
  readonly motion?: string;
  readonly transition?: string;
  readonly layers?: readonly SpatialLayerDefinition[];
  readonly metadata?: Readonly<Record<string, unknown>>;
}
