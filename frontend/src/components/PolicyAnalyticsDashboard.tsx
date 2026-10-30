import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { 
  BarChart3, Download, Sparkles, Send, FileSpreadsheet, Globe2, Award, 
  Layers, Users, ShieldAlert, ArrowUpRight, Cpu, ArrowRight, CheckCircle2
} from 'lucide-react';

export const PolicyAnalyticsDashboard: React.FC = () => {
  const { institutions, students, exportDataPackage, showToast } = useAppStore();

  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'COPILOT' | 'EXPORTS' | 'MOBILITY'>('SUMMARY');
  const [queryInput, setQueryInput] = useState('');
  const [copilotResponse, setCopilotResponse] = useState<any>({
    query: "Compare PGDM vs B.Tech seat utilization & export AISHE DCF-II",
    generated_sql: "SELECT course_type, SUM(approved_intake) AS total_approved, SUM(actual_enrolled) AS total_enrolled, ROUND(SUM(actual_enrolled)*100.0/SUM(approved_intake), 2) AS utilization_pct FROM aicte_institutions GROUP BY course_type;",
    explanation: "Derived from 100% verified 12-digit APAAR rows. Eliminates self-reporting bias from statistical returns.",
    data_preview: [
      { course_type: "Engineering & Technology (B.Tech)", total_approved: 120, total_enrolled: 114, utilization_pct: 95.0 },
      { course_type: "Management (PGDM)", total_approved: 60, total_enrolled: 68, utilization_pct: 113.3, breach: "8 Excess Seats Quarantined" },
      { course_type: "Computer Applications (MCA)", total_approved: 60, total_enrolled: 56, utilization_pct: 93.3 }
    ]
  });

  const [isCopilotLoading, setIsCopilotLoading] = useState(false);

  const verified = students.filter(s => s.status === 'VERIFIED_ACTIVE');
  const excess = students.filter(s => ['BLOCKED_EXCESS_INTAKE', 'BLOCKED_UNAPPROVED_QUOTA'].includes(s.status));
  const international = students.filter(s => ['FOREIGN_NATIONAL', 'OCI', 'NRI'].includes(s.citizenship));
  const tfw = students.filter(s => s.quota_bucket === 'SUPERNUMERARY_TFW_5PCT');

  const handleRunCopilot = (promptText?: string) => {
    const q = promptText || queryInput;
    if (!q) return;
    setIsCopilotLoading(true);

    setTimeout(() => {
      setCopilotResponse({
        query: q,
        generated_sql: `SELECT s.quota_bucket, COUNT(s.id) as enrolled_count, ROUND(COUNT(s.id)*100.0/(SELECT COUNT(*) FROM students WHERE status='VERIFIED_ACTIVE'), 2) as pct FROM students s WHERE s.status='VERIFIED_ACTIVE' GROUP BY s.quota_bucket;`,
        explanation: `Query successfully compiled into BigQuery / PostgreSQL syntax. Evaluated across ${verified.length} verified APAAR identities.`,
        data_preview: [
          { quota: "Regular Sanctioned Intake", count: 28, share: "82.4%" },
          { quota: "Supernumerary TFW (5%)", count: 2, share: "5.9%" },
          { quota: "Foreign National & OCI (15%)", count: 3, share: "8.8%" },
          { quota: "PMSSS Central Scholarship", count: 1, share: "2.9%" }
        ]
      });
      setIsCopilotLoading(false);
      showToast("Copilot Text-to-SQL Query executed successfully.");
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* 1. Macro KPI Row (Bento Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">National Approved Cap</span>
          <span className="text-3xl font-extrabold text-slate-900 font-mono-numeric mt-1 block">300</span>
          <span className="text-xs text-slate-500 font-medium">Sample Institution Cohort</span>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">National Seat Utilization</span>
          <span className="text-3xl font-extrabold text-emerald-700 font-mono-numeric mt-1 block">87.4%</span>
          <span className="text-xs text-emerald-600 font-bold">↑ 4.2% Verified Integrity</span>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NEP 2020 Credit Transfers</span>
          <span className="text-3xl font-extrabold text-amber-600 font-mono-numeric mt-1 block">14,892</span>
          <span className="text-xs text-slate-500 font-medium">ABC / NAD Synchronized</span>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Accreditation Reliability</span>
          <span className="text-3xl font-extrabold text-slate-900 font-mono-numeric mt-1 block">100%</span>
          <span className="text-xs text-emerald-700 font-bold">Zero Self-Report Bias</span>
        </div>
      </div>

      {/* 2. Section Tabs Bar */}
      <div className="flex items-center space-x-2 bg-slate-100/80 p-1.5 rounded-2xl overflow-x-auto scrollbar-none w-fit">
        {[
          { id: 'SUMMARY', label: '📊 National Rollup' },
          { id: 'COPILOT', label: '⚡ AI Policy Copilot' },
          { id: 'EXPORTS', label: '📥 1-Click AISHE / NBA Exports' },
          { id: 'MOBILITY', label: '🎓 NEP 2020 Mobility' },
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

      {/* 3. TAB A: SUMMARY (Regional Breakdown & Quota Distribution) */}
      {activeTab === 'SUMMARY' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Regional Table */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 space-y-4">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Regional Intake Utilization Breakdown</h3>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5">Region</th>
                  <th className="py-2.5">Approved Cap</th>
                  <th className="py-2.5">Verified Admitted</th>
                  <th className="py-2.5">Utilization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="py-3 font-bold text-slate-900">NWRO (Delhi / North-West)</td>
                  <td className="py-3 font-mono">120</td>
                  <td className="py-3 font-mono text-emerald-700 font-bold">114</td>
                  <td className="py-3">
                    <span className="font-bold font-mono text-emerald-700">95.0%</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-slate-900">WRO (Maharashtra / Goa)</td>
                  <td className="py-3 font-mono">120</td>
                  <td className="py-3 font-mono text-amber-700 font-bold">112</td>
                  <td className="py-3">
                    <span className="font-bold font-mono text-amber-700">93.3%</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-slate-900">SRO (Karnataka / South)</td>
                  <td className="py-3 font-mono">60</td>
                  <td className="py-3 font-mono text-emerald-700 font-bold">56</td>
                  <td className="py-3">
                    <span className="font-bold font-mono text-emerald-700">93.3%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quota Distribution */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 space-y-4">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Statutory 5-Bucket Allocation Shares</h3>
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Regular Merit (SC/ST/OBC/EWS/Open)</span>
                  <span className="font-mono font-bold text-slate-900">82.4% (28 Students)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[82%] h-full bg-emerald-600 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Supernumerary TFW (Tuition Fee Waiver 5%)</span>
                  <span className="font-mono font-bold text-slate-900">5.9% (2 Students)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[6%] h-full bg-amber-400 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Foreign National & OCI (15% Supernumerary)</span>
                  <span className="font-mono font-bold text-slate-900">8.8% (3 Students)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[9%] h-full bg-cyan-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>PMSSS Central J&K Central Scholarship</span>
                  <span className="font-mono font-bold text-slate-900">2.9% (1 Student)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[3%] h-full bg-purple-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB B: AI POLICY COPILOT */}
      {activeTab === 'COPILOT' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles size={18} className="text-amber-500" />
                <h2 className="text-base font-bold text-slate-900 tracking-tight">AI Policy Text-to-SQL Copilot</h2>
              </div>
              <p className="text-xs text-slate-500">Ask natural-language policy questions against the national APAAR student database.</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-300 px-3 py-1 rounded-full">
              PostgreSQL / BigQuery Schema
            </span>
          </div>

          {/* Quick Prompts */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex-shrink-0">Sample Queries:</span>
            {[
              "Compare PGDM vs B.Tech seat utilization & export AISHE DCF-II",
              "Show unapproved NRI quota admissions by state",
              "Audit female student enrolment ratio in North-Western region",
              "Identify colleges with >30% midnight cutoff uploads"
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQueryInput(p);
                  handleRunCopilot(p);
                }}
                className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 transition whitespace-nowrap cursor-pointer flex-shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Prompt Bar */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Ask anything: e.g. 'Show total TFW seats utilized across engineering colleges in 2026'..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
            <button
              onClick={() => handleRunCopilot()}
              disabled={isCopilotLoading}
              className="bg-[#141519] hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-2xl transition cursor-pointer flex items-center space-x-1.5 flex-shrink-0"
            >
              <Send size={13} />
              <span>{isCopilotLoading ? 'Compiling SQL...' : 'Execute Query'}</span>
            </button>
          </div>

          {/* Copilot Response Card */}
          {copilotResponse && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 font-mono text-xs animate-in fade-in">
              <div className="flex items-center justify-between text-slate-500 font-bold text-[11px]">
                <span>Generated AICTE SQL Translation:</span>
                <span className="text-emerald-700">✓ Validated against statutory schema</span>
              </div>
              <pre className="bg-slate-900 text-amber-300 p-3 rounded-xl overflow-x-auto text-[11px] leading-relaxed">
                {copilotResponse.generated_sql}
              </pre>
              <p className="font-sans text-xs text-slate-600 font-medium">
                {copilotResponse.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 5. TAB C: 1-CLICK EXPORTS */}
      {activeTab === 'EXPORTS' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Accreditation & Government Returns Packages</h2>
            <p className="text-xs text-slate-500">Zero-touch automated compilation from verified 12-digit APAAR student records.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">UGC & MoE Portal</span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5">AISHE DCF-II Return (2026-27)</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enrolment return with 12-digit APAAR linkage, social category breakdowns, and intake verification.
                </p>
              </div>
              <button
                onClick={() => exportDataPackage('AISHE')}
                className="w-full bg-[#141519] hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-2xl transition cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Download size={13} />
                <span>Download DCF-II CSV</span>
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NBA Accreditation</span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5">NBA Tier-I Criterion 4 Data</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Student admission register with sanctioned seat proof and verified seat-slot IDs for SAR filing.
                </p>
              </div>
              <button
                onClick={() => exportDataPackage('NBA')}
                className="w-full bg-[#141519] hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-2xl transition cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Download size={13} />
                <span>Download NBA CSV</span>
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">National Institutional Ranking</span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5">NIRF Sanctioned Intake Return</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Actual student strength, intake utilization rate, and zero-excess compliance verification package.
                </p>
              </div>
              <button
                onClick={() => exportDataPackage('NIRF')}
                className="w-full bg-[#141519] hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-2xl transition cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Download size={13} />
                <span>Download NIRF CSV</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB D: NEP 2020 MOBILITY */}
      {activeTab === 'MOBILITY' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">National Education Policy (NEP 2020) Mobility Engine</h2>
            <p className="text-xs text-slate-500">Tracking multiple-entry, multiple-exit and inter-institution credit transfers via Academic Bank of Credits (ABC).</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Lateral Entry Enrolments</span>
              <div className="text-2xl font-extrabold text-slate-900 font-mono-numeric">1,420</div>
              <div className="text-slate-500 text-[11px]">Direct 2nd year admissions with prior diploma APAARs</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Inter-University Migrations</span>
              <div className="text-2xl font-extrabold text-emerald-700 font-mono-numeric">488</div>
              <div className="text-slate-500 text-[11px]">Credit bank authenticated with zero seat loss</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Certificate / Diploma Exits</span>
              <div className="text-2xl font-extrabold text-amber-700 font-mono-numeric">112</div>
              <div className="text-slate-500 text-[11px]">Valid 1-year and 2-year NSQF certifications issued</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
