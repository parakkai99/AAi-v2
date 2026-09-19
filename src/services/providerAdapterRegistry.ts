/**
 * AAi Provider Adapter Registry
 * SERVICE: PROVIDER-REGISTRY-001
 *
 * Registry boundary only. Concrete provider adapters can be added without
 * changing the core definition model.
 */

import type { ProviderAdapter, ProviderKind } from "../contracts/provider";

export class ProviderAdapterRegistry {
  private readonly adapters = new Map<ProviderKind, ProviderAdapter>();

  register(adapter: ProviderAdapter): void {
    this.adapters.set(adapter.provider, adapter);
  }

  get(provider: ProviderKind): ProviderAdapter | undefined {
    return this.adapters.get(provider);
  }

  has(provider: ProviderKind): boolean {
    return this.adapters.has(provider);
  }

  list(): readonly ProviderKind[] {
    return [...this.adapters.keys()];
  }
}

export const providerAdapterRegistry = new ProviderAdapterRegistry();
