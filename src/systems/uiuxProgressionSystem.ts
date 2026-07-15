import type { GameState, ScenarioId, Stats, TabId, TimelineId, UiuxCampaignPhase, UiuxProgressionResources, UiuxProgressionState, UiuxUnlockId } from '../types/game';

export type UiuxUnlockDefinition = {
  id: UiuxUnlockId;
  title: string;
  faction: 'Civil Authority' | 'Overwatch' | 'Xen' | 'Nova Prospekt' | 'Citadel';
  description: string;
  cost: UiuxProgressionResources;
  requiresDay: number;
  requires?: UiuxUnlockId[];
  unlocks: string;
  upkeep: string;
  image: string;
  narrative?: boolean;
};

const uiuxPhaseLabels: Record<UiuxCampaignPhase, string> = {
  occupation: 'Occupation',
  pacification: 'Pacification',
  containment: 'Confinement',
  uprising: 'Soulèvement',
  citadel_review: 'Revue Citadel',
};

export function formatUiuxPhase(phase: UiuxCampaignPhase) {
  return uiuxPhaseLabels[phase];
}

export const uiuxUnlockCatalog: UiuxUnlockDefinition[] = [
  { id: 'citizen_intake', title: 'Registre Civil Intake', faction: 'Civil Authority', description: 'Autorise le traitement administratif des nouveaux citoyens hors du flux opérationnel.', cost: { requisition: 80, data: 20, compliance: 8 }, requiresDay: 1, unlocks: 'Autorisation civile et dossiers Intake.', upkeep: '+10 REQ / +3 DATA / +8 charge par jour', image: '/openai-visuals/banners/citadel-requisitions.webp' },
  { id: 'ota_command', title: 'Liaison Overwatch Transhuman Arm', faction: 'Overwatch', description: 'Ouvre les réserves OTA et Airwatch lourdes après validation Citadel.', cost: { requisition: 170, data: 60, compliance: 18 }, requiresDay: 2, unlocks: 'Unités OTA et Airwatch compatibles avec la fenêtre chronologique.', upkeep: '+20 REQ / +3 DATA / +8 charge par jour', image: '/openai-visuals/unlocks/ota-command.webp' },
  { id: 'xen_bioscan', title: 'Paquet Bioscan Xen', faction: 'Xen', description: 'Déclassifie les bio-signaux et ouvre les dossiers de biosphère Xen.', cost: { requisition: 120, data: 120, compliance: 10 }, requiresDay: 3, unlocks: 'Quarantaine, recherche et catastrophes Xen.', upkeep: '+10 REQ / +11 DATA / +8 charge par jour', image: '/openai-visuals/unlocks/xen-bioscan-lore.webp' },
  { id: 'nova_prospekt_link', title: 'Canal Nova Prospekt', faction: 'Nova Prospekt', description: 'Ouvre le réseau de transfert pénitentiaire externe après liaison OTA.', cost: { requisition: 210, data: 100, compliance: 24 }, requiresDay: 4, requires: ['ota_command'], unlocks: 'Terminal Nova Prospekt et dossiers de détention.', upkeep: '+10 REQ / +9 DATA / +8 charge par jour', image: '/openai-visuals/unlocks/nova-channel.webp' },
  { id: 'advisor_channel', title: 'Canal direct Advisor', faction: 'Citadel', description: 'Autorise une inspection Advisor, au prix d’une surveillance administrative accrue.', cost: { requisition: 130, data: 80, compliance: 32 }, requiresDay: 5, unlocks: 'Validation Advisor et protocoles supérieurs.', upkeep: '+10 REQ / +3 DATA / +3 CONF / +12 charge par jour', image: '/openai-visuals/unlocks/advisor-link-lore.webp' },
  { id: 'rail_network', title: 'Canal ferroviaire Razor Train', faction: 'Overwatch', description: 'Réactive les priorités logistiques longue distance de la Combine.', cost: { requisition: 150, data: 80, compliance: 16 }, requiresDay: 3, unlocks: 'Bonus durable de production, rations et transferts.', upkeep: '+10 REQ / +3 DATA / +8 charge, revenu +18 REQ par jour', image: '/openai-visuals/unlocks/razor-train.webp' },
  { id: 'ravenholm_blacklist', title: 'Dossier interdit Ravenholm', faction: 'Civil Authority', description: 'Archive narrative révélée par les signaux de quarantaine. Elle ne peut pas être achetée.', cost: { requisition: 0, data: 0, compliance: 0 }, requiresDay: 7, requires: ['xen_bioscan'], unlocks: 'Archive Ravenholm et doctrine de non-intervention.', upkeep: 'Aucun entretien', image: '/openai-visuals/events/xen-breach.webp', narrative: true },
  { id: 'synth_requisition', title: 'Réquisition Synth lourde', faction: 'Overwatch', description: 'Autorise Hunter et Strider pour les phases de guerre ouverte.', cost: { requisition: 360, data: 180, compliance: 42 }, requiresDay: 8, requires: ['ota_command', 'advisor_channel'], unlocks: 'Hunter, Strider et protocole de rupture.', upkeep: '+32 REQ / +3 DATA / +15 charge par jour', image: '/openai-visuals/units/hunter.webp' },
];

