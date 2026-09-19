# AAi-V2.0.1 — L1→L6 Implementation Watchdog & Checklist

**Status:** ACTIVE WATCHDOG  
**Freeze date:** 2026-09-19  
**Implementation mode:** BUILD → RUN → VERIFY → NEXT STAGE



## Foundation Contract Implementation — 2026-09-19

**Stage:** CONTRACT FOUNDATION IMPLEMENTED — LOCAL VERIFICATION PENDING

Implemented backend contract areas:

- [x] Existing L1-L5 catalog contract retained and used as canonical hierarchy
- [x] L5 concrete solution contract expanded
- [x] L5 experience/design requirements made explicit
- [x] L5 provider/discovery requirements added
- [x] L5 persistence/asset/integration requirements added
- [x] L5 L6 requirement boundary added
- [x] L1-L5 selection policy contract added
- [x] My Solution Bag contract added
- [x] L5-only checkout eligibility contract added
- [x] Discovery source/evidence/provider contracts added
- [x] Intent and discovery-plan contracts added
- [x] Commercial pricing/discount/offer/credit/payment/quote contracts added
- [x] Customer lifecycle/follow-up/support contracts added
- [x] Service/Agent/Workflow/Provider-service contracts added
- [x] Integration contract added
- [x] Solution Manifest added
- [x] Composition Manifest added
- [x] Experience Manifest added
- [x] Persistence Manifest added
- [x] Asset Manifest added
- [x] Environment Manifest added
- [x] Runtime Manifest added
- [x] Deployment Manifest added
- [x] Update/Rollback Manifest added
- [x] Audit Manifest added
- [x] Data source/intake/mapping contracts added
- [x] Structured AI prompt/result contracts added
- [x] Canonical AAi definition package added
- [x] Contract validation result types added
- [x] Central contract exports added

### Contract foundation files

`src/contracts/catalog.ts`  
`src/contracts/l5Solution.ts`  
`src/contracts/selection.ts`  
`src/contracts/discovery.ts`  
`src/contracts/commercial.ts`  
`src/contracts/integration.ts`  
`src/contracts/manifests.ts`  
`src/contracts/dataIntake.ts`  
`src/contracts/ai.ts`  
`src/contracts/definition.ts`  
`src/contracts/validation.ts`  
`src/contracts/index.ts`

**Important:** [x] means the contract has been implemented in Git. It does **not** mean runtime/typecheck verification is complete. The next gate is local `pnpm lint` / `pnpm build`, followed by correction of any real compiler issues before the next foundation stage.

## Master progression

- [ ] L1 — 14 domains fixed and canonical
- [ ] L2 — every domain/subdomain possibility captured
- [ ] L3 — every capability possibility captured
- [ ] L4 — every solution bundle possibility captured
- [ ] L5 — every concrete solution possibility captured
- [ ] L5 experience/design requirements complete
- [ ] L5 provider/discovery requirements complete
- [ ] L5 commercial/customer lifecycle complete
- [ ] L5 selection and My Solution Bag complete
- [ ] L5-only checkout boundary enforced
- [ ] Composition Manifest complete
- [ ] Experience Manifest complete
- [ ] L6 environment/runtime contract complete
- [ ] Persistence Manifest complete
- [ ] Asset Manifest complete
- [ ] Deployment Manifest complete
- [ ] Operations/observability complete
- [ ] Update/rollback complete
- [ ] Provider-specific deployment artifacts complete

## L1 — Domain

For every domain:

- [ ] ID
- [ ] name
- [ ] business world
- [ ] objectives
- [ ] description
- [ ] related domains
- [ ] capability areas
- [ ] data/services/integrations

## L2 — Subdomain

For every L2:

- [ ] parent L1
- [ ] business area/purpose
- [ ] actors
- [ ] processes
- [ ] capabilities
- [ ] related L2
- [ ] potential L3/L4/L5
- [ ] data entities
- [ ] service categories
- [ ] location relevance
- [ ] external dependencies

## L3 — Capability

For every L3:

- [ ] purpose
- [ ] actors
- [ ] process
- [ ] inputs/outputs
- [ ] actions
- [ ] services
- [ ] agents
- [ ] providers
- [ ] data
- [ ] events
- [ ] workflows
- [ ] integrations
- [ ] related capabilities
- [ ] L4 possibilities
- [ ] L5 possibilities

## L4 — Solution Bundle

For every L4:

