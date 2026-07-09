import type { NovaOperation, NovaProspektState, NovaZoneEffect, ProfileId, ScenarioId, Stats } from '../types/game';
import { novaDetainees, novaFacilityZones, novaPolicies } from '../data/novaProspekt';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

export function createInitialNovaProspektState(scenario: ScenarioId, profile: ProfileId): NovaProspektState {
  const scenarioInstability = scenario === 'post_nova' ? 22 : scenario === 'uprising' ? 18 : scenario === 'quarantine' ? 10 : 0;
  const profileHumane = profile === 'sympathizer' ? 18 : profile === 'tyrant' ? -18 : profile === 'loyalist' ? -8 : 0;
  return {
    active: scenario !== 'pre_hl2',
    interfaceMode: 'city',
    authority: profile === 'loyalist' ? 78 : profile === 'sympathizer' ? 38 : 62,
    security: scenario === 'uprising' ? 58 : 72,
    secrecy: profile === 'collaborator' ? 74 : 66,
    intelligence: scenario === 'dormant' ? 44 : 32,
    instability: clamp(38 + scenarioInstability),
    humaneIndex: clamp(28 + profileHumane),
    transferredToday: 0,
    totalTransferred: scenario === 'post_nova' ? 1800 : 420,
    escaped: scenario === 'uprising' ? 18 : 2,
    convertedCandidates: 0,
    bioticsPressure: profile === 'quarantine' ? 48 : 36,
    xenBreachRisk: scenario === 'quarantine' ? 54 : 28,
    zones: novaFacilityZones.map((zone) => ({ ...zone })),
    detainees: novaDetainees.map((detainee) => ({ ...detainee })),
    policies: novaPolicies,
    activePolicy: profile === 'sympathizer' ? 'covert_release' : profile === 'quarantine' ? 'biotics_leverage' : 'strict_processing',
    log: [
      'Nova Prospekt uplink établi : manifeste de transfert synchronisé.',
      'Avertissement : les archives du complexe ne doivent pas contredire la transmission Citadel.',
    ],
  };
}

function applyNovaEffect(state: NovaProspektState, effect: NovaZoneEffect): NovaProspektState {
  return {
    ...state,
    authority: clamp(state.authority + (effect.authority ?? 0)),
    security: clamp(state.security + (effect.security ?? 0)),
    secrecy: clamp(state.secrecy + (effect.secrecy ?? 0)),
    intelligence: clamp(state.intelligence + (effect.intelligence ?? 0)),
    instability: clamp(state.instability + (effect.instability ?? 0)),
    humaneIndex: clamp(state.humaneIndex + (effect.humaneIndex ?? 0)),
    bioticsPressure: clamp(state.bioticsPressure + (effect.bioticsPressure ?? 0)),
    xenBreachRisk: clamp(state.xenBreachRisk + (effect.xenBreachRisk ?? 0)),
    convertedCandidates: Math.max(0, state.convertedCandidates + (effect.overwatchYield ?? 0)),
    escaped: Math.max(0, state.escaped + (effect.escaped ?? 0)),
  };
}

export function resolveNovaOperation(params: { state: NovaProspektState; operation: NovaOperation; day: number }): { nova: NovaProspektState; statsDelta: Partial<Stats>; lines: string[] } {
  const { state, operation, day } = params;
  const zone = state.zones.find((item) => item.id === operation.zoneId);
  const entropy = (day * 17 + operation.risk + state.instability + (100 - state.security)) % 101;
  const incident = entropy < operation.risk;
  const transfers = operation.id.includes('transfer') || operation.id.includes('process') ? 90 + (day % 5) * 20 : 0;
  let next = applyNovaEffect(state, operation.effects);

  next = {
    ...next,
    transferredToday: transfers,
    totalTransferred: next.totalTransferred + transfers,
    zones: next.zones.map((item) => item.id === operation.zoneId ? {
      ...item,
      instability: clamp(item.instability + (operation.effects.instability ?? 2) + (incident ? 8 : -2)),
      security: clamp(item.security + (operation.effects.security ?? 0) - (incident ? 5 : 0)),
      secrecy: clamp(item.secrecy + (operation.effects.secrecy ?? 0) - (incident ? 4 : 0)),
      detainees: Math.max(0, item.detainees + transfers - (operation.id.includes('release') ? 24 : 0)),
    } : item),
  };

  if (incident) {
    next = applyNovaEffect(next, { instability: 7, secrecy: -4, suspicion: 5, humaneIndex: -2, escaped: operation.risk > 45 ? 2 : 0 });
  }

  const statsDelta: Partial<Stats> = {
    rebel: operation.effects.rebel ?? 0,
    xen: operation.effects.xen ?? 0,
    fear: operation.effects.fear ?? 0,
    loyalty: operation.effects.loyalty ?? 0,
    production: operation.effects.production ?? 0,
    info: operation.effects.info ?? 0,
    suspicion: (operation.effects.suspicion ?? 0) + (incident ? 5 : 0),
    combineLosses: operation.effects.combineLosses ?? 0,
  };

  const lines = [
    `Nova Prospekt : ${operation.name} exécuté${zone ? ` dans ${zone.name}` : ''}.`,
    operation.description,
    transfers > 0 ? `Transferts traités : ${transfers}. Total complexe : ${next.totalTransferred}.` : 'Aucun convoi de masse traité pendant cette opération.',
    incident ? 'Incident interne : registres instables, résistance passive ou panne de confinement détectée.' : 'Opération classée conforme au protocole.',
  ];

  return { nova: { ...next, log: [...lines, ...next.log].slice(0, 70) }, statsDelta, lines };
}

