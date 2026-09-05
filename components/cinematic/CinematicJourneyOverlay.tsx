/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Component: CinematicJourneyOverlay
 * The spatial hyperspace flight visualization and telemetry HUD for AAi navigation.
 * Implements DISTINCT spatial scale transitions for each layer:
 *   L1 → L2: UNIVERSE → GALAXY (Universe Dive)
 *   L2 → L3: GALAXY → STAR SYSTEM (Galaxy Approach)
 *   L3 → L4: STAR SYSTEM → PLANET / ORBIT (Star System Focus)
 *   L4 → L5: PLANET → CITY / SOLUTION WORLD (Planet Reveal / City Arrival)
 *   L5 → L6: CITY → CONTROL CENTER (Control Center Activation)
 *   INTENT: Quantum Singularity Inward/Outward Journey
 *   REVERSE: Reverse scale expansion and ascend velocities
 */

import React, { useEffect, useRef } from 'react';
import { useCinematicNavigation } from '@/src/context/CinematicNavigationContext';
import {
  JourneyScale,
  GalaxyMood,
  TransitionStyle,
} from '@/src/contracts/cinematic';
import {
  Compass,
  ArrowRight,
  Zap,
  FastForward,
  CheckCircle2,
  Navigation,
  Globe,
  Radio,
  Sparkles,
  Building2,
  Terminal,
  Orbit,
  Cpu,
} from 'lucide-react';

interface Palette {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  bgTint: string;
}

const MOOD_PALETTES: Record<string, Palette> = {
  CALM: {
    primary: '#00e3fd',
    secondary: '#38bdf8',
    accent: '#7dd3fc',
    glow: 'rgba(0, 227, 253, 0.45)',
    bgTint: 'rgba(2, 10, 22, 0.92)',
  },
  VIBRANT: {
    primary: '#a855f7',
    secondary: '#ec4899',
    accent: '#00e3fd',
    glow: 'rgba(168, 85, 247, 0.45)',
    bgTint: 'rgba(12, 4, 28, 0.92)',
  },
  ENERGETIC: {
    primary: '#f59e0b',
    secondary: '#f97316',
    accent: '#ef4444',
    glow: 'rgba(245, 158, 11, 0.45)',
    bgTint: 'rgba(22, 10, 3, 0.92)',
  },
  MYSTIC: {
    primary: '#c084fc',
    secondary: '#818cf8',
    accent: '#e879f9',
    glow: 'rgba(192, 132, 252, 0.45)',
    bgTint: 'rgba(8, 4, 24, 0.92)',
  },
  TECH: {
    primary: '#10b981',
    secondary: '#06b6d4',
    accent: '#34d399',
    glow: 'rgba(16, 185, 129, 0.45)',
    bgTint: 'rgba(2, 20, 16, 0.92)',
  },
  AURORA: {
    primary: '#06b6d4',
    secondary: '#22c55e',
    accent: '#a855f7',
    glow: 'rgba(6, 182, 212, 0.45)',
    bgTint: 'rgba(3, 16, 26, 0.92)',
  },
  // Legacy aliases
  'cyber-cosmic': {
    primary: '#00e3fd',
    secondary: '#38bdf8',
    accent: '#7dd3fc',
    glow: 'rgba(0, 227, 253, 0.45)',
    bgTint: 'rgba(2, 10, 22, 0.92)',
  },
  'deep-space-neon': {
    primary: '#a855f7',
    secondary: '#ec4899',
    accent: '#00e3fd',
    glow: 'rgba(168, 85, 247, 0.45)',
    bgTint: 'rgba(12, 4, 28, 0.92)',
  },
  'quantum-gold': {
    primary: '#f59e0b',
    secondary: '#fbbf24',
    accent: '#f97316',
    glow: 'rgba(245, 158, 11, 0.45)',
    bgTint: 'rgba(18, 10, 2, 0.92)',
  },
  'calm-astral': {
    primary: '#38bdf8',
    secondary: '#818cf8',
    accent: '#00e3fd',
    glow: 'rgba(56, 189, 248, 0.45)',
    bgTint: 'rgba(3, 15, 28, 0.92)',
  },
};

