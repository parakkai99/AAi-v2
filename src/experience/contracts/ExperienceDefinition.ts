/**
 * AAi Experience Definition Contract
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-DEFINITION-001
 * Status: ACTIVE
 *
 * The definition is the solution-independent experience envelope.
 *
 * It describes identity, context, navigation/intelligence behavior,
 * presentation, composition and infrastructure references without owning
 * their implementations.
 *
 * Universe, Domain, Subdomain and Solution all use the same contract.
 * Child definitions may override only what they need.
 */

export type ExperienceScope =
  | "universe"
  | "domain"
  | "subdomain"
  | "solution";

export interface ExperienceIdentityDefinition {
  readonly signatureRef?: string;
  readonly displayName?: string;
  readonly logoRef?: string;
  readonly tagline?: string;
}

export interface ExperienceContextDefinition {
  readonly locationProfileRef?: string;
  readonly languageProfileRef?: string;
  readonly locale?: string;
  readonly timezone?: string;
  readonly currency?: string;
}

export interface ExperienceSearchDefinition {
  readonly intentProfileRef?: string;
  readonly enabled?: boolean;
  readonly placeholder?: string;
}

export interface ExperienceAppStackDefinition {
  readonly modelStackRef?: string;
  readonly enabled?: boolean;
}

export interface ExperienceBehaviorSurfaceDefinition {
  readonly profileRef?: string;
  readonly expandOn?: "hover" | "focus" | "click" | "manual";
  readonly collapsed?: boolean;
}

export interface ExperienceNavigationBehaviorDefinition {
  readonly leftRail?: ExperienceBehaviorSurfaceDefinition;
  readonly rightRail?: ExperienceBehaviorSurfaceDefinition;
  readonly topNavigation?: ExperienceBehaviorSurfaceDefinition;
}

export interface ExperienceInfrastructureDefinition {
  /**
   * References are resolver/provider identifiers only. They never contain
   * credentials, connection strings or secrets.
   */
  readonly authProfileRef?: string;
  readonly dataProfileRef?: string;
  readonly storeProfileRef?: string;
  readonly assetLibraryRef?: string;
  readonly integrationProfileRef?: string;
}

export interface ExperienceDefinition {
  readonly id: string;
  readonly scope: ExperienceScope;
  readonly version?: string;

  readonly parentId?: string;

  readonly identity?: ExperienceIdentityDefinition;
  readonly context?: ExperienceContextDefinition;
  readonly search?: ExperienceSearchDefinition;
  readonly appStack?: ExperienceAppStackDefinition;
  readonly navigation?: ExperienceNavigationBehaviorDefinition;

  readonly themeId?: string;
  readonly layoutId?: string;
  readonly compositionId?: string;
  readonly behaviorProfileId?: string;

  readonly infrastructure?: ExperienceInfrastructureDefinition;

  readonly metadata?: Readonly<Record<string, unknown>>;
}
