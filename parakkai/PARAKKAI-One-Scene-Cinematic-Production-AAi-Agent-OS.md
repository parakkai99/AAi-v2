# PARAKKAI — One-Scene Cinematic Production Process
## AAI-Agent-OS Handoff Specification

**Document ID:** AA-PARAKKAI-SPATIAL-SCENE-001  
**Process ID:** AAI-OS-PARAKKAI-SCENE-01  
**Status:** ACTIVE — Framework Definition  
**Version:** 1.0.0  
**Owner / Architect:** Vijay Kumar K.  
**Platform:** ArchitectAny (AAi)  
**Application:** PARAKKAI  
**Runtime:** AAi-v2 / Vite + React  
**Primary Route:** `/parakkai-spatial`

---

## 1. Purpose

This document defines the **one-scene production process** for the PARAKKAI Spatial Journey.

The objective is NOT to complete all scenes at once.

The objective is:

> **Capture or select one correct source image, transform/prepare it for web delivery, establish its spatial/cinematic behavior, define its animation template, define its transition behavior, implement it, verify it, and freeze the reusable framework.**

Once one scene is proven, the same production framework becomes the template for the remaining scenes.

### Core principle

```text
ONE SCENE
   ↓
ONE COMPLETE PRODUCTION PASS
   ↓
PROVEN FRAMEWORK
   ↓
REUSE FOR OTHER SCENES
```

The other scenes may remain empty/planned while the framework is being proven.

---

# 2. Why One Scene First

PARAKKAI must feel like:

> **a journey through a real place**

It must not feel like:

- a slideshow
- a dashboard
- a collection of cards
- a sequence of generic AI images
- an image repeatedly zooming in and out

The first scene is therefore a **reference implementation**.

The first scene must prove:

1. source-image quality
2. image composition
3. focal-point handling
4. viewport behavior
5. spatial depth
6. cinematic movement
7. atmospheric treatment
8. animation restraint
9. scene interaction
10. transition into the next scene
11. asset optimization
12. implementation contract
13. verification
14. handoff readiness

---

# 3. PARAKKAI Spatial Journey Context

The intended journey is:

```text
01 Sakthi Vinayakar
        ↓
02 Sacred Tree
        ↓
03 Vinayakar → Lake
        ↓
04 Parakkai Lake
        ↓
05 Maruthuva Malai
        ↓
06 Shiva + Bhuvaneswari
        ↓
07 Ganga / Knowledge Flow
        ↓
08 Valaikuli Amman
        ↓
09 Akkarai Mahadever
        ↓
10 Kanyakumari Bagavathi
        ↓
11 Madhusoodhana Temple
        ↓
12 Golden Darshan
```

The meaning is:

```text
Knowledge
   ↓
Blessing
   ↓
Flow
   ↓
Landscape
   ↓
Temple
   ↓
Darshan
```

This document defines the reusable production method, not the final content of every scene.

---

# 4. Scene Production Lifecycle

Every scene must follow the same A-to-Z process.

```text
A  — Scene Intent
B  — Source Capture / Source Selection
C  — Source Validation
D  — Composition Analysis
E  — Focal Point Definition
F  — Asset Master Preservation
G  — Web Optimization
H  — SVG Decision
I  — SVG / Vector Derivation
J  — Spatial Layer Design
K  — Cinematic Motion Design
L  — Atmosphere Design
M  — Interaction Design
N  — Transition Design
O  — Implementation
P  — Responsive Treatment
Q  — Performance Check
R  — Visual Review
S  — Semantic Review
T  — Type / Contract Verification
U  — Runtime Verification
V  — Asset Verification
W  — Acceptance Decision
X  — Freeze Scene Template
Y  — Handoff Package
Z  — Reuse for Next Scene
```

---

# 5. A — Scene Intent

Before obtaining an image, define what the scene means.

Required fields:

```text
sceneId
sceneNumber
title
subtitle
purpose
experience
location/context
emotional tone
journeyFrom
journeyTo
```

Example:

```text
sceneId: sakthi-vinayakar
sceneNumber: 01
title: Sakthi Vinayakar
purpose: Beginning of the sacred journey
experience: Quiet morning blessing
emotionalTone: Sacred / peaceful / welcoming
journeyFrom: Entry into Parakkai
journeyTo: Sacred Tree
```

The meaning must be established before visual effects are selected.

---

# 6. B — Source Capture / Source Selection

The preferred source is:

1. original photograph supplied by the project
2. approved real-world photograph
3. approved temple/deity image
4. approved source material

Do not replace a required real subject with unrelated stock imagery.

Do not use a generic AI image when the scene requires a real place, temple, deity, or supplied image.

### Capture requirements

When a new photograph is captured:

- capture the highest practical source resolution
- preserve original framing
- preserve original JPG/RAW/master
- record source/date/context when available
- do not overwrite the master
- do not crop destructively

