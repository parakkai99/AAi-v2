/**
 * ArchitectAny AAi - Global User & Role Contracts
 */

export type UserRole =
  | 'ADMIN'
  | 'CHIEF_ARCHITECT'
  | 'ARCHITECT'
  | 'DEVELOPER'
  | 'SOLUTION_BUILDER'
  | 'PROVIDER'
  | 'SELLER'
  | 'CLIENT'
  | 'CUSTOMER'
  | 'VIEWER';

export type Permission =
  | 'admin.access'
  | 'universe.view'
  | 'domain.view'
  | 'domain.manage'
  | 'subdomain.manage'
  | 'capability.manage'
  | 'solution.view'
  | 'solution.manage'
  | 'solution.compose'
  | 'service.view'
  | 'service.manage'
  | 'provider.view'
  | 'provider.manage'
  | 'user.manage'
  | 'system.admin'
  | 'system.manage';

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: UserRole;
  activeRole?: UserRole;
  roles?: UserRole[];
  title: string;
  locale: string;
  countryCode: string;
  timezone: string;
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  signature?: string;
  permissions: Permission[];
  authenticated?: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    'admin.access',
    'universe.view',
    'domain.view',
    'domain.manage',
    'subdomain.manage',
    'capability.manage',
    'solution.view',
    'solution.manage',
    'solution.compose',
    'service.view',
    'service.manage',
    'provider.view',
    'provider.manage',
    'user.manage',
    'system.admin',
    'system.manage',
  ],
  CHIEF_ARCHITECT: [
    'admin.access',
    'universe.view',
    'domain.view',
    'domain.manage',
    'subdomain.manage',
    'capability.manage',
    'solution.view',
    'solution.manage',
    'solution.compose',
    'service.view',
    'service.manage',
    'provider.view',
    'provider.manage',
    'user.manage',
    'system.admin',
    'system.manage',
  ],
  ARCHITECT: [
    'universe.view',
    'domain.view',
    'solution.view',
    'solution.compose',
    'solution.manage',
    'capability.manage',
    'service.view',
    'provider.view',
  ],
  DEVELOPER: [
    'universe.view',
    'domain.view',
    'solution.view',
    'solution.compose',
    'capability.manage',
    'service.view',
  ],
  SOLUTION_BUILDER: [
    'universe.view',
    'domain.view',
    'solution.view',
    'solution.compose',
    'service.view',
    'provider.view',
  ],
  PROVIDER: [
    'universe.view',
    'service.view',
    'service.manage',
    'provider.view',
    'provider.manage',
  ],
  SELLER: [
    'universe.view',
    'service.view',
    'service.manage',
    'provider.view',
  ],
  CLIENT: [
    'universe.view',
    'domain.view',
    'solution.view',
    'service.view',
  ],
  CUSTOMER: [
    'universe.view',
    'solution.view',
    'service.view',
  ],
  VIEWER: [
    'universe.view',
    'domain.view',
    'solution.view',
  ],
};

/**
 * Authoritative authorization helper to determine Admin Access:
 * 1. Permissions-first: user.permissions.includes('admin.access') (Final Authority)
 * 2. Roles check: roles.includes('ADMIN') or (roles.includes('DEVELOPER') && roles.includes('ADMIN'))
 * 3. Active role check: user.activeRole === 'ADMIN' or user.role === 'ADMIN'
 * Note: Never checks username or identity strings.
 */
export function hasAdminAccess(user: User | null, isAuthenticated: boolean = true): boolean {
  if (!isAuthenticated || !user) return false;

  // 1. Permission-first check (Final authority)
  if (Array.isArray(user.permissions) && user.permissions.includes('admin.access')) {
    return true;
  }

  // 2. Roles check
  const roles = user.roles || (user.role ? [user.role] : []);
  if (roles.includes('ADMIN')) {
    return true;
  }
  if (roles.includes('DEVELOPER') && roles.includes('ADMIN')) {
    return true;
  }

  // 3. Active role check
  if (user.activeRole === 'ADMIN' || user.role === 'ADMIN') {
    return true;
  }

  return false;
}
