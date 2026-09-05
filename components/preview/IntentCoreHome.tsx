/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Component: IntentCoreHome
 * Dedicated M01 Intent Core Experience.
 *
 * Reuses and inherits the canonical global AAi Intent Search engine (intentService),
 * canonical catalog repository, and the unified spatial navigation pipeline.
 */

import React, { useState, useEffect } from 'react';
import { Domain, Subdomain, Capability, Solution } from '@/src/types';
import {
  Cpu,
  Search,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Compass,
  Rocket,
  MapPin,
  CheckCircle2,
  Mic,
  Boxes,
  Loader2,
} from 'lucide-react';
import { ArchitectAnyLogo } from './IntentCore';
import { useArchitectAny } from '@/src/context/ArchitectAnyContext';
import { useUniversalNavigation } from '@/src/context/UniversalNavigationContext';
import { intentService } from '@/src/services/intentService';
import { catalogRepository } from '@/src/repositories/catalogRepository';
import { SearchResultItem } from '@/src/contracts/intent';

export interface IntentCoreHomeProps {
  domains: Domain[];
  subdomains?: Subdomain[];
  capabilities?: Capability[];
  solutions?: Solution[];
  initialQuery?: string;
  onReturnToUniverse: () => void;
  onNavigateToDomain: (domainId: string) => void;
  onNavigateToSolution: (solutionId: string) => void;
}

interface ResolvedIntent {
  query: string;
  domainId: string;
  domainName: string;
  subdomainId: string;
  subdomainName: string;
  capabilityId: string;
  capabilityName: string;
  solutionBundleId: string;
  solutionBundleName: string;
  location: string;
}