const unlockStatEffects: Record<UiuxUnlockId, Partial<Stats>> = {
  citizen_intake: { info: 3, fatigue: 1 },
  ota_command: { combine: 5, fear: 3, suspicion: 2 },
  xen_bioscan: { info: 5, citadel: -1, suspicion: 2 },
  nova_prospekt_link: { info: 4, fear: 2, suspicion: 4 },
  advisor_channel: { citadel: 6, fear: 3, suspicion: 7 },
  rail_network: { production: 4, rations: 160, suspicion: 1 },
  ravenholm_blacklist: { stability: 2, info: 3, loyalty: -1 },
  synth_requisition: { combine: 8, fear: 6, loyalty: -4, suspicion: 6 },
};

const emptyUnlocks = (): Record<UiuxUnlockId, boolean> => ({
  citizen_intake: false,
  ota_command: false,
  xen_bioscan: false,
  nova_prospekt_link: false,
  advisor_channel: false,
  rail_network: false,
  ravenholm_blacklist: false,
  synth_requisition: false,
});

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function createInitialUiuxProgressionState(context?: { scenario?: ScenarioId; timeline?: TimelineId }): UiuxProgressionState {
  const unlocked = emptyUnlocks();
  if (context?.scenario === 'quarantine' || context?.timeline === 'alyx_era') unlocked.xen_bioscan = true;
  if (context?.scenario === 'post_nova' || ['post_nova_prospekt', 'uprising', 'citadel_collapse'].includes(context?.timeline ?? '')) {
    unlocked.ota_command = true;
    unlocked.rail_network = true;
    unlocked.nova_prospekt_link = true;
  } else if (context?.scenario === 'uprising' || context?.timeline === 'hl2_arrival') {
    unlocked.ota_command = true;
    unlocked.rail_network = true;
  }
  const active = { ...unlocked };
  return {
    resources: { requisition: 220, data: 60, compliance: 18 },
    unlocked,
    active,
    phase: 'occupation',
    heat: 18,
    bureaucraticLoad: 12,
    consecutiveCriticalDays: 0,
    longTermScore: 50,
    lastAudit: 'Évaluation Citadel initiale : les dossiers sensibles suivent le mandat sélectionné.',
  };
}

export function migrateUiuxProgressionState(game: Partial<GameState>): UiuxProgressionState {
  const base = createInitialUiuxProgressionState({ scenario: game.scenario, timeline: game.timeline });
  const saved = game.uiuxProgression;
  if (!saved) return base;
  const unlocked = { ...base.unlocked, ...saved.unlocked };
  const active = { ...base.active, ...(saved.active ?? saved.unlocked) };
  if (unlocked.ravenholm_blacklist) active.ravenholm_blacklist = true;
  return {
    ...base,
    ...saved,
    resources: { ...base.resources, ...saved.resources },
    unlocked,
    active,
    lastAudit: (saved.lastAudit ?? base.lastAudit).replace(/Audit V4/gi, 'Évaluation Citadel').replace(/audit UIUX/gi, 'évaluation Citadel'),
  };
}

