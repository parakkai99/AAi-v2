/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Component: AgentOSSettingsModal
 * Purpose:
 * Operational Settings & Environment Configuration for AAi-Agent-OS (Requirement 14).
 * Categories:
 * 1. General (System defaults, theme, density)
 * 2. Execution (Runtime port, container timeout, build safety mode)
 * 3. Workspace (Current sandbox path, isolations)
 * 4. Agents (Default model, temperature, auto-critique)
 * 5. Security (Token boundaries, credential scrub)
 * 6. Telemetry & Providers (Truth rule enforcement, audit logs)
 */

import React, { useState, useEffect } from 'react';
import {
  Settings,
  X,
  Sliders,
  Shield,
  Cpu,
  FolderGit2,
  Bell,
  CheckCircle2,
  RefreshCw,
  Terminal,
} from 'lucide-react';

interface AgentOSSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SETTINGS_KEY = 'aai_agent_os_user_settings';

interface UserSettings {
  defaultAgent: string;
  sandboxPort: number;
  strictTypeScript: boolean;
  enforceTruthRule: boolean;
  autoSaveIntent: boolean;
  activeWorkspace: string;
  uiDensity: 'compact' | 'normal';
}

const DEFAULT_SETTINGS: UserSettings = {
  defaultAgent: 'Antigravity (Gemini)',
  sandboxPort: 3000,
  strictTypeScript: true,
  enforceTruthRule: true,
  autoSaveIntent: true,
  activeWorkspace: 'AAi-v2 (Approved)',
  uiDensity: 'compact',
};

export const AgentOSSettingsModal: React.FC<AgentOSSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  });
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (key: keyof UserSettings) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#020b18] border border-[#00e3fd]/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,227,253,0.15)] flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#031326]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00e3fd]/10 border border-[#00e3fd]/40 flex items-center justify-center text-[#00e3fd]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Agent OS System Settings
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-950/80 border border-sky-600/40 text-sky-300">
                  Control Plane
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Operating environment, compiler safety, and runtime telemetry
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

        {/* Settings Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {savedNotice && (
            <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings successfully persisted to local workspace.</span>
            </div>
          )}

          {/* Section: Execution Runtime */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00e3fd]" />
              <span>Execution Runtime & Sandbox</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Enforce Strict TypeScript Safety</span>
                  <span className="text-slate-400 text-[11px]">Require zero compilation errors before verification pass.</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('strictTypeScript')}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    settings.strictTypeScript ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.strictTypeScript ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <div>
                  <span className="font-bold text-white block">Active Sandbox Port</span>
                  <span className="text-slate-400 text-[11px]">Hardcoded container ingress port.</span>
                </div>
                <span className="font-mono font-bold text-emerald-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  {settings.sandboxPort}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Truth Rule & Telemetry */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>ArchitectAny Truth Rule Mandate</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Enforce Truth Rule</span>
                  <span className="text-slate-400 text-[11px]">
                    HANDOFF_READY ≠ EXECUTING. Ban synthetic token meters or fake gas metrics.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('enforceTruthRule')}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    settings.enforceTruthRule ? 'bg-[#00e3fd]' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                      settings.enforceTruthRule ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Section: Workspace Isolation */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-purple-400" />
              <span>Container Workspace Isolation</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Designated Workspace Container</span>
                <span className="font-mono text-white font-bold">{settings.activeWorkspace}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Solution Universe Boundaries</span>
                <span className="font-mono text-emerald-400">Zero Regression Protected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#020e1f] flex items-center justify-between text-xs text-slate-400">
          <span>Architect: Vijay Kumar K. • Contract: AAi-Agent-OS</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
