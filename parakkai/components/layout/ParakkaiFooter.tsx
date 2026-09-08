/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React from 'react';
import { Sparkles, Compass, Shield, Heart } from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';

interface ParakkaiFooterProps {
  activeTheme: ParakkaiThemeDefinition;
  onNavigate: (view: string) => void;
  onOpenAdmin: () => void;
}

export const ParakkaiFooter: React.FC<ParakkaiFooterProps> = ({
  activeTheme,
  onNavigate,
  onOpenAdmin
}) => {
  const siteConfig = parakkaiService.getSiteConfig();
  const navConfig = parakkaiService.getNavigationConfig();
  const footerSections = (navConfig && Array.isArray(navConfig.footerSections)) ? navConfig.footerSections : [];

  return (
    <footer
      id="parakkai-master-footer"
      className="border-t transition-colors duration-300 relative z-20"
      style={{
        backgroundColor: activeTheme.colors.surfaceCanvas,
        borderColor: activeTheme.colors.borderSubtle
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Brand Banner & Slogan */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-serif text-2xl border shadow-lg"
              style={{
                backgroundColor: activeTheme.colors.surfaceElevated,
                borderColor: activeTheme.colors.borderGold,
                color: activeTheme.colors.sacredGold
              }}
            >
              🪷
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-serif" style={{ color: activeTheme.colors.textGold }}>
                  {siteConfig.name}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full border border-sky-800 bg-sky-950/60 text-sky-300 font-mono">
                  v0.1.0 Commercial
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {siteConfig.displayName}
              </p>
              <p className="text-[11px] text-slate-400 font-sans">
                {siteConfig.tamilDisplayName}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:items-end text-left md:text-right">
            <div className="text-xs font-serif italic text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>"Daily at 6:30 AM the Sunlight directly falls on the Feet of the Lord"</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Devotion • Heritage • Community • A Brighter Tomorrow
            </p>
          </div>
        </div>

        {/* 4 Column Navigation Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">
                {section.title}
              </h4>
              {section.tamilTitle && (
                <span className="block text-[10px] text-amber-400/80 font-sans">
                  {section.tamilTitle}
                </span>
              )}
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.targetView)}
                      className="text-xs text-slate-400 hover:text-amber-300 transition-colors cursor-pointer text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright, Contract, Architect Signature */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span>
              © 2026 <strong>ArchitectAny (AAi)</strong> / Vijay Kumar K. All rights reserved.
            </span>
            <span className="hidden sm:inline opacity-30">•</span>
            <span className="font-mono text-[11px] text-amber-400/90">
              Contract P-PARAKKAI-001 (Active)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-mono text-[11px] cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </button>
            <span className="opacity-30">•</span>
            <span className="text-[11px] flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Parakkai
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
