/** AAi Selection State Transition Service */
import type { SelectionState } from "../contracts/selection";
const transitions: Readonly<Record<SelectionState, readonly SelectionState[]>> = {
  DISCOVERED: ["VIEWED","SELECTED"],
  VIEWED: ["SELECTED","SHORTLISTED"],
  SELECTED: ["SHORTLISTED","COMPOSED","CONFIGURED"],
  SHORTLISTED: ["SELECTED","COMPOSED"],
  COMPOSED: ["CONFIGURED","DESIGNING","CHECKOUT_READY"],
  CONFIGURED: ["DESIGNING","CHECKOUT_READY"],
  DESIGNING: ["CONFIGURED","CHECKOUT_READY"],
  CHECKOUT_READY: ["PURCHASED"],
  PURCHASED: ["APPROVED"],
  APPROVED: ["DEPLOYMENT_READY"],
  DEPLOYMENT_READY: ["DEPLOYED"],
  DEPLOYED: []
};
export function canTransitionSelection(from: SelectionState, to: SelectionState): boolean {
  return transitions[from].includes(to);
}
export function transitionSelection(from: SelectionState, to: SelectionState): SelectionState {
  if (!canTransitionSelection(from, to)) throw new Error("Invalid selection transition: " + from + " -> " + to);
  return to;
}
