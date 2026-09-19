# AAi V2.0.1 Backend Design Freeze

## Purpose
This document freezes the provider-neutral backend design boundary for AAi V2.0.1 before UI expansion.

## Frozen layers
1. Canonical catalog and L1-L5 solution contracts.
2. Selection and Solution Bag lifecycle.
3. Discovery, provider identity and evidence.
4. Commercial/customer lifecycle contracts.
5. L5 Solution Definition and Composition Manifest.
6. Environment, Persistence, Asset, Runtime, Deployment and Update manifests.
7. JSON definition generation, parsing, hashing and validation.
8. AI structured prompt/result boundary with source references and human approval state.
9. Provider adapter boundary and deterministic provider artifact generation.
10. Release compatibility, approval, activation and rollback planning.
11. Security, tenant, trust and audit contracts.
12. Client Control Plane / Runtime boundary.
13. Provider-neutral control-plane persistence model.

## Runtime rule
AAi definitions remain provider-neutral. L6 resolves them into a target environment. Provider-specific implementation is isolated behind ProviderAdapter.

## Execution rule
- Deterministic capability -> service.
- Reasoning/adaptation -> AI/agent boundary.
- Long-running state -> workflow boundary.
- Human approval -> explicit approval state.
- Deployment -> provider adapter.
- Update -> signed release metadata + compatibility + integrity + approval.
- Rollback -> explicit rollback plan; never implicit destructive mutation.

## Data rule
Canonical source definitions are never silently overwritten. Generated or mapped copies are explicit and carry generated-copy metadata.

## Security rule
Hash, signature and key identity are separate concerns. Hashing provides integrity evidence; trust adapters are responsible for cryptographic verification. Private signing material never belongs in the AAi application repository.

## Persistence rule
Logical persistence is defined by manifests. Physical persistence is resolved by L6/provider adapters. Control-plane persistence is separate from client solution business data.

## Discovery rule
External discovery creates source references and evidence. Provider facts are not invented. Normalization preserves provenance.

## Client boundary
The client receives only the minimum runtime/control-agent contract required to register, heartbeat, evaluate and activate approved releases. AAi control-plane internals remain on the control side.

## Explicit non-goals for this freeze
- No UI implementation.
- No provider-specific credentials.
- No automatic production deployment.
- No silent AI publishing.
- No direct mutation of canonical catalog definitions.
- No assumption that every provider adapter is already operational.

## Verification state
B01-B05 and B06-B12 backend foundation has passed the project's latest local lint/build checkpoint. The current build still reports the existing large-chunk Rollup warning; it is not a backend correctness failure.

## Next boundary
After this freeze, implementation may move to backend persistence/adapter integration tests and then controlled UI wiring. Architecture should not be redesigned while those stages are being implemented unless a concrete contract defect is found.