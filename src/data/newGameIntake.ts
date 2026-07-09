import type { CampaignId, DifficultyPresetId, NewGameIntakeDoctrine, NewGameIntakeDoctrineId, NewGameIntakePhase, OnboardingTrackId, ProfileId, ScenarioId, TimelineId } from '../types/game';

export const newGameIntakeVersion = 'COAN-NEW-GAME-43';

export const newGameIntakePhases: NewGameIntakePhase[] = [
  {
    id: 'identity',
    title: 'Identification de City',
    label: 'CITY-ID',
    description: 'Définir le numéro de City, la façade administrative et le dossier public transmis aux relais civiques.',
    warning: 'Un numéro de City n’est pas cosmétique : les campagnes et timelines suggèrent des pressions différentes.',
  },
  {
    id: 'era',
    title: 'Fenêtre chronologique',
    label: 'TIMELINE',
    description: 'Choisir la période du lore Half-Life : occupation fraîche, période Alyx, pré-HL2, post-Nova ou Uprising.',
    warning: 'Une timeline Uprising ou post-Nova augmente naturellement Lambda et la surveillance Advisor.',
  },
  {
    id: 'mandate',
    title: 'Mandat opérationnel',
    label: 'MANDATE',
    description: 'Combiner campagne longue, scénario local, profil de gouvernance et difficulté COAN.',
    warning: 'Les campagnes non libres imposent leurs recommandations pour garder une cohérence narrative.',
  },
  {
    id: 'training',
    title: 'Piste tutoriel',
    label: 'INTAKE',
    description: 'Associer une piste pédagogique au démarrage pour guider la première journée sans masquer les systèmes avancés.',
    warning: 'Le tutoriel peut lancer une partie guidée directement depuis une doctrine COAN préconfigurée.',
  },
  {
    id: 'preview',
    title: 'Aperçu conséquences',
    label: 'PREVIEW',
    description: 'Lire les pressions initiales Lambda, Xen, Citadel, rations, Nova Prospekt et stabilité avant initialisation.',
    warning: 'Une configuration cohérente ne veut pas dire facile : elle veut dire prévisible administrativement.',
  },
];

export const newGameIntakeDoctrines: Record<NewGameIntakeDoctrineId, NewGameIntakeDoctrine> = {
  manual: {
    id: 'manual',
    title: 'Configuration manuelle COAN',
    subtitle: 'L’administrateur choisit chaque paramètre sans verrou narratif.',
    campaignId: 'custom_city_administration',
    scenario: 'standard',
    timeline: 'pre_hl2',
    profile: 'loyalist',
    difficultyPresetId: 'standard_occupation',
    onboardingTrackId: 'standard_command',
    citySuggestion: '17',
    doctrineLine: 'Sandbox Combine : parfait pour tester les modules ou créer une City personnalisée.',
    riskLine: 'Risque dépendant des choix manuels. Les campagnes non libres peuvent surcharger la cohérence si mélangées au hasard.',
    tags: ['sandbox', 'city', 'manual'],
  },
  canonical_city17: {
    id: 'canonical_city17',
    title: 'City 17 vitrine pré-HL2',
    subtitle: 'Façade de normalité Combine, Résistance encore clandestine.',
    campaignId: 'city17_pre_hl2',
    scenario: 'pre_hl2',
    timeline: 'pre_hl2',
    profile: 'loyalist',
    difficultyPresetId: 'standard_occupation',
    onboardingTrackId: 'standard_command',
    citySuggestion: '17',
    doctrineLine: 'Maintenir l’illusion d’une City modèle : rationnement, BreenCast, canaux surveillés, Lambda invisible.',
    riskLine: 'Très lore-friendly : pression faible au départ, mais toute contradiction publique peut devenir explosive.',
    tags: ['city17', 'pre-hl2', 'breencast'],
  },
  alyx_quarantine: {
    id: 'alyx_quarantine',
    title: 'Quarantine Zone — période Alyx',
    subtitle: 'Xen visible, Biotics sensibles, biosécurité prioritaire.',
    campaignId: 'contaminated_port_city',
    scenario: 'quarantine',
    timeline: 'alyx_era',
    profile: 'quarantine',
    difficultyPresetId: 'quarantine_blacksite',
    onboardingTrackId: 'alyx_quarantine_intake',
    citySuggestion: '17',
    doctrineLine: 'Lire Xen comme une biosphère : spores, hôtes, quarantaines, mutations et Vortessence contrôlée.',
    riskLine: 'Xen démarre plus haut et peut créer rapidement des zones scellées ou Ravenholm-like.',
    tags: ['alyx', 'xen', 'quarantine'],
  },
  nova_blackfile: {
    id: 'nova_blackfile',
    title: 'Dossier noir Nova Prospekt',
    subtitle: 'Transferts, disparitions, manifestes Razor et dette politique.',
    campaignId: 'post_nova_city',
    scenario: 'post_nova',
    timeline: 'post_nova_prospekt',
    profile: 'collaborator',
    difficultyPresetId: 'hardline_city',
    onboardingTrackId: 'nova_blackfile_intake',
    citySuggestion: '24',
    doctrineLine: 'Transformer l’intake Nova en stabilité apparente sans laisser les disparitions devenir mythe Lambda.',
    riskLine: 'Audit, suspicion et martyrologie Lambda plus sévères. Recommandé pour systèmes rapports/archives/Nova.',
    tags: ['nova', 'razor', 'advisor'],
  },
  uprising_survival: {
    id: 'uprising_survival',
    title: 'Uprising — corridor Citadel',
    subtitle: 'Soulèvement ouvert, Overwatch, secteurs sacrifiables.',
    campaignId: 'uprising_city',
    scenario: 'uprising',
    timeline: 'uprising',
    profile: 'tyrant',
    difficultyPresetId: 'uprising_nightmare',
    onboardingTrackId: 'uprising_survival_cell',
    citySuggestion: '17',
    doctrineLine: 'Tenir les corridors critiques, pas toute la ville. Chaque Strider sauve un axe et détruit une partie de City.',
    riskLine: 'Configuration extrême : pertes, fins rapides et catastrophes en chaîne probables.',
    tags: ['uprising', 'overwatch', 'strider'],
  },
  double_game: {
    id: 'double_game',
    title: 'Double jeu humanité préservée',
    subtitle: 'Façade Combine, secours clandestin et suspicion Citadel.',
    campaignId: 'isolated_citadel_city',
    scenario: 'dormant',
    timeline: 'citadel_collapse',
    profile: 'sympathizer',
    difficultyPresetId: 'standard_occupation',
    onboardingTrackId: 'sympathizer_double_game',
    citySuggestion: '12',
    doctrineLine: 'Aider des civils sans déclencher remplacement Advisor : rapports couverts, rations discrètes, libérations filtrées.',
    riskLine: 'Moins brutal au départ, mais le moindre audit peut révéler la façade.',
    tags: ['sympathizer', 'lambda', 'secret'],
  },
};

