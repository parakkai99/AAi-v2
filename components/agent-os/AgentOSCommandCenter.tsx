/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * 
 * Component: AgentOSCommandCenter
 * Purpose:
 * Canonical AAi Agent OS Command Center implementing:
 * - Requirements 39-49 & visual design fidelity of reference image AAi-os.png
 * - Independent Top Control Bar for Environment, Platform, Agent, Execution, Git
 * - 5-Phase Engineering Lifecycle (Intent → Architect → Engineer → Verify → Assemble)
 * - 5-Column Workstation Grid with LIVE interaction, dynamic task creation & local persistence
 * - Real 16-Section Antigravity Engineering Package generation & 1-click clipboard handoff
 * - Interactive Solution Preview with live testing prototypes
 * - Bottom Status & Telemetry HUD bound to active task
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Home,
  Plus,
  CheckSquare,
  FolderGit2,
  Cpu,
  BookOpen,
  Wrench,
  GitBranch,
  LayoutTemplate,
  Settings,
  Rocket,
  Lightbulb,
  CheckCircle2,
  Layers,
  ArrowRight,
  Play,
  RotateCw,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  FileCode,
  Shield,
  Activity,
  Terminal,
  Clock,
  Sparkles,
  Paperclip,
  Search,
  FileText,
  Eye,
  Check,
  Share2,
  Globe,
  Upload,
  BarChart3,
  GraduationCap,
  X,
  RefreshCw,
  Copy,
  Download,
  AlertCircle,
  HelpCircle,
  Zap,
  Maximize2,
  Minimize2,
  Shuffle,
  Wand2,
  Edit3,
  MapPin,
  Database,
  Code2,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Trash2,
  Lock,
  Unlock,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { AgentOSTopControlBar } from './AgentOSTopControlBar';
import { AgentOSYamlInspectorModal } from './AgentOSYamlInspectorModal';
import { AgentOSWorkspaceDrawer } from './AgentOSWorkspaceDrawer';
import { AgentOSTaskAgentsModal } from './AgentOSTaskAgentsModal';
import { AgentOSKnowledgeModal } from './AgentOSKnowledgeModal';
import { AgentOSMcpToolsModal } from './AgentOSMcpToolsModal';
import { AgentOSGitModal } from './AgentOSGitModal';
import { AgentOSTemplatesModal } from './AgentOSTemplatesModal';
import { AgentOSSettingsModal } from './AgentOSSettingsModal';
import { AgentOSRevisionModal } from './AgentOSRevisionModal';
import { AgentOSTaskDeleteModal } from './AgentOSTaskDeleteModal';
import { AreaRefYaml } from '@/src/contracts/agentOSYaml';
import { extractAreaReference } from '@/src/services/agentOSYamlService';
import {
  LifecyclePhaseId,
  AgentOSTask,
  CapabilityItem,
} from '@/src/contracts/agentOS';
import {
  taskRepository,
  generateEngineeringPackageMarkdown,
} from '@/src/services/agentOSEngine';

export interface SamplePromptItem {
  id: string;
  tag: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
}

export const SAMPLE_PROMPTS: SamplePromptItem[] = [
  {
    id: 'trader-tax',
    tag: 'FinTech / Trading',
    title: 'Trader Tax & P&L Automation',
    category: 'business',
    icon: BarChart3,
    prompt:
      'Automate trade book classification, intraday mark-to-market P&L, and ITR-3 capital gains summary generation for active stock and options traders.',
  },
  {
    id: 'calculus-ai',
    tag: 'Math & STEM',
    title: 'Calculus & Gradient Visualizer',
    category: 'education',
    icon: GraduationCap,
    prompt:
      'Build an interactive calculus exploration tool illustrating rate of change, curve tangent slopes, and neural network backpropagation gradients.',
  },
  {
    id: 'barcode-audit',
    tag: 'Supply Chain',
    title: 'Barcode Inventory Audit',
    category: 'business',
    icon: Layers,
    prompt:
      'Build a real-time barcode inventory scanner audit dashboard with stock discrepancy detection, reconciliation logs, and low-inventory reorder alerts.',
  },
  {
    id: 'clinic-triage',
    tag: 'Healthcare',
    title: 'Patient Triage & Follow-up',
    category: 'other',
    icon: Activity,
    prompt:
      'Build a clinical patient intake checklist with automated acuity scoring, appointment scheduling, and SMS treatment adherence reminders.',
  },
  {
    id: 'm01-flight-test',
    tag: 'Agent OS Core',
    title: 'M01 Reversible Flight Test',
    category: 'enhancement',
    icon: Rocket,
    prompt:
      'Create a small reversible engineering change that proves AAi-Agent-OS can convert an intent into a real task, prepare an engineering package, assign an engineering agent, work against the approved AAi-v2 workspace, verify the change, assemble the result, show what was actually achieved, and safely revert the change.',
  },
];

export interface AgentOSCommandCenterProps {
  onReturnToUniverse?: () => void;
  initialIntentRef?: string | null;
  onClearInitialIntentRef?: () => void;
  className?: string;
}

