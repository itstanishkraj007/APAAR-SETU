import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore, RoleType } from '../store/appStore';
import { FloatingSidebarRail } from './FloatingSidebarRail';
import { BentoHeader } from './BentoHeader';
import { TelemetryFooter } from './TelemetryFooter';

// The 5 Role-Specific Dashboards
import { InstitutionDashboard } from './InstitutionDashboard';
import { AICTEComplianceDashboard } from './AICTEComplianceDashboard';
import { PolicyAnalyticsDashboard } from './PolicyAnalyticsDashboard';
import { EmployerVerifierDashboard } from './EmployerVerifierDashboard';
import { StudentWalletDashboard } from './StudentWalletDashboard';

export const PortalWorkspace: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, loginAs } = useAppStore();

  // Route synchronization: If user navigates directly to /institution, /compliance, etc., ensure role matches
  useEffect(() => {
    if (location.pathname === '/institution' && role !== 'ROLE_INSTITUTION') {
      loginAs('ROLE_INSTITUTION');
    } else if (location.pathname === '/compliance' && role !== 'ROLE_AICTE_COMPLIANCE') {
      loginAs('ROLE_AICTE_COMPLIANCE');
    } else if (location.pathname === '/analytics' && role !== 'ROLE_ANALYTICS_POLICY') {
      loginAs('ROLE_ANALYTICS_POLICY');
    } else if (location.pathname === '/verify' && role !== 'ROLE_EMPLOYER_VERIFIER') {
      loginAs('ROLE_EMPLOYER_VERIFIER');
    } else if (location.pathname === '/student-wallet' && role !== 'ROLE_STUDENT_WALLET') {
      loginAs('ROLE_STUDENT_WALLET');
    }
  }, [location.pathname]);

  // Strictly render ONLY the active role's dashboard
  const renderActiveRoleDashboard = () => {
    switch (role) {
      case 'ROLE_INSTITUTION':
        return <InstitutionDashboard />;
      case 'ROLE_AICTE_COMPLIANCE':
        return <AICTEComplianceDashboard />;
      case 'ROLE_ANALYTICS_POLICY':
        return <PolicyAnalyticsDashboard />;
      case 'ROLE_EMPLOYER_VERIFIER':
        return <EmployerVerifierDashboard />;
      case 'ROLE_STUDENT_WALLET':
        return <StudentWalletDashboard />;
      default:
        return <InstitutionDashboard />;
    }
  };

  return (
    <div className="flex-1 p-3 sm:p-5 flex gap-4 min-w-0">
      
      {/* Left Floating Sidebar Rail (Role Isolated: renders ONLY active role's links) */}
      <FloatingSidebarRail />

      {/* Right Workspace Column */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        
        {/* Top Bento Header with 5-Role Switcher Pills & Active Role Controls */}
        <BentoHeader />

        {/* The Role-Isolated Workspace Content (Strictly renders ONLY the active role view) */}
        <main className="flex-1 min-w-0">
          {renderActiveRoleDashboard()}
        </main>

        {/* Telemetry Footer */}
        <TelemetryFooter />

      </div>

    </div>
  );
};
