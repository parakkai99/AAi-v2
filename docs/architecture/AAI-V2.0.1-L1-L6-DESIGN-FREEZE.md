# AAi-V2.0.1 — L1→L6 Solution Architecture Design Freeze

**Status:** FROZEN FOR IMPLEMENTATION  
**Freeze date:** 2026-09-19  
**Scope:** L1 Domain → L2 Subdomain → L3 Capability → L4 Solution Bundle → L5 Solution → L6 Execution / Environment  
**Purpose:** Canonical design boundary for the next implementation phase.

## 1. Layer boundary

- **L1 Domain:** business world / major opportunity area.
- **L2 Subdomain:** business area within the domain.
- **L3 Capability:** concrete business capability.
- **L4 Solution Bundle:** grouped solution possibility.
- **L5 Solution:** concrete selectable, marketable and checkout-eligible solution.
- **L6 Execution:** environment, runtime, persistence, assets, deployment, operations, update and rollback.

L1–L4 define the possibility space. L5 is the executable/commercial selection boundary. L6 turns the selected solution set into a real running system.

## 2. Selection and checkout rule

Users may select or tick at any level L1–L5 and may move backward/forward across domains without losing selection state.

L1–L4 selections are exploratory/compositional and are **never directly checkout eligible**.

Checkout requires one or more concrete L5 solutions.

Supported L5 selection patterns:

- one L5 solution;
- multiple L5 solutions in the same domain;
- multiple L5 solutions across domains;
- all available L5 solutions under a selected branch.

Selecting an L1–L4 item must not silently select all descendants. The UI may offer descendant exploration or explicit Select All L5.

## 3. My Solution Bag

**My Solution Bag** is the persistent user-facing selection container.

Selection is not purchase.

The bag can contain:

DISCOVERED → VIEWED → SELECTED → SHORTLISTED → COMPOSED → CONFIGURED → DESIGNING → CHECKOUT_READY → PURCHASED/APPROVED → DEPLOYMENT_READY → DEPLOYED.

The bag must survive navigation, back/forward, domain changes and return to previous branches.

## 4. Composition

Multiple L5 solutions create a Composition Manifest.

The composition records:

- selected solutions;
- primary/supporting roles;
- shared capabilities;
- shared data/entities;
- shared services;
- integration requirements;
- conflicts;
- theme;
- navigation;
- experience;
- deployment requirements.

L6 resolves each requirement as:

REUSE | INSTALL | EXTEND | MODIFY | ADAPT | CONFIGURE | CONNECT | CONFLICT.

Conflicts require explicit resolution/human decision. No silent merging.

## 5. Experience and design

Every L5 solution definition must contain its required experience/design information before implementation begins.

At minimum:

- page model;
- mobile-first requirement;
- required/optional sections;
- navigation;
- media requirements;
- theme compatibility/override;
- layout;
- animation level;
- responsive behavior;
- public/native entry behavior;
- SEO/public discovery requirements.

An Experience Manifest is generated from the selected L5 set. Multiple solutions merge shared requirements, add new requirements, adapt conflicts and flag unsupported requirements.

Design may happen before checkout or after checkout using **Design Later**. Design changes do not silently change purchased solution scope.

## 6. L5 commercial model

L5 is a complete commercial/customer lifecycle definition.

It must be able to declare:

### Pricing
- pricing model;
- currency;
- base price;
- price components;
- billing frequency;
- minimum commitment;
- usage pricing;
- tax intent.

### Discounts
- percentage/fixed/volume/early-purchase/loyalty/coupon/promotional rules;
- eligibility;
- validity.

### Offers
- offer identity;
- offer type;
- validity;
- eligibility;
- benefits;
- offer pricing.

### Credits
- credit type;
- unit;
- included quantity;
- consumption rules;
- expiry;
- top-up.

### Payment
- payment required;
- supported method classes;
- full/partial/installment/subscription/milestone modes;
- refund and partial-refund support.

### Quotes
- quote support;
- conditions requiring quote;
- quote validity;
- approval requirement.

### Marketing and intent
- customer intent;
- use cases;
- customer problems;
- audience;
- keywords;
- campaigns/offers.

### Conversation
- chat/conversation channels;
- intent reference;
- chat reference;
- customer/contact reference;
- quote reference;
- source/provenance.

### Sales and follow-up
- lead;
- qualification;
- engagement;
- quote;
- offer;
- checkout;
- abandoned checkout;
- payment pending;
- onboarding;
- renewal;
- support and other follow-up triggers.

## 7. Customer lifecycle

The canonical lifecycle is:

DISCOVER → INTENT → QUALIFY → ENGAGE → CHAT/CONTACT → QUOTE → OFFER → CHECKOUT → PAYMENT → ORDER/SUBSCRIPTION → ONBOARDING → ACTIVATION → USAGE → SUPPORT → FOLLOW-UP → RENEWAL/UPGRADE → CANCELLATION/EXPIRY → POST-SALE/FEEDBACK.

