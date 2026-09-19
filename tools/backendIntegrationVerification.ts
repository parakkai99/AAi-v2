/**
 * AAi B13 — Backend Integration Verification
 *
 * Executable, provider-neutral verification of the frozen backend pipeline.
 * This is intentionally not a UI test and performs no deployment side effects.
 */
import { catalogRepository } from "../src/repositories/catalogRepository";
import { resolveCatalogSolutionToL5 } from "../src/services/l5SolutionResolver";
import { evaluateCheckoutEligibility } from "../src/services/selectionResolver";
import { resolveL5Composition } from "../src/services/compositionResolver";
import { resolveSolutionManifest } from "../src/services/solutionManifestResolver";
import { resolveEnvironmentRequirements } from "../src/services/environmentResolver";
import { resolvePersistenceManifest } from "../src/services/persistenceResolver";
import { resolveAssetManifest } from "../src/services/assetResolver";
import { generateCanonicalJson, parseCanonicalJson } from "../src/services/jsonDefinitionService";
import { validateDefinitionPackage } from "../src/services/definitionValidator";
import { registerBuiltInProviderAdapters } from "../src/services/registerBuiltInProviderAdapters";
import { providerAdapterRegistry } from "../src/services/providerAdapterRegistry";
import { planDeployment } from "../src/services/deploymentPlanner";
import { checkReleaseCompatibility, createRollbackPlan } from "../src/services/releaseService";
import { transitionRelease, validateRollbackPlan } from "../src/services/releaseExecutionService";
import { normalizeProviderCandidate } from "../src/services/discoveryNormalizationService";
import { createRuntimeSnapshot, evaluateReleaseForClient, heartbeat } from "../src/services/clientRuntimeBoundary";
import { createControlPlanePersistenceModel, getControlPlaneSchema } from "../src/services/controlPlanePersistenceModel";
import type { AAiDefinitionPackage } from "../src/contracts/definition";
import type { DeploymentManifest, EnvironmentManifest } from "../src/contracts/manifests";
import type { ReleaseDefinition } from "../src/contracts/release";
import type { ProviderContext } from "../src/contracts/provider";
import type { DiscoveryEvidence, ProviderCandidate } from "../src/contracts/discovery";
import type { EnvironmentRegistration, ReleaseRecord } from "../src/contracts/controlPlane";

const checks: string[] = [];
const failures: string[] = [];

function check(name: string, condition: boolean, detail = "") {
  if (!condition) {
    failures.push(detail ? `✗ ${name}: ${detail}` : `✗ ${name}`);
    return;
  }
  checks.push(`✓ ${name}`);
}

