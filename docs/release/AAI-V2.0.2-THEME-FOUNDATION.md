# AAi-V2.0.2 — Experience Theme Foundation

## Release intent

AAi-V2.0.2 begins the full Experience Theme application phase.

Theme selection is not limited to the theme selector control. The selected Experience Theme is applied through the existing Experience Runtime token layer to the page shell, global surfaces, Universe presentation, domain cards, footer, navigation shell, and 3D Universe palette.

## Persistence

The Experience Runtime stores the selected theme in browser localStorage using the application-scoped Experience Theme key. The selected theme therefore remains active across a normal page reload for the same experience.

## Theme Library

The existing AAi Live theme remains preserved. Mysore 1, Mysore 2, Mysore 3 and Mysore 4 are available in the same Experience Theme Library.

## Rule

Theme selection changes presentation tokens only. It must not change content, navigation structure, assets, SVG identity, typography contract, business logic, or application behavior.

## Next migration boundary

Legacy hard-coded visual values in remaining domain/application components should progressively consume the Experience Runtime tokens. New components must use the theme tokens rather than introducing new hard-coded AAi palette values.
