/**
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: Common Contract Foundation
 * Contract ID: AAI-CONTRACT-COMMON
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * ============================================================
 *
 * Purpose:
 *
 * Provides shared contract primitives used by all AAi
 * resource contracts.
 *
 * These common types prevent duplicate definitions of:
 *
 * - Resource identity
 * - Ownership
 * - Organization context
 * - Workspace context
 * - Metadata
 * - Timestamps
 *
 * ============================================================
 *
 * Architectural Principles:
 *
 * 1. Identity is immutable.
 * 2. createdBy is immutable provenance.
 * 3. Ownership may change.
 * 4. Organization context is separate from identity.
 * 5. Workspace context is separate from ownership.
 * 6. Secrets must never be stored in generic metadata.
 * 7. Contracts remain cloud-neutral.
 *
 * ============================================================
 */

/**
 * ============================================================
 * Resource Types
 * ============================================================
 */

export type AAiResourceType =
  | 'ORGANIZATION'
  | 'WORKSPACE'
  | 'CONTAINER'
  | 'SOLUTION_SPECIFICATION'
  | 'BUILD'
  | 'APPLICATION'
  | 'DEPLOYMENT';

/**
 * ============================================================
 * Owner Types
 * ============================================================
 */

export type AAiOwnerType =
  | 'USER'
  | 'ORGANIZATION'
  | 'WORKSPACE';

/**
 * ============================================================
 * Canonical Owner Reference
 * ============================================================
 *
 * Every AAi resource that supports ownership should use
 * this structure.
 *
 * The ID is authoritative.
 * The name is presentation-only.
 */

export interface AAiOwnerReference {
  type: AAiOwnerType;

  id: string;

  name?: string;
}

/**
 * ============================================================
 * Resource Identity
 * ============================================================
 */

export interface AAiResourceIdentity {
  /**
   * Immutable unique resource identifier.
   */
  resourceId: string;

  /**
   * Canonical AAi resource type.
   */
  resourceType: AAiResourceType;

  /**
   * Immutable authenticated user who created the resource.
   */
  createdBy: string;

  /**
   * Resource creation timestamp.
   */
  createdAt: string;

  /**
   * Last modification timestamp.
   */
  updatedAt: string;
}

/**
 * ============================================================
 * Resource Ownership
 * ============================================================
 */

export interface AAiResourceOwnership {
  /**
   * Current owner.
   */
  owner: AAiOwnerReference;

  /**
   * Ownership revision.
   *
   * Increment whenever ownership changes.
   */
  ownershipVersion: number;
}

/**
 * ============================================================
 * Organization Context
 * ============================================================
 */

export interface AAiOrganizationContext {
  /**
   * Organization currently associated with the resource.
   */
  organizationId?: string;

  /**
   * Optional organization relationship.
   */
  relationship?:
    | 'MEMBER'
    | 'CONSULTANT'
    | 'PARTNER'
    | 'SERVICE_PROVIDER'
    | 'OWNER'
    | 'OPERATOR';
}

/**
 * ============================================================
 * Workspace Context
 * ============================================================
 */

export interface AAiWorkspaceContext {
  /**
   * Workspace containing or operating the resource.
   */
  workspaceId?: string;
}

/**
 * ============================================================
 * Resource Context
 * ============================================================
 */

export interface AAiResourceContext
  extends AAiOrganizationContext,
    AAiWorkspaceContext {
  /**
   * Optional parent resource.
   */
  parentResourceId?: string;

  /**
   * Optional business/context reference.
   */
  contextId?: string;
}

/**
 * ============================================================
 * Resource Metadata
 * ============================================================
 *
 * Metadata is intentionally generic.
 *
 * NEVER store:
 * - passwords
 * - API keys
 * - access tokens
 * - refresh tokens
 * - private keys
 * - payment secrets
 */

export interface AAiResourceMetadata {
  tags?: string[];

  labels?: Record<string, string>;

  attributes?: Record<string, unknown>;
}

/**
 * ============================================================
 * Common Resource Envelope
 * ============================================================
 *
 * This is the shared foundation for AAi resources.
 *
 * Domain-specific contracts should extend/combine this
 * rather than redefining these properties.
 */

export interface AAiResourceEnvelope
  extends AAiResourceIdentity,
    AAiResourceOwnership,
    AAiResourceContext {
  metadata?: AAiResourceMetadata;
}

/**
 * ============================================================
 * Resource Reference
 * ============================================================
 *
 * Lightweight reference used between contracts.
 */

export interface AAiResourceReference {
  resourceId: string;

  resourceType: AAiResourceType;

  name?: string;

  version?: string;
}

/**
 * ============================================================
 * Audit Reference
 * ============================================================
 *
 * Common reference to the future Audit & Integrity contract.
 */

export interface AAiAuditReference {
  auditEventId: string;

  eventType: string;

  timestamp: string;
}

/**
 * ============================================================
 * Version Reference
 * ============================================================
 */

export interface AAiVersionReference {
  versionId: string;

  version: string;

  createdBy: string;

  createdAt: string;
}

/**
 * ============================================================
 * Security Reference
 * ============================================================
 *
 * References secure configuration without storing secrets.
 */

export interface AAiSecureReference {
  /**
   * Reference to a secure credential/configuration managed
   * by the appropriate platform.
   */
  authRef: string;

  provider?: string;

  environment?:
    | 'DEVELOPMENT'
    | 'TEST'
    | 'STAGING'
    | 'PRODUCTION';
}

/**
 * ============================================================
 * Common Status
 * ============================================================
 */

export type AAiCommonStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SUSPENDED'
  | 'ARCHIVED';

/**
 * ============================================================
 * Contract Status
 * ============================================================
 */

export const COMMON_CONTRACT = {
  contractId: 'AAI-CONTRACT-COMMON',
  name: 'Common Contract Foundation',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;

