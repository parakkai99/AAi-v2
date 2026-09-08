/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Contract: AAi-Agent-OS — AGENT INTENT & ENGINEERING YAML CONTRACT
 * Milestone: M01-E — PARSER GUIDANCE + AI ENGINEERING OUTPUT
 * Status: ACTIVE
 * Version: 1.0.0
 * 
 * Fundamental Rules:
 * 1. AAi JSON = canonical AAi knowledge/context source.
 * 2. YAML = structured Agent OS task/engineering contract representation.
 * 3. Git = implementation / source-of-truth.
 * 4. Do NOT duplicate large raw AAi JSON in YAML; use AAi Area References as pointers.
 * 5. Provider-neutral agent contract (Antigravity, Claude, Codex, Perplexity, Catalyst, etc.).
 * 6. Truth rule: planned vs actual vs verified must NEVER be confused.
 */

export type ValueProvenance =
  | 'USER_PROVIDED'
  | 'AAI_CONTEXT'
  | 'PARSER_INFERRED'
  | 'DEFAULT'
  | 'UNKNOWN';

export interface FieldProvenanceAudit {
  field: string;
  value: unknown;
  source: ValueProvenance;
  note?: string;
}

/**
 * AAi Area Reference pointer into the canonical JSON Universe
 */
export interface AreaRefYaml {
  id: string;
  title: string;
  source: string;
  parent?: string;
  status: string;
}

/**
 * Canonical Intent YAML Contract (Produced by Intent Parser)
 */
export interface IntentYaml {
  intent: {
    id: string;
    title: string;
    description: string;
    category: string;
    priority: string;
  };
  context: {
    area_ref: AreaRefYaml | null;
    domain: string;
    business_world: string;
    capability: string;
    source: string;
    status: string;
  };
  objective: {
    desired_outcome: string;
    success_definition: string;
  };
  scope: {
    include: string[];
    exclude: string[];
  };
  constraints: {
    technical: string[];
    business: string[];
    security: string[];
    ip: string;
    workspace: string;
  };
  workspace: {
    id: string;
    name: string;
    environment: string;
    repository: string;
    branch: string;
  };
  agent: {
    requested: string;
    recommended: string;
    reason: string;
    provider?: string;
    model?: string;
    capability_profile?: string;
  };
  execution: {
    mode: string;
    allowed_operations: string[];
    allowed_paths: string[];
    prohibited_operations: string[];
    prohibited_paths: string[];
  };
  verification: {
    acceptance_criteria: string[];
    technical_checks: string[];
    regression_checks: string[];
  };
  result: {
    expected: string;
    preview_required: boolean;
  };
  ownership: {
    ip_owner: string;
  };
  security: {
    secrets_allowed_in_prompt: boolean;
    raw_credentials_allowed: boolean;
  };
}

/**
 * Canonical Engineering YAML Contract (Produced after Architect Synthesis)
 */
export interface EngineeringYaml {
  engineering: {
    task_id: string;
    title: string;
    mission: string;
    current_state: string;
    objective: string;
  };
  workspace: {
    id: string;
    name: string;
    repository: string;
    branch: string;
    environment: string;
  };
  architecture: {
    approach: string;
    components: string[];
    files: string[];
    dependencies: string[];
  };
  scope: {
    include: string[];
    exclude: string[];
  };
  implementation: {
    requirements: string[];
    constraints: string[];
    edge_cases: string[];
  };
  execution: {
    agent: string;
    mode: string;
    allowed_paths: string[];
    prohibited_paths: string[];
    allowed_operations: string[];
    prohibited_operations: string[];
  };
  verification: {
    acceptance: string[];
    typescript: string;
    build: string;
    tests: string;
    lint: string;
    git: string;
    regression: string;
  };
  git: {
    repository: string;
    branch: string;
    expected_changes: string[];
    commit_required: boolean;
  };
  result: {
    planned: {
      status: string;
      description: string;
    };
    actual: {
      status: string;
      summary: string;
    };
    status: string;
  };
  ownership: {
    ip_owner: string;
  };
  security: {
    secrets_allowed_in_prompt: boolean;
    raw_credentials_allowed: boolean;
  };
}

/**
 * Structured Agent Output YAML (Returned after execution)
 */
export interface AgentOutputYaml {
  result: {
    task_id: string;
    status: string;
    summary: string;
  };
  changes: {
    created: string[];
    modified: string[];
    deleted: string[];
  };
  execution: {
    commands: string[];
    duration: string;
    errors: string[];
  };
  verification: {
    typescript: string;
    build: string;
    tests: string;
    lint: string;
    acceptance: string;
  };
  git: {
    branch: string;
    changed_files: string[];
    diff_summary: string;
    commit: string;
  };
  artifacts: Array<{
    type: string;
    path: string;
    description: string;
  }>;
  issues: {
    blockers: string[];
    warnings: string[];
  };
  next_action: string;
}

/**
 * Validation result for YAML contract before AI Engineering handoff
 */
export interface YamlValidationReport {
  isValid: boolean;
  status: 'VALID' | 'NEEDS_CLARIFICATION';
  missingRequiredFields: string[];
  auditProvenance: FieldProvenanceAudit[];
  clarificationPrompt?: string;
}
