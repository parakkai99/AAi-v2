import React from 'react';
import { HeaderLogo } from './HeaderLogo';
import { IntentSearch } from './IntentSearch';
import { LocationSelector } from './LocationSelector';
import { LanguageSelector } from './LanguageSelector';
import { UserMenu } from './UserMenu';
import { ThemeToggle } from '../theme/ThemeToggle';
import { SearchResultItem } from '@/src/contracts/intent';

export interface ArchitectAnyHeaderProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSelectSolution?: (solutionId: string) => void;
  onOpenMapModal?: (prefillQuery?: string) => void;
  className?: string;
}

export const ArchitectAnyHeader: React.FC<ArchitectAnyHeaderProps> = ({
  currentTab = 'Universe',
  onTabChange,
  searchQuery = '',
  onSearchChange,
  onSelectSolution,
  onOpenMapModal,
  className = '',
}) => {
  const handleSelectSearchResult = (result: SearchResultItem) => {
    if ((result.type === 'solution' || result.meta?.layer === 5) && onSelectSolution) {
      onSelectSolution(result.id);
    }
  };

  return (
    <header
      className={`bg-[#020914]/90 backdrop-blur-2xl fixed top-0 left-0 right-0 h-[72px] sm:h-[74px] z-50 border-b border-[#00e3fd]/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)] ${className}`}
      role="banner"
    >
      <div className="flex justify-between items-center px-3 sm:px-5 lg:px-8 h-full max-w-7xl mx-auto gap-2 sm:gap-4">
        {/* 1. ArchitectAny Logo */}
        <HeaderLogo
          animated={true}
          onClick={() => onTabChange?.('Universe')}
        />

        {/* 2. Intent Search (Most Prominent Interactive Control) */}
        <div className="flex-1 max-w-xl mx-1 sm:mx-3 min-w-0">
          <IntentSearch onSelectResult={handleSelectSearchResult} />
        </div>

        {/* 3. Global Context Controls: Location, Language, User/Signature */}
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

          {/* User / Signature / Auth Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
