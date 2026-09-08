/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

export type AuditActionType =
  | 'THEME_CHANGED'
  | 'BRAND_UPDATED'
  | 'NAVIGATION_UPDATED'
  | 'EVENT_CREATED'
  | 'EVENT_UPDATED'
  | 'POOJA_SLOT_UPDATED'
  | 'BOOKING_STATUS_CHANGED'
  | 'BLOG_POST_PUBLISHED'
  | 'CONCERN_STATUS_CHANGED'
  | 'IDEA_STATUS_CHANGED'
  | 'BUSINESS_VERIFIED'
  | 'PRODUCT_UPDATED'
  | 'USER_ROLE_CHANGED'
  | 'SYSTEM_CONFIG_UPDATED';

export interface ParakkaiAuditRecord {
  auditId: string;
  action: AuditActionType;
  entityType: string;
  entityId: string;
  performedByUserId: string;
  performedByRole: string;
  summary: string;
  oldValueSnippet?: string;
  newValueSnippet?: string;
  timestamp: string;
}
