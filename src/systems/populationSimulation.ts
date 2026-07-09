import type { GameState, PopulationGroupId, PopulationSectorState, PopulationState, ProfileId, RationEconomyState, ScenarioId, Sector, Stats, TimelineId } from '../types/game';
import { populationGroupDefinitions, populationGroupOrder } from '../data/populationGroups';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const positive = (value: number) => Math.max(0, Math.round(value));

const emptyGroups = (): Record<PopulationGroupId, number> => Object.fromEntries(populationGroupOrder.map((id) => [id, 0])) as Record<PopulationGroupId, number>;

function normalizeGroups(groups: Record<PopulationGroupId, number>, target: number): Record<PopulationGroupId, number> {
  const current = Object.values(groups).reduce((sum, value) => sum + value, 0);
  if (current <= 0 || target <= 0) return emptyGroups();
  const normalized = emptyGroups();
  let assigned = 0;
  for (const id of populationGroupOrder) {
    normalized[id] = Math.max(0, Math.floor((groups[id] / current) * target));
    assigned += normalized[id];
  }
  normalized.neutral_citizens += target - assigned;
  return normalized;
}

function allocate(base: number, ratios: Partial<Record<PopulationGroupId, number>>): Record<PopulationGroupId, number> {
  const groups = emptyGroups();
  for (const id of populationGroupOrder) groups[id] = Math.floor(base * (ratios[id] ?? 0));
  return normalizeGroups(groups, base);
}

function baseRatiosForSector(sector: Sector): Partial<Record<PopulationGroupId, number>> {
  const ratios: Partial<Record<PopulationGroupId, number>> = {
    loyal_citizens: 0.16,
    neutral_citizens: 0.38,
    hungry_citizens: 0.08,
    suspected_citizens: 0.05,
    collaborators: 0.03,
    informants: 0.02,
    disappeared_families: 0.04,
    industrial_workers: 0.08,
    internal_refugees: 0.04,
    lambda_sympathizers: 0.07,
    xen_exposed: 0.05,
  };

  if (sector.zone === 'Résidentiel') {
    ratios.neutral_citizens = 0.45;
    ratios.hungry_citizens = 0.12;
    ratios.disappeared_families = 0.06;
    ratios.lambda_sympathizers = 0.09;
    ratios.industrial_workers = 0.03;
  }
  if (sector.zone === 'Infrastructure') {
    ratios.industrial_workers = 0.3;
    ratios.collaborators = 0.05;
    ratios.neutral_citizens = 0.25;
    ratios.lambda_sympathizers = 0.08;
  }
  if (sector.zone === 'Centre administratif' || sector.zone === 'Citadelle') {
    ratios.loyal_citizens = 0.26;
    ratios.collaborators = 0.13;
    ratios.informants = 0.07;
    ratios.suspected_citizens = 0.03;
    ratios.xen_exposed = 0.01;
  }
  if (sector.zone === 'Souterrain') {
    ratios.lambda_sympathizers = 0.18;
    ratios.suspected_citizens = 0.1;
    ratios.internal_refugees = 0.12;
    ratios.xen_exposed = 0.09;
    ratios.loyal_citizens = 0.04;
  }
  if (sector.zone === 'Quarantaine' || sector.xen > 50) {
    ratios.xen_exposed = 0.26;
    ratios.internal_refugees = 0.12;
    ratios.neutral_citizens = 0.22;
    ratios.loyal_citizens = 0.05;
  }
  if (sector.rebel > 55) {
    ratios.lambda_sympathizers = Math.max(ratios.lambda_sympathizers ?? 0, 0.22);
    ratios.suspected_citizens = Math.max(ratios.suspected_citizens ?? 0, 0.11);
  }

  return ratios;
}

