import type { DecisionHistoryCategory, DecisionHistoryEntry, DecisionHistoryFilterId, DecisionHistorySource, DecisionHistoryState, GameState, Report, Stats } from '../types/game';
import { decisionHistoryCategoryLabels, decisionHistoryExportHeader, decisionHistorySeverityLabels } from '../data/decisionHistory';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

const EMPTY_COUNTS: Record<DecisionHistoryCategory, number> = {
  directive: 0,
  sector: 0,
  deployment: 0,
  rationing: 0,
  nova: 0,
  propaganda: 0,
  report: 0,
  citizen: 0,
  informant: 0,
  civil_protection: 0,
  technology: 0,
  resistance: 0,
  vortigaunt: 0,
  xen: 0,
  campaign: 0,
  story_event: 0,
  video: 0,
  atmosphere: 0,
  save: 0,
  system: 0,
};

export function createInitialDecisionHistoryState(city = '17'): DecisionHistoryState {
  const opening: DecisionHistoryEntry = {
    id: `hist-init-${Date.now()}`,
    day: 1,
    sequence: 1,
    createdAt: new Date().toISOString(),
    category: 'system',
    source: 'coan',
    title: `City ${city} — ledger COAN initialisé`,
    summary: 'Ouverture du registre complet des décisions, rapports, mensonges administratifs et conséquences différées.',
    operatorIntent: 'Créer une trace vérifiable de chaque journée d’administration Combine.',
    targetLabel: `City ${city}`,
    classification: 'COAN-LEDGER / CIVIL-STABILIZATION',
    severity: 2,
    statsSnapshot: null,
    statsDelta: {},
    immediateEffects: ['Registre décisionnel actif.'],
    deferredConsequences: ['Les futures falsifications seront comparées aux dossiers réels.'],
    hiddenConsequences: ['Toute décision peut devenir une contradiction détectable par audit Advisor.'],
    relatedReportDay: null,
    realReportExcerpt: [],
    transmittedReportExcerpt: [],
    falsificationScore: 0,
    auditRisk: 0,
    tags: ['COAN', 'ledger', 'audit'],
    fingerprint: 'system:init',
  };
  return buildDecisionHistoryState([opening], ['system:init'], 1, 'all');
}

export function migrateDecisionHistoryState(game: Partial<GameState>): DecisionHistoryState {
  const raw = game.decisionHistory;
  if (raw && Array.isArray(raw.entries)) {
    return buildDecisionHistoryState(
      raw.entries.map(normalizeEntry).slice(0, 500),
      Array.isArray(raw.recordedFingerprints) ? raw.recordedFingerprints.slice(0, 700) : raw.entries.map((entry) => entry.fingerprint).filter(Boolean).slice(0, 700),
      typeof raw.lastSequence === 'number' ? raw.lastSequence : raw.entries.length,
      raw.activeFilter ?? 'all',
    );
  }
  return createInitialDecisionHistoryState(game.city ?? '17');
}

function normalizeEntry(entry: DecisionHistoryEntry): DecisionHistoryEntry {
  return {
    ...entry,
    severity: entry.severity ?? 2,
    statsDelta: entry.statsDelta ?? {},
    immediateEffects: entry.immediateEffects ?? [],
    deferredConsequences: entry.deferredConsequences ?? [],
    hiddenConsequences: entry.hiddenConsequences ?? [],
    realReportExcerpt: entry.realReportExcerpt ?? [],
    transmittedReportExcerpt: entry.transmittedReportExcerpt ?? [],
    tags: entry.tags ?? [],
    source: entry.source ?? 'coan',
    classification: entry.classification ?? 'COAN-LEDGER',
  };
}

