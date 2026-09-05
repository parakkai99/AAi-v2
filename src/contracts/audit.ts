/**
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: 10 — Audit & Integrity
 * Contract ID: AAI-CONTRACT-010
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * ============================================================
 *
 * Architectural Principles:
 *
 * - AAi audit records are append-only.
 * - Audit history must not be silently rewritten or deleted.
 * - Each event is cryptographically linked to the previous
 *   event through a hash chain.
 * - Periodic integrity checkpoints may use Merkle roots.
 * - External notarization/blockchain anchoring is optional.
 * - Audit records preserve who, what, when and context.
 * - Secrets and authentication credentials must never be
 *   stored in audit events.
 * - Audit infrastructure remains cloud-neutral.
 *
 * ============================================================
 */

export type AAiAuditEventType =
  | 'RESOURCE_CREATED'
  | 'RESOURCE_UPDATED'
  | 'RESOURCE_DELETED'
  | 'RESOURCE_ARCHIVED'
  | 'OWNERSHIP_TRANSFER_REQUESTED'
  | 'OWNERSHIP_TRANSFER_ACCEPTED'
  | 'OWNERSHIP_TRANSFER_REJECTED'
  | 'OWNERSHIP_TRANSFER_CANCELLED'
  | 'OWNERSHIP_TRANSFERRED'
  | 'ACCESS_GRANTED'
  | 'ACCESS_REVOKED'
  | 'ROLE_ASSIGNED'
  | 'ROLE_REMOVED'
  | 'PERMISSION_CHANGED'
  | 'ORGANIZATION_CREATED'
  | 'ORGANIZATION_UPDATED'
  | 'WORKSPACE_CREATED'
  | 'WORKSPACE_UPDATED'
  | 'CONTAINER_CREATED'
  | 'CONTAINER_UPDATED'
  | 'SOLUTION_SELECTED'
  | 'SOLUTION_REFINED'
  | 'SOLUTION_FORKED'
  | 'VERSION_CREATED'
  | 'VERSION_RESTORED'
  | 'DEPENDENCY_ADDED'
  | 'DEPENDENCY_REMOVED'
  | 'BUILD_REQUESTED'
  | 'BUILD_STARTED'
  | 'BUILD_COMPLETED'
  | 'BUILD_FAILED'
  | 'DEPLOYMENT_CREATED'
  | 'DEPLOYMENT_UPDATED'
  | 'DEPLOYMENT_REMOVED'
  | 'LOGIN'
  | 'LOGOUT'
  | 'SECURITY_EVENT'
  | 'RECOVERY_EVENT'
  | 'OTHER';

export type AAiAuditActorType =
  | 'USER'
  | 'SYSTEM'
  | 'SERVICE'
  | 'ADMIN';

export type AAiAuditSeverity =
  | 'INFO'
  | 'NOTICE'
  | 'WARNING'
  | 'CRITICAL';

export type AAiAuditStorageClass =
  | 'PRIMARY'
  | 'ARCHIVE'
  | 'CHECKPOINT';

/**
 * ============================================================
 * Audit Actor
 * ============================================================
 */

export interface AAiAuditActor {
  actorType: AAiAuditActorType;

  /**
   * For USER this is the authenticated AAi user ID.
   */
  actorId: string;

  /**
   * Optional organization context.
   */
  organizationId?: string;

  /**
   * Optional workspace context.
   */
  workspaceId?: string;

  /**
   * Optional role active at the time of the event.
   */
  roleId?: string;
}

/**
 * ============================================================
 * Audit Resource
 * ============================================================
 */

export interface AAiAuditResource {
  resourceType: string;

  resourceId: string;

  /**
   * Optional parent resource.
   */
  parentResourceType?: string;

  parentResourceId?: string;

  /**
   * Optional container/workspace context.
   */
  containerId?: string;

  workspaceId?: string;

  organizationId?: string;
}

/**
 * ============================================================
 * Audit Event Payload
 * ============================================================
 *
 * Payload must contain business/security metadata only.
 *
 * NEVER store:
 * - passwords
 * - API keys
 * - access tokens
 * - refresh tokens
 * - private keys
 * - payment secrets
 */

export interface AAiAuditEventPayload {
  /**
   * Human-readable summary.
   */
  summary?: string;

  /**
   * Safe structured information about the operation.
   */
  data?: Record<string, unknown>;

  /**
   * Optional references to affected resources.
   */
  affectedResourceIds?: string[];
}

/**
 * ============================================================
 * Hash Algorithm
 * ============================================================
 */

export type AAiHashAlgorithm =
  | 'SHA-256'
  | 'SHA-512';

/**
 * ============================================================
 * Hash Chain
 * ============================================================
 */

