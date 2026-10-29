from fastapi import APIRouter
from ..audit_ledger import audit_ledger

router = APIRouter(prefix="/api/audit", tags=["Audit Ledger"])

@router.get("/blocks")
def get_audit_blocks(limit: int = 50):
    return {
        "total_blocks": len(audit_ledger.chain),
        "blocks": audit_ledger.get_blocks(limit=limit)
    }

@router.get("/verify")
def verify_ledger():
    return audit_ledger.verify_integrity()
