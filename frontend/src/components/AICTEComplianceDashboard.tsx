import React, { useState } from 'react';
import { useAppStore, StudentRecord } from '../store/appStore';
import { 
  ShieldAlert, AlertTriangle, Users, Building2, ShieldCheck, XCircle, 
  FileWarning, Eye, AlertOctagon, CheckCircle2, ChevronRight, Lock, Activity, Globe2,
  Cpu, Flame, RefreshCw, ArrowRight, Sparkles
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
    setActiveDuplicateStudent,
    showToast 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'DUPLICATES' | 'EXCESS' | 'AI_RADAR' | 'INTERNATIONAL_AUDIT'>('DUPLICATES');
  const [searchFilter, setSearchFilter] = useState('');

  // National Aggregates
  const totalApproved = institutions.reduce((acc, curr) => acc + curr.approved_intake, 0);
  const totalVerified = students.filter(s => s.status === 'VERIFIED_ACTIVE').length;
  const duplicateLocks = students.filter(s => s.status === 'CROSS_INSTITUTE_DUPLICATE_LOCK');
  const excessViolations = students.filter(s => ['BLOCKED_EXCESS_INTAKE', 'BLOCKED_UNAPPROVED_QUOTA'].includes(s.status));
  const flaggedInstitutions = institutions.filter(i => (i.anomaly_score || 0) > 20);
  const internationalStudents = students.filter(s => ['FOREIGN_NATIONAL', 'OCI', 'NRI'].includes(s.citizenship));

  return (
    <div className="space-y-6">
      {/* 1. National Compliance KPI Row (Warm White Bento Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Approved Intake</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono-numeric mt-1 block">{totalApproved}</span>
          <span className="text-[10px] text-slate-500 font-medium">Sample Technical Colleges</span>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verified Active</span>
          <span className="text-2xl font-extrabold text-emerald-700 font-mono-numeric mt-1 block">{totalVerified}</span>
          <span className="text-[10px] text-emerald-600 font-medium">DigiLocker / ABC Confirmed</span>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-rose-200 bg-rose-50/20 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">Duplicate Clashes</span>
          <span className="text-2xl font-extrabold text-rose-800 font-mono-numeric mt-1 block">{duplicateLocks.length}</span>
          <span className="text-[10px] text-rose-600 font-bold">Locked Statewide</span>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-amber-200 bg-amber-50/20 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Excess Breaches</span>
          <span className="text-2xl font-extrabold text-amber-800 font-mono-numeric mt-1 block">{excessViolations.length}</span>
          <span className="text-[10px] text-amber-600 font-bold">Quarantined (#61/60)</span>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">High-Risk Colleges</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono-numeric mt-1 block">{flaggedInstitutions.length}</span>
          <span className="text-[10px] text-slate-500 font-medium">Anomaly Score &gt; 20</span>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">International Cohort</span>
          <span className="text-2xl font-extrabold text-cyan-800 font-mono-numeric mt-1 block">{internationalStudents.length}</span>
          <span className="text-[10px] text-cyan-700 font-medium">SII / e-FRRO Verified</span>
        </div>
      </div>

      {/* 2. Section Navigation Tabs */}
      <div className="flex items-center space-x-2 bg-slate-100/80 p-1.5 rounded-2xl overflow-x-auto scrollbar-none w-fit">
        {[
          { id: 'DUPLICATES', label: `🚨 Duplicate Locks (${duplicateLocks.length})` },
          { id: 'EXCESS', label: `⚠️ Excess Intake Quarantines (${excessViolations.length})` },
          { id: 'AI_RADAR', label: `⚡ AI Anomaly & SHAP Radar (${flaggedInstitutions.length})` },
          { id: 'INTERNATIONAL_AUDIT', label: `🌐 Foreign National & NRI Quotas (${internationalStudents.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. TAB CONTENT */}
      {/* TAB A: DUPLICATE LOCKS */}
      {activeTab === 'DUPLICATES' && (
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Active Cross-Institution Duplicate Queue</h2>
              <p className="text-xs text-slate-500">Detects identical 12-digit APAAR IDs or &gt;94% phonetic fuzzy identity matches across multiple colleges.</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-rose-50 text-rose-800 border border-rose-300 px-3 py-1 rounded-full">
              Real-Time Deduplication Guard
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">12-Digit APAAR</th>
                  <th className="py-3 px-3">Primary Admitted College</th>
                  <th className="py-3 px-3">Conflicting Secondary Claim</th>
                  <th className="py-3 px-3 text-right">Regulatory Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {duplicateLocks.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-[10px] text-slate-400">DOB: {s.dob} · Gender: {s.gender}</div>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-rose-700">
                      {s.apaar_id}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-emerald-800">MAIT New Delhi</div>
                      <div className="text-[10px] font-mono text-slate-500">Slot: NWRO-1-4519-REG-001 (10:14 AM)</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-rose-700">{s.institution_name}</div>
                      <div className="text-[10px] font-mono text-slate-500">Roll: {s.student_id} (04:45 PM)</div>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => setActiveDuplicateStudent(s)}
                        className="bg-[#141519] hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-full text-xs shadow-xs transition cursor-pointer"
                      >
                        Open Resolution Console &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB B: EXCESS INTAKE QUARANTINES */}
      {activeTab === 'EXCESS' && (
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Section 10(k) Excess Enrolment Quarantine Desk</h2>
              <p className="text-xs text-slate-500">Admissions submitted beyond AICTE Extension of Approval (EoA) approved capacity.</p>
            </div>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
              Statutory Quota Breach
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Institution</th>
                  <th className="py-3 px-3">Approved Cap</th>
                  <th className="py-3 px-3">Submitted Candidate</th>
                  <th className="py-3 px-3">12-Digit APAAR</th>
                  <th className="py-3 px-3">Breach Status</th>
                  <th className="py-3 px-3 text-right">Enforcement Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {excessViolations.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900">{s.institution_name}</div>
                      <div className="text-[10px] text-slate-500">ID: {s.institution_id}</div>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-700">
                      60 Seats
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">
                      {s.name} ({s.student_id})
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-700">
                      {s.apaar_id}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-800 border border-rose-300">
                        <span>Excess Candidate #61</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => issueShowCause(s.institution_id, "EXCESS_INTAKE_BREACH", "Candidate #61 admitted beyond 60 approved seats.")}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded-full text-[11px] transition cursor-pointer"
                        >
                          Issue Notice
                        </button>
                        <button
                          onClick={() => freezeInstitution(s.institution_id)}
                          className="bg-rose-700 hover:bg-rose-800 text-white font-bold px-3 py-1 rounded-full text-[11px] transition cursor-pointer"
                        >
                          Freeze Intake
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB C: AI ANOMALY RADAR */}
      {activeTab === 'AI_RADAR' && (
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Isolation Forest Anomaly Radar & SHAP Values</h2>
              <p className="text-xs text-slate-500">Unsupervised statistical model flagging ghost-student clusters, shared phone/bank prefixes, and midnight cutoff dumps.</p>
            </div>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-300">
              SHAP Explanations Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flaggedInstitutions.map((inst) => (
              <div
                key={inst.id}
                className="rounded-3xl p-5 border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-slate-900">{inst.name}</span>
                    <span className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full ${inst.anomaly_score > 50 ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}`}>
                      Risk Score: {inst.anomaly_score}/100
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    AICTE ID: {inst.id} · Region: {inst.region} · Course: {inst.course_name}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Explainable SHAP Triggers:</span>
                  {inst.anomaly_reasons && inst.anomaly_reasons.map((r, i) => (
                    <div key={i} className="text-slate-700 font-medium flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"></span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => dispatchEVC(inst.id)}
                    className="bg-[#141519] hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-full text-xs shadow-xs transition cursor-pointer"
                  >
                    Dispatch Expert Visiting Committee (EVC)
                  </button>
                  <button
                    onClick={() => freezeInstitution(inst.id)}
                    className="text-xs font-bold text-rose-700 hover:underline cursor-pointer"
                  >
                    Freeze Portal Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB D: INTERNATIONAL AUDIT */}
      {activeTab === 'INTERNATIONAL_AUDIT' && (
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Foreign National, OCI & NRI Quota Scrutiny</h2>
              <p className="text-xs text-slate-500">Cross-verifies Study in India (SII) tokens, MHA e-FRRO student visas, and MEA OCI registrations.</p>
            </div>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-300">
              100% Interoperable
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {internationalStudents.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedForensicStudent(s)}
                className="rounded-3xl p-4 border border-slate-200 bg-white hover:border-slate-400 transition cursor-pointer flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-slate-900">{s.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                      {s.citizenship}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">{s.institution_name}</div>
                </div>

                <div className="my-3 bg-slate-50 rounded-2xl p-2.5 text-[11px] font-mono space-y-1">
                  <div>APAAR: <strong className="text-cyan-800">{s.apaar_id}</strong></div>
                  <div>Passport: {s.passport_no || 'Verified on e-Sanad'}</div>
                  <div>SII Token: {s.sii_id || 'SII-2026-ACTIVE'}</div>
                </div>

                <div className="text-[11px] font-bold text-blue-700 flex items-center justify-between pt-2 border-t border-slate-100">
                  <span>DPI Triangulation OK</span>
                  <span>View Dossier &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