- [ ] bundle purpose
- [ ] included capabilities
- [ ] required capabilities
- [ ] optional capabilities
- [ ] shared data
- [ ] shared services
- [ ] workflows
- [ ] providers
- [ ] integrations
- [ ] dependencies
- [ ] cross-domain reuse possibilities
- [ ] child L5 solutions

## L5 — Solution

### Identity / business
- [ ] solutionId
- [ ] version/status
- [ ] name/description
- [ ] business model
- [ ] revenue model
- [ ] target audience
- [ ] use cases
- [ ] customer problems
- [ ] intent/keywords

### Functional
- [ ] features
- [ ] workflows
- [ ] services
- [ ] agents
- [ ] provider interactions
- [ ] admin functions
- [ ] customer functions

### Data
- [ ] logical entities
- [ ] attributes
- [ ] relationships
- [ ] ownership
- [ ] lifecycle
- [ ] sensitivity classification

### Experience
- [ ] page model
- [ ] required sections
- [ ] optional sections
- [ ] navigation
- [ ] responsive/mobile
- [ ] media requirements
- [ ] theme compatibility
- [ ] layout
- [ ] animation level
- [ ] public/native entry
- [ ] SEO
- [ ] related services/providers

### Provider / discovery
- [ ] providerId requirements
- [ ] nickname/handle
- [ ] canonical URL
- [ ] provider type/category
- [ ] locations
- [ ] services
- [ ] contact
- [ ] verification
- [ ] ranking
- [ ] YouTube/external references
- [ ] evidence requirements
- [ ] marketplace status

### Commercial
- [ ] pricing model
- [ ] currency
- [ ] base price
- [ ] price components
- [ ] billing frequency
- [ ] usage pricing
- [ ] tax intent
- [ ] discounts
- [ ] offers
- [ ] eligibility rules
- [ ] credit types
- [ ] credit consumption
- [ ] expiry/top-up
- [ ] payment methods
- [ ] payment modes
- [ ] refund
- [ ] quote rules

### Marketing / sales
- [ ] intent
- [ ] campaign requirements
- [ ] lead
- [ ] qualification
- [ ] chat/conversation
- [ ] chat reference
- [ ] quote reference
- [ ] offer reference
- [ ] follow-up
- [ ] abandoned checkout
- [ ] payment pending
- [ ] onboarding follow-up

### Customer lifecycle
- [ ] order
- [ ] subscription
- [ ] onboarding
- [ ] activation
- [ ] usage
- [ ] support
- [ ] renewal
- [ ] upgrade/downgrade
- [ ] cancellation/expiry
- [ ] post-sale
- [ ] feedback/review

### Support/help desk
- [ ] help centre
- [ ] support search
- [ ] support request
- [ ] ticket
- [ ] ticket detail
- [ ] chat
- [ ] assignment
- [ ] SLA
- [ ] escalation
- [ ] resolution
- [ ] customer feedback

## Selection / My Solution Bag

- [ ] L1 selectable
- [ ] L2 selectable
- [ ] L3 selectable
- [ ] L4 selectable
- [ ] L5 selectable
- [ ] back/forward preserves selection
- [ ] cross-domain selection works
- [ ] L1–L4 do not become checkout items
- [ ] L5 is checkout boundary
- [ ] one L5 supported
- [ ] multiple L5 supported
- [ ] cross-domain L5 composition supported
- [ ] explicit Select All L5 supported
- [ ] My Solution Bag persistent
- [ ] selection separated from purchase

## Design / Theme

- [ ] L5 carries design requirements
- [ ] Experience Manifest generated
- [ ] theme is separate from commercial selection
- [ ] original theme never overwritten
- [ ] edited theme saved as named copy
- [ ] Design Now supported
- [ ] Design Later supported
- [ ] purchased scope is not silently changed by design edits

## Composition

- [ ] Solution Manifest
- [ ] Composition Manifest
- [ ] shared entities
- [ ] shared services
- [ ] shared capabilities
- [ ] integration requirements
- [ ] conflict detection
- [ ] human decision states
- [ ] theme compatibility
- [ ] navigation merge/adaptation
- [ ] deployment requirements

## L6

- [ ] Environment Manifest
- [ ] Runtime Manifest
- [ ] persistence mapping
- [ ] database/NoSQL schema
- [ ] migration
- [ ] seed/reference data
- [ ] indexes/constraints
- [ ] asset manifest
- [ ] asset optimization/storage
- [ ] provider/runtime mapping
- [ ] deployment manifest
- [ ] provider-specific instructions
- [ ] capacity / 5-year planning
- [ ] geography/timezone/currency
- [ ] security/data classification
- [ ] observability
- [ ] backup/recovery
- [ ] certificates/credentials
- [ ] update manifest
- [ ] compatibility
- [ ] checksum/signature
- [ ] rollback
- [ ] CURRENT + previous 3 rollback versions

