import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppStore } from './store/appStore';
import { GovernmentStrip } from './components/GovernmentStrip';
import { Navbar } from './components/Navbar';
import { TelemetryFooter } from './components/TelemetryFooter';
import { AdapterInspectorModal } from './components/AdapterInspectorModal';
import { AuditDrawer } from './components/AuditDrawer';
import { StudentForensicsDrawer } from './components/StudentForensicsDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { LoginPage } from './pages/LoginPage';
import { AuditPage } from './pages/AuditPage';
import { VideoExplainerPage } from './pages/VideoExplainerPage';

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
      
      {/* Zone 1: Official GIGW 3.0 Top Government Accessibility Strip */}
      <GovernmentStrip />

      {/* Zone 2: Official AICTE Masthead & Persistent Role Switcher Bar */}
      <Navbar />

      {/* Zone 3: Main High-Density Workspace / Public Pages */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/explainer" element={<VideoExplainerPage />} />
          <Route path="/video" element={<Navigate to="/explainer" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/audit" element={<AuditPage />} />
          
          {/* 5 Official Operational Role Workspaces */}
          <Route path="/institution" element={<InstitutionDashboard />} />
          <Route path="/compliance" element={<AICTEComplianceDashboard />} />
          <Route path="/aicte-command" element={<Navigate to="/compliance" replace />} />
          <Route path="/analytics" element={<PolicyAnalyticsDashboard />} />
          <Route path="/verify" element={<EmployerVerifierDashboard />} />
          <Route path="/student-wallet" element={<StudentWalletDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Zone 4: Telemetry Footer (Audit Hash + DPI Mode) */}
      <TelemetryFooter />

      {/* Global Modals & Forensic Drawers */}
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
