/**
 * AAi Composition + L6 Manifest Contracts
 * CONTRACT: MANIFESTS-001
 *
 * JSON definitions remain provider-neutral. L6 resolves them to an execution environment.
 */

export type ResolutionAction =
  | "REUSE"
  | "INSTALL"
  | "EXTEND"
  | "MODIFY"
  | "ADAPT"
  | "CONFIGURE"
  | "CONNECT"
  | "CONFLICT";

export type HumanDecisionState =
  | "AUTO_RESOLVED"
  | "REQUIRES_CONFIGURATION"
  | "REQUIRES_HUMAN_DECISION"
  | "BLOCKED";

export interface SolutionManifest {
  readonly manifestId: string;
  readonly solutionId: string;
  readonly version: string;
  readonly identity: Readonly<Record<string, unknown>>;
  readonly business: Readonly<Record<string, unknown>>;
  readonly capabilities?: readonly string[];
  readonly features?: readonly string[];
  readonly users?: readonly Readonly<Record<string, unknown>>[];
  readonly workflows?: readonly string[];
  readonly logicalEntities?: readonly Readonly<Record<string, unknown>>[];
  readonly experienceDefinitionRef?: string;
  readonly commercialDefinitionRef?: string;
  readonly providerRequirements?: readonly string[];
  readonly integrationRequirements?: readonly string[];
  readonly assetRequirements?: readonly string[];
  readonly persistenceRequirements?: readonly string[];
  readonly securityRequirements?: readonly string[];
  readonly capacityRequirements?: Readonly<Record<string, unknown>>;
  readonly geographyRequirements?: Readonly<Record<string, unknown>>;
  readonly runtimeRequirements?: Readonly<Record<string, unknown>>;
  readonly updateRequirements?: Readonly<Record<string, unknown>>;
}

export interface CompositionManifest {
  readonly compositionId: string;
  readonly version: string;
  readonly solutionIds: readonly string[];
  readonly primarySolutionId?: string;
  readonly supportingSolutionIds?: readonly string[];
  readonly sharedCapabilities?: readonly string[];
  readonly sharedEntities?: readonly string[];
  readonly sharedServices?: readonly string[];
  readonly integrationRequirements?: readonly string[];
  readonly conflicts?: readonly Readonly<Record<string, unknown>>[];
  readonly resolutionActions?: readonly Readonly<{
    requirementId: string;
    action: ResolutionAction;
    decisionState: HumanDecisionState;
    rationale?: string;
  }>[];
  readonly themeId?: string;
  readonly navigationDefinitionRef?: string;
  readonly experienceManifestId?: string;
  readonly deploymentRequirements?: Readonly<Record<string, unknown>>;
}

export interface ExperienceManifest {
  readonly experienceManifestId: string;
  readonly version: string;
  readonly solutionIds: readonly string[];
  readonly pageModel?: string;
  readonly mobileFirst?: boolean;
  readonly requiredSections?: readonly string[];
  readonly optionalSections?: readonly string[];
  readonly navigation?: Readonly<Record<string, unknown>>;
  readonly mediaRequirements?: readonly string[];
  readonly themeCompatibility?: readonly string[];
  readonly themeOverrideRef?: string;
  readonly layoutId?: string;
  readonly animationLevel?: string;
  readonly publicEntry?: Readonly<Record<string, unknown>>;
  readonly nativeEntry?: Readonly<Record<string, unknown>>;
  readonly seo?: Readonly<Record<string, unknown>>;
  readonly mergeDecisions?: readonly Readonly<Record<string, unknown>>[];
}

export interface PersistenceEntity {
  readonly entityId: string;
  readonly name: string;
  readonly fields: readonly Readonly<Record<string, unknown>>[];
  readonly relationships?: readonly Readonly<Record<string, unknown>>[];
  readonly ownership?: Readonly<Record<string, unknown>>;
  readonly lifecycle?: readonly string[];
  readonly sensitivity?: string;
}
export interface PersistenceManifest {
  readonly persistenceManifestId: string;
  readonly version: string;
  readonly entities: readonly PersistenceEntity[];
  readonly indexes?: readonly Readonly<Record<string, unknown>>[];
  readonly constraints?: readonly Readonly<Record<string, unknown>>[];
  readonly views?: readonly Readonly<Record<string, unknown>>[];
  readonly triggers?: readonly Readonly<Record<string, unknown>>[];
  readonly migrations?: readonly Readonly<Record<string, unknown>>[];
  readonly seed?: readonly Readonly<Record<string, unknown>>[];
  readonly rollback?: readonly Readonly<Record<string, unknown>>[];
  readonly targetProvider?: string;
}

