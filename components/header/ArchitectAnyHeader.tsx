import React, { useEffect } from 'react';
import { Cpu, Grid2X2 } from 'lucide-react';
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

/**
 * ArchitectAny global header.
 *
 * The header is platform-owned and solution-neutral.
 * Solution models, Agent OS, JSON/Data and other applications are reached
 * through the App Stack rather than occupying permanent top-level slots.
 */
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

  const contextLabel =
    currentTab === 'Universe'
      ? 'AAi Universe'
      : currentTab === 'AgentOS'
        ? 'Agent OS'
        : currentTab;

  return (
    <header
      className={`bg-[#020914]/90 backdrop-blur-2xl sticky top-0 left-0 right-0 h-[72px] sm:h-[74px] z-50 border-b border-[#00e3fd]/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)] ${className}`}
      role="banner"
    >
      <div className="flex items-center px-3 sm:px-5 lg:px-8 h-full max-w-[1600px] mx-auto gap-2 sm:gap-4">
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

        <div className="flex-1 max-w-2xl min-w-[260px] mx-1 sm:mx-3">
          <IntentSearch onSelectResult={handleSelectSearchResult} />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <div className="hidden sm:block">
            <LocationSelector onOpenMapModal={onOpenMapModal} />
          </div>

          <div className="hidden md:block">
            <LanguageSelector />
          </div>

          <ThemeToggle variant="header" />

          <button
            id="header-app-stack-btn"
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('aai:open-solution-model-stack'))}
            className={`relative p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
              isDark
                ? 'bg-[#031c33]/90 text-[#00dfff] hover:text-white hover:bg-[#052b4f] border border-[#00dfff]/40 shadow-[0_0_14px_rgba(0,227,253,0.22)]'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300 shadow-sm'
            }`}
            title="ArchitectAny Solution Model Stack"
            aria-label="Open ArchitectAny Solution Model Stack"
          >
            <Grid2X2 className="w-4 h-4" />
          </button>

          <div
            className={`hidden sm:flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-mono border ${
              isDark
                ? 'bg-[#031c33]/70 text-[#b8e8f5] border-[#00dfff]/20'
                : 'bg-white text-slate-700 border-slate-300'
            }`}
            title="Current ArchitectAny context"
          >
            <span className={isDark ? 'text-cyan-300' : 'text-slate-500'}>Context</span>
            <span>{contextLabel}</span>
          </div>

          <button
            id="header-agent-os-fallback-btn"
            type="button"
            onClick={() => onTabChange?.(currentTab === 'AgentOS' ? 'Universe' : 'AgentOS')}
            className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
              isDark
                ? 'bg-[#031c33]/70 text-[#00dfff] hover:text-white border border-[#00dfff]/25'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300'
            }`}
            title="AAi Agent OS (Shift+O)"
            aria-label="AAi Agent OS"
          >
            <Cpu className="w-4 h-4" />
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};
