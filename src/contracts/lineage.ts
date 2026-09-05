/**
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: 09 — Version / Fork / Lineage
 * Contract ID: AAI-CONTRACT-009
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * ============================================================
 *
 * Architectural Principles:
 *
 * - AAi must preserve the origin of every solution/resource.
 * - A version represents evolution of the same resource.
 * - A fork creates a new resource while preserving its origin.
 * - A duplicate/copy is distinct from a fork.
 * - Ownership transfer does not break lineage.
 * - Creator and historical contributors remain preserved.
 * - Version history must not be silently rewritten.
 *
 * ============================================================
 */

export type AAiLineageRelation =
  | 'ORIGINAL'
  | 'VERSION'
  | 'FORK'
  | 'DUPLICATE'
  | 'IMPORTED'
  | 'DERIVED';

export type AAiVersionStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'SUPERSEDED'
  | 'ARCHIVED';

export type AAiChangeType =
  | 'CREATE'
  | 'EDIT'
  | 'REFINE'
  | 'CONFIGURE'
  | 'ADD'
  | 'REMOVE'
  | 'FORK'
  | 'DUPLICATE'
  | 'IMPORT'
  | 'RESTORE'
  | 'MERGE';

/**
 * ============================================================
 * Resource Lineage
 * ============================================================
 */

export interface AAiLineage {
  /**
   * Immutable identity of the lineage family.
   *
   * All versions/forks derived from an original resource
   * can be associated with this lineage.
   */
  lineageId: string;

  /**
   * Original resource that established the lineage.
   */
  rootResourceId: string;

  /**
   * Immediate parent resource.
   *
   * For a version this is normally the previous version.
   * For a fork this is the resource from which the fork came.
   */
  parentResourceId?: string;

  relation: AAiLineageRelation;

  /**
   * Root creator is preserved independently of ownership.
   */
  rootCreatedBy: string;

  createdAt: string;
}

/**
 * ============================================================
 * Version
 * ============================================================
 */

export interface AAiResourceVersion {
  versionId: string;

  resourceId: string;

  /**
   * Human-readable sequential version.
   *
   * Examples:
   * 1.0.0
   * 1.1.0
   * 2.0.0
   */
  version: string;

  status: AAiVersionStatus;

  /**
   * Previous version of the same resource.
   */
  previousVersionId?: string;

  /**
   * User who created this version.
   */
  createdBy: string;

  createdAt: string;

  /**
   * Optional explanation of the change.
   */
  changeSummary?: string;

  /**
   * Optional machine-readable change classification.
   */
  changeType?: AAiChangeType;

  /**
   * Reference to immutable audit events.
   */
  auditEventIds?: string[];
}

/**
 * ============================================================
 * Version Snapshot
 * ============================================================
 *
 * Snapshot represents the complete state at a particular
 * point in time.
 */

export interface AAiVersionSnapshot<T = unknown> {
  snapshotId: string;

  resourceId: string;

  versionId: string;

  version: string;

  createdBy: string;

  createdAt: string;

  /**
   * Immutable representation of the resource state.
   */
  data: T;
}

/**
 * ============================================================
 * Fork
 * ============================================================
 *
 * A fork creates a new resource while preserving its
 * relationship to the original.
 */

export interface AAiForkRequest {
  forkId: string;

  sourceResourceId: string;

  sourceVersionId?: string;

  /**
   * New resource created by the fork.
   */
  targetResourceId: string;

  targetOwner: {
    type: 'USER' | 'ORGANIZATION' | 'WORKSPACE';
    id: string;
  };

  createdBy: string;

  reason?: string;

  createdAt: string;

  /**
   * Whether future changes remain independent.
   */
  independent: boolean;
}

/**
 * ============================================================
 * Duplicate / Copy
 * ============================================================
 *
 * A duplicate is a new resource created from an existing
 * resource for reuse, without implying an ongoing
 * parent/child development relationship.
 */

export interface AAiDuplicateRequest {
  duplicateId: string;

  sourceResourceId: string;

  sourceVersionId?: string;

  targetResourceId: string;

  createdBy: string;

  createdAt: string;

  preserveConfiguration: boolean;

  preserveDependencies: boolean;
}

/**
 * ============================================================
 * Lineage Node
 * ============================================================
 *
 * Used to represent the complete family tree.
 */

export interface AAiLineageNode {
  resourceId: string;

  lineageId: string;

  relation: AAiLineageRelation;

  parentResourceId?: string;

  rootResourceId: string;

  currentVersionId?: string;

  owner: {
    type: 'USER' | 'ORGANIZATION' | 'WORKSPACE';
    id: string;
  };

  createdBy: string;

  createdAt: string;
}

/**
 * ============================================================
 * Lineage Graph
 * ============================================================
 */

export interface AAiLineageGraph {
  lineageId: string;

  rootResourceId: string;

  nodes: AAiLineageNode[];

  generatedAt: string;
}

/**
 * ============================================================
 * Change Record
 * ============================================================
 */

export interface AAiChangeRecord {
  changeId: string;

  resourceId: string;

  versionId: string;

  changedBy: string;

  changeType: AAiChangeType;

  timestamp: string;

  summary?: string;

  /**
   * Optional references to affected resources/fields.
   */
  affectedResourceIds?: string[];

  /**
   * Future Audit & Integrity reference.
   */
  auditEventId?: string;
}

/**
 * ============================================================
 * Restore
 * ============================================================
 */

export interface AAiRestoreRequest {
  restoreId: string;

  resourceId: string;

  sourceVersionId: string;

  requestedBy: string;

  requestedAt: string;

  /**
   * Restoring should normally create a NEW version,
   * not delete the intervening history.
   */
  createNewVersion: true;

  reason?: string;
}

/**
 * ============================================================
 * MERGE
 * ============================================================
 *
 * Reserved for future controlled merging of forks.
 */

export interface AAiMergeRequest {
  mergeId: string;

  sourceResourceId: string;

  targetResourceId: string;

  sourceVersionId?: string;

  targetVersionId?: string;

  requestedBy: string;

  requestedAt: string;

  status:
    | 'REQUESTED'
    | 'REVIEW'
    | 'APPROVED'
    | 'REJECTED'
    | 'COMPLETED';

  conflicts?: string[];

  resolvedBy?: string;

  completedAt?: string;
}

/**
 * ============================================================
 * CONTRACT STATUS
 * ============================================================
 */

export const LINEAGE_CONTRACT = {
  contractId: 'AAI-CONTRACT-009',
  name: 'Version / Fork / Lineage',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;