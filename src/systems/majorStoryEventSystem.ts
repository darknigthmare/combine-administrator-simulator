import { majorStoryEventDefinitions, majorStoryEventOrder, majorStoryPolicies } from '../data/majorStoryEvents';
import type { GameState, MajorStoryEventId, MajorStoryEventRuntime, MajorStoryEventState, MajorStoryOperation, MajorStoryPolicyId, MajorStoryStage, Sector, Stats } from '../types/game';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const avg = (values: number[]) => values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;
const add = (value: number, delta = 0) => clamp(value + delta);
const safeNum = (value: unknown, fallback = 0) => typeof value === 'number' && Number.isFinite(value) ? value : fallback;

function stageRank(stage: MajorStoryStage) {
  return { dormant: 0, warning: 1, active: 2, climax: 3, contained: 1, failed: 4 }[stage];
}

function stageFromRuntime(event: MajorStoryEventRuntime): MajorStoryStage {
  if (event.containment >= 86 && event.heat < 34) return 'contained';
  if (event.heat >= 92 && event.containment < 32) return 'failed';
  if (event.heat >= 76) return 'climax';
  if (event.heat >= 52) return 'active';
  if (event.heat >= 28) return 'warning';
  return 'dormant';
}

function stageLabel(stage: MajorStoryStage) {
  return {
    dormant: 'dormant',
    warning: 'pré-alerte',
    active: 'actif',
    climax: 'point de rupture',
    contained: 'contenu',
    failed: 'échec narratif',
  }[stage];
}

function applyStats(base: Partial<Stats>, delta: Partial<Stats>, multiplier = 1): Partial<Stats> {
  const output: Partial<Stats> = { ...base };
  for (const [key, value] of Object.entries(delta) as Array<[keyof Stats, number | undefined]>) {
    output[key] = Math.round((output[key] ?? 0) + (value ?? 0) * multiplier) as never;
  }
  return output;
}

function applySectorEffects(sector: Sector, effects?: MajorStoryOperation['sectorEffects']): Sector {
  if (!effects) return sector;
  return {
    ...sector,
    rebel: clamp(sector.rebel + (effects.rebel ?? 0)),
    xen: clamp(sector.xen + (effects.xen ?? 0)),
    surveillance: clamp(sector.surveillance + (effects.surveillance ?? 0)),
    infrastructure: clamp(sector.infrastructure + (effects.infrastructure ?? 0)),
    loyalty: clamp(sector.loyalty + (effects.loyalty ?? 0)),
    fear: clamp(sector.fear + (effects.fear ?? 0)),
    population: Math.max(0, Math.round(sector.population + (effects.population ?? 0))),
    status: effects.status ?? sector.status,
  };
}

function pickSector(preferred: string[], sectors: Sector[], seed = 0): string {
  const match = preferred.map((id) => sectors.find((sector) => sector.id === id)).find(Boolean);
  if (match) return match.id;
  const sorted = [...sectors].sort((a, b) => (b.rebel + b.xen + b.strategicValue) - (a.rebel + a.xen + a.strategicValue));
  return sorted[seed % Math.max(1, sorted.length)]?.id ?? sectors[0]?.id ?? 'admin';
}

function choosePolicy(game: Partial<GameState>): MajorStoryPolicyId {
  if (game.profile === 'sympathizer') return 'sympathizer_misdirection';
  if ((game.stats?.suspicion ?? 0) > 72) return 'advisor_submission';
  if (game.scenario === 'uprising') return 'force_escalation';
  if (game.scenario === 'quarantine') return 'controlled_disclosure';
  if (game.timeline === 'citadel_collapse') return 'classified_delay';
  return 'preventive_censorship';
}

