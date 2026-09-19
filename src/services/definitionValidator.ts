/**
 * AAi Definition Validator
 * SERVICE: DEFINITION-VALIDATOR-001
 *
 * Structural validation only. It reports gaps; it does not invent values.
 */

import type { AAiDefinitionPackage } from "../contracts/definition";
import type { ValidationIssue, ValidationResult } from "../contracts/validation";

export function validateDefinitionPackage(
  definition: AAiDefinitionPackage,
  checkedAt = new Date().toISOString(),
): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!definition.control.definitionId) {
    issues.push(error("CONTROL_ID_MISSING", "control.definitionId", "Definition ID is required."));
  }

  if (!definition.control.schemaVersion) {
    issues.push(error("SCHEMA_VERSION_MISSING", "control.schemaVersion", "Schema version is required."));
  }

  if (definition.solution) {
    validateL5(definition.solution, issues);
  }

  if (definition.solutionBag) {
    const l5Items = definition.solutionBag.items.filter((item) => item.layer === 5);
    if (l5Items.length === 0 && definition.solutionBag.checkoutEligible) {
      issues.push(error(
        "INVALID_BAG_CHECKOUT",
        "solutionBag.checkoutEligible",
        "A solution bag cannot be checkout eligible without at least one L5 item.",
      ));
    }
  }

  const blocking = issues.some((issue) => issue.severity === "BLOCKED");
  const hasErrors = issues.some((issue) => issue.severity === "ERROR");

  return {
    valid: !blocking && !hasErrors,
    severity: blocking ? "BLOCKED" : hasErrors ? "ERROR" : "INFO",
    schemaVersion: definition.control.schemaVersion,
    issues,
    checkedAt,
  };
}

function validateL5(
  solution: NonNullable<AAiDefinitionPackage["solution"]>,
  issues: ValidationIssue[],
): void {
  if (!solution.solutionId) {
    issues.push(error("L5_ID_MISSING", "solution.solutionId", "L5 solution ID is required."));
  }

  if (!solution.name) {
    issues.push(error("L5_NAME_MISSING", "solution.name", "L5 solution name is required."));
  }

  if (!solution.selection.checkoutEligible) {
    issues.push(error(
      "L5_CHECKOUT_FLAG_INVALID",
      "solution.selection.checkoutEligible",
      "A concrete L5 solution must be checkout eligible.",
    ));
  }

  if (!solution.experienceRequirements.pageModel) {
    issues.push(error(
      "L5_EXPERIENCE_MODEL_MISSING",
      "solution.experienceRequirements.pageModel",
      "L5 experience page model is required.",
    ));
  }

  if (!solution.commercial.pricing.currency) {
    issues.push(error(
      "L5_CURRENCY_MISSING",
      "solution.commercial.pricing.currency",
      "L5 commercial currency is required.",
    ));
  }
}

function error(code: string, path: string, message: string): ValidationIssue {
  return { code, severity: "ERROR", path, message };
}
