/** AAi Control Plane / Client Runtime Contracts */
export interface EnvironmentRegistration { readonly environmentId: string; readonly runtimeVersion: string; readonly registeredAt: string; readonly capabilities: readonly string[]; }
export interface InstalledSolution { readonly solutionId: string; readonly version: string; readonly installedAt: string; readonly status: "ACTIVE" | "DISABLED" | "UPDATING" | "FAILED"; }
export interface RuntimeState { readonly environmentId: string; readonly runtimeVersion: string; readonly installedSolutions: readonly InstalledSolution[]; readonly lastHeartbeatAt?: string; }
export interface ReleaseRecord { readonly releaseId: string; readonly version: string; readonly status: "AVAILABLE" | "STAGED" | "ACTIVE" | "ROLLED_BACK"; readonly sha256: string; readonly keyId: string; }
