import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { 
  BarChart3, Download, Sparkles, Send, FileText, Globe2, Award, 
  Layers, Users, ShieldAlert, ArrowUpRight
} from 'lucide-react';

export const PolicyAnalyticsDashboard: React.FC = () => {
  const { institutions, students, showToast } = useAppStore();
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
    <div className="space-y-5">
      
      {/* Top Analytics Banner */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-700">
                AICTE Apex Policy, Accreditation & Regulatory Hub
              </span>
              <span className="bg-blue-100 text-blue-900 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                AISHE / NBA / NIRF Compliant
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">National Enrolment Intelligence & Accreditation Feeds</h2>
            <p className="text-xs text-slate-500">
              Aggregating verified 12-digit APAAR academic records across all AICTE disciplines for data-driven governance.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-mono">Academic Year: <strong>2026-27</strong></span>
          </div>
        </div>
      </div>

      {/* AI Policy Copilot Natural Language Query Console */}
      <div className="bg-gradient-to-r from-[#0B2240] to-blue-950 text-white border-2 border-amber-500 rounded-lg p-4 shadow-md">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm">AICTE Statutory Policy Copilot</h3>
          <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] px-2 py-0.2 rounded font-mono">
            Natural Language Regulatory Intelligence
          </span>
        </div>

        {/* Query Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRunCopilot()}
            placeholder="Ask AICTE policy query (e.g. 'Show all institutions with excess enrolment attempts')..."
            className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
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

        {/* Preset Prompt Pills */}
        <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px]">
          <span className="text-slate-400 font-semibold text-[10px]">Suggested Inquiries:</span>
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

        {/* Copilot Result Box */}
        {copilotResponse && (
          <div className="mt-3.5 bg-black/40 border border-amber-400/40 rounded-lg p-3 text-xs space-y-1.5 animate-in fade-in duration-200 font-sans">
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

      {/* 1-Click Regulatory Exporter Bar (Real File Downloads) */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
          <div className="flex items-center space-x-2">
            <Download className="w-4 h-4 text-[#0B2240]" />
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              1-Click Regulatory & Accreditation Data Feeds
            </h4>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Format: CSV / Official XML</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          <button
            onClick={() => handleDownloadReport('aishe-dcf2', 'AISHE_DCF2_Verified_Feed.csv')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-left transition group shadow-xs"
          >
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>AISHE DCF-II Verified Feed</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
            </div>
            <p className="text-slate-500 text-[11px] mt-1">
              Ministry of Education higher education national statistical return with 12-digit APAAR.
            </p>
          </button>

          <button
            onClick={() => handleDownloadReport('nba-naac', 'NBA_NAAC_Self_Assessment_Pack.csv')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-left transition group shadow-xs"
          >
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>NBA / NAAC Self-Assessment Pack</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
            </div>
            <p className="text-slate-500 text-[11px] mt-1">
              Sanctioned intake vs. actual enrolment audit dossier with student-faculty ratio data.
            </p>
          </button>

          <button
            onClick={() => handleDownloadReport('foreign-nri', 'MoE_Foreign_NRI_Report.csv')}
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-left transition group shadow-xs"
          >
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>MoE / MEA Foreign & NRI Inflow</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
            </div>
            <p className="text-slate-500 text-[11px] mt-1">
              Study In India (SII) and OCI student distribution report for diplomatic tracking.
            </p>
          </button>

          <button
            onClick={() => handleDownloadReport('excess-violators', 'AICTE_Excess_Violators.csv')}
            className="p-3 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded-lg text-left transition group shadow-xs"
          >
            <div className="flex items-center justify-between font-bold text-rose-900">
              <span>Excess Enrolment Violators</span>
              <ArrowUpRight className="w-4 h-4 text-rose-500 group-hover:text-rose-700 transition" />
            </div>
            <p className="text-rose-700 text-[11px] mt-1">
              Institutions breaching approved intake capacity or admitting unapproved quotas.
            </p>
          </button>

        </div>
      </div>

      {/* Regional & Quota Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* Regional Distribution */}
        <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs">
          <h4 className="font-bold text-slate-900 border-b pb-2 mb-3 flex items-center justify-between">
            <span>Regional Bureau Intake vs Enrolment</span>
            <span className="text-slate-400 font-mono text-[10px]">AICTE ROs</span>
          </h4>

          <div className="space-y-3 font-sans">
            {[
              { region: "North-West (NWRO)", city: "Delhi / Chandigarh", approved: 120, enrolled: 30, pct: 25 },
              { region: "Western (WRO)", city: "Mumbai / Pune", approved: 120, enrolled: 4, pct: 3 },
              { region: "Southern (SRO)", city: "Bengaluru / Chennai", approved: 60, enrolled: 1, pct: 2 },
              { region: "Eastern (ERO)", city: "Kolkata / Guwahati", approved: 60, enrolled: 0, pct: 0 }
            ].map((r, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-slate-700 font-semibold">
                  <span>{r.region} &middot; <span className="font-normal text-slate-500 text-[11px]">{r.city}</span></span>
                  <span className="font-mono text-slate-900">{r.enrolled} / {r.approved} seats</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0B2240] h-full rounded-full" style={{ width: `${r.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quota & Category Mix */}
        <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs">
          <h4 className="font-bold text-slate-900 border-b pb-2 mb-3 flex items-center justify-between">
            <span>Quota & Supernumerary Allocation Breakdown</span>
            <span className="text-slate-400 font-mono text-[10px]">5-Bucket Matrix</span>
          </h4>

          <div className="space-y-2.5">
            {[
              { name: "Regular Merit (Open / SC / ST / OBC / EWS)", count: verified.length - tfw.length - international.length, color: "bg-blue-600" },
              { name: "Supernumerary Tuition Fee Waiver (TFW 5%)", count: tfw.length, color: "bg-amber-500" },
              { name: "Foreign National & OCI (15% Supernumerary)", count: international.filter(s => s.citizenship !== 'NRI').length, color: "bg-indigo-600" },
              { name: "NRI Quota (5% Within Intake)", count: international.filter(s => s.citizenship === 'NRI').length, color: "bg-purple-600" },
              { name: "Supernumerary PMSSS J&K Allotments", count: 1, color: "bg-emerald-600" }
            ].map((q, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${q.color}`}></span>
                  <span className="font-medium text-slate-800">{q.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{q.count}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
