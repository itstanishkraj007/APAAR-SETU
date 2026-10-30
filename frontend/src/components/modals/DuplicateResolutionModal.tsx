import React from 'react';
import { useAppStore } from '../../store/appStore';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Building2, Clock, MapPin } from 'lucide-react';

export const DuplicateResolutionModal: React.FC = () => {
  const { 
    activeDuplicateStudent, 
    setActiveDuplicateStudent, 
    resolveDuplicate, 
    issueShowCause, 
    showToast 
  } = useAppStore();

  if (!activeDuplicateStudent) return null;

  const s = activeDuplicateStudent;
  const violation = s.violations && s.violations.length > 0 ? s.violations[0] : null;

  const handleConfirmMasterSeat = async () => {
    await resolveDuplicate(s.apaar_id, s.student_id);
    setActiveDuplicateStudent(null);
  };

  const handleIssueNotice = async () => {
    await issueShowCause(
      s.institution_id,
      "CROSS_INSTITUTE_DUPLICATE_CLAIM",
      `Mandatory inquiry into duplicate enrolment attempt of candidate ${s.name} (APAAR: ${s.apaar_id})`
    );
    setActiveDuplicateStudent(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-rose-50/70">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
              <ShieldAlert size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                AICTE Regulatory Vigilance Command
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Cross-Institution Duplicate Enrolment Conflict
              </h3>
            </div>
          </div>
          <button
            onClick={() => setActiveDuplicateStudent(null)}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Candidate Dossier Bar */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Candidate Identity</span>
              <span className="text-sm font-extrabold text-slate-900">{s.name}</span>
              <span className="text-slate-500 ml-2">DOB: {s.dob} · Gender: {s.gender}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">12-Digit APAAR ID</span>
              <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                {s.apaar_id}
              </span>
            </div>
          </div>

          {/* Side-by-Side College Clash Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Valid Seat (College 1 - MAIT Delhi) */}
            <div className="bg-emerald-50/60 rounded-3xl p-5 border-2 border-emerald-300 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Primary Valid Claim
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold">10:14 AM (IST)</span>
                </div>
                <div className="font-extrabold text-sm text-slate-900">
                  {violation?.conflicting_institution || "Maharaja Agrasen Institute of Tech (MAIT)"}
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  New Delhi · AICTE ID: <code>1-451982311</code>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-emerald-200 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Seat Slot:</span>
                  <span className="font-mono font-bold text-emerald-800">{violation?.conflicting_slot || "NWRO-1-4519-REG-001"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Course:</span>
                  <span className="font-semibold text-slate-800">{violation?.conflicting_course || "B.Tech CSE"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Counselling:</span>
                  <span className="font-bold text-slate-700">JoSAA / CET Delhi (e-Signed)</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-emerald-800 font-bold flex items-center space-x-1">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Sanctioned Seat Legally Occupied</span>
                </span>
              </div>
            </div>

            {/* Conflicting Secondary Seat (College 2 - Horizon Pune) */}
            <div className="bg-rose-50/60 rounded-3xl p-5 border-2 border-rose-300 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 animate-pulse">
                    Secondary Collision (Blocked)
                  </span>
                  <span className="text-[11px] font-mono text-rose-700 font-bold">04:45 PM (IST)</span>
                </div>
                <div className="font-extrabold text-sm text-slate-900">
                  {s.institution_name}
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Pune, Maharashtra · AICTE ID: <code>{s.institution_id}</code>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-rose-200 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Claimed Roll:</span>
                  <span className="font-mono font-bold text-rose-700">{s.student_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Course:</span>
                  <span className="font-semibold text-slate-800">{s.course_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-rose-700">Locked by AICTE Parity Engine</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-rose-800 font-bold flex items-center space-x-1">
                  <AlertTriangle size={13} className="text-rose-600" />
                  <span>Section 10(k) Double Enrolment Breach</span>
                </span>
              </div>
            </div>
          </div>

          {/* Regulatory Enforcement Actions */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-slate-600">
              <span className="font-bold text-slate-900 block">Vigilance Resolution Directive:</span>
              <span>Confirming master seat retains candidate at College 1 and releases blocked slot at College 2.</span>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={handleIssueNotice}
                className="flex-1 sm:flex-initial bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Issue Show-Cause Notice
              </button>
              <button
                onClick={handleConfirmMasterSeat}
                className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                ✓ Cancel Conflicting Seat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