---

# 7. C — Source Validation

Validate:

```text
Subject correct?
Location correct?
Image quality acceptable?
Important subject visible?
Lighting usable?
Composition usable?
No unintended obstruction?
Rights/approval known?
```

A scene must not enter production merely because an image looks attractive.

It must be the correct visual source.

---

# 8. D — Composition Analysis

Before animation, inspect the image for:

```text
foreground
midground
background
subject
horizon
light source
natural movement opportunities
negative space
safe text area
mobile crop area
transition direction
```

The image should be treated as a spatial environment rather than a flat rectangle.

---

# 9. E — Focal Point Definition

The scene configuration may use semantic focal points:

```text
temple
tree
water
mountain
deity
entrance
horizon
center
```

These semantic values must be translated by the renderer into actual CSS/object positioning.

Never pass arbitrary semantic labels directly into CSS.

Example:

```text
focalPoint = "temple"

Renderer mapping:

"temple" → "50% 42%"
```

This keeps scene configuration meaningful and renderer implementation-specific details separate.

---

# 10. F — Master Asset Preservation

The master asset must remain separate from browser delivery assets.

Required pattern:

```text
MASTER
  JPG / original
      ↓
PROCESSING
      ↓
WEB DELIVERY
  WebP
```

The master must never be replaced by the optimized derivative.

---

# 11. G — Web Optimization

Website delivery must be optimized.

Preferred delivery:

```text
WebP
```

The optimization process should consider:

- dimensions
- quality
- file size
- responsive variants
- loading priority
- current scene
- next scene

Do not load a multi-megabyte source image when a substantially smaller delivery asset preserves the required visual quality.

---

# 12. H — SVG Decision

SVG is NOT automatically required for every scene.

Use SVG when the visual can be represented efficiently as:

- flow
- light path
- mist
- water movement
- landscape abstraction
- atmospheric layer
- transition
- decorative vector geometry

Do NOT trace a real photograph into a huge SVG simply to call it SVG.

### Decision

```text
Real place / deity / temple photograph
        ↓
JPG master + WebP delivery

Conceptual flow / transition / atmosphere
        ↓
SVG
```

---

# 13. I — SVG / Vector Derivation

When SVG is appropriate:

```text
scene-03-flow.svg
scene-07-ganga-flow.svg
```

SVG should remain:

- lightweight
- semantic
- editable
- animation-friendly
- independent of raster photographs where possible

SVG must not become a giant embedded bitmap.

---

# 14. J — Spatial Layer Design

For each scene determine:

```text
Background
Midground
Subject
Foreground
Atmosphere
Light
Transition direction
```

If the supplied image is already a complete composition, use subtle treatment rather than artificially cutting everything into layers.

Layering should be used only when it improves spatial perception.

---

# 15. K — Cinematic Motion Template

The default motion must NOT be:

```text
zoom in
zoom out
zoom in
zoom out
```

That creates a slideshow effect.

### Preferred cinematic language

```text
Stable composition
      +
Very subtle parallax
      +
Environmental motion
      +
Natural light change
      +
Atmospheric depth
```

Possible motion types:

```text
STILL
DRIFT
FLOW
RISE
OPEN
```

These are semantic motion types.

The renderer decides how each type is implemented.

### Motion rule

The user should notice the **place first** and the animation second.

If the viewer immediately notices the zoom or effect, the motion is too strong.

---

# 16. L — Atmosphere Template

Atmosphere must be natural.

Possible layers:

```text
dawn light
soft haze
mist
water reflection
air
dust/pollen
birds
subtle environmental particles
```

Avoid:

```text
neon
laser
sci-fi energy
heavy particle storms
obvious artificial effects
```

The environment should feel alive, not digitally decorated.

---

# 17. M — Interaction

The journey currently supports:

```text
Arrow Right / Down → Next
Arrow Left / Up     → Previous
Space               → Play / Pause
Escape              → Exit immersive
Bottom navigation   → Select scene
```

Controls must remain secondary.

The experience should remain visually dominated by the scene.

---

# 18. N — Transition Design

A scene transition must answer:

> What naturally connects this place to the next place?

Examples:

```text
Vinayakar
   ↓
Blessing / light
   ↓
Flow
   ↓
Lake
```

and:

```text
Shiva + Bhuvaneswari
   ↓
Knowledge
   ↓
Water / mist / light
   ↓
Ganga Flow
```

The transition should preserve spatial continuity.

Avoid arbitrary page wipes and unrelated effects.

---

# 19. O — Implementation

The architecture is:

```text
spatialJourneyConfig.ts
        ↓
SpatialJourneyStage.tsx
        ↓
SpatialScene.tsx
        ↓
SpatialAtmosphere.tsx
        ↓
SpatialSceneControls.tsx
```

