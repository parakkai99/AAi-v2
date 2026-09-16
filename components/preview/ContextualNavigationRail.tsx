/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: QUICK-RAIL-002
 * Status: ACTIVE
 *
 * One global Quick entry point for every viewport.
 * Navigation, context and universe controls stay behind this rail so the
 * top content area remains available for the experience itself.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Home,
  Layers,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useArchitectAny } from "@/src/context/ArchitectAnyContext";
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
  const {
    currentWaypoint,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    goHome,
  } = useUniversalNavigation();
  const isDark = theme === "dark";
  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const activeLevel = isExecutionMode
    ? "L6"
    : selectedSolutionId
      ? "L5"
      : intent.solutionBundleId
        ? "L4"
        : intent.capabilityId
          ? "L3"
          : intent.subdomainId || intent.domainId
            ? "L2"
            : "L1";

  const activeDomainId = intent.domainId ?? null;
  const activeDomain = useMemo(
    () => activeDomainId
      ? domains.find((domain) => domain.id === activeDomainId) ?? null
      : null,
    [activeDomainId, domains],
  );
  const contextualSubdomains = useMemo(
    () => activeDomainId
      ? subdomains.filter((subdomain) => subdomain.domainId === activeDomainId)
      : [],
    [activeDomainId, subdomains],
  );

  useEffect(() => {
    if (!isExpanded) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && panelRef.current && !panelRef.current.contains(target)) {
        setIsExpanded(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
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
  }, [isExpanded]);

  const close = () => setIsExpanded(false);

  return (
    <nav
      aria-label="AAi Quick navigation"
      className={`fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[70] select-none ${className}`}
    >
      {!isExpanded ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label="Open AAi Quick navigation"
          aria-expanded={false}
          title={`AAi Quick • ${activeLevel}`}
          className={`group flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-200 ${
            isDark
              ? "border-cyan-400/30 bg-[#020d1c]/90 text-cyan-300 hover:border-cyan-300/70 hover:bg-[#041a33]"
              : "border-slate-300 bg-white/95 text-slate-600 hover:border-cyan-400"
          }`}
        >
          <SlidersHorizontal className="h-5 w-5 transition-transform group-hover:rotate-90" />
        </button>
      ) : (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="AAi Quick navigation panel"
          className={`w-[310px] max-w-[calc(100vw-64px)] max-h-[calc(100dvh-32px)] overflow-hidden rounded-3xl border shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl ${
            isDark
              ? "border-cyan-400/30 bg-[#020d1c]/96 text-[#eaf7ff]"
              : "border-slate-200 bg-white/98 text-slate-900"
          }`}
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-cyan-300" />
              <div className="min-w-0">
                <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-300">AAi Quick</div>
                <div className="truncate text-xs text-slate-400">{currentWaypoint.layerLabel} • {currentWaypoint.name}</div>
              </div>
            </div>
            <button type="button" onClick={close} aria-label="Close Quick" className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5 border-b border-white/10 p-3">
            <QuickButton label="Back" icon={<ArrowLeft className="h-4 w-4" />} disabled={!canGoBack} onClick={goBack} />
            <QuickButton label="Home" icon={<Home className="h-4 w-4" />} active={currentWaypoint.layer === 1} onClick={() => { goHome(); close(); }} />
            <QuickButton label="Forward" icon={<ArrowRight className="h-4 w-4" />} disabled={!canGoForward} onClick={goForward} />
          </div>

          <div className="max-h-[calc(100dvh-150px)] overflow-y-auto p-3 space-y-2">
            <button
              type="button"
              onClick={() => { onResetRoot(); close(); }}
              className={`w-full flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-xs font-mono font-bold ${
                activeLevel === "L1"
                  ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-200"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-400/40"
              }`}
            >
              <span className="flex items-center gap-2"><Compass className="h-3.5 w-3.5" /> M01 Solution Universe</span>
              <span className="text-[9px] opacity-60">L1</span>
            </button>

            {onOpenIntentCore && (
              <button
                type="button"
                onClick={() => { onOpenIntentCore(); close(); }}
                className="w-full flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] px-3 py-2.5 text-left text-xs font-mono text-cyan-200 hover:border-cyan-400/50"
              >
                <span className="flex items-center gap-2"><Layers className="h-3.5 w-3.5" /> AAi Intent Core</span>
                <span className="text-[9px] opacity-60">CENTER</span>
              </button>
            )}

            <section className="rounded-xl border border-white/10 bg-white/[0.02] p-2">
              <div className="px-1 pb-2 text-[9px] font-mono uppercase tracking-widest text-slate-500">
                {activeDomain ? `${activeDomain.id} • ${activeDomain.name}` : `Business Worlds (${domains.length})`}
              </div>
              <div className="space-y-1">
                {(activeDomain ? contextualSubdomains : domains).map((item) => {
                  const id = item.id;
                  const name = item.name;
                  const active = id === (activeDomain?.id ?? intent.domainId ?? "");
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { onSelectDomain(activeDomain ? activeDomain.id : id); close(); }}
                      className={`w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] ${
                        active ? "bg-cyan-400/15 text-cyan-200" : "text-slate-300 hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span className="truncate"><span className="mr-1 font-mono text-[9px] opacity-50">{id}</span>{name}</span>
                      </span>
                      {active && <Check className="h-3.5 w-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      )}
    </nav>
  );
};

function QuickButton({
  label,
  icon,
  disabled = false,
  active = false,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl border text-[9px] font-medium ${
        disabled
          ? "border-white/5 text-slate-600"
          : active
            ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
            : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
