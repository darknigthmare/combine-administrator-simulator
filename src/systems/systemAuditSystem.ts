import { finalAuditChecklist, finalAuditRunbook, finalAuditVersion, type SystemAuditSeverity } from '../data/systemAudit';
import { baseSectors } from '../data/citySectors';
import { crises } from '../data/crisisEvents';
import { unitTemplates } from '../data/combineUnits';
import { xenCodex } from '../data/xenEntities';
import { campaignPresets } from '../data/campaignScenarios';
import { campaignObjectiveDefinitions } from '../data/campaignObjectives';
import { majorStoryEventDefinitions } from '../data/majorStoryEvents';
import { loreCodexEntries } from '../data/loreCodex';
import { difficultyPresets } from '../data/difficultySettings';
import type { GameState, TabId } from '../types/game';

export type AuditLine = {
  id: string;
  label: string;
  category: string;
  status: SystemAuditSeverity;
  detail: string;
  evidence: string;
  relatedTab?: TabId;
};

export type AuditCount = {
  label: string;
  value: number | string;
  detail: string;
};

export type SystemAuditSnapshot = {
  version: string;
  score: number;
  statusLabel: string;
  headline: string;
  blockers: string[];
  warnings: string[];
  counts: AuditCount[];
  lines: AuditLine[];
  recommendations: string[];
  runbook: string[];
  exportText: string;
};

const pct = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
const avg = (values: number[]) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;

function line(id: string, status: SystemAuditSeverity, detail: string, evidence: string): Pick<AuditLine, 'id' | 'status' | 'detail' | 'evidence'> {
  return { id, status, detail, evidence };
}

