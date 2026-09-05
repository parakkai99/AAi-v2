/**
 * AAi Organization Contract
 *
 * Contract: 02
 *
 * Principles:
 * - Organization is a business/security context, not a replacement for User Identity.
 * - One user may belong to multiple organizations.
 * - One organization may contain multiple users.
 * - Organization membership and organization ownership are separate concepts.
 * - Organization policies control what members may do.
 * - Cloud-neutral: Zoho Catalyst, AWS, or future AAi infrastructure.
 */

export type OrganizationStatus =
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'ARCHIVED';

export type OrganizationMemberStatus =
  | 'INVITED'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'REMOVED';

export type OrganizationMemberType =
  | 'INTERNAL'
  | 'EXTERNAL'
  | 'CONSULTANT'
  | 'PARTNER'
  | 'SERVICE_PROVIDER';

export interface AAiOrganization {
  /**
   * Immutable organization identifier.
   */
  organizationId: string;

  /**
   * Organization display name.
   */
  name: string;

  /**
   * Optional legal/business identifiers.
   * These are references, not authorization keys.
   */
  legalName?: string;
  registrationId?: string;

  status: OrganizationStatus;

  /**
   * User who originally created the organization record.
   */
  createdBy: string;

  createdAt: string;
  updatedAt: string;

  /**
   * Organization-level policy configuration.
   */
  policy?: AAiOrganizationPolicy;
}

export interface AAiOrganizationMembership {
  /**
   * Organization to which the user belongs.
   */
  organizationId: string;

  /**
   * AAi authenticated user identity.
   */
  userId: string;

  status: OrganizationMemberStatus;

  memberType: OrganizationMemberType;

  /**
   * Organization role references.
   *
   * Examples:
   * - ORG_ADMIN
   * - ARCHITECT
   * - DEVELOPER
   * - OPERATOR
   * - VIEWER
   */
  roleIds: string[];

  invitedBy?: string;
  joinedAt?: string;
  removedAt?: string;

  createdAt: string;
  updatedAt: string;
}

export interface AAiOrganizationPolicy {
  /**
   * Whether external users may be members.
   */
  allowExternalMembers: boolean;

  /**
   * Whether consultants may be granted organization access.
   */
  allowConsultants: boolean;

  /**
   * Whether organization-owned resources may be transferred.
   */
  allowOwnershipTransfer: boolean;

  /**
   * Whether organization admins may initiate recovery.
   */
  allowOwnershipRecovery: boolean;

  /**
   * Whether members may share resources outside
   * the organization.
   */
  allowExternalSharing: boolean;

  /**
   * Optional organization-specific security requirements.
   */
  requireMfa?: boolean;

  /**
   * Optional data/security policy references.
   */
  securityPolicyRef?: string;

  /**
   * Optional data residency requirement.
   */
  dataResidency?: string;
}

/**
 * AAi Contract Signature
 *
 * Contract: 02 — Organization
 * Status: DRAFT
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 */
/**
 * 
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: 03 — Workspace
 * Contract ID: AAI-CONTRACT-003
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
*/
export const ORGANIZATION_CONTRACT = {
  contractId: 'AAI-CONTRACT-002',
  name: 'Organization',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;