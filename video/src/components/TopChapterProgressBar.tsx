import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Check, Shield } from 'lucide-react';

export interface ChapterMeta {
  index: number;
  id: string;
  title: string;
  timeRange: string;
  startFrame: number;
  endFrame: number;
}

export const CHAPTERS: ChapterMeta[] = [
  {
    index: 0,
    id: 'PROBLEM',
    title: '01. THE PROBLEM',
    timeRange: '0:00 – 0:35',
    startFrame: 0,
    endFrame: 1050,
  },
  {
    index: 1,
    id: 'SOLUTION',
    title: '02. SOLUTION & USPs',
    timeRange: '0:35 – 1:10',
    startFrame: 1050,
    endFrame: 2100,
  },
  {
    index: 2,
    id: 'PROTOTYPE',
    title: '03. LIVE PROTOTYPE (5 ROLES)',
    timeRange: '1:10 – 2:30',
    startFrame: 2100,
    endFrame: 4500,
  },
  {
    index: 3,
    id: 'IMPACT',
    title: '04. IMPACT & BENEFITS',
    timeRange: '2:30 – 3:00',
    startFrame: 4500,
    endFrame: 5400,
  },
];

export const TopChapterProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Overall video progress from 0% to 100%
  const overallProgress = Math.min(1, Math.max(0, frame / durationInFrames));
  const progressPercent = overallProgress * 100;

  // Active chapter detection
  const activeChapterIndex = CHAPTERS.findIndex(
    (c) => frame >= c.startFrame && frame < c.endFrame
  );
  const currentChapter = CHAPTERS[activeChapterIndex >= 0 ? activeChapterIndex : CHAPTERS.length - 1];

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1920,
        height: 72,
        zIndex: 999,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Upper Bar: AICTE Identity + 4 Chapter Badges */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
          paddingLeft: 36,
          paddingRight: 36,
        }}
      >
        {/* Left: AICTE & MoE Seal and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* AICTE Emblem Vector */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: '#0B2240',
              border: '2px solid #D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            }}
          >
            <Shield size={24} color="#D97706" />
          </div>

          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#D97706',
                textTransform: 'uppercase',
                letterSpacing: 1.2,
                lineHeight: 1,
              }}
            >
              AICTE · Ministry of Education · SIH 2026
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: '#0B2240',
                letterSpacing: -0.3,
                marginTop: 3,
                lineHeight: 1.1,
              }}
            >
              APAAR-Setu <span style={{ fontWeight: 400, color: '#64748B', fontSize: 13 }}>| National Student Registry & Compliance</span>
            </div>
          </div>
        </div>

        {/* Center/Right: 4 Chapter Badges Connected */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {CHAPTERS.map((ch, idx) => {
            const isCompleted = frame >= ch.endFrame;
            const isActive = frame >= ch.startFrame && frame < ch.endFrame;

            // Animate scale on activation
            const badgeSpring = spring({
              frame: frame - ch.startFrame,
              fps,
              config: { damping: 14, stiffness: 140 },
            });

            return (
              <div
                key={ch.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 14px',
                  borderRadius: 20,
                  backgroundColor: isActive
                    ? '#0B2240'
                    : isCompleted
                    ? '#F0FDF4'
                    : '#F8FAFC',
                  border: isActive
                    ? '2px solid #D97706'
                    : isCompleted
                    ? '1.5px solid #86EFAC'
                    : '1px solid #CBD5E1',
                  color: isActive
                    ? '#FFFFFF'
                    : isCompleted
                    ? '#15803D'
                    : '#64748B',
                  transform: isActive ? `scale(${1 + badgeSpring * 0.04})` : 'scale(1)',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(11, 34, 64, 0.2)' : 'none',
                }}
              >
                {/* Status Dot / Checkmark */}
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: isActive
                      ? '#D97706'
                      : isCompleted
                      ? '#16A34A'
                      : '#CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {isCompleted ? (
                    <Check size={13} strokeWidth={3} />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: isActive ? 800 : 600,
                      letterSpacing: -0.2,
                      lineHeight: 1.1,
                    }}
                  >
                    {ch.title}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: isActive ? '#FDE68A' : '#94A3B8',
                      fontFamily: 'JetBrains Mono, monospace',
                      lineHeight: 1,
                      marginTop: 2,
                    }}
                  >
                    {ch.timeRange}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Far Right: Live FPS & Frame Counter for Verification */}
        <div
          style={{
            backgroundColor: '#0F172A',
            color: '#F8FAFC',
            borderRadius: 6,
            padding: '4px 10px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ color: '#D97706' }}>● REC</span>
          <span>{Math.floor(frame / fps)}s / 180s</span>
        </div>
      </div>

      {/* Bottom Track Line: Continuous 4px Progress Bar across Full Width */}
      <div
        style={{
          width: '100%',
          height: 4,
          backgroundColor: '#E2E8F0',
          position: 'relative',
        }}
      >
        {/* Filled Portion */}
        <div
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: '#1E3A8A',
            position: 'relative',
            transition: 'width 0.05s linear',
          }}
        >
          {/* Saffron Leading Pulse Dot */}
          <div
            style={{
              position: 'absolute',
              right: -5,
              top: -4,
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#D97706',
              boxShadow: '0 0 8px #D97706',
              border: '2px solid #FFFFFF',
            }}
          />
        </div>
      </div>
    </div>
  );
};
