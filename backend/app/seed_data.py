"""
Pre-Seeded National AICTE Student Registry, Institutions, and Scenarios
Configured for SIH 2026 Evaluation Scenarios.
"""

from typing import List, Dict, Any

SEED_INSTITUTIONS: List[Dict[str, Any]] = [
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
        "eoa_nri_approved": True,
        "eoa_fn_approved": True,
        "eoa_status": "APPROVED_ACTIVE",
        "eoa_letter_no": "F.No. North-West/1-451982311/2026/EOA",
        "portal_status": "ACTIVE",
        "anomaly_score": 12,
        "anomaly_reasons": []
    },
    {
        "id": "1-882341902",
        "name": "Apex Institute of Management (PGDM)",
        "city": "Mumbai",
        "state": "Maharashtra",
        "region": "WRO",
        "type": "Management (PGDM)",
        "course_id": "PGDM-MGT",
        "course_name": "Post Graduate Diploma in Management",
        "academic_year": "2026-27",
        "approved_intake": 60,
        "eoa_nri_approved": False, # Statutory violation: admitting NRI without approval
        "eoa_fn_approved": False,
        "eoa_status": "CONDITIONAL_APPROVAL",
        "eoa_letter_no": "F.No. Western/1-882341902/2026/EOA",
        "portal_status": "UNDER_AUDIT",
        "anomaly_score": 78,
        "anomaly_reasons": ["Intake Capacity Exceeded", "Unapproved NRI Admittance Attempt"]
    },
    {
        "id": "1-339102844",
        "name": "Horizon College of Engineering",
        "city": "Pune",
        "state": "Maharashtra",
        "region": "WRO",
        "type": "Engineering & Technology",
        "course_id": "AIDS-BTECH",
        "course_name": "B.Tech Artificial Intelligence & Data Science",
        "academic_year": "2026-27",
        "approved_intake": 60,
        "eoa_nri_approved": True,
        "eoa_fn_approved": False,
        "eoa_status": "APPROVED_ACTIVE",
        "eoa_letter_no": "F.No. Western/1-339102844/2026/EOA",
        "portal_status": "FLAGGED_FOR_EVC",
        "anomaly_score": 89,
        "anomaly_reasons": [
            "+38 pts Midnight Cutoff Upload Surge (82% uploaded 23:45-23:59)",
            "+31 pts Shared Mobile/Bank IFSC Prefix Cluster (26 students)",
            "+20 pts Cross-Institution Duplicate Claims Detected"
        ]
    },
    {
        "id": "1-661209384",
        "name": "Dakshin Bharat Technical Campus",
        "city": "Bengaluru",
        "state": "Karnataka",
        "region": "SRO",
        "type": "Computer Applications (MCA)",
        "course_id": "MCA-COMP",
        "course_name": "Master of Computer Applications",
        "academic_year": "2026-27",
        "approved_intake": 60,
        "eoa_nri_approved": True,
        "eoa_fn_approved": True,
        "eoa_status": "APPROVED_ACTIVE",
        "eoa_letter_no": "F.No. South/1-661209384/2026/EOA",
        "portal_status": "ACTIVE",
        "anomaly_score": 24,
        "anomaly_reasons": ["Demographic mismatch under verification", "FRRO clearance pending"]
    }
]

