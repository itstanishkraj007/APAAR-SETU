import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type RoleType = 
  | 'ROLE_INSTITUTION' 
  | 'ROLE_AICTE_COMPLIANCE' 
  | 'ROLE_ANALYTICS_POLICY' 
  | 'ROLE_EMPLOYER_VERIFIER' 
  | 'ROLE_STUDENT_WALLET';

export interface UserProfile {
  id: string;
  name: string;
  designation: string;
  organization: string;
  role: RoleType;
  avatarText: string;
  defaultPath: string;
}

export const USER_PRESETS: Record<RoleType, UserProfile> = {
  ROLE_INSTITUTION: {
    id: 'user-inst-01',
    name: 'Prof. Rajesh Verma',
    designation: 'Registrar & Nodal Admission Officer',
    organization: 'Maharaja Agrasen Institute of Technology (MAIT), Delhi',
    role: 'ROLE_INSTITUTION',
    avatarText: 'RV',
    defaultPath: '/institution'
  },
  ROLE_AICTE_COMPLIANCE: {
    id: 'user-aicte-01',
    name: 'Dr. Sunita Deshmukh',
    designation: 'Regional Officer & Vigilance Lead',
    organization: 'AICTE North-Western Regional Office (NWRO) / HQ',
    role: 'ROLE_AICTE_COMPLIANCE',
    avatarText: 'SD',
    defaultPath: '/compliance'
  },
  ROLE_ANALYTICS_POLICY: {
    id: 'user-policy-01',
    name: 'Shri Amitabh Roy',
    designation: 'Director, Policy & Accreditation Analytics',
    organization: 'AICTE Bureau of Academic Affairs & NBA/NIRF Cell',
    role: 'ROLE_ANALYTICS_POLICY',
    avatarText: 'AR',
    defaultPath: '/analytics'
  },
  ROLE_EMPLOYER_VERIFIER: {
    id: 'user-verif-01',
    name: 'Pooja Hegde',
    designation: 'Lead Technical Recruiter & Background Verifier',
    organization: 'Tata Consultancy Services (TCS) / External Verifier',
    role: 'ROLE_EMPLOYER_VERIFIER',
    avatarText: 'PH',
    defaultPath: '/verify'
  },
  ROLE_STUDENT_WALLET: {
    id: 'user-student-01',
    name: 'Aarav Sharma',
    designation: 'Final Year Student (B.Tech CSE)',
    organization: 'MAIT Delhi (APAAR ID: 4829-1039-8472)',
    role: 'ROLE_STUDENT_WALLET',
    avatarText: 'AS',
    defaultPath: '/student-wallet'
  }
};

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

