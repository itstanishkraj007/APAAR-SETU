import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { HandDrawnCircleCallout } from '../components/HandDrawnCircleCallout';
import { 
  Building2, ShieldAlert, BarChart3, SearchCheck, UserCheck, 
  CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Download, 
  Layers, RefreshCw, Lock, Sparkles, Cpu, Award
} from 'lucide-react';

export const Chapter3LivePrototypeWalkthrough: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rel frame within Chapter 3 (2100 to 4500)
  const relFrame = frame - 2100;

  // 4 Scenes inside Chapter 3:
  // Scene 3.1: Frames 0 - 600 (Total 2100 - 2700) -> Role 1 (Institution Registrar)
  // Scene 3.2: Frames 600 - 1260 (Total 2700 - 3360) -> Role 2 (AICTE Auditor & Compliance)
  // Scene 3.3: Frames 1260 - 1800 (Total 3360 - 3900) -> Role 3 (Policy Analytics & Copilot)
  // Scene 3.4: Frames 1800 - 2400 (Total 3900 - 4500) -> Role 4 & Role 5 (Dual-ID & DPDP)

  const activeScene =
    relFrame < 600 ? 1 : relFrame < 1260 ? 2 : relFrame < 1800 ? 3 : 4;

  // Active Role ID according to activeScene
  const activeRoleId =
    activeScene === 1
      ? 'ROLE_INSTITUTION'
      : activeScene === 2
      ? 'ROLE_AICTE_COMPLIANCE'
      : activeScene === 3
      ? 'ROLE_ANALYTICS_POLICY'
      : 'ROLE_SPLIT_4_5';

  // 3D Perspective Browser Tilt Spring
  const browserSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Animated Cursor Coordinates (x, y) moving to click the role switcher
  let cursorX = 400;
  let cursorY = 160;
  let cursorClicked = false;

  if (activeScene === 1) {
    cursorX = interpolate(relFrame, [0, 45], [500, 320], { extrapolateRight: 'clamp' });
    cursorY = interpolate(relFrame, [0, 45], [300, 155], { extrapolateRight: 'clamp' });
    cursorClicked = relFrame > 45 && relFrame < 85;
  } else if (activeScene === 2) {
    const sRel = relFrame - 600;
    cursorX = interpolate(sRel, [0, 40], [320, 520], { extrapolateRight: 'clamp' });
    cursorY = interpolate(sRel, [0, 40], [155, 155], { extrapolateRight: 'clamp' });
    cursorClicked = sRel > 40 && sRel < 80;
  } else if (activeScene === 3) {
    const sRel = relFrame - 1260;
    cursorX = interpolate(sRel, [0, 40], [520, 720], { extrapolateRight: 'clamp' });
    cursorY = interpolate(sRel, [0, 40], [155, 155], { extrapolateRight: 'clamp' });
    cursorClicked = sRel > 40 && sRel < 80;
  } else {
    const sRel = relFrame - 1800;
    cursorX = interpolate(sRel, [0, 40], [720, 920], { extrapolateRight: 'clamp' });
    cursorY = interpolate(sRel, [0, 40], [155, 155], { extrapolateRight: 'clamp' });
    cursorClicked = sRel > 40 && sRel < 80;
  }

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
        alignItems: 'center',
        padding: '16px 40px',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Perspective Browser Container */}
      <div
        style={{
          width: 1720,
          height: 870,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          border: '2px solid #CBD5E1',
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.14)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          transform: `scale(${0.96 + browserSpring * 0.04})`,
        }}
      >
        {/* ============================================================== */}
        {/* BROWSER CHROME: URL BAR & LIVE ROLE SWITCHER BAR               */}
        {/* ============================================================== */}
        <div style={{ backgroundColor: '#071629', color: '#FFFFFF', borderBottom: '2px solid #D97706' }}>
          {/* Top Address & DPI Pill */}
          <div
            style={{
              height: 38,
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              fontSize: 11,
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EF4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span style={{ color: '#94A3B8', marginLeft: 12 }}>
                https://aicte.gov.in/apaar-setu/portal
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ backgroundColor: '#1E293B', color: '#FCD34D', padding: '2px 8px', borderRadius: 12, border: '1px solid #475569' }}>
                ● DPI ADAPTER: SANDBOX_MOCK (10/10 READY)
              </span>
              <span style={{ color: '#94A3B8' }}>GIGW 3.0 VERIFIED</span>
            </div>
          </div>

          {/* AICTE Official Masthead + Active Role Switcher Buttons */}
          <div
            style={{
              height: 64,
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Left AICTE Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={22} color="#0B2240" />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#FCD34D', letterSpacing: 0.8 }}>
                  AICTE · CENTRAL ENROLMENT REPOSITORY
                </div>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#FFFFFF' }}>
                  APAAR-Setu Live Portal
                </div>
              </div>
            </div>

            {/* The 5 Role Switcher Buttons (Clicks visually on role transition) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {[
                { id: 'ROLE_INSTITUTION', label: '🏛️ Role 1: Registrar (MAIT)', num: 1 },
                { id: 'ROLE_AICTE_COMPLIANCE', label: '🛡️ Role 2: AICTE Auditor', num: 2 },
                { id: 'ROLE_ANALYTICS_POLICY', label: '📊 Role 3: Policy & AISHE', num: 3 },
                { id: 'ROLE_EMPLOYER_VERIFIER', label: '🔍 Role 4: Verifier', num: 4 },
                { id: 'ROLE_STUDENT_WALLET', label: '🎓 Role 5: Student Wallet', num: 5 },
              ].map((r) => {
                const isActive =
                  (activeScene === 1 && r.num === 1) ||
                  (activeScene === 2 && r.num === 2) ||
                  (activeScene === 3 && r.num === 3) ||
                  (activeScene === 4 && (r.num === 4 || r.num === 5));

                return (
                  <div
                    key={r.id}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: isActive ? 800 : 600,
                      backgroundColor: isActive ? '#D97706' : '#1E293B',
                      color: isActive ? '#FFFFFF' : '#94A3B8',
                      border: isActive ? '1px solid #FCD34D' : '1px solid #334155',
                      boxShadow: isActive ? '0 2px 8px rgba(217, 119, 6, 0.4)' : 'none',
                    }}
                  >
                    {r.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SCENE 3.1: ROLE 1 — INSTITUTION REGISTRAR DASHBOARD (MAIT)    */}
        {/* ============================================================== */}
        {activeScene === 1 && (
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#F8FAFC' }}>
            {/* Top College Header & 5-Bucket Seat Matrix Bar */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 18, marginBottom: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#D97706', textTransform: 'uppercase' }}>
                    AICTE Permanent Institute ID: 1-451982311
                  </span>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#0B2240' }}>
                    Maharaja Agrasen Institute of Technology (MAIT) · New Delhi
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ backgroundColor: '#0B2240', color: '#FFFFFF', padding: '8px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <RefreshCw size={14} /> Sync Samarth / JoSAA ERP
                  </button>
                  <button style={{ backgroundColor: '#D97706', color: '#FFFFFF', padding: '8px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                    + Single Student Entry
                  </button>
                </div>
              </div>

              {/* 5-Bucket Quota Progress Gauges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
                {[
                  { name: 'Regular Merit', count: '114 / 114', status: '100% Filled', color: '#16A34A', bg: '#DCFCE7' },
                  { name: 'NRI Quota (5%)', count: '6 / 6', status: 'Approved Cap Met', color: '#B45309', bg: '#FEF3C7' },
                  { name: 'TFW (5%)', count: '6 / 6', status: 'Supernumerary', color: '#16A34A', bg: '#DCFCE7' },
                  { name: 'FN / OCI (15%)', count: '12 / 18', status: 'Study in India (SII)', color: '#0284C7', bg: '#E0F2FE' },
                  { name: 'PMSSS Quota', count: '2 / 2', status: 'J&K Central Allotted', color: '#7C3AED', bg: '#F3E8FF' },
                ].map((q, idx) => (
                  <div key={idx} style={{ backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>{q.name}</div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', marginTop: 2, fontFamily: 'monospace' }}>
                      {q.count}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: q.color, marginTop: 2 }}>{q.status}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admitted Student Roster with International Students */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 16, flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>
                Batch Enrolment Roster (Academic Year 2026-27) · B.Tech Computer Science
              </div>

              <table style={{ width: '100%', fontSize: 12, textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F1F5F9', borderBottom: '2px solid #CBD5E1', color: '#475569' }}>
                    <th style={{ padding: '8px 12px' }}>Roll / Student ID</th>
                    <th style={{ padding: '8px 12px' }}>Student Name</th>
                    <th style={{ padding: '8px 12px' }}>12-Digit APAAR ID</th>
                    <th style={{ padding: '8px 12px' }}>Category & Quota</th>
                    <th style={{ padding: '8px 12px' }}>Seat Slot ID</th>
                    <th style={{ padding: '8px 12px' }}>DPI Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontWeight: 700 }}>MAIT-CSE-2026-001</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700 }}>Aarav Sharma</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#1E3A8A' }}>4829-1039-8472</td>
                    <td style={{ padding: '10px 12px' }}>General (Regular Merit)</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>NWRO-1-4519-REG-001</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: 4, fontWeight: 800, fontSize: 10 }}>
                        ✓ VERIFIED_ACTIVE
                      </span>
                    </td>
                  </tr>

                  {/* International OCI Student */}
                  <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F0FDF4' }}>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontWeight: 700 }}>MAIT-CSE-2026-042</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700 }}>Zubair Al-Mansoor</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#0284C7' }}>APAAR-FN-2026-0001</td>
                    <td style={{ padding: '10px 12px' }}>Foreign National (15% Supernumerary)</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>NWRO-1-4519-FN-001</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: 4, fontWeight: 800, fontSize: 10 }}>
                        ✓ SII & e-FRRO CLEAR
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Hand-Drawn Green Circle & Callout Box for Scene 3.1 */}
            <HandDrawnCircleCallout
              x={920}
              y={440}
              width={260}
              height={44}
              startFrame={60}
              color="#16A34A"
              title="Foreign National Verified Without Aadhaar"
              badge="SII & e-FRRO CLEARED"
              lines={[
                'Study in India ID: SII-2026-99281',
                'MHA e-FRRO Visa Permit Validated',
                'Provisional APAAR Token: APAAR-FN-2026-0001',
              ]}
              calloutX={1220}
              calloutY={340}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENE 3.2: ROLE 2 — AICTE COMPLIANCE AUDITOR (DUPLICATE & EXCESS)*/}
        {/* ============================================================== */}
        {activeScene === 2 && (
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFF1F2' }}>
            {/* Top Auditor Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 16 }}>
              {[
                { title: 'National Intake Approved', val: '30,00,000+', color: '#0B2240' },
                { title: 'Duplicate Admissions Locked', val: '14 Active Clashes', color: '#DC2626' },
                { title: 'Excess Enrolments Quarantined', val: '8 Violations', color: '#DC2626' },
                { title: 'Isolation Forest Anomaly Radar', val: '99.4% Precision', color: '#15803D' },
              ].map((st, i) => (
                <div key={i} style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #FCA5A5', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>{st.title}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: st.color, marginTop: 4, fontFamily: 'monospace' }}>
                    {st.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Table 1: Cross-Institution Duplicate Queue */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, border: '2px solid #F87171', padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShieldAlert size={18} color="#DC2626" />
                  <span style={{ fontSize: 14, fontWeight: 900, color: '#991B1B' }}>
                    Active Cross-College Duplicate Lock Queue
                  </span>
                </div>
                <span style={{ backgroundColor: '#DC2626', color: '#FFFFFF', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>
                  REAL-TIME DEDUP ALERT
                </span>
              </div>

              <table style={{ width: '100%', fontSize: 12, textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#FEE2E2', borderBottom: '1.5px solid #FCA5A5', color: '#7F1D1D' }}>
                    <th style={{ padding: '6px 10px' }}>Student APAAR</th>
                    <th style={{ padding: '6px 10px' }}>Candidate Name</th>
                    <th style={{ padding: '6px 10px' }}>Primary Claim (Valid)</th>
                    <th style={{ padding: '6px 10px' }}>Conflicting Secondary Claim</th>
                    <th style={{ padding: '6px 10px' }}>Enforcement Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #FECACA', backgroundColor: '#FFF5F5' }}>
                    <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: 800, color: '#991B1B' }}>
                      4829-1039-8472
                    </td>
                    <td style={{ padding: '8px 10px', fontWeight: 800 }}>Aarav Sharma</td>
                    <td style={{ padding: '8px 10px', color: '#166534' }}>
                      MAIT Delhi (10:14 AM) — <strong>VALID</strong>
                    </td>
                    <td style={{ padding: '8px 10px', color: '#991B1B', fontWeight: 800 }}>
                      Horizon Pune (04:45 PM) — <strong>BLOCKED</strong>
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      <span style={{ backgroundColor: '#DC2626', color: '#FFFFFF', padding: '3px 8px', borderRadius: 4, fontWeight: 800, fontSize: 10 }}>
                        LOCK SEAT 2
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 2: Excess Intake Quarantine (Apex PGDM 68/60) */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, border: '2px solid #F87171', padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 900, color: '#991B1B' }}>
                  Section 10(k) Excess Enrolment Quarantine Desk
                </span>
                <span style={{ backgroundColor: '#FEE2E2', color: '#991B1B', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>
                  APEX PGDM MUMBAI
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FEF2F2', padding: 12, borderRadius: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#7F1D1D' }}>
                    Apex Institute of Management (PGDM)
                  </div>
                  <div style={{ fontSize: 11, color: '#991B1B', marginTop: 2 }}>
                    Approved Intake: 60 Seats · Submitted Enrolment: 68 Students
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#DC2626', fontFamily: 'monospace' }}>
                    +8 EXCESS SEATS QUARANTINED
                  </div>
                  <div style={{ fontSize: 11, color: '#B91C1C', fontWeight: 700 }}>
                    Loss of ₹12,00,000 Illegal Fee Siphoning Prevented
                  </div>
                </div>
              </div>
            </div>

            {/* Hand-Drawn Red Circle & Callout 1 (Duplicate Row) */}
            <HandDrawnCircleCallout
              x={520}
              y={380}
              width={420}
              height={40}
              startFrame={620}
              color="#DC2626"
              title="Cross-College Duplicate Lock"
              badge="STATEWIDE CONFLICT DETECTED"
              lines={[
                'APAAR: 4829-1039-8472 (Aarav Sharma)',
                'Primary Seat: MAIT New Delhi (10:14 AM)',
                'Secondary Seat: Horizon Pune (04:45 PM) -> REJECTED',
              ]}
              calloutX={1100}
              calloutY={280}
            />

            {/* Hand-Drawn Red Circle & Callout 2 (Excess 68/60) */}
            <HandDrawnCircleCallout
              x={920}
              y={560}
              width={340}
              height={48}
              startFrame={840}
              color="#DC2626"
              title="Excess Intake Quarantined"
              badge="SECTION 10(k) ENFORCEMENT"
              lines={[
                'Apex PGDM Submitted: 68 Students',
                'AICTE Approved Cap: 60 Seats',
                '+8 Excess Seats Blocked from Verification',
              ]}
              calloutX={1100}
              calloutY={480}
              mathBreakdown={[
                { label: 'Submitted Intake:', value: '68' },
                { label: 'Approved Quota:', value: '-60' },
                { label: 'ILLEGAL OVERAGE:', value: '+8 SEATS (₹12L Fee Blocked)', isDiscrepancy: true },
              ]}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENE 3.3: ROLE 3 — POLICY & ACCREDITATION ANALYST             */}
        {/* ============================================================== */}
        {activeScene === 3 && (
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#F8FAFC' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#1E3A8A', textTransform: 'uppercase' }}>
                  AICTE Apex Council & Accreditation Bureau
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#0B2240' }}>
                  National Policy Intelligence & AISHE Auto-Compiler
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ backgroundColor: '#15803D', color: '#FFFFFF', padding: '8px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Download size={14} /> 1-Click AISHE DCF-II Export
                </button>
                <button style={{ backgroundColor: '#0B2240', color: '#FFFFFF', padding: '8px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                  NBA / NIRF Data Package
                </button>
              </div>
            </div>

            {/* AI Policy Copilot Bar */}
            <div style={{ backgroundColor: '#EFF6FF', border: '1.5px solid #93C5FD', borderRadius: 10, padding: 14, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Cpu size={22} color="#1E3A8A" />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#1E3A8A' }}>AI Policy Copilot Prompt:</span>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', fontFamily: 'monospace' }}>
                  "Compare PGDM vs B.Tech seat utilization & export AISHE DCF-II"
                </div>
              </div>
              <span style={{ backgroundColor: '#1E3A8A', color: '#FFFFFF', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 800 }}>
                QUERY EXECUTED
              </span>
            </div>

            {/* National Utilization Metrics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, flex: 1 }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>National Intake Utilization</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#0B2240', marginTop: 8, fontFamily: 'monospace' }}>
                  87.4%
                </div>
                <div style={{ fontSize: 11, color: '#16A34A', marginTop: 4, fontWeight: 700 }}>
                  ↑ 4.2% verified increase over self-reported data
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>NEP 2020 Multiple-Entry Exits</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#D97706', marginTop: 8, fontFamily: 'monospace' }}>
                  14,892
                </div>
                <div style={{ fontSize: 11, color: '#92400E', marginTop: 4 }}>
                  Academic Bank of Credits (ABC) synchronized
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>Accreditation Data Reliability</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#15803D', marginTop: 8, fontFamily: 'monospace' }}>
                  100%
                </div>
                <div style={{ fontSize: 11, color: '#15803D', marginTop: 4, fontWeight: 700 }}>
                  Zero self-reporting bias · Cryptographically anchored
                </div>
              </div>
            </div>

            {/* Callout Box for Scene 3.3 */}
            <HandDrawnCircleCallout
              x={1300}
              y={240}
              width={220}
              height={40}
              startFrame={1300}
              color="#15803D"
              title="Zero Statistical Manipulation"
              badge="STATISTICAL RIGOR GUARANTEED"
              lines={[
                '1-Click Export to AISHE & NBA',
                '100% Derived from Verified 12-Digit APAAR Rows',
                'Eliminates Months of Manual College Reconciliation',
              ]}
              calloutX={1000}
              calloutY={320}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENE 3.4: ROLE 4 & ROLE 5 — DUAL-ID DEGREE & DPDP CONSENT     */}
        {/* ============================================================== */}
        {activeScene === 4 && (
          <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, height: '100%', backgroundColor: '#F8FAFC' }}>
            {/* Left: Role 5 Student DPDP Wallet */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, border: '2px solid #D97706', padding: 20, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#B45309' }}>
                  🎓 ROLE 5: STUDENT DPDP WALLET
                </span>
                <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>
                  DPDP ACT 2023 COMPLIANT
                </span>
              </div>

              {/* Dual-ID Degree Certificate Card */}
              <div style={{ backgroundColor: '#FFFBEB', border: '1.5px solid #FCD34D', borderRadius: 10, padding: 16, marginBottom: 14 }}>
                <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 900, color: '#92400E' }}>
                  ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
                </div>
                <div style={{ textAlign: 'center', fontSize: 11, color: '#78350F' }}>
                  Verifiable Dual-Identity Degree Certificate
                </div>

                <div style={{ marginTop: 14, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 6, border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: '#64748B' }}>12-Digit National APAAR ID:</span>
                    <span style={{ fontSize: 12, fontWeight: 800, fontFamily: 'monospace', color: '#16A34A' }}>
                      4829-1039-8472
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: '#64748B' }}>Institutional Roll ID:</span>
                    <span style={{ fontSize: 12, fontWeight: 800, fontFamily: 'monospace', color: '#16A34A' }}>
                      MAIT-CSE-2026-042
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: '#64748B' }}>Sanctioned Seat Slot:</span>
                    <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'monospace', color: '#0B2240' }}>
                      NWRO-1-4519-REG-042
                    </span>
                  </div>
                </div>
              </div>

              {/* DPDP Consent Request Desk */}
              <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 8, padding: 12, marginTop: 'auto' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#166534' }}>
                  Background Verification Consent Request
                </div>
                <div style={{ fontSize: 11, color: '#15803D', marginTop: 2 }}>
                  TCS Global Hiring requests 24h credential verification access.
                </div>
                <button style={{ marginTop: 8, width: '100%', backgroundColor: '#15803D', color: '#FFFFFF', padding: '8px', borderRadius: 6, fontSize: 11, fontWeight: 800 }}>
                  ✓ [Approve 24h DPDP Student Consent]
                </button>
              </div>
            </div>

            {/* Right: Role 4 Employer Public Verifier */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, border: '2px solid #1E3A8A', padding: 20, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#1E3A8A' }}>
                  🔍 ROLE 4: EMPLOYER VERIFIER PORTAL
                </span>
                <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>
                  W3C QR SCANNER
                </span>
              </div>

              {/* 5-Point Trust Scorecard */}
              <div style={{ backgroundColor: '#F8FAFC', borderRadius: 8, border: '1px solid #CBD5E1', padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#0F172A', marginBottom: 8 }}>
                  5-Point Cryptographic Trust Scorecard
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A', fontWeight: 700 }}>
                    <span>1. APAAR Registry Active Match:</span>
                    <span>✓ PASSED</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A', fontWeight: 700 }}>
                    <span>2. AICTE Institutional Approval:</span>
                    <span>✓ PASSED</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A', fontWeight: 900, backgroundColor: '#DCFCE7', padding: '4px 6px', borderRadius: 4 }}>
                    <span>3. Sanctioned Seat Slot Proof:</span>
                    <span>✓ CONFIRMED (#042 of 120)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A', fontWeight: 700 }}>
                    <span>4. Ed25519 Root Hash Match:</span>
                    <span>✓ VERIFIED</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A', fontWeight: 700 }}>
                    <span>5. DPDP Student Consent Token:</span>
                    <span>✓ ACTIVE (24h)</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', backgroundColor: '#0B2240', color: '#FFFFFF', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#FCD34D' }}>
                  VERIFIED AUTHENTIC AICTE GRADUATE
                </div>
                <div style={{ fontSize: 10, color: '#CBD5E1', marginTop: 2 }}>
                  Zero tampering · Legitimately occupied approved seat
                </div>
              </div>
            </div>

            {/* Hand-Drawn Circle on Dual-IDs */}
            <HandDrawnCircleCallout
              x={220}
              y={380}
              width={340}
              height={50}
              startFrame={1840}
              color="#16A34A"
              title="Dual-ID Printing Mandate (Req #10)"
              badge="TAMPER-PROOF DUAL IDENTITY"
              lines={[
                'National APAAR ID: 4829-1039-8472',
                'Institutional Roll: MAIT-CSE-2026-042',
                'Seat Slot: NWRO-1-4519-REG-042',
              ]}
              calloutX={600}
              calloutY={320}
            />
          </div>
        )}

        {/* Animated Mouse Cursor Floating & Clicking */}
        <div
          style={{
            position: 'absolute',
            left: cursorX,
            top: cursorY,
            pointerEvents: 'none',
            zIndex: 9999,
            transform: cursorClicked ? 'scale(0.85)' : 'scale(1)',
            transition: 'transform 0.1s ease',
          }}
        >
          {/* SVG Mouse Pointer */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill="#0B2240"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          {cursorClicked && (
            <div
              style={{
                position: 'absolute',
                top: -8,
                left: -8,
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '2px solid #D97706',
                animation: 'ping 1s infinite',
              }}
            />
          )}
        </div>
      </div>

      {/* Persistent Bottom Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '8px 24px',
          borderRadius: 30,
          fontSize: 14,
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          maxWidth: 1200,
        }}
      >
        <span style={{ color: '#D97706', fontWeight: 800 }}>PROTOTYPE WALKTHROUGH:</span>
        <span>
          {activeScene === 1
            ? 'Role 1 (Registrar): 5-Bucket Quota allocation and automatic Study in India foreign student onboarding.'
            : activeScene === 2
            ? 'Role 2 (AICTE Auditor): Instant cross-college duplicate locking and Section 10(k) excess intake quarantine.'
            : activeScene === 3
            ? 'Role 3 (Policy Analyst): AI Policy Copilot and 1-click automated exports for AISHE DCF-II and NBA returns.'
            : 'Role 4 & 5: Verifiable Dual-ID degree certificate printing with self-sovereign DPDP student consent.'}
        </span>
      </div>
    </div>
  );
};
