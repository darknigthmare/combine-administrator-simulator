import type { TabId } from '../types/game';

export const uxPolishVersion = 'COAN-UX-44.0';

export type UxPolishSeverity = 'ok' | 'watch' | 'risk' | 'critical';
export type UxPolishDensity = 'comfortable' | 'compact' | 'dense';

export type UxQuickRouteDefinition = {
  id: string;
  label: string;
  shortLabel: string;
  targetTab: TabId;
  priority: number;
  reason: string;
  terminal: 'city' | 'nova' | 'citadel' | 'quarantine' | 'system';
};

export type UxModuleGroupDefinition = {
  id: string;
  label: string;
  tabs: TabId[];
  intent: string;
};

export type UxTooltipDefinition = {
  tab: TabId;
  label: string;
  tooltip: string;
  loreHint: string;
};

export type UxEmptyStateDefinition = {
  id: string;
  tab: TabId;
  title: string;
  body: string;
  actionLabel: string;
  actionTab: TabId;
};

export const uxDensityPresets: Record<UxPolishDensity, { label: string; description: string; cssClass: string }> = {
  comfortable: {
    label: 'Confort administratif',
    description: 'Espacement large pour lecture lente, utile en début de partie ou en mode Tauri plein écran.',
    cssClass: 'ux-density-comfortable',
  },
  compact: {
    label: 'Terminal compact',
    description: 'Navigation plus serrée pour garder les modules principaux visibles sans sacrifier la lisibilité.',
    cssClass: 'ux-density-compact',
  },
  dense: {
    label: 'Poste de crise dense',
    description: 'Mode haute densité quand City multiplie les dossiers urgents, idéal pour fin de campagne.',
    cssClass: 'ux-density-dense',
  },
};

export const uxModuleGroups: UxModuleGroupDefinition[] = [
  {
    id: 'onboarding',
    label: 'Démarrage / mandat',
    tabs: ['new_game', 'onboarding', 'difficulty', 'gameplay_balance'],
    intent: 'Préparer une campagne lisible avant d’exposer le joueur à toute la complexité COAN.',
  },
  {
    id: 'city_ops',
    label: 'City operations',
    tabs: ['dashboard', 'sectors', 'population', 'citizens', 'rationing', 'civil_protection', 'informants'],
    intent: 'Lire la ville comme un organisme social sous rationnement, surveillance et peur.',
  },
  {
    id: 'citadel_ops',
    label: 'Citadel / Overwatch',
    tabs: ['citadel', 'technology', 'overwatch', 'combine', 'reports', 'major_events'],
    intent: 'Piloter l’escalade verticale : directives, rapports, audit et présence militaire.',
  },
  {
    id: 'lambda_ops',
    label: 'Lambda / Résistance',
    tabs: ['resistance', 'vortigaunts', 'decision_history', 'archives', 'video_archives'],
    intent: 'Suivre la résistance non comme une barre unique, mais comme des preuves, routes, factions et mémoires.',
  },
  {
    id: 'xen_ops',
    label: 'Xen / Quarantaine',
    tabs: ['xen', 'xen_research', 'xen_catastrophes', 'vortigaunts'],
    intent: 'Traiter Xen comme biosphère évolutive : hôtes, spores, chaînes biologiques et catastrophes.',
  },
  {
    id: 'endgame',
    label: 'Archives / fins',
    tabs: ['campaigns', 'finale', 'chronicle', 'codex', 'system_audit', 'ux_polish', 'save_system'],
    intent: 'Contrôler la qualité du mandat et transformer la partie en archive finale cohérente.',
  },
];

