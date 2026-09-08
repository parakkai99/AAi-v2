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
  ShoppingBag,
  Sparkles,
  Plus,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Search
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { HypermarketProduct } from '../../contracts/marketplace';

interface HypermarketViewProps {
  activeTheme: ParakkaiThemeDefinition;
  onAddToCart: (product: HypermarketProduct) => void;
  onOpenCart: () => void;
}

export const HypermarketView: React.FC<HypermarketViewProps> = ({
  activeTheme,
  onAddToCart,
  onOpenCart
}) => {
  const products = parakkaiService.getProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    'ALL',
    'TEMPLE_PRASADAM',
    'BRASS_LAMPS_AND_IDOLS',
    'ORGANIC_VILLAGE_PRODUCE',
    'POOJA_SAMAGRI',
    'PALMYRA_AND_COCONUT_CRAFTS',
    'DEVOTIONAL_BOOKS_AND_CDS'
  ];

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      !q ||
      (p.name || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleAdd = (product: HypermarketProduct) => {
    onAddToCart(product);
    setJustAddedId(product.productId);
    setTimeout(() => setJustAddedId(null), 1500);
  };

  return (
    <div id="parakkai-hypermarket-view" className="w-full space-y-10 py-4 animate-fadeIn">
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
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Parakkai Sacred Hypermarket</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Authentic Artisans & Temple Trust
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Consecrated Prasadam & Village Heritage Goods
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Order authentic Parakkai Temple prasadam kits, hand-cast brass oil lamps, organic Nendran banana chips fried in village coconut oil, and handwoven palmyra crafts. All proceeds directly support local artisan guilds and temple seva.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onOpenCart}
              className="px-5 py-2.5 rounded-xl font-serif font-bold text-xs bg-amber-500 hover:bg-amber-400 text-black transition-colors flex items-center gap-2 cursor-pointer shadow-lg whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Shopping Cart</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-1">
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
              {cat.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </section>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod: HypermarketProduct) => {
          const isJustAdded = justAddedId === prod.productId;
          return (
            <div
              key={prod.productId}
              className="rounded-2xl border overflow-hidden transition-all flex flex-col justify-between hover:shadow-xl hover:border-amber-400/60"
              style={{
                backgroundColor: `${activeTheme.colors.surfaceElevated}`,
                borderColor: activeTheme.colors.borderSubtle
              }}
            >
              <div>
                <div className="h-48 w-full bg-slate-950 overflow-hidden relative">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-85"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/80 text-amber-300">
                    {prod.unit}
                  </span>
                  {prod.seller.isTempleTrustOrApproved && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                      Temple Trust
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xl font-mono font-bold text-amber-400">
                      ₹{prod.priceINR}
                    </span>
                    {prod.originalPriceINR && (
                      <span className="text-xs text-slate-500 line-through font-mono">
                        ₹{prod.originalPriceINR}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-serif font-bold text-white leading-snug">
                    {prod.name}
                  </h3>

                  {prod.tamilName && (
                    <span className="text-xs text-amber-300/80 font-sans block">
                      {prod.tamilName}
                    </span>
                  )}

                  <p className="text-xs text-slate-300 font-sans line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-400 font-sans">
                    <span>Seller: <strong>{prod.seller.businessName}</strong></span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-mono">
                  {prod.inStock ? `In Stock (${prod.stockCount})` : 'Out of Stock'}
                </span>

                <button
                  type="button"
                  onClick={() => handleAdd(prod)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isJustAdded
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-500 hover:bg-amber-400 text-black'
                  }`}
                >
                  {isJustAdded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
