"""
Immutable SHA-256 Audit Ledger
Maintains a tamper-evident cryptographic hash-chain of all admission events,
over-intake detections, cross-college duplicate locks, show-cause issuances,
and DPDP Act 2023 consent transactions.
"""

import hashlib
import json
import time
from typing import List, Dict, Any, Optional

class AuditLedger:
    def __init__(self):
        self.chain: List[Dict[str, Any]] = []
        # Create Genesis Block
        self.record_event(
            actor_role="SYSTEM_GENESIS",
            action="LEDGER_INITIALIZATION",
            details={
                "message": "AICTE APAAR-Setu National Master Trust Ledger Initialized",
                "authority": "Member Secretary, AICTE, New Delhi",
                "compliance": "DPDP Act 2023 & NEP 2020 APAAR Mandate"
            }
        )

    def _calculate_hash(self, block: Dict[str, Any]) -> str:
        block_string = json.dumps({
            "index": block["index"],
            "timestamp": block["timestamp"],
            "actor_role": block["actor_role"],
            "action": block["action"],
            "details": block["details"],
            "previous_hash": block["previous_hash"]
        }, sort_keys=True)
        return hashlib.sha256(block_string.encode('utf-8')).hexdigest()

    def record_event(self, actor_role: str, action: str, details: Dict[str, Any]) -> Dict[str, Any]:
        previous_hash = self.chain[-1]["hash"] if self.chain else "0" * 64
        index = len(self.chain)
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

        block = {
            "index": index,
            "timestamp": timestamp,
            "actor_role": actor_role,
            "action": action,
            "details": details,
            "previous_hash": previous_hash
        }
        block["hash"] = self._calculate_hash(block)
        self.chain.append(block)
        return block

    def get_blocks(self, limit: int = 100) -> List[Dict[str, Any]]:
        return list(reversed(self.chain[-limit:]))

    def verify_integrity(self) -> Dict[str, Any]:
        """Validates the entire chain from Genesis block to latest block."""
        for i in range(len(self.chain)):
            current = self.chain[i]
            if i > 0:
                prev = self.chain[i - 1]
                if current["previous_hash"] != prev["hash"]:
                    return {
                        "verified": False,
                        "broken_block_index": i,
                        "error": f"Hash mismatch at block #{i}. Previous hash does not match block #{i-1} hash."
                    }
            expected_hash = self._calculate_hash(current)
            if current["hash"] != expected_hash:
                return {
                    "verified": False,
                    "broken_block_index": i,
                    "error": f"Tampering detected in block #{i}. Data does not match SHA-256 digest."
                }
        return {
            "verified": True,
            "total_blocks": len(self.chain),
            "latest_root_hash": self.chain[-1]["hash"] if self.chain else None,
            "message": "All blocks cryptographically verified. Hash chain integrity is 100% authentic."
        }

audit_ledger = AuditLedger()
