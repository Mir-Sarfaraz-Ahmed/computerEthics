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
