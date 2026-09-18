/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: QUICK-RAIL-002
 * Status: ACTIVE
 *
 * One global navigation rail for platform application access and
 * deeper contextual navigation.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Compass, Cpu, Database, Globe2, Home, Layers, Settings2, SlidersHorizontal, Sparkles, X, Grid2X2 } from "lucide-react";
import { useArchitectAny } from "@/src/context/ArchitectAnyContext";
import { ExperienceThemeSelector } from "@/components/theme/ExperienceThemeSelector";
import { useUniversalNavigation } from "@/src/context/UniversalNavigationContext";
import type { Domain, Subdomain } from "@/src/types";

export interface ContextualNavigationRailProps {
  domains: Domain[];
  subdomains?: Subdomain[];
  selectedSolutionId?: string | null;
  isExecutionMode?: boolean;
  onSelectDomain: (domainId: string) => void;
  onResetRoot: () => void;
  onOpenIntentCore?: () => void;
  className?: string;
}

export const ContextualNavigationRail = ({
  domains,
  subdomains = [],
  selectedSolutionId = null,
  isExecutionMode = false,
  onSelectDomain,
  onResetRoot,
  onOpenIntentCore,
  className = "",
}: ContextualNavigationRailProps) => {
  const { intent, theme } = useArchitectAny();
  const { currentWaypoint, canGoBack, canGoForward, goBack, goForward, goHome } = useUniversalNavigation();
  const isDark = theme === "dark";
  const [isAppStackOpen, setIsAppStackOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const appStackPanelRef = useRef<HTMLDivElement>(null);
  const appStackTriggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const activeLevel = isExecutionMode ? "L6" : selectedSolutionId ? "L5" : intent.solutionBundleId ? "L4" : intent.capabilityId ? "L3" : intent.subdomainId || intent.domainId ? "L2" : "L1";
  const activeDomainId = intent.domainId ?? null;
  const activeDomain = useMemo(() => activeDomainId ? domains.find((domain) => domain.id === activeDomainId) ?? null : null, [activeDomainId, domains]);
  const contextualSubdomains = useMemo(() => activeDomainId ? subdomains.filter((subdomain) => subdomain.domainId === activeDomainId) : [], [activeDomainId, subdomains]);

  useEffect(() => {
    if (!isAppStackOpen && !isExpanded) return;
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (isAppStackOpen && target && appStackPanelRef.current && !appStackPanelRef.current.contains(target) && target !== appStackTriggerRef.current) setIsAppStackOpen(false);
      if (isExpanded && target && panelRef.current && !panelRef.current.contains(target) && target !== triggerRef.current) setIsExpanded(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAppStackOpen(false);
        setIsExpanded(false);
        appStackTriggerRef.current?.focus();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAppStackOpen, isExpanded]);

  const openApp = (tab: string) => {
    setIsAppStackOpen(false);
    setIsExpanded(false);
    if (tab === "Universe") {
      onResetRoot();
      return;
    }
    window.location.assign(`/preview?tab=${tab}`);
  };

  const openJson = () => {
    setIsAppStackOpen(false);
    window.dispatchEvent(new CustomEvent("aai:toggle-json-inspector"));
  };

  const openSolutionAdmin = () => {
    setIsAppStackOpen(false);
    const solutionId =
      activeLevel === "L5" && selectedSolutionId
        ? selectedSolutionId
        : intent.domainId === "NGLiving"
          ? "ngliving"
          : intent.domainId === "Parakkai"
            ? "parakkai"
            : new URLSearchParams(window.location.search).get("app") || "parakkai";
    window.location.assign("/solution-admin/" + solutionId);
  };

  return (
    <nav aria-label="AAi navigation rail" className={`fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[90] select-none ${className}`}>
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <button
            ref={appStackTriggerRef}
            type="button"
            onClick={() => {
              setIsExpanded(false);
              window.dispatchEvent(new CustomEvent("aai:close-json-inspector"));
              setIsAppStackOpen((open) => !open);
            }}
            aria-label="Open ArchitectAny App Stack"
            aria-expanded={isAppStackOpen}
            title="ArchitectAny App Stack"
            className={`group flex h-12 w-12 sm:h-14 sm:w-14 touch-manipulation items-center justify-center rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-200 ${isDark ? "border-cyan-400/40 bg-[#020d1c]/95 text-cyan-300 hover:border-cyan-300/80 hover:bg-[#041a33]" : "border-slate-300 bg-white/95 text-slate-600 hover:border-cyan-400"}`}
          >
            <Grid2X2 className="h-5 w-5" />
          </button>

          {isAppStackOpen && (
            <div ref={appStackPanelRef} role="dialog" aria-label="ArchitectAny App Stack" className={`absolute left-[calc(100%+0.5rem)] top-0 w-[310px] max-w-[calc(100vw-64px)] rounded-3xl border p-3 shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl ${isDark ? "border-cyan-400/30 bg-[#020d1c]/98 text-[#eaf7ff]" : "border-slate-200 bg-white/98 text-slate-900"}`}>
              <div className="px-2 pb-2">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">ArchitectAny App Stack</div>
                <div className="mt-1 text-xs text-slate-400">Solution models and platform applications</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <StackButton icon={Globe2} label="AAi Universe" active={activeLevel === "L1"} onClick={() => openApp("Universe")} isDark={isDark} />
                <StackButton icon={Sparkles} label="Parakkai" active={false} onClick={() => openApp("Parakkai")} isDark={isDark} />
                <StackButton icon={Globe2} label="NGLiving" active={false} onClick={() => openApp("NGLiving")} isDark={isDark} />
                <StackButton icon={Cpu} label="AAi Agent OS" active={false} onClick={() => openApp("AgentOS")} isDark={isDark} />
                <StackButton icon={Database} label="JSON / Data" onClick={openJson} isDark={isDark} />
                <StackButton icon={Settings2} label="Solution Admin" onClick={openSolutionAdmin} isDark={isDark} />
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <ExperienceThemeSelector variant="rail" />
        </div>

        {activeLevel !== "L1" && (
          <div className="relative">
            {!isExpanded ? (
              <button
                ref={triggerRef}
                type="button"
                onClick={() => { setIsAppStackOpen(false); setIsExpanded(true); }}
                aria-label="Open AAi Quick navigation"
                title={`AAi Quick • ${activeLevel}`}
                className={`group flex h-12 w-12 sm:h-14 sm:w-14 touch-manipulation items-center justify-center rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-200 ${isDark ? "border-cyan-400/30 bg-[#020d1c]/90 text-cyan-300 hover:border-cyan-300/70 hover:bg-[#041a33]" : "border-slate-300 bg-white/95 text-slate-600 hover:border-cyan-400"}`}
              >
                <SlidersHorizontal className="h-5 w-5 transition-transform group-hover:rotate-90" />
              </button>
            ) : (
              <div ref={panelRef} role="dialog" aria-label="AAi Quick navigation panel" className={`w-[310px] max-w-[calc(100vw-64px)] max-h-[calc(100dvh-32px)] overflow-hidden rounded-3xl border shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl ${isDark ? "border-cyan-400/30 bg-[#020d1c]/96 text-[#eaf7ff]" : "border-slate-200 bg-white/98 text-slate-900"}`}>
                <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 shrink-0 text-cyan-300" />
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-300">AAi Quick</div>
                      <div className="truncate text-xs text-slate-400">{currentWaypoint.layerLabel} • {currentWaypoint.name}</div>
                    </div>
                  </div>
                  <button type="button" onClick={() => setIsExpanded(false)} aria-label="Close Quick" className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"><X className="h-4 w-4" /></button>
                </div>
                <div className="grid grid-cols-3 gap-1.5 border-b border-white/10 p-3">
                  <QuickButton label="Back" icon={<ArrowLeft className="h-4 w-4" />} disabled={!canGoBack} onClick={goBack} />
                  <QuickButton label="Home" icon={<Home className="h-4 w-4" />} active={currentWaypoint.layer === 1} onClick={() => { goHome(); setIsExpanded(false); }} />
                  <QuickButton label="Forward" icon={<ArrowRight className="h-4 w-4" />} disabled={!canGoForward} onClick={goForward} />
                </div>
                <div className="max-h-[calc(100dvh-150px)] overflow-y-auto p-3 space-y-2">
                  <button type="button" onClick={() => { onResetRoot(); setIsExpanded(false); }} className="w-full flex items-center justify-between rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-3 py-2.5 text-left text-xs font-mono font-bold text-cyan-200">
                    <span className="flex items-center gap-2"><Compass className="h-3.5 w-3.5" /> M01 Solution Universe</span><span className="text-[9px] opacity-60">L1</span>
                  </button>
                  {onOpenIntentCore && <button type="button" onClick={() => { onOpenIntentCore(); setIsExpanded(false); }} className="w-full flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] px-3 py-2.5 text-left text-xs font-mono text-cyan-200 hover:border-cyan-400/50">
                    <span className="flex items-center gap-2"><Layers className="h-3.5 w-3.5" /> AAi Intent Core</span><span className="text-[9px] opacity-60">CENTER</span>
                  </button>}
                  <section className="rounded-xl border border-white/10 bg-white/[0.02] p-2">
                    <div className="px-1 pb-2 text-[9px] font-mono uppercase tracking-widest text-slate-500">{activeDomain ? `${activeDomain.id} • ${activeDomain.name}` : `Business Worlds (${domains.length})`}</div>
                    <div className="space-y-1">
                      {(activeDomain ? contextualSubdomains : domains).map((item) => {
                        const id = item.id;
                        const name = item.name;
                        const targetDomainId = activeDomain ? activeDomain.id : id;
                        const active = id === intent.subdomainId || id === intent.domainId;
                        return <button key={id} type="button" onClick={() => { onSelectDomain(targetDomainId); setIsExpanded(false); }} className={`w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] ${active ? "bg-cyan-400/15 text-cyan-200" : "text-slate-300 hover:bg-white/[0.05]"}`}>
                          <span className="flex min-w-0 items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" /><span className="truncate"><span className="mr-1 font-mono text-[9px] opacity-50">{id}</span>{name}</span></span>{active && <Check className="h-3.5 w-3.5 shrink-0" />}
                        </button>;
                      })}
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

function StackButton({ icon: Icon, label, active = false, onClick, isDark }: { icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean; onClick: () => void; isDark: boolean }) {
  return (
    <button type="button" onClick={onClick} role="menuitem" className={`rounded-xl border px-3 py-3 text-left transition-all touch-manipulation ${active ? isDark ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200" : "border-cyan-500/50 bg-cyan-50 text-cyan-800" : isDark ? "border-white/10 bg-white/[0.03] text-slate-200 hover:border-cyan-400/30 hover:bg-cyan-400/5" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-400/40 hover:bg-cyan-50"}`}>
      <Icon className="h-4 w-4 text-cyan-400" />
      <div className="mt-2 text-xs font-semibold">{label}</div>
    </button>
  );
}

function QuickButton({ label, icon, disabled = false, active = false, onClick }: { label: string; icon: React.ReactNode; disabled?: boolean; active?: boolean; onClick: () => void }) {
  return <button type="button" disabled={disabled} onClick={onClick} className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl border text-[9px] ${disabled ? "border-white/5 text-slate-600" : active ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200" : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200"}`}>{icon}<span>{label}</span></button>;
}
