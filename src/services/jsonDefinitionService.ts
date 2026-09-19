/**
 * AAi JSON Definition Service
 * SERVICE: JSON-DEFINITION-001
 *
 * Generates and parses portable AAi JSON. It never overwrites the source
 * definition and always validates the generated document.
 */

import type { AAiDefinitionPackage } from "../contracts/definition";
import type { CanonicalJsonDocument, JsonGenerationResult, JsonParseResult } from "../contracts/json";
import type { GeneratedCopyMetadata } from "../contracts/dataIntake";
import { validateDefinitionPackage } from "./definitionValidator";

export function generateCanonicalJson(
  definition: AAiDefinitionPackage,
  generatedCopy?: GeneratedCopyMetadata,
): JsonGenerationResult {
  const document: CanonicalJsonDocument = {
    format: "AAI-DEFINITION",
    schemaVersion: definition.control.schemaVersion,
    definition,
    generatedCopy,
  };

  const json = JSON.stringify(document, null, 2);
  const validation = validateDefinitionPackage(
    definition,
    new Date().toISOString(),
  );

  return {
    document,
    json,
    contentHash: stableHash(json),
    validation,
  };
}

export function parseCanonicalJson(
  json: string,
  checkedAt = new Date().toISOString(),
): JsonParseResult {
  try {
    const parsed = JSON.parse(json) as Partial<CanonicalJsonDocument>;

    if (parsed.format !== "AAI-DEFINITION" || !parsed.definition) {
      return {
        validation: {
          valid: false,
          severity: "ERROR",
          schemaVersion: String(parsed.schemaVersion ?? "unknown"),
          issues: [{
            code: "JSON_ENVELOPE_INVALID",
            severity: "ERROR",
            path: "root",
            message: "Expected an AAI-DEFINITION envelope with a definition.",
          }],
          checkedAt,
        },
      };
    }

    const validation = validateDefinitionPackage(parsed.definition, checkedAt);
    return {
      document: parsed as CanonicalJsonDocument,
      validation,
    };
  } catch (error) {
    return {
      validation: {
        valid: false,
        severity: "ERROR",
        schemaVersion: "unknown",
        issues: [{
          code: "JSON_PARSE_FAILED",
          severity: "ERROR",
          path: "root",
          message: error instanceof Error ? error.message : "Invalid JSON.",
        }],
        checkedAt,
      },
    };
  }
}

function stableHash(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}
