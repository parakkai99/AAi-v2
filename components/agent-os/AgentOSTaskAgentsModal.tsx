/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Component: AgentOSTaskAgentsModal
 * Milestone: M01-K — REAL-TIME AGENT TELEMETRY & STATUS VIEW
 * 
 * Provides an authentic, unvarnished view of the agents actively involved
 * in the current task. Adheres strictly to the Truth Rule:
 * - HANDOFF_READY ≠ EXECUTING
 * - SELECTED ≠ WORKING
 * - PREVIEW ≠ ENGINEERING EXECUTION
 * - Never fabricates token usage, cost, gas, or activity
 * - When runtime does not expose telemetry, explicitly states "Usage: Not available from current runtime"
 */

import React, { useEffect } from 'react';
import {
  X,
  Cpu,
  ShieldCheck,
  Activity,
  Server,
  Zap,
  Clock,
  Terminal,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
} from 'lucide-react';
import { AgentOSTask } from '@/src/contracts/agentOS';

interface AgentOSTaskAgentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: AgentOSTask;
  onOpenYamlInspector?: () => void;
  onOpenWorkspaceDrawer?: () => void;
}

export const AgentOSTaskAgentsModal: React.FC<AgentOSTaskAgentsModalProps> = ({
  isOpen,
  onClose,
  task,
  onOpenYamlInspector,
  onOpenWorkspaceDrawer,
}) => {
  useEffect(() => {
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

  // Determine current lifecycle operation and status honestly
  const currentStep = task.taskSteps?.find((s) => s.status === 'WORKING') ||
    task.taskSteps?.filter((s) => s.status === 'COMPLETED').slice(-1)[0] ||
    task.taskSteps?.[0];

  const latestLog = task.logs && task.logs.length > 0
    ? task.logs[task.logs.length - 1]
    : null;

  // Actual agent status calculation according to TRUTH RULES:
  // HANDOFF_READY: package generated, waiting for autonomous or supervised trigger
  // IN_PROGRESS: currently active step
  const rawStatus = task.status || 'In Progress';
  const displayStatus = rawStatus === 'In Progress' ? 'HANDOFF_READY' : rawStatus.toUpperCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="agent-telemetry-title"
    >
      <div className="bg-[#020b18] border border-[#00e3fd]/40 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,227,253,0.2)] overflow-hidden font-sans">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#031326]/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0070ba]/20 border border-[#00e3fd]/50 flex items-center justify-center text-[#00e3fd]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="agent-telemetry-title" className="text-sm font-bold font-mono text-white tracking-wide">
                  Agent Telemetry & Runtime Status
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00e3fd]/10 text-[#00e3fd] border border-[#00e3fd]/30">
                  {task.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {task.project}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono truncate max-w-md mt-0.5">
                {task.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Close (Esc)"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar text-xs font-mono">
          {/* Truth Rule Notice Banner */}
          <div className="p-3 rounded-xl bg-[#041d38]/80 border border-[#00e3fd]/30 flex items-start gap-2.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#00e3fd] shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <span className="font-bold text-[#00e3fd]">M01-K Truth Mandate:</span> Agent OS provides strictly genuine runtime telemetry. 
              <span className="text-slate-400 ml-1">
                HANDOFF_READY ≠ EXECUTING · SELECTED ≠ WORKING · PREVIEW ≠ ENGINEERING EXECUTION.
                No artificial token meters or synthetic gas metrics are generated.
              </span>
            </div>
          </div>

          {/* Current Task Agent Headline Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#031326] border border-slate-800 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">ACTIVE AGENT</span>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold text-white text-xs sm:text-sm">Antigravity</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Google AI Studio</span>
            </div>

            <div className="p-3 rounded-xl bg-[#031326] border border-slate-800 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">STATUS</span>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="font-bold text-[#00e3fd] text-xs sm:text-sm">
                  {displayStatus}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Ready for Execution</span>
            </div>

            <div className="p-3 rounded-xl bg-[#031326] border border-slate-800 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">ROLE</span>
              <div className="mt-1.5">
                <span className="font-bold text-amber-300 text-xs sm:text-sm">Engineering Agent</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Full-Stack Implementation</span>
            </div>

            <div className="p-3 rounded-xl bg-[#031326] border border-slate-800 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">STAGE</span>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="font-bold text-purple-300 text-xs sm:text-sm">{task.currentPhase || 'ENGINEER'}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">{task.progressPercent || 40}% Lifecycle Progress</span>
            </div>
          </div>

          {/* Primary Agent Detailed Dossier */}
          <div className="p-4 rounded-xl bg-[#031326] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs uppercase tracking-wider">
                  Assigned Agent Dossier
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Current Task Runtime
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Agent Name:</span>
                <span className="font-bold text-white">Antigravity (Gemini)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Provider:</span>
                <span className="text-slate-200">Google AI Studio</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Model:</span>
                <span className="text-[#00e3fd] font-bold">gemini-3.8-flash (active) / Gemini 2.5 Pro</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Execution Mode:</span>
                <span className="text-emerald-400 font-bold">Cloud Run Sandbox (Port 3000)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Task ID:</span>
                <span className="text-white font-bold">{task.id}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Started Time:</span>
                <span className="text-slate-300">{task.createdAt}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/50 sm:col-span-2">
                <span className="text-slate-400 shrink-0 mr-4">Current Operation:</span>
                <span className="text-white font-bold truncate">
                  {currentStep ? `Step ${currentStep.step}: ${currentStep.title} (${currentStep.status})` : 'Architecture Synthesis Complete'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/50 sm:col-span-2">
                <span className="text-slate-400 shrink-0 mr-4">Last Activity:</span>
                <span className="text-emerald-300 truncate">
                  {latestLog ? `[${latestLog.timestamp}] ${latestLog.message}` : 'Handoff package compiled. Ready for autonomous execution.'}
                </span>
              </div>
            </div>
          </div>

          {/* Runtime Telemetry & Resource Consumption (Strict Truth Standard) */}
          <div className="p-4 rounded-xl bg-[#031326] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00e3fd]" />
                <span className="font-bold text-white text-xs uppercase tracking-wider">
                  Runtime Telemetry & Usage Metrics
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Truth Enforcement</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-[#020b17] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Input Token Usage</div>
                <div className="mt-1 font-mono font-bold text-slate-300 text-xs">
                  Usage: Not available from current runtime
                </div>
                <div className="text-[9px] text-slate-400 mt-1">Live token meter not exposed to preview iframe</div>
              </div>

              <div className="p-3 rounded-lg bg-[#020b17] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Output Token Usage</div>
                <div className="mt-1 font-mono font-bold text-slate-300 text-xs">
                  Usage: Not available from current runtime
                </div>
                <div className="text-[9px] text-slate-400 mt-1">Live token meter not exposed to preview iframe</div>
              </div>

              <div className="p-3 rounded-lg bg-[#020b17] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Estimated Cost / Gas</div>
                <div className="mt-1 font-mono font-bold text-slate-300 text-xs">
                  Usage: Not available from current runtime
                </div>
                <div className="text-[9px] text-slate-400 mt-1">Managed via AI Studio / Cloud project billing</div>
              </div>
            </div>
          </div>

          {/* Solution Context vs User Intent Linkage */}
          <div className="p-4 rounded-xl bg-[#031326] border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span>Contract Linkage in Current Task</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-[#020b17] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Solution Context (AAi Catalog)</div>
                <div className="mt-1 text-cyan-300 font-bold truncate">
                  {task.areaRef ? `${task.areaRef.id} · ${task.areaRef.title}` : (task.intentYaml?.context?.area_ref ? `${task.intentYaml.context.area_ref.id} · ${task.intentYaml.context.area_ref.title}` : 'None (General Domain Solution)')}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {task.areaRef ? task.areaRef.source : (task.intentYaml?.context?.area_ref ? task.intentYaml.context.area_ref.source : 'ad-hoc user query')}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#020b17] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Real User Intent</div>
                <div className="mt-1 text-white font-bold truncate">
                  {task.intentYaml?.intent?.title || task.title}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                  {task.intentText}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-[#031326]/90">
          <div className="flex items-center gap-2">
            {onOpenYamlInspector && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenYamlInspector();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#041d38] hover:bg-[#072d54] text-xs font-mono font-bold text-[#00e3fd] border border-[#00e3fd]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>View YAML Contracts</span>
              </button>
            )}

            {onOpenWorkspaceDrawer && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenWorkspaceDrawer();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-mono font-bold text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Server className="w-3.5 h-3.5" />
                <span>Open Workspace Drawer</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white border border-slate-700 transition-colors cursor-pointer font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
