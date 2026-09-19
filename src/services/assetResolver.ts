/**
 * AAi Asset Requirement Resolver
 * SERVICE: ASSET-RESOLVER-001
 */

import type { L5SolutionDefinition } from "../contracts/l5Solution";
import type { AssetManifest } from "../contracts/manifests";

export function resolveAssetManifest(
  solutions: readonly L5SolutionDefinition[],
  assetManifestId: string,
): AssetManifest {
  const types = unique(
    solutions.flatMap(
      (solution) => solution.assetRequirements?.assetTypes ?? [],
    ),
  );

  return {
    assetManifestId,
    version: "1.0.0",
    assets: types.map((type, index) => ({
      assetId: `${assetManifestId}-required-${index + 1}`,
      type,
      visibility: "PUBLIC",
    })),
  };
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}
