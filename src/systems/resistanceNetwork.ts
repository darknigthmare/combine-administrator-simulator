
import type { GameState, ResistanceCell, ResistanceNetworkState, ResistanceOperation, ResistanceRoute, Sector, Stats } from '../types/game';
import { resistanceCellTemplates, resistanceRouteTemplates } from '../data/resistanceNetwork';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const copyCell = (cell: ResistanceCell): ResistanceCell => ({ ...cell });
const copyRoute = (route: ResistanceRoute): ResistanceRoute => ({ ...route });

function computeStage(cell: ResistanceCell): ResistanceCell['stage'] {
  const score = cell.manpower * 0.28 + cell.weapons * 0.28 + cell.supplies * 0.12 + cell.morale * 0.16 + cell.tunnelAccess * 0.1 + cell.radioReach * 0.06;
  if (score > 74 || (cell.heat > 82 && cell.weapons > 60)) return 'open_uprising';
  if (score > 58) return 'coordinated';
  if (score > 43) return 'armed';
  if (score > 25) return 'active';
  return 'dormant';
}

function summarize(state: ResistanceNetworkState): ResistanceNetworkState {
  const cells = state.cells.map((cell) => ({ ...cell, stage: computeStage(cell) }));
  const networkCohesion = clamp(cells.reduce((sum, cell) => sum + cell.radioReach + cell.tunnelAccess + cell.morale, 0) / Math.max(1, cells.length * 3));
  const armedCapacity = clamp(cells.reduce((sum, cell) => sum + cell.weapons + cell.manpower, 0) / Math.max(1, cells.length * 2));
  const safehouseIntegrity = clamp(cells.reduce((sum, cell) => sum + cell.secrecy + cell.supplies, 0) / Math.max(1, cells.length * 2));
  const radioFreedom = clamp(cells.reduce((sum, cell) => sum + cell.radioReach, 0) / Math.max(1, cells.length));
  const tunnelMobility = clamp((cells.reduce((sum, cell) => sum + cell.tunnelAccess, 0) + state.routes.reduce((sum, route) => sum + route.throughput + route.secrecy - route.risk * 0.4, 0)) / Math.max(1, cells.length + state.routes.length * 1.6));
  const vortigauntInfluence = clamp(cells.reduce((sum, cell) => sum + cell.vortigauntSupport, 0) / Math.max(1, cells.length));
  const lambdaScience = clamp(cells.reduce((sum, cell) => sum + cell.scientificCapacity, 0) / Math.max(1, cells.length));
  const simultaneousOpsRisk = clamp(cells.filter((cell) => cell.stage === 'coordinated' || cell.stage === 'open_uprising').length * 17 + networkCohesion * 0.35 + radioFreedom * 0.2);
  const falseLeadIndex = clamp(100 - state.routes.reduce((sum, route) => sum + route.secrecy, 0) / Math.max(1, state.routes.length) + cells.reduce((sum, cell) => sum + cell.infiltration, 0) / Math.max(1, cells.length) * 0.25);
  return {
    ...state,
    cells,
    networkCohesion,
    armedCapacity,
    safehouseIntegrity,
    radioFreedom,
    tunnelMobility,
    vortigauntInfluence,
    lambdaScience,
    simultaneousOpsRisk,
    falseLeadIndex,
    discoveredCells: cells.filter((cell) => cell.discovered).length,
    compromisedCells: cells.filter((cell) => cell.compromised).length,
    openUprisingCells: cells.filter((cell) => cell.stage === 'open_uprising').length,
  };
}

