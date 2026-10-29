import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { 
  ShieldCheck, Cpu, Database, Award, ArrowRight, 
  CheckCircle2, Globe2, Layers, RefreshCcw, Lock, Key, Terminal
} from 'lucide-react';

export const Chapter2SolutionUSPs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rel frame within Chapter 2 (1050 to 2100)
  const relFrame = frame - 1050;

  // Scene 2.1: 1050 - 1440 (relFrame: 0 - 390) -> APAAR Identity & 6-Stage Pipeline
  // Scene 2.2: 1440 - 2100 (relFrame: 390 - 1050) -> 4 Core Technical USPs

  const isScene21 = relFrame < 390;

  // 6 Pipeline Stages
  const pipelineStages = [
    { num: 1, title: 'Institution Upload', desc: 'Single / CSV / ERP' },
    { num: 2, title: 'APAAR Validation', desc: 'Verhoeff Checksum' },
    { num: 3, title: 'Seat-Slot Guard', desc: '5-Bucket Tokenizer' },
    { num: 4, title: 'AICTE Repository', desc: 'SHA-256 Ledger' },
    { num: 5, title: 'AI Anomaly Radar', desc: 'Isolation Forest' },
    { num: 6, title: 'Dual-ID Verifier', desc: 'W3C Credential' },
  ];

  // Active USP in Scene 2.2 (changes every ~160 frames / 5 seconds)
  const uspIndex = Math.min(3, Math.max(0, Math.floor((relFrame - 390) / 165)));

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
      {/* SCENE 2.1: 6-Stage National APAAR Identity Pipeline (1050-1440)*/}
      {/* ============================================================== */}
      {isScene21 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
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
              The Architecture of Truth
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
              AICTE Unified APAAR Registry & Verification Pipeline
            </h1>
            <p style={{ fontSize: 18, color: '#475569', marginTop: 8 }}>
              Binding every admitted student to a tamper-proof 12-digit Academic Identity.
            </p>
          </div>

          {/* Central Verified APAAR Card */}
          <div
            style={{
              width: 540,
              backgroundColor: '#0B2240',
              borderRadius: 18,
              border: '2px solid #D97706',
              boxShadow: '0 20px 48px rgba(11, 34, 64, 0.25)',
              padding: '24px 28px',
              color: '#FFFFFF',
              marginBottom: 44,
              transform: `scale(${spring({ frame: relFrame, fps, config: { damping: 12 } })})`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Holographic Watermark */}
            <div
              style={{
                position: 'absolute',
                right: -20,
                bottom: -20,
                width: 160,
                height: 160,
                borderRadius: '50%',
                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                filter: 'blur(10px)',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShieldCheck size={24} color="#D97706" />
                <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', color: '#FCD34D' }}>
                  Government of India · APAAR Card
                </span>
              </div>
              <span style={{ fontSize: 10, backgroundColor: '#15803D', color: '#DCFCE7', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                VERHOEFF VALIDATED
              </span>
            </div>

            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>National Academic Identifier:</div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    letterSpacing: 3,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#FFFFFF',
                    marginTop: 4,
                  }}
                >
                  4829-1039-8472
                </div>
                <div style={{ fontSize: 13, color: '#CBD5E1', marginTop: 6, fontWeight: 600 }}>
                  Aarav Sharma · B.Tech CSE (MAIT New Delhi)
                </div>
              </div>

              {/* QR Mockup */}
              <div
                style={{
                  width: 68,
                  height: 68,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '100%', height: '100%', backgroundColor: '#0B2240', borderRadius: 4 }} />
              </div>
            </div>
          </div>

          {/* 6 Sequential Pipeline Stages */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {pipelineStages.map((st, idx) => {
              const stageDelay = 40 + idx * 30;
              const isVisible = relFrame >= stageDelay;
              const stageSpring = spring({ frame: relFrame - stageDelay, fps, config: { damping: 14 } });

              return (
                <React.Fragment key={st.num}>
                  <div
                    style={{
                      width: 170,
                      backgroundColor: isVisible ? '#FFFFFF' : '#F8FAFC',
                      borderRadius: 12,
                      border: isVisible ? '1.5px solid #1E3A8A' : '1px dashed #CBD5E1',
                      padding: '14px 12px',
                      textAlign: 'center',
                      boxShadow: isVisible ? '0 8px 20px rgba(30, 58, 138, 0.08)' : 'none',
                      opacity: isVisible ? 1 : 0.4,
                      transform: isVisible ? `translateY(${(1 - stageSpring) * 20}px)` : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: '#1E3A8A',
                        color: '#FFFFFF',
                        fontSize: 11,
                        fontWeight: 800,
                        margin: '0 auto 8px auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {st.num}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                      {st.title}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                      {st.desc}
                    </div>
                  </div>

                  {idx < pipelineStages.length - 1 && (
                    <ArrowRight size={20} color={isVisible ? '#1E3A8A' : '#CBD5E1'} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 2.2: The 4 Core Technical USPs (1440 - 2100)             */}
      {/* ============================================================== */}
      {!isScene21 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: 20,
                backgroundColor: '#FEF3C7',
                border: '1.5px solid #D97706',
                color: '#92400E',
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              TECHNICAL INNOVATION ENGINE
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
              Our 4 Core Differentiators & Regulatory Moats
            </h2>
          </div>

          {/* 4 USP Navigation Pills (Highlights Active USP) */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 30 }}>
            {[
              { id: 0, label: 'USP 1: 5-Bucket Seat Tokenizer' },
              { id: 1, label: 'USP 2: Provisional Foreign-APAAR' },
              { id: 2, label: 'USP 3: Dual-Layer Deduplication' },
              { id: 3, label: 'USP 4: Plug-and-Play DPI Bus' },
            ].map((tab) => (
              <div
                key={tab.id}
                style={{
                  padding: '8px 18px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: tab.id === uspIndex ? 800 : 600,
                  backgroundColor: tab.id === uspIndex ? '#0B2240' : '#FFFFFF',
                  color: tab.id === uspIndex ? '#FCD34D' : '#64748B',
                  border: tab.id === uspIndex ? '2px solid #D97706' : '1px solid #CBD5E1',
                  boxShadow: tab.id === uspIndex ? '0 4px 12px rgba(11, 34, 64, 0.15)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {/* Active USP Detailed Blueprint Card */}
          <div
            style={{
              width: 1040,
              minHeight: 360,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              border: '2px solid #1E3A8A',
              boxShadow: '0 16px 40px rgba(15, 23, 42, 0.1)',
              padding: '32px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* USP 1: 5-Bucket Statutory Seat Tokenizer */}
            {uspIndex === 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 900, color: '#0B2240', margin: 0 }}>
                      USP 1: 5-Bucket Statutory Seat-Slot Tokenization
                    </h3>
                    <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
                      Separates Regular Sanctioned Intake from Supernumerary Quotas with atomic seat tokens.
                    </p>
                  </div>
                  <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 6 }}>
                    STRICT INTAKE GUARD
                  </span>
                </div>

                {/* 5-Bucket Visual Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 24 }}>
                  {[
                    { name: '1. Regular Merit', cap: '114 / 114 (100%)', color: '#1E3A8A', bg: '#EFF6FF', desc: 'SC/ST/OBC/EWS/Open' },
                    { name: '2. NRI Quota (5%)', cap: '6 / 6 (Max 5%)', color: '#B45309', bg: '#FEF3C7', desc: 'Within Sanctioned Intake' },
                    { name: '3. TFW (5%)', cap: '6 / 6 (Over Intake)', color: '#15803D', bg: '#DCFCE7', desc: 'Tuition Fee Waiver' },
                    { name: '4. FN / OCI (15%)', cap: '12 / 18 (Pending)', color: '#0891B2', bg: '#ECFEFF', desc: 'Supernumerary 15%' },
                    { name: '5. PMSSS Seats', cap: '2 / 2 (Allotted)', color: '#7C3AED', bg: '#F5F3FF', desc: 'J&K Central Scholarship' },
                  ].map((b, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: b.bg,
                        border: `1.5px solid ${b.color}`,
                        borderRadius: 12,
                        padding: 14,
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 800, color: b.color }}>{b.name}</div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: '#0F172A', marginTop: 6, fontFamily: 'monospace' }}>
                        {b.cap}
                      </div>
                      <div style={{ fontSize: 10, color: '#64748B', marginTop: 4 }}>{b.desc}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 20, backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, fontSize: 12, color: '#334155', fontFamily: 'monospace' }}>
                  Slot IDs Generated: <code>NWRO-1-4519-2026-REG-001</code> to <code>NWRO-1-4519-2026-TFW-006</code>
                </div>
              </div>
            )}

            {/* USP 2: Provisional Foreign-APAAR */}
            {uspIndex === 1 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 900, color: '#0B2240', margin: 0 }}>
                      USP 2: The Provisional Foreign-APAAR Bridge
                    </h3>
                    <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
                      Solves the Aadhaar dead-end for International & OCI students using Study in India (SII) & e-FRRO.
                    </p>
                  </div>
                  <span style={{ backgroundColor: '#CFFAFE', color: '#0E7490', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 6 }}>
                    DPI PASSPORT MRZ
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 20 }}>
                  <div style={{ flex: 1, backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#0891B2' }}>Foreign National Verification:</div>
                    <div style={{ fontSize: 13, marginTop: 8, color: '#1E293B', lineHeight: 1.6 }}>
                      • <strong>SII ID:</strong> SII-2026-99281<br />
                      • <strong>Passport MRZ:</strong> Verified via MEA e-Sanad<br />
                      • <strong>Student Visa:</strong> MHA e-FRRO Permit Valid
                    </div>
                  </div>

                  <ArrowRight size={28} color="#0891B2" />

                  <div style={{ flex: 1, backgroundColor: '#ECFEFF', border: '2px solid #0891B2', borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#0E7490' }}>Minted Provisional APAAR:</div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: '#0891B2', fontFamily: 'monospace', marginTop: 6 }}>
                      APAAR-FN-2026-0001
                    </div>
                    <div style={{ fontSize: 11, color: '#155E75', marginTop: 4 }}>
                      Valid for 1-year academic term with automatic residency conversion.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* USP 3: Dual-Layer National Deduplication */}
            {uspIndex === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 900, color: '#0B2240', margin: 0 }}>
                      USP 3: Dual-Layer National Deduplication Engine
                    </h3>
                    <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
                      Combines PostgreSQL Deterministic Unique Locks with Splink Phonetic Fuzzy Linkage.
                    </p>
                  </div>
                  <span style={{ backgroundColor: '#FEE2E2', color: '#DC2626', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 6 }}>
                    SUB-SECOND DEDUP
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 }}>
                  <div style={{ backgroundColor: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#166534' }}>Layer 1: Deterministic APAAR Index</div>
                    <div style={{ fontSize: 12, color: '#14532D', marginTop: 6 }}>
                      Checks exact 12-digit collision across 10,000+ AICTE colleges in <strong>0.04 seconds</strong>.
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#FEF2F2', border: '1.5px solid #FCA5A5', borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#991B1B' }}>Layer 2: AI Phonetic Fingerprint (Splink)</div>
                    <div style={{ fontSize: 12, color: '#7F1D1D', marginTop: 6 }}>
                      Detects name variations: <code>"Aarav Sharma"</code> vs <code>"Arav Sharmma"</code> (Match Confidence: <strong>96.4%</strong>).
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* USP 4: Plug-and-Play DPI Adapter Bus */}
            {uspIndex === 3 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 900, color: '#0B2240', margin: 0 }}>
                      USP 4: Plug-and-Play Government DPI Adapter Bus
                    </h3>
                    <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
                      10 external DPI gateways with a 1-click toggle between Sandbox Mock and Production Gov APIs.
                    </p>
                  </div>
                  <span style={{ backgroundColor: '#FEF3C7', color: '#B45309', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 6 }}>
                    10 DPI GATEWAYS READY
                  </span>
                </div>

                {/* 10 DPI Badges Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginTop: 16 }}>
                  {[
                    '1. DigiLocker NAD',
                    '2. UDISE+ Registry',
                    '3. Study in India (SII)',
                    '4. MHA e-FRRO Visa',
                    '5. MEA OCI e-Sanad',
                    '6. Samarth / JoSAA',
                    '7. AICTE EoA ERP',
                    '8. UGC AISHE',
                    '9. NSP / PMSSS',
                    '10. NBA / NIRF CCA',
                  ].map((gw, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: 8,
                        padding: '10px 8px',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#1E293B',
                        textAlign: 'center',
                      }}
                    >
                      {gw}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Card Footer */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#64748B' }}>
              <span>Integrated with AICTE Central Database Engine</span>
              <span style={{ fontWeight: 700, color: '#0B2240' }}>Next: Live Prototype Screen Walkthrough &rarr;</span>
            </div>
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
        <span style={{ color: '#D97706', fontWeight: 800 }}>NARRATION:</span>
        <span>
          {isScene21
            ? 'We present the AICTE Unified APAAR Student Registry—binding every admission to a 12-digit National Academic Identity across a 6-stage pipeline.'
            : uspIndex === 0
            ? 'USP 1: The 5-Bucket Statutory Seat Tokenizer prevents over-admissions by capping merit and NRI quotas within approved intake.'
            : uspIndex === 1
            ? 'USP 2: The Provisional Foreign-APAAR Bridge verifies international students via Study in India and e-FRRO without Aadhaar.'
            : uspIndex === 2
            ? 'USP 3: Dual-layer deduplication catches duplicate enrolments even when student name spelling is altered.'
            : 'USP 4: Plug-and-Play DPI Adapter Bus connects 10 government registries with instant Sandbox to Production switching.'}
        </span>
      </div>
    </div>
  );
};
