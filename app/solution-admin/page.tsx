"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function SolutionAdminRootPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020914] text-[#eaf7ff] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-cyan-400/20 bg-[#061525]/90 p-6 shadow-2xl">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400">
          ArchitectAny Solution Administration
        </div>
        <h1 className="mt-2 text-2xl font-semibold">Choose a Solution</h1>
        <p className="mt-2 text-sm text-[#82a5bb]">
          Select the solution control plane to configure. The shared AAi framework remains platform-owned.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => router.push("/solution-admin/parakkai")}
            className="rounded-xl border border-white/10 bg-[#020914]/60 p-4 text-left hover:border-cyan-400/40"
          >
            <div className="text-sm font-semibold">Parakkai</div>
            <div className="mt-1 text-xs text-[#6e91a6]">Temple / living-place solution</div>
          </button>

          <button
            type="button"
            onClick={() => router.push("/solution-admin/ngliving")}
            className="rounded-xl border border-white/10 bg-[#020914]/60 p-4 text-left hover:border-cyan-400/40"
          >
            <div className="text-sm font-semibold">NGLiving</div>
            <div className="mt-1 text-xs text-[#6e91a6]">Solution control plane</div>
          </button>

          <button
            type="button"
            onClick={() => router.push("/solution-admin/jaico")}
            className="rounded-xl border border-cyan-400/10 bg-[#06201d]/50 p-4 text-left hover:border-cyan-400/40"
          >
            <div className="text-sm font-semibold text-emerald-200">Jaico-Mart</div>
            <div className="mt-1 text-xs text-[#6e91a6]">Marketplace model solution</div>
          </button>
        </div>
      </div>
    </div>
  );
}
