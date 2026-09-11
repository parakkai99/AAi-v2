import React, { useMemo, useState } from 'react';
import { ArrowLeft, Bot, Boxes, CheckCircle2, FileJson, Layers3, LayoutTemplate, Palette, Settings2, ShieldCheck, Sparkles, Upload, Users, WandSparkles } from 'lucide-react';
import { getRegisteredApplicationDefinitions } from '@/src/applications/ApplicationRegistry';
import { experienceThemes } from '@/src/experience/theme/ThemeRegistry';
import { experienceLayouts } from '@/src/experience/layout/LayoutRegistry';

/**
 * AAi Platform Administration
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: AAi-ADMIN-001 — Platform Administration Boundary
 * Status: ACTIVE
 * Version: 1.0.1
 *
 * AAi-Admin governs the platform. Solution Admin governs each individual solution.
 */

export interface AAiPlatformAdminProps {
  onReturnToUniverse?: () => void;
}

const applicationLabels: Record<string, { name: string; description: string; status: string }> = {
  parakkai: { name: 'Parakkai', description: 'Complete reference solution and production proving ground.', status: 'Reference / Active' },
  ngliving: { name: 'NGLiving', description: 'Second reference solution used to validate portability.', status: 'Reference / Active' },
};

type PlatformSection = readonly [
  title: string,
  description: string,
  icon: React.ComponentType<{ className?: string }>,
];

const platformSections: readonly PlatformSection[] = [
  ['Framework', 'Reusable contracts, components and runtime capability.', Layers3],
  ['Theme Library', 'Framework-owned themes available to solutions.', Palette],
  ['Layout Library', 'Reusable navigation and drilldown layouts.', LayoutTemplate],
  ['Component Library', 'Reusable AAi experience components.', Boxes],
  ['Animation Library', 'Universal animation objects, motions and triggers.', Sparkles],
  ['License Authority', 'Entitlements, capacity, registration and certification.', ShieldCheck],
  ['Runtime', 'Local, hosted and platform adapters.', Settings2],
  ['AI Platform', 'AI capability, policy and provider governance.', Bot],
  ['Identity & Access', 'Platform users, roles and security policy.', Users],
  ['Lifecycle & Audit', 'Framework and platform lifecycle governance.', CheckCircle2],
];

export const AAiPlatformAdmin: React.FC<AAiPlatformAdminProps> = ({ onReturnToUniverse }) => {
  const [notice, setNotice] = useState('');
  const applications = useMemo(() => getRegisteredApplicationDefinitions(), []);

  const openSolution = (id: string) => {
    window.history.pushState({}, '', `/solution-admin/${id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-[#020914] text-[#eaf7ff] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400">AAi Platform Administration</div>
            <h1 className="mt-1 text-3xl sm:text-4xl font-bold">AAi-Admin</h1>
            <p className="mt-2 max-w-3xl text-sm text-[#82a5bb]">Platform authority for framework capability, licensing, runtime, reusable experience libraries, AI governance and application registration.</p>
          </div>
          <div className="flex items-center gap-2">
            {notice && <span className="text-xs text-emerald-300 font-mono">{notice}</span>}
            {onReturnToUniverse && <button type="button" onClick={onReturnToUniverse} className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-[#031c33] px-3 py-2 text-xs font-mono text-cyan-300"><ArrowLeft className="w-4 h-4"/> AAi Universe</button>}
          </div>
        </header>

        <section className="rounded-2xl border border-cyan-400/20 bg-[#061525]/80 p-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div><div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">Platform boundary</div><h2 className="text-xl font-semibold mt-1">Registered Solutions</h2></div>
            <span className="rounded-full border border-cyan-400/20 px-3 py-1 text-[10px] font-mono text-cyan-300">{applications.length} registered</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {applications.map((application) => {
              const meta = applicationLabels[application.id] ?? { name: application.id, description: 'Registered AAi solution.', status: 'Registered' };
              return (
                <article key={application.id} className="rounded-2xl border border-white/10 bg-[#020914]/70 p-5 hover:border-cyan-400/30 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">Solution</div>
                      <h3 className="mt-1 text-2xl font-bold">{meta.name}</h3>
                      <p className="mt-2 text-sm text-[#82a5bb]">{meta.description}</p>
                    </div>
                    <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 text-[10px] font-mono text-emerald-300">{meta.status}</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                    <Info label="Solution ID" value={application.id}/>
                    <Info label="Runtime" value="AAi Application Runtime"/>
                  </div>
                  <button type="button" onClick={() => openSolution(application.id)} className="mt-5 w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-[#00131f]">Open Solution Admin →</button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#061525]/80 p-5">
          <div className="flex items-center gap-2 mb-4"><Settings2 className="w-5 h-5 text-cyan-400"/><div><h2 className="text-xl font-semibold">AAi Platform Controls</h2><p className="text-xs text-[#82a5bb]">These controls belong to AAi, not to an individual solution.</p></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {platformSections.map(([title, description, Icon]) => (
              <div key={title} className="rounded-xl border border-white/10 bg-[#020914]/60 p-4">
                <Icon className="w-5 h-5 text-cyan-400"/>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-xs text-[#82a5bb]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <MetricCard label="Theme Library" value={experienceThemes.length.toString()} detail="framework themes" icon={Palette}/>
          <MetricCard label="Layout Library" value={experienceLayouts.length.toString()} detail="reusable layouts" icon={LayoutTemplate}/>
          <MetricCard label="Solution Boundary" value="ENFORCED" detail="identity stays outside runtime" icon={ShieldCheck}/>
        </section>

        <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
          <div className="flex items-center gap-2 text-cyan-300"><Sparkles className="w-4 h-4"/><span className="text-sm font-semibold">Frozen administration rule</span></div>
          <p className="mt-1 text-xs text-[#82a5bb]">AAi-Admin governs the platform. Solution Admin governs the selected solution's identity, UX, theme, layout, content, JSON/data, assets, AI prompts, integrations, users, publish lifecycle and audit.</p>
        </section>
      </div>
    </div>
  );
};

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-white/10 bg-black/10 p-3"><div className="text-[10px] uppercase tracking-wider text-[#6e91a6]">{label}</div><div className="mt-1 text-xs font-mono text-[#d9f5ff] break-all">{value}</div></div>;
}

function MetricCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: React.ComponentType<{ className?: string }> }) {
  return <div className="rounded-xl border border-white/10 bg-[#061525]/80 p-4"><Icon className="w-5 h-5 text-cyan-400"/><div className="mt-3 text-2xl font-bold">{value}</div><div className="text-sm font-semibold">{label}</div><div className="text-xs text-[#6e91a6] mt-1">{detail}</div></div>;
}
