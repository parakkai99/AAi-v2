/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Contract: Global Intent Service
 * Status: ACTIVE
 * Version: 2.0.0
 *
 * Purpose:
 * - Resolve user intent against the canonical AAi catalog.
 * - Keep L1 → L5 hierarchy derived from catalog path data.
 * - Avoid maintaining a duplicate business hierarchy inside the service.
 * - Combine catalog discovery with location-aware service discovery.
 */

import {
  IntentState,
  SearchResultItem,
  IIntentService,
  IntentResolveRequest,
  IntentSearchRequest,
  IntentSearchResult,
} from "../contracts/intent";

import { LocationContextState } from "../contracts/location";
import { catalogRepository } from "../repositories/catalogRepository";
import { SAMPLE_SERVICES } from "./locationService";

export const SUGGESTED_INTENTS: string[] = [
  "event booking",
  "event services near Coimbatore",
  "build a hyperlocal marketplace",
  "build a multivendor marketplace",
  "multivendor marketplace using Shopify",
  "multivendor marketplace using Zoho Commerce",
  "marketplace using Magento",
  "marketplace using OpenCart",
  "find catering for an event",
  "find a venue for an event",
];

class IntentService implements IIntentService {
  private currentIntent: IntentState = {
    query: "",
    rawQuery: "",
    domainId: null,
    subdomainId: null,
    capabilityId: null,
    solutionBundleId: null,
    solutionId: null,
    serviceId: null,
    providerId: null,
    category: null,
    intentType: "general",
  };

  private listeners: Array<(intent: IntentState) => void> = [];

  getIntent(): IntentState {
    return this.currentIntent;
  }

  setIntent(intent: Partial<IntentState>): void {
    this.currentIntent = {
      ...this.currentIntent,
      ...intent,
    };

    this.notify();
  }

  getSuggestedIntents(): string[] {
    return SUGGESTED_INTENTS;
  }

  async parseIntent(query: string): Promise<IntentState> {
    const parsed: IntentState = {
      query,
      rawQuery: query,
      domainId: null,
      subdomainId: null,
      capabilityId: null,
      solutionBundleId: null,
      solutionId: null,
      serviceId: null,
      providerId: null,
      category: null,
      intentType: "general",
    };

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return parsed;
    }

    /*
     * -----------------------------------------------------------------------
     * Primary resolution
     * -----------------------------------------------------------------------
     *
     * The canonical catalog is always the first authority.
     *
     * Query
     *   ↓
     * catalogRepository
     *   ↓
     * matched CatalogItem
     *   ↓
     * item.path
     *   ↓
     * L1 → L2 → L3 → L4 → L5
     */

    let catalogItem = await catalogRepository.getItemById(normalizedQuery);

    if (!catalogItem) {
      const matches =
        await catalogRepository.searchItems(normalizedQuery);

      if (matches.length > 0) {
        catalogItem = matches[0];
      }
    }

    if (catalogItem) {
      this.applyCatalogItemToIntent(parsed, catalogItem);
      return parsed;
    }

    /*
     * -----------------------------------------------------------------------
     * Natural-language fallback
     * -----------------------------------------------------------------------
     *
     * These fallbacks are intentionally limited.
     *
     * They do NOT define a second catalog.
     * They only provide enough context when the catalog search cannot
     * identify a concrete item.
     */

