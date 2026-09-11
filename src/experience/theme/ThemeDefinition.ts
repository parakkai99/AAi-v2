/**
 * AAi Experience Theme Contract
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-THEME-001
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * Domain-neutral visual tokens. Applications select identity/content separately.
 */

export interface ExperienceTheme {
  id: string;
  name: string;
  category: 'ai' | 'nature' | 'commerce' | 'modern' | 'dark' | 'light' | 'minimal' | 'business' | 'creative';
  description: string;
  typography: {
    display: string;
    body: string;
    mono: string;
  };
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
  assetRef?: string;
}
