import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type RoleType = 
  | 'ROLE_INSTITUTION' 
  | 'ROLE_AICTE_COMPLIANCE' 
  | 'ROLE_ANALYTICS_POLICY' 
  | 'ROLE_EMPLOYER_VERIFIER' 
  | 'ROLE_STUDENT_WALLET';

export interface Violation {
  rule: string;
  code: string;
  message: string;
  conflicting_institution?: string;
  conflicting_inst_id?: string;
  conflicting_slot?: string;
  conflicting_course?: string;
}

export interface StudentRecord {
  id: string;
  apaar_id: string;
  student_id: string;
  name: string;
  dob: string;
  gender: string;
  category: string;
  citizenship: string;
  quota_bucket: string;
  seat_slot_id?: string | null;
  status: string;
  institution_id: string;
  institution_name: string;
  course_id: string;
  course_name: string;
  admission_date: string;
  cgpa: string;
  degree_awarded: string;
  dpdp_consent_granted: boolean;
  passport_no?: string;
  oci_card_no?: string;
  sii_id?: string;
  visa_no?: string;
  violations?: Violation[];
  warnings?: string[];
  cryptographic_proof?: any;
}

export interface InstitutionRecord {
  id: string;
  name: string;
  city: string;
  state: string;
  region: string;
  type: string;
  course_id: string;
  course_name: string;
  academic_year: string;
  approved_intake: number;
  eoa_nri_approved: boolean;
  eoa_fn_approved: boolean;
  eoa_status: string;
  eoa_letter_no: string;
  portal_status: string;
  anomaly_score: number;
  anomaly_reasons: string[];
  counts?: {
    total_submitted: number;
    verified_active: number;
    regular_merit: number;
    nri: number;
    tfw: number;
    fn_oci: number;
    pmsss: number;
    excess_blocked: number;
    duplicate_blocked: number;
    capacity_pct: number;
  };
}

export interface AuditBlock {
  index: number;
  timestamp: string;
  actor_role: string;
  action: string;
  details: any;
  previous_hash: string;
  hash: string;
}

interface AppContextType {
  role: RoleType;
  setRole: (r: RoleType) => void;
  selectedInstitutionId: string;
  setSelectedInstitutionId: (id: string) => void;
  fontSizeLevel: number;
  setFontSizeLevel: (fn: (prev: number) => number) => void;
  apiEnvMode: 'SANDBOX_MOCK' | 'PRODUCTION_GOV';
  setApiEnvMode: (m: 'SANDBOX_MOCK' | 'PRODUCTION_GOV') => void;
  isAdapterModalOpen: boolean;
  setIsAdapterModalOpen: (b: boolean) => void;
  isAuditDrawerOpen: boolean;
  setIsAuditDrawerOpen: (b: boolean) => void;
  selectedForensicStudent: StudentRecord | null;
  setSelectedForensicStudent: (s: StudentRecord | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Data
  institutions: InstitutionRecord[];
  students: StudentRecord[];
  auditBlocks: AuditBlock[];
  
  // Actions
  refreshData: () => Promise<void>;
  ingestStudent: (data: any) => Promise<any>;
  batchUploadStudents: (instId: string, list: any[]) => Promise<any>;
  samarthSync: (instId: string) => Promise<any>;
  resolveDuplicate: (apaarId: string, studentId: string) => Promise<any>;
  issueShowCause: (instId: string, type: string, details: string) => Promise<any>;
  dispatchEVC: (instId: string) => Promise<any>;
  freezeInstitution: (instId: string) => Promise<any>;
  toggleConsent: (apaarId: string, granted: boolean) => Promise<any>;
  verifyLedger: () => Promise<any>;
  loadDemoScenario: (scenarioIndex: number) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<RoleType>('ROLE_INSTITUTION');
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('1-451982311');
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0); // -1, 0, 1
  const [apiEnvMode, setApiEnvMode] = useState<'SANDBOX_MOCK' | 'PRODUCTION_GOV'>('SANDBOX_MOCK');
  const [isAdapterModalOpen, setIsAdapterModalOpen] = useState<boolean>(false);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState<boolean>(false);
  const [selectedForensicStudent, setSelectedForensicStudent] = useState<StudentRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [institutions, setInstitutions] = useState<InstitutionRecord[]>([]);
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [auditBlocks, setAuditBlocks] = useState<AuditBlock[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const API_BASE = 'http://localhost:8000';

  const refreshData = async () => {
    try {
      const [instRes, studRes, auditRes] = await Promise.all([
        fetch(`${API_BASE}/api/institutions`),
        fetch(`${API_BASE}/api/students`),
        fetch(`${API_BASE}/api/audit/blocks?limit=50`)
      ]);
      if (instRes.ok) setInstitutions(await instRes.json());
      if (studRes.ok) setStudents(await studRes.json());
      if (auditRes.ok) {
        const data = await auditRes.json();
        setAuditBlocks(data.blocks || []);
      }
    } catch (e) {
      console.warn("Backend not reachable or offline; state preserved in memory.", e);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const ingestStudent = async (data: any) => {
    try {
      const res = await fetch(`${API_BASE}/api/students/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      await refreshData();
      showToast(`Student ${data.name || ''} processed: ${result.status}`);
      return result;
    } catch (e: any) {
      showToast(`Error: ${e.message}`);
      return null;
    }
  };

  const batchUploadStudents = async (instId: string, list: any[]) => {
    try {
      const res = await fetch(`${API_BASE}/api/students/batch-upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ institution_id: instId, students: list })
      });
      const result = await res.json();
      await refreshData();
      showToast(`Batch Upload: ${result.summary.verified_active} Verified, ${result.summary.blocked_excess + result.summary.blocked_duplicate} Flagged`);
      return result;
    } catch (e: any) {
      showToast(`Batch Error: ${e.message}`);
      return null;
    }
  };