export const newGameIntakeDoctrineOrder: NewGameIntakeDoctrineId[] = [
  'canonical_city17',
  'alyx_quarantine',
  'nova_blackfile',
  'uprising_survival',
  'double_game',
  'manual',
];

export const newGameIntakeScenarioLabels: Record<ScenarioId, string> = {
  pre_hl2: 'Pré-HL2 : occupation froide',
  standard: 'Occupation standard',
  dormant: 'Insurrection dormante',
  quarantine: 'Zone de quarantaine',
  post_nova: 'Après Nova Prospekt',
  uprising: 'Soulèvement urbain',
};

export const newGameIntakeProfileLabels: Record<ProfileId, string> = {
  loyalist: 'Loyaliste Combine',
  technocrat: 'Technocrate administratif',
  tyrant: 'Tyran local',
  collaborator: 'Collaborateur opportuniste',
  sympathizer: 'Sympathisant secret',
  quarantine: 'Gestionnaire quarantaine',
};

export const newGameIntakeThreatLabels = {
  low: 'contrôlé',
  medium: 'tendu',
  high: 'critique',
  extreme: 'rupture probable',
} as const;

export const newGameIntakeQuickTrackMap: Record<OnboardingTrackId, NewGameIntakeDoctrineId> = {
  standard_command: 'canonical_city17',
  alyx_quarantine_intake: 'alyx_quarantine',
  nova_blackfile_intake: 'nova_blackfile',
  uprising_survival_cell: 'uprising_survival',
  sympathizer_double_game: 'double_game',
};

export const newGameIntakeRecommendedCombos: Array<{ label: string; city: string; campaignId: CampaignId; difficultyPresetId: DifficultyPresetId; note: string }> = [
  { label: 'Premier mandat lisible', city: '17', campaignId: 'city17_pre_hl2', difficultyPresetId: 'standard_occupation', note: 'Progression canonique, Lambda caché, Xen encore localisé.' },
  { label: 'Biohazard avancé', city: '24', campaignId: 'contaminated_port_city', difficultyPresetId: 'quarantine_blacksite', note: 'Idéal pour tester écosystème Xen, mutations et quarantaines.' },
  { label: 'Simulation Nova', city: '24', campaignId: 'post_nova_city', difficultyPresetId: 'hardline_city', note: 'Centré sur dossiers noirs, rapports falsifiés et martyrs Lambda.' },
  { label: 'Stress test Uprising', city: '17', campaignId: 'uprising_city', difficultyPresetId: 'uprising_nightmare', note: 'Réservé aux tests d’équilibrage et fins rapides.' },
];
