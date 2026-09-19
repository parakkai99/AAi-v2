/**
 * AAi Built-in Provider Registry
 * SERVICE: PROVIDER-REGISTRY-002
 */

import { providerAdapterRegistry } from "./providerAdapterRegistry";
import { RelationalProviderAdapter } from "./providerAdapters";
import { DocumentProviderAdapter } from "./documentProviderAdapter";

export function registerBuiltInProviderAdapters(): void {
  if (!providerAdapterRegistry.has("POSTGRESQL")) {
    providerAdapterRegistry.register(new RelationalProviderAdapter("POSTGRESQL"));
  }

  if (!providerAdapterRegistry.has("MYSQL")) {
    providerAdapterRegistry.register(new RelationalProviderAdapter("MYSQL"));
  }

  if (!providerAdapterRegistry.has("NOSQL")) {
    providerAdapterRegistry.register(new DocumentProviderAdapter());
  }
}
