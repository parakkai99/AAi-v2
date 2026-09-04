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
} from 'lucide-react';

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
  const { intent, setIntent, getDomainName, getDomainDesc, t } = useArchitectAny();

  // 5-Layer Drill-Down State
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedSubdomain, setSelectedSubdomain] = useState<SubdomainItem | null>(null);
  const [selectedCapability, setSelectedCapability] = useState<CapabilityItem | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<SolutionBundleItem | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');

  // Loaded Catalog Data for Current Active Branch
  const [catalogSubdomains, setCatalogSubdomains] = useState<SubdomainItem[]>([]);
  const [catalogCapabilities, setCatalogCapabilities] = useState<CapabilityItem[]>([]);
  const [catalogBundles, setCatalogBundles] = useState<SolutionBundleItem[]>([]);
  const [catalogSolutions, setCatalogSolutions] = useState<SolutionItem[]>([]);

  // Reset drill-down when domain changes (if not guided by a matching intent)
  useEffect(() => {
    if (!selectedDomain) return;
    
    // Check if the current drill-down belongs to this domain or if intent is explicitly targeting a child of this domain
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

  const domainId = selectedDomain.id;
  const color = selectedDomain.visual?.color || '#00e3fd';
  const translatedDomainName = getDomainName(selectedDomain.id, selectedDomain.name);
  const translatedDomainDesc = getDomainDesc(selectedDomain.id, selectedDomain.description);

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
      aria-label="5-Layer Solution Universe Navigator"
      className="relative z-30 w-full max-w-6xl mx-auto px-4 sm:px-6 my-4 transition-all duration-300 ease-out"
    >
      <div
        key={selectedDomain.id}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#021425]/95 to-[#010a14]/95 border-2 border-[#00dfff]/40 p-4 sm:p-5 shadow-[0_15px_45px_rgba(0,0,0,0.7),0_0_35px_rgba(0,227,253,0.15)] backdrop-blur-xl"
      >
        {/* Layer 1: Domain Header & Canonical Breadcrumb Trail */}
        <div className="flex flex-col gap-3 pb-3 border-b border-[#00dfff]/15">
          {/* Top Row: Domain Badge, Name, and Status */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="px-2.5 py-1 rounded-lg font-mono text-xs font-black tracking-wider text-black shrink-0 shadow-[0_0_16px_rgba(0,227,253,0.6)] animate-pulse"
                style={{ backgroundColor: color }}
              >
                {selectedDomain.id}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#eaf7ff] tracking-tight">
                    {translatedDomainName}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00dfff]/15 text-[#00e3fd] border border-[#00dfff]/40 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#00e3fd]" />
                    <span>Layer {activeLayer}: {activeLayer === 1 ? 'Domain' : activeLayer === 2 ? 'Subdomain' : activeLayer === 3 ? 'Capability' : activeLayer === 4 ? 'Bundle' : 'Solution'}</span>
                  </span>
                </div>
                <p className="text-xs text-[#82a5bb] line-clamp-1 max-w-xl">
                  {translatedDomainDesc}
                </p>
              </div>
            </div>

            {/* Navigation Actions: Step Up / Reset to Universe */}
            <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
              {activeLayer > 1 && (
                <button
                  onClick={handleStepUp}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#031c33] hover:bg-[#052b4f] border border-[#00dfff]/30 hover:border-[#00e3fd] text-xs font-mono text-[#00dfff] hover:text-white transition-all cursor-pointer shadow-sm"
                  title="Step Up 1 Layer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Up 1 Level</span>
                </button>
              )}
              {activeLayer > 1 && (
                <button
                  onClick={handleResetToDomain}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#02101e] hover:bg-[#031d33] border border-[#00dfff]/20 hover:border-[#00dfff]/50 text-xs font-mono text-[#82a5bb] hover:text-[#00e3fd] transition-all cursor-pointer"
                  title="Reset to Domain Root"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Root</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive 5-Layer Breadcrumbs Trail */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono bg-[#010c18]/80 p-2 rounded-xl border border-[#00dfff]/15">
            <span className="text-[10px] uppercase tracking-wider text-[#55798c] flex items-center gap-1 mr-1">
              <FolderTree className="w-3.5 h-3.5 text-[#00dfff]" />
              <span>Path:</span>
            </span>

            {/* L1: Domain Breadcrumb */}
            <button
              onClick={handleResetToDomain}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-bold ${
                activeLayer === 1
                  ? 'bg-[#00dfff] text-[#020914] shadow-[0_0_10px_rgba(0,227,253,0.3)]'
                  : 'bg-[#031a2e] text-[#9bd5e8] hover:bg-[#052745] hover:text-white border border-[#00dfff]/20'
              }`}
            >
              {selectedDomain.id} {selectedDomain.name}
            </button>

            {/* L2: Subdomain Breadcrumb */}
            {selectedSubdomain && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[#55798c]" />
                <button
                  onClick={() => {
                    setSelectedCapability(null);
                    setSelectedBundle(null);
                    setActiveLayer(2);
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
                  }}
                  className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-bold ${
                    activeLayer === 2
                      ? 'bg-[#00dfff] text-[#020914] shadow-[0_0_10px_rgba(0,227,253,0.3)]'
                      : 'bg-[#031a2e] text-[#9bd5e8] hover:bg-[#052745] hover:text-white border border-[#00dfff]/20'
                  }`}
                >
                  {selectedSubdomain.id} {selectedSubdomain.name}
                </button>
              </>
            )}

            {/* L3: Capability Breadcrumb */}
            {selectedCapability && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[#55798c]" />
                <button
                  onClick={() => {
                    setSelectedBundle(null);
                    setActiveLayer(3);
                    setIntent({
                      capabilityId: selectedCapability.id,
                      solutionBundleId: null,
                      solutionId: null,
                      path: [
                        { id: selectedDomain.id, name: selectedDomain.name, layer: 1 },
                        { id: selectedSubdomain?.id || '', name: selectedSubdomain?.name || '', layer: 2 },
                        { id: selectedCapability.id, name: selectedCapability.name, layer: 3 },
                      ],
                    });
                  }}
                  className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-bold ${
                    activeLayer === 3
                      ? 'bg-[#00dfff] text-[#020914] shadow-[0_0_10px_rgba(0,227,253,0.3)]'
                      : 'bg-[#031a2e] text-[#9bd5e8] hover:bg-[#052745] hover:text-white border border-[#00dfff]/20'
                  }`}
                >
                  {selectedCapability.id} {selectedCapability.name}
                </button>
              </>
            )}

            {/* L4: Solution Bundle Breadcrumb */}
            {selectedBundle && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[#55798c]" />
                <button
                  onClick={() => {
                    setActiveLayer(4);
                    setIntent({
                      solutionBundleId: selectedBundle.id,
                      solutionId: null,
                      path: [
                        { id: selectedDomain.id, name: selectedDomain.name, layer: 1 },
                        { id: selectedSubdomain?.id || '', name: selectedSubdomain?.name || '', layer: 2 },
                        { id: selectedCapability?.id || '', name: selectedCapability?.name || '', layer: 3 },
                        { id: selectedBundle.id, name: selectedBundle.name, layer: 4 },
                      ],
                    });
                  }}
                  className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-bold ${
                    activeLayer === 4
                      ? 'bg-[#00dfff] text-[#020914] shadow-[0_0_10px_rgba(0,227,253,0.3)]'
                      : 'bg-[#031a2e] text-[#9bd5e8] hover:bg-[#052745] hover:text-white border border-[#00dfff]/20'
                  }`}
                >
                  {selectedBundle.id} {selectedBundle.name}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Drill-Down Viewport based on Active Layer */}
        <div className="pt-4 space-y-4">
          {/* VIEW LAYER 1: Subdomains & Quick Solution Explorer */}
          {activeLayer === 1 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#6e9bb3] font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#00dfff]" />
                  <span>Layer 2 Subdomains ({catalogSubdomains.length}):</span>
                </span>
                <span className="text-[10px] font-mono text-[#00dfff]">
                  Click subdomain to drill down into capabilities →
                </span>
              </div>

              {/* Subdomain Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {catalogSubdomains.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSelectSubdomain(sub)}
                    className="group flex flex-col justify-between p-3.5 rounded-xl bg-[#03182b]/80 hover:bg-[#042542] border border-[#00dfff]/20 hover:border-[#00e3fd] transition-all text-left cursor-pointer shadow-sm hover:shadow-[0_0_18px_rgba(0,227,253,0.25)] hover:scale-[1.01]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-[11px] font-bold text-[#00dfff] px-1.5 py-0.5 rounded bg-[#00dfff]/10 border border-[#00dfff]/20">
                          {sub.id}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#00dfff] group-hover:translate-x-1 transition-transform" />
                      </div>
                      <strong className="text-sm font-bold text-[#eaf7ff] group-hover:text-[#00e3fd] transition-colors block mb-1">
                        {sub.name}
                      </strong>
                      <p className="text-xs text-[#82a5bb] line-clamp-2 leading-relaxed">
                        {sub.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#00dfff]/10 flex items-center justify-between text-[10px] font-mono text-[#6e9bb3]">
                      <span>Drill into Layer 3</span>
                      <span className="text-[#00dfff] group-hover:underline">Explore Capabilities →</span>
                    </div>
                  </button>
                ))}

                {catalogSubdomains.length === 0 && (
                  <div className="col-span-full py-6 text-center text-xs text-[#6e9bb3] font-mono bg-[#020d18]/50 rounded-xl border border-dashed border-[#00dfff]/15">
                    No subdomains registered for this domain yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW LAYER 2: Capabilities in Selected Subdomain */}
          {activeLayer === 2 && selectedSubdomain && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#6e9bb3] font-bold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#00dfff]" />
                  <span>Layer 3 Capabilities in {selectedSubdomain.id} ({catalogCapabilities.length}):</span>
                </span>
                <span className="text-[10px] font-mono text-[#00dfff]">
                  Click capability to drill down into solution bundles →
                </span>
              </div>

              {/* Capability Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {catalogCapabilities.map((cap) => (
                  <button
                    key={cap.id}
                    onClick={() => handleSelectCapability(cap)}
                    className="group flex flex-col justify-between p-3.5 rounded-xl bg-[#03182b]/80 hover:bg-[#042542] border border-[#00dfff]/20 hover:border-[#00e3fd] transition-all text-left cursor-pointer shadow-sm hover:shadow-[0_0_18px_rgba(0,227,253,0.25)] hover:scale-[1.01]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-[11px] font-bold text-[#00dfff] px-1.5 py-0.5 rounded bg-[#00dfff]/10 border border-[#00dfff]/20">
                          {cap.id}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#00dfff] group-hover:translate-x-1 transition-transform" />
                      </div>
                      <strong className="text-sm font-bold text-[#eaf7ff] group-hover:text-[#00e3fd] transition-colors block mb-1">
                        {cap.name}
                      </strong>
                      <p className="text-xs text-[#82a5bb] line-clamp-2 leading-relaxed">
                        {cap.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#00dfff]/10 flex items-center justify-between text-[10px] font-mono text-[#6e9bb3]">
                      <span>Drill into Layer 4</span>
                      <span className="text-[#00dfff] group-hover:underline">View Solution Bundles →</span>
                    </div>
                  </button>
                ))}

                {catalogCapabilities.length === 0 && (
                  <div className="col-span-full py-6 text-center text-xs text-[#6e9bb3] font-mono bg-[#020d18]/50 rounded-xl border border-dashed border-[#00dfff]/15">
                    No dedicated capability nodes under this subdomain.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW LAYER 3: Solution Bundles in Selected Capability */}
          {activeLayer === 3 && selectedCapability && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#6e9bb3] font-bold flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5 text-[#00dfff]" />
                  <span>Layer 4 Solution Bundles in {selectedCapability.id} ({catalogBundles.length}):</span>
                </span>
                <span className="text-[10px] font-mono text-[#00dfff]">
                  Click bundle to inspect solutions →
                </span>
              </div>

              {/* Bundle Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {catalogBundles.map((bundle) => (
                  <button
                    key={bundle.id}
                    onClick={() => handleSelectBundle(bundle)}
                    className="group flex flex-col justify-between p-4 rounded-xl bg-[#03182b]/80 hover:bg-[#042542] border border-[#00dfff]/25 hover:border-[#00e3fd] transition-all text-left cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(0,227,253,0.3)] hover:scale-[1.01]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-bold text-[#00dfff] px-2 py-0.5 rounded bg-[#00dfff]/15 border border-[#00dfff]/30">
                          {bundle.id}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-mono text-[#00dfff] bg-[#00dfff]/10 px-2 py-0.5 rounded-md">
                          <span>Layer 4 Bundle</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <strong className="text-base font-bold text-[#eaf7ff] group-hover:text-[#00e3fd] transition-colors block mb-1.5">
                        {bundle.name}
                      </strong>
                      <p className="text-xs text-[#82a5bb] leading-relaxed">
                        {bundle.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#00dfff]/15 flex items-center justify-between text-xs font-mono text-[#00dfff]">
                      <span>Inspect Canonical Solutions (Layer 5)</span>
                      <span className="flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                        Explore Solutions →
                      </span>
                    </div>
                  </button>
                ))}

                {catalogBundles.length === 0 && (
                  <div className="col-span-full py-6 text-center text-xs text-[#6e9bb3] font-mono bg-[#020d18]/50 rounded-xl border border-dashed border-[#00dfff]/15">
                    No solution bundles created under this capability yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW LAYER 4/5: L5 Solutions Grid with Platform Filters */}
          {(activeLayer === 4 || activeLayer === 1) && (
            <div className="mt-2 pt-3 border-t border-[#00dfff]/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#6e9bb3] font-bold flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5 text-[#00dfff]" />
                  <span>
                    {activeLayer === 4 && selectedBundle
                      ? `Layer 5 Solutions in ${selectedBundle.name} (${filteredSolutions.length})`
                      : `Standalone Solutions in Domain (${filteredSolutions.length}):`}
                  </span>
                </span>

                {/* Platform Adapter Filter Pills */}
                <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono">
                  <span className="text-[#55798c] mr-1 flex items-center gap-1">
                    <Filter className="w-3 h-3 text-[#00dfff]" /> Platform:
                  </span>
                  {availablePlatforms.map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                        selectedPlatform === plat
                          ? 'bg-[#00dfff] text-[#020914] font-bold shadow-[0_0_8px_rgba(0,227,253,0.4)]'
                          : 'bg-[#02101e] text-[#82a5bb] hover:text-[#00e3fd] border border-[#00dfff]/15'
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Solutions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSolutions.map((sol) => (
                  <button
                    key={sol.id}
                    onClick={() => onSelectSolution(sol.id)}
                    className="group flex flex-col justify-between p-3.5 rounded-xl bg-[#03182b]/80 hover:bg-[#042542] border border-[#00dfff]/20 hover:border-[#00e3fd] transition-all text-left cursor-pointer shadow-sm hover:shadow-[0_0_18px_rgba(0,227,253,0.3)] hover:scale-[1.01]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-[10px] font-bold text-[#00dfff] px-1.5 py-0.5 rounded bg-[#00dfff]/10 border border-[#00dfff]/20">
                          {sol.id}
                        </span>
                        {sol.rating && (
                          <span className="text-[10px] font-mono text-[#f59e0b] font-bold flex items-center gap-0.5">
                            ★ {sol.rating}
                          </span>
                        )}
                      </div>
                      <strong className="text-xs font-bold text-[#eaf7ff] group-hover:text-[#00e3fd] transition-colors block mb-1">
                        {sol.name}
                      </strong>
                      <p className="text-[11px] text-[#82a5bb] line-clamp-2 leading-relaxed">
                        {sol.description}
                      </p>

                      {/* Platform Tags */}
                      {sol.platformOptions && sol.platformOptions.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {sol.platformOptions.map((plat) => (
                            <span
                              key={plat}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#02101e] text-[#9bd5e8] border border-[#00dfff]/20"
                            >
                              {plat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#00dfff]/10 flex items-center justify-between text-[10px] font-mono text-[#00dfff]">
                      <span className="text-[#6e9bb3]">Layer 5 Canonical Solution</span>
                      <span className="flex items-center gap-1 font-bold group-hover:translate-x-0.5 transition-transform">
                        Inspect Solution →
                      </span>
                    </div>
                  </button>
                ))}

                {filteredSolutions.length === 0 && (
                  <div className="col-span-full py-6 text-center text-xs text-[#6e9bb3] font-mono bg-[#020d18]/50 rounded-xl border border-dashed border-[#00dfff]/15">
                    No solutions found matching the selected platform filter.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