export function createInitialPopulationState({ sectors, scenario, timeline, profile }: { sectors: Sector[]; scenario: ScenarioId; timeline: TimelineId; profile: ProfileId }): PopulationState {
  const sectorsState: PopulationSectorState[] = sectors.map((sector) => {
    let groups = allocate(sector.population, baseRatiosForSector(sector));
    if (scenario === 'uprising' || scenario === 'post_nova') {
      groups.lambda_sympathizers += Math.floor(sector.population * 0.05);
      groups.disappeared_families += Math.floor(sector.population * 0.03);
      groups.neutral_citizens -= Math.floor(sector.population * 0.08);
    }
    if (scenario === 'quarantine' || timeline === 'alyx_era') {
      groups.xen_exposed += Math.floor(sector.population * 0.04);
      groups.internal_refugees += Math.floor(sector.population * 0.02);
      groups.neutral_citizens -= Math.floor(sector.population * 0.06);
    }
    if (profile === 'tyrant') {
      groups.informants += Math.floor(sector.population * 0.02);
      groups.disappeared_families += Math.floor(sector.population * 0.02);
      groups.neutral_citizens -= Math.floor(sector.population * 0.04);
    }
    if (profile === 'sympathizer') {
      groups.lambda_sympathizers += Math.floor(sector.population * 0.03);
      groups.loyal_citizens -= Math.floor(sector.population * 0.02);
      groups.neutral_citizens -= Math.floor(sector.population * 0.01);
    }
    groups = normalizeGroups(groups, sector.population);
    return buildSectorPopulation(sector, groups, 'Registre initial synchronisé avec affectation résidentielle Combine.');
  });
  return summarizePopulation(sectorsState, ['Registre population initialisé : strates civiles, Lambda, informateurs et exposition Xen séparées par secteur.']);
}

function buildSectorPopulation(sector: Sector, groups: Record<PopulationGroupId, number>, lastChange: string): PopulationSectorState {
  const total = Object.values(groups).reduce((sum, value) => sum + value, 0);
  const radicalized = groups.lambda_sympathizers + groups.suspected_citizens + Math.round(groups.disappeared_families * 0.65);
  const vulnerable = groups.hungry_citizens + groups.internal_refugees + groups.xen_exposed;
  const workforce = groups.industrial_workers + Math.round(groups.neutral_citizens * 0.26) + Math.round(groups.loyal_citizens * 0.22);
  const compliance = Math.round(((groups.loyal_citizens + groups.collaborators + groups.informants * 0.8) / Math.max(1, total)) * 100);
  const lambdaSupport = Math.round((radicalized / Math.max(1, total)) * 100);
  const xenExposure = Math.round(((groups.xen_exposed + groups.internal_refugees * 0.2) / Math.max(1, total)) * 100);
  const informantDensity = Math.round(((groups.informants + groups.collaborators * 0.35) / Math.max(1, total)) * 100);
  return { sectorId: sector.id, total, groups, compliance, lambdaSupport, xenExposure, informantDensity, workforce, vulnerable, lastChange };
}

export function summarizePopulation(sectorsState: PopulationSectorState[], log: string[] = []): PopulationState {
  const totals = emptyGroups();
  let total = 0;
  let complianceWeighted = 0;
  let lambdaWeighted = 0;
  let xenWeighted = 0;
  let informantWeighted = 0;
  let workforce = 0;
  let vulnerable = 0;
  for (const sector of sectorsState) {
    total += sector.total;
    workforce += sector.workforce;
    vulnerable += sector.vulnerable;
    complianceWeighted += sector.compliance * sector.total;
    lambdaWeighted += sector.lambdaSupport * sector.total;
    xenWeighted += sector.xenExposure * sector.total;
    informantWeighted += sector.informantDensity * sector.total;
    for (const id of populationGroupOrder) totals[id] += sector.groups[id];
  }
  return {
    total,
    groups: totals,
    complianceIndex: Math.round(complianceWeighted / Math.max(1, total)),
    lambdaSupportIndex: Math.round(lambdaWeighted / Math.max(1, total)),
    xenExposureIndex: Math.round(xenWeighted / Math.max(1, total)),
    informantDensityIndex: Math.round(informantWeighted / Math.max(1, total)),
    workforce,
    vulnerable,
    sectors: sectorsState,
    log: log.slice(0, 40),
  };
}

