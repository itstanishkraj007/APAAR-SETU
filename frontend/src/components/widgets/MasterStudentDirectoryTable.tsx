import React, { useState } from 'react';
import { useAppStore, StudentRecord } from '../../store/appStore';
import { 
  Search, Filter, Plus, FileSpreadsheet, RefreshCw, 
  ChevronRight, ShieldAlert, Award, CheckCircle2, AlertTriangle, Eye, Download
} from 'lucide-react';

interface MasterStudentDirectoryTableProps {
  onRowClick?: (student: StudentRecord) => void;
  onSyncSamarth?: () => void;
  onAddStudent?: () => void;
}

export const MasterStudentDirectoryTable: React.FC<MasterStudentDirectoryTableProps> = ({
  onRowClick,
  onSyncSamarth,
  onAddStudent
}) => {
  const { 
    students, 
    selectedInstitutionId, 
    institutions, 
    setSelectedForensicStudent, 
    setIsAuditDrawerOpen,
    setActiveDuplicateStudent,
    setIsUploadModalOpen
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState<'ALL' | 'VERIFIED' | 'DUPLICATES' | 'EXCESS' | 'INTERNATIONAL'>('ALL');

  // Filter students for the current active college or full list
  const currentInst = institutions.find(i => i.id === selectedInstitutionId);

  const filteredStudents = students.filter(s => {
    // Search match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      s.name.toLowerCase().includes(q) ||
      s.apaar_id.toLowerCase().includes(q) ||
      s.student_id.toLowerCase().includes(q) ||
      s.institution_name.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    // Filter tabs
    if (activeFilterTab === 'VERIFIED') return s.status === 'VERIFIED_ACTIVE';
    if (activeFilterTab === 'DUPLICATES') return s.status === 'CROSS_INSTITUTE_DUPLICATE_LOCK';
    if (activeFilterTab === 'EXCESS') return ['BLOCKED_EXCESS_INTAKE', 'BLOCKED_UNAPPROVED_QUOTA'].includes(s.status);
    if (activeFilterTab === 'INTERNATIONAL') return ['FOREIGN_NATIONAL', 'OCI', 'NRI'].includes(s.citizenship);

    return true;
  });

  const getStatusBadge = (s: StudentRecord) => {
    if (s.status === 'VERIFIED_ACTIVE') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Verified Active</span>
        </span>
      );
    }
    if (s.status === 'CROSS_INSTITUTE_DUPLICATE_LOCK') {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveDuplicateStudent(s);
          }}
          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 transition"
          title="Click to open Duplicate Resolution Console"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
          <span>Duplicate Locked</span>
        </button>
      );
    }
    if (s.status === 'BLOCKED_EXCESS_INTAKE') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
          <span>Excess Seat #61</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
        <span>{s.status}</span>
      </span>
    );
  };

  const getQuotaBadge = (bucket: string) => {
    if (bucket === 'REGULAR_MERIT') {
      return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">Open Merit</span>;
    }
    if (bucket === 'SUPERNUMERARY_TFW_5PCT') {
      return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">TFW (5%)</span>;
    }
    if (bucket === 'SUPERNUMERARY_FN_OCI_15PCT') {
      return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">FN / OCI (15%)</span>;
    }
    if (bucket === 'NRI_QUOTA_5PCT') {
      return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">NRI (5%)</span>;
    }
    if (bucket === 'SUPERNUMERARY_PMSSS') {
      return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200">PMSSS</span>;
    }
    return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">{bucket}</span>;
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col space-y-4">
      {/* Top Action Bar (Matching Images 9 & 10 MedConnect Header) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        {/* Left: Total Count Badge */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-bold text-slate-900 tracking-tight">Student Enrolment Directory</span>
          <span className="bg-[#141519] text-white text-[11px] font-extrabold px-3 py-1 rounded-full font-mono-numeric">
            {students.length} Records
          </span>
          <span className="hidden md:inline-block text-xs text-slate-400 font-medium">
            AICTE National Academic Repository
          </span>
        </div>

        {/* Right: Search Input + Buttons */}
        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          {/* Pill Search Input */}
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 12-digit APAAR, name, roll..."
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium pl-9 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition"
            />
          </div>

          {/* Black Pill CTA: Add / Upload */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#141519] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs transition flex items-center space-x-1.5 flex-shrink-0 cursor-pointer"
          >
            <Plus size={13} strokeWidth={3} />
            <span>Upload Roster</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs Bar (Replicating Image 9 & 10 tabs) */}
      <div className="flex items-center justify-between overflow-x-auto pb-1 scrollbar-none gap-2">
        <div className="flex items-center space-x-1.5 bg-slate-100/80 p-1 rounded-2xl">
          {[
            { id: 'ALL', label: `All Students (${students.length})` },
            { id: 'VERIFIED', label: 'Verified Active' },
            { id: 'DUPLICATES', label: 'Duplicate Locks' },
            { id: 'EXCESS', label: 'Excess Intake' },
            { id: 'INTERNATIONAL', label: 'NRI / OCI / FN' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilterTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeFilterTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-400 font-mono-numeric hidden lg:block">
          Showing {filteredStudents.length} of {students.length} filtered entries
        </div>
      </div>

      {/* Airy Table Container (From Images 9 & 10) */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-3 font-semibold">Student & Institution</th>
              <th className="py-3 px-3 font-semibold">12-Digit APAAR ID</th>
              <th className="py-3 px-3 font-semibold">Institutional Roll</th>
              <th className="py-3 px-3 font-semibold">Quota & Category</th>
              <th className="py-3 px-3 font-semibold">Seat Slot ID</th>
              <th className="py-3 px-3 font-semibold">Status</th>
              <th className="py-3 px-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  No student records match the active filter criteria.
                </td>
              </tr>
            ) : (
              filteredStudents.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => {
                    setSelectedForensicStudent(s);
                    if (onRowClick) onRowClick(s);
                  }}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  {/* Student & Institution */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center font-mono text-[11px] flex-shrink-0 group-hover:scale-105 transition">
                        {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-amber-700 transition">
                          {s.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                          {s.course_name} · {s.institution_name.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 12-Digit APAAR ID */}
                  <td className="py-3.5 px-3">
                    <span className="font-mono text-xs font-semibold text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                      {s.apaar_id}
                    </span>
                  </td>

                  {/* Institutional Roll ID */}
                  <td className="py-3.5 px-3 font-mono font-medium text-slate-700">
                    {s.student_id}
                  </td>

                  {/* Quota Category */}
                  <td className="py-3.5 px-3">
                    {getQuotaBadge(s.quota_bucket)}
                  </td>

                  {/* Seat Slot ID */}
                  <td className="py-3.5 px-3 font-mono text-[11px] text-slate-600">
                    {s.seat_slot_id ? (
                      <span className="text-emerald-700 font-semibold">{s.seat_slot_id}</span>
                    ) : (
                      <span className="text-rose-500 font-bold">Unsanctioned / Quarantined</span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3">
                    {getStatusBadge(s)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedForensicStudent(s);
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition"
                        title="Inspect Forensics Dossier & Dual-ID Degree"
                      >
                        <Eye size={14} />
                      </button>
                      <ChevronRight size={14} className="text-slate-400 group-hover:text-slate-900 transition" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
