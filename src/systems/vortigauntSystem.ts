import type { GameState, NovaProspektState, ProfileId, ResistanceFactionState, ScenarioId, Stats, TimelineId, VortigauntDoctrineId, VortigauntGroup, VortigauntOperation, VortigauntState } from '../types/game';
import { vortigauntDoctrines, vortigauntGroupTemplates, vortigauntOperations } from '../data/vortigaunts';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const add = (value: number, delta = 0) => clamp(value + delta);

function applyStats(base: Stats, effects: Partial<Stats>): Stats {
  return {
    ...base,
    stability: clamp(base.stability + (effects.stability ?? 0)),
    loyalty: clamp(base.loyalty + (effects.loyalty ?? 0)),
    fear: clamp(base.fear + (effects.fear ?? 0)),
    rebel: clamp(base.rebel + (effects.rebel ?? 0)),
    xen: clamp(base.xen + (effects.xen ?? 0)),
    combine: clamp(base.combine + (effects.combine ?? 0)),
    production: clamp(base.production + (effects.production ?? 0), 0, 120),
    rations: Math.max(0, Math.round(base.rations + (effects.rations ?? 0))),
    citadel: clamp(base.citadel + (effects.citadel ?? 0)),
    info: clamp(base.info + (effects.info ?? 0)),
    fatigue: clamp(base.fatigue + (effects.fatigue ?? 0)),
    civilianLosses: Math.max(0, Math.round(base.civilianLosses + (effects.civilianLosses ?? 0))),
    combineLosses: Math.max(0, Math.round(base.combineLosses + (effects.combineLosses ?? 0))),
    suspicion: clamp(base.suspicion + (effects.suspicion ?? 0)),
  };
}

function deltaStats(before: Stats, after: Stats): Partial<Stats> {
  return Object.fromEntries(Object.keys(before).map((key) => [key, (after as any)[key] - (before as any)[key]])) as Partial<Stats>;
}

function summarize(groups: VortigauntGroup[]): Pick<VortigauntState, 'totalCaptive' | 'totalFree' | 'vortessenceCoherence' | 'bioticPressure' | 'xenInsight' | 'resistanceSympathy' | 'novaAbuseIndex' | 'escapeRisk' | 'advisorInterest' | 'quarantineAid'> {
  const total = groups.reduce((sum, group) => sum + group.count, 0) || 1;
  const captiveStatuses = new Set<VortigauntGroup['status']>(['enslaved_biotics', 'nova_processed', 'controlled_asset', 'contained_watch']);
  const totalCaptive = groups.filter((group) => captiveStatuses.has(group.status)).reduce((sum, group) => sum + group.count, 0);
  const totalFree = total - totalCaptive;
  const weighted = (field: keyof Pick<VortigauntGroup, 'condition' | 'coercion' | 'vortessenceSignal' | 'resistanceLink' | 'xenInsight' | 'containmentUse' | 'novaPressure' | 'escapeRisk'>) => clamp(groups.reduce((sum, group) => sum + group[field] * group.count, 0) / total);
  const vortessenceCoherence = weighted('vortessenceSignal');
  const bioticPressure = weighted('coercion');
  const xenInsight = weighted('xenInsight');
  const resistanceSympathy = weighted('resistanceLink');
  const novaAbuseIndex = weighted('novaPressure');
  const escapeRisk = weighted('escapeRisk');
  const quarantineAid = weighted('containmentUse');
  const advisorInterest = clamp(vortessenceCoherence * 0.25 + xenInsight * 0.18 + novaAbuseIndex * 0.24 + resistanceSympathy * 0.2 + bioticPressure * 0.13);
  return { totalCaptive, totalFree, vortessenceCoherence, bioticPressure, xenInsight, resistanceSympathy, novaAbuseIndex, escapeRisk, advisorInterest, quarantineAid };
}

function visionFor(state: VortigauntState, stats: Stats, day: number) {
  if (stats.xen > 70) return 'Vision fragmentaire : spores, plafond humide, voix humaines transformées dans un ancien couloir médical.';
  if (state.resistanceSympathy > 70) return 'Vision fragmentaire : mains humaines et griffes Vortigaunt ouvrant une grille sous les canaux.';
  if (state.novaAbuseIndex > 75) return 'Vision fragmentaire : portes de Nova Prospekt, lumière blanche, chaînes, puis silence synchronisé.';
  if (state.vortessenceCoherence > 76) return 'Vision fragmentaire : plusieurs voix prononcent le même avertissement avant que les instruments COAN ne réagissent.';
  return `Vision basse résolution jour ${String(day).padStart(3, '0')} : activité Vortessence diffuse, non localisée.`;
}