    if (
      normalizedQuery.includes("event") ||
      normalizedQuery.includes("cater") ||
      normalizedQuery.includes("venue") ||
      normalizedQuery.includes("wedding") ||
      normalizedQuery.includes("celebration")
    ) {
      parsed.domainId = "D06";
      parsed.subdomainId = "D06.01";
      parsed.capabilityId = "D06.01.01";
      parsed.solutionBundleId = "D06.01.01.01";
      parsed.category = "Event & Media Services";
      parsed.intentType = "capability";
    } else if (
      normalizedQuery.includes("multivendor") ||
      normalizedQuery.includes("multi vendor") ||
      normalizedQuery.includes("seller marketplace") ||
      normalizedQuery.includes("vendor marketplace")
    ) {
      parsed.domainId = "D06";
      parsed.subdomainId = "D06.02";
      parsed.capabilityId = "D06.02.01";
      parsed.solutionBundleId = "D06.02.01.01";
      parsed.category = "Multivendor Marketplace";
      parsed.intentType = "capability";
    } else if (
      normalizedQuery.includes("shopify") ||
      normalizedQuery.includes("zoho commerce") ||
      normalizedQuery.includes("magento") ||
      normalizedQuery.includes("opencart")
    ) {
      /*
       * Platform terms are implementation context.
       *
       * They should not create a fake catalog hierarchy.
       * The canonical repository should normally resolve these queries
       * through platformOptions / implementationOptions.
       */
      parsed.domainId = "D06";
      parsed.subdomainId = "D06.02";
      parsed.capabilityId = "D06.02.15";
      parsed.category = "Platform Integration";
      parsed.intentType = "capability";
    } else if (
      normalizedQuery.includes("ai") ||
      normalizedQuery.includes("robot") ||
      normalizedQuery.includes("quantum") ||
      normalizedQuery.includes("automation")
    ) {
      parsed.domainId = "D04";
      parsed.category = "Emerging Technology & Intelligent Systems";
      parsed.intentType = "domain";
    } else if (
      normalizedQuery.includes("local") ||
      normalizedQuery.includes("delivery") ||
      normalizedQuery.includes("courier")
    ) {
      parsed.domainId = "D06";
      parsed.subdomainId = "D06.01";
      parsed.category = "Hyperlocal Marketplace";
      parsed.intentType = "subdomain";
    }

