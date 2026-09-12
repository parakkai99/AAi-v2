import type { ExperienceTheme } from './ThemeDefinition';

export const experienceThemes: ExperienceTheme[] = [
  // 1. Foundation: AAi Live (Preserved)
  {
    id: 'aai-live',
    name: 'AAi Live',
    category: 'dark',
    description: 'ArchitectAny live foundation — immersive dark workspace with cyan intelligence accents.',
    typography: { display: 'Inter, ui-sans-serif, system-ui, sans-serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg,#020914 0%,#04182b 48%,#00151f 100%)', overlay: 'radial-gradient(circle at 50% 25%,rgba(0,227,253,.16),transparent 42%)' },
    tokens: { background: '#020914', surface: '#061525', surfaceAlt: '#0b2238', text: '#eaf7ff', textMuted: '#82a5bb', primary: '#00e3fd', secondary: '#1598d6', accent: '#00e3fd', border: 'rgba(0,227,253,.22)', radius: '14px', shadow: '0 20px 60px rgba(0,227,253,.16)', heroOverlay: 'linear-gradient(135deg,rgba(2,9,20,.08),rgba(0,227,253,.28))' },
    motionLanguage: { curve: 'cubic-bezier(0.16, 1, 0.3, 1)', speed: 'balanced', feel: 'precise', durationMs: 280 },
    surfaces: { card: '#061525', elevated: '#0b2238', glass: 'rgba(6, 21, 37, 0.82)', rail: '#030e1a' },
    elevation: { sm: '0 2px 8px rgba(0,0,0,0.3)', md: '0 8px 24px rgba(0,0,0,0.4)', lg: '0 20px 60px rgba(0,227,253,.16)', spatialGlow: '0 0 35px rgba(0,227,253,.25)' },
    radii: { sm: '6px', md: '10px', lg: '14px', xl: '20px', pill: '9999px' },
    componentDefaults: { buttonRadius: '12px', cardBorder: 'rgba(0,227,253,.18)', railBackground: '#030e1a' },
  },

  // 2. Foundation: AI Era (Preserved)
  {
    id: 'ai-era',
    name: 'AI Era',
    category: 'ai',
    description: 'Futuristic, intelligent and immersive with radiant ultraviolet and violet gradients.',
    typography: { display: 'Georgia, serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg,#05030f 0%,#15102d 100%)' },
    tokens: { background: '#05030f', surface: '#0b0a1c', surfaceAlt: '#15102d', text: '#f5f3ff', textMuted: '#aaa2c8', primary: '#5b5cff', secondary: '#8b5cf6', accent: '#22d3ee', border: 'rgba(139,92,246,.35)', radius: '16px', shadow: '0 20px 60px rgba(91,92,255,.24)', heroOverlay: 'linear-gradient(135deg,rgba(5,3,15,.08),rgba(91,92,255,.72))' },
    motionLanguage: { curve: 'cubic-bezier(0.2, 0.9, 0.2, 1)', speed: 'cinematic', feel: 'expressive', durationMs: 380 },
    surfaces: { card: '#0b0a1c', elevated: '#15102d', glass: 'rgba(11, 10, 28, 0.85)', rail: '#070514' },
    elevation: { sm: '0 2px 8px rgba(0,0,0,0.35)', md: '0 8px 24px rgba(0,0,0,0.5)', lg: '0 20px 60px rgba(91,92,255,.24)', spatialGlow: '0 0 35px rgba(139,92,246,.3)' },
    radii: { sm: '8px', md: '12px', lg: '16px', xl: '24px', pill: '9999px' },
    componentDefaults: { buttonRadius: '14px', cardBorder: 'rgba(139,92,246,.25)', railBackground: '#070514' },
  },

  // 3. Pure White — Swiss Minimalist
  {
    id: 'pure-white',
    name: 'Pure White',
    category: 'minimal',
    description: 'Crisp Swiss architectural minimalism with clean high-contrast card separation.',
    typography: { display: 'Inter, ui-sans-serif, system-ui, sans-serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'color', value: '#f8fafc' },
    tokens: { background: '#f8fafc', surface: '#ffffff', surfaceAlt: '#f1f5f9', text: '#090d16', textMuted: '#334155', primary: '#0284c7', secondary: '#475569', accent: '#b45309', border: '#cbd5e1', radius: '14px', shadow: '0 4px 20px -2px rgba(15,23,42,.08), 0 2px 6px -1px rgba(15,23,42,.04)', heroOverlay: 'linear-gradient(135deg,rgba(255,255,255,.92),rgba(241,245,249,.82))' },
    motionLanguage: { curve: 'cubic-bezier(0.2, 0.8, 0.2, 1)', speed: 'fast', feel: 'crisp', durationMs: 200 },
    surfaces: { card: '#ffffff', elevated: '#ffffff', glass: 'rgba(255, 255, 255, 0.96)', rail: '#ffffff' },
    elevation: { sm: '0 1px 3px rgba(15,23,42,.08)', md: '0 4px 16px rgba(15,23,42,.09)', lg: '0 10px 30px rgba(15,23,42,.12)', spatialGlow: '0 0 24px rgba(2,132,199,.15)' },
    radii: { sm: '6px', md: '10px', lg: '14px', xl: '18px', pill: '9999px' },
    componentDefaults: { buttonRadius: '10px', cardBorder: '#cbd5e1', railBackground: '#ffffff' },
  },

  // 4. Nordic Frost — Scandinavian Cool Light
  {
    id: 'nordic-frost',
    name: 'Nordic Frost',
    category: 'light',
    description: 'Subtle pale ice-blue canvas with deep oceanic cobalt and crisp typography.',
    typography: { display: 'Inter, ui-sans-serif, system-ui, sans-serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg, #f0f4f8 0%, #e8eef5 100%)' },
    tokens: { background: '#f0f4f8', surface: '#ffffff', surfaceAlt: '#e6edf5', text: '#102a43', textMuted: '#486581', primary: '#0066cc', secondary: '#334e68', accent: '#0284c7', border: '#d9e2ec', radius: '12px', shadow: '0 4px 20px rgba(16,42,67,0.06)', heroOverlay: 'linear-gradient(135deg,rgba(0,102,204,0.04),rgba(2,132,199,0.12))' },
    motionLanguage: { curve: 'cubic-bezier(0.16, 1, 0.3, 1)', speed: 'balanced', feel: 'crisp', durationMs: 240 },
    surfaces: { card: '#ffffff', elevated: '#ffffff', glass: 'rgba(255, 255, 255, 0.94)', rail: '#f8fafc' },
    elevation: { sm: '0 1px 3px rgba(16,42,67,.06)', md: '0 4px 14px rgba(16,42,67,.08)', lg: '0 12px 30px rgba(16,42,67,.12)' },
    radii: { sm: '6px', md: '10px', lg: '12px', xl: '16px', pill: '9999px' },
    componentDefaults: { buttonRadius: '10px', cardBorder: '#d9e2ec', railBackground: '#f8fafc' },
  },

  // 5. Kyoto Zen — Wabi-Sabi Natural Stone
  {
    id: 'kyoto-zen',
    name: 'Kyoto Zen',
    category: 'light',
    description: 'Serene warm stone washi-paper canvas with bamboo wood and natural ink tones.',
    typography: { display: 'Georgia, serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg, #f7f6f2 0%, #f0ede5 100%)' },
    tokens: { background: '#f7f6f2', surface: '#ffffff', surfaceAlt: '#eeeae0', text: '#23201d', textMuted: '#635e58', primary: '#8a6538', secondary: '#535b4c', accent: '#a16207', border: '#e2ded5', radius: '14px', shadow: '0 4px 20px rgba(35,32,29,0.05)', heroOverlay: 'linear-gradient(135deg,rgba(138,101,56,0.05),rgba(161,98,7,0.12))' },
    motionLanguage: { curve: 'cubic-bezier(0.25, 1, 0.5, 1)', speed: 'deliberate', feel: 'organic', durationMs: 320 },
    surfaces: { card: '#ffffff', elevated: '#ffffff', glass: 'rgba(255, 255, 255, 0.94)', rail: '#faf9f6' },
    elevation: { sm: '0 1px 3px rgba(35,32,29,.05)', md: '0 4px 14px rgba(35,32,29,.07)', lg: '0 12px 30px rgba(35,32,29,.1)' },
    radii: { sm: '6px', md: '10px', lg: '14px', xl: '18px', pill: '9999px' },
    componentDefaults: { buttonRadius: '12px', cardBorder: '#e2ded5', railBackground: '#faf9f6' },
  },

  // 6. Editorial Sand — Architectural Atelier
  {
    id: 'editorial-sand',
    name: 'Editorial Sand',
    category: 'light',
    description: 'Refined architectural publication aesthetic with warm sand and terracotta notes.',
    typography: { display: 'Georgia, serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg, #faf7f2 0%, #f3eee6 100%)' },
    tokens: { background: '#faf7f2', surface: '#ffffff', surfaceAlt: '#eee6da', text: '#1c1917', textMuted: '#665f59', primary: '#b45309', secondary: '#78350f', accent: '#c2410c', border: '#e7dfd3', radius: '12px', shadow: '0 4px 20px rgba(28,25,23,0.06)', heroOverlay: 'linear-gradient(135deg,rgba(180,83,9,0.04),rgba(194,65,12,0.12))' },
    motionLanguage: { curve: 'cubic-bezier(0.16, 1, 0.3, 1)', speed: 'balanced', feel: 'precise', durationMs: 260 },
    surfaces: { card: '#ffffff', elevated: '#ffffff', glass: 'rgba(255, 255, 255, 0.94)', rail: '#fcfaf7' },
    elevation: { sm: '0 1px 3px rgba(28,25,23,.05)', md: '0 4px 14px rgba(28,25,23,.08)', lg: '0 12px 30px rgba(28,25,23,.11)' },
    radii: { sm: '6px', md: '10px', lg: '12px', xl: '16px', pill: '9999px' },
    componentDefaults: { buttonRadius: '10px', cardBorder: '#e7dfd3', railBackground: '#fcfaf7' },
  },

  // 7. Monochrome Studio — Gallery Modernist
  {
    id: 'monochrome-studio',
    name: 'Monochrome Studio',
    category: 'minimal',
    description: 'High-precision modern gallery look with neutral gray contrast and electric blue focus.',
    typography: { display: 'Inter, ui-sans-serif, system-ui, sans-serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'color', value: '#f4f4f5' },
    tokens: { background: '#f4f4f4', surface: '#ffffff', surfaceAlt: '#e4e4e7', text: '#18181b', textMuted: '#52525b', primary: '#18181b', secondary: '#3f3f46', accent: '#2563eb', border: '#d4d4d8', radius: '10px', shadow: '0 4px 18px rgba(0,0,0,0.06)', heroOverlay: 'linear-gradient(135deg,rgba(24,24,27,0.03),rgba(37,99,235,0.1))' },
    motionLanguage: { curve: 'cubic-bezier(0.2, 0.8, 0.2, 1)', speed: 'fast', feel: 'crisp', durationMs: 190 },
    surfaces: { card: '#ffffff', elevated: '#ffffff', glass: 'rgba(255, 255, 255, 0.95)', rail: '#fafafa' },
    elevation: { sm: '0 1px 2px rgba(0,0,0,.06)', md: '0 4px 12px rgba(0,0,0,.08)', lg: '0 10px 24px rgba(0,0,0,.1)' },
    radii: { sm: '4px', md: '8px', lg: '10px', xl: '14px', pill: '9999px' },
    componentDefaults: { buttonRadius: '8px', cardBorder: '#d4d4d8', railBackground: '#fafafa' },
  },

  // 8. Terracotta Sun — Mediterranean Warmth
  {
    id: 'terracotta-sun',
    name: 'Terracotta Sun',
    category: 'creative',
    description: 'Sun-drenched baked clay canvas with rich terracotta and golden sunset highlights.',
    typography: { display: 'Georgia, serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg, #fff7f2 0%, #faede5 100%)' },
    tokens: { background: '#fff7f2', surface: '#ffffff', surfaceAlt: '#faeee6', text: '#3f1508', textMuted: '#7c3f2d', primary: '#c2410c', secondary: '#9a3412', accent: '#d97706', border: '#fed7aa', radius: '14px', shadow: '0 4px 22px rgba(194,65,12,0.07)', heroOverlay: 'linear-gradient(135deg,rgba(194,65,12,0.05),rgba(217,119,6,0.15))' },
    motionLanguage: { curve: 'cubic-bezier(0.16, 1, 0.3, 1)', speed: 'balanced', feel: 'expressive', durationMs: 270 },
    surfaces: { card: '#ffffff', elevated: '#ffffff', glass: 'rgba(255, 255, 255, 0.94)', rail: '#fffaf6' },
    elevation: { sm: '0 1px 3px rgba(194,65,12,.06)', md: '0 4px 14px rgba(194,65,12,.08)', lg: '0 12px 30px rgba(194,65,12,.12)' },
    radii: { sm: '6px', md: '10px', lg: '14px', xl: '18px', pill: '9999px' },
    componentDefaults: { buttonRadius: '12px', cardBorder: '#fed7aa', railBackground: '#fffaf6' },
  },

  // 9. Coastal Solitude — Ocean Breeze Teal
  {
    id: 'coastal-solitude',
    name: 'Coastal Solitude',
    category: 'nature',
    description: 'Refreshing coastal atmosphere with aquatic sea-foam and deep marine teal depth.',
    typography: { display: 'Inter, ui-sans-serif, system-ui, sans-serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg, #f0fdfa 0%, #e6f7f5 100%)' },
    tokens: { background: '#f0fdfa', surface: '#ffffff', surfaceAlt: '#ddf3f0', text: '#042f2e', textMuted: '#235955', primary: '#0f766e', secondary: '#115e59', accent: '#0284c7', border: '#ccfbf1', radius: '14px', shadow: '0 4px 20px rgba(15,118,110,0.06)', heroOverlay: 'linear-gradient(135deg,rgba(15,118,110,0.04),rgba(2,132,199,0.12))' },
    motionLanguage: { curve: 'cubic-bezier(0.25, 1, 0.5, 1)', speed: 'balanced', feel: 'organic', durationMs: 290 },
    surfaces: { card: '#ffffff', elevated: '#ffffff', glass: 'rgba(255, 255, 255, 0.94)', rail: '#f7fefd' },
    elevation: { sm: '0 1px 3px rgba(15,118,110,.06)', md: '0 4px 14px rgba(15,118,110,.08)', lg: '0 12px 30px rgba(15,118,110,.12)' },
    radii: { sm: '6px', md: '10px', lg: '14px', xl: '18px', pill: '9999px' },
    componentDefaults: { buttonRadius: '12px', cardBorder: '#ccfbf1', railBackground: '#f7fefd' },
  },

  // 10. Imperial Vermilion — Sacred Heritage
  {
    id: 'imperial-vermilion',
    name: 'Imperial Vermilion',
    category: 'creative',
    description: 'Sacred temple heritage with royal crimson vermilion and consecrated temple gold.',
    typography: { display: 'Georgia, serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg, #fff5f5 0%, #fcedec 100%)' },
    tokens: { background: '#fff5f5', surface: '#ffffff', surfaceAlt: '#fae6e6', text: '#3b0811', textMuted: '#782d38', primary: '#be123c', secondary: '#881337', accent: '#d97706', border: '#fecdd3', radius: '14px', shadow: '0 4px 22px rgba(190,18,60,0.07)', heroOverlay: 'linear-gradient(135deg,rgba(190,18,60,0.05),rgba(217,119,6,0.14))' },
    motionLanguage: { curve: 'cubic-bezier(0.16, 1, 0.3, 1)', speed: 'balanced', feel: 'expressive', durationMs: 280 },
    surfaces: { card: '#ffffff', elevated: '#ffffff', glass: 'rgba(255, 255, 255, 0.94)', rail: '#fffafa' },
    elevation: { sm: '0 1px 3px rgba(190,18,60,.06)', md: '0 4px 14px rgba(190,18,60,.08)', lg: '0 12px 30px rgba(190,18,60,.12)' },
    radii: { sm: '6px', md: '10px', lg: '14px', xl: '18px', pill: '9999px' },
    componentDefaults: { buttonRadius: '12px', cardBorder: '#fecdd3', railBackground: '#fffafa' },
  },

  // 11. Celestial Indigo — Midnight Starlight (Dark)
  {
    id: 'celestial-indigo',
    name: 'Celestial Indigo',
    category: 'dark',
    description: 'Deep starlight navy canvas with glowing cosmic indigo and warm starlight gold.',
    typography: { display: 'Inter, ui-sans-serif, system-ui, sans-serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg, #070c1a 0%, #0d1733 100%)' },
    tokens: { background: '#070c1a', surface: '#0f1b3d', surfaceAlt: '#172754', text: '#f0f4ff', textMuted: '#92a2d4', primary: '#6366f1', secondary: '#818cf8', accent: '#facc15', border: 'rgba(99, 102, 241, 0.26)', radius: '14px', shadow: '0 20px 60px rgba(7,12,26,0.6)', heroOverlay: 'linear-gradient(135deg,rgba(7,12,26,0.1),rgba(99,102,241,0.3))' },
    motionLanguage: { curve: 'cubic-bezier(0.16, 1, 0.3, 1)', speed: 'balanced', feel: 'precise', durationMs: 270 },
    surfaces: { card: '#0f1b3d', elevated: '#172754', glass: 'rgba(15, 27, 61, 0.85)', rail: '#091024' },
    elevation: { sm: '0 2px 8px rgba(0,0,0,0.4)', md: '0 8px 24px rgba(0,0,0,0.55)', lg: '0 20px 60px rgba(0,0,0,0.7)', spatialGlow: '0 0 35px rgba(99,102,241,0.25)' },
    radii: { sm: '6px', md: '10px', lg: '14px', xl: '20px', pill: '9999px' },
    componentDefaults: { buttonRadius: '12px', cardBorder: 'rgba(99, 102, 241, 0.22)', railBackground: '#091024' },
  },

  // 12. Obsidian Gold — Executive Luxury (Dark)
  {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    category: 'dark',
    description: 'Ultra-dark luxury aesthetic with brushed champagne gold and warm amber brilliance.',
    typography: { display: 'Georgia, serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg, #09090b 0%, #131316 100%)' },
    tokens: { background: '#09090b', surface: '#141418', surfaceAlt: '#1f1f26', text: '#fafafa', textMuted: '#a1a1aa', primary: '#d4af37', secondary: '#e5c07b', accent: '#f59e0b', border: 'rgba(212, 175, 55, 0.24)', radius: '14px', shadow: '0 20px 60px rgba(0,0,0,0.7)', heroOverlay: 'linear-gradient(135deg,rgba(9,9,11,0.1),rgba(212,175,55,0.25))' },
    motionLanguage: { curve: 'cubic-bezier(0.2, 0.9, 0.2, 1)', speed: 'cinematic', feel: 'expressive', durationMs: 340 },
    surfaces: { card: '#141418', elevated: '#1f1f26', glass: 'rgba(20, 20, 24, 0.88)', rail: '#0c0c0e' },
    elevation: { sm: '0 2px 8px rgba(0,0,0,0.4)', md: '0 8px 24px rgba(0,0,0,0.6)', lg: '0 20px 60px rgba(0,0,0,0.75)', spatialGlow: '0 0 35px rgba(212,175,55,0.28)' },
    radii: { sm: '6px', md: '10px', lg: '14px', xl: '20px', pill: '9999px' },
    componentDefaults: { buttonRadius: '12px', cardBorder: 'rgba(212, 175, 55, 0.2)', railBackground: '#0c0c0e' },
  },

  // 13. Cyber Matrix — Emerald Engineering (Dark)
  {
    id: 'cyber-matrix',
    name: 'Cyber Matrix',
    category: 'dark',
    description: 'Precision telemetry engineering dark console with radiant matrix emerald and cyan.',
    typography: { display: 'Inter, ui-sans-serif, system-ui, sans-serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg, #020908 0%, #051915 100%)' },
    tokens: { background: '#020908', surface: '#07201b', surfaceAlt: '#0d3029', text: '#ecfdf5', textMuted: '#6ee7b7', primary: '#10b981', secondary: '#059669', accent: '#06b6d4', border: 'rgba(16, 185, 129, 0.28)', radius: '12px', shadow: '0 20px 60px rgba(2,9,8,0.7)', heroOverlay: 'linear-gradient(135deg,rgba(2,9,8,0.1),rgba(16,185,129,0.3))' },
    motionLanguage: { curve: 'cubic-bezier(0.16, 1, 0.3, 1)', speed: 'fast', feel: 'crisp', durationMs: 200 },
    surfaces: { card: '#07201b', elevated: '#0d3029', glass: 'rgba(7, 32, 27, 0.85)', rail: '#03120f' },
    elevation: { sm: '0 2px 8px rgba(0,0,0,0.4)', md: '0 8px 24px rgba(0,0,0,0.6)', lg: '0 20px 60px rgba(0,0,0,0.7)', spatialGlow: '0 0 35px rgba(16,185,129,0.25)' },
    radii: { sm: '4px', md: '8px', lg: '12px', xl: '16px', pill: '9999px' },
    componentDefaults: { buttonRadius: '10px', cardBorder: 'rgba(16, 185, 129, 0.22)', railBackground: '#03120f' },
  },

  // 14. Deep Emerald — Botanical Sanctuary (Dark)
  {
    id: 'deep-emerald',
    name: 'Deep Emerald',
    category: 'nature',
    description: 'Lush nighttime botanical sanctuary with rich jade foliage and warm sunbeam glow.',
    typography: { display: 'Georgia, serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg, #03140e 0%, #08291c 100%)' },
    tokens: { background: '#03140e', surface: '#0a3022', surfaceAlt: '#104230', text: '#f0fdf4', textMuted: '#86efac', primary: '#22c55e', secondary: '#16a34a', accent: '#fbbf24', border: 'rgba(34, 197, 94, 0.22)', radius: '14px', shadow: '0 20px 60px rgba(3,20,14,0.65)', heroOverlay: 'linear-gradient(135deg,rgba(3,20,14,0.1),rgba(34,197,94,0.28))' },
    motionLanguage: { curve: 'cubic-bezier(0.25, 1, 0.5, 1)', speed: 'deliberate', feel: 'organic', durationMs: 320 },
    surfaces: { card: '#0a3022', elevated: '#104230', glass: 'rgba(10, 48, 34, 0.85)', rail: '#051f16' },
    elevation: { sm: '0 2px 8px rgba(0,0,0,0.4)', md: '0 8px 24px rgba(0,0,0,0.55)', lg: '0 20px 60px rgba(0,0,0,0.7)', spatialGlow: '0 0 35px rgba(34,197,94,0.22)' },
    radii: { sm: '6px', md: '10px', lg: '14px', xl: '20px', pill: '9999px' },
    componentDefaults: { buttonRadius: '12px', cardBorder: 'rgba(34, 197, 94, 0.2)', railBackground: '#051f16' },
  },

  // 15. Titanium Slate — High-Performance Console (Dark)
  {
    id: 'titanium-slate',
    name: 'Titanium Slate',
    category: 'dark',
    description: 'Gunmetal aerospace slate dark console with electric titanium blue and violet rays.',
    typography: { display: 'Inter, ui-sans-serif, system-ui, sans-serif', body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
    background: { mode: 'gradient', value: 'linear-gradient(135deg, #0b0f19 0%, #151e33 100%)' },
    tokens: { background: '#0b0f19', surface: '#141e33', surfaceAlt: '#1c2a47', text: '#f8fafc', textMuted: '#94a3b8', primary: '#38bdf8', secondary: '#60a5fa', accent: '#a855f7', border: 'rgba(56, 189, 248, 0.22)', radius: '12px', shadow: '0 20px 60px rgba(0,0,0,0.65)', heroOverlay: 'linear-gradient(135deg,rgba(11,15,25,0.1),rgba(56,189,248,0.28))' },
    motionLanguage: { curve: 'cubic-bezier(0.16, 1, 0.3, 1)', speed: 'fast', feel: 'precise', durationMs: 220 },
    surfaces: { card: '#141e33', elevated: '#1c2a47', glass: 'rgba(20, 30, 51, 0.85)', rail: '#0d1424' },
    elevation: { sm: '0 2px 8px rgba(0,0,0,0.4)', md: '0 8px 24px rgba(0,0,0,0.55)', lg: '0 20px 60px rgba(0,0,0,0.7)', spatialGlow: '0 0 35px rgba(56,189,248,0.22)' },
    radii: { sm: '4px', md: '8px', lg: '12px', xl: '16px', pill: '9999px' },
    componentDefaults: { buttonRadius: '10px', cardBorder: 'rgba(56, 189, 248, 0.2)', railBackground: '#0d1424' },
  },
];

export function getExperienceTheme(id: string): ExperienceTheme {
  return experienceThemes.find(theme => theme.id === id) ?? experienceThemes[0];
}

/**
 * Resolves a full ExperienceTheme by applying delta overrides over a base theme.
 * Enables clean multi-tier inheritance (Global -> Solution -> Page -> Scene).
 */
export function resolveThemeDefinition(
  baseThemeOrId: string | ExperienceTheme,
  override?: Partial<ExperienceTheme>
): ExperienceTheme {
  const base = typeof baseThemeOrId === 'string' ? getExperienceTheme(baseThemeOrId) : baseThemeOrId;
  if (!override) return base;

  return {
    ...base,
    ...override,
    typography: {
      ...base.typography,
      ...(override.typography ?? {}),
    },
    background: {
      ...base.background,
      ...(override.background ?? {}),
    },
    tokens: {
      ...base.tokens,
      ...(override.tokens ?? {}),
    },
    motionLanguage: override.motionLanguage || base.motionLanguage
      ? {
          curve: override.motionLanguage?.curve ?? base.motionLanguage?.curve ?? 'cubic-bezier(0.16, 1, 0.3, 1)',
          speed: override.motionLanguage?.speed ?? base.motionLanguage?.speed ?? 'balanced',
          feel: override.motionLanguage?.feel ?? base.motionLanguage?.feel ?? 'precise',
          durationMs: override.motionLanguage?.durationMs ?? base.motionLanguage?.durationMs ?? 280,
        }
      : undefined,
    surfaces: override.surfaces || base.surfaces
      ? {
          ...(base.surfaces ?? {}),
          ...(override.surfaces ?? {}),
        }
      : undefined,
    elevation: override.elevation || base.elevation
      ? {
          ...(base.elevation ?? { sm: '0 2px 8px rgba(0,0,0,0.2)', md: '0 8px 24px rgba(0,0,0,0.25)', lg: '0 20px 60px rgba(0,0,0,0.3)' }),
          ...(override.elevation ?? {}),
        }
      : undefined,
    radii: override.radii || base.radii
      ? {
          ...(base.radii ?? { sm: '6px', md: '10px', lg: '14px', xl: '20px', pill: '9999px' }),
          ...(override.radii ?? {}),
        }
      : undefined,
    spacing: override.spacing || base.spacing
      ? {
          ...(base.spacing ?? { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' }),
          ...(override.spacing ?? {}),
        }
      : undefined,
    componentDefaults: override.componentDefaults || base.componentDefaults
      ? {
          ...(base.componentDefaults ?? {}),
          ...(override.componentDefaults ?? {}),
        }
      : undefined,
  };
}
