"""
Database and In-Memory State Manager for AICTE APAAR-Setu Platform
Supports instant reset, state mutations, and seamless API queries.
"""

from typing import List, Dict, Any, Optional
import copy
from .seed_data import SEED_INSTITUTIONS, SEED_STUDENTS
from .rules_engine import rules_engine
from .audit_ledger import audit_ledger

class StateDatabase:
    def __init__(self):
        self.institutions: List[Dict[str, Any]] = []
        self.students: List[Dict[str, Any]] = []
        self.reset_to_seed()

    def reset_to_seed(self):
        """Resets the state back to default seed for reproducible hackathon demo videos."""
        self.institutions = copy.deepcopy(SEED_INSTITUTIONS)
        self.students = copy.deepcopy(SEED_STUDENTS)
        audit_ledger.record_event(
            actor_role="SYSTEM_ADMIN",
            action="RESET_TO_SEED",
            details={"message": "System re-seeded with 4 institutions and 35+ baseline students."}
        )

    def get_institutions(self) -> List[Dict[str, Any]]:
        return self.institutions

    def get_institution(self, inst_id: str) -> Optional[Dict[str, Any]]:
        for inst in self.institutions:
            if inst["id"] == inst_id:
                return inst
        return None

    def update_institution_status(self, inst_id: str, new_status: str, reason: str = "") -> bool:
        for inst in self.institutions:
            if inst["id"] == inst_id:
                inst["portal_status"] = new_status
                audit_ledger.record_event(
                    actor_role="AICTE_COMPLIANCE_OFFICER",
                    action="UPDATE_INSTITUTION_STATUS",
                    details={"institution_id": inst_id, "new_status": new_status, "reason": reason}
                )
                return True
        return False

    def get_students(
        self,
        institution_id: Optional[str] = None,
        status: Optional[str] = None,
        quota_bucket: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        res = self.students
        if institution_id:
            res = [s for s in res if s.get("institution_id") == institution_id]
        if status:
            res = [s for s in res if s.get("status") == status]
        if quota_bucket:
            res = [s for s in res if s.get("quota_bucket") == quota_bucket]
        return res

    def get_student_by_id(self, student_id: str) -> Optional[Dict[str, Any]]:
        for s in self.students:
            if s.get("id") == student_id or s.get("student_id") == student_id or s.get("apaar_id") == student_id:
                return s
        return None

    def ingest_student(self, student_data: Dict[str, Any], actor_role: str = "INSTITUTION_REGISTRAR") -> Dict[str, Any]:
        """Runs the 10 statutory rules engine and inserts or updates student record."""
        inst_id = student_data.get("institution_id")
        institution = self.get_institution(inst_id)
        if not institution:
            raise ValueError(f"Institution {inst_id} not registered in AICTE EoA database.")

        # Filter existing students in same course
        existing_in_course = [
            s for s in self.students 
            if s.get("institution_id") == inst_id and s.get("course_id") == student_data.get("course_id", institution["course_id"])
        ]

        # Evaluate through statutory engine
        eval_result = rules_engine.evaluate_admission(
            student=student_data,
            institution=institution,
            existing_students_in_course=existing_in_course,
            all_national_students=self.students
        )

        # Merge student with statutory result
        new_record = {
            "id": student_data.get("id") or f"std-{len(self.students)+1:03d}",
            "apaar_id": eval_result.get("effective_apaar") or student_data.get("apaar_id"),
            "student_id": student_data.get("student_id"),
            "name": student_data.get("name"),
            "dob": student_data.get("dob"),
            "gender": student_data.get("gender"),
            "category": student_data.get("category", "General"),
            "citizenship": student_data.get("citizenship", "INDIAN"),
            "quota_bucket": eval_result.get("assigned_bucket"),
            "seat_slot_id": eval_result.get("seat_slot_id"),
            "status": eval_result.get("status"),
            "institution_id": inst_id,
            "institution_name": institution["name"],
            "course_id": student_data.get("course_id", institution["course_id"]),
            "course_name": institution["course_name"],
            "admission_date": student_data.get("admission_date") or "2026-08-20",
            "cgpa": student_data.get("cgpa", "8.50"),
            "degree_awarded": "Pending Final Term" if eval_result.get("status") == "VERIFIED_ACTIVE" else "Blocked",
            "dpdp_consent_granted": student_data.get("dpdp_consent_granted", True),
            "passport_no": student_data.get("passport_no"),
            "oci_card_no": student_data.get("oci_card_no"),
            "sii_id": student_data.get("sii_id"),
            "visa_no": student_data.get("visa_no"),
            "violations": eval_result.get("violations", []),
            "warnings": eval_result.get("warnings", []),
            "cryptographic_proof": eval_result.get("cryptographic_proof")
        }

        # Check if updating existing or inserting new
        existing_index = None
        for idx, s in enumerate(self.students):
            if s.get("id") == new_record["id"] or (s.get("student_id") == new_record["student_id"] and s.get("institution_id") == inst_id):
                existing_index = idx
                break

        if existing_index is not None:
            self.students[existing_index] = new_record
        else:
            self.students.append(new_record)

        # Record in Immutable Audit Ledger
        audit_ledger.record_event(
            actor_role=actor_role,
            action="INGEST_STUDENT_RECORD",
            details={
                "student_id": new_record["student_id"],
                "apaar_id": new_record["apaar_id"],
                "institution_id": inst_id,
                "status": new_record["status"],
                "seat_slot_id": new_record["seat_slot_id"],
                "quota_bucket": new_record["quota_bucket"]
            }
        )

        return new_record

    def revoke_student_seat(self, student_id: str, reason: str, actor_role: str = "AICTE_AUDITOR") -> bool:
        for s in self.students:
            if s.get("id") == student_id or s.get("student_id") == student_id:
                old_status = s.get("status")
                s["status"] = "REVOKED_BY_AICTE"
                s["seat_slot_id"] = None
                s["violations"].append({"rule": "ADMIN_REVOCATION", "code": "ORDER_EXECUTION", "message": reason})
                audit_ledger.record_event(
                    actor_role=actor_role,
                    action="REVOKE_SEAT_ALLOCATION",
                    details={"student_id": s.get("student_id"), "apaar_id": s.get("apaar_id"), "previous_status": old_status, "reason": reason}
                )
                return True
        return False

    def update_dpdp_consent(self, apaar_id: str, granted: bool) -> bool:
        matched = False
        for s in self.students:
            if s.get("apaar_id") == apaar_id:
                s["dpdp_consent_granted"] = granted
                matched = True
        if matched:
            audit_ledger.record_event(
                actor_role="STUDENT_USER",
                action="UPDATE_DPDP_CONSENT",
                details={"apaar_id": apaar_id, "consent_status": "GRANTED" if granted else "REVOKED"}
            )
        return matched

db = StateDatabase()
