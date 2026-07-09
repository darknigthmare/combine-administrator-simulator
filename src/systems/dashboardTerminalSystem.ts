import type { GameState, Sector, TabId } from '../types/game';
import { dashboardAlertTemplates, dashboardDossierCopy, dashboardTransmissionLabels, type DashboardAlertTone } from '../data/dashboardTerminal';

export type DashboardSeverity = 'routine' | 'elevated' | 'urgent' | 'critical';

export type DashboardTerminalAlert = {
  id: string;
  source: string;
  tone: DashboardAlertTone;
  severity: DashboardSeverity;
  score: number;
  label: string;
  body: string;
  targetTab: TabId;
  recommendedAction: string;
};

export type DashboardTerminalMapNode = {
  sectorId: string;
  name: string;
  x: number;
  y: number;
  status: string;
  tone: DashboardAlertTone;
  risk: number;
  rebel: number;
  xen: number;
  surveillance: number;
};

export type DashboardTerminalDossier = {
  id: string;
  title: string;
  subtitle: string;
  targetTab: TabId;
  tone: DashboardAlertTone;
  score: number;
  metrics: Array<{ label: string; value: string }>;
};

export type DashboardTerminalTransmission = {
  id: keyof typeof dashboardTransmissionLabels;
  label: string;
  status: string;
  integrity: number;
  tone: DashboardAlertTone;
  detail: string;
};

export type DashboardTerminalState = {
  commandStatus: string;
  commandDirective: string;
  primaryThreat: string;
  coanRecommendation: string;
  gridIntegrity: number;
  cityPulse: number;
  alerts: DashboardTerminalAlert[];
  dossiers: DashboardTerminalDossier[];
  transmissions: DashboardTerminalTransmission[];
  mapNodes: DashboardTerminalMapNode[];
  prioritySectors: DashboardTerminalMapNode[];
  commandOrders: Array<{ label: string; targetTab: TabId; tone: DashboardAlertTone; detail: string }>;
  ticker: string[];
};

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const avg = (values: number[]) => values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;

function severityFromScore(score: number): DashboardSeverity {
  if (score >= 82) return 'critical';
  if (score >= 62) return 'urgent';
  if (score >= 40) return 'elevated';
  return 'routine';
}

function sectorTone(sector: Sector): DashboardAlertTone {
  if (sector.status === 'Infesté' || sector.status === 'Contaminé' || sector.status === 'En quarantaine' || sector.xen > 55) return 'xen';
  if (sector.status === 'Insurgé' || sector.status === 'Contrôle rebelle' || sector.status === 'Zone de combat' || sector.rebel > 55) return 'lambda';
  if (sector.status === 'Scellé' || sector.status === 'Bombardé' || sector.status === 'Abandonné') return 'critical';
  if (sector.zone === 'Citadelle') return 'citadel';
  return 'combine';
}

function sectorRisk(sector: Sector): number {
  const insurgency = sector.rebel * 0.34;
  const xen = sector.xen * 0.34;
  const civil = (100 - sector.loyalty) * 0.08 + sector.fear * 0.08;
  const infra = (100 - sector.infrastructure) * 0.1;
  const choke = sector.chokePoint ? 7 : 0;
  const weakSurveillance = Math.max(0, 45 - sector.surveillance) * 0.08;
  return clamp(insurgency + xen + civil + infra + choke + weakSurveillance);
}

function transmissionTone(integrity: number, defaultTone: DashboardAlertTone): DashboardAlertTone {
  if (integrity < 30) return 'critical';
  if (integrity < 55) return 'citadel';
  return defaultTone;
}

function buildAlert(score: number, templateId: string, scoreLabel?: string): DashboardTerminalAlert {
  const template = dashboardAlertTemplates.find((item) => item.id === templateId) ?? dashboardAlertTemplates[0];
  return {
    id: `${template.id}-${score}`,
    source: template.source,
    tone: template.tone,
    severity: severityFromScore(score),
    score: clamp(score),
    label: template.label,
    body: scoreLabel ? `${template.body} ${scoreLabel}` : template.body,
    targetTab: template.targetTab,
    recommendedAction: template.recommendedAction,
  };
}

