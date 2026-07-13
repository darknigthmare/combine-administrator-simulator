import type { ProfileId, ScenarioId, Sector, SectorStatus, Stats, Unit } from '../types/game';
import { getConnectedSectors } from './sectorNetwork';

type UnitPresence = {
  total: number;
  civilProtection: number;
  overwatch: number;
  synth: number;
  airwatch: number;
  biocontrol: number;
  authority: number;
};

export type PropagationReport = {
  sectors: Sector[];
  casualties: number;
  combineLosses: number;
  rebelSpreadEvents: number;
  xenSpreadEvents: number;
  sealedContainments: number;
  avgRebel: number;
  avgXen: number;
  avgSurveillance: number;
  flashpoints: string[];
  xenVectors: string[];
  lambdaVectors: string[];
};

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

const routeSpreadWeight: Record<string, { rebel: number; xen: number; combine: number }> = {
  surface: { rebel: 0.85, xen: 0.5, combine: 1.15 },
  canal: { rebel: 1.45, xen: 0.75, combine: 0.65 },
  sewer: { rebel: 1.25, xen: 1.55, combine: 0.45 },
  rail: { rebel: 0.9, xen: 0.45, combine: 1.35 },
  citadel: { rebel: 0.35, xen: 0.25, combine: 1.7 },
  quarantine: { rebel: 0.8, xen: 1.75, combine: 0.55 },
  service: { rebel: 1.15, xen: 1.05, combine: 0.75 },
};

function getUnitPresence(sector: Sector, units: Unit[]): UnitPresence {
  return Object.entries(sector.units).reduce<UnitPresence>((acc, [unitId, count]) => {
    const unit = units.find((item) => item.id === unitId);
    const amount = Number(count) || 0;
    if (!unit || amount <= 0) return acc;
    const value = unit.category === 'Synth' ? 14 : unit.category === 'Overwatch' ? 9 : unit.category === 'Biocontrol' ? 8 : unit.category === 'Airwatch' ? 10 : unit.category === 'Authority' ? 7 : 5;
    acc.total += amount * value;
    if (unit.category === 'Civil Protection') acc.civilProtection += amount * value;
    if (unit.category === 'Overwatch') acc.overwatch += amount * value;
    if (unit.category === 'Synth') acc.synth += amount * value;
    if (unit.category === 'Airwatch') acc.airwatch += amount * value;
    if (unit.category === 'Biocontrol') acc.biocontrol += amount * value;
    if (unit.category === 'Authority') acc.authority += amount * value;
    return acc;
  }, { total: 0, civilProtection: 0, overwatch: 0, synth: 0, airwatch: 0, biocontrol: 0, authority: 0 });
}

function statusFromPressures(sector: Sector, rebel: number, xen: number): SectorStatus {
  if (sector.status === 'Scellé' || sector.status === 'Abandonné' || sector.status === 'Bombardé') return sector.status;
  if (xen >= 78) return 'Infesté';
  if (xen >= 58) return 'Contaminé';
  if (rebel >= 84 && sector.surveillance < 45) return 'Contrôle rebelle';
  if (rebel >= 74) return 'Insurgé';
  if (rebel >= 58) return 'Saboté';
  if (sector.surveillance >= 78 && rebel < 24 && xen < 25) return 'Contrôle Combine total';
  if (sector.surveillance >= 55) return 'Surveillé';
  if (sector.status === 'En quarantaine' && xen < 25) return 'Surveillé';
  return 'Stable';
}

function scenarioRebelPressure(scenario: ScenarioId): number {
  if (scenario === 'uprising') return 4;
  if (scenario === 'post_nova') return 3;
  if (scenario === 'dormant') return 2;
  if (scenario === 'pre_hl2') return -1;
  return 0;
}

function scenarioXenPressure(scenario: ScenarioId): number {
  if (scenario === 'quarantine') return 4;
  if (scenario === 'uprising') return 1;
  if (scenario === 'pre_hl2') return -1;
  return 0;
}

function profileRebelPressure(profile: ProfileId): number {
  if (profile === 'tyrant') return 2;
  if (profile === 'sympathizer') return 1;
  if (profile === 'loyalist') return -1;
  return 0;
}

function profileXenPressure(profile: ProfileId): number {
  return profile === 'quarantine' ? -2 : 0;
}

