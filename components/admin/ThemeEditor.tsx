"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Eye, RotateCcw, Save, Sparkles } from "lucide-react";
import type { ExperienceTheme } from "@/src/experience/theme/ThemeDefinition";
import type { SolutionAdminConfig } from "@/src/contracts/solutionAdmin";
import { publishLiveThemePreview } from "@/src/services/solutionAdminService";

type ThemeDraft = {
  name: string;
  description: string;
  background: string;
  overlay: string;
  backgroundToken: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  card: string;
  elevated: string;
  rail: string;
  durationMs: number;
  speed: "fast" | "balanced" | "cinematic" | "deliberate";
};

function createDraft(theme: ExperienceTheme, override?: Partial<ExperienceTheme>): ThemeDraft {
  const source = {
    ...theme,
    ...override,
    background: { ...theme.background, ...(override?.background ?? {}) },
    tokens: { ...theme.tokens, ...(override?.tokens ?? {}) },
    surfaces: { ...(theme.surfaces ?? {}), ...(override?.surfaces ?? {}) },
    motionLanguage: { ...(theme.motionLanguage ?? {}), ...(override?.motionLanguage ?? {}) },
  };

  return {
    name: source.name,
    description: source.description,
    background: source.background.value,
    overlay: source.background.overlay ?? "",
    backgroundToken: source.tokens.background,
    surface: source.tokens.surface,
    surfaceAlt: source.tokens.surfaceAlt,
    text: source.tokens.text,
    textMuted: source.tokens.textMuted,
    primary: source.tokens.primary,
    secondary: source.tokens.secondary,
    accent: source.tokens.accent,
    border: source.tokens.border,
    card: source.surfaces?.card ?? source.tokens.surface,
    elevated: source.surfaces?.elevated ?? source.tokens.surfaceAlt,
    rail: source.surfaces?.rail ?? source.tokens.surfaceAlt,
    durationMs: source.motionLanguage?.durationMs ?? 280,
    speed: source.motionLanguage?.speed ?? "balanced",
  };
}

function toOverride(draft: ThemeDraft, theme: ExperienceTheme): Partial<ExperienceTheme> {
  return {
    id: theme.id,
    name: draft.name,
    description: draft.description,
    background: {
      ...theme.background,
      value: draft.background,
      overlay: draft.overlay || undefined,
    },
    tokens: {
      ...theme.tokens,
      background: draft.backgroundToken,
      surface: draft.surface,
      surfaceAlt: draft.surfaceAlt,
      text: draft.text,
      textMuted: draft.textMuted,
      primary: draft.primary,
      secondary: draft.secondary,
      accent: draft.accent,
      border: draft.border,
    },
    surfaces: {
      ...(theme.surfaces ?? {}),
      card: draft.card,
      elevated: draft.elevated,
      rail: draft.rail,
    },
    motionLanguage: {
      curve: theme.motionLanguage?.curve ?? "cubic-bezier(0.16, 1, 0.3, 1)",
      speed: draft.speed,
      feel: theme.motionLanguage?.feel ?? "precise",
      durationMs: draft.durationMs,
    },
  };
}

export interface ThemeEditorProps {
  theme: ExperienceTheme;
  config: SolutionAdminConfig;
  onUpdate: (patch: Partial<SolutionAdminConfig>) => void;
  onSave: () => void;
  onPreview: () => void;
}

