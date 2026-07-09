import type { BreencastStrategy } from '../types/game';

/**
 * Dynamic BreenCast doctrine pack.
 * These are not random slogans anymore: the system reads City conditions and
 * assembles public lines, hidden intent and gameplay effects.
 */
export const breencastStrategies: BreencastStrategy[] = [
  {
    id: 'civic_continuity',
    name: 'Continuité civique',
    description: 'Discours paternaliste standard : stabilité, ordre, productivité et gratitude envers l’Union Universelle.',
    effects: { info: 9, stability: 2, fatigue: 2 },
    risk: 8,
    bestAgainst: ['fatigue', 'low_stability'],
  },
  {
    id: 'anti_citizen_denunciation',
    name: 'Dénonciation anti-citoyenne',
    description: 'Désigne la Résistance comme maladie sociale et pousse aux signalements de voisins, radios et caches Lambda.',
    effects: { info: 12, rebel: -5, fear: 6, loyalty: -4, suspicion: 2 },
    risk: 18,
    bestAgainst: ['rebellion', 'low_info'],
  },
  {
    id: 'sanitary_quarantine',
    name: 'Justification sanitaire',
    description: 'Habille les verrouillages Xen, purges et quarantaines en mesures de protection collective.',
    effects: { info: 10, xen: -2, fear: 4, fatigue: 3, loyalty: -2 },
    risk: 14,
    bestAgainst: ['xen', 'quarantine'],
  },
  {
    id: 'ration_merit',
    name: 'Mérite de rationnement',
    description: 'Présente le manque de rations comme une récompense différée pour les blocs les plus conformes.',
    effects: { info: 8, rations: 90, fatigue: 5, loyalty: -5, rebel: 3 },
    risk: 22,
    bestAgainst: ['rations', 'production'],
  },
  {
    id: 'nova_reassignment',
    name: 'Réaffectation Nova Prospekt',
    description: 'Normalise les transferts Razor Train et transforme les disparitions en opportunités administratives.',
    effects: { info: 11, fear: 9, loyalty: -8, rebel: 4, suspicion: 4 },
    risk: 35,
    bestAgainst: ['nova', 'prisoners'],
  },
  {
    id: 'advisor_audit_calm',
    name: 'Confiance envers la Citadelle',
    description: 'Réduit la panique liée aux audits et présente les Advisors comme garants de la continuité humaine.',
    effects: { info: 7, citadel: 4, fear: 5, suspicion: -3, fatigue: 4 },
    risk: 20,
    bestAgainst: ['audit', 'citadel'],
  },
  {
    id: 'model_city_fabrication',
    name: 'City modèle',
    description: 'Affiche des chiffres arrangés de conformité et de productivité. Très efficace, mais dangereux si les rapports sont falsifiés.',
    effects: { info: 15, stability: 5, production: 2, suspicion: 7 },
    risk: 42,
    bestAgainst: ['low_stability', 'audit', 'productivity'],
  },
  {
    id: 'sympathy_mask',
    name: 'Masque humanitaire discret',
    description: 'Ton plus doux : calme les citoyens et couvre certains choix de sympathisant secret, au prix d’une efficacité Combine moindre.',
    effects: { loyalty: 8, fatigue: -6, info: 4, rebel: 2, suspicion: 5 },
    risk: 30,
    bestAgainst: ['sympathizer', 'civilian_losses'],
  },
];

export const breencastOpeners = [
  'Citoyen, prenez un instant pour considérer la fragilité de l’ancien monde.',
  'Citoyen, votre stabilité personnelle dépend de la stabilité de votre bloc.',
  'Citoyen, la Citadelle observe les efforts sincères de conformité.',
  'Citoyen, les restrictions ne sont pas une punition, mais une architecture de survie.',
  'Citoyen, l’Union Universelle ne vous demande pas la peur. Elle vous demande la continuité.',
  'Citoyen, le silence face au désordre n’est jamais neutre.',
];

