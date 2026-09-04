import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { LanguageContextState } from '@/src/contracts/language';

export interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
}) => {
  const { language, setLanguage, supportedLanguages, t } = useArchitectAny();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (lang: LanguageContextState) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Compact Language Header Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#021425]/80 hover:bg-[#031d36] border border-[#00dfff]/25 hover:border-[#00e3fd]/60 text-[#a2c8dc] hover:text-[#eaf7ff] text-xs font-mono select-none transition-all shadow-sm group cursor-pointer"
        title={`Active Language: ${language.name}`}
      >
        <Globe className="w-3.5 h-3.5 text-[#00dfff] group-hover:rotate-12 transition-transform" />
        <span className="font-semibold text-[#dff4ff] tracking-wide">
          {language.shortLabel} · {language.nativeName}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[#6e9bb3] group-hover:text-[#00e3fd] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#00e3fd]' : ''
          }`}
        />
      </button>

      {/* Language Menu Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-[#021324]/95 border border-[#00dfff]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(0,227,253,0.18)] backdrop-blur-2xl z-50 p-2.5 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-2 py-1 text-[10px] font-mono text-[#6e9bb3] uppercase tracking-wider border-b border-[#00dfff]/15 mb-1.5">
            {t('select_language')}
          </div>

          <div className="space-y-1">
            {supportedLanguages.map((lang) => {
              const isSelected = lang.code === language.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00dfff]/20 border border-[#00dfff]/50 text-[#00e3fd] font-bold'
                      : 'hover:bg-[#03223d] text-[#b4d6e7] border border-transparent'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#eaf7ff]">
                      {lang.nativeName}
                    </span>
                    <span className="text-[10px] text-[#6e9bb3]">
                      {lang.name} ({lang.code})
                    </span>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-[#00e3fd] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
