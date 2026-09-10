/**
 * AAi License Authority Service
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * Contract: LICENSE-AUTHORITY-001
 * Status: ACTIVE
 * Version: 2.0.0
 *
 * Client-side reference authority for the Admin Console. This models the
 * management workflow and persistence boundary. Production issuance/signing
 * must move to the protected AAi License Authority; private keys never live
 * in this browser bundle.
 */

import type {
  AAILicenseKeyRecord,
  AAILicenseRecord,
  LicenseCapacity,
  LicenseClass,
  LicenseEvent,
  LicenseRecipient,
} from '@/src/contracts/license';

const STORAGE_KEY = 'aai-license-authority-v2';
const ISSUER_ID = 'AAI-PLATFORM-AUTHORITY';
const ISSUER_NAME = 'ArchitectAny (AAi)';

const initialLicense: AAILicenseRecord = {
  id: 'LIC-AAI-000001',
  product: 'AAi',
  licenseClass: 'standard',
  version: '1.0.0',
  issuedAt: '2026-09-10T00:00:00Z',
  status: 'active',
  keyId: 'AAi-LICENSE-KEY-01',
  signatureAlgorithm: 'Ed25519',
  payloadIntegrity: 'SHA-256',
  capacity: { applications: 1, components: 1, datastores: 1, users: 100, aiRequests: 1000 },
  runtime: { local: true, hosted: false, catalyst: false, aws: false },
  features: { themes: true, layouts: true, ai: true, federation: false, marketplace: true },
  recipient: {
    organizationId: 'ORG-AAI-REFERENCE',
    organizationName: 'AAi Reference Owner',
    contactName: 'Vijay Kumar K.',
    contactEmail: 'admin@architectany.com',
    country: 'India',
  },
  certification: {
    certificationId: 'CERT-AAI-000001-01',
    certificationVersion: 1,
    certifiedAt: '2026-09-10T00:00:00Z',
    certifiedBy: ISSUER_ID,
    keyId: 'AAi-LICENSE-KEY-01',
    signatureAlgorithm: 'Ed25519',
    payloadIntegrity: 'SHA-256',
    verificationStatus: 'authority-pending',
  },
};

const initialEvents: LicenseEvent[] = [
  { id: 'EVT-AAI-000001', licenseId: initialLicense.id, type: 'created', at: initialLicense.issuedAt, actor: ISSUER_ID },
  { id: 'EVT-AAI-000002', licenseId: initialLicense.id, type: 'issued', at: initialLicense.issuedAt, actor: ISSUER_ID, note: 'Initial AAi reference license.' },
  { id: 'EVT-AAI-000003', licenseId: initialLicense.id, type: 'certified', at: initialLicense.certification.certifiedAt, actor: ISSUER_ID, note: 'Certification record created; production authority signature pending.' },
];

const key: AAILicenseKeyRecord = {
  keyId: 'AAi-LICENSE-KEY-01',
  algorithm: 'Ed25519',
  status: 'active',
  createdAt: '2026-09-10T00:00:00Z',
  activatedAt: '2026-09-10T00:00:00Z',
  publicKeyRef: 'AAi verification key / key registry',
};

type AuthorityState = { licenses: AAILicenseRecord[]; events: LicenseEvent[] };

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function loadState(): AuthorityState {
  if (typeof window === 'undefined') return { licenses: [clone(initialLicense)], events: clone(initialEvents) };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AuthorityState;
  } catch {
    // Fall back to the reference state.
  }
  return { licenses: [clone(initialLicense)], events: clone(initialEvents) };
}

