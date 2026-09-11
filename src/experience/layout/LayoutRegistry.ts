/**
 * AAi Experience Layout Library
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-LAYOUT-001
 * Status: ACTIVE
 * Version: 1.1.0
 */

export type ExperienceRailPolicy = 'none' | 'left' | 'both';

export interface ExperienceLayout {
  id: string;
  name: string;
  drilldownLevels: 3 | 4 | 5;
  navigation: 'sidebar' | 'top' | 'hybrid' | 'cards';
  railPolicy: ExperienceRailPolicy;
  description: string;
  structure: string[];
}

export const experienceLayouts: ExperienceLayout[] = [
  { id:'drilldown-3', name:'3-Level Layout', drilldownLevels:3, navigation:'hybrid', railPolicy:'left', description:'Simple hierarchy for focused applications.', structure:['Home','Section','Page'] },
  { id:'drilldown-4', name:'4-Level Layout', drilldownLevels:4, navigation:'hybrid', railPolicy:'both', description:'Balanced navigation for growing applications.', structure:['Home','Section','Category','Page'] },
  { id:'drilldown-5', name:'5-Level Layout', drilldownLevels:5, navigation:'hybrid', railPolicy:'both', description:'Deep information architecture for large applications.', structure:['Home','Section','Category','Section','Page'] },
  { id:'sidebar', name:'Sidebar Layout', drilldownLevels:4, navigation:'sidebar', railPolicy:'left', description:'Persistent left navigation with drilldown.', structure:['Home','Section','Category','Page'] },
  { id:'top-navigation', name:'Top Navigation', drilldownLevels:4, navigation:'top', railPolicy:'none', description:'Horizontal navigation with dropdown drilldown.', structure:['Home','Section','Category','Page'] },
  { id:'card-grid', name:'Card Grid Layout', drilldownLevels:3, navigation:'cards', railPolicy:'none', description:'Visual card-based navigation for discovery.', structure:['Home','Collection','Page'] },
];

export function getExperienceLayout(id: string): ExperienceLayout {
  return experienceLayouts.find(layout => layout.id === id) ?? experienceLayouts[1];
}
