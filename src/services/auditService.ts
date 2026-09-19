/** AAi Audit Event Factory */
import type { AuditEvent } from "../contracts/security";
export function createAuditEvent(input: Omit<AuditEvent, "timestamp"> & { timestamp?: string }): AuditEvent {
  return { ...input, timestamp: input.timestamp ?? new Date().toISOString() };
}