function buildDecisionHistoryState(entries: DecisionHistoryEntry[], fingerprints: string[], sequence: number, activeFilter: DecisionHistoryFilterId): DecisionHistoryState {
  const categoryCounts = { ...EMPTY_COUNTS };
  for (const entry of entries) categoryCounts[entry.category] = (categoryCounts[entry.category] ?? 0) + 1;
  const highRisk = entries.filter((entry) => entry.severity >= 4 || entry.auditRisk >= 65 || entry.falsificationScore >= 55).length;
  const hidden = entries.filter((entry) => entry.hiddenConsequences.length > 0).length;
  const reportEntries = entries.filter((entry) => entry.category === 'report');
  const averageFalsification = reportEntries.length ? Math.round(reportEntries.reduce((sum, entry) => sum + entry.falsificationScore, 0) / reportEntries.length) : 0;
  return {
    entries: entries.slice(0, 500),
    recordedFingerprints: Array.from(new Set(fingerprints)).slice(0, 700),
    lastSequence: sequence,
    activeFilter,
    categoryCounts,
    highRiskCount: highRisk,
    hiddenConsequenceCount: hidden,
    reportEntryCount: reportEntries.length,
    averageFalsification,
    lastExportText: '',
  };
}

export function reconcileDecisionHistory(game: GameState): { changed: boolean; decisionHistory: DecisionHistoryState } {
  const current = migrateDecisionHistoryState(game);
  const recorded = new Set(current.recordedFingerprints);
  const additions: DecisionHistoryEntry[] = [];
  let sequence = current.lastSequence;

  for (const line of game.log.slice(0, 12).reverse()) {
    const fingerprint = `log:${line}`;
    if (recorded.has(fingerprint)) continue;
    additions.unshift(createLogEntry({ game, line, sequence: ++sequence, fingerprint }));
    recorded.add(fingerprint);
  }

  for (const report of game.reports.slice(0, 5).reverse()) {
    const fingerprint = `report:${report.day}:${report.title}:${report.falsificationScore ?? 0}:${report.auditRisk ?? 0}:${report.auditDiscovered ? 'D' : 'C'}`;
    if (recorded.has(fingerprint)) continue;
    additions.unshift(createReportEntry({ game, report, sequence: ++sequence, fingerprint }));
    recorded.add(fingerprint);
  }

  if (!additions.length) return { changed: false, decisionHistory: current };
  const merged = [...additions, ...current.entries].sort((a, b) => b.sequence - a.sequence).slice(0, 500);
  return {
    changed: true,
    decisionHistory: buildDecisionHistoryState(merged, Array.from(recorded), sequence, current.activeFilter),
  };
}

function createLogEntry(args: { game: GameState; line: string; sequence: number; fingerprint: string }): DecisionHistoryEntry {
  const { game, line, sequence, fingerprint } = args;
  const category = inferCategory(line);
  const source = inferSource(line, category);
  const severity = inferSeverity(line, game.stats);
  const title = line.replace(/^JOUR\s+\d+\s+—\s+/i, '').split(':')[0].slice(0, 96);
  const hiddenConsequences = inferHiddenConsequences(line, category, game);
  const deferredConsequences = inferDeferredConsequences(line, category, game);
  return {
    id: `hist-${game.day}-${sequence}-${hashString(fingerprint)}`,
    day: extractDay(line) ?? game.day,
    sequence,
    createdAt: new Date().toISOString(),
    category,
    source,
    title: title || decisionHistoryCategoryLabels[category],
    summary: line,
    operatorIntent: inferOperatorIntent(line, category),
    targetLabel: inferTargetLabel(line, game),
    classification: severity >= 5 ? 'BLACK-FILE / ADVISOR-SENSITIVE' : severity >= 4 ? 'COAN-RESTRICTED / CITADÈLE' : 'COAN-CIVIL-LEDGER',
    severity,
    statsSnapshot: { ...game.stats },
    statsDelta: inferStatsDelta(line, game.stats),
    immediateEffects: inferImmediateEffects(line, category),
    deferredConsequences,
    hiddenConsequences,
    relatedReportDay: null,
    realReportExcerpt: [],
    transmittedReportExcerpt: [],
    falsificationScore: 0,
    auditRisk: category === 'report' ? game.auditHeat : severity >= 4 ? clamp(game.auditHeat + 12) : game.auditHeat,
    tags: Array.from(new Set([category, source, ...inferTags(line)])),
    fingerprint,
  };
}

