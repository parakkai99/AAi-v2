/* ============================================================
 * Contract: 18 — Opportunity
 * Contract ID: AAI-CONTRACT-018
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * Purpose:
 * Defines the canonical contract for detecting, evaluating,
 * ranking, explaining, tracking, and acting upon opportunities
 * identified by AAi intelligence.
 *
 * Principle:
 * An opportunity is an intelligence-derived possibility that
 * may create value for a customer, provider, marketplace,
 * organization, or AAi solution.
 *
 * Opportunity intelligence may use customer behavior,
 * provider performance, market demand, availability, trends,
 * gaps, events, location, pricing, and other authorized data.
 *
 * Security:
 * - Never store raw credentials or secrets.
 * - Respect tenant, organization, workspace, and agent boundaries.
 * - Source systems remain authoritative for source data.
 * ============================================================ */

import type {
  AAiOwnerReference,
  AAiResourceIdentity,
} from "../common";

/* ============================================================
 * 1. OPPORTUNITY STATUS
 * ============================================================ */

export type AAiOpportunityStatus =
  | "DETECTED"
  | "EVALUATING"
  | "QUALIFIED"
  | "RECOMMENDED"
  | "ACCEPTED"
  | "REJECTED"
  | "IN_PROGRESS"
  | "REALIZED"
  | "EXPIRED"
  | "DISMISSED"
  | "ARCHIVED";

/* ============================================================
 * 2. OPPORTUNITY TYPE
 * ============================================================ */

export type AAiOpportunityType =
  | "CUSTOMER"
  | "PROVIDER"
  | "MARKET"
  | "PRODUCT"
  | "SERVICE"
  | "SOLUTION"
  | "DEMAND"
  | "SUPPLY"
  | "LOCATION"
  | "PARTNERSHIP"
  | "REVENUE"
  | "COST"
  | "GROWTH"
  | "INNOVATION"
  | "OPERATIONAL"
  | "OTHER";

/* ============================================================
 * 3. OPPORTUNITY PRIORITY
 * ============================================================ */

export type AAiOpportunityPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

/* ============================================================
 * 4. OPPORTUNITY SOURCE
 * ============================================================ */

export type AAiOpportunitySource =
  | "RULE_BASED"
  | "ANALYTICS"
  | "SCORING"
  | "AI_MODEL"
  | "AGENT"
  | "HYBRID"
  | "HUMAN_IDENTIFIED";

/* ============================================================
 * 5. OPPORTUNITY CONTEXT
 * ============================================================ */

export interface AAiOpportunityContext {
  intentId?: string;
  query?: string;
  domainId?: string;
  subdomainId?: string;
  capabilityId?: string;
  solutionBundleId?: string;
  solutionId?: string;
  location?: {
    country?: string;
    state?: string;
    district?: string;
    city?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
  };
  language?: string;
  occasion?: string;
  date?: string;
  time?: string;
  organizationId?: string;
  workspaceId?: string;
  containerId?: string;
  additionalContext?: Record<string, unknown>;
}

/* ============================================================
 * 6. OPPORTUNITY SIGNAL
 * ============================================================ */

export interface AAiOpportunitySignal {
  signalId: string;
  signalType:
    | "DEMAND_INCREASE"
    | "DEMAND_GAP"
    | "SUPPLY_GAP"
    | "AVAILABILITY_GAP"
    | "PRICE_GAP"
    | "QUALITY_GAP"
    | "LOCATION_GAP"
    | "CAPACITY_GAP"
    | "PERFORMANCE_CHANGE"
    | "CUSTOMER_BEHAVIOR"
    | "MARKET_TREND"
    | "SEASONAL_PATTERN"
    | "EVENT_PATTERN"
    | "OTHER";
  value?: unknown;
  sourceId?: string;
  sourceRecordId?: string;
  confidence?: number;
  detectedAt: string;
}

/* ============================================================
 * 7. OPPORTUNITY FACTOR
 * ============================================================ */

export interface AAiOpportunityFactor {
  factorId: string;
  name: string;
  value?: unknown;
  weight?: number;
  contribution?: number;
  explanation?: string;
}

/* ============================================================
 * 8. OPPORTUNITY EVIDENCE
 * ============================================================ */

export interface AAiOpportunityEvidence {
  evidenceId: string;
  sourceId?: string;
  sourceRecordId?: string;
  description: string;
  value?: unknown;
  confidence?: number;
  retrievedAt?: string;
}

/* ============================================================
 * 9. OPPORTUNITY SCORE
 * ============================================================ */

export interface AAiOpportunityScore {
  score: number;
  normalizedScore?: number;
  confidence?: number;
  priority?: AAiOpportunityPriority;
  factors?: AAiOpportunityFactor[];
  calculatedAt: string;
  scoringVersion: string;
}

/* ============================================================
 * 10. OPPORTUNITY IMPACT
 * ============================================================ */

export interface AAiOpportunityImpact {
  expectedValue?: number;
  currency?: string;
  expectedRevenue?: number;
  expectedCostSaving?: number;
  expectedDemand?: number;
  expectedGrowth?: number;
  estimatedUsers?: number;
  estimatedBookings?: number;
  estimatedTransactions?: number;
  confidence?: number;
}

/* ============================================================
 * 11. OPPORTUNITY EXPLANATION
 * ============================================================ */

export interface AAiOpportunityExplanation {
  summary: string;
  factors: AAiOpportunityFactor[];
  evidence?: AAiOpportunityEvidence[];
  confidence?: number;
}

