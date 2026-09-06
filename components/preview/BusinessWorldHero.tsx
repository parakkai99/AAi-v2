/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Context: M01 Business World Hero
 * Catalog Source: Canonical Capability Catalog
 * Status: ACTIVE
 * Version: 1.0.0
 */

import React, { useState, useRef, useEffect } from "react";
import { DomainItem, SubdomainItem } from "@/src/contracts/catalog";
import { Sparkles, ChevronDown, Check } from "lucide-react";

export interface BusinessWorldHeroProps {
  domain: DomainItem;
  activeSubdomain?: SubdomainItem | null;
  subdomains?: SubdomainItem[];
  theme?: "dark" | "light";
  onSelectSubdomain?: (subdomain: SubdomainItem) => void;
  className?: string;
}

export const BusinessWorldHero: React.FC<BusinessWorldHeroProps> = ({
  domain,
  activeSubdomain,
  subdomains = [],
  theme = "dark",
  onSelectSubdomain,
  className = "",
}) => {
  const isDark = theme === "dark";
  const color = domain.color || domain.accentColor || "#00e3fd";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`w-full rounded-xl py-2 px-3.5 sm:px-4 mb-2 border transition-all relative overflow-visible ${
        isDark
          ? "bg-gradient-to-br from-[#03182b]/95 via-[#021120]/95 to-[#010a15]/95 border-[#00dfff]/25 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          : "bg-white border-slate-200 shadow-xs"
      } ${className}`}
    >
      {/* Ambient background glow accent */}
      <div
        className="absolute -right-20 -top-20 w-60 h-60 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10 flex flex-col gap-1.5">
        {/* Active Business World Identity & Contextual Sub-World Switcher */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider text-[#001f24] shadow-xs"
              style={{ backgroundColor: color }}
            >
              <Sparkles className="w-3 h-3" />
              <span>BUSINESS WORLD</span>
              <span className="opacity-75 font-mono text-[10px]">|</span>
              <span>{domain.id}</span>
            </span>

            {/* Contextual Sub-World Trigger: Compact, opens on-demand, returns to minimal */}
            {activeSubdomain && (
              <div ref={menuRef} className="relative inline-flex items-center">
                {subdomains.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] font-semibold border transition-all cursor-pointer ${
                      isDark
                        ? isMenuOpen
                          ? "bg-[#00e3fd]/25 text-[#00e3fd] border-[#00e3fd]/60 shadow-[0_0_10px_rgba(0,227,253,0.3)]"
                          : "bg-[#00e3fd]/15 text-[#00e3fd] hover:bg-[#00e3fd]/25 border-[#00e3fd]/35"
                        : isMenuOpen
                          ? "bg-indigo-100 text-indigo-800 border-indigo-300"
                          : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200"
                    }`}
                    title="Click to switch sub-worlds"
                    aria-expanded={isMenuOpen}
                  >
                    <span>Sub-World: {activeSubdomain.id}</span>
                    <span className="opacity-60 text-[9px]">
                      ({subdomains.length})
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isMenuOpen ? "rotate-180 text-[#00e3fd]" : "opacity-70"
                      }`}
                    />
                  </button>
                ) : (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] font-semibold border ${
                      isDark
                        ? "bg-[#00e3fd]/15 text-[#00e3fd] border-[#00e3fd]/35"
                        : "bg-indigo-50 text-indigo-700 border-indigo-200"
                    }`}
                  >
                    <span>Sub-World: {activeSubdomain.id}</span>
                  </span>
                )}

                {/* On-Demand Contextual Dropdown (Zero permanent screen space) */}
                {isMenuOpen && subdomains.length > 1 && (
                  <div
                    className={`absolute left-0 top-full mt-1.5 w-72 sm:w-80 rounded-xl p-2 z-50 shadow-2xl border ${
                      isDark
                        ? "bg-[#031122]/98 backdrop-blur-2xl border-[#00e3fd]/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)] text-[#eaf7ff]"
                        : "bg-white/98 backdrop-blur-2xl border-slate-200 shadow-xl text-slate-900"
                    }`}
                  >
                    <div className="flex items-center justify-between px-2.5 py-1.5 mb-1.5 border-b border-inherit">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#00e3fd]">
                        Switch Sub-World ({subdomains.length})
                      </span>
                      <span className="text-[10px] font-mono text-[#9ec5de]">
                        Domain {domain.id}
                      </span>
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-0.5 pr-1 scrollbar-thin">
                      {subdomains.map((sub) => {
                        const isSelected = activeSubdomain?.id === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              onSelectSubdomain?.(sub);
                              setIsMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-all cursor-pointer ${
                              isSelected
                                ? isDark
                                  ? "bg-[#00e3fd]/20 text-[#00e3fd] font-bold border border-[#00e3fd]/40 shadow-xs"
                                  : "bg-indigo-50 text-indigo-700 font-bold border border-indigo-200"
                                : isDark
                                  ? "text-[#c3d9ea] hover:text-white hover:bg-[#05213b]"
                                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold shrink-0 bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/30">
                                {sub.id}
                              </span>
                              <span className="truncate font-medium">
                                {sub.name}
                              </span>
                            </div>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-[#00e3fd] shrink-0 ml-1.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Sub-World Jump Pill if multiple available */}
          {subdomains.length > 1 && (
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer border ${
                isDark
                  ? "bg-[#021426] hover:bg-[#031d36] text-[#9ec5de] hover:text-[#00e3fd] border-[#00dfff]/20"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200"
              }`}
            >
              <span>Sub-Worlds ({subdomains.length})</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>

        {/* Title & Description */}
        <div>
          <h1
            className={`text-lg sm:text-xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {activeSubdomain ? activeSubdomain.name : domain.name}
          </h1>

          <p
            className={`text-xs sm:text-sm mt-0.5 max-w-4xl line-clamp-2 leading-relaxed ${
              isDark ? "text-[#c3d9ea]" : "text-slate-600"
            }`}
          >
            {activeSubdomain?.description || domain.description}
          </p>
        </div>
      </div>
    </div>
  );
};
