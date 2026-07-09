import type { GameState, TabId } from '../types/game';
import { uxDensityPresets, uxEmptyStates, uxModuleGroups, uxPolishRunbook, uxPolishVersion, uxQuickRoutes, uxTooltipLibrary, type UxPolishDensity, type UxPolishSeverity } from '../data/uxPolish';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

export type UxPolishMetric = {
  id: string;
  label: string;
  value: number;
  severity: UxPolishSeverity;
  description: string;
  recommendation: string;
};

export type UxPolishRoute = {
  id: string;
  label: string;
  shortLabel: string;
  targetTab: TabId;
  priority: number;
  reason: string;
  active: boolean;
  tone: 'city' | 'nova' | 'citadel' | 'quarantine' | 'system';
};

export type UxPolishReport = {
  version: string;
  score: number;
  statusLabel: string;
  density: UxPolishDensity;
  headline: string;
  metrics: UxPolishMetric[];
  quickRoutes: UxPolishRoute[];
  moduleGroups: Array<{ id: string; label: string; intent: string; total: number; active: number; tabs: TabId[] }>;
  navHints: Array<{ tab: TabId; label: string; tooltip: string; loreHint: string }>;
  emptyStates: typeof uxEmptyStates;
  warnings: string[];
  runbook: string[];
  exportText: string;
};

function severityFor(value: number, reverse = false): UxPolishSeverity {
  const v = reverse ? 100 - value : value;
  if (v >= 85) return 'ok';
  if (v >= 68) return 'watch';
  if (v >= 45) return 'risk';
  return 'critical';
}

function chooseDensity(game: GameState, navLength: number): UxPolishDensity {
  const pressure = game.stats.rebel + game.stats.xen + game.auditHeat + game.campaignMission.failureRisk + game.majorStoryEvents.citywideHeat;
  if (pressure > 330 || navLength > 20) return 'dense';
  if (pressure > 210 || navLength > 14) return 'compact';
  return 'comfortable';
}

