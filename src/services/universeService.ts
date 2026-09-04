/**
 * ArchitectAny AAi - Universe Application Service
 * Provides cached, validated domain catalog operations to the UI layer
 */

import {
  Domain,
  Subdomain,
  Capability,
  Solution,
  UniverseCatalogPayload,
  IUniverseRepository,
} from '@/src/types';
import { defaultUniverseRepository } from '@/src/repositories/universeRepository';

export class UniverseService {
  private repo: IUniverseRepository;
  private cache: UniverseCatalogPayload | null = null;

  constructor(repo: IUniverseRepository = defaultUniverseRepository) {
    this.repo = repo;
  }

  async getCatalog(): Promise<UniverseCatalogPayload> {
    if (this.cache) {
      return this.cache;
    }
    const catalog = await this.repo.getUniverseCatalog();
    this.cache = catalog;
    return catalog;
  }

  async getDomain(id: string): Promise<{
    domain: Domain | null;
    subdomains: Subdomain[];
    solutions: Solution[];
    capabilities: Capability[];
  }> {
    const catalog = await this.getCatalog();
    const domain = catalog.domains.find((d) => d.id === id || d.key === id) || null;

    if (!domain) {
      return { domain: null, subdomains: [], solutions: [], capabilities: [] };
    }

    const domainId = domain.id;
    const subdomains = catalog.subdomains.filter((sd) => sd.domainId === domainId);
    const solutions = catalog.solutions.filter(
      (sol) => sol.domainIds && sol.domainIds.includes(domainId),
    );

    // Collect capabilities required by solutions in this domain
    const capabilityIds = new Set<string>();
    solutions.forEach((sol) => {
      const caps = catalog.solutionCapabilityMap?.[sol.id] || [];
      caps.forEach((c) => capabilityIds.add(c));
    });

    const capabilities = catalog.capabilities.filter((c) => capabilityIds.has(c.id));

    return {
      domain,
      subdomains,
      solutions,
      capabilities,
    };
  }

  async getSolution(id: string): Promise<{
    solution: Solution | null;
    domains: Domain[];
    subdomains: Subdomain[];
    capabilities: Capability[];
  }> {
    const catalog = await this.getCatalog();
    const solution = catalog.solutions.find((s) => s.id === id || s.key === id) || null;

    if (!solution) {
      return { solution: null, domains: [], subdomains: [], capabilities: [] };
    }

    const domains = catalog.domains.filter((d) => solution.domainIds.includes(d.id));
    const subdomains = catalog.subdomains.filter((sd) =>
      solution.subdomainIds?.includes(sd.id),
    );
    const capIds = catalog.solutionCapabilityMap?.[solution.id] || [];
    const capabilities = catalog.capabilities.filter((c) => capIds.includes(c.id));

    return {
      solution,
      domains,
      subdomains,
      capabilities,
    };
  }
}

export const universeService = new UniverseService();
