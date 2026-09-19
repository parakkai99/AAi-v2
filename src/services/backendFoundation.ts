/** AAi Backend Foundation Pipeline */
import type { L5SolutionDefinition } from "../contracts/l5Solution";
import type { EnvironmentManifest, DeploymentManifest, PersistenceManifest, AssetManifest, SolutionManifest, CompositionManifest } from "../contracts/manifests";
import { resolveSolutionManifest } from "./solutionManifestResolver";
import { resolveL5Composition } from "./compositionResolver";
import { resolveEnvironmentRequirements } from "./environmentResolver";
import { resolvePersistenceManifest } from "./persistenceResolver";
import { resolveAssetManifest } from "./assetResolver";
import { planDeployment } from "./deploymentPlanner";
import type { CapacityPlan, DeploymentPlan } from "../contracts/deployment";

export interface BackendFoundationResult {
  readonly solutionManifests: readonly SolutionManifest[];
  readonly composition: CompositionManifest;
  readonly environmentResolution: ReturnType<typeof resolveEnvironmentRequirements>;
  readonly persistence: PersistenceManifest;
  readonly assets: AssetManifest;
  readonly deployment: DeploymentPlan;
}

export function buildBackendFoundation(
  solutions: readonly L5SolutionDefinition[],
  environment: EnvironmentManifest,
  deploymentManifest: DeploymentManifest,
  capacity?: CapacityPlan,
): BackendFoundationResult {
  if (solutions.length === 0) throw new Error("At least one L5 solution is required.");
  const solutionManifests = solutions.map((solution) => resolveSolutionManifest(solution, solution.solutionId + ":manifest"));
  const composition = resolveL5Composition(solutions, deploymentManifest.solutionIds.join("+") + ":composition");
  const environmentResolution = resolveEnvironmentRequirements(solutions, environment);
  const persistence = resolvePersistenceManifest(solutions, deploymentManifest.persistenceManifestId ?? environment.environmentId + ":persistence");
  const assets = resolveAssetManifest(solutions, deploymentManifest.assetManifestId ?? environment.environmentId + ":assets");
  const deployment = planDeployment(deploymentManifest, capacity);
  return { solutionManifests, composition, environmentResolution, persistence, assets, deployment };
}
