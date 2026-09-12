/**
 * AAi Experience Framework Public Surface
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-FRAMEWORK-001
 * Status: ACTIVE
 * Version: 1.3.0
 */

export { ExperienceRuntime, useExperienceRuntime } from './ExperienceRuntime';
export { experienceThemes, getExperienceTheme, resolveThemeDefinition } from './theme/ThemeRegistry';
export { experienceLayouts, getExperienceLayout, resolveLayoutDefinition } from './layout/LayoutRegistry';

export type {
  ExperienceTheme,
  ExperienceThemeBackground,
  ExperienceThemeMotionLanguage,
  ExperienceThemeSurfaces,
  ExperienceThemeElevation,
  ExperienceThemeRadii,
  ExperienceThemeSpacing,
  ExperienceThemeComponentDefaults,
  ExperienceThemeOverride,
} from './theme/ThemeDefinition';
export type {
  ExperienceLayout,
  ExperienceLayoutRegion,
  ExperienceRailPolicy,
  ExperienceRegionBehavior,
} from './layout/LayoutRegistry';

export * from './contracts';
export * from './composition';
export * from './resolver';
export * from './runtime';
export * from './asset';

export const ExperienceShell: React.FC<any> = ({ children, ...props }) => children;
