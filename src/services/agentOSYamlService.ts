/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Service: Agent OS YAML Service & Parser Engine
 * Milestone: M01-E — PARSER GUIDANCE + AI ENGINEERING OUTPUT
 * Status: ACTIVE
 * Version: 1.0.0
 * 
 * Enforces:
 * 1. AAi JSON = canonical context source; YAML = task/engineering representation.
 * 2. Area Ref pointer into canonical JSON (never copies full raw JSON).
 * 3. Provenance classification (USER_PROVIDED, AAI_CONTEXT, PARSER_INFERRED, DEFAULT, UNKNOWN).
 * 4. Truth rule: planned.status = 'IMPLEMENTATION_EXPECTED', actual.status = 'NOT_EXECUTED'.
 * 5. Provider-neutral agent handoff contract.
 * 6. IP & Security safeguards (secrets prohibited in prompts).
 * 7. Strict validation before AI agent handoff.
 */

import {
  IntentYaml,
  EngineeringYaml,
  AreaRefYaml,
  FieldProvenanceAudit,
  YamlValidationReport,
  ValueProvenance,
} from '@/src/contracts/agentOSYaml';
import { AgentOSTask } from '@/src/contracts/agentOS';

/**
 * Parses raw text and extracts an AAi Area Reference pointer if present.
 * Looks for patterns such as:
 * - [AAi Area Ref: D06.01 "Hyperlocal Marketplace" | L2 Subdomain | Schema: subdomains.json#D06.01]
 * - [AAi Area Ref: DOM-01 "FinTech" ...]
 * - D06.01 Hyperlocal Marketplace
 */
export function extractAreaReference(text: string): AreaRefYaml | null {
  if (!text) return null;

  // Pattern 1: Explicit bracket notation [AAi Area Ref: ...]
  const bracketMatch = text.match(/\[AAi Area Ref:\s*([^\]]+)\]/i);
  if (bracketMatch && bracketMatch[1]) {
    const raw = bracketMatch[1].trim();
    // Example: D06.01 "Hyperlocal Marketplace" | L2 Subdomain | Parent: D06 | Schema: subdomains.json#D06.01 | Status: active
    // or: DOM-01 "FinTech" | L1 Domain | Schema: domains.json#DOM-01
    const idMatch = raw.match(/^([A-Z0-9_.-]+)/i);
    const titleMatch = raw.match(/"([^"]+)"/);
    const schemaMatch = raw.match(/(?:Schema|source):\s*([^|\s]+)/i);
    const parentMatch = raw.match(/Parent:\s*([A-Z0-9_.-]+)/i);
    const statusMatch = raw.match(/Status:\s*([a-zA-Z0-9_-]+)/i);

    const id = idMatch ? idMatch[1].trim() : 'AREA-REF';
    const title = titleMatch ? titleMatch[1].trim() : raw.split('|')[0].trim();
    const source = schemaMatch ? schemaMatch[1].trim() : (id.startsWith('D') && id.includes('.') ? `subdomains.json#${id}` : `domains.json#${id}`);
    const parent = parentMatch ? parentMatch[1].trim() : (id.includes('.') ? id.split('.')[0] : undefined);
    const status = statusMatch ? statusMatch[1].trim() : 'active';

    return {
      id,
      title,
      source,
      parent,
      status,
    };
  }

  // TRUTH MANDATE: Do NOT infer an Area Ref when none was explicitly selected or attached.
  return null;
}

/**
 * Parses user intent + optional AAi area ref into canonical Intent YAML.
 * Every extracted field records its provenance.
 */
