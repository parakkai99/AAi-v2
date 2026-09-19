/** AAi Discovery Evidence Service */
import type { DiscoveryEvidence, IntentRequest, ProviderCandidate, SourceReference } from "../contracts/discovery";
export interface DiscoveryBundle { readonly intent: IntentRequest; readonly sources: readonly SourceReference[]; readonly evidence: readonly DiscoveryEvidence[]; readonly candidates: readonly ProviderCandidate[]; }
export function createDiscoveryBundle(intent: IntentRequest, sources: readonly SourceReference[] = [], evidence: readonly DiscoveryEvidence[] = [], candidates: readonly ProviderCandidate[] = []): DiscoveryBundle {
  return { intent, sources: [...sources], evidence: [...evidence], candidates: [...candidates] };
}
