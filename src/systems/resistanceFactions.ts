import type { GameState, ProfileId, ResistanceFaction, ResistanceFactionDoctrineId, ResistanceFactionOperation, ResistanceFactionState, ScenarioId, Stats, TimelineId } from '../types/game';
import { resistanceFactionDoctrines, resistanceFactionOperations, resistanceFactionTemplates } from '../data/resistanceFactions';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const add = (value: number, delta = 0) => clamp(value + delta);

function addStats(stats: Stats, effects: Partial<Stats>): Stats {
  return {
    ...stats,
    stability: clamp(stats.stability + (effects.stability ?? 0)),
    loyalty: clamp(stats.loyalty + (effects.loyalty ?? 0)),
    fear: clamp(stats.fear + (effects.fear ?? 0)),
    rebel: clamp(stats.rebel + (effects.rebel ?? 0)),
    xen: clamp(stats.xen + (effects.xen ?? 0)),
    combine: clamp(stats.combine + (effects.combine ?? 0)),
    production: clamp(stats.production + (effects.production ?? 0), 0, 120),
    rations: Math.max(0, Math.round(stats.rations + (effects.rations ?? 0))),
    citadel: clamp(stats.citadel + (effects.citadel ?? 0)),
    info: clamp(stats.info + (effects.info ?? 0)),
    fatigue: clamp(stats.fatigue + (effects.fatigue ?? 0)),
    civilianLosses: Math.max(0, Math.round(stats.civilianLosses + (effects.civilianLosses ?? 0))),
    combineLosses: Math.max(0, Math.round(stats.combineLosses + (effects.combineLosses ?? 0))),
    suspicion: clamp(stats.suspicion + (effects.suspicion ?? 0)),
  };
}

function summarize(factions: ResistanceFaction[]): Pick<ResistanceFactionState, 'dominantFactionId' | 'fragmentationIndex' | 'scientificThreat' | 'canalControl' | 'armedMobilization' | 'vortigauntDiplomacy' | 'novaMartyrdom' | 'ravenholmPanic' | 'factionWarRisk'> {
  const dominant = [...factions].sort((a, b) => (b.influence + b.cohesion + b.militancy) - (a.influence + a.cohesion + a.militancy))[0] ?? factions[0];
  const averageCohesion = factions.reduce((sum, faction) => sum + faction.cohesion, 0) / Math.max(1, factions.length);
  const rivalryHeat = factions.reduce((sum, faction) => sum + faction.rivalries.length * Math.max(0, faction.influence - faction.cohesion / 2), 0) / Math.max(1, factions.length);
  const byId = Object.fromEntries(factions.map((faction) => [faction.id, faction])) as Record<string, ResistanceFaction | undefined>;
  return {
    dominantFactionId: dominant.id,
    fragmentationIndex: clamp(100 - averageCohesion + rivalryHeat * 0.18),
    scientificThreat: clamp((byId.lambda_science?.scientificValue ?? 0) * 0.65 + (byId.lambda_science?.influence ?? 0) * 0.35),
    canalControl: clamp((byId.canal_rail?.influence ?? 0) * 0.55 + (byId.canal_rail?.secrecy ?? 0) * 0.25 + (byId.canal_rail?.cohesion ?? 0) * 0.2),
    armedMobilization: clamp((byId.armed_citizens?.militancy ?? 0) * 0.55 + (byId.armed_citizens?.publicSympathy ?? 0) * 0.3 + (byId.nova_escapees?.militancy ?? 0) * 0.15),
    vortigauntDiplomacy: clamp((byId.free_vortigaunts?.vortigauntLink ?? 0) * 0.7 + (byId.free_vortigaunts?.publicSympathy ?? 0) * 0.3),
    novaMartyrdom: clamp((byId.nova_escapees?.novaTrauma ?? 0) * 0.55 + (byId.nova_escapees?.publicSympathy ?? 0) * 0.45),
    ravenholmPanic: clamp((byId.ravenholm_refugees?.xenTolerance ?? 0) * 0.5 + (byId.ravenholm_refugees?.publicSympathy ?? 0) * 0.3 + (byId.ravenholm_refugees?.militancy ?? 0) * 0.2),
    factionWarRisk: clamp(rivalryHeat * 0.5 + (100 - averageCohesion) * 0.35 + (dominant.militancy ?? 0) * 0.15),
  };
}