Responsibilities:

### spatialJourneyConfig

Owns:

- scene identity
- scene metadata
- asset references
- focal point
- motion semantics
- atmosphere semantics
- asset status

### SpatialJourneyStage

Owns:

- current scene
- journey state
- autoplay
- navigation
- scene selection

### SpatialScene

Owns:

- scene rendering
- image rendering
- depth
- camera/parallax behavior
- fallback behavior

### SpatialAtmosphere

Owns:

- natural light
- haze
- environmental particles
- atmospheric depth

### SpatialSceneControls

Owns:

- scene navigation
- play/pause
- immersive control

Do not duplicate scene definitions across files.

---

# 20. P — Responsive Treatment

Each scene must be tested at:

```text
Desktop
Tablet
Mobile
```

Do not assume:

```text
object-position: center
```

works for every image.

The semantic focal point must determine the crop.

Example:

```text
deity → keep deity visible
temple → preserve entrance
mountain → preserve mountain silhouette
water → preserve water horizon
tree → preserve sacred tree
```

---

# 21. Q — Performance

Measure:

```text
image file size
initial load
scene load
next-scene readiness
animation cost
memory
network requests
```

Prefer:

```text
WebP
responsive dimensions
current-scene priority
next-scene preparation
CSS animation where practical
minimal React state changes
```

Avoid unnecessary animation loops.

---

# 22. R — Visual Review

Review the scene without looking at the code.

Ask:

```text
Does this feel like a place?
Does the image retain meaning?
Is the subject immediately understandable?
Does the movement feel natural?
Is the atmosphere subtle?
Does the composition feel spatial?
Does anything look like a slideshow?
```

If the answer is no, fix the visual system before adding more scenes.

---

# 23. S — Semantic Review

Confirm:

```text
Correct place?
Correct deity?
Correct temple?
Correct story/context?
Correct journey position?
Correct relationship to next scene?
```

Visual beauty must not replace semantic correctness.

---

# 24. T — Type / Contract Verification

Before accepting the scene:

```text
TypeScript errors = 0
```

Verify the scene object matches the renderer contract.

No duplicate or incompatible scene interfaces should be introduced.

---

# 25. U — Runtime Verification

Verify:

```text
/parakkai-spatial loads
Scene renders
Image loads
Fallback works
Controls work
Keyboard works
No console-breaking error
No route regression
AAi Universe root remains intact
```

Do not claim successful build/runtime validation until it has actually been run and observed.

---

# 26. V — Asset Verification

Confirm:

```text
Master exists
WebP exists
Correct filename
Correct runtime path
Correct scene reference
Correct fallback
No accidental duplicate
No oversized unnecessary file
```

---

# 27. W — Acceptance Decision

A scene is accepted only when:

```text
CONTENT       ✅
ASSET         ✅
COMPOSITION   ✅
MOTION        ✅
ATMOSPHERE    ✅
TRANSITION    ✅
RESPONSIVE    ✅
PERFORMANCE   ✅
TYPE          ✅
RUNTIME       ✅
```

If one of the critical items fails:

```text
Scene = NOT FROZEN
```

---

# 28. X — Freeze the Scene Template

Once Scene 01 is accepted, freeze:

```text
Image treatment template
Focal-point mechanism
Motion vocabulary
Atmosphere vocabulary
Transition mechanism
Control behavior
Responsive behavior
Asset pipeline
Verification checklist
```

The next scenes should inherit the framework.

They should NOT require redesigning the architecture.

---

# 29. Y — Handoff Package

Every completed scene should produce a small handoff package.

Recommended structure:

```text
tasks/PARAKKAI-SPATIAL-SCENE-01/
│
├── 01-intent/
│   └── intent.md
│
├── 02-architect/
│   ├── architecture.md
│   ├── prompt.md
│   └── acceptance.md
│
├── 03-engineer/
│   ├── assignment.json
│   └── result.md
│
├── 04-verify/
│   ├── review.md
│   ├── qa.md
│   └── validation.json
│
├── 05-assemble/
│   └── decision.md
│
└── assets/
    ├── master/
    ├── web/
    └── svg/
```

This follows the AAi-Agent-OS task lifecycle:

```text
INTENT
  ↓
ARCHITECT
  ↓
ENGINEER
  ↓
VERIFY
  ↓
ASSEMBLE
  ↓
RESULT / PREVIEW
```

---

# 30. Z — Reuse

After Scene 01 is frozen:

```text
Scene 01
   ↓
PROVEN TEMPLATE
   ↓
Scene 02
   ↓
Scene 03
   ↓
Scene 04
   ↓
...
Scene 12
```

Only the scene-specific content changes.

The engineering framework should remain stable.

---

# 31. Scene 01 Reference Implementation

The first scene is:

```text
ID: sakthi-vinayakar
NUMBER: 01
TITLE: Sakthi Vinayakar
SUBTITLE: The Beginning
```

