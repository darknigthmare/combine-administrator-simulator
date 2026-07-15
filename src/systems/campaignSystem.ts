import type { CampaignId, CampaignObjective, CampaignObjectiveProgress, CampaignState, GameState, Sector, Stats, TimelineSectorEffect } from '../types/game';
import { campaignPresets } from '../data/campaignScenarios';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

const addStat = (base: Stats, effects: Partial<Stats>): Stats => ({
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
});

export function getCampaignPreset(id: CampaignId) {
  return campaignPresets[id] ?? campaignPresets.custom_city_administration;
}

const campaignLoreStatus: Record<CampaignId, { label: string; tone: 'canon' | 'inferred' | 'alternate' | 'private'; detail: string }> = {
  custom_city_administration: { label: 'Simulation privée', tone: 'private', detail: 'Configuration libre COAN sans statut canonique.' },
  city17_pre_hl2: { label: 'Inférence compatible', tone: 'inferred', detail: 'Reconstruction administrative compatible avec la situation avant Half-Life 2.' },
  contaminated_port_city: { label: 'Extrapolation Xen', tone: 'private', detail: 'L’activité aquatique Xen est une extrapolation, pas un événement confirmé dans City 17.' },
  industrial_model_city: { label: 'Inférence compatible', tone: 'inferred', detail: 'City industrielle originale construite à partir des pratiques d’occupation connues.' },
  post_nova_city: { label: 'Histoire alternative', tone: 'alternate', detail: 'Branche longue volontairement divergente de la semaine canonique après Nova Prospekt.' },
  uprising_city: { label: 'Histoire alternative', tone: 'alternate', detail: 'La durée dépasse l’Uprising canonique et simule une résistance prolongée.' },
  isolated_citadel_city: { label: 'Projection Episodes', tone: 'alternate', detail: 'Projection privée compatible avec une autorité Combine fragmentée après la Citadelle.' },
};

export function getCampaignLoreStatus(id: CampaignId) {
  return campaignLoreStatus[id] ?? campaignLoreStatus.custom_city_administration;
}

export function getNextCampaignDay(dayInCampaign: number, durationDays: number, campaignComplete: boolean) {
  return campaignComplete ? Math.min(dayInCampaign, durationDays) : Math.min(durationDays, dayInCampaign + 1);
}

function applySectorEffects(sectors: Sector[], effects: TimelineSectorEffect[] = []) {
  if (!effects.length) return sectors;
  return sectors.map((sector) => {
    const match = effects.filter((effect) => effect.sectorIds.includes(sector.id));
    if (!match.length) return sector;
    return match.reduce<Sector>((acc, effect) => ({
      ...acc,
      rebel: effect.rebel === undefined ? acc.rebel : clamp(acc.rebel + effect.rebel),
      xen: effect.xen === undefined ? acc.xen : clamp(acc.xen + effect.xen),
      surveillance: effect.surveillance === undefined ? acc.surveillance : clamp(acc.surveillance + effect.surveillance),
      infrastructure: effect.infrastructure === undefined ? acc.infrastructure : clamp(acc.infrastructure + effect.infrastructure),
      loyalty: effect.loyalty === undefined ? acc.loyalty : clamp(acc.loyalty + effect.loyalty),
      fear: effect.fear === undefined ? acc.fear : clamp(acc.fear + effect.fear),
      status: effect.status ?? acc.status,
    }), sector);
  });
}

export function applyCampaignToStats(stats: Stats, campaignId: CampaignId): Stats {
  return addStat(stats, getCampaignPreset(campaignId).startingEffects);
}

export function applyCampaignToSectors(sectors: Sector[], campaignId: CampaignId): Sector[] {
  return applySectorEffects(sectors, getCampaignPreset(campaignId).sectorEffects);
}

function metricValue(objective: CampaignObjective, state: CampaignState, stats: Stats, sectors: Sector[], game?: GameState) {
  const metric = objective.metric;
  if (metric in stats) return stats[metric as keyof Stats];
  if (metric === 'days_survived') return state.dayInCampaign;
  if (metric === 'sector_integrity') {
    const strategic = sectors.filter((sector) => ['station', 'rail', 'admin', 'citadel', 'industrial'].includes(sector.id));
    return clamp(strategic.reduce((sum, sector) => sum + sector.infrastructure + sector.surveillance - sector.rebel * 0.5 - sector.xen * 0.35, 0) / Math.max(1, strategic.length));
  }
  if (metric === 'lambda_suppression') return clamp(100 - stats.rebel);
  if (metric === 'xen_containment') return clamp(100 - stats.xen);
  if (metric === 'citadel_obedience') return clamp((stats.citadel + stats.info + (100 - stats.suspicion)) / 3);
  if (metric === 'population_survival') return clamp(100 - Math.min(100, stats.civilianLosses / 55));
  if (metric === 'industrial_output') return clamp((stats.production + Math.max(0, stats.rations / 80)) / 2);
  if (metric === 'nova_secrecy') {
    const nova = game?.novaProspekt;
    if (!nova) return clamp(100 - stats.suspicion);
    return clamp((nova.secrecy + (100 - nova.instability) + (100 - stats.suspicion)) / 3);
  }
  if (metric === 'quarantine_control') {
    const quarantine = game?.quarantineZones;
    if (!quarantine) return clamp(100 - stats.xen);
    return clamp((quarantine.containmentIndex + (100 - quarantine.ravenholmMemoryIndex) + (100 - stats.xen)) / 3);
  }
  return 0;
}

