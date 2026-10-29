# Master Prompt — APAAR-Setu Project Context

You are the senior engineer building APAAR-Setu for Smart India Hackathon 2026, Problem Statement 26063: "Integrated APAAR-based Student Data Management and Verification System".

Before editing code, read:
- `README.md`
- all relevant documents under `docs/`
- the prompt for the current step

## Product Vision
Build an authoritative national student lifecycle ecosystem using the Automated Permanent Academic Account Registry (APAAR ID). The system validates 12-digit APAARs, manages 5 statutory seat quota buckets, prevents cross-college duplicate enrolments in real time, provides high-density government dashboards for institutions and regulators, maintains an immutable SHA-256 audit ledger, and generates W3C verifiable degree credentials with dual identifiers (National APAAR ID + Institutional Student Roll ID).

## Core Stack
- Frontend: React 19 + TypeScript + Vite + Tailwind CSS (GIGW 3.0 Government Design System)
- Backend: Python FastAPI + Pydantic v2 + Statutory Rules Engine
- Trust Tier: SHA-256 Merkle Audit Ledger + CCA Ed25519 PKI
- DPI Adapters: DigiLocker NAD, MHA e-FRRO, MEA OCI, Samarth ERP, UGC AISHE

## Non-Negotiable Rules
1. Zero dead buttons or placeholders. Every UI action must be wired to real state mutations or API calls.
2. Official AICTE / GIGW 3.0 design aesthetic: Tricolor top strip, AICTE Navy Blue (`#0B2240`), Saffron Gold (`#D97706`), clean high-density tables.
3. Persistent 5-Role Switcher and SIH Demo Scenario quick-triggers available at all times.
4. Support both `SANDBOX_MOCK` and `PRODUCTION_GOV` DPI adapter modes.
5. Strict adherence to DPDP Act 2023 purpose limitation and consent architecture.
