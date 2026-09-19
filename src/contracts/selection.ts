/**
 * AAi Selection + Solution Bag Contracts
 * CONTRACT: SELECTION-001
 *
 * L1-L4 are exploratory selection levels.
 * L5 is the only checkout-eligible level.
 */

import type { CatalogLayer, CatalogItemType } from "./catalog";

export type SelectionState =
  | "DISCOVERED"
  | "VIEWED"
  | "SELECTED"
  | "SHORTLISTED"
  | "COMPOSED"
  | "CONFIGURED"
  | "DESIGNING"
  | "CHECKOUT_READY"
  | "PURCHASED"
  | "APPROVED"
  | "DEPLOYMENT_READY"
  | "DEPLOYED";

export interface SelectionItem {
  readonly itemId: string;
  readonly itemType: CatalogItemType;
  readonly layer: CatalogLayer;
  readonly state: SelectionState;
  readonly selectedAt?: string;
  readonly sourceContext?: string;
}

export interface SelectionPolicy {
  readonly layer: CatalogLayer;
  readonly selectable: true;
  readonly checkoutEligible: boolean;
  readonly canCompose: boolean;
  readonly requiresDescendantSelection: boolean;
}

export const SELECTION_POLICIES: Readonly<Record<CatalogLayer, SelectionPolicy>> = {
  1: { layer: 1, selectable: true, checkoutEligible: false, canCompose: true, requiresDescendantSelection: true },
  2: { layer: 2, selectable: true, checkoutEligible: false, canCompose: true, requiresDescendantSelection: true },
  3: { layer: 3, selectable: true, checkoutEligible: false, canCompose: true, requiresDescendantSelection: true },
  4: { layer: 4, selectable: true, checkoutEligible: false, canCompose: true, requiresDescendantSelection: true },
  5: { layer: 5, selectable: true, checkoutEligible: true, canCompose: true, requiresDescendantSelection: false },
  6: { layer: 6, selectable: false, checkoutEligible: false, canCompose: false, requiresDescendantSelection: false }
};

export interface SolutionBag {
  readonly bagId: string;
  readonly customerId?: string;
  readonly items: readonly SelectionItem[];
  readonly checkoutEligible: boolean;
  readonly compositionRequired: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface CheckoutEligibility {
  readonly eligible: boolean;
  readonly l5SolutionIds: readonly string[];
  readonly blockingReasons: readonly string[];
}

export interface SelectionContext {
  readonly currentDomainId?: string;
  readonly currentPath?: readonly string[];
  readonly returnPath?: string;
  readonly preservedSelectionIds: readonly string[];
}
