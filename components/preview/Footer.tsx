import React from 'react';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';

export const Footer: React.FC = () => {
  const { t } = useArchitectAny();

  return (
    <footer className="w-full py-6 border-t z-20 relative" style={{ background: "var(--aai-surface)", borderColor: "var(--aai-border)", color: "var(--aai-text-muted)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg p-0.5 flex items-center justify-center shrink-0" style={{ background: "color-mix(in srgb, var(--aai-primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--aai-primary) 30%, transparent)" }}>
            <img
              src="/assets/architectany-logo-sm.jpg"
              alt="ArchitectAny"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <p className="font-mono text-xs" style={{ color: "var(--aai-text-muted)" }}>
            © 2026 <strong className="" style={{ color: "var(--aai-text)" }}>ArchitectAny AAi</strong>. {t('one_platform_infinite_solutions')}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <a href="#architecture" className="transition-colors" style={{ color: "var(--aai-text-muted)" }}>Architecture</a>
          <a href="#catalog" className="hover:text-[#00dfff] transition-colors">Catalog</a>
          <a href="#security" className="hover:text-[#00dfff] transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
};