function createReportEntry(args: { game: GameState; report: Report; sequence: number; fingerprint: string }): DecisionHistoryEntry {
  const { game, report, sequence, fingerprint } = args;
  const falsification = report.falsificationScore ?? 0;
  const auditRisk = report.auditRisk ?? 0;
  const severity = clamp(Math.ceil((falsification + auditRisk + (report.auditDiscovered ? 45 : 0)) / 38), 1, 5) as 1 | 2 | 3 | 4 | 5;
  const fields = report.falsifiedFields?.length ? `Champs falsifiés : ${report.falsifiedFields.join(', ')}.` : 'Aucune falsification de champ signalée.';
  return {
    id: `hist-report-${report.day}-${sequence}-${hashString(fingerprint)}`,
    day: report.day,
    sequence,
    createdAt: new Date().toISOString(),
    category: 'report',
    source: report.auditDiscovered ? 'advisor' : 'citadel',
    title: `${report.title} / transmission Citadel`,
    summary: `Rapport réel archivé puis transmis avec politique ${game.reportPolicy}. ${fields}`,
    operatorIntent: 'Clôturer la journée et envoyer une version officielle à la Citadelle.',
    targetLabel: `City ${game.city} / jour ${String(report.day).padStart(3, '0')}`,
    classification: report.auditDiscovered ? 'ADVISOR-AUDIT / CONTRADICTION CONFIRMÉE' : falsification > 50 ? 'COAN-RESTRICTED / FALSIFICATION ACTIVE' : 'CITADEL-TRANSMISSION',
    severity,
    statsSnapshot: { ...report.stats },
    statsDelta: diffStats(game.reports[1]?.stats, report.stats),
    immediateEffects: [
      `Rapport réel : stabilité ${report.stats.stability}%, Lambda ${report.stats.rebel}%, Xen ${report.stats.xen}%.`,
      `Transmission : falsification ${falsification}%, risque audit ${auditRisk}%.`,
      ...(report.auditTriggered ? ['Audit Advisor déclenché.'] : []),
      ...(report.auditDiscovered ? ['Falsification détectée par audit Advisor.'] : []),
    ],
    deferredConsequences: [
      falsification > 45 ? 'La cohérence des rapports futurs sera plus fragile.' : 'La transmission conserve une cohérence administrative acceptable.',
      auditRisk > 60 ? 'La prochaine inspection Advisor aura plus de chances de comparer les dossiers vidéo, Nova et rations.' : 'Risque d’inspection contenu pour le moment.',
    ],
    hiddenConsequences: [
      ...(report.auditDiscovered ? ['Les contradictions internes peuvent justifier le remplacement de l’administrateur.'] : []),
      ...(report.falsifiedFields?.length ? ['Le dossier réel et le dossier transmis divergent ; COAN conserve les deux versions.'] : []),
    ],
    relatedReportDay: report.day,
    realReportExcerpt: report.lines.slice(0, 6),
    transmittedReportExcerpt: (report.transmittedLines ?? []).slice(0, 6),
    falsificationScore: falsification,
    auditRisk,
    tags: ['rapport', 'Citadel', 'COAN', ...(report.auditDiscovered ? ['Advisor', 'contradiction'] : []), ...(report.falsifiedFields ?? [])],
    fingerprint,
  };
}