function getNeighborPressure(sectors: Sector[], sector: Sector) {
  const neighbors = getConnectedSectors(sectors, sector.id);
  let rebel = 0;
  let xen = 0;
  let combineRouteControl = 0;
  let highestRebel = 0;
  let highestXen = 0;
  let highestRebelName = '';
  let highestXenName = '';

  for (const { sector: neighbor, connection } of neighbors) {
    const weight = routeSpreadWeight[connection.type] ?? routeSpreadWeight.surface;
    const controlRebelBoost = connection.controlledBy === 'Resistance' ? 1.55 : connection.controlledBy === 'Combine' ? 0.55 : connection.controlledBy === 'Contested' ? 1.1 : 0.85;
    const controlXenBoost = connection.controlledBy === 'Xen' ? 1.65 : connection.controlledBy === 'Combine' ? 0.55 : connection.controlledBy === 'Contested' ? 1.1 : 0.75;
    const risk = connection.risk / 100;
    const rebelVector = neighbor.rebel * risk * weight.rebel * controlRebelBoost;
    const xenVector = neighbor.xen * risk * weight.xen * controlXenBoost;
    rebel += rebelVector;
    xen += xenVector;
    if (connection.controlledBy === 'Combine') combineRouteControl += weight.combine;
    if (rebelVector > highestRebel) {
      highestRebel = rebelVector;
      highestRebelName = `${neighbor.name} via ${connection.label}`;
    }
    if (xenVector > highestXen) {
      highestXen = xenVector;
      highestXenName = `${neighbor.name} via ${connection.label}`;
    }
  }

  const divisor = Math.max(1, neighbors.length);
  return {
    rebel: rebel / divisor,
    xen: xen / divisor,
    combineRouteControl: combineRouteControl / divisor,
    highestRebel,
    highestXen,
    highestRebelName,
    highestXenName,
    routeCount: neighbors.length,
  };
}

