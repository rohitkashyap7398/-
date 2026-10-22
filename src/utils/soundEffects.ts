// Web Audio API devotional ambient sound generator & Web Speech synthesis helper

let audioCtx: AudioContext | null = null;
let droneOsc1: OscillatorNode | null = null;
let droneOsc2: OscillatorNode | null = null;
let droneGain: GainNode | null = null;
let isDronePlaying = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a sacred temple bell / chime ring using additive harmonics
 */
export function playTempleBell() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Frequencies of an authentic Indian brass bell
    const frequencies = [587.33, 1174.66, 1760.0, 2349.32, 2936.65];
    const gains = [0.3, 0.18, 0.1, 0.06, 0.03];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Strike and smooth exponential ring-out decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(gains[idx] || 0.05, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3.3);
    });
  } catch {
    // Audio context may require user interaction or not be supported
  }
}

/**
 * Toggle tranquil Indian classical tanpura / meditative drone
 */
export function toggleDevotionalDrone(onStateChange?: (isPlaying: boolean) => void): boolean {
  try {
    const ctx = getAudioContext();

    if (isDronePlaying) {
      if (droneGain) {
        droneGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        setTimeout(() => {
          droneOsc1?.stop();
          droneOsc2?.stop();
          droneOsc1?.disconnect();
          droneOsc2?.disconnect();
          isDronePlaying = false;
          onStateChange?.(false);
        }, 1200);
      }
      return false;
    } else {
      const now = ctx.currentTime;
      droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.0001, now);
      droneGain.gain.linearRampToValueAtTime(0.08, now + 2.0);

      // Low peaceful Sa - Pa tonic notes (D3 and A2)
      droneOsc1 = ctx.createOscillator();
      droneOsc1.type = 'sine';
      droneOsc1.frequency.setValueAtTime(146.83, now); // D3

      droneOsc2 = ctx.createOscillator();
      droneOsc2.type = 'triangle';
      droneOsc2.frequency.setValueAtTime(220.0, now); // A3

      droneOsc1.connect(droneGain);
      droneOsc2.connect(droneGain);
      droneGain.connect(ctx.destination);

      droneOsc1.start(now);
      droneOsc2.start(now);
      isDronePlaying = true;
      onStateChange?.(true);
      return true;
    }
  } catch {
    return false;
  }
}

export function isAmbientDroneActive(): boolean {
  return isDronePlaying;
}

/**
 * Text-to-Speech reciter for Hindi Ram Katha
 */
export class KathaSpeechReciter {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static isSpeakingFlag = false;
  private static activeChapterId: number | null = null;
  private static listeners: Set<(id: number | null) => void> = new Set();

  static subscribe(fn: (id: number | null) => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private static notify() {
    this.listeners.forEach((fn) => fn(this.activeChapterId));
  }

  static getActiveChapterId(): number | null {
    return this.activeChapterId;
  }

  static speakChapter(
    chapter: { id: number; title: string; hindiNumber: string; kand: string; chaupai: { verse: string; meaning: string }; summary: string },
    onEnd?: () => void
  ) {
    if (this.activeChapterId === chapter.id && this.isSpeakingFlag) {
      this.stop();
      return;
    }

    const narrative = `अध्याय ${chapter.hindiNumber}: ${chapter.title}। ${chapter.kand}। पावन चौपाई: ${chapter.chaupai.verse}। भावार्थ: ${chapter.chaupai.meaning}। कथा सारांश: ${chapter.summary}`;
    
    this.activeChapterId = chapter.id;
    this.notify();

    this.speak(
      narrative,
      () => {
        this.activeChapterId = null;
        this.notify();
        onEnd?.();
      },
      () => {
        this.activeChapterId = null;
        this.notify();
      }
    );
  }

  static speak(text: string, onEnd?: () => void, onError?: () => void) {
    if (!this.synth) return;

    this.stopOnlySynthesis();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Search for Hindi voice
    const voices = this.synth.getVoices();
    const hindiVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.includes('IN'));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    utterance.lang = 'hi-IN';
    utterance.rate = 0.92; // Serene contemplative pace
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeakingFlag = true;
    };

    utterance.onend = () => {
      this.isSpeakingFlag = false;
      this.currentUtterance = null;
      this.activeChapterId = null;
      this.notify();
      onEnd?.();
    };

    utterance.onerror = () => {
      this.isSpeakingFlag = false;
      this.currentUtterance = null;
      this.activeChapterId = null;
      this.notify();
      onError?.();
    };

    this.synth.speak(utterance);
  }

  private static stopOnlySynthesis() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingFlag = false;
      this.currentUtterance = null;
    }
  }

  static stop() {
    this.stopOnlySynthesis();
    this.activeChapterId = null;
    this.notify();
  }

  static pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  static resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  static isSpeaking(): boolean {
    return this.isSpeakingFlag && !!this.synth?.speaking;
  }
}

