'use client';

import React, { useState } from 'react';
import { Header } from '@/components/preview/Header';
import { UniverseStage } from '@/components/preview/UniverseStage';
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

export default function PreviewPage() {
  const { theme, clearIntent, setIntent } = useArchitectAny();
  const isDark = theme === 'dark';

  const [currentTab, setCurrentTab] = useState('Universe');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapModalPrefill, setMapModalPrefill] = useState<string | undefined>();

  const domains: Domain[] = (domainsData as unknown as Domain[]) || [];
  const subdomains: Subdomain[] = (subdomainsData as unknown as Subdomain[]) || [];
  const capabilities: Capability[] = (capabilitiesData as unknown as Capability[]) || [];
  const solutions: Solution[] = (solutionsData as unknown as Solution[]) || [];

  const activeSolution = selectedSolutionId
    ? solutions.find((s) => s.id === selectedSolutionId) || null
    : null;

  const handleSelectSolution = (solId: string) => {
    setSelectedSolutionId(solId);
    const sol = solutions.find((s) => s.id === solId);
    setIntent({
      solutionId: solId,
      ...(sol?.domainId ? { domainId: sol.domainId } : {}),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setSelectedSolutionId(null);
    clearIntent();
    setCurrentTab('Universe');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDomainFromRail = (domainId: string) => {
    setSelectedSolutionId(null);
    const dom = domains.find((d) => d.id === domainId);
    setIntent({
      domainId,
      subdomainId: null,
      capabilityId: null,
      solutionBundleId: null,
      solutionId: null,
      path: [{ id: domainId, name: dom?.name || domainId, layer: 1 }],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            handleGoHome();
          }
        }}
        onHome={handleGoHome}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectSolution={handleSelectSolution}
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
            onBackToUniverse={() => {
              setSelectedSolutionId(null);
              setIntent({ solutionId: null });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <UniverseStage
            searchQuery={searchQuery}
            onSelectSolution={handleSelectSolution}
          />
        )}
      </main>

      {/* 3. Left Contextual Navigation Rail (Compact Floating Tool) */}
      <ContextualNavigationRail
        domains={domains}
        subdomains={subdomains}
        selectedSolutionId={selectedSolutionId}
        onSelectDomain={handleSelectDomainFromRail}
        onResetRoot={handleGoHome}
      />

      {/* 4. Right Contextual Intelligence Rail (Compact Floating Tool) */}
      <ContextualIntelligenceRail
        domains={domains}
        subdomains={subdomains}
        capabilities={capabilities}
        solutions={solutions}
        selectedSolutionId={selectedSolutionId}
        activeSolution={activeSolution}
        onSelectDomain={handleSelectDomainFromRail}
        onSelectSolution={handleSelectSolution}
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
    </div>
  );
}
