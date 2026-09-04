import React, { useState, useEffect, useMemo } from 'react';
import { Domain, Subdomain, Capability, Solution } from '@/src/types';
import {
  DomainItem,
  SubdomainItem,
  CapabilityItem,
  SolutionBundleItem,
  SolutionItem,
} from '@/src/contracts/catalog';
import { catalogRepository } from '@/src/repositories/catalogRepository';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import {
  Layers,
  Cpu,
  Boxes,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Filter,
  RefreshCw,
  FolderTree,
  ChevronUp,
  Tag,
  ShieldCheck,
  Zap,
  LayoutGrid,
  List,
  ChevronDown,
} from 'lucide-react';
import { CapabilityCard } from './CapabilityCard';
import { L2BusinessWorldsStepper } from './L2BusinessWorldsStepper';
import { DomainContextBanner } from './DomainContextBanner';
import { NextLevelBundlesPanel } from './NextLevelBundlesPanel';
import { AboutBusinessWorldPanel } from './AboutBusinessWorldPanel';
import { ThemeToggle } from '../theme/ThemeToggle';

export interface SolutionRailProps {
  domains: Domain[];
  selectedDomain: Domain | null;
  subdomains: Subdomain[];
  capabilities: Capability[];
  solutions: Solution[];
  onSelectDomain: (domainId: string) => void;
  onSelectSolution: (solutionId: string) => void;
}