export function migratePopulationState(game: Partial<GameState>): PopulationState {
  if (game.population?.sectors?.length) {
    const rebuilt = game.population.sectors.map((sectorPop) => {
      const sector = game.sectors?.find((item) => item.id === sectorPop.sectorId);
      const groups = normalizeGroups({ ...emptyGroups(), ...sectorPop.groups }, sector?.population ?? sectorPop.total);
      return buildSectorPopulation(sector ?? ({ id: sectorPop.sectorId, population: sectorPop.total, name: sectorPop.sectorId, zone: 'Résidentiel', rebel: 0, xen: 0 } as Sector), groups, sectorPop.lastChange ?? 'Registre migré.');
    });
    return summarizePopulation(rebuilt, game.population.log ?? []);
  }
  return createInitialPopulationState({
    sectors: game.sectors ?? [],
    scenario: game.scenario ?? 'standard',
    timeline: game.timeline ?? 'pre_hl2',
    profile: game.profile ?? 'loyalist',
  });
}

function move(groups: Record<PopulationGroupId, number>, from: PopulationGroupId, to: PopulationGroupId, amount: number) {
  const qty = Math.max(0, Math.min(groups[from], Math.round(amount)));
  groups[from] -= qty;
  groups[to] += qty;
  return qty;
}

