/**
 * Client-Side Spatial Audio Synthesizer for AAi Cinematic Navigation
 * Pure Web Audio API — No external audio files or assets needed.
 * Gracefully silent if disabled or browser audio context is blocked.
 */

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  /**
   * Stage 1: BEFORE ("I am here" / Target Lock & Pre-Launch Hum)
   */
  playTargetLock() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Two harmonic oscillators producing a spatial lock tone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(640, now + 0.15);

      osc2.frequency.setValueAtTime(480, now);
      osc2.frequency.exponentialRampToValueAtTime(960, now + 0.15);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.25);
      osc2.stop(now + 0.25);
    } catch {
      // Ignore any audio errors
    }
  }

  /**
   * Stage 2: DURING ("I am travelling" / Hyperspace Warp Sweep)
   */
  playWarpSweep(direction: 'descend' | 'ascend' | 'lateral' = 'descend', durationSeconds: number = 1.2) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.Q.value = 4;

      osc.type = 'sawtooth';

      if (direction === 'descend') {
        // Deep diving down: sweeping down with resonant whoosh
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + durationSeconds);
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(1800, now + durationSeconds * 0.5);
        filter.frequency.exponentialRampToValueAtTime(300, now + durationSeconds);
      } else {
        // Ascending up: rising harmonic resonance
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + durationSeconds);
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(2200, now + durationSeconds * 0.7);
        filter.frequency.exponentialRampToValueAtTime(600, now + durationSeconds);
      }

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.2);
      gain.gain.linearRampToValueAtTime(0.035, now + durationSeconds * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + durationSeconds);
    } catch {
      // Ignore
    }
  }

  /**
   * Stage 3: AFTER ("I have arrived" / Harmonious Arrival Beacon)
   */
  playArrivalBeacon() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Soft crystal chime (major chord notes 523Hz C5, 659Hz E5, 784Hz G5)
      const freqs = [523.25, 659.25, 783.99];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.025, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + idx * 0.05 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.65);
      });
    } catch {
      // Ignore
    }
  }
}

export const cinematicAudio = new CinematicAudioEngine();