  const samarthSync = async (instId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/students/samarth-sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ institution_id: instId })
      });
      const result = await res.json();
      await refreshData();
      showToast(`Samarth ERP Synced: ${result.records_imported} admissions imported with JoSAA digital signature.`);
      return result;
    } catch (e: any) {
      showToast(`Samarth sync failed: ${e.message}`);
    }
  };

  const resolveDuplicate = async (apaarId: string, studentId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/compliance/resolve-duplicate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apaar_id: apaarId,
          cancel_student_id: studentId,
          action: 'CANCEL_CONFLICT',
          reason: 'AICTE National De-duplication Directive'
        })
      });
      const result = await res.json();
      await refreshData();
      showToast(result.message);
      return result;
    } catch (e: any) {
      showToast(`Resolution error: ${e.message}`);
    }
  };

  const issueShowCause = async (instId: string, type: string, details: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/compliance/issue-show-cause`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ institution_id: instId, violation_type: type, details })
      });
      const result = await res.json();
      await refreshData();
      showToast(result.message);
      return result;
    } catch (e: any) {
      showToast(`Failed to issue notice: ${e.message}`);
    }
  };

  const dispatchEVC = async (instId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/compliance/dispatch-evc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ institution_id: instId })
      });
      const result = await res.json();
      await refreshData();
      showToast(result.message);
      return result;
    } catch (e: any) {
      showToast(`EVC dispatch failed: ${e.message}`);
    }
  };

  const freezeInstitution = async (instId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/institutions/${instId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'FROZEN_BY_AICTE', reason: 'Repeated intake compliance failure' })
      });
      const result = await res.json();
      await refreshData();
      showToast(`Institution portal status frozen under AICTE Order.`);
      return result;
    } catch (e: any) {
      showToast(`Freeze action failed: ${e.message}`);
    }
  };

  const toggleConsent = async (apaarId: string, granted: boolean) => {
    try {
      const res = await fetch(`${API_BASE}/api/verify/consent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apaar_id: apaarId, granted })
      });
      const result = await res.json();
      await refreshData();
      showToast(result.message);
      return result;
    } catch (e: any) {
      showToast(`Consent update failed: ${e.message}`);
    }
  };

  const verifyLedger = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/audit/verify`);
      const result = await res.json();
      showToast(result.message);
      return result;
    } catch (e: any) {
      showToast(`Verification error: ${e.message}`);
    }
  };

  const loadDemoScenario = async (scenarioIndex: number) => {
    switch (scenarioIndex) {
      case 1:
        // Clean Batch Admission Sync (MAIT Delhi)
        setRole('ROLE_INSTITUTION');
        setSelectedInstitutionId('1-451982311');
        showToast("Demo Scenario 1: Clean admission cohort at MAIT Delhi. 12-digit APAARs verified.");
        break;
      case 2:
        // Cross-College Duplicate Lock
        setRole('ROLE_AICTE_COMPLIANCE');
        showToast("Demo Scenario 2: Active Cross-College Duplicate Lock! Aarav Sharma claimed by Horizon Pune.");
        break;
      case 3:
        // Excess Admission Breach (Apex PGDM)
        setRole('ROLE_AICTE_COMPLIANCE');
        showToast("Demo Scenario 3: Intake Capacity Breach at Apex PGDM (Seat 61/60 Quarantined).");
        break;
      case 4:
        // Unapproved NRI Admittance
        setRole('ROLE_INSTITUTION');
        setSelectedInstitutionId('1-882341902');
        showToast("Demo Scenario 4: Apex PGDM unapproved NRI quota violation highlighted.");
        break;
      case 5:
        // Foreign National & OCI Bridge
        setRole('ROLE_INSTITUTION');
        setSelectedInstitutionId('1-451982311');
        showToast("Demo Scenario 5: International students verified with Study in India and Provisional APAAR-FN.");
        break;
      case 6:
        // Dual-ID Degree Verification & DPDP Consent
        setRole('ROLE_EMPLOYER_VERIFIER');
        showToast("Demo Scenario 6: Employer Verifier Portal with 5-point cryptographic scorecard.");
        break;
      default:
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        selectedInstitutionId,
        setSelectedInstitutionId,
        fontSizeLevel,
        setFontSizeLevel,
        apiEnvMode,
        setApiEnvMode,
        isAdapterModalOpen,
        setIsAdapterModalOpen,
        isAuditDrawerOpen,
        setIsAuditDrawerOpen,
        selectedForensicStudent,
        setSelectedForensicStudent,
        toastMessage,
        showToast,
        institutions,
        students,
        auditBlocks,
        refreshData,
        ingestStudent,
        batchUploadStudents,
        samarthSync,
        resolveDuplicate,
        issueShowCause,
        dispatchEVC,
        freezeInstitution,
        toggleConsent,
        verifyLedger,
        loadDemoScenario
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
