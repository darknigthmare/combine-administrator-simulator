import type { GameState, GameplayBalanceMetric, GameplayBalanceReport, GameplayBalanceMetricDefinition, GameplayBalanceBand, LongRunProjectionPoint } from '../types/game';
import { gameplayBalanceBands, gameplayBalanceMetricDefinitions, gameplayBalanceRunbook, gameplayBalanceVersion, longRunPlaytestScenarios } from '../data/gameplayBalance';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const avg = (values: number[]) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
const safe = (value: unknown, fallback = 0) => typeof value === 'number' && Number.isFinite(value) ? value : fallback;

function resolveBand(value: number, def: GameplayBalanceMetricDefinition): GameplayBalanceBand {
  if (def.dangerHigh) {
    if (value < def.targetLow * 0.6) return 'underpowered';
    if (value <= def.targetHigh) return 'stable';
    if (value <= 82) return 'tense';
    return 'runaway';
  }
  if (value < def.targetLow) return 'underpowered';
  if (value <= def.targetHigh) return 'stable';
  if (value <= 92) return 'tense';
  return 'runaway';
}

function metricDetail(metricId: GameplayBalanceMetricDefinition['id'], game: GameState): { value: number; drivers: string[]; recommendation: string } {
  const s = game.stats;
  const lambdaNetwork = game.resistanceNetwork;
  const lambdaFactions = game.resistanceFactions;
  const xenEco = game.xenEcosystem;
  const xenMutation = game.xenMutation;
  const quarantine = game.quarantineZones;
  const catastrophes = game.xenCatastrophes;
  const nova = game.novaProspekt;
  const ration = game.rationEconomy;
  const population = game.population;
  const cp = game.civilProtection;
  const tech = game.combineTechnology;
  const directives = game.citadelDirectiveTree;
  const history = game.decisionHistory;

  switch (metricId) {
    case 'lambda_pressure': {
      const value = clamp(avg([
        s.rebel,
        safe(lambdaNetwork?.networkCohesion),
        safe(lambdaNetwork?.simultaneousOpsRisk),
        safe(lambdaFactions?.dominantFactionId ? lambdaFactions.factions.find((f) => f.id === lambdaFactions.dominantFactionId)?.influence : 0),
        safe(avg(lambdaFactions?.factions.map((f) => f.publicSympathy) ?? [])),
        100 - safe(avg(lambdaNetwork?.cells.map((c) => c.secrecy) ?? []), 50),
      ]));
      return {
        value,
        drivers: [
          `Activité rebelle globale ${s.rebel}%`,
          `Risque opérations simultanées ${safe(lambdaNetwork?.simultaneousOpsRisk)}%`,
          `Sympathie publique factions ${safe(avg(lambdaFactions?.factions.map((f) => f.publicSympathy) ?? []))}%`,
        ],
        recommendation: value > 75 ? 'Ajouter une contre-mesure lisible : sceller route, infiltrer faction, réduire faim ou brouiller radio. Éviter le spam Strider.' : value < 18 ? 'Renforcer radios pirates, canaux ou mémoire Nova pour que Lambda existe avant l’insurrection.' : 'Pression Lambda correcte : garder un mélange sabotage, tunnels, cellules et choix informateurs.',
      };
    }
    case 'xen_pressure': {
      const value = clamp(avg([
        s.xen,
        safe(xenEco?.totalBiomass),
        safe(xenMutation?.outbreakRisk),
        safe(quarantine?.biologicalExclusionIndex),
        safe(catastrophes?.totalCatastropheRisk),
      ]));
      return {
        value,
        drivers: [
          `Contamination globale ${s.xen}%`,
          `Pression biosphère ${safe(xenEco?.totalBiomass)}%`,
          `Risque mutation ${safe(xenMutation?.outbreakRisk)}%`,
          `Catastrophes rares ${safe(catastrophes?.totalCatastropheRisk)}%`,
        ],
        recommendation: value > 78 ? 'Vérifier que le joueur dispose d’au moins deux réponses : quarantine team, Vortigaunt encadré, purge thermique, abandon de secteur.' : value < 16 ? 'Augmenter spores, nids ou hôpital contaminé : Xen doit être une écologie persistante.' : 'Xen est dans une zone viable : maintenir propagation par secteurs connectés et conséquences biologiques.',
      };
    }
    case 'citadel_pressure': {
      const value = clamp(avg([
        s.suspicion,
        game.auditHeat,
        100 - s.citadel,
        safe(directives?.advisorAttention),
        safe(tech?.techSuspicion),
        game.finalVerdict ? 80 : 30,
      ]));
      return {
        value,
        drivers: [`Suspicion ${s.suspicion}%`, `Audit heat ${game.auditHeat}%`, `Exposition Advisor ${safe(directives?.advisorAttention)}%`, `Attention techno ${safe(tech?.techSuspicion)}%`],
        recommendation: value > 80 ? 'Les audits risquent de remplacer le joueur : réduire falsification automatique ou ajouter délais de couverture.' : value < 18 ? 'La Citadelle doit mettre plus de pression : directives plus courtes, inspection Advisor, pénalité production.' : 'Pression Citadel lisible : garder le rapport réel/transmis au centre du risque.',
      };
    }
    case 'civil_stress': {
      const value = clamp(avg([
        100 - s.loyalty,
        s.fear,
        s.fatigue,
        safe(ration?.hungerIndex),
        safe(population?.total ? population.vulnerable / Math.max(1, population.total) * 100 : 0),
        safe(cp?.brutalityIndex),
      ]));
      return {
        value,
        drivers: [`Loyauté basse ${100 - s.loyalty}%`, `Peur ${s.fear}%`, `Fatigue ${s.fatigue}%`, `Faim moyenne ${safe(ration?.hungerIndex)}%`, `Brutalité CP ${safe(cp?.brutalityIndex)}%`],
        recommendation: value > 82 ? 'Stress civil trop explosif : prévoir propagande crédible, bonus de ration ou relâchement CP comme soupapes.' : value < 20 ? 'Les citoyens semblent trop passifs : augmenter fatigue, rationnement, familles de disparus ou surveillance CP.' : 'Stress civil exploitable : il alimente bien le marché noir, les informateurs et Lambda.',
      };
    }
    case 'economy_viability': {
      const autonomy = safe(ration?.autonomyDays, Math.round(s.rations / Math.max(1, safe(ration?.dailyNeed, 1000))));
      const hungerPenalty = safe(ration?.hungerIndex) * 0.35;
      const value = clamp(avg([s.production, Math.min(100, autonomy * 8), 100 - hungerPenalty, s.rations > 0 ? 70 : 0]));
      return {
        value,
        drivers: [`Production ${s.production}%`, `Autonomie ration ${autonomy} jours`, `Stock ${s.rations}`, `Faim ${safe(ration?.hungerIndex)}%`],
        recommendation: value < 35 ? 'Économie trop morte : augmenter production de base ou réduire consommation pour laisser des choix.' : value > 90 ? 'Économie trop confortable : réduire stocks de départ ou augmenter pénuries ciblées.' : 'Économie lisible : rations et production peuvent devenir des armes politiques.',
      };
    }
    case 'control_apparatus': {
      const value = clamp(avg([
        s.combine,
        s.info,
        safe(cp?.disciplineIndex),
        safe(tech?.scanEfficiency),
        safe(tech?.overwatchIntegration),
        safe(game.informantNetwork?.totalInformants / Math.max(1, game.population.total) * 1000),
      ]));
      return {
        value,
        drivers: [`Présence Combine ${s.combine}%`, `Contrôle info ${s.info}%`, `Discipline CP ${safe(cp?.disciplineIndex)}%`, `Scanners ${safe(tech?.scanEfficiency)}%`, `Couverture informateurs ${safe(game.informantNetwork?.totalInformants / Math.max(1, game.population.total) * 1000)}%`],
        recommendation: value < 30 ? 'Appareil de contrôle trop faible : augmenter scanners, CP ou informateurs pour garder le fantasme Combine.' : value > 88 ? 'Contrôle trop parfait : injecter corruption, faux rapports ou backlash Lambda.' : 'Contrôle Combine crédible : maintenir coûts sociaux sur chaque escalade.',
      };
    }
    case 'moral_debt': {
      const value = clamp(avg([
        Math.min(100, s.civilianLosses / 45),
        safe((nova?.totalTransferred ?? 0) / 12 + (nova?.escaped ?? 0) * 6 + (100 - (nova?.humaneIndex ?? 50)) / 2),
        safe((100 - (nova?.secrecy ?? 50)) + (nova?.escaped ?? 0) * 4),
        safe(quarantine?.ravenholmMemoryIndex),
        safe(game.xenResearch?.ethicalDebt),
        safe(history?.hiddenConsequenceCount) * 5,
      ]));
      return {
        value,
        drivers: [`Pertes civiles ${s.civilianLosses}`, `Dette Nova ${safe((nova?.totalTransferred ?? 0) / 12 + (nova?.escaped ?? 0) * 6 + (100 - (nova?.humaneIndex ?? 50)) / 2)}%`, `Mémoire Ravenholm ${safe(quarantine?.ravenholmMemoryIndex)}%`, `Conséquences cachées ${safe(history?.hiddenConsequenceCount)}`],
        recommendation: value > 78 ? 'Dette morale très haute : préparer fins noires, fuites vidéo ou jugement Advisor. Ne pas la cacher dans l’UI.' : value < 12 ? 'Trop peu de coût humain : ajouter disparitions, civils piégés ou décisions irréversibles.' : 'Dette morale efficace : elle donne du poids aux victoires administratives.',
      };
    }
    case 'runaway_risk': {
      const value = clamp(avg([
        s.rebel,
        s.xen,
        s.fatigue,
        100 - s.loyalty,
        game.auditHeat,
        safe(catastrophes?.totalCatastropheRisk),
        safe(nova?.instability),
        safe(ration?.hungerIndex),
      ]));
      return {
        value,
        drivers: [`Lambda ${s.rebel}%`, `Xen ${s.xen}%`, `Fatigue ${s.fatigue}%`, `Audit ${game.auditHeat}%`, `Nova instabilité ${safe(nova?.instability)}%`],
        recommendation: value > 70 ? 'Spirale probable : vérifier qu’une partie n’atteint pas une fin automatique trop tôt sauf Uprising/catastrophe.' : value < 20 ? 'Partie trop stable : augmenter une pression lente quotidienne selon campagne/difficulté.' : 'Risque de spirale correct : le joueur peut encore arbitrer.',
      };
    }
  }
}

