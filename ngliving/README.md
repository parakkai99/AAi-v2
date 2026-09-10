# NGLiving

NGLiving is the second AAi reference application under `AAi-v2`.

It is intentionally small. It exists to answer one architectural question:

> What functionality from Parakkai is actually application-framework capability?

## Runtime

NGLiving is registered through the AAi application registry and rendered by `ApplicationRuntime`.

## Configuration

- `config/site.yaml` — application identity and runtime contract
- `config/capabilities.yaml` — carry / adapt / do-not-copy decisions
- `config/navigation.yaml` — application navigation contract

## Review

See `docs/PORTABILITY-REVIEW.md` for the current extraction decision.

## Rule

Reusable code describes capability. NGLiving describes its own identity, content, assets and business rules.
