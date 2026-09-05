/* ============================================================
 * Contract: 17 — Recommendation
 * Contract ID: AAI-CONTRACT-017
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * Purpose:
 * Defines the canonical contract for AAi recommendations,
 * including recommendation context, candidates, ranking,
 * reasoning, evidence, confidence, personalization,
 * actions, feedback, and lifecycle.
 *
 * Principle:
 * Recommendations are derived intelligence.
 * Source systems remain authoritative for source data.
 * Recommendations must be explainable, evidence-aware,
 * context-aware, and policy-controlled.
 *
 * Security:
 * - Never store raw credentials or secrets.
 * - Respect tenant, organization, workspace, and agent boundaries.
 * ============================================================ */

import type {
  AAiOwnerReference,
  AAiResourceIdentity,
} from "../common";

/* ============================================================
 * 1. RECOMMENDATION STATUS
 * ============================================================ */

export type AAiRecommendationStatus =
  | "DRAFT"
  | "ACTIVE"
  | "GENERATED"
  | "PRESENTED"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"
  | "WITHDRAWN"
  | "ERROR";

/* ============================================================
 * 2. RECOMMENDATION TYPE
 * ============================================================ */

export type AAiRecommendationType =
  | "SOLUTION"
  | "PRODUCT"
  | "SERVICE"
  | "PROVIDER"
  | "ARTIST"
  | "VENDOR"
  | "PLATFORM"
  | "CAPABILITY"
  | "CONTENT"
  | "LEARNING"
  | "JOURNEY"
  | "ACTION"
  | "OPPORTUNITY"
  | "OTHER";

/* ============================================================
 * 3. RECOMMENDATION STRATEGY
 * ============================================================ */

export type AAiRecommendationStrategy =
  | "RULE_BASED"
  | "SCORE_BASED"
  | "MATCH_BASED"
  | "CONTENT_BASED"
  | "COLLABORATIVE"
  | "CONTEXTUAL"
  | "AI_ASSISTED"
  | "HYBRID";

/* ============================================================
 * 4. RECOMMENDATION CONTEXT
 * ============================================================ */

export interface AAiRecommendationContext {
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
  userRole?: string;
  occasion?: string;
  date?: string;
  time?: string;
  organizationId?: string;
  workspaceId?: string;
  containerId?: string;
  additionalContext?: Record<string, unknown>;
}

/* ============================================================
 * 5. RECOMMENDATION CANDIDATE
 * ============================================================ */

export interface AAiRecommendationCandidate {
  candidateId: string;
  entityId: string;
  entityType: AAiRecommendationType;
  name?: string;
  description?: string;
  score?: number;
  normalizedScore?: number;
  rank?: number;
  confidence?: number;
  matchedCriteria?: string[];
  unmetCriteria?: string[];
  sourceIds?: string[];
  metadata?: Record<string, unknown>;
}

/* ============================================================
 * 6. RECOMMENDATION EVIDENCE
 * ============================================================ */

export interface AAiRecommendationEvidence {
  evidenceId: string;
  sourceId?: string;
  sourceRecordId?: string;
  criterionId?: string;
  description: string;
  value?: unknown;
  confidence?: number;
  retrievedAt?: string;
}

/* ============================================================
 * 7. RECOMMENDATION FACTOR
 * ============================================================ */

export interface AAiRecommendationFactor {
  factorId: string;
  name: string;
  weight?: number;
  contribution?: number;
  value?: unknown;
  explanation?: string;
}

/* ============================================================
 * 8. RECOMMENDATION EXPLANATION
 * ============================================================ */

export interface AAiRecommendationExplanation {
  summary: string;
  factors: AAiRecommendationFactor[];
  evidence?: AAiRecommendationEvidence[];
  confidence?: number;
}

/* ============================================================
 * 9. RECOMMENDATION ACTION
 * ============================================================ */

export interface AAiRecommendationAction {
  actionId: string;
  name: string;
  type:
    | "VIEW"
    | "SELECT"
    | "ADD"
    | "COMPARE"
    | "BOOK"
    | "CONTACT"
    | "CONFIGURE"
    | "BUILD"
    | "SAVE"
    | "SHARE"
    | "REQUEST"
    | "OTHER";
  enabled: boolean;
  requiresApproval?: boolean;
  parameters?: Record<string, unknown>;
}

/* ============================================================
 * 10. PERSONALIZATION
 * ============================================================ */

