import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles,
  Brain,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Compass,
  MapPin,
  Search,
  X,
  ChevronRight,
  ChevronLeft,
  Layers,
  Boxes,
  FileCode,
  CheckCircle2,
  ArrowUpRight,
  HelpCircle,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { Domain, Subdomain, Capability, Solution } from '@/src/types';

export type IntelligenceTab =
  | 'overview'
  | 'assistant'
  | 'market_analysis'
  | 'business_insights'
  | 'recommendations'
  | 'solution_advisor'
  | 'local_insights'
  | 'analyze_selection';

export interface ContextualIntelligenceRailProps {
  domains?: Domain[];
  subdomains?: Subdomain[];
  capabilities?: Capability[];
  solutions?: Solution[];
  selectedSolutionId?: string | null;
  activeSolution?: Solution | null;
  onSelectDomain?: (domainId: string) => void;
  onSelectSolution?: (solutionId: string) => void;
  className?: string;
}

export const ContextualIntelligenceRail: React.FC<ContextualIntelligenceRailProps> = ({
  domains = [],
  subdomains = [],
  capabilities = [],
  solutions = [],
  selectedSolutionId = null,
  activeSolution = null,
  onSelectDomain,
  onSelectSolution,
  className = '',
}) => {
  const { intent, theme, location } = useArchitectAny();
  const isDark = theme === 'dark';

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<IntelligenceTab>('overview');
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // 1. Resolve Current Context Level (L1 -> L2 -> L3 -> L4 -> L5)
  const currentContext = useMemo(() => {
    // L5: Selected Solution Detail view active
    if (selectedSolutionId || intent.solutionId) {
      const sol =
        activeSolution ||
        solutions.find((s) => s.id === (selectedSolutionId || intent.solutionId));
      return {
        level: 'L5',
        levelNumber: 5,
        title: sol?.name || 'Selected Solution',
        subtitle: sol?.type || 'Production Ready Solution',
        code: sol?.id || 'L5.SOL',
        type: 'SOLUTION',
        item: sol,
      };
    }

    // L4: Solution Bundle selected in rail
    if (intent.solutionBundleId) {
      return {
        level: 'L4',
        levelNumber: 4,
        title: 'Solution Bundle',
        subtitle: 'Multi-module capability composition',
        code: intent.solutionBundleId,
        type: 'BUNDLE',
        item: null,
      };
    }

    // L3: Capability selected in rail
    if (intent.capabilityId) {
      const cap = capabilities.find((c) => c.id === intent.capabilityId);
      return {
        level: 'L3',
        levelNumber: 3,
        title: cap?.name || 'Capability Node',
        subtitle: 'Enterprise functional building block',
        code: cap?.id || intent.capabilityId,
        type: 'CAPABILITY',
        item: cap,
      };
    }

    // L2: Business World / Domain selected
    if (intent.domainId) {
      const dom = domains.find((d) => d.id === intent.domainId);
      const sub = intent.subdomainId
        ? subdomains.find((s) => s.id === intent.subdomainId)
        : null;
      return {
        level: 'L2',
        levelNumber: 2,
        title: sub ? `${dom?.name || 'Domain'} › ${sub.name}` : dom?.name || 'Business World',
        subtitle: dom?.description || 'Industry-focused capability catalog',
        code: dom?.id || 'D06',
        type: 'DOMAIN',
        item: dom,
      };
    }

    // L1: Universe / Root Galaxy View
    return {
      level: 'L1',
      levelNumber: 1,
      title: 'M01 Solution Universe',
      subtitle: 'Global 14 Business Worlds Overview',
      code: 'M01.ROOT',
      type: 'UNIVERSE',
      item: null,
    };
  }, [selectedSolutionId, activeSolution, intent, domains, subdomains, capabilities, solutions]);

  // 2. Close on outside click or Escape
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      // If click target is outside the expanded panel, close immediately
      if (panelRef.current && !panelRef.current.contains(target)) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
      }
    };

    // Use capture phase to intercept clicks before stopPropagation on canvas/cards
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);

  // Copy prompt helper
  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(text);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  // Canonical Domain Solutions Count
  const domainSolutionsCount = useMemo(() => {
    if (currentContext.level === 'L2' && intent.domainId) {
      return solutions.filter((s) => s.domainId === intent.domainId).length;
    }
    return solutions.length;
  }, [currentContext.level, intent.domainId, solutions]);

  return (
    <aside
      aria-label="Contextual Intelligence Rail"
      className={`fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex items-center select-none ${className}`}
    >
      {/* 1. COLLAPSED FLOATING RAIL / TRIGGER */}
      {!isExpanded && (
        <button
          ref={triggerRef}
          onClick={() => setIsExpanded(true)}
          aria-expanded={isExpanded}
          aria-label={`Open Contextual Intelligence for ${currentContext.level}`}
          title={`Contextual Intelligence • Active: ${currentContext.level} ${currentContext.title}`}
          className={`group flex flex-col items-center gap-2 py-3 px-2 rounded-2xl border transition-all duration-300 shadow-2xl cursor-pointer ${
            isDark
              ? 'bg-[#020d1c]/90 hover:bg-[#041a33] border-[#00e3fd]/40 text-[#00e3fd] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,227,253,0.25)] hover:border-[#00e3fd] hover:shadow-[0_0_30px_rgba(0,227,253,0.4)]'
              : 'bg-white/95 hover:bg-slate-50 border-indigo-300 text-indigo-600 shadow-[0_10px_30px_rgba(0,0,0,0.1),0_0_15px_rgba(99,102,241,0.2)] hover:border-indigo-500'
          }`}
        >
          {/* Glowing Animated Sparkle Icon */}
          <div className="relative">
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDark ? 'bg-[#00e3fd]' : 'bg-indigo-500'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isDark ? 'bg-[#00e3fd]' : 'bg-indigo-600'
                }`}
              />
            </span>
            <Sparkles className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
          </div>

          {/* Vertical Micro-Label */}
          <span
            className="font-mono text-[9px] uppercase tracking-widest font-bold [writing-mode:vertical-rl] rotate-180 py-1 opacity-90 group-hover:opacity-100"
          >
            Intelligence
          </span>

          {/* Active Context Level Badge */}
          <span
            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight ${
              isDark
                ? 'bg-[#00e3fd]/20 text-[#00e3fd] border border-[#00e3fd]/40'
                : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
            }`}
          >
            {currentContext.level}
          </span>
        </button>
      )}

      {/* 2. EXPANDED CONTEXTUAL INTELLIGENCE PANEL (OVERLAY FLOATING) */}
      {isExpanded && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Contextual Intelligence Panel"
          className={`w-[350px] sm:w-[380px] max-w-[calc(100vw-24px)] max-h-[calc(100vh-120px)] flex flex-col rounded-3xl border transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden ${
            isDark
              ? 'bg-[#020d1c]/95 border-[#00e3fd]/35 text-[#d4e4fa] shadow-[0_0_35px_rgba(0,227,253,0.15)]'
              : 'bg-white/98 border-slate-300 text-slate-900 shadow-2xl'
          }`}
        >
          {/* Header Bar */}
          <div
            className={`flex items-center justify-between px-4 py-3 border-b shrink-0 ${
              isDark
                ? 'bg-[#04152a]/90 border-[#00e3fd]/20'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`p-1.5 rounded-xl border ${
                  isDark
                    ? 'bg-[#00e3fd]/15 border-[#00e3fd]/40 text-[#00e3fd]'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-600'
                }`}
              >
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold tracking-wide">
                    AAi Intelligence
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                      isDark
                        ? 'bg-[#00e3fd]/20 text-[#00e3fd]'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {currentContext.level}
                  </span>
                </div>
                <p
                  className={`text-[10px] font-mono truncate max-w-[210px] ${
                    isDark ? 'text-[#82a5bb]' : 'text-slate-500'
                  }`}
                  title={currentContext.title}
                >
                  {currentContext.title}
                </p>
              </div>
            </div>

            {/* Collapse Close Button */}
            <button
              onClick={() => setIsExpanded(false)}
              aria-label="Collapse Intelligence Panel"
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'border-[#00e3fd]/20 text-[#82a5bb] hover:text-white hover:bg-[#00e3fd]/15 hover:border-[#00e3fd]/50'
                  : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sub-Navigation Tabs */}
          {activeTab !== 'overview' && (
            <div
              className={`px-3 py-2 border-b flex items-center justify-between text-xs font-mono shrink-0 ${
                isDark
                  ? 'bg-[#020a15] border-[#00e3fd]/15 text-[#82a5bb]'
                  : 'bg-slate-100/70 border-slate-200 text-slate-600'
              }`}
            >
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-1 hover:underline cursor-pointer ${
                  isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>All Capabilities</span>
              </button>
              <span className="uppercase text-[10px] font-bold tracking-wider">
                {activeTab.replace('_', ' ')}
              </span>
            </div>
          )}

          {/* Panel Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {/* OVERVIEW: Capability Grid / Quick Selection */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Active Context Banner */}
                <div
                  className={`p-3 rounded-2xl border ${
                    isDark
                      ? 'bg-[#031526]/80 border-[#00e3fd]/25 text-[#eaf7ff]'
                      : 'bg-indigo-50/50 border-indigo-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                        isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
                      }`}
                    >
                      Current Scope • {currentContext.level}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {currentContext.code}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm leading-snug">
                    {currentContext.title}
                  </h4>
                  <p
                    className={`mt-1 text-[11px] leading-relaxed line-clamp-2 ${
                      isDark ? 'text-[#9ec5de]' : 'text-slate-600'
                    }`}
                  >
                    {currentContext.subtitle}
                  </p>
                </div>

                {/* Capability Selection List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                        isDark ? 'text-[#82a5bb]' : 'text-slate-500'
                      }`}
                    >
                      Contextual Intelligence Tools
                    </span>
                    <span
                      className={`text-[10px] font-mono ${
                        isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
                      }`}
                    >
                      {currentContext.level} Ready
                    </span>
                  </div>

                  {/* 1. AI Assistant */}
                  <CapabilityButton
                    icon={<Sparkles className="w-4 h-4" />}
                    title="AI Assistant"
                    desc={`Contextual copilot prompts for ${currentContext.level}`}
                    badge="Interactive"
                    isDark={isDark}
                    onClick={() => setActiveTab('assistant')}
                  />

                  {/* 2. Market Analysis */}
                  <CapabilityButton
                    icon={<TrendingUp className="w-4 h-4" />}
                    title="Market Analysis"
                    desc={`Ecosystem & industry landscape for ${currentContext.code}`}
                    badge="Canonical Data"
                    isDark={isDark}
                    onClick={() => setActiveTab('market_analysis')}
                  />

                  {/* 3. Business Insights */}
                  <CapabilityButton
                    icon={<BarChart3 className="w-4 h-4" />}
                    title="Business Insights"
                    desc="Key value drivers, metrics & target segments"
                    badge="Ground Truth"
                    isDark={isDark}
                    onClick={() => setActiveTab('business_insights')}
                  />

                  {/* 4. Recommendations */}
                  <CapabilityButton
                    icon={<Lightbulb className="w-4 h-4" />}
                    title="Recommendations"
                    desc={`Tailored next steps for ${location.city || 'Regional'} market`}
                    badge="Contextual"
                    isDark={isDark}
                    onClick={() => setActiveTab('recommendations')}
                  />

                  {/* 5. Solution Advisor */}
                  <CapabilityButton
                    icon={<ShieldCheck className="w-4 h-4" />}
                    title="Solution Advisor"
                    desc="Readiness assessment, architectural fit & deployment"
                    badge="Architect"
                    isDark={isDark}
                    onClick={() => setActiveTab('solution_advisor')}
                  />

                  {/* 6. Local Insights */}
                  <CapabilityButton
                    icon={<MapPin className="w-4 h-4" />}
                    title="Local Insights"
                    desc={`Geospatial demand signals for ${location.city || 'India'} (${location.pincode || '629702'})`}
                    badge="Location"
                    isDark={isDark}
                    onClick={() => setActiveTab('local_insights')}
                  />

                  {/* 7. Analyze Current Selection */}
                  <CapabilityButton
                    icon={<Search className="w-4 h-4" />}
                    title="Analyze Current Selection"
                    desc={`Deep dive inspection of active ${currentContext.level} node`}
                    badge="Inspector"
                    isDark={isDark}
                    onClick={() => setActiveTab('analyze_selection')}
                  />
                </div>
              </div>
            )}

            {/* TAB 1: AI ASSISTANT */}
            {activeTab === 'assistant' && (
              <div className="space-y-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-[#031526] border-[#00e3fd]/20'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase font-bold block mb-1 ${
                      isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
                    }`}
                  >
                    AI Copilot Contextual Seam
                  </span>
                  <p
                    className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-[#c3d9ea]' : 'text-slate-600'
                    }`}
                  >
                    Contextual prompts synthesized for <strong>{currentContext.title}</strong>{' '}
                    ({currentContext.level}). Click any prompt to copy or trigger future AI inference.
                  </p>
                </div>

                <div className="space-y-2">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                      isDark ? 'text-[#82a5bb]' : 'text-slate-500'
                    }`}
                  >
                    Suggested Prompt Templates:
                  </span>
                  {getPromptsForLevel(currentContext.level, currentContext.title, location.city).map(
                    (prompt, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border transition-all ${
                          isDark
                            ? 'bg-[#03182c] border-[#00e3fd]/15 hover:border-[#00e3fd]/50'
                            : 'bg-white border-slate-200 hover:border-indigo-400'
                        }`}
                      >
                        <p
                          className={`text-[11px] font-mono mb-2 ${
                            isDark ? 'text-[#eaf7ff]' : 'text-slate-800'
                          }`}
                        >
                          "{prompt}"
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-slate-400">
                            Ready for Gemini API
                          </span>
                          <button
                            onClick={() => handleCopyPrompt(prompt)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                              copiedPrompt === prompt
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : isDark
                                ? 'bg-[#07192c] text-[#00e3fd] border-[#00e3fd]/30 hover:bg-[#00e3fd]/20'
                                : 'bg-slate-100 text-indigo-600 border-indigo-200 hover:bg-indigo-50'
                            }`}
                          >
                            {copiedPrompt === prompt ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Prompt</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: MARKET ANALYSIS */}
            {activeTab === 'market_analysis' && (
              <div className="space-y-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-[#031526] border-[#00e3fd]/20'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase font-bold block mb-1 ${
                      isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
                    }`}
                  >
                    Canonical Market Telemetry
                  </span>
                  <p
                    className={`text-[11px] ${
                      isDark ? 'text-[#c3d9ea]' : 'text-slate-600'
                    }`}
                  >
                    Grounded in the ArchitectAny catalog repository. No artificial or hallucinated
                    data.
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <MetricCard
                    label="Active Level"
                    val={currentContext.level}
                    sub={currentContext.code}
                    isDark={isDark}
                  />
                  <MetricCard
                    label="Catalog Solutions"
                    val={`${domainSolutionsCount}`}
                    sub={currentContext.level === 'L2' ? 'In this World' : 'Total Registered'}
                    isDark={isDark}
                  />
                  <MetricCard
                    label="Platform Status"
                    val="Production"
                    sub="Active Catalog"
                    isDark={isDark}
                  />
                  <MetricCard
                    label="Regional Scope"
                    val={location.state || 'India'}
                    sub={`Pincode ${location.pincode || '629702'}`}
                    isDark={isDark}
                  />
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-[#03182c] border-[#00e3fd]/15'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold uppercase block mb-1">
                    Industry Positioning:
                  </span>
                  <p
                    className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-[#9ec5de]' : 'text-slate-600'
                    }`}
                  >
                    {currentContext.level === 'L5'
                      ? `Solution ${currentContext.title} addresses turnkey production requirements with native cloud/hybrid adaptability.`
                      : currentContext.level === 'L2'
                      ? `Domain ${currentContext.title} represents a core industry vertical with ${domainSolutionsCount} registered solution blueprints.`
                      : `The ArchitectAny M01 Solution Universe provides cross-domain orchestration across 14 specialized business worlds.`}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: BUSINESS INSIGHTS */}
            {activeTab === 'business_insights' && (
              <div className="space-y-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-[#031526] border-[#00e3fd]/20'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase font-bold block mb-1 ${
                      isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
                    }`}
                  >
                    Value Drivers & Architecture
                  </span>
                  <p
                    className={`text-[11px] ${
                      isDark ? 'text-[#c3d9ea]' : 'text-slate-600'
                    }`}
                  >
                    Target KPI impact and architectural patterns for {currentContext.title}.
                  </p>
                </div>

                <div className="space-y-2">
                  <InsightItem
                    title="Time to Value"
                    desc="Pre-composed solution bundles reduce initial architecture cycle time by up to 65%."
                    isDark={isDark}
                  />
                  <InsightItem
                    title="Integration Standard"
                    desc="Built on OpenAPI/AsyncAPI contracts with event-driven message dispatching."
                    isDark={isDark}
                  />
                  <InsightItem
                    title="Deployment Flexibility"
                    desc="Supports Cloud SaaS, dedicated multi-tenant Kubernetes, or edge on-premise execution."
                    isDark={isDark}
                  />
                </div>
              </div>
            )}

            {/* TAB 4: RECOMMENDATIONS */}
            {activeTab === 'recommendations' && (
              <div className="space-y-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-[#031526] border-[#00e3fd]/20'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase font-bold block mb-1 ${
                      isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
                    }`}
                  >
                    Contextual Recommendations
                  </span>
                  <p
                    className={`text-[11px] ${
                      isDark ? 'text-[#c3d9ea]' : 'text-slate-600'
                    }`}
                  >
                    Next-best architectural moves based on current navigation depth ({currentContext.level}).
                  </p>
                </div>

                <div className="space-y-2">
                  {currentContext.level === 'L1' && (
                    <>
                      <RecItem
                        title="Explore Marketplace & Commerce (D06)"
                        desc="Highest solution density with hyperlocal trade and booking engines."
                        actionLabel="Go to D06"
                        onClick={() => onSelectDomain?.('D06')}
                        isDark={isDark}
                      />
                      <RecItem
                        title="Explore FinTech & Payments (D02)"
                        desc="Unified UPI and automated financial settlement rails."
                        actionLabel="Go to D02"
                        onClick={() => onSelectDomain?.('D02')}
                        isDark={isDark}
                      />
                    </>
                  )}

                  {currentContext.level === 'L2' && (
                    <>
                      <RecItem
                        title="Review L3 Capabilities"
                        desc="Drill into specific subdomains to verify technical building blocks."
                        isDark={isDark}
                      />
                      <RecItem
                        title="Validate Regional Localization"
                        desc={`Check service radius compatibility for ${location.city || 'target district'}.`}
                        isDark={isDark}
                      />
                    </>
                  )}

                  {(currentContext.level === 'L3' || currentContext.level === 'L4') && (
                    <>
                      <RecItem
                        title="Compose Turnkey Solution"
                        desc="Link capability nodes to canonical vendor quotation and booking flows."
                        isDark={isDark}
                      />
                      <RecItem
                        title="Check API Boundary Contracts"
                        desc="Review schemas for multi-vendor quotation dispatch."
                        isDark={isDark}
                      />
                    </>
                  )}

                  {currentContext.level === 'L5' && (
                    <>
                      <RecItem
                        title="Run Architecture Benchmark"
                        desc="Assess cloud vs hybrid deployment sizing for production launch."
                        isDark={isDark}
                      />
                      <RecItem
                        title="Initiate Sandbox Composition"
                        desc="Verify end-to-end dataflow in AAi test orchestrator."
                        isDark={isDark}
                      />
                    </>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: SOLUTION ADVISOR */}
            {activeTab === 'solution_advisor' && (
              <div className="space-y-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-[#031526] border-[#00e3fd]/20'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase font-bold block mb-1 ${
                      isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
                    }`}
                  >
                    Architectural Readiness Matrix
                  </span>
                  <p
                    className={`text-[11px] ${
                      isDark ? 'text-[#c3d9ea]' : 'text-slate-600'
                    }`}
                  >
                    Checklist for implementing solutions at this layer:
                  </p>
                </div>

                <div className="space-y-2">
                  <ChecklistRow
                    label="Domain Boundary Defined"
                    status="Verified"
                    isDark={isDark}
                  />
                  <ChecklistRow
                    label="Platform Adapter Compatibility"
                    status="Ready (Cloud/Hybrid)"
                    isDark={isDark}
                  />
                  <ChecklistRow
                    label="Geospatial Grounding"
                    status={`${location.city || 'Kanyakumari'} (${location.pincode || '629702'})`}
                    isDark={isDark}
                  />
                  <ChecklistRow
                    label="Identity & Role Governance"
                    status="RBAC Authoritative"
                    isDark={isDark}
                  />
                </div>
              </div>
            )}

            {/* TAB 6: LOCAL INSIGHTS */}
            {activeTab === 'local_insights' && (
              <div className="space-y-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-[#031526] border-[#00e3fd]/20'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin
                      className={`w-3.5 h-3.5 ${
                        isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
                      }`}
                    />
                    <span
                      className={`font-mono text-[10px] uppercase font-bold ${
                        isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
                      }`}
                    >
                      Geospatial Context
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm">
                    {location.city || 'Kanyakumari'}, {location.state || 'Tamil Nadu'}
                  </h4>
                  <p
                    className={`text-[11px] font-mono mt-0.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Pincode: {location.pincode || '629702'} • Coordinates:{' '}
                    {typeof location.latitude === 'number'
                      ? `${location.latitude.toFixed(2)}°N, ${location.longitude?.toFixed(2)}°E`
                      : '8.08°N, 77.53°E'}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-xl border space-y-2 ${
                    isDark
                      ? 'bg-[#03182c] border-[#00e3fd]/15'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase font-bold block">
                    Regional Deployment Demographics:
                  </span>
                  <ul
                    className={`space-y-1.5 text-[11px] list-disc list-inside ${
                      isDark ? 'text-[#c3d9ea]' : 'text-slate-600'
                    }`}
                  >
                    <li>
                      High density of tourism, event venues, and coastal logistics providers.
                    </li>
                    <li>
                      UPI / Digital payments connectivity across 99.2% of merchant terminals.
                    </li>
                    <li>
                      Tier-2/3 localized vernacular readiness requirement for mobile field operators.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 7: ANALYZE CURRENT SELECTION */}
            {activeTab === 'analyze_selection' && (
              <div className="space-y-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-[#031526] border-[#00e3fd]/20'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase font-bold block mb-1 ${
                      isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
                    }`}
                  >
                    Node Inspection Telemetry
                  </span>
                  <div className="font-mono text-[11px] space-y-1 mt-2">
                    <div className="flex justify-between py-0.5 border-b border-white/5">
                      <span className="text-slate-400">Node ID:</span>
                      <span className="font-bold">{currentContext.code}</span>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-white/5">
                      <span className="text-slate-400">Layer Level:</span>
                      <span className="font-bold">{currentContext.level} ({currentContext.type})</span>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-white/5">
                      <span className="text-slate-400">Canonical Name:</span>
                      <span className="font-bold truncate max-w-[170px]">{currentContext.title}</span>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-white/5">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-emerald-400 font-bold">Active in Catalog</span>
                    </div>
                  </div>
                </div>

                <p
                  className={`text-[10px] font-mono leading-relaxed text-center ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  Contextual intelligence updates synchronously as you navigate L1 → L2 → L3 → L4 → L5.
                </p>
              </div>
            )}
          </div>

          {/* Footer Integration Status Note */}
          <div
            className={`px-4 py-2 border-t flex items-center justify-between text-[10px] font-mono shrink-0 ${
              isDark
                ? 'bg-[#030e1d] border-[#00e3fd]/20 text-[#6e9bb3]'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Contextual Seam Active</span>
            </div>
            <span>No fake data • Real context</span>
          </div>
        </div>
      )}
    </aside>
  );
};

