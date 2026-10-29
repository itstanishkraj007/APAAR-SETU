import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore, USER_PRESETS, RoleType } from '../store/appStore';
import { 
  Building2, ShieldAlert, BarChart3, SearchCheck, UserCheck, 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Lock, 
  Layers, FileText, Award, AlertTriangle, Cpu, Globe2, Sparkles, Check
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAs, institutions, students } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const verifiedCount = students.filter(s => s.status === 'VERIFIED_ACTIVE').length;
  const duplicateCount = students.filter(s => s.status === 'CROSS_INSTITUTE_DUPLICATE_LOCK').length;
  const excessCount = students.filter(s => ['BLOCKED_EXCESS_INTAKE', 'BLOCKED_UNAPPROVED_QUOTA'].includes(s.status)).length;
  const totalApproved = institutions.reduce((acc, curr) => acc + curr.approved_intake, 0);

  const handleLaunchRole = (roleKey: RoleType) => {
    loginAs(roleKey);
    navigate(USER_PRESETS[roleKey].defaultPath);
  };

  const faqs = [
    {
      q: "What is the statutory requirement for APAAR ID linkage under AICTE Approval Process Handbook (APH)?",
      a: "Under the National Education Policy (NEP) 2020 and AICTE statutory guidelines, all AICTE-approved institutions must submit granular student-level enrolment linked with the 12-digit Automated Permanent Academic Account Registry (APAAR ID). This replaces aggregate statistical self-reporting and establishes an authentic national student registry."
    },
    {
      q: "How does APAAR-Setu prevent seat ghosting and excess admissions beyond sanctioned intake?",
      a: "The platform's 5-Bucket Statutory Seat Allocator automatically checks admissions against official AICTE Extension of Approval (EoA) data. Regular merit seats and NRI quota seats (max 5%) are strictly capped within approved intake, while TFW (5%), FN/OCI (15%), and PMSSS seats are tracked as supernumerary. Any candidate admitted once a bucket reaches 100% capacity is automatically quarantined as BLOCKED_EXCESS_INTAKE."
    },
    {
      q: "How does the Cross-Institution Duplicate Blocker detect dual admissions across colleges in India?",
      a: "When an institution submits an admission, the system checks whether the 12-digit APAAR is actively enrolled in any of India's 10,000+ technical colleges. If a collision is found, the secondary attempt is locked with CROSS_INSTITUTE_DUPLICATE_LOCK. In addition, an AI demographic fingerprinting engine catches students whose names were slightly altered."
    },
    {
      q: "How are Foreign Nationals and OCI students accommodated if they lack domestic Indian Aadhaar?",
      a: "Students under Foreign National, OCI, or NRI categories are exempt from Aadhaar's 182-day residency rule. The platform interfaces with the Study in India (SII) portal and MHA e-FRRO visa gateway, generating a cryptographically bound Provisional Foreign-APAAR ID (APAAR-FN-2026-XXXX) so genuine international students are never deadlocked."
    },
    {
      q: "What is the Dual-ID Degree Certificate mandate (Key Requirement #10)?",
      a: "Per statutory regulations, degree certificates issued by technical universities and PGDM institutions must visibly display and cryptographically bind both the 12-digit National APAAR ID and the Institutional Student Roll ID, plus the AICTE Sanctioned Seat Slot ID. This proves that the graduate legitimately occupied a sanctioned seat."
    },
    {
      q: "How does the system ensure compliance with the Digital Personal Data Protection (DPDP) Act 2023?",
      a: "The platform implements purpose limitation and a student self-sovereign consent manager. Third-party verifiers (employers, universities) receive masked credentials unless the student actively issues a 24-hour verification consent token from their student wallet."
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Official Government Notification Ticker */}
      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 sm:px-6 text-xs text-amber-900 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-hidden">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-amber-700 text-white font-extrabold text-[10px] px-2 py-0.5 rounded uppercase flex-shrink-0">
              AICTE MANDATE
            </span>
            <span className="font-semibold truncate">
              Mandatory submission of student-level enrolment data linked with 12-digit APAAR IDs for Academic Year 2026-27 is now active. All technical institutions must complete quota allocation verification.
            </span>
          </div>
          <Link to="/features" className="text-amber-800 font-bold underline whitespace-nowrap hidden sm:inline">
            Read Statutory Handbook &rarr;
          </Link>
        </div>
      </div>

      {/* 2. Official Hero Banner */}
      <div className="bg-gradient-to-br from-[#0B2240] via-[#0E2F59] to-[#071629] text-white border-b-4 border-[#D97706] rounded-xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        
        {/* Saffron Watermark Accent */}
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-amber-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>National Education Policy (NEP) 2020 &middot; AICTE Smart India Hackathon 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Integrated APAAR-Based Student Data Management & Verification System
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            A unified digital governance ecosystem transforming AICTE admissions: linking every enrolled student with their permanent 12-digit <strong>APAAR ID</strong>, enforcing statutory <strong>5-bucket seat quotas</strong>, locking <strong>cross-college duplicate enrolments</strong> in real time, and issuing <strong>cryptographically verifiable dual-ID degrees</strong>.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold">
            <button
              onClick={() => handleLaunchRole('ROLE_INSTITUTION')}
              className="bg-amber-500 hover:bg-amber-400 text-[#0B2240] px-5 py-3 rounded-lg shadow-md transition flex items-center space-x-2 text-sm font-bold"
            >
              <span>Launch Institution Registrar Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleLaunchRole('ROLE_AICTE_COMPLIANCE')}
              className="bg-blue-900/80 hover:bg-blue-800 text-white border border-blue-600 px-5 py-3 rounded-lg shadow-sm transition flex items-center space-x-2 text-sm font-semibold"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>AICTE Compliance & Vigilance Command</span>
            </button>

            <button
              onClick={() => handleLaunchRole('ROLE_EMPLOYER_VERIFIER')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-3 rounded-lg transition flex items-center space-x-1.5"
            >
              <SearchCheck className="w-4 h-4 text-emerald-400" />
              <span>Public Credential Verifier</span>
            </button>

            <button
              onClick={() => navigate('/explainer')}
              className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold px-4 py-3 rounded-lg transition flex items-center space-x-2 shadow-md border border-amber-400/40"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>🎬 Watch 3-Min SIH Motion Graphics Explainer</span>
            </button>
          </div>
        </div>

      </div>

      {/* 3. Real-Time National Statistical Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
        
        <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-xs">
          <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Approved National Intake</span>
          <span className="text-2xl font-bold text-[#0B2240] font-mono mt-1 block">{totalApproved}</span>
          <span className="text-[11px] text-slate-500">Across Sample AICTE Institutions</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-xs">
          <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Verified 12-Digit APAARs</span>
          <span className="text-2xl font-bold text-emerald-700 font-mono mt-1 block">{verifiedCount}</span>
          <span className="text-[11px] text-emerald-600">DigiLocker / ABC Validated</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-rose-300 bg-rose-50/30 shadow-xs">
          <span className="text-rose-700 block text-[10px] uppercase font-bold tracking-wider">Duplicate Cross-College Clashes</span>
          <span className="text-2xl font-bold text-rose-800 font-mono mt-1 block">{duplicateCount}</span>
          <span className="text-[11px] text-rose-600">Locked in Real Time</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-amber-300 bg-amber-50/30 shadow-xs">
          <span className="text-amber-700 block text-[10px] uppercase font-bold tracking-wider">Excess Intake Violations</span>
          <span className="text-2xl font-bold text-amber-800 font-mono mt-1 block">{excessCount}</span>
          <span className="text-[11px] text-amber-600">Quarantined (Section 10(k))</span>
        </div>

      </div>

      {/* 4. 1-Click Operational Role Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-300 pb-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">Multi-Role Workspaces & Direct Access</h2>
            <p className="text-xs text-slate-500">Select an operational stakeholder workspace to explore role-specific permissions and workflows:</p>
          </div>
          <Link to="/login" className="text-xs font-bold text-blue-900 hover:underline">
            View Role Matrix &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          
          {/* Card 1 */}
          <div 
            onClick={() => handleLaunchRole('ROLE_INSTITUTION')}
            className="bg-white border-2 border-slate-200 hover:border-amber-500 rounded-lg p-4 cursor-pointer transition shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 bg-blue-50 text-[#0B2240] rounded-lg flex items-center justify-center mb-2.5 group-hover:bg-amber-500 group-hover:text-white transition">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Role 1: Institution Registrar</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                MAIT Delhi / Apex PGDM portal. Ingest students via Single Entry, Bulk CSV, or Samarth Webhook.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-bold">
              <span>Launch Console</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => handleLaunchRole('ROLE_AICTE_COMPLIANCE')}
            className="bg-white border-2 border-slate-200 hover:border-amber-500 rounded-lg p-4 cursor-pointer transition shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 bg-rose-50 text-rose-800 rounded-lg flex items-center justify-center mb-2.5 group-hover:bg-amber-500 group-hover:text-white transition">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Role 2: Compliance RO / HQ</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Review cross-college duplicate locks, cancel conflicting seats, issue Show-Cause notices, and monitor AI radar.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-bold">
              <span>Launch Console</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => handleLaunchRole('ROLE_ANALYTICS_POLICY')}
            className="bg-white border-2 border-slate-200 hover:border-amber-500 rounded-lg p-4 cursor-pointer transition shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 bg-purple-50 text-purple-800 rounded-lg flex items-center justify-center mb-2.5 group-hover:bg-amber-500 group-hover:text-white transition">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Role 3: Policy & AISHE</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                National intake heatmaps, AI Policy Copilot query engine, and 1-click AISHE/NBA regulatory CSV exports.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-bold">
              <span>Launch Console</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => handleLaunchRole('ROLE_EMPLOYER_VERIFIER')}
            className="bg-white border-2 border-slate-200 hover:border-amber-500 rounded-lg p-4 cursor-pointer transition shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center mb-2.5 group-hover:bg-amber-500 group-hover:text-white transition">
                <SearchCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Role 4: Public Verifier</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Scan W3C QR credentials, inspect 5-point cryptographic scorecards, and preview official Dual-ID degree certificates.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-bold">
              <span>Launch Console</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 5 */}
          <div 
            onClick={() => handleLaunchRole('ROLE_STUDENT_WALLET')}
            className="bg-white border-2 border-slate-200 hover:border-amber-500 rounded-lg p-4 cursor-pointer transition shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 bg-amber-50 text-amber-800 rounded-lg flex items-center justify-center mb-2.5 group-hover:bg-amber-500 group-hover:text-white transition">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Role 5: Student Wallet</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Self-sovereign APAAR ID card, Academic Bank of Credits (ABC) balance, and DPDP Act 2023 consent approvals.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-bold">
              <span>Launch Console</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

        </div>
      </div>

      {/* 5. Four Architectural Pillars */}
      <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
            Architecture Blueprint
          </span>
          <h2 className="text-lg font-bold text-slate-900">The 4 Pillars of APAAR-Setu Governance</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <div className="w-7 h-7 bg-blue-100 text-[#0B2240] rounded flex items-center justify-center font-bold">1</div>
            <h4 className="font-bold text-slate-900 text-sm">Automated APAAR & Verhoeff Validation</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Every domestic admission undergoes 12-digit format and Verhoeff mathematical parity checks against DigiLocker NAD. Foreign students receive cryptographically bound Provisional APAAR-FN IDs.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <div className="w-7 h-7 bg-amber-100 text-amber-900 rounded flex items-center justify-center font-bold">2</div>
            <h4 className="font-bold text-slate-900 text-sm">5-Bucket Statutory Seat Allocator</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Enforces Approved Intake ceilings while managing supernumerary quotas (TFW 5%, FN/OCI 15%, PMSSS J&K, NRI 5%). Excess admissions are quarantined with zero active seat allotment.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <div className="w-7 h-7 bg-rose-100 text-rose-900 rounded flex items-center justify-center font-bold">3</div>
            <h4 className="font-bold text-slate-900 text-sm">Cross-Institution Duplicate Sentinel</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Catches double enrolments across all colleges in India in real time. Sequence matching algorithms catch ghost admissions under altered name spellings.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <div className="w-7 h-7 bg-emerald-100 text-emerald-900 rounded flex items-center justify-center font-bold">4</div>
            <h4 className="font-bold text-slate-900 text-sm">Dual-ID Verifiable Credentials</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Degree certificates visibly print both the National APAAR ID and Institutional Student ID, bound by Ed25519 CCA digital signatures and DPDP Act 2023 consent tokens.
            </p>
          </div>

        </div>
      </div>

      {/* 6. Regulatory FAQ Accordion */}
      <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
            Statutory FAQs
          </span>
          <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions & Legal Guidelines</h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 font-bold text-slate-900 flex items-center justify-between transition"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-3.5 bg-white text-slate-600 leading-relaxed text-[11px] border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
