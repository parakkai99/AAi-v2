/**
 * AAi Data Mapping Service
 * SERVICE: DATA-MAPPING-001
 *
 * Applies explicit source-to-target mappings to create a new definition copy.
 * It never mutates the source object.
 */

import type { DataMapping } from "../contracts/dataIntake";

export interface DataMappingResult<T extends Record<string, unknown>> {
  readonly output: T;
  readonly mappedPaths: readonly string[];
  readonly missingPaths: readonly string[];
  readonly conflicts: readonly string[];
}

export function applyDataMappings<T extends Record<string, unknown>>(
  source: Readonly<Record<string, unknown>>,
  mappings: readonly DataMapping[],
  base: T,
): DataMappingResult<T> {
  const output = structuredClone(base) as T;
  const mappedPaths: string[] = [];
  const missingPaths: string[] = [];
  const conflicts: string[] = [];

  for (const mapping of mappings) {
    if (mapping.status === "REJECTED" || mapping.status === "CONFLICT") {
      conflicts.push(mapping.mappingId);
      continue;
    }

    const value = readPath(source, mapping.sourcePath);

    if (value === undefined) {
      missingPaths.push(mapping.targetPath);
      continue;
    }

    writePath(output, mapping.targetPath, value);
    mappedPaths.push(mapping.targetPath);
  }

  return { output, mappedPaths, missingPaths, conflicts };
}

function readPath(source: Readonly<Record<string, unknown>>, path: string): unknown {
  return path.split(".").reduce<unknown>((current, segment) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[segment];
  }, source);
}

function writePath(target: Record<string, unknown>, path: string, value: unknown): void {
  const segments = path.split(".").filter(Boolean);
  if (segments.length === 0) return;

  let cursor = target;

  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];
    const next = cursor[segment];

    if (!next || typeof next !== "object" || Array.isArray(next)) {
      cursor[segment] = {};
    }

    cursor = cursor[segment] as Record<string, unknown>;
  }

  cursor[segments[segments.length - 1]] = value;
}
