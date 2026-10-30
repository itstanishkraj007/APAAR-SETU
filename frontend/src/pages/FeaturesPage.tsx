import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { 
  CheckCircle2, ShieldAlert, Cpu, Award, Lock, FileSpreadsheet, 
  BarChart3, RefreshCcw, Layers, Search, Sparkles, AlertTriangle, ArrowRight,
  Sliders, ShieldCheck, Globe2, FileText, Database, Check, SlidersHorizontal,
  ExternalLink, Download
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, setIsAdapterModalOpen, exportDataPackage } = useAppStore();

  // Interactive 5-Bucket Capacity Simulator Slider State
  const [sanctionedIntake, setSanctionedIntake] = useState<number>(120);

  // Calculations for 5 buckets per AICTE APH Chapter II:
  const regularMerit = sanctionedIntake;
  const nriQuotaMax = Math.round(sanctionedIntake * 0.05); // Within sanctioned intake
  const tfwSupernumerary = Math.round(sanctionedIntake * 0.05); // Over and above
  const fnOciSupernumerary = Math.round(sanctionedIntake * 0.15); // Over and above
  const pmsssSupernumerary = 2; // Fixed central allocation
  const totalMaxCapacity = regularMerit + tfwSupernumerary + fnOciSupernumerary + pmsssSupernumerary;

  return (
    <div className="space-y-16 pb-20">
      
      {/* Page Header */}
      <div className="text-center max-w-4xl mx-auto space-y-3 pt-6">
        <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200/80 rounded-full px-3.5 py-1 text-xs text-amber-900 font-semibold shadow-xs">
          <span>AICTE Statutory Alignment &middot; Approval Process Handbook (APH)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B2240] tracking-tight">
          System Features, USPs & Regulatory Solvers
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Comprehensive deep-dive into how APAAR-Setu solves statistical blindness, enforces mathematical seat quotas, and delivers zero-trust verifiable credentials.
        </p>
      </div>

      {/* SECTION A: THE 4 CORE REGULATORY PROBLEMS SOLVED (WITH MATH CALLOUTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Section A</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight mt-1">
            4 Core Regulatory Problems Solved
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quantified before/after breakdown of the major admission fraud vectors addressed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Problem 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                  PROBLEM #1
                </span>
                <span className="text-xs font-bold text-slate-400">Statistical Blindness</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mt-2">
                Self-Reported Aggregate Numbers vs. Authentic Student Rosters
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Currently, 10,000+ engineering and diploma institutions only report aggregate headcount during the annual AICTE EoA approval cycle. No individual student identities are registered, making post-admission verification impossible.
              </p>
            </div>

            {/* Before / After Math Box */}
            <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-red-700 font-bold">Legacy: 10,420 institutions &times; 0 verified student IDs</span>
                <span className="text-red-600 font-extrabold">Blindness</span>
              </div>
              <div className="h-px bg-slate-200"></div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-700 font-bold">APAAR-Setu: 100% Student-Level 12-digit APAAR mapping</span>
                <span className="text-emerald-600 font-extrabold">100% Verifiable</span>
              </div>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                  PROBLEM #2
                </span>
                <span className="text-xs font-bold text-slate-400">Cross-State Duplication</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mt-2">
                Multi-State Seat Blocking & Phantom Enrolment
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Students regularly hold active seats in JoSAA (IIT/NIT), Maharashtra MHT-CET, Karnataka COMEDK, and institutional spot admissions simultaneously. Seats go wasted when admissions close.
              </p>
            </div>

            {/* Before / After Math Box */}
            <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-red-700 font-bold">Legacy: 48,000+ unvacated phantom seats annually</span>
                <span className="text-red-600 font-extrabold">3-6 Weeks</span>
              </div>
              <div className="h-px bg-slate-200"></div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-700 font-bold">APAAR-Setu: Splink AI Deduplication & Cross-State Lock</span>
                <span className="text-emerald-600 font-extrabold">&lt; 0.4 Seconds</span>
              </div>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                  PROBLEM #3
                </span>
                <span className="text-xs font-bold text-slate-400">Quota Masking</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mt-2">
                Illegal Excess Admissions Beyond Sanctioned Intake
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Colleges admit general students beyond sanctioned intake by misclassifying them under NRI quota or supernumerary TFW seats without AICTE approval letters, causing legal disqualification of degrees.
              </p>
            </div>

            {/* Before / After Math Box */}
            <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-red-700 font-bold">Admitted (138) - Approved (120) = +18 Illegal Seats</span>
                <span className="text-red-600 font-extrabold">Undetected</span>
              </div>
              <div className="h-px bg-slate-200"></div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-700 font-bold">5-Bucket Tokenizer: Seat #121 Quarantined at Gateway</span>
                <span className="text-emerald-600 font-extrabold">Auto-Blocked</span>
              </div>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded">
                  PROBLEM #4
                </span>
                <span className="text-xs font-bold text-slate-400">International Deadlock</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mt-2">
                Aadhaar 182-Day Residency Lockout for FN / OCI
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Section 3(1) of the Aadhaar Act prohibits non-residents from acquiring Aadhaar until residing in India for 182 days. First-year foreign nationals cannot generate domestic APAARs, stalling enrolment.
              </p>
            </div>

            {/* Before / After Math Box */}
            <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-red-700 font-bold">Legacy: Foreign admissions halted pending Aadhaar</span>
                <span className="text-red-600 font-extrabold">6 Month Lag</span>
              </div>
              <div className="h-px bg-slate-200"></div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-700 font-bold">Provisional Foreign-APAAR via SII + e-FRRO on Day 1</span>
                <span className="text-emerald-600 font-extrabold">Instant Valid</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION B: INTERACTIVE BENTO GRID OF OUR 6 TECHNICAL USPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Section B</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight mt-1">
            6 Technical USPs of APAAR-Setu
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Engineered specifically to fulfill AICTE Problem Statement PS26063 requirements.
          </p>
        </div>

        {/* USP 1: 5-Bucket Seat Allocator with Live Interactive Slider */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-200/60 mb-2">
                <SlidersHorizontal size={14} />
                <span>USP 1 &middot; Interactive Capacity Engine</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Deterministic 5-Bucket Statutory Seat-Slot Allocator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Adjust the sanctioned intake slider below to see how AICTE statutory rules dynamically calculate Regular Intake, NRI Quota caps, Supernumerary TFW (5%), Foreign National/OCI (15%), and PMSSS central scholarships.
              </p>
            </div>

            {/* Interactive Slider Input */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0 w-full lg:w-80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Sanctioned Regular Intake:</span>
                <span className="text-base font-black text-[#1868FF] font-mono">{sanctionedIntake} Seats</span>
              </div>
              <input
                type="range"
                min="60"
                max="240"
                step="30"
                value={sanctionedIntake}
                onChange={(e) => setSanctionedIntake(parseInt(e.target.value))}
                className="w-full accent-[#1868FF] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>60</span>
                <span>120</span>
                <span>180</span>
                <span>240</span>
              </div>
            </div>
          </div>

          {/* 5-Bucket Dynamic Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Bucket 1: Regular Merit</div>
              <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{regularMerit}</div>
              <div className="text-[10px] text-slate-500 mt-1">Open, SC, ST, OBC, EWS</div>
              <div className="mt-2 text-[9px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full inline-block">
                Within Intake
              </div>
            </div>

            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60">
              <div className="text-[10px] font-bold text-amber-800 uppercase">Bucket 2: NRI Quota (5%)</div>
              <div className="text-2xl font-black text-amber-900 mt-1 font-mono">{nriQuotaMax}</div>
              <div className="text-[10px] text-amber-700 mt-1">Max 5% within regular</div>
              <div className="mt-2 text-[9px] bg-amber-200 text-amber-800 font-bold px-2 py-0.5 rounded-full inline-block">
                EoA NRI Required
              </div>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/60">
              <div className="text-[10px] font-bold text-emerald-800 uppercase">Bucket 3: TFW (5%)</div>
              <div className="text-2xl font-black text-emerald-900 mt-1 font-mono">+{tfwSupernumerary}</div>
              <div className="text-[10px] text-emerald-700 mt-1">Tuition Fee Waiver</div>
              <div className="mt-2 text-[9px] bg-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded-full inline-block">
                Supernumerary
              </div>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200/60">
              <div className="text-[10px] font-bold text-purple-800 uppercase">Bucket 4: FN / OCI (15%)</div>
              <div className="text-2xl font-black text-purple-900 mt-1 font-mono">+{fnOciSupernumerary}</div>
              <div className="text-[10px] text-purple-700 mt-1">Foreign Nationals</div>
              <div className="mt-2 text-[9px] bg-purple-200 text-purple-800 font-bold px-2 py-0.5 rounded-full inline-block">
                Supernumerary
              </div>
            </div>

            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/60 col-span-2 sm:col-span-1">
              <div className="text-[10px] font-bold text-blue-800 uppercase">Bucket 5: PMSSS</div>
              <div className="text-2xl font-black text-blue-900 mt-1 font-mono">+{pmsssSupernumerary}</div>
              <div className="text-[10px] text-blue-700 mt-1">J&K / Ladakh Central</div>
              <div className="mt-2 text-[9px] bg-blue-200 text-blue-800 font-bold px-2 py-0.5 rounded-full inline-block">
                Central Quota
              </div>
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
            <span>Total Statutory Intake Capacity for {sanctionedIntake} Intake:</span>
            <span className="font-mono font-bold text-slate-900 text-sm">
              {regularMerit} regular + {tfwSupernumerary + fnOciSupernumerary + pmsssSupernumerary} supernumerary = {totalMaxCapacity} Max Admissible Students
            </span>
          </div>
        </div>

        {/* USPs 2 to 6 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* USP 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold mb-3 border border-purple-200/60">
                <Globe2 size={20} />
              </div>
              <span className="text-[10px] font-mono bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                USP #2
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-2">
                Provisional Foreign-APAAR Bridge
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connects directly to Ministry of Education's <strong>Study in India (SII)</strong> portal and Ministry of Home Affairs' <strong>e-FRRO</strong> visa verification gateway. Generates provisional APAAR IDs for Year-1 Foreign Nationals and OCI students, bypassing domestic Aadhaar limitations.
              </p>
            </div>
            <div className="mt-4 text-[11px] font-mono bg-purple-50 text-purple-900 p-2 rounded-xl border border-purple-200/60">
              Format: APAAR-FN-2026-E8A1
            </div>
          </div>

          {/* USP 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3 border border-emerald-200/60">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                USP #3
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-2">
                Dual-Layer National Deduplication
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Combines strict <strong>PostgreSQL unique constraints</strong> on 12-digit APAAR IDs with probabilistic <strong>Splink entity resolution</strong>. Identifies students who attempt to manipulate their name spelling across different state counselling bodies.
              </p>
            </div>
            <div className="mt-4 text-[11px] font-mono bg-emerald-50 text-emerald-900 p-2 rounded-xl border border-emerald-200/60">
              Detection Latency: &lt; 0.4 seconds
            </div>
          </div>

          {/* USP 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center font-bold mb-3 border border-red-200/60">
                <Cpu size={20} />
              </div>
              <span className="text-[10px] font-mono bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                USP #4
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-2">
                Explainable AI Ghost-Student Radar
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Unsupervised <strong>Isolation Forest</strong> machine learning coupled with <strong>SHAP feature attributions</strong> detects suspicious admission velocity spikes (e.g. 40 students uploaded between 11:30 PM and 11:59 PM on cutoff day) and clustered contact prefixes.
              </p>
            </div>
            <div className="mt-4 text-[11px] font-mono bg-red-50 text-red-900 p-2 rounded-xl border border-red-200/60">
              SHAP Explanations + Spot Audit Flagging
            </div>
          </div>

          {/* USP 5 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-3 border border-amber-200/60">
                <Award size={20} />
              </div>
              <span className="text-[10px] font-mono bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                USP #5
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-2">
                Dual-ID W3C Verifiable Degree Certificates
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Directly fulfills AICTE Key Requirement #10. Degree certificates cryptographically bind the National 12-digit APAAR ID with the Institutional Student Roll Number and AICTE Sanctioned Seat Slot ID, preventing fake degrees.
              </p>
            </div>
            <div className="mt-4 text-[11px] font-mono bg-amber-50 text-amber-900 p-2 rounded-xl border border-amber-200/60">
              W3C Standard &middot; Ed25519 Signatures
            </div>
          </div>

          {/* USP 6 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3 border border-blue-200/60">
                <FileSpreadsheet size={20} />
              </div>
              <span className="text-[10px] font-mono bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                USP #6
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-2">
                1-Click Auto-Reporting (AISHE / NBA / NIRF)
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Eliminates manual survey preparation. Automatically aggregates admitted cohort data into official Ministry of Education <strong>AISHE DCF-II</strong> returns, <strong>NBA Self-Assessment Reports (Criterion 4)</strong>, and <strong>NIRF student diversity</strong> files.
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => exportDataPackage('AISHE')}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold py-1.5 rounded-lg border border-slate-300 transition flex items-center justify-center space-x-1 cursor-pointer"
              >
                <Download size={11} />
                <span>AISHE CSV</span>
              </button>
              <button
                onClick={() => exportDataPackage('NBA')}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold py-1.5 rounded-lg border border-slate-300 transition flex items-center justify-center space-x-1 cursor-pointer"
              >
                <Download size={11} />
                <span>NBA SAR</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION C: QUANTIFIED SYSTEM ADVANTAGES & 10-DPI ADAPTER BUS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Section C</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240] tracking-tight mt-1">
            Quantified System Advantages & 10-DPI Gateways
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Empirical turnaround comparison between legacy processes and APAAR-Setu.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] overflow-x-auto mb-8">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase text-[10px]">
                <th className="pb-3 px-2">Operational Dimension</th>
                <th className="pb-3 px-2">Legacy Manual Process</th>
                <th className="pb-3 px-2">APAAR-Setu Platform</th>
                <th className="pb-3 px-2 text-right">Turnaround Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="py-3 px-2 font-bold text-slate-900">1. Student Record Verification</td>
                <td className="py-3 px-2 text-red-700">14–21 Days (Physical document check)</td>
                <td className="py-3 px-2 text-emerald-700 font-bold">&lt; 0.35s (Verhoeff + ABC Hash)</td>
                <td className="py-3 px-2 text-right font-mono font-bold text-emerald-600">99.9% Faster</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-slate-900">2. Cross-State Duplicate Detection</td>
                <td className="py-3 px-2 text-red-700">None (Discovered post-semester exam)</td>
                <td className="py-3 px-2 text-emerald-700 font-bold">Real-time lock at admission gateway</td>
                <td className="py-3 px-2 text-right font-mono font-bold text-emerald-600">Instant Pre-emption</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-slate-900">3. Excess Intake Identification</td>
                <td className="py-3 px-2 text-red-700">Manual EoA spot audit (Months later)</td>
                <td className="py-3 px-2 text-emerald-700 font-bold">Deterministic slot counter (#121 auto-block)</td>
                <td className="py-3 px-2 text-right font-mono font-bold text-emerald-600">Zero Leakage</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-slate-900">4. Foreign National Year-1 Onboarding</td>
                <td className="py-3 px-2 text-red-700">182-Day Aadhaar residency delay</td>
                <td className="py-3 px-2 text-emerald-700 font-bold">Provisional APAAR via SII + e-FRRO</td>
                <td className="py-3 px-2 text-right font-mono font-bold text-emerald-600">Day 1 Enrolment</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-slate-900">5. AISHE & NBA Survey Generation</td>
                <td className="py-3 px-2 text-red-700">3–6 Weeks of manual faculty compilation</td>
                <td className="py-3 px-2 text-emerald-700 font-bold">1-Click cryptographically verified export</td>
                <td className="py-3 px-2 text-right font-mono font-bold text-emerald-600">Zero Clerical Labor</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 10-DPI Adapter Bus Callout Card */}
        <div className="bg-gradient-to-r from-[#0B2240] to-[#071629] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#FACC15] uppercase tracking-wider">
              <Database size={15} />
              <span>Interoperable Government DPI Bus</span>
            </div>
            <h3 className="text-xl font-black text-white">
              Connected to 10 Live National Digital Public Infrastructure Gateways
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              DigiLocker, Academic Bank of Credits (ABC), Study in India (SII), MHA e-FRRO, JoSAA / State CET, AICTE EoA Bureau, UIDAI Verhoeff, AISHE, NBA, and MeriPehchaan SSO.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsAdapterModalOpen(true)}
              className="bg-[#1868FF] hover:bg-blue-600 text-white font-bold px-5 py-3 rounded-2xl shadow-md transition text-xs flex items-center space-x-2 cursor-pointer"
            >
              <span>Inspect 10 DPI Gateways</span>
              <ExternalLink size={14} />
            </button>
            <button
              onClick={() => navigate('/portal')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-2xl border border-white/20 transition text-xs cursor-pointer"
            >
              <span>Launch Portal</span>
            </button>
          </div>
        </div>

      </section>

    </div>
  );
};
