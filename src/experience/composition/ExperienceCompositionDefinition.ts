/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-COMPOSITION-001
 * Status: ACTIVE
 *
 * Generic composition model for Universe, Domain, Subdomain and Solution
 * experiences.
 *
 * The model describes WHAT is placed in an experience and WHERE.
 * It does not render React, compile TSX, own CSS, execute animation,
 * or access a database/API directly.
 *
 * Runtime components are referenced by stable componentId values.
 * Animation and transition references remain declarative and are resolved
 * by their respective shared runtime frameworks.
 */

import type { ExperienceScope } from "../contracts";

export type ExperienceRegionArea =
  | "header"
  | "left-rail"
  | "main"
  | "right-rail"
  | "footer"
  | "utility";

export type ExperienceBlockKind =
  | "component"
  | "media"
  | "group"
  | "content";

export type ExperienceMediaKind =
  | "image"
  | "svg"
  | "video";

export interface ExperienceComponentReference {
  readonly componentId: string;
  readonly version?: string;
  readonly variant?: string;
}

export interface ExperienceMediaReference {
  readonly kind: ExperienceMediaKind;
  readonly source: string;
  readonly fallback?: string;
  readonly assetKey?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface ExperienceContentReference {
  readonly key: string;
  readonly source?: string;
  readonly provider?: string;
  readonly query?: Readonly<Record<string, unknown>>;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface ExperienceAnimationReference {
  readonly objectId: string;
  readonly motionId?: string;
  readonly triggerId?: string;
  readonly targetIds?: readonly string[];
}

export interface ExperienceTransitionReference {
  readonly transitionId: string;
  readonly parameters?: Readonly<Record<string, number | string | boolean>>;
}

export interface ExperienceBlockDefinition {
  readonly id: string;
  readonly kind: ExperienceBlockKind;

  /**
   * Identifies a runtime-owned component. The component itself lives in
   * the shared runtime/component registry, never inside solution content.
   */
  readonly component?: ExperienceComponentReference;

  /** Media may be an image, SVG or video without changing the holder. */
  readonly media?: ExperienceMediaReference;

  /** Content is resolved separately from the composition definition. */
  readonly content?: ExperienceContentReference;

  /** Group blocks may contain nested blocks. */
  readonly children?: readonly ExperienceBlockDefinition[];

  /**
   * Allows the same structural holder to repeat with different content.
   * Runtime decides how repetition is rendered.
   */
  readonly repeat?: {
    readonly enabled: boolean;
    readonly itemContentKey?: string;
    readonly minItems?: number;
    readonly maxItems?: number;
  };

  readonly animation?: ExperienceAnimationReference;
  readonly transition?: ExperienceTransitionReference;

  readonly order?: number;
  readonly enabled?: boolean;

  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface ExperienceRegionDefinition {
  readonly id: string;
  readonly area: ExperienceRegionArea;

  /**
   * Regions are the composition slots. A region may contain one hero,
   * many cards, a running band, recommendations, recent posts, or any
   * other runtime component without changing the shell.
   */
  readonly blocks: readonly ExperienceBlockDefinition[];

  readonly repeatable?: boolean;
  readonly order?: number;
  readonly enabled?: boolean;

  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface ExperienceCompositionDefinition {
  readonly id: string;
  readonly version: string;
  readonly scope: ExperienceScope;

  /**
   * Parent composition is inherited first; the child composition overrides
   * only what it explicitly defines.
   */
  readonly parentId?: string;

  readonly regions: readonly ExperienceRegionDefinition[];

  readonly metadata?: Readonly<Record<string, unknown>>;
}