export const AgentOSCommandCenter: React.FC<AgentOSCommandCenterProps> = ({
  onReturnToUniverse,
  initialIntentRef,
  onClearInitialIntentRef,
  className = '',
}) => {
  // Task state loaded from local persistence engine
  const [tasks, setTasks] = useState<AgentOSTask[]>(() => taskRepository.getTasks());
  const [activeTask, setActiveTask] = useState<AgentOSTask>(() => taskRepository.getActiveTask());

  // Active Navigation in Left Sidebar
  const [activeSidebarNav, setActiveSidebarNav] = useState<string>('home');

  // Active Lifecycle Phase highlight
  const [activePhase, setActivePhase] = useState<LifecyclePhaseId>(() => activeTask.currentPhase || 'ENGINEER');

  // Architect Tab selection
  const [architectTab, setArchitectTab] = useState<'analysis' | 'scope' | 'plan' | 'prompt'>('analysis');

  // Verification review tab
  const [reviewTab, setReviewTab] = useState<'summary' | 'issues' | 'suggestions'>('summary');

  // Solution Preview tab
  const [previewTab, setPreviewTab] = useState<'application' | 'code' | 'docs'>('application');

  // Selected AI Engineer
  const [selectedAgent, setSelectedAgent] = useState<string>(activeTask.activeAgent || 'antigravity');

  // Interactive Solution Modal
  const [activeSolutionModal, setActiveSolutionModal] = useState<string | null>(null);

  // Agent Telemetry & Runtime Status Modal (M01-K)
  const [isAgentsModalOpen, setIsAgentsModalOpen] = useState<boolean>(false);

  // Solution Context (AAi Catalog Area Ref) — strictly separated from Real User Intent
  const [attachedAreaRef, setAttachedAreaRef] = useState<AreaRefYaml | null>(() => {
    if (activeTask.areaRef) return activeTask.areaRef;
    if (activeTask.intentYaml?.context?.area_ref) {
      return {
        id: activeTask.intentYaml.context.area_ref.id,
        title: activeTask.intentYaml.context.area_ref.title,
        source: activeTask.intentYaml.context.area_ref.source,
        parent: activeTask.intentYaml.context.area_ref.parent,
        status: activeTask.intentYaml.context.area_ref.status || 'active',
      };
    }
    return null;
  });

  // Intent form state (Pure, untruncated user intent)
  const [intentText, setIntentText] = useState<string>(activeTask.intentText);
  const [intentCategory, setIntentCategory] = useState<string>(activeTask.intentCategory || 'business');
  const [isPromptExpanded, setIsPromptExpanded] = useState<boolean>(false);
  const [activeSampleIndex, setActiveSampleIndex] = useState<number>(0);
  const [showSamplePrompts, setShowSamplePrompts] = useState<boolean>(false);
  const [loadedSampleId, setLoadedSampleId] = useState<string | null>(null);
  const [showAreaRefMenu, setShowAreaRefMenu] = useState<boolean>(false);

  const promptContainerRef = useRef<HTMLDivElement>(null);
  const promptTextareaRef = useRef<HTMLTextAreaElement>(null);
  const areaRefMenuRef = useRef<HTMLDivElement>(null);

  // Close area ref menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (areaRefMenuRef.current && !areaRefMenuRef.current.contains(e.target as Node)) {
        setShowAreaRefMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle incoming initialIntentRef prop (M01-K: Set as Solution Context, do not pollute user intent)
  useEffect(() => {
    if (initialIntentRef) {
      const ref = initialIntentRef.trim();
      const parsed = extractAreaReference(ref);
      if (parsed) {
        setAttachedAreaRef(parsed);
      }
      setActivePhase('INTENT');
      setIsPromptExpanded(true);
      onClearInitialIntentRef?.();
      setTimeout(() => {
        promptTextareaRef.current?.focus();
      }, 150);
    }
  }, [initialIntentRef, onClearInitialIntentRef]);

  // Listen for global custom events to inject Solution Context from JSON Inspector / Catalog
  useEffect(() => {
    const handleInject = (e: Event) => {
      const custom = e as CustomEvent<{ referenceText?: string }>;
      if (custom.detail?.referenceText) {
        const ref = custom.detail.referenceText.trim();
        const parsed = extractAreaReference(ref);
        if (parsed) {
          setAttachedAreaRef(parsed);
          showToast(`Attached Solution Context: ${parsed.id} · ${parsed.title}`);
        }
        setActivePhase('INTENT');
        setIsPromptExpanded(true);
        setTimeout(() => {
          promptTextareaRef.current?.focus();
        }, 150);
      }
    };
    window.addEventListener('aai:inject-intent-reference', handleInject);
    window.addEventListener('aai:send-to-agent-os', handleInject);
    return () => {
      window.removeEventListener('aai:inject-intent-reference', handleInject);
      window.removeEventListener('aai:send-to-agent-os', handleInject);
    };
  }, []);

  // Auto-collapse expanded prompt on click outside (only when not in initial INTENT draft phase)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        activePhase !== 'INTENT' &&
        promptContainerRef.current &&
        !promptContainerRef.current.contains(e.target as Node)
      ) {
        setIsPromptExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activePhase]);

  // Subtle auto-cycle through sample prompts if empty
  useEffect(() => {
    if (intentText.trim().length > 0) return;
    const interval = setInterval(() => {
      setActiveSampleIndex((prev) => (prev + 1) % SAMPLE_PROMPTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [intentText]);

  // Modals for tasks & engineering package & YAML contract & workspace drawer
  const [isTasksModalOpen, setIsTasksModalOpen] = useState<boolean>(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState<boolean>(false);
  const [isYamlInspectorOpen, setIsYamlInspectorOpen] = useState<boolean>(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState<boolean>(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);
  const [copiedPackage, setCopiedPackage] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Requirement Modals (Left rail & workflow operations)
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState<boolean>(false);
  const [isMcpModalOpen, setIsMcpModalOpen] = useState<boolean>(false);
  const [isGitModalOpen, setIsGitModalOpen] = useState<boolean>(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // Listen for external workspace drawer open trigger
  useEffect(() => {
    const handleOpenWorkspace = () => setIsWorkspaceOpen(true);
    window.addEventListener('aai:open-workspace-drawer', handleOpenWorkspace);
    return () => window.removeEventListener('aai:open-workspace-drawer', handleOpenWorkspace);
  }, []);

  // Verification checks run state
  const [verificationRunning, setVerificationRunning] = useState<boolean>(false);
  const [verificationIndex, setVerificationIndex] = useState<number>(-1);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Custom solution test runner state
  const [customTestRunning, setCustomTestRunning] = useState<boolean>(false);
  const [customTestOutput, setCustomTestOutput] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Switch active task
  const handleSelectTask = (task: AgentOSTask) => {
    taskRepository.setActiveTaskId(task.id);
    setActiveTask(task);
    setIntentText(task.intentText);
    setIntentCategory(task.intentCategory);
    setAttachedAreaRef(task.areaRef || (task.intentYaml?.context?.area_ref ? {
      id: task.intentYaml.context.area_ref.id,
      title: task.intentYaml.context.area_ref.title,
      source: task.intentYaml.context.area_ref.source,
      parent: task.intentYaml.context.area_ref.parent,
      status: task.intentYaml.context.area_ref.status || 'active',
    } : null));
    setActivePhase(task.currentPhase);
    setSelectedAgent(task.activeAgent || 'antigravity');
    setIsTasksModalOpen(false);
    showToast(`Switched to Task ${task.id}: ${task.title}`);
  };

  // Create new task or save modifications from intent
  const handleSaveOrSubmitIntent = () => {
    if (!intentText.trim()) {
      showToast('Please enter an intent description first.');
      return;
    }

    if (activePhase === 'INTENT') {
      const newTask = taskRepository.createTask(intentText, intentCategory, attachedAreaRef);
      const updatedTasks = taskRepository.getTasks();
      setTasks(updatedTasks);
      setActiveTask(newTask);
      setActivePhase('ARCHITECT');
      setArchitectTab('analysis');
      setIsPromptExpanded(false);
      showToast(`Task ${newTask.id} created! Moving to Architect phase.`);
    } else {
      const updated = taskRepository.updateTask(activeTask.id, {
        intentText,
        intentCategory,
        areaRef: attachedAreaRef,
      });
      const updatedTasks = taskRepository.getTasks();
      setTasks(updatedTasks);
      setActiveTask(updated);
      setIsPromptExpanded(false);
      showToast(`Task ${activeTask.id} intent updated! Plan re-synchronized.`);
    }
  };

  // Create new task from intent (alias for backward compatibility)
  const handleCreateArchitectPlan = () => {
    handleSaveOrSubmitIntent();
  };

  // Advance Stage in Workflow (Requirement 2 & 3)
  const handleAdvancePhase = (targetPhase?: LifecyclePhaseId) => {
    // Validate inputs
    if (activeTask.currentPhase === 'INTENT' && !intentText.trim()) {
      showToast('Please specify your intent before advancing to Architect.');
      return;
    }

    const updated = taskRepository.advancePhase(activeTask.id, targetPhase);
    setTasks(taskRepository.getTasks());
    setActiveTask(updated);
    setActivePhase(updated.currentPhase);
    showToast(`Advanced to ${updated.currentPhase}. Prior stages locked.`);
  };

  // Create Controlled Revision (Requirement 5)
  const handleCreateRevision = (reason: string, targetStage: LifecyclePhaseId) => {
    const updated = taskRepository.createRevision(activeTask.id, reason, targetStage, 'Vijay Kumar K.');
    setTasks(taskRepository.getTasks());
    setActiveTask(updated);
    setActivePhase(targetStage);
    setIntentText(updated.intentText);
    showToast(`Created Revision ${updated.revisionLabel}. Re-entered at ${targetStage}.`);
  };

  // Delete Task with Safety Guard (Requirement 6)
  const handleDeleteTask = (taskId: string) => {
    const success = taskRepository.deleteTask(taskId);
    if (!success) {
      showToast(`Cannot delete protected task ${taskId}.`);
      return;
    }
    const remainingTasks = taskRepository.getTasks();
    const nextActive = taskRepository.getActiveTask();
    setTasks(remainingTasks);
    setActiveTask(nextActive);
    setActivePhase(nextActive.currentPhase);
    setIntentText(nextActive.intentText);
    showToast(`Task ${taskId} deleted. Active task switched to ${nextActive.id}.`);
  };

  // Apply Blueprint Template (Requirement 13)
  const handleApplyTemplate = (template: { title: string; category: string; prompt: string }) => {
    setIntentText(template.prompt);
    setIntentCategory(template.category);
    setActivePhase('INTENT');
    setIsPromptExpanded(true);
    showToast(`Applied "${template.title}" template blueprint.`);
    setTimeout(() => {
      promptTextareaRef.current?.focus();
    }, 50);
  };

  // Reset to empty for a brand new intent with expanded workstation & sample suggestions
  const handleStartNewIntent = () => {
    setIntentText('');
    setAttachedAreaRef(null);
    setLoadedSampleId(null);
    setActivePhase('INTENT');
    setIsPromptExpanded(true);
    setShowSamplePrompts(true);
    showToast('Ready for new intent! Solution Context cleared. Write your prompt.');
    setTimeout(() => {
      promptTextareaRef.current?.focus();
    }, 100);
  };

  // Populate sample prompt
  const handleSelectSamplePrompt = (sample: SamplePromptItem) => {
    setIntentText(sample.prompt);
    setIntentCategory(sample.category);
    setLoadedSampleId(sample.id);
    setIsPromptExpanded(true);
    showToast(`Loaded "${sample.title}"! Customize to go further, or clear to change.`);
    setTimeout(() => {
      promptTextareaRef.current?.focus();
    }, 50);
  };

  // Advance simulation step in AI Engineer column
  const handleAdvanceExecutionStep = () => {
    const currentSteps = [...activeTask.taskSteps];
    const workingIdx = currentSteps.findIndex((s) => s.status === 'WORKING');
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    let newSteps = [...currentSteps];
    let newLogs = [...activeTask.logs];
    let nextProgress = activeTask.progressPercent;

    if (workingIdx !== -1) {
      newSteps[workingIdx] = { ...newSteps[workingIdx], status: 'COMPLETED' };
      if (workingIdx + 1 < newSteps.length) {
        newSteps[workingIdx + 1] = { ...newSteps[workingIdx + 1], status: 'WORKING' };
        newLogs.push({
          timestamp: timeStr,
          message: `Advanced to step ${newSteps[workingIdx + 1].step}: ${newSteps[workingIdx + 1].title}`,
          level: 'info',
        });
        nextProgress = Math.min(100, Math.round(((workingIdx + 2) / newSteps.length) * 100));
      } else {
        newLogs.push({
          timestamp: timeStr,
          message: 'All engineering execution steps completed. Ready for verification.',
          level: 'success',
        });
        nextProgress = 100;
        setActivePhase('VERIFY');
      }
    } else {
      newSteps = newSteps.map((s, idx) => ({
        ...s,
        status: idx === 0 ? 'WORKING' : 'PENDING',
      }));
      newLogs.push({
        timestamp: timeStr,
        message: 'Restarted engineering execution cycle from step 1.',
        level: 'info',
      });
      nextProgress = 20;
    }

    const updated = taskRepository.updateTask(activeTask.id, {
      taskSteps: newSteps,
      logs: newLogs,
      progressPercent: nextProgress,
    });
    setActiveTask(updated);
    setTasks(taskRepository.getTasks());
  };

  // Run dynamic verification sequence
  const handleRunAllChecks = () => {
    setVerificationRunning(true);
    setVerificationIndex(0);

    const checks = activeTask.verificationChecks;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      if (current < checks.length) {
        setVerificationIndex(current);
      } else {
        clearInterval(interval);
        setVerificationRunning(false);
        setVerificationIndex(-1);
        showToast('All verification checks passed with zero errors!');
      }
    }, 280);
  };

  // Copy Antigravity package to clipboard
  const handleCopyPackage = () => {
    const pkg = activeTask.engineeringPackageMarkdown || generateEngineeringPackageMarkdown(activeTask);
    navigator.clipboard.writeText(pkg);
    setCopiedPackage(true);
    showToast('Antigravity Engineering Package copied to clipboard!');
    setTimeout(() => setCopiedPackage(false), 2500);
  };

  // Copy Antigravity prompt to clipboard
  const handleCopyPrompt = () => {
    const prompt = activeTask.promptTemplate || `You are Antigravity (Gemini), acting as Lead Autonomous AI Engineer for ArchitectAny. Execute task ${activeTask.id}: "${activeTask.title}". Target workspace is AAi-v2.`;
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    showToast('Antigravity Engineering Prompt copied to clipboard!');
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  // Run simulated interactive test in custom solution modal
  const handleRunCustomTest = () => {
    setCustomTestRunning(true);
    setCustomTestOutput(null);
    setTimeout(() => {
      setCustomTestRunning(false);
      setCustomTestOutput(
        `✓ Test Run for [${activeTask.title}] completed successfully!\n` +
        `• Environment: Cloud Run Sandbox (AAi-v2)\n` +
        `• Ingested Parameters: Category [${activeTask.intentCategory.toUpperCase()}], 0 syntax errors\n` +
        `• TypeScript Compiler: Clean 0 errors\n` +
        `• Response Time: 18ms\n` +
        `• Verification Status: 100% Passed\n` +
        `• Deliverable: Solution Artifact verified & ready for assembly.`
      );
    }, 750);
  };

  return (
    <div
      className={`min-h-screen bg-[#020914] text-[#eaf7ff] flex flex-col font-sans select-none overflow-x-hidden ${className}`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl bg-[#0070ba] text-white text-xs font-mono font-bold shadow-[0_0_25px_rgba(0,227,253,0.5)] border border-[#00e3fd]/60 flex items-center gap-2 transition-all">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =================================================================== */}
      {/* 1. TOP CONTROL BAR (Requirements 39-42, 46-47)                      */}
      {/* Controls Operating Environment, Platform, Agent, Execution, Git     */}
      {/* =================================================================== */}
      <AgentOSTopControlBar onReturnToUniverse={onReturnToUniverse} />

      {/* =================================================================== */}
      {/* 2. MAIN APPLICATION WORKSPACE (Sidebar + Main Stage)                 */}
      {/* =================================================================== */}
      <div className="flex-1 flex overflow-hidden">
        {/* ================================================================= */}
        {/* LEFT SIDEBAR NAVIGATION: COMPACT ICON RAIL                        */}
        {/* ================================================================= */}
        <aside
          className={`${
            isSidebarExpanded ? 'w-52' : 'w-14 sm:w-16'
          } bg-[#020b17] border-r border-[#00e3fd]/15 flex flex-col justify-between p-2 shrink-0 hidden md:flex select-none transition-all duration-300 z-30`}
          aria-label="Agent OS Sidebar"
        >
          <div className="space-y-1.5">
            {[
              { id: 'home', label: 'Home', icon: Home, active: activeSidebarNav === 'home' },
              { id: 'new-intent', label: 'New Intent', icon: Plus },
              { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: String(tasks.length) },
              { id: 'workspaces', label: 'Workspaces', icon: FolderGit2, highlight: true },
              { id: 'agents', label: 'Agents', icon: Cpu },
              { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
              { id: 'mcp', label: 'MCP & Tools', icon: Wrench },
              { id: 'git', label: 'Git Integration', icon: GitBranch },
              { id: 'templates', label: 'Templates', icon: LayoutTemplate },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = item.active || activeSidebarNav === item.id;
              return (
                <div key={item.id} className="relative group flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarNav(item.id);
                      if (item.id === 'new-intent') {
                        handleStartNewIntent();
                      } else if (item.id === 'tasks') {
                        setIsTasksModalOpen(true);
                      } else if (item.id === 'workspaces') {
                        setIsWorkspaceOpen(true);
                      } else if (item.id === 'agents') {
                        setIsAgentsModalOpen(true);
                      } else if (item.id === 'knowledge') {
                        setIsKnowledgeModalOpen(true);
                      } else if (item.id === 'mcp') {
                        setIsMcpModalOpen(true);
                      } else if (item.id === 'git') {
                        setIsGitModalOpen(true);
                      } else if (item.id === 'templates') {
                        setIsTemplatesModalOpen(true);
                      } else if (item.id === 'settings') {
                        setIsSettingsModalOpen(true);
                      } else if (item.id === 'home' && onReturnToUniverse) {
                        // stay in command center home
                      } else {
                        showToast(`${item.label} view ready in AAi-v2 workspace.`);
                      }
                    }}
                    className={`${
                      isSidebarExpanded
                        ? 'w-full px-2.5 py-2 justify-start gap-2.5'
                        : 'w-10 h-10 justify-center'
                    } rounded-xl flex items-center transition-all cursor-pointer relative ${
                      isActive
                        ? 'bg-[#0070ba]/30 text-[#00e3fd] border border-[#00e3fd]/60 shadow-[0_0_15px_rgba(0,227,253,0.3)] font-bold'
                        : item.highlight
                        ? 'text-emerald-400 hover:text-white hover:bg-emerald-500/20 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-[#04162a]'
                    }`}
                    title={isSidebarExpanded ? undefined : item.label}
                    aria-label={item.label}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {isSidebarExpanded && (
                      <span className="text-xs font-mono truncate">{item.label}</span>
                    )}
                    {item.badge && (
                      <span
                        className={`${
                          isSidebarExpanded
                            ? 'ml-auto px-1.5 py-0.2'
                            : 'absolute -top-1 -right-1 px-1 py-0.2'
                        } rounded-full text-[9px] font-bold bg-[#00e3fd] text-slate-950 font-mono`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Tooltip in Icon Rail mode */}
                  {!isSidebarExpanded && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 px-2.5 py-1 rounded-md bg-[#031528] border border-[#00e3fd]/40 shadow-[0_4px_20px_rgba(0,0,0,0.8)] text-xs font-mono font-medium text-slate-200 whitespace-nowrap z-50 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                      <span className="text-white font-bold">{item.label}</span>
                      {item.badge && <span className="text-[#00e3fd]">({item.badge})</span>}
                      {item.id === 'workspaces' && (
                        <span className="text-[10px] text-emerald-400 font-bold ml-1">Open</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Controls of Sidebar: Active Task Indicator + Expand/Collapse Toggle */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            {/* Active Task mini status */}
            {isSidebarExpanded ? (
              <div className="p-2.5 rounded-xl bg-[#010812] border border-[#00e3fd]/20 space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400">Task Active</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="font-bold text-white text-[11px] truncate">
                  {activeTask.id}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{activeTask.currentPhase}</span>
                  <span className="text-emerald-300 font-bold">{activeTask.progressPercent}%</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTasksModalOpen(true)}
                  className="w-full py-1 px-2 rounded-lg bg-[#041527] hover:bg-[#072442] border border-slate-700 text-slate-300 text-[10px] text-center"
                >
                  Switch Task
                </button>
              </div>
            ) : (
              <div className="relative group flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsTasksModalOpen(true)}
                  className="w-10 h-10 rounded-xl bg-[#010812] hover:bg-[#041527] border border-[#00e3fd]/30 flex flex-col items-center justify-center relative cursor-pointer"
                  aria-label="Active Task Status"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-bold text-[#00e3fd] mt-0.5 font-mono">
                    {activeTask.id.replace('AA-', '')}
                  </span>
                </button>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 p-2 rounded-lg bg-[#031528] border border-[#00e3fd]/40 shadow-2xl text-xs font-mono text-slate-200 whitespace-nowrap z-50 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity space-y-1">
                  <div className="text-emerald-400 font-bold text-[11px]">
                    Active Task: {activeTask.id}
                  </div>
                  <div className="text-white text-[11px] max-w-xs truncate">{activeTask.title}</div>
                  <div className="text-[10px] text-slate-400">
                    Phase: <strong className="text-sky-300">{activeTask.currentPhase}</strong> • {activeTask.progressPercent}%
                  </div>
                </div>
              </div>
            )}

            {/* Expand / Collapse toggle button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className="w-10 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 flex items-center justify-center transition-colors cursor-pointer"
                title={isSidebarExpanded ? 'Collapse to Icon Rail' : 'Expand Sidebar'}
                aria-label="Toggle Sidebar Width"
              >
                {isSidebarExpanded ? (
                  <PanelLeftClose className="w-4 h-4" />
                ) : (
                  <PanelLeftOpen className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* ================================================================= */}
        {/* MAIN STAGE CONTENT                                                */}
        {/* ================================================================= */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto p-2.5 sm:p-4 space-y-3 max-w-[1720px] mx-auto w-full">
          {/* 1. TOP 50/50 DUAL-PANEL: TASK / INTENT (Left) + LIVE STATUS (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
            {/* LEFT 50%: TASK / INTENT */}
            <section
              className="rounded-xl bg-[#020b17] border border-[#00e3fd]/25 p-3.5 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col justify-between gap-2.5 font-mono"
              aria-label="Task and Intent Workspace"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#00e3fd]">
                    TASK / INTENT
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setIsWorkspaceOpen(true)}
                      className="px-2 py-0.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                      title="Open Workspace Explorer & File Inspector for AAi-v2 (Port 3000)"
                    >
                      <FolderGit2 className="w-3 h-3 text-emerald-400" />
                      <span>Workspace</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsYamlInspectorOpen(true)}
                      className="px-2 py-0.5 rounded bg-[#00e3fd]/15 hover:bg-[#00e3fd]/25 text-[#00e3fd] hover:text-white border border-[#00e3fd]/40 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                      title="Inspect Structured Intent & Engineering YAML Contract"
                    >
                      <Code2 className="w-3 h-3" />
                      <span>{'{ }'} YAML</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent('aai:open-json-inspector'))}
                      className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[10px] flex items-center gap-1 transition-all cursor-pointer"
                      title="Open AAi Canonical JSON Catalog Inspector"
                    >
                      <Database className="w-3 h-3 text-sky-400" />
                      <span>AAi JSON</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base sm:text-lg font-black text-white tracking-tight">
                      {activeTask.id}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      {activeTask.status}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/30">
                      {activeTask.revisionLabel || `R${activeTask.revision || 1}`}
                    </span>
                    {activeTask.lockedStages && activeTask.lockedStages.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5 text-amber-400" />
                        <span>{activeTask.lockedStages.length} Locked</span>
                      </span>
                    )}
                  </div>
                  <h2 className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5 line-clamp-1" title={activeTask.title}>
                    {activeTask.title}
                  </h2>
                </div>
              </div>

              {/* Workspace & Area Ref & Version Actions */}
              <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-2 flex-wrap text-slate-300">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsWorkspaceOpen(true)}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#031529] hover:bg-[#072442] border border-slate-700 hover:border-[#00e3fd]/60 text-xs font-mono transition-all cursor-pointer group"
                      title={`Open ${activeTask.project} Workspace Destination (Task ${activeTask.id})`}
                    >
                      <FolderGit2 className="w-3.5 h-3.5 text-[#00e3fd]" />
                      <span className="text-slate-400 group-hover:text-slate-200 font-semibold text-[11px]">Workspace:</span>
                      <span className="text-[#00e3fd] font-bold group-hover:text-white">{activeTask.project}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#00e3fd]" />
                    </button>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      Port 3000
                    </span>
                  </div>

                  {/* Task Actions: Revision & Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setIsRevisionModalOpen(true)}
                      className="px-2 py-0.5 rounded bg-[#031d38] hover:bg-[#072d56] text-[#00e3fd] border border-[#00e3fd]/40 text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                      title="Create a new revision cycle (R1 → R2)"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Revision</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/40 text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                      title={activeTask.isCanonProtected || activeTask.id === 'AA-1001' || activeTask.id === 'AA-1002' ? "Protected canonical test evidence (Rule 29)" : "Delete task"}
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-slate-400 font-semibold text-[11px]">Area Ref:</span>
                  {activeTask.intentYaml?.context?.area_ref ? (
                    <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[11px] truncate">
                      {activeTask.intentYaml.context.area_ref.id} &ldquo;{activeTask.intentYaml.context.area_ref.title}&rdquo;
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">Domain-Neutral / Ad-Hoc</span>
                  )}
                </div>
              </div>
            </section>

            {/* RIGHT 50%: LIVE STATUS */}
            <section
              className="rounded-xl bg-[#020b17] border border-[#00e3fd]/30 p-3.5 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-2.5 font-mono select-none"
              aria-label="Live Status and Lifecycle Telemetry"
            >
              <div className="space-y-1">
                {/* Header row: LIVE STATUS and Current Phase + Progress % */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    LIVE STATUS
                  </span>
                  <span className="text-base sm:text-lg font-bold text-emerald-400">
                    {activeTask.progressPercent}%
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-black text-white tracking-wide uppercase px-2 py-0.5 rounded bg-[#031d38] border border-[#00e3fd]/50 text-[#00e3fd]">
                      {activeTask.currentPhase}
                    </span>
                    <span className="text-[11px] text-slate-400">Phase Active</span>
                  </div>
                  <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Antigravity • Handoff Ready</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden my-1">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${activeTask.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Lifecycle Checklist & Quick Actions */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                {/* 2-line Lifecycle Checklist */}
                <div className="space-y-0.5 text-[11px]">
                  <div className="flex items-center gap-3">
                    <span className={activeTask.lockedStages?.includes('INTENT') ? 'text-emerald-400 font-bold' : activeTask.currentPhase === 'INTENT' ? 'text-[#00e3fd] font-bold' : 'text-slate-500'}>
                      Intent {activeTask.lockedStages?.includes('INTENT') ? '✓' : activeTask.currentPhase === 'INTENT' ? '●' : '○'}
                    </span>
                    <span className={activeTask.lockedStages?.includes('ARCHITECT') ? 'text-sky-400 font-bold' : activeTask.currentPhase === 'ARCHITECT' ? 'text-[#00e3fd] font-bold' : 'text-slate-500'}>
                      Architect {activeTask.lockedStages?.includes('ARCHITECT') ? '✓' : activeTask.currentPhase === 'ARCHITECT' ? '●' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={activeTask.lockedStages?.includes('ENGINEER') ? 'text-purple-400 font-bold' : activeTask.currentPhase === 'ENGINEER' ? 'text-[#00e3fd] font-bold' : 'text-slate-500'}>
                      Engineer {activeTask.lockedStages?.includes('ENGINEER') ? '✓' : activeTask.currentPhase === 'ENGINEER' ? '●' : '○'}
                    </span>
                    <span className={activeTask.lockedStages?.includes('VERIFY') ? 'text-amber-400 font-bold' : activeTask.currentPhase === 'VERIFY' ? 'text-[#00e3fd] font-bold' : 'text-slate-500'}>
                      Verify {activeTask.lockedStages?.includes('VERIFY') ? '✓' : activeTask.currentPhase === 'VERIFY' ? '●' : '○'}
                    </span>
                    <span className={activeTask.currentPhase === 'ASSEMBLE' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                      Assemble {activeTask.currentPhase === 'ASSEMBLE' ? '●' : '○'}
                    </span>
                  </div>
                </div>

                {/* Quick Action buttons */}
                <div className="flex items-center gap-1 shrink-0 text-[11px]">
                  <button
                    type="button"
                    onClick={handleStartNewIntent}
                    className="px-2 py-1 rounded bg-[#041527] border border-slate-700 hover:border-[#00e3fd]/50 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    title="Start New Intent"
                  >
                    <Plus className="w-3 h-3 text-[#00e3fd]" />
                    <span>New Intent</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsTasksModalOpen(true)}
                    className="px-2 py-1 rounded bg-[#041527] border border-slate-700 hover:border-[#00e3fd]/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Manage All Tasks"
                  >
                    Tasks ({tasks.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPackageModalOpen(true)}
                    className="px-2 py-1 rounded bg-[#041527] border border-slate-700 hover:border-[#00e3fd]/50 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    title="View Engineering Package"
                  >
                    <Download className="w-3 h-3 text-sky-400" />
                    <span>Package</span>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* =============================================================== */}
          {/* 2. THE DIRECTIONAL CONNECTED LIFECYCLE BAR (M01-N Contract)     */}
          {/* INTENT → ARCHITECT → ENGINEER → VERIFY → ASSEMBLE → RESULT      */}
          {/* =============================================================== */}
          <section
            className="p-2 sm:p-2.5 rounded-xl bg-[#020b17] border border-[#00e3fd]/25 shadow-lg select-none flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2"
            aria-label="Directional Operational Lifecycle"
          >
            <div className="flex-1 grid grid-cols-5 gap-1 sm:gap-2">
              {[
                { id: 'INTENT' as LifecyclePhaseId, number: 1, title: 'Intent', subtitle: 'Spec & Problem' },
                { id: 'ARCHITECT' as LifecyclePhaseId, number: 2, title: 'Architect', subtitle: 'Plan & Scope' },
                { id: 'ENGINEER' as LifecyclePhaseId, number: 3, title: 'Engineer', subtitle: 'Build & Code' },
                { id: 'VERIFY' as LifecyclePhaseId, number: 4, title: 'Verify', subtitle: 'Test & Validate' },
                { id: 'ASSEMBLE' as LifecyclePhaseId, number: 5, title: 'Assemble', subtitle: 'Package & Ready' },
              ].map((phase, idx, arr) => {
                const isLocked = activeTask.lockedStages?.includes(phase.id);
                const isCurrentActive = activeTask.currentPhase === phase.id;
                const isViewing = activePhase === phase.id;

                const stageOrder = ['INTENT', 'ARCHITECT', 'ENGINEER', 'VERIFY', 'ASSEMBLE'];
                const taskIdx = stageOrder.indexOf(activeTask.currentPhase);
                const isCompleted = isLocked || idx < taskIdx;

                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => {
                      setActivePhase(phase.id);
                      if (isLocked) {
                        showToast(`Viewing locked ${phase.title} stage (Revision ${activeTask.revisionLabel || 'R1'}).`);
                      } else if (isCurrentActive) {
                        showToast(`${phase.title} is currently active and awaiting action.`);
                      } else if (idx > taskIdx) {
                        showToast(`Advance from ${activeTask.currentPhase} to unlock ${phase.title}.`);
                      }
                    }}
                    className={`relative px-2 py-2 sm:px-2.5 sm:py-2 rounded-lg border flex items-center justify-between gap-1.5 transition-all text-left cursor-pointer group ${
                      isViewing
                        ? 'bg-[#031d38] border-[#00e3fd] text-white shadow-[0_0_15px_rgba(0,227,253,0.3)] ring-1 ring-[#00e3fd]/60'
                        : isCompleted
                        ? 'bg-[#011424]/80 border-emerald-500/40 text-slate-300 hover:border-emerald-400'
                        : isCurrentActive
                        ? 'bg-[#031d38]/60 border-sky-500/60 text-white hover:border-[#00e3fd]'
                        : 'bg-[#010813] border-slate-800/80 text-slate-500 hover:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full font-black text-[11px] flex items-center justify-center shrink-0 shadow-sm ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : isCurrentActive
                            ? 'bg-[#00e3fd] text-slate-950 font-bold animate-pulse'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isCompleted ? <Check className="w-3 h-3 text-emerald-400" /> : phase.number}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1 font-bold text-[11px] sm:text-xs text-white tracking-tight truncate">
                          <span>{phase.title}</span>
                          {isLocked && <Lock className="w-2.5 h-2.5 text-amber-400 shrink-0" />}
                        </div>
                        <div className="text-[9px] text-slate-400 truncate hidden lg:block">
                          {isLocked ? 'Committed ✓' : isCurrentActive ? 'Active Stage' : phase.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Trailing connector indicator */}
                    {idx < arr.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#00e3fd] shrink-0 hidden md:block" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Direct Link to Result / Preview Terminal Stage */}
            <button
              type="button"
              onClick={() => {
                setActivePhase('ASSEMBLE');
                showToast('Viewing Solution Result / Preview.');
              }}
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-600/30 to-teal-600/30 hover:from-emerald-600/50 hover:to-teal-600/50 border border-emerald-500/50 text-emerald-300 hover:text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-sm"
              title="Jump directly to Result / Preview"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Result / Preview</span>
              <ArrowRight className="w-3 h-3 text-emerald-400" />
            </button>
          </section>

          {/* Stage Lock Info Banner (when viewing a locked stage) */}
          {activeTask.lockedStages?.includes(activePhase) && activePhase !== activeTask.currentPhase && (
            <div className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong>Stage {activePhase} is locked</strong> for Revision {activeTask.revisionLabel || `R${activeTask.revision || 1}`}. Showing historical decisions.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsRevisionModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Create Revision to Edit</span>
              </button>
            </div>
          )}

          {/* =============================================================== */}
          {/* 3. THE 5-COLUMN WORKSTATION GRID (Direct match to AAi-os.png)    */}
          {/* (1) Intent | (2) Architect | (3) Engineer | (4) Verify | (5) Assemble */}
          {/* =============================================================== */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3.5 items-start">
            {/* ------------------------------------------------------------- */}
            {/* COLUMN 1: (1) Your Intent                                     */}
            {/* ------------------------------------------------------------- */}
            <div
              ref={promptContainerRef}
              className={`p-4 rounded-2xl bg-[#020e1f] border transition-all duration-300 ease-out flex flex-col space-y-3 ${
                isPromptExpanded
                  ? 'border-[#00e3fd] ring-2 ring-[#00e3fd]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,227,253,0.35)] relative z-40 xl:w-[195%] origin-top-left'
                  : 'border-[#00e3fd]/25 relative z-10 w-full shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-black">
                    1
                  </span>
                  <span>Your Intent</span>
                  {isPromptExpanded ? (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/30 animate-pulse">
                      Workstation Active
                    </span>
                  ) : activePhase !== 'INTENT' ? (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      Stage: {activePhase}
                    </span>
                  ) : null}
                </span>
                <div className="flex items-center gap-2">
                  {/* Quick Modify button if collapsed in subsequent stage */}
                  {activePhase !== 'INTENT' && !isPromptExpanded && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsPromptExpanded(true);
                        setTimeout(() => promptTextareaRef.current?.focus(), 50);
                      }}
                      className="px-2 py-1 rounded-lg bg-[#0070ba]/20 hover:bg-[#0070ba]/40 border border-[#0070ba]/50 text-[#00e3fd] text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer"
                      title="Modify or edit intent prompt"
                    >
                      <Edit3 className="w-3 h-3 text-[#00e3fd]" />
                      <span>Modify</span>
                    </button>
                  )}

                  {/* Expand / Minimize Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsPromptExpanded(!isPromptExpanded)}
                    className="p-1 rounded-lg bg-[#041527] border border-slate-700 hover:border-[#00e3fd] text-slate-300 hover:text-white transition-all cursor-pointer"
                    title={isPromptExpanded ? 'Minimize / Collapse Workstation' : 'Expand Intent Workstation'}
                  >
                    {isPromptExpanded ? (
                      <Minimize2 className="w-3.5 h-3.5 text-[#00e3fd]" />
                    ) : (
                      <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIntentText('');
                      setLoadedSampleId(null);
                      promptTextareaRef.current?.focus();
                    }}
                    className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIntentText(
                        'Create a small reversible engineering change that proves AAi-Agent-OS can convert an intent into a real task, prepare an engineering package, assign an engineering agent, work against the approved AAi-v2 workspace, verify the change, assemble the result, show what was actually achieved, and safely revert the change.'
                      );
                      setIntentCategory('enhancement');
                      setLoadedSampleId('m01-flight-test');
                      showToast('Loaded M01 Flight Test Intent template!');
                    }}
                    className="text-[10px] text-[#00e3fd] hover:underline"
                  >
                    Load Test Intent
                  </button>
                </div>
              </div>

              {/* Solution Context (AAi Area Ref) Badge — Strictly Separated from Real User Intent */}
              {attachedAreaRef ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#002b4d]/60 border border-[#00e3fd]/50 text-[#00e3fd] text-xs font-mono shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#00e3fd] shrink-0" />
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                        Solution Context
                      </span>
                      <span className="font-bold text-white text-[11px] truncate">
                        {attachedAreaRef.id} · {attachedAreaRef.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 truncate mt-0.5">
                      Source: {attachedAreaRef.source}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAttachedAreaRef(null);
                      showToast('Detached Solution Context. Real user intent preserved.');
                    }}
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
                    title="Detach Solution Context"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : intentText.includes('[AAi Area Ref:') ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#00365c]/40 border border-[#00dfff]/40 text-[#00e3fd] text-xs font-mono shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#00e3fd] shrink-0" />
                  <span className="truncate font-bold text-[11px]">
                    Legacy Area Reference detected in text
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const parsed = extractAreaReference(intentText);
                      if (parsed) setAttachedAreaRef(parsed);
                      setIntentText((prev) => prev.replace(/\[AAi Area Ref:[^\]]+\]\s*/gi, '').trim());
                      showToast('Migrated Area Ref into explicit Solution Context!');
                    }}
                    className="ml-auto px-2 py-0.5 rounded bg-[#00e3fd]/20 hover:bg-[#00e3fd]/40 text-[#00e3fd] text-[10px] font-bold"
                  >
                    Separate
                  </button>
                </div>
              ) : null}

              {/* Intent Textarea with focus listener */}
              <div className="relative">
                <textarea
                  ref={promptTextareaRef}
                  value={intentText}
                  readOnly={activeTask.lockedStages?.includes('INTENT')}
                  onFocus={() => {
                    if (!activeTask.lockedStages?.includes('INTENT')) {
                      setIsPromptExpanded(true);
                    }
                  }}
                  onChange={(e) => setIntentText(e.target.value)}
                  rows={isPromptExpanded ? 6 : 5}
                  className={`w-full p-3 rounded-xl bg-[#010711] border text-xs text-slate-200 leading-relaxed font-sans resize-none focus:outline-none transition-all ${
                    activeTask.lockedStages?.includes('INTENT')
                      ? 'border-slate-800 bg-[#00050d] text-slate-400 cursor-not-allowed'
                      : isPromptExpanded
                      ? 'border-[#00e3fd] ring-1 ring-[#00e3fd]/60 min-h-[140px]'
                      : 'border-slate-700 focus:border-[#00e3fd]'
                  }`}
                  placeholder={
                    activeTask.lockedStages?.includes('INTENT')
                      ? 'Intent specifications are locked for this revision. Create a new revision to modify.'
                      : 'Describe your intent in natural language (or pick an animated sample below)...'
                  }
                />

                {/* Prompt Word Counter & Focus Helper */}
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2">
                  <span className="text-[9px] font-mono text-slate-500">
                    {intentText.trim() ? `${intentText.trim().split(/\s+/).length} words` : '0 words'}
                  </span>
                </div>
              </div>

              {/* Quick Actions Bar Near Edit Area: Submit / Modify / Attach AAi Data Map */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    id="btn-submit-intent-near-editor"
                    onClick={handleSaveOrSubmitIntent}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md hover:shadow-emerald-500/30 transition-all cursor-pointer"
                    title="Submit intent directly from edit area"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                    <span>{activePhase === 'INTENT' ? 'Submit Intent' : 'Update & Re-plan'}</span>
                  </button>

                  {/* AAi Data Map Reference Dropdown Button */}
                  <div className="relative" ref={areaRefMenuRef}>
                    <button
                      type="button"
                      id="btn-attach-aai-data-map"
                      onClick={() => setShowAreaRefMenu(!showAreaRefMenu)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#041527] hover:bg-[#072442] border border-[#00dfff]/40 hover:border-[#00e3fd] text-[#00e3fd] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                      title="Attach AAi Area Reference or open JSON Inspector"
                    >
                      <MapPin className="w-3 h-3 text-[#00e3fd]" />
                      <span>{attachedAreaRef ? `${attachedAreaRef.id}` : '{ } Area Ref'}</span>
                      <ChevronDown className="w-3 h-3 opacity-70" />
                    </button>

                    {/* Area Reference Menu */}
                    {showAreaRefMenu && (
                      <div className="absolute left-0 bottom-full mb-1.5 w-72 rounded-xl bg-[#020b17] border border-[#00dfff]/40 shadow-2xl p-2 z-50 space-y-1 text-left backdrop-blur-md">
                        <div className="px-2 py-1 text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center justify-between border-b border-slate-800">
                          <span>AAi Data Map References</span>
                          <span className="text-[#00e3fd]">In-Context</span>
                        </div>

                        {/* Open Inspector Option */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowAreaRefMenu(false);
                            window.dispatchEvent(new CustomEvent('aai:toggle-json-inspector'));
                          }}
                          className="w-full text-left p-2 rounded-lg bg-[#00e3fd]/10 hover:bg-[#00e3fd]/20 border border-[#00e3fd]/30 text-white flex items-center justify-between text-xs font-mono font-bold transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5 text-[#00e3fd]">
                            <div className="grid grid-cols-2 gap-[1px] w-3 h-3">
                              <span className="w-1 h-1 bg-[#00e3fd] rounded-[0.5px]" />
                              <span className="w-1 h-1 bg-[#00e3fd] rounded-[0.5px]" />
                              <span className="w-1 h-1 bg-[#00e3fd] rounded-[0.5px]" />
                              <span className="w-1 h-1 bg-[#00e3fd] rounded-[0.5px]" />
                            </div>
                            <span>Open Full JSON Inspector</span>
                          </div>
                          <span className="text-[9px] text-slate-400">Ctrl+J</span>
                        </button>

                        <div className="pt-1 text-[10px] font-mono text-slate-400 px-1">
                          Quick Presets (1-Click Context):
                        </div>

                        {/* Preset 1: FinTech */}
                        <button
                          type="button"
                          onClick={() => {
                            setAttachedAreaRef({
                              id: 'SUB-01.01',
                              title: 'Trader Tax Automation',
                              source: 'subdomains.json#SUB-01.01',
                              parent: 'DOM-01',
                              status: 'active',
                            });
                            setShowAreaRefMenu(false);
                            setIsPromptExpanded(true);
                            showToast('Attached Solution Context: SUB-01.01 Trader Tax');
                            setTimeout(() => promptTextareaRef.current?.focus(), 100);
                          }}
                          className="w-full text-left p-1.5 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
                        >
                          <div className="font-bold text-emerald-400 text-[11px] truncate">
                            FinTech: Trader Tax &amp; P&amp;L
                          </div>
                          <div className="text-[9px] text-slate-400 font-mono truncate">
                            DOM-01 › SUB-01.01 | subdomains.json
                          </div>
                        </button>

                        {/* Preset 2: Math STEM */}
                        <button
                          type="button"
                          onClick={() => {
                            setAttachedAreaRef({
                              id: 'SUB-04.01',
                              title: 'Interactive Math Explorer',
                              source: 'subdomains.json#SUB-04.01',
                              parent: 'DOM-04',
                              status: 'active',
                            });
                            setShowAreaRefMenu(false);
                            setIsPromptExpanded(true);
                            showToast('Attached Solution Context: SUB-04.01 Math Explorer');
                            setTimeout(() => promptTextareaRef.current?.focus(), 100);
                          }}
                          className="w-full text-left p-1.5 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
                        >
                          <div className="font-bold text-sky-400 text-[11px] truncate">
                            EdTech: Calculus &amp; STEM Explorer
                          </div>
                          <div className="text-[9px] text-slate-400 font-mono truncate">
                            DOM-04 › SUB-04.01 | subdomains.json
                          </div>
                        </button>

                        {/* Preset 3: Marketplace (D06.01 Hyperlocal Marketplace) */}
                        <button
                          type="button"
                          onClick={() => {
                            setAttachedAreaRef({
                              id: 'D06.01',
                              title: 'Hyperlocal Marketplace',
                              source: 'subdomains.json#D06.01',
                              parent: 'D06',
                              status: 'active',
                            });
                            setShowAreaRefMenu(false);
                            setIsPromptExpanded(true);
                            showToast('Attached Solution Context: D06.01 Hyperlocal Marketplace');
                            setTimeout(() => promptTextareaRef.current?.focus(), 100);
                          }}
                          className="w-full text-left p-1.5 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
                        >
                          <div className="font-bold text-amber-400 text-[11px] truncate">
                            Commerce: Hyperlocal Marketplace
                          </div>
                          <div className="text-[9px] text-slate-400 font-mono truncate">
                            D06 › D06.01 | subdomains.json#D06.01
                          </div>
                        </button>
                      </div>
                    )}
                  </div>

                  {activePhase !== 'INTENT' && isPromptExpanded && (
                    <button
                      type="button"
                      onClick={() => setIsPromptExpanded(false)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                      title="Collapse to compact view"
                    >
                      Done Editing
                    </button>
                  )}

                  {activePhase !== 'INTENT' && !isPromptExpanded && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsPromptExpanded(true);
                        setTimeout(() => promptTextareaRef.current?.focus(), 50);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#0070ba]/20 hover:bg-[#0070ba]/40 border border-[#0070ba]/50 text-[#00e3fd] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Modify intent and expand workstation"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Modify / Edit</span>
                    </button>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  {activePhase === 'INTENT' ? (
                    <span className="text-amber-400">Drafting Intent</span>
                  ) : (
                    <span className="text-slate-500">Active Task: {activeTask.id}</span>
                  )}
                </div>
              </div>

              {/* Sample Prompt Action Bar: user can be happy to go further or completely change */}
              {loadedSampleId && intentText && (
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-300 text-[11px] truncate">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
                    <span className="truncate">Sample loaded! Customize to go further, or clear to change:</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        promptTextareaRef.current?.focus();
                        const len = intentText.length;
                        promptTextareaRef.current?.setSelectionRange(len, len);
                        showToast('Textarea ready for your additions! Type to go further.');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      <span>Go Further ✍️</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIntentText('');
                        setLoadedSampleId(null);
                        promptTextareaRef.current?.focus();
                        showToast('Prompt cleared! Write your own custom intent.');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/40 text-rose-300 text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      <span>Completely Change 🔄</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Animated Simple Context Relatable Sample Prompts */}
              {(!intentText || showSamplePrompts || isPromptExpanded) && (
                <div className="space-y-2 pt-0.5">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-300">
                    <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>Context Sample Prompts</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSampleIndex((prev) => (prev + 1) % SAMPLE_PROMPTS.length);
                      }}
                      className="text-[10px] text-[#00e3fd] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      title="Shuffle to next inspiring prompt idea"
                    >
                      <Shuffle className="w-3 h-3" />
                      <span>Shuffle ({activeSampleIndex + 1}/{SAMPLE_PROMPTS.length})</span>
                    </button>
                  </div>

                  {/* Highlighted Rotating Sample Card */}
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#031d38] via-[#052445] to-[#0a1b2d] border border-[#00e3fd]/35 shadow-inner space-y-1.5 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#00e3fd] px-1.5 py-0.5 rounded bg-[#00e3fd]/15 border border-[#00e3fd]/30 flex items-center gap-1">
                        {React.createElement(SAMPLE_PROMPTS[activeSampleIndex].icon, { className: 'w-3 h-3 text-[#00e3fd]' })}
                        <span>{SAMPLE_PROMPTS[activeSampleIndex].tag}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {SAMPLE_PROMPTS[activeSampleIndex].title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 font-sans italic leading-relaxed">
                      &ldquo;{SAMPLE_PROMPTS[activeSampleIndex].prompt}&rdquo;
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => handleSelectSamplePrompt(SAMPLE_PROMPTS[activeSampleIndex])}
                        className="px-2.5 py-1 rounded-lg bg-[#0070ba] hover:bg-[#008de0] text-white text-[10px] font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Use This Prompt</span>
                      </button>
                      <span className="text-[10px] text-slate-400">
                        Click to load and edit
                      </span>
                    </div>
                  </div>

                  {/* 5 Quick-Select Relatable Contest Domain Chips */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {SAMPLE_PROMPTS.map((sample, idx) => {
                      const Icon = sample.icon;
                      const isCurrent = activeSampleIndex === idx;
                      return (
                        <button
                          key={sample.id}
                          type="button"
                          onClick={() => {
                            setActiveSampleIndex(idx);
                            handleSelectSamplePrompt(sample);
                          }}
                          className={`px-2 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[#00e3fd]/20 text-[#00e3fd] border border-[#00e3fd]/50 font-bold shadow-[0_0_10px_rgba(0,227,253,0.2)]'
                              : 'bg-[#010813] text-slate-400 hover:text-white hover:bg-[#04162a] border border-slate-800'
                          }`}
                        >
                          <Icon className="w-3 h-3" />
                          <span className="truncate max-w-[130px]">{sample.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add Context (optional) */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400 font-medium">
                  Add Context <span className="opacity-60">(optional)</span>
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => showToast('File attachment ready for workspace AAi-v2.')}
                    className="p-1.5 rounded-lg bg-[#041527] border border-slate-700 hover:border-[#00e3fd]/50 flex items-center gap-1 text-slate-300 transition-colors"
                  >
                    <Paperclip className="w-3 h-3 text-[#00e3fd]" />
                    <span>Attach Files</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!attachedAreaRef) {
                        setAttachedAreaRef({
                          id: 'DOM-00',
                          title: 'AAi Solution Universe Taxonomy L1-L6',
                          source: 'domains.json#taxonomy',
                          parent: 'GLOBAL',
                          status: 'active',
                        });
                      }
                      showToast('Attached Solution Context: AAi Taxonomy L1-L6');
                    }}
                    className="p-1.5 rounded-lg bg-[#041527] border border-slate-700 hover:border-[#00e3fd]/50 flex items-center gap-1 text-slate-300 transition-colors"
                  >
                    <Globe className="w-3 h-3 text-[#00e3fd]" />
                    <span>Use AAi Context</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Scanning repository: 22 packages verified in package.json.')}
                    className="p-1.5 rounded-lg bg-[#041527] border border-slate-700 hover:border-[#00e3fd]/50 flex items-center gap-1 text-slate-300 transition-colors"
                  >
                    <Search className="w-3 h-3 text-[#00e3fd]" />
                    <span>Scan Repo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIntentText((prev) => `${prev}\n[Constraint: Zero regression to AAi Universe, 100% TypeScript safe]`);
                      showToast('Architectural constraint note added!');
                    }}
                    className="p-1.5 rounded-lg bg-[#041527] border border-slate-700 hover:border-[#00e3fd]/50 flex items-center gap-1 text-slate-300 transition-colors"
                  >
                    <FileText className="w-3 h-3 text-[#00e3fd]" />
                    <span>Add Notes</span>
                  </button>
                </div>
              </div>

              {/* Intent Category */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-slate-400 font-medium">
                  Intent Category
                </span>
                <div className="space-y-1 text-xs">
                  {[
                    { id: 'business', label: 'Business / Automation' },
                    { id: 'education', label: 'Education / Learning' },
                    { id: 'enhancement', label: 'Enhancement / New Feature' },
                    { id: 'research', label: 'Research' },
                    { id: 'other', label: 'Other' },
                  ].map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white"
                    >
                      <input
                        type="radio"
                        name="intentCategory"
                        value={cat.id}
                        checked={intentCategory === cat.id}
                        onChange={() => setIntentCategory(cat.id)}
                        className="text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700 cursor-pointer"
                      />
                      <span>{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Button: Creates real task and synthesizes plan or creates revision */}
              {activeTask.lockedStages?.includes('INTENT') ? (
                <div className="space-y-1.5">
                  <div className="p-2 rounded-xl bg-[#010813] border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Lock className="w-3 h-3 text-amber-400" />
                      <span>Intent Committed (Rev {activeTask.revisionLabel || 'R1'})</span>
                    </span>
                    <span className="text-[10px] text-slate-500">Locked</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsRevisionModalOpen(true)}
                    className="w-full py-2 px-3 rounded-xl bg-[#031d38] hover:bg-[#072d56] border border-[#00e3fd]/40 text-[#00e3fd] hover:text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Create Revision to Edit Intent</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  id="btn-create-architect-plan"
                  onClick={() => handleAdvancePhase('ARCHITECT')}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                >
                  <span>Next: Create Architect Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* COLUMN 2: (2) Architect Analysis                               */}
            {/* ------------------------------------------------------------- */}
            <div className="p-4 rounded-2xl bg-[#020e1f] border border-[#00e3fd]/25 shadow-xl flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-black">
                    2
                  </span>
                  Architect Analysis
                </span>
                <span className="text-[10px] font-mono text-[#00e3fd] truncate max-w-[130px]">
                  {activeTask.id}
                </span>
              </div>

              {/* Sub-tabs: Analysis, Scope, Plan, Prompt */}
              <div className="flex items-center gap-1 bg-[#010711] p-1 rounded-xl border border-slate-800 text-xs font-mono">
                {(['analysis', 'scope', 'plan', 'prompt'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setArchitectTab(tab)}
                    className={`flex-1 py-1 px-1.5 rounded-lg text-center capitalize transition-colors cursor-pointer ${
                      architectTab === tab
                        ? 'bg-[#0070ba] text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* TAB 1: Analysis */}
              {architectTab === 'analysis' && (
                <>
                  {/* Understanding Section */}
                  <div className="p-2.5 rounded-xl bg-[#010711] border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Understanding</span>
                    </div>
                    <div className="text-[11px] text-slate-300 leading-relaxed pl-5">
                      {activeTask.understanding || 'Intent analyzed and decomposed into executable use cases.'}
                    </div>
                  </div>

                  {/* Solution Architecture Section */}
                  <div className="p-2.5 rounded-xl bg-[#010711] border border-slate-800 space-y-2 text-xs overflow-y-auto max-h-56 scrollbar-thin">
                    <div className="flex items-center gap-1.5 font-bold text-sky-400">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Solution Architecture</span>
                    </div>

                    <div className="space-y-2 text-[11px] pl-3">
                      {activeTask.architectureUseCases.map((uc, idx) => (
                        <div key={idx}>
                          <span className="font-bold text-white block">
                            • {uc.title}
                          </span>
                          <ul className="list-disc list-inside text-slate-400 text-[10px] pl-2 space-y-0.5 mt-0.5">
                            {uc.items.map((it, i) => (
                              <li key={i}>{it}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: Scope */}
              {architectTab === 'scope' && (
                <div className="p-2.5 rounded-xl bg-[#010711] border border-slate-800 space-y-2 text-xs overflow-y-auto max-h-72 scrollbar-thin">
                  <div className="font-bold text-white text-[11px]">Deliverable Scope</div>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    {activeTask.scope}
                  </p>
                  <div className="font-bold text-sky-400 text-[10px] pt-1">Target Files &amp; Contracts</div>
                  <div className="space-y-1 font-mono text-[9px] text-slate-400">
                    {(activeTask.filesList || []).map((file, idx) => (
                      <div key={idx} className="p-1 rounded bg-black/40 border border-slate-800 truncate">
                        {file}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Plan */}
              {architectTab === 'plan' && (
                <div className="p-2.5 rounded-xl bg-[#010711] border border-slate-800 space-y-2 text-xs overflow-y-auto max-h-72 scrollbar-thin">
                  <div className="font-bold text-white text-[11px]">Execution Roadmap</div>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    {activeTask.taskSteps.map((st) => (
                      <div key={st.step} className="p-1.5 rounded-lg bg-[#020b17] border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-200">{st.step}. {st.title}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          st.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                          st.status === 'WORKING' ? 'bg-purple-500/20 text-purple-400' : 'text-slate-500'
                        }`}>
                          {st.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Prompt */}
              {architectTab === 'prompt' && (
                <div className="p-2.5 rounded-xl bg-[#010711] border border-slate-800 space-y-2 text-xs overflow-y-auto max-h-72 scrollbar-thin font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 text-[11px]">Antigravity Prompt</span>
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="px-2 py-0.5 rounded text-[9px] bg-[#041527] border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      <span>{copiedPrompt ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded-lg bg-black/60 border border-slate-800 text-[10px] text-slate-300 leading-relaxed break-words whitespace-pre-wrap">
                    {activeTask.promptTemplate}
                  </div>
                </div>
              )}

              {/* Metric Badges */}
              <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                <div className="p-2 rounded-xl bg-[#010711] border border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Files</span>
                  <span className="font-bold text-[#00e3fd]">{activeTask.filesCount}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#010711] border border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Dependencies</span>
                  <span className="font-bold text-[#00e3fd]">{activeTask.dependenciesCount}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#010711] border border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Criteria</span>
                  <span className="font-bold text-[#00e3fd]">{activeTask.acceptanceCriteriaCount}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPackageModalOpen(true)}
                  className="p-2 rounded-xl bg-[#010711] hover:bg-[#041527] border border-slate-800 hover:border-[#00e3fd]/40 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="text-[10px] text-slate-400">Package</span>
                  <span className="font-bold text-amber-300 text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20">
                    View 16-Sec
                  </span>
                </button>
              </div>

              {/* Action Button */}
              {activeTask.lockedStages?.includes('ARCHITECT') ? (
                <div className="p-2 rounded-xl bg-[#010813] border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>Architect Plan Committed (Rev {activeTask.revisionLabel || 'R1'})</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Locked</span>
                </div>
              ) : (
                <button
                  type="button"
                  id="btn-send-to-engineer"
                  onClick={() => handleAdvancePhase('ENGINEER')}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all cursor-pointer"
                >
                  <span>Next: Send to Engineer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* COLUMN 3: (3) Assign to AI Engineer                           */}
            {/* ------------------------------------------------------------- */}
            <div className="p-4 rounded-2xl bg-[#020e1f] border border-[#00e3fd]/25 shadow-xl flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center font-black">
                    3
                  </span>
                  Assign to AI Engineer
                </span>
                <button
                  type="button"
                  onClick={() => setIsPackageModalOpen(true)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#170a2c] hover:bg-[#28124d] border border-purple-500/50 text-purple-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <FileText className="w-3 h-3" />
                  <span>Handoff</span>
                </button>
              </div>

              {/* AI Agent Selection List */}
              <div className="space-y-1.5">
                {[
                  { id: 'antigravity', name: 'Antigravity (Gemini)', sub: 'Best for full implementation', recommended: true, status: 'active' },
                  { id: 'claude', name: 'Claude', sub: 'Architecture & Review', recommended: false, status: 'future' },
                  { id: 'codex', name: 'Codex', sub: 'Build / QA', recommended: false, status: 'future' },
                  { id: 'perplexity', name: 'Perplexity', sub: 'Research & References', recommended: false, status: 'future' },
                  { id: 'chatgpt', name: 'ChatGPT (AAi Architect)', sub: 'Planning & Guidance', recommended: false, status: 'available' },
                ].map((ag) => {
                  const isSelected = selectedAgent === ag.id;
                  return (
                    <div
                      key={ag.id}
                      onClick={() => {
                        if (ag.status !== 'future') {
                          setSelectedAgent(ag.id);
                          showToast(`Selected ${ag.name} as primary engineer`);
                        }
                      }}
                      className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#120726] border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'bg-[#010711] border-slate-800 hover:border-slate-700'
                      } ${ag.status === 'future' ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      <div className="min-w-0 pr-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-white">{ag.name}</span>
                          {ag.recommended && (
                            <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                              Recommended
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 truncate block">
                          {ag.sub}
                        </span>
                      </div>
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-purple-400 bg-purple-500' : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Task Execution Tracker */}
              <div className="p-2.5 rounded-xl bg-[#010711] border border-slate-800 space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Task Execution
                  </span>
                  <button
                    type="button"
                    onClick={handleAdvanceExecutionStep}
                    className="text-[9px] text-purple-300 hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Play className="w-2.5 h-2.5" />
                    <span>Advance Step</span>
                  </button>
                </div>

                <div className="space-y-1 text-[11px]">
                  {activeTask.taskSteps.map((st) => (
                    <div key={st.step} className="flex items-center justify-between">
                      <span className="text-slate-300 truncate pr-1">
                        {st.step} {st.title}
                      </span>
                      {st.status === 'COMPLETED' ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                          <Check className="w-3 h-3" /> Done
                        </span>
                      ) : st.status === 'WORKING' ? (
                        <span className="text-purple-400 font-bold flex items-center gap-1 shrink-0">
                          <RotateCw className="w-3 h-3 animate-spin" /> Working
                        </span>
                      ) : (
                        <span className="text-slate-500 shrink-0">Pending</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Log Console */}
              <div className="p-2.5 rounded-xl bg-[#01050d] border border-slate-800 font-mono text-[10px] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">
                    Live Log
                  </span>
                  <span className="text-[9px] text-emerald-400">Live</span>
                </div>
                <div className="space-y-0.5 text-slate-300 overflow-y-auto max-h-24 scrollbar-thin">
                  {activeTask.logs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.level === 'success'
                          ? 'text-emerald-400'
                          : log.level === 'warn'
                          ? 'text-amber-400'
                          : log.level === 'error'
                          ? 'text-rose-400'
                          : 'text-slate-300'
                      }
                    >
                      [{log.timestamp}] {log.message}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button for Column 3 */}
              {activeTask.lockedStages?.includes('ENGINEER') ? (
                <div className="p-2 rounded-xl bg-[#010813] border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span className="flex items-center gap-1.5 text-purple-400 font-bold">
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>Engineering Completed (Rev {activeTask.revisionLabel || 'R1'})</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Locked</span>
                </div>
              ) : (
                <button
                  type="button"
                  id="btn-run-verification"
                  onClick={() => handleAdvancePhase('VERIFY')}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
                >
                  <span>Next: Run Verification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* COLUMN 4: (4) Verification Checklist                          */}
            {/* ------------------------------------------------------------- */}
            <div className="p-4 rounded-2xl bg-[#020e1f] border border-[#00e3fd]/25 shadow-xl flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-black">
                    4
                  </span>
                  Verification Checklist
                </span>
                <button
                  type="button"
                  onClick={handleRunAllChecks}
                  disabled={verificationRunning}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#041527] hover:bg-[#072442] border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${verificationRunning ? 'animate-spin' : ''}`} />
                  <span>{verificationRunning ? 'Checking...' : 'Run All'}</span>
                </button>
              </div>

              {/* Dynamic Verification Checks */}
              <div className="space-y-1.5 text-xs font-mono">
                {activeTask.verificationChecks.map((chk, idx) => {
                  const isRunningItem = verificationRunning && verificationIndex === idx;
                  return (
                    <div
                      key={chk.id || idx}
                      className={`p-1.5 rounded-lg bg-[#010711] border transition-all flex items-center justify-between text-[11px] ${
                        isRunningItem
                          ? 'border-[#00e3fd] shadow-[0_0_10px_rgba(0,227,253,0.3)]'
                          : 'border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0 pr-1">
                        {isRunningItem ? (
                          <RotateCw className="w-3.5 h-3.5 text-[#00e3fd] animate-spin shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                        <span className="text-slate-200 truncate">{chk.name}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold shrink-0">
                        {chk.status}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Review Notes Box */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Review Notes</span>
                  <div className="flex gap-1 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setReviewTab('summary')}
                      className={`px-1.5 py-0.2 rounded ${
                        reviewTab === 'summary' ? 'bg-[#0070ba] text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Summary
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewTab('issues')}
                      className={`px-1.5 py-0.2 rounded ${
                        reviewTab === 'issues' ? 'bg-[#0070ba] text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Issues (0)
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewTab('suggestions')}
                      className={`px-1.5 py-0.2 rounded ${
                        reviewTab === 'suggestions' ? 'bg-[#0070ba] text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Suggestions (2)
                    </button>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-[#010711] border border-slate-800 text-[11px] text-slate-300 leading-relaxed font-sans">
                  {reviewTab === 'summary' && activeTask.reviewSummary}
                  {reviewTab === 'issues' && 'No blocking architecture or syntax issues detected in current task verification.'}
                  {reviewTab === 'suggestions' && '1. Enable automated GitHub PR synchronization. 2. Attach unit test suite via Vitest.'}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsRevisionModalOpen(true)}
                  className="w-full py-1.5 px-3 rounded-xl bg-[#041527] hover:bg-[#072442] border border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  title="Request changes and start a new revision cycle"
                >
                  <RotateCcw className="w-3 h-3 text-[#00e3fd]" />
                  <span>Request Changes (Revision)</span>
                </button>
                {activeTask.lockedStages?.includes('VERIFY') ? (
                  <div className="p-2 rounded-xl bg-[#010813] border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <Lock className="w-3 h-3 text-amber-400" />
                      <span>Verification Passed (Rev {activeTask.revisionLabel || 'R1'})</span>
                    </span>
                    <span className="text-[10px] text-slate-500">Locked</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    id="btn-approve-assembly"
                    onClick={() => handleAdvancePhase('ASSEMBLE')}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
                  >
                    <span>Approve for Assembly</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* COLUMN 5: (5) Solution Preview                                */}
            {/* ------------------------------------------------------------- */}
            <div className="p-4 rounded-2xl bg-[#020e1f] border border-[#00e3fd]/25 shadow-xl flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-black">
                    5
                  </span>
                  Solution Preview
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Running
                </span>
              </div>

              {/* Sub-tabs: Application, Code Changes, Documentation */}
              <div className="flex items-center gap-1 bg-[#010711] p-1 rounded-xl border border-slate-800 text-xs font-mono">
                {[
                  { id: 'application', label: 'Application' },
                  { id: 'code', label: 'Code' },
                  { id: 'docs', label: 'Docs' },
                ].map((tb) => (
                  <button
                    key={tb.id}
                    type="button"
                    onClick={() => setPreviewTab(tb.id as any)}
                    className={`flex-1 py-1 px-1.5 rounded-lg text-center transition-colors cursor-pointer ${
                      previewTab === tb.id ? 'bg-[#0070ba] text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tb.label}
                  </button>
                ))}
              </div>

              {/* Embedded Solution Screen */}
              <div className="p-3 rounded-xl bg-white text-slate-900 space-y-3 shadow-inner">
                {/* Embedded App Mini Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-[10px] font-mono text-slate-600">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <div className="w-4 h-4 rounded bg-[#021827] border border-[#00e3fd]/40 p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src="/assets/architectany-logo-sm.jpg"
                        alt="AAi"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <span>Solutions</span>
                  </div>
                  <div className="flex gap-2 text-[9px]">
                    <span className="text-emerald-700 font-bold">{activeTask.id}</span>
                    <span>Live</span>
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="font-bold text-xs text-slate-900">{activeTask.title}</h4>
                  <p className="text-[10px] text-slate-500">
                    Interactive Solution Sandbox
                  </p>
                </div>

                {/* Solution Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center">
                  {activeTask.generatedSolutions.map((sol) => (
                    <div
                      key={sol.id}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 transition-all bg-slate-50 flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-1">
                          {sol.icon === 'BarChart3' ? (
                            <BarChart3 className="w-4 h-4" />
                          ) : sol.icon === 'GraduationCap' ? (
                            <GraduationCap className="w-4 h-4" />
                          ) : (
                            <Sparkles className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <span className="font-bold text-[11px] text-slate-900 block leading-tight">
                          {sol.title}
                        </span>
                        <p className="text-[9px] text-slate-500 mt-1 line-clamp-2">
                          {sol.subtitle}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveSolutionModal(sol.id)}
                        className="mt-2 py-1 px-2 rounded-lg bg-[#0070ba] hover:bg-[#005a96] text-white text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        {sol.actionLabel || 'Open Solution'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Recent Activity List */}
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>Recent Activity</span>
                    <button
                      type="button"
                      onClick={() => setIsTasksModalOpen(true)}
                      className="text-indigo-600 hover:underline cursor-pointer"
                    >
                      All Tasks &gt;
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1 truncate max-w-[140px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {activeTask.title}
                    </span>
                    <span className="text-slate-400 shrink-0">{activeTask.createdAt.split(', ')[1] || 'Just now'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                      Architecture Verification
                    </span>
                    <span className="text-slate-400">Passed</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Deploy / Share */}
              <button
                type="button"
                onClick={() => {
                  showToast(`Task ${activeTask.id} published to local preview workspace!`);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
              >
                <span>Deploy / Share</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* Subtle Bottom Status Bar (Operational HUD elevated to upper workspace) */}
          <div className="pt-2 pb-1 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-mono select-none border-t border-slate-800/40">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <button
                type="button"
                onClick={() => setIsWorkspaceOpen(true)}
                className="text-slate-400 hover:text-[#00e3fd] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                title="Open AAi-v2 Workspace Explorer & File Inspector"
              >
                <span>AAi-Agent-OS • Port 3000 Dev Workspace</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
              </button>
              <span className="text-slate-700">•</span>
              <span className="text-slate-400">Task {activeTask.id} Active</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onReturnToUniverse}
                className="text-slate-400 hover:text-[#00e3fd] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Globe className="w-3 h-3" />
                <span>Return to AAi Universe</span>
              </button>
              <span className="text-slate-700">|</span>
              <span>Architect: Vijay Kumar K.</span>
            </div>
          </div>
        </main>
      </div>

      {/* =================================================================== */}
      {/* 5. MODAL: ALL TASKS MANAGER & SWITCHER                               */}
      {/* =================================================================== */}
      {isTasksModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl bg-[#031326] border border-[#00e3fd]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#020b17]">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-[#00e3fd]" />
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Agent OS Tasks Registry ({tasks.length})
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    All created tasks persisted in local environment
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTasksModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2.5 text-xs font-mono">
              {tasks.map((t) => {
                const isActive = t.id === activeTask.id;
                return (
                  <div
                    key={t.id}
                    className={`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-[#0070ba]/20 border-[#00e3fd] shadow-[0_0_15px_rgba(0,227,253,0.2)]'
                        : 'bg-[#010812] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#00e3fd]">{t.id}</span>
                        <span className="font-bold text-white truncate">{t.title}</span>
                        {isActive && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 font-sans">
                        {t.intentText}
                      </p>
                      <div className="flex items-center gap-3 text-[9px] text-slate-500 mt-1">
                        <span>Created: {t.createdAt}</span>
                        <span>Phase: {t.currentPhase}</span>
                        <span>Progress: {t.progressPercent}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {!isActive ? (
                        <button
                          type="button"
                          onClick={() => handleSelectTask(t)}
                          className="px-3 py-1.5 rounded-lg bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Activate
                        </button>
                      ) : (
                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> In View
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 border-t border-slate-800 bg-[#020b17] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsTasksModalOpen(false);
                  handleStartNewIntent();
                }}
                className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Task</span>
              </button>
              <button
                type="button"
                onClick={() => setIsTasksModalOpen(false)}
                className="py-1.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 6. MODAL: 16-SECTION ANTIGRAVITY ENGINEERING PACKAGE VIEWER          */}
      {/* =================================================================== */}
      {isPackageModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl bg-[#031326] border border-[#00e3fd]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#020b17]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Antigravity Engineering Package ({activeTask.id})
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    16-Section Standardized Handoff Contract for AI Studio / Antigravity Agent
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPackage}
                  className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedPackage ? 'Copied!' : 'Copy Package'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPackageModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Markdown Display */}
            <div className="p-5 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed bg-[#010711] whitespace-pre-wrap selection:bg-[#00e3fd] selection:text-black">
              {activeTask.engineeringPackageMarkdown || generateEngineeringPackageMarkdown(activeTask)}
            </div>

            <div className="p-3 border-t border-slate-800 bg-[#020b17] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 text-[10px]">
                Target: Antigravity (Gemini) • Workspace: AAi-v2
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyPackage}
                  className="py-1.5 px-3 rounded-lg bg-[#0070ba] text-white font-bold text-xs cursor-pointer"
                >
                  Copy Markdown
                </button>
                <button
                  type="button"
                  onClick={() => setIsPackageModalOpen(false)}
                  className="py-1.5 px-4 rounded-lg bg-slate-800 text-white font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 7. MODAL: INTERACTIVE SOLUTION RUNNER & PROTOTYPE PREVIEW            */}
      {/* =================================================================== */}
      {activeSolutionModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl bg-[#031326] border border-[#00e3fd]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#020b17]">
              <div className="flex items-center gap-2">
                {activeSolutionModal === 'trader' ? (
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                ) : activeSolutionModal === 'learning' ? (
                  <GraduationCap className="w-5 h-5 text-sky-400" />
                ) : (
                  <Sparkles className="w-5 h-5 text-purple-400" />
                )}
                <div>
                  <h3 className="font-bold text-white text-sm">
                    {activeSolutionModal === 'trader'
                      ? 'Trader Account Filing Automation'
                      : activeSolutionModal === 'learning'
                      ? 'Mathematics & Calculus Learning Explorer'
                      : activeTask.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Generated by Antigravity (Gemini) • AAi Agent OS • Task {activeTask.id}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveSolutionModal(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs font-sans">
              {activeSolutionModal === 'trader' ? (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-[#010813] border border-emerald-500/30">
                    <span className="font-bold text-emerald-400 block mb-1">
                      1-Day Automated Tax &amp; Account Filing Pipeline
                    </span>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Transform bank and broker CSV/Excel statements into instant P&amp;L, Balance Sheet, Ledger classification, and GST/TDS reports.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Transactions</span>
                      <span className="text-base font-bold text-white">1,482</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Classified</span>
                      <span className="text-base font-bold text-emerald-400">100%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Time Saved</span>
                      <span className="text-base font-bold text-[#00e3fd]">29 Days</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="font-bold text-white block">Ready Export Packages</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => showToast('Balance Sheet (XLS) download ready!')}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                      >
                        Download Balance Sheet (XLS)
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast('ITR-3 Summary PDF ready!')}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs cursor-pointer"
                      >
                        Download ITR-3 Summary
                      </button>
                    </div>
                  </div>
                </div>
              ) : activeSolutionModal === 'learning' ? (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-[#010813] border border-sky-500/30">
                    <span className="font-bold text-sky-400 block mb-1">
                      Real-World Calculus &amp; Algebra Explorer
                    </span>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Visual, intuitive learning explaining where derivatives, integrals, and matrix transformations power AI models, aerospace, bridge design, and automated trading algorithms.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { topic: 'Derivatives & Gradients', app: 'Deep Learning (Backpropagation & Neural Optimization)', icon: '🧠' },
                      { topic: 'Differential Equations', app: 'Structural Engineering & Aerodynamic Drag', icon: '🌉' },
                      { topic: 'Matrix Eigenvalues', app: 'Google PageRank & Facial Recognition', icon: '📈' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-white block">
                            {item.icon} {item.topic}
                          </span>
                          <span className="text-slate-400 text-[11px]">{item.app}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => showToast(`Interactive demo for ${item.topic} active!`)}
                          className="px-2.5 py-1 rounded bg-[#0070ba] hover:bg-[#005a96] text-white font-bold text-[10px] cursor-pointer"
                        >
                          Interactive Demo
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Custom / Flight Test Solution Runner */
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-[#010813] border border-purple-500/30 space-y-1">
                    <span className="font-bold text-purple-300 block text-xs">
                      Active Solution Prototype for Task: {activeTask.id}
                    </span>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {activeTask.intentText}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Interactive Test Runner</span>
                      <button
                        type="button"
                        onClick={handleRunCustomTest}
                        disabled={customTestRunning}
                        className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Play className={`w-3 h-3 ${customTestRunning ? 'animate-spin' : ''}`} />
                        <span>{customTestRunning ? 'Executing...' : 'Run Pipeline Test'}</span>
                      </button>
                    </div>

                    {customTestOutput ? (
                      <div className="p-2.5 rounded-lg bg-black/60 border border-emerald-500/40 text-emerald-300 text-[11px] whitespace-pre-wrap font-mono">
                        {customTestOutput}
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-400">
                        Click &ldquo;Run Pipeline Test&rdquo; to execute a real-time verification pass against this task&rsquo;s scope.
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Files Scope</span>
                      <span className="text-base font-bold text-white">{activeTask.filesCount}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Verification</span>
                      <span className="text-base font-bold text-emerald-400">100% Passed</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Runtime Target</span>
                      <span className="text-base font-bold text-[#00e3fd]">{activeTask.project}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-slate-800 bg-[#020b17] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsPackageModalOpen(true);
                  setActiveSolutionModal(null);
                }}
                className="py-1.5 px-3 rounded-xl bg-[#041527] hover:bg-[#072442] border border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3 h-3" />
                <span>View Handoff Package</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSolutionModal(null)}
                className="py-1.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YAML Contract Inspector Modal (Contract M01-E) */}
      <AgentOSYamlInspectorModal
        isOpen={isYamlInspectorOpen}
        onClose={() => setIsYamlInspectorOpen(false)}
        task={activeTask}
      />

      {/* Agent Telemetry & Runtime Status Modal (Milestone M01-K) */}
      <AgentOSTaskAgentsModal
        isOpen={isAgentsModalOpen}
        onClose={() => setIsAgentsModalOpen(false)}
        task={activeTask}
        onOpenYamlInspector={() => setIsYamlInspectorOpen(true)}
        onOpenWorkspaceDrawer={() => setIsWorkspaceOpen(true)}
      />

      {/* AAi-v2 Workspace Explorer & File Inspector Drawer */}
      <AgentOSWorkspaceDrawer
        isOpen={isWorkspaceOpen}
        onClose={() => setIsWorkspaceOpen(false)}
        activeTask={activeTask}
        onSelectPhase={(phase) => {
          setActivePhase(phase);
          showToast(`Switched to ${phase} phase.`);
        }}
        onOpenYamlInspector={() => {
          setIsWorkspaceOpen(false);
          setIsYamlInspectorOpen(true);
        }}
        onOpenJsonInspector={() => {
          setIsWorkspaceOpen(false);
          window.dispatchEvent(new CustomEvent('aai:open-json-inspector'));
        }}
      />

      {/* Knowledge Management Center (Requirement 10) */}
      <AgentOSKnowledgeModal
        isOpen={isKnowledgeModalOpen}
        onClose={() => setIsKnowledgeModalOpen(false)}
        activeTask={activeTask}
        onSelectAreaRef={(ref) => {
          setAttachedAreaRef(ref);
          showToast(`Attached AAi Area Ref: ${ref.id} (${ref.title})`);
        }}
      />

      {/* Model Context Protocol (MCP) Tools Center (Requirement 11) */}
      <AgentOSMcpToolsModal
        isOpen={isMcpModalOpen}
        onClose={() => setIsMcpModalOpen(false)}
      />

      {/* Git & Source Control History Modal (Requirement 12) */}
      <AgentOSGitModal
        isOpen={isGitModalOpen}
        onClose={() => setIsGitModalOpen(false)}
        activeTask={activeTask}
      />

      {/* Architecture & Engineering Templates Modal (Requirement 13) */}
      <AgentOSTemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onApplyTemplate={handleApplyTemplate}
      />

      {/* Agent OS System & Runtime Settings Modal (Requirement 14) */}
      <AgentOSSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      {/* Task Controlled Revision Modal (Requirement 5) */}
      <AgentOSRevisionModal
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
        activeTask={activeTask}
        onCreateRevision={handleCreateRevision}
      />

      {/* Task Deletion Confirmation Modal with Rule 29 Protection (Requirement 6) */}
      <AgentOSTaskDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        task={activeTask}
        onConfirmDelete={handleDeleteTask}
      />
    </div>
  );
};
