import React from 'react';
import { DomainItem } from '@/src/contracts/catalog';
import { Sparkles, Compass } from 'lucide-react';

export interface L2BusinessWorldsStepperProps {
  domains: DomainItem[];
  activeDomainId: string;
  theme?: 'dark' | 'light';
  onSelectDomain: (domain: DomainItem) => void;
  className?: string;
}

export const L2BusinessWorldsStepper: React.FC<L2BusinessWorldsStepperProps> = ({
  domains,
  activeDomainId,
  theme = 'dark',
  onSelectDomain,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full overflow-x-auto no-scrollbar py-2.5 px-3 sm:px-4 rounded-2xl border transition-colors ${
        isDark
          ? 'bg-[#020b17]/90 border-[#00dfff]/20 shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
          : 'bg-slate-100/90 border-slate-200 shadow-sm'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2 min-w-max mx-auto max-w-6xl">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold shrink-0 mr-2">
          <Compass className={`w-4 h-4 ${isDark ? 'text-[#00dfff]' : 'text-indigo-600'}`} />
          <span className={isDark ? 'text-[#82a5bb]' : 'text-slate-600'}>BUSINESS WORLDS:</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {domains.map((domain) => {
            const isActive = domain.id === activeDomainId;
            return (
              <button
                key={domain.id}
                onClick={() => onSelectDomain(domain)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-r from-[#032545] to-[#1e1045] text-[#00e3fd] border-2 border-[#00e3fd] shadow-[0_0_18px_rgba(0,227,253,0.45)] font-bold scale-105'
                      : 'bg-white text-indigo-700 border-2 border-indigo-500 shadow-md font-bold scale-105'
                    : isDark
                      ? 'bg-[#031526]/80 hover:bg-[#04223d] text-[#82a5bb] hover:text-[#eaf7ff] border border-[#00dfff]/15'
                      : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] ${
                    isActive
                      ? isDark
                        ? 'bg-[#00e3fd] text-[#020914]'
                        : 'bg-indigo-600 text-white'
                      : isDark
                        ? 'bg-[#041d33] text-[#6e9bb3] group-hover:text-[#00e3fd]'
                        : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {domain.id}
                </span>

                <span className="truncate max-w-[120px] sm:max-w-[150px] font-sans font-medium text-[11px] sm:text-xs">
                  {domain.name}
                </span>

                {isActive && (
                  <span
                    className={`hidden lg:inline-flex items-center gap-0.5 text-[9px] font-mono px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                      isDark
                        ? 'bg-[#a855f7]/20 text-[#d8b4fe] border border-[#a855f7]/40'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Active</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
