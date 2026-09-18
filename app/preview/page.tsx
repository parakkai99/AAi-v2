/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Context: M01 Solution Universe
 * Catalog Source: Canonical Capability Catalog
 * Status: ACTIVE
 * Version: 1.3.0
 */

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/preview/Header";
import { UniverseStage } from "@/components/preview/UniverseStage";
import { IntentCoreHome } from "@/components/preview/IntentCoreHome";
import { SolutionDetail } from "@/components/preview/SolutionDetail";
import { HyperlocalSolutionHome } from "@/components/preview/HyperlocalSolutionHome";
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
import { ApplicationRuntime } from "@/src/applications/ApplicationRuntime";
import { ExperienceRuntime, useExperienceRuntime } from "@/src/experience/ExperienceRuntime";
import { ExperienceShell } from "@/src/experience";
import { getSolutionExperienceDefinition } from "@/src/services/solutionAdminService";
import type { ExperienceDefinition } from "@/src/experience";
import { useArchitectAny } from "@/src/context/ArchitectAnyContext";
import { useUniversalNavigation } from "@/src/context/UniversalNavigationContext";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { catalogRepository } from "@/src/repositories/catalogRepository";
import type { DomainItem, SubdomainItem, CapabilityItem, SolutionItem } from "@/src/contracts/catalog";
import type { Domain, Subdomain, Capability, Solution } from "@/src/types";

type NavigateTo = ReturnType<typeof useUniversalNavigation>["navigateTo"];

interface ExperienceSurfaceProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onHome: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectSolution: (solutionId: string) => void;
  onOpenMapModal: (prefill?: string) => void;
  selectedSolutionId?: string | null;
  activeSolution: Solution | null;
  domains: Domain[];
  subdomains: Subdomain[];
  capabilities: Capability[];
  solutions: Solution[];
  isIntentCoreActive: boolean;
  intentCoreQuery: string;
  onSetIntentCoreQuery: (value: string) => void;
  navigateTo: NavigateTo;
}

