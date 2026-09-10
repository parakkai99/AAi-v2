# AAi License Authority Management

**Architect:** Vijay Kumar K.  
**Platform:** ArchitectAny (AAi)  
**Contract:** LICENSE-AUTHORITY-MANAGEMENT-001  
**Status:** ACTIVE  
**Version:** 1.0.0

## Authority model

AAi is the platform owner and license issuer. A purchaser / customer organization receives a signed capability license. The customer owns its application, content, data, users and business information.

```text
AAi Platform Authority
        |
        +--> Issue License
        |       |
        |       +--> Purchaser / Organization
        |       +--> Entitlements / Capacity
        |       +--> Runtime Permissions
        |       +--> Feature Permissions
        |       +--> Certification Record
        |
        +--> Register
        +--> Certify / Re-certify
        +--> Activate
        +--> Suspend
        +--> Revoke
        +--> Audit
```

## License register

The Admin Console maintains an issued-license register containing:

- License ID
- Purchaser / organization
- Organization ID
- Authorized contact
- Contact email
- Country
- License class
- Issued date
- Expiry date
- Entitlements / capacity
- Runtime permissions
- Feature permissions
- Signing key ID
- Certification ID/version
- Current status
- Lifecycle/audit events

## Lifecycle

```text
DRAFT
  -> ISSUED
  -> REGISTERED
  -> ACTIVE
  -> SUSPENDED
  -> ACTIVE
  -> EXPIRED
  -> REVOKED
```

Certification is independent audit/version information attached to the license:

```text
License
  -> Certification v1
  -> Re-certify
  -> Certification v2
  -> Re-certify
  -> Certification v3 ...
```

## Capacity

Capacity is entitlement, not customer data. Current reference fields are:

- applications
- components
- datastores
- users
- AI requests

Changing capacity creates an audit event. A production implementation must also enforce capacity reservation/release through the AAi License Authority and ledger.

## Cryptographic boundary

The selected license signature model is Ed25519 with SHA-256 payload integrity metadata. The browser Admin Console must never contain or expose the private signing key. Production signing belongs to the protected AAi License Authority. This is consistent with established software-license patterns where the issuer signs entitlement data and the runtime verifies it using public verification material. citeturn0search0turn0search3

The current browser implementation is a **management/reference layer**. Its certification record uses `authority-pending` until the protected authority performs the actual cryptographic signing.

## Future authority boundary

```text
Admin Console
    |
    v
AAi License Authority
    |
    +-- License Registry
    +-- Capacity Ledger
    +-- Signing Key Registry
    +-- Signature Service
    +-- Registration Service
    +-- Lifecycle Service
    +-- Audit Ledger
    |
    v
Signed License Envelope
    |
    v
Customer Runtime / Offline Verifier
```

The private key must remain inside the protected signing boundary; only public verification material is distributed to customer runtimes. This is also the pattern used by established license-management systems for offline verification. citeturn0search0turn0search2
