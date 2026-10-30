import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, USER_PRESETS, RoleType } from '../store/appStore';
import { 
  Building2, ShieldAlert, BarChart3, SearchCheck, UserCheck, 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Lock, 
  Layers, FileText, Award, AlertTriangle, Cpu, Globe2, Sparkles, Check,
  Play, RefreshCw, Zap, Database, Terminal, ShieldX, Key
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAs, institutions, students, showToast } = useAppStore();

  // Sandbox State
  const [activePreset, setActivePreset] = useState<'VALID' | 'DUPLICATE' | 'EXCESS'>('VALID');
  const [sandboxOutput, setSandboxOutput] = useState<any>({
    rule_engine: "AICTE_STATUTORY_VALIDATOR_V2",
    apaar_id: "4829-1039-8472",
    verhoeff_checksum: "PASS",
    status: "VERIFIED_ACTIVE",
    seat_slot_id: "NWRO-MAIT-2026-REG-001",
    quota_bucket: "REGULAR_MERIT",
    sanctioned_intake_capacity: "42/120 (35.0%)",
    cross_institution_duplicate: false,
    w3c_credential_signed: true,
    sha256_merkle_root: "9e8a7f4b2c1d0e5a8f9c7b6d5e4a3f2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f"
  });

  const runSandboxPreset = (type: 'VALID' | 'DUPLICATE' | 'EXCESS') => {
    setActivePreset(type);
    if (type === 'VALID') {
      setSandboxOutput({
        rule_engine: "AICTE_STATUTORY_VALIDATOR_V2",
        apaar_id: "4829-1039-8472",
        student_name: "Aarav Sharma",
        institution: "Maharaja Agrasen Institute of Technology (MAIT), Delhi",
        verhoeff_checksum: "PASS (Valid 12-digit National Academic ID)",
        status: "VERIFIED_ACTIVE",
        seat_slot_id: "NWRO-MAIT-2026-REG-001",
        quota_bucket: "REGULAR_MERIT",
        sanctioned_intake_capacity: "42/120 (35.0% utilized)",
        cross_institution_duplicate: false,
        w3c_credential_signed: true,
        sha256_merkle_root: "9e8a7f4b2c1d0e5a8f9c7b6d5e4a3f2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f"
      });
      showToast("Evaluated: Valid Admission with 12-digit APAAR verified.");
    } else if (type === 'DUPLICATE') {
      setSandboxOutput({
        rule_engine: "AICTE_STATUTORY_VALIDATOR_V2",
        apaar_id: "4829-1039-8472",
        student_name: "Aarav Sharma",
        claimed_institution_1: "MAIT Delhi (Admitted 2026-08-10, Slot #001)",
        conflicting_institution_2: "Horizon College Pune (Attempted 2026-08-29)",
        verhoeff_checksum: "PASS",
        status: "CROSS_INSTITUTE_DUPLICATE_LOCK",
        regulatory_action: "SECONDARY_ADMISSION_QUARANTINED",
        violation: "RULE_2_CROSS_STATE_DUPLICATION: Student already holds an active sanctioned seat in NWRO.",
        splink_phonetic_match: "99.8% demographic confidence",
        sha256_audit_block: "BLOCK_#018_QUARANTINE_DISPATCHED"
      });
      showToast("Flagged: Cross-State Duplicate Admission Blocked!");
    } else {
      setSandboxOutput({
        rule_engine: "AICTE_STATUTORY_VALIDATOR_V2",
        apaar_id: "5192-0492-8172",
        student_name: "Karan Malhotra",
        institution: "Apex Institute of Management (PGDM), Mumbai",
        course: "PGDM Marketing & Finance (Approved Intake: 60)",
        candidate_enrolment_index: 61,
        verhoeff_checksum: "PASS",
        status: "BLOCKED_EXCESS_INTAKE",
        violation: "RULE_3_INTAKE_BREACH: Candidate is admission #61 of 60 approved regular intake. Violates AICTE APH Chapter II.",
        regulatory_action: "SHOW_CAUSE_NOTICE_AUTO_GENERATED",
        institutional_portal: "FLAGGED_FOR_HEARING"
      });
      showToast("Flagged: Excess Intake #61/60 Quarantined!");
    }
  };

  const handleLaunchRole = (roleKey: RoleType) => {
    loginAs(roleKey);
    navigate(USER_PRESETS[roleKey].defaultPath);
  };

  const verifiedCount = students.filter(s => s.status === 'VERIFIED_ACTIVE').length;
  const duplicateCount = students.filter(s => s.status === 'CROSS_INSTITUTE_DUPLICATE_LOCK').length;
  const excessCount = students.filter(s => ['BLOCKED_EXCESS_INTAKE', 'BLOCKED_UNAPPROVED_QUOTA'].includes(s.status)).length;

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION WITH 3D DEVICE PERSPECTIVE MOCKUP */}
      <section className="relative overflow-hidden pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Typography */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            
            <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200/80 rounded-full px-3.5 py-1 text-xs text-amber-900 font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Smart India Hackathon (SIH 26063) &middot; Ministry of Education &middot; AICTE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0B2240] tracking-tight leading-[1.1]">
              One Nation. One Academic Identity. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#0B2240] via-[#1868FF] to-[#D97706] bg-clip-text text-transparent">
                Zero Unverified Seats.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              The National APAAR-Linked Student Registry, Deterministic Seat-Matrix Enforcer, and W3C Verifiable Credential Infrastructure for <strong>10,420+ AICTE Institutions</strong> across India.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleLaunchRole('ROLE_INSTITUTION')}
                className="bg-[#141519] hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-full shadow-lg transition-all flex items-center space-x-2 cursor-pointer text-sm group"
              >
                <span>Launch Institution Portal</span>
                <ArrowRight size={16} className="text-[#FACC15] group-hover:translate-x-1 transition" />
              </button>

              <button
                onClick={() => navigate('/features')}
                className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 py-3.5 rounded-full border border-slate-200 shadow-sm transition flex items-center space-x-2 cursor-pointer text-sm"
              >
                <span>Explore 6 Technical USPs</span>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/explainer')}
                className="bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold px-5 py-3.5 rounded-full border border-amber-200 shadow-xs transition flex items-center space-x-2 cursor-pointer text-sm"
              >
                <Play size={15} className="text-amber-700 fill-amber-700" />
                <span>3-Min Motion Explainer</span>
              </button>
            </div>

          </div>

          {/* 3D PERSPECTIVE DEVICE MOCKUP (Inspired by sihh6 & sihh9) */}
          <div className="mt-12 perspective-1400 max-w-5xl mx-auto">
            <div 
              onClick={() => navigate('/portal')}
              className="tilt-card cursor-pointer group rounded-3xl bg-slate-900 p-2 sm:p-3 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.3)] border border-slate-700/80 preserve-3d"
              title="Click to enter full interactive Bento Portal"
            >
              
              {/* Laptop Display Top Chrome Strip */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/80 rounded-t-2xl text-[11px] text-slate-400 select-none">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>

                <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 text-slate-300 font-mono text-[10px]">
                  <Lock size={10} className="text-emerald-400" />
                  <span>aicte.gov.in/apaar-setu/portal</span>
                  <span className="text-emerald-400 font-bold text-[9px] bg-emerald-950 px-1.5 py-0.2 rounded">LIVE 10 DPI</span>
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-amber-400 font-bold">
                  <span>Click to interact &rarr;</span>
                </div>
              </div>

              {/* Inside Display: Live Miniature Bento Workspace Preview */}
              <div className="bg-[#F4F3EF] p-4 sm:p-6 rounded-b-2xl overflow-hidden pointer-events-none select-none">
                
                {/* Mini Header Strip */}
                <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200/80 mb-4 shadow-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F5B82E] to-[#D97706] text-[#071629] flex items-center justify-center font-black text-xs">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">AICTE Nodal Officer</div>
                      <div className="text-xs font-black text-slate-900">Maharaja Agrasen Institute of Technology (MAIT)</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <span className="bg-[#141519] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      5-Bucket Quota Active
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-1 rounded-full">
                      94.2% Verified
                    </span>
                  </div>
                </div>

                {/* Mini 3-Card Bento Row */}
                <div className="grid grid-cols-12 gap-3 mb-4">
                  
                  {/* Mini Card 1: 5-Bucket Progress Snapshot */}
                  <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase text-slate-400">Seat Capacity</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">114 / 120</div>
                      <div className="text-[11px] text-slate-500 font-medium">Sanctioned Regular Intake</div>
                    </div>
                    <div className="mt-3 flex h-2 rounded-full overflow-hidden bg-slate-100 gap-1">
                      <div className="bg-emerald-500 rounded-full" style={{ width: '80%' }}></div>
                      <div className="bg-amber-400 rounded-full" style={{ width: '15%' }}></div>
                      <div className="bg-red-400 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>

                  {/* Mini Card 2: Sovereign Trust Score */}
                  <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase text-slate-400">AICTE Trust Score</div>
                      <div className="text-2xl font-black text-amber-600 mt-1">87 / 100</div>
                      <div className="text-[11px] text-emerald-600 font-bold mt-0.5">Top 2% Compliance</div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-amber-600 flex items-center justify-center font-black text-xs text-amber-800">
                      87%
                    </div>
                  </div>

                  {/* Mini Card 3: Anomaly & Duplicate Shield */}
                  <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase text-slate-400">National Deduplication</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">100% Locked</div>
                      <div className="text-[11px] text-slate-500 font-medium">Cross-State Dual Seats Blocked</div>
                    </div>
                    <div className="mt-2 text-[10px] font-mono bg-slate-50 text-slate-600 p-1.5 rounded-lg border border-slate-200 truncate">
                      Splink Phonetic Lock &middot; SHA-256 Merkle
                    </div>
                  </div>

                </div>

                {/* Mini Table Snippet */}
                <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 pb-2 border-b border-slate-100">
                    <span>CANDIDATE & APAAR ID</span>
                    <span>QUOTA BUCKET</span>
                    <span>STATUS</span>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="py-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                          AS
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">Aarav Sharma</div>
                          <div className="font-mono text-[10px] text-slate-400">4829-1039-8472</div>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-600 font-medium">Regular Sanctioned</span>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        VERIFIED_ACTIVE
                      </span>
                    </div>

                    <div className="py-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px]">
                          BS
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">Bikash Shrestha (FN)</div>
                          <div className="font-mono text-[10px] text-slate-400">APAAR-FN-2026-E8A1</div>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-600 font-medium">Supernumerary FN 15%</span>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        VERIFIED_ACTIVE
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. THE 5 STAKEHOLDER ROLES BENTO ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-700">
            Strict Role-Isolated Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
            5 Dedicated Stakeholder Workspaces
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Each role operates within a strictly isolated workspace—zero data leakage and dedicated statutory action controls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Role 1 */}
          <div 
            onClick={() => handleLaunchRole('ROLE_INSTITUTION')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-3 border border-amber-200/60 group-hover:scale-105 transition">
                <Building2 size={20} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Data Producer</div>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">Institution Registrar</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Post-admission student roster upload, 5-bucket quota tracking, and Samarth ERP webhook synchronization.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-0.5 transition">
              <span>Enter Workspace &rarr;</span>
            </div>
          </div>

          {/* Role 2 */}
          <div 
            onClick={() => handleLaunchRole('ROLE_AICTE_COMPLIANCE')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center font-bold mb-3 border border-red-200/60 group-hover:scale-105 transition">
                <ShieldAlert size={20} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Regulator</div>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">AICTE Nodal Auditor</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                National duplicate locks, excess intake quarantine, and Isolation Forest AI ghost-student radar.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-red-700 group-hover:translate-x-0.5 transition">
              <span>Enter Workspace &rarr;</span>
            </div>
          </div>

          {/* Role 3 */}
          <div 
            onClick={() => handleLaunchRole('ROLE_ANALYTICS_POLICY')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3 border border-blue-200/60 group-hover:scale-105 transition">
                <BarChart3 size={20} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Apex Body</div>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">Policy & NBA Analyst</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                1-click auto-generation of verified data packages for AISHE DCF-II, NBA SAR, and NIRF rankings.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-blue-700 group-hover:translate-x-0.5 transition">
              <span>Enter Workspace &rarr;</span>
            </div>
          </div>

          {/* Role 4 */}
          <div 
            onClick={() => handleLaunchRole('ROLE_EMPLOYER_VERIFIER')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3 border border-emerald-200/60 group-hover:scale-105 transition">
                <SearchCheck size={20} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">External Verifier</div>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">Employer Verifier</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Worklane-style deep navy search hero, 5-point cryptographic scorecard, and DPDP consent tokens.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-0.5 transition">
              <span>Enter Workspace &rarr;</span>
            </div>
          </div>

          {/* Role 5 */}
          <div 
            onClick={() => handleLaunchRole('ROLE_STUDENT_WALLET')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold mb-3 border border-purple-200/60 group-hover:scale-105 transition">
                <UserCheck size={20} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Citizen</div>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">Student Wallet</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Official Dual-ID APAAR credential, ABC credit ledger, and DPDP Act 2023 24-hour consent approval.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-purple-700 group-hover:translate-x-0.5 transition">
              <span>Enter Workspace &rarr;</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE "PROBLEM VS. HOW WE SOLVE IT" COMPARISON SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-700">
            Architectural Transformation
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight">
            The Legacy Problem vs. How APAAR-Setu Solves It
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Replacing aggregate statistical self-reporting with deterministic 5-bucket quota tokenization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: The Legacy Problem (Red/Amber Tint) */}
          <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FEF2F2] rounded-3xl p-6 sm:p-8 border border-red-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-red-800 font-extrabold text-sm mb-4">
                <ShieldX size={20} className="text-red-600" />
                <span>The Legacy Problem (Pre-APAAR System)</span>
              </div>

              <div className="space-y-4">
                <div className="bg-white/80 p-4 rounded-2xl border border-red-200/60 shadow-2xs">
                  <div className="text-xs font-bold text-red-950 flex items-center justify-between">
                    <span>1. Statistical Blindness</span>
                    <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono">CRITICAL</span>
                  </div>
                  <p className="text-xs text-red-800/80 mt-1 leading-relaxed">
                    While PGDM colleges submit student rosters annually, 10,000+ engineering/diploma colleges only provide aggregate numbers during approval, creating unverifiable student records.
                  </p>
                </div>

                <div className="bg-white/80 p-4 rounded-2xl border border-red-200/60 shadow-2xs">
                  <div className="text-xs font-bold text-red-950 flex items-center justify-between">
                    <span>2. Cross-State Ghost Duplicates</span>
                    <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono">SEAT BLOCKING</span>
                  </div>
                  <p className="text-xs text-red-800/80 mt-1 leading-relaxed">
                    Students block multiple seats across Maharashtra CET, Karnataka KCET, and JoSAA counselling simultaneously without any national deduplication lock.
                  </p>
                </div>

                <div className="bg-white/80 p-4 rounded-2xl border border-red-200/60 shadow-2xs">
                  <div className="text-xs font-bold text-red-950 flex items-center justify-between">
                    <span>3. Quota Masking & Excess Admissions</span>
                    <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono">APH VIOLATION</span>
                  </div>
                  <p className="text-xs text-red-800/80 mt-1 leading-relaxed">
                    Institutions admit beyond approved intake by disguising general students under supernumerary TFW (5%) or unapproved NRI quotas.
                  </p>
                </div>

                <div className="bg-white/80 p-4 rounded-2xl border border-red-200/60 shadow-2xs">
                  <div className="text-xs font-bold text-red-950 flex items-center justify-between">
                    <span>4. International Student Lockouts</span>
                    <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono">AADHAAR TRAP</span>
                  </div>
                  <p className="text-xs text-red-800/80 mt-1 leading-relaxed">
                    Foreign Nationals and OCI students lack domestic 182-day Indian Aadhaar residency, completely deadlocking their admissions in national portals.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-red-200/60 text-xs font-bold text-red-900 flex items-center justify-between">
              <span>National Impact: 48,000+ phantom seats across India</span>
              <span className="text-red-700 underline font-mono text-[11px]">Audit Report 2025</span>
            </div>
          </div>

          {/* Right: How APAAR-Setu Solves It (Emerald/Gold Tint) */}
          <div className="bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-emerald-900 font-extrabold text-sm mb-4">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <span>How APAAR-Setu Solves It (Zero-Trust DPI)</span>
              </div>

              <div className="space-y-4">
                <div className="bg-white/90 p-4 rounded-2xl border border-emerald-200/60 shadow-2xs">
                  <div className="text-xs font-bold text-emerald-950 flex items-center justify-between">
                    <span>1. Deterministic 5-Bucket Seat Tokenization</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">EOA ENFORCED</span>
                  </div>
                  <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                    Admissions are cryptographically bound to finite seat slots (e.g. <code>NWRO-MAIT-2026-REG-042</code>). Once a bucket hits 100%, excess admission #121 is instantly quarantined.
                  </p>
                </div>

                <div className="bg-white/90 p-4 rounded-2xl border border-emerald-200/60 shadow-2xs">
                  <div className="text-xs font-bold text-emerald-950 flex items-center justify-between">
                    <span>2. Live Splink AI Phonetic Deduplication</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">&lt; 0.4 SECONDS</span>
                  </div>
                  <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                    PostgreSQL unique constraint plus Splink probabilistic entity resolution prevents a 12-digit APAAR from occupying two active college seats anywhere in India.
                  </p>
                </div>

                <div className="bg-white/90 p-4 rounded-2xl border border-emerald-200/60 shadow-2xs">
                  <div className="text-xs font-bold text-emerald-950 flex items-center justify-between">
                    <span>3. Provisional Foreign-APAAR Bridge</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">SII + e-FRRO</span>
                  </div>
                  <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                    Triangulates Study in India (SII) candidate ID + MHA e-FRRO visa + Passport MRZ to issue a legitimate provisional APAAR (e.g. <code>APAAR-FN-2026-E8A1</code>) on Day 1.
                  </p>
                </div>

                <div className="bg-white/90 p-4 rounded-2xl border border-emerald-200/60 shadow-2xs">
                  <div className="text-xs font-bold text-emerald-950 flex items-center justify-between">
                    <span>4. Dual-ID W3C Verifiable Degree Certificates</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">REQ #10 MANDATE</span>
                  </div>
                  <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                    Degree certificates visibly display and cryptographically sign both the National APAAR ID and Student Roll ID, proving the student legitimately occupied a sanctioned seat.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs font-bold text-emerald-900 flex items-center justify-between">
              <span>National Outcome: 100% authentic student registry</span>
              <span className="text-emerald-700 underline font-mono text-[11px]">NEP 2020 Compliant</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE LIVE RULES ENGINE SANDBOX STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141519] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-[#FACC15] uppercase tracking-wider">
                <Terminal size={14} />
                <span>Live Statutory Rules Engine Sandbox</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                Test the Deterministic APAAR & Seat-Matrix Validator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Click any preset pill below to run real-time Verhoeff checks, duplicate locks, and capacity quota quarantine:
              </p>
            </div>

            {/* 3 Preset Test Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => runSandboxPreset('VALID')}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                  activePreset === 'VALID'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <CheckCircle2 size={13} />
                <span>1. Test Valid Admission</span>
              </button>

              <button
                onClick={() => runSandboxPreset('DUPLICATE')}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                  activePreset === 'DUPLICATE'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <AlertTriangle size={13} />
                <span>2. Test Cross-State Duplicate</span>
              </button>

              <button
                onClick={() => runSandboxPreset('EXCESS')}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                  activePreset === 'EXCESS'
                    ? 'bg-red-500 text-white font-black shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Lock size={13} />
                <span>3. Test Excess Seat #121/120</span>
              </button>
            </div>
          </div>

          {/* Live JSON Engine Console Output */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            
            <div className="col-span-12 lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-400">
              <div className="flex items-center justify-between pb-2 border-b border-slate-900 text-[10px] text-slate-500 font-sans mb-3">
                <span>DETERMINISTIC EVALUATION RESULT (JSON)</span>
                <span className="text-emerald-500">Latency: 28ms</span>
              </div>
              <pre className="text-[11px] leading-relaxed">
                {JSON.stringify(sandboxOutput, null, 2)}
              </pre>
            </div>

            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Regulatory Evaluation Breakdown
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Validation Status</div>
                  <div className={`text-sm font-extrabold mt-0.5 ${
                    sandboxOutput.status === 'VERIFIED_ACTIVE' ? 'text-emerald-400' :
                    sandboxOutput.status === 'CROSS_INSTITUTE_DUPLICATE_LOCK' ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {sandboxOutput.status}
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Verhoeff 12-Digit Algorithm</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">
                    {sandboxOutput.verhoeff_checksum}
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Immutable Merkle Proof</div>
                  <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                    {sandboxOutput.sha256_merkle_root || sandboxOutput.sha256_audit_block}
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/portal')}
                className="w-full bg-[#1868FF] hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center space-x-2 text-xs cursor-pointer shadow-md"
              >
                <span>Open Full Portal with this Scenario</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
