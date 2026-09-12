/**
 * AAi Experience Layout Library
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-LAYOUT-001
 * Status: ACTIVE
 * Version: 1.2.0
 */

export type ExperienceRailPolicy = 'none' | 'left' | 'both';
export type ExperienceLayoutRegion = 'header' | 'left' | 'main' | 'right' | 'footer';

export interface ExperienceRegionBehavior {
  sticky?: boolean;
  collapsible?: boolean;
  floating?: boolean;
  overlay?: boolean;
  defaultCollapsed?: boolean;
  width?: string;
  zIndex?: number;
}

export interface ExperienceLayout {
  id: string;
  name: string;
  drilldownLevels: 3 | 4 | 5;
  navigation: 'sidebar' | 'top' | 'hybrid' | 'cards';
  railPolicy: ExperienceRailPolicy;
  description: string;
  structure: string[];
  regions: readonly ExperienceLayoutRegion[];
  density?: 'compact' | 'balanced' | 'spacious';
  regionBehaviors?: Partial<Record<ExperienceLayoutRegion, ExperienceRegionBehavior>>;
}

export const experienceLayouts: ExperienceLayout[] = [
  {
    id: 'aai-live',
    name: 'AAi Live — Header / Main / Footer',
    drilldownLevels: 3,
    navigation: 'top',
    railPolicy: 'none',
    description: 'Canonical ArchitectAny starting frame. Clean top header, full main workspace and footer.',
    structure: ['Header', 'Main', 'Footer'],
    regions: ['header', 'main', 'footer'],
    density: 'balanced',
    regionBehaviors: {
      header: { sticky: true, zIndex: 50 },
      main: { width: '100%' },
      footer: { sticky: false },
    },
  },
  {
    id: 'aai-live-left',
    name: 'AAi Live — Left Navigation',
    drilldownLevels: 4,
    navigation: 'sidebar',
    railPolicy: 'left',
    description: 'AAi Live with a persistent contextual left navigation rail.',
    structure: ['Header', 'Left', 'Main', 'Footer'],
    regions: ['header', 'left', 'main', 'footer'],
    density: 'balanced',
    regionBehaviors: {
      header: { sticky: true, zIndex: 50 },
      left: { sticky: true, collapsible: true, width: '260px', zIndex: 40 },
      main: { width: '100%' },
      footer: { sticky: false },
    },
  },
  {
    id: 'aai-live-full',
    name: 'AAi Live — Full Workspace',
    drilldownLevels: 5,
    navigation: 'hybrid',
    railPolicy: 'both',
    description: 'AAi Live full workspace with contextual left and intelligence right rails.',
    structure: ['Header', 'Left', 'Main', 'Right', 'Footer'],
    regions: ['header', 'left', 'main', 'right', 'footer'],
    density: 'balanced',
    regionBehaviors: {
      header: { sticky: true, zIndex: 50 },
      left: { sticky: true, collapsible: true, width: '260px', zIndex: 40 },
      right: { sticky: true, collapsible: true, width: '300px', zIndex: 40 },
      main: { width: '100%' },
      footer: { sticky: false },
    },
  },
  {
    id: 'drilldown-3',
    name: '3-Level Layout',
    drilldownLevels: 3,
    navigation: 'hybrid',
    railPolicy: 'left',
    description: 'Simple hierarchy for focused applications.',
    structure: ['Home', 'Section', 'Page'],
    regions: ['header', 'left', 'main', 'footer'],
    density: 'compact',
    regionBehaviors: {
      header: { sticky: true },
      left: { sticky: true, collapsible: true, width: '240px' },
    },
  },
  {
    id: 'drilldown-4',
    name: '4-Level Layout',
    drilldownLevels: 4,
    navigation: 'hybrid',
    railPolicy: 'both',
    description: 'Balanced navigation for growing applications.',
    structure: ['Home', 'Section', 'Category', 'Page'],
    regions: ['header', 'left', 'main', 'right', 'footer'],
    density: 'balanced',
    regionBehaviors: {
      header: { sticky: true },
      left: { sticky: true, collapsible: true, width: '260px' },
      right: { sticky: true, collapsible: true, width: '280px' },
    },
  },
  {
    id: 'drilldown-5',
    name: '5-Level Layout',
    drilldownLevels: 5,
    navigation: 'hybrid',
    railPolicy: 'both',
    description: 'Deep information architecture for large applications.',
    structure: ['Home', 'Section', 'Category', 'Section', 'Page'],
    regions: ['header', 'left', 'main', 'right', 'footer'],
    density: 'spacious',
    regionBehaviors: {
      header: { sticky: true },
      left: { sticky: true, collapsible: true, width: '280px' },
      right: { sticky: true, collapsible: true, width: '320px' },
    },
  },
  {
    id: 'sidebar',
    name: 'Sidebar Layout',
    drilldownLevels: 4,
    navigation: 'sidebar',
    railPolicy: 'left',
    description: 'Persistent left navigation with drilldown.',
    structure: ['Home', 'Section', 'Category', 'Page'],
    regions: ['header', 'left', 'main', 'footer'],
    density: 'balanced',
    regionBehaviors: {
      header: { sticky: true },
      left: { sticky: true, collapsible: true, width: '260px' },
    },
  },
  {
    id: 'top-navigation',
    name: 'Top Navigation',
    drilldownLevels: 4,
    navigation: 'top',
    railPolicy: 'none',
    description: 'Horizontal navigation with dropdown drilldown.',
    structure: ['Home', 'Section', 'Category', 'Page'],
    regions: ['header', 'main', 'footer'],
    density: 'balanced',
    regionBehaviors: {
      header: { sticky: true },
    },
  },
  {
    id: 'card-grid',
    name: 'Card Grid Layout',
    drilldownLevels: 3,
    navigation: 'cards',
    railPolicy: 'none',
    description: 'Visual card-based navigation for discovery.',
    structure: ['Home', 'Collection', 'Page'],
    regions: ['header', 'main', 'footer'],
    density: 'spacious',
    regionBehaviors: {
      header: { sticky: true },
    },
  },
  {
    id: 'split-stage',
    name: 'Interactive Split Stage',
    drilldownLevels: 4,
    navigation: 'hybrid',
    railPolicy: 'both',
    description: 'Split workspace with left discovery rail, central focus stage, and right inspector panel.',
    structure: ['Header', 'Left Rail', 'Stage', 'Right Inspector', 'Footer'],
    regions: ['header', 'left', 'main', 'right', 'footer'],
    density: 'balanced',
    regionBehaviors: {
      header: { sticky: true },
      left: { sticky: true, collapsible: true, width: '260px' },
      right: { sticky: true, collapsible: true, width: '320px' },
    },
  },
];

export function getExperienceLayout(id: string): ExperienceLayout {
  return experienceLayouts.find(layout => layout.id === id) ?? experienceLayouts[0];
}

/**
 * Resolves a full ExperienceLayout by applying delta overrides over a base layout.
 */
export function resolveLayoutDefinition(
  baseLayoutOrId: string | ExperienceLayout,
  override?: Partial<ExperienceLayout>
): ExperienceLayout {
  const base = typeof baseLayoutOrId === 'string' ? getExperienceLayout(baseLayoutOrId) : baseLayoutOrId;
  if (!override) return base;

  return {
    ...base,
    ...override,
    structure: override.structure ?? base.structure,
    regions: override.regions ?? base.regions,
    regionBehaviors: {
      ...(base.regionBehaviors ?? {}),
      ...(override.regionBehaviors ?? {}),
    },
  };
}
