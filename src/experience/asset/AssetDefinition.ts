/**
 * AAi Experience Asset Contract
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-ASSET-001
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * Domain-neutral asset definitions for digital, spatial, brand, and media assets.
 */

export type ExperienceAssetType =
  | 'image'
  | 'spatial'
  | 'icon'
  | 'audio'
  | 'video'
  | 'document'
  | 'illustration';

export type ExperienceAssetScope =
  | 'universe'
  | 'domain'
  | 'subdomain'
  | 'solution';

export interface ExperienceAssetDimensions {
  readonly width?: number;
  readonly height?: number;
  readonly aspectRatio?: string;
}

export interface ExperienceAsset {
  readonly id: string;
  readonly name: string;
  readonly type: ExperienceAssetType;
  readonly scope: ExperienceAssetScope;
  readonly url: string;
  readonly thumbnailUrl?: string;
  readonly dimensions?: ExperienceAssetDimensions;
  readonly format?: string;
  readonly sizeBytes?: number;
  readonly tags: readonly string[];
  readonly description?: string;
  readonly author?: string;
  readonly altText?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface ExperienceAssetCollection {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly scope: ExperienceAssetScope;
  readonly assetIds: readonly string[];
}
