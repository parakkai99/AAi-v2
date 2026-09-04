import React from 'react';
import { Domain } from '@/src/types';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import {
  ShoppingCart,
  MapPin,
  Calendar,
  Monitor,
  Cpu,
  Sliders,
  Leaf,
  GraduationCap,
  Heart,
  CreditCard,
  Building2,
  Truck,
  Zap,
  PlayCircle,
  LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  shopping_cart: ShoppingCart,
  location_on: MapPin,
  event: Calendar,
  computer: Monitor,
  memory: Cpu,
  settings: Sliders,
  eco: Leaf,
  school: GraduationCap,
  favorite: Heart,
  payments: CreditCard,
  apartment: Building2,
  local_shipping: Truck,
  bolt: Zap,
  play_circle: PlayCircle,
};

export interface DomainNodeProps {
  domain: Domain;
  isSelected: boolean;
  isHovered: boolean;
  isAnyHovered: boolean;
  xPercent: number;
  yPercent: number;
  depthScale?: number;
  depthOpacity?: number;
  zIndex?: number;
  onSelect: (domain: Domain) => void;
  onHover: (domain: Domain | null) => void;
}

export const DomainNode: React.FC<DomainNodeProps> = ({
  domain,
  isSelected,
  isHovered,
  isAnyHovered,
  xPercent,
  yPercent,
  depthScale = 1.0,
  depthOpacity = 1.0,
  zIndex = 20,
  onSelect,
  onHover,
}) => {
  const { getDomainName, t } = useArchitectAny();
  const IconComponent = ICON_MAP[domain.icon] || Cpu;
  const color = domain.visual?.color || '#00e3fd';
  const glowColor = domain.visual?.glowColor || `${color}66`;

  const isSubdued = isAnyHovered && !isHovered && !isSelected;
  const effectiveScale = isSelected ? 1.22 : isHovered ? 1.18 : depthScale;
  const effectiveOpacity = isSubdued ? 0.32 : isSelected ? 1 : isHovered ? 1 : depthOpacity;

  const displayName = getDomainName(domain.id, domain.name);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Explore ${domain.name} domain (${domain.id})`}
      aria-pressed={isSelected}
      onClick={() => onSelect(domain)}
      onMouseEnter={() => onHover(domain)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(domain)}
      onBlur={() => onHover(null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(domain);
        }
      }}
      className="absolute cursor-pointer focus:outline-none select-none pointer-events-auto will-change-transform"
      style={{
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        zIndex: isSelected ? 50 : isHovered ? 45 : zIndex,
        opacity: effectiveOpacity,
        transform: `translate3d(-50%, -50%, 0) scale(${effectiveScale})`,
        transition: 'transform 0.15s ease-out, opacity 0.2s ease-out',
      }}
    >
      <div className="flex flex-col items-center group">
        {/* Domain ID Pill */}
        <div
          className={`font-mono text-[10px] sm:text-[11px] tracking-wider uppercase transition-all duration-300 mb-1.5 px-2 py-0.5 rounded ${
            isSelected
              ? 'text-white bg-[#00e3fd]/40 border border-[#00e3fd] shadow-[0_0_12px_rgba(0,227,253,0.6)] opacity-100 font-black'
              : isHovered
              ? 'text-white bg-white/20 border border-white/40 opacity-100 font-bold'
              : 'text-[#9eb1be] bg-[#021425]/60 border border-[#00dfff]/20 opacity-85 group-hover:opacity-100'
          }`}
        >
          {domain.id}
        </div>

        {/* Luminous Nucleus Sphere / Atmosphere Platform */}
        <div className="relative flex items-center justify-center">
          {/* Outer Atmosphere Glow Disc */}
          <div
            className={`absolute -inset-4 rounded-full blur-xl transition-all duration-500 pointer-events-none ${
              isSelected
                ? 'opacity-95 scale-135'
                : isHovered
                ? 'opacity-85 scale-125'
                : 'opacity-40 scale-100 group-hover:opacity-75'
            }`}
            style={{ backgroundColor: color }}
          />

          {/* Under-node Elliptical Surface Shadow & Orbit Footprint */}
          <div
            className="absolute -bottom-2.5 w-14 h-4 rounded-full blur-sm transition-opacity duration-300 pointer-events-none"
            style={{
              backgroundColor: color,
              opacity: isSelected ? 0.85 : isHovered ? 0.65 : 0.28,
            }}
          />

          {/* Nucleus Disc */}
          <div
            className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
              isSelected
                ? 'border-2 border-white ring-2 ring-offset-2 ring-offset-[#051424] shadow-[0_0_35px_#00e3fd]'
                : 'border border-white/30 group-hover:border-white/80'
            }`}
            style={{
              backgroundColor: 'rgba(3, 18, 33, 0.92)',
              boxShadow: isSelected
                ? `0 0 35px ${color}, inset 0 0 18px ${glowColor}`
                : isHovered
                ? `0 0 25px ${color}, inset 0 0 14px ${glowColor}`
                : `0 0 14px ${glowColor}`,
              color: color,
            }}
          >
            {/* Glowing Icon */}
            <IconComponent
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
                isHovered || isSelected ? 'scale-110' : 'scale-100'
              }`}
              style={{ color: isSelected ? '#ffffff' : color }}
            />

            {/* Selected Active Ring Pulse */}
            {isSelected && (
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-35 pointer-events-none"
                style={{ backgroundColor: color }}
              />
            )}
          </div>
        </div>

        {/* Domain Name Label (Enlarged & High-Contrast) */}
        <div className="text-center w-36 sm:w-44 mt-2 transition-all duration-300 pointer-events-none">
          <p
            className={`font-sans text-xs sm:text-[13px] md:text-sm leading-snug font-bold tracking-tight transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
              isSelected
                ? 'text-white font-extrabold drop-shadow-[0_0_12px_rgba(0,227,253,0.8)] scale-105'
                : isHovered
                ? 'text-[#f0f9ff] font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]'
                : 'text-[#d6e7f2] group-hover:text-white'
            }`}
          >
            {displayName}
          </p>
          {isSelected && (
            <span className="inline-block mt-0.5 text-[9.5px] sm:text-[10px] font-mono tracking-wider text-[#00e3fd] uppercase font-bold bg-[#00e3fd]/10 border border-[#00e3fd]/30 px-1.5 py-0.5 rounded">
              {t('active_vector')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
