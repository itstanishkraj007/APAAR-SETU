# Regulatory Rules Register — AICTE Approval Process Handbook (APH)

This register codifies the statutory regulations governing technical admissions in India, mapped to automated rules in `backend/app/rules_engine.py`.

## Rule Register

| Rule ID | Statutory Reference | Description | Automated System Action |
|---|---|---|---|
| `RULE_1_APAAR` | NEP 2020 Para 4.1 & DigiLocker NAD Mandate | 12-digit numeric APAAR required for all domestic students. Validated via Verhoeff checksum. | Block upload if format/checksum fails. Flag as `BLOCKED_INVALID_APAAR`. |
| `RULE_1_INTL` | AICTE APH Chapter VII (Foreign Nationals) | Foreign students exempt from Aadhaar must provide Passport + Study in India (SII) / FRRO Visa. | Issue cryptographically bound `APAAR-FN-2026-XXXX`. |
| `RULE_2_NRI` | AICTE APH Regulation 3.4 (NRI Quota) | Up to 5% within approved intake. Requires explicit AICTE EoA approval. | Block if `eoa_nri_approved == False`. Quota ceiling strictly enforced. |
| `RULE_2_TFW` | AICTE APH Chapter II (Tuition Fee Waiver) | Up to 5% supernumerary over and above approved intake for economically weaker students. | Allocate up to `round(intake * 0.05)`. Any further admission flagged as `TFW_QUOTA_EXCEEDED`. |
| `RULE_2_FN_OCI` | AICTE APH Chapter VII (15% Supernumerary) | Up to 15% supernumerary over and above approved intake for Foreign Nationals / OCI / CIWGC. | Allocate up to `round(intake * 0.15)`. Requires `eoa_fn_approved == True`. |
| `RULE_2_PMSSS` | J&K Special Scholarship Scheme | 2 supernumerary seats per program for J&K and Ladakh central allotments. | Allocate slot ID `PMSSS-001` or `PMSSS-002`. Cap at 2 seats. |
| `RULE_3_EXCESS` | Section 10(k) of AICTE Act 1987 | Institutions cannot admit students beyond sanctioned intake. | Automatic quarantine as `BLOCKED_EXCESS_INTAKE`. No seat slot assigned. |
| `RULE_4_DEDUP` | AICTE Dual Full-Time Degree Prohibition | Student cannot be enrolled in two full-time AICTE degree programs simultaneously. | Block secondary claim with `CROSS_INSTITUTE_DUPLICATE_LOCK`. Notify RO. |
| `RULE_5_DUAL_ID` | Key Requirement #10 & NAD Guidelines | Certificates must print both National APAAR ID and Institution Student ID. | Generate verifiable credential with dual-identifiers and Ed25519 QR. |
| `RULE_6_DPDP` | DPDP Act 2023 Section 6 | Student must grant explicit consent before third parties can view academic standing. | Enforce consent token check in `/api/verify/lookup`. |