export function isMajorStoryEventAvailable(id: MajorStoryEventId, game: Partial<GameState>) {
  const unlocked = game.uiuxProgression?.unlocked;
  if (!unlocked) return true;
  if (id === 'advisor_arrival') return unlocked.advisor_channel;
  if (id === 'razor_train_loss') return unlocked.rail_network;
  if (id === 'nova_prospekt_escape') return unlocked.nova_prospekt_link;
  if (['major_xen_rift', 'vortigaunt_resonance_burst', 'headcrab_shell_exposure'].includes(id)) return unlocked.xen_bioscan;
  return true;
}

function baseEvent(id: MajorStoryEventId, sectors: Sector[], game: Partial<GameState>, index: number): MajorStoryEventRuntime {
  const def = majorStoryEventDefinitions[id];
  const campaignBoost = def.campaignBias.includes(game.campaign?.activeCampaignId ?? 'custom_city_administration') ? 8 : 0;
  const timelineBoost = def.timelineBias.includes(game.timeline ?? 'pre_hl2') ? 8 : 0;
  const scenarioBoost = (game.scenario === 'uprising' && def.category === 'resistance') || (game.scenario === 'quarantine' && def.category === 'xen') || (game.scenario === 'post_nova' && def.category === 'nova') ? 10 : 0;
  const available = isMajorStoryEventAvailable(id, game);
  const heat = available ? clamp(def.baseHeat + campaignBoost + timelineBoost + scenarioBoost + index % 7 - 8) : 0;
  return {
    id: `major-${id}`,
    eventId: id,
    sectorId: pickSector(def.preferredSectors, sectors, index),
    stage: heat >= 52 ? 'active' : heat >= 28 ? 'warning' : 'dormant',
    heat,
    secrecy: available ? clamp(58 - heat * 0.25 + safeNum(game.stats?.info, 50) * 0.22) : 100,
    containment: available ? clamp(48 + safeNum(game.stats?.combine, 50) * 0.18 + safeNum(game.stats?.info, 50) * 0.12 - heat * 0.18) : 100,
    publicAwareness: available ? clamp(heat * 0.45 + safeNum(game.stats?.fatigue, 40) * 0.18 - safeNum(game.stats?.info, 50) * 0.1) : 0,
    advisorAttention: available ? clamp(heat * 0.25 + safeNum(game.stats?.suspicion, 0) * 0.35) : 0,
    lambdaOpportunity: available ? clamp(heat * 0.22 + safeNum(game.stats?.rebel, 0) * 0.25) : 0,
    xenInstability: available ? clamp(heat * 0.18 + safeNum(game.stats?.xen, 0) * 0.28) : 0,
    daysInStage: 0,
    lastReport: available ? `${def.combineLabel} surveillé : ${def.warningSigns[0]}` : 'Dossier classifié : autorisation supérieure requise.',
  };
}