Source:

```text
Real supplied image
```

Delivery:

```text
WebP
JPG fallback/master relationship
```

Desired feeling:

```text
quiet
sacred
warm
real
peaceful
welcoming
```

Motion:

```text
STILL / extremely subtle parallax
```

NOT:

```text
visible zoom in/out
```

Atmosphere:

```text
early morning
soft golden light
subtle air
very restrained particles
```

The image must remain the hero.

---

# 32. Scene Asset Decision Matrix

| Visual Requirement | Preferred Asset |
|---|---|
| Real temple | Real photograph → WebP |
| Real deity | Approved real/supplied image → WebP |
| Real lake | Real photograph → WebP |
| Real mountain | Approved real photograph → WebP |
| Transition flow | SVG |
| Knowledge flow | SVG |
| Water movement overlay | SVG/CSS |
| Mist | CSS/SVG |
| Light | CSS/SVG |
| Atmospheric particles | CSS/SVG |
| Decorative UI | CSS/SVG |

---

# 33. Do Not Do

```text
❌ Do not create 12 scenes before Scene 01 is proven.
❌ Do not use random stock imagery.
❌ Do not replace supplied sacred imagery.
❌ Do not repeatedly zoom photographs.
❌ Do not create dashboard/card presentation.
❌ Do not convert photographs into huge traced SVGs.
❌ Do not add unnecessary dependencies.
❌ Do not duplicate scene contracts.
❌ Do not change unrelated AAi-v2 code.
❌ Do not replace the AAi Universe.
❌ Do not create Next.js routes in this Vite project.
❌ Do not mark a scene complete without runtime verification.
```

---

# 34. Recommended Production Sequence

```text
PHASE 1
Scene 01 source
        ↓
Image optimization
        ↓
Spatial composition
        ↓
Cinematic template
        ↓
Atmosphere
        ↓
Interaction
        ↓
Transition
        ↓
Responsive
        ↓
Performance
        ↓
Verification
        ↓
FREEZE

PHASE 2
Reuse framework for Scene 02

PHASE 3
Reuse framework for Scene 03

...

PHASE 12
Reuse framework for Scene 12
```

---

# 35. Agent Assignment Model

An AAi-Agent-OS worker should receive a scene assignment containing:

```json
{
  "taskId": "PARAKKAI-SPATIAL-SCENE-01",
  "sceneId": "sakthi-vinayakar",
  "sceneNumber": 1,
  "objective": "Produce one production-ready cinematic spatial scene.",
  "assetPolicy": {
    "master": "JPG/original",
    "delivery": "WebP",
    "svg": "Only when semantically appropriate"
  },
  "motionPolicy": {
    "preferred": "subtle spatial motion",
    "avoid": "obvious zoom in/out"
  },
  "visualPriority": [
    "real place",
    "composition",
    "depth",
    "atmosphere",
    "motion",
    "transition",
    "UI"
  ],
  "acceptance": {
    "typescriptErrors": 0,
    "runtimeRoute": "/parakkai-spatial",
    "realAssetVisible": true,
    "sceneMeaningPreserved": true
  }
}
```

---

# 36. Final Definition

The **One-Scene Requirement** is not merely an animation task.

It is a complete production pipeline:

```text
CAPTURE / SELECT
       ↓
VALIDATE
       ↓
ANALYZE
       ↓
PRESERVE MASTER
       ↓
OPTIMIZE
       ↓
DECIDE JPG / WEBP / SVG
       ↓
DEFINE SPATIAL COMPOSITION
       ↓
DEFINE FOCAL POINT
       ↓
DEFINE CINEMATIC MOTION
       ↓
DEFINE ATMOSPHERE
       ↓
DEFINE INTERACTION
       ↓
DEFINE TRANSITION
       ↓
IMPLEMENT
       ↓
RESPONSIVE
       ↓
PERFORMANCE
       ↓
VISUAL QA
       ↓
TECHNICAL QA
       ↓
ACCEPTANCE
       ↓
FREEZE
       ↓
HANDOFF
       ↓
REUSE TEMPLATE
```

### Core rule

> **Do one scene completely before producing the next scene.**

The purpose of Scene 01 is to establish the **PARAKKAI Cinematic Scene Framework**, not merely to make Scene 01 look attractive.

---

## Contract

**Contract ID:** P1-SPATIAL-SCENE-PRODUCTION  
**Contract Name:** PARAKKAI One-Scene Cinematic Production Framework  
**Status:** ACTIVE  
**Version:** 1.0.0  
**Architect:** Vijay Kumar K.  
**Platform:** ArchitectAny (AAi)  
**Orchestration Target:** AAi-Agent-OS  
**Application Boundary:** PARAKKAI  
**Runtime Boundary:** AAi-v2  