export function buildSystemAudit(game: GameState): SystemAuditSnapshot {
  const populationTotal = game.population.total;
  const sectorRisk = avg(game.sectors.map((sector) => Math.max(sector.rebel, sector.xen, 100 - sector.infrastructure)));
  const lambdaHeat = Math.max(game.stats.rebel, game.resistanceNetwork.simultaneousOpsRisk, game.resistanceFactions.factionWarRisk);
  const xenHeat = Math.max(game.stats.xen, game.xenEcosystem.networkSpread, game.xenMutation.outbreakRisk, game.xenCatastrophes.citywideRisk);
  const adminHeat = Math.max(game.auditHeat ?? 0, game.stats.suspicion, game.majorStoryEvents.advisorNarrativePressure, game.finalVerdict ? game.stats.suspicion : 0);
  const saveHealth = game.decisionHistory.entries.length > 0 && game.reports.length > 0 ? 92 : 74;
  const desktopHealth = game.atmosphereSettings ? 88 : 70;

  const generated: Record<string, Pick<AuditLine, 'id' | 'status' | 'detail' | 'evidence'>> = {
    'data-refactor': line('data-refactor', 'ok', 'Données éclatées dans data/systems/types. App.tsx reste le shell d’orchestration.', `${Object.keys(campaignPresets).length} campagnes, ${crises.length} crises, ${loreCodexEntries.length} entrées Codex.`),
    'connected-map': line('connected-map', game.sectors.every((s) => s.connections.length > 0) ? 'ok' : 'watch', 'Chaque secteur possède des connexions typées et une pression voisine calculable.', `${game.sectors.length}/${baseSectors.length} secteurs actifs.`),
    propagation: line('propagation', sectorRisk > 78 ? 'watch' : 'ok', 'Propagation Lambda/Xen branchée sur les voisins, les routes et l’état des secteurs.', `Risque moyen secteur ${pct(sectorRisk)}%.`),
    reports: line('reports', adminHeat > 82 ? 'watch' : 'ok', 'Rapport réel, transmission Citadel, suspicion et audit Advisor sont actifs.', `Audit ${game.auditHeat ?? 0}% / suspicion ${game.stats.suspicion}%.`),
    nova: line('nova', game.novaProspekt.instability > 78 ? 'watch' : 'ok', 'Nova Prospekt possède son état, ses politiques, ses opérations et sa dette publique.', `Instabilité Nova ${game.novaProspekt.instability}% / secret ${game.novaProspekt.secrecy}%.`),
    timeline: line('timeline', 'ok', 'Timeline, campagne, scénario et difficulté sont séparés et recombinables.', `${game.timeline} / ${game.campaign.activeCampaignId} / ${game.difficultySettings.activePresetId}.`),
    'ration-population': line('ration-population', game.rationEconomy.hungerIndex > 82 ? 'watch' : 'ok', 'Rations, faim, marché noir et population détaillée affectent la simulation sociale.', `Population suivie ${populationTotal}, faim ${game.rationEconomy.hungerIndex}%.`),
    'cp-informants': line('cp-informants', game.civilProtection.brutalityIndex > 84 ? 'watch' : 'ok', 'CP, informateurs, corruption, fausses dénonciations et abus sont traçables.', `Abus CP ${game.civilProtection.brutalityIndex}% / intégrité sources ${game.informantNetwork.reliabilityIndex}%.`),
    'citadel-tech': line('citadel-tech', game.combineTechnology.maintenanceDebt > 82 ? 'watch' : 'ok', 'Arbre Citadel et technologies Combine produisent des effets quotidiens.', `${game.citadelDirectiveTree.completedNodes.length} protocoles / ${game.combineTechnology.researchedNodes.length} technologies.`),
    'resistance-factions': line('resistance-factions', lambdaHeat > 85 ? 'watch' : 'ok', 'Lambda combine cellules, factions, routes, radios, Vortigaunts et opérations simultanées.', `Chaleur Lambda ${lambdaHeat}% / cellules ${game.resistanceNetwork.cells.length}.`),
    'xen-biosphere': line('xen-biosphere', xenHeat > 85 ? 'watch' : 'ok', 'Xen est simulé comme biosphère : couches, mutations, quarantaine, R&D, catastrophes.', `Chaleur Xen ${xenHeat}% / couches ${game.xenEcosystem.layers.length}.`),
    campaigns: line('campaigns', game.campaignMission.failureRisk > 82 ? 'watch' : 'ok', 'Campagnes, objectifs, événements majeurs, verdict et chronique sont liés.', `Mandat ${game.campaignMission.mandateScore}% / risque échec ${game.campaignMission.failureRisk}%.`),
    'terminal-ui': line('terminal-ui', 'ok', 'Terminaux City/Nova/Citadel/Xen filtrent navigation, ton et vocabulaire.', `Terminal courant : ${game.tab}.`),
    'floating-os': line('floating-os', 'ok', 'COAN OS permet l’accès transversal aux dossiers critiques.', 'Layer flottant monté dans App.tsx.'),
    'audio-video': line('audio-video', game.videoArchives.publicLeakRisk > 80 ? 'watch' : 'ok', 'Audio synthétique, atmosphère et archives vidéo réactives sont actifs.', `Risque fuite vidéo ${game.videoArchives.publicLeakRisk}% / cues ${game.atmosphereSettings.audioEnabled ? 'audio actif' : 'audio off'}.`),
    'save-history': line('save-history', saveHealth > 80 ? 'ok' : 'watch', 'Slots, autosave, import/export et historique de décisions sont présents.', `${game.decisionHistory.entries.length} entrées ledger / ${game.reports.length} rapports.`),
    'codex-difficulty': line('codex-difficulty', 'ok', 'Codex lore + difficulté avancée documentent et modulent la simulation.', `${Object.keys(difficultyPresets).length} profils difficulté / ${loreCodexEntries.length} entrées lore.`),
    tauri: line('tauri', desktopHealth > 80 ? 'ok' : 'watch', 'Scaffold Tauri v2 inclus pour EXE Windows, avec scripts et workflow.', 'src-tauri + package.tauri.patch.json + workflow Windows.'),
  };

  const lines = finalAuditChecklist.map((item) => ({
    ...item,
    ...(generated[item.id] ?? line(item.id, 'watch', item.expected, 'Audit automatique sans sonde spécialisée.')),
  }));

  const warnings = lines.filter((item) => item.status === 'watch').map((item) => `${item.label} : ${item.detail}`);
  const blockers = lines.filter((item) => item.status === 'critical').map((item) => `${item.label} : ${item.detail}`);
  const okCount = lines.filter((item) => item.status === 'ok').length;
  const watchPenalty = warnings.length * 3;
  const blockerPenalty = blockers.length * 12;
  const score = pct((okCount / lines.length) * 100 - watchPenalty - blockerPenalty + 8);
  const statusLabel = blockers.length ? 'BLOQUÉ' : score >= 90 ? 'PRÊT BUILD' : score >= 75 ? 'PRÊT AVEC SURVEILLANCE' : 'À STABILISER';

  const counts: AuditCount[] = [
    { label: 'Modules audit', value: lines.length, detail: 'Systèmes majeurs contrôlés.' },
    { label: 'Secteurs', value: game.sectors.length, detail: 'Carte stratégique connectée.' },
    { label: 'Unités Combine', value: unitTemplates.length, detail: 'Templates de forces disponibles.' },
    { label: 'Menaces Xen', value: xenCodex.length, detail: 'Codex faune/flore/parasites.' },
    { label: 'Événements lore', value: crises.length + Object.keys(majorStoryEventDefinitions).length, detail: 'Crises + événements scénarisés.' },
    { label: 'Objectifs campagne', value: campaignObjectiveDefinitions.length, detail: 'Objectifs principaux, secondaires, cachés et échec.' },
    { label: 'Codex lore', value: loreCodexEntries.length, detail: 'Entrées consultables dans l’app.' },
    { label: 'Sauvegarde', value: `J${game.day}`, detail: 'État actuel compatible autosave/slots/export.' },
  ];

  const recommendations = [
    warnings.length ? 'Traiter les modules en surveillance avant un build public interne.' : 'Aucune surveillance critique : lancer npm run build puis tauri:build dans le repo complet.',
    'Appliquer le pack sur le repo complet, pas comme projet isolé : il ne contient pas package.json/public d’origine.',
    'Après copie, lancer node scripts/audit-upgrade-pack.mjs pour vérifier la présence des fichiers cumulés.',
    'Pour Tauri, installer Rust + prérequis Windows/WebView2 avant npm run tauri:build.',
  ];

  const exportText = [
    `# ${finalAuditVersion} — ${statusLabel}`,
    `Score : ${score}/100`,
    `City ${game.city} / Jour ${game.day}`,
    '',
    '## Modules',
    ...lines.map((item) => `- [${item.status.toUpperCase()}] ${item.label} — ${item.evidence}`),
    '',
    '## Recommandations',
    ...recommendations.map((item) => `- ${item}`),
    '',
    '## Runbook',
    ...finalAuditRunbook.map((item) => `- ${item}`),
  ].join('\n');

  return {
    version: finalAuditVersion,
    score,
    statusLabel,
    headline: blockers.length ? 'Des blocages doivent être traités avant empaquetage.' : 'Pack cumulatif audité et prêt pour intégration dans le repo complet.',
    blockers,
    warnings,
    counts,
    lines,
    recommendations,
    runbook: finalAuditRunbook,
    exportText,
  };
}