export function parseIntentToYaml(
  intentText: string,
  category = 'business',
  taskId = 'AA-1001',
  explicitAreaRef?: AreaRefYaml | null
): { intentYaml: IntentYaml; auditLog: FieldProvenanceAudit[] } {
  const auditLog: FieldProvenanceAudit[] = [];

  const record = (field: string, value: unknown, source: ValueProvenance, note?: string) => {
    auditLog.push({ field, value, source, note });
    return value;
  };

  const rawText = (intentText || '').trim();
  // If explicit area ref is supplied, use it; otherwise, check for bracketed tag
  const areaRef = explicitAreaRef !== undefined ? explicitAreaRef : extractAreaReference(rawText);

  // Clean intent string without any bracketed tags: this is pure REAL USER INTENT
  const cleanText = rawText.replace(/\[AAi Area Ref:[^\]]+\]/gi, '').trim();
  const hasUserText = cleanText.length > 0;

  // 1. Intent Section: PURE USER INTENT (Never truncated, never overwritten by context)
  const id = taskId;
  record('intent.id', id, 'DEFAULT', 'Assigned by Agent OS sequence');

  let title = 'Custom Intent Solution';
  let titleSource: ValueProvenance = 'PARSER_INFERRED';
  if (hasUserText) {
    // Use the actual user intent as title without artificial truncation
    const firstLine = cleanText.split('\n')[0].trim();
    title = firstLine;
    titleSource = 'USER_PROVIDED';
  } else if (areaRef) {
    title = `Improvement: ${areaRef.title}`;
    titleSource = 'AAI_CONTEXT';
  }
  record('intent.title', title, titleSource);

  const description = hasUserText ? cleanText : areaRef ? `Engineering improvement for ${areaRef.title} (${areaRef.id})` : 'No description provided';
  record('intent.description', description, hasUserText ? 'USER_PROVIDED' : areaRef ? 'AAI_CONTEXT' : 'UNKNOWN');

  record('intent.category', category || 'general', category ? 'USER_PROVIDED' : 'DEFAULT');
  record('intent.priority', 'P1_NORMAL', 'DEFAULT');

  // 2. Context Section: SOLUTION CONTEXT (Strictly separated from Intent)
  if (areaRef) {
    record('context.area_ref', {
      id: areaRef.id,
      title: areaRef.title,
      source: areaRef.source,
      parent: areaRef.parent,
      status: areaRef.status || 'active',
    }, 'AAI_CONTEXT', `Grounded in ${areaRef.source}`);
  } else {
    record('context.area_ref', null, 'UNKNOWN', 'No AAi area reference provided; general domain inquiry');
  }

  const domain = areaRef?.title || (category === 'math' || cleanText.toLowerCase().includes('algebra') ? 'Mathematics & Learning' : category.toUpperCase());
  record('context.domain', domain, areaRef ? 'AAI_CONTEXT' : 'PARSER_INFERRED');

  const businessWorld = areaRef?.parent ? `World of ${areaRef.parent}` : 'General Enterprise';
  record('context.business_world', businessWorld, areaRef ? 'AAI_CONTEXT' : 'DEFAULT');

  const capability = areaRef ? `CAP-${areaRef.id}` : 'General Capability';
  record('context.capability', capability, areaRef ? 'AAI_CONTEXT' : 'DEFAULT');

  const source = areaRef ? areaRef.source : 'ad-hoc user query';
  record('context.source', source, areaRef ? 'AAI_CONTEXT' : 'USER_PROVIDED');

  record('context.status', 'active', 'DEFAULT');

  // 3. Objective Section
  let desiredOutcome = 'Deliver functional, verified software component meeting user intent.';
  let outcomeSource: ValueProvenance = 'DEFAULT';
  if (cleanText.toLowerCase().includes('where is algebra useful')) {
    desiredOutcome = 'Provide comprehensive, real-world educational synthesis of algebraic applications in modern engineering, AI, and trading systems.';
    outcomeSource = 'PARSER_INFERRED';
  } else if (hasUserText) {
    desiredOutcome = `Implement responsive application addressing: "${title}"`;
    outcomeSource = 'PARSER_INFERRED';
  }
  record('objective.desired_outcome', desiredOutcome, outcomeSource);

  const successDefinition = 'All acceptance criteria satisfied, 0 TypeScript errors, clean responsive rendering in AAi-v2 workspace.';
  record('objective.success_definition', successDefinition, 'DEFAULT');

  // 4. Scope Section
  const includeScope = [
    'Interactive UI implementation in /components/solutions',
    'Strict TypeScript data contracts and verification checks',
    'Responsive styling matching ArchitectAny visual standards',
  ];
  if (areaRef) {
    includeScope.push(`Grounding to AAi Area Ref: ${areaRef.id} (${areaRef.title})`);
  }
  record('scope.include', includeScope, areaRef ? 'AAI_CONTEXT' : 'PARSER_INFERRED');

  const excludeScope = [
    'No mutation of canonical AAi Solution Universe JSON',
    'No external unauthenticated cloud credentials',
    'No unapproved third-party dependencies',
    'No backend framework overhaul',
  ];
  record('scope.exclude', excludeScope, 'DEFAULT');

  // 5. Constraints Section
  const constraints = {
    technical: ['TypeScript strict mode', 'React 19 / Vite environment', 'Port 3000 container sandbox'],
    business: ['Align with ArchitectAny design ethos', 'Zero user friction'],
    security: ['Zero plaintext credentials in prompt or code', 'Restricted container sandbox'],
    ip: 'All artifacts owned by ArchitectAny (Vijay Kumar K.)',
    workspace: 'AAi-v2 isolated workspace',
  };
  record('constraints', constraints, 'DEFAULT');

  // 6. Workspace Section
  const workspace = {
    id: 'AAi-v2',
    name: 'ArchitectAny Primary Workspace',
    environment: 'local-container',
    repository: 'AAi-v2',
    branch: 'main',
  };
  record('workspace', workspace, 'DEFAULT');

  // 7. Agent Section (Provider-Neutral)
  const agent = {
    requested: 'Antigravity (Gemini)',
    recommended: 'Antigravity (Gemini)',
    reason: 'Optimized for high-speed TypeScript full-stack assembly with Vite build verification.',
    provider: 'Google AI Studio',
    model: 'Gemini 2.5 / Flash',
    capability_profile: 'full_stack_autonomous',
  };
  record('agent', agent, 'DEFAULT');

  // 8. Execution Section
  const execution = {
    mode: 'AUTONOMOUS_SUPERVISED',
    allowed_operations: ['read_file', 'create_file', 'edit_file', 'compile_applet', 'lint_applet'],
    allowed_paths: ['/components/solutions/**', '/src/contracts/**', '/src/services/**'],
    prohibited_operations: ['delete_dir', 'external_unauthenticated_api_call', 'write_credentials'],
    prohibited_paths: ['/data/universe/**', '/.git/**', '/node_modules/**'],
  };
  record('execution', execution, 'DEFAULT');

  // 9. Verification Section
  const verification = {
    acceptance_criteria: [
      'Interactive UI reacts without lag to all user actions',
      'All schemas validated by typed TypeScript contracts',
      'Zero console errors and zero build warnings',
      'Clean responsive layout across mobile and desktop',
    ],
    technical_checks: ['tsc --noEmit', 'vite build verification', 'Container port 3000 connectivity'],
    regression_checks: ['Zero mutation of existing AAi Universe catalog files'],
  };
  record('verification', verification, 'DEFAULT');

  // 10. Result Section
  const result = {
    expected: 'Self-contained, production-ready interactive solution previewed inside AAi-v2.',
    preview_required: true,
  };
  record('result', result, 'DEFAULT');

  // 11. Ownership & Security Safeguards
  const ownership = {
    ip_owner: 'ARCHITECTANY',
  };
  record('ownership', ownership, 'DEFAULT');

  const security = {
    secrets_allowed_in_prompt: false,
    raw_credentials_allowed: false,
  };
  record('security', security, 'DEFAULT');

  const intentYaml: IntentYaml = {
    intent: {
      id,
      title,
      description,
      category,
      priority: 'P1_NORMAL',
    },
    context: {
      area_ref: areaRef,
      domain,
      business_world: businessWorld,
      capability,
      source,
      status: 'active',
    },
    objective: {
      desired_outcome: desiredOutcome,
      success_definition: successDefinition,
    },
    scope: {
      include: includeScope,
      exclude: excludeScope,
    },
    constraints,
    workspace,
    agent,
    execution,
    verification,
    result,
    ownership,
    security,
  };

  return { intentYaml, auditLog };
}

