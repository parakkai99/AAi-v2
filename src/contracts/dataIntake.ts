/**
 * AAi Data Source + Mapping Contracts
 * CONTRACT: DATA-INTAKE-001
 *
 * Defines how external/canonical information becomes structured AAi data.
 * This is backend/data foundation only; no UI assumptions.
 */

export type DataSourceKind = "AAI_CATALOG" | "PASTE" | "FILE" | "URL" | "API";
export type MappingStatus = "MAPPED" | "PARTIAL" | "MISSING" | "CONFLICT" | "REJECTED";

export interface DataSourceReference {
  readonly sourceId: string;
  readonly kind: DataSourceKind;
  readonly location?: string;
  readonly contentHash?: string;
  readonly observedAt: string;
  readonly title?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface DataMapping {
  readonly mappingId: string;
  readonly sourcePath: string;
  readonly targetPath: string;
  readonly status: MappingStatus;
  readonly transformation?: string;
  readonly confidence?: number;
  readonly evidenceRefs?: readonly string[];
  readonly notes?: string;
}

export interface DataIntakeDefinition {
  readonly intakeId: string;
  readonly source: DataSourceReference;
  readonly mappings: readonly DataMapping[];
  readonly generatedDefinitionRef?: string;
  readonly missingInformation?: readonly string[];
  readonly conflicts?: readonly string[];
  readonly approved: boolean;
}

export interface GeneratedCopyMetadata {
  readonly sourceId: string;
  readonly sourceVersion?: string;
  readonly generatedAt: string;
  readonly generatedBy: "USER" | "AI" | "SYSTEM";
  readonly copyId: string;
  readonly copyName: string;
  readonly sourceHash?: string;
}
