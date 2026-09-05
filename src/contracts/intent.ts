/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Contract: AAI-CONTRACT-019
 * Name: Global Intent & Discovery Contract
 * Status: ACTIVE
 * Version: 1.1.0
 *
 * Purpose:
 * Defines the canonical AAi boundary for:
 * User Expression → Intent Resolution → Context → Discovery
 *
 * Intent is not Search.
 * Intent resolves what the user means.
 * Search discovers relevant AAi catalog, service, and provider results.
 *
 * This contract is implementation-neutral and does not depend on:
 * - LLM provider
 * - AI model
 * - database
 * - API protocol
 * - search engine
 * - external platform
 */

import type { LocationContextState } from './location';

/* -------------------------------------------------------------------------- */
/* Intent                                                                      */
/* -------------------------------------------------------------------------- */

export type IntentType =
  | 'domain'
  | 'subdomain'
  | 'capability'
  | 'bundle'
  | 'solution'
  | 'service'
  | 'provider'
  | 'general';

export type IntentResolutionStatus =
  | 'unresolved'
  | 'resolved'
  | 'partial'
  | 'ambiguous'
  | 'failed';

export type IntentResolutionSource =
  | 'user'
  | 'catalog'
  | 'rule'
  | 'ai'
  | 'agent'
  | 'external'
  | 'composite';

export interface IntentPathItem {
  id: string;
  name: string;
  layer: number;
}

export interface IntentResolution {
  status: IntentResolutionStatus;
  source: IntentResolutionSource;
  confidence?: number;
  reason?: string;
  resolvedAt?: string;
}

export interface IntentState {
  query: string;
  rawQuery?: string;

  domainId: string | null;
  subdomainId: string | null;
  capabilityId: string | null;
  solutionBundleId: string | null;
  solutionId: string | null;

  serviceId: string | null;
  providerId: string | null;

  category: string | null;
  intentType: IntentType;

  path?: IntentPathItem[];

  resolution?: IntentResolution;

  location?: LocationContextState;

  attributes?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/* Intent Context                                                              */
/* -------------------------------------------------------------------------- */

export interface IntentContext {
  intentId: string;

  state: IntentState;

  userId?: string | null;
  workspaceId?: string | null;
  organizationId?: string | null;

  createdAt: string;
  updatedAt: string;

  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/* Search / Discovery                                                          */
/* -------------------------------------------------------------------------- */

export type SearchResultType =
  | 'solution'
  | 'bundle'
  | 'capability'
  | 'subdomain'
  | 'domain'
  | 'service'
  | 'provider';

export type SearchResultSource =
  | 'catalog'
  | 'service'
  | 'provider'
  | 'external'
  | 'composite';

export interface SearchResultLocation {
  city?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
}

export interface SearchResultItem {
  id: string;
  type: SearchResultType;

  name: string;
  description?: string;

  domainId?: string;
  subdomainId?: string;
  capabilityId?: string;
  solutionBundleId?: string;

  category?: string;
  badge?: string;

  location?: SearchResultLocation;

  source?: SearchResultSource;
  sourceUri?: string;

  relevanceScore?: number;
  confidence?: number;

  meta?: Record<string, unknown>;
}

export interface IntentSearchResult {
  query: string;
  total: number;

  results: SearchResultItem[];

  intent?: IntentState;

  location?: LocationContextState;

  searchedAt?: string;

  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/* Intent Requests                                                             */
/* -------------------------------------------------------------------------- */

export interface IntentResolveRequest {
  query: string;

  location?: LocationContextState;

  userId?: string | null;
  workspaceId?: string | null;
  organizationId?: string | null;

  context?: Record<string, unknown>;
}

export interface IntentSearchRequest {
  query: string;

  location?: LocationContextState;

  intent?: IntentState;

  limit?: number;
  offset?: number;

  filters?: Record<string, unknown>;

  context?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/* Intent Service                                                              */
/* -------------------------------------------------------------------------- */

export interface IIntentService {
  /**
   * Resolve the meaning of a user's natural-language expression.
   */
  parseIntent(query: string): Promise<IntentState>;

  /**
   * Resolve intent with optional application/user/location context.
   */
  resolveIntent(request: IntentResolveRequest): Promise<IntentState>;

  /**
   * Discover relevant AAi catalog/services/providers.
   *
   * Search does not replace intent resolution.
   */
  search(
    query: string,
    location?: LocationContextState,
  ): Promise<SearchResultItem[]>;

  /**
   * Context-aware discovery request.
   */
  searchWithContext(
    request: IntentSearchRequest,
  ): Promise<IntentSearchResult>;

  /**
   * Provide canonical suggested user intents.
   */
  getSuggestedIntents(): string[];
}