"""
Main FastAPI Application Entrypoint
AICTE Unified APAAR Student Registry, Seat-Matrix Compliance & Verifiable Credential Portal
"""

from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

from .adapters.dpi_adapters import dpi_adapters
from .database import db
from .routers import institutions, students, compliance, analytics, verification, audit

app = FastAPI(
    title="AICTE APAAR-Setu Platform API",
    description="National Unified Student Registry & Enrolment Verification System under AICTE / MoE",
    version="2.0.0"
)

# Enable CORS for local development and demo recordings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Modular Routers
app.include_router(institutions.router)
app.include_router(students.router)
app.include_router(compliance.router)
app.include_router(analytics.router)
app.include_router(verification.router)
app.include_router(audit.router)

@app.get("/")
def root():
    return {
        "system": "AICTE APAAR-Setu Platform",
        "authority": "All India Council for Technical Education (AICTE), Ministry of Education, Govt. of India",
        "status": "OPERATIONAL",
        "api_env_mode": dpi_adapters.env_mode,
        "docs_url": "/docs"
    }

@app.get("/api/adapters/status")
def get_adapters_status():
    """Returns DPI connection status and live dummy keys for Government Header Inspector modal."""
    return dpi_adapters.get_adapter_status()

@app.post("/api/adapters/toggle-mode")
def toggle_mode(payload: Dict[str, str] = Body(...)):
    """Toggles API environment mode live (SANDBOX_MOCK <-> PRODUCTION_GOV)."""
    mode = payload.get("mode", "SANDBOX_MOCK")
    dpi_adapters.set_env_mode(mode)
    return {
        "success": True,
        "new_mode": dpi_adapters.env_mode,
        "message": f"DPI Adapter mode switched to {dpi_adapters.env_mode}."
    }

@app.post("/api/system/reset")
def reset_system():
    """Resets database to baseline seed for clean demo video recording."""
    db.reset_to_seed()
    return {
        "success": True,
        "message": "AICTE APAAR-Setu state re-seeded to 4 baseline colleges and 35+ students."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
