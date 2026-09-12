# ArchitectAny GS Engineer — Global Experience, Theme, Layout & Animation Extension Brief

**Project:** ArchitectAny (AAi)  
**Repository:** `parakkai99/AAi-v2`  
**Audience:** Global Systems / Framework Engineer (GS Engineer)  
**Purpose:** Reusable handoff for future engineers and future sessions  
**Status:** Active architectural assignment  
**Primary principle:** **Extend the established framework. Do not replace or disturb the running architecture.**

---

# 1. ArchitectAny — What We Are Building

ArchitectAny is **not a collection of separate websites**.

It is a global solution platform / visual solution operating system that can produce many different applications and experiences from one reusable runtime.

```text
ArchitectAny
│
├── Universe
├── Domain
├── Subdomain
├── Solution
├── Experience
├── Pages / Scenes / Components
├── Content / Data / AI / Animation
└── Runtime
```

Current and planned solutions include:

```text
Parakkai      (Sacred Living Temple & Village Spatial Experience — primary proof case)
NGLiving      (Next-Gen Living / Real Estate / Lifestyle — second inheritance proof)
ECSHA         (Healthcare & Community Services)
Jaico         (Publishing & Knowledge Services)
future solutions...
```

> **Build the framework once; solutions inherit and compose it.**

Parakkai is the first serious cinematic proof case. NGLiving is an important second inheritance proof.

---

# 2. Desired User Experience

The user should feel:

> **“I have entered ArchitectAny. I can shape any solution visually.”**

The user should not feel:

> “I am configuring a React application.”

ArchitectAny combines:

```text
Visual Solution Builder
+
Experience Runtime
+
Theme / Layout System
+
Scene / Animation System
+
Component Library
+
Asset System
+
Content / Data System
+
AI Intent Platform
+
Solution Administration
+
Runtime
```

---

# 3. Important Repository Areas and Their Purpose

## 3.1 `src/experience/`

The **global Experience Framework**.

Structure:

```text
src/experience/
├── contracts/        (Experience, Theme, Layout, Scene, Object interfaces)
├── composition/      (Slot definitions, Page/Section compositors)
├── resolver/         (Inheritance and cascade resolution engines)
├── runtime/          (Active execution context & provider hooks)
├── theme/            (Theme definitions, token mappings, font & surface systems)
├── layout/           (Canonical screen structures & region policies)
└── index/            (Clean public exports)
```

Owns global concepts such as:

```text
Experience Definition
Theme
Layout
Composition
Resolver
Runtime
Experience Shell
```

This layer is strictly global. It must never contain solution-specific hard-coded checks.

---

## 3.2 `src/animation/`

The **existing global animation architecture**. It is already established and running.

Important concepts include:

```text
src/animation/
├── factory/
│   ├── AnimationFactory
│   ├── AnimationRequest
│   └── ResolvedAnimation
├── motion/
│   ├── MotionDefinition
│   ├── MotionDefinitions
│   └── MotionRegistry
├── objects/
│   ├── AnimationObject
│   ├── ObjectDefinitions
│   └── ObjectRegistry
├── triggers/
│   ├── TriggerDefinition
│   ├── TriggerDefinitions
│   └── TriggerRegistry
├── runtime/
│   ├── AnimationRuntime
│   ├── AnimationRuntimeBootstrap
│   ├── AnimationTarget
│   ├── AnimationTargetRegistry
│   └── TriggerExecutor
└── dev/
```

This is the **animation operating system**.

### Critical Rule
**Do not replace this architecture.**  
**Do not create a second animation engine.**  
Extend it incrementally through adapters, registries, and runtime hooks.

---

## 3.3 `src/applications/`

The **application-level runtime bridge**.

```text
Solution / Application Identity
        ↓
Resolve Experience
        ↓
Load Application
        ↓
Provide Runtime Context
        ↓
Render Solution
```

