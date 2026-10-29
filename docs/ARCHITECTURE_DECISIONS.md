# Architecture Decision Records (ADRs) — APAAR-Setu

## ADR 01: Dual-Identity Binding Architecture (Key Requirement #10)
- **Context**: Degree certificates traditionally print only university roll numbers, making cross-institutional tracking and national credit verification difficult.
- **Decision**: The system mandates and cryptographically binds two identifiers on every credential: (1) National APAAR ID (12-digit permanent academic identity), and (2) Institutional Student Roll ID, linked together via an AICTE Sanctioned Seat Slot ID.
- **Status**: Approved.

## ADR 02: 5-Bucket Statutory Seat-Slot Allocation
- **Context**: Colleges admit students into disparate quotas (Merit, TFW, EWS, NRI, FN/OCI, PMSSS) without systematic ceiling enforcement.
- **Decision**: Implement a 5-bucket statutory allocator where regular and NRI seats count towards approved intake, while TFW (5%), FN/OCI (15%), and PMSSS seats are strictly tracked as supernumerary over and above.
- **Status**: Approved.

## ADR 03: Provisional Foreign APAAR Bridge
- **Context**: Foreign Nationals and arriving OCI students are exempt from domestic Aadhaar's 182-day residency rule, causing deadlock when entering technical colleges in India.
- **Decision**: Validate international students against Study in India (SII) IDs and MHA e-FRRO visas, generating a cryptographically bound `APAAR-FN-2026-XXXX` provisional identifier.
- **Status**: Approved.

## ADR 04: DPDP Act 2023 Consent Gate
- **Context**: Unrestricted public access to student marks or academic standing violates Section 6 of the DPDP Act 2023.
- **Decision**: Implement self-sovereign student consent tokens. Third-party verifiers receive masked profiles unless the student actively approves a 24-hour verification token.
- **Status**: Approved.
