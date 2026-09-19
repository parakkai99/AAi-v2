/**
 * AAi Composition Resolver
 * SERVICE: COMPOSITION-RESOLVER-001
 *
 * Resolves a set of selected L5 solutions into a provider-neutral composition.
 * It identifies shared references and basic conflicts without silently merging
 * incompatible requirements.
 */

import type { CompositionManifest, HumanDecisionState, ResolutionAction } from "../contracts/manifests";
import type { L5SolutionDefinition } from "../contracts/l5Solution";

export function resolveL5Composition(
  solutions: readonly L5SolutionDefinition[],
  compositionId: string,
): CompositionManifest {
  const solutionIds = solutions.map((solution) => solution.solutionId);
  const sharedCapabilities = intersect(
    solutions.map((solution) => readStringArray(solution.metadata?.["relatedCapabilities"])),
  );
  const sharedServices = intersect(
    solutions.map((solution) => solution.providerRequirements?.serviceCategories ?? []),
  );

  const resolutionActions = solutions.flatMap((solution) => {
    const actions: Array<{
      requirementId: string;
      action: ResolutionAction;
      decisionState: HumanDecisionState;
      rationale?: string;
    }> = [];

    if ((solution.integrationRequirements?.requiredIntegrations?.length ?? 0) > 0) {
      actions.push({
        requirementId: `${solution.solutionId}:integrations`,
        action: "CONNECT",
        decisionState: "REQUIRES_CONFIGURATION",
        rationale: "Required integrations must be mapped to the target environment.",
      });
    }

    return actions;
  });

  return {
    compositionId,
    version: "1.0.0",
    solutionIds,
    primarySolutionId: solutionIds[0],
    supportingSolutionIds: solutionIds.slice(1),
    sharedCapabilities,
    sharedEntities: [],
    sharedServices,
    integrationRequirements: unique(
      solutions.flatMap(
        (solution) => solution.integrationRequirements?.requiredIntegrations ?? [],
      ),
    ),
    conflicts: [],
    resolutionActions,
    deploymentRequirements: {},
  };
}

function intersect(values: readonly (readonly string[])[]): string[] {
  if (values.length === 0) return [];
  return unique(values[0]).filter((value) =>
    values.every((set) => set.includes(value)),
  );
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function readStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}
