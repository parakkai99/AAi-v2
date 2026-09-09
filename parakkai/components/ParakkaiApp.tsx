/**
 * P-PARAKKAI-003 — Parakkai Master Architecture & Router
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.4
 *
 * CORE CONTRACT:
 * - HOME route is a SINGLE-VIEW, FULL-VIEWPORT, ZERO-SCROLL cinematic experience.
 * - Home cinematic mode bypasses the normal Parakkai website chrome.
 * - Cinematic mode provides minimal in-scene navigation into the full Parakkai experience.
 * - SpatialActivityRail remains inside the spatial scene for development/testing.
 * - Other routes (Temple, Darshan, Journey, Today, Events, Media, Nature, Map, Nearby, Shop)
 *   are separate full-page experiences with normal scrolling and the rich ParakkaiFooter.
 */

import React, { useState } from "react";
import { ParakkaiHeader } from "./layout/ParakkaiHeader";
import { ParakkaiLeftRail } from "./layout/ParakkaiLeftRail";
import { ParakkaiRightRail } from "./layout/ParakkaiRightRail";
import { ParakkaiFooter } from "./layout/ParakkaiFooter";
import SpatialJourneyStage from "./home/spatial/SpatialJourneyStage";

// Views
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

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => parakkaiService.getCart());
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Pooja Modal State
  const [isPoojaModalOpen, setIsPoojaModalOpen] = useState(false);
  const [selectedOfferingId, setSelectedOfferingId] = useState<
    string | undefined
  >(undefined);

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

  const isHomeView = activeView === "home";

  // HOME CINEMATIC SHELL ISOLATION
  // The spatial journey owns the complete viewport in Home mode.
  // Do not wrap Scene 01 with the normal header, left rail, right rail,
  // or bottom bar. Cinematic navigation is intentionally minimal and
  // lives inside SpatialJourneyStage.
  if (isHomeView) {
    return (
      <div
        id="parakkai-cinematic-home"
        className="fixed inset-0 h-screen w-screen overflow-hidden bg-black"
      >
        <SpatialJourneyStage onNavigate={setActiveView} />
      </div>
    );
  }

  return (
    <div
      id="parakkai-app-root"
      className="font-sans min-h-screen flex flex-col transition-colors duration-300"
      style={{
        backgroundColor: activeTheme.colors.surfaceCanvas,
        color: activeTheme.colors.textPrimary,
      }}
    >
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
      <div className="flex-1 w-full mx-auto flex gap-3 sm:gap-4 relative max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <ParakkaiLeftRail
          currentView={activeView}
          activeTheme={activeTheme}
          onNavigate={(viewId) => {
            setActiveView(viewId);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        <main
          id="parakkai-main-stage"
          className="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden focus:outline-none"
        >
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

          {activeView === "darshan" && (
            <DarshanView
              activeTheme={activeTheme}
              onBookPooja={(offeringId) => handleOpenPoojaBooking(offeringId)}
              onNavigateToSchedule={() => setActiveView("today")}
            />
          )}

          {activeView === "today" && (
            <TodayScheduleView
              activeTheme={activeTheme}
              onBookPooja={() => handleOpenPoojaBooking()}
            />
          )}

          {activeView === "events" && <EventsView activeTheme={activeTheme} />}

          {activeView === "media" && (
            <MediaDiscoveryView activeTheme={activeTheme} />
          )}

          {activeView === "nature" && (
            <ParakkaiNatureView
              activeTheme={activeTheme}
              onNavigate={(viewId) => {
                setActiveView(viewId);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {activeView === "blog" && (
            <BlogStoriesView activeTheme={activeTheme} />
          )}

          {activeView === "community" && (
            <CommunityView activeTheme={activeTheme} />
          )}

          {activeView === "nearby" && (
            <HyperlocalDirectoryView activeTheme={activeTheme} />
          )}

          {activeView === "hypermarket" && (
            <HypermarketView
              activeTheme={activeTheme}
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
            />
          )}

          {activeView === "map" && (
            <SacredMapView
              activeTheme={activeTheme}
              onSelectStation={() => setActiveView("journey")}
            />
          )}
        </main>

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
      </div>

      <ParakkaiFooter
        activeTheme={activeTheme}
        onNavigate={(viewId) => {
          setActiveView(viewId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenAdmin={() => {}}
      />

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

/*
 * CONTRACT
 * ID: P-PARAKKAI-003
 * NAME: Parakkai Master Architecture & Router
 * STATUS: ACTIVE
 * VERSION: 0.1.4
 *
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Project: PARAKKAI
 *
 * Change:
 * - Cinematic Home remains full-screen and chrome-free.
 * - Minimal Explore Parakkai navigation now exits the cinematic Home into existing route views.
 * - Normal header/left rail/right rail/footer remain available on all secondary routes.
 */
