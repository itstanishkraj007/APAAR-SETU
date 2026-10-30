import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore, USER_PRESETS, RoleType } from '../store/appStore';
import { 
  LayoutGrid, ShieldAlert, BarChart3, SearchCheck, UserCheck, 
  Cpu, Link2, PlayCircle, Settings, LogOut, ChevronRight, Check,
  Sparkles, ShieldCheck, FileText, Bell, Globe2
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
    auditBlocks,
    apiEnvMode,
    institutions,
    selectedInstitutionId,
    setSelectedInstitutionId
  } = useAppStore();

  const [isRolePopoverOpen, setIsRolePopoverOpen] = useState(false);

  const navItems = [
    {
      id: 'institution',
      label: 'Institution Roster & Quotas',
      path: '/institution',
      icon: LayoutGrid,
      roleMatch: 'ROLE_INSTITUTION' as RoleType,
    },
    {
      id: 'compliance',
      label: 'AICTE Compliance & Duplicates',
      path: '/compliance',
      icon: ShieldAlert,
      roleMatch: 'ROLE_AICTE_COMPLIANCE' as RoleType,
    },
    {
      id: 'analytics',
      label: 'National Policy & AISHE',
      path: '/analytics',
      icon: BarChart3,
      roleMatch: 'ROLE_ANALYTICS_POLICY' as RoleType,
    },
    {
      id: 'verify',
      label: 'Public Credential Verifier',
      path: '/verify',
      icon: SearchCheck,
      roleMatch: 'ROLE_EMPLOYER_VERIFIER' as RoleType,
    },
    {
      id: 'wallet',
      label: 'Student DPDP Wallet',
      path: '/student-wallet',
      icon: UserCheck,
      roleMatch: 'ROLE_STUDENT_WALLET' as RoleType,
    },
    {
      id: 'features',
      label: 'Features & Rules Sandbox',
      path: '/features',
      icon: FileText,
    },
    {
      id: 'explainer',
      label: '🎬 3-Min Video Explainer',
      path: '/explainer',
      icon: PlayCircle,
      isSpecial: true,
    },
  ];

  const roles = [
    { id: 'ROLE_INSTITUTION' as RoleType, label: '🏛️ Institution Registrar', path: '/institution' },
    { id: 'ROLE_AICTE_COMPLIANCE' as RoleType, label: '🛡️ AICTE Auditor', path: '/compliance' },
    { id: 'ROLE_ANALYTICS_POLICY' as RoleType, label: '📊 Policy & AISHE', path: '/analytics' },
    { id: 'ROLE_EMPLOYER_VERIFIER' as RoleType, label: '🔍 Employer Verifier', path: '/verify' },
    { id: 'ROLE_STUDENT_WALLET' as RoleType, label: '🎓 Student Wallet', path: '/student-wallet' },
  ];

  return (
    <aside className="w-16 lg:w-60 bg-white rounded-3xl p-3 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col justify-between shrink-0 select-none">
      {/* Top Branding (AICTE Indian Emblem + Saffron Badge) */}
      <div className="space-y-4">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center space-x-3 px-2 py-1.5 cursor-pointer group"
        >
          {/* Logo Emblem (Replicating Image 3 top yellow icon) */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F5B82E] to-[#D97706] text-[#071629] flex items-center justify-center font-extrabold shadow-sm group-hover:scale-105 transition flex-shrink-0">
            <ShieldCheck size={24} />
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

        {/* Navigation Items (Replicating Image 3, 4 & 7 active pill styling) */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.roleMatch) loginAs(item.roleMatch);
                  navigate(item.path);
                }}
                className={`w-full flex items-center space-x-3 px-2.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-[#141519] text-white shadow-xs'
                    : item.isSpecial
                    ? 'text-amber-800 bg-amber-50/70 hover:bg-amber-100/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
                title={item.label}
              >
                {/* Active Indicator Bar on Left (From Image 3) */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#FACC15] rounded-r-full" />
                )}

                <div className={`flex items-center justify-center flex-shrink-0 ${isActive ? 'text-[#FACC15]' : ''}`}>
                  <Icon size={18} />
                </div>

                <span className="hidden lg:inline truncate font-semibold">
                  {item.label}
                </span>

                {item.isSpecial && (
                  <span className="hidden lg:inline ml-auto w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                )}
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
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100/80 text-[11px] font-bold text-slate-700 transition cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Cpu size={14} className="text-blue-600" />
              <span>10 DPI Gateways</span>
            </div>
            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-mono px-1.5 py-0.2 rounded font-bold">
              10/10 OK
            </span>
          </button>

          <button
            onClick={() => setIsAuditDrawerOpen(true)}
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100/80 text-[11px] font-bold text-slate-700 transition cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Link2 size={14} className="text-amber-600" />
              <span>SHA-256 Ledger</span>
            </div>
            <span className="text-[9px] bg-slate-200 text-slate-800 font-mono px-1.5 py-0.2 rounded font-bold">
              #{auditBlocks.length}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Officer Profile Card + Role Switcher Popover (From Image 3 bottom profile) */}
      <div className="relative pt-3 border-t border-slate-100">
        <button
          onClick={() => setIsRolePopoverOpen(!isRolePopoverOpen)}
          className="w-full flex items-center space-x-2.5 p-1.5 rounded-2xl hover:bg-slate-100 transition cursor-pointer text-left group"
          title="Switch Active Operational Role"
        >
          <div className="w-8 h-8 rounded-full bg-[#141519] text-[#FACC15] font-extrabold flex items-center justify-center font-mono text-xs flex-shrink-0">
            {currentUser.avatarText}
          </div>

          <div className="hidden lg:block overflow-hidden flex-1">
            <div className="text-[10px] text-slate-400 font-medium leading-none">Welcome back 👋</div>
            <div className="text-xs font-bold text-slate-900 truncate mt-0.5 group-hover:text-amber-700 transition">
              {currentUser.name.split(' ')[0]}
            </div>
          </div>

          <ChevronRight size={14} className="hidden lg:block text-slate-400 group-hover:text-slate-900 transition" />
        </button>

        {/* Role Switcher Popover */}
        {isRolePopoverOpen && (
          <div className="absolute bottom-14 left-0 w-64 bg-white rounded-3xl shadow-xl border border-slate-200 p-2 z-50 text-xs animate-in fade-in duration-150">
            <div className="p-2 border-b border-slate-100 mb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Logged In As</span>
              <div className="font-extrabold text-slate-900 mt-0.5">{currentUser.name}</div>
              <div className="text-[11px] text-amber-700">{currentUser.designation}</div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
                Instant Role Switch
              </span>
              {roles.map((r) => {
                const isSelected = currentUser.role === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      loginAs(r.id);
                      setIsRolePopoverOpen(false);
                      navigate(r.path);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{r.label}</span>
                    {isSelected && <Check size={13} className="text-[#FACC15]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
