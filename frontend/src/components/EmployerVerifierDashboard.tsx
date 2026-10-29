import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { RoleSidebar } from './RoleSidebar';
import { 
  SearchCheck, QrCode, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, 
  Printer, Download, Award, FileBadge, Lock, Building, Check, ArrowRight
} from 'lucide-react';

export const EmployerVerifierDashboard: React.FC = () => {
  const { students, showToast } = useAppStore();
  const [activeTab, setActiveTab] = useState<string>('LOOKUP');
  const [searchId, setSearchId] = useState('482910398472');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);

  const handleVerify = async (idToSearch?: string, simulateCase?: string) => {
    const id = idToSearch || searchId;
    setIsVerifying(true);
    try {
      const res = await fetch('http://localhost:8000/api/verify/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: id, simulate_case: simulateCase })
      });
      if (res.ok) {
        const data = await res.json();
        setVerificationResult(data);
        showToast(data.verified ? "Verification SUCCESS: Candidate verified authentic." : "Verification FAILED: Irregularity detected.");
      }
    } catch (e: any) {
      showToast(`Verification error: ${e.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOpenCertificate = async (studentId: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/verify/certificate/${studentId}`);
      if (res.ok) {
        setCertificateData(await res.json());
        setShowCertificateModal(true);
      }
    } catch (e: any) {
      showToast(`Certificate load error: ${e.message}`);
    }
  };

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
          <span>Authorized Stakeholder Gateway</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">Background Verification & Credential Authenticator</span>
          <span>/</span>
          <span className="text-emerald-700 font-bold">5-Point Trust Scorecard</span>
        </div>

        {/* Action Desk */}
        <div className="space-y-4">
          
          {/* TAB: LOOKUP & QR SCAN */}
          {(activeTab === 'LOOKUP' || activeTab === 'QR_SCAN') && (
            <div className="bg-white border border-slate-300 rounded-lg p-5 shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter 12-Digit APAAR ID or Institutional Roll Number:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="e.g. 482910398472 or MAIT-CSE-2026-001"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-mono text-slate-900 focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    onClick={() => handleVerify()}
                    disabled={isVerifying}
                    className="bg-[#0B2240] hover:bg-slate-800 text-white font-bold text-xs px-5 py-2 rounded shadow-xs transition flex items-center space-x-1.5"
                  >
                    <SearchCheck className="w-4 h-4 text-amber-400" />
                    <span>{isVerifying ? 'Checking...' : 'Verify Credential'}</span>
                  </button>
                </div>
              </div>

              {/* QR Code Demo Scenarios */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-600 block mb-2">Simulate Quick Verification Scenarios:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => {
                      setSearchId('482910398472');
                      handleVerify('482910398472');
                    }}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded font-bold transition shadow-xs"
                  >
                    1. Valid Sanctioned-Seat Graduate
                  </button>
                  <button
                    onClick={() => {
                      setSearchId('519204928172');
                      handleVerify('519204928172', 'EXCESS_CANDIDATE');
                    }}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1.5 rounded font-bold transition shadow-xs"
                  >
                    2. Illegal Excess-Seat Candidate
                  </button>
                  <button
                    onClick={() => {
                      setSearchId('482910398472');
                      handleVerify('482910398472', 'TAMPERED_CGPA');
                    }}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 px-3 py-1.5 rounded font-bold transition shadow-xs"
                  >
                    3. Tampered CGPA Certificate
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Verification Scorecard Display */}
          {verificationResult && (
            <div className="bg-white border-2 border-slate-400 rounded-lg p-5 shadow-md space-y-4 animate-in fade-in duration-150">
              <div className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                verificationResult.verified
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div className="flex items-center space-x-3">
                  {verificationResult.verified ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-rose-600 flex-shrink-0" />
                  )}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                      AICTE Trust Scorecard
                    </span>
                    <h3 className="text-base font-bold">
                      {verificationResult.overall_status}
                    </h3>
                    {verificationResult.error_detail && (
                      <p className="text-xs text-rose-800 font-medium mt-0.5">
                        {verificationResult.error_detail}
                      </p>
                    )}
                  </div>
                </div>

                {verificationResult.verified && verificationResult.student && (
                  <button
                    onClick={() => handleOpenCertificate(verificationResult.student.student_id)}
                    className="bg-[#0B2240] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded shadow-xs transition flex items-center space-x-2 flex-shrink-0"
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>View Dual-ID Degree Certificate &rarr;</span>
                  </button>
                )}
              </div>

              {/* 5-Point Cryptographic Scorecard */}
              {verificationResult.scorecard && (
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                  <div className="p-3 bg-slate-50 border rounded text-center">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">1. APAAR Identity</span>
                    <span className="text-sm font-bold text-emerald-700 flex items-center justify-center space-x-1 mt-1">
                      <Check className="w-4 h-4" /> <span>MATCH</span>
                    </span>
                    <span className="text-[10px] text-slate-500 block">DigiLocker NAD</span>
                  </div>

                  <div className="p-3 bg-slate-50 border rounded text-center">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">2. AICTE Approval</span>
                    <span className="text-sm font-bold text-emerald-700 flex items-center justify-center space-x-1 mt-1">
                      <Check className="w-4 h-4" /> <span>APPROVED</span>
                    </span>
                    <span className="text-[10px] text-slate-500 block">EoA Verified</span>
                  </div>

                  <div className="p-3 bg-slate-50 border rounded text-center">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">3. Sanctioned Seat</span>
                    <span className={`text-sm font-bold flex items-center justify-center space-x-1 mt-1 ${
                      verificationResult.scorecard.sanctioned_seat_proof ? 'text-emerald-700' : 'text-rose-700'
                    }`}>
                      {verificationResult.scorecard.sanctioned_seat_proof ? (
                        <><Check className="w-4 h-4" /> <span>WITHIN INTAKE</span></>
                      ) : (
                        <><XCircle className="w-4 h-4" /> <span>EXCESS SEAT</span></>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-500 block">Seat Slot Proof</span>
                  </div>

                  <div className="p-3 bg-slate-50 border rounded text-center">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">4. Signature Integrity</span>
                    <span className={`text-sm font-bold flex items-center justify-center space-x-1 mt-1 ${
                      verificationResult.scorecard.pki_signature_integrity ? 'text-emerald-700' : 'text-rose-700'
                    }`}>
                      {verificationResult.scorecard.pki_signature_integrity ? (
                        <><Check className="w-4 h-4" /> <span>VALID</span></>
                      ) : (
                        <><XCircle className="w-4 h-4" /> <span>TAMPERED</span></>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-500 block">Ed25519 PKI</span>
                  </div>

                  <div className="p-3 bg-slate-50 border rounded text-center">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">5. DPDP Consent</span>
                    <span className={`text-sm font-bold flex items-center justify-center space-x-1 mt-1 ${
                      verificationResult.scorecard.dpdp_student_consent ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {verificationResult.scorecard.dpdp_student_consent ? (
                        <><Check className="w-4 h-4" /> <span>GRANTED</span></>
                      ) : (
                        <><Lock className="w-4 h-4" /> <span>REVOKED</span></>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-500 block">DPDP Act 2023</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: DPDP REQUEST */}
          {activeTab === 'DPDP_REQUEST' && (
            <div className="bg-white border border-slate-300 rounded-lg p-5 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">DPDP Act 2023 Transcript Authorization Desk</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If candidate transcripts are masked, employers can dispatch a real-time verification consent request to the candidate's national APAAR wallet.
              </p>
              <button
                onClick={() => showToast("Consent request dispatched to student's APAAR wallet.")}
                className="bg-[#0B2240] text-white text-xs font-bold px-4 py-2 rounded shadow-sm"
              >
                Send 24-Hour Consent Authorization Ping
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Degree Modal */}
      {showCertificateModal && certificateData && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-4 border-[#0B2240] rounded-lg shadow-2xl max-w-2xl w-full p-6 text-slate-900 relative">
            <div className="text-center border-2 border-amber-600 p-6 bg-[#FFFDF9] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-700">All India Council for Technical Education</h4>
              <h3 className="text-xl font-serif font-bold uppercase">Official Degree Credential</h3>
              <div className="text-lg font-bold text-[#0B2240]">{certificateData.student_profile.name}</div>
              <p className="text-xs text-slate-600">{certificateData.institutional_identity.institution_name} &middot; {certificateData.institutional_identity.course_name}</p>

              <div className="my-3 py-2 border-t border-b border-amber-300 grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="bg-slate-100 p-2 rounded">
                  <span className="text-[10px] text-slate-500 block font-sans font-bold">1. National Identity</span>
                  <span className="text-blue-900 font-bold">APAAR: {certificateData.national_identity.apaar_id}</span>
                </div>
                <div className="bg-slate-100 p-2 rounded">
                  <span className="text-[10px] text-slate-500 block font-sans font-bold">2. Institutional Roll</span>
                  <span className="text-slate-900 font-bold">{certificateData.institutional_identity.student_id}</span>
                </div>
                <div className="bg-emerald-50 p-2 rounded border border-emerald-300">
                  <span className="text-[10px] text-emerald-800 block font-sans font-bold">3. Sanctioned Seat</span>
                  <span className="text-emerald-900 font-bold">{certificateData.seat_sanction_proof.seat_slot_id}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="bg-slate-200 text-slate-800 text-xs px-3 py-1.5 rounded font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
