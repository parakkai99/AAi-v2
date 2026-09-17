import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useUniversalNavigation } from "@/src/context/UniversalNavigationContext";

/**
 * AAi mobile navigation bridge + visible navigation controls.
 *
 * Android system Back is translated into AAi navigation history. The same
 * history is exposed as an explicit mobile Back / Home / Forward rail so a
 * user is never trapped inside a selected solution or application state.
 */
export function MobileNavigationBar() {
  const { canGoBack, canGoForward, goBack, goForward, goHome } =
    useUniversalNavigation();

  useEffect(() => {
    if (Capacitor.getPlatform() !== "android") {
      return;
    }

    const listenerPromise = CapacitorApp.addListener("backButton", () => {
      if (canGoBack) {
        void goBack();
      } else {
        void CapacitorApp.exitApp();
      }
    });

    return () => {
      void listenerPromise.then((listener) => listener.remove());
    };
  }, [canGoBack, goBack]);

  return (
    <nav
      aria-label="Mobile navigation"
      data-aai-mobile-navigation
      className="fixed bottom-0 left-0 right-0 z-[80] sm:hidden flex items-center justify-center gap-2 px-3 pt-2 bg-[#020914]/95 backdrop-blur-xl border-t border-[#00dfff]/20 shadow-[0_-8px_30px_rgba(0,0,0,0.55)]"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      <button type="button" onClick={() => void goBack()} disabled={!canGoBack} aria-label="Go back" className="flex-1 max-w-28 flex items-center justify-center gap-1.5 rounded-xl border border-[#00dfff]/25 bg-[#031526] px-3 py-2.5 text-xs font-semibold text-[#d9f7ff] disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <button type="button" onClick={() => void goHome()} aria-label="Go home" className="flex-1 max-w-28 flex items-center justify-center gap-1.5 rounded-xl border border-[#00e3fd]/45 bg-[#00dfff]/10 px-3 py-2.5 text-xs font-bold text-[#00e3fd] active:scale-[0.98]">
        <Home className="w-4 h-4" />
        Home
      </button>

      <button type="button" onClick={() => void goForward()} disabled={!canGoForward} aria-label="Go forward" className="flex-1 max-w-28 flex items-center justify-center gap-1.5 rounded-xl border border-[#00dfff]/25 bg-[#031526] px-3 py-2.5 text-xs font-semibold text-[#d9f7ff] disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]">
        Forward
        <ArrowRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
