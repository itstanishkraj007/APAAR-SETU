import React from 'react';
import { useAppStore } from '../store/appStore';
import { Eye, Terminal, Globe2 } from 'lucide-react';

export const GovernmentStrip: React.FC = () => {
  const { fontSizeLevel, setFontSizeLevel, apiEnvMode, setIsAdapterModalOpen } = useAppStore();

  const handleFontDecrease = () => setFontSizeLevel(prev => Math.max(prev - 1, -1));
  const handleFontReset = () => setFontSizeLevel(() => 0);
  const handleFontIncrease = () => setFontSizeLevel(prev => Math.min(prev + 1, 1));

  return (
    <div className="w-full bg-[#071629] text-slate-300 text-[11px] border-b border-slate-800 select-none">
      {/* Official Indian Tricolor 3px Accent Line */}
      <div className="h-[3px] w-full flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-[#FFFFFF]"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      {/* Main Single-Line Gov Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-between gap-4">
        
        {/* Left: Official Government of India Identity */}
        <div className="flex items-center space-x-2.5 truncate">
          <span className="text-sm leading-none" role="img" aria-label="India Flag">🇮🇳</span>
          <span className="font-semibold text-slate-100 whitespace-nowrap">
            <span className="text-amber-400 font-bold">भारत सरकार</span>
            <span className="text-slate-600 mx-1.5">|</span>
            <span>Government of India</span>
            <span className="text-slate-600 mx-1.5 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline">Ministry of Education</span>
          </span>
          <span className="hidden lg:inline bg-blue-950 text-blue-300 border border-blue-800/80 text-[10px] px-1.5 py-0.2 rounded font-mono font-medium">
            GIGW 3.0
          </span>
        </div>

        {/* Right: Accessibility Controls & DPI Mode Pill */}
        <div className="flex items-center space-x-3.5 flex-shrink-0">
          
          {/* Accessibility Font Resizer */}
          <div className="flex items-center space-x-0.5 bg-slate-800/90 rounded px-1 py-0.5 border border-slate-700">
            <button
              onClick={handleFontDecrease}
              title="Decrease Font Size"
              className={`px-1.5 py-0.2 text-[10px] rounded transition-colors ${fontSizeLevel === -1 ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-700 text-slate-300'}`}
            >
              A-
            </button>
            <button
              onClick={handleFontReset}
              title="Default Font Size"
              className={`px-1.5 py-0.2 text-[10px] rounded transition-colors ${fontSizeLevel === 0 ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-700 text-slate-300'}`}
            >
              A
            </button>
            <button
              onClick={handleFontIncrease}
              title="Increase Font Size"
              className={`px-1.5 py-0.2 text-[10px] rounded transition-colors ${fontSizeLevel === 1 ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-700 text-slate-300'}`}
            >
              A+
            </button>
          </div>

          {/* Screen Reader Aid */}
          <div className="hidden sm:flex items-center space-x-1 text-slate-400 text-[10px]">
            <Eye className="w-3 h-3 text-slate-500" />
            <span>Screen Reader</span>
          </div>

          {/* DPI Gateway Pill (Clickable) */}
          <button
            onClick={() => setIsAdapterModalOpen(true)}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-[10px] px-2.5 py-0.5 rounded-full transition-all group"
            title="Inspect 10 External Government DPI Gateways"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${apiEnvMode === 'SANDBOX_MOCK' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
            <span className="font-mono font-medium">{apiEnvMode} (10 DPI Ready)</span>
            <Terminal className="w-2.5 h-2.5 text-slate-400 group-hover:text-amber-400 transition-colors ml-0.5" />
          </button>

        </div>

      </div>
    </div>
  );
};