export function createInitialResistanceFactionState({ scenario, profile, timeline }: { scenario: ScenarioId; profile: ProfileId; timeline: TimelineId }): ResistanceFactionState {
  const scenarioBias = scenario === 'uprising' ? 16 : scenario === 'post_nova' ? 12 : scenario === 'dormant' ? 5 : scenario === 'quarantine' ? 4 : 0;
  const timelineBias = timeline === 'uprising' || timeline === 'citadel_collapse' ? 18 : timeline === 'post_nova_prospekt' ? 14 : timeline === 'hl2_arrival' ? 9 : timeline === 'alyx_era' ? 5 : 0;
  const profileBias = profile === 'tyrant' ? 8 : profile === 'sympathizer' ? 10 : profile === 'quarantine' ? 2 : 0;
  const factions = resistanceFactionTemplates.map((template) => ({
    ...template,
    influence: add(template.influence, scenarioBias + profileBias + (template.id === 'nova_escapees' && (scenario === 'post_nova' || timeline === 'post_nova_prospekt') ? 16 : 0)),
    militancy: add(template.militancy, Math.round((scenarioBias + timelineBias) * 0.6)),
    publicSympathy: add(template.publicSympathy, profile === 'tyrant' ? 8 : profile === 'sympathizer' ? 12 : 0),
    novaTrauma: add(template.novaTrauma, scenario === 'post_nova' ? 12 : 0),
    discovered: template.discovered || scenario === 'uprising',
  }));
  const summary = summarize(factions);
  return {
    activeDoctrine: profile === 'sympathizer' ? 'selective_tolerance' : 'fragment_and_isolate',
    factions,
    ...summary,
    log: [
      `Factions Lambda indexées : ${factions.length} courants internes détectés.`,
      `Faction dominante initiale : ${factions.find((f) => f.id === summary.dominantFactionId)?.name}.`,
    ],
  };
}

export function migrateResistanceFactionState(game: Partial<GameState>): ResistanceFactionState {
  if (game.resistanceFactions?.factions?.length) return game.resistanceFactions;
  return createInitialResistanceFactionState({
    scenario: game.scenario ?? 'standard',
    profile: game.profile ?? 'loyalist',
    timeline: game.timeline ?? 'pre_hl2',
  });
}

export function simulateResistanceFactionDay({ state, stats, day, networkPressure = 0 }: { state: ResistanceFactionState; stats: Stats; day: number; networkPressure?: number }) {
  const doctrine = resistanceFactionDoctrines.find((item) => item.id === state.activeDoctrine) ?? resistanceFactionDoctrines[0];
  const globalPressure = Math.round(stats.rebel * 0.05 + stats.fatigue * 0.035 + Math.max(0, 45 - stats.loyalty) * 0.04 + networkPressure * 0.04);
  const xenFear = stats.xen > 55 ? 2 : 0;
  const novaFuel = stats.suspicion > 55 ? 2 : 0;
  const factions = state.factions.map((faction) => {
    const bias = doctrine.influenceBias[faction.id] ?? 0;
    const resonance =
      (faction.id === 'free_vortigaunts' ? xenFear : 0) +
      (faction.id === 'ravenholm_refugees' ? xenFear + (stats.xen > 70 ? 2 : 0) : 0) +
      (faction.id === 'nova_escapees' ? novaFuel : 0) +
      (faction.id === 'armed_citizens' && stats.fear > 70 ? 2 : 0) +
      (faction.id === 'industrial_saboteurs' && stats.production < 45 ? 2 : 0);
    const discovered = faction.discovered || faction.influence + faction.militancy > 145 || day % 7 === 0 && faction.secrecy < 45;
    return {
      ...faction,
      influence: add(faction.influence, globalPressure + resonance + bias - (faction.suppressed ? 4 : 0)),
      cohesion: add(faction.cohesion, Math.round(globalPressure * 0.35) + (state.fragmentationIndex > 55 ? -2 : 1)),
      militancy: add(faction.militancy, stats.fear > 65 ? 2 : 0 + resonance),
      secrecy: add(faction.secrecy, stats.info > 65 ? -2 : 1),
      publicSympathy: add(faction.publicSympathy, stats.loyalty < 45 ? 2 : -1),
      discovered,
      suppressed: faction.suppressed && faction.influence > 12,
    };
  });
  const summary = summarize(factions);
  const dominant = factions.find((faction) => faction.id === summary.dominantFactionId);
  const statsDelta: Partial<Stats> = {
    rebel: Math.round((summary.armedMobilization + summary.canalControl + summary.scientificThreat) / 95),
    info: doctrine.id === 'fragment_and_isolate' ? 1 : 0,
    xen: summary.ravenholmPanic > 70 || summary.vortigauntDiplomacy > 75 ? -1 : 0,
    suspicion: doctrine.risk > 35 ? 1 : 0,
  };
  const lines = [
    `Factions Lambda : ${dominant?.name ?? 'réseau inconnu'} domine la coordination clandestine.`,
    `Fragmentation ${summary.fragmentationIndex}% / mobilisation armée ${summary.armedMobilization}% / contrôle canaux ${summary.canalControl}%.`,
    `Science Lambda ${summary.scientificThreat}% / diplomatie Vortigaunt ${summary.vortigauntDiplomacy}% / martyr Nova ${summary.novaMartyrdom}%.`,
  ];
  return {
    resistanceFactions: { ...state, factions, ...summary, log: [`JOUR ${String(day).padStart(3, '0')} — ${lines[0]}`, ...lines.slice(1), ...state.log].slice(0, 80) },
    statsDelta,
    lines,
  };
}

