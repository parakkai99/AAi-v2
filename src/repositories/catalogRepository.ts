/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Contract: Canonical Catalog Repository
 * Status: ACTIVE
 * Version: 2.0.0
 *
 * Purpose:
 * - Single repository boundary for the canonical AAi catalog.
 * - Reads only from capability-catalog.json.
 * - Keeps UI and application services independent of the catalog storage format.
 * - Supports L1 Domain → L2 Subdomain → L3 Capability →
 *   L4 Solution Bundle → L5 Solution.
 * - L6 remains execution/workspace context and is not stored here as
 *   a business catalog entity.
 */

import type {
  CatalogItem,
  DomainItem,
  SubdomainItem,
  CapabilityItem,
  SolutionBundleItem,
  SolutionItem,
  CapabilityCatalogData,
} from "../contracts/catalog";

import catalogDataRaw from "../../data/universe/capability-catalog.json";

export interface ICapabilityCatalogRepository {
  getDomains(): Promise<DomainItem[]>;
  getSubdomains(domainId?: string): Promise<SubdomainItem[]>;
  getCapabilities(subdomainId?: string): Promise<CapabilityItem[]>;
  getSolutionBundles(capabilityId?: string): Promise<SolutionBundleItem[]>;
  getSolutions(
    solutionBundleId?: string,
    domainId?: string,
  ): Promise<SolutionItem[]>;
  getItemById(id: string): Promise<CatalogItem | null>;
  searchItems(query: string): Promise<CatalogItem[]>;
}

