/**
 * AAi Admin Console
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: ADMIN-CONSOLE-002
 * Status: ACTIVE
 * Version: 1.2.0
 *
 * Framework administration surface. This stage provides an editable local
 * administration model; persistence/remote authority will be attached through
 * services later. Customer content, customer databases and private signing
 * material are never displayed in the client console.
 */

import React, { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, KeyRound, Save, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { licenseService } from '@/src/services/licenseService';
import type { AAILicenseRecord, LicenseClass, LicenseStatus } from '@/src/contracts/license';

export interface AAiAdminConsoleProps {
  onReturnToUniverse?: () => void;
}

type AdminSection =
  | 'Dashboard'
  | 'Applications'
  | 'Licenses'
  | 'Signing Keys'
  | 'Runtime'
  | 'Data'
  | 'AI'
  | 'Intelligence Exchange'
  | 'Identity & Access'
  | 'Experience Builder'
  | 'Lifecycle & Audit';

const sections: AdminSection[] = [
  'Dashboard',
  'Applications',
  'Licenses',
  'Signing Keys',
  'Runtime',
  'Data',
  'AI',
  'Intelligence Exchange',
  'Identity & Access',
  'Experience Builder',
  'Lifecycle & Audit',
];

export const AAiAdminConsole: React.FC<AAiAdminConsoleProps> = ({ onReturnToUniverse }) => {
  const initialLicense = licenseService.getCurrentLicense();
  const key = licenseService.getActiveSigningKey();
  const [activeSection, setActiveSection] = useState<AdminSection>('Dashboard');
  const [license, setLicense] = useState<AAILicenseRecord>(initialLicense);
  const [saved, setSaved] = useState(false);

  const summary = useMemo(() => [
    ['Applications', license.capacity.applications],
    ['Components', license.capacity.components],
    ['Datastores', license.capacity.datastores],
    ['Users', license.capacity.users],
    ['AI Requests', license.capacity.aiRequests],
  ] as const, [license]);

  const updateCapacity = (field: keyof AAILicenseRecord['capacity'], value: string) => {
    const next = Math.max(0, Number(value) || 0);
    setSaved(false);
    setLicense((current) => ({
      ...current,
      capacity: { ...current.capacity, [field]: next },
    }));
  };

  const updateRuntime = (field: keyof AAILicenseRecord['runtime'], checked: boolean) => {
    setSaved(false);
    setLicense((current) => ({
      ...current,
      runtime: { ...current.runtime, [field]: checked },
    }));
  };

  const saveLocalChanges = () => {
    setSaved(true);
    // Deliberately local for this framework stage. A future License Authority
    // service will replace this with signed persistence/registration.
  };

  return (
    <div className="min-h-screen bg-[#020914] text-[#eaf7ff] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#00dfff]">AAi Platform Administration</div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold">Admin Console</h1>
            <p className="mt-1 text-sm text-[#82a5bb]">Framework, licensing, runtime and intelligence administration.</p>
          </div>
          <div className="flex items-center gap-2">
            {saved && <span className="text-[10px] font-mono text-emerald-300">LOCAL CHANGES SAVED</span>}
            {onReturnToUniverse && (
              <button type="button" onClick={onReturnToUniverse} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#00dfff]/30 bg-[#031c33]/80 text-[#00dfff] text-xs font-mono font-bold hover:bg-[#052b4f]">
                <ArrowLeft className="w-4 h-4" /> AAi Universe
              </button>
            )}
          </div>
        </div>

        <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2" aria-label="AAi administration sections">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => setActiveSection(section)}
              className={`rounded-xl border p-3 text-xs font-mono text-left transition-colors ${
                activeSection === section
                  ? 'border-[#00dfff]/50 bg-[#031c33] text-[#00e3fd] shadow-[0_0_18px_rgba(0,223,255,0.08)]'
                  : 'border-white/10 bg-white/[0.02] text-[#82a5bb] hover:border-[#00dfff]/30 hover:text-[#dff7ff]'
              }`}
            >
              {section}
            </button>
          ))}
        </nav>

        {activeSection === 'Dashboard' || activeSection === 'Licenses' ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <section className="xl:col-span-2 rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-5">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-[#00dfff]" />
                <h2 className="font-semibold">License Administration</h2>
                <select
                  value={license.status}
                  onChange={(e) => { setSaved(false); setLicense((current) => ({ ...current, status: e.target.value as LicenseStatus })); }}
                  className="ml-auto rounded-lg border border-[#00dfff]/25 bg-[#020914] px-2 py-1 text-[10px] font-mono text-[#00e3fd]"
                  aria-label="License status"
                >
                  {['draft', 'issued', 'registered', 'active', 'suspended', 'expired', 'revoked'].map((status) => <option key={status}>{status}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                <Info label="License ID" value={license.id} />
                <label className="rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-3">
                  <span className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">Class</span>
                  <select
                    value={license.licenseClass}
                    onChange={(e) => { setSaved(false); setLicense((current) => ({ ...current, licenseClass: e.target.value as LicenseClass })); }}
                    className="mt-1 w-full bg-transparent text-xs font-mono text-[#dff7ff] outline-none"
                  >
                    <option>standard</option><option>professional</option><option>enterprise</option>
                  </select>
                </label>
                <Info label="Version" value={license.version} />
                <Info label="Key ID" value={license.keyId} />
              </div>

              <h3 className="text-xs font-mono uppercase tracking-wider text-[#82a5bb] mb-2">Editable Capacity</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {summary.map(([label, value]) => {
                  const field = label === 'AI Requests' ? 'aiRequests' : label.toLowerCase() as keyof AAILicenseRecord['capacity'];
                  return (
                    <label key={label} className="rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-3 text-center">
                      <input
                        type="number"
                        min="0"
                        value={value}
                        onChange={(e) => updateCapacity(field, e.target.value)}
                        className="w-full bg-transparent text-center text-lg font-bold text-[#00dfff] outline-none"
                      />
                      <span className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">{label}</span>
                    </label>
                  );
                })}
              </div>

              <button type="button" onClick={saveLocalChanges} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#00dfff]/40 bg-[#00dfff]/10 px-4 py-2 text-xs font-mono font-bold text-[#00e3fd] hover:bg-[#00dfff]/20">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </section>

            <section className="rounded-2xl border border-purple-400/20 bg-[#0b1020]/80 p-5">
              <div className="flex items-center gap-2 mb-4">
                <KeyRound className="w-5 h-5 text-purple-300" />
                <h2 className="font-semibold">Signing Key Administration</h2>
              </div>
              <div className="space-y-3 text-sm">
                <Info label="Key ID" value={key.keyId} />
                <Info label="Algorithm" value={key.algorithm} />
                <Info label="Status" value={key.status} />
                <Info label="Public Key" value={key.publicKeyRef} />
              </div>
              <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-[11px] text-amber-200/80 font-mono">Private signing material is never stored or displayed in the AAi client/runtime.</div>
            </section>
          </div>
        ) : activeSection === 'Runtime' ? (
          <EditablePanel title="Runtime Administration" description="Configure which execution environments this license permits.">
            {(['local', 'hosted', 'catalyst', 'aws'] as const).map((field) => (
              <Toggle key={field} label={field.toUpperCase()} checked={license.runtime[field]} onChange={(checked) => updateRuntime(field, checked)} />
            ))}
            <button type="button" onClick={saveLocalChanges} className="mt-2 inline-flex items-center gap-2 rounded-xl border border-[#00dfff]/40 bg-[#00dfff]/10 px-4 py-2 text-xs font-mono font-bold text-[#00e3fd]"><Save className="w-4 h-4" /> Save Runtime</button>
          </EditablePanel>
        ) : (
          <EditablePanel title={`${activeSection} Administration`} description="Framework foundation is enabled. This section is ready for its service-backed configuration model.">
            <div className="rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-4 text-sm text-[#82a5bb]">
              <div className="font-mono text-[#00e3fd] mb-2">CONFIGURATION READY</div>
              {activeSection === 'Applications' && 'Application capacity, creation and lifecycle will be managed here.'}
              {activeSection === 'Data' && 'JSON, API and database connection definitions will be managed here.'}
              {activeSection === 'AI' && 'Intent, prompt, content and image configuration will be managed here.'}
              {activeSection === 'Intelligence Exchange' && 'AAi Reference Network, Open Market, recommendations, cross-promotion and royalty controls will be managed here.'}
              {activeSection === 'Identity & Access' && 'Owner, organization, users, roles, 2FA and social identity configuration will be managed here.'}
              {activeSection === 'Experience Builder' && 'Pages, structures, layouts, themes and asset references will be managed here.'}
              {activeSection === 'Lifecycle & Audit' && 'Registration, capacity reservation, upgrade, suspension, deletion and audit events will be managed here.'}
              {activeSection === 'Signing Keys' && 'Key rotation and public-key registry controls will be managed here. Private keys remain outside the client.'}
            </div>
          </EditablePanel>
        )}

        <section className="rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-5">
          <div className="flex items-center gap-2 mb-4"><SlidersHorizontal className="w-5 h-5 text-[#00dfff]" /><h2 className="font-semibold">Security Policy</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Policy title="Digital Signature" value="Ed25519" />
            <Policy title="Payload Integrity" value="SHA-256" />
            <Policy title="Certificate Authority" value="Not required for license signing" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-300 font-mono"><CheckCircle2 className="w-4 h-4" /> License contract baseline is configured for AAi Framework v1.2.</div>
        </section>
      </div>
    </div>
  );
};

function EditablePanel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-5"><h2 className="text-lg font-semibold">{title}</h2><p className="mt-1 mb-5 text-sm text-[#82a5bb]">{description}</p><div className="space-y-3">{children}</div></section>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex items-center justify-between rounded-xl border border-white/10 bg-[#020914]/60 p-4 cursor-pointer"><span className="font-mono text-xs text-[#dff7ff]">{label}</span><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-cyan-400" /></label>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-3 min-w-0"><div className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">{label}</div><div className="mt-1 text-xs font-mono text-[#dff7ff] break-words">{value}</div></div>;
}

function Policy({ title, value }: { title: string; value: string }) {
  return <div className="rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-4"><div className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">{title}</div><div className="mt-1 text-sm font-semibold text-[#dff7ff]">{value}</div></div>;
}