export function canPurchaseUiuxUnlock(state: UiuxProgressionState, item: UiuxUnlockDefinition, day: number): boolean {
  const { resources, unlocked, active } = state;
  return !item.narrative
    && !unlocked[item.id]
    && day >= item.requiresDay
    && (item.requires ?? []).every((id) => unlocked[id] && active[id])
    && resources.requisition >= item.cost.requisition
    && resources.data >= item.cost.data
    && resources.compliance >= item.cost.compliance;
}

export function getUiuxUnlockLockReason(state: UiuxProgressionState, item: UiuxUnlockDefinition, day: number): string {
  if (state.unlocked[item.id]) return 'Autorisation déjà active.';
  if (item.narrative) return 'Déblocage narratif uniquement : progression de campagne requise.';
  if (day < item.requiresDay) return `Disponible à partir du jour J${item.requiresDay}.`;

  const missingPrerequisites = (item.requires ?? [])
    .filter((id) => !state.unlocked[id])
    .map((id) => uiuxUnlockCatalog.find((entry) => entry.id === id)?.title ?? id);
  if (missingPrerequisites.length > 0) return `Prérequis manquant : ${missingPrerequisites.join(', ')}.`;

  const suspendedPrerequisites = (item.requires ?? [])
    .filter((id) => state.unlocked[id] && !state.active[id])
    .map((id) => uiuxUnlockCatalog.find((entry) => entry.id === id)?.title ?? id);
  if (suspendedPrerequisites.length > 0) return `Prérequis suspendu : réactiver ${suspendedPrerequisites.join(', ')}.`;

  const missingResources = [
    state.resources.requisition < item.cost.requisition ? `${item.cost.requisition - state.resources.requisition} REQ` : '',
    state.resources.data < item.cost.data ? `${item.cost.data - state.resources.data} DATA` : '',
    state.resources.compliance < item.cost.compliance ? `${item.cost.compliance - state.resources.compliance} CONF` : '',
  ].filter(Boolean);
  if (missingResources.length > 0) return `Ressources manquantes : ${missingResources.join(', ')}.`;
  return 'Autorisation disponible.';
}

export function purchaseUiuxUnlock(state: UiuxProgressionState, id: UiuxUnlockId, day: number): { state: UiuxProgressionState; message: string; ok: boolean; statsDelta: Partial<Stats> } {
  const item = uiuxUnlockCatalog.find((entry) => entry.id === id);
  if (!item || !canPurchaseUiuxUnlock(state, item, day)) {
    return { state, message: item ? `Autorisation refusée : ${getUiuxUnlockLockReason(state, item, day)}` : 'Autorisation inconnue.', ok: false, statsDelta: {} };
  }
  const unlocked = { ...state.unlocked, [id]: true };
  const active = { ...state.active, [id]: true };
  const bureaucraticLoad = calculateUiuxUpkeep(active).load;
  return {
    ok: true,
    message: `${item.title} autorisé. ${item.unlocks}`,
    statsDelta: unlockStatEffects[id],
    state: {
      ...state,
      unlocked,
      active,
      resources: {
        requisition: state.resources.requisition - item.cost.requisition,
        data: state.resources.data - item.cost.data,
        compliance: state.resources.compliance - item.cost.compliance,
      },
      heat: clamp(state.heat + 4 + (id === 'advisor_channel' ? 8 : id === 'synth_requisition' ? 10 : 0)),
      bureaucraticLoad,
      lastAudit: `Autorisation ${item.title} enregistrée. Entretien recalculé à ${bureaucraticLoad}%.`,
    },
  };
}

