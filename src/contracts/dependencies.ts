/**
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: 08 — Dependencies
 * Contract ID: AAI-CONTRACT-008
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * ============================================================
 *
 * Architectural Principles:
 *
 * - A Solution references dependencies; it does not own
 *   credentials implicitly.
 * - Secrets are never stored directly in a Solution,
 *   Container, or Specification.
 * - Credentials are referenced through authRef only.
 * - Personal resources must never leak during ownership
 *   transfer.
 * - Organization-owned resources should be used where
 *   appropriate for production operation.
 * - Dependencies may require review during transfer,
 *   fork, build, or deployment.
 * - AAi remains cloud-neutral.
 *
 * ============================================================
 */

export type DependencyType =
  | 'API'
  | 'DATABASE'
  | 'FILE_STORAGE'
  | 'AUTHENTICATION'
  | 'PAYMENT'
  | 'MAP'
  | 'EMAIL'
  | 'MESSAGING'
  | 'DOMAIN'
  | 'DNS'
  | 'PLATFORM'
  | 'AI_SERVICE'
  | 'EXTERNAL_SERVICE'
  | 'PROVIDER'
  | 'OTHER';

export type DependencyOwnershipType =
  | 'USER'
  | 'ORGANIZATION'
  | 'WORKSPACE'
  | 'PLATFORM'
  | 'EXTERNAL';

export type DependencyEnvironment =
  | 'DEVELOPMENT'
  | 'TEST'
  | 'STAGING'
  | 'PRODUCTION';

export type DependencyStatus =
  | 'DECLARED'
  | 'CONFIGURED'
  | 'ACTIVE'
  | 'DISABLED'
  | 'REQUIRES_REVIEW'
  | 'BROKEN'
  | 'REMOVED';

export type DependencyTransferPolicy =
  | 'RETAIN'
  | 'TRANSFER'
  | 'REPLACE'
  | 'REVIEW'
  | 'EXCLUDE';

/**
 * ============================================================
 * Credential Reference
 * ============================================================
 *
 * authRef is ONLY a reference to a credential/connection
 * managed by the appropriate secure platform.
 *
 * Never place:
 * - password
 * - API secret
 * - private key
 * - access token
 * - refresh token
 * inside this contract.
 */

export interface AAiAuthReference {
  authRef: string;

  provider?: string;

  ownerType: DependencyOwnershipType;

  ownerId: string;

  environment?: DependencyEnvironment;

  /**
   * Human-readable description only.
   */
  description?: string;
}

/**
 * ============================================================
 * Dependency
 * ============================================================
 */

export interface AAiDependency {
  dependencyId: string;

  /**
   * Resource containing/using this dependency.
   */
  resourceId: string;

  type: DependencyType;

  name: string;

  /**
   * External or internal endpoint/reference.
   *
   * Do not put secrets in this value.
   */
  uri?: string;

  /**
   * Secure credential reference.
   */
  authRef?: AAiAuthReference;

  ownership: {
    type: DependencyOwnershipType;
    id: string;
  };

  environment: DependencyEnvironment;

  status: DependencyStatus;

  /**
   * What should happen if the parent resource is transferred.
   */
  transferPolicy: DependencyTransferPolicy;

  /**
   * Whether this dependency is required for operation.
   */
  required: boolean;

  /**
   * Whether the dependency is currently available.
   */
  enabled: boolean;

  configuration?: Record<string, unknown>;

  createdBy: string;

  createdAt: string;

  updatedAt: string;
}

/**
 * ============================================================
 * Dependency Reference
 * ============================================================
 *
 * Lightweight reference used inside Solution Specifications,
 * Containers and Builds.
 */

export interface AAiDependencyReference {
  dependencyId: string;

  required: boolean;

  purpose?: string;

  environment?: DependencyEnvironment;
}

/**
 * ============================================================
 * Dependency Ownership Review
 * ============================================================
 *
 * Used before ownership transfer or deployment.
 */

export interface AAiDependencyReview {
  reviewId: string;

  dependencyId: string;

  reviewedBy: string;

  reviewedAt: string;

  currentOwner: {
    type: DependencyOwnershipType;
    id: string;
  };

  requiredAction:
    | 'NONE'
    | 'RECONNECT'
    | 'REPLACE_CREDENTIAL'
    | 'TRANSFER'
    | 'REMOVE'
    | 'CONFIGURE';

  targetOwner?: {
    type: DependencyOwnershipType;
    id: string;
  };

  notes?: string;

  approved: boolean;
}

/**
 * ============================================================
 * Dependency Transfer Plan
 * ============================================================
 */

export interface AAiDependencyTransferPlan {
  transferId: string;

  resourceId: string;

  dependencies: AAiDependencyTransferItem[];

  createdBy: string;

  createdAt: string;

  completedAt?: string;
}

export interface AAiDependencyTransferItem {
  dependencyId: string;

  currentOwner: {
    type: DependencyOwnershipType;
    id: string;
  };

  targetOwner?: {
    type: DependencyOwnershipType;
    id: string;
  };

  policy: DependencyTransferPolicy;

  action:
    | 'RETAIN'
    | 'TRANSFER'
    | 'REPLACE'
    | 'REVIEW'
    | 'EXCLUDE';

  completed: boolean;

  completedAt?: string;
}

/**
 * ============================================================
 * Example:
 *
 * Consultant builds a marketplace.
 *
 * Solution:
 *   owned by Organization A
 *
 * API:
 *   Organization A credential
 *
 * Database:
 *   Organization A database
 *
 * Payment:
 *   Organization A payment configuration
 *
 * Consultant's personal API key:
 *   NEVER transferred automatically
 *
 * ============================================================
 */

/**
 * ============================================================
 * CONTRACT STATUS
 * ============================================================
 */

export const DEPENDENCIES_CONTRACT = {
  contractId: 'AAI-CONTRACT-008',
  name: 'Dependencies',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;