from fastapi import APIRouter, HTTPException, Body
from typing import List, Dict, Any
from ..database import db
from ..audit_ledger import audit_ledger

router = APIRouter(prefix="/api/compliance", tags=["Compliance & Vigilance"])

@router.get("/overview")
def get_compliance_overview():
    institutions = db.get_institutions()
    students = db.get_students()
    
    total_approved = sum([inst["approved_intake"] for inst in institutions])
    verified_active = len([s for s in students if s.get("status") == "VERIFIED_ACTIVE"])
    
    duplicates = [s for s in students if s.get("status") == "CROSS_INSTITUTE_DUPLICATE_LOCK"]
    excess = [s for s in students if s.get("status") in ["BLOCKED_EXCESS_INTAKE", "BLOCKED_UNAPPROVED_QUOTA"]]
    international = [s for s in students if s.get("citizenship") in ["FOREIGN_NATIONAL", "OCI", "NRI"]]
    supernumerary = [s for s in students if "SUPERNUMERARY" in s.get("quota_bucket", "")]

    # High-risk institutions for AI Anomaly Radar
    flagged_institutions = [inst for inst in institutions if inst.get("anomaly_score", 0) > 40]
    flagged_institutions.sort(key=lambda x: x.get("anomaly_score", 0), reverse=True)

    return {
        "kpis": {
            "total_institutions": len(institutions),
            "total_approved_intake": total_approved,
            "total_verified_active": verified_active,
            "duplicate_enrolment_locks": len(duplicates),
            "excess_intake_violations": len(excess),
            "international_students": len(international),
            "supernumerary_allotted": len(supernumerary),
            "national_intake_utilization_pct": round(verified_active / max(total_approved, 1) * 100, 1)
        },
        "duplicate_locks": duplicates,
        "excess_violations": excess,
        "ai_anomaly_radar": flagged_institutions
    }

@router.post("/resolve-duplicate")
def resolve_duplicate(payload: Dict[str, str] = Body(...)):
    """Resolves duplicate enrolment by cancelling conflicting seat and confirming master seat."""
    apaar_id = payload.get("apaar_id")
    cancel_student_id = payload.get("cancel_student_id")
    action = payload.get("action", "CANCEL_CONFLICT")
    reason = payload.get("reason", "AICTE National De-duplication Directive")

    if not cancel_student_id:
        raise HTTPException(status_code=400, detail="Missing cancel_student_id")

    success = db.revoke_student_seat(cancel_student_id, reason, actor_role="AICTE_VIGILANCE_OFFICER")
    
    audit_ledger.record_event(
        actor_role="AICTE_VIGILANCE_OFFICER",
        action="RESOLVE_CROSS_INSTITUTE_DUPLICATE",
        details={
            "apaar_id": apaar_id,
            "cancelled_student_id": cancel_student_id,
            "resolution": action,
            "statutory_order": f"AICTE/VIG/DEDUP/2026/ORD-{cancel_student_id[-3:]}"
        }
    )

    return {
        "success": True,
        "message": f"Conflicting seat {cancel_student_id} successfully cancelled. Primary seat preserved.",
        "order_no": f"AICTE/VIG/DEDUP/2026/ORD-{cancel_student_id[-3:]}"
    }

@router.post("/issue-show-cause")
def issue_show_cause(payload: Dict[str, str] = Body(...)):
    inst_id = payload.get("institution_id")
    violation_type = payload.get("violation_type", "EXCESS_INTAKE_BREACH")
    details = payload.get("details", "Admitting students exceeding sanctioned quota.")

    inst = db.get_institution(inst_id)
    if not inst:
        raise HTTPException(status_code=404, detail="Institution not found")

    notice_no = f"AICTE/LEGAL/SCN/2026/{inst_id}"
    audit_ledger.record_event(
        actor_role="AICTE_REGIONAL_OFFICER",
        action="ISSUE_STATUTORY_SHOW_CAUSE_NOTICE",
        details={
            "institution_id": inst_id,
            "institution_name": inst["name"],
            "notice_number": notice_no,
            "violation_type": violation_type,
            "statutory_act": "Section 10(k) of AICTE Act 1987 & APH 2024-27 Norms"
        }
    )

    return {
        "success": True,
        "notice_no": notice_no,
        "institution_name": inst["name"],
        "message": f"Show Cause Notice {notice_no} officially generated and dispatched to Institution Management."
    }

@router.post("/dispatch-evc")
def dispatch_evc(payload: Dict[str, str] = Body(...)):
    inst_id = payload.get("institution_id")
    inst = db.get_institution(inst_id)
    if not inst:
        raise HTTPException(status_code=404, detail="Institution not found")

    evc_order = f"AICTE/EVC/2026/{inst_id}"
    db.update_institution_status(inst_id, "EVC_SURPRISE_INSPECTION_ORDERED", "AI Anomaly Radar triggered inspection")
    
    audit_ledger.record_event(
        actor_role="AICTE_APEX_COUNCIL",
        action="DISPATCH_EXPERT_VISITING_COMMITTEE",
        details={
            "institution_id": inst_id,
            "institution_name": inst["name"],
            "evc_order": evc_order,
            "risk_score": inst.get("anomaly_score", 0)
        }
    )

    return {
        "success": True,
        "evc_order": evc_order,
        "institution_name": inst["name"],
        "message": f"Expert Visiting Committee (EVC) constituted under order {evc_order} for physical verification."
    }