function ExperienceSurface({
  currentTab,
  onTabChange,
  onHome,
  searchQuery,
  onSearchChange,
  onSelectSolution,
  onOpenMapModal,
  selectedSolutionId,
  activeSolution,
  domains,
  subdomains,
  capabilities,
  solutions,
  isIntentCoreActive,
  intentCoreQuery,
  onSetIntentCoreQuery,
  navigateTo,
}: ExperienceSurfaceProps) {
  const { currentWaypoint, canGoBack, canGoForward, goBack, goForward, goHome } = useUniversalNavigation();

  const handlePreviousNavigation = async () => {
    if (canGoBack) await goBack();
    else await goHome();
  };

  const handleNextNavigation = async () => {
    if (canGoForward) await goForward();
  };

  const { theme: experienceTheme, layout, definition } = useExperienceRuntime();

  const main = (
    <main className="flex-grow flex flex-col relative z-10 w-full overflow-x-hidden" style={{ color: experienceTheme.tokens.text }}>
      {currentWaypoint.layer >= 2 && currentWaypoint.layer <= 6 && (
        <div className="hidden md:flex w-full items-center justify-center px-4 py-1">
          <div className="flex items-center gap-1 rounded-xl border border-[#00dfff]/15 bg-[#02101e]/85 px-1 py-1 shadow-lg backdrop-blur-md">
            <button type="button" onClick={() => void handlePreviousNavigation()} className="inline-flex items-center gap-1 rounded-lg border border-[#00dfff]/20 px-2.5 py-1 text-[10px] font-mono text-[#9ec5de] transition hover:border-[#00e3fd]/60 hover:text-[#00e3fd]"><ArrowLeft className="h-3 w-3" />Back</button>
            <button type="button" onClick={() => void goHome()} className="inline-flex items-center gap-1 rounded-lg border border-[#00dfff]/20 px-2.5 py-1 text-[10px] font-mono text-[#9ec5de] transition hover:border-[#00e3fd]/60 hover:text-[#00e3fd]"><Home className="h-3 w-3" />Home</button>
            <button type="button" onClick={() => void handleNextNavigation()} disabled={!canGoForward} className="inline-flex items-center gap-1 rounded-lg border border-[#00dfff]/20 px-2.5 py-1 text-[10px] font-mono text-[#9ec5de] transition hover:border-[#00e3fd]/60 hover:text-[#00e3fd] disabled:cursor-not-allowed disabled:opacity-30">Forward<ArrowRight className="h-3 w-3" /></button>
            <span className="px-2 text-[9px] font-mono uppercase tracking-wider text-[#55758a]">L{currentWaypoint.layer}</span>
          </div>
        </div>
      )}

      {selectedSolutionId ? (
        selectedSolutionId === "D06.01.01.01.001" && activeSolution ? (
          <HyperlocalSolutionHome
            solution={activeSolution}
            onBackToUniverse={handlePreviousNavigation}
          />
        ) : (
          <SolutionDetail solutionId={selectedSolutionId} solution={activeSolution} domains={domains} subdomains={subdomains} capabilities={capabilities} onBackToUniverse={() => navigateTo({ type: "up-level" })} />
        )
      ) : isIntentCoreActive ? (
        <IntentCoreHome domains={domains} subdomains={subdomains} capabilities={capabilities} solutions={solutions} initialQuery={intentCoreQuery} onReturnToUniverse={() => navigateTo({ layer: 1 })} onNavigateToDomain={(domainId) => navigateTo({ layer: 2, domainId })} onNavigateToSolution={(solutionId) => navigateTo({ layer: 5, solutionId })} />
      ) : (
        <UniverseStage searchQuery={searchQuery} onSelectSolution={(solutionId) => navigateTo({ layer: 5, solutionId })} onOpenIntentCore={(query) => { if (query) onSetIntentCoreQuery(query); navigateTo({ layer: 0, query }); }} />
      )}
    </main>
  );

  return (
    <ExperienceShell
      layout={layout}
      definition={definition}
      header={<Header currentTab={currentTab} onTabChange={onTabChange} onHome={onHome} searchQuery={searchQuery} onSearchChange={onSearchChange} onSelectSolution={onSelectSolution} onOpenMapModal={onOpenMapModal} />}
      leftRail={<ContextualNavigationRail domains={domains} subdomains={subdomains} selectedSolutionId={selectedSolutionId} onSelectDomain={(domainId) => navigateTo({ layer: 2, domainId })} onResetRoot={() => navigateTo({ layer: 1 })} />}
      main={main}
      rightRail={<ContextualIntelligenceRail domains={domains} subdomains={subdomains} capabilities={capabilities} solutions={solutions} selectedSolutionId={selectedSolutionId} activeSolution={activeSolution} onSelectDomain={(domainId) => navigateTo({ layer: 2, domainId })} onSelectSolution={onSelectSolution} />}
      footer={<Footer />}
    />
  );
}

