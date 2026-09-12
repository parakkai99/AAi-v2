/**
 * P-PARAKKAI-003 — Parakkai Master Architecture & Router
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.2
 *
 * CORE CONTRACT:
 * - HOME route is a SINGLE-VIEW, FULL-VIEWPORT, ZERO-SCROLL cinematic experience.
 * - Fits within 100vh without vertical page scrolling.
 * - Other routes (Temple, Darshan, Journey, Today, Events, Media, Nature, Map, Nearby, Shop)
 *   are separate full-page experiences with normal scrolling and the rich ParakkaiFooter.
 */

import React, { useState, useEffect } from "react";
import { ParakkaiHeader } from "./layout/ParakkaiHeader";
import { ParakkaiLeftRail } from "./layout/ParakkaiLeftRail";
import { ParakkaiRightRail } from "./layout/ParakkaiRightRail";
import { ParakkaiFooter } from "./layout/ParakkaiFooter";
import { ParakkaiHomeBottomBar } from "./layout/ParakkaiHomeBottomBar";
import SpatialJourneyStage from "./home/spatial/SpatialJourneyStage";

// Views
import { ParakkaiHomeStage } from "./home/ParakkaiHomeStage";
import { TempleExperienceView } from "./temple/TempleExperienceView";
import { JourneyExperienceView } from "./journey/JourneyExperienceView";
import { ParakkaiNatureView } from "./nature/ParakkaiNatureView";
import { DarshanView } from "./darshan/DarshanView";
import { TodayScheduleView } from "./today/TodayScheduleView";
import { EventsView } from "./events/EventsView";
import { MediaDiscoveryView } from "./media/MediaDiscoveryView";
import { BlogStoriesView } from "./blog/BlogStoriesView";
import { CommunityView } from "./community/CommunityView";
import { HyperlocalDirectoryView } from "./nearby/HyperlocalDirectoryView";
import { HypermarketView } from "./marketplace/HypermarketView";
import { SacredMapView } from "./map/SacredMapView";

// Modals
import { PoojaBookingModal } from "./pooja/PoojaBookingModal";
import { CartDrawer } from "./marketplace/CartDrawer";

// Services and Contracts
import { parakkaiService } from "../services/parakkaiService";
import { ParakkaiThemeDefinition } from "../contracts/theme";
import { CartItem, HypermarketProduct } from "../contracts/marketplace";
import { useExperienceRuntime } from "@/src/experience";

interface ParakkaiAppProps {
  initialView?: string;
  onExitToAAi?: () => void;
}