export function setResistanceFactionDoctrine(state: ResistanceFactionState, doctrineId: ResistanceFactionDoctrineId) {
  const doctrine = resistanceFactionDoctrines.find((item) => item.id === doctrineId) ?? resistanceFactionDoctrines[0];
  const factions = state.factions.map((faction) => ({
    ...faction,
    influence: add(faction.influence, doctrine.influenceBias[faction.id] ?? 0),
  }));
  const summary = summarize(factions);
  const lines = [`Doctrine factions Lambda active : ${doctrine.name}.`, doctrine.description];
  return {
    resistanceFactions: { ...state, activeDoctrine: doctrineId, factions, ...summary, log: [`COAN — ${lines[0]}`, lines[1], ...state.log].slice(0, 80) },
    statsDelta: doctrine.effects,
    lines,
  };
}

export function resolveResistanceFactionOperation({ state, operation, stats }: { state: ResistanceFactionState; operation: ResistanceFactionOperation; stats: Stats }) {
  const factions = state.factions.map((faction) => {
    if (faction.id !== operation.targetFaction) return faction;
    return {
      ...faction,
      influence: add(faction.influence, operation.factionEffects.influence ?? 0),
      cohesion: add(faction.cohesion, operation.factionEffects.cohesion ?? 0),
      militancy: add(faction.militancy, operation.factionEffects.militancy ?? 0),
      secrecy: add(faction.secrecy, operation.factionEffects.secrecy ?? 0),
      publicSympathy: add(faction.publicSympathy, operation.factionEffects.publicSympathy ?? 0),
      vortigauntLink: add(faction.vortigauntLink, operation.factionEffects.vortigauntLink ?? 0),
      scientificValue: add(faction.scientificValue, operation.factionEffects.scientificValue ?? 0),
      xenTolerance: add(faction.xenTolerance, operation.factionEffects.xenTolerance ?? 0),
      novaTrauma: add(faction.novaTrauma, operation.factionEffects.novaTrauma ?? 0),
      discovered: true,
      suppressed: (operation.factionEffects.influence ?? 0) < -6 ? true : faction.suppressed,
    };
  });
  const summary = summarize(factions);
  const statsAfterCost = addStats(stats, operation.cost);
  const statsDelta = addStats(statsAfterCost, operation.effects);
  const finalDelta = Object.fromEntries(Object.keys(stats).map((key) => [key, (statsDelta as any)[key] - (stats as any)[key]])) as Partial<Stats>;
  const target = factions.find((faction) => faction.id === operation.targetFaction);
  const lines = [operation.logLine, `Faction ciblée : ${target?.name ?? operation.targetFaction}. Nouvelle influence : ${target?.influence ?? 0}%.`];
  return {
    resistanceFactions: { ...state, factions, ...summary, log: [`COAN — ${lines[0]}`, lines[1], ...state.log].slice(0, 80) },
    statsDelta: finalDelta,
    lines,
  };
}

export { resistanceFactionDoctrines, resistanceFactionOperations };
