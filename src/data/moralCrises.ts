import { GameEvent } from '../types/events';

export const moralCrises: GameEvent[] = [
  {
    id: 'cri_block_infested',
    title: 'Dilemme du Bloc Contaminé',
    type: 'Moral Crisis',
    severity: 4,
    description: 'Une infestation de headcrabs s\'est déclarée au cœur du Bloc Résidentiel B, piégeant 200 civils innocents dans les étages supérieurs. La contamination se propage rapidement.',
    choices: [
      {
        id: 'cri_block_evacuate',
        label: 'Évacuer lentement les civils',
        description: 'Tenter de sauver les citoyens en sécurisant le rez-de-chaussée. Risque élevé pour les patrouilles CP.',
        effects: { combineCasualties: 4, rations: -80, xenContamination: -5, loyalty: 15, stability: 2 }
      },
      {
        id: 'cri_block_seal',
        label: 'Sceller immédiatement le bloc',
        description: 'Verrouiller les issues en béton armé, condamnant les 200 civils à mourir ou à muter.',
        effects: { stability: -5, civilianCasualties: 200, fear: 20, loyalty: -15, xenContamination: -15 }
      },
      {
        id: 'cri_block_burn',
        label: 'Incinérer le bloc résidentiel',
        description: 'Brûler tout le complexe par tirs de plasma incendiaire. Purge totale instantanée.',
        effects: { stability: -10, civilianCasualties: 200, fear: 25, loyalty: -20, xenContamination: -30, sectorInfrastructure: -40 }
      },
      {
        id: 'cri_block_lie',
        label: 'Masquer et nier l\'infestation',
        description: 'Interdire l\'accès au secteur sans déclarer de mesures d\'éradication.',
        effects: { infoControl: 15, xenContamination: 15, stability: -5, loyalty: -5 }
      }
    ],
    loreTags: ['Xen', 'Infection', 'Bloc B'],
    repeatable: false
  },
  {
    id: 'cri_child_informer',
    title: 'Dilemme de l\'Informateur Enfant',
    type: 'Moral Crisis',
    severity: 3,
    description: 'Un jeune garçon de 12 ans a dénoncé l\'emplacement de la cache principale de la cellule Lambda-3 dans le Quartier des travailleurs pour sauver sa mère malade.',
    choices: [
      {
        id: 'cri_child_interrogate',
        label: 'Arrêter le père et utiliser le garçon comme appât',
        description: 'Poster des Metro Cops dans la maison pour capturer les complices.',
        effects: { rebelActivity: -18, fear: 12, loyalty: -15 }
      },
      {
        id: 'cri_child_protect',
        label: 'Protéger la famille et soigner la mère',
        description: 'Fournir des médicaments et relocaliser discrètement l\'enfant et sa mère dans un secteur stable.',
        effects: { rations: -100, loyalty: 10, stability: 2, rebelActivity: -5 }
      },
      {
        id: 'cri_child_transfer',
        label: 'Transférer toute la famille à Nova Prospekt',
        description: 'Classer le dossier comme complot potentiel et interner tout le monde.',
        effects: { fear: 15, civilianCasualties: 3, infoControl: 8 }
      }
    ],
    loreTags: ['Enfant', 'Lambda-3', 'Dénonciation'],
    repeatable: false
  },
  {
    id: 'cri_vortigaunt_captured',
    title: 'Dilemme du Vortigaunt Capturé',
    type: 'Moral Crisis',
    severity: 3,
    description: 'Un Vortigaunt doté de capacités de téléportation avancées a été capturé dans les Canaux. Il propose d\'aider à purger la contamination Xen dans les égouts en échange de la libération de 20 civils condamnés.',
    choices: [
      {
        id: 'cri_vort_citadel',
        label: 'Livrer le Vortigaunt à la Citadel',
        description: 'Ignorer son offre et l\'envoyer aux Advisors pour étude neurologique.',
        effects: { stability: 2, citadelEnergy: 15, rations: -20 }
      },
      {
        id: 'cri_vort_deal',
        label: 'Accepter le marché en secret',
        description: 'Libérer les 20 civils en falsifiant le registre et laisser le Vortigaunt purger Xen.',
        effects: { loyalty: 15, stability: 4, xenContamination: -18, combinePresence: -5, infoControl: -8 }
      },
      {
        id: 'cri_vort_execute',
        label: 'Exécuter publiquement la créature',
        description: 'Fusiller le Vortigaunt sur la place publique pour décourager les séditieux.',
        effects: { fear: 15, loyalty: -8, rebelActivity: 5 }
      }
    ],
    loreTags: ['Vortigaunt', 'Marché', 'Égouts'],
    repeatable: false
  },
  {
    id: 'cri_cp_corruption',
    title: 'Dilemme des Metro Cops Corrompus',
    type: 'Moral Crisis',
    severity: 3,
    description: 'Des officiers de la Civil Protection ont été surpris en train d\'échanger des pistolets de service et des rations militaires contre des antiquités de valeur auprès du marché noir.',
    choices: [
      {
        id: 'cri_cp_punish',
        label: 'Exécuter publiquement les corrompus',
        description: 'Faire fusiller les Metro Cops fautifs devant l\'ensemble des bataillons civils.',
        effects: { combinePresence: -3, fear: 15, loyalty: 5, combineCasualties: 5 }
      },
      {
        id: 'cri_cp_cover',
        label: 'Couvrir l\'affaire pour l\'image de l\'Union',
        description: 'Dissimuler le rapport pour ne pas ternir l\'autorité de la CP.',
        effects: { infoControl: 10, stability: -5, rebelActivity: 8 }
      },
      {
        id: 'cri_cp_exploit',
        label: 'Utiliser la corruption pour infiltrer la Résistance',
        description: 'Forcer les officiers corrompus à fournir des armes piégées aux rebelles.',
        effects: { rebelActivity: -20, combineCasualties: 2, stability: 5 }
      }
    ],
    loreTags: ['Corruption', 'Metro Cops', 'Marché Noir'],
    repeatable: false
  },
  {
    id: 'cri_headcrab_shell_bombardment',
    title: 'Dilemme du Bombardement Biologique',
    type: 'Moral Crisis',
    severity: 5,
    description: 'Une importante cellule de la Résistance a fortifié le quartier des Ruines pré-guerre, empêchant toute incursion au sol. La Citadel autorise le tir d\'un obus Headcrab Shell.',
    choices: [
      {
        id: 'cri_shell_authorize',
        label: 'Autoriser le bombardement Headcrab Shell',
        description: 'Vaporiser la résistance en infestant définitivement les Ruines. (Crée une zone zombie Ravenholm).',
        effects: { rebelActivity: -30, xenContamination: 25, stability: -10, fear: 25, loyalty: -20, civilianCasualties: 80 }
      },
      {
        id: 'cri_shell_refuse',
        label: 'Refuser l\'arme biologique et envoyer l\'infanterie',
        description: 'Lancer un assaut de front de soldats Overwatch. Les pertes Combine seront sévères.',
        effects: { combineCasualties: 12, rebelActivity: -15, stability: 5, rations: -60 }
      },
      {
        id: 'cri_shell_warn',
        label: 'Prévenir secrètement les civils et tirer à côté',
        description: 'Faire fuir les résidents innocents avant de tirer l\'obus sur une zone vide, simulant un dysfonctionnement.',
        effects: { loyalty: 15, rebelActivity: 10, infoControl: -15, stability: -4, xenContamination: 10 }
      }
    ],
    loreTags: ['Headcrab Shell', 'Biologique', 'Ruines'],
    repeatable: false
  },
  {
    id: 'cri_famine_options',
    title: 'Dilemme des Rations de Famine',
    type: 'Moral Crisis',
    severity: 3,
    description: 'Suite à une pénurie, les réserves de rations de la cité sont presque à sec. La Citadel refuse l\'aide extérieure sans quotas de production industrielle accrus.',
    choices: [
      {
        id: 'cri_famine_citizens',
        label: 'Affamer les secteurs civils',
        description: 'Maintenir les rations complètes pour la CP et Overwatch en coupant les civils.',
        effects: { rations: 200, loyalty: -25, civilianFatigue: 25, stability: -10, rebelActivity: 15 }
      },
      {
        id: 'cri_famine_cops',
        label: 'Rationner la Civil Protection',
        description: 'Réduire les calories des Metro Cops pour nourrir les travailleurs d\'usine.',
        effects: { combinePresence: -10, loyalty: 10, stability: -5, industrialProduction: 8 }
      },
      {
        id: 'cri_famine_advisors',
        label: 'Demander de l\'énergie en nutriments',
        description: 'Convertir une partie de l\'énergie de la Citadel en rations synthétiques.',
        effects: { citadelEnergy: -15, rations: 300, stability: 4 }
      }
    ],
    loreTags: ['Famine', 'Rations', 'Énergie'],
    repeatable: false
  },
  {
    id: 'cri_overwatch_deportation',
    title: 'Dilemme de la Rafle Civile',
    type: 'Moral Crisis',
    severity: 4,
    description: 'La Citadel exige 300 citoyens pour un transfert vers Nova Prospekt. Les Metro Cops proposent de rafler les résidents du Bloc A au hasard pendant la nuit.',
    choices: [
      {
        id: 'cri_deport_grant',
        label: 'Autoriser la rafle de nuit',
        description: 'Remplir le quota demandé par la Citadel.',
        effects: { civilianCasualties: 300, fear: 20, loyalty: -15, stability: 5 }
      },
      {
        id: 'cri_deport_sacrifice_cp',
        label: 'Livrer des Metro Cops insubordonnés',
        description: 'Combler le quota en envoyant nos propres agents CP indisciplinés à reconditionner.',
        effects: { combinePresence: -8, fear: 10, infoControl: -5, combineCasualties: 30 }
      },
      {
        id: 'cri_deport_refuse',
        label: 'Refuser et affronter la colère de la Citadel',
        description: 'Déclarer que la déportation nuirait gravement à la stabilité de la ville.',
        effects: { stability: -10, citadelEnergy: -10, infoControl: -8 }
      }
    ],
    loreTags: ['Déportation', 'Nova Prospekt', 'Bloc A'],
    repeatable: false
  },
  {
    id: 'cri_antlion_barrier',
    title: 'Dilemme de la Barrière Énergétique',
    type: 'Moral Crisis',
    severity: 3,
    description: 'La barrière anti-antlions de la Périphérie a grillé. La réparer nécessite d\'utiliser les réserves électriques qui alimentent le réseau de chauffage civique en plein hiver.',
    choices: [
      {
        id: 'cri_barrier_repair',
        label: 'Couper le chauffage civil pour réparer',
        description: 'Préserver la sécurité militaire au détriment du confort vital des travailleurs.',
        effects: { industrialProduction: -10, civilianFatigue: 18, loyalty: -12, stability: 3 }
      },
      {
        id: 'cri_barrier_delay',
        label: 'Retarder la réparation',
        description: 'Laisser les antlions menacer les habitations périphériques temporairement.',
        effects: { xenContamination: 15, civilianCasualties: 12, stability: -8 }
      }
    ],
    loreTags: ['Antlions', 'Chauffage', 'Périphérie'],
    repeatable: false
  },
  {
    id: 'cri_vortigaunt_secret_refuge',
    title: 'Dilemme du Refuge Vortigaunt',
    type: 'Moral Crisis',
    severity: 3,
    description: 'Une école abandonnée abrite 10 Vortigaunts blessés et plusieurs orphelins humains. Un officier CP a découvert le site et demande vos instructions.',
    choices: [
      {
        id: 'cri_refuge_exterminate',
        label: 'Ordre de destruction totale',
        description: 'Envoyer l\'Overwatch griller la zone au fusil à impulsion lourde.',
        effects: { civilianCasualties: 15, fear: 18, loyalty: -15, stability: 5 }
      },
      {
        id: 'cri_refuge_cover',
        label: 'Dissimuler le refuge',
        description: 'Ordonner au CP de se taire sous peine de reconditionnement, protégeant le site.',
        effects: { loyalty: 12, combinePresence: -3, infoControl: -10 }
      }
    ],
    loreTags: ['Refuge', 'Vortigaunts', 'Orphelins'],
    repeatable: false
  },
  {
    id: 'cri_rebel_leader_captured',
    title: 'Dilemme du Chef Rebelle Capturé',
    type: 'Moral Crisis',
    severity: 4,
    description: 'Le chef de la cellule Ravenholm locale a été capturé. Son exécution publique calmera la rébellion à court terme, mais en fera un martyr éternel.',
    choices: [
      {
        id: 'cri_leader_execute',
        label: 'Exécuter publiquement',
        description: 'Pendre le leader sur la Place administrative en direct sur Breencast.',
        effects: { fear: 20, loyalty: -15, rebelActivity: -10, stability: 5 }
      },
      {
        id: 'cri_leader_recondition',
        label: 'Envoyer à Nova Prospekt pour lavage cérébral',
        description: 'Effacer sa mémoire pour le transformer en soldat de l\'Overwatch loyal.',
        effects: { infoControl: 12, stability: 4, rebelActivity: -8 }
      },
      {
        id: 'cri_leader_bribe',
        label: 'Négocier un ralliement de propagande',
        description: 'Forcer le leader à prononcer un discours de loyauté sur Breencast en échange de la grâce de ses enfants.',
        effects: { loyalty: 10, rebelActivity: -15, infoControl: 15, stability: 6 }
      }
    ],
    loreTags: ['Leader', 'Représailles', 'Exécution'],
    repeatable: false
  }
];
