import React from 'react';
import { useAppStore } from '../store/appStore';
import { Link2, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export const TelemetryFooter: React.FC = () => {
  const { auditBlocks, apiEnvMode, setIsAuditDrawerOpen, setIsAdapterModalOpen } = useAppStore();

  return (
    <footer className="bg-[#0B2240] text-slate-300 text-xs border-t-2 border-amber-500 mt-12 select-none">
      
      {/* Zone 4 Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        
        {/* Left: Cryptographic Audit Status Pill */}
        <button
          onClick={() => setIsAuditDrawerOpen(true)}
          className="flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-500 text-slate-200 px-3 py-1.5 rounded-full transition shadow-xs group"
          title="Open Immutable SHA-256 Merkle Audit Ledger"
        >
          <Link2 className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
          <span className="font-mono text-[11px]">
            SHA-256 Audit Ledger: <strong className="text-amber-300">Block #{auditBlocks.length} Verified</strong>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </button>

        {/* Center: AICTE Governance & GIGW Compliance */}
        <div className="text-[11px] text-slate-400">
          <div className="text-white font-bold">
            All India Council for Technical Education (AICTE) &middot; Ministry of Education
          </div>
          <div className="text-slate-400 text-[10px] mt-0.5">
            Smart India Hackathon 2026 (PS 26063) &middot; GIGW 3.0 &amp; DPDP Act 2023 Compliant
          </div>
        </div>

        {/* Right: 10 External DPI Gateways Telemetry Pill */}
        <button
          onClick={() => setIsAdapterModalOpen(true)}
          className="flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500 text-slate-200 px-3 py-1.5 rounded-full transition shadow-xs group"
          title="Inspect 10 Government DPI Gateways"
        >
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono text-[11px]">
            API Mode: <strong className="text-emerald-300">{apiEnvMode}</strong> (10 DPI Ready)
          </span>
          <Terminal className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 ml-0.5" />
        </button>

      </div>
    </footer>
  );
};
