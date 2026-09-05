/**
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: 12 — Platform Communication & Integration
 * Contract ID: AAI-CONTRACT-012
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * ============================================================
 *
 * Purpose:
 *
 * Defines the communication and integration contract used
 * across the AAi platform.
 *
 * AAi contracts describe BUSINESS CAPABILITIES.
 * This contract describes HOW those capabilities communicate.
 *
 * AAi must not be architecturally locked to:
 *
 * - REST
 * - HTTPS
 * - XML
 * - SOAP
 * - MCP
 * - WebSocket
 * - Any specific cloud provider
 *
 * The implementation layer selects the appropriate mechanism.
 *
 * ============================================================
 *
 * Core Principle:
 *
 * CONTRACT FIRST
 *      ↓
 * SERVICE
 *      ↓
 * COMMUNICATION ADAPTER
 *      ↓
 * RUNTIME / PLATFORM
 *
 * ============================================================
 */

import type {
  AAiResourceReference,
  AAiSecureReference,
} from './common';

/**
 * ============================================================
 * Communication Pattern
 * ============================================================
 */

export type AAiCommunicationPattern =
  | 'REQUEST_RESPONSE'
  | 'EVENT'
  | 'COMMAND'
  | 'QUERY'
  | 'STREAM'
  | 'AGENT_TOOL'
  | 'WEBHOOK'
  | 'BATCH';

/**
 * ============================================================
 * Communication Protocol
 * ============================================================
 *
 * Protocol identifies the actual transport/interface used
 * by an implementation.
 */

export type AAiCommunicationProtocol =
  | 'NATIVE_SDK'
  | 'INTERNAL_FUNCTION'
  | 'HTTPS'
  | 'REST'
  | 'GRAPHQL'
  | 'GRPC'
  | 'WEBSOCKET'
  | 'SSE'
  | 'WEBHOOK'
  | 'EVENT_BUS'
  | 'MCP'
  | 'SOAP'
  | 'XML'
  | 'MESSAGE_QUEUE'
  | 'BATCH'
  | 'OTHER';

/**
 * ============================================================
 * Execution Boundary
 * ============================================================
 */

export type AAiExecutionBoundary =
  | 'SAME_PROCESS'
  | 'SAME_RUNTIME'
  | 'SAME_PLATFORM'
  | 'INTERNAL_NETWORK'
  | 'EXTERNAL_NETWORK'
  | 'EXTERNAL_PLATFORM'
  | 'AI_AGENT';

/**
 * ============================================================
 * Communication Direction
 * ============================================================
 */

export type AAiCommunicationDirection =
  | 'INBOUND'
  | 'OUTBOUND'
  | 'BIDIRECTIONAL';

/**
 * ============================================================
 * Service Contract Reference
 * ============================================================
 */

export interface AAiServiceReference {
  /**
   * Stable logical service identifier.
   *
   * Example:
   *
   * container.service
   * solution.service
   * build.service
   */
  serviceId: string;

  name: string;

  version?: string;

  resourceType?: string;
}

/**
 * ============================================================
 * Communication Endpoint
 * ============================================================
 *
 * Endpoint is optional because internal calls may not have
 * a network endpoint at all.
 */

export interface AAiCommunicationEndpoint {
  endpointId: string;

  name: string;

  protocol: AAiCommunicationProtocol;

  uri?: string;

  functionName?: string;

  serviceName?: string;

  operation?: string;
}

/**
 * ============================================================
 * Communication Security
 * ============================================================
 */

export interface AAiCommunicationSecurity {
  /**
   * Whether authentication is required.
   */
  authenticationRequired: boolean;

  /**
   * Whether authorization is required.
   */
  authorizationRequired: boolean;

  /**
   * Secure credential reference.
   *
   * Never store credentials directly.
   */
  authRef?: AAiSecureReference;

  /**
   * Optional permission required by AAi.
   */
  permission?: string;

  /**
   * Whether transport encryption is required.
   */
  encryptionRequired?: boolean;
}

/**
 * ============================================================
 * Request Policy
 * ============================================================
 */

export interface AAiRequestPolicy {
  /**
   * Maximum execution time in milliseconds.
   */
  timeoutMs?: number;

  /**
   * Maximum retry attempts.
   */
  maxRetries?: number;

  /**
   * Retry strategy.
   */
  retryStrategy?:
    | 'NONE'
    | 'FIXED'
    | 'EXPONENTIAL'
    | 'EXPONENTIAL_JITTER';

  /**
   * Whether the operation must be idempotent.
   */
  idempotent?: boolean;

  /**
   * Optional rate limit.
   */
  rateLimitPerMinute?: number;
}

/**
 * ============================================================
 * Event Contract
 * ============================================================
 */

export interface AAiEventContract {
  eventType: string;

  version: string;

  sourceService: AAiServiceReference;

  resource?: AAiResourceReference;

  occurredAt: string;

  correlationId?: string;

  causationId?: string;

  payload: Record<string, unknown>;
}

/**
 * ============================================================
 * Command Contract
 * ============================================================
 */

export interface AAiCommandContract {
  commandId: string;