export const SolutionRail: React.FC<SolutionRailProps> = ({
  domains,
  selectedDomain,
  subdomains,
  capabilities,
  solutions,
  onSelectDomain,
  onSelectSolution,
}) => {
  const { intent, setIntent, getDomainName, getDomainDesc, theme } = useArchitectAny();
  const isDark = theme === 'dark';

  // 5-Layer Drill-Down State
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedSubdomain, setSelectedSubdomain] = useState<SubdomainItem | null>(null);
  const [selectedCapability, setSelectedCapability] = useState<CapabilityItem | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<SolutionBundleItem | null>(null);
  const [hoveredCapability, setHoveredCapability] = useState<CapabilityItem | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');

  // Loaded Catalog Data for Current Active Branch
  const [allCatalogDomains, setAllCatalogDomains] = useState<DomainItem[]>([]);
  const [catalogSubdomains, setCatalogSubdomains] = useState<SubdomainItem[]>([]);
  const [catalogCapabilities, setCatalogCapabilities] = useState<CapabilityItem[]>([]);
  const [catalogBundles, setCatalogBundles] = useState<SolutionBundleItem[]>([]);
  const [catalogSolutions, setCatalogSolutions] = useState<SolutionItem[]>([]);

  // View style toggle for L3
  const [viewStyle, setViewStyle] = useState<'cards' | 'grid' | 'list'>('cards');

  // Load all canonical domains on mount
  useEffect(() => {
    let isMounted = true;
    catalogRepository.getDomains().then((res) => {
      if (isMounted) setAllCatalogDomains(res);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Reset or initialize drill-down when domain changes
  useEffect(() => {
    if (!selectedDomain) return;

    const intentMatchesThisDomain = intent.domainId === selectedDomain.id && Boolean(intent.subdomainId);
    const currentSubdomainMatches = Boolean(
      selectedSubdomain &&
      (selectedSubdomain.domainId === selectedDomain.id || selectedSubdomain.parentId === selectedDomain.id)
    );

    if (!intentMatchesThisDomain && !currentSubdomainMatches) {
      setActiveLayer(1);
      setSelectedSubdomain(null);
      setSelectedCapability(null);
      setSelectedBundle(null);
      setSelectedPlatform('ALL');
    }

    // Load subdomains & solutions for domain
    catalogRepository.getSubdomains(selectedDomain.id).then((subs) => {
      setCatalogSubdomains(subs);
    });
    catalogRepository.getSolutions(undefined, selectedDomain.id).then((sols) => {
      setCatalogSolutions(sols);
    });
  }, [selectedDomain?.id]);

  // Synchronize 5-layer drill-down state from global intent (e.g. from Search or external intent triggers)
  useEffect(() => {
    if (!selectedDomain) return;

    if (intent.subdomainId) {
      catalogRepository.getItemById(intent.subdomainId).then((sub) => {
        if (sub && (sub.domainId === selectedDomain.id || sub.parentId === selectedDomain.id)) {
          setSelectedSubdomain(sub as SubdomainItem);
          setActiveLayer(2);

          if (intent.capabilityId) {
            catalogRepository.getItemById(intent.capabilityId).then((cap) => {
              if (cap && (cap.domainId === selectedDomain.id || cap.parentId === sub.id)) {
                setSelectedCapability(cap as CapabilityItem);
                setActiveLayer(3);

                if (intent.solutionBundleId) {
                  catalogRepository.getItemById(intent.solutionBundleId).then((bun) => {
                    if (bun && (bun.domainId === selectedDomain.id || bun.parentId === cap.id)) {
                      setSelectedBundle(bun as SolutionBundleItem);
                      setActiveLayer(4);
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }, [intent.subdomainId, intent.capabilityId, intent.solutionBundleId, selectedDomain?.id]);

  // Load capabilities when subdomain is selected
  useEffect(() => {
    if (selectedSubdomain) {
      catalogRepository.getCapabilities(selectedSubdomain.id).then((caps) => {
        setCatalogCapabilities(caps);
      });
    } else {
      setCatalogCapabilities([]);
    }
  }, [selectedSubdomain?.id]);

  // Load bundles when capability is selected
  useEffect(() => {
    if (selectedCapability) {
      catalogRepository.getSolutionBundles(selectedCapability.id).then((bundles) => {
        setCatalogBundles(bundles);
      });
    } else {
      setCatalogBundles([]);
    }
  }, [selectedCapability?.id]);

  // Load solutions when bundle is selected
  useEffect(() => {
    if (selectedBundle) {
      catalogRepository.getSolutions(selectedBundle.id).then((sols) => {
        setCatalogSolutions(sols);
      });
    } else if (selectedDomain) {
      catalogRepository.getSolutions(undefined, selectedDomain.id).then((sols) => {
        setCatalogSolutions(sols);
      });
    }
  }, [selectedBundle?.id, selectedDomain?.id]);

  if (!selectedDomain) return null;

  // Active domain item from catalog if available, or construct standard item
  const activeCatalogDomain: DomainItem =
    allCatalogDomains.find((d) => d.id === selectedDomain.id) || {
      id: selectedDomain.id,
      name: selectedDomain.name,
      description: selectedDomain.description,
      type: 'DOMAIN',
      layer: 1,
      parentId: null,
      domainId: selectedDomain.id,
      path: [{ id: selectedDomain.id, name: selectedDomain.name, layer: 1, type: 'DOMAIN' }],
      keywords: [],
      status: 'active',
      color: selectedDomain.visual?.color || '#00dfff',
    };

  // Drill-down handlers
  const handleSelectSubdomain = (sub: SubdomainItem) => {
    setSelectedSubdomain(sub);
    setSelectedCapability(null);
    setSelectedBundle(null);
    setActiveLayer(2);
    setIntent({
      subdomainId: sub.id,
      capabilityId: null,
      solutionBundleId: null,
      solutionId: null,
      path: [
        { id: selectedDomain.id, name: selectedDomain.name, layer: 1 },
        { id: sub.id, name: sub.name, layer: 2 },
      ],
    });
  };

  const handleSelectCapability = (cap: CapabilityItem) => {
    setSelectedCapability(cap);
    setSelectedBundle(null);
    setActiveLayer(3);
    setIntent({
      capabilityId: cap.id,
      solutionBundleId: null,
      solutionId: null,
      path: [
        { id: selectedDomain.id, name: selectedDomain.name, layer: 1 },
        { id: selectedSubdomain?.id || '', name: selectedSubdomain?.name || '', layer: 2 },
        { id: cap.id, name: cap.name, layer: 3 },
      ],
    });
  };

  const handleSelectBundle = (bundle: SolutionBundleItem) => {
    setSelectedBundle(bundle);
    setActiveLayer(4);
    setIntent({
      solutionBundleId: bundle.id,
      solutionId: null,
      path: [
        { id: selectedDomain.id, name: selectedDomain.name, layer: 1 },
        { id: selectedSubdomain?.id || '', name: selectedSubdomain?.name || '', layer: 2 },
        { id: selectedCapability?.id || '', name: selectedCapability?.name || '', layer: 3 },
        { id: bundle.id, name: bundle.name, layer: 4 },
      ],
    });
  };

  const handleStepUp = () => {
    if (activeLayer === 4) {
      setSelectedBundle(null);
      setActiveLayer(3);
      setIntent({
        solutionBundleId: null,
        solutionId: null,
        path: [
          { id: selectedDomain.id, name: selectedDomain.name, layer: 1 },
          { id: selectedSubdomain?.id || '', name: selectedSubdomain?.name || '', layer: 2 },
          { id: selectedCapability?.id || '', name: selectedCapability?.name || '', layer: 3 },
        ],
      });
    } else if (activeLayer === 3) {
      setSelectedCapability(null);
      setActiveLayer(2);
      setIntent({
        capabilityId: null,
        solutionBundleId: null,
        solutionId: null,
        path: [
          { id: selectedDomain.id, name: selectedDomain.name, layer: 1 },
          { id: selectedSubdomain?.id || '', name: selectedSubdomain?.name || '', layer: 2 },
        ],
      });
    } else if (activeLayer === 2) {
      setSelectedSubdomain(null);
      setActiveLayer(1);
      setIntent({
        subdomainId: null,
        capabilityId: null,
        solutionBundleId: null,
        solutionId: null,
        path: [{ id: selectedDomain.id, name: selectedDomain.name, layer: 1 }],
      });
    }
  };

  const handleResetToDomain = () => {
    setSelectedSubdomain(null);
    setSelectedCapability(null);
    setSelectedBundle(null);
    setActiveLayer(1);
    setIntent({
      subdomainId: null,
      capabilityId: null,
      solutionBundleId: null,
      solutionId: null,
      path: [{ id: selectedDomain.id, name: selectedDomain.name, layer: 1 }],
    });
  };

  // Filter solutions by selected platform adapter
  const filteredSolutions = useMemo(() => {
    if (selectedPlatform === 'ALL') return catalogSolutions;
    return catalogSolutions.filter((sol) =>
      sol.platformOptions?.some((p) => p.toLowerCase().includes(selectedPlatform.toLowerCase())),
    );
  }, [catalogSolutions, selectedPlatform]);

  const availablePlatforms = ['ALL', 'Shopify', 'Zoho Commerce', 'Magento / Adobe Commerce', 'OpenCart'];

  return (
    <section
      role="region"
      aria-label="5-Layer Solution Discovery Experience"
      className="relative z-30 w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 my-4 transition-colors duration-300 ease-out"
    >
      {/* Top Controls: Theme Switch Indicator matching L2-Ok.png */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 ${
              isDark ? 'text-[#82a5bb]' : 'text-slate-600'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#00dfff]' : 'text-indigo-600'}`} />
            <span>5-Layer Solution Discovery</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`hidden sm:inline-block text-[11px] font-mono ${
              isDark ? 'text-[#6e9bb3]' : 'text-slate-500'
            }`}
          >
            Theme switch:
          </span>
          <ThemeToggle variant="pill" />
        </div>
      </div>

      {/* Main Container Card */}
      <div
        key={selectedDomain.id}
        className={`relative overflow-hidden rounded-3xl p-4 sm:p-6 transition-all duration-300 border ${
          isDark
            ? 'bg-[#020914]/95 border-[#00dfff]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(0,227,253,0.12)] backdrop-blur-2xl text-white'
            : 'bg-[#f8fafc] border-slate-200 shadow-xl text-slate-900'
        }`}
      >
        {/* 1. L2 Business Worlds Stepper Carousel */}
        <div className="mb-4">
          <L2BusinessWorldsStepper
            domains={allCatalogDomains.length > 0 ? allCatalogDomains : (domains as unknown as DomainItem[])}
            activeDomainId={selectedDomain.id}
            theme={theme}
            onSelectDomain={(d) => onSelectDomain(d.id)}
          />
        </div>

        {/* 2. Active Domain Context Card & Breadcrumbs */}
        <div className="mb-5">
          <DomainContextBanner
            domain={activeCatalogDomain}
            subdomain={selectedSubdomain}
            capability={selectedCapability}
            bundle={selectedBundle}
            theme={theme}
            onUpLevel={handleStepUp}
            onResetRoot={handleResetToDomain}
            onSelectDomainCrumb={handleResetToDomain}
            onSelectSubdomainCrumb={() => {
              setSelectedCapability(null);
              setSelectedBundle(null);
              setActiveLayer(2);
            }}
            onSelectCapabilityCrumb={() => {
              setSelectedBundle(null);
              setActiveLayer(3);
            }}
          />
        </div>

        {/* 3. DYNAMIC LAYER EXPERIENCES */}

        {/* =========================================================================
            LAYER 2: MODERN L2 → L3 CAPABILITY DISCOVERY (Matching L2-Ok.png)
           ========================================================================= */}
        {activeLayer === 2 && selectedSubdomain && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT / MAIN COLUMN: L3 Capabilities Discovery Cards */}
            <div className="lg:col-span-8 flex flex-col">
              {/* Header: Title & View Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5">
                <div className="flex items-center gap-2">
                  <h3
                    className={`font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark ? 'text-[#eaf7ff]' : 'text-slate-900'
                    }`}
                  >
                    <Layers className={`w-4 h-4 ${isDark ? 'text-[#00dfff]' : 'text-indigo-600'}`} />
                    <span>
                      L3 CAPABILITIES IN {selectedSubdomain.id} {selectedSubdomain.name.toUpperCase()} ({catalogCapabilities.length})
                    </span>
                  </h3>
                </div>

                {/* View as controls matching reference */}
                <div className="flex items-center gap-1 self-end sm:self-auto">
                  <span
                    className={`text-[11px] font-mono mr-1 ${
                      isDark ? 'text-[#6e9bb3]' : 'text-slate-500'
                    }`}
                  >
                    View as:
                  </span>
                  <div
                    className={`flex items-center p-0.5 rounded-lg border text-xs font-mono ${
                      isDark
                        ? 'bg-[#03182b] border-[#00dfff]/20 text-[#82a5bb]'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setViewStyle('cards')}
                      className={`p-1 rounded flex items-center gap-1 cursor-pointer transition-colors ${
                        viewStyle === 'cards'
                          ? isDark
                            ? 'bg-[#00dfff] text-[#020914] font-bold'
                            : 'bg-indigo-600 text-white font-bold'
                          : ''
                      }`}
                      title="Cards View"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[10px]">Cards</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewStyle('list')}
                      className={`p-1 rounded flex items-center gap-1 cursor-pointer transition-colors ${
                        viewStyle === 'list'
                          ? isDark
                            ? 'bg-[#00dfff] text-[#020914] font-bold'
                            : 'bg-indigo-600 text-white font-bold'
                          : ''
                      }`}
                      title="List View"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Responsive Horizontal Scroll / Multi-column Grid for L3 Cards */}
              <div className="overflow-x-auto pb-3 pt-1 -mx-1 px-1 no-scrollbar">
                <div className="flex flex-row gap-4 min-w-max">
                  {catalogCapabilities.map((cap, idx) => (
                    <CapabilityCard
                      key={cap.id}
                      capability={cap}
                      theme={theme}
                      domainColor={selectedDomain.visual?.color || '#00dfff'}
                      index={idx}
                      isSelected={selectedCapability?.id === cap.id}
                      onSelect={handleSelectCapability}
                      onHover={setHoveredCapability}
                    />
                  ))}
                </div>
              </div>

              {catalogCapabilities.length === 0 && (
                <div
                  className={`py-12 text-center text-xs font-mono rounded-2xl border border-dashed ${
                    isDark
                      ? 'text-[#6e9bb3] border-[#00dfff]/20 bg-[#020d18]/50'
                      : 'text-slate-500 border-slate-300 bg-white'
                  }`}
                >
                  No dedicated capability nodes under this subdomain.
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Next Level L4 Bundles & About Business World */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* 1. Next Level L4 Bundles Panel */}
              <NextLevelBundlesPanel
                subdomain={selectedSubdomain}
                capabilities={catalogCapabilities}
                activeCapability={hoveredCapability || selectedCapability}
                theme={theme}
                onSelectBundle={handleSelectBundle}
                onViewAll={() => {
                  if (catalogCapabilities.length > 0) {
                    handleSelectCapability(catalogCapabilities[0]);
                  }
                }}
              />

              {/* 2. About This Business World Panel */}
              <AboutBusinessWorldPanel
                domain={activeCatalogDomain}
                subdomain={selectedSubdomain}
                theme={theme}
                onExploreL3Details={() => {
                  if (catalogCapabilities.length > 0) {
                    handleSelectCapability(catalogCapabilities[0]);
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            LAYER 3: SOLUTION BUNDLES IN SELECTED CAPABILITY
           ========================================================================= */}
        {activeLayer === 3 && selectedCapability && (
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span
                className={`text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                  isDark ? 'text-[#82a5bb]' : 'text-slate-700'
                }`}
              >
                <Boxes className={`w-4 h-4 ${isDark ? 'text-[#00dfff]' : 'text-indigo-600'}`} />
                <span>
                  Layer 4 Solution Bundles in {selectedCapability.id} {selectedCapability.name} ({catalogBundles.length}):
                </span>
              </span>
              <span
                className={`text-xs font-mono ${
                  isDark ? 'text-[#00dfff]' : 'text-indigo-600 font-semibold'
                }`}
              >
                Click bundle to inspect canonical solutions →
              </span>
            </div>

            {/* Bundle Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {catalogBundles.map((bundle) => (
                <button
                  key={bundle.id}
                  onClick={() => handleSelectBundle(bundle)}
                  className={`group flex flex-col justify-between p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                    isDark
                      ? 'bg-[#03182b]/85 hover:bg-[#042542] border-[#00dfff]/25 hover:border-[#00e3fd] shadow-sm hover:shadow-[0_0_22px_rgba(0,227,253,0.3)] hover:scale-[1.01]'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md hover:scale-[1.01]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md border ${
                          isDark
                            ? 'bg-[#00dfff]/15 text-[#00dfff] border-[#00dfff]/30'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}
                      >
                        {bundle.id}
                      </span>
                      <div
                        className={`flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-md ${
                          isDark
                            ? 'text-[#00dfff] bg-[#00dfff]/10'
                            : 'text-indigo-700 bg-indigo-50'
                        }`}
                      >
                        <span>L4 Bundle</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <strong
                      className={`text-sm sm:text-base font-bold transition-colors block mb-1.5 ${
                        isDark
                          ? 'text-[#eaf7ff] group-hover:text-[#00e3fd]'
                          : 'text-slate-900 group-hover:text-indigo-600'
                      }`}
                    >
                      {bundle.name}
                    </strong>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-[#82a5bb]' : 'text-slate-600'
                      }`}
                    >
                      {bundle.description}
                    </p>
                  </div>

                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono font-bold ${
                      isDark
                        ? 'border-[#00dfff]/15 text-[#00dfff]'
                        : 'border-slate-100 text-indigo-600'
                    }`}
                  >
                    <span>Inspect Solutions (L5)</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore Solutions →
                    </span>
                  </div>
                </button>
              ))}

              {catalogBundles.length === 0 && (
                <div
                  className={`col-span-full py-8 text-center text-xs font-mono rounded-2xl border border-dashed ${
                    isDark
                      ? 'text-[#6e9bb3] bg-[#020d18]/50 border-[#00dfff]/15'
                      : 'text-slate-500 bg-white border-slate-300'
                  }`}
                >
                  No solution bundles created under this capability yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            LAYER 4 & LAYER 1: SOLUTIONS GRID / SUBDOMAINS GRID
           ========================================================================= */}
        {activeLayer === 4 && (
          <div className="mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
              <span
                className={`text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                  isDark ? 'text-[#82a5bb]' : 'text-slate-700'
                }`}
              >
                <Boxes className={`w-4 h-4 ${isDark ? 'text-[#00dfff]' : 'text-indigo-600'}`} />
                <span>
                  {selectedBundle
                    ? `Layer 5 Solutions in ${selectedBundle.name} (${filteredSolutions.length})`
                    : `Solutions in Domain (${filteredSolutions.length}):`}
                </span>
              </span>

              {/* Platform Adapter Filter Pills */}
              <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
                <span
                  className={`mr-1 flex items-center gap-1 ${
                    isDark ? 'text-[#55798c]' : 'text-slate-500'
                  }`}
                >
                  <Filter className={`w-3 h-3 ${isDark ? 'text-[#00dfff]' : 'text-indigo-600'}`} /> Platform:
                </span>
                {availablePlatforms.map((plat) => (
                  <button
                    key={plat}
                    onClick={() => setSelectedPlatform(plat)}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-xs font-mono ${
                      selectedPlatform === plat
                        ? isDark
                          ? 'bg-[#00dfff] text-[#020914] font-bold shadow-[0_0_10px_rgba(0,227,253,0.4)]'
                          : 'bg-indigo-600 text-white font-bold shadow-sm'
                        : isDark
                          ? 'bg-[#02101e] text-[#82a5bb] hover:text-[#00e3fd] border border-[#00dfff]/15'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </div>

            {/* Solutions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredSolutions.map((sol) => (
                <button
                  key={sol.id}
                  onClick={() => onSelectSolution(sol.id)}
                  className={`group flex flex-col justify-between p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                    isDark
                      ? 'bg-[#03182b]/85 hover:bg-[#042542] border-[#00dfff]/20 hover:border-[#00e3fd] shadow-sm hover:shadow-[0_0_20px_rgba(0,227,253,0.3)] hover:scale-[1.01]'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md hover:scale-[1.01]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md border ${
                          isDark
                            ? 'bg-[#00dfff]/10 text-[#00dfff] border-[#00dfff]/20'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}
                      >
                        {sol.id}
                      </span>
                      {sol.rating && (
                        <span className="text-xs font-mono text-amber-500 font-bold flex items-center gap-0.5">
                          ★ {sol.rating}
                        </span>
                      )}
                    </div>
                    <strong
                      className={`text-sm font-bold transition-colors block mb-1 ${
                        isDark
                          ? 'text-[#eaf7ff] group-hover:text-[#00e3fd]'
                          : 'text-slate-900 group-hover:text-indigo-600'
                      }`}
                    >
                      {sol.name}
                    </strong>
                    <p
                      className={`text-xs line-clamp-2 leading-relaxed ${
                        isDark ? 'text-[#82a5bb]' : 'text-slate-600'
                      }`}
                    >
                      {sol.description}
                    </p>

                    {/* Platform Tags */}
                    {sol.platformOptions && sol.platformOptions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {sol.platformOptions.map((plat) => (
                          <span
                            key={plat}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                              isDark
                                ? 'bg-[#02101e] text-[#9bd5e8] border-[#00dfff]/20'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {plat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className={`mt-3 pt-2.5 border-t flex items-center justify-between text-xs font-mono font-bold ${
                      isDark
                        ? 'border-[#00dfff]/10 text-[#00dfff]'
                        : 'border-slate-100 text-indigo-600'
                    }`}
                  >
                    <span className={isDark ? 'text-[#6e9bb3]' : 'text-slate-500'}>
                      Layer 5 Canonical Solution
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Inspect Solution →
                    </span>
                  </div>
                </button>
              ))}

              {filteredSolutions.length === 0 && (
                <div
                  className={`col-span-full py-8 text-center text-xs font-mono rounded-2xl border border-dashed ${
                    isDark
                      ? 'text-[#6e9bb3] bg-[#020d18]/50 border-[#00dfff]/15'
                      : 'text-slate-500 bg-white border-slate-300'
                  }`}
                >
                  No solutions found matching the selected platform filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            LAYER 1: SUBDOMAINS GRID (Root view of Domain)
           ========================================================================= */}
        {activeLayer === 1 && (
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span
                className={`text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                  isDark ? 'text-[#82a5bb]' : 'text-slate-700'
                }`}
              >
                <Layers className={`w-4 h-4 ${isDark ? 'text-[#00dfff]' : 'text-indigo-600'}`} />
                <span>
                  Layer 2 Subdomains in {selectedDomain.id} {selectedDomain.name} ({catalogSubdomains.length}):
                </span>
              </span>
              <span
                className={`text-xs font-mono ${
                  isDark ? 'text-[#00dfff]' : 'text-indigo-600 font-semibold'
                }`}
              >
                Select subdomain to explore L3 Capabilities →
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {catalogSubdomains.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubdomain(sub)}
                  className={`group flex flex-col justify-between p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                    isDark
                      ? 'bg-[#03182b]/85 hover:bg-[#042542] border-[#00dfff]/20 hover:border-[#00e3fd] shadow-sm hover:shadow-[0_0_20px_rgba(0,227,253,0.3)] hover:scale-[1.01]'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md hover:scale-[1.01]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md border ${
                          isDark
                            ? 'bg-[#00dfff]/15 text-[#00dfff] border-[#00dfff]/30'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}
                      >
                        {sub.id}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                          isDark ? 'text-[#00dfff]' : 'text-indigo-600'
                        }`}
                      />
                    </div>
                    <strong
                      className={`text-base font-bold transition-colors block mb-1.5 ${
                        isDark
                          ? 'text-[#eaf7ff] group-hover:text-[#00e3fd]'
                          : 'text-slate-900 group-hover:text-indigo-600'
                      }`}
                    >
                      {sub.name}
                    </strong>
                    <p
                      className={`text-xs leading-relaxed line-clamp-2 ${
                        isDark ? 'text-[#82a5bb]' : 'text-slate-600'
                      }`}
                    >
                      {sub.description}
                    </p>
                  </div>

                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono font-bold ${
                      isDark
                        ? 'border-[#00dfff]/15 text-[#00dfff]'
                        : 'border-slate-100 text-indigo-600'
                    }`}
                  >
                    <span>Drill into Layer 3</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore Capabilities →
                    </span>
                  </div>
                </button>
              ))}

              {catalogSubdomains.length === 0 && (
                <div
                  className={`col-span-full py-8 text-center text-xs font-mono rounded-2xl border border-dashed ${
                    isDark
                      ? 'text-[#6e9bb3] bg-[#020d18]/50 border-[#00dfff]/15'
                      : 'text-slate-500 bg-white border-slate-300'
                  }`}
                >
                  No subdomains found under this domain.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
