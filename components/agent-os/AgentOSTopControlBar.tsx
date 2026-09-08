/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Component: AgentOSTopControlBar
 * Purpose:
 * Compact Top Control Bar representing Environment, Platform, Agent, Execution,
 * Integration, and Tool/Capability switches (Requirements 39-42, 46-47).
 * 
 * Explicit Boundary:
 * The Top Control Bar controls the OPERATING ENVIRONMENT, distinct from the
 * 5-Phase Engineering Lifecycle (Intent → Architect → Engineer → Verify → Assemble).
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Server,
  Cpu,
  GitBranch,
  Layers,
  Settings,
  Bell,
  Check,
  ChevronDown,
  ExternalLink,
  Shield,
  Zap,
  Globe,
  Radio,
  Sliders,
  Sparkles,
  ArrowRight,
  Info,
  FolderGit2,
} from 'lucide-react';
import {
  CapabilityItem,
  CapabilityStatus,
  INITIAL_CAPABILITIES_REGISTRY,
} from '@/src/contracts/agentOS';

export interface AgentOSTopControlBarProps {
  currentProject?: string;
  onProjectChange?: (project: string) => void;
  onReturnToUniverse?: () => void;
  className?: string;
}

export const AgentOSTopControlBar: React.FC<AgentOSTopControlBarProps> = ({
  currentProject = 'AAi-v2 (Current)',
  onProjectChange,
  onReturnToUniverse,
  className = '',
}) => {
  const [capabilities, setCapabilities] = useState<CapabilityItem[]>(
    INITIAL_CAPABILITIES_REGISTRY
  );
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCapability = (id: string) => {
    setCapabilities((prev) =>
      prev.map((cap) => {
        if (cap.id === id) {
          if (cap.status === 'FUTURE') {
            // Cannot enable future phase capability, keep honest
            return cap;
          }
          if (cap.status === 'NOT_CONNECTED') {
            // honest status notice
            return cap;
          }
          const nextStatus: CapabilityStatus =
            cap.status === 'ACTIVE'
              ? 'ENABLED'
              : cap.status === 'ENABLED'
              ? 'AVAILABLE'
              : 'ACTIVE';
          return { ...cap, status: nextStatus };
        }
        return cap;
      })
    );
  };

  const getStatusBadge = (status: CapabilityStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ACTIVE
          </span>
        );
      case 'ENABLED':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-400 border border-sky-500/40">
            <Check className="w-2.5 h-2.5" />
            ENABLED
          </span>
        );
      case 'AVAILABLE':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-700/50 text-slate-300 border border-slate-600/40">
            AVAILABLE
          </span>
        );
      case 'NOT_CONNECTED':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
            NOT CONNECTED
          </span>
        );
      case 'NOT_CONFIGURED':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-800 text-slate-400 border border-slate-700">
            NOT CONFIGURED
          </span>
        );
      case 'FUTURE':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
            FUTURE
          </span>
        );
    }
  };

  const agentCapabilities = capabilities.filter((c) => c.category === 'AGENT');
  const executionCapabilities = capabilities.filter(
    (c) => c.category === 'EXECUTION'
  );
  const platformCapabilities = capabilities.filter(
    (c) => c.category === 'PLATFORM'
  );
  const gitCapabilities = capabilities.filter((c) => c.category === 'GIT');

  return (
    <div
      ref={dropdownRef}
      className={`bg-[#020b18] border-b border-[#00e3fd]/20 text-[#eaf7ff] select-none sticky top-0 z-40 shadow-[0_4px_25px_rgba(0,0,0,0.7)] ${className}`}
    >
      {/* Primary Bar - Strict Single Row with No Scroll */}
      <div className="flex items-center justify-between px-2.5 sm:px-4 py-1 gap-1.5 sm:gap-2 max-w-[1720px] mx-auto min-h-[38px] sm:min-h-[40px] flex-nowrap">
        {/* Left: AAi Agent OS Brand with Original Universe Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            {/* Original AAi 3D Universe Logo */}
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-[#021827] via-[#032238] to-[#042d4d] border border-[#00e3fd]/40 p-0.5 flex items-center justify-center overflow-hidden transition-all duration-300 shadow-[0_0_12px_rgba(0,227,253,0.3)] hover:border-[#00e3fd] shrink-0">
              <img
                src="/assets/architectany-logo-sm.jpg"
                alt="ArchitectAny AAi Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded shadow-inner"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1">
                <span className="font-sans font-black text-xs sm:text-sm tracking-tight text-white whitespace-nowrap">
                  AAi Agent OS
                </span>
                <span className="px-1 py-0.2 rounded text-[8px] font-mono font-bold bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/30">
                  v0.1.0
                </span>
              </div>
              <span className="text-[8px] text-slate-400 font-mono tracking-tight hidden 2xl:block whitespace-nowrap">
                ArchitectAny Agent Operating System
              </span>
            </div>
          </div>
        </div>

        {/* Center: Single-Row Controls: [Agent] [Execution] [Project] [Env] */}
        <div className="flex items-center gap-1.5 flex-nowrap justify-center flex-1 min-w-0 py-0.5">
          {/* 1. Capability Dropdown: Agents */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === 'agents' ? null : 'agents')
              }
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#041527] hover:bg-[#072442] border border-slate-700 hover:border-[#00e3fd]/50 text-[10px] sm:text-[11px] font-mono transition-all whitespace-nowrap"
            >
              <Cpu className="w-3 h-3 text-[#00e3fd]" />
              <span className="text-slate-400">Agent:</span>
              <span className="text-[#00e3fd] font-bold">Antigravity</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </button>

            {activeDropdown === 'agents' && (
              <div className="absolute left-0 mt-1.5 w-72 rounded-xl bg-[#031326] border border-[#00e3fd]/30 shadow-2xl p-2.5 z-50 text-xs font-mono">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Engineering Agents
                  </span>
                  <span className="text-[9px] text-slate-500">Registry v1</span>
                </div>
                <div className="space-y-1">
                  {agentCapabilities.map((ag) => (
                    <div
                      key={ag.id}
                      onClick={() => toggleCapability(ag.id)}
                      className="p-2 rounded-lg bg-[#020b17] border border-slate-800 hover:border-slate-700 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white text-xs">
                            {ag.name}
                          </span>
                          {ag.isRecommended && (
                            <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                              REC
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {ag.description}
                        </p>
                      </div>
                      {getStatusBadge(ag.status)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Capability Dropdown: Execution & Platform */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === 'execution' ? null : 'execution'
                )
              }
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#041527] hover:bg-[#072442] border border-slate-700 hover:border-[#00e3fd]/50 text-[10px] sm:text-[11px] font-mono transition-all whitespace-nowrap"
            >
              <Server className="w-3 h-3 text-emerald-400" />
              <span className="text-slate-400">Execution:</span>
              <span className="text-emerald-400 font-bold">Local</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </button>

            {activeDropdown === 'execution' && (
              <div className="absolute left-0 sm:right-0 sm:left-auto mt-1.5 w-80 rounded-xl bg-[#031326] border border-[#00e3fd]/30 shadow-2xl p-2.5 z-50 text-xs font-mono">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Execution & Platform Infrastructure
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider px-1">
                    Execution Environments
                  </div>
                  {executionCapabilities.map((ex) => (
                    <div
                      key={ex.id}
                      className="p-2 rounded-lg bg-[#020b17] border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-white">{ex.name}</span>
                        <p className="text-[10px] text-slate-400">{ex.description}</p>
                      </div>
                      {getStatusBadge(ex.status)}
                    </div>
                  ))}

                  <div className="text-[10px] text-slate-500 uppercase tracking-wider px-1 pt-1">
                    Platform Roadmap (Phases 3-5)
                  </div>
                  {platformCapabilities.map((pl) => (
                    <div
                      key={pl.id}
                      className="p-2 rounded-lg bg-[#020b17] border border-slate-800 flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-bold text-white text-xs">{pl.name}</span>
                        <p className="text-[10px] text-slate-400 truncate">{pl.description}</p>
                      </div>
                      {getStatusBadge(pl.status)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Project Selector (Inline in single row) */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === 'project' ? null : 'project')
              }
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#041527] hover:bg-[#072442] border border-slate-700 hover:border-[#00e3fd]/50 text-[10px] sm:text-[11px] font-mono transition-all whitespace-nowrap"
            >
              <span className="text-slate-400">Project:</span>
              <span className="font-bold text-[#00e3fd]">{currentProject}</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </button>

            {activeDropdown === 'project' && (
              <div className="absolute left-0 mt-1.5 w-56 rounded-xl bg-[#031326] border border-[#00e3fd]/30 shadow-2xl p-2 z-50 text-xs font-mono">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-2 py-1">
                  Active Workspaces
                </div>
                {[
                  { name: 'AAi-v2 (Current)', status: 'Active (Local)' },
                  { name: 'AAi-Finance-Suite', status: 'Available' },
                  { name: 'AAi-Edu-Explorer', status: 'Available' },
                ].map((proj) => (
                  <button
                    key={proj.name}
                    type="button"
                    onClick={() => {
                      onProjectChange?.(proj.name);
                      setActiveDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors ${
                      proj.name === currentProject
                        ? 'bg-[#00e3fd]/20 text-white font-bold'
                        : 'hover:bg-[#062647] text-slate-300'
                    }`}
                  >
                    <span>{proj.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {proj.status}
                    </span>
                  </button>
                ))}

                <div className="pt-2 mt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDropdown(null);
                      window.dispatchEvent(new CustomEvent('aai:open-workspace-drawer'));
                    }}
                    className="w-full py-1.5 px-2 rounded-lg bg-[#00e3fd]/15 hover:bg-[#00e3fd]/25 border border-[#00e3fd]/30 text-[#00e3fd] hover:text-white text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Open Workspace Explorer</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. Environment Pills (Local [Active], GitHub, Catalyst) */}
          <div className="relative flex items-center gap-0.5 bg-[#010a14] p-0.5 rounded-md border border-slate-800 shrink-0">
            <span className="text-[9px] text-slate-400 font-mono px-1 hidden md:block whitespace-nowrap">
              Env:
            </span>
            <button
              type="button"
              className="px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.2)] whitespace-nowrap"
            >
              Local
            </button>
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'git' ? null : 'git')}
              className="px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap"
              title="Remote Git synchronization"
            >
              GitHub
            </button>
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'execution' ? null : 'execution')}
              className="px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap"
              title="Catalyst Distributed Execution"
            >
              Catalyst
            </button>

            {/* Git Dropdown when GitHub is clicked */}
            {activeDropdown === 'git' && (
              <div className="absolute right-0 top-full mt-1.5 w-72 rounded-xl bg-[#031326] border border-[#00e3fd]/30 shadow-2xl p-2.5 z-50 text-xs font-mono">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Git &amp; Version Control
                  </span>
                </div>
                <div className="space-y-1">
                  {gitCapabilities.map((gc) => (
                    <div
                      key={gc.id}
                      className="p-2 rounded-lg bg-[#020b17] border border-slate-800 flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-bold text-white text-xs">{gc.name}</span>
                        <p className="text-[10px] text-slate-400 truncate">{gc.description}</p>
                      </div>
                      {getStatusBadge(gc.status)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: AAi Data Map, Notifications, Settings, Profile Avatar & Universe Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* AAi JSON / Data Map Inspector Button */}
          <button
            type="button"
            id="btn-agent-os-top-aai-json"
            onClick={() => window.dispatchEvent(new CustomEvent('aai:toggle-json-inspector'))}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#041527] hover:bg-[#072545] border border-[#00dfff]/40 hover:border-[#00e3fd] text-[#00e3fd] text-[10px] sm:text-[11px] font-mono font-bold transition-all cursor-pointer whitespace-nowrap shadow-[0_0_10px_rgba(0,227,253,0.15)]"
            title="Toggle AAi JSON & Data Map Inspector (Ctrl+J)"
          >
            <div className="grid grid-cols-2 gap-[1.5px] w-3 h-3 items-center justify-center">
              <span className="w-1 h-1 rounded-[0.5px] bg-[#00e3fd]" />
              <span className="w-1 h-1 rounded-[0.5px] bg-[#00e3fd]" />
              <span className="w-1 h-1 rounded-[0.5px] bg-[#00e3fd]" />
              <span className="w-1 h-1 rounded-[0.5px] bg-[#00e3fd]" />
            </div>
            <span className="hidden md:inline">{'{ }'} Data Map</span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative p-1 rounded-md bg-[#041527] hover:bg-[#072442] border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="3 pending system notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-800">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shadow-sm">
              VK
            </div>
            <div className="hidden xl:flex flex-col leading-none">
              <span className="text-[10px] font-bold text-white">Vijay K</span>
              <span className="text-[8px] text-slate-400 font-mono">
                Architect
              </span>
            </div>
          </div>

          {/* Return / Switch to Universe View Button */}
          {onReturnToUniverse && (
            <button
              type="button"
              onClick={onReturnToUniverse}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-[#005580] to-[#00385e] hover:from-[#006ea6] hover:to-[#004a7a] border border-[#00e3fd]/40 text-[#eaf7ff] text-[10px] sm:text-[11px] font-mono font-bold shadow-[0_0_10px_rgba(0,227,253,0.25)] transition-all cursor-pointer whitespace-nowrap"
              title="Return to ArchitectAny Universe (L1-L6)"
            >
              <Globe className="w-3 h-3 text-[#00e3fd]" />
              <span className="hidden sm:inline">Universe</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
