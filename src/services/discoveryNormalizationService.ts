/** AAi B09 — Normalize discovery evidence without inventing provider facts. */
import type { DiscoveryEvidence, ProviderCandidate, SourceReference } from "../contracts/discovery";

export interface NormalizedDiscoveryRecord {
  readonly providerCandidate: ProviderCandidate;
  readonly evidence: readonly DiscoveryEvidence[];
  readonly sources: readonly SourceReference[];
}

export function normalizeProviderCandidate(
  candidate: ProviderCandidate,
  evidence: readonly DiscoveryEvidence[] = [],
): NormalizedDiscoveryRecord {
  const candidateEvidence = evidence.filter((item) => item.providerCandidateId === candidate.providerCandidateId || candidate.evidenceIds.includes(item.evidenceId));
  const sourceMap = new Map(candidateEvidence.map((item) => [item.source.sourceId, item.source]));
  for (const source of candidate.externalReferences ?? []) sourceMap.set(source.sourceId, source);
  return {
    providerCandidate: { ...candidate, evidenceIds:[...new Set(candidate.evidenceIds)] },
    evidence:[...candidateEvidence],
    sources:[...sourceMap.values()],
  };
}

export function evidenceSupports(candidate: ProviderCandidate, type: DiscoveryEvidence["type"]): boolean {
  return candidate.evidenceIds.some((id) => id.length > 0) && type.length > 0;
}
