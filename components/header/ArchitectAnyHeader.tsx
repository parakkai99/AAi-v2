import React, { useEffect } from 'react';
import { HeaderLogo } from './HeaderLogo';
import { IntentSearch } from './IntentSearch';
import { LocationSelector } from './LocationSelector';
import { LanguageSelector } from './LanguageSelector';
import { UserMenu } from './UserMenu';
import { ExperienceThemeSelector } from '@/components/theme/ExperienceThemeSelector';
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
 * Platform application access is provided by the global left navigation rail.
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

  return (
    <header
      className={`sticky top-0 left-0 right-0 h-[64px] sm:h-[74px] z-[100] border-b backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.25)] ${className}`}
      style={{ background: "color-mix(in srgb, var(--aai-bg) 94%, transparent)", borderColor: "var(--aai-border)", color: "var(--aai-text)" }}
      role="banner"
    >
      <div className="flex items-center px-2.5 sm:px-5 lg:px-8 h-full max-w-[1600px] mx-auto gap-1.5 sm:gap-4">
        <HeaderLogo
          animated={true}
          onClick={() => {
            if (onHome) onHome();
            else onTabChange?.('Universe');
          }}
        />

        <div className="flex-1 min-w-0 mx-0.5 sm:mx-3">
          <IntentSearch onSelectResult={handleSelectSearchResult} />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <div className="hidden sm:block">
            <LocationSelector onOpenMapModal={onOpenMapModal} />
          </div>

          <div className="hidden md:block">
            <LanguageSelector />
          </div>

          <div className="hidden sm:block">
            <ExperienceThemeSelector variant="header" />
          </div>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};