export const ParakkaiApp: React.FC<ParakkaiAppProps> = ({
  initialView = "home",
  onExitToAAi,
}) => {
  const [activeView, setActiveView] = useState<string>(initialView);
  const [siteConfig, setSiteConfig] = useState(() =>
    parakkaiService.getSiteConfig(),
  );
  const [activeTheme, setActiveTheme] = useState<ParakkaiThemeDefinition>(() =>
    parakkaiService.getActiveTheme(),
  );
  const { theme: experienceTheme, layout: experienceLayout } = useExperienceRuntime();

  useEffect(() => {
    const tokens = experienceTheme.tokens;

    setActiveTheme((current) => ({
      ...current,
      id: `aai-${experienceTheme.id}`,
      name: experienceTheme.name,
      description: experienceTheme.description,
      colors: {
        ...current.colors,
        primarySkyBlue: tokens.primary,
        skyBlueHover: tokens.secondary,
        sacredGold: tokens.accent,
        goldAccent: tokens.accent,
        deepTempleNavy: tokens.background,
        sacredIvoryStone: tokens.surfaceAlt,
        templeGreen: tokens.secondary,
        templeCrimson: tokens.primary,
        surfaceCanvas: tokens.background,
        surfaceElevated: tokens.surface,
        surfaceCard: tokens.surface,
        borderSubtle: tokens.border,
        borderGold: tokens.border,
        textPrimary: tokens.text,
        textSecondary: tokens.textMuted,
        textGold: tokens.accent,
        sunlightGlow: tokens.accent,
      },
    }));
  }, [experienceTheme]);

  // Cinematic Scene Mode for Home
  const [sceneMode, setSceneMode] = useState<"facade" | "aerial" | "lake">(
    "facade",
  );

  // Ambient sound state (Default: MUTED as required by contract)
  const [isSoundMuted, setIsSoundMuted] = useState(true);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => parakkaiService.getCart());
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Pooja Modal State
  const [isPoojaModalOpen, setIsPoojaModalOpen] = useState(false);
  const [selectedOfferingId, setSelectedOfferingId] = useState<string | undefined>(undefined);

  // User state
  const [currentUser] = useState(() => parakkaiService.getCurrentUser());

  // Synchronize theme changes
  const handleThemeChange = (themeId: string) => {
    parakkaiService.setActiveTheme(themeId);
    setActiveTheme(parakkaiService.getActiveTheme());
    setSiteConfig(parakkaiService.getSiteConfig());
  };

  // Cart operations
  const handleAddToCart = (product: HypermarketProduct) => {
    const updated = parakkaiService.addToCart(product, 1);
    setCart([...updated]);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const updated = parakkaiService.updateCartQuantity(productId, delta);
    setCart([...updated]);
  };

  const handleRemoveFromCart = (productId: string) => {
    const updated = parakkaiService.removeFromCart(productId);
    setCart([...updated]);
  };

  const handleClearCart = () => {
    parakkaiService.clearCart();
    setCart([]);
  };

  const handleOpenPoojaBooking = (offeringId?: string) => {
    setSelectedOfferingId(offeringId);
    setIsPoojaModalOpen(true);
  };

  // Sound chime toggle
  const handleToggleSound = () => {
    const nextState = !isSoundMuted;
    setIsSoundMuted(nextState);
    if (!nextState) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(528, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
      } catch (e) {
        // Safe Web Audio fallback
      }
    }
  };

  const isHomeView = activeView === "home";

  return (
    <div
      id="parakkai-app-root"
      data-aai-layout={experienceLayout.id}
      data-aai-layout-navigation={experienceLayout.navigation}
      data-aai-view={activeView}
      data-aai-theme-tone={experienceTheme.category === "dark" || experienceTheme.id === "ai-era" ? "dark" : "light"}
      className={`font-sans transition-colors duration-300 ${
        isHomeView
          ? "h-screen max-h-screen overflow-hidden flex flex-col"
          : "min-h-screen flex flex-col"
      }`}
      style={{
        backgroundColor: experienceTheme.tokens.background,
        color: experienceTheme.tokens.text,
        ["--aai-solution-surface"]: experienceTheme.tokens.surface,
        ["--aai-solution-surface-alt"]: experienceTheme.tokens.surfaceAlt,
        ["--aai-solution-primary"]: experienceTheme.tokens.primary,
        ["--aai-solution-secondary"]: experienceTheme.tokens.secondary,
        ["--aai-solution-accent"]: experienceTheme.tokens.accent,
        ["--aai-solution-border"]: experienceTheme.tokens.border,
        ["--aai-solution-radius"]: experienceTheme.tokens.radius,
        ["--aai-font-display"]: experienceTheme.typography.display,
        ["--aai-font-body"]: experienceTheme.typography.body,
        ["--aai-font-mono"]: experienceTheme.typography.mono,
        fontFamily: "var(--aai-font-body)",
      } as React.CSSProperties & Record<`--aai-${string}`, string>}
    >
      <style>{`
#parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) { font-family: var(--aai-font-body) !important; }
#parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .font-serif { font-family: var(--aai-font-display) !important; }
#parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .font-mono { font-family: var(--aai-font-mono) !important; }
#parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-white, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-white\/95, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-white\/90, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-slate-100, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-slate-200, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-slate-300, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-slate-400, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-slate-500 { color: var(--aai-text) !important; }
#parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-white\/80, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-white\/65, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-white\/55, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-white\/45, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-white\/40 { color: var(--aai-text-muted) !important; }
#parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .border-slate-800, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .border-white\/10, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .border-white\/15, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .border-white\/20 { border-color: var(--aai-border) !important; }
#parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .bg-slate-950, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .bg-slate-900, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .bg-\\[\\#020914\\], #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .bg-\\[\\#03162b\\], #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .bg-\\[\\#031527\\] { background-color: var(--aai-surface) !important; }
#parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-amber-300, #parakkai-app-root[data-aai-theme-tone="light"]:not([data-aai-view="home"]) .text-amber-400 { color: var(--aai-accent) !important; }
`}</style>
      {/* 1. Header (Sticky Top-0) */}
      <ParakkaiHeader
        currentView={activeView}
        activeTheme={activeTheme}
        siteConfig={siteConfig}
        currentUser={currentUser}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onNavigate={(viewId) => {
          setActiveView(viewId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => {}}
        onOpenAdmin={() => {}}
        onOpenThemeModal={() => {
          // Cycle canonical Parakkai themes
          const next =
            activeTheme.id === "parakkai-sky"
              ? "parakkai-morning-gold"
              : activeTheme.id === "parakkai-morning-gold"
                ? "parakkai-twilight-deepam"
                : "parakkai-sky";
          handleThemeChange(next);
        }}
        onReturnToUniverse={onExitToAAi}
      />

      {/* 2. Main 3-Column / Stage Area */}
      <div
        className={`flex-1 w-full mx-auto flex gap-3 sm:gap-4 relative ${
          isHomeView
            ? "min-h-0 max-w-[1760px] px-2 sm:px-4 py-2 overflow-hidden"
            : "max-w-7xl px-4 sm:px-6 lg:px-8 py-6"
        }`}
      >
        {/* Left Discovery Rail (Desktop) */}
        {experienceLayout.railPolicy !== "none" && (
        <ParakkaiLeftRail
          currentView={activeView}
          activeTheme={activeTheme}
          onNavigate={(viewId) => {
            setActiveView(viewId);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
        )}

        {/* Center Stage Container */}
        <main
          id="parakkai-main-stage"
          className={`flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden focus:outline-none ${
            isHomeView ? "h-full w-full" : ""
          }`}
        >
          {/* HOME SINGLE-VIEW CINEMATIC EXPERIENCE */}
          {activeView === "home" && (
            <div className="h-full w-full min-h-0 min-w-0 flex-1 overflow-hidden">
              <SpatialJourneyStage />
            </div>
          )}

          {/* TEMPLE SANCTUM EXPERIENCE */}
          {activeView === "temple" && (
            <TempleExperienceView
              activeTheme={activeTheme}
              onNavigate={(viewId) => {
                setActiveView(viewId);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onBookPooja={handleOpenPoojaBooking}
            />
          )}

          {/* 7 STATIONS PILGRIM WALKWAY (Image 1) */}
          {activeView === "journey" && (
            <JourneyExperienceView
              activeTheme={activeTheme}
              onNavigate={(viewId) => {
                setActiveView(viewId);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onBookPooja={handleOpenPoojaBooking}
            />
          )}

          {/* SACRED DARSHAN EXPERIENCE */}
          {activeView === "darshan" && (
            <DarshanView
              activeTheme={activeTheme}
              onBookPooja={(offeringId) => handleOpenPoojaBooking(offeringId)}
              onNavigateToSchedule={() => setActiveView("today")}
            />
          )}

          {/* TODAY AT PARAKKAI */}
          {activeView === "today" && (
            <TodayScheduleView
              activeTheme={activeTheme}
              onBookPooja={() => handleOpenPoojaBooking()}
            />
          )}

          {/* FESTIVALS & EVENTS */}
          {activeView === "events" && <EventsView activeTheme={activeTheme} />}

          {/* DEVOTIONAL MEDIA & CHANTS */}
          {activeView === "media" && (
            <MediaDiscoveryView activeTheme={activeTheme} />
          )}

          {/* PARAKKAI NATURE & LAKE */}
          {activeView === "nature" && (
            <ParakkaiNatureView
              activeTheme={activeTheme}
              onNavigate={(viewId) => {
                setActiveView(viewId);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {/* TEMPLE STORIES & BLOG */}
          {activeView === "blog" && (
            <BlogStoriesView activeTheme={activeTheme} />
          )}

          {/* COMMUNITY SEVA */}
          {activeView === "community" && (
            <CommunityView activeTheme={activeTheme} />
          )}

          {/* HYPERLOCAL DIRECTORY */}
          {activeView === "nearby" && (
            <HyperlocalDirectoryView activeTheme={activeTheme} />
          )}

          {/* HYPERMARKET */}
          {activeView === "hypermarket" && (
            <HypermarketView
              activeTheme={activeTheme}
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
            />
          )}

          {/* SACRED MAP */}
          {activeView === "map" && (
            <SacredMapView
              activeTheme={activeTheme}
              onSelectStation={() => setActiveView("journey")}
            />
          )}
        </main>

        {/* Right Participation Rail (Desktop) */}
        {experienceLayout.railPolicy === "both" && (
        <ParakkaiRightRail
          currentView={activeView}
          activeTheme={activeTheme}
          onNavigate={(viewId) => {
            setActiveView(viewId);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenBookingModal={() => handleOpenPoojaBooking()}
          onOpenConcernModal={() => setActiveView("community")}
          onOpenIdeaModal={() => setActiveView("community")}
        />
        )}
      </div>

      {/* 3. Footer: Compact Bottom Bar on HOME, Rich ParakkaiFooter on Secondary Pages */}
      {isHomeView ? (
        <ParakkaiHomeBottomBar
          activeTheme={activeTheme}
          sceneMode={sceneMode}
          onSceneChange={setSceneMode}
          onNavigate={(viewId) => {
            setActiveView(viewId);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          isSoundMuted={isSoundMuted}
          onToggleSound={handleToggleSound}
          onOpenQuickInfo={() => setActiveView("temple")}
        />
      ) : (
        <ParakkaiFooter
          activeTheme={activeTheme}
          onNavigate={(viewId) => {
            setActiveView(viewId);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenAdmin={() => {}}
        />
      )}

      {/* 4. Modals & Drawers */}
      {isPoojaModalOpen && (
        <PoojaBookingModal
          activeTheme={activeTheme}
          initialOfferingId={selectedOfferingId}
          onClose={() => setIsPoojaModalOpen(false)}
        />
      )}

      <CartDrawer
        activeTheme={activeTheme}
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
};
