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
  Store,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  Star,
  ExternalLink,
  Search
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { HyperlocalBusiness } from '../../contracts/hyperlocal';

interface HyperlocalDirectoryViewProps {
  activeTheme: ParakkaiThemeDefinition;
}

export const HyperlocalDirectoryView: React.FC<HyperlocalDirectoryViewProps> = ({ activeTheme }) => {
  const businesses = parakkaiService.getHyperlocalBusinesses();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = businesses.filter((b) => {
    const matchesCat = selectedCategory === 'ALL' || b.category === selectedCategory;
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      !q ||
      (b.name || '').toLowerCase().includes(q) ||
      (b.description || '').toLowerCase().includes(q) ||
      (b.address || '').toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const categories = [
    'ALL',
    'FOOD_AND_DINING',
    'FLOWERS_AND_GARLANDS',
    'POOJA_ITEMS',
    'ACCOMMODATION',
    'TRANSPORT_AUTO_TAXI',
    'HANDICRAFTS_ART'
  ];

  return (
    <div id="parakkai-hyperlocal-view" className="w-full space-y-10 py-4 animate-fadeIn">
      {/* Header Banner */}
      <section
        className="rounded-3xl border p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: `${activeTheme.colors.surfaceElevated}`,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5" />
                <span>Hyperlocal Village Ecosystem</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Verified Local Directory
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Nearby Shops & Pilgrim Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Support traditional Nanjil merchants and verified local service providers surrounding Parakkai Temple. Connect directly via WhatsApp or phone with zero mediator markup.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search food, flowers, taxi..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer border whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </section>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((biz: HyperlocalBusiness) => (
          <div
            key={biz.businessId}
            className="rounded-2xl border overflow-hidden transition-all flex flex-col justify-between hover:shadow-xl hover:border-amber-400/60"
            style={{
              backgroundColor: `${activeTheme.colors.surfaceElevated}`,
              borderColor: activeTheme.colors.borderSubtle
            }}
          >
            <div>
              <div className="h-44 w-full bg-slate-950 overflow-hidden relative">
                <img
                  src={biz.imageUrl}
                  alt={biz.name}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/80 text-amber-300">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{biz.distanceFromTempleMeters}m from Sannadhi</span>
                </div>

                {biz.verified && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">
                      {biz.name}
                    </h3>
                    {biz.tamilName && (
                      <span className="text-xs text-amber-300/80 font-sans block">
                        {biz.tamilName}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{biz.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans line-clamp-2 leading-relaxed">
                  {biz.description}
                </p>

                <div className="space-y-1 text-[11px] text-slate-400 font-sans pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{biz.openingHours}</span>
                  </div>
                  <div className="truncate text-slate-400">
                    {biz.address}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons: WhatsApp and Phone */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40 grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${biz.whatsappNumber}?text=Vanakkam,%20inquiry%20from%20Parakkai%20Temple%20App`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl text-xs font-medium bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${biz.phone}`}
                className="py-2 px-3 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
