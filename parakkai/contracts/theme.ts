/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

export type ThemeScheduleMode = 'manual' | 'daily' | 'weekly' | 'festival' | 'special_day';

export interface ParakkaiThemeColors {
  primarySkyBlue: string;
  skyBlueHover: string;
  sacredGold: string;
  goldAccent: string;
  deepTempleNavy: string;
  sacredIvoryStone: string;
  templeGreen: string;
  templeCrimson: string;
  surfaceCanvas: string;
  surfaceElevated: string;
  surfaceCard: string;
  borderSubtle: string;
  borderGold: string;
  textPrimary: string;
  textSecondary: string;
  textGold: string;
  sunlightGlow: string;
}

export interface ParakkaiThemeDefinition {
  id: string;
  name: string;
  tamilName?: string;
  description: string;
  character: string;
  colors: ParakkaiThemeColors;
  typography: {
    displayFont: string;
    bodyFont: string;
    tamilFont: string;
  };
  lightingEffect: 'morning-sunlight' | 'golden-deepam' | 'midday-azure' | 'twilight-aarthi';
}

export interface ParakkaiThemeConfig {
  activeThemeId: string;
  scheduleMode: ThemeScheduleMode;
  availableThemes: ParakkaiThemeDefinition[];
  scheduledFestivalThemeId?: string;
  customCssOverrides?: string;
}
