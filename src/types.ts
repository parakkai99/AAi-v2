/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Compatibility Type Barrel
 * Canonical catalog model: src/contracts/catalog.ts
 *
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * NOTE:
 * Legacy Universe interfaces (Domain, Subdomain, Capability, Solution,
 * UniverseCatalogPayload, IUniverseRepository) have been retired.
 * AAi now uses the canonical contract-based catalog model.
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
export * from './contracts/cinematic';

/* -------------------------------------------------------------------------- */
/* Canonical Catalog Compatibility Types                                      */
/* -------------------------------------------------------------------------- */

export interface DomainVisual {
  color?: string;
  glowColor?: string;
  angle?: number;
  orbit?: 'inner' | 'outer';
}

export interface Domain {
  id: string;
  key?: string;
  name: string;
  description: string;
  icon?: string;
  priority?: number;
  visual?: DomainVisual;
  color?: string;
  subdomainCount?: number;
  capabilityCount?: number;
  solutionCount?: number;
}

export interface Subdomain {
  id: string;
  domainId: string;
  name: string;
  description?: string;
  capabilityCount?: number;
  solutionCount?: number;
}

export interface Capability {
  id: string;
  domainId?: string;
  subdomainId?: string;
  name: string;
  category?: string;
  description?: string;
}

export type SolutionCapability = Capability;

export interface Solution {
  id: string;
  domainId?: string;
  subdomainId?: string;
  capabilityId?: string;
  solutionBundleId?: string;
  name: string;
  description?: string;
  rating?: number;
  complexity?: 'Standard' | 'Advanced' | 'Enterprise';
  estimatedEffort?: string;
  features?: string[];
  platformOptions?: string[];
  supportingDomains?: string[];
  status?: string;
  category?: string;
}
