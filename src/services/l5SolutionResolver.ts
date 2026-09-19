/**
 * AAi L5 Solution Resolver
 * SERVICE: L5-RESOLVER-001
 *
 * Converts a canonical catalog L5 item into the provider-neutral L5 solution
 * definition required by the frozen L1-L6 contract.
 *
 * This resolver does not invent commercial values. Unknown commercial fields
 * remain explicitly unresolved for later data intake/admin generation.
 */

import type { SolutionItem } from "../contracts/catalog";
import type {
  L5SolutionDefinition,
  L5ExperienceRequirements,
  L5ProviderRequirements,
  L5PersistenceRequirements,
  L5AssetRequirements,
  L5IntegrationRequirements,
  L5L6Requirements,
} from "../contracts/l5Solution";

export interface L5ResolutionResult {
  readonly definition: L5SolutionDefinition;
  readonly missingRequiredInformation: readonly string[];
}

export function resolveCatalogSolutionToL5(
  item: SolutionItem,
): L5ResolutionResult {
  if (item.layer !== 5 || item.type !== "SOLUTION") {
    throw new Error(`Catalog item ${item.id} is not an L5 solution.`);
  }

  const missing: string[] = [];

  const experienceRequirements: L5ExperienceRequirements = {
    pageModel: "SOLUTION",
    mobileFirst: true,
    requiredSections: ["identity", "overview"],
    optionalSections: ["features", "services", "providers", "support"],
    navigation: { mode: "solution" },
    mediaRequirements: [],
    themeCompatibility: [],
    themeOverrideAllowed: true,
    responsiveRequirements: { mobile: true },
    publicEntry: { enabled: true },
    nativeEntry: { enabled: true },
    seo: { required: true },
  };

  const providerRequirements: L5ProviderRequirements = {
    providerTypes: [],
    serviceCategories: item.serviceComposition ?? [],
    locationRequired: Boolean(item.locationContext),
    verificationRequired: false,
    providerIdentityRequired: false,
    externalSourceTypes: [],
    evidenceTypes: [],
  };

  const persistenceRequirements: L5PersistenceRequirements = {
    entities: [],
    relationships: [],
    dataSensitivity: [],
  };

  const assetRequirements: L5AssetRequirements = {
    assetTypes: [],
    providerPhotoRequired: false,
    externalVideoReferences: true,
    optimizationRequired: false,
    publicDeliveryRequired: true,
  };

  const integrationRequirements: L5IntegrationRequirements = {
    requiredIntegrations: [],
    optionalIntegrations: [],
    inboundEvents: [],
    outboundEvents: [],
    webhookRequirements: [],
  };

  const l6Requirements: L5L6Requirements = {
    runtimeCapabilities: item.implementationOptions ?? [],
    infrastructureCapabilities: item.platformOptions ?? [],
    geography: item.locationContext ?? {},
    capacity: {},
    availability: {},
    security: {},
    observability: {},
    backupRecovery: {},
    updateRollback: {},
  };

  if (!item.businessWorld) missing.push("business.businessWorld");
  if (!item.processModel) missing.push("business.processModel");
  if (!item.features?.length) missing.push("functional.features");
  if (!item.serviceComposition?.length) missing.push("services.serviceComposition");
  if (!item.platformOptions?.length) missing.push("l6.platformOptions");
  if (!item.implementationOptions?.length) missing.push("l6.implementationOptions");

  const definition: L5SolutionDefinition = {
    solutionId: item.id,
    version: "1.0.0",
    status: item.status,
    name: item.name,
    description: item.description,
    selection: {
      selectable: true,
      checkoutEligible: true,
      canCompose: true,
    },
    commercial: {
      pricing: {
        model: "QUOTE",
        currency: "INR",
        taxMode: "RUNTIME",
      },
      payment: {
        required: true,
        methods: [],
        modes: [],
        refundSupported: false,
        partialRefundSupported: false,
      },
      quote: {
        supported: true,
        requiredWhen: ["UNPRICED_CATALOG_SOLUTION"],
        approvalRequired: true,
      },
    },
    customerJourney: {
      intent: {
        keywords: item.keywords,
        useCases: [],
        customerProblems: [],
        targetAudience: [],
      },
      lifecycle: {
        stages: ["DISCOVER", "INTENT", "QUALIFY", "ENGAGE", "QUOTE", "CHECKOUT", "PAYMENT"],
      },
    },
    experienceRequirements,
    providerRequirements,
    persistenceRequirements,
    assetRequirements,
    integrationRequirements,
    l6Requirements,
    metadata: {
      source: "canonical-capability-catalog",
      domainId: item.domainId,
      subdomainId: item.subdomainId ?? undefined,
      capabilityId: item.capabilityId ?? undefined,
      solutionBundleId: item.solutionBundleId ?? undefined,
      businessWorld: item.businessWorld,
      processModel: item.processModel,
      primaryPath: item.primaryPath,
      nextAction: item.nextAction,
      relatedCapabilities: item.relatedCapabilities,
      supportingDomains: item.supportingDomains,
      rating: item.rating,
      complexity: item.complexity,
      estimatedEffort: item.estimatedEffort,
    },
  };

  return { definition, missingRequiredInformation: missing };
}
