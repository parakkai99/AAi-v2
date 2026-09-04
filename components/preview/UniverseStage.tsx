import React, { useState, useMemo, useEffect, useRef } from 'react';
import domainsData from '@/data/universe/domains.json';
import subdomainsData from '@/data/universe/subdomains.json';
import capabilitiesData from '@/data/universe/solution-capabilities.json';
import solutionsData from '@/data/universe/solutions.json';
import { Domain, Subdomain, SolutionCapability, Solution } from '@/src/types';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { UniversePlane } from './UniversePlane';
import { DomainNode } from './DomainNode';
import { IntentCore, ArchitectAnyLogo } from './IntentCore';
import { SolutionRail } from './SolutionRail';
import { Play, Pause, RotateCw, Compass, Eye, Sparkles } from 'lucide-react';
import styles from './UniverseStage.module.css';

export interface UniverseStageProps {
  initialDomainId?: string;
  onDomainSelect?: (domain: Domain) => void;
  onSelectSolution?: (solutionId: string) => void;
  searchQuery?: string;
}

export const UniverseStage: React.FC<UniverseStageProps> = ({
  initialDomainId = 'D06',
  onDomainSelect,
  onSelectSolution,
  searchQuery = '',
}) => {
  const { intent, setIntent } = useArchitectAny();
  const allDomains: Domain[] = (domainsData as unknown as Domain[]) || [];
  const subdomains: Subdomain[] = (subdomainsData as unknown as Subdomain[]) || [];
  const capabilities: SolutionCapability[] = (capabilitiesData as unknown as SolutionCapability[]) || [];
  const solutions: Solution[] = (solutionsData as unknown as Solution[]) || [];

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

  // Selected & Hovered State
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(() => {
    const targetId = intent.domainId || initialDomainId;
    return allDomains.find((d) => d.id === targetId) || allDomains[0] || null;
  });

  // Synchronize domain when intent changes externally (e.g. from Global Search)
  useEffect(() => {
    if (intent.domainId && selectedDomain?.id !== intent.domainId) {
      const match = allDomains.find((d) => d.id === intent.domainId);
      if (match) {
        setSelectedDomain(match);
      }
    }
  }, [intent.domainId, allDomains]);
  const [hoveredDomain, setHoveredDomain] = useState<Domain | null>(null);
  const solutionRailRef = useRef<HTMLDivElement>(null);

  // Galaxy Orbit Animation State
  const [isOrbiting, setIsOrbiting] = useState<boolean>(true);
  const [orbitSpeed, setOrbitSpeed] = useState<number>(1); // 0.5x, 1x, 2x
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [layoutMode, setLayoutMode] = useState<'single-oval' | 'dual-ring'>('single-oval');

  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isHoveredStageRef = useRef<boolean>(false);

  // Smooth galaxy orbit animation loop
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        // Slow gentle cosmic rotation: ~0.04 rad/s at 1x
        if (isOrbiting && !isHoveredStageRef.current) {
          const speedMultiplier = orbitSpeed * 0.045;
          setRotationAngle((prev) => (prev + delta * speedMultiplier) % (Math.PI * 2));
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

  const handleSelectDomain = (domain: Domain, shouldScroll: boolean = true) => {
    setSelectedDomain(domain);
    setIntent({
      query: '',
      rawQuery: '',
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

    if (shouldScroll) {
      setTimeout(() => {
        solutionRailRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 60);
    }
  };

  // Mathematical Ellipse Parameters for Perfect 3D Galaxy Alignment
  // Center is exactly (50%, 50%)
  const orbitGeometry = useMemo(() => {
    if (layoutMode === 'single-oval') {
      return {
        outerRx: 45.0, // 45.0% of container width (broad horizontal coverage)
        outerRy: 33.5, // 33.5% of container height (expanded vertical gap from center Intent Core)
        innerRx: 45.0,
        innerRy: 33.5,
      };
    }
    // Dual concentric galaxy rings / dual spiral
    return {
      outerRx: 46.5,
      outerRy: 35.0, // Expanded outer spiral height
      innerRx: 33.5,
      innerRy: 23.5, // Expanded inner spiral height
    };
  }, [layoutMode]);

  // Compute node coordinates along the 3D galaxy ellipse dynamically
  const nodePositions = useMemo(() => {
    const total = domains.length;
    const centerX = 50;
    const centerY = 50;
    const { outerRx, outerRy, innerRx, innerRy } = orbitGeometry;

    return domains.map((domain, index) => {
      // Base angle evenly spaced clockwise from the top (-PI/2)
      const baseAngle = (index / total) * (Math.PI * 2) - Math.PI / 2;
      const currentAngle = baseAngle + rotationAngle;

      const isInner =
        layoutMode === 'dual-ring' &&
        (domain.visual?.orbit === 'inner' || (domain.visual?.orbit === undefined && index % 2 !== 0));
      const rx = isInner ? innerRx : outerRx;
      const ry = isInner ? innerRy : outerRy;

      const x = centerX + rx * Math.cos(currentAngle);
      const y = centerY + ry * Math.sin(currentAngle);

      // 3D Perspective Depth Factor based on sin(currentAngle)
      // sin = -1 (top / deep background) -> sin = +1 (bottom / closest foreground)
      const depthZ = Math.sin(currentAngle);
      
      // Scale: 0.86 (back) to 1.14 (front)
      const depthScale = 0.86 + (depthZ + 1) * 0.14;
      // Opacity: 0.72 (back) to 1.0 (front)
      const depthOpacity = 0.72 + (depthZ + 1) * 0.14;
      // Z-Index: 12 (back) to 48 (front, passing in front of core at z=25)
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

  // Active domain's current coordinates for the laser energy beam
  const activeNodePos = useMemo(() => {
    const target = hoveredDomain || selectedDomain;
    if (!target) return null;
    return nodePositions.find((n) => n.domain.id === target.id) || null;
  }, [nodePositions, hoveredDomain, selectedDomain]);

  const activeColor = hoveredDomain?.visual?.color || selectedDomain?.visual?.color || '#00e3fd';

  return (
    <div className={styles.stageWrapper}>
      {/* 3D WebGL Background Layer */}
      <div className={styles.threeCanvasContainer}>
        <UniversePlane activeColor={activeColor} isOrbiting={isOrbiting} />
      </div>

      {/* 1. Compact Title & Galaxy Control Strip */}
      <div className="w-full py-2 px-4 sm:px-8 bg-[#051424]/85 backdrop-blur-md border-b border-[#45474b]/30 flex flex-wrap items-center justify-between gap-2 z-30 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00e3fd] animate-ping" />
          <p className="font-mono text-[11px] sm:text-xs text-[#c3c6cf] uppercase tracking-widest leading-none">
            <span className="text-[#00e3fd] font-bold">ARCHITECTANY GALAXY</span>
            <span className="mx-2 text-[#8f9095]/40">|</span>
            <span className="text-[#d4e4fa]">Solution Universe</span>
            <span className="hidden md:inline mx-2 text-[#8f9095]/40">|</span>
            <span className="hidden md:inline text-[#8f9095]">Start with intent → discover → compose</span>
          </p>
        </div>

        {/* Galaxy Interactive Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Orbit Play / Pause */}
          <button
            onClick={() => setIsOrbiting((prev) => !prev)}
            aria-label={isOrbiting ? 'Pause Galaxy Orbit' : 'Resume Galaxy Orbit'}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[10px] sm:text-[11px] border transition-all ${
              isOrbiting
                ? 'bg-[#00e3fd]/10 text-[#00e3fd] border-[#00e3fd]/40 hover:bg-[#00e3fd]/20 shadow-[0_0_12px_rgba(0,227,253,0.2)]'
                : 'bg-[#273647]/50 text-[#8f9095] border-[#45474b]/40 hover:text-[#d4e4fa]'
            }`}
          >
            {isOrbiting ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isOrbiting ? 'Orbiting' : 'Paused'}</span>
          </button>

          {/* Speed Presets */}
          <div className="hidden sm:flex items-center bg-[#0d2238] rounded border border-[#45474b]/40 p-0.5">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setOrbitSpeed(spd)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  orbitSpeed === spd
                    ? 'bg-[#00e3fd] text-[#001f24] font-bold'
                    : 'text-[#8f9095] hover:text-[#d4e4fa]'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Layout Mode (Single Oval / Dual Ring) */}
          <button
            onClick={() => setLayoutMode((prev) => (prev === 'single-oval' ? 'dual-ring' : 'single-oval'))}
            aria-label="Toggle Orbit Alignment Shape"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0d2238] border border-[#45474b]/40 hover:border-[#00e3fd]/40 font-mono text-[10px] sm:text-[11px] text-[#c3c6cf] hover:text-[#bdf4ff] transition-all"
            title="Toggle Galaxy Oval Shape"
          >
            <RotateCw className="w-3 h-3 text-[#00e3fd]" />
            <span className="capitalize">{layoutMode === 'single-oval' ? 'Perfect Oval' : 'Dual Spiral'}</span>
          </button>
        </div>
      </div>

      {/* 2. Central Universe Body */}
      <div className="relative w-full flex-grow flex items-center justify-center px-4 py-2 z-20 overflow-hidden">
        <div
          className={styles.universeFieldContainer}
          onMouseEnter={() => {
            isHoveredStageRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredStageRef.current = false;
          }}
        >
          {/* Glowing Atmospheric Backplane & Galaxy Dust */}
          <div className={styles.glowBackdrop} />
          <div className={styles.galaxyArmGlow} />

          {/* Precision SVG Galaxy Orbits & Laser Synapses */}
          <svg className={styles.svgGalaxyLayer} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e3fd" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#76b6ff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ddb7ff" stopOpacity="0.3" />
              </linearGradient>

              <linearGradient id="innerOrbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00e3fd" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#bdf4ff" stopOpacity="0.1" />
              </linearGradient>

              <radialGradient id="laserGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={activeColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00e3fd" stopOpacity="0.2" />
              </radialGradient>

              <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Galaxy Coordinate Radial Guides */}
            <line x1="50" y1="50" x2="4" y2="50" stroke="rgba(0, 227, 253, 0.1)" strokeDasharray="1,2" />
            <line x1="50" y1="50" x2="96" y2="50" stroke="rgba(0, 227, 253, 0.1)" strokeDasharray="1,2" />
            <line x1="50" y1="50" x2="50" y2="9" stroke="rgba(0, 227, 253, 0.08)" strokeDasharray="1,2" />
            <line x1="50" y1="50" x2="50" y2="91" stroke="rgba(0, 227, 253, 0.08)" strokeDasharray="1,2" />

            {/* Primary Galaxy Outer Orbit Ellipse (Exact Mathematical Alignment) */}
            <ellipse
              cx="50"
              cy="50"
              rx={orbitGeometry.outerRx}
              ry={orbitGeometry.outerRy}
              fill="none"
              stroke="url(#orbitGrad)"
              strokeWidth="0.35"
              strokeDasharray={layoutMode === 'single-oval' ? 'none' : '1.5, 1'}
              className="transition-all duration-700"
            />

            {/* Outer Orbit Glowing Halo Ring */}
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

            {/* Secondary Inner Orbit Ellipse if in dual-ring mode */}
            {layoutMode === 'dual-ring' && (
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

            {/* Dynamic Energy Laser Synapse connecting Intent Core (50, 50) to Active Node */}
            {activeNodePos && (
              <g filter="url(#laserGlow)">
                {/* Laser Glow Path */}
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
                {/* Core connection pulse point */}
                <circle cx="50" cy="50" r="1.5" fill={activeColor} opacity="0.8" />
                {/* Node connection target point */}
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

          {/* Center: Intent Core Component with 3D Depth Pinning */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-auto">
            <IntentCore
              logoSlot={<ArchitectAnyLogo />}
              activeDomainColor={activeColor}
              onClick={() => {
                if (domains[0]) handleSelectDomain(domains[0]);
              }}
            />
          </div>

          {/* Dynamically Placed Domain Worlds Aligned in Perfect 3D Galaxy Oval */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {nodePositions.map(({ domain, xPercent, yPercent, depthScale, depthOpacity, zIndex }) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Dynamic Solution Rail */}
      <div ref={solutionRailRef} id="solution-rail" className="w-full pb-4 sm:pb-6 z-30 shrink-0 scroll-mt-20">
        <SolutionRail
          domains={allDomains}
          selectedDomain={selectedDomain}
          subdomains={subdomains}
          capabilities={capabilities}
          solutions={solutions}
          onSelectDomain={(domId) => {
            const d = allDomains.find((dm) => dm.id === domId);
            if (d) handleSelectDomain(d, true);
          }}
          onSelectSolution={(solId) => {
            onSelectSolution?.(solId);
          }}
        />
      </div>
    </div>
  );
};

