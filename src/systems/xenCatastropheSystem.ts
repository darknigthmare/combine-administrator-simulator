import type { GameState, NovaProspektState, QuarantineZoneState, Sector, Stats, VortigauntState, XenCatastropheEventState, XenCatastropheOperation, XenCatastrophePolicyId, XenCatastropheStage, XenCatastropheState, XenEcosystemState, XenMutationState, XenResearchState } from '../types/game';
import { xenCatastropheDefinitions, xenCatastropheOrder, xenCatastrophePolicies } from '../data/xenCatastrophes';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const add = (value: number, delta = 0, min = 0, max = 100) => clamp(value + delta, min, max);

function avg(values: number[]) {
  if (!values.length) return 0;
  return clamp(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function choosePolicy(profile: string, scenario: string, timeline: string): XenCatastrophePolicyId {
  if (profile === 'sympathizer') return 'public_health_mask';
  if (profile === 'quarantine') return 'preventive_lockdown';
  if (profile === 'tyrant') return 'sacrifice_sector';
  if (scenario === 'uprising') return 'weaponize_catastrophe';
  if (scenario === 'quarantine') return 'contain_and_classify';
  if (timeline === 'citadel_collapse') return 'vortessence_emergency_read';
  return 'preventive_lockdown';
}

function stageRank(stage: XenCatastropheStage) {
  return { watch: 0, warning: 1, active: 2, citywide: 3, catastrophic: 4 }[stage];
}

function stageFromEvent(event: Pick<XenCatastropheEventState, 'probability' | 'intensity' | 'containment' | 'civilianExposure'>): XenCatastropheStage {
  const rupture = event.probability * 0.36 + event.intensity * 0.42 + event.civilianExposure * 0.16 - event.containment * 0.32;
  if (rupture >= 76 || (event.intensity > 88 && event.containment < 20)) return 'catastrophic';
  if (rupture >= 58 || event.intensity > 74) return 'citywide';
  if (rupture >= 40 || event.intensity > 54) return 'active';
  if (rupture >= 22 || event.probability > 42) return 'warning';
  return 'watch';
}

function stageLabel(stage: XenCatastropheStage) {
  const labels: Record<XenCatastropheStage, string> = {
    watch: 'Surveillance',
    warning: 'Pré-alerte',
    active: 'Incident actif',
    citywide: 'Crise urbaine',
    catastrophic: 'Catastrophe',
  };
  return labels[stage];
}

function applySectorEffects(sector: Sector, effects?: XenCatastropheOperation['sectorEffects'] | typeof xenCatastropheDefinitions[keyof typeof xenCatastropheDefinitions]['sectorEffects']): Sector {
  if (!effects) return sector;
  return {
    ...sector,
    population: Math.max(0, Math.round(sector.population + (effects.population ?? 0))),
    xen: add(sector.xen, effects.xen ?? 0),
    rebel: add(sector.rebel, effects.rebel ?? 0),
    surveillance: add(sector.surveillance, effects.surveillance ?? 0),
    infrastructure: add(sector.infrastructure, effects.infrastructure ?? 0),
    loyalty: add(sector.loyalty, effects.loyalty ?? 0),
    fear: add(sector.fear, effects.fear ?? 0),
    status: effects.status ?? sector.status,
  };
}

function definitionPressure(defId: XenCatastropheEventState['catastropheId'], params: { sectors: Sector[]; ecosystem?: XenEcosystemState; mutation?: XenMutationState; quarantine?: QuarantineZoneState; research?: XenResearchState; nova?: NovaProspektState; vortigaunts?: VortigauntState; stats?: Stats }) {
  const def = xenCatastropheDefinitions[defId];
  const layerPressure = avg((params.ecosystem?.layers ?? [])
    .filter((layer) => def.relatedLayers.includes(layer.layerId))
    .map((layer) => layer.biomass * 0.28 + layer.activity * 0.22 + layer.spread * 0.18 + layer.mutationPressure * 0.22 + layer.humanExposure * 0.1));
  const chainPressure = avg((params.mutation?.chains ?? [])
    .filter((chain) => def.relatedChains.includes(chain.chainId))
    .map((chain) => chain.progress * 0.24 + chain.triggerPressure * 0.2 + chain.conversionLoad * 0.2 + chain.mutationLoad * 0.24 + (stageRank(chain.stage === 'catastrophic' ? 'catastrophic' : chain.stage === 'outbreak' ? 'citywide' : chain.stage === 'accelerating' ? 'active' : chain.stage === 'triggered' ? 'warning' : 'watch') * 6)));
  const researchPressure = avg((params.research?.programs ?? [])
    .filter((program) => def.relatedResearch.includes(program.programId))
    .map((program) => program.progress * 0.18 + program.liveSpecimens * 0.2 + program.weaponization * 0.24 + (100 - program.containment) * 0.22 + program.advisorFlag * 0.1));
  const quarantinePressure = (params.quarantine?.biologicalExclusionIndex ?? 0) * 0.2 + (params.quarantine?.ravenholmMemoryIndex ?? 0) * 0.18 + (params.quarantine?.publicContradictionRisk ?? 0) * 0.12;
  const novaPressure = defId === 'nova_specimen_escape' ? ((params.nova?.instability ?? 0) * 0.35 + (params.nova?.xenBreachRisk ?? 0) * 0.35 + (params.nova?.bioticsPressure ?? 0) * 0.12) : 0;
  const researchBackfire = defId === 'headcrab_shell_backfire' ? ((params.research?.bioweaponReadiness ?? 0) * 0.28 + (params.research?.parasiteStock ?? 0) * 0.08 + (params.stats?.suspicion ?? 0) * 0.1) : 0;
  const preferredSectorPressure = avg(params.sectors.filter((sector) => def.preferredZones.includes(sector.zone)).map((sector) => sector.xen * 0.35 + (100 - sector.infrastructure) * 0.2 + sector.fear * 0.08 + (sector.status === 'Infesté' ? 12 : sector.status === 'En quarantaine' ? 8 : 0)));
  const vortMitigation = (params.vortigaunts?.xenInsight ?? 0) * 0.05 + (params.vortigaunts?.quarantineAid ?? 0) * 0.05;
  return clamp(layerPressure * 0.28 + chainPressure * 0.26 + researchPressure * 0.2 + quarantinePressure * 0.16 + preferredSectorPressure * 0.16 + novaPressure + researchBackfire - vortMitigation + def.baseSeverity * 2);
}

function pickSectorFor(defId: XenCatastropheEventState['catastropheId'], sectors: Sector[], index: number): string {
  const def = xenCatastropheDefinitions[defId];
  const candidates = sectors.filter((sector) => def.preferredZones.includes(sector.zone));
  const pool = candidates.length ? candidates : sectors;
  return [...pool].sort((a, b) => (b.xen + (100 - b.infrastructure) * 0.45 + b.fear * 0.2) - (a.xen + (100 - a.infrastructure) * 0.45 + a.fear * 0.2))[index % Math.max(1, pool.length)]?.id ?? sectors[0]?.id ?? 'admin';
}

function createEvent(defId: XenCatastropheEventState['catastropheId'], index: number, params: { sectors: Sector[]; ecosystem?: XenEcosystemState; mutation?: XenMutationState; quarantine?: QuarantineZoneState; research?: XenResearchState; nova?: NovaProspektState; vortigaunts?: VortigauntState; stats?: Stats }): XenCatastropheEventState {
  const pressure = definitionPressure(defId, params);
  const sectorId = pickSectorFor(defId, params.sectors, index);
  const event: XenCatastropheEventState = {
    id: `xcat-${defId}`,
    catastropheId: defId,
    sectorId,
    stage: 'watch',
    probability: clamp(6 + pressure * 0.5),
    intensity: clamp(pressure * 0.34),
    containment: clamp(72 - pressure * 0.18 + ((params.stats?.combine ?? 0) + (params.stats?.info ?? 0)) * 0.08),
    civilianExposure: clamp(pressure * 0.42 + ((params.stats?.fatigue ?? 0) * 0.08)),
    combineCommitment: clamp(18 + (params.stats?.combine ?? 0) * 0.22),
    publicCover: clamp(36 + (params.stats?.info ?? 0) * 0.24 - pressure * 0.12),
    discovered: pressure > 36,
    daysActive: 0,
    lastReport: `${xenCatastropheDefinitions[defId].combineLabel} — ${xenCatastropheDefinitions[defId].visibleSign}`,
  };
  return { ...event, stage: stageFromEvent(event) };
}

function summarize(activePolicy: XenCatastrophePolicyId, events: XenCatastropheEventState[], log: string[], previous?: Partial<XenCatastropheState>, lastCatastrophe?: string): XenCatastropheState {
  const activeEventCount = events.filter((event) => stageRank(event.stage) >= 2).length;
  const totalCatastropheRisk = avg(events.map((event) => event.probability * 0.42 + event.intensity * 0.38 + (100 - event.containment) * 0.2));
  const citywideRisk = avg(events.map((event) => stageRank(event.stage) * 16 + event.intensity * 0.35 + (100 - event.containment) * 0.12));
  const advisorEmergency = clamp(avg(events.map((event) => event.intensity * 0.22 + (100 - event.publicCover) * 0.18 + stageRank(event.stage) * 8)) + (previous?.advisorEmergency ?? 0) * 0.08);
  const infrastructureCollapse = avg(events.map((event) => {
    const def = xenCatastropheDefinitions[event.catastropheId];
    return event.intensity * 0.25 + Math.abs(def.sectorEffects.infrastructure ?? 0) * 0.55 + stageRank(event.stage) * 6;
  }));
  const xenPanic = avg(events.map((event) => event.civilianExposure * 0.3 + event.intensity * 0.24 + stageRank(event.stage) * 9));
  const containmentDebt = avg(events.map((event) => (100 - event.containment) * 0.5 + event.combineCommitment * 0.12 + stageRank(event.stage) * 7));
  const ravenholmProbability = clamp(avg(events.map((event) => {
    const def = xenCatastropheDefinitions[event.catastropheId];
    const ravenholmBias = ['headcrab_shell_backfire', 'hospital_nest_conversion', 'gonarch_reproductive_alarm'].includes(def.id) ? 18 : 0;
    return event.intensity * 0.22 + event.civilianExposure * 0.25 + (100 - event.containment) * 0.22 + ravenholmBias;
  })));
  const top = [...events].sort((a, b) => (stageRank(b.stage) * 100 + b.intensity + b.probability) - (stageRank(a.stage) * 100 + a.intensity + a.probability))[0];
  return {
    activePolicy,
    events,
    totalCatastropheRisk,
    activeEventCount,
    citywideRisk,
    advisorEmergency,
    infrastructureCollapse,
    xenPanic,
    containmentDebt,
    ravenholmProbability,
    lastCatastrophe: lastCatastrophe || (top ? `${stageLabel(top.stage)} : ${xenCatastropheDefinitions[top.catastropheId].name} dans ${top.sectorId}` : 'Aucune catastrophe Xen active.'),
    log: log.slice(0, 100),
  };
}

export function createInitialXenCatastropheState({ scenario, profile, timeline, sectors, ecosystem, mutation, quarantine, research, nova, vortigaunts, stats }: { scenario: string; profile: string; timeline: string; sectors: Sector[]; ecosystem?: XenEcosystemState; mutation?: XenMutationState; quarantine?: QuarantineZoneState; research?: XenResearchState; nova?: NovaProspektState; vortigaunts?: VortigauntState; stats?: Stats }): XenCatastropheState {
  const activePolicy = choosePolicy(profile, scenario, timeline);
  const events = xenCatastropheOrder.map((defId, index) => createEvent(defId, index, { sectors, ecosystem, mutation, quarantine, research, nova, vortigaunts, stats }));
  return summarize(activePolicy, events, [
    `Catastrophe Watch initialisé : ${events.length} scénarios de rupture Xen suivis.`,
    `Doctrine active : ${xenCatastrophePolicies.find((policy) => policy.id === activePolicy)?.name ?? activePolicy}.`,
  ]);
}

export function migrateXenCatastropheState(game: Partial<GameState>): XenCatastropheState {
  if (game.xenCatastrophes?.events) {
    return summarize(game.xenCatastrophes.activePolicy ?? 'preventive_lockdown', game.xenCatastrophes.events, game.xenCatastrophes.log ?? [], game.xenCatastrophes, game.xenCatastrophes.lastCatastrophe);
  }
  return createInitialXenCatastropheState({
    scenario: game.scenario ?? 'standard',
    profile: game.profile ?? 'loyalist',
    timeline: game.timeline ?? 'pre_hl2',
    sectors: game.sectors ?? [],
    ecosystem: game.xenEcosystem,
    mutation: game.xenMutation,
    quarantine: game.quarantineZones,
    research: game.xenResearch,
    nova: game.novaProspekt,
    vortigaunts: game.vortigaunts,
    stats: game.stats,
  });
}

function applyEventDelta(event: XenCatastropheEventState, delta: XenCatastropheOperation['eventEffects'] & { probabilityDelta?: number; intensityDelta?: number; containmentDelta?: number; civilianExposureDelta?: number; publicCoverDelta?: number; combineCommitmentDelta?: number }, direct = 0): XenCatastropheEventState {
  const updated: XenCatastropheEventState = {
    ...event,
    probability: add(event.probability, (delta.probability ?? 0) + (delta.probabilityDelta ?? 0) + direct),
    intensity: add(event.intensity, (delta.intensity ?? 0) + (delta.intensityDelta ?? 0)),
    containment: add(event.containment, (delta.containment ?? 0) + (delta.containmentDelta ?? 0)),
    civilianExposure: add(event.civilianExposure, (delta.civilianExposure ?? 0) + (delta.civilianExposureDelta ?? 0)),
    combineCommitment: add(event.combineCommitment, (delta.combineCommitment ?? 0) + (delta.combineCommitmentDelta ?? 0)),
    publicCover: add(event.publicCover, (delta.publicCover ?? 0) + (delta.publicCoverDelta ?? 0)),
    discovered: delta.discovered ?? event.discovered,
  };
  return { ...updated, stage: stageFromEvent(updated) };
}

export function setXenCatastrophePolicy(state: XenCatastropheState, policyId: XenCatastrophePolicyId): { xenCatastrophes: XenCatastropheState; statsDelta: Partial<Stats>; lines: string[] } {
  const policy = xenCatastrophePolicies.find((item) => item.id === policyId) ?? xenCatastrophePolicies[0];
  const events = state.events.map((event) => applyEventDelta(event, {
    containmentDelta: policy.containmentBias,
    publicCoverDelta: policy.secrecyBias,
    civilianExposureDelta: policy.sacrificeBias > 0 ? -Math.round(policy.sacrificeBias * 0.4) : Math.round(policy.sacrificeBias * 0.3),
    intensityDelta: policy.sacrificeBias > 8 ? 4 : policy.containmentBias > 8 ? -3 : 0,
  }));
  const summary = summarize(policy.id, events, [
    `Catastrophe Watch : doctrine active — ${policy.name}.`,
    `Masque public : ${policy.publicLine}`,
    ...state.log,
  ], state);
  return { xenCatastrophes: summary, statsDelta: policy.effects, lines: summary.log.slice(0, 2) };
}

export function resolveXenCatastropheOperation({ state, operation, sectors, selectedEventId, selectedSectorId, stats, day }: { state: XenCatastropheState; operation: XenCatastropheOperation; sectors: Sector[]; selectedEventId?: string; selectedSectorId?: string; stats: Stats; day: number }): { xenCatastrophes: XenCatastropheState; sectors: Sector[]; statsDelta: Partial<Stats>; lines: string[] } {
  const target = state.events.find((event) => event.id === selectedEventId) ?? [...state.events].sort((a, b) => (stageRank(b.stage) * 100 + b.intensity) - (stageRank(a.stage) * 100 + a.intensity))[0];
  const targetSectorId = selectedSectorId ?? target?.sectorId ?? sectors[0]?.id;
  const applyToAll = operation.target === 'network';
  const lines = [`Catastrophe Watch : ${operation.name} — ${operation.logLine}`];
  const events = state.events.map((event) => {
    const isTarget = applyToAll || event.id === target?.id || (operation.target === 'sector' && event.sectorId === targetSectorId);
    if (!isTarget) return applyEventDelta(event, { probabilityDelta: Math.round(operation.risk * 0.02) });
    return applyEventDelta(event, operation.eventEffects);
  });
  const nextSectors = sectors.map((sector) => sector.id === targetSectorId ? applySectorEffects(sector, operation.sectorEffects) : sector);
  const riskRoll = (day * 47 + operation.risk + stats.xen + state.totalCatastropheRisk) % 100;
  if (riskRoll < Math.max(5, operation.risk * 0.25 + state.totalCatastropheRisk * 0.08)) {
    lines.push('Contre-effet : le protocole a rendu la crise visible dans au moins un registre civil ou biologique.');
  }
  const summary = summarize(state.activePolicy, events, [...lines, ...state.log], state, lines[0]);
  return { xenCatastrophes: summary, sectors: nextSectors, statsDelta: { ...operation.cost, ...operation.effects, suspicion: (operation.cost.suspicion ?? 0) + (riskRoll < operation.risk ? 2 : 0) }, lines: summary.log.slice(0, 4) };
}

export function simulateXenCatastropheDay({ state, sectors, stats, ecosystem, mutation, quarantine, research, nova, vortigaunts, day: _day }: { state: XenCatastropheState; sectors: Sector[]; stats: Stats; ecosystem?: XenEcosystemState; mutation?: XenMutationState; quarantine?: QuarantineZoneState; research?: XenResearchState; nova?: NovaProspektState; vortigaunts?: VortigauntState; day: number }): { xenCatastrophes: XenCatastropheState; sectors: Sector[]; statsDelta: Partial<Stats>; lines: string[] } {
  const policy = xenCatastrophePolicies.find((item) => item.id === state.activePolicy) ?? xenCatastrophePolicies[0];
  let nextSectors = sectors.map((sector) => ({ ...sector }));
  let statsDelta: Partial<Stats> = {};
  const escalationLines: string[] = [];
  const events = state.events.map((event, index) => {
    const def = xenCatastropheDefinitions[event.catastropheId];
    const pressure = definitionPressure(event.catastropheId, { sectors: nextSectors, ecosystem, mutation, quarantine, research, nova, vortigaunts, stats });
    const previousStage = event.stage;
    const pressureDelta = Math.round((pressure - event.probability) * 0.12);
    const containmentDrift = Math.round(policy.containmentBias * 0.09 + stats.combine * 0.025 + stats.info * 0.018 - pressure * 0.04 - (research?.labIncidentRisk ?? 0) * 0.02);
    const intensityDrift = Math.round(pressure * 0.045 - event.containment * 0.025 + policy.sacrificeBias * 0.035 + (research?.weaponizationIndex ?? 0) * 0.012);
    let updated = applyEventDelta(event, {
      probabilityDelta: pressureDelta + Math.round((stats.xen - 45) * 0.02),
      intensityDelta: intensityDrift,
      containmentDelta: containmentDrift,
      civilianExposureDelta: Math.round((stats.fatigue + stats.fear) * 0.01 - event.containment * 0.01 + (policy.humaneCost > 10 ? 1 : 0)),
      publicCoverDelta: Math.round(policy.secrecyBias * 0.07 + stats.info * 0.015 - updatedPublicPressure(event) * 0.02),
      combineCommitmentDelta: Math.round(stats.combine * 0.012 + policy.containmentBias * 0.02),
    }, index % 3 === 0 ? 1 : 0);
    updated.daysActive = stageRank(updated.stage) >= 2 ? event.daysActive + 1 : Math.max(0, event.daysActive - 1);
    if (stageRank(updated.stage) > stageRank(previousStage)) {
      const sectorName = nextSectors.find((sector) => sector.id === updated.sectorId)?.name ?? updated.sectorId;
      escalationLines.push(`${def.combineLabel} : ${stageLabel(previousStage)} → ${stageLabel(updated.stage)} dans ${sectorName}. ${def.visibleSign}`);
      const severityScale = stageRank(updated.stage) / 4;
      const scaledStats = scaleStats(def.statsEffects, 0.35 + severityScale * 0.45);
      statsDelta = applyStatsToDelta(statsDelta, scaledStats);
      nextSectors = nextSectors.map((sector) => sector.id === updated.sectorId ? applySectorEffects(sector, scaleSector(def.sectorEffects, 0.35 + severityScale * 0.45)) : sector);
      updated.lastReport = `${stageLabel(updated.stage)} — ${def.loreOutcome}`;
      updated.discovered = true;
    } else {
      updated.lastReport = `${stageLabel(updated.stage)} — ${def.visibleSign}`;
    }
    return updated;
  });
  const summary = summarize(state.activePolicy, events, [
    `Catastrophes Xen : risque global ${avg(events.map((event) => event.probability))}% / crises actives ${events.filter((event) => stageRank(event.stage) >= 2).length}.`,
    ...escalationLines,
    ...state.log,
  ], state, escalationLines[0]);
  statsDelta = applyStatsToDelta(statsDelta, {
    xen: Math.round(summary.totalCatastropheRisk * 0.025 + summary.activeEventCount * 1.5 - summary.containmentDebt * 0.01),
    fear: Math.round(summary.xenPanic * 0.035 + summary.activeEventCount * 1.2),
    stability: -Math.round(summary.citywideRisk * 0.03),
    production: -Math.round(summary.infrastructureCollapse * 0.035),
    loyalty: -Math.round(summary.ravenholmProbability * 0.025),
    suspicion: Math.round(summary.advisorEmergency * 0.025 + summary.activeEventCount * 0.8),
    civilianLosses: Math.round(summary.activeEventCount * 4 + summary.ravenholmProbability * 0.18),
    combineLosses: summary.citywideRisk > 58 ? 1 : 0,
  });
  const lines = [
    `Catastrophe Watch : risque global ${summary.totalCatastropheRisk}% / citywide ${summary.citywideRisk}% / Ravenholm ${summary.ravenholmProbability}%.`,
    escalationLines[0] || `Événement le plus sensible : ${summary.lastCatastrophe}.`,
  ];
  if (summary.advisorEmergency > 70) lines.push('Alerte Advisor : la crise biologique dépasse le seuil de mensonge administratif local.');
  if (summary.activeEventCount > 2) lines.push('Alerte COAN : crises Xen simultanées, priorisation par sacrifice sectoriel recommandée.');
  return { xenCatastrophes: summary, sectors: nextSectors, statsDelta, lines };
}

function updatedPublicPressure(event: XenCatastropheEventState) {
  return event.intensity * 0.35 + event.civilianExposure * 0.35 + (100 - event.publicCover) * 0.2;
}

function scaleStats(effects: Partial<Stats>, scale: number): Partial<Stats> {
  return Object.fromEntries(Object.entries(effects).map(([key, value]) => [key, Math.round((value ?? 0) * scale)])) as Partial<Stats>;
}

function scaleSector(effects: XenCatastropheOperation['sectorEffects'], scale: number): XenCatastropheOperation['sectorEffects'] {
  if (!effects) return effects;
  const scaled: XenCatastropheOperation['sectorEffects'] = {};
  for (const [key, value] of Object.entries(effects)) {
    if (typeof value === 'number') (scaled as Record<string, number>)[key] = Math.round(value * scale);
    else (scaled as Record<string, unknown>)[key] = value;
  }
  return scaled;
}

function applyStatsToDelta(base: Partial<Stats>, delta: Partial<Stats>): Partial<Stats> {
  const result = { ...base };
  for (const [key, value] of Object.entries(delta) as Array<[keyof Stats, number]>) {
    result[key] = (result[key] ?? 0) + value;
  }
  return result;
}
