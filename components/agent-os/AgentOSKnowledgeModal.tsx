/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Component: AgentOSKnowledgeModal
 * Purpose:
 * Knowledge Management Center for AAi-Agent-OS (Requirement 10).
 * Organizes:
 * 1. AAi Context (Domains, Subdomains, Capabilities, Solutions, Area Reference)
 * 2. Project Knowledge (Architecture rules, Component catalog, Contracts, Documentation)
 * 3. Task Knowledge (Intent, Architect Plan, Engineering Package, Verification criteria)
 * 
 * Truth Rule: Authoritative grounding in genuine AAi metadata, schema contracts, and active task state.
 */

import React, { useState } from 'react';
import {
  BookOpen,
  X,
  Compass,
  Layers,
  FileCode,
  CheckCircle2,
  Database,
  ExternalLink,
  Search,
  ChevronRight,
  ShieldCheck,
  FolderGit2,
  Cpu,
  Sparkles,
  Info,
} from 'lucide-react';
import { AgentOSTask } from '@/src/contracts/agentOS';

interface AgentOSKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTask: AgentOSTask;
  onSelectAreaRef?: (ref: { id: string; title: string; source: string; parent: string; status: string }) => void;
}

type KnowledgeTab = 'AAI_CONTEXT' | 'PROJECT_KNOWLEDGE' | 'TASK_KNOWLEDGE';