export interface AssetManifestItem {
  readonly assetId: string;
  readonly type: string;
  readonly ownerId?: string;
  readonly sourceRef?: string;
  readonly originalRef?: string;
  readonly mimeType?: string;
  readonly sizeBytes?: number;
  readonly optimization?: Readonly<Record<string, unknown>>;
  readonly storage?: Readonly<Record<string, unknown>>;
  readonly visibility?: "PUBLIC" | "PRIVATE" | "RESTRICTED";
  readonly retention?: Readonly<Record<string, unknown>>;
  readonly variants?: readonly Readonly<Record<string, unknown>>[];
  readonly cdn?: Readonly<Record<string, unknown>>;
}
export interface AssetManifest {
  readonly assetManifestId: string;
  readonly version: string;
  readonly assets: readonly AssetManifestItem[];
}

export interface EnvironmentManifest {
  readonly environmentId: string;
  readonly version: string;
  readonly runtimeVersion?: string;
  readonly installedSolutions?: readonly string[];
  readonly capabilities?: readonly string[];
  readonly databaseProfileRef?: string;
  readonly storageProfileRef?: string;
  readonly authProfileRef?: string;
  readonly eventProfileRef?: string;
  readonly searchProfileRef?: string;
  readonly mapsProfileRef?: string;
  readonly paymentProfileRef?: string;
  readonly notificationProfileRef?: string;
  readonly integrations?: readonly string[];
  readonly providerDataProfileRef?: string;
  readonly assetManifestId?: string;
}

export interface RuntimeManifest {
  readonly runtimeManifestId: string;
  readonly version: string;
  readonly runtimeType: string;
  readonly runtimeVersion: string;
  readonly compatibility?: Readonly<Record<string, unknown>>;
  readonly requiredServices?: readonly string[];
  readonly requiredCapabilities?: readonly string[];
  readonly configurationProfileRef?: string;
}

export interface DeploymentManifest {
  readonly deploymentManifestId: string;
  readonly version: string;
  readonly environmentId: string;
  readonly solutionIds: readonly string[];
  readonly runtimeManifestId: string;
  readonly persistenceManifestId?: string;
  readonly assetManifestId?: string;
  readonly provider?: string;
  readonly region?: string;
  readonly prerequisites?: readonly string[];
  readonly deploymentSteps?: readonly string[];
  readonly verificationSteps?: readonly string[];
  readonly rollbackSteps?: readonly string[];
  readonly capacityPlan?: Readonly<Record<string, unknown>>;
  readonly costEstimate?: Readonly<Record<string, unknown>>;
}

export interface UpdateManifest {
  readonly releaseId: string;
  readonly runtimeVersion: string;
  readonly packageVersion: string;
  readonly minimumRuntimeVersion?: string;
  readonly maximumRuntimeVersion?: string;
  readonly sha256: string;
  readonly signature: string;
  readonly keyId: string;
  readonly issuedAt: string;
  readonly expiresAt?: string;
  readonly compatibility?: Readonly<Record<string, unknown>>;
  readonly rollbackSupport: boolean;
  readonly compliance?: Readonly<Record<string, unknown>>;
}

export interface AuditManifestEntry {
  readonly auditId: string;
  readonly entityType: string;
  readonly entityId: string;
  readonly action: string;
  readonly actorType: "USER" | "AI" | "SYSTEM";
  readonly actorId?: string;
  readonly sourceRef?: string;
  readonly beforeVersion?: string;
  readonly afterVersion?: string;
  readonly timestamp: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface AuditManifest {
  readonly auditManifestId: string;
  readonly version: string;
  readonly entries: readonly AuditManifestEntry[];
}