async function main() {
  const solutions = await catalogRepository.getSolutions();
  check("Canonical catalog exposes L5 solutions", solutions.length > 0);
  const source = solutions[0];
  if (!source) throw new Error("No L5 solution exists in canonical catalog.");

  const resolved = resolveCatalogSolutionToL5(source);
  const solution = resolved.definition;

  check("L5 resolver produces concrete solution", solution.solutionId === source.id);
  check("L5 resolver preserves source identity", solution.name === source.name);

  const selection = evaluateCheckoutEligibility([{
    itemId: solution.solutionId,
    itemType: "SOLUTION",
    layer: 5,
    state: "CHECKOUT_READY",
  }]);
  check("L5 selection is checkout eligible", selection.eligible && selection.l5SolutionIds.includes(solution.solutionId));

  const composition = resolveL5Composition([solution], "b13-composition");
  check("Composition resolves selected L5", composition.solutionIds.includes(solution.solutionId));

  const solutionManifest = resolveSolutionManifest(solution, "b13-solution-manifest");
  check("Solution manifest resolves", solutionManifest.solutionId === solution.solutionId);

  const environment: EnvironmentManifest = {
    environmentId: "b13-test-environment",
    version: "1.0.0",
    runtimeVersion: "2.0.1",
    installedSolutions: [],
    capabilities: [],
  };
  const environmentResolution = resolveEnvironmentRequirements([solution], environment);
  check("Environment resolver produces deterministic actions", environmentResolution.every((item) => item.action === "INSTALL" || item.action === "REUSE"));

  const persistence = resolvePersistenceManifest([solution], "b13-persistence");
  const assets = resolveAssetManifest([solution], "b13-assets");
  check("Persistence manifest resolves", persistence.persistenceManifestId === "b13-persistence");
  check("Asset manifest resolves", assets.assetManifestId === "b13-assets");

  const deploymentManifest: DeploymentManifest = {
    deploymentManifestId: "b13-deployment",
    version: "1.0.0",
    environmentId: environment.environmentId,
    solutionIds: [solution.solutionId],
    runtimeManifestId: "b13-runtime",
    persistenceManifestId: persistence.persistenceManifestId,
    assetManifestId: assets.assetManifestId,
    provider: "POSTGRESQL",
    region: "ap-south-1",
  };
  const deployment = planDeployment(deploymentManifest);
  check("Deployment plan resolves", deployment.status === "PLANNED" && deployment.deploymentManifestId === deploymentManifest.deploymentManifestId);

  const definition: AAiDefinitionPackage = {
    control: {
      definitionId: "b13-definition",
      schemaVersion: "1.0.0",
      aaIVersion: "AAI-V2.0.1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "DRAFT",
    },
    solution,
    composition,
    persistence,
    assets,
    environment,
    deployment: deploymentManifest,
  };
  const definitionValidation = validateDefinitionPackage(definition);
  check("Definition validator accepts integrated definition", definitionValidation.valid);

  const generated = await generateCanonicalJson(definition);
  check("Canonical JSON generation succeeds", generated.validation.valid && generated.contentHash.length === 64);
  const parsed = parseCanonicalJson(generated.json);
  check("Generated JSON round-trips", parsed.validation.valid && parsed.document?.definition.control.definitionId === definition.control.definitionId);

  registerBuiltInProviderAdapters();
  const adapter = providerAdapterRegistry.get("POSTGRESQL");
  check("PostgreSQL provider adapter registered", Boolean(adapter));
  if (adapter) {
    const context: ProviderContext = { provider: "POSTGRESQL", environmentId: environment.environmentId, region: "ap-south-1" };
    const persistenceArtifacts = await adapter.generatePersistenceArtifacts(persistence, context);
    const assetArtifacts = await adapter.generateAssetArtifacts(assets, context);
    const deploymentArtifacts = await adapter.generateDeploymentArtifacts(deploymentManifest, environment, context);
    check("Provider persistence artifacts generated", persistenceArtifacts.length > 0 && persistenceArtifacts.every((item) => item.contentHash.length === 64));
    check("Provider asset artifacts generated", assetArtifacts.length > 0);
    check("Provider deployment artifacts generated", deploymentArtifacts.length > 0);
  }

  const updateManifest = {
    releaseId: "b13-release",
    runtimeVersion: "2.0.1",
    packageVersion: "2.0.1.1",
    minimumRuntimeVersion: "2.0.0",
    maximumRuntimeVersion: "3.0.0",
    sha256: generated.contentHash,
    signature: "B13-TEST-SIGNATURE",
    keyId: "b13-test-key",
    issuedAt: new Date().toISOString(),
    rollbackSupport: true,
  };
  const baseRelease: ReleaseDefinition = {
    releaseId: "b13-release",
    version: "2.0.1.1",
    state: "DRAFT",
    runtimeVersion: "2.0.1",
    packageVersion: "2.0.1.1",
    updateManifest,
    artifacts: [],
    createdAt: new Date().toISOString(),
  };
  const validated = transitionRelease(baseRelease, "VALIDATED");
  const approved = transitionRelease(validated, "APPROVED");
  const released = transitionRelease(approved, "RELEASED");
  const compatibility = checkReleaseCompatibility(released, "2.0.1");
  check("Release state transitions complete", released.state === "RELEASED");
  check("Release compatibility passes", compatibility.compatible);

  const rollback = createRollbackPlan(released, "previous-release");
  check("Rollback plan validates", validateRollbackPlan(rollback));

  const candidate: ProviderCandidate = {
    providerCandidateId: "b13-provider",
    displayName: "B13 Test Provider",
    evidenceIds: ["b13-evidence"],
    status: "DISCOVERED",
  };
  const evidence: DiscoveryEvidence = {
    evidenceId: "b13-evidence",
    providerCandidateId: candidate.providerCandidateId,
    source: {
      sourceId: "b13-source",
      sourceType: "WEBSITE",
      url: "https://example.invalid/b13",
      observedAt: new Date().toISOString(),
    },
    type: "BUSINESS",
    claim: "B13 integration test evidence",
    extractedAt: new Date().toISOString(),
  };
  const normalized = normalizeProviderCandidate(candidate, [evidence]);
  check("Discovery evidence remains linked", normalized.evidence.length === 1 && normalized.sources.length === 1);

  const registration: EnvironmentRegistration = {
    environmentId: environment.environmentId,
    runtimeVersion: environment.runtimeVersion ?? "unknown",
    registeredAt: new Date().toISOString(),
    capabilities: [],
  };
  let runtime = createRuntimeSnapshot(registration);
  runtime = heartbeat(runtime);
  const releaseRecord: ReleaseRecord = {
    releaseId: released.releaseId,
    version: released.version,
    status: "AVAILABLE",
    sha256: updateManifest.sha256,
    keyId: updateManifest.keyId,
  };
  check("Client runtime heartbeat updates state", Boolean(runtime.state.lastHeartbeatAt));
  check("Client release boundary accepts compatible release", evaluateReleaseForClient(releaseRecord, compatibility) === "READY");

  const controlModel = createControlPlanePersistenceModel(registration, runtime.state.installedSolutions, [releaseRecord]);
  const controlSchema = getControlPlaneSchema();
  check("Control-plane persistence model retains release", controlModel.releases.length === 1);
  check("Control-plane schema contains environment/release tables", controlSchema.tables.some((table) => table.name === "aaI_environment") && controlSchema.tables.some((table) => table.name === "aaI_release"));

  if (failures.length) {
    console.error("\nAAi B13 BACKEND INTEGRATION VERIFICATION: FAILED");
    for (const failure of failures) console.error(failure);
    process.exitCode = 1;
    return;
  }

  console.log("\nAAi B13 BACKEND INTEGRATION VERIFICATION: PASSED");
  console.log(`Checks passed: ${checks.length}`);
  for (const item of checks) console.log(item);
}

void main().catch((error) => {
  console.error("\nAAi B13 BACKEND INTEGRATION VERIFICATION: ERROR");
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exitCode = 1;
});
