import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { 
  X, UploadCloud, FileSpreadsheet, CheckCircle2, 
  AlertTriangle, Sparkles, ArrowRight, UserPlus, Globe2
} from 'lucide-react';

export const UploadRosterModal: React.FC = () => {
  const { 
    isUploadModalOpen, 
    setIsUploadModalOpen, 
    ingestStudent, 
    selectedInstitutionId, 
    institutions, 
    showToast 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'PRESETS' | 'CSV' | 'MANUAL'>('PRESETS');

  // Manual Form State
  const [apaarId, setApaarId] = useState('882910394821');
  const [studentId, setStudentId] = useState('MAIT-CSE-2026-099');
  const [name, setName] = useState('Priyanka Sen');
  const [quotaBucket, setQuotaBucket] = useState('REGULAR_MERIT');
  const [citizenship, setCitizenship] = useState('INDIAN');

  if (!isUploadModalOpen) return null;

  const currentInst = institutions.find(i => i.id === selectedInstitutionId) || institutions[0];

  // 4 Signature 1-Click Demo Presets
  const handleLoadPreset = async (presetType: string) => {
    let payload: any = {};

    if (presetType === 'CLEAN') {
      payload = {
        apaar_id: '918273645012',
        student_id: `MAIT-CSE-2026-${Math.floor(100 + Math.random() * 899)}`,
        name: 'Vanya Saxena',
        dob: '2005-06-19',
        gender: 'Female',
        category: 'General',
        citizenship: 'INDIAN',
        quota_bucket: 'REGULAR_MERIT',
        institution_id: currentInst.id,
        course_id: currentInst.course_id,
        course_name: currentInst.course_name
      };
    } else if (presetType === 'DUPLICATE') {
      payload = {
        apaar_id: '482910398472', // Aarav Sharma's existing APAAR at MAIT
        student_id: 'HORIZON-CSE-2026-044',
        name: 'Aarav Sharma',
        dob: '2005-04-12',
        gender: 'Male',
        category: 'General',
        citizenship: 'INDIAN',
        quota_bucket: 'REGULAR_MERIT',
        institution_id: '1-339102844', // Horizon Pune
        course_id: 'CSE-BTECH',
        course_name: 'B.Tech Computer Science & Engineering'
      };
    } else if (presetType === 'EXCESS') {
      payload = {
        apaar_id: '729104820194',
        student_id: 'APEX-PGDM-2026-068',
        name: 'Devansh Singhania',
        dob: '2003-01-22',
        gender: 'Male',
        category: 'General',
        citizenship: 'INDIAN',
        quota_bucket: 'REGULAR_MERIT',
        institution_id: '1-882341902', // Apex PGDM Mumbai
        course_id: 'PGDM-MGT',
        course_name: 'Post Graduate Diploma in Management'
      };
    } else if (presetType === 'FOREIGN') {
      payload = {
        apaar_id: `APAAR-FN-2026-${Math.floor(1000 + Math.random() * 8999)}`,
        student_id: `MAIT-CSE-2026-FN-${Math.floor(10 + Math.random() * 89)}`,
        name: 'Chen Wei',
        dob: '2004-09-08',
        gender: 'Male',
        category: 'Foreign National',
        citizenship: 'FOREIGN_NATIONAL',
        passport_no: 'E9812740',
        sii_id: 'SII-2026-IN-4491',
        visa_no: 'V-EFRRO-2026-8812',
        quota_bucket: 'SUPERNUMERARY_FN_OCI_15PCT',
        institution_id: currentInst.id,
        course_id: currentInst.course_id,
        course_name: currentInst.course_name
      };
    }

    await ingestStudent(payload);
    setIsUploadModalOpen(false);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await ingestStudent({
      apaar_id: apaarId,
      student_id: studentId,
      name,
      dob: '2005-05-15',
      gender: 'Other',
      category: 'General',
      citizenship,
      quota_bucket: quotaBucket,
      institution_id: currentInst.id,
      course_id: currentInst.course_id,
      course_name: currentInst.course_name
    });
    setIsUploadModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
              AICTE Statutory Enrolment Engine
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Upload Student Roster · {currentInst.name.split(' ')[0]}
            </h3>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 px-6 pt-3 bg-white space-x-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('PRESETS')}
            className={`pb-3 border-b-2 transition ${activeTab === 'PRESETS' ? 'border-[#141519] text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700'}`}
          >
            1-Click Demo Scenarios
          </button>
          <button
            onClick={() => setActiveTab('CSV')}
            className={`pb-3 border-b-2 transition ${activeTab === 'CSV' ? 'border-[#141519] text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700'}`}
          >
            Bulk CSV / Excel Streamer
          </button>
          <button
            onClick={() => setActiveTab('MANUAL')}
            className={`pb-3 border-b-2 transition ${activeTab === 'MANUAL' ? 'border-[#141519] text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700'}`}
          >
            Single Student Form
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6">
          {activeTab === 'PRESETS' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Instantly trigger real AICTE regulatory rules across colleges without manual typing:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Preset 1 */}
                <div
                  onClick={() => handleLoadPreset('CLEAN')}
                  className="bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-2xl p-3.5 cursor-pointer transition group"
                >
                  <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs mb-1">
                    <CheckCircle2 size={14} />
                    <span>Clean Verified Admission</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Ingests <strong>Vanya Saxena</strong> with valid 12-digit APAAR. Allocates next sanctioned seat slot.
                  </p>
                </div>

                {/* Preset 2 */}
                <div
                  onClick={() => handleLoadPreset('DUPLICATE')}
                  className="bg-slate-50 hover:bg-rose-50/60 border border-slate-200 hover:border-rose-300 rounded-2xl p-3.5 cursor-pointer transition group"
                >
                  <div className="flex items-center space-x-2 text-rose-700 font-bold text-xs mb-1">
                    <AlertTriangle size={14} />
                    <span>Cross-College Duplicate Clash</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Attempts to enroll <strong>Aarav Sharma</strong> at Horizon Pune while already locked at MAIT Delhi.
                  </p>
                </div>

                {/* Preset 3 */}
                <div
                  onClick={() => handleLoadPreset('EXCESS')}
                  className="bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 rounded-2xl p-3.5 cursor-pointer transition group"
                >
                  <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs mb-1">
                    <AlertTriangle size={14} />
                    <span>Excess Intake Capacity Breach</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Admit candidate #61 of 60 at Apex PGDM. Automatically triggers Section 10(k) quarantine.
                  </p>
                </div>

                {/* Preset 4 */}
                <div
                  onClick={() => handleLoadPreset('FOREIGN')}
                  className="bg-slate-50 hover:bg-cyan-50/60 border border-slate-200 hover:border-cyan-300 rounded-2xl p-3.5 cursor-pointer transition group"
                >
                  <div className="flex items-center space-x-2 text-cyan-700 font-bold text-xs mb-1">
                    <Globe2 size={14} />
                    <span>Foreign National (SII / Visa)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Verifies Study in India ID + e-FRRO permit. Generates provisional token without Aadhaar.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'CSV' && (
            <div className="space-y-4 text-center">
              <div className="border-2 border-dashed border-slate-300 rounded-3xl p-8 hover:bg-slate-50 transition cursor-pointer">
                <UploadCloud size={36} className="mx-auto text-slate-400 mb-2" />
                <span className="text-sm font-bold text-slate-900 block">Drag & drop AICTE Enrolment CSV</span>
                <span className="text-xs text-slate-500 block mt-1">Columns: APAAR_ID, Student_Roll, Name, DOB, Category, Quota_Bucket</span>
                <button
                  onClick={() => handleLoadPreset('CLEAN')}
                  className="mt-4 bg-[#141519] text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-slate-800 transition"
                >
                  Simulate CSV Parse (100 Rows)
                </button>
              </div>
            </div>
          )}

          {activeTab === 'MANUAL' && (
            <form onSubmit={handleManualSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">12-Digit APAAR ID</label>
                  <input
                    type="text"
                    value={apaarId}
                    onChange={(e) => setApaarId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-xs focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Institutional Student ID</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-xs focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Candidate Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Quota Bucket</label>
                  <select
                    value={quotaBucket}
                    onChange={(e) => setQuotaBucket(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
                  >
                    <option value="REGULAR_MERIT">Regular Sanctioned Merit</option>
                    <option value="SUPERNUMERARY_TFW_5PCT">Supernumerary TFW (5%)</option>
                    <option value="SUPERNUMERARY_FN_OCI_15PCT">Supernumerary FN / OCI (15%)</option>
                    <option value="NRI_QUOTA_5PCT">NRI Quota (5%)</option>
                    <option value="SUPERNUMERARY_PMSSS">PMSSS Central Scholarship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Citizenship</label>
                  <select
                    value={citizenship}
                    onChange={(e) => setCitizenship(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
                  >
                    <option value="INDIAN">Indian Citizen</option>
                    <option value="NRI">Non-Resident Indian (NRI)</option>
                    <option value="OCI">Overseas Citizen of India (OCI)</option>
                    <option value="FOREIGN_NATIONAL">Foreign National (FN)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#141519] hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl transition cursor-pointer"
                >
                  Verify APAAR & Allocate Seat Slot
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
