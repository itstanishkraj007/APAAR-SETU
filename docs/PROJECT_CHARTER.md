# Project Charter — APAAR-Setu

## 1. SIH Project Identity
- **Event**: Smart India Hackathon 2026 (SIH 2026)
- **Problem Statement ID**: `26063`
- **Ministry / Organization**: All India Council for Technical Education (AICTE), Ministry of Education, Government of India
- **Problem Statement Title**: "Integrated APAAR-based Student Data Management and Verification System"
- **Project Name**: **APAAR-Setu (अपार सेतु)**
- **Theme**: Smart Education / Digital Governance / National Academic Depository
- **Category**: Software (Enterprise Full-Stack)

## 2. Problem Being Addressed
AICTE currently receives student-related information through disparate submission mechanisms. While PGDM institutions provide granular student data annually, other AICTE-approved institutions primarily provide statistical counts during the annual Approval Process Handbook (APH) approval cycle.

Key systemic failures:
1. **Seat Ghosting & Excess Enrolment**: Rogue colleges admitting students beyond approved intake.
2. **Cross-Institutional Double Admission**: Students simultaneously blocking seats in two full-time colleges without detection.
3. **Absence of Unified Academic Identity**: Lack of connection between institutional roll numbers and the 12-digit national APAAR ID.
4. **Credential Tampering**: Degrees issued without verifiable proof that the student occupied a sanctioned seat slot.

## 3. Product Vision
APAAR-Setu establishes an authoritative national student lifecycle ecosystem using the Automated Permanent Academic Account Registry (APAAR ID). It provides a real-time statutory rules engine, 5-bucket seat-slot allocation, cross-institution duplicate locking, an immutable SHA-256 audit ledger, and dual-ID verifiable degrees compliant with the DPDP Act 2023.

## 4. Key Deliverables
- Dual dashboards for AICTE Apex Council and Approved Institutions.
- Plug-and-play External DPI Adapter Layer (DigiLocker NAD, MHA e-FRRO, MEA OCI, Samarth ERP).
- 5-Bucket Statutory Seat Allocator (Regular, NRI, TFW 5%, FN/OCI 15%, PMSSS).
- Cross-Institution Duplicate Lock with AI demographic fingerprinting.
- Public & Employer Verification Portal with 5-point cryptographic scorecard.
- DPDP Act 2023 Student Consent Wallet.
- Dual-ID Degree Certificate Studio embedding APAAR ID + Student Roll ID + QR code.
