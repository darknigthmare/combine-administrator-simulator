import { CitadelDirective } from '../types/events';

export const directives: CitadelDirective[] = [
  {
    id: 'dir_rebel_under_20',
    title: 'Directive de Pacification Alpha',
    description: 'La Citadel exige une réduction de l\'activité rebelle sous la barre des 20% dans l\'ensemble de la ville pour sécuriser les zones d\'approvisionnement.',
    duration: 5,
    targetStat: 'rebelActivityUnder',
    targetValue: 20,
    rewardEffects: {
      stability: 10,
      rations: 300,
      combinePresence: 5,
      message: 'La Citadel vous accorde des renforts de Metro Cops (+300 rations et +5 présence).'
    },
    penaltyEffects: {
      stability: -10,
      citadelEnergy: -15,
      message: 'Alerte : Blâme de l\'Overwatch pour incompétence tactique. Des ressources de la Citadel sont réduites.'
    }
  },
  {
    id: 'dir_prod_above_75',
    title: 'Quota Industriel Requis',
    description: 'L\'Union Universelle a besoin de ressources de construction pour ériger les nouvelles infrastructures. Maintenez la production industrielle au-dessus de 75%.',
    duration: 6,
    targetStat: 'productionAbove',
    targetValue: 75,
    rewardEffects: {
      industrialProduction: 10,
      rations: 200,
      stability: 5,
      message: 'Quota industriel atteint. La logistique locale est renforcée.'
    },
    penaltyEffects: {
      rations: -300,
      stability: -15,
      message: 'Sanction : Vos réserves de rations sont ponctionnées par l\'administration supérieure Combine.'
    }
  },
  {
    id: 'dir_transfer_citizens',
    title: 'Transferts de Main-d\'Œuvre à Nova Prospekt',
    description: 'La Citadel ordonne le transfert forcé de citoyens vers Nova Prospekt pour reconditionnement transhumain. Atteignez un niveau de peur de 60% pour faciliter les rafles.',
    duration: 4,
    targetStat: 'fear',
    targetValue: 60,
    rewardEffects: {
      combinePresence: 10,
      stability: 8,
      rations: 100,
      message: 'Transfert effectué. L\'Overwatch est renforcé par des soldats nouvellement reconditionnés.'
    },
    penaltyEffects: {
      stability: -15,
      combinePresence: -5,
      message: 'Colère des Advisors : Votre refus ou incapacité à livrer les quotas de citoyens vous discrédite.'
    }
  },
  {
    id: 'dir_identify_cell',
    title: 'Démantèlement Informationnel',
    description: 'Des cellules rebelles perturbent le réseau de données. Augmentez le contrôle informationnel au-dessus de 70% pour localiser leurs bases.',
    duration: 5,
    targetStat: 'infoControl',
    targetValue: 70,
    rewardEffects: {
      infoControl: 10,
      rebelActivity: -15,
      message: 'Plusieurs caches Lambda ont été scellées à distance grâce à vos relevés.'
    },
    penaltyEffects: {
      rebelActivity: 15,
      stability: -8,
      message: 'Les réseaux rebelles se propagent, diffusant des messages subversifs non contrôlés.'
    }
  },
  {
    id: 'dir_quarantine_xen',
    title: 'Confinement Xen Requis',
    description: 'La contamination biologique menace les sous-sols urbains. Ramenez le taux global de contamination Xen en dessous de 25%.',
    duration: 6,
    targetStat: 'xenContaminationUnder',
    targetValue: 25,
    rewardEffects: {
      stability: 12,
      rations: 150,
      message: 'Zones purifiées. La Citadel valide vos protocoles de décontamination.'
    },
    penaltyEffects: {
      xenContamination: 15,
      civilianCasualties: 200,
      message: 'Catastrophe sanitaire : L\'infestation Xen se répand dans de nouveaux blocs résidentiels.'
    }
  },
  {
    id: 'dir_energy_above_60',
    title: 'Stabilité Énergétique du Noyau',
    description: 'Le réacteur de la Citadel locale subit des fluctuations dues aux sabotages. Maintenez l\'énergie de la Citadel au-dessus de 60%.',
    duration: 5,
    targetStat: 'citadelEnergy',
    targetValue: 60,
    rewardEffects: {
      citadelEnergy: 15,
      stability: 5,
      message: 'Noyau stabilisé. Les systèmes défensifs lourds sont opérationnels.'
    },
    penaltyEffects: {
      stability: -20,
      combinePresence: -15,
      message: 'Chute d\'énergie majeure. Plusieurs barrières énergétiques sectorielles tombent en panne.'
    }
  },
  {
    id: 'dir_fear_above_50',
    title: 'Soumission Civique par la Terreur',
    description: 'La population commence à murmurer. Augmentez le niveau de peur civile à 50% ou plus pour étouffer toute velléité d\'émeute.',
    duration: 4,
    targetStat: 'fear',
    targetValue: 50,
    rewardEffects: {
      stability: 10,
      rebelActivity: -10,
      message: 'Le silence règne à nouveau dans les blocs résidentiels. La peur étouffe la sédition.'
    },
    penaltyEffects: {
      rebelActivity: 20,
      loyalty: 10,
      message: 'La population perçoit votre hésitation comme une faiblesse. La résistance Lambda recrute activement.'
    }
  },
  {
    id: 'dir_loyalty_above_40',
    title: 'Campagne de Rectification d\'Opinion',
    description: 'Wallace Breen exige que la loyauté civile déclarée remonte au-dessus de 40% par une propagande Breencast intensive.',
    duration: 5,
    targetStat: 'loyalty',
    targetValue: 40,
    rewardEffects: {
      infoControl: 15,
      rations: 100,
      message: 'Propagande réussie. L\'administration centrale félicite votre gestion de l\'esprit public.'
    },
    penaltyEffects: {
      infoControl: -15,
      stability: -10,
      message: 'Échec de la propagande. Des graffitis Lambda recouvrent les écrans géants de la place.'
    }
  },
  {
    id: 'dir_stability_above_70',
    title: 'Pacification Urbaine Modèle',
    description: 'Des inspecteurs de l\'Union Universelle visitent la ville. Maintenez la stabilité urbaine générale au-dessus de 70%.',
    duration: 6,
    targetStat: 'stability',
    targetValue: 70,
    rewardEffects: {
      combinePresence: 10,
      rations: 400,
      citadelEnergy: 10,
      message: 'Inspection parfaite. Vous êtes cité en exemple par le Consortium des Advisors.'
    },
    penaltyEffects: {
      stability: -20,
      combineCasualties: 5,
      message: 'Rapport d\'incompétence transmis. L\'Overwatch déploie des protocoles d\'autonomie répressive.'
    }
  },
  {
    id: 'dir_prevent_rebellions',
    title: 'Surveillance des Canaux',
    description: 'La Résistance utilise les Canaux pour exfiltrer des citoyens. Réduisez l\'activité rebelle globale sous 30% pour verrouiller les points de fuite.',
    duration: 5,
    targetStat: 'rebelActivityUnder',
    targetValue: 30,
    rewardEffects: {
      rations: 150,
      stability: 8,
      message: 'Les égouts et canaux ont été en grande partie nettoyés.'
    },
    penaltyEffects: {
      rebelActivity: 15,
      combinePresence: -5,
      message: 'Un flot continu d\'anti-citoyens s\'échappe vers des bases extérieures.'
    }
  },
  {
    id: 'dir_combat_fatigue',
    title: 'Contrôle de la Fatigue Sociale',
    description: 'L\'épuisement des citoyens nuit à la cadence d\'usine. Maintenez la fatigue civile sous la barre des 45%.',
    duration: 5,
    targetStat: 'civilianFatigue',
    targetValue: 45,
    rewardEffects: {
      industrialProduction: 12,
      stability: 5,
      message: 'Les ouvriers sont reposés et disciplinés. Les cadences industrielles augmentent.'
    },
    penaltyEffects: {
      industrialProduction: -18,
      rations: -100,
      message: 'Épuisement général. Des grèves larvées paralysent les lignes d\'assemblage du Razor Train.'
    }
  },
  {
    id: 'dir_advisor_security',
    title: 'Sécurisation de Transit d\'un Conseiller',
    description: 'Un pod d\'Advisor Combine est stationné temporairement dans la cité. Pour sa protection psychique, maintenez la présence Combine au-dessus de 65%.',
    duration: 4,
    targetStat: 'combinePresence',
    targetValue: 65,
    rewardEffects: {
      citadelEnergy: 20,
      stability: 10,
      message: 'L\'Advisor repart satisfait. Il vous octroie une décharge d\'énergie du réacteur.'
    },
    penaltyEffects: {
      stability: -15,
      citadelEnergy: -10,
      message: 'L\'Advisor a subi des interférences psychiques dues à la sédition. Sa colère résonne dans votre esprit.'
    }
  },
  {
    id: 'dir_xen_egress',
    title: 'Élimination des Spores Résiduelles',
    description: 'Les spores de Xen menacent d\'obstruer le système de ventilation technique. Ramenez la contamination Xen sous 35%.',
    duration: 5,
    targetStat: 'xenContaminationUnder',
    targetValue: 35,
    rewardEffects: {
      industrialProduction: 8,
      stability: 6,
      message: 'Ventilation dégagée. Les fonderies de la cité fonctionnent à plein régime.'
    },
    penaltyEffects: {
      industrialProduction: -10,
      stability: -10,
      message: 'L\'air de la zone industrielle devient toxique, forçant l\'évacuation temporaire de plusieurs secteurs.'
    }
  },
  {
    id: 'dir_info_blockade',
    title: 'Blocus Informationnel Total',
    description: 'Les rumeurs de soulèvements dans d\'autres cités menacent la paix. Augmentez le contrôle de l\'information à 75% ou plus.',
    duration: 5,
    targetStat: 'infoControl',
    targetValue: 75,
    rewardEffects: {
      loyalty: 8,
      stability: 8,
      message: 'Black-out informationnel réussi. Les citoyens ne croient plus qu\'aux Breencasts officiels.'
    },
    penaltyEffects: {
      rebelActivity: 12,
      fear: -10,
      message: 'Les ondes radio rebelles diffusent des appels à l\'insurrection de City 17.'
    }
  },
  {
    id: 'dir_production_spurt',
    title: 'Sprint de Production de Munitions',
    description: 'Les conflits extérieurs exigent des obus à headcrabs et des cartouches d\'énergie. Propulsez la production industrielle au-dessus de 80%.',
    duration: 4,
    targetStat: 'productionAbove',
    targetValue: 80,
    rewardEffects: {
      rations: 300,
      stability: 5,
      message: 'Munitions livrées. La Citadel vous remercie en libérant des surplus de rations.'
    },
    penaltyEffects: {
      civilianFatigue: 20,
      stability: -12,
      message: 'Surmenage extrême. Plusieurs accidents mortels dans les usines déclenchent des vagues de mécontentement.'
    }
  }
];
