/* ============================================================
 * Contract: 15 — Agent Model & Model Registry
 * Contract ID: AAI-CONTRACT-015
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * Purpose:
 * Defines the canonical contract for AI models used by AAi
 * Intelligent Agents, including model identity, capabilities,
 * routing, provider abstraction, execution policy, and fallback.
 *
 * Principle:
 * AAi intelligence must remain model-provider neutral.
 * A model is an execution capability, not the owner of AAi
 * intelligence methodology.
 *
 * Security:
 * - Never store raw credentials or secrets.
 * - authRef is a secure credential/connection reference.
 * - Model access must respect tenant, agent, and policy boundaries.
 * ============================================================ */

import type {
  AAiOwnerReference,
  AAiResourceIdentity,
} from "../common";

/* ============================================================
 * 1. MODEL STATUS
 * ============================================================ */

export type AAiModelStatus =
  | "DRAFT"
  | "ACTIVE"
  | "DISABLED"
  | "DEPRECATED"
  | "ERROR"
  | "REQUIRES_REVIEW"
  | "REMOVED";

/* ============================================================
 * 2. MODEL PROVIDER
 * ============================================================ */

export type AAiModelProvider =
  | "AAI"
  | "OPENAI"
  | "GOOGLE"
  | "ANTHROPIC"
  | "META"
  | "MICROSOFT"
  | "AWS"
  | "AZURE"
  | "ZOHO"
  | "OPEN_SOURCE"
  | "CUSTOM"
  | "OTHER";

/* ============================================================
 * 3. MODEL TYPE
 * ============================================================ */

export type AAiModelType =
  | "LLM"
  | "REASONING"
  | "EMBEDDING"
  | "CLASSIFICATION"
  | "EXTRACTION"
  | "VISION"
  | "AUDIO"
  | "SPEECH"
  | "PREDICTION"
  | "RANKING"
  | "GENERATION"
  | "MULTIMODAL"
  | "OTHER";

/* ============================================================
 * 4. MODEL CAPABILITY
 * ============================================================ */

export type AAiModelCapability =
  | "CHAT"
  | "REASONING"
  | "CLASSIFICATION"
  | "EXTRACTION"
  | "SUMMARIZATION"
  | "RECOMMENDATION"
  | "PREDICTION"
  | "RANKING"
  | "EMBEDDING"
  | "VISION"
  | "AUDIO"
  | "SPEECH"
  | "CODE"
  | "TOOL_USE"
  | "STRUCTURED_OUTPUT"
  | "MULTIMODAL";

/* ============================================================
 * 5. MODEL IDENTITY
 * ============================================================ */

export interface AAiAgentModelIdentity
  extends AAiResourceIdentity {
  name: string;
  provider: AAiModelProvider;
  modelType: AAiModelType;
  modelVersion?: string;
  status: AAiModelStatus;
  description?: string;
}

/* ============================================================
 * 6. MODEL CAPABILITIES
 * ============================================================ */

export interface AAiAgentModelCapabilities {
  capabilities: AAiModelCapability[];
  contextWindow?: number;
  maxOutputTokens?: number;
  supportsStreaming?: boolean;
  supportsTools?: boolean;
  supportsStructuredOutput?: boolean;
  supportsMultimodal?: boolean;
}

/* ============================================================
 * 7. MODEL LOCATION / ENDPOINT
 * ============================================================ */

export interface AAiAgentModelEndpoint {
  uri?: string;
  region?: string;
  environment?: "DEV" | "TEST" | "STAGING" | "PRODUCTION";
  protocol?:
    | "SDK"
    | "HTTPS"
    | "REST"
    | "GRAPHQL"
    | "GRPC"
    | "MCP"
    | "INTERNAL";
}

/* ============================================================
 * 8. MODEL SECURITY
 * ============================================================ */

export interface AAiAgentModelSecurity {
  authRef?: string;
  authenticationType?:
    | "NONE"
    | "API_KEY"
    | "OAUTH2"
    | "IAM"
    | "SERVICE_ACCOUNT"
    | "MCP"
    | "CUSTOM";
  encryptionRequired?: boolean;
  tenantIsolationRequired?: boolean;
  allowedScopes?: string[];
}

/* ============================================================
 * 9. MODEL COST POLICY
 * ============================================================ */

export interface AAiModelCostPolicy {
  currency?: string;
  inputCost?: number;
  outputCost?: number;
  requestCost?: number;
  costUnit?: string;
  maximumCostPerRequest?: number;
}

/* ============================================================
 * 10. MODEL PERFORMANCE POLICY
 * ============================================================ */

export interface AAiModelPerformancePolicy {
  maximumLatencyMs?: number;
  minimumAvailability?: number;
  priority?: number;
  concurrencyLimit?: number;
}

/* ============================================================
 * 11. MODEL QUALITY POLICY
 * ============================================================ */

