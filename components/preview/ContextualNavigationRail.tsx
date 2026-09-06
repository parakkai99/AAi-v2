/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Contract: Contextual Navigation Rail
 * Status: ACTIVE
 * Version: 1.1.1
 *
 * Purpose:
 * - Keep the Left Rail synchronized with the current main-screen context.
 * - L1 shows all Domains.
 * - L2+ shows only Business Worlds belonging to the active Domain.
 * - Never display unrelated domain content while operating inside another domain.
 * - Preserve the existing compact floating / expandable visual design.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Boxes,
  CheckSquare,
  ChevronRight,
  Compass,
  Globe,
  Home,
  Layers,
  X,
} from "lucide-react";

import { useArchitectAny } from "@/src/context/ArchitectAnyContext";
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
    () =>
      activeDomainId
        ? (domains.find((domain) => domain.id === activeDomainId) ?? null)
        : null,
    [activeDomainId, domains],
  );

  const contextualSubdomains = useMemo(() => {
    if (!activeDomainId) {
      return [];
    }

    return subdomains.filter(
      (subdomain) => subdomain.domainId === activeDomainId,
    );
  }, [activeDomainId, subdomains]);

  const showDomainList = !activeDomainId;

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (!target) {
        return;
      }

      if (panelRef.current && !panelRef.current.contains(target)) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  const handleSelectBusinessWorld = (subdomain: Subdomain) => {
    onSelectDomain(subdomain.domainId);
    setIsExpanded(false);
  };

  return (
    <nav
      aria-label="Contextual Navigation Rail"
      className={`fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex items-center select-none ${className}`}
    >
      {!isExpanded && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-expanded={isExpanded}
          aria-label="Open Contextual Navigation Rail"
          title={`Navigation Rail • Active: ${activeLevel}`}
          className={`group flex flex-col items-center gap-2.5 py-3.5 px-2 rounded-2xl border transition-all duration-300 shadow-2xl cursor-pointer ${
            isDark
              ? "bg-[#020d1c]/90 hover:bg-[#041a33] border-[#00dfff]/30 text-[#82a5bb] shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#00e3fd]/80 hover:text-white"
              : "bg-white/95 hover:bg-slate-50 border-slate-300 text-slate-600 shadow-xl hover:border-indigo-400 hover:text-indigo-600"
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              activeLevel === "L1"
                ? isDark
                  ? "bg-[#00e3fd]/20 text-[#00e3fd]"
                  : "bg-indigo-100 text-indigo-700"
                : "opacity-70 group-hover:opacity-100"
            }`}
            title="L1: Universe Root"
          >
            <Home className="w-4 h-4" />
          </div>

          <div
            className={`p-1 rounded-lg transition-colors ${
              activeLevel === "L2"
                ? isDark
                  ? "bg-[#00e3fd]/20 text-[#00e3fd]"
                  : "bg-indigo-100 text-indigo-700"
                : "opacity-70 group-hover:opacity-100"
            }`}
            title="L2: Business Worlds"
          >
            <Globe className="w-4 h-4" />
          </div>

          <div
            className={`p-1 rounded-lg transition-colors ${
              activeLevel === "L3"
                ? isDark
                  ? "bg-[#00e3fd]/20 text-[#00e3fd]"
                  : "bg-indigo-100 text-indigo-700"
                : "opacity-70 group-hover:opacity-100"
            }`}
            title="L3: Capabilities"
          >
            <Layers className="w-4 h-4" />
          </div>

          <div
            className={`p-1 rounded-lg transition-colors ${
              activeLevel === "L4"
                ? isDark
                  ? "bg-[#00e3fd]/20 text-[#00e3fd]"
                  : "bg-indigo-100 text-indigo-700"
                : "opacity-70 group-hover:opacity-100"
            }`}
            title="L4: Solution Bundles"
          >
            <Boxes className="w-4 h-4" />
          </div>

          <div
            className={`p-1 rounded-lg transition-colors ${
              activeLevel === "L5"
                ? isDark
                  ? "bg-[#00e3fd]/20 text-[#00e3fd]"
                  : "bg-indigo-100 text-indigo-700"
                : "opacity-70 group-hover:opacity-100"
            }`}
            title="L5: Solutions"
          >
            <CheckSquare className="w-4 h-4" />
          </div>

          <span
            className={`px-1 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight mt-1 ${
              isDark
                ? "bg-[#00e3fd]/15 text-[#00e3fd]"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {activeLevel}
          </span>
        </button>
      )}

      {isExpanded && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Contextual Navigation Panel"
          className={`w-[300px] sm:w-[320px] max-w-[calc(100vw-24px)] max-h-[calc(100vh-120px)] flex flex-col rounded-3xl border transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden ${
            isDark
              ? "bg-[#020d1c]/95 border-[#00dfff]/35 text-[#d4e4fa]"
              : "bg-white/98 border-slate-300 text-slate-900 shadow-2xl"
          }`}
        >
          <div
            className={`flex items-center justify-between px-4 py-3 border-b shrink-0 ${
              isDark
                ? "bg-[#04152a]/90 border-[#00e3fd]/20"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Compass
                className={`w-4 h-4 shrink-0 ${
                  isDark ? "text-[#00e3fd]" : "text-indigo-600"
                }`}
              />

              <div className="min-w-0">
                <span className="font-mono text-xs font-bold uppercase tracking-wider block">
                  Solution Navigation
                </span>

                {activeDomain && activeLevel !== "L1" && (
                  <span
                    className={`block mt-0.5 text-[9px] font-mono truncate ${
                      isDark ? "text-[#00e3fd]" : "text-indigo-600"
                    }`}
                  >
                    {activeDomain.id} • {activeDomain.name}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label="Collapse Navigation Panel"
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? "border-[#00e3fd]/20 text-[#82a5bb] hover:text-white hover:bg-[#00e3fd]/15"
                  : "border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 border-b border-white/5 shrink-0 space-y-1.5">
            <button
              type="button"
              onClick={() => {
                onResetRoot();
                setIsExpanded(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                activeLevel === "L1"
                  ? isDark
                    ? "bg-[#00e3fd]/20 text-[#00e3fd] border-[#00e3fd]/40"
                    : "bg-indigo-100 text-indigo-700 border-indigo-200"
                  : isDark
                    ? "bg-[#031526] text-[#82a5bb] border-[#00e3fd]/15 hover:text-white hover:border-[#00e3fd]/40"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:text-indigo-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5" />
                <span>M01 Universe Root</span>
              </span>

              <span className="text-[10px] opacity-70">L1 Orbit</span>
            </button>

            {onOpenIntentCore && (
              <button
                type="button"
                onClick={() => {
                  onOpenIntentCore();
                  setIsExpanded(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                  isDark
                    ? "bg-[#031526] text-[#7dd3fc] border-[#00e3fd]/25 hover:text-white hover:border-[#00e3fd]"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:text-indigo-600"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#00e3fd]" />
                  <span>AAi Intent Core</span>
                </span>

                <span className="text-[10px] text-[#00e3fd] font-bold">
                  Center
                </span>
              </button>
            )}
          </div>

          {showDomainList ? (
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs">
              <span
                className={`text-[10px] font-mono uppercase tracking-wider font-bold block px-1 py-1 ${
                  isDark ? "text-[#82a5bb]" : "text-slate-500"
                }`}
              >
                Business Worlds ({domains.length})
              </span>

              {domains.map((domain) => {
                const isSelected = intent.domainId === domain.id;

                return (
                  <button
                    type="button"
                    key={domain.id}
                    onClick={() => {
                      onSelectDomain(domain.id);
                      setIsExpanded(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? isDark
                          ? "bg-[#00e3fd]/15 border-[#00e3fd]/50 text-white font-bold"
                          : "bg-indigo-50 border-indigo-300 text-indigo-900 font-bold"
                        : isDark
                          ? "bg-[#03182c]/50 hover:bg-[#062444] border-transparent text-[#9ec5de] hover:text-white"
                          : "bg-white hover:bg-slate-50 border-slate-100 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor: domain.visual?.color || "#00e3fd",
                        }}
                      />

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] opacity-70">
                            {domain.id}
                          </span>

                          <span className="font-medium truncate">
                            {domain.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs">
              <div className="flex items-center justify-between px-1 py-1">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                    isDark ? "text-[#82a5bb]" : "text-slate-500"
                  }`}
                >
                  {activeDomain?.name || "Current Domain"}
                </span>

                <span
                  className={`text-[9px] font-mono font-bold ${
                    isDark ? "text-[#00e3fd]" : "text-indigo-600"
                  }`}
                >
                  L2
                </span>
              </div>

              {contextualSubdomains.length > 0 ? (
                contextualSubdomains.map((subdomain) => {
                  const isSelected = intent.subdomainId === subdomain.id;

                  return (
                    <button
                      type="button"
                      key={subdomain.id}
                      onClick={() => handleSelectBusinessWorld(subdomain)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? isDark
                            ? "bg-[#00e3fd]/15 border-[#00e3fd]/50 text-white font-bold"
                            : "bg-indigo-50 border-indigo-300 text-indigo-900 font-bold"
                          : isDark
                            ? "bg-[#03182c]/50 hover:bg-[#062444] border-transparent text-[#9ec5de] hover:text-white"
                            : "bg-white hover:bg-slate-50 border-slate-100 text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] opacity-70">
                            {subdomain.id}
                          </span>

                          <span className="font-medium truncate">
                            {subdomain.name}
                          </span>
                        </div>

                        {subdomain.description && (
                          <div
                            className={`mt-1 text-[9px] leading-4 line-clamp-2 ${
                              isDark ? "text-[#6f9ab2]" : "text-slate-500"
                            }`}
                          >
                            {subdomain.description}
                          </div>
                        )}
                      </div>

                      <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0 ml-2" />
                    </button>
                  );
                })
              ) : (
                <div
                  className={`rounded-xl border border-dashed p-4 text-center font-mono text-[10px] ${
                    isDark
                      ? "border-[#00e3fd]/20 text-[#6f9ab2]"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  No Business Worlds found for this Domain.
                </div>
              )}
            </div>
          )}

          <div
            className={`px-3 py-2 border-t text-[10px] font-mono text-center shrink-0 ${
              isDark
                ? "bg-[#030e1d] border-[#00e3fd]/20 text-[#6e9bb3]"
                : "bg-slate-50 border-slate-200 text-slate-500"
            }`}
          >
            {showDomainList
              ? "Select a Business World to enter its context"
              : `Context: ${activeDomain?.id || "Unknown Domain"}`}
          </div>
        </div>
      )}
    </nav>
  );
};
