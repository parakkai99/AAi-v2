/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Component: AgentOSRevisionModal
 * Purpose:
 * Controlled Revision & Versioning Modal for AAi-Agent-OS (Requirement 5).
 * Allows creating a new revision (e.g., R1 → R2) when a stage is locked or when specifications change,
 * preserving provenance and prior history rather than silently mutating previous records.
 */

import React, { useState } from 'react';
import {
  History,
  X,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  User,
  Clock,
  FileEdit,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { AgentOSTask, LifecyclePhaseId } from '@/src/contracts/agentOS';

interface AgentOSRevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTask: AgentOSTask;
  onCreateRevision: (reason: string, targetStage: LifecyclePhaseId) => void;
}

export const AgentOSRevisionModal: React.FC<AgentOSRevisionModalProps> = ({
  isOpen,
  onClose,
  activeTask,
  onCreateRevision,
}) => {
  const currentRev = activeTask.revision || 1;
  const nextRev = currentRev + 1;

  const [reason, setReason] = useState('');
  const [targetStage, setTargetStage] = useState<LifecyclePhaseId>('INTENT');
  const [requestedBy, setRequestedBy] = useState('Vijay Kumar K.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onCreateRevision(reason.trim(), targetStage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#020b18] border border-[#00e3fd]/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,227,253,0.15)] flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#031326]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00e3fd]/10 border border-[#00e3fd]/40 flex items-center justify-center text-[#00e3fd]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Create Controlled Revision ({activeTask.id} • R{currentRev} → R{nextRev})
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950/80 border border-amber-600/40 text-amber-300">
                  Version Cycle
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Preserve previous revision in history while starting a new version cycle
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {/* Version delta badge */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-slate-400 text-[11px] block">Current Task & Baseline</span>
              <span className="font-bold text-white text-sm">{activeTask.title}</span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                R{currentRev} (Active)
              </span>
              <ArrowRight className="w-4 h-4 text-[#00e3fd]" />
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                R{nextRev} (New)
              </span>
            </div>
          </div>

          {/* Requested By */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Requested By (Provenance)</span>
            </label>
            <input
              type="text"
              value={requestedBy}
              onChange={(e) => setRequestedBy(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:border-[#00e3fd] focus:outline-none"
            />
          </div>

          {/* Target Stage to Re-enter */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00e3fd]" />
              <span>Target Lifecycle Stage to Re-enter</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTargetStage('INTENT')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  targetStage === 'INTENT'
                    ? 'bg-[#00e3fd]/15 border-[#00e3fd] text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs">Stage 1: Intent</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Revise core intent requirements and re-plan.</div>
              </button>

              <button
                type="button"
                onClick={() => setTargetStage('ARCHITECT')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  targetStage === 'ARCHITECT'
                    ? 'bg-[#00e3fd]/15 border-[#00e3fd] text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs">Stage 2: Architect</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Keep intent, adjust use cases and file structures.</div>
              </button>
            </div>
          </div>

          {/* Revision Reason / What changed */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold flex items-center gap-1.5">
              <FileEdit className="w-3.5 h-3.5 text-amber-400" />
              <span>Revision Reason & What Changed (MANDATORY)</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="E.g., Added requirement for interactive gradient visualizer and updated CSV parser to handle brokerage format."
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-[#00e3fd] focus:outline-none resize-none"
              required
            />
          </div>

          {/* Revision History list if any */}
          {activeTask.revisionHistory && activeTask.revisionHistory.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Archived Revision History ({activeTask.revisionHistory.length})
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {activeTask.revisionHistory.map((rev, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white text-[11px]">
                        {rev.revisionLabel} • {rev.reason}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        By {rev.requestedBy} • {rev.timestamp} • Affected: {rev.affectedStage}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!reason.trim()}
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Create Revision R{nextRev}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
