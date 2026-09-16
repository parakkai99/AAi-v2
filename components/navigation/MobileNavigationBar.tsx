import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import { useUniversalNavigation } from "@/src/context/UniversalNavigationContext";

/**
 * AAi native navigation bridge.
 *
 * The visual navigation is now owned by the global Quick rail on every
 * viewport. This component remains mounted only to translate Android's
 * physical/system Back action into AAi navigation history.
 */
export function MobileNavigationBar() {
  const { canGoBack, goBack } = useUniversalNavigation();

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

  return null;
}
