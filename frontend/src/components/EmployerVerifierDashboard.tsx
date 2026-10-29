import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { 
  SearchCheck, QrCode, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, 
  Printer, Download, Award, FileBadge, Lock, Building, Check
} from 'lucide-react';

export const EmployerVerifierDashboard: React.FC = () => {
  const { students, showToast } = useAppStore();
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

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-5">
      
      {/* Top Verifier Banner */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-700">
                Authorized Stakeholder Verification Console
              </span>
              <span className="bg-emerald-100 text-emerald-900 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                Employers &middot; Universities &middot; Embassies
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">Dual-ID Academic Credential & Sanctioned Seat Verifier</h2>
            <p className="text-xs text-slate-500">
              Validates student credentials against the national APAAR registry and proves the candidate was admitted within AICTE sanctioned intake.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-mono">PKI Standard: <strong>CCA Ed25519</strong></span>
          </div>
        </div>
      </div>

      {/* Verification Search & Simulation Bar */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-4">
        
        {/* Search Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Search by 12-Digit APAAR ID or Institutional Student Roll ID:
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

        {/* Quick QR Simulation Triggers for Video Demo */}
        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-semibold">
            <QrCode className="w-4 h-4 text-amber-600" />
            <span>Simulate QR Code Scan:</span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => {
                setSearchId('482910398472');
                handleVerify('482910398472');
              }}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded font-bold transition shadow-xs"
            >
              1. Valid Sanctioned-Seat Graduate
            </button>

            <button
              onClick={() => {
                setSearchId('519204928172');
                handleVerify('519204928172', 'EXCESS_CANDIDATE');
              }}
              className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1 rounded font-bold transition shadow-xs"
            >
              2. Illegal Excess-Seat Candidate
            </button>

            <button
              onClick={() => {
                setSearchId('482910398472');
                handleVerify('482910398472', 'TAMPERED_CGPA');
              }}
              className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 px-3 py-1 rounded font-bold transition shadow-xs"
            >
              3. Tampered CGPA Certificate
            </button>
          </div>
        </div>

      </div>

      {/* Verification Scorecard Display */}
      {verificationResult && (
        <div className="bg-white border-2 border-slate-400 rounded-lg p-5 shadow-md space-y-4 animate-in fade-in duration-200">
          
          {/* Main Status Header */}
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

          {/* 5-Point Cryptographic Verification Scorecard */}
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

          {/* Student Profile Snapshot (if verified) */}
          {verificationResult.student && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] text-slate-500 border-b pb-1 mb-2">
                Candidate Verified Record Details
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-700">
                <div>
                  <span className="text-slate-500 block text-[10px]">Candidate Full Name:</span>
                  <strong className="text-slate-900 text-sm">{verificationResult.student.name}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">National APAAR ID:</span>
                  <span className="font-mono font-bold text-blue-900">{verificationResult.student.apaar_id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Institutional Roll ID:</span>
                  <span className="font-mono font-semibold text-slate-800">{verificationResult.student.student_id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Sanctioned Seat Slot:</span>
                  <span className="font-mono font-bold text-emerald-800">
                    {verificationResult.student.seat_slot_id || 'UNSANCTIONED'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Institution:</span>
                  <span className="font-medium text-slate-900">{verificationResult.student.institution_name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Program / Course:</span>
                  <span className="font-medium text-slate-900">{verificationResult.student.course_name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Academic Standing (CGPA):</span>
                  <span className="font-bold text-slate-900 font-mono">{verificationResult.student.cgpa} / 10.0</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Graduation Status:</span>
                  <span className="font-semibold text-emerald-700">{verificationResult.student.degree_awarded}</span>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Official Dual-ID Degree Certificate Modal (Key Requirement #10) */}
      {showCertificateModal && certificateData && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-4 border-[#0B2240] rounded-lg shadow-2xl max-w-3xl w-full p-6 text-slate-900 relative">
            
            {/* Modal Controls */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 print:hidden">
              <button
                onClick={handlePrintCertificate}
                className="bg-[#0B2240] hover:bg-slate-800 text-white text-xs px-3 py-1.5 rounded font-bold flex items-center space-x-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs px-3 py-1.5 rounded font-bold"
              >
                Close
              </button>
            </div>

            {/* Official Certificate Border & Content */}
            <div className="border-2 border-amber-600 p-8 text-center relative bg-[#FFFDF9]">
              
              {/* Emblem Header */}
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 bg-white rounded-full p-1 border-2 border-amber-500 shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#0B2240]">
                    <circle cx="50" cy="50" r="45" fill="#f8fafc" stroke="#0B2240" strokeWidth="4" />
                    <circle cx="50" cy="50" r="32" fill="none" stroke="#D97706" strokeWidth="2.5" strokeDasharray="4 2" />
                    <path d="M50 24 Q57 38 50 48 Q43 38 50 24" fill="#D97706" />
                    <path d="M36 60 Q50 54 64 60 L60 68 Q50 64 40 68 Z" fill="#0B2240" />
                    <circle cx="50" cy="50" r="5" fill="#1E3A8A" />
                  </svg>
                </div>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-700">
                All India Council for Technical Education (AICTE)
              </h4>
              <p className="text-[11px] text-slate-600">
                In Conjunction with {certificateData.institutional_identity.institution_name}
              </p>

              <h2 className="text-xl font-serif font-bold text-slate-900 mt-4 uppercase tracking-wider">
                Official Degree & Academic Credential
              </h2>

              <p className="text-xs text-slate-600 mt-3 italic">
                This is to certify that the undermentioned candidate has successfully completed the program of study within an AICTE sanctioned intake slot:
              </p>

              <h3 className="text-xl font-bold text-[#0B2240] mt-3">
                {certificateData.student_profile.name}
              </h3>

              <p className="text-xs text-slate-700 mt-1">
                for the degree of <strong>{certificateData.institutional_identity.course_name}</strong> with Cumulative Grade Point Average of <strong>{certificateData.student_profile.cgpa}</strong>.
              </p>

              {/* DUAL-IDENTIFIER MANDATE (Key Requirement #10) */}
              <div className="mt-6 pt-4 border-t border-b border-amber-300 py-3 grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="bg-slate-100 p-2 rounded">
                  <span className="text-[10px] text-slate-500 uppercase block font-sans font-bold">1. National Identity</span>
                  <span className="text-blue-900 font-bold">APAAR: {certificateData.national_identity.apaar_id}</span>
                </div>
                <div className="bg-slate-100 p-2 rounded">
                  <span className="text-[10px] text-slate-500 uppercase block font-sans font-bold">2. Institutional Identity</span>
                  <span className="text-slate-900 font-bold">Roll: {certificateData.institutional_identity.student_id}</span>
                </div>
                <div className="bg-emerald-50 p-2 rounded border border-emerald-300">
                  <span className="text-[10px] text-emerald-800 uppercase block font-sans font-bold">3. Sanctioned Seat Slot</span>
                  <span className="text-emerald-900 font-bold">{certificateData.seat_sanction_proof.seat_slot_id}</span>
                </div>
              </div>

              {/* QR Code & Digital Signature Footer */}
              <div className="mt-6 flex items-center justify-between text-left text-xs">
                
                {/* W3C QR Code Representation */}
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-white border border-slate-400 p-1 rounded shadow-xs flex items-center justify-center font-mono text-[8px] text-slate-500">
                    {/* Simulated SVG QR pattern */}
                    <div className="w-full h-full bg-slate-900 p-1 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-3.5 h-3.5 bg-white"></div>
                        <div className="w-3.5 h-3.5 bg-white"></div>
                      </div>
                      <div className="flex justify-center text-[7px] text-white font-bold">VC-QR</div>
                      <div className="flex justify-between">
                        <div className="w-3.5 h-3.5 bg-white"></div>
                        <div className="w-2 h-2 bg-amber-400"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">W3C Verifiable Credential</span>
                    <p className="text-[10px] font-mono text-slate-700 truncate max-w-xs">
                      Token: {certificateData.cryptographic_proof.verification_token}
                    </p>
                    <span className="text-[9px] text-emerald-700 font-bold block">
                      Cryptographically Signed &middot; Ed25519
                    </span>
                  </div>
                </div>

                {/* Signatory Seals */}
                <div className="text-right">
                  <div className="font-serif italic font-bold text-slate-800 text-sm">
                    Prof. Member Secretary
                  </div>
                  <span className="text-[10px] text-slate-500 block">
                    All India Council for Technical Education, New Delhi
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    Signed: {certificateData.cryptographic_proof.signed_at}
                  </span>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