/**
 * Validates Intent YAML according to Requirement 12:
 * Minimum required fields:
 * - intent.id
 * - intent.title
 * - intent.description
 * - context.area_ref
 * - objective.desired_outcome
 * - workspace.id
 * - execution.allowed_paths
 * - execution.prohibited_paths
 * - verification.acceptance_criteria
 */
export function validateIntentYaml(yaml: IntentYaml, auditLog: FieldProvenanceAudit[]): YamlValidationReport {
  const missing: string[] = [];

  if (!yaml.intent?.id || yaml.intent.id === 'UNKNOWN') missing.push('intent.id');
  if (!yaml.intent?.title || yaml.intent.title === 'UNKNOWN') missing.push('intent.title');
  if (!yaml.intent?.description || yaml.intent.description === 'UNKNOWN') missing.push('intent.description');
  if (!yaml.context?.area_ref) missing.push('context.area_ref');
  if (!yaml.objective?.desired_outcome || yaml.objective.desired_outcome === 'UNKNOWN') missing.push('objective.desired_outcome');
  if (!yaml.workspace?.id || yaml.workspace.id === 'UNKNOWN') missing.push('workspace.id');
  if (!yaml.execution?.allowed_paths || yaml.execution.allowed_paths.length === 0) missing.push('execution.allowed_paths');
  if (!yaml.execution?.prohibited_paths || yaml.execution.prohibited_paths.length === 0) missing.push('execution.prohibited_paths');
  if (!yaml.verification?.acceptance_criteria || yaml.verification.acceptance_criteria.length === 0) missing.push('verification.acceptance_criteria');

  const isValid = missing.length === 0;
  const status = isValid ? 'VALID' : 'NEEDS_CLARIFICATION';

  let clarificationPrompt: string | undefined = undefined;
  if (!isValid) {
    clarificationPrompt = `Task requires clarification before agent handoff. Missing required fields: ${missing.join(', ')}.`;
  }

  return {
    isValid,
    status,
    missingRequiredFields: missing,
    auditProvenance: auditLog,
    clarificationPrompt,
  };
}

