/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Compatibility Type Barrel
 * Canonical catalog model: src/contracts/catalog.ts
 *
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * NOTE:
 * Legacy Universe interfaces (Domain, Subdomain, Capability, Solution,
 * UniverseCatalogPayload, IUniverseRepository) have been retired.
 * AAi now uses the canonical contract-based catalog model.
 */

export * from './contracts/intent';
export * from './contracts/location';
export * from './contracts/language';
export * from './contracts/user';
export * from './contracts/auth';
export * from './contracts/service';
export * from './contracts/api';
export * from './contracts/catalog';
export * from './contracts/platformAdapter';