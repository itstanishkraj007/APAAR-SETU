import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, USER_PRESETS, RoleType } from '../store/appStore';
import { 
  Building2, ShieldAlert, BarChart3, SearchCheck, UserCheck, 
  LogIn, ArrowRight, Shield, Lock, CheckCircle2
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAs, showToast } = useAppStore();

  const handleRoleLogin = (rKey: RoleType) => {
    loginAs(rKey);
    navigate(USER_PRESETS[rKey].defaultPath);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-full px-3 py-1 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5 text-amber-600" />
          <span>National Single Sign-On (SSO) & Jan Parichay Gateway</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2240]">
          AICTE Unified Access Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Authenticate using authorized institutional or regulatory credentials. Evaluators can select any of the 5 pre-configured roles below for instant 1-click access:
        </p>
      </div>

      {/* 5 Preset Evaluator Logins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Role 1 */}
        <div 
          onClick={() => handleRoleLogin('ROLE_INSTITUTION')}
          className="bg-white border-2 border-slate-300 hover:border-amber-500 rounded-xl p-5 cursor-pointer transition shadow-xs hover:shadow-md flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B2240] flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="bg-blue-100 text-blue-900 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                ROLE 1
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{USER_PRESETS.ROLE_INSTITUTION.name}</h3>
            <p className="text-xs text-amber-700 font-semibold">{USER_PRESETS.ROLE_INSTITUTION.designation}</p>
            <p className="text-[11px] text-slate-500 mt-1">{USER_PRESETS.ROLE_INSTITUTION.organization}</p>
          </div>
          <button className="mt-4 w-full bg-[#0B2240] group-hover:bg-amber-500 group-hover:text-[#0B2240] text-white text-xs font-bold py-2 rounded transition flex items-center justify-center space-x-1.5">
            <span>Login as Registrar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Role 2 */}
        <div 
          onClick={() => handleRoleLogin('ROLE_AICTE_COMPLIANCE')}
          className="bg-white border-2 border-slate-300 hover:border-amber-500 rounded-xl p-5 cursor-pointer transition shadow-xs hover:shadow-md flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="bg-rose-100 text-rose-900 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                ROLE 2
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{USER_PRESETS.ROLE_AICTE_COMPLIANCE.name}</h3>
            <p className="text-xs text-rose-700 font-semibold">{USER_PRESETS.ROLE_AICTE_COMPLIANCE.designation}</p>
            <p className="text-[11px] text-slate-500 mt-1">{USER_PRESETS.ROLE_AICTE_COMPLIANCE.organization}</p>
          </div>
          <button className="mt-4 w-full bg-[#0B2240] group-hover:bg-amber-500 group-hover:text-[#0B2240] text-white text-xs font-bold py-2 rounded transition flex items-center justify-center space-x-1.5">
            <span>Login as Compliance Lead</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Role 3 */}
        <div 
          onClick={() => handleRoleLogin('ROLE_ANALYTICS_POLICY')}
          className="bg-white border-2 border-slate-300 hover:border-amber-500 rounded-xl p-5 cursor-pointer transition shadow-xs hover:shadow-md flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="bg-purple-100 text-purple-900 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                ROLE 3
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{USER_PRESETS.ROLE_ANALYTICS_POLICY.name}</h3>
            <p className="text-xs text-purple-700 font-semibold">{USER_PRESETS.ROLE_ANALYTICS_POLICY.designation}</p>
            <p className="text-[11px] text-slate-500 mt-1">{USER_PRESETS.ROLE_ANALYTICS_POLICY.organization}</p>
          </div>
          <button className="mt-4 w-full bg-[#0B2240] group-hover:bg-amber-500 group-hover:text-[#0B2240] text-white text-xs font-bold py-2 rounded transition flex items-center justify-center space-x-1.5">
            <span>Login as Policy Analyst</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Role 4 */}
        <div 
          onClick={() => handleRoleLogin('ROLE_EMPLOYER_VERIFIER')}
          className="bg-white border-2 border-slate-300 hover:border-amber-500 rounded-xl p-5 cursor-pointer transition shadow-xs hover:shadow-md flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition">
                <SearchCheck className="w-5 h-5" />
              </div>
              <span className="bg-emerald-100 text-emerald-900 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                ROLE 4
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{USER_PRESETS.ROLE_EMPLOYER_VERIFIER.name}</h3>
            <p className="text-xs text-emerald-700 font-semibold">{USER_PRESETS.ROLE_EMPLOYER_VERIFIER.designation}</p>
            <p className="text-[11px] text-slate-500 mt-1">{USER_PRESETS.ROLE_EMPLOYER_VERIFIER.organization}</p>
          </div>
          <button className="mt-4 w-full bg-[#0B2240] group-hover:bg-amber-500 group-hover:text-[#0B2240] text-white text-xs font-bold py-2 rounded transition flex items-center justify-center space-x-1.5">
            <span>Login as Verifier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Role 5 */}
        <div 
          onClick={() => handleRoleLogin('ROLE_STUDENT_WALLET')}
          className="bg-white border-2 border-slate-300 hover:border-amber-500 rounded-xl p-5 cursor-pointer transition shadow-xs hover:shadow-md flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                ROLE 5
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{USER_PRESETS.ROLE_STUDENT_WALLET.name}</h3>
            <p className="text-xs text-amber-700 font-semibold">{USER_PRESETS.ROLE_STUDENT_WALLET.designation}</p>
            <p className="text-[11px] text-slate-500 mt-1">{USER_PRESETS.ROLE_STUDENT_WALLET.organization}</p>
          </div>
          <button className="mt-4 w-full bg-[#0B2240] group-hover:bg-amber-500 group-hover:text-[#0B2240] text-white text-xs font-bold py-2 rounded transition flex items-center justify-center space-x-1.5">
            <span>Login to Student Wallet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Role Permission Matrix Card */}
      <div className="bg-white border border-slate-300 rounded-xl p-5 shadow-xs text-xs space-y-3">
        <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b pb-2">
          Statutory Role-Based Access Control (RBAC) Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead className="bg-slate-100 text-slate-700 font-semibold text-[11px]">
              <tr>
                <th className="py-2 px-3">Role Persona</th>
                <th className="py-2 px-3">Seat Matrix Upload</th>
                <th className="py-2 px-3">Duplicate Cancellation</th>
                <th className="py-2 px-3">Show-Cause Notices</th>
                <th className="py-2 px-3">Degree Verification</th>
                <th className="py-2 px-3">DPDP Consent Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px] text-slate-600">
              <tr>
                <td className="py-2 px-3 font-bold text-slate-900">Institution Registrar</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">YES (Course)</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
                <td className="py-2 px-3 text-slate-700">Internal Only</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-slate-900">AICTE Compliance Lead</td>
                <td className="py-2 px-3 text-slate-700">Audit / Lock</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">YES (National)</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">YES (Statutory)</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">Full Audit</td>
                <td className="py-2 px-3 text-slate-400">Audit Only</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-slate-900">Policy & AISHE Analyst</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
                <td className="py-2 px-3 text-slate-700">Aggregate</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-slate-900">External Verifier</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">Consent-Gated</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-slate-900">Student User</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
                <td className="py-2 px-3 text-slate-400">NO</td>
                <td className="py-2 px-3 text-slate-700">Self Credential</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">FULL CONTROL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
