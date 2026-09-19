/**
 * AAi Canonical Definition Package
 * CONTRACT: DEFINITION-PACKAGE-001
 *
 * This is the portable definition envelope. Runtime persistence and deployment
 * implementations are resolved by L6 and are never hardcoded into L1-L5.
 */

import type { CapabilityCatalogData } from "./catalog";
import type { L5SolutionDefinition } from "./l5Solution";
import type { SolutionBag, SelectionContext } from "./selection";
import type { CompositionManifest, ExperienceManifest, PersistenceManifest, AssetManifest, EnvironmentManifest, RuntimeManifest, DeploymentManifest, UpdateManifest, AuditManifest } from "./manifests";
import type { DataIntakeDefinition } from "./dataIntake";
import type { AIPromptDefinition } from "./ai";

export interface AAIControlDefinition {
  readonly definitionId: string;
  readonly schemaVersion: string;
  readonly aaIVersion: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface AAiDefinitionPackage {
  readonly control: AAIControlDefinition;
  readonly catalog?: CapabilityCatalogData;
  readonly solution?: L5SolutionDefinition;
  readonly solutionBag?: SolutionBag;
  readonly selectionContext?: SelectionContext;
  readonly composition?: CompositionManifest;
  readonly experience?: ExperienceManifest;
  readonly persistence?: PersistenceManifest;
  readonly assets?: AssetManifest;
  readonly environment?: EnvironmentManifest;
  readonly runtime?: RuntimeManifest;
  readonly deployment?: DeploymentManifest;
  readonly update?: UpdateManifest;
  readonly audit?: AuditManifest;
  readonly dataIntake?: DataIntakeDefinition;
  readonly aiPrompts?: readonly AIPromptDefinition[];
}
