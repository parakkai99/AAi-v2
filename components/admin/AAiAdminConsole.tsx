/**
 * AAi Admin Console
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: ADMIN-CONSOLE-004 — License + Experience Management
 * Status: ACTIVE
 * Version: 2.1.0
 *
 * Full AAi license authority management surface plus framework Experience
 * Builder entry point. Production signing remains inside the protected AAi authority.
 */

import React, { useMemo, useState } from 'react';
import {
  ArrowLeft, BadgeCheck, CheckCircle2, ClipboardList, FileKey2, KeyRound,
  Plus, RefreshCw, Search, ShieldCheck, SlidersHorizontal, UserRound, XCircle,
} from 'lucide-react';
import { licenseService, type IssueLicenseInput } from '@/src/services/licenseService';
import type { AAILicenseRecord, LicenseCapacity, LicenseClass, LicenseStatus } from '@/src/contracts/license';

export interface AAiAdminConsoleProps { onReturnToUniverse?: () => void; }

type AdminSection = 'Dashboard' | 'Applications' | 'Licenses' | 'Signing Keys' | 'Runtime' | 'Data' | 'AI' | 'Intelligence Exchange' | 'Identity & Access' | 'Experience Builder' | 'Lifecycle & Audit';
const sections: AdminSection[] = ['Dashboard','Applications','Licenses','Signing Keys','Runtime','Data','AI','Intelligence Exchange','Identity & Access','Experience Builder','Lifecycle & Audit'];
type LicenseTab = 'overview' | 'issue' | 'register' | 'issued' | 'certification' | 'audit';

const ExperienceBuilderPanel = React.lazy(() => import('./ExperienceBuilder').then(module => ({ default: module.ExperienceBuilder })));

const emptyForm: IssueLicenseInput = {
  organizationName: '', organizationId: '', contactName: '', contactEmail: '', country: 'India',
  licenseClass: 'standard', expiresAt: '',
  capacity: { applications: 1, components: 1, datastores: 1, users: 100, aiRequests: 1000 },
};