export function buildGameplayBalanceReport(game: GameState): GameplayBalanceReport {
  const metrics: GameplayBalanceMetric[] = gameplayBalanceMetricDefinitions.map((def) => {
    const detail = metricDetail(def.id, game);
    const band = resolveBand(detail.value, def);
    return {
      id: def.id,
      label: def.label,
      value: detail.value,
      targetLow: def.targetLow,
      targetHigh: def.targetHigh,
      band,
      bandLabel: gameplayBalanceBands[band].label,
      description: def.description,
      loreIntent: def.loreIntent,
      drivers: detail.drivers,
      recommendation: detail.recommendation,
    };
  });

  const runawayCount = metrics.filter((metric) => metric.band === 'runaway').length;
  const tenseCount = metrics.filter((metric) => metric.band === 'tense').length;
  const underpoweredCount = metrics.filter((metric) => metric.band === 'underpowered').length;
  const stableCount = metrics.filter((metric) => metric.band === 'stable').length;
  const score = clamp(100 - runawayCount * 18 - tenseCount * 8 - underpoweredCount * 7 + stableCount * 2);
  const worst = [...metrics].sort((a, b) => {
    const weight = { runaway: 4, tense: 3, underpowered: 2, stable: 1 } as const;
    return weight[b.band] - weight[a.band] || b.value - a.value;
  })[0];

  const recommendations = metrics
    .filter((metric) => metric.band !== 'stable')
    .slice(0, 6)
    .map((metric) => `${metric.label} — ${metric.recommendation}`);

  if (!recommendations.length) {
    recommendations.push('La matrice est stable : lancer une simulation 30 jours et vérifier que les fins ne se déclenchent pas sans choix explicite.');
  }

  const projection = buildLongRunProjection(game);

  return {
    version: gameplayBalanceVersion,
    score,
    statusLabel: score >= 85 ? 'Équilibrage sain' : score >= 70 ? 'Surveillance conseillée' : score >= 50 ? 'Risque de spirale' : 'Rééquilibrage urgent',
    headline: worst ? `Point dominant : ${worst.label} / ${worst.bandLabel}.` : 'Matrice stable.',
    metrics,
    recommendations,
    projection,
    playtestScenarios: longRunPlaytestScenarios,
    runbook: gameplayBalanceRunbook,
    exportText: buildBalanceExport(game, metrics, score, recommendations, projection),
  };
}

