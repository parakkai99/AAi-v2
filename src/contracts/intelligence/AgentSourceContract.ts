/* ============================================================
 * Contract: 14 — Agent Source & Connector
 * Contract ID: AAI-CONTRACT-014
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * Purpose:
 * Defines the canonical contract for registering, configuring,
 * accessing, normalizing, monitoring, and governing data sources
 * and connectors used by AAi Intelligent Agents.
 *
 * Principle:
 * Source systems remain authoritative for their own data.
 * AAi consumes, normalizes, interprets, and derives intelligence
 * without replacing the source system of record.
 *
 * Security:
 * - Never store raw credentials or secrets.
 * - authRef is a secure credential/connection reference.
 * ============================================================ */

import type {
  AAiOwnerReference,
  AAiResourceIdentity,
} from "../common";

/* ============================================================
 * 1. SOURCE STATUS
 * ============================================================ */

export type AAiSourceStatus =
  | "DRAFT"
  | "ACTIVE"
  | "DISABLED"
  | "PAUSED"
  | "ERROR"
  | "REQUIRES_REVIEW"
  | "REMOVED";

/* ============================================================
 * 2. SOURCE TYPE
 * ============================================================ */

export type AAiSourceType =
  | "API"
  | "DATABASE"
  | "FILE"
  | "URL"
  | "WEB"
  | "WEBHOOK"
  | "STREAM"
  | "EVENT_BUS"
  | "CRM"
  | "COMMERCE"
  | "ERP"
  | "LMS"
  | "SOCIAL"
  | "VIDEO"
  | "DOCUMENT"
  | "KNOWLEDGE_BASE"
  | "AI_SERVICE"
  | "INTERNAL_SERVICE"
  | "EXTERNAL_SERVICE"
  | "OTHER";

/* ============================================================
 * 3. CONNECTOR TYPE
 * ============================================================ */

export type AAiConnectorType =
  | "NATIVE"
  | "REST"
  | "GRAPHQL"
  | "GRPC"
  | "SOAP"
  | "SDK"
  | "DATABASE"
  | "FILE"
  | "WEBHOOK"
  | "EVENT"
  | "STREAM"
  | "MCP"
  | "CUSTOM"
  | "OTHER";

/* ============================================================
 * 4. SOURCE AUTHORITY
 * ============================================================ */

export type AAiSourceAuthority =
  | "SYSTEM_OF_RECORD"
  | "AUTHORITATIVE"
  | "PRIMARY"
  | "SECONDARY"
  | "DERIVED"
  | "EXTERNAL";

/* ============================================================
 * 5. SOURCE IDENTITY
 * ============================================================ */

export interface AAiAgentSourceIdentity
  extends AAiResourceIdentity {
  sourceType: AAiSourceType;
  connectorType: AAiConnectorType;
  authority: AAiSourceAuthority;
  status: AAiSourceStatus;
  provider?: string;
  name: string;
  description?: string;
}

/* ============================================================
 * 6. SOURCE LOCATION
 * ============================================================ */

export interface AAiSourceLocation {
  uri?: string;
  key?: string;
  region?: string;
  environment?: "DEV" | "TEST" | "STAGING" | "PRODUCTION";
}

/* ============================================================
 * 7. SOURCE SECURITY
 * ============================================================ */

export interface AAiSourceSecurity {
  authRef?: string;
  authenticationType?:
    | "NONE"
    | "API_KEY"
    | "BASIC"
    | "OAUTH2"
    | "JWT"
    | "SERVICE_ACCOUNT"
    | "IAM"
    | "MCP"
    | "CUSTOM";
  encryptionRequired?: boolean;
  tenantIsolationRequired?: boolean;
  allowedScopes?: string[];
}

/* ============================================================
 * 8. QUERY CONFIGURATION
 * ============================================================ */

export interface AAiSourceQueryConfig {
  query?: string;
  filters?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  fields?: string[];
  sort?: string[];
  pagination?: {
    pageSize?: number;
    maxPages?: number;
  };
}

/* ============================================================
 * 9. SOURCE CAPABILITIES
 * ============================================================ */

export interface AAiSourceCapabilities {
  read?: boolean;
  write?: boolean;
  search?: boolean;
  query?: boolean;
  stream?: boolean;
  subscribe?: boolean;
  webhook?: boolean;
  batch?: boolean;
  realtime?: boolean;
  supportsFiles?: boolean;
  supportsStructuredData?: boolean;
  supportsUnstructuredData?: boolean;
}

/* ============================================================
 * 10. SYNC POLICY
 * ============================================================ */

export interface AAiSourceSyncPolicy {
  mode:
    | "NONE"
    | "ON_DEMAND"
    | "SCHEDULED"
    | "EVENT_DRIVEN"
    | "REALTIME";
  intervalMinutes?: number;
  lastSyncAt?: string;
  nextSyncAt?: string;
}

/* ============================================================
 * 11. CACHE POLICY
 * ============================================================ */

export interface AAiSourceCachePolicy {
  enabled: boolean;
  ttlSeconds?: number;
  staleWhileRevalidate?: boolean;
}

/* ============================================================
 * 12. RETRY POLICY
 * ============================================================ */

