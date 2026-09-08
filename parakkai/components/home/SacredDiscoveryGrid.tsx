/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React from 'react';
import {
  Video,
  Sparkles,
  Flame,
  Users,
  Trees,
  ArrowRight,
  ShieldCheck,
  Play
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';

interface SacredDiscoveryGridProps {
  activeTheme: ParakkaiThemeDefinition;
  onNavigate: (view: string) => void;
  onOpenVideoModal?: (mediaId: string) => void;
}

export const SacredDiscoveryGrid: React.FC<SacredDiscoveryGridProps> = ({
  activeTheme,
  onNavigate,
  onOpenVideoModal
}) => {
  return (
    <section id="sacred-discovery-grid" className="w-full space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white" style={{ color: activeTheme.colors.textGold }}>
              Living Parakkai Ecosystem
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-sky-950/80 text-sky-300 border border-sky-800">
              Image 1 Foundation
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Temple, Sacred Lake, Living Traditions, Village Community, and Ecological Heritage
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('media')}
          className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium cursor-pointer self-start sm:self-auto"
        >
          <span>Explore All Features</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5 Card Grid matching Image 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: LIVE DARSHAN / Latest Recorded Darshan (Respecting Truthfulness Rule) */}
        <div
          onClick={() => onNavigate('media')}
          className="group relative rounded-2xl border overflow-hidden p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-101 cursor-pointer"
          style={{
            backgroundColor: `${activeTheme.colors.surfaceElevated}`,
            borderColor: activeTheme.colors.borderGold
          }}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Video className="w-24 h-24 text-amber-400" />
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              {/* Honest Truthful Status Badge */}
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Latest Darshan Archive</span>
              </span>
              <span className="text-xs text-slate-400 font-sans">Updated Daily</span>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                LIVE DARSHAN
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Watch the latest sacred Alankaram, morning deeparadhana, and sanctum chanting of Sri Madhusoodhana Perumal.
              </p>
            </div>
          </div>

          <div className="pt-6 relative z-10 flex items-center justify-between">
            <span className="text-xs font-medium text-amber-300 flex items-center gap-1">
              <Play className="w-3.5 h-3.5 fill-amber-300" />
              <span>Watch Video Seva</span>
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Card 2: Parakkai Temple Lake */}
        <div
          onClick={() => onNavigate('map')}
          className="group relative rounded-2xl border overflow-hidden p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-101 cursor-pointer"
          style={{
            backgroundColor: `${activeTheme.colors.surfaceElevated}`,
            borderColor: activeTheme.colors.borderSubtle
          }}
        >
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Sacred Theertham
              </span>
              <span className="text-xs text-slate-400 font-sans">Heritage Lake</span>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-serif font-bold text-white group-hover:text-sky-300 transition-colors">
                Parakkai Temple Lake
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                A Sacred Surrounding. Serene waters home to seasonal migratory birds, water lilies, and the holy ritual bath traditions of pilgrims.
              </p>
            </div>
          </div>

          <div className="pt-6 relative z-10 flex items-center justify-between">
            <span className="text-xs font-medium text-sky-300 flex items-center gap-1">
              <span>View Lake & Theertham Map</span>
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-300 group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Card 3: Festival — Tradition Lives On */}
        <div
          onClick={() => onNavigate('events')}
          className="group relative rounded-2xl border overflow-hidden p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-101 cursor-pointer"
          style={{
            backgroundColor: `${activeTheme.colors.surfaceElevated}`,
            borderColor: activeTheme.colors.borderSubtle
          }}
        >
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Panguni & Ekadasi
              </span>
              <span className="text-xs text-slate-400 font-sans">Brahmotsavam</span>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-serif font-bold text-white group-hover:text-rose-300 transition-colors">
                Festival
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Tradition Lives On. The majestic 10-day Panguni Therottam chariot festival, Garuda Sevai, and vibrant temple processions.
              </p>
            </div>
          </div>

          <div className="pt-6 relative z-10 flex items-center justify-between">
            <span className="text-xs font-medium text-rose-300 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Explore 2026-2027 Calendar</span>
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-300 group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Card 4: Parakkai Village — People | Culture | Together */}
        <div
          onClick={() => onNavigate('community')}
          className="group relative rounded-2xl border overflow-hidden p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-101 cursor-pointer"
          style={{
            backgroundColor: `${activeTheme.colors.surfaceElevated}`,
            borderColor: activeTheme.colors.borderSubtle
          }}
        >
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Grama Sabha & Seva
              </span>
              <span className="text-xs text-slate-400 font-sans">Village Unity</span>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-serif font-bold text-white group-hover:text-emerald-300 transition-colors">
                Parakkai Village
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                People | Culture | Together. Community forum for sharing village ideas, resolving temple concerns, and volunteering in seva.
              </p>
            </div>
          </div>

          <div className="pt-6 relative z-10 flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-300 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>Participate in Community</span>
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Card 5: A Greener Parakkai — For Generations */}
        <div
          onClick={() => onNavigate('community')}
          className="group relative rounded-2xl border overflow-hidden p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-101 cursor-pointer md:col-span-2 lg:col-span-2"
          style={{
            backgroundColor: `${activeTheme.colors.surfaceElevated}`,
            borderColor: activeTheme.colors.borderSubtle
          }}
        >
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Eco-Preservation & Native Groves
              </span>
              <span className="text-xs text-slate-400 font-sans">Sustainability</span>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-serif font-bold text-white group-hover:text-teal-300 transition-colors">
                A Greener Parakkai
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                For Generations. Reviving traditional water channels, maintaining native shade groves (Magizham, Punnai, and Arasa trees), and plastic-free temple offerings.
              </p>
            </div>
          </div>

          <div className="pt-6 relative z-10 flex items-center justify-between">
            <span className="text-xs font-medium text-teal-300 flex items-center gap-1">
              <Trees className="w-3.5 h-3.5" />
              <span>Join Green Parakkai Movement</span>
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-300 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </section>
  );
};
