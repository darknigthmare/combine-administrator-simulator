import { GameEvent } from '../types/events';

export const advisorEvents: GameEvent[] = [
  {
    id: 'adv_brain_harvest',
    title: 'Moisson Cérébrale Exigée',
    type: 'Advisor',
    severity: 4,
    description: 'Un Advisor Combine exige la livraison de trois intellectuels ou scientifiques civils locaux pour extraire psychiquement leurs souvenirs sur les réseaux de téléportation terrestres.',
    choices: [
      {
        id: 'adv_harvest_grant',
        label: 'Livrer les cibles civiques',
        description: 'Arrêter et amener les cibles désignées à la Citadel.',
        effects: { civilianCasualties: 3, fear: 12, loyalty: -10, stability: 3, rations: -20 }
      },
      {
        id: 'adv_harvest_refuse',
        label: 'Falsifier les profils civils',
        description: 'Déclarer que les personnes ciblées ont été transférées ou sont décédées d\'infection Xen.',
        effects: { infoControl: -10, loyalty: 8, stability: -2 }
      }
    ],
    loreTags: ['Advisor', 'Moisson', 'Citadel'],
    repeatable: false
  },
  {
    id: 'adv_mental_interference',
    title: 'Interférences Psychiques',
    type: 'Advisor',
    severity: 3,
    description: 'Un Advisor Combine en transit subit des migraines psychiques dues à une antenne radio rebelle. Sa frustration provoque des évanouissements chez les Metro Cops.',
    choices: [
      {
        id: 'adv_inter_overload',
        label: 'Surcharger le brouillage',
        description: 'Activer le brouillage d\'urgence au détriment des usines.',
        effects: { industrialProduction: -12, infoControl: 15, stability: 2 }
      },
      {
        id: 'adv_inter_scan',
        label: 'Raid aveugle sur le secteur suspect',
        description: 'Lancer un raid d\'escouades Overwatch Soldats sur la zone d\'émission.',
        effects: { rebelActivity: -10, fear: 8, loyalty: -8, rations: -30 }
      }
    ],
    loreTags: ['Advisor', 'Psychique', 'Radio'],
    repeatable: true
  },
  {
    id: 'adv_special_quota',
    title: 'Quota de Nutriments Organiques',
    type: 'Advisor',
    severity: 3,
    description: 'Les Advisors exigent une réaffectation immédiate de 300 rations pour maintenir en vie leurs incubateurs organiques de la Citadel.',
    choices: [
      {
        id: 'adv_quota_grant',
        label: 'Transmettre les rations',
        description: 'Prélever sur le stock civil.',
        effects: { rations: -300, loyalty: -10, stability: 1 }
      },
      {
        id: 'adv_quota_refuse',
        label: 'Proposer de la biomasse Xen',
        description: 'Nettoyer des égouts et envoyer la faune Xen capturée en remplacement.',
        effects: { xenContamination: -10, rations: -50, stability: 3 }
      }
    ],
    loreTags: ['Advisor', 'Rations', 'Citadel'],
    repeatable: true
  },
  {
    id: 'adv_private_audience',
    title: 'Audience Administrative Privée',
    type: 'Advisor',
    severity: 4,
    description: 'Vous êtes convoqué à une audience psychique directe avec un Advisor Combine. Son esprit pénètre le vôtre, analysant vos doutes et votre loyauté envers l\'Union.',
    choices: [
      {
        id: 'adv_aud_submit',
        label: 'Soumettre totalement votre esprit',
        description: 'Masquer toute pensée rebelle par une obéissance absolue. (Nécessite d\'être loyaliste ou de réussir).',
        effects: { stability: 5, fear: 8, infoControl: 10 }
      },
      {
        id: 'adv_aud_resist',
        label: 'Dissimuler vos actions secrètes',
        description: 'Tenter de bloquer psychiquement vos souvenirs de sympathie rebelle.',
        effects: { loyalty: 5, stability: -5, infoControl: -12 }
      }
    ],
    loreTags: ['Advisor', 'Audience', 'Mental'],
    repeatable: false
  },
  {
    id: 'adv_security_audit',
    title: 'Audit de Sécurité Advisor',
    type: 'Advisor',
    severity: 4,
    description: 'Un Advisor Combine débarque pour inspecter personnellement la place administrative. Il exige une démonstration de force immédiate.',
    choices: [
      {
        id: 'adv_audit_parade',
        label: 'Organiser une démonstration de force CP',
        description: 'Faire parader les Metro Cops et effectuer des fouilles publiques humiliantes.',
        effects: { combinePresence: 5, fear: 12, loyalty: -8, rations: -30 }
      },
      {
        id: 'adv_audit_raid',
        label: 'Lancer un raid d\'assaut en direct',
        description: 'Envoyer l\'Overwatch purger une cellule suspecte sous les yeux de l\'Advisor.',
        effects: { rebelActivity: -15, combineCasualties: 2, fear: 15, rations: -50 }
      }
    ],
    loreTags: ['Advisor', 'Audit', 'Sécurité'],
    repeatable: false
  },
  {
    id: 'adv_vortigaunt_dissection',
    title: 'Dissection de Vortigaunts demandée',
    type: 'Advisor',
    severity: 3,
    description: 'Les Advisors exigent la capture et la dissection de trois Vortigaunts pour étudier la nature de leur lien d\'énergie avec les portails.',
    choices: [
      {
        id: 'adv_vort_dissect_grant',
        label: 'Fournir les Vortigaunts',
        description: 'Capturer les Vortigaunts asservis et les livrer à la table de dissection.',
        effects: { loyalty: -12, rebelActivity: 10, stability: 3, rations: -40 }
      },
      {
        id: 'adv_vort_dissect_refuse',
        label: 'Prétendre une fuite du convoi',
        description: 'Laisser discrètement s\'échapper les spécimens.',
        effects: { loyalty: 8, combinePresence: -5, infoControl: -10 }
      }
    ],
    loreTags: ['Advisor', 'Vortigaunt', 'Science'],
    repeatable: false
  },
  {
    id: 'adv_scanners_boost',
    title: 'Surveillance Cérébrale Scanner',
    type: 'Advisor',
    severity: 2,
    description: 'Un Advisor insuffle des impulsions psychiques dans le réseau de données, augmentant l\'efficacité de détection de nos Scanners.',
    choices: [
      {
        id: 'adv_scan_boost_accept',
        label: 'Exploiter l\'impulsion',
        description: 'Activer le protocole de détection maximale.',
        effects: { infoControl: 15, rebelActivity: -8, stability: 2 }
      },
      {
        id: 'adv_scan_boost_reject',
        label: 'Limiter la surcharge',
        description: 'Refuser les modifications psychiques pour éviter de griller les circuits.',
        effects: { rations: 10 }
      }
    ],
    loreTags: ['Advisor', 'Scanners', 'Réseau'],
    repeatable: true
  },
  {
    id: 'adv_quarantine_purge_order',
    title: 'Ordre de Purge Thermique Totale',
    type: 'Advisor',
    severity: 5,
    description: 'Jugeant la contamination Xen de la Zone de quarantaine trop menaçante pour la Citadel, un Advisor ordonne de purger le secteur par une frappe orbitale de plasma.',
    choices: [
      {
        id: 'adv_purge_orbit',
        label: 'Autoriser la frappe orbitale',
        description: 'Calciner totalement le secteur. Les infrastructures seront détruites.',
        effects: { xenContamination: -35, stability: 3, sectorInfrastructure: -45, citadelEnergy: -25 }
      },
      {
        id: 'adv_purge_manual',
        label: 'Tenter de nettoyer manuellement',
        description: 'Envoyer d\'importantes escouades de soldats Grunts et Chargers.',
        effects: { combineCasualties: 8, rations: -80, xenContamination: -20, stability: 5 }
      }
    ],
    loreTags: ['Advisor', 'Purge', 'Citadel'],
    repeatable: false
  },
  {
    id: 'adv_suppression_increase',
    title: 'Augmentation du Suppression Field',
    type: 'Advisor',
    severity: 4,
    description: 'L\'Advisor exige une surtension temporaire du Suppression Field pour réduire la vitalité et l\'agressivité biologique des citoyens, diminuant la sédition.',
    choices: [
      {
        id: 'adv_field_surcharge',
        label: 'Surcharger le champ de suppression',
        description: 'Détourner une immense quantité d\'énergie de la Citadel.',
        effects: { citadelEnergy: -20, stability: 5, rebelActivity: -15, civilianFatigue: 15 }
      },
      {
        id: 'adv_field_normal',
        label: 'Maintenir le champ au niveau normal',
        description: 'Préserver l\'énergie pour les forces militaires.',
        effects: { stability: -2 }
      }
    ],
    loreTags: ['Advisor', 'Suppression Field', 'Énergie'],
    repeatable: false
  },
  {
    id: 'adv_hostage_execution',
    title: 'Exécution d\'un Représentant de Wallace Breen',
    type: 'Advisor',
    severity: 4,
    description: 'Un Advisor, irrité par l\'incompétence de l\'ambassadeur politique envoyé par Wallace Breen, s\'apprête à le transpercer de sa trompe devant vous.',
    choices: [
      {
        id: 'adv_hostage_let',
        label: 'Laisser faire l\'Advisor',
        description: 'Ne pas interférer avec la volonté de l\'Union.',
        effects: { stability: -5, infoControl: -8, fear: 12 }
      },
      {
        id: 'adv_hostage_save',
        label: 'Intervenir pour sauver l\'officier',
        description: 'Dévier l\'attention de l\'Advisor en lui offrant des secrets de la Résistance (perte d\'infos tactiques).',
        effects: { stability: 3, rebelActivity: 10, infoControl: 5 }
      }
    ],
    loreTags: ['Advisor', 'Wallace Breen', 'Terreur'],
    repeatable: false
  }
];
