/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Contract: AAi Agent OS — Capability Registry & Command Center Contract
 * Status: ACTIVE
 * Version: 1.0.0
 * 
 * Defines data structures for:
 * 1. Top Control Bar — Future Capability Switches (Environment, Platform, Agent, Execution, Git, Research)
 * 2. 5-Phase Engineering Lifecycle (Intent → Architect → Engineer → Verify → Assemble)
 * 3. Command Center Task & Verification State
 */

import {
  IntentYaml,
  EngineeringYaml,
  YamlValidationReport,
  AreaRefYaml,
} from '@/src/contracts/agentOSYaml';

export type CapabilityCategory =
  | 'AGENT'
  | 'EXECUTION'
  | 'PLATFORM'
  | 'GIT'
  | 'RESEARCH'
  | 'MCP_TOOLS';

export type CapabilityStatus =
  | 'ACTIVE'          // Currently in-use / executing
  | 'ENABLED'         // Configured and toggled on
  | 'AVAILABLE'       // Ready to connect/enable
  | 'NOT_CONFIGURED'  // Supported in architecture, needs config
  | 'NOT_CONNECTED'   // Integration stub exists, remote link pending
  | 'FUTURE';         // Roadmapped for subsequent phases (Phase 3/4/5)

export interface CapabilityItem {
  id: string;
  name: string;
  category: CapabilityCategory;
  description: string;
  status: CapabilityStatus;
  isRecommended?: boolean;
  version?: string;
  provider?: string;
  icon?: string;
  docsUrl?: string;
  phase?: number;
  config?: Record<string, unknown>;
}

export type LifecyclePhaseId =
  | 'INTENT'
  | 'ARCHITECT'
  | 'ENGINEER'
  | 'VERIFY'
  | 'ASSEMBLE';

export interface LifecyclePhase {
  id: LifecyclePhaseId;
  stepNumber: number;
  title: string;
  subtitle: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'BLOCKED';
  color: string;
}

export type VerificationStatus =
  | 'NOT_RUN'
  | 'RUNNING'
  | 'PASSED'
  | 'FAILED'
  | 'BLOCKED'
  | 'NOT_AVAILABLE'
  | 'WARNING'
  | 'PENDING';

export interface VerificationItem {
  id: string;
  name: string;
  status: VerificationStatus;
  detail: string;
  duration?: string;
}

export interface ExecutionLogEntry {
  timestamp: string;
  message: string;
  level: 'info' | 'success' | 'warn' | 'error';
  agent?: string;
}

export interface TaskExecutionStep {
  step: number;
  title: string;
  status: 'COMPLETED' | 'WORKING' | 'PENDING';
}

export interface TaskRevisionRecord {
  revision: number;
  revisionLabel: string;
  timestamp: string;
  requestedBy: string;
  reason: string;
  affectedStage: LifecyclePhaseId;
  snapshot: {
    title: string;
    intentText: string;
    intentCategory: string;
    areaRef?: AreaRefYaml | null;
    currentPhase: LifecyclePhaseId;
    status: string;
    progressPercent: number;
    understanding?: string;
    scope?: string;
    filesList?: string[];
    acceptanceCriteriaList?: string[];
    reviewSummary?: string;
  };
}

export interface TaskActivityEvent {
  id: string;
  timestamp: string;
  source: string;
  action: string;
  details?: string;
  stage?: LifecyclePhaseId;
}

export interface TaskExecutionEvidence {
  runtime: string;
  portPreferred: number;
  portAssigned: number;
  runtimeStatus: 'AVAILABLE' | 'RUNNING' | 'STOPPED' | 'UNAVAILABLE';
  status: 'HANDOFF_READY' | 'EXECUTING' | 'COMPLETED' | 'BLOCKED';
  actualExecutionNotice: string;
  agent: string;
  provider: string;
  model: string;
  role: string;
  workspace: string;
  branch: string;
  currentOperation: string;
  startTime?: string;
  lastActivity?: string;
}

export interface TaskResultOutcome {
  planned: string;
  actual: string;
  verificationStatus: string;
  artifactType: 'APPLICATION' | 'CODE' | 'DOCS';
  artifactName: string;
  runtime: string;
  port: number;
  launchStatus: 'AVAILABLE' | 'RUNNING' | 'STOPPED' | 'UNAVAILABLE';
}