`ApplicationRuntime` is the bridge between the global ArchitectAny framework and applications such as Parakkai and NGLiving.

---

## 3.4 `components/admin/`

The **visual administration UI**.

Example:
`components/admin/SolutionAdmin.tsx`

The admin exposes the framework as a visual control plane for:

```text
Identity
Experience
Theme
Layout
Pages
Scenes
Components
Animation
Assets
Content
AI
Navigation / UX
Integrations
Data / JSON
Users & Access
Publish
Audit
```

---

## 3.5 `app/solution-admin/`

Solution administration routes:

```text
/solution-admin/parakkai
/solution-admin/ngliving
```

Administration must remain generic and resolve the target solution dynamically via route params.

---

## 3.6 `app/preview/page.tsx`

The runtime preview composition point.

Preview reaches:

```text
ApplicationRuntime
ExperienceRuntime
Solution
```

Supports exact configuration through URL parameters:

```text
/?app=parakkai&preview=1&theme=...&layout=...
```

Goal:

```text
Admin Selection
    ↓
Draft State
    ↓
Live Preview
    ↓
Actual Production Runtime
```

---

## 3.7 `parakkai/`

**Solution-owned implementation**.

Contains Parakkai-specific identity, content, business behavior, visual treatment, and data:

```text
Temple        (Sanctum & Dravidian Gopuram)
Darshan       (Nindra Thirukkolam Sacred Darshan)
Events        (Brahmotsavam & Utsavam Calendars)
Media         (Devotional Chants & Suprabhatam Videos)
Nature        (Sacred Teertham Lake & Migratory Wetland Birds)
Map           (Pilgrim Route & Sacred Sannadhi Circuit)
Community     (Devotee forums & Seva coordination)
Hypermarket   (Temple Prasadam, Brass Pooja Vessels, Traditional Artifacts)
```

These are solution capabilities, not global ArchitectAny framework components.

---

## 3.8 `parakkai/components/home/spatial/` & `parakkai/components/home/`

The existing **Parakkai cinematic / spatial experience**.

Core concepts include:

```text
SpatialJourneyStage
SpatialScene
SpatialSceneControls
SpatialActivityRail
SpatialAtmosphere
SpatialSceneTransition
spatialJourneyConfig
ParakkaiHomeStage (P-PARAKKAI-004 Spatial Tree Hero)
```

This is the real production proof case for the future global scene framework.

**Do not destroy it.** Progressively extract reusable concepts and register/adapt them into the global framework.

---

## 3.9 `public/parakkai/spatial/` & `public/parakkai/`

Production media assets (PNG, JPG, WEBP, SVG).

The future framework should resolve approved assets through the global asset model instead of hard-coded paths inside the animation engine.

---

# 4. Current Architecture Direction

```text
Global AAi Framework
        ↓
Experience Runtime
        ↓
Solution Definition
        ↓
Solution Experience
        ↓
Solution Composition
        ↓
Solution-Specific Content / Assets / Behavior
```

The reverse must never happen: solution-specific code must never leak into the global animation or experience framework.

---

# 5. Theme System

The global theme system lives under `src/experience/theme/`.

The canonical first/default theme is: **AAi Live**

Other themes include:

```text
AI Era
Serene Blue
Commerce Trusted
Forest Green
Sunset Orange
Midnight Dark
Pure White
Royal Purple
```

Theme is not simply a color palette. It describes:

```text
Identity
Color System (Surface, Accent, Text, Border, Status)
Typography (Display Font, Body Font, Monospace Font, Tracking, Line Heights)
Surface System (Solid, Elevated, Translucent, Blur Filter, Border Radii)
Borders & Outlines
Radius Tokens (sm, md, lg, xl, 2xl, full)
Shadows & Elevations (Subtle, Elevated, Spatial Glow)
Spacing Math (Base Grid, Outer Container Padding, Inner Child Rhythms)
Image Treatment (Color Grading, Contrast, Ambient Vignette)
Motion Language (Easing Curves, Duration Classes, Spatial Parallax Rhythms)
Transition Language (Route Cross-Fades, Scene Morphs)
Component Defaults (Buttons, Cards, Inputs, Badges, Rails)
```

