# NGLiving Portability Review

**Architect:** Vijay Kumar K.  
**Platform:** ArchitectAny (AAi)  
**Contract:** NGLIVING-PORTABILITY-001  
**Status:** ACTIVE  
**Version:** 1.0.0

## Purpose

NGLiving is the second reference application used to test the application boundary established by Parakkai.

The objective is not to clone Parakkai as a second branded site. The objective is to identify which capabilities are reusable and which parts belong to application identity.

## Carry

The following capability families are suitable for reuse:

- application runtime and registry
- home experience pattern
- navigation capability
- scene/experience composition
- animation runtime
- motion and trigger concepts
- theme capability
- daily information
- events
- media discovery
- stories/content
- community/participation
- nearby/local discovery
- marketplace/commerce capability
- map/location capability

## Adapt

These patterns may be reusable, but their business meaning must be supplied by the application:

- booking/transaction flows
- cart and checkout behavior
- map semantics
- community actions
- content taxonomy
- navigation labels
- theme values

## Do Not Carry

The following remain Parakkai application identity and must not become shared framework assumptions:

- temple-specific views
- darshan semantics
- pooja semantics
- sacred terminology
- Parakkai scene names
- Parakkai image assets
- Parakkai business rules
- Parakkai IDs inside generic framework modules

## Evidence Files

- `ngliving/config/site.yaml`
- `ngliving/config/capabilities.yaml`
- `ngliving/config/navigation.yaml`
- `ngliving/components/NGLivingApp.tsx`

## Next application rule

Future applications should begin with the same sequence:

`Application Definition → Capability Map → Navigation Contract → Identity/Content → Runtime Wiring → Verification`

Do not begin by copying an entire existing application directory.
