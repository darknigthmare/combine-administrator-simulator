import { useEffect, useRef } from 'react';
import type { AtmosphereProfile, AtmosphereSettings, SyntheticAudioDirectorSnapshot } from '../types/game';
import { playSyntheticAudioCue, startSyntheticAmbientBed } from '../systems/syntheticAudioSystem';

export function AtmosphereLayer({
  profile,
  settings,
  cueKey,
  audioDirector,
}: {
  profile: AtmosphereProfile;
  settings: AtmosphereSettings;
  cueKey: string;
  audioDirector?: SyntheticAudioDirectorSnapshot;
}) {
  const lastCue = useRef('');
  const lastCueAt = useRef(0);

  useEffect(() => {
    document.documentElement.style.setProperty('--atm-hue', profile.hue);
    document.documentElement.style.setProperty('--atm-accent', profile.accent);
    document.documentElement.style.setProperty('--atm-intensity', `${profile.intensity / 100}`);
    document.documentElement.style.setProperty('--atm-scanlines', `${settings.scanlines ? profile.scanlineOpacity : 0}`);
    document.documentElement.style.setProperty('--atm-glitch', `${settings.glitch ? profile.glitchOpacity : 0}`);
    document.documentElement.style.setProperty('--atm-vignette', `${settings.enabled ? profile.vignette : 0}`);
    document.documentElement.style.setProperty('--audio-danger', `${(audioDirector?.danger ?? profile.intensity) / 100}`);
    document.body.dataset.atmosphere = settings.enabled ? profile.mode : 'disabled';
    document.body.dataset.audioCue = audioDirector?.activeCue ?? profile.audioCue;
    document.body.classList.toggle('reduced-motion', settings.reducedMotion);
  }, [profile, settings, audioDirector]);

  useEffect(() => {
    if (lastCue.current === cueKey) return;
    const now = Date.now();
    if (now - lastCueAt.current < settings.cueCooldownMs) return;
    lastCue.current = cueKey;
    lastCueAt.current = now;
    if (!settings.uiCues && cueKey.includes('-tab-')) return;
    playSyntheticAudioCue(audioDirector?.activeCue ?? 'terminal_ping', settings, audioDirector);
  }, [cueKey, audioDirector, settings]);

  useEffect(() => {
    if (!audioDirector) return;
    return startSyntheticAmbientBed(settings, audioDirector);
  }, [audioDirector, settings]);

  if (!settings.enabled) return null;
  return <div className={`atmosphere-layer ${profile.bodyClass} ${settings.chromatic ? 'chromatic-on' : ''} ${settings.ambientPulse ? 'pulse-on' : ''} ${settings.advancedAudioEnabled ? 'audio-advanced' : 'audio-legacy'}`} aria-hidden="true">
    <div className="atm-vignette" />
    <div className="atm-grid" />
    <div className="atm-glitch" />
    <div className="atm-audio-wave" />
    <div className="atm-pulse" style={{ animationDuration: `${Math.max(3, settings.reducedMotion ? 999 : profile.pulseRate)}s` }} />
  </div>;
}