function chooseInitialDoctrine(profile: ProfileId, timeline: TimelineId): VortigauntDoctrineId {
  if (profile === 'sympathizer') return 'silent_coexistence';
  if (profile === 'quarantine') return 'quarantine_cooperation';
  if (profile === 'collaborator') return 'nova_extraction';
  if (timeline === 'alyx_era') return 'quarantine_cooperation';
  if (timeline === 'post_nova_prospekt' || timeline === 'uprising') return 'vortessence_suppression';
  return 'biotic_labor_control';
}

export function createInitialVortigauntState({ scenario, profile, timeline, nova }: { scenario: ScenarioId; profile: ProfileId; timeline: TimelineId; nova?: NovaProspektState }): VortigauntState {
  const uprisingBias = scenario === 'uprising' || timeline === 'uprising' || timeline === 'citadel_collapse' ? 12 : 0;
  const novaBias = scenario === 'post_nova' || timeline === 'post_nova_prospekt' ? 14 : 0;
  const quarantineBias = scenario === 'quarantine' || timeline === 'alyx_era' ? 10 : 0;
  const sympathizerBias = profile === 'sympathizer' ? 10 : 0;
  const groups = vortigauntGroupTemplates.map((template) => ({
    ...template,
    condition: add(template.condition, profile === 'sympathizer' ? 5 : profile === 'tyrant' ? -6 : 0),
    coercion: add(template.coercion, profile === 'tyrant' ? 8 : profile === 'sympathizer' ? -8 : 0),
    vortessenceSignal: add(template.vortessenceSignal, uprisingBias + sympathizerBias),
    resistanceLink: add(template.resistanceLink, uprisingBias + sympathizerBias + (template.status === 'resistance_allied' ? 10 : 0)),
    xenInsight: add(template.xenInsight, quarantineBias),
    containmentUse: add(template.containmentUse, quarantineBias + (profile === 'quarantine' ? 8 : 0)),
    novaPressure: add(template.novaPressure, novaBias + Math.round((nova?.bioticsPressure ?? 0) * 0.08)),
    escapeRisk: add(template.escapeRisk, uprisingBias + Math.round(novaBias * 0.5)),
  }));
  const summary = summarize(groups);
  const state: VortigauntState = {
    activeDoctrine: chooseInitialDoctrine(profile, timeline),
    groups,
    ...summary,
    lastVision: 'Aucune vision Vortessence traitée. Les Biotics restent sous surveillance passive.',
    log: [
      `Vortigaunt/Biotics indexés : ${summary.totalCaptive} captifs / ${summary.totalFree} libres estimés.`,
      `Doctrine initiale : ${vortigauntDoctrines.find((item) => item.id === chooseInitialDoctrine(profile, timeline))?.name}.`,
    ],
  };
  return { ...state, lastVision: visionFor(state, { xen: 0, rebel: 0, stability: 0, loyalty: 0, fear: 0, combine: 0, production: 0, rations: 0, citadel: 0, info: 0, fatigue: 0, civilianLosses: 0, combineLosses: 0, suspicion: 0 }, 1) };
}

export function migrateVortigauntState(game: Partial<GameState>): VortigauntState {
  if (game.vortigaunts?.groups?.length) return game.vortigaunts;
  return createInitialVortigauntState({
    scenario: game.scenario ?? 'standard',
    profile: game.profile ?? 'loyalist',
    timeline: game.timeline ?? 'pre_hl2',
    nova: game.novaProspekt,
  });
}

function applyGroupBias(group: VortigauntGroup, bias: Partial<Record<'condition' | 'coercion' | 'vortessenceSignal' | 'resistanceLink' | 'xenInsight' | 'containmentUse' | 'novaPressure' | 'escapeRisk', number>>): VortigauntGroup {
  return {
    ...group,
    condition: add(group.condition, bias.condition ?? 0),
    coercion: add(group.coercion, bias.coercion ?? 0),
    vortessenceSignal: add(group.vortessenceSignal, bias.vortessenceSignal ?? 0),
    resistanceLink: add(group.resistanceLink, bias.resistanceLink ?? 0),
    xenInsight: add(group.xenInsight, bias.xenInsight ?? 0),
    containmentUse: add(group.containmentUse, bias.containmentUse ?? 0),
    novaPressure: add(group.novaPressure, bias.novaPressure ?? 0),
    escapeRisk: add(group.escapeRisk, bias.escapeRisk ?? 0),
  };
}

