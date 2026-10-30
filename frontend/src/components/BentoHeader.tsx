import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore, RoleType } from '../store/appStore';
import { 
  Search, Plus, Download, RefreshCw, Sun, Bell, 
  PlayCircle, Check, ChevronDown, Sparkles
} from 'lucide-react';

export const BentoHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    currentUser, 
    loginAs, 
    role, 
    refreshData, 
    showToast, 
    setIsUploadModalOpen, 
    setIsCommandPaletteOpen,
    exportDataPackage,
    loadDemoScenario
  } = useAppStore();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Synchronized with AICTE Central Database.");
    }, 400);
  };

  const roles = [
    { id: 'ROLE_INSTITUTION' as RoleType, label: '🏛️ Registrar', path: '/institution' },
    { id: 'ROLE_AICTE_COMPLIANCE' as RoleType, label: '🛡️ AICTE Auditor', path: '/compliance' },
    { id: 'ROLE_ANALYTICS_POLICY' as RoleType, label: '📊 Policy & NBA', path: '/analytics' },
    { id: 'ROLE_EMPLOYER_VERIFIER' as RoleType, label: '🔍 Verifier BGV', path: '/verify' },
    { id: 'ROLE_STUDENT_WALLET' as RoleType, label: '🎓 Student Wallet', path: '/student-wallet' },
  ];

  // Dynamic Workspace Title based on path
  const getPageTitle = () => {
    if (location.pathname === '/compliance') return 'AICTE Compliance & Vigilance Command';
    if (location.pathname === '/analytics') return 'National Policy Analytics & AISHE Rollup';
    if (location.pathname === '/verify') return 'Employer Background Verification Portal';
    if (location.pathname === '/student-wallet') return 'Student Sovereign DPDP Wallet';
    if (location.pathname === '/features') return 'Statutory Features & Rules Sandbox';
    if (location.pathname === '/explainer') return '3-Minute Motion Graphics Explainer';
    return 'Institutional APAAR Registry Overview';
  };

  return (
    <header className="bg-white/80 backdrop-blur-md rounded-3xl p-3 sm:p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-3 select-none">
      {/* Left: Greeting, Date & Weather (Replicating Image 2 & 3 Header) */}
      <div className="flex items-center space-x-3 w-full md:w-auto">
        <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-200/60">
          <Sun size={18} />
        </div>
        <div>
          <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 font-medium">
            <span>Monday, Oct 31, 2026</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-700 font-bold">Ministry of Education · AICTE</span>
          </div>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight mt-0.5">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Center: The 5 Floating Role Switcher Pills (Signature from Reference UI) */}
      <div className="flex items-center space-x-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 overflow-x-auto max-w-full scrollbar-none">
        {roles.map((r) => {
          const isCurrent = currentUser.role === r.id;
          return (
            <button
              key={r.id}
              onClick={() => {
                loginAs(r.id);
                navigate(r.path);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isCurrent
                  ? 'bg-[#141519] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      {/* Right: Cmd+K Search, Scenarios Selector, Upload & Export Pills */}
      <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
        {/* Global Cmd+K Search Pill */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden xl:flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 px-3 py-2 rounded-full border border-slate-200 text-xs font-medium transition cursor-pointer"
          title="Open Command Palette (⌘K)"
        >
          <Search size={13} />
          <span>Quick search...</span>
          <kbd className="bg-white text-slate-400 text-[10px] font-mono px-1.5 py-0.2 rounded border border-slate-200 font-bold">
            ⌘K
          </kbd>
        </button>

        {/* Demo Scenarios Selector Dropdown */}
        <div className="flex items-center space-x-1 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 rounded-full px-2.5 py-1 text-xs font-bold transition">
          <PlayCircle size={13} className="text-amber-600 flex-shrink-0" />
          <select
            defaultValue=""
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0) {
                loadDemoScenario(val);
                if (val === 1 || val === 4 || val === 5) navigate('/institution');
                else if (val === 2 || val === 3) navigate('/compliance');
                else if (val === 6) navigate('/verify');
              }
            }}
            className="bg-transparent text-amber-900 text-xs font-bold focus:outline-none cursor-pointer max-w-[130px] truncate"
          >
            <option value="" disabled>Demo Scenarios...</option>
            <option value="1">1: Clean Batch (MAIT)</option>
            <option value="2">2: Duplicate Lock (Pune)</option>
            <option value="3">3: Excess 61/60 (Apex)</option>
            <option value="4">4: Unapproved NRI</option>
            <option value="5">5: Foreign National (SII)</option>
            <option value="6">6: Dual-ID & DPDP</option>
          </select>
        </div>

        {/* Refresh Central State Button */}
        <button
          onClick={handleRefresh}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition cursor-pointer"
          title="Synchronize Live AICTE State"
        >
          <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-amber-600' : ''} />
        </button>

        {/* Export Data Pill (Replicating Image 4 Export button) */}
        <button
          onClick={() => exportDataPackage('ALL')}
          className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 text-xs font-bold px-3.5 py-2 rounded-full shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
          title="Download AISHE & NBA Verified Data Package"
        >
          <Download size={13} />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Role-Specific Primary CTA (Strict Isolation: No Upload form in Auditor or Student views) */}
        {role === 'ROLE_INSTITUTION' && (
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#141519] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs transition flex items-center space-x-1.5 cursor-pointer flex-shrink-0"
          >
            <Plus size={13} strokeWidth={3} />
            <span>Upload Roster</span>
          </button>
        )}

        {role === 'ROLE_AICTE_COMPLIANCE' && (
          <button
            onClick={() => {
              const el = document.getElementById('excess-intake-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-xs transition flex items-center space-x-1.5 cursor-pointer flex-shrink-0"
          >
            <span>Quarantine Queue</span>
          </button>
        )}

        {role === 'ROLE_ANALYTICS_POLICY' && (
          <button
            onClick={() => exportDataPackage('AISHE')}
            className="bg-[#1868FF] hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-xs transition flex items-center space-x-1.5 cursor-pointer flex-shrink-0"
          >
            <Download size={13} />
            <span>AISHE DCF-II</span>
          </button>
        )}

        {role === 'ROLE_EMPLOYER_VERIFIER' && (
          <button
            onClick={() => {
              const input = document.getElementById('verifier-search-input');
              if (input) input.focus();
            }}
            className="bg-[#1868FF] hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-xs transition flex items-center space-x-1.5 cursor-pointer flex-shrink-0"
          >
            <Search size={13} />
            <span>Verify APAAR</span>
          </button>
        )}

        {role === 'ROLE_STUDENT_WALLET' && (
          <button
            onClick={() => {
              const el = document.getElementById('dpdp-consent-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#10B981] hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-xs transition flex items-center space-x-1.5 cursor-pointer flex-shrink-0"
          >
            <span>DPDP Consent</span>
          </button>
        )}
      </div>
    </header>
  );
};
