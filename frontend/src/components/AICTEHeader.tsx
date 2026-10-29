import React from 'react';
import { useAppStore } from '../store/appStore';
import { ShieldCheck, RefreshCw, Link2, BookOpen } from 'lucide-react';

export const AICTEHeader: React.FC = () => {
  const { auditBlocks, refreshData, setIsAuditDrawerOpen, showToast } = useAppStore();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Data refreshed from AICTE Central Registry.");
    }, 400);
  };

  return (
    <header className="bg-[#0B2240] text-white border-b-4 border-[#D97706] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Emblem & Portal Branding */}
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center shadow border-2 border-amber-500 flex-shrink-0">
            {/* SVG AICTE Emblem Seal Representation */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#0B2240]">
              <circle cx="50" cy="50" r="45" fill="#f8fafc" stroke="#0B2240" strokeWidth="4" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="#D97706" strokeWidth="2.5" strokeDasharray="4 2" />
              {/* Flame/Lamp of Knowledge */}
              <path d="M50 24 Q57 38 50 48 Q43 38 50 24" fill="#D97706" />
              <path d="M36 60 Q50 54 64 60 L60 68 Q50 64 40 68 Z" fill="#0B2240" />
              {/* Wheel/Chakra Hub */}
              <circle cx="50" cy="50" r="5" fill="#1E3A8A" />
            </svg>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                All India Council for Technical Education (AICTE)
              </span>
              <span className="hidden sm:inline bg-blue-900/80 text-blue-200 border border-blue-700 text-[10px] px-2 py-0.2 rounded font-medium">
                NEP 2020 Mandate
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>APAAR-Setu</span>
              <span className="text-xs font-normal text-slate-300 hidden md:inline">
                — National Student Enrolment Registry & Verification Portal
              </span>
            </h1>
            <p className="text-[11px] text-slate-300 font-mono hidden sm:block">
              Statutory 5-Bucket Seat-Slot Allocator &middot; Cross-Institute Duplicate Lock &middot; W3C Dual-ID Credential
            </p>
          </div>
        </div>

        {/* Global Controls & Audit Drawer Trigger */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleRefresh}
            title="Refresh Central State"
            className="flex items-center space-x-1.5 bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs px-3 py-1.5 rounded transition shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            <span className="hidden sm:inline">Sync Registry</span>
          </button>

          {/* SHA-256 Audit Ledger Slide-Over Trigger */}
          <button
            onClick={() => setIsAuditDrawerOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white text-xs px-3 py-1.5 rounded font-medium transition shadow border border-amber-400/40"
            title="Open Tamper-Proof Cryptographic Audit Ledger"
          >
            <Link2 className="w-3.5 h-3.5 text-amber-200" />
            <span>SHA-256 Audit Trail</span>
            <span className="bg-black/30 text-amber-100 font-mono text-[10px] px-1.5 py-0.5 rounded font-bold">
              {auditBlocks.length}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