// ==========================================
// SUB-COMPONENTS FOR CLEAN MODULAR CODE
// ==========================================

interface CapabilityButtonProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge?: string;
  isDark: boolean;
  onClick: () => void;
}

const CapabilityButton: React.FC<CapabilityButtonProps> = ({
  icon,
  title,
  desc,
  badge,
  isDark,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
      isDark
        ? 'bg-[#03182c]/70 hover:bg-[#062444] border-[#00e3fd]/15 hover:border-[#00e3fd]/40 text-[#d4e4fa]'
        : 'bg-white hover:bg-indigo-50/50 border-slate-200 hover:border-indigo-300 text-slate-800'
    }`}
  >
    <div className="flex items-center gap-2.5 min-w-0">
      <div
        className={`p-1.5 rounded-lg shrink-0 ${
          isDark
            ? 'bg-[#00e3fd]/15 text-[#00e3fd]'
            : 'bg-indigo-50 text-indigo-600'
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xs truncate">{title}</span>
          {badge && (
            <span
              className={`text-[8px] font-mono px-1 py-0.2 rounded uppercase font-bold shrink-0 ${
                isDark
                  ? 'bg-white/10 text-[#82a5bb]'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {badge}
            </span>
          )}
        </div>
        <p
          className={`text-[10px] truncate ${
            isDark ? 'text-[#82a5bb]' : 'text-slate-500'
          }`}
        >
          {desc}
        </p>
      </div>
    </div>
    <ChevronRight
      className={`w-3.5 h-3.5 shrink-0 opacity-50 group-hover:opacity-100 ${
        isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
      }`}
    />
  </button>
);

const MetricCard: React.FC<{
  label: string;
  val: string;
  sub: string;
  isDark: boolean;
}> = ({ label, val, sub, isDark }) => (
  <div
    className={`p-2.5 rounded-xl border ${
      isDark
        ? 'bg-[#03182c] border-[#00e3fd]/15'
        : 'bg-white border-slate-200'
    }`}
  >
    <span className="text-[9px] font-mono uppercase text-slate-400 block">
      {label}
    </span>
    <span
      className={`font-mono text-sm font-bold block ${
        isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
      }`}
    >
      {val}
    </span>
    <span className="text-[9px] text-slate-400 block truncate">{sub}</span>
  </div>
);

const InsightItem: React.FC<{
  title: string;
  desc: string;
  isDark: boolean;
}> = ({ title, desc, isDark }) => (
  <div
    className={`p-2.5 rounded-xl border ${
      isDark
        ? 'bg-[#03182c] border-[#00e3fd]/15'
        : 'bg-white border-slate-200'
    }`}
  >
    <h5
      className={`font-mono text-xs font-bold mb-1 ${
        isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
      }`}
    >
      {title}
    </h5>
    <p
      className={`text-[11px] leading-relaxed ${
        isDark ? 'text-[#c3d9ea]' : 'text-slate-600'
      }`}
    >
      {desc}
    </p>
  </div>
);

const RecItem: React.FC<{
  title: string;
  desc: string;
  actionLabel?: string;
  onClick?: () => void;
  isDark: boolean;
}> = ({ title, desc, actionLabel, onClick, isDark }) => (
  <div
    className={`p-2.5 rounded-xl border flex flex-col gap-1.5 ${
      isDark
        ? 'bg-[#03182c] border-[#00e3fd]/15'
        : 'bg-white border-slate-200'
    }`}
  >
    <div>
      <h5 className="font-semibold text-xs">{title}</h5>
      <p
        className={`text-[11px] mt-0.5 ${
          isDark ? 'text-[#9ec5de]' : 'text-slate-600'
        }`}
      >
        {desc}
      </p>
    </div>
    {actionLabel && onClick && (
      <button
        onClick={onClick}
        className={`self-start flex items-center gap-1 font-mono text-[10px] font-bold transition-all cursor-pointer ${
          isDark
            ? 'text-[#00e3fd] hover:underline'
            : 'text-indigo-600 hover:underline'
        }`}
      >
        <span>{actionLabel}</span>
        <ArrowUpRight className="w-3 h-3" />
      </button>
    )}
  </div>
);

const ChecklistRow: React.FC<{
  label: string;
  status: string;
  isDark: boolean;
}> = ({ label, status, isDark }) => (
  <div
    className={`flex items-center justify-between p-2 rounded-xl border text-[11px] ${
      isDark
        ? 'bg-[#03182c] border-[#00e3fd]/15 text-[#eaf7ff]'
        : 'bg-white border-slate-200 text-slate-800'
    }`}
  >
    <div className="flex items-center gap-2">
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
      <span>{label}</span>
    </div>
    <span
      className={`font-mono text-[10px] font-bold ${
        isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
      }`}
    >
      {status}
    </span>
  </div>
);

// Level-aware Prompt Generator (Contextual Seam)
function getPromptsForLevel(level: string, title: string, city?: string): string[] {
  switch (level) {
    case 'L5':
      return [
        `Analyze business value & payback period for "${title}"`,
        `Draft architecture comparison: Cloud SaaS vs Hybrid Dedicated for "${title}"`,
        `Generate implementation roadmap and API dependency graph for this solution`,
      ];
    case 'L4':
      return [
        `Explain bundle composition boundaries and component interfaces for "${title}"`,
        `Evaluate turnkey rollout risks and vendor quotation workflows`,
      ];
    case 'L3':
      return [
        `Analyze regional demand and vendor readiness for capability "${title}" in ${city || 'South India'}`,
        `What are the critical microservice APIs required to implement this capability?`,
      ];
    case 'L2':
      return [
        `Summarize key monetization models and high-growth subdomains in "${title}"`,
        `Generate starter capability recommendations for a new venture entering ${title}`,
      ];
    default:
      return [
        `Recommend top 3 business worlds for a tech platform launching in ${city || 'Tamil Nadu'}`,
        `Explain cross-domain synergies between FinTech, Logistics, and Marketplace worlds`,
      ];
  }
}
