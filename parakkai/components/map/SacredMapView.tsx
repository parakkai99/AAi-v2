/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Sparkles,
  Sun,
  Navigation,
  ExternalLink,
  Info
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';

interface SacredMapViewProps {
  activeTheme: ParakkaiThemeDefinition;
  onSelectStation?: (stationId: number) => void;
}

interface MapLocationSpot {
  id: string;
  name: string;
  tamilName: string;
  category: 'SANCTUM' | 'STATION' | 'WATER' | 'PILGRIM_SERVICE';
  description: string;
  xPercent: number;
  yPercent: number;
  distanceFromSanctumMeters: number;
  icon: string;
}

export const SacredMapView: React.FC<SacredMapViewProps> = ({
  activeTheme,
  onSelectStation
}) => {
  const [selectedSpotId, setSelectedSpotId] = useState<string>('spot-sanctum');

  const spots: MapLocationSpot[] = [
    {
      id: 'spot-sanctum',
      name: 'Sanctum Sanctorum (Garbha Griha)',
      tamilName: 'கருவறை - மூலவர் மதுசூதன பெருமாள்',
      category: 'SANCTUM',
      description: 'Presiding deity Arulmigu Madhusoodhana Perumal flanked by Sree Devi & Bhoodevi. Receives the 6:30 AM sunlight miracle at the holy lotus feet.',
      xPercent: 50,
      yPercent: 32,
      distanceFromSanctumMeters: 0,
      icon: '🪷'
    },
    {
      id: 'spot-kodimaram',
      name: 'Golden Kodimaram (Dwajasthambam)',
      tamilName: 'தங்கக் கொடிமரம்',
      category: 'STATION',
      description: 'Towering gilded brass flagstaff where dawn rays reflect directly through the inner sanctum aperture.',
      xPercent: 50,
      yPercent: 44,
      distanceFromSanctumMeters: 25,
      icon: '☀️'
    },
    {
      id: 'spot-doors',
      name: 'Golden Entrance Doors & Mandapam',
      tamilName: 'மகா மண்டபம் & தங்கக் கதவுகள்',
      category: 'STATION',
      description: 'Intricately embossed brass portals opening into the pillared corridor with oil lamps.',
      xPercent: 50,
      yPercent: 56,
      distanceFromSanctumMeters: 45,
      icon: '🚪'
    },
    {
      id: 'spot-arch',
      name: 'Dasavataram Arch (Garuda & Anjaneya)',
      tamilName: 'தசாவதார வளைவு & ராஜகோபுரம்',
      category: 'STATION',
      description: 'Grand monumental archway flanked by Sri Garuda on the left and Sri Anjaneya on the right.',
      xPercent: 50,
      yPercent: 68,
      distanceFromSanctumMeters: 80,
      icon: '🏛️'
    },
    {
      id: 'spot-street',
      name: 'Sannadhi Car Street (Ratha Veethi)',
      tamilName: 'சன்னதி ரத வீதி',
      category: 'STATION',
      description: 'Four broad car streets surrounding the temple where the Panguni Therottam chariot is pulled.',
      xPercent: 50,
      yPercent: 80,
      distanceFromSanctumMeters: 140,
      icon: '🚶'
    },
    {
      id: 'spot-vinayakar',
      name: 'Arasamotu Sakthi Vinayakar Shrine',
      tamilName: 'அரசமூட்டு சக்தி விநாயகர்',
      category: 'STATION',
      description: 'Centuries-old sacred Peepal tree with sculpted Ganesha idol. First auspicious prayer point for pilgrims.',
      xPercent: 30,
      yPercent: 84,
      distanceFromSanctumMeters: 220,
      icon: '🐘'
    },
    {
      id: 'spot-lake',
      name: 'Parakkai Sacred Temple Lake (Theertham)',
      tamilName: 'புனித பறக்கை ஏரி & தீர்த்தக்குளம்',
      category: 'WATER',
      description: 'Sacred water body with pink lotuses, migratory waterfowl, and the ritual bathing ghats.',
      xPercent: 78,
      yPercent: 50,
      distanceFromSanctumMeters: 180,
      icon: '🌊'
    },
    {
      id: 'spot-bus-stand',
      name: 'Parakkai Junction Bus & Taxi Stand',
      tamilName: 'பறக்கை பேருந்து & ஆட்டோ நிலையம்',
      category: 'PILGRIM_SERVICE',
      description: 'Direct town bus connectivity to Nagercoil (6 km) and Kanyakumari (14 km).',
      xPercent: 20,
      yPercent: 92,
      distanceFromSanctumMeters: 290,
      icon: '🚖'
    }
  ];

  const currentSpot = spots.find((s) => s.id === selectedSpotId) || spots[0];

  return (
    <div id="parakkai-sacred-map" className="w-full space-y-10 py-4 animate-fadeIn">
      {/* Header Banner */}
      <section
        className="rounded-3xl border p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: `${activeTheme.colors.surfaceElevated}`,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Sacred Geography & Station Coordinates</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Parakkai Circuit
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            The Sacred Map of Parakkai
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Navigate the 7 devotional stations from the village entrance through Arasamotu Vinayakar, Sannadhi street, Dasavataram arch, Golden Kodimaram, the Sanctum Sanctorum, and the sacred temple lake.
          </p>
        </div>
      </section>

      {/* Interactive Map Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Map Visual Stage (Schematic Temple Layout) */}
        <div className="lg:col-span-8 rounded-3xl border border-amber-500/30 bg-slate-950 p-6 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
          {/* Compass Rose */}
          <div className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-1.5 z-20">
            <Navigation className="w-3.5 h-3.5 text-amber-400 rotate-45" />
            <span>N (Agrahara to East Sanctum)</span>
          </div>

          {/* Lake Visual Region on Right */}
          <div className="absolute top-1/4 right-0 w-48 h-72 rounded-l-full bg-sky-600/15 border-l border-y border-sky-500/30 blur-xs pointer-events-none" />

          {/* Sannadhi Central Axis Line */}
          <div className="absolute left-1/2 top-16 bottom-16 w-0.5 -translate-x-1/2 border-l border-dashed border-amber-500/30 pointer-events-none" />

          {/* Interactive Spot Pins */}
          <div className="relative w-full h-[420px] z-10">
            {spots.map((spot) => {
              const isSelected = spot.id === selectedSpotId;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setSelectedSpotId(spot.id)}
                  style={{
                    left: `${spot.xPercent}%`,
                    top: `${spot.yPercent}%`
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 shadow-lg border ${
                    isSelected
                      ? 'bg-amber-400 text-black border-amber-300 scale-125 z-30 ring-4 ring-amber-400/30'
                      : spot.category === 'WATER'
                      ? 'bg-sky-950 text-sky-300 border-sky-700 hover:scale-110'
                      : 'bg-slate-900 text-amber-300 border-slate-700 hover:scale-110'
                  }`}
                  title={spot.name}
                >
                  <span className="text-sm">{spot.icon}</span>
                  <span className={`text-[10px] font-sans font-bold whitespace-nowrap hidden sm:inline ${
                    isSelected ? 'text-black' : 'text-slate-200'
                  }`}>
                    {spot.name.split('(')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="relative z-20 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-sans">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">🪷 Sanctum</span>
              <span className="flex items-center gap-1">☀️ 6:30 AM Beam</span>
              <span className="flex items-center gap-1">🌊 Theertham</span>
            </div>
            <span className="font-mono text-[10px] text-amber-400">
              Latitude 8.1472° N • Longitude 77.4523° E
            </span>
          </div>
        </div>

        {/* Right: Selected Spot Inspector Card */}
        <div className="lg:col-span-4 rounded-3xl border border-amber-500/40 bg-slate-950/80 p-6 space-y-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 text-2xl flex items-center justify-center border border-amber-400">
              {currentSpot.icon}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                {currentSpot.category}
              </span>
              <h3 className="text-base font-serif font-bold text-white">
                {currentSpot.name}
              </h3>
            </div>
          </div>

          {currentSpot.tamilName && (
            <div className="text-xs text-amber-300/90 font-sans font-medium">
              {currentSpot.tamilName}
            </div>
          )}

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {currentSpot.description}
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Sanctum Distance:</span>
              <span className="text-amber-400 font-bold">{currentSpot.distanceFromSanctumMeters} meters</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Walking Time:</span>
              <span className="text-slate-200">{Math.ceil(currentSpot.distanceFromSanctumMeters / 60)} min walk</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://maps.google.com/?q=Parakkai+Madhusoodhana+Perumal+Temple+Kanyakumari"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-serif font-bold bg-amber-500 hover:bg-amber-400 text-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Google Maps / GPS</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