export function setNovaPolicy(state: NovaProspektState, policyId: string): { nova: NovaProspektState; statsDelta: Partial<Stats>; lines: string[] } {
  const policy = state.policies.find((item) => item.id === policyId) ?? state.policies[0];
  const next = applyNovaEffect({ ...state, activePolicy: policy.id }, policy.effects);
  const statsDelta: Partial<Stats> = {
    rebel: policy.effects.rebel ?? 0,
    xen: policy.effects.xen ?? 0,
    fear: policy.effects.fear ?? 0,
    loyalty: policy.effects.loyalty ?? 0,
    suspicion: policy.effects.suspicion ?? 0,
  };
  const lines = [`Politique Nova Prospekt active : ${policy.name}.`, policy.description];
  return { nova: { ...next, log: [...lines, ...next.log].slice(0, 70) }, statsDelta, lines };
}

export function processNovaProspektDay(state: NovaProspektState, stats: Stats, day: number): { nova: NovaProspektState; statsDelta: Partial<Stats>; lines: string[] } {
  const policy = state.policies.find((item) => item.id === state.activePolicy) ?? state.policies[0];
  const overflow = state.zones.reduce((acc, zone) => acc + Math.max(0, zone.detainees - zone.capacity), 0);
  const stress = Math.round((state.instability + state.xenBreachRisk + overflow * 0.03 + stats.rebel * 0.15 - state.security * 0.12) / 4);
  const incident = (day * 13 + stress + state.secrecy) % 100 < clamp(stress + (100 - state.secrecy) * 0.08, 5, 55);
  const transferIntake = stats.rebel > 55 ? 180 : stats.rebel > 35 ? 110 : stats.fear > 70 ? 70 : 35;
  let next = applyNovaEffect(state, {
    intelligence: Math.round((policy.effects.intelligence ?? 0) * 0.25) + (transferIntake > 100 ? 2 : 0),
    instability: stress > 18 ? 3 : -2,
    secrecy: incident ? -3 : 1,
    humaneIndex: Math.round((policy.effects.humaneIndex ?? 0) * 0.15),
    xenBreachRisk: stats.xen > 60 ? 4 : -1,
  });

  next = {
    ...next,
    transferredToday: transferIntake,
    totalTransferred: next.totalTransferred + transferIntake,
    escaped: next.escaped + (incident && state.security < 55 ? 3 : incident ? 1 : 0),
    zones: next.zones.map((zone) => zone.id === 'intake-rail' ? { ...zone, detainees: Math.min(zone.capacity + 180, zone.detainees + transferIntake), instability: clamp(zone.instability + (transferIntake > 130 ? 5 : 1)) } : zone.id === 'holding-block-a' ? { ...zone, detainees: Math.min(zone.capacity + 260, zone.detainees + Math.ceil(transferIntake * 0.45)), instability: clamp(zone.instability + (overflow > 0 ? 4 : 1)) } : zone),
  };

  const statsDelta: Partial<Stats> = {
    rebel: incident ? 4 : -1,
    fear: Math.ceil(transferIntake / 70),
    loyalty: transferIntake > 120 ? -5 : -1,
    suspicion: incident ? 5 : policy.effects.suspicion ? 1 : 0,
    xen: next.xenBreachRisk > 70 && incident ? 3 : 0,
    combineLosses: incident ? 1 : 0,
  };

  const lines = [
    `Nova Prospekt : ${transferIntake} détenus transférés depuis City selon la politique « ${policy.name} ».`,
    `Complexe : sécurité ${next.security}%, secret ${next.secrecy}%, instabilité ${next.instability}%, index humanité ${next.humaneIndex}%.`,
    incident ? 'Incident Nova Prospekt : contradiction de registre, tentative de fuite ou rupture mineure de confinement.' : 'Nova Prospekt : aucun incident majeur transmis au dossier City.',
    next.xenBreachRisk > 68 ? 'Alerte : l’aile de confinement parasite approche du seuil de rupture.' : 'Confinement parasite sous seuil critique.',
  ];

  return { nova: { ...next, log: [...lines, ...next.log].slice(0, 70) }, statsDelta, lines };
}

export function getNovaAtmosphere(state: NovaProspektState): string {
  if (state.instability > 76) return 'COMPLEXE INSTABLE — sirènes, registres contradictoires, échos de détention et verrouillages successifs.';
  if (state.humaneIndex < 18) return 'TRAITEMENT MAXIMAL — efficacité administrative élevée, coût humain classifié.';
  if (state.secrecy < 35) return 'SECRET COMPROMIS — les familles de City et les cellules Lambda commencent à relier les disparitions.';
  if (state.xenBreachRisk > 65) return 'AILE XEN EN TENSION — humidité organique, cages parasites et procédures de purge préparées.';
  return 'COMPLEXE OPÉRATIONNEL — transferts, interrogatoires, tri biotique et dossiers transhumains sous contrôle apparent.';
}