export interface AAiSourceRetryPolicy {
  enabled: boolean;
  maxAttempts?: number;
  backoffSeconds?: number;
  exponentialBackoff?: boolean;
}

/* ============================================================
 * 13. RATE LIMIT POLICY
 * ============================================================ */

export interface AAiSourceRateLimitPolicy {
  requestsPerMinute?: number;
  requestsPerHour?: number;
  concurrentRequests?: number;
  burstLimit?: number;
}

/* ============================================================
 * 14. NORMALIZATION
 * ============================================================ */

export interface AAiSourceNormalizationConfig {
  enabled: boolean;
  targetSchema?: string;
  mapping?: Record<string, string>;
  transformations?: string[];
  enrichment?: string[];
}

/* ============================================================
 * 15. PROVENANCE
 * ============================================================ */

export interface AAiSourceProvenance {
  sourceId: string;
  sourceType: AAiSourceType;
  sourceUri?: string;
  retrievedAt: string;
  sourceVersion?: string;
  recordId?: string;
  confidence?: number;
}

/* ============================================================
 * 16. SOURCE HEALTH
 * ============================================================ */

export type AAiSourceHealthStatus =
  | "HEALTHY"
  | "DEGRADED"
  | "UNAVAILABLE"
  | "UNKNOWN";

export interface AAiSourceHealth {
  status: AAiSourceHealthStatus;
  checkedAt: string;
  latencyMs?: number;
  lastSuccessfulAccessAt?: string;
  lastFailureAt?: string;
  errorCode?: string;
  errorMessage?: string;
}

/* ============================================================
 * 17. DATA POLICY
 * ============================================================ */

export interface AAiSourceDataPolicy {
  dataClassification?:
    | "PUBLIC"
    | "INTERNAL"
    | "CONFIDENTIAL"
    | "RESTRICTED";
  retentionDays?: number;
  allowCaching?: boolean;
  allowAIProcessing?: boolean;
  allowExternalModelProcessing?: boolean;
  allowDerivedData?: boolean;
  piiAllowed?: boolean;
  crossTenantAccessAllowed?: boolean;
}

/* ============================================================
 * 18. CONNECTOR CONFIGURATION
 * ============================================================ */

export interface AAiConnectorConfig {
  connectorType: AAiConnectorType;
  provider?: string;
  version?: string;
  baseUri?: string;
  settings?: Record<string, unknown>;
}

/* ============================================================
 * 19. AGENT SOURCE DEFINITION
 * ============================================================ */

export interface AAiAgentSourceDefinition {
  identity: AAiAgentSourceIdentity;
  owner?: AAiOwnerReference;
  location: AAiSourceLocation;
  security: AAiSourceSecurity;
  query?: AAiSourceQueryConfig;
  capabilities: AAiSourceCapabilities;
  sync?: AAiSourceSyncPolicy;
  cache?: AAiSourceCachePolicy;
  retry?: AAiSourceRetryPolicy;
  rateLimit?: AAiSourceRateLimitPolicy;
  normalization?: AAiSourceNormalizationConfig;
  dataPolicy?: AAiSourceDataPolicy;
  connector: AAiConnectorConfig;
  metadata?: Record<string, unknown>;
}

/* ============================================================
 * 20. NORMALIZED SOURCE RECORD
 * ============================================================ */

export interface AAiNormalizedSourceRecord {
  id: string;
  sourceId: string;
  sourceRecordId?: string;
  entityType: string;
  data: Record<string, unknown>;
  provenance: AAiSourceProvenance;
  normalizedAt: string;
  confidence?: number;
  version?: string;
}

/* ============================================================
 * 21. SOURCE ACCESS REQUEST
 * ============================================================ */

export interface AAiSourceAccessRequest {
  requestId: string;
  sourceId: string;
  requestedBy: string;
  agentId?: string;
  operation:
    | "READ"
    | "SEARCH"
    | "QUERY"
    | "WRITE"
    | "SUBSCRIBE"
    | "STREAM";
  purpose?: string;
  query?: AAiSourceQueryConfig;
  requestedAt: string;
}

/* ============================================================
 * 22. SOURCE ACCESS RESULT
 * ============================================================ */

export interface AAiSourceAccessResult {
  requestId: string;
  sourceId: string;
  status: "SUCCESS" | "DENIED" | "FAILED" | "PARTIAL";
  records?: AAiNormalizedSourceRecord[];
  totalRecords?: number;
  retrievedAt: string;
  latencyMs?: number;
  errorCode?: string;
  errorMessage?: string;
}

/* ============================================================
 * 23. SOURCE REGISTRY
 * ============================================================ */

export interface AAiAgentSourceRegistry {
  sources: AAiAgentSourceDefinition[];
  version: string;
  updatedAt: string;
}

/* ============================================================
 * 24. CONTRACT RULES
 * ============================================================ */

export const AAI_AGENT_SOURCE_RULES = {
  sourceSystemRemainsAuthoritative: true,
  credentialsStoredAsReferencesOnly: true,
  rawSecretsAllowed: false,
  provenanceRequired: true,
  normalizationBeforeIntelligence: true,
  tenantIsolationRequired: true,
  auditAccess: true,
  platformNeutral: true,
} as const;