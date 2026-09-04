import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';

export interface ThemeToggleProps {
  variant?: 'pill' | 'header' | 'floating';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'pill',
  className = '',
}) => {
  const { theme, setTheme, toggleTheme } = useArchitectAny();
  const isDark = theme === 'dark';

  if (variant === 'header') {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
        className={`relative p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
          isDark
            ? 'bg-[#031c33]/90 text-[#00dfff] hover:text-white hover:bg-[#052b4f] border border-[#00dfff]/30 shadow-[0_0_12px_rgba(0,227,253,0.2)]'
            : 'bg-white text-amber-600 hover:text-amber-700 hover:bg-slate-100 border border-slate-300 shadow-sm'
        } ${className}`}
      >
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
        )}
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full transition-all select-none ${
        isDark
          ? 'bg-[#031526]/90 border border-[#00dfff]/30 shadow-[0_0_15px_rgba(0,0,0,0.5)]'
          : 'bg-slate-200/90 border border-slate-300 shadow-inner'
      } ${className}`}
      role="radiogroup"
      aria-label="Theme selection"
    >
      {/* Dark Button */}
      <button
        type="button"
        role="radio"
        aria-checked={isDark}
        onClick={() => setTheme('dark')}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
          isDark
            ? 'bg-gradient-to-r from-[#00dfff] to-[#a855f7] text-[#020914] shadow-[0_0_10px_rgba(0,227,253,0.5)]'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'fill-current' : ''}`} />
        <span>Dark</span>
      </button>

      {/* Light Button */}
      <button
        type="button"
        role="radio"
        aria-checked={!isDark}
        onClick={() => setTheme('light')}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
          !isDark
            ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
            : 'text-[#82a5bb] hover:text-[#eaf7ff]'
        }`}
      >
        <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 fill-amber-500' : ''}`} />
        <span>Light</span>
      </button>
    </div>
  );
};
