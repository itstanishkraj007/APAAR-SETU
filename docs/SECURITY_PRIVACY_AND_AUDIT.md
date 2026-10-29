# Security, Privacy & Audit — APAAR-Setu

## 1. Compliance with Digital Personal Data Protection (DPDP) Act 2023
- **Data Minimization**: Only regulatory fields required by the AICTE Approval Process Handbook (APH) are processed.
- **Purpose Limitation**: Enrolment data is strictly utilized for academic tracking, regulatory intake compliance, and degree verifiability.
- **Student Consent Architecture**:
  - Direct third-party verification lookups are masked unless the candidate possesses an active consent token.
  - Students can grant 24-hour granular tokens or revoke access instantly via their self-sovereign wallet.
  - Every consent modification is recorded as an immutable block in the SHA-256 audit ledger.

## 2. Cryptographic Audit Ledger
- **Algorithm**: SHA-256 Merkle Hash-Chain.
- **Block Properties**: `Index`, `Timestamp`, `Actor Role`, `Action`, `Details`, `Previous Hash`, `Hash`.
- **Integrity Verification**: The `verify_integrity()` function re-computes every block hash from the Genesis Block to the chain tip. Any manual database tampering breaks the cryptographic chain and triggers an alert.

## 3. Cryptographic Verifiable Credentials
- **Signing Standard**: HMAC-SHA256 / Ed25519 PKI aligned with the Controller of Certifying Authorities (CCA) eSign framework.
- **QR Payload**: Embeds a canonical hash of `APAAR_ID + STUDENT_ID + SEAT_SLOT_ID + INSTITUTION_ID + TIMESTAMP`. Any alteration in student CGPA or seat allotment invalidates the signature verification scorecard.