export function ThemeEditor({ theme, config, onUpdate, onSave, onPreview }: ThemeEditorProps) {
  const savedOverride =
    config.themeOverrideBaseId === theme.id && config.themeOverride
      ? (config.themeOverride as Partial<ExperienceTheme>)
      : undefined;

  const [draft, setDraft] = useState<ThemeDraft>(() =>
    createDraft(theme, savedOverride),
  );
  const [activeField, setActiveField] = useState<keyof ThemeDraft | null>(null);
  const [flashNonce, setFlashNonce] = useState(0);

  useEffect(() => {
    setDraft(createDraft(theme, savedOverride));
  }, [theme.id, config.themeOverrideBaseId]);

  const override = useMemo(() => toOverride(draft, theme), [draft, theme]);

  useEffect(() => {
    publishLiveThemePreview({
      solutionId: String(config.solutionId),
      themeId: theme.id,
      themeOverride: override as Readonly<Record<string, unknown>>,
    });
  }, [config.solutionId, theme.id, override]);

  const updateDraft = <K extends keyof ThemeDraft>(key: K, value: ThemeDraft[K]) => {
    const next = { ...draft, [key]: value };
    setDraft(next);
    setActiveField(key);
    setFlashNonce((value) => value + 1);
    onUpdate({
      themeOverrideBaseId: theme.id,
      customThemeName: next.name,
      themeOverride: toOverride(next, theme),
    });
  };

  const reset = () => {
    setDraft(createDraft(theme));
    onUpdate({
      themeOverrideBaseId: undefined,
      customThemeName: undefined,
      themeOverride: undefined,
    });
  };

  const liveTheme = {
    ...theme,
    ...override,
    background: { ...theme.background, ...(override.background ?? {}) },
    tokens: { ...theme.tokens, ...(override.tokens ?? {}) },
    surfaces: { ...(theme.surfaces ?? {}), ...(override.surfaces ?? {}) },
  } as ExperienceTheme;

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-cyan-400/20 bg-[#061525]/90 p-4">
        <div className="flex flex-col xl:flex-row xl:items-end gap-3">
          <div className="flex-1">
            <div className="text-[9px] uppercase tracking-[0.25em] font-mono text-cyan-300">
              Editable Experience Theme
            </div>
            <label className="mt-2 block text-[10px] text-[#82a5bb]">Theme name</label>
            <input
              value={draft.name}
              onChange={(e) => updateDraft("name", e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-[#020914] px-3 py-2 text-sm font-semibold text-[#eaf7ff] outline-none focus:border-cyan-400/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-[#cfeaf5]">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button type="button" onClick={onSave} className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300">
              <Save className="w-4 h-4" /> Save Theme
            </button>
            <button type="button" onClick={onPreview} className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-3 py-2 text-xs font-bold text-[#00131f]">
              <Eye className="w-4 h-4" /> Save &amp; Open Live Experience
            </button>
          </div>
        </div>
        <textarea
          value={draft.description}
          onChange={(e) => updateDraft("description", e.target.value)}
          rows={2}
          className="mt-3 w-full rounded-lg border border-white/10 bg-[#020914] px-3 py-2 text-xs text-[#cfeaf5] outline-none focus:border-cyan-400/50"
          placeholder="Describe this visual language..."
        />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] gap-4">
        <section className="rounded-2xl border border-white/10 bg-[#061525]/70 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <h4 className="text-sm font-semibold">Presentation Tokens</h4>
          </div>
          <p className="mt-1 text-[10px] text-[#82a5bb]">
            Change the visual language here. The existing solution structure, images, SVGs and content remain untouched.
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <ThemeTextField label="Background" value={draft.background} onChange={(v) => updateDraft("background", v)} hint="Gradient / CSS background" />
            <ThemeColorField label="Background Token" value={draft.backgroundToken} onChange={(v) => updateDraft("backgroundToken", v)} />
            <ThemeColorField label="Surface" value={draft.surface} onChange={(v) => updateDraft("surface", v)} />
            <ThemeColorField label="Alternate Surface" value={draft.surfaceAlt} onChange={(v) => updateDraft("surfaceAlt", v)} />
            <ThemeColorField label="Card Surface" value={draft.card} onChange={(v) => updateDraft("card", v)} />
            <ThemeColorField label="Elevated Surface" value={draft.elevated} onChange={(v) => updateDraft("elevated", v)} />
            <ThemeColorField label="Rail Surface" value={draft.rail} onChange={(v) => updateDraft("rail", v)} />
            <ThemeColorField label="Text" value={draft.text} onChange={(v) => updateDraft("text", v)} />
            <ThemeColorField label="Muted Text" value={draft.textMuted} onChange={(v) => updateDraft("textMuted", v)} />
            <ThemeColorField label="Primary" value={draft.primary} onChange={(v) => updateDraft("primary", v)} />
            <ThemeColorField label="Secondary" value={draft.secondary} onChange={(v) => updateDraft("secondary", v)} />
            <ThemeColorField label="Accent" value={draft.accent} onChange={(v) => updateDraft("accent", v)} />
            <ThemeColorField label="Border" value={draft.border} onChange={(v) => updateDraft("border", v)} />
            <ThemeTextField label="Overlay" value={draft.overlay} onChange={(v) => updateDraft("overlay", v)} hint="Optional overlay / gradient" />
            <label className="block">
              <span className="text-[10px] text-[#82a5bb]">Motion speed</span>
              <select
                value={draft.speed}
                onChange={(e) => updateDraft("speed", e.target.value as ThemeDraft["speed"])}
                className="mt-1 w-full rounded-lg border border-white/10 bg-[#020914] px-3 py-2 text-xs text-[#eaf7ff] outline-none"
              >
                <option value="fast">Fast</option>
                <option value="balanced">Balanced</option>
                <option value="cinematic">Cinematic</option>
                <option value="deliberate">Deliberate</option>
              </select>
            </label>
            <ThemeTextField
              label="Transition Duration (ms)"
              value={String(draft.durationMs)}
              onChange={(v) => updateDraft("durationMs", Math.max(80, Number(v) || 80))}
              type="number"
            />
          </div>
        </section>

        <ThemeLivePreview theme={liveTheme} activeField={activeField} flashNonce={flashNonce} />
      </div>
    </div>
  );
}

function ThemeTextField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  type?: "text" | "number";
}) {
  return (
    <label className="block">
      <span className="text-[10px] text-[#82a5bb]">{label}</span>
      {hint && <span className="ml-2 text-[9px] text-[#536f84]">{hint}</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-white/10 bg-[#020914] px-3 py-2 text-xs font-mono text-[#eaf7ff] outline-none focus:border-cyan-400/50"
      />
    </label>
  );
}

function normalizePickerColor(value: string): string {
  const hex = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) return hex.toLowerCase();
  if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
    return "#" + hex.slice(1).split("").map((part) => part + part).join("").toLowerCase();
  }

  const rgb = hex.match(/^rgba?\\(\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})/i);
  if (rgb) {
    return "#" + [rgb[1], rgb[2], rgb[3]]
      .map((part) => Math.max(0, Math.min(255, Number(part))).toString(16).padStart(2, "0"))
      .join("");
  }

  return "#000000";
}

function ThemeColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block cursor-pointer">
      <span className="text-[10px] text-[#82a5bb]">{label}</span>
      <div className="mt-1 flex h-[42px] items-center gap-3 rounded-lg border border-white/10 bg-[#020914] px-2">
        <span
          className="h-7 w-10 shrink-0 rounded-md border border-white/20 shadow-inner"
          style={{ backgroundColor: normalizePickerColor(value) }}
        />
        <input
          type="color"
          value={normalizePickerColor(value)}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`Pick ${label} color`}
          className="h-8 w-12 cursor-pointer rounded-md border-0 bg-transparent p-0"
        />
        <span className="text-xs text-[#cfeaf5]">Pick color</span>
      </div>
    </label>
  );
}

function ThemeLivePreview({
  theme,
  activeField,
  flashNonce,
}: {
  theme: ExperienceTheme;
  activeField: keyof ThemeDraft | null;
  flashNonce: number;
}) {
  const blinkStyle = (field: keyof ThemeDraft): React.CSSProperties =>
    activeField === field
      ? { animation: "aaiThemeBlink 650ms ease-in-out 2" }
      : {};
  const bg = theme.background.value;
  const text = theme.tokens.text;
  const muted = theme.tokens.textMuted;
  const surface = theme.surfaces?.card ?? theme.tokens.surface;
  const elevated = theme.surfaces?.elevated ?? theme.tokens.surfaceAlt;

  return (
    <section
      key={flashNonce}
      className="min-h-[520px] rounded-2xl overflow-hidden border p-4"
      style={{ background: bg, color: text, borderColor: theme.tokens.border, ...blinkStyle("background") }}
    >
      <style>{`
        @keyframes aaiThemeBlink {
          0%, 100% { filter: none; }
          35%, 70% { filter: brightness(1.35); }
        }
      `}</style>
      {theme.background.overlay && (
        <div className="absolute" />
      )}
      <div className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: elevated, border: `1px solid ${theme.tokens.border}` }}>
        <div>
          <div className="text-[9px] uppercase tracking-[0.2em]" style={{ color: theme.tokens.primary }}>Live Experience</div>
          <div className="text-sm font-semibold">{theme.name}</div>
        </div>
        <div className="rounded-full px-3 py-1 text-[9px]" style={{ background: theme.tokens.primary, color: theme.background.mode === "image" ? "#fff" : theme.tokens.text }}>Preview</div>
      </div>

      <div className="mt-3 grid grid-cols-[74px_1fr] gap-3 min-h-[410px]">
        <aside
          className="rounded-xl p-2"
          style={{
            background: theme.surfaces?.rail ?? elevated,
            border: `1px solid ${theme.tokens.border}`,
            ...blinkStyle("rail"),
          }}
        >
          {["HOME", "DISCOVER", "SERVICES", "OUTCOME"].map((item, index) => (
            <div key={item} className="rounded-lg px-2 py-3 text-[8px] mb-1" style={{ background: index === 1 ? theme.tokens.primary : "transparent", color: index === 1 ? "#fff" : text }}>
              {item}
            </div>
          ))}
        </aside>

        <div className="space-y-3">
          <div
            className="rounded-xl p-4"
            style={{
              background: surface,
              border: `1px solid ${theme.tokens.border}`,
              boxShadow: theme.tokens.shadow,
              ...blinkStyle("card"),
            }}
          >
            <div
              className="text-[8px] uppercase tracking-[0.18em]"
              style={{ color: theme.tokens.accent, ...blinkStyle("accent") }}
            >OBJECTIVE → OUTCOME</div>
            <div
              className="mt-2 text-2xl font-bold"
              style={blinkStyle("text")}
            >A coordinated solution experience</div>
            <div
              className="mt-1 text-xs"
              style={{ color: muted, ...blinkStyle("textMuted") }}
            >Cards, bands, controls and typography follow the selected theme.</div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["Capability", "Service", "Outcome"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg p-3 text-[9px]"
                  style={{
                    background: elevated,
                    border: `1px solid ${theme.tokens.border}`,
                    ...blinkStyle("surfaceAlt"),
                  }}
                >
                  <div style={{ color: theme.tokens.primary, ...blinkStyle("primary") }}>{item}</div>
                  <div className="mt-2" style={{ color: muted }}>Live card surface</div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="rounded-xl p-3"
            style={{
              background: elevated,
              border: `1px solid ${theme.tokens.border}`,
              ...blinkStyle("elevated"),
            }}
          >
            <div className="text-[9px] uppercase" style={{ color: theme.tokens.secondary, ...blinkStyle("secondary") }}>Band / Section</div>
            <div className="mt-1 text-xs" style={{ color: muted, ...blinkStyle("textMuted") }}>This area changes immediately as you edit the theme.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
