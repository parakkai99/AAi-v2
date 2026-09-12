/**
 * AAi Experience Theme Contract
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-THEME-001
 * Status: ACTIVE
 * Version: 1.1.0
 *
 * Domain-neutral visual tokens. Applications select identity/content separately.
 */

export interface ExperienceThemeBackground {
  mode: 'color' | 'gradient' | 'image';
  value: string;
  overlay?: string;
}

export interface ExperienceThemeMotionLanguage {
  curve: string;
  speed: 'fast' | 'balanced' | 'cinematic' | 'deliberate';
  feel: 'precise' | 'organic' | 'crisp' | 'expressive';
  durationMs?: number;
}

export interface ExperienceThemeSurfaces {
  card?: string;
  elevated?: string;
  overlay?: string;
  glass?: string;
  rail?: string;
}

export interface ExperienceThemeElevation {
  sm: string;
  md: string;
  lg: string;
  spatialGlow?: string;
}

export interface ExperienceThemeRadii {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  pill: string;
}

export interface ExperienceThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ExperienceThemeComponentDefaults {
  buttonRadius?: string;
  cardBorder?: string;
  railBackground?: string;
}

export interface ExperienceTheme {
  id: string;
  name: string;
  category: 'ai' | 'nature' | 'commerce' | 'modern' | 'dark' | 'light' | 'minimal' | 'business' | 'creative';
  description: string;
  extends?: string;
  typography: {
    display: string;
    body: string;
    mono: string;
  };
  background: ExperienceThemeBackground;
  tokens: {
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    radius: string;
    shadow: string;
    heroOverlay: string;
  };
  motionLanguage?: ExperienceThemeMotionLanguage;
  surfaces?: ExperienceThemeSurfaces;
  elevation?: ExperienceThemeElevation;
  radii?: ExperienceThemeRadii;
  spacing?: ExperienceThemeSpacing;
  componentDefaults?: ExperienceThemeComponentDefaults;
  assetRef?: string;
}

export type ExperienceThemeOverride = Partial<Omit<ExperienceTheme, 'id'>> & { id: string };
