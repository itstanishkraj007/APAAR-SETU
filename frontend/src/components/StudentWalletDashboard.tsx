import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { RoleSidebar } from './RoleSidebar';
import { 
  UserCheck, ShieldCheck, Lock, Unlock, QrCode, CreditCard, Award, 
  ExternalLink, CheckCircle2, XCircle, Clock, Building, Download
} from 'lucide-react';

export const StudentWalletDashboard: React.FC = () => {
  const { students, toggleConsent, showToast } = useAppStore();
  const [activeTab, setActiveTab] = useState<string>('BADGE');

  // Primary demo student
  const currentStudent = students.find(s => s.apaar_id === '482910398472') || students[0];

  const [tcsConsent, setTcsConsent] = useState(true);
  const [munichConsent, setMunichConsent] = useState(false);

  const handleToggleGlobalConsent = async (granted: boolean) => {
    if (!currentStudent) return;
    await toggleConsent(currentStudent.apaar_id, granted);
  };

  if (!currentStudent) return null;

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
          <span>National Academic Depository (DigiLocker NAD)</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">Student Academic Identity & DPDP Consent Wallet</span>
          <span>/</span>
          <span className="text-amber-700 font-bold">APAAR ID: {currentStudent.apaar_id}</span>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          
          {/* TAB: BADGE */}
          {activeTab === 'BADGE' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* National APAAR ID Card */}
              <div className="bg-gradient-to-br from-[#0B2240] to-slate-900 text-white rounded-xl p-6 shadow-lg border-2 border-amber-500 relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">
                      GOVERNMENT OF INDIA
                    </span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                    ABC VERIFIED
                  </span>
                </div>

                <div className="flex space-x-4">
                  <div className="w-16 h-20 bg-slate-700 border border-white/30 rounded flex items-center justify-center text-slate-400 text-xs flex-shrink-0 font-mono">
                    PHOTO
                  </div>
                  <div className="text-xs space-y-1">
                    <h3 className="font-bold text-white text-base">{currentStudent.name}</h3>
                    <p className="text-slate-300 text-xs">{currentStudent.course_name}</p>
                    <p className="text-slate-400 text-[11px]">{currentStudent.institution_name}</p>
                    <div className="text-[11px] text-amber-300 font-mono">DOB: {currentStudent.dob}</div>
                  </div>
                </div>

                <div className="bg-white/10 border border-white/15 rounded-lg p-3 text-center font-mono">
                  <span className="text-[9px] uppercase tracking-widest text-slate-300 block font-sans">
                    12-Digit Permanent Academic Account Registry (APAAR)
                  </span>
                  <span className="text-lg font-bold tracking-widest text-amber-400">
                    {currentStudent.apaar_id.slice(0, 4)} - {currentStudent.apaar_id.slice(4, 8)} - {currentStudent.apaar_id.slice(8, 12)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-white/10 pt-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Institutional Roll ID:</span>
                    <span className="text-slate-200 font-bold">{currentStudent.student_id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Sanctioned Slot ID:</span>
                    <span className="text-emerald-300 font-bold">{currentStudent.seat_slot_id || 'UNASSIGNED'}</span>
                  </div>
                </div>
              </div>

              {/* ABC Credits & Info */}
              <div className="space-y-4">
                <div className="bg-white border border-slate-300 rounded-xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
                    <span>Academic Bank of Credits (ABC)</span>
                    <span className="text-blue-900 font-mono font-bold">142 Credits Earned</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full w-[88%]"></div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    88% of degree completion credits deposited via DigiLocker NAD ledger with cryptographically signed grade sheets.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 space-y-1.5">
                  <div className="font-bold flex items-center space-x-1.5 text-amber-900">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Statutory Admission Sanction Confirmed</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Your admission occupies AICTE Sanctioned Seat Slot <code>{currentStudent.seat_slot_id}</code> within Maharaja Agrasen Institute of Technology. This seat carries full regulatory authorization under the AICTE Act 1987.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB: CONSENT */}
          {activeTab === 'CONSENT' && (
            <div className="bg-white border border-slate-300 rounded-lg p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-[#0B2240]" />
                  <h3 className="font-bold text-slate-900 text-sm">DPDP Act 2023 Consent Manager</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Under Section 6 of the DPDP Act 2023, employers cannot view your transcripts without an active 24-hour verification token.
                </p>
              </div>

              {/* Master Switch */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 text-xs block">Global Third-Party Verification Gate</strong>
                  <span className="text-[11px] text-slate-500">Enable or disable all external background checks.</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleGlobalConsent(true)}
                    className={`text-xs px-3 py-1 rounded font-bold transition ${
                      currentStudent.dpdp_consent_granted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-700'
                    }`}
                  >
                    Consent Active
                  </button>
                  <button
                    onClick={() => handleToggleGlobalConsent(false)}
                    className={`text-xs px-3 py-1 rounded font-bold transition ${
                      !currentStudent.dpdp_consent_granted
                        ? 'bg-rose-700 text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-700'
                    }`}
                  >
                    Revoke All
                  </button>
                </div>
              </div>

              {/* Individual Requests */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Pending / Active Requests:</span>

                <div className="border border-slate-200 rounded-lg p-3.5 bg-white space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900">Tata Consultancy Services (TCS) — Onboarding Check</strong>
                    <span className="text-[10px] text-slate-500 font-mono">Expires in 18 hrs</span>
                  </div>
                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded">
                    Scope: Degree Verification, AICTE Sanctioned Seat Slot, Final CGPA (8.92).
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      {tcsConsent ? '● 24h Access Token Granted' : '○ Access Revoked'}
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() => {
                          setTcsConsent(true);
                          showToast("TCS verification consent granted for 24h.");
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
              </div>
            </div>
          )}

          {/* TAB: CREDENTIALS */}
          {activeTab === 'CREDENTIALS' && (
            <div className="bg-white border border-slate-300 rounded-lg p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="font-bold text-slate-900 text-sm">Dual-ID W3C Verifiable Credential</h3>
                <p className="text-xs text-slate-500">Download your cryptographically signed JSON-LD / QR academic credential compatible with DigiLocker.</p>
              </div>

              <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-[11px] space-y-2">
                <div className="text-amber-400 font-bold">W3C Verifiable Credential 1.0</div>
                <div className="text-slate-400">Issuer: did:gov:in:aicte-cca-esign</div>
                <div className="text-slate-400">Subject APAAR: {currentStudent.apaar_id}</div>
                <div className="text-slate-400">Student ID: {currentStudent.student_id}</div>
                <div className="text-emerald-400">Seat Slot: {currentStudent.seat_slot_id}</div>
                <div className="text-slate-500 truncate">Signature: {currentStudent.cryptographic_proof?.signature_hash || "HMAC_SHA256_CCA_ESIGN_OK"}</div>
              </div>

              <button
                onClick={() => showToast("Downloading W3C Verifiable Credential JSON-LD...")}
                className="bg-[#0B2240] text-white text-xs font-bold px-4 py-2 rounded flex items-center space-x-1.5 shadow-sm"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Signed W3C JSON-LD Credential</span>
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
