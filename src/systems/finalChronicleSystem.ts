import type { FinalChronicleChapter, FinalChronicleClassification, FinalChronicleSectorEntry, FinalChronicleState, FinalVerdictState, GameState, Report, Sector } from '../types/game';
import { chronicleTransitionLines, finalChronicleChapterDefinitions, finalChronicleChapterOrder, finalChronicleClassifications } from '../data/finalChronicle';
import { getCampaignPreset } from './campaignSystem';
import { getTimelinePreset } from './timelineSystem';
import { reportPolicyLabels } from './reportFalsification';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const pct = (value: number) => `${clamp(value)}%`;

function classifyChronicle(game: GameState, verdict: FinalVerdictState): FinalChronicleClassification {
  if (verdict.classification === 'catastrophe' || game.quarantineZones.ravenholmLikeCount > 0 || game.xenCatastrophes.ravenholmProbability > 70) return 'erased';
  if (game.auditHeat > 72 || game.novaProspekt.escaped > 20 || game.xenResearch.weaponizationIndex > 68 || verdict.reportIntegrity < 35) return 'blacksite';
  if (verdict.classification === 'secret' || game.profile === 'sympathizer') return 'restricted';
  return 'public';
}

function memoryForSector(sector: Sector): FinalChronicleSectorEntry['controllingMemory'] {
  if (sector.status === 'Bombardé' || sector.status === 'Abandonné' || sector.infrastructure < 20) return 'Destroyed';
  if (sector.status === 'Scellé' || sector.status === 'En quarantaine' || sector.status === 'Infesté') return 'Quarantine';
  if (sector.xen >= 66 || sector.status === 'Contaminé') return 'Xen';
  if (sector.rebel >= 66 || sector.status === 'Contrôle rebelle' || sector.status === 'Insurgé') return 'Lambda';
  if (sector.surveillance >= 70 && sector.rebel < 35 && sector.xen < 35) return 'Combine';
  return 'Contested';
}

function sectorNote(sector: Sector) {
  const fragments: string[] = [];
  if (sector.rebel > 60) fragments.push('réseau Lambda durable');
  if (sector.xen > 60) fragments.push('empreinte biologique Xen');
  if (sector.fear > 70) fragments.push('mémoire de terreur CP');
  if (sector.loyalty < 25) fragments.push('loyauté civile effondrée');
  if (sector.infrastructure < 35) fragments.push('infrastructure presque perdue');
  if (!fragments.length) fragments.push('secteur encore administrable');
  return fragments.join(' / ');
}

function buildSectorLedger(sectors: Sector[]): FinalChronicleSectorEntry[] {
  return [...sectors]
    .sort((a, b) => (b.rebel + b.xen + Math.max(0, 100 - b.infrastructure)) - (a.rebel + a.xen + Math.max(0, 100 - a.infrastructure)))
    .slice(0, 12)
    .map((sector) => ({
      sectorId: sector.id,
      name: sector.name,
      finalStatus: sector.status,
      controllingMemory: memoryForSector(sector),
      populationRemaining: sector.population,
      infrastructure: sector.infrastructure,
      rebel: sector.rebel,
      xen: sector.xen,
      note: sectorNote(sector),
    }));
}

function chapterClassification(base: FinalChronicleClassification, risk: number): FinalChronicleClassification {
  if (risk >= 82) return 'erased';
  if (risk >= 62) return 'blacksite';
  if (risk >= 34 || base !== 'public') return 'restricted';
  return 'public';
}

function chapter(id: FinalChronicleChapter['id'], base: FinalChronicleClassification, risk: number, publicText: string, restrictedText: string, evidence: string[], consequences: string[]): FinalChronicleChapter {
  const definition = finalChronicleChapterDefinitions[id];
  return {
    id,
    title: definition.title,
    subtitle: definition.subtitle,
    classification: chapterClassification(base, risk),
    publicText: `${definition.publicHeader} ${publicText}`,
    restrictedText: `${definition.restrictedHeader} ${restrictedText}`,
    evidence,
    consequences,
    loreTags: definition.loreTags,
  };
}

function strongestSectors(sectors: FinalChronicleSectorEntry[], memory: FinalChronicleSectorEntry['controllingMemory']) {
  return sectors.filter((sector) => sector.controllingMemory === memory).map((sector) => sector.name).slice(0, 4);
}

function topLines(lines: string[], max = 6) {
  return lines.filter(Boolean).slice(0, max);
}

