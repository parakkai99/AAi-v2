/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Context: AAi-V2.0.1 — L5 Hyperlocal Solution Home
 * Status: ACTIVE
 *
 * Purpose:
 * - Solution-specific Objective → Outcome experience for the Hyperlocal
 *   Event & Celebration Marketplace.
 * - Reached from the Universe "TRY SAMPLE" entry or normal L5 navigation.
 * - Does not replace or modify the AAi Universe presentation.
 */

import React, { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Search,
  Sparkles,
  Users,
  CalendarDays,
  Utensils,
  Camera,
  Music2,
  CarFront,
  PartyPopper,
  Palette,
  Workflow,
} from "lucide-react";
import type { Solution } from "@/src/types";
import { HyperlocalObjectiveOutcomeMap, type HyperlocalMapNode } from "./HyperlocalObjectiveOutcomeMap";

interface HyperlocalSolutionHomeProps {
  solution: Solution;
  onBackToUniverse: () => void;
}

const SERVICES = [
  { id: "venue", label: "Venue", icon: CalendarDays },
  { id: "catering", label: "Catering", icon: Utensils },
  { id: "decoration", label: "Decoration", icon: Palette },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "music", label: "Music & Entertainment", icon: Music2 },
  { id: "transport", label: "Transport", icon: CarFront },
  { id: "support", label: "Event Support", icon: Users },
];

const JOURNEY = [
  ["01", "Understand", "Capture the event objective, place, date and people."],
  ["02", "Discover", "Find relevant local capabilities and providers."],
  ["03", "Compose", "Combine the services needed for one event plan."],
  ["04", "Match", "Compare providers using location, availability and fit."],
  ["05", "Book", "Select the plan and initiate the booking workflow."],
  ["06", "Fulfil", "Coordinate execution and verify the completed outcome."],
];

