# ArchitectAny GS Engineer — Fresh Engineering Assignment
## Current Git Baseline + Global Experience / Theme / Layout / Scene / Animation Extension

**Date:** 2026-09-12  
**Project:** ArchitectAny (AAi)  
**Repository:** `parakkai99/AAi-v2`  
**Branch:** `main`  
**Verified baseline:** `f40099e`  
**Document type:** Fresh engineering assignment derived from the established GS handoff  
**Status:** ACTIVE — START FROM TODAY'S VERIFIED GIT BASELINE

---

# 0. START HERE — THIS IS TODAY'S WORK

This document is the **fresh working assignment for today**.

The previous GS Engineer Handoff remains the governing architectural reference. Its terminology, architecture, principles, inheritance model, security rules, animation foundation and phased direction must **not drift**.

However:

> **Do not restore or re-implement an older visual/design state simply because it existed in the previous handoff.**

The repository at `f40099e` is today's starting point.

The objective is to **extend what is already present in today's Git baseline** into the world-class global ArchitectAny framework described below.

## Verified current baseline

```text
Repository:
parakkai99/AAi-v2

Branch:
main

HEAD / origin/main:
f40099e

Commit:
differentiate theme and layout library controls visually
```

The baseline has already been verified with:

```text
TypeScript:
pnpm exec tsc --noEmit
→ 0 errors

Production build:
→ successful

Dev server:
→ running current origin/main
```

### Absolute starting rule

```text
START FROM f40099e
        ↓
INSPECT CURRENT CODE
        ↓
EXTEND CURRENT ARCHITECTURE
        ↓
PRESERVE CURRENT RUNNING STATUS
```

Do not reset, downgrade, rebase onto an older visual baseline, or replace the current architecture.

---

# 1. PRIME DIRECTIVE — EXTEND, DO NOT REPLACE

ArchitectAny already has a working global architecture.

The existing animation system is already established and running.

Important existing concepts include:

```text
src/animation/

AnimationFactory
AnimationRequest
ResolvedAnimation

MotionDefinition
MotionDefinitions
MotionRegistry

AnimationObject
ObjectDefinitions
ObjectRegistry

TriggerDefinition
TriggerDefinitions
TriggerRegistry

AnimationRuntime
AnimationRuntimeBootstrap
AnimationTarget
AnimationTargetRegistry
TriggerExecutor
```

These are the **existing animation operating system**.

## Non-negotiable rules

Do NOT:

```text
replace the animation engine
create a parallel animation engine
create a second motion registry
create a second trigger system
create a second animation runtime
copy the engine into Parakkai
copy the engine into NGLiving
perform disruptive rewrites
```

DO:

```text
extend current contracts
add optional capabilities
add registries where the existing registry model supports them
add adapters
add resolvers
add composition/orchestration layers
preserve backward compatibility
```

Existing animations and existing running behavior must continue to work.

---

# 2. WHAT ARCHITECTANY IS BUILDING

ArchitectAny is **not a collection of independent websites**.

It is a:

> **Visual Solution Operating System**

The same platform should enable solutions such as:

```text
Parakkai
NGLiving
ECSHA
Jaico
future solutions
```

to inherit the same global platform.

The conceptual architecture is:

```text
ArchitectAny
│
├── Universe
├── Domain
├── Subdomain
├── Solution
├── Experience
├── Pages
├── Scenes
├── Components
├── Content
├── Data
├── AI
├── Assets
├── Animation
└── Runtime
```

The desired user feeling is:

> “I can shape any solution inside ArchitectAny.”

Not:

> “I am editing a React project.”

---

# 3. GLOBAL INHERITANCE MODEL

The governing inheritance model remains:

```text
Global AAi Live Baseline
        ↓
Universe
        ↓
Domain
        ↓
Subdomain
        ↓
Solution
        ↓
Page
        ↓
Scene
        ↓
Component
```

Each tier should override only what it needs.

Examples of valid overrides:

```text
color delta
typography delta
surface delta
spacing delta
animation curve delta
behavior delta
scene content delta
asset reference delta
```

Do not duplicate complete definitions when a delta/override will work.

---

# 4. CURRENT ARCHITECTURE RESPONSIBILITIES

## 4.1 `src/experience/`

This is the **global Experience Framework**.

It owns global concepts such as:

```text
Experience Definition
Theme
Layout
Composition
Resolver
Runtime
Shell
```

This layer is global and solution-neutral.

---

## 4.2 `src/animation/`

This is the established global animation operating system.

It owns:

```text
Factory
Motion
Animation Objects
Triggers
Targets
Runtime
Execution
Developer tooling
```

This is the engine that all solutions must use.

---

## 4.3 `src/applications/`

This is the application/runtime bridge:

```text
Solution Identity
        ↓
ApplicationRuntime
        ↓
Experience Runtime
        ↓
Solution
```

`ApplicationRuntime` is where solution applications inherit the global framework.