export const breencastClosers = [
  'La loyauté est observée. La loyauté est récompensée.',
  'Restez dans votre secteur. Restez utiles. Restez humains sous supervision.',
  'Signalez toute anomalie. La conformité protège votre ration.',
  'La désobéissance d’un seul foyer compromet la sécurité de tous.',
  'La Citadelle garantit ce que l’ancien monde a échoué à préserver : la continuité.',
  'Votre coopération d’aujourd’hui détermine votre affectation de demain.',
];

export const breencastFragments = {
  rebellion: [
    'Les éléments anti-citoyens exploitent vos tunnels, vos peurs et vos liens familiaux pour réintroduire le chaos pré-Union.',
    'Les radios Lambda ne libèrent personne : elles transforment les citoyens ordinaires en boucliers administrativement perdus.',
    'Un voisin silencieux face à une cache d’armes choisit la mise en danger collective.',
    'Les sabotages de rations ne sont pas des actes politiques, mais des attaques contre les enfants conformes de votre bloc.',
  ],
  xen: [
    'Les mesures de quarantaine sont une réponse sanitaire rationnelle à une biosphère qui ne reconnaît ni foyer ni famille.',
    'Headcrabs, spores et excroissances murales ne sont pas des rumeurs : ils prospèrent dans les secteurs qui refusent l’ordre.',
    'Un sas scellé préserve mille citoyens quand une porte ouverte en condamne dix mille.',
    'Les équipes de confinement agissent pour empêcher la transformation de votre quartier en zone organique permanente.',
  ],
  rations: [
    'Les rations sont distribuées selon le mérite civique observé, non selon l’exigence émotionnelle.',
    'La patience alimentaire est une contribution mesurable à la reconstruction de l’humanité.',
    'Les blocs productifs seront priorisés parce qu’ils prolongent l’existence collective.',
    'Le marché noir retire des calories aux citoyens conformes et les livre aux anti-citoyens.',
  ],
  nova: [
    'Les transferts Razor Train ne sont pas des disparitions, mais des réaffectations productives nécessaires.',
    'Nova Prospekt traite les cas que la ville ne peut plus absorber sans compromettre la stabilité générale.',
    'La séparation administrative protège les familles conformes des influences anti-citoyennes persistantes.',
    'Chaque transfert validé réduit le risque que votre bloc soit soumis à une mesure collective plus sévère.',
  ],
  audit: [
    'La revue Citadelle n’est pas une menace : elle confirme que City reste digne de supervision.',
    'Les Advisors évaluent la continuité humaine avec une précision que l’ancien monde n’a jamais atteinte.',
    'Un dossier exact, un bloc conforme, une ration préservée : voilà la chaîne de confiance.',
    'Les audits n’effraient que les citoyens dont les archives exigent correction.',
  ],
  civilian: [
    'Les pertes locales ne doivent pas être confondues avec l’échec : elles peuvent préserver la structure globale.',
    'La compassion non administrée a déjà échoué lors de la Guerre de Sept Heures.',
    'Le deuil privé ne doit pas devenir une vulnérabilité publique.',
    'Les familles conformes seront guidées vers une acceptation utile de leurs réaffectations.',
  ],
  productivity: [
    'La production industrielle demeure le langage par lequel l’humanité prouve sa valeur résiduelle.',
    'Un poste abandonné aujourd’hui devient une ration manquante demain.',
    'Les usines stabilisées reçoivent protection, énergie et priorité de distribution.',
    'La Citadelle mesure la loyauté en rendement autant qu’en silence.',
  ],
  default: [
    'La stabilité n’est pas une émotion. C’est un résultat mesurable.',
    'L’ancien monde vous a donné des choix jusqu’à sa propre extinction. L’Union vous donne une direction.',
    'La peur dispersée devient panique. La peur administrée devient ordre.',
    'Votre bloc survivra par discipline, signalement et patience.',
  ],
};
