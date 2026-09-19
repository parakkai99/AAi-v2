/** AAi B07 — Release execution state machine. */
import type { ReleaseDefinition, ReleaseState, RollbackPlan } from "../contracts/release";
import type { UpdateExecution } from "../contracts/deployment";

const transitions: Record<ReleaseState, readonly ReleaseState[]> = {
  DRAFT:["VALIDATED"],
  VALIDATED:["APPROVED","WITHDRAWN"],
  APPROVED:["RELEASED","WITHDRAWN"],
  RELEASED:["WITHDRAWN","EXPIRED"],
  WITHDRAWN:[],
  EXPIRED:[],
};

export function canTransitionRelease(from: ReleaseState, to: ReleaseState): boolean {
  return transitions[from].includes(to);
}

export function transitionRelease(release: ReleaseDefinition, to: ReleaseState): ReleaseDefinition {
  if (!canTransitionRelease(release.state, to)) throw new Error(`Invalid release transition: ${release.state} -> ${to}`);
  const now = new Date().toISOString();
  return { ...release, state: to, ...(to === "APPROVED" ? { approvedAt: now } : {}), ...(to === "RELEASED" ? { releasedAt: now } : {}) };
}

export function createUpdateExecution(releaseId: string, action: UpdateExecution["action"], status: UpdateExecution["status"], reason?: string): UpdateExecution {
  return { releaseId, action, status, startedAt:new Date().toISOString(), ...(reason ? { reason } : {}) };
}

export function validateRollbackPlan(plan: RollbackPlan): boolean {
  return Boolean(plan.rollbackId && plan.releaseId && plan.targetReleaseId && plan.steps.length > 0);
}
