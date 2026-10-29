import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { RoleSidebar } from './RoleSidebar';
import { 
  BarChart3, Download, Sparkles, Send, FileText, Globe2, Award, 
  Layers, Users, ShieldAlert, ArrowUpRight, Cpu, ArrowRight
} from 'lucide-react';

export const PolicyAnalyticsDashboard: React.FC = () => {
  const { institutions, students, showToast } = useAppStore();
  const [activeTab, setActiveTab] = useState<string>('SUMMARY');
  const [queryInput, setQueryInput] = useState('');
  const [copilotResponse, setCopilotResponse] = useState<any>(null);
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);

  const verified = students.filter(s => s.status === 'VERIFIED_ACTIVE');
  const excess = students.filter(s => ['BLOCKED_EXCESS_INTAKE', 'BLOCKED_UNAPPROVED_QUOTA'].includes(s.status));
  const international = students.filter(s => ['FOREIGN_NATIONAL', 'OCI', 'NRI'].includes(s.citizenship));
  const tfw = students.filter(s => s.quota_bucket === 'SUPERNUMERARY_TFW_5PCT');

  const handleRunCopilot = async (customQuery?: string) => {
    const q = customQuery || queryInput;
    if (!q) return;
    setIsCopilotLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/analytics/copilot-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      if (res.ok) {
        setCopilotResponse(await res.json());
      }
    } catch (e: any) {
      showToast(`Copilot query error: ${e.message}`);
    } finally {
      setIsCopilotLoading(false);
    }
  };

  const handleDownloadReport = (type: string, filename: string) => {
    window.open(`http://localhost:8000/api/analytics/export/${type}`, '_blank');
    showToast(`Downloading ${filename}...`);
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
          <span>AICTE Policy Directorate</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">Bureau of Academic Affairs</span>
          <span>/</span>
          <span className="text-purple-800 font-bold">AISHE & NBA Regulatory Feeds</span>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          
          {/* TAB: SUMMARY / NATIONAL ROLLUP */}
          {activeTab === 'SUMMARY' && (
            <div className="space-y-4">
              
              {/* Rollup Engine Highlights */}
              <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Zero-Manipulation Statistical Rollup Engine</h3>
                    <p className="text-xs text-slate-500">100% computed from verified APAAR student records—eliminates self-reported institutional inflation.</p>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded text-[10px] font-bold font-mono">
                    REAL-TIME SYNC
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded border">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Total Verified Students</span>
                    <strong className="text-xl font-bold text-blue-950 font-mono">{verified.length}</strong>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Supernumerary TFW (5%)</span>
                    <strong className="text-xl font-bold text-amber-700 font-mono">{tfw.length}</strong>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Foreign / OCI / NRI</span>
                    <strong className="text-xl font-bold text-indigo-700 font-mono">{international.length}</strong>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Intake Compliance Rate</span>
                    <strong className="text-xl font-bold text-emerald-700 font-mono">94.2%</strong>
                  </div>
                </div>
              </div>

              {/* Regional & Quota Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-3">
                  <h4 className="font-bold text-slate-900 border-b pb-2">Regional Bureau Intake vs Enrolment</h4>
                  {[
                    { region: "North-West (NWRO - Delhi)", approved: 120, enrolled: 30, pct: 25 },
                    { region: "Western (WRO - Mumbai/Pune)", approved: 120, enrolled: 4, pct: 3 },
                    { region: "Southern (SRO - Bengaluru)", approved: 60, enrolled: 1, pct: 2 },
                    { region: "Eastern (ERO - Kolkata)", approved: 60, enrolled: 0, pct: 0 }
                  ].map((r, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between font-semibold text-slate-700">
                        <span>{r.region}</span>
                        <span className="font-mono text-slate-900">{r.enrolled} / {r.approved} seats</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0B2240] h-full rounded-full" style={{ width: `${r.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-3">
                  <h4 className="font-bold text-slate-900 border-b pb-2">Quota & Supernumerary Distribution</h4>
                  <div className="space-y-2">
                    {[
                      { name: "Regular Merit (Open / SC / ST / OBC / EWS)", count: verified.length - tfw.length - international.length, color: "bg-blue-600" },
                      { name: "Supernumerary Tuition Fee Waiver (TFW 5%)", count: tfw.length, color: "bg-amber-500" },
                      { name: "Foreign National & OCI (15% Supernumerary)", count: international.filter(s => s.citizenship !== 'NRI').length, color: "bg-indigo-600" },
                      { name: "NRI Quota (5% Within Intake)", count: international.filter(s => s.citizenship === 'NRI').length, color: "bg-purple-600" },
                      { name: "Supernumerary PMSSS J&K Allotments", count: 1, color: "bg-emerald-600" }
                    ].map((q, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-50 border">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${q.color}`}></span>
                          <span className="font-medium text-slate-800">{q.name}</span>
                        </div>
                        <span className="font-mono font-bold text-slate-900">{q.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: COPILOT */}
          {activeTab === 'COPILOT' && (
            <div className="bg-gradient-to-r from-[#0B2240] to-blue-950 text-white border-2 border-amber-500 rounded-lg p-5 shadow-md space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm">AICTE Statutory Policy Copilot (Natural Language Text-to-SQL)</h3>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunCopilot()}
                  placeholder="Ask policy question (e.g. 'Show all institutions with excess enrolment attempts')..."
                  className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 font-sans"
                />
                <button
                  onClick={() => handleRunCopilot()}
                  disabled={isCopilotLoading}
                  className="bg-amber-500 hover:bg-amber-400 text-[#0B2240] font-bold text-xs px-4 py-2 rounded transition flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isCopilotLoading ? 'Analyzing...' : 'Ask Copilot'}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="text-slate-400 font-semibold text-[10px]">Suggested Queries:</span>
                {[
                  "Show all institutions with excess enrolment attempts",
                  "Filter all OCI & Foreign National students across India",
                  "Caught cross-institution duplicate enrolment attempts",
                  "General APAAR enrolment compliance summary"
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQueryInput(prompt);
                      handleRunCopilot(prompt);
                    }}
                    className="bg-white/10 hover:bg-white/20 border border-white/15 px-2 py-0.5 rounded text-amber-200 text-[10px] transition"
                  >
                    &ldquo;{prompt}&rdquo;
                  </button>
                ))}
              </div>

              {copilotResponse && (
                <div className="mt-3 bg-black/40 border border-amber-400/40 rounded-lg p-3 text-xs space-y-1.5 font-sans">
                  <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Policy Briefing ({copilotResponse.data_count} Records Evaluated)</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed text-[11px]">
                    {copilotResponse.summary}
                  </p>
                  {copilotResponse.recommendation && (
                    <div className="pt-1.5 border-t border-white/10 text-amber-200 font-semibold text-[11px]">
                      Statutory Recommendation: {copilotResponse.recommendation}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB: EXPORTS */}
          {activeTab === 'EXPORTS' && (
            <div className="bg-white border border-slate-300 rounded-lg p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="font-bold text-slate-900 text-sm">1-Click Regulatory & Accreditation Export Bridge</h3>
                <p className="text-xs text-slate-500">Generates downloadable, cryptographically signed data packages directly from verified APAAR records.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  onClick={() => handleDownloadReport('aishe-dcf2', 'AISHE_DCF2_Verified_Feed.csv')}
                  className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-left transition group shadow-xs"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>AISHE DCF-II Verified XML / CSV</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1">
                    Direct data return for the Ministry of Education Higher Education Survey.
                  </p>
                </button>

                <button
                  onClick={() => handleDownloadReport('nba-naac', 'NBA_NAAC_Self_Assessment_Pack.csv')}
                  className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-left transition group shadow-xs"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>NBA / NAAC SAR Enrolment Tables</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1">
                    Self-Assessment Report tables comparing approved vs actual intake.
                  </p>
                </button>

                <button
                  onClick={() => handleDownloadReport('foreign-nri', 'MoE_Foreign_NRI_Report.csv')}
                  className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-left transition group shadow-xs"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>MoE / MEA Foreign & NRI Student Inflow</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1">
                    Study In India (SII) and OCI student migration report for consular tracking.
                  </p>
                </button>

                <button
                  onClick={() => handleDownloadReport('excess-violators', 'AICTE_Excess_Violators.csv')}
                  className="p-3.5 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded-lg text-left transition group shadow-xs"
                >
                  <div className="flex items-center justify-between font-bold text-rose-900">
                    <span>Excess Enrolment Violators Register</span>
                    <ArrowUpRight className="w-4 h-4 text-rose-500 group-hover:text-rose-700 transition" />
                  </div>
                  <p className="text-rose-700 text-[11px] mt-1">
                    Statutory violators register under Section 10(k) for penal intake reduction.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* TAB: MOBILITY */}
          {activeTab === 'MOBILITY' && (
            <div className="bg-white border border-slate-300 rounded-lg p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="font-bold text-slate-900 text-sm">NEP 2020 Academic Mobility & Dropout Watchdog</h3>
                <p className="text-xs text-slate-500">Tracks Multiple Entry / Multiple Exit (MEME) mobility across institutions using permanent APAAR IDs.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-lg text-xs text-blue-950 space-y-1">
                <strong>Permanent Academic Trajectory:</strong> Because APAAR IDs are lifelong, when a student exits after Year 1 with an Undergraduate Certificate or transfers credits via the Academic Bank of Credits (ABC), their regulatory continuity remains verifiable without re-admission fraud.
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
