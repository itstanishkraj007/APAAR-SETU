import React from 'react';
import { useAppStore } from '../store/appStore';
import { X, UserCheck, ShieldAlert, CheckCircle2, Award, FileCode, AlertOctagon, Trash2 } from 'lucide-react';

export const StudentForensicsDrawer: React.FC = () => {
  const { selectedForensicStudent, setSelectedForensicStudent, showToast, refreshData } = useAppStore();

  if (!selectedForensicStudent) return null;

  const s = selectedForensicStudent;
  const isVerified = s.status === 'VERIFIED_ACTIVE';

  const handleRevoke = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/students/${s.id}/revoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Admin forensic audit revocation' })
      });
      if (res.ok) {
        await refreshData();
        setSelectedForensicStudent(null);
        showToast(`Seat slot for student ${s.student_id} revoked.`);
      }
    } catch (e: any) {
      showToast(`Error: ${e.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col border-l-2 border-slate-700 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="bg-[#0B2240] text-white p-4 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center space-x-2.5">
            <UserCheck className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">Student Forensic & Audit Dossier</h3>
              <p className="text-xs text-slate-300 font-mono">Roll: {s.student_id}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedForensicStudent(null)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 text-xs">
          
          {/* Status Badge Banner */}
          <div className={`p-3 rounded-lg border flex items-center justify-between ${
            isVerified 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            <div className="flex items-center space-x-2">
              {isVerified ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertOctagon className="w-5 h-5 text-rose-600" />
              )}
              <div>
                <span className="font-bold">{s.status}</span>
                <p className="text-[11px] opacity-80">
                  {isVerified ? 'Admitted within sanctioned quota' : 'Regulatory quarantine active'}
                </p>
              </div>
            </div>
            {s.seat_slot_id && (
              <span className="bg-emerald-200 text-emerald-900 font-mono font-bold px-2 py-0.5 rounded text-[10px]">
                {s.seat_slot_id}
              </span>
            )}
          </div>

          {/* Demographic Fingerprint Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] text-slate-500 border-b pb-1">
              National Academic Identity & Demographics
            </h4>
            <div className="grid grid-cols-2 gap-3 text-slate-700">
              <div>
                <span className="text-slate-500 block text-[10px]">12-Digit APAAR ID</span>
                <span className="font-mono font-bold text-blue-900 text-sm">{s.apaar_id}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Student Full Name</span>
                <span className="font-semibold text-slate-900">{s.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Date of Birth</span>
                <span className="font-mono">{s.dob}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Gender / Category</span>
                <span>{s.gender} &middot; {s.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Citizenship</span>
                <span className="font-semibold">{s.citizenship}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Assigned Quota Bucket</span>
                <span className="font-mono text-amber-700 font-bold">{s.quota_bucket}</span>
              </div>
            </div>
          </div>

          {/* International & Supernumerary Evidence (if applicable) */}
          {(s.passport_no || s.oci_card_no || s.sii_id) && (
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] text-amber-600 border-b pb-1">
                International Credentials (MHA e-FRRO / SII / MEA)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-700 font-mono text-[11px]">
                {s.passport_no && (
                  <div>
                    <span className="text-slate-500 block text-[10px]">Passport No:</span>
                    <span>{s.passport_no}</span>
                  </div>
                )}
                {s.sii_id && (
                  <div>
                    <span className="text-slate-500 block text-[10px]">Study In India ID:</span>
                    <span>{s.sii_id}</span>
                  </div>
                )}
                {s.oci_card_no && (
                  <div>
                    <span className="text-slate-500 block text-[10px]">OCI Card No:</span>
                    <span>{s.oci_card_no}</span>
                  </div>
                )}
                {s.visa_no && (
                  <div>
                    <span className="text-slate-500 block text-[10px]">e-FRRO Visa Ref:</span>
                    <span>{s.visa_no}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Violations Box (if any) */}
          {s.violations && s.violations.length > 0 && (
            <div className="bg-rose-50 border border-rose-300 rounded-lg p-3 space-y-2">
              <div className="flex items-center space-x-1.5 text-rose-800 font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Statutory AICTE Violations ({s.violations.length})</span>
              </div>
              {s.violations.map((v, i) => (
                <div key={i} className="bg-white p-2.5 rounded border border-rose-200 text-rose-950 text-[11px]">
                  <div className="font-mono font-bold text-rose-700">{v.code}</div>
                  <div className="mt-0.5">{v.message}</div>
                  {v.conflicting_institution && (
                    <div className="mt-1 font-semibold text-slate-700">
                      Conflicting Institution: {v.conflicting_institution}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Cryptographic W3C Credential Hash */}
          {s.cryptographic_proof && (
            <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[10px] space-y-1">
              <div className="text-amber-400 font-bold flex items-center space-x-1">
                <FileCode className="w-3.5 h-3.5" />
                <span>Ed25519 CCA Signature Token</span>
              </div>
              <div className="truncate text-slate-400">
                Token: {s.cryptographic_proof.verification_token}
              </div>
              <div className="truncate text-slate-500">
                Hash: {s.cryptographic_proof.signature_hash}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-white p-3 border-t border-slate-300 flex items-center justify-between">
          <button
            onClick={handleRevoke}
            className="flex items-center space-x-1.5 text-rose-700 hover:text-rose-800 font-semibold text-xs px-2.5 py-1.5 rounded hover:bg-rose-50 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Revoke Seat Slot</span>
          </button>

          <button
            onClick={() => setSelectedForensicStudent(null)}
            className="bg-[#0B2240] hover:bg-slate-800 text-white text-xs px-4 py-1.5 rounded font-medium transition"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
