/**
 * ArchitectAny AAi - Identity & Authentication Service
 * Manages user lifecycle, roles, data-driven permissions, and sessions
 */

import { User, UserRole, Permission, ROLE_PERMISSIONS, hasAdminAccess as hasAdminAccessContract } from '../contracts/user';
import { AuthSession, AuthState, IAuthService } from '../contracts/auth';

export const CHIEF_ARCHITECT_USER: User = {
  id: 'USR-000001',
  username: 'admin',
  displayName: 'Vijay Kumar K',
  email: 'vijaya.k.kumar@architectany.com',
  role: 'CHIEF_ARCHITECT',
  activeRole: 'CHIEF_ARCHITECT',
  roles: ['DEVELOPER', 'ADMIN', 'CHIEF_ARCHITECT'],
  title: 'Chief Architect & Inventor',
  locale: 'en-IN',
  countryCode: 'IN',
  timezone: 'Asia/Kolkata',
  status: 'active',
  avatar: '/assets/vijay-profile-sm.jpg',
  signature: '/assets/vijay-profile-sm.jpg',
  permissions: ROLE_PERMISSIONS.CHIEF_ARCHITECT,
  authenticated: true,
};

class AuthService implements IAuthService {
  private currentSession: AuthSession = {
    state: 'authenticated',
    user: CHIEF_ARCHITECT_USER,
    token: 'aai-session-token-live',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };

  private listeners: Array<(session: AuthSession) => void> = [];

  getSession(): AuthSession {
    return this.currentSession;
  }

  getUser(): User | null {
    return this.currentSession.user;
  }

  getRole(): UserRole | null {
    return this.currentSession.user?.role || null;
  }

  getRoles(): UserRole[] {
    if (!this.currentSession.user) return [];
    return this.currentSession.user.roles || (this.currentSession.user.role ? [this.currentSession.user.role] : []);
  }

  getPermissions(): Permission[] {
    return this.currentSession.user?.permissions || [];
  }

  isAuthenticated(): boolean {
    return this.currentSession.state === 'authenticated' && !!this.currentSession.user;
  }

  hasAdminAccess(): boolean {
    return hasAdminAccessContract(this.currentSession.user, this.isAuthenticated());
  }

  hasPermission(permission: Permission): boolean {
    if (!this.isAuthenticated() || !this.currentSession.user) {
      return false;
    }
    return this.currentSession.user.permissions.includes(permission);
  }

  login(userUpdate?: Partial<User>): void {
    const user: User = {
      ...CHIEF_ARCHITECT_USER,
      ...userUpdate,
    };
    user.permissions = ROLE_PERMISSIONS[user.role] || user.permissions;
    user.roles = user.roles || (user.role === 'CHIEF_ARCHITECT' ? ['DEVELOPER', 'ADMIN', 'CHIEF_ARCHITECT'] : [user.role]);
    user.activeRole = user.activeRole || user.role;
    user.authenticated = true;

    this.currentSession = {
      state: 'authenticated',
      user,
      token: 'aai-session-token-live',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    this.notify();
  }

  logout(): void {
    this.currentSession = {
      state: 'unauthenticated',
      user: null,
      token: undefined,
      expiresAt: undefined,
    };
    this.notify();
  }

  setRole(role: UserRole, customRoles?: UserRole[]): void {
    if (this.currentSession.user) {
      const assignedRoles: UserRole[] = customRoles || (role === 'CHIEF_ARCHITECT' ? ['DEVELOPER', 'ADMIN', 'CHIEF_ARCHITECT'] : [role]);
      
      // Derive permissions from all assigned roles
      const derivedPermissions: Permission[] = [];
      assignedRoles.forEach((r) => {
        (ROLE_PERMISSIONS[r] || []).forEach((p) => {
          if (!derivedPermissions.includes(p)) {
            derivedPermissions.push(p);
          }
        });
      });

      const updatedUser: User = {
        ...this.currentSession.user,
        role,
        activeRole: role,
        roles: assignedRoles,
        permissions: derivedPermissions,
      };
      this.currentSession = {
        ...this.currentSession,
        user: updatedUser,
      };
      this.notify();
    }
  }

  setTestProfile(config: { roles: UserRole[]; activeRole?: UserRole; permissions?: Permission[] }): void {
    if (this.currentSession.user) {
      const activeRole = config.activeRole || config.roles[0] || 'CUSTOMER';
      let permissions = config.permissions;
      if (!permissions) {
        permissions = [];
        config.roles.forEach((r) => {
          (ROLE_PERMISSIONS[r] || []).forEach((p) => {
            if (!permissions!.includes(p)) permissions!.push(p);
          });
        });
      }

      this.currentSession = {
        ...this.currentSession,
        user: {
          ...this.currentSession.user,
          role: activeRole,
          activeRole,
          roles: config.roles,
          permissions,
        },
      };
      this.notify();
    }
  }

  setSessionState(state: AuthState): void {
    this.currentSession = {
      ...this.currentSession,
      state,
      user: state === 'authenticated' ? this.currentSession.user || CHIEF_ARCHITECT_USER : null,
    };
    this.notify();
  }

  subscribe(listener: (session: AuthSession) => void): () => void {
    this.listeners.push(listener);
    listener(this.currentSession);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.currentSession));
  }
}

export const authService = new AuthService();

