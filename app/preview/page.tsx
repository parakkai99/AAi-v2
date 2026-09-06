/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Context: M01 Solution Universe
 * Catalog Source: Canonical Capability Catalog
 * Status: ACTIVE
 * Version: 1.0.0
 */

"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/preview/Header";
import { UniverseStage } from "@/components/preview/UniverseStage";
import { IntentCoreHome } from "@/components/preview/IntentCoreHome";
import { SolutionDetail } from "@/components/preview/SolutionDetail";
import { Footer } from "@/components/preview/Footer";
import { SpatialMapModal } from "@/components/map/SpatialMapModal";
import { LocationPromptModal } from "@/components/location/LocationPromptModal";
import { ContextualNavigationRail } from "@/components/preview/ContextualNavigationRail";
import { ContextualIntelligenceRail } from "@/components/preview/ContextualIntelligenceRail";
import { CinematicJourneyOverlay } from "@/components/cinematic/CinematicJourneyOverlay";
import { useArchitectAny } from "@/src/context/ArchitectAnyContext";
import { useUniversalNavigation } from "@/src/context/UniversalNavigationContext";
import { catalogRepository } from "@/src/repositories/catalogRepository";
import type {
  DomainItem,
  SubdomainItem,
  CapabilityItem,
  SolutionItem,
} from "@/src/contracts/catalog";
import type { Domain, Subdomain, Capability, Solution } from "@/src/types";

export default function PreviewPage() {
  const { theme } = useArchitectAny();

  const {
    isIntentCoreActive,
    selectedSolutionId,
    intentCoreQuery,
    setIntentCoreQuery,
    navigateTo,
  } = useUniversalNavigation();

  const isDark = theme === "dark";

  const [currentTab, setCurrentTab] = useState("Universe");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapModalPrefill, setMapModalPrefill] = useState<string | undefined>();

  const [domains, setDomains] = useState<Domain[]>([]);
  const [subdomains, setSubdomains] = useState<Subdomain[]>([]);
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  useEffect(() => {
    let mounted = true;

    Promise.all([
      catalogRepository.getDomains(),
      catalogRepository.getSubdomains(),
      catalogRepository.getCapabilities(),
      catalogRepository.getSolutions(),
    ])
      .then(([domainItems, subdomainItems, capabilityItems, solutionItems]) => {
        if (!mounted) return;

        setDomains(
          domainItems.map(
            (item: DomainItem): Domain => ({
              id: item.id,
              key: item.id,
              name: item.name,
              description: item.description,
              color: item.color,
              visual: {
                color: item.color || item.accentColor,
              },
            }),
          ),
        );

        setSubdomains(
          subdomainItems.map(
            (item: SubdomainItem): Subdomain => ({
              id: item.id,
              domainId: item.domainId,
              name: item.name,
              description: item.description,
              capabilityCount: item.capabilityCount,
              solutionCount: item.solutionCount,
            }),
          ),
        );

        setCapabilities(
          capabilityItems.map(
            (item: CapabilityItem): Capability => ({
              id: item.id,
              domainId: item.domainId,
              subdomainId: item.subdomainId || undefined,
              name: item.name,
              description: item.description,
            }),
          ),
        );

        setSolutions(
          solutionItems.map(
            (item: SolutionItem): Solution => ({
              id: item.id,
              domainId: item.domainId,
              subdomainId: item.subdomainId || undefined,
              capabilityId: item.capabilityId || undefined,
              solutionBundleId: item.solutionBundleId || undefined,
              name: item.name,
              description: item.description,
              rating: item.rating,
              complexity: item.complexity,
              estimatedEffort: item.estimatedEffort,
              features: item.features,
              platformOptions: item.platformOptions,
              supportingDomains: item.supportingDomains,
              status: item.status,
            }),
          ),
        );
      })
      .catch(() => {
        if (!mounted) return;

        setDomains([]);
        setSubdomains([]);
        setCapabilities([]);
        setSolutions([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const activeSolution = selectedSolutionId
    ? solutions.find((solution) => solution.id === selectedSolutionId) || null
    : null;

  return (
    <div
      className={`font-sans min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300 ${
        isDark
          ? "bg-[#020914] text-[#eaf7ff] selection:bg-[#00e3fd] selection:text-[#001f24]"
          : "bg-[#f1f5f9] text-slate-900 selection:bg-indigo-500 selection:text-white"
      }`}
    >
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);

          if (tab === "Universe") {
            navigateTo({ layer: 1 });
          }
        }}
        onHome={() => navigateTo({ layer: 1 })}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectSolution={(solutionId) => navigateTo({ layer: 5, solutionId })}
        onOpenMapModal={(prefill) => {
          setMapModalPrefill(prefill);
          setIsMapModalOpen(true);
        }}
      />

      <main className="flex-grow flex flex-col relative z-10 w-full overflow-x-hidden">
        {selectedSolutionId ? (
          <SolutionDetail
            solutionId={selectedSolutionId}
            solution={activeSolution}
            domains={domains}
            subdomains={subdomains}
            capabilities={capabilities}
            onBackToUniverse={() => navigateTo({ type: "up-level" })}
          />
        ) : isIntentCoreActive ? (
          <IntentCoreHome
            domains={domains}
            subdomains={subdomains}
            capabilities={capabilities}
            solutions={solutions}
            initialQuery={intentCoreQuery}
            onReturnToUniverse={() => navigateTo({ layer: 1 })}
            onNavigateToDomain={(domainId) =>
              navigateTo({ layer: 2, domainId })
            }
            onNavigateToSolution={(solutionId) =>
              navigateTo({ layer: 5, solutionId })
            }
          />
        ) : (
          <UniverseStage
            searchQuery={searchQuery}
            onSelectSolution={(solutionId) =>
              navigateTo({ layer: 5, solutionId })
            }
            onOpenIntentCore={(query) => {
              if (query) {
                setIntentCoreQuery(query);
              }

              navigateTo({ layer: 0, query });
            }}
          />
        )}
      </main>

      <ContextualNavigationRail
        domains={domains}
        subdomains={subdomains}
        selectedSolutionId={selectedSolutionId}
        onSelectDomain={(domainId) => navigateTo({ layer: 2, domainId })}
        onResetRoot={() => navigateTo({ layer: 1 })}
      />

      <ContextualIntelligenceRail
        domains={domains}
        subdomains={subdomains}
        capabilities={capabilities}
        solutions={solutions}
        selectedSolutionId={selectedSolutionId}
        activeSolution={activeSolution}
        onSelectDomain={(domainId) => navigateTo({ layer: 2, domainId })}
        onSelectSolution={(solutionId) => navigateTo({ layer: 5, solutionId })}
      />

      <Footer />

      <SpatialMapModal
        isOpen={isMapModalOpen}
        initialQuery={mapModalPrefill}
        onClose={() => setIsMapModalOpen(false)}
      />

      <LocationPromptModal />

      <CinematicJourneyOverlay />
    </div>
  );
}
