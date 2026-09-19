/** AAi Update / Rollback Policy Service */
import type { UpdatePolicy } from "../contracts/deployment";
export const DEFAULT_UPDATE_POLICY: UpdatePolicy = {
  retainedRollbackVersions: 3,
  approvalRequired: true,
  compatibilityRequired: true,
  integrityRequired: true,
  signatureRequired: true,
};
export function resolveUpdatePolicy(overrides?: Partial<UpdatePolicy>): UpdatePolicy {
  return { ...DEFAULT_UPDATE_POLICY, ...overrides };
}