export const HyperlocalSolutionHome: React.FC<HyperlocalSolutionHomeProps> = ({
  solution,
  onBackToUniverse,
}) => {
  const [objective, setObjective] = useState("Plan a local celebration");
  const [activeService, setActiveService] = useState("venue");
  const [activeNode, setActiveNode] = useState<HyperlocalMapNode>("objective");
  const objectiveRef = useRef<HTMLInputElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLElement>(null);

  const handleMapNode = (node: HyperlocalMapNode) => {
    setActiveNode(node);

    if (node === "objective") {
      objectiveRef.current?.focus();
      objectiveRef.current?.select();
      return;
    }

    if (node === "capabilities" || node === "services" || node === "providers") {
      servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const serviceText = useMemo(
    () =>
      SERVICES.find((service) => service.id === activeService)?.label ||
      "Event Services",
    [activeService],
  );

  return (
    <main className="min-h-[calc(100vh-74px)] bg-gradient-to-b from-[#020914] via-[#03111f] to-[#020914] text-[#eaf7ff] px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToUniverse}
            className="inline-flex items-center gap-2 rounded-xl border border-[#00dfff]/30 bg-[#031526]/80 px-3 py-2 font-mono text-[11px] text-[#00dfff] transition hover:border-[#00e3fd] hover:bg-[#04243f] cursor-pointer"
          >
            ← Back to Solution Universe
          </button>

          <div className="flex items-center gap-1.5 rounded-xl border border-[#00dfff]/15 bg-[#021120]/80 px-3 py-2 font-mono text-[10px] text-[#82a5bb]">
            <span className="text-[#00dfff]">L5</span>
            <span>•</span>
            <span>{solution.id}</span>
            <span>•</span>
            <span>Hyperlocal Marketplace</span>
          </div>
        </div>

        <HyperlocalObjectiveOutcomeMap
          activeNode={activeNode}
          onSelectNode={handleMapNode}
        />

        <section className="relative overflow-hidden rounded-3xl border border-[#00dfff]/30 bg-gradient-to-br from-[#05213a] via-[#031526] to-[#020b16] p-5 sm:p-7 lg:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00dfff]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#2c8cff]/10 blur-3xl" />

          <div className="relative z-10 grid gap-7 lg:grid-cols-[1.35fr_.85fr] lg:items-center">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-[#00e3fd] px-2.5 py-1 font-mono text-[10px] font-black text-[#001a22]">
                  OBJECTIVE → OUTCOME
                </span>
                <span className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] text-emerald-300">
                  LOCAL SERVICE COMPOSITION
                </span>
              </div>

              <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-[#f1fbff] sm:text-4xl lg:text-5xl">
                {solution.name}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#9bd5e8] sm:text-base">
                Start with what you want to accomplish. AAi discovers local
                capabilities, composes the services you need, matches providers,
                and carries the plan toward a bookable outcome.
              </p>

              <div className="mt-6 rounded-2xl border border-[#00dfff]/20 bg-[#020b16]/75 p-3 sm:p-4">
                <label className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#00e3fd]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Your objective
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#00dfff]/20 bg-[#031526] px-3">
                    <Search className="h-4 w-4 shrink-0 text-[#00e3fd]" />
                    <input
                      ref={objectiveRef}
                      value={objective}
                      onChange={(event) => setObjective(event.target.value)}
                      className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-[#eaf7ff] outline-none placeholder:text-[#5d8197]"
                      placeholder="Tell AAi what you want to accomplish"
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00e3fd] to-[#2c9dff] px-5 py-2.5 font-mono text-xs font-black text-[#00141c] shadow-[0_0_22px_rgba(0,227,253,0.22)] transition hover:brightness-110 cursor-pointer"
                  >
                    Build my plan <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#00dfff]/20 bg-[#020b16]/70 p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#6f9bb0]">
                    Sample outcome
                  </div>
                  <div className="mt-1 text-base font-bold text-[#eaf7ff]">
                    A coordinated local event plan
                  </div>
                </div>
                <PartyPopper className="h-6 w-6 text-[#00e3fd]" />
              </div>

              <div className="space-y-2">
                {["Objective understood", "Local services composed", "Providers matched", "Booking workflow ready"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-lg border border-emerald-400/15 bg-emerald-400/5 px-3 py-2 text-xs text-[#bcefdc]"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                      {item}
                    </div>
                  ),
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-[#6f9bb0]">
                <MapPin className="h-3.5 w-3.5 text-[#00e3fd]" />
                Location-aware discovery
              </div>
            </div>
          </div>
        </section>

        <section ref={servicesRef} className="rounded-2xl border border-[#00dfff]/20 bg-[#021222]/90 p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#00dfff]/15 pb-3">
            <div className="flex items-center gap-2">
              <Workflow className="h-4 w-4 text-[#00dfff]" />
              <h2 className="text-sm font-bold text-[#eaf7ff] sm:text-base">
                Compose the services for your objective
              </h2>
            </div>
            <span className="font-mono text-[9px] text-[#00dfff]">
              7 service capabilities
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {SERVICES.map(({ id, label, icon: Icon }) => {
              const active = activeService === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveService(id)}
                  className={
                    "group rounded-xl border p-3 text-left transition cursor-pointer " +
                    (active
                      ? "border-[#00e3fd]/70 bg-[#00e3fd]/10 shadow-[0_0_18px_rgba(0,227,253,0.12)]"
                      : "border-[#00dfff]/15 bg-[#031526]/70 hover:border-[#00dfff]/40")
                  }
                >
                  <Icon
                    className={
                      "mb-2 h-5 w-5 " +
                      (active ? "text-[#00e3fd]" : "text-[#6fa9c1]")
                    }
                  />
                  <div className="text-[11px] font-semibold leading-4 text-[#dceefa]">
                    {label}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-xl border border-[#00dfff]/15 bg-[#031526]/50 px-3 py-2.5 text-xs text-[#9bd5e8]">
            Selected capability:{" "}
            <span className="font-semibold text-[#00e3fd]">{serviceText}</span>
            {" "}can be discovered, matched and composed with the rest of the event plan.
          </div>
        </section>

        <section ref={journeyRef} className="rounded-2xl border border-[#00dfff]/20 bg-[#021222]/90 p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2 border-b border-[#00dfff]/15 pb-3">
            <ArrowRight className="h-4 w-4 text-[#00dfff]" />
            <h2 className="text-sm font-bold text-[#eaf7ff] sm:text-base">
              Objective → Outcome journey
            </h2>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {JOURNEY.map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-xl border border-[#00dfff]/15 bg-[#031526]/55 p-3"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-mono text-[9px] font-bold text-[#00e3fd]">
                    {number}
                  </span>
                  <span className="text-xs font-bold text-[#eaf7ff]">{title}</span>
                </div>
                <p className="text-[11px] leading-5 text-[#7fa9bd]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-300">
              Ready for the next layer
            </div>
            <h2 className="mt-1 text-base font-bold text-[#eaf7ff]">
              From composed plan to execution
            </h2>
            <p className="mt-1 text-xs text-[#8eb5c7]">
              L5 defines the solution; L6 will prepare and operate its runtime.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-[#021a18] px-4 py-2 font-mono text-[10px] text-emerald-200">
            Solution ready <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
        </section>
      </div>
    </main>
  );
};
