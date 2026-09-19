/** AAi B11 — Minimal client runtime/control-agent boundary. */
import type { EnvironmentRegistration, RuntimeState, ReleaseRecord } from "../contracts/controlPlane";
import type { CompatibilityResult } from "../contracts/release";
import { registerEnvironment, updateHeartbeat } from "./controlPlaneService";

export interface ClientRuntimeSnapshot {
  readonly registration: EnvironmentRegistration;
  readonly state: RuntimeState;
}

export function createRuntimeSnapshot(registration: EnvironmentRegistration): ClientRuntimeSnapshot {
  const normalized = registerEnvironment(registration);
  return {
    registration: normalized,
    state: { environmentId:normalized.environmentId, runtimeVersion:normalized.runtimeVersion, installedSolutions:[] },
  };
}

export function heartbeat(snapshot: ClientRuntimeSnapshot, heartbeatAt = new Date().toISOString()): ClientRuntimeSnapshot {
  return { ...snapshot, state:updateHeartbeat(snapshot.state, heartbeatAt) };
}

export function evaluateReleaseForClient(release: ReleaseRecord, compatibility: CompatibilityResult): "READY" | "BLOCKED" {
  return release.sha256 && release.keyId && compatibility.compatible ? "READY" : "BLOCKED";
}
