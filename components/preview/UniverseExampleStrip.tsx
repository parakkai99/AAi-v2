/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Context: M01 Solution Universe — Example Entry
 * Version: AAi-V2.0.1
 *
 * Purpose:
 * - Tiny configurable example CTA inside the existing Universe transition gap.
 * - Demonstrates Objective → Outcome without replacing the AAi Universe home.
 * - Target/action remain data-driven so future examples can be Admin/JSON managed.
 */

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export interface UniverseExampleEntry {
  id: string;
  eyebrow: string;
  title: string;
  image?: string;
  action: {
    type: "solution" | "objective";
    target: string;
  };
}

export interface UniverseExampleStripProps {
  entry?: UniverseExampleEntry;
  onOpenSolution?: (solutionId: string) => void;
  onOpenObjective?: (objective: string) => void;
}

const DEFAULT_ENTRY: UniverseExampleEntry = {
  id: "objective-hyperlocal-celebration",
  eyebrow: "TRY AN OBJECTIVE",
  title: "Plan a local celebration",
  image: "/assets/aai-objective-outcome-hero.png",
  action: {
    type: "solution",
    target: "D06.01.01.01.001",
  },
};

export const UniverseExampleStrip: React.FC<UniverseExampleStripProps> = ({
  entry = DEFAULT_ENTRY,
  onOpenSolution,
  onOpenObjective,
}) => {
  const handleClick = () => {
    if (entry.action.type === "solution") {
      onOpenSolution?.(entry.action.target);
      return;
    }
    onOpenObjective?.(entry.action.target);
  };

  return (
    <div className="flex justify-center px-0 py-0">
      <button
        type="button"
        onClick={handleClick}
        className="group inline-flex max-w-full items-center gap-2 rounded-xl border border-[#00dfff]/25 bg-[#031526]/70 px-3 py-1.5 backdrop-blur-md transition-all hover:border-[#00e3fd]/60 hover:bg-[#04243f]/85 hover:shadow-[0_0_18px_rgba(0,227,253,0.16)] cursor-pointer"
        aria-label={entry.title}
      >
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-[#00dfff]/20 bg-[#020914]">
          {entry.image ? (
            <img
              src={entry.image}
              alt=""
              className="h-full w-full object-cover object-[72%_50%] opacity-80 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <Sparkles className="m-1.5 h-4 w-4 text-[#00e3fd]" />
          )}
        </div>

        <span className="flex min-w-0 items-center gap-1.5 text-left">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#00e3fd]">
            {entry.eyebrow}
          </span>
          <span className="hidden h-2.5 w-px bg-[#00dfff]/25 sm:block" />
          <span className="truncate text-[11px] font-semibold text-[#eaf7ff] group-hover:text-[#00e3fd]">
            {entry.title}
          </span>
        </span>

        <ArrowRight className="h-3 w-3 shrink-0 text-[#00e3fd] transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};
