import type { AtmosphereProfile, AtmosphereSettings, GameState } from '../types/game';

export const defaultAtmosphereSettings: AtmosphereSettings = {
  enabled: true,
  audioEnabled: false,
  advancedAudioEnabled: true,
  ambientDrone: true,
  eventCues: true,
  uiCues: true,
  bassResponse: true,
  distortion: false,
  scanlines: true,
  glitch: true,
  chromatic: true,
  ambientPulse: true,
  reducedMotion: false,
  masterVolume: 42,
  audioComplexity: 'standard',
  cueCooldownMs: 650,
};

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

export function getAtmosphereProfile(game: GameState): AtmosphereProfile {
  const stats = game.stats;
  const nova = game.novaProspekt;
  const catastrophic = stats.stability < 25 || stats.citadel < 18 || stats.suspicion > 88;
  const xenDominant = stats.xen >= Math.max(stats.rebel + 7, 42) || (game.tab === 'xen' && stats.xen > 25) || nova.xenBreachRisk > 74;
  const uprisingDominant = stats.rebel >= Math.max(stats.xen + 5, 45) || game.timeline === 'uprising' || game.tab === 'resistance';
  const novaMode = game.tab === 'nova';
  const advisorPressure = stats.suspicion > 62 || game.auditHeat > 68 || game.tab === 'citadel' || game.tab === 'reports';
  const quietControl = stats.stability > 72 && stats.rebel < 22 && stats.xen < 22 && stats.fear > 55;

  let profile: AtmosphereProfile = {
    mode: 'combine',
    label: 'Stabilisation Combine',
    bodyClass: 'atm-combine',
    alertLevel: 1,
    intensity: clamp((100 - stats.stability) * 0.42 + stats.fear * 0.18 + stats.suspicion * 0.18),
    hue: '#65dbff',
    accent: '#ff9b42',
    vignette: 0.42,
    scanlineOpacity: 0.16,
    glitchOpacity: 0.08,
    pulseRate: 11,
    audioCue: 'terminal',
    reason: 'Surveillance civique nominale. Contrôle informationnel et checkpoints actifs.',
    ticker: [
      'CIVIL OVERWATCH NODE // transmission active',
      `City ${game.city} // jour ${String(game.day).padStart(3, '0')}`,
      `directive Citadel // ${game.directive.title}`,
    ],
  };

  if (quietControl) {
    profile = {
      ...profile,
      mode: 'quiet_control',
      label: 'Contrôle froid',
      bodyClass: 'atm-quiet-control',
      alertLevel: 0,
      intensity: clamp(24 + stats.fear * 0.18),
      glitchOpacity: 0.03,
      pulseRate: 18,
      audioCue: 'none',
      reason: 'City disciplinée. La population obéit davantage qu’elle ne coopère.',
      ticker: ['BREENCAST // conformité stable', 'rationnement // productivité prioritaire', 'surveillance // seuil acceptable'],
    };
  }

  if (advisorPressure) {
    profile = {
      ...profile,
      mode: 'citadel_alert',
      label: 'Pression Advisor',
      bodyClass: 'atm-citadel-alert',
      alertLevel: clamp(Math.ceil((stats.suspicion + game.auditHeat) / 38), 2, 5) as AtmosphereProfile['alertLevel'],
      intensity: clamp(54 + stats.suspicion * 0.38 + game.auditHeat * 0.22),
      hue: '#b7e9ff',
      accent: '#ffcf70',
      vignette: 0.58,
      glitchOpacity: 0.12,
      pulseRate: 7,
      audioCue: 'advisor',
      reason: 'Les rapports Citadel et la chaleur d’audit rendent l’administration personnellement observable.',
      ticker: ['ADVISOR REVIEW // protocole de vérification', `audit heat // ${game.auditHeat}%`, `suspicion Citadel // ${stats.suspicion}%`],
    };
  }

  if (uprisingDominant) {
    profile = {
      ...profile,
      mode: 'uprising',
      label: 'Soulèvement Lambda',
      bodyClass: 'atm-uprising',
      alertLevel: clamp(Math.ceil(stats.rebel / 20), 2, 5) as AtmosphereProfile['alertLevel'],
      intensity: clamp(40 + stats.rebel * 0.58 + stats.fatigue * 0.18),
      hue: '#ff5c38',
      accent: '#ffd08b',
      vignette: 0.62,
      scanlineOpacity: 0.2,
      glitchOpacity: 0.16,
      pulseRate: 5,
      audioCue: 'uprising',
      reason: 'Réseaux Lambda, canaux et radios pirates dépassent le seuil de nuisance clandestine.',
      ticker: ['ANTI-CITIZEN ACTIVITY // secteur multiple', `activité Lambda // ${stats.rebel}%`, 'canaux / égouts // routes probables'],
    };
  }

  if (xenDominant) {
    profile = {
      ...profile,
      mode: 'xen',
      label: 'Vecteur Xen actif',
      bodyClass: 'atm-xen',
      alertLevel: clamp(Math.ceil(Math.max(stats.xen, nova.xenBreachRisk) / 18), 2, 5) as AtmosphereProfile['alertLevel'],
      intensity: clamp(42 + stats.xen * 0.52 + nova.xenBreachRisk * 0.24),
      hue: '#9dff6a',
      accent: '#b168ff',
      vignette: 0.68,
      scanlineOpacity: 0.22,
      glitchOpacity: 0.22,
      pulseRate: 4,
      audioCue: 'xen',
      reason: 'La biosphère Xen contamine les infrastructures au lieu de se comporter comme une simple faction ennemie.',
      ticker: ['BIOLOGICAL VECTOR // confinement requis', `contamination Xen // ${stats.xen}%`, `risque brèche Nova // ${nova.xenBreachRisk}%`],
    };
  }

  if (novaMode) {
    profile = {
      ...profile,
      mode: 'nova',
      label: 'Uplink Nova Prospekt',
      bodyClass: 'atm-nova',
      alertLevel: clamp(Math.ceil((nova.instability + (100 - nova.secrecy)) / 34), 1, 5) as AtmosphereProfile['alertLevel'],
      intensity: clamp(35 + nova.instability * 0.36 + (100 - nova.humaneIndex) * 0.22 + nova.xenBreachRisk * 0.18),
      hue: '#7fc9ff',
      accent: '#e8f4ff',
      vignette: 0.72,
      scanlineOpacity: 0.26,
      glitchOpacity: 0.1,
      pulseRate: 9,
      audioCue: 'nova',
      reason: 'Interface de complexe externe : détention, Biotics, transferts Razor Train et archives classifiées.',
      ticker: ['NOVA PROSPEKT UPLINK // canal chiffré', `secret complexe // ${nova.secrecy}%`, `instabilité détenus // ${nova.instability}%`],
    };
  }

  if (catastrophic || game.ending) {
    profile = {
      ...profile,
      mode: 'collapse',
      label: game.ending ? 'Protocole de fin' : 'Effondrement administratif',
      bodyClass: 'atm-collapse',
      alertLevel: 5,
      intensity: 100,
      hue: '#ff3737',
      accent: '#ffffff',
      vignette: 0.85,
      scanlineOpacity: 0.34,
      glitchOpacity: 0.34,
      pulseRate: 3,
      audioCue: 'alarm',
      reason: game.ending ? 'Une condition de fin a verrouillé le dossier City.' : 'Stabilité, suspicion ou énergie Citadel ont atteint un seuil critique.',
      ticker: ['CITY FAILURE PROTOCOL // verrouillage', `stabilité // ${stats.stability}%`, `Citadel // ${stats.citadel}%`, `suspicion // ${stats.suspicion}%`],
    };
  }

  return profile;
}

export function mergeAtmosphereSettings(partial?: Partial<AtmosphereSettings>): AtmosphereSettings {
  return { ...defaultAtmosphereSettings, ...(partial ?? {}) };
}
