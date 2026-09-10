/**
 * AAi License Contract
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: LICENSE-CONTRACT-002 — License Authority & Certification
 * Status: ACTIVE
 * Version: 2.0.0
 *
 * Application-level licensing. The AAi authority signs licenses; customer
 * runtimes only receive the signed license/public verification material.
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

export type LicenseEventType =
  | 'created'
  | 'issued'
  | 'registered'
  | 'certified'
  | 'renewed'
  | 'suspended'
  | 'reactivated'
  | 'revoked'
  | 'capacity-updated';

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

export interface LicenseRecipient {
  organizationId: string;
  organizationName: string;
  contactName: string;
  contactEmail: string;
  country?: string;
  environmentId?: string;
}

export interface LicenseCertification {
  certificationId: string;
  certificationVersion: number;
  certifiedAt: string;
  certifiedBy: string;
  keyId: string;
  signatureAlgorithm: 'Ed25519';
  payloadIntegrity: 'SHA-256';
  verificationStatus: 'authority-pending' | 'verified';
}

export interface LicenseEvent {
  id: string;
  licenseId: string;
  type: LicenseEventType;
  at: string;
  actor: string;
  note?: string;
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
  recipient: LicenseRecipient;
  certification: LicenseCertification;
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
