import React, { useEffect, useState } from 'react';
import { Cpu, Grid2X2, Settings2, Database, Sparkles, Globe2 } from 'lucide-react';
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
 * Solution models, Agent OS and data/configuration tools are reached through
 * the App Stack rather than occupying permanent solution-specific slots.
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
  const [isAppStackOpen, setIsAppStackOpen] = useState(false);

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

      if (e.key === 'Escape') {
        setIsAppStackOpen(false);
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

  const openContext = (tab: string) => {
    setIsAppStackOpen(false);
    onTabChange?.(tab);
  };

  return (
    <header
      className={`bg-[#020914]/90 backdrop-blur-2xl sticky top-0 left-0 right-0 h-[72px] sm:h-[74px] z-50 border-b border-[#00e3fd]/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)] ${className}`}
      role="banner"
    >
      <div className="flex items-center px-3 sm:px-5 lg:px-8 h-full max-w-[1600px] mx-auto gap-2 sm:gap-4">
        <HeaderLogo
          animated={true}
          onClick={() => {
            setIsAppStackOpen(false);
            if (onHome) onHome();
            else onTabChange?.('Universe');
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

          <div className="relative">
            <button
              id="header-app-stack-btn"
              type="button"
              onClick={() => setIsAppStackOpen((open) => !open)}
              className={`relative p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                isDark
                  ? 'bg-[#031c33]/90 text-[#00dfff] hover:text-white hover:bg-[#052b4f] border border-[#00dfff]/40 shadow-[0_0_14px_rgba(0,227,253,0.22)]'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300 shadow-sm'
              }`}
              title="ArchitectAny Solution Model Stack"
              aria-label="Open ArchitectAny Solution Model Stack"
              aria-expanded={isAppStackOpen}
            >
              <Grid2X2 className="w-4 h-4" />
            </button>

            {isAppStackOpen && (
              <div
                className={`absolute right-0 mt-2 w-72 rounded-2xl border shadow-2xl p-3 backdrop-blur-xl ${
                  isDark
                    ? 'bg-[#031323]/98 border-[#00dfff]/25'
                    : 'bg-white border-slate-200'
                }`}
                role="menu"
              >
                <div className="px-2 pb-2">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">ArchitectAny App Stack</div>
                  <div className="mt-1 text-xs text-slate-400">Solution models and platform applications</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <StackButton icon={Globe2} label="AAi Universe" active={currentTab === 'Universe'} onClick={() => openContext('Universe')} isDark={isDark} />
                  <StackButton icon={Sparkles} label="Parakkai" active={currentTab === 'Parakkai'} onClick={() => openContext('Parakkai')} isDark={isDark} />
                  <StackButton icon={Globe2} label="NGLiving" active={currentTab === 'NGLiving'} onClick={() => openContext('NGLiving')} isDark={isDark} />
                  <StackButton icon={Package} label="Jaico-Mart" active={currentTab === 'Jaico'} onClick={() => openContext('Jaico')} isDark={isDark} />
                  <StackButton icon={Cpu} label="AAi Agent OS" active={currentTab === 'AgentOS'} onClick={() => openContext('AgentOS')} isDark={isDark} />
                  <StackButton icon={Database} label="JSON / Data" onClick={() => { setIsAppStackOpen(false); window.dispatchEvent(new CustomEvent('aai:toggle-json-inspector')); }} isDark={isDark} />
                  <StackButton
                    icon={Settings2}
                    label="Solution Admin"
                    onClick={() => {
                      setIsAppStackOpen(false);
                      const solutionId =
                        currentTab === 'NGLiving'
                          ? 'ngliving'
                          : currentTab === 'Parakkai'
                            ? 'parakkai'
                            : currentTab === 'Jaico'
                              ? 'jaico'
                              : new URLSearchParams(window.location.search).get('app') || 'jaico';
                      window.location.assign('/solution-admin/' + solutionId);
                    }}
                    isDark={isDark}
                  />
                </div>
              </div>
            )}
          </div>

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

          <UserMenu />
        </div>
      </div>
    </header>
  );
};

function StackButton({
  icon: Icon,
  label,
  active = false,
  onClick,
  isDark,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick: () => void;
  isDark: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="menuitem"
      className={`rounded-xl border px-3 py-3 text-left transition-all ${
        active
          ? isDark
            ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-200'
            : 'border-cyan-500/50 bg-cyan-50 text-cyan-800'
          : isDark
            ? 'border-white/10 bg-white/[0.03] text-slate-200 hover:border-cyan-400/30 hover:bg-cyan-400/5'
            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-400/40 hover:bg-cyan-50'
      }`}
    >
      <Icon className="w-4 h-4 text-cyan-400" />
      <div className="mt-2 text-xs font-semibold">{label}</div>
    </button>
  );
}
