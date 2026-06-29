import { GameEvent } from '../types/events';

export const combineEvents: GameEvent[] = [
  {
    id: 'com_metro_corruption',
    title: 'Corruption dans la Civil Protection',
    type: 'Combine',
    severity: 2,
    description: 'Une équipe de la Civil Protection du check-point de la Gare de transit revend clandestinement des rations de supplément en échange de faveurs auprès des résidentes du secteur.',
    choices: [
      {
        id: 'com_metro_corrupt_punish',
        label: 'Punir publiquement les coupables',
        description: 'Exécuter administrativement les officiers corrompus pour restaurer la discipline.',
        effects: { combinePresence: -2, fear: 10, loyalty: 3, combineCasualties: 2 }
      },
      {
        id: 'com_metro_corrupt_ignore',
        label: 'Fermer les yeux',
        description: 'Laisser faire la corruption pour maintenir le moral des troupes locales.',
        effects: { loyalty: -5, combinePresence: 1, stability: -2 }
      },
      {
        id: 'com_metro_corrupt_infiltrate',
        label: 'Utiliser la corruption pour infiltrer',
        description: 'Forcer les coupables à devenir nos espions auprès des réseaux de marché noir.',
        effects: { infoControl: 10, rebelActivity: -5, rations: -20 }
      }
    ],
    loreTags: ['Corruption', 'Metro Cops', 'Discipline'],
    repeatable: true
  },
  {
    id: 'com_overwatch_logistics',
    title: 'Surplus Logistique d\'Overwatch',
    type: 'Combine',
    severity: 1,
    description: 'La Citadel centrale a libéré un surplus logistique composé d\'armures de combat et de munitions lourdes.',
    choices: [
      {
        id: 'com_log_soldiers',
        label: 'Équiper les soldats Overwatch',
        description: 'Renforcer l\'efficacité offensive de nos forces régulières.',
        effects: { combinePresence: 8, stability: 3, rations: -50 }
      },
      {
        id: 'com_log_recycle',
        label: 'Recycler le matériel en usine',
        description: 'Convertir les métaux en énergie industrielle pour augmenter notre production.',
        effects: { industrialProduction: 12, stability: 1 }
      }
    ],
    loreTags: ['Logistique', 'Overwatch', 'Citadel'],
    repeatable: true
  },
  {
    id: 'com_cp_desertion',
    title: 'Désertion d\'un Metro Cop',
    type: 'Combine',
    severity: 3,
    description: 'Un agent de la Civil Protection a abandonné son poste au Bloc B, emportant son pistolet à impulsion et sa radio sécurisée. Des rumeurs indiquent qu\'il a rejoint la Résistance.',
    choices: [
      {
        id: 'com_desert_hunt',
        label: 'Déployer les Scanners et chasser',
        description: 'Lancer une traque impitoyable pour éliminer le traître avant qu\'il ne livre nos codes.',
        effects: { infoControl: 12, rebelActivity: -6, rations: -30 }
      },
      {
        id: 'com_desert_reprisal',
        label: 'Arrêter sa famille civile',
        description: 'Transférer sa famille civile à Nova Prospekt pour faire un exemple.',
        effects: { fear: 15, loyalty: -10, civilianCasualties: 4 }
      }
    ],
    loreTags: ['Désertion', 'Trahison', 'Metro Cops'],
    repeatable: true
  },
  {
    id: 'com_strider_damage',
    title: 'Strider Endommagé au Dépôt',
    type: 'Combine',
    severity: 3,
    description: 'Lors d\'une manoeuvre de routine près de la Citadel, un tripode Strider a heurté un pylône électrique. La structure est instable.',
    choices: [
      {
        id: 'com_strider_repair_heavy',
        label: 'Allouer des ressources lourdes',
        description: 'Réparer immédiatement au détriment de la production industrielle.',
        effects: { industrialProduction: -15, stability: 2, rations: -40 }
      },
      {
        id: 'com_strider_scrap',
        label: 'Mettre en attente et cannibaliser',
        description: 'Utiliser les pièces du Strider endommagé pour entretenir les autres unités.',
        effects: { industrialProduction: 5, combinePresence: -5 }
      }
    ],
    loreTags: ['Strider', 'Dégâts', 'Technologie'],
    repeatable: false
  },
  {
    id: 'com_apc_ambush',
    title: 'APC Pris pour Cible',
    type: 'Combine',
    severity: 3,
    description: 'Un APC en patrouille dans la Périphérie contaminée a été immobilisé par une mine de la Résistance. L\'équipage est assiégé.',
    choices: [
      {
        id: 'com_apc_rescue',
        label: 'Envoyer des renforts Overwatch',
        description: 'Lancer une escouade de Grunts briser l\'encerclement.',
        effects: { combineCasualties: 3, rebelActivity: -8, rations: -40 }
      },
      {
        id: 'com_apc_destruct',
        label: 'Déclencher l\'autodestruction à distance',
        description: 'Vaporiser le véhicule et la zone environnante pour éliminer les rebelles (perte de l\'APC).',
        effects: { combinePresence: -5, combineCasualties: 2, civilianCasualties: 5, rebelActivity: -12, stability: -3 }
      }
    ],
    loreTags: ['APC', 'Embuscade', 'Pertes'],
    repeatable: true
  },
  {
    id: 'com_metro_strike',
    title: 'Metro Cops Exigeant des Privilèges',
    type: 'Combine',
    severity: 2,
    description: 'Les agents de la Civil Protection du secteur industriel réclament une augmentation de leurs suppléments caloriques face à l\'augmentation du risque rebelle.',
    choices: [
      {
        id: 'com_cop_feed',
        label: 'Accorder les suppléments',
        description: 'Augmenter leurs rations au détriment des civils.',
        effects: { rations: -150, loyalty: -5, stability: 2 }
      },
      {
        id: 'com_cop_deny',
        label: 'Rejeter et menacer de transfert',
        description: 'Rappeler que la désobéissance mène au recyclage transhumain immédiat.',
        effects: { fear: 8, combinePresence: -3 }
      }
    ],
    loreTags: ['Revendications', 'Metro Cops', 'Rations'],
    repeatable: true
  },
  {
    id: 'com_overwatch_autonomy',
    title: 'Directive d\'Autonomie Tactique',
    type: 'Combine',
    severity: 4,
    description: 'L\'administration militaire de la Citadel suggère d\'activer le Protocole d\'Autonomie répressive pour libérer l\'Overwatch des contraintes bureaucratiques locales.',
    choices: [
      {
        id: 'com_auto_activate',
        label: 'Activer le protocole',
        description: 'Autoriser l\'Overwatch à mener des raids de nettoyage autonomes sans approbation administrative préalable.',
        effects: { combinePresence: 15, stability: 8, loyalty: -15, fear: 15, civilianCasualties: 25, infoControl: -5 }
      },
      {
        id: 'com_auto_refuse',
        label: 'Conserver le contrôle civil',
        description: 'Refuser l\'autonomie pour préserver l\'opinion de Wallace Breen et limiter le carnage.',
        effects: { stability: -4, loyalty: 5, combinePresence: -5 }
      }
    ],
    loreTags: ['Protocole', 'Overwatch', 'Répression'],
    repeatable: false
  },
  {
    id: 'com_spy_drone',
    title: 'Nouveau Modèle de Scanner',
    type: 'Combine',
    severity: 1,
    description: 'La Citadel propose de tester un prototype de Shield Scanner équipé de mines légères.',
    choices: [
      {
        id: 'com_drone_deploy',
        label: 'Déployer sur les Canaux',
        description: 'Tester l\'efficacité de minage sur les routes rebelles.',
        effects: { rebelActivity: -8, rations: -30, stability: 1 }
      },
      {
        id: 'com_drone_refuse',
        label: 'Rejeter le prototype',
        description: 'Éviter des dépenses superflues.',
        effects: { rations: 10 }
      }
    ],
    loreTags: ['Scanner', 'Prototype', 'Canaux'],
    repeatable: true
  },
  {
    id: 'com_insubordination_elite',
    title: 'Insubordination d\'un Ordinal Overwatch',
    type: 'Combine',
    severity: 3,
    description: 'Un Commandant Ordinal de l\'Overwatch conteste vos choix de sécurité, les jugeant trop laxistes face à la Résistance Lambda.',
    choices: [
      {
        id: 'com_elite_submit',
        label: 'Se soumettre aux exigences militaires',
        description: 'Durcir les contrôles routiers et allouer des ressources d\'assaut.',
        effects: { combinePresence: 5, fear: 8, loyalty: -5, rations: -40 }
      },
      {
        id: 'com_elite_discipline',
        label: 'Signaler à la Citadel pour réinitialisation',
        description: 'Faire reprogrammer chirurgicalement l\'Ordinal pour insubordination.',
        effects: { stability: 2, combinePresence: -2 }
      }
    ],
    loreTags: ['Insubordination', 'Ordinal', 'Citadel'],
    repeatable: false
  },
  {
    id: 'com_apc_patrol_request',
    title: 'Demande de Patrouille Blindée',
    type: 'Combine',
    severity: 2,
    description: 'Les officiers CP du Bloc A exigent l\'affectation d\'un APC à demeure pour contrer les jets de cocktails Molotov rebelles depuis les toits.',
    choices: [
      {
        id: 'com_apc_patrol_grant',
        label: 'Affecter l\'APC',
        description: 'Déployer le blindé dans les rues étroites du Bloc A.',
        effects: { combinePresence: 5, stability: 3, fear: 8, rations: -40, sectorInfrastructure: -5 }
      },
      {
        id: 'com_apc_patrol_deny',
        label: 'Rejeter la demande',
        description: 'Garder nos blindés pour les zones critiques (Admin Plaza/Citadel).',
        effects: { combinePresence: -2, stability: -2 }
      }
    ],
    loreTags: ['APC', 'Patrouille', 'Bloc A'],
    repeatable: true
  },
  {
    id: 'com_citadel_outflow',
    title: 'Fuite Logistique de la Citadel',
    type: 'Combine',
    severity: 2,
    description: 'Des fluctuations dans le réacteur central de la Citadel menacent de geler les banques d\'alimentation des terminaux Civil Protection.',
    choices: [
      {
        id: 'com_leak_divert_power',
        label: 'Détourner l\'électricité civile',
        description: 'Couper le courant dans le Quartier des travailleurs pour alimenter les serveurs CP.',
        effects: { industrialProduction: -15, civilianFatigue: 10, stability: 2, citadelEnergy: 5 }
      },
      {
        id: 'com_leak_accept_drop',
        label: 'Laisser les terminaux s\'éteindre',
        description: 'Accepter une baisse de contrôle de l\'information temporaire.',
        effects: { infoControl: -12, stability: -3 }
      }
    ],
    loreTags: ['Énergie', 'Citadel', 'Panne'],
    repeatable: true
  },
  {
    id: 'com_razor_train_defend',
    title: 'Sécurisation de Razor Train d\'Élite',
    type: 'Combine',
    severity: 3,
    description: 'Un convoi transportant des pièces d\'Advisor en sommeil doit traverser la ville. La Citadel exige une garde renforcée au Nœud ferroviaire.',
    choices: [
      {
        id: 'com_razor_def_max',
        label: 'Déployer Overwatch Elites et Striders',
        description: 'Sécuriser le chemin de fer avec notre puissance maximale.',
        effects: { combinePresence: 10, stability: 5, rations: -90, fear: 12 }
      },
      {
        id: 'com_razor_def_cp',
        label: 'Sécuriser avec les Metro Cops locaux',
        description: 'Garder les troupes d\'élite en réserve administrative.',
        effects: { combineCasualties: 3, rebelActivity: 5, rations: -20 }
      }
    ],
    loreTags: ['Razor Train', 'Sécurité', 'Convoi'],
    repeatable: true
  },
  {
    id: 'com_cp_reprisal_order',
    title: 'Ordre de Représailles Immédiates',
    type: 'Combine',
    severity: 4,
    description: 'Suite à l\'attaque de la place administrative, l\'Overwatch commande une punition collective majeure sur le bloc suspecté.',
    choices: [
      {
        id: 'com_rep_execute',
        label: 'Exécuter 15 suspects',
        description: 'Exécutions publiques sur la place administrative pour mater l\'esprit de révolte.',
        effects: { civilianCasualties: 15, fear: 25, loyalty: -20, rebelActivity: -8 }
      },
      {
        id: 'com_rep_transfer',
        label: 'Transférer 100 civils à Nova Prospekt',
        description: 'Déporter les suspects vers le centre de reconditionnement.',
        effects: { civilianCasualties: 100, fear: 18, loyalty: -12, stability: 3 }
      },
      {
        id: 'com_rep_lax',
        label: 'Falsifier le rapport de punition',
        description: 'Prétendre avoir puni les coupables pour calmer l\'Overwatch.',
        effects: { infoControl: -15, stability: -5, rebelActivity: 8 }
      }
    ],
    loreTags: ['Représailles', 'Terreur', 'Overwatch'],
    repeatable: true
  },
  {
    id: 'com_overwatch_grunt_recruits',
    title: 'Nouveau Bataillon de Grunts',
    type: 'Combine',
    severity: 2,
    description: 'Un convoi de transport livre 20 nouveaux Overwatch Grunts pour renforcer la sécurité urbaine.',
    choices: [
      {
        id: 'com_grunt_accept',
        label: 'Intégrer les forces',
        description: 'Déployer les Grunts dans la Zone de quarantaine.',
        effects: { combinePresence: 10, stability: 3, rations: -50 }
      },
      {
        id: 'com_grunt_reject',
        label: 'Dévier vers une autre cité',
        description: 'Économiser nos rations en les redirigeant vers City 17.',
        effects: { rations: 80, combinePresence: -2 }
      }
    ],
    loreTags: ['Recrutement', 'Grunts', 'Rations'],
    repeatable: true
  },
  {
    id: 'com_citadel_pulse_cannon',
    title: 'Canon à Impulsion de la Citadel',
    type: 'Combine',
    severity: 4,
    description: 'La Citadel propose d\'activer le canon à impulsion longue portée pour vaporiser un secteur suspect de sédition Lambda. Le secteur sera partiellement détruit.',
    choices: [
      {
        id: 'com_pulse_fire',
        label: 'Autoriser le tir sur les Ruines',
        description: 'Anéantir le nid de résistance dans les ruines pré-guerre.',
        effects: { rebelActivity: -25, stability: 5, sectorInfrastructure: -35, citadelEnergy: -20, civilianCasualties: 15 }
      },
      {
        id: 'com_pulse_refuse',
        label: 'Refuser l\'activation du canon',
        description: 'Préserver l\'énergie de la Citadel.',
        effects: { stability: -2 }
      }
    ],
    loreTags: ['Canon', 'Citadel', 'Destruction'],
    repeatable: false
  }
];
