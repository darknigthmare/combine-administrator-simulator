import type { GameState, ProfileId, RationEconomyState, RationOperation, RationPolicy, RationPolicyId, RationSectorLedger, ScenarioId, Sector, Stats, TimelineId } from '../types/game';
import { rationPolicies } from '../data/rationEconomy';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
function getPolicy(policyId: RationPolicyId): RationPolicy {
  return rationPolicies.find((policy) => policy.id === policyId) ?? rationPolicies[0];
}

function sectorPriority(sector: Sector): RationSectorLedger['priority'] {
  if (sector.zone === 'Citadelle' || sector.id === 'admin') return 'Citadel';
  if (sector.zone === 'Infrastructure' || sector.id.includes('industrial') || sector.id.includes('razor')) return 'Industry';
  if (sector.status === 'En quarantaine' || sector.status === 'Contaminé' || sector.status === 'Infesté' || sector.zone === 'Quarantaine') return 'Quarantine';
  if (sector.status === 'Insurgé' || sector.status === 'Contrôle rebelle' || sector.rebel > 58) return 'Punished';
  if (sector.infrastructure < 42 || sector.loyalty < 25) return 'Underclass';
  return 'Residential';
}

function baseNeed(sector: Sector): number {
  if (sector.status === 'Scellé' || sector.status === 'Abandonné') return 0;
  const zoneFactor = sector.zone === 'Citadelle' ? 0.014 : sector.zone === 'Infrastructure' ? 0.022 : sector.zone === 'Quarantaine' ? 0.026 : 0.018;
  const stressFactor = 1 + sector.fear * 0.002 + Math.max(0, 60 - sector.infrastructure) * 0.004;
  return Math.ceil(sector.population * zoneFactor * stressFactor);
}

export function createInitialRationEconomy(params: { scenario: ScenarioId; profile: ProfileId; timeline: TimelineId; sectors: Sector[]; reserves: number }): RationEconomyState {
  const policyByProfile: Record<ProfileId, RationPolicyId> = {
    loyalist: 'loyalty_priority',
    technocrat: 'industrial_priority',
    tyrant: 'punitive',
    collaborator: 'cp_informant_bounty',
    sympathizer: 'humanitarian_mask',
    quarantine: 'standard',
  };
  const scenarioShift = params.scenario === 'quarantine' ? -220 : params.scenario === 'uprising' ? -360 : params.scenario === 'post_nova' ? -180 : 0;
  const timelineShift = params.timeline === 'uprising' || params.timeline === 'citadel_collapse' ? -280 : params.timeline === 'seven_hour_aftermath' ? -120 : 0;
  const ledgers = params.sectors.map((sector) => {
    const priority = sectorPriority(sector);
    const dailyNeed = baseNeed(sector);
    const rationPenalty = priority === 'Punished' ? 22 : priority === 'Underclass' ? 14 : priority === 'Quarantine' ? 8 : 0;
    return {
      sectorId: sector.id,
      priority,
      dailyNeed,
      allocated: Math.max(0, Math.round(dailyNeed * (priority === 'Citadel' ? 1.08 : priority === 'Industry' ? 1.02 : 0.86))),
      caloricRatio: dailyNeed > 0 ? 86 : 100,
      hunger: clamp(100 - sector.loyalty + rationPenalty - sector.fear * 0.15, 8, 88),
      blackMarket: clamp(sector.rebel * 0.45 + (100 - sector.loyalty) * 0.35 + rationPenalty, 4, 92),
      informants: clamp(sector.surveillance * 0.28 + sector.fear * 0.22, 0, 80),
      hoarding: clamp((100 - sector.infrastructure) * 0.4 + sector.fear * 0.2, 0, 75),
      complianceBonus: priority === 'Citadel' || priority === 'Industry' ? 12 : 0,
      lastIncident: 'Aucun incident alimentaire majeur archivé.',
    } satisfies RationSectorLedger;
  });
  const dailyNeed = ledgers.reduce((sum, item) => sum + item.dailyNeed, 0);
  const reserves = Math.max(0, params.reserves + scenarioShift + timelineShift);
  return {
    activePolicy: policyByProfile[params.profile],
    reserves,
    dailyProduction: 0,
    dailyNeed,
    dailyAllocated: 0,
    dailyDeficit: 0,
    autonomyDays: Math.floor(reserves / Math.max(1, dailyNeed)),
    blackMarketIndex: clamp(ledgers.reduce((sum, item) => sum + item.blackMarket, 0) / Math.max(1, ledgers.length)),
    hungerIndex: clamp(ledgers.reduce((sum, item) => sum + item.hunger, 0) / Math.max(1, ledgers.length)),
    informantIndex: clamp(ledgers.reduce((sum, item) => sum + item.informants, 0) / Math.max(1, ledgers.length)),
    corruptionLeakage: 8,
    hiddenRelief: params.profile === 'sympathizer' ? 8 : 0,
    ledgers,
    log: ['Ration Control Office initialisé. Les stocks alimentaires sont maintenant traités comme un levier de contrôle civique.'],
  };
}