function inferCategory(line: string): DecisionHistoryCategory {
  const value = line.toLowerCase();
  if (value.includes('breencast') || value.includes('propagande')) return 'propaganda';
  if (value.includes('rapport') || value.includes('audit') || value.includes('transmis')) return 'report';
  if (value.includes('nova') || value.includes('razor') || value.includes('détention') || value.includes('biotics')) return 'nova';
  if (value.includes('ration') || value.includes('marché noir') || value.includes('calorique')) return 'rationing';
  if (value.includes('citoyen') || value.includes('registre civil') || value.includes('dossier civil')) return 'citizen';
  if (value.includes('informateur') || value.includes('délation') || value.includes('dénonciation')) return 'informant';
  if (value.includes('civil protection') || value.includes('cp ') || value.includes('couvre-feu') || value.includes('raid')) return 'civil_protection';
  if (value.includes('technologie') || value.includes('r&d') || value.includes('protocole recherché')) return 'technology';
  if (value.includes('lambda') || value.includes('résistance') || value.includes('anti-citoyen') || value.includes('rebelle')) return 'resistance';
  if (value.includes('vort') || value.includes('biotic')) return 'vortigaunt';
  if (value.includes('xen') || value.includes('quarantaine') || value.includes('headcrab') || value.includes('barnacle') || value.includes('antlion') || value.includes('ravenholm')) return 'xen';
  if (value.includes('campagne') || value.includes('objectif') || value.includes('mandat')) return 'campaign';
  if (value.includes('événement majeur') || value.includes('advisor') || value.includes('blackout')) return 'story_event';
  if (value.includes('cam-') || value.includes('archive vidéo') || value.includes('flux')) return 'video';
  if (value.includes('atmosphère') || value.includes('terminal')) return 'atmosphere';
  if (value.includes('sauvegarde') || value.includes('import')) return 'save';
  if (value.includes('directive')) return 'directive';
  if (value.includes('déployé')) return 'deployment';
  if (value.includes('secteur') || value.includes('scell')) return 'sector';
  return 'system';
}

function inferSource(line: string, category: DecisionHistoryCategory): DecisionHistorySource {
  const value = line.toLowerCase();
  if (value.includes('advisor') || value.includes('audit')) return 'advisor';
  if (value.includes('citadel') || value.includes('directive')) return 'citadel';
  if (value.includes('nova')) return 'nova';
  if (value.includes('xen') || value.includes('quarantaine') || value.includes('bio')) return 'quarantine';
  if (value.includes('lambda') || value.includes('anti-citoyen')) return 'lambda';
  if (category === 'civil_protection' || category === 'informant') return 'civil_protection';
  if (category === 'report' || category === 'video') return 'archive';
  return line.includes('—') ? 'operator' : 'coan';
}

function inferSeverity(line: string, stats: Stats): 1 | 2 | 3 | 4 | 5 {
  const value = line.toLowerCase();
  let score = 1;
  if (value.includes('scell') || value.includes('purge') || value.includes('bombard') || value.includes('headcrab shell')) score += 2;
  if (value.includes('advisor') || value.includes('falsification') || value.includes('dossier noir')) score += 1;
  if (value.includes('nova') || value.includes('ravenholm') || value.includes('catastrophe')) score += 1;
  if (stats.rebel > 70 || stats.xen > 70 || stats.suspicion > 70) score += 1;
  return clamp(score, 1, 5) as 1 | 2 | 3 | 4 | 5;
}

function inferOperatorIntent(line: string, category: DecisionHistoryCategory): string {
  if (category === 'propaganda') return 'Contrôler le récit public et maintenir la façade de continuité civique.';
  if (category === 'report') return 'Stabiliser la relation Citadel en contrôlant les chiffres transmis.';
  if (category === 'nova') return 'Transformer une crise civile en renseignement, transfert ou dossier noir.';
  if (category === 'xen') return 'Limiter la propagation biologique avant qu’elle ne devienne mémoire Ravenholm-like.';
  if (category === 'resistance') return 'Réduire la capacité Lambda sans déclencher une insurrection ouverte.';
  if (category === 'rationing') return 'Utiliser les rations comme outil de conformité et de pression sociale.';
  if (category === 'civil_protection') return 'Imposer l’ordre visible par la force locale ou par la discipline CP.';
  if (category === 'save') return 'Préserver ou restaurer une branche administrative de City.';
  return 'Maintenir la stabilité administrative de City sous occupation Combine.';
}

