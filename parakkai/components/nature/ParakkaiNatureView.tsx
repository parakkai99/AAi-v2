/**
 * P-PARAKKAI-003 — Parakkai Nature & Village Experience View
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.2
 * 
 * Explores Parakkai Village, the sacred freshwater Teertham lake, migratory birds,
 * coconut groves, and rural heritage of the Nanjil Nadu region.
 */

import React from 'react';
import { Trees, Droplets, Sun, Compass, Bird, Heart, MapPin } from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';

interface ParakkaiNatureViewProps {
  activeTheme: ParakkaiThemeDefinition;
  onNavigate: (view: string) => void;
}

export const ParakkaiNatureView: React.FC<ParakkaiNatureViewProps> = ({
  activeTheme,
  onNavigate
}) => {
  return (
    <div id="parakkai-nature-view" className="w-full space-y-6 animate-fadeIn pb-12">
      {/* Nature Hero */}
      <section
        className="w-full rounded-3xl border p-6 sm:p-10 shadow-xs relative overflow-hidden"
        style={{
          backgroundColor: activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase">
            <Trees className="w-4 h-4" />
            <span>Living Village • Living Ecology • Nanjil Nadu</span>
          </div>

          <h1
            className="text-2xl sm:text-4xl font-serif font-bold tracking-tight"
            style={{ color: activeTheme.colors.textPrimary }}
          >
            Parakkai Lake & Green Groves
          </h1>

          <p className="text-sm sm:text-base font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
            Nestled in the lush delta plains of Kanyakumari district, Parakkai is famed for its expansive freshwater lake, thriving coconut groves, and a bird sanctuary welcoming migratory birds throughout the winter months. Devotion and environmental stewardship merge naturally in this timeless haven.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('map')}
              className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              style={{
                backgroundColor: activeTheme.colors.sacredGold,
                color: '#000000'
              }}
            >
              <Compass className="w-4 h-4" />
              <span>Explore Village Map</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('temple')}
              className="px-4 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 cursor-pointer transition-colors"
              style={{
                backgroundColor: activeTheme.colors.surfaceElevated,
                borderColor: activeTheme.colors.borderSubtle,
                color: activeTheme.colors.textPrimary
              }}
            >
              <span>Temple Architecture</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Pillars of Parakkai Nature */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          className="p-5 rounded-2xl border shadow-xs space-y-2.5"
          style={{
            backgroundColor: activeTheme.colors.surfaceElevated,
            borderColor: activeTheme.colors.borderSubtle
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold"
            style={{
              backgroundColor: `${activeTheme.colors.primarySkyBlue}20`,
              color: activeTheme.colors.primarySkyBlue
            }}
          >
            <Droplets className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
            Sacred Teertham Lake
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
            The expansive temple tank and village freshwater lake supply pristine water for sanctum theertha abhishekam and sustain the surrounding flora and fauna year-round.
          </p>
        </div>

        <div
          className="p-5 rounded-2xl border shadow-xs space-y-2.5"
          style={{
            backgroundColor: activeTheme.colors.surfaceElevated,
            borderColor: activeTheme.colors.borderSubtle
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold"
            style={{
              backgroundColor: `${activeTheme.colors.sacredGold}20`,
              color: activeTheme.colors.sacredGold
            }}
          >
            <Bird className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
            Migratory Bird Sanctuary
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
            Parakkai Lake attracts painted storks, spot-billed pelicans, egrets, and white ibises. The tranquil waters provide a sanctuary where nature flourishes unhindered.
          </p>
        </div>

        <div
          className="p-5 rounded-2xl border shadow-xs space-y-2.5"
          style={{
            backgroundColor: activeTheme.colors.surfaceElevated,
            borderColor: activeTheme.colors.borderSubtle
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold"
            style={{
              backgroundColor: `${activeTheme.colors.textGold}20`,
              color: activeTheme.colors.textGold
            }}
          >
            <Sun className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
            Solar Dawn Miracle
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
            The geographical orientation of the village and temple aligns perfectly with the rising sun at 6:30 AM, creating an astronomical marvel preserved for centuries.
          </p>
        </div>
      </div>
    </div>
  );
};
