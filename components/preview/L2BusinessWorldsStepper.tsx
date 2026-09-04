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
      className={`w-full py-2.5 px-3 sm:px-4 rounded-xl border transition-colors ${
        isDark
          ? 'bg-[#020b17]/90 border-[#00dfff]/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
          : 'bg-slate-100/90 border-slate-200 shadow-xs'
      } ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5 mx-auto max-w-6xl">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold shrink-0 mr-1">
          <Compass className={`w-4 h-4 ${isDark ? 'text-[#00dfff]' : 'text-indigo-600'}`} />
          <span className={isDark ? 'text-[#9ec5de]' : 'text-slate-700'}>BUSINESS WORLDS:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {domains.map((domain) => {
            const isActive = domain.id === activeDomainId;
            return (
              <button
                key={domain.id}
                onClick={() => onSelectDomain(domain)}
                className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-[#042848] text-white border-2 border-[#00e3fd] shadow-[0_0_12px_rgba(0,227,253,0.3)] font-bold'
                      : 'bg-white text-indigo-700 border-2 border-indigo-600 shadow-xs font-bold'
                    : isDark
                      ? 'bg-[#03172b]/80 hover:bg-[#052648] text-[#9ec5de] hover:text-[#eaf7ff] border border-[#00dfff]/20'
                      : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${
                    isActive
                      ? isDark
                        ? 'bg-[#00e3fd] text-[#020914]'
                        : 'bg-indigo-600 text-white'
                      : isDark
                        ? 'bg-[#062038] text-[#8dc0df] group-hover:text-[#00e3fd]'
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
                    className={`inline-flex items-center gap-0.5 text-[9px] font-mono px-1 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 ${
                      isDark
                        ? 'bg-[#00e3fd] text-[#020914]'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>ACTIVE</span>
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
