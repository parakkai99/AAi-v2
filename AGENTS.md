# ArchitectAny — Project Design Structure & Architecture Rules

## 1. Top-Level Page Layout & Sticky Offsets
- **Header (`ArchitectAnyHeader.tsx`)**:
  - Position: `sticky top-0 left-0 right-0 z-50`
  - Height: `h-[72px] sm:h-[74px]`
- **Main Container (`<main>` in `app/preview/page.tsx`)**:
  - Class: `flex-grow flex flex-col relative z-10 w-full overflow-x-hidden`
  - Document Flow: Begins directly beneath the header (starts at `y = 74px`).
  - **CRITICAL STICKY RULE**: Because `<main>` has `overflow-x: hidden`, child elements with `position: sticky` calculate their top offset relative to `<main>`, NOT the browser window.
  - Sub-navigation banners inside `<main>` MUST use **`sticky top-0`** (NEVER `sticky top-[74px]`). Using `top-[74px]` produces a double-offset ~74px ghost gap.

## 2. Navigation Compass & HUD Bar (`DomainContextBanner.tsx`)
- **Positioning**: Single unified bar wrapped in `<div className="sticky top-0 z-40 w-full">`.
- **Flush Contact**: Must sit completely flush (0px gap) against the bottom border of the header.
- **Unified Actions**: Houses:
  - Compass icon & Breadcrumb path (Universe › Domain › Subdomain › Capability › Bundle)
  - Sub-World switcher dropdown
  - Orbit HUD controls (Play/Pause, speed presets, Oval/Spiral layout toggle) via `rightExtra`
  - Domain switcher & "Up 1 Level" action
- **No Stacked Sub-Bars**: Never add a second stacked 36px bar or redundant hero card above or below the compass bar.

## 3. Vertical Spacing & Content Flow
- **No Viewport Height Traps**: Avoid `min-h-[calc(100vh - 74px)]` on inner content stages (`.stageWrapper`, `SolutionRail`), as it artificially stretches containers and introduces vertical voids.
- **Card Hierarchy**: Content cards (L2 Subdomains, L3 Capabilities, L4 Bundles, L5 Solutions) sit in `<section>` with compact, balanced padding (`pt-3 pb-10`).
- **Subdomain Context**: Subdomain descriptions are cleanly integrated into the section/card header directly above the cards, rather than occupying a separate ~75px hero card block.
