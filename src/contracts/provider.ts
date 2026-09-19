/**
 * AAi L6 Provider Adapter Contracts
 * CONTRACT: PROVIDER-ADAPTER-001
 *
 * Provider-specific deployment/persistence implementations must implement this
 * boundary. Core AAi definitions remain provider-neutral.
 */

import type {
  DeploymentManifest,
  EnvironmentManifest,
  PersistenceManifest,
  AssetManifest,
} from "./manifests";

export type ProviderKind =
  | "POSTGRESQL"
  | "MYSQL"
  | "NOSQL"
  | "CATALYST"
  | "AWS"
  | "CLOUDFLARE"
  | "GODADDY"
  | "GOOGLE"
  | "GENERIC";

export interface ProviderCapability {
  readonly capabilityId: string;
  readonly name: string;
  readonly supported: boolean;
  readonly notes?: string;
}

export interface ProviderContext {
  readonly provider: ProviderKind;
  readonly region?: string;
  readonly environmentId: string;
  readonly configuration?: Readonly<Record<string, unknown>>;
}

export interface ProviderArtifact {
  readonly artifactId: string;
  readonly artifactType:
    | "SCHEMA"
    | "MIGRATION"
    | "SEED"
    | "ROLLBACK"
    | "ASSET_PLAN"
    | "DEPLOYMENT_PLAN"
    | "VERIFICATION_PLAN";
  readonly provider: ProviderKind;
  readonly version: string;
  readonly content: string;
  readonly contentHash: string;
  readonly generatedAt: string;
}

export interface ProviderAdapter {
  readonly provider: ProviderKind;
  getCapabilities(): readonly ProviderCapability[];
  generatePersistenceArtifacts(
    manifest: PersistenceManifest,
    context: ProviderContext,
  ): Promise<readonly ProviderArtifact[]>;
  generateAssetArtifacts(
    manifest: AssetManifest,
    context: ProviderContext,
  ): Promise<readonly ProviderArtifact[]>;
  generateDeploymentArtifacts(
    manifest: DeploymentManifest,
    environment: EnvironmentManifest,
    context: ProviderContext,
  ): readonly ProviderArtifact[];
}
