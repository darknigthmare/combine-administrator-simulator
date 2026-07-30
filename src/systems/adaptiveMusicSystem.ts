import type { AtmosphereSettings, SyntheticAudioCueId, SyntheticAudioDirectorSnapshot } from '../types/game';

export type AdaptiveMusicTrackId = 'control' | 'tension' | 'xen' | 'nova';

type AdaptiveMusicTrack = {
  id: AdaptiveMusicTrackId;
  label: string;
  source: string;
  description: string;
};

export const adaptiveMusicTracks: Record<AdaptiveMusicTrackId, AdaptiveMusicTrack> = {
  control: {
    id: 'control',
    label: 'Contrôle froid',
    source: '/audio/coan-control.ogg',
    description: 'Pulsation administrative lente pour la gouvernance quotidienne.',
  },
  tension: {
    id: 'tension',
    label: 'Pression Citadel',
    source: '/audio/coan-tension.ogg',
    description: 'Ostinato industriel pour audits, crises Lambda et effondrement.',
  },
  xen: {
    id: 'xen',
    label: 'Biosphère étrangère',
    source: '/audio/coan-xen.ogg',
    description: 'Harmoniques instables et texture organique pour les vecteurs Xen.',
  },
  nova: {
    id: 'nova',
    label: 'Uplink Nova',
    source: '/audio/coan-nova.ogg',
    description: 'Séquence clinique pour les transferts et dossiers pénitentiaires.',
  },
};

let activeAudio: HTMLAudioElement | null = null;
let activeTrackId: AdaptiveMusicTrackId | null = null;
let fadeTimer: number | null = null;
let unlockListenerInstalled = false;

function getTargetVolume(settings: AtmosphereSettings) {
  return Math.min(0.62, Math.max(0, (settings.masterVolume / 100) * (settings.musicVolume / 100) * 0.72));
}

function trackForCue(cue: SyntheticAudioCueId): AdaptiveMusicTrackId {
  if (['xen_drone', 'vortessence_chord'].includes(cue)) return 'xen';
  if (['nova_intake', 'razor_train'].includes(cue)) return 'nova';
  if (['advisor_bass', 'curfew_siren', 'citadel_alarm', 'strider_footfall', 'manhack_rattle'].includes(cue)) return 'tension';
  return 'control';
}

export function getAdaptiveMusicTrack(director: SyntheticAudioDirectorSnapshot): AdaptiveMusicTrack {
  return adaptiveMusicTracks[trackForCue(director.ambientCue)];
}

function clearFadeTimer() {
  if (fadeTimer !== null) window.clearInterval(fadeTimer);
  fadeTimer = null;
}

function fadeTo(audio: HTMLAudioElement, target: number, durationMs: number, onDone?: () => void) {
  const start = audio.volume;
  const startedAt = performance.now();
  clearFadeTimer();
  fadeTimer = window.setInterval(() => {
    const progress = Math.min(1, (performance.now() - startedAt) / durationMs);
    audio.volume = Math.max(0, Math.min(1, start + (target - start) * progress));
    if (progress < 1) return;
    clearFadeTimer();
    onDone?.();
  }, 50);
}

function requestPlayback(audio: HTMLAudioElement) {
  audio.play().catch(() => {
    if (unlockListenerInstalled) return;
    unlockListenerInstalled = true;
    const unlock = () => {
      unlockListenerInstalled = false;
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      activeAudio?.play().catch(() => undefined);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
  });
}

export function updateAdaptiveMusic(settings: AtmosphereSettings, director: SyntheticAudioDirectorSnapshot): void {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') return;
  const enabled = settings.audioEnabled && settings.musicEnabled && settings.musicVolume > 0 && settings.masterVolume > 0;
  const targetVolume = enabled ? getTargetVolume(settings) : 0;

  if (!enabled) {
    if (activeAudio) {
      clearFadeTimer();
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }
    activeAudio = null;
    activeTrackId = null;
    return;
  }

  const nextTrack = getAdaptiveMusicTrack(director);
  if (activeAudio && activeTrackId === nextTrack.id) {
    fadeTo(activeAudio, targetVolume, 350);
    requestPlayback(activeAudio);
    return;
  }

  const outgoing = activeAudio;
  const incoming = new Audio(nextTrack.source);
  incoming.loop = true;
  incoming.preload = 'auto';
  incoming.volume = 0;
  activeAudio = incoming;
  activeTrackId = nextTrack.id;
  requestPlayback(incoming);

  const startedAt = performance.now();
  const outgoingStart = outgoing?.volume ?? 0;
  clearFadeTimer();
  fadeTimer = window.setInterval(() => {
    const progress = Math.min(1, (performance.now() - startedAt) / 1400);
    incoming.volume = Math.max(0, Math.min(1, targetVolume * progress));
    if (outgoing) outgoing.volume = Math.max(0, outgoingStart * (1 - progress));
    if (progress < 1) return;
    clearFadeTimer();
    if (outgoing) {
      outgoing.pause();
      outgoing.currentTime = 0;
    }
  }, 50);
}

export function stopAdaptiveMusic(): void {
  clearFadeTimer();
  activeAudio?.pause();
  if (activeAudio) activeAudio.currentTime = 0;
  activeAudio = null;
  activeTrackId = null;
}
