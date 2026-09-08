/**
 * P-PARAKKAI-003 — Temple Experience View (Gopuram, Dasavataram, Sanctum & Heritage)
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.2
 * 
 * Standalone, deep architectural and devotional exploration of Sri Madhusoodhana Perumal Temple:
 * Gopuram, Dasavataram Archway, Sri Garuda & Sri Anjaneya shrines, Kodimaram, and Sacred Timings.
 */

import React, { useState } from 'react';
import {
  Landmark,
  Sparkles,
  Sun,
  Shield,
  Clock,
  Compass,
  Calendar,
  Layers,
  ChevronRight,
  BookOpen,
  MapPin
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { DasavataramArchDisplay } from '../home/DasavataramArchDisplay';
import { SunlightMiracleWidget } from '../home/SunlightMiracleWidget';
import { parakkaiService } from '../../services/parakkaiService';

interface TempleExperienceViewProps {
  activeTheme: ParakkaiThemeDefinition;
  onNavigate: (view: string) => void;
  onBookPooja: (offeringId?: string) => void;
}

export const TempleExperienceView: React.FC<TempleExperienceViewProps> = ({
  activeTheme,
  onNavigate,
  onBookPooja
}) => {
  const sanctum = parakkaiService.getTempleSanctum();
  const schedules = parakkaiService.getTempleSchedules();
  const [activeTab, setActiveTab] = useState<'overview' | 'dasavataram' | 'architecture' | 'sanctum'>('overview');

  return (
    <div id="parakkai-temple-view" className="w-full space-y-8 animate-fadeIn pb-12">
      {/* 1. Temple Master Hero Banner */}
      <section
        className="w-full rounded-3xl border p-6 sm:p-10 shadow-sm relative overflow-hidden"
        style={{
          backgroundColor: activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
            <Landmark className="w-4 h-4" />
            <span>Sacred Temple Architecture & Sthala Puranam</span>
          </div>

          <h1
            className="text-2xl sm:text-4xl font-serif font-bold tracking-tight"
            style={{ color: activeTheme.colors.textGold }}
          >
            Sri Madhusoodhana Perumal Temple
          </h1>

          <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
            A sacred Vaishnavite divya kshethram celebrated across South India for its majestic white Dravidian Gopuram,
            the intricately sculpted Dasavataram wooden archway, the celestial presence of Sri Garuda and Sri Anjaneya,
            and the miraculous daily 6:30 AM sunrise alignment where the morning sun directly worships the Lord's sacred lotus feet.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onBookPooja()}
              className="px-5 py-2.5 rounded-xl font-serif font-bold text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-105 cursor-pointer bg-amber-500 hover:bg-amber-600 text-slate-950"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Pooja Offering</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('journey')}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Experience 7 Stations Pilgrim Walk</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('darshan')}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Sun className="w-4 h-4 text-amber-600" />
              <span>Sacred Darshan View</span>
            </button>
          </div>
        </div>

        {/* Ambient decorative watermarks */}
        <div className="absolute right-4 -bottom-6 text-slate-100 select-none pointer-events-none text-9xl font-serif opacity-30">
          🪷
        </div>
      </section>

      {/* 2. Interactive Sections Switcher */}
      <div className="flex items-center gap-2 border-b pb-2 overflow-x-auto" style={{ borderColor: activeTheme.colors.borderSubtle }}>
        {[
          { id: 'overview', label: 'Sanctum & Sannadhis' },
          { id: 'dasavataram', label: 'Dasavataram Archway' },
          { id: 'architecture', label: 'Gopuram & 6:30 AM Miracle' },
          { id: 'sanctum', label: 'Daily Pooja Timings' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
              activeTab === tab.id
                ? 'bg-sky-100 text-sky-900 border-sky-300 font-bold shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Primary Sanctum Card */}
            <div
              className="p-5 rounded-2xl border shadow-xs space-y-3"
              style={{
                backgroundColor: activeTheme.colors.surfaceElevated,
                borderColor: activeTheme.colors.borderGold
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700 uppercase">Moolavar Sannadhi</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">East Facing</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Sri Madhusoodhana Perumal
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flanked by Sri Devi and Bhoodevi Thayar in majestic Nindra Thirukkolam (standing posture), holding the divine Shankha (Conch) and Chakra (Discus), showering divine benevolence.
              </p>
              <div className="text-[11px] text-amber-800 font-serif pt-1">
                மலர் மாலை அலங்காரம் & விசேஷ ஆராதனை
              </div>
            </div>

            {/* Sri Garuda Bhagavan */}
            <div
              className="p-5 rounded-2xl border shadow-xs space-y-3"
              style={{
                backgroundColor: activeTheme.colors.surfaceElevated,
                borderColor: activeTheme.colors.borderSubtle
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-700 uppercase">Periya Thiruvadi</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 font-semibold">Facing Sanctum</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Sri Garuda Alwar
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The divine eagle mount standing in prayerful devotion facing the moolasthanam. Special butter and kozhukattai archanai offered during Swathi nakshatram.
              </p>
            </div>

            {/* Sri Anjaneyar */}
            <div
              className="p-5 rounded-2xl border shadow-xs space-y-3"
              style={{
                backgroundColor: activeTheme.colors.surfaceElevated,
                borderColor: activeTheme.colors.borderSubtle
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Siriya Thiruvadi</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-semibold">South Corridor</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Sri Veera Anjaneyar
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Revered guardian deity protecting devotees from fear and negative influences. Devotees offer sindhooram and vadamala on Saturdays.
              </p>
            </div>
          </div>

          {/* Sthala Puranam Article */}
          <div
            className="p-6 rounded-2xl border shadow-xs space-y-3"
            style={{
              backgroundColor: activeTheme.colors.surfaceElevated,
              borderColor: activeTheme.colors.borderSubtle
            }}
          >
            <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>The Legend of Parakkai & Sri Madhusoodhana Perumal</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Legend recounts that Lord Vishnu, in His compassion to eradicate ignorance and demonic burdens represented by the demon Madhu, manifested here as Sri Madhusoodhana. The temple town of Parakkai derives its celestial aura from the ancient Nanjil Nadu wetland eco-system, where pristine freshwater tanks, lotus ponds, and fertile paddy fields surround the sanctuary, reflecting both nature and divinity.
            </p>
          </div>
        </div>
      )}

      {/* Dasavataram Tab */}
      {activeTab === 'dasavataram' && (
        <div className="space-y-6">
          <DasavataramArchDisplay
            activeTheme={activeTheme}
            onEnterSanctum={() => onNavigate('darshan')}
          />
        </div>
      )}

      {/* Architecture & Solar Miracle Tab */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <SunlightMiracleWidget
            activeTheme={activeTheme}
            onNavigateToSchedule={() => onNavigate('today')}
          />
        </div>
      )}

      {/* Daily Pooja Timings Tab */}
      {activeTab === 'sanctum' && (
        <div className="space-y-4">
          <div
            className="p-5 rounded-2xl border shadow-xs"
            style={{
              backgroundColor: activeTheme.colors.surfaceElevated,
              borderColor: activeTheme.colors.borderSubtle
            }}
          >
            <h3 className="text-base font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Temple Daily Timings & Pooja Kalams</span>
            </h3>
            <div className="divide-y divide-slate-100">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-serif font-bold text-slate-900">{schedule.title}</div>
                    <div className="text-slate-500">{schedule.description}</div>
                  </div>
                  <div className="font-mono font-bold text-sky-800 px-2 py-0.5 rounded bg-sky-50 border border-sky-100">
                    {schedule.timeSlot}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
