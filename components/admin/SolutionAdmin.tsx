import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Bot, CheckCircle2, FileJson, Image, LayoutTemplate, Palette, Save, Send, Settings2, Sparkles, Upload, Workflow } from 'lucide-react';
import { experienceLayouts } from '@/src/experience/layout/LayoutRegistry';
import { experienceThemes } from '@/src/experience/theme/ThemeRegistry';
import { getSolutionAdminConfig, publishSolution, saveSolutionAdminConfig } from '@/src/services/solutionAdminService';
import type { SolutionAdminConfig } from '@/src/contracts/solutionAdmin';

export interface SolutionAdminProps {
  solutionId: string;
  onPreviewSolution: (config: SolutionAdminConfig) => void;
}

const solutionNames: Record<string, string> = { parakkai: 'Parakkai', ngliving: 'NGLiving' };

type AdminSection = readonly [label: string, icon: React.ComponentType<{ className?: string }>];

const sections: readonly AdminSection[] = [
  ['Overview', Settings2], ['Identity', Workflow], ['Experience', Palette], ['Content', FileJson],
  ['Assets', Image], ['JSON / Data', FileJson], ['AI Prompts', Bot], ['AI Content', Sparkles],
  ['Navigation / UX', LayoutTemplate], ['Components', Settings2], ['Animation', Sparkles],
  ['Integrations', Workflow], ['Users & Access', Settings2], ['Publish', Send], ['Audit', CheckCircle2],
];

type Section = typeof sections[number][0];

