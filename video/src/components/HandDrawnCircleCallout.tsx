import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface HandDrawnCircleCalloutProps {
  x: number; // Target box left
  y: number; // Target box top
  width: number; // Target box width
  height: number; // Target box height
  startFrame: number;
  color?: string; // e.g. '#DC2626' or '#16A34A'
  title: string;
  badge?: string;
  lines: string[];
  calloutX?: number;
  calloutY?: number;
  calloutWidth?: number;
  mathBreakdown?: {
    label: string;
    value: string;
    isDiscrepancy?: boolean;
  }[];
}

export const HandDrawnCircleCallout: React.FC<HandDrawnCircleCalloutProps> = ({
  x,
  y,
  width,
  height,
  startFrame,
  color = '#DC2626',
  title,
  badge,
  lines,
  calloutX,
  calloutY,
  calloutWidth = 380,
  mathBreakdown,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  // Spring animation for circle drawing
  const drawSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Callout card bounce entrance (slight delay)
  const cardSpring = spring({
    frame: Math.max(0, relFrame - 6),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Target padding
  const pad = 8;
  const cx = x + width / 2;
  const cy = y + height / 2;
  const rx = width / 2 + pad;
  const ry = height / 2 + pad;

  // Approximate circumference of ellipse
  const circumference = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
  const strokeDashoffset = interpolate(drawSpring, [0, 1], [circumference, 0]);

  // Default Callout Position (to the right of target if not specified)
  const cX = calloutX ?? Math.min(1920 - calloutWidth - 30, x + width + 30);
  const cY = calloutY ?? Math.max(90, y - 20);

  if (relFrame <= 0) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: 1920, height: 1080, pointerEvents: 'none', zIndex: 900 }}>
      {/* 1. Animated SVG Hand-Drawn Wobble Ellipse */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          overflow: 'visible',
        }}
      >
        {/* Organic hand-drawn path around the target */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke={color}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-2, ${cx}, ${cy})`}
        />

        {/* Second faint wobble stroke for natural hand-drawn sketch feel */}
        <ellipse
          cx={cx + 1}
          cy={cy - 1}
          rx={rx + 2}
          ry={ry + 1.5}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          opacity={0.45}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(1.5, ${cx}, ${cy})`}
        />

        {/* Pointer line connecting circle to callout box */}
        <path
          d={`M ${cx + rx} ${cy} Q ${cX - 20} ${cY + 40} ${cX} ${cY + 40}`}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeDasharray="4 4"
          opacity={cardSpring}
        />
        <circle cx={cx + rx} cy={cy} r={4} fill={color} opacity={cardSpring} />
      </svg>

      {/* 2. Floating Post-Production Callout Box */}
      <div
        style={{
          position: 'absolute',
          left: cX,
          top: cY,
          width: calloutWidth,
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          border: `2px solid ${color}`,
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.16)',
          padding: '16px 20px',
          fontFamily: "'Inter', sans-serif",
          transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 15}px)`,
          opacity: cardSpring,
          transformOrigin: 'top left',
        }}
      >
        {/* Badge / Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              color: color,
              backgroundColor: color === '#DC2626' ? '#FEE2E2' : '#DCFCE7',
              padding: '3px 8px',
              borderRadius: 6,
            }}
          >
            {badge || (color === '#DC2626' ? 'REGULATORY AUDIT ALERT' : 'COMPLIANCE VERIFIED')}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
              color: '#64748B',
            }}
          >
            LIVE AUDIT TRIGGER
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.25,
            marginBottom: 8,
          }}
        >
          {title}
        </div>

        {/* Lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: mathBreakdown ? 10 : 0 }}>
          {lines.map((ln, idx) => (
            <div
              key={idx}
              style={{
                fontSize: 12,
                color: '#334155',
                lineHeight: 1.4,
                fontFamily: 'JetBrains Mono, monospace',
                backgroundColor: '#F8FAFC',
                padding: '4px 8px',
                borderRadius: 4,
                borderLeft: `3px solid ${color}`,
              }}
            >
              {ln}
            </div>
          ))}
        </div>

        {/* Math Breakdown Table if provided */}
        {mathBreakdown && mathBreakdown.length > 0 && (
          <div
            style={{
              borderTop: '1px dashed #CBD5E1',
              paddingTop: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {mathBreakdown.map((mb, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: mb.isDiscrepancy ? 12 : 11,
                  fontWeight: mb.isDiscrepancy ? 800 : 600,
                  color: mb.isDiscrepancy ? '#DC2626' : '#475569',
                  backgroundColor: mb.isDiscrepancy ? '#FEF2F2' : 'transparent',
                  padding: mb.isDiscrepancy ? '4px 6px' : '1px 0',
                  borderRadius: 4,
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                <span>{mb.label}</span>
                <span>{mb.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
