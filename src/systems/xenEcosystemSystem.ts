import type { GameState, PopulationState, ProfileId, ScenarioId, Sector, Stats, TimelineId, VortigauntState, XenEcosystemLayerId, XenEcosystemLayerState, XenEcosystemOperation, XenEcosystemPolicyId, XenEcosystemState, XenLayerStage } from '../types/game';
import { xenEcosystemOperations, xenEcosystemPolicies, xenLayerDefinitions, xenLayerOrder } from '../data/xenEcosystem';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const add = (value: number, delta = 0, min = 0, max = 100) => clamp(value + delta, min, max);

function avg(values: number[]) {
  if (!values.length) return 0;
  return clamp(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function stageFor(biomass: number, spread: number): XenLayerStage {
  const pressure = biomass * 0.65 + spread * 0.35;
  if (pressure >= 88) return 'lost';
  if (pressure >= 70) return 'dominant';
  if (pressure >= 48) return 'bloom';
  if (pressure >= 22) return 'active';
  return 'trace';
}

function layerIdForSector(sector: Sector): XenEcosystemLayerId[] {
  const ids: XenEcosystemLayerId[] = [];
  if (sector.zone === 'Souterrain') ids.push('spores', 'barnacle_bloom', 'headcrab_nest');
  if (sector.zone === 'Quarantaine') ids.push('spores', 'wall_biomass', 'organic_tunnels', 'human_infection');
  if (sector.zone === 'Périphérie') ids.push('antlion_colony', 'roaming_fauna', 'spores');
  if (sector.zone === 'Infrastructure' && sector.xen > 8) ids.push('spores', 'antlion_colony');
  if (sector.zone === 'Résidentiel' && sector.xen > 5) ids.push('headcrab_nest', 'human_infection');
  if (sector.id === 'canals') ids.push('ichthyosaur_wetland');
  if (sector.id === 'hospital') ids.push('headcrab_nest', 'human_infection');
  return [...new Set(ids)];
}

function incidentFor(layerId: XenEcosystemLayerId, sectorName: string, stage: XenLayerStage) {
  if (stage === 'lost') return `${sectorName} : couche ${xenLayerDefinitions[layerId].combineLabel} reclassifiée zone perdue.`;
  if (stage === 'dominant') return `${sectorName} : la couche ${xenLayerDefinitions[layerId].name} domine le volume exploitable.`;
  if (layerId === 'headcrab_nest') return `${sectorName} : traces de parasites sous plinthes, faux plafonds et conduites.`;
  if (layerId === 'barnacle_bloom') return `${sectorName} : disparition d’agents sous plafonds humides.`;
  if (layerId === 'antlion_colony') return `${sectorName} : vibrations irrégulières et effondrements de sol signalés.`;
  if (layerId === 'human_infection') return `${sectorName} : hôtes potentiels non déclarés dans files de rationnement.`;
  if (layerId === 'organic_tunnels') return `${sectorName} : axe organique non cartographié derrière cloison.`;
  return `${sectorName} : activité ${xenLayerDefinitions[layerId].combineLabel} sous surveillance.`;
}

function summarize(layers: XenEcosystemLayerState[]): Omit<XenEcosystemState, 'activePolicy' | 'layers' | 'lastOutbreak' | 'log'> {
  const by = (ids: XenEcosystemLayerId[], field: keyof Pick<XenEcosystemLayerState, 'biomass' | 'activity' | 'spread' | 'containment' | 'mutationPressure' | 'humanExposure'> = 'biomass') => avg(layers.filter((layer) => ids.includes(layer.layerId)).map((layer) => layer[field]));
  const totalBiomass = avg(layers.map((layer) => layer.biomass));
  const sporeIndex = by(['spores']);
  const parasiteIndex = avg([by(['headcrab_nest']), by(['human_infection'])]);
  const antlionPressure = by(['antlion_colony']);
  const barnacleDensity = by(['barnacle_bloom']);
  const organicInfrastructureDamage = avg([by(['wall_biomass']), by(['organic_tunnels']), by(['antlion_colony'])]);
  const humanInfectionIndex = by(['human_infection'], 'humanExposure');
  const roamingFaunaIndex = avg([by(['roaming_fauna']), by(['ichthyosaur_wetland'])]);
  const containmentIndex = avg(layers.map((layer) => layer.containment));
  const mutationPressure = avg(layers.map((layer) => layer.mutationPressure));
  const lostSectorRisk = clamp(layers.filter((layer) => layer.stage === 'lost' || layer.stage === 'dominant').length * 10 + layers.filter((layer) => layer.stage === 'bloom').length * 3);
  const networkSpread = avg(layers.map((layer) => layer.spread));
  return { totalBiomass, sporeIndex, parasiteIndex, antlionPressure, barnacleDensity, organicInfrastructureDamage, humanInfectionIndex, roamingFaunaIndex, containmentIndex, mutationPressure, lostSectorRisk, networkSpread };
}

function chooseInitialPolicy(profile: ProfileId, scenario: ScenarioId, timeline: TimelineId): XenEcosystemPolicyId {
  if (profile === 'sympathizer') return 'vortessence_mapping';
  if (profile === 'quarantine' || scenario === 'quarantine' || timeline === 'alyx_era') return 'balanced_containment';
  if (profile === 'tyrant') return 'parasite_denial';
  if (timeline === 'citadel_collapse') return 'quarantine_abandonment';
  return 'balanced_containment';
}

export function createInitialXenEcosystem({ scenario, profile, timeline, sectors }: { scenario: ScenarioId; profile: ProfileId; timeline: TimelineId; sectors: Sector[] }): XenEcosystemState {
  const scenarioBias = scenario === 'quarantine' ? 18 : scenario === 'uprising' ? 8 : scenario === 'post_nova' ? 6 : 0;
  const timelineBias = timeline === 'alyx_era' ? 12 : timeline === 'citadel_collapse' ? 20 : timeline === 'uprising' ? 10 : 0;
  const profileBias = profile === 'quarantine' ? -4 : profile === 'tyrant' ? 3 : profile === 'sympathizer' ? -2 : 0;
  const layers: XenEcosystemLayerState[] = [];
  for (const sector of sectors) {
    const ids = layerIdForSector(sector);
    for (const layerId of ids) {
      const def = xenLayerDefinitions[layerId];
      const base = clamp(sector.xen + scenarioBias + timelineBias + profileBias + def.spreadBias * 0.12 - sector.surveillance * 0.08 - sector.infrastructure * 0.04);
      const biomass = clamp(base + (sector.status === 'Infesté' ? 24 : sector.status === 'Contaminé' || sector.status === 'En quarantaine' ? 12 : 0));
      const spread = clamp(base + def.spreadBias * 0.18 + (sector.connections.some((c) => c.controlledBy === 'Xen') ? 10 : 0));
      const containment = clamp(sector.surveillance * 0.5 + (sector.units.suppressor ?? 0) * 8 + (sector.units.scanner ?? 0) * 5 + (profile === 'quarantine' ? 10 : 0));
      const humanExposure = clamp((sector.population / 120) * (def.humanThreat / 100) + sector.xen * 0.35 + (100 - sector.loyalty) * 0.1);
      const mutationPressure = clamp(biomass * 0.45 + spread * 0.25 + scenarioBias * 0.35 - containment * 0.25);
      const stage = stageFor(biomass, spread);
      layers.push({
        id: `${sector.id}-${layerId}`,
        sectorId: sector.id,
        layerId,
        stage,
        biomass,
        activity: clamp(base + def.humanThreat * 0.12),
        spread,
        containment,
        mutationPressure,
        humanExposure,
        discovered: sector.surveillance > 45 || sector.xen > 40 || layerId === 'spores',
        lastIncident: incidentFor(layerId, sector.name, stage),
      });
    }
  }
  const policy = chooseInitialPolicy(profile, scenario, timeline);
  const summary = summarize(layers);
  return {
    activePolicy: policy,
    layers,
    ...summary,
    lastOutbreak: 'Aucune flambée Xen majeure depuis l’initialisation COAN.',
    log: [
      `Écosystème Xen initialisé : ${layers.length} couches biologiques indexées.`,
      `Doctrine initiale : ${xenEcosystemPolicies.find((item) => item.id === policy)?.name ?? policy}.`,
    ],
  };
}

export function migrateXenEcosystem(game: Partial<GameState>): XenEcosystemState {
  if (game.xenEcosystem?.layers?.length) return { ...game.xenEcosystem, ...summarize(game.xenEcosystem.layers) };
  return createInitialXenEcosystem({
    scenario: game.scenario ?? 'standard',
    profile: game.profile ?? 'loyalist',
    timeline: game.timeline ?? 'pre_hl2',
    sectors: game.sectors ?? [],
  });
}

function applyLayerDelta(layer: XenEcosystemLayerState, patch: Partial<XenEcosystemLayerState>): XenEcosystemLayerState {
  const biomass = add(layer.biomass, typeof patch.biomass === 'number' ? patch.biomass - layer.biomass : 0);
  const activity = add(layer.activity, typeof patch.activity === 'number' ? patch.activity - layer.activity : 0);
  const spread = add(layer.spread, typeof patch.spread === 'number' ? patch.spread - layer.spread : 0);
  const containment = add(layer.containment, typeof patch.containment === 'number' ? patch.containment - layer.containment : 0);
  const mutationPressure = add(layer.mutationPressure, typeof patch.mutationPressure === 'number' ? patch.mutationPressure - layer.mutationPressure : 0);
  const humanExposure = add(layer.humanExposure, typeof patch.humanExposure === 'number' ? patch.humanExposure - layer.humanExposure : 0);
  return { ...layer, ...patch, biomass, activity, spread, containment, mutationPressure, humanExposure, stage: stageFor(biomass, spread), discovered: patch.discovered ?? layer.discovered };
}

function applyLayerEffects(layer: XenEcosystemLayerState, effects: Partial<Pick<XenEcosystemLayerState, 'biomass' | 'activity' | 'spread' | 'containment' | 'mutationPressure' | 'humanExposure' | 'discovered'>>): XenEcosystemLayerState {
  const biomass = add(layer.biomass, effects.biomass ?? 0);
  const activity = add(layer.activity, effects.activity ?? 0);
  const spread = add(layer.spread, effects.spread ?? 0);
  const containment = add(layer.containment, effects.containment ?? 0);
  const mutationPressure = add(layer.mutationPressure, effects.mutationPressure ?? 0);
  const humanExposure = add(layer.humanExposure, effects.humanExposure ?? 0);
  return { ...layer, biomass, activity, spread, containment, mutationPressure, humanExposure, discovered: effects.discovered ?? layer.discovered, stage: stageFor(biomass, spread) };
}

export function setXenEcosystemPolicy(state: XenEcosystemState, policyId: XenEcosystemPolicyId) {
  const policy = xenEcosystemPolicies.find((item) => item.id === policyId) ?? xenEcosystemPolicies[0];
  const layers = state.layers.map((layer) => applyLayerEffects(layer, {
    biomass: policy.layerBias[layer.layerId] ?? 0,
    spread: Math.round((policy.layerBias[layer.layerId] ?? 0) * 0.6),
    containment: policy.containmentBias,
    mutationPressure: policy.mutationRisk,
  }));
  const summary = summarize(layers);
  const xenEcosystem: XenEcosystemState = {
    ...state,
    activePolicy: policy.id,
    layers,
    ...summary,
    lastOutbreak: state.lastOutbreak,
    log: [`COAN — Doctrine Xen active : ${policy.name}.`, policy.description, ...state.log].slice(0, 70),
  };
  return { xenEcosystem, statsDelta: policy.effects, lines: [`Doctrine Xen active : ${policy.name}.`, policy.publicLine] };
}

export function simulateXenEcosystemDay({ state, sectors, stats, vortigaunts, population, day }: { state: XenEcosystemState; sectors: Sector[]; stats: Stats; vortigaunts?: VortigauntState; population?: PopulationState; day: number }) {
  const policy = xenEcosystemPolicies.find((item) => item.id === state.activePolicy) ?? xenEcosystemPolicies[0];
  let layers = state.layers.map((layer) => ({ ...layer }));
  let nextSectors = sectors.map((sector) => ({ ...sector, units: { ...sector.units } }));
  const lines: string[] = [];
  let outbreak = state.lastOutbreak;

  layers = layers.map((layer, index) => {
    const sector = nextSectors.find((item) => item.id === layer.sectorId);
    const def = xenLayerDefinitions[layer.layerId];
    if (!sector) return layer;
    const populationExposure = population?.sectors.find((item) => item.sectorId === sector.id)?.xenExposure ?? Math.round(sector.xen * 0.5);
    const bioticAid = vortigaunts?.quarantineAid ?? 0;
    const policyLayerBias = policy.layerBias[layer.layerId] ?? 0;
    const containmentDelta = stats.combine * 0.025 + sector.surveillance * 0.035 + bioticAid * 0.04 + policy.containmentBias * 0.16 - layer.activity * 0.018;
    const pressure = stats.xen * 0.14 + sector.xen * 0.38 + (100 - sector.infrastructure) * 0.11 + stats.fatigue * 0.05 + def.spreadBias * 0.08 + policyLayerBias * 0.12 - layer.containment * 0.09 - stats.info * 0.025;
    const pulse = (day + index * 2) % 9 === 0 ? 4 : 0;
    const activity = add(layer.activity, pressure * 0.06 + pulse);
    const biomass = add(layer.biomass, activity * 0.035 + layer.spread * 0.03 + policyLayerBias * 0.08 - layer.containment * 0.035);
    const spread = add(layer.spread, def.spreadBias * 0.025 + biomass * 0.035 - layer.containment * 0.04 + (sector.connections.some((c) => c.controlledBy === 'Xen') ? 1.8 : 0));
    const containment = add(layer.containment, containmentDelta);
    const mutationPressure = add(layer.mutationPressure, biomass * 0.025 + stats.xen * 0.025 + policy.mutationRisk * 0.12 - containment * 0.025 + (layer.layerId === 'human_infection' ? populationExposure * 0.04 : 0));
    const humanExposure = add(layer.humanExposure, def.humanThreat * 0.03 + sector.population / 4000 + populationExposure * 0.025 - containment * 0.04 + (stats.rations < 500 ? 2 : 0));
    const stage = stageFor(biomass, spread);
    const discovered = layer.discovered || containment > 45 || stats.info > 70 || (vortigaunts?.xenInsight ?? 0) > 62;
    const next = { ...layer, activity, biomass, spread, containment, mutationPressure, humanExposure, stage, discovered, lastIncident: incidentFor(layer.layerId, sector.name, stage) };
    if (stage === 'dominant' || stage === 'lost') outbreak = next.lastIncident;
    return next;
  });

  // High-spread biological layers seed compatible layers into connected sectors.
  const bySector = new Map(nextSectors.map((sector) => [sector.id, sector]));
  const existing = new Set(layers.map((layer) => layer.id));
  for (const layer of [...layers]) {
    if (layer.spread < 72 || layer.containment > 75) continue;
    const origin = bySector.get(layer.sectorId);
    if (!origin) continue;
    const targetConnection = [...origin.connections].sort((a, b) => (b.risk + (b.controlledBy === 'Xen' ? 20 : 0)) - (a.risk + (a.controlledBy === 'Xen' ? 20 : 0)))[0];
    const target = targetConnection ? bySector.get(targetConnection.to) : undefined;
    if (!target) continue;
    const compatible = layer.layerId === 'antlion_colony' && target.zone !== 'Périphérie' ? 'roaming_fauna' : layer.layerId === 'ichthyosaur_wetland' && target.zone !== 'Souterrain' ? 'spores' : layer.layerId;
    const id = `${target.id}-${compatible}`;
    if (existing.has(id)) continue;
    const seed = clamp(layer.spread * 0.32 + target.xen * 0.45 + targetConnection.risk * 0.18);
    const stage = stageFor(seed, seed + 8);
    layers.push({
      id,
      sectorId: target.id,
      layerId: compatible,
      stage,
      biomass: seed,
      activity: seed,
      spread: clamp(seed + 8),
      containment: clamp(target.surveillance * 0.35),
      mutationPressure: clamp(seed * 0.55),
      humanExposure: clamp(target.population / 180 + xenLayerDefinitions[compatible].humanThreat * 0.2),
      discovered: false,
      lastIncident: `Nouvelle graine Xen depuis ${origin.name} vers ${target.name} via ${targetConnection.label}.`,
    });
    existing.add(id);
    lines.push(`Ensemencement Xen : ${target.name} reçoit ${xenLayerDefinitions[compatible].name} depuis ${origin.name}.`);
  }

  nextSectors = nextSectors.map((sector) => {
    const localLayers = layers.filter((layer) => layer.sectorId === sector.id);
    if (!localLayers.length) return sector;
    const localBiomass = avg(localLayers.map((layer) => layer.biomass));
    const localSpread = avg(localLayers.map((layer) => layer.spread));
    const organicDamage = avg(localLayers.map((layer) => xenLayerDefinitions[layer.layerId].infrastructureDamage * (layer.biomass / 100)));
    const humanThreat = avg(localLayers.map((layer) => xenLayerDefinitions[layer.layerId].humanThreat * (layer.humanExposure / 100)));
    const status = localBiomass > 82 || localSpread > 88 ? 'Infesté' : localBiomass > 55 ? 'Contaminé' : sector.status;
    const populationLoss = humanThreat > 64 ? Math.round(sector.population * 0.015) : humanThreat > 45 ? Math.round(sector.population * 0.006) : 0;
    return {
      ...sector,
      xen: clamp(sector.xen + localBiomass * 0.035 + localSpread * 0.025 - sector.surveillance * 0.02),
      infrastructure: clamp(sector.infrastructure - organicDamage * 0.035),
      fear: clamp(sector.fear + humanThreat * 0.025 + (status === 'Infesté' ? 3 : 0)),
      loyalty: clamp(sector.loyalty - humanThreat * 0.018),
      population: Math.max(0, sector.population - populationLoss),
      status,
    };
  });

  const summary = summarize(layers);
  const statsDelta: Partial<Stats> = {
    xen: clamp(summary.totalBiomass * 0.035 + summary.mutationPressure * 0.03 - summary.containmentIndex * 0.04 - stats.xen * 0.012, -6, 9),
    production: -Math.round(summary.organicInfrastructureDamage * 0.035),
    fatigue: Math.round(summary.humanInfectionIndex * 0.025 + summary.sporeIndex * 0.018),
    fear: Math.round(summary.parasiteIndex * 0.025 + summary.lostSectorRisk * 0.025),
    civilianLosses: Math.round(summary.humanInfectionIndex * 0.8 + summary.parasiteIndex * 0.45 + summary.roamingFaunaIndex * 0.35),
    combineLosses: summary.roamingFaunaIndex > 55 || summary.antlionPressure > 60 ? 1 : 0,
  };

  if (summary.sporeIndex > 55) lines.push(`Xen ecology : dérive de spores ${summary.sporeIndex}%, ventilation et hôpitaux sous risque.`);
  if (summary.parasiteIndex > 55) lines.push(`Xen ecology : pression parasites/headcrabs ${summary.parasiteIndex}%, conversion humaine probable.`);
  if (summary.antlionPressure > 55) lines.push(`Xen ecology : pression antlion ${summary.antlionPressure}%, vibrations industrielles à réduire.`);
  if (summary.organicInfrastructureDamage > 55) lines.push(`Xen ecology : biomasse murale endommage infrastructures (${summary.organicInfrastructureDamage}%).`);
  if (summary.lostSectorRisk > 35) lines.push(`Xen ecology : risque de secteur perdu ${summary.lostSectorRisk}%.`);

  const next: XenEcosystemState = {
    ...state,
    layers,
    ...summary,
    lastOutbreak: outbreak,
    log: [`JOUR ${String(day).padStart(3, '0')} — Biomasse ${summary.totalBiomass}%, spores ${summary.sporeIndex}%, parasites ${summary.parasiteIndex}%, containment ${summary.containmentIndex}%.`, ...lines, ...state.log].slice(0, 60),
  };
  return { xenEcosystem: next, sectors: nextSectors, statsDelta, lines };
}

export function resolveXenEcosystemOperation({ state, operation, sectors, selectedLayerId, selectedSectorId, stats, day }: { state: XenEcosystemState; operation: XenEcosystemOperation; sectors: Sector[]; selectedLayerId?: string; selectedSectorId?: string; stats: Stats; day: number }) {
  const targetLayer = state.layers.find((layer) => layer.id === selectedLayerId) ?? [...state.layers].sort((a, b) => (b.biomass + b.spread + b.mutationPressure) - (a.biomass + a.spread + a.mutationPressure))[0];
  const targetSectorId = selectedSectorId ?? targetLayer?.sectorId;
  const networkWide = operation.target === 'network';
  const sectorWide = operation.target === 'sector';
  let layers = state.layers.map((layer) => {
    const applies = networkWide || (sectorWide && layer.sectorId === targetSectorId) || (!sectorWide && layer.id === targetLayer?.id);
    if (!applies) return layer;
    const scale = networkWide ? 0.45 : sectorWide ? 0.72 : 1;
    return applyLayerEffects(layer, {
      biomass: Math.round((operation.layerEffects.biomass ?? 0) * scale),
      activity: Math.round((operation.layerEffects.activity ?? 0) * scale),
      spread: Math.round((operation.layerEffects.spread ?? 0) * scale),
      containment: Math.round((operation.layerEffects.containment ?? 0) * scale),
      mutationPressure: Math.round((operation.layerEffects.mutationPressure ?? 0) * scale),
      humanExposure: Math.round((operation.layerEffects.humanExposure ?? 0) * scale),
      discovered: operation.layerEffects.discovered,
    });
  });
  let nextSectors = sectors.map((sector) => {
    if (operation.target !== 'network' && sector.id !== targetSectorId) return { ...sector, units: { ...sector.units } };
    const scale = operation.target === 'network' ? 0.35 : 1;
    return {
      ...sector,
      units: { ...sector.units },
      rebel: add(sector.rebel, Math.round((operation.sectorEffects?.rebel ?? 0) * scale)),
      xen: add(sector.xen, Math.round((operation.sectorEffects?.xen ?? 0) * scale)),
      surveillance: add(sector.surveillance, Math.round((operation.sectorEffects?.surveillance ?? 0) * scale)),
      infrastructure: add(sector.infrastructure, Math.round((operation.sectorEffects?.infrastructure ?? 0) * scale)),
      loyalty: add(sector.loyalty, Math.round((operation.sectorEffects?.loyalty ?? 0) * scale)),
      fear: add(sector.fear, Math.round((operation.sectorEffects?.fear ?? 0) * scale)),
      population: Math.max(0, sector.population + Math.round((operation.sectorEffects?.population ?? 0) * scale)),
    };
  });
  const summary = summarize(layers);
  const chosenLayer = targetLayer ? `${xenLayerDefinitions[targetLayer.layerId].name} / ${nextSectors.find((sector) => sector.id === targetLayer.sectorId)?.name ?? targetLayer.sectorId}` : 'réseau Xen';
  const xenEcosystem: XenEcosystemState = {
    ...state,
    layers,
    ...summary,
    lastOutbreak: operation.logLine,
    log: [`JOUR ${String(day).padStart(3, '0')} — ${operation.logLine}`, `Cible : ${chosenLayer}.`, ...state.log].slice(0, 60),
  };
  const statsDelta: Partial<Stats> = { ...operation.cost, ...operation.effects };
  const lines = [operation.logLine, `Cible Xen : ${chosenLayer}. Biomasse ${summary.totalBiomass}% / mutation ${summary.mutationPressure}%.`];
  return { xenEcosystem, sectors: nextSectors, statsDelta, lines };
}
