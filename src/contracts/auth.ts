/**
 * ArchitectAny AAi - Global Authentication & Session Contracts
 */

import { User, UserRole, Permission } from './user';

export type AuthState =
  | 'unauthenticated'
  | 'authenticating'
  | 'authenticated'
  | 'session expired'
  | 'unauthorized';

export interface AuthSession {
  state: AuthState;
  user: User | null;
  token?: string;
  expiresAt?: string;
}

export interface IAuthService {
  getSession(): AuthSession;
  getUser(): User | null;
  getRole(): UserRole | null;
  getPermissions(): Permission[];
  hasPermission(permission: Permission): boolean;
  isAuthenticated(): boolean;
  login(user?: Partial<User>): void;
  logout(): void;
  setSessionState(state: AuthState): void;
  setRole(role: UserRole): void;
  subscribe(listener: (session: AuthSession) => void): () => void;
}
