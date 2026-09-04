/**
 * ArchitectAny AAi - Authoritative Domain, Identity & Universe Types
 * Production Data Layer & Platform Models
 */

export * from './contracts/intent';
export * from './contracts/location';
export * from './contracts/language';
export * from './contracts/user';
export * from './contracts/auth';
export * from './contracts/service';
export * from './contracts/api';
export * from './contracts/catalog';
export * from './contracts/platformAdapter';

export interface DomainVisual {
  color: string;
  glowColor?: string;
  angle?: number;
  orbit?: 'outer' | 'inner' | string;
}

export interface Domain {
  id: string;
  key?: string;
  name: string;
  description: string;
  icon?: string;
  priority?: number;
  visual?: DomainVisual;
  [key: string]: any;
}

export interface Subdomain {
  id: string;
  domainId: string;
  key?: string;
  name: string;
  description?: string;
  [key: string]: any;
}

export interface Capability {
  id: string;
  key: string;
  name: string;
  category: 'common' | 'transaction' | 'solution' | 'ai' | 'context' | string;
  description?: string;
  [key: string]: any;
}

export interface SolutionCapability {
  id: string;
  domainId?: string;
  name: string;
  category?: string;
  [key: string]: any;
}

export interface Solution {
  id: string;
  key?: string;
  name: string;
  description?: string;
  domainIds: string[];
  subdomainIds?: string[];
  capabilities?: string[];
  mode?: 'hybrid' | 'composed' | 'internal' | string;
  status: 'active' | 'catalog' | 'draft' | string;
  [key: string]: any;
}

export interface UniverseCatalogPayload {
  version: string;
  domains: Domain[];
  subdomains: Subdomain[];
  capabilities: Capability[];
  solutions: Solution[];
  solutionCapabilityMap?: Record<string, string[]>;
}

export interface IUniverseRepository {
  getUniverseCatalog(): Promise<UniverseCatalogPayload>;
  getDomainById(id: string): Promise<Domain | null>;
  getSolutionById(id: string): Promise<Solution | null>;
  searchSolutions(query: string): Promise<Solution[]>;
}
