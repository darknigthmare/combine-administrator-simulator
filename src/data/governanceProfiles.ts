import { GovernanceProfile } from '../types/lore';

export const governanceProfiles: GovernanceProfile[] = [
  {
    id: 'loyalist',
    name: 'Loyaliste Combine',
    description: "Vous croyez fermement en la bienveillance et en la suprématie de l'Union Universelle. Vos rapports avec la Citadel sont prioritaires.",
    bonuses: [
      "Plus de soutien d'Overwatch (+15% présence initiale)",
      "Directives de la Citadel plus indulgentes",
      "Énergie de la Citadel accrue (+10)"
    ],
    penalties: [
      "Loyauté civile initiale extrêmement basse (-15)",
      "Vitesse de radicalisation rebelle accrue"
    ],
    statModifiers: {
      combinePresence: 15,
      citadelEnergy: 10,
      loyalty: -15,
      fear: 5
    }
  },
  {
    id: 'technocrat',
    name: 'Technocrate administratif',
    description: "La gestion froide et l'optimisation des flux de ressources sont les clés du contrôle. Les chiffres ne mentent pas.",
    bonuses: [
      "Production industrielle accrue (+15%)",
      "Meilleure gestion et conservation des rations (+200 rations de départ)",
      "Rapports plus précis"
    ],
    penalties: [
      "Moins de réactivité et flexibilité militaire",
      "Temps de réponse plus lent en cas d'insurrection"
    ],
    statModifiers: {
      industrialProduction: 15,
      rations: 200,
      stability: 5
    }
  },
  {
    id: 'tyrant',
    name: 'Tyran local',
    description: "La peur est le seul langage que les citoyens comprennent. Toute dissidence doit être étouffée dans le sang.",
    bonuses: [
      "Peur civile initiale extrêmement élevée (+25)",
      "Rébellion temporairement contenue à court terme"
    ],
    penalties: [
      "Risque d'explosion sociale élevé",
      "Pertes civiles cumulées accrues lors des actions",
      "Chute rapide de la loyauté civile"
    ],
    statModifiers: {
      fear: 25,
      loyalty: -20,
      rebelActivity: -10,
      stability: -5
    }
  },
  {
    id: 'collaborator',
    name: 'Collaborateur opportuniste',
    description: "Vous utilisez votre position pour obtenir des privilèges personnels et plaire aux forces d'occupation, sans réelle idéologie.",
    bonuses: [
      "Bonus politiques auprès de Wallace Breen",
      "Accès facilité aux privilèges technologiques et logistiques"
    ],
    penalties: [
      "Instabilité morale interne",
      "Taux de corruption accru dans la Civil Protection",
      "Confiance fragile de l'Overwatch"
    ],
    statModifiers: {
      infoControl: 15,
      stability: -5,
      rations: 100
    }
  },
  {
    id: 'sympathizer',
    name: 'Sympathisant secret de la Résistance',
    description: "Vous jouez un double jeu dangereux. Vous utilisez votre statut pour saper l'Union et aider la rébellion sous le manteau.",
    bonuses: [
      "Options de dialogues et choix clandestins pour épargner des civils",
      "Aide secrète reçue de la Résistance (détection Lambda)",
      "Déverrouille les fins de libération"
    ],
    penalties: [
      "Risque constant de détection par les Advisors ou l'Overwatch",
      "Diminution de la confiance de la Citadel (-10)"
    ],
    statModifiers: {
      loyalty: 20,
      combinePresence: -10,
      citadelEnergy: -10,
      rebelActivity: 5
    }
  },
  {
    id: 'quarantine_manager',
    name: 'Gestionnaire de quarantaine',
    description: "Votre priorité absolue est d'isoler la biosphère terrestre des incursions parasitaires Xen.",
    bonuses: [
      "Meilleur contrôle de l'infestation Xen (-15% contamination initiale)",
      "Meilleure efficacité des protocoles d'isolement et de purge"
    ],
    penalties: [
      "Forte consommation de ressources industrielles",
      "Méfiance et fatigue civile élevées dues aux confinements"
    ],
    statModifiers: {
      xenContamination: -15,
      civilianFatigue: 10,
      fear: 10
    }
  }
];
