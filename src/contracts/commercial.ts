/**
 * AAi Commercial + Customer Lifecycle Contracts
 * CONTRACT: COMMERCIAL-001
 */

export type PricingModel = "ONE_TIME" | "SUBSCRIPTION" | "USAGE" | "QUOTE" | "HYBRID";
export type PaymentMethod = "CARD" | "UPI" | "BANK_TRANSFER" | "WALLET" | "CREDIT_BALANCE" | "PAYMENT_LINK" | "INVOICE";
export type PaymentMode = "FULL" | "PARTIAL" | "INSTALLMENT" | "SUBSCRIPTION" | "MILESTONE";
export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT" | "VOLUME" | "EARLY_PURCHASE" | "LOYALTY" | "COUPON" | "PROMOTIONAL";
export type CreditUnit = "REQUEST" | "ITEM" | "MINUTE" | "GB_MONTH" | "TRANSACTION" | "CUSTOM";

export interface PriceComponent { readonly componentId: string; readonly name: string; readonly amount: number; }
export interface PricingDefinition {
  readonly model: PricingModel;
  readonly currency: string;
  readonly basePrice?: number;
  readonly components?: readonly PriceComponent[];
  readonly billingFrequency?: string;
  readonly minimumCommitment?: string;
  readonly usagePricing?: Readonly<Record<string, unknown>>;
  readonly taxMode?: "NONE" | "RUNTIME";
}
export interface DiscountRule {
  readonly discountId: string;
  readonly type: DiscountType;
  readonly value: number;
  readonly validFrom?: string;
  readonly validUntil?: string;
  readonly eligibility?: Readonly<Record<string, unknown>>;
}
export interface OfferDefinition {
  readonly offerId: string;
  readonly name: string;
  readonly offerType: string;
  readonly validFrom?: string;
  readonly validUntil?: string;
  readonly eligibility?: Readonly<Record<string, unknown>>;
  readonly benefits?: readonly string[];
  readonly pricing?: Readonly<Record<string, unknown>>;
}
export interface CreditDefinition {
  readonly creditType: string;
  readonly unit: CreditUnit;
  readonly included?: number;
  readonly consumptionRules?: readonly Readonly<Record<string, unknown>>[];
  readonly expiryPolicy?: Readonly<Record<string, unknown>>;
  readonly topUpEnabled?: boolean;
}
export interface PaymentDefinition {
  readonly required: boolean;
  readonly methods?: readonly PaymentMethod[];
  readonly modes?: readonly PaymentMode[];
  readonly refundSupported?: boolean;
  readonly partialRefundSupported?: boolean;
}
export interface QuoteDefinition {
  readonly supported: boolean;
  readonly requiredWhen?: readonly string[];
  readonly validityDays?: number;
  readonly approvalRequired?: boolean;
}
export interface CommercialDefinition {
  readonly pricing: PricingDefinition;
  readonly discounts?: readonly DiscountRule[];
  readonly offers?: readonly OfferDefinition[];
  readonly credits?: readonly CreditDefinition[];
  readonly payment: PaymentDefinition;
  readonly quote?: QuoteDefinition;
  readonly marketingIntent?: Readonly<Record<string, unknown>>;
}

export type JourneyStage =
  | "DISCOVER"
  | "INTENT"
  | "QUALIFY"
  | "ENGAGE"
  | "CHAT_CONTACT"
  | "QUOTE"
  | "OFFER"
  | "CHECKOUT"
  | "PAYMENT"
  | "ORDER_SUBSCRIPTION"
  | "ONBOARDING"
  | "ACTIVATION"
  | "USAGE"
  | "SUPPORT"
  | "FOLLOW_UP"
  | "RENEWAL_UPGRADE"
  | "CANCELLATION_EXPIRY"
  | "POST_SALE_FEEDBACK";

export interface IntentDefinition {
  readonly primary?: readonly string[];
  readonly keywords?: readonly string[];
  readonly useCases?: readonly string[];
  readonly customerProblems?: readonly string[];
  readonly targetAudience?: readonly string[];
}

export interface ConversationDefinition {
  readonly enabled?: boolean;
  readonly channels?: readonly string[];
  readonly referenceRequired?: boolean;
  readonly intentReferenceRequired?: boolean;
  readonly quoteReferenceRequired?: boolean;
}
export interface FollowUpDefinition {
  readonly enabled?: boolean;
  readonly events?: readonly string[];
  readonly channels?: readonly string[];
}
export interface LifecycleDefinition {
  readonly stages: readonly JourneyStage[];
  readonly order?: boolean;
  readonly subscription?: boolean;
  readonly renewal?: boolean;
  readonly upgradeDowngrade?: boolean;
  readonly cancellation?: boolean;
  readonly postSale?: boolean;
  readonly feedback?: boolean;
}
export interface SupportDefinition {
  readonly enabled?: boolean;
  readonly surfaces?: readonly string[];
  readonly ticketing?: boolean;
  readonly chat?: boolean;
  readonly sla?: boolean;
  readonly escalation?: boolean;
  readonly customerFeedback?: boolean;
}
export interface CustomerJourneyDefinition {
  readonly intent?: IntentDefinition;
  readonly conversation?: ConversationDefinition;
  readonly followUp?: FollowUpDefinition;
  readonly lifecycle?: LifecycleDefinition;
  readonly support?: SupportDefinition;
}
