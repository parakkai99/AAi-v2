/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Context: M01 Domain Context Navigation
 * Contract: QUICK-RAIL-001
 * Status: ACTIVE
 *
 * The former full-width context banner is intentionally reduced to one
 * persistent Quick control. Context, world selection and experience controls
 * remain available from the rail without consuming the main content header.
 */

import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronRight, Compass, Home, SlidersHorizontal, X } from "lucide-react";
import type {
  DomainItem,
  SubdomainItem,
  CapabilityItem,
  SolutionBundleItem,
  SolutionItem,
} from "@/src/contracts/catalog";

export interface DomainContextBannerProps {
  domain: DomainItem | null;
  subdomain?: SubdomainItem | null;
  subdomains?: SubdomainItem[];
  onSelectSubdomain?: (subdomain: SubdomainItem) => void;
  capability?: CapabilityItem | null;
  bundle?: SolutionBundleItem | null;
  solution?: SolutionItem | null;
  allDomains?: DomainItem[];
  onSelectDomain?: (domain: DomainItem) => void;
  theme?: "dark" | "light";
  onUpLevel?: () => void;
  onResetRoot: () => void;
  onSelectRootCrumb?: () => void;
  onSelectDomainCrumb?: () => void;
  onSelectSubdomainCrumb?: () => void;
  onSelectCapabilityCrumb?: () => void;
  onSelectBundleCrumb?: () => void;
  rightExtra?: React.ReactNode;
  className?: string;
}

export const DomainContextBanner: React.FC<DomainContextBannerProps> = ({
  domain,
  subdomain,
  subdomains = [],
  onSelectSubdomain,
  capability,
  bundle,
  solution,
  allDomains = [],
  onSelectDomain,
  theme = "dark",
  onResetRoot,
  onSelectRootCrumb,
  onSelectDomainCrumb,
  onSelectSubdomainCrumb,
  onSelectCapabilityCrumb,
  onSelectBundleCrumb,
  rightExtra,
  className = "",
}) => {
  const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && panelRef.current && !panelRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleRoot = () => {
    (onSelectRootCrumb ?? onResetRoot)();
    setIsOpen(false);
  };

  const handleDomain = (item: DomainItem) => {
    onSelectDomain?.(item);
    setIsOpen(false);
  };

  const currentLabel = solution?.name ?? bundle?.name ?? capability?.name ?? subdomain?.name ?? domain?.name ?? "Solution Universe";
  const currentLevel = solution ? "L5 Solution" : bundle ? "L4 Bundle" : capability ? "L3 Capability" : subdomain || domain ? "L2 Business World" : "L1 Universe";

  return (
    <>
      <div
        ref={panelRef}
        className={`fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[60] ${className}`}
      >
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Open AAi Quick controls"
          aria-expanded={isOpen}
          title="AAi Quick"
          className={`group flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
            isDark
              ? "border-[#00e3fd]/30 bg-[#020d1c]/90 text-[#82a5bb] hover:border-[#00e3fd]/80 hover:bg-[#041a33] hover:text-[#00e3fd]"
              : "border-slate-300 bg-white/95 text-slate-600 hover:border-cyan-400 hover:text-cyan-700"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-[8px] font-mono font-bold uppercase tracking-widest">Quick</span>
        </button>

        {isOpen && (
          <div
            role="dialog"
            aria-label="AAi Quick controls"
            className={`absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 w-[300px] max-w-[calc(100vw-70px)] max-h-[calc(100vh-40px)] overflow-y-auto rounded-2xl border p-3 shadow-[0_24px_70px_rgba(0,0,0,0.75)] backdrop-blur-2xl ${
              isDark
                ? "border-[#00e3fd]/30 bg-[#020d1c]/96 text-[#eaf7ff]"
                : "border-slate-200 bg-white/98 text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 min-w-0">
                <Compass className="h-4 w-4 shrink-0 text-[#00e3fd]" />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00e3fd]">AAi Quick</div>
                  <div className="truncate text-xs font-semibold">{currentLabel}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Quick"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-3 space-y-2">
              <button
                type="button"
                onClick={handleRoot}
                className={`w-full flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-xs font-mono transition-all ${
                  !domain && !subdomain && !capability && !bundle && !solution
                    ? "border-[#00e3fd]/50 bg-[#00e3fd]/15 text-[#00e3fd]"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-[#00e3fd]/40 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2"><Home className="h-3.5 w-3.5" /> M01 Solution Universe</span>
                <span className="text-[9px] opacity-60">L1</span>
              </button>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2">
                <div className="px-1 pb-2 text-[9px] font-mono uppercase tracking-widest text-slate-500">
                  Business Worlds ({allDomains.length})
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                  {allDomains.map((item) => {
                    const active = domain?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleDomain(item)}
                        className={`w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] transition-all ${
                          active
                            ? "bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/35"
                            : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e3fd]" />
                          <span className="font-mono text-[9px] opacity-60">{item.id}</span>
                          <span className="truncate">{item.name}</span>
                        </span>
                        {active ? <Check className="h-3.5 w-3.5 shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-30" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {subdomain && subdomains.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2">
                  <div className="px-1 pb-2 text-[9px] font-mono uppercase tracking-widest text-slate-500">
                    Sub-Worlds ({subdomains.length})
                  </div>
                  <div className="space-y-1">
                    {subdomains.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onSelectSubdomain?.(item);
                          setIsOpen(false);
                        }}
                        className={`w-full rounded-lg px-2.5 py-2 text-left text-[11px] ${
                          item.id === subdomain.id ? "bg-[#00e3fd]/15 text-[#00e3fd]" : "text-slate-300 hover:bg-white/[0.05]"
                        }`}
                      >
                        {item.id} • {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {rightExtra && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2">
                  <div className="px-1 pb-2 text-[9px] font-mono uppercase tracking-widest text-slate-500">Experience Controls</div>
                  <div className="flex flex-wrap items-center gap-2">{rightExtra}</div>
                </div>
              )}

              <div className="pt-1 text-[9px] font-mono text-slate-500">
                {currentLevel} • Quick access is available on every viewport.
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