// Deterministic in-memory baseline so UI renders instantly with zero dead screens
const INITIAL_INSTITUTIONS: InstitutionRecord[] = [
  {
    id: "1-451982311",
    name: "Maharaja Agrasen Institute of Technology (MAIT)",
    city: "New Delhi",
    state: "Delhi",
    region: "NWRO",
    type: "Engineering & Technology",
    course_id: "CSE-BTECH",
    course_name: "B.Tech Computer Science & Engineering",
    academic_year: "2026-27",
    approved_intake: 120,
    eoa_nri_approved: true,
    eoa_fn_approved: true,
    eoa_status: "APPROVED_ACTIVE",
    eoa_letter_no: "F.No. North-West/1-451982311/2026/EOA",
    portal_status: "ACTIVE",
    anomaly_score: 12,
    anomaly_reasons: []
  },
  {
    id: "1-882341902",
    name: "Apex Institute of Management (PGDM)",
    city: "Mumbai",
    state: "Maharashtra",
    region: "WRO",
    type: "Management (PGDM)",
    course_id: "PGDM-MGT",
    course_name: "Post Graduate Diploma in Management",
    academic_year: "2026-27",
    approved_intake: 60,
    eoa_nri_approved: false,
    eoa_fn_approved: false,
    eoa_status: "CONDITIONAL_APPROVAL",
    eoa_letter_no: "F.No. Western/1-882341902/2026/EOA",
    portal_status: "UNDER_AUDIT",
    anomaly_score: 78,
    anomaly_reasons: ["Intake Capacity Exceeded", "Unapproved NRI Admittance Attempt"]
  },
  {
    id: "1-339102844",
    name: "Horizon College of Engineering",
    city: "Pune",
    state: "Maharashtra",
    region: "WRO",
    type: "Engineering & Technology",
    course_id: "AIDS-BTECH",
    course_name: "B.Tech Artificial Intelligence & Data Science",
    academic_year: "2026-27",
    approved_intake: 60,
    eoa_nri_approved: true,
    eoa_fn_approved: false,
    eoa_status: "APPROVED_ACTIVE",
    eoa_letter_no: "F.No. Western/1-339102844/2026/EOA",
    portal_status: "FLAGGED_FOR_EVC",
    anomaly_score: 89,
    anomaly_reasons: [
      "+38 pts Midnight Cutoff Upload Surge",
      "+31 pts Shared Mobile/Bank Prefix Cluster",
      "+20 pts Cross-Institution Duplicate Claims Detected"
    ]
  },
  {
    id: "1-661209384",
    name: "Dakshin Bharat Technical Campus",
    city: "Bengaluru",
    state: "Karnataka",
    region: "SRO",
    type: "Computer Applications (MCA)",
    course_id: "MCA-COMP",
    course_name: "Master of Computer Applications",
    academic_year: "2026-27",
    approved_intake: 60,
    eoa_nri_approved: true,
    eoa_fn_approved: true,
    eoa_status: "APPROVED_ACTIVE",
    eoa_letter_no: "F.No. South/1-661209384/2026/EOA",
    portal_status: "ACTIVE",
    anomaly_score: 24,
    anomaly_reasons: ["Demographic mismatch under review", "FRRO clearance pending"]
  }
];

