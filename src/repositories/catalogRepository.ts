/**
 * Repository interface and JSON implementation for the Canonical 5-Layer Capability Catalog
 */

import {
  CatalogItem,
  DomainItem,
  SubdomainItem,
  CapabilityItem,
  SolutionBundleItem,
  SolutionItem,
  CapabilityCatalogData,
} from '../contracts/catalog';
import catalogDataRaw from '../../data/universe/capability-catalog.json';

export interface ICapabilityCatalogRepository {
  getDomains(): Promise<DomainItem[]>;
  getSubdomains(domainId?: string): Promise<SubdomainItem[]>;
  getCapabilities(subdomainId?: string): Promise<CapabilityItem[]>;
  getSolutionBundles(capabilityId?: string): Promise<SolutionBundleItem[]>;
  getSolutions(solutionBundleId?: string, domainId?: string): Promise<SolutionItem[]>;
  getItemById(id: string): Promise<CatalogItem | null>;
  searchItems(query: string): Promise<CatalogItem[]>;
}

export class JsonCapabilityCatalogRepository implements ICapabilityCatalogRepository {
  private data: CapabilityCatalogData;

  constructor(customData?: CapabilityCatalogData) {
    this.data = (customData || catalogDataRaw) as unknown as CapabilityCatalogData;
  }

  async getDomains(): Promise<DomainItem[]> {
    return this.data.domains;
  }

  async getSubdomains(domainId?: string): Promise<SubdomainItem[]> {
    if (!domainId) return this.data.subdomains;
    return this.data.subdomains.filter((s) => s.domainId === domainId || s.parentId === domainId);
  }

  async getCapabilities(subdomainId?: string): Promise<CapabilityItem[]> {
    if (!subdomainId) return this.data.capabilities;
    return this.data.capabilities.filter((c) => c.subdomainId === subdomainId || c.parentId === subdomainId);
  }

  async getSolutionBundles(capabilityId?: string): Promise<SolutionBundleItem[]> {
    if (!capabilityId) return this.data.solutionBundles;
    return this.data.solutionBundles.filter((b) => b.capabilityId === capabilityId || b.parentId === capabilityId);
  }

  async getSolutions(solutionBundleId?: string, domainId?: string): Promise<SolutionItem[]> {
    let list = this.data.solutions;
    if (solutionBundleId) {
      list = list.filter((s) => s.solutionBundleId === solutionBundleId || s.parentId === solutionBundleId);
    }
    if (domainId) {
      list = list.filter((s) => s.domainId === domainId);
    }
    return list;
  }

  async getItemById(id: string): Promise<CatalogItem | null> {
    const allItems: CatalogItem[] = [
      ...this.data.domains,
      ...this.data.subdomains,
      ...this.data.capabilities,
      ...this.data.solutionBundles,
      ...this.data.solutions,
    ];
    return allItems.find((item) => item.id.toLowerCase() === id.toLowerCase()) || null;
  }

  async searchItems(query: string): Promise<CatalogItem[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const allItems: CatalogItem[] = [
      ...this.data.domains,
      ...this.data.subdomains,
      ...this.data.capabilities,
      ...this.data.solutionBundles,
      ...this.data.solutions,
    ];

    const tokens = q.split(/\s+/).filter(Boolean);

    const scoredItems: Array<{ item: CatalogItem; score: number }> = [];

    for (const item of allItems) {
      let score = 0;
      const idLower = item.id.toLowerCase();
      const nameLower = item.name.toLowerCase();
      const descLower = (item.description || '').toLowerCase();
      const keywords = (item.keywords || []).map((k) => k.toLowerCase());
      const aliases = (item.aliases || []).map((a) => a.toLowerCase());
      const platforms = ((item as SolutionItem).platformOptions || []).map((p) => p.toLowerCase());
      const pathNames = (item.path || []).map((p) => p.name.toLowerCase());

      // 1. Exact ID match
      if (idLower === q) {
        score += 100;
      } else if (idLower.includes(q)) {
        score += 40;
      }

      // 2. Exact phrase matches in Name, Keywords, Aliases, Platforms
      if (nameLower === q) {
        score += 80;
      } else if (nameLower.includes(q)) {
        score += 50;
      }

      if (keywords.includes(q)) {
        score += 60;
      } else if (keywords.some((k) => k.includes(q))) {
        score += 35;
      }

      if (aliases.includes(q)) {
        score += 60;
      } else if (aliases.some((a) => a.includes(q))) {
        score += 35;
      }

      if (platforms.includes(q)) {
        score += 55;
      } else if (platforms.some((p) => p.includes(q))) {
        score += 30;
      }

      if (descLower.includes(q)) {
        score += 20;
      }

      // 3. Multi-token coverage across all attributes
      if (tokens.length > 1) {
        let allTokensMatched = true;
        let tokenMatchCount = 0;

        for (const token of tokens) {
          const inName = nameLower.includes(token);
          const inDesc = descLower.includes(token);
          const inKeywords = keywords.some((k) => k.includes(token));
          const inAliases = aliases.some((a) => a.includes(token));
          const inPlatforms = platforms.some((p) => p.includes(token));
          const inPath = pathNames.some((pn) => pn.includes(token));

          if (inName || inDesc || inKeywords || inAliases || inPlatforms || inPath) {
            tokenMatchCount++;
          } else {
            allTokensMatched = false;
          }
        }

        if (allTokensMatched) {
          score += 45 + tokenMatchCount * 5;
        } else if (tokenMatchCount > 0) {
          score += tokenMatchCount * 8;
        }
      }

      if (score > 0) {
        // Boost deeper specific layers slightly if query is specific
        if (item.layer === 5 && score >= 30) score += 5;
        scoredItems.push({ item, score });
      }
    }

    scoredItems.sort((a, b) => b.score - a.score);
    return scoredItems.map((s) => s.item);
  }
}

export const catalogRepository = new JsonCapabilityCatalogRepository();
