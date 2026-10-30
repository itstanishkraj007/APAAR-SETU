import React, { useEffect, useState } from 'react';
import { useAppStore, USER_PRESETS, RoleType } from '../../store/appStore';
import { useNavigate } from 'react-router-dom';
import { 
  Search, X, Sparkles, Building2, ShieldAlert, BarChart3, 
  SearchCheck, UserCheck, FileSpreadsheet, ArrowRight, PlayCircle
} from 'lucide-react';

export const CommandPaletteModal: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    loginAs, 
    loadDemoScenario, 
    exportDataPackage,
    students,
    institutions,
    setSelectedForensicStudent
  } = useAppStore();

  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const roles = [
    { id: 'ROLE_INSTITUTION' as RoleType, label: '🏛️ Switch to Institution Registrar (MAIT Delhi)', path: '/institution' },
    { id: 'ROLE_AICTE_COMPLIANCE' as RoleType, label: '🛡️ Switch to AICTE Compliance Auditor', path: '/compliance' },
    { id: 'ROLE_ANALYTICS_POLICY' as RoleType, label: '📊 Switch to Policy & Accreditation (AISHE/NBA)', path: '/analytics' },
    { id: 'ROLE_EMPLOYER_VERIFIER' as RoleType, label: '🔍 Switch to Employer Background Verifier (TCS)', path: '/verify' },
    { id: 'ROLE_STUDENT_WALLET' as RoleType, label: '🎓 Switch to Student DPDP Wallet (Aarav Sharma)', path: '/student-wallet' },
  ];

  const scenarios = [
    { num: 1, title: 'Scenario 1: Clean Batch Sync (MAIT Delhi)', path: '/institution' },
    { num: 2, title: 'Scenario 2: Cross-College Duplicate Lock', path: '/compliance' },
    { num: 3, title: 'Scenario 3: Excess Intake Breach (61/60)', path: '/compliance' },
    { num: 4, title: 'Scenario 4: Unapproved NRI Quota Violation', path: '/institution' },
    { num: 5, title: 'Scenario 5: Foreign National (SII) Bridge', path: '/institution' },
    { num: 6, title: 'Scenario 6: Dual-ID Degree & DPDP Scorecard', path: '/verify' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-100 flex items-center space-x-3 bg-slate-50/50">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, role, or student name..."
            className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none placeholder-slate-400"
          />
          <kbd className="bg-slate-200 text-slate-600 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
            ESC
          </kbd>
        </div>

        {/* List of Results */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-3 text-xs">
          {/* Quick Roles */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
              Switch Operational Role
            </span>
            <div className="space-y-0.5">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    loginAs(r.id);
                    navigate(r.path);
                    setIsCommandPaletteOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-800 font-semibold flex items-center justify-between transition cursor-pointer"
                >
                  <span>{r.label}</span>
                  <ArrowRight size={12} className="text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Demo Scenarios */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
              Trigger Demo Scenarios (1-6)
            </span>
            <div className="space-y-0.5">
              {scenarios.map((sc) => (
                <button
                  key={sc.num}
                  onClick={() => {
                    loadDemoScenario(sc.num);
                    navigate(sc.path);
                    setIsCommandPaletteOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 text-slate-800 font-medium flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <PlayCircle size={13} className="text-amber-600" />
                    <span>{sc.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Run</span>
                </button>
              ))}
            </div>
          </div>

          {/* Export Actions */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
              Data Package Downloads
            </span>
            <div className="grid grid-cols-3 gap-1.5 px-2">
              <button
                onClick={() => {
                  exportDataPackage('AISHE');
                  setIsCommandPaletteOpen(false);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded-xl text-center font-bold text-[11px] transition cursor-pointer"
              >
                AISHE DCF-II
              </button>
              <button
                onClick={() => {
                  exportDataPackage('NBA');
                  setIsCommandPaletteOpen(false);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded-xl text-center font-bold text-[11px] transition cursor-pointer"
              >
                NBA Tier-I
              </button>
              <button
                onClick={() => {
                  exportDataPackage('NIRF');
                  setIsCommandPaletteOpen(false);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded-xl text-center font-bold text-[11px] transition cursor-pointer"
              >
                NIRF Return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
