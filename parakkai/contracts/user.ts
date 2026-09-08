/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

export type UserRole =
  | 'VISITOR'
  | 'USER'
  | 'CONTRIBUTOR'
  | 'VOLUNTEER'
  | 'BUSINESS'
  | 'EDITOR'
  | 'TEMPLE_ADMIN'
  | 'SUPER_ADMIN';

export interface ParakkaiUser {
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  nativeVillage?: string;
  isParakkaiResident: boolean;
  avatarUrl?: string;
  savedItemIds: string[];
  joinedAt: string;
}
