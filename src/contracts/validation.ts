/**
 * AAi Contract Validation Result
 * CONTRACT: VALIDATION-001
 */

export type ValidationSeverity = "INFO" | "WARNING" | "ERROR" | "BLOCKED";

export interface ValidationIssue {
  readonly code: string;
  readonly severity: ValidationSeverity;
  readonly path: string;
  readonly message: string;
  readonly references?: readonly string[];
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly severity: ValidationSeverity;
  readonly schemaVersion: string;
  readonly issues: readonly ValidationIssue[];
  readonly checkedAt: string;
}

export interface ContractValidationRules {
  readonly ruleId: string;
  readonly name: string;
  readonly appliesTo: string;
  readonly description: string;
  readonly blocking: boolean;
}