---

## 4.4 `components/admin/`

This is the visual Solution Administration control plane.

The long-term role includes:

```text
Overview
Identity
Experience
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

## 4.5 `app/solution-admin/`

This provides solution-scoped administration routes.

Examples:

```text
/solution-admin/parakkai
/solution-admin/ngliving
```

The framework is global.

The loaded solution configuration is specific.

---

## 4.6 `app/preview/page.tsx`

This is the actual runtime preview surface.

Preview must use the production runtime architecture rather than a fake renderer.

Current preview configuration can carry explicit:

```text
app
preview
theme
layout
```

so draft configuration can be deterministic.

---

## 4.7 `parakkai/`

This is the Parakkai solution implementation.

It owns Parakkai-specific:

```text
Temple
Darshan
Journey
Nature
Events
Media
Map
Community
Hypermarket
content
assets
solution behavior
```

It consumes the global framework.

It must not leak Parakkai concepts into the global framework.

---

# 5. PARAKKAI SPATIAL / CINEMATIC PROOF CASE

The existing Parakkai cinematic/spatial implementation lives under:

```text
parakkai/components/home/spatial/
```

Important existing concepts include:

```text
SpatialJourneyStage
SpatialScene
SpatialSceneControls
SpatialActivityRail
SpatialAtmosphere
SpatialSceneTransition
spatialJourneyConfig
```

Parakkai currently represents a **12-scene cinematic experience**.

This is not throwaway code.

It is the first serious real-world consumer/proof case for the future global Scene framework.

## Migration rule

Do not destroy it.

Use a progressive registration/adapter approach:

```text
Existing Parakkai Scene
        ↓
Adapter / Registration
        ↓
Global Scene Definition
        ↓
Existing Animation Runtime
```

The current cinematic experience must keep functioning while the framework grows.

---

# 6. TODAY'S PRIMARY ENGINEERING OBJECTIVE

The previous work established Theme, Layout, Experience Admin and the existing animation architecture.

Today's job is to connect these concepts into a **proper global composition model** without disturbing the current runtime.

The target is:

```text
Theme
 +
Layout
 +
Composition
 +
Scene
 +
Animation
 +
Asset
 +
Component
 +
AI
 =
ArchitectAny Experience
```

The solution should consume these capabilities rather than rebuilding them.

---

# 7. WORLD-CLASS THEME SYSTEM

The current Theme system already exists under:

```text
src/experience/theme/
```

The canonical first/default theme is:

```text
AAi Live
```

Existing themes include:

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

Do not break the existing IDs.

## Theme should grow into a complete visual language

```text
Theme
├── Identity
├── Color system
├── Typography
├── Background
├── Surfaces
├── Borders
├── Radius
├── Shadow
├── Spacing
├── Image treatment
├── Motion language
├── Transition language
└── Component defaults
```

A solution should be able to inherit:

```text
AAi Live
    ↓
Solution Theme
    ↓
Page Override
    ↓
Scene Override
```

Only deltas should be stored at lower levels.

---

# 8. THEME MOTION LANGUAGE

Theme should be able to describe the desired motion character without implementing the animation engine itself.

Example:

```text
AAi Live
→ precise
→ intelligent
→ controlled
→ immersive

Forest
→ organic
→ flowing
→ slower

Commerce
→ efficient
→ crisp
→ responsive

Royal
→ elegant
→ expressive
→ cinematic
```

Motion preferences should be resolved by the existing animation architecture.

---

# 9. WORLD-CLASS LAYOUT SYSTEM

The core layouts already established are:

### AAi Live

```text
Header
Main
Footer
```

### AAi Live Left

```text
Header
Left
Main
Footer
```

### AAi Live Full

```text
Header
Left
Main
Right
Footer
```

Do not destroy these.

Extend Layout so it can also express region behavior:

```text
fixed
sticky
floating
overlay
collapsible
hover-expand
contextual
mobile drawer
responsive
priority
density
main-content flow
```

Avoid creating hundreds of hard-coded layout variants.

Use composable region policies.

---

# 10. THEME AND LAYOUT MUST REMAIN ORTHOGONAL

Never create:

```text
ParakkaiDarkLeftLayout
ParakkaiLightLeftLayout
NGLivingBlueFullLayout
```

Instead compose:

```text
Theme = Pure White
Layout = AAi Live Left
```

or:

```text
Theme = AAi Live
Layout = AAi Live Full
```

Theme defines visual language.

Layout defines structural/spatial behavior.

---

# 11. GLOBAL SCENE SYSTEM

Add a global Scene orchestration layer **above the current animation engine**.

Conceptually:

```text
Scene
│
├── Object
│    └── Animation
│
├── Object
│    └── Animation
│
├── Subscene
│    └── Objects
│
└── Transition
```

A Scene should support concepts such as:

```text
id
key
name
templateRef
baseSceneAsset
regions
objects
subScenes
transitions
entryAnimation
exitAnimation
interactionProfile
contentRefs
assetRefs
metadata
```

Use existing repository naming conventions.

Do not create redundant contracts when the current contracts can be extended.

---

# 12. SCENE TEMPLATES

Create reusable scene templates.

Examples:

```text
Cinematic Hero
Immersive Image
Split Visual
Gallery
Map
Story
Timeline
Video
Data
Product
```

A Scene Template defines:

```text
slots
regions
animation hooks
transition hooks
responsive behavior
```

It does not contain Parakkai-specific content.

---

# 13. 5 → N ANIMATION OBJECTS PER SCENE

Every scene should support multiple animation objects.

Baseline:

```text
5 → N
```

Possible objects:

```text
Image
SVG
Video
Text
Shape
Particle
Path
Map element
Data visualization
TSX component
Subscene
```

Objects should support states/capabilities such as:

```text
enter
idle
interact
exit
loop
repeat
reverse
sequence
parallel
conditional
```

Use the existing animation system:

```text
AnimationFactory
MotionRegistry
ObjectRegistry
TriggerRegistry
AnimationRuntime
```

Do not make Scene implement its own animation logic.

---

# 14. SUBSCENES

Support nested composition:

```text
Scene
 ├── Object
 ├── Object
 ├── Subscene
 │    ├── Object
 │    └── Object
 └── Object