## M01 JSON/Data

- [ ] Source intake
- [ ] Paste
- [ ] URL
- [ ] File
- [ ] API
- [ ] canonical catalog
- [ ] source provenance
- [ ] mapping UI
- [ ] generated solution JSON
- [ ] validation
- [ ] preview
- [ ] Save New Copy
- [ ] no canonical-source overwrite
- [ ] AI gap detection
- [ ] human approval
- [ ] audit trail

## Coding gate

Every implementation prompt must:

1. Identify the exact layer/module being changed.
2. Inspect existing contracts/components before adding new ones.
3. Reuse existing architecture where applicable.
4. Define affected files.
5. Implement production code only.
6. Run TypeScript/build verification.
7. Report exact verification result.
8. Update the relevant design/checklist document when the contract changes.
9. Commit only the intended changes.
10. STOP after the stage and wait for the next stage.

**Watchdog rule:** Never jump from an incomplete L1–L5 definition directly into L6 implementation. Missing information must be recorded as a gap, not invented.


## Backend Resolution Foundation — 2026-09-19

**Status:** IMPLEMENTED — LOCAL VERIFICATION REQUIRED

Added pure backend services with no UI dependency:

- [x] L5 catalog → L5 solution resolver
- [x] L1-L5 selection policy resolver
- [x] L5-only checkout eligibility resolver
- [x] Solution Bag evaluation
- [x] Multi-L5 composition resolver
- [x] L5 definition structural validator
- [x] L6 environment requirement resolver
- [x] Persistence Manifest resolver
- [x] Asset Manifest resolver
- [x] Central backend service exports

Backend service files:

`src/services/l5SolutionResolver.ts`  
`src/services/selectionResolver.ts`  
`src/services/compositionResolver.ts`  
`src/services/definitionValidator.ts`  
`src/services/environmentResolver.ts`  
`src/services/persistenceResolver.ts`  
`src/services/assetResolver.ts`  
`src/services/index.ts`

**Verification gate:** local `pnpm lint` and `pnpm build` must be run before this stage is marked verified. Physical provider-specific SQL/NoSQL generation and deployment adapters remain L6 implementation work; the provider-neutral manifests and resolution boundary are now established.


## Remaining Backend Foundation — 2026-09-19

**Status:** IMPLEMENTED — LOCAL VERIFICATION REQUIRED

The provider-neutral backend foundation now includes:

- [x] Canonical AAi JSON envelope contract
- [x] Canonical JSON generation/parsing service
- [x] SHA-256 content hashing for generated JSON/artifacts
- [x] Explicit source → target data mapping service
- [x] Provider adapter contract and registry
- [x] PostgreSQL relational schema artifact adapter
- [x] MySQL relational schema artifact adapter
- [x] NoSQL/document persistence-plan adapter
- [x] Asset artifact planning boundary
- [x] Deployment artifact planning boundary
- [x] Release compatibility validation
- [x] Release integrity metadata checks
- [x] Rollback plan generation
- [x] Built-in provider adapter registration

New backend contracts:

`src/contracts/provider.ts`  
`src/contracts/release.ts`  
`src/contracts/json.ts`

New backend services:

`src/services/jsonDefinitionService.ts`  
`src/services/dataMappingService.ts`  
`src/services/providerSql.ts`  
`src/services/providerAdapters.ts`  
`src/services/documentProviderAdapter.ts`  
`src/services/providerAdapterRegistry.ts`  
`src/services/registerBuiltInProviderAdapters.ts`  
`src/services/releaseService.ts`

### Provider boundary rule

AAi core produces provider-neutral manifests. Provider adapters produce deterministic artifacts. Actual credentials, infrastructure provisioning, cloud APIs, SQL execution, CDN uploads, certificate issuance and production deployment remain outside the core definition layer.

### Release boundary rule

Release metadata carries SHA-256, signature, key ID, compatibility and rollback information. Cryptographic signature verification and private-key handling remain in the secure trust/deployment boundary; no private key belongs in the AAi source repository.

**Verification gate:** local `pnpm lint` and `pnpm build` are required before this backend stage is marked verified.