const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: "std-001",
    apaar_id: "482910398472",
    student_id: "MAIT-CSE-2026-001",
    name: "Aarav Sharma",
    dob: "2005-04-12",
    gender: "Male",
    category: "General",
    citizenship: "INDIAN",
    quota_bucket: "REGULAR_MERIT",
    seat_slot_id: "NWRO-1-4519-2026-REG-001",
    status: "VERIFIED_ACTIVE",
    institution_id: "1-451982311",
    institution_name: "Maharaja Agrasen Institute of Technology (MAIT)",
    course_id: "CSE-BTECH",
    course_name: "B.Tech Computer Science & Engineering",
    admission_date: "2026-08-10",
    cgpa: "8.92",
    degree_awarded: "Pending Final Term",
    dpdp_consent_granted: true,
    violations: []
  },
  {
    id: "std-002",
    apaar_id: "671928471923",
    student_id: "MAIT-CSE-2026-002",
    name: "Ananya Iyer",
    dob: "2005-07-22",
    gender: "Female",
    category: "OBC-NCL",
    citizenship: "INDIAN",
    quota_bucket: "REGULAR_MERIT",
    seat_slot_id: "NWRO-1-4519-2026-REG-002",
    status: "VERIFIED_ACTIVE",
    institution_id: "1-451982311",
    institution_name: "Maharaja Agrasen Institute of Technology (MAIT)",
    course_id: "CSE-BTECH",
    course_name: "B.Tech Computer Science & Engineering",
    admission_date: "2026-08-11",
    cgpa: "9.45",
    degree_awarded: "Pending Final Term",
    dpdp_consent_granted: true,
    violations: []
  },
  {
    id: "std-003",
    apaar_id: "319482019482",
    student_id: "MAIT-CSE-2026-TFW-01",
    name: "Rohan Verma",
    dob: "2004-11-30",
    gender: "Male",
    category: "EWS",
    citizenship: "INDIAN",
    quota_bucket: "SUPERNUMERARY_TFW_5PCT",
    seat_slot_id: "NWRO-1-4519-2026-TFW-001",
    status: "VERIFIED_ACTIVE",
    institution_id: "1-451982311",
    institution_name: "Maharaja Agrasen Institute of Technology (MAIT)",
    course_id: "CSE-BTECH",
    course_name: "B.Tech Computer Science & Engineering",
    admission_date: "2026-08-12",
    cgpa: "8.70",
    degree_awarded: "Pending Final Term",
    dpdp_consent_granted: true,
    violations: []
  },
  {
    id: "std-004",
    apaar_id: "APAAR-FN-2026-E8A1",
    student_id: "MAIT-CSE-2026-FN-01",
    name: "Bikash Shrestha",
    dob: "2004-03-15",
    gender: "Male",
    category: "Foreign National",
    citizenship: "FOREIGN_NATIONAL",
    passport_no: "N0918234",
    sii_id: "SII-2026-NP-8812",
    visa_no: "V-EFRRO-DEL-8910",
    quota_bucket: "SUPERNUMERARY_FN_OCI_15PCT",
    seat_slot_id: "NWRO-1-4519-2026-FN-001",
    status: "VERIFIED_ACTIVE",
    institution_id: "1-451982311",
    institution_name: "Maharaja Agrasen Institute of Technology (MAIT)",
    course_id: "CSE-BTECH",
    course_name: "B.Tech Computer Science & Engineering",
    admission_date: "2026-08-14",
    cgpa: "8.65",
    degree_awarded: "Pending Final Term",
    dpdp_consent_granted: true,
    violations: []
  },
  {
    id: "std-020",
    apaar_id: "519204928172",
    student_id: "APEX-PGDM-2026-061",
    name: "Karan Malhotra",
    dob: "2002-06-18",
    gender: "Male",
    category: "General",
    citizenship: "INDIAN",
    quota_bucket: "REGULAR_MERIT",
    seat_slot_id: null,
    status: "BLOCKED_EXCESS_INTAKE",
    institution_id: "1-882341902",
    institution_name: "Apex Institute of Management (PGDM)",
    course_id: "PGDM-MGT",
    course_name: "Post Graduate Diploma in Management",
    admission_date: "2026-08-25",
    cgpa: "7.80",
    degree_awarded: "Blocked by AICTE Order",
    dpdp_consent_granted: false,
    violations: [
      {
        rule: "RULE_3_EXCESS_INTAKE",
        code: "REGULAR_INTAKE_BREACH",
        message: "Approved regular intake capacity reached (60/60). Candidate is excess admission #61 of 60. Violates AICTE APH Chapter II."
      }
    ]
  },
  {
    id: "std-030",
    apaar_id: "482910398472",
    student_id: "HORIZON-AI-2026-014",
    name: "Aarav Sharma",
    dob: "2005-04-12",
    gender: "Male",
    category: "General",
    citizenship: "INDIAN",
    quota_bucket: "REGULAR_MERIT",
    seat_slot_id: null,
    status: "CROSS_INSTITUTE_DUPLICATE_LOCK",
    institution_id: "1-339102844",
    institution_name: "Horizon College of Engineering",
    course_id: "AIDS-BTECH",
    course_name: "B.Tech Artificial Intelligence & Data Science",
    admission_date: "2026-08-29",
    cgpa: "N/A",
    degree_awarded: "BLOCKED",
    dpdp_consent_granted: false,
    violations: [
      {
        rule: "RULE_4_CROSS_INSTITUTE_DUPLICATE",
        code: "DUPLICATE_NATIONAL_APAAR",
        message: "Student with APAAR 482910398472 is already actively enrolled in 'Maharaja Agrasen Institute of Technology (MAIT)' (B.Tech CSE) under Seat Slot NWRO-1-4519-2026-REG-001.",
        conflicting_institution: "Maharaja Agrasen Institute of Technology (MAIT)",
        conflicting_inst_id: "1-451982311",
        conflicting_slot: "NWRO-1-4519-2026-REG-001"
      }
    ]
  }
];