```

Reuse the current animation runtime.

Do not create a second subscene runtime.

---

# 15. SCENE TRANSITIONS

Support reusable transitions such as:

```text
fade
slide
scale
wipe
mask
morph
parallax
camera
dissolve
cinematic reveal
```

All transitions must resolve through the existing animation architecture.

---

# 16. TIMELINE / ORCHESTRATION

Extend the current animation runtime to support scene orchestration:

```text
sequence
parallel
delay
offset
duration
stagger
loop
conditional
interaction
```

Do not build a separate video editor runtime.

---

# 17. ASSET EXPLORER

Create a global Asset Explorer.

Categories:

```text
Images
WEBP
SVG
Video
Audio
TSX Components
JSON
Templates
Generated Assets
External Assets
```

Assets should be represented by stable references:

```text
assetRef
```

not hard-coded file paths.

Maintain the established ArchitectAny resource/content boundary.

---

# 18. ASSET PRODUCTION PIPELINE

The solution owner should be able to:

```text
Upload
Generate
Transform
Validate
Approve
Publish
```

Possible artifacts:

```text
WEBP
SVG
JPG
PNG
Video
TSX
JSON
```

The runtime should consume the approved artifact.

---

# 19. TSX COMPONENT PIPELINE

A finished TSX component should be registered as a runtime component.

Conceptually:

```text
Component Registry
        ↓
componentRef
        ↓
props schema
        ↓
slots
        ↓
events
        ↓
animation hooks
```

The Scene Editor must not become an unrestricted code execution environment.

Only registered/approved components should be executable.

---

# 20. ASSET EXPLORER → SCENE COMPOSITION

Expected authoring flow:

```text
Asset Explorer
      ↓
Select asset
      ↓
Add to Scene
      ↓
Select target region
      ↓
Choose animation
      ↓
Configure
      ↓
Preview
```

The scene stores a reference.

The asset itself remains in the central library.

---

# 21. EXPERIENCE BUILDER

Expand Solution Admin so Experience becomes a real visual composition control plane.

Eventually:

```text
Experience
├── Theme
├── Layout
├── Pages
├── Scenes
├── Components
├── Animation
├── Assets
├── Navigation
├── Behavior
└── Preview
```

The Main region should be composable:

```text
MAIN
 ├── Hero
 ├── Running Band
 ├── Cards
 ├── Recommendations
 ├── Fast Moving
 ├── Recent Posts
 └── Scenes
```

This must be configuration/composition driven.

---

# 22. REAL LIVE PREVIEW

Preview must use:

```text
same Theme
same Layout
same Scene Definition
same AnimationRuntime
same ComponentRegistry
same AssetResolver
```

Only these differ:

```text
draft configuration
preview mode
editing permissions
```

No fake render pipeline.

---

# 23. 12-SCENE PARAKKAI MIGRATION

The existing Parakkai scenes are the first migration/proof target.

Do not rewrite all 12 scenes at once.

Move progressively:

```text
Current Scene
    ↓
Register/Adapt
    ↓
Global Scene Model
    ↓
Existing Animation Runtime
```

At every step:

```text
current Parakkai experience must continue to run
```

---

# 24. NGLIVING INHERITANCE PROOF

After Parakkai proves the framework, use NGLiving as the second proof.

NGLiving should not copy:

```text
AnimationRuntime
ExperienceRuntime
ThemeRuntime
LayoutRuntime
SceneRuntime
AssetRuntime
```

It should only provide its own:

```text
theme configuration
layout configuration
scene definitions/content
assets
business components
business behavior
```

If it needs duplicated framework code, fix the global abstraction.

---

# 25. AI / INTENT PLATFORM

AI Prompt must not merely store text.

Use:

```text
User Input
    ↓
