/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Component: AgentOSYamlInspectorModal
 * Milestone: M01-E — PARSER GUIDANCE + AI ENGINEERING OUTPUT
 * 
 * Provides an unvarnished, structured viewer for:
 * - Intent & Canonical Area Ref Pointer
 * - Parsed Intent YAML
 * - Synthesized Engineering YAML
 * - AI Engineering Agent Handoff Contract
 * - Provenance Classification Audit (USER_PROVIDED, AAI_CONTEXT, etc.)
 * - Truth Rule Enforcement (planned vs actual vs verified)
 * - IP Ownership & Security Controls
 */

import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  Layers,
  Terminal,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { AgentOSTask } from '@/src/contracts/agentOS';
import { SEED_TASK_AA1001 } from '@/src/services/agentOSEngine';

interface AgentOSYamlInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: AgentOSTask;
}

type TabType = 'intent' | 'engineering' | 'handoff' | 'audit';

export const AgentOSYamlInspectorModal: React.FC<AgentOSYamlInspectorModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('intent');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const safeTask: AgentOSTask = task && task.id ? task : SEED_TASK_AA1001;
  const intentYamlStr = safeTask.intentYamlString || '# No Intent YAML available';
  const engineeringYamlStr = safeTask.engineeringYamlString || '# No Engineering YAML available';
  const handoffPromptStr = safeTask.agentHandoffPrompt || '# No Handoff Prompt available';
  const areaRef = safeTask.intentYaml?.context?.area_ref;
  const validation = safeTask.validationReport;

  const getActiveContent = () => {
    switch (activeTab) {
      case 'intent':
        return intentYamlStr;
      case 'engineering':
        return engineeringYamlStr;
      case 'handoff':
        return handoffPromptStr;
      default:
        return intentYamlStr;
    }
  };

  const handleCopy = () => {
    const text = getActiveContent();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch {
      // ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getActiveContent();
    const filename = `${safeTask.id}-${activeTab}-contract.yaml`;
    try {
      const blob = new Blob([content], { type: 'text/yaml;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="yaml-inspector-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-[#020b17] border border-[#00e3fd]/30 shadow-[0_0_50px_rgba(0,227,253,0.15)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-[#031426]/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00e3fd]/15 border border-[#00e3fd]/40 flex items-center justify-center text-[#00e3fd]">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="yaml-inspector-title" className="text-sm sm:text-base font-bold text-white tracking-wide">
                  AAi-Agent-OS — YAML CONTRACT INSPECTOR
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00e3fd]/20 text-[#00e3fd] border border-[#00e3fd]/40">
                  M01-E
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  [{safeTask.id}]
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Canonical Agent OS Task & AI Engineering Representation • Architect: Vijay Kumar K.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy YAML</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Download</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Context & Area Ref Indicator */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#03182e] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">AAi Area Ref:</span>
            {areaRef ? (
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-mono text-[11px] flex items-center gap-1">
                <span>{areaRef.id} &ldquo;{areaRef.title}&rdquo;</span>
                <span className="text-slate-400">({areaRef.source})</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px]">
                Domain-Neutral / Ad-Hoc Intent (No Area Ref required)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Validation:</span>
              <span
                className={`px-2 py-0.5 rounded font-bold uppercase ${
                  validation?.status === 'VALID'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                {validation?.status || 'VALID'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Truth Rule:</span>
              <span className="text-emerald-400 font-mono">
                actual.status: {safeTask.engineeringYaml?.result?.actual?.status || 'NOT_EXECUTED'}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-2.5 bg-[#020b17] border-b border-slate-800/80 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('intent')}
            className={`px-3 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'intent'
                ? 'bg-[#031526] text-[#00e3fd] border-t border-x border-[#00e3fd]/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>1. Intent YAML</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('engineering')}
            className={`px-3 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'engineering'
                ? 'bg-[#031526] text-[#00e3fd] border-t border-x border-[#00e3fd]/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Engineering YAML</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('handoff')}
            className={`px-3 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'handoff'
                ? 'bg-[#031526] text-[#00e3fd] border-t border-x border-[#00e3fd]/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>3. AI Agent Handoff Contract</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-[#031526] text-[#00e3fd] border-t border-x border-[#00e3fd]/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>4. Provenance & Safety Audit</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 font-mono text-xs text-slate-200 bg-[#010812]">
          {activeTab === 'audit' ? (
            <div className="space-y-4 font-sans text-xs">
              <div className="p-3.5 rounded-xl bg-[#03182e] border border-slate-700/80 space-y-2">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Safety, IP & Execution Rules (Contract M01-E)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 pt-1">
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">IP Ownership</span>
                    <span className="font-bold text-white font-mono">ARCHITECTANY (Vijay Kumar K.)</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Secrets in Prompts</span>
                    <span className="font-bold text-emerald-400 font-mono">PROHIBITED (false)</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Workspace Constraint</span>
                    <span className="font-bold text-white font-mono">AAi-v2 (Restricted Container)</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Truth Rule Status</span>
                    <span className="font-bold text-sky-400 font-mono">actual.status = NOT_EXECUTED</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#03182e] border border-slate-700/80 space-y-2">
                <h3 className="font-bold text-white text-sm">
                  Field Provenance Audit ({validation?.auditProvenance?.length || 0} fields classified)
                </h3>
                <p className="text-slate-400 text-xs">
                  Every field transformed from natural language is strictly classified without inventing facts.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse font-mono text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-1.5 px-2">Field</th>
                        <th className="py-1.5 px-2">Classification</th>
                        <th className="py-1.5 px-2">Value Summary</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {(validation?.auditProvenance || []).map((audit, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30">
                          <td className="py-1.5 px-2 text-[#00e3fd] font-bold">{audit.field}</td>
                          <td className="py-1.5 px-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                audit.source === 'USER_PROVIDED'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : audit.source === 'AAI_CONTEXT'
                                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                                  : audit.source === 'PARSER_INFERRED'
                                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                                  : audit.source === 'DEFAULT'
                                  ? 'bg-slate-500/20 text-slate-300 border border-slate-500/40'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                              }`}
                            >
                              {audit.source}
                            </span>
                          </td>
                          <td className="py-1.5 px-2 text-slate-300 truncate max-w-xs">
                            {typeof audit.value === 'object' ? JSON.stringify(audit.value) : String(audit.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <pre className="whitespace-pre-wrap leading-relaxed selection:bg-[#00e3fd]/30 selection:text-white">
                {getActiveContent()}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-t border-slate-800 bg-[#031426] text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>YAML Contract Active: AAi Context → Intent Parser → AI Engineering Agent</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#00e3fd]/20 hover:bg-[#00e3fd]/30 text-[#00e3fd] border border-[#00e3fd]/40 font-medium transition-colors cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
