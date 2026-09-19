/** AAi B12 — Provider-neutral persistence model for the L6 control plane. */
import type { EnvironmentRegistration, InstalledSolution, ReleaseRecord } from "../contracts/controlPlane";

export interface ControlPlanePersistenceModel {
  readonly environment: EnvironmentRegistration;
  readonly solutions: readonly InstalledSolution[];
  readonly releases: readonly ReleaseRecord[];
}

export interface ControlPlanePersistenceSchema {
  readonly tables: readonly { name:string; primaryKey:string; fields:readonly string[] }[];
}

export function createControlPlanePersistenceModel(environment: EnvironmentRegistration, solutions: readonly InstalledSolution[] = [], releases: readonly ReleaseRecord[] = []): ControlPlanePersistenceModel {
  return { environment:{...environment, capabilities:[...environment.capabilities]}, solutions:[...solutions], releases:[...releases] };
}

export function getControlPlaneSchema(): ControlPlanePersistenceSchema {
  return {
    tables:[
      { name:"aaI_environment", primaryKey:"environmentId", fields:["environmentId","runtimeVersion","registeredAt","capabilities"] },
      { name:"aaI_installed_solution", primaryKey:"solutionId", fields:["solutionId","version","installedAt","status"] },
      { name:"aaI_release", primaryKey:"releaseId", fields:["releaseId","version","status","sha256","keyId"] },
    ],
  };
}
