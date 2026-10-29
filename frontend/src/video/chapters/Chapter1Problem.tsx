import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { OdometerCounter } from '../components/OdometerCounter';
import { 
  Building2, Users, FileSpreadsheet, FileText, AlertTriangle, 
  Search, ShieldAlert, Award, ArrowRight, XCircle, DollarSign 
} from 'lucide-react';

export const Chapter1Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-scenes timing within Chapter 1 (0 to 1050 frames)
  // Scene 1.1: 0 - 300 (0:00 - 0:10)
  // Scene 1.2: 300 - 660 (0:10 - 0:22)
  // Scene 1.3: 660 - 1050 (0:22 - 0:35)

  // Camera Pan / Micro Zoom across Chapter 1
  const camZoom = interpolate(frame, [0, 1050], [1, 1.03], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: 72,
        left: 0,
        width: 1920,
        height: 1008,
        transform: `scale(${camZoom})`,
        transformOrigin: 'center center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 80px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ============================================================== */}
      {/* SCENE 1.1: The Scale of AICTE & Statistical Blindness (0-300) */}
      {/* ============================================================== */}
      {frame < 300 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Kinetic Headline */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: 20,
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#1E3A8A',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              National Higher Education Landscape
            </div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: '#0B2240',
                letterSpacing: -1,
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              The Immense Scale of Technical Education in India
            </h1>
            <p
              style={{
                fontSize: 20,
                color: '#475569',
                marginTop: 10,
                maxWidth: 900,
              }}
            >
              Across India, over 10,000 AICTE-approved institutions enroll millions of students annually.
            </p>
          </div>

          {/* 2 Massive Rolling Odometer Metric Cards */}
          <div style={{ display: 'flex', gap: 40, zIndex: 10 }}>
            {/* Card 1: Institutions */}
            <div
              style={{
                width: 440,
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                border: '2px solid #E2E8F0',
                padding: '36px 32px',
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 120 } })})`,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: '#EFF6FF',
                  border: '1.5px solid #93C5FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1E3A8A',
                  marginBottom: 18,
                }}
              >
                <Building2 size={36} />
              </div>

              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: '#0B2240',
                  lineHeight: 1,
                }}
              >
                <OdometerCounter to={10420} startFrame={20} durationFrames={65} suffix="+" />
              </div>

              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1E3A8A',
                  marginTop: 8,
                }}
              >
                Approved Technical Institutions
              </div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
                Engineering, PGDM, Pharmacy & MCA
              </div>
            </div>

            {/* Card 2: Students with EXACT SIX ZEROS (30,00,000) */}
            <div
              style={{
                width: 500,
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                border: '2px solid #D97706',
                padding: '36px 32px',
                boxShadow: '0 20px 40px rgba(217, 119, 6, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 120 } })})`,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: '#FEF3C7',
                  border: '1.5px solid #FCD34D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#B45309',
                  marginBottom: 18,
                }}
              >
                <Users size={36} />
              </div>

              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: '#B45309',
                  lineHeight: 1,
                }}
              >
                <OdometerCounter to={3000000} startFrame={30} durationFrames={75} suffix="+" />
              </div>

              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#B45309',
                  marginTop: 8,
                }}
              >
                Enrolled Technical Students / Year
              </div>
              <div style={{ fontSize: 13, color: '#92400E', marginTop: 4, fontWeight: 600 }}>
                (Exact National Intake: 30,00,000+ Enrolments)
              </div>
            </div>
          </div>

          {/* Background Map Pulse Nodes */}
          <div
            style={{
              position: 'absolute',
              width: 800,
              height: 400,
              opacity: 0.15,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <svg viewBox="0 0 800 400" width="100%" height="100%">
              {/* India Tech Hub Coordinates */}
              <circle cx="280" cy="110" r="16" fill="#1E3A8A" />
              <circle cx="200" cy="220" r="14" fill="#1E3A8A" />
              <circle cx="340" cy="300" r="18" fill="#1E3A8A" />
              <circle cx="390" cy="280" r="14" fill="#1E3A8A" />
              <circle cx="560" cy="190" r="12" fill="#1E3A8A" />
              <line x1="280" y1="110" x2="200" y2="220" stroke="#1E3A8A" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="200" y1="220" x2="340" y2="300" stroke="#1E3A8A" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="340" y1="300" x2="390" y2="280" stroke="#1E3A8A" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="280" y1="110" x2="560" y2="190" stroke="#1E3A8A" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 1.2: Fragmented Excel Sheets & Paper Rosters (300-660)    */}
      {/* ============================================================== */}
      {frame >= 300 && frame < 660 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: 20,
                backgroundColor: '#FEE2E2',
                border: '1px solid #FCA5A5',
                color: '#DC2626',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              The Legacy System Breakdown
            </div>
            <h2
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: '#0B2240',
                letterSpacing: -0.5,
                margin: 0,
              }}
            >
              Aggregate Statistical Numbers Hide Unverifiable Records
            </h2>
            <p style={{ fontSize: 18, color: '#64748B', marginTop: 8 }}>
              Non-PGDM institutions only submit aggregate enrolment counts during annual approval.
            </p>
          </div>

          {/* Visual Showcase: The Aggregate Form vs The Chaotic Reality */}
          <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            {/* Left: What AICTE receives (Aggregate Lie) */}
            <div
              style={{
                width: 480,
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                border: '2px solid #CBD5E1',
                padding: '28px 24px',
                boxShadow: '0 12px 28px rgba(15, 23, 42, 0.08)',
                transform: `translateX(${(1 - spring({ frame: frame - 310, fps, config: { damping: 14 } })) * -50}px)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <FileText size={22} color="#475569" />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                  Annual Approval Portal Form
                </span>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: 10,
                    fontWeight: 800,
                    backgroundColor: '#FEF3C7',
                    color: '#B45309',
                    padding: '2px 8px',
                    borderRadius: 4,
                  }}
                >
                  AGGREGATE ONLY
                </span>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: 16, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>Course Name:</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
                  B.Tech Computer Science & Engineering
                </div>

                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>Approved Intake:</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#0B2240', marginBottom: 12 }}>
                  120 Seats
                </div>

                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>Total Students Enrolled:</div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: '#DC2626',
                    backgroundColor: '#FEF2F2',
                    padding: '8px 12px',
                    borderRadius: 6,
                    border: '1.5px dashed #DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>120</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#991B1B' }}>
                    ⚠️ ZERO STUDENT NAMES OR IDs
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ArrowRight size={36} color="#94A3B8" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginTop: 4 }}>HIDES</span>
            </div>

            {/* Right: The Chaotic Spreadsheets & Paper Files Flying In */}
            <div style={{ position: 'relative', width: 500, height: 320 }}>
              {/* Stacked Sheet 1 */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 440,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  border: '1px solid #CBD5E1',
                  padding: 16,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  transform: 'rotate(-4deg)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16A34A', fontSize: 12, fontWeight: 700 }}>
                  <FileSpreadsheet size={16} /> admissions_final_v3_copy.xlsx
                </div>
                <div style={{ marginTop: 8, fontSize: 11, fontFamily: 'monospace', color: '#64748B' }}>
                  Row 42: Amit Kumar | Aadhaar: NOT_PROVIDED | Quota: ?
                </div>
              </div>

              {/* Stacked Sheet 2 (Spawning with Spring) */}
              <div
                style={{
                  position: 'absolute',
                  top: 50,
                  left: 30,
                  width: 440,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  border: '1.5px solid #F87171',
                  padding: 16,
                  boxShadow: '0 12px 28px rgba(220, 38, 38, 0.12)',
                  transform: `rotate(3deg) scale(${spring({ frame: frame - 350, fps, config: { damping: 12 } })})`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#DC2626', fontSize: 12, fontWeight: 700 }}>
                  <AlertTriangle size={16} /> Duplicate Entry Found Across Folders
                </div>
                <div style={{ marginTop: 8, fontSize: 11, fontFamily: 'monospace', color: '#DC2626' }}>
                  Roll #104 enrolled in 2 departments simultaneously
                </div>
              </div>

              {/* Stacked Sheet 3: Rubber Stamped Paper (Spawning at Frame 420) */}
              <div
                style={{
                  position: 'absolute',
                  top: 110,
                  left: 15,
                  width: 440,
                  backgroundColor: '#FFFBEB',
                  borderRadius: 12,
                  border: '2px dashed #D97706',
                  padding: 18,
                  boxShadow: '0 16px 36px rgba(0,0,0,0.14)',
                  transform: `rotate(-1.5deg) scale(${spring({ frame: frame - 420, fps, config: { damping: 10 } })})`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#B45309' }}>
                    OFFICE REGISTRAR ROSTER
                  </span>
                  <span
                    style={{
                      border: '2px solid #DC2626',
                      color: '#DC2626',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 900,
                      transform: 'rotate(-8deg)',
                    }}
                  >
                    UNAUTHENTICATED
                  </span>
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: '#78350F' }}>
                  No digital hash · No national identity · Unverified NRI quota claims
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 1.3: The 4 Big Regulatory Frauds (660-1050)              */}
      {/* ============================================================== */}
      {frame >= 660 && (
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
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: 20,
                backgroundColor: '#FEE2E2',
                border: '1.5px solid #DC2626',
                color: '#DC2626',
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              CRITICAL REGULATORY VULNERABILITIES
            </div>
            <h2
              style={{
                fontSize: 40,
                fontWeight: 900,
                color: '#0B2240',
                letterSpacing: -0.5,
                margin: 0,
              }}
            >
              The Four Systemic Loopholes in Current Admissions
            </h2>
          </div>

          {/* 4-Card Kinetic Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: 1180 }}>
            {/* Card 1: Duplicate Cross-College Enrolment */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                border: '2px solid #FCA5A5',
                padding: '24px 26px',
                boxShadow: '0 8px 24px rgba(220, 38, 38, 0.08)',
                transform: `scale(${spring({ frame: frame - 680, fps, config: { damping: 12 } })})`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}>
                  <Users size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#991B1B' }}>
                    1. Cross-College Duplicate Seats
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Ghost candidate holding 2+ colleges</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#FEF2F2', padding: 12, borderRadius: 8, fontSize: 12, fontFamily: 'monospace', color: '#991B1B' }}>
                Aarav Sharma enrolled at <strong>MAIT New Delhi</strong> AND <strong>Horizon Pune</strong> simultaneously to block seats.
              </div>
            </div>

            {/* Card 2: Excess Intake Math Callout */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                border: '2.5px solid #DC2626',
                padding: '24px 26px',
                boxShadow: '0 12px 32px rgba(220, 38, 38, 0.16)',
                transform: `scale(${spring({ frame: frame - 720, fps, config: { damping: 12 } })})`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ShieldAlert size={24} color="#DC2626" />
                  <span style={{ fontSize: 16, fontWeight: 900, color: '#DC2626' }}>
                    2. Illegal Excess Admissions
                  </span>
                </div>
                <span style={{ backgroundColor: '#DC2626', color: '#FFFFFF', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>
                  SECTION 10(K) BREACH
                </span>
              </div>
              {/* Post-Production Math Callout Box */}
              <div style={{ backgroundColor: '#FFF1F2', border: '1.5px solid #FDA4AF', padding: '10px 14px', borderRadius: 8, fontFamily: 'monospace', fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#334155' }}>
                  <span>Actual Enrolment Submitted:</span>
                  <span style={{ fontWeight: 800 }}>138 Students</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#334155', borderBottom: '1px solid #CBD5E1', paddingBottom: 4 }}>
                  <span>AICTE Approved Intake:</span>
                  <span style={{ fontWeight: 800 }}>- 120 Seats</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#DC2626', fontWeight: 900, paddingTop: 4 }}>
                  <span>ILLEGAL EXCESS:</span>
                  <span>+18 UNAPPROVED SEATS</span>
                </div>
              </div>
            </div>

            {/* Card 3: Unverified NRI / Foreign Quota */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                border: '2px solid #FCD34D',
                padding: '24px 26px',
                boxShadow: '0 8px 24px rgba(217, 119, 6, 0.08)',
                transform: `scale(${spring({ frame: frame - 760, fps, config: { damping: 12 } })})`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B45309' }}>
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#B45309' }}>
                    3. Fake NRI & Foreign Quotas
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>5% NRI and 15% FN seats abused</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#FFFBEB', padding: 12, borderRadius: 8, fontSize: 12, fontFamily: 'monospace', color: '#92400E' }}>
                Colleges without AICTE NRI approval admitting candidates under premium NRI fee brackets without MEA/FRRO verification.
              </div>
            </div>

            {/* Card 4: Unverifiable Degrees & Scholarship Siphoning */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                border: '2px solid #CBD5E1',
                padding: '24px 26px',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
                transform: `scale(${spring({ frame: frame - 800, fps, config: { damping: 12 } })})`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                  <Award size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                    4. ₹2,400 Cr Scholarship Risk
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Zero cryptographic proof of sanctioned seat</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, fontSize: 12, fontFamily: 'monospace', color: '#334155' }}>
                Employers and scholarship bodies cannot verify whether a graduate legitimately occupied an AICTE-sanctioned seat.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Narration Caption Pill at the bottom */}
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
        <span style={{ color: '#D97706', fontWeight: 800 }}>NARRATION:</span>
        <span>
          {frame < 300
            ? 'Across India, over 10,000 AICTE-approved institutions enroll more than 30,00,000 students every year.'
            : frame < 660
            ? 'While PGDM institutes submit student lists, thousands of other colleges only submit aggregate statistical counts.'
            : 'This creates four massive loopholes: duplicate enrolments, excess intake, unverified quotas, and ghost students.'}
        </span>
      </div>
    </div>
  );
};
