/** AAi Client Control Plane State Service */
import type { EnvironmentRegistration, RuntimeState, ReleaseRecord } from "../contracts/controlPlane";
export function registerEnvironment(input: EnvironmentRegistration): EnvironmentRegistration {
  if (!input.environmentId || !input.runtimeVersion) throw new Error("Environment registration requires identity and runtime version.");
  return { ...input, capabilities: [...input.capabilities] };
}
export function updateHeartbeat(state: RuntimeState, heartbeatAt: string): RuntimeState {
  return { ...state, lastHeartbeatAt: heartbeatAt };
}
export function canActivateRelease(release: ReleaseRecord, runtimeVersion: string): boolean {
  return Boolean(release.releaseId && release.version && release.sha256 && release.keyId && runtimeVersion);
}
