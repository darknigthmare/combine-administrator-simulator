import { syntheticAudioCueOrder, syntheticAudioCues } from '../data/syntheticAudioCues';
import type { AtmosphereProfile, AtmosphereSettings, GameState, SyntheticAudioCueId, SyntheticAudioDirectorSnapshot, SyntheticAudioSegment } from '../types/game';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

const legacyCueMap: Record<AtmosphereProfile['audioCue'], SyntheticAudioCueId> = {
  none: 'terminal_ping',
  terminal: 'terminal_ping',
  alarm: 'citadel_alarm',
  xen: 'xen_drone',
  nova: 'nova_intake',
  advisor: 'advisor_bass',
  uprising: 'curfew_siren',
};

function topPressureLine(game: GameState): string {
  const pressures = [
    ['Lambda', game.stats.rebel],
    ['Xen', game.stats.xen],
    ['Advisor', Math.max(game.stats.suspicion, game.auditHeat)],
    ['Nova', game.novaProspekt.instability],
    ['Rationnement', game.rationEconomy.hungerIndex],
    ['Civil Protection', game.civilProtection.brutalityIndex],
  ] as const;
  const [label, value] = pressures.reduce((best, item) => (item[1] > best[1] ? item : best), pressures[0]);
  return `${label} domine le mix sensoriel (${value}%).`;
}

function pickAudioCue(game: GameState, profile: AtmosphereProfile): SyntheticAudioCueId {
  if (game.ending || profile.mode === 'collapse') return 'citadel_alarm';
  if (game.tab === 'nova' || game.tab === 'major_events' && game.majorStoryEvents.activePolicy === 'classified_delay') return 'nova_intake';
  if (game.tab === 'xen_research' || game.tab === 'xen_catastrophes' || game.tab === 'xen') return 'xen_drone';
  if (game.tab === 'vortigaunts') return 'vortessence_chord';
  if (game.tab === 'overwatch') return game.stats.rebel > 62 ? 'strider_footfall' : 'scanner_sweep';
  if (game.tab === 'civil_protection') return game.civilProtection.brutalityIndex > 62 ? 'manhack_rattle' : 'scanner_sweep';
  if (game.tab === 'propaganda') return 'breencast_chime';
  if (game.tab === 'reports' || game.tab === 'citadel' || game.auditHeat > 70 || game.stats.suspicion > 72) return 'advisor_bass';
  if (game.tab === 'resistance' || game.stats.rebel > 68) return 'curfew_siren';
  if (game.tab === 'sectors' && game.sectors.some((s) => s.id === 'rail' && (s.rebel > 55 || s.xen > 45))) return 'razor_train';
  if (game.xenCatastrophes.activeEventCount > 0 || game.stats.xen > Math.max(game.stats.rebel + 8, 55)) return 'xen_drone';
  if (game.majorStoryEvents.unresolvedMajorEvents > 0 && game.majorStoryEvents.publicContradiction > 50) return 'citadel_alarm';
  if (game.stats.fear > 78 || game.civilProtection.brutalityIndex > 74) return 'curfew_siren';
  return legacyCueMap[profile.audioCue];
}

function pickAmbientCue(game: GameState, profile: AtmosphereProfile): SyntheticAudioCueId {
  if (profile.mode === 'xen' || game.stats.xen > 55) return 'xen_drone';
  if (profile.mode === 'nova' || game.novaProspekt.totalTransferred > 160) return 'razor_train';
  if (profile.mode === 'citadel_alert' || game.auditHeat > 55) return 'advisor_bass';
  if (profile.mode === 'uprising' || game.stats.rebel > 52) return 'curfew_siren';
  if (game.vortigaunts.vortessenceCoherence > 65 && game.tab === 'xen') return 'vortessence_chord';
  return 'scanner_sweep';
}

