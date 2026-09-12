# ArchitectAny — Architecture Extension Assessment (2026-09-12)
## Baseline: `f40099e` | Scope: GS Engineer Extension Analysis

---

### Executive Summary
This assessment inspects the active, verified Git baseline at commit `f40099e` (`differentiate theme and layout library controls visually`) on branch `main`. It maps existing runtime contracts, registries, executors, and application bridges across `src/animation/`, `src/experience/`, `src/applications/`, `components/admin/`, and `parakkai/`. 

The central mandate is: **Extend the running framework — do not replace or rebuild the established animation or experience runtime.**

---

### 1. Existing Animation Runtime Architecture
The animation engine under `src/animation/` is a production-grade, multi-target execution pipeline:
- **`AnimationFactory` (`src/animation/factory/AnimationFactory.ts`)**: Resolves an `AnimationRequest` (containing `objectId`, `motionId`, `triggerId`, and override parameters) into a `ResolvedAnimation` by querying the three core registries.
- **`MotionRegistry` & `MotionDefinitions` (`src/animation/motion/`)**: Houses pre-registered motion definitions (`MotionDefinition`) with parameter schemas, default easing/durations, and variant keyframes.
- **`ObjectRegistry` & `ObjectDefinitions` (`src/animation/objects/`)**: Manages animated object identities (`AnimationObject`) with tags, enabled states, and target groupings.
- **`TriggerRegistry` & `TriggerDefinitions` (`src/animation/triggers/`)**: Defines activation lifecycle triggers (`immediate`, `hover`, `click`, `view`, `timer`, `sequence`, `broadcast`).
- **`AnimationTargetRegistry` (`src/animation/runtime/AnimationTargetRegistry.ts`)**: Binds DOM elements/refs to specific `objectId` and optional `targetId` instances.
- **`AnimationRuntime` (`src/animation/runtime/AnimationRuntime.ts`)**: Orchestrates execution across resolved targets using `MotionExecutor` (applying styles/keyframes) and `TriggerExecutor` (dispatching trigger events).

### 2. Existing Animation Extension Points
Without disturbing any existing interfaces, the animation system provides clear extension seams:
- **Motion Registry Hooks**: Register new motion types (e.g., `cinematic-reveal`, `sacred-radiance`, `water-drift`, `staggered-cascade`) directly via `motionRegistry.register()` or expanding `MotionDefinitions.ts`.
- **Target Subgroups**: The `targetIds?: readonly string[]` property in `AnimationRuntimeRequest` allows fine-grained target filtering without altering the core `AnimationRequest`.
- **Trigger Lifecycle Expansion**: The `TriggerExecutor` handles callbacks (`execute`, `resolveSequence`). We can introduce timeline sequencing and delay offset parameters without altering how existing triggers fire.
- **Scene-Level Adapter**: Rather than teaching the animation engine about "Scenes", a higher-level Scene Orchestrator can formulate batches of standard `AnimationRequest` payloads and submit them via `runtime.startMany()`.

### 3. Existing Experience Contracts
Defined in `src/experience/contracts/`:
- **`ExperienceDefinition.ts`**: The canonical envelope covering `id`, `scope` (`universe` | `domain` | `subdomain` | `solution`), `parentId`, `identity`, `context`, `search`, `appStack`, `navigation`, `themeId`, `layoutId`, `compositionId`, and `infrastructure`.
- **Inheritance Chain**: `resolveExperienceDefinition(chain)` in `src/experience/resolver/` traverses from Universe to Solution, cleanly merging child overrides over parent properties while preserving defaults.

### 4. Existing Theme Contracts
Defined in `src/experience/theme/ThemeDefinition.ts` & `ThemeRegistry.ts`:
- **Structure**: `ExperienceTheme` specifies `id`, `name`, `category`, `description`, `typography` (`display`, `body`, `mono`), `background` (`mode`, `value`, `overlay`), and 12 base `tokens` (`background`, `surface`, `surfaceAlt`, `text`, `textMuted`, `primary`, `secondary`, `accent`, `border`, `radius`, `shadow`, `heroOverlay`).
- **Registry**: 9 canonical themes pre-registered (`aai-live`, `ai-era`, `serene-blue`, `commerce-trusted`, `forest-green`, `sunset-orange`, `midnight-dark`, `pure-white`, `royal-purple`).
- **Runtime Injection**: `ExperienceRuntime.tsx` injects CSS custom properties (`--aai-bg`, `--aai-surface`, etc.) directly into `:root` and syncs with `localStorage`.

