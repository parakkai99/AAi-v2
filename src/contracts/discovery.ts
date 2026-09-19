/**
 * AAi Local Discovery + Provider Identity Contracts
 * CONTRACT: DISCOVERY-001
 */

export type EvidenceType =
  | "SKILL"
  | "BUSINESS"
  | "IDENTITY"
  | "LOCATION"
  | "CONTACT"
  | "PRICE"
  | "AVAILABILITY"
  | "FRESHNESS"
  | "PORTFOLIO"
  | "SOCIAL"
  | "EXTERNAL_REFERENCE";

export type ProviderStatus =
  | "DISCOVERED"
  | "UNVERIFIED"
  | "PARTIALLY_VERIFIED"
  | "VERIFIED"
  | "CLAIMED"
  | "AAI_REGISTERED"
  | "ACTIVE"
  | "SUSPENDED";

export type SourceType =
  | "WEBSITE"
  | "YOUTUBE"
  | "FACEBOOK"
  | "INSTAGRAM"
  | "DIRECTORY"
  | "CLIENT_DATA"
  | "AAI_PROVIDER"
  | "API"
  | "OTHER";

export interface SourceReference {
  readonly sourceId: string;
  readonly sourceType: SourceType;
  readonly url: string;
  readonly title?: string;
  readonly observedAt: string;
  readonly publishedAt?: string;
  readonly channelId?: string;
  readonly videoId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface DiscoveryEvidence {
  readonly evidenceId: string;
  readonly providerCandidateId?: string;
  readonly source: SourceReference;
  readonly type: EvidenceType;
  readonly claim: string;
  readonly confidence?: number;
  readonly extractedAt: string;
}

export interface LocationSignal {
  readonly city?: string;
  readonly state?: string;
  readonly region?: string;
  readonly country?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly radiusKm?: number;
  readonly sourceEvidenceIds?: readonly string[];
}

export interface PriceSignal {
  readonly currency?: string;
  readonly amount?: number;
  readonly unit?: string;
  readonly observedAt: string;
  readonly sourceEvidenceIds?: readonly string[];
}

export interface AvailabilitySignal {
  readonly status?: "AVAILABLE" | "LIMITED" | "UNAVAILABLE" | "UNKNOWN";
  readonly observedAt: string;
  readonly sourceEvidenceIds?: readonly string[];
}

export interface ProviderCandidate {
  readonly providerCandidateId: string;
  readonly providerId?: string;
  readonly nickname?: string;
  readonly displayName: string;
  readonly providerType?: string;
  readonly categories?: readonly string[];
  readonly services?: readonly string[];
  readonly locations?: readonly LocationSignal[];
  readonly contact?: Readonly<Record<string, unknown>>;
  readonly canonicalUrl?: string;
  readonly externalReferences?: readonly SourceReference[];
  readonly evidenceIds: readonly string[];
  readonly status: ProviderStatus;
  readonly rankingSignals?: Readonly<Record<string, unknown>>;
  readonly assetIds?: readonly string[];
}

export interface MarketplaceProvider {
  readonly providerId: string;
  readonly nickname: string;
  readonly slug: string;
  readonly displayName: string;
  readonly canonicalUrl: string;
  readonly status: ProviderStatus;
  readonly verification?: Readonly<Record<string, unknown>>;
  readonly services?: readonly string[];
  readonly locations?: readonly LocationSignal[];
  readonly sourceReferenceIds?: readonly string[];
  readonly evidenceIds?: readonly string[];
  readonly assetIds?: readonly string[];
  readonly seo?: Readonly<Record<string, unknown>>;
}

export interface IntentRequest {
  readonly intentId: string;
  readonly query: string;
  readonly category?: string;
  readonly businessType?: string;
  readonly purpose?: string;
  readonly location?: LocationSignal;
  readonly distanceKm?: number;
  readonly pricePreference?: string;
  readonly qualityPreference?: string;
  readonly availabilityRequired?: boolean;
  readonly evidenceRequired?: boolean;
  readonly createdAt: string;
}

export interface DiscoveryPlan {
  readonly planId: string;
  readonly intentId: string;
  readonly sourceTypes: readonly SourceType[];
  readonly filters?: Readonly<Record<string, unknown>>;
  readonly requiredEvidenceTypes?: readonly EvidenceType[];
  readonly createdAt: string;
}
