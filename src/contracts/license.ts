/**
 * AAi License Contract
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: LICENSE-CONTRACT-001 — Signed Capability License
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * License signing is application-level. It is intentionally separate from
 * public web certificates. Secrets/private keys never belong in this contract.
 */

export type LicenseStatus =
  | 'draft'
  | 'issued'
  | 'registered'
  | 'active'
  | 'suspended'
  | 'expired'
  | 'revoked';

export type LicenseClass = 'standard' | 'professional' | 'enterprise';

export interface LicenseCapacity {
  applications: number;
  components: number;
  datastores: number;
  users: number;
  aiRequests: number;
}

export interface LicenseRuntime {
  local: boolean;
  hosted: boolean;
  catalyst: boolean;
  aws: boolean;
}

export interface LicenseFeatures {
  themes: boolean;
  layouts: boolean;
  ai: boolean;
  federation: boolean;
  marketplace: boolean;
}

export interface AAILicenseRecord {
  id: string;
  product: 'AAi';
  licenseClass: LicenseClass;
  version: string;
  issuedAt: string;
  expiresAt?: string;
  status: LicenseStatus;
  keyId: string;
  signatureAlgorithm: 'Ed25519';
  payloadIntegrity: 'SHA-256';
  capacity: LicenseCapacity;
  runtime: LicenseRuntime;
  features: LicenseFeatures;
  registeredEnvironment?: string;
}

export interface AAILicenseKeyRecord {
  keyId: string;
  algorithm: 'Ed25519';
  status: 'active' | 'rotating' | 'retired' | 'revoked';
  createdAt: string;
  activatedAt?: string;
  retiredAt?: string;
  publicKeyRef: string;
}
