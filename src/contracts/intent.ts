/**
 * ArchitectAny AAi - Global Intent Contracts
 */

import { LocationContextState } from './location';

export type IntentType =
  | 'domain'
  | 'subdomain'
  | 'capability'
  | 'solution'
  | 'service'
  | 'provider'
  | 'general';

export interface IntentState {
  query: string;
  rawQuery?: string;
  domainId: string | null;
  subdomainId: string | null;
  capabilityId: string | null;
  solutionBundleId?: string | null;
  solutionId: string | null;
  serviceId: string | null;
  providerId: string | null;
  category: string | null;
  intentType?: IntentType;
  path?: Array<{ id: string; name: string; layer: number }>;
}

export type SearchResultType =
  | 'solution'
  | 'bundle'
  | 'capability'
  | 'subdomain'
  | 'domain'
  | 'service'
  | 'provider';

export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  name: string;
  description?: string;
  domainId?: string;
  category?: string;
  badge?: string;
  location?: {
    city?: string;
    pincode?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  meta?: Record<string, any>;
}

export interface IntentSearchResult {
  query: string;
  total: number;
  results: SearchResultItem[];
}

export interface IIntentService {
  parseIntent(query: string): Promise<IntentState>;
  search(query: string, location?: LocationContextState): Promise<SearchResultItem[]>;
  getSuggestedIntents(): string[];
}