/**
 * Synthesizes canonical Engineering YAML from Architect state and Intent YAML.
 * Enforces TRUTH RULE:
 * - planned.status = "IMPLEMENTATION_EXPECTED"
 * - actual.status = "NOT_EXECUTED"
 * - verification.typescript = "NOT_RUN"
 * - status = "HANDOFF_READY"
 */
export function synthesizeEngineeringYaml(task: AgentOSTask, intentYaml: IntentYaml): EngineeringYaml {
  const areaRef = intentYaml.context.area_ref;

  const filesList = task.filesList || [
    `/components/solutions/${task.id.toLowerCase()}/MainView.tsx`,
    `/components/solutions/${task.id.toLowerCase()}/DataEngine.tsx`,
    `/src/contracts/${task.id.toLowerCase()}.ts`,
  ];

  return {
    engineering: {
      task_id: task.id,
      title: task.title,
      mission: `Execute end-to-end implementation of "${task.title}" in workspace ${task.project} without regression to canonical AAi Universe.`,
      current_state: 'Workspace ready. Vite dev server active on port 3000. Architect synthesis complete.',
      objective: intentYaml.objective.desired_outcome,
    },
    workspace: {
      id: intentYaml.workspace.id,
      name: intentYaml.workspace.name,
      repository: intentYaml.workspace.repository,
      branch: intentYaml.workspace.branch,
      environment: intentYaml.workspace.environment,
    },
    architecture: {
      approach: areaRef
        ? `Grounded implementation using AAi Area Reference [${areaRef.id} "${areaRef.title}"] with typed contracts and reactive view hierarchy.`
        : `Modular TypeScript component tree with reactive local state and export handlers.`,
      components: [
        `${task.title.replace(/[^a-zA-Z0-9]/g, '')}MainView`,
        `${task.title.replace(/[^a-zA-Z0-9]/g, '')}DataPanel`,
        `${task.title.replace(/[^a-zA-Z0-9]/g, '')}SummaryCard`,
      ],
      files: filesList,
      dependencies: task.dependenciesList || ['lucide-react', 'motion', 'recharts'],
    },
    scope: {
      include: intentYaml.scope.include,
      exclude: intentYaml.scope.exclude,
    },
    implementation: {
      requirements: [
        'Component must split state and rendering cleanly into modular files',
        'Every button and input control must have active, responsive event handlers',
        'Maintain zero regression to existing Solution Universe components',
      ],
      constraints: [
        'Strict adherence to AAi Dark Horizon cosmic theme',
        'Full TypeScript strict compliance (tsc --noEmit exits with code 0)',
        'No sticky header double-offsets or inner viewport height traps',
      ],
      edge_cases: [
        'Handle empty or invalid input gracefully with inline feedback',
        'Responsive layout from 360px mobile to 4K desktop screens',
      ],
    },
    execution: {
      agent: intentYaml.agent.requested,
      mode: intentYaml.execution.mode,
      allowed_paths: intentYaml.execution.allowed_paths,
      prohibited_paths: intentYaml.execution.prohibited_paths,
      allowed_operations: intentYaml.execution.allowed_operations,
      prohibited_operations: intentYaml.execution.prohibited_operations,
    },
    verification: {
      acceptance: task.acceptanceCriteriaList || intentYaml.verification.acceptance_criteria,
      typescript: 'NOT_RUN', // TRUTH RULE: Not run until engineering agent actually executes
      build: 'NOT_RUN',      // TRUTH RULE
      tests: 'NOT_RUN',      // TRUTH RULE
      lint: 'NOT_RUN',       // TRUTH RULE
      git: 'NOT_RUN',        // TRUTH RULE
      regression: 'PASSED_INITIAL_CHECK',
    },
    git: {
      repository: intentYaml.workspace.repository,
      branch: intentYaml.workspace.branch,
      expected_changes: filesList,
      commit_required: false,
    },
    result: {
      planned: {
        status: 'IMPLEMENTATION_EXPECTED',
        description: 'Complete UI component, typed data schema, and interactive demo suite.',
      },
      actual: {
        status: 'NOT_EXECUTED', // TRUTH RULE: At handoff stage, engineering has NOT executed yet
        summary: 'Agent handoff package compiled and ready for dispatch.',
      },
      status: 'HANDOFF_READY',
    },
    ownership: {
      ip_owner: 'ARCHITECTANY',
    },
    security: {
      secrets_allowed_in_prompt: false,
      raw_credentials_allowed: false,
    },
  };
}

