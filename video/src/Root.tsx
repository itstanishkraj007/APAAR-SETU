import React from 'react';
import { Composition, Sequence, Audio } from 'remotion';
import { TopChapterProgressBar } from './components/TopChapterProgressBar';
import { Chapter1Problem } from './chapters/Chapter1Problem';
import { Chapter2SolutionUSPs } from './chapters/Chapter2SolutionUSPs';
import { Chapter3LivePrototypeWalkthrough } from './chapters/Chapter3LivePrototypeWalkthrough';
import { Chapter4Impact } from './chapters/Chapter4Impact';
import { SFX_URIS } from './sfx/soundEngine';

/**
 * Main Full 3-Minute (5400 frames @ 30fps) Explainer Composition Component
 */
export const AicteExplainerVideo: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#FAF9F5',
        overflow: 'hidden',
        // Dotted engineering grid background (24px spacing)
        backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.07) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* 1. Persistent Top 4-Chapter Progress Header (Always Visible at zIndex 999) */}
      <TopChapterProgressBar />

      {/* 2. Audio SFX Tracks at Key Synchronized Frames */}
      {/* Odometer ticks in Chapter 1 */}
      <Sequence from={20} durationInFrames={10}>
        <Audio src={SFX_URIS.odometer_tick} volume={0.4} />
      </Sequence>
      <Sequence from={35} durationInFrames={10}>
        <Audio src={SFX_URIS.odometer_tick} volume={0.4} />
      </Sequence>

      {/* Paper rustle in Scene 1.2 */}
      <Sequence from={350} durationInFrames={15}>
        <Audio src={SFX_URIS.paper_rustle} volume={0.6} />
      </Sequence>
      <Sequence from={420} durationInFrames={15}>
        <Audio src={SFX_URIS.paper_rustle} volume={0.6} />
      </Sequence>

      {/* Warning breach chime in Scene 1.3 */}
      <Sequence from={720} durationInFrames={20}>
        <Audio src={SFX_URIS.alert_breach} volume={0.7} />
      </Sequence>

      {/* Transition Whoosh to Chapter 2 */}
      <Sequence from={1050} durationInFrames={15}>
        <Audio src={SFX_URIS.ui_whoosh} volume={0.6} />
      </Sequence>

      {/* Transition Whoosh to Chapter 3 (Live Prototype) */}
      <Sequence from={2100} durationInFrames={15}>
        <Audio src={SFX_URIS.ui_whoosh} volume={0.7} />
      </Sequence>

      {/* Verified chime in Scene 3.1 (Foreign National) */}
      <Sequence from={2160} durationInFrames={25}>
        <Audio src={SFX_URIS.verified_chime} volume={0.75} />
      </Sequence>
      <Sequence from={2160} durationInFrames={20}>
        <Audio src={SFX_URIS.marker_circle} volume={0.5} />
      </Sequence>

      {/* Role 2 Transition & Duplicate Breach in Scene 3.2 */}
      <Sequence from={2700} durationInFrames={15}>
        <Audio src={SFX_URIS.ui_whoosh} volume={0.65} />
      </Sequence>
      <Sequence from={2720} durationInFrames={25}>
        <Audio src={SFX_URIS.alert_breach} volume={0.8} />
      </Sequence>
      <Sequence from={2720} durationInFrames={20}>
        <Audio src={SFX_URIS.marker_circle} volume={0.5} />
      </Sequence>
      <Sequence from={2940} durationInFrames={25}>
        <Audio src={SFX_URIS.alert_breach} volume={0.8} />
      </Sequence>

      {/* Role 3 Transition & Policy Copilot */}
      <Sequence from={3360} durationInFrames={15}>
        <Audio src={SFX_URIS.ui_whoosh} volume={0.65} />
      </Sequence>

      {/* Role 4/5 Transition & Verified Chime */}
      <Sequence from={3900} durationInFrames={15}>
        <Audio src={SFX_URIS.ui_whoosh} volume={0.7} />
      </Sequence>
      <Sequence from={3940} durationInFrames={25}>
        <Audio src={SFX_URIS.verified_chime} volume={0.85} />
      </Sequence>
      <Sequence from={3940} durationInFrames={20}>
        <Audio src={SFX_URIS.marker_circle} volume={0.5} />
      </Sequence>

      {/* Transition Whoosh to Chapter 4 */}
      <Sequence from={4500} durationInFrames={15}>
        <Audio src={SFX_URIS.ui_whoosh} volume={0.7} />
      </Sequence>
      <Sequence from={5100} durationInFrames={30}>
        <Audio src={SFX_URIS.verified_chime} volume={0.8} />
      </Sequence>

      {/* 3. The 4 Consecutive Chapters */}
      {/* Chapter 1: The Problem (0:00 - 0:35 | frames 0 - 1050) */}
      <Sequence from={0} durationInFrames={1050}>
        <Chapter1Problem />
      </Sequence>

      {/* Chapter 2: The Solution & USPs (0:35 - 1:10 | frames 1050 - 2100) */}
      <Sequence from={1050} durationInFrames={1050}>
        <Chapter2SolutionUSPs />
      </Sequence>

      {/* Chapter 3: Live Prototype Walkthrough (1:10 - 2:30 | frames 2100 - 4500) */}
      <Sequence from={2100} durationInFrames={2400}>
        <Chapter3LivePrototypeWalkthrough />
      </Sequence>

      {/* Chapter 4: Measurable Impact & Closing (2:30 - 3:00 | frames 4500 - 5400) */}
      <Sequence from={4500} durationInFrames={900}>
        <Chapter4Impact />
      </Sequence>
    </div>
  );
};

export const Root: React.FC = () => {
  return (
    <Composition
      id="AicteExplainerVideo"
      component={AicteExplainerVideo}
      durationInFrames={5400}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