function buildTimeline(game: GameState, report?: Report) {
  const lines: string[] = [];
  lines.push(`Jour 001 : prise de contrôle de City ${game.city} par le mandat ${getCampaignPreset(game.campaign.activeCampaignId).name}.`);
  game.campaign.log.slice(0, 4).forEach((line) => lines.push(`Campagne : ${line}`));
  game.majorStoryEvents.log.slice(0, 4).forEach((line) => lines.push(`Arc majeur : ${line}`));
  game.quarantineZones.log.slice(0, 3).forEach((line) => lines.push(`Quarantaine : ${line}`));
  game.novaProspekt.log.slice(0, 3).forEach((line) => lines.push(`Nova Prospekt : ${line}`));
  if (report) lines.push(`Jour ${String(report.day).padStart(3, '0')} : dernier rapport archivé avec ${report.falsificationScore ?? 0}% de falsification et ${report.auditRisk ?? 0}% de risque audit.`);
  return lines.slice(0, 18);
}

function buildExportText(chronicle: Omit<FinalChronicleState, 'exportText'>) {
  const header = [
    chronicle.title,
    chronicle.subtitle,
    `Classification : ${finalChronicleClassifications[chronicle.archivalClassification]}`,
    `Signature : ${chronicle.finalSignature}`,
    '',
    chronicle.openingStatement,
    '',
    '=== VERSION PUBLIQUE ===',
    chronicle.publicArchive,
    '',
    '=== VERSION RESTREINTE COAN ===',
    chronicle.restrictedArchive,
    '',
    '=== LEDGER ===',
    `Pertes civiles : ${chronicle.ledger.civilianLosses}`,
    `Pertes Combine : ${chronicle.ledger.combineLosses}`,
    `Transferts Nova : ${chronicle.ledger.novaTransfers}`,
    `Évadés Nova : ${chronicle.ledger.novaEscapes}`,
    `Civils piégés : ${chronicle.ledger.trappedCivilians}`,
    `Secteurs Xen perdus : ${chronicle.ledger.xenLostSectors}`,
    `Secteurs Ravenholm-like : ${chronicle.ledger.ravenholmLikeSectors}`,
    `Falsification : ${chronicle.ledger.falsificationIndex}%`,
    `Audit heat : ${chronicle.ledger.auditHeat}%`,
    '',
    '=== CHRONIQUE ===',
  ];
  const chapters = chronicle.chapters.flatMap((chapter) => [
    `## ${chapter.title}`,
    `[${finalChronicleClassifications[chapter.classification]}] ${chapter.subtitle}`,
    chapter.publicText,
    chapter.restrictedText,
    ...chapter.evidence.map((line) => `- Preuve : ${line}`),
    ...chapter.consequences.map((line) => `- Conséquence : ${line}`),
    '',
  ]);
  const sectors = [
    '=== SECTEURS CLÉS ===',
    ...chronicle.sectorLedger.map((sector) => `- ${sector.name} / ${sector.finalStatus} / ${sector.controllingMemory} / pop. ${sector.populationRemaining} / ${sector.note}`),
    '',
    '=== TIMELINE ===',
    ...chronicle.timeline.map((line) => `- ${line}`),
  ];
  return [...header, ...chapters, ...sectors].join('\n');
}