export function setUiuxUnlockActive(state: UiuxProgressionState, id: UiuxUnlockId, enabled: boolean): { state: UiuxProgressionState; message: string; ok: boolean } {
  const item = uiuxUnlockCatalog.find((entry) => entry.id === id);
  if (!item || item.narrative || !state.unlocked[id]) {
    return { state, message: 'Cette autorisation ne peut pas être suspendue.', ok: false };
  }
  if (enabled && (item.requires ?? []).some((requiredId) => !state.active[requiredId])) {
    return { state, message: `Activation refusée : réactiver d’abord ${(item.requires ?? []).filter((requiredId) => !state.active[requiredId]).join(', ')}.`, ok: false };
  }

  const active = { ...state.active, [id]: enabled };
  if (!enabled) {
    let changed = true;
    while (changed) {
      changed = false;
      for (const dependent of uiuxUnlockCatalog) {
        if (!dependent.narrative && active[dependent.id] && (dependent.requires ?? []).some((requiredId) => !active[requiredId])) {
          active[dependent.id] = false;
          changed = true;
        }
      }
    }
  }
  const upkeep = calculateUiuxUpkeep(active);
  return {
    ok: true,
    message: `${item.title} ${enabled ? 'réactivée' : 'suspendue'}. Charge Citadel ${upkeep.load}%.`,
    state: {
      ...state,
      active,
      bureaucraticLoad: upkeep.load,
      lastAudit: `${item.title} ${enabled ? 'réactivée' : 'suspendue'} par l’administrateur. Entretien recalculé.`,
    },
  };
}

export function calculateUiuxUpkeep(activeUnlocks: Record<UiuxUnlockId, boolean>) {
  const active = Object.entries(activeUnlocks).filter(([id, enabled]) => enabled && id !== 'ravenholm_blacklist').length;
  return {
    requisition: active * 10 + (activeUnlocks.synth_requisition ? 22 : 0) + (activeUnlocks.ota_command ? 10 : 0),
    data: active * 3 + (activeUnlocks.xen_bioscan ? 8 : 0) + (activeUnlocks.nova_prospekt_link ? 6 : 0),
    compliance: Math.floor(active / 3) + (activeUnlocks.advisor_channel ? 3 : 0),
    load: clamp(10 + active * 8 + (activeUnlocks.synth_requisition ? 7 : 0) + (activeUnlocks.advisor_channel ? 4 : 0)),
  };
}

export function calculateUiuxIncome(active: Record<UiuxUnlockId, boolean>, stats: Stats) {
  return {
    requisition: Math.round(52 + stats.production * 0.32 + (active.rail_network ? 18 : 0)),
    data: Math.round(16 + stats.info * 0.24),
    compliance: Math.max(2, Math.round(stats.citadel / 22)),
  };
}

function resolvePhase(day: number, unlocked: Record<UiuxUnlockId, boolean>, stats: Stats): UiuxCampaignPhase {
  if (stats.suspicion > 78 || day >= 45) return 'citadel_review';
  if (stats.rebel > 70 || stats.stability < 35) return 'uprising';
  if (unlocked.xen_bioscan && stats.xen > 35) return 'containment';
  if (unlocked.ota_command || day >= 5) return 'pacification';
  return 'occupation';
}

