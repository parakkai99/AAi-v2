/**
 * ============================================================
 * ArchitectAny (AAi)
 * Contract: 13 — Intelligent Agent
 * Contract ID: AAI-CONTRACT-013
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * Purpose:
 * Defines the platform-neutral contract for configurable AAi
 * Intelligent Agents capable of consuming multiple sources,
 * using multiple AI models, applying domain intelligence,
 * scoring, matching, recommending, detecting demand and
 * identifying opportunities.
 *
 * Security:
 * - Never store raw credentials, tokens or secrets.
 * - Use authRef / secure references only.
 * - Agent configuration must remain tenant/context aware.
 *
 * Architectural Principle:
 * Agent definition is configuration.
 * Agent runtime is implementation.
 * Intelligence belongs to AAi.
 * Execution platform may be Catalyst or another platform.
 * ============================================================
 */

import type {
  AAiOwnerReference,
  AAiResourceIdentity,
} from "../common";

/* ============================================================
 * 1. AGENT IDENTITY
 * ========================================================== */

export type AAiAgentStatus =
  | "DRAFT"
  | "ACTIVE"
  | "PAUSED"
  | "DISABLED"
  | "ARCHIVED";

export type AAiAgentType =
  | "INTENT"
  | "CUSTOMER_INTELLIGENCE"
  | "PROVIDER_INTELLIGENCE"
  | "SERVICE_INTELLIGENCE"
  | "MARKET_INTELLIGENCE"
  | "DEMAND"
  | "MATCHING"
  | "RECOMMENDATION"
  | "OPPORTUNITY"
  | "LEARNING"
  | "GENERAL"
  | "CUSTOM";

export interface AAiAgentIdentity extends AAiResourceIdentity {
  agentId: string;
  name: string;
  description?: string;
  type: AAiAgentType;
  status: AAiAgentStatus;
  version: string;
}

/* ============================================================
 * 2. AGENT PURPOSE
 * ========================================================== */

export interface AAiAgentPurpose {
  objective: string;
  domainIds?: string[];
  capabilityIds?: string[];
  solutionIds?: string[];
  supportedContexts?: string[];
}

/* ============================================================
 * 3. SOURCE CONFIGURATION
 * ========================================================== */

export type AAiAgentSourceType =
  | "AAI_CATALOG"
  | "AAI_DATA"
  | "ZOHO_COMMERCE"
  | "ZOHO_CRM"
  | "ZOHO_BOOKS"
  | "ZOHO_DESK"
  | "ZOHO_CREATOR"
  | "CATALYST_DATA_STORE"
  | "CATALYST_NOSQL"
  | "DATABASE"
  | "REST_API"
  | "GRAPHQL"
  | "WEBHOOK"
  | "EVENT"
  | "FILE"
  | "YOUTUBE"
  | "SHAREPOINT"
  | "SAP"
  | "MAGENTO"
  | "SHOPIFY"
  | "OPEN_CART"
  | "EXTERNAL_SERVICE"
  | "OTHER";

export interface AAiAgentSource {
  sourceId: string;
  name: string;
  type: AAiAgentSourceType;

  enabled: boolean;

  uri?: string;
  key?: string;

  /**
   * Reference to secure credentials/connection.
   * Never contain raw secrets.
   */
  authRef?: string;

  provider?: string;

  query?: Record<string, unknown>;
  filters?: Record<string, unknown>;

  capabilities?: string[];

  metadata?: Record<string, unknown>;
}

/* ============================================================
 * 4. MODEL CONFIGURATION
 * ========================================================== */

export type AAiModelProvider =
  | "AAI"
  | "ZOHO_ZIA"
  | "OPENAI"
  | "GOOGLE"
  | "ANTHROPIC"
  | "LOCAL"
  | "CUSTOM"
  | "OTHER";

