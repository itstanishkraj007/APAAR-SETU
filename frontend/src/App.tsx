import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppStore } from './store/appStore';
import { FloatingSidebarRail } from './components/FloatingSidebarRail';
import { BentoHeader } from './components/BentoHeader';
import { TelemetryFooter } from './components/TelemetryFooter';
import { AdapterInspectorModal } from './components/AdapterInspectorModal';
import { AuditDrawer } from './components/AuditDrawer';
import { StudentForensicsDrawer } from './components/StudentForensicsDrawer';
import { UploadRosterModal } from './components/modals/UploadRosterModal';
import { DuplicateResolutionModal } from './components/modals/DuplicateResolutionModal';
import { CommandPaletteModal } from './components/modals/CommandPaletteModal';

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
    <div className={`min-h-screen bg-[#F4F3EF] text-slate-900 font-sans flex flex-col ${getFontSizeClass()}`}>
      
      {/* Official Indian Sovereign Tricolor 3px Accent Line */}
      <div className="h-[3px] w-full flex shrink-0">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-[#FFFFFF]"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      {/* Main Responsive Canvas (Floating Rail + Bento Workspace) */}
      <div className="flex-1 p-3 sm:p-5 flex gap-4 min-w-0">
        
        {/* Left Floating Sidebar Rail (From Images 3, 4 & 7) */}
        <FloatingSidebarRail />

        {/* Right Main Column (Bento Header + Dynamic Route Views + Telemetry Footer) */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          
          {/* Top Floating Action Header with 5-Role Switcher Pills (From Images 2, 3 & 4) */}
          <BentoHeader />

          {/* Dynamic Route Workspace */}
          <main className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<InstitutionDashboard />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/institution" element={<InstitutionDashboard />} />
              <Route path="/compliance" element={<AICTEComplianceDashboard />} />
              <Route path="/aicte-command" element={<Navigate to="/compliance" replace />} />
              <Route path="/analytics" element={<PolicyAnalyticsDashboard />} />
              <Route path="/verify" element={<EmployerVerifierDashboard />} />
              <Route path="/student-wallet" element={<StudentWalletDashboard />} />
              
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/explainer" element={<VideoExplainerPage />} />
              <Route path="/video" element={<Navigate to="/explainer" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/audit" element={<AuditPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Telemetry Footer */}
          <TelemetryFooter />
        </div>
      </div>

      {/* Global Interactive Modals & Drawers */}
      <UploadRosterModal />
      <DuplicateResolutionModal />
      <CommandPaletteModal />
      <AdapterInspectorModal />
      <AuditDrawer />
      <StudentForensicsDrawer />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141519] text-white rounded-2xl px-4 py-3 shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom duration-200 flex items-center space-x-2.5 border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-ping"></span>
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
