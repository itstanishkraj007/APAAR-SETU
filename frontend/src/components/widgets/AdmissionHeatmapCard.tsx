import React, { useState } from 'react';
import { AlertCircle, Flame, Calendar, Sparkles } from 'lucide-react';

interface AdmissionHeatmapCardProps {
  totalAdmissions?: number;
  onSelectAnomaly?: (dayInfo: any) => void;
}

export const AdmissionHeatmapCard: React.FC<AdmissionHeatmapCardProps> = ({
  totalAdmissions = 1140,
  onSelectAnomaly
}) => {
  const [selectedCell, setSelectedCell] = useState<any>(null);

  // Generate 7 rows x 15 columns grid (matching Image 3 & 5 Activity matrix)
  // Rows: Mon, Tue, Wed, Thu, Fri, Sat, Sun
  const weeks = 15;
  const days = 7;
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthLabels = ['Aug', 'Sep', 'Oct', 'Cutoff Week'];

  // Matrix pattern: solid yellow (#FACC15), lighter yellow, hatched grey, or red anomaly (cutoff night surge)
  const grid = Array.from({ length: days }).map((_, r) =>
    Array.from({ length: weeks }).map((_, c) => {
      // Midnight anomaly on week 13, rows 3 & 4 (Cutoff week surge)
      const isAnomaly = (c === 13 && (r === 3 || r === 4)) || (c === 14 && r === 2);
      // High activity in middle weeks
      const isHigh = !isAnomaly && (c >= 6 && c <= 12) && ((r + c) % 3 === 0 || (r + c) % 4 === 0);
      const isMedium = !isAnomaly && !isHigh && (c >= 4 && c <= 13) && (r % 2 === 0);
      const isHatched = !isAnomaly && !isHigh && !isMedium;

      return {
        r,
        c,
        date: `2026-${c < 5 ? '08' : c < 10 ? '09' : '10'}-${10 + (c % 18)}`,
        batchCount: isAnomaly ? 38 : isHigh ? 24 : isMedium ? 12 : 0,
        isAnomaly,
        isHigh,
        isMedium,
        isHatched
      };
    })
  );

  return (
    <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Admission Activity Velocity</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Isolation Forest Radar
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            <strong className="text-slate-900 font-mono-numeric">{totalAdmissions}</strong> student batches submitted in the last 15 weeks
          </p>
        </div>

        {/* Legend (from Image 3: Less -> squares -> More) */}
        <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-medium">
          <span>Less</span>
          <div className="w-3 h-3 rounded-xs bg-hatched-slate border border-slate-200" title="Empty Day" />
          <div className="w-3 h-3 rounded-xs bg-amber-100" title="Low Velocity" />
          <div className="w-3 h-3 rounded-xs bg-amber-300" title="Normal Velocity" />
          <div className="w-3 h-3 rounded-xs bg-amber-400" title="Peak Velocity" />
          <div className="w-3 h-3 rounded-xs bg-rose-500 animate-pulse" title="Midnight Anomaly (>35 batches)" />
          <span>More</span>
        </div>
      </div>

      {/* Month Labels Bar */}
      <div className="flex items-center justify-between pl-8 pr-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
        <span className="text-rose-600 font-extrabold flex items-center space-x-1">
          <Flame size={11} className="inline mr-0.5" />
          Cutoff Week
        </span>
      </div>

      {/* 7x15 Hatched & Solid Matrix (Replicating Image 3 & 5 Activity matrix) */}
      <div className="flex space-x-2">
        {/* Day of Week Labels */}
        <div className="flex flex-col justify-between text-[9px] font-bold text-slate-400 uppercase py-0.5 select-none">
          {dayNames.map((d, i) => (
            <span key={i} className="h-4 flex items-center">{i % 2 === 0 ? d : ''}</span>
          ))}
        </div>

        {/* The Grid Columns */}
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 flex-1">
          {grid.flat().map((cell, idx) => {
            const isSelected = selectedCell?.r === cell.r && selectedCell?.c === cell.c;
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCell(cell);
                  if (cell.isAnomaly && onSelectAnomaly) onSelectAnomaly(cell);
                }}
                className={`w-full h-4 rounded-xs transition-all relative group cursor-pointer ${
                  cell.isAnomaly
                    ? 'bg-rose-500 hover:bg-rose-600 ring-2 ring-rose-400/50 animate-pulse'
                    : cell.isHigh
                    ? 'bg-[#FACC15] hover:bg-[#EAB308]'
                    : cell.isMedium
                    ? 'bg-amber-200 hover:bg-amber-300'
                    : 'bg-hatched-slate hover:bg-slate-200'
                } ${isSelected ? 'ring-2 ring-slate-900 scale-110 z-10' : ''}`}
                title={
                  cell.isAnomaly
                    ? `⚠️ Midnight Cutoff Surge! +${cell.batchCount} students uploaded at 11:58 PM (Click to inspect)`
                    : cell.batchCount > 0
                    ? `${cell.batchCount} verified student records ingested on ${cell.date}`
                    : `Zero submissions (${cell.date})`
                }
              />
            );
          })}
        </div>
      </div>

      {/* Interactive Micro Callout if Anomaly Clicked */}
      {selectedCell?.isAnomaly ? (
        <div className="mt-3 p-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-[11px] text-rose-900 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2">
            <AlertCircle size={14} className="text-rose-600 flex-shrink-0" />
            <span>
              <strong>Midnight Cutoff Surge Detected:</strong> 38 student records submitted 2 mins before portal deadline with shared mobile prefix!
            </span>
          </div>
          <span className="font-bold underline cursor-pointer text-rose-700 ml-2 whitespace-nowrap">
            Flag for EVC Audit →
          </span>
        </div>
      ) : (
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>AICTE ML Model: <strong>Isolation Forest + SHAP Radar</strong></span>
          <span className="text-emerald-700 font-bold">● 99.4% Normal Admission Velocity</span>
        </div>
      )}
    </div>
  );
};
