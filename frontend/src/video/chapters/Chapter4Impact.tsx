import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Shield, CheckCircle2, TrendingUp, Clock, Award, Sparkles } from 'lucide-react';

export const Chapter4Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rel frame within Chapter 4 (4500 to 5400)
  const relFrame = frame - 4500;

  // Scene 4.1: 4500 - 5100 (relFrame: 0 - 600) -> Before vs After Impact Matrix
  // Scene 4.2: 5100 - 5400 (relFrame: 600 - 900) -> Grand Closing Title Card

  const isScene41 = relFrame < 600;

  const impactMetrics = [
    {
      num: 1,
      title: 'Verification Turnaround Time',
      before: '3–6 Weeks Manual Search',
      after: '< 2 Seconds Real-Time',
      gain: '99.8% Speedup',
      icon: Clock,
      color: '#15803D',
      bg: '#DCFCE7',
    },
    {
      num: 2,
      title: 'Excess & Duplicate Enrolments',
      before: 'Unmonitored & Fragmented',
      after: '100% Deterministically Blocked',
      gain: 'Zero Over-Admissions',
      icon: CheckCircle2,
      color: '#15803D',
      bg: '#DCFCE7',
    },
    {
      num: 3,
      title: 'AISHE & NBA Reporting Effort',
      before: 'Months of Excel Reconciliation',
      after: '1-Click Automated Rollup',
      gain: '94% Less Effort',
      icon: TrendingUp,
      color: '#15803D',
      bg: '#DCFCE7',
    },
    {
      num: 4,
      title: 'Degree & Seat Authenticity',
      before: 'Paper Only (Forgery-Prone)',
      after: 'Dual-ID Cryptographic Proof',
      gain: 'W3C Verifiable',
      icon: Award,
      color: '#15803D',
      bg: '#DCFCE7',
    },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 72,
        left: 0,
        width: 1920,
        height: 1008,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 80px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ============================================================== */}
      {/* SCENE 4.1: Before vs. After Impact Matrix (4500 - 5100)        */}
      {/* ============================================================== */}
      {isScene41 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 16px',
                borderRadius: 20,
                backgroundColor: '#DCFCE7',
                border: '1.5px solid #86EFAC',
                color: '#15803D',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              MEASURABLE GOVERNANCE IMPACT
            </div>
            <h1
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: '#0B2240',
                letterSpacing: -0.5,
                margin: 0,
              }}
            >
              Transforming National Technical Admissions
            </h1>
            <p style={{ fontSize: 18, color: '#475569', marginTop: 8 }}>
              From fragmented paper self-reporting to deterministic cryptographic compliance.
            </p>
          </div>

          {/* 4 Impact Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, width: 1180 }}>
            {impactMetrics.map((m, idx) => {
              const cardDelay = idx * 25;
              const cardSpring = spring({
                frame: relFrame - cardDelay,
                fps,
                config: { damping: 14, stiffness: 120 },
              });
              const Icon = m.icon;

              return (
                <div
                  key={m.num}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    border: '2px solid #E2E8F0',
                    padding: '24px 28px',
                    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
                    transform: `scale(${cardSpring})`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          backgroundColor: '#EFF6FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#1E3A8A',
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                        {m.title}
                      </span>
                    </div>

                    <span
                      style={{
                        backgroundColor: m.bg,
                        color: m.color,
                        fontSize: 11,
                        fontWeight: 900,
                        padding: '3px 10px',
                        borderRadius: 20,
                        border: `1px solid ${m.color}`,
                      }}
                    >
                      {m.gain}
                    </span>
                  </div>

                  {/* Comparison Rows */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#991B1B', textTransform: 'uppercase' }}>
                        BEFORE (LEGACY)
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#7F1D1D', marginTop: 4 }}>
                        {m.before}
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                        AFTER (APAAR-SETU)
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: '#14532D', marginTop: 4 }}>
                        {m.after}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 4.2: Grand Closing Title Card (5100 - 5400)              */}
      {/* ============================================================== */}
      {!isScene41 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Central AICTE Official Emblem */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              backgroundColor: '#0B2240',
              border: '4px solid #D97706',
              boxShadow: '0 24px 64px rgba(11, 34, 64, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              transform: `scale(${spring({ frame: relFrame - 600, fps, config: { damping: 10, stiffness: 100 } })})`,
            }}
          >
            <Shield size={54} color="#D97706" />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 18px',
              borderRadius: 20,
              backgroundColor: '#FEF3C7',
              border: '1.5px solid #FCD34D',
              color: '#92400E',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 0.8,
              marginBottom: 16,
            }}
          >
            <Sparkles size={16} color="#D97706" />
            <span>SMART INDIA HACKATHON 2026 · PROBLEM STATEMENT ID: 26063</span>
          </div>

          <h1
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: '#0B2240',
              letterSpacing: -1,
              textAlign: 'center',
              lineHeight: 1.1,
              margin: 0,
              maxWidth: 1000,
            }}
          >
            One Nation. One Academic Identity.
            <br />
            <span style={{ color: '#D97706' }}>Zero Unverified Seats.</span>
          </h1>

          <p
            style={{
              fontSize: 20,
              color: '#475569',
              marginTop: 16,
              textAlign: 'center',
              maxWidth: 820,
            }}
          >
            AICTE Unified APAAR Student Registry, Seat-Matrix Compliance & Verifiable Credential Portal.
          </p>

          <div
            style={{
              marginTop: 32,
              display: 'flex',
              gap: 20,
              fontSize: 13,
              fontWeight: 700,
              color: '#1E3A8A',
            }}
          >
            <span>All India Council for Technical Education</span>
            <span>·</span>
            <span>Ministry of Education</span>
            <span>·</span>
            <span>Government of India</span>
          </div>
        </div>
      )}

      {/* Caption Pill at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '10px 24px',
          borderRadius: 30,
          fontSize: 15,
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          maxWidth: 1200,
        }}
      >
        <span style={{ color: '#D97706', fontWeight: 800 }}>CONCLUSION:</span>
        <span>
          {isScene41
            ? 'From weeks of manual verification to sub-second real-time validation—eliminating 100% of excess and duplicate admissions.'
            : 'One Nation. One Academic Identity. Zero Unverified Seats. Fully built and verified for Smart India Hackathon.'}
        </span>
      </div>
    </div>
  );
};
