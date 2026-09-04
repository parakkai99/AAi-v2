/**
 * ArchitectAny AAi - API Configuration Contracts
 */

export interface ApiConfig {
  baseUrl: string;
  intentEndpoint: string;
  locationEndpoint: string;
  solutionEndpoint: string;
  serviceEndpoint: string;
  providerEndpoint: string;
  authEndpoint: string;
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  baseUrl: '',
  intentEndpoint: '/api/intent',
  locationEndpoint: '/api/location',
  solutionEndpoint: '/api/solutions',
  serviceEndpoint: '/api/services',
  providerEndpoint: '/api/providers',
  authEndpoint: '/api/auth',
};
