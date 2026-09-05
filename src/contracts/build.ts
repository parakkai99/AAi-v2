/**
 * ============================================================
 * AAi CONTRACT SIGNATURE
 * ============================================================
 *
 * Contract: 11 — Build / Deployment
 * Contract ID: AAI-CONTRACT-011
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Status: DRAFT
 * Version: 1.0.0
 *
 * ============================================================
 *
 * Architectural Principles:
 *
 * - A Solution Specification defines WHAT is to be built.
 * - A Build defines the execution of that specification.
 * - An Application is the resulting software artifact.
 * - A Deployment represents an application running in a
 *   specific runtime/environment.
 * - Build and Deployment ownership are explicit.
 * - Build history is preserved.
 * - Deployment may be independent from solution ownership.
 * - AAi remains cloud-neutral.
 * - Catalyst, AWS, Kubernetes, or other runtimes are
 *   implementation targets, not architectural dependencies.
 *
 * ============================================================
 */

export type BuildStatus =
  | 'REQUESTED'
  | 'QUEUED'
  | 'VALIDATING'
  | 'BUILDING'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'CANCELLED';

export type ApplicationStatus =
  | 'CREATED'
  | 'READY'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'ARCHIVED';

export type DeploymentStatus =
  | 'REQUESTED'
  | 'PROVISIONING'
  | 'DEPLOYING'
  | 'ACTIVE'
  | 'FAILED'
  | 'SUSPENDED'
  | 'STOPPED'
  | 'DECOMMISSIONED';

export type RuntimeProvider =
  | 'AAI_RUNTIME'
  | 'ZOHO_CATALYST'
  | 'AWS'
  | 'AZURE'
  | 'GCP'
  | 'KUBERNETES'
  | 'OTHER';

export type EnvironmentType =
  | 'DEVELOPMENT'
  | 'TEST'
  | 'STAGING'
  | 'PRODUCTION';

export type ApplicationType =
  | 'WEB'
  | 'MOBILE'
  | 'RESPONSIVE_WEB'
  | 'API'
  | 'FULL_STACK'
  | 'SERVICE'
  | 'OTHER';

/**
 * ============================================================
 * Build Source
 * ============================================================
 */

export interface AAiBuildSource {
  /**
   * Specification being built.
   */
  specificationId: string;

  /**
   * Exact specification version.
   */
  specificationVersion: number;

  /**
   * Container from which the specification originated.
   */
  containerId: string;

  /**
   * Catalog version used by the specification.
   */
  catalogVersion?: string;
}

/**
 * ============================================================
 * Build Request
 * ============================================================
 */

export interface AAiBuildRequest {
  buildId: string;

  source: AAiBuildSource;

  status: BuildStatus;

  /**
   * User requesting the build.
   */
  requestedBy: string;

  requestedAt: string;

  startedAt?: string;

  completedAt?: string;

  /**
   * Runtime/build target.
   */
  target: {
    provider: RuntimeProvider;

    environment: EnvironmentType;

    region?: string;

    configuration?: Record<string, unknown>;
  };

  /**
   * Application requirements.
   */
  application: {
    name: string;

    type: ApplicationType;

    targets?: Array<
      'DESKTOP'
      | 'TABLET'
      | 'MOBILE'
      | 'WEB'
      | 'APP'
    >;
  };

  /**
   * Build engine reference.
   *
   * This may later point to AALab, Catalyst,
   * AWS build infrastructure, etc.
   */
  buildEngine?: string;

  /**
   * Result artifact references.
   */
  artifacts?: AAiBuildArtifact[];

  error?: AAiBuildError;

  /**
   * Audit references.
   */
  auditEventIds?: string[];
}

/**
 * ============================================================
 * Build Artifact
 * ============================================================
 */

export interface AAiBuildArtifact {
  artifactId: string;

  buildId: string;

  name: string;

  type:
    | 'APPLICATION'
    | 'PACKAGE'
    | 'CONTAINER'
    | 'BUNDLE'
    | 'DOCUMENTATION'
    | 'CONFIGURATION'
    | 'OTHER';

  /**
   * Secure artifact location/reference.
   */
  uri?: string;

  checksum?: string;

  createdAt: string;
}

/**
 * ============================================================
 * Build Error
 * ============================================================
 */

export interface AAiBuildError {
  code: string;

  message: string;

  stage?: string;

  retryable: boolean;

  occurredAt: string;
}

/**
 * ============================================================
 * Application
 * ============================================================
 *
 * The application is the logical product produced by builds.
 */

export interface AAiApplication {
  applicationId: string;

  name: string;

  type: ApplicationType;

  status: ApplicationStatus;

  /**
   * Source specification.
   */
  specificationId: string;

  containerId: string;

  workspaceId: string;

  organizationId?: string;

