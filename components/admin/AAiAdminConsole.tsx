/**
 * AAi Admin Console
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: ADMIN-CONSOLE-003 — License Authority Management
 * Status: ACTIVE
 * Version: 1.3.0
 *
 * AAi owner/issuer console. It manages recipients, capacity, lifecycle,
 * certification history and audit events. Production signing remains outside
 * the browser; private signing material is never displayed.
 */

import React, { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, KeyRound, Plus, RefreshCw, ShieldCheck, SlidersHorizontal, UserRound, XCircle } from 'lucide-react';
import type { AAILicenseRecord, LicenseCapacity, LicenseClass } from '@/src/contracts/license';
import { licenseService } from '@/src/services/licenseService';

export interface AAiAdminConsoleProps { onReturnToUniverse?: () => void; }

const emptyCapacity: LicenseCapacity = { applications: 1, components: 1, datastores: 1, users: 100, aiRequests: 1000 };

export const AAiAdminConsole: React.FC<AAiAdminConsoleProps> = ({ onReturnToUniverse }) => {
  const [activeSection, setActiveSection] = useState('Licenses');
  const [licenses, setLicenses] = useState<AAILicenseRecord[]>(() => licenseService.getIssuedLicenses());
  const [selectedId, setSelectedId] = useState(licenses[0]?.id || '');
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [notice, setNotice] = useState('');

  const selected = useMemo(() => licenses.find((license) => license.id === selectedId) || licenses[0], [licenses, selectedId]);
  const refresh = (message = '') => {
    const next = licenseService.getIssuedLicenses();
    setLicenses(next);
    if (!selectedId && next[0]) setSelectedId(next[0].id);
    if (message) setNotice(message);
  };

  const handleCertify = () => {
    if (!selected) return;
    licenseService.certifyLicense(selected.id);
    refresh(`License ${selected.id} re-certified. New certification record created.`);
  };
  const handleStatus = (status: AAILicenseRecord['status']) => {
    if (!selected) return;
    licenseService.setStatus(selected.id, status);
    refresh(`${selected.id} status changed to ${status}.`);
  };
  const handleCapacity = (capacity: LicenseCapacity) => {
    if (!selected) return;
    licenseService.updateCapacity(selected.id, capacity);
    refresh(`${selected.id} capacity updated.`);
  };

  const sections = ['Dashboard', 'Applications', 'Licenses', 'Signing Keys', 'Runtime', 'Data', 'AI', 'Intelligence Exchange', 'Identity & Access', 'Experience Builder', 'Lifecycle & Audit'];

  return (
    <div className="min-h-screen bg-[#020914] text-[#eaf7ff] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-5">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div><div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#00dfff]">AAi Platform Administration</div><h1 className="mt-1 text-2xl sm:text-3xl font-bold">Admin Console</h1><p className="mt-1 text-sm text-[#82a5bb]">Owner, licensing, runtime and intelligence management.</p></div>
          {onReturnToUniverse && <button type="button" onClick={onReturnToUniverse} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#00dfff]/30 bg-[#031c33]/80 text-[#00dfff] text-xs font-mono font-bold"><ArrowLeft className="w-4 h-4" /> AAi Universe</button>}
        </header>

        <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2" aria-label="AAi administration sections">
          {sections.map((section) => <button key={section} type="button" onClick={() => setActiveSection(section)} className={`rounded-xl border p-3 text-xs font-mono text-left transition-colors ${activeSection === section ? 'border-[#00dfff]/50 bg-[#031c33]/90 text-[#00e3fd]' : 'border-white/10 bg-white/[0.02] text-[#82a5bb] hover:border-[#00dfff]/25 hover:text-[#dff7ff]'}`}>{section}</button>)}
        </nav>

        {activeSection === 'Licenses' ? (
          <>
            {notice && <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3 text-xs font-mono text-emerald-300">{notice}</div>}
            <section className="rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4"><div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#00dfff]" /><h2 className="font-semibold">License Authority</h2></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => { setShowIssueForm((value) => !value); setNotice(''); }} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#00dfff]/15 border border-[#00dfff]/40 text-[#00e3fd] text-xs font-mono font-bold"><Plus className="w-4 h-4" /> Issue License</button><button type="button" onClick={() => refresh()} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 text-[#82a5bb] text-xs font-mono"><RefreshCw className="w-4 h-4" /> Refresh</button></div></div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3"><Metric label="Issued" value={licenses.length} /><Metric label="Active" value={licenses.filter((item) => item.status === 'active').length} /><Metric label="Suspended" value={licenses.filter((item) => item.status === 'suspended').length} /><Metric label="Revoked" value={licenses.filter((item) => item.status === 'revoked').length} /></div>
            </section>
            {showIssueForm && <IssueLicenseForm onIssued={(license) => { setShowIssueForm(false); setSelectedId(license.id); refresh(`Issued ${license.id} to ${license.recipient.organizationName}.`); }} onCancel={() => setShowIssueForm(false)} />}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
              <section className="xl:col-span-2 rounded-2xl border border-white/10 bg-[#061525]/80 p-4"><div className="flex items-center gap-2 mb-3"><UserRound className="w-4 h-4 text-[#00dfff]" /><h2 className="font-semibold text-sm">Issued License Register</h2></div><div className="space-y-2">{licenses.map((license) => <button key={license.id} type="button" onClick={() => setSelectedId(license.id)} className={`w-full text-left rounded-xl border p-3 ${selected?.id === license.id ? 'border-[#00dfff]/50 bg-[#031c33]' : 'border-white/10 bg-[#020914]/50'}`}><div className="flex items-center justify-between gap-2"><span className="text-xs font-mono text-[#dff7ff]">{license.id}</span><StatusBadge status={license.status} /></div><div className="mt-2 text-sm font-semibold truncate">{license.recipient.organizationName}</div><div className="mt-1 text-[10px] font-mono text-[#6e9bb3]">{license.recipient.contactName} · {license.recipient.contactEmail}</div></button>)}</div></section>
              {selected ? <LicenseDetail license={selected} onCertify={handleCertify} onStatus={handleStatus} onCapacity={handleCapacity} /> : <EmptyState />}
            </div>
          </>
        ) : activeSection === 'Signing Keys' ? <SigningKeySection /> : activeSection === 'Lifecycle & Audit' ? <AuditSection licenses={licenses} /> : <FrameworkSection title={activeSection} />}

        <section className="rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-5"><div className="flex items-center gap-2 mb-4"><SlidersHorizontal className="w-5 h-5 text-[#00dfff]" /><h2 className="font-semibold">AAi Authority Security Boundary</h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-3"><Policy title="Issuer" value={`${licenseService.issuer.name} · ${licenseService.issuer.id}`} /><Policy title="Digital Signature" value="Ed25519" /><Policy title="Payload Integrity" value="SHA-256" /></div><div className="mt-4 text-[11px] text-amber-200/80 font-mono rounded-xl border border-amber-400/20 bg-amber-400/5 p-3">Browser console is a management reference. Production license signatures must be generated by the protected AAi License Authority; private signing keys are never stored or displayed here.</div></section>
      </div>
    </div>
  );
};

function IssueLicenseForm({ onIssued, onCancel }: { onIssued: (license: AAILicenseRecord) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ organizationName: '', organizationId: '', contactName: '', contactEmail: '', country: 'India', licenseClass: 'standard' as LicenseClass, expiresAt: '' });
  const [capacity, setCapacity] = useState<LicenseCapacity>(emptyCapacity);
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const updateCapacity = (field: keyof LicenseCapacity, value: string) => setCapacity((current) => ({ ...current, [field]: Math.max(0, Number(value) || 0) }));
  return <section className="rounded-2xl border border-[#00dfff]/30 bg-[#031c33]/80 p-5"><div className="flex items-center justify-between mb-4"><div><h2 className="font-semibold">Issue New License</h2><p className="text-[11px] text-[#82a5bb] mt-1">AAi is the issuer. Enter the purchaser / organization receiving the license.</p></div><button type="button" onClick={onCancel} className="text-[#82a5bb]"><XCircle className="w-5 h-5" /></button></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"><Field label="Organization / Purchaser" value={form.organizationName} onChange={(value) => update('organizationName', value)} placeholder="Customer organization" /><Field label="Organization ID" value={form.organizationId} onChange={(value) => update('organizationId', value)} placeholder="ORG-000001" /><Field label="Contact Name" value={form.contactName} onChange={(value) => update('contactName', value)} placeholder="Authorized contact" /><Field label="Contact Email" value={form.contactEmail} onChange={(value) => update('contactEmail', value)} placeholder="admin@example.com" /><Field label="Country" value={form.country} onChange={(value) => update('country', value)} placeholder="India" /><label className="text-[10px] font-mono text-[#6e9bb3] uppercase">License Class<select value={form.licenseClass} onChange={(event) => update('licenseClass', event.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-[#020914] p-3 text-sm text-[#dff7ff]"><option value="standard">Standard</option><option value="professional">Professional</option><option value="enterprise">Enterprise</option></select></label><Field label="Expires At" type="date" value={form.expiresAt} onChange={(value) => update('expiresAt', value)} /></div><div className="mt-4"><div className="text-[10px] font-mono uppercase tracking-wider text-[#6e9bb3] mb-2">Entitlements / Capacity</div><div className="grid grid-cols-2 sm:grid-cols-5 gap-2">{(['applications', 'components', 'datastores', 'users', 'aiRequests'] as const).map((field) => <label key={field} className="text-[9px] font-mono text-[#6e9bb3] uppercase">{field}<input type="number" min="0" value={capacity[field]} onChange={(event) => updateCapacity(field, event.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-[#020914] p-2 text-sm text-[#dff7ff]" /></label>)}</div></div><div className="mt-4 flex justify-end"><button type="button" disabled={!form.organizationName || !form.organizationId || !form.contactEmail} onClick={() => onIssued(licenseService.issueLicense({ ...form, expiresAt: form.expiresAt || undefined, capacity }))} className="px-4 py-2 rounded-xl bg-[#00dfff]/20 border border-[#00dfff]/50 text-[#00e3fd] text-xs font-mono font-bold disabled:opacity-40">Issue & Register License</button></div></section>;
}

function LicenseDetail({ license, onCertify, onStatus, onCapacity }: { license: AAILicenseRecord; onCertify: () => void; onStatus: (status: AAILicenseRecord['status']) => void; onCapacity: (capacity: LicenseCapacity) => void }) {
  const [capacity, setCapacity] = useState(license.capacity);
  const events = licenseService.getEvents(license.id);
  return <section className="xl:col-span-3 rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-5 space-y-5"><div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3"><div><div className="text-[10px] font-mono text-[#6e9bb3]">LICENSE</div><h2 className="text-xl font-bold font-mono">{license.id}</h2><div className="mt-1 text-sm text-[#82a5bb]">Issued by <strong className="text-[#dff7ff]">{licenseService.issuer.name}</strong> to <strong className="text-[#dff7ff]">{license.recipient.organizationName}</strong></div></div><StatusBadge status={license.status} /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><Info label="Purchaser / Organization" value={license.recipient.organizationName} /><Info label="Organization ID" value={license.recipient.organizationId} /><Info label="Authorized Contact" value={`${license.recipient.contactName} · ${license.recipient.contactEmail}`} /><Info label="Environment" value={license.recipient.environmentId || 'Not registered'} /><Info label="Issued" value={new Date(license.issuedAt).toLocaleString()} /><Info label="Expires" value={license.expiresAt ? new Date(license.expiresAt).toLocaleDateString() : 'No expiry set'} /></div><div className="rounded-xl border border-purple-400/20 bg-[#0b1020]/70 p-4"><div className="flex items-center justify-between gap-2"><div><div className="text-[10px] font-mono uppercase text-purple-300">Certification</div><div className="mt-1 text-sm font-semibold">{license.certification.certificationId}</div></div><button type="button" onClick={onCertify} className="px-3 py-2 rounded-xl border border-purple-400/40 text-purple-200 text-xs font-mono font-bold">Re-certify / Renew</button></div><div className="mt-2 text-[10px] font-mono text-[#82a5bb]">Version {license.certification.certificationVersion} · {license.certification.signatureAlgorithm} · {license.certification.payloadIntegrity} · {license.certification.verificationStatus}</div></div><div><div className="flex items-center justify-between mb-2"><h3 className="text-xs font-mono uppercase tracking-wider text-[#82a5bb]">Capacity Management</h3><button type="button" onClick={() => onCapacity(capacity)} className="text-xs font-mono text-[#00e3fd]">Save Capacity</button></div><div className="grid grid-cols-2 sm:grid-cols-5 gap-2">{(['applications', 'components', 'datastores', 'users', 'aiRequests'] as const).map((field) => <label key={field} className="text-[9px] font-mono text-[#6e9bb3] uppercase">{field}<input type="number" min="0" value={capacity[field]} onChange={(event) => setCapacity((current) => ({ ...current, [field]: Math.max(0, Number(event.target.value) || 0) }))} className="mt-1 w-full rounded-xl border border-white/10 bg-[#020914] p-2 text-sm text-[#dff7ff]" /></label>)}</div></div><div><h3 className="text-xs font-mono uppercase tracking-wider text-[#82a5bb] mb-2">Lifecycle Actions</h3><div className="flex flex-wrap gap-2">{license.status !== 'active' && license.status !== 'revoked' && <button type="button" onClick={() => onStatus('active')} className="px-3 py-2 rounded-xl border border-emerald-400/30 text-emerald-300 text-xs font-mono">Activate</button>}{license.status !== 'suspended' && license.status !== 'revoked' && <button type="button" onClick={() => onStatus('suspended')} className="px-3 py-2 rounded-xl border border-amber-400/30 text-amber-300 text-xs font-mono">Suspend</button>}{license.status !== 'revoked' && <button type="button" onClick={() => onStatus('revoked')} className="px-3 py-2 rounded-xl border border-red-400/30 text-red-300 text-xs font-mono">Revoke</button>}</div></div><div><h3 className="text-xs font-mono uppercase tracking-wider text-[#82a5bb] mb-2">Audit History</h3><div className="space-y-1">{events.slice(0, 10).map((event) => <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-lg bg-[#020914]/60 p-2 text-[10px] font-mono"><span className="text-[#00dfff]">{event.type}</span><span className="text-[#6e9bb3]">{new Date(event.at).toLocaleString()} · {event.actor}</span></div>)}</div></div></section>;
}

function SigningKeySection() { const key = licenseService.getActiveSigningKey(); return <section className="rounded-2xl border border-purple-400/20 bg-[#0b1020]/80 p-5"><div className="flex items-center gap-2 mb-4"><KeyRound className="w-5 h-5 text-purple-300" /><h2 className="font-semibold">Signing Key Administration</h2></div><div className="grid grid-cols-1 md:grid-cols-4 gap-3"><Info label="Key ID" value={key.keyId} /><Info label="Algorithm" value={key.algorithm} /><Info label="Status" value={key.status} /><Info label="Public Key" value={key.publicKeyRef} /></div><div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-[11px] text-amber-200/80 font-mono">Private signing material is never stored or displayed in the AAi client. Key rotation belongs to the protected License Authority.</div></section>; }
function AuditSection({ licenses }: { licenses: AAILicenseRecord[] }) { const events = licenses.flatMap((license) => licenseService.getEvents(license.id)).sort((a, b) => b.at.localeCompare(a.at)); return <section className="rounded-2xl border border-white/10 bg-[#061525]/80 p-5"><h2 className="font-semibold mb-4">Lifecycle & Audit</h2><div className="space-y-2">{events.map((event) => <div key={event.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl border border-white/5 bg-[#020914]/60 p-3 text-xs font-mono"><span className="text-[#00dfff]">{event.type}</span><span className="text-[#dff7ff]">{event.licenseId}</span><span className="text-[#6e9bb3]">{new Date(event.at).toLocaleString()}</span><span className="text-[#82a5bb]">{event.note || event.actor}</span></div>)}</div></section>; }
function FrameworkSection({ title }: { title: string }) { return <section className="rounded-2xl border border-white/10 bg-[#061525]/80 p-8 text-center"><CheckCircle2 className="mx-auto w-8 h-8 text-[#00dfff]" /><h2 className="mt-3 text-xl font-semibold">{title}</h2><p className="mt-2 text-sm text-[#82a5bb]">Framework module reserved. The Admin Runtime provides the common section boundary so this capability can be implemented without changing the application shell.</p></section>; }
function EmptyState() { return <section className="xl:col-span-3 rounded-2xl border border-white/10 bg-[#061525]/80 p-8 text-center text-[#82a5bb]">No issued licenses yet. Use <strong className="text-[#00dfff]">Issue License</strong> to create the first customer entitlement.</section>; }
function StatusBadge({ status }: { status: string }) { return <span className="text-[9px] font-mono uppercase px-2 py-1 rounded-full border border-[#00dfff]/20 bg-[#00dfff]/5 text-[#00dfff]">{status}</span>; }
function Field({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) { return <label className="text-[10px] font-mono text-[#6e9bb3] uppercase">{label}<input type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-[#020914] p-3 text-sm text-[#dff7ff] placeholder:text-[#38566a]" /></label>; }
function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-3 min-w-0"><div className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">{label}</div><div className="mt-1 text-xs font-mono text-[#dff7ff] break-words">{value}</div></div>; }
function Metric({ label, value }: { label: string; value: number }) { return <div className="rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-3 text-center"><div className="text-lg font-bold text-[#00dfff]">{value}</div><div className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">{label}</div></div>; }
function Policy({ title, value }: { title: string; value: string }) { return <div className="rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-4"><div className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">{title}</div><div className="mt-1 text-sm font-semibold text-[#dff7ff]">{value}</div></div>; }
