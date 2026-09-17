/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Context: P1.3 — M01 Solution Universe
 * Status: ACTIVE
 * Version: 1.0.2
 */

import React, { useState, useMemo, useEffect, useRef } from "react";
import domainsData from "@/data/universe/domains.json";
import subdomainsData from "@/data/universe/subdomains.json";
import capabilitiesData from "@/data/universe/solution-capabilities.json";
import solutionsData from "@/data/universe/solutions.json";
import { Domain, Subdomain, SolutionCapability, Solution } from "@/src/types";
import type { DomainItem } from "@/src/contracts/catalog";
import { useArchitectAny } from "@/src/context/ArchitectAnyContext";
import { UniversePlane } from "./UniversePlane";
import { DomainNode } from "./DomainNode";
import { IntentCore } from "./IntentCore";
import { SolutionRail } from "./SolutionRail";
import { DomainContextBanner } from "./DomainContextBanner";
import {
  Play,
  Pause,
  RotateCw,
  Compass,
  Eye,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import styles from "./UniverseStage.module.css";

export interface UniverseStageProps {
  initialDomainId?: string;
  onDomainSelect?: (domain: Domain) => void;
  onSelectSolution?: (solutionId: string) => void;
  onOpenIntentCore?: (initialQuery?: string) => void;
  searchQuery?: string;
}

export const UniverseStage: React.FC<UniverseStageProps> = ({
  initialDomainId = "D06",
  onDomainSelect,
  onSelectSolution,
  onOpenIntentCore,
  searchQuery = "",
}) => {
  const { intent, setIntent, clearIntent, theme } = useArchitectAny();
  const allDomains: Domain[] = (domainsData as unknown as Domain[]) || [];
  const subdomains: Subdomain[] =
    (subdomainsData as unknown as Subdomain[]) || [];
  const capabilities: SolutionCapability[] =
    (capabilitiesData as unknown as SolutionCapability[]) || [];
  const solutions: Solution[] = (solutionsData as unknown as Solution[]) || [];

  const bannerDomains = useMemo<DomainItem[]>(
    () =>
      allDomains.map((domain) => ({
        ...domain,
        type: "DOMAIN",
        layer: 1,
        parentId: null,
        domainId: domain.id,
        path: [
          {
            id: domain.id,
            name: domain.name,
            layer: 1,
            type: "DOMAIN",
          },
        ],
        keywords: [],
        aliases: [],
        status: "active",
      })),
    [allDomains],
  );

  const domains = useMemo(() => {
    if (!searchQuery.trim()) return allDomains;
    const q = searchQuery.toLowerCase();
    const filtered = allDomains.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        (d.description && d.description.toLowerCase().includes(q)),
    );
    return filtered.length > 0 ? filtered : allDomains;
  }, [allDomains, searchQuery]);

  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(() => {
    if (intent.domainId) {
      return allDomains.find((d) => d.id === intent.domainId) || null;
    }
    if (initialDomainId && intent.domainId === undefined) {
      return allDomains.find((d) => d.id === initialDomainId) || null;
    }
    return null;
  });

  useEffect(() => {
    if (intent.domainId) {
      if (selectedDomain?.id !== intent.domainId) {
        const match = allDomains.find((d) => d.id === intent.domainId);
        if (match) {
          setSelectedDomain(match);
        }
      }
    } else {
      setSelectedDomain(null);
    }
  }, [intent.domainId, allDomains]);

  const [hoveredDomain, setHoveredDomain] = useState<Domain | null>(null);
  const solutionRailRef = useRef<HTMLDivElement>(null);

  // Galaxy Orbit Animation State
  const [isOrbiting, setIsOrbiting] = useState<boolean>(true);
  const [orbitSpeed, setOrbitSpeed] = useState<number>(1);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [layoutMode, setLayoutMode] = useState<"single-oval" | "dual-ring">(
    "single-oval",
  );

  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isHoveredStageRef = useRef<boolean>(false);
  const canHoverStageRef = useRef<boolean>(false);
  const lastMobileStateUpdateRef = useRef<number>(0);

  // Touch devices must never enter the desktop hover-pause state. Some Android
  // WebViews synthesize mouse-enter after a tap and otherwise leave the galaxy
  // frozen until another pointer event occurs.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverCapability = () => {
      canHoverStageRef.current = mediaQuery.matches;
      if (!mediaQuery.matches) {
        isHoveredStageRef.current = false;
      }
    };

    updateHoverCapability();
    mediaQuery.addEventListener("change", updateHoverCapability);
    return () => mediaQuery.removeEventListener("change", updateHoverCapability);
  }, []);

  // Smooth galaxy orbit animation loop. Mobile updates are capped at 30fps so
  // React does not reconcile the entire domain-node layer on every display frame.
  useEffect(() => {
    const isMobileViewport =
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width: 640px)").matches ||
        window.matchMedia("(pointer: coarse)").matches);
    const mobileUpdateInterval = 1000 / 30;

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        const hoverPaused = canHoverStageRef.current && isHoveredStageRef.current;

        if (isOrbiting && !hoverPaused) {
          if (
            !isMobileViewport ||
            time - lastMobileStateUpdateRef.current >= mobileUpdateInterval
          ) {
            const speedMultiplier = orbitSpeed * 0.045;
            setRotationAngle(
              (prev) => (prev + delta * speedMultiplier) % (Math.PI * 2),
            );
            lastMobileStateUpdateRef.current = time;
          }
        }
      }
      lastTimeRef.current = time;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOrbiting, orbitSpeed]);

  const handleSelectDomain = (domain: Domain) => {
    setSelectedDomain(domain);
    setIntent({
      query: "",
      rawQuery: "",
      domainId: domain.id,
      subdomainId: null,
      capabilityId: null,
      solutionBundleId: null,
      solutionId: null,
      serviceId: null,
      providerId: null,
      category: domain.name,
      path: [{ id: domain.id, name: domain.name, layer: 1 }],
    });
    onDomainSelect?.(domain);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetToRoot = () => {
    setSelectedDomain(null);
    clearIntent();
    setIsOrbiting(true);
    isHoveredStageRef.current = false;
    lastTimeRef.current = null;
    lastMobileStateUpdateRef.current = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const orbitGeometry = useMemo(() => {
    if (layoutMode === "single-oval") {
      return {
        outerRx: 45.0,
        outerRy: 33.5,
        innerRx: 45.0,
        innerRy: 33.5,
      };
    }
    return {
      outerRx: 46.5,
      outerRy: 35.0,
      innerRx: 33.5,
      innerRy: 23.5,
    };
  }, [layoutMode]);

  const nodePositions = useMemo(() => {
    const total = domains.length;
    const centerX = 50;
    const centerY = 50;
    const { outerRx, outerRy, innerRx, innerRy } = orbitGeometry;

    return domains.map((domain, index) => {
      const baseAngle = (index / total) * (Math.PI * 2) - Math.PI / 2;
      const currentAngle = baseAngle + rotationAngle;

      const isInner =
        layoutMode === "dual-ring" &&
        (domain.visual?.orbit === "inner" ||
          (domain.visual?.orbit === undefined && index % 2 !== 0));
      const rx = isInner ? innerRx : outerRx;
      const ry = isInner ? innerRy : outerRy;

      const x = centerX + rx * Math.cos(currentAngle);
      const y = centerY + ry * Math.sin(currentAngle);
      const depthZ = Math.sin(currentAngle);
      const depthScale = 0.86 + (depthZ + 1) * 0.14;
      const depthOpacity = 0.72 + (depthZ + 1) * 0.14;
      const zIndex = Math.round(15 + (depthZ + 1) * 16);

      return {
        domain,
        xPercent: x,
        yPercent: y,
        currentAngle,
        depthScale,
        depthOpacity,
        zIndex,
        rx,
        ry,
      };
    });
  }, [domains, rotationAngle, orbitGeometry, layoutMode]);

  const activeNodePos = useMemo(() => {
    const target = hoveredDomain || selectedDomain;
    if (!target) return null;
    return nodePositions.find((n) => n.domain.id === target.id) || null;
  }, [nodePositions, hoveredDomain, selectedDomain]);

  const activeColor =
    hoveredDomain?.visual?.color || selectedDomain?.visual?.color || "#00e3fd";

  if (selectedDomain) {
    return (
      <div className="w-full bg-[#020a14] text-[#d4e4fa] flex flex-col">
        <SolutionRail
          domains={allDomains}
          selectedDomain={selectedDomain}
          subdomains={subdomains}
          capabilities={capabilities}
          solutions={solutions}
          onSelectDomain={(domId) => {
            const d = allDomains.find((dm) => dm.id === domId);
            if (d) handleSelectDomain(d);
          }}
          onSelectSolution={(solId) => {
            onSelectSolution?.(solId);
          }}
          onResetToRoot={handleResetToRoot}
        />
      </div>
    );
  }

  return (
    <div className={styles.stageWrapper}>
      <div className={styles.threeCanvasContainer}>
        <UniversePlane activeColor={activeColor} isOrbiting={isOrbiting} />
      </div>

      <div className="sticky top-0 z-40 w-full">
        <DomainContextBanner
          domain={null}
          allDomains={bannerDomains}
          onSelectDomain={(domainItem) => {
            const domain = allDomains.find((item) => item.id === domainItem.id);
            if (domain) handleSelectDomain(domain);
          }}
          theme={theme}
          onResetRoot={handleResetToRoot}
          rightExtra={
            <div className="flex items-center gap-1.5 sm:gap-2 mr-1">
              <button
                onClick={() => setIsOrbiting((prev) => !prev)}
                aria-label={
                  isOrbiting ? "Pause Galaxy Orbit" : "Resume Galaxy Orbit"
                }
                className={`flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] sm:text-[11px] border transition-all cursor-pointer ${
                  isOrbiting
                    ? "bg-[#00e3fd]/15 text-[#00e3fd] border-[#00e3fd]/40 hover:bg-[#00e3fd]/25 shadow-[0_0_8px_rgba(0,227,253,0.2)] font-bold"
                    : "bg-[#031d33] text-[#c3d9ea] border-[#00dfff]/20 hover:text-white hover:border-[#00e3fd]/50"
                }`}
              >
                {isOrbiting ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
                <span className="hidden sm:inline">
                  {isOrbiting ? "Orbiting" : "Paused"}
                </span>
              </button>

              <div className="hidden md:flex items-center bg-[#07192c] rounded border border-[#00dfff]/20 p-0.5">
                {[0.5, 1, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setOrbitSpeed(spd)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      orbitSpeed === spd
                        ? "bg-[#00e3fd] text-[#001f24] font-bold"
                        : "text-[#9ec5de] hover:text-white"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setLayoutMode((prev) =>
                    prev === "single-oval" ? "dual-ring" : "single-oval",
                  )
                }
                aria-label="Toggle Orbit Alignment Shape"
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#07192c] border border-[#00dfff]/20 hover:border-[#00e3fd]/50 font-mono text-[10px] sm:text-[11px] text-[#c3d9ea] hover:text-[#00e3fd] transition-all cursor-pointer"
                title="Toggle Galaxy Oval Shape"
              >
                <RotateCw className="w-3 h-3 text-[#00e3fd]" />
                <span className="capitalize hidden sm:inline">
                  {layoutMode === "single-oval" ? "Oval" : "Spiral"}
                </span>
              </button>
            </div>
          }
        />
      </div>

      <div className="relative w-full flex-1 flex flex-col items-center justify-start pt-1 sm:pt-2 pb-6 px-4 z-20 overflow-hidden">
        <div
          className={styles.universeFieldContainer}
          onMouseEnter={() => {
            if (canHoverStageRef.current) {
              isHoveredStageRef.current = true;
            }
          }}
          onMouseLeave={() => {
            isHoveredStageRef.current = false;
          }}
        >
          <div className={styles.glowBackdrop} />
          <div className={styles.galaxyArmGlow} />

          <svg
            className={styles.svgGalaxyLayer}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="orbitGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00e3fd" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#76b6ff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ddb7ff" stopOpacity="0.3" />
              </linearGradient>

              <linearGradient
                id="innerOrbitGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00e3fd" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#bdf4ff" stopOpacity="0.1" />
              </linearGradient>

              <radialGradient id="laserGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={activeColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00e3fd" stopOpacity="0.2" />
              </radialGradient>

              <filter
                id="laserGlow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <line
              x1="50"
              y1="50"
              x2="4"
              y2="50"
              stroke="rgba(0, 227, 253, 0.1)"
              strokeDasharray="1,2"
            />
            <line
              x1="50"
              y1="50"
              x2="96"
              y2="50"
              stroke="rgba(0, 227, 253, 0.1)"
              strokeDasharray="1,2"
            />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="9"
              stroke="rgba(0, 227, 253, 0.08)"
              strokeDasharray="1,2"
            />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="91"
              stroke="rgba(0, 227, 253, 0.08)"
              strokeDasharray="1,2"
            />

            <ellipse
              cx="50"
              cy="50"
              rx={orbitGeometry.outerRx}
              ry={orbitGeometry.outerRy}
              fill="none"
              stroke="url(#orbitGrad)"
              strokeWidth="0.35"
              strokeDasharray={layoutMode === "single-oval" ? "none" : "1.5, 1"}
              className="transition-all duration-700"
            />

            <ellipse
              cx="50"
              cy="50"
              rx={orbitGeometry.outerRx}
              ry={orbitGeometry.outerRy}
              fill="none"
              stroke="#00e3fd"
              strokeWidth="0.8"
              strokeOpacity="0.08"
              filter="blur(1px)"
            />

            {layoutMode === "dual-ring" && (
              <ellipse
                cx="50"
                cy="50"
                rx={orbitGeometry.innerRx}
                ry={orbitGeometry.innerRy}
                fill="none"
                stroke="url(#innerOrbitGrad)"
                strokeWidth="0.3"
                strokeDasharray="1, 1.5"
                className="transition-all duration-700"
              />
            )}

            {activeNodePos && (
              <g filter="url(#laserGlow)">
                <line
                  x1="50"
                  y1="50"
                  x2={activeNodePos.xPercent}
                  y2={activeNodePos.yPercent}
                  stroke={activeColor}
                  strokeWidth="0.7"
                  strokeOpacity="0.85"
                  strokeDasharray="2, 1"
                  strokeDashoffset={-rotationAngle * 20}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="1.5"
                  fill={activeColor}
                  opacity="0.8"
                />
                <circle
                  cx={activeNodePos.xPercent}
                  cy={activeNodePos.yPercent}
                  r="2.0"
                  fill={activeColor}
                  opacity="0.9"
                />
              </g>
            )}
          </svg>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-auto">
            <IntentCore
              activeDomainColor={activeColor}
              onClick={() => onOpenIntentCore?.()}
              onSubmitIntent={(query) => onOpenIntentCore?.(query)}
            />
          </div>

          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {nodePositions.map(
              ({
                domain,
                xPercent,
                yPercent,
                depthScale,
                depthOpacity,
                zIndex,
              }) => (
                <DomainNode
                  key={domain.id}
                  domain={domain}
                  isSelected={selectedDomain?.id === domain.id}
                  isHovered={hoveredDomain?.id === domain.id}
                  isAnyHovered={hoveredDomain !== null}
                  xPercent={xPercent}
                  yPercent={yPercent}
                  depthScale={depthScale}
                  depthOpacity={depthOpacity}
                  zIndex={zIndex}
                  onSelect={handleSelectDomain}
                  onHover={setHoveredDomain}
                />
              ),
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[#00dfff]/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00dfff]" />
            <h2 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#eaf7ff]">
              L1 DOMAIN UNIVERSE • ALL {domains.length} BUSINESS WORLDS
            </h2>
          </div>
          <span className="text-xs font-mono text-[#c3d9ea]">
            Click any domain node in the 3D galaxy or select a card below to
            explore capabilities
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {domains.map((domain) => {
            const domColor = domain.visual?.color || "#00dfff";
            return (
              <button
                key={domain.id}
                onClick={() => handleSelectDomain(domain)}
                type="button"
                className="group relative flex flex-col justify-between p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer bg-[#020d1a]/85 hover:bg-[#031d33] border border-[#00dfff]/20 hover:border-[#00e3fd] hover:shadow-[0_0_20px_rgba(0,227,253,0.3)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="px-2 py-0.5 rounded-lg text-xs font-mono font-bold"
                      style={{
                        backgroundColor: `${domColor}20`,
                        color: domColor,
                        border: `1px solid ${domColor}40`,
                      }}
                    >
                      {domain.id}
                    </span>
                    <span className="text-[10px] font-mono text-[#9ec5de] uppercase">
                      L1 Domain
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-[#eaf7ff] group-hover:text-[#00e3fd] transition-colors mb-1.5">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-[#c3d9ea] line-clamp-2 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#00dfff]/15 flex items-center justify-between text-xs font-mono font-semibold text-[#00e3fd]">
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
