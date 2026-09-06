import React, { useState, useEffect } from "react";
import { Domain, Subdomain, Capability, Solution } from "@/src/types";
import { SolutionItem } from "@/src/contracts/catalog";
import { catalogRepository } from "@/src/repositories/catalogRepository";
import { useArchitectAny } from "@/src/context/ArchitectAnyContext";
import {
  ArrowLeft,
  Terminal,
  Server,
  Cpu,
  Layers,
  Activity,
  Sliders,
  MapPin,
  Calendar,
  Workflow,
  CheckCircle2,
  Clock,
  Radio,
  ExternalLink,
  ShieldCheck,
  Zap,
  Boxes,
  Database,
  RefreshCw,
  Copy,
  Check,
  Users,
  ChevronRight,
  Sparkles,
  BarChart3,
  Globe,
  Settings,
  Flame,
  FileCode,
  Download,
  Play,
  RotateCcw,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export interface SolutionExecutionWorkspaceProps {
  solutionId: string;
  solution: Solution | null;
  domains: Domain[];
  subdomains: Subdomain[];
  capabilities: Capability[];
  onBackToSolution: () => void;
  onBackToUniverse: () => void;
  onSelectDomain?: (domainId: string) => void;
}

type TabType =
  | "overview"
  | "configuration"
  | "architecture"
  | "composition"
  | "providers"
  | "location"
  | "availability"
  | "workflow"
  | "monitoring"
  | "next_steps";

export const SolutionExecutionWorkspace: React.FC<
  SolutionExecutionWorkspaceProps
> = ({
  solutionId,
  solution,
  domains,
  subdomains,
  capabilities,
  onBackToSolution,
  onBackToUniverse,
  onSelectDomain,
}) => {
  const { getDomainName, theme } = useArchitectAny();
  const isDark = theme === "dark";

  const [catalogItem, setCatalogItem] = useState<SolutionItem | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Simulation & Configuration State
  const [selectedPlatform, setSelectedPlatform] =
    useState<string>("Zoho Commerce");
  const [operationalRadius, setOperationalRadius] = useState<number>(35);
  const [escrowMode, setEscrowMode] = useState<"2-stage" | "3-stage">(
    "2-stage",
  );
  const [commissionRate, setCommissionRate] = useState<number>(8.5);
  const [kycLevel, setKycLevel] = useState<"Standard" | "Strict">("Strict");

  // Interactive Execution Pipeline Simulation State
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [copiedBlueprint, setCopiedBlueprint] = useState<boolean>(false);

  // Load catalog item
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    catalogRepository.getItemById(solutionId).then((item) => {
      if (item && item.type === "SOLUTION") {
        setCatalogItem(item as SolutionItem);
        if (item.platformOptions && item.platformOptions.length > 0) {
          setSelectedPlatform(item.platformOptions[0]);
        }
        if (item.locationContext?.radiusKm) {
          setOperationalRadius(item.locationContext.radiusKm);
        }
      }
    });
  }, [solutionId]);

  const activeSol = catalogItem || solution;

  const locationContext = catalogItem?.locationContext || {
    city: "Coimbatore",
    state: "Tamil Nadu",
    region: "Western Tamil Nadu & South India",
  };

  // 6-Layer Path
  const path = [
    { id: "D06", name: "Marketplace & Commerce", layer: 1 },
    { id: "D06.01", name: "Hyperlocal Marketplace", layer: 2 },
    { id: "D06.01.01", name: "Event & Media Services", layer: 3 },
    { id: "D06.01.01.01", name: "Event Management & Booking Bundle", layer: 4 },
    {
      id: activeSol?.id || solutionId,
      name: activeSol?.name || "Hyperlocal Event & Celebration Marketplace",
      layer: 5,
    },
    {
      id: "L6-EXECUTION",
      name: "Execution Workspace / Control Center",
      layer: 6,
    },
  ];

  // Pipeline execution simulation runner
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(1);

    const stepTimers = [
      setTimeout(() => setSimulationStep(2), 1000),
      setTimeout(() => setSimulationStep(3), 2200),
      setTimeout(() => setSimulationStep(4), 3400),
      setTimeout(() => setSimulationStep(5), 4600),
      setTimeout(() => {
        setSimulationStep(6);
        setIsSimulating(false);
      }, 5800),
    ];

    return () => stepTimers.forEach(clearTimeout);
  };

  const handleResetSimulation = () => {
    setSimulationStep(0);
    setIsSimulating(false);
  };

  const handleCopyBlueprint = () => {
    const blueprintData = {
      layer: 6,
      type: "ARCHITECTANY_SOLUTION_EXECUTION",
      solutionId: activeSol?.id || solutionId,
      name: activeSol?.name,
      domainId: "D06",
      subdomainId: "D06.01",
      capabilityId: "D06.01.01",
      configuration: {
        platformAdapter: selectedPlatform,
        operatingRadiusKm: operationalRadius,
        escrowSplitMode: escrowMode,
        commissionPercentage: commissionRate,
        kycVerificationLevel: kycLevel,
      },
      locationContext,
      timestamp: new Date().toISOString(),
    };

    navigator.clipboard.writeText(JSON.stringify(blueprintData, null, 2));
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2500);
  };

  if (!activeSol) {
    return (
      <main className="min-h-[calc(100vh-74px)] bg-[#020914] text-[#eaf7ff] pt-12 px-4 flex flex-col items-center justify-center">
        <div className="p-8 rounded-2xl bg-[#031526] border border-[#00dfff]/30 text-center max-w-md shadow-2xl">
          <span className="text-xs font-mono text-[#00dfff] uppercase tracking-widest block mb-2">
            ArchitectAny AAi Execution
          </span>
          <h2 className="text-xl font-bold mb-2">Solution Not Found</h2>
          <p className="text-xs text-[#82a5bb] mb-6">
            Cannot resolve execution parameters for solution ID ({solutionId}).
          </p>
          <button
            onClick={onBackToUniverse}
            className="px-5 py-2.5 rounded-xl bg-[#00e3fd] text-[#020914] font-mono text-xs font-bold hover:bg-[#51dfff] transition-all cursor-pointer"
          >
            ← Back to Universe
          </button>
        </div>
      </main>
    );
  }

  const tabs: {
    id: TabType;
    label: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "configuration", label: "Configuration", icon: Sliders },
    { id: "architecture", label: "Architecture & Mesh", icon: Cpu },
    { id: "composition", label: "Service Composition", icon: Boxes },
    { id: "providers", label: "Providers / Catalog", icon: Users },
    { id: "location", label: "Location & Radius", icon: MapPin },
    { id: "availability", label: "Availability Engine", icon: Calendar },
    { id: "workflow", label: "Workflow Pipeline", icon: Workflow },
    { id: "monitoring", label: "Monitoring", icon: BarChart3 },
    { id: "next_steps", label: "Next Steps", icon: FileCode },
  ];

  return (
    <div className="min-h-[calc(100vh-74px)] bg-[#020914] text-[#eaf7ff] flex flex-col">
      {/* Top Sticky HUD Banner (Flush with header, top-0 inside main) */}
      <div className="sticky top-0 z-40 w-full bg-[#020d1a]/95 backdrop-blur-md border-b border-[#00dfff]/20 px-4 sm:px-6 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Breadcrumb path with interactive drill-up */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[#6e9bb3]">
            <button
              onClick={onBackToUniverse}
              className="hover:text-[#00e3fd] transition-colors cursor-pointer"
              title="Return to L1 AAi Universe"
            >
              Universe (L1)
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#3b6177]" />
            <button
              onClick={onBackToUniverse}
              className="hover:text-[#00e3fd] transition-colors cursor-pointer"
              title="Return to L2 Hyperlocal Marketplace"
            >
              D06.01 (L2)
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#3b6177]" />
            <button
              onClick={onBackToUniverse}
              className="hover:text-[#00e3fd] transition-colors cursor-pointer"
              title="Return to L3 Event & Media Services"
            >
              D06.01.01 (L3)
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#3b6177]" />
            <button
              onClick={onBackToUniverse}
              className="hover:text-[#00e3fd] transition-colors cursor-pointer"
              title="Return to L4 Event Management Bundle"
            >
              D06.01.01.01 (L4)
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#3b6177]" />
            <button
              onClick={onBackToSolution}
              className="hover:text-[#00e3fd] text-[#82a5bb] transition-colors cursor-pointer"
              title="Return to L5 Understand Solution"
            >
              {activeSol.id} (L5)
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#3b6177]" />
            <span className="text-[#00e3fd] font-bold px-2 py-0.5 rounded bg-[#00e3fd]/15 border border-[#00e3fd]/30">
              Execution Control Center (L6)
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToSolution}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#03182b] hover:bg-[#04243f] border border-[#00dfff]/30 text-xs font-mono text-[#00dfff] hover:text-[#eaf7ff] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Understand Solution (L5)</span>
            </button>
            <button
              onClick={handleCopyBlueprint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00e3fd] hover:bg-[#51dfff] text-[#020914] text-xs font-mono font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(0,227,253,0.3)]"
            >
              {copiedBlueprint ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>
                {copiedBlueprint ? "Blueprint Copied!" : "Export Blueprint"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Stage */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-grow flex flex-col gap-6">
        {/* Solution Execution Header Bar */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#03192d] via-[#021323] to-[#010c17] border border-[#00dfff]/25 p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded font-mono text-xs font-black bg-[#00e3fd] text-[#020914]">
                  {activeSol.id}
                </span>
                <span className="px-2 py-0.5 rounded font-mono text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                  CONTROL CENTER ACTIVE
                </span>
                <span className="px-2 py-0.5 rounded font-mono text-[11px] bg-[#00dfff]/10 text-[#00dfff] border border-[#00dfff]/20">
                  Target: {selectedPlatform}
                </span>
                <span className="px-2 py-0.5 rounded font-mono text-[11px] bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  Radius: {operationalRadius}km
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#eaf7ff]">
                {activeSol.name} — Solution Execution Workspace
              </h1>
              <p className="text-xs sm:text-sm text-[#9bd5e8] max-w-3xl leading-relaxed">
                Direct control center for configuring multi-seller business
                rules, testing geospatial provider matching, simulating live
                event reservation pipelines, and monitoring settlement
                telemetry.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#020f1c] border border-[#00dfff]/20 text-center font-mono">
                <div className="text-[10px] uppercase text-[#6e9bb3]">Mode</div>
                <div className="text-xs font-bold text-[#00e3fd]">
                  Interactive Sandbox
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#020f1c] border border-[#00dfff]/20 text-center font-mono">
                <div className="text-[10px] uppercase text-[#6e9bb3]">
                  Health
                </div>
                <div className="text-xs font-bold text-emerald-400">
                  100% Operational
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Scope Notice */}
          <div className="mt-4 pt-3 border-t border-[#00dfff]/15 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#82a5bb] gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00e3fd]" />
              <span>
                Sandbox execution verified against AAi Canonical Capability
                Schema. Production deployment routes to live cloud containers.
              </span>
            </div>
            <div className="text-[#00dfff]">
              Location Anchor: {locationContext.city}, {locationContext.state}
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#00dfff]/15 scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00e3fd] text-[#020914] font-bold shadow-[0_0_15px_rgba(0,227,253,0.35)]"
                    : "bg-[#021323]/60 text-[#82a5bb] hover:text-[#eaf7ff] hover:bg-[#031d33] border border-[#00dfff]/15"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${isActive ? "text-[#020914]" : "text-[#00dfff]"}`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB CONTENT: OVERVIEW
           ========================================================================= */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-in fade-in">
            {/* Left 2 Cols: Operational Status & Blueprint */}
            <div className="lg:col-span-2 space-y-5">
              <div className="p-5 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#00dfff]/15">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#00dfff]" />
                    <h3 className="text-sm font-bold text-[#eaf7ff] font-mono uppercase tracking-wider">
                      Execution Runtime & Boundaries
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    State: READY
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15">
                    <span className="text-[#6e9bb3] block text-[11px]">
                      Primary Capability Domain
                    </span>
                    <strong className="text-[#eaf7ff] text-sm">
                      D06 Marketplace & Commerce
                    </strong>
                    <span className="text-[#00dfff] block text-[11px] mt-1">
                      D06.01 Hyperlocal Marketplace
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15">
                    <span className="text-[#6e9bb3] block text-[11px]">
                      Parent Solution Bundle
                    </span>
                    <strong className="text-[#eaf7ff] text-sm">
                      D06.01.01.01
                    </strong>
                    <span className="text-[#00dfff] block text-[11px] mt-1">
                      Event Management & Booking Bundle
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15">
                    <span className="text-[#6e9bb3] block text-[11px]">
                      Process & Settlement Engine
                    </span>
                    <strong className="text-[#eaf7ff] text-sm">
                      Multi-Party Escrow (UPI/Stripe)
                    </strong>
                    <span className="text-[#00dfff] block text-[11px] mt-1">
                      {escrowMode.toUpperCase()} milestone verification
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15">
                    <span className="text-[#6e9bb3] block text-[11px]">
                      Geofence Radius Enforcement
                    </span>
                    <strong className="text-[#eaf7ff] text-sm">
                      {operationalRadius} km Operating Zone
                    </strong>
                    <span className="text-[#00dfff] block text-[11px] mt-1">
                      Anchor: Coimbatore Urban & Suburban
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#9bd5e8] leading-relaxed pt-2">
                  The Hyperlocal Event Marketplace combines real-time venue
                  floorplan scheduling, custom multi-item gourmet catering
                  quotes, professional sound/stage dispatch, and wedding
                  photography crews into a unified customer checkout with
                  automated split settlements.
                </p>
              </div>

              {/* Execution Flow Diagram */}
              <div className="p-5 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#00dfff]/15">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-[#00dfff]" />
                    <h3 className="text-sm font-bold text-[#eaf7ff] font-mono uppercase tracking-wider">
                      Turnkey Solution Flow
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#00dfff]">
                    6 Lifecycle Steps
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    {
                      step: "01",
                      name: "Discovery",
                      desc: "Customer selects date & guest count within 35km",
                    },
                    {
                      step: "02",
                      name: "Inquiry Broadcast",
                      desc: "Geofence matches verified banquet & caterers",
                    },
                    {
                      step: "03",
                      name: "Quote Mesh",
                      desc: "Custom per-plate & AV quotation compiled",
                    },
                    {
                      step: "04",
                      name: "Escrow Lock",
                      desc: "30% deposit secured in platform escrow",
                    },
                    {
                      step: "05",
                      name: "Milestone OTP",
                      desc: "Hall entry check-in verifies vendor arrival",
                    },
                    {
                      step: "06",
                      name: "Split Settlement",
                      desc: "Balances auto-released to vendor UPI wallets",
                    },
                  ].map((s) => (
                    <div
                      key={s.step}
                      className="p-3 rounded-xl bg-[#031b31]/50 border border-[#00dfff]/15 flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-mono text-xs font-bold text-[#00e3fd]">
                          {s.step}
                        </span>
                        <strong className="block text-[#eaf7ff] mt-1 font-semibold">
                          {s.name}
                        </strong>
                        <p className="text-[11px] text-[#82a5bb] mt-1 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Quick Control Telemetry & Test Actions */}
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-4">
                <h3 className="text-sm font-bold text-[#eaf7ff] font-mono uppercase tracking-wider pb-3 border-b border-[#00dfff]/15 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#00dfff]" />
                  Active Parameters
                </h3>

                <div className="space-y-3 text-xs font-mono">
                  <div>
                    <label className="text-[#82a5bb] block mb-1">
                      Commerce Adapter
                    </label>
                    <select
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#031b31] border border-[#00dfff]/30 text-[#eaf7ff] font-mono text-xs focus:outline-none focus:border-[#00e3fd]"
                    >
                      <option value="Zoho Commerce">
                        Zoho Commerce (Native ERP Sync)
                      </option>
                      <option value="Shopify">
                        Shopify (App Bridge + GraphQL)
                      </option>
                      <option value="Magento / Adobe Commerce">
                        Magento / Adobe Commerce (MSI)
                      </option>
                      <option value="OpenCart">OpenCart (Lightweight)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#82a5bb] mb-1">
                      <span>Service Radius</span>
                      <span className="text-[#00e3fd] font-bold">
                        {operationalRadius} km
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      step="5"
                      value={operationalRadius}
                      onChange={(e) =>
                        setOperationalRadius(Number(e.target.value))
                      }
                      className="w-full accent-[#00e3fd] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[#82a5bb] mb-1">
                      <span>Marketplace Commission</span>
                      <span className="text-[#00e3fd] font-bold">
                        {commissionRate}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      step="0.5"
                      value={commissionRate}
                      onChange={(e) =>
                        setCommissionRate(Number(e.target.value))
                      }
                      className="w-full accent-[#00e3fd] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab("workflow")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00e3fd] text-[#020914] font-mono text-xs font-bold hover:bg-[#51dfff] transition-all cursor-pointer shadow-[0_0_15px_rgba(0,227,253,0.3)]"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Interactive Pipeline Test</span>
                  </button>
                </div>
              </div>

              {/* Status Checklist */}
              <div className="p-5 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-3 font-mono text-xs">
                <span className="text-xs uppercase text-[#6e9bb3] tracking-wider block font-bold">
                  System Health & Services
                </span>
                {[
                  {
                    label: "Geospatial Grid Service",
                    status: "Active (35ms)",
                    ok: true,
                  },
                  {
                    label: "Quotation Decomposition",
                    status: "Active (12ms)",
                    ok: true,
                  },
                  {
                    label: "Escrow Ledger Engine",
                    status: "Active (28ms)",
                    ok: true,
                  },
                  {
                    label: "Platform Connector Bridge",
                    status: `${selectedPlatform} Ready`,
                    ok: true,
                  },
                  {
                    label: "SMS & WhatsApp OTP Relay",
                    status: "Connected",
                    ok: true,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1 border-b border-[#00dfff]/10"
                  >
                    <span className="text-[#82a5bb]">{item.label}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: CONFIGURATION
           ========================================================================= */}
        {activeTab === "configuration" && (
          <div className="p-6 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-6 animate-in fade-in">
            <div className="pb-3 border-b border-[#00dfff]/15 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#eaf7ff] font-mono">
                  Solution Execution Configuration
                </h3>
                <p className="text-xs text-[#82a5bb] mt-0.5">
                  Tune platform adapters, commission rules, geographic boundary
                  thresholds, and escrow release gates.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedPlatform("Zoho Commerce");
                  setOperationalRadius(35);
                  setCommissionRate(8.5);
                  setEscrowMode("2-stage");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#031b31] border border-[#00dfff]/20 text-xs font-mono text-[#00dfff] hover:text-[#eaf7ff] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-3">
                <strong className="text-sm text-[#eaf7ff] font-mono block">
                  1. Commerce Engine Adapter
                </strong>
                <p className="text-xs text-[#82a5bb]">
                  Select the host commerce infrastructure to sync vendor
                  products, orders, and payment webhooks.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {[
                    "Zoho Commerce",
                    "Shopify",
                    "Magento / Adobe Commerce",
                    "OpenCart",
                  ].map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedPlatform === plat
                          ? "bg-[#00e3fd]/15 border-[#00e3fd] text-[#00e3fd] font-bold"
                          : "bg-[#020e1a] border-[#00dfff]/15 text-[#82a5bb] hover:border-[#00dfff]/30"
                      }`}
                    >
                      <div>{plat}</div>
                      <span className="text-[10px] text-[#6e9bb3] block mt-1">
                        {plat === "Zoho Commerce"
                          ? "Zoho Books + Inventory"
                          : "GraphQL Webhook Sync"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-3">
                <strong className="text-sm text-[#eaf7ff] font-mono block">
                  2. Escrow & Settlement Structure
                </strong>
                <p className="text-xs text-[#82a5bb]">
                  Control how customer funds are locked and dispersed across
                  multi-seller event bookings.
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-[#020e1a] border border-[#00dfff]/20 cursor-pointer">
                    <input
                      type="radio"
                      name="escrow"
                      checked={escrowMode === "2-stage"}
                      onChange={() => setEscrowMode("2-stage")}
                      className="accent-[#00e3fd]"
                    />
                    <div>
                      <strong className="text-[#eaf7ff] block">
                        2-Stage Settlement (Standard)
                      </strong>
                      <span className="text-[#82a5bb] text-[11px]">
                        30% deposit held on booking, 70% released after hall
                        check-in OTP.
                      </span>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-[#020e1a] border border-[#00dfff]/20 cursor-pointer">
                    <input
                      type="radio"
                      name="escrow"
                      checked={escrowMode === "3-stage"}
                      onChange={() => setEscrowMode("3-stage")}
                      className="accent-[#00e3fd]"
                    />
                    <div>
                      <strong className="text-[#eaf7ff] block">
                        3-Stage Milestone Settlement
                      </strong>
                      <span className="text-[#82a5bb] text-[11px]">
                        25% on reservation, 50% on event morning, 25% post-event
                        signoff.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-3">
                <strong className="text-sm text-[#eaf7ff] font-mono block">
                  3. Geospatial Radius Limit
                </strong>
                <p className="text-xs text-[#82a5bb]">
                  Define maximum distance from Coimbatore center to match
                  caterers, florists, and AV sound operators.
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#82a5bb]">Current Radius:</span>
                    <span className="text-[#00e3fd] font-bold">
                      {operationalRadius} km
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={operationalRadius}
                    onChange={(e) =>
                      setOperationalRadius(Number(e.target.value))
                    }
                    className="w-full accent-[#00e3fd] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#6e9bb3]">
                    <span>10 km (Urban Core)</span>
                    <span>35 km (Metro + Suburban)</span>
                    <span>60 km (Regional Corridors)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-3">
                <strong className="text-sm text-[#eaf7ff] font-mono block">
                  4. Vendor Onboarding Verification
                </strong>
                <p className="text-xs text-[#82a5bb]">
                  Minimum KYC standards required for local vendors to receive
                  quotation requests.
                </p>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <button
                    onClick={() => setKycLevel("Standard")}
                    className={`flex-1 p-2.5 rounded-xl border text-center cursor-pointer ${
                      kycLevel === "Standard"
                        ? "bg-[#00e3fd]/15 border-[#00e3fd] text-[#00e3fd] font-bold"
                        : "bg-[#020e1a] border-[#00dfff]/15 text-[#82a5bb]"
                    }`}
                  >
                    Standard KYC
                    <span className="block text-[10px] text-[#6e9bb3] mt-0.5">
                      PAN + Bank Details
                    </span>
                  </button>
                  <button
                    onClick={() => setKycLevel("Strict")}
                    className={`flex-1 p-2.5 rounded-xl border text-center cursor-pointer ${
                      kycLevel === "Strict"
                        ? "bg-[#00e3fd]/15 border-[#00e3fd] text-[#00e3fd] font-bold"
                        : "bg-[#020e1a] border-[#00dfff]/15 text-[#82a5bb]"
                    }`}
                  >
                    Strict Enterprise KYC
                    <span className="block text-[10px] text-[#6e9bb3] mt-0.5">
                      GST + Trade License + Inspection
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: ARCHITECTURE & MESH
           ========================================================================= */}
        {activeTab === "architecture" && (
          <div className="p-6 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-6 animate-in fade-in">
            <div className="pb-3 border-b border-[#00dfff]/15 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#eaf7ff] font-mono">
                  Microservices Topology & Architectural Mesh
                </h3>
                <p className="text-xs text-[#82a5bb] mt-0.5">
                  Logical topology representing service boundaries, APIs, and
                  synchronous event queues.
                </p>
              </div>
              <span className="text-xs font-mono text-[#00dfff] bg-[#00dfff]/10 px-2 py-1 rounded border border-[#00dfff]/20">
                Service Mesh: v2.4-hyperlocal
              </span>
            </div>

            {/* Architecture Node Visual Graph */}
            <div className="p-6 rounded-2xl bg-[#010b14] border border-[#00dfff]/20 font-mono">
              <div className="text-center text-xs text-[#00e3fd] font-bold mb-4 uppercase tracking-widest">
                Client Layer → API Gateway → Domain Services → Persistence &
                Escrow
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                {/* Layer 1: Ingress */}
                <div className="p-4 rounded-xl bg-[#031b31]/70 border border-[#00dfff]/20 space-y-2">
                  <span className="text-[10px] text-[#00dfff] uppercase tracking-wider block font-bold">
                    01. Ingress & Client
                  </span>
                  <div className="p-2.5 rounded-lg bg-[#02101e] border border-[#00dfff]/15">
                    <strong className="text-[#eaf7ff] block">
                      Web & Mobile PWA
                    </strong>
                    <span className="text-[10px] text-[#6e9bb3]">
                      React + Tailwind Client
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#02101e] border border-[#00dfff]/15">
                    <strong className="text-[#eaf7ff] block">
                      Vendor Partner Portal
                    </strong>
                    <span className="text-[10px] text-[#6e9bb3]">
                      Quotation & Slot Manager
                    </span>
                  </div>
                </div>

                {/* Layer 2: API Gateway & Intent */}
                <div className="p-4 rounded-xl bg-[#031b31]/70 border border-[#00dfff]/20 space-y-2">
                  <span className="text-[10px] text-[#00dfff] uppercase tracking-wider block font-bold">
                    02. Gateway & Routing
                  </span>
                  <div className="p-2.5 rounded-lg bg-[#02101e] border border-[#00dfff]/15">
                    <strong className="text-[#eaf7ff] block">
                      AAi Intent Gateway
                    </strong>
                    <span className="text-[10px] text-[#6e9bb3]">
                      Auth & Request Throttling
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#02101e] border border-[#00dfff]/15">
                    <strong className="text-[#eaf7ff] block">
                      Geospatial Router
                    </strong>
                    <span className="text-[10px] text-[#6e9bb3]">
                      Radius query (PostGIS / Haversine)
                    </span>
                  </div>
                </div>

                {/* Layer 3: Core Domain Services */}
                <div className="p-4 rounded-xl bg-[#031b31]/70 border border-[#00dfff]/20 space-y-2">
                  <span className="text-[10px] text-[#00dfff] uppercase tracking-wider block font-bold">
                    03. Domain Microservices
                  </span>
                  <div className="p-2.5 rounded-lg bg-[#02101e] border border-[#00dfff]/15">
                    <strong className="text-[#eaf7ff] block">
                      Venue Slot Engine
                    </strong>
                    <span className="text-[10px] text-[#6e9bb3]">
                      Real-time calendar lock
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#02101e] border border-[#00dfff]/15">
                    <strong className="text-[#eaf7ff] block">
                      Catering RFQ Mesh
                    </strong>
                    <span className="text-[10px] text-[#6e9bb3]">
                      Dynamic menu quoter
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#02101e] border border-[#00dfff]/15">
                    <strong className="text-[#eaf7ff] block">
                      AV / Media Dispatch
                    </strong>
                    <span className="text-[10px] text-[#6e9bb3]">
                      Rider & crew scheduler
                    </span>
                  </div>
                </div>

                {/* Layer 4: Payment, Escrow & Ledger */}
                <div className="p-4 rounded-xl bg-[#031b31]/70 border border-[#00dfff]/20 space-y-2">
                  <span className="text-[10px] text-[#00dfff] uppercase tracking-wider block font-bold">
                    04. Settlement & Storage
                  </span>
                  <div className="p-2.5 rounded-lg bg-[#02101e] border border-[#00dfff]/15">
                    <strong className="text-[#eaf7ff] block">
                      Escrow Split Ledger
                    </strong>
                    <span className="text-[10px] text-[#6e9bb3]">
                      Multi-vendor UPI split
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#02101e] border border-[#00dfff]/15">
                    <strong className="text-[#eaf7ff] block">
                      Platform Adapter
                    </strong>
                    <span className="text-[10px] text-[#6e9bb3]">
                      {selectedPlatform} Integration
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: SERVICE COMPOSITION
           ========================================================================= */}
        {activeTab === "composition" && (
          <div className="p-6 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-6 animate-in fade-in">
            <div className="pb-3 border-b border-[#00dfff]/15">
              <h3 className="text-base font-bold text-[#eaf7ff] font-mono">
                Composed Service Capabilities
              </h3>
              <p className="text-xs text-[#82a5bb] mt-0.5">
                Every modular service that makes up D06.01.01.01.001 with
                integration contracts and readiness states.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "SVC-VENUE-01",
                  name: "Banquet Hall & Floorplan Slot Scheduler",
                  status: "Operational",
                  capabilityId: "D06.01.01",
                  desc: "Provides 3D seating walkthrough, air-conditioned banquet capacity locks, and morning/evening date slot reservations.",
                  endpoint: "/api/v1/hyperlocal/venues/slots",
                },
                {
                  id: "SVC-CATER-02",
                  name: "Artisan Gourmet Catering & Menu Quoter",
                  status: "Operational",
                  capabilityId: "D06.01.01",
                  desc: "Dynamic per-plate pricing calculation based on guest count, multi-cuisine selection (South Indian, Chettinad, Continental), and live cooking counters.",
                  endpoint: "/api/v1/hyperlocal/catering/rfq",
                },
                {
                  id: "SVC-AV-03",
                  name: "Stage Lighting & Pro Sound Technician Dispatch",
                  status: "Operational",
                  capabilityId: "D06.01.01",
                  desc: "Line array sound systems, dynamic LED moving heads, truss installation, and certified technician on-site presence.",
                  endpoint: "/api/v1/hyperlocal/av/dispatch",
                },
                {
                  id: "SVC-PHOTO-04",
                  name: "Cinematic Photography & Drone Videography",
                  status: "Operational",
                  capabilityId: "D06.01.01",
                  desc: "Portfolio showcases, raw 4K footage delivery pipelines, aerial drone permits, and candid shooter crew reservations.",
                  endpoint: "/api/v1/hyperlocal/media/portfolio",
                },
                {
                  id: "SVC-ESCROW-05",
                  name: "Multi-Seller Milestone Escrow & Split Settlement",
                  status: "Operational",
                  capabilityId: "D06.02.08",
                  desc: "Automates split fund allocation, deposit withholding, and automated release upon event entry verification.",
                  endpoint: "/api/v1/hyperlocal/settlement/escrow",
                },
                {
                  id: "SVC-ADAPT-06",
                  name: `${selectedPlatform} Multi-Vendor Bridge`,
                  status: "Operational",
                  capabilityId: "D06.02.15",
                  desc: `Synchronizes vendor catalogs, orders, inventory locks, and billing invoices into ${selectedPlatform}.`,
                  endpoint: `/api/v1/adapters/${selectedPlatform.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
                },
              ].map((svc) => (
                <div
                  key={svc.id}
                  className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-[#00e3fd] px-2 py-0.5 rounded bg-[#00e3fd]/10 border border-[#00e3fd]/20">
                        {svc.id}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {svc.status}
                      </span>
                    </div>
                    <strong className="text-sm font-bold text-[#eaf7ff] block">
                      {svc.name}
                    </strong>
                    <p className="text-xs text-[#82a5bb] mt-1 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#00dfff]/10 flex items-center justify-between text-[11px] font-mono text-[#6e9bb3]">
                    <span>Contract: {svc.capabilityId}</span>
                    <span className="text-[#00dfff]">{svc.endpoint}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: PROVIDERS / CATALOG
           ========================================================================= */}
        {activeTab === "providers" && (
          <div className="p-6 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-6 animate-in fade-in">
            <div className="pb-3 border-b border-[#00dfff]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[#eaf7ff] font-mono">
                  Local Provider Network & Registry
                </h3>
                <p className="text-xs text-[#82a5bb] mt-0.5">
                  Verified vendor partners in the Coimbatore & South India
                  regional service zone.
                </p>
              </div>
              <span className="text-xs font-mono text-[#00dfff] bg-[#00dfff]/10 px-2.5 py-1 rounded-lg border border-[#00dfff]/20">
                Coimbatore Regional Grid
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Coimbatore Grand Convention & Banquet Palace",
                  category: "Banquet Hall & Lawns",
                  rating: 4.9,
                  location: "Avinashi Road, Coimbatore (641018)",
                  specs: "Capacity: 1,200 Guests | AC Hall | 250 Car Parking",
                  status: "Verified Partner",
                  pricing: "₹85,000 / Session Base",
                },
                {
                  name: "Kovai Gourmet Catering Consortium",
                  category: "Artisanal Catering",
                  rating: 4.95,
                  location: "RS Puram, Coimbatore (641002)",
                  specs: "Vegetarian & Non-Vegetarian | 3,500 Plates/Day SLA",
                  status: "Verified Partner",
                  pricing: "From ₹350 / Plate",
                },
                {
                  name: "Kanyakumari Stage Acoustics & Dynamic Illumination",
                  category: "Sound & Lighting Tech",
                  rating: 4.85,
                  location: "Gandhipuram Hub & South Coastal Corridor",
                  specs: "JBL Line Array | Truss Rigging | Moving Head LED",
                  status: "Verified Partner",
                  pricing: "₹35,000 / Event Setup",
                },
                {
                  name: "LensCraft Cinematic Wedding Studio",
                  category: "Photography & Aerial Drone",
                  rating: 4.9,
                  location: "Race Course, Coimbatore (641018)",
                  specs: "Sony FX3 Cinema Rigs | DJI Inspire 3 Drone Crew",
                  status: "Verified Partner",
                  pricing: "₹60,000 / Day Coverage",
                },
              ].map((provider, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono text-[#00dfff] font-bold">
                        {provider.category}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                        {provider.status}
                      </span>
                    </div>
                    <strong className="text-sm text-[#eaf7ff] block font-bold">
                      {provider.name}
                    </strong>
                    <div className="flex items-center gap-1.5 text-xs text-[#6e9bb3] mt-1 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-[#00e3fd]" />
                      <span>{provider.location}</span>
                    </div>
                    <p className="text-xs text-[#82a5bb] mt-1.5">
                      {provider.specs}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#00dfff]/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-bold">
                      ★ {provider.rating} / 5.0
                    </span>
                    <span className="text-[#00e3fd] font-bold">
                      {provider.pricing}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: LOCATION & RADIUS
           ========================================================================= */}
        {activeTab === "location" && (
          <div className="p-6 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-6 animate-in fade-in">
            <div className="pb-3 border-b border-[#00dfff]/15">
              <h3 className="text-base font-bold text-[#eaf7ff] font-mono">
                Geospatial Radius & Regional Zones
              </h3>
              <p className="text-xs text-[#82a5bb] mt-0.5">
                Active geo-coordinates, pincode coverage clusters, and
                cross-district corridors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-2">
                <span className="text-xs font-mono text-[#00dfff] font-bold block">
                  Primary Urban Hub
                </span>
                <strong className="text-base text-[#eaf7ff] block">
                  Coimbatore Central Hub
                </strong>
                <p className="text-xs text-[#82a5bb]">
                  Core metropolitan coverage including RS Puram, Gandhipuram,
                  Peelamedu, Race Course, and Saravanampatti.
                </p>
                <div className="pt-2 text-[11px] font-mono text-[#6e9bb3]">
                  Pincodes: 641001, 641002, 641018, 641004
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-2">
                <span className="text-xs font-mono text-[#00dfff] font-bold block">
                  Suburban Expansion Corridor
                </span>
                <strong className="text-base text-[#eaf7ff] block">
                  Pollachi & Tiruppur Belt
                </strong>
                <p className="text-xs text-[#82a5bb]">
                  High-capacity destination wedding venues, agricultural event
                  lawns, and textile convention facilities within 45km.
                </p>
                <div className="pt-2 text-[11px] font-mono text-[#6e9bb3]">
                  Transit Time: 30 - 45 mins
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-2">
                <span className="text-xs font-mono text-[#00dfff] font-bold block">
                  South Coastal Sister Hub
                </span>
                <strong className="text-base text-[#eaf7ff] block">
                  Kanyakumari Coastal Zone
                </strong>
                <p className="text-xs text-[#82a5bb]">
                  Specialized coastal sound production, beachfront wedding
                  venues, and regional audio-visual technician roster.
                </p>
                <div className="pt-2 text-[11px] font-mono text-[#6e9bb3]">
                  Network Type: Inter-district Service Node
                </div>
              </div>
            </div>

            {/* Simulated Geospatial Map Radar Frame */}
            <div className="p-5 rounded-2xl bg-[#010a14] border border-[#00dfff]/20 text-center font-mono">
              <div className="flex items-center justify-between text-xs text-[#6e9bb3] mb-3">
                <span>RADAR GEO-SURFACE SIMULATION</span>
                <span className="text-[#00e3fd]">
                  Active Radius: {operationalRadius}km Ring
                </span>
              </div>
              <div className="h-44 rounded-xl bg-gradient-to-b from-[#021323] to-[#010810] border border-[#00dfff]/15 relative overflow-hidden flex items-center justify-center">
                {/* Concentric radar rings */}
                <div className="absolute w-32 h-32 rounded-full border border-[#00dfff]/20" />
                <div className="absolute w-64 h-64 rounded-full border border-[#00dfff]/20" />
                <div className="absolute w-96 h-96 rounded-full border border-[#00dfff]/10" />

                {/* Center marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#00e3fd] shadow-[0_0_12px_#00e3fd] animate-ping" />
                  <span className="text-xs font-bold text-[#eaf7ff] mt-2">
                    Coimbatore HQ
                  </span>
                  <span className="text-[10px] text-[#00dfff]">
                    11.0168° N, 76.9558° E
                  </span>
                </div>

                {/* Simulated Provider Nodes */}
                <div className="absolute top-1/4 left-1/3 flex items-center gap-1 text-[10px] text-emerald-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Banquet Hub (8km)</span>
                </div>
                <div className="absolute bottom-1/3 right-1/4 flex items-center gap-1 text-[10px] text-emerald-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Kovai Caterers (12km)</span>
                </div>
                <div className="absolute top-1/3 right-1/3 flex items-center gap-1 text-[10px] text-emerald-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>LensCraft (4km)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: AVAILABILITY ENGINE
           ========================================================================= */}
        {activeTab === "availability" && (
          <div className="p-6 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-6 animate-in fade-in">
            <div className="pb-3 border-b border-[#00dfff]/15 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#eaf7ff] font-mono">
                  Real-Time Slot Calendar & Availability Engine
                </h3>
                <p className="text-xs text-[#82a5bb] mt-0.5">
                  Live multi-seller slot locking, collision detection, and
                  instant session holds.
                </p>
              </div>
              <span className="text-xs font-mono text-[#00dfff] bg-[#00dfff]/10 px-2 py-1 rounded border border-[#00dfff]/20">
                Lock Protocol: Two-Phase Lock (2PL)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 font-mono text-xs">
              {[
                {
                  day: "Mon, Oct 12",
                  morning: "Available",
                  evening: "Booked",
                  date: "12",
                },
                {
                  day: "Tue, Oct 13",
                  morning: "Available",
                  evening: "Available",
                  date: "13",
                },
                {
                  day: "Wed, Oct 14",
                  morning: "Inquiry Lock",
                  evening: "Available",
                  date: "14",
                },
                {
                  day: "Thu, Oct 15",
                  morning: "Available",
                  evening: "Booked",
                  date: "15",
                },
                {
                  day: "Fri, Oct 16",
                  morning: "Booked",
                  evening: "Booked",
                  date: "16",
                },
                {
                  day: "Sat, Oct 17",
                  morning: "Booked",
                  evening: "Booked",
                  date: "17",
                },
                {
                  day: "Sun, Oct 18",
                  morning: "Booked",
                  evening: "Inquiry Lock",
                  date: "18",
                },
              ].map((slot, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-2 flex flex-col justify-between"
                >
                  <div className="text-center pb-1 border-b border-[#00dfff]/10">
                    <span className="text-[#82a5bb] text-[10px] block">
                      {slot.day}
                    </span>
                    <strong className="text-lg text-[#eaf7ff]">
                      {slot.date}
                    </strong>
                  </div>
                  <div className="space-y-1 text-[10px]">
                    <div
                      className={`p-1 rounded text-center ${
                        slot.morning === "Available"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : slot.morning === "Inquiry Lock"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      AM: {slot.morning}
                    </div>
                    <div
                      className={`p-1 rounded text-center ${
                        slot.evening === "Available"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : slot.evening === "Inquiry Lock"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      PM: {slot.evening}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: WORKFLOW PIPELINE SIMULATION
           ========================================================================= */}
        {activeTab === "workflow" && (
          <div className="p-6 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-6 animate-in fade-in">
            <div className="pb-3 border-b border-[#00dfff]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-[#eaf7ff] font-mono">
                  Interactive End-to-End Execution Simulator
                </h3>
                <p className="text-xs text-[#82a5bb] mt-0.5">
                  Walk through the entire transaction lifecycle from user
                  booking inquiry to automated escrow payout.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetSimulation}
                  className="px-3 py-1.5 rounded-lg bg-[#031b31] border border-[#00dfff]/25 text-xs font-mono text-[#82a5bb] hover:text-[#eaf7ff] cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#00e3fd] text-[#020914] font-mono text-xs font-bold hover:bg-[#51dfff] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>
                    {isSimulating
                      ? "Executing Pipeline..."
                      : "Run Pipeline Simulation"}
                  </span>
                </button>
              </div>
            </div>

            {/* Pipeline Stage Steps */}
            <div className="space-y-3 font-mono">
              {[
                {
                  step: 1,
                  title: "Step 1: Customer Intent & Event Scope Intake",
                  detail:
                    "Client specifies: Wedding Reception | Date: Oct 18 PM | Guest Count: 500 | Radius: Coimbatore 35km.",
                  status: simulationStep >= 1 ? "COMPLETED" : "PENDING",
                },
                {
                  step: 2,
                  title:
                    "Step 2: Geospatial Geofence Query & Provider Matching",
                  detail: `Matched 4 local venues, 3 certified caterers, and 2 AV technicians within ${operationalRadius}km.`,
                  status: simulationStep >= 2 ? "COMPLETED" : "PENDING",
                },
                {
                  step: 3,
                  title:
                    "Step 3: Multi-Party RFQ Compilation & Unified Price Card",
                  detail:
                    "Automated itemized quotation generated: Venue (₹85k) + Gourmet Catering (₹1.75L) + Sound/Light (₹35k) + Photo (₹60k). Total: ₹3.55 Lakhs.",
                  status: simulationStep >= 3 ? "COMPLETED" : "PENDING",
                },
                {
                  step: 4,
                  title: `Step 4: ${selectedPlatform} Checkout & Escrow Authorization`,
                  detail: `Customer authorizes booking via ${selectedPlatform} adapter. 30% deposit (₹1.065 Lakhs) secured in platform escrow ledger.`,
                  status: simulationStep >= 4 ? "COMPLETED" : "PENDING",
                },
                {
                  step: 5,
                  title: "Step 5: Vendor Slot Locks & Milestone Check-in OTP",
                  detail:
                    "Calendar locks confirmed. Customer and vendor receive event day check-in OTP for arrival validation.",
                  status: simulationStep >= 5 ? "COMPLETED" : "PENDING",
                },
                {
                  step: 6,
                  title:
                    "Step 6: Event Completion & Automated Split Settlement",
                  detail: `Event concludes. Platform fee (${commissionRate}%) deducted. Net balances dispatched directly to individual vendor UPI accounts.`,
                  status: simulationStep >= 6 ? "COMPLETED" : "PENDING",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className={`p-4 rounded-xl border transition-all ${
                    simulationStep === item.step
                      ? "bg-[#00e3fd]/10 border-[#00e3fd] shadow-[0_0_15px_rgba(0,227,253,0.2)]"
                      : simulationStep > item.step
                        ? "bg-[#031b31]/80 border-emerald-500/30"
                        : "bg-[#020e1a]/50 border-[#00dfff]/10 opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <strong
                      className={`text-xs font-bold ${
                        simulationStep >= item.step
                          ? "text-[#eaf7ff]"
                          : "text-[#82a5bb]"
                      }`}
                    >
                      {item.title}
                    </strong>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        item.status === "COMPLETED"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : simulationStep === item.step
                            ? "bg-[#00e3fd]/20 text-[#00e3fd] animate-pulse"
                            : "bg-[#02101e] text-[#6e9bb3]"
                      }`}
                    >
                      {simulationStep === item.step
                        ? "RUNNING..."
                        : item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#82a5bb] mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: MONITORING & TELEMETRY
           ========================================================================= */}
        {activeTab === "monitoring" && (
          <div className="p-6 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-6 animate-in fade-in">
            <div className="pb-3 border-b border-[#00dfff]/15">
              <h3 className="text-base font-bold text-[#eaf7ff] font-mono">
                Real-Time Telemetry & SLA Metrics
              </h3>
              <p className="text-xs text-[#82a5bb] mt-0.5">
                Key performance indicators for the Hyperlocal Event Marketplace
                reference architecture.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15">
                <span className="text-[11px] text-[#6e9bb3] uppercase block">
                  Provider Matching Latency
                </span>
                <strong className="text-2xl text-[#00e3fd] font-bold block mt-1">
                  42 ms
                </strong>
                <span className="text-[10px] text-emerald-400">
                  Within &lt; 50ms SLA target
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15">
                <span className="text-[11px] text-[#6e9bb3] uppercase block">
                  Quotation Generation
                </span>
                <strong className="text-2xl text-[#00e3fd] font-bold block mt-1">
                  1.2 sec
                </strong>
                <span className="text-[10px] text-emerald-400">
                  Multi-seller price assembly
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15">
                <span className="text-[11px] text-[#6e9bb3] uppercase block">
                  Escrow Ledger Accuracy
                </span>
                <strong className="text-2xl text-emerald-400 font-bold block mt-1">
                  100.0%
                </strong>
                <span className="text-[10px] text-[#6e9bb3]">
                  Zero reconciliation drift
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15">
                <span className="text-[11px] text-[#6e9bb3] uppercase block">
                  Active Service Uptime
                </span>
                <strong className="text-2xl text-emerald-400 font-bold block mt-1">
                  99.98%
                </strong>
                <span className="text-[10px] text-[#6e9bb3]">
                  High-availability multi-zone
                </span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: NEXT STEPS & BLUEPRINT EXPORT
           ========================================================================= */}
        {activeTab === "next_steps" && (
          <div className="p-6 rounded-2xl bg-[#021323]/90 border border-[#00dfff]/20 space-y-6 animate-in fade-in">
            <div className="pb-3 border-b border-[#00dfff]/15">
              <h3 className="text-base font-bold text-[#eaf7ff] font-mono">
                Production Deployment & Export Roadmap
              </h3>
              <p className="text-xs text-[#82a5bb] mt-0.5">
                Clearly distinguishes available sandbox configuration from
                future operational deployment phases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-[#eaf7ff]">
                    1. Export Architecture Spec
                  </strong>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    AVAILABLE NOW
                  </span>
                </div>
                <p className="text-[#82a5bb] leading-relaxed">
                  Download the complete JSON manifest specifying all 6 layers of
                  the Hyperlocal Event Marketplace, platform adapter mappings,
                  and escrow configurations.
                </p>
                <button
                  onClick={handleCopyBlueprint}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#00e3fd] text-[#020914] font-bold hover:bg-[#51dfff] cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Manifest (JSON)</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#031b31]/60 border border-[#00dfff]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-[#eaf7ff]">
                    2. Live Container Deployment
                  </strong>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                    FUTURE CAPABILITY
                  </span>
                </div>
                <p className="text-[#82a5bb] leading-relaxed">
                  Direct provisioning to Cloud Run with attached PostgreSQL
                  database, Redis session buffer, and production Zoho/Shopify
                  webhook credentials.
                </p>
                <button
                  disabled
                  className="w-full py-2 rounded-lg bg-[#02101e] border border-[#00dfff]/20 text-[#6e9bb3] cursor-not-allowed text-center"
                >
                  Provision Cloud Infrastructure (Roadmap)
                </button>
              </div>
            </div>

            {/* Breadcrumb drill-back invitation */}
            <div className="p-4 rounded-xl bg-[#020f1c] border border-[#00dfff]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div>
                <strong className="text-[#eaf7ff] block">
                  Finished with Execution Workspace?
                </strong>
                <span className="text-[#82a5bb]">
                  Step back to L5 (Understand Solution) or return to the AAi
                  Universe galaxy map.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onBackToSolution}
                  className="px-3.5 py-2 rounded-lg bg-[#031b31] border border-[#00dfff]/30 text-[#00dfff] hover:text-[#eaf7ff] cursor-pointer"
                >
                  ← Return to L5 Solution
                </button>
                <button
                  onClick={onBackToUniverse}
                  className="px-3.5 py-2 rounded-lg bg-[#00e3fd] text-[#020914] font-bold hover:bg-[#51dfff] cursor-pointer"
                >
                  ← Back to AAi Universe
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
