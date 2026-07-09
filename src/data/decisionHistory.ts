import type { DecisionHistoryCategory, DecisionHistoryFilterId, DecisionHistorySource } from '../types/game';

export const decisionHistoryCategoryLabels: Record<DecisionHistoryCategory, string> = {
  directive: 'Directive / Citadel',
  sector: 'Secteur / City',
  deployment: 'Déploiement Combine',
  rationing: 'Rationnement',
  nova: 'Nova Prospekt',
  propaganda: 'BreenCast / propagande',
  report: 'Rapport réel/transmis',
  citizen: 'Registre civil',
  informant: 'Délation / informateurs',
  civil_protection: 'Civil Protection',
  technology: 'Technologie Combine',
  resistance: 'Résistance Lambda',
  vortigaunt: 'Vortigaunts / Biotics',
  xen: 'Xen / quarantaine',
  campaign: 'Campagne / objectifs',
  story_event: 'Événement majeur',
  video: 'Archives vidéo',
  atmosphere: 'Atmosphère / terminal',
  save: 'Sauvegarde / import',
  system: 'COAN système',
};

export const decisionHistorySourceLabels: Record<DecisionHistorySource, string> = {
  operator: 'Opérateur administrateur',
  coan: 'COAN Node',
  citadel: 'Citadel relay',
  advisor: 'Advisor audit',
  nova: 'Nova Prospekt intake',
  civil_protection: 'Civil Protection desk',
  quarantine: 'Quarantine relay',
  lambda: 'Lambda / anti-citizen',
  xen: 'Biohazard Xen',
  archive: 'Archive terminal',
};

export const decisionHistoryFilterLabels: Record<DecisionHistoryFilterId, string> = {
  all: 'Tous les dossiers',
  operator: 'Décisions opérateur',
  hidden: 'Conséquences cachées',
  reports: 'Rapports / falsification',
  xen: 'Xen / quarantaine',
  lambda: 'Lambda / résistance',
  nova: 'Nova Prospekt',
  citadel: 'Citadel / Advisor',
  civil: 'Population / CP / rations',
};

export const decisionHistorySeverityLabels: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'routine',
  2: 'surveillance',
  3: 'sensible',
  4: 'critique',
  5: 'dossier noir',
};

export const decisionHistoryExportHeader = [
  'COAN DECISION LEDGER / CITY CIVIL AUTHORITY',
  'Chaque entrée conserve la version opérateur, les effets visibles et les traces cachées détectables par audit.',
  'Les rapports transmis à la Citadelle restent comparés aux dossiers réels quand la falsification est active.',
];
