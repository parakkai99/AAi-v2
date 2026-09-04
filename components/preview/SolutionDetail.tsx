import React, { useEffect, useState } from 'react';
import {
  Solution,
  Domain,
  Subdomain,
  Capability,
} from '@/src/types';
import { SolutionItem } from '@/src/contracts/catalog';
import { catalogRepository } from '@/src/repositories/catalogRepository';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import {
  ArrowLeft,
  Sparkles,
  Boxes,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Server,
  Zap,
  ExternalLink,
  Code2,
  Share2,
  FolderTree,
  ChevronRight,
  Clock,
  Award,
  Globe,
  Sliders,
  FileCheck,
} from 'lucide-react';

export interface SolutionDetailProps {
  solutionId: string;
  solution: Solution | null;
  domains: Domain[];
  subdomains: Subdomain[];
  capabilities: Capability[];
  onBackToUniverse: () => void;
  onSelectDomain?: (domainId: string) => void;
}

export const SolutionDetail: React.FC<SolutionDetailProps> = ({
  solutionId,
  solution,
  domains,
  subdomains,
  capabilities,
  onBackToUniverse,
  onSelectDomain,
}) => {
  const { getDomainName, t } = useArchitectAny();
  const [catalogItem, setCatalogItem] = useState<SolutionItem | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [compositionSuccess, setCompositionSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    catalogRepository.getItemById(solutionId).then((item) => {
      if (item && item.type === 'SOLUTION') {
        setCatalogItem(item as SolutionItem);
      }
    });
  }, [solutionId]);

  const activeSol = catalogItem || solution;

  if (!activeSol) {
    return (
      <main className="min-h-[calc(100vh-74px)] bg-[#020914] text-[#eaf7ff] pt-24 px-4 flex flex-col items-center justify-center">
        <div className="p-8 rounded-2xl bg-[#031526] border border-[#00dfff]/30 text-center max-w-md shadow-2xl">
          <span className="text-xs font-mono text-[#00dfff] uppercase tracking-widest block mb-2">
            ArchitectAny AAi
          </span>
          <h2 className="text-xl font-bold mb-2">{t('solution_not_found')}</h2>
          <p className="text-xs text-[#82a5bb] mb-6">
            The requested solution ID ({solutionId}) could not be resolved in the AAi canonical catalog.
          </p>
          <button
            onClick={onBackToUniverse}
            className="px-5 py-2.5 rounded-xl bg-[#00e3fd] text-[#020914] font-mono text-xs font-bold hover:bg-[#51dfff] transition-all cursor-pointer"
          >
            ← {t('back_to_universe')}
          </button>
        </div>
      </main>
    );
  }

  const primaryDomainId = catalogItem?.domainId || (solution?.domainIds && solution.domainIds[0]) || 'D06';
  const primaryDomain = domains.find((d) => d.id === primaryDomainId) || domains[0];
  const color = primaryDomain?.visual?.color || '#00e3fd';
  const primaryDomainName = primaryDomain ? getDomainName(primaryDomain.id, primaryDomain.name) : 'Marketplace & Commerce';

  // 5-Layer Hierarchical Path
  const path = catalogItem?.path || [
    { id: 'D06', name: 'Marketplace & Commerce', layer: 1, type: 'DOMAIN' },
    { id: 'D06.01', name: 'Hyperlocal Marketplace', layer: 2, type: 'SUBDOMAIN' },
    { id: 'D06.01.01', name: 'Event & Media Services', layer: 3, type: 'CAPABILITY' },
    { id: 'D06.01.01.01', name: 'Event Management & Booking Bundle', layer: 4, type: 'SOLUTION_BUNDLE' },
    { id: activeSol.id, name: activeSol.name, layer: 5, type: 'SOLUTION' },
  ];

  const handleLaunchComposition = () => {
    setIsComposing(true);
    setTimeout(() => {
      setIsComposing(false);
      setCompositionSuccess(true);
      setTimeout(() => setCompositionSuccess(false), 5000);
    }, 1200);
  };

  return (
    <main className="min-h-[calc(100vh-74px)] bg-gradient-to-b from-[#020914] via-[#010b17] to-[#020914] text-[#eaf7ff] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Breadcrumb & Back Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={onBackToUniverse}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#031526]/80 hover:bg-[#04243f] border border-[#00dfff]/30 text-xs font-mono text-[#00dfff] hover:text-[#eaf7ff] transition-all group cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>{t('back_to_universe')}</span>
          </button>

          {/* Interactive 5-Layer Breadcrumb Trail */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[#6e9bb3] bg-[#021120]/80 px-3 py-1.5 rounded-xl border border-[#00dfff]/15">
            <span className="text-[#00dfff] font-bold">AAi Universe</span>
            {path.map((segment, index) => (
              <React.Fragment key={segment.id}>
                <ChevronRight className="w-3.5 h-3.5 text-[#55798c]" />
                <span
                  className={
                    index === path.length - 1
                      ? 'text-[#00e3fd] font-bold px-1.5 py-0.5 rounded bg-[#00e3fd]/10 border border-[#00e3fd]/25'
                      : 'text-[#82a5bb]'
                  }
                >
                  {segment.id}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Hero Solution Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#03182b]/95 via-[#021120]/95 to-[#010912]/95 border border-[#00dfff]/30 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,180,255,0.08)] backdrop-blur-2xl">
          {/* Ambient Glow */}
          <div
            className="absolute -right-32 -top-32 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{ backgroundColor: color }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span
                  className="px-3 py-1 rounded-lg font-mono text-xs font-black tracking-wider text-black shadow-[0_0_12px_rgba(0,227,253,0.5)]"
                  style={{ backgroundColor: color }}
                >
                  {activeSol.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-[#00dfff]/15 text-[#00dfff] border border-[#00dfff]/30 uppercase">
                  Layer 5 Solution
                </span>
                {catalogItem?.complexity && (
                  <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30 uppercase">
                    Complexity: {catalogItem.complexity}
                  </span>
                )}
                {catalogItem?.estimatedEffort && (
                  <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {catalogItem.estimatedEffort}
                  </span>
                )}
                {catalogItem?.rating && (
                  <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase flex items-center gap-1">
                    <Award className="w-3 h-3" /> {catalogItem.rating} / 5.0
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#eaf7ff] tracking-tight mb-3">
                {activeSol.name}
              </h1>

              <p className="text-sm sm:text-base text-[#9bd5e8] leading-relaxed mb-6 max-w-2xl">
                {activeSol.description ||
                  'Architected enterprise solution composition mapping business domains, verified service meshes, and autonomous integration pipelines.'}
              </p>

              {/* Connected Domain Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#6e9bb3] uppercase tracking-wider mr-1">
                  {t('bound_domains')}:
                </span>
                <button
                  onClick={() => {
                    onSelectDomain?.(primaryDomainId);
                    onBackToUniverse();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#020e1a] hover:bg-[#031d33] border border-[#00dfff]/25 hover:border-[#00e3fd] text-xs font-mono text-[#dff7ff] transition-all cursor-pointer"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span>{primaryDomainName} ({primaryDomainId})</span>
                </button>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-64">
              <button
                onClick={handleLaunchComposition}
                disabled={isComposing}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#2c9dff] text-[#020914] font-mono text-xs font-black hover:opacity-95 shadow-[0_0_20px_rgba(0,227,253,0.4)] transition-all cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>{isComposing ? 'Assembling Graph...' : t('launch_composition')}</span>
              </button>
              <button
                onClick={() => alert(`Architectural Blueprint for ${activeSol.id} generated successfully.`)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#02101e] hover:bg-[#031d33] border border-[#00dfff]/30 text-xs font-mono text-[#eaf7ff] transition-all cursor-pointer"
              >
                <Workflow className="w-4 h-4 text-[#00dfff]" />
                <span>{t('view_architecture_mesh')}</span>
              </button>

              {compositionSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono text-center animate-in fade-in">
                  ✓ Solution Mesh Initialized & Ready
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Platform Interoperability Adapters (Shopify, Zoho, Magento, OpenCart) */}
        {catalogItem?.platformOptions && catalogItem.platformOptions.length > 0 && (
          <div className="p-6 rounded-2xl bg-[#021222]/90 border border-[#00dfff]/20 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#00dfff]/15">
              <div className="flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-[#00dfff]" />
                <h3 className="text-base font-bold text-[#eaf7ff]">
                  Platform Interoperability Adapters
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#00dfff]">
                Multi-Vendor Connector Layer
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {catalogItem.platformOptions.map((plat) => (
                <div
                  key={plat}
                  className="p-3.5 rounded-xl bg-[#03192e]/70 border border-[#00dfff]/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-[#eaf7ff]">{plat}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Compatible
                      </span>
                    </div>
                    <p className="text-[11px] text-[#82a5bb] leading-relaxed">
                      Native bi-directional multi-seller sync, catalog bridging & automated settlement.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#00dfff]/10 flex items-center justify-between text-[10px] font-mono text-[#00dfff]">
                    <span>Adapter v1.1x</span>
                    <span className="underline cursor-pointer">Configure →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Solution Features */}
        {catalogItem?.features && catalogItem.features.length > 0 && (
          <div className="p-6 rounded-2xl bg-[#021222]/90 border border-[#00dfff]/20 backdrop-blur-xl">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#00dfff]/15">
              <FileCheck className="w-5 h-5 text-[#00dfff]" />
              <h3 className="text-base font-bold text-[#eaf7ff]">
                Solution Capabilities & Core Modules
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {catalogItem.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#03192e]/60 border border-[#00dfff]/15"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00e3fd] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#eaf7ff] leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Multi-Domain Architecture Flow Blueprint */}
        <div className="p-6 rounded-2xl bg-[#020f1c]/90 border border-[#00dfff]/20 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#00dfff]/15">
            <div className="flex items-center gap-2.5">
              <Server className="w-5 h-5 text-[#00dfff]" />
              <h3 className="text-base font-bold text-[#eaf7ff]">
                {t('pipeline_flow')}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#00dfff]">
              ArchitectAny Canonical Execution
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            {[
              { step: '01', title: 'Intent Match', desc: 'Natural Language & Domain' },
              { step: '02', title: 'Capability Bind', desc: 'API & Service Mesh' },
              { step: '03', title: 'Configuration', desc: 'Multi-Tenant Specs' },
              { step: '04', title: 'Platform Adapters', desc: 'Shopify / Zoho / Magento' },
              { step: '05', title: 'PostgreSQL DB', desc: 'Isolated Repo Boundary' },
              { step: '06', title: 'Delivery', desc: 'Cloud Run & Edge Node' },
            ].map((f) => (
              <div
                key={f.step}
                className="p-3 rounded-xl bg-[#03182b]/60 border border-[#00dfff]/15 flex flex-col items-center justify-center"
              >
                <span className="text-xs font-mono font-bold text-[#00dfff]">{f.step}</span>
                <strong className="text-xs text-[#eaf7ff] mt-1">{f.title}</strong>
                <span className="text-[10px] text-[#6e9bb3] mt-0.5">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
