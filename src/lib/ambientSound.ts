/**
 * Web Audio API Ambient Sound Generator
 * Generates a warm, calm ambient sound without external audio files or network dependencies.
 */
class AmbientSynth {
  private ctx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private osc3: OscillatorNode | null = null;
  private isPlaying = false;
  private isMuted = false;

  public start() {
    if (this.isPlaying || this.isMuted) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!AudioCtx) return;

      this.ctx = new AudioCtx();

      this.gainNode = this.ctx.createGain();
      const now = this.ctx.currentTime;

      // Smooth fade-in
      this.gainNode.gain.setValueAtTime(0.0001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.12, now + 2);

      // Low-pass filter for a warm, non-harsh ambient pad
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, now);

      // Warm ambient harmonic frequencies (C3 + G3 + C4)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = "sine";
      this.osc1.frequency.setValueAtTime(130.81, now); // C3

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = "sine";
      this.osc2.frequency.setValueAtTime(196.0, now); // G3

      this.osc3 = this.ctx.createOscillator();
      this.osc3.type = "sine";
      this.osc3.frequency.setValueAtTime(261.63, now); // C4

      this.osc1.connect(filter);
      this.osc2.connect(filter);
      this.osc3.connect(filter);

      filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.osc3.start();

      this.isPlaying = true;
    } catch (err) {
      console.warn("Web Audio API Ambient synth failed to start:", err);
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.gainNode) return;

    try {
      const now = this.ctx.currentTime;
      this.gainNode.gain.setValueAtTime(Math.max(this.gainNode.gain.value, 0.0001), now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      const ctxToClose = this.ctx;
      const o1 = this.osc1;
      const o2 = this.osc2;
      const o3 = this.osc3;

      setTimeout(() => {
        try {
          o1?.stop();
          o2?.stop();
          o3?.stop();
          o1?.disconnect();
          o2?.disconnect();
          o3?.disconnect();
          ctxToClose.close();
        } catch {
          // ignore cleanup errors
        }
      }, 850);

      this.isPlaying = false;
      this.ctx = null;
    } catch {
      this.isPlaying = false;
      this.ctx = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPlaying) {
      this.stop();
    }
    return this.isMuted;
  }

  public getMutedStatus(): boolean {
    return this.isMuted;
  }
}

export const ambientSynth = new AmbientSynth();
