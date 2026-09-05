/**
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: 04 — Container
 * Contract ID: AAI-CONTRACT-004
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * ============================================================
 *
 * Architectural Principle:
 *
 * A Container is the durable working boundary that holds an
 * evolving AAi experience, solution, project, learning journey,
 * research activity, or other composable work.
 *
 * A Container belongs to a Workspace, has explicit ownership,
 * preserves provenance, and can evolve through its lifecycle.
 *
 * Container ownership is separate from Workspace membership.
 *
 * ============================================================
 */

export type ContainerType =
  | 'SOLUTION'
  | 'LEARNING'
  | 'JOURNEY'
  | 'PROJECT'
  | 'RESEARCH'
  | 'WORKSPACE';

export type ContainerStatus =
  | 'DISCOVERED'
  | 'SELECTED'
  | 'DRAFT'
  | 'REFINING'
  | 'READY_TO_BUILD'
  | 'BUILDING'
  | 'BUILT'
  | 'RUNNING'
  | 'ARCHIVED';

export type ContainerOwnerType =
  | 'USER'
  | 'ORGANIZATION'
  | 'WORKSPACE';

export interface AAiContainer {
  /**
   * Immutable container identifier.
   */
  containerId: string;

  /**
   * Human-readable container name.
   */
  name: string;

  type: ContainerType;

  status: ContainerStatus;

  /**
   * Workspace in which the container currently operates.
   */
  workspaceId: string;

  /**
   * Optional organization context.
   */
  organizationId?: string;

  /**
   * Current owner.
   *
   * Ownership may differ from the user who created
   * or built the container.
   */
  owner: {
    type: ContainerOwnerType;
    id: string;
  };

  /**
   * Immutable provenance.
   *
   * This value never changes because ownership changes.
   */
  createdBy: string;

  /**
   * Users who have materially contributed to building
   * or refining the container.
   */
  builtBy: string[];

  /**
   * Current container version.
   */
  version: number;

  /**
   * Reference to the catalog/version from which the
   * selected solution or capability originated.
   *
   * This protects the container from silently changing
   * when the global catalog changes.
   */
  sourceCatalog?: {
    catalogVersion: string;
    sourceItemId?: string;
    sourceItemType?: string;
  };

  description?: string;

  createdAt: string;
  updatedAt: string;

  /**
   * Optional application-specific metadata.
   *
   * This must not contain credentials or secrets.
   */
  metadata?: Record<string, unknown>;
}

/**
 * ============================================================
 * Container Item
 * ============================================================
 *
 * A Container can hold selected AAi resources without forcing
 * every container type to use the same internal structure.
 */

export type ContainerItemType =
  | 'DOMAIN'
  | 'SUBDOMAIN'
  | 'CAPABILITY'
  | 'SOLUTION_BUNDLE'
  | 'SOLUTION'
  | 'SERVICE'
  | 'PROVIDER'
  | 'PLATFORM'
  | 'RESOURCE'
  | 'CUSTOM';

export interface AAiContainerItem {
  itemId: string;

  containerId: string;

  type: ContainerItemType;

  /**
   * Reference to the canonical AAi resource.
   */
  resourceId: string;

  /**
   * Optional snapshot label/name for presentation.
   */
  name?: string;

  /**
   * Position/order inside the container.
   */
  position?: number;

  /**
   * Optional user-defined configuration.
   */
  configuration?: Record<string, unknown>;

  addedBy: string;
  addedAt: string;

  removedAt?: string;
}

/**
 * ============================================================
 * Container Context
 * ============================================================
 *
 * Captures the context in which the container is being used.
 *
 * Context can later include location, language, role,
 * occasion, date, business scenario, and other AAi signals.
 */

export interface AAiContainerContext {
  locationId?: string;
  language?: string;

  roleId?: string;

  occasionId?: string;

  businessDomainId?: string;

  /**
   * Flexible contextual references for future AAi
   * journey and personalization capabilities.
   */
  attributes?: Record<string, unknown>;
}

/**
 * ============================================================
 * Container Progress
 * ============================================================
 */

export interface AAiContainerProgress {
  /**
   * Application-defined completion percentage.
   */
  percentage: number;

  currentStage?: string;

  completedStages?: string[];

  nextStage?: string;

  updatedAt: string;
}

/**
 * ============================================================
 * Container Actions
 * ============================================================
 *
 * These are semantic actions, not UI buttons.
 */

export type ContainerAction =
  | 'SELECT'
  | 'ADD'
  | 'REMOVE'
  | 'REFINE'
  | 'SAVE'
  | 'DUPLICATE'
  | 'FORK'
  | 'TRANSFER'
  | 'SHARE'
  | 'BUILD'
  | 'DEPLOY'
  | 'ARCHIVE';

/**
 * ============================================================
 * Container Record
 * ============================================================
 *
 * Aggregate representation used by repositories/services.
 */

export interface AAiContainerRecord {
  container: AAiContainer;

  context?: AAiContainerContext;

  items: AAiContainerItem[];

  progress?: AAiContainerProgress;

  availableActions?: ContainerAction[];
}

/**
 * ============================================================
 * CONTRACT STATUS
 * ============================================================
 */

export const CONTAINER_CONTRACT = {
  contractId: 'AAI-CONTRACT-004',
  name: 'Container',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;