function eventPressure(id: MajorStoryEventId, game: Partial<GameState>, sectors: Sector[]): number {
  const stats = game.stats ?? { stability: 50, loyalty: 50, fear: 50, rebel: 20, xen: 20, combine: 50, production: 50, rations: 3000, citadel: 50, info: 50, fatigue: 35, civilianLosses: 0, combineLosses: 0, suspicion: 0 };
  const sectorRisk = avg(sectors.map((sector) => sector.rebel * 0.35 + sector.xen * 0.35 + (100 - sector.infrastructure) * 0.2 + sector.fear * 0.1));
  switch (id) {
    case 'advisor_arrival':
      return clamp(stats.suspicion * 0.72 + (game.auditHeat ?? 0) * 0.32 + (100 - stats.citadel) * 0.18 + (game.campaignMission?.failureRisk ?? 0) * 0.18 + safeNum(game.majorStoryEvents?.advisorNarrativePressure, 0) * 0.08);
    case 'breencast_relay_blast':
      return clamp(stats.rebel * 0.45 + (100 - stats.info) * 0.32 + stats.fatigue * 0.25 + (game.resistanceNetwork?.radioFreedom ?? 0) * 0.18);
    case 'razor_train_loss':
      return clamp(stats.rebel * 0.28 + stats.xen * 0.18 + (game.novaProspekt?.instability ?? 0) * 0.28 + (game.quarantineZones?.publicContradictionRisk ?? 0) * 0.18 + sectorRisk * 0.12);
    case 'nova_prospekt_escape':
      return clamp((game.novaProspekt?.instability ?? 0) * 0.55 + (game.novaProspekt?.escaped ?? 0) * 4 + (game.vortigaunts?.bioticPressure ?? 0) * 0.25 + (game.resistanceFactions?.novaMartyrdom ?? 0) * 0.34 + stats.suspicion * 0.12);
    case 'civil_protection_mutiny':
      return clamp((game.civilProtection?.corruptionIndex ?? 0) * 0.3 + (100 - (game.civilProtection?.moraleIndex ?? 50)) * 0.35 + (game.civilProtection?.lambdaInfiltration ?? 0) * 0.38 + stats.fatigue * 0.16);
    case 'major_xen_rift':
      return clamp(stats.xen * 0.5 + (game.xenEcosystem?.networkSpread ?? 0) * 0.24 + (game.xenMutation?.outbreakRisk ?? 0) * 0.22 + (game.xenResearch?.labIncidentRisk ?? 0) * 0.16 + (game.xenCatastrophes?.citywideRisk ?? 0) * 0.22);
    case 'lambda_coordinated_assault':
      return clamp(stats.rebel * 0.56 + (game.resistanceNetwork?.simultaneousOpsRisk ?? 0) * 0.3 + (game.resistanceFactions?.armedMobilization ?? 0) * 0.25 + (100 - (game.civilProtection?.disciplineIndex ?? 50)) * 0.16);
    case 'citadel_blackout':
      return clamp((100 - stats.citadel) * 0.52 + (game.combineTechnology?.maintenanceDebt ?? 0) * 0.24 + (100 - stats.production) * 0.16 + stats.rebel * 0.14 + safeNum(game.majorStoryEvents?.blackoutRisk, 0) * 0.08);
    case 'vortigaunt_resonance_burst':
      return clamp((game.vortigaunts?.vortessenceCoherence ?? 0) * 0.42 + (game.vortigaunts?.escapeRisk ?? 0) * 0.24 + (game.resistanceFactions?.vortigauntDiplomacy ?? 0) * 0.32 + stats.xen * 0.1);
    case 'headcrab_shell_exposure':
      return clamp((game.xenResearch?.weaponizationIndex ?? 0) * 0.34 + (game.xenResearch?.labIncidentRisk ?? 0) * 0.24 + (game.xenCatastrophes?.ravenholmProbability ?? 0) * 0.35 + stats.xen * 0.24 + (game.quarantineZones?.ravenholmLikeCount ?? 0) * 12);
    default:
      return sectorRisk;
  }
}

function updateEvent(event: MajorStoryEventRuntime, delta: MajorStoryOperation['eventEffects'] & { heatDelta?: number }, policyBias = 0): MajorStoryEventRuntime {
  const updated: MajorStoryEventRuntime = {
    ...event,
    heat: add(event.heat, (delta.heat ?? 0) + (delta.heatDelta ?? 0) + policyBias),
    secrecy: add(event.secrecy, (delta.secrecy ?? 0) + (delta.secrecyDelta ?? 0)),
    containment: add(event.containment, (delta.containment ?? 0) + (delta.containmentDelta ?? 0)),
    publicAwareness: add(event.publicAwareness, (delta.publicAwareness ?? 0) + (delta.publicAwarenessDelta ?? 0)),
    advisorAttention: add(event.advisorAttention, (delta.advisorAttention ?? 0) + (delta.advisorAttentionDelta ?? 0)),
    lambdaOpportunity: add(event.lambdaOpportunity, (delta.lambdaOpportunity ?? 0) + (delta.lambdaOpportunityDelta ?? 0)),
    xenInstability: add(event.xenInstability, (delta.xenInstability ?? 0) + (delta.xenInstabilityDelta ?? 0)),
  };
  return { ...updated, stage: stageFromRuntime(updated) };
}

