import type { CitadelDirectiveNode, CitadelDirectiveTreeState, GameState, ProfileId, Stats, TimelineId } from '../types/game';
import { citadelDirectiveBranches, citadelDirectiveNodes } from '../data/citadelDirectiveTree';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

const timelineBranchBias: Partial<Record<TimelineId, CitadelDirectiveTreeState['activeBranch']>> = {
  seven_hour_aftermath: 'repression',
  early_occupation: 'production',
  alyx_era: 'quarantine',
  pre_hl2: 'propaganda',
  hl2_arrival: 'repression',
  post_nova_prospekt: 'nova',
  uprising: 'repression',
  citadel_collapse: 'advisor',
};

const profileBranchBias: Partial<Record<ProfileId, CitadelDirectiveTreeState['activeBranch']>> = {
  loyalist: 'advisor',
  technocrat: 'production',
  tyrant: 'repression',
  collaborator: 'nova',
  sympathizer: 'propaganda',
  quarantine: 'quarantine',
};

export function createInitialCitadelDirectiveTree({ profile, timeline }: { profile: ProfileId; timeline: TimelineId }): CitadelDirectiveTreeState {
  const activeBranch = profileBranchBias[profile] ?? timelineBranchBias[timeline] ?? 'production';
  const firstCapability = activeBranch === 'advisor' ? 'Audit plus tolérant' : 'Accès directive de branche initiale';
  return {
    activeBranch,
    completedNodes: [],
    unlockedCapabilities: [firstCapability],
    branchPressure: 18,
    advisorAttention: timeline === 'uprising' || timeline === 'citadel_collapse' ? 46 : 24,
    dailyMandate: 'Aucune branche Citadel verrouillée. Sélectionner un protocole initial pour orienter City.',
    log: [
      `Directive Tree initialisé : branche ${citadelDirectiveBranches.find((b) => b.id === activeBranch)?.name ?? activeBranch}.`,
      'COAN : les directives permanentes modifient la ville chaque journée, pas seulement à échéance.',
    ],
  };
}

export function migrateCitadelDirectiveTree(game: Partial<GameState>): CitadelDirectiveTreeState {
  return game.citadelDirectiveTree ?? createInitialCitadelDirectiveTree({
    profile: game.profile ?? 'loyalist',
    timeline: game.timeline ?? 'pre_hl2',
  });
}

export function isDirectiveNodeAvailable(state: CitadelDirectiveTreeState, node: CitadelDirectiveNode) {
  if (state.completedNodes.includes(node.id)) return false;
  return node.prerequisites.every((id) => state.completedNodes.includes(id));
}

export function getAvailableDirectiveNodes(state: CitadelDirectiveTreeState) {
  return citadelDirectiveNodes.filter((node) => isDirectiveNodeAvailable(state, node));
}

export function getBranchCompletion(state: CitadelDirectiveTreeState) {
  return citadelDirectiveBranches.map((branch) => {
    const nodes = citadelDirectiveNodes.filter((node) => node.branchId === branch.id);
    const completed = nodes.filter((node) => state.completedNodes.includes(node.id));
    const available = nodes.filter((node) => isDirectiveNodeAvailable(state, node));
    return {
      branch,
      nodes,
      completed,
      available,
      percent: Math.round((completed.length / Math.max(1, nodes.length)) * 100),
    };
  });
}

function canPay(stats: Stats, cost: Partial<Stats>) {
  return Object.entries(cost).every(([key, value]) => {
    const stat = key as keyof Stats;
    return typeof value !== 'number' || stats[stat] >= value;
  });
}

function payCost(statsDelta: Partial<Stats>, cost: Partial<Stats>): Partial<Stats> {
  const result: Partial<Stats> = { ...statsDelta };
  for (const [key, value] of Object.entries(cost) as Array<[keyof Stats, number]>) {
    result[key] = (result[key] ?? 0) - value;
  }
  return result;
}