Intent Derivation
    ↓
Capability Resolution
    ↓
Prompt Selection
    ↓
AI Provider
    ↓
Result Classification
    ↓
Scene / Component / Asset / Content
```

Example:

```text
“Create a cinematic lake scene with birds flying.”
```

could resolve to:

```text
Intent:
CREATE_CINEMATIC_SCENE

Template:
Immersive Visual

Objects:
Lake
Birds
Temple

Animation:
Flight
Parallax
Atmosphere
```

The technical classification remains internal to ArchitectAny.

---

# 26. CHATGPT TRANSITION MODE

Before full API integration:

```text
ArchitectAny
    ↓
derive intent
    ↓
prepare contextual prompt
    ↓
open ChatGPT in a new browser tab/window
    ↓
user interacts
    ↓
copy result
    ↓
paste into ArchitectAny
    ↓
classify result
```

Examples:

```text
SVG → Asset
TSX → Component
Scene JSON → Scene
Animation JSON → Animation
Content → Content
```

Maintain an AI Provider abstraction for future:

```text
OpenAI API
ChatGPT
Gemini
Claude
local models
enterprise AI
```

---

# 27. SOLUTION ADMIN — WORLD-CLASS TARGET

The full Solution Admin should eventually expose:

```text
Overview
Identity
Experience
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

Each section must become a genuine framework control surface.

Do not fill it with fake placeholder controls.

---

# 28. CONTEXTUAL ADMIN

The same admin framework must support:

```text
/solution-admin/parakkai
/solution-admin/ngliving
/solution-admin/ecsha
/solution-admin/jaico
```

No separate admin architecture per solution.

---

# 29. UNIVERSAL SEARCH

ArchitectAny Search should eventually discover:

```text
solutions
pages
components
scenes
assets
AI capabilities
data
actions
```

For example:

```text
“bird animation”
```

could return:

```text
Scene
Animation
Asset
Component
Prompt
```

Search is part of the Intent Interface.

---

# 30. NAVIGATION + AI + SCENE INTEGRATION

Capabilities selected from:

```text
Left Rail
Right Rail
App Stack
Search
AI
Main Content
```

must be able to activate:

```text
Page
Scene
Component
Panel
Drawer
Modal
Subscene
```

Use the global navigation contract.

Do not introduce separate navigation systems for each feature.

---

# 31. SECURITY

Maintain the established ArchitectAny resource boundary:

```text
Approved Page / Runtime
        ↓
Approved Resource Resolver
        ↓
Approved Asset / Data Delivery
```

Never expose:

```text
source TSX
private JSON
internal registries
draft-only resources
credentials
filesystem directories
```

Public presentation content must still be delivered through the approved runtime/page mechanism rather than becoming browsable directory content.

---

# 32. VERSIONING

Authorable resources should eventually be versionable:

```text
Theme
Layout
Scene
Animation
Component
Asset
Prompt
Content
Experience
```

Lifecycle:

```text
Draft
Preview
Published
Archived
```

Never mutate production configuration without lifecycle control.

---

# 33. NO PATCHWORK

Do not solve missing framework capabilities using:

```text
if Parakkai
if NGLiving
special animation
special theme
special layout
special loader
special route
```

Instead ask:

> **What global capability is missing?**

Then add it at the correct global layer.

---

# 34. PHASED IMPLEMENTATION

Implement safely.

## Phase A — Architecture Inspection

No large implementation yet.

Map:

```text
src/animation
src/experience
src/applications
components/admin
app/solution-admin
app/preview
parakkai/components/home/spatial
```

Identify:

```text
current contracts
current registries
current runtime
current consumers
reusable seams
missing abstractions
```

## Phase B — Theme + Layout Extension

Improve existing contracts while preserving IDs and behavior.

## Phase C — Scene Orchestration

Add Scene above current AnimationRuntime.

## Phase D — Asset / Component Resolution

Connect central Asset and Component references.

## Phase E — Scene / Animation Builder

Introduce visual authoring capabilities.

## Phase F — Parakkai Integration

Progressively register the 12 existing cinematic scenes.

## Phase G — NGLiving Inheritance Proof

Prove zero-copy framework reuse.

## Phase H — AI Intent / Prompt / Result

Add AI capability mapping.

## Phase I — Full Solution Admin

Turn the admin into the visual solution operating surface.

---

# 35. FIRST DELIVERABLE — MANDATORY BEFORE LARGE CHANGES

Before writing the major implementation, produce an **Architecture Extension Assessment** from the current `f40099e` repository.

It must identify:

