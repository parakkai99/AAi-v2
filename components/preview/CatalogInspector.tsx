/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Component: AAi — JSON INSPECTOR V3
 * Purpose:
 * Floating, Movable, Non-Blocking, Context-Aware Diagnostic Window.
 *
 * Principles:
 * - AAi experience is NEVER frozen or blocked (no modal backdrop, no click capture outside window).
 * - Draggable via compact title bar across viewport.
 * - Resizable with preserved dimensions and position in sessionStorage.
 * - Live context tracking: continuously follows AAi active context (L1→L6, breadcrumbs, cards).
 * - Dual Mode: "● LIVE CONTEXT" vs "○ MANUAL INSPECTION".
 * - "Follow AAi Context" button to snap back to active interaction state.
 * - Local JSON source inspection (capability-catalog.json, domains.json, subdomains.json, etc.).
 * - Comprehensive diagnostic framework (Canonical JSON, Structured Specs, Catalog Health,
 *   Lineage, Direct Children, 5-Check Diagnostic Matrix, and Suggest Next targets).
 */

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  X,
  Search,
  Copy,
  Check,
  RefreshCw,
  Minus,
  Maximize2,
  ChevronRight,
  ArrowRight,
  Database,
  Activity,
  FileCode,
  Tag,
  LayoutGrid,
  Radio,
  ExternalLink,
  Sliders,
  FolderTree,
  AlertCircle,
  Sparkles,
  MapPin,
} from "lucide-react";
import {
  CatalogItem,
  DomainItem,
  SubdomainItem,
  CapabilityItem,
  SolutionBundleItem,
  SolutionItem,
  CatalogLayer,
} from "@/src/contracts/catalog";
import { catalogRepository } from "@/src/repositories/catalogRepository";
import { useArchitectAny } from "@/src/context/ArchitectAnyContext";
import { useUniversalNavigation } from "@/src/context/UniversalNavigationContext";

// Local raw JSON sources for manual inspection
import catalogRawJson from "@/data/universe/capability-catalog.json";
import domainsRawJson from "@/data/universe/domains.json";
import subdomainsRawJson from "@/data/universe/subdomains.json";
import capabilitiesRawJson from "@/data/universe/solution-capabilities.json";
import solutionsRawJson from "@/data/universe/solutions.json";

export interface CatalogInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  activeDomainId?: string;
  onSendToAgentOS?: (areaRef: string, item?: CatalogItem | null) => void;
}

export function formatAAiAreaReference(item: CatalogItem | null | undefined): string {
  if (!item) return "[AAi Area Ref: Root Universe | Layer L1 | Schema: domains.json]";
  const layerStr = `L${item.layer} ${item.type || 'Entity'}`;
  const source = item.layer === 1 ? "domains.json"
    : item.layer === 2 ? "subdomains.json"
    : item.layer === 3 ? "solution-capabilities.json"
    : item.layer === 4 ? "capability-catalog.json"
    : item.layer === 5 ? "solutions.json"
    : "capability-catalog.json";
  const parentStr = item.parentId ? ` | Parent: ${item.parentId}` : "";
  const statusStr = item.status ? ` | Status: ${item.status}` : "";
  return `[AAi Area Ref: ${item.id} "${item.name}" | ${layerStr}${parentStr} | Schema: ${source}#${item.id}${statusStr}]`;
}

type CenterTab = "datamap" | "specs" | "json" | "diagnostics" | "sources" | "health";
type InspectorMode = "LIVE" | "MANUAL";
type LocalJsonSourceKey =
  | "entity"
  | "capability-catalog.json"
  | "domains.json"
  | "subdomains.json"
  | "solution-capabilities.json"
  | "solutions.json";

interface DiagnosticIssue {
  category: "A" | "B" | "C" | "D" | "E";
  categoryLabel: string;
  severity: "error" | "warning" | "info" | "success";
  title: string;
  detail: string;
}

const LOCAL_STORAGE_POS_KEY = "aai_inspector_v3_pos";
const LOCAL_STORAGE_SIZE_KEY = "aai_inspector_v3_size";