export interface AgentOSTask {
  id: string;
  title: string;
  project: string;
  createdAt: string;
  status: 'In Progress' | 'Completed' | 'Pending Review';
  currentPhase: LifecyclePhaseId;
  progressPercent: number;
  activeAgent: string;
  intentText: string;
  intentCategory: string;
  areaRef?: AreaRefYaml | null;
  revision?: number;
  revisionLabel?: string;
  revisionHistory?: TaskRevisionRecord[];
  lockedStages?: LifecyclePhaseId[];
  isCanonProtected?: boolean;
  activityLog?: TaskActivityEvent[];
  executionEvidence?: TaskExecutionEvidence;
  resultOutcome?: TaskResultOutcome;
  architectureUseCases: {
    title: string;
    items: string[];
  }[];
  filesCount: number;
  dependenciesCount: number;
  acceptanceCriteriaCount: number;
  taskSteps: TaskExecutionStep[];
  logs: ExecutionLogEntry[];
  verificationChecks: VerificationItem[];
  reviewSummary: string;
  understanding?: string;
  scope?: string;
  filesList?: string[];
  dependenciesList?: string[];
  acceptanceCriteriaList?: string[];
  promptTemplate?: string;
  engineeringPackageMarkdown?: string;
  intentYaml?: IntentYaml;
  engineeringYaml?: EngineeringYaml;
  validationReport?: YamlValidationReport;
  intentYamlString?: string;
  engineeringYamlString?: string;
  agentHandoffPrompt?: string;
  generatedSolutions: {
    id: string;
    title: string;
    icon: string;
    color: string;
    subtitle: string;
    summary: string;
    actionLabel: string;
  }[];
}

/**
 * Canonical registry of capabilities for the Top Control Bar.
 * Allows adding, enabling, or querying capabilities without rebuilding UI.
 */
export const INITIAL_CAPABILITIES_REGISTRY: CapabilityItem[] = [
  // Engineering Agents
  {
    id: 'agent-antigravity',
    name: 'Antigravity (Gemini)',
    category: 'AGENT',
    description: 'Primary DeepMind agent engine for end-to-end full-stack implementation',
    status: 'ACTIVE',
    isRecommended: true,
    version: 'Gemini 2.5/Flash',
    provider: 'Google AI Studio',
    phase: 2,
  },
  {
    id: 'agent-chatgpt',
    name: 'ChatGPT (AAi Architect)',
    category: 'AGENT',
    description: 'Architecture framing, taxonomy design, and strategic plan synthesis',
    status: 'AVAILABLE',
    version: 'GPT-4o',
    provider: 'OpenAI',
    phase: 2,
  },
  {
    id: 'agent-claude',
    name: 'Claude',
    category: 'AGENT',
    description: 'Specialized for deep contextual code review and reasoning passes',
    status: 'FUTURE',
    version: '3.5 Sonnet',
    provider: 'Anthropic',
    phase: 4,
  },
  {
    id: 'agent-codex',
    name: 'Codex',
    category: 'AGENT',
    description: 'Automated test suite generation and regression validation',
    status: 'FUTURE',
    provider: 'OpenAI',
    phase: 4,
  },
  {
    id: 'agent-perplexity',
    name: 'Perplexity',
    category: 'RESEARCH',
    description: 'Deep web literature research, API docs discovery, and citation retrieval',
    status: 'FUTURE',
    provider: 'Perplexity AI',
    phase: 4,
  },

  // Execution Environments
  {
    id: 'exec-local',
    name: 'Local Container / Sandbox',
    category: 'EXECUTION',
    description: 'Active cloud sandboxed runtime running Vite dev server on port 3000',
    status: 'ACTIVE',
    provider: 'Cloud Run Sandbox',
    phase: 1,
  },
  {
    id: 'exec-catalyst',
    name: 'Catalyst Cloud Host',
    category: 'EXECUTION',
    description: 'Distributed execution engine with multi-tenant container pooling',
    status: 'NOT_CONNECTED',
    provider: 'Catalyst Cloud',
    phase: 3,
  },

  // Platform & Orchestration
  {
    id: 'plat-command-center',
    name: 'Local Command Center',
    category: 'PLATFORM',
    description: 'Direct interactive web OS control surface',
    status: 'ACTIVE',
    phase: 1,
  },
  {
    id: 'plat-catalyst-mcp',
    name: 'Catalyst MCP (Model Context Protocol)',
    category: 'PLATFORM',
    description: 'Universal MCP server gateway for external tool and resource discovery',
    status: 'FUTURE',
    phase: 3,
  },
  {
    id: 'plat-catalyst-slate',
    name: 'Catalyst Slate',
    category: 'PLATFORM',
    description: 'Visual multi-agent collaboration board and state visualizer',
    status: 'FUTURE',
    phase: 4,
  },
  {
    id: 'plat-multi-agent',
    name: 'Multi-Agent Orchestrator',
    category: 'PLATFORM',
    description: 'Hierarchical orchestrator routing tasks across specialized agent swarms',
    status: 'FUTURE',
    phase: 5,
  },

  // Git & Repositories
  {
    id: 'git-local',
    name: 'Current Git Workspace',
    category: 'GIT',
    description: 'Active local repository branch workspace (AAi-v2)',
    status: 'ACTIVE',
    phase: 1,
  },
  {
    id: 'git-github',
    name: 'GitHub Enterprise / Cloud',
    category: 'GIT',
    description: 'Remote GitHub synchronization, automated pull requests, and commit verification',
    status: 'NOT_CONNECTED',
    phase: 3,
  },
  {
    id: 'git-gitlab',
    name: 'GitLab CI/CD',
    category: 'GIT',
    description: 'Enterprise pipeline webhooks and self-hosted repo mirroring',
    status: 'FUTURE',
    phase: 4,
  },
];
