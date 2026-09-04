import React from 'react';
import { ChevronRight, RotateCcw, ArrowUp, Globe, Sparkles } from 'lucide-react';
import { DomainItem, SubdomainItem, CapabilityItem, SolutionBundleItem } from '@/src/contracts/catalog';

export interface DomainContextBannerProps {
  domain: DomainItem;
  subdomain?: SubdomainItem | null;
  capability?: CapabilityItem | null;
  bundle?: SolutionBundleItem | null;
  theme?: 'dark' | 'light';
  onUpLevel: () => void;
  onResetRoot: () => void;
  onSelectDomainCrumb?: () => void;
  onSelectSubdomainCrumb?: () => void;
  onSelectCapabilityCrumb?: () => void;
  className?: string;
}

export const DomainContextBanner: React.FC<DomainContextBannerProps> = ({
  domain,
  subdomain,
  capability,
  bundle,
  theme = 'dark',
  onUpLevel,
  onResetRoot,
  onSelectDomainCrumb,
  onSelectSubdomainCrumb,
  onSelectCapabilityCrumb,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full rounded-2xl p-4 sm:p-5 transition-all border ${
        isDark
          ? 'bg-gradient-to-r from-[#021426] via-[#041d38] to-[#0d102e] border-[#00dfff]/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
          : 'bg-white border-slate-200 shadow-md'
      } ${className}`}
    >
      {/* Top Row: Domain Badge, Title, Pills, Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3.5 border-b border-inherit">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Domain ID Badge */}
          <span
            className={`font-mono text-sm sm:text-base font-bold px-2.5 py-1 rounded-lg border ${
              isDark
                ? 'bg-gradient-to-r from-[#00dfff] to-[#a855f7] text-[#020914] border-[#00dfff]/50 shadow-[0_0_12px_rgba(0,227,253,0.4)]'
                : 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
            }`}
          >
            {domain.id}
          </span>

          {/* Domain Name */}
          <h2
            className={`text-lg sm:text-xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {domain.name}
          </h2>

          {/* Business World Pill */}
          <span
            className={`text-xs font-mono px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold ${
              isDark
                ? 'bg-[#00dfff]/15 text-[#00e3fd] border border-[#00dfff]/30'
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Business World</span>
          </span>
        </div>

        {/* Action Controls: Up 1 Level & Reset Root */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onUpLevel}
            type="button"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border ${
              isDark
                ? 'bg-[#031d33] hover:bg-[#052d52] text-[#00dfff] hover:text-white border-[#00dfff]/30 shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-300'
            }`}
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Up 1 Level</span>
          </button>

          <button
            onClick={onResetRoot}
            type="button"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border ${
              isDark
                ? 'bg-[#02101e] hover:bg-[#031c33] text-[#82a5bb] hover:text-[#00e3fd] border-[#00dfff]/20'
                : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Root</span>
          </button>
        </div>
      </div>

      {/* Middle Row: Description */}
      <p
        className={`text-xs sm:text-sm leading-relaxed mt-3 mb-3 ${
          isDark ? 'text-[#a1c4db]' : 'text-slate-600'
        }`}
      >
        {domain.description}
      </p>

      {/* Bottom Row: Path / Breadcrumbs */}
      <div
        className={`pt-2.5 border-t flex flex-wrap items-center gap-1.5 text-xs font-mono ${
          isDark ? 'border-[#00dfff]/15 text-[#6e9bb3]' : 'border-slate-100 text-slate-500'
        }`}
      >
        <span className="font-bold text-[11px] tracking-wider uppercase mr-1">PATH:</span>

        {/* L1 Domain Crumb */}
        <button
          onClick={onSelectDomainCrumb}
          className={`hover:underline cursor-pointer font-medium ${
            isDark ? 'text-[#00e3fd]' : 'text-indigo-600'
          }`}
        >
          [{domain.id} {domain.name}]
        </button>

        {/* L2 Subdomain Crumb */}
        {subdomain && (
          <>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <button
              onClick={onSelectSubdomainCrumb}
              className={`hover:underline cursor-pointer font-bold ${
                isDark ? 'text-[#eaf7ff]' : 'text-slate-800'
              }`}
            >
              [{subdomain.id} {subdomain.name}]
            </button>
          </>
        )}

        {/* L3 Capability Crumb */}
        {capability && (
          <>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <button
              onClick={onSelectCapabilityCrumb}
              className={`hover:underline cursor-pointer font-bold ${
                isDark ? 'text-[#a855f7]' : 'text-purple-700'
              }`}
            >
              [{capability.id} {capability.name}]
            </button>
          </>
        )}

        {/* L4 Bundle Crumb */}
        {bundle && (
          <>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span
              className={`font-bold ${
                isDark ? 'text-[#34d399]' : 'text-emerald-700'
              }`}
            >
              [{bundle.id} {bundle.name}]
            </span>
          </>
        )}
      </div>
    </div>
  );
};