export function simulateConnectedPropagation(args: {
  sectors: Sector[];
  units: Unit[];
  stats: Stats;
  scenario: ScenarioId;
  profile: ProfileId;
  day: number;
  xenEnabled?: boolean;
}): PropagationReport {
  const { sectors, units, stats, scenario, profile, day, xenEnabled = true } = args;
  let casualties = 0;
  let combineLosses = 0;
  let rebelSpreadEvents = 0;
  let xenSpreadEvents = 0;
  let sealedContainments = 0;
  const flashpoints: string[] = [];
  const xenVectors: string[] = [];
  const lambdaVectors: string[] = [];

  const nextSectors = sectors.map((sector) => {
    if (sector.status === 'Scellé' || sector.status === 'Abandonné') {
      sealedContainments += sector.status === 'Scellé' ? 1 : 0;
      return { ...sector, rebel: clamp(sector.rebel - 3), xen: xenEnabled ? clamp(sector.xen - 5) : sector.xen, infrastructure: clamp(sector.infrastructure - 1) };
    }

    const unitsHere = getUnitPresence(sector, units);
    const neighbor = getNeighborPressure(sectors, sector);
    const fearRadicalization = sector.fear > 78 && sector.loyalty < 35 ? 3 : 0;
    const hungerRadicalization = stats.rations < 350 ? 4 : stats.rations < 900 ? 2 : 0;
    const fatigueRadicalization = stats.fatigue > 70 ? 4 : stats.fatigue > 50 ? 2 : 0;
    const informationSuppression = stats.info > 72 ? -2 : stats.info < 40 ? 3 : 0;
    const routeSecurity = Math.min(6, neighbor.combineRouteControl + sector.surveillance / 18 + unitsHere.airwatch / 14);
    const civilProtectionCorruption = unitsHere.civilProtection > 24 && sector.loyalty < 30 ? 2 : 0;

    const rebelNetworkSpread = neighbor.rebel > 18 ? Math.ceil(neighbor.rebel / 13) : 0;
    const rebelLocalDrift = 1 + scenarioRebelPressure(scenario) + profileRebelPressure(profile) + fearRadicalization + hungerRadicalization + fatigueRadicalization + informationSuppression + civilProtectionCorruption;
    const rebelSuppression = routeSecurity + unitsHere.overwatch / 8 + unitsHere.synth / 7 + unitsHere.authority / 10 + (sector.status === 'Sous couvre-feu' ? 4 : 0);
    const newRebel = clamp(sector.rebel + rebelLocalDrift + rebelNetworkSpread - rebelSuppression);

    const xenBiotopeBonus = ['sewers', 'quarantine', 'periphery', 'hospital'].includes(sector.id) ? 4 : sector.zone === 'Souterrain' || sector.zone === 'Quarantaine' || sector.zone === 'Périphérie' ? 3 : 0;
    const xenNetworkSpread = neighbor.xen > 16 ? Math.ceil(neighbor.xen / 12) : 0;
    const xenLocalDrift = 1 + scenarioXenPressure(scenario) + profileXenPressure(profile) + xenBiotopeBonus + (sector.infrastructure < 35 ? 2 : 0) + (newRebel > 70 ? 2 : 0);
    const xenSuppression = unitsHere.biocontrol / 6 + unitsHere.synth / 12 + (sector.status === 'En quarantaine' ? 5 : 0) + (sector.surveillance > 75 ? 1 : 0);
    const newXen = xenEnabled ? clamp(sector.xen + xenLocalDrift + xenNetworkSpread - xenSuppression) : sector.xen;
    const effectiveXen = xenEnabled ? newXen : 0;

    if (newRebel - sector.rebel >= 6) {
      rebelSpreadEvents += 1;
      if (lambdaVectors.length < 4 && neighbor.highestRebelName) lambdaVectors.push(`${sector.name} contaminé par réseau Lambda depuis ${neighbor.highestRebelName}.`);
    }
    if (xenEnabled && newXen - sector.xen >= 6) {
      xenSpreadEvents += 1;
      if (xenVectors.length < 4 && neighbor.highestXenName) xenVectors.push(`${sector.name} exposé à un vecteur Xen depuis ${neighbor.highestXenName}.`);
    }

    const rebelCasualtyRate = newRebel > 82 ? 0.0045 : newRebel > 65 ? 0.002 : 0;
    const xenCasualtyRate = effectiveXen > 78 ? 0.009 : effectiveXen > 60 ? 0.004 : effectiveXen > 45 ? 0.0015 : 0;
    const repressionCasualtyRate = unitsHere.synth > 20 && newRebel > 55 ? 0.002 : unitsHere.overwatch > 20 && newRebel > 60 ? 0.001 : 0;
    const loss = Math.ceil(sector.population * (rebelCasualtyRate + xenCasualtyRate + repressionCasualtyRate));
    casualties += loss;

    if (newRebel > 80 && unitsHere.total > 25) combineLosses += Math.max(1, Math.round((newRebel - 70) / 18));
    if (effectiveXen > 76 && unitsHere.biocontrol + unitsHere.overwatch + unitsHere.synth > 12) combineLosses += 1;

    if ((newRebel > 70 || effectiveXen > 65) && flashpoints.length < 5) {
      flashpoints.push(`${sector.name} : ${newRebel > effectiveXen ? 'activité anti-citoyenne' : 'biosphère Xen'} au seuil critique.`);
    }

    const infrastructureLoss = (effectiveXen > 55 ? 4 : effectiveXen > 35 ? 2 : 0) + (newRebel > 65 ? 3 : newRebel > 45 ? 1 : 0) + (unitsHere.synth > 20 ? 1 : 0);
    const recovery = sector.status === 'Contrôle Combine total' && stats.production > 65 ? 2 : 1;

    return {
      ...sector,
      rebel: newRebel,
      xen: newXen,
      population: Math.max(0, sector.population - loss),
      status: statusFromPressures(sector, newRebel, effectiveXen),
      infrastructure: clamp(sector.infrastructure - infrastructureLoss + recovery),
      loyalty: clamp(sector.loyalty - (newRebel > 70 ? 2 : 0) - (effectiveXen > 65 ? 3 : 0) + (stats.rations > 1600 ? 1 : 0)),
      fear: clamp(sector.fear + (effectiveXen > 55 ? 3 : 0) + (newRebel > 65 ? 2 : 0) + (unitsHere.synth > 0 ? 1 : 0)),
    };
  });

  const avgRebel = Math.round(nextSectors.reduce((acc, sector) => acc + sector.rebel, 0) / nextSectors.length);
  const avgXen = xenEnabled ? Math.round(nextSectors.reduce((acc, sector) => acc + sector.xen, 0) / nextSectors.length) : stats.xen;
  const avgSurveillance = Math.round(nextSectors.reduce((acc, sector) => acc + sector.surveillance, 0) / nextSectors.length);

  if (day % 5 === 0 && avgRebel > 50 && lambdaVectors.length < 4) {
    lambdaVectors.push('Réseau Lambda : hausse synchronisée des radios pirates sur plusieurs routes non Combine.');
  }
  if (xenEnabled && day % 4 === 0 && avgXen > 42 && xenVectors.length < 4) {
    xenVectors.push('Biosphère Xen : spores et excroissances signalées au-delà des secteurs initialement compromis.');
  }

  return {
    sectors: nextSectors,
    casualties,
    combineLosses,
    rebelSpreadEvents,
    xenSpreadEvents,
    sealedContainments,
    avgRebel,
    avgXen,
    avgSurveillance,
    flashpoints,
    xenVectors,
    lambdaVectors,
  };
}
