/**
 * AAi Admin Console
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: ADMIN-CONSOLE-001
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * This console exposes framework administration only. Customer content,
 * customer databases, and private signing material are not displayed here.
 */

import React from 'react';
import { ArrowLeft, CheckCircle2, KeyRound, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { licenseService } from '@/src/services/licenseService';

export interface AAiAdminConsoleProps {
  onReturnToUniverse?: () => void;
}

export const AAiAdminConsole: React.FC<AAiAdminConsoleProps> = ({ onReturnToUniverse }) => {
  const license = licenseService.getCurrentLicense();
  const key = licenseService.getActiveSigningKey();

  return (
    <div className="min-h-screen bg-[#020914] text-[#eaf7ff] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#00dfff]">AAi Platform Administration</div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold">Admin Console</h1>
            <p className="mt-1 text-sm text-[#82a5bb]">Framework, licensing and signing-key administration.</p>
          </div>
          {onReturnToUniverse && (
            <button
              type="button"
              onClick={onReturnToUniverse}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#00dfff]/30 bg-[#031c33]/80 text-[#00dfff] text-xs font-mono font-bold hover:bg-[#052b4f]"
            >
              <ArrowLeft className="w-4 h-4" />
              AAi Universe
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <section className="xl:col-span-2 rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-5">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-[#00dfff]" />
              <h2 className="font-semibold">License Administration</h2>
              <span className="ml-auto text-[10px] font-mono uppercase px-2 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                {license.status}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
              <Info label="License ID" value={license.id} />
              <Info label="Class" value={license.licenseClass} />
              <Info label="Version" value={license.version} />
              <Info label="Key ID" value={license.keyId} />
            </div>

            <h3 className="text-xs font-mono uppercase tracking-wider text-[#82a5bb] mb-2">Capacity</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <Metric label="Applications" value={license.capacity.applications} />
              <Metric label="Components" value={license.capacity.components} />
              <Metric label="Datastores" value={license.capacity.datastores} />
              <Metric label="Users" value={license.capacity.users} />
              <Metric label="AI Requests" value={license.capacity.aiRequests} />
            </div>
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
            <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-[11px] text-amber-200/80 font-mono">
              Private signing material is never stored or displayed in the AAi client/runtime.
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-[#00dfff]/20 bg-[#061525]/80 p-5">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-[#00dfff]" />
            <h2 className="font-semibold">Security Policy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Policy title="Digital Signature" value="Ed25519" />
            <Policy title="Payload Integrity" value="SHA-256" />
            <Policy title="Certificate Authority" value="Not required for license signing" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-300 font-mono">
            <CheckCircle2 className="w-4 h-4" />
            License contract baseline is configured for AAi Framework v1.2.
          </div>
        </section>
      </div>
    </div>
  );
};

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-3 min-w-0">
      <div className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">{label}</div>
      <div className="mt-1 text-xs font-mono text-[#dff7ff] break-words">{value}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-3 text-center">
      <div className="text-lg font-bold text-[#00dfff]">{value}</div>
      <div className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">{label}</div>
    </div>
  );
}

function Policy({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#00dfff]/10 bg-[#020914]/60 p-4">
      <div className="text-[9px] uppercase tracking-wider text-[#5f8299] font-mono">{title}</div>
      <div className="mt-1 text-sm font-semibold text-[#dff7ff]">{value}</div>
    </div>
  );
}
