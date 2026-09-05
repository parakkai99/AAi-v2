/**
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: 05 — Solution Specification
 * Contract ID: AAI-CONTRACT-005
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * ============================================================
 *
 * Architectural Principle:
 *
 * A Solution Specification is the user's refined definition
 * of what AAi is expected to build or deliver.
 *
 * It is NOT the catalog item itself.
 *
 * Catalog:
 *   What AAi offers
 *
 * Solution Container:
 *   What the user has collected
 *
 * Solution Specification:
 *   What the user has decided to build
 *
 * Build:
 *   How AAi produces the application
 *
 * ============================================================
 */

export type SolutionSpecificationStatus =
  | 'DRAFT'
  | 'REFINING'
  | 'READY'
  | 'BUILD_REQUESTED'
  | 'BUILDING'
  | 'BUILT'
  | 'ARCHIVED';

export type SolutionSpecificationSource =
  | 'CATALOG'
  | 'USER'
  | 'IMPORTED'
  | 'FORKED'
  | 'AI_ASSISTED';

export interface AAiSolutionReference {
  /**
   * Canonical catalog solution ID.
   */
  solutionId: string;

  /**
   * Catalog version from which this solution was selected.
   */
  catalogVersion: string;

  /**
   * Snapshot name for presentation/history.
   */
  name: string;

  /**
   * Canonical catalog path.
   */
  path?: string;
}

export interface AAiSolutionSpecification {
  /**
   * Immutable specification identifier.
   */
  specificationId: string;

  /**
   * Container holding this specification.
   */
  containerId: string;

  /**
   * Workspace context.
   */
  workspaceId: string;

  /**
   * Optional organization context.
   */
  organizationId?: string;

  /**
   * Original catalog solution selected by the user.
   */
  sourceSolution: AAiSolutionReference;

  /**
   * How this specification originated.
   */
  source: SolutionSpecificationSource;

  status: SolutionSpecificationStatus;

  /**
   * User-readable solution name.
   */
  name: string;

  description?: string;

  /**
   * Business objective / intended outcome.
   */
  objective?: string;

  /**
   * Target users or audience.
   */
  targetUsers?: AAiSolutionTarget[];

  /**
   * Business/domain context.
   */
  businessContext?: AAiBusinessContext;

  /**
   * Functional requirements selected or refined
   * by the user.
   */
  requirements: AAiSolutionRequirement[];

  /**
   * Selected capabilities.
   */
  capabilities: AAiSolutionCapability[];

  /**
   * Selected implementation/platform options.
   */
  platforms: AAiSolutionPlatform[];

  /**
   * Location/context requirements.
   */
  location?: AAiSolutionLocation;

  /**
   * Selected services/providers where applicable.
   */
  serviceComposition?: AAiServiceComposition[];

  /**
   * User's desired outcomes/actions.
   */
  outcomes?: AAiSolutionOutcome[];

  /**
   * Build preferences/configuration.
   */
  buildConfiguration?: AAiBuildConfiguration;

  /**
   * Specification version.
   */
  version: number;

  /**
   * Provenance.
   */
  createdBy: string;

  createdAt: string;
  updatedAt: string;
}

/**
 * ============================================================
 * Target Users
 * ============================================================
 */

export interface AAiSolutionTarget {
  id: string;
  name: string;

  description?: string;
}

/**
 * ============================================================
 * Business Context
 * ============================================================
 */

export interface AAiBusinessContext {
  domainId?: string;
  subdomainId?: string;

  businessWorldId?: string;

  industry?: string;

  businessModel?: string;

  scenario?: string;

  attributes?: Record<string, unknown>;
}

/**
 * ============================================================
 * Requirements
 * ============================================================
 */

export type SolutionRequirementPriority =
  | 'REQUIRED'
  | 'IMPORTANT'
  | 'OPTIONAL';

export interface AAiSolutionRequirement {
  requirementId: string;

  title: string;

  description?: string;

  priority: SolutionRequirementPriority;

  /**
   * Whether the requirement has been confirmed
   * by the user.
   */
  confirmed: boolean;

  source?: 'CATALOG' | 'USER' | 'AI' | 'IMPORTED';

  createdBy: string;
  createdAt: string;
}

/**
 * ============================================================
 * Capabilities
 * ============================================================
 */

export interface AAiSolutionCapability {
  capabilityId: string;

  name: string;

  /**
   * Canonical catalog lineage.
   */
  path?: string;

  enabled: boolean;

  configuration?: Record<string, unknown>;
}

/**
 * ============================================================
 * Platform / Implementation
 * ============================================================
 */

export interface AAiSolutionPlatform {
  platformId: string;

  name: string;

  provider?: string;

  selected: boolean;

  configuration?: Record<string, unknown>;
}

/**
 * ============================================================
 * Location
 * ============================================================
 */

export interface AAiSolutionLocation {
  locationId?: string;

  country?: string;

  state?: string;

  city?: string;

  latitude?: number;

  longitude?: number;

  radiusKm?: number;

  /**
   * Location is contextual data, not a security identity.
   */
  source?: 'USER' | 'PROFILE' | 'SYSTEM' | 'DISCOVERY';
}

/**
 * ============================================================
 * Service Composition
 * ============================================================
 */

export interface AAiServiceComposition {
  serviceId: string;

  name: string;

  providerId?: string;

  enabled: boolean;

  configuration?: Record<string, unknown>;
}

/**
 * ============================================================
 * Outcomes
 * ============================================================
 */

export interface AAiSolutionOutcome {
  outcomeId: string;

  name: string;

  description?: string;

  measurable?: boolean;

  targetValue?: string;
}

/**
 * ============================================================
 * Build Configuration
 * ============================================================
 */

export interface AAiBuildConfiguration {
  /**
   * Intended application type.
   *
   * Examples:
   * - WEB
   * - MOBILE
   * - RESPONSIVE
   * - API
   * - FULL_STACK
   */
  applicationType?: string;

  /**
   * Target device experiences.
   */
  targets?: Array<
    'DESKTOP'
    | 'TABLET'
    | 'MOBILE'
    | 'WEB'
    | 'APP'
  >;

  /**
   * Requested deployment/runtime target.
   *
   * Examples:
   * - CATALYST
   * - AWS
   * - AAi_RUNTIME
   */
  runtimeTarget?: string;

  /**
   * Build-specific configuration.
   */
  configuration?: Record<string, unknown>;
}

/**
 * ============================================================
 * Specification Snapshot
 * ============================================================
 *
 * A snapshot allows AAi to preserve a known specification
 * before major refinement/build operations.
 */

export interface AAiSolutionSpecificationSnapshot {
  snapshotId: string;

  specificationId: string;

  version: number;

  createdBy: string;

  createdAt: string;

  specification: AAiSolutionSpecification;
}

/**
 * ============================================================
 * CONTRACT STATUS
 * ============================================================
 */

export const SOLUTION_SPECIFICATION_CONTRACT = {
  contractId: 'AAI-CONTRACT-005',
  name: 'Solution Specification',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;