export function simulateUiuxProgressionDay(state: UiuxProgressionState, stats: Stats, day: number) {
  const discoveredRavenholm = state.active.xen_bioscan && !state.unlocked.ravenholm_blacklist && day >= 7 && stats.xen >= 42;
  const unlocked = discoveredRavenholm ? { ...state.unlocked, ravenholm_blacklist: true } : state.unlocked;
  const active = discoveredRavenholm ? { ...state.active, ravenholm_blacklist: true } : state.active;
  const upkeep = calculateUiuxUpkeep(active);
  const income = calculateUiuxIncome(active, stats);
  const raw = {
    requisition: state.resources.requisition + income.requisition - upkeep.requisition,
    data: state.resources.data + income.data - upkeep.data,
    compliance: state.resources.compliance + income.compliance - upkeep.compliance,
  };
  const critical = raw.requisition < 0 || raw.data < 0 || raw.compliance < 0 || upkeep.load >= 90;
  const consecutiveCriticalDays = critical ? state.consecutiveCriticalDays + 1 : Math.max(0, state.consecutiveCriticalDays - 1);
  const penaltyActive = consecutiveCriticalDays >= 2;
  const heat = clamp(state.heat + Math.round(upkeep.load / 24) + Math.round(stats.suspicion / 35) - (critical ? 0 : 3));
  const visibleXenPressure = active.xen_bioscan ? stats.xen : 0;
  const longTermScore = clamp((stats.stability + stats.citadel + (100 - stats.rebel) + (100 - visibleXenPressure) + (100 - heat) + (100 - upkeep.load)) / 6);
  const phase = resolvePhase(day + 1, active, stats);
  const nextState: UiuxProgressionState = {
    ...state,
    unlocked,
    active,
    resources: {
      requisition: Math.max(0, raw.requisition),
      data: Math.max(0, raw.data),
      compliance: Math.max(0, raw.compliance),
    },
    phase,
    heat,
    bureaucraticLoad: upkeep.load,
    consecutiveCriticalDays,
    longTermScore,
    lastAudit: critical
      ? `Évaluation Citadel : entretien critique au jour ${day}. Réduire la charge ou restaurer les ressources.`
      : `Évaluation Citadel : phase ${formatUiuxPhase(phase)}, viabilité ${longTermScore}%, entretien couvert au jour ${day}.`,
  };
  const statsDelta: Partial<Stats> = {
    production: (active.rail_network ? 1 : 0) + (penaltyActive ? -3 : 0),
    rations: active.rail_network ? 45 : 0,
    citadel: penaltyActive ? -2 : 0,
    suspicion: penaltyActive ? 4 : 0,
  };
  return {
    state: nextState,
    statsDelta,
    lines: [
      `Entretien Citadel : ${upkeep.requisition} REQ / ${upkeep.data} DATA / ${upkeep.compliance} CONF, revenus ${income.requisition}/${income.data}/${income.compliance}.`,
      ...(discoveredRavenholm ? ['Archive narrative révélée : Ravenholm classée zone interdite, doctrine de non-intervention active.'] : []),
      nextState.lastAudit,
    ],
  };
}

export function runUiuxAudit(state: UiuxProgressionState, stats: Stats, day: number): UiuxProgressionState {
  const issues: string[] = [];
  if (state.unlocked.nova_prospekt_link && !state.unlocked.ota_command) issues.push('Nova sans liaison OTA');
  if (state.unlocked.synth_requisition && (!state.unlocked.ota_command || !state.unlocked.advisor_channel)) issues.push('Synth sans chaine OTA/Advisor');
  if (state.unlocked.ravenholm_blacklist && !state.unlocked.xen_bioscan) issues.push('Ravenholm sans Bioscan');
  if (state.bureaucraticLoad >= 90) issues.push('charge bureaucratique critique');
  if (state.heat > 80 || stats.suspicion > 80) issues.push('revue Citadel imminente');
  return {
    ...state,
    lastAudit: issues.length
      ? `Évaluation Citadel jour ${day} : ${issues.join(', ')}.`
      : `Évaluation Citadel jour ${day} : progression et autorisations cohérentes.`,
  };
}

export function isUiuxTabUnlocked(state: UiuxProgressionState, tab: TabId): boolean {
  if (tab === 'nova') return isUiuxCapabilityActive(state, 'nova_prospekt_link');
  if (tab === 'xen' || tab === 'xen_research' || tab === 'xen_catastrophes') return isUiuxCapabilityActive(state, 'xen_bioscan');
  return true;
}

export function isUiuxCapabilityActive(state: UiuxProgressionState, id: UiuxUnlockId): boolean {
  return Boolean(state.unlocked[id] && state.active[id]);
}

export function isUiuxUnitUnlocked(state: UiuxProgressionState, unitId: string): boolean {
  if (unitId === 'advisor') return isUiuxCapabilityActive(state, 'advisor_channel');
  if (unitId === 'hunter' || unitId === 'strider') return isUiuxCapabilityActive(state, 'synth_requisition');
  if (['grunt', 'soldier', 'ordinal', 'suppressor', 'elite', 'dropship', 'gunship'].includes(unitId)) return isUiuxCapabilityActive(state, 'ota_command');
  return true;
}
