import React, { useEffect, useRef, useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { experienceThemes } from '@/src/experience/theme/ThemeRegistry';
import { useExperienceRuntime } from '@/src/experience/ExperienceRuntime';

export interface ExperienceThemeSelectorProps {
  variant?: 'header' | 'rail';
  className?: string;
}

export const ExperienceThemeSelector: React.FC<ExperienceThemeSelectorProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { theme, setTheme } = useExperienceRuntime();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && rootRef.current && !rootRef.current.contains(target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', close, true);
    document.addEventListener('touchstart', close, true);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('mousedown', close, true);
      document.removeEventListener('touchstart', close, true);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  const choose = (id: string) => {
    setTheme(id);
    setOpen(false);
  };

  const button = (
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      aria-label="Open AAi Experience Theme Library"
      aria-expanded={open}
      title={'Theme: ' + theme.name}
      className={'flex items-center justify-center rounded-xl border transition-all touch-manipulation ' +
        (variant === 'rail' ? 'h-12 w-12 sm:h-14 sm:w-14' : 'p-2') + ' ' +
        (theme.category === 'light'
          ? 'border-slate-300 bg-white/95 text-slate-700 hover:border-cyan-400'
          : 'border-cyan-400/40 bg-[#020d1c]/95 text-cyan-300 hover:border-cyan-300/80 hover:bg-[#041a33]') + ' ' +
        className}
    >
      <Palette className={variant === 'rail' ? 'h-5 w-5' : 'h-4 w-4'} />
    </button>
  );

  return (
    <div ref={rootRef} className="relative">
      {button}
      {open && (
        <div
          role="dialog"
          aria-label="AAi Experience Theme Library"
          className={'absolute z-[220] w-[340px] max-w-[calc(100vw-72px)] rounded-3xl border p-3 shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl ' +
            (variant === 'rail'
              ? 'left-[calc(100%+0.5rem)] top-0'
              : 'right-0 top-[calc(100%+0.5rem)]') + ' ' +
            (theme.category === 'light'
              ? 'border-slate-200 bg-white/98 text-slate-900'
              : 'border-cyan-400/30 bg-[#020d1c]/98 text-[#eaf7ff]')}
        >
          <div className="px-2 pb-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">
              AAi Experience Theme Library
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Select the complete visual language for this experience.
            </div>
          </div>

          <div className="grid max-h-[min(62vh,520px)] grid-cols-2 gap-2 overflow-y-auto pr-1">
            {experienceThemes.map((item) => {
              const active = item.id === theme.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => choose(item.id)}
                  aria-pressed={active}
                  className={'rounded-xl border px-3 py-2.5 text-left transition-all ' +
                    (active
                      ? 'border-cyan-400/70 bg-cyan-400/10'
                      : theme.category === 'light'
                        ? 'border-slate-200 bg-slate-50 hover:border-cyan-400/50 hover:bg-cyan-50'
                        : 'border-white/10 bg-white/[0.03] hover:border-cyan-400/40 hover:bg-cyan-400/5')}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="mt-0.5 h-3 w-3 shrink-0 rounded-full border border-white/20"
                      style={{
                        background: 'linear-gradient(135deg, ' + item.tokens.background + ', ' + item.tokens.primary + ', ' + item.tokens.accent + ')',
                      }}
                    />
                    {active && <Check className="h-3.5 w-3.5 shrink-0 text-cyan-400" />}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold leading-tight">{item.name}</div>
                  <div className="mt-1 text-[9px] leading-snug text-slate-400">{item.category}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
