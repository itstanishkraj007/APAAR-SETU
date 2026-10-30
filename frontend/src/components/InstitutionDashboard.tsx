import React, { useState } from 'react';
import { useAppStore, StudentRecord } from '../store/appStore';
import { ProgressSnapshotCard } from './widgets/ProgressSnapshotCard';
import { RadialTickGauge } from './widgets/RadialTickGauge';
import { TrustRingCard } from './widgets/TrustRingCard';
import { AdmissionHeatmapCard } from './widgets/AdmissionHeatmapCard';
import { MasterStudentDirectoryTable } from './widgets/MasterStudentDirectoryTable';
import { 
  Building2, Users, AlertTriangle, CheckCircle2, Upload, FileSpreadsheet, 
  RefreshCcw, ArrowRight, ShieldAlert, Sparkles, Filter, Search, PlusCircle, 
  Globe2, Award, Printer, Download, Check, ShieldCheck, QrCode, Lock
} from 'lucide-react';

export const InstitutionDashboard: React.FC = () => {
  const { 
    institutions, 
    selectedInstitutionId, 
    setSelectedInstitutionId,
    students, 
    ingestStudent, 
    samarthSync, 
    setSelectedForensicStudent, 
    setActiveDuplicateStudent,
    setIsUploadModalOpen,
    showToast 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SINGLE' | 'SAMARTH' | 'INTERNATIONAL' | 'DUAL_ID_STUDIO'>('OVERVIEW');

  // Form State for Single Entry
  const [formData, setFormData] = useState({
    apaar_id: '482910398499',
    student_id: 'MAIT-CSE-2026-099',
    name: 'Vikas Aggarwal',
    dob: '2005-06-20',
    gender: 'Male',
    category: 'General',
    citizenship: 'INDIAN',
    quota_bucket: 'REGULAR_MERIT',
    passport_no: '',
    oci_card_no: '',
    sii_id: '',
    visa_no: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCertificateStudent, setSelectedCertificateStudent] = useState<StudentRecord | null>(null);

  const currentInst = institutions.find(i => i.id === selectedInstitutionId) || institutions[0];
  const instStudents = students.filter(s => s.institution_id === currentInst?.id);

  // Quota Metrics
  const regularEnrolled = instStudents.filter(s => s.quota_bucket === 'REGULAR_MERIT' && s.status === 'VERIFIED_ACTIVE').length;
  const nriEnrolled = instStudents.filter(s => s.quota_bucket === 'NRI_QUOTA_5PCT' && s.status === 'VERIFIED_ACTIVE').length;
  const tfwEnrolled = instStudents.filter(s => s.quota_bucket === 'SUPERNUMERARY_TFW_5PCT' && s.status === 'VERIFIED_ACTIVE').length;
  const fnEnrolled = instStudents.filter(s => s.quota_bucket === 'SUPERNUMERARY_FN_OCI_15PCT' && s.status === 'VERIFIED_ACTIVE').length;
  const pmsssEnrolled = instStudents.filter(s => s.quota_bucket === 'SUPERNUMERARY_PMSSS' && s.status === 'VERIFIED_ACTIVE').length;
  const supernumeraryTotal = tfwEnrolled + fnEnrolled + pmsssEnrolled;

  const excessCount = instStudents.filter(s => ['BLOCKED_EXCESS_INTAKE', 'BLOCKED_UNAPPROVED_QUOTA'].includes(s.status)).length;
  const duplicateCount = instStudents.filter(s => s.status === 'CROSS_INSTITUTE_DUPLICATE_LOCK').length;
  const verifiedActiveCount = instStudents.filter(s => s.status === 'VERIFIED_ACTIVE').length;

  const totalCap = currentInst.approved_intake;
  const utilizationPct = Math.round((verifiedActiveCount / Math.max(totalCap, 1)) * 100);

  const handlePreFill = (type: 'VALID' | 'DUPLICATE' | 'EXCESS' | 'OCI_FN') => {
    if (type === 'VALID') {
      setFormData({
        apaar_id: '482910398499',
        student_id: `${currentInst?.id.slice(-4)}-CSE-99`,
        name: 'Vikas Aggarwal',
        dob: '2005-06-20',
        gender: 'Male',
        category: 'General',
        citizenship: 'INDIAN',
        quota_bucket: 'REGULAR_MERIT',
        passport_no: '',
        oci_card_no: '',
        sii_id: '',
        visa_no: ''
      });
      showToast("Pre-filled: Valid 12-digit Indian student candidate.");
    } else if (type === 'DUPLICATE') {
      setFormData({
        apaar_id: '482910398472', // Aarav Sharma
        student_id: `${currentInst?.id.slice(-4)}-CSE-DUP`,
        name: 'Aarav Sharma',
        dob: '2005-04-12',
        gender: 'Male',
        category: 'General',
        citizenship: 'INDIAN',
        quota_bucket: 'REGULAR_MERIT',
        passport_no: '',
        oci_card_no: '',
        sii_id: '',
        visa_no: ''
      });
      showToast("Pre-filled: Existing enrolled student (Will trigger duplicate lock).");
    } else if (type === 'EXCESS') {
      setFormData({
        apaar_id: '992018274019',
        student_id: `${currentInst?.id.slice(-4)}-CSE-EXCESS`,
        name: 'Karan Malhotra',
        dob: '2005-01-10',
        gender: 'Male',
        category: 'General',
        citizenship: 'INDIAN',
        quota_bucket: 'REGULAR_MERIT',
        passport_no: '',
        oci_card_no: '',
        sii_id: '',
        visa_no: ''
      });
      showToast("Pre-filled: Candidate admitted beyond sanctioned capacity.");
    } else if (type === 'OCI_FN') {
      setFormData({
        apaar_id: 'APAAR-FN-2026-F992',
        student_id: `${currentInst?.id.slice(-4)}-FN-02`,
        name: 'Liam Zhang',
        dob: '2004-10-14',
        gender: 'Male',
        category: 'Foreign National',
        citizenship: 'FOREIGN_NATIONAL',
        passport_no: 'P9820182',
        oci_card_no: '',
        sii_id: 'SII-2026-CN-9012',
        visa_no: 'V-EFRRO-DEL-9921',
        quota_bucket: 'SUPERNUMERARY_FN_OCI_15PCT'
      });
      showToast("Pre-filled: Foreign National with Study in India and e-FRRO credentials.");
    }
  };

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await ingestStudent({
      ...formData,
      institution_id: currentInst.id,
      course_id: currentInst.course_id,
      course_name: currentInst.course_name
    });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. College Selector Banner & Tab Switcher Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* College Selector Dropdown */}
        <div className="flex items-center space-x-3 w-full lg:w-auto">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 font-extrabold flex items-center justify-center border border-amber-200/60 flex-shrink-0">
            <Building2 size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              AICTE Permanent ID: <span className="font-mono text-slate-700">{currentInst.id}</span>
            </div>
            <select
              value={selectedInstitutionId}
              onChange={(e) => setSelectedInstitutionId(e.target.value)}
              className="font-extrabold text-sm sm:text-base text-slate-900 bg-transparent focus:outline-none cursor-pointer pr-4"
            >
              {institutions.map(inst => (
                <option key={inst.id} value={inst.id}>
                  {inst.name} ({inst.region})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section Tabs Bar */}
        <div className="flex items-center space-x-1.5 bg-slate-100/80 p-1 rounded-2xl overflow-x-auto max-w-full scrollbar-none">
          {[
            { id: 'OVERVIEW', label: 'Bento Overview' },
            { id: 'SINGLE', label: '+ Single Entry' },
            { id: 'SAMARTH', label: 'Samarth Webhook' },
            { id: 'INTERNATIONAL', label: 'NRI / OCI / FN' },
            { id: 'DUAL_ID_STUDIO', label: 'Dual-ID Studio' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN BENTO GRID (Visible on OVERVIEW tab) */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          {/* Top 3-Card Bento Row (Replicating Images 2, 3 & 4) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1: Progress Snapshot Segmented Pill Bar (From Image 4) */}
            <ProgressSnapshotCard
              utilizationPct={utilizationPct}
              regularCount={regularEnrolled}
              regularCap={currentInst.approved_intake}
              supernumeraryCount={supernumeraryTotal}
              nriCount={nriEnrolled}
              excessCount={excessCount}
            />

            {/* Card 2: Strong Day 87/100 Ring Card + 2x2 Mini Stat Grid (From Image 3) */}
            <TrustRingCard
              score={currentInst.anomaly_score > 30 ? 64 : 91}
              label="Compliance Health"
              coursesSynced="36/36"
              quotasActive={currentInst.eoa_nri_approved ? 5 : 3}
              approvedIntake={currentInst.approved_intake}
              actualEnrolled={verifiedActiveCount}
              internationalCount={fnEnrolled + nriEnrolled}
              duplicateCount={duplicateCount}
              onReviewDuplicates={() => {
                const dup = instStudents.find(s => s.status === 'CROSS_INSTITUTE_DUPLICATE_LOCK');
                if (dup) setActiveDuplicateStudent(dup);
                else showToast("Zero duplicate conflicts in selected institution.");
              }}
            />

            {/* Card 3: 32-Tick Radial Speedometer Gauge (From Images 2, 3 & 5) */}
            <RadialTickGauge
              percentage={currentInst.anomaly_score > 30 ? 68 : 94}
              label={currentInst.anomaly_score > 30 ? "Vigilance Audit" : "Healthy Compliance"}
              verifiedCount={verifiedActiveCount * 32}
              provisionalCount={fnEnrolled}
              quarantinedCount={excessCount + duplicateCount}
            />
          </div>

          {/* Middle: Admission Cutoff Velocity Heatmap (From Image 3 & 5) */}
          <AdmissionHeatmapCard
            totalAdmissions={verifiedActiveCount * 32 + 140}
            onSelectAnomaly={() => showToast("Midnight upload surge flagged for Regional Office inspection.")}
          />

          {/* Bottom: Master APAAR Student Directory Table (From Images 9 & 10) */}
          <MasterStudentDirectoryTable
            onRowClick={(student) => setSelectedForensicStudent(student)}
          />
        </div>
      )}

      {/* 3. SINGLE STUDENT ENTRY VIEW */}
      {activeTab === 'SINGLE' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Direct Post-Admission Entry</h2>
              <p className="text-xs text-slate-500">Atomic allocation against statutory 5-bucket quota capacity.</p>
            </div>

            {/* 1-Click Demo Pre-Fill Buttons */}
            <div className="flex items-center space-x-1.5 flex-wrap gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Pre-fill:</span>
              <button
                type="button"
                onClick={() => handlePreFill('VALID')}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
              >
                ✓ Valid Student
              </button>
              <button
                type="button"
                onClick={() => handlePreFill('DUPLICATE')}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 cursor-pointer"
              >
                🚨 Duplicate Clash
              </button>
              <button
                type="button"
                onClick={() => handlePreFill('EXCESS')}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 cursor-pointer"
              >
                ⚠️ Excess #61
              </button>
              <button
                type="button"
                onClick={() => handlePreFill('OCI_FN')}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 hover:bg-cyan-100 cursor-pointer"
              >
                🌐 Foreign National
              </button>
            </div>
          </div>

          <form onSubmit={handleSingleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">12-Digit APAAR ID</label>
                <input
                  type="text"
                  value={formData.apaar_id}
                  onChange={(e) => setFormData({ ...formData, apaar_id: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 font-mono text-xs focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Institutional Student ID</label>
                <input
                  type="text"
                  value={formData.student_id}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 font-mono text-xs focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Candidate Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Citizenship</label>
                <select
                  value={formData.citizenship}
                  onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
                >
                  <option value="INDIAN">Indian Citizen</option>
                  <option value="NRI">Non-Resident Indian (NRI)</option>
                  <option value="OCI">Overseas Citizen of India (OCI)</option>
                  <option value="FOREIGN_NATIONAL">Foreign National</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Statutory Quota Bucket</label>
                <select
                  value={formData.quota_bucket}
                  onChange={(e) => setFormData({ ...formData, quota_bucket: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
                >
                  <option value="REGULAR_MERIT">Regular Sanctioned Merit (SC/ST/OBC/EWS/Open)</option>
                  <option value="SUPERNUMERARY_TFW_5PCT">Supernumerary TFW (5% Over & Above)</option>
                  <option value="SUPERNUMERARY_FN_OCI_15PCT">Supernumerary FN / OCI (15% Over & Above)</option>
                  <option value="NRI_QUOTA_5PCT">NRI Quota (Up to 5% Within Sanctioned)</option>
                  <option value="SUPERNUMERARY_PMSSS">Supernumerary PMSSS (J&K Central)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
                />
              </div>
            </div>

            {formData.citizenship !== 'INDIAN' && (
              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-cyan-900 mb-1">Passport No</label>
                  <input
                    type="text"
                    value={formData.passport_no}
                    onChange={(e) => setFormData({ ...formData, passport_no: e.target.value })}
                    className="w-full bg-white border border-cyan-300 rounded-xl p-2 text-xs font-mono"
                    placeholder="e.g. N0918234"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-cyan-900 mb-1">Study in India (SII) ID</label>
                  <input
                    type="text"
                    value={formData.sii_id}
                    onChange={(e) => setFormData({ ...formData, sii_id: e.target.value })}
                    className="w-full bg-white border border-cyan-300 rounded-xl p-2 text-xs font-mono"
                    placeholder="SII-2026-NP-8812"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-cyan-900 mb-1">MHA e-FRRO Visa</label>
                  <input
                    type="text"
                    value={formData.visa_no}
                    onChange={(e) => setFormData({ ...formData, visa_no: e.target.value })}
                    className="w-full bg-white border border-cyan-300 rounded-xl p-2 text-xs font-mono"
                    placeholder="V-EFRRO-DEL-8910"
                  />
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#141519] hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-md transition cursor-pointer flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Verifying across 10 DPI Gateways...</span>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    <span>Run Statutory Verhoeff Validation & Allocate Seat Slot</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. SAMARTH ERP WEBHOOK VIEW */}
      {activeTab === 'SAMARTH' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 max-w-4xl mx-auto space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Samarth eGov & JoSAA Sync</h2>
              <p className="text-xs text-slate-500">Automated pull of counselling merit lists with digital allotment signatures.</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full">
              ● Webhook Active
            </span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Endpoint:</span>
              <code className="bg-white px-2.5 py-1 rounded border border-slate-200 text-blue-900">
                POST /api/webhooks/samarth-admissions
              </code>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Last Pull:</span>
              <span className="text-slate-900">Today, 10:14 AM (AY 2026-27 Phase 2)</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Authority:</span>
              <span className="text-slate-900">Central Seat Allocation Board (CSAB / JoSAA)</span>
            </div>
          </div>

          <button
            onClick={() => samarthSync(currentInst.id)}
            className="w-full bg-[#141519] hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <RefreshCcw size={16} />
            <span>Simulate 1-Click Samarth ERP Ingestion (+2 Admitted Candidates)</span>
          </button>
        </div>
      )}

      {/* 5. NRI / OCI / FN TRIANGULATION VIEW */}
      {activeTab === 'INTERNATIONAL' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 max-w-4xl mx-auto space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Provisional Foreign-APAAR Bridge</h2>
              <p className="text-xs text-slate-500">Study in India (SII), Passport MRZ & MHA e-FRRO validation for non-Aadhaar students.</p>
            </div>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-300">
              15% Supernumerary
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-900 block mb-1">1. Study in India (SII)</span>
              <p className="text-[11px] text-slate-500">Validates SII Offer Letter & clearance tokens from Ministry of External Affairs.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-900 block mb-1">2. Passport MRZ Parser</span>
              <p className="text-[11px] text-slate-500">Extracts ISO/IEC 7501-1 Machine Readable Zone hashes with MEA e-Sanad apostille.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-900 block mb-1">3. MHA e-FRRO Gateway</span>
              <p className="text-[11px] text-slate-500">Validates student visa permit validity before minting Provisional APAAR-FN.</p>
            </div>
          </div>

          <button
            onClick={() => handlePreFill('OCI_FN')}
            className="w-full bg-[#141519] hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Globe2 size={16} />
            <span>Load International Candidate Profile & Mint APAAR-FN</span>
          </button>
        </div>
      )}

      {/* 6. DUAL-ID DEGREE CERTIFICATE STUDIO (Requirement #10) */}
      {activeTab === 'DUAL_ID_STUDIO' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Dual-ID Certificate Studio (Mandate #10)</h2>
              <p className="text-xs text-slate-500">Generates degree certificates binding 12-digit APAAR ID + Student Roll ID + Seat Slot ID.</p>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-full transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer size={13} />
              <span>Print Certificate</span>
            </button>
          </div>

          {/* Certificate Preview Card */}
          <div className="border-4 border-double border-amber-600 bg-amber-50/20 p-8 rounded-3xl relative overflow-hidden shadow-sm">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700">
                Government of India &middot; Ministry of Education
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                All India Council for Technical Education
              </h3>
              <p className="text-xs text-slate-600 font-serif">
                National Permanent Academic Account Registry (APAAR) Verifiable Credential
              </p>
            </div>

            <div className="my-6 text-center space-y-2">
              <span className="text-xs text-slate-500 block">This is to certify that</span>
              <span className="text-2xl font-black text-slate-900 font-serif">Aarav Sharma</span>
              <p className="text-xs text-slate-600 max-w-lg mx-auto">
                has successfully completed the approved curriculum for <strong>B.Tech Computer Science & Engineering</strong> at <strong>Maharaja Agrasen Institute of Technology (MAIT)</strong>.
              </p>
            </div>

            {/* The Dual-ID & Sanctioned Seat Token Strip (Requirement #10) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-amber-200 shadow-xs text-xs">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">12-Digit APAAR ID</span>
                <span className="font-mono font-black text-emerald-700 text-sm">4829-1039-8472</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Student Roll ID</span>
                <span className="font-mono font-black text-slate-900 text-sm">MAIT-CSE-2026-001</span>
              </div>
              <div className="text-center sm:text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sanctioned Seat Slot</span>
                <span className="font-mono font-black text-blue-900 text-xs">NWRO-1-4519-REG-001</span>
              </div>
            </div>

            {/* Signature & QR Area */}
            <div className="mt-6 flex items-center justify-between text-xs pt-4 border-t border-amber-200/80">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-300 p-1 flex items-center justify-center">
                  <QrCode size={36} className="text-slate-900" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-[11px]">W3C Verifiable Credential</span>
                  <span className="text-[10px] font-mono text-slate-500">Ed25519 Signed by AICTE Root CA</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-900 block">Prof. T.G. Sitharam</span>
                <span className="text-[10px] text-slate-500">Chairman, AICTE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