export function setVortigauntDoctrine(state: VortigauntState, doctrineId: VortigauntDoctrineId) {
  const doctrine = vortigauntDoctrines.find((item) => item.id === doctrineId) ?? vortigauntDoctrines[0];
  const groups = state.groups.map((group) => applyGroupBias(group, doctrine.groupBias));
  const summary = summarize(groups);
  const nextState: VortigauntState = {
    ...state,
    activeDoctrine: doctrine.id,
    groups,
    ...summary,
    lastVision: state.lastVision,
    log: [`COAN — Doctrine Vortigaunt active : ${doctrine.name}.`, doctrine.description, ...state.log].slice(0, 70),
  };
  return { vortigaunts: nextState, statsDelta: doctrine.effects, lines: [`Doctrine Vortigaunt active : ${doctrine.name}.`, doctrine.publicLine] };
}

export function resolveVortigauntOperation({ state, operation, stats, nova, resistanceFactions, selectedGroupId, day }: { state: VortigauntState; operation: VortigauntOperation; stats: Stats; nova: NovaProspektState; resistanceFactions: ResistanceFactionState; selectedGroupId?: string; day: number }) {
  const targetId = selectedGroupId ?? [...state.groups].sort((a, b) => (b.escapeRisk + b.resistanceLink + b.xenInsight) - (a.escapeRisk + a.resistanceLink + a.xenInsight))[0]?.id;
  const networkWide = operation.target === 'network';
  const groups = state.groups.map((group) => {
    if (!networkWide && group.id !== targetId) return group;
    const scale = networkWide ? 0.45 : 1;
    return applyGroupBias(group, Object.fromEntries(Object.entries(operation.groupEffects).map(([key, value]) => [key, Math.round((value ?? 0) * scale)])) as any);
  });
  let nextNova = { ...nova };
  if (operation.novaEffects) {
    nextNova = {
      ...nextNova,
      authority: add(nextNova.authority, operation.novaEffects.authority ?? 0),
      security: add(nextNova.security, operation.novaEffects.security ?? 0),
      secrecy: add(nextNova.secrecy, operation.novaEffects.secrecy ?? 0),
      intelligence: add(nextNova.intelligence, operation.novaEffects.intelligence ?? 0),
      instability: add(nextNova.instability, operation.novaEffects.instability ?? 0),
      humaneIndex: add(nextNova.humaneIndex, operation.novaEffects.humaneIndex ?? 0),
      bioticsPressure: add(nextNova.bioticsPressure, operation.novaEffects.bioticsPressure ?? 0),
      xenBreachRisk: add(nextNova.xenBreachRisk, operation.novaEffects.xenBreachRisk ?? 0),
      escaped: Math.max(0, nextNova.escaped + (operation.novaEffects.escaped ?? 0)),
      log: [`JOUR ${String(day).padStart(3, '0')} — Effet Biotics : ${operation.name}.`, ...nextNova.log].slice(0, 60),
    };
  }
  let nextFactions = { ...resistanceFactions };
  if (operation.factionEffects) {
    nextFactions = {
      ...nextFactions,
      vortigauntDiplomacy: add(nextFactions.vortigauntDiplomacy, operation.factionEffects.vortigauntDiplomacy ?? 0),
      armedMobilization: add(nextFactions.armedMobilization, operation.factionEffects.armedMobilization ?? 0),
      log: [`JOUR ${String(day).padStart(3, '0')} — Effet Vortigaunt sur factions : ${operation.name}.`, ...nextFactions.log].slice(0, 80),
    };
  }
  const summary = summarize(groups);
  const costDelta = Object.fromEntries(Object.entries(operation.cost).map(([key, value]) => [key, -(value ?? 0)])) as Partial<Stats>;
  const beforeCost = applyStats(stats, costDelta);
  const afterEffects = applyStats(beforeCost, operation.effects);
  const statsDelta = deltaStats(stats, afterEffects);
  const target = state.groups.find((group) => group.id === targetId);
  const nextState: VortigauntState = {
    ...state,
    groups,
    ...summary,
    lastVision: visionFor({ ...state, groups, ...summary }, afterEffects, day),
    log: [`JOUR ${String(day).padStart(3, '0')} — ${operation.logLine}`, `Cible : ${networkWide ? 'réseau complet' : target?.name ?? 'groupe inconnu'}.`, ...state.log].slice(0, 80),
  };
  return {
    vortigaunts: nextState,
    novaProspekt: nextNova,
    resistanceFactions: nextFactions,
    statsDelta,
    lines: [operation.logLine, `Cible Vortigaunt : ${networkWide ? 'réseau complet' : target?.name ?? 'groupe inconnu'}.`],
  };
}

