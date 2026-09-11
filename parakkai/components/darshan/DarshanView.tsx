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
  Sparkles,
  Sun,
  Clock,
  Shield,
  Heart,
  CheckCircle2,
  Info,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { PoojaOfferingItem } from '../../contracts/temple';

interface DarshanViewProps {
  activeTheme: ParakkaiThemeDefinition;
  onBookPooja: (offeringId?: string) => void;
  onNavigateToSchedule: () => void;
}

export const DarshanView: React.FC<DarshanViewProps> = ({
  activeTheme,
  onBookPooja,
  onNavigateToSchedule
}) => {
  const sanctum = parakkaiService.getTempleSanctum();
  const offerings = parakkaiService.getPoojaOfferings();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredOfferings = selectedCategory === 'ALL'
    ? offerings
    : offerings.filter((o) => o.category === selectedCategory);

  return (
    <div id="parakkai-darshan-view" className="w-full space-y-10 py-4 animate-fadeIn">
      {/* Sanctum Hero Banner */}
      <section
        className="w-full rounded-3xl border p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: `${activeTheme.colors.surfaceCanvasElevated}`,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sanctum Sanctorum • Garbha Griha</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Presiding Moolavar
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight" style={{ color: activeTheme.colors.textPrimary }}>
              {sanctum.presidingDeity}
            </h2>
            <p className="text-sm font-sans font-medium" style={{ color: activeTheme.colors.textGold }}>
              {sanctum.tamilDeityName}
            </p>

            <blockquote className="text-sm italic font-serif border-l-2 pl-4 py-1" style={{ color: activeTheme.colors.textPrimary, borderColor: activeTheme.colors.sacredGold }} >
              "{sanctum.sacredMantra}"
            </blockquote>

            <p className="text-xs sm:text-sm font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
              {sanctum.description}
            </p>

            {/* Iconography Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: activeTheme.colors.surfaceCanvasCard, borderColor: activeTheme.colors.borderSubtle }}>
                <div className="text-[10px] font-mono" style={{ color: activeTheme.colors.textSecondary }}>Posture</div>
                <div className="text-xs font-serif font-bold mt-0.5" style={{ color: activeTheme.colors.textGold }}>{sanctum.posture}</div>
              </div>
              <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: activeTheme.colors.surfaceCanvasCard, borderColor: activeTheme.colors.borderSubtle }}>
                <div className="text-[10px] font-mono" style={{ color: activeTheme.colors.textSecondary }}>Orientation</div>
                <div className="text-xs font-serif font-bold mt-0.5" style={{ color: activeTheme.colors.textGold }}>{sanctum.facingDirection}</div>
              </div>
              <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: activeTheme.colors.surfaceCanvasCard, borderColor: activeTheme.colors.borderSubtle }}>
                <div className="text-[10px] font-mono" style={{ color: activeTheme.colors.textSecondary }}>Sacred Tree</div>
                <div className="text-xs font-serif font-bold mt-0.5" style={{ color: activeTheme.colors.textGold }}>{sanctum.sthalaVriksham}</div>
              </div>
              <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: activeTheme.colors.surfaceCanvasCard, borderColor: activeTheme.colors.borderSubtle }}>
                <div className="text-[10px] font-mono" style={{ color: activeTheme.colors.textSecondary }}>Holy Water</div>
                <div className="text-xs font-serif font-bold mt-0.5" style={{ color: activeTheme.colors.textGold }}>{sanctum.theertham}</div>
              </div>
            </div>

            {/* Arms & Mudras */}
            <div className="p-3.5 rounded-xl border text-xs space-y-1" style={{ backgroundColor: activeTheme.colors.surfaceCanvasCard, borderColor: activeTheme.colors.borderGold, color: activeTheme.colors.textSecondary }}>
              <span className="font-bold font-serif" style={{ color: activeTheme.colors.textGold }}>Chaturbhuja (Four Divine Arms): </span>
              <span>
                Upper right holds the sacred <strong>Panchajanya Shankha</strong> (Conch), upper left holds the <strong>Sudarshana Chakra</strong> (Discus), lower right displays the comforting <strong>Varada Mudra</strong> (Boon-granting gesture), and lower left rests upon the <strong>Kaumodaki Gada</strong> (Mace).
              </span>
            </div>
          </div>

          {/* Right Action & Schedule Box */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-full p-6 rounded-2xl border space-y-4 shadow-xl" style={{ backgroundColor: activeTheme.colors.surfaceCanvasCard, borderColor: activeTheme.colors.borderGold }}>
              <div className="text-center space-y-1">
                <div className="w-16 h-16 rounded-full mx-auto text-3xl flex items-center justify-center border shadow-md" style={{ backgroundColor: activeTheme.colors.surfaceCanvasCard, color: activeTheme.colors.textGold, borderColor: activeTheme.colors.borderGold }}>
                  🪷
                </div>
                <h4 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                  Daily Darshan Hours
                </h4>
                <p className="text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                  Morning: 5:30 AM – 12:00 PM<br />
                  Evening: 5:00 PM – 8:45 PM
                </p>
              </div>

              <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: activeTheme.colors.surfaceCanvasCard, borderColor: activeTheme.colors.borderGold }}>
                <div className="text-[11px] font-bold font-serif" style={{ color: activeTheme.colors.textGold }}>
                  ☀️ Daily 6:30 AM Sunlight Miracle
                </div>
                <p className="text-[10px] font-sans mt-0.5" style={{ color: activeTheme.colors.textSecondary }}>
                  Natural dawn rays illuminate the Golden Kodimaram and lotus feet.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onBookPooja()}
                className="w-full py-2.5 px-4 rounded-xl font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-103 cursor-pointer"
                style={{
                  backgroundColor: activeTheme.colors.sacredGold,
                  color: '#000'
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Pooja Offering Online</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToSchedule}
                className="w-full py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 cursor-pointer" style={{ color: activeTheme.colors.textSecondary, backgroundColor: activeTheme.colors.surfaceCanvas, borderColor: activeTheme.colors.borderSubtle }}
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>View Full Today Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pooja Offerings Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xl font-serif font-bold" style={{ color: activeTheme.colors.textGold }}>
              Sacred Pooja Offerings & Sevas
            </h3>
            <p className="text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
              Perform your sankalpam with family name, gothram, and nakshatram
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'ARCHANA', 'ABHISHEKAM', 'HOMAM', 'ANNADHANAM', 'SPECIAL_ALANKARAM'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOfferings.map((offering: PoojaOfferingItem) => (
            <div
              key={offering.id}
              className="rounded-2xl border p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:border-amber-400/60"
              style={{
                backgroundColor: `${activeTheme.colors.surfaceCanvasElevated}`,
                borderColor: activeTheme.colors.borderSubtle
              }}
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border" style={{ backgroundColor: activeTheme.colors.surfaceCanvasCard, color: activeTheme.colors.textSecondary, borderColor: activeTheme.colors.borderSubtle }}>
                      {offering.category}
                    </span>
                    <h4 className="text-base font-serif font-bold mt-1.5" style={{ color: activeTheme.colors.textPrimary }}>
                      {offering.name}
                    </h4>
                    {offering.tamilName && (
                      <span className="text-xs font-sans block" style={{ color: activeTheme.colors.textGold }}>
                        {offering.tamilName}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-serif font-bold text-amber-400">
                      ₹{offering.priceINR}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-sans leading-relaxed" style={{ color: activeTheme.colors.textSecondary }}>
                  {offering.description}
                </p>

                <div className="pt-2 text-[11px] space-y-1 font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                  <div>
                    <strong className="text-slate-300">Prasadam Given: </strong>
                    <span>{offering.prasadamDescription}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-300/90 font-mono text-[10px]">
                    <Clock className="w-3 h-3" />
                    <span>Time Slot: {offering.timingSlot || offering.timing || 'Temple Hours'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t mt-4 flex items-center justify-between" style={{ borderColor: activeTheme.colors.borderSubtle }}>
                <span className="text-[11px] font-mono" style={{ color: activeTheme.colors.textSecondary }}>
                  Consecrated Seva
                </span>
                <button
                  type="button"
                  onClick={() => onBookPooja(offering.id)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-serif font-bold transition-colors cursor-pointer flex items-center gap-1" style={{ backgroundColor: activeTheme.colors.sacredGold, color: activeTheme.colors.deepTempleNavy }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Reserve Slot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pilgrim Guidelines & Etiquette */}
      <section
        className="rounded-2xl border p-6 space-y-4"
        style={{
          backgroundColor: `${activeTheme.colors.surfaceCanvasCanvas}`,
          borderColor: activeTheme.colors.borderSubtle
        }}
      >
        <div className="flex items-center gap-2 font-serif font-bold text-base" style={{ color: activeTheme.colors.textGold }}>
          <Shield className="w-4 h-4" />
          <span>Temple Sanctum Etiquette & Devotee Guidelines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
          <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: activeTheme.colors.surfaceCanvasCard, borderColor: activeTheme.colors.borderSubtle }}>
            <strong className="block font-serif" style={{ color: activeTheme.colors.textPrimary }}>Traditional Dress Code</strong>
            <p>
              Men: Dhoti / Veshti with angavastram or bare upper body. Women: Sarees, half-sarees, or salwar kameez with dupatta.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <strong className="text-white block font-serif">Sanctum Photography</strong>
            <p>
              Strictly prohibited inside the Garbha Griha and inner corridor to protect consecrated deity sanctity. Outer praharam photography permitted.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <strong className="text-white block font-serif">Prasadam Counter</strong>
            <p>
              Online pooja receipts can be shown at the temple outer counter alongside your SMS/WhatsApp reference number to collect sanctified prasad.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