export const CinematicJourneyOverlay: React.FC = () => {
  const { journey, stage, isTravelling, skipJourney, config, prefersReducedMotion } =
    useCinematicNavigation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const moodKey = config.mood || 'CALM';
  const mood = MOOD_PALETTES[moodKey] || MOOD_PALETTES['CALM'];
  const primaryColor = journey?.destination.color || mood.primary;
  const secondaryColor = mood.secondary;

  // ESC key to skip flight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTravelling && config.allowSkip) {
        skipJourney();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTravelling, config.allowSkip, skipJourney]);

  // Distinct Spatial Canvas Animation Engine
  useEffect(() => {
    if (!isTravelling || !canvasRef.current || !journey) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const scale: JourneyScale = journey.scale || 'L1_TO_L2_UNIVERSE_DIVE';
    let tick = 0;

    // Procedural seeds for layer-specific elements
    // L1: 14 domain nodes
    const domainNodes = Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const radius = 220 + (i % 3) * 60;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * (radius * 0.55),
        color: ['#00e3fd', '#38bdf8', '#818cf8', '#a855f7', '#f59e0b', '#10b981', '#ec4899'][i % 7],
        size: 5 + (i % 4) * 2,
        isTarget: i === 5,
      };
    });

    // L2: Spiral galaxy arm stars (1200 points)
    const galaxyStars = Array.from({ length: 900 }).map((_, i) => {
      const arm = i % 3;
      const armOffset = (arm * Math.PI * 2) / 3;
      const r = Math.random() * (width * 0.45);
      const spiralAngle = r * 0.009 + armOffset + (Math.random() - 0.5) * 0.4;
      return {
        r,
        spiralAngle,
        speed: 0.002 + Math.random() * 0.003,
        size: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
      };
    });

    // L3: Capability star cluster nodes (8 star systems)
    const capabilitySystems = Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const dist = 140 + (i % 3) * 70;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * (dist * 0.65),
        name: `CAP-0${i + 1}`,
        size: i === 2 ? 14 : 6,
        isTarget: i === 2,
      };
    });

    // L4: Solution Bundle Planets orbiting
    const bundlePlanets = Array.from({ length: 5 }).map((_, i) => {
      const orbitR = 90 + i * 55;
      const speed = 0.015 / (i + 1);
      return {
        orbitR,
        speed,
        angle: (i * Math.PI) / 2.5,
        radius: 7 + i * 3,
        color: ['#38bdf8', '#00e3fd', '#818cf8', '#34d399', '#f59e0b'][i % 5],
        hasRings: i === 2,
        isTarget: i === 2,
      };
    });

    // L5: City spires / skyscraper wireframe columns
    const citySpires = Array.from({ length: 24 }).map((_, i) => {
      const xOffset = ((i - 12) / 12) * (width * 0.48);
      const spireHeight = 120 + Math.abs(Math.sin(i * 1.5)) * 260;
      const spireWidth = 24 + (i % 3) * 14;
      return {
        xOffset,
        spireHeight,
        spireWidth,
        lights: Array.from({ length: 8 }).map(() => Math.random() > 0.4),
        isCenter: Math.abs(i - 12) <= 1,
      };
    });

    // Universal background dust
    const bgDust = Array.from({ length: 180 }).map(() => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      vel: (Math.random() * 2 + 1) * (journey.direction === 'ascend' ? -1 : 1),
    }));

    const render = () => {
      tick++;
      const cx = width / 2;
      const cy = height / 2;
      const p = journey.progress / 100; // 0 to 1

      // Dark atmospheric canvas wipe
      ctx.fillStyle = mood.bgTint;
      ctx.fillRect(0, 0, width, height);

      // Render gentle background cosmic dust
      if (!prefersReducedMotion) {
        ctx.fillStyle = primaryColor;
        bgDust.forEach((star) => {
          star.y += star.vel * 0.8;
          if (star.y > height / 2) star.y = -height / 2;
          if (star.y < -height / 2) star.y = height / 2;
          ctx.globalAlpha = star.alpha * 0.4;
          ctx.fillRect(cx + star.x, cy + star.y, star.size, star.size);
        });
        ctx.globalAlpha = 1.0;
      }

      // =========================================================================
      // SCENE 1: L1 → L2: UNIVERSE → GALAXY (Universe Dive)
      // =========================================================================
      if (scale === 'L1_TO_L2_UNIVERSE_DIVE') {
        const universeRecede = Math.max(0, 1 - p * 1.8);
        const galaxyZoom = Math.min(1.0, Math.max(0, (p - 0.2) / 0.8));

        // 1. Cosmological universe field receding
        if (universeRecede > 0.02) {
          ctx.save();
          ctx.translate(cx, cy);
          domainNodes.forEach((node) => {
            if (node.isTarget) return;
            const distScale = 1 - p * 0.8;
            ctx.fillStyle = node.color;
            ctx.globalAlpha = universeRecede * 0.6;
            ctx.beginPath();
            ctx.arc(node.x * distScale, node.y * distScale, node.size * distScale, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.restore();
        }

        // 2. Selected domain expands into luminous Spiral Galaxy
        ctx.save();
        ctx.translate(cx, cy);
        const rot = tick * 0.008;
        const currentScale = 0.3 + galaxyZoom * 1.4;
        ctx.scale(currentScale, currentScale * 0.6); // 3D tilted galaxy disk

        // Galaxy Core Accretion Glow
        const coreGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 80 + galaxyZoom * 80);
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.2, primaryColor);
        coreGrad.addColorStop(0.6, secondaryColor);
        coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 160 + galaxyZoom * 60, 0, Math.PI * 2);
        ctx.fill();

        // Spiral Arms
        galaxyStars.forEach((star) => {
          const angle = star.spiralAngle + rot;
          const r = star.r * (0.4 + galaxyZoom * 0.8);
          const sx = Math.cos(angle) * r;
          const sy = Math.sin(angle) * r;

          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = star.alpha * Math.min(1, galaxyZoom * 1.5);
          ctx.beginPath();
          ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Arrival beacon lock at target business world arm
        if (p > 0.6) {
          const armAngle = rot + 1.2;
          const armX = Math.cos(armAngle) * 150;
          const armY = Math.sin(armAngle) * 150;
          ctx.strokeStyle = '#00e3fd';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(armX, armY, 16 + Math.sin(tick * 0.1) * 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // =========================================================================
      // SCENE 2: L2 → L3: GALAXY → STAR SYSTEM (Galaxy Approach)
      // =========================================================================
      else if (scale === 'L2_TO_L3_GALAXY_APPROACH') {
        const approachProgress = p;

        ctx.save();
        ctx.translate(cx, cy);

        // Constellation lines connecting capability star points
        ctx.strokeStyle = 'rgba(0, 227, 253, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        capabilitySystems.forEach((sys, i) => {
          const next = capabilitySystems[(i + 1) % capabilitySystems.length];
          ctx.moveTo(sys.x * (1 + approachProgress * 0.5), sys.y * (1 + approachProgress * 0.5));
          ctx.lineTo(next.x * (1 + approachProgress * 0.5), next.y * (1 + approachProgress * 0.5));
        });
        ctx.stroke();

        // Capability star points
        capabilitySystems.forEach((sys) => {
          const sysX = sys.x * (1 + approachProgress * 0.8);
          const sysY = sys.y * (1 + approachProgress * 0.8);

          if (sys.isTarget) {
            // Target Capability Star emerges dominant in center
            const targetX = sysX * (1 - approachProgress * 0.8);
            const targetY = sysY * (1 - approachProgress * 0.8);

            // Pulsing coronal star glow
            const starRadius = 18 + approachProgress * 36;
            const starGrad = ctx.createRadialGradient(targetX, targetY, 4, targetX, targetY, starRadius * 2);
            starGrad.addColorStop(0, '#ffffff');
            starGrad.addColorStop(0.3, primaryColor);
            starGrad.addColorStop(0.7, secondaryColor);
            starGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = starGrad;
            ctx.beginPath();
            ctx.arc(targetX, targetY, starRadius * 2, 0, Math.PI * 2);
            ctx.fill();

            // Concentric 3D orbital tracks emerging around star
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.lineWidth = 1;
            [40, 75, 110, 150].forEach((r, idx) => {
              ctx.beginPath();
              ctx.ellipse(targetX, targetY, r * (0.6 + approachProgress * 0.6), r * 0.45 * (0.6 + approachProgress * 0.6), 0.35, 0, Math.PI * 2);
              ctx.stroke();
            });
          } else {
            // Surrounding stars drift outwards
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = Math.max(0, 1 - approachProgress * 1.5);
            ctx.beginPath();
            ctx.arc(sysX, sysY, sys.size, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.restore();
      }

      // =========================================================================
      // SCENE 3: L3 → L4: STAR SYSTEM → PLANET ORBIT (Star System Focus)
      // =========================================================================
      else if (scale === 'L3_TO_L4_STAR_SYSTEM_ORBIT') {
        const orbitZoom = p;

        ctx.save();
        ctx.translate(cx, cy);

        // Distant Central Star drifting off-center
        const starOffsetX = -cx * 0.45 * orbitZoom;
        const starOffsetY = -cy * 0.3 * orbitZoom;
        const sunGrad = ctx.createRadialGradient(starOffsetX, starOffsetY, 8, starOffsetX, starOffsetY, 90);
        sunGrad.addColorStop(0, '#fff');
        sunGrad.addColorStop(0.4, '#f59e0b');
        sunGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(starOffsetX, starOffsetY, 90, 0, Math.PI * 2);
        ctx.fill();

        // Orbiting Solution Bundle Planets
        bundlePlanets.forEach((bp) => {
          bp.angle += bp.speed;

          if (bp.isTarget) {
            // Target Planet swells into massive spherical world
            const targetPlanetR = 24 + orbitZoom * 110;
            const px = Math.cos(bp.angle) * bp.orbitR * (1 - orbitZoom * 0.9);
            const py = Math.sin(bp.angle) * bp.orbitR * 0.4 * (1 - orbitZoom * 0.9);

            // Planetary spherical gradient
            const planetGrad = ctx.createRadialGradient(
              px - targetPlanetR * 0.3,
              py - targetPlanetR * 0.35,
              targetPlanetR * 0.1,
              px,
              py,
              targetPlanetR
            );
            planetGrad.addColorStop(0, '#eaf7ff');
            planetGrad.addColorStop(0.4, primaryColor);
            planetGrad.addColorStop(0.8, '#03172e');
            planetGrad.addColorStop(1, '#020914');

            ctx.fillStyle = planetGrad;
            ctx.beginPath();
            ctx.arc(px, py, targetPlanetR, 0, Math.PI * 2);
            ctx.fill();

            // Atmospheric limb halo
            ctx.strokeStyle = 'rgba(0, 227, 253, 0.6)';
            ctx.lineWidth = 3 + orbitZoom * 3;
            ctx.stroke();

            // Planetary Ring System in 3D perspective
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 4 + orbitZoom * 6;
            ctx.beginPath();
            ctx.ellipse(px, py, targetPlanetR * 2.1, targetPlanetR * 0.55, -0.25, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            // Non-target planets fade into distance
            const px = Math.cos(bp.angle) * bp.orbitR;
            const py = Math.sin(bp.angle) * bp.orbitR * 0.4;
            ctx.fillStyle = bp.color;
            ctx.globalAlpha = Math.max(0, 1 - orbitZoom * 1.6);
            ctx.beginPath();
            ctx.arc(px, py, bp.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.restore();
      }

      // =========================================================================
      // SCENE 4: L4 → L5: PLANET → CITY / SOLUTION WORLD (Planet Reveal / City Arrival)
      // =========================================================================
      else if (scale === 'L4_TO_L5_PLANET_TO_CITY') {
        ctx.save();
        ctx.translate(cx, cy);

        // Stage A: Atmospheric entry ionization streaks (0.0 -> 0.45)
        if (p < 0.5) {
          const entryAlpha = 1 - p * 2;
          ctx.strokeStyle = 'rgba(245, 158, 11, ' + entryAlpha * 0.7 + ')';
          ctx.lineWidth = 2;
          for (let i = 0; i < 20; i++) {
            const rx = (Math.random() - 0.5) * width;
            const ry = -height * 0.4 + Math.random() * height * 0.8;
            ctx.beginPath();
            ctx.moveTo(rx, ry);
            ctx.lineTo(rx + (Math.random() - 0.5) * 40, ry + 80);
            ctx.stroke();
          }
        }

        // Stage B: Ground Topography Grid & Rising City Spires (0.35 -> 1.0)
        const cityEmergence = Math.min(1.0, Math.max(0, (p - 0.3) / 0.7));

        // Digital metropolitan ground plane grid
        ctx.strokeStyle = 'rgba(0, 227, 253, ' + cityEmergence * 0.3 + ')';
        ctx.lineWidth = 1;
        const horizonY = height * 0.15;

        // Perspective grid lines
        for (let x = -width * 0.5; x <= width * 0.5; x += 60) {
          ctx.beginPath();
          ctx.moveTo(0, horizonY);
          ctx.lineTo(x * 2.5, height * 0.5);
          ctx.stroke();
        }

        // Rising Enterprise Architectural Spires
        citySpires.forEach((spire) => {
          const h = spire.spireHeight * cityEmergence;
          const w = spire.spireWidth;
          const x = spire.xOffset;
          const y = height * 0.45 - h;

          // Spire structure
          ctx.fillStyle = spire.isCenter
            ? 'rgba(0, 227, 253, 0.25)'
            : 'rgba(3, 24, 48, 0.85)';
          ctx.strokeStyle = spire.isCenter ? '#00e3fd' : 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = spire.isCenter ? 2 : 1;

          ctx.fillRect(x - w / 2, y, w, h);
          ctx.strokeRect(x - w / 2, y, w, h);

          // Center solution beacon beam shooting upward
          if (spire.isCenter && cityEmergence > 0.6) {
            const beamGrad = ctx.createLinearGradient(x, y, x, -height * 0.5);
            beamGrad.addColorStop(0, '#00e3fd');
            beamGrad.addColorStop(1, 'transparent');
            ctx.strokeStyle = beamGrad;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, -height * 0.5);
            ctx.stroke();
          }
        });
        ctx.restore();
      }

      // =========================================================================
      // SCENE 5: L5 → L6: CITY → CONTROL CENTER (Control Center Activation)
      // =========================================================================
      else if (scale === 'L5_TO_L6_CITY_TO_CONTROL_CENTER') {
        const hudProgress = p;

        ctx.save();
        ctx.translate(cx, cy);

        // Hexagonal Cockpit Grid Overlay
        ctx.strokeStyle = 'rgba(0, 227, 253, ' + hudProgress * 0.35 + ')';
        ctx.lineWidth = 1;
        const hexSize = 70;
        for (let q = -3; q <= 3; q++) {
          for (let r = -2; r <= 2; r++) {
            const hx = q * hexSize * 1.5;
            const hy = r * hexSize * Math.sqrt(3) + (q % 2) * (hexSize * Math.sqrt(3) * 0.5);
            ctx.beginPath();
            for (let a = 0; a < 6; a++) {
              const angle = (a * Math.PI) / 3;
              const px = hx + Math.cos(angle) * (hexSize * 0.5);
              const py = hy + Math.sin(angle) * (hexSize * 0.5);
              if (a === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
          }
        }

        // Tactical Circular Scopes & Operational HUD
        const scopeR = 120 + Math.sin(tick * 0.05) * 6;
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, scopeR, 0, Math.PI * 2);
        ctx.stroke();

        // Rotating radar sweep line
        const sweepAngle = tick * 0.08;
        ctx.strokeStyle = 'rgba(0, 227, 253, 0.8)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(sweepAngle) * scopeR, Math.sin(sweepAngle) * scopeR);
        ctx.stroke();

        // Four corner tactical brackets
        const bOffset = 180;
        const bLen = 30;
        ctx.strokeStyle = '#00e3fd';
        ctx.lineWidth = 3;
        [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ].forEach(([dx, dy]) => {
          const bx = dx * bOffset;
          const by = dy * bOffset;
          ctx.beginPath();
          ctx.moveTo(bx, by - dy * bLen);
          ctx.lineTo(bx, by);
          ctx.lineTo(bx - dx * bLen, by);
          ctx.stroke();
        });
        ctx.restore();
      }

      // =========================================================================
      // SCENE 6: INTENT JOURNEYS (Quantum Singularity Core Dive)
      // =========================================================================
      else if (scale === 'UNIVERSE_TO_INTENT_CORE' || scale === 'INTENT_CORE_TO_UNIVERSE') {
        const isInward = scale === 'UNIVERSE_TO_INTENT_CORE';
        const t = isInward ? p : 1 - p;

        ctx.save();
        ctx.translate(cx, cy);

        // Concentric cognitive intelligence rings spinning
        const labels = ['IDEAS', 'PEOPLE', 'BUSINESS', 'TECHNOLOGY', 'SOLUTIONS', 'IMPACT'];
        labels.forEach((lbl, idx) => {
          const r = 60 + idx * 36 * (1 + (1 - t) * 0.5);
          const spin = tick * 0.01 * (idx % 2 === 0 ? 1 : -1) + idx;

          ctx.strokeStyle = idx % 2 === 0 ? 'rgba(0, 227, 253, 0.4)' : 'rgba(168, 85, 247, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.stroke();

          // Particle on ring
          const px = Math.cos(spin) * r;
          const py = Math.sin(spin) * r;
          ctx.fillStyle = '#00e3fd';
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        });

        // Center Quantum Core Singularity
        const coreR = 40 + Math.sin(tick * 0.1) * 10 + t * 40;
        const coreGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, coreR);
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.4, '#00e3fd');
        coreGrad.addColorStop(0.8, '#a855f7');
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(0, 0, coreR, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // =========================================================================
      // SCENE 7: REVERSE JOURNEYS (Reverse camera velocity & scale expansion)
      // =========================================================================
      else {
        // Reverse ascent: Camera pulls backward and structures expand outward
        ctx.save();
        ctx.translate(cx, cy);
        const revProgress = 1 - p;

        // Expanding concentric rings
        for (let i = 1; i <= 6; i++) {
          const r = (i * 50 + tick * 2) % 350;
          ctx.strokeStyle = primaryColor;
          ctx.globalAlpha = Math.max(0, 1 - r / 350);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Outward star burst
        bgDust.forEach((star) => {
          const sx = star.x * (1 + revProgress * 1.5);
          const sy = star.y * (1 + revProgress * 1.5);
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = star.alpha;
          ctx.fillRect(sx, sy, star.size, star.size);
        });
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isTravelling, journey, stage, config, mood, primaryColor, secondaryColor, prefersReducedMotion]);

  if (!isTravelling || !journey) {
    return null;
  }

  // Resolve distinctive human-readable scale title
  const getScaleLabel = (scale: JourneyScale) => {
    switch (scale) {
      case 'L1_TO_L2_UNIVERSE_DIVE':
        return 'UNIVERSE → GALAXY • Universe Dive';
      case 'L2_TO_L3_GALAXY_APPROACH':
        return 'GALAXY → STAR SYSTEM • Galaxy Approach';
      case 'L3_TO_L4_STAR_SYSTEM_ORBIT':
        return 'STAR SYSTEM → PLANET ORBIT • Star System Focus';
      case 'L4_TO_L5_PLANET_TO_CITY':
        return 'PLANET → CITY / SOLUTION WORLD • Planet Reveal';
      case 'L5_TO_L6_CITY_TO_CONTROL_CENTER':
        return 'CITY → CONTROL CENTER • Operating Activation';
      case 'UNIVERSE_TO_INTENT_CORE':
        return 'UNIVERSE → INTENT CORE • Inward Cognitive Singularity';
      case 'INTENT_CORE_TO_UNIVERSE':
        return 'INTENT CORE → UNIVERSE • Outward Spatial Launch';
      case 'INTENT_CORE_TO_DOMAIN':
        return 'INTENT CORE → SOLUTION DOMAIN • Direct Intent Trajectory';
      case 'REVERSE_L6_TO_L5_CONTROL_TO_CITY':
        return 'CONTROL CENTER → CITY • Disengaging HUD Console';
      case 'REVERSE_L5_TO_L4_CITY_TO_PLANET':
        return 'CITY → PLANET ORBIT • Atmospheric Ascent';
      case 'REVERSE_L4_TO_L3_PLANET_TO_SYSTEM':
        return 'PLANET ORBIT → STAR SYSTEM • Orbital Exit';
      case 'REVERSE_L3_TO_L2_SYSTEM_TO_GALAXY':
        return 'STAR SYSTEM → GALAXY • Arm Macro Retreat';
      case 'REVERSE_L2_TO_L1_GALAXY_TO_UNIVERSE':
        return 'GALAXY → UNIVERSE • Cosmological Ascent';
      default:
        return 'TRANSIT • Solution Universe';
    }
  };

  return (
    <div
      role="dialog"
      aria-label="AAi Cinematic Spatial Flight"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-hidden cursor-default"
      style={{
        background: mood.bgTint,
        backdropFilter: prefersReducedMotion ? 'none' : 'blur(8px)',
      }}
    >
      {/* Background Interactive Spatial Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 1. Top Flight HUD Navigation Bar */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between border-b border-[#00dfff]/20 pb-3">
        {/* Left: AAi Spatial Flight Status */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#041224] border border-[#00dfff]/40 shadow-[0_0_12px_rgba(0,227,253,0.3)]">
            <Compass className="w-4 h-4 text-[#00e3fd] animate-[spin_10s_linear_infinite]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-wider text-white">
                AAi SPATIAL ENGINE
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#00e3fd]/15 border border-[#00e3fd]/30 text-[9px] font-mono text-[#00e3fd] uppercase font-semibold">
                {journey.metrics.warpFactor} Warp
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#7dd3fc]">
              {getScaleLabel(journey.scale)}
            </p>
          </div>
        </div>

        {/* Right: Telemetry metrics & Skip Flight */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end font-mono text-[11px]">
            <span className="text-[#9ec5de]">TRAJECTORY VELOCITY</span>
            <span className="font-bold text-[#00e3fd]">{journey.metrics.velocity}</span>
          </div>

          {config.allowSkip && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                skipJourney();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071d33] hover:bg-[#0c2f52] border border-[#00dfff]/30 hover:border-[#00e3fd] text-[11px] font-mono font-semibold text-[#c3d9ea] hover:text-white transition-all cursor-pointer shadow-sm"
              title="Press Esc or click to arrive instantly"
            >
              <FastForward className="w-3.5 h-3.5 text-[#00e3fd]" />
              <span>Skip Flight</span>
              <kbd className="hidden md:inline px-1 py-0.2 bg-[#020914] text-[9px] rounded text-[#7dd3fc]">
                ESC
              </kbd>
            </button>
          )}
        </div>
      </div>

      {/* 2. Center Spatial Reticle & Distinct Destination Hologram */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center max-w-2xl px-4 pointer-events-none">
        {/* Animated Concentric Cosmic Rings */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center mb-5">
          <div
            className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${
              stage === 'travelling'
                ? 'scale-125 opacity-70 border-[#00e3fd] animate-[spin_4s_linear_infinite]'
                : 'scale-90 opacity-30 border-[#00dfff]'
            }`}
          />
          <div
            className={`absolute inset-4 rounded-full border transition-all duration-500 ${
              stage === 'travelling'
                ? 'scale-110 opacity-80 border-[#38bdf8] animate-[spin_3s_linear_infinite_reverse]'
                : 'scale-95 opacity-40 border-[#00dfff]'
            }`}
          />
          <div
            className={`absolute inset-9 rounded-full border-2 transition-all duration-300 ${
              stage === 'travelling'
                ? 'border-[#00e3fd] shadow-[0_0_30px_rgba(0,227,253,0.6)]'
                : 'border-[#00dfff]/40'
            }`}
          />

          {/* Center Target Dynamic Emblem */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center p-2 shadow-[0_0_40px_rgba(0,227,253,0.5)] transition-transform duration-500 relative"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${primaryColor}, #020914)`,
              transform: stage === 'travelling' ? 'scale(1.2)' : 'scale(1.0)',
            }}
          >
            {stage === 'after' ? (
              <CheckCircle2 className="w-10 h-10 text-white animate-bounce" />
            ) : journey.scale === 'L4_TO_L5_PLANET_TO_CITY' ? (
              <Building2 className="w-8 h-8 text-white" />
            ) : journey.scale === 'L5_TO_L6_CITY_TO_CONTROL_CENTER' ? (
              <Terminal className="w-8 h-8 text-white" />
            ) : journey.scale === 'L3_TO_L4_STAR_SYSTEM_ORBIT' ? (
              <Orbit className="w-8 h-8 text-white" />
            ) : journey.destination.layer === 0 || journey.destination.id === 'INTENT-CORE' ? (
              <Cpu className="w-8 h-8 text-white" />
            ) : (
              <Navigation
                className={`w-8 h-8 text-white transition-transform duration-300 ${
                  journey.direction === 'descend' ? 'rotate-90' : '-rotate-90'
                }`}
              />
            )}
            <span className="text-[10px] font-mono font-bold text-white mt-1">
              {journey.destination.code || journey.destination.id}
            </span>
          </div>
        </div>

        {/* Stage Announcement */}
        <div className="space-y-2">
          {stage === 'before' && (
            <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-[#7dd3fc] uppercase animate-pulse">
              <Radio className="w-4 h-4 text-[#00e3fd]" />
              <span>[STAGE 1: BEFORE] • LOCKING SPATIAL COORDINATES</span>
            </div>
          )}

          {stage === 'travelling' && (
            <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-[#00e3fd] uppercase animate-pulse">
              <Zap className="w-4 h-4 text-[#00e3fd]" />
              <span>
                [STAGE 2: DURING] • TRAVELLING THE AAi UNIVERSE ({journey.progress}%)
              </span>
            </div>
          )}

          {stage === 'after' && (
            <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-[#34d399] uppercase">
              <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
              <span>[STAGE 3: AFTER] • DESTINATION REACHED</span>
            </div>
          )}

          {/* Journey Waypoints Path */}
          <div className="flex items-center justify-center gap-3 text-sm sm:text-base font-semibold text-white">
            <span className="text-[#9ec5de]">{journey.origin.name}</span>
            <ArrowRight className="w-4 h-4 text-[#00e3fd] shrink-0" />
            <span className="text-[#00e3fd]">{journey.destination.name}</span>
          </div>

          <p className="text-xs text-[#94a3b8] max-w-md mx-auto line-clamp-1">
            {journey.destination.description || 'Entering canonical capability space'}
          </p>
        </div>
      </div>

      {/* 3. Bottom Telemetry Flight Status Bar */}
      <div className="relative z-10 w-full max-w-4xl bg-[#041224]/85 border border-[#00dfff]/20 rounded-xl p-3.5 sm:p-4 shadow-[0_0_24px_rgba(0,0,0,0.6)]">
        {/* Progress Bar */}
        <div className="w-full bg-[#020914] h-2 rounded-full overflow-hidden border border-[#00dfff]/20 mb-3">
          <div
            className="h-full transition-all duration-100 ease-out"
            style={{
              width: `${journey.progress}%`,
              background: `linear-gradient(90deg, #00dfff 0%, ${primaryColor} 100%)`,
              boxShadow: `0 0 12px ${primaryColor}`,
            }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left font-mono text-xs">
          <div>
            <div className="text-[10px] text-[#9ec5de]">ORIGIN LAYER</div>
            <div className="font-bold text-[#eaf7ff] truncate">
              L{journey.origin.layer}: {journey.origin.name}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#9ec5de]">TARGET LAYER</div>
            <div className="font-bold text-[#00e3fd] truncate">
              L{journey.destination.layer}: {journey.destination.name}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#9ec5de]">SECTOR VECTOR</div>
            <div className="font-bold text-[#eaf7ff] truncate">
              {journey.destination.coordinates.sector}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#9ec5de]">WARP DISTANCE</div>
            <div className="font-bold text-[#38bdf8] truncate">
              {journey.metrics.distanceLy}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
