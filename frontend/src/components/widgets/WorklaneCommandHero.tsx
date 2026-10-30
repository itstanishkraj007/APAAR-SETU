import React, { useState } from 'react';
import { useAppStore, StudentRecord } from '../../store/appStore';
import { 
  Search, ShieldCheck, MapPin, DollarSign, ArrowUpDown, 
  CheckCircle2, AlertTriangle, Download, ExternalLink, QrCode, Lock
} from 'lucide-react';

interface WorklaneCommandHeroProps {
  onVerifyStudent?: (student: StudentRecord) => void;
  title?: string;
  subtitle?: string;
}

export const WorklaneCommandHero: React.FC<WorklaneCommandHeroProps> = ({
  onVerifyStudent,
  title = "Verify National Academic Credentials",
  subtitle = "Cryptographically audit admissions, sanctioned seat-slots, and dual-ID degree validity across 10,420+ institutions."
}) => {
  const { students, setSelectedForensicStudent, setActiveDuplicateStudent, showToast } = useAppStore();

  const [apaarInput, setApaarInput] = useState('');
  const [instInput, setInstInput] = useState('');
  const [quotaFilter, setQuotaFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = students.filter(s => {
    const qA = apaarInput.toLowerCase().trim();
    const qI = instInput.toLowerCase().trim();

    if (qA && !s.apaar_id.toLowerCase().includes(qA) && !s.name.toLowerCase().includes(qA)) return false;
    if (qI && !s.institution_name.toLowerCase().includes(qI) && !s.institution_id.toLowerCase().includes(qI)) return false;
    if (quotaFilter !== 'ALL' && s.quota_bucket !== quotaFilter) return false;
    if (statusFilter !== 'ALL' && s.status !== statusFilter) return false;

    return true;
  });

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Filtering AICTE Central Registry: ${filtered.length} candidates found.`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Deep Midnight Navy Command Banner (From Image 1 — Worklane Reference) */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#07192F] via-[#0D2D52] to-[#091E3A] text-white shadow-xl relative overflow-hidden border border-blue-900/40">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <span>AICTE Central Verifier & Deduplication Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 4 Inline Filter Inputs + Electric Royal Blue Button (Signature Worklane Bar) */}
        <form onSubmit={handleQuickSearch} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative z-10">
          {/* Input 1: APAAR / Name */}
          <div className="relative">
            <input
              type="text"
              value={apaarInput}
              onChange={(e) => setApaarInput(e.target.value)}
              placeholder="12-digit APAAR or Name..."
              className="w-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/15 text-white placeholder-slate-400 text-xs font-medium pl-3.5 pr-3 py-3 rounded-2xl border border-white/[0.14] focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition"
            />
          </div>

          {/* Input 2: Institution */}
          <div className="relative">
            <input
              type="text"
              value={instInput}
              onChange={(e) => setInstInput(e.target.value)}
              placeholder="Institution or AICTE ID..."
              className="w-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/15 text-white placeholder-slate-400 text-xs font-medium pl-3.5 pr-3 py-3 rounded-2xl border border-white/[0.14] focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition"
            />
          </div>

          {/* Input 3: Quota Dropdown */}
          <div className="relative">
            <select
              value={quotaFilter}
              onChange={(e) => setQuotaFilter(e.target.value)}
              className="w-full bg-[#0E2F59] hover:bg-[#12386A] text-white text-xs font-medium px-3.5 py-3 rounded-2xl border border-white/[0.14] focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition cursor-pointer"
            >
              <option value="ALL">All Seat Quotas</option>
              <option value="REGULAR_MERIT">Regular Sanctioned Merit</option>
              <option value="SUPERNUMERARY_TFW_5PCT">Supernumerary TFW (5%)</option>
              <option value="SUPERNUMERARY_FN_OCI_15PCT">Foreign National / OCI (15%)</option>
              <option value="NRI_QUOTA_5PCT">NRI Quota (5%)</option>
              <option value="SUPERNUMERARY_PMSSS">PMSSS Central Scholarship</option>
            </select>
          </div>

          {/* Input 4: Status Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#0E2F59] hover:bg-[#12386A] text-white text-xs font-medium px-3.5 py-3 rounded-2xl border border-white/[0.14] focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition cursor-pointer"
            >
              <option value="ALL">All Compliance States</option>
              <option value="VERIFIED_ACTIVE">✓ Verified Active</option>
              <option value="CROSS_INSTITUTE_DUPLICATE_LOCK">🚨 Duplicate Locks</option>
              <option value="BLOCKED_EXCESS_INTAKE">⚠️ Excess Intake #61/60</option>
            </select>
          </div>

          {/* Electric Royal Blue CTA Button (#1868FF from Image 1) */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#1868FF] hover:bg-[#1456D6] text-white text-xs font-bold py-3 px-4 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer border border-blue-400/30"
            >
              <Search size={14} />
              <span>Audit Records</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. 3-Column Dual-ID Cards Grid (From Image 1 Card Grid) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 px-1">
          <span>{filtered.length} Verifiable Credentials Identified</span>
          <span className="font-mono text-[11px]">W3C Cryptographic Ed25519 Signatures Ready</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.slice(0, 9).map((s) => {
            const isVerified = s.status === 'VERIFIED_ACTIVE';
            const isDuplicate = s.status === 'CROSS_INSTITUTE_DUPLICATE_LOCK';
            const isExcess = s.status.includes('EXCESS');

            return (
              <div
                key={s.id}
                onClick={() => setSelectedForensicStudent(s)}
                className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 hover:border-slate-400/80 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Institution Logo + Dual ID Badges */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 text-amber-400 font-extrabold flex items-center justify-center font-mono text-xs flex-shrink-0">
                        {s.institution_name.split(' ')[0].slice(0, 3)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                          {s.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[170px]">
                          {s.institution_name}
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    {isVerified ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Verified Seat
                      </span>
                    ) : isDuplicate ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 animate-pulse">
                        Duplicate Clash
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        Excess #61
                      </span>
                    )}
                  </div>

                  {/* Dual-ID Highlights Box */}
                  <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/60 space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">12-Digit APAAR ID:</span>
                      <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                        {s.apaar_id}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Student Roll ID:</span>
                      <span className="font-mono font-bold text-blue-900 text-[11px]">
                        {s.student_id}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                      <span className="text-slate-500 font-medium">Sanctioned Seat:</span>
                      <span className="font-mono text-[11px] font-semibold text-slate-700 truncate max-w-[150px]">
                        {s.seat_slot_id || 'QUARANTINED'}
                      </span>
                    </div>
                  </div>

                  {/* 5-Point Trust Mini Bar */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span>5-Pt Scorecard:</span>
                    <span className="font-bold text-emerald-700">
                      {isVerified ? '5/5 Passed (100%)' : 'Audit Exception'}
                    </span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {s.course_id}
                  </span>

                  {isDuplicate ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDuplicateStudent(s);
                      }}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
                    >
                      <span>Resolve Conflict</span>
                      <AlertTriangle size={13} />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedForensicStudent(s);
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <span>Inspect Credential</span>
                      <ExternalLink size={12} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
