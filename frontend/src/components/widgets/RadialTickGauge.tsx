import React from 'react';

interface RadialTickGaugeProps {
  percentage?: number;
  label?: string;
  sublabel?: string;
  verifiedCount?: number;
  provisionalCount?: number;
  quarantinedCount?: number;
}

export const RadialTickGauge: React.FC<RadialTickGaugeProps> = ({
  percentage = 91,
  label = "Healthy Compliance",
  sublabel = "Institutional Trust Index",
  verifiedCount = 1140,
  provisionalCount = 42,
  quarantinedCount = 8
}) => {
  // 32 ticks arranged across 180 degrees (-180 to 0)
  const totalTicks = 32;
  const activeTicks = Math.round((percentage / 100) * totalTicks);

  const radius = 95;
  const tickLength = 12;
  const centerX = 130;
  const centerY = 130;

  const ticks = Array.from({ length: totalTicks }).map((_, i) => {
    // Angle from -180 deg (left) to 0 deg (right)
    const angleDeg = -180 + (i / (totalTicks - 1)) * 180;
    const angleRad = (angleDeg * Math.PI) / 180;

    const x1 = centerX + (radius - tickLength) * Math.cos(angleRad);
    const y1 = centerY + (radius - tickLength) * Math.sin(angleRad);
    const x2 = centerX + radius * Math.cos(angleRad);
    const y2 = centerY + radius * Math.sin(angleRad);

    const isActive = i <= activeTicks;
    // Gradient coloring from yellow (#F5B82E) to emerald (#10B981)
    const strokeColor = isActive
      ? i > 24
        ? '#10B981'
        : i > 12
        ? '#F5B82E'
        : '#F59E0B'
      : '#E2E8F0';

    return { x1, y1, x2, y2, strokeColor, isActive };
  });

  return (
    <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] border border-slate-200/60 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Institutional Compliance</h3>
          <p className="text-[11px] text-slate-500 font-medium">EoA & APAAR Health Check</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          ● Live AI Radar
        </span>
      </div>

      {/* Speedometer SVG */}
      <div className="relative flex items-center justify-center -my-2 w-full max-w-[240px] mx-auto min-w-0">
        <svg viewBox="0 0 260 150" className="w-full h-auto overflow-visible">
          {ticks.map((t, idx) => (
            <line
              key={idx}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.strokeColor}
              strokeWidth={3.5}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          ))}
        </svg>

        {/* Center Digital Readout */}
        <div className="absolute top-[68px] flex flex-col items-center">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight font-mono-numeric">
            {percentage}%
          </span>
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold text-emerald-700">{label}</span>
          </div>
        </div>
      </div>

      {/* Bottom 3-Row Legend Matching Image 3 Reference */}
      <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium">APAAR & NAD Verified</span>
          </div>
          <span className="font-bold font-mono text-slate-900">{verifiedCount.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="font-medium">Provisional Foreign / OCI Bridge</span>
          </div>
          <span className="font-bold font-mono text-slate-900">{provisionalCount}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="font-medium">Quarantined (Excess / Duplicate)</span>
          </div>
          <span className="font-bold font-mono text-rose-600">{quarantinedCount}</span>
        </div>
      </div>
    </div>
  );
};