export function resolveDirectiveNode({ state, stats, nodeId, day }: { state: CitadelDirectiveTreeState; stats: Stats; nodeId: string; day: number }) {
  const node = citadelDirectiveNodes.find((item) => item.id === nodeId);
  if (!node) {
    return { tree: state, statsDelta: {}, lines: ['Directive inconnue rejetée par la Citadelle.'] };
  }
  if (!isDirectiveNodeAvailable(state, node)) {
    return { tree: state, statsDelta: { suspicion: 4 }, lines: [`PROTOCOLE REFUSÉ : ${node.title}. Prérequis Citadel incomplets.`] };
  }
  if (!canPay(stats, node.cost)) {
    return { tree: state, statsDelta: { suspicion: 3, citadel: -2 }, lines: [`PROTOCOLE DIFFÉRÉ : ${node.title}. Ressources administratives insuffisantes.`] };
  }

  const completedNodes = [...state.completedNodes, node.id];
  const unlockedCapabilities = Array.from(new Set([...state.unlockedCapabilities, ...node.unlocks]));
  const branchName = citadelDirectiveBranches.find((branch) => branch.id === node.branchId)?.name ?? node.branchId;
  const tree: CitadelDirectiveTreeState = {
    ...state,
    activeBranch: node.branchId,
    completedNodes,
    unlockedCapabilities,
    branchPressure: clamp(state.branchPressure + node.tier * 3 + node.advisorRisk * 0.25),
    advisorAttention: clamp(state.advisorAttention + node.advisorRisk * 0.45 + (node.branchId === 'advisor' ? -8 : 2)),
    dailyMandate: `${branchName} : ${node.title} actif. ${node.body}`,
    log: [
      `JOUR ${String(day).padStart(3, '0')} — Protocole Citadel validé : ${node.title}.`,
      `Branche ${branchName} niveau ${node.tier}/5. Capacités : ${node.unlocks.join(', ')}.`,
      ...state.log,
    ].slice(0, 60),
  };
  return {
    tree,
    statsDelta: payCost(node.effects, node.cost),
    lines: [
      `PROTOCOLE CITADEL VALIDÉ : ${node.title}.`,
      `${node.body}`,
      `Déverrouillage : ${node.unlocks.join(', ')}.`,
    ],
  };
}

export function simulateCitadelDirectiveTreeDay({ state, stats, day }: { state: CitadelDirectiveTreeState; stats: Stats; day: number }) {
  let statsDelta: Partial<Stats> = {};
  const activeNodes = citadelDirectiveNodes.filter((node) => state.completedNodes.includes(node.id));
  for (const node of activeNodes) {
    for (const [key, value] of Object.entries(node.dailyEffects) as Array<[keyof Stats, number]>) {
      statsDelta[key] = (statsDelta[key] ?? 0) + value;
    }
  }

  const branchRisk = Math.round(activeNodes.reduce((sum, node) => sum + node.advisorRisk, 0) / Math.max(1, activeNodes.length));
  const severeBranches = activeNodes.filter((node) => ['repression', 'nova', 'biocontrol', 'transhuman'].includes(node.branchId)).length;
  const advisorRelief = activeNodes.filter((node) => node.branchId === 'advisor').length;
  const advisorAttention = clamp(state.advisorAttention + branchRisk * 0.04 + severeBranches * 0.18 - advisorRelief * 0.22 + (stats.suspicion > 70 ? 1 : 0));
  const branchPressure = clamp(state.branchPressure + activeNodes.length * 0.08 + (stats.citadel < 35 ? 2 : -0.4));

  if (advisorAttention > 80) statsDelta.suspicion = (statsDelta.suspicion ?? 0) + 2;
  if (branchPressure > 72) statsDelta.fear = (statsDelta.fear ?? 0) + 1;
  if (activeNodes.length >= 12) statsDelta.citadel = (statsDelta.citadel ?? 0) + 1;

  const tree: CitadelDirectiveTreeState = {
    ...state,
    advisorAttention,
    branchPressure,
    dailyMandate: activeNodes.length
      ? `${activeNodes.length} protocoles permanents actifs. Branche dominante : ${citadelDirectiveBranches.find((b) => b.id === state.activeBranch)?.name ?? state.activeBranch}.`
      : state.dailyMandate,
    log: [
      `JOUR ${String(day).padStart(3, '0')} — Arbre Citadel : ${activeNodes.length} protocoles actifs, attention Advisor ${advisorAttention}%.`,
      ...state.log,
    ].slice(0, 60),
  };

  const lines = [
    `Arbre Citadel : ${activeNodes.length} protocoles permanents actifs.`,
    `Pression de branche : ${branchPressure}% / attention Advisor : ${advisorAttention}%.`,
  ];
  if (advisorAttention > 80) lines.push('COAN : la superposition de doctrines attire une lecture Advisor plus intrusive.');
  if (state.unlockedCapabilities.length) lines.push(`Capacités Citadel disponibles : ${state.unlockedCapabilities.slice(-4).join(', ')}.`);

  return { tree, statsDelta, lines };
}
