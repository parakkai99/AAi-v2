/**
 * AAi AI Prompt + Structured Result Contracts
 * CONTRACT: AI-STRUCTURED-001
 *
 * AI interprets and maps information. It does not silently invent facts.
 */

export type AIPromptStage =
  | "DISCOVER"
  | "CLASSIFY"
  | "EXPAND"
  | "CROSS_CHECK"
  | "IDENTIFY_MISSING"
  | "MAP_DATA"
  | "MAP_PROVIDERS"
  | "MAP_SERVICES"
  | "MAP_AGENTS"
  | "MAP_WORKFLOWS"
  | "MAP_ASSETS"
  | "MAP_EXTERNAL_SOURCES"
  | "MAP_SEO"
  | "MAP_COMPOSITION"
  | "MAP_L6_REQUIREMENTS"
  | "VALIDATE";

export interface AIPromptDefinition {
  readonly promptId: string;
  readonly version: string;
  readonly stage: AIPromptStage;
  readonly purpose: string;
  readonly systemInstruction?: string;
  readonly inputSchemaRef: string;
  readonly outputSchemaRef: string;
  readonly rules: readonly string[];
  readonly active: boolean;
}

export interface AIMissingInformation {
  readonly path: string;
  readonly reason: string;
  readonly required: boolean;
  readonly sourceEvidenceRefs?: readonly string[];
}

export interface AIConfidence {
  readonly path: string;
  readonly score: number;
  readonly reason?: string;
}

export interface AIStructuredResult {
  readonly resultId: string;
  readonly promptId: string;
  readonly promptVersion: string;
  readonly sourceRefs: readonly string[];
  readonly stage: AIPromptStage;
  readonly output: Readonly<Record<string, unknown>>;
  readonly missingInformation: readonly AIMissingInformation[];
  readonly conflicts: readonly string[];
  readonly confidence: readonly AIConfidence[];
  readonly generatedAt: string;
  readonly requiresHumanApproval: boolean;
}
