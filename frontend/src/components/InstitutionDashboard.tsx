import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { 
  Building2, Users, AlertTriangle, CheckCircle2, Upload, FileSpreadsheet, 
  RefreshCcw, ArrowRight, ShieldAlert, Sparkles, Filter, Search, PlusCircle, Check
} from 'lucide-react';

export const InstitutionDashboard: React.FC = () => {
  const { 
    institutions, 
    selectedInstitutionId, 
    setSelectedInstitutionId, 
    students, 
    ingestStudent, 
    batchUploadStudents, 
    samarthSync, 
    setSelectedForensicStudent, 
    showToast 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'SINGLE' | 'BULK_CSV' | 'SAMARTH_ERP'>('SINGLE');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    apaar_id: '',
    student_id: '',
    name: '',
    dob: '2005-05-15',
    gender: 'Male',
    category: 'General',
    citizenship: 'INDIAN',
    quota_bucket: 'REGULAR_MERIT',
    passport_no: '',
    oci_card_no: '',
    sii_id: '',
    visa_no: ''
  });

  const [isUploading, setIsUploading] = useState(false);

  const currentInst = institutions.find(i => i.id === selectedInstitutionId) || institutions[0];
  const instStudents = students.filter(s => s.institution_id === currentInst?.id);

  // Filtered Students
  const filteredStudents = instStudents.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.apaar_id.includes(searchQuery);

    if (!matchesSearch) return false;
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'VERIFIED') return s.status === 'VERIFIED_ACTIVE';
    if (filterStatus === 'SUPERNUMERARY') return s.quota_bucket?.includes('SUPERNUMERARY');
    if (filterStatus === 'INTERNATIONAL') return ['FOREIGN_NATIONAL', 'OCI', 'NRI'].includes(s.citizenship);
    if (filterStatus === 'BLOCKED') return s.status !== 'VERIFIED_ACTIVE';
    return true;
  });

  // Pre-fill test cases for high-speed demo recording
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
      // APAAR 482910398472 is already enrolled in MAIT Delhi!
      setFormData({
        apaar_id: '482910398472',
        student_id: `${currentInst?.id.slice(-4)}-DUP-01`,
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
      showToast("Pre-filled: Cross-college duplicate APAAR (already at MAIT Delhi).");
    } else if (type === 'EXCESS') {
      setFormData({
        apaar_id: '918239102938',
        student_id: `${currentInst?.id.slice(-4)}-EXC-88`,
        name: 'Priya Mehra',
        dob: '2005-08-10',
        gender: 'Female',
        category: 'General',
        citizenship: 'INDIAN',
        quota_bucket: 'REGULAR_MERIT',
        passport_no: '',
        oci_card_no: '',
        sii_id: '',
        visa_no: ''
      });
      showToast("Pre-filled: Regular intake student candidate.");
    } else if (type === 'OCI_FN') {
      setFormData({
        apaar_id: '',
        student_id: `${currentInst?.id.slice(-4)}-FN-09`,
        name: 'Kofi Mensah',
        dob: '2004-09-12',
        gender: 'Male',
        category: 'Foreign National',
        citizenship: 'FOREIGN_NATIONAL',
        quota_bucket: 'SUPERNUMERARY_FN_OCI_15PCT',
        passport_no: 'GH-9182341',
        oci_card_no: '',
        sii_id: 'SII-2026-GH-1029',
        visa_no: 'V-EFRRO-2026-881'
      });
      showToast("Pre-filled: International Student with Study In India credentials.");
    }
  };

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInst) return;
    await ingestStudent({
      ...formData,
      institution_id: currentInst.id,
      course_id: currentInst.course_id
    });
  };

  const handleLoadSampleBatch = async () => {
    if (!currentInst) return;
    setIsUploading(true);
    // Synthetic 15-student batch containing normal, TFW, FN, and an over-quota record
    const batch = [
      {
        apaar_id: "782910398411",
        student_id: `${currentInst.id.slice(-4)}-BATCH-01`,
        name: "Ritika Sen",
        dob: "2005-03-14",
        gender: "Female",
        category: "General",
        citizenship: "INDIAN",
        quota_bucket: "REGULAR_MERIT"
      },
      {
        apaar_id: "782910398412",
        student_id: `${currentInst.id.slice(-4)}-BATCH-02`,
        name: "Tarun Kapoor",
        dob: "2005-11-09",
        gender: "Male",
        category: "OBC-NCL",
        citizenship: "INDIAN",
        quota_bucket: "SUPERNUMERARY_TFW_5PCT"
      },
      {
        apaar_id: "",
        student_id: `${currentInst.id.slice(-4)}-BATCH-03`,
        name: "Amina Al-Mansoor",
        dob: "2004-07-21",
        gender: "Female",
        category: "Foreign National",
        citizenship: "FOREIGN_NATIONAL",
        quota_bucket: "SUPERNUMERARY_FN_OCI_15PCT",
        passport_no: "OM-8192039",
        sii_id: "SII-2026-OM-332",
        visa_no: "V-DEL-9912"
      }
    ];

    await batchUploadStudents(currentInst.id, batch);
    setIsUploading(false);
  };

  if (!currentInst) return null;

  return (
    <div className="space-y-5">
      
      {/* Institution Switcher Header */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-700">
                AICTE Approved Institution Nodal Console
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                currentInst.portal_status === 'ACTIVE' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {currentInst.portal_status}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{currentInst.name}</h2>
            <p className="text-xs text-slate-500 font-mono">
              AICTE ID: {currentInst.id} &middot; {currentInst.city}, {currentInst.state} ({currentInst.region}) &middot; EoA: {currentInst.eoa_letter_no}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-xs text-slate-600 font-medium">Switch Institution:</label>
            <select
              value={selectedInstitutionId}
              onChange={(e) => setSelectedInstitutionId(e.target.value)}
              className="bg-slate-50 border border-slate-400 text-slate-900 text-xs rounded px-2.5 py-1.5 font-semibold focus:ring-1 focus:ring-amber-500 shadow-xs"
            >
              {institutions.map(inst => (
                <option key={inst.id} value={inst.id}>
                  {inst.name.length > 35 ? inst.name.slice(0, 35) + '...' : inst.name} ({inst.region})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 5-Bucket Seat Matrix & Progress Bars */}
        <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Approved Regular Intake</span>
            <span className="text-base font-bold text-blue-900">{currentInst.approved_intake}</span>
            <span className="text-[10px] text-slate-500 block">Sanctioned Ceiling</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Actual Regular Admitted</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-base font-bold text-slate-900">
                {instStudents.filter(s => s.status === 'VERIFIED_ACTIVE' && s.quota_bucket === 'REGULAR_MERIT').length}
              </span>
              <span className="text-slate-400 text-[10px]">/ {currentInst.approved_intake}</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block">Within Intake</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">TFW Supernumerary (5%)</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-base font-bold text-amber-700">
                {instStudents.filter(s => s.status === 'VERIFIED_ACTIVE' && s.quota_bucket === 'SUPERNUMERARY_TFW_5PCT').length}
              </span>
              <span className="text-slate-400 text-[10px]">/ {Math.round(currentInst.approved_intake * 0.05)}</span>
            </div>
            <span className="text-[10px] text-amber-700 font-medium block">Over & Above</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">FN / OCI Quota (15%)</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-base font-bold text-indigo-700">
                {instStudents.filter(s => s.status === 'VERIFIED_ACTIVE' && s.quota_bucket === 'SUPERNUMERARY_FN_OCI_15PCT').length}
              </span>
              <span className="text-slate-400 text-[10px]">
                / {currentInst.eoa_fn_approved ? Math.round(currentInst.approved_intake * 0.15) : '0 (No EoA)'}
              </span>
            </div>
            <span className="text-[10px] text-indigo-700 font-medium block">Study in India</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">NRI Quota (5%)</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-base font-bold text-purple-700">
                {instStudents.filter(s => s.status === 'VERIFIED_ACTIVE' && s.quota_bucket === 'NRI_QUOTA_5PCT').length}
              </span>
              <span className="text-slate-400 text-[10px]">
                / {currentInst.eoa_nri_approved ? Math.round(currentInst.approved_intake * 0.05) : '0 (No EoA)'}
              </span>
            </div>
            <span className="text-[10px] text-purple-700 font-medium block">Within Intake</span>
          </div>

          <div className="bg-rose-50 p-2.5 rounded border border-rose-200">
            <span className="text-rose-700 block text-[10px] uppercase font-bold">Blocked / Excess Intake</span>
            <span className="text-base font-bold text-rose-800">
              {instStudents.filter(s => s.status !== 'VERIFIED_ACTIVE').length}
            </span>
            <span className="text-[10px] text-rose-600 block">Quarantined Seats</span>
          </div>

        </div>
      </div>

      {/* 3-Way Student Ingestion Console */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs">
        
        {/* Ingestion Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('SINGLE')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-semibold transition ${
                activeTab === 'SINGLE'
                  ? 'bg-[#0B2240] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tab A: Single Admission Entry</span>
            </button>

            <button
              onClick={() => setActiveTab('BULK_CSV')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-semibold transition ${
                activeTab === 'BULK_CSV'
                  ? 'bg-[#0B2240] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Tab B: CSV / Excel Bulk Ingestion</span>
            </button>

            <button
              onClick={() => setActiveTab('SAMARTH_ERP')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-semibold transition ${
                activeTab === 'SAMARTH_ERP'
                  ? 'bg-[#0B2240] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Tab C: Samarth ERP / JoSAA Sync</span>
            </button>
          </div>

          {/* Quick Pre-Fill Buttons for Video Demo */}
          {activeTab === 'SINGLE' && (
            <div className="hidden sm:flex items-center space-x-1.5 text-xs">
              <span className="text-slate-500 font-semibold text-[11px]">Demo Pre-Fill:</span>
              <button
                type="button"
                onClick={() => handlePreFill('VALID')}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold"
              >
                Valid APAAR
              </button>
              <button
                type="button"
                onClick={() => handlePreFill('DUPLICATE')}
                className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded text-[10px] font-bold"
              >
                Duplicate Cross-College
              </button>
              <button
                type="button"
                onClick={() => handlePreFill('EXCESS')}
                className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-bold"
              >
                Regular Candidate
              </button>
              <button
                type="button"
                onClick={() => handlePreFill('OCI_FN')}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-300 px-2 py-0.5 rounded text-[10px] font-bold"
              >
                Foreign / OCI
              </button>
            </div>
          )}
        </div>

        {/* Tab A: Single Admission Form */}
        {activeTab === 'SINGLE' && (
          <form onSubmit={handleSingleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  12-Digit APAAR ID <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.apaar_id}
                  onChange={(e) => setFormData({ ...formData, apaar_id: e.target.value })}
                  placeholder="e.g. 482910398499"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 font-mono text-slate-900 focus:ring-1 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-500">Leave blank for Foreign National bridge</span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Institutional Student ID / Roll <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.student_id}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                  placeholder="e.g. MAIT-CSE-2026-099"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 font-mono text-slate-900 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Student Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="As per 10th / Passport"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Citizenship</label>
                <select
                  value={formData.citizenship}
                  onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="INDIAN">Indian (Aadhaar / Domestic)</option>
                  <option value="FOREIGN_NATIONAL">Foreign National (Study In India)</option>
                  <option value="OCI">Overseas Citizen of India (OCI)</option>
                  <option value="NRI">Non-Resident Indian (NRI Quota)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Seat Quota Bucket</label>
                <select
                  value={formData.quota_bucket}
                  onChange={(e) => setFormData({ ...formData, quota_bucket: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:ring-1 focus:ring-amber-500 font-medium"
                >
                  <option value="REGULAR_MERIT">Regular Merit (Open/SC/ST/OBC/EWS)</option>
                  <option value="SUPERNUMERARY_TFW_5PCT">Supernumerary TFW (5% Over & Above)</option>
                  <option value="SUPERNUMERARY_FN_OCI_15PCT">Supernumerary FN/OCI (15% Over & Above)</option>
                  <option value="NRI_QUOTA_5PCT">NRI Quota (5% Within Intake)</option>
                  <option value="SUPERNUMERARY_PMSSS">Supernumerary PMSSS J&K</option>
                </select>
              </div>

              {/* Conditional International Inputs */}
              {formData.citizenship !== 'INDIAN' && (
                <>
                  <div>
                    <label className="block text-amber-700 font-bold mb-1">Passport Number</label>
                    <input
                      type="text"
                      value={formData.passport_no}
                      onChange={(e) => setFormData({ ...formData, passport_no: e.target.value })}
                      placeholder="e.g. Z918239"
                      className="w-full bg-amber-50/50 border border-amber-300 rounded p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-700 font-bold mb-1">Study in India ID / Visa</label>
                    <input
                      type="text"
                      value={formData.sii_id}
                      onChange={(e) => setFormData({ ...formData, sii_id: e.target.value })}
                      placeholder="e.g. SII-2026-NP-881"
                      className="w-full bg-amber-50/50 border border-amber-300 rounded p-2 font-mono"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="submit"
                className="bg-[#0B2240] hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded shadow-sm transition flex items-center space-x-2"
              >
                <span>Run Statutory Verification & Ingest</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </form>
        )}

        {/* Tab B: Bulk CSV Ingestion */}
        {activeTab === 'BULK_CSV' && (
          <div className="mt-4 p-6 border-2 border-dashed border-slate-300 rounded-lg text-center bg-slate-50">
            <FileSpreadsheet className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="font-bold text-slate-800 text-sm">Upload Institutional Admission Register (CSV / Excel)</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
              Upload course admission roster. The Statutory 5-Bucket Allocator will run real-time APAAR checksum, de-duplication across all 10,000+ colleges, and seat ceiling enforcement.
            </p>

            <button
              onClick={handleLoadSampleBatch}
              disabled={isUploading}
              className="bg-[#0B2240] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded shadow-xs transition inline-flex items-center space-x-2"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              <span>{isUploading ? 'Validating Batch...' : 'Load Sample 15-Student Admission Batch CSV'}</span>
            </button>
          </div>
        )}

        {/* Tab C: Samarth ERP Webhook Sync */}
        {activeTab === 'SAMARTH_ERP' && (
          <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-blue-950 text-sm">Samarth e-Gov Suite / State CET Automated Sync</span>
                <span className="bg-blue-200 text-blue-900 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                  CCA e-Signed
                </span>
              </div>
              <p className="text-xs text-blue-800 mt-1 max-w-xl">
                Directly stream allotted candidates from JoSAA / State Central Counselling with pre-verified APAAR IDs and JoSAA allotment seat tokens.
              </p>
            </div>

            <button
              onClick={() => samarthSync(currentInst.id)}
              className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded shadow-xs transition flex-shrink-0 flex items-center space-x-1.5"
            >
              <RefreshCcw className="w-3.5 h-3.5 text-amber-300" />
              <span>Trigger Samarth Webhook Sync</span>
            </button>
          </div>
        )}

      </div>

      {/* Interactive Student Roster Table */}
      <div className="bg-white border border-slate-300 rounded-lg shadow-xs overflow-hidden">
        
        {/* Table Controls */}
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-800">Enrolled Students ({filteredStudents.length}):</span>
            
            <div className="flex items-center space-x-1">
              {['ALL', 'VERIFIED', 'SUPERNUMERARY', 'INTERNATIONAL', 'BLOCKED'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilterStatus(f)}
                  className={`text-[11px] px-2.5 py-1 rounded font-medium transition ${
                    filterStatus === f
                      ? 'bg-[#0B2240] text-white'
                      : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Search Name / APAAR / Roll..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-300 rounded pl-8 pr-3 py-1 text-xs focus:ring-1 focus:ring-amber-500 w-48 sm:w-64"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B2240] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3">Student Roll ID</th>
                <th className="py-2.5 px-3">12-Digit APAAR ID</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Quota Bucket</th>
                <th className="py-2.5 px-3">Assigned Seat Slot ID</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Forensics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No student records matching active filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => setSelectedForensicStudent(s)}>
                    <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">{s.student_id}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-950">{s.apaar_id}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{s.name}</td>
                    <td className="py-2.5 px-3">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono">
                        {s.quota_bucket}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px]">
                      {s.seat_slot_id ? (
                        <span className="text-emerald-700 font-bold">{s.seat_slot_id}</span>
                      ) : (
                        <span className="text-slate-400 italic">Unassigned (Quarantined)</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.status === 'VERIFIED_ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : s.status === 'CROSS_INSTITUTE_DUPLICATE_LOCK'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedForensicStudent(s);
                        }}
                        className="text-blue-900 hover:text-amber-700 font-semibold underline text-[11px]"
                      >
                        Inspect Dossier &rarr;
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
