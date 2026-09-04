/**
 * ArchitectAny AAi - Global Intent Service
 * Powers the Intent Gateway, natural-language parsing & multi-entity search
 */

import {
  IntentState,
  SearchResultItem,
  IIntentService,
} from '../contracts/intent';
import { LocationContextState } from '../contracts/location';
import { catalogRepository } from '../repositories/catalogRepository';
import { SAMPLE_SERVICES } from './locationService';

export const SUGGESTED_INTENTS: string[] = [
  'event booking',
  'event services near Coimbatore',
  'build a hyperlocal marketplace',
  'build a multivendor marketplace',
  'multivendor marketplace using Shopify',
  'multivendor marketplace using Zoho Commerce',
  'marketplace using Magento',
  'marketplace using OpenCart',
  'find catering for an event',
  'find a venue for an event',
];

class IntentService implements IIntentService {
  private currentIntent: IntentState = {
    query: '',
    rawQuery: '',
    domainId: null,
    subdomainId: null,
    capabilityId: null,
    solutionId: null,
    serviceId: null,
    providerId: null,
    category: null,
    intentType: 'general',
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
    const q = query.trim().toLowerCase();
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
      intentType: 'general',
    };

    if (!q) return parsed;

    // 1. Check direct catalog match or search match
    let catalogItem = await catalogRepository.getItemById(q);
    if (!catalogItem) {
      const matches = await catalogRepository.searchItems(q);
      if (matches.length > 0) {
        catalogItem = matches[0];
      }
    }

    if (catalogItem) {
      parsed.domainId = catalogItem.domainId || (catalogItem.layer === 1 ? catalogItem.id : catalogItem.path?.[0]?.id || null);
      parsed.subdomainId = catalogItem.layer === 2 ? catalogItem.id : catalogItem.path?.find((p) => p.layer === 2)?.id || null;
      parsed.capabilityId = catalogItem.layer === 3 ? catalogItem.id : catalogItem.path?.find((p) => p.layer === 3)?.id || null;
      parsed.solutionBundleId = catalogItem.layer === 4 ? catalogItem.id : catalogItem.path?.find((p) => p.layer === 4)?.id || null;
      parsed.solutionId = catalogItem.layer === 5 ? catalogItem.id : null;
      parsed.path = catalogItem.path;
      parsed.category = catalogItem.name;

      if (catalogItem.layer === 1) parsed.intentType = 'domain';
      else if (catalogItem.layer === 2) parsed.intentType = 'subdomain';
      else if (catalogItem.layer === 3) parsed.intentType = 'capability';
      else if (catalogItem.layer === 4) parsed.intentType = 'bundle' as any;
      else if (catalogItem.layer === 5) parsed.intentType = 'solution';
    } else {
      // 2. Keyword Heuristics for natural language fallback
      if (q.includes('event') || q.includes('cater') || q.includes('venue') || q.includes('wedding')) {
        parsed.domainId = 'D06';
        parsed.subdomainId = 'D06.01';
        parsed.capabilityId = 'D06.01.01';
        parsed.solutionBundleId = 'D06.01.01.01';
        parsed.category = 'Hyperlocal Event Booking';
      } else if (q.includes('multivendor') || q.includes('shopify') || q.includes('zoho') || q.includes('magento') || q.includes('opencart')) {
        parsed.domainId = 'D06';
        parsed.subdomainId = 'D06.02';
        parsed.capabilityId = 'D06.02.15';
        parsed.solutionBundleId = 'D06.02.15.01';
        parsed.category = 'Multivendor Marketplace';
      } else if (q.includes('ai') || q.includes('robot') || q.includes('quantum') || q.includes('automation')) {
        parsed.domainId = 'D04';
        parsed.category = 'Emerging Tech & Intelligent Systems';
      } else if (q.includes('local') || q.includes('delivery') || q.includes('courier')) {
        parsed.domainId = 'D06';
        parsed.subdomainId = 'D06.01';
        parsed.category = 'Hyperlocal Marketplace';
      }
    }

    return parsed;
  }

  async search(query: string, location?: LocationContextState): Promise<SearchResultItem[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResultItem[] = [];

    // 1. Search Canonical 5-Layer Catalog
    const catalogMatches = await catalogRepository.searchItems(q);
    catalogMatches.forEach((item) => {
      let badge = 'Catalog';
      let category = 'ArchitectAny Catalog';

      if (item.layer === 1) {
        badge = 'Domain (L1)';
        category = 'Domain Galaxy';
      } else if (item.layer === 2) {
        badge = 'Subdomain (L2)';
        category = 'Subdomain';
      } else if (item.layer === 3) {
        badge = 'Capability (L3)';
        category = 'Capability';
      } else if (item.layer === 4) {
        badge = 'Bundle (L4)';
        category = 'Solution Bundle';
      } else if (item.layer === 5) {
        badge = 'Solution (L5)';
        category = 'Solution Architecture';
      }

      // Hierarchy Context Path Breadcrumb
      const pathBreadcrumb = item.path && item.path.length > 1
        ? item.path.map((p) => p.name).join(' → ')
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
          path: item.path,
          rawName: item.name,
          platformOptions: (item as any).platformOptions,
          relatedCapabilities: (item as any).relatedCapabilities,
        },
      });
    });

    // 2. Search Location-Aware Services & Providers
    SAMPLE_SERVICES.forEach((srv) => {
      const matchText =
        srv.name.toLowerCase().includes(q) ||
        srv.category.toLowerCase().includes(q) ||
        srv.location.city.toLowerCase().includes(q) ||
        srv.location.pincode.includes(q) ||
        (srv.description && srv.description.toLowerCase().includes(q));

      if (matchText) {
        results.push({
          id: srv.id,
          type: 'service',
          name: srv.name,
          description: srv.description,
          category: srv.category,
          badge: srv.location.city,
          location: {
            city: srv.location.city,
            pincode: srv.location.pincode,
            latitude: srv.location.latitude,
            longitude: srv.location.longitude,
            address: srv.location.address,
          },
          meta: {
            providerId: srv.providerId,
            rating: srv.rating,
          },
        });
      }
    });

    return results.slice(0, 8);
  }

  subscribe(listener: (intent: IntentState) => void): () => void {
    this.listeners.push(listener);
    listener(this.currentIntent);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.currentIntent));
  }
}

export const intentService = new IntentService();