export const uxQuickRoutes: UxQuickRouteDefinition[] = [
  { id: 'critical_dashboard', label: 'Retour monitoring COAN', shortLabel: 'COAN', targetTab: 'dashboard', priority: 10, reason: 'Vue globale des menaces actives.', terminal: 'city' },
  { id: 'sector_hotspot', label: 'Carte de City', shortLabel: 'Carte', targetTab: 'sectors', priority: 9, reason: 'Inspecter les secteurs chauds et les routes de propagation.', terminal: 'city' },
  { id: 'ration_stress', label: 'Rationnement', shortLabel: 'Rations', targetTab: 'rationing', priority: 8, reason: 'Vérifier faim, marché noir et allocations.', terminal: 'city' },
  { id: 'lambda_network', label: 'Résistance Lambda', shortLabel: 'Lambda', targetTab: 'resistance', priority: 8, reason: 'Identifier cellules, factions et opérations simultanées.', terminal: 'system' },
  { id: 'xen_biohazard', label: 'Quarantaine Xen', shortLabel: 'Xen', targetTab: 'xen', priority: 8, reason: 'Lire l’écosystème Xen, mutations et zones évolutives.', terminal: 'quarantine' },
  { id: 'nova_blackfile', label: 'Nova Prospekt', shortLabel: 'Nova', targetTab: 'nova', priority: 7, reason: 'Contrôler transferts, Biotics et secret administratif.', terminal: 'nova' },
  { id: 'citadel_reports', label: 'Rapports falsifiés', shortLabel: 'Rapports', targetTab: 'reports', priority: 7, reason: 'Comparer dossier réel et transmission Citadel.', terminal: 'citadel' },
  { id: 'advisor_pressure', label: 'Citadel Directives', shortLabel: 'Citadel', targetTab: 'citadel', priority: 7, reason: 'Lire directives, doctrine et risque Advisor.', terminal: 'citadel' },
  { id: 'save_slots', label: 'Sauvegardes', shortLabel: 'Save', targetTab: 'save_system', priority: 4, reason: 'Sauver avant une décision noire.', terminal: 'system' },
  { id: 'ux_polish', label: 'Polish UX', shortLabel: 'UX', targetTab: 'ux_polish', priority: 3, reason: 'Contrôler lisibilité, densité et finition Tauri.', terminal: 'system' },
];

export const uxTooltipLibrary: UxTooltipDefinition[] = [
  { tab: 'new_game', label: 'Nouvelle Partie', tooltip: 'Créer un mandat COAN complet avec City, campagne, timeline, difficulté et tutoriel.', loreHint: 'Un mandat Combine commence par une façade administrative avant les pertes réelles.' },
  { tab: 'dashboard', label: 'Terminal COAN', tooltip: 'Vue prioritaire : menaces, secteurs, objectifs, alertes et recommandations.', loreHint: 'COAN n’est pas neutre : il optimise la stabilité Combine, pas la justice.' },
  { tab: 'sectors', label: 'Carte de City', tooltip: 'Carte connectée : Lambda et Xen se propagent par routes, canaux, égouts et accès Citadel.', loreHint: 'City n’est pas une grille abstraite ; c’est un réseau de contrôles et de fuites.' },
  { tab: 'population', label: 'Population', tooltip: 'Groupes civils par secteur : affamés, suspects, travailleurs, familles de disparus, exposés Xen.', loreHint: 'La loyauté civile n’est pas l’obéissance visible.' },
  { tab: 'rationing', label: 'Rationnement', tooltip: 'Économie sociale : faim, marché noir, informateurs, punition et privilèges.', loreHint: 'Les rations sont une arme de contrôle Combine.' },
  { tab: 'civil_protection', label: 'Civil Protection', tooltip: 'Postes CP, brutalité, corruption, fausses accusations et agents compromis.', loreHint: 'Civil Protection est humaine : donc corruptible, brutale et instable.' },
  { tab: 'reports', label: 'Rapports falsifiés', tooltip: 'Dossier réel contre transmission Citadel ; attention aux audits Advisor.', loreHint: 'Mentir sauve parfois le mandat, mais crée une dette de vérité.' },
  { tab: 'nova', label: 'Nova Prospekt', tooltip: 'Interface blacksite : transferts, Biotics, interrogatoires, secret et mémoire de disparition.', loreHint: 'Nova Prospekt devient toujours plus qu’un lieu : un symbole.' },
  { tab: 'xen', label: 'Quarantaine Xen', tooltip: 'Biosphère Xen : spores, nids, hôtes, biomasse, zones scellées et Ravenholm-like.', loreHint: 'Xen est une écologie étrangère, pas une armée.' },
  { tab: 'xen_research', label: 'Recherche Xen', tooltip: 'Exploitation biologique Combine : spécimens, extract, spores, Headcrab Shell et incidents.', loreHint: 'La recherche Xen améliore la production tout en invitant la catastrophe.' },
  { tab: 'resistance', label: 'Résistance', tooltip: 'Réseau Lambda : cellules, factions, routes, radios, labos et opérations coordonnées.', loreHint: 'La Résistance survit par dispersion, pas par force frontale.' },
  { tab: 'vortigaunts', label: 'Vortigaunts / Biotics', tooltip: 'Captifs, cercles libres, Vortessence, aide anti-Xen et risque politique.', loreHint: 'Les Vortigaunts lient le biologique, le spirituel et le clandestin.' },
  { tab: 'atmosphere', label: 'Atmosphère', tooltip: 'Réglages visuels/audio : scanlines, glitch, cues synthétiques, réduction d’animations.', loreHint: 'L’interface doit être oppressive sans devenir illisible.' },
  { tab: 'ux_polish', label: 'Polish UX', tooltip: 'Contrôle de lisibilité : densité, tooltips, états vides, responsive et finition desktop/Tauri.', loreHint: 'Un bon terminal Combine doit rester brutal, mais exploitable.' },
];

