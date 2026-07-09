/**
 * Step 31 — COAN Dashboard Terminal data.
 * Static labels and doctrine copy used by the full terminal-style dashboard.
 */
import type { TabId } from '../types/game';

export type DashboardAlertSource =
  | 'COAN'
  | 'Citadel'
  | 'Civil Protection'
  | 'Overwatch'
  | 'Nova Prospekt'
  | 'Ration Control'
  | 'Lambda Watch'
  | 'Xen Biohazard'
  | 'Advisor Review'
  | 'BreenCast';

export type DashboardAlertTone = 'combine' | 'lambda' | 'xen' | 'nova' | 'citadel' | 'ration' | 'civil' | 'critical';

export type DashboardAlertTemplate = {
  id: string;
  source: DashboardAlertSource;
  tone: DashboardAlertTone;
  label: string;
  body: string;
  targetTab: TabId;
  recommendedAction: string;
};

export const dashboardAlertTemplates: DashboardAlertTemplate[] = [
  {
    id: 'lambda-network-surge',
    source: 'Lambda Watch',
    tone: 'lambda',
    label: 'Réseau Lambda en consolidation',
    body: 'Les cellules clandestines commencent à partager radios, tunnels, caches et récits de martyrs.',
    targetTab: 'resistance',
    recommendedAction: 'Isoler canaux/égouts, frapper radios pirates, éviter une punition collective visible.',
  },
  {
    id: 'xen-ecosystem-surge',
    source: 'Xen Biohazard',
    tone: 'xen',
    label: 'Biosphère Xen en expansion',
    body: 'Les couches organiques agissent comme une géographie parasite plutôt qu’un simple incident biologique.',
    targetTab: 'xen',
    recommendedAction: 'Prioriser confinement, bioscanners, Vortigaunts encadrés et coupure des routes souterraines.',
  },
  {
    id: 'advisor-audit-heat',
    source: 'Advisor Review',
    tone: 'citadel',
    label: 'Chaleur d’audit Advisor élevée',
    body: 'Les transmissions Citadel, dossiers Nova et chiffres publics commencent à diverger dangereusement.',
    targetTab: 'reports',
    recommendedAction: 'Réduire falsification, stabiliser Citadel, produire une preuve de conformité mesurable.',
  },
  {
    id: 'nova-visible',
    source: 'Nova Prospekt',
    tone: 'nova',
    label: 'Nova Prospekt devient trop visible',
    body: 'Les familles de disparus, manifestes Razor et dossiers Biotics créent une mémoire sociale exploitable par Lambda.',
    targetTab: 'nova',
    recommendedAction: 'Réduire instabilité, nettoyer manifestes, masquer transferts par récit sanitaire contrôlé.',
  },
  {
    id: 'ration-social-failure',
    source: 'Ration Control',
    tone: 'ration',
    label: 'Rationnement socialement instable',
    body: 'La faim ne produit pas seulement de la désobéissance : elle fabrique marché noir, délation, corruption et colère Lambda.',
    targetTab: 'rationing',
    recommendedAction: 'Redistribuer, casser le marché noir, éviter les coupes punitives dans les secteurs déjà martyrs.',
  },
  {
    id: 'cp-corruption-brutality',
    source: 'Civil Protection',
    tone: 'civil',
    label: 'Civil Protection hors contrôle',
    body: 'La brutalité et la corruption CP produisent de la peur immédiate mais abîment le renseignement et la loyauté.',
    targetTab: 'civil_protection',
    recommendedAction: 'Lancer audit CP ciblé, punir agents compromis, réorienter les patrouilles vers des preuves réelles.',
  },
  {
    id: 'citadel-mandate-failure',
    source: 'Citadel',
    tone: 'citadel',
    label: 'Mandat Citadel en danger',
    body: 'La directive active et les objectifs de campagne approchent du seuil d’échec administratif.',
    targetTab: 'citadel',
    recommendedAction: 'Activer protocole Citadel compatible, prioriser l’objectif principal avant les pertes de façade.',
  },
  {
    id: 'major-story-unresolved',
    source: 'COAN',
    tone: 'critical',
    label: 'Arc narratif majeur non contenu',
    body: 'Un événement majeur est suffisamment visible pour transformer une crise technique en mémoire historique de City.',
    targetTab: 'major_events',
    recommendedAction: 'Choisir doctrine de crise, contenir le récit public, engager Overwatch seulement si le coût politique est acceptable.',
  },
  {
    id: 'breencast-opportunity',
    source: 'BreenCast',
    tone: 'combine',
    label: 'Fenêtre de propagande exploitable',
    body: 'Le récit public peut encore absorber une crise si la doctrine est adaptée à la menace dominante.',
    targetTab: 'propaganda',
    recommendedAction: 'Diffuser le BreenCast recommandé et éviter les messages qui contredisent les archives COAN.',
  },
];

export const dashboardTransmissionLabels = {
  citadel: 'Transmission Citadel',
  breencast: 'BreenCast public',
  nova: 'Liaison Nova Prospekt',
  quarantine: 'Quarantine relay',
  coan: 'COAN restricted archive',
} as const;

export const dashboardDossierCopy = {
  city: 'Résumé de contrôle urbain, pertes, stabilité et mandat administratif.',
  sectors: 'Secteurs critiques à surveiller sur mini-carte persistante.',
  lambda: 'Dossier anti-citoyen : cellules, factions, radios, tunnels et opérations simultanées.',
  xen: 'Dossier biohazard : couches Xen, mutations, quarantaine, recherche et catastrophes rares.',
  nova: 'Dossier noir : transferts, Biotics, Razor Train, interrogation et mémoire sociale.',
  reports: 'Dossier audit : différence entre vérité COAN et transmission officielle Citadel.',
};