```text
1. Existing animation runtime architecture
2. Existing animation extension points
3. Existing Experience contracts
4. Existing Theme contracts
5. Existing Layout contracts
6. Existing Composition contracts
7. Existing ApplicationRuntime flow
8. Existing Parakkai scene architecture
9. Existing reusable pieces inside Parakkai
10. What must remain untouched
11. What can be extended
12. What global abstractions are missing
13. Proposed minimal backward-compatible extensions
14. Risks to the current runtime
15. Recommended implementation order
```

Do not replace code merely because a cleaner design is possible.

Prefer:

```text
smallest correct global extension
```

that unlocks multiple solutions.

---

# 36. LIVE SAFETY GATE

After every meaningful increment:

```powershell
pnpm exec tsc --noEmit
pnpm build
```

Verify:

```text
http://localhost:3000/
http://localhost:3000/?app=parakkai
http://localhost:3000/?app=ngliving
```

Existing cinematic behavior must continue working.

Do not merge an architectural increment that breaks the running baseline.

---

# 37. DEFINITION OF DONE

The framework succeeds when one global system provides:

```text
One Experience Runtime
One Theme System
One Layout System
One Scene System
One Animation Runtime
One Asset System
One Component System
One AI Intent Layer
One Solution Admin
One Preview Runtime
```

and serves:

```text
Parakkai
NGLiving
```

without duplicated framework code.

---

# 38. FINAL ENGINEERING PRINCIPLE

ArchitectAny should become:

> **A visual solution operating system, not a collection of websites.**

The existing animation architecture is the engine.

The new work makes that engine universally consumable through:

```text
Theme
Layout
Scene
Component
Asset
AI
Experience Builder
Solution Admin
```

while preserving the running system.

---

# 39. FINAL COMMAND TO THE GS ENGINEER

**Start from the verified `f40099e` baseline. Do not restore the older design state. Do not treat the previous prompt as a reason to roll the repository backward. Use the previous GS handoff only as the architectural governance reference. Inspect today's code first, identify the existing extension seams, and then extend the current animation and experience systems incrementally.**

**Do not replace the animation engine. Do not create a parallel runtime. Do not duplicate solution-specific framework code. Improve Theme, Layout, Scene, Asset, Component, Animation and AI capabilities in the global framework. Prove the extensions with Parakkai's existing 12 scenes, then prove inheritance using NGLiving. Preserve all existing live behavior throughout.**

---

# 40. ENGINEERING HANDOFF CHECKLIST

Before starting:

- [ ] Confirm `HEAD == origin/main == f40099e`
- [ ] Confirm clean Git state
- [ ] Run `pnpm exec tsc --noEmit`
- [ ] Run `pnpm build`
- [ ] Inspect current animation runtime
- [ ] Inspect Experience runtime
- [ ] Inspect ApplicationRuntime
- [ ] Inspect Solution Admin
- [ ] Inspect current Parakkai spatial scenes
- [ ] Identify reusable vs solution-specific code
- [ ] Produce Architecture Extension Assessment

Before each merge:

- [ ] Existing animation still works
- [ ] Parakkai still works
- [ ] NGLiving still works where applicable
- [ ] Theme inheritance works
- [ ] Layout inheritance works
- [ ] Preview works
- [ ] No parallel animation engine
- [ ] No duplicated framework code
- [ ] No private resource leakage
- [ ] TypeScript clean
- [ ] Production build clean

---

# GOVERNING REFERENCE — ORIGINAL GS HANDOFF

The previously established GS Engineer Handoff remains authoritative for:

```text
ArchitectAny purpose
framework terminology
component responsibility
existing animation architecture
inheritance model
security boundary
preview philosophy
backward compatibility
phased implementation
Parakkai proof case
NGLiving inheritance proof
```

**Do not silently change those principles.**

This document is a **fresh execution brief**, not a replacement architecture.



---

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

Current/example solutions include:

```text
Parakkai
NGLiving
ECSHA
Jaico
future solutions
```

> **Build the framework once; solutions inherit and compose it.**

Parakkai is the first serious cinematic proof case. NGLiving is an important second inheritance proof.

---

# 2. Desired User Experience

The user should feel:

> **“I have entered ArchitectAny. I can shape any solution visually.”**

The user should not feel:

> “I am configuring a React application.”

ArchitectAny aims to combine:

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

Conceptually:

```text
src/experience/
├── contracts/
├── composition/
├── resolver/
├── runtime/
├── theme/
├── layout/
└── index/
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

This layer is global. It must never become Parakkai-specific.

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

## Critical rule

**Do not replace this architecture.**  
**Do not create a second animation engine.**  
Extend it incrementally.

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

```text
components/admin/SolutionAdmin.tsx
```

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

Solution administration routes.

The direction is:

```text
/solution-admin/parakkai
/solution-admin/ngliving
```

Administration must remain generic and resolve the target solution dynamically.

---

## 3.6 `app/preview/page.tsx`

The runtime preview composition point.

Preview ultimately reaches:

```text
ApplicationRuntime
ExperienceRuntime
Solution
```

Current draft preview direction supports exact configuration through URL parameters:

```text
/?app=parakkai&preview=1&theme=...&layout=...
```

Goal:

```text
Admin Selection
    ↓