export const AAiAdminConsole: React.FC<AAiAdminConsoleProps> = ({ onReturnToUniverse }) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('Licenses');
  const [licenseTab, setLicenseTab] = useState<LicenseTab>('overview');
  const [licenses, setLicenses] = useState<AAILicenseRecord[]>(() => licenseService.getIssuedLicenses());
  const [selectedId, setSelectedId] = useState<string>(() => licenseService.getIssuedLicenses()[0]?.id || '');
  const [form, setForm] = useState<IssueLicenseInput>(emptyForm);
  const [environmentId, setEnvironmentId] = useState('');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');

  const selected = useMemo(() => licenses.find((item) => item.id === selectedId) || null, [licenses, selectedId]);
  const filtered = useMemo(() => licenses.filter((item) => `${item.id} ${item.recipient.organizationName} ${item.recipient.organizationId} ${item.recipient.contactEmail}`.toLowerCase().includes(search.toLowerCase())), [licenses, search]);
  const events = useMemo(() => selected ? licenseService.getEvents(selected.id) : [], [selected, licenses]);

  const refresh = () => setLicenses(licenseService.getIssuedLicenses());
  const showNotice = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 3000); };

  const issue = () => {
    if (!form.organizationName || !form.organizationId || !form.contactName || !form.contactEmail) {
      showNotice('Organization, organization ID, contact name and email are required.'); return;
    }
    const created = licenseService.issueLicense(form);
    refresh(); setSelectedId(created.id); setForm(emptyForm); setLicenseTab('issued');
    showNotice(`${created.id} issued to ${created.recipient.organizationName}.`);
  };

  const register = () => {
    if (!selected || !environmentId.trim()) { showNotice('Select a license and enter an environment ID.'); return; }
    licenseService.registerLicense(selected.id, environmentId.trim()); refresh(); showNotice(`${selected.id} registered.`);
  };

  const certify = () => {
    if (!selected) return;
    licenseService.certifyLicense(selected.id); refresh(); showNotice(`${selected.id} re-certified. Production signature remains authority-pending.`);
  };

  const changeStatus = (status: LicenseStatus) => {
    if (!selected) return;
    licenseService.setStatus(selected.id, status); refresh(); showNotice(`${selected.id} status changed to ${status}.`);
  };

  const updateCapacity = (field: keyof LicenseCapacity, value: string) => {
    if (!selected) return;
    const next = { ...selected.capacity, [field]: Math.max(0, Number(value) || 0) };
    licenseService.updateCapacity(selected.id, next); refresh();
  };

  return (
    <div className="min-h-screen bg-[#020914] text-[#eaf7ff] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-5">
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#00dfff]">AAi Platform Administration</div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold">Admin Console</h1>
            <p className="mt-1 text-sm text-[#82a5bb]">Framework, licensing, certification, runtime, experience and intelligence administration.</p>
          </div>
          <div className="flex items-center gap-2">
            {notice && <span className="text-[10px] font-mono text-emerald-300 max-w-xs text-right">{notice}</span>}
            {onReturnToUniverse && <button type="button" onClick={onReturnToUniverse} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#00dfff]/30 bg-[#031c33]/80 text-[#00dfff] text-xs font-mono font-bold"><ArrowLeft className="w-4 h-4"/> AAi Universe</button>}
          </div>
        </header>

        <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {sections.map(section => <button key={section} type="button" onClick={() => setActiveSection(section)} className={`rounded-xl border p-3 text-xs font-mono text-left ${activeSection === section ? 'border-[#00dfff]/50 bg-[#031c33] text-[#00e3fd]' : 'border-white/10 bg-white/[0.02] text-[#82a5bb] hover:border-[#00dfff]/30'}`}>{section}</button>)}
        </nav>

        {activeSection === 'Licenses' || activeSection === 'Dashboard' ? (
          <>
            <div className="rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-4">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <LicenseTabButton active={licenseTab==='overview'} onClick={() => setLicenseTab('overview')}>Overview</LicenseTabButton>
                <LicenseTabButton active={licenseTab==='issue'} onClick={() => setLicenseTab('issue')}><Plus className="w-3.5 h-3.5"/> Issue License</LicenseTabButton>
                <LicenseTabButton active={licenseTab==='register'} onClick={() => setLicenseTab('register')}><ClipboardList className="w-3.5 h-3.5"/> Register</LicenseTabButton>
                <LicenseTabButton active={licenseTab==='issued'} onClick={() => setLicenseTab('issued')}><BadgeCheck className="w-3.5 h-3.5"/> Issued Licenses</LicenseTabButton>
                <LicenseTabButton active={licenseTab==='certification'} onClick={() => setLicenseTab('certification')}><FileKey2 className="w-3.5 h-3.5"/> Certification</LicenseTabButton>
                <LicenseTabButton active={licenseTab==='audit'} onClick={() => setLicenseTab('audit')}><ClipboardList className="w-3.5 h-3.5"/> Audit</LicenseTabButton>
              </div>

              {licenseTab === 'overview' && <LicenseOverview licenses={licenses} selected={selected} onSelect={setSelectedId} />}
              {licenseTab === 'issue' && <IssueForm form={form} setForm={setForm} onIssue={issue}/>} 
              {licenseTab === 'register' && <RegisterPanel licenses={licenses} selected={selected} selectedId={selectedId} setSelectedId={setSelectedId} environmentId={environmentId} setEnvironmentId={setEnvironmentId} onRegister={register}/>} 
              {licenseTab === 'issued' && <IssuedPanel licenses={filtered} selected={selected} selectedId={selectedId} setSelectedId={setSelectedId} search={search} setSearch={setSearch} onRefresh={refresh} onCertify={certify} onStatus={changeStatus} onCapacity={updateCapacity}/>} 
              {licenseTab === 'certification' && <CertificationPanel selected={selected} onCertify={certify} />} 
              {licenseTab === 'audit' && <AuditPanel selected={selected} events={events}/>} 
            </div>
          </>
        ) : activeSection === 'Experience Builder' ? (
          <React.Suspense fallback={<div className="rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-8 text-center text-sm text-[#82a5bb]">Loading Experience Builder…</div>}>
            <ExperienceBuilder applicationId="aai-reference" />
          </React.Suspense>
        ) : (
          <EditablePlaceholder section={activeSection}/>
        )}

        <section className="rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-5">
          <div className="flex items-center gap-2 mb-4"><SlidersHorizontal className="w-5 h-5 text-[#00dfff]"/><h2 className="font-semibold">Security Policy</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3"><Info label="Digital Signature" value="Ed25519"/><Info label="Payload Integrity" value="SHA-256"/><Info label="Certificate Authority" value="Not required for license signing"/></div>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-300 font-mono"><CheckCircle2 className="w-4 h-4"/> AAi license authority and Experience framework baseline are configured for Framework v1.2.</div>
        </section>
      </div>
    </div>
  );
};