export type AAiModelPurpose =
  | "CLASSIFICATION"
  | "EXTRACTION"
  | "REASONING"
  | "SUMMARIZATION"
  | "RECOMMENDATION"
  | "PREDICTION"
  | "VISION"
  | "EMBEDDING"
  | "GENERATION"
  | "VALIDATION"
  | "GENERAL";

export interface AAiAgentModel {
  modelId: string;
  provider: AAiModelProvider;
  model: string;

  enabled: boolean;

  purposes: AAiModelPurpose[];

  priority?: number;

  capabilities?: string[];

  maxContext?: number;

  configuration?: Record<string, unknown>;

  /**
   * Secure reference only.
   */
  authRef?: string;
}

/* ============================================================
 * 5. MODEL ROUTING
 * ========================================================== */

export type AAiModelRoutingStrategy =
  | "FIXED"
  | "CAPABILITY"
  | "TASK"
  | "COST"
  | "LATENCY"
  | "QUALITY"
  | "CONFIDENCE"
  | "FALLBACK"
  | "ENSEMBLE"
  | "ADAPTIVE";

export interface AAiModelRoutingPolicy {
  strategy: AAiModelRoutingStrategy;

  preferredModelIds?: string[];
  fallbackModelIds?: string[];

  minimumConfidence?: number;

  maxLatencyMs?: number;

  maxCost?: number;

  requireValidation?: boolean;

  allowMultipleModels?: boolean;
}

/* ============================================================
 * 6. AGENT CAPABILITIES
 * ========================================================== */

export type AAiAgentCapability =
  | "INTENT_ANALYSIS"
  | "CUSTOMER_ANALYSIS"
  | "BEHAVIOR_ANALYSIS"
  | "PROVIDER_ANALYSIS"
  | "SERVICE_ANALYSIS"
  | "MARKET_ANALYSIS"
  | "DEMAND_ANALYSIS"
  | "SCORING"
  | "MATCHING"
  | "RECOMMENDATION"
  | "OPPORTUNITY_DETECTION"
  | "PREDICTION"
  | "CLASSIFICATION"
  | "SUMMARIZATION"
  | "EXPLANATION"
  | "LEARNING"
  | "ACTION";

/* ============================================================
 * 7. DOMAIN SCORING
 * ========================================================== */

export interface AAiScoringDimension {
  dimensionId: string;
  name: string;
  description?: string;

  weight: number;

  minScore?: number;
  maxScore?: number;

  sourceFields?: string[];

  rules?: Record<string, unknown>;
}

export interface AAiScoringPolicy {
  scoreId: string;
  name: string;

  dimensions: AAiScoringDimension[];

  minimumRecommendationScore?: number;
  minimumOpportunityScore?: number;

  confidenceRequired?: number;
}

/* ============================================================
 * 8. PROVIDER INTELLIGENCE
 * ========================================================== */

export interface AAiProviderIntelligence {
  providerId: string;

  providerType:
    | "SERVICE_PROVIDER"
    | "ARTIST"
    | "COOK"
    | "CATERER"
    | "VENUE"
    | "VENDOR"
    | "PROFESSIONAL"
    | "TECHNICIAN"
    | "OTHER";

  overallScore?: number;

  qualityScore?: number;
  reliabilityScore?: number;
  responseScore?: number;
  availabilityScore?: number;
  customerSatisfactionScore?: number;
  cancellationScore?: number;
  repeatBookingScore?: number;
  priceValueScore?: number;

  recentPerformance?: number;

  demandFitScore?: number;

  recommendationScore?: number;

  confidence?: number;

  evidenceRefs?: string[];
}

/* ============================================================
 * 9. MATCHING
 * ========================================================== */

export interface AAiMatchRequest {
  requestId: string;

  context: Record<string, unknown>;

  requiredCapabilities?: string[];

  location?: Record<string, unknown>;

  constraints?: Record<string, unknown>;
}

export interface AAiMatchResult {
  matchId: string;

  candidateId: string;

  score: number;