function buildLongRunProjection(game: GameState): LongRunProjectionPoint[] {
  const lambdaStep = Math.max(0.2, game.difficultySettings.scalars.lambdaForce * 1.2 + game.campaign.pressure / 80 + game.stats.fatigue / 110);
  const xenStep = Math.max(0.2, game.difficultySettings.scalars.xenVelocity * 1.1 + safe(game.xenEcosystem?.totalBiomass) / 120 + safe(game.xenMutation?.outbreakRisk) / 160);
  const civilStep = Math.max(0.2, game.difficultySettings.scalars.citizenFragility * 0.9 + safe(game.rationEconomy?.hungerIndex) / 130 + safe(game.civilProtection?.brutalityIndex) / 150);
  const auditStep = Math.max(0.1, game.difficultySettings.scalars.reportAuditStrictness * 0.7 + game.auditHeat / 160 + safe((game.novaProspekt?.secrecy !== undefined ? 100 - game.novaProspekt.secrecy : 0) + (game.novaProspekt?.escaped ?? 0) * 4) / 180);
  const points: LongRunProjectionPoint[] = [];

  for (let index = 0; index <= 6; index += 1) {
    const dayOffset = index * 5;
    const lambda = clamp(game.stats.rebel + lambdaStep * dayOffset - game.stats.info / 80 * dayOffset);
    const xen = clamp(game.stats.xen + xenStep * dayOffset - game.stats.combine / 120 * dayOffset);
    const civil = clamp(avg([100 - game.stats.loyalty, game.stats.fear, game.stats.fatigue]) + civilStep * dayOffset);
    const audit = clamp(game.auditHeat + auditStep * dayOffset);
    const collapseRisk = clamp(avg([lambda, xen, civil, audit]));
    points.push({ day: game.day + dayOffset, lambda, xen, civil, audit, collapseRisk });
  }
  return points;
}

function buildBalanceExport(game: GameState, metrics: GameplayBalanceMetric[], score: number, recommendations: string[], projection: LongRunProjectionPoint[]): string {
  return [
    `COAN GAMEPLAY BALANCE REPORT — City ${game.city}`,
    `Version : ${gameplayBalanceVersion}`,
    `Jour : ${game.day}`,
    `Score : ${score}/100`,
    '',
    'METRICS',
    ...metrics.map((metric) => `- ${metric.label}: ${metric.value}% / ${metric.bandLabel} / cible ${metric.targetLow}-${metric.targetHigh}`),
    '',
    'RECOMMANDATIONS',
    ...recommendations.map((line) => `- ${line}`),
    '',
    'PROJECTION 30 JOURS',
    ...projection.map((point) => `J+${point.day - game.day}: Lambda ${point.lambda}% / Xen ${point.xen}% / Civil ${point.civil}% / Audit ${point.audit}% / Collapse ${point.collapseRisk}%`),
  ].join('\n');
}
