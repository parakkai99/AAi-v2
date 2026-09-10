/**
 * AAi Application Registry
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: APP-RUNTIME-002 — Application Registry
 * Status: ACTIVE
 * Version: 1.2.0
 *
 * This is the controlled application-identity boundary.
 * Shared runtime code does not assume a domain.
 */

import type { ApplicationDefinition } from "./ApplicationDefinition";
import { NGLivingApp } from "@/ngliving/components/NGLivingApp";
import { ParakkaiApp } from "@/parakkai/components/ParakkaiApp";

const APPLICATIONS: Record<string, ApplicationDefinition> = {
  parakkai: {
    id: "parakkai",
    component: ParakkaiApp,
  },
  ngliving: {
    id: "ngliving",
    component: NGLivingApp,
  },
};

export function getApplicationDefinition(applicationId: string): ApplicationDefinition | undefined {
  return APPLICATIONS[applicationId.toLowerCase()];
}

export function getRegisteredApplicationDefinitions(): ApplicationDefinition[] {
  return Object.values(APPLICATIONS);
}

export function getDefaultApplicationDefinition(): ApplicationDefinition {
  return APPLICATIONS.parakkai;
}