export interface AAiAuditIntegrity {
  algorithm: AAiHashAlgorithm;

  /**
   * Sequence number within the audit chain.
   */
  sequence: number;

  /**
   * Hash of the immediately previous event.
   */
  previousHash?: string;

  /**
   * Cryptographic hash of the canonicalized current event.
   */
  eventHash: string;

  /**
   * Optional signature for stronger authenticity.
   */
  signature?: string;

  /**
   * Identifier of the signing authority/key reference.
   * This is a reference only; never store private keys.
   */
  signatureKeyRef?: string;
}

/**
 * ============================================================
 * Audit Event
 * ============================================================
 */

export interface AAiAuditEvent {
  auditEventId: string;

  eventType: AAiAuditEventType;

  actor: AAiAuditActor;

  resource?: AAiAuditResource;

  severity: AAiAuditSeverity;

  payload?: AAiAuditEventPayload;

  /**
   * ISO-8601 timestamp generated by the trusted
   * audit service.
   */
  timestamp: string;

  /**
   * Integrity information.
   */
  integrity: AAiAuditIntegrity;

  /**
   * Audit storage classification.
   */
  storageClass: AAiAuditStorageClass;

  /**
   * Optional correlation ID for tracing a complete
   * business operation across distributed services.
   */
  correlationId?: string;

  /**
   * Optional request/operation ID.
   */
  operationId?: string;
}

/**
 * ============================================================
 * Integrity Check
 * ============================================================
 */

export interface AAiAuditIntegrityCheck {
  checkId: string;

  chainStartSequence: number;

  chainEndSequence: number;

  checkedAt: string;

  checkedBy: string;

  valid: boolean;

  invalidEventIds?: string[];

  error?: string;
}

/**
 * ============================================================
 * Merkle Checkpoint
 * ============================================================
 *
 * Periodically summarizes a set of audit events.
 */

export interface AAiAuditMerkleCheckpoint {
  checkpointId: string;

  algorithm: AAiHashAlgorithm;

  firstSequence: number;

  lastSequence: number;

  eventCount: number;

  /**
   * Merkle tree root representing the checkpoint.
   */
  merkleRoot: string;

  createdAt: string;

  /**
   * Optional external notarization reference.
   */
  externalAnchor?: AAiExternalAuditAnchor;
}

/**
 * ============================================================
 * External Anchor
 * ============================================================
 *
 * Blockchain is optional.
 *
 * This abstraction permits future anchoring to:
 * - blockchain
 * - trusted timestamp service
 * - independent notarization service
 * - another immutable external system
 */

export type AAiExternalAnchorType =
  | 'BLOCKCHAIN'
  | 'TIMESTAMP_AUTHORITY'
  | 'EXTERNAL_NOTARY'
  | 'OTHER';

export interface AAiExternalAuditAnchor {
  anchorType: AAiExternalAnchorType;

  provider?: string;

  /**
   * Reference to the external proof.
   */
  reference: string;

  anchoredAt: string;

  /**
   * Hash/Merkle root that was anchored.
   */
  anchoredHash: string;
}

/**
 * ============================================================
 * Audit Retention Policy
 * ============================================================
 */

export interface AAiAuditRetentionPolicy {
  policyId: string;

  /**
   * Minimum retention period in days.
   */
  retentionDays: number;

  /**
   * Whether events may be physically deleted after
   * retention expiry.
   */
  allowDeletionAfterRetention: boolean;

  /**
   * Whether critical events require permanent retention.
   */
  retainCriticalEventsPermanently: boolean;

  updatedBy: string;

  updatedAt: string;
}

/**
 * ============================================================
 * Audit Query
 * ============================================================
 */

export interface AAiAuditQuery {
  actorId?: string;

  eventTypes?: AAiAuditEventType[];

  resourceType?: string;

  resourceId?: string;

  organizationId?: string;

  workspaceId?: string;

  containerId?: string;

  from?: string;

  to?: string;

  severity?: AAiAuditSeverity;

  limit?: number;

  cursor?: string;
}

/**
 * ============================================================
 * Audit Verification Result
 * ============================================================
 */

export interface AAiAuditVerificationResult {
  valid: boolean;

  checkedAt: string;

  firstSequence: number;

  lastSequence: number;

  eventCount: number;

  brokenLinks?: Array<{
    sequence: number;
    eventId: string;
    expectedPreviousHash: string;
    actualPreviousHash?: string;
  }>;

  invalidHashes?: string[];

  checkpointVerified?: boolean;

  externalAnchorVerified?: boolean;

  message?: string;
}

/**
 * ============================================================
 * CONTRACT STATUS
 * ============================================================
 */

export const AUDIT_CONTRACT = {
  contractId: 'AAI-CONTRACT-010',
  name: 'Audit & Integrity',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;