/**
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
 *
 * ============================================================
 *
 * Architectural Principle:
 *
 * A Workspace is the working boundary between Identity/
 * Organization context and AAi Containers.
 *
 * A Workspace may belong to a user, organization, or both
 * through explicit context relationships.
 *
 * Workspace membership is separate from ownership.
 *
 * ============================================================
 */

export type WorkspaceType =
  | 'PERSONAL'
  | 'ORGANIZATION'
  | 'PROJECT'
  | 'TEAM';

export type WorkspaceStatus =
  | 'ACTIVE'
  | 'ARCHIVED'
  | 'SUSPENDED';

export type WorkspaceMemberStatus =
  | 'INVITED'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'REMOVED';

export interface AAiWorkspace {
  /**
   * Immutable workspace identifier.
   */
  workspaceId: string;

  /**
   * Workspace display name.
   */
  name: string;

  type: WorkspaceType;

  status: WorkspaceStatus;

  /**
   * User who originally created the workspace.
   *
   * This is immutable provenance and must not change
   * when ownership or membership changes.
   */
  createdBy: string;

  /**
   * Current workspace owner.
   *
   * Ownership may belong to a User, Organization,
   * or another explicitly supported ownership context.
   */
  owner: {
    type: 'USER' | 'ORGANIZATION';
    id: string;
  };

  /**
   * Optional organization context.
   *
   * A personal workspace may have no organization.
   */
  organizationId?: string;

  /**
   * Optional parent workspace.
   *
   * Useful for future project/team workspace composition.
   */
  parentWorkspaceId?: string;

  description?: string;

  createdAt: string;
  updatedAt: string;

  /**
   * Workspace-specific configuration.
   */
  settings?: AAiWorkspaceSettings;
}

export interface AAiWorkspaceMember {
  workspaceId: string;

  /**
   * AAi authenticated user ID.
   */
  userId: string;

  status: WorkspaceMemberStatus;

  /**
   * Role references are resolved by the
   * Access / Roles / Permissions contract.
   */
  roleIds: string[];

  joinedAt?: string;

  invitedBy?: string;

  removedAt?: string;

  createdAt: string;
  updatedAt: string;
}

export interface AAiWorkspaceSettings {
  /**
   * Whether members may create containers.
   */
  allowContainerCreation: boolean;

  /**
   * Whether members may invite other users.
   */
  allowMemberInvitation: boolean;

  /**
   * Whether resources may be shared outside
   * the workspace.
   */
  allowExternalSharing: boolean;

  /**
   * Optional default workspace language.
   */
  language?: string;

  /**
   * Optional default location/context.
   */
  locationId?: string;

  /**
   * Optional security policy reference.
   */
  securityPolicyRef?: string;
}

/**
 * ============================================================
 * Workspace Relationship
 * ============================================================
 *
 * Keeps Workspace ownership separate from membership.
 */
export interface AAiWorkspaceOwnership {
  workspaceId: string;

  owner: {
    type: 'USER' | 'ORGANIZATION';
    id: string;
  };

  createdBy: string;

  ownershipVersion: number;

  transferredAt?: string;

  transferredBy?: string;
}

/**
 * ============================================================
 * CONTRACT STATUS
 * ============================================================
 */

export const WORKSPACE_CONTRACT = {
  contractId: 'AAI-CONTRACT-003',
  name: 'Workspace',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;