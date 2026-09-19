/** AAi B10 — Provider deployment adapter boundary. */
import type { DeploymentManifest } from "../contracts/manifests";
import type { DeploymentPlan } from "../contracts/deployment";
import type { ProviderAdapter } from "../contracts/provider";
import { planDeployment } from "./deploymentPlanner";

export interface ProviderDeploymentResult {
  readonly provider: string;
  readonly plan: DeploymentPlan;
  readonly adapterAvailable: boolean;
}

export function prepareProviderDeployment(
  manifest: DeploymentManifest,
  adapter?: ProviderAdapter,
): ProviderDeploymentResult {
  const plan = planDeployment(manifest, undefined);
  return { provider: manifest.provider ?? "UNSPECIFIED", plan, adapterAvailable:Boolean(adapter) };
}
