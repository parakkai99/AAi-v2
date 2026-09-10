/**
 * NGLiving Reference Application
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: NGLIVING-APP-001 — Reference Application Shell
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * Purpose:
 * - Validate which application capabilities can be carried from Parakkai.
 * - Keep NGLiving identity separate from Parakkai identity.
 * - Keep this first implementation deliberately data-oriented and small.
 */

import React, { useMemo, useState } from "react";

interface NGLivingAppProps {
  onExitToAAi?: () => void;
}

type ViewId =
  | "home"
  | "today"
  | "events"
  | "media"
  | "stories"
  | "community"
  | "nearby"
  | "marketplace"
  | "map";

interface Capability {
  id: ViewId;
  label: string;
  description: string;
  decision: "carry" | "adapt";
}

const CAPABILITIES: Capability[] = [
  { id: "home", label: "Home", description: "Primary application experience.", decision: "carry" },
  { id: "today", label: "Today", description: "Current and daily information.", decision: "carry" },
  { id: "events", label: "Events", description: "Discover and navigate events.", decision: "carry" },
  { id: "media", label: "Media", description: "Discover video, audio and other media.", decision: "carry" },
  { id: "stories", label: "Stories", description: "Articles, stories and editorial content.", decision: "carry" },
  { id: "community", label: "Community", description: "Participation and contribution layer.", decision: "carry" },
  { id: "nearby", label: "Nearby", description: "Local discovery and nearby services.", decision: "carry" },
  { id: "marketplace", label: "Marketplace", description: "Commerce and transaction capability.", decision: "adapt" },
  { id: "map", label: "Map", description: "Spatial and location capability.", decision: "adapt" },
];

export const NGLivingApp: React.FC<NGLivingAppProps> = ({ onExitToAAi }) => {
  const [activeView, setActiveView] = useState<ViewId>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeCapability = useMemo(
    () => CAPABILITIES.find((item) => item.id === activeView) ?? CAPABILITIES[0],
    [activeView],
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button
            type="button"
            onClick={() => setActiveView("home")}
            className="text-left"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">
              AAi Application
            </div>
            <div className="text-xl font-semibold tracking-tight">NGLiving</div>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {CAPABILITIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`rounded-full px-3 py-2 text-xs transition ${
                  activeView === item.id
                    ? "bg-white text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {onExitToAAi ? (
              <button
                type="button"
                onClick={onExitToAAi}
                className="hidden rounded-full border border-white/15 px-3 py-2 text-xs text-slate-300 hover:bg-white/10 md:block"
              >
                AAi
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="rounded-full border border-white/15 px-3 py-2 text-xs text-slate-200 hover:bg-white/10 md:hidden"
              aria-expanded={isMenuOpen}
            >
              Menu
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <nav className="border-t border-white/10 px-5 py-3 md:hidden">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
              {CAPABILITIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveView(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="rounded-xl bg-white/5 px-3 py-3 text-left text-xs text-slate-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:py-12">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-violet-400/10 p-6 shadow-2xl md:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">
              Reference Application / Capability Test
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              NGLiving
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              A second application instance used to test what the current AAi
              application framework carries from Parakkai without carrying
              Parakkai identity.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Active capability</div>
              <div className="mt-2 text-xl font-medium">{activeCapability.label}</div>
              <p className="mt-2 text-sm leading-6 text-slate-400">{activeCapability.description}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Portability decision</div>
              <div className="mt-2 text-xl font-medium capitalize">{activeCapability.decision}</div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Recorded in <code>ngliving/config/capabilities.yaml</code>.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Application boundary</div>
              <div className="mt-2 text-xl font-medium">NGLiving</div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Identity and content stay outside the shared runtime.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Carried functionality</div>
              <h2 className="mt-1 text-2xl font-semibold">What the second site receives</h2>
            </div>
            <div className="hidden text-xs text-slate-500 md:block">Parakkai → NGLiving portability test</div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`rounded-2xl border p-5 text-left transition ${
                  activeView === item.id
                    ? "border-cyan-300/40 bg-cyan-300/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{item.label}</span>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-slate-400">
                    {item.decision}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
