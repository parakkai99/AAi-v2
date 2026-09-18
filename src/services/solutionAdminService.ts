import type { SolutionAdminConfig } from "@/src/contracts/solutionAdmin";
import type { ExperienceDefinition } from "@/src/experience/contracts";

const STORAGE_KEY = "aai-solution-admin-config-v1";

type StoredConfigMap = Record<string, SolutionAdminConfig>;

const DEFAULTS: Record<string, Pick<SolutionAdminConfig, "themeId" | "layoutId">> = {
  "aai-live": { themeId: "aai-live", layoutId: "aai-live-left" },
  parakkai: { themeId: "aai-live", layoutId: "aai-live-left" },
  ngliving: { themeId: "aai-live", layoutId: "aai-live-left" },
};

function normalizeId(id: string): string {
  return (id || "").trim().toLowerCase();
}

function readStore(): StoredConfigMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: StoredConfigMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Storage is optional; runtime remains functional without persistence.
  }
}

function createDefaultConfig(solutionId: string): SolutionAdminConfig {
  const id = normalizeId(solutionId);
  const defaults = DEFAULTS[id] ?? { themeId: "aai-live", layoutId: "aai-live" };

  return {
    solutionId: id,
    name: id === "aai-live" ? "AAi Live" : id === "parakkai" ? "Parakkai" : id === "ngliving" ? "NGLiving" : id,
    version: 1,
    publishState: "draft",
    updatedAt: new Date().toISOString(),
    themeId: defaults.themeId,
    layoutId: defaults.layoutId,
    theme: defaults.themeId,
    layout: defaults.layoutId,
  };
}

export function getSolutionAdminConfig(solutionId: string): SolutionAdminConfig {
  const id = normalizeId(solutionId);
  const store = readStore();
  const saved = store[id];

  if (saved) {
    return {
      ...createDefaultConfig(id),
      ...saved,
      solutionId: id,
    };
  }

  return createDefaultConfig(id);
}

export function saveSolutionAdminConfig(config: SolutionAdminConfig): SolutionAdminConfig {
  const id = normalizeId(String(config.solutionId || "solution"));
  const next: SolutionAdminConfig = {
    ...createDefaultConfig(id),
    ...config,
    solutionId: id,
    updatedAt: new Date().toISOString(),
  };

  const store = readStore();
  store[id] = next;
  writeStore(store);
  return next;
}

export function publishSolution(solutionId: string): SolutionAdminConfig {
  const current = getSolutionAdminConfig(solutionId);
  const next: SolutionAdminConfig = {
    ...current,
    version: Number(current.version || 0) + 1,
    publishState: "published",
    updatedAt: new Date().toISOString(),
  };

  return saveSolutionAdminConfig(next);
}

export function getSolutionExperienceDefinition(id: string): ExperienceDefinition {
  const config = getSolutionAdminConfig(id);

  return {
    id: config.solutionId,
    scope: "solution",
    themeId: String(config.themeId || config.theme || "aai-live"),
    themeOverride: config.themeOverride && typeof config.themeOverride === "object"
      ? (config.themeOverride as Readonly<Record<string, unknown>>)
      : undefined,
    layoutId: String(config.layoutId || config.layout || "aai-live"),
    identity: {
      displayName: String(config.name || config.solutionId),
    },
    metadata: {
      source: "solution-admin",
      publishState: String(config.publishState || "draft"),
      version: String(config.version || 1),
    },
  };
}
