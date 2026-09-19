/** AAi B08 — Trust + audit decision boundary. */
import type { TrustKeyReference, AuditEvent, TenantContext } from "../contracts/security";
import { createAuditEvent } from "./auditService";

export function isTrustedKey(key?: TrustKeyReference, now = new Date()): boolean {
  if (!key || key.status !== "TRUSTED") return false;
  if (key.effectiveAt && new Date(key.effectiveAt) > now) return false;
  if (key.expiresAt && new Date(key.expiresAt) <= now) return false;
  return true;
}

export function requireTenantContext(context?: TenantContext): TenantContext {
  if (!context?.tenantId || !context.environmentId) throw new Error("Tenant and environment identity are required.");
  return { ...context, solutionIds:[...context.solutionIds] };
}

export function recordAudit(input: Omit<AuditEvent,"timestamp"> & { timestamp?: string }): AuditEvent {
  return createAuditEvent(input);
}