  confidence: number;

  reasons?: string[];

  evidenceRefs?: string[];

  constraintsSatisfied?: boolean;
}

/* ============================================================
 * 10. RECOMMENDATION
 * ========================================================== */

export interface AAiRecommendation {
  recommendationId: string;

  targetType:
    | "CUSTOMER"
    | "PROVIDER"
    | "SERVICE"
    | "SOLUTION"
    | "CAPABILITY"
    | "MARKET"
    | "OTHER";

  targetId?: string;

  title: string;
  description: string;

  score?: number;
  confidence?: number;

  reasons?: string[];

  evidenceRefs?: string[];

  actions?: string[];

  expiresAt?: string;
}

/* ============================================================
 * 11. DEMAND INTELLIGENCE
 * ========================================================== */

export interface AAiDemandSignal {
  demandId: string;

  domainId?: string;
  capabilityId?: string;
  serviceId?: string;

  location?: Record<string, unknown>;

  period?: {
    from: string;
    to: string;
  };

  demandScore: number;

  trend:
    | "RISING"
    | "STABLE"
    | "DECLINING"
    | "UNKNOWN";

  volume?: number;

  growthRate?: number;

  supplyLevel?: number;

  supplyGap?: number;

  confidence: number;

  evidenceRefs?: string[];
}

/* ============================================================
 * 12. OPPORTUNITY ENGINE
 * ========================================================== */

export type AAiOpportunityType =
  | "CUSTOMER"
  | "PROVIDER"
  | "SERVICE"
  | "MARKET"
  | "PRODUCT"
  | "SOLUTION"
  | "CAPABILITY"
  | "SUPPLY_GAP"
  | "DEMAND_GROWTH"
  | "OTHER";

export type AAiOpportunityStatus =
  | "DETECTED"
  | "REVIEWING"
  | "VALIDATED"
  | "ACTIONED"
  | "DISMISSED"
  | "EXPIRED";

export interface AAiOpportunity {
  opportunityId: string;

  type: AAiOpportunityType;

  status: AAiOpportunityStatus;

  title: string;
  description: string;

  domainId?: string;
  capabilityId?: string;
  solutionId?: string;

  location?: Record<string, unknown>;

  demandScore?: number;
  marketGapScore?: number;
  businessValueScore?: number;
  growthScore?: number;

  opportunityScore: number;

  confidence: number;

  evidenceRefs?: string[];

  recommendedActions?: string[];

  detectedAt: string;

  expiresAt?: string;
}

/* ============================================================
 * 13. TOOLS AND ACTIONS
 * ========================================================== */

export type AAiAgentToolType =
  | "QUERY"
  | "SEARCH"
  | "ANALYZE"
  | "CALCULATE"
  | "MATCH"
  | "RECOMMEND"
  | "CREATE"
  | "UPDATE"
  | "NOTIFY"
  | "WEBHOOK"
  | "MCP"
  | "API"
  | "CUSTOM";

export interface AAiAgentTool {
  toolId: string;
  name: string;
  type: AAiAgentToolType;

  enabled: boolean;

  description?: string;

  inputSchema?: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;

  permissionRef?: string;

  authRef?: string;
}

/* ============================================================
 * 14. CONTEXT
 * ========================================================== */

export interface AAiAgentContext {
  userId?: string;
  organizationId?: string;
  workspaceId?: string;
  containerId?: string;

  domainId?: string;
  subdomainId?: string;
  capabilityId?: string;
  solutionBundleId?: string;
  solutionId?: string;

  location?: Record<string, unknown>;

  language?: string;

  role?: string;

  metadata?: Record<string, unknown>;
}

/* ============================================================
 * 15. MEMORY / LEARNING
 * ========================================================== */

export type AAiMemoryType =
  | "SESSION"
  | "USER"
  | "ORGANIZATION"
  | "WORKSPACE"
  | "SOLUTION"
  | "PROVIDER"
  | "MARKET"
  | "AGENT";

