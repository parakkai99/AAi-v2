import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Compass,
  Check,
  X,
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
  onResetToRoot?: () => void;
}

export const SolutionRail: React.FC<SolutionRailProps> = ({
  domains,
  selectedDomain,
  subdomains,
  capabilities,
  solutions,
  onSelectDomain,
  onSelectSolution,
  onResetToRoot,
}) => {
  const { intent, setIntent, clearIntent, getDomainName, getDomainDesc, theme } = useArchitectAny();
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
      if (subs.length > 0) {
        const targetSub = intent.subdomainId
          ? subs.find((s) => s.id === intent.subdomainId)
          : null;
        const subToSelect = targetSub || subs[0];
        if (subToSelect) {
          setSelectedSubdomain(subToSelect);
          setActiveLayer(2);
        }
      }
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

  const handleResetToRoot = () => {
    if (onResetToRoot) {
      onResetToRoot();
    } else {
      clearIntent();
    }
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
    } else if (activeLayer === 2 || activeLayer === 1) {
      handleResetToRoot();
    }
  };

  const handleResetToDomain = () => {
    setSelectedCapability(null);
    setSelectedBundle(null);
    if (catalogSubdomains.length > 0) {
      setSelectedSubdomain(catalogSubdomains[0]);
      setActiveLayer(2);
      setIntent({
        subdomainId: catalogSubdomains[0].id,
        capabilityId: null,
        solutionBundleId: null,
        solutionId: null,
        path: [
          { id: selectedDomain.id, name: selectedDomain.name, layer: 1 },
          { id: catalogSubdomains[0].id, name: catalogSubdomains[0].name, layer: 2 },
        ],
      });
    } else {
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

  // Filter solutions by selected platform adapter
  const filteredSolutions = useMemo(() => {
    if (selectedPlatform === 'ALL') return catalogSolutions;
    return catalogSolutions.filter((sol) =>
      sol.platformOptions?.some((p) => p.toLowerCase().includes(selectedPlatform.toLowerCase())),
    );
  }, [catalogSolutions, selectedPlatform]);

  const availablePlatforms = ['ALL', 'Shopify', 'Zoho Commerce', 'Magento / Adobe Commerce', 'OpenCart'];
  const [isPlatformMenuOpen, setIsPlatformMenuOpen] = useState(false);
  const platformMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (platformMenuRef.current && !platformMenuRef.current.contains(e.target as Node)) {
        setIsPlatformMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full flex flex-col transition-colors duration-300">
      {/* 1. Sticky Navigation Context Banner */}
      <div className="sticky top-0 z-40 w-full">
        <DomainContextBanner
          domain={activeCatalogDomain}
          subdomain={selectedSubdomain}
          subdomains={catalogSubdomains}
          onSelectSubdomain={handleSelectSubdomain}
          capability={selectedCapability}
          bundle={selectedBundle}
          allDomains={allCatalogDomains.length > 0 ? allCatalogDomains : (domains as unknown as DomainItem[])}
          onSelectDomain={(d) => onSelectDomain(d.id)}
          theme={theme}
          onUpLevel={handleStepUp}
          onResetRoot={handleResetToRoot}
          onSelectRootCrumb={handleResetToRoot}
          onSelectDomainCrumb={handleResetToDomain}
          onSelectSubdomainCrumb={() => {
            setSelectedCapability(null);
            setSelectedBundle(null);
            setActiveLayer(2);
            if (selectedSubdomain) {
              setIntent({
                subdomainId: selectedSubdomain.id,
                capabilityId: null,
                solutionBundleId: null,
                solutionId: null,
                path: [
                  { id: selectedDomain.id, name: selectedDomain.name, layer: 1 },
                  { id: selectedSubdomain.id, name: selectedSubdomain.name, layer: 2 },
                ],
              });
            }
          }}
          onSelectCapabilityCrumb={() => {
            setSelectedBundle(null);
            setActiveLayer(3);
            if (selectedSubdomain && selectedCapability) {
              setIntent({
                capabilityId: selectedCapability.id,
                solutionBundleId: null,
                solutionId: null,
                path: [
                  { id: selectedDomain.id, name: selectedDomain.name, layer: 1 },
                  { id: selectedSubdomain.id, name: selectedSubdomain.name, layer: 2 },
                  { id: selectedCapability.id, name: selectedCapability.name, layer: 3 },
                ],
              });
            }
          }}
        />
      </div>

      {/* Main Content Area: Natural, unconstrained vertical flow directly beneath sticky compass banner */}
      <section
        role="region"
        aria-label="5-Layer Solution Discovery Experience"
        className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 pt-3 pb-10 transition-colors duration-300 ease-out"
      >
        {/* Main Discovery Card (Natural vertical growth, flush layout) */}
        <div
          key={selectedDomain.id}
          className={`relative rounded-3xl p-4 sm:p-6 transition-all duration-300 border ${
            isDark
              ? 'bg-[#020914]/95 border-[#00dfff]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(0,227,253,0.12)] backdrop-blur-2xl text-white'
              : 'bg-[#f8fafc] border-slate-200 shadow-xl text-slate-900'
          }`}
        >

        {/* 3. DYNAMIC LAYER EXPERIENCES */}

        {/* =========================================================================
            LAYER 2: MODERN L2 → L3 CAPABILITY DISCOVERY (Responsive Vertical Flow)
           ========================================================================= */}
        {activeLayer === 2 && selectedSubdomain && (
          <div className="flex flex-col gap-6">
            {/* L3 Capability Cards Section (Flowing Vertically and Responsively) */}
            <div className="flex flex-col">
              {/* Header: Title & View Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        isDark ? 'text-[#f8fafc]' : 'text-slate-900'
                      }`}
                    >
                      <Layers className={`w-4 h-4 ${isDark ? 'text-[#00dfff]' : 'text-indigo-600'}`} />
                      <span>
                        L3 CAPABILITIES IN {selectedSubdomain.name.toUpperCase()} ({catalogCapabilities.length})
                      </span>
                    </h3>
                  </div>
                  {selectedSubdomain.description && (
                    <p className={`text-xs max-w-3xl line-clamp-1 ${isDark ? 'text-[#9ec5de]' : 'text-slate-600'}`}>
                      {selectedSubdomain.description}
                    </p>
                  )}
                </div>

                {/* View as controls */}
                <div className="flex items-center gap-1 self-end sm:self-auto">
                  <span
                    className={`text-[11px] font-mono mr-1 ${
                      isDark ? 'text-[#9ec5de]' : 'text-slate-600'
                    }`}
                  >
                    View as:
                  </span>
                  <div
                    className={`flex items-center p-0.5 rounded-lg border text-xs font-mono ${
                      isDark
                        ? 'bg-[#03182b] border-[#00dfff]/20 text-[#9ec5de]'
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

              {/* Responsive Vertical Flow Grid / List for L3 Cards (No Horizontal Scroll) */}
              <div
                className={
                  viewStyle === 'cards'
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'
                    : 'flex flex-col gap-3 w-full'
                }
              >
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

            {/* L4 Solution Bundle Preview Panel */}
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

            {/* About Business World Panel */}
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

              {/* Contextual Platform Adapter Filter: On-demand compact popover */}
              <div ref={platformMenuRef} className="relative inline-flex items-center text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setIsPlatformMenuOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    selectedPlatform !== 'ALL'
                      ? isDark
                        ? 'bg-[#00dfff]/20 text-[#00dfff] border-[#00dfff]/60 font-bold shadow-[0_0_10px_rgba(0,223,255,0.3)]'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-300 font-bold shadow-xs'
                      : isDark
                        ? 'bg-[#02101e] text-[#9ec5de] hover:text-[#00e3fd] border-[#00dfff]/20'
                        : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200'
                  }`}
                  aria-expanded={isPlatformMenuOpen}
                >
                  <Filter className="w-3 h-3 text-[#00dfff]" />
                  <span>Platform: {selectedPlatform === 'ALL' ? 'All Adapters' : selectedPlatform}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isPlatformMenuOpen ? 'rotate-180 text-[#00dfff]' : 'opacity-70'
                    }`}
                  />
                </button>

                {selectedPlatform !== 'ALL' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlatform('ALL');
                    }}
                    className={`ml-1.5 p-1 rounded-md transition-colors cursor-pointer ${
                      isDark ? 'hover:bg-[#031d36] text-[#9ec5de] hover:text-white' : 'hover:bg-slate-200 text-slate-500'
                    }`}
                    title="Clear filter (Show All)"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}

                {isPlatformMenuOpen && (
                  <div
                    className={`absolute right-0 top-full mt-1.5 w-56 rounded-xl p-1.5 z-50 shadow-2xl border ${
                      isDark
                        ? 'bg-[#031122]/98 backdrop-blur-2xl border-[#00e3fd]/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)] text-[#eaf7ff]'
                        : 'bg-white/98 backdrop-blur-2xl border-slate-200 shadow-xl text-slate-900'
                    }`}
                  >
                    <div className="px-2 py-1 mb-1 border-b border-inherit text-[10px] font-mono text-[#9ec5de] uppercase tracking-wider">
                      Platform Adapter
                    </div>
                    <div className="space-y-0.5">
                      {availablePlatforms.map((plat) => {
                        const isCurrent = selectedPlatform === plat;
                        return (
                          <button
                            key={plat}
                            type="button"
                            onClick={() => {
                              setSelectedPlatform(plat);
                              setIsPlatformMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-all cursor-pointer ${
                              isCurrent
                                ? isDark
                                  ? 'bg-[#00e3fd]/20 text-[#00e3fd] font-bold border border-[#00e3fd]/40'
                                  : 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                                : isDark
                                  ? 'text-[#c3d9ea] hover:text-white hover:bg-[#05213b]'
                                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            <span>{plat === 'ALL' ? 'All Adapters' : plat}</span>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-[#00e3fd]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
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
  </div>
  );
};
