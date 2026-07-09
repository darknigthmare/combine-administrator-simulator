import type {
  CampaignId,
  CampaignMissionMetric,
  CampaignMissionObjectiveDefinition,
  CampaignMissionObjectiveRuntime,
  CampaignMissionState,
  GameState,
  Sector,
  Stats,
} from '../types/game';
import { campaignObjectiveDefinitionsByCampaign } from '../data/campaignObjectives';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(Number.isFinite(value) ? value : 0)));

const fallbackStats: Stats = {
  stability: 60,
  loyalty: 35,
  fear: 55,
  rebel: 22,
  xen: 12,
  combine: 65,
  production: 62,
  rations: 1400,
  citadel: 70,
  info: 55,
  fatigue: 30,
  civilianLosses: 0,
  combineLosses: 0,
  suspicion: 12,
};

const addStat = (base: Stats, effects: Partial<Stats> = {}): Stats => ({
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

function sectorIntegrity(sectors: Sector[]) {
  if (!sectors.length) return 50;
  const strategic = sectors.filter((sector) => ['station', 'rail', 'admin', 'citadel', 'industrial'].includes(sector.id));
  const target = strategic.length ? strategic : sectors;
  return clamp(target.reduce((sum, sector) => sum + sector.infrastructure + sector.surveillance - sector.rebel * 0.5 - sector.xen * 0.35, 0) / Math.max(1, target.length));
}

function objectiveDefinitionsFor(campaignId: CampaignId) {
  return campaignObjectiveDefinitionsByCampaign[campaignId] ?? campaignObjectiveDefinitionsByCampaign.custom_city_administration;
}

function metricValue(metric: CampaignMissionMetric, stats: Stats, sectors: Sector[], game?: Partial<GameState>) {
  if (metric in stats) return Number(stats[metric as keyof Stats]);

  if (metric === 'days_survived') return game?.campaign?.dayInCampaign ?? game?.day ?? 1;
  if (metric === 'sector_integrity') return sectorIntegrity(sectors);
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
  if (metric === 'hunger_control') return clamp(100 - (game?.rationEconomy?.hungerIndex ?? Math.max(0, 100 - stats.rations / 30)));
  if (metric === 'black_market_control') return clamp(100 - (game?.rationEconomy?.blackMarketIndex ?? 35));
  if (metric === 'informant_integrity') {
    const informants = game?.informantNetwork;
    if (!informants) return clamp(stats.info);
    return clamp((informants.reliabilityIndex + (100 - informants.falseReportIndex) + (100 - informants.backlashIndex) + (100 - informants.lambdaPenetration)) / 4);
  }
  if (metric === 'cp_integrity') {
    const cp = game?.civilProtection;
    if (!cp) return clamp((stats.combine + stats.info) / 2);
    return clamp((cp.disciplineIndex + cp.moraleIndex + (100 - cp.corruptionIndex) + (100 - cp.brutalityIndex) + (100 - cp.lambdaInfiltration)) / 5);
  }
  if (metric === 'tech_readiness') {
    const tech = game?.combineTechnology;
    if (!tech) return clamp(stats.combine);
    return clamp((tech.scanEfficiency + tech.containmentGrid + tech.overwatchIntegration + tech.propagandaBandwidth + tech.novaIntegration - tech.maintenanceDebt * 0.45 - tech.techSuspicion * 0.25) / 4.2);
  }
  if (metric === 'vortigaunt_control') {
    const vort = game?.vortigaunts;
    if (!vort) return clamp(100 - stats.rebel);
    return clamp((100 - vort.resistanceSympathy + 100 - vort.escapeRisk + vort.quarantineAid + 100 - vort.novaAbuseIndex) / 4);
  }
  if (metric === 'xen_research_control') {
    const research = game?.xenResearch;
    if (!research) return clamp(100 - stats.xen);
    return clamp((research.researchProgressIndex + research.containmentIntegrity + research.blackSiteSecrecy + 100 - research.labIncidentRisk + research.industrialYield * 0.35) / 4.35);
  }
  if (metric === 'catastrophe_prevention') {
    const catastrophe = game?.xenCatastrophes;
    if (!catastrophe) return clamp(100 - stats.xen);
    return clamp(100 - (catastrophe.totalCatastropheRisk * 0.35 + catastrophe.citywideRisk * 0.25 + catastrophe.ravenholmProbability * 0.25 + catastrophe.containmentDebt * 0.15));
  }
  if (metric === 'civil_registry_control') {
    const registry = game?.citizenRegistry;
    if (!registry) return clamp(stats.info);
    return clamp((registry.averageLoyalty + registry.averageFear * 0.1 + (100 - registry.averageRisk) + (100 - registry.falseDenunciationIndex)) / 3.1);
  }
  if (metric === 'campaign_pressure') return game?.campaign?.pressure ?? 0;
  if (metric === 'audit_control') return clamp(100 - Math.max(game?.auditHeat ?? 0, stats.suspicion));
  if (metric === 'ration_reserve') {
    const ration = game?.rationEconomy;
    if (!ration) return clamp(stats.rations / 35);
    return clamp((ration.autonomyDays * 10 + Math.max(0, ration.reserves / Math.max(1, ration.dailyNeed)) * 35) / 2);
  }
  if (metric === 'population_compliance') return game?.population?.complianceIndex ?? stats.loyalty;
  if (metric === 'lambda_network_disruption') {
    const network = game?.resistanceNetwork;
    if (!network) return clamp(100 - stats.rebel);
    return clamp((100 - network.networkCohesion + 100 - network.simultaneousOpsRisk + network.discoveredCells * 10 + network.compromisedCells * 8 + (100 - network.tunnelMobility) * 0.35) / 3.15);
  }
  if (metric === 'resistance_fragmentation') return game?.resistanceFactions?.fragmentationIndex ?? 45;
  return 0;
}

function conditionMet(mode: 'above' | 'below', value: number, target: number) {
  return mode === 'above' ? value >= target : value <= target;
}

function progressFor(def: CampaignMissionObjectiveDefinition, value: number) {
  if (def.kind === 'failure') {
    if (def.mode === 'above') return clamp((value / Math.max(1, def.target)) * 100);
    return clamp(((def.target - value) / Math.max(1, def.target)) * 100 + 100);
  }
  if (def.mode === 'above') return clamp((value / Math.max(1, def.target)) * 100);
  if (value <= def.target) return 100;
  return clamp(100 - ((value - def.target) / Math.max(1, 100 - def.target)) * 100);
}

function buildRuntime(def: CampaignMissionObjectiveDefinition, stats: Stats, sectors: Sector[], game: Partial<GameState> | undefined, previous?: CampaignMissionObjectiveRuntime): CampaignMissionObjectiveRuntime {
  const value = metricValue(def.metric, stats, sectors, game);
  const revealValue = def.revealWhen ? metricValue(def.revealWhen.metric, stats, sectors, game) : 100;
  const discovered = previous?.discovered || def.kind !== 'hidden' || !def.revealWhen || conditionMet(def.revealWhen.mode, revealValue, def.revealWhen.target);
  const day = game?.campaign?.dayInCampaign ?? game?.day ?? 1;

  if (!discovered) {
    return {
      id: def.id,
      kind: def.kind,
      title: 'Objectif classifié',
      description: 'Dossier non révélé. COAN attend une condition de contexte pour lever le scellé.',
      metric: def.metric,
      mode: def.mode,
      target: def.target,
      deadlineDay: def.deadlineDay,
      discovered: false,
      status: 'locked',
      value,
      progress: 0,
      detail: 'SCELLÉ — condition de révélation non satisfaite.',
      loreTags: ['CLASSIFIED'],
    };
  }

  if (previous?.status === 'completed' || previous?.status === 'failed' || previous?.status === 'expired') {
    return { ...previous, value, progress: progressFor(def, value) };
  }

  const reached = conditionMet(def.mode, value, def.target);
  let status: CampaignMissionObjectiveRuntime['status'] = 'active';
  let completedDay = previous?.completedDay;
  let failedDay = previous?.failedDay;
  if (def.kind === 'failure') {
    if (reached) {
      status = 'failed';
      failedDay = day;
    }
  } else if (reached) {
    status = 'completed';
    completedDay = day;
  } else if (def.deadlineDay && day > def.deadlineDay) {
    status = 'expired';
    failedDay = day;
  }

  const comparator = def.mode === 'above' ? '≥' : '≤';
  const deadline = def.deadlineDay ? ` / échéance J${def.deadlineDay}` : '';
  return {
    id: def.id,
    kind: def.kind,
    title: def.title,
    description: def.description,
    metric: def.metric,
    mode: def.mode,
    target: def.target,
    deadlineDay: def.deadlineDay,
    discovered,
    status,
    value,
    progress: progressFor(def, value),
    detail: `${Math.round(value)} ${comparator} ${def.target}${deadline}`,
    completedDay,
    failedDay,
    loreTags: def.loreTags,
  };
}

function summarize(state: Omit<CampaignMissionState, 'primaryCount' | 'secondaryCount' | 'hiddenCount' | 'revealedHiddenCount' | 'completedCount' | 'failedCount' | 'failureRisk'>): CampaignMissionState {
  const objectives = state.objectives;
  const primaryCount = objectives.filter((objective) => objective.kind === 'primary').length;
  const secondaryCount = objectives.filter((objective) => objective.kind === 'secondary').length;
  const hiddenCount = objectives.filter((objective) => objective.kind === 'hidden').length;
  const revealedHiddenCount = objectives.filter((objective) => objective.kind === 'hidden' && objective.discovered).length;
  const completedCount = objectives.filter((objective) => objective.status === 'completed').length;
  const failedCount = objectives.filter((objective) => objective.status === 'failed' || objective.status === 'expired').length;
  const activePrimaryLow = objectives.filter((objective) => objective.kind === 'primary' && objective.status === 'active' && objective.progress < 45).length;
  const activeFailure = objectives.filter((objective) => objective.kind === 'failure' && objective.status === 'active' && objective.progress > 60).length;
  const failureRisk = clamp(failedCount * 18 + activePrimaryLow * 12 + activeFailure * 14 + (100 - state.mandateScore) * 0.15);
  return { ...state, primaryCount, secondaryCount, hiddenCount, revealedHiddenCount, completedCount, failedCount, failureRisk };
}

export function createInitialCampaignMissionState({ campaignId, stats, sectors, game }: { campaignId: CampaignId; stats: Stats; sectors: Sector[]; game?: Partial<GameState> }): CampaignMissionState {
  const definitions = objectiveDefinitionsFor(campaignId);
  const context = { ...game, campaign: game?.campaign ?? { dayInCampaign: 1 } } as Partial<GameState>;
  const objectives = definitions.map((def) => buildRuntime(def, stats, sectors, context));
  return summarize({
    activeCampaignId: campaignId,
    objectives,
    mandateScore: 50,
    lastEvaluationDay: 1,
    log: [`Objectifs multiples initialisés : ${objectives.filter((objective) => objective.discovered).length}/${objectives.length} dossiers visibles.`],
  });
}

export function migrateCampaignMissionState(game: Partial<GameState>): CampaignMissionState {
  const activeCampaignId = game.campaign?.activeCampaignId ?? game.campaignMission?.activeCampaignId ?? 'custom_city_administration';
  const stats = game.stats ?? fallbackStats;
  const sectors = game.sectors ?? [];
  const fresh = createInitialCampaignMissionState({ campaignId: activeCampaignId, stats, sectors, game });
  if (!game.campaignMission) return fresh;
  const known = new Map(game.campaignMission.objectives?.map((objective) => [objective.id, objective]) ?? []);
  const objectives = objectiveDefinitionsFor(activeCampaignId).map((def) => buildRuntime(def, stats, sectors, game, known.get(def.id)));
  return summarize({
    ...fresh,
    ...game.campaignMission,
    activeCampaignId,
    objectives,
    log: game.campaignMission.log ?? fresh.log,
  });
}

export function simulateCampaignMissionDay({ game, stats, sectors }: { game: GameState; stats: Stats; sectors: Sector[] }) {
  const activeCampaignId = game.campaign.activeCampaignId;
  const previous = game.campaignMission?.activeCampaignId === activeCampaignId ? game.campaignMission : createInitialCampaignMissionState({ campaignId: activeCampaignId, stats, sectors, game });
  const previousById = new Map(previous.objectives.map((objective) => [objective.id, objective]));
  let nextStats = stats;
  let mandateDelta = 0;
  const lines: string[] = [];
  const objectives = objectiveDefinitionsFor(activeCampaignId).map((def) => {
    const previousRuntime = previousById.get(def.id);
    const runtime = buildRuntime(def, nextStats, sectors, game, previousRuntime);
    const oldStatus = previousRuntime?.status;
    if (runtime.discovered && previousRuntime && !previousRuntime.discovered) {
      lines.push(`Objectif caché révélé : ${runtime.title}.`);
    }
    if (runtime.status !== oldStatus) {
      if (runtime.status === 'completed' && def.reward) {
        nextStats = addStat(nextStats, def.reward.stats);
        mandateDelta += def.reward.mandateScore ?? 0;
        lines.push(`OBJECTIF RÉUSSI — ${runtime.title} : ${def.reward.logLine}`);
      }
      if ((runtime.status === 'failed' || runtime.status === 'expired') && def.penalty) {
        nextStats = addStat(nextStats, def.penalty.stats);
        mandateDelta += def.penalty.mandateScore ?? 0;
        lines.push(`OBJECTIF COMPROMIS — ${runtime.title} : ${def.penalty.logLine}`);
      }
    }
    return runtime;
  });

  const visible = objectives.filter((objective) => objective.discovered);
  const activeBad = visible.filter((objective) => objective.status === 'active' && ((objective.kind === 'failure' && objective.progress > 70) || (objective.kind !== 'failure' && objective.progress < 35)));
  if (activeBad[0]) lines.push(`Objectif sous tension : ${activeBad[0].title} / ${activeBad[0].detail}.`);

  const next = summarize({
    activeCampaignId,
    objectives,
    mandateScore: clamp((previous.mandateScore ?? 50) + mandateDelta + (activeBad.length ? -2 : 1)),
    lastEvaluationDay: game.campaign.dayInCampaign,
    log: [...lines, ...previous.log].slice(0, 36),
  });

  if (!lines.length) lines.push(`Objectifs multiples : ${next.completedCount}/${visible.length} visibles complétés / risque échec ${next.failureRisk}%.`);
  else lines.push(`Objectifs multiples : ${next.completedCount}/${visible.length} visibles complétés / mandat ${next.mandateScore}% / risque ${next.failureRisk}%.`);

  return { campaignMission: next, stats: nextStats, lines };
}