Draft
    ↓
Preview
    ↓
Actual Runtime
```

---

## 3.7 `parakkai/`

**Solution-owned implementation**.

It contains Parakkai-specific identity, content, business behavior, visual treatment and data.

Examples:

```text
Temple
Darshan
Events
Media
Nature
Map
Community
Hypermarket
```

These are solution capabilities, not global ArchitectAny components.

---

## 3.8 `parakkai/components/home/spatial/`

The existing **Parakkai cinematic / spatial experience**.

Important concepts include:

```text
SpatialJourneyStage
SpatialScene
SpatialSceneControls
SpatialActivityRail
SpatialAtmosphere
SpatialSceneTransition
spatialJourneyConfig
```

This is the real production proof case for the future global scene framework.

**Do not destroy it.** Progressively extract reusable concepts and register/adapt them into the global framework.

---

## 3.9 `public/parakkai/spatial/`

Current Parakkai production media assets:

```text
PNG
JPG
WEBP
SVG
```

The future framework should resolve approved assets through the global asset model instead of hard-coded Parakkai paths inside the animation engine.

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
Solution-specific content/assets/behavior
```

The reverse must never happen.

Parakkai-specific code must never become the global animation framework.

---

# 5. Theme System

The global theme system is under:

```text
src/experience/theme/
```

The canonical first/default theme is:

```text
AAi Live
```

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

Theme is not simply a color palette. It should describe:

```text
Identity
Color system
Typography
Surface system
Background
Borders
Radius
Shadow
Spacing
Image treatment
Motion language
Transition language
Component styling
```

Theme inheritance should work conceptually as:

```text
AAi Live
   ↓
Solution Theme
   ↓
Page Override
   ↓
Scene Override
```

Only differences should be overridden.

---

# 6. Layout System

Current canonical layouts:

## AAi Live

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
│         │                  │
├─────────┴──────────────────┤
│           FOOTER           │
└────────────────────────────┘
```

## AAi Live — Full Workspace

```text
┌────────────────────────────────┐
│             HEADER             │
├────────┬──────────────┬────────┤
│  LEFT  │     MAIN     │ RIGHT  │
│        │              │        │
├────────┴──────────────┴────────┤
│             FOOTER             │
└────────────────────────────────┘
```

Layouts should eventually define not just regions but behavior such as:

```text
fixed
sticky
floating
overlay
collapsible
hover-expand
contextual
mobile-drawer
responsive behavior
```

Keep Theme and Layout orthogonal.

---

# 7. What We Learned from the First Parakkai Theme Experiment

Changing only the global theme is insufficient when solution components contain their own hard-coded visual assumptions.

Observed problems included:

```text
dark text on dark surface
different font families
different navigation appearance
different footer styling
different card styling
main content becoming difficult to read
```

The correct response is not endless page-by-page patching.

The solution must consume the global theme through a proper framework-to-solution inheritance/adapter boundary.

The cinematic home should remain protected where necessary.

---

# 8. Existing Solution Admin Direction

The Experience admin is moving toward:

```text
EXPERIENCE

Theme Library
Layout Library
```

with:

```text
left/vertical library
selected item
right specification pane
live draft preview
```

Theme details include:

```text
Display Font
Body Font
Mono Font
Corner Radius
Background
Typography
Surface & Shape
Interaction
Readable Content
```

Layout details include:

```text
Layout
Navigation
Rail Policy
Drilldown Level
Screen Regions
visual layout preview
```

This is intended to become a world-class visual control plane rather than a raw settings form.

---

# 9. GS ENGINEER MASTER ASSIGNMENT

## Absolute rule

**Extend the existing framework. Do not replace it.**

**Do not disturb the currently running architecture.**

**Do not create another animation engine.**

**Do not rewrite the existing animation system just to make it cleaner.**

Use backward-compatible contracts, registries, adapters, resolvers and optional capabilities.

Existing animations must continue to run.

---

# 10. Phase 1 — Understand Before Modifying

Start with:

```powershell
git status
git pull --ff-only origin main
pnpm exec tsc --noEmit
pnpm build
```

Inspect:

```text
src/experience/
src/animation/
src/applications/
components/admin/
app/solution-admin/
app/preview/
parakkai/components/home/spatial/
```

Determine:

```text
existing contract
existing runtime
existing registry
existing consumer
existing reusable capability
missing abstraction
```

Do not begin large refactoring until these seams are understood.

---

# 11. Phase 2 — Extend Experience

Experience should eventually resolve:

```text
Theme
Layout
Composition
Scene
Animation
Behavior
Navigation
Assets
Content
AI
```

Inheritance:

```text
Global
 ↓
Universe
 ↓
Domain
 ↓
Subdomain
 ↓
Solution
 ↓
