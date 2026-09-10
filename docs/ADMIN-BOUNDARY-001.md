# AAi Administration Boundary

**Contract:** AAi-ADMIN-001 / SOLUTION-ADMIN-001  
**Status:** ACTIVE  
**Version:** 1.0.0  
**Architect:** Vijay Kumar K.  
**Platform:** ArchitectAny (AAi)

## 1. AAi-Admin

AAi-Admin is the platform authority. It governs:

- framework contracts and reusable capability libraries
- theme, layout, component and animation libraries
- license authority, capacity, registration and certification
- runtime adapters and platform policy
- AI platform governance
- identity and access at platform scope
- application/solution registration
- platform lifecycle and audit

AAi-Admin does not own or edit a customer's solution content.

## 2. Solution Admin

Every registered solution receives its own Solution Admin control plane.

Solution Admin governs only the selected solution:

- identity and configuration
- theme and layout selection
- navigation and UX configuration
- content and content upload
- JSON/data configuration
- assets and asset manifests
- AI prompts and approved AI content
- components and animation mappings
- integrations and data-source references
- users and solution-level access
- draft, publish, version and lifecycle state
- solution audit

## 3. Boundary

```text
AAi-Admin
    |
    +-- Framework capability
    +-- License authority
    +-- Runtime governance
    +-- Registered Solutions
             |
             +-- Parakkai -> Solution Admin
             +-- NGLiving -> Solution Admin
             +-- Future Solution -> Solution Admin
```

The reusable framework describes **capability**. The solution describes **identity and content**.

## 4. Persistence baseline

The current Vite implementation persists Solution Admin configuration in solution-scoped browser storage. This is a local development control-plane adapter. Production storage/authentication can later move behind the existing repository/service contracts without changing the administration boundary.
