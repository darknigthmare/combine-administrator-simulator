import type { GameplayBalanceBand, GameplayBalanceMetricDefinition, LongRunPlaytestScenario } from '../types/game';

export const gameplayBalanceVersion = 'COAN-BALANCE-V5.41';

export const gameplayBalanceBands: Record<GameplayBalanceBand, { label: string; description: string; tone: 'stable' | 'watch' | 'danger' | 'critical' }> = {
  underpowered: {
    label: 'Sous-pression faible',
    description: 'Le système ne pèse pas assez sur le joueur : il risque de devenir décoratif.',
    tone: 'watch',
  },
  stable: {
    label: 'Zone jouable',
    description: 'La pression est lisible, punitive sans être injuste, et laisse plusieurs styles viables.',
    tone: 'stable',
  },
  tense: {
    label: 'Tension haute',
    description: 'Le système devient central. Il reste acceptable si des contre-mesures existent.',
    tone: 'danger',
  },
  runaway: {
    label: 'Spirale critique',
    description: 'Le système peut engloutir la partie. À réserver aux fins, catastrophes ou difficultés extrêmes.',
    tone: 'critical',
  },
};

export const gameplayBalanceMetricDefinitions: GameplayBalanceMetricDefinition[] = [
  {
    id: 'lambda_pressure',
    label: 'Pression Lambda',
    targetLow: 25,
    targetHigh: 68,
    dangerHigh: true,
    description: 'Mesure si la Résistance progresse comme un réseau clandestin crédible sans transformer chaque partie en guerre ouverte trop tôt.',
    loreIntent: 'Lambda doit être latent, mobile et intelligent avant de devenir insurrectionnel.',
  },
  {
    id: 'xen_pressure',
    label: 'Pression Xen',
    targetLow: 18,
    targetHigh: 62,
    dangerHigh: true,
    description: 'Surveille la biosphère Xen, les mutations, quarantaines, recherches et catastrophes biologiques.',
    loreIntent: 'Xen doit se sentir organique et hostile, pas comme une faction militaire classique.',
  },
  {
    id: 'citadel_pressure',
    label: 'Pression Citadel / Advisor',
    targetLow: 20,
    targetHigh: 70,
    dangerHigh: true,
    description: 'Évalue si les audits, directives et rapports falsifiés pèsent assez sans remplacer le joueur trop vite.',
    loreIntent: 'La Citadelle doit être lointaine, froide et écrasante, mais pas arbitraire.',
  },
  {
    id: 'civil_stress',
    label: 'Stress civil',
    targetLow: 22,
    targetHigh: 72,
    dangerHigh: true,
    description: 'Agrège faim, fatigue, peur, loyauté, pertes, familles de disparus et pression CP.',
    loreIntent: 'Les citoyens doivent subir rationnement et surveillance, tout en gardant une mémoire sociale dangereuse.',
  },
  {
    id: 'economy_viability',
    label: 'Viabilité économie/rations',
    targetLow: 35,
    targetHigh: 85,
    dangerHigh: false,
    description: 'Vérifie que production, rations et autonomie alimentaire permettent des décisions politiques réelles.',
    loreIntent: 'La faim doit être une arme Combine, mais une ville qui meurt trop vite ne produit plus rien.',
  },
  {
    id: 'control_apparatus',
    label: 'Appareil de contrôle',
    targetLow: 35,
    targetHigh: 82,
    dangerHigh: false,
    description: 'Mesure l’efficacité réelle de Civil Protection, informateurs, technologies, Overwatch et terminaux.',
    loreIntent: 'Le contrôle Combine doit être puissant, mais son usage doit générer peur, corruption et contre-réaction.',
  },
  {
    id: 'moral_debt',
    label: 'Dette morale / mémoire noire',
    targetLow: 10,
    targetHigh: 65,
    dangerHigh: true,
    description: 'Suit les pertes civiles, Nova Prospekt, zones scellées, Ravenholm-like, Biotics et dissimulation.',
    loreIntent: 'Chaque victoire administrative Combine doit laisser une trace sale dans les archives.',
  },
  {
    id: 'runaway_risk',
    label: 'Risque de spirale incontrôlable',
    targetLow: 0,
    targetHigh: 58,
    dangerHigh: true,
    description: 'Agrège les systèmes qui peuvent s’emballer ensemble : Lambda + Xen + faim + audit + Nova + catastrophe.',
    loreIntent: 'Les fins catastrophiques doivent être méritées par accumulation, pas par hasard opaque.',
  },
];

export const longRunPlaytestScenarios: LongRunPlaytestScenario[] = [
  {
    id: 'model_city_30d',
    name: 'City modèle / 30 jours',
    setup: 'Occupation standard, loyaliste Combine, difficulté standard, campagne administration libre.',
    expectedArc: 'La ville doit rester contrôlable, mais la faim, les faux rapports et Lambda doivent créer plusieurs arbitrages.',
    warningSigns: ['Stabilité > 85 sans coût moral', 'Lambda < 10 pendant toute la partie', 'Aucune directive Citadel ratée'],
  },
  {
    id: 'alyx_quarantine_20d',
    name: 'Quarantaine Alyx-era / 20 jours',
    setup: 'Timeline Half-Life: Alyx, scénario zone de quarantaine, profil gestionnaire quarantaine.',
    expectedArc: 'Xen doit dominer la pression, mais les Vortigaunts et le confinement doivent offrir des réponses coûteuses.',
    warningSigns: ['Xen < 20 après 10 jours', 'Aucune chaîne mutation déclenchée', 'Quarantaine sans civils piégés'],
  },
  {
    id: 'post_nova_15d',
    name: 'Après Nova Prospekt / 15 jours',
    setup: 'Campagne post-Nova, scénario après Nova Prospekt, profil collaborateur ou tyran.',
    expectedArc: 'La mémoire Nova doit alimenter Lambda, audits et familles de disparus.',
    warningSigns: ['Nova secret > 90 en permanence', 'Aucun martyr Lambda', 'Transferts gratuits sans suspicion'],
  },
  {
    id: 'uprising_survival_10d',
    name: 'Uprising / survie 10 jours',
    setup: 'Timeline Uprising, campagne City en Uprising, difficulté cauchemar.',
    expectedArc: 'La partie doit être presque perdue, mais les corridors Citadel/Razor/Overwatch doivent permettre une défense tactique.',
    warningSigns: ['Fin automatique avant jour 3', 'Aucune option de containment local', 'Strider sans coût infrastructure'],
  },
];

export const gameplayBalanceRunbook = [
  'Lancer une partie modèle 30 jours et vérifier que la stabilité coûte loyauté, rations ou dette morale.',
  'Lancer une partie quarantaine et vérifier que Xen progresse par couches, mutations et zones, pas par simple jauge.',
  'Lancer une partie post-Nova et vérifier que transferts, Biotics et familles de disparus réapparaissent dans Lambda/audit.',
  'Tester une partie Uprising et vérifier que la défaite est probable mais lisible.',
  'Exporter l’historique décisions et comparer rapport réel vs transmission Citadel.',
  'Vérifier que chaque grand système a au moins une contre-mesure et une conséquence cachée.',
];
