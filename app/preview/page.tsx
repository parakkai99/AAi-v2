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
import { AgentOSCommandCenter } from "@/components/agent-os/AgentOSCommandCenter";
import { CatalogInspector } from "@/components/preview/CatalogInspector";
import { AAiJsonStickyTrigger } from "@/components/common/AAiJsonStickyTrigger";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { ParakkaiApp } from "@/parakkai/components/ParakkaiApp";
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

  const [currentTab, setCurrentTab] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab")?.toLowerCase() === "universe") return "Universe";
      if (params.get("tab")?.toLowerCase() === "agentos") return "AgentOS";
      if (params.get("tab")?.toLowerCase() === "parakkai" || params.get("project") === "P-PARAKKAI-001") return "Parakkai";
    }
    return "Parakkai";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapModalPrefill, setMapModalPrefill] = useState<string | undefined>();
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [pendingIntentRef, setPendingIntentRef] = useState<string | null>(null);

  // Global listeners for AAi JSON / Data Map Inspector & Agent OS Bridge & Parakkai Project
  useEffect(() => {
    const handleToggleInspector = () => setIsInspectorOpen((prev) => !prev);
    const handleOpenInspector = () => setIsInspectorOpen(true);
    const handleCloseInspector = () => setIsInspectorOpen(false);
    const handleOpenParakkai = () => setCurrentTab("Parakkai");
    const handleSendToAgentOS = (e: Event) => {
      const customEvent = e as CustomEvent<{ referenceText?: string }>;
      const ref = customEvent.detail?.referenceText || "";
      setPendingIntentRef(ref);
      setCurrentTab("AgentOS");
      setIsInspectorOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'O' || e.key === 'o')) {
        const target = e.target as HTMLElement;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
          return;
        }
        e.preventDefault();
        setCurrentTab((prev) => (prev === 'AgentOS' ? 'Universe' : 'AgentOS'));
      }
      if (e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        const target = e.target as HTMLElement;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
          return;
        }
        e.preventDefault();
        setCurrentTab((prev) => (prev === 'Parakkai' ? 'Universe' : 'Parakkai'));
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
        setIsInspectorOpen((prev) => !prev);
      }
    };

    const handleOpenWorkspaceDrawer = () => {
      setCurrentTab("AgentOS");
    };

    window.addEventListener("aai:toggle-json-inspector", handleToggleInspector);
    window.addEventListener("aai:open-json-inspector", handleOpenInspector);
    window.addEventListener("aai:close-json-inspector", handleCloseInspector);
    window.addEventListener("aai:open-parakkai", handleOpenParakkai);
    window.addEventListener("aai:send-to-agent-os", handleSendToAgentOS);
    window.addEventListener("aai:open-workspace-drawer", handleOpenWorkspaceDrawer);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener("aai:toggle-json-inspector", handleToggleInspector);
      window.removeEventListener("aai:open-json-inspector", handleOpenInspector);
      window.removeEventListener("aai:close-json-inspector", handleCloseInspector);
      window.removeEventListener("aai:open-parakkai", handleOpenParakkai);
      window.removeEventListener("aai:send-to-agent-os", handleSendToAgentOS);
      window.removeEventListener("aai:open-workspace-drawer", handleOpenWorkspaceDrawer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
      {currentTab === "AgentOS" ? (
        <ErrorBoundary fallbackTitle="Agent OS Command Center">
          <AgentOSCommandCenter
            onReturnToUniverse={() => setCurrentTab("Universe")}
            initialIntentRef={pendingIntentRef}
            onClearInitialIntentRef={() => setPendingIntentRef(null)}
          />
        </ErrorBoundary>
      ) : currentTab === "Parakkai" ? (
        <ErrorBoundary fallbackTitle="Parakkai Temple Digital Experience">
          <ParakkaiApp onExitToAAi={() => setCurrentTab("Universe")} />
        </ErrorBoundary>
      ) : (
        <>
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
        </>
      )}

      <SpatialMapModal
        isOpen={isMapModalOpen}
        initialQuery={mapModalPrefill}
        onClose={() => setIsMapModalOpen(false)}
      />

      <LocationPromptModal />

      <CinematicJourneyOverlay />

      {/* Global AAi JSON & Data Map Inspector (Persistent across Universe & Agent OS) */}
      <CatalogInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        onSendToAgentOS={(ref) => {
          setPendingIntentRef(ref);
          setCurrentTab("AgentOS");
          setIsInspectorOpen(false);
        }}
      />

      {/* Global Sticky Floating Trigger Symbol (Accessible on All Screens) */}
      <AAiJsonStickyTrigger
        isInspectorOpen={isInspectorOpen}
        onToggle={() => setIsInspectorOpen((prev) => !prev)}
      />
    </div>
  );
}