export const uxEmptyStates: UxEmptyStateDefinition[] = [
  {
    id: 'no_crisis',
    tab: 'dashboard',
    title: 'Aucune crise active',
    body: 'Afficher les dossiers préventifs au lieu d’un vide : directive, secteur chaud, BreenCast recommandé et sauvegarde rapide.',
    actionLabel: 'Ouvrir Terminal COAN',
    actionTab: 'dashboard',
  },
  {
    id: 'no_reports',
    tab: 'reports',
    title: 'Aucun rapport transmis',
    body: 'Inviter à clôturer la journée pour générer le premier dossier réel/transmis.',
    actionLabel: 'Retour monitoring',
    actionTab: 'dashboard',
  },
  {
    id: 'no_verdict',
    tab: 'finale',
    title: 'Verdict non émis',
    body: 'Afficher les seuils de fin probables et la projection de mandat plutôt qu’un écran vide.',
    actionLabel: 'Voir équilibrage',
    actionTab: 'gameplay_balance',
  },
  {
    id: 'no_chronicle',
    tab: 'chronicle',
    title: 'Chronique non scellée',
    body: 'Préparer l’archive finale avec les derniers rapports, objectifs et preuves vidéo.',
    actionLabel: 'Voir événements majeurs',
    actionTab: 'major_events',
  },
  {
    id: 'no_video',
    tab: 'video_archives',
    title: 'Flux vidéo faible',
    body: 'Mettre en avant les caméras sentinelles et le niveau de corruption même sans clip critique.',
    actionLabel: 'Ouvrir archives vidéo',
    actionTab: 'video_archives',
  },
];

export const uxPolishRunbook = [
  'Ouvrir Nouvelle Partie et vérifier que la preview COAN reste lisible en 1366×768.',
  'Tester chaque terminal spécialisé : City, Nova, Citadel, Quarantine.',
  'Vérifier que la sidebar ne force pas le joueur à scroller avant les modules prioritaires.',
  'Contrôler que les tooltips expliquent les modules sans casser l’immersion lore.',
  'Passer l’app en Tauri plein écran et vérifier la densité des cartes/panneaux.',
  'Déclencher une crise Xen et une crise Lambda puis vérifier les couleurs, alertes et quick routes.',
  'Tester un écran vide : aucun rapport, verdict absent, chronique absente.',
  'Faire une clôture de journée et vérifier que le joueur comprend quoi faire ensuite.',
];
