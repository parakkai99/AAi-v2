import React from 'react';
import { Layers, ShieldCheck, Terminal, Heart } from 'lucide-react';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';

export const Footer: React.FC = () => {
  const { t } = useArchitectAny();

  return (
    <footer className="bg-[#010812] w-full py-8 border-t border-[#00dfff]/20 z-20 relative text-[#6e9bb3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Brand and Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-[#00dfff]/10 border border-[#00dfff]/30 p-0.5 flex items-center justify-center">
            <img
              src="/assets/architectany-logo-sm.jpg"
              alt="ArchitectAny"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <p className="font-mono text-xs text-[#82a5bb]">
            © 2026 <strong className="text-[#eaf7ff]">ArchitectAny AAi</strong>. {t('one_platform_infinite_solutions')}
          </p>
        </div>

        {/* Center: System & Data Architecture Badges */}
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="flex items-center gap-1 text-[#00dfff] bg-[#00dfff]/10 px-2 py-0.5 rounded border border-[#00dfff]/25">
            <Terminal className="w-3 h-3" /> AAi Universe v1.0
          </span>
          <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
            <ShieldCheck className="w-3 h-3" /> {t('postgresql_ready')}
          </span>
        </div>

        {/* Right: Platform Navigation Links */}
        <div className="flex items-center gap-5 text-xs font-mono">
          <a
            href="#architecture"
            className="hover:text-[#00dfff] transition-colors"
          >
            {t('architecture')}
          </a>
          <a
            href="#catalog"
            className="hover:text-[#00dfff] transition-colors"
          >
            {t('domain_catalog')}
          </a>
          <a
            href="#security"
            className="hover:text-[#00dfff] transition-colors"
          >
            {t('data_residency')}
          </a>
        </div>
      </div>
    </footer>
  );
};
