import type { FinalVerdictAxis, FinalVerdictAxisId, FinalVerdictState, GameState, Sector, Stats } from '../types/game';
import { finalEndingDefinitions, finalEndingOrder } from '../data/finalVerdicts';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const avg = (...values: number[]) => clamp(values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length));

function grade(score: number): FinalVerdictAxis['grade'] {
  if (score >= 78) return 'stable';
  if (score >= 52) return 'strained';
  if (score >= 24) return 'critical';
  return 'lost';
}

function axis(id: FinalVerdictAxisId, label: string, score: number, summary: string, detail: string, loreTags: string[]): FinalVerdictAxis {
  return { id, label, score: clamp(score), grade: grade(score), summary, detail, loreTags };
}

function sectorIntegrity(sectors: Sector[]) {
  if (!sectors.length) return 50;
  const avgInfrastructure = sectors.reduce((sum, sector) => sum + sector.infrastructure, 0) / sectors.length;
  const lostPenalty = sectors.filter((sector) => ['Scellé', 'Bombardé', 'Abandonné', 'Contrôle rebelle', 'Infesté'].includes(sector.status)).length * 7;
  return clamp(avgInfrastructure - lostPenalty);
}

function getUnlockedEndingIds(game: GameState, stats: Stats, sectors: Sector[]) {
  const ids = new Set<string>();
  if (stats.rebel >= 80 || game.resistanceNetwork.openUprisingCells > 0 || game.resistanceNetwork.simultaneousOpsRisk > 76) ids.add('lambda_liberation');
  if (stats.xen >= 70 || game.quarantineZones.lostCount > 0 || game.xenCatastrophes.citywideRisk > 72) ids.add('total_quarantine');
  if (game.quarantineZones.ravenholmLikeCount > 0 || game.xenCatastrophes.ravenholmProbability > 66) ids.add('ravenholm_memory');
  if (stats.suspicion >= 75 || stats.citadel < 30 || game.auditHeat > 78) ids.add('advisor_replacement');
  if (stats.production < 25 || stats.rations < 300 || game.rationEconomy.hungerIndex > 75) ids.add('industrial_collapse');
  if (stats.fear > 82 && stats.loyalty < 18 && stats.rebel < 28) ids.add('sterile_terror');
  if (stats.stability > 76 && stats.production > 70 && stats.rebel < 25 && stats.xen < 25) ids.add('model_city');
  if (game.profile === 'sympathizer' && stats.loyalty > 50 && game.auditHeat < 72 && stats.civilianLosses < 1400) ids.add('hidden_humanity');
  if (game.novaProspekt.instability > 72 || game.novaProspekt.escaped > 25 || game.resistanceFactions.novaMartyrdom > 72) ids.add('nova_exposure');
  if (game.xenResearch.weaponizationIndex > 70 && game.xenResearch.bioweaponReadiness > 55) ids.add('biological_doctrine');
  if (game.citadelDirectiveTree.advisorAttention > 70 || game.majorStoryEvents.advisorNarrativePressure > 70) ids.add('citadel_direct_rule');
  if (game.campaign.dayInCampaign >= game.campaign.durationDays || game.day >= game.campaign.durationDays) ids.add('campaign_mandate_completed');
  if (sectorIntegrity(sectors) < 25) ids.add('industrial_collapse');
  return finalEndingOrder.filter((id) => ids.has(id));
}

function pickEndingId(game: GameState, stats: Stats, sectors: Sector[], forcedEndingId?: string | null) {
  const unlocked = getUnlockedEndingIds(game, stats, sectors);
  const legacyMap: Record<string, string> = {
    uprising: 'lambda_liberation',
    xen: 'total_quarantine',
    replaced: 'advisor_replacement',
    collapse: 'industrial_collapse',
    terror: 'sterile_terror',
    model: 'model_city',
    humanity: 'hidden_humanity',
  };
  if (forcedEndingId) return legacyMap[forcedEndingId] ?? forcedEndingId;

  // A warning threshold unlocks a possible ending, but must not end a fresh campaign.
  if (game.day >= 8 && game.quarantineZones.ravenholmLikeCount >= 2 && game.xenCatastrophes.citywideRisk > 85) return 'ravenholm_memory';
  if (game.day >= 8 && game.novaProspekt.instability > 90 && game.novaProspekt.escaped > 25) return 'nova_exposure';

  if (game.day >= 30 && unlocked.includes('hidden_humanity')) return 'hidden_humanity';
  if (game.day >= 35 && unlocked.includes('model_city')) return 'model_city';
  if (game.day >= 30 && unlocked.includes('sterile_terror')) return 'sterile_terror';
  if (game.day >= game.campaign.durationDays && unlocked.includes('campaign_mandate_completed')) return 'campaign_mandate_completed';
  if (game.day >= 34 && unlocked.includes('biological_doctrine')) return 'biological_doctrine';
  if (game.day >= 34 && unlocked.includes('citadel_direct_rule')) return 'citadel_direct_rule';
  return null;
}