function inferImmediateEffects(line: string, category: DecisionHistoryCategory): string[] {
  const effects = [`Catégorie enregistrée : ${decisionHistoryCategoryLabels[category]}.`];
  const value = line.toLowerCase();
  if (value.includes('couvre-feu')) effects.push('Mobilité civile réduite, production et fatigue affectées.');
  if (value.includes('raid')) effects.push('Présence CP renforcée et tension locale accrue.');
  if (value.includes('breencast')) effects.push('Contrôle informationnel ajusté par doctrine publique.');
  if (value.includes('ration')) effects.push('Ledger alimentaire et marché noir potentiellement modifiés.');
  if (value.includes('déployé')) effects.push('Réserve Combine réduite, pression locale augmentée.');
  return effects;
}

function inferDeferredConsequences(line: string, category: DecisionHistoryCategory, game: GameState): string[] {
  const value = line.toLowerCase();
  const items: string[] = [];
  if (category === 'civil_protection' && game.civilProtection.abuseReportIndex > 55) items.push('Les abus CP nourrissent familles de disparus, fausses dénonciations et sympathie Lambda.');
  if (category === 'rationing' && game.rationEconomy.hungerIndex > 55) items.push('La faim peut déplacer des citoyens neutres vers la zone grise Lambda.');
  if (category === 'xen' && game.xenMutation.mutationVelocity > 55) items.push('Les chaînes biologiques peuvent dépasser le simple statut de quarantaine.');
  if (category === 'nova' && game.novaProspekt.instability > 55) items.push('Nova Prospekt peut devenir un mythe Lambda si les disparitions restent visibles.');
  if (value.includes('advisor')) items.push('La prochaine transmission Citadel sera comparée plus durement aux archives locales.');
  if (!items.length) items.push('Conséquence différée surveillée par COAN selon les prochains rapports.');
  return items;
}

function inferHiddenConsequences(line: string, category: DecisionHistoryCategory, game: GameState): string[] {
  const value = line.toLowerCase();
  const items: string[] = [];
  if (value.includes('falsifi') || value.includes('dissim') || value.includes('rapport transmis')) items.push('Contradiction possible entre dossier réel COAN et transmission Citadel.');
  if (value.includes('shadow') || value.includes('clandestin') || value.includes('aide clandestine')) items.push('Trace de double jeu exploitable par Lambda ou Advisor.');
  if (value.includes('nova') && game.novaProspekt.secrecy < 50) items.push('Les familles de disparus peuvent relier les manifestes Razor aux transferts.');
  if (value.includes('vort') && game.vortigaunts.vortessenceCoherence > 60) items.push('La Vortessence peut contourner les silos administratifs Combine.');
  if (category === 'video' && game.videoArchives.publicLeakRisk > 50) items.push('Les archives vidéo peuvent contredire la version BreenCast.');
  return items;
}

function inferTargetLabel(line: string, game: GameState): string {
  const sector = game.sectors.find((item) => line.includes(item.name));
  if (sector) return sector.name;
  if (line.toLowerCase().includes('nova')) return 'Nova Prospekt';
  if (line.toLowerCase().includes('citadel')) return 'Citadel relay';
  if (line.toLowerCase().includes('breencast')) return 'Réseau BreenCast';
  return `City ${game.city}`;
}

function inferTags(line: string): string[] {
  const lower = line.toLowerCase();
  const tags: string[] = [];
  for (const token of ['Lambda', 'Xen', 'Nova', 'Advisor', 'Citadel', 'BreenCast', 'Ravenholm', 'Razor', 'Vortigaunt', 'Civil Protection']) {
    if (lower.includes(token.toLowerCase())) tags.push(token);
  }
  return tags;
}

function inferStatsDelta(line: string, stats: Stats): Partial<Stats> {
  const lower = line.toLowerCase();
  const delta: Partial<Stats> = {};
  if (lower.includes('rationnement sévère') || lower.includes('coupe')) delta.loyalty = -1;
  if (lower.includes('breencast')) delta.info = 1;
  if (lower.includes('advisor')) delta.suspicion = Math.max(1, Math.round(stats.suspicion * 0.02));
  if (lower.includes('xen') || lower.includes('quarantaine')) delta.xen = 0;
  if (lower.includes('lambda') || lower.includes('rebelle')) delta.rebel = 0;
  return delta;
}