export const AgentOSKnowledgeModal: React.FC<AgentOSKnowledgeModalProps> = ({
  isOpen,
  onClose,
  activeTask,
  onSelectAreaRef,
}) => {
  const [activeTab, setActiveTab] = useState<KnowledgeTab>('AAI_CONTEXT');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Canonical Domain Registry Grounding
  const domainsCatalog = [
    { id: 'D01', name: 'FinTech & Capital Markets', count: '14 Subdomains', activeSub: 'D01.03 Trading Accounting' },
    { id: 'D02', name: 'EdTech & Learning Systems', count: '12 Subdomains', activeSub: 'D02.04 STEM & Calculus Visualizers' },
    { id: 'D03', name: 'Healthcare & Life Sciences', count: '18 Subdomains', activeSub: 'D03.01 Clinical Registry' },
    { id: 'D04', name: 'Supply Chain & Logistics', count: '15 Subdomains', activeSub: 'D04.02 Autonomous Fleet Routing' },
    { id: 'D05', name: 'GovTech & Civic Infrastructure', count: '11 Subdomains', activeSub: 'D05.02 Municipal Tax Automation' },
    { id: 'D06', name: 'Commerce & Marketplaces', count: '16 Subdomains', activeSub: 'D06.01 Hyperlocal Marketplace' },
  ];

  // Core Architectural Standards Grounding
  const architectureRules = [
    {
      id: 'rule-sticky',
      title: 'Sticky Offset Rule (MANDATORY)',
      category: 'Layout',
      detail: 'Child elements inside <main> with overflow-x: hidden calculate top relative to <main>. Sub-navigation banners must use sticky top-0 (NEVER sticky top-[74px]).',
      status: 'Enforced',
    },
    {
      id: 'rule-context-intent',
      title: 'Context vs Intent Separation',
      category: 'Contract',
      detail: 'Attached Solution Area Context (metadata) is stored in areaRef and never prepended or merged into raw intentText.',
      status: 'Enforced',
    },
    {
      id: 'rule-truth',
      title: 'Truth Rule & Runtime Integrity',
      category: 'Telemetry',
      detail: 'HANDOFF_READY ≠ EXECUTING. SELECTED ≠ WORKING. No artificial token meters or simulated gas metrics.',
      status: 'Enforced',
    },
    {
      id: 'rule-workspace',
      title: 'AAi-v2 Isolated Container Boundary',
      category: 'Security',
      detail: 'All task implementations execute exclusively in the assigned isolated workspace container on port 3000.',
      status: 'Active',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#020b18] border border-[#00e3fd]/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,227,253,0.15)] flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#031326]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00e3fd]/10 border border-[#00e3fd]/40 flex items-center justify-center text-[#00e3fd]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  AAi Knowledge Engine & Registry
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-950/80 border border-sky-600/40 text-sky-300">
                  Grounding System
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Authoritative context, project standards, and task knowledge contracts
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-800/80 bg-[#020e1f] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('AAI_CONTEXT')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'AAI_CONTEXT'
                ? 'bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>1. AAi Context (Universe & Catalog)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('PROJECT_KNOWLEDGE')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'PROJECT_KNOWLEDGE'
                ? 'bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2. Project Standards & Rules</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('TASK_KNOWLEDGE')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'TASK_KNOWLEDGE'
                ? 'bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>3. Task Knowledge ({activeTask.id} • {activeTask.revisionLabel || 'R1'})</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: AAI CONTEXT */}
          {activeTab === 'AAI_CONTEXT' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <Info className="w-4 h-4 text-[#00e3fd] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  The ArchitectAny Solution Universe encompasses 6 core business domains, 80+ subdomains, and 450+ capabilities. Grounding a task in an Area Reference attaches authoritative schema definitions without polluting the prompt intent.
                </div>
              </div>

              {/* Active Attached Area Grounding */}
              <div className="p-4 rounded-xl bg-[#031d36]/50 border border-[#00e3fd]/30">
                <div className="text-[11px] font-mono uppercase tracking-wider text-sky-400 mb-1.5 flex items-center justify-between">
                  <span>Currently Attached Solution Context for Task {activeTask.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                    Active Grounding
                  </span>
                </div>
                {activeTask.areaRef ? (
                  <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{activeTask.areaRef.id}</span>
                        <span>•</span>
                        <span className="text-sky-300">{activeTask.areaRef.title}</span>
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        Source: {activeTask.areaRef.source} • Parent Domain: {activeTask.areaRef.parent}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic">
                    No canonical area attached yet. Intent will be synthesized autonomously.
                  </div>
                )}
              </div>

              {/* Domains Grid */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Canonical Universe Domains (L1-L3 Registry)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {domainsCatalog.map((domain) => (
                    <div
                      key={domain.id}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-700/50 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span className="font-mono text-[#00e3fd]">{domain.id}</span>
                          <span>{domain.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {domain.count} • Ref: {domain.activeSub}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECT KNOWLEDGE & RULES */}
          {activeTab === 'PROJECT_KNOWLEDGE' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  These authoritative architectural rules govern all engineering workflows. AI Agents are strictly required to adhere to these rules without regression.
                </div>
              </div>

              <div className="space-y-2.5">
                {architectureRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{rule.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                          {rule.category}
                        </span>
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/40 text-emerald-300">
                        {rule.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {rule.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#021528] border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-sky-400">Target Workspace Specifications</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Workspace</span>
                    <span className="font-mono font-bold text-white">AAi-v2 (Approved)</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Runtime Port</span>
                    <span className="font-mono font-bold text-emerald-400">3000 (Vite HMR)</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Framework</span>
                    <span className="font-mono font-bold text-white">React 19 + Vite</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Type Safety</span>
                    <span className="font-mono font-bold text-sky-400">Strict (0 tsc errors)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TASK KNOWLEDGE */}
          {activeTab === 'TASK_KNOWLEDGE' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    Task {activeTask.id} • Revision {activeTask.revisionLabel || 'R1'}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-sky-950 border border-sky-500/40 text-sky-300 font-mono">
                    Phase: {activeTask.currentPhase}
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-slate-400">Intent:</strong> "{activeTask.intentText}"
                </div>
              </div>

              {/* Acceptance Criteria */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Verification Criteria ({activeTask.acceptanceCriteriaCount || activeTask.acceptanceCriteriaList?.length || 0})
                </div>
                <div className="space-y-1.5">
                  {(activeTask.acceptanceCriteriaList || [
                    'Zero TypeScript compilation errors',
                    'Responsive UI verified on mobile and desktop',
                    'Zero credential leaks',
                  ]).map((ac, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{ac}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target File Structure */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Target Files & Artifacts ({activeTask.filesCount || activeTask.filesList?.length || 0})
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
                  {(activeTask.filesList || ['/src/contracts/solution.ts', '/components/solutions/MainView.tsx']).map(
                    (file, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-slate-600">[{idx + 1}]</span>
                        <span>{file}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#020e1f] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Grounding: Connected to Universe Registry</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Knowledge Engine
          </button>
        </div>
      </div>
    </div>
  );
};
