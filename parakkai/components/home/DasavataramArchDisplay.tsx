/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React, { useState } from 'react';
import { Sparkles, Info, Shield, CheckCircle2 } from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';

interface DasavataramArchDisplayProps {
  activeTheme: ParakkaiThemeDefinition;
  onEnterSanctum: () => void;
}

export const DasavataramArchDisplay: React.FC<DasavataramArchDisplayProps> = ({
  activeTheme,
  onEnterSanctum
}) => {
  const avatars = parakkaiService.getDasavataramList();
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);

  const selectedAvatar = avatars.find((a) => a.id === selectedAvatarId);

  return (
    <div
      id="dasavataram-entrance-portal"
      className="w-full rounded-3xl border shadow-2xl p-6 sm:p-8 relative overflow-hidden transition-all select-none"
      style={{
        backgroundColor: `${activeTheme.colors.surfaceCanvas}`,
        borderColor: activeTheme.colors.borderGold
      }}
    >
      {/* Background Subtle Gradient & Light */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-sky-950/30 via-transparent to-black/60" />

      {/* Header Titles matching Image 1 & Image 2 */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sacred Temple Portal & Dasavataram Arch</span>
        </div>

        <h3
          className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold tracking-tight text-white"
          style={{ color: activeTheme.colors.textGold }}
        >
          அருள்மிகு ஸ்ரீதேவி பூதேவி சமேத மதுசூதன பெருமாள் திருக்கோவில் — பறக்கை
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-sans tracking-wide">
          ARULMIGU SREE DEVI BOODEVI SAMETHA MADUSOOTHANA PERUMAL TEMPLE - PARAKKAI
        </p>
      </div>

      {/* Main Arch Graphic & Sculptural Grid */}
      <div className="relative z-10 max-w-5xl mx-auto bg-slate-950/70 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
        {/* Top Arch Crown with Presiding Deities & Guardians */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pb-6 border-b border-slate-800">
          {/* Left Guardian: Sri Garuda */}
          <div className="p-4 rounded-xl border border-sky-900/60 bg-sky-950/30 text-center space-y-1 group hover:border-amber-400 transition-colors">
            <div className="text-2xl">🦅</div>
            <div className="text-xs font-bold text-amber-300 font-serif">ஸ்ரீ கருடன்</div>
            <div className="text-[10px] text-slate-400 font-mono">SRI GARUDA</div>
            <p className="text-[11px] text-slate-300 font-sans mt-1">
              Golden-winged divine mount standing on the left flank in reverence.
            </p>
          </div>

          {/* Center: Presiding Sanctorum Crest */}
          <div className="p-4 rounded-xl border-2 border-amber-500/50 bg-gradient-to-b from-amber-500/20 to-slate-900/80 text-center space-y-1.5 shadow-xl">
            <div className="text-3xl">🪷</div>
            <div className="text-xs sm:text-sm font-bold text-amber-300 font-serif">
              ஸ்ரீமன் நாராயணாய நம:
            </div>
            <div className="text-[10px] text-amber-200/80 font-mono tracking-wider">
              SRIMAN NARAYANAYA NAMAHA
            </div>
            <div className="text-xs text-slate-200 font-serif">
              Arulmigu Madhusoodhana Perumal with Sree Devi & Bhoodevi
            </div>
          </div>

          {/* Right Guardian: Sri Anjaneya */}
          <div className="p-4 rounded-xl border border-sky-900/60 bg-sky-950/30 text-center space-y-1 group hover:border-amber-400 transition-colors">
            <div className="text-2xl">🙏</div>
            <div className="text-xs font-bold text-amber-300 font-serif">ஸ்ரீ ஆஞ்சநேயர்</div>
            <div className="text-[10px] text-slate-400 font-mono">SRI ANJANEYA</div>
            <p className="text-[11px] text-slate-300 font-sans mt-1">
              Lord of Humility & Devotion standing with folded hands on the right.
            </p>
          </div>
        </div>

        {/* Dasavataram Arch Banner */}
        <div className="py-4 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-slate-900 border border-amber-500/40 text-xs font-serif font-bold text-amber-300 tracking-wider shadow">
            தசாவதாரம் • DASAVATARAM (Ten Divine Incarnations)
          </div>
        </div>

        {/* The 10 Avatars Grid matching Image 1 Arch Structure */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {avatars.map((av) => {
            const isSelected = selectedAvatarId === av.id;
            return (
              <button
                key={av.id}
                type="button"
                onClick={() => setSelectedAvatarId(isSelected ? null : av.id)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/20 shadow-lg scale-103'
                    : 'border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <span className="text-[10px] font-mono text-amber-400 font-bold">
                  {av.id}. {av.tamilName}
                </span>
                <span className="text-xs font-serif font-bold text-white mt-1">
                  {av.name.toUpperCase()}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 line-clamp-2 font-sans">
                  {av.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Avatar Detailed Card */}
        {selectedAvatar && (
          <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-start gap-3 animate-fadeIn">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-serif font-bold text-amber-300 text-sm">
                Avatar #{selectedAvatar.id}: {selectedAvatar.name} ({selectedAvatar.tamilName})
              </div>
              <p className="text-slate-300 font-sans leading-relaxed">
                {selectedAvatar.description} In Vaishnava iconography at Parakkai, each avatar is sculpted in relief on the entrance archway to remind pilgrims of divine protection across all cosmic ages.
              </p>
            </div>
          </div>
        )}

        {/* Enter Inner Sanctum CTA */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-sans">
            "Step into Grace — Crossing the threshold cleanses worldly burdens."
          </div>
          <button
            type="button"
            onClick={onEnterSanctum}
            className="px-4 py-2 rounded-xl text-xs font-serif font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
            style={{
              backgroundColor: activeTheme.colors.sacredGold,
              color: '#000'
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Enter Sanctum for Darshan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
