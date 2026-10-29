import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { X, ShieldCheck, Cpu, Terminal, Key, Activity, ToggleLeft, ToggleRight } from 'lucide-react';

export const AdapterInspectorModal: React.FC = () => {
  const { isAdapterModalOpen, setIsAdapterModalOpen, apiEnvMode, setApiEnvMode, showToast } = useAppStore();
  const [adapterData, setAdapterData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/api/adapters/status');
      if (res.ok) {
        setAdapterData(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdapterModalOpen) {
      fetchStatus();
    }
  }, [isAdapterModalOpen]);

  const handleToggle = async () => {
    const nextMode = apiEnvMode === 'SANDBOX_MOCK' ? 'PRODUCTION_GOV' : 'SANDBOX_MOCK';
    try {
      const res = await fetch('http://localhost:8000/api/adapters/toggle-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: nextMode })
      });
      if (res.ok) {
        setApiEnvMode(nextMode);
        await fetchStatus();
        showToast(`API Environment Mode switched to: ${nextMode}`);
      }
    } catch (e: any) {
      showToast(`Error switching mode: ${e.message}`);
    }
  };

  if (!isAdapterModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-slate-700 rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0B2240] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center space-x-2.5">
            <Cpu className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">External Digital Public Infrastructure (DPI) Gateway</h3>
              <p className="text-xs text-slate-300">Live Statutory API Adapters & Environment Key Inspector</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdapterModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Environment Mode Switcher Banner */}
          <div className="bg-slate-50 border border-slate-300 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Active Operational Mode</span>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className={`w-2.5 h-2.5 rounded-full ${apiEnvMode === 'SANDBOX_MOCK' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                <span className="font-mono font-bold text-slate-900 text-sm">{apiEnvMode}</span>
                <span className="text-xs text-slate-500 font-mono">({adapterData?.latency_ms || 24}ms latency)</span>
              </div>
            </div>

            <button
              onClick={handleToggle}
              className="flex items-center space-x-2 bg-white hover:bg-slate-100 border border-slate-400 text-slate-800 text-xs px-3.5 py-1.5 rounded font-semibold shadow-xs transition"
            >
              {apiEnvMode === 'SANDBOX_MOCK' ? (
                <>
                  <span>Switch to Production</span>
                  <ToggleLeft className="w-5 h-5 text-amber-600" />
                </>
              ) : (
                <>
                  <span>Switch to Sandbox</span>
                  <ToggleRight className="w-5 h-5 text-emerald-600" />
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            The platform is engineered with a plug-and-play adapter layer. In <strong>SANDBOX_MOCK</strong> mode, the 10 statutory rules validate against deterministic National Academic Depository & MHA e-FRRO test suites. Switching to <strong>PRODUCTION_GOV</strong> directs calls to live NIC / MoE gateways.
          </p>

          {/* Adapter Cards List */}
          <div className="space-y-2.5">
            {adapterData?.adapters?.map((ad: any, idx: number) => (
              <div key={idx} className="border border-slate-200 rounded p-3 bg-white hover:border-slate-300 transition text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <span className="text-blue-900 font-mono">#{idx+1}</span>
                    <span>{ad.name}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                    {ad.status}
                  </span>
                </div>
                
                <p className="text-slate-600 text-[11px] mt-1">{ad.purpose}</p>

                <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Terminal className="w-3 h-3 text-slate-400" />
                    <span>{ad.protocol}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Key className="w-3 h-3 text-amber-500" />
                    <span>Key: {ad.key_masked}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-300 flex justify-end">
          <button
            onClick={() => setIsAdapterModalOpen(false)}
            className="bg-[#0B2240] hover:bg-slate-800 text-white text-xs px-4 py-1.5 rounded font-medium transition"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