export function simulatePopulationDay({ population, sectors, rationEconomy, stats, day }: { population: PopulationState; sectors: Sector[]; rationEconomy: RationEconomyState; stats: Stats; day: number }): { population: PopulationState; sectors: Sector[]; statsDelta: Partial<Stats>; lines: string[] } {
  const lines: string[] = [];
  let totalNewSympathizers = 0;
  let totalNewHungry = 0;
  let totalNewExposed = 0;
  let totalNewInformants = 0;
  let workforceLoss = 0;

  const nextSectorPops = sectors.map((sector) => {
    const existing = population.sectors.find((item) => item.sectorId === sector.id);
    const ledger = rationEconomy.ledgers.find((item) => item.sectorId === sector.id);
    const groups = normalizeGroups({ ...emptyGroups(), ...(existing?.groups ?? allocate(sector.population, baseRatiosForSector(sector))) }, sector.population);

    const hungerPressure = ledger?.hunger ?? Math.max(0, 100 - sector.loyalty);
    const blackMarket = ledger?.blackMarket ?? 0;
    const informantPressure = ledger?.informants ?? 0;
    const repression = Math.max(0, sector.fear - 55) + Math.max(0, sector.surveillance - 70) * 0.5;
    const lambdaPressure = sector.rebel + blackMarket * 0.35 + hungerPressure * 0.42 + repression * 0.32 + (100 - sector.loyalty) * 0.25;
    const xenPressure = sector.xen + (sector.status === 'Infesté' ? 24 : sector.status === 'Contaminé' ? 12 : 0) + Math.max(0, 55 - sector.infrastructure) * 0.3;

    const hungry = move(groups, 'neutral_citizens', 'hungry_citizens', hungerPressure > 35 ? sector.population * (hungerPressure - 30) * 0.0007 : 0);
    const lambdaFromHunger = move(groups, 'hungry_citizens', 'lambda_sympathizers', lambdaPressure > 58 ? sector.population * (lambdaPressure - 55) * 0.00045 : 0);
    const suspectsFromDisappeared = move(groups, 'disappeared_families', 'suspected_citizens', repression > 25 ? sector.population * 0.002 : 0);
    const informants = move(groups, 'neutral_citizens', 'informants', informantPressure > 18 ? sector.population * informantPressure * 0.00018 : 0);
    const xenExposed = move(groups, xenPressure > 70 ? 'neutral_citizens' : 'internal_refugees', 'xen_exposed', xenPressure > 42 ? sector.population * (xenPressure - 38) * 0.00038 : 0);
    const refugees = sector.infrastructure < 38 || sector.status === 'Bombardé' || sector.status === 'Scellé'
      ? move(groups, 'neutral_citizens', 'internal_refugees', sector.population * 0.012)
      : 0;

    totalNewHungry += hungry;
    totalNewSympathizers += lambdaFromHunger + suspectsFromDisappeared;
    totalNewInformants += informants;
    totalNewExposed += xenExposed;
    workforceLoss += Math.round((hungry + refugees + xenExposed) * 0.18);

    const changeNotes = [
      hungry ? `${hungry} citoyens glissent en déficit calorique` : '',
      lambdaFromHunger ? `${lambdaFromHunger} affamés deviennent sympathisants Lambda` : '',
      informants ? `${informants} informateurs recrutés par coupons` : '',
      xenExposed ? `${xenExposed} civils classés exposition Xen` : '',
      refugees ? `${refugees} déplacés internes générés` : '',
    ].filter(Boolean).join(' / ');

    return buildSectorPopulation(sector, groups, changeNotes || 'Aucun déplacement démographique majeur détecté.');
  });

  const nextPopulation = summarizePopulation(nextSectorPops, [
    `JOUR ${String(day).padStart(3, '0')} — registre population recalculé : ${totalNewHungry} affamés, ${totalNewSympathizers} bascules Lambda, ${totalNewExposed} expositions Xen.`,
    ...population.log,
  ]);

  const sectorMap = new Map(nextSectorPops.map((item) => [item.sectorId, item]));
  const nextSectors = sectors.map((sector) => {
    const pop = sectorMap.get(sector.id);
    if (!pop) return sector;
    return {
      ...sector,
      rebel: clamp(sector.rebel + Math.round((pop.lambdaSupport - sector.rebel) * 0.035)),
      xen: clamp(sector.xen + Math.round((pop.xenExposure - sector.xen) * 0.025)),
      loyalty: clamp(sector.loyalty + Math.round((pop.compliance - sector.loyalty) * 0.025)),
      fear: clamp(sector.fear + (pop.vulnerable > sector.population * 0.22 ? 1 : 0) + (pop.informantDensity > 8 ? 1 : 0)),
    };
  });

  const statsDelta: Partial<Stats> = {
    loyalty: Math.round((nextPopulation.complianceIndex - stats.loyalty) * 0.04),
    rebel: Math.round((nextPopulation.lambdaSupportIndex - stats.rebel) * 0.06),
    xen: Math.round((nextPopulation.xenExposureIndex - stats.xen) * 0.04),
    info: Math.round((nextPopulation.informantDensityIndex - stats.info) * 0.03) + (totalNewInformants > 0 ? 1 : 0),
    fatigue: totalNewHungry > 50 ? 2 : totalNewHungry > 15 ? 1 : 0,
    production: workforceLoss > 30 ? -2 : workforceLoss > 10 ? -1 : 0,
  };

  lines.push(`Registre civil : conformité ${nextPopulation.complianceIndex}%, sympathie Lambda ${nextPopulation.lambdaSupportIndex}%, exposition Xen ${nextPopulation.xenExposureIndex}%.`);
  lines.push(`Population vulnérable : ${nextPopulation.vulnerable} / force de travail estimée : ${nextPopulation.workforce}.`);
  if (totalNewSympathizers > 0) lines.push(`Bascule sociale : ${totalNewSympathizers} citoyens ont rejoint la zone grise Lambda/suspects.`);
  if (totalNewExposed > 0) lines.push(`Exposition biologique : ${totalNewExposed} citoyens ajoutés aux registres Xen.`);
  if (totalNewInformants > 0) lines.push(`Délation : ${totalNewInformants} nouveaux informateurs recrutés ou réactivés.`);

  return { population: nextPopulation, sectors: nextSectors, statsDelta, lines };
}

export function getPopulationRisk(sectorPop: PopulationSectorState) {
  return Math.min(100, Math.round(sectorPop.lambdaSupport * 0.42 + sectorPop.xenExposure * 0.35 + (100 - sectorPop.compliance) * 0.2 + sectorPop.vulnerable / Math.max(1, sectorPop.total) * 35));
}

export { populationGroupDefinitions, populationGroupOrder };
