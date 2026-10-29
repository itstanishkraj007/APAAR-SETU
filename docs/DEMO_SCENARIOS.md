# SIH 2026 Evaluation Demo Scenarios — APAAR-Setu

This document outlines the six repeatable demo scenarios accessible via the top-right **SIH Demo Scenarios** dropdown.

## Scenario 1: Clean Batch Admission Sync (MAIT Delhi)
- **Role**: Role 1 (Institution Registrar)
- **Institution**: Maharaja Agrasen Institute of Technology (MAIT), Delhi
- **Action**: Demonstrates clean compliance. 12-digit APAAR IDs verified via DigiLocker NAD. Seats allocated into Regular Merit (`NWRO-1-4519-2026-REG-001`), Supernumerary TFW 5% (`NWRO-1-4519-2026-TFW-001`), and Study in India Foreign National buckets.

## Scenario 2: Cross-College Duplicate APAAR Lock
- **Role**: Role 2 (AICTE Compliance RO/HQ)
- **Institution**: Horizon College of Engineering, Pune vs. MAIT Delhi
- **Action**: Student Aarav Sharma (APAAR `482910398472`) is already actively enrolled in MAIT Delhi. Horizon Pune attempts to enroll him. The system locks the secondary attempt with `CROSS_INSTITUTE_DUPLICATE_LOCK`. The compliance officer views side-by-side evidence and clicks "Cancel Conflicting Seat & Notify RO".

## Scenario 3: Excess Admission Intake Breach (Seat 61 of 60)
- **Role**: Role 2 (AICTE Compliance RO/HQ)
- **Institution**: Apex Institute of Management (PGDM), Mumbai
- **Action**: Apex PGDM possesses approved intake of 60 students. Submitting candidate 61 triggers immediate statutory quarantine as `BLOCKED_EXCESS_INTAKE`. The compliance officer clicks "Issue Show-Cause Notice" to generate statutory memo `AICTE/LEGAL/SCN/2026/1-882341902`.

## Scenario 4: Unapproved NRI Quota Violation
- **Role**: Role 1 (Institution Registrar)
- **Institution**: Apex Institute of Management (PGDM), Mumbai
- **Action**: Apex PGDM attempts to enroll student Sameer Merchant under NRI quota. Since Apex has `eoa_nri_approved == False`, the system automatically flags `UNAPPROVED_NRI_BREACH` and quarantines the admission.

## Scenario 5: Foreign National (SII) & Provisional APAAR
- **Role**: Role 1 (Institution Registrar)
- **Institution**: MAIT Delhi
- **Action**: Foreign student Bikash Shrestha (Nepal) arrives via Study in India without an Indian domestic Aadhaar. The international bridge validates his passport and e-FRRO visa, assigning a cryptographically bound `APAAR-FN-2026-E8A1`.

## Scenario 6: Dual-ID Certificate & DPDP Consent Verification
- **Role**: Role 4 (Authorized Verifier) & Role 5 (Student Wallet)
- **Action**: Employer searches APAAR `482910398472` and inspects the 5-point trust scorecard. Displays the official Dual-ID Degree Certificate with APAAR ID + Student Roll ID + Seat Slot ID. In Role 5, student revokes consent, instantly masking academic standing on the verifier console.