export function buildUxPolishReport(game: GameState, nav: Array<[TabId, string]> = []): UxPolishReport {
  const navLength = nav.length || 1;
  const totalModules = uxModuleGroups.reduce((sum, group) => sum + group.tabs.length, 0);
  const activeGroupCounts = uxModuleGroups.map((group) => ({
    id: group.id,
    label: group.label,
    intent: group.intent,
    total: group.tabs.length,
    active: group.tabs.filter((tab) => nav.some(([id]) => id === tab)).length,
    tabs: group.tabs,
  }));

  const navigationClarity = clamp(100 - Math.max(0, navLength - 11) * 4 + (nav.some(([id]) => id === 'dashboard') ? 8 : 0));
  const crisisHierarchy = clamp(100 - (game.crisis ? 0 : 6) - Math.max(0, game.majorStoryEvents.citywideHeat - 55) * 0.45 - Math.max(0, game.xenCatastrophes.totalCatastropheRisk - 55) * 0.25);
  const terminalIdentity = clamp(78 + (game.tab === 'nova' ? 8 : 0) + (game.tab === 'xen' || game.tab === 'xen_research' ? 6 : 0) + (game.tab === 'citadel' ? 6 : 0));
  const actionReadability = clamp(100 - Math.max(0, game.log.length - 80) * 0.16 - Math.max(0, game.reports.length - 12) * 0.9);
  const desktopReadiness = clamp(82 + (game.atmosphereSettings.reducedMotion ? 6 : 0) - (game.atmosphereSettings.glitch ? 3 : 0));
  const tauriReadiness = clamp(88 - (game.atmosphereSettings.audioEnabled ? 2 : 0));
  const emptyStateCoverage = clamp(78 + (game.reports.length === 0 ? 8 : 0) + (!game.finalVerdict ? 6 : 0));
  const loreTooltips = clamp(84 + Math.min(10, uxTooltipLibrary.length));

  const metrics: UxPolishMetric[] = [
    {
      id: 'navigation_clarity',
      label: 'Clarté navigation',
      value: navigationClarity,
      severity: severityFor(navigationClarity),
      description: `${navLength} modules visibles dans ${game.tab}. Le terminal actif filtre les onglets pour limiter l’effet catalogue.`,
      recommendation: navigationClarity < 70 ? 'Conserver les modules denses dans les terminaux spécialisés et passer par les quick routes.' : 'Navigation terminal lisible : garder cette hiérarchie avant build Tauri.',
    },
    {
      id: 'crisis_hierarchy',
      label: 'Hiérarchie des crises',
      value: crisisHierarchy,
      severity: severityFor(crisisHierarchy),
      description: `Événements majeurs ${game.majorStoryEvents.citywideHeat}% · catastrophes Xen ${game.xenCatastrophes.totalCatastropheRisk}% · crise active ${game.crisis ? 'oui' : 'non'}.`,
      recommendation: crisisHierarchy < 70 ? 'Garder le flux d’alertes critique visible et réduire le bruit des panneaux secondaires.' : 'Les crises ont une priorité visuelle correcte.',
    },
    {
      id: 'terminal_identity',
      label: 'Identité terminal',
      value: terminalIdentity,
      severity: severityFor(terminalIdentity),
      description: 'City, Nova, Citadel et Quarantine possèdent chacun une couleur, un vocabulaire et une priorité opérationnelle.',
      recommendation: 'Maintenir des intitulés courts dans la sidebar, mais conserver les briefs longs dans les bannières terminal.',
    },
    {
      id: 'action_readability',
      label: 'Lisibilité actions/logs',
      value: actionReadability,
      severity: severityFor(actionReadability),
      description: `${game.log.length} lignes de log et ${game.reports.length} rapports en mémoire locale.`,
      recommendation: actionReadability < 68 ? 'Utiliser Historique décisions et Archives pour désengorger le dashboard.' : 'Logs encore lisibles, export COAN recommandé avant partie longue.',
    },
    {
      id: 'desktop_readiness',
      label: 'Responsive desktop',
      value: desktopReadiness,
      severity: severityFor(desktopReadiness),
      description: `Mode animations réduites ${game.atmosphereSettings.reducedMotion ? 'actif' : 'inactif'} · glitch ${game.atmosphereSettings.glitch ? 'actif' : 'inactif'}.`,
      recommendation: 'Priorité desktop/Tauri : panels scrollables, sidebar compacte et textes qui ne cassent pas la grille.',
    },
    {
      id: 'tauri_readiness',
      label: 'Finition Tauri',
      value: tauriReadiness,
      severity: severityFor(tauriReadiness),
      description: 'Le pack contient le scaffold Tauri et garde les sons synthétiques locaux sans assets officiels.',
      recommendation: 'Tester npm run tauri:dev puis tauri:build sur Windows après application du pack.',
    },
    {
      id: 'empty_states',
      label: 'États vides',
      value: emptyStateCoverage,
      severity: severityFor(emptyStateCoverage),
      description: `${uxEmptyStates.length} états vides documentés pour éviter les écrans morts pendant une nouvelle partie.`,
      recommendation: 'Garder une action conseillée dans chaque module sans donnée : rapport, verdict, chronique, flux vidéo.',
    },
    {
      id: 'lore_tooltips',
      label: 'Tooltips lore',
      value: loreTooltips,
      severity: severityFor(loreTooltips),
      description: `${uxTooltipLibrary.length} infobulles lore/UX prêtes pour les modules les plus importants.`,
      recommendation: 'Utiliser les tooltips pour expliquer sans casser l’immersion : phrases froides et administratives.',
    },
  ];

  const pressureRoutes = uxQuickRoutes
    .map((route) => {
      let score = route.priority;
      if (route.targetTab === 'xen' && game.stats.xen > 55) score += 6;
      if (route.targetTab === 'resistance' && game.stats.rebel > 55) score += 6;
      if (route.targetTab === 'nova' && game.novaProspekt.instability > 55) score += 5;
      if (route.targetTab === 'reports' && (game.auditHeat > 55 || game.reports[0]?.auditDiscovered)) score += 5;
      if (route.targetTab === 'rationing' && game.rationEconomy.hungerIndex > 55) score += 4;
      if (route.targetTab === 'citadel' && game.stats.suspicion > 55) score += 4;
      return { ...route, priority: score, active: game.tab === route.targetTab, tone: route.terminal };
    })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 6);

  const warnings: string[] = [];
  if (navigationClarity < 70) warnings.push('Navigation très chargée : conserver le terminal filtré et éviter d’ajouter de nouveaux onglets racine sans groupe.');
  if (crisisHierarchy < 65) warnings.push('Crises multiples : les alertes critiques doivent rester au-dessus des panneaux secondaires.');
  if (game.reports.length === 0) warnings.push('Aucun rapport : prévoir un état vide pédagogique avant la première clôture de journée.');
  if (!game.finalVerdict) warnings.push('Verdict absent : le module finale doit expliquer les seuils plutôt que rester silencieux.');
  if (game.atmosphereSettings.glitch && !game.atmosphereSettings.reducedMotion && (game.stats.xen > 70 || game.majorStoryEvents.citywideHeat > 70)) warnings.push('Glitch + crise haute : surveiller la lisibilité sur petit écran/Tauri.');

  const score = clamp(metrics.reduce((sum, metric) => sum + metric.value, 0) / metrics.length);
  const density = chooseDensity(game, navLength);
  const statusLabel = score >= 88 ? 'Interface prête build' : score >= 74 ? 'Polish surveillé' : score >= 58 ? 'Lisibilité sous tension' : 'Refonte visuelle requise';
  const headline = `${uxDensityPresets[density].label} · ${statusLabel} · ${totalModules} modules regroupés en ${uxModuleGroups.length} familles COAN.`;
  const exportText = [
    `${uxPolishVersion} — UX POLISH REPORT — CITY ${game.city}`,
    `Score : ${score}/100 — ${statusLabel}`,
    `Densité : ${uxDensityPresets[density].label}`,
    '',
    ...metrics.map((metric) => `- ${metric.label}: ${metric.value}/100 (${metric.severity}) — ${metric.recommendation}`),
    '',
    'Quick routes prioritaires:',
    ...pressureRoutes.map((route) => `- ${route.shortLabel}: ${route.reason}`),
    '',
    'Warnings:',
    ...(warnings.length ? warnings.map((warning) => `- ${warning}`) : ['- Aucun warning critique.']),
  ].join('\n');

  return {
    version: uxPolishVersion,
    score,
    statusLabel,
    density,
    headline,
    metrics,
    quickRoutes: pressureRoutes,
    moduleGroups: activeGroupCounts,
    navHints: uxTooltipLibrary,
    emptyStates: uxEmptyStates,
    warnings,
    runbook: uxPolishRunbook,
    exportText,
  };
}