export const SolutionAdmin: React.FC<SolutionAdminProps> = ({ solutionId, onPreviewSolution }) => {
  const [activeSection, setActiveSection] = useState<Section>('Overview');
  const [config, setConfig] = useState<SolutionAdminConfig>(() => getSolutionAdminConfig(solutionId));
  const [notice, setNotice] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const name = solutionNames[solutionId] ?? solutionId;
  const selectedTheme = useMemo(() => experienceThemes.find((item) => item.id === config.themeId) ?? experienceThemes[0], [config.themeId]);
  const selectedLayout = useMemo(() => experienceLayouts.find((item) => item.id === config.layoutId) ?? experienceLayouts[0], [config.layoutId]);

  useEffect(() => {
    setConfig(getSolutionAdminConfig(solutionId));
  }, [solutionId]);

  const save = () => {
    const next = saveSolutionAdminConfig(config);
    setConfig(next);
    setNotice('Solution configuration saved.');
    window.setTimeout(() => setNotice(''), 2500);
  };

  const publish = () => {
    const next = publishSolution(solutionId);
    setConfig(next);
    setNotice(`Published ${name} v${next.version}.`);
    window.setTimeout(() => setNotice(''), 3000);
  };

  const update = (patch: Partial<SolutionAdminConfig>) =>
    setConfig((current) => ({
      ...current,
      ...patch,
      publishState: current.publishState === 'published' ? 'draft' : current.publishState,
    }));

  const importJson = async (file: File) => {
    const text = await file.text();
    try {
      JSON.parse(text);
      update({ contentJson: text });
      setActiveSection('JSON / Data');
      setNotice('JSON imported into this solution configuration.');
    } catch {
      setNotice('The selected file is not valid JSON.');
    }
    window.setTimeout(() => setNotice(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#020914] text-[#eaf7ff] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1700px] mx-auto space-y-5">
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400">Solution Administration</div>
            <div className="flex items-center gap-3 mt-1">
              <h1 className="text-3xl sm:text-4xl font-bold">{name} Admin</h1>
              <span className="rounded-lg border border-cyan-400/20 px-2 py-1 text-[10px] font-mono text-cyan-300">{solutionId}</span>
            </div>
            <p className="mt-2 text-sm text-[#82a5bb]">Configure this solution without changing the shared AAi framework.</p>
          </div>
          <div className="flex items-center gap-2">
            {notice && <span className="text-xs text-emerald-300 font-mono">{notice}</span>}
            <button type="button" onClick={() => { saveSolutionAdminConfig(config); onPreviewSolution(config); }} className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-[#031c33] px-3 py-2 text-xs font-mono text-cyan-300 hover:bg-[#052b4f]">
              <ArrowLeft className="w-4 h-4" /> Preview {name}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
          <aside className="rounded-2xl border border-white/10 bg-[#061525]/80 p-3 h-fit lg:sticky lg:top-4">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#6e91a6]">{name} control plane</div>
            <div className="space-y-1">
              {sections.map(([label, Icon]) => (
                <button key={label} type="button" onClick={() => setActiveSection(label)} className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-left ${activeSection === label ? 'bg-cyan-400 text-[#00131f] font-bold' : 'text-[#9bb6c7] hover:bg-white/5'}`}>
                  <Icon className="w-4 h-4" />{label}
                </button>
              ))}
            </div>
          </aside>

          <main className="space-y-5">
            {activeSection === 'Overview' && <Overview config={config} name={name} theme={selectedTheme.name} layout={selectedLayout.name} onNavigate={setActiveSection} onPublish={publish} />}
            {activeSection === 'Identity' && <Identity solutionId={solutionId} name={name} />}
            {activeSection === 'Experience' && <Experience config={config} onUpdate={update} onPreview={() => { saveSolutionAdminConfig(config); onPreviewSolution(config); }} />}
            {activeSection === 'Content' && <JsonEditor title="Content" value={config.contentJson} onChange={(value) => update({ contentJson: value })} onSave={save} action="Save Content" />}
            {activeSection === 'Assets' && <JsonEditor title="Asset Manifest" value={config.assetManifest} onChange={(value) => update({ assetManifest: value })} onSave={save} action="Save Assets" />}
            {activeSection === 'JSON / Data' && <JsonEditor title="Solution JSON / Data" value={config.contentJson} onChange={(value) => update({ contentJson: value })} onSave={save} action="Save JSON" onImport={() => fileRef.current?.click()} />}
            {activeSection === 'AI Prompts' && <PromptEditor value={config.aiPrompt} onChange={(value) => update({ aiPrompt: value })} onSave={save} />}
            {activeSection === 'AI Content' && <Capability title="AI Content" icon={Sparkles} items={['Generate content from approved prompts', 'Review generated output', 'Save approved content into solution data', 'Keep solution data separated from AAi platform data']} />}
            {activeSection === 'Navigation / UX' && <Capability title="Navigation / UX" icon={LayoutTemplate} items={['Configure navigation hierarchy', 'Select 3–5 level layout capability', 'Configure solution-specific UX rules', 'Keep framework layout definitions reusable']} />}
            {activeSection === 'Components' && <Capability title="Components" icon={Settings2} items={['Select enabled reusable components', 'Configure component instances', 'Keep solution-specific configuration outside shared component code']} />}
            {activeSection === 'Animation' && <Capability title="Animation" icon={Sparkles} items={['Select reusable motion capability', 'Configure solution scene mappings', 'Keep animation engine domain-neutral']} />}
            {activeSection === 'Integrations' && <Capability title="Integrations" icon={Workflow} items={['Configure external data sources', 'Configure service/provider references', 'Keep credentials in secure references, never raw configuration']} />}
            {activeSection === 'Users & Access' && <Capability title="Users & Access" icon={Settings2} items={['Solution owner and operators', 'Roles and permissions', 'Solution-level access policy', 'AAi platform authority remains separate']} />}
            {activeSection === 'Publish' && <PublishPanel config={config} onSave={save} onPublish={publish} onPreview={(draft) => onPreviewSolution(draft)} name={name} />}
            {activeSection === 'Audit' && <Audit config={config} />}
          </main>
        </div>
        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void importJson(file); event.currentTarget.value = ''; }} />
      </div>
    </div>
  );
};

function Overview({ config, name, theme, layout, onNavigate, onPublish }: { config: SolutionAdminConfig; name: string; theme: string; layout: string; onNavigate: (section: Section) => void; onPublish: () => void }) {
  const overviewCards: readonly [title: Section, detail: string, icon: React.ComponentType<{ className?: string }>][]= [
    ['Experience', 'Theme, layout and UX', Palette],
    ['Content', 'Content and JSON data', FileJson],
    ['AI Prompts', 'Prompts and generated content', Bot],
    ['Publish', 'Version and release lifecycle', Send],
  ];

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-cyan-400/20 bg-[#061525]/80 p-5">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">Solution control plane</div>
        <h2 className="mt-1 text-2xl font-bold">{name}</h2>
        <p className="mt-2 text-sm text-[#82a5bb]">This administration surface owns the solution configuration and content. It does not modify AAi framework code.</p>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mt-5">
          <Metric label="Theme" value={theme}/>
          <Metric label="Layout" value={layout}/>
          <Metric label="Version" value={`v${config.version}`}/>
          <Metric label="State" value={config.publishState}/>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {overviewCards.map(([title, detail, Icon]) => (
          <button key={title} type="button" onClick={() => onNavigate(title)} className="rounded-xl border border-white/10 bg-[#061525]/70 p-4 text-left hover:border-cyan-400/30">
            <Icon className="w-5 h-5 text-cyan-400"/>
            <div className="mt-3 font-semibold">{title}</div>
            <div className="mt-1 text-xs text-[#82a5bb]">{detail}</div>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => onNavigate('Experience')} className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-[#00131f]">Configure Experience</button>
        <button type="button" onClick={onPublish} className="rounded-xl border border-emerald-400/30 px-4 py-2 text-sm font-semibold text-emerald-300">Publish Solution</button>
      </div>
    </div>
  );
}

function Identity({ solutionId, name }: { solutionId: string; name: string }) {
  return <Panel title="Solution Identity" icon={Settings2}><div className="grid grid-cols-1 md:grid-cols-3 gap-3"><Info label="Solution Name" value={name}/><Info label="Solution ID" value={solutionId}/><Info label="Runtime" value="AAi Application Runtime"/></div><div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-xs text-[#82a5bb]">Identity belongs to this solution boundary. Shared runtime capability remains domain-neutral.</div></Panel>;
}

function Experience({
  config,
  onUpdate,
  onPreview,
}: {
  config: SolutionAdminConfig;
  onUpdate: (patch: Partial<SolutionAdminConfig>) => void;
  onPreview: () => void;
}) {
  const [openLibrary, setOpenLibrary] = useState<'theme' | 'layout'>('theme');
  const [selectedThemeId, setSelectedThemeId] = useState(config.themeId);
  const [selectedLayoutId, setSelectedLayoutId] = useState(config.layoutId);

  useEffect(() => {
    setSelectedThemeId(config.themeId);
    setSelectedLayoutId(config.layoutId);
  }, [config.themeId, config.layoutId]);

  const selectedTheme =
    experienceThemes.find((theme) => theme.id === selectedThemeId) ??
    experienceThemes[0];

  const selectedLayout =
    experienceLayouts.find((layout) => layout.id === selectedLayoutId) ??
    experienceLayouts[0];

  const chooseTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
    onUpdate({ themeId });
  };

  const chooseLayout = (layoutId: string) => {
    setSelectedLayoutId(layoutId);
    onUpdate({ layoutId });
  };

  return (
    <Panel title="Experience" icon={Palette}>
      <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)] gap-5 min-h-[620px]">
        <div className="space-y-3">
          <ExperienceLibraryCard
            title="Theme Library"
            subtitle="Visual language, typography and surface behavior"
            icon={Palette}
            open={openLibrary === 'theme'}
            onToggle={() =>
              setOpenLibrary((current) => (current === 'theme' ? 'layout' : 'theme'))
            }
            count={experienceThemes.length}
            selectedLabel={selectedTheme.name}
          >
            <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
              {experienceThemes.map((theme, index) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => chooseTheme(theme.id)}
                  className={`w-full rounded-xl border p-2.5 text-left transition-all ${
                    selectedThemeId === theme.id
                      ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_18px_rgba(0,227,253,.10)]'
                      : 'border-white/10 bg-[#020914]/40 hover:border-cyan-400/30 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-9 w-11 rounded-lg border border-white/10 shrink-0"
                      style={{
                        background:
                          theme.background.mode === 'image'
                            ? `url(${theme.background.value}) center/cover`
                            : theme.background.value,
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-xs font-semibold">{theme.name}</span>
                        {index === 0 && (
                          <span className="rounded px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-cyan-300 border border-cyan-400/20">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 truncate text-[10px] text-[#82a5bb]">
                        {theme.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ExperienceLibraryCard>

          <ExperienceLibraryCard
            title="Layout Library"
            subtitle="Page frame and region arrangement"
            icon={LayoutTemplate}
            open={openLibrary === 'layout'}
            onToggle={() =>
              setOpenLibrary((current) => (current === 'layout' ? 'theme' : 'layout'))
            }
            count={experienceLayouts.length}
            selectedLabel={selectedLayout.name}
          >
            <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
              {experienceLayouts.map((layout, index) => (
                <button
                  key={layout.id}
                  type="button"
                  onClick={() => chooseLayout(layout.id)}
                  className={`w-full rounded-xl border p-2.5 text-left transition-all ${
                    selectedLayoutId === layout.id
                      ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_18px_rgba(0,227,253,.10)]'
                      : 'border-white/10 bg-[#020914]/40 hover:border-cyan-400/30 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <LayoutMiniPreview layout={layout} compact />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-xs font-semibold">{layout.name}</span>
                        {index === 0 && (
                          <span className="rounded px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-cyan-300 border border-cyan-400/20">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 truncate text-[10px] text-[#82a5bb]">
                        {layout.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ExperienceLibraryCard>

          <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-[11px] leading-5 text-amber-200">
            The selected experience stays solution-scoped. The libraries remain shared AAi framework capabilities.
          </div>
        </div>

        <div className="min-w-0">
          {openLibrary === 'theme' ? (
            <ThemeDetail theme={selectedTheme} />
          ) : (
            <LayoutDetail layout={selectedLayout} />
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-xs">
        <div>
          <div className="font-semibold text-cyan-200">Live Draft Experience</div>
          <div className="mt-0.5 text-[#82a5bb]">
            {selectedTheme.name} · {selectedLayout.name}
          </div>
        </div>
        <button
          type="button"
          onClick={onPreview}
          className="rounded-lg bg-cyan-400 px-3 py-2 text-xs font-bold text-[#00131f]"
        >
          Apply &amp; Preview
        </button>
      </div>
    </Panel>
  );
}

function ExperienceLibraryCard({
  title,
  subtitle,
  icon: Icon,
  open,
  onToggle,
  count,
  selectedLabel,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  open: boolean;
  onToggle: () => void;
  count: number;
  selectedLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`rounded-2xl border transition-all ${
      open
        ? 'border-cyan-400/30 bg-[#061525]/90'
        : 'border-white/10 bg-[#061525]/60'
    }`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <div className="w-9 h-9 rounded-xl border border-cyan-400/20 bg-cyan-400/5 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-cyan-300" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{title}</span>
            <span className="text-[9px] rounded-full border border-white/10 px-1.5 py-0.5 font-mono text-[#6e91a6]">
              {count}
            </span>
          </div>
          <div className="text-[10px] text-[#6e91a6] truncate">{subtitle}</div>
          {!open && (
            <div className="mt-1 text-[10px] text-cyan-300 truncate">
              Selected: {selectedLabel}
            </div>
          )}
        </div>
        <span className="text-[#82a5bb] text-xs">{open ? '−' : '+'}</span>
      </button>

      {open ? <div className="px-3 pb-3">{children}</div> : null}
    </section>
  );
}

function ThemeDetail({ theme }: { theme: (typeof experienceThemes)[number] }) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-cyan-400/20 bg-[#061525]/90 overflow-hidden">
        <div
          className="h-40 border-b border-white/10 relative"
          style={{
            background:
              theme.background.mode === 'image'
                ? `url(${theme.background.value}) center/cover`
                : theme.background.value,
          }}
        >
          {theme.background.overlay ? (
            <div className="absolute inset-0" style={{ background: theme.background.overlay }} />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#020914] to-transparent">
            <div className="text-[9px] uppercase tracking-[0.25em] font-mono text-cyan-300">
              Theme Specification
            </div>
            <h3 className="mt-1 text-2xl font-semibold text-white">{theme.name}</h3>
            <p className="mt-1 text-xs text-[#b6cada]">{theme.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4">
          <ThemeStat label="Display Font" value={theme.typography.display} />
          <ThemeStat label="Body Font" value={theme.typography.body} />
          <ThemeStat label="Corner" value={theme.tokens.radius} />
          <ThemeStat label="Background" value={theme.background.mode} />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ThemeTokenCard title="Typography" items={[
          ['Display', theme.typography.display],
          ['Body', theme.typography.body],
          ['Mono', theme.typography.mono],
        ]} />

        <ThemeTokenCard title="Surface & Shape" items={[
          ['Background', theme.tokens.background],
          ['Surface', theme.tokens.surface],
          ['Alt Surface', theme.tokens.surfaceAlt],
          ['Corner Radius', theme.tokens.radius],
          ['Shadow', theme.tokens.shadow],
        ]} />

        <ThemeTokenCard title="Interaction" items={[
          ['Primary', theme.tokens.primary],
          ['Secondary', theme.tokens.secondary],
          ['Accent', theme.tokens.accent],
          ['Border', theme.tokens.border],
        ]} />

        <ThemeTokenCard title="Readable Content" items={[
          ['Text', theme.tokens.text],
          ['Muted Text', theme.tokens.textMuted],
          ['Background Mode', theme.background.mode],
          ['Background Value', theme.background.value],
        ]} />
      </div>
    </div>
  );
}

function ThemeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="text-[9px] uppercase tracking-wider text-[#6e91a6]">{label}</div>
      <div className="mt-1 text-[11px] font-semibold break-words">{value}</div>
    </div>
  );
}

function ThemeTokenCard({
  title,
  items,
}: {
  title: string;
  items: readonly [string, string][];
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#061525]/70 p-4">
      <h4 className="text-sm font-semibold">{title}</h4>
      <div className="mt-3 space-y-2">
        {items.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
            <span className="text-[10px] text-[#6e91a6] shrink-0">{label}</span>
            <span className="text-[10px] font-mono text-right text-[#cfeaf5] break-words max-w-[65%]">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function LayoutDetail({ layout }: { layout: (typeof experienceLayouts)[number] }) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-cyan-400/20 bg-[#061525]/90 p-5">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          <div className="min-w-0 flex-1">
            <div className="text-[9px] uppercase tracking-[0.25em] font-mono text-cyan-300">
              Layout Specification
            </div>
            <h3 className="mt-1 text-2xl font-semibold">{layout.name}</h3>
            <p className="mt-2 text-sm text-[#82a5bb]">{layout.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-400/20 px-2 py-1 text-[10px] text-cyan-200">
                {layout.navigation}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-[#9bb6c7]">
                Rails: {layout.railPolicy}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-[#9bb6c7]">
                L{layout.drilldownLevels}
              </span>
            </div>
          </div>
          <div className="w-full lg:w-[360px] rounded-2xl border border-white/10 bg-[#020914] p-3">
            <LayoutMiniPreview layout={layout} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#061525]/70 p-4">
        <h4 className="text-sm font-semibold">Screen Regions</h4>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {layout.regions.map((region, index) => (
            <div key={region} className="rounded-xl border border-cyan-400/15 bg-cyan-400/5 p-3">
              <div className="text-[9px] font-mono uppercase tracking-wider text-cyan-300">R{index + 1}</div>
              <div className="mt-1 text-xs font-semibold capitalize">{region.replace('-', ' ')}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function LayoutMiniPreview({
  layout,
  compact = false,
}: {
  layout: (typeof experienceLayouts)[number];
  compact?: boolean;
}) {
  const regions = layout.regions;
  const showLeft = regions.includes('left');
  const showRight = regions.includes('right');

  return (
    <div className={`w-full rounded-xl border border-cyan-400/15 bg-[#020914] p-2 ${
      compact ? 'h-20' : 'h-56'
    }`}>
      <div className="flex flex-col h-full gap-1">
        {regions.includes('header') && (
          <div className="h-4 rounded border border-cyan-400/30 bg-cyan-400/10 flex items-center px-1.5">
            <span className="text-[7px] text-cyan-300">HEADER</span>
          </div>
        )}

        <div className="flex flex-1 min-h-0 gap-1">
          {showLeft && (
            <div className="w-[18%] rounded border border-indigo-400/25 bg-indigo-400/10 flex items-center justify-center">
              <span className="text-[7px] text-indigo-200 [writing-mode:vertical-rl]">LEFT</span>
            </div>
          )}

          <div className="flex-1 rounded border border-emerald-400/25 bg-emerald-400/10 flex items-center justify-center">
            <span className="text-[8px] text-emerald-200">MAIN</span>
          </div>

          {showRight && (
            <div className="w-[18%] rounded border border-violet-400/25 bg-violet-400/10 flex items-center justify-center">
              <span className="text-[7px] text-violet-200 [writing-mode:vertical-rl]">RIGHT</span>
            </div>
          )}
        </div>

        {regions.includes('footer') && (
          <div className="h-4 rounded border border-amber-400/25 bg-amber-400/10 flex items-center px-1.5">
            <span className="text-[7px] text-amber-200">FOOTER</span>
          </div>
        )}
      </div>
    </div>
  );
}

function JsonEditor({ title, value, onChange, onSave, action, onImport }: { title: string; value: string; onChange: (value: string) => void; onSave: () => void; action: string; onImport?: () => void }) {
  return <Panel title={title} icon={FileJson}><div className="flex flex-wrap gap-2 mb-3">{onImport && <button type="button" onClick={onImport} className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 px-3 py-2 text-xs text-cyan-300"><Upload className="w-4 h-4"/> Import JSON</button>}<button type="button" onClick={onSave} className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-3 py-2 text-xs font-bold text-[#00131f]"><Save className="w-4 h-4"/>{action}</button></div><textarea value={value} onChange={(event) => onChange(event.target.value)} className="min-h-[360px] w-full rounded-xl border border-white/10 bg-[#020914] p-4 font-mono text-xs text-[#cfeaf5] outline-none focus:border-cyan-400/40" spellCheck={false}/></Panel>;
}

function PromptEditor({ value, onChange, onSave }: { value: string; onChange: (value: string) => void; onSave: () => void }) { return <Panel title="AI Prompt Control" icon={Bot}><p className="text-xs text-[#82a5bb] mb-3">Store solution-owned instructions here. Provider credentials and secrets remain outside the prompt configuration.</p><textarea value={value} onChange={(event) => onChange(event.target.value)} className="min-h-[260px] w-full rounded-xl border border-white/10 bg-[#020914] p-4 text-sm leading-6 outline-none focus:border-cyan-400/40"/><button type="button" onClick={onSave} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-3 py-2 text-xs font-bold text-[#00131f]"><Save className="w-4 h-4"/> Save Prompt</button></Panel>; }

function Capability({ title, icon: Icon, items }: { title: string; icon: React.ComponentType<{ className?: string }>; items: string[] }) { return <Panel title={title} icon={Icon}><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{items.map(item => <div key={item} className="rounded-xl border border-white/10 bg-[#020914]/60 p-4"><CheckCircle2 className="w-4 h-4 text-emerald-300"/><div className="mt-2 text-sm">{item}</div></div>)}</div></Panel>; }

function PublishPanel({ config, onSave, onPublish, onPreview, name }: { config: SolutionAdminConfig; onSave: () => void; onPublish: () => void; onPreview: (config: SolutionAdminConfig) => void; name: string }) { return <Panel title="Publish & Lifecycle" icon={Send}><div className="grid grid-cols-2 md:grid-cols-4 gap-3"><Metric label="State" value={config.publishState}/><Metric label="Version" value={`v${config.version}`}/><Metric label="Theme" value={config.themeId}/><Metric label="Layout" value={config.layoutId}/></div><div className="flex flex-wrap gap-2 mt-5"><button type="button" onClick={onSave} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs"><Save className="w-4 h-4"/> Save Draft</button><button type="button" onClick={onPublish} className="inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-3 py-2 text-xs font-bold text-[#001a10]"><Send className="w-4 h-4"/> Publish</button><button type="button" onClick={() => { saveSolutionAdminConfig(config); onPreview(config); }} className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 px-3 py-2 text-xs text-cyan-300"><ArrowLeft className="w-4 h-4"/> Preview {name}</button></div></Panel>; }

function Audit({ config }: { config: SolutionAdminConfig }) { return <Panel title="Solution Audit" icon={CheckCircle2}><div className="grid grid-cols-1 md:grid-cols-3 gap-3"><Info label="Solution" value={config.solutionId}/><Info label="Version" value={`v${config.version}`}/><Info label="Last Updated" value={new Date(config.updatedAt).toLocaleString()}/></div><div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-xs text-emerald-200">Configuration changes are solution-scoped. Platform framework governance remains in AAi-Admin.</div></Panel>; }

function Panel({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) { return <section className="rounded-2xl border border-white/10 bg-[#061525]/80 p-5"><div className="flex items-center gap-2 mb-5"><Icon className="w-5 h-5 text-cyan-400"/><div><h2 className="text-xl font-semibold">{title}</h2><p className="text-xs text-[#6e91a6]">Solution-scoped configuration</p></div></div>{children}</section>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-white/10 bg-[#020914]/60 p-3"><div className="text-[10px] uppercase tracking-wider text-[#6e91a6]">{label}</div><div className="mt-1 text-sm font-semibold break-words">{value}</div></div>; }
function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-white/10 bg-[#020914]/60 p-3"><div className="text-[10px] uppercase tracking-wider text-[#6e91a6]">{label}</div><div className="mt-1 text-xs font-mono break-all">{value}</div></div>; }
