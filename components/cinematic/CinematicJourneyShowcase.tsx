/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Component: CinematicJourneyShowcase
 * Visual showcase and interactive preview panel for the 6 distinct spatial transitions:
 *   L1 → L2: UNIVERSE → GALAXY (Universe Dive)
 *   L2 → L3: GALAXY → STAR SYSTEM (Galaxy Approach)
 *   L3 → L4: STAR SYSTEM → PLANET (Star System Focus)
 *   L4 → L5: PLANET → CITY (Planet Reveal)
 *   L5 → L6: CITY → CONTROL CENTER (Operating Activation)
 *   INTENT: Quantum Core Singularity (Intent Journey)
 */

import React from 'react';
import { useCinematicNavigation } from '@/src/context/CinematicNavigationContext';
import {
  Compass,
  Rocket,
  Sparkles,
  ArrowRight,
  Globe,
  Orbit,
  Building2,
  Terminal,
  Cpu,
  Play,
} from 'lucide-react';

export const CinematicJourneyShowcase: React.FC = () => {
  const { startJourney, isTravelling } = useCinematicNavigation();

  const journeys = [
    {
      id: 'l1-l2',
      badge: 'L1 → L2',
      title: 'Universe Dive',
      sub: 'UNIVERSE → GALAXY',
      feeling: '“I entered this Business World.”',
      icon: Globe,
      color: '#00e3fd',
      trigger: () => {
        startJourney(
          {
            layer: 1,
            layerLabel: 'L1 Domain Universe',
            id: 'L1-UNIVERSE',
            name: 'ArchitectAny Solution Universe',
            code: 'L1',
            color: '#00e3fd',
            coordinates: { x: 50, y: 50, z: 0, sector: 'SEC-SOL-001' },
          },
          {
            layer: 2,
            layerLabel: 'L2 Business Sub-World',
            id: 'D06',
            name: 'Marketplace & Commerce Galaxy',
            code: 'D06',
            color: '#38bdf8',
            coordinates: { x: 75, y: 85, z: -800, sector: 'SEC-D06-GALAXY' },
            description: 'Swirling spiral galaxy with 12 business sub-world stellar arms',
          }
        );
      },
    },
    {
      id: 'l2-l3',
      badge: 'L2 → L3',
      title: 'Galaxy Approach',
      sub: 'GALAXY → STAR SYSTEM',
      feeling: '“I am approaching a capability inside this world.”',
      icon: Orbit,
      color: '#38bdf8',
      trigger: () => {
        startJourney(
          {
            layer: 2,
            layerLabel: 'L2 Business World',
            id: 'D06',
            name: 'Marketplace & Commerce',
            code: 'D06',
            color: '#38bdf8',
            coordinates: { x: 75, y: 85, z: -800, sector: 'SEC-D06-GALAXY' },
          },
          {
            layer: 3,
            layerLabel: 'L3 Capability Node',
            id: 'CAP-0601',
            name: 'Hyperlocal Event & Media Services',
            code: 'CAP-0601',
            color: '#818cf8',
            coordinates: { x: 120, y: 140, z: -1600, sector: 'SEC-CAP-0601' },
            description: 'Approaching the coronal capability star system and orbital planes',
          }
        );
      },
    },
    {
      id: 'l3-l4',
      badge: 'L3 → L4',
      title: 'Star System Focus',
      sub: 'STAR SYSTEM → PLANET',
      feeling: '“I entered the solution-bundle orbit.”',
      icon: Orbit,
      color: '#818cf8',
      trigger: () => {
        startJourney(
          {
            layer: 3,
            layerLabel: 'L3 Capability Star System',
            id: 'CAP-0601',
            name: 'Event & Media Services Star',
            code: 'CAP-0601',
            color: '#818cf8',
            coordinates: { x: 120, y: 140, z: -1600, sector: 'SEC-CAP-0601' },
          },
          {
            layer: 4,
            layerLabel: 'L4 Solution Bundle Planet',
            id: 'BUN-0601',
            name: 'Event Booking & Management Planet',
            code: 'BUN-0601',
            color: '#a855f7',
            coordinates: { x: 160, y: 190, z: -2400, sector: 'SEC-BUN-0601' },
            description: 'Geostationary orbital insertion around the planetary solution bundle',
          }
        );
      },
    },
    {
      id: 'l4-l5',
      badge: 'L4 → L5',
      title: 'Planet Reveal',
      sub: 'PLANET → CITY / SOLUTION',
      feeling: '“I have arrived at the actual solution.”',
      icon: Building2,
      color: '#a855f7',
      trigger: () => {
        startJourney(
          {
            layer: 4,
            layerLabel: 'L4 Solution Bundle Planet',
            id: 'BUN-0601',
            name: 'Event Booking Planet',
            code: 'BUN-0601',
            color: '#a855f7',
            coordinates: { x: 160, y: 190, z: -2400, sector: 'SEC-BUN-0601' },
          },
          {
            layer: 5,
            layerLabel: 'L5 Solution World',
            id: 'SOL-0601',
            name: 'Full-Stack Event Management Architecture',
            code: 'SOL-0601',
            color: '#ec4899',
            coordinates: { x: 200, y: 240, z: -3200, sector: 'SEC-SOL-0601' },
            description: 'Atmospheric entry and descent onto futuristic enterprise architectural spires',
          }
        );
      },
    },
    {
      id: 'l5-l6',
      badge: 'L5 → L6',
      title: 'City Arrival',
      sub: 'CITY → CONTROL CENTER',
      feeling: '“I am now inside the operating solution.”',
      icon: Terminal,
      color: '#10b981',
      trigger: () => {
        startJourney(
          {
            layer: 5,
            layerLabel: 'L5 Solution World',
            id: 'SOL-0601',
            name: 'Event Management Architecture',
            code: 'SOL-0601',
            color: '#ec4899',
            coordinates: { x: 200, y: 240, z: -3200, sector: 'SEC-SOL-0601' },
          },
          {
            layer: 6,
            layerLabel: 'L6 Control Center',
            id: 'CTRL-0601',
            name: 'Live Operational Control Center',
            code: 'L6-CTRL',
            color: '#10b981',
            coordinates: { x: 240, y: 280, z: -4000, sector: 'SEC-L6-CTRL' },
            description: 'HUD cockpit assembly and tactical operational telemetry activation',
          }
        );
      },
    },
    {
      id: 'intent',
      badge: 'M01 ↔ Core',
      title: 'Intent Journey',
      sub: 'CORE TO UNIVERSE',
      feeling: '“Entering the intelligence center.”',
      icon: Cpu,
      color: '#f59e0b',
      trigger: () => {
        startJourney(
          {
            layer: 1,
            layerLabel: 'L1 Domain Universe',
            id: 'L1-UNIVERSE',
            name: 'ArchitectAny Solution Universe',
            code: 'M01',
            color: '#00e3fd',
            coordinates: { x: 50, y: 50, z: 0, sector: 'SEC-UNIVERSE' },
          },
          {
            layer: 0,
            layerLabel: 'AAi Intent Core',
            id: 'INTENT-CORE',
            name: 'AAi Intelligence Core',
            code: 'INTENT',
            color: '#f59e0b',
            coordinates: { x: 50, y: 50, z: 0, sector: 'SEC-INTENT-CORE' },
            description: 'Quantum cognitive singularity inward dive to the living heart of AAi',
          }
        );
      },
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-30">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#00dfff]/20">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#041426] border border-[#00e3fd]/30 flex items-center justify-center">
            <Rocket className="w-3.5 h-3.5 text-[#00e3fd]" />
          </div>
          <div>
            <h2 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              CINEMATIC NAVIGATION JOURNEY (L1 → L6)
            </h2>
            <p className="text-[11px] text-[#9ec5de]">
              Every navigation feels like a real spatial journey. Not just a color change — a new world at every level.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00e3fd]/15 border border-[#00e3fd]/30 text-[#00e3fd] font-bold self-start sm:self-center">
          6 Distinct Spatial Transitions
        </span>
      </div>

      {/* 6 Journey Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {journeys.map((j) => {
          const Icon = j.icon;
          return (
            <div
              key={j.id}
              className="p-3 rounded-xl bg-[#020b18]/90 border border-[#00dfff]/20 hover:border-[#00e3fd] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${j.color}20`,
                      color: j.color,
                      border: `1px solid ${j.color}40`,
                    }}
                  >
                    {j.badge}
                  </span>
                  <Icon className="w-3.5 h-3.5 text-[#9ec5de] group-hover:text-white transition-colors" />
                </div>

                <h4 className="text-xs font-bold text-white font-sans truncate">{j.title}</h4>
                <div className="text-[9.5px] font-mono text-[#7dd3fc] mt-0.5">{j.sub}</div>
                <p className="text-[10px] text-[#82a5bb] italic mt-2 leading-tight line-clamp-2">
                  {j.feeling}
                </p>
              </div>

              <button
                onClick={j.trigger}
                disabled={isTravelling}
                className="mt-3 w-full py-1.5 px-2 rounded-lg bg-[#04162a] hover:bg-[#00e3fd] text-[#9ec5de] hover:text-[#001f24] border border-[#00dfff]/20 hover:border-transparent text-[10px] font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Preview</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
