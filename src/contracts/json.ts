/**
 * AAi Canonical JSON Definition Contracts
 * CONTRACT: JSON-DEFINITION-001
 *
 * JSON is the portable definition/control representation. It is validated
 * before persistence, publication, or deployment.
 */

import type { AAiDefinitionPackage } from "./definition";
import type { GeneratedCopyMetadata } from "./dataIntake";
import type { ValidationResult } from "./validation";

export interface CanonicalJsonDocument {
  readonly format: "AAI-DEFINITION";
  readonly schemaVersion: string;
  readonly definition: AAiDefinitionPackage;
  readonly generatedCopy?: GeneratedCopyMetadata;
}

export interface JsonGenerationResult {
  readonly document: CanonicalJsonDocument;
  readonly json: string;
  readonly contentHash: string;
  readonly validation: ValidationResult;
}

export interface JsonParseResult {
  readonly document?: CanonicalJsonDocument;
  readonly validation: ValidationResult;
}