  commandType: string;

  version: string;

  sourceService: AAiServiceReference;

  targetService: AAiServiceReference;

  requestedBy?: string;

  resource?: AAiResourceReference;

  correlationId?: string;

  requestedAt: string;

  payload: Record<string, unknown>;
}

/**
 * ============================================================
 * Query Contract
 * ============================================================
 */

export interface AAiQueryContract {
  queryId: string;

  queryType: string;

  version: string;

  sourceService: AAiServiceReference;

  targetService: AAiServiceReference;

  requestedBy?: string;

  correlationId?: string;

  requestedAt: string;

  parameters?: Record<string, unknown>;
}

/**
 * ============================================================
 * Agent Tool Contract
 * ============================================================
 *
 * MCP is one possible implementation mechanism.
 *
 * AAi defines the capability first.
 *
 * Example:
 *
 * create_workspace
 * create_container
 * refine_solution
 * request_build
 */

export interface AAiAgentToolContract {
  toolId: string;

  name: string;

  description: string;

  version: string;

  service: AAiServiceReference;

  inputSchema?: Record<string, unknown>;

  outputSchema?: Record<string, unknown>;

  permission?: string;

  requiresConfirmation?: boolean;
}

/**
 * ============================================================
 * Communication Contract
 * ============================================================
 */

export interface AAiCommunicationContract {
  communicationId: string;

  name: string;

  version: string;

  source: AAiServiceReference;

  target: AAiServiceReference;

  pattern: AAiCommunicationPattern;

  protocol: AAiCommunicationProtocol;

  boundary: AAiExecutionBoundary;

  direction: AAiCommunicationDirection;

  endpoint?: AAiCommunicationEndpoint;

  security?: AAiCommunicationSecurity;

  requestPolicy?: AAiRequestPolicy;

  enabled: boolean;

  metadata?: Record<string, unknown>;
}

/**
 * ============================================================
 * Integration Provider
 * ============================================================
 */

export type AAiIntegrationProvider =
  | 'AAI_RUNTIME'
  | 'ZOHO_CATALYST'
  | 'ZOHO_COMMERCE'
  | 'ZOHO_CRM'
  | 'ZOHO_BOOKS'
  | 'ZOHO_DESK'
  | 'AWS'
  | 'AZURE'
  | 'GCP'
  | 'KUBERNETES'
  | 'EXTERNAL'
  | 'LEGACY'
  | 'OTHER';

/**
 * ============================================================
 * Integration Adapter
 * ============================================================
 *
 * Adapter isolates AAi from provider-specific technology.
 */

export interface AAiIntegrationAdapter {
  adapterId: string;

  name: string;

  provider: AAiIntegrationProvider;

  service: AAiServiceReference;

  supportedProtocols: AAiCommunicationProtocol[];

  supportedPatterns: AAiCommunicationPattern[];

  enabled: boolean;

  version?: string;
}

/**
 * ============================================================
 * Communication Result
 * ============================================================
 */

export interface AAiCommunicationResult<T = unknown> {
  success: boolean;

  data?: T;

  error?: {
    code: string;

    message: string;

    retryable?: boolean;
  };

  correlationId?: string;

  operationId?: string;

  timestamp: string;
}

/**
 * ============================================================
 * Communication Rules
 * ============================================================
 *
 * These rules are architectural guidance rather than
 * provider-specific implementation.
 */

export const AAiCommunicationRules = {
  /**
   * Immediate response required:
   * use request/response.
   */
  synchronous: [
    'REQUEST_RESPONSE',
    'QUERY',
  ] as AAiCommunicationPattern[],

  /**
   * No immediate response required:
   * prefer events or commands.
   */
  asynchronous: [
    'EVENT',
    'COMMAND',
  ] as AAiCommunicationPattern[],

  /**
   * AI-driven operations:
   * expose capabilities as tools.
   */
  agentDriven: [
    'AGENT_TOOL',
  ] as AAiCommunicationPattern[],

  /**
   * Real-time user experience.
   */
  realtime: [
    'STREAM',
  ] as AAiCommunicationPattern[],

  /**
   * Legacy/external interoperability.
   */
  integration: [
    'WEBHOOK',
    'BATCH',
    'REQUEST_RESPONSE',
  ] as AAiCommunicationPattern[],

  /**
   * AAi should prefer the lowest-cost and lowest-latency
   * communication mechanism available within the same
   * trusted execution boundary.
   */
  preferLocalExecution: true,

  /**
   * Network communication should not be introduced
   * when a safe native/internal invocation is available.
   */
  avoidUnnecessaryNetworkCalls: true,

  /**
   * AI agents must operate through explicitly declared
   * capabilities/tools and permissions.
   */
  agentAccessRequiresDeclaredTool: true,

  /**
   * Secrets must never be transmitted through generic
   * contract payloads.
   */
  secretsMustUseSecureReference: true,
} as const;

/**
 * ============================================================
 * Contract Metadata
 * ============================================================
 */

export const COMMUNICATION_CONTRACT = {
  contractId: 'AAI-CONTRACT-012',
  name: 'Platform Communication & Integration',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;
