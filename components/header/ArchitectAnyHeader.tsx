import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';
import { HeaderLogo } from './HeaderLogo';
import { IntentSearch } from './IntentSearch';
import { LocationSelector } from './LocationSelector';
import { LanguageSelector } from './LanguageSelector';
import { UserMenu } from './UserMenu';
import { ThemeToggle } from '../theme/ThemeToggle';
import { SearchResultItem } from '@/src/contracts/intent';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';

export interface ArchitectAnyHeaderProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  onHome?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSelectSolution?: (solutionId: string) => void;
  onOpenMapModal?: (prefillQuery?: string) => void;
  className?: string;
}

export const ArchitectAnyHeader: React.FC<ArchitectAnyHeaderProps> = ({
  currentTab = 'Universe',
  onTabChange,
  onHome,
  searchQuery = '',
  onSearchChange,
  onSelectSolution,
  onOpenMapModal,
  className = '',
}) => {
  const { theme } = useArchitectAny();
  const isDark = theme === 'dark';
  // Global keyboard shortcut Ctrl+J to toggle inspector, Shift+O to toggle Agent OS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('aai:toggle-json-inspector'));
      }
      if (e.shiftKey && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        onTabChange?.(currentTab === 'AgentOS' ? 'Universe' : 'AgentOS');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTab, onTabChange]);

  const handleSelectSearchResult = (result: SearchResultItem) => {
    if ((result.type === 'solution' || result.meta?.layer === 5) && onSelectSolution) {
      onSelectSolution(result.id);
    }
  };

  return (
    <>
      <header
        className={`bg-[#020914]/90 backdrop-blur-2xl sticky top-0 left-0 right-0 h-[72px] sm:h-[74px] z-50 border-b border-[#00e3fd]/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)] ${className}`}
        role="banner"
      >
        <div className="flex justify-between items-center px-3 sm:px-5 lg:px-8 h-full max-w-7xl mx-auto gap-2 sm:gap-4">
          {/* 1. ArchitectAny Logo */}
          <HeaderLogo
            animated={true}
            onClick={() => {
              if (onHome) {
                onHome();
              } else {
                onTabChange?.('Universe');
              }
            }}
          />

          {/* 2. Intent Search (Most Prominent Interactive Control) */}
          <div className="flex-1 max-w-xl mx-1 sm:mx-3 min-w-0">
            <IntentSearch onSelectResult={handleSelectSearchResult} />
          </div>

          {/* 3. Global Context Controls: Location, Language, Theme, Windows Symbol (JSON), Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0">
            {/* Location Context Selector */}
            <div className="hidden sm:block">
              <LocationSelector onOpenMapModal={onOpenMapModal} />
            </div>

            {/* Language / Locale Selector */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>

            {/* Theme Toggle (Dark/Light) */}
            <ThemeToggle variant="header" />

            {/* Microsoft Windows 4-Square Style Button (AAi Catalog & JSON Inspector) */}
            <button
              id="header-catalog-inspector-btn"
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('aai:toggle-json-inspector'))}
              className={`relative p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                isDark
                  ? 'bg-[#031c33]/90 text-[#00dfff] hover:text-white hover:bg-[#052b4f] border border-[#00dfff]/30 shadow-[0_0_12px_rgba(0,227,253,0.2)]'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300 shadow-sm'
              }`}
              title="AAi Catalog & JSON Inspector (Ctrl+J)"
              aria-label="Open AAi Catalog & JSON Inspector"
            >
              {/* Microsoft Windows 4-square grid symbol */}
              <div
                className="grid grid-cols-2 gap-[2.5px] w-4 h-4 items-center justify-center"
                aria-hidden="true"
              >
                <span
                  className={`w-[6px] h-[6px] rounded-[1px] transition-colors ${
                    isDark ? 'bg-[#00e3fd]' : 'bg-slate-700'
                  }`}
                />
                <span
                  className={`w-[6px] h-[6px] rounded-[1px] transition-colors ${
                    isDark ? 'bg-[#00e3fd]' : 'bg-slate-700'
                  }`}
                />
                <span
                  className={`w-[6px] h-[6px] rounded-[1px] transition-colors ${
                    isDark ? 'bg-[#00e3fd]' : 'bg-slate-700'
                  }`}
                />
                <span
                  className={`w-[6px] h-[6px] rounded-[1px] transition-colors ${
                    isDark ? 'bg-[#00e3fd]' : 'bg-slate-700'
                  }`}
                />
              </div>
            </button>

            {/* P-PARAKKAI-001 Project Switcher Button */}
            <button
              id="header-parakkai-btn"
              type="button"
              onClick={() => onTabChange?.(currentTab === 'Parakkai' ? 'Universe' : 'Parakkai')}
              className={`relative px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-serif font-bold ${
                currentTab === 'Parakkai'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black border border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)] ring-1 ring-amber-300/50'
                  : isDark
                  ? 'bg-[#031c33]/90 text-amber-300 hover:text-white hover:bg-amber-950/40 border border-amber-500/40 shadow-sm'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 shadow-sm'
              }`}
              title="Open P-PARAKKAI-001 Temple Experience"
              aria-label="Open Parakkai Temple Experience"
            >
              <span className="text-sm">🪷</span>
              <span className="hidden sm:inline">Parakkai</span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                P-001
              </span>
            </button>

            {/* AAi Agent OS Command Center Switcher Button */}
            <button
              id="header-agent-os-btn"
              type="button"
              onClick={() => onTabChange?.(currentTab === 'AgentOS' ? 'Universe' : 'AgentOS')}
              className={`relative px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold ${
                currentTab === 'AgentOS'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] ring-1 ring-purple-300/50'
                  : isDark
                  ? 'bg-[#031c33]/90 text-[#00dfff] hover:text-white hover:bg-[#052b4f] border border-[#00dfff]/50 shadow-[0_0_15px_rgba(0,227,253,0.3)]'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300 shadow-sm'
              }`}
              title="Toggle AAi Agent OS Command Center (Shift+O)"
              aria-label="Toggle AAi Agent OS Command Center"
            >
              <Cpu className="w-3.5 h-3.5 text-[#00e3fd]" />
              <span>Agent OS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            {/* User / Signature / Auth Menu */}
            <UserMenu />
          </div>
        </div>
      </header>
    </>
  );
};
