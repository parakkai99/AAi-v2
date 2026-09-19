/** AAi L6 Deployment / Update / Rollback Contracts */
export type DeploymentStatus = "PLANNED" | "STAGED" | "APPROVED" | "ACTIVATING" | "ACTIVE" | "FAILED" | "ROLLED_BACK";
export type UpdateAction = "DISCOVER" | "VALIDATE" | "STAGE" | "APPROVE" | "ACTIVATE" | "VERIFY" | "ROLLBACK";
export interface CapacityPlan { readonly horizonYears: number; readonly users?: number; readonly concurrency?: number; readonly transactionsPerDay?: number; readonly storageGrowthGb?: number; readonly trafficGbPerMonth?: number; }
export interface DeploymentPlan { readonly deploymentManifestId: string; readonly status: DeploymentStatus; readonly provider?: string; readonly region?: string; readonly prerequisites: readonly string[]; readonly steps: readonly string[]; readonly verificationSteps: readonly string[]; readonly rollbackSteps: readonly string[]; readonly capacity?: CapacityPlan; }
export interface UpdatePolicy { readonly retainedRollbackVersions: number; readonly approvalRequired: boolean; readonly compatibilityRequired: boolean; readonly integrityRequired: boolean; readonly signatureRequired: boolean; }
export interface UpdateExecution { readonly releaseId: string; readonly action: UpdateAction; readonly status: DeploymentStatus; readonly startedAt: string; readonly completedAt?: string; readonly reason?: string; }