export function createInitialResistanceNetwork({ scenario, profile, timeline }: Pick<GameState, 'scenario' | 'profile' | 'timeline'>): ResistanceNetworkState {
  let cells = resistanceCellTemplates.map(copyCell);
  let routes = resistanceRouteTemplates.map(copyRoute);
  const uprisingBoost = scenario === 'uprising' || timeline === 'uprising' || timeline === 'citadel_collapse' ? 18 : scenario === 'post_nova' || timeline === 'post_nova_prospekt' ? 10 : 0;
  const alyxBoost = timeline === 'alyx_era' ? 6 : 0;
  cells = cells.map((cell) => ({
    ...cell,
    manpower: clamp(cell.manpower + uprisingBoost + alyxBoost),
    weapons: clamp(cell.weapons + Math.round(uprisingBoost * 0.8)),
    morale: clamp(cell.morale + (profile === 'sympathizer' ? 8 : 0) + Math.round(uprisingBoost * 0.4)),
    secrecy: clamp(cell.secrecy + (profile === 'sympathizer' ? 5 : 0) - (timeline === 'hl2_arrival' ? 6 : 0)),
    heat: clamp(cell.heat + Math.round(uprisingBoost * 0.7)),
  }));
  routes = routes.map((route) => ({ ...route, throughput: clamp(route.throughput + Math.round(uprisingBoost * 0.35)), secrecy: clamp(route.secrecy + (profile === 'sympathizer' ? 4 : 0)) }));
  return summarize({
    cells,
    routes,
    activeDoctrine: profile === 'sympathizer' ? 'sympathizer_shadow' : 'standard_counterinsurgency',
    networkCohesion: 0,
    armedCapacity: 0,
    safehouseIntegrity: 0,
    radioFreedom: 0,
    tunnelMobility: 0,
    vortigauntInfluence: 0,
    lambdaScience: 0,
    simultaneousOpsRisk: 0,
    falseLeadIndex: 0,
    discoveredCells: 0,
    compromisedCells: 0,
    openUprisingCells: 0,
    log: ['Réseau Lambda initialisé : safehouses, canaux, radios et caches indexés par COAN.'],
  });
}

export function migrateResistanceNetwork(game: Partial<GameState>): ResistanceNetworkState {
  if (game.resistanceNetwork?.cells?.length) return summarize(game.resistanceNetwork);
  return createInitialResistanceNetwork({ scenario: game.scenario ?? 'standard', profile: game.profile ?? 'loyalist', timeline: game.timeline ?? 'pre_hl2' });
}