function LicenseOverview({ licenses, selected, onSelect }: { licenses: AAILicenseRecord[]; selected: AAILicenseRecord | null; onSelect: (id: string) => void }) {
  const active = licenses.filter(x => x.status === 'active').length;
  const suspended = licenses.filter(x => x.status === 'suspended').length;
  return <div className="space-y-5"><div className="grid grid-cols-2 md:grid-cols-5 gap-3"><Metric label="Issued" value={licenses.length}/><Metric label="Active" value={active}/><Metric label="Suspended" value={suspended}/><Metric label="Certified" value={licenses.filter(x => x.certification.verificationStatus === 'verified').length}/><Metric label="Pending Authority" value={licenses.filter(x => x.certification.verificationStatus === 'authority-pending').length}/></div><LicenseSummary selected={selected} onSelect={onSelect}/></div>;
}

function LicenseSummary({ selected, onSelect }: { selected: AAILicenseRecord | null; onSelect: (id: string) => void }) {
  if (!selected) return <Empty text="No license selected."/>;
  return <div className="grid grid-cols-1 xl:grid-cols-2 gap-4"><section className="rounded-xl border border-[#00dfff]/15 bg-[#020914]/60 p-4"><div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#00dfff]"/><h2 className="font-semibold">Current License</h2><Status value={selected.status}/></div><div className="grid grid-cols-2 gap-3 mt-4"><Info label="License ID" value={selected.id}/><Info label="Class" value={selected.licenseClass}/><Info label="Organization" value={selected.recipient.organizationName}/><Info label="Organization ID" value={selected.recipient.organizationId}/><Info label="Contact" value={selected.recipient.contactName}/><Info label="Email" value={selected.recipient.contactEmail}/><Info label="Issued" value={formatDate(selected.issuedAt)}/><Info label="Expires" value={selected.expiresAt ? formatDate(selected.expiresAt) : 'No expiry'}/></div></section><section className="rounded-xl border border-purple-400/15 bg-[#0b1020]/70 p-4"><div className="flex items-center gap-2"><KeyRound className="w-5 h-5 text-purple-300"/><h2 className="font-semibold">Current Certification</h2></div><div className="grid grid-cols-2 gap-3 mt-4"><Info label="Certificate ID" value={selected.certification.certificationId}/><Info label="Version" value={String(selected.certification.certificationVersion)}/><Info label="Certified By" value={selected.certification.certifiedBy}/><Info label="Verification" value={selected.certification.verificationStatus}/><Info label="Algorithm" value={selected.certification.signatureAlgorithm}/><Info label="Integrity" value={selected.certification.payloadIntegrity}/></div><button type="button" onClick={() => onSelect(selected.id)} className="mt-4 text-xs font-mono text-[#00dfff]">Manage this license →</button></section></div>;
}