export function buildSyntheticAudioDirector(game: GameState, profile: AtmosphereProfile): SyntheticAudioDirectorSnapshot {
  const danger = clamp(
    (100 - game.stats.stability) * 0.26 +
    game.stats.rebel * 0.18 +
    game.stats.xen * 0.2 +
    game.auditHeat * 0.16 +
    game.novaProspekt.instability * 0.1 +
    game.xenCatastrophes.totalCatastropheRisk * 0.1,
  );
  const activeCue = pickAudioCue(game, profile);
  const ambientCue = pickAmbientCue(game, profile);
  const recommended = [activeCue, ambientCue, 'terminal_ping', 'scanner_sweep']
    .concat(game.stats.xen > 50 ? ['xen_drone'] : [])
    .concat(game.stats.rebel > 55 ? ['curfew_siren'] : [])
    .concat(game.auditHeat > 50 ? ['advisor_bass'] : [])
    .filter((cue, index, arr): cue is SyntheticAudioCueId => Boolean(cue) && arr.indexOf(cue) === index && cue in syntheticAudioCues)
    .slice(0, 6);

  const routeLines = [
    topPressureLine(game),
    `Cue actif : ${syntheticAudioCues[activeCue].terminalTag}.`,
    `Ambiance recommandée : ${syntheticAudioCues[ambientCue].label}.`,
    profile.mode === 'quiet_control'
      ? 'COAN recommande un mix minimal : City obéit, ne pas saturer le terminal.'
      : `Intensité audio calculée : ${danger}% selon stabilité, Xen, Lambda, audit et Nova Prospekt.`,
  ];
  if (game.atmosphereSettings.audioEnabled && !game.atmosphereSettings.advancedAudioEnabled) {
    routeLines.push('Mode legacy actif : les nouveaux cues sont affichés mais le rendu reste simplifié.');
  }

  return {
    activeCue,
    ambientCue,
    moodLabel: profile.label,
    mixLabel: danger > 76 ? 'mix crise totale' : danger > 52 ? 'mix tension opérationnelle' : danger > 28 ? 'mix surveillance active' : 'mix contrôle froid',
    intensity: danger,
    danger,
    routeLines,
    recommendedCues: recommended.length ? recommended : ['terminal_ping'],
    suppressionNotice: !game.atmosphereSettings.audioEnabled ? 'Audio désactivé dans les paramètres Atmosphère.' : undefined,
  };
}

function buildNoise(context: AudioContext, duration: number): AudioBufferSourceNode {
  const length = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  }
  const source = context.createBufferSource();
  source.buffer = buffer;
  return source;
}

function buildDistortionCurve(amount: number): Float32Array<ArrayBuffer> {
  const samples = 256;
  const curve = new Float32Array(new ArrayBuffer(samples * Float32Array.BYTES_PER_ELEMENT));
  const k = amount * 18;
  for (let i = 0; i < samples; i += 1) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((3 + k) * x * 20 * (Math.PI / 180)) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

function segmentGainEnvelope(gain: GainNode, segment: SyntheticAudioSegment, start: number, volume: number) {
  const peak = Math.max(0.0001, segment.gain * volume);
  const end = start + segment.duration;
  gain.gain.setValueAtTime(0.0001, start);
  if (segment.ramp === 'swell') {
    gain.gain.exponentialRampToValueAtTime(peak, start + Math.min(segment.duration * 0.45, 0.28));
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
  } else if (segment.ramp === 'pulse') {
    gain.gain.exponentialRampToValueAtTime(peak, start + Math.min(segment.duration * 0.12, 0.025));
    gain.gain.exponentialRampToValueAtTime(peak * 0.28, start + segment.duration * 0.55);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
  } else if (segment.ramp === 'fade') {
    gain.gain.exponentialRampToValueAtTime(peak, start + Math.min(segment.duration * 0.18, 0.04));
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
  } else {
    gain.gain.exponentialRampToValueAtTime(peak, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
  }
}

export function playSyntheticAudioCue(cueId: SyntheticAudioCueId, settings: AtmosphereSettings, director?: SyntheticAudioDirectorSnapshot): void {
  if (!settings.enabled || !settings.audioEnabled) return;
  if (!settings.eventCues && cueId !== 'terminal_ping') return;
  if (typeof window === 'undefined') return;
  const AudioContextCtor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return;
  const definition = syntheticAudioCues[cueId];
  if (!definition) return;

  const context = new AudioContextCtor();
  const master = context.createGain();
  const base = Math.max(0, Math.min(1, settings.masterVolume / 100));
  const density = settings.audioComplexity === 'minimal' ? 0.62 : settings.audioComplexity === 'dense' ? 1.18 : 1;
  const dangerBoost = director ? 0.76 + director.intensity / 185 : 0.88;
  const volume = base * definition.baseVolume * density * dangerBoost * (settings.advancedAudioEnabled ? 0.08 : 0.052);

  const output: AudioNode = settings.distortion && settings.advancedAudioEnabled ? context.createWaveShaper() : master;
  if (output instanceof WaveShaperNode) {
    output.curve = buildDistortionCurve(director ? director.intensity / 100 : 0.35);
    output.oversample = '2x';
    output.connect(master);
  }
  master.gain.value = settings.reducedMotion ? volume * 0.65 : volume;
  master.connect(context.destination);

  const now = context.currentTime;
  const maxSegments = settings.audioComplexity === 'minimal' ? 3 : settings.audioComplexity === 'dense' ? definition.segments.length : Math.min(definition.segments.length, 5);
  const segments = definition.segments.slice(0, maxSegments);
  let longest = 0;

  segments.forEach((segment) => {
    const start = now + segment.delay;
    const end = start + segment.duration;
    longest = Math.max(longest, segment.delay + segment.duration);
    const gain = context.createGain();
    const filter = segment.filter ? context.createBiquadFilter() : null;
    const panner = context.createStereoPanner ? context.createStereoPanner() : null;
    if (filter) {
      filter.type = segment.filter as BiquadFilterType;
      filter.frequency.value = segment.filterFrequency ?? 900;
    }
    if (panner) panner.pan.value = settings.advancedAudioEnabled ? (segment.pan ?? 0) : 0;

    const firstNode = filter ?? panner ?? gain;
    const lastBeforeGain = panner ?? filter;
    if (filter && panner) filter.connect(panner);
    if (lastBeforeGain && lastBeforeGain !== gain) lastBeforeGain.connect(gain);
    gain.connect(output);
    segmentGainEnvelope(gain, segment, start, volume);

    if (segment.oscillator === 'noise') {
      const noise = buildNoise(context, segment.duration + 0.05);
      noise.connect(firstNode);
      noise.start(start);
      noise.stop(end + 0.03);
      return;
    }
    const oscillator = context.createOscillator();
    oscillator.type = segment.oscillator;
    oscillator.frequency.setValueAtTime(segment.frequency, start);
    if (segment.detune) oscillator.detune.setValueAtTime(segment.detune, start);
    if (settings.bassResponse && definition.category === 'citadel') {
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, segment.frequency * 0.74), end);
    }
    oscillator.connect(firstNode);
    oscillator.start(start);
    oscillator.stop(end + 0.04);
  });

  if (settings.ambientDrone && settings.advancedAudioEnabled && director?.ambientCue && director.ambientCue !== cueId) {
    const ambient = syntheticAudioCues[director.ambientCue];
    const seg = ambient.segments[0];
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    osc.type = seg.oscillator === 'noise' ? 'sine' : seg.oscillator;
    osc.frequency.value = Math.max(28, seg.frequency || 80);
    filter.type = 'lowpass';
    filter.frequency.value = 260 + director.intensity * 3;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    const start = now + 0.03;
    const duration = settings.reducedMotion ? 0.18 : 0.72;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume * 0.12, start + duration * 0.38);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.start(start);
    osc.stop(start + duration + 0.04);
    longest = Math.max(longest, duration + 0.08);
  }

  setTimeout(() => context.close().catch(() => undefined), Math.min(1800, (longest + 0.35) * 1000));
}

