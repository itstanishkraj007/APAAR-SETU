import React from 'react';
import { AppProvider, useAppStore } from './store/appStore';
import { GovernmentStrip } from './components/GovernmentStrip';
import { AICTEHeader } from './components/AICTEHeader';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { AdapterInspectorModal } from './components/AdapterInspectorModal';
import { AuditDrawer } from './components/AuditDrawer';
import { StudentForensicsDrawer } from './components/StudentForensicsDrawer';

import { InstitutionDashboard } from './components/InstitutionDashboard';
import { AICTEComplianceDashboard } from './components/AICTEComplianceDashboard';
import { PolicyAnalyticsDashboard } from './components/PolicyAnalyticsDashboard';
import { EmployerVerifierDashboard } from './components/EmployerVerifierDashboard';
import { StudentWalletDashboard } from './components/StudentWalletDashboard';

const MainLayout: React.FC = () => {
  const { role, fontSizeLevel, toastMessage } = useAppStore();

  const getFontSizeClass = () => {
    if (fontSizeLevel === -1) return 'text-[92%]';
    if (fontSizeLevel === 1) return 'text-[108%]';
    return 'text-[100%]';
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-100 ${getFontSizeClass()}`}>
      
      {/* 1. Official Government Top Strip */}
      <GovernmentStrip />

      {/* 2. Main AICTE Header & Emblem Banner */}
      <AICTEHeader />

      {/* 3. Persistent 5-Role Switcher & SIH Demo Scenario Quick-Trigger */}
      <RoleSwitcherBar />

      {/* 4. Active Dashboard View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {role === 'ROLE_INSTITUTION' && <InstitutionDashboard />}
        {role === 'ROLE_AICTE_COMPLIANCE' && <AICTEComplianceDashboard />}
        {role === 'ROLE_ANALYTICS_POLICY' && <PolicyAnalyticsDashboard />}
        {role === 'ROLE_EMPLOYER_VERIFIER' && <EmployerVerifierDashboard />}
        {role === 'ROLE_STUDENT_WALLET' && <StudentWalletDashboard />}
      </main>

      {/* 5. GIGW Government Footer */}
      <footer className="bg-[#0B2240] text-slate-300 text-xs py-5 border-t-2 border-amber-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="font-bold text-white flex items-center justify-center sm:justify-start space-x-2">
              <span>All India Council for Technical Education (AICTE)</span>
              <span className="text-amber-400 font-mono">|</span>
              <span className="text-slate-400">Smart India Hackathon 2026</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Problem Statement ID: 26063 &middot; Integrated APAAR-Based Student Data Management & Verification System
            </p>
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            <span>Security: SHA-256 Ledger &middot; Ed25519 PKI &middot; DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </footer>

      {/* Global Modals & Drawers */}
      <AdapterInspectorModal />
      <AuditDrawer />
      <StudentForensicsDrawer />

      {/* Global Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0B2240] text-white border-2 border-amber-500 rounded-lg px-4 py-2.5 shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom duration-200 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
