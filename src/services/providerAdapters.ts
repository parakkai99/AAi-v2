/**
 * AAi Built-in Relational Provider Adapters
 * L6 adapters for deterministic schema/deployment artifact generation.
 */

import type {
  AssetManifest,
  DeploymentManifest,
  EnvironmentManifest,
  PersistenceManifest,
} from "../contracts/manifests";
import type {
  ProviderAdapter,
  ProviderArtifact,
  ProviderCapability,
  ProviderContext,
} from "../contracts/provider";
import { renderRelationalSchema, type SqlDialect } from "./providerSql";

export class RelationalProviderAdapter implements ProviderAdapter {
  constructor(public readonly provider: "POSTGRESQL" | "MYSQL") {}

  getCapabilities(): readonly ProviderCapability[] {
    return [
      {
        capabilityId: "relational-schema",
        name: "Relational schema generation",
        supported: true,
      },
      {
        capabilityId: "migration-artifact",
        name: "Migration artifact generation",
        supported: true,
      },
      {
        capabilityId: "deployment-plan",
        name: "Provider-neutral deployment plan",
        supported: true,
      },
    ];
  }

  async generatePersistenceArtifacts(
    manifest: PersistenceManifest,
    context: ProviderContext,
  ): Promise<readonly ProviderArtifact[]> {
    const content = renderRelationalSchema(manifest, this.provider as SqlDialect);
    return [await artifact(
      `${manifest.persistenceManifestId}-schema`,
      "SCHEMA",
      this.provider,
      manifest.version,
      content,
    )];
  }

  async generateAssetArtifacts(
    manifest: AssetManifest,
    _context: ProviderContext,
  ): Promise<readonly ProviderArtifact[]> {
    const content = JSON.stringify(
      {
        assetManifestId: manifest.assetManifestId,
        version: manifest.version,
        assets: manifest.assets,
        note: "Provider storage/CDN binding is resolved by the L6 deployment adapter.",
      },
      null,
      2,
    );

    return [await artifact(
      `${manifest.assetManifestId}-asset-plan`,
      "ASSET_PLAN",
      this.provider,
      manifest.version,
      content,
    )];
  }

  async generateDeploymentArtifacts(
    manifest: DeploymentManifest,
    environment: EnvironmentManifest,
    _context: ProviderContext,
  ): Promise<readonly ProviderArtifact[]> {
    const content = JSON.stringify(
      {
        deploymentManifestId: manifest.deploymentManifestId,
        environmentId: environment.environmentId,
        provider: this.provider,
        prerequisites: manifest.prerequisites ?? [],
        deploymentSteps: manifest.deploymentSteps ?? [],
        verificationSteps: manifest.verificationSteps ?? [],
        rollbackSteps: manifest.rollbackSteps ?? [],
      },
      null,
      2,
    );

    return [await artifact(
      `${manifest.deploymentManifestId}-deployment-plan`,
      "DEPLOYMENT_PLAN",
      this.provider,
      manifest.version,
      content,
    )];
  }
}

async function artifact(
  artifactId: string,
  artifactType: ProviderArtifact["artifactType"],
  provider: "POSTGRESQL" | "MYSQL",
  version: string,
  content: string,
): Promise<ProviderArtifact> {
  const bytes = new TextEncoder().encode(content);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);

  return {
    artifactId,
    artifactType,
    provider,
    version,
    content,
    contentHash: Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join(""),
    generatedAt: new Date().toISOString(),
  };
}