export function migrateRationEconomy(game: Pick<GameState, 'scenario' | 'profile' | 'timeline' | 'sectors' | 'stats'> & Partial<Pick<GameState, 'rationEconomy'>>): RationEconomyState {
  if (game.rationEconomy?.ledgers?.length) return game.rationEconomy;
  return createInitialRationEconomy({ scenario: game.scenario, profile: game.profile, timeline: game.timeline, sectors: game.sectors, reserves: game.stats.rations });
}

export function changeRationPolicy(state: RationEconomyState, policyId: RationPolicyId): { rationEconomy: RationEconomyState; statsDelta: Partial<Stats>; lines: string[] } {
  const policy = getPolicy(policyId);
  return {
    rationEconomy: {
      ...state,
      activePolicy: policyId,
      log: [`Politique rationnement : ${policy.name}. ${policy.publicJustification}`, ...state.log].slice(0, 60),
    },
    statsDelta: { ...policy.effects, suspicion: (policy.effects.suspicion ?? 0) + policy.suspicionRisk },
    lines: [`Ration Control : politique active définie sur ${policy.name}.`, policy.publicJustification],
  };
}

export function resolveRationOperation(params: { state: RationEconomyState; operation: RationOperation; sectors: Sector[]; stats: Stats; day: number }): { rationEconomy: RationEconomyState; sectors: Sector[]; statsDelta: Partial<Stats>; lines: string[] } {
  const { state, operation } = params;
  const newReserves = Math.max(0, state.reserves - operation.cost);
  const ledgers = state.ledgers.map((ledger) => ({
    ...ledger,
    hunger: clamp(ledger.hunger + (operation.ledgerEffects.hunger ?? 0)),
    blackMarket: clamp(ledger.blackMarket + (operation.ledgerEffects.blackMarket ?? 0)),
    informants: clamp(ledger.informants + (operation.ledgerEffects.informants ?? 0)),
    hoarding: clamp(ledger.hoarding + (operation.ledgerEffects.hoarding ?? 0)),
    complianceBonus: clamp(ledger.complianceBonus + (operation.ledgerEffects.complianceBonus ?? 0)),
    lastIncident: `${operation.name} appliqué au jour ${params.day}.`,
  }));
  const hungerIndex = clamp(ledgers.reduce((sum, item) => sum + item.hunger, 0) / Math.max(1, ledgers.length));
  const blackMarketIndex = clamp(ledgers.reduce((sum, item) => sum + item.blackMarket, 0) / Math.max(1, ledgers.length));
  const informantIndex = clamp(ledgers.reduce((sum, item) => sum + item.informants, 0) / Math.max(1, ledgers.length));
  const sectors = params.sectors.map((sector) => {
    const ledger = ledgers.find((item) => item.sectorId === sector.id);
    if (!ledger) return sector;
    return {
      ...sector,
      rebel: clamp(sector.rebel + Math.max(0, ledger.hunger - 65) * 0.08 + Math.max(0, ledger.blackMarket - 70) * 0.05 - Math.max(0, ledger.informants - 65) * 0.04),
      loyalty: clamp(sector.loyalty - Math.max(0, ledger.hunger - 65) * 0.06 + Math.max(0, ledger.complianceBonus - 20) * 0.04),
      fear: clamp(sector.fear + Math.max(0, ledger.informants - 70) * 0.04),
    };
  });
  const rationEconomy = {
    ...state,
    reserves: newReserves,
    hungerIndex,
    blackMarketIndex,
    informantIndex,
    autonomyDays: Math.floor(newReserves / Math.max(1, state.dailyNeed)),
    ledgers,
    log: [`Opération : ${operation.name}. ${operation.description}`, ...state.log].slice(0, 60),
  };
  return {
    rationEconomy,
    sectors,
    statsDelta: { ...operation.effects, rations: (operation.effects.rations ?? 0) - Math.max(0, operation.cost), suspicion: (operation.effects.suspicion ?? 0) + Math.ceil(operation.risk / 12) },
    lines: [`Ration Control : ${operation.name}.`, operation.description],
  };
}

