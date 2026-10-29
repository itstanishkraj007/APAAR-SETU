import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppStore } from './store/appStore';
import { GovernmentStrip } from './components/GovernmentStrip';
import { Navbar } from './components/Navbar';
import { AdapterInspectorModal } from './components/AdapterInspectorModal';
import { AuditDrawer } from './components/AuditDrawer';
import { StudentForensicsDrawer } from './components/StudentForensicsDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { LoginPage } from './pages/LoginPage';
import { AuditPage } from './pages/AuditPage';

// Dashboards
import { InstitutionDashboard } from './components/InstitutionDashboard';
import { AICTEComplianceDashboard } from './components/AICTEComplianceDashboard';
import { PolicyAnalyticsDashboard } from './components/PolicyAnalyticsDashboard';
import { EmployerVerifierDashboard } from './components/EmployerVerifierDashboard';
import { StudentWalletDashboard } from './components/StudentWalletDashboard';

const AppLayout: React.FC = () => {
  const { fontSizeLevel, toastMessage } = useAppStore();

  const getFontSizeClass = () => {
    if (fontSizeLevel === -1) return 'text-[92%]';
    if (fontSizeLevel === 1) return 'text-[108%]';
    return 'text-[100%]';
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-100 ${getFontSizeClass()}`}>
      
      {/* 1. Official Government Top Strip */}
      <GovernmentStrip />

      {/* 2. Unified, Consistent AICTE Primary Navigation & Evaluator Bar */}
      <Navbar />

      {/* 3. Main Routed View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/audit" element={<AuditPage />} />
          
          {/* Role-Based Workspaces */}
          <Route path="/institution" element={<InstitutionDashboard />} />
          <Route path="/compliance" element={<AICTEComplianceDashboard />} />
          <Route path="/aicte-command" element={<Navigate to="/compliance" replace />} />
          <Route path="/analytics" element={<PolicyAnalyticsDashboard />} />
          <Route path="/verify" element={<EmployerVerifierDashboard />} />
          <Route path="/student-wallet" element={<StudentWalletDashboard />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 4. GIGW 3.0 Compliant Government Footer */}
      <footer className="bg-[#0B2240] text-slate-300 text-xs py-6 border-t-2 border-amber-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-bold text-white flex items-center justify-center sm:justify-start space-x-2">
              <span>All India Council for Technical Education (AICTE)</span>
              <span className="text-amber-400 font-mono">|</span>
              <span className="text-slate-400">Smart India Hackathon 2026</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Problem Statement ID: 26063 &middot; Integrated APAAR-based Student Data Management and Verification System
            </p>
          </div>

          <div className="text-[11px] text-slate-400 font-mono space-y-0.5">
            <div>Security: SHA-256 Merkle Ledger &middot; Ed25519 CCA PKI &middot; DPDP Act 2023</div>
            <div className="text-slate-500">Government of India &middot; Guidelines for Indian Government Websites (GIGW 3.0)</div>
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
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}
