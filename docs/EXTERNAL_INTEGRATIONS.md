# External DPI Integrations — APAAR-Setu

APAAR-Setu is designed to interface with five major Digital Public Infrastructure (DPI) platforms:

## 1. Ministry of Education — Academic Bank of Credits (ABC) & DigiLocker NAD
- **Protocol**: REST / OAuth 2.0 with Mutual TLS
- **Endpoint**: `/api/v2/apaar/verify`
- **Function**: Validates 12-digit numeric APAAR IDs, verifies Verhoeff checksums, and confirms demographic alignment (Name, DOB, Gender).

## 2. Ministry of External Affairs & MHA — e-FRRO & OCI Portals
- **Protocol**: Government API Gateway (GAG)
- **Function**: Validates Study in India (SII) candidate IDs, e-FRRO student visa validity, and Overseas Citizen of India (OCI) card formats (`^[A-Z][0-9]{7}$`).

## 3. AICTE National Approval Bureau — Extension of Approval (EoA) ERP Bridge
- **Protocol**: gRPC / High-Throughput REST
- **Function**: Pulls official sanctioned intake, TFW quota approval, NRI quota authorization, and supernumerary caps.

## 4. UGC AISHE & National Scholarship Portal (NSP) Central Ledger
- **Protocol**: Event-Driven Webhook / Kafka
- **Function**: Cross-checks student enrolment against UGC universities and national direct benefit transfer (DBT) scholarship programs to prevent dual-enrolment fraud.

## 5. Controller of Certifying Authorities (CCA) eSign PKI
- **Protocol**: Ed25519 / X.509 Hardware Security Module (HSM)
- **Function**: Digitally signs dual-identity degree credentials and generates W3C-compliant QR verification payloads.
