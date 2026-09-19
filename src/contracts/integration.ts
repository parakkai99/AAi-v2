/**
 * AAi Service / Agent / Workflow / Integration Contracts
 * CONTRACT: CAPABILITY-FABRIC-001
 */

export type CapabilityKind = "SERVICE" | "AGENT" | "PROVIDER" | "WORKFLOW";

export interface ServiceDefinition {
  readonly serviceId: string;
  readonly name: string;
  readonly kind: "SERVICE";
  readonly inputs?: readonly string[];
  readonly outputs?: readonly string[];
  readonly dependencies?: readonly string[];
  readonly capabilities?: readonly string[];
}

export interface AgentDefinition {
  readonly agentId: string;
  readonly name: string;
  readonly kind: "AGENT";
  readonly objective: string;
  readonly tools?: readonly string[];
  readonly skills?: readonly string[];
  readonly guardrails?: readonly string[];
  readonly humanApprovalRequired?: boolean;
}

export interface WorkflowDefinition {
  readonly workflowId: string;
  readonly name: string;
  readonly kind: "WORKFLOW";
  readonly steps: readonly string[];
  readonly longRunning?: boolean;
  readonly resumable?: boolean;
  readonly compensation?: readonly string[];
}

export interface ProviderServiceDefinition {
  readonly providerServiceId: string;
  readonly providerId: string;
  readonly serviceId: string;
  readonly availability?: Readonly<Record<string, unknown>>;
  readonly pricing?: Readonly<Record<string, unknown>>;
}

export interface IntegrationDefinition {
  readonly integrationId: string;
  readonly name: string;
  readonly type: string;
  readonly direction?: "INBOUND" | "OUTBOUND" | "BIDIRECTIONAL";
  readonly endpointRef?: string;
  readonly authProfileRef?: string;
  readonly dataMappingRef?: string;
  readonly refreshPolicy?: Readonly<Record<string, unknown>>;
  readonly webhookEvents?: readonly string[];
}
