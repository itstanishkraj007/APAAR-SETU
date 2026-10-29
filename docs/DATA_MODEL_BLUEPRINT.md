# Data Model Blueprint — APAAR-Setu

## 1. Core Entities

### Institution Entity
```json
{
  "id": "1-451982311",
  "name": "Maharaja Agrasen Institute of Technology (MAIT)",
  "city": "New Delhi",
  "state": "Delhi",
  "region": "NWRO",
  "type": "Engineering & Technology",
  "course_id": "CSE-BTECH",
  "course_name": "B.Tech Computer Science & Engineering",
  "academic_year": "2026-27",
  "approved_intake": 120,
  "eoa_nri_approved": true,
  "eoa_fn_approved": true,
  "eoa_status": "APPROVED_ACTIVE",
  "eoa_letter_no": "F.No. North-West/1-451982311/2026/EOA",
  "portal_status": "ACTIVE",
  "anomaly_score": 12
}
```

### Student Enrolment Entity
```json
{
  "id": "std-001",
  "apaar_id": "482910398472",
  "student_id": "MAIT-CSE-2026-001",
  "name": "Aarav Sharma",
  "dob": "2005-04-12",
  "gender": "Male",
  "category": "General",
  "citizenship": "INDIAN",
  "quota_bucket": "REGULAR_MERIT",
  "seat_slot_id": "NWRO-1-4519-2026-REG-001",
  "status": "VERIFIED_ACTIVE",
  "institution_id": "1-451982311",
  "course_id": "CSE-BTECH",
  "admission_date": "2026-08-10",
  "cgpa": "8.92",
  "degree_awarded": "Pending Final Term",
  "dpdp_consent_granted": true,
  "violations": [],
  "cryptographic_proof": {
    "signature_hash": "a8f3b2c1d9e2...",
    "verification_token": "AICTE-VC-2026-A8F3B2C1D9E2",
    "algorithm": "HMAC-SHA256"
  }
}
```

### Audit Block Entity
```json
{
  "index": 4,
  "timestamp": "2026-10-30T01:25:00Z",
  "actor_role": "INSTITUTION_REGISTRAR",
  "action": "INGEST_STUDENT_RECORD",
  "details": {
    "student_id": "MAIT-CSE-2026-001",
    "apaar_id": "482910398472",
    "status": "VERIFIED_ACTIVE",
    "seat_slot_id": "NWRO-1-4519-2026-REG-001"
  },
  "previous_hash": "0000a1b2c3d4...",
  "hash": "e9f8a7b6c5d4..."
}
```
