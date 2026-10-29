import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { RoleSidebar } from './RoleSidebar';
import { 
  ShieldAlert, AlertTriangle, Users, Building, ShieldCheck, XCircle, 
  FileWarning, Eye, AlertOctagon, CheckCircle2, ChevronRight, Lock, Activity, Globe2
} from 'lucide-react';

export const AICTEComplianceDashboard: React.FC = () => {
  const { 
    institutions, 
    students, 
    resolveDuplicate, 
    issueShowCause, 
    dispatchEVC, 
    freezeInstitution, 
    setSelectedForensicStudent, 
    showToast 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<string>('DUPLICATES');

  // National Aggregates
  const totalApproved = institutions.reduce((acc, curr) => acc + curr.approved_intake, 0);
  const totalVerified = students.filter(s => s.status === 'VERIFIED_ACTIVE').length;
  const duplicateLocks = students.filter(s => s.status === 'CROSS_INSTITUTE_DUPLICATE_LOCK');
  const excessViolations = students.filter(s => ['BLOCKED_EXCESS_INTAKE', 'BLOCKED_UNAPPROVED_QUOTA'].includes(s.status));
  const flaggedInstitutions = institutions.filter(i => (i.anomaly_score || 0) > 40);
  const internationalStudents = students.filter(s => ['FOREIGN_NATIONAL', 'OCI', 'NRI'].includes(s.citizenship));

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      
      {/* Zone 3: Left Sidebar */}
      <RoleSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Zone 3: Main Action Workspace */}
      <div className="flex-1 space-y-4 min-w-0">
        
        {/* Breadcrumb Bar */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono bg-white p-2.5 rounded-lg border border-slate-300 shadow-xs">
          <span>Home</span>
          <span>/</span>
          <span>AICTE Apex Council</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">Regional Vigilance & Scrutiny Directorate</span>
          <span>/</span>
          <span className="text-amber-700 font-bold">All-India Statutory Audit</span>
        </div>

        {/* National Real-Time Enrolment KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 text-xs font-sans">
          
          <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">National Approved Intake</span>
            <span className="text-lg font-bold text-[#0B2240] font-mono">{totalApproved}</span>
            <span className="text-[10px] text-slate-500 block">Across Sample Colleges</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Verified Active Admitted</span>
            <span className="text-lg font-bold text-emerald-700 font-mono">{totalVerified}</span>
            <span className="text-[10px] text-emerald-600 block">12-Digit APAAR Bound</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">National Utilization</span>
            <span className="text-lg font-bold text-blue-900 font-mono">
              {Math.round((totalVerified / Math.max(totalApproved, 1)) * 100)}%
            </span>
            <span className="text-[10px] text-slate-500 block">Statutory Fill Rate</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-rose-300 bg-rose-50/40 shadow-xs">
            <span className="text-rose-700 block text-[10px] uppercase font-bold">Duplicate APAAR Locks</span>
            <span className="text-lg font-bold text-rose-800 font-mono">{duplicateLocks.length}</span>
            <span className="text-[10px] text-rose-600 block">Cross-Institute Clashes</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-amber-300 bg-amber-50/40 shadow-xs">
            <span className="text-amber-700 block text-[10px] uppercase font-bold">Excess Intake Violations</span>
            <span className="text-lg font-bold text-amber-800 font-mono">{excessViolations.length}</span>
            <span className="text-[10px] text-amber-600 block">Over-Intake / Unapproved NRI</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-purple-200 bg-purple-50/30 shadow-xs">
            <span className="text-purple-700 block text-[10px] uppercase font-bold">High Anomaly Radar</span>
            <span className="text-lg font-bold text-purple-900 font-mono">{flaggedInstitutions.length}</span>
            <span className="text-[10px] text-purple-700 block">Flagged for EVC Visit</span>
          </div>

        </div>

        {/* Actionable Tabs Content */}
        <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs">
          
          {/* TAB: DUPLICATES */}
          {activeTab === 'DUPLICATES' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-rose-700" />
                  <h3 className="font-bold text-slate-900 text-sm">Cross-Institution Duplicate APAAR Enrolment Locks</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  When a student's 12-digit APAAR ID appears in two approved colleges simultaneously, the secondary attempt is locked. Regulators review allotment timestamps and cancel the conflicting seat.
                </p>
              </div>

              {duplicateLocks.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-lg text-slate-400 text-xs">
                  No active cross-institution duplicate locks.
                </div>
              ) : (
                duplicateLocks.map((dup) => {
                  const violation = dup.violations?.[0];
                  return (
                    <div key={dup.id} className="border-2 border-rose-300 rounded-lg bg-rose-50/20 p-4 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-rose-200 gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="bg-rose-700 text-white font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                            LOCK ACTIVE
                          </span>
                          <span className="font-bold text-slate-900 text-sm">
                            Candidate: {dup.name}
                          </span>
                          <span className="font-mono text-blue-900 text-xs font-bold">
                            (APAAR: {dup.apaar_id})
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedForensicStudent(dup)}
                            className="text-xs bg-white border border-slate-300 hover:bg-slate-50 px-3 py-1 rounded text-slate-700 font-semibold"
                          >
                            Inspect Dossier
                          </button>
                          <button
                            onClick={() => resolveDuplicate(dup.apaar_id, dup.student_id)}
                            className="text-xs bg-rose-700 hover:bg-rose-800 text-white font-bold px-3 py-1 rounded shadow-xs"
                          >
                            Cancel Conflicting Seat & Notify Registrar
                          </button>
                        </div>
                      </div>

                      {/* Side-by-Side Comparison */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
                        
                        {/* Primary Valid Institution */}
                        <div className="bg-white border border-emerald-300 rounded-lg p-3">
                          <div className="flex items-center space-x-1.5 text-emerald-800 font-bold mb-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Primary Confirmed Seat (State CET Allotment)</span>
                          </div>
                          <div className="space-y-1 text-slate-700">
                            <div><span className="text-slate-500">College:</span> <strong className="text-slate-900">{violation?.conflicting_institution || 'MAIT Delhi'}</strong></div>
                            <div><span className="text-slate-500">Sanctioned Slot ID:</span> <span className="font-mono text-emerald-700 font-bold">{violation?.conflicting_slot || 'NWRO-1-4519-2026-REG-001'}</span></div>
                            <div><span className="text-slate-500">Allotment Timestamp:</span> <span className="font-mono">2026-08-10 11:22 AM</span></div>
                            <div><span className="text-slate-500">Status:</span> <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px] font-bold">VERIFIED_ACTIVE</span></div>
                          </div>
                        </div>

                        {/* Conflicting Claim */}
                        <div className="bg-white border border-rose-300 rounded-lg p-3">
                          <div className="flex items-center space-x-1.5 text-rose-800 font-bold mb-1.5">
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span>Conflicting Secondary Claim (Attempted Double Enrolment)</span>
                          </div>
                          <div className="space-y-1 text-slate-700">
                            <div><span className="text-slate-500">Claiming College:</span> <strong className="text-slate-900">{dup.institution_name}</strong></div>
                            <div><span className="text-slate-500">Attempted Roll ID:</span> <span className="font-mono text-rose-700 font-bold">{dup.student_id}</span></div>
                            <div><span className="text-slate-500">Submission Timestamp:</span> <span className="font-mono">2026-08-29 23:51 PM</span></div>
                            <div><span className="text-slate-500">Quarantine Status:</span> <span className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded text-[10px] font-bold">{dup.status}</span></div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB: EXCESS */}
          {activeTab === 'EXCESS' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2">
                  <FileWarning className="w-4 h-4 text-amber-700" />
                  <h3 className="font-bold text-slate-900 text-sm">Excess Enrolment & Unapproved Quota Breaches</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Institutions attempting to upload students beyond their EoA Sanctioned Intake or admitting NRI/FN students without approval.
                </p>
              </div>

              {excessViolations.map((v) => (
                <div key={v.id} className="border border-amber-300 rounded-lg bg-amber-50/20 p-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-amber-200 gap-2">
                    <div>
                      <span className="bg-amber-600 text-white font-mono text-[10px] px-2 py-0.5 rounded font-bold mr-2">
                        QUOTA BREACH
                      </span>
                      <strong className="text-slate-900 text-xs">{v.institution_name}</strong>
                      <span className="text-slate-500 text-xs ml-2">({v.course_name})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => issueShowCause(v.institution_id, 'EXCESS_INTAKE_BREACH', v.violations?.[0]?.message || 'Over-intake')}
                        className="text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded shadow-xs"
                      >
                        Issue Show-Cause Notice
                      </button>
                      <button
                        onClick={() => freezeInstitution(v.institution_id)}
                        className="text-xs bg-[#0B2240] hover:bg-slate-800 text-white font-bold px-3 py-1 rounded shadow-xs"
                      >
                        Freeze Course Intake
                      </button>
                    </div>
                  </div>

                  <div className="mt-2.5 text-xs text-slate-700">
                    <div className="font-semibold text-rose-800">
                      Candidate: {v.name} ({v.student_id}) &middot; Claimed Bucket: <span className="font-mono text-slate-900">{v.quota_bucket}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 font-sans">
                      {v.violations?.[0]?.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: AI RADAR */}
          {activeTab === 'AI_RADAR' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-purple-700" />
                  <h3 className="font-bold text-slate-900 text-sm">AI Ghost-Student & Admission Anomaly Radar (Isolation Forest + SHAP)</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detects collusive behavioral patterns: midnight upload surges right before cutoff deadlines and shared mobile/bank IFSC clusters across scholarship candidates.
                </p>
              </div>

              <div className="space-y-3">
                {flaggedInstitutions.map((inst) => (
                  <div key={inst.id} className="border border-purple-200 rounded-lg p-4 bg-purple-50/20 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-purple-200 gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-purple-900 text-amber-300 font-mono font-bold text-xs px-2 py-0.5 rounded">
                            AI RISK SCORE: {inst.anomaly_score}/100
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm">{inst.name}</h4>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {inst.city}, {inst.state} ({inst.region}) &middot; Status: {inst.portal_status}
                        </span>
                      </div>

                      <button
                        onClick={() => dispatchEVC(inst.id)}
                        className="text-xs bg-purple-900 hover:bg-purple-800 text-white font-bold px-3.5 py-1.5 rounded shadow-xs flex items-center space-x-1.5"
                      >
                        <Building className="w-3.5 h-3.5 text-amber-300" />
                        <span>Dispatch EVC Inspection Team</span>
                      </button>
                    </div>

                    {/* SHAP Feature Explanations */}
                    <div className="mt-3">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        SHAP Explainability Point Attributions:
                      </span>
                      <div className="mt-1.5 space-y-1.5">
                        {inst.anomaly_reasons?.map((reason, idx) => (
                          <div key={idx} className="bg-white p-2 rounded border border-purple-100 flex items-center justify-between text-xs">
                            <span className="font-mono text-purple-950 font-semibold">{reason}</span>
                            <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">
                              HIGH CONFIDENCE
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: INTERNATIONAL AUDIT */}
          {activeTab === 'INTERNATIONAL_AUDIT' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2">
                  <Globe2 className="w-4 h-4 text-indigo-700" />
                  <h3 className="font-bold text-slate-900 text-sm">International Student (FN / OCI / NRI) Quota Audit</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verifies whether technical institutions claiming Study in India (SII) or NRI admissions hold valid AICTE EoA approvals and MHA e-FRRO visa clearances.
                </p>
              </div>

              <div className="space-y-2">
                {internationalStudents.map(s => (
                  <div key={s.id} className="p-3 bg-slate-50 rounded border flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-900">{s.name}</strong>
                      <span className="text-slate-500 ml-2 font-mono">({s.citizenship})</span>
                      <div className="text-[11px] text-slate-600">College: {s.institution_name}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-blue-900 font-bold block">{s.apaar_id}</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">e-FRRO Clearance Valid</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
