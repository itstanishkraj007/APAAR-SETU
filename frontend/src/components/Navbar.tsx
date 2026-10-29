import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore, USER_PRESETS, RoleType } from '../store/appStore';
import { 
  Building2, ShieldAlert, BarChart3, SearchCheck, UserCheck, 
  PlayCircle, Link2, RefreshCw, ChevronDown, Check, Shield
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    currentUser, 
    loginAs, 
    auditBlocks, 
    setIsAuditDrawerOpen, 
    refreshData, 
    loadDemoScenario, 
    showToast 
  } = useAppStore();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Synchronized with AICTE Central Database.");
    }, 400);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features & Sandbox', path: '/features' },
    { name: 'Role SSO Login', path: '/login' },
    { name: 'Audit Ledger', path: '/audit' }
  ];

  const roles = [
    { id: 'ROLE_INSTITUTION' as RoleType, label: '🏛️ Role 1: Institution Registrar', path: '/institution' },
    { id: 'ROLE_AICTE_COMPLIANCE' as RoleType, label: '🛡️ Role 2: AICTE Auditor', path: '/compliance' },
    { id: 'ROLE_ANALYTICS_POLICY' as RoleType, label: '📊 Role 3: Policy & AISHE', path: '/analytics' },
    { id: 'ROLE_EMPLOYER_VERIFIER' as RoleType, label: '🔍 Role 4: External Verifier', path: '/verify' },
    { id: 'ROLE_STUDENT_WALLET' as RoleType, label: '🎓 Role 5: Student Wallet', path: '/student-wallet' }
  ];

  const handleRoleClick = (r: RoleType, path: string) => {
    loginAs(r);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B2240] text-white shadow-md border-b-2 border-amber-500">
      
      {/* Upper Masthead: Clean, Uncluttered, Spaced Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: AICTE Emblem & Clear Title Hierarchy (No Text Overlap) */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center border-2 border-amber-500 shadow-sm flex-shrink-0 group-hover:scale-105 transition">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#0B2240]">
                <circle cx="50" cy="50" r="45" fill="#f8fafc" stroke="#0B2240" strokeWidth="4" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#D97706" strokeWidth="2.5" strokeDasharray="4 2" />
                <path d="M50 24 Q57 38 50 48 Q43 38 50 24" fill="#D97706" />
                <path d="M36 60 Q50 54 64 60 L60 68 Q50 64 40 68 Z" fill="#0B2240" />
                <circle cx="50" cy="50" r="5" fill="#1E3A8A" />
              </svg>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider leading-none">
                  AICTE &middot; Ministry of Education
                </span>
                <span className="bg-blue-900 text-blue-200 border border-blue-700 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold leading-none hidden sm:inline">
                  PS 26063
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight mt-0.5">
                APAAR-Setu
              </div>
              <div className="text-[10px] text-slate-300 font-normal leading-none hidden md:block mt-0.5">
                National Student Registry & Enrolment Verification System
              </div>
            </div>
          </Link>

          {/* Center: Global Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md transition whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500 text-[#0B2240] font-bold shadow-xs'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Quick Scenario Selector & User Profile */}
          <div className="flex items-center space-x-2.5 flex-shrink-0">
            
            {/* Demo Scenario Selector (Compact, Clean) */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-slate-800/80 border border-slate-600 rounded-md px-2 py-1">
              <PlayCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <select
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val > 0) {
                    loadDemoScenario(val);
                    if (val === 1 || val === 4 || val === 5) navigate('/institution');
                    else if (val === 2 || val === 3) navigate('/compliance');
                    else if (val === 6) navigate('/verify');
                  }
                }}
                defaultValue=""
                className="bg-transparent text-amber-200 text-xs font-semibold focus:outline-hidden cursor-pointer max-w-[170px] truncate"
              >
                <option value="" disabled className="bg-slate-900 text-slate-300">Demo Scenarios (1-6)...</option>
                <option value="1" className="bg-slate-900 text-white">Scenario 1: Clean Batch Sync (MAIT)</option>
                <option value="2" className="bg-slate-900 text-white">Scenario 2: Cross-College Duplicate</option>
                <option value="3" className="bg-slate-900 text-white">Scenario 3: Excess Intake Breach (61/60)</option>
                <option value="4" className="bg-slate-900 text-white">Scenario 4: Unapproved NRI Violation</option>
                <option value="5" className="bg-slate-900 text-white">Scenario 5: Foreign National (SII) Bridge</option>
                <option value="6" className="bg-slate-900 text-white">Scenario 6: Dual-ID Degree & DPDP</option>
              </select>
            </div>

            {/* Sync Central DB */}
            <button
              onClick={handleRefresh}
              title="Synchronize Live Central State"
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            {/* SHA-256 Audit Trail Trigger */}
            <button
              onClick={() => setIsAuditDrawerOpen(true)}
              className="hidden md:flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs px-2.5 py-1.5 rounded font-semibold transition shadow-xs border border-amber-400/40"
              title="Open SHA-256 Merkle Audit Ledger"
            >
              <Link2 className="w-3 h-3 text-amber-200" />
              <span>Audit</span>
              <span className="bg-black/30 text-amber-100 font-mono text-[10px] px-1 py-0.2 rounded font-bold">
                {auditBlocks.length}
              </span>
            </button>

            {/* User Profile & Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md py-1 px-2 text-xs transition"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500 text-[#0B2240] font-bold flex items-center justify-center text-[10px] font-mono flex-shrink-0">
                  {currentUser.avatarText}
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-white font-semibold text-[11px] truncate max-w-[110px]">
                    {currentUser.name}
                  </div>
                  <div className="text-amber-400 text-[9px] font-mono uppercase tracking-wider">
                    {currentUser.role.replace('ROLE_', '')}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-300 py-2 z-50 text-slate-900 animate-in fade-in duration-150">
                  <div className="px-3 py-2 border-b border-slate-200 bg-slate-50">
                    <div className="font-bold text-xs text-slate-900">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-500">{currentUser.designation}</div>
                    <div className="text-[10px] text-blue-900 font-medium truncate mt-0.5">{currentUser.organization}</div>
                  </div>

                  <div className="py-1">
                    <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Switch Active Operational Role:
                    </div>
                    {roles.map((r) => {
                      const u = USER_PRESETS[r.id];
                      const isSelected = currentUser.role === r.id;
                      return (
                        <button
                          key={r.id}
                          onClick={() => {
                            loginAs(r.id);
                            setIsUserMenuOpen(false);
                            navigate(r.path);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 transition ${
                            isSelected ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700'
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{u.name}</div>
                            <div className="text-[10px] text-slate-500">{u.designation}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="border-t border-slate-200 pt-1 mt-1 px-3">
                    <Link
                      to="/login"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block text-center text-xs text-blue-900 font-bold hover:underline py-1"
                    >
                      Open Full Role SSO Login Portal &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Persistent Role Switcher Bar (Lower Zone 2) - Spacious, Distinct, Zero Clutter */}
      <div className="bg-[#071629] border-t border-blue-950 py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          
          <div className="flex items-center space-x-1.5 flex-nowrap py-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mr-1 whitespace-nowrap">
              Operational Workspace:
            </span>
            {roles.map((r) => {
              const isCurrent = currentUser.role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => handleRoleClick(r.id, r.path)}
                  className={`text-xs px-3 py-1 rounded-md font-semibold whitespace-nowrap transition border ${
                    isCurrent
                      ? 'bg-amber-500 text-[#0B2240] border-amber-400 shadow-sm font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          <div className="hidden xl:flex items-center space-x-2 text-[11px] text-slate-400 font-mono whitespace-nowrap">
            <span>State Machine: <strong>CONNECTED</strong></span>
          </div>

        </div>
      </div>

    </header>
  );
};
