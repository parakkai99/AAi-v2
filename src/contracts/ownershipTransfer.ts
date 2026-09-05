/**
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: 07 — Ownership Transfer
 * Contract ID: AAI-CONTRACT-007
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * ============================================================
 *
 * Architectural Principles:
 *
 * - Ownership transfer is a first-class AAi operation.
 * - Transfer requires authenticated authorization.
 * - Recipient identity must be verified.
 * - Recipient must explicitly accept the transfer.
 * - Creator/builder provenance is never destroyed.
 * - Ownership history is never overwritten.
 * - Access and operational responsibility remain separate.
 * - Transfer must not expose credentials or unrelated resources.
 *
 * ============================================================
 */

export type OwnershipTransferStatus =
  | 'REQUESTED'
  | 'PENDING_ACCEPTANCE'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'FAILED';

export type OwnershipTransferReason =
  | 'CLIENT_HANDOVER'
  | 'EMPLOYEE_HANDOVER'
  | 'ORGANIZATION_CHANGE'
  | 'BUSINESS_TRANSFER'
  | 'PROJECT_COMPLETION'
  | 'RECOVERY'
  | 'OTHER';

export type OwnershipTransferOwnerType =
  | 'USER'
  | 'ORGANIZATION'
  | 'WORKSPACE';

/**
 * ============================================================
 * Owner Reference
 * ============================================================
 */

export interface AAiTransferOwnerReference {
  type: OwnershipTransferOwnerType;

  id: string;

  /**
   * Presentation-only label.
   * The ID remains authoritative.
   */
  name?: string;
}

/**
 * ============================================================
 * Transfer Scope
 * ============================================================
 *
 * Explicitly identifies what is being transferred.
 *
 * Ownership of a Solution Container must not accidentally
 * transfer ownership of the user's Workspace or other assets.
 */

export type OwnershipTransferResourceType =
  | 'WORKSPACE'
  | 'CONTAINER'
  | 'SOLUTION'
  | 'APPLICATION'
  | 'DEPLOYMENT';

export interface AAiOwnershipTransferScope {
  resourceType: OwnershipTransferResourceType;

  resourceId: string;

  /**
   * Optional child-resource handling policy.
   */
  dependencyPolicy?: 'RETAIN' | 'TRANSFER' | 'REVIEW';
}

/**
 * ============================================================
 * Recipient Verification
 * ============================================================
 */

export interface AAiTransferRecipientVerification {
  recipientUserId: string;

  authenticated: boolean;

  /**
   * Whether the recipient is eligible to receive ownership.
   */
  eligible: boolean;

  /**
   * Optional organization context.
   */
  organizationId?: string;

  verifiedAt?: string;

  verificationMethod?:
    | 'LOGIN'
    | 'MFA'
    | 'ORGANIZATION_AUTHORITY'
    | 'SYSTEM_RECOVERY';
}

/**
 * ============================================================
 * Ownership Transfer Request
 * ============================================================
 */

export interface AAiOwnershipTransferRequest {
  transferId: string;

  scope: AAiOwnershipTransferScope;

  from: AAiTransferOwnerReference;

  to: AAiTransferOwnerReference;

  /**
   * Authenticated user initiating the transfer.
   */
  initiatedBy: string;

  reason: OwnershipTransferReason;

  status: OwnershipTransferStatus;

  /**
   * Recipient verification.
   */
  recipientVerification?: AAiTransferRecipientVerification;

  /**
   * Explicit acceptance by recipient.
   */
  acceptedBy?: string;

  requestedAt: string;

  acceptedAt?: string;

  completedAt?: string;

  expiresAt?: string;

  cancelledAt?: string;

  rejectedAt?: string;

  failureReason?: string;

  /**
   * References to immutable audit events.
   */
  auditEventIds: string[];
}

/**
 * ============================================================
 * Ownership Transfer Result
 * ============================================================
 */

export interface AAiOwnershipTransferResult {
  transferId: string;

  status: 'COMPLETED' | 'FAILED';

  resourceType: OwnershipTransferResourceType;

  resourceId: string;

  previousOwner: AAiTransferOwnerReference;

  newOwner: AAiTransferOwnerReference;

  /**
   * Original creator remains unchanged.
   */
  createdBy: string;

  /**
   * Ownership version increments after successful transfer.
   */
  ownershipVersion: number;

  completedAt: string;

  auditEventId: string;
}

/**
 * ============================================================
 * Consultant Handover
 * ============================================================
 *
 * Explicitly supports:
 *
 * Consultant builds solution
 *        ↓
 * Client accepts ownership
 *        ↓
 * Consultant retains temporary access
 *        ↓
 * Consultant access is later revoked
 */

export interface AAiConsultantHandover {
  transferId: string;

  consultantUserId: string;

  clientOwner: AAiTransferOwnerReference;

  /**
   * Whether consultant access remains after transfer.
   */
  retainConsultantAccess: boolean;

  /**
   * Optional expiry for temporary consultant access.
   */
  consultantAccessExpiresAt?: string;

  /**
   * Responsibilities that may remain temporarily assigned.
   */
  retainedResponsibilities?: string[];
}

/**
 * ============================================================
 * Transfer Preconditions
 * ============================================================
 */

export interface AAiOwnershipTransferPreconditions {
  /**
   * Initiator must currently have transfer authority.
   */
  initiatorAuthorized: boolean;

  /**
   * Recipient must be authenticated.
   */
  recipientAuthenticated: boolean;

  /**
   * Organization policy must allow the transfer.
   */
  organizationPolicyAllowsTransfer: boolean;

  /**
   * Resource must not be locked by another transfer.
   */
  noConflictingTransfer: boolean;

  /**
   * Required dependencies have been reviewed.
   */
  dependenciesReviewed: boolean;
}

/**
 * ============================================================
 * Transfer Event
 * ============================================================
 *
 * This is a reference to the future Audit & Integrity
 * contract. We deliberately do not implement hashing here.
 */

export interface AAiOwnershipTransferEvent {
  transferId: string;

  eventType:
    | 'TRANSFER_REQUESTED'
    | 'TRANSFER_ACCEPTED'
    | 'TRANSFER_REJECTED'
    | 'TRANSFER_CANCELLED'
    | 'OWNERSHIP_TRANSFERRED'
    | 'TRANSFER_FAILED';

  actorUserId: string;

  resourceType: OwnershipTransferResourceType;

  resourceId: string;

  timestamp: string;

  /**
   * Future audit-chain reference.
   */
  auditEventId?: string;
}

/**
 * ============================================================
 * CONTRACT STATUS
 * ============================================================
 */

export const OWNERSHIP_TRANSFER_CONTRACT = {
  contractId: 'AAI-CONTRACT-007',
  name: 'Ownership Transfer',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;