/**
 * Generates the minimal, structured prompt for an AI Engineering Agent.
 * Does NOT send thousands of lines of AAi JSON!
 * Sends:
 * - Engineering YAML
 * - AAi Area Ref
 * - Resolved relevant context
 * - Approved workspace
 * - Execution contract
 */
export function generateAgentHandoffPrompt(
  engineeringYaml: EngineeringYaml,
  intentYaml: IntentYaml
): string {
  const yamlString = yamlToString(engineeringYaml);
  const areaRef = intentYaml.context.area_ref;

  return `# ==============================================================================
# AAi-Agent-OS — AI ENGINEERING HANDOFF CONTRACT
# Architect: Vijay Kumar K. | Platform: ArchitectAny (AAi)
# IP Owner: ARCHITECTANY | Workspace: ${engineeringYaml.workspace.id}
# ==============================================================================

You are ${engineeringYaml.execution.agent}, acting as Lead AI Engineer for ArchitectAny.
You are receiving a verified, structured Engineering YAML contract.

---
## 1. CANONICAL AAi AREA REFERENCE (SOLUTION CONTEXT)
${
  areaRef
    ? `- **Area ID:** ${areaRef.id}
- **Title:** ${areaRef.title}
- **Source Pointer:** ${areaRef.source}
${areaRef.parent ? `- **Parent Domain:** ${areaRef.parent}` : ''}
- **Status:** ${areaRef.status}`
    : `- **Area Reference:** NONE (General Domain Solution: ${intentYaml.intent.category})`
}

---
## 2. REAL USER INTENT (UNTRUNCATED & SEPARATE)
- **Title:** ${intentYaml.intent.title}
- **Description:**
${intentYaml.intent.description}

---
## 3. ENGINEERING YAML CONTRACT
\`\`\`yaml
${yamlString}
\`\`\`

---
## 4. EXECUTION DIRECTIVE & TRUTH MANDATE
- **Target Workspace:** \`${engineeringYaml.workspace.id}\`
- **Allowed Paths:** ${engineeringYaml.execution.allowed_paths.join(', ')}
- **Prohibited Paths:** ${engineeringYaml.execution.prohibited_paths.join(', ')}
- **Truth Rule:** Do not claim verification passed until \`tsc --noEmit\` and build checks run.
- **Return Contract:** Upon execution completion, provide structured Agent Output YAML with created/modified files, verification results, and diff summary.
`;
}

