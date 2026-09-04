import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Compass, ChevronDown, Check } from 'lucide-react';
import {
  DomainItem,
  SubdomainItem,
  CapabilityItem,
  SolutionBundleItem,
  SolutionItem,
} from '@/src/contracts/catalog';

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
  theme?: 'dark' | 'light';
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
  theme = 'dark',
  onUpLevel,
  onResetRoot,
  onSelectRootCrumb,
  onSelectDomainCrumb,
  onSelectSubdomainCrumb,
  onSelectCapabilityCrumb,
  onSelectBundleCrumb,
  rightExtra,
  className = '',
}) => {
  const isDark = theme === 'dark';
  const [isWorldsMenuOpen, setIsWorldsMenuOpen] = useState(false);
  const [isSubdomainMenuOpen, setIsSubdomainMenuOpen] = useState(false);
  const menuTimerRef = useRef<number | null>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const subdomainContainerRef = useRef<HTMLDivElement>(null);

  // Determine current active level
  const hasSolution = Boolean(solution);
  const hasBundle = Boolean(bundle) && !hasSolution;
  const hasCapability = Boolean(capability) && !hasBundle && !hasSolution;
  const hasSubdomain = Boolean(subdomain) && !hasCapability && !hasBundle && !hasSolution;
  const hasDomain = Boolean(domain) && !hasSubdomain && !hasCapability && !hasBundle && !hasSolution;
  const isRoot = !domain;

  const handleRootClick = () => {
    if (onSelectRootCrumb) {
      onSelectRootCrumb();
    } else {
      onResetRoot();
    }
  };

  const handleMouseEnter = () => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    setIsWorldsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    menuTimerRef.current = window.setTimeout(() => {
      setIsWorldsMenuOpen(false);
    }, 250);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setIsWorldsMenuOpen(false);
      }
      if (subdomainContainerRef.current && !subdomainContainerRef.current.contains(e.target as Node)) {
        setIsSubdomainMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    };
  }, []);

  return (
    <nav
      aria-label="Navigation Compass"
      className={`w-full py-1.5 px-3 sm:px-6 transition-all border-b ${
        isDark
          ? 'bg-[#030e1d]/95 backdrop-blur-xl border-[#00dfff]/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-[#eaf7ff]'
          : 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-xs text-slate-900'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 min-h-[36px]">
        {/* Breadcrumb Hierarchy Trail */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-xs font-mono min-w-0 flex-1">
          {/* Level 0: M01 Solution Universe */}
          <button
            onClick={handleRootClick}
            type="button"
            className={`group inline-flex items-center gap-1.5 font-bold transition-all cursor-pointer rounded px-2 py-0.5 text-xs ${
              isRoot
                ? isDark
                  ? 'bg-[#00e3fd]/20 text-[#00e3fd] border border-[#00e3fd]/50 shadow-[0_0_10px_rgba(0,227,253,0.3)]'
                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : isDark
                  ? 'text-[#c3d9ea] hover:text-[#00e3fd] hover:bg-[#031d33]'
                  : 'text-slate-700 hover:text-indigo-900 hover:bg-slate-100'
            }`}
            title="Return to M01 Solution Universe 3D Galaxy"
          >
            <Compass className={`w-3.5 h-3.5 ${isRoot ? (isDark ? 'text-[#00e3fd]' : 'text-indigo-600') : (isDark ? 'text-[#9ec5de]' : 'text-slate-500')}`} />
            <span className="truncate font-semibold">M01 Solution Universe</span>
          </button>

          {/* Level 1: Domain / Business World */}
          {domain ? (
            <>
              <span className={`font-mono text-sm font-bold select-none px-0.5 ${isDark ? 'text-[#00e3fd]/50' : 'text-slate-400'}`}>
                ›
              </span>
              <button
                onClick={onSelectDomainCrumb}
                type="button"
                className={`group inline-flex items-center gap-1.5 transition-all cursor-pointer rounded px-2 py-0.5 ${
                  hasDomain
                    ? isDark
                      ? 'bg-[#00e3fd]/20 text-[#00e3fd] border border-[#00e3fd]/50 font-bold shadow-[0_0_10px_rgba(0,227,253,0.3)]'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold'
                    : isDark
                      ? 'text-[#c3d9ea] hover:text-[#00e3fd] hover:bg-[#031d33]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={`Business World: ${domain.name}`}
              >
                {hasDomain && <span className="w-1.5 h-1.5 rounded-full bg-[#00e3fd] animate-pulse shrink-0" />}
                <span className="font-semibold">{domain.name}</span>
              </button>
            </>
          ) : (
            <>
              <span className={`font-mono text-sm font-bold select-none px-0.5 ${isDark ? 'text-[#00e3fd]/50' : 'text-slate-400'}`}>
                ›
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-bold ${
                  isDark
                    ? 'bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/40 shadow-[0_0_8px_rgba(0,227,253,0.25)]'
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e3fd] animate-pulse shrink-0" />
                <span>3D Galaxy Orbit</span>
              </span>
            </>
          )}

          {/* Level 2: Subdomain / Active Sub-World */}
          {subdomain && (
            <>
              <span className={`font-mono text-sm font-bold select-none px-0.5 ${isDark ? 'text-[#00e3fd]/50' : 'text-slate-400'}`}>
                ›
              </span>
              <div ref={subdomainContainerRef} className="relative inline-flex items-center">
                <button
                  onClick={() => {
                    if (subdomains.length > 1) {
                      setIsSubdomainMenuOpen((prev) => !prev);
                    } else {
                      onSelectSubdomainCrumb?.();
                    }
                  }}
                  type="button"
                  className={`group inline-flex items-center gap-1.5 transition-all cursor-pointer rounded px-2 py-0.5 ${
                    hasSubdomain
                      ? isDark
                        ? 'bg-[#00e3fd]/20 text-[#00e3fd] border border-[#00e3fd]/50 font-bold shadow-[0_0_10px_rgba(0,227,253,0.3)]'
                        : 'bg-indigo-100 text-indigo-800 border border-indigo-300 font-bold'
                      : isDark
                        ? 'text-[#c3d9ea] hover:text-[#00e3fd] hover:bg-[#031d33]'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={
                    subdomains.length > 1
                      ? `Active Sub-World: ${subdomain.name}. Click to switch between ${subdomains.length} sub-worlds.`
                      : `Sub-World: ${subdomain.name}`
                  }
                  aria-expanded={isSubdomainMenuOpen}
                >
                  {hasSubdomain && <span className="w-1.5 h-1.5 rounded-full bg-[#00e3fd] animate-pulse shrink-0" />}
                  <span className="font-semibold">{subdomain.name}</span>
                  {subdomains.length > 1 && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isSubdomainMenuOpen ? 'rotate-180 text-[#00e3fd]' : 'opacity-70 group-hover:opacity-100'
                      }`}
                    />
                  )}
                </button>

                {/* Contextual Sub-Worlds Popover Dropdown (Available when needed, minimal when closed) */}
                {isSubdomainMenuOpen && subdomains.length > 1 && (
                  <div
                    className={`absolute left-0 top-full mt-1.5 w-72 sm:w-80 rounded-xl p-2 z-50 shadow-2xl border ${
                      isDark
                        ? 'bg-[#031122]/98 backdrop-blur-2xl border-[#00e3fd]/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)] text-[#eaf7ff]'
                        : 'bg-white/98 backdrop-blur-2xl border-slate-200 shadow-xl text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between px-2.5 py-1.5 mb-1.5 border-b border-inherit">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#00e3fd]">
                        Sub-Worlds in {domain?.id || 'Domain'} ({subdomains.length})
                      </span>
                      <span className="text-[10px] font-mono text-[#9ec5de]">
                        Instant Switch
                      </span>
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-0.5 pr-1 scrollbar-thin">
                      {subdomains.map((sub) => {
                        const isSelected = subdomain?.id === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              onSelectSubdomain?.(sub);
                              setIsSubdomainMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-all cursor-pointer ${
                              isSelected
                                ? isDark
                                  ? 'bg-[#00e3fd]/20 text-[#00e3fd] font-bold border border-[#00e3fd]/40 shadow-xs'
                                  : 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                                : isDark
                                  ? 'text-[#c3d9ea] hover:text-white hover:bg-[#05213b]'
                                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold shrink-0 bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/30"
                              >
                                {sub.id}
                              </span>
                              <span className="truncate font-medium">{sub.name}</span>
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
            </>
          )}

          {/* Level 3: Capability */}
          {capability && (
            <>
              <span className={`font-mono text-sm font-bold select-none px-0.5 ${isDark ? 'text-[#00e3fd]/50' : 'text-slate-400'}`}>
                ›
              </span>
              <button
                onClick={onSelectCapabilityCrumb}
                type="button"
                className={`group inline-flex items-center gap-1.5 transition-all cursor-pointer rounded px-2 py-0.5 ${
                  hasCapability
                    ? isDark
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                      : 'bg-purple-50 text-purple-800 border border-purple-200 font-bold'
                    : isDark
                      ? 'text-[#c3d9ea] hover:text-[#00e3fd] hover:bg-[#031d33]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={`Capability: ${capability.name}`}
              >
                {hasCapability && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shrink-0" />}
                <span className="font-semibold">{capability.name}</span>
              </button>
            </>
          )}

          {/* Level 4: Solution Bundle */}
          {bundle && (
            <>
              <span className={`font-mono text-sm font-bold select-none px-0.5 ${isDark ? 'text-[#00e3fd]/50' : 'text-slate-400'}`}>
                ›
              </span>
              <button
                onClick={onSelectBundleCrumb}
                type="button"
                className={`group inline-flex items-center gap-1.5 transition-all cursor-pointer rounded px-2 py-0.5 ${
                  hasBundle
                    ? isDark
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                      : 'bg-amber-50 text-amber-800 border border-amber-200 font-bold'
                    : isDark
                      ? 'text-[#c3d9ea] hover:text-[#00e3fd] hover:bg-[#031d33]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={`Solution Bundle: ${bundle.name}`}
              >
                {hasBundle && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />}
                <span className="font-semibold">{bundle.name}</span>
              </button>
            </>
          )}

          {/* Level 5: Solution */}
          {solution && (
            <>
              <span className={`font-mono text-sm font-bold select-none px-0.5 ${isDark ? 'text-[#00e3fd]/50' : 'text-slate-400'}`}>
                ›
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-bold ${
                  isDark
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-semibold">{solution.name}</span>
              </span>
            </>
          )}
        </div>

        {/* Right Section: Up 1 Level + Quick Business Worlds Mouseover Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          {rightExtra}
          {!isRoot && onUpLevel && (
            <button
              onClick={onUpLevel}
              type="button"
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all cursor-pointer border ${
                isDark
                  ? 'bg-[#031c33] hover:bg-[#05294a] text-[#00e3fd] hover:text-white border-[#00dfff]/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-300'
              }`}
              title="Navigate up one level in hierarchy"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Up 1 Level</span>
            </button>
          )}

          {/* Business Worlds Quick-Switcher Mouseover Dropdown (Right below header) */}
          {allDomains.length > 0 && (
            <div
              ref={menuContainerRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsWorldsMenuOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all cursor-pointer border ${
                  isDark
                    ? isWorldsMenuOpen || domain
                      ? 'bg-[#00e3fd]/15 text-[#00e3fd] border-[#00e3fd]/50 shadow-[0_0_10px_rgba(0,227,253,0.25)]'
                      : 'bg-[#02101e] hover:bg-[#031c33] text-[#c3d9ea] hover:text-white border-[#00dfff]/20'
                    : isWorldsMenuOpen || domain
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                }`}
                title="View and jump to any Business World (D01-D14)"
                aria-expanded={isWorldsMenuOpen}
              >
                <Compass className="w-3.5 h-3.5 text-[#00e3fd]" />
                <span className="hidden md:inline">
                  {domain ? `Business World: ${domain.id}` : `Business Worlds (${allDomains.length})`}
                </span>
                <span className="md:hidden">
                  {domain ? domain.id : `Worlds (${allDomains.length})`}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isWorldsMenuOpen ? 'rotate-180 text-[#00e3fd]' : 'opacity-70'
                  }`}
                />
              </button>

              {/* Popover Dropdown Panel */}
              {isWorldsMenuOpen && (
                <div
                  className={`absolute right-0 top-full mt-1.5 w-72 sm:w-80 rounded-xl p-2 z-50 shadow-2xl border ${
                    isDark
                      ? 'bg-[#031122]/98 backdrop-blur-2xl border-[#00e3fd]/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)] text-[#eaf7ff]'
                      : 'bg-white/98 backdrop-blur-2xl border-slate-200 shadow-xl text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between px-2.5 py-1.5 mb-1.5 border-b border-inherit">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#00e3fd]">
                      All {allDomains.length} Business Worlds
                    </span>
                    <span className="text-[10px] font-mono text-[#9ec5de]">
                      Instant Switch
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-0.5 pr-1 scrollbar-thin">
                    {allDomains.map((dm) => {
                      const isSelected = domain?.id === dm.id;
                      const dmColor = dm.visual?.color || '#00e3fd';
                      return (
                        <button
                          key={dm.id}
                          type="button"
                          onClick={() => {
                            onSelectDomain?.(dm);
                            setIsWorldsMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-all cursor-pointer ${
                            isSelected
                              ? isDark
                                ? 'bg-[#00e3fd]/20 text-[#00e3fd] font-bold border border-[#00e3fd]/40 shadow-xs'
                                : 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                              : isDark
                                ? 'text-[#c3d9ea] hover:text-white hover:bg-[#05213b]'
                                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold shrink-0"
                              style={{
                                backgroundColor: `${dmColor}25`,
                                color: dmColor,
                                border: `1px solid ${dmColor}40`,
                              }}
                            >
                              {dm.id}
                            </span>
                            <span className="truncate font-medium">{dm.name}</span>
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
      </div>
    </nav>
  );
};