export class JsonCapabilityCatalogRepository
  implements ICapabilityCatalogRepository
{
  private readonly data: CapabilityCatalogData;

  constructor(customData?: CapabilityCatalogData) {
    this.data = (customData ?? catalogDataRaw) as CapabilityCatalogData;
  }

  /* ------------------------------------------------------------------------ */
  /* L1 — Domains                                                             */
  /* ------------------------------------------------------------------------ */

  async getDomains(): Promise<DomainItem[]> {
    return this.data.domains;
  }

  /* ------------------------------------------------------------------------ */
  /* L2 — Subdomains / Business Worlds                                        */
  /* ------------------------------------------------------------------------ */

  async getSubdomains(domainId?: string): Promise<SubdomainItem[]> {
    if (!domainId) {
      return this.data.subdomains;
    }

    return this.data.subdomains.filter(
      (subdomain) => subdomain.domainId === domainId,
    );
  }

  /* ------------------------------------------------------------------------ */
  /* L3 — Capabilities                                                        */
  /* ------------------------------------------------------------------------ */

  async getCapabilities(subdomainId?: string): Promise<CapabilityItem[]> {
    if (!subdomainId) {
      return this.data.capabilities;
    }

    return this.data.capabilities.filter(
      (capability) => capability.subdomainId === subdomainId,
    );
  }

  /* ------------------------------------------------------------------------ */
  /* L4 — Solution Bundles                                                    */
  /* ------------------------------------------------------------------------ */

  async getSolutionBundles(
    capabilityId?: string,
  ): Promise<SolutionBundleItem[]> {
    if (!capabilityId) {
      return this.data.solutionBundles;
    }

    return this.data.solutionBundles.filter(
      (bundle) => bundle.capabilityId === capabilityId,
    );
  }

  /* ------------------------------------------------------------------------ */
  /* L5 — Solutions                                                           */
  /* ------------------------------------------------------------------------ */

  async getSolutions(
    solutionBundleId?: string,
    domainId?: string,
  ): Promise<SolutionItem[]> {
    let solutions = this.data.solutions;

    if (solutionBundleId) {
      solutions = solutions.filter(
        (solution) => solution.solutionBundleId === solutionBundleId,
      );
    }

    if (domainId) {
      solutions = solutions.filter(
        (solution) => solution.domainId === domainId,
      );
    }

    return solutions;
  }

  /* ------------------------------------------------------------------------ */
  /* Direct Catalog Lookup                                                    */
  /* ------------------------------------------------------------------------ */

  async getItemById(id: string): Promise<CatalogItem | null> {
    const normalizedId = id.trim().toLowerCase();

    if (!normalizedId) {
      return null;
    }

    const allItems: CatalogItem[] = [
      ...this.data.domains,
      ...this.data.subdomains,
      ...this.data.capabilities,
      ...this.data.solutionBundles,
      ...this.data.solutions,
    ];

    return (
      allItems.find(
        (item) => item.id.toLowerCase() === normalizedId,
      ) ?? null
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Global Intent Search                                                     */
  /* ------------------------------------------------------------------------ */

  async searchItems(query: string): Promise<CatalogItem[]> {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    const allItems: CatalogItem[] = [
      ...this.data.domains,
      ...this.data.subdomains,
      ...this.data.capabilities,
      ...this.data.solutionBundles,
      ...this.data.solutions,
    ];

    const tokens = normalizedQuery
      .split(/\s+/)
      .map((token) => token.trim())
      .filter(Boolean);

    const scoredItems: Array<{
      item: CatalogItem;
      score: number;
    }> = [];

    for (const item of allItems) {
      const name = item.name.toLowerCase();
      const description = item.description.toLowerCase();
      const id = item.id.toLowerCase();

      const keywords = (item.keywords ?? []).map((value) =>
        value.toLowerCase(),
      );

      const aliases = (item.aliases ?? []).map((value) =>
        value.toLowerCase(),
      );

      const pathNames = (item.path ?? []).map((segment) =>
        segment.name.toLowerCase(),
      );

      const businessWorld = item.businessWorld?.toLowerCase() ?? "";
      const processModel = item.processModel?.toLowerCase() ?? "";
      const nextAction = item.nextAction?.toLowerCase() ?? "";

      const platformOptions = (
        item.platformOptions ??
        []
      ).map((value) => value.toLowerCase());

      const implementationOptions = (
        item.implementationOptions ??
        []
      ).map((value) => value.toLowerCase());

      const serviceComposition = (
        item.serviceComposition ??
        []
      ).map((value) => value.toLowerCase());

      const relatedCapabilities = (
        item.relatedCapabilities ??
        []
      ).map((value) => value.toLowerCase());

      const supportingDomains = (
        item.supportingDomains ??
        []
      ).map((value) => value.toLowerCase());

      let score = 0;

      /* Exact identity */
      if (id === normalizedQuery) {
        score += 120;
      } else if (id.includes(normalizedQuery)) {
        score += 45;
      }

      /* Name */
      if (name === normalizedQuery) {
        score += 100;
      } else if (name.includes(normalizedQuery)) {
        score += 60;
      }

      /* Keywords */
      if (keywords.includes(normalizedQuery)) {
        score += 70;
      } else if (
        keywords.some((keyword) => keyword.includes(normalizedQuery))
      ) {
        score += 40;
      }

      /* Aliases */
      if (aliases.includes(normalizedQuery)) {
        score += 70;
      } else if (
        aliases.some((alias) => alias.includes(normalizedQuery))
      ) {
        score += 40;
      }

      /* Hierarchical path */
      if (
        pathNames.some((pathName) =>
          pathName.includes(normalizedQuery),
        )
      ) {
        score += 30;
      }

      /* Business context */
      if (businessWorld.includes(normalizedQuery)) {
        score += 35;
      }

      if (processModel.includes(normalizedQuery)) {
        score += 20;
      }

      if (nextAction.includes(normalizedQuery)) {
        score += 15;
      }

      /* Platform / implementation */
      if (platformOptions.includes(normalizedQuery)) {
        score += 60;
      } else if (
        platformOptions.some((platform) =>
          platform.includes(normalizedQuery),
        )
      ) {
        score += 35;
      }

      if (implementationOptions.includes(normalizedQuery)) {
        score += 55;
      } else if (
        implementationOptions.some((implementation) =>
          implementation.includes(normalizedQuery),
        )
      ) {
        score += 30;
      }

      /* Solution composition */
      if (
        serviceComposition.some((service) =>
          service.includes(normalizedQuery),
        )
      ) {
        score += 30;
      }

      /* Cross-domain / capability references */
      if (
        relatedCapabilities.some((capabilityId) =>
          capabilityId.includes(normalizedQuery),
        )
      ) {
        score += 20;
      }

      if (
        supportingDomains.some((domainId) =>
          domainId.includes(normalizedQuery),
        )
      ) {
        score += 20;
      }

      /* Description */
      if (description.includes(normalizedQuery)) {
        score += 25;
      }

      /* Multi-token intent matching */
      if (tokens.length > 1) {
        let matchedTokens = 0;

        for (const token of tokens) {
          const matched =
            name.includes(token) ||
            description.includes(token) ||
            id.includes(token) ||
            keywords.some((keyword) => keyword.includes(token)) ||
            aliases.some((alias) => alias.includes(token)) ||
            pathNames.some((pathName) => pathName.includes(token)) ||
            businessWorld.includes(token) ||
            processModel.includes(token) ||
            nextAction.includes(token) ||
            platformOptions.some((platform) =>
              platform.includes(token),
            ) ||
            implementationOptions.some((implementation) =>
              implementation.includes(token),
            ) ||
            serviceComposition.some((service) =>
              service.includes(token),
            );

          if (matched) {
            matchedTokens += 1;
          }
        }

        if (matchedTokens === tokens.length) {
          score += 55 + matchedTokens * 8;
        } else if (matchedTokens > 0) {
          score += matchedTokens * 10;
        }
      }

      /* Prefer concrete solutions when the query is sufficiently specific. */
      if (item.layer === 5 && score >= 30) {
        score += 10;
      }

      /* Prefer capabilities/bundles over broad domains for specific queries. */
      if (item.layer === 3 && score >= 40) {
        score += 4;
      }

      if (item.layer === 4 && score >= 40) {
        score += 6;
      }

      if (score > 0) {
        scoredItems.push({
          item,
          score,
        });
      }
    }

    scoredItems.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      if (a.item.layer !== b.item.layer) {
        return b.item.layer - a.item.layer;
      }

      return a.item.name.localeCompare(b.item.name);
    });

    return scoredItems.map(({ item }) => item);
  }
}

/* -------------------------------------------------------------------------- */
/* Canonical Shared Repository Instance                                       */
/* -------------------------------------------------------------------------- */

export const catalogRepository =
  new JsonCapabilityCatalogRepository();