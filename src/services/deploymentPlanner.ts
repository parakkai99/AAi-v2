/** AAi L6 Deployment Planner */
import type { DeploymentPlan, CapacityPlan } from "../contracts/deployment";
import type { DeploymentManifest } from "../contracts/manifests";

export function planDeployment(manifest: DeploymentManifest, capacity?: CapacityPlan): DeploymentPlan {
  return {
    deploymentManifestId: manifest.deploymentManifestId,
    status: "PLANNED",
    provider: manifest.provider,
    region: manifest.region,
    prerequisites: [
      ...(manifest.prerequisites ?? []),
      "Validate environment compatibility.",
      "Validate persistence and asset manifests.",
      "Validate release integrity and trust metadata.",
    ],
    steps: [
      "Prepare target environment.",
      "Apply provider-neutral deployment artifacts through the selected provider adapter.",
      "Apply persistence migrations when approved.",
      "Publish required assets.",
      "Activate runtime and solution.",
    ],
    verificationSteps: [
      ...(manifest.verificationSteps ?? []),
      "Verify runtime health.",
      "Verify solution availability.",
      "Record deployment audit event.",
    ],
    rollbackSteps: [
      ...(manifest.rollbackSteps ?? []),
      "Freeze activation.",
      "Restore previous release when rollback is approved.",
      "Verify restored runtime.",
    ],
    capacity,
  };
}
