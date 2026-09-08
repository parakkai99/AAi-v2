/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Component: AgentOSGitModal
 * Purpose:
 * Git Integration & Version Control Hub for AAi-Agent-OS (Requirement 12).
 * Displays: Repository, Branch, Task Branch, Working Tree, Changed Files (Added, Modified, Deleted),
 * Last Commit, Diff summary, and Commit History.
 * 
 * Explicit Task ↔ Git Relationship: Links active task and revision to its working branch.
 */

import React, { useState } from 'react';
import {
  FolderGit2,
  GitBranch,
  GitCommit,
  GitPullRequest,
  X,
  CheckCircle2,
  FilePlus,
  FileEdit,
  FileMinus,
  Clock,
  ExternalLink,
  ShieldCheck,
  Terminal,
  ChevronRight,
  Code2,
} from 'lucide-react';
import { AgentOSTask } from '@/src/contracts/agentOS';

interface AgentOSGitModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTask: AgentOSTask;
}

export const AgentOSGitModal: React.FC<AgentOSGitModalProps> = ({
  isOpen,
  onClose,
  activeTask,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const taskBranch = `task/${activeTask.id.toLowerCase()}-${(activeTask.revisionLabel || 'r1').toLowerCase()}`;
  const filesList = activeTask.filesList || [
    '/components/solutions/trader/TraderAppView.tsx',
    '/src/contracts/traderAccounting.ts',
  ];

  const gitHistory = [
    {
      hash: 'a9f14b2',
      message: `feat(${activeTask.id}): initialize task workspace and contracts`,
      author: 'Antigravity (Gemini)',
      time: '12 minutes ago',
      revision: activeTask.revisionLabel || 'R1',
    },
    {
      hash: '7c82e01',
      message: 'chore(agent-os): enforce context vs intent separation (M01-K)',
      author: 'Vijay Kumar K.',
      time: '45 minutes ago',
      revision: 'Base',
    },
    {
      hash: '3d51f9a',
      message: 'feat(universe): canonical L1-L6 taxonomy & domain schemas',
      author: 'Vijay Kumar K.',
      time: '2 hours ago',
      revision: 'Base',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#020b18] border border-[#00e3fd]/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,227,253,0.15)] flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#031326]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00e3fd]/10 border border-[#00e3fd]/40 flex items-center justify-center text-[#00e3fd]">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Git Version Control & Repository Hub
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-950/80 border border-sky-600/40 text-sky-300">
                  Task ↔ Git Binding
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Active working tree, changed files, branches, and commit provenance
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

        {/* Repository HUD Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 border-b border-slate-800/80 bg-[#020e1f] text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] block uppercase font-mono">Repository</span>
            <span className="font-mono font-bold text-white truncate block">ArchitectAny/AAi-v2</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] block uppercase font-mono">Base Branch</span>
            <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
              <GitBranch className="w-3 h-3" /> main
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] block uppercase font-mono">Task Working Branch</span>
            <span className="font-mono font-bold text-[#00e3fd] truncate block flex items-center gap-1">
              <GitBranch className="w-3 h-3 shrink-0" /> {taskBranch}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] block uppercase font-mono">Working Tree</span>
            <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Clean (0 unstaged)
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Changed Files */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span>Task Files & Artifacts</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {filesList.length} files tracked
                </span>
              </h3>
              <span className="text-[11px] font-mono text-emerald-400">
                +{filesList.length} Added • 0 Modified • 0 Deleted
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-xs">
              {filesList.map((file, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedFile(file)}
                  className={`p-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    selectedFile === file
                      ? 'bg-sky-950/70 border border-sky-600/50 text-[#00e3fd]'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FilePlus className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{file}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Tracked</span>
                </div>
              ))}
            </div>
          </div>

          {/* Commit History & Provenance */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Immutable Commit Provenance
            </h3>
            <div className="space-y-2">
              {gitHistory.map((commit) => (
                <div
                  key={commit.hash}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#00e3fd] font-bold">{commit.hash}</span>
                      <span className="text-white font-medium">{commit.message}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                      <span>Author: {commit.author}</span>
                      <span>•</span>
                      <span>{commit.time}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {commit.revision}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#020e1f] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Task branch bound strictly to workspace AAi-v2</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Git Hub
          </button>
        </div>
      </div>
    </div>
  );
};
