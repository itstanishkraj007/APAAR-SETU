import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { 
  UserCheck, ShieldCheck, Lock, Unlock, QrCode, CreditCard, Award, 
  ExternalLink, CheckCircle2, XCircle, Clock, Building2, Download, Printer
} from 'lucide-react';

export const StudentWalletDashboard: React.FC = () => {
  const { students, toggleConsent, showToast } = useAppStore();
  const [activeTab, setActiveTab] = useState<'BADGE' | 'CONSENT' | 'CREDENTIALS'>('BADGE');

  // Primary demo student (Aarav Sharma)
  const currentStudent = students.find(s => s.apaar_id === '482910398472') || students[0];

  const [tcsConsent, setTcsConsent] = useState(true);
  const [munichConsent, setMunichConsent] = useState(false);

  const handleToggleGlobalConsent = async (granted: boolean) => {
    if (!currentStudent) return;
    await toggleConsent(currentStudent.apaar_id, granted);
  };

  if (!currentStudent) return null;

  return (
    <div className="space-y-6">
      {/* 1. Header Overview Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-900 font-extrabold flex items-center justify-center font-mono text-sm border border-amber-300">
            AS
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-900">{currentStudent.name}</h2>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                ✓ APAAR Active
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {currentStudent.course_name} · {currentStudent.institution_name}
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-100/80 p-1 rounded-2xl">
          {[
            { id: 'BADGE', label: '🪪 APAAR Card' },
            { id: 'CONSENT', label: '🔒 DPDP Consent Desk' },
            { id: 'CREDENTIALS', label: '🎓 Dual-ID Credential' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. TAB A: BADGE & ABC CREDITS */}
      {activeTab === 'BADGE' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Digital APAAR Card */}
          <div className="bg-gradient-to-br from-[#0B2240] via-[#0D2D52] to-[#071629] text-white rounded-3xl p-7 shadow-xl border-2 border-amber-500 relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  भारत सरकार &middot; Government of India
                </span>
                <span className="text-sm font-black text-white">
                  Automated Permanent Academic Account Registry (APAAR)
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-900/80 text-emerald-300 border border-emerald-600 px-2.5 py-0.5 rounded-full">
                Verhoeff Valid
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">12-Digit Permanent National ID</span>
                <span className="text-3xl font-black font-mono tracking-widest text-amber-300 mt-1 block">
                  {currentStudent.apaar_id}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-white/10 p-3 rounded-2xl backdrop-blur-xs border border-white/10">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Name:</span>
                  <span className="font-bold text-white">{currentStudent.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Institutional Roll:</span>
                  <span className="font-mono font-bold text-white">{currentStudent.student_id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Seat Slot Token:</span>
                  <span className="font-mono text-emerald-300 font-bold">{currentStudent.seat_slot_id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Admission Quota:</span>
                  <span className="font-bold text-amber-300">{currentStudent.quota_bucket.replace(/_/g, ' ')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/15 text-[11px] text-slate-300">
              <span>National Education Policy (NEP) 2020</span>
              <span className="font-mono font-bold text-amber-300">DigiLocker / ABC Linked</span>
            </div>
          </div>

          {/* Academic Bank of Credits (ABC) Snapshot */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Academic Bank of Credits (ABC)</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  142 / 160 Credits
                </span>
              </div>
              <p className="text-xs text-slate-500">Cryptographically anchored credit ledger under National Higher Education Qualifications Framework (NHEQF).</p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="font-bold text-slate-900 block">Term 1–6 Core Engineering</span>
                  <span className="text-[10px] text-slate-500">MAIT New Delhi &middot; AICTE Approved</span>
                </div>
                <span className="font-mono font-extrabold text-slate-900">124 Credits</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="font-bold text-slate-900 block">NPTEL / SWAYAM Online Electives</span>
                  <span className="text-[10px] text-slate-500">AICTE Credit Transfer Direct Recognition</span>
                </div>
                <span className="font-mono font-extrabold text-slate-900">12 Credits</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="font-bold text-slate-900 block">Industry Internship (NEP Mandate)</span>
                  <span className="text-[10px] text-slate-500">Industry Mentor Certified</span>
                </div>
                <span className="font-mono font-extrabold text-slate-900">6 Credits</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Current CGPA: <strong className="text-slate-900 font-mono">{currentStudent.cgpa}</strong></span>
              <span className="text-emerald-700 font-bold">● Eligible for Degree Award</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB B: DPDP CONSENT MANAGER */}
      {activeTab === 'CONSENT' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <Lock size={18} className="text-amber-600" />
                <h2 className="text-base font-bold text-slate-900 tracking-tight">DPDP Act 2023 Consent Manager</h2>
              </div>
              <p className="text-xs text-slate-500">Self-sovereign control over which employers or universities can decrypt your transcripts and CGPA.</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-300 px-3 py-1 rounded-full">
              Section 6 Purpose Limitation
            </span>
          </div>

          {/* Active Third-Party Verifier Requests */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-slate-900 text-sm">Tata Consultancy Services (TCS)</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">Corporate Recruiter</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Requested 24-hour verification token for B.Tech CSE degree and CGPA validation.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const newVal = !tcsConsent;
                    setTcsConsent(newVal);
                    handleToggleGlobalConsent(newVal);
                    showToast(`TCS BGV consent ${newVal ? 'GRANTED (24h token)' : 'REVOKED (Locked)'}`);
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer ${
                    tcsConsent
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {tcsConsent ? '✓ Access Granted (24h)' : 'Access Blocked'}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-slate-900 text-sm">Technical University of Munich (TUM)</span>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">International MS</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Requested academic credential transfer via Study in India (SII) / e-Sanad gateway.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const newVal = !munichConsent;
                    setMunichConsent(newVal);
                    showToast(`TUM Admission consent ${newVal ? 'GRANTED' : 'REVOKED'}`);
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer ${
                    munichConsent
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {munichConsent ? '✓ Access Granted (24h)' : 'Access Blocked'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB C: VERIFIABLE DUAL-ID CREDENTIAL */}
      {activeTab === 'CREDENTIALS' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Verifiable Academic Identity</h2>
              <p className="text-xs text-slate-500">Tamper-proof W3C standard credential signed by the AICTE Root Certificate Authority.</p>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-[#141519] hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-full transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer size={13} />
              <span>Print Official Credential</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-amber-50/40 border-2 border-amber-300 text-center space-y-4">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest block">
              Ministry of Education &middot; Government of India
            </span>
            <h3 className="text-xl font-black text-slate-900 font-serif">Aarav Sharma</h3>
            <p className="text-xs text-slate-600">
              B.Tech Computer Science &middot; Maharaja Agrasen Institute of Technology (MAIT)
            </p>

            <div className="max-w-md mx-auto bg-white p-4 rounded-2xl border border-amber-200 text-xs font-mono text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">12-Digit APAAR ID:</span>
                <span className="font-bold text-emerald-700">4829-1039-8472</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student Roll ID:</span>
                <span className="font-bold text-slate-900">MAIT-CSE-2026-001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Seat Slot:</span>
                <span className="font-bold text-blue-900">NWRO-1-4519-REG-001</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <QrCode size={56} className="text-slate-900" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
