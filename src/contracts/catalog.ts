/**
 * Canonical 5-Layer Capability Catalog Contracts for ArchitectAny AAi
 * 
 * L1 — DOMAIN (e.g. D06)
 * L2 — SUBDOMAIN (e.g. D06.01)
 * L3 — CAPABILITY (e.g. D06.01.01)
 * L4 — SOLUTION BUNDLE (e.g. D06.01.01.01)
 * L5 — SOLUTION / SELECTION (e.g. D06.01.01.01.001)
 */

export type CatalogLayer = 1 | 2 | 3 | 4 | 5;

export type CatalogItemType =
  | 'DOMAIN'
  | 'SUBDOMAIN'
  | 'CAPABILITY'
  | 'SOLUTION_BUNDLE'
  | 'SOLUTION';

export interface CatalogPathSegment {
  id: string;
  name: string;
  layer: CatalogLayer;
  type: CatalogItemType;
}

export interface CatalogItem {
  id: string;
  type: CatalogItemType;
  layer: CatalogLayer;
  name: string;
  parentId: string | null;
  domainId: string;
  subdomainId?: string | null;
  capabilityId?: string | null;
  solutionBundleId?: string | null;
  path: CatalogPathSegment[];
  description: string;
  keywords: string[];
  aliases?: string[];
  status: 'active' | 'beta' | 'deprecated';
  icon?: string;
  color?: string;
  accentColor?: string;
  
  // Optional Solution Extensions
  primaryPath?: string;
  relatedCapabilities?: string[];
  supportingDomains?: string[];
  platformOptions?: string[]; // e.g. ['Shopify', 'Zoho Commerce', 'Magento / Adobe Commerce', 'OpenCart']
  implementationOptions?: string[];
  rating?: number;
  complexity?: 'Standard' | 'Advanced' | 'Enterprise';
  estimatedEffort?: string;
  features?: string[];
}

export interface DomainItem extends CatalogItem {
  type: 'DOMAIN';
  layer: 1;
  subdomainCount?: number;
  capabilityCount?: number;
  solutionCount?: number;
}

export interface SubdomainItem extends CatalogItem {
  type: 'SUBDOMAIN';
  layer: 2;
  capabilityCount?: number;
  solutionCount?: number;
}

export interface CapabilityItem extends CatalogItem {
  type: 'CAPABILITY';
  layer: 3;
  bundleCount?: number;
  solutionCount?: number;
}

export interface SolutionBundleItem extends CatalogItem {
  type: 'SOLUTION_BUNDLE';
  layer: 4;
  solutionCount?: number;
}

export interface SolutionItem extends CatalogItem {
  type: 'SOLUTION';
  layer: 5;
  platformOptions?: string[];
  relatedCapabilities?: string[];
}

export interface CapabilityCatalogData {
  version: string;
  updatedAt: string;
  domains: DomainItem[];
  subdomains: SubdomainItem[];
  capabilities: CapabilityItem[];
  solutionBundles: SolutionBundleItem[];
  solutions: SolutionItem[];
}