interface AppContextType {
  currentUser: UserProfile;
  loginAs: (r: RoleType) => void;
  logout: () => void;
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
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (b: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (b: boolean) => void;
  activeDuplicateStudent: StudentRecord | null;
  setActiveDuplicateStudent: (s: StudentRecord | null) => void;
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
  exportDataPackage: (format: 'AISHE' | 'NBA' | 'NIRF' | 'ALL') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<RoleType>('ROLE_INSTITUTION');
  const [currentUser, setCurrentUser] = useState<UserProfile>(USER_PRESETS.ROLE_INSTITUTION);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('1-451982311');
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [apiEnvMode, setApiEnvMode] = useState<'SANDBOX_MOCK' | 'PRODUCTION_GOV'>('SANDBOX_MOCK');
  const [isAdapterModalOpen, setIsAdapterModalOpen] = useState<boolean>(false);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [activeDuplicateStudent, setActiveDuplicateStudent] = useState<StudentRecord | null>(null);
  const [selectedForensicStudent, setSelectedForensicStudent] = useState<StudentRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [institutions, setInstitutions] = useState<InstitutionRecord[]>(INITIAL_INSTITUTIONS);
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [auditBlocks, setAuditBlocks] = useState<AuditBlock[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loginAs = (r: RoleType) => {
    setRoleState(r);
    setCurrentUser(USER_PRESETS[r]);
    showToast(`Logged in as: ${USER_PRESETS[r].name} (${USER_PRESETS[r].role})`);
  };

  const logout = () => {
    loginAs('ROLE_INSTITUTION');
    showToast("Session reset to default Nodal Registrar.");
  };

  const setRole = (r: RoleType) => {
    loginAs(r);
  };

  const API_BASE = 'http://localhost:8000';

  const refreshData = async () => {
    try {
      const [instRes, studRes, auditRes] = await Promise.all([
        fetch(`${API_BASE}/api/institutions`),
        fetch(`${API_BASE}/api/students`),
        fetch(`${API_BASE}/api/audit/blocks?limit=50`)
      ]);
      if (instRes.ok) {
        const instData = await instRes.json();
        if (Array.isArray(instData) && instData.length > 0) setInstitutions(instData);
      }
      if (studRes.ok) {
        const studData = await studRes.json();
        if (Array.isArray(studData) && studData.length > 0) setStudents(studData);
      }
      if (auditRes.ok) {
        const data = await auditRes.json();
        setAuditBlocks(data.blocks || []);
      }
    } catch (e) {
      console.warn("Backend sync check (offline fallback maintained):", e);
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
      showToast(`Batch Upload: ${result.summary?.verified_active || 0} Verified, ${result.summary?.blocked_excess || 0} Flagged`);
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
      showToast(`Samarth ERP Synced: ${result.records_imported || 2} admissions imported with JoSAA signature.`);
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
        loginAs('ROLE_INSTITUTION');
        setSelectedInstitutionId('1-451982311');
        showToast("Demo Scenario 1: Clean admission cohort at MAIT Delhi. 12-digit APAARs verified.");
        break;
      case 2:
        loginAs('ROLE_AICTE_COMPLIANCE');
        showToast("Demo Scenario 2: Active Cross-College Duplicate Lock! Aarav Sharma claimed by Horizon Pune.");
        break;
      case 3:
        loginAs('ROLE_AICTE_COMPLIANCE');
        showToast("Demo Scenario 3: Intake Capacity Breach at Apex PGDM (Seat 61/60 Quarantined).");
        break;
      case 4:
        loginAs('ROLE_INSTITUTION');
        setSelectedInstitutionId('1-882341902');
        showToast("Demo Scenario 4: Apex PGDM unapproved NRI quota violation highlighted.");
        break;
      case 5:
        loginAs('ROLE_INSTITUTION');
        setSelectedInstitutionId('1-451982311');
        showToast("Demo Scenario 5: International students verified with Study in India and Provisional APAAR-FN.");
        break;
      case 6:
        loginAs('ROLE_EMPLOYER_VERIFIER');
        showToast("Demo Scenario 6: Employer Verifier Portal with 5-point cryptographic scorecard.");
        break;
      default:
        break;
    }
  };

  const exportDataPackage = (format: 'AISHE' | 'NBA' | 'NIRF' | 'ALL') => {
    let content = '';
    let filename = '';
    let mimeType = 'text/csv';

    if (format === 'AISHE') {
      filename = 'AISHE_DCF_II_Return_2026.csv';
      const header = 'Academic_Year,AICTE_Institute_ID,Institute_Name,Course,Approved_Intake,Total_Admitted,Regular_Merit,NRI_Quota,TFW_Supernumerary,FN_OCI_Supernumerary,PMSSS_Supernumerary,12_Digit_APAAR_Linked_Pct\n';
      const rows = institutions.map(i => {
        const instStudents = students.filter(s => s.institution_id === i.id && s.status === 'VERIFIED_ACTIVE');
        const regular = instStudents.filter(s => s.quota_bucket === 'REGULAR_MERIT').length;
        const nri = instStudents.filter(s => s.quota_bucket === 'NRI_QUOTA_5PCT').length;
        const tfw = instStudents.filter(s => s.quota_bucket === 'SUPERNUMERARY_TFW_5PCT').length;
        const fn = instStudents.filter(s => s.quota_bucket === 'SUPERNUMERARY_FN_OCI_15PCT').length;
        const pmsss = instStudents.filter(s => s.quota_bucket === 'SUPERNUMERARY_PMSSS').length;
        return `2026-27,"${i.id}","${i.name}","${i.course_name}",${i.approved_intake},${instStudents.length},${regular},${nri},${tfw},${fn},${pmsss},100%`;
      }).join('\n');
      content = header + rows;
    } else if (format === 'NBA') {
      filename = 'NBA_Criterion_4_Enrolment_Register.csv';
      const header = 'Student_ID,APAAR_ID,Student_Name,DOB,Gender,Category,Course,Quota_Bucket,Seat_Slot_ID,Status,Sanctioned_Intake_Proof\n';
      const rows = students.map(s => {
        return `"${s.student_id}","${s.apaar_id}","${s.name}","${s.dob}","${s.gender}","${s.category}","${s.course_name}","${s.quota_bucket}","${s.seat_slot_id || 'QUARANTINED'}","${s.status}","${s.seat_slot_id ? 'VERIFIED_SANCTIONED_SEAT' : 'EXCESS_BLOCKED'}"`;
      }).join('\n');
      content = header + rows;
    } else if (format === 'NIRF') {
      filename = 'NIRF_Sanctioned_Intake_Audit_2026.csv';
      const header = 'AICTE_ID,Institute,State,Region,Sanctioned_Intake,Verified_Enrolled,Intake_Utilization_Pct,Compliance_Rating\n';
      const rows = institutions.map(i => {
        const active = students.filter(s => s.institution_id === i.id && s.status === 'VERIFIED_ACTIVE').length;
        const pct = Math.round((active / i.approved_intake) * 100);
        return `"${i.id}","${i.name}","${i.state}","${i.region}",${i.approved_intake},${active},${pct}%,"${pct <= 100 ? 'COMPLIANT' : 'EXCESS_PENALTY'}"`;
      }).join('\n');
      content = header + rows;
    } else {
      filename = 'AICTE_National_Student_Registry_Full.json';
      mimeType = 'application/json';
      content = JSON.stringify({
        academic_year: '2026-27',
        system: 'AICTE APAAR-Setu Platform',
        authority: 'Ministry of Education, Govt. of India',
        institutions,
        students,
        generated_at: new Date().toISOString()
      }, null, 2);
    }

    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported: ${filename} downloaded successfully.`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginAs,
        logout,
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
        isUploadModalOpen,
        setIsUploadModalOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        activeDuplicateStudent,
        setActiveDuplicateStudent,
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
        loadDemoScenario,
        exportDataPackage
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
