/**
 * AAi Application Entry
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: APP-ROUTE-001 — Browser Route Runtime
 * Status: ACTIVE
 * Version: 1.2.0
 *
 * AAi-v2 is a Vite SPA. Platform Admin and Solution Admin routes are
 * resolved by the application runtime rather than framework file-system routes.
 */

import React, { useEffect, useState } from "react";
import PreviewPage from "@/app/preview/page";
import AdminPage from "@/app/admin/page";
import SolutionAdminPage from "@/app/solution-admin/page";
import { ArchitectAnyProvider } from "@/src/context/ArchitectAnyContext";
import { CinematicNavigationProvider } from "@/src/context/CinematicNavigationContext";
import { UniversalNavigationProvider } from "@/src/context/UniversalNavigationContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

function getPathname() {
  return typeof window === "undefined" ? "/" : window.location.pathname;
}

function getSolutionId(pathname: string) {
  const match = pathname.match(/^\/solution-admin\/([^/]+)/i);
  return match ? decodeURIComponent(match[1]).toLowerCase() : null;
}

export default function App() {
  const [pathname, setPathname] = useState(getPathname);

  useEffect(() => {
    const handlePopState = () => setPathname(getPathname());
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function pushState(...args) {
      originalPushState.apply(window.history, args);
      setPathname(getPathname());
    };
    window.history.replaceState = function replaceState(...args) {
      originalReplaceState.apply(window.history, args);
      setPathname(getPathname());
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isSolutionAdminRootRoute = pathname === "/solution-admin" || pathname === "/solution-admin/";
  const solutionId = getSolutionId(pathname);
  const isSolutionAdminRoute = Boolean(solutionId);

  return (
    <ErrorBoundary fallbackTitle="ArchitectAny Experience Protected">
      <ArchitectAnyProvider>
        <CinematicNavigationProvider>
          <UniversalNavigationProvider>
            {isSolutionAdminRootRoute
              ? <SolutionAdminPage />
              : isSolutionAdminRoute
                ? <SolutionAdminPage solutionId={solutionId!} />
                : isAdminRoute
                  ? <AdminPage />
                  : <PreviewPage />}
          </UniversalNavigationProvider>
        </CinematicNavigationProvider>
      </ArchitectAnyProvider>
    </ErrorBoundary>
  );
}