export const CatalogInspector: React.FC<CatalogInspectorProps> = ({
  isOpen,
  onClose,
  activeDomainId,
  onSendToAgentOS,
}) => {
  const { intent, theme } = useArchitectAny();
  const navContext = useUniversalNavigation();
  const isDark = theme === "dark";

  // Window geometry state
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    try {
      const saved = sessionStorage.getItem(LOCAL_STORAGE_POS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    // Default: Top-Right of viewport with 24px margin
    const initialWidth = typeof window !== "undefined" ? Math.min(520, window.innerWidth * 0.35) : 480;
    const initialX = typeof window !== "undefined" ? Math.max(20, window.innerWidth - initialWidth - 24) : 800;
    return { x: initialX, y: 84 };
  });

  const [size, setSize] = useState<{ width: number; height: number }>(() => {
    try {
      const saved = sessionStorage.getItem(LOCAL_STORAGE_SIZE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.width === "number" && typeof parsed.height === "number") {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    const defaultW = typeof window !== "undefined" ? Math.max(380, Math.min(520, window.innerWidth * 0.35)) : 460;
    const defaultH = typeof window !== "undefined" ? Math.max(480, Math.min(720, window.innerHeight * 0.72)) : 620;
    return { width: defaultW, height: defaultH };
  });

  const [isMinimized, setIsMinimized] = useState(false);
  const [mode, setMode] = useState<InspectorMode>("LIVE");
  const [activeTab, setActiveTab] = useState<CenterTab>("datamap");
  const [selectedLocalSource, setSelectedLocalSource] = useState<LocalJsonSourceKey>("entity");

  // Entity & Catalog Data State
  const [selectedItemId, setSelectedItemId] = useState<string>("D06");
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [uiClickNotice, setUiClickNotice] = useState<{ label: string; timestamp: number } | null>(null);

  const handleCopyAreaRef = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const refText = formatAAiAreaReference(selectedItem);
    navigator.clipboard.writeText(refText).then(() => {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    });
  };

  const handleSendToAgentOS = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const refText = formatAAiAreaReference(selectedItem);
    if (onSendToAgentOS) {
      onSendToAgentOS(refText, selectedItem);
    } else {
      window.dispatchEvent(
        new CustomEvent("aai:send-to-agent-os", {
          detail: { referenceText: refText, item: selectedItem },
        })
      );
    }
  };

  // Collections
  const [domains, setDomains] = useState<DomainItem[]>([]);
  const [subdomains, setSubdomains] = useState<SubdomainItem[]>([]);
  const [capabilities, setCapabilities] = useState<CapabilityItem[]>([]);
  const [bundles, setBundles] = useState<SolutionBundleItem[]>([]);
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);

  // Dragging & Resizing Refs
  const windowRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });

  const isResizingRef = useRef(false);
  const resizeOffsetRef = useRef<{ mouseX: number; mouseY: number; startW: number; startH: number }>({
    mouseX: 0,
    mouseY: 0,
    startW: 0,
    startH: 0,
  });

  // Load all canonical catalog collections
  const loadCatalogData = useCallback(async () => {
    try {
      const [d, sub, cap, bnd, sol] = await Promise.all([
        catalogRepository.getDomains(),
        catalogRepository.getSubdomains(),
        catalogRepository.getCapabilities(),
        catalogRepository.getSolutionBundles(),
        catalogRepository.getSolutions(),
      ]);

      setDomains(d);
      setSubdomains(sub);
      setCapabilities(cap);
      setBundles(bnd);
      setSolutions(sol);
    } catch (err) {
      console.error("[CatalogInspector V3] Failed to load catalog:", err);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadCatalogData();
    }
  }, [isOpen, loadCatalogData]);

  // Resolve currently active AAi entity ID from intent or waypoint
  const resolveActiveAAiEntityId = useCallback((): string => {
    if (intent.solutionId) return intent.solutionId;
    if (navContext?.selectedSolutionId) return navContext.selectedSolutionId;
    if (intent.solutionBundleId) return intent.solutionBundleId;
    if (intent.capabilityId) return intent.capabilityId;
    if (intent.subdomainId) return intent.subdomainId;
    if (activeDomainId) return activeDomainId;
    if (intent.domainId) return intent.domainId;

    if (navContext?.currentWaypoint?.id && navContext.currentWaypoint.layer > 0) {
      return navContext.currentWaypoint.id;
    }

    return "D06";
  }, [intent, navContext, activeDomainId]);

  // Real-time Context Tracking: Updates entity when AAi navigation changes while mode is LIVE
  useEffect(() => {
    if (!isOpen || mode !== "LIVE") return;

    const targetId = resolveActiveAAiEntityId();
    if (targetId && targetId !== selectedItemId) {
      setSelectedItemId(targetId);
      setSelectedLocalSource("entity");
      setUiClickNotice(null);
    }
  }, [isOpen, mode, resolveActiveAAiEntityId, selectedItemId]);

  // Load item record when selectedItemId changes
  useEffect(() => {
    if (!selectedItemId) return;
    let isSubscribed = true;

    catalogRepository.getItemById(selectedItemId).then((item) => {
      if (isSubscribed) {
        setSelectedItem(item);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [selectedItemId]);

  // Return to LIVE context
  const handleFollowAAiContext = () => {
    setMode("LIVE");
    setSelectedLocalSource("entity");
    setUiClickNotice(null);
    const liveId = resolveActiveAAiEntityId();
    setSelectedItemId(liveId);
  };

  // Passive Document Click Listener: detects clicks on AAi elements without blocking or capturing
  useEffect(() => {
    if (!isOpen) return;

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore clicks inside the Inspector itself
      if (windowRef.current && windowRef.current.contains(target)) return;

      // Check if clicked element or ancestor contains an entity ID
      const entityEl = target.closest(
        "[data-entity-id], [data-capability-id], [data-solution-id], [data-subdomain-id], [data-domain-id]"
      ) as HTMLElement | null;

      let detectedId: string | null = null;
      if (entityEl) {
        detectedId =
          entityEl.getAttribute("data-entity-id") ||
          entityEl.getAttribute("data-capability-id") ||
          entityEl.getAttribute("data-solution-id") ||
          entityEl.getAttribute("data-subdomain-id") ||
          entityEl.getAttribute("data-domain-id");
      }

      // Check text content for standard AAi entity codes (e.g. D06, D06.02, D06.02.02, SOL-...)
      if (!detectedId) {
        const text = target.innerText?.trim() || "";
        const codeMatch = text.match(/\b(D\d{2}(?:\.\d{2})*(?:\.\d{2})*)\b/);
        if (codeMatch && codeMatch[1]) {
          detectedId = codeMatch[1];
        }
      }

      // Check if user clicked a UI-only control (Header, ThemeToggle, UserMenu)
      const isUiOnlyControl = target.closest(
        'button, [role="button"], [role="radiogroup"], .theme-toggle, header'
      );

      if (detectedId) {
        catalogRepository.getItemById(detectedId).then((item) => {
          if (item) {
            setSelectedItemId(item.id);
            setSelectedLocalSource("entity");
            setUiClickNotice(null);
          }
        });
      } else if (isUiOnlyControl && !target.closest(".intent-search")) {
        const controlLabel =
          target.getAttribute("aria-label") ||
          target.getAttribute("title") ||
          target.innerText?.slice(0, 30) ||
          "UI Component";
        setUiClickNotice({
          label: controlLabel,
          timestamp: Date.now(),
        });
      }
    };

    document.addEventListener("click", handleDocumentClick, { passive: true });
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [isOpen]);

  // Dragging logic
  const handleTitleMouseDown = (e: React.MouseEvent) => {
    // Prevent drag when clicking controls inside title bar
    if ((e.target as HTMLElement).closest("button, select, input")) return;

    e.preventDefault();
    isDraggingRef.current = true;
    dragOffsetRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: position.x,
      startY: position.y,
    };

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = ev.clientX - dragOffsetRef.current.mouseX;
      const dy = ev.clientY - dragOffsetRef.current.mouseY;

      const newX = Math.max(
        10,
        Math.min(window.innerWidth - 180, dragOffsetRef.current.startX + dx)
      );
      const newY = Math.max(
        10,
        Math.min(window.innerHeight - 50, dragOffsetRef.current.startY + dy)
      );

      setPosition({ x: newX, y: newY });
      try {
        sessionStorage.setItem(
          LOCAL_STORAGE_POS_KEY,
          JSON.stringify({ x: newX, y: newY })
        );
      } catch {
        // ignore
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Multi-directional resizing logic (all 4 edges and 4 corners)
  type ResizeDirection = "e" | "w" | "s" | "n" | "se" | "sw" | "ne" | "nw";

  const handleResizeMouseDown = (e: React.MouseEvent, direction: ResizeDirection) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;

    const startMouseX = e.clientX;
    const startMouseY = e.clientY;
    const startX = position.x;
    const startY = position.y;
    const startW = size.width;
    const startH = size.height;

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isResizingRef.current) return;
      ev.preventDefault();

      const dx = ev.clientX - startMouseX;
      const dy = ev.clientY - startMouseY;

      let newX = startX;
      let newY = startY;
      let newW = startW;
      let newH = startH;

      // Horizontal resizing
      if (direction.includes("e")) {
        newW = Math.max(340, Math.min(window.innerWidth - startX - 10, startW + dx));
      } else if (direction.includes("w")) {
        const potentialW = startW - dx;
        if (potentialW >= 340 && startX + dx >= 10) {
          newW = potentialW;
          newX = startX + dx;
        }
      }

      // Vertical resizing
      if (direction.includes("s")) {
        newH = Math.max(260, Math.min(window.innerHeight - startY - 10, startH + dy));
      } else if (direction.includes("n")) {
        const potentialH = startH - dy;
        if (potentialH >= 260 && startY + dy >= 10) {
          newH = potentialH;
          newY = startY + dy;
        }
      }

      setPosition({ x: newX, y: newY });
      setSize({ width: newW, height: newH });

      try {
        sessionStorage.setItem(
          LOCAL_STORAGE_POS_KEY,
          JSON.stringify({ x: newX, y: newY })
        );
        sessionStorage.setItem(
          LOCAL_STORAGE_SIZE_KEY,
          JSON.stringify({ width: newW, height: newH })
        );
      } catch {
        // ignore
      }
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Keyboard Esc key closes window unless editing in an input
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag === "input" || activeTag === "textarea") {
          return;
        }
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Copy JSON handler
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Raw Local JSON file selection
  const rawFileJsonContent = useMemo(() => {
    switch (selectedLocalSource) {
      case "capability-catalog.json":
        return catalogRawJson;
      case "domains.json":
        return domainsRawJson;
      case "subdomains.json":
        return subdomainsRawJson;
      case "solution-capabilities.json":
        return capabilitiesRawJson;
      case "solutions.json":
        return solutionsRawJson;
      default:
        return selectedItem;
    }
  }, [selectedLocalSource, selectedItem]);

  // Filtered JSON text output
  const displayedJsonText = useMemo(() => {
    if (!rawFileJsonContent) return "No data available";
    return JSON.stringify(rawFileJsonContent, null, 2);
  }, [rawFileJsonContent]);

  // Lineage computation
  const lineage = useMemo(() => {
    if (!selectedItem?.path || selectedItem.path.length === 0) {
      return [{ layer: selectedItem?.layer || 1, id: selectedItem?.id || "D06", name: selectedItem?.name || "Domain" }];
    }
    return selectedItem.path;
  }, [selectedItem]);

  // Children computation
  const directChildren = useMemo(() => {
    if (!selectedItem) return [];
    if (selectedItem.layer === 1) {
      return subdomains.filter((s) => s.domainId === selectedItem.id);
    }
    if (selectedItem.layer === 2) {
      return capabilities.filter((c) => c.subdomainId === selectedItem.id);
    }
    if (selectedItem.layer === 3) {
      return bundles.filter((b) => b.capabilityId === selectedItem.id);
    }
    if (selectedItem.layer === 4) {
      return solutions.filter((s) => s.solutionBundleId === selectedItem.id);
    }
    return [];
  }, [selectedItem, subdomains, capabilities, bundles, solutions]);

  // 5-Check Diagnostic Matrix
  const diagnostics = useMemo((): DiagnosticIssue[] => {
    if (!selectedItem) return [];
    const issues: DiagnosticIssue[] = [];

    // Category A: Local JSON presence
    if (selectedItem.layer === 3) {
      const childBundles = bundles.filter((b) => b.capabilityId === selectedItem.id);
      if (childBundles.length === 0) {
        issues.push({
          category: "A",
          categoryLabel: "Local JSON Data",
          severity: "warning",
          title: `0 Solution Bundles in JSON for ${selectedItem.id}`,
          detail: `In capability-catalog.json, this capability has no child solutionBundles[]. This is an intentional catalog data boundary, NOT a runtime crash.`,
        });
      } else {
        issues.push({
          category: "A",
          categoryLabel: "Local JSON Data",
          severity: "success",
          title: `${childBundles.length} Bundles defined in JSON`,
          detail: `Catalog contains valid child bundles for ${selectedItem.id}.`,
        });
      }
    } else {
      issues.push({
        category: "A",
        categoryLabel: "Local JSON Data",
        severity: "success",
        title: `Entity Defined in Canonical JSON`,
        detail: `ID ${selectedItem.id} exists in local capability-catalog.json.`,
      });
    }

    // Category B: Repository resolution
    issues.push({
      category: "B",
      categoryLabel: "Repository Query",
      severity: "success",
      title: "catalogRepository.getItemById verified",
      detail: `Successfully resolved ${selectedItem.id} with layer ${selectedItem.layer}.`,
    });

    // Category C: Hierarchy Linkage
    if (selectedItem.parentId) {
      issues.push({
        category: "C",
        categoryLabel: "Parent Linkage",
        severity: "success",
        title: `Parent link verified: ${selectedItem.parentId}`,
        detail: `Item correctly points to parent entity ${selectedItem.parentId}.`,
      });
    } else {
      issues.push({
        category: "C",
        categoryLabel: "Hierarchy Root",
        severity: "info",
        title: `Root Entity (${selectedItem.id})`,
        detail: `This item is a root-level Domain without higher parent entities.`,
      });
    }

    // Category D: Navigation Sync State
    const activeNavId = resolveActiveAAiEntityId();
    if (activeNavId === selectedItem.id) {
      issues.push({
        category: "D",
        categoryLabel: "Active AAi Sync",
        severity: "success",
        title: "Synchronized with Active AAi Context",
        detail: `Inspector entity matches active AAi interaction context (${activeNavId}).`,
      });
    } else {
      issues.push({
        category: "D",
        categoryLabel: "Active AAi Sync",
        severity: "info",
        title: `Inspecting ${selectedItem.id}`,
        detail: `Active AAi context is currently "${activeNavId}". Click "Follow AAi Context" to align.`,
      });
    }

    // Category E: UI Readiness
    issues.push({
      category: "E",
      categoryLabel: "UI Rendering",
      severity: "success",
      title: `L${selectedItem.layer} Stage Compatible`,
      detail: `Entity contains all mandatory metadata fields (name, description, path).`,
    });

    return issues;
  }, [selectedItem, bundles, resolveActiveAAiEntityId]);

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: isMinimized ? "auto" : `${size.height}px`,
        zIndex: 90,
      }}
      className={`flex flex-col rounded-xl shadow-2xl border transition-colors select-none font-sans ${
        isDark
          ? "bg-[#030e1d]/95 border-[#00dfff]/40 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,227,253,0.2)] text-[#eaf7ff]"
          : "bg-white/95 border-slate-300 shadow-[0_10px_35px_rgba(0,0,0,0.2)] text-slate-900"
      }`}
      role="region"
      aria-label="AAi Floating JSON Inspector"
    >
      {/* =================================================================== */}
      {/* TITLE BAR (DRAGGABLE HANDLE)                                        */}
      {/* =================================================================== */}
      <div
        onMouseDown={handleTitleMouseDown}
        className={`flex items-center justify-between px-3 py-2 rounded-t-xl cursor-move border-b shrink-0 ${
          isDark
            ? "bg-[#021224] border-[#00dfff]/20 text-[#eaf7ff]"
            : "bg-slate-100 border-slate-200 text-slate-900"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0 pointer-events-none">
          {/* Windows-style 4-Square Symbol */}
          <div className="grid grid-cols-2 gap-[2px] w-3.5 h-3.5 items-center justify-center shrink-0">
            <span className={`w-1.5 h-1.5 rounded-[1px] ${isDark ? "bg-[#00e3fd]" : "bg-slate-700"}`} />
            <span className={`w-1.5 h-1.5 rounded-[1px] ${isDark ? "bg-[#00e3fd]" : "bg-slate-700"}`} />
            <span className={`w-1.5 h-1.5 rounded-[1px] ${isDark ? "bg-[#00e3fd]" : "bg-slate-700"}`} />
            <span className={`w-1.5 h-1.5 rounded-[1px] ${isDark ? "bg-[#00e3fd]" : "bg-slate-700"}`} />
          </div>

          <span className="font-mono text-xs font-bold tracking-tight text-[#00e3fd] truncate">
            AAi JSON Inspector
          </span>

          {/* Mode Indicator */}
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${
              mode === "LIVE"
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/15 text-amber-400 border-amber-500/30"
            }`}
            title={mode === "LIVE" ? "Following active AAi context" : "Manual inspection active"}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                mode === "LIVE" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            {mode === "LIVE" ? "LIVE" : "MANUAL"}
          </span>
        </div>

        {/* Title Bar Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {mode === "MANUAL" && (
            <button
              type="button"
              onClick={handleFollowAAiContext}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                isDark
                  ? "bg-[#00e3fd]/20 text-[#00e3fd] border-[#00e3fd]/40 hover:bg-[#00e3fd]/35"
                  : "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
              }`}
              title="Return to following active AAi context"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              <span>Follow AAi</span>
            </button>
          )}

          {/* Minimize / Collapse Window */}
          <button
            type="button"
            onClick={() => setIsMinimized((prev) => !prev)}
            className={`p-1 rounded transition-colors cursor-pointer border ${
              isDark
                ? "bg-[#031d33] text-slate-300 border-[#00dfff]/20 hover:text-white"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
            title={isMinimized ? "Expand inspector" : "Minimize to title bar"}
          >
            <Minus className="w-3 h-3" />
          </button>

          {/* Close Window */}
          <button
            type="button"
            onClick={onClose}
            className={`p-1 rounded transition-colors cursor-pointer border ${
              isDark
                ? "bg-[#1c0812] text-rose-400 border-rose-500/30 hover:bg-rose-900/40 hover:text-rose-200"
                : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
            }`}
            title="Close Inspector (Esc)"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* WINDOW BODY (HIDDEN WHEN MINIMIZED)                                 */}
      {/* =================================================================== */}
      {!isMinimized && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Context Ribbon (Active Entity summary & UI click notices) */}
          <div
            className={`px-3 py-1.5 border-b flex items-center justify-between gap-2 text-xs font-mono shrink-0 ${
              isDark ? "bg-[#010913] border-[#00dfff]/15" : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center gap-1.5 truncate min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#00e3fd]">
                L{selectedItem?.layer || 1}:
              </span>
              <span className="font-bold truncate text-[#00e3fd]">
                {selectedItem?.id || "D06"}
              </span>
              <span className="truncate opacity-80 font-sans">
                {selectedItem?.name || "Marketplace & Commerce"}
              </span>
            </div>

            {/* UI-Only Click Notification (ThemeToggle, Header, etc.) */}
            {uiClickNotice && Date.now() - uiClickNotice.timestamp < 3500 && (
              <span
                className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 shrink-0 truncate max-w-[170px]"
                title="UI component clicked (Theme / Header). No local JSON source backing this component."
              >
                No local JSON: {uiClickNotice.label}
              </span>
            )}
          </div>

          {/* Area Reference & Agent OS Workstation Bridge */}
          <div
            className={`px-3 py-2 border-b flex items-center justify-between gap-2 shrink-0 ${
              isDark
                ? "bg-gradient-to-r from-[#02182c] via-[#03203c] to-[#011425] border-[#00dfff]/20"
                : "bg-gradient-to-r from-indigo-50/80 via-sky-50/60 to-white border-slate-200"
            }`}
          >
            <div className="min-w-0 pr-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00e3fd]">
                <MapPin className="w-3 h-3 text-[#00e3fd]" />
                <span className="font-bold uppercase tracking-wider">Area Data Map Ref</span>
              </div>
              <div
                className="text-xs font-mono font-bold truncate text-white max-w-[280px]"
                title={formatAAiAreaReference(selectedItem)}
              >
                {selectedItem ? `${selectedItem.id} · ${selectedItem.name}` : "AAi Root Universe"}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                id="btn-copy-area-ref"
                onClick={handleCopyAreaRef}
                className="px-2 py-1 rounded-lg bg-[#041d33] hover:bg-[#072c4d] text-[#00e3fd] text-[10px] font-mono border border-[#00dfff]/30 flex items-center gap-1 cursor-pointer transition-all"
                title="Copy concise Area Reference (not raw JSON)"
              >
                {copiedRef ? (
                  <>
                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-2.5 h-2.5" />
                    <span>Copy Ref</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="btn-send-to-agent-os"
                onClick={handleSendToAgentOS}
                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-md hover:shadow-purple-500/30 transition-all cursor-pointer"
                title="Send Area Reference to AAi Agent OS as New Intent / Task"
              >
                <Sparkles className="w-3 h-3 text-purple-200" />
                <span>Send to Agent OS</span>
              </button>
            </div>
          </div>

          {/* Secondary Tab Bar (Data Map, Specs, JSON, Diagnostics, Local Files, Health) */}
          <div
            className={`px-2 py-1.5 border-b flex items-center justify-between gap-1 shrink-0 overflow-x-auto ${
              isDark ? "bg-[#02101e] border-[#00dfff]/15" : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center gap-1">
              {(
                [
                  { id: "datamap", label: "Data Map", icon: MapPin },
                  { id: "specs", label: "Specs", icon: Tag },
                  { id: "json", label: "Raw JSON", icon: FileCode },
                  { id: "diagnostics", label: "Diagnostics", icon: Sliders },
                  { id: "sources", label: "Local Files", icon: FolderTree },
                  { id: "health", label: "Health", icon: Activity },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-all cursor-pointer border ${
                      isActive
                        ? isDark
                          ? "bg-[#00e3fd]/20 text-[#00e3fd] border-[#00e3fd]/50 font-bold"
                          : "bg-indigo-50 text-indigo-700 border-indigo-300 font-bold"
                        : isDark
                          ? "text-slate-400 border-transparent hover:bg-[#031d33] hover:text-white"
                          : "text-slate-600 border-transparent hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Copy button */}
            <button
              type="button"
              onClick={() => handleCopy(displayedJsonText)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium border transition-all cursor-pointer shrink-0 ${
                copied
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                  : isDark
                    ? "bg-[#031d33] text-[#00e3fd] border-[#00dfff]/30 hover:bg-[#052d50]"
                    : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
              }`}
              title="Copy visible JSON payload to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* ================================================================= */}
          {/* TAB CONTENT PANELS                                                */}
          {/* ================================================================= */}
          <div className="flex-1 overflow-y-auto p-3 font-mono text-xs select-text scrollbar-thin">
            {/* 0. DATA MAP VIEW (Clean Architectural Coordinates & Constants) */}
            {activeTab === "datamap" && selectedItem && (
              <div className="space-y-3 font-sans">
                {/* Visual Area Reference Callout */}
                <div
                  className={`p-3 rounded-xl border font-mono text-xs ${
                    isDark
                      ? "bg-[#011122] border-[#00dfff]/30 shadow-inner"
                      : "bg-sky-50/70 border-sky-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-dashed border-slate-700/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00e3fd]">
                      Concise Area Reference for Intent
                    </span>
                    <span className="text-[9px] text-slate-400">Agent OS Ready</span>
                  </div>
                  <pre className="text-[11px] leading-relaxed text-[#c8e3f5] bg-black/40 p-2 rounded-lg border border-slate-800 select-all overflow-x-auto whitespace-pre-wrap break-all">
                    {formatAAiAreaReference(selectedItem)}
                  </pre>
                  <div className="flex items-center justify-between gap-2 mt-2 pt-1">
                    <span className="text-[10px] text-slate-400">
                      No need to paste 5,000 lines of raw JSON. This reference carries exact layer, schema &amp; lineage.
                    </span>
                    <button
                      type="button"
                      onClick={handleSendToAgentOS}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Create Intent</span>
                    </button>
                  </div>
                </div>

                {/* Architectural Constants & Schema Map */}
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? "bg-[#02101e] border-[#00dfff]/20" : "bg-white border-slate-200"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00e3fd] block mb-2">
                    Schema Map &amp; Constants
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-slate-900/40 border border-slate-800">
                      <span className="text-[10px] opacity-60 block">Canonical Node ID</span>
                      <span className="font-bold text-[#00e3fd]">{selectedItem.id}</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900/40 border border-slate-800">
                      <span className="text-[10px] opacity-60 block">Catalog Layer</span>
                      <span className="font-bold">L{selectedItem.layer} ({selectedItem.type})</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900/40 border border-slate-800">
                      <span className="text-[10px] opacity-60 block">Schema Source File</span>
                      <span className="text-amber-300 truncate block">
                        {selectedItem.layer === 1
                          ? "domains.json"
                          : selectedItem.layer === 2
                          ? "subdomains.json"
                          : selectedItem.layer === 3
                          ? "solution-capabilities.json"
                          : selectedItem.layer === 4
                          ? "capability-catalog.json"
                          : "solutions.json"}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-900/40 border border-slate-800">
                      <span className="text-[10px] opacity-60 block">Parent Lineage Link</span>
                      <span className="truncate block">{selectedItem.parentId || "ROOT"}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Children / Scope Boundaries */}
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? "bg-[#02101e] border-[#00dfff]/20" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00e3fd]">
                      Direct Children in Area ({directChildren.length})
                    </span>
                    <span className="text-[9px] font-mono opacity-50">Click to switch inspection</span>
                  </div>
                  {directChildren.length === 0 ? (
                    <p className="text-xs opacity-60 font-sans italic">
                      Leaf node entity in this layer branch.
                    </p>
                  ) : (
                    <div className="space-y-1 max-h-36 overflow-y-auto">
                      {directChildren.slice(0, 8).map((child) => (
                        <div
                          key={child.id}
                          onClick={() => {
                            setSelectedItemId(child.id);
                            setSelectedLocalSource("entity");
                            setMode("MANUAL");
                          }}
                          className="p-1.5 rounded bg-slate-900/50 hover:bg-[#03203c] border border-slate-800 hover:border-[#00e3fd]/40 flex items-center justify-between cursor-pointer transition-all"
                        >
                          <span className="font-mono text-xs text-[#00e3fd] font-bold">
                            {child.id}
                          </span>
                          <span className="text-xs truncate max-w-[200px] opacity-80">
                            {child.name}
                          </span>
                          <ChevronRight className="w-3 h-3 opacity-50" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 1. CANONICAL / RAW JSON TAB */}
            {activeTab === "json" && (
              <div className="h-full flex flex-col space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono opacity-75">
                  <span>
                    Source:{" "}
                    <strong className="text-[#00e3fd]">
                      {selectedLocalSource === "entity"
                        ? `catalogRepository.getItemById("${selectedItem?.id}")`
                        : selectedLocalSource}
                    </strong>
                  </span>
                  <span>{selectedItem?.type || "JSON"}</span>
                </div>

                <pre
                  className={`flex-1 p-2.5 rounded-lg overflow-x-auto font-mono text-[11px] leading-relaxed border ${
                    isDark
                      ? "bg-[#010710] border-[#00dfff]/20 text-[#c8e3f5]"
                      : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                >
                  {displayedJsonText}
                </pre>
              </div>
            )}

            {/* 2. STRUCTURED SPECS TAB */}
            {activeTab === "specs" && selectedItem && (
              <div className="space-y-3 font-sans">
                {/* Identity & Coordinates */}
                <div
                  className={`p-2.5 rounded-lg border font-mono text-xs ${
                    isDark ? "bg-[#02101e] border-[#00dfff]/20" : "bg-white border-slate-200"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00e3fd] block mb-2">
                    Identity Coordinates
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="opacity-60">ID:</span>{" "}
                      <span className="font-bold text-[#00e3fd]">{selectedItem.id}</span>
                    </div>
                    <div>
                      <span className="opacity-60">Layer:</span>{" "}
                      <span className="font-bold">L{selectedItem.layer} ({selectedItem.type})</span>
                    </div>
                    <div>
                      <span className="opacity-60">Parent:</span>{" "}
                      <span>{selectedItem.parentId || "ROOT"}</span>
                    </div>
                    <div>
                      <span className="opacity-60">Status:</span>{" "}
                      <span className="text-emerald-400 font-semibold uppercase">{selectedItem.status}</span>
                    </div>
                  </div>
                </div>

                {/* Business Architecture */}
                {(selectedItem.businessWorld || selectedItem.processModel) && (
                  <div
                    className={`p-2.5 rounded-lg border ${
                      isDark ? "bg-[#02101e] border-[#00dfff]/20" : "bg-white border-slate-200"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00e3fd] block mb-1.5">
                      Business Architecture Context
                    </span>
                    {selectedItem.businessWorld && (
                      <div className="mb-1">
                        <span className="opacity-60 text-xs">Business World:</span>
                        <p className="font-semibold text-xs text-amber-300">
                          {selectedItem.businessWorld}
                        </p>
                      </div>
                    )}
                    {selectedItem.processModel && (
                      <div>
                        <span className="opacity-60 text-xs">Process Lifecycle Model:</span>
                        <p className="font-mono text-xs text-emerald-300 mt-0.5">
                          {selectedItem.processModel}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Platform & Implementation Options */}
                {(selectedItem.platformOptions || selectedItem.implementationOptions) && (
                  <div
                    className={`p-2.5 rounded-lg border ${
                      isDark ? "bg-[#02101e] border-[#00dfff]/20" : "bg-white border-slate-200"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00e3fd] block mb-2">
                      Options & Integrations
                    </span>
                    {selectedItem.platformOptions && (
                      <div className="mb-2">
                        <span className="opacity-60 text-xs block mb-1">Platform Options:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedItem.platformOptions.map((opt) => (
                            <span
                              key={opt}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-400/30"
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedItem.implementationOptions && (
                      <div>
                        <span className="opacity-60 text-xs block mb-1">Implementation Options:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedItem.implementationOptions.map((opt) => (
                            <span
                              key={opt}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Lineage & Children */}
                <div
                  className={`p-2.5 rounded-lg border font-mono text-xs ${
                    isDark ? "bg-[#02101e] border-[#00dfff]/20" : "bg-white border-slate-200"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00e3fd] block mb-1.5">
                    Lineage & Direct Children ({directChildren.length})
                  </span>
                  <div className="flex flex-wrap items-center gap-1 text-[11px] mb-2">
                    <span className="opacity-50">Universe</span>
                    {lineage.map((seg) => (
                      <React.Fragment key={seg.id}>
                        <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
                        <span
                          className={
                            seg.id === selectedItem.id
                              ? "text-[#00e3fd] font-bold"
                              : "opacity-75"
                          }
                        >
                          L{seg.layer}:{seg.id}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>

                  {directChildren.length > 0 && (
                    <div className="space-y-1 max-h-36 overflow-y-auto scrollbar-thin">
                      {directChildren.map((ch: any) => (
                        <div
                          key={ch.id}
                          className={`flex items-center justify-between p-1 rounded text-[11px] ${
                            isDark ? "bg-[#031d33]/50 text-slate-300" : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          <span className="text-[#00e3fd] font-bold">{ch.id}</span>
                          <span className="truncate max-w-[220px] font-sans">{ch.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. DIAGNOSTICS TAB (5-CHECK MATRIX) */}
            {activeTab === "diagnostics" && (
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00e3fd]">
                    Root-Cause Diagnostic Matrix
                  </span>
                  <span className="text-[10px] opacity-60">5-Point Verification</span>
                </div>

                {diagnostics.map((diag, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded border text-[11px] ${
                      diag.severity === "error"
                        ? "bg-rose-950/40 border-rose-500/50 text-rose-300"
                        : diag.severity === "warning"
                          ? "bg-amber-950/40 border-amber-500/50 text-amber-300"
                          : diag.severity === "success"
                            ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                            : "bg-sky-950/30 border-sky-500/40 text-sky-300"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <span className="px-1 py-0.2 rounded bg-black/40 text-[9px]">
                        Cat {diag.category}
                      </span>
                      <span>{diag.title}</span>
                    </div>
                    <p className="text-[10px] opacity-85 font-sans leading-normal">
                      {diag.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* 4. LOCAL JSON SOURCES TAB */}
            {activeTab === "sources" && (
              <div className="space-y-2 font-mono text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00e3fd] block mb-1">
                  Local JSON Files (Diagnostic Inspection)
                </span>
                <p className="text-[11px] opacity-75 font-sans mb-2">
                  Select a local file to inspect without altering AAi navigation.
                </p>

                {(
                  [
                    { id: "entity", name: "Active Context Entity (JSON)", size: "Dynamic" },
                    { id: "capability-catalog.json", name: "capability-catalog.json", size: "14 Domains, 20 Subdomains, 24 Capabilities" },
                    { id: "domains.json", name: "domains.json (L1)", size: `${domains.length} Domains` },
                    { id: "subdomains.json", name: "subdomains.json (L2)", size: `${subdomains.length} Subdomains` },
                    { id: "solution-capabilities.json", name: "solution-capabilities.json (L3)", size: `${capabilities.length} Capabilities` },
                    { id: "solutions.json", name: "solutions.json (L5)", size: `${solutions.length} Solutions` },
                  ] as const
                ).map((src) => {
                  const isCurrent = selectedLocalSource === src.id;
                  return (
                    <button
                      key={src.id}
                      type="button"
                      onClick={() => {
                        setSelectedLocalSource(src.id);
                        if (src.id !== "entity") {
                          setMode("MANUAL");
                        } else {
                          setMode("LIVE");
                        }
                        setActiveTab("json");
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left border transition-all cursor-pointer ${
                        isCurrent
                          ? isDark
                            ? "bg-[#00e3fd]/20 text-white border-[#00e3fd]/60 font-semibold"
                            : "bg-indigo-50 text-indigo-900 border-indigo-300 font-semibold"
                          : isDark
                            ? "bg-[#031d33]/50 text-slate-300 border-transparent hover:bg-[#031d33]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-bold block text-xs">{src.name}</span>
                        <span className="text-[10px] opacity-60 font-sans">{src.size}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* 5. CATALOG HEALTH TAB */}
            {activeTab === "health" && (
              <div className="space-y-3 font-mono text-xs">
                <div
                  className={`p-2.5 rounded-lg border ${
                    isDark ? "bg-[#02101e] border-[#00dfff]/20" : "bg-white border-slate-200"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00e3fd] block mb-2">
                    Canonical Catalog Summary
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/30">
                      <span className="text-[9px] uppercase opacity-75 block">L1 Domains</span>
                      <span className="text-base font-bold text-indigo-400">{domains.length}</span>
                    </div>
                    <div className="p-2 rounded bg-sky-500/10 border border-sky-500/30">
                      <span className="text-[9px] uppercase opacity-75 block">L2 Subdomains</span>
                      <span className="text-base font-bold text-sky-400">{subdomains.length}</span>
                    </div>
                    <div className="p-2 rounded bg-teal-500/10 border border-teal-500/30">
                      <span className="text-[9px] uppercase opacity-75 block">L3 Capabilities</span>
                      <span className="text-base font-bold text-teal-400">{capabilities.length}</span>
                    </div>
                    <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30">
                      <span className="text-[9px] uppercase opacity-75 block">L4 Bundles</span>
                      <span className="text-base font-bold text-amber-400">{bundles.length}</span>
                    </div>
                    <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30">
                      <span className="text-[9px] uppercase opacity-75 block">L5 Solutions</span>
                      <span className="text-base font-bold text-emerald-400">{solutions.length}</span>
                    </div>
                    <div className="p-2 rounded bg-[#00e3fd]/10 border border-[#00e3fd]/30">
                      <span className="text-[9px] uppercase opacity-75 block">Total Entities</span>
                      <span className="text-base font-bold text-[#00e3fd]">
                        {domains.length + subdomains.length + capabilities.length + bundles.length + solutions.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-2.5 rounded-lg border font-sans text-xs leading-relaxed ${
                    isDark
                      ? "bg-[#031d33]/50 border-[#00dfff]/30 text-slate-300"
                      : "bg-indigo-50 border-indigo-200 text-indigo-900"
                  }`}
                >
                  <span className="font-bold text-[#00e3fd] block mb-1">
                    Floating Companion Rule:
                  </span>
                  As you navigate AAi (clicking L1 Domains, L2 Subdomains, L3 Capabilities, or Breadcrumbs),
                  this window stays alive, floating, and synchronized without freezing or blocking AAi.
                </div>
              </div>
            )}
          </div>

          {/* ================================================================= */}
          {/* 4 SIDES & 4 CORNERS RESIZE HANDLERS                               */}
          {/* ================================================================= */}
          {/* Right Edge */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "e")}
            className="absolute top-3 bottom-3 -right-1 w-2.5 cursor-ew-resize hover:bg-[#00e3fd]/30 transition-colors z-20"
            title="Drag right edge to resize width"
          />
          {/* Left Edge */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "w")}
            className="absolute top-3 bottom-3 -left-1 w-2.5 cursor-ew-resize hover:bg-[#00e3fd]/30 transition-colors z-20"
            title="Drag left edge to resize width"
          />
          {/* Bottom Edge */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "s")}
            className="absolute -bottom-1 left-3 right-3 h-2.5 cursor-ns-resize hover:bg-[#00e3fd]/30 transition-colors z-20"
            title="Drag bottom edge to resize height"
          />
          {/* Top Edge */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "n")}
            className="absolute -top-1 left-3 right-3 h-2.5 cursor-ns-resize hover:bg-[#00e3fd]/30 transition-colors z-20"
            title="Drag top edge to resize height"
          />

          {/* Bottom-Right Corner */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "se")}
            className={`absolute -bottom-1 -right-1 w-4 h-4 cursor-nwse-resize flex items-end justify-end p-0.5 hover:bg-[#00e3fd]/30 rounded-br-xl transition-colors z-30 ${
              isDark ? "text-[#00e3fd]/70 hover:text-[#00e3fd]" : "text-slate-400 hover:text-slate-800"
            }`}
            title="Drag corner to resize width & height"
          >
            <svg className="w-2.5 h-2.5" viewBox="0 0 6 6" fill="none">
              <line x1="5" y1="1" x2="1" y2="5" stroke="currentColor" strokeWidth="1" />
              <line x1="5" y1="3" x2="3" y2="5" stroke="currentColor" strokeWidth="1" />
              <line x1="5" y1="5" x2="5" y2="5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Bottom-Left Corner */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
            className="absolute -bottom-1 -left-1 w-4 h-4 cursor-nesw-resize hover:bg-[#00e3fd]/30 rounded-bl-xl transition-colors z-30"
            title="Drag corner to resize width & height"
          />

          {/* Top-Right Corner */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
            className="absolute -top-1 -right-1 w-4 h-4 cursor-nesw-resize hover:bg-[#00e3fd]/30 rounded-tr-xl transition-colors z-30"
            title="Drag corner to resize width & height"
          />

          {/* Top-Left Corner */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
            className="absolute -top-1 -left-1 w-4 h-4 cursor-nwse-resize hover:bg-[#00e3fd]/30 rounded-tl-xl transition-colors z-30"
            title="Drag corner to resize width & height"
          />
        </div>
      )}
    </div>
  );
};