SEED_STUDENTS: List[Dict[str, Any]] = [
    # -------------------------------------------------------------
    # MAIT Delhi (Healthy Cohort with TFW, OCI, FN & NRI)
    # -------------------------------------------------------------
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
        "institution_name": "Maharaja Agrasen Institute of Technology (MAIT)",
        "course_id": "CSE-BTECH",
        "course_name": "B.Tech Computer Science & Engineering",
        "admission_date": "2026-08-10",
        "cgpa": "8.92",
        "degree_awarded": "Pending Final Term",
        "dpdp_consent_granted": True,
        "violations": []
    },
    {
        "id": "std-002",
        "apaar_id": "671928471923",
        "student_id": "MAIT-CSE-2026-002",
        "name": "Ananya Iyer",
        "dob": "2005-07-22",
        "gender": "Female",
        "category": "OBC-NCL",
        "citizenship": "INDIAN",
        "quota_bucket": "REGULAR_MERIT",
        "seat_slot_id": "NWRO-1-4519-2026-REG-002",
        "status": "VERIFIED_ACTIVE",
        "institution_id": "1-451982311",
        "institution_name": "Maharaja Agrasen Institute of Technology (MAIT)",
        "course_id": "CSE-BTECH",
        "course_name": "B.Tech Computer Science & Engineering",
        "admission_date": "2026-08-11",
        "cgpa": "9.45",
        "degree_awarded": "Pending Final Term",
        "dpdp_consent_granted": True,
        "violations": []
    },
    {
        "id": "std-003",
        "apaar_id": "319482019482",
        "student_id": "MAIT-CSE-2026-TFW-01",
        "name": "Rohan Verma",
        "dob": "2004-11-30",
        "gender": "Male",
        "category": "EWS",
        "citizenship": "INDIAN",
        "quota_bucket": "SUPERNUMERARY_TFW_5PCT",
        "seat_slot_id": "NWRO-1-4519-2026-TFW-001",
        "status": "VERIFIED_ACTIVE",
        "institution_id": "1-451982311",
        "institution_name": "Maharaja Agrasen Institute of Technology (MAIT)",
        "course_id": "CSE-BTECH",
        "course_name": "B.Tech Computer Science & Engineering",
        "admission_date": "2026-08-12",
        "cgpa": "8.70",
        "degree_awarded": "Pending Final Term",
        "dpdp_consent_granted": True,
        "violations": []
    },
    {
        "id": "std-004",
        "apaar_id": "APAAR-FN-2026-E8A1",
        "student_id": "MAIT-CSE-2026-FN-01",
        "name": "Bikash Shrestha",
        "dob": "2004-03-15",
        "gender": "Male",
        "category": "Foreign National",
        "citizenship": "FOREIGN_NATIONAL",
        "passport_no": "N0918234",
        "sii_id": "SII-2026-NP-8812",
        "visa_no": "V-EFRRO-DEL-8910",
        "quota_bucket": "SUPERNUMERARY_FN_OCI_15PCT",
        "seat_slot_id": "NWRO-1-4519-2026-FN-001",
        "status": "VERIFIED_ACTIVE",
        "institution_id": "1-451982311",
        "institution_name": "Maharaja Agrasen Institute of Technology (MAIT)",
        "course_id": "CSE-BTECH",
        "course_name": "B.Tech Computer Science & Engineering",
        "admission_date": "2026-08-14",
        "cgpa": "8.65",
        "degree_awarded": "Pending Final Term",
        "dpdp_consent_granted": True,
        "violations": []
    },
    {
        "id": "std-005",
        "apaar_id": "APAAR-OCI-2026-44B2",
        "student_id": "MAIT-CSE-2026-OCI-01",
        "name": "Maya Patel",
        "dob": "2005-09-08",
        "gender": "Female",
        "category": "OCI",
        "citizenship": "OCI",
        "passport_no": "USA-54192841",
        "oci_card_no": "A4918291",
        "quota_bucket": "SUPERNUMERARY_FN_OCI_15PCT",
        "seat_slot_id": "NWRO-1-4519-2026-FN-002",
        "status": "VERIFIED_ACTIVE",
        "institution_id": "1-451982311",
        "institution_name": "Maharaja Agrasen Institute of Technology (MAIT)",
        "course_id": "CSE-BTECH",
        "course_name": "B.Tech Computer Science & Engineering",
        "admission_date": "2026-08-15",
        "cgpa": "9.12",
        "degree_awarded": "Pending Final Term",
        "dpdp_consent_granted": True,
        "violations": []
    },
    {
        "id": "std-006",
        "apaar_id": "819203948571",
        "student_id": "MAIT-CSE-2026-NRI-01",
        "name": "Devansh Singhania",
        "dob": "2005-01-19",
        "gender": "Male",
        "category": "NRI",
        "citizenship": "NRI",
        "passport_no": "Z8912831",
        "quota_bucket": "NRI_QUOTA_5PCT",
        "seat_slot_id": "NWRO-1-4519-2026-NRI-001",
        "status": "VERIFIED_ACTIVE",
        "institution_id": "1-451982311",
        "institution_name": "Maharaja Agrasen Institute of Technology (MAIT)",
        "course_id": "CSE-BTECH",
        "course_name": "B.Tech Computer Science & Engineering",
        "admission_date": "2026-08-16",
        "cgpa": "8.40",
        "degree_awarded": "Pending Final Term",
        "dpdp_consent_granted": True,
        "violations": []
    },

    # -------------------------------------------------------------
    # Apex PGDM Mumbai (Violations: Excess Enrolment 61/60 + Unapproved NRI)
    # -------------------------------------------------------------
    {
        "id": "std-020",
        "apaar_id": "519204928172",
        "student_id": "APEX-PGDM-2026-061",
        "name": "Karan Malhotra",
        "dob": "2002-06-18",
        "gender": "Male",
        "category": "General",
        "citizenship": "INDIAN",
        "quota_bucket": "REGULAR_MERIT",
        "seat_slot_id": None,
        "status": "BLOCKED_EXCESS_INTAKE",
        "institution_id": "1-882341902",
        "institution_name": "Apex Institute of Management (PGDM)",
        "course_id": "PGDM-MGT",
        "course_name": "Post Graduate Diploma in Management",
        "admission_date": "2026-08-25",
        "cgpa": "7.80",
        "degree_awarded": "Blocked by AICTE Order",
        "dpdp_consent_granted": False,
        "violations": [
            {
                "rule": "RULE_3_EXCESS_INTAKE",
                "code": "REGULAR_INTAKE_BREACH",
                "message": "Approved regular intake capacity reached (60/60). Candidate is excess admission #61 of 60. Violates AICTE APH Chapter II."
            }
        ]
    },
    {
        "id": "std-021",
        "apaar_id": "719284910293",
        "student_id": "APEX-PGDM-2026-NRI-01",
        "name": "Sameer Merchant",
        "dob": "2001-12-05",
        "gender": "Male",
        "category": "NRI",
        "citizenship": "NRI",
        "passport_no": "P9182391",
        "quota_bucket": "NRI_QUOTA_5PCT",
        "seat_slot_id": None,
        "status": "BLOCKED_UNAPPROVED_QUOTA",
        "institution_id": "1-882341902",
        "institution_name": "Apex Institute of Management (PGDM)",
        "course_id": "PGDM-MGT",
        "course_name": "Post Graduate Diploma in Management",
        "admission_date": "2026-08-26",
        "cgpa": "8.10",
        "degree_awarded": "Blocked by AICTE Order",
        "dpdp_consent_granted": False,
        "violations": [
            {
                "rule": "RULE_2_NRI_APPROVAL",
                "code": "UNAPPROVED_NRI_BREACH",
                "message": "Apex PGDM does not possess AICTE Extension of Approval for NRI Quota. Admitted student quarantined."
            }
        ]
    },

    # -------------------------------------------------------------
    # Horizon Pune (Violations: Cross-College Duplicate Lock with MAIT Delhi)
    # -------------------------------------------------------------
    {
        "id": "std-030",
        "apaar_id": "482910398472", # SAME APAAR AS AARAV SHARMA AT MAIT DELHI!
        "student_id": "HORIZON-AI-2026-014",
        "name": "Aarav Sharma",
        "dob": "2005-04-12",
        "gender": "Male",
        "category": "General",
        "citizenship": "INDIAN",
        "quota_bucket": "REGULAR_MERIT",
        "seat_slot_id": None,
        "status": "CROSS_INSTITUTE_DUPLICATE_LOCK",
        "institution_id": "1-339102844",
        "institution_name": "Horizon College of Engineering",
        "course_id": "AIDS-BTECH",
        "course_name": "B.Tech Artificial Intelligence & Data Science",
        "admission_date": "2026-08-29",
        "cgpa": "N/A",
        "degree_awarded": "BLOCKED",
        "dpdp_consent_granted": False,
        "violations": [
            {
                "rule": "RULE_4_CROSS_INSTITUTE_DUPLICATE",
                "code": "DUPLICATE_NATIONAL_APAAR",
                "message": "Student with APAAR 482910398472 is already actively enrolled in 'Maharaja Agrasen Institute of Technology (MAIT)' (B.Tech CSE) under Seat Slot NWRO-1-4519-2026-REG-001.",
                "conflicting_institution": "Maharaja Agrasen Institute of Technology (MAIT)",
                "conflicting_inst_id": "1-451982311",
                "conflicting_slot": "NWRO-1-4519-2026-REG-001"
            }
        ]
    },
    {
        "id": "std-031",
        "apaar_id": "671928471923", # SAME APAAR AS ANANYA IYER AT MAIT DELHI!
        "student_id": "HORIZON-AI-2026-015",
        "name": "Iyer Ananya",
        "dob": "2005-07-22",
        "gender": "Female",
        "category": "OBC-NCL",
        "citizenship": "INDIAN",
        "quota_bucket": "REGULAR_MERIT",
        "seat_slot_id": None,
        "status": "CROSS_INSTITUTE_DUPLICATE_LOCK",
        "institution_id": "1-339102844",
        "institution_name": "Horizon College of Engineering",
        "course_id": "AIDS-BTECH",
        "course_name": "B.Tech Artificial Intelligence & Data Science",
        "admission_date": "2026-08-30",
        "cgpa": "N/A",
        "degree_awarded": "BLOCKED",
        "dpdp_consent_granted": False,
        "violations": [
            {
                "rule": "RULE_4_FUZZY_DEMOGRAPHIC_DEDUP",
                "code": "AI_DEMOGRAPHIC_FINGERPRINT_MATCH",
                "message": "AI Demographic Fingerprint match (99% confidence) with student 'Ananya Iyer' in 'MAIT Delhi'. Duplicate multi-college enrollment blocked."
            }
        ]
    },

    # -------------------------------------------------------------
    # Dakshin Bharat Bengaluru (Demographic & FRRO Verification Cases)
    # -------------------------------------------------------------
    {
        "id": "std-040",
        "apaar_id": "999912839182",
        "student_id": "DBTC-MCA-2026-009",
        "name": "Siddharth Rao Mismatch",
        "dob": "2003-08-14",
        "gender": "Male",
        "category": "SC",
        "citizenship": "INDIAN",
        "quota_bucket": "REGULAR_MERIT",
        "seat_slot_id": None,
        "status": "BLOCKED_INVALID_APAAR",
        "institution_id": "1-661209384",
        "institution_name": "Dakshin Bharat Technical Campus",
        "course_id": "MCA-COMP",
        "course_name": "Master of Computer Applications",
        "admission_date": "2026-08-18",
        "cgpa": "8.0",
        "degree_awarded": "Pending Correction",
        "dpdp_consent_granted": False,
        "violations": [
            {
                "rule": "RULE_1_APAAR_VALIDATION",
                "code": "DECOMMISSIONED_OR_BLOCKED",
                "message": "APAAR ID marked surrendered in National Academic Depository."
            }
        ]
    }
]

