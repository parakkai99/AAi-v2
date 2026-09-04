import React from 'react';

export interface IntentCoreProps {
  logoSlot?: React.ReactNode;
  activeDomainColor?: string;
  onClick?: () => void;
}

export function ArchitectAnyLogo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none p-2 sm:p-2.5">
      <img
        src="/assets/architectany-logo.jpg"
        alt="ArchitectAny Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain rounded-full drop-shadow-[0_0_18px_rgba(0,227,253,0.7)]"
      />
    </div>
  );
}

export const IntentCore: React.FC<IntentCoreProps> = ({
  logoSlot,
  activeDomainColor = '#00e3fd',
  onClick,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label="ArchitectAny Intent Core - Center of Solution Universe"
      className="group relative flex flex-col items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-105 focus:outline-none"
    >
      {/* Dynamic Energy Corona */}
      <div
        className="absolute -inset-10 rounded-full opacity-30 blur-2xl transition-all duration-700 animate-pulse pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${activeDomainColor} 0%, rgba(0, 227, 253, 0.2) 50%, transparent 75%)`,
        }}
      />

      {/* Rotating Cybernetic Orbital Ring */}
      <div className="absolute -inset-4 rounded-full border border-[#00e3fd]/20 border-dashed animate-[spin_30s_linear_infinite] pointer-events-none" />
      <div className="absolute -inset-2 rounded-full border border-[#bdf4ff]/30 pointer-events-none" />

      {/* Pulsing Ripple Effect */}
      <div className="absolute inset-0 rounded-full bg-[#00e3fd]/15 animate-ping duration-1000 pointer-events-none" />

      {/* Core Disc Body */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#051424]/90 backdrop-blur-2xl border-2 border-[#00e3fd]/60 shadow-[0_0_40px_rgba(0,227,253,0.35),inset_0_0_25px_rgba(0,227,253,0.2)] flex items-center justify-center transition-all duration-300 group-hover:border-[#bdf4ff] group-hover:shadow-[0_0_55px_rgba(0,227,253,0.6)]">
        {logoSlot ? logoSlot : <ArchitectAnyLogo />}
      </div>

      {/* Tracked Monospace Intent Tag */}
      <div className="mt-2.5 flex flex-col items-center select-none">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] font-semibold text-[#00e3fd] uppercase drop-shadow-[0_0_8px_rgba(0,227,253,0.5)]">
          Intent
        </span>
        <span className="text-[9px] font-mono tracking-widest text-[#8f9095] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
          Core Vector
        </span>
      </div>
    </div>
  );
};
