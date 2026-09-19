/**
 * AAi L5 Solution Contract
 * CONTRACT: L5-SOLUTION-001
 * Status: ACTIVE / AAi-V2.0.1 freeze
 *
 * L5 is the concrete solution boundary.
 * It is selectable, marketable, composable and checkout-eligible.
 * L1-L4 are possibility/navigation levels; L6 resolves execution.
 */

export type L5PricingModel =
  | "ONE_TIME"
  | "SUBSCRIPTION"
  | "USAGE"
  | "QUOTE"
  | "HYBRID";

export type L5PaymentMethod =
  | "CARD"
  | "UPI"
  | "BANK_TRANSFER"
  | "WALLET"
  | "CREDIT_BALANCE"
  | "PAYMENT_LINK"
  | "INVOICE";

export type L5PaymentMode =
  | "FULL"
  | "PARTIAL"
  | "INSTALLMENT"
  | "SUBSCRIPTION"
  | "MILESTONE";

export type L5CreditUnit =
  | "REQUEST"
  | "ITEM"
  | "MINUTE"
  | "GB_MONTH"
  | "TRANSACTION"
  | "CUSTOM";

export type L5DiscountType =
  | "PERCENTAGE"
  | "FIXED_AMOUNT"
  | "VOLUME"
  | "EARLY_PURCHASE"
  | "LOYALTY"
  | "COUPON"
  | "PROMOTIONAL";

export interface L5PriceComponent {
  readonly componentId: string;
  readonly name: string;
  readonly amount: number;
}

export interface L5PricingDefinition {
  readonly model: L5PricingModel;
  readonly currency: string;
  readonly basePrice?: number;
  readonly components?: readonly L5PriceComponent[];
  readonly billingFrequency?: string;
  readonly minimumCommitment?: string;
  readonly usagePricing?: Readonly<Record<string, unknown>>;
  readonly taxMode?: "NONE" | "RUNTIME";
}

export interface L5DiscountRule {
  readonly discountId: string;
  readonly type: L5DiscountType;
  readonly value: number;
  readonly validFrom?: string;
  readonly validUntil?: string;
  readonly eligibility?: string;
}

export interface L5OfferDefinition {
  readonly offerId: string;
  readonly name: string;
  readonly offerType: string;
  readonly validFrom?: string;
  readonly validUntil?: string;
  readonly eligibility?: Readonly<Record<string, unknown>>;
  readonly benefits?: readonly string[];
  readonly pricing?: Readonly<Record<string, unknown>>;
}

export interface L5CreditDefinition {
  readonly creditType: string;
  readonly unit: L5CreditUnit;
  readonly included?: number;
  readonly consumptionRules?: readonly Readonly<Record<string, unknown>>[];
  readonly expiryPolicy?: Readonly<Record<string, unknown>>;
  readonly topUpEnabled?: boolean;
}

export interface L5PaymentDefinition {
  readonly required: boolean;
  readonly methods?: readonly L5PaymentMethod[];
  readonly modes?: readonly L5PaymentMode[];
  readonly refundSupported?: boolean;
  readonly partialRefundSupported?: boolean;
}

export interface L5QuoteDefinition {
  readonly supported: boolean;
  readonly requiredWhen?: readonly string[];
  readonly validityDays?: number;
  readonly approvalRequired?: boolean;
}

export interface L5IntentDefinition {
  readonly primary?: readonly string[];
  readonly keywords?: readonly string[];
  readonly useCases?: readonly string[];
  readonly customerProblems?: readonly string[];
  readonly targetAudience?: readonly string[];
}

export interface L5ConversationDefinition {
  readonly enabled?: boolean;
  readonly channels?: readonly string[];
  readonly referenceRequired?: boolean;
}

export interface L5FollowUpDefinition {
  readonly enabled?: boolean;
  readonly events?: readonly string[];
  readonly channels?: readonly string[];
}

export interface L5SupportDefinition {
  readonly enabled?: boolean;
  readonly surfaces?: readonly string[];
  readonly ticketing?: boolean;
  readonly chat?: boolean;
  readonly sla?: boolean;
  readonly escalation?: boolean;
  readonly customerFeedback?: boolean;
}

export interface L5LifecycleDefinition {
  readonly order?: boolean;
  readonly subscription?: boolean;
  readonly onboarding?: boolean;
  readonly activation?: boolean;
  readonly usage?: boolean;
  readonly support?: boolean;
  readonly followUp?: boolean;
  readonly renewal?: boolean;
  readonly upgradeDowngrade?: boolean;
  readonly cancellation?: boolean;
  readonly postSale?: boolean;
  readonly feedback?: boolean;
}

export interface L5CommercialDefinition {
  readonly pricing: L5PricingDefinition;
  readonly discounts?: readonly L5DiscountRule[];
  readonly offers?: readonly L5OfferDefinition[];
  readonly credits?: readonly L5CreditDefinition[];
  readonly payment: L5PaymentDefinition;
  readonly quote?: L5QuoteDefinition;
}

export interface L5CustomerJourneyDefinition {
  readonly intent?: L5IntentDefinition;
  readonly conversation?: L5ConversationDefinition;
  readonly followUp?: L5FollowUpDefinition;
  readonly lifecycle?: L5LifecycleDefinition;
  readonly support?: L5SupportDefinition;
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
  readonly commercial: L5CommercialDefinition;
  readonly customerJourney?: L5CustomerJourneyDefinition;

  /**
   * Experience requirements are intentionally referenced rather than
   * duplicating the ExperienceDefinition contract.
   */
  readonly experienceDefinitionRef?: string;

  /**
   * Logical data/persistence requirements. L6 maps these to the target
   * database or storage implementation.
   */
  readonly persistenceProfileRef?: string;

  readonly assetProfileRef?: string;
  readonly integrationProfileRef?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}