The L5 definition must declare which lifecycle capabilities apply.

## 8. Support / Help Desk

Where applicable, L5 must define support requirements for:

- help centre;
- search/help topics;
- support request creation;
- tickets;
- ticket categories/priorities;
- attachments;
- conversation;
- assignment;
- SLA;
- escalation;
- resolution;
- customer feedback;
- support chat.

Typical customer support surfaces:

1. Help & Support
2. My Requests
3. Create Support Request
4. Ticket Detail
5. Chat with Support
6. Knowledge/Help Centre

## 9. Renewal and post-sale

Where applicable, L5 must define:

- subscription/term;
- renewal date;
- renewal pricing;
- upgrade/downgrade;
- additional credits;
- renewal reminders;
- cancellation;
- expiry;
- post-sale communication;
- feedback/review;
- customer success/follow-up.

## 10. Provider / professional identity

Provider data is persistent and reusable.

Provider records must support:

- providerId;
- unique public nickname/handle;
- canonical URL;
- provider type/category;
- services;
- locations;
- contact;
- verification status;
- ranking;
- SEO;
- assets;
- YouTube/channel/video references;
- external references;
- discovery evidence;
- marketplace status.

A YouTube video/channel is evidence/reference; it is not automatically the provider identity.

## 11. Discovery and evidence

AAi Local Discovery Fabric follows:

USER INTENT → DISCOVERY PLAN → SOURCE ADAPTERS → RAW EVIDENCE → ENTITY EXTRACTION → ENTITY RESOLUTION → EVIDENCE GRAPH → PROVIDER/SERVICE/OFFER CANDIDATE → VERIFY → INVITE/REGISTER → MARKETPLACE.

Evidence types include:

SKILL, BUSINESS, IDENTITY, LOCATION, CONTACT, PRICE, AVAILABILITY, FRESHNESS, PORTFOLIO, SOCIAL, EXTERNAL_REFERENCE.

AAi must preserve source URL, observed time and provenance. It must not invent missing facts.

## 12. Persistence

JSON is the portable AAi definition/configuration layer.

Persistent runtime data requires a persistence mapping.

L6 produces a Persistence Manifest containing:

- logical entities;
- fields;
- relationships;
- ownership;
- lifecycle;
- sensitivity;
- indexes;
- constraints;
- views/triggers where applicable;
- migrations;
- seed/reference data;
- rollback artifacts.

The target implementation may be PostgreSQL, MySQL, NoSQL, Catalyst or another supported provider.

## 13. Assets

An Asset Manifest must cover:

- assetId;
- type;
- owner;
- source/original reference;
- file metadata;
- optimization;
- storage;
- public/private state;
- retention;
- variants;
- CDN;
- backup/restore;
- versioning.

External video such as YouTube remains external unless a specific authorized ingestion requirement exists.

## 14. L6 deployment and operations

L6 resolves:

- environment;
- runtime;
- database;
- object storage;
- authentication;
- event infrastructure;
- search/maps/notifications/payments;
- integrations;
- assets;
- provider data;
- capacity;
- geography;
- security;
- observability;
- backup/recovery;
- certificates;
- credentials;
- deployment;
- verification;
- rollback;
- update.

Provider-specific deployment documentation must be generated for the target environment.

## 15. Release/update/rollback

AAi-LIVE is the control/release plane.

Client runtime is separate from the control plane.

Release metadata must support:

- releaseId;
- runtimeVersion;
- packageVersion;
- compatibility;
- checksum;
- signature;
- keyId;
- issuedAt;
- expiresAt;
- rollback support.

Client retention target is CURRENT + previous 3 rollback-capable versions.

## 16. Data intake and generation

M01 JSON/Data evolves from a simple textarea into:

SOURCE → MAP → GENERATE → VALIDATE → PREVIEW → SAVE NEW COPY.

Supported source concepts:

- Paste;
- URL;
- File;
- API;
- canonical AAi catalog.

Canonical source data is read-only. Generated solution data is saved as a new copy.

AI may classify, expand, map and identify gaps, but must not invent unsupported facts. Human approval remains required for uncertain mappings and publication.

## 17. Publication boundary

Draft → Validate → Review → Approve → Release → Live.

Audit records source, AI involvement, user changes, timestamps and published version.

## 18. Frozen implementation principles

- Production-first.
- Inspect existing architecture before modifying.
- Do not duplicate existing contracts unnecessarily.
- Keep reusable framework code domain-neutral.
- Keep project-specific identity in configuration/data.
- Preserve original theme definitions; edited themes are named copies.
- Do not silently overwrite canonical source data.
- Do not silently merge conflicting solution requirements.
- Keep L5 requirements explicit so L6 does not need to infer business intent.