export function startSyntheticAmbientBed(settings: AtmosphereSettings, director: SyntheticAudioDirectorSnapshot): () => void {
  if (!settings.enabled || !settings.audioEnabled || !settings.advancedAudioEnabled || !settings.ambientDrone || typeof window === 'undefined') return () => undefined;
  const AudioContextCtor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return () => undefined;

  const context = new AudioContextCtor();
  const master = context.createGain();
  const filter = context.createBiquadFilter();
  const cue = syntheticAudioCues[director.ambientCue];
  const root = Math.max(32, cue.segments.find((segment) => segment.oscillator !== 'noise')?.frequency ?? 58);
  const baseVolume = Math.max(0, Math.min(1, settings.masterVolume / 100)) * (0.008 + director.intensity / 16000);
  const oscillators = [1, 1.5, 2.01].map((ratio, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = index === 0 ? 'sine' : 'triangle';
    oscillator.frequency.value = root * ratio;
    oscillator.detune.value = index === 2 ? -7 : index * 3;
    oscillator.connect(filter);
    oscillator.start();
    return oscillator;
  });

  filter.type = 'lowpass';
  filter.frequency.value = 190 + director.intensity * 3.2;
  filter.Q.value = 0.7;
  filter.connect(master);
  master.connect(context.destination);
  master.gain.setValueAtTime(0.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(Math.max(0.0002, baseVolume), context.currentTime + 1.4);

  return () => {
    const stopAt = context.currentTime + 0.65;
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, stopAt);
    oscillators.forEach((oscillator) => oscillator.stop(stopAt + 0.05));
    window.setTimeout(() => context.close().catch(() => undefined), 800);
  };
}

export function getSyntheticAudioCueDefinition(cueId: SyntheticAudioCueId) {
  return syntheticAudioCues[cueId] ?? syntheticAudioCues.terminal_ping;
}

export function getAllSyntheticAudioCues() {
  return syntheticAudioCueOrder.map((id) => syntheticAudioCues[id]);
}
