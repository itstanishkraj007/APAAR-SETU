import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { 
  ShieldCheck, Database, FileText, LayoutDashboard, 
  ExternalLink, ArrowRight, ShieldAlert, Sparkles, Terminal
} from 'lucide-react';

export const TopSaaSNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    currentUser, 
    fontSizeLevel, 
    setFontSizeLevel, 
    apiEnvMode, 
    setIsAdapterModalOpen, 
    setIsAuditDrawerOpen,
    role
  } = useAppStore();

  const isCurrentTab = (path: string) => {
    if (path === '/' && (location.pathname === '/' || location.pathname === '/home')) return true;
    if (path === '/features' && location.pathname === '/features') return true;
    if (path === '/portal' && (
      location.pathname === '/portal' || 
      location.pathname === '/institution' || 
      location.pathname === '/compliance' || 
      location.pathname === '/analytics' || 
      location.pathname === '/verify' || 
      location.pathname === '/student-wallet'
    )) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Official Government of India Tricolor Border */}
      <div className="h-[3px] w-full flex shrink-0">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-[#FFFFFF]"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left Branding: Emblem + MoE/AICTE Title */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F5B82E] to-[#D97706] text-[#071629] flex items-center justify-center font-extrabold shadow-sm group-hover:scale-105 transition">
            <ShieldCheck size={22} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-widest leading-none">
                भारत सरकार &middot; AICTE
              </span>
              <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-semibold">
                NEP 2020
              </span>
            </div>
            <div className="text-base sm:text-lg font-black text-[#0B2240] tracking-tight leading-none mt-1 flex items-center gap-1.5">
              <span>APAAR-Setu</span>
              <span className="hidden md:inline-block text-[11px] font-medium text-slate-400">
                National Student Registry
              </span>
            </div>
          </div>
        </div>

        {/* Center: The 3 Primary SaaS Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2 bg-slate-100/90 p-1 rounded-full border border-slate-200/60 shrink-0">
          <button
            onClick={() => navigate('/')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              isCurrentTab('/')
                ? 'bg-[#141519] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>Home</span>
          </button>

          <button
            onClick={() => navigate('/features')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              isCurrentTab('/features')
                ? 'bg-[#141519] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>Features & Advantages</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          </button>

          <button
            onClick={() => navigate('/portal')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              isCurrentTab('/portal')
                ? 'bg-[#1868FF] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <LayoutDashboard size={14} />
            <span>Role-Isolated Portal</span>
          </button>
        </nav>

        {/* Right: API Adapter Pill, Font Sizing, Audit Ledger, CTA */}
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* SANDBOX_MOCK vs PRODUCTION_GOV Adapter Status Pill */}
          <button
            onClick={() => setIsAdapterModalOpen(true)}
            className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold cursor-pointer hover:bg-emerald-100 transition"
            title="Inspect 10 Government DPI Gateways (DigiLocker, ABC, Samarth, e-FRRO)"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono">{apiEnvMode === 'SANDBOX_MOCK' ? 'SANDBOX_MOCK' : 'PRODUCTION_GOV'}</span>
            <span className="text-[10px] text-emerald-600 underline">10/10 DPI</span>
          </button>

          {/* SHA-256 Merkle Ledger Trigger */}
          <button
            onClick={() => setIsAuditDrawerOpen(true)}
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer border border-slate-200 transition"
            title="Open Immutable SHA-256 Merkle Audit Log"
          >
            <Terminal size={13} className="text-slate-500" />
            <span className="font-mono text-[11px]">Audit Ledger</span>
          </button>

          {/* GIGW Accessibility Font Resizer (A-, A, A+) */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-[11px] font-bold text-slate-700">
            <button
              onClick={() => setFontSizeLevel(-1)}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSizeLevel === -1 ? 'bg-white shadow-xs text-[#0B2240]' : 'hover:bg-slate-200'}`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeLevel(0)}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSizeLevel === 0 ? 'bg-white shadow-xs text-[#0B2240]' : 'hover:bg-slate-200'}`}
              title="Default Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel(1)}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSizeLevel === 1 ? 'bg-white shadow-xs text-[#0B2240]' : 'hover:bg-slate-200'}`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Launch Portal CTA Button */}
          <button
            onClick={() => navigate('/portal')}
            className="flex items-center space-x-1.5 bg-[#141519] hover:bg-slate-800 text-white px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition shadow-xs"
          >
            <span>Enter Portal</span>
            <ArrowRight size={13} className="text-[#FACC15]" />
          </button>

        </div>

      </div>
    </header>
  );
};