export const IntentCoreHome: React.FC<IntentCoreHomeProps> = ({
  domains,
  subdomains = [],
  capabilities = [],
  solutions = [],
  initialQuery = '',
  onReturnToUniverse,
  onNavigateToDomain,
  onNavigateToSolution,
}) => {
  const { intent, setIntent, location, theme } = useArchitectAny();
  const { navigateTo } = useUniversalNavigation();

  const [query, setQuery] = useState(
    initialQuery || intent.query || 'Build an event marketplace near Coimbatore'
  );
  const [isResolving, setIsResolving] = useState(false);
  const [resolved, setResolved] = useState<ResolvedIntent | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);

  // Suggested intents directly inherited from global canonical Intent Service
  const suggestedIntents = intentService.getSuggestedIntents();

  // Canonical progressive intent resolution reusing intentService
  const resolveQuery = async (text: string) => {
    if (!text.trim()) return;
    setIsResolving(true);

    try {
      // 1. Inherit canonical global intent parser and search
      const parsed = await intentService.parseIntent(text);
      const results = await intentService.search(text, location);

      // 2. Update global AAi Intent state immediately
      setIntent(parsed);
      setSearchResults(results.slice(0, 4));

      // 3. Resolve canonical 5-layer hierarchy names from catalog repository
      let domainId = parsed.domainId || 'D06';
      let domainName = 'Marketplace & Commerce';
      let subdomainId = parsed.subdomainId || 'D06.01';
      let subdomainName = 'Hyperlocal Marketplace';
      let capabilityId = parsed.capabilityId || 'D06.01.01';
      let capabilityName = 'Event & Media Services';
      let solutionBundleId = parsed.solutionBundleId || 'D06.01.01.01';
      let solutionBundleName = 'Event Management & Booking Solution';
      let locText = location.city ? `${location.city}, India` : 'Coimbatore, Tamil Nadu';

      // Look up canonical domain
      const domItem = await catalogRepository.getItemById(domainId);
      if (domItem) {
        domainName = domItem.name;
      } else {
        const found = domains.find((d) => d.id === domainId);
        if (found) domainName = found.name;
      }

      // Look up canonical subdomain
      if (subdomainId) {
        const subItem = await catalogRepository.getItemById(subdomainId);
        if (subItem) {
          subdomainName = subItem.name;
        } else {
          const found = subdomains.find((s) => s.id === subdomainId);
          if (found) subdomainName = found.name;
        }
      }

      // Look up canonical capability
      if (capabilityId) {
        const capItem = await catalogRepository.getItemById(capabilityId);
        if (capItem) {
          capabilityName = capItem.name;
        } else {
          const found = capabilities.find((c) => c.id === capabilityId);
          if (found) capabilityName = found.name;
        }
      }

      // Look up canonical solution bundle
      if (solutionBundleId) {
        const bunItem = await catalogRepository.getItemById(solutionBundleId);
        if (bunItem) {
          solutionBundleName = bunItem.name;
        }
      }

      // If location is detected in text
      const lower = text.toLowerCase();
      if (lower.includes('kanyakumari')) locText = 'Kanyakumari, Tamil Nadu';
      else if (lower.includes('coimbatore')) locText = 'Coimbatore, Tamil Nadu';
      else if (lower.includes('chennai')) locText = 'Chennai, Tamil Nadu';
      else if (lower.includes('bengaluru') || lower.includes('bangalore')) locText = 'Bengaluru, Karnataka';

      setResolved({
        query: text,
        domainId,
        domainName,
        subdomainId,
        subdomainName,
        capabilityId,
        capabilityName,
        solutionBundleId,
        solutionBundleName,
        location: locText,
      });
    } catch (err) {
      console.error('Error resolving intent:', err);
    } finally {
      setIsResolving(false);
    }
  };

  useEffect(() => {
    if (query) {
      resolveQuery(query);
    }
  }, []);

  // Launch journey through universal canonical navigation pipeline
  const handleLaunchSolutionJourney = () => {
    if (!resolved) return;

    if (resolved.solutionBundleId) {
      navigateTo({
        layer: 4,
        domainId: resolved.domainId,
        subdomainId: resolved.subdomainId,
        capabilityId: resolved.capabilityId,
        bundleId: resolved.solutionBundleId,
        name: resolved.solutionBundleName,
      });
    } else if (resolved.capabilityId) {
      navigateTo({
        layer: 3,
        domainId: resolved.domainId,
        subdomainId: resolved.subdomainId,
        capabilityId: resolved.capabilityId,
        name: resolved.capabilityName,
      });
    } else {
      navigateTo({
        layer: 2,
        domainId: resolved.domainId,
        subdomainId: resolved.subdomainId,
        name: resolved.domainName,
      });
    }
  };

  const handleReturnWithFlight = () => {
    navigateTo({ layer: 1 });
  };

  return (
    <div className="w-full min-h-[calc(100vh-74px)] bg-[#010814] text-white flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
      {/* Dynamic Background Quantum Singularity Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,227,253,0.15)_0%,rgba(168,85,247,0.1)_50%,transparent_75%)] blur-3xl pointer-events-none" />

      {/* 1. Top Navigation Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pb-4 border-b border-[#00dfff]/20 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#041426] border border-[#00e3fd]/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,227,253,0.3)]">
            <Cpu className="w-5 h-5 text-[#00e3fd]" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-mono font-bold tracking-wider text-white uppercase">
              AAi INTENT CORE EXPERIENCE
            </h1>
            <p className="text-xs text-[#9ec5de]">
              Your starting point. From idea to real-world impact.
            </p>
          </div>
        </div>

        <button
          onClick={handleReturnWithFlight}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#041426] hover:bg-[#07213d] border border-[#00dfff]/30 hover:border-[#00e3fd] text-xs font-mono font-semibold text-[#c3d9ea] hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#00e3fd]" />
          <span>Return to Universe (M01)</span>
        </button>
      </div>

      {/* 2. Main 3-Column Intent Architecture */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1 mb-10">
        {/* Left Column: 4 Value Pillars (Cols: 3) */}
        <div className="lg:col-span-3 space-y-3.5">
          <div className="p-4 rounded-2xl bg-[#030e1d]/85 border border-[#00dfff]/20 space-y-4 shadow-sm">
            <div className="border-b border-[#00dfff]/15 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7dd3fc] font-bold">
                CORE CAPABILITIES
              </span>
              <h3 className="text-xs font-bold text-white mt-0.5">Architectural Pillars</h3>
            </div>

            {/* Pillar 1 */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00e3fd]">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Express Naturally</span>
              </div>
              <p className="text-[11px] text-[#9ec5de] leading-relaxed">
                Describe business objectives naturally. No rigid menus or complicated taxonomies.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#38bdf8]">
                <Layers className="w-3.5 h-3.5 shrink-0" />
                <span>AAi Understands</span>
              </div>
              <p className="text-[11px] text-[#9ec5de] leading-relaxed">
                Progressively extracts Domain, Business World, Capability, Bundle, and Geography.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#a855f7]">
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span>Explore Journeys</span>
              </div>
              <p className="text-[11px] text-[#9ec5de] leading-relaxed">
                Understand, Configure, Build, Compare, and Execute with guided architectural governance.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#34d399]">
                <Rocket className="w-3.5 h-3.5 shrink-0" />
                <span>Always Connected</span>
              </div>
              <p className="text-[11px] text-[#9ec5de] leading-relaxed">
                Seamless spatial transit across the entire 6-layer Solution Universe.
              </p>
            </div>
          </div>
        </div>

        {/* Center Column: The Living Intent Core & Resolution Display (Cols: 6) */}
        <div className="lg:col-span-6 flex flex-col items-center text-center space-y-6">
          {/* Central Rotating AAi Emblem with Concentric Cognitive Orbits */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
            {/* Concentric Cognitive Orbits */}
            <div className="absolute inset-0 rounded-full border border-[#00e3fd]/30 border-dashed animate-[spin_35s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-[#a855f7]/30 animate-[spin_25s_linear_infinite_reverse]" />

            {/* Core Disc Body */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#041224] border-2 border-[#00e3fd] shadow-[0_0_40px_rgba(0,227,253,0.5)] flex items-center justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                <ArchitectAnyLogo />
              </div>
            </div>
          </div>

          {/* Large Typographic Dominance */}
          <div className="space-y-1">
            <span className="text-xs font-mono tracking-[0.3em] font-bold text-[#7dd3fc] uppercase">
              AAi INTELLIGENCE ENGINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00e3fd] to-[#bdf4ff] drop-shadow-[0_0_20px_rgba(0,227,253,0.6)]">
              INTENT
            </h2>
            <p className="text-xs sm:text-sm text-[#9ec5de] font-mono">
              What do you want to create, solve, discover, or transform?
            </p>
          </div>

          {/* Interactive Natural Language Input Bar */}
          <div className="w-full max-w-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) resolveQuery(query);
              }}
              className="relative flex items-center rounded-2xl bg-[#031122]/95 border-2 border-[#00dfff]/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] focus-within:border-[#00e3fd] focus-within:shadow-[0_0_35px_rgba(0,227,253,0.35)] transition-all p-1.5"
            >
              {isResolving ? (
                <Loader2 className="w-4 h-4 text-[#00e3fd] ml-3 shrink-0 animate-spin" />
              ) : (
                <Search className="w-4 h-4 text-[#00e3fd] ml-3 shrink-0" />
              )}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your business intent or problem statement..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-[#688ea8] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  const demo = 'Build an event marketplace near Coimbatore';
                  setQuery(demo);
                  resolveQuery(demo);
                }}
                title="Use Voice / Mic Simulation"
                className="p-2 rounded-xl text-[#9ec5de] hover:text-[#00e3fd] hover:bg-[#071d33] transition-colors cursor-pointer"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="submit"
                aria-label="Submit Intent"
                className="p-2 rounded-xl bg-[#00e3fd] hover:bg-[#38bdf8] text-[#001f24] transition-all cursor-pointer shadow-sm hover:scale-105 ml-1"
              >
                <ArrowRight className="w-4 h-4 font-bold" />
              </button>
            </form>
          </div>

          {/* Progressive Resolution Card */}
          {resolved && (
            <div className="w-full max-w-lg p-5 rounded-2xl bg-[#030e1d]/90 border border-[#00dfff]/30 shadow-[0_0_30px_rgba(0,0,0,0.6)] text-left space-y-4 transition-all">
              <div className="flex items-center justify-between border-b border-[#00dfff]/20 pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00e3fd]" />
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    AAI UNDERSTANDS YOUR INTENT
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00e3fd]/15 border border-[#00e3fd]/30 text-[#00e3fd] font-bold">
                  Progressive Resolution
                </span>
              </div>

              {/* Resolution Hierarchy Breakdown */}
              <div className="space-y-2.5 font-mono text-xs">
                {/* Domain */}
                <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-[#041426]/70 border border-[#00dfff]/15">
                  <div className="text-[#9ec5de]">Domain:</div>
                  <div className="font-bold text-white text-right">
                    {resolved.domainName} <span className="text-[#00e3fd]">({resolved.domainId})</span>
                  </div>
                </div>

                {/* Subdomain */}
                <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-[#041426]/70 border border-[#00dfff]/15">
                  <div className="text-[#9ec5de]">Business World:</div>
                  <div className="font-bold text-[#7dd3fc] text-right">
                    {resolved.subdomainName} <span className="opacity-70">({resolved.subdomainId})</span>
                  </div>
                </div>

                {/* Capability */}
                <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-[#041426]/70 border border-[#00dfff]/15">
                  <div className="text-[#9ec5de]">Capability:</div>
                  <div className="font-bold text-[#a855f7] text-right">
                    {resolved.capabilityName}
                  </div>
                </div>

                {/* Solution Bundle */}
                <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-[#041426]/70 border border-[#00dfff]/15">
                  <div className="text-[#9ec5de]">Solution Bundle:</div>
                  <div className="font-bold text-[#34d399] text-right truncate max-w-[220px]">
                    {resolved.solutionBundleName}
                  </div>
                </div>

                {/* Location Context */}
                <div className="flex items-center justify-between gap-2 px-2 py-1 text-[11px] text-[#9ec5de]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00e3fd]" />
                    <span>Location Context:</span>
                  </div>
                  <span className="font-bold text-white">{resolved.location}</span>
                </div>
              </div>

              {/* Call-to-action Launch Journey Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={handleLaunchSolutionJourney}
                  className="w-full flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00e3fd] to-[#38bdf8] text-[#001f24] font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,227,253,0.4)] hover:shadow-[0_0_30px_rgba(0,227,253,0.6)] hover:scale-[1.02] cursor-pointer"
                >
                  <span>Begin Solution Journey</span>
                  <ArrowRight className="w-4 h-4 font-bold" />
                </button>
                <button
                  onClick={() =>
                    navigateTo(
                      {
                        layer: 2,
                        domainId: resolved.domainId,
                        subdomainId: resolved.subdomainId,
                        name: resolved.domainName,
                      },
                      { skipCinematic: true }
                    )
                  }
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#041426] hover:bg-[#07213d] border border-[#00dfff]/30 font-mono text-xs text-[#c3d9ea] hover:text-white transition-colors cursor-pointer"
                >
                  Direct View
                </button>
              </div>

              {/* Matching Canonical Catalog Search Results if found */}
              {searchResults.length > 0 && (
                <div className="pt-2 border-t border-[#00dfff]/15 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-[#7dd3fc] font-bold">
                    Direct Solution Matches:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {searchResults.map((res) => (
                      <button
                        key={res.id}
                        onClick={() => navigateTo({ type: 'search-result', result: res })}
                        className="text-left p-2 rounded-lg bg-[#041426]/80 hover:bg-[#072545] border border-[#00dfff]/20 hover:border-[#00e3fd] text-[11px] transition-all cursor-pointer truncate"
                      >
                        <span className="font-bold text-white truncate block">{res.name}</span>
                        <span className="text-[10px] text-[#9ec5de] truncate block">
                          {res.category || res.type}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Popular Intent Examples & Entry Point Verification (Cols: 3) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Popular Intent Examples */}
          <div className="p-4 rounded-2xl bg-[#030e1d]/85 border border-[#00dfff]/20 space-y-3 shadow-sm">
            <div className="border-b border-[#00dfff]/15 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7dd3fc] font-bold">
                POPULAR INTENTS
              </span>
              <h3 className="text-xs font-bold text-white mt-0.5">Click to resolve & test</h3>
            </div>

            <div className="space-y-1.5">
              {suggestedIntents.map((intentText) => (
                <button
                  key={intentText}
                  onClick={() => {
                    setQuery(intentText);
                    resolveQuery(intentText);
                  }}
                  className="w-full text-left p-2.5 rounded-xl border border-transparent hover:border-[#00e3fd]/40 bg-[#041426]/60 hover:bg-[#07213d] text-[11px] text-[#c3d9ea] hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{intentText}</span>
                  <ArrowRight className="w-3 h-3 text-[#00e3fd] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Works From Any Entry Point Checklist */}
          <div className="p-4 rounded-2xl bg-[#030e1d]/85 border border-[#00dfff]/20 space-y-2.5 shadow-sm text-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7dd3fc] font-bold block border-b border-[#00dfff]/15 pb-1.5">
              CANONICAL NAVIGATION PIPELINE
            </span>

            <div className="space-y-1.5 text-[11px] font-mono text-[#9ec5de]">
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00e3fd] shrink-0" />
                <span>Main Universe selection</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00e3fd] shrink-0" />
                <span>Left navigation rail</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00e3fd] shrink-0" />
                <span>Right intelligence rail</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00e3fd] shrink-0" />
                <span>Global Intent Search</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00e3fd] shrink-0" />
                <span>Breadcrumb / Up Level</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00e3fd] shrink-0" />
                <span>AI recommendations</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00e3fd] shrink-0" />
                <span>Layer-specific spatial flight</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
