import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getExperienceTheme } from './theme/ThemeRegistry';
import { getExperienceLayout } from './layout/LayoutRegistry';
import { resolveExperienceDefinition } from './resolver';
import type { ExperienceTheme } from './theme/ThemeDefinition';
import type { ExperienceLayout } from './layout/LayoutRegistry';
import type { ExperienceDefinition, ExperienceScope } from './contracts';

/**
 * AAi Experience Runtime
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-RUNTIME-001
 * Status: ACTIVE
 * Version: 1.2.0
 *
 * Resolves a layered experience definition and applies framework-owned
 * presentation state without knowing the application's domain or content.
 *
 * The runtime is shared by Universe, Domain, Subdomain and Solution scopes.
 * It does not own component content, business rules, persistence or providers.
 */

export interface ExperienceRuntimeValue {
  theme: ExperienceTheme;
  layout: ExperienceLayout;
  definition: ExperienceDefinition;
  scope: ExperienceScope;
  setTheme: (id: string) => void;
  setLayout: (id: string) => void;
}

const ExperienceContext = createContext<ExperienceRuntimeValue | null>(null);

const themeKey = (applicationId: string) => 'aai-experience-theme:' + applicationId;
const layoutKey = (applicationId: string) => 'aai-experience-layout:' + applicationId;

function read(key: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return window.localStorage.getItem(key) ?? fallback;
}

export interface ExperienceRuntimeProps {
  applicationId: string;
  children: React.ReactNode;
  scope?: ExperienceScope;
  definition?: ExperienceDefinition;
  parentDefinitions?: readonly ExperienceDefinition[];
  defaultThemeId?: string;
  defaultLayoutId?: string;
}

export const ExperienceRuntime: React.FC<ExperienceRuntimeProps> = ({
  applicationId,
  children,
  scope = 'solution',
  definition,
  parentDefinitions = [],
  defaultThemeId = 'aai-live',
  defaultLayoutId = 'aai-live',
}) => {
  const fallbackDefinition = useMemo<ExperienceDefinition>(
    () => ({
      id: applicationId,
      scope,
      themeId: defaultThemeId,
      layoutId: defaultLayoutId,
    }),
    [applicationId, scope, defaultThemeId, defaultLayoutId],
  );

  const resolvedDefinition = useMemo<ExperienceDefinition>(() => {
    const chain = [
      ...parentDefinitions,
      definition ?? fallbackDefinition,
    ];

    return resolveExperienceDefinition(chain);
  }, [definition, fallbackDefinition, parentDefinitions]);

  const resolvedThemeId = resolvedDefinition.themeId ?? defaultThemeId;
  const resolvedLayoutId = resolvedDefinition.layoutId ?? defaultLayoutId;

  const [themeId, setThemeId] = useState(() =>
    read(themeKey(applicationId), resolvedThemeId),
  );
  const [layoutId, setLayoutId] = useState(() =>
    read(layoutKey(applicationId), resolvedLayoutId),
  );

  useEffect(() => {
    setThemeId(resolvedThemeId);
    setLayoutId(resolvedLayoutId);
  }, [resolvedThemeId, resolvedLayoutId]);

  const theme = useMemo(() => getExperienceTheme(themeId), [themeId]);
  const layout = useMemo(() => getExperienceLayout(layoutId), [layoutId]);

  useEffect(() => {
    window.localStorage.setItem(themeKey(applicationId), themeId);
    window.localStorage.setItem(layoutKey(applicationId), layoutId);
  }, [applicationId, themeId, layoutId]);

  useEffect(() => {
    const root = document.documentElement;

    const entries = {
      '--aai-bg': theme.tokens.background,
      '--aai-surface': theme.tokens.surface,
      '--aai-surface-alt': theme.tokens.surfaceAlt,
      '--aai-text': theme.tokens.text,
      '--aai-text-muted': theme.tokens.textMuted,
      '--aai-primary': theme.tokens.primary,
      '--aai-secondary': theme.tokens.secondary,
      '--aai-accent': theme.tokens.accent,
      '--aai-border': theme.tokens.border,
      '--aai-radius': theme.tokens.radius,
      '--aai-shadow': theme.tokens.shadow,
      '--aai-hero-overlay': theme.tokens.heroOverlay,
      '--aai-font-display': theme.typography.display,
      '--aai-font-body': theme.typography.body,
      '--aai-font-mono': theme.typography.mono,
    } as const;

    Object.entries(entries).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    const extendedEntries: Record<string, string | undefined> = {
      '--aai-motion-curve': theme.motionLanguage?.curve,
      '--aai-motion-speed': theme.motionLanguage?.speed,
      '--aai-motion-feel': theme.motionLanguage?.feel,
      '--aai-motion-duration': theme.motionLanguage?.durationMs ? `${theme.motionLanguage.durationMs}ms` : undefined,
      '--aai-surface-card': theme.surfaces?.card,
      '--aai-surface-elevated': theme.surfaces?.elevated,
      '--aai-surface-glass': theme.surfaces?.glass,
      '--aai-surface-rail': theme.surfaces?.rail,
      '--aai-elevation-sm': theme.elevation?.sm,
      '--aai-elevation-md': theme.elevation?.md,
      '--aai-elevation-lg': theme.elevation?.lg,
      '--aai-elevation-spatial-glow': theme.elevation?.spatialGlow,
      '--aai-radius-sm': theme.radii?.sm,
      '--aai-radius-md': theme.radii?.md,
      '--aai-radius-lg': theme.radii?.lg,
      '--aai-radius-xl': theme.radii?.xl,
      '--aai-radius-pill': theme.radii?.pill,
      '--aai-layout-density': layout.density,
    };

    Object.entries(extendedEntries).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(key, value);
      }
    });

    root.style.fontFamily = theme.typography.body;
    root.dataset.aaiTheme = theme.id;
    root.dataset.aaiLayout = layout.id;
    root.dataset.aaiDensity = layout.density ?? 'balanced';
    if (theme.motionLanguage?.speed) {
      root.dataset.aaiMotionSpeed = theme.motionLanguage.speed;
    }
    root.dataset.aaiExperience = resolvedDefinition.id;
    root.dataset.aaiExperienceScope = resolvedDefinition.scope;
  }, [theme, layout, resolvedDefinition]);

  const value = useMemo<ExperienceRuntimeValue>(
    () => ({
      theme,
      layout,
      definition: resolvedDefinition,
      scope: resolvedDefinition.scope,
      setTheme: setThemeId,
      setLayout: setLayoutId,
    }),
    [theme, layout, resolvedDefinition],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
};

export function useExperienceRuntime(): ExperienceRuntimeValue {
  const value = useContext(ExperienceContext);

  if (!value) {
    throw new Error(
      'useExperienceRuntime must be used inside ExperienceRuntime.',
    );
  }

  return value;
}
