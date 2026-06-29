import { GameEvent } from '../types/events';

export const citizenEvents: GameEvent[] = [
  {
    id: 'cit_ration_delay',
    title: 'Retard de Livraison de Rations',
    type: 'Citizen',
    severity: 2,
    description: 'Une livraison de rations a pris du retard dans le Bloc Résidentiel B en raison de la maintenance d\'un Razor Train. Les files d\'attente s\'allongent et l\'impatience monte.',
    choices: [
      {
        id: 'cit_ration_delay_wait',
        label: 'Forcer l\'attente',
        description: 'Déployer des Metro Cops pour maintenir l\'ordre par la force pendant que le train arrive.',
        effects: { fear: 8, loyalty: -5, civilianFatigue: 8 }
      },
      {
        id: 'cit_ration_delay_compensate',
        label: 'Distribuer des réserves d\'urgence',
        description: 'Piocher dans nos réserves de la place pour débloquer la situation immédiatement.',
        effects: { rations: -100, loyalty: 8, stability: 3, civilianFatigue: -4 }
      }
    ],
    loreTags: ['Rations', 'Bloc B', 'Logistique'],
    repeatable: true
  },
  {
    id: 'cit_water_taste',
    title: 'Plaintes sur le Goût de l\'Eau',
    type: 'Citizen',
    severity: 1,
    description: 'Les citoyens du Quartier des travailleurs affirment que l\'eau courante a un goût chimique suspect et provoque des migraines. Certains y voient un additif de docilité.',
    choices: [
      {
        id: 'cit_water_explain',
        label: 'Justifier par Breencast',
        description: 'Wallace Breen explique qu\'il s\'agit d\'un traitement purificateur nécessaire contre les germes terrestres.',
        effects: { infoControl: 5, stability: 1, loyalty: -2 }
      },
      {
        id: 'cit_water_ignore',
        label: 'Ignorer la plainte',
        description: 'Laisser les citoyens boire l\'eau sans intervention.',
        effects: { loyalty: -5, civilianFatigue: 5 }
      }
    ],
    loreTags: ['Eau', 'Travailleurs', 'Santé'],
    repeatable: true
  },
  {
    id: 'cit_illegal_pregnancy',
    title: 'Alerte du Suppression Field',
    type: 'Citizen',
    severity: 3,
    description: 'Les capteurs médicaux de la Citadel signalent une activité biologique utérine non conforme chez une femme du Bloc Résidentiel A, malgré le champ de suppression active.',
    choices: [
      {
        id: 'cit_preg_arrest',
        label: 'Arrêter et transférer le sujet',
        description: 'Envoyer la CP arrêter la femme et l\'emmener à la Citadel pour étude.',
        effects: { fear: 12, loyalty: -10, stability: 2, rations: -20 }
      },
      {
        id: 'cit_preg_ignore',
        label: 'Fermer les yeux secrètement',
        description: 'Falsifier le registre médical pour laisser la grossesse se poursuivre (Option humaine).',
        effects: { loyalty: 10, combinePresence: -2, stability: -1 }
      }
    ],
    loreTags: ['Suppression Field', 'Médical', 'Bloc A'],
    repeatable: false
  },
  {
    id: 'cit_suicide_wave',
    title: 'Vague de Dépression Civile',
    type: 'Citizen',
    severity: 2,
    description: 'Le moral de la population s\'effondre. Plusieurs suicides sont signalés dans les blocs de béton du Secteur des entrepôts.',
    choices: [
      {
        id: 'cit_suicide_rations',
        label: 'Augmenter le sucre dans les rations',
        description: 'Introduire des additifs énergisants dans la nourriture civique.',
        effects: { rations: -80, civilianFatigue: -8, stability: 2 }
      },
      {
        id: 'cit_suicide_breencast',
        label: 'Diffuser un message d\'espoir de Breen',
        description: 'Une allocution sur la chance inouïe de participer à l\'Union Universelle.',
        effects: { loyalty: -3, infoControl: 8 }
      }
    ],
    loreTags: ['Santé mentale', 'Entrepôts', 'Breencast'],
    repeatable: true
  },
  {
    id: 'cit_old_books',
    title: 'Saisie de Livres Historiques',
    type: 'Citizen',
    severity: 1,
    description: 'Une cache de livres imprimés d\'avant-guerre a été découverte chez un vieillard. Ils décrivent la Terre d\'avant l\'arrivée de l\'Union.',
    choices: [
      {
        id: 'cit_books_burn',
        label: 'Brûler les livres publiquement',
        description: 'Détruire les ouvrages sur la place administrative pour décourager la nostalgie.',
        effects: { infoControl: 10, fear: 5, loyalty: -5 }
      },
      {
        id: 'cit_books_archive',
        label: 'Stocker dans la bibliothèque de l\'Admin',
        description: 'Conserver ces livres pour votre usage personnel ou pour étude.',
        effects: { infoControl: 2, rations: -10 }
      }
    ],
    loreTags: ['Histoire', 'Livres', 'Censure'],
    repeatable: true
  },
  {
    id: 'cit_black_market',
    title: 'Marché Noir Découvert',
    type: 'Citizen',
    severity: 2,
    description: 'Un réseau clandestin échange des boîtes de conserve rouillées et des vêtements chauds contre des faveurs et des jetons d\'usine.',
    choices: [
      {
        id: 'cit_market_crush',
        label: 'Écraser le réseau',
        description: 'Arrêter tous les marchands et confisquer les biens pour nos réserves.',
        effects: { rations: 80, fear: 8, loyalty: -8, rebelActivity: -3 }
      },
      {
        id: 'cit_market_tax',
        label: 'Taxer la corruption',
        description: 'Laisser le marché fonctionner en échange d\'une commission de 20% pour la CP.',
        effects: { rations: 120, loyalty: 2, combinePresence: -3 }
      }
    ],
    loreTags: ['Marché Noir', 'Économie', 'Contrebande'],
    repeatable: true
  },
  {
    id: 'cit_vandalism_relay',
    title: 'Vandalisme sur un Écran Géant',
    type: 'Citizen',
    severity: 2,
    description: 'L\'écran Breencast de la Place administrative a été aspergé d\'huile noire, rendant le visage du Docteur Breen invisible.',
    choices: [
      {
        id: 'cit_vandal_clean',
        label: 'Faire nettoyer d\'urgence',
        description: 'Mobiliser une équipe technique.',
        effects: { industrialProduction: -5, infoControl: 6, stability: 1 }
      },
      {
        id: 'cit_vandal_punish',
        label: 'Fouetter les coupables présumés',
        description: 'Prendre 3 suspects au hasard sur la place et les fustiger publiquement.',
        effects: { fear: 15, loyalty: -12, rebelActivity: 4, civilianCasualties: 3 }
      }
    ],
    loreTags: ['Breencast', 'Vandalisme', 'Place'],
    repeatable: true
  },
  {
    id: 'cit_missing_citizens',
    title: 'Disparitions Inexpliquées',
    type: 'Citizen',
    severity: 2,
    description: 'Des familles du Bloc B signalent la disparition de plusieurs jeunes gens pendant la nuit. Des rumeurs accusent la CP.',
    choices: [
      {
        id: 'cit_missing_repress',
        label: 'Censurer les réclamations',
        description: 'Interdire tout rassemblement devant les bureaux d\'enregistrement civils.',
        effects: { infoControl: 8, fear: 6, loyalty: -5 }
      },
      {
        id: 'cit_missing_investigate',
        label: 'Mener l\'enquête administrative',
        description: 'Découvrir s\'ils ont fui par les égouts ou s\'ils ont été raflés par Overwatch.',
        effects: { infoControl: 5, rebelActivity: 3, rations: -20 }
      }
    ],
    loreTags: ['Rumeurs', 'Disparitions', 'Bloc B'],
    repeatable: true
  },
  {
    id: 'cit_work_accident',
    title: 'Accident Industriel Majeur',
    type: 'Citizen',
    severity: 3,
    description: 'Une grue du Razor Train a lâché, écrasant une équipe de 8 ouvriers et bloquant les rails de déchargement du Complexe industriel.',
    choices: [
      {
        id: 'cit_accident_force',
        label: 'Continuer le travail immédiatement',
        description: 'Ignorer les corps et faire reprendre la cadence aux survivants sous surveillance armée.',
        effects: { industrialProduction: 10, civilianFatigue: 12, loyalty: -15, civilianCasualties: 8 }
      },
      {
        id: 'cit_accident_mourn',
        label: 'Autoriser une pause pour deuil',
        description: 'Laisser les familles récupérer les corps et suspendre le trafic pendant 6 heures.',
        effects: { industrialProduction: -10, loyalty: 10, civilianFatigue: -8 }
      }
    ],
    loreTags: ['Accident', 'Razor Train', 'Industrie'],
    repeatable: true
  },
  {
    id: 'cit_illegal_music',
    title: 'Musique Clandestine Détectée',
    type: 'Citizen',
    severity: 1,
    description: 'Un citoyen joue du violon dans une ruelle sombre du Quartier des travailleurs. Un attroupement de civils en larmes écoute en silence.',
    choices: [
      {
        id: 'cit_music_arrest',
        label: 'Confisquer le violon et arrêter l\'artiste',
        description: 'Considérer cette musique comme un vecteur d\'émotions subversives.',
        effects: { fear: 6, loyalty: -5, infoControl: 5 }
      },
      {
        id: 'cit_music_permit',
        label: 'Tolérer la performance',
        description: 'Laisser les citoyens évacuer leur fatigue par l\'art.',
        effects: { loyalty: 5, civilianFatigue: -8, rebelActivity: 2 }
      }
    ],
    loreTags: ['Musique', 'Travailleurs', 'Art'],
    repeatable: true
  },
  {
    id: 'cit_soup_kitchen',
    title: 'Soupe Populaire Religieuse',
    type: 'Citizen',
    severity: 2,
    description: 'Une ancienne église clandestine distribue du bouillon chaud aux citoyens affamés du Bloc A en lisant des textes sacrés d\'avant-guerre.',
    choices: [
      {
        id: 'cit_soup_raid',
        label: 'Raser la structure et arrêter le prêtre',
        description: 'La Citadel n\'admet aucun culte autre que la dévotion à l\'Union.',
        effects: { fear: 12, loyalty: -10, infoControl: 8, rations: -20 }
      },
      {
        id: 'cit_soup_coopt',
        label: 'Coopter la distribution',
        description: 'Fournir nos propres rations et remplacer les prêtres par des agents de propagande Breencast.',
        effects: { rations: -100, infoControl: 12, loyalty: 2 }
      }
    ],
    loreTags: ['Religion', 'Rations', 'Bloc A'],
    repeatable: false
  },
  {
    id: 'cit_vort_labor',
    title: 'Grève des Vortigaunts Asservis',
    type: 'Citizen',
    severity: 3,
    description: 'Les Vortigaunts affectés au nettoyage des déchets toxiques du Complexe industriel refusent de travailler suite aux mauvais traitements de la CP.',
    choices: [
      {
        id: 'cit_vort_strike_beat',
        label: 'Forcer par les décharges électriques',
        description: 'Faire fouetter les Vortigaunts pour rétablir la production.',
        effects: { industrialProduction: 5, stability: -2, fear: 8, rations: -30 }
      },
      {
        id: 'cit_vort_strike_feed',
        label: 'Octroyer des compléments alimentaires',
        description: 'Améliorer légèrement leurs conditions pour éviter un incident psychique.',
        effects: { rations: -50, loyalty: 3, industrialProduction: -3 }
      }
    ],
    loreTags: ['Vortigaunt', 'Industrie', 'Travail'],
    repeatable: true
  },
  {
    id: 'cit_child_informer',
    title: 'Dénonciation par un Enfant',
    type: 'Citizen',
    severity: 2,
    description: 'Un jeune garçon de 10 ans se présente au Poste CP. Il prétend que son père cache une radio Lambda sous les planchers de leur appartement.',
    choices: [
      {
        id: 'cit_child_raid',
        label: 'Arrêter le père et féliciter le fils',
        description: 'Lancer un raid immédiat et récompenser l\'enfant avec des rations sucrées.',
        effects: { fear: 10, loyalty: -12, infoControl: 10, rebelActivity: -5, rations: -10 }
      },
      {
        id: 'cit_child_ignore',
        label: 'Ignorer la dénonciation',
        description: 'Refuser de briser une famille pour des accusations non vérifiées.',
        effects: { loyalty: 5, infoControl: -2 }
      }
    ],
    loreTags: ['Dénonciation', 'Enfant', 'Infiltration'],
    repeatable: false
  },
  {
    id: 'cit_ration_scam',
    title: 'Falsification de Jetons de Rations',
    type: 'Citizen',
    severity: 2,
    description: 'Une usine de faux jetons de rations a été identifiée dans le Secteur des entrepôts. Des centaines de citoyens ont triché pour manger plus.',
    choices: [
      {
        id: 'cit_scam_crush',
        label: 'Fouiller et détruire le matériel',
        description: 'Saisir les faux jetons et punir sévèrement les tricheurs identifiés.',
        effects: { rations: 50, fear: 8, loyalty: -6 }
      },
      {
        id: 'cit_scam_lax',
        label: 'Laisser couler pour calmer la faim',
        description: 'Ignorer la fraude pour réduire le risque d\'émeute de la faim.',
        effects: { rations: -100, loyalty: 8, stability: 2 }
      }
    ],
    loreTags: ['Fraude', 'Entrepôts', 'Rations'],
    repeatable: true
  },
  {
    id: 'cit_workers_exhausted',
    title: 'Épuisement Généralisé des Ouvriers',
    type: 'Citizen',
    severity: 2,
    description: 'Les ouvriers du Complexe industriel s\'effondrent de fatigue sur les chaînes de montage, provoquant une chute des cadences de 25%.',
    choices: [
      {
        id: 'cit_exhaust_bribe',
        label: 'Accorder un jour de repos compensatoire',
        description: 'Permettre aux équipes de récupérer un jour complet.',
        effects: { industrialProduction: -20, civilianFatigue: -20, loyalty: 10, stability: 3 }
      },
      {
        id: 'cit_exhaust_stim',
        label: 'Injecter des stimulants chimiques',
        description: 'Mélanger des stimulants de synthèse à l\'eau potable pour maintenir la production.',
        effects: { industrialProduction: 10, civilianFatigue: 5, civilianCasualties: 8, rations: -50 }
      }
    ],
    loreTags: ['Épuisement', 'Industrie', 'Cadence'],
    repeatable: true
  },
  {
    id: 'cit_rebel_graffiti_workers',
    title: 'Graffiti Subversif à l\'Usine',
    type: 'Citizen',
    severity: 1,
    description: 'Une marque Lambda géante a été dessinée sur le flanc du réacteur industriel principal. Les ouvriers la nettoient avec une lenteur suspecte.',
    choices: [
      {
        id: 'cit_graffiti_punish',
        label: 'Punir l\'escouade d\'entretien',
        description: 'Retirer les rations de l\'équipe responsable de la zone.',
        effects: { fear: 8, loyalty: -5, rations: 20 }
      },
      {
        id: 'cit_graffiti_cp',
        label: 'Envoyer la CP nettoyer',
        description: 'Faire faire le travail par nos propres forces.',
        effects: { stability: 1, rations: -10 }
      }
    ],
    loreTags: ['Lambda', 'Industrie', 'Vandalisme'],
    repeatable: true
  },
  {
    id: 'cit_breencast_boycott',
    title: 'Boycott du Breencast Public',
    type: 'Citizen',
    severity: 2,
    description: 'Les citoyens de la place tournent systématiquement le dos aux écrans géants lorsque le Docteur Breen prend la parole.',
    choices: [
      {
        id: 'cit_boycott_arrest',
        label: 'Forcer le regard sous peine d\'amende',
        description: 'La CP infligera des amendes de rations à ceux qui détournent les yeux.',
        effects: { fear: 10, loyalty: -8, rations: 40, infoControl: 5 }
      },
      {
        id: 'cit_boycott_ignore',
        label: 'Laisser faire la population',
        description: 'Considérer que le message pénètre tout de même de manière subconsciente.',
        effects: { loyalty: 2, infoControl: -5 }
      }
    ],
    loreTags: ['Breencast', 'Place', 'Boycott'],
    repeatable: true
  },
  {
    id: 'cit_plague_rumor',
    title: 'Rumeur d\'une Peste Xen',
    type: 'Citizen',
    severity: 3,
    description: 'Une rumeur panique le Bloc Résidentiel B : une maladie parasitaire propagée par des spores Xen transformerait les gens en monstres.',
    choices: [
      {
        id: 'cit_plague_quarantine',
        label: 'Déclarer le confinement préventif',
        description: 'Sceller les portes du Bloc B pendant 48 heures.',
        effects: { stability: 2, fear: 15, civilianFatigue: 10, industrialProduction: -10 }
      },
      {
        id: 'cit_plague_debunk',
        label: 'Démentir publiquement',
        description: 'Utiliser les ondes pour dénoncer une fausse information de la Résistance.',
        effects: { infoControl: 10, stability: 1, loyalty: -2 }
      }
    ],
    loreTags: ['Maladie', 'Bloc B', 'Rumeurs'],
    repeatable: true
  },
  {
    id: 'cit_illegal_gather',
    title: 'Rassemblement Interdit Repéré',
    type: 'Citizen',
    severity: 2,
    description: 'Une cinquantaine de citoyens s\'est réunie sans autorisation dans les ruines pré-guerre pour commémorer la fin de la Guerre des Sept Heures.',
    choices: [
      {
        id: 'cit_gather_clean',
        label: 'Dispersion musclée CP',
        description: 'Envoyer la CP avec des matraques électriques disperser la foule.',
        effects: { fear: 12, loyalty: -8, stability: 3, rations: -20 }
      },
      {
        id: 'cit_gather_overwatch',
        label: 'Rafle totale Overwatch',
        description: 'Arrêter tous les participants pour transfert immédiat à Nova Prospekt.',
        effects: { civilianCasualties: 50, fear: 20, loyalty: -15, rebelActivity: 5 }
      }
    ],
    loreTags: ['Rassemblement', 'Ruines', 'Histoire'],
    repeatable: true
  },
  {
    id: 'cit_rebel_escape_tunnel',
    title: 'Tunnel d\'Évacuation Découvert',
    type: 'Citizen',
    severity: 3,
    description: 'Des Scanners ont localisé une trappe dissimulée sous le plancher du Bloc A, menant à un réseau de tunnels clandestins vers l\'extérieur.',
    choices: [
      {
        id: 'cit_tunnel_seal',
        label: 'Sceller au ciment',
        description: 'Condamner le tunnel pour couper la voie de fuite.',
        effects: { rebelActivity: -8, industrialProduction: -5, stability: 3 }
      },
      {
        id: 'cit_tunnel_trap',
        label: 'Installer des mines à capteur',
        description: 'Laisser le tunnel ouvert mais y placer des mines antipersonnel.',
        effects: { rebelActivity: -15, civilianCasualties: 8, fear: 10 }
      }
    ],
    loreTags: ['Tunnel', 'Bloc A', 'Fuite'],
    repeatable: true
  }
];