function saveState(state: AuthorityState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function nextId(prefix: string, count: number) {
  return `${prefix}-${String(count + 1).padStart(6, '0')}`;
}

export interface IssueLicenseInput {
  organizationName: string;
  organizationId: string;
  contactName: string;
  contactEmail: string;
  country?: string;
  licenseClass: LicenseClass;
  expiresAt?: string;
  capacity: LicenseCapacity;
}

export const licenseService = {
  issuer: { id: ISSUER_ID, name: ISSUER_NAME },

  getCurrentLicense(): AAILicenseRecord {
    return clone(loadState().licenses[0]);
  },

  getIssuedLicenses(): AAILicenseRecord[] {
    return clone(loadState().licenses);
  },

  getLicense(id: string): AAILicenseRecord | undefined {
    return clone(loadState().licenses.find((license) => license.id === id));
  },

  getEvents(licenseId?: string): LicenseEvent[] {
    const events = loadState().events.filter((event) => !licenseId || event.licenseId === licenseId);
    return clone(events.sort((a, b) => b.at.localeCompare(a.at)));
  },

  getActiveSigningKey(): AAILicenseKeyRecord {
    return clone(key);
  },

  issueLicense(input: IssueLicenseInput): AAILicenseRecord {
    const state = loadState();
    const now = new Date().toISOString();
    const licenseId = nextId('LIC-AAI', state.licenses.length);
    const certificationId = `CERT-${licenseId}-01`;
    const license: AAILicenseRecord = {
      id: licenseId,
      product: 'AAi',
      licenseClass: input.licenseClass,
      version: '1.0.0',
      issuedAt: now,
      expiresAt: input.expiresAt || undefined,
      status: 'issued',
      keyId: key.keyId,
      signatureAlgorithm: 'Ed25519',
      payloadIntegrity: 'SHA-256',
      capacity: clone(input.capacity),
      runtime: { local: true, hosted: false, catalyst: false, aws: false },
      features: { themes: true, layouts: true, ai: true, federation: false, marketplace: true },
      recipient: {
        organizationId: input.organizationId,
        organizationName: input.organizationName,
        contactName: input.contactName,
        contactEmail: input.contactEmail,
        country: input.country,
      },
      certification: {
        certificationId,
        certificationVersion: 1,
        certifiedAt: now,
        certifiedBy: ISSUER_ID,
        keyId: key.keyId,
        signatureAlgorithm: 'Ed25519',
        payloadIntegrity: 'SHA-256',
        verificationStatus: 'authority-pending',
      },
    };
    state.licenses.push(license);
    state.events.push(
      { id: `EVT-${licenseId}-01`, licenseId, type: 'created', at: now, actor: ISSUER_ID },
      { id: `EVT-${licenseId}-02`, licenseId, type: 'issued', at: now, actor: ISSUER_ID, note: `Issued to ${input.organizationName}.` },
    );
    saveState(state);
    return clone(license);
  },

  certifyLicense(id: string): AAILicenseRecord | undefined {
    const state = loadState();
    const license = state.licenses.find((item) => item.id === id);
    if (!license || license.status === 'revoked') return undefined;
    const now = new Date().toISOString();
    license.certification.certificationVersion += 1;
    license.certification.certificationId = `CERT-${license.id}-${String(license.certification.certificationVersion).padStart(2, '0')}`;
    license.certification.certifiedAt = now;
    license.certification.certifiedBy = ISSUER_ID;
    license.certification.keyId = key.keyId;
    license.certification.verificationStatus = 'authority-pending';
    license.status = 'active';
    state.events.push({ id: `EVT-${license.id}-${state.events.length + 1}`, licenseId: license.id, type: 'certified', at: now, actor: ISSUER_ID, note: `Re-certified as ${license.certification.certificationId}.` });
    saveState(state);
    return clone(license);
  },

  setStatus(id: string, status: AAILicenseRecord['status']): AAILicenseRecord | undefined {
    const state = loadState();
    const license = state.licenses.find((item) => item.id === id);
    if (!license) return undefined;
    const now = new Date().toISOString();
    license.status = status;
    const type = status === 'suspended' ? 'suspended' : status === 'active' ? 'reactivated' : status === 'revoked' ? 'revoked' : 'capacity-updated';
    state.events.push({ id: `EVT-${license.id}-${state.events.length + 1}`, licenseId: license.id, type, at: now, actor: ISSUER_ID });
    saveState(state);
    return clone(license);
  },

  updateCapacity(id: string, capacity: LicenseCapacity): AAILicenseRecord | undefined {
    const state = loadState();
    const license = state.licenses.find((item) => item.id === id);
    if (!license) return undefined;
    const now = new Date().toISOString();
    license.capacity = clone(capacity);
    state.events.push({ id: `EVT-${license.id}-${state.events.length + 1}`, licenseId: license.id, type: 'capacity-updated', at: now, actor: ISSUER_ID });
    saveState(state);
    return clone(license);
  },
};