### Theme Inheritance Model
```text
AAi Live (Global Base)
   ↓
Solution Theme (e.g. Parakkai Twilight Deepam, NGLiving Clean)
   ↓
Page Override (e.g. Sanctum Darshan Stage)
   ↓
Scene Override (e.g. 6:30 AM Miracle Solar Beam)
```

Only differences (deltas) should be overridden.

---

# 6. Layout System

Canonical screen structures:

## AAi Live — Single Stage
```text
┌──────────────────────────┐
│          HEADER          │
├──────────────────────────┤
│                          │
│           MAIN           │
│                          │
├──────────────────────────┤
│          FOOTER          │
└──────────────────────────┘
```

## AAi Live — Left Navigation
```text
┌────────────────────────────┐
│           HEADER           │
├─────────┬──────────────────┤
│  LEFT   │       MAIN       │
│  RAIL   │      STAGE       │
├─────────┴──────────────────┤
│           FOOTER           │
└────────────────────────────┘
```

## AAi Live — Full Workspace (Spatial Stage)
```text
┌────────────────────────────────┐
│             HEADER             │
├────────┬──────────────┬────────┤
│  LEFT  │     MAIN     │ RIGHT  │
│  RAIL  │    STAGE     │ ACTION │
├────────┴──────────────┴────────┤
│          BOTTOM BAR            │
└────────────────────────────────┘
```

Layouts define regions and behaviors:

```text
fixed | sticky | floating | overlay | collapsible | hover-expand | contextual | mobile-drawer | responsive behavior
```

Theme and Layout remain strictly orthogonal.

---

# 7. What We Learned from the First Parakkai Theme Experiment

Changing only the global theme token is insufficient when solution components contain hard-coded visual assumptions.

Observed defects:
- Dark text rendering invisibly on dark surfaces
- Mismatched typography families
- Inconsistent rail backgrounds competing with the canvas
- Unintended contrast degradation across text cards

**The Solution:**
Solutions must consume the global theme via a structured adapter boundary (`activeTheme.colors.*`, CSS custom properties, and semantic design tokens). The cinematic home stage remains protected where domain-specific sacred ambiance demands it.

---

# 8. Solution Admin Direction

Experience admin navigation:

```text
EXPERIENCE
  ├── Theme Library (Visual preview, tokens, font pairings, contrast checker)
  └── Layout Library (Screen regions, rail policies, drill-down levels)
```

Spec pane details:
- **Theme:** Display Font, Body Font, Mono Font, Corner Radius, Backgrounds, Typography, Surfaces, Interactive States, Readable Content Standards.
- **Layout:** Screen Regions, Navigation Rails, Action Rails, Sticky Offsets, Collapse Policies, Breakpoints.

---

# 9. GS ENGINEER MASTER ASSIGNMENT

## Absolute Core Mandate
> **Extend the existing framework. Do not replace it.**  
> **Do not disturb the currently running architecture.**  
> **Do not create another animation engine.**  
> **Do not rewrite the existing animation system just to make it cleaner.**

Use backward-compatible contracts, registries, adapters, resolvers, and optional capabilities. All existing animations must continue running without regression.

---

# 10. Implementation Roadmap (Phases 1 – 22)

