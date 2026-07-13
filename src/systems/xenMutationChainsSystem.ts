import type { GameState, PopulationState, ProfileId, ScenarioId, Sector, Stats, TimelineId, VortigauntState, XenEcosystemLayerId, XenEcosystemState, XenMutationChainId, XenMutationChainState, XenMutationOperation, XenMutationPolicyId, XenMutationStage, XenMutationState } from '../types/game';
import { xenMutationChainDefinitions, xenMutationOperations, xenMutationPolicies } from '../data/xenMutationChains';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const add = (value: number, delta = 0, min = 0, max = 100) => clamp(value + delta, min, max);

function avg(values: number[]) {
  if (!values.length) return 0;
  return clamp(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function mutationStage(progress: number, mutationLoad: number): XenMutationStage {
  const pressure = progress * 0.62 + mutationLoad * 0.38;
  if (pressure >= 92) return 'catastrophic';
  if (pressure >= 74) return 'outbreak';
  if (pressure >= 52) return 'accelerating';
  if (pressure >= 24) return 'triggered';
  return 'latent';
}

function layerPressure(ecosystem: XenEcosystemState | undefined, sectorId: string, ids: XenEcosystemLayerId[]) {
  if (!ecosystem?.layers?.length) return 0;
  const layers = ecosystem.layers.filter((layer) => layer.sectorId === sectorId && ids.includes(layer.layerId));
  if (!layers.length) return 0;
  return avg(layers.map((layer) => layer.biomass * 0.28 + layer.spread * 0.24 + layer.mutationPressure * 0.3 + layer.humanExposure * 0.18));
}

function sectorSupportsChain(sector: Sector, chainId: XenMutationChainId, pressure: number) {
  const def = xenMutationChainDefinitions[chainId];
  if (def.preferredZones.includes(sector.zone)) return true;
  if (pressure > 42) return true;
  if (chainId === 'hospital_mutagenic_surge' && sector.id === 'hospital') return true;
  if (chainId === 'ichthyosaur_water_predation' && (sector.id === 'canals' || sector.connections.some((c) => c.type === 'canal'))) return true;
  return false;
}

function candidateChainsForSector(sector: Sector, ecosystem?: XenEcosystemState): XenMutationChainId[] {
  const candidates = Object.keys(xenMutationChainDefinitions) as XenMutationChainId[];
  return candidates.filter((chainId) => {
    const def = xenMutationChainDefinitions[chainId];
    const pressure = layerPressure(ecosystem, sector.id, def.requiredLayers);
    if (chainId === 'gonarch_alarm_chain') return pressure > 58 && sector.xen > 45;
    return sectorSupportsChain(sector, chainId, pressure) && (pressure > 16 || sector.xen > 28 || sector.status === 'Infesté');
  });
}

function chainIncident(chainId: XenMutationChainId, sectorName: string, stage: XenMutationStage) {
  const def = xenMutationChainDefinitions[chainId];
  if (stage === 'catastrophic') return `${sectorName} : ${def.combineLabel} classée catastrophe biologique, protocole Ravenholm-like recommandé.`;
  if (stage === 'outbreak') return `${sectorName} : flambée ${def.name}, chaîne ${def.loreChain.join(' → ')} confirmée.`;
  if (stage === 'accelerating') return `${sectorName} : accélération ${def.name}, hôtes et vecteurs en hausse.`;
  if (stage === 'triggered') return `${sectorName} : déclencheur ${def.trigger} observé.`;
  return `${sectorName} : ${def.combineLabel} sous seuil visible.`;
}

function summarize(chains: XenMutationChainState[]): Omit<XenMutationState, 'activePolicy' | 'chains' | 'lastChainEvent' | 'log'> {
  const by = (ids: XenMutationChainId[], field: keyof Pick<XenMutationChainState, 'progress' | 'triggerPressure' | 'containment' | 'hostPool' | 'conversionLoad' | 'mutationLoad'> = 'progress') => avg(chains.filter((chain) => ids.includes(chain.chainId)).map((chain) => chain[field]));
  const zombieIndex = by(['classic_zombie_conversion'], 'conversionLoad');
  const fastZombieIndex = by(['fast_zombie_conversion'], 'conversionLoad');
  const poisonZombieIndex = by(['poison_zombie_conversion'], 'conversionLoad');
  const hostConversionIndex = avg(chains.filter((chain) => chain.chainId.includes('zombie') || chain.chainId.includes('hospital')).map((chain) => chain.hostPool * 0.35 + chain.conversionLoad * 0.65));
  const mutationVelocity = avg(chains.map((chain) => chain.mutationLoad * 0.55 + chain.triggerPressure * 0.45));
  const outbreakRisk = clamp(chains.filter((chain) => chain.stage === 'outbreak').length * 14 + chains.filter((chain) => chain.stage === 'catastrophic').length * 25 + chains.filter((chain) => chain.stage === 'accelerating').length * 5 + mutationVelocity * 0.25);
  const sectorLockdownPressure = avg(chains.map((chain) => xenMutationChainDefinitions[chain.chainId].severity * 16 + chain.progress * 0.26 + chain.hostPool * 0.18));
  const antlionHivePressure = by(['antlion_hive_emergence'], 'mutationLoad');
  const logisticsBlockage = avg([by(['barnacle_logistics_lock'], 'progress'), by(['organic_tunnel_metastasis'], 'progress'), by(['ichthyosaur_water_predation'], 'progress')]);
  const quarantineDebt = clamp(avg(chains.map((chain) => Math.max(0, chain.progress - chain.containment))) + chains.filter((chain) => chain.stage === 'outbreak' || chain.stage === 'catastrophic').length * 6);
  return { zombieIndex, fastZombieIndex, poisonZombieIndex, hostConversionIndex, mutationVelocity, outbreakRisk, sectorLockdownPressure, antlionHivePressure, logisticsBlockage, quarantineDebt };
}

function initialPolicy(profile: ProfileId, scenario: ScenarioId, timeline: TimelineId): XenMutationPolicyId {
  if (profile === 'sympathizer') return 'triage_humanitarian_mask';
  if (profile === 'quarantine' || scenario === 'quarantine') return 'contain_hosts_first';
  if (profile === 'tyrant') return 'parasite_denial';
  if (timeline === 'alyx_era') return 'vortessence_guided_stabilization';
  if (timeline === 'citadel_collapse') return 'burn_mutation_sites';
  return 'contain_hosts_first';
}

export function createInitialXenMutationState({ scenario, profile, timeline, sectors, ecosystem }: { scenario: ScenarioId; profile: ProfileId; timeline: TimelineId; sectors: Sector[]; ecosystem?: XenEcosystemState }): XenMutationState {
  const scenarioBias = scenario === 'quarantine' ? 18 : scenario === 'uprising' ? 6 : scenario === 'post_nova' ? 7 : 0;
  const timelineBias = timeline === 'alyx_era' ? 10 : timeline === 'citadel_collapse' ? 20 : timeline === 'uprising' ? 8 : 0;
  const profileContainment = profile === 'quarantine' ? 12 : profile === 'tyrant' ? 8 : profile === 'sympathizer' ? 4 : 0;
  const chains: XenMutationChainState[] = [];
  for (const sector of sectors) {
    for (const chainId of candidateChainsForSector(sector, ecosystem)) {
      const def = xenMutationChainDefinitions[chainId];
      const pressure = layerPressure(ecosystem, sector.id, def.requiredLayers);
      const base = clamp(sector.xen * 0.45 + pressure * 0.55 + scenarioBias + timelineBias - sector.surveillance * 0.08 - sector.infrastructure * 0.04);
      if (base < 10) continue;
      const hostPool = clamp(sector.population / 120 + (100 - sector.loyalty) * 0.18 + sector.fear * 0.1 + (chainId.includes('zombie') ? 10 : 0));
      const containment = clamp(sector.surveillance * 0.42 + profileContainment + (sector.units.suppressor ?? 0) * 8 + (sector.units.scanner ?? 0) * 5);
      const conversionLoad = clamp(base * 0.55 + hostPool * 0.35 - containment * 0.16 + def.severity * 3);
      const mutationLoad = clamp(base * 0.45 + pressure * 0.35 + def.severity * 5 - containment * 0.18);
      const progress = clamp(base * 0.62 + conversionLoad * 0.2 + mutationLoad * 0.18);
      const stage = mutationStage(progress, mutationLoad);
      chains.push({
        id: `${sector.id}-${chainId}`,
        chainId,
        sectorId: sector.id,
        stage,
        progress,
        triggerPressure: base,
        containment,
        hostPool,
        conversionLoad,
        mutationLoad,
        discovered: sector.surveillance > 55 || sector.xen > 55 || stage !== 'latent',
        daysActive: 0,
        lastMutation: chainIncident(chainId, sector.name, stage),
      });
    }
  }
  const policy = initialPolicy(profile, scenario, timeline);
  const summary = summarize(chains);
  return {
    activePolicy: policy,
    chains,
    ...summary,
    lastChainEvent: 'Aucune chaîne mutagénique critique depuis initialisation.',
    log: [
      `Chaînes biologiques Xen initialisées : ${chains.length} protocoles cause/effet indexés.`,
      `Doctrine mutation active : ${xenMutationPolicies.find((item) => item.id === policy)?.name ?? policy}.`,
    ],
  };
}

export function migrateXenMutationState(game: Partial<GameState>): XenMutationState {
  if (game.xenMutation?.chains?.length) return { ...game.xenMutation, ...summarize(game.xenMutation.chains) };
  return createInitialXenMutationState({
    scenario: game.scenario ?? 'standard',
    profile: game.profile ?? 'loyalist',
    timeline: game.timeline ?? 'pre_hl2',
    sectors: game.sectors ?? [],
    ecosystem: game.xenEcosystem,
  });
}

function applyChainEffects(chain: XenMutationChainState, effects: XenMutationOperation['chainEffects'], scale = 1): XenMutationChainState {
  const progress = add(chain.progress, Math.round((effects.progress ?? 0) * scale));
  const triggerPressure = add(chain.triggerPressure, Math.round((effects.triggerPressure ?? 0) * scale));
  const containment = add(chain.containment, Math.round((effects.containment ?? 0) * scale));
  const hostPool = add(chain.hostPool, Math.round((effects.hostPool ?? 0) * scale));
  const conversionLoad = add(chain.conversionLoad, Math.round((effects.conversionLoad ?? 0) * scale));
  const mutationLoad = add(chain.mutationLoad, Math.round((effects.mutationLoad ?? 0) * scale));
  return { ...chain, progress, triggerPressure, containment, hostPool, conversionLoad, mutationLoad, discovered: effects.discovered ?? chain.discovered, stage: mutationStage(progress, mutationLoad) };
}

export function setXenMutationPolicy(state: XenMutationState, policyId: XenMutationPolicyId) {
  const policy = xenMutationPolicies.find((item) => item.id === policyId) ?? xenMutationPolicies[0];
  const chains = state.chains.map((chain) => {
    const bias = policy.chainBias[chain.chainId] ?? 0;
    return applyChainEffects(chain, {
      progress: Math.round(bias * 0.8),
      triggerPressure: Math.round(bias * 0.6),
      containment: policy.containmentBias,
      hostPool: -policy.civilianCost,
      mutationLoad: Math.round(bias * 0.4),
    });
  });
  const summary = summarize(chains);
  const xenMutation: XenMutationState = {
    ...state,
    activePolicy: policy.id,
    chains,
    ...summary,
    log: [`COAN — Doctrine mutation active : ${policy.name}.`, policy.description, ...state.log].slice(0, 70),
  };
  return { xenMutation, statsDelta: { ...policy.effects, suspicion: (policy.effects.suspicion ?? 0) + policy.advisorRisk * 0.2 }, lines: [`Doctrine mutation active : ${policy.name}.`, policy.publicLine] };
}

export function simulateXenMutationDay({ state, sectors, stats, ecosystem, population, vortigaunts, day }: { state: XenMutationState; sectors: Sector[]; stats: Stats; ecosystem: XenEcosystemState; population?: PopulationState; vortigaunts?: VortigauntState; day: number }) {
  const policy = xenMutationPolicies.find((item) => item.id === state.activePolicy) ?? xenMutationPolicies[0];
  let nextSectors = sectors.map((sector) => ({ ...sector, units: { ...sector.units } }));
  const bySector = new Map(nextSectors.map((sector) => [sector.id, sector]));
  const existing = new Set(state.chains.map((chain) => chain.id));
  let chains = state.chains.map((chain) => ({ ...chain }));
  const lines: string[] = [];
  let lastChainEvent = state.lastChainEvent;

  // If the ecosystem seeded a new biological layer, unlock the matching mutation chains.
  for (const sector of nextSectors) {
    for (const chainId of candidateChainsForSector(sector, ecosystem)) {
      const id = `${sector.id}-${chainId}`;
      if (existing.has(id)) continue;
      const def = xenMutationChainDefinitions[chainId];
      const pressure = layerPressure(ecosystem, sector.id, def.requiredLayers);
      const seed = clamp(pressure * 0.58 + sector.xen * 0.34 - sector.surveillance * 0.08);
      if (seed < 22) continue;
      const hostPool = clamp(sector.population / 150 + (100 - sector.loyalty) * 0.16 + def.severity * 4);
      const containment = clamp(sector.surveillance * 0.42 + (vortigaunts?.quarantineAid ?? 0) * 0.08);
      const mutationLoad = clamp(seed * 0.55 + def.severity * 7 - containment * 0.2);
      chains.push({
        id,
        chainId,
        sectorId: sector.id,
        stage: mutationStage(seed, mutationLoad),
        progress: seed,
        triggerPressure: seed,
        containment,
        hostPool,
        conversionLoad: clamp(seed * 0.45 + hostPool * 0.22),
        mutationLoad,
        discovered: false,
        daysActive: 0,
        lastMutation: `Nouvelle chaîne ${def.name} détectable dans ${sector.name}.`,
      });
      existing.add(id);
      lines.push(`Nouvelle chaîne Xen : ${def.name} dans ${sector.name}.`);
    }
  }

  chains = chains.map((chain, index) => {
    const sector = bySector.get(chain.sectorId);
    const def = xenMutationChainDefinitions[chain.chainId];
    if (!sector) return chain;
    const populationSector = population?.sectors.find((item) => item.sectorId === sector.id);
    const localExposure = populationSector?.xenExposure ?? Math.round(sector.xen * 0.5);
    const layer = layerPressure(ecosystem, sector.id, def.requiredLayers);
    const policyBias = policy.chainBias[chain.chainId] ?? 0;
    const vortAid = vortigaunts?.quarantineAid ?? 0;
    const vulnerableHosts = sector.population / 280 + localExposure * 0.22 + (stats.rations < 500 ? 6 : 0) + (stats.fatigue > 70 ? 5 : 0);
    const containmentDelta = sector.surveillance * 0.035 + stats.combine * 0.022 + vortAid * 0.035 + policy.containmentBias * 0.18 - chain.triggerPressure * 0.018;
    const triggerDelta = layer * 0.06 + sector.xen * 0.045 + def.severity * 0.9 + stats.xen * 0.018 + policyBias * 0.08 - chain.containment * 0.035;
    const hostDelta = vulnerableHosts * 0.07 - chain.containment * 0.035 - Math.max(0, policy.civilianCost) * 0.08;
    const conversionDelta = (chain.hostPool + vulnerableHosts) * 0.035 + layer * 0.03 - chain.containment * 0.04 + (chain.chainId.includes('zombie') ? 0.8 : 0);
    const mutationPulse = (day + index) % 8 === 0 ? 1.5 : 0;
    const mutationDelta = layer * 0.04 + ecosystem.mutationPressure * 0.028 + policyBias * 0.06 - chain.containment * 0.03 + mutationPulse;
    const progress = add(chain.progress, triggerDelta + conversionDelta * 0.35 + mutationDelta * 0.45 - chain.containment * 0.018);
    const triggerPressure = add(chain.triggerPressure, triggerDelta);
    const containment = add(chain.containment, containmentDelta);
    const hostPool = add(chain.hostPool, hostDelta);
    const conversionLoad = add(chain.conversionLoad, conversionDelta);
    const mutationLoad = add(chain.mutationLoad, mutationDelta);
    const stage = mutationStage(progress, mutationLoad);
    const discovered = chain.discovered || containment > 50 || stats.info > 72 || stage === 'accelerating' || stage === 'outbreak' || stage === 'catastrophic';
    const lastMutation = chainIncident(chain.chainId, sector.name, stage);
    if (stage === 'outbreak' || stage === 'catastrophic') lastChainEvent = lastMutation;
    return { ...chain, progress, triggerPressure, containment, hostPool, conversionLoad, mutationLoad, stage, discovered, daysActive: chain.daysActive + 1, lastMutation };
  });

  nextSectors = nextSectors.map((sector) => {
    const localChains = chains.filter((chain) => chain.sectorId === sector.id);
    if (!localChains.length) return sector;
    let localXen = 0;
    let localFear = 0;
    let localLoyalty = 0;
    let localInfrastructure = 0;
    let populationLoss = 0;
    let status = sector.status;
    for (const chain of localChains) {
      const def = xenMutationChainDefinitions[chain.chainId];
      const stageMultiplier = chain.stage === 'catastrophic' ? 1.8 : chain.stage === 'outbreak' ? 1.25 : chain.stage === 'accelerating' ? 0.72 : chain.stage === 'triggered' ? 0.36 : 0.14;
      localXen += (def.sectorEffects.xen ?? 0) * stageMultiplier * 0.18;
      localFear += (def.sectorEffects.fear ?? 0) * stageMultiplier * 0.22;
      localLoyalty += (def.sectorEffects.loyalty ?? 0) * stageMultiplier * 0.2;
      localInfrastructure += (def.sectorEffects.infrastructure ?? 0) * stageMultiplier * 0.18;
      populationLoss += Math.max(0, (-(def.sectorEffects.population ?? 0)) * stageMultiplier * 0.22 + chain.conversionLoad * 0.05);
      if (chain.stage === 'catastrophic') status = def.sectorEffects.status ?? 'Infesté';
      else if (chain.stage === 'outbreak' && status !== 'Scellé' && status !== 'Bombardé') status = def.sectorEffects.status ?? 'Infesté';
      else if (chain.stage === 'accelerating' && status === 'Stable') status = 'Contaminé';
    }
    return {
      ...sector,
      xen: add(sector.xen, localXen),
      fear: add(sector.fear, localFear),
      loyalty: add(sector.loyalty, localLoyalty),
      infrastructure: add(sector.infrastructure, localInfrastructure),
      population: Math.max(0, sector.population - Math.round(populationLoss)),
      status,
    };
  });

  const summary = summarize(chains);
  const activeOutbreaks = chains.filter((chain) => chain.stage === 'outbreak' || chain.stage === 'catastrophic');
  const statsDelta: Partial<Stats> = {
    xen: clamp(summary.mutationVelocity * 0.045 + summary.outbreakRisk * 0.035 - stats.xen * 0.01, -4, 10),
    fear: Math.round(summary.hostConversionIndex * 0.035 + summary.outbreakRisk * 0.04),
    fatigue: Math.round(summary.quarantineDebt * 0.035 + summary.zombieIndex * 0.02),
    loyalty: -Math.round(summary.sectorLockdownPressure * 0.025),
    production: -Math.round((summary.logisticsBlockage + summary.antlionHivePressure) * 0.04),
    civilianLosses: Math.round(summary.hostConversionIndex * 0.7 + summary.poisonZombieIndex * 0.5 + summary.outbreakRisk * 0.35),
    combineLosses: activeOutbreaks.some((chain) => ['fast_zombie_conversion', 'antlion_hive_emergence', 'gonarch_alarm_chain'].includes(chain.chainId)) ? 2 : activeOutbreaks.length > 0 ? 1 : 0,
    suspicion: policy.advisorRisk > 6 && summary.outbreakRisk > 45 ? 2 : 0,
  };

  if (summary.zombieIndex > 48) lines.push(`Mutation chain : zombies classiques ${summary.zombieIndex}%, triage hôtes recommandé.`);
  if (summary.fastZombieIndex > 42) lines.push(`Mutation chain : fast zombie vector ${summary.fastZombieIndex}%, verrouillage vertical requis.`);
  if (summary.poisonZombieIndex > 35) lines.push(`Mutation chain : poison host cascade ${summary.poisonZombieIndex}%, biohazard lock recommandé.`);
  if (summary.antlionHivePressure > 45) lines.push(`Mutation chain : ruche antlion ${summary.antlionHivePressure}%, grille Thumper prioritaire.`);
  if (summary.logisticsBlockage > 45) lines.push(`Mutation chain : blocage logistique ${summary.logisticsBlockage}%, canaux/plafonds non fiables.`);
  if (activeOutbreaks.length) lines.push(`Mutation chain : ${activeOutbreaks.length} flambée(s) active(s), risque Ravenholm-like ${summary.outbreakRisk}%.`);

  const next: XenMutationState = {
    ...state,
    chains,
    ...summary,
    lastChainEvent,
    log: [`JOUR ${String(day).padStart(3, '0')} — chaînes Xen : outbreak ${summary.outbreakRisk}%, conversion ${summary.hostConversionIndex}%, dette quarantaine ${summary.quarantineDebt}%.`, ...lines, ...state.log].slice(0, 70),
  };
  return { xenMutation: next, sectors: nextSectors, statsDelta, lines };
}

export function resolveXenMutationOperation({ state, operation, sectors, selectedChainId, selectedSectorId, stats: _stats, day }: { state: XenMutationState; operation: XenMutationOperation; sectors: Sector[]; selectedChainId?: string; selectedSectorId?: string; stats: Stats; day: number }) {
  const targetChain = state.chains.find((chain) => chain.id === selectedChainId) ?? [...state.chains].sort((a, b) => (b.progress + b.conversionLoad + b.mutationLoad) - (a.progress + a.conversionLoad + a.mutationLoad))[0];
  const targetSectorId = selectedSectorId ?? targetChain?.sectorId;
  const networkWide = operation.target === 'network';
  const sectorWide = operation.target === 'sector';
  const chains = state.chains.map((chain) => {
    const applies = networkWide || (sectorWide && chain.sectorId === targetSectorId) || (!sectorWide && chain.id === targetChain?.id);
    if (!applies) return chain;
    const scale = networkWide ? 0.42 : sectorWide ? 0.72 : 1;
    return applyChainEffects(chain, operation.chainEffects, scale);
  });
  const nextSectors = sectors.map((sector) => {
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
      status: operation.sectorEffects?.status ?? sector.status,
    };
  });
  const summary = summarize(chains);
  const chosen = targetChain ? `${xenMutationChainDefinitions[targetChain.chainId].name} / ${nextSectors.find((sector) => sector.id === targetChain.sectorId)?.name ?? targetChain.sectorId}` : 'réseau mutation Xen';
  const xenMutation: XenMutationState = {
    ...state,
    chains,
    ...summary,
    lastChainEvent: operation.logLine,
    log: [`JOUR ${String(day).padStart(3, '0')} — ${operation.logLine}`, `Cible mutation : ${chosen}.`, ...state.log].slice(0, 70),
  };
  const statsDelta: Partial<Stats> = { ...operation.cost, ...operation.effects };
  const lines = [operation.logLine, `Cible mutation : ${chosen}. Outbreak ${summary.outbreakRisk}% / conversion ${summary.hostConversionIndex}%.`];
  return { xenMutation, sectors: nextSectors, statsDelta, lines };
}

export { xenMutationOperations };