export function buildDashboardTerminal(game: GameState): DashboardTerminalState {
  const prioritySectors = game.sectors
    .map((sector) => ({
      sectorId: sector.id,
      name: sector.name,
      x: sector.x,
      y: sector.y,
      status: sector.status,
      tone: sectorTone(sector),
      risk: sectorRisk(sector),
      rebel: sector.rebel,
      xen: sector.xen,
      surveillance: sector.surveillance,
    }))
    .sort((a, b) => b.risk - a.risk);

  const lambdaScore = clamp(Math.max(
    game.stats.rebel,
    game.resistanceNetwork.networkCohesion,
    game.resistanceNetwork.simultaneousOpsRisk,
    game.resistanceFactions.armedMobilization,
    avg(game.sectors.map((sector) => sector.rebel)),
  ));
  const xenScore = clamp(Math.max(
    game.stats.xen,
    game.xenEcosystem.networkSpread,
    game.xenMutation.outbreakRisk,
    game.quarantineZones.biologicalExclusionIndex,
    game.xenCatastrophes.citywideRisk,
  ));
  const citadelScore = clamp(Math.max(game.stats.suspicion, game.auditHeat, game.majorStoryEvents.advisorNarrativePressure, game.xenResearch.advisorInterest, game.citadelDirectiveTree.advisorAttention));
  const novaScore = clamp(Math.max(game.novaProspekt.instability, game.novaProspekt.xenBreachRisk, 100 - game.novaProspekt.secrecy, game.novaProspekt.bioticsPressure));
  const rationScore = clamp(Math.max(game.rationEconomy.hungerIndex, game.rationEconomy.blackMarketIndex, Math.max(0, 35 - game.rationEconomy.autonomyDays) * 3));
  const cpScore = clamp(Math.max(game.civilProtection.brutalityIndex, game.civilProtection.corruptionIndex, game.civilProtection.lambdaInfiltration, game.civilProtection.falseChargeIndex));
  const mandateScore = clamp(Math.max(game.campaign.pressure, game.campaignMission.failureRisk, 100 - game.campaignMission.mandateScore));
  const majorScore = clamp(Math.max(game.majorStoryEvents.citywideHeat, game.majorStoryEvents.publicContradiction, game.majorStoryEvents.unresolvedMajorEvents * 22));

  const alertCandidates = [
    buildAlert(lambdaScore, 'lambda-network-surge', `Pression calculée : ${lambdaScore}%.`),
    buildAlert(xenScore, 'xen-ecosystem-surge', `Indice biologique : ${xenScore}%.`),
    buildAlert(citadelScore, 'advisor-audit-heat', `Chaleur administrative : ${citadelScore}%.`),
    buildAlert(novaScore, 'nova-visible', `Visibilité/instabilité : ${novaScore}%.`),
    buildAlert(rationScore, 'ration-social-failure', `Faim et marché noir : ${rationScore}%.`),
    buildAlert(cpScore, 'cp-corruption-brutality', `Dérive CP : ${cpScore}%.`),
    buildAlert(mandateScore, 'citadel-mandate-failure', `Risque mandat : ${mandateScore}%.`),
    buildAlert(majorScore, 'major-story-unresolved', `Chaleur narrative : ${majorScore}%.`),
    buildAlert(clamp(100 - game.stats.info + game.stats.fatigue * 0.3), 'breencast-opportunity'),
  ].sort((a, b) => b.score - a.score);

  const primaryThreat = alertCandidates[0]?.label ?? 'Aucune menace prioritaire';
  const commandDirective = game.ending
    ? 'CITY FAILURE ARCHIVE — consulter verdict final et chronique.'
    : game.crisis
      ? `CRISE ACTIVE — ${game.crisis.title}`
      : `${game.directive.title} / ${game.directiveDays} jour(s) restant(s)`;

  const commandStatus = game.ending
    ? 'VERROUILLAGE ARCHIVE'
    : alertCandidates[0]?.severity === 'critical'
      ? 'PROTOCOLE ROUGE'
      : alertCandidates[0]?.severity === 'urgent'
        ? 'SURVEILLANCE RENFORCÉE'
        : 'ADMINISTRATION ACTIVE';

  const coanRecommendation = (() => {
    const top = alertCandidates[0];
    if (!top) return 'Maintenir pression administrative et cohérence des transmissions.';
    if (top.tone === 'xen') return 'Sceller les vecteurs souterrains avant intervention visible. Les purges tardives créent mémoire Ravenholm-like.';
    if (top.tone === 'lambda') return 'Casser les routes clandestines et radios avant d’augmenter la brutalité CP. Éviter de fabriquer un martyr.';
    if (top.tone === 'nova') return 'Réduire la visibilité Nova Prospekt : les manifestes Razor incohérents alimentent le récit Lambda.';
    if (top.tone === 'citadel') return 'Réaligner rapports, doctrine Citadel et résultats mesurables avant la prochaine revue Advisor.';
    if (top.tone === 'ration') return 'Stabiliser rationnement localement : la faim rend la délation rentable mais rend Lambda crédible.';
    if (top.tone === 'civil') return 'Réduire corruption CP sans affaiblir checkpoints : la qualité du renseignement vaut plus que les quotas.';
    return 'Diffuser une ligne BreenCast alignée avec le danger réel, pas avec le rapport falsifié.';
  })();

  const latestReport = game.reports[0];
  const transmissions: DashboardTerminalTransmission[] = [
    {
      id: 'citadel',
      label: dashboardTransmissionLabels.citadel,
      status: latestReport?.auditDiscovered ? 'COMPROMISE' : latestReport?.auditTriggered ? 'AUDIT PARTIEL' : 'TRANSMISE',
      integrity: clamp(100 - Math.max(game.auditHeat, latestReport?.falsificationScore ?? 0)),
      tone: transmissionTone(clamp(100 - Math.max(game.auditHeat, latestReport?.falsificationScore ?? 0)), 'citadel'),
      detail: latestReport ? `Rapport jour ${String(latestReport.day).padStart(3, '0')} / falsification ${latestReport.falsificationScore ?? 0}% / audit ${latestReport.auditRisk ?? 0}%.` : 'Aucune archive journalière transmise.',
    },
    {
      id: 'breencast',
      label: dashboardTransmissionLabels.breencast,
      status: game.stats.info > 65 ? 'DOMINANT' : game.stats.info > 40 ? 'AUDIBLE' : 'BROUILLÉ',
      integrity: clamp(game.stats.info - game.stats.fatigue * 0.2),
      tone: 'combine',
      detail: `Contrôle informationnel ${game.stats.info}% / fatigue civile ${game.stats.fatigue}%.`,
    },
    {
      id: 'nova',
      label: dashboardTransmissionLabels.nova,
      status: game.novaProspekt.instability > 70 ? 'INSTABLE' : game.novaProspekt.secrecy > 60 ? 'CLASSIFIÉE' : 'VISIBLE',
      integrity: clamp((game.novaProspekt.security + game.novaProspekt.secrecy) / 2 - game.novaProspekt.instability * 0.35),
      tone: 'nova',
      detail: `Sécurité ${game.novaProspekt.security}% / secret ${game.novaProspekt.secrecy}% / instabilité ${game.novaProspekt.instability}%.`,
    },
    {
      id: 'quarantine',
      label: dashboardTransmissionLabels.quarantine,
      status: game.quarantineZones.ravenholmLikeCount > 0 ? 'RAVENHOLM-LIKE' : game.quarantineZones.lostCount > 0 ? 'ZONE PERDUE' : 'SUIVI BIO',
      integrity: clamp(game.quarantineZones.containmentIndex - game.xenMutation.outbreakRisk * 0.2),
      tone: 'xen',
      detail: `${game.quarantineZones.zones.length} zones / ${game.quarantineZones.lostCount} perdues / ${game.quarantineZones.trappedCivilianEstimate} civils piégés.`,
    },
    {
      id: 'coan',
      label: dashboardTransmissionLabels.coan,
      status: game.finalVerdict ? 'ARCHIVE FINALE' : 'RESTRICTED LIVE',
      integrity: clamp(100 - game.majorStoryEvents.publicContradiction * 0.5 - game.auditHeat * 0.25),
      tone: 'combine',
      detail: `Journaux COAN ${game.log.length} entrées / rapports ${game.reports.length} / contradictions publiques ${game.majorStoryEvents.publicContradiction}%.`,
    },
  ];

  const dossiers: DashboardTerminalDossier[] = [
    {
      id: 'city',
      title: 'City control dossier',
      subtitle: dashboardDossierCopy.city,
      targetTab: 'finale',
      tone: game.stats.stability < 45 ? 'critical' : 'combine',
      score: clamp((game.stats.stability + game.stats.production + game.stats.citadel) / 3),
      metrics: [
        { label: 'Stabilité', value: `${game.stats.stability}%` },
        { label: 'Production', value: `${game.stats.production}%` },
        { label: 'Pertes civiles', value: `${game.stats.civilianLosses}` },
      ],
    },
    {
      id: 'sectors',
      title: 'Sector priority map',
      subtitle: dashboardDossierCopy.sectors,
      targetTab: 'sectors',
      tone: prioritySectors[0]?.tone ?? 'combine',
      score: prioritySectors[0]?.risk ?? 0,
      metrics: [
        { label: 'Secteur le plus chaud', value: prioritySectors[0]?.name ?? 'Aucun' },
        { label: 'Risque', value: `${prioritySectors[0]?.risk ?? 0}%` },
        { label: 'Statut', value: prioritySectors[0]?.status ?? 'Stable' },
      ],
    },
    {
      id: 'lambda',
      title: 'Lambda network dossier',
      subtitle: dashboardDossierCopy.lambda,
      targetTab: 'resistance',
      tone: 'lambda',
      score: lambdaScore,
      metrics: [
        { label: 'Cohésion réseau', value: `${game.resistanceNetwork.networkCohesion}%` },
        { label: 'Ops simultanées', value: `${game.resistanceNetwork.simultaneousOpsRisk}%` },
        { label: 'Cellules découvertes', value: `${game.resistanceNetwork.discoveredCells}` },
      ],
    },
    {
      id: 'xen',
      title: 'Biohazard / Xen dossier',
      subtitle: dashboardDossierCopy.xen,
      targetTab: 'xen',
      tone: 'xen',
      score: xenScore,
      metrics: [
        { label: 'Bio pression', value: `${game.xenEcosystem.networkSpread}%` },
        { label: 'Mutation', value: `${game.xenMutation.outbreakRisk}%` },
        { label: 'Catastrophe', value: `${game.xenCatastrophes.citywideRisk}%` },
      ],
    },
    {
      id: 'nova',
      title: 'Nova Prospekt black dossier',
      subtitle: dashboardDossierCopy.nova,
      targetTab: 'nova',
      tone: 'nova',
      score: novaScore,
      metrics: [
        { label: 'Transférés', value: `${game.novaProspekt.totalTransferred}` },
        { label: 'Biotics pressure', value: `${game.novaProspekt.bioticsPressure}%` },
        { label: 'Évasions', value: `${game.novaProspekt.escaped}` },
      ],
    },
    {
      id: 'reports',
      title: 'Citadel audit dossier',
      subtitle: dashboardDossierCopy.reports,
      targetTab: 'reports',
      tone: 'citadel',
      score: citadelScore,
      metrics: [
        { label: 'Audit heat', value: `${game.auditHeat}%` },
        { label: 'Suspicion', value: `${game.stats.suspicion}%` },
        { label: 'Politique', value: game.reportPolicy },
      ],
    },
  ];

  const commandOrders = alertCandidates.slice(0, 5).map((alert) => ({
    label: alert.label,
    targetTab: alert.targetTab,
    tone: alert.tone,
    detail: alert.recommendedAction,
  }));

  const gridIntegrity = clamp((game.stats.stability + game.stats.info + game.stats.citadel + game.stats.production) / 4 - Math.max(game.stats.rebel, game.stats.xen) * 0.12);
  const cityPulse = clamp((game.stats.fear * 0.28) + (game.stats.fatigue * 0.24) + (game.stats.rebel * 0.22) + (game.stats.xen * 0.2) + (100 - game.stats.loyalty) * 0.06);

  const ticker = [
    `COAN ${commandStatus}`,
    `City ${game.city} / Jour ${String(game.day).padStart(3, '0')}`,
    `Menace prioritaire : ${primaryThreat}`,
    `Directive : ${commandDirective}`,
    `Grille ${gridIntegrity}% / Pulse civil ${cityPulse}%`,
    ...prioritySectors.slice(0, 3).map((sector) => `${sector.name} ${sector.risk}% ${sector.status}`),
  ];

  return {
    commandStatus,
    commandDirective,
    primaryThreat,
    coanRecommendation,
    gridIntegrity,
    cityPulse,
    alerts: alertCandidates,
    dossiers,
    transmissions,
    mapNodes: prioritySectors.sort((a, b) => a.sectorId.localeCompare(b.sectorId)),
    prioritySectors: prioritySectors.slice().sort((a, b) => b.risk - a.risk).slice(0, 6),
    commandOrders,
    ticker,
  };
}
