/** AAi Solution Manifest Resolver */
import type { L5SolutionDefinition } from "../contracts/l5Solution";
import type { SolutionManifest } from "../contracts/manifests";

export function resolveSolutionManifest(solution: L5SolutionDefinition, manifestId: string): SolutionManifest {
  return {
    manifestId,
    solutionId: solution.solutionId,
    version: solution.version,
    identity: { name: solution.name, description: solution.description },
    business: { businessWorld: solution.metadata?.["businessWorld"], processModel: solution.metadata?.["processModel"] },
    capabilities: readStrings(solution.metadata?.["relatedCapabilities"]),
    features: readStrings((solution as unknown as Record<string, unknown>)["features"]),
    users: [], workflows: [], logicalEntities: [],
    commercialDefinitionRef: solution.solutionId + ":commercial",
    integrationRequirements: solution.integrationRequirements?.requiredIntegrations ?? [],
    assetRequirements: solution.assetRequirements?.assetTypes ?? [],
    persistenceRequirements: solution.persistenceRequirements?.entities ?? [],
    securityRequirements: [],
    capacityRequirements: solution.l6Requirements?.capacity ?? {},
    geographyRequirements: solution.l6Requirements?.geography ?? {},
    runtimeRequirements: { capabilities: solution.l6Requirements?.runtimeCapabilities ?? [], infrastructure: solution.l6Requirements?.infrastructureCapabilities ?? [] },
    updateRequirements: solution.l6Requirements?.updateRollback ?? {},
  };
}
function readStrings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}
