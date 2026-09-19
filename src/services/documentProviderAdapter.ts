/**
 * AAi Document Provider Adapter
 * L6 provider-neutral NoSQL/document artifact generation.
 *
 * The output is a deployment plan, not an executable vendor-specific command.
 * Vendor-specific adapters can refine it later.
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

export class DocumentProviderAdapter implements ProviderAdapter {
  readonly provider = "NOSQL" as const;

  getCapabilities(): readonly ProviderCapability[] {
    return [
      {
        capabilityId: "document-collection-plan",
        name: "Document collection/index plan",
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
    _context: ProviderContext,
  ): Promise<readonly ProviderArtifact[]> {
    const content = JSON.stringify(
      {
        persistenceManifestId: manifest.persistenceManifestId,
        version: manifest.version,
        collections: manifest.entities.map((entity) => ({
          collection: entity.name,
          fields: entity.fields,
          relationships: entity.relationships ?? [],
          lifecycle: entity.lifecycle ?? [],
        })),
        indexes: manifest.indexes ?? [],
        constraints: manifest.constraints ?? [],
        migrations: manifest.migrations ?? [],
        seed: manifest.seed ?? [],
        rollback: manifest.rollback ?? [],
      },
      null,
      2,
    );

    return [await artifact(
      `${manifest.persistenceManifestId}-document-plan`,
      "SCHEMA",
      manifest.version,
      content,
    )];
  }

  async generateAssetArtifacts(
    manifest: AssetManifest,
    _context: ProviderContext,
  ): Promise<readonly ProviderArtifact[]> {
    return [await artifact(
      `${manifest.assetManifestId}-asset-plan`,
      "ASSET_PLAN",
      manifest.version,
      JSON.stringify(manifest, null, 2),
    )];
  }

  async generateDeploymentArtifacts(
    manifest: DeploymentManifest,
    environment: EnvironmentManifest,
    _context: ProviderContext,
  ): Promise<readonly ProviderArtifact[]> {
    return [await artifact(
      `${manifest.deploymentManifestId}-document-deployment-plan`,
      "DEPLOYMENT_PLAN",
      manifest.version,
      JSON.stringify(
        {
          deploymentManifestId: manifest.deploymentManifestId,
          environmentId: environment.environmentId,
          provider: "NOSQL",
          prerequisites: manifest.prerequisites ?? [],
          deploymentSteps: manifest.deploymentSteps ?? [],
          verificationSteps: manifest.verificationSteps ?? [],
          rollbackSteps: manifest.rollbackSteps ?? [],
        },
        null,
        2,
      ),
    )];
  }
}

async function artifact(
  artifactId: string,
  artifactType: ProviderArtifact["artifactType"],
  version: string,
  content: string,
): Promise<ProviderArtifact> {
  const digest = await globalThis.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(content),
  );

  return {
    artifactId,
    artifactType,
    provider: "NOSQL",
    version,
    content,
    contentHash: Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join(""),
    generatedAt: new Date().toISOString(),
  };
}
