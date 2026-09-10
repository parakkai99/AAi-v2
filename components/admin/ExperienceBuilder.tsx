import React, { useEffect, useMemo, useState } from 'react';
import { Check, LayoutTemplate, Palette, Search, Sparkles } from 'lucide-react';
import { experienceThemes } from '@/src/experience/theme/ThemeRegistry';
import { experienceLayouts } from '@/src/experience/layout/LayoutRegistry';
import type { ExperienceTheme } from '@/src/experience/theme/ThemeDefinition';
import type { ExperienceLayout } from '@/src/experience/layout/LayoutRegistry';

/**
 * AAi Experience Builder
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: EXPERIENCE-BUILDER-001
 * Status: ACTIVE
 * Version: 1.0.0
 */

export interface ExperienceBuilderProps { applicationId?: string; }

export const ExperienceBuilder: React.FC<ExperienceBuilderProps> = ({ applicationId = 'aai-reference' }) => {
  const themeStorage = `aai-experience-theme:${applicationId}`;
  const layoutStorage = `aai-experience-layout:${applicationId}`;
  const [themeId, setThemeId] = useState(() => localStorage.getItem(themeStorage) ?? 'ai-era');
  const [layoutId, setLayoutId] = useState(() => localStorage.getItem(layoutStorage) ?? 'drilldown-4');
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');

  const filteredThemes = useMemo(() => experienceThemes.filter(theme => `${theme.name} ${theme.category} ${theme.description}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const selectedTheme = experienceThemes.find(theme => theme.id === themeId) ?? experienceThemes[0];
  const selectedLayout = experienceLayouts.find(layout => layout.id === layoutId) ?? experienceLayouts[1];

  useEffect(() => {
    localStorage.setItem(themeStorage, themeId);
    localStorage.setItem(layoutStorage, layoutId);
    document.documentElement.dataset.aaiTheme = themeId;
    document.documentElement.dataset.aaiLayout = layoutId;
  }, [themeId, layoutId, themeStorage, layoutStorage]);

  const apply = () => {
    localStorage.setItem(themeStorage, themeId);
    localStorage.setItem(layoutStorage, layoutId);
    setNotice(`${selectedTheme.name} + ${selectedLayout.name} applied to ${applicationId}.`);
    window.setTimeout(() => setNotice(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--aai-bg,#020914)] text-[var(--aai-text,#eaf7ff)] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-5">
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div><div className="text-[10px] font-mono uppercase tracking-[.25em] text-cyan-400">AAi Experience Builder</div><h1 className="text-3xl font-bold mt-1">Theme & Layout Library</h1><p className="text-sm opacity-70 mt-1">Framework-owned UX configuration. Application identity and content remain outside this library.</p></div>
          <div className="flex items-center gap-2"><span className="text-xs font-mono opacity-70">Application: {applicationId}</span>{notice && <span className="text-xs text-emerald-400">{notice}</span>}</div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
          <section className="rounded-2xl border border-white/10 bg-[var(--aai-surface,#061525)] p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4"><div className="flex items-center gap-2"><Palette className="text-cyan-400"/><h2 className="text-lg font-semibold">Theme Library</h2></div><label className="relative"><Search className="absolute left-3 top-2.5 w-4 h-4 opacity-50"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search themes..." className="w-full md:w-64 rounded-lg border border-white/10 bg-black/20 pl-9 pr-3 py-2 text-sm outline-none"/></label></div>
            <div className="flex flex-wrap gap-2 mb-4">{['all','ai','nature','commerce','modern','dark','light','minimal','business','creative'].map(category=><button key={category} type="button" onClick={()=>setQuery(category==='all'?'':category)} className="rounded-full border border-white/10 px-3 py-1 text-xs capitalize hover:border-cyan-400/50">{category === 'ai' ? 'AI Era' : category}</button>)}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">{filteredThemes.map(theme=><ThemeCard key={theme.id} theme={theme} selected={theme.id===themeId} onSelect={()=>setThemeId(theme.id)}/>)}</div>
          </section>

          <section className="rounded-2xl border border-white/10 p-4" style={{ background: selectedTheme.tokens.surface, color: selectedTheme.tokens.text, boxShadow:selectedTheme.tokens.shadow }}>
            <div className="text-sm font-semibold">Theme Preview</div><div className="mt-3 h-36 rounded-xl" style={{background:`${selectedTheme.tokens.heroOverlay}, linear-gradient(135deg,${selectedTheme.tokens.secondary},${selectedTheme.tokens.primary})`}}/><h3 className="mt-4 text-xl font-bold">{selectedTheme.name}</h3><p className="text-sm opacity-70 mt-1">{selectedTheme.description}</p><div className="flex gap-2 mt-4">{[selectedTheme.tokens.primary,selectedTheme.tokens.secondary,selectedTheme.tokens.accent,selectedTheme.tokens.surfaceAlt].map(color=><span key={color} className="w-7 h-7 rounded-full border" style={{background:color}}/>)}</div><div className="mt-4 space-y-2 text-xs"><div>✓ AAi framework compatible</div><div>✓ Accessible token baseline</div><div>✓ Responsive-ready</div><div>✓ Application neutral</div></div><button type="button" onClick={apply} className="mt-5 w-full rounded-xl px-4 py-3 font-semibold text-sm" style={{background:selectedTheme.tokens.primary,color:selectedTheme.tokens.surface}}>Apply Theme + Layout</button></section>
        </div>

        <section className="rounded-2xl border border-white/10 bg-[var(--aai-surface,#061525)] p-5"><div className="flex items-center gap-2 mb-1"><LayoutTemplate className="text-cyan-400"/><h2 className="text-lg font-semibold">Layout Library</h2></div><p className="text-sm opacity-60 mb-4">Pre-built layouts with 3–5 level drilldown navigation.</p><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">{experienceLayouts.map(layout=><LayoutCard key={layout.id} layout={layout} selected={layout.id===layoutId} onSelect={()=>setLayoutId(layout.id)}/>)}</div></section>

        <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4"><div className="flex items-center gap-2 text-cyan-300"><Sparkles className="w-4 h-4"/><span className="text-sm font-semibold">Framework rule</span></div><p className="text-xs opacity-70 mt-1">Themes and layouts are reusable capability libraries. Parakkai, NGLiving, future commerce, community or any other application owns its identity, content, assets and business rules.</p></section>
      </div>
    </div>
  );
};

function ThemeCard({ theme, selected, onSelect }: { theme:ExperienceTheme; selected:boolean; onSelect:()=>void }) { return <button type="button" onClick={onSelect} className={`text-left rounded-xl overflow-hidden border transition ${selected?'border-cyan-400 ring-2 ring-cyan-400/20':'border-white/10 hover:border-cyan-400/40'}`}><div className="h-24" style={{background:`${theme.tokens.heroOverlay}, linear-gradient(135deg,${theme.tokens.secondary},${theme.tokens.primary})`}}/><div className="p-3" style={{background:theme.tokens.surface,color:theme.tokens.text}}><div className="flex justify-between gap-2"><strong className="text-sm">{theme.name}</strong>{selected&&<Check className="w-4 h-4 text-cyan-400"/>}</div><div className="text-xs opacity-65 mt-1">{theme.description}</div><div className="flex gap-1.5 mt-3">{[theme.tokens.primary,theme.tokens.secondary,theme.tokens.accent].map(color=><span key={color} className="w-4 h-4 rounded-full" style={{background:color}}/>)}</div></div></button>; }
function LayoutCard({ layout, selected, onSelect }: { layout:ExperienceLayout; selected:boolean; onSelect:()=>void }) { return <button type="button" onClick={onSelect} className={`text-left rounded-xl border p-4 transition ${selected?'border-cyan-400 bg-cyan-400/10':'border-white/10 bg-black/10 hover:border-cyan-400/40'}`}><div className="flex items-center justify-between"><strong className="text-sm">{layout.name}</strong>{selected&&<Check className="w-4 h-4 text-cyan-400"/>}</div><div className="text-xs opacity-60 mt-1">{layout.description}</div><div className="flex flex-wrap gap-1 mt-3">{layout.structure.map((level,index)=><span key={`${level}-${index}`} className="rounded-md border border-white/10 px-2 py-1 text-[10px]">{index+1}. {level}</span>)}</div></button>; }
