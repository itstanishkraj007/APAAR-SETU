import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore, USER_PRESETS, RoleType } from '../store/appStore';
import { 
  Building2, ShieldAlert, BarChart3, SearchCheck, UserCheck, 
  Layers, Users, FileSpreadsheet, RefreshCcw, Award, Globe2, 
  AlertTriangle, Lock, Cpu, Link2, ChevronRight, CheckCircle2, ShieldCheck
} from 'lucide-react';

interface RoleSidebarProps {
  activeTab?: string;
  onTabChange?: (tabKey: string) => void;
}

export const RoleSidebar: React.FC<RoleSidebarProps> = ({ activeTab, onTabChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    currentUser, 
    role, 
    institutions, 
    selectedInstitutionId, 
    setSelectedInstitutionId, 
    apiEnvMode, 
    setIsAdapterModalOpen, 
    auditBlocks, 
    setIsAuditDrawerOpen 
  } = useAppStore();

  const currentInst = institutions.find(i => i.id === selectedInstitutionId) || institutions[0];

  // Role-specific navigation items
  const getRoleMenuItems = () => {
    switch (role) {
      case 'ROLE_INSTITUTION':
        return [
          { key: 'ROSTER', label: 'Student Enrolment Roster', icon: Users },
          { key: 'SINGLE', label: 'Single Student Entry', icon: Layers },
          { key: 'BULK_CSV', label: 'Bulk CSV / Excel Streamer', icon: FileSpreadsheet },
          { key: 'SAMARTH', label: 'Samarth ERP / JoSAA Sync', icon: RefreshCcw },
          { key: 'INTERNATIONAL', label: 'NRI / OCI / FN Triangulation', icon: Globe2 },
          { key: 'DUAL_ID_STUDIO', label: 'Dual-ID Degree Studio', icon: Award }
        ];
      case 'ROLE_AICTE_COMPLIANCE':
        return [
          { key: 'DUPLICATES', label: 'Duplicate APAAR Locks', icon: ShieldAlert },
          { key: 'EXCESS', label: 'Excess Intake Violations', icon: AlertTriangle },
          { key: 'AI_RADAR', label: 'AI Anomaly & SHAP Radar', icon: Cpu },
          { key: 'INTERNATIONAL_AUDIT', label: 'Foreign / NRI Quota Audit', icon: Globe2 }
        ];
      case 'ROLE_ANALYTICS_POLICY':
        return [
          { key: 'SUMMARY', label: 'National Rollup Engine', icon: BarChart3 },
          { key: 'COPILOT', label: 'AI Policy Text-to-SQL Copilot', icon: Cpu },
          { key: 'EXPORTS', label: 'AISHE & NBA Data Exports', icon: FileSpreadsheet },
          { key: 'MOBILITY', label: 'NEP 2020 Mobility Tracker', icon: Users }
        ];
      case 'ROLE_EMPLOYER_VERIFIER':
        return [
          { key: 'LOOKUP', label: 'Dual-ID Credential Lookup', icon: SearchCheck },
          { key: 'QR_SCAN', label: 'W3C QR Code Scanner', icon: Award },
          { key: 'SCORECARD', label: '5-Point Trust Scorecard', icon: ShieldCheck },
          { key: 'DPDP_REQUEST', label: 'DPDP Consent Request Desk', icon: Lock }
        ];
      case 'ROLE_STUDENT_WALLET':
        return [
          { key: 'BADGE', label: 'Verified AICTE APAAR Card', icon: UserCheck },
          { key: 'CONSENT', label: 'DPDP Act 2023 Consent Manager', icon: Lock },
          { key: 'CREDENTIALS', label: 'Dual-ID Digital Verifiable Credential', icon: Award }
        ];
      default:
        return [];
    }
  };

  const menuItems = getRoleMenuItems();

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-4 font-sans">
      
      {/* 1. Active Operational Context Card */}
      <div className="bg-white border border-slate-300 rounded-lg p-3.5 shadow-xs">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
          Operational Context
        </span>
        <div className="font-bold text-xs text-[#0B2240] mt-0.5 truncate">
          {currentUser.name}
        </div>
        <div className="text-[11px] text-amber-700 font-medium">
          {currentUser.designation}
        </div>
        <div className="text-[10px] text-slate-500 mt-1 truncate">
          {currentUser.organization}
        </div>

        {/* Institution Switcher (when in Institution Role) */}
        {role === 'ROLE_INSTITUTION' && (
          <div className="mt-3 pt-2.5 border-t border-slate-200">
            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
              Select Institution:
            </label>
            <select
              value={selectedInstitutionId}
              onChange={(e) => setSelectedInstitutionId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded p-1.5 font-semibold focus:ring-1 focus:ring-amber-500 truncate"
            >
              {institutions.map(inst => (
                <option key={inst.id} value={inst.id}>
                  {inst.name.length > 28 ? inst.name.slice(0, 28) + '...' : inst.name} ({inst.region})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 2. Role-Specific Sub-Navigation Menu */}
      <div className="bg-white border border-slate-300 rounded-lg p-2.5 shadow-xs">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2 block mb-1.5">
          Role Action Desk
        </span>
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onTabChange && onTabChange(item.key)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs transition font-medium text-left ${
                  isSelected
                    ? 'bg-[#0B2240] text-white font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {isSelected && <ChevronRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 10 External Government DPI Gateways Card */}
      <div 
        onClick={() => setIsAdapterModalOpen(true)}
        className="bg-white border border-slate-300 hover:border-amber-500 rounded-lg p-3.5 cursor-pointer shadow-xs transition group"
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-900">
            <Cpu className="w-4 h-4 text-blue-900 group-hover:text-amber-600 transition" />
            <span>10 DPI Gateways</span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.2 rounded text-[10px] font-mono font-bold">
            10/10 OK
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-tight">
          DigiLocker NAD, UDISE+, SII, e-FRRO, MEA OCI, Samarth, EoA, AISHE, NSP, NBA/NIRF.
        </p>
        <div className="mt-2 text-[10px] text-amber-700 font-bold flex items-center space-x-1 group-hover:underline">
          <span>Inspect DPI Key Mapping</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>

      {/* 4. Telemetry Hash-Chain Card */}
      <div 
        onClick={() => setIsAuditDrawerOpen(true)}
        className="bg-slate-900 text-slate-300 rounded-lg p-3 border border-slate-800 cursor-pointer hover:border-amber-500 transition group text-xs font-mono"
      >
        <div className="flex items-center justify-between text-amber-400 font-bold mb-1">
          <div className="flex items-center space-x-1">
            <Link2 className="w-3.5 h-3.5" />
            <span>SHA-256 Ledger</span>
          </div>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded text-slate-300">
            #{auditBlocks.length}
          </span>
        </div>
        <div className="text-[10px] text-slate-400 truncate">
          Root: {auditBlocks[0]?.hash ? auditBlocks[0].hash.slice(0, 16) + '...' : 'GENESIS_LOCKED'}
        </div>
        <div className="text-[9px] text-emerald-400 mt-1 flex items-center space-x-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>Chain Verified</span>
        </div>
      </div>

    </aside>
  );
};
