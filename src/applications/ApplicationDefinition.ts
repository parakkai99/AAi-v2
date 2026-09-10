/**
 * AAi Application Definition Contract
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: APP-RUNTIME-001 — Application Definition
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * Reusable boundary: application identity belongs to a definition,
 * not to the shared experience/runtime components.
 */

import type { ComponentType } from "react";

export interface ApplicationDefinition {
  id: string;
  component: ComponentType<{ onExitToAAi?: () => void }>;
}