function diffStats(previous: Stats | undefined, current: Stats): Partial<Stats> {
  if (!previous) return {};
  const delta: Partial<Stats> = {};
  (Object.keys(current) as Array<keyof Stats>).forEach((key) => {
    const value = current[key] - previous[key];
    if (value !== 0) delta[key] = value;
  });
  return delta;
}

function extractDay(line: string): number | null {
  const match = line.match(/JOUR\s+(\d+)/i);
  return match ? Number(match[1]) : null;
}

function hashString(value: string): string {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  return Math.abs(hash).toString(36);
}

export function setDecisionHistoryFilter(history: DecisionHistoryState, filter: DecisionHistoryFilterId): DecisionHistoryState {
  return { ...history, activeFilter: filter };
}

export function getFilteredDecisionEntries(history: DecisionHistoryState): DecisionHistoryEntry[] {
  const filter = history.activeFilter;
  if (filter === 'all') return history.entries;
  if (filter === 'operator') return history.entries.filter((entry) => entry.source === 'operator');
  if (filter === 'hidden') return history.entries.filter((entry) => entry.hiddenConsequences.length > 0 || entry.severity >= 4);
  if (filter === 'reports') return history.entries.filter((entry) => entry.category === 'report');
  if (filter === 'xen') return history.entries.filter((entry) => entry.category === 'xen' || entry.tags.includes('Xen'));
  if (filter === 'lambda') return history.entries.filter((entry) => entry.category === 'resistance' || entry.tags.includes('Lambda'));
  if (filter === 'nova') return history.entries.filter((entry) => entry.category === 'nova' || entry.tags.includes('Nova'));
  if (filter === 'citadel') return history.entries.filter((entry) => ['directive', 'technology', 'report', 'story_event'].includes(entry.category) || entry.tags.includes('Citadel') || entry.tags.includes('Advisor'));
  return history.entries.filter((entry) => ['citizen', 'informant', 'civil_protection', 'rationing', 'sector'].includes(entry.category));
}

export function buildDecisionHistoryExport(game: GameState): string {
  const history = migrateDecisionHistoryState(game);
  const entries = getFilteredDecisionEntries(history);
  const header = [
    ...decisionHistoryExportHeader,
    `City: ${game.city}`,
    `Jour courant: ${game.day}`,
    `Filtre: ${history.activeFilter}`,
    `Entrées exportées: ${entries.length}`,
    `Risque élevé: ${history.highRiskCount} / Conséquences cachées: ${history.hiddenConsequenceCount}`,
    '',
  ];
  const body = entries.map((entry) => [
    `#${entry.sequence} — JOUR ${String(entry.day).padStart(3, '0')} — ${entry.title}`,
    `Catégorie: ${decisionHistoryCategoryLabels[entry.category]} / Sévérité: ${decisionHistorySeverityLabels[entry.severity]}`,
    `Cible: ${entry.targetLabel}`,
    `Résumé: ${entry.summary}`,
    `Intention: ${entry.operatorIntent}`,
    entry.immediateEffects.length ? `Effets immédiats: ${entry.immediateEffects.join(' | ')}` : '',
    entry.deferredConsequences.length ? `Conséquences différées: ${entry.deferredConsequences.join(' | ')}` : '',
    entry.hiddenConsequences.length ? `Conséquences cachées: ${entry.hiddenConsequences.join(' | ')}` : '',
    entry.category === 'report' ? `Falsification: ${entry.falsificationScore}% / Audit: ${entry.auditRisk}%` : '',
    `Tags: ${entry.tags.join(', ')}`,
  ].filter(Boolean).join('\n')).join('\n\n');
  return [...header, body].join('\n');
}