export function simulateVortigauntDay({ state, stats, nova, resistanceFactions, day }: { state: VortigauntState; stats: Stats; nova: NovaProspektState; resistanceFactions: ResistanceFactionState; day: number }) {
  const doctrine = vortigauntDoctrines.find((item) => item.id === state.activeDoctrine) ?? vortigauntDoctrines[0];
  const xenNeed = stats.xen > 55 ? 2 : stats.xen > 35 ? 1 : 0;
  const lambdaPull = Math.round((stats.rebel * 0.04) + (resistanceFactions.vortigauntDiplomacy * 0.03));
  const novaStress = Math.round((nova.bioticsPressure * 0.035) + (nova.instability * 0.025));
  const fearStress = stats.fear > 70 ? 1 : 0;
  const groups = state.groups.map((group) => {
    const freeBonus = group.status === 'free_hidden' || group.status === 'resistance_allied' ? 1 : 0;
    const captivePenalty = group.status === 'nova_processed' || group.status === 'enslaved_biotics' ? 1 : 0;
    return applyGroupBias(group, {
      condition: (group.coercion > 74 ? -2 : 1) - captivePenalty + (doctrine.id === 'silent_coexistence' ? 1 : 0),
      coercion: Math.round((doctrine.groupBias.coercion ?? 0) * 0.2) + (novaStress > 3 ? 1 : 0),
      vortessenceSignal: Math.round((doctrine.groupBias.vortessenceSignal ?? 0) * 0.25) + freeBonus + (stats.xen > 65 ? 1 : 0),
      resistanceLink: lambdaPull + freeBonus + (group.condition < 35 ? 2 : 0) - (stats.info > 70 ? 1 : 0),
      xenInsight: xenNeed + Math.round((doctrine.groupBias.xenInsight ?? 0) * 0.2),
      containmentUse: xenNeed + Math.round((doctrine.groupBias.containmentUse ?? 0) * 0.2) - (group.condition < 30 ? 2 : 0),
      novaPressure: novaStress + Math.round((doctrine.groupBias.novaPressure ?? 0) * 0.2),
      escapeRisk: lambdaPull + novaStress + fearStress + (group.coercion > 80 ? 1 : 0) - (stats.combine > 70 ? 1 : 0),
    });
  });
  const summary = summarize(groups);
  const statsDelta: Partial<Stats> = {
    xen: summary.quarantineAid > 68 && summary.xenInsight > 60 ? -2 : summary.quarantineAid > 52 ? -1 : 0,
    rebel: summary.resistanceSympathy > 72 ? 2 : summary.resistanceSympathy > 58 ? 1 : 0,
    loyalty: summary.bioticPressure > 78 ? -2 : summary.quarantineAid > 65 && summary.novaAbuseIndex < 45 ? 1 : 0,
    suspicion: Math.round((summary.advisorInterest > 75 ? 2 : summary.advisorInterest > 55 ? 1 : 0) + doctrine.advisorRisk * 0.015),
    info: doctrine.id === 'vortessence_suppression' ? 1 : 0,
  };
  const nextState: VortigauntState = {
    ...state,
    groups,
    ...summary,
    lastVision: visionFor({ ...state, groups, ...summary }, stats, day),
    log: [
      `JOUR ${String(day).padStart(3, '0')} — Vortessence ${summary.vortessenceCoherence}% / pression Biotics ${summary.bioticPressure}% / aide quarantaine ${summary.quarantineAid}%.`,
      `Risque évasion ${summary.escapeRisk}% / sympathie Lambda ${summary.resistanceSympathy}% / intérêt Advisor ${summary.advisorInterest}%.`,
      ...state.log,
    ].slice(0, 80),
  };
  return {
    vortigaunts: nextState,
    statsDelta,
    lines: [
      `Vortigaunts/Biotics : ${summary.totalCaptive} captifs, ${summary.totalFree} libres estimés, cohérence Vortessence ${summary.vortessenceCoherence}%.`,
      `Aide quarantaine ${summary.quarantineAid}% / pression Nova-Biotics ${summary.novaAbuseIndex}% / risque évasion ${summary.escapeRisk}%.`,
      `Vision COAN : ${nextState.lastVision}`,
    ],
  };
}

export { vortigauntDoctrines, vortigauntOperations };
