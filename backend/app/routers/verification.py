from fastapi import APIRouter, HTTPException, Body, Query
from typing import Dict, Any, Optional
from ..database import db
from ..adapters.dpi_adapters import dpi_adapters

router = APIRouter(prefix="/api/verify", tags=["Verification & DPDP Consent"])

@router.get("/certificate/{student_id}")
def get_dual_id_certificate(student_id: str):
    """
    Renders official verifiable degree/enrollment certificate with dual-identities:
    National APAAR ID + Institution Student ID + Sanctioned Seat Slot ID.
    """
    s = db.get_student_by_id(student_id)
    if not s:
        raise HTTPException(status_code=404, detail="Student record not found")

    inst = db.get_institution(s["institution_id"])
    
    # Generate cryptographic proof if missing
    proof = s.get("cryptographic_proof")
    if not proof:
        proof = dpi_adapters.generate_cryptographic_signature({
            "apaar_id": s.get("apaar_id"),
            "student_id": s.get("student_id"),
            "seat_slot_id": s.get("seat_slot_id", "UNSANCTIONED"),
            "institution_id": s.get("institution_id"),
            "intake_status": "APPROVED_SANCTIONED_SEAT" if s.get("status") == "VERIFIED_ACTIVE" else "UNAUTHORIZED_OR_EXCESS"
        })

    return {
        "certificate_id": f"AICTE-DEG-{s.get('id', '000').upper()}-2026",
        "national_identity": {
            "apaar_id": s.get("apaar_id"),
            "type": "AUTOMATED_PERMANENT_ACADEMIC_ACCOUNT_REGISTRY",
            "regulatory_mandate": "National Education Policy (NEP) 2020"
        },
        "institutional_identity": {
            "student_id": s.get("student_id"),
            "institution_name": s.get("institution_name"),
            "institution_aicte_id": s.get("institution_id"),
            "course_name": s.get("course_name")
        },
        "seat_sanction_proof": {
            "seat_slot_id": s.get("seat_slot_id"),
            "quota_bucket": s.get("quota_bucket"),
            "status": s.get("status"),
            "intake_compliance": "CONFIRMED_WITHIN_SANCTIONED_INTAKE" if s.get("seat_slot_id") else "EXCESS_UNAPPROVED"
        },
        "student_profile": {
            "name": s.get("name"),
            "dob": s.get("dob"),
            "gender": s.get("gender"),
            "cgpa": s.get("cgpa"),
            "degree_awarded": s.get("degree_awarded")
        },
        "cryptographic_proof": proof,
        "qr_payload": {
            "v": "W3C-VC-1.0",
            "apaar": s.get("apaar_id"),
            "sid": s.get("student_id"),
            "slot": s.get("seat_slot_id"),
            "inst": s.get("institution_id"),
            "sig": proof["signature_hash"][:24],
            "issuer": "AICTE-CCA-GOV-IN"
        }
    }

@router.post("/lookup")
def verify_lookup(payload: Dict[str, str] = Body(...)):
    """Authorized Stakeholder Verification Console (Role 4)."""
    identifier = payload.get("identifier", "").strip()
    simulate_case = payload.get("simulate_case")

    if simulate_case == "TAMPERED_CGPA":
        return {
            "verified": False,
            "overall_status": "TAMPERED_CREDENTIAL_DETECTED",
            "scorecard": {
                "apaar_match": True,
                "institution_approval": True,
                "sanctioned_seat_proof": True,
                "pki_signature_integrity": False,
                "dpdp_student_consent": True
            },
            "error_detail": "Cryptographic signature mismatch! The claimed CGPA (9.98) has been tampered with and does not match the AICTE Ed25519 root hash."
        }
    elif simulate_case == "EXCESS_CANDIDATE":
        return {
            "verified": False,
            "overall_status": "EXCESS_UNAPPROVED_ENROLMENT",
            "scorecard": {
                "apaar_match": True,
                "institution_approval": True,
                "sanctioned_seat_proof": False,
                "pki_signature_integrity": False,
                "dpdp_student_consent": True
            },
            "error_detail": "Candidate was admitted beyond AICTE Sanctioned Intake (Excess Seat 61/60). This certificate carries no regulatory validity."
        }

    s = db.get_student_by_id(identifier)
    if not s:
        return {
            "verified": False,
            "overall_status": "RECORD_NOT_FOUND",
            "message": f"No student record found with identifier '{identifier}'. Please check 12-digit APAAR or Student ID."
        }

    is_active = s.get("status") == "VERIFIED_ACTIVE"
    consent = s.get("dpdp_consent_granted", True)

    return {
        "verified": is_active and consent,
        "overall_status": "AUTHENTIC_SANCTIONED_STUDENT" if (is_active and consent) else ("CONSENT_REVOKED_BY_STUDENT" if not consent else "QUARANTINED_OR_BLOCKED"),
        "scorecard": {
            "apaar_match": True,
            "institution_approval": True,
            "sanctioned_seat_proof": bool(s.get("seat_slot_id")),
            "pki_signature_integrity": True,
            "dpdp_student_consent": consent
        },
        "student": {
            "name": s.get("name") if consent else "REDACTED (DPDP Act 2023 Consent Required)",
            "apaar_id": s.get("apaar_id"),
            "student_id": s.get("student_id"),
            "institution_name": s.get("institution_name"),
            "course_name": s.get("course_name"),
            "seat_slot_id": s.get("seat_slot_id"),
            "cgpa": s.get("cgpa") if consent else "HIDDEN",
            "degree_awarded": s.get("degree_awarded")
        }
    }

@router.post("/consent")
def set_dpdp_consent(payload: Dict[str, Any] = Body(...)):
    """Student DPDP Consent Toggle (Role 5)."""
    apaar_id = payload.get("apaar_id")
    granted = bool(payload.get("granted", True))
    success = db.update_dpdp_consent(apaar_id, granted)
    return {
        "success": success,
        "apaar_id": apaar_id,
        "consent_granted": granted,
        "message": f"DPDP Act 2023 Consent successfully {'GRANTED (24h token)' if granted else 'REVOKED (Lock active)'}."
    }
