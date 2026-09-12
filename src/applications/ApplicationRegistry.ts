/**
 * AAi Application Registry
 */
import type { ApplicationDefinition } from "./ApplicationDefinition";
import { NGLivingApp } from "@/ngliving/components/NGLivingApp";
import { ParakkaiApp } from "@/parakkai/components/ParakkaiApp";
import { JaicoApp } from "@/jaico/components/JaicoApp";
import { JiLinkApp } from "@/jilink/components/JiLinkApp";

const APPLICATIONS: Record<string, ApplicationDefinition> = {
  jaico: {
    id: "jaico",
    component: JaicoApp,
  },
  parakkai: {
    id: "parakkai",
    component: ParakkaiApp,
  },
  ngliving: {
    id: "ngliving",
    component: NGLivingApp,
  },
  jilink: {
    id: "jilink",
    component: JiLinkApp,
  }
};

export function getApplicationDefinition(applicationId: string): ApplicationDefinition | undefined {
  return APPLICATIONS[applicationId.toLowerCase()];
}

export function getRegisteredApplicationDefinitions(): ApplicationDefinition[] {
  return Object.values(APPLICATIONS);
}

export function getDefaultApplicationDefinition(): ApplicationDefinition {
  return APPLICATIONS.jaico;
}
