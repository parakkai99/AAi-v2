/**
 * AAi SQL Artifact Generator
 * L6 provider-neutral SQL rendering used by relational adapters.
 *
 * The generator only uses fields explicitly declared in the persistence
 * manifest. It never invents business entities.
 */

import type { PersistenceEntity, PersistenceManifest } from "../contracts/manifests";

export type SqlDialect = "POSTGRESQL" | "MYSQL";

export function renderRelationalSchema(
  manifest: PersistenceManifest,
  dialect: SqlDialect,
): string {
  const statements = manifest.entities.map((entity) =>
    renderEntity(entity, dialect),
  );

  return [
    `-- AAi Persistence Manifest ${manifest.persistenceManifestId}`,
    `-- Version ${manifest.version}`,
    `-- Dialect ${dialect}`,
    "",
    ...statements,
  ].join("\n");
}

function renderEntity(entity: PersistenceEntity, dialect: SqlDialect): string {
  const table = identifier(entity.name, dialect);
  const fields = entity.fields.length
    ? entity.fields.map((field) => renderField(field, dialect))
    : [`  ${identifier("id", dialect)} ${dialect === "POSTGRESQL" ? "BIGSERIAL" : "BIGINT AUTO_INCREMENT"} PRIMARY KEY`];

  return [
    `CREATE TABLE IF NOT EXISTS ${table} (`,
    fields.join(",\n"),
    ");",
  ].join("\n");
}

function renderField(
  field: Readonly<Record<string, unknown>>,
  dialect: SqlDialect,
): string {
  const name = typeof field.name === "string" ? field.name : "unnamed_field";
  const type = mapType(String(field.type ?? "string"), dialect);
  const nullable = field.nullable === false ? " NOT NULL" : "";
  const primary = field.primaryKey === true ? " PRIMARY KEY" : "";
  return `  ${identifier(name, dialect)} ${type}${nullable}${primary}`;
}

function mapType(type: string, dialect: SqlDialect): string {
  switch (type.toLowerCase()) {
    case "string":
    case "text":
      return "TEXT";
    case "uuid":
      return dialect === "POSTGRESQL" ? "UUID" : "CHAR(36)";
    case "integer":
    case "int":
      return "INTEGER";
    case "bigint":
      return "BIGINT";
    case "number":
    case "decimal":
      return "DECIMAL(18,6)";
    case "boolean":
      return dialect === "POSTGRESQL" ? "BOOLEAN" : "BOOLEAN";
    case "date":
      return "DATE";
    case "datetime":
    case "timestamp":
      return "TIMESTAMP";
    case "json":
      return dialect === "POSTGRESQL" ? "JSONB" : "JSON";
    default:
      return "TEXT";
  }
}

function identifier(value: string, dialect: SqlDialect): string {
  const safe = value.trim().replace(/[^a-zA-Z0-9_]/g, "_");
  return dialect === "POSTGRESQL" ? `"${safe}"` : `\`${safe}\``;
}
