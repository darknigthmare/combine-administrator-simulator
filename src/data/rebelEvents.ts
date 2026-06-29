import { GameEvent } from '../types/events';

export const rebelEvents: GameEvent[] = [
  {
    id: 'reb_graffiti',
    title: 'Graffiti Lambda Détecté',
    type: 'Rebel',
    severity: 1,
    description: 'Une marque Lambda orange a été peinte sur le mur du Bloc Résidentiel A, à la vue de tous. Les citoyens se rassemblent pour la contempler en chuchotant.',
    choices: [
      {
        id: 'reb_graffiti_erase',
        label: 'Effacer et patrouiller',
        description: 'Faire repeindre le mur immédiatement et déployer des Metro Cops pour surveiller la zone.',
        effects: { stability: 2, infoControl: 5, rations: -10, fear: 2, sectorInfrastructure: 2 }
      },
      {
        id: 'reb_graffiti_ignore',
        label: 'Ignorer l\'incident',
        description: 'Laisser le graffiti actif pour économiser nos effectifs de surveillance.',
        effects: { loyalty: 5, rebelActivity: 3, stability: -2 }
      },
      {
        id: 'reb_graffiti_punish',
        label: 'Punition collective locale',
        description: 'Réduire les rations du bloc de 10% pour forcer les résidents à dénoncer l\'auteur.',
        effects: { fear: 12, loyalty: -8, rebelActivity: 5, rations: 50 }
      }
    ],
    loreTags: ['Lambda', 'Subversion', 'Bloc A'],
    repeatable: true
  },
  {
    id: 'reb_pirate_radio',
    title: 'Radio Pirate Lambda Active',
    type: 'Rebel',
    severity: 2,
    description: 'Un signal radio non autorisé diffuse un message subversif appelant à refuser le rationnement et à saboter les terminaux administratifs.',
    choices: [
      {
        id: 'reb_radio_jam',
        label: 'Brouiller le signal',
        description: 'Détourner de l\'énergie industrielle pour saturer la fréquence.',
        effects: { infoControl: 10, rebelActivity: -3, industrialProduction: -5 }
      },
      {
        id: 'reb_radio_scanners',
        label: 'Déployer des Scanners',
        description: 'Envoyer des drones trianguler la position de l\'émetteur.',
        effects: { infoControl: 5, fear: 4, combinePresence: 1, rations: -20 }
      },
      {
        id: 'reb_radio_raid',
        label: 'Raid résidentiel massif',
        description: 'Lancer une inspection porte-à-porte brutale dans le secteur suspect.',
        effects: { rebelActivity: -8, loyalty: -10, fear: 15, rations: -30 }
      }
    ],
    loreTags: ['Radio', 'Citadel', 'Information'],
    repeatable: true
  },
  {
    id: 'reb_clandestine_rations',
    title: 'Distribution Clandestine de Rations',
    type: 'Rebel',
    severity: 2,
    description: 'Des contrebandiers rebelles distribuent des suppléments de rations volées dans le Quartier des travailleurs pour s\'attirer la sympathie civile.',
    choices: [
      {
        id: 'reb_rations_seize',
        label: 'Saisir les stocks',
        description: 'Intervenir militairement pour confisquer les denrées clandestines.',
        effects: { rations: 100, fear: 6, loyalty: -10, rebelActivity: -5 }
      },
      {
        id: 'reb_rations_poison',
        label: 'Contaminer discrètement les stocks',
        description: 'Laisser faire la distribution après avoir introduit un agent pathogène léger pour discréditer la Résistance.',
        effects: { fear: 12, loyalty: -5, civilianCasualties: 15, rebelActivity: -8, stability: -4 }
      },
      {
        id: 'reb_rations_lax',
        label: 'Fermer les yeux temporairement',
        description: 'Permettre aux citoyens d\'être nourris, réduisant leur niveau de sédition immédiat.',
        effects: { loyalty: 8, civilianFatigue: -10, rebelActivity: 4 }
      }
    ],
    loreTags: ['Rations', 'Marché Noir', 'Travailleurs'],
    repeatable: true
  },
  {
    id: 'reb_weapons_cache',
    title: 'Cache d\'Armes Lambda Découverte',
    type: 'Rebel',
    severity: 3,
    description: 'Un informateur anonyme a révélé l\'existence d\'une cache d\'armes rebelles contenant des pistolets de la Civil Protection et des grenades sous les Ruines.',
    choices: [
      {
        id: 'reb_cache_secure',
        label: 'Sécuriser le matériel',
        description: 'Saisir les armes et les recycler pour nos usines de munitions.',
        effects: { industrialProduction: 5, rebelActivity: -10, stability: 3, rations: -20 }
      },
      {
        id: 'reb_cache_ambush',
        label: 'Tendre une embuscade',
        description: 'Laisser la cache en place et poster des Metro Cops cachés pour capturer les rebelles venant s\'approvisionner.',
        effects: { rebelActivity: -15, combineCasualties: 2, fear: 8 }
      },
      {
        id: 'reb_cache_reward',
        label: 'Récompenser l\'informateur',
        description: 'Donner des rations supplémentaires substantielles à l\'informateur pour encourager la délation.',
        effects: { rations: -80, loyalty: 2, fear: 5, infoControl: 8 }
      }
    ],
    loreTags: ['Armes', 'Ruines', 'Dénonciation'],
    repeatable: true
  },
  {
    id: 'reb_cop_ambush',
    title: 'Embuscade dans les Canaux',
    type: 'Rebel',
    severity: 3,
    description: 'Une patrouille de deux Metro Cops a été prise dans une embuscade tendue par des rebelles armés dans les Canaux. Leurs corps ont été abandonnés.',
    choices: [
      {
        id: 'reb_ambush_purge',
        label: 'Purger les Canaux',
        description: 'Envoyer des escouades de soldats de l\'Overwatch nettoyer le réseau aquatique.',
        effects: { combinePresence: 5, combineCasualties: 3, rebelActivity: -12, fear: 8, rations: -50 }
      },
      {
        id: 'reb_ambush_manhacks',
        label: 'Inonder de Manhacks',
        description: 'Lancer un essaim de Manhacks dans les tunnels des Canaux pour une élimination automatisée.',
        effects: { rebelActivity: -8, rations: -40, fear: 10 }
      },
      {
        id: 'reb_ambush_seal',
        label: 'Sceller l\'accès aux Canaux',
        description: 'Bloquer physiquement les liaisons entre les égouts et les Canaux par des grilles soudées.',
        effects: { stability: 5, rebelActivity: -5, industrialProduction: -10 }
      }
    ],
    loreTags: ['Canaux', 'Pertes', 'Metro Cops'],
    repeatable: true
  },
  {
    id: 'reb_generator_sabotage',
    title: 'Sabotage du Générateur Principal',
    type: 'Rebel',
    severity: 4,
    description: 'Un engin explosif a endommagé le générateur du Complexe industriel, provoquant une coupure de courant générale et menaçant l\'énergie de la Citadel.',
    choices: [
      {
        id: 'reb_gen_repair',
        label: 'Réparer en urgence industrielle',
        description: 'Forcer les ouvriers à doubler leurs rotations dans le noir pour rétablir le système.',
        effects: { industrialProduction: -5, civilianFatigue: 15, stability: 3, rations: -50 }
      },
      {
        id: 'reb_gen_citadel',
        label: 'Siphonner l\'énergie de la Citadel',
        description: 'Compenser la perte de production par un prélèvement d\'énergie direct sur la Citadel.',
        effects: { citadelEnergy: -15, stability: 5, industrialProduction: 2 }
      },
      {
        id: 'reb_gen_punish',
        label: 'Exécution administrative d\'otages',
        description: 'Exécuter 5 ouvriers suspectés de complicité pour l\'exemple.',
        effects: { fear: 20, loyalty: -15, rebelActivity: 10, civilianCasualties: 5 }
      }
    ],
    loreTags: ['Sabotage', 'Énergie', 'Industrie'],
    repeatable: true
  },
  {
    id: 'reb_scanner_destroyed',
    title: 'Destruction de Scanners en Série',
    type: 'Rebel',
    severity: 2,
    description: 'Plusieurs City Scanners ont été abattus par des jets de briques et des tirs de fusils artisanaux au-dessus du Bloc Résidentiel B.',
    choices: [
      {
        id: 'reb_scan_replace',
        label: 'Remplacer les unités',
        description: 'Déployer de nouveaux Scanners depuis les réserves administratives.',
        effects: { rations: -30, combinePresence: 1, infoControl: 5 }
      },
      {
        id: 'reb_scan_apc',
        label: 'Envoyer une patrouille d\'APC',
        description: 'Faire traverser le bloc par un APC blindé pour terroriser les fauteurs de troubles.',
        effects: { fear: 12, loyalty: -5, stability: 3, rations: -20 }
      },
      {
        id: 'reb_scan_curfew',
        label: 'Décréter le couvre-feu local',
        description: 'Verrouiller les portes des blocs résidentiels pendant 24 heures.',
        effects: { stability: 5, civilianFatigue: 8, industrialProduction: -10 }
      }
    ],
    loreTags: ['Scanners', 'Bloc B', 'Dégâts'],
    repeatable: true
  },
  {
    id: 'reb_checkpoint_attack',
    title: 'Attaque d\'un Check-point Civil Protection',
    type: 'Rebel',
    severity: 3,
    description: 'Des assaillants armés ont pris d\'assaut le check-point de la Gare de transit, tuant un Metro Cop et s\'emparant d\'un terminal de cryptage.',
    choices: [
      {
        id: 'reb_check_overwatch',
        label: 'Déployer l\'Overwatch',
        description: 'Envoyer des soldats de l\'Overwatch sceller les issues de la gare.',
        effects: { combinePresence: 5, rebelActivity: -10, combineCasualties: 1, rations: -40 }
      },
      {
        id: 'reb_check_lock',
        label: 'Verrouiller les codes d\'accès',
        description: 'Mettre à jour les clés de sécurité, rendant le terminal volé inutile mais ralentissant notre réseau.',
        effects: { infoControl: 8, industrialProduction: -8, stability: 2 }
      },
      {
        id: 'reb_check_brutality',
        label: 'Raid de représailles brutal',
        description: 'Arrêter au hasard 20 citoyens présents à la gare et les transférer à Nova Prospekt.',
        effects: { fear: 18, loyalty: -12, rebelActivity: 8, civilianCasualties: 20 }
      }
    ],
    loreTags: ['Check-point', 'Gare', 'Pertes'],
    repeatable: true
  },
  {
    id: 'reb_prisoner_escape',
    title: 'Évasion Administrative Major',
    type: 'Rebel',
    severity: 3,
    description: 'Lors d\'un transfert vers le Razor Train, trois dirigeants rebelles présumés ont été libérés par un commando armé qui a fait sauter la porte du fourgon.',
    choices: [
      {
        id: 'reb_escape_hunt',
        label: 'Lancer les Hunters',
        description: 'Déployer des synthés Hunters pour traquer les fugitifs à l\'odeur.',
        effects: { fear: 8, rebelActivity: -12, rations: -60 }
      },
      {
        id: 'reb_escape_advisors',
        label: 'Utiliser la détection psychique',
        description: 'Solliciter l\'aide d\'un Advisor pour scanner l\'esprit des citoyens locaux.',
        effects: { citadelEnergy: -10, fear: 15, infoControl: 12 }
      },
      {
        id: 'reb_escape_lax',
        label: 'Dissimuler l\'évasion',
        description: 'Masquer l\'incident dans les rapports de la Citadel pour éviter les sanctions.',
        effects: { stability: -5, infoControl: -10, loyalty: 2 }
      }
    ],
    loreTags: ['Évasion', 'Razor Train', 'Hunters'],
    repeatable: false
  },
  {
    id: 'reb_vortigaunt_spotted',
    title: 'Vortigaunt non Enregistré Repéré',
    type: 'Rebel',
    severity: 2,
    description: 'Un Vortigaunt sauvage a été aperçu dans les Égouts, aidant les réfugiés humains à charger des batteries de fortune.',
    choices: [
      {
        id: 'reb_vort_capture',
        label: 'Tenter la capture vivante',
        description: 'Envoyer une équipe spécialisée de la Civil Protection pour l\'assommer et le livrer à la Citadel.',
        effects: { combineCasualties: 1, rations: -30, infoControl: 8, stability: 2 }
      },
      {
        id: 'reb_vort_kill',
        label: 'Ordre d\'exécution immédiat',
        description: 'Faire éliminer la créature à distance par un tireur d\'élite Overwatch.',
        effects: { rebelActivity: -5, stability: 3, rations: -20 }
      },
      {
        id: 'reb_vort_ignore',
        label: 'Ignorer la créature',
        description: 'Se concentrer sur les cibles humaines prioritaires.',
        effects: { loyalty: 5, rebelActivity: 5, stability: -3 }
      }
    ],
    loreTags: ['Vortigaunt', 'Égouts', 'Énergie'],
    repeatable: true
  },
  {
    id: 'reb_mole_cp',
    title: 'Infiltration dans la Civil Protection',
    type: 'Rebel',
    severity: 3,
    description: 'Les services de sécurité internes soupçonnent qu\'un officier de la Civil Protection transmet des plans de déploiement à la Résistance Lambda.',
    choices: [
      {
        id: 'reb_mole_interrogate',
        label: 'Interrogatoire sous sérum',
        description: 'Soumettre l\'escouade suspecte à un interrogatoire neurologique douloureux.',
        effects: { fear: 10, infoControl: 15, stability: 5, rations: -30 }
      },
      {
        id: 'reb_mole_trap',
        label: 'Diffuser de fausses informations',
        description: 'Utiliser la taupe pour envoyer les rebelles dans une embuscade planifiée dans le Secteur des entrepôts.',
        effects: { rebelActivity: -18, combineCasualties: 2, stability: 5 }
      },
      {
        id: 'reb_mole_purge',
        label: 'Purger toute l\'escouade',
        description: 'Exécuter administrativement les 10 agents suspectés pour restaurer la discipline interne.',
        effects: { combinePresence: -5, fear: 12, loyalty: -5, combineCasualties: 10 }
      }
    ],
    loreTags: ['Espionnage', 'Metro Cops', 'Trahison'],
    repeatable: false
  },
  {
    id: 'reb_clandestine_lab',
    title: 'Laboratoire Lambda Clandestin',
    type: 'Rebel',
    severity: 4,
    description: 'Un laboratoire de fortune synthétisant des inhibiteurs contre le Suppression Field a été localisé dans l\'Ancien hôpital.',
    choices: [
      {
        id: 'reb_lab_assault',
        label: 'Assaut Overwatch Elite',
        description: 'Envoyer les troupes d\'élite détruire le site et saisir les données scientifiques.',
        effects: { rebelActivity: -15, combineCasualties: 1, industrialProduction: 5, rations: -50 }
      },
      {
        id: 'reb_lab_shell',
        label: 'Bombardement biologique préventif',
        description: 'Utiliser un mortier pour tirer un Headcrab Shell sur l\'hôpital pour nettoyer le secteur biologiquement.',
        effects: { xenContamination: 18, rebelActivity: -20, stability: -10, civilianCasualties: 30 }
      },
      {
        id: 'reb_lab_steal',
        label: 'Étudier les échantillons',
        description: 'Faire saisir les recherches par nos scientifiques pour comprendre comment renforcer notre Suppression Field.',
        effects: { infoControl: 12, stability: 5, rations: -40 }
      }
    ],
    loreTags: ['Laboratoire', 'Suppression Field', 'Hôpital'],
    repeatable: false
  },
  {
    id: 'reb_razor_sabotage',
    title: 'Sabotage du Razor Train',
    type: 'Rebel',
    severity: 4,
    description: 'Une explosion a fait dérailler un convoi de Razor Train au Nœud ferroviaire, bloquant les livraisons industrielles et détruisant le blindage.',
    choices: [
      {
        id: 'reb_razor_repair',
        label: 'Réquisitionner les civils',
        description: 'Forcer 100 civils à déblayer les voies sous la menace des armes. Les pertes seront élevées.',
        effects: { industrialProduction: 10, civilianFatigue: 20, loyalty: -15, civilianCasualties: 10 }
      },
      {
        id: 'reb_razor_overwatch',
        label: 'Déployer la sécurité lourde',
        description: 'Sécuriser le périmètre avec des Striders pendant les réparations par nos techniciens.',
        effects: { combinePresence: 10, stability: 5, rations: -80, fear: 12 }
      },
      {
        id: 'reb_razor_divert',
        label: 'Détourner le trafic ferroviaire',
        description: 'Passer par des voies secondaires dégradées, ralentissant la production.',
        effects: { industrialProduction: -15, stability: -2 }
      }
    ],
    loreTags: ['Razor Train', 'Chemin de fer', 'Sabotage'],
    repeatable: true
  },
  {
    id: 'reb_officer_assassinated',
    title: 'Assassinat d\'un Officier de la CP',
    type: 'Rebel',
    severity: 3,
    description: 'Le commandant local du Poste Civil Protection a été retrouvé égorgé dans son appartement de fonction. Une affiche Lambda était collée sur son torse.',
    choices: [
      {
        id: 'reb_assassination_reprisal',
        label: 'Raid de représailles aveugle',
        description: 'Exécuter 10 citoyens suspectés d\'activités anti-citoyennes résidant dans le même bloc.',
        effects: { fear: 25, loyalty: -18, rebelActivity: 5, civilianCasualties: 10 }
      },
      {
        id: 'reb_assassination_investigate',
        label: 'Mener une enquête secrète',
        description: 'Utiliser les scanners pour écouter les appartements voisins afin d\'identifier le coupable.',
        effects: { infoControl: 10, fear: 5, rations: -20 }
      },
      {
        id: 'reb_assassination_propaganda',
        label: 'Déclarer un décès par accident industriel',
        description: 'Masquer l\'assassinat via Breencast pour éviter de montrer une vulnérabilité de l\'Union.',
        effects: { loyalty: 2, infoControl: 5, stability: 1 }
      }
    ],
    loreTags: ['Assassinat', 'Metro Cops', 'Terreur'],
    repeatable: true
  },
  {
    id: 'reb_relay_explosion',
    title: 'Destruction du Relais Breencast',
    type: 'Rebel',
    severity: 3,
    description: 'Une charge explosive a détruit le pylône du Relais de propagande Breencast. Les écrans publics affichent de la friture statique.',
    choices: [
      {
        id: 'reb_relay_rebuild',
        label: 'Reconstruire immédiatement',
        description: 'Allouer des ressources industrielles pour réparer le pylône.',
        effects: { industrialProduction: -10, infoControl: 10, stability: 5, rations: -40 }
      },
      {
        id: 'reb_relay_military',
        label: 'Compenser par des patrouilles CP',
        description: 'Remplacer la propagande visuelle par une présence physique accrue dans la rue.',
        effects: { combinePresence: 8, fear: 10, rations: -30 }
      },
      {
        id: 'reb_relay_lax',
        label: 'Laisser le relais en panne',
        description: 'Ignorer la panne temporairement pour préserver nos ressources.',
        effects: { infoControl: -20, loyalty: 5, rebelActivity: 10 }
      }
    ],
    loreTags: ['Breencast', 'Relais', 'Média'],
    repeatable: true
  },
  {
    id: 'reb_barricades_block',
    title: 'Barricades dans le Bloc Résidentiel A',
    type: 'Rebel',
    severity: 4,
    description: 'Les résidents du Bloc Résidentiel A ont soudé les portes d\'accès et érigé des barricades métalliques, se déclarant en grève civile contre le rationnement.',
    choices: [
      {
        id: 'reb_barricade_charger',
        label: 'Assaut par Chargers Combine',
        description: 'Envoyer des soldats Chargers enfoncer les barricades au bouclier énergétique.',
        effects: { combineCasualties: 2, civilianCasualties: 15, stability: 5, fear: 12, rations: -30 }
      },
      {
        id: 'reb_barricade_starve',
        label: 'Sceller et affamer le Bloc',
        description: 'Couper l\'électricité et le ravitaillement en rations du Bloc A jusqu\'à reddition complète.',
        effects: { civilianFatigue: 20, loyalty: -20, fear: 15, rebelActivity: -10, rations: 100 }
      },
      {
        id: 'reb_barricade_negotiate',
        label: 'Promettre des rations supplémentaires',
        description: 'Négocier pacifiquement pour lever les barricades en augmentant temporairement leurs allocations.',
        effects: { rations: -150, loyalty: 10, rebelActivity: 5, stability: 4 }
      }
    ],
    loreTags: ['Barricades', 'Bloc A', 'Grève'],
    repeatable: true
  },
  {
    id: 'reb_weapons_delivery',
    title: 'Livraison Clandestine Interceptée',
    type: 'Rebel',
    severity: 2,
    description: 'Un hydroglisseur rebelle transportant des munitions depuis les Canaux a été intercepté par nos Scanners. Le pilote a fui à pied.',
    choices: [
      {
        id: 'reb_delivery_seize',
        label: 'Saisir la cargaison',
        description: 'Récupérer les caisses de munitions et détruire le véhicule.',
        effects: { rebelActivity: -8, stability: 3, industrialProduction: 5 }
      },
      {
        id: 'reb_delivery_track',
        label: 'Laisser le pilote fuir et le suivre',
        description: 'Ne pas saisir la cargaison immédiatement, mais pister le pilote pour découvrir sa planque.',
        effects: { infoControl: 10, rebelActivity: -12, fear: 3 }
      }
    ],
    loreTags: ['Contrebande', 'Canaux', 'Scanners'],
    repeatable: true
  },
  {
    id: 'reb_pirate_flyers',
    title: 'Distribution de Tracts Séditieux',
    type: 'Rebel',
    severity: 1,
    description: 'Des centaines de tracts en papier appelant à rejoindre la Résistance Lambda ont été jetés depuis un toit sur la Place administrative.',
    choices: [
      {
        id: 'reb_flyers_clean',
        label: 'Faire nettoyer par la voirie civile',
        description: 'Forcer les balayeurs à ramasser tous les tracts sous peine de sanctions.',
        effects: { stability: 1, civilianFatigue: 5, infoControl: 5 }
      },
      {
        id: 'reb_flyers_propaganda',
        label: 'Diffuser un démenti Breencast',
        description: 'Dénoncer le mensonge de ces tracts à la télévision publique.',
        effects: { loyalty: -2, infoControl: 8 }
      }
    ],
    loreTags: ['Propagande', 'Tracts', 'Place'],
    repeatable: true
  },
  {
    id: 'reb_sabotaged_checkpost',
    title: 'Poste CP Saboté à l\'Acide',
    type: 'Rebel',
    severity: 2,
    description: 'De l\'acide Xen a été jeté sur les serveurs de communication d\'un check-point Civil Protection, coupant les liaisons radio.',
    choices: [
      {
        id: 'reb_acid_replace',
        label: 'Remplacer les serveurs',
        description: 'Allouer des composants technologiques pour réparer le matériel.',
        effects: { industrialProduction: -8, rations: -20, stability: 2 }
      },
      {
        id: 'reb_acid_reprisal',
        label: 'Punir le quartier voisin',
        description: 'Lancer des arrestations arbitraires dans les résidences adjacentes.',
        effects: { fear: 12, loyalty: -8, rebelActivity: 3 }
      }
    ],
    loreTags: ['Sabotage', 'Acide', 'Metro Cops'],
    repeatable: true
  },
  {
    id: 'reb_vortigaunt_energy',
    title: 'Vol d\'Énergie par un Vortigaunt',
    type: 'Rebel',
    severity: 3,
    description: 'Un Vortigaunt a canalisé son énergie pour court-circuiter une barrière énergétique de l\'Union, permettant la fuite de 50 citoyens vers la Périphérie.',
    choices: [
      {
        id: 'reb_vort_energy_chase',
        label: 'Lancer une poursuite militaire',
        description: 'Déployer des soldats Overwatch pour intercepter le groupe dans la Périphérie.',
        effects: { combinePresence: 5, combineCasualties: 2, rebelActivity: -8, rations: -40 }
      },
      {
        id: 'reb_vort_energy_seal',
        label: 'Rétablir la barrière à pleine puissance',
        description: 'Surcharger le secteur électrique au détriment des usines.',
        effects: { industrialProduction: -12, stability: 3, citadelEnergy: -5 }
      }
    ],
    loreTags: ['Vortigaunt', 'Énergie', 'Fuite'],
    repeatable: true
  },
  {
    id: 'reb_arsenal_theft',
    title: 'Vol Majeur d\'un Dépôt d\'Armes CP',
    type: 'Rebel',
    severity: 4,
    description: 'Des rebelles déguisés en officiers de la Civil Protection ont pénétré dans le dépôt de sécurité du Poste CP et dérobé 50 fusils à impulsions et 10 caisses de munitions.',
    choices: [
      {
        id: 'reb_theft_lockdown',
        label: 'Confinement total de la zone',
        description: 'Déclarer le couvre-feu général et fouiller toutes les habitations du secteur.',
        effects: { stability: 3, fear: 15, loyalty: -12, rebelActivity: -5, rations: -50 }
      },
      {
        id: 'reb_theft_advisors',
        label: 'Alerter la Citadel',
        description: 'Admettre le vol auprès des Advisors et solliciter des renforts tactiques.',
        effects: { combinePresence: 15, stability: 5, citadelEnergy: -10, infoControl: -8 }
      },
      {
        id: 'reb_theft_coverup',
        label: 'Camoufler le vol',
        description: 'Falsifier l\'inventaire du dépôt pour éviter les blâmes de la Citadel.',
        effects: { infoControl: -15, stability: -5, rebelActivity: 12 }
      }
    ],
    loreTags: ['Vol', 'Armes', 'Infiltration'],
    repeatable: false
  },
  {
    id: 'reb_underground_news',
    title: 'Journal Clandestin Lambda',
    type: 'Rebel',
    severity: 1,
    description: 'Une gazette intitulée "La Voix de la Cité" circule sous le manteau dans les résidences, relatant les victoires de la Résistance à City 17.',
    choices: [
      {
        id: 'reb_news_seize',
        label: 'Confisquer et brûler',
        description: 'Lancer des patrouilles CP pour fouiller les citoyens et brûler les journaux trouvés.',
        effects: { infoControl: 12, loyalty: -5, fear: 4 }
      },
      {
        id: 'reb_news_ignore',
        label: 'Ignorer la publication',
        description: 'Considérer ce journal comme une nuisance mineure.',
        effects: { loyalty: 4, rebelActivity: 5, infoControl: -8 }
      }
    ],
    loreTags: ['Journal', 'Médias', 'Sédition'],
    repeatable: true
  },
  {
    id: 'reb_rebel_embassy',
    title: 'Négociation Secrète Proposée',
    type: 'Rebel',
    severity: 3,
    description: 'Un émissaire de la cellule Lambda-3 offre de cesser les attaques sur le Nœud ferroviaire si vous desserrez l\'étau de la Civil Protection sur le Quartier des travailleurs.',
    choices: [
      {
        id: 'reb_embassy_accept',
        label: 'Accepter secrètement l\'accord',
        description: 'Réduire les patrouilles dans le Quartier des travailleurs.',
        effects: { loyalty: 10, rebelActivity: -10, combinePresence: -5, infoControl: -10 }
      },
      {
        id: 'reb_embassy_betray',
        label: 'Piéger l\'émissaire',
        description: 'Faire semblant d\'accepter l\'accord et arrêter l\'émissaire lors de la rencontre.',
        effects: { rebelActivity: -5, infoControl: 8, fear: 6, rations: -20 }
      },
      {
        id: 'reb_embassy_refuse',
        label: 'Rejeter et frapper fort',
        description: 'Déployer les Overwatch Chargers dans le Quartier des travailleurs en réponse.',
        effects: { combinePresence: 10, fear: 12, loyalty: -10 }
      }
    ],
    loreTags: ['Négociation', 'Cellule Lambda-3', 'Double Jeu'],
    repeatable: false
  },
  {
    id: 'reb_razor_bomb',
    title: 'Bombe Clandestine sur la Voie Ferrée',
    type: 'Rebel',
    severity: 3,
    description: 'Une mine Lambda a été collée sur le rail énergétique du Razor Train, menaçant de faire exploser le prochain convoi.',
    choices: [
      {
        id: 'reb_bomb_defuse',
        label: 'Envoyer des Scanners de déminage',
        description: 'Utiliser la technologie de pointe pour désamorcer l\'explosif.',
        effects: { rations: -30, stability: 2, industrialProduction: -2 }
      },
      {
        id: 'reb_bomb_citizen',
        label: 'Forcer un prisonnier à déminer',
        description: 'Utiliser un citoyen capturé pour retirer la mine manuellement.',
        effects: { fear: 15, loyalty: -10, civilianCasualties: 1 }
      }
    ],
    loreTags: ['Bombe', 'Razor Train', 'Déminage'],
    repeatable: true
  },
  {
    id: 'reb_riot_workers',
    title: 'Émeute au Foyer des Travailleurs',
    type: 'Rebel',
    severity: 4,
    description: 'Une foule en colère d\'ouvriers industriels a envahi les locaux de l\'administration du Quartier des travailleurs, exigeant des rations complètes.',
    choices: [
      {
        id: 'reb_riot_suppression',
        label: 'Déployer les Overwatch Suppressors',
        description: 'Ouvrir le feu à impulsion lourde pour disperser la foule.',
        effects: { civilianCasualties: 35, fear: 20, loyalty: -25, rebelActivity: 12, industrialProduction: -10 }
      },
      {
        id: 'reb_riot_concede',
        label: 'Distribuer des réserves de rations',
        description: 'Calmer l\'émeute en cédant aux revendications alimentaires.',
        effects: { rations: -250, loyalty: 12, stability: 5, civilianFatigue: -5 }
      },
      {
        id: 'reb_riot_gas',
        label: 'Diffuser du gaz incapacitant',
        description: 'Neutraliser la foule par des agents chimiques pour les réintégrer de force aux usines.',
        effects: { civilianFatigue: 15, stability: 3, rations: -60, fear: 10 }
      }
    ],
    loreTags: ['Émeute', 'Travailleurs', 'Rations'],
    repeatable: true
  },
  {
    id: 'reb_lambda_antenna',
    title: 'Antenne de Transmission Captée',
    type: 'Rebel',
    severity: 2,
    description: 'Une antenne parabolique improvisée a été installée sur les toits du Bloc Résidentiel B, transmettant des données de patrouilles à la Résistance.',
    choices: [
      {
        id: 'reb_antenna_destroy',
        label: 'Détruire par un tir APC',
        description: 'Faire exploser l\'antenne à distance depuis la rue.',
        effects: { stability: 2, infoControl: 8, sectorInfrastructure: -5 }
      },
      {
        id: 'reb_antenna_reverse',
        label: 'Piratage et contre-espionnage',
        description: 'Laisser l\'antenne et injecter de fausses coordonnées de patrouilles.',
        effects: { infoControl: 15, rebelActivity: -10 }
      }
    ],
    loreTags: ['Antenne', 'Bloc B', 'Espionnage'],
    repeatable: true
  },
  {
    id: 'reb_medical_theft',
    title: 'Vol de Fournitures Médicales',
    type: 'Rebel',
    severity: 2,
    description: 'Le stock de trousses de secours et d\'anti-toxines du Poste CP a été pillé. Ces produits sont cruciaux contre les morsures Xen.',
    choices: [
      {
        id: 'reb_med_ration',
        label: 'Rationner le personnel Combine',
        description: 'Réduire les soins du personnel en cas d\'incursion Xen.',
        effects: { combinePresence: -3, rations: 50, stability: -2 }
      },
      {
        id: 'reb_med_raid',
        label: 'Fouiller le quartier médical civil',
        description: 'Saisir les stocks civils restants pour reconstituer les réserves militaires.',
        effects: { fear: 12, loyalty: -10, rations: 30 }
      }
    ],
    loreTags: ['Médecine', 'Poste CP', 'Vol'],
    repeatable: true
  },
  {
    id: 'reb_barricade_plaza',
    title: 'Barricade sur la Place Administrative',
    type: 'Rebel',
    severity: 4,
    description: 'Une barricade de fortune a été érigée sur la place principale pendant la nuit, bloquant l\'accès au bâtiment administratif.',
    choices: [
      {
        id: 'reb_plaza_strider',
        label: 'Déployer un Strider',
        description: 'Utiliser le tripode géant pour pulvériser l\'obstacle à coups de canon lourd.',
        effects: { fear: 25, stability: 5, rebelActivity: -15, sectorInfrastructure: -15, rations: -80 }
      },
      {
        id: 'reb_plaza_cp',
        label: 'Faire nettoyer à la main par la CP',
        description: 'Envoyer des Metro Cops démonter la structure sous la protection de boucliers.',
        effects: { combineCasualties: 2, stability: 3, rations: -30 }
      }
    ],
    loreTags: ['Place', 'Barricade', 'Strider'],
    repeatable: false
  },
  {
    id: 'reb_lambda_manifesto',
    title: 'Manifeste Lambda Clandestin',
    type: 'Rebel',
    severity: 1,
    description: 'Un manifeste politique appelant à l\'abolition du Suppression Field est lu à voix haute dans les cantines de l\'usine.',
    choices: [
      {
        id: 'reb_manifesto_arrest',
        label: 'Arrêter le lecteur public',
        description: 'Identifier l\'agitateur et l\'envoyer en cellule.',
        effects: { fear: 8, loyalty: -4, infoControl: 5 }
      },
      {
        id: 'reb_manifesto_breecast',
        label: 'Réfuter rationnellement par Wallace Breen',
        description: 'Diffuser une allocution sur l\'inanité de la reproduction humaine incontrôlée.',
        effects: { loyalty: -2, infoControl: 10, stability: 2 }
      }
    ],
    loreTags: ['Manifeste', 'Usine', 'Sédition'],
    repeatable: true
  },
  {
    id: 'reb_general_strike',
    title: 'Grève Générale Industrielle',
    type: 'Rebel',
    severity: 5,
    description: 'Les ouvriers du Complexe industriel et du Nœud ferroviaire ont croisé les bras simultanément, paralysant toute l\'activité économique de la ville.',
    choices: [
      {
        id: 'reb_strike_force',
        label: 'Pacification transhumaine lourde',
        description: 'Déployer les troupes d\'assaut Overwatch et forcer les ouvriers à travailler sous la menace des fusils.',
        effects: { industrialProduction: 15, civilianCasualties: 45, fear: 30, loyalty: -35, rebelActivity: 10 }
      },
      {
        id: 'reb_strike_bribe',
        label: 'Promettre une double ration',
        description: 'Céder temporairement pour relancer les machines en augmentant substantiellement les rations.',
        effects: { rations: -400, loyalty: 15, stability: 5, civilianFatigue: -10 }
      },
      {
        id: 'reb_strike_advisor',
        label: 'Faire intervenir un Advisor',
        description: 'Laisser l\'Advisor briser psychiquement le moral des grévistes.',
        effects: { stability: 6, industrialProduction: 5, civilianFatigue: 20, citadelEnergy: -15 }
      }
    ],
    loreTags: ['Grève Générale', 'Usines', 'Insurrection'],
    repeatable: false
  }
];
