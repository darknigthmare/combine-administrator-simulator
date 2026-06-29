import { GameEvent } from '../types/events';

export const xenEvents: GameEvent[] = [
  {
    id: 'xen_micro_rift',
    title: 'Micro-Faille Xen Active',
    type: 'Xen',
    severity: 2,
    description: 'Une micro-faille de portail s\'est ouverte dans le sous-sol du Complexe industriel. De l\'air Xen humide s\'en échappe, ainsi que des bruits de succion.',
    choices: [
      {
        id: 'xen_rift_quarantine',
        label: 'Déployer la Quarantaine',
        description: 'Isoler le sous-sol et envoyer une équipe de Metro Cops avec des brûleurs.',
        effects: { xenContamination: -8, rations: -30, stability: 2 }
      },
      {
        id: 'xen_rift_seal',
        label: 'Sceller le secteur immédiatement',
        description: 'Serrer les portes anti-souffle avec les ouvriers restés à l\'intérieur pour préserver la ville.',
        effects: { xenContamination: -15, civilianCasualties: 12, loyalty: -10, fear: 12 }
      },
      {
        id: 'xen_rift_ignore',
        label: 'Continuer la production',
        description: 'Ignorer les bruits pour ne pas interrompre les lignes de montage.',
        effects: { industrialProduction: 8, xenContamination: 12, stability: -5 }
      }
    ],
    loreTags: ['Faille', 'Portail', 'Industrie'],
    repeatable: true
  },
  {
    id: 'xen_headcrab_nest',
    title: 'Nid de Headcrabs dans les Conduits',
    type: 'Xen',
    severity: 1,
    description: 'Un nid de headcrabs classiques a été détecté dans les conduits de climatisation du Bloc Résidentiel B.',
    choices: [
      {
        id: 'xen_crab_manhacks',
        label: 'Déployer des Manhacks',
        description: 'Envoyer des lames rotatives dans les conduits pour découper les parasites.',
        effects: { xenContamination: -5, rations: -20, stability: 1 }
      },
      {
        id: 'xen_crab_evacuate',
        label: 'Évacuer le secteur',
        description: 'Déplacer temporairement les résidents vers le Bloc A pendant le nettoyage.',
        effects: { civilianFatigue: 8, rations: -30, xenContamination: -6 }
      },
      {
        id: 'xen_crab_ignore',
        label: 'Laisser les citoyens s\'en charger',
        description: 'Ne pas allouer de ressources. Risque élevé de propagation.',
        effects: { civilianCasualties: 5, xenContamination: 8, loyalty: -5 }
      }
    ],
    loreTags: ['Headcrab', 'Bloc B', 'Parasite'],
    repeatable: true
  },
  {
    id: 'xen_spore_rain',
    title: 'Pluie de Spores Toxiques',
    type: 'Xen',
    severity: 2,
    description: 'Des spores jaunes de Xen tombent en pluie fine sur la Place administrative, provoquant des irritations pulmonaires chez les civils.',
    choices: [
      {
        id: 'xen_spore_suppression',
        label: 'Déployer des filtres de ventilation',
        description: 'Activer les filtres de la Citadel sur les secteurs adjacents.',
        effects: { industrialProduction: -10, stability: 3, rations: -40 }
      },
      {
        id: 'xen_spore_mask',
        label: 'Distribuer des masques dégradés',
        description: 'Fournir des masques respiratoires en échange de travail supplémentaire.',
        effects: { loyalty: -5, industrialProduction: 5, civilianFatigue: 5, rations: -10 }
      },
      {
        id: 'xen_spore_lax',
        label: 'Laisser la pluie se dissiper',
        description: 'Considérer les irritations comme administrativement acceptables.',
        effects: { civilianCasualties: 8, stability: -3, xenContamination: 5 }
      }
    ],
    loreTags: ['Spores', 'Place', 'Atmosphère'],
    repeatable: true
  },
  {
    id: 'xen_wall_growths',
    title: 'Croissance Organique Murale',
    type: 'Xen',
    severity: 2,
    description: 'Une croûte gélatineuse et pulsante se développe sur les murs extérieurs du Quartier des travailleurs, bloquant les fenêtres.',
    choices: [
      {
        id: 'xen_wall_burn',
        label: 'Brûler au plasma',
        description: 'Utiliser les armes à impulsion thermique de la CP pour carboniser la matière.',
        effects: { xenContamination: -8, rations: -30, sectorInfrastructure: -5 }
      },
      {
        id: 'xen_wall_study',
        label: 'Prélever pour recherche',
        description: 'Envoyer des Scanners collecter des échantillons pour la Citadel.',
        effects: { infoControl: 8, rations: -20, xenContamination: 3 }
      }
    ],
    loreTags: ['Fongus', 'Travailleurs', 'Biomasse'],
    repeatable: true
  },
  {
    id: 'xen_barnacle_bloom',
    title: 'Invasion de Barnacles dans les Égouts',
    type: 'Xen',
    severity: 2,
    description: 'Des dizaines de Barnacles se sont accrochés aux plafonds des Égouts, attrapant tout ce qui passe en dessous.',
    choices: [
      {
        id: 'xen_barnacle_shoot',
        label: 'Élimination par tir ciblé CP',
        description: 'Envoyer une escouade éliminer méthodiquement chaque créature.',
        effects: { combineCasualties: 1, rations: -25, xenContamination: -10 }
      },
      {
        id: 'xen_barnacle_bait',
        label: 'Utiliser des appâts civils condamnés',
        description: 'Envoyer des anti-citoyens capturés pour saturer la digestion des Barnacles pendant le passage.',
        effects: { fear: 12, loyalty: -10, rebelActivity: 5, civilianCasualties: 3 }
      },
      {
        id: 'xen_barnacle_lax',
        label: 'Laisser le secteur en l\'état',
        description: 'Laisser les Barnacles bloquer les égouts, ce qui entrave aussi les mouvements rebelles.',
        effects: { rebelActivity: -8, stability: 1, xenContamination: 5 }
      }
    ],
    loreTags: ['Barnacle', 'Égouts', 'Piège'],
    repeatable: true
  },
  {
    id: 'xen_antlion_migration',
    title: 'Migration d\'Antlions Détectée',
    type: 'Xen',
    severity: 3,
    description: 'Une importante colonie d\'Antlions se déplace sous la Périphérie contaminée, leurs vibrations ébranlant le sol.',
    choices: [
      {
        id: 'xen_antlion_thumper',
        label: 'Surcharger les Thumpers',
        description: 'Faire tourner les limiteurs physiques à puissance maximale, consommant de l\'énergie.',
        effects: { industrialProduction: -12, stability: 5, rations: -30 }
      },
      {
        id: 'xen_antlion_overwatch',
        label: 'Déployer les Overwatch Chargers',
        description: 'Envoyer des troupes lourdes dresser une ligne de défense.',
        effects: { combineCasualties: 3, rebelActivity: -5, xenContamination: -12, rations: -50 }
      },
      {
        id: 'xen_antlion_evacuate',
        label: 'Abandonner la périphérie',
        description: 'Replier les troupes et laisser les créatures dévaster le secteur.',
        effects: { stability: -8, xenContamination: 15, combinePresence: -5 }
      }
    ],
    loreTags: ['Antlions', 'Thumper', 'Périphérie'],
    repeatable: true
  },
  {
    id: 'xen_lab_leak',
    title: 'Rupture de Confinement dans le Labo Combine',
    type: 'Xen',
    severity: 4,
    description: 'Une éprouvette contenant des spores mutées a éclaté dans la Zone proche Citadel. La contamination se répand dans les bureaux administratifs.',
    choices: [
      {
        id: 'xen_leak_purge',
        label: 'Protocole de purge Citadel',
        description: 'Déclencher la stérilisation thermique interne.',
        effects: { stability: -5, rations: -60, combineCasualties: 2, xenContamination: -15, infoControl: 5 }
      },
      {
        id: 'xen_leak_isolate',
        label: 'Isoler l\'aile scientifique',
        description: 'Sceller hermétiquement les chercheurs à l\'intérieur pour sauver le reste de la tour.',
        effects: { combineCasualties: 8, infoControl: -5, xenContamination: -8, stability: 2 }
      }
    ],
    loreTags: ['Laboratoire', 'Citadel', 'Accident'],
    repeatable: false
  },
  {
    id: 'xen_portal_storm',
    title: 'Tempête de Portails Mineure',
    type: 'Xen',
    severity: 3,
    description: 'Des éclairs verts frappent le Nœud ferroviaire Razor Train. Des créatures Xen apparaissent directement sur les rails.',
    choices: [
      {
        id: 'xen_storm_soldiers',
        label: 'Déployer l\'infanterie Overwatch',
        description: 'Éliminer les créatures au fusil à impulsions.',
        effects: { combineCasualties: 2, xenContamination: -10, industrialProduction: -5, rations: -45 }
      },
      {
        id: 'xen_storm_shield',
        label: 'Activer le bouclier de force ferroviaire',
        description: 'Surcharger les rails électriques pour calciner les intrus.',
        effects: { industrialProduction: -15, stability: 3, citadelEnergy: -8 }
      }
    ],
    loreTags: ['Tempête', 'Razor Train', 'Énergie'],
    repeatable: true
  },
  {
    id: 'xen_water_infestation',
    title: 'Zone Aquatique Infestée par Ichthyosaur',
    type: 'Xen',
    severity: 3,
    description: 'Un Ichthyosaur géant a élu domicile dans le bassin des Canaux, bloquant tout transit civil ou rebelle par l\'eau.',
    choices: [
      {
        id: 'xen_water_mine',
        label: 'Miner le bassin',
        description: 'Jeter des grenades à impulsion lourde pour tuer le monstre.',
        effects: { stability: 3, rations: -40, sectorInfrastructure: -10, xenContamination: -8 }
      },
      {
        id: 'xen_water_ignore',
        label: 'Laisser la créature comme défense naturelle',
        description: 'L\'Ichthyosaur dévorera les rebelles tentant de fuir par les canaux.',
        effects: { rebelActivity: -10, stability: 2, xenContamination: 5 }
      }
    ],
    loreTags: ['Ichthyosaur', 'Canaux', 'Eau'],
    repeatable: false
  },
  {
    id: 'xen_collapse_sewers',
    title: 'Effondrement Organique des Égouts',
    type: 'Xen',
    severity: 3,
    description: 'Une prolifération fongique a fait s\'effondrer une section des Égouts, menaçant les fondations du Bloc Résidentiel A.',
    choices: [
      {
        id: 'xen_collapse_fill',
        label: 'Injecter du béton industriel',
        description: 'Combler la faille avec des matériaux industriels.',
        effects: { industrialProduction: -10, stability: 4, rations: -30 }
      },
      {
        id: 'xen_collapse_abandon',
        label: 'Abandonner le conduit',
        description: 'Sceller l\'accès et laisser la biomasse Xen digérer les fondations.',
        effects: { stability: -10, xenContamination: 12, sectorInfrastructure: -15 }
      }
    ],
    loreTags: ['Égouts', 'Effondrement', 'Fongus'],
    repeatable: true
  },
  {
    id: 'xen_quarantine_leak',
    title: 'Fouissement hors de la Quarantaine',
    type: 'Xen',
    severity: 4,
    description: 'L\'infestation Xen de la Zone de quarantaine a percé le mur d\'isolement physique et envahit l\'Ancien hôpital.',
    choices: [
      {
        id: 'xen_leak_rebuild',
        label: 'Reconstruire le mur d\'urgence',
        description: 'Déployer des ouvriers civils sous la protection d\'Overwatch Chargers.',
        effects: { industrialProduction: -15, civilianCasualties: 10, combineCasualties: 2, xenContamination: -12 }
      },
      {
        id: 'xen_leak_abandon_hosp',
        label: 'Déclarer l\'hôpital zone compromise',
        description: 'Étendre la zone de quarantaine pour englober l\'Ancien hôpital.',
        effects: { stability: -8, fear: 12, xenContamination: 8 }
      },
      {
        id: 'xen_leak_burn',
        label: 'Purge thermique générale du secteur',
        description: 'Utiliser des frappes de mortier incendiaire sur l\'hôpital.',
        effects: { sectorInfrastructure: -25, civilianCasualties: 15, xenContamination: -20, stability: -5 }
      }
    ],
    loreTags: ['Quarantaine', 'Hôpital', 'Fuite'],
    repeatable: false
  },
  {
    id: 'xen_industrial_vibrations',
    title: 'Faune Attirée par les Vibrations',
    type: 'Xen',
    severity: 3,
    description: 'Le bruit des forges du Complexe industriel attire des hordes d\'Houndeyes depuis les égouts adjacents.',
    choices: [
      {
        id: 'xen_vib_thumpers',
        label: 'Installer des mini-thumpers industriels',
        description: 'Détourner des ressources pour protéger le complexe par des ondes de choc.',
        effects: { industrialProduction: -8, stability: 3, rations: -45 }
      },
      {
        id: 'xen_vib_cp',
        label: 'Faire monter la garde par la CP',
        description: 'Poster des Metro Cops en patrouille permanente autour des usines.',
        effects: { combinePresence: 5, combineCasualties: 2, rations: -25 }
      }
    ],
    loreTags: ['Houndeye', 'Industrie', 'Bruit'],
    repeatable: true
  },
  {
    id: 'xen_razor_infection',
    title: 'Contamination d\'un Razor Train',
    type: 'Xen',
    severity: 3,
    description: 'Un train de marchandises arrivant de l\'extérieur est infesté de parasites Barnacles collés sur ses wagons.',
    choices: [
      {
        id: 'xen_train_purge',
        label: 'Stériliser le train au dépôt',
        description: 'Brûler la cargaison extérieure avant déchargement.',
        effects: { industrialProduction: -10, rations: -30, xenContamination: -8 }
      },
      {
        id: 'xen_train_unload',
        label: 'Décharger malgré tout',
        description: 'Prendre le risque d\'infester le Nœud ferroviaire pour ne pas perdre de temps.',
        effects: { industrialProduction: 5, xenContamination: 10, stability: -3 }
      }
    ],
    loreTags: ['Razor Train', 'Barnacle', 'Logistique'],
    repeatable: true
  },
  {
    id: 'xen_block_infestation',
    title: 'Infection du Bloc Résidentiel A',
    type: 'Xen',
    severity: 4,
    description: 'Plusieurs résidents du Bloc Résidentiel A ont été transformés en zombies après l\'intrusion silencieuse de Fast Headcrabs par les toits.',
    choices: [
      {
        id: 'xen_block_purge',
        label: 'Nettoyage par Overwatch Grunts',
        description: 'Envoyer des escouades purger systématiquement le bloc appartement par appartement.',
        effects: { civilianCasualties: 25, combineCasualties: 1, fear: 12, xenContamination: -15, rations: -40 }
      },
      {
        id: 'xen_block_seal_active',
        label: 'Sceller le bloc résidentiel A',
        description: 'Condamner toutes les sorties pour laisser l\'infection s\'éteindre d\'elle-même.',
        effects: { stability: -8, civilianCasualties: 50, fear: 20, loyalty: -15, xenContamination: -10 }
      },
      {
        id: 'xen_block_lax',
        label: 'Dissimuler et distribuer des kits CP',
        description: 'Masquer l\'incident pour éviter la panique et laisser la CP surveiller les issues.',
        effects: { infoControl: 10, fear: 5, xenContamination: 8 }
      }
    ],
    loreTags: ['Zombie', 'Bloc A', 'Infection'],
    repeatable: true
  },
  {
    id: 'xen_tentacle_spotted',
    title: 'Tentacule Géant dans le Sous-sol Technique',
    type: 'Xen',
    severity: 4,
    description: 'Un tentacule Xen géant s\'est enraciné dans le Sous-sol technique, attaquant au moindre bruit et bloquant les conduites de vapeur de la Citadel.',
    choices: [
      {
        id: 'xen_tentacle_overwatch',
        label: 'Assaut lourd coordonné',
        description: 'Déployer des Overwatch Elites avec grenades à distorsion.',
        effects: { combineCasualties: 3, rations: -60, stability: 4, xenContamination: -20 }
      },
      {
        id: 'xen_tentacle_divert',
        label: 'Détourner la vapeur',
        description: 'Isoler le secteur et couper le chauffage dans le Bloc Résidentiel B.',
        effects: { civilianFatigue: 12, stability: -5, industrialProduction: -10 }
      }
    ],
    loreTags: ['Tentacule', 'Vapeur', 'Sous-sol'],
    repeatable: false
  },
  {
    id: 'xen_gonarch_rumor',
    title: 'Menace Biologique Majeure : Gonarch',
    type: 'Xen',
    severity: 5,
    description: 'Les scanners longue portée détectent une signature organique massive correspondant à un Gonarch en périphérie de la Zone de quarantaine.',
    choices: [
      {
        id: 'xen_gonarch_citadel_purge',
        label: 'Déclencher la Purge Citadel',
        description: 'Demander l\'autorisation d\'un bombardement énergétique direct de la Citadel sur le secteur.',
        effects: { citadelEnergy: -25, stability: 5, xenContamination: -35, sectorInfrastructure: -40 }
      },
      {
        id: 'xen_gonarch_army',
        label: 'Déployer Striders et Hunters',
        description: 'Engager une véritable armée synthétique pour abattre la créature.',
        effects: { combineCasualties: 8, rations: -120, combinePresence: 10, xenContamination: -25, stability: 8 }
      },
      {
        id: 'xen_gonarch_quarantine_seal',
        label: 'Renforcer la quarantaine de base',
        description: 'Abandonner définitivement le secteur et doubler l\'épaisseur des barrières d\'isolement.',
        effects: { industrialProduction: -15, stability: -10, fear: 15, xenContamination: 10 }
      }
    ],
    loreTags: ['Gonarch', 'Catastrophe', 'Citadel'],
    repeatable: false
  },
  {
    id: 'xen_bullsquid_industrial',
    title: 'Nid de Bullsquids aux Entrepôts',
    type: 'Xen',
    severity: 2,
    description: 'Une famille de Bullsquids s\'est installée dans le Secteur des entrepôts, dévorant les stocks de rations et projetant de l\'acide sur les Metro Cops.',
    choices: [
      {
        id: 'xen_bull_kill',
        label: 'Éliminer au fusil d\'assaut',
        description: 'Envoyer une patrouille CP éliminer les bêtes.',
        effects: { combineCasualties: 1, rations: -100, xenContamination: -8 }
      },
      {
        id: 'xen_bull_bait',
        label: 'Utiliser de la viande synthétique empoisonnée',
        description: 'Créer un piège chimique en sacrifiant des rations pour les empoisonner.',
        effects: { rations: -120, xenContamination: -12, stability: 2 }
      }
    ],
    loreTags: ['Bullsquid', 'Entrepôts', 'Rations'],
    repeatable: true
  },
  {
    id: 'xen_houndeye_pack',
    title: 'Meute d\'Houndeyes dans les Ruines',
    type: 'Xen',
    severity: 2,
    description: 'Une meute d\'Houndeyes produit des ondes sonores destructrices dans les Ruines pré-guerre, provoquant des fissures dans les derniers bâtiments sûrs.',
    choices: [
      {
        id: 'xen_hound_purge',
        label: 'Purger par Scanners offensifs',
        description: 'Envoyer des drones équipés de charges sonores inverses.',
        effects: { rations: -30, xenContamination: -10 }
      },
      {
        id: 'xen_hound_ignore',
        label: 'Laisser le secteur s\'effondrer',
        description: 'Ne rien faire. Les Ruines ne sont pas prioritaires.',
        effects: { sectorInfrastructure: -15, stability: -1, xenContamination: 8 }
      }
    ],
    loreTags: ['Houndeye', 'Ruines', 'Son'],
    repeatable: true
  },
  {
    id: 'xen_fungus_water',
    title: 'Fongus Xen dans l\'Eau Potable',
    type: 'Xen',
    severity: 3,
    description: 'Un fongus Xen s\'est propagé dans le relais de pompage des Canaux, polluant l\'eau qui alimente le Quartier des travailleurs.',
    choices: [
      {
        id: 'xen_fungus_clean',
        label: 'Purger chimiquement le réseau',
        description: 'Injecter du désherbant toxique, coupant l\'eau aux civils temporairement.',
        effects: { industrialProduction: -10, civilianFatigue: 12, xenContamination: -10, rations: -30 }
      },
      {
        id: 'xen_fungus_ignore',
        label: 'Ne pas traiter l\'eau',
        description: 'Laisser couler l\'eau contaminée pour éviter d\'arrêter les machines.',
        effects: { civilianCasualties: 20, loyalty: -15, stability: -5, xenContamination: 10 }
      }
    ],
    loreTags: ['Canaux', 'Eau', 'Fongus'],
    repeatable: false
  },
  {
    id: 'xen_fast_headcrab_outbreak',
    title: 'Alerte Fast Headcrabs',
    type: 'Xen',
    severity: 3,
    description: 'Des parasites Fast Headcrabs se déplacent en bandes rapides sur la Place administrative, terrorisant les fonctionnaires de l\'Union.',
    choices: [
      {
        id: 'xen_fast_soldier',
        label: 'Déployer l\'Overwatch Soldat',
        description: 'Sécuriser la place par un déploiement armé.',
        effects: { combinePresence: 3, rations: -35, xenContamination: -12, fear: 6 }
      },
      {
        id: 'xen_fast_cp',
        label: 'Ordonner à la CP de faire rempart',
        description: 'Envoyer les Metro Cops locaux avec des matraques électriques et des pistolets.',
        effects: { combineCasualties: 2, xenContamination: -8, fear: 4 }
      }
    ],
    loreTags: ['Headcrab', 'Place', 'Sécurité'],
    repeatable: true
  },
  {
    id: 'xen_poison_zombie_spotted',
    title: 'Poison Zombie Repéré près du Foyer',
    type: 'Xen',
    severity: 3,
    description: 'Un Poison Zombie transportant plusieurs parasites venimeux traîne autour du Quartier des travailleurs, ses gémissements terrifiant les ouvriers.',
    choices: [
      {
        id: 'xen_poison_sniper',
        label: 'Tir Overwatch de précision',
        description: 'Éliminer la menace à distance avant qu\'elle n\'approche du foyer.',
        effects: { stability: 3, rations: -20, xenContamination: -6 }
      },
      {
        id: 'xen_poison_ignore',
        label: 'Laisser la CP locale gérer',
        description: 'La CP n\'est pas équipée pour cela. Risque élevé de pertes.',
        effects: { combineCasualties: 3, civilianCasualties: 5, fear: 12, xenContamination: 5 }
      }
    ],
    loreTags: ['Zombie', 'Venin', 'Travailleurs'],
    repeatable: true
  },
  {
    id: 'xen_antlion_ventilation',
    title: 'Nid d\'Antlions Workers dans la Ventilation',
    type: 'Xen',
    severity: 3,
    description: 'Des Antlions Workers projettent de l\'acide dans les conduits de climatisation de la Citadel locale, menaçant le matériel informatique.',
    choices: [
      {
        id: 'xen_vent_purge',
        label: 'Surcharger les circuits de vapeur',
        description: 'Ébouillanter les créatures dans les tuyaux, endommageant nos installations.',
        effects: { industrialProduction: -12, stability: 2, xenContamination: -10, citadelEnergy: -5 }
      },
      {
        id: 'xen_vent_elite',
        label: 'Envoyer des Overwatch Elites',
        description: 'Faire nettoyer physiquement les conduites par nos meilleures troupes.',
        effects: { combineCasualties: 1, rations: -40, xenContamination: -8 }
      }
    ],
    loreTags: ['Antlions', 'Ventilation', 'Citadel'],
    repeatable: true
  },
  {
    id: 'xen_spore_cloud',
    title: 'Nuage de Spores Inflammables',
    type: 'Xen',
    severity: 3,
    description: 'Un nuage de spores hautement explosives stagne au-dessus du Nœud ferroviaire Razor Train. Une simple étincelle déclenchera un désastre.',
    choices: [
      {
        id: 'xen_cloud_stop',
        label: 'Arrêter le trafic ferroviaire',
        description: 'Attendre que le vent dissipe le nuage de spores.',
        effects: { industrialProduction: -20, stability: 2 }
      },
      {
        id: 'xen_cloud_burn',
        label: 'Brûler par tir laser de précision',
        description: 'Déclencher la combustion contrôlée des spores à distance. Risque de dégâts aux rails.',
        effects: { sectorInfrastructure: -15, industrialProduction: -5, xenContamination: -12 }
      }
    ],
    loreTags: ['Spores', 'Razor Train', 'Explosif'],
    repeatable: true
  },
  {
    id: 'xen_ichthyosaur_pumping',
    title: 'Ichthyosaur Bloqué dans les Turbines',
    type: 'Xen',
    severity: 2,
    description: 'Une créature aquatique s\'est coincée dans les turbines de refroidissement du Complexe industriel, menaçant de faire exploser la centrale électrique.',
    choices: [
      {
        id: 'xen_turbine_clean',
        label: 'Arrêter et désinfecter',
        description: 'Couper la centrale et envoyer la CP tronçonner la créature.',
        effects: { industrialProduction: -15, rations: -30, combineCasualties: 1, xenContamination: -8 }
      },
      {
        id: 'xen_turbine_overload',
        label: 'Forcer la turbine à broyer la bête',
        description: 'Faire tourner les turbines à puissance maximale pour hacher le monstre. Risque d\'usure majeure.',
        effects: { sectorInfrastructure: -25, industrialProduction: 5, xenContamination: -12 }
      }
    ],
    loreTags: ['Ichthyosaur', 'Turbine', 'Industrie'],
    repeatable: false
  },
  {
    id: 'xen_antlion_highway',
    title: 'Incursion d\'Antlions sur la Voie d\'APC',
    type: 'Xen',
    severity: 3,
    description: 'Des Antlions ont creusé sous la route principale de patrouille du Poste CP, provoquant l\'effondrement de la chaussée et bloquant nos véhicules APC.',
    choices: [
      {
        id: 'xen_highway_repair',
        label: 'Réparer la chaussée en priorité',
        description: 'Utiliser du bitume synthétique sous escorte militaire.',
        effects: { industrialProduction: -10, rations: -40, stability: 3 }
      },
      {
        id: 'xen_highway_patrol',
        label: 'Dévier les patrouilles à pied',
        description: 'Envoyer les Metro Cops patrouiller sans couverture blindée.',
        effects: { combinePresence: -5, combineCasualties: 2 }
      }
    ],
    loreTags: ['Antlions', 'APC', 'Route'],
    repeatable: true
  },
  {
    id: 'xen_quarantine_expansion',
    title: 'Extension Administrative de la Quarantaine',
    type: 'Xen',
    severity: 4,
    description: 'Les Advisors estiment que le Bloc Résidentiel B est irrémédiablement contaminé et exigent son raccordement à la Zone de quarantaine.',
    choices: [
      {
        id: 'xen_expand_accept',
        label: 'Accepter et sceller le Bloc B',
        description: 'Condamner le Bloc B définitivement. Sa population est perdue.',
        effects: { stability: -15, civilianCasualties: 100, fear: 25, loyalty: -20, xenContamination: -10 }
      },
      {
        id: 'xen_expand_refuse',
        label: 'Tenter un nettoyage Overwatch massif',
        description: 'Refuser le scellement et envoyer d\'immenses forces purger le secteur.',
        effects: { combineCasualties: 6, rations: -100, xenContamination: -20, stability: 5 }
      }
    ],
    loreTags: ['Quarantaine', 'Bloc B', 'Advisors'],
    repeatable: false
  },
  {
    id: 'xen_fungus_ventilation',
    title: 'Fongus dans la Climatisation Administrative',
    type: 'Xen',
    severity: 1,
    description: 'Une odeur âcre de Xen se répand dans vos bureaux. Du fongus jaune a poussé dans les filtres à air.',
    choices: [
      {
        id: 'xen_air_clean',
        label: 'Faire nettoyer par des détenus civils',
        description: 'Envoyer des prisonniers dans les conduits sans équipement de protection.',
        effects: { civilianCasualties: 1, rations: -10, stability: 1 }
      },
      {
        id: 'xen_air_filter',
        label: 'Acheter des filtres certifiés',
        description: 'Allouer des rations pour acquérir du matériel de rechange.',
        effects: { rations: -30 }
      }
    ],
    loreTags: ['Fongus', 'Administration', 'Air'],
    repeatable: true
  },
  {
    id: 'xen_antlion_worker_attack',
    title: 'Incursion Acide d\'Antlions',
    type: 'Xen',
    severity: 3,
    description: 'Des Antlions Workers ont jailli du sol de la Gare de transit, projetant de l\'acide sur les passagers et dissolvant les guichets de contrôle.',
    choices: [
      {
        id: 'xen_trans_soldiers',
        label: 'Déployer des soldats de l\'Overwatch',
        description: 'Nettoyer la gare militairement.',
        effects: { combineCasualties: 1, rations: -35, xenContamination: -12, fear: 6 }
      },
      {
        id: 'xen_trans_gas',
        label: 'Purger par gaz neurotoxique temporaire',
        description: 'Gaz de stérilisation de la gare. Les civils à proximité seront également touchés.',
        effects: { civilianCasualties: 15, stability: -5, xenContamination: -18, rations: -50 }
      }
    ],
    loreTags: ['Antlions', 'Gare', 'Acide'],
    repeatable: true
  },
  {
    id: 'xen_zombie_mass',
    title: 'Horde de Zombies dans les Canaux',
    type: 'Xen',
    severity: 3,
    description: 'Une masse compacte d\'une cinquantaine de zombies remonte les Canaux vers le Secteur des entrepôts.',
    choices: [
      {
        id: 'xen_horde_apc',
        label: 'Déployer un APC en soutien',
        description: 'Pilonner la horde avec le canon à impulsions de l\'APC.',
        effects: { rations: -40, sectorInfrastructure: -10, xenContamination: -15, stability: 3 }
      },
      {
        id: 'xen_horde_scanners',
        label: 'Attirer les zombies vers la Résistance',
        description: 'Utiliser des scanners sonores pour dévier la horde vers un campement rebelle identifié.',
        effects: { rebelActivity: -12, stability: -2, xenContamination: 5, rations: -20 }
      }
    ],
    loreTags: ['Zombie', 'Canaux', 'Horde'],
    repeatable: true
  },
  {
    id: 'xen_portal_storm_citadel',
    title: 'Incursion de Faille dans la Citadel',
    type: 'Xen',
    severity: 4,
    description: 'Une rupture dimensionnelle temporaire fait apparaître des Xen Spores et des Barnacles directement dans les générateurs d\'énergie de la Citadel.',
    choices: [
      {
        id: 'xen_faille_purge',
        label: 'Surcharger les générateurs',
        description: 'Vaporiser les créatures par une décharge énergétique interne majeure.',
        effects: { citadelEnergy: -15, stability: 2, xenContamination: -12 }
      },
      {
        id: 'xen_faille_manual',
        label: 'Envoyer les soldats d\'élite purger à la main',
        description: 'Tenter de nettoyer sans endommager le noyau.',
        effects: { combineCasualties: 2, rations: -50, xenContamination: -10, stability: 4 }
      }
    ],
    loreTags: ['Faille', 'Citadel', 'Énergie'],
    repeatable: false
  }
];
