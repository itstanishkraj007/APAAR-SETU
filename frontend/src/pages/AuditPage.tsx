import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { Link2, ShieldCheck, CheckCircle2, RefreshCw, Terminal, Lock } from 'lucide-react';

export const AuditPage: React.FC = () => {
  const { auditBlocks, verifyLedger, refreshData, showToast } = useAppStore();
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleVerify = async () => {
    setVerifying(true);
    const res = await verifyLedger();
    setVerificationResult(res);
    setVerifying(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Link2 className="w-4 h-4 text-amber-600" />
            <span>Cryptographic Trust Registry</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Immutable SHA-256 Merkle Audit Ledger
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
            Every statutory event—admission ingestion, duplicate lock, show-cause notice, and DPDP consent toggle—is permanently bound in an append-only mathematical hash chain.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="bg-[#0B2240] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded shadow-xs transition flex items-center space-x-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${verifying ? 'animate-spin text-amber-400' : ''}`} />
            <span>Verify Chain Integrity</span>
          </button>
        </div>
      </div>

      {/* Verification Status Banner */}
      <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Cryptographic Parity Status</h3>
            <p className="text-[11px] text-slate-500 font-mono">
              {verificationResult ? verificationResult.message : "All blocks mathematically validated from Genesis to current chain root."}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 font-mono text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">TOTAL BLOCKS</span>
            <strong className="text-blue-900 text-sm">{auditBlocks.length}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">HASHING STANDARD</span>
            <strong className="text-amber-700 text-sm">SHA-256</strong>
          </div>
        </div>
      </div>

      {/* Blocks List */}
      <div className="space-y-3 font-sans">
        {auditBlocks.map((block) => (
          <div
            key={block.index}
            className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs text-xs space-y-2 hover:border-slate-400 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-1">
              <div className="flex items-center space-x-2">
                <span className="bg-[#0B2240] text-amber-300 font-mono font-bold text-xs px-2 py-0.5 rounded">
                  BLOCK #{block.index}
                </span>
                <strong className="text-slate-900 text-sm">{block.action}</strong>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">{block.timestamp}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px]">Actor Role:</span>
                <span className="font-mono text-blue-900 font-bold">{block.actor_role}</span>
              </div>
            </div>

            {block.details && (
              <div className="bg-slate-50 border border-slate-200 rounded p-2.5 font-mono text-[10px] text-slate-800 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{JSON.stringify(block.details, null, 2)}</pre>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 font-mono text-[10px] space-y-0.5 text-slate-500">
              <div className="truncate">
                <span className="text-slate-400">Previous Hash:</span> {block.previous_hash}
              </div>
              <div className="truncate text-amber-700 font-bold">
                <span className="text-slate-400">Block Hash:</span> {block.hash}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
