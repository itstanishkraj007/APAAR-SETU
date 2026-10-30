import React from 'react';
import { Check, RotateCw, Lock, ShieldCheck } from 'lucide-react';

interface ProgressSnapshotCardProps {
  utilizationPct?: number;
  regularCount?: number;
  regularCap?: number;
  supernumeraryCount?: number;
  nriCount?: number;
  excessCount?: number;
}

export const ProgressSnapshotCard: React.FC<ProgressSnapshotCardProps> = ({
  utilizationPct = 94.2,
  regularCount = 114,
  regularCap = 120,
  supernumeraryCount = 18,
  nriCount = 6,
  excessCount = 0
}) => {
  // 7 Statutory Stages (Replicating Image 4 top row)
  const stages = [
    { label: 'EoA', status: 'done', tooltip: 'AICTE Approval Synced' },
    { label: 'ABC', status: 'done', tooltip: 'Academic Bank Credits Validated' },
    { label: 'CET', status: 'done', tooltip: 'State Counselling Merged' },
    { label: 'SII', status: 'done', tooltip: 'Study in India Verified' },
    { label: 'FRRO', status: 'sync', tooltip: 'e-FRRO Visa Triangulation' },
    { label: 'Dedup', status: 'done', tooltip: 'Dual-Layer Dedup Guard' },
    { label: 'Lock', status: 'locked', tooltip: 'AICTE Central Ledger Lock' },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col justify-between h-full">
      {/* Top Header & Dropdown */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">Progress Snapshot</h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          AY 2026-27 ▾
        </span>
      </div>

      {/* 7 Stage Indicators Row (Replicating Image 4 Su Mo Tu We Th Fr Sa indicators) */}
      <div className="flex items-center justify-between pt-2">
        {stages.map((st, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{st.label}</span>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                st.status === 'done'
                  ? 'bg-slate-900 text-white'
                  : st.status === 'sync'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-spin-slow'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
              }`}
              title={st.tooltip}
            >
              {st.status === 'done' && <Check size={13} strokeWidth={3} />}
              {st.status === 'sync' && <RotateCw size={12} />}
              {st.status === 'locked' && <Lock size={12} />}
            </div>
          </div>
        ))}
      </div>

      {/* Big Hero Number */}
      <div className="pt-3">
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight font-mono-numeric">
            {utilizationPct}%
          </span>
          <span className="text-xs text-slate-500 font-medium">Sanctioned Seat Utilization</span>
        </div>
      </div>

      {/* Thick Rounded Multi-Segment Pill Bar with 6px Gap (Signature from Image 4) */}
      <div className="pt-2">
        <div className="flex items-center gap-1.5 w-full h-4.5">
          {/* Segment 1: Regular Sanctioned Intake (Emerald) */}
          <div
            style={{ width: `${Math.min(75, (regularCount / regularCap) * 75)}%` }}
            className="h-full bg-emerald-600 rounded-full transition-all relative group"
            title={`Regular Merit: ${regularCount} / ${regularCap}`}
          />
          {/* Segment 2: Supernumerary TFW / FN / PMSSS (Amber) */}
          <div
            style={{ width: '16%' }}
            className="h-full bg-amber-400 rounded-full transition-all relative group"
            title={`Supernumerary (TFW + FN + PMSSS): ${supernumeraryCount} seats`}
          />
          {/* Segment 3: NRI Quota (Lime or Crimson if excess) */}
          <div
            style={{ width: excessCount > 0 ? '12%' : '9%' }}
            className={`h-full rounded-full transition-all relative group ${
              excessCount > 0 ? 'bg-rose-500 animate-pulse' : 'bg-lime-400'
            }`}
            title={excessCount > 0 ? `Excess Breach: ${excessCount}` : `NRI Quota: ${nriCount}`}
          />
        </div>

        {/* Legend Sub-labels */}
        <div className="flex items-center justify-between pt-2.5 text-[11px]">
          <div>
            <span className="font-extrabold text-slate-900 font-mono-numeric">{regularCount}</span>
            <span className="text-slate-500 ml-1">Regular Merit</span>
          </div>
          <div>
            <span className="font-extrabold text-amber-700 font-mono-numeric">{supernumeraryCount}</span>
            <span className="text-slate-500 ml-1">Supernumerary</span>
          </div>
          <div>
            <span className={`font-extrabold font-mono-numeric ${excessCount > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
              {excessCount > 0 ? `+${excessCount} Excess` : `${nriCount} NRI`}
            </span>
            <span className="text-slate-500 ml-1">{excessCount > 0 ? 'Quarantined' : 'Quota 5%'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
