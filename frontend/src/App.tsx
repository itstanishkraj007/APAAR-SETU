import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppStore } from './store/appStore';
import { TopSaaSNav } from './components/TopSaaSNav';
import { PortalWorkspace } from './components/PortalWorkspace';
import { TelemetryFooter } from './components/TelemetryFooter';

// Modals & Drawers
import { AdapterInspectorModal } from './components/AdapterInspectorModal';
import { AuditDrawer } from './components/AuditDrawer';
import { StudentForensicsDrawer } from './components/StudentForensicsDrawer';
import { UploadRosterModal } from './components/modals/UploadRosterModal';
import { DuplicateResolutionModal } from './components/modals/DuplicateResolutionModal';
import { CommandPaletteModal } from './components/modals/CommandPaletteModal';

// Pages
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { VideoExplainerPage } from './pages/VideoExplainerPage';
import { AuditPage } from './pages/AuditPage';

const AppLayout: React.FC = () => {
  const { fontSizeLevel, toastMessage } = useAppStore();

  const getFontSizeClass = () => {
    if (fontSizeLevel === -1) return 'text-[92%]';
    if (fontSizeLevel === 1) return 'text-[108%]';
    return 'text-[100%]';
  };

  return (
    <div className={`min-h-screen bg-[#F4F3EF] text-slate-900 font-sans flex flex-col ${getFontSizeClass()}`}>
      
      {/* Persistent Unified 3-Tab SaaS Navigation Bar */}
      <TopSaaSNav />

      {/* Dynamic Route Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <Routes>
          {/* TAB 1: Enterprise SaaS Home Page */}
          <Route path="/" element={
            <div className="flex-1 flex flex-col justify-between">
              <main className="flex-1">
                <HomePage />
              </main>
              <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                <TelemetryFooter />
              </div>
            </div>
          } />
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* TAB 2: Features & Advantages Deep-Dive */}
          <Route path="/features" element={
            <div className="flex-1 flex flex-col justify-between">
              <main className="flex-1">
                <FeaturesPage />
              </main>
              <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                <TelemetryFooter />
              </div>
            </div>
          } />

          {/* TAB 3: Role-Isolated Bento Workspace */}
          <Route path="/portal" element={<PortalWorkspace />} />
          <Route path="/institution" element={<PortalWorkspace />} />
          <Route path="/compliance" element={<PortalWorkspace />} />
          <Route path="/aicte-command" element={<Navigate to="/compliance" replace />} />
          <Route path="/analytics" element={<PortalWorkspace />} />
          <Route path="/verify" element={<PortalWorkspace />} />
          <Route path="/student-wallet" element={<PortalWorkspace />} />

          {/* Ancillary Pages */}
          <Route path="/explainer" element={
            <div className="flex-1 flex flex-col justify-between">
              <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
                <VideoExplainerPage />
              </main>
              <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                <TelemetryFooter />
              </div>
            </div>
          } />
          <Route path="/video" element={<Navigate to="/explainer" replace />} />
          <Route path="/audit" element={
            <div className="flex-1 flex flex-col justify-between">
              <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
                <AuditPage />
              </main>
              <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                <TelemetryFooter />
              </div>
            </div>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
