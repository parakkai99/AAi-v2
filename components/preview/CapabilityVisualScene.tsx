import React from 'react';

export interface CapabilityVisualSceneProps {
  id: string;
  name: string;
  theme?: 'dark' | 'light';
  accentColor?: string;
  className?: string;
}

export const CapabilityVisualScene: React.FC<CapabilityVisualSceneProps> = ({
  id,
  name,
  theme = 'dark',
  accentColor = '#00dfff',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const nameLower = (name || '').toLowerCase();
  const idLower = (id || '').toLowerCase();

  // Helper to determine category scene
  const isEvent = nameLower.includes('event') || nameLower.includes('media') || idLower.includes('01.01');
  const isHomeRepair = nameLower.includes('home') || nameLower.includes('repair') || nameLower.includes('handyman') || idLower.includes('01.02');
  const isFood = nameLower.includes('food') || nameLower.includes('dining') || nameLower.includes('restaurant') || idLower.includes('01.03');
  const isGrocery = nameLower.includes('grocery') || nameLower.includes('daily') || nameLower.includes('essentials') || idLower.includes('01.04');
  const isWellness = nameLower.includes('wellness') || nameLower.includes('lifestyle') || nameLower.includes('care') || nameLower.includes('spa') || idLower.includes('01.05');
  const isProfessional = nameLower.includes('professional') || nameLower.includes('legal') || nameLower.includes('consult') || idLower.includes('01.06');
  const isTransport = nameLower.includes('transport') || nameLower.includes('mobility') || nameLower.includes('fleet') || idLower.includes('01.07');
  const isRetail = nameLower.includes('retail') || nameLower.includes('commerce') || nameLower.includes('shop') || idLower.includes('01.08');
  const isAgri = nameLower.includes('agri') || nameLower.includes('farm') || nameLower.includes('agriculture') || idLower.includes('01.09');

  const baseGlow = isDark ? 'rgba(0, 227, 253, 0.25)' : 'rgba(99, 102, 241, 0.15)';
  const primaryFill = isDark ? '#00e3fd' : '#4f46e5';
  const secondaryFill = isDark ? '#a855f7' : '#ec4899';
  const warmFill = isDark ? '#fbbf24' : '#f59e0b';
  const greenFill = isDark ? '#34d399' : '#10b981';

  // 1. EVENT & MEDIA SCENE (Stage, spotlights, speakers, mic, confetti)
  if (isEvent) {
    return (
      <div className={`relative w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden rounded-xl ${isDark ? 'bg-gradient-to-b from-[#140b2e]/80 to-[#070314]/90' : 'bg-gradient-to-b from-purple-50 to-indigo-100/70'} ${className}`}>
        <svg viewBox="0 0 200 120" className="w-full h-full max-w-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="eventLightL" x1="20" y1="0" x2="80" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor={isDark ? '#c084fc' : '#a855f7'} stopOpacity={isDark ? '0.4' : '0.25'} />
              <stop offset="1" stopColor={isDark ? '#c084fc' : '#a855f7'} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="eventLightR" x1="180" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor={isDark ? '#00e3fd' : '#6366f1'} stopOpacity={isDark ? '0.4' : '0.25'} />
              <stop offset="1" stopColor={isDark ? '#00e3fd' : '#6366f1'} stopOpacity="0" />
            </linearGradient>
            <radialGradient id="stageGlow" cx="100" cy="95" r="50" gradientUnits="userSpaceOnUse">
              <stop stopColor={isDark ? '#a855f7' : '#818cf8'} stopOpacity={isDark ? '0.5' : '0.3'} />
              <stop offset="1" stopColor={isDark ? '#a855f7' : '#818cf8'} stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Spotlight Beams */}
          <polygon points="15,0 0,0 85,120 125,120" fill="url(#eventLightL)" />
          <polygon points="185,0 200,0 115,120 75,120" fill="url(#eventLightR)" />
          {/* Stage floor ellipse */}
          <ellipse cx="100" cy="98" rx="75" ry="18" fill="url(#stageGlow)" />
          <ellipse cx="100" cy="98" rx="65" ry="14" stroke={isDark ? '#a855f7' : '#6366f1'} strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Stage Podiums / Speakers */}
          <rect x="35" y="70" width="18" height="28" rx="3" fill={isDark ? '#2e1065' : '#c4b5fd'} stroke={isDark ? '#c084fc' : '#7c3aed'} strokeWidth="1.5" />
          <circle cx="44" cy="78" r="3.5" fill={isDark ? '#c084fc' : '#6d28d9'} />
          <circle cx="44" cy="90" r="4.5" fill={isDark ? '#c084fc' : '#6d28d9'} />

          <rect x="147" y="70" width="18" height="28" rx="3" fill={isDark ? '#2e1065' : '#c4b5fd'} stroke={isDark ? '#00e3fd' : '#6366f1'} strokeWidth="1.5" />
          <circle cx="156" cy="78" r="3.5" fill={isDark ? '#00e3fd' : '#4f46e5'} />
          <circle cx="156" cy="90" r="4.5" fill={isDark ? '#00e3fd' : '#4f46e5'} />

          {/* Center Stage Mic / Camera Icon & Stars */}
          <path d="M100 45 L100 78 M90 58 Q100 68 110 58 M100 78 L92 90 M100 78 L108 90" stroke={isDark ? '#eaf7ff' : '#1e1b4b'} strokeWidth="2.5" strokeLinecap="round" />
          <rect x="94" y="34" width="12" height="18" rx="6" fill={isDark ? '#c084fc' : '#8b5cf6'} stroke={isDark ? '#ffffff' : '#4c1d95'} strokeWidth="1.5" />
          {/* Confetti Particles */}
          <circle cx="65" cy="35" r="2" fill="#fbbf24" />
          <circle cx="135" cy="38" r="2" fill="#34d399" />
          <circle cx="80" cy="20" r="2.5" fill="#f43f5e" />
          <circle cx="120" cy="22" r="2.5" fill="#00e3fd" />
          <path d="M60 48 L65 52 M140 45 L135 50" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 2. HOME & REPAIR SERVICES (Blueprint home, wrench, hammer, gears)
  if (isHomeRepair) {
    return (
      <div className={`relative w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden rounded-xl ${isDark ? 'bg-gradient-to-b from-[#02182b]/80 to-[#010c18]/90' : 'bg-gradient-to-b from-sky-50 to-blue-100/70'} ${className}`}>
        <svg viewBox="0 0 200 120" className="w-full h-full max-w-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="homeGlow" cx="100" cy="60" r="50" gradientUnits="userSpaceOnUse">
              <stop stopColor={isDark ? '#00e3fd' : '#38bdf8'} stopOpacity={isDark ? '0.35' : '0.2'} />
              <stop offset="1" stopColor={isDark ? '#00e3fd' : '#38bdf8'} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="60" r="45" fill="url(#homeGlow)" />
          {/* House Structure */}
          <path d="M60 62 L100 28 L140 62 L140 98 L60 98 Z" fill={isDark ? '#032545' : '#bae6fd'} stroke={isDark ? '#00e3fd' : '#0284c7'} strokeWidth="2" strokeLinejoin="round" />
          <path d="M52 64 L100 22 L148 64" stroke={isDark ? '#38bdf8' : '#0369a1'} strokeWidth="3" strokeLinecap="round" />
          {/* Chimney */}
          <path d="M125 42 L125 32 L133 32 L133 48" stroke={isDark ? '#38bdf8' : '#0369a1'} strokeWidth="2" />
          {/* Door & Window */}
          <rect x="88" y="72" width="24" height="26" rx="2" fill={isDark ? '#00e3fd' : '#0284c7'} fillOpacity="0.4" stroke={isDark ? '#00e3fd' : '#0284c7'} strokeWidth="1.5" />
          <rect x="72" y="58" width="14" height="14" rx="2" fill={isDark ? '#38bdf8' : '#38bdf8'} fillOpacity="0.3" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" />
          <rect x="114" y="58" width="14" height="14" rx="2" fill={isDark ? '#38bdf8' : '#38bdf8'} fillOpacity="0.3" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" />
          {/* Wrench & Tool Overlay */}
          <path d="M135 75 L155 95 M150 72 L160 82 M130 92 L140 102" stroke={isDark ? '#fbbf24' : '#d97706'} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="45" cy="80" r="9" stroke={isDark ? '#a855f7' : '#7c3aed'} strokeWidth="2" strokeDasharray="3 2" />
        </svg>
      </div>
    );
  }

  // 3. FOOD & DINING SERVICES (Cloche cover, plate, fork, knife)
  if (isFood) {
    return (
      <div className={`relative w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden rounded-xl ${isDark ? 'bg-gradient-to-b from-[#2a1705]/80 to-[#120801]/90' : 'bg-gradient-to-b from-amber-50 to-orange-100/70'} ${className}`}>
        <svg viewBox="0 0 200 120" className="w-full h-full max-w-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="foodGlow" cx="100" cy="65" r="50" gradientUnits="userSpaceOnUse">
              <stop stopColor={isDark ? '#f59e0b' : '#fbbf24'} stopOpacity={isDark ? '0.4' : '0.25'} />
              <stop offset="1" stopColor={isDark ? '#f59e0b' : '#fbbf24'} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="65" r="45" fill="url(#foodGlow)" />
          {/* Cloche Dome */}
          <path d="M62 76 Q62 38 100 38 Q138 38 138 76 Z" fill={isDark ? '#78350f' : '#fed7aa'} stroke={isDark ? '#fbbf24' : '#ea580c'} strokeWidth="2" />
          {/* Cloche Handle Knob */}
          <circle cx="100" cy="34" r="5" fill={isDark ? '#fbbf24' : '#c2410c'} />
          {/* Serving Plate Rim */}
          <ellipse cx="100" cy="80" rx="55" ry="8" fill={isDark ? '#451a03' : '#ffedd5'} stroke={isDark ? '#fbbf24' : '#ea580c'} strokeWidth="2.5" />
          {/* Fork on Left */}
          <path d="M40 45 L40 88 M36 45 L36 60 Q40 65 40 65 Q40 65 44 60 L44 45" stroke={isDark ? '#fcd34d' : '#9a3412'} strokeWidth="2" strokeLinecap="round" />
          {/* Knife on Right */}
          <path d="M160 45 Q165 60 160 70 L160 88" stroke={isDark ? '#fcd34d' : '#9a3412'} strokeWidth="2" strokeLinecap="round" />
          {/* Aroma / Steam lines */}
          <path d="M85 24 Q82 18 88 14 M100 22 Q97 16 103 12 M115 24 Q112 18 118 14" stroke={isDark ? '#fbbf24' : '#ea580c'} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 4. GROCERY & DAILY NEEDS (Basket with fresh fruits, carrots, produce, bread)
  if (isGrocery) {
    return (
      <div className={`relative w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden rounded-xl ${isDark ? 'bg-gradient-to-b from-[#062419]/80 to-[#02120b]/90' : 'bg-gradient-to-b from-emerald-50 to-green-100/70'} ${className}`}>
        <svg viewBox="0 0 200 120" className="w-full h-full max-w-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grocGlow" cx="100" cy="65" r="45" gradientUnits="userSpaceOnUse">
              <stop stopColor={isDark ? '#34d399' : '#10b981'} stopOpacity={isDark ? '0.4' : '0.2'} />
              <stop offset="1" stopColor={isDark ? '#34d399' : '#10b981'} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="65" r="45" fill="url(#grocGlow)" />
          {/* Produce inside basket */}
          <circle cx="85" cy="52" r="14" fill={isDark ? '#ef4444' : '#dc2626'} />
          <circle cx="115" cy="50" r="13" fill={isDark ? '#f59e0b' : '#d97706'} />
          <path d="M96 32 Q105 45 102 58" stroke={isDark ? '#22c55e' : '#16a34a'} strokeWidth="3" strokeLinecap="round" />
          {/* Carrot top */}
          <path d="M125 35 L135 55 M128 32 L128 40 M122 35 L128 40" stroke={isDark ? '#10b981' : '#059669'} strokeWidth="2" strokeLinecap="round" />
          {/* Grocery Crate / Basket */}
          <path d="M55 58 L145 58 L136 94 L64 94 Z" fill={isDark ? '#064e3b' : '#a7f3d0'} stroke={isDark ? '#34d399' : '#059669'} strokeWidth="2.5" strokeLinejoin="round" />
          {/* Crate slats */}
          <line x1="58" y1="70" x2="142" y2="70" stroke={isDark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <line x1="61" y1="82" x2="139" y2="82" stroke={isDark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          {/* Basket handle */}
          <path d="M75 58 Q100 24 125 58" stroke={isDark ? '#6ee7b7' : '#047857'} strokeWidth="2" fill="none" strokeDasharray="4 2" />
        </svg>
      </div>
    );
  }

  // 5. LIFESTYLE & WELLNESS (Balanced smooth zen stones, blooming lotus flower, calm water ripples)
  if (isWellness) {
    return (
      <div className={`relative w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden rounded-xl ${isDark ? 'bg-gradient-to-b from-[#022026]/80 to-[#010f13]/90' : 'bg-gradient-to-b from-teal-50 to-cyan-100/70'} ${className}`}>
        <svg viewBox="0 0 200 120" className="w-full h-full max-w-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="wellGlow" cx="100" cy="70" r="50" gradientUnits="userSpaceOnUse">
              <stop stopColor={isDark ? '#06b6d4' : '#14b8a6'} stopOpacity={isDark ? '0.4' : '0.25'} />
              <stop offset="1" stopColor={isDark ? '#06b6d4' : '#14b8a6'} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="70" r="45" fill="url(#wellGlow)" />
          {/* Water Ripples */}
          <ellipse cx="100" cy="95" rx="70" ry="10" stroke={isDark ? '#06b6d4' : '#0d9488'} strokeWidth="1.5" strokeOpacity="0.4" />
          <ellipse cx="100" cy="95" rx="45" ry="6" stroke={isDark ? '#22d3ee' : '#0f766e'} strokeWidth="1.5" strokeOpacity="0.6" />
          {/* Stacked Zen Stones */}
          <ellipse cx="80" cy="85" rx="26" ry="10" fill={isDark ? '#164e63' : '#99f6e4'} stroke={isDark ? '#22d3ee' : '#0f766e'} strokeWidth="2" />
          <ellipse cx="80" cy="72" rx="20" ry="8" fill={isDark ? '#155e75' : '#5eead4'} stroke={isDark ? '#22d3ee' : '#0f766e'} strokeWidth="2" />
          <ellipse cx="80" cy="61" rx="14" ry="6" fill={isDark ? '#0e7490' : '#2dd4bf'} stroke={isDark ? '#67e8f9' : '#0d9488'} strokeWidth="2" />
          {/* Blooming Lotus Flower on Right */}
          <path d="M130 85 C115 75 120 55 130 50 C140 55 145 75 130 85 Z" fill={isDark ? '#ec4899' : '#f472b6'} stroke={isDark ? '#fbcfe8' : '#db2777'} strokeWidth="1.5" />
          <path d="M120 85 C105 80 105 65 115 60 C125 65 125 78 120 85 Z" fill={isDark ? '#db2777' : '#f472b6'} fillOpacity="0.7" stroke={isDark ? '#fbcfe8' : '#be185d'} strokeWidth="1.2" />
          <path d="M140 85 C155 80 155 65 145 60 C135 65 135 78 140 85 Z" fill={isDark ? '#db2777' : '#f472b6'} fillOpacity="0.7" stroke={isDark ? '#fbcfe8' : '#be185d'} strokeWidth="1.2" />
          <circle cx="130" cy="65" r="3" fill="#fde047" />
        </svg>
      </div>
    );
  }

  // 6. PROFESSIONAL LOCAL SERVICES (Pillars, briefcase, certificate)
  if (isProfessional) {
    return (
      <div className={`relative w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden rounded-xl ${isDark ? 'bg-gradient-to-b from-[#18112e]/80 to-[#0c0819]/90' : 'bg-gradient-to-b from-violet-50 to-purple-100/70'} ${className}`}>
        <svg viewBox="0 0 200 120" className="w-full h-full max-w-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="60" r="45" fill={isDark ? '#3b0764' : '#ede9fe'} fillOpacity="0.4" />
          {/* Building Pediment & Columns */}
          <polygon points="100,28 60,45 140,45" fill={isDark ? '#6b21a8' : '#c4b5fd'} stroke={isDark ? '#c084fc' : '#7c3aed'} strokeWidth="2" />
          <rect x="70" y="48" width="10" height="35" rx="1" fill={isDark ? '#581c87' : '#ddd6fe'} stroke={isDark ? '#c084fc' : '#7c3aed'} strokeWidth="1.5" />
          <rect x="95" y="48" width="10" height="35" rx="1" fill={isDark ? '#581c87' : '#ddd6fe'} stroke={isDark ? '#c084fc' : '#7c3aed'} strokeWidth="1.5" />
          <rect x="120" y="48" width="10" height="35" rx="1" fill={isDark ? '#581c87' : '#ddd6fe'} stroke={isDark ? '#c084fc' : '#7c3aed'} strokeWidth="1.5" />
          <rect x="55" y="83" width="90" height="8" rx="2" fill={isDark ? '#6b21a8' : '#a78bfa'} stroke={isDark ? '#c084fc' : '#7c3aed'} strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // 7. LOCAL TRANSPORT & MOBILITY (Van, pin, route)
  if (isTransport) {
    return (
      <div className={`relative w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden rounded-xl ${isDark ? 'bg-gradient-to-b from-[#031d28]/80 to-[#010e14]/90' : 'bg-gradient-to-b from-blue-50 to-cyan-100/70'} ${className}`}>
        <svg viewBox="0 0 200 120" className="w-full h-full max-w-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 95 Q100 88 160 95" stroke={isDark ? '#00e3fd' : '#0284c7'} strokeWidth="2" strokeDasharray="4 3" />
          {/* Van Body */}
          <path d="M55 78 L55 52 L115 52 L135 65 L145 65 L145 78 Z" fill={isDark ? '#03395b' : '#7dd3fc'} stroke={isDark ? '#00e3fd' : '#0369a1'} strokeWidth="2" strokeLinejoin="round" />
          <polygon points="116,55 132,65 116,65" fill={isDark ? '#00e3fd' : '#38bdf8'} fillOpacity="0.4" />
          {/* Wheels */}
          <circle cx="75" cy="80" r="9" fill={isDark ? '#010e14' : '#0f172a'} stroke={isDark ? '#00e3fd' : '#0284c7'} strokeWidth="2" />
          <circle cx="125" cy="80" r="9" fill={isDark ? '#010e14' : '#0f172a'} stroke={isDark ? '#00e3fd' : '#0284c7'} strokeWidth="2" />
          {/* Location Pin */}
          <path d="M100 24 C94 24 90 28 90 34 C90 42 100 50 100 50 C100 50 110 42 110 34 C110 28 106 24 100 24 Z" fill={isDark ? '#f43f5e' : '#e11d48'} stroke="#ffffff" strokeWidth="1" />
          <circle cx="100" cy="33" r="3" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  // 8. AGRICULTURE & AGRI SERVICES (Tractor, crops, field, sun)
  if (isAgri) {
    return (
      <div className={`relative w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden rounded-xl ${isDark ? 'bg-gradient-to-b from-[#1c2405]/80 to-[#0e1202]/90' : 'bg-gradient-to-b from-lime-50 to-emerald-100/70'} ${className}`}>
        <svg viewBox="0 0 200 120" className="w-full h-full max-w-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rising Sun */}
          <circle cx="100" cy="45" r="16" fill={isDark ? '#facc15' : '#eab308'} />
          {/* Rolling Hills / Furrows */}
          <path d="M30 95 Q65 75 100 90 Q135 75 170 95" stroke={isDark ? '#84cc16' : '#65a30d'} strokeWidth="2.5" />
          <path d="M40 85 Q75 68 110 80 Q145 68 165 85" stroke={isDark ? '#a3e635' : '#4d7c0f'} strokeWidth="1.5" strokeOpacity="0.6" />
          {/* Wheat Stalks */}
          <path d="M75 75 C72 65 65 60 60 62 M75 70 C78 62 85 58 88 62 M75 80 L75 50" stroke={isDark ? '#facc15' : '#ca8a04'} strokeWidth="2" strokeLinecap="round" />
          <path d="M125 75 C122 65 115 60 110 62 M125 70 C128 62 135 58 138 62 M125 80 L125 50" stroke={isDark ? '#facc15' : '#ca8a04'} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // DEFAULT / GENERAL CAPABILITY SCENE (Cosmic core node, cyber matrix, capability circuits)
  return (
    <div className={`relative w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden rounded-xl ${isDark ? 'bg-gradient-to-b from-[#031c33]/80 to-[#010a14]/90' : 'bg-gradient-to-b from-slate-50 to-indigo-50/70'} ${className}`}>
      <svg viewBox="0 0 200 120" className="w-full h-full max-w-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="60" r="38" fill={isDark ? '#00e3fd' : '#6366f1'} fillOpacity={isDark ? '0.15' : '0.1'} />
        {/* Isometric Cube Node */}
        <polygon points="100,32 132,48 100,64 68,48" fill={isDark ? '#00e3fd' : '#818cf8'} fillOpacity="0.7" stroke={isDark ? '#eaf7ff' : '#4f46e5'} strokeWidth="1.5" />
        <polygon points="68,48 100,64 100,96 68,80" fill={isDark ? '#03416b' : '#c7d2fe'} stroke={isDark ? '#00e3fd' : '#4f46e5'} strokeWidth="1.5" />
        <polygon points="132,48 100,64 100,96 132,80" fill={isDark ? '#02243d' : '#a5b4fc'} stroke={isDark ? '#00e3fd' : '#4f46e5'} strokeWidth="1.5" />
        {/* Circuit nodes */}
        <circle cx="45" cy="60" r="3.5" fill={isDark ? '#a855f7' : '#8b5cf6'} />
        <circle cx="155" cy="60" r="3.5" fill={isDark ? '#00e3fd' : '#3b82f6'} />
        <line x1="48.5" y1="60" x2="68" y2="60" stroke={isDark ? '#a855f7' : '#8b5cf6'} strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="132" y1="60" x2="151.5" y2="60" stroke={isDark ? '#00e3fd' : '#3b82f6'} strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    </div>
  );
};
