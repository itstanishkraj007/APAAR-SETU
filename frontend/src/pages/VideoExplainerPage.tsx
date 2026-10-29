import React, { useRef, useState } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { AicteExplainerVideo } from '../video/Root';
import { 
  Play, Pause, RotateCcw, FastForward, CheckCircle2, 
  ShieldCheck, FileText, Sparkles, ArrowRight, Download, Terminal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

export const VideoExplainerPage: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);
  const navigate = useNavigate();
  const { loginAs } = useAppStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'STORYBOARD' | 'CODE' | 'CLI'>('STORYBOARD');

  const chapters = [
    { title: '01. The Problem', frame: 0, time: '0:00 – 0:35', desc: '10,420 Colleges, 30,00,000 Students & Paper Folders' },
    { title: '02. Solution & USPs', frame: 1050, time: '0:35 – 1:10', desc: '12-Digit APAAR, 5-Bucket Quota & Foreign-APAAR Bridge' },
    { title: '03. Live Prototype (5 Roles)', frame: 2100, time: '1:10 – 2:30', desc: 'Registrar, Auditor, Policy, Verifier & Student Wallet' },
    { title: '04. Impact & Closing', frame: 4500, time: '2:30 – 3:00', desc: '99.8% Faster, 100% Deterministic & W3C Cryptographic Proof' },
  ];

  const seekToChapter = (targetFrame: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(targetFrame);
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    if (!playerRef.current) return;
    if (playerRef.current.isPlaying()) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2240] via-[#0E2F59] to-[#071629] text-white rounded-xl p-6 sm:p-8 shadow-xl border-b-4 border-amber-500">
        <div className="max-w-5xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-amber-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Remotion Motion Graphics & Interactive Prototype Explainer (SIH PS 26063)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AICTE Unified APAAR Registry · 3-Minute Motion Graphics Explainer
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            High-craft 2.5D vector motion graphics with kinetic typography, exact full-zero rolling odometers, persistent 4-chapter track bar, procedural WAV audio cues, and an interactive 5-role prototype screen walkthrough.
          </p>
        </div>
      </div>

      {/* 2. Interactive Chapter Seek Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {chapters.map((ch, idx) => (
          <button
            key={idx}
            onClick={() => seekToChapter(ch.frame)}
            className="bg-white border-2 border-slate-200 hover:border-amber-500 rounded-lg p-3 text-left transition shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 group-hover:text-amber-700">
                  {ch.title}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono font-bold">
                  {ch.time}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                {ch.desc}
              </p>
            </div>
            <div className="mt-2 text-[10px] text-amber-600 font-bold flex items-center space-x-1 group-hover:underline">
              <span>Jump to Scene</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </div>

      {/* 3. The Live Remotion Player Container */}
      <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl border-4 border-slate-800">
        <div className="aspect-video w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-[#FAF9F5] border border-slate-700">
          <Player
            ref={playerRef}
            component={AicteExplainerVideo}
            durationInFrames={5400}
            compositionWidth={1920}
            compositionHeight={1080}
            fps={30}
            style={{
              width: '100%',
              height: '100%',
            }}
            controls
            autoPlay={false}
            loop={false}
          />
        </div>

        {/* Player Quick Bar */}
        <div className="max-w-6xl mx-auto mt-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleTogglePlay}
              className="bg-amber-500 hover:bg-amber-400 text-[#0B2240] px-4 py-2 rounded-lg font-bold flex items-center space-x-1.5 transition"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play Explainer'}</span>
            </button>

            <button
              onClick={handleRestart}
              className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg font-semibold flex items-center space-x-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart (0:00)</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-mono text-slate-300">5400 Frames · 30 FPS · 1080p Full HD</span>
            <span className="hidden md:inline bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
              Procedural WebAudio SFX Enabled
            </span>
          </div>
        </div>
      </div>

      {/* 4. Storyboard & Production Reference */}
      <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-900" />
            <h2 className="text-base font-bold text-slate-900">
              Voiceover Narration & Animation Script
            </h2>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('STORYBOARD')}
              className={`px-3 py-1 text-xs rounded font-semibold ${activeTab === 'STORYBOARD' ? 'bg-[#0B2240] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Director's Storyboard
            </button>
            <button
              onClick={() => setActiveTab('CLI')}
              className={`px-3 py-1 text-xs rounded font-semibold ${activeTab === 'CLI' ? 'bg-[#0B2240] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              CLI Render Commands
            </button>
          </div>
        </div>

        {activeTab === 'STORYBOARD' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-amber-700 uppercase">Chapter 1: The Problem (0:00 – 0:35)</span>
              <p className="text-slate-700 leading-relaxed font-serif text-[13px]">
                "Across India, over 10,000 AICTE-approved technical institutions enroll more than 30,00,000 students every year. While PGDM institutes submit student lists, thousands of other colleges only submit aggregate statistical counts—hiding fragmented spreadsheets, manual paper files, and unverifiable records. This creates four massive loopholes: duplicate enrolments, excess intake, unverified quotas, and ghost students."
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Chapter 2: Solution & 4 USPs (0:35 – 1:10)</span>
              <p className="text-slate-700 leading-relaxed font-serif text-[13px]">
                "We present the AICTE Unified APAAR Student Registry—binding every admission to a 12-digit National Academic Identity across a 6-stage real-time pipeline. Featuring our 5-Bucket Statutory Seat Tokenizer, Provisional Foreign-APAAR Bridge, Sub-second Dual-Layer Deduplication, and a 10-Gateway Government DPI Bus."
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase">Chapter 3: Live Prototype 5 Roles (1:10 – 2:30)</span>
              <p className="text-slate-700 leading-relaxed font-serif text-[13px]">
                "Watch the live system in action across all 5 stakeholder roles: Institution Registrar allocating 5-bucket quotas; AICTE Auditor locking cross-college duplicates and quarantining excess seats with explainable SHAP radar; Policy Analyst running AI text-to-SQL queries; and Dual-ID degree verification with self-sovereign DPDP student consent."
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-purple-700 uppercase">Chapter 4: Measurable Impact (2:30 – 3:00)</span>
              <p className="text-slate-700 leading-relaxed font-serif text-[13px]">
                "Turnaround time slashed from weeks to under 2 seconds. 100% of excess admissions deterministically blocked. Months of Excel reconciliation automated into 1-click AISHE returns. One Nation. One Academic Identity. Zero Unverified Seats."
              </p>
            </div>
          </div>
        )}

        {activeTab === 'CLI' && (
          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs space-y-3">
            <div className="text-amber-400 font-bold flex items-center space-x-1.5">
              <Terminal className="w-4 h-4" />
              <span>Remotion Standalone Preview & MP4 Headless Render:</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto p-2 bg-black/40 rounded">
{`# 1. Open Remotion Interactive Studio on http://localhost:3000
cd video
npm run preview

# 2. Render 1080p 60fps / 30fps Full HD MP4 Video
cd video
npm run build
# Output saved to: video/out/video.mp4`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