    return parsed;
  }

  async search(
    query: string,
    location?: LocationContextState,
  ): Promise<SearchResultItem[]> {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    const results: SearchResultItem[] = [];

    /*
     * -----------------------------------------------------------------------
     * 1. Canonical AAi Catalog Search
     * -----------------------------------------------------------------------
     */

    const catalogMatches =
      await catalogRepository.searchItems(normalizedQuery);

    catalogMatches.forEach((item) => {
      const { badge, category } =
        this.getCatalogPresentation(item.layer);

      const pathBreadcrumb =
        item.path && item.path.length > 0
          ? item.path.map((segment) => segment.name).join(" → ")
          : item.description;

      results.push({
        id: item.id,
        type: item.type.toLowerCase() as any,
        name: `${item.id} — ${item.name}`,
        description: pathBreadcrumb || item.description,
        domainId: item.domainId,
        category,
        badge,
        meta: {
          layer: item.layer,
          parentId: item.parentId,
          domainId: item.domainId,
          subdomainId: item.subdomainId ?? null,
          capabilityId: item.capabilityId ?? null,
          solutionBundleId: item.solutionBundleId ?? null,
          path: item.path,
          rawName: item.name,
          platformOptions: item.platformOptions,
          implementationOptions: item.implementationOptions,
          relatedCapabilities: item.relatedCapabilities,
          supportingDomains: item.supportingDomains,
          businessWorld: item.businessWorld,
          processModel: item.processModel,
          nextAction: item.nextAction,
        },
      });
    });

    /*
     * -----------------------------------------------------------------------
     * 2. Location-Aware Services / Providers
     * -----------------------------------------------------------------------
     *
     * Catalog discovery and real/local service discovery remain separate
     * result types, while both are presented through the same Intent Gateway.
     */

    SAMPLE_SERVICES.forEach((service) => {
      const matchesQuery =
        service.name.toLowerCase().includes(normalizedQuery) ||
        service.category
          .toLowerCase()
          .includes(normalizedQuery) ||
        service.location.city
          .toLowerCase()
          .includes(normalizedQuery) ||
        service.location.pincode.includes(normalizedQuery) ||
        Boolean(
          service.description
            ?.toLowerCase()
            .includes(normalizedQuery),
        );

      const matchesLocation =
        !location ||
        !location.city ||
        service.location.city
          .toLowerCase()
          .includes(location.city.toLowerCase());

      if (matchesQuery && matchesLocation) {
        results.push({
          id: service.id,
          type: "service",
          name: service.name,
          description: service.description,
          category: service.category,
          badge: service.location.city,
          location: {
            city: service.location.city,
            pincode: service.location.pincode,
            latitude: service.location.latitude,
            longitude: service.location.longitude,
            address: service.location.address,
          },
          meta: {
            providerId: service.providerId,
            rating: service.rating,
          },
        });
      }
    });

    return results.slice(0, 8);
  }

  async resolveIntent(
    request: IntentResolveRequest,
  ): Promise<IntentState> {
    return this.parseIntent(request.query);
  }

  async searchWithContext(
    request: IntentSearchRequest,
  ): Promise<IntentSearchResult> {
    const intent = await this.parseIntent(request.query);

    this.setIntent(intent);

    const results = await this.search(
      request.query,
      request.location,
    );

    return {
      query: request.query,
      total: results.length,
      results,
      intent,
      location: request.location,
      searchedAt: new Date().toISOString(),
    };
  }

  subscribe(
    listener: (intent: IntentState) => void,
  ): () => void {
    this.listeners.push(listener);

    listener(this.currentIntent);

    return () => {
      this.listeners = this.listeners.filter(
        (currentListener) => currentListener !== listener,
      );
    };
  }

  private applyCatalogItemToIntent(
    intent: IntentState,
    item: {
      id: string;
      name: string;
      layer: number;
      domainId: string;
      path?: Array<{
        id: string;
        name: string;
        layer: number;
      }>;
    },
  ): void {
    const path = item.path ?? [];

    const getPathId = (layer: number): string | null => {
      const segment = path.find(
        (pathSegment) => pathSegment.layer === layer,
      );

      return segment?.id ?? null;
    };

    intent.domainId =
      item.layer === 1
        ? item.id
        : item.domainId || getPathId(1);

    intent.subdomainId =
      item.layer === 2
        ? item.id
        : getPathId(2);

    intent.capabilityId =
      item.layer === 3
        ? item.id
        : getPathId(3);

    intent.solutionBundleId =
      item.layer === 4
        ? item.id
        : getPathId(4);

    intent.solutionId =
      item.layer === 5
        ? item.id
        : null;

    intent.path = path;
    intent.category = item.name;

    switch (item.layer) {
      case 1:
        intent.intentType = "domain";
        break;

      case 2:
        intent.intentType = "subdomain";
        break;

      case 3:
        intent.intentType = "capability";
        break;

      case 4:
        intent.intentType = "bundle" as any;
        break;

      case 5:
        intent.intentType = "solution";
        break;

      default:
        intent.intentType = "general";
    }
  }

  private getCatalogPresentation(
    layer: number,
  ): {
    badge: string;
    category: string;
  } {
    switch (layer) {
      case 1:
        return {
          badge: "Domain (L1)",
          category: "Domain Galaxy",
        };

      case 2:
        return {
          badge: "Business World (L2)",
          category: "Business World",
        };

      case 3:
        return {
          badge: "Capability (L3)",
          category: "Capability",
        };

      case 4:
        return {
          badge: "Solution Bundle (L4)",
          category: "Solution Bundle",
        };

      case 5:
        return {
          badge: "Solution (L5)",
          category: "Solution Architecture",
        };

      default:
        return {
          badge: "Catalog",
          category: "ArchitectAny Catalog",
        };
    }
  }

  private notify(): void {
    this.listeners.forEach((listener) =>
      listener(this.currentIntent),
    );
  }
}

export const intentService = new IntentService();