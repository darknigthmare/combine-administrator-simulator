import { combineTechnologyBranches, combineTechnologyNodes } from '../data/combineTechnologies';
import type { CombineTechnologyBranchId, CombineTechnologyNode, CombineTechnologyState, GameState, Sector, Stats, Unit } from '../types/game';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const addStats = (base: Partial<Stats>, delta: Partial<Stats>) => ({
  ...base,
  ...Object.fromEntries(Object.entries(delta).map(([key, value]) => [key, (base as Record<string, number>)[key] ? (base as Record<string, number>)[key] + (value as number) : value]))
}) as Partial<Stats>;

export function createInitialCombineTechnologyState({ timeline, profile }: Pick<GameState, 'timeline' | 'profile'>): CombineTechnologyState {
  const startingNodes = timeline === 'alyx_era'
    ? ['surv_scanner_mesh', 'cont_smart_locks', 'prop_relay_repair', 'bio_xen_registry']
    : timeline === 'uprising' || timeline === 'post_nova_prospekt'
      ? ['surv_scanner_mesh', 'ow_response_codes', 'air_drop_pathing', 'nova_manifest_sync']
      : ['surv_scanner_mesh', 'prop_relay_repair'];
  const researchBudget = profile === 'technocrat' ? 820 : profile === 'loyalist' ? 700 : 620;
  return {
    activeBranch: 'surveillance',
    researchedNodes: startingNodes,
    unlockedCapabilities: Array.from(new Set(startingNodes.flatMap((id) => combineTechnologyNodes.find((node) => node.id === id)?.unlocks ?? []))),
    researchBudget,
    techSuspicion: profile === 'sympathizer' ? 12 : 4,
    maintenanceDebt: 0,
    scanEfficiency: startingNodes.includes('surv_scanner_mesh') ? 54 : 38,
    containmentGrid: startingNodes.includes('cont_smart_locks') ? 42 : 24,
    overwatchIntegration: startingNodes.includes('ow_response_codes') ? 46 : 28,
    propagandaBandwidth: startingNodes.includes('prop_relay_repair') ? 52 : 34,
    novaIntegration: startingNodes.includes('nova_manifest_sync') ? 40 : 20,
    log: [
      'TECH NODE — inventaire Combine local synchronisé.',
      `Protocoles initiaux : ${startingNodes.join(', ')}.`,
    ],
  };
}

export function migrateCombineTechnologyState(game: Partial<GameState>): CombineTechnologyState {
  if (game.combineTechnology?.researchedNodes) return game.combineTechnology;
  return createInitialCombineTechnologyState({ timeline: game.timeline ?? 'pre_hl2', profile: game.profile ?? 'loyalist' });
}

export function getAvailableTechnologyNodes(state: CombineTechnologyState): CombineTechnologyNode[] {
  return combineTechnologyNodes.filter((node) => !state.researchedNodes.includes(node.id) && node.prerequisites.every((id) => state.researchedNodes.includes(id)));
}

export function getTechnologyBranchProgress(state: CombineTechnologyState, branchId: CombineTechnologyBranchId) {
  const nodes = combineTechnologyNodes.filter((node) => node.branchId === branchId);
  const completed = nodes.filter((node) => state.researchedNodes.includes(node.id));
  return { total: nodes.length, completed: completed.length, percent: Math.round((completed.length / Math.max(1, nodes.length)) * 100) };
}

function stateMetricPatch(node: CombineTechnologyNode): Partial<CombineTechnologyState> {
  const patch: Partial<CombineTechnologyState> = {};
  if (node.branchId === 'surveillance') patch.scanEfficiency = node.tier * 18 + 28;
  if (node.branchId === 'containment') patch.containmentGrid = node.tier * 18 + 24;
  if (node.branchId === 'overwatch' || node.branchId === 'airwatch') patch.overwatchIntegration = node.tier * 17 + 30;
  if (node.branchId === 'propaganda') patch.propagandaBandwidth = node.tier * 18 + 30;
  if (node.branchId === 'nova') patch.novaIntegration = node.tier * 18 + 24;
  if (node.branchId === 'biocontrol') patch.containmentGrid = Math.max(patch.containmentGrid ?? 0, node.tier * 16 + 30);
  if (node.branchId === 'infrastructure') patch.maintenanceDebt = -Math.max(4, node.tier * 3);
  return patch;
}

