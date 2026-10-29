import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore, USER_PRESETS, RoleType } from '../store/appStore';
import { 
  Building2, ShieldAlert, BarChart3, SearchCheck, UserCheck, 
  PlayCircle, Link2, RefreshCw, ChevronDown, LogIn, LogOut, Check
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
    { name: 'Features & Specs', path: '/features' },
    { name: 'Institution Portal', path: '/institution', role: 'ROLE_INSTITUTION' as RoleType },
    { name: 'AICTE Command', path: '/compliance', role: 'ROLE_AICTE_COMPLIANCE' as RoleType },
    { name: 'Policy & AISHE', path: '/analytics', role: 'ROLE_ANALYTICS_POLICY' as RoleType },
    { name: 'Public Verifier', path: '/verify', role: 'ROLE_EMPLOYER_VERIFIER' as RoleType },
    { name: 'Student Wallet', path: '/student-wallet', role: 'ROLE_STUDENT_WALLET' as RoleType },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.role) {
      loginAs(link.role);
    }
    navigate(link.path);
  };

  const handleRoleSelect = (roleKey: RoleType) => {
    loginAs(roleKey);
    setIsUserMenuOpen(false);
    navigate(USER_PRESETS[roleKey].defaultPath);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B2240] text-white shadow-md border-b-2 border-amber-500">
      
      {/* Main Official AICTE Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* AICTE Logo & Branding */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center border-2 border-amber-500 shadow-sm flex-shrink-0 group-hover:scale-105 transition">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#0B2240]">
                <circle cx="50" cy="50" r="45" fill="#f8fafc" stroke="#0B2240" strokeWidth="4" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#D97706" strokeWidth="2.5" strokeDasharray="4 2" />
                <path d="M50 24 Q57 38 50 48 Q43 38 50 24" fill="#D97706" />
                <path d="M36 60 Q50 54 64 60 L60 68 Q50 64 40 68 Z" fill="#0B2240" />
                <circle cx="50" cy="50" r="5" fill="#1E3A8A" />
              </svg>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  AICTE &middot; Ministry of Education
                </span>
                <span className="bg-blue-900/90 text-blue-200 border border-blue-700 text-[9px] px-1.5 py-0.2 rounded font-mono hidden sm:inline">
                  PS 26063
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center space-x-1.5">
                <span>APAAR-Setu</span>
                <span className="text-xs font-normal text-slate-300 hidden md:inline">
                  | National Student Registry & Verification
                </span>
              </h1>
            </div>
          </Link>

          {/* Primary Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link)}
                  className={`px-3 py-1.5 rounded-md transition ${
                    isActive
                      ? 'bg-white text-[#0B2240] font-bold shadow-xs'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right-Side Utility Actions & User Menu */}
          <div className="flex items-center space-x-2.5">
            
            {/* Sync Central DB */}
            <button
              onClick={handleRefresh}
              title="Synchronize Live Central State"
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            {/* SHA-256 Audit Trail Trigger */}
            <button
              onClick={() => setIsAuditDrawerOpen(true)}
              className="hidden sm:flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs px-2.5 py-1.5 rounded font-semibold transition shadow-xs border border-amber-400/40"
              title="Open SHA-256 Merkle Audit Ledger"
            >
              <Link2 className="w-3.5 h-3.5 text-amber-200" />
              <span>Audit Trail</span>
              <span className="bg-black/30 text-amber-100 font-mono text-[10px] px-1 py-0.2 rounded">
                {auditBlocks.length}
              </span>
            </button>

            {/* User Profile & Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md py-1 px-2.5 text-xs text-left transition"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500 text-[#0B2240] font-bold flex items-center justify-center text-[10px] font-mono">
                  {currentUser.avatarText}
                </div>
                <div className="hidden md:block">
                  <div className="text-white font-semibold text-[11px] truncate max-w-[120px]">
                    {currentUser.name}
                  </div>
                  <div className="text-amber-400 text-[9px] font-mono uppercase tracking-wider">
                    {currentUser.role.replace('ROLE_', '')}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>

              {/* User / Role Dropdown Menu */}
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
                    {(Object.keys(USER_PRESETS) as RoleType[]).map((rKey) => {
                      const u = USER_PRESETS[rKey];
                      const isSelected = currentUser.role === rKey;
                      return (
                        <button
                          key={rKey}
                          onClick={() => handleRoleSelect(rKey)}
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

      {/* Sub-Bar: SIH Evaluator Quick-Demo & Scenario Bar (Consistent Across All Pages) */}
      <div className="bg-[#071629] border-t border-blue-950 py-1.5 px-4 sm:px-6 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
          
          {/* Quick Role Jumping Bar */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider mr-1 flex-shrink-0">
              Active Role:
            </span>
            {[
              { id: 'ROLE_INSTITUTION', label: '1. Registrar', path: '/institution' },
              { id: 'ROLE_AICTE_COMPLIANCE', label: '2. Compliance RO/HQ', path: '/compliance' },
              { id: 'ROLE_ANALYTICS_POLICY', label: '3. Policy & AISHE', path: '/analytics' },
              { id: 'ROLE_EMPLOYER_VERIFIER', label: '4. Public Verifier', path: '/verify' },
              { id: 'ROLE_STUDENT_WALLET', label: '5. Student Wallet', path: '/student-wallet' },
            ].map((item) => {
              const isCurrent = currentUser.role === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    loginAs(item.id as RoleType);
                    navigate(item.path);
                  }}
                  className={`text-[11px] px-2.5 py-0.5 rounded font-medium whitespace-nowrap transition border ${
                    isCurrent
                      ? 'bg-amber-500 text-[#0B2240] border-amber-400 font-bold shadow-xs'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Quick Demo Scenario Selector */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="flex items-center space-x-1 text-amber-300 text-[11px] font-semibold">
              <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">SIH Demo Scenarios:</span>
            </div>

            <select
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > 0) {
                  loadDemoScenario(val);
                  // Auto-route based on scenario
                  if (val === 1 || val === 4 || val === 5) navigate('/institution');
                  else if (val === 2 || val === 3) navigate('/compliance');
                  else if (val === 6) navigate('/verify');
                }
              }}
              defaultValue=""
              className="bg-slate-900 border border-amber-500/60 text-amber-200 text-[11px] rounded px-2 py-0.5 font-medium focus:ring-1 focus:ring-amber-400 cursor-pointer shadow-xs"
            >
              <option value="" disabled>Select Demo Test Case (1 to 6)...</option>
              <option value="1">Scenario 1: Clean Batch Admission Sync (MAIT Delhi)</option>
              <option value="2">Scenario 2: Cross-College Duplicate APAAR Lock</option>
              <option value="3">Scenario 3: Excess Admission Breach (Seat 61/60)</option>
              <option value="4">Scenario 4: Unapproved NRI Quota Violation</option>
              <option value="5">Scenario 5: Foreign National (SII) & Provisional APAAR</option>
              <option value="6">Scenario 6: Dual-ID Certificate & DPDP Consent</option>
            </select>
          </div>

        </div>
      </div>

    </header>
  );
};