### 5. Existing Layout Contracts
Defined in `src/experience/layout/LayoutRegistry.ts`:
- **Structure**: `ExperienceLayout` defines `id`, `name`, `drilldownLevels` (3 | 4 | 5), `navigation` (`sidebar` | `top` | `hybrid` | `cards`), `railPolicy` (`none` | `left` | `both`), `description`, `structure`, and `regions` (`readonly ExperienceLayoutRegion[]`).
- **Pre-Registered Layouts**: 9 layouts including `aai-live`, `aai-live-left`, `aai-live-full`, `drilldown-3/4/5`, `sidebar`, `top-navigation`, and `card-grid`.
- **Shell**: `ExperienceShell.tsx` dynamically renders slots for `header`, `leftRail`, `main`, `rightRail`, and `footer` conditional on the active layout's `railPolicy`.

### 6. Existing Composition Contracts
Defined in `src/experience/composition/ExperienceCompositionDefinition.ts`:
- **Structure**: `ExperienceCompositionDefinition` organizes `regions` (`header`, `left-rail`, `main`, `right-rail`, `footer`, `utility`), each containing ordered `ExperienceBlockDefinition` nodes.
- **Blocks**: Can represent components (`componentId`, `version`, `variant`), media (`image`, `svg`, `video`), content references (`key`, `source`), and declarative animation references (`objectId`, `motionId`, `triggerId`).

### 7. Existing ApplicationRuntime Flow
Defined in `src/applications/ApplicationRuntime.tsx` & `ApplicationRegistry.ts`:
- Controlled registry mapping solution IDs (`parakkai`, `ngliving`) to React components (`ParakkaiApp`, `NGLivingApp`).
- Flow:
  1. `ApplicationRuntime` receives `applicationId`, `previewDraft`, `previewThemeId`, `previewLayoutId`.
  2. Pulls solution experience configuration from `solutionAdminService.getSolutionExperienceDefinition(applicationId)`.
  3. Wraps the target application component in `<ExperienceRuntime applicationId={id} definition={...}>`.
  4. The solution component mounts with full access to `useExperienceRuntime()`.

### 8. Existing Parakkai Scene Architecture
Defined in `parakkai/components/home/spatial/`:
- **`spatialJourneyConfig.ts`**: Contains `PARAKKAI_SPATIAL_JOURNEY`, an array of 12 production scenes (`sakthi-vinayakar`, `sacred-tree`, `temple-entry`, `sanctum-sanctorum`, etc.) with `id`, `title`, `kind`, `image`, `imageFallback`, `accent`, `motion`, `atmosphere`, and `experience`.
- **Components**: `SpatialJourneyStage.tsx` coordinates playback; `SpatialScene.tsx` handles media rendering; `SpatialAtmosphere.tsx` manages lighting/particles; `SpatialActivityRail.tsx` displays scene navigation.

### 9. Existing Reusable Pieces Inside Parakkai
- **Scene Schema**: The schema in `spatialJourneyConfig.ts` is already an implicit Scene Model (media, fallbacks, focal point, atmosphere, motion hints).
- **Atmospheric Layering**: Particle effects, golden mist, water ripples, and sunrise glow generators are solution-agnostic techniques that can be generalized into scene templates.
- **Spatial Navigation Rail**: Can be lifted into a generalized Scene Index / Chapter Rail pattern.

### 10. What Must Remain Untouched
- The core animation factory, registries, and runtime classes in `src/animation/`.
- The IDs of all existing themes (`aai-live`, `ai-era`, etc.) and layouts (`aai-live`, `aai-live-left`, `aai-live-full`, etc.).
- Existing route structures in `app/preview/page.tsx` and `app/solution-admin/`.
- The live Parakkai visual presentation and single-viewport spatial experience.
- The `ApplicationRuntime` and `ApplicationRegistry` contract contracts.

