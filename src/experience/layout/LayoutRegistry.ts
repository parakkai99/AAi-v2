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

export interface ExperienceLayout {
  id: string;
  name: string;
  drilldownLevels: 3 | 4 | 5;
  navigation: 'sidebar' | 'top' | 'hybrid' | 'cards';
  railPolicy: ExperienceRailPolicy;
  description: string;
  structure: string[];
  regions: readonly ExperienceLayoutRegion[];
}

export const experienceLayouts: ExperienceLayout[] = [
  {
    id:'aai-live',
    name:'AAi Live — Header / Main / Footer',
    drilldownLevels:3,
    navigation:'top',
    railPolicy:'none',
    description:'Canonical ArchitectAny starting frame. Clean top header, full main workspace and footer.',
    structure:['Header','Main','Footer'],
    regions:['header','main','footer'],
  },
  {
    id:'aai-live-left',
    name:'AAi Live — Left Navigation',
    drilldownLevels:4,
    navigation:'sidebar',
    railPolicy:'left',
    description:'AAi Live with a persistent contextual left navigation rail.',
    structure:['Header','Left','Main','Footer'],
    regions:['header','left','main','footer'],
  },
  {
    id:'aai-live-full',
    name:'AAi Live — Full Workspace',
    drilldownLevels:5,
    navigation:'hybrid',
    railPolicy:'both',
    description:'AAi Live full workspace with contextual left and intelligence right rails.',
    structure:['Header','Left','Main','Right','Footer'],
    regions:['header','left','main','right','footer'],
  },
  {
    id:'drilldown-3',
    name:'3-Level Layout',
    drilldownLevels:3,
    navigation:'hybrid',
    railPolicy:'left',
    description:'Simple hierarchy for focused applications.',
    structure:['Home','Section','Page'],
    regions:['header','left','main','footer'],
  },
  {
    id:'drilldown-4',
    name:'4-Level Layout',
    drilldownLevels:4,
    navigation:'hybrid',
    railPolicy:'both',
    description:'Balanced navigation for growing applications.',
    structure:['Home','Section','Category','Page'],
    regions:['header','left','main','right','footer'],
  },
  {
    id:'drilldown-5',
    name:'5-Level Layout',
    drilldownLevels:5,
    navigation:'hybrid',
    railPolicy:'both',
    description:'Deep information architecture for large applications.',
    structure:['Home','Section','Category','Section','Page'],
    regions:['header','left','main','right','footer'],
  },
  {
    id:'sidebar',
    name:'Sidebar Layout',
    drilldownLevels:4,
    navigation:'sidebar',
    railPolicy:'left',
    description:'Persistent left navigation with drilldown.',
    structure:['Home','Section','Category','Page'],
    regions:['header','left','main','footer'],
  },
  {
    id:'top-navigation',
    name:'Top Navigation',
    drilldownLevels:4,
    navigation:'top',
    railPolicy:'none',
    description:'Horizontal navigation with dropdown drilldown.',
    structure:['Home','Section','Category','Page'],
    regions:['header','main','footer'],
  },
  {
    id:'card-grid',
    name:'Card Grid Layout',
    drilldownLevels:3,
    navigation:'cards',
    railPolicy:'none',
    description:'Visual card-based navigation for discovery.',
    structure:['Home','Collection','Page'],
    regions:['header','main','footer'],
  },
];

export function getExperienceLayout(id: string): ExperienceLayout {
  return experienceLayouts.find(layout => layout.id === id) ?? experienceLayouts[0];
}
