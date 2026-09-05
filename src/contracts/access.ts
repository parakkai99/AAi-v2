/**
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: 06 — Access / Roles / Permissions
 * Contract ID: AAI-CONTRACT-006
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * ============================================================
 *
 * Architectural Principles:
 *
 * - Ownership is NOT access.
 * - Access is NOT a role.
 * - A role is NOT ownership.
 * - Operational responsibility is independently assignable.
 * - Permissions may be inherited through context.
 * - Explicit permissions may override inherited permissions
 *   according to policy.
 * - Access must always be evaluated against authenticated
 *   identity and current context.
 *
 * ============================================================
 */

export type AccessEffect =
  | 'ALLOW'
  | 'DENY';

export type AccessScopeType =
  | 'USER'
  | 'ORGANIZATION'
  | 'WORKSPACE'
  | 'CONTAINER'
  | 'RESOURCE';

export type PermissionEffect =
  | 'ALLOW'
  | 'DENY';

export type PermissionSource =
  | 'DIRECT'
  | 'ROLE'
  | 'INHERITED'
  | 'SYSTEM'
  | 'POLICY';

export type AccessMembershipStatus =
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'REVOKED';

/**
 * ============================================================
 * Permission
 * ============================================================
 *
 * A permission represents one atomic action that a subject
 * may or may not perform.
 */

export interface AAiPermission {
  permissionId: string;

  /**
   * Examples:
   *
   * solution.read
   * solution.edit
   * solution.refine
   * solution.build
   * solution.deploy
   * solution.transfer
   * workspace.manage
   */
  name: string;

  description?: string;

  resourceType?: string;

  action: string;
}

/**
 * ============================================================
 * Role
 * ============================================================
 */

export interface AAiRole {
  roleId: string;

  name: string;

  description?: string;

  /**
   * Permissions granted by this role.
   */
  permissionIds: string[];

  /**
   * Optional parent role.
   *
   * This permits role inheritance without requiring
   * every organization to redefine common permissions.
   */
  parentRoleId?: string;

  systemRole?: boolean;
}

/**
 * ============================================================
 * Access Grant
 * ============================================================
 *
 * Explicit relationship between a subject and a scope.
 */

export interface AAiAccessGrant {
  grantId: string;

  /**
   * User receiving the access.
   */
  userId: string;

  /**
   * Scope where access applies.
   */
  scope: {
    type: AccessScopeType;
    id: string;
  };

  /**
   * Optional role assignments.
   */
  roleIds: string[];

  /**
   * Explicit permission additions/removals.
   */
  permissions?: AAiPermissionOverride[];

  status: AccessMembershipStatus;

  grantedBy: string;

  grantedAt: string;

  expiresAt?: string;

  revokedBy?: string;

  revokedAt?: string;
}

/**
 * ============================================================
 * Permission Override
 * ============================================================
 */

export interface AAiPermissionOverride {
  permissionId: string;

  effect: PermissionEffect;

  reason?: string;

  source: PermissionSource;
}

/**
 * ============================================================
 * Inheritance Context
 * ============================================================
 *
 * Permissions can flow down through the AAi hierarchy.
 */

export interface AAiAccessContext {
  userId: string;

  organizationId?: string;

  workspaceId?: string;

  containerId?: string;

  resourceId?: string;
}

/**
 * ============================================================
 * Effective Permission
 * ============================================================
 *
 * Result after AAi evaluates direct permissions, roles,
 * inheritance and policies.
 */

export interface AAiEffectivePermission {
  permissionId: string;

  effect: PermissionEffect;

  source: PermissionSource;

  inheritedFrom?: {
    type: AccessScopeType;
    id: string;
  };

  evaluatedAt: string;
}

/**
 * ============================================================
 * Access Evaluation Result
 * ============================================================
 */

export interface AAiAccessDecision {
  allowed: boolean;

  userId: string;

  permissionId: string;

  resourceId?: string;

  source?: PermissionSource;

  reason?: string;

  evaluatedAt: string;
}

/**
 * ============================================================
 * Operational Responsibility
 * ============================================================
 *
 * Responsibility is deliberately separate from ownership.
 *
 * Example:
 *
 * Owner       = Organization A
 * Architect   = Vijay
 * Developer   = Team B
 * Operator    = Operations Team
 */

export type AAiResponsibilityType =
  | 'ARCHITECT'
  | 'DEVELOPER'
  | 'OPERATOR'
  | 'MANAGER'
  | 'CONSULTANT'
  | 'SUPPORT'
  | 'VIEWER';

export interface AAiOperationalResponsibility {
  responsibilityId: string;

  resourceType: AccessScopeType;

  resourceId: string;

  userId: string;

  responsibilityType: AAiResponsibilityType;

  assignedBy: string;

  assignedAt: string;

  expiresAt?: string;

  revokedAt?: string;
}

/**
 * ============================================================
 * Access Policy
 * ============================================================
 *
 * Allows organizations/workspaces/containers to establish
 * controlled access rules.
 */

export interface AAiAccessPolicy {
  policyId: string;

  scope: {
    type: AccessScopeType;
    id: string;
  };

  /**
   * Whether inherited permissions are enabled.
   */
  inheritanceEnabled: boolean;

  /**
   * Whether explicit DENY overrides inherited ALLOW.
   */
  denyOverridesAllow: boolean;

  /**
   * Whether external users may receive access.
   */
  allowExternalUsers: boolean;

  /**
   * Whether access expiration is required.
   */
  requireExpiration?: boolean;

  updatedBy: string;

  updatedAt: string;
}

/**
 * ============================================================
 * STANDARD AAi ROLES
 * ============================================================
 *
 * These are baseline role identifiers.
 *
 * Organizations may later add custom roles.
 */

export const AAiStandardRoles = {
  OWNER: 'OWNER',
  ORG_ADMIN: 'ORG_ADMIN',
  WORKSPACE_ADMIN: 'WORKSPACE_ADMIN',
  ARCHITECT: 'ARCHITECT',
  DEVELOPER: 'DEVELOPER',
  OPERATOR: 'OPERATOR',
  CONSULTANT: 'CONSULTANT',
  SUPPORT: 'SUPPORT',
  VIEWER: 'VIEWER',
} as const;

/**
 * ============================================================
 * STANDARD AAi PERMISSIONS
 * ============================================================
 */

export const AAiStandardPermissions = {
  READ: 'read',
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
  REFINE: 'refine',
  BUILD: 'build',
  DEPLOY: 'deploy',
  SHARE: 'share',
  TRANSFER: 'transfer',
  MANAGE_ACCESS: 'manage_access',
  MANAGE_WORKSPACE: 'manage_workspace',
  MANAGE_ORGANIZATION: 'manage_organization',
} as const;

/**
 * ============================================================
 * CONTRACT STATUS
 * ============================================================
 */

export const ACCESS_CONTRACT = {
  contractId: 'AAI-CONTRACT-006',
  name: 'Access / Roles / Permissions',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;