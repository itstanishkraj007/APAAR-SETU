/**
 * Procedural In-Memory WAV Sound Engine for Remotion Explainer Video
 * Generates pristine, self-contained 44.1kHz 16-bit Mono WAV audio as data URIs.
 * Guarantees zero missing audio files, 100% offline rendering, and zero network dependency.
 */

function generateWavDataUri(sampleRate: number, samples: Float32Array): string {
  const numSamples = samples.length;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  // Helper to write string to DataView
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  /* RIFF identifier */
  writeString(0, 'RIFF');
  /* file length */
  view.setUint32(4, 36 + numSamples * 2, true);
  /* RIFF type */
  writeString(8, 'WAVE');
  /* format chunk identifier */
  writeString(12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count (1 = mono) */
  view.setUint16(22, 1, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * 2, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(36, 'data');
  /* data chunk length */
  view.setUint32(40, numSamples * 2, true);

  // Write 16-bit PCM samples
  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }

  // Convert buffer to binary string and base64
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:audio/wav;base64,${btoa(binary)}`;
}

const SAMPLE_RATE = 44100;

/**
 * 1. sfx_paper_rustle: Bandpass filtered noise burst (~140ms)
 */
function createPaperRustleWav(): string {
  const duration = 0.14;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  let prev = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / numSamples;
    const env = Math.sin(t * Math.PI) * Math.exp(-t * 3);
    const whiteNoise = Math.random() * 2 - 1;
    // Simple 1-pole low/bandpass filter
    prev = prev * 0.7 + whiteNoise * 0.3;
    samples[i] = prev * env * 0.6;
  }
  return generateWavDataUri(SAMPLE_RATE, samples);
}

/**
 * 2. sfx_odometer_tick: Short mechanical click (1800Hz sine impulse, 15ms decay)
 */
function createOdometerTickWav(): string {
  const duration = 0.025;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 220);
    const freq = 1800 - t * 4000;
    samples[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.4;
  }
  return generateWavDataUri(SAMPLE_RATE, samples);
}

/**
 * 3. sfx_marker_circle: Friction swoosh (400Hz -> 900Hz swept sine with noise, 250ms)
 */
function createMarkerCircleWav(): string {
  const duration = 0.28;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    const env = Math.sin(progress * Math.PI) * 0.6;
    const freq = 380 + progress * 550;
    const tone = Math.sin(2 * Math.PI * freq * t);
    const noise = (Math.random() * 2 - 1) * 0.25;
    samples[i] = (tone * 0.75 + noise) * env * 0.5;
  }
  return generateWavDataUri(SAMPLE_RATE, samples);
}

/**
 * 4. sfx_alert_breach: Double low-mid warning chime (440Hz + 330Hz, 320ms)
 */
function createAlertBreachWav(): string {
  const duration = 0.34;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 9);
    // Triangle-ish waves
    const w1 = Math.asin(Math.sin(2 * Math.PI * 440 * t)) * (2 / Math.PI);
    const w2 = Math.asin(Math.sin(2 * Math.PI * 330 * t)) * (2 / Math.PI);
    samples[i] = (w1 * 0.5 + w2 * 0.5) * env * 0.7;
  }
  return generateWavDataUri(SAMPLE_RATE, samples);
}

/**
 * 5. sfx_verified_chime: Ascending major-third bell (D5 587.33Hz -> A5 880Hz, 400ms)
 */
function createVerifiedChimeWav(): string {
  const duration = 0.45;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  const t1 = 0.12; // transition point
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    if (t < t1) {
      const env1 = Math.exp(-t * 12);
      samples[i] = Math.sin(2 * Math.PI * 587.33 * t) * env1 * 0.6;
    } else {
      const tRel = t - t1;
      const env2 = Math.exp(-tRel * 6);
      const tone = Math.sin(2 * Math.PI * 880 * tRel);
      const overtone = Math.sin(2 * Math.PI * 1760 * tRel) * 0.25;
      samples[i] = (tone + overtone) * env2 * 0.7;
    }
  }
  return generateWavDataUri(SAMPLE_RATE, samples);
}

/**
 * 6. sfx_ui_whoosh: Soft low-pass air whoosh (180ms)
 */
function createUiWhooshWav(): string {
  const duration = 0.22;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  let lp = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / numSamples;
    const env = Math.sin(t * Math.PI);
    const white = Math.random() * 2 - 1;
    // Low pass filter
    lp += (white - lp) * 0.08;
    samples[i] = lp * env * 0.65;
  }
  return generateWavDataUri(SAMPLE_RATE, samples);
}

// Pre-computed WAV Data URIs (Lazy singleton cache)
export const SFX_URIS = {
  paper_rustle: createPaperRustleWav(),
  odometer_tick: createOdometerTickWav(),
  marker_circle: createMarkerCircleWav(),
  alert_breach: createAlertBreachWav(),
  verified_chime: createVerifiedChimeWav(),
  ui_whoosh: createUiWhooshWav(),
};