  /**
   * Current application owner.
   */
  owner: {
    type: 'USER' | 'ORGANIZATION' | 'WORKSPACE';
    id: string;
  };

  /**
   * Build that produced the current application version.
   */
  currentBuildId?: string;

  /**
   * Application version.
   */
  version: string;

  createdBy: string;

  createdAt: string;

  updatedAt: string;
}

/**
 * ============================================================
 * Deployment
 * ============================================================
 */

export interface AAiDeployment {
  deploymentId: string;

  applicationId: string;

  buildId: string;

  status: DeploymentStatus;

  environment: EnvironmentType;

  runtime: {
    provider: RuntimeProvider;

    runtimeId?: string;

    region?: string;

    clusterId?: string;

    configuration?: Record<string, unknown>;
  };

  /**
   * Deployment owner may differ from application owner.
   */
  owner: {
    type: 'USER' | 'ORGANIZATION' | 'WORKSPACE';
    id: string;
  };

  /**
   * User who requested the deployment.
   */
  requestedBy: string;

  requestedAt: string;

  deployedAt?: string;

  stoppedAt?: string;

  /**
   * Optional endpoint information.
   *
   * Do not store credentials here.
   */
  endpoint?: {
    url?: string;
    domain?: string;
  };

  /**
   * Infrastructure/resource references.
   */
  resources?: AAiDeploymentResource[];

  auditEventIds?: string[];
}

/**
 * ============================================================
 * Deployment Resource
 * ============================================================
 */

export interface AAiDeploymentResource {
  resourceId: string;

  resourceType:
    | 'FUNCTION'
    | 'DATABASE'
    | 'STORAGE'
    | 'CONTAINER'
    | 'API'
    | 'QUEUE'
    | 'CACHE'
    | 'OTHER';

  provider: RuntimeProvider;

  externalResourceId?: string;

  configuration?: Record<string, unknown>;
}

/**
 * ============================================================
 * Deployment Request
 * ============================================================
 */

export interface AAiDeploymentRequest {
  deploymentId: string;

  applicationId: string;

  buildId: string;

  requestedBy: string;

  environment: EnvironmentType;

  runtime: {
    provider: RuntimeProvider;

    region?: string;

    configuration?: Record<string, unknown>;
  };

  requestedAt: string;

  /**
   * Whether infrastructure should be created automatically.
   */
  autoProvision: boolean;

  /**
   * Whether deployment requires explicit approval.
   */
  requiresApproval: boolean;
}

/**
 * ============================================================
 * Deployment Approval
 * ============================================================
 */

export interface AAiDeploymentApproval {
  approvalId: string;

  deploymentId: string;

  requestedBy: string;

  approvedBy?: string;

  status:
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED';

  requestedAt: string;

  decidedAt?: string;

  reason?: string;
}

/**
 * ============================================================
 * Build / Deployment Ownership
 * ============================================================
 *
 * Ownership is deliberately independent at each level.
 */

export interface AAiBuildOwnership {
  buildId: string;

  owner: {
    type: 'USER' | 'ORGANIZATION' | 'WORKSPACE';
    id: string;
  };

  requestedBy: string;

  createdBy: string;
}

export interface AAiDeploymentOwnership {
  deploymentId: string;

  owner: {
    type: 'USER' | 'ORGANIZATION' | 'WORKSPACE';
    id: string;
  };

  requestedBy: string;
}

/**
 * ============================================================
 * Build Pipeline
 * ============================================================
 */

export type AAiBuildStage =
  | 'VALIDATE'
  | 'RESOLVE'
  | 'GENERATE'
  | 'COMPILE'
  | 'PACKAGE'
  | 'TEST'
  | 'PUBLISH';

export interface AAiBuildPipeline {
  buildId: string;

  stages: AAiBuildStage[];

  currentStage?: AAiBuildStage;

  completedStages: AAiBuildStage[];

  failedStage?: AAiBuildStage;

  startedAt?: string;

  completedAt?: string;
}

/**
 * ============================================================
 * Build Result
 * ============================================================
 */

export interface AAiBuildResult {
  buildId: string;

  status: 'SUCCEEDED' | 'FAILED';

  applicationId?: string;

  version?: string;

  artifacts: AAiBuildArtifact[];

  startedAt: string;

  completedAt: string;

  error?: AAiBuildError;

  auditEventIds?: string[];
}

/**
 * ============================================================
 * CONTRACT STATUS
 * ============================================================
 */

export const BUILD_DEPLOYMENT_CONTRACT = {
  contractId: 'AAI-CONTRACT-011',
  name: 'Build / Deployment',
  version: '1.0.0',
  status: 'DRAFT',
  architect: 'Vijay Kumar K.',
  platform: 'ArchitectAny',
} as const;