export function buildFinalChronicle(game: GameState, verdict: FinalVerdictState, latestReport?: Report): FinalChronicleState {
  const archivalClassification = classifyChronicle(game, verdict);
  const campaign = getCampaignPreset(game.campaign.activeCampaignId);
  const timelinePreset = getTimelinePreset(game.timeline);
  const sectorLedger = buildSectorLedger(game.sectors);
  const lostNames = strongestSectors(sectorLedger, 'Destroyed');
  const xenNames = [...strongestSectors(sectorLedger, 'Xen'), ...strongestSectors(sectorLedger, 'Quarantine')].slice(0, 5);
  const lambdaNames = strongestSectors(sectorLedger, 'Lambda');
  const combineNames = strongestSectors(sectorLedger, 'Combine');
  const latestFalsification = latestReport?.falsificationScore ?? game.reports[0]?.falsificationScore ?? 0;
  const auditRisk = latestReport?.auditRisk ?? game.reports[0]?.auditRisk ?? 0;
  const ledger = {
    civilianLosses: game.stats.civilianLosses,
    combineLosses: game.stats.combineLosses,
    novaTransfers: game.novaProspekt.totalTransferred,
    novaEscapes: game.novaProspekt.escaped,
    trappedCivilians: game.quarantineZones.trappedCivilianEstimate,
    xenLostSectors: game.quarantineZones.lostCount,
    ravenholmLikeSectors: game.quarantineZones.ravenholmLikeCount,
    falsificationIndex: clamp(latestFalsification),
    auditHeat: clamp(game.auditHeat),
    mandateScore: verdict.mandateScore,
  };

  const openingStatement = [
    `Archive finale de City ${game.city}, générée au jour ${String(game.day).padStart(3, '0')}.`,
    `Timeline : ${timelinePreset.name}. Campagne : ${campaign.name}.`,
    chronicleTransitionLines[0],
  ].join(' ');

  const publicArchive = `${verdict.publicVerdict} La transmission officielle conclut à une classification ${verdict.classification.toUpperCase()} et à un score de mandat ${verdict.mandateScore}%. Les incidents rebelles, biologiques ou logistiques sont reformulés comme mesures de stabilisation nécessaires.`;
  const restrictedArchive = `${verdict.hiddenTruth} ${verdict.advisorJudgement} Le dossier restreint conserve les pertes, les transferts Nova Prospekt, l’héritage Xen, les survivances Lambda et l’écart de ${pct(latestFalsification)} entre récit transmis et dossier réel.`;

  const chapters: FinalChronicleChapter[] = [
    chapter('executive_summary', archivalClassification, 40 + game.auditHeat * 0.4, `City ${game.city} est classée selon un score final COAN de ${verdict.finalScore}% et un contrôle Combine de ${verdict.combineControlIndex}%.`, `Le mandat ne se résume pas à la stabilité : coût humain ${pct(verdict.humanCostIndex)}, héritage Xen ${pct(verdict.xenLegacyIndex)}, héritage Lambda ${pct(verdict.lambdaLegacyIndex)}.`, [`Verdict : ${verdict.title}`, `Classification : ${verdict.classification}`, `Mandat : ${pct(verdict.mandateScore)}`], [`Branche dominante : ${verdict.endingId}`, `Axes critiques : ${verdict.axes.filter((axis) => axis.grade === 'critical' || axis.grade === 'lost').map((axis) => axis.label).join(', ') || 'aucun axe perdu'}`]),
    chapter('administration_record', archivalClassification, game.stats.fear + game.civilProtection.abuseReportIndex * 0.35, `Le mandat a maintenu ${pct(game.stats.production)} de production et ${game.stats.rations} unités de rations restantes sous politique ${reportPolicyLabels[game.reportPolicy]}.`, `La stabilité apparente dépendait de la peur ${pct(game.stats.fear)}, des doctrines CP, du rationnement et de la capacité à saturer les rapports BreenCast.`, [`Doctrine CP : ${game.civilProtection.activeDoctrine}`, `Rationnement : ${game.rationEconomy.activePolicy}`, `Technologies actives : ${game.combineTechnology.researchedNodes.length}`], [`La fatigue civile atteint ${pct(game.stats.fatigue)}`, `Marché noir ${pct(game.rationEconomy.blackMarketIndex)}, faim ${pct(game.rationEconomy.hungerIndex)}`]),
    chapter('covered_crimes', archivalClassification, Math.max(game.auditHeat, latestFalsification, verdict.humanCostIndex), `Les pertes sont consolidées sous incidents administratifs, sanitaires ou anti-citoyens.`, `Pertes civiles ${ledger.civilianLosses}, transferts Nova ${ledger.novaTransfers}, civils piégés ${ledger.trappedCivilians}, falsification ${pct(ledger.falsificationIndex)}, audit heat ${pct(ledger.auditHeat)}.`, topLines([...(latestReport?.auditLines ?? []), ...(game.reports[0]?.auditLines ?? [])], 5), [`Si audit Advisor complet : risque ${pct(auditRisk)}`, `Intégrité des rapports : ${pct(verdict.reportIntegrity)}`]),
    chapter('lost_sectors', archivalClassification, sectorLedger.filter((sector) => ['Destroyed', 'Xen', 'Lambda', 'Quarantine'].includes(sector.controllingMemory)).length * 12, `Les secteurs reclassés sont présentés comme zones de maintenance, exclusion sanitaire ou activité anti-citoyenne résiduelle.`, `Secteurs détruits : ${lostNames.join(', ') || 'aucun dossier détruit dominant'}. Secteurs Xen/quarantaine : ${xenNames.join(', ') || 'aucun vecteur dominant'}. Secteurs Lambda : ${lambdaNames.join(', ') || 'aucun secteur Lambda dominant'}.`, sectorLedger.slice(0, 6).map((sector) => `${sector.name} : ${sector.finalStatus} / ${sector.note}`), [`Couloir Combine restant : ${combineNames.join(', ') || 'fragmenté'}`, `Statuts Ravenholm-like : ${game.quarantineZones.ravenholmLikeCount}`]),
    chapter('nova_prospekt', archivalClassification, Math.max(game.novaProspekt.instability, game.novaProspekt.xenBreachRisk, game.resistanceFactions.novaMartyrdom), `Nova Prospekt est décrit comme dispositif de réaffectation, triage et traitement externe.`, `Le complexe a absorbé ${game.novaProspekt.totalTransferred} transferts, produit ${game.novaProspekt.convertedCandidates} candidats, enregistré ${game.novaProspekt.escaped} évadés et généré ${pct(game.resistanceFactions.novaMartyrdom)} de martyrologie Lambda.`, topLines(game.novaProspekt.log, 6), [`Secret Nova : ${pct(game.novaProspekt.secrecy)}`, `Instabilité Nova : ${pct(game.novaProspekt.instability)}`, `Pression Biotics : ${pct(game.novaProspekt.bioticsPressure)}`]),
    chapter('xen_status', archivalClassification, Math.max(game.stats.xen, game.xenMutation.outbreakRisk, game.xenCatastrophes.citywideRisk), `Les anomalies Xen sont classées comme contamination biologique externe et opérations sanitaires.`, `La biosphère conserve ${pct(game.xenEcosystem.totalBiomass)} de biomasse, ${pct(game.xenMutation.outbreakRisk)} de risque mutation, ${pct(game.xenCatastrophes.citywideRisk)} de risque catastrophe et ${pct(game.xenResearch.labIncidentRisk)} de risque laboratoire.`, topLines([...game.xenEcosystem.log, ...game.xenMutation.log, ...game.xenCatastrophes.log], 7), [`Recherche Xen militarisation ${pct(game.xenResearch.weaponizationIndex)}`, `Quarantaine exclusion biologique ${pct(game.quarantineZones.biologicalExclusionIndex)}`]),
    chapter('resistance_survivors', archivalClassification, Math.max(game.stats.rebel, game.resistanceNetwork.simultaneousOpsRisk, game.resistanceFactions.armedMobilization), `Les éléments anti-citoyens survivants sont décrits comme résidus sans cohérence stratégique.`, `Le réseau Lambda conserve ${pct(game.resistanceNetwork.networkCohesion)} de cohésion, ${pct(game.resistanceNetwork.armedCapacity)} de capacité armée, ${game.resistanceNetwork.openUprisingCells} cellules en soulèvement et une faction dominante ${game.resistanceFactions.dominantFactionId}.`, topLines([...game.resistanceNetwork.log, ...game.resistanceFactions.log], 7), [`Momentum Lambda ${pct(game.majorStoryEvents.lambdaNarrativeMomentum)}`, `Sympathie population ${pct(game.population.lambdaSupportIndex)}`]),
    chapter('citadel_verdict', archivalClassification, Math.max(game.citadelDirectiveTree.advisorAttention, game.majorStoryEvents.advisorNarrativePressure, game.auditHeat), `Le jugement transmis confirme la validité du mandat ou justifie son remplacement selon les règles Citadel.`, `Attention Advisor ${pct(game.citadelDirectiveTree.advisorAttention)}, pression narrative Advisor ${pct(game.majorStoryEvents.advisorNarrativePressure)}, suspicion ${pct(game.stats.suspicion)}, intégrité rapport ${pct(verdict.reportIntegrity)}.`, [`${verdict.advisorJudgement}`, `Politique rapport : ${reportPolicyLabels[game.reportPolicy]}`, `Directives Citadel actives : ${game.citadelDirectiveTree.completedNodes.length}`], verdict.recommendations.slice(0, 5)),
    chapter('historical_memory', archivalClassification, Math.max(verdict.lambdaLegacyIndex, verdict.humanCostIndex, game.vortigaunts.vortessenceCoherence), `La mémoire officielle réduit l’administration à une phase de stabilisation nécessaire.`, `La mémoire réelle survivra par familles de disparus, tunnels Lambda, Biotics, zones scellées, radios pirates et dossiers COAN exportés. Vortessence ${pct(game.vortigaunts.vortessenceCoherence)}, civils vulnérables ${game.population.vulnerable}.`, topLines([...game.log, ...verdict.archiveLines], 8), [`Mémoire civile : ${game.population.groups.disappeared_families} familles de disparus`, `Vortigaunts libres estimés : ${game.vortigaunts.totalFree}`, `Archive finale classée : ${finalChronicleClassifications[archivalClassification]}`]),
  ];

  const timeline = buildTimeline(game, latestReport);
  const finalSignature = `COAN-FINAL-CITY-${game.city}-DAY-${String(game.day).padStart(3, '0')}-${verdict.endingId.toUpperCase()}`;
  const stateWithoutExport: Omit<FinalChronicleState, 'exportText'> = {
    id: `chronicle-${game.city}-${game.day}-${verdict.endingId}`,
    generatedDay: game.day,
    city: game.city,
    title: `Chronique finale de City ${game.city}`,
    subtitle: `${verdict.title} — ${campaign.name}`,
    archivalClassification,
    openingStatement,
    publicArchive,
    restrictedArchive,
    finalSignature,
    ledger,
    sectorLedger,
    chapters: finalChronicleChapterOrder.map((id) => chapters.find((chapterItem) => chapterItem.id === id)).filter(Boolean) as FinalChronicleChapter[],
    timeline,
  };
  return {
    ...stateWithoutExport,
    exportText: buildExportText(stateWithoutExport),
  };
}