export interface AAiRecommendationPersonalization {
  enabled: boolean;
  userPreferences?: Record<string, unknown>;
  historicalBehavior?: Record<string, unknown>;
  previousSelections?: string[];
  previousRecommendations?: string[];
  personalizationFactors?: AAiRecommendationFactor[];
}

/* ============================================================
 * 11. RECOMMENDATION POLICY
 * ============================================================ */

export interface AAiRecommendationPolicy {
  minimumConfidence?: number;
  maximumResults?: number;
  requireEvidence?: boolean;
  requireExplainability?: boolean;
  requireHumanReview?: boolean;
  allowAIInference?: boolean;
  allowExternalModelProcessing?: boolean;
  allowPersonalization?: boolean;
  allowCrossTenantData?: boolean;
}

/* ============================================================
 * 12. RECOMMENDATION DEFINITION
 * ============================================================ */

export interface AAiRecommendationDefinition
  extends AAiResourceIdentity {
  name: string;
  description?: string;
  recommendationType: AAiRecommendationType;
  strategy: AAiRecommendationStrategy;
  status: AAiRecommendationStatus;
  version: string;
  domainId?: string;
  subdomainId?: string;
  capabilityId?: string;
}

/* ============================================================
 * 13. RECOMMENDATION CONFIGURATION
 * ============================================================ */

export interface AAiRecommendationConfiguration {
  rankingEnabled?: boolean;
  matchingEnabled?: boolean;
  scoringProfileId?: string;
  intelligenceId?: string;
  modelId?: string;
  fallbackModelIds?: string[];
  candidateLimit?: number;
  resultLimit?: number;
  personalization?: AAiRecommendationPersonalization;
  policy?: AAiRecommendationPolicy;
}

/* ============================================================
 * 14. RECOMMENDATION REQUEST
 * ============================================================ */

export interface AAiRecommendationRequest {
  requestId: string;
  recommendationId: string;
  requestedBy: string;
  context: AAiRecommendationContext;
  candidateIds?: string[];
  candidateType?: AAiRecommendationType;
  requestedAt: string;
}

/* ============================================================
 * 15. RECOMMENDATION RESULT
 * ============================================================ */

export interface AAiRecommendationResult {
  requestId: string;
  recommendationId: string;
  status: "SUCCESS" | "PARTIAL" | "FAILED" | "REJECTED";
  recommendations: AAiRecommendationCandidate[];
  explanation?: AAiRecommendationExplanation;
  overallConfidence?: number;
  generatedAt: string;
}

/* ============================================================
 * 16. RECOMMENDATION FEEDBACK
 * ============================================================ */

export interface AAiRecommendationFeedback {
  feedbackId: string;
  recommendationId: string;
  requestId?: string;
  candidateId?: string;
  userId?: string;
  action:
    | "VIEW"
    | "SELECT"
    | "ACCEPT"
    | "REJECT"
    | "IGNORE"
    | "COMPARE"
    | "BOOK"
    | "CANCEL"
    | "COMPLETE"
    | "RATE"
    | "REPEAT";
  rating?: number;
  value?: number;
  comment?: string;
  recordedAt: string;
}

/* ============================================================
 * 17. RECOMMENDATION DEFINITION INSTANCE
 * ============================================================ */

export interface AAiRecommendationDefinitionInstance {
  identity: AAiRecommendationDefinition;
  owner?: AAiOwnerReference;
  configuration: AAiRecommendationConfiguration;
  metadata?: Record<string, unknown>;
}

/* ============================================================
 * 18. RECOMMENDATION REGISTRY
 * ============================================================ */

export interface AAiRecommendationRegistry {
  recommendations: AAiRecommendationDefinitionInstance[];
  version: string;
  updatedAt: string;
}

/* ============================================================
 * 19. CONTRACT RULES
 * ============================================================ */

export const AAI_RECOMMENDATION_RULES = {
  contextAware: true,
  evidenceSupported: true,
  confidenceSupported: true,
  explainabilitySupported: true,
  personalizationSupported: true,
  feedbackSupported: true,
  rankingSupported: true,
  matchingSupported: true,
  policyControlled: true,
  sourceSystemsRemainAuthoritative: true,
  tenantIsolationRequired: true,
  credentialsStoredAsReferencesOnly: true,
  rawSecretsAllowed: false,
  platformNeutral: true,
} as const;