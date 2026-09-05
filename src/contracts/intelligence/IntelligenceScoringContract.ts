/* ============================================================
 * Contract: 16 — Intelligence & Scoring
 * Contract ID: AAI-CONTRACT-016
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * Purpose:
 * Defines the canonical contract for AAi intelligence,
 * scoring, evaluation, ranking, confidence, evidence,
 * domain-specific criteria, and explainability.
 *
 * Principle:
 * AAi intelligence combines deterministic rules, scoring,
 * analytics, statistical models, and AI/ML capabilities.
 * No single model is the source of truth for business scoring.
 *
 * Security:
 * - Never store raw credentials or secrets.
 * - Respect tenant, organization, workspace, and agent boundaries.
 * - Sensitive source data must remain subject to source policies.
 * ============================================================ */

import type {
  AAiOwnerReference,
  AAiResourceIdentity,
} from "../common";

/* ============================================================
 * 1. INTELLIGENCE STATUS
 * ============================================================ */

export type AAiIntelligenceStatus =
  | "DRAFT"
  | "ACTIVE"
  | "DISABLED"
  | "PAUSED"
  | "ERROR"
  | "REQUIRES_REVIEW"
  | "ARCHIVED";

/* ============================================================
 * 2. INTELLIGENCE TYPE
 * ============================================================ */

export type AAiIntelligenceType =
  | "CLASSIFICATION"
  | "SCORING"
  | "RANKING"
  | "MATCHING"
  | "PREDICTION"
  | "RECOMMENDATION"
  | "DEMAND_ANALYSIS"
  | "OPPORTUNITY_DETECTION"
  | "ANOMALY_DETECTION"
  | "QUALITY_EVALUATION"
  | "PERFORMANCE_EVALUATION"
  | "RISK_EVALUATION"
  | "SENTIMENT"
  | "TREND_ANALYSIS"
  | "OTHER";

/* ============================================================
 * 3. SCORING METHOD
 * ============================================================ */

export type AAiScoringMethod =
  | "RULE_BASED"
  | "WEIGHTED"
  | "STATISTICAL"
  | "ML_MODEL"
  | "AI_MODEL"
  | "HYBRID"
  | "HUMAN_REVIEW";

/* ============================================================
 * 4. SCORE SCALE
 * ============================================================ */

export interface AAiScoreScale {
  minimum: number;
  maximum: number;
  unit?: string;
  normalized?: boolean;
}

/* ============================================================
 * 5. SCORE CRITERION
 * ============================================================ */

export interface AAiScoreCriterion {
  criterionId: string;
  name: string;
  description?: string;
  weight: number;
  minimumScore?: number;
  maximumScore?: number;
  required?: boolean;
  enabled: boolean;
  domainId?: string;
  capabilityId?: string;
}

/* ============================================================
 * 6. DOMAIN-SPECIFIC CRITERIA
 * ============================================================ */

export interface AAiDomainScoringProfile {
  domainId: string;
  subdomainId?: string;
  capabilityId?: string;
  entityType: string;
  criteria: AAiScoreCriterion[];
  defaultWeight?: number;
  version: string;
}

/* ============================================================
 * 7. SCORE INPUT
 * ============================================================ */

export interface AAiScoreInput {
  field: string;
  value: unknown;
  sourceId?: string;
  confidence?: number;
  timestamp?: string;
}

/* ============================================================
 * 8. SCORE EVIDENCE
 * ============================================================ */

export interface AAiScoreEvidence {
  evidenceId: string;
  criterionId?: string;
  sourceId?: string;
  sourceRecordId?: string;
  description?: string;
  value?: unknown;
  confidence?: number;
  retrievedAt?: string;
}

/* ============================================================
 * 9. SCORE RESULT
 * ============================================================ */

export interface AAiScoreResult {
  scoreId: string;
  entityId: string;
  entityType: string;
  score: number;
  normalizedScore?: number;
  rank?: number;
  confidence?: number;
  criteriaScores?: Record<string, number>;
  evidence?: AAiScoreEvidence[];
  calculatedAt: string;
  scoringVersion: string;
}

/* ============================================================
 * 10. INTELLIGENCE DEFINITION
 * ============================================================ */

export interface AAiIntelligenceDefinition
  extends AAiResourceIdentity {
  name: string;
  description?: string;
  intelligenceType: AAiIntelligenceType;
  scoringMethod?: AAiScoringMethod;
  status: AAiIntelligenceStatus;
  version: string;
  domainId?: string;
  subdomainId?: string;
  capabilityId?: string;
}

/* ============================================================
 * 11. INTELLIGENCE CONFIGURATION
 * ============================================================ */

export interface AAiIntelligenceConfiguration {
  scoringProfileId?: string;
  criteria?: AAiScoreCriterion[];
  domainProfiles?: AAiDomainScoringProfile[];
  inputs?: AAiScoreInput[];
  minimumConfidence?: number;
  maximumResults?: number;
  rankingEnabled?: boolean;
  explainabilityEnabled?: boolean;
}

