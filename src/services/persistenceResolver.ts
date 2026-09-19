/**
 * AAi Persistence Requirement Resolver
 * SERVICE: PERSISTENCE-RESOLVER-001
 *
 * Converts logical L5 persistence requirements into a provider-neutral
 * Persistence Manifest skeleton. Physical SQL/NoSQL generation belongs to
 * provider-specific L6 adapters.
 */

import type { L5SolutionDefinition } from "../contracts/l5Solution";
import type { PersistenceManifest, PersistenceEntity } from "../contracts/manifests";

export function resolvePersistenceManifest(
  solutions: readonly L5SolutionDefinition[],
  persistenceManifestId: string,
): PersistenceManifest {
  const entityNames = unique(
    solutions.flatMap(
      (solution) => solution.persistenceRequirements?.entities ?? [],
    ),
  );

  const entities: PersistenceEntity[] = entityNames.map((name) => ({
    entityId: normalizeId(name),
    name,
    fields: [],
    relationships: [],
    lifecycle: [],
  }));

  return {
    persistenceManifestId,
    version: "1.0.0",
    entities,
    indexes: [],
    constraints: [],
    migrations: [],
    seed: [],
    rollback: [],
  };
}

function normalizeId(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}
