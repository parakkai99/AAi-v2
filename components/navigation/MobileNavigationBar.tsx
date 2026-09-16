import React, { useEffect } from "react";
import { ArrowLeft, ArrowRight, Home, Layers3 } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import { useUniversalNavigation } from "@/src/context/UniversalNavigationContext";

export function MobileNavigationBar() {
  const {
    currentWaypoint,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    goHome,
  } = useUniversalNavigation();

  useEffect(() => {
    if (Capacitor.getPlatform() !== "android") {
      return;
    }

    const listenerPromise = CapacitorApp.addListener("backButton", () => {
      if (canGoBack) {
        goBack();
      } else {
        void CapacitorApp.exitApp();
      }
    });

    return () => {
      void listenerPromise.then((listener) => listener.remove());
    };
  }, [canGoBack, goBack]);

  return (
    <div
      data-aai-mobile-navigation
      className="fixed inset-x-0 bottom-0 z-[100] sm:hidden pointer-events-none"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="mx-3 mb-2 rounded-2xl border border-cyan-400/20 bg-[#020914]/94 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.35)] pointer-events-auto">
        <div className="flex items-center justify-between gap-1 px-2 py-1.5">
          <NavButton
            label="Back"
            icon={ArrowLeft}
            disabled={!canGoBack}
            onClick={goBack}
          />
          <NavButton
            label="Home"
            icon={Home}
            active={currentWaypoint.layer === 1}
            onClick={goHome}
          />

          <div className="min-w-0 flex-1 px-1 text-center">
            <div className="mx-auto max-w-[150px] truncate text-[9px] font-mono uppercase tracking-[0.18em] text-cyan-300">
              {currentWaypoint.layerLabel}
            </div>
            <div className="mx-auto mt-0.5 max-w-[150px] truncate text-[10px] text-slate-400">
              {currentWaypoint.name}
            </div>
          </div>

          <NavButton
            label="Forward"
            icon={ArrowRight}
            disabled={!canGoForward}
            onClick={goForward}
          />
          <NavButton
            label="Stack"
            icon={Layers3}
            onClick={() => window.dispatchEvent(new CustomEvent("aai:toggle-app-stack"))}
          />
        </div>
      </div>
    </div>
  );
}

function NavButton({
  icon: Icon,
  label,
  disabled,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  disabled?: boolean;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={[
        "h-10 min-w-10 px-2 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all touch-manipulation",
        disabled
          ? "border-white/5 text-slate-600 opacity-60"
          : active
            ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
            : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-400/30 hover:text-cyan-200",
      ].join(" ")}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[8px] font-medium">{label}</span>
    </button>
  );
}