/* ============================================================
 * 12. INTELLIGENCE REQUEST
 * ============================================================ */

export interface AAiIntelligenceRequest {
  requestId: string;
  intelligenceId: string;
  requestedBy: string;
  entityIds?: string[];
  entityType?: string;
  context?: Record<string, unknown>;
  inputs?: AAiScoreInput[];
  requestedAt: string;
}

/* ============================================================
 * 13. INTELLIGENCE RESULT
 * ============================================================ */

export interface AAiIntelligenceResult {
  requestId: string;
  intelligenceId: string;
  status: "SUCCESS" | "PARTIAL" | "FAILED" | "REJECTED";
  results?: AAiScoreResult[];
  overallConfidence?: number;
  explanation?: string;
  completedAt: string;
}

/* ============================================================
 * 14. MATCHING CRITERIA
 * ============================================================ */

export interface AAiMatchingCriterion {
  criterionId: string;
  name: string;
  weight: number;
  required?: boolean;
  condition?: string;
}

/* ============================================================
 * 15. MATCHING RESULT
 * ============================================================ */

export interface AAiMatchingResult {
  entityId: string;
  entityType: string;
  matchScore: number;
  confidence?: number;
  matchedCriteria?: string[];
  unmetCriteria?: string[];
  evidence?: AAiScoreEvidence[];
}

/* ============================================================
 * 16. PERFORMANCE SIGNAL
 * ============================================================ */

export interface AAiPerformanceSignal {
  signalId: string;
  entityId: string;
  entityType: string;
  signalType:
    | "RESPONSE"
    | "AVAILABILITY"
    | "QUALITY"
    | "RELIABILITY"
    | "CANCELLATION"
    | "CUSTOMER_SATISFACTION"
    | "REPEAT_BOOKING"
    | "PRICE"
    | "DEMAND"
    | "CAPACITY"
    | "OTHER";
  value: number;
  sourceId?: string;
  recordedAt: string;
}

/* ============================================================
 * 17. FEEDBACK SIGNAL
 * ============================================================ */

export interface AAiFeedbackSignal {
  feedbackId: string;
  entityId?: string;
  entityType?: string;
  userId?: string;
  action:
    | "VIEW"
    | "SELECT"
    | "RECOMMEND"
    | "ACCEPT"
    | "REJECT"
    | "BOOK"
    | "CANCEL"
    | "COMPLETE"
    | "RATE"
    | "REPEAT";
  value?: number;
  comment?: string;
  recordedAt: string;
}

/* ============================================================
 * 18. INTELLIGENCE EXPLANATION
 * ============================================================ */

export interface AAiIntelligenceExplanation {
  summary: string;
  factors: Array<{
    criterionId?: string;
    name: string;
    contribution?: number;
    explanation: string;
  }>;
  evidence?: AAiScoreEvidence[];
  confidence?: number;
}

/* ============================================================
 * 19. INTELLIGENCE POLICY
 * ============================================================ */

export interface AAiIntelligencePolicy {
  minimumConfidence?: number;
  requireEvidence?: boolean;
  requireExplainability?: boolean;
  requireHumanReview?: boolean;
  allowAIInference?: boolean;
  allowExternalModelProcessing?: boolean;
  allowDerivedScores?: boolean;
  allowCrossTenantData?: boolean;
}

/* ============================================================
 * 20. INTELLIGENCE DEFINITION INSTANCE
 * ============================================================ */

export interface AAiIntelligenceDefinitionInstance {
  identity: AAiIntelligenceDefinition;
  owner?: AAiOwnerReference;
  configuration: AAiIntelligenceConfiguration;
  policy?: AAiIntelligencePolicy;
  metadata?: Record<string, unknown>;
}

/* ============================================================
 * 21. SCORING REGISTRY
 * ============================================================ */

export interface AAiScoringRegistry {
  intelligenceDefinitions: AAiIntelligenceDefinitionInstance[];
  scoringProfiles: AAiDomainScoringProfile[];
  version: string;
  updatedAt: string;
}

/* ============================================================
 * 22. CONTRACT RULES
 * ============================================================ */

export const AAI_INTELLIGENCE_SCORING_RULES = {
  sourceSystemsRemainAuthoritative: true,
  domainSpecificScoringSupported: true,
  deterministicRulesSupported: true,
  statisticalScoringSupported: true,
  aiScoringSupported: true,
  hybridScoringSupported: true,
  evidenceSupported: true,
  confidenceRequired: true,
  explainabilitySupported: true,
  feedbackSupported: true,
  tenantIsolationRequired: true,
  credentialsStoredAsReferencesOnly: true,
  rawSecretsAllowed: false,
  platformNeutral: true,
} as const;