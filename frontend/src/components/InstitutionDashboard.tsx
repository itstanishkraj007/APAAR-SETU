import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { RoleSidebar } from './RoleSidebar';
import { 
  Building2, Users, AlertTriangle, CheckCircle2, Upload, FileSpreadsheet, 
  RefreshCcw, ArrowRight, ShieldAlert, Sparkles, Filter, Search, PlusCircle, 
  Globe2, Award, Printer, Download, Check
} from 'lucide-react';

export const InstitutionDashboard: React.FC = () => {
  const { 
    institutions, 
    selectedInstitutionId, 
    students, 
    ingestStudent, 
    batchUploadStudents, 
    samarthSync, 
    setSelectedForensicStudent, 
    showToast 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<string>('ROSTER');
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
  const [selectedCertificateStudent, setSelectedCertificateStudent] = useState<any>(null);

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
    setActiveTab('ROSTER');
  };

  const handleLoadSampleBatch = async () => {
    if (!currentInst) return;
    setIsUploading(true);
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
    setActiveTab('ROSTER');
  };

  if (!currentInst) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      
      {/* Zone 3: Left Sidebar */}
      <RoleSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Zone 3: Main Action Workspace */}
      <div className="flex-1 space-y-4 min-w-0">
        
        {/* Breadcrumb Bar */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono bg-white p-2.5 rounded-lg border border-slate-300 shadow-xs">
          <span>Home</span>
          <span>/</span>
          <span>{currentInst.region}</span>
          <span>/</span>
          <span className="font-semibold text-slate-800 truncate">{currentInst.name}</span>
          <span>/</span>
          <span className="text-blue-900 font-bold truncate">{currentInst.course_name}</span>
        </div>

        {/* Live KPI Strip (5-Bucket Seat Matrix Gauges) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 text-xs font-sans">
          
          <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Approved Intake</span>
            <span className="text-lg font-bold text-blue-950 font-mono">{currentInst.approved_intake}</span>
            <span className="text-[10px] text-slate-500 block">Sanctioned Ceiling</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Regular Merit Admitted</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold text-slate-900 font-mono">
                {instStudents.filter(s => s.status === 'VERIFIED_ACTIVE' && s.quota_bucket === 'REGULAR_MERIT').length}
              </span>
              <span className="text-slate-400 text-[10px]">/ {currentInst.approved_intake}</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block">Within Sanction</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">TFW Quota (5%)</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold text-amber-700 font-mono">
                {instStudents.filter(s => s.status === 'VERIFIED_ACTIVE' && s.quota_bucket === 'SUPERNUMERARY_TFW_5PCT').length}
              </span>
              <span className="text-slate-400 text-[10px]">/ {Math.round(currentInst.approved_intake * 0.05)}</span>
            </div>
            <span className="text-[10px] text-amber-700 font-medium block">Supernumerary</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">FN / OCI Quota (15%)</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold text-indigo-700 font-mono">
                {instStudents.filter(s => s.status === 'VERIFIED_ACTIVE' && s.quota_bucket === 'SUPERNUMERARY_FN_OCI_15PCT').length}
              </span>
              <span className="text-slate-400 text-[10px]">
                / {currentInst.eoa_fn_approved ? Math.round(currentInst.approved_intake * 0.15) : '0 (No EoA)'}
              </span>
            </div>
            <span className="text-[10px] text-indigo-700 font-medium block">Study in India</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">NRI Quota (5%)</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold text-purple-700 font-mono">
                {instStudents.filter(s => s.status === 'VERIFIED_ACTIVE' && s.quota_bucket === 'NRI_QUOTA_5PCT').length}
              </span>
              <span className="text-slate-400 text-[10px]">
                / {currentInst.eoa_nri_approved ? Math.round(currentInst.approved_intake * 0.05) : '0 (No EoA)'}
              </span>
            </div>
            <span className="text-[10px] text-purple-700 font-medium block">Within Sanction</span>
          </div>

          <div className="bg-rose-50 p-3 rounded-lg border border-rose-300 shadow-xs">
            <span className="text-rose-700 block text-[10px] uppercase font-bold">Blocked / Quarantined</span>
            <span className="text-lg font-bold text-rose-800 font-mono">
              {instStudents.filter(s => s.status !== 'VERIFIED_ACTIVE').length}
            </span>
            <span className="text-[10px] text-rose-600 font-semibold block">Excess / Duplicate</span>
          </div>

        </div>

        {/* Main Action Workspace Tabs */}
        <div className="bg-white border border-slate-300 rounded-lg shadow-xs overflow-hidden">
          
          {/* TAB: ROSTER */}
          {activeTab === 'ROSTER' && (
            <div>
              {/* Roster Controls */}
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-800">Filter Roster ({filteredStudents.length}):</span>
                  <div className="flex items-center space-x-1">
                    {['ALL', 'VERIFIED', 'SUPERNUMERARY', 'INTERNATIONAL', 'BLOCKED'].map(f => (
                      <button
                        key={f}
                        onClick={() => setFilterStatus(f)}
                        className={`text-[10px] px-2.5 py-1 rounded font-medium transition ${
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
                    className="bg-white border border-slate-300 rounded pl-8 pr-3 py-1 text-xs focus:ring-1 focus:ring-amber-500 w-48 sm:w-60"
                  />
                </div>
              </div>

              {/* Data Table with Monospace IDs */}
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
                      <th className="py-2.5 px-3 text-right">Forensic Audit</th>
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
                        <tr 
                          key={s.id} 
                          className="hover:bg-slate-50 transition cursor-pointer" 
                          onClick={() => setSelectedForensicStudent(s)}
                        >
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
          )}

          {/* TAB: SINGLE STUDENT ENTRY */}
          {activeTab === 'SINGLE' && (
            <div className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Single Student Admission Entry & Allotment Verification</h3>
                  <p className="text-xs text-slate-500">Submits candidate into the 5-bucket statutory allocator with instant Verhoeff checksum validation.</p>
                </div>

                <div className="flex items-center space-x-1.5 text-xs">
                  <span className="text-slate-500 font-semibold text-[10px]">Demo Pre-Fill:</span>
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
                    Duplicate Clash
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreFill('EXCESS')}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-bold"
                  >
                    Regular Seat
                  </button>
                </div>
              </div>

              <form onSubmit={handleSingleSubmit} className="space-y-4">
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
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Institutional Roll ID <span className="text-rose-500">*</span>
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
                      placeholder="As per Class 10 / Passport"
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
                    <label className="block text-slate-700 font-bold mb-1">Quota Bucket</label>
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
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-[#0B2240] hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded shadow-sm transition flex items-center space-x-2"
                  >
                    <span>Validate & Ingest Student</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: BULK CSV */}
          {activeTab === 'BULK_CSV' && (
            <div className="p-8 text-center bg-slate-50 space-y-4">
              <FileSpreadsheet className="w-12 h-12 text-[#0B2240] mx-auto" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Bulk CSV / Excel Admission Roster Ingestion</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Upload complete institutional admission registers. Client-side Verhoeff validation checks 12-digit APAARs before submitting to the central dedup engine.
                </p>
              </div>

              <div className="pt-2 flex justify-center space-x-3">
                <button
                  onClick={handleLoadSampleBatch}
                  disabled={isUploading}
                  className="bg-[#0B2240] hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded shadow-sm transition inline-flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>{isUploading ? 'Validating Batch...' : 'Load Sample 15-Student Admission Batch CSV'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: SAMARTH ERP */}
          {activeTab === 'SAMARTH' && (
            <div className="p-6 bg-blue-50/50 space-y-4">
              <div className="flex items-center space-x-2">
                <RefreshCcw className="w-5 h-5 text-blue-900" />
                <h3 className="font-bold text-blue-950 text-sm">1-Click Samarth eGov & JoSAA / State CET Webhook Sync</h3>
              </div>
              <p className="text-xs text-blue-800 max-w-2xl leading-relaxed">
                Connects directly to the State Higher Education Council or JoSAA counselling gateway to stream verified student allotment tokens with cryptographic signatures.
              </p>
              <button
                onClick={() => samarthSync(currentInst.id)}
                className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2.5 rounded shadow-sm transition inline-flex items-center space-x-2"
              >
                <span>Trigger JoSAA Allotment Sync</span>
                <Check className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          )}

          {/* TAB: INTERNATIONAL (NRI / OCI / FN) TRIANGULATION */}
          {activeTab === 'INTERNATIONAL' && (
            <div className="p-5 space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2">
                  <Globe2 className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-sm">NRI / OCI / Foreign National Triangulation Console</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Solves the 182-day Aadhaar exemption deadlock: triangulates Study in India (SII) ID, Passport MRZ, and e-FRRO Visa to issue a Provisional Foreign-APAAR ID.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded border">
                  <span className="font-bold text-slate-800 block mb-1">Study in India (SII) Verification</span>
                  <input
                    type="text"
                    placeholder="Enter SII Unique ID (e.g. SII-2026-NP-8812)"
                    className="w-full bg-white border border-slate-300 rounded p-1.5 font-mono text-xs"
                  />
                </div>
                <div className="bg-slate-50 p-3 rounded border">
                  <span className="font-bold text-slate-800 block mb-1">MHA e-FRRO Visa Clearance</span>
                  <input
                    type="text"
                    placeholder="Enter Visa Permit No (e.g. V-EFRRO-DEL-8910)"
                    className="w-full bg-white border border-slate-300 rounded p-1.5 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded text-xs text-amber-900">
                <strong>Provisional Foreign APAAR Generator:</strong> Generates a cryptographically bound <code>APAAR-FN-2026-XXXX</code> token that seamlessly binds to the student's ABC account once Indian residency is established.
              </div>
            </div>
          )}

          {/* TAB: DUAL-ID DEGREE STUDIO (Requirement #10) */}
          {activeTab === 'DUAL_ID_STUDIO' && (
            <div className="p-5 space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-[#0B2240]" />
                  <h3 className="font-bold text-slate-900 text-sm">Dual-ID Degree Certificate Studio (Requirement #10)</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Generates official degree and transcript certificates visibly printing both the National APAAR ID and Institutional Student Roll ID, bound to an AICTE Sanctioned Seat Slot ID.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800">Select Verified Student to Generate Certificate:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {instStudents.filter(s => s.status === 'VERIFIED_ACTIVE').slice(0, 3).map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedCertificateStudent(s)}
                      className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded text-left transition text-xs"
                    >
                      <strong className="block text-slate-900">{s.name}</strong>
                      <span className="font-mono text-blue-900 text-[10px] block">APAAR: {s.apaar_id}</span>
                      <span className="font-mono text-emerald-700 text-[10px] font-bold block">{s.seat_slot_id}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedCertificateStudent && (
                <div className="border-2 border-amber-500 bg-[#FFFDF9] p-6 text-center space-y-3 rounded-lg shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-amber-700">All India Council for Technical Education</h4>
                  <h3 className="text-lg font-serif font-bold text-slate-900 uppercase">Official Degree Credential</h3>
                  <div className="text-base font-bold text-[#0B2240]">{selectedCertificateStudent.name}</div>
                  <p className="text-xs text-slate-600">{currentInst.name} &middot; {selectedCertificateStudent.course_name}</p>

                  <div className="my-3 py-2 border-t border-b border-amber-300 grid grid-cols-3 gap-2 text-xs font-mono">
                    <div className="bg-slate-100 p-2 rounded">
                      <span className="text-[10px] text-slate-500 block font-sans font-bold">1. National APAAR ID</span>
                      <span className="text-blue-900 font-bold">{selectedCertificateStudent.apaar_id}</span>
                    </div>
                    <div className="bg-slate-100 p-2 rounded">
                      <span className="text-[10px] text-slate-500 block font-sans font-bold">2. Institutional Roll ID</span>
                      <span className="text-slate-900 font-bold">{selectedCertificateStudent.student_id}</span>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded border border-emerald-300">
                      <span className="text-[10px] text-emerald-800 block font-sans font-bold">3. Sanctioned Seat Slot</span>
                      <span className="text-emerald-900 font-bold">{selectedCertificateStudent.seat_slot_id}</span>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-2 pt-2">
                    <button
                      onClick={() => window.print()}
                      className="bg-[#0B2240] text-white text-xs font-bold px-4 py-2 rounded flex items-center space-x-1.5 shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-400" />
                      <span>Print Dual-ID Certificate</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
