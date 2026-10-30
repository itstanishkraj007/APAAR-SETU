import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore, USER_PRESETS, RoleType } from '../store/appStore';
import { 
  LayoutGrid, ShieldAlert, BarChart3, SearchCheck, UserCheck, 
  Upload, Globe2, FileText, Award, Lock, AlertTriangle, Radar, 
  Building2, Sparkles, Download, TrendingUp, QrCode, History, 
  CreditCard, ShieldCheck, BookOpen, ChevronRight, Check, LogOut,
  Terminal, Globe
} from 'lucide-react';

export const FloatingSidebarRail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    currentUser, 
    loginAs, 
    role, 
    setIsAdapterModalOpen, 
    setIsAuditDrawerOpen,
    setIsUploadModalOpen,
    apiEnvMode,
    showToast,
    exportDataPackage
  } = useAppStore();

  const [isRolePopoverOpen, setIsRolePopoverOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string>('default');

  // Strict role-specific sidebar items per Part 3 Isolation Contract
  const getRoleNavItems = () => {
    switch (role) {
      case 'ROLE_INSTITUTION':
        return [
          {
            id: 'seat-matrix',
            label: 'Seat Matrix Overview',
            icon: LayoutGrid,
            action: () => {
              setActiveItemId('seat-matrix');
              const el = document.getElementById('seat-matrix-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else showToast("Navigated to 5-Bucket Seat Matrix Overview.");
            }
          },
          {
            id: 'student-ingestion',
            label: 'Student Ingestion (CSV/ERP)',
            icon: Upload,
            action: () => {
              setActiveItemId('student-ingestion');
              setIsUploadModalOpen(true);
            }
          },
          {
            id: 'nri-fn-bridge',
            label: 'NRI / OCI / FN Bridge',
            icon: Globe2,
            action: () => {
              setActiveItemId('nri-fn-bridge');
              const el = document.getElementById('student-directory-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              showToast("Filtered view for Foreign National (FN) & OCI Supernumerary Cohort.");
            }
          },
          {
            id: 'student-directory',
            label: 'Student Directory',
            icon: FileText,
            action: () => {
              setActiveItemId('student-directory');
              const el = document.getElementById('student-directory-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else showToast("Navigated to Master Student Directory.");
            }
          },
          {
            id: 'certificate-studio',
            label: 'Dual-ID Certificate Studio',
            icon: Award,
            action: () => {
              setActiveItemId('certificate-studio');
              showToast("Dual-ID W3C Verifiable Credential Studio Ready.");
            }
          }
        ];

      case 'ROLE_AICTE_COMPLIANCE':
        return [
          {
            id: 'national-command',
            label: 'National Command',
            icon: ShieldAlert,
            action: () => {
              setActiveItemId('national-command');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              showToast("AICTE National Vigilance Command Center Active.");
            }
          },
          {
            id: 'duplicate-locks',
            label: 'Duplicate APAAR Locks',
            icon: Lock,
            action: () => {
              setActiveItemId('duplicate-locks');
              const el = document.getElementById('duplicate-queue-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              showToast("Cross-Institution Duplicate Lock Queue Active.");
            }
          },
          {
            id: 'excess-quarantine',
            label: 'Excess Intake Quarantine',
            icon: AlertTriangle,
            action: () => {
              setActiveItemId('excess-quarantine');
              const el = document.getElementById('excess-intake-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              showToast("Excess Admission Quarantine Table Focused.");
            }
          },
          {
            id: 'ai-radar',
            label: 'AI Anomaly Radar',
            icon: Radar,
            action: () => {
              setActiveItemId('ai-radar');
              const el = document.getElementById('anomaly-radar-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              showToast("Isolation Forest + SHAP Anomaly Radar Activated.");
            }
          },
          {
            id: 'institution-dir',
            label: 'Institution Directory',
            icon: Building2,
            action: () => {
              setActiveItemId('institution-dir');
              showToast("Inspecting 10,420+ Approved Institutions.");
            }
          }
        ];

      case 'ROLE_ANALYTICS_POLICY':
        return [
          {
            id: 'national-stats',
            label: 'National Enrolment Stats',
            icon: BarChart3,
            action: () => {
              setActiveItemId('national-stats');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              showToast("Viewing Real-Time National Enrolment Rollup.");
            }
          },
          {
            id: 'policy-copilot',
            label: 'AI Policy Copilot',
            icon: Sparkles,
            action: () => {
              setActiveItemId('policy-copilot');
              const el = document.getElementById('policy-copilot-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              showToast("AI Text-to-SQL Policy Copilot Ready.");
            }
          },
          {
            id: 'aishe-exports',
            label: 'AISHE / NBA Exports',
            icon: Download,
            action: () => {
              setActiveItemId('aishe-exports');
              exportDataPackage('AISHE');
            }
          },
          {
            id: 'nep-mobility',
            label: 'NEP Mobility Tracker',
            icon: TrendingUp,
            action: () => {
              setActiveItemId('nep-mobility');
              showToast("Academic Bank of Credits (ABC) Credit Transfer Matrix.");
            }
          }
        ];

      case 'ROLE_EMPLOYER_VERIFIER':
        return [
          {
            id: 'verify-credential',
            label: 'Verify Credential',
            icon: SearchCheck,
            action: () => {
              setActiveItemId('verify-credential');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              showToast("Search by APAAR ID or Roll Number.");
            }
          },
          {
            id: 'qr-scanner',
            label: 'QR Scanner',
            icon: QrCode,
            action: () => {
              setActiveItemId('qr-scanner');
              showToast("Simulating W3C Verifiable QR Code Verification.");
            }
          },
          {
            id: 'history',
            label: 'Verification History',
            icon: History,
            action: () => {
              setActiveItemId('history');
              showToast("Showing audit trail of BGV verification queries.");
            }
          }
        ];

      case 'ROLE_STUDENT_WALLET':
        return [
          {
            id: 'my-credential',
            label: 'My APAAR Credential',
            icon: CreditCard,
            action: () => {
              setActiveItemId('my-credential');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              showToast("Official Dual-ID Digital Credential Active.");
            }
          },
          {
            id: 'consent-requests',
            label: 'DPDP Consent Requests',
            icon: ShieldCheck,
            action: () => {
              setActiveItemId('consent-requests');
              const el = document.getElementById('dpdp-consent-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              showToast("DPDP Act 2023 Sovereign Consent Dashboard.");
            }
          },
          {
            id: 'abc-ledger',
            label: 'ABC Credit Ledger',
            icon: BookOpen,
            action: () => {
              setActiveItemId('abc-ledger');
              const el = document.getElementById('abc-credits-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              showToast("Academic Bank of Credits (ABC) Sovereign Ledger.");
            }
          }
        ];

      default:
        return [];
    }
  };

  const navItems = getRoleNavItems();

  const roles = [
    { id: 'ROLE_INSTITUTION' as RoleType, label: '🏛️ Institution Registrar', path: '/institution' },
    { id: 'ROLE_AICTE_COMPLIANCE' as RoleType, label: '🛡️ AICTE Auditor', path: '/compliance' },
    { id: 'ROLE_ANALYTICS_POLICY' as RoleType, label: '📊 Policy & AISHE', path: '/analytics' },
    { id: 'ROLE_EMPLOYER_VERIFIER' as RoleType, label: '🔍 Employer Verifier', path: '/verify' },
    { id: 'ROLE_STUDENT_WALLET' as RoleType, label: '🎓 Student Wallet', path: '/student-wallet' },
  ];

  return (
    <aside className="w-16 lg:w-60 bg-white rounded-3xl p-3 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] border border-slate-200/80 flex flex-col justify-between shrink-0 select-none">
      
      {/* Top Branding (AICTE Indian Emblem + Saffron Badge) */}
      <div className="space-y-4">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center space-x-3 px-2 py-1.5 cursor-pointer group"
          title="Return to Home"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F5B82E] to-[#D97706] text-[#071629] flex items-center justify-center font-extrabold shadow-sm group-hover:scale-105 transition flex-shrink-0">
            <ShieldCheck size={22} />
          </div>

          <div className="hidden lg:block overflow-hidden">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 leading-none">
              AICTE &middot; MoE India
            </div>
            <div className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight mt-0.5">
              APAAR-Setu
            </div>
          </div>
        </div>

        {/* Role Context Pill Tag (Shows active isolated role) */}
        <div className="hidden lg:block px-2.5 py-1.5 bg-slate-50 border border-slate-200/60 rounded-xl">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
            Active Role Workspace
          </div>
          <div className="text-xs font-bold text-slate-800 truncate mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="truncate">{currentUser.designation}</span>
          </div>
        </div>

        {/* Strict Role-Isolated Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isFirst = index === 0 && activeItemId === 'default';
            const isActive = activeItemId === item.id || isFirst;

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center space-x-3 px-2.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-[#141519] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
                title={item.label}
              >
                {/* Active Indicator Bar on Left */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#FACC15] rounded-r-full" />
                )}

                <div className={`flex items-center justify-center flex-shrink-0 ${isActive ? 'text-[#FACC15]' : ''}`}>
                  <Icon size={18} />
                </div>

                <span className="hidden lg:inline truncate font-semibold">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* System Fast Triggers: 10 DPI Gateways & SHA-256 Merkle Ledger */}
        <div className="pt-2 border-t border-slate-100 hidden lg:block space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
            National Gateways
          </span>

          <button
            onClick={() => setIsAdapterModalOpen(true)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition cursor-pointer"
          >
            <span className="flex items-center space-x-2">
              <Globe size={14} className="text-slate-500" />
              <span>10 DPI Gateways</span>
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
              {apiEnvMode === 'SANDBOX_MOCK' ? 'MOCK' : 'LIVE'}
            </span>
          </button>

          <button
            onClick={() => setIsAuditDrawerOpen(true)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition cursor-pointer"
          >
            <span className="flex items-center space-x-2">
              <Terminal size={14} className="text-slate-500" />
              <span>Merkle Audit Log</span>
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-1.5 py-0.5 rounded">
              SHA-256
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Officer Profile & Fast Switcher */}
      <div className="pt-3 border-t border-slate-200/60 relative">
        <div 
          onClick={() => setIsRolePopoverOpen(!isRolePopoverOpen)}
          className="flex items-center space-x-2.5 p-1.5 rounded-2xl hover:bg-slate-100/80 transition cursor-pointer group"
          title="Click to Switch Stakeholder Role"
        >
          <div className="w-8 h-8 rounded-xl bg-[#141519] text-white flex items-center justify-center text-xs font-bold shrink-0">
            {currentUser.avatarText}
          </div>
          <div className="hidden lg:block overflow-hidden flex-1">
            <div className="text-xs font-bold text-slate-900 truncate">
              {currentUser.name}
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              {currentUser.designation}
            </div>
          </div>
          <ChevronRight size={14} className="hidden lg:block text-slate-400 group-hover:translate-x-0.5 transition" />
        </div>

        {/* Role Switcher Dropdown Popover */}
        {isRolePopoverOpen && (
          <div className="absolute bottom-14 left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100 mb-1">
              Select Stakeholder Role
            </div>
            {roles.map((r) => {
              const isCurrent = currentUser.role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    loginAs(r.id);
                    navigate(r.path);
                    setIsRolePopoverOpen(false);
                    setActiveItemId('default');
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
                    isCurrent ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{r.label}</span>
                  {isCurrent && <Check size={14} className="text-amber-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

    </aside>
  );
};
