import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { 
  UserCheck, ShieldCheck, Lock, Unlock, QrCode, CreditCard, Award, 
  ExternalLink, CheckCircle2, XCircle, Clock, Building
} from 'lucide-react';

export const StudentWalletDashboard: React.FC = () => {
  const { students, toggleConsent, showToast } = useAppStore();

  // Pick Aarav Sharma as the primary demo student wallet
  const currentStudent = students.find(s => s.apaar_id === '482910398472') || students[0];

  const [tcsConsent, setTcsConsent] = useState(true);
  const [munichConsent, setMunichConsent] = useState(false);

  const handleToggleGlobalConsent = async (granted: boolean) => {
    if (!currentStudent) return;
    await toggleConsent(currentStudent.apaar_id, granted);
  };

  if (!currentStudent) return null;

  return (
    <div className="space-y-5">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-700">
                Student Self-Sovereign Identity & Academic Wallet
              </span>
              <span className="bg-blue-100 text-blue-900 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                DPDP Act 2023 Compliant
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">Automated Permanent Academic Account Registry (APAAR)</h2>
            <p className="text-xs text-slate-500">
              Your One Nation One Student ID: control third-party verifier access to your academic records with cryptographically signed consent tokens.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-mono">DigiLocker Linked: <strong>VERIFIED</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Column: National APAAR Student ID Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#0B2240] to-slate-900 text-white rounded-xl p-5 shadow-lg border-2 border-amber-500 relative overflow-hidden">
            
            {/* Holographic Saffron Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>

            <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full p-0.5 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#0B2240]">
                    <circle cx="50" cy="50" r="45" fill="#f8fafc" stroke="#0B2240" strokeWidth="4" />
                    <circle cx="50" cy="50" r="32" fill="none" stroke="#D97706" strokeWidth="2.5" strokeDasharray="4 2" />
                    <path d="M50 24 Q57 38 50 48 Q43 38 50 24" fill="#D97706" />
                    <path d="M36 60 Q50 54 64 60 L60 68 Q50 64 40 68 Z" fill="#0B2240" />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-amber-300 font-bold block">
                    GOVERNMENT OF INDIA
                  </span>
                  <span className="text-[11px] font-bold text-white">APAAR Identity Card</span>
                </div>
              </div>

              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                ABC ACTIVE
              </span>
            </div>

            {/* Student Photo & Demographics */}
            <div className="flex space-x-3.5 mb-4">
              <div className="w-16 h-20 bg-slate-700 border-2 border-white/30 rounded flex items-center justify-center text-slate-400 text-xs flex-shrink-0 font-mono">
                PHOTO
              </div>
              <div className="text-xs space-y-1">
                <h3 className="font-bold text-white text-sm">{currentStudent.name}</h3>
                <p className="text-slate-300 text-[11px]">{currentStudent.course_name}</p>
                <p className="text-slate-400 text-[10px]">{currentStudent.institution_name}</p>
                <div className="text-[10px] text-amber-300 font-mono">DOB: {currentStudent.dob}</div>
              </div>
            </div>

            {/* 12-Digit APAAR ID Banner */}
            <div className="bg-white/10 border border-white/15 rounded-lg p-2.5 text-center font-mono my-3">
              <span className="text-[9px] uppercase tracking-widest text-slate-300 block font-sans">
                National Academic Identity Number (APAAR)
              </span>
              <span className="text-base font-bold tracking-widest text-amber-400">
                {currentStudent.apaar_id.slice(0, 4)} - {currentStudent.apaar_id.slice(4, 8)} - {currentStudent.apaar_id.slice(8, 12)}
              </span>
            </div>

            {/* Dual Identity & Sanctioned Seat Slot */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-white/10 pt-2.5">
              <div>
                <span className="text-slate-400 block">Institutional Roll:</span>
                <span className="text-slate-200 font-bold">{currentStudent.student_id}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Sanctioned Slot:</span>
                <span className="text-emerald-300 font-bold">{currentStudent.seat_slot_id || 'UNASSIGNED'}</span>
              </div>
            </div>

          </div>

          {/* Academic Bank of Credits (ABC) Balance Card */}
          <div className="bg-white border border-slate-300 rounded-lg p-3.5 mt-3 shadow-xs text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>Academic Bank of Credits (ABC)</span>
              <span className="text-blue-900 font-mono font-bold">142 Credits Earned</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full w-[88%]"></div>
            </div>
            <p className="text-[10px] text-slate-500">
              88% of degree completion credits deposited via DigiLocker NAD ledger.
            </p>
          </div>
        </div>

        {/* Right 2 Columns: DPDP Act 2023 Consent Manager */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-[#0B2240]" />
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  DPDP Act 2023 Verification Consent Manager
                </h3>
              </div>
              <span className="text-slate-500 text-[11px] font-mono">Purpose Limitation: ACTIVE</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Under Section 6 of the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong>, external employers and universities cannot view your unmasked academic transcripts or graduation standing without your active consent token.
            </p>

            {/* Global Master Consent Switch */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between mb-4">
              <div>
                <span className="font-bold text-slate-900 text-xs">Global Third-Party Verification Status</span>
                <p className="text-[11px] text-slate-500">
                  Allow authorized background check agencies to verify your degree credentials.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleGlobalConsent(true)}
                  className={`text-xs px-3 py-1 rounded font-bold transition ${
                    currentStudent.dpdp_consent_granted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Consent Granted
                </button>
                <button
                  onClick={() => handleToggleGlobalConsent(false)}
                  className={`text-xs px-3 py-1 rounded font-bold transition ${
                    !currentStudent.dpdp_consent_granted
                      ? 'bg-rose-700 text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Revoke All
                </button>
              </div>
            </div>

            {/* Incoming Employer Requests List */}
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
              Active Verification Requests from Stakeholders:
            </h4>

            <div className="space-y-3 text-xs">
              
              {/* Request 1: TCS Background Verification */}
              <div className="border border-slate-200 rounded-lg p-3 bg-white hover:border-slate-300 transition space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-blue-900" />
                    <span className="font-bold text-slate-900">Tata Consultancy Services (TCS) — Campus Onboarding</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>Expires in 18 hrs</span>
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded">
                  <strong>Requested Scope:</strong> Degree Completion, Sanctioned Seat Verification, Final CGPA (8.92).
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    {tcsConsent ? '● Access Granted via 24h Token' : '○ Access Revoked'}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setTcsConsent(true);
                        showToast("TCS verification consent renewed for 24 hours.");
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] px-2.5 py-1 rounded font-semibold"
                    >
                      Approve (24h)
                    </button>
                    <button
                      onClick={() => {
                        setTcsConsent(false);
                        showToast("TCS verification access revoked.");
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] px-2.5 py-1 rounded font-semibold"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              </div>

              {/* Request 2: TU Munich International Admissions */}
              <div className="border border-slate-200 rounded-lg p-3 bg-white hover:border-slate-300 transition space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-purple-900" />
                    <span className="font-bold text-slate-900">Technical University of Munich (TUM) — M.Sc Admissions</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>Requested Today</span>
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded">
                  <strong>Requested Scope:</strong> Academic Bank of Credits (ABC) Transcripts & AICTE Accreditation Proof.
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-600 font-semibold">
                    {munichConsent ? '● Access Granted' : '○ Awaiting Student Authorization'}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setMunichConsent(true);
                        showToast("TU Munich credential transfer authorized.");
                      }}
                      className="bg-purple-900 hover:bg-purple-800 text-white text-[11px] px-2.5 py-1 rounded font-semibold"
                    >
                      Grant Consent
                    </button>
                    <button
                      onClick={() => {
                        setMunichConsent(false);
                        showToast("TU Munich request declined.");
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] px-2.5 py-1 rounded font-semibold"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
