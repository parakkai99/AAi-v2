/**
 * AAi License Service
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: LICENSE-SERVICE-001
 * Status: ACTIVE
 * Version: 1.0.0
 *
 * Local reference service for the Admin Console. Production signing will be
 * performed by the AAi License Authority; the private signing key is never
 * stored in the client application.
 */

import type { AAILicenseKeyRecord, AAILicenseRecord } from '@/src/contracts/license';

const license: AAILicenseRecord = {
  id: 'LIC-AAI-000001',
  product: 'AAi',
  licenseClass: 'standard',
  version: '1.0.0',
  issuedAt: '2026-09-10T00:00:00Z',
  status: 'active',
  keyId: 'AAi-LICENSE-KEY-01',
  signatureAlgorithm: 'Ed25519',
  payloadIntegrity: 'SHA-256',
  capacity: {
    applications: 1,
    components: 1,
    datastores: 1,
    users: 100,
    aiRequests: 1000,
  },
  runtime: {
    local: true,
    hosted: false,
    catalyst: false,
    aws: false,
  },
  features: {
    themes: true,
    layouts: true,
    ai: true,
    federation: false,
    marketplace: true,
  },
};

const key: AAILicenseKeyRecord = {
  keyId: 'AAi-LICENSE-KEY-01',
  algorithm: 'Ed25519',
  status: 'active',
  createdAt: '2026-09-10T00:00:00Z',
  activatedAt: '2026-09-10T00:00:00Z',
  publicKeyRef: 'AAi verification key / key registry',
};

export const licenseService = {
  getCurrentLicense(): AAILicenseRecord {
    return { ...license, capacity: { ...license.capacity }, runtime: { ...license.runtime }, features: { ...license.features } };
  },

  getActiveSigningKey(): AAILicenseKeyRecord {
    return { ...key };
  },
};
