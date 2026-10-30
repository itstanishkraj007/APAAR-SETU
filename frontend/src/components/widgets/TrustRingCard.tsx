import React from 'react';
import { Layers, Users, Globe2, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TrustRingCardProps {
  score?: number;
  label?: string;
  coursesSynced?: string;
  quotasActive?: number;
  approvedIntake?: number;
  actualEnrolled?: number;
  internationalCount?: number;
  duplicateCount?: number;
  onReviewDuplicates?: () => void;
}

export const TrustRingCard: React.FC<TrustRingCardProps> = ({
  score = 87,
  label = "Institutional Trust Index",
  coursesSynced = "36/36",
  quotasActive = 4,
  approvedIntake = 120,
  actualEnrolled = 114,
  internationalCount = 18,
  duplicateCount = 2,
  onReviewDuplicates
}) => {
  // SVG Ring calculation (radius 58, stroke 9)
  const radius = 58;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Progress fraction (out of 100)
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Knob position calculation
  const angle = (score / 100) * 360 - 90;
  const angleRad = (angle * Math.PI) / 180;
  const knobX = 80 + normalizedRadius * Math.cos(angleRad);
  const knobY = 80 + normalizedRadius * Math.sin(angleRad);

  return (
    <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col justify-between h-full">
      {/* Upper Area: Progress Ring + 2 Warm Gold Sub-cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Institutional Trust</h3>
            <p className="text-[11px] text-slate-500 font-medium">AICTE Compliance Rating</p>
          </div>
          <span className="text-[10px] font-bold text-slate-400">AY 2026-27</span>
        </div>

        {/* Circular Ring & Readout */}
        <div className="flex items-center justify-center relative py-2">
          <svg height="160" width="160" className="rotate-[-90deg] overflow-visible">
            {/* Background Circle */}
            <circle
              stroke="#F1F5F9"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="80"
              cy="80"
            />
            {/* Progress Arc */}
            <circle
              stroke="#FACC15"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx="80"
              cy="80"
              className="transition-all duration-700 ease-out"
            />
            {/* Glowing Knob (Replicating Image 2/3) */}
            <circle
              cx={knobX}
              cy={knobY}
              r="7"
              fill="#FFFFFF"
              stroke="#EAB308"
              strokeWidth="3.5"
              className="drop-shadow-md"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-baseline">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono-numeric">{score}</span>
              <span className="text-sm text-slate-400 font-bold ml-0.5">/100</span>
            </div>
            <span className="text-[10px] font-bold text-amber-700 mt-0.5 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
              High Integrity
            </span>
          </div>
        </div>

        {/* Two Warm Gold Gradient Sub-Cards (Replicating Image 3 3/6 tasks done, 4 projects) */}
        <div className="grid grid-cols-2 gap-2.5 mt-1">
          <div className="rounded-2xl p-3 bg-gradient-to-b from-[#FFFDF5] to-[#FEF3C7] border border-[#FDE047]/60">
            <span className="text-lg font-extrabold text-slate-900 font-mono-numeric">{coursesSynced}</span>
            <span className="text-[11px] font-semibold text-amber-900 block mt-0.5">Courses Synced</span>
          </div>
          <div className="rounded-2xl p-3 bg-gradient-to-b from-[#FFFDF5] to-[#FEF3C7] border border-[#FDE047]/60">
            <span className="text-lg font-extrabold text-slate-900 font-mono-numeric">{quotasActive}</span>
            <span className="text-[11px] font-semibold text-amber-900 block mt-0.5">Quotas Active</span>
          </div>
        </div>
      </div>

      {/* Lower Area: 2x2 Mini-Card Grid with Circular Yellow Icon Badges (From Image 3) */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
        {/* Mini 1: Approved Intake */}
        <div className="bg-slate-50/80 rounded-2xl p-2.5 border border-slate-200/60 flex items-start space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
            <Layers size={13} />
          </div>
          <div>
            <div className="text-sm font-extrabold text-slate-900 font-mono-numeric">{approvedIntake}</div>
            <div className="text-[10px] text-slate-500 font-medium">Approved Intake</div>
          </div>
        </div>

        {/* Mini 2: Actual Enrolled */}
        <div className="bg-slate-50/80 rounded-2xl p-2.5 border border-slate-200/60 flex items-start space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
            <Users size={13} />
          </div>
          <div>
            <div className="text-sm font-extrabold text-slate-900 font-mono-numeric">{actualEnrolled}</div>
            <div className="text-[10px] text-slate-500 font-medium">Enrolled (95%)</div>
          </div>
        </div>

        {/* Mini 3: International NRI/OCI */}
        <div className="bg-slate-50/80 rounded-2xl p-2.5 border border-slate-200/60 flex items-start space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
            <Globe2 size={13} />
          </div>
          <div>
            <div className="text-sm font-extrabold text-slate-900 font-mono-numeric">{internationalCount}</div>
            <div className="text-[10px] text-slate-500 font-medium">NRI / OCI / FN</div>
          </div>
        </div>

        {/* Mini 4: Blocked Duplicates (Clickable) */}
        <div
          onClick={onReviewDuplicates}
          className="bg-amber-50/80 hover:bg-amber-100/90 rounded-2xl p-2.5 border border-amber-200/80 flex items-start space-x-2.5 cursor-pointer transition group"
        >
          <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
            <AlertTriangle size={13} />
          </div>
          <div>
            <div className="text-sm font-extrabold text-rose-600 font-mono-numeric">{duplicateCount} Blocked</div>
            <div className="text-[10px] text-amber-800 font-bold group-hover:underline">Review now →</div>
          </div>
        </div>
      </div>
    </div>
  );
};