Page
 ↓
Scene
 ↓
Component
```

Each level may override only what it needs.

---

# 12. Phase 3 — World-Class Theme

Extend the existing Theme contract without breaking existing IDs.

Support:

```text
identity
background
color system
typography
surface system
border system
radius
shadow
spacing
image treatment
motion language
transition language
component defaults
```

AAi Live remains the canonical baseline.

A solution should be able to express:

```text
extends: AAi Live
```

and override only selected characteristics.

---

# 13. Phase 4 — World-Class Layout

Extend current layout definitions with:

```text
region behavior
responsive rules
collapse behavior
priority
overlay behavior
floating behavior
density
main content flow
```

Structural regions remain:

```text
Header
Left
Main
Right
Footer
```

Avoid hundreds of hard-coded layout variants.

---

# 14. Phase 5 — Global Scene Model

Introduce a global scene abstraction **above the existing animation objects**.

Conceptually:

```text
Scene
 │
 ├── Object
 │    └── Animation
 │
 ├── Object
 │    └── Animation
 │
 ├── Subscene
 │    └── Objects
 │
 └── Transition
```

Scene definitions should support concepts such as:

```text
Scene ID
Template
Base Scene
Regions
Objects
Subscenes
Transitions
Entry animation
Exit animation
Interaction profile
Content references
Asset references
Metadata
```

Scene orchestrates; the existing animation runtime performs motion.

---

# 15. Phase 6 — Scene Templates

Create reusable scene templates such as:

```text
Cinematic Hero
Immersive Image
Split Visual
Gallery
Map
Story
Timeline
Video
Data
Product
```

Templates define:

```text
slots
regions
animation hooks
transition hooks
responsive behavior
```

They remain solution-neutral.

---

# 16. Phase 7 — 5 to N Animation Objects Per Scene

A scene must support multiple objects:

```text
Image
SVG
Video
Text
Shape
Particle
Path
Data Visualization
TSX Component
Subscene
```

There must not be a hard maximum of five.

Practical baseline:

```text
5 → N
```

Objects can support:

```text
enter
idle
interact
exit
loop
repeat
reverse
sequence
parallel
conditional
```

All through the existing animation engine.

---

# 17. Phase 8 — Subscenes and Transitions

Support:

```text
Scene
 ├── Object
 ├── Object
 ├── Subscene
 │    ├── Object
 │    └── Object
 └── Object
```

Transitions can include:

```text
fade
slide
scale
wipe
mask
morph
parallax
camera
dissolve
cinematic reveal
```

All resolved through the existing animation runtime.

---

# 18. Phase 9 — Timeline Orchestration

Extend the current runtime to support:

```text
sequence
parallel
delay
offset
duration
stagger
loop
conditional
interaction
```

Do not build a second video/timeline engine.

---

# 19. Phase 10 — Asset Explorer

Create a global Asset Explorer supporting:

```text
Images
WEBP
SVG
Video
Audio
TSX Components
JSON
Templates
Generated Assets
External Assets
```

Scene references should use:

```text
assetRef
```

not hard-coded file locations.

---

# 20. Phase 11 — Finished Component Pipeline

Allow approved production artifacts:

```text
Image
WEBP
SVG
Video
TSX
JSON
```

through:

```text
Upload
Generate
Transform
Validate
Approve
Publish
```

A TSX component should enter the scene as a registered component with concepts such as:

```text
componentRef
props schema
slots
events
animation hooks
```

Do not allow arbitrary source execution directly from the scene editor.

---

# 21. Phase 12 — Experience Builder

Expand Solution Admin into a real visual Experience Builder.

Expose:

```text
Theme
Layout
Pages
Scenes
Components
Animation
Assets
Navigation
Behavior
Preview
```

Inside Main, a solution should be able to compose:

```text
Hero
Running Band
Cards
Recommendations
Fast Moving
Recent Posts
Scene
```

without writing new framework code.

---

# 22. Phase 13 — Real Preview

Preview must use the actual runtime:

```text
same Theme
same Layout
same Scene
same Animation Runtime
same Component Registry
same Asset Resolver
```

Only these differ:

```text
draft configuration
preview mode
editing permissions
```

Never build a fake preview renderer.

---

# 23. Phase 14 — Parakkai 12 Scene Migration

Parakkai already has a 12-scene cinematic experience.

Do not destroy it.

Use an adapter/registration approach:

```text
Existing Parakkai Scene
        ↓
registration / adapter
        ↓
Global Scene Definition
        ↓
Existing Animation Runtime
```

All current scenes must continue running while reusable concepts are extracted.

---

# 24. Phase 15 — NGLiving Inheritance Test

NGLiving must prove the framework is reusable.

It must not copy:

```text
AnimationRuntime
Scene Runtime
AnimationFactory
Theme Engine
Layout Engine
```

It should supply only:

```text
theme
layout
scene content
assets
business behavior
components
```

If NGLiving requires copied framework code, fix the abstraction.

---

# 25. Phase 16 — AI / Intent

AI Prompt must not merely save raw text.

Workflow:

```text
User Input
    ↓
