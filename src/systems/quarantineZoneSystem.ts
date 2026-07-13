import type { GameState, PopulationState, QuarantineOperation, QuarantinePolicyId, QuarantineSectorState, QuarantineStage, QuarantineZoneState, Sector, Stats, VortigauntState, XenEcosystemState, XenMutationState } from '../types/game';
import { quarantineOperations, quarantinePolicies, quarantineStageDefinitions, quarantineStageOrder } from '../data/quarantineZones';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const add = (value: number, delta = 0, min = 0, max = 100) => clamp(value + delta, min, max);
const stageIndex = (stage: QuarantineStage) => Math.max(0, quarantineStageOrder.indexOf(stage));
const stageAt = (index: number): QuarantineStage => quarantineStageOrder[Math.max(0, Math.min(quarantineStageOrder.length - 1, Math.round(index)))] ?? 'sanitary_watch';

function avg(values: number[]) {
  if (!values.length) return 0;
  return clamp(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function applyStats(base: Stats, effects: Partial<Stats>): Stats {
  return {
    ...base,
    stability: add(base.stability, effects.stability ?? 0),
    loyalty: add(base.loyalty, effects.loyalty ?? 0),
    fear: add(base.fear, effects.fear ?? 0),
    rebel: add(base.rebel, effects.rebel ?? 0),
    xen: add(base.xen, effects.xen ?? 0),
    combine: add(base.combine, effects.combine ?? 0),
    production: add(base.production, effects.production ?? 0, 0, 120),
    rations: Math.max(0, Math.round(base.rations + (effects.rations ?? 0))),
    citadel: add(base.citadel, effects.citadel ?? 0),
    info: add(base.info, effects.info ?? 0),
    fatigue: add(base.fatigue, effects.fatigue ?? 0),
    civilianLosses: Math.max(0, Math.round(base.civilianLosses + (effects.civilianLosses ?? 0))),
    combineLosses: Math.max(0, Math.round(base.combineLosses + (effects.combineLosses ?? 0))),
    suspicion: add(base.suspicion, effects.suspicion ?? 0),
  };
}

function applySectorEffects(sector: Sector, effects?: QuarantineOperation['sectorEffects']): Sector {
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

function chooseStageFromPressure(pressure: number, containment: number, secrecy: number, sector: Sector): QuarantineStage {
  const raw = pressure - containment * 0.52 + secrecy * 0.08 + (sector.infrastructure < 34 ? 8 : 0) + (sector.population > 1600 ? 5 : 0);
  if (raw >= 96) return 'ravenholm_like';
  if (raw >= 86) return 'lost_zone';
  if (raw >= 76) return 'organic_zone';
  if (raw >= 66) return 'abandoned_zone';
  if (raw >= 56) return 'sealed_zone';
  if (raw >= 42) return 'full_quarantine';
  if (raw >= 26) return 'partial_quarantine';
  return 'sanitary_watch';
}

function sectorStatusForStage(stage: QuarantineStage, sector: Sector): Sector['status'] {
  if (stage === 'ravenholm_like') return 'Infesté';
  if (stage === 'lost_zone' || stage === 'organic_zone') return 'Infesté';
  if (stage === 'abandoned_zone') return 'Abandonné';
  if (stage === 'sealed_zone') return 'Scellé';
  if (stage === 'full_quarantine' || stage === 'partial_quarantine') return 'En quarantaine';
  if (sector.status === 'Stable' && sector.xen > 25) return 'Contaminé';
  return sector.status;
}

function initialPolicy(profile: string, scenario: string): QuarantinePolicyId {
  if (profile === 'sympathizer') return 'biotic_humanitarian_mask';
  if (profile === 'quarantine' || scenario === 'quarantine') return 'transparent_containment';
  if (profile === 'tyrant') return 'burn_and_forget';
  if (scenario === 'post_nova') return 'silent_seal';
  return 'transparent_containment';
}

function getSectorLayerPressure(ecosystem: XenEcosystemState | undefined, sectorId: string) {
  const layers = ecosystem?.layers?.filter((layer) => layer.sectorId === sectorId) ?? [];
  return avg(layers.map((layer) => layer.biomass * 0.28 + layer.activity * 0.2 + layer.spread * 0.2 + layer.mutationPressure * 0.17 + layer.humanExposure * 0.15));
}

function getSectorChainPressure(mutation: XenMutationState | undefined, sectorId: string) {
  const chains = mutation?.chains?.filter((chain) => chain.sectorId === sectorId) ?? [];
  return avg(chains.map((chain) => chain.progress * 0.3 + chain.hostPool * 0.18 + chain.conversionLoad * 0.22 + chain.mutationLoad * 0.2 + chain.triggerPressure * 0.1));
}

function createZoneForSector({ sector, ecosystem, mutation, profile, scenario }: { sector: Sector; ecosystem?: XenEcosystemState; mutation?: XenMutationState; profile: string; scenario: string }): QuarantineSectorState | null {
  const layerPressure = getSectorLayerPressure(ecosystem, sector.id);
  const chainPressure = getSectorChainPressure(mutation, sector.id);
  const exposure = clamp(sector.xen * 0.44 + layerPressure * 0.34 + chainPressure * 0.22 + (sector.status === 'Infesté' ? 10 : 0) + (sector.zone === 'Quarantaine' ? 10 : 0));
  if (exposure < 13 && !['Contaminé', 'Infesté', 'En quarantaine', 'Scellé', 'Abandonné'].includes(sector.status)) return null;
  const containment = clamp(sector.surveillance * 0.42 + (sector.units.scanner ?? 0) * 7 + (sector.units.suppressor ?? 0) * 7 + (sector.units.elite ?? 0) * 5 + (profile === 'quarantine' ? 12 : 0));
  const secrecy = clamp(34 + (scenario === 'post_nova' ? 10 : 0) + (sector.zone === 'Citadelle' ? 12 : 0) + (sector.status === 'Scellé' ? 18 : 0));
  const stage = chooseStageFromPressure(exposure, containment, secrecy, sector);
  return {
    id: `qz-${sector.id}`,
    sectorId: sector.id,
    stage,
    exposure,
    containment,
    secrecy,
    civilianTrapped: clamp(sector.population * Math.max(0.02, exposure / 250), 0, Math.max(0, sector.population)),
    evacuationProgress: clamp(containment * 0.28 + sector.surveillance * 0.16 - exposure * 0.18),
    infrastructureLoss: clamp((100 - sector.infrastructure) * 0.55 + exposure * 0.2),
    lastDecision: `${quarantineStageDefinitions[stage].combineLabel} initialisé : ${quarantineStageDefinitions[stage].publicMask}.`,
    daysInStage: 0,
    ravenholmMemory: stage === 'ravenholm_like' ? 55 : stage === 'lost_zone' ? 35 : stage === 'organic_zone' ? 24 : 0,
  };
}

function summarize(activePolicy: QuarantinePolicyId, zones: QuarantineSectorState[], log: string[], lastZoneEvent = ''): QuarantineZoneState {
  const count = (ids: QuarantineStage[]) => zones.filter((zone) => ids.includes(zone.stage)).length;
  const trappedCivilianEstimate = zones.reduce((sum, zone) => sum + zone.civilianTrapped, 0);
  const evacuationIndex = avg(zones.map((zone) => zone.evacuationProgress));
  const secrecyIndex = avg(zones.map((zone) => zone.secrecy));
  const containmentIndex = avg(zones.map((zone) => zone.containment));
  const biologicalExclusionIndex = clamp(avg(zones.map((zone) => stageIndex(zone.stage) * 13 + zone.exposure * 0.22 + Math.max(0, 55 - zone.containment) * 0.18)));
  const ravenholmMemoryIndex = clamp(avg(zones.map((zone) => zone.ravenholmMemory)) + count(['ravenholm_like']) * 12 + count(['lost_zone']) * 5);
  const publicContradictionRisk = clamp(avg(zones.map((zone) => zone.secrecy * 0.34 + zone.civilianTrapped * 0.04 + zone.ravenholmMemory * 0.35 + stageIndex(zone.stage) * 4)));
  return {
    activePolicy,
    zones,
    sanitaryWatchCount: count(['sanitary_watch']),
    partialCount: count(['partial_quarantine']),
    fullCount: count(['full_quarantine']),
    sealedCount: count(['sealed_zone']),
    organicCount: count(['organic_zone']),
    lostCount: count(['abandoned_zone', 'lost_zone']),
    ravenholmLikeCount: count(['ravenholm_like']),
    trappedCivilianEstimate,
    evacuationIndex,
    secrecyIndex,
    containmentIndex,
    biologicalExclusionIndex,
    ravenholmMemoryIndex,
    publicContradictionRisk,
    lastZoneEvent: lastZoneEvent || zones.sort((a, b) => (stageIndex(b.stage) + b.exposure / 100) - (stageIndex(a.stage) + a.exposure / 100))[0]?.lastDecision || 'Aucun secteur sous protocole évolutif critique.',
    log: log.slice(0, 80),
  };
}

export function createInitialQuarantineZoneState({ sectors, ecosystem, mutation, profile, scenario }: { sectors: Sector[]; ecosystem?: XenEcosystemState; mutation?: XenMutationState; profile: string; scenario: string }): QuarantineZoneState {
  const zones = sectors
    .map((sector) => createZoneForSector({ sector, ecosystem, mutation, profile, scenario }))
    .filter((zone): zone is QuarantineSectorState => !!zone);
  const activePolicy = initialPolicy(profile, scenario);
  return summarize(activePolicy, zones, [
    `Matrice de quarantaine évolutive initialisée : ${zones.length} secteurs sous observation biologique.`,
    `Doctrine active : ${quarantinePolicies.find((policy) => policy.id === activePolicy)?.name ?? activePolicy}.`,
  ]);
}

export function migrateQuarantineZoneState(game: Partial<GameState>): QuarantineZoneState {
  if (game.quarantineZones?.zones) {
    return summarize(game.quarantineZones.activePolicy ?? 'transparent_containment', game.quarantineZones.zones, game.quarantineZones.log ?? []);
  }
  return createInitialQuarantineZoneState({
    sectors: game.sectors ?? [],
    ecosystem: game.xenEcosystem,
    mutation: game.xenMutation,
    profile: game.profile ?? 'loyalist',
    scenario: game.scenario ?? 'standard',
  });
}

function updateZoneStage(zone: QuarantineSectorState, nextStage: QuarantineStage): QuarantineSectorState {
  const changed = zone.stage !== nextStage;
  return {
    ...zone,
    stage: nextStage,
    daysInStage: changed ? 0 : zone.daysInStage + 1,
    lastDecision: changed
      ? `${quarantineStageDefinitions[nextStage].combineLabel} : ${quarantineStageDefinitions[nextStage].loreOutcome}`
      : zone.lastDecision,
    ravenholmMemory: add(zone.ravenholmMemory, nextStage === 'ravenholm_like' ? 8 : nextStage === 'lost_zone' ? 4 : nextStage === 'organic_zone' ? 2 : -1),
  };
}

export function simulateQuarantineZoneDay({ state, sectors, stats, ecosystem, mutation, population, vortigaunts, day }: { state: QuarantineZoneState; sectors: Sector[]; stats: Stats; ecosystem: XenEcosystemState; mutation: XenMutationState; population?: PopulationState; vortigaunts?: VortigauntState; day: number }) {
  const policy = quarantinePolicies.find((item) => item.id === state.activePolicy) ?? quarantinePolicies[0];
  const existing = new Map(state.zones.map((zone) => [zone.sectorId, zone]));
  let nextStats = applyStats(stats, policy.effects);
  let nextSectors = sectors.map((sector) => ({ ...sector, units: { ...sector.units } }));
  const lines: string[] = [];
  const zones: QuarantineSectorState[] = [];

  for (const sector of nextSectors) {
    const previous = existing.get(sector.id);
    const candidate = createZoneForSector({ sector, ecosystem, mutation, profile: 'loyalist', scenario: 'standard' });
    if (!previous && !candidate) continue;
    const base = previous ?? candidate!;
    const layerPressure = getSectorLayerPressure(ecosystem, sector.id);
    const chainPressure = getSectorChainPressure(mutation, sector.id);
    const populationExposure = population?.sectors.find((item) => item.sectorId === sector.id)?.xenExposure ?? 0;
    const bioticHelp = Math.max(0, (vortigaunts?.quarantineAid ?? 0) * 0.12 + (vortigaunts?.xenInsight ?? 0) * 0.08);
    const exposureDelta = Math.round(sector.xen * 0.06 + layerPressure * 0.08 + chainPressure * 0.1 + populationExposure * 0.05 + policy.stageBias * 0.12 - base.containment * 0.04 - bioticHelp * 0.12);
    const containmentDelta = Math.round(sector.surveillance * 0.035 + (sector.units.scanner ?? 0) * 1.4 + (sector.units.suppressor ?? 0) * 1.2 + bioticHelp * 0.08 - stageIndex(base.stage) * 0.7);
    const secrecyDelta = Math.round(policy.secrecyDelta * 0.35 + (base.civilianTrapped > 120 ? 2 : 0) + (day % 7 === 0 ? -2 : 0));
    const trappedDelta = Math.round(Math.max(0, base.exposure - base.evacuationProgress) * 0.22 + policy.civilianCost * 0.4 - base.containment * 0.05);
    const evacuationDelta = Math.round(base.containment * 0.05 + bioticHelp * 0.06 - base.exposure * 0.04 - (policy.civilianCost > 15 ? 2 : 0));
    const nextExposure = add(base.exposure, exposureDelta);
    const nextContainment = add(base.containment, containmentDelta);
    const nextSecrecy = add(base.secrecy, secrecyDelta);
    const nextTrapped = Math.max(0, Math.round(base.civilianTrapped + trappedDelta));
    const nextEvacuation = add(base.evacuationProgress, evacuationDelta);
    const infraLoss = add(base.infrastructureLoss, Math.round(nextExposure * 0.035 + stageIndex(base.stage) * 0.7 - nextContainment * 0.02));
    const inferredStage = chooseStageFromPressure(nextExposure + policy.stageBias, nextContainment, nextSecrecy, sector);
    const conservativeIndex = Math.max(stageIndex(base.stage) - 1, Math.min(stageIndex(inferredStage), stageIndex(base.stage) + 1));
    let updated: QuarantineSectorState = {
      ...base,
      exposure: nextExposure,
      containment: nextContainment,
      secrecy: nextSecrecy,
      civilianTrapped: nextTrapped,
      evacuationProgress: nextEvacuation,
      infrastructureLoss: infraLoss,
    };
    updated = updateZoneStage(updated, stageAt(conservativeIndex));
    zones.push(updated);
  }

  const zoneBySector = new Map(zones.map((zone) => [zone.sectorId, zone]));
  nextSectors = nextSectors.map((sector) => {
    const zone = zoneBySector.get(sector.id);
    if (!zone) return sector;
    const severity = stageIndex(zone.stage);
    return {
      ...sector,
      status: sectorStatusForStage(zone.stage, sector),
      xen: add(sector.xen, Math.round(zone.exposure * 0.025 + severity * 0.8 - zone.containment * 0.02)),
      fear: add(sector.fear, Math.round(severity * 1.4 + zone.secrecy * 0.02)),
      loyalty: add(sector.loyalty, -Math.round(severity * 0.9 + zone.civilianTrapped * 0.01)),
      infrastructure: add(sector.infrastructure, -Math.round(severity * 0.55 + zone.infrastructureLoss * 0.018)),
      population: Math.max(0, sector.population - Math.round(Math.max(0, zone.exposure - zone.containment) * 0.06 + severity * 0.8)),
    };
  });

  const summary = summarize(state.activePolicy, zones, state.log);
  const high = [...zones].sort((a, b) => stageIndex(b.stage) * 100 + b.exposure - (stageIndex(a.stage) * 100 + a.exposure)).slice(0, 3);
  for (const zone of high) {
    const sector = nextSectors.find((item) => item.id === zone.sectorId);
    const def = quarantineStageDefinitions[zone.stage];
    lines.push(`${sector?.name ?? zone.sectorId} : ${def.label} / exposition ${zone.exposure}% / containment ${zone.containment}% / civils piégés ~${zone.civilianTrapped}.`);
  }
  if (summary.ravenholmLikeCount > 0) lines.unshift(`ALERTE RAVENHOLM-LIKE : ${summary.ravenholmLikeCount} secteur(s) radiés du registre civique public.`);
  if (summary.publicContradictionRisk > 70) lines.push(`Contradiction publique quarantaine : ${summary.publicContradictionRisk}% — les familles et Lambda comparent les disparitions.`);

  const civilianLoss = Math.round(zones.reduce((sum, zone) => sum + Math.max(0, zone.exposure - zone.containment) * quarantineStageDefinitions[zone.stage].severity * 0.012, 0));
  nextStats = applyStats(nextStats, {
    xen: Math.round(summary.biologicalExclusionIndex * 0.04 - summary.containmentIndex * 0.03),
    stability: -Math.round(summary.biologicalExclusionIndex * 0.035 + summary.lostCount * 1.5 + summary.ravenholmLikeCount * 4),
    loyalty: -Math.round(summary.trappedCivilianEstimate / 850 + summary.ravenholmMemoryIndex * 0.04),
    fear: Math.round(summary.biologicalExclusionIndex * 0.08 + summary.ravenholmLikeCount * 4),
    production: -Math.round(policy.productionCost * 0.18 + summary.lostCount + summary.organicCount),
    civilianLosses: civilianLoss,
    suspicion: Math.round(policy.advisorRisk * 0.18 + summary.publicContradictionRisk * 0.03),
  });

  const finalSummary = summarize(state.activePolicy, zones, [
    `Jour ${String(day).padStart(3, '0')} : ${summary.zones.length} zones suivies / exclusion bio ${summary.biologicalExclusionIndex}% / mémoire Ravenholm ${summary.ravenholmMemoryIndex}%.`,
    ...lines,
    ...state.log,
  ], lines[0]);

  return { quarantineZones: finalSummary, sectors: nextSectors, statsDelta: diffStats(stats, nextStats), lines };
}

function diffStats(before: Stats, after: Stats): Partial<Stats> {
  return {
    stability: after.stability - before.stability,
    loyalty: after.loyalty - before.loyalty,
    fear: after.fear - before.fear,
    rebel: after.rebel - before.rebel,
    xen: after.xen - before.xen,
    combine: after.combine - before.combine,
    production: after.production - before.production,
    rations: after.rations - before.rations,
    citadel: after.citadel - before.citadel,
    info: after.info - before.info,
    fatigue: after.fatigue - before.fatigue,
    civilianLosses: after.civilianLosses - before.civilianLosses,
    combineLosses: after.combineLosses - before.combineLosses,
    suspicion: after.suspicion - before.suspicion,
  };
}

export function setQuarantinePolicy(state: QuarantineZoneState, policyId: QuarantinePolicyId) {
  const policy = quarantinePolicies.find((item) => item.id === policyId) ?? quarantinePolicies[0];
  return {
    quarantineZones: summarize(policy.id, state.zones, [`Doctrine quarantaine active : ${policy.name}. ${policy.publicLine}`, ...state.log]),
    statsDelta: policy.effects,
    lines: [`Doctrine quarantaine active : ${policy.name}.`, policy.description],
  };
}

function applyZoneEffects(zone: QuarantineSectorState, operation: QuarantineOperation, scale = 1): QuarantineSectorState {
  const z = operation.zoneEffects;
  const targetStage = z.forceStage ?? (z.stageStep ? stageAt(stageIndex(zone.stage) + z.stageStep) : zone.stage);
  const changedStage = targetStage !== zone.stage;
  return {
    ...zone,
    stage: targetStage,
    exposure: add(zone.exposure, Math.round((z.exposureDelta ?? 0) * scale)),
    containment: add(zone.containment, Math.round((z.containmentDelta ?? 0) * scale)),
    secrecy: add(zone.secrecy, Math.round((z.secrecyDelta ?? 0) * scale)),
    civilianTrapped: Math.max(0, Math.round(zone.civilianTrapped + (z.civilianTrappedDelta ?? 0) * scale)),
    evacuationProgress: add(zone.evacuationProgress, Math.round((z.evacuationDelta ?? 0) * scale)),
    infrastructureLoss: add(zone.infrastructureLoss, Math.round((z.infrastructureLossDelta ?? 0) * scale)),
    ravenholmMemory: add(zone.ravenholmMemory, Math.round((z.ravenholmMemoryDelta ?? 0) * scale + (targetStage === 'ravenholm_like' ? 18 : 0))),
    daysInStage: changedStage ? 0 : zone.daysInStage,
    lastDecision: `${operation.name} : ${operation.logLine}`,
  };
}

export function resolveQuarantineOperation({ state, operation, sectors, selectedSectorId, stats: _stats, day }: { state: QuarantineZoneState; operation: QuarantineOperation; sectors: Sector[]; selectedSectorId?: string; stats: Stats; day: number }) {
  const selectedId = selectedSectorId ?? sectors.sort((a, b) => b.xen - a.xen)[0]?.id;
  let zones = state.zones.map((zone) => ({ ...zone }));
  const makeZone = (sectorId: string) => {
    const existing = zones.find((zone) => zone.sectorId === sectorId);
    if (existing) return existing;
    const sector = sectors.find((item) => item.id === sectorId);
    if (!sector) return null;
    const stage: QuarantineStage = sector.xen > 60 ? 'full_quarantine' : sector.xen > 35 ? 'partial_quarantine' : 'sanitary_watch';
    const created: QuarantineSectorState = {
      id: `qz-${sectorId}`,
      sectorId,
      stage,
      exposure: clamp(sector.xen + 12),
      containment: clamp(sector.surveillance * 0.5),
      secrecy: 42,
      civilianTrapped: clamp(sector.population * 0.05, 0, sector.population),
      evacuationProgress: 8,
      infrastructureLoss: clamp(100 - sector.infrastructure),
      lastDecision: `Zone créée par opération ${operation.name}.`,
      daysInStage: 0,
      ravenholmMemory: 0,
    };
    zones = [created, ...zones];
    return created;
  };

  if (operation.target === 'sector' && selectedId) {
    const target = makeZone(selectedId);
    if (target) zones = zones.map((zone) => zone.id === target.id ? applyZoneEffects(zone, operation) : zone);
  } else {
    zones = zones.length ? zones.map((zone) => applyZoneEffects(zone, operation, 0.55)) : sectors.filter((sector) => sector.xen > 25).slice(0, 4).map((sector) => applyZoneEffects(makeZone(sector.id)!, operation, 0.55));
  }

  let nextSectors = sectors.map((sector) => {
    const zone = zones.find((item) => item.sectorId === sector.id);
    const base = zone ? { ...sector, status: sectorStatusForStage(zone.stage, sector) } : sector;
    return (operation.target === 'network' || sector.id === selectedId) ? applySectorEffects(base, operation.sectorEffects) : base;
  });
  const summary = summarize(state.activePolicy, zones, [
    `Jour ${String(day).padStart(3, '0')} : ${operation.name}. ${operation.logLine}`,
    ...state.log,
  ], operation.logLine);
  const statsKeys = new Set([...Object.keys(operation.cost), ...Object.keys(operation.effects)] as Array<keyof Stats>);
  const statsDelta = Array.from(statsKeys).reduce((acc, key) => {
    acc[key] = (operation.cost[key] ?? 0) + (operation.effects[key] ?? 0);
    return acc;
  }, {} as Partial<Stats>);
  return {
    quarantineZones: summary,
    sectors: nextSectors,
    statsDelta,
    lines: [`${operation.name} : ${operation.logLine}`, operation.description],
  };
}

export { quarantineOperations, quarantinePolicies, quarantineStageDefinitions };