/* ============================================================
 * 12. OPPORTUNITY ACTION
 * ============================================================ */

export interface AAiOpportunityAction {
  actionId: string;
  name: string;
  type:
    | "VIEW"
    | "ANALYZE"
    | "RECOMMEND"
    | "CONTACT"
    | "CREATE"
    | "SELECT"
    | "CONFIGURE"
    | "BUILD"
    | "BOOK"
    | "PARTNER"
    | "PUBLISH"
    | "MONITOR"
    | "DISMISS"
    | "OTHER";
  enabled: boolean;
  requiresApproval?: boolean;
  parameters?: Record<string, unknown>;
}

/* ============================================================
 * 13. OPPORTUNITY ENTITY
 * ============================================================ */

export interface AAiOpportunityEntity {
  entityId: string;
  entityType:
    | "CUSTOMER"
    | "PROVIDER"
    | "VENDOR"
    | "ARTIST"
    | "SERVICE"
    | "PRODUCT"
    | "SOLUTION"
    | "LOCATION"
    | "MARKET"
    | "ORGANIZATION"
    | "OTHER";
  name?: string;
  role?: "PRIMARY" | "AFFECTED" | "BENEFICIARY" | "TARGET";
}

/* ============================================================
 * 14. OPPORTUNITY DEFINITION
 * ============================================================ */

export interface AAiOpportunityDefinition
  extends AAiResourceIdentity {
  name: string;
  description?: string;
  opportunityType: AAiOpportunityType;
  source: AAiOpportunitySource;
  status: AAiOpportunityStatus;
  priority?: AAiOpportunityPriority;
  version: string;
  domainId?: string;
  subdomainId?: string;
  capabilityId?: string;
}

/* ============================================================
 * 15. OPPORTUNITY POLICY
 * ============================================================ */

export interface AAiOpportunityPolicy {
  minimumConfidence?: number;
  minimumScore?: number;
  requireEvidence?: boolean;
  requireExplainability?: boolean;
  requireHumanReview?: boolean;
  allowAIInference?: boolean;
  allowExternalModelProcessing?: boolean;
  allowAutomaticAction?: boolean;
  allowCrossTenantData?: boolean;
}

/* ============================================================
 * 16. OPPORTUNITY CONFIGURATION
 * ============================================================ */

export interface AAiOpportunityConfiguration {
  intelligenceId?: string;
  scoringProfileId?: string;
  modelId?: string;
  fallbackModelIds?: string[];
  detectionThreshold?: number;
  rankingEnabled?: boolean;
  explanationEnabled?: boolean;
  policy?: AAiOpportunityPolicy;
}

/* ============================================================
 * 17. OPPORTUNITY
 * ============================================================ */

export interface AAiOpportunity {
  identity: AAiOpportunityDefinition;
  owner?: AAiOwnerReference;
  context: AAiOpportunityContext;
  entities?: AAiOpportunityEntity[];
  signals: AAiOpportunitySignal[];
  score: AAiOpportunityScore;
  impact?: AAiOpportunityImpact;
  explanation?: AAiOpportunityExplanation;
  actions?: AAiOpportunityAction[];
  detectedAt: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

/* ============================================================
 * 18. OPPORTUNITY REQUEST
 * ============================================================ */

export interface AAiOpportunityRequest {
  requestId: string;
  opportunityDefinitionId: string;
  requestedBy: string;
  context: AAiOpportunityContext;
  entityIds?: string[];
  requestedAt: string;
}

/* ============================================================
 * 19. OPPORTUNITY RESULT
 * ============================================================ */

export interface AAiOpportunityResult {
  requestId: string;
  status: "SUCCESS" | "PARTIAL" | "FAILED" | "REJECTED";
  opportunities: AAiOpportunity[];
  overallConfidence?: number;
  generatedAt: string;
}

/* ============================================================
 * 20. OPPORTUNITY FEEDBACK
 * ============================================================ */

export interface AAiOpportunityFeedback {
  feedbackId: string;
  opportunityId: string;
  userId?: string;
  action:
    | "VIEW"
    | "ACCEPT"
    | "REJECT"
    | "DISMISS"
    | "ACT"
    | "COMPLETE"
    | "RATE";
  value?: number;
  comment?: string;
  recordedAt: string;
}

/* ============================================================
 * 21. OPPORTUNITY REGISTRY
 * ============================================================ */

export interface AAiOpportunityRegistry {
  definitions: AAiOpportunityDefinition[];
  opportunities?: AAiOpportunity[];
  version: string;
  updatedAt: string;
}

/* ============================================================
 * 22. CONTRACT RULES
 * ============================================================ */

export const AAI_OPPORTUNITY_RULES = {
  contextAware: true,
  domainSpecific: true,
  customerOpportunitiesSupported: true,
  providerOpportunitiesSupported: true,
  marketOpportunitiesSupported: true,
  demandGapDetectionSupported: true,
  supplyGapDetectionSupported: true,
  evidenceSupported: true,
  confidenceSupported: true,
  explainabilitySupported: true,
  impactEstimationSupported: true,
  feedbackSupported: true,
  policyControlled: true,
  humanApprovalSupported: true,
  automaticActionSupported: true,
  sourceSystemsRemainAuthoritative: true,
  tenantIsolationRequired: true,
  credentialsStoredAsReferencesOnly: true,
  rawSecretsAllowed: false,
  platformNeutral: true,
} as const;