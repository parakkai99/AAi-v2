import React from 'react';

export interface HeaderLogoProps {
  animated?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({
  animated = true,
  href = '#',
  onClick,
  className = '',
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`flex items-center gap-2.5 sm:gap-3 select-none cursor-pointer group shrink-0 focus:outline-none ${className}`}
      aria-label="ArchitectAny AAi Home"
    >
      {/* Animated 3D Logo Monogram */}
      <div
        className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#021827] via-[#032238] to-[#042d4d] border border-[#00e3fd]/40 p-1 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#00e3fd] group-hover:shadow-[0_0_25px_rgba(0,227,253,0.5)] ${
          animated
            ? 'shadow-[0_0_18px_rgba(0,227,253,0.3)] hover:scale-105'
            : ''
        }`}
      >
        {/* Ambient sweep highlight */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00e3fd]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        <img
          src="/assets/architectany-logo-sm.jpg"
          alt="ArchitectAny Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-lg shadow-inner"
        />
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-sans text-lg sm:text-xl font-black text-[#eaf7ff] tracking-tight leading-none group-hover:text-[#00e3fd] transition-colors">
            ArchitectAny
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00e3fd]/15 text-[#00e3fd] border border-[#00e3fd]/35 font-bold uppercase tracking-wider shadow-[0_0_8px_rgba(0,227,253,0.2)]">
            AAi
          </span>
        </div>
        <span className="text-[8.5px] sm:text-[9px] font-mono tracking-widest text-[#6e9bb3] uppercase font-medium mt-0.5 group-hover:text-[#94d4ec] transition-colors">
          Solution Universe
        </span>
      </div>
    </a>
  );
};