export default function PreviewPage() {
  const { theme } = useArchitectAny();
  const { isIntentCoreActive, selectedSolutionId, intentCoreQuery, setIntentCoreQuery, navigateTo } = useUniversalNavigation();
  const isDark = theme === "dark";

  const [previewDraft, setPreviewDraft] = useState(false);
  const [previewThemeId, setPreviewThemeId] = useState<string | undefined>();
  const [previewLayoutId, setPreviewLayoutId] = useState<string | undefined>();

  const [currentTab, setCurrentTab] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const app = params.get("app")?.toLowerCase();
      const tab = params.get("tab")?.toLowerCase();
      if (app === "ngliving" || tab === "ngliving") return "NGLiving";
      if (app === "parakkai" || tab === "parakkai" || params.get("project") === "P-PARAKKAI-001") return "Parakkai";
      if (tab === "universe") return "Universe";
      if (tab === "agentos") return "AgentOS";
    }
    return "Universe";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapModalPrefill, setMapModalPrefill] = useState<string | undefined>();
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [pendingIntentRef, setPendingIntentRef] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPreviewDraft(params.get("preview") === "1");
    setPreviewThemeId(params.get("theme") || undefined);
    setPreviewLayoutId(params.get("layout") || undefined);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasExplicitApp = Boolean(params.get("app") || params.get("tab") || params.get("project"));
    if (!hasExplicitApp && window.location.pathname === "/") {
      setCurrentTab("Universe");
      // Initialize the root Universe once on first mount only.
      // Do not depend on navigateTo here: its identity changes as navigation
      // state changes, and re-running this effect would reset every destination
      // back to L1 after each click/transition.
      void navigateTo({ layer: 1 }, { skipCinematic: true });
    }
    // Intentionally mount-only. Navigation state owns subsequent transitions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleToggleInspector = () => setIsInspectorOpen((prev) => !prev);
    const handleOpenInspector = () => setIsInspectorOpen(true);
    const handleCloseInspector = () => setIsInspectorOpen(false);
    const handleOpenParakkai = () => setCurrentTab("Parakkai");
    const handleSendToAgentOS = (e: Event) => { const customEvent = e as CustomEvent<{ referenceText?: string }>; setPendingIntentRef(customEvent.detail?.referenceText || ""); setCurrentTab("AgentOS"); setIsInspectorOpen(false); };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "O" || e.key === "o")) { const target = e.target as HTMLElement; if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return; e.preventDefault(); setCurrentTab((prev) => (prev === "AgentOS" ? "Universe" : "AgentOS")); }
      if (e.shiftKey && (e.key === "P" || e.key === "p")) { const target = e.target as HTMLElement; if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return; e.preventDefault(); setCurrentTab((prev) => (prev === "Parakkai" ? "Universe" : "Parakkai")); }
      if ((e.ctrlKey || e.metaKey) && (e.key === "j" || e.key === "J")) { e.preventDefault(); setIsInspectorOpen((prev) => !prev); }
    };
    const handleOpenWorkspaceDrawer = () => setCurrentTab("AgentOS");
    window.addEventListener("aai:toggle-json-inspector", handleToggleInspector);
    window.addEventListener("aai:open-json-inspector", handleOpenInspector);
    window.addEventListener("aai:close-json-inspector", handleCloseInspector);
    window.addEventListener("aai:open-parakkai", handleOpenParakkai);
    window.addEventListener("aai:send-to-agent-os", handleSendToAgentOS);
    window.addEventListener("aai:open-workspace-drawer", handleOpenWorkspaceDrawer);
    window.addEventListener("keydown", handleKeyDown);
    return () => { window.removeEventListener("aai:toggle-json-inspector", handleToggleInspector); window.removeEventListener("aai:open-json-inspector", handleOpenInspector); window.removeEventListener("aai:close-json-inspector", handleCloseInspector); window.removeEventListener("aai:open-parakkai", handleOpenParakkai); window.removeEventListener("aai:send-to-agent-os", handleSendToAgentOS); window.removeEventListener("aai:open-workspace-drawer", handleOpenWorkspaceDrawer); window.removeEventListener("keydown", handleKeyDown); };
  }, []);

  const [domains, setDomains] = useState<Domain[]>([]);
  const [subdomains, setSubdomains] = useState<Subdomain[]>([]);
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  useEffect(() => {
    let mounted = true;
    Promise.all([catalogRepository.getDomains(), catalogRepository.getSubdomains(), catalogRepository.getCapabilities(), catalogRepository.getSolutions()])
      .then(([domainItems, subdomainItems, capabilityItems, solutionItems]) => {
        if (!mounted) return;
        setDomains(domainItems.map((item: DomainItem): Domain => ({ id: item.id, key: item.id, name: item.name, description: item.description, color: item.color, visual: { color: item.color || item.accentColor } })));
        setSubdomains(subdomainItems.map((item: SubdomainItem): Subdomain => ({ id: item.id, domainId: item.domainId, name: item.name, description: item.description, capabilityCount: item.capabilityCount, solutionCount: item.solutionCount })));
        setCapabilities(capabilityItems.map((item: CapabilityItem): Capability => ({ id: item.id, domainId: item.domainId, subdomainId: item.subdomainId || undefined, name: item.name, description: item.description })));
        setSolutions(solutionItems.map((item: SolutionItem): Solution => ({ id: item.id, domainId: item.domainId, subdomainId: item.subdomainId || undefined, capabilityId: item.capabilityId || undefined, solutionBundleId: item.solutionBundleId || undefined, name: item.name, description: item.description, rating: item.rating, complexity: item.complexity, estimatedEffort: item.estimatedEffort, features: item.features, platformOptions: item.platformOptions, supportingDomains: item.supportingDomains, status: item.status })));
      })
      .catch(() => { if (!mounted) return; setDomains([]); setSubdomains([]); setCapabilities([]); setSolutions([]); });
    return () => { mounted = false; };
  }, []);

  const activeSolution = selectedSolutionId ? solutions.find((solution) => solution.id === selectedSolutionId) || null : null;

  const universeExperienceDefinition = useMemo<ExperienceDefinition>(() => ({
    id: "aai-universe", scope: "universe", version: "2",
    identity: { displayName: "ArchitectAny", tagline: "Solution Universe" },
    context: { languageProfileRef: "universal-language", locationProfileRef: "universal-location" },
    search: { intentProfileRef: "universal-intent", enabled: true, placeholder: "What do you want to create, find, analyse or shape?" },
    appStack: { modelStackRef: "universal-solution-models", enabled: true },
    navigation: {
      leftRail: { profileRef: "universal-navigation", expandOn: "hover", collapsed: true },
      rightRail: { profileRef: "universal-intelligence", expandOn: "hover", collapsed: true },
      topNavigation: { profileRef: "universal-top-shell", expandOn: "click", collapsed: false },
    },
    themeId: "aai-live", layoutId: "aai-live", compositionId: "universe-default", behaviorProfileId: "universe-default",
    infrastructure: { authProfileRef: "universe-default-auth", dataProfileRef: "universe-catalog", storeProfileRef: "universe-default-store", assetLibraryRef: "universe-default-assets", integrationProfileRef: "universe-default-integrations" },
  }), [isDark]);

  const selectedSolutionExperienceDefinition = useMemo(() => selectedSolutionId ? getSolutionExperienceDefinition(selectedSolutionId) : undefined, [selectedSolutionId]);

  const applicationView = (
    <ErrorBoundary fallbackTitle="Application Experience">
      <ApplicationRuntime applicationId={currentTab === "NGLiving" ? "ngliving" : currentTab === "JiLink" ? "jilink" : "parakkai"} previewDraft={previewDraft} previewThemeId={previewThemeId} previewLayoutId={previewLayoutId} onExitToAAi={() => setCurrentTab("Universe")} />
    </ErrorBoundary>
  );

  const universeView = (
    <ExperienceRuntime applicationId={selectedSolutionId ?? "aai-universe"} scope={selectedSolutionId ? "solution" : "universe"} definition={selectedSolutionExperienceDefinition} parentDefinitions={[universeExperienceDefinition]} defaultThemeId="aai-live" defaultLayoutId="aai-live">
      <ExperienceSurface currentTab={currentTab} onTabChange={(tab) => { setCurrentTab(tab); if (tab === "Universe") navigateTo({ layer: 1 }); }} onHome={() => navigateTo({ layer: 1 })} searchQuery={searchQuery} onSearchChange={setSearchQuery} onSelectSolution={(solutionId) => navigateTo({ layer: 5, solutionId })} onOpenMapModal={(prefill) => { setMapModalPrefill(prefill); setIsMapModalOpen(true); }} selectedSolutionId={selectedSolutionId} activeSolution={activeSolution} domains={domains} subdomains={subdomains} capabilities={capabilities} solutions={solutions} isIntentCoreActive={isIntentCoreActive} intentCoreQuery={intentCoreQuery} onSetIntentCoreQuery={setIntentCoreQuery} navigateTo={navigateTo} />
    </ExperienceRuntime>
  );

  return (
    <div
      className="font-sans min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300"
      style={{
        background: 'var(--aai-bg)',
        color: 'var(--aai-text)',
      }}
    >
      {currentTab === "AgentOS" ? (
        <ErrorBoundary fallbackTitle="Agent OS Command Center"><AgentOSCommandCenter onReturnToUniverse={() => setCurrentTab("Universe")} initialIntentRef={pendingIntentRef} onClearInitialIntentRef={() => setPendingIntentRef(null)} /></ErrorBoundary>
      ) : currentTab === "Parakkai" || currentTab === "NGLiving" || currentTab === "JiLink" ? applicationView : universeView}
      <SpatialMapModal isOpen={isMapModalOpen} initialQuery={mapModalPrefill} onClose={() => setIsMapModalOpen(false)} />
      <LocationPromptModal />
      <CinematicJourneyOverlay />
      <CatalogInspector isOpen={isInspectorOpen} onClose={() => setIsInspectorOpen(false)} onSendToAgentOS={(ref) => { setPendingIntentRef(ref); setCurrentTab("AgentOS"); setIsInspectorOpen(false); }} />
    </div>
  );
}