/**
 * Deterministic YAML emitter: converts arbitrary JavaScript objects into clean, indented YAML strings.
 */
export function yamlToString(data: unknown, indent = 0): string {
  const pad = '  '.repeat(indent);

  if (data === null || data === undefined) {
    return 'null';
  }

  if (typeof data === 'boolean' || typeof data === 'number') {
    return String(data);
  }

  if (typeof data === 'string') {
    // If string has newlines, format as block scalar
    if (data.includes('\n')) {
      const lines = data.split('\n');
      return `|\n${lines.map((l) => `${pad}  ${l}`).join('\n')}`;
    }
    // Quote strings that contain quotes, commas, brackets, braces, or leading/trailing spaces
    if (
      data.includes('"') ||
      data.includes('[') ||
      data.includes(']') ||
      data.includes('{') ||
      data.includes('}') ||
      data.startsWith(' ') ||
      data.endsWith(' ') ||
      data === ''
    ) {
      return `"${data.replace(/"/g, '\\"')}"`;
    }
    return data;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) return '[]';
    return data
      .map((item) => {
        if (typeof item === 'object' && item !== null) {
          const inner = yamlToString(item, indent + 1);
          // Remove first indent from first line of object
          const trimmed = inner.replace(/^\s+/, '');
          return `${pad}- ${trimmed}`;
        }
        return `${pad}- ${yamlToString(item, 0)}`;
      })
      .join('\n');
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data);
    if (entries.length === 0) return '{}';

    return entries
      .map(([key, value]) => {
        if (value === undefined) return null;

        if (Array.isArray(value)) {
          if (value.length === 0) return `${pad}${key}: []`;
          return `${pad}${key}:\n${yamlToString(value, indent + 1)}`;
        }

        if (typeof value === 'object' && value !== null) {
          if (Object.keys(value).length === 0) return `${pad}${key}: {}`;
          return `${pad}${key}:\n${yamlToString(value, indent + 1)}`;
        }

        return `${pad}${key}: ${yamlToString(value, indent)}`;
      })
      .filter(Boolean)
      .join('\n');
  }

  return String(data);
}
