// Web Audio API Synthesizer for Keynote Sound Effects

let audioContext: AudioContext | null = null;
let soundEnabled = true;

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (enabled) {
    playAppleChime();
  }
}

export function toggleSound(): boolean {
  setSoundEnabled(!soundEnabled);
  return soundEnabled;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioContext = new AudioCtx();
    }
  }
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

export function resumeAudio(): void {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
}

export function playAppleChime(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.05;
    const notes = [
      { freq: 261.63, delay: 0.0, type: 'sine' as OscillatorType, vol: 0.12 },
      { freq: 329.63, delay: 0.05, type: 'sine' as OscillatorType, vol: 0.1 },
      { freq: 392.0, delay: 0.1, type: 'sine' as OscillatorType, vol: 0.1 },
      { freq: 523.25, delay: 0.15, type: 'sine' as OscillatorType, vol: 0.14 },
    ];
    notes.forEach((n) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = n.type;
      o.frequency.setValueAtTime(n.freq, now + n.delay);
      g.gain.setValueAtTime(0.0001, now + n.delay);
      g.gain.exponentialRampToValueAtTime(n.vol, now + n.delay + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, now + n.delay + 3.2);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(now + n.delay);
      o.stop(now + n.delay + 3.4);
    });
  } catch {
    // Audio context may require user interaction
  }
}

export function playSlideWhoosh(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const f = ctx.createBiquadFilter();

    o.type = 'sine';
    o.frequency.setValueAtTime(140, now);
    o.frequency.exponentialRampToValueAtTime(45, now + 1.2);

    f.type = 'lowpass';
    f.frequency.setValueAtTime(260, now);

    g.gain.setValueAtTime(0.001, now);
    g.gain.exponentialRampToValueAtTime(0.08, now + 0.15);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    o.connect(f);
    f.connect(g);
    g.connect(ctx.destination);
    o.start(now);
    o.stop(now + 1.5);
  } catch {}
}

export function playQuestionRevealChord(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    const freqs = [146.83, 220, 349.23, 523.25, 659.25, 1318.51];
    freqs.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = i === 0 ? 'triangle' : 'sine';
      o.frequency.setValueAtTime(freq, now);
      const v = i === freqs.length - 1 ? 0.015 : 0.04 / (i + 1);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(v, now + 0.22);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(now);
      o.stop(now + 4.0);
    });
  } catch {}
}

export function playChimePositive(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, now + i * 0.06);
      g.gain.setValueAtTime(0.0001, now + i * 0.06);
      g.gain.exponentialRampToValueAtTime(0.05, now + i * 0.06 + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 1.2);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(now + i * 0.06);
      o.stop(now + i * 0.06 + 1.4);
    });
  } catch {}
}

export function playChimeWarning(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    [233.08, 329.63].forEach((f) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(f, now);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.04, now + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(now);
      o.stop(now + 0.9);
    });
  } catch {}
}

export function playPaperPlaneSound(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(180, now);
    o.frequency.exponentialRampToValueAtTime(680, now + 0.9);
    o.frequency.exponentialRampToValueAtTime(280, now + 1.5);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.09, now + 0.2);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.7);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(now);
    o.stop(now + 1.8);
  } catch {}
}

export function playTypewriterKeystroke(isSpace: boolean = false): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Noise burst for striker mechanical impact
    const bufferSize = Math.floor(ctx.sampleRate * 0.035);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.007));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    const centerFreq = isSpace
      ? 1100 + (Math.random() - 0.5) * 150
      : 2300 + (Math.random() - 0.5) * 400;
    filter.frequency.setValueAtTime(centerFreq, now);
    filter.Q.setValueAtTime(isSpace ? 2.5 : 4.0, now);

    const noiseGain = ctx.createGain();
    const noiseVol = isSpace ? 0.16 : 0.22;
    noiseGain.gain.setValueAtTime(noiseVol, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + (isSpace ? 0.035 : 0.025));

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.04);

    // 2. Mechanical body metallic "thud/click"
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = isSpace ? 'sine' : 'triangle';
    const baseFreq = isSpace ? 160 : 340 + (Math.random() - 0.5) * 60;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.35, now + 0.025);

    oscGain.gain.setValueAtTime(isSpace ? 0.08 : 0.12, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  } catch {}
}

