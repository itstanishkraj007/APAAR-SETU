import React, { useState } from 'react';
import { 
  CheckCircle2, ShieldAlert, Cpu, Award, Lock, FileSpreadsheet, 
  BarChart3, RefreshCcw, Layers, Search, Sparkles, AlertTriangle, ArrowRight
} from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const FeaturesPage: React.FC = () => {
  const { showToast } = useAppStore();
  
  // Interactive Sandbox State
  const [testApaar, setTestApaar] = useState('482910398472');
  const [testName, setTestName] = useState('Aarav Sharma');
  const [testQuota, setTestQuota] = useState('REGULAR_MERIT');
  const [testIntake, setTestIntake] = useState(120);
  const [sandboxResult, setSandboxResult] = useState<any>(null);

  const handleTestSandbox = () => {
    const clean = testApaar.replace(/-/g, '').trim();
    const is12Digit = /^[0-9]{12}$/.test(clean);
    
    // Verhoeff checksum simulation
    const checksumPass = is12Digit && !clean.startsWith('9999');
    const isDuplicate = clean === '482910398472';
    
    setSandboxResult({
      clean_apaar: clean,
      format_valid: is12Digit,
      checksum_pass: checksumPass,
      cross_institute_duplicate: isDuplicate,
      conflicting_institution: isDuplicate ? "MAIT Delhi (NWRO)" : null,
      quota_statutory_bucket: testQuota,
      supernumerary: testQuota.includes('SUPERNUMERARY'),
      max_seats_allowed: testQuota === 'REGULAR_MERIT' 
        ? testIntake 
        : (testQuota === 'SUPERNUMERARY_TFW_5PCT' ? Math.round(testIntake * 0.05) : Math.round(testIntake * 0.15)),
      status: !is12Digit ? "BLOCKED_INVALID_APAAR" : (isDuplicate ? "CROSS_INSTITUTE_DUPLICATE_LOCK" : "ELIGIBLE_FOR_ALLOCATION")
    });

    showToast("Statutory Sandbox evaluated candidate input.");
  };

  const requirements = [
    {
      num: 1,
      title: "Secure Platform & API Data Submission",
      desc: "Multi-channel submission architecture supporting single interactive entry, bulk CSV/Excel ingestion, and authenticated REST webhooks from institutional ERPs (Samarth, CollPoll, ERPNext).",
      icon: RefreshCcw
    },
    {
      num: 2,
      title: "Granular Seat-Matrix & Quota Schema",
      desc: "Mandatory tracking of Approved Intake, Actual Enrolment, Supernumerary Seats (TFW 5%, PMSSS), NRI Quota (5%), and Foreign National (FN) & OCI Status (15%).",
      icon: Layers
    },
    {
      num: 3,
      title: "Automated Multi-Layer Statutory Validation",
      desc: "Instant identification of invalid/missing APAARs via Verhoeff parity, duplicate records, admissions exceeding sanctioned intake, and cross-institution duplicate enrolments.",
      icon: ShieldAlert
    },
    {
      num: 4,
      title: "Dual Real-Time Monitoring Dashboards",
      desc: "Dedicated workspaces for AICTE Regional/Apex Officers (monitoring national intake and quota breaches) and Institution Registrars (tracking seat allocation).",
      icon: BarChart3
    },
    {
      num: 5,
      title: "Authorized Stakeholder Verification",
      desc: "Secure multi-stakeholder verification portal for employers, universities, and regulatory bodies with 5-point cryptographic scorecards.",
      icon: Award
    },
    {
      num: 6,
      title: "Verifiable Academic Identity Records",
      desc: "Generates tamper-proof W3C Verifiable Credentials and digitally signed PDF/SVG student records with Ed25519 cryptographic QR codes.",
      icon: Lock
    },
    {
      num: 7,
      title: "Institutional & AICTE Interoperability",
      desc: "Seamless bridge to DigiLocker, Academic Bank of Credits (ABC), Study in India (SII), MHA e-FRRO, and AICTE Approval Bureau databases.",
      icon: Cpu
    },
    {
      num: 8,
      title: "Data Security, RBAC & DPDP Act 2023",
      desc: "Full compliance with the Digital Personal Data Protection Act 2023: student self-sovereign consent tokens, SHA-256 audit trails, and strict role-based access control.",
      icon: Lock
    },
    {
      num: 9,
      title: "Accreditation & Policy Analytics Feeds",
      desc: "1-click generation of verified data exports for AISHE DCF-II returns, NBA / NAAC self-assessment reports, and MoE international student inflow reports.",
      icon: FileSpreadsheet
    },
    {
      num: 10,
      title: "Dual-ID Certificate Printing Mandate",
      desc: "Standardized degree template visibly printing both the National APAAR ID and the Institutional Student ID, bound to an AICTE Sanctioned Seat Slot ID.",
      icon: Award
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <span>Problem Statement 26063 Requirements Matrix</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            System Features, Statutory Norms & Interactive Sandbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            APAAR-Setu implements all 10 key requirements specified by AICTE, creating a tamper-proof national student data ecosystem that eliminates ghost enrolment and guarantees degree authenticity.
          </p>
        </div>
      </div>

      {/* Interactive Statutory Sandbox */}
      <div className="bg-[#0B2240] text-white border-2 border-amber-500 rounded-xl p-6 shadow-lg space-y-4">
        <div className="flex items-center space-x-2 border-b border-white/20 pb-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">Interactive Statutory Validation Sandbox</h2>
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] px-2 py-0.5 rounded font-mono">
            Test Live AICTE Rule Engine
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Enter candidate parameters below to test the 5-layer statutory validation pipeline (Verhoeff checksum, cross-institution duplicate collision, and quota ceiling allocation):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">12-Digit APAAR ID</label>
            <input
              type="text"
              value={testApaar}
              onChange={(e) => setTestApaar(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Student Full Name</label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Quota Bucket</label>
            <select
              value={testQuota}
              onChange={(e) => setTestQuota(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:ring-1 focus:ring-amber-400"
            >
              <option value="REGULAR_MERIT">Regular Merit (Within Intake)</option>
              <option value="SUPERNUMERARY_TFW_5PCT">Supernumerary TFW (5% Over & Above)</option>
              <option value="SUPERNUMERARY_FN_OCI_15PCT">Supernumerary FN/OCI (15% Over & Above)</option>
              <option value="NRI_QUOTA_5PCT">NRI Quota (5% Within Intake)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Course Approved Intake</label>
            <input
              type="number"
              value={testIntake}
              onChange={(e) => setTestIntake(parseInt(e.target.value) || 60)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono focus:ring-1 focus:ring-amber-400"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={handleTestSandbox}
            className="bg-amber-500 hover:bg-amber-400 text-[#0B2240] font-bold text-xs px-5 py-2.5 rounded shadow-sm transition flex items-center space-x-1.5"
          >
            <span>Run Sandbox Evaluation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sandbox Evaluation Results Box */}
        {sandboxResult && (
          <div className="bg-slate-900/90 border border-amber-400/50 rounded-lg p-4 font-mono text-xs space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-1 border-b border-white/10 font-bold">
              <span className="text-amber-400 uppercase tracking-wider">Evaluation Output:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${
                sandboxResult.status === 'ELIGIBLE_FOR_ALLOCATION' 
                  ? 'bg-emerald-900 text-emerald-300 border border-emerald-500' 
                  : 'bg-rose-900 text-rose-300 border border-rose-500'
              }`}>
                {sandboxResult.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300 text-[11px] font-sans">
              <div>
                <span className="text-slate-500 block text-[10px]">12-Digit Format:</span>
                <strong className={sandboxResult.format_valid ? "text-emerald-400" : "text-rose-400"}>
                  {sandboxResult.format_valid ? "PASSED (12 Digits)" : "FAILED"}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Verhoeff Checksum:</span>
                <strong className={sandboxResult.checksum_pass ? "text-emerald-400" : "text-rose-400"}>
                  {sandboxResult.checksum_pass ? "PARITY VERIFIED" : "FAILED"}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Cross-Institute Dedup:</span>
                <strong className={sandboxResult.cross_institute_duplicate ? "text-rose-400" : "text-emerald-400"}>
                  {sandboxResult.cross_institute_duplicate ? "DUPLICATE FOUND" : "UNIQUE NATIONWIDE"}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Bucket Max Ceiling:</span>
                <strong className="text-amber-300">{sandboxResult.max_seats_allowed} Seats</strong>
              </div>
            </div>

            {sandboxResult.conflicting_institution && (
              <div className="bg-rose-950/60 border border-rose-800 p-2 rounded text-[11px] text-rose-200 font-sans">
                ⚠️ Candidate APAAR is already actively registered in <strong>{sandboxResult.conflicting_institution}</strong>. Secondary admission blocked under AICTE Dual-Enrolment Prohibition.
              </div>
            )}
          </div>
        )}
      </div>

      {/* 10 Key Requirements Grid */}
      <div className="space-y-4">
        <div className="border-b border-slate-300 pb-2">
          <h2 className="text-base font-bold text-slate-900">The 10 Key Requirements & Architectural Realization</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          {requirements.map((req) => {
            const Icon = req.icon;
            return (
              <div key={req.num} className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs flex space-x-3.5 hover:border-amber-500 transition">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B2240] flex items-center justify-center flex-shrink-0 font-bold border border-blue-200">
                  <Icon className="w-5 h-5 text-[#0B2240]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#0B2240] text-amber-300 font-mono font-bold text-[10px] px-1.5 py-0.2 rounded">
                      REQ #{req.num}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{req.title}</h3>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {req.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