function summarize(activePolicy: MajorStoryPolicyId, events: MajorStoryEventRuntime[], log: string[], previous?: Partial<MajorStoryEventState>, lastMajorEvent?: string): MajorStoryEventState {
  const unresolved = events.filter((event) => ['warning', 'active', 'climax', 'failed'].includes(event.stage)).length;
  const hottest = [...events].sort((a, b) => (stageRank(b.stage) * 100 + b.heat + b.publicAwareness) - (stageRank(a.stage) * 100 + a.heat + a.publicAwareness))[0];
  const citywideHeat = clamp(avg(events.map((event) => event.heat)) + unresolved * 2);
  const advisorNarrativePressure = clamp(avg(events.map((event) => event.advisorAttention)) + (previous?.advisorNarrativePressure ?? 0) * 0.05);
  const publicContradiction = clamp(avg(events.map((event) => event.publicAwareness + (100 - event.secrecy) * 0.25)) + (previous?.publicContradiction ?? 0) * 0.04);
  const lambdaNarrativeMomentum = clamp(avg(events.map((event) => event.lambdaOpportunity)) + (previous?.lambdaNarrativeMomentum ?? 0) * 0.04);
  const xenNarrativePressure = clamp(avg(events.map((event) => event.xenInstability)) + (previous?.xenNarrativePressure ?? 0) * 0.04);
  const blackoutRisk = clamp(events.find((event) => event.eventId === 'citadel_blackout')?.heat ?? previous?.blackoutRisk ?? 0);
  return {
    activePolicy,
    events,
    currentArcId: hottest ? hottest.eventId : null,
    citywideHeat,
    unresolvedMajorEvents: unresolved,
    advisorNarrativePressure,
    publicContradiction,
    lambdaNarrativeMomentum,
    xenNarrativePressure,
    blackoutRisk,
    lastMajorEvent: lastMajorEvent || (hottest ? `${stageLabel(hottest.stage)} : ${majorStoryEventDefinitions[hottest.eventId].title} / ${hottest.sectorId}` : 'Aucun arc majeur actif.'),
    log: log.slice(0, 120),
  };
}

export function createInitialMajorStoryEventState({ game, sectors, stats }: { game: Partial<GameState>; sectors?: Sector[]; stats?: Stats }): MajorStoryEventState {
  const localGame = { ...game, stats: stats ?? game.stats };
  const eventSectors = sectors ?? game.sectors ?? [];
  const activePolicy = choosePolicy(localGame);
  const events = majorStoryEventOrder.map((id, index) => baseEvent(id, eventSectors, localGame, index));
  return summarize(activePolicy, events, [
    `Major Story Director initialisé : ${events.length} jalons scénarisés surveillés.`,
    `Doctrine active : ${majorStoryPolicies.find((policy) => policy.id === activePolicy)?.name ?? activePolicy}.`,
  ]);
}

export function migrateMajorStoryEventState(game: Partial<GameState>): MajorStoryEventState {
  if (game.majorStoryEvents?.events?.length) {
    return summarize(game.majorStoryEvents.activePolicy ?? choosePolicy(game), game.majorStoryEvents.events, game.majorStoryEvents.log ?? [], game.majorStoryEvents, game.majorStoryEvents.lastMajorEvent);
  }
  return createInitialMajorStoryEventState({ game, sectors: game.sectors, stats: game.stats });
}

export function setMajorStoryPolicy(state: MajorStoryEventState, policyId: MajorStoryPolicyId): { majorStoryEvents: MajorStoryEventState; statsDelta: Partial<Stats>; lines: string[] } {
  const policy = majorStoryPolicies.find((item) => item.id === policyId) ?? majorStoryPolicies[0];
  const events = state.events.map((event) => updateEvent(event, {
    heatDelta: policy.heatBias,
    secrecyDelta: policy.secrecyBias,
    containmentDelta: policy.containmentBias,
    advisorAttentionDelta: policy.advisorRisk,
    publicAwarenessDelta: -Math.round(policy.secrecyBias * 0.4),
  }));
  const next = summarize(policy.id, events, [
    `Major Story Director : doctrine active — ${policy.name}.`,
    `Masque public : ${policy.publicLine}`,
    ...state.log,
  ], state);
  return { majorStoryEvents: next, statsDelta: policy.effects, lines: next.log.slice(0, 3) };
}

