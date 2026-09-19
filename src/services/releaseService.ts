/**
 * AAi Release Service
 * SERVICE: RELEASE-001
 *
 * Validates update metadata, compatibility and rollback intent.
 * Cryptographic verification is deliberately delegated to the deployment/
 * trust adapter; this service does not pretend a lightweight hash is a
 * cryptographic signature.
 */

import type {
  CompatibilityResult,
  ReleaseDefinition,
  RollbackPlan,
} from "../contracts/release";

export function checkReleaseCompatibility(
  release: ReleaseDefinition,
  runtimeVersion: string,
): CompatibilityResult {
  const reasons: string[] = [];
  const minimum = release.updateManifest.minimumRuntimeVersion;
  const maximum = release.updateManifest.maximumRuntimeVersion;

  if (minimum && compareVersions(runtimeVersion, minimum) < 0) {
    reasons.push(`Runtime ${runtimeVersion} is below minimum ${minimum}.`);
  }

  if (maximum && compareVersions(runtimeVersion, maximum) > 0) {
    reasons.push(`Runtime ${runtimeVersion} is above maximum ${maximum}.`);
  }

  if (!release.updateManifest.sha256) {
    reasons.push("Release SHA-256 is missing.");
  }

  if (!release.updateManifest.signature || !release.updateManifest.keyId) {
    reasons.push("Release signature metadata is incomplete.");
  }

  return {
    compatible: reasons.length === 0,
    reasons,
  };
}

export function createRollbackPlan(
  release: ReleaseDefinition,
  targetReleaseId: string,
  databaseRollbackRequired = false,
  assetRollbackRequired = false,
): RollbackPlan {
  return {
    rollbackId: `${release.releaseId}:rollback:${targetReleaseId}`,
    releaseId: release.releaseId,
    targetReleaseId,
    preserveData: !databaseRollbackRequired,
    databaseRollbackRequired,
    assetRollbackRequired,
    steps: [
      "Freeze new deployment activation.",
      "Preserve audit and release metadata.",
      ...(databaseRollbackRequired
        ? ["Execute validated database rollback migration."]
        : ["Preserve current database state."]),
      ...(assetRollbackRequired
        ? ["Restore the previous asset manifest/version."]
        : ["Keep current assets unchanged."]),
      "Activate the target rollback release.",
      "Run deployment verification checks.",
      "Record rollback outcome in audit history.",
    ],
    createdAt: new Date().toISOString(),
  };
}

function compareVersions(left: string, right: string): number {
  const a = normalizeVersion(left);
  const b = normalizeVersion(right);
  const length = Math.max(a.length, b.length);

  for (let index = 0; index < length; index += 1) {
    const av = a[index] ?? 0;
    const bv = b[index] ?? 0;
    if (av !== bv) return av > bv ? 1 : -1;
  }

  return 0;
}

function normalizeVersion(value: string): number[] {
  return value
    .replace(/^v/i, "")
    .split(".")
    .map((part) => Number.parseInt(part, 10))
    .map((part) => (Number.isFinite(part) ? part : 0));
}
