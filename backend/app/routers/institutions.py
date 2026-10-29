from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional
from ..database import db

router = APIRouter(prefix="/api/institutions", tags=["Institutions"])

@router.get("")
def list_institutions():
    """Returns list of registered AICTE approved institutions with their active seat-matrices."""
    institutions = db.get_institutions()
    students = db.get_students()
    
    # Enrich institutions with live student counts
    result = []
    for inst in institutions:
        inst_students = [s for s in students if s.get("institution_id") == inst["id"]]
        active = [s for s in inst_students if s.get("status") == "VERIFIED_ACTIVE"]
        
        reg_count = len([s for s in active if s.get("quota_bucket") == "REGULAR_MERIT"])
        nri_count = len([s for s in active if s.get("quota_bucket") == "NRI_QUOTA_5PCT"])
        tfw_count = len([s for s in active if s.get("quota_bucket") == "SUPERNUMERARY_TFW_5PCT"])
        fn_count = len([s for s in active if s.get("quota_bucket") == "SUPERNUMERARY_FN_OCI_15PCT"])
        pmsss_count = len([s for s in active if s.get("quota_bucket") == "SUPERNUMERARY_PMSSS"])
        
        excess = len([s for s in inst_students if s.get("status") in ["BLOCKED_EXCESS_INTAKE", "BLOCKED_UNAPPROVED_QUOTA"]])
        duplicates = len([s for s in inst_students if s.get("status") == "CROSS_INSTITUTE_DUPLICATE_LOCK"])
        
        enriched = dict(inst)
        enriched["counts"] = {
            "total_submitted": len(inst_students),
            "verified_active": len(active),
            "regular_merit": reg_count,
            "nri": nri_count,
            "tfw": tfw_count,
            "fn_oci": fn_count,
            "pmsss": pmsss_count,
            "excess_blocked": excess,
            "duplicate_blocked": duplicates,
            "capacity_pct": round((reg_count + nri_count) / max(inst["approved_intake"], 1) * 100, 1)
        }
        result.append(enriched)
    return result

@router.get("/{inst_id}")
def get_institution_detail(inst_id: str):
    inst = db.get_institution(inst_id)
    if not inst:
        raise HTTPException(status_code=404, detail="Institution not found")
    return inst

@router.post("/{inst_id}/status")
def update_status(inst_id: str, payload: Dict[str, str]):
    new_status = payload.get("status", "ACTIVE")
    reason = payload.get("reason", "Administrative review")
    success = db.update_institution_status(inst_id, new_status, reason)
    if not success:
        raise HTTPException(status_code=404, detail="Institution not found")
    return {"success": True, "institution_id": inst_id, "status": new_status, "reason": reason}
