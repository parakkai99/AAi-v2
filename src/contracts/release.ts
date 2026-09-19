/**
 * AAi Release + Update Contracts
 * CONTRACT: RELEASE-001
 *
 * Release metadata is separate from runtime package contents and supports
 * compatibility validation and rollback.
 */

import type { UpdateManifest } from "./manifests";

export type ReleaseState =
  | "DRAFT"
  | "VALIDATED"
  | "APPROVED"
  | "RELEASED"
  | "WITHDRAWN"
  | "EXPIRED";

export interface ReleaseArtifact {
  readonly artifactId: string;
  readonly path: string;
  readonly version: string;
  readonly sha256: string;
  readonly sizeBytes: number;
  readonly required: boolean;
}

export interface ReleaseDefinition {
  readonly releaseId: string;
  readonly version: string;
  readonly state: ReleaseState;
  readonly runtimeVersion: string;
  readonly packageVersion: string;
  readonly updateManifest: UpdateManifest;
  readonly artifacts: readonly ReleaseArtifact[];
  readonly previousReleaseId?: string;
  readonly rollbackReleaseId?: string;
  readonly createdAt: string;
  readonly approvedAt?: string;
  readonly releasedAt?: string;
}

export interface CompatibilityResult {
  readonly compatible: boolean;
  readonly reasons: readonly string[];
}

export interface RollbackPlan {
  readonly rollbackId: string;
  readonly releaseId: string;
  readonly targetReleaseId: string;
  readonly preserveData: boolean;
  readonly databaseRollbackRequired: boolean;
  readonly assetRollbackRequired: boolean;
  readonly steps: readonly string[];
  readonly createdAt: string;
}
