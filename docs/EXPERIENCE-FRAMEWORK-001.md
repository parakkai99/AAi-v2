# AAi Experience Framework

**Architect:** Vijay Kumar K.  
**Platform:** ArchitectAny (AAi)  
**Contract:** EXPERIENCE-FRAMEWORK-001  
**Version:** 1.0.0  
**Status:** ACTIVE

## Purpose

Provide one domain-neutral Theme + Layout capability that can be consumed by every application built on the AAi framework.

## Libraries

### Theme Library

Initial framework themes:

- AI Era
- Serene Blue
- Commerce Trusted
- Forest Green
- Sunset Orange
- Midnight Dark
- Pure White
- Royal Purple

Themes are token definitions, not application content. Hero imagery may be attached later through `assetRef` without embedding application assets in the framework.

### Layout Library

Initial layouts:

- 3-Level: Home → Section → Page
- 4-Level: Home → Section → Category → Page
- 5-Level: Home → Section → Category → Section → Page
- Sidebar Layout
- Top Navigation
- Card Grid Layout

## Runtime

`ExperienceRuntime` applies the selected theme tokens as CSS custom properties and persists the selected theme/layout per `applicationId`.

This keeps configuration separate from application identity. React context is used so framework-aware components can consume the active experience configuration without prop drilling.

## Application scope

The Application Runtime now wraps registered applications with `ExperienceRuntime`, so Parakkai, NGLiving and future registered applications receive the same framework capability.

AALab is an implementation/development environment rather than a customer application. It can consume the same public Experience Framework surface when the reusable framework is extracted into its distributable package.

## Important boundary

The framework does **not** copy or own application content, assets, business rules, navigation labels or domain semantics. An application chooses a theme/layout; the application remains the owner of its identity and data.

## Admin

`Admin Console → Experience Builder` is the management surface for selecting a theme and layout for an application. The current reference persistence is browser-local; service-backed persistence is the next authority layer.