export function buildFinalVerdict(game: GameState, stats: Stats, sectors: Sector[], forcedEndingId?: string | null): FinalVerdictState | null {
  const endingId = pickEndingId(game, stats, sectors, forcedEndingId);
  if (!endingId) return null;
  const definition = finalEndingDefinitions[endingId] ?? finalEndingDefinitions.campaign_mandate_completed;
  const integrity = sectorIntegrity(sectors);
  const civilianSurvival = clamp(100 - Math.round(stats.civilianLosses / 45) - game.quarantineZones.trappedCivilianEstimate / 280 - game.novaProspekt.totalTransferred / 120);
  const combineControl = avg(stats.stability, stats.combine, 100 - stats.rebel, stats.info, integrity);
  const xenLegacy = avg(stats.xen, game.xenMutation.outbreakRisk, game.quarantineZones.biologicalExclusionIndex, game.xenCatastrophes.citywideRisk, game.xenResearch.labIncidentRisk);
  const lambdaLegacy = avg(stats.rebel, game.resistanceNetwork.networkCohesion, game.resistanceNetwork.armedCapacity, game.resistanceFactions.armedMobilization, game.population.lambdaSupportIndex);
  const reportIntegrity = clamp(100 - game.auditHeat - (game.reports[0]?.falsificationScore ?? 0) * 0.4 - (game.reports[0]?.auditDiscovered ? 35 : 0));
  const novaIntegrity = clamp(avg(game.novaProspekt.security, game.novaProspekt.secrecy, 100 - game.novaProspekt.instability, 100 - game.novaProspekt.xenBreachRisk));
  const averageVortigauntCondition = game.vortigaunts.groups.length
    ? clamp(game.vortigaunts.groups.reduce((sum, group) => sum + group.condition, 0) / game.vortigaunts.groups.length)
    : 50;
  const vortigauntOutcome = clamp(avg(averageVortigauntCondition, 100 - game.vortigaunts.novaAbuseIndex, game.vortigaunts.xenInsight, 100 - game.vortigaunts.advisorInterest));
  const humanCostIndex = clamp(100 - civilianSurvival + game.civilProtection.abuseReportIndex * 0.4 + game.novaProspekt.humaneIndex * -0.2 + game.xenResearch.ethicalDebt * 0.35);
  const mandateScore = clamp(avg(game.campaignMission.mandateScore, 100 - game.campaignMission.failureRisk));
  const finalScore = clamp(avg(combineControl, 100 - xenLegacy, 100 - lambdaLegacy, reportIntegrity, mandateScore, civilianSurvival));

  const axes: FinalVerdictAxis[] = [
    axis('city_control', 'Contrôle de City', combineControl, combineControl > 70 ? 'Le maillage Combine reste opérationnel.' : combineControl > 40 ? 'Le contrôle existe encore, mais par fragments.' : 'City ne répond plus comme un territoire administrable.', `Stabilité ${stats.stability}%, présence Combine ${stats.combine}%, intégrité secteurs ${integrity}%.`, ['Citadel', 'Civil Authority', 'sectors']),
    axis('civilian_survival', 'Survie civile', civilianSurvival, civilianSurvival > 70 ? 'La population reste exploitable et relativement intacte.' : civilianSurvival > 40 ? 'La population survit, mais avec disparitions, faim et traumatismes.' : 'Le coût civil dépasse la valeur administrative officielle.', `Pertes civiles ${stats.civilianLosses}, transferts Nova ${game.novaProspekt.totalTransferred}, civils piégés ${game.quarantineZones.trappedCivilianEstimate}.`, ['citizens', 'rations', 'Nova Prospekt']),
    axis('resistance_status', 'Statut Lambda', 100 - lambdaLegacy, lambdaLegacy < 30 ? 'La Résistance reste marginale.' : lambdaLegacy < 65 ? 'Les réseaux Lambda survivent sous forme de cellules.' : 'Lambda possède une mémoire, des armes et des routes.', `Cohésion ${game.resistanceNetwork.networkCohesion}%, mobilisation ${game.resistanceFactions.armedMobilization}%, soutien population ${game.population.lambdaSupportIndex}%.`, ['Lambda', 'canals', 'Resistance']),
    axis('xen_status', 'Héritage Xen', 100 - xenLegacy, xenLegacy < 30 ? 'Les vecteurs Xen sont contenus.' : xenLegacy < 65 ? 'La biosphère Xen reste une plaie active.' : 'Xen a modifié la géographie de City.', `Xen global ${stats.xen}%, mutations ${game.xenMutation.outbreakRisk}%, catastrophes ${game.xenCatastrophes.citywideRisk}%.`, ['Xen', 'Quarantine', 'Headcrabs']),
    axis('nova_prospekt', 'Nova Prospekt', novaIntegrity, novaIntegrity > 70 ? 'Les manifestes restent cohérents.' : novaIntegrity > 40 ? 'Nova fonctionne, mais fuit dans la mémoire sociale.' : 'Nova Prospekt devient un symbole impossible à enterrer.', `Sécurité ${game.novaProspekt.security}%, secret ${game.novaProspekt.secrecy}%, instabilité ${game.novaProspekt.instability}%, évadés ${game.novaProspekt.escaped}.`, ['Nova Prospekt', 'Razor Train', 'Biotics']),
    axis('vortigaunts', 'Vortigaunts / Biotics', vortigauntOutcome, vortigauntOutcome > 70 ? 'Les Biotics restent contenus sans rupture majeure.' : vortigauntOutcome > 40 ? 'La Vortessence reste ambiguë et politiquement risquée.' : 'Le traitement des Vortigaunts a renforcé l’ennemi ou les catastrophes Xen.', `Captifs ${game.vortigaunts.totalCaptive}, libres ${game.vortigaunts.totalFree}, cohérence ${game.vortigaunts.vortessenceCoherence}%, abus Nova ${game.vortigaunts.novaAbuseIndex}%.`, ['Vortigaunts', 'Biotics', 'Vortessence']),
    axis('reports', 'Intégrité des rapports', reportIntegrity, reportIntegrity > 70 ? 'La façade administrative reste crédible.' : reportIntegrity > 40 ? 'Les chiffres tiennent, mais sous risque d’audit.' : 'Les mensonges sont devenus plus visibles que les résultats.', `Audit heat ${game.auditHeat}%, politique ${game.reportPolicy}, dernier score falsification ${game.reports[0]?.falsificationScore ?? 0}%.`, ['COAN', 'Advisor audit', 'reports']),
    axis('campaign_legacy', 'Mandat de campagne', mandateScore, mandateScore > 70 ? 'Le mandat long est défendable.' : mandateScore > 40 ? 'Le mandat est partiellement rempli.' : 'La campagne devient un dossier d’échec.', `Score mandat ${game.campaignMission.mandateScore}%, objectifs complétés ${game.campaignMission.completedCount}, échecs ${game.campaignMission.failedCount}.`, ['campaign', 'objectives', 'mandate']),
  ];

  const advisorJudgement = stats.suspicion > 82 || game.auditHeat > 82
    ? 'Advisor judgement : supervision directe recommandée. La marge humaine du mandat est considérée comme une anomalie.'
    : stats.citadel > 70 && reportIntegrity > 55
      ? 'Advisor judgement : dossier acceptable. La Citadelle conserve l’administrateur comme relais utile.'
      : 'Advisor judgement : dossier instable. La continuité dépend d’une prochaine inspection.';

  const hiddenTruth = definition.hiddenConclusion
    + (game.profile === 'sympathizer' ? ' Les lignes humanitaires du dossier suggèrent un double jeu volontaire.' : '')
    + (game.reports[0]?.auditDiscovered ? ' Une falsification a déjà été découverte : la version publique ne survivra pas à une revue complète.' : '');

  const archiveLines = [
    `ARCHIVE FINALE — CITY ${game.city} / JOUR ${String(game.day).padStart(3, '0')}`,
    `Verdict : ${definition.title}`,
    `Score final COAN : ${finalScore}% / Mandat : ${mandateScore}% / Intégrité rapport : ${reportIntegrity}%`,
    `Contrôle Combine : ${combineControl}% / Héritage Lambda : ${lambdaLegacy}% / Héritage Xen : ${xenLegacy}%`,
    `Coût humain : ${humanCostIndex}% / Pertes civiles : ${stats.civilianLosses} / Transferts Nova : ${game.novaProspekt.totalTransferred}`,
    advisorJudgement,
  ];

  const recommendations = [
    lambdaLegacy > 55 ? 'Sceller les canaux, couper les radios Lambda et fragmenter les factions internes restantes.' : 'Maintenir une surveillance discrète des routes Lambda plutôt qu’une purge spectaculaire.',
    xenLegacy > 55 ? 'Priorité : quarantaine lourde, bioscanners, Biotics encadrés et suspension des programmes R&D les plus risqués.' : 'Conserver un protocole Xen de veille : les faibles signaux organiques ne doivent pas redevenir un nid.',
    reportIntegrity < 45 ? 'Geler les falsifications et préparer un récit de couverture cohérent avant toute inspection Advisor.' : 'Préserver la cohérence des archives : la façade administrative reste un actif stratégique.',
    civilianSurvival < 45 ? 'Limiter les disparitions visibles : les familles de victimes sont un multiplicateur Lambda.' : 'Exploiter la survie civile comme preuve de “bienveillance” BreenCast.',
  ];

  return {
    id: `${endingId}-${game.day}-${game.city}`,
    day: game.day,
    city: game.city,
    endingId,
    title: definition.title,
    subtitle: definition.subtitle,
    classification: definition.classification,
    tone: definition.tone,
    finalScore,
    mandateScore,
    humanCostIndex,
    combineControlIndex: combineControl,
    xenLegacyIndex: xenLegacy,
    lambdaLegacyIndex: lambdaLegacy,
    reportIntegrity,
    publicVerdict: definition.publicConclusion,
    hiddenTruth,
    advisorJudgement,
    triggeredBy: definition.loreFrame,
    axes,
    archiveLines,
    recommendations,
    unlockedEndingIds: getUnlockedEndingIds(game, stats, sectors),
  };
}