Intent Derivation
    ↓
Capability Resolution
    ↓
Prompt Selection
    ↓
AI Provider
    ↓
Result Classification
    ↓
Component / Scene / Asset / Content
```

Example:

```text
“Create a cinematic lake with flying birds.”
```

may derive:

```text
Intent:
CREATE_CINEMATIC_SCENE

Scene Template:
Immersive Visual

Objects:
Lake
Birds
Temple

Animation:
Flight
Parallax
Atmosphere
```

These are internal mappings.

---

# 26. Phase 17 — ChatGPT Transitional Integration

Before full API integration, support:

```text
ArchitectAny Intent
      ↓
prepare contextual prompt
      ↓
open ChatGPT in a new browser tab/window
      ↓
user interacts
      ↓
copy result
      ↓
paste into ArchitectAny
      ↓
classify result
```

Result classes can include:

```text
SVG
TSX
JSON
Scene
Animation
Content
Asset definition
Component configuration
```

Use an AI Provider abstraction for future:

```text
OpenAI API
ChatGPT
Gemini
Claude
local models
enterprise AI
```

---

# 27. Phase 18 — Full Solution Admin

Target navigation:

```text
Overview
Identity
Experience
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

Every section should become architecturally meaningful. Do not create fake screens simply to fill navigation.

---

# 28. Phase 19 — Contextual Solution Administration

The same framework should support:

```text
/solution-admin/parakkai
/solution-admin/ngliving
/solution-admin/ecsha
/solution-admin/jaico
```

The administration architecture is global; the configuration is solution-specific.

---

# 29. Phase 20 — Security

Maintain the established boundary:

```text
Approved Page / Runtime
        ↓
Approved Resource Resolver
        ↓
Asset / Data Delivery
```

Do not expose:

```text
private JSON
internal registries
source TSX
draft-only resources
credentials
filesystem directories
```

Public content should still be delivered through the approved runtime/page resource model rather than a browsable repository.

---

# 30. Phase 21 — No Patchwork

Never solve framework problems by repeatedly adding:

```text
if Parakkai
if NGLiving
special Parakkai animation
special theme
special layout
special asset loader
special route
```

Instead ask:

> **What global framework capability is missing?**

Then extend the correct global layer.

---

# 31. Phase 22 — Live Safety

After every significant increment:

```powershell
pnpm exec tsc --noEmit
pnpm build
```

Verify:

```text
http://localhost:3000/
http://localhost:3000/?app=parakkai
http://localhost:3000/?app=ngliving
```

Existing Parakkai cinematic animation must continue functioning.

Do not merge an architectural increment that breaks the running baseline.

---

# 32. Definition of Success

The assignment succeeds when one global system provides:

```text
One global animation architecture
+
One Experience Runtime
+
Composable Theme
+
Composable Layout
+
Composable Scene
+
Reusable Components
+
Global Asset Explorer
+
AI Intent / Prompt mapping
+
Visual Solution Admin
+
Real Preview
+
Solution inheritance
```

and serves:

```text
Parakkai
NGLiving
```

without duplicated framework code.

---

# 33. Final Engineering Principle

ArchitectAny should become:

> **A visual solution operating system, not a collection of websites.**

The existing animation architecture is the engine.

The new work makes that engine universally usable through:

```text
Theme
Layout
Scene
Component
Asset
AI
Experience Builder
Solution Admin
```

while preserving all existing functionality.

## Final command

> **Extend the established ArchitectAny animation and experience architecture. Preserve all currently working behavior. Upgrade Theme, Layout, Scene, Asset, Animation and AI capabilities into a world-class reusable framework. Do not replace existing runtime concepts. Do not introduce parallel engines. Do not duplicate solution-specific code. Make new capabilities optional and backward-compatible. Prove the inheritance with Parakkai first and NGLiving second. Only then freeze the architecture before adding more solutions.**

---

# Handoff Checklist

Before starting:

- [ ] Pull current `main`
- [ ] Verify clean git state
- [ ] Run TypeScript check
- [ ] Run build
- [ ] Inspect existing animation runtime
- [ ] Inspect Experience runtime
- [ ] Inspect current Parakkai spatial implementation
- [ ] Inspect Solution Admin
- [ ] Identify reusable vs solution-specific code

Before each merge:

- [ ] Existing animation still works
- [ ] Parakkai still works
- [ ] NGLiving still works where applicable
- [ ] Theme inheritance works
- [ ] Layout inheritance works
- [ ] Preview works
- [ ] No parallel animation engine created
- [ ] No secrets or internal source resources exposed
- [ ] TypeScript clean
- [ ] Production build clean

---

**Document purpose:** portable engineering handoff.  
**Current principle:** **Extend the running foundation; do not replace it.**