export function resolveMajorStoryOperation({ state, operation, sectors, selectedEventId, selectedSectorId, stats, day }: { state: MajorStoryEventState; operation: MajorStoryOperation; sectors: Sector[]; selectedEventId?: string; selectedSectorId?: string; stats: Stats; day: number }): { majorStoryEvents: MajorStoryEventState; sectors: Sector[]; statsDelta: Partial<Stats>; lines: string[] } {
  const target = state.events.find((event) => event.id === selectedEventId || event.eventId === selectedEventId) ?? [...state.events].sort((a, b) => (stageRank(b.stage) * 100 + b.heat) - (stageRank(a.stage) * 100 + a.heat))[0];
  const targetSectorId = selectedSectorId ?? target?.sectorId ?? sectors[0]?.id;
  const applyToAll = operation.target === 'citywide';
  const lines = [`Major Story Director : ${operation.name} — ${operation.logLine}`];
  const events = state.events.map((event) => {
    const isTarget = applyToAll || event.id === target?.id || event.eventId === target?.eventId || (operation.target === 'sector' && event.sectorId === targetSectorId);
    if (!isTarget) return updateEvent(event, { heatDelta: Math.round(operation.risk * 0.015) });
    const updated = updateEvent(event, operation.eventEffects);
    return { ...updated, lastReport: lines[0] };
  });
  const nextSectors = sectors.map((sector) => {
    if (applyToAll) {
      const intensity = sector.id === targetSectorId ? 1 : 0.35;
      const scaled = operation.sectorEffects ? Object.fromEntries(Object.entries(operation.sectorEffects).map(([key, value]) => [key, typeof value === 'number' ? Math.round(value * intensity) : value])) as MajorStoryOperation['sectorEffects'] : operation.sectorEffects;
      return applySectorEffects(sector, scaled);
    }
    return sector.id === targetSectorId ? applySectorEffects(sector, operation.sectorEffects) : sector;
  });
  const riskRoll = (day * 61 + operation.risk + stats.suspicion + state.citywideHeat) % 100;
  if (riskRoll < Math.max(8, operation.risk * 0.35)) {
    lines.push('Contre-effet : l’opération a laissé une contradiction dans les archives civiles ou Citadel.');
  }
  const next = summarize(state.activePolicy, events, [...lines, ...state.log], state, lines[0]);
  return {
    majorStoryEvents: next,
    sectors: nextSectors,
    statsDelta: applyStats({ ...operation.cost }, { ...operation.effects, suspicion: riskRoll < operation.risk ? 3 : 0 }),
    lines: next.log.slice(0, 5),
  };
}