export function playCinematicBoom(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Deep sub-bass pitch drop (105Hz down to 32Hz)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(105, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 1.8);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.exponentialRampToValueAtTime(0.24, now + 0.08);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 3.0);

    // Ominous brass/saw drone layer
    const droneOsc = ctx.createOscillator();
    const droneFilter = ctx.createBiquadFilter();
    const droneGain = ctx.createGain();

    droneOsc.type = 'sawtooth';
    droneOsc.frequency.setValueAtTime(55, now);
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(380, now);
    droneFilter.frequency.exponentialRampToValueAtTime(70, now + 2.2);

    droneGain.gain.setValueAtTime(0.001, now);
    droneGain.gain.exponentialRampToValueAtTime(0.12, now + 0.06);
    droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    droneOsc.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(ctx.destination);
    droneOsc.start(now);
    droneOsc.stop(now + 2.6);
  } catch {}
}

let activeSirenStopFn: (() => void) | null = null;

export function startNuclearSiren(): void {
  if (!soundEnabled) return;
  if (activeSirenStopFn) {
    activeSirenStopFn();
    activeSirenStopFn = null;
  }
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    const now = ctx.currentTime;
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.2, now + 0.2);

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(680, now);

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(1.15, now);

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(190, now);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(740, now);
    filter.Q.setValueAtTime(2.4, now);

    osc.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    osc.start(now);
    lfo.start(now);

    activeSirenStopFn = () => {
      try {
        const stopTime = ctx.currentTime;
        masterGain.gain.cancelScheduledValues(stopTime);
        masterGain.gain.setValueAtTime(masterGain.gain.value, stopTime);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, stopTime + 0.35);
        setTimeout(() => {
          try {
            osc.stop();
            lfo.stop();
            osc.disconnect();
            lfo.disconnect();
            filter.disconnect();
            masterGain.disconnect();
          } catch {}
        }, 400);
      } catch {}
    };
  } catch {}
}

export function stopNuclearSiren(): void {
  if (activeSirenStopFn) {
    activeSirenStopFn();
    activeSirenStopFn = null;
  }
}

export function playRadarSweep(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Tactical radar sonar ping (1760Hz with fast decay)
    const pingOsc = ctx.createOscillator();
    const pingGain = ctx.createGain();
    pingOsc.type = 'sine';
    pingOsc.frequency.setValueAtTime(1760, now);
    pingOsc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

    pingGain.gain.setValueAtTime(0.001, now);
    pingGain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    pingOsc.connect(pingGain);
    pingGain.connect(ctx.destination);
    pingOsc.start(now);
    pingOsc.stop(now + 1.3);

    // Deep rocket thruster whoosh
    const whooshOsc = ctx.createOscillator();
    const whooshFilter = ctx.createBiquadFilter();
    const whooshGain = ctx.createGain();

    whooshOsc.type = 'sawtooth';
    whooshOsc.frequency.setValueAtTime(90, now);
    whooshFilter.type = 'lowpass';
    whooshFilter.frequency.setValueAtTime(240, now);

    whooshGain.gain.setValueAtTime(0.001, now);
    whooshGain.gain.exponentialRampToValueAtTime(0.08, now + 0.3);
    whooshGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    whooshOsc.connect(whooshFilter);
    whooshFilter.connect(whooshGain);
    whooshGain.connect(ctx.destination);
    whooshOsc.start(now);
    whooshOsc.stop(now + 2.1);
  } catch {}
}

export function playHeroRevealChord(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Cinematic major 7th / 9th chord representing moral clarity & relief
    const frequencies = [65.41, 98.0, 130.81, 164.81, 196.0, 246.94, 392.0];
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx < 2 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(idx < 2 ? 220 : 1200, now);

      const maxGain = idx === 0 ? 0.12 : idx === 1 ? 0.09 : 0.04;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(maxGain, now + 0.35 + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 3.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3.9);
    });
  } catch {}
}

export function playCyberGlitchSound(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sub rumble drone
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(65, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 1.6);

    const subFilter = ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.setValueAtTime(140, now);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.exponentialRampToValueAtTime(0.07, now + 0.1);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    subOsc.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 2.3);

    // Cyber glitch burst tones
    const glitchFreqs = [880, 1760, 440, 2600, 320];
    glitchFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.02, now + idx * 0.05 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.08);
    });
  } catch {}
}




