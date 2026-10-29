# Implementation Roadmap — 3 Milestones, 15 Steps

## Milestone 1: Foundation & Data Infrastructure (Steps 1–5)
- **Step 1**: Monorepo scaffolding, Docker configurations, and `.env.example`.
- **Step 2**: Plug-and-play External DPI Adapter Layer (`dpi_adapters.py`) with `SANDBOX_MOCK` and `PRODUCTION_GOV` modes.
- **Step 3**: 10 Statutory AICTE Rules Engine (`rules_engine.py`) with 5-bucket quota allocator.
- **Step 4**: Pre-seeded database with 4 realistic AICTE colleges and 35+ baseline students.
- **Step 5**: Immutable SHA-256 Merkle Audit Ledger (`audit_ledger.py`).

## Milestone 2: Government Portal & Role Dashboards (Steps 6–10)
- **Step 6**: React 19 + TypeScript + Tailwind CSS GIGW 3.0 government shell.
- **Step 7**: Top Government Accessibility Bar with working font resizers and DPI Adapter Inspector Modal.
- **Step 8**: Persistent 5-Role Switcher and SIH Demo Scenario Quick-Trigger Bar.
- **Step 9**: Institution Registrar Portal (`/institution`) with 3-way ingestion and filterable roster.
- **Step 10**: AICTE Regional & National Compliance Command (`/aicte-command`) with duplicate locks and AI radar.

## Milestone 3: Analytics, Verification & Credential Studio (Steps 11–15)
- **Step 11**: Policy, Accreditation (NBA/NIRF) & AISHE Analytics Hub (`/analytics`) with working CSV exporters.
- **Step 12**: AI Policy Copilot with natural language inquiry processing.
- **Step 13**: Dual-ID Certificate Studio & Employer QR Verifier (`/verify`).
- **Step 14**: Student Academic Identity & DPDP Act 2023 Consent Wallet (`/student-wallet`).
- **Step 15**: End-to-end self-verification, testing, and production build readiness.
