# Technical Stack & Architecture — APAAR-Setu

## 1. High-Level Architectural Pattern
APAAR-Setu utilizes a modern microservice-ready modular architecture:
- **Presentation Tier**: React 19 + TypeScript SPA built with Vite and Tailwind CSS. Conforms strictly to Guidelines for Indian Government Websites (GIGW 3.0).
- **Core API & Application Tier**: Python FastAPI + Pydantic v2. Provides sub-millisecond statutory validation and asynchronous event logging.
- **Rules & Deduplication Engine**: Deterministic Python pipeline enforcing the 10 statutory AICTE APH rules and fuzzy demographic sequence matching.
- **Cryptographic Trust Tier**: SHA-256 Merkle Audit Ledger and Ed25519/HMAC-SHA256 Verifiable Credential QR generation.
- **External DPI Integration Layer**: Standardized plug-and-play adapter layer supporting `SANDBOX_MOCK` and `PRODUCTION_GOV` operational modes.

## 2. Technology Stack Matrix

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Frontend UI | React + TypeScript + Vite | 19.x / 6.x | High-density GIGW 3.0 Government Dashboard |
| Styling | Tailwind CSS | 4.x | High-performance CSS framework with custom AICTE colorway |
| State Management | React Context + Store | - | Centralized reactive store with localStorage & offline fallback |
| Icons | Lucide React | 1.x | Clean government iconography |
| Backend Core | Python FastAPI | 0.110+ | High-throughput async REST API with OpenAPI Swagger |
| Validation | Pydantic | 2.x | Strict data validation and schema enforcement |
| Cryptography | PyCryptodome / Hashlib | 3.x | SHA-256 audit ledger, Verhoeff checksum & Ed25519 signatures |
| Containerization | Docker & Compose | - | Isolated multi-container reproducible environment |

## 3. Security Architecture
- **DPDP Act 2023 Compliance**: Zero unmasked student transcript sharing without an active 24-hour consent token.
- **Tamper-Evident Ledger**: Every event is hashed with the previous block's digest to create an unbroken cryptographic audit trail.
- **Cross-Origin Security**: Restrictive CORS headers with granular token validation.
