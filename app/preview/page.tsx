'use client';

import React, { useState } from 'react';
import { Header } from '@/components/preview/Header';
import { UniverseStage } from '@/components/preview/UniverseStage';
import { IntentCoreHome } from '@/components/preview/IntentCoreHome';
import { SolutionDetail } from '@/components/preview/SolutionDetail';
import { Footer } from '@/components/preview/Footer';
import { SpatialMapModal } from '@/components/map/SpatialMapModal';
import { LocationPromptModal } from '@/components/location/LocationPromptModal';
import domainsData from '@/data/universe/domains.json';
import subdomainsData from '@/data/universe/subdomains.json';
import capabilitiesData from '@/data/universe/solution-capabilities.json';
import solutionsData from '@/data/universe/solutions.json';
import { Domain, Subdomain, Capability, Solution } from '@/src/types';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { ContextualNavigationRail } from '@/components/preview/ContextualNavigationRail';
import { ContextualIntelligenceRail } from '@/components/preview/ContextualIntelligenceRail';
import { CinematicJourneyOverlay } from '@/components/cinematic/CinematicJourneyOverlay';
import { useUniversalNavigation } from '@/src/context/UniversalNavigationContext';

export default function PreviewPage() {
  const { theme } = useArchitectAny();
  const {
    isIntentCoreActive,
    selectedSolutionId,
    intentCoreQuery,
    setIntentCoreQuery,
    navigateTo,
  } = useUniversalNavigation();

  const isDark = theme === 'dark';

  const [currentTab, setCurrentTab] = useState('Universe');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapModalPrefill, setMapModalPrefill] = useState<string | undefined>();

  const domains: Domain[] = (domainsData as unknown as Domain[]) || [];
  const subdomains: Subdomain[] = (subdomainsData as unknown as Subdomain[]) || [];
  const capabilities: Capability[] = (capabilitiesData as unknown as Capability[]) || [];
  const solutions: Solution[] = (solutionsData as unknown as Solution[]) || [];

  const activeSolution = selectedSolutionId
    ? solutions.find((s) => s.id === selectedSolutionId) || null
    : null;

  return (
    <div
      className={`font-sans min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#020914] text-[#eaf7ff] selection:bg-[#00e3fd] selection:text-[#001f24]'
          : 'bg-[#f1f5f9] text-slate-900 selection:bg-indigo-500 selection:text-white'
      }`}
    >
      {/* 1. ArchitectAny Production Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab === 'Universe') {
            navigateTo({ layer: 1 });
          }
        }}
        onHome={() => navigateTo({ layer: 1 })}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectSolution={(solId) => navigateTo({ layer: 5, solutionId: solId })}
        onSelectSearchResult={(res) => navigateTo({ type: 'search-result', result: res })}
        onOpenMapModal={(prefill) => {
          setMapModalPrefill(prefill);
          setIsMapModalOpen(true);
        }}
      />

      {/* 2. Main Solution Universe & Navigation Body */}
      <main className="flex-grow flex flex-col relative z-10 w-full overflow-x-hidden">
        {selectedSolutionId ? (
          <SolutionDetail
            solutionId={selectedSolutionId}
            solution={activeSolution}
            domains={domains}
            subdomains={subdomains}
            capabilities={capabilities}
            onBackToUniverse={() => navigateTo({ type: 'up-level' })}
          />
        ) : isIntentCoreActive ? (
          <IntentCoreHome
            domains={domains}
            subdomains={subdomains}
            capabilities={capabilities}
            solutions={solutions}
            initialQuery={intentCoreQuery}
            onReturnToUniverse={() => navigateTo({ layer: 1 })}
            onNavigateToDomain={(domainId) => navigateTo({ layer: 2, domainId })}
            onNavigateToSolution={(solId) => navigateTo({ layer: 5, solutionId: solId })}
          />
        ) : (
          <UniverseStage
            searchQuery={searchQuery}
            onSelectSolution={(solId) => navigateTo({ layer: 5, solutionId: solId })}
            onOpenIntentCore={(query) => {
              if (query) setIntentCoreQuery(query);
              navigateTo({ layer: 0, query });
            }}
          />
        )}
      </main>

      {/* 3. Left Contextual Navigation Rail (Compact Floating Tool) */}
      <ContextualNavigationRail
        domains={domains}
        subdomains={subdomains}
        selectedSolutionId={selectedSolutionId}
        onSelectDomain={(domainId) => navigateTo({ layer: 2, domainId })}
        onResetRoot={() => navigateTo({ layer: 1 })}
        onOpenIntentCore={() => navigateTo({ layer: 0 })}
      />

      {/* 4. Right Contextual Intelligence Rail (Compact Floating Tool) */}
      <ContextualIntelligenceRail
        domains={domains}
        subdomains={subdomains}
        capabilities={capabilities}
        solutions={solutions}
        selectedSolutionId={selectedSolutionId}
        activeSolution={activeSolution}
        onSelectDomain={(domainId) => navigateTo({ layer: 2, domainId })}
        onSelectSolution={(solId) => navigateTo({ layer: 5, solutionId: solId })}
      />

      {/* 5. ArchitectAny Platform Footer */}
      <Footer />

      {/* 6. Spatial GIS & Indian Service Map Modal */}
      <SpatialMapModal
        isOpen={isMapModalOpen}
        initialQuery={mapModalPrefill}
        onClose={() => setIsMapModalOpen(false)}
      />

      {/* 7. First-Interaction Location Intelligence Dialog */}
      <LocationPromptModal />

      {/* 8. AAi Cinematic Navigation Journey Spatial Overlay */}
      <CinematicJourneyOverlay />
    </div>
  );
}
