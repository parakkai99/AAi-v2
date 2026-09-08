/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Component: AgentOSTaskDeleteModal
 * Purpose:
 * Explicit Task Deletion Confirmation Modal for AAi-Agent-OS (Requirement 6).
 * Protects test evidence tasks AA-1001 and AA-1002 from deletion (Rule 29).
 */

import React from 'react';
import { Trash2, X, AlertTriangle, ShieldAlert } from 'lucide-react';
import { AgentOSTask } from '@/src/contracts/agentOS';

interface AgentOSTaskDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: AgentOSTask;
  onConfirmDelete: (taskId: string) => void;
}

export const AgentOSTaskDeleteModal: React.FC<AgentOSTaskDeleteModalProps> = ({
  isOpen,
  onClose,
  task,
  onConfirmDelete,
}) => {
  if (!isOpen) return null;

  const isProtected = task.id === 'AA-1001' || task.id === 'AA-1002';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#020b18] border border-red-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(239,68,68,0.2)] flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-red-950/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-400">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Confirm Task Deletion
              </h2>
              <span className="text-[10px] uppercase font-mono text-red-400">
                Irreversible Operation
              </span>
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

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {isProtected ? (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-2 text-amber-200">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Protected Canonical Test Evidence (Rule 29)</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Task <strong>{task.id}</strong> ({task.title}) is designated as permanent architectural test evidence. It cannot be deleted or reset.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-slate-300 leading-relaxed">
                Are you sure you want to delete task <strong className="text-white font-mono">{task.id}</strong> (Revision {task.revisionLabel || 'R1'}) and associated workspace artifacts?
              </p>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                <div className="font-bold text-white text-xs">{task.title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Created {task.createdAt} • Phase: {task.currentPhase}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#020e1f] flex items-center justify-end gap-2.5 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
          >
            Cancel
          </button>
          {!isProtected && (
            <button
              type="button"
              onClick={() => {
                onConfirmDelete(task.id);
                onClose();
              }}
              className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Confirm Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