### 11. What Can Be Extended
- **Theme Contract**: Add optional extended tokens: `elevation`, `radii` scales, `spacing` scales, `motion` language attributes (curve, duration, feel), and component default styles.
- **Layout Contract**: Add optional region behavior definitions (`sticky`, `collapsible`, `floating`, `overlay`, `drawer`, `responsive`).
- **Scene Layer**: Introduce `src/experience/scene/` or `src/spatial/` holding a generalized Scene Definition contract that compiles down to `ExperienceBlockDefinition` and `AnimationRequest` arrays.
- **Asset Explorer Layer**: Introduce a global asset registry mapping logical `assetRef` tokens to verified URIs, MIME types, and approval states.
- **AI Intent Gateway**: Introduce structured intent parsing (`User Query` → `Intent` → `Template` → `Config`) without modifying core application behavior.

### 12. Missing Global Abstractions
1. **Global Scene Contract**: A first-class `SceneDefinition` contract that bridges high-level scene composition with `src/animation/`.
2. **Scene Template Registry**: Reusable templates (`cinematic-hero`, `split-visual`, `immersive-story`, `spatial-map`) providing pre-wired slots for 5 to *N* animation objects.
3. **Asset Registry (`assetRef`)**: A central resolver decoupling assets from hard-coded file paths in components.
4. **Theme Delta Inheritor**: A utility function that merges solution/page theme overrides with base themes like `aai-live`.
5. **AI Intent Classification Engine**: A provider-agnostic bridge mapping natural language to scene definitions and component configurations.

### 13. Proposed Minimal Backward-Compatible Extensions
- **Step 1: Extended Theme Interface**: Augment `ExperienceTheme` with optional `motionLanguage?: { curve: string; speed: string; style: string }`, `surfaces?: Record<string, string>`, and `extends?: string`.
- **Step 2: Region Behavior in Layout**: Augment `ExperienceLayout` with optional `regionBehaviors?: Partial<Record<ExperienceLayoutRegion, { collapsible?: boolean; sticky?: boolean; floating?: boolean }>>`.
- **Step 3: Global Scene Contract (`SceneDefinition.ts`)**: Create `src/experience/scene/SceneDefinition.ts` that references `objectId`s and `motionId`s from `src/animation/`, with an adapter for `PARAKKAI_SPATIAL_JOURNEY`.
- **Step 4: Global Asset Catalog (`AssetRegistry.ts`)**: Create `src/experience/asset/AssetRegistry.ts` that indexes assets by `assetRef` and provides fallback handling.
- **Step 5: Contextual Admin Integration**: Expose Theme, Layout, Scene, and Asset inspection tabs inside `components/admin/SolutionAdmin.tsx`.

### 14. Risks to the Current Runtime & Mitigations
- **Risk 1: Theme Variable Bleed**: Overriding global CSS custom properties might accidentally impact un-themed solution views.
  - *Mitigation*: Scope CSS variables to container scopes (`data-aai-theme`) or provide fallback variables in solution root components.
- **Risk 2: Animation Engine Double-Initialization**: Initializing multiple `AnimationRuntime` instances could lead to conflicting target registries.
  - *Mitigation*: Ensure `AnimationRuntime` remains a singleton or is bound via a single shared React Context provider.
- **Risk 3: Asset Path Breakage**: Moving from direct URLs to `assetRef` tokens could break images if missing from the catalog.
  - *Mitigation*: Asset resolver must always allow raw paths as a fallback when an `assetRef` is not found.

### 15. Recommended Implementation Order
1. **Phase 1 (Theme & Layout Expansion)**: Enhance `ThemeDefinition` and `LayoutRegistry` with optional tokens and region policies without breaking existing IDs.
2. **Phase 2 (Asset Explorer Foundation)**: Create `src/experience/asset/` with an initial catalog indexing existing Parakkai and AAi assets.
3. **Phase 3 (Scene Orchestrator & Templates)**: Create `src/experience/scene/` supporting 5 to *N* animated objects, backed by the existing `AnimationRuntime`.
4. **Phase 4 (Parakkai 12-Scene Adapter)**: Wrap `PARAKKAI_SPATIAL_JOURNEY` through the Scene adapter so Parakkai runs on the global scene contract.
5. **Phase 5 (NGLiving Inheritance Proof)**: Add a simple NGLiving scene definition proving zero-copy framework reusability.
6. **Phase 6 (AI Intent Resolution)**: Add the prompt-to-intent mapper and paste-back classifier in `SolutionAdmin`.
7. **Phase 7 (Admin & Preview Integration)**: Update `SolutionAdmin` to visually expose the Scene, Asset, and AI capabilities.