export interface AAiAgentMemoryPolicy {
  enabled: boolean;

  allowedTypes: AAiMemoryType[];

  retentionDays?: number;

  anonymize?: boolean;

  requireConsent?: boolean;

  allowLearning?: boolean;
}

/* ============================================================
 * 16. FEEDBACK / LEARNING SIGNAL
 * ========================================================== */

export interface AAiLearningSignal {
  signalId: string;

  source:
    | "USER_FEEDBACK"
    | "BOOKING"
    | "PURCHASE"
    | "CANCELLATION"
    | "SERVICE_OUTCOME"
    | "PROVIDER_PERFORMANCE"
    | "SYSTEM"
    | "OTHER";

  targetId?: string;

  value?: number;

  label?: string;

  context?: Record<string, unknown>;

  createdAt: string;
}

/* ============================================================
 * 17. EVIDENCE
 * ========================================================== */

export interface AAiEvidenceReference {
  evidenceId: string;

  sourceId: string;

  sourceType: string;

  sourceUri?: string;

  retrievedAt?: string;

  confidence?: number;

  normalizedByAAi?: boolean;

  metadata?: Record<string, unknown>;
}

/* ============================================================
 * 18. AGENT RESPONSE
 * ========================================================== */

export interface AAiAgentResponse {
  responseId: string;

  agentId: string;

  status:
    | "SUCCESS"
    | "PARTIAL"
    | "NO_RESULT"
    | "REQUIRES_APPROVAL"
    | "FAILED";

  summary?: string;

  recommendations?: AAiRecommendation[];

  matches?: AAiMatchResult[];

  opportunities?: AAiOpportunity[];

  demandSignals?: AAiDemandSignal[];

  evidence?: AAiEvidenceReference[];

  confidence?: number;

  actions?: string[];

  requiresHumanApproval?: boolean;

  createdAt: string;
}

/* ============================================================
 * 19. PRIVACY / SECURITY POLICY
 * ========================================================== */

export interface AAiAgentSecurityPolicy {
  requireAuthentication: boolean;

  requireAuthorization: boolean;

  tenantIsolation: boolean;

  requireConsentForBehaviorLearning: boolean;

  allowPersonalizedRecommendation: boolean;

  allowAggregatedAnalytics: boolean;

  allowExternalSources: boolean;

  allowExternalModels: boolean;

  auditEnabled: boolean;

  dataRetentionDays?: number;

  prohibitedDataClasses?: string[];
}

/* ============================================================
 * 20. AGENT DEFINITION
 * ========================================================== */

export interface AAiAgentDefinition {
  identity: AAiAgentIdentity;

  owner: AAiOwnerReference;

  purpose: AAiAgentPurpose;

  sources: AAiAgentSource[];

  models: AAiAgentModel[];

  routing?: AAiModelRoutingPolicy;

  capabilities: AAiAgentCapability[];

  scoringPolicies?: AAiScoringPolicy[];

  tools?: AAiAgentTool[];

  memory?: AAiAgentMemoryPolicy;

  security: AAiAgentSecurityPolicy;

  configuration?: Record<string, unknown>;

  metadata?: Record<string, unknown>;
}

/* ============================================================
 * 21. CORE ARCHITECTURAL RULES
 * ========================================================== */

export const AAI_CONTRACT_013_RULES = {
  configurationDriven: true,

  sourceIndependent: true,

  multiModel: true,

  platformNeutral: true,

  noRawSecrets: true,

  evidenceRequiredForHighImpactRecommendations: true,

  confidenceRequiredForPrediction: true,

  tenantIsolationRequired: true,

  humanApprovalSupported: true,

  auditSupported: true,

  deterministicRulesMayBeUsedWithoutLLM: true,

  llmIsNotTheSystemOfRecord: true,

  sourceSystemsRemainAuthoritative: true,
} as const;