export interface AAiModelQualityPolicy {
  minimumConfidence?: number;
  minimumQualityScore?: number;
  requiresValidation?: boolean;
  validationModelId?: string;
}

/* ============================================================
 * 12. MODEL ROUTING CONDITION
 * ============================================================ */

export interface AAiModelRoutingCondition {
  taskType?: string;
  requiredCapabilities?: AAiModelCapability[];
  maximumCost?: number;
  maximumLatencyMs?: number;
  minimumConfidence?: number;
  preferredProvider?: AAiModelProvider;
  preferredModelId?: string;
}

/* ============================================================
 * 13. MODEL ROUTING RULE
 * ============================================================ */

export interface AAiModelRoutingRule {
  ruleId: string;
  name: string;
  priority: number;
  condition: AAiModelRoutingCondition;
  modelIds: string[];
  fallbackModelIds?: string[];
  enabled: boolean;
}

/* ============================================================
 * 14. MODEL EXECUTION POLICY
 * ============================================================ */

export interface AAiModelExecutionPolicy {
  timeoutMs?: number;
  maxRetries?: number;
  parallelExecutionAllowed?: boolean;
  fallbackAllowed?: boolean;
  validationRequired?: boolean;
  humanApprovalRequired?: boolean;
}

/* ============================================================
 * 15. MODEL INPUT POLICY
 * ============================================================ */

export interface AAiModelInputPolicy {
  allowedDataClasses?: Array<
    "PUBLIC"
    | "INTERNAL"
    | "CONFIDENTIAL"
    | "RESTRICTED"
  >;
  allowPII?: boolean;
  allowExternalData?: boolean;
  allowSourceData?: boolean;
  allowAgentMemory?: boolean;
}

/* ============================================================
 * 16. MODEL OUTPUT POLICY
 * ============================================================ */

export interface AAiModelOutputPolicy {
  structuredOutputRequired?: boolean;
  confidenceRequired?: boolean;
  provenanceRequired?: boolean;
  explainabilityRequired?: boolean;
  humanReviewRequired?: boolean;
}

/* ============================================================
 * 17. MODEL DEFINITION
 * ============================================================ */

export interface AAiAgentModelDefinition {
  identity: AAiAgentModelIdentity;
  owner?: AAiOwnerReference;
  capabilities: AAiAgentModelCapabilities;
  endpoint?: AAiAgentModelEndpoint;
  security: AAiAgentModelSecurity;
  costPolicy?: AAiModelCostPolicy;
  performancePolicy?: AAiModelPerformancePolicy;
  qualityPolicy?: AAiModelQualityPolicy;
  executionPolicy?: AAiModelExecutionPolicy;
  inputPolicy?: AAiModelInputPolicy;
  outputPolicy?: AAiModelOutputPolicy;
  metadata?: Record<string, unknown>;
}

/* ============================================================
 * 18. MODEL REGISTRY
 * ============================================================ */

export interface AAiAgentModelRegistry {
  models: AAiAgentModelDefinition[];
  routingRules: AAiModelRoutingRule[];
  version: string;
  updatedAt: string;
}

/* ============================================================
 * 19. MODEL SELECTION REQUEST
 * ============================================================ */

export interface AAiModelSelectionRequest {
  requestId: string;
  agentId: string;
  taskType: string;
  requiredCapabilities?: AAiModelCapability[];
  maximumCost?: number;
  maximumLatencyMs?: number;
  minimumConfidence?: number;
  preferredProvider?: AAiModelProvider;
  requestedAt: string;
}

/* ============================================================
 * 20. MODEL SELECTION RESULT
 * ============================================================ */

export interface AAiModelSelectionResult {
  requestId: string;
  selectedModelId?: string;
  fallbackModelIds?: string[];
  routingRuleId?: string;
  reason?: string;
  confidence?: number;
  selectedAt: string;
}

/* ============================================================
 * 21. MODEL EXECUTION RESULT
 * ============================================================ */

export interface AAiModelExecutionResult {
  requestId: string;
  modelId: string;
  status: "SUCCESS" | "FAILED" | "TIMEOUT" | "REJECTED";
  output?: unknown;
  confidence?: number;
  latencyMs?: number;
  inputTokens?: number;
  outputTokens?: number;
  estimatedCost?: number;
  errorCode?: string;
  errorMessage?: string;
  completedAt: string;
}

/* ============================================================
 * 22. CONTRACT RULES
 * ============================================================ */

export const AAI_AGENT_MODEL_RULES = {
  providerNeutral: true,
  modelRegistryRequired: true,
  routingSupported: true,
  fallbackSupported: true,
  credentialsStoredAsReferencesOnly: true,
  rawSecretsAllowed: false,
  tenantIsolationRequired: true,
  provenanceSupported: true,
  confidenceSupported: true,
  explainabilitySupported: true,
  policyDrivenExecution: true,
} as const;