import React from 'react';
import { useAppStore } from '../store/appStore';
import { ShieldCheck, Eye, Terminal } from 'lucide-react';

export const GovernmentStrip: React.FC = () => {
  const { fontSizeLevel, setFontSizeLevel, apiEnvMode, setIsAdapterModalOpen } = useAppStore();

  const handleFontDecrease = () => setFontSizeLevel(prev => Math.max(prev - 1, -1));
  const handleFontReset = () => setFontSizeLevel(() => 0);
  const handleFontIncrease = () => setFontSizeLevel(prev => Math.min(prev + 1, 1));

  return (
    <div>
      {/* Official Indian Tricolor 3px Banner */}
      <div className="h-[3px] w-full flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-[#FFFFFF]"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      {/* Top Gov Info Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-slate-100 flex items-center space-x-1.5">
            <span className="text-amber-400 font-bold">भारत सरकार</span>
            <span className="text-slate-500">|</span>
            <span>Government of India</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 hidden sm:inline">Ministry of Education</span>
          </span>
          <span className="bg-blue-950 text-blue-300 border border-blue-800 text-[10px] px-1.5 py-0.5 rounded font-mono font-medium">
            GIGW 3.0
          </span>
        </div>

        <div className="flex items-center space-x-4 mt-1 sm:mt-0">
          {/* Accessibility Font Resizer */}
          <div className="flex items-center space-x-1 bg-slate-800 rounded px-1 py-0.5 border border-slate-700">
            <button
              onClick={handleFontDecrease}
              title="Decrease Font Size"
              className={`px-1.5 py-0.5 text-[11px] rounded transition-colors ${fontSizeLevel === -1 ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-700 text-slate-300'}`}
            >
              A-
            </button>
            <button
              onClick={handleFontReset}
              title="Standard Font Size"
              className={`px-1.5 py-0.5 text-[11px] rounded transition-colors ${fontSizeLevel === 0 ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-700 text-slate-300'}`}
            >
              A
            </button>
            <button
              onClick={handleFontIncrease}
              title="Increase Font Size"
              className={`px-1.5 py-0.5 text-[11px] rounded transition-colors ${fontSizeLevel === 1 ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-700 text-slate-300'}`}
            >
              A+
            </button>
          </div>

          {/* Screen Reader Aid */}
          <div className="hidden md:flex items-center space-x-1 text-slate-400 text-[11px]">
            <Eye className="w-3.5 h-3.5" />
            <span>Screen Reader</span>
          </div>

          {/* DPI API Adapter Mode Pill (Interactive Modal Trigger) */}
          <button
            onClick={() => setIsAdapterModalOpen(true)}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-[11px] px-2.5 py-0.5 rounded-full transition-all group"
            title="Inspect External DPI Government Adapters & Keys"
          >
            <span className={`w-2 h-2 rounded-full ${apiEnvMode === 'SANDBOX_MOCK' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
            <span className="font-mono font-medium">{apiEnvMode}</span>
            <Terminal className="w-3 h-3 text-slate-400 group-hover:text-amber-400 transition-colors ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
