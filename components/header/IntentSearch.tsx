import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  Boxes,
  Layers,
  Cpu,
  MapPin,
  X,
  Compass,
  Zap,
} from 'lucide-react';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { intentService } from '@/src/services/intentService';
import { SearchResultItem } from '@/src/contracts/intent';

export interface IntentSearchProps {
  onSelectResult?: (result: SearchResultItem) => void;
  className?: string;
}

export const IntentSearch: React.FC<IntentSearchProps> = ({
  onSelectResult,
  className = '',
}) => {
  const { intent, setIntent, clearIntent, location, t } = useArchitectAny();
  const [inputValue, setInputValue] = useState(intent.query || '');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedIntents = intentService.getSuggestedIntents();

  // Sync external intent query changes
  useEffect(() => {
    setInputValue(intent.query || '');
  }, [intent.query]);

  // Debounced search evaluation
  useEffect(() => {
    let active = true;
    if (!inputValue.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await intentService.search(inputValue, location);
        if (active) {
          setResults(res);
        }
      } catch (err) {
        console.error('Intent search error:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, 120);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [inputValue, location]);

  // Handle outside clicks to close popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setIntent({ query: val, rawQuery: val });
    if (!isOpen) setIsOpen(true);
  };

  const handleSelectSuggested = async (prompt: string) => {
    setInputValue(prompt);
    const parsed = await intentService.parseIntent(prompt);
    setIntent(parsed);
    setIsOpen(false);
  };

  const handleSelectResult = (res: SearchResultItem) => {
    const layer = res.meta?.layer;
    const path = res.meta?.path || [];

    // Extract exact 5-layer hierarchy IDs
    const domainId = res.domainId || (layer === 1 ? res.id : path.find((p: any) => p.layer === 1)?.id || null);
    const subdomainId = layer === 2 ? res.id : path.find((p: any) => p.layer === 2)?.id || null;
    const capabilityId = layer === 3 ? res.id : path.find((p: any) => p.layer === 3)?.id || null;
    const solutionBundleId = layer === 4 ? res.id : path.find((p: any) => p.layer === 4)?.id || null;
    const solutionId = (res.type === 'solution' || layer === 5) ? res.id : null;

    setIntent({
      query: res.meta?.rawName || res.name,
      domainId,
      subdomainId,
      capabilityId,
      solutionBundleId,
      solutionId,
      serviceId: res.type === 'service' ? res.id : null,
      category: res.category || null,
      path: path.length > 0 ? path : undefined,
    });
    setIsOpen(false);
    onSelectResult?.(res);
  };

  const handleClear = () => {
    setInputValue('');
    clearIntent();
    setResults([]);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Intent Search Container with Ambient Sweep & Soft Cyan Pulse */}
      <div
        className={`relative flex items-center rounded-xl sm:rounded-2xl transition-all duration-300 ${
          isFocused
            ? 'ring-2 ring-[#00e3fd] shadow-[0_0_25px_rgba(0,227,253,0.35)] bg-[#02182b]'
            : 'bg-[#021425]/85 hover:bg-[#031c33] border border-[#00dfff]/30 hover:border-[#00e3fd]/60'
        }`}
      >
        {/* Animated Sweep Line Effect */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-none">
          <div
            className={`w-full h-full bg-gradient-to-r from-transparent via-[#00e3fd]/10 to-transparent transition-opacity duration-700 ${
              isFocused ? 'opacity-100 animate-pulse' : 'opacity-0'
            }`}
          />
        </div>

        {/* Left Intent Gateway Icon */}
        <div className="pl-3.5 pr-2 py-2.5 flex items-center text-[#00dfff] shrink-0">
          <Sparkles className={`w-4 h-4 transition-transform duration-300 ${isFocused ? 'scale-110 text-[#00e3fd]' : 'text-[#00dfff]'}`} />
        </div>

        {/* Natural Language Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={t('search_intent_placeholder')}
          className="w-full bg-transparent text-[#eaf7ff] placeholder-[#628b9f] text-xs sm:text-sm font-medium py-2.5 sm:py-2.5 pr-8 focus:outline-none tracking-wide"
        />

        {/* Right Status / Clear Button */}
        <div className="pr-3 flex items-center gap-1.5 shrink-0">
          {inputValue ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-[#628b9f] hover:text-[#eaf7ff] rounded-md hover:bg-[#00dfff]/15 transition-colors text-xs font-mono cursor-pointer"
              title="Clear intent search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#00dfff]/10 border border-[#00dfff]/20 text-[9.5px] font-mono text-[#00dfff] uppercase tracking-wider">
              {t('intent_gateway')}
            </span>
          )}
        </div>
      </div>

      {/* Global Intent Gateway Dropdown Results & Suggestions */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#021324]/95 border border-[#00dfff]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(0,227,253,0.2)] backdrop-blur-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Categorized Search Results */}
          {results.length > 0 ? (
            <div className="p-3 space-y-1 max-h-[380px] overflow-y-auto">
              <div className="flex items-center justify-between px-2 py-1 text-[10px] font-mono text-[#6e9bb3] uppercase tracking-wider border-b border-[#00dfff]/15">
                <span>{t('direct_matches')} ({results.length})</span>
                <span className="text-[#00dfff]">{t('click_to_select')}</span>
              </div>

              {results.map((res) => {
                const isSolution = res.type === 'solution';
                const isDomain = res.type === 'domain';
                const isService = res.type === 'service';

                return (
                  <button
                    key={`${res.type}-${res.id}`}
                    type="button"
                    onClick={() => handleSelectResult(res)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#03223f] border border-transparent hover:border-[#00dfff]/30 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className="w-7 h-7 rounded-lg bg-[#010e1a] border border-[#00dfff]/25 flex items-center justify-center shrink-0 text-[#00dfff]">
                        {isSolution && <Boxes className="w-3.5 h-3.5" />}
                        {isDomain && <Compass className="w-3.5 h-3.5 text-emerald-400" />}
                        {isService && <MapPin className="w-3.5 h-3.5 text-amber-400" />}
                        {!isSolution && !isDomain && !isService && <Cpu className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <strong className="text-xs font-bold text-[#eaf7ff] group-hover:text-[#00e3fd] transition-colors truncate">
                            {res.name}
                          </strong>
                          {res.badge && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00dfff]/10 text-[#00dfff] border border-[#00dfff]/20">
                              {res.badge}
                            </span>
                          )}
                        </div>
                        {res.description && (
                          <span className="text-[10px] text-[#82a5bb] line-clamp-1">
                            {res.description}
                          </span>
                        )}
                        {res.location && (
                          <span className="text-[9.5px] font-mono text-amber-300/90 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-2.5 h-2.5" />
                            {res.location.city} · {res.location.pincode}
                          </span>
                        )}
                      </div>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-[#6e9bb3] group-hover:text-[#00e3fd] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          ) : null}

          {/* Natural-Language Suggested Business Intent Prompts */}
          <div className="p-3 bg-[#010c17]/90 border-t border-[#00dfff]/15">
            <div className="flex items-center gap-1.5 px-2 mb-2 text-[10px] font-mono uppercase tracking-wider text-[#6e9bb3]">
              <Zap className="w-3 h-3 text-[#00dfff]" />
              <span>{t('suggested_intents')}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {suggestedIntents.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSelectSuggested(prompt)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#021729]/80 hover:bg-[#042847] border border-[#00dfff]/15 hover:border-[#00e3fd]/40 text-left text-xs text-[#b6dbe9] hover:text-[#eaf7ff] transition-all group cursor-pointer"
                >
                  <span className="truncate pr-2 font-medium">"{prompt}"</span>
                  <ArrowRight className="w-3 h-3 text-[#00dfff] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
