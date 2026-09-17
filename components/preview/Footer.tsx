import React from 'react';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';

export const Footer: React.FC = () => {
  const { t } = useArchitectAny();

  return (
    <footer className="bg-[#010812] w-full py-6 border-t border-[#00dfff]/20 z-20 relative text-[#6e9bb3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#00dfff]/10 border border-[#00dfff]/30 p-0.5 flex items-center justify-center shrink-0">
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

        <div className="flex items-center gap-4 text-xs font-mono">
          <a href="#architecture" className="hover:text-[#00dfff] transition-colors">Architecture</a>
          <a href="#catalog" className="hover:text-[#00dfff] transition-colors">Catalog</a>
          <a href="#security" className="hover:text-[#00dfff] transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
};
