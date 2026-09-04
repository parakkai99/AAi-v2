/**
 * ArchitectAny AAi - Authoritative Universe Data Repository
 * Production Source: AAi/Data with repository abstraction for PostgreSQL migration
 */

import domainsData from '@/data/universe/domains.json';
import subdomainsData from '@/data/universe/subdomains.json';
import capabilitiesData from '@/data/universe/solution-capabilities.json';
import solutionsData from '@/data/universe/solutions.json';
import {
  Domain,
  Subdomain,
  Capability,
  Solution,
  UniverseCatalogPayload,
  IUniverseRepository,
} from '@/src/types';

export class JsonUniverseRepository implements IUniverseRepository {
  async getUniverseCatalog(): Promise<UniverseCatalogPayload> {
    const domains: Domain[] = (domainsData as any).items || (domainsData as any) || [];
    const subdomains: Subdomain[] = (subdomainsData as any).items || (subdomainsData as any) || [];
    const capabilities: Capability[] =
      (capabilitiesData as any).capabilities || (capabilitiesData as any) || [];
    const solutions: Solution[] = (solutionsData as any).items || (solutionsData as any) || [];
    const solutionCapabilityMap = (capabilitiesData as any).solutionCapabilityMap || {};

    return {
      version: '1.0',
      domains,
      subdomains,
      capabilities,
      solutions,
      solutionCapabilityMap,
    };
  }

  async getDomainById(id: string): Promise<Domain | null> {
    const catalog = await this.getUniverseCatalog();
    return catalog.domains.find((d) => d.id === id || d.key === id) || null;
  }

  async getSolutionById(id: string): Promise<Solution | null> {
    const catalog = await this.getUniverseCatalog();
    return catalog.solutions.find((s) => s.id === id || s.key === id) || null;
  }

  async searchSolutions(query: string): Promise<Solution[]> {
    if (!query || query.trim() === '') return [];
    const catalog = await this.getUniverseCatalog();
    const q = query.toLowerCase();
    return catalog.solutions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (s.key && s.key.toLowerCase().includes(q)),
    );
  }
}

// Default canonical repository instance
export const defaultUniverseRepository = new JsonUniverseRepository();
