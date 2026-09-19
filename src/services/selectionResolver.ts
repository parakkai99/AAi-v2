/**
 * AAi Selection Resolver
 * SERVICE: SELECTION-RESOLVER-001
 *
 * Pure selection/checkout rules. No UI and no purchase side effects.
 */

import type { CatalogLayer } from "../contracts/catalog";
import {
  SELECTION_POLICIES,
  type CheckoutEligibility,
  type SelectionItem,
  type SolutionBag,
} from "../contracts/selection";

export function isLayerSelectable(layer: CatalogLayer): boolean {
  return SELECTION_POLICIES[layer].selectable;
}

export function isLayerCheckoutEligible(layer: CatalogLayer): boolean {
  return SELECTION_POLICIES[layer].checkoutEligible;
}

export function evaluateCheckoutEligibility(
  items: readonly SelectionItem[],
): CheckoutEligibility {
  const l5SolutionIds = items
    .filter(
      (item) =>
        item.layer === 5 &&
        item.itemType === "SOLUTION" &&
        item.state !== "DISCOVERED" &&
        item.state !== "VIEWED",
    )
    .map((item) => item.itemId);

  const blockingReasons: string[] = [];

  if (l5SolutionIds.length === 0) {
    blockingReasons.push("At least one concrete L5 solution must be selected.");
  }

  const nonCheckoutSelections = items.filter(
    (item) =>
      item.layer >= 1 &&
      item.layer <= 4 &&
      item.state === "CHECKOUT_READY",
  );

  if (nonCheckoutSelections.length > 0) {
    blockingReasons.push("L1-L4 selections cannot be checkout items.");
  }

  return {
    eligible: blockingReasons.length === 0,
    l5SolutionIds: [...new Set(l5SolutionIds)],
    blockingReasons,
  };
}

export function evaluateSolutionBag(bag: SolutionBag): CheckoutEligibility {
  return evaluateCheckoutEligibility(bag.items);
}