export function simulateResistanceNetworkDay({ state, sectors, stats, day }: { state: ResistanceNetworkState; sectors: Sector[]; stats: Stats; day: number }) {
  let cells = state.cells.map(copyCell);
  let routes = state.routes.map(copyRoute);
  const pressure = clamp(stats.rebel * 0.45 + (100 - stats.loyalty) * 0.22 + stats.fatigue * 0.18 + (100 - stats.rations / 120) * 0.05 - stats.info * 0.18 - stats.combine * 0.12);
  const lines: string[] = [];
  let statsDelta: Partial<Stats> = {};
  cells = cells.map((cell, index) => {
    const sector = sectors.find((item) => item.id === cell.sectorId);
    const localHunger = sector ? Math.max(0, 55 - sector.loyalty) : 20;
    const localRebel = sector?.rebel ?? stats.rebel;
    const routeBoost = routes.filter((route) => route.fromSectorId === cell.sectorId || route.toSectorId === cell.sectorId).reduce((sum, route) => sum + route.throughput + route.secrecy - route.risk * 0.4, 0) / 90;
    const cpPressure = sector ? (sector.surveillance + stats.combine) / 35 : stats.combine / 20;
    const growth = (pressure / 22) + (localRebel / 45) + routeBoost + (localHunger / 55) - cpPressure;
    const eventPulse = ((day + index * 3) % 7 === 0) ? 4 : 0;
    return {
      ...cell,
      manpower: clamp(cell.manpower + growth * 0.8 + eventPulse * 0.4),
      weapons: clamp(cell.weapons + growth * 0.45 + (cell.infiltration > 40 ? 1 : 0)),
      supplies: clamp(cell.supplies + growth * 0.5 - (cell.stage === 'open_uprising' ? 4 : 1)),
      morale: clamp(cell.morale + growth * 0.35 + (stats.fear > 72 ? 1 : 0) - (cell.heat > 70 ? 2 : 0)),
      secrecy: clamp(cell.secrecy - stats.info * 0.025 - (cell.heat > 60 ? 1 : 0) + (state.activeDoctrine === 'controlled_tolerance' ? 1 : 0)),
      heat: clamp(cell.heat + Math.max(0, growth) * 0.8 + (cell.stage === 'armed' ? 1 : 0) + (cell.stage === 'coordinated' ? 2 : 0)),
      discovered: cell.discovered || cell.secrecy < 28 || cell.heat > 82,
      compromised: cell.compromised || (cell.infiltration > 66 && cell.secrecy < 48),
    };
  });
  routes = routes.map((route) => ({
    ...route,
    throughput: clamp(route.throughput + pressure * 0.025 - (route.controlledBy === 'Combine' ? 1.8 : 0.4)),
    risk: clamp(route.risk + stats.info * 0.02 + stats.combine * 0.025 - route.secrecy * 0.018),
    secrecy: clamp(route.secrecy - stats.info * 0.02 + (route.controlledBy === 'Lambda' ? 0.6 : -0.2)),
  }));
  let next = summarize({ ...state, cells, routes, log: state.log });
  const rebelDelta = clamp(next.networkCohesion * 0.025 + next.armedCapacity * 0.035 + next.simultaneousOpsRisk * 0.025 - stats.info * 0.035 - stats.combine * 0.025, -8, 8);
  const productionDelta = next.cells.some((cell) => cell.type === 'industrial_saboteurs' && cell.stage !== 'dormant') ? -2 : 0;
  statsDelta = { rebel: rebelDelta, production: productionDelta, info: next.compromisedCells > 0 ? 2 : 0, fatigue: next.openUprisingCells > 0 ? 4 : 1 };
  if (next.simultaneousOpsRisk > 70) lines.push(`Réseau Lambda : risque d'opérations simultanées ${next.simultaneousOpsRisk}%.`);
  if (next.openUprisingCells > 0) lines.push(`Alerte anti-citoyenne : ${next.openUprisingCells} cellule(s) en phase soulèvement ouvert.`);
  const hottest = [...next.cells].sort((a, b) => b.heat - a.heat)[0];
  if (hottest) lines.push(`Cellule la plus chaude : ${hottest.name} / ${hottest.nextOperation}.`);
  if (next.vortigauntInfluence > 35) lines.push(`Vortigaunts libres : influence clandestine ${next.vortigauntInfluence}% dans les soins et le confinement Xen.`);
  next = { ...next, log: [`JOUR ${String(day).padStart(3, '0')} — Cohésion Lambda ${next.networkCohesion}%, capacité armée ${next.armedCapacity}%, mobilité tunnels ${next.tunnelMobility}%.`, ...lines, ...state.log].slice(0, 30) };
  return { resistanceNetwork: next, statsDelta, lines };
}

