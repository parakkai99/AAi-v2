/**
 * P-PARAKKAI-003 — 7 Stations Journey Experience View
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.2
 * 
 * Standalone Pilgrim Walkway reproducing the 7 Sacred Stations from Image 1:
 * 1. My Home
 * 2. Arasamotu Sakthi Vinayakar
 * 3. Approaching the Temple
 * 4. Temple Entrance
 * 5. Golden Doors Open
 * 6. Golden Kodimaram (6:30 AM Ray Alignment)
 * 7. Sanctum Darshan of Sri Madhusoodhana Perumal
 */

import React from 'react';
import { Layers, Sparkles, Landmark, ArrowLeft, Sun } from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { CinematicJourneyViewer } from '../home/CinematicJourneyViewer';

interface JourneyExperienceViewProps {
  activeTheme: ParakkaiThemeDefinition;
  onNavigate: (view: string) => void;
  onBookPooja: (offeringId?: string) => void;
}

export const JourneyExperienceView: React.FC<JourneyExperienceViewProps> = ({
  activeTheme,
  onNavigate,
  onBookPooja
}) => {
  return (
    <div id="parakkai-journey-view" className="w-full space-y-6 animate-fadeIn pb-12">
      {/* Journey Header */}
      <div
        className="p-6 rounded-3xl border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{
          backgroundColor: activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase" style={{ color: activeTheme.colors.primarySkyBlue }}>
            <Layers className="w-4 h-4" />
            <span>The 7 Stations of Parakkai • Pilgrim Pathway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
            A Step-by-Step Spiritual Passage
          </h1>
          <p className="text-xs sm:text-sm font-sans" style={{ color: activeTheme.colors.textSecondary }}>
            Follow the ancient pilgrim route from the comfort of home through the village bazaar, past Sakthi Vinayakar, under the towering Dravidian Gopuram, by the Golden Kodimaram, directly into the sanctum sanctorum.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('darshan')}
            className="px-4 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            style={{
              backgroundColor: activeTheme.colors.sacredGold,
              color: '#000000',
              borderColor: activeTheme.colors.borderGold
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Enter Sanctum Directly</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1 cursor-pointer"
            style={{
              backgroundColor: activeTheme.colors.surfaceElevated,
              borderColor: activeTheme.colors.borderSubtle,
              color: activeTheme.colors.textPrimary
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Full 7 Stations Interactive Engine */}
      <CinematicJourneyViewer
        activeTheme={activeTheme}
        onNavigateToDarshan={() => onNavigate('darshan')}
        onNavigateToToday={() => onNavigate('today')}
        onNavigateToMap={() => onNavigate('map')}
      />
    </div>
  );
};