export function simulateRationDay(params: { state: RationEconomyState; sectors: Sector[]; stats: Stats; day: number; timeline: TimelineId }): { rationEconomy: RationEconomyState; sectors: Sector[]; statsDelta: Partial<Stats>; lines: string[] } {
  const policy = getPolicy(params.state.activePolicy);
  const production = Math.max(20, Math.round(params.stats.production * 4.7 + params.stats.stability * 0.8 - params.stats.xen * 1.25 - params.stats.rebel * 0.65));
  const timelineStress = params.timeline === 'uprising' ? 1.22 : params.timeline === 'citadel_collapse' ? 1.35 : params.timeline === 'post_nova_prospekt' ? 1.12 : 1;
  const refreshedLedgers = params.sectors.map((sector) => {
    const prev = params.state.ledgers.find((item) => item.sectorId === sector.id);
    const priority = sectorPriority(sector);
    const dailyNeed = Math.ceil(baseNeed(sector) * timelineStress);
    const bias = policy.allocationBias[priority] ?? 1;
    const scarcity = Math.max(0.38, Math.min(1.18, (params.state.reserves + production) / Math.max(1, params.state.dailyNeed * 4)));
    const allocated = Math.max(0, Math.round(dailyNeed * bias * scarcity));
    const ratio = dailyNeed <= 0 ? 100 : clamp((allocated / dailyNeed) * 100, 0, 130);
    const deficit = Math.max(0, dailyNeed - allocated);
    const hungerShift = deficit * 0.14 + Math.max(0, 82 - ratio) * 0.1 + (policy.id === 'punitive' ? 4 : 0) - (policy.id === 'humanitarian_mask' ? 5 : 0);
    const blackShift = Math.max(0, deficit) * 0.09 + policy.blackMarketPressure * 0.35 + Math.max(0, 55 - sector.loyalty) * 0.05;
    const informantShift = policy.informantPressure * 0.35 + Math.max(0, sector.fear - 55) * 0.04 - (policy.id === 'humanitarian_mask' ? 2 : 0);
    const hoardingShift = Math.max(0, 75 - ratio) * 0.08 + Math.max(0, sector.fear - 70) * 0.04;
    const hunger = clamp((prev?.hunger ?? 20) + hungerShift - Math.max(0, ratio - 95) * 0.06);
    const blackMarket = clamp((prev?.blackMarket ?? 20) + blackShift - Math.max(0, params.stats.info - 62) * 0.05);
    const informants = clamp((prev?.informants ?? 10) + informantShift);
    const hoarding = clamp((prev?.hoarding ?? 8) + hoardingShift - params.stats.combine * 0.025);
    let lastIncident = 'Distribution exécutée sans incident majeur.';
    if (hunger > 82) lastIncident = 'File de rationnement cassée, familles déplacées vers les canaux.';
    else if (blackMarket > 78) lastIncident = 'Troc clandestin de protéines et coupons falsifiés détecté.';
    else if (informants > 74) lastIncident = 'Dénonciations contre suppléments en hausse, qualité des informations instable.';
    else if (ratio > 102) lastIncident = 'Secteur présenté comme conforme et productif dans le BreenCast local.';
    return {
      sectorId: sector.id,
      priority,
      dailyNeed,
      allocated,
      caloricRatio: ratio,
      hunger,
      blackMarket,
      informants,
      hoarding,
      complianceBonus: clamp((prev?.complianceBonus ?? 0) + (ratio > 95 ? 2 : -1) + (priority === 'Citadel' ? 1 : 0)),
      lastIncident,
    } satisfies RationSectorLedger;
  });
  const dailyNeed = refreshedLedgers.reduce((sum, item) => sum + item.dailyNeed, 0);
  const dailyAllocated = refreshedLedgers.reduce((sum, item) => sum + item.allocated, 0);
  const leakage = Math.round(refreshedLedgers.reduce((sum, item) => sum + item.blackMarket + item.hoarding, 0) / Math.max(1, refreshedLedgers.length) * 0.55);
  const dailyDeficit = Math.max(0, dailyNeed - dailyAllocated);
  const reserves = Math.max(0, params.state.reserves + production - dailyAllocated - leakage);
  const hungerIndex = clamp(refreshedLedgers.reduce((sum, item) => sum + item.hunger, 0) / Math.max(1, refreshedLedgers.length));
  const blackMarketIndex = clamp(refreshedLedgers.reduce((sum, item) => sum + item.blackMarket, 0) / Math.max(1, refreshedLedgers.length));
  const informantIndex = clamp(refreshedLedgers.reduce((sum, item) => sum + item.informants, 0) / Math.max(1, refreshedLedgers.length));
  const corruptionLeakage = clamp(leakage / Math.max(1, dailyNeed) * 100 + blackMarketIndex * 0.12);
  const sectors = params.sectors.map((sector) => {
    const ledger = refreshedLedgers.find((item) => item.sectorId === sector.id);
    if (!ledger) return sector;
    const hungerRebel = Math.max(0, ledger.hunger - 60) * 0.075;
    const marketRebel = Math.max(0, ledger.blackMarket - 64) * 0.055;
    const informantSuppression = Math.max(0, ledger.informants - 62) * 0.045;
    return {
      ...sector,
      rebel: clamp(sector.rebel + hungerRebel + marketRebel - informantSuppression),
      loyalty: clamp(sector.loyalty - Math.max(0, ledger.hunger - 58) * 0.06 - Math.max(0, ledger.hoarding - 70) * 0.03 + Math.max(0, ledger.caloricRatio - 95) * 0.04),
      fear: clamp(sector.fear + Math.max(0, ledger.informants - 72) * 0.04 + (policy.id === 'punitive' ? 1 : 0)),
      infrastructure: clamp(sector.infrastructure - Math.max(0, ledger.blackMarket - 82) * 0.025),
    };
  });
  const statsDelta: Partial<Stats> = {
    rations: reserves - params.stats.rations,
    fatigue: Math.round(hungerIndex * 0.09 + dailyDeficit * 0.015 - (policy.id === 'humanitarian_mask' ? 4 : 0)),
    loyalty: Math.round(-Math.max(0, hungerIndex - 48) * 0.09 + (policy.id === 'humanitarian_mask' ? 3 : 0)),
    rebel: Math.round(Math.max(0, hungerIndex - 55) * 0.07 + Math.max(0, blackMarketIndex - 60) * 0.05 - Math.max(0, informantIndex - 70) * 0.04),
    info: Math.round(Math.max(0, informantIndex - 45) * 0.05 - Math.max(0, blackMarketIndex - 80) * 0.05),
    production: Math.round(-Math.max(0, hungerIndex - 70) * 0.05 + (policy.id === 'industrial_priority' ? 2 : 0)),
    suspicion: policy.suspicionRisk + Math.round(Math.max(0, corruptionLeakage - 35) * 0.04),
  };
  const rationEconomy: RationEconomyState = {
    ...params.state,
    reserves,
    dailyProduction: production,
    dailyNeed,
    dailyAllocated,
    dailyDeficit,
    autonomyDays: Math.floor(reserves / Math.max(1, dailyNeed)),
    blackMarketIndex,
    hungerIndex,
    informantIndex,
    corruptionLeakage,
    ledgers: refreshedLedgers,
    log: [
      `Jour ${params.day} : production ${production}, besoin ${dailyNeed}, alloué ${dailyAllocated}, fuite ${leakage}, déficit ${dailyDeficit}.`,
      ...params.state.log,
    ].slice(0, 60),
  };
  const worst = [...refreshedLedgers].sort((a, b) => (b.hunger + b.blackMarket) - (a.hunger + a.blackMarket)).slice(0, 3);
  const lines = [
    `Ration Control : ${policy.name}.`,
    `Production alimentaire/industrielle convertie : +${production}. Besoin civique : ${dailyNeed}. Alloué : ${dailyAllocated}. Fuites marché noir/hoarding : ${leakage}.`,
    `Autonomie alimentaire : ${rationEconomy.autonomyDays} jours. Faim moyenne : ${hungerIndex}%. Marché noir : ${blackMarketIndex}%. Informateurs : ${informantIndex}%.`,
    ...worst.map((ledger) => `${params.sectors.find((sector) => sector.id === ledger.sectorId)?.name ?? ledger.sectorId} : faim ${ledger.hunger}%, marché noir ${ledger.blackMarket}%, ratio calorique ${ledger.caloricRatio}% — ${ledger.lastIncident}`),
  ];
  return { rationEconomy, sectors, statsDelta, lines };
}