function objectiveProgress(objective: CampaignObjective, state: CampaignState, stats: Stats, sectors: Sector[], game?: GameState): CampaignObjectiveProgress {
  const value = metricValue(objective, state, stats, sectors, game);
  const progress = objective.mode === 'above'
    ? clamp((value / Math.max(1, objective.target)) * 100)
    : value <= objective.target
      ? 100
      : clamp(100 - ((value - objective.target) / Math.max(1, 100 - objective.target)) * 100);
  const achieved = objective.mode === 'above' ? value >= objective.target : value <= objective.target;
  const comparator = objective.mode === 'above' ? '≥' : '≤';
  return {
    id: objective.id,
    title: objective.title,
    progress,
    achieved,
    detail: `${Math.round(value)} ${comparator} ${objective.target} — ${objective.description}`,
  };
}

export function buildCampaignObjectives(campaignId: CampaignId, state: CampaignState, stats: Stats, sectors: Sector[], game?: GameState) {
  return getCampaignPreset(campaignId).objectives.map((objective) => objectiveProgress(objective, state, stats, sectors, game));
}

export function createInitialCampaignState({ campaignId, stats, sectors }: { campaignId: CampaignId; stats: Stats; sectors: Sector[] }): CampaignState {
  const preset = getCampaignPreset(campaignId);
  const draft: CampaignState = {
    activeCampaignId: campaignId,
    dayInCampaign: 1,
    durationDays: preset.durationDays,
    pressure: 0,
    narrativeHeat: 0,
    milestoneIndex: 0,
    objectives: [],
    completedObjectiveIds: [],
    currentBriefing: preset.briefing,
    currentMandate: preset.adminMandate,
    log: [`Campagne initialisée : ${preset.name}.`, preset.openingReport],
  };
  draft.objectives = buildCampaignObjectives(campaignId, draft, stats, sectors);
  draft.completedObjectiveIds = draft.objectives.filter((objective) => objective.achieved).map((objective) => objective.id);
  return draft;
}

export function migrateCampaignState(game: Partial<GameState>): CampaignState {
  const activeCampaignId = game.campaign?.activeCampaignId ?? 'custom_city_administration';
  const sectors = game.sectors ?? [];
  const stats = game.stats ?? {
    stability: 60, loyalty: 35, fear: 55, rebel: 22, xen: 12, combine: 65, production: 62, rations: 1400, citadel: 70, info: 55, fatigue: 30, civilianLosses: 0, combineLosses: 0, suspicion: 12,
  };
  return {
    ...createInitialCampaignState({ campaignId: activeCampaignId, stats, sectors }),
    ...game.campaign,
    durationDays: game.campaign?.durationDays ?? getCampaignPreset(activeCampaignId).durationDays,
    log: game.campaign?.log ?? [`Campagne migrée : ${getCampaignPreset(activeCampaignId).name}.`],
  };
}

export function simulateCampaignDay({ game, stats, sectors }: { game: GameState; stats: Stats; sectors: Sector[] }) {
  const preset = getCampaignPreset(game.campaign.activeCampaignId);
  let nextStats = addStat(stats, preset.dailyEffects);
  let nextSectors = sectors;
  let nextCampaign: CampaignState = { ...game.campaign };
  const lines: string[] = [`Campagne ${preset.name} : jour ${nextCampaign.dayInCampaign}/${preset.durationDays}.`];

  const dueMilestones = preset.milestones.filter((milestone, index) => index >= nextCampaign.milestoneIndex && nextCampaign.dayInCampaign >= milestone.day);
  if (dueMilestones.length) {
    for (const milestone of dueMilestones) {
      nextStats = addStat(nextStats, milestone.effects);
      nextSectors = applySectorEffects(nextSectors, milestone.sectorEffects ?? []);
      lines.push(`${milestone.title} — ${milestone.description}`);
      lines.push(milestone.logLine);
    }
    nextCampaign = { ...nextCampaign, milestoneIndex: nextCampaign.milestoneIndex + dueMilestones.length };
  }

  const objectives = buildCampaignObjectives(preset.id, nextCampaign, nextStats, nextSectors, { ...game, stats: nextStats, sectors: nextSectors, campaign: nextCampaign });
  const completed = objectives.filter((objective) => objective.achieved).map((objective) => objective.id);
  const failedPressure = objectives.filter((objective) => !objective.achieved && objective.progress < 40).length * 10;
  const cityPressure = clamp(nextStats.rebel * 0.22 + nextStats.xen * 0.22 + nextStats.suspicion * 0.18 + nextStats.fatigue * 0.14 + (100 - nextStats.stability) * 0.24);
  const pressure = clamp((cityPressure + failedPressure) / 2);
  const narrativeHeat = clamp(pressure + nextCampaign.dayInCampaign / Math.max(1, preset.durationDays) * 20 + (preset.milestones.length - nextCampaign.milestoneIndex) * 2);
  const completeCount = completed.length;

  lines.push(`Objectifs campagne : ${completeCount}/${objectives.length} atteints / pression narrative ${pressure}%.`);
  if (nextCampaign.dayInCampaign >= preset.durationDays) {
    lines.push(`Fin de cycle campagne : ${preset.finale}`);
  }

  nextCampaign = {
    ...nextCampaign,
    pressure,
    narrativeHeat,
    objectives,
    completedObjectiveIds: completed,
    currentBriefing: preset.briefing,
    currentMandate: preset.adminMandate,
    log: [...lines, ...nextCampaign.log].slice(0, 30),
  };

  return {
    campaign: nextCampaign,
    stats: nextStats,
    sectors: nextSectors,
    lines,
  };
}
