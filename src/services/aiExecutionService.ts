/** AAi B06 — Structured AI execution boundary. AI output stays explicit, traceable and approval-aware. */
import type { AIPromptDefinition, AIStructuredResult } from "../contracts/ai";
import type { ValidationResult } from "../contracts/validation";

export interface AIExecutionRequest {
  readonly prompt: AIPromptDefinition;
  readonly sourceRefs: readonly string[];
  readonly input: Readonly<Record<string, unknown>>;
}

export interface AIExecutionResult {
  readonly result: AIStructuredResult;
  readonly validation: ValidationResult;
}

export function validateAIResult(
  request: AIExecutionRequest,
  result: AIStructuredResult,
  checkedAt = new Date().toISOString(),
): AIExecutionResult {
  const issues = [];
  if (result.promptId !== request.prompt.promptId) issues.push({ code:"AI_PROMPT_MISMATCH", severity:"ERROR" as const, path:"promptId", message:"Result promptId does not match the requested prompt." });
  if (result.promptVersion !== request.prompt.version) issues.push({ code:"AI_PROMPT_VERSION_MISMATCH", severity:"ERROR" as const, path:"promptVersion", message:"Result prompt version does not match the requested prompt." });
  if (result.stage !== request.prompt.stage) issues.push({ code:"AI_STAGE_MISMATCH", severity:"ERROR" as const, path:"stage", message:"Result stage does not match the requested prompt stage." });
  if (result.sourceRefs.some((ref) => !request.sourceRefs.includes(ref))) issues.push({ code:"AI_SOURCE_NOT_REQUESTED", severity:"WARNING" as const, path:"sourceRefs", message:"Result contains a source reference that was not supplied to the request." });
  const blocking = issues.some((issue) => issue.severity === "ERROR");
  return {
    result,
    validation: { valid: !blocking, severity: blocking ? "ERROR" : issues.length ? "WARNING" : "INFO", schemaVersion:"1.0.0", issues, checkedAt },
  };
}
