# Acceptance Criteria — APAAR-Setu

## Criterion 1: Zero Dead Clicks & 100% Functional UI
- Every button, tab, dropdown, filter, and export button in the UI performs a state mutation or real API action.
- No `alert("Coming soon")` or placeholder stub logic.

## Criterion 2: 10 Statutory Rules Engine
- Enforces 12-digit APAAR format and Verhoeff checksum.
- Implements 5 statutory quota buckets derived from official AICTE EoA.
- Automatically quarantines admissions once a bucket ceiling is breached.
- Detects cross-institutional duplicate enrolments across all colleges in India.

## Criterion 3: Dual-ID Certificate Mandate (Key Requirement #10)
- Degree certificate visibly displays both the National APAAR ID and the Institutional Student Roll ID.
- Embeds assigned AICTE Sanctioned Seat Slot ID and W3C Verifiable Credential QR.

## Criterion 4: DPDP Act 2023 Compliance
- Unmasked student academic details require an active student consent token.
- Student can grant or revoke consent in real time with an immutable audit record.

## Criterion 5: Five Official Operational Roles
- 1-click persistent role switcher seamlessly shifts between Institution Registrar, Compliance Officer, Policy Analyst, Employer Verifier, and Student Wallet.