export function resolveResistanceOperation({ state, operation, sectors, selectedCellId, selectedRouteId, selectedSectorId, stats, day }: { state: ResistanceNetworkState; operation: ResistanceOperation; sectors: Sector[]; selectedCellId?: string; selectedRouteId?: string; selectedSectorId?: string; stats: Stats; day: number }) {
  let cells = state.cells.map(copyCell);
  let routes = state.routes.map(copyRoute);
  let nextSectors = sectors.map((sector) => ({ ...sector, units: { ...sector.units } }));
  const cellIndex = cells.findIndex((cell) => cell.id === selectedCellId) >= 0 ? cells.findIndex((cell) => cell.id === selectedCellId) : 0;
  const routeIndex = routes.findIndex((route) => route.id === selectedRouteId) >= 0 ? routes.findIndex((route) => route.id === selectedRouteId) : 0;
  const sectorIndex = nextSectors.findIndex((sector) => sector.id === selectedSectorId) >= 0 ? nextSectors.findIndex((sector) => sector.id === selectedSectorId) : nextSectors.findIndex((sector) => sector.id === cells[cellIndex]?.sectorId);
  if (operation.cellEffects && cells[cellIndex]) {
    const cell = cells[cellIndex];
    cells[cellIndex] = {
      ...cell,
      secrecy: clamp(cell.secrecy + (operation.cellEffects.secrecy ?? 0)),
      manpower: clamp(cell.manpower + (operation.cellEffects.manpower ?? 0)),
      weapons: clamp(cell.weapons + (operation.cellEffects.weapons ?? 0)),
      supplies: clamp(cell.supplies + (operation.cellEffects.supplies ?? 0)),
      morale: clamp(cell.morale + (operation.cellEffects.morale ?? 0)),
      tunnelAccess: clamp(cell.tunnelAccess + (operation.cellEffects.tunnelAccess ?? 0)),
      radioReach: clamp(cell.radioReach + (operation.cellEffects.radioReach ?? 0)),
      vortigauntSupport: clamp(cell.vortigauntSupport + (operation.cellEffects.vortigauntSupport ?? 0)),
      scientificCapacity: clamp(cell.scientificCapacity + (operation.cellEffects.scientificCapacity ?? 0)),
      infiltration: clamp(cell.infiltration + (operation.cellEffects.infiltration ?? 0)),
      heat: clamp(cell.heat + (operation.cellEffects.heat ?? 0)),
      discovered: cell.discovered || (operation.id !== 'negotiate_vortigaunt' && operation.id !== 'stage_false_leak' && operation.id !== 'map_safehouse'),
      compromised: cell.compromised || operation.id === 'flip_courier' || operation.id === 'infiltrate_lab',
    };
  }
  if (operation.routeEffects && routes[routeIndex]) {
    const route = routes[routeIndex];
    routes[routeIndex] = { ...route, secrecy: clamp(route.secrecy + (operation.routeEffects.secrecy ?? 0)), throughput: clamp(route.throughput + (operation.routeEffects.throughput ?? 0)), risk: clamp(route.risk + (operation.routeEffects.risk ?? 0)), controlledBy: operation.id === 'seal_escape_route' ? 'Combine' : route.controlledBy };
  }
  if (operation.sectorEffects && nextSectors[sectorIndex]) {
    const sector = nextSectors[sectorIndex];
    nextSectors[sectorIndex] = {
      ...sector,
      rebel: clamp(sector.rebel + (operation.sectorEffects.rebel ?? 0)),
      surveillance: clamp(sector.surveillance + (operation.sectorEffects.surveillance ?? 0)),
      loyalty: clamp(sector.loyalty + (operation.sectorEffects.loyalty ?? 0)),
      fear: clamp(sector.fear + (operation.sectorEffects.fear ?? 0)),
      infrastructure: clamp(sector.infrastructure + (operation.sectorEffects.infrastructure ?? 0)),
    };
  }
  const next = summarize({ ...state, cells, routes, log: [`JOUR ${String(day).padStart(3, '0')} — ${operation.logLine}`, ...state.log].slice(0, 30) });
  const cost: Partial<Stats> = Object.fromEntries(Object.entries(operation.cost).map(([key, value]) => [key, value])) as Partial<Stats>;
  const statsDelta: Partial<Stats> = { ...cost, ...operation.effects };
  const lines = [operation.logLine, `Cible COAN : ${operation.target} / cohésion Lambda ${next.networkCohesion}% / cellules découvertes ${next.discoveredCells}.`];
  return { resistanceNetwork: next, sectors: nextSectors, statsDelta, lines };
}

export function setResistanceDoctrine(state: ResistanceNetworkState, doctrine: ResistanceNetworkState['activeDoctrine']) {
  const effects: Record<ResistanceNetworkState['activeDoctrine'], Partial<Stats>> = {
    standard_counterinsurgency: { info: 2, rebel: -1 },
    decapitation: { rebel: -3, fear: 4, loyalty: -3, suspicion: 2 },
    route_denial: { rebel: -2, production: -1, fatigue: 2 },
    radio_silence: { info: 4, rebel: -2, fatigue: 1 },
    controlled_tolerance: { info: -2, rebel: 2, loyalty: 2, suspicion: 4 },
    sympathizer_shadow: { rebel: 3, loyalty: 4, suspicion: 8, xen: -1 },
  };
  return {
    resistanceNetwork: summarize({ ...state, activeDoctrine: doctrine, log: [`Doctrine anti-Lambda active : ${doctrine}.`, ...state.log].slice(0, 30) }),
    statsDelta: effects[doctrine],
    lines: [`Doctrine Résistance modifiée : ${doctrine}.`],
  };
}