function IssueForm({ form, setForm, onIssue }: { form: IssueLicenseInput; setForm: React.Dispatch<React.SetStateAction<IssueLicenseInput>>; onIssue: () => void }) {
  const set = (key: keyof IssueLicenseInput, value: string) => setForm(current => ({ ...current, [key]: value }));
  const setCap = (key: keyof LicenseCapacity, value: string) => setForm(current => ({ ...current, capacity: { ...current.capacity, [key]: Math.max(0, Number(value) || 0) } }));
  return <section><div className="flex items-center gap-2 mb-1"><Plus className="w-5 h-5 text-[#00dfff]"/><h2 className="text-lg font-semibold">Issue New AAi License</h2></div><p className="text-sm text-[#82a5bb] mb-5">AAi Platform Authority issues the license to a purchaser or customer organization.</p><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"><Field label="Organization Name" value={form.organizationName} onChange={v=>set('organizationName',v)} required/><Field label="Organization ID" value={form.organizationId} onChange={v=>set('organizationId',v)} required/><Field label="Contact Name" value={form.contactName} onChange={v=>set('contactName',v)} required/><Field label="Contact Email" value={form.contactEmail} onChange={v=>set('contactEmail',v)} required/><Field label="Country" value={form.country || ''} onChange={v=>set('country',v)}/><label className="rounded-xl border border-white/10 bg-[#020914]/70 p-3"><span className="label">License Class</span><select value={form.licenseClass} onChange={e=>setForm(c=>({...c,licenseClass:e.target.value as LicenseClass}))} className="input"><option>standard</option><option>professional</option><option>enterprise</option></select></label><Field label="Expiry Date" type="date" value={form.expiresAt || ''} onChange={v=>set('expiresAt',v)}/></div><h3 className="label mt-6 mb-2">Entitlement Capacity</h3><div className="grid grid-cols-2 md:grid-cols-5 gap-3">{(Object.keys(form.capacity) as (keyof LicenseCapacity)[]).map(key=><Field key={key} label={key === 'aiRequests' ? 'AI Requests' : key[0].toUpperCase()+key.slice(1)} type="number" value={String(form.capacity[key])} onChange={v=>setCap(key,v)}/>)}</div><div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-200/80 font-mono">Issuer: AAI-PLATFORM-AUTHORITY · Signature: Ed25519 · Integrity: SHA-256 · Production private key is never exposed here.</div><button type="button" onClick={onIssue} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00dfff]/15 border border-[#00dfff]/50 px-5 py-3 text-xs font-mono font-bold text-[#00e3fd] hover:bg-[#00dfff]/25"><BadgeCheck className="w-4 h-4"/> Issue & Register License Record</button></section>;
}

function RegisterPanel({ licenses, selected, selectedId, setSelectedId, environmentId, setEnvironmentId, onRegister }: { licenses: AAILicenseRecord[]; selected: AAILicenseRecord | null; selectedId: string; setSelectedId: (id:string)=>void; environmentId:string; setEnvironmentId:(v:string)=>void; onRegister:()=>void }) {
  return <section><h2 className="text-lg font-semibold">License Registration</h2><p className="text-sm text-[#82a5bb] mt-1 mb-5">Bind an issued license to a customer environment or installation.</p><div className="grid grid-cols-1 xl:grid-cols-2 gap-4"><div className="space-y-3"><label className="block"><span className="label">License</span><select value={selectedId} onChange={e=>setSelectedId(e.target.value)} className="input"><option value="">Select license</option>{licenses.map(x=><option key={x.id} value={x.id}>{x.id} · {x.recipient.organizationName}</option>)}</select></label><Field label="Environment ID" value={environmentId} onChange={setEnvironmentId} placeholder="ENV-CUSTOMER-001"/><button type="button" onClick={onRegister} className="button"><ClipboardList className="w-4 h-4"/> Register Environment</button></div>{selected && <LicenseCard license={selected}/>}</div></section>;
}

function IssuedPanel({ licenses, selected, selectedId, setSelectedId, search, setSearch, onRefresh, onCertify, onStatus, onCapacity }: { licenses: AAILicenseRecord[]; selected: AAILicenseRecord | null; selectedId:string; setSelectedId:(id:string)=>void; search:string; setSearch:(v:string)=>void; onRefresh:()=>void; onCertify:()=>void; onStatus:(s:LicenseStatus)=>void; onCapacity:(f:keyof LicenseCapacity,v:string)=>void }) {
  return <section><div className="flex flex-col md:flex-row gap-2 mb-4"><label className="flex-1 relative"><Search className="absolute left-3 top-3.5 w-4 h-4 text-[#5f8299]"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search license, organization, ID or email" className="input pl-9"/></label><button type="button" onClick={onRefresh} className="button"><RefreshCw className="w-4 h-4"/> Refresh</button></div><div className="grid grid-cols-1 xl:grid-cols-5 gap-4"><div className="xl:col-span-2 space-y-2 max-h-[600px] overflow-auto pr-1">{licenses.length ? licenses.map(x=><button type="button" key={x.id} onClick={()=>setSelectedId(x.id)} className={`w-full text-left rounded-xl border p-3 ${selectedId===x.id?'border-[#00dfff]/50 bg-[#031c33]':'border-white/10 bg-[#020914]/50'}`}><div className="flex justify-between gap-2"><span className="font-mono text-xs text-[#00dfff]">{x.id}</span><Status value={x.status}/></div><div className="mt-2 text-sm font-semibold">{x.recipient.organizationName}</div><div className="text-[10px] font-mono text-[#82a5bb]">{x.recipient.organizationId} · {x.licenseClass}</div><div className="text-[10px] text-[#5f8299] mt-1">Certificate {x.certification.certificationId}</div></button>) : <Empty text="No issued licenses match."/>}</div><div className="xl:col-span-3">{selected ? <LicenseManagement license={selected} onCertify={onCertify} onStatus={onStatus} onCapacity={onCapacity}/> : <Empty text="Select a license to manage."/>}</div></div></section>;
}

function LicenseManagement({ license, onCertify, onStatus, onCapacity }: { license:AAILicenseRecord; onCertify:()=>void; onStatus:(s:LicenseStatus)=>void; onCapacity:(f:keyof LicenseCapacity,v:string)=>void }) {
  return <div className="space-y-4"><LicenseCard license={license}/><div className="rounded-xl border border-[#00dfff]/15 bg-[#020914]/60 p-4"><div className="flex items-center gap-2 mb-3"><UserRound className="w-4 h-4 text-[#00dfff]"/><h3 className="font-semibold">Recipient & Registration</h3></div><div className="grid grid-cols-2 gap-3"><Info label="Organization" value={license.recipient.organizationName}/><Info label="Contact" value={license.recipient.contactName}/><Info label="Email" value={license.recipient.contactEmail}/><Info label="Environment" value={license.registeredEnvironment || 'Not registered'}/></div></div><div className="rounded-xl border border-[#00dfff]/15 bg-[#020914]/60 p-4"><h3 className="font-semibold mb-3">Entitlement Management</h3><div className="grid grid-cols-2 md:grid-cols-5 gap-2">{(Object.keys(license.capacity) as (keyof LicenseCapacity)[]).map(field=><label key={field} className="rounded-lg border border-white/10 p-2"><span className="text-[8px] uppercase font-mono text-[#5f8299]">{field}</span><input type="number" min="0" value={license.capacity[field]} onChange={e=>onCapacity(field,e.target.value)} className="w-full bg-transparent text-sm text-[#00dfff] font-bold outline-none"/></label>)}</div></div><div className="flex flex-wrap gap-2"><button type="button" onClick={onCertify} className="button"><BadgeCheck className="w-4 h-4"/> Re-certify</button><select value={license.status} onChange={e=>onStatus(e.target.value as LicenseStatus)} className="input w-auto"><option>draft</option><option>issued</option><option>registered</option><option>active</option><option>suspended</option><option>expired</option><option>revoked</option></select></div></div>;
}

function CertificationPanel({ selected, onCertify }: { selected:AAILicenseRecord|null; onCertify:()=>void }) { if(!selected) return <Empty text="Select a license from Issued Licenses first."/>; return <section className="space-y-4"><div className="flex items-center gap-3"><FileKey2 className="w-6 h-6 text-purple-300"/><div><h2 className="text-lg font-semibold">Certificate Management</h2><p className="text-sm text-[#82a5bb]">Certification history is versioned and never silently overwritten.</p></div></div><div className="grid grid-cols-2 md:grid-cols-3 gap-3"><Info label="License" value={selected.id}/><Info label="Certificate ID" value={selected.certification.certificationId}/><Info label="Certificate Version" value={String(selected.certification.certificationVersion)}/><Info label="Certified By" value={selected.certification.certifiedBy}/><Info label="Verification" value={selected.certification.verificationStatus}/><Info label="Key" value={selected.certification.keyId}/></div><div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-xs text-amber-200/80 font-mono">Current browser implementation records the certificate lifecycle. The protected AAi License Authority will replace authority-pending with a cryptographically verified signature when deployed.</div><button type="button" onClick={onCertify} className="button"><BadgeCheck className="w-4 h-4"/> Create Next Certification Version</button></section>; }

function AuditPanel({ selected, events }: { selected:AAILicenseRecord|null; events:any[] }) { if(!selected) return <Empty text="Select a license from Issued Licenses first."/>; return <section><div className="flex items-center gap-2 mb-4"><ClipboardList className="w-5 h-5 text-[#00dfff]"/><h2 className="text-lg font-semibold">Lifecycle & Audit Trail</h2></div><div className="space-y-2">{events.map(event=><div key={event.id} className="grid grid-cols-[auto_1fr_auto] gap-3 items-start rounded-xl border border-white/10 bg-[#020914]/60 p-3"><span className="text-[10px] font-mono text-[#00dfff]">{event.type}</span><div><div className="text-xs text-[#dff7ff]">{event.note || 'Lifecycle event recorded.'}</div><div className="text-[9px] font-mono text-[#5f8299] mt-1">{event.id} · actor {event.actor}</div></div><span className="text-[9px] font-mono text-[#82a5bb]">{formatDate(event.at)}</span></div>)}</div></section>; }

function LicenseCard({ license }: { license:AAILicenseRecord }) { return <div className="rounded-xl border border-[#00dfff]/15 bg-[#020914]/60 p-4"><div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#00dfff]"/><h3 className="font-semibold">{license.id}</h3><Status value={license.status}/></div><div className="grid grid-cols-2 gap-3 mt-4"><Info label="Organization" value={license.recipient.organizationName}/><Info label="Class" value={license.licenseClass}/><Info label="Issued" value={formatDate(license.issuedAt)}/><Info label="Certification" value={license.certification.certificationId}/></div></div>; }

function EditablePlaceholder({ section }: { section: AdminSection }) { return <section className="rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-6"><h2 className="text-lg font-semibold">{section} Administration</h2><p className="mt-1 text-sm text-[#82a5bb]">Framework foundation is enabled. This section is reserved for service-backed configuration.</p><div className="mt-5 rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-4 text-sm text-[#82a5bb]"><span className="font-mono text-[#00e3fd]">CONFIGURATION READY</span><div className="mt-2">{section === 'Applications' ? 'Application creation, capacity reservation and deletion release will be managed here.' : section === 'Lifecycle & Audit' ? 'License registration, capacity reservation, suspension, retirement and audit will be managed here.' : `${section} service contract is ready for the next implementation stage.`}</div></div></section>; }

function LicenseTabButton({ active, onClick, children }: { active:boolean; onClick:()=>void; children:React.ReactNode }) { return <button type="button" onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] font-mono font-bold ${active?'border-[#00dfff]/50 bg-[#00dfff]/10 text-[#00e3fd]':'border-white/10 text-[#82a5bb] hover:border-[#00dfff]/30'}`}>{children}</button>; }
function Field({ label, value, onChange, type='text', placeholder='', required=false }: { label:string; value:string; onChange:(v:string)=>void; type?:string; placeholder?:string; required?:boolean }) { return <label className="block rounded-xl border border-white/10 bg-[#020914]/70 p-3"><span className="label">{label}{required && <span className="text-rose-300"> *</span>}</span><input type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)} className="input"/></label>; }
function Info({ label, value }: { label:string; value:string }) { return <div className="rounded-xl border border-white/10 bg-[#020914]/60 p-3 min-w-0"><div className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">{label}</div><div className="mt-1 text-xs font-mono text-[#dff7ff] break-words">{value}</div></div>; }
function Metric({ label, value }: { label:string; value:number }) { return <div className="rounded-xl border border-white/10 bg-[#020914]/60 p-3 text-center"><div className="text-xl font-bold text-[#00dfff]">{value}</div><div className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">{label}</div></div>; }
function Status({ value }: { value:string }) { return <span className="ml-auto text-[9px] font-mono uppercase px-2 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">{value}</span>; }
function Empty({ text }: { text:string }) { return <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-[#5f8299]">{text}</div>; }
function formatDate(value:string) { return new Date(value).toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short' }); }

const styles = `
.label { display:block; font-size:9px; text-transform:uppercase; letter-spacing:.08em; color:#5f8299; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; }
.input { margin-top:4px; width:100%; border-radius:8px; border:1px solid rgba(0,223,255,.14); background:#020914; color:#dff7ff; padding:8px 9px; font-size:12px; outline:none; }
.input:focus { border-color:rgba(0,223,255,.55); }
.button { display:inline-flex; align-items:center; gap:7px; border-radius:10px; border:1px solid rgba(0,223,255,.4); background:rgba(0,223,255,.08); color:#00e3fd; padding:9px 13px; font:700 11px ui-monospace,SFMono-Regular,Menlo,monospace; }
`;
if (typeof document !== 'undefined' && !document.getElementById('aai-admin-console-styles')) { const style=document.createElement('style'); style.id='aai-admin-console-styles'; style.textContent=styles; document.head.appendChild(style); }

void XCircle;
void RefreshCw;
void UserRound;
