/**
 * AAi L5 Solution Contract
 * CONTRACT: L5-SOLUTION-001
 * Status: ACTIVE / AAi-V2.0.1 freeze
 *
 * L5 is the concrete solution boundary:
 * selectable, marketable, composable and checkout-eligible.
 * L1-L4 describe the possibility space; L6 resolves execution.
 */

import type {
  CommercialDefinition,
  CustomerJourneyDefinition,
  PricingModel,
  PaymentMethod,
  PaymentMode,
  CreditUnit,
  DiscountType
} from "./commercial";

export type L5PricingModel = PricingModel;
export type L5PaymentMethod = PaymentMethod;
export type L5PaymentMode = PaymentMode;
export type L5CreditUnit = CreditUnit;
export type L5DiscountType = DiscountType;

export type L5PriceComponent = import("./commercial").PriceComponent;
export type L5PricingDefinition = import("./commercial").PricingDefinition;
export type L5DiscountRule = import("./commercial").DiscountRule;
export type L5OfferDefinition = import("./commercial").OfferDefinition;
export type L5CreditDefinition = import("./commercial").CreditDefinition;
export type L5PaymentDefinition = import("./commercial").PaymentDefinition;
export type L5QuoteDefinition = import("./commercial").QuoteDefinition;
export type L5IntentDefinition = import("./commercial").IntentDefinition;
export type L5ConversationDefinition = import("./commercial").ConversationDefinition;
export type L5FollowUpDefinition = import("./commercial").FollowUpDefinition;
export type L5SupportDefinition = import("./commercial").SupportDefinition;
export type L5LifecycleDefinition = import("./commercial").LifecycleDefinition;
export type L5CommercialDefinition = CommercialDefinition;
export type L5CustomerJourneyDefinition = CustomerJourneyDefinition;

export interface L5ExperienceRequirements {
  readonly pageModel: string;
  readonly mobileFirst: boolean;
  readonly requiredSections: readonly string[];
  readonly optionalSections?: readonly string[];
  readonly navigation?: Readonly<Record<string, unknown>>;
  readonly mediaRequirements?: readonly string[];
  readonly themeCompatibility?: readonly string[];
  readonly themeOverrideAllowed?: boolean;
  readonly layoutId?: string;
  readonly animationLevel?: string;
  readonly responsiveRequirements?: Readonly<Record<string, unknown>>;
  readonly publicEntry?: Readonly<Record<string, unknown>>;
  readonly nativeEntry?: Readonly<Record<string, unknown>>;
  readonly seo?: Readonly<Record<string, unknown>>;
}

export interface L5ProviderRequirements {
  readonly providerTypes?: readonly string[];
  readonly serviceCategories?: readonly string[];
  readonly locationRequired?: boolean;
  readonly verificationRequired?: boolean;
  readonly providerIdentityRequired?: boolean;
  readonly externalSourceTypes?: readonly string[];
  readonly evidenceTypes?: readonly string[];
}

export interface L5PersistenceRequirements {
  readonly entities: readonly string[];
  readonly relationships?: readonly string[];
  readonly dataSensitivity?: readonly string[];
  readonly expectedGrowth?: Readonly<Record<string, unknown>>;
  readonly retention?: Readonly<Record<string, unknown>>;
}

export interface L5AssetRequirements {
  readonly assetTypes?: readonly string[];
  readonly providerPhotoRequired?: boolean;
  readonly externalVideoReferences?: boolean;
  readonly optimizationRequired?: boolean;
  readonly storageClass?: string;
  readonly publicDeliveryRequired?: boolean;
}

export interface L5IntegrationRequirements {
  readonly requiredIntegrations?: readonly string[];
  readonly optionalIntegrations?: readonly string[];
  readonly inboundEvents?: readonly string[];
  readonly outboundEvents?: readonly string[];
  readonly webhookRequirements?: readonly string[];
}

export interface L5L6Requirements {
  readonly runtimeCapabilities?: readonly string[];
  readonly infrastructureCapabilities?: readonly string[];
  readonly geography?: Readonly<Record<string, unknown>>;
  readonly capacity?: Readonly<Record<string, unknown>>;
  readonly availability?: Readonly<Record<string, unknown>>;
  readonly security?: Readonly<Record<string, unknown>>;
  readonly observability?: Readonly<Record<string, unknown>>;
  readonly backupRecovery?: Readonly<Record<string, unknown>>;
  readonly updateRollback?: Readonly<Record<string, unknown>>;
}

export interface L5SelectionDefinition {
  readonly selectable: true;
  readonly checkoutEligible: true;
  readonly canCompose: true;
}

export interface L5SolutionDefinition {
  readonly solutionId: string;
  readonly version: string;
  readonly status: "active" | "beta" | "deprecated";
  readonly name: string;
  readonly description: string;

  readonly selection: L5SelectionDefinition;

  /**
   * The commercial/customer model is part of L5, not an L6 inference.
   */
  readonly commercial: L5CommercialDefinition;
  readonly customerJourney?: L5CustomerJourneyDefinition;

  /**
   * Required experience/design information is present at L5.
   */
  readonly experienceRequirements: L5ExperienceRequirements;

  readonly providerRequirements?: L5ProviderRequirements;
  readonly persistenceRequirements?: L5PersistenceRequirements;
  readonly assetRequirements?: L5AssetRequirements;
  readonly integrationRequirements?: L5IntegrationRequirements;
  readonly l6Requirements?: L5L6Requirements;

  /**
   * Optional references connect L5 to reusable AAi definitions without
   * duplicating their implementation contracts.
   */
  readonly experienceDefinitionRef?: string;
  readonly persistenceProfileRef?: string;
  readonly assetProfileRef?: string;
  readonly integrationProfileRef?: string;

  readonly metadata?: Readonly<Record<string, unknown>>;
}
