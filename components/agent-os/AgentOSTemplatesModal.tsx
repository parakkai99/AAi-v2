/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Component: AgentOSTemplatesModal
 * Purpose:
 * Template Library for AAi-Agent-OS (Requirement 13).
 * Categories:
 * 1. Engineering Templates (New Feature, Bug Fix, Refactoring, Integration, Performance, Security, Migration)
 * 2. Architecture Templates (New Solution, Capability Design, API Design, Data Model, System Architecture)
 * 3. Verification Templates (Build Verification, Regression, Security Review, Acceptance Review)
 * 
 * Rule: Applying a template initializes structured content without fake immediate execution.
 */

import React, { useState } from 'react';
import {
  FileCode2,
  X,
  Code,
  Layers,
  CheckSquare,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Cpu,
  RefreshCw,
} from 'lucide-react';

interface AgentOSTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: { title: string; category: string; prompt: string }) => void;
}

type TemplateTab = 'ENGINEERING' | 'ARCHITECTURE' | 'VERIFICATION';

interface TemplateItem {
  id: string;
  title: string;
  category: string;
  tab: TemplateTab;
  description: string;
  samplePrompt: string;
}

const TEMPLATES_CATALOG: TemplateItem[] = [
  // Engineering Templates
  {
    id: 'eng-new-feature',
    title: 'New Feature Implementation',
    category: 'Engineering',
    tab: 'ENGINEERING',
    description: 'Structured prompt for delivering an end-to-end full-stack feature with UI, contracts, and tests.',
    samplePrompt: 'Implement [Feature Name] with responsive UI, strict TypeScript contracts in /src/contracts/, interactive event handlers, and zero compilation errors.',
  },
  {
    id: 'eng-bug-fix',
    title: 'Targeted Bug Fix & Regression',
    category: 'Engineering',
    tab: 'ENGINEERING',
    description: 'Isolate root cause, fix defect, and verify zero regression against existing workspace components.',
    samplePrompt: 'Diagnose and resolve the issue where [Defect Description]. Ensure TypeScript passes and add regression test coverage.',
  },
  {
    id: 'eng-refactor',
    title: 'Modular Codebase Refactoring',
    category: 'Engineering',
    tab: 'ENGINEERING',
    description: 'Split monolithic files into modular components, extract reusable services, and enforce type safety.',
    samplePrompt: 'Refactor [Component/File] by extracting sub-components into /components/ and business logic into /src/services/. Maintain 100% feature parity.',
  },
  {
    id: 'eng-integration',
    title: 'External API / Tool Integration',
    category: 'Engineering',
    tab: 'ENGINEERING',
    description: 'Connect third-party API or MCP tool safely via server-side proxy without leaking credentials.',
    samplePrompt: 'Integrate [Service/API] with client-side UI and server proxy. Ensure keys remain server-side and fallbacks exist.',
  },

  // Architecture Templates
  {
    id: 'arch-solution',
    title: 'New Solution Universe Design',
    category: 'Architecture',
    tab: 'ARCHITECTURE',
    description: 'Map out L1-L6 taxonomy, capability bundle, and data contracts for a new industry domain.',
    samplePrompt: 'Synthesize architecture specifications for [Domain Solution] including L2 subdomains, L3 capabilities, and L4 bundle manifests.',
  },
  {
    id: 'arch-data-model',
    title: 'Enterprise Data Model & Schema',
    category: 'Architecture',
    tab: 'ARCHITECTURE',
    description: 'Define relational or document schemas with foreign keys, normalization, and validation rules.',
    samplePrompt: 'Design typed schema contracts and validation rules for [Data Domain] with immutable audit trails and migration paths.',
  },

  // Verification Templates
  {
    id: 'ver-build',
    title: 'Comprehensive Build & Type Check',
    category: 'Verification',
    tab: 'VERIFICATION',
    description: 'Run tsc --noEmit, check Vite bundle compilation, and evaluate workspace container boundaries.',
    samplePrompt: 'Execute verification protocol: run TypeScript compiler check, inspect build output, and verify zero leaks in AAi-v2 container.',
  },
  {
    id: 'ver-acceptance',
    title: 'Acceptance Criteria Audit Pass',
    category: 'Verification',
    tab: 'VERIFICATION',
    description: 'Systematically test each numbered acceptance criterion and generate an unvarnished audit report.',
    samplePrompt: 'Evaluate all acceptance criteria for current task, record real evidence for each check, and log audit findings.',
  },
];

export const AgentOSTemplatesModal: React.FC<AgentOSTemplatesModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate,
}) => {
  const [activeTab, setActiveTab] = useState<TemplateTab>('ENGINEERING');

  if (!isOpen) return null;

  const currentTemplates = TEMPLATES_CATALOG.filter((t) => t.tab === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#020b18] border border-[#00e3fd]/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,227,253,0.15)] flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#031326]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00e3fd]/10 border border-[#00e3fd]/40 flex items-center justify-center text-[#00e3fd]">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Structured Task Templates Library
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-950/80 border border-sky-600/40 text-sky-300">
                  Standardized Blueprints
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Accelerate task authoring with canonical engineering, architecture, and verification blueprints
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

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-800/80 bg-[#020e1f] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('ENGINEERING')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'ENGINEERING'
                ? 'bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>1. Engineering Templates</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ARCHITECTURE')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'ARCHITECTURE'
                ? 'bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Architecture Templates</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('VERIFICATION')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'VERIFICATION'
                ? 'bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>3. Verification Templates</span>
          </button>
        </div>

        {/* List of Templates */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {currentTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-600/50 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{template.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{template.description}</p>
                  
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-300">
                    "{template.samplePrompt}"
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onApplyTemplate({
                      title: template.title,
                      category: template.category.toLowerCase(),
                      prompt: template.samplePrompt,
                    });
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#00e3fd]/15 hover:bg-[#00e3fd]/25 border border-[#00e3fd]/40 text-[#00e3fd] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <span>Apply Blueprint to Task Intent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#020e1f] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Blueprints populate structured requirements without fake immediate execution.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Templates
          </button>
        </div>
      </div>
    </div>
  );
};
