import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getExperienceTheme } from './theme/ThemeRegistry';
import { getExperienceLayout } from './layout/LayoutRegistry';
import type { ExperienceTheme } from './theme/ThemeDefinition';
import type { ExperienceLayout } from './layout/LayoutRegistry';

/**
 * AAi Experience Runtime
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-RUNTIME-001
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * Applies framework-owned visual tokens and layout selection without knowing
 * the application's domain, content or business rules.
 */

interface ExperienceRuntimeValue {
  theme: ExperienceTheme;
  layout: ExperienceLayout;
  setTheme: (id: string) => void;
  setLayout: (id: string) => void;
}

const ExperienceContext = createContext<ExperienceRuntimeValue | null>(null);

const themeKey = (applicationId: string) => `aai-experience-theme:${applicationId}`;
const layoutKey = (applicationId: string) => `aai-experience-layout:${applicationId}`;

function read(key: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return window.localStorage.getItem(key) ?? fallback;
}

export interface ExperienceRuntimeProps {
  applicationId: string;
  children: React.ReactNode;
  defaultThemeId?: string;
  defaultLayoutId?: string;
}

export const ExperienceRuntime: React.FC<ExperienceRuntimeProps> = ({
  applicationId,
  children,
  defaultThemeId = 'midnight-dark',
  defaultLayoutId = 'drilldown-4',
}) => {
  const [themeId, setThemeId] = useState(() => read(themeKey(applicationId), defaultThemeId));
  const [layoutId, setLayoutId] = useState(() => read(layoutKey(applicationId), defaultLayoutId));

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
    } as const;

    Object.entries(entries).forEach(([key, value]) => root.style.setProperty(key, value));
    root.dataset.aaiTheme = theme.id;
    root.dataset.aaiLayout = layout.id;
  }, [theme, layout]);

  const value = useMemo<ExperienceRuntimeValue>(() => ({
    theme,
    layout,
    setTheme: setThemeId,
    setLayout: setLayoutId,
  }), [theme, layout]);

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
};

export function useExperienceRuntime(): ExperienceRuntimeValue {
  const value = useContext(ExperienceContext);
  if (!value) throw new Error('useExperienceRuntime must be used inside ExperienceRuntime.');
  return value;
}
