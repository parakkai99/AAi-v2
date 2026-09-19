/** AAi Security / Trust / Tenant / Audit Contracts */
export type ActorType = "USER" | "AI" | "SYSTEM" | "AGENT" | "SERVICE";
export type TrustStatus = "UNKNOWN" | "TRUSTED" | "REVOKED" | "EXPIRED";
export interface TenantContext { readonly tenantId: string; readonly environmentId: string; readonly solutionIds: readonly string[]; }
export interface TrustKeyReference { readonly keyId: string; readonly status: TrustStatus; readonly algorithm?: string; readonly effectiveAt?: string; readonly expiresAt?: string; }
export interface AuthorizationRequirement { readonly resourceType: string; readonly resourceId?: string; readonly actions: readonly string[]; readonly tenantScoped: boolean; }
export interface AuditEvent { readonly auditId: string; readonly actorType: ActorType; readonly actorId?: string; readonly action: string; readonly resourceType: string; readonly resourceId: string; readonly timestamp: string; readonly beforeVersion?: string; readonly afterVersion?: string; readonly metadata?: Readonly<Record<string, unknown>>; }