export function simulateMajorStoryEventDay({ state, game, sectors, stats, day }: { state: MajorStoryEventState; game: Partial<GameState>; sectors: Sector[]; stats: Stats; day: number }): { majorStoryEvents: MajorStoryEventState; sectors: Sector[]; statsDelta: Partial<Stats>; lines: string[] } {
  const policy = majorStoryPolicies.find((item) => item.id === state.activePolicy) ?? majorStoryPolicies[0];
  let nextSectors = sectors.map((sector) => ({ ...sector }));
  let statsDelta: Partial<Stats> = {};
  const lines: string[] = [];
  const events = state.events.map((event, index) => {
    const def = majorStoryEventDefinitions[event.eventId];
    if (!isMajorStoryEventAvailable(event.eventId, game)) return {
      ...event,
      stage: 'dormant' as const,
      heat: 0,
      containment: 100,
      secrecy: 100,
      publicAwareness: 0,
      advisorAttention: 0,
      lambdaOpportunity: 0,
      xenInstability: 0,
      daysInStage: 0,
    };
    const pressure = eventPressure(event.eventId, { ...game, stats, sectors: nextSectors, majorStoryEvents: state }, nextSectors);
    const previousStage = event.stage;
    const pressureDelta = Math.round((pressure - event.heat) * 0.14 + def.escalationRate * 0.05 + policy.heatBias * 0.12);
    const containmentDelta = Math.round(policy.containmentBias * 0.09 + stats.combine * 0.02 + stats.info * 0.016 - pressure * 0.03);
    const secrecyDelta = Math.round(policy.secrecyBias * 0.08 + stats.info * 0.012 - event.publicAwareness * 0.035 - pressure * 0.012);
    let updated = updateEvent(event, {
      heatDelta: pressureDelta + (index % 4 === day % 4 ? 1 : 0),
      containmentDelta,
      secrecyDelta,
      publicAwarenessDelta: Math.round(pressure * 0.025 - event.secrecy * 0.015 + stats.fatigue * 0.01),
      advisorAttentionDelta: Math.round(pressure * 0.02 + policy.advisorRisk * 0.04 + stats.suspicion * 0.01),
      lambdaOpportunityDelta: Math.round((pressure + stats.rebel) * 0.018 - stats.info * 0.01),
      xenInstabilityDelta: Math.round((pressure + stats.xen) * 0.014),
    });
    updated.daysInStage = updated.stage === previousStage ? event.daysInStage + 1 : 0;
    if (stageRank(updated.stage) > stageRank(previousStage)) {
      const sectorName = nextSectors.find((sector) => sector.id === updated.sectorId)?.name ?? updated.sectorId;
      const stageLine = `Événement majeur : ${def.title} passe en ${stageLabel(updated.stage)} dans ${sectorName}. ${def.narrativePayoff}`;
      updated = { ...updated, triggeredDay: updated.triggeredDay ?? day, lastReport: stageLine };
      lines.push(stageLine);
      const multiplier = updated.stage === 'climax' || updated.stage === 'failed' ? 1 : 0.45;
      statsDelta = applyStats(statsDelta, def.statsEffects, multiplier);
      if (stageRank(updated.stage) >= 2) {
        nextSectors = nextSectors.map((sector) => sector.id === updated.sectorId ? applySectorEffects(sector, def.sectorEffects) : sector);
      }
    }
    if (updated.stage === 'contained' && previousStage !== 'contained') {
      const line = `Événement majeur contenu : ${def.title}. La version officielle reste : ${policy.publicLine}`;
      updated = { ...updated, resolvedDay: day, lastReport: line };
      lines.push(line);
      statsDelta = applyStats(statsDelta, { stability: 3, suspicion: policy.advisorRisk > 10 ? 3 : -2 });
    }
    return updated;
  });
  const next = summarize(state.activePolicy, events, [...lines, ...state.log], state, lines[0]);
  const systemicDelta: Partial<Stats> = {
    stability: next.citywideHeat > 70 ? -4 : next.citywideHeat < 30 ? 2 : 0,
    suspicion: Math.round(next.advisorNarrativePressure * 0.015 + next.publicContradiction * 0.012),
    rebel: Math.round(next.lambdaNarrativeMomentum * 0.015),
    xen: Math.round(next.xenNarrativePressure * 0.012),
    info: next.publicContradiction > 65 ? -2 : 0,
  };
  statsDelta = applyStats(statsDelta, systemicDelta);
  const reportLines = lines.length ? lines : [`Major Story Director : aucun jalon majeur n’a changé de stade. Arc le plus chaud : ${next.lastMajorEvent}.`];
  return { majorStoryEvents: next, sectors: nextSectors, statsDelta, lines: reportLines.slice(0, 8) };
}

export function getMajorStoryStageRank(stage: MajorStoryStage) {
  return stageRank(stage);
}

export function getMajorStoryStageLabel(stage: MajorStoryStage) {
  return stageLabel(stage);
}