| Phase | Title | Primary Responsibility |
|---|---|---|
| **Phase 1** | Understand Before Modifying | Audit running contracts, registries, and runtime seams before touching code. |
| **Phase 2** | Extend Experience | Add composite resolver: Theme, Layout, Scene, Animation, Navigation, AI. |
| **Phase 3** | World-Class Theme | Extend theme contract with typography scales, elevation systems, and delta inheritance. |
| **Phase 4** | World-Class Layout | Introduce region behaviors (sticky, collapsible, floating, drawer) without layout bloat. |
| **Phase 5** | Global Scene Model | Build scene orchestration abstraction above the existing animation objects. |
| **Phase 6** | Scene Templates | Create reusable templates (Cinematic Hero, Split Visual, Story, Timeline, Map). |
| **Phase 7** | 5 to N Animation Objects | Enable scenes to support arbitrary counts of coordinated objects (Image, SVG, Text, 3D, Mesh). |
| **Phase 8** | Subscenes & Transitions | Hierarchical scene nesting and coordinated spatial camera/fade transitions. |
| **Phase 9** | Timeline Orchestration | Extend existing runtime with sequence, parallel, delay, stagger, and loop controls. |
| **Phase 10** | Asset Explorer | Global catalog resolving `assetRef` tokens instead of hard-coded paths. |
| **Phase 11** | Finished Component Pipeline | Controlled ingestion pipeline for approved SVG, TSX, and JSON artifacts. |
| **Phase 12** | Experience Builder | Visual canvas inside Solution Admin for dragging and configuring page slots. |
| **Phase 13** | Real Preview | Ensure preview uses the identical runtime pipeline as the production app. |
| **Phase 14** | Parakkai 12-Scene Migration | Wrap Parakkai's spatial scenes into the global scene registry via adapters. |
| **Phase 15** | NGLiving Inheritance Test | Validate zero-copy reusability by building NGLiving purely on framework abstractions. |
| **Phase 16** | AI / Intent Platform | Map natural language inputs to structured intents, scene templates, and animation recipes. |
| **Phase 17** | Transitional AI Integration | Bridge contextual prompts to external AI assistants with paste-back classification. |
| **Phase 18** | Full Solution Admin | Establish complete 16-section admin control plane with operational parity. |
| **Phase 19** | Contextual Admin Routing | Support `/solution-admin/[solutionId]` with dynamic tenant resolution. |
| **Phase 20** | Security Hardening | Isolate private schemas, internal source ASTs, and credentials behind approved resolvers. |
| **Phase 21** | Anti-Patchwork Rule | Refuse solution-specific `if` forks in framework code; build missing abstractions instead. |
| **Phase 22** | Live Safety Gates | Mandatory `tsc --noEmit` and build verification before every merge increment. |

---

# 11. Security Boundaries

Maintain the verified pipeline:

```text
Approved Solution Page / Viewport
            ↓
Authorized Resource Resolver
            ↓
Published Asset / Component / Data
```

### Prohibited Exposures
- Never expose raw server environment credentials to the browser client.
- Never expose private JSON configuration trees through unauthenticated public endpoints.
- Never execute arbitrary unsanitized string expressions in the scene runtime.
- Never allow unvalidated file paths in asset loaders.

---

# 12. Verification & Live Safety Protocol

Before committing any increment:

```bash
# 1. Type verification
npm run lint    # (or pnpm exec tsc --noEmit)

# 2. Production build verification
npm run build

# 3. Live verification endpoints
# http://localhost:3000/
# http://localhost:3000/?app=parakkai
# http://localhost:3000/?app=ngliving
```

Existing Parakkai animations, rails, and single-viewport spatial experiences must remain 100% operational.

---

# 13. Definition of Success

The assignment succeeds when a single global engine provides:

```text
One Unified Animation Engine
+
One Experience Runtime
+
Composable Delta Theme System
+
Composable Spatial Layout System
+
Composable Global Scene Orchestrator
+
Reusable Component Registry
+
Global Asset Explorer (assetRef)
+
AI Intent Resolution Engine
+
Visual Solution Admin Control Plane
+
True Production-Mirror Preview
+
Inheritance Validation (Parakkai + NGLiving)
```

**without duplicating a single line of framework code.**

---

**Current Status:** Active & Preserved.  
**Guiding Principle:** **Extend the established framework. Do not replace or disturb the running architecture.**
