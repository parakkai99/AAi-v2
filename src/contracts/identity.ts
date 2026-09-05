
/**
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: 01 — Identity & Ownership
 * Contract ID: AAI-CONTRACT-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: FROZEN
 * Version: 1.0.0
 *
 * ============================================================
 */

import type {
  AAiOwnerReference,
} from './common';

/**
 * ============================================================
 * Identity Status
 * ============================================================
 */

export type IdentityStatus =
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'DEACTIVATED';

/**
 * ============================================================
 * Ownership Status
 * ============================================================
 */

export type OwnershipStatus =
  | 'ACTIVE'
  | 'TRANSFER_PENDING'
  | 'TRANSFERRED'
  | 'RECOVERED';

/**
 * ============================================================
 * AAi User Identity
 * ============================================================
 */

export interface AAiUserIdentity {
  /**
   * Immutable AAi user identifier.
   */
  userId: string;

  /**
   * Optional external identity provider.
   */
  identityProvider?: string;

  /**
   * External subject identifier.
   */
  externalSubject?: string;

  /**
   * Current identity status.
   */
  status: IdentityStatus;

  /**
   * Display information.
   */
  displayName?: string;

  email?: string;

  /**
   * Identity lifecycle timestamps.
   */
  createdAt: string;

  updatedAt: string;

  deactivatedAt?: string;
}

/**
 * ============================================================
 * AAi Ownership
 * ============================================================
 *
 * Ownership is separate from identity.
 *
 * The owner may be a:
 * - USER
 * - ORGANIZATION
 * - WORKSPACE
 */

export interface AAiOwnership {
  /**
   * Current canonical owner reference.
   */
  owner: AAiOwnerReference;

  /**
   * Immutable creator of the resource.
   */
  createdBy: string;

  /**
   * Identity responsible for building the resource.
   */
  builtBy?: string;

  /**
   * Current ownership state.
   */
  status: OwnershipStatus;

  /**
   * Ownership revision.
   */
  version: number;

  /**
   * Transfer information.
   */
  transferId?: string;

  transferRequestedAt?: string;

  transferCompletedAt?: string;

  /**
   * Ownership history.
   */
  history?: AAiOwnershipHistoryEntry[];
}

/**
 * ============================================================
 * Ownership History
 * ============================================================
 */

export interface AAiOwnershipHistoryEntry {
  /**
   * Previous owner.
   */
  from: AAiOwnerReference;

  /**
   * New owner.
   */
  to: AAiOwnerReference;

  /**
   * Identity initiating the change.
   */
  changedBy: string;

  /**
   * Ownership transition timestamp.
   */
  changedAt: string;

  /**
   * Optional transfer reference.
   */
  transferId?: string;

  /**
   * Optional reason.
   */
  reason?: string;
}

/**
 * ============================================================
 * Contract Metadata
 * ============================================================
 */

export const IDENTITY_CONTRACT = {
  contractId: 'AAI-CONTRACT-001',
  name: 'Identity & Ownership',
  version: '1.0.0',
  status: 'FROZEN',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;

