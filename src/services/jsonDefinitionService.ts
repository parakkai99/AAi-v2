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

export async function generateCanonicalJson(
  definition: AAiDefinitionPackage,
  generatedCopy?: GeneratedCopyMetadata,
): Promise<JsonGenerationResult> {
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
    contentHash: await sha256(json),
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

async function sha256(value: string): Promise<string> {
  const cryptoApi = globalThis.crypto;
  if (!cryptoApi?.subtle) {
    throw new Error("Web Crypto SHA-256 is required for canonical JSON hashing.");
  }

  const bytes = new TextEncoder().encode(value);
  const digest = await cryptoApi.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
