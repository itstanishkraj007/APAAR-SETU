from fastapi import APIRouter, HTTPException, Query, Body
from typing import List, Dict, Any, Optional
from ..database import db

router = APIRouter(prefix="/api/students", tags=["Students"])

@router.get("")
def list_students(
    institution_id: Optional[str] = None,
    status: Optional[str] = None,
    quota_bucket: Optional[str] = None
):
    return db.get_students(
        institution_id=institution_id,
        status=status,
        quota_bucket=quota_bucket
    )

@router.get("/{student_id}")
def get_student(student_id: str):
    s = db.get_student_by_id(student_id)
    if not s:
        raise HTTPException(status_code=404, detail="Student not found")
    return s

@router.post("/ingest")
def ingest_student(payload: Dict[str, Any] = Body(...)):
    """Ingests or updates a student record through the 10 statutory AICTE rules."""
    try:
        record = db.ingest_student(payload, actor_role="INSTITUTION_REGISTRAR")
        return {
            "success": True,
            "status": record["status"],
            "seat_slot_id": record.get("seat_slot_id"),
            "effective_apaar": record.get("apaar_id"),
            "violations": record.get("violations", []),
            "student": record
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/batch-upload")
def batch_upload(payload: Dict[str, Any] = Body(...)):
    """Simulates or processes bulk student ingestion (CSV / Excel batch)."""
    inst_id = payload.get("institution_id")
    students_list = payload.get("students", [])
    
    if not inst_id:
        raise HTTPException(status_code=400, detail="Missing institution_id")

    results = []
    summary = {
        "total": len(students_list),
        "verified_active": 0,
        "blocked_excess": 0,
        "blocked_duplicate": 0,
        "blocked_invalid_apaar": 0,
        "supernumerary_allotted": 0
    }

    for s_data in students_list:
        s_data["institution_id"] = inst_id
        try:
            record = db.ingest_student(s_data, actor_role="BATCH_CSV_INGESTION")
            results.append(record)
            st = record["status"]
            if st == "VERIFIED_ACTIVE":
                summary["verified_active"] += 1
                if "SUPERNUMERARY" in record.get("quota_bucket", ""):
                    summary["supernumerary_allotted"] += 1
            elif st == "BLOCKED_EXCESS_INTAKE":
                summary["blocked_excess"] += 1
            elif st == "CROSS_INSTITUTE_DUPLICATE_LOCK":
                summary["blocked_duplicate"] += 1
            elif st == "BLOCKED_INVALID_APAAR":
                summary["blocked_invalid_apaar"] += 1
        except Exception as e:
            results.append({"student_id": s_data.get("student_id"), "error": str(e), "status": "ERROR"})

    return {
        "success": True,
        "institution_id": inst_id,
        "summary": summary,
        "records": results
    }

@router.post("/samarth-sync")
def samarth_sync(payload: Dict[str, str] = Body(...)):
    """Simulates 1-click webhook pull from Samarth ERP / JoSAA Counselling."""
    inst_id = payload.get("institution_id", "1-451982311")
    # Generates 3 synchronized verified students from counselling portal
    synced = [
        {
            "apaar_id": "782910398419",
            "student_id": "SAMARTH-2026-901",
            "name": "Kavya Nair",
            "dob": "2005-03-29",
            "gender": "Female",
            "category": "General",
            "citizenship": "INDIAN",
            "quota_bucket": "REGULAR_MERIT",
            "institution_id": inst_id,
            "admission_date": "2026-08-28"
        },
        {
            "apaar_id": "581920394812",
            "student_id": "SAMARTH-2026-902",
            "name": "Arjun Singhal",
            "dob": "2005-09-11",
            "gender": "Male",
            "category": "OBC-NCL",
            "citizenship": "INDIAN",
            "quota_bucket": "REGULAR_MERIT",
            "institution_id": inst_id,
            "admission_date": "2026-08-28"
        }
    ]
    records = [db.ingest_student(s, actor_role="SAMARTH_ERP_WEBHOOK") for s in synced]
    return {
        "success": True,
        "source": "Samarth State CET / JoSAA Gateway (e-Signed)",
        "records_imported": len(records),
        "records": records
    }

@router.post("/{student_id}/revoke")
def revoke_student(student_id: str, payload: Dict[str, str] = Body(...)):
    reason = payload.get("reason", "Statutory over-intake order issued by Regional Office")
    success = db.revoke_student_seat(student_id, reason, actor_role="AICTE_AUDITOR")
    if not success:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"success": True, "student_id": student_id, "status": "REVOKED_BY_AICTE"}
