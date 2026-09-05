/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Component: IntentCore
 * The central visual and cognitive heart of the Solution Universe (M01).
 * Features:
 *  - Stylized AAi A logo with continuous, elegant, subtle 3D rotational motion
 *  - Prominent, bold, visually dominant animated "I N T E N T" typography
 *  - "Turn ideas into real solutions" subtitle
 *  - Orbiting conceptual cognitive labels (IDEAS • PEOPLE • BUSINESS • TECHNOLOGY • SOLUTIONS • IMPACT)
 *  - Natural language quick-prompt input bar
 *  - Clicking triggers the inward cinematic journey into the dedicated Intent Core Home experience
 */

import React, { useState } from 'react';
import { ArrowRight, Sparkles, Search } from 'lucide-react';

export interface IntentCoreProps {
  activeDomainColor?: string;
  onClick?: () => void;
  onSubmitIntent?: (query: string) => void;
}

export function ArchitectAnyLogo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none p-1.5 sm:p-2">
      <img
        src="/assets/architectany-logo.jpg"
        alt="ArchitectAny AAi Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain rounded-full drop-shadow-[0_0_20px_rgba(0,227,253,0.8)]"
      />
    </div>
  );
}

export const IntentCore: React.FC<IntentCoreProps> = ({
  activeDomainColor = '#00e3fd',
  onClick,
  onSubmitIntent,
}) => {
  const [quickQuery, setQuickQuery] = useState('');

  const handleTrigger = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (quickQuery.trim() && onSubmitIntent) {
      onSubmitIntent(quickQuery.trim());
    } else if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTrigger();
    }
  };

  // Conceptual orbital labels orbiting around the center
  const orbitTags = [
    { label: 'IDEAS', delay: 0 },
    { label: 'PEOPLE', delay: 4 },
    { label: 'BUSINESS', delay: 8 },
    { label: 'TECHNOLOGY', delay: 12 },
    { label: 'SOLUTIONS', delay: 16 },
    { label: 'IMPACT', delay: 20 },
  ];

  return (
    <div
      role="region"
      aria-label="ArchitectAny Intent Core"
      className="group relative flex flex-col items-center justify-center select-none"
    >
      {/* 1. Deep Atmospheric Energy Corona */}
      <div
        className="absolute -inset-16 rounded-full opacity-35 blur-3xl pointer-events-none transition-all duration-1000 group-hover:opacity-60"
        style={{
          background: `radial-gradient(circle, ${activeDomainColor} 0%, rgba(0, 227, 253, 0.25) 45%, rgba(168, 85, 247, 0.15) 70%, transparent 85%)`,
        }}
      />

      {/* 2. Concentric Intelligent Orbit Rings with Orbiting Cognitive Markers */}
      <div className="absolute -inset-10 rounded-full border border-[#00e3fd]/20 border-dashed animate-[spin_55s_linear_infinite] pointer-events-none" />
      <div className="absolute -inset-6 rounded-full border border-[#38bdf8]/30 pointer-events-none" />
      <div className="absolute -inset-2 rounded-full border border-[#a855f7]/25 pointer-events-none" />

      {/* 3. Orbiting Conceptual Labels */}
      <div className="absolute -inset-12 pointer-events-none animate-[spin_40s_linear_infinite]">
        {orbitTags.map((tag, i) => {
          const angle = (i / orbitTags.length) * Math.PI * 2;
          const radius = 78;
          const x = 50 + Math.cos(angle) * (radius * 0.58);
          const y = 50 + Math.sin(angle) * (radius * 0.48);
          return (
            <span
              key={tag.label}
              className="absolute text-[8px] font-mono tracking-widest font-semibold px-1.5 py-0.5 rounded bg-[#020b18]/80 border border-[#00e3fd]/25 text-[#9ec5de] shadow-sm transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {tag.label}
            </span>
          );
        })}
      </div>

      {/* 4. Core Center Emblem with Subtle Continuous Rotation */}
      <div
        onClick={handleTrigger}
        tabIndex={0}
        role="button"
        aria-label="Enter ArchitectAny Intent Core"
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#031122]/95 backdrop-blur-2xl border-2 border-[#00e3fd]/70 shadow-[0_0_45px_rgba(0,227,253,0.45),inset_0_0_30px_rgba(0,227,253,0.25)] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 hover:border-[#ffffff] hover:shadow-[0_0_65px_rgba(0,227,253,0.7)] focus:outline-none"
      >
        {/* Subtle continuous 3D rotation of the stylized A around its center */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center animate-[spin_24s_linear_infinite]">
          <ArchitectAnyLogo />
        </div>
      </div>

      {/* 5. Typographic Dominance: Large Animated INTENT */}
      <div
        onClick={handleTrigger}
        className="mt-3 flex flex-col items-center text-center cursor-pointer group-hover:scale-105 transition-transform duration-300"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#7dd3fc] uppercase font-bold opacity-80 mb-0.5">
          AAi
        </span>

        {/* Large, bold, visually dominant word with breathing glow and light shimmer */}
        <div className="relative">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#00e3fd] to-[#bdf4ff] drop-shadow-[0_0_16px_rgba(0,227,253,0.75)] animate-pulse">
            INTENT
          </h2>
        </div>

        <p className="text-[10.5px] sm:text-xs font-mono text-[#9ec5de] tracking-wide mt-0.5 max-w-[240px]">
          Turn ideas into real solutions
        </p>
      </div>

      {/* 6. Center Interactive Quick-Prompt Trigger Bar */}
      <div className="mt-3 w-64 sm:w-80 relative z-20">
        <div className="relative flex items-center rounded-full bg-[#041426]/90 border border-[#00dfff]/35 shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:border-[#00e3fd] focus-within:border-[#00e3fd] focus-within:shadow-[0_0_25px_rgba(0,227,253,0.4)] transition-all p-1">
          <Search className="w-3.5 h-3.5 text-[#00e3fd] ml-2.5 shrink-0" />
          <input
            type="text"
            value={quickQuery}
            onChange={(e) => setQuickQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What do you want to create or solve?"
            className="w-full bg-transparent px-2.5 py-1 text-xs text-white placeholder-[#688ea8] focus:outline-none font-sans"
          />
          <button
            onClick={handleTrigger}
            type="button"
            aria-label="Submit Intent or Enter Intent Core"
            className="w-7 h-7 rounded-full bg-[#00e3fd] hover:bg-[#38bdf8] text-[#001f24] flex items-center justify-center shrink-0 transition-transform hover:scale-105 cursor-pointer shadow-sm"
          >
            <ArrowRight className="w-3.5 h-3.5 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};