# Generate more realistic verified records for MAIT and Dakshin Bharat so counts match approved intakes
for i in range(7, 35):
    apaar_num = f"4829103984{i:02d}"
    roll = f"MAIT-CSE-2026-{i:03d}"
    SEED_STUDENTS.append({
        "id": f"std-{i:03d}",
        "apaar_id": apaar_num,
        "student_id": roll,
        "name": f"Student Candidate {i}",
        "dob": "2005-02-14",
        "gender": "Female" if i % 2 == 0 else "Male",
        "category": "General" if i % 3 == 0 else ("OBC" if i % 3 == 1 else "SC/ST"),
        "citizenship": "INDIAN",
        "quota_bucket": "REGULAR_MERIT",
        "seat_slot_id": f"NWRO-1-4519-2026-REG-{i:03d}",
        "status": "VERIFIED_ACTIVE",
        "institution_id": "1-451982311",
        "institution_name": "Maharaja Agrasen Institute of Technology (MAIT)",
        "course_id": "CSE-BTECH",
        "course_name": "B.Tech Computer Science & Engineering",
        "admission_date": "2026-08-14",
        "cgpa": f"{7.5 + (i % 25) * 0.08:.2f}",
        "degree_awarded": "Pending Final Term",
        "dpdp_consent_granted": True,
        "violations": []
    })
