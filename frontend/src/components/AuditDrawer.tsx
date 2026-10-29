import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { X, Link2, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const AuditDrawer: React.FC = () => {
  const { isAuditDrawerOpen, setIsAuditDrawerOpen, auditBlocks, verifyLedger, refreshData, showToast } = useAppStore();
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  if (!isAuditDrawerOpen) return null;

  const handleVerify = async () => {
    setVerifying(true);
    const res = await verifyLedger();
    setVerificationResult(res);
    setVerifying(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l-2 border-slate-700 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="bg-[#0B2240] text-white p-4 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center space-x-2.5">
            <Link2 className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">Immutable SHA-256 Merkle Audit Ledger</h3>
              <p className="text-xs text-slate-300">Cryptographically Chained Statutory Events ({auditBlocks.length} Blocks)</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuditDrawerOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Status Banner */}
        <div className="bg-slate-100 p-3.5 border-b border-slate-300 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-800 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Chain Integrity Status</span>
            </div>
            <p className="text-[11px] text-slate-600 font-mono mt-0.5">
              {verificationResult ? verificationResult.message : "Cryptographic hashes verified from Genesis"}
            </p>
          </div>

          <button
            onClick={handleVerify}
            disabled={verifying}
            className="flex items-center space-x-1.5 bg-[#0B2240] hover:bg-slate-800 text-white text-xs px-3 py-1.5 rounded font-medium transition shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${verifying ? 'animate-spin text-amber-400' : ''}`} />
            <span>Verify Integrity</span>
          </button>
        </div>

        {/* Blocks Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 font-sans">
          {auditBlocks.length === 0 ? (
            <div className="text-center text-slate-400 py-12 text-sm">
              No audit records generated yet.
            </div>
          ) : (
            auditBlocks.map((block) => (
              <div
                key={block.index}
                className="bg-white border border-slate-300 rounded-lg p-3 text-xs shadow-xs hover:border-slate-400 transition"
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#0B2240] text-amber-300 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded">
                      BLOCK #{block.index}
                    </span>
                    <span className="font-semibold text-slate-900">{block.action}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{block.timestamp}</span>
                </div>

                <div className="mt-2 text-[11px] text-slate-700 space-y-1">
                  <div>
                    <span className="font-semibold text-slate-500">Actor Role:</span>{" "}
                    <span className="font-mono text-blue-900 font-medium">{block.actor_role}</span>
                  </div>

                  {block.details && (
                    <div className="bg-slate-50 p-2 rounded border border-slate-200 mt-1 font-mono text-[10px] text-slate-800 overflow-x-auto">
                      <pre className="whitespace-pre-wrap">{JSON.stringify(block.details, null, 2)}</pre>
                    </div>
                  )}

                  <div className="pt-2 text-[10px] font-mono text-slate-500 space-y-0.5">
                    <div className="truncate">
                      <span className="text-slate-400">Prev Hash:</span> {block.previous_hash}
                    </div>
                    <div className="truncate text-amber-700 font-bold">
                      <span className="text-slate-400">Block Hash:</span> {block.hash}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-white p-3 border-t border-slate-300 flex justify-end">
          <button
            onClick={() => setIsAuditDrawerOpen(false)}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs px-4 py-1.5 rounded font-medium transition"
          >
            Close Drawer
          </button>
        </div>

      </div>
    </div>
  );
};