export function researchTechnologyNode({ state, stats, units, sectors, nodeId, day }: { state: CombineTechnologyState; stats: Stats; units: Unit[]; sectors: Sector[]; nodeId: string; day: number }) {
  const node = combineTechnologyNodes.find((item) => item.id === nodeId);
  if (!node) return { technology: state, statsDelta: {}, units, sectors, lines: ['TECH NODE — protocole inconnu.'] };
  const available = getAvailableTechnologyNodes(state).some((item) => item.id === node.id);
  if (!available) return { technology: state, statsDelta: {}, units, sectors, lines: [`TECH NODE — ${node.title} verrouillé par prérequis Citadel.`] };
  if (state.researchBudget < node.cost) return { technology: state, statsDelta: {}, units, sectors, lines: [`TECH NODE — budget insuffisant pour ${node.title}.`] };

  const metricPatch = stateMetricPatch(node);
  const technology: CombineTechnologyState = {
    ...state,
    researchedNodes: [...state.researchedNodes, node.id],
    unlockedCapabilities: Array.from(new Set([...state.unlockedCapabilities, ...node.unlocks])),
    researchBudget: Math.max(0, state.researchBudget - node.cost),
    maintenanceDebt: clamp(state.maintenanceDebt + node.maintenance + (metricPatch.maintenanceDebt ?? 0), 0, 100),
    techSuspicion: clamp(state.techSuspicion + node.risk),
    scanEfficiency: clamp(metricPatch.scanEfficiency ?? state.scanEfficiency),
    containmentGrid: clamp(metricPatch.containmentGrid ?? state.containmentGrid),
    overwatchIntegration: clamp(metricPatch.overwatchIntegration ?? state.overwatchIntegration),
    propagandaBandwidth: clamp(metricPatch.propagandaBandwidth ?? state.propagandaBandwidth),
    novaIntegration: clamp(metricPatch.novaIntegration ?? state.novaIntegration),
    log: [`JOUR ${String(day).padStart(3, '0')} — Recherche complétée : ${node.title}.`, `Capacités : ${node.unlocks.join(', ')}.`, ...state.log].slice(0, 24),
  };
  const nextUnits = units.map((unit) => ({ ...unit, reserve: Math.max(0, unit.reserve + (node.reserveEffects?.[unit.id] ?? 0)) }));
  const nextSectors = sectors.map((sector) => {
    if (!node.sectorEffects) return sector;
    return {
      ...sector,
      surveillance: clamp(sector.surveillance + (node.sectorEffects.surveillance ?? 0)),
      infrastructure: clamp(sector.infrastructure + (node.sectorEffects.infrastructure ?? 0)),
      rebel: clamp(sector.rebel + (node.sectorEffects.rebel ?? 0)),
      xen: clamp(sector.xen + (node.sectorEffects.xen ?? 0)),
      fear: clamp(sector.fear + (node.sectorEffects.fear ?? 0)),
      loyalty: clamp(sector.loyalty + (node.sectorEffects.loyalty ?? 0)),
    };
  });
  return { technology, statsDelta: { ...node.effects, suspicion: (node.effects.suspicion ?? 0) + Math.round(node.risk / 6) }, units: nextUnits, sectors: nextSectors, lines: technology.log.slice(0, 2) };
}

export function simulateCombineTechnologyDay({ state, stats, day }: { state: CombineTechnologyState; stats: Stats; day: number }) {
  let statsDelta: Partial<Stats> = {};
  for (const id of state.researchedNodes) {
    const node = combineTechnologyNodes.find((item) => item.id === id);
    if (node) statsDelta = addStats(statsDelta, node.dailyEffects);
  }
  const maintenanceStress = Math.max(0, Math.round((state.maintenanceDebt - 55) / 12));
  const researchIncome = Math.max(18, Math.round(stats.production * 0.55 + stats.citadel * 0.25 + state.overwatchIntegration * 0.08));
  const techSuspicionDrift = Math.max(0, Math.round((state.techSuspicion + state.maintenanceDebt - state.propagandaBandwidth) / 40));
  const containmentBonus = state.containmentGrid > 65 ? -1 : state.containmentGrid < 30 && stats.xen > 35 ? 1 : 0;
  const scanBonus = state.scanEfficiency > 65 ? -1 : 0;
  statsDelta = addStats(statsDelta, {
    suspicion: techSuspicionDrift,
    production: -maintenanceStress,
    xen: containmentBonus,
    rebel: scanBonus,
  });
  const technology: CombineTechnologyState = {
    ...state,
    researchBudget: Math.min(2400, state.researchBudget + researchIncome),
    maintenanceDebt: clamp(state.maintenanceDebt + Math.round(state.researchedNodes.length / 7) - (stats.production > 72 ? 2 : 0)),
    techSuspicion: clamp(state.techSuspicion + techSuspicionDrift - (stats.info > 75 ? 1 : 0)),
    log: [
      `JOUR ${String(day).padStart(3, '0')} — Budget R&D +${researchIncome}. Dette maintenance ${state.maintenanceDebt}%.`,
      ...(maintenanceStress ? [`Maintenance : surcharge technologique, production ${-maintenanceStress}.`] : []),
      ...(techSuspicionDrift ? [`Advisor watch : suspicion techno-administrative +${techSuspicionDrift}.`] : []),
      ...state.log,
    ].slice(0, 24),
  };
  const lines = [
    `Technologies Combine : budget ${technology.researchBudget}, maintenance ${technology.maintenanceDebt}%, suspicion techno ${technology.techSuspicion}%.`,
    ...(maintenanceStress ? [`Dette maintenance : production ${-maintenanceStress}.`] : []),
    ...(containmentBonus < 0 ? ['Grille de confinement : pression Xen réduite.'] : containmentBonus > 0 ? ['Grille de confinement insuffisante : vecteurs Xen favorisés.'] : []),
    ...(scanBonus < 0 ? ['Maillage scanner : activité Lambda ralentie.'] : []),
  ];
  return { technology, statsDelta, lines };
}

export { combineTechnologyBranches, combineTechnologyNodes };
