/**
 * AAi L6 Environment Resolver
 * SERVICE: ENVIRONMENT-RESOLVER-001
 *
 * Compares L5/composition requirements with an existing environment.
 * Provider-neutral. It produces actions; it does not deploy.
 */

import type { EnvironmentManifest, ResolutionAction, HumanDecisionState } from "../contracts/manifests";
import type { L5SolutionDefinition } from "../contracts/l5Solution";

export interface EnvironmentResolution {
  readonly requirementId: string;
  readonly action: ResolutionAction;
  readonly decisionState: HumanDecisionState;
  readonly reason: string;
}

export function resolveEnvironmentRequirements(
  solutions: readonly L5SolutionDefinition[],
  environment: EnvironmentManifest,
): readonly EnvironmentResolution[] {
  const requiredRuntime = unique(
    solutions.flatMap((solution) => solution.l6Requirements?.runtimeCapabilities ?? []),
  );

  return requiredRuntime.map((requirement) => {
    const existing = environment.capabilities?.includes(requirement) ?? false;

    return {
      requirementId: requirement,
      action: existing ? "REUSE" : "INSTALL",
      decisionState: existing ? "AUTO_RESOLVED" : "REQUIRES_CONFIGURATION",
      reason: existing
        ? "Capability already exists in the target environment."
        : "Capability is required by the selected solution and is not declared in the environment.",
    };
  });
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}
