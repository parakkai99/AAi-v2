"use client";

import React, { useEffect } from "react";

export default function SolutionAdminRootPage() {
  useEffect(() => {
    window.location.replace("/solution-admin/jaico");
  }, []);

  return (
    <div className="min-h-screen bg-[#020914] text-[#eaf7ff] flex items-center justify-center">
      <div className="rounded-2xl border border-cyan-400/20 bg-[#061525]/90 px-6 py-5 text-center">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400">
          Solution Administration
        </div>
        <div className="mt-2 text-sm text-[#82a5bb]">
          Opening the Jaico-Mart solution control plane…
        </div>
      </div>
    </div>
  );
}
