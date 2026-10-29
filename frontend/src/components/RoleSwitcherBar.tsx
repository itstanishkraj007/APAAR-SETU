import React from 'react';
import { useAppStore, RoleType } from '../store/appStore';
import { Building2, ShieldAlert, BarChart3, SearchCheck, UserCheck, PlayCircle } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { role, setRole, loadDemoScenario } = useAppStore();

  const rolesList: { id: RoleType; label: string; icon: any; desc: string }[] = [
    {
      id: 'ROLE_INSTITUTION',
      label: 'Role 1: Institution Registrar',
      icon: Building2,
      desc: 'MAIT Delhi / Apex PGDM Upload & Seat Matrix'
    },
    {
      id: 'ROLE_AICTE_COMPLIANCE',
      label: 'Role 2: AICTE Compliance RO/HQ',
      icon: ShieldAlert,
      desc: 'Duplicate Locks, Excess Violations & AI Radar'
    },
    {
      id: 'ROLE_ANALYTICS_POLICY',
      label: 'Role 3: Policy & Accreditation',
      icon: BarChart3,
      desc: 'AISHE/NBA Exports & National Seat Analytics'
    },
    {
      id: 'ROLE_EMPLOYER_VERIFIER',
      label: 'Role 4: Authorized Verifier',
      icon: SearchCheck,
      desc: 'Dual-ID QR Scorecard & Degree Authenticator'
    },
    {
      id: 'ROLE_STUDENT_WALLET',
      label: 'Role 5: Student DPDP Wallet',
      icon: UserCheck,
      desc: 'APAAR Card & DPDP Act 2023 Consent Manager'
    }
  ];

  return (
    <div className="bg-slate-100 border-b border-slate-300 px-4 sm:px-6 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        
        {/* 5 Official Roles Navigation Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {rolesList.map((item) => {
            const Icon = item.icon;
            const isActive = role === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setRole(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#0B2240] text-white border-[#0B2240] shadow-sm font-semibold'
                    : 'bg-white hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
                title={item.desc}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Demo Video Quick-Trigger Scenario Selector */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="flex items-center space-x-1 text-slate-600 text-xs font-semibold">
            <PlayCircle className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">SIH Demo Scenarios:</span>
          </div>

          <select
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0) loadDemoScenario(val);
            }}
            defaultValue=""
            className="bg-white border border-amber-400 text-slate-800 text-xs rounded px-2.5 py-1 font-medium focus:ring-1 focus:ring-amber-500 shadow-sm cursor-pointer"
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
  );
};
