/**
 * Step 4 — Expanded lore event catalogue.
 * 100 structured Half-Life / Combine occupation events.
 * Categories: 30 Rebellion, 30 Xen, 20 Civil, 10 Citadel/Combine/Propaganda, 10 Moral crises.
 * These events are consumed directly by App.tsx through the existing `crises` export.
 */
import type { Crisis } from '../types/game';

export const crises: Crisis[] = [
  {
    "id": "radio_lambda_rooftop",
    "type": "REBELLION",
    "title": "Radio pirate Lambda sur les toits",
    "sectorId": "res_b",
    "severity": 2,
    "body": "Un émetteur bricolé relaie des instructions vers les canaux et rappelle aux citoyens que les murs entendent moins que les conduits d’aération.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "Lambda",
      "radio",
      "citizens"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "canal_cache_found",
    "type": "REBELLION",
    "title": "Cache d’armes dans le canal nord",
    "sectorId": "canals",
    "severity": 3,
    "body": "Une patrouille découvre des caisses de 9mm, batteries de scanners démontées et cartes annotées vers une safehouse.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "canals",
      "weapons",
      "safehouse"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "cp_ambush_stairs",
    "type": "REBELLION",
    "title": "Embuscade dans une cage d’escalier",
    "sectorId": "res_a",
    "severity": 4,
    "body": "Deux agents Civil Protection ne répondent plus. Les caméras montrent une porte d’appartement ouverte et un symbole Lambda tracé au sol.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "Civil Protection",
      "urban raid"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "scanner_down_market",
    "type": "REBELLION",
    "title": "Scanner abattu au marché des rations",
    "sectorId": "admin",
    "severity": 2,
    "body": "Un scanner chute devant une file de citoyens. La foule hésite entre panique, silence et applaudissement.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "scanner",
      "rationing"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "razor_train_prisoner_pull",
    "type": "REBELLION",
    "title": "Extraction sur transfert Razor Train",
    "sectorId": "rail",
    "severity": 3,
    "body": "Un groupe rebelle tente d’arracher trois détenus à un transfert ferroviaire classé Nova Prospekt.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "Razor Train",
      "Nova Prospekt"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "sewer_signals",
    "type": "REBELLION",
    "title": "Signaux lumineux dans les égouts",
    "sectorId": "sewers",
    "severity": 4,
    "body": "Des impulsions codées sont visibles dans les collecteurs. Le réseau Lambda utilise probablement les reflets d’eau pour communiquer.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "sewers",
      "signals"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "vortigaunt_safehouse",
    "type": "REBELLION",
    "title": "Vortigaunt aperçu dans une safehouse",
    "sectorId": "hospital",
    "severity": 2,
    "body": "Un informateur jure avoir vu un Vortigaunt soigner des blessés dans l’ancien hôpital.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "Vortigaunt",
      "safehouse",
      "medical"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "ration_hijack",
    "type": "REBELLION",
    "title": "Détournement de rations calibrées",
    "sectorId": "industrial",
    "severity": 3,
    "body": "Un convoi de suppléments nutritifs n’est jamais arrivé aux blocs productifs. Les citoyens parlent d’une distribution clandestine.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "rations",
      "supply"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "breencast_relay_bomb",
    "type": "REBELLION",
    "title": "Relais Breencast saboté",
    "sectorId": "broadcast",
    "severity": 4,
    "body": "L’image de l’administration se coupe pendant dix-sept secondes. Suffisant pour que toute la ville comprenne que la Citadelle peut saigner.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "Breencast",
      "sabotage"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "canal_medic_route",
    "type": "REBELLION",
    "title": "Route médicale clandestine",
    "sectorId": "canals",
    "severity": 2,
    "body": "Des civils blessés disparaissent avant interrogatoire. Les traces mènent vers les canaux et un poste médical improvisé.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "canals",
      "medical"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "anti_citizen_list_leak",
    "type": "REBELLION",
    "title": "Liste anti-citoyens divulguée",
    "sectorId": "admin",
    "severity": 3,
    "body": "Une liste de suspects circule avant même sa validation. Plusieurs collaborateurs craignent maintenant des représailles.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "documents",
      "informants"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "apartment_wall_cache",
    "type": "REBELLION",
    "title": "Faux mur dans bloc résidentiel",
    "sectorId": "res_b",
    "severity": 4,
    "body": "Derrière une cloison, la Protection Civile trouve radios, combinaisons civiles, cartes et outils de sabotage.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "residential",
      "cache"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "overwatch_bodycam_missing",
    "type": "REBELLION",
    "title": "Flux Overwatch interrompu",
    "sectorId": "periphery",
    "severity": 2,
    "body": "Le signal d’une escouade s’arrête dans la périphérie. La dernière image montre des silhouettes fuyant vers une bouche de drainage.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "Overwatch",
      "ambush"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "child_informant_refuses",
    "type": "REBELLION",
    "title": "Jeune informateur refuse de parler",
    "sectorId": "res_a",
    "severity": 3,
    "body": "Un enfant porteur d’un jeton Lambda ferme les yeux à chaque question. Le poste CP attend vos instructions.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "informant",
      "moral"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "black_mesa_east_rumor",
    "type": "REBELLION",
    "title": "Rumeur de route vers Black Mesa East",
    "sectorId": "canals",
    "severity": 4,
    "body": "Les citoyens répètent qu’une ancienne route hors de la ville serait ouverte par des scientifiques rebelles.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "Black Mesa East",
      "escape"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "grenade_workshop",
    "type": "REBELLION",
    "title": "Atelier d’explosifs artisanaux",
    "sectorId": "warehouse",
    "severity": 2,
    "body": "Des bidons industriels, batteries, câblage et cartouches volées forment un atelier de grenades de fortune.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "sabotage",
      "industrial"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "lambda_graffiti_wave",
    "type": "REBELLION",
    "title": "Vague de graffitis Lambda",
    "sectorId": "res_b",
    "severity": 3,
    "body": "Des symboles apparaissent simultanément sur murs, portes de rationnement et ascenseurs. Coordination impossible sans relais interne.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "graffiti",
      "morale"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "cp_defector",
    "type": "REBELLION",
    "title": "Agent Civil Protection soupçonné de défection",
    "sectorId": "cp_post",
    "severity": 4,
    "body": "Un officier efface des dossiers et détourne des rations. Son casier contient une carte des égouts.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "Civil Protection",
      "defection"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "antlion_bait_against_combine",
    "type": "REBELLION",
    "title": "Rebelles attirent les antlions",
    "sectorId": "periphery",
    "severity": 2,
    "body": "Des appareils de vibration bricolés guident les antlions vers une patrouille Combine.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "antlions",
      "trap"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "hospital_radio_surgery",
    "type": "REBELLION",
    "title": "Chirurgie clandestine sous radio brouillée",
    "sectorId": "hospital",
    "severity": 3,
    "body": "Un médecin pré-guerre opère des blessés rebelles pendant que des enceintes diffusent du bruit blanc.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "medical",
      "hospital"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "citizen_march_silent",
    "type": "REBELLION",
    "title": "Marche silencieuse de citoyens",
    "sectorId": "admin",
    "severity": 4,
    "body": "Sans slogans, sans armes, deux cents citoyens s’arrêtent devant la place administrative et regardent les caméras.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "citizens",
      "protest"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "rail_signal_spoof",
    "type": "REBELLION",
    "title": "Faux signal Razor Train",
    "sectorId": "rail",
    "severity": 2,
    "body": "Des codes de signalisation falsifiés déplacent un train de prisonniers vers une voie morte.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "rail",
      "signals"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "manhack_reprogrammed",
    "type": "REBELLION",
    "title": "Manhack retourné contre un poste CP",
    "sectorId": "cp_post",
    "severity": 3,
    "body": "Un manhack endommagé attaque ses anciens opérateurs avant de s’écraser contre une vitre blindée.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "manhack",
      "hacking"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "vort_chant_in_tunnels",
    "type": "REBELLION",
    "title": "Chant vortigaunt dans les tunnels",
    "sectorId": "sewers",
    "severity": 4,
    "body": "Les micros captent un chant grave qui semble calmer les blessés et perturber certains capteurs.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "Vortigaunt",
      "tunnels"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "nova_survivor_returns",
    "type": "REBELLION",
    "title": "Survivant de Nova Prospekt revenu",
    "sectorId": "res_a",
    "severity": 2,
    "body": "Un citoyen marqué par des procédures inconnues revient dans son bloc et parle trop clairement de ce qu’il a vu.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "Nova Prospekt",
      "testimony"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "odessa_style_training",
    "type": "REBELLION",
    "title": "Entraînement de milice civile",
    "sectorId": "warehouse",
    "severity": 3,
    "body": "Des citoyens apprennent à manier des armes récupérées derrière des palettes industrielles.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "militia",
      "training"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "scanner_blind_zone",
    "type": "REBELLION",
    "title": "Angle mort exploité par Lambda",
    "sectorId": "citadel_approach",
    "severity": 4,
    "body": "Un angle mort entre deux faisceaux de surveillance sert de passage vers la zone Citadelle.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "surveillance",
      "Citadel"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "ration_queue_riot_seed",
    "type": "REBELLION",
    "title": "Émeute préparée dans file de rations",
    "sectorId": "res_b",
    "severity": 2,
    "body": "Les files ne bougent plus. Certains citoyens avancent en rythme, comme s’ils attendaient un signal.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "rationing",
      "riot"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "white_forest_packet",
    "type": "REBELLION",
    "title": "Paquet chiffré “White Forest”",
    "sectorId": "broadcast",
    "severity": 3,
    "body": "Un message chiffré traverse le relais Breencast avant d’être effacé. Le nom White Forest apparaît dans les métadonnées.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "White Forest",
      "broadcast"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "general_uprising_spark",
    "type": "REBELLION",
    "title": "Étincelle d’insurrection générale",
    "sectorId": "admin",
    "severity": 4,
    "body": "Les incidents isolés cessent d’être isolés. Les canaux, blocs et entrepôts répondent au même tempo.",
    "choices": [
      {
        "id": "brouillage_et_scanners",
        "label": "Brouillage et scanners",
        "detail": "Réponse de surveillance : ralentit sans créer de massacre.",
        "effects": {
          "info": 8,
          "rebel": -4,
          "fear": 3,
          "fatigue": 2,
          "sectorRebel": -8,
          "sectorFear": 4
        }
      },
      {
        "id": "raid_civil_protection",
        "label": "Raid Civil Protection",
        "detail": "Rapide et brutal, nourrit les rancunes de bloc.",
        "effects": {
          "rebel": -10,
          "fear": 11,
          "loyalty": -9,
          "civilianLosses": 18,
          "sectorRebel": -18,
          "sectorFear": 13,
          "sectorLoyalty": -10
        },
        "status": "Surveillé"
      },
      {
        "id": "assaut_overwatch_cible",
        "label": "Assaut Overwatch ciblé",
        "detail": "Efficace contre cellule armée, coûteux politiquement.",
        "effects": {
          "rebel": -15,
          "combine": 3,
          "fear": 9,
          "combineLosses": 2,
          "civilianLosses": 34,
          "sectorRebel": -26,
          "sectorInfrastructure": -6
        },
        "status": "Zone de combat"
      },
      {
        "id": "infiltration_et_patience",
        "label": "Infiltration et patience",
        "detail": "Laisse la crise respirer pour révéler le réseau.",
        "effects": {
          "rebel": 6,
          "info": 6,
          "suspicion": -2,
          "sectorRebel": 7
        }
      }
    ],
    "loreTags": [
      "uprising",
      "citywide"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "headcrab_shell_misfire",
    "type": "XEN",
    "title": "Headcrab shell tombée hors cible",
    "sectorId": "periphery",
    "severity": 2,
    "body": "Une capsule biologique s’ouvre loin de sa zone prévue. Les cris cessent vite, puis recommencent avec une autre voix.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "headcrab shell",
      "zombies"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "barnacle_bloom_subway",
    "type": "XEN",
    "title": "Bloom de barnacles au tunnel bas",
    "sectorId": "sewers",
    "severity": 3,
    "body": "Les plafonds des conduits sont tapissés de langues pendantes. Les équipes CP refusent de lever la tête.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "barnacle",
      "sewer"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "fast_headcrab_stairwell",
    "type": "XEN",
    "title": "Fast headcrabs dans cage d’escalier",
    "sectorId": "res_a",
    "severity": 4,
    "body": "De petites silhouettes traversent les paliers trop vite pour les caméras civiles.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "fast headcrab",
      "residential"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "poison_headcrab_clinic",
    "type": "XEN",
    "title": "Poison headcrab dans ancienne clinique",
    "sectorId": "hospital",
    "severity": 2,
    "body": "Un zombie gonflé de parasites empoisonnés bloque le couloir chirurgical.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "poison headcrab",
      "hospital"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "antlion_tunnel_breach",
    "type": "XEN",
    "title": "Brèche antlion sous voirie",
    "sectorId": "periphery",
    "severity": 3,
    "body": "La chaussée respire, puis cède. Des mandibules sortent avant les secours.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "antlion",
      "burrow"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "antlion_guard_warehouse",
    "type": "XEN",
    "title": "Antlion Guard dans entrepôt",
    "sectorId": "warehouse",
    "severity": 4,
    "body": "Les murs vibrent à chaque impact. La structure ne tiendra pas si la créature charge encore.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "antlion guard",
      "warehouse"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "xen_fungus_factory",
    "type": "XEN",
    "title": "Xen fungus sur chaîne industrielle",
    "sectorId": "industrial",
    "severity": 2,
    "body": "Des fibres organiques s’enroulent autour des presses et absorbent la chaleur des moteurs.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "xen fungus",
      "industry"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "xen_wall_growth_admin",
    "type": "XEN",
    "title": "Croissance murale dans couloir administratif",
    "sectorId": "admin",
    "severity": 3,
    "body": "Un mur gris devient humide, veiné, vivant. Les capteurs ne savent plus s’il s’agit d’un bâtiment ou d’un organisme.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "wall growth",
      "admin"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "ichthyosaur_canal_lock",
    "type": "XEN",
    "title": "Prédateur aquatique dans écluse",
    "sectorId": "canals",
    "severity": 4,
    "body": "Un corps disparaît sous l’eau noire. Les scanners signalent une masse qui tourne sous la surface.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "ichthyosaur",
      "canals"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "spore_rain_quarantine",
    "type": "XEN",
    "title": "Pluie de spores sur zone quarantaine",
    "sectorId": "quarantine",
    "severity": 2,
    "body": "Une poussière lumineuse tombe contre les vitrages scellés. Les filtres saturent en moins d’une heure.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "spores",
      "quarantine"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "tentacle_sound_response",
    "type": "XEN",
    "title": "Tentacle attiré par vibrations",
    "sectorId": "industrial",
    "severity": 3,
    "body": "Un appendice colossal perce une dalle et frappe seulement quand les machines font du bruit.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "tentacle",
      "sound"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "zombie_apartment_stack",
    "type": "XEN",
    "title": "Empilement de zombies dans bloc A",
    "sectorId": "res_a",
    "severity": 4,
    "body": "Les portes de plusieurs appartements s’ouvrent à intervalles réguliers. Des corps parasités marchent en file.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "zombie",
      "residential"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "gonarch_trace_rare",
    "type": "XEN",
    "title": "Trace biologique de Gonarch",
    "sectorId": "quarantine",
    "severity": 2,
    "body": "Un œuf calcifié, trop grand, est découvert dans une chambre froide abandonnée.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "Gonarch",
      "rare"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "xen_pods_railcar",
    "type": "XEN",
    "title": "Pods Xen dans wagon Razor Train",
    "sectorId": "rail",
    "severity": 3,
    "body": "Un wagon transféré depuis une zone scellée contient des excroissances qui pulsent au rythme des rails.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "rail",
      "pods"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "barnacle_admin_ceiling",
    "type": "XEN",
    "title": "Barnacles au plafond du poste administratif",
    "sectorId": "admin",
    "severity": 4,
    "body": "Une langue saisit un dossier suspendu. Puis un gant Civil Protection tombe du plafond.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "barnacle",
      "admin"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "headcrab_market_basket",
    "type": "XEN",
    "title": "Headcrab caché dans panier de rations",
    "sectorId": "res_b",
    "severity": 2,
    "body": "Une distribution de rations devient une scène de panique quand un parasite saute depuis une caisse.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "headcrab",
      "rations"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "sewer_biomass_surge",
    "type": "XEN",
    "title": "Biomasse dans collecteur principal",
    "sectorId": "sewers",
    "severity": 3,
    "body": "Le collecteur ne transporte plus seulement des eaux usées. Il transporte une digestion lente.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "biomass",
      "sewers"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "xen_light_pollips",
    "type": "XEN",
    "title": "Organismes lumineux type pollips",
    "sectorId": "hospital",
    "severity": 4,
    "body": "De petites poches lumineuses colonisent l’aile est. Les blessés disent entendre des chuchotements.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "Xen flora",
      "Alyx-like"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "antlion_worker_acid",
    "type": "XEN",
    "title": "Antlion worker cracheur acide",
    "sectorId": "periphery",
    "severity": 2,
    "body": "Un ouvrier Combine revient sans blindage facial. L’acide a percé comme une rouille vivante.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "antlion worker",
      "acid"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "contaminated_corpse_train",
    "type": "XEN",
    "title": "Cadavre contaminé en transit",
    "sectorId": "rail",
    "severity": 3,
    "body": "Un corps envoyé au traitement standard bouge à nouveau entre deux stations.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "zombie",
      "Razor Train"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "headcrab_canister_cache",
    "type": "XEN",
    "title": "Cache de capsules headcrab instables",
    "sectorId": "citadel_approach",
    "severity": 4,
    "body": "Des capsules biologiques non inventoriées sont retrouvées près d’un accès Citadelle.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "headcrab shell",
      "Citadel"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "quarantine_door_breathing",
    "type": "XEN",
    "title": "Porte de quarantaine qui respire",
    "sectorId": "quarantine",
    "severity": 2,
    "body": "Les joints d’une porte scellée se dilatent comme du tissu vivant.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "quarantine",
      "organic growth"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "houndeye_pack_old_zone",
    "type": "XEN",
    "title": "Meute houndeye en ruines pré-guerre",
    "sectorId": "periphery",
    "severity": 3,
    "body": "Un groupe de créatures aveugles émet une onde qui fissure les vitres restantes.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "houndeye",
      "extended lore"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "bullsquid_factory_sludge",
    "type": "XEN",
    "title": "Bullsquid dans boues industrielles",
    "sectorId": "industrial",
    "severity": 4,
    "body": "Les bassins chimiques bouillonnent. Une silhouette reptilienne crache à travers la vapeur.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "bullsquid",
      "extended lore"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "xen_root_under_cp",
    "type": "XEN",
    "title": "Racine Xen sous poste CP",
    "sectorId": "cp_post",
    "severity": 2,
    "body": "Le sol du poste est tiède. Une racine organique a traversé le béton jusqu’aux casiers.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "Xen root",
      "Civil Protection"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "parasite_informant",
    "type": "XEN",
    "title": "Informateur parasité mais conscient",
    "sectorId": "hospital",
    "severity": 3,
    "body": "Un citoyen contaminé parle encore et supplie qu’on ne prévienne pas sa famille.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "headcrab",
      "moral"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "sewer_zombie_wave",
    "type": "XEN",
    "title": "Vague zombie depuis égouts",
    "sectorId": "sewers",
    "severity": 4,
    "body": "Les grilles tremblent. Des mains mortes passent au travers avant les têtes.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "zombies",
      "sewers"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "antlion_larval_chamber",
    "type": "XEN",
    "title": "Chambre larvaire antlion",
    "sectorId": "periphery",
    "severity": 2,
    "body": "Une cavité chaude remplie de larves bloque une route industrielle périphérique.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "antlion larvae",
      "extract"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "xen_weather_static",
    "type": "XEN",
    "title": "Statique atmosphérique Xen",
    "sectorId": "broadcast",
    "severity": 3,
    "body": "Les écrans publics affichent des formes organiques pendant les annonces. Le signal ne vient d’aucune antenne.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "Xen resonance",
      "broadcast"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "total_biofeedback_event",
    "type": "XEN",
    "title": "Résonance biologique multi-secteurs",
    "sectorId": "quarantine",
    "severity": 4,
    "body": "Les contaminations isolées semblent répondre les unes aux autres par pulsations synchronisées.",
    "choices": [
      {
        "id": "quarantaine_biologique",
        "label": "Quarantaine biologique",
        "detail": "Confinement propre mais lent, coûteux en fatigue.",
        "effects": {
          "xen": -8,
          "fear": 5,
          "fatigue": 5,
          "sectorXen": -18,
          "sectorFear": 8
        },
        "status": "En quarantaine"
      },
      {
        "id": "scellement_immediat",
        "label": "Scellement immédiat",
        "detail": "Efficacité maximale, coût civil classifié.",
        "effects": {
          "xen": -16,
          "stability": -6,
          "loyalty": -14,
          "fear": 17,
          "civilianLosses": 120,
          "sectorXen": -36,
          "sectorInfrastructure": -8
        },
        "status": "Scellé"
      },
      {
        "id": "purge_thermique",
        "label": "Purge thermique",
        "detail": "Détruit l’organique et l’infrastructure.",
        "effects": {
          "xen": -18,
          "production": -5,
          "fear": 13,
          "loyalty": -9,
          "civilianLosses": 60,
          "sectorXen": -42,
          "sectorInfrastructure": -24
        },
        "status": "Bombardé"
      },
      {
        "id": "capture_pour_etude",
        "label": "Capture pour étude",
        "detail": "Gain technocratique avec risque biologique différé.",
        "effects": {
          "xen": 4,
          "production": 4,
          "citadel": 3,
          "suspicion": 6,
          "sectorXen": 8
        }
      }
    ],
    "loreTags": [
      "citywide Xen",
      "resonance"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "ration_queue_collapse",
    "type": "CIVIL",
    "title": "Effondrement d’une file de rationnement",
    "sectorId": "res_b",
    "severity": 1,
    "body": "La file s’étend sur trois rues. Des citoyens tombent sans bruit pour éviter d’être remarqués.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "rations",
      "fatigue"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "suppression_field_panic",
    "type": "CIVIL",
    "title": "Panique autour du Suppression Field",
    "sectorId": "res_a",
    "severity": 2,
    "body": "Une rumeur prétend que le champ de suppression va être renforcé. Les blocs deviennent silencieux.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "Suppression Field",
      "fear"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "market_black_rations",
    "type": "CIVIL",
    "title": "Marché noir de rations",
    "sectorId": "warehouse",
    "severity": 3,
    "body": "Des jetons civiques et suppléments se vendent derrière les entrepôts.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "black market",
      "rations"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "citizen_denunciation_wave",
    "type": "CIVIL",
    "title": "Vague de dénonciations civiles",
    "sectorId": "admin",
    "severity": 1,
    "body": "Trop de citoyens dénoncent trop de voisins. Les rapports deviennent inutilisables.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "denunciation",
      "surveillance"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "worker_suicide_note",
    "type": "CIVIL",
    "title": "Note d’ouvrier retrouvée",
    "sectorId": "industrial",
    "severity": 2,
    "body": "Un ouvrier se jette dans une machine après avoir écrit que la productivité est la seule langue que la ville parle encore.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "workers",
      "moral"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "family_transfer_request",
    "type": "CIVIL",
    "title": "Famille demande transfert volontaire",
    "sectorId": "res_a",
    "severity": 3,
    "body": "Une famille supplie d’être transférée ailleurs, même vers un complexe inconnu, pour fuir les headcrabs.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "transfer",
      "family"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "silent_children_class",
    "type": "CIVIL",
    "title": "Classe d’enfants muette",
    "sectorId": "res_b",
    "severity": 1,
    "body": "Une salle entière d’enfants refuse de répéter les slogans civiques.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "children",
      "propaganda"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "civil_protection_extortion",
    "type": "CIVIL",
    "title": "Extorsion par Civil Protection",
    "sectorId": "cp_post",
    "severity": 2,
    "body": "Des agents CP réclament des rations pour éviter des inspections humiliantes.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "Civil Protection",
      "corruption"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "work_quota_fraud",
    "type": "CIVIL",
    "title": "Fraude aux quotas industriels",
    "sectorId": "industrial",
    "severity": 3,
    "body": "Les chiffres de production sont gonflés par peur des sanctions.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "production",
      "fraud"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "housing_reassignment_fail",
    "type": "CIVIL",
    "title": "Réaffectation de logements échoue",
    "sectorId": "res_a",
    "severity": 1,
    "body": "Des citoyens déplacés reviennent dormir dans leur ancien bloc, malgré les scellés.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "housing",
      "control"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "breencast_fatigue",
    "type": "CIVIL",
    "title": "Fatigue Breencast généralisée",
    "sectorId": "broadcast",
    "severity": 2,
    "body": "Les citoyens gardent les yeux au sol pendant les messages. La propagande passe, mais ne pénètre plus.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "propaganda",
      "fatigue"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "medical_supply_shortage",
    "type": "CIVIL",
    "title": "Pénurie médicale",
    "sectorId": "hospital",
    "severity": 3,
    "body": "Les unités médicales manquent d’antitoxines après attaques de poison headcrabs.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "medical",
      "poison"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "citizen_petition_impossible",
    "type": "CIVIL",
    "title": "Pétition civique impossible",
    "sectorId": "admin",
    "severity": 1,
    "body": "Des citoyens demandent une procédure de plainte. L’ancien monde a laissé des réflexes administratifs inutiles.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "petition",
      "old world"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "factory_refusal_shift",
    "type": "CIVIL",
    "title": "Refus collectif de prise de poste",
    "sectorId": "industrial",
    "severity": 2,
    "body": "Une équipe entière reste assise devant les machines, sans slogan ni violence.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "workers",
      "strike"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "collaborator_family_targeted",
    "type": "CIVIL",
    "title": "Famille de collaborateur menacée",
    "sectorId": "res_b",
    "severity": 3,
    "body": "Un agent CP demande protection pour sa famille. Les murs de son immeuble portent déjà le symbole Lambda.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "collaborator",
      "reprisal"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "contaminated_water_rumor",
    "type": "CIVIL",
    "title": "Rumeur d’eau contaminée",
    "sectorId": "canals",
    "severity": 1,
    "body": "La population refuse l’eau distribuée après la découverte d’une biomasse dans le canal.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "water",
      "Xen rumor"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "false_headcrab_alarm",
    "type": "CIVIL",
    "title": "Fausse alerte headcrab",
    "sectorId": "res_a",
    "severity": 2,
    "body": "Un bruit dans un conduit déclenche une panique de bloc. Aucun parasite trouvé.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "panic",
      "headcrab"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "citizen_memory_archive",
    "type": "CIVIL",
    "title": "Archives personnelles interdites",
    "sectorId": "res_b",
    "severity": 3,
    "body": "Des citoyens cachent photos, journaux et souvenirs pré-guerre dans les murs.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "memory",
      "old world"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "mourning_gathering",
    "type": "CIVIL",
    "title": "Rassemblement de deuil non autorisé",
    "sectorId": "hospital",
    "severity": 1,
    "body": "Des familles allument des lampes près de l’hôpital. Aucun discours, seulement des noms murmurés.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "mourning",
      "civil"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "ration_reward_policy",
    "type": "CIVIL",
    "title": "Récompense aux citoyens loyaux contestée",
    "sectorId": "admin",
    "severity": 2,
    "body": "La distribution sélective calme les collaborateurs mais humilie les autres.",
    "choices": [
      {
        "id": "propagande_paternaliste",
        "label": "Propagande paternaliste",
        "detail": "Calme apparent par discours et écrans publics.",
        "effects": {
          "info": 10,
          "fear": 2,
          "fatigue": 4,
          "sectorFear": 3
        }
      },
      {
        "id": "concession_rationnelle",
        "label": "Concession rationnelle",
        "detail": "Coûte des ressources mais réduit la pression humaine.",
        "effects": {
          "rations": -180,
          "loyalty": 8,
          "fatigue": -7,
          "rebel": -3,
          "sectorLoyalty": 9
        }
      },
      {
        "id": "punition_administrative",
        "label": "Punition administrative",
        "detail": "Exemplaire, rapide, destructeur à long terme.",
        "effects": {
          "fear": 12,
          "loyalty": -12,
          "rebel": 6,
          "civilianLosses": 22,
          "sectorFear": 14,
          "sectorLoyalty": -12
        },
        "status": "Sous couvre-feu"
      },
      {
        "id": "classer_sans_suite",
        "label": "Classer sans suite",
        "detail": "Garde les chiffres propres, laisse le problème fermenter.",
        "effects": {
          "stability": 2,
          "suspicion": 4,
          "rebel": 3,
          "fatigue": 2
        }
      }
    ],
    "loreTags": [
      "loyalty",
      "rations"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "advisor_silent_visit",
    "type": "CITADEL",
    "title": "Visite silencieuse d’un Advisor",
    "sectorId": "citadel",
    "severity": 3,
    "body": "Un Advisor traverse les niveaux supérieurs. Personne ne donne d’ordre, mais tous comprennent que la ville est jugée.",
    "choices": [
      {
        "id": "conformite_totale",
        "label": "Conformité totale",
        "detail": "Obéir sans discuter.",
        "effects": {
          "citadel": 8,
          "fear": 7,
          "loyalty": -6,
          "suspicion": -2
        }
      },
      {
        "id": "rapport_falsifie",
        "label": "Rapport falsifié",
        "detail": "Protéger votre poste en maquillant les chiffres.",
        "effects": {
          "info": 8,
          "stability": 3,
          "suspicion": 12
        }
      },
      {
        "id": "demander_delai_technique",
        "label": "Demander délai technique",
        "detail": "Approche technocratique, risque de faiblesse perçue.",
        "effects": {
          "production": 4,
          "citadel": -5,
          "suspicion": 6,
          "fatigue": -2
        }
      },
      {
        "id": "sacrifice_exemplaire",
        "label": "Sacrifice exemplaire",
        "detail": "Offrir des coupables au système.",
        "effects": {
          "citadel": 10,
          "fear": 14,
          "loyalty": -13,
          "civilianLosses": 70,
          "rebel": 5
        }
      }
    ],
    "loreTags": [
      "Advisor",
      "inspection"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "citadel_energy_dip",
    "type": "CITADEL",
    "title": "Chute d’énergie Citadel",
    "sectorId": "citadel",
    "severity": 4,
    "body": "Les lumières bleues de la Citadelle vacillent. Les unités lourdes demandent une priorisation immédiate.",
    "choices": [
      {
        "id": "conformite_totale",
        "label": "Conformité totale",
        "detail": "Obéir sans discuter.",
        "effects": {
          "citadel": 8,
          "fear": 7,
          "loyalty": -6,
          "suspicion": -2
        }
      },
      {
        "id": "rapport_falsifie",
        "label": "Rapport falsifié",
        "detail": "Protéger votre poste en maquillant les chiffres.",
        "effects": {
          "info": 8,
          "stability": 3,
          "suspicion": 12
        }
      },
      {
        "id": "demander_delai_technique",
        "label": "Demander délai technique",
        "detail": "Approche technocratique, risque de faiblesse perçue.",
        "effects": {
          "production": 4,
          "citadel": -5,
          "suspicion": 6,
          "fatigue": -2
        }
      },
      {
        "id": "sacrifice_exemplaire",
        "label": "Sacrifice exemplaire",
        "detail": "Offrir des coupables au système.",
        "effects": {
          "citadel": 10,
          "fear": 14,
          "loyalty": -13,
          "civilianLosses": 70,
          "rebel": 5
        }
      }
    ],
    "loreTags": [
      "Citadel",
      "energy"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "overwatch_quota",
    "type": "COMBINE",
    "title": "Quota Overwatch incomplet",
    "sectorId": "cp_post",
    "severity": 5,
    "body": "Le commandement exige plus de corps disponibles pour conversion, transfert ou conscription forcée.",
    "choices": [
      {
        "id": "conformite_totale",
        "label": "Conformité totale",
        "detail": "Obéir sans discuter.",
        "effects": {
          "citadel": 8,
          "fear": 7,
          "loyalty": -6,
          "suspicion": -2
        }
      },
      {
        "id": "rapport_falsifie",
        "label": "Rapport falsifié",
        "detail": "Protéger votre poste en maquillant les chiffres.",
        "effects": {
          "info": 8,
          "stability": 3,
          "suspicion": 12
        }
      },
      {
        "id": "demander_delai_technique",
        "label": "Demander délai technique",
        "detail": "Approche technocratique, risque de faiblesse perçue.",
        "effects": {
          "production": 4,
          "citadel": -5,
          "suspicion": 6,
          "fatigue": -2
        }
      },
      {
        "id": "sacrifice_exemplaire",
        "label": "Sacrifice exemplaire",
        "detail": "Offrir des coupables au système.",
        "effects": {
          "citadel": 10,
          "fear": 14,
          "loyalty": -13,
          "civilianLosses": 70,
          "rebel": 5
        }
      }
    ],
    "loreTags": [
      "Overwatch",
      "quota"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "strider_requisition",
    "type": "COMBINE",
    "title": "Strider réquisitionné ailleurs",
    "sectorId": "citadel_approach",
    "severity": 3,
    "body": "Un Strider prévu pour City est détourné vers une autre zone. Les rebelles pourraient sentir le vide.",
    "choices": [
      {
        "id": "conformite_totale",
        "label": "Conformité totale",
        "detail": "Obéir sans discuter.",
        "effects": {
          "citadel": 8,
          "fear": 7,
          "loyalty": -6,
          "suspicion": -2
        }
      },
      {
        "id": "rapport_falsifie",
        "label": "Rapport falsifié",
        "detail": "Protéger votre poste en maquillant les chiffres.",
        "effects": {
          "info": 8,
          "stability": 3,
          "suspicion": 12
        }
      },
      {
        "id": "demander_delai_technique",
        "label": "Demander délai technique",
        "detail": "Approche technocratique, risque de faiblesse perçue.",
        "effects": {
          "production": 4,
          "citadel": -5,
          "suspicion": 6,
          "fatigue": -2
        }
      },
      {
        "id": "sacrifice_exemplaire",
        "label": "Sacrifice exemplaire",
        "detail": "Offrir des coupables au système.",
        "effects": {
          "citadel": 10,
          "fear": 14,
          "loyalty": -13,
          "civilianLosses": 70,
          "rebel": 5
        }
      }
    ],
    "loreTags": [
      "Strider",
      "logistics"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "scanner_network_desync",
    "type": "COMBINE",
    "title": "Réseau scanner désynchronisé",
    "sectorId": "broadcast",
    "severity": 4,
    "body": "Les scanners se croisent, se heurtent et perdent leurs horodatages. Le réseau de surveillance devient aveugle par plaques.",
    "choices": [
      {
        "id": "conformite_totale",
        "label": "Conformité totale",
        "detail": "Obéir sans discuter.",
        "effects": {
          "citadel": 8,
          "fear": 7,
          "loyalty": -6,
          "suspicion": -2
        }
      },
      {
        "id": "rapport_falsifie",
        "label": "Rapport falsifié",
        "detail": "Protéger votre poste en maquillant les chiffres.",
        "effects": {
          "info": 8,
          "stability": 3,
          "suspicion": 12
        }
      },
      {
        "id": "demander_delai_technique",
        "label": "Demander délai technique",
        "detail": "Approche technocratique, risque de faiblesse perçue.",
        "effects": {
          "production": 4,
          "citadel": -5,
          "suspicion": 6,
          "fatigue": -2
        }
      },
      {
        "id": "sacrifice_exemplaire",
        "label": "Sacrifice exemplaire",
        "detail": "Offrir des coupables au système.",
        "effects": {
          "citadel": 10,
          "fear": 14,
          "loyalty": -13,
          "civilianLosses": 70,
          "rebel": 5
        }
      }
    ],
    "loreTags": [
      "scanner",
      "network"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "cp_morale_break",
    "type": "COMBINE",
    "title": "Moral Civil Protection en rupture",
    "sectorId": "cp_post",
    "severity": 5,
    "body": "Des agents humains refusent des patrouilles dans les égouts et demandent une prime de loyauté.",
    "choices": [
      {
        "id": "conformite_totale",
        "label": "Conformité totale",
        "detail": "Obéir sans discuter.",
        "effects": {
          "citadel": 8,
          "fear": 7,
          "loyalty": -6,
          "suspicion": -2
        }
      },
      {
        "id": "rapport_falsifie",
        "label": "Rapport falsifié",
        "detail": "Protéger votre poste en maquillant les chiffres.",
        "effects": {
          "info": 8,
          "stability": 3,
          "suspicion": 12
        }
      },
      {
        "id": "demander_delai_technique",
        "label": "Demander délai technique",
        "detail": "Approche technocratique, risque de faiblesse perçue.",
        "effects": {
          "production": 4,
          "citadel": -5,
          "suspicion": 6,
          "fatigue": -2
        }
      },
      {
        "id": "sacrifice_exemplaire",
        "label": "Sacrifice exemplaire",
        "detail": "Offrir des coupables au système.",
        "effects": {
          "citadel": 10,
          "fear": 14,
          "loyalty": -13,
          "civilianLosses": 70,
          "rebel": 5
        }
      }
    ],
    "loreTags": [
      "Civil Protection",
      "morale"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "gunship_fuel_order",
    "type": "COMBINE",
    "title": "Ordre de réserve Gunship",
    "sectorId": "citadel",
    "severity": 3,
    "body": "La Citadelle interdit tout vol non essentiel. L’autorité aérienne devient rare.",
    "choices": [
      {
        "id": "conformite_totale",
        "label": "Conformité totale",
        "detail": "Obéir sans discuter.",
        "effects": {
          "citadel": 8,
          "fear": 7,
          "loyalty": -6,
          "suspicion": -2
        }
      },
      {
        "id": "rapport_falsifie",
        "label": "Rapport falsifié",
        "detail": "Protéger votre poste en maquillant les chiffres.",
        "effects": {
          "info": 8,
          "stability": 3,
          "suspicion": 12
        }
      },
      {
        "id": "demander_delai_technique",
        "label": "Demander délai technique",
        "detail": "Approche technocratique, risque de faiblesse perçue.",
        "effects": {
          "production": 4,
          "citadel": -5,
          "suspicion": 6,
          "fatigue": -2
        }
      },
      {
        "id": "sacrifice_exemplaire",
        "label": "Sacrifice exemplaire",
        "detail": "Offrir des coupables au système.",
        "effects": {
          "citadel": 10,
          "fear": 14,
          "loyalty": -13,
          "civilianLosses": 70,
          "rebel": 5
        }
      }
    ],
    "loreTags": [
      "Gunship",
      "airwatch"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "nova_manifest_mismatch",
    "type": "CITADEL",
    "title": "Manifeste Nova Prospekt incohérent",
    "sectorId": "rail",
    "severity": 4,
    "body": "Le nombre de détenus transférés ne correspond pas au nombre reçu. Quelqu’un a disparu dans l’espace administratif.",
    "choices": [
      {
        "id": "conformite_totale",
        "label": "Conformité totale",
        "detail": "Obéir sans discuter.",
        "effects": {
          "citadel": 8,
          "fear": 7,
          "loyalty": -6,
          "suspicion": -2
        }
      },
      {
        "id": "rapport_falsifie",
        "label": "Rapport falsifié",
        "detail": "Protéger votre poste en maquillant les chiffres.",
        "effects": {
          "info": 8,
          "stability": 3,
          "suspicion": 12
        }
      },
      {
        "id": "demander_delai_technique",
        "label": "Demander délai technique",
        "detail": "Approche technocratique, risque de faiblesse perçue.",
        "effects": {
          "production": 4,
          "citadel": -5,
          "suspicion": 6,
          "fatigue": -2
        }
      },
      {
        "id": "sacrifice_exemplaire",
        "label": "Sacrifice exemplaire",
        "detail": "Offrir des coupables au système.",
        "effects": {
          "citadel": 10,
          "fear": 14,
          "loyalty": -13,
          "civilianLosses": 70,
          "rebel": 5
        }
      }
    ],
    "loreTags": [
      "Nova Prospekt",
      "manifest"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "headcrab_shell_authorization",
    "type": "CITADEL",
    "title": "Autorisation Headcrab Shell",
    "sectorId": "periphery",
    "severity": 5,
    "body": "La Citadelle propose un bombardement biologique pour pacifier une zone rebelle. Le mot “pacifier” est répété trois fois.",
    "choices": [
      {
        "id": "conformite_totale",
        "label": "Conformité totale",
        "detail": "Obéir sans discuter.",
        "effects": {
          "citadel": 8,
          "fear": 7,
          "loyalty": -6,
          "suspicion": -2
        }
      },
      {
        "id": "rapport_falsifie",
        "label": "Rapport falsifié",
        "detail": "Protéger votre poste en maquillant les chiffres.",
        "effects": {
          "info": 8,
          "stability": 3,
          "suspicion": 12
        }
      },
      {
        "id": "demander_delai_technique",
        "label": "Demander délai technique",
        "detail": "Approche technocratique, risque de faiblesse perçue.",
        "effects": {
          "production": 4,
          "citadel": -5,
          "suspicion": 6,
          "fatigue": -2
        }
      },
      {
        "id": "sacrifice_exemplaire",
        "label": "Sacrifice exemplaire",
        "detail": "Offrir des coupables au système.",
        "effects": {
          "citadel": 10,
          "fear": 14,
          "loyalty": -13,
          "civilianLosses": 70,
          "rebel": 5
        }
      }
    ],
    "loreTags": [
      "headcrab shell",
      "weapon"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "breen_audit_broadcast",
    "type": "PROPAGANDA",
    "title": "Audit Breencast de conformité",
    "sectorId": "broadcast",
    "severity": 3,
    "body": "Un discours central exige que les villes prouvent que leur population comprend encore la gratitude.",
    "choices": [
      {
        "id": "conformite_totale",
        "label": "Conformité totale",
        "detail": "Obéir sans discuter.",
        "effects": {
          "citadel": 8,
          "fear": 7,
          "loyalty": -6,
          "suspicion": -2
        }
      },
      {
        "id": "rapport_falsifie",
        "label": "Rapport falsifié",
        "detail": "Protéger votre poste en maquillant les chiffres.",
        "effects": {
          "info": 8,
          "stability": 3,
          "suspicion": 12
        }
      },
      {
        "id": "demander_delai_technique",
        "label": "Demander délai technique",
        "detail": "Approche technocratique, risque de faiblesse perçue.",
        "effects": {
          "production": 4,
          "citadel": -5,
          "suspicion": 6,
          "fatigue": -2
        }
      },
      {
        "id": "sacrifice_exemplaire",
        "label": "Sacrifice exemplaire",
        "detail": "Offrir des coupables au système.",
        "effects": {
          "citadel": 10,
          "fear": 14,
          "loyalty": -13,
          "civilianLosses": 70,
          "rebel": 5
        }
      }
    ],
    "loreTags": [
      "Breencast",
      "audit"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "seal_civilians_inside",
    "type": "MORAL",
    "title": "Sceller des civils avec la contamination",
    "sectorId": "quarantine",
    "severity": 4,
    "body": "Un secteur peut être sauvé si une porte reste fermée. Derrière, des voix humaines frappent encore.",
    "choices": [
      {
        "id": "option_humaine_secrete",
        "label": "Option humaine secrète",
        "detail": "Sauver des vies en masquant la trace administrative.",
        "effects": {
          "loyalty": 10,
          "rebel": 4,
          "suspicion": 14,
          "civilianLosses": -30
        }
      },
      {
        "id": "option_combine_conforme",
        "label": "Option Combine conforme",
        "detail": "La procédure protège votre autorité.",
        "effects": {
          "citadel": 8,
          "fear": 9,
          "loyalty": -10,
          "suspicion": -3,
          "civilianLosses": 25
        }
      },
      {
        "id": "compromis_froid",
        "label": "Compromis froid",
        "detail": "Limiter la catastrophe sans sauver tout le monde.",
        "effects": {
          "stability": 3,
          "xen": -3,
          "rebel": -2,
          "fatigue": 4,
          "civilianLosses": 12
        }
      },
      {
        "id": "effacer_le_dossier",
        "label": "Effacer le dossier",
        "detail": "Le problème disparaît des archives, pas du réel.",
        "effects": {
          "info": 6,
          "suspicion": 7,
          "stability": 2,
          "loyalty": -3
        }
      }
    ],
    "loreTags": [
      "quarantine",
      "moral"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "vort_for_prisoners",
    "type": "MORAL",
    "title": "Échange Vortigaunt contre prisonniers",
    "sectorId": "hospital",
    "severity": 5,
    "body": "Un Vortigaunt propose de contenir Xen si dix citoyens quittent les listes de transfert.",
    "choices": [
      {
        "id": "option_humaine_secrete",
        "label": "Option humaine secrète",
        "detail": "Sauver des vies en masquant la trace administrative.",
        "effects": {
          "loyalty": 10,
          "rebel": 4,
          "suspicion": 14,
          "civilianLosses": -30
        }
      },
      {
        "id": "option_combine_conforme",
        "label": "Option Combine conforme",
        "detail": "La procédure protège votre autorité.",
        "effects": {
          "citadel": 8,
          "fear": 9,
          "loyalty": -10,
          "suspicion": -3,
          "civilianLosses": 25
        }
      },
      {
        "id": "compromis_froid",
        "label": "Compromis froid",
        "detail": "Limiter la catastrophe sans sauver tout le monde.",
        "effects": {
          "stability": 3,
          "xen": -3,
          "rebel": -2,
          "fatigue": 4,
          "civilianLosses": 12
        }
      },
      {
        "id": "effacer_le_dossier",
        "label": "Effacer le dossier",
        "detail": "Le problème disparaît des archives, pas du réel.",
        "effects": {
          "info": 6,
          "suspicion": 7,
          "stability": 2,
          "loyalty": -3
        }
      }
    ],
    "loreTags": [
      "Vortigaunt",
      "prisoners"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "child_lambda_token",
    "type": "MORAL",
    "title": "Jeton Lambda dans la main d’un enfant",
    "sectorId": "res_a",
    "severity": 5,
    "body": "L’enfant ne comprend peut-être pas le symbole. Ou il comprend trop bien.",
    "choices": [
      {
        "id": "option_humaine_secrete",
        "label": "Option humaine secrète",
        "detail": "Sauver des vies en masquant la trace administrative.",
        "effects": {
          "loyalty": 10,
          "rebel": 4,
          "suspicion": 14,
          "civilianLosses": -30
        }
      },
      {
        "id": "option_combine_conforme",
        "label": "Option Combine conforme",
        "detail": "La procédure protège votre autorité.",
        "effects": {
          "citadel": 8,
          "fear": 9,
          "loyalty": -10,
          "suspicion": -3,
          "civilianLosses": 25
        }
      },
      {
        "id": "compromis_froid",
        "label": "Compromis froid",
        "detail": "Limiter la catastrophe sans sauver tout le monde.",
        "effects": {
          "stability": 3,
          "xen": -3,
          "rebel": -2,
          "fatigue": 4,
          "civilianLosses": 12
        }
      },
      {
        "id": "effacer_le_dossier",
        "label": "Effacer le dossier",
        "detail": "Le problème disparaît des archives, pas du réel.",
        "effects": {
          "info": 6,
          "suspicion": 7,
          "stability": 2,
          "loyalty": -3
        }
      }
    ],
    "loreTags": [
      "child",
      "Lambda"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "fake_plague_cover",
    "type": "MORAL",
    "title": "Inventer une peste pour couvrir une purge",
    "sectorId": "admin",
    "severity": 4,
    "body": "Le mensonge sanitaire protégerait votre poste et détruirait la confiance résiduelle.",
    "choices": [
      {
        "id": "option_humaine_secrete",
        "label": "Option humaine secrète",
        "detail": "Sauver des vies en masquant la trace administrative.",
        "effects": {
          "loyalty": 10,
          "rebel": 4,
          "suspicion": 14,
          "civilianLosses": -30
        }
      },
      {
        "id": "option_combine_conforme",
        "label": "Option Combine conforme",
        "detail": "La procédure protège votre autorité.",
        "effects": {
          "citadel": 8,
          "fear": 9,
          "loyalty": -10,
          "suspicion": -3,
          "civilianLosses": 25
        }
      },
      {
        "id": "compromis_froid",
        "label": "Compromis froid",
        "detail": "Limiter la catastrophe sans sauver tout le monde.",
        "effects": {
          "stability": 3,
          "xen": -3,
          "rebel": -2,
          "fatigue": 4,
          "civilianLosses": 12
        }
      },
      {
        "id": "effacer_le_dossier",
        "label": "Effacer le dossier",
        "detail": "Le problème disparaît des archives, pas du réel.",
        "effects": {
          "info": 6,
          "suspicion": 7,
          "stability": 2,
          "loyalty": -3
        }
      }
    ],
    "loreTags": [
      "cover-up",
      "quarantine"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "release_rebel_doctor",
    "type": "MORAL",
    "title": "Libérer un médecin rebelle",
    "sectorId": "hospital",
    "severity": 5,
    "body": "Le médecin sauvera des civils, puis peut-être des rebelles.",
    "choices": [
      {
        "id": "option_humaine_secrete",
        "label": "Option humaine secrète",
        "detail": "Sauver des vies en masquant la trace administrative.",
        "effects": {
          "loyalty": 10,
          "rebel": 4,
          "suspicion": 14,
          "civilianLosses": -30
        }
      },
      {
        "id": "option_combine_conforme",
        "label": "Option Combine conforme",
        "detail": "La procédure protège votre autorité.",
        "effects": {
          "citadel": 8,
          "fear": 9,
          "loyalty": -10,
          "suspicion": -3,
          "civilianLosses": 25
        }
      },
      {
        "id": "compromis_froid",
        "label": "Compromis froid",
        "detail": "Limiter la catastrophe sans sauver tout le monde.",
        "effects": {
          "stability": 3,
          "xen": -3,
          "rebel": -2,
          "fatigue": 4,
          "civilianLosses": 12
        }
      },
      {
        "id": "effacer_le_dossier",
        "label": "Effacer le dossier",
        "detail": "Le problème disparaît des archives, pas du réel.",
        "effects": {
          "info": 6,
          "suspicion": 7,
          "stability": 2,
          "loyalty": -3
        }
      }
    ],
    "loreTags": [
      "doctor",
      "Resistance"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "sacrifice_cp_squad",
    "type": "MORAL",
    "title": "Sacrifier une escouade CP humaine",
    "sectorId": "sewers",
    "severity": 5,
    "body": "Une escouade de collaborateurs peut retarder les zombies assez longtemps pour fermer une vanne.",
    "choices": [
      {
        "id": "option_humaine_secrete",
        "label": "Option humaine secrète",
        "detail": "Sauver des vies en masquant la trace administrative.",
        "effects": {
          "loyalty": 10,
          "rebel": 4,
          "suspicion": 14,
          "civilianLosses": -30
        }
      },
      {
        "id": "option_combine_conforme",
        "label": "Option Combine conforme",
        "detail": "La procédure protège votre autorité.",
        "effects": {
          "citadel": 8,
          "fear": 9,
          "loyalty": -10,
          "suspicion": -3,
          "civilianLosses": 25
        }
      },
      {
        "id": "compromis_froid",
        "label": "Compromis froid",
        "detail": "Limiter la catastrophe sans sauver tout le monde.",
        "effects": {
          "stability": 3,
          "xen": -3,
          "rebel": -2,
          "fatigue": 4,
          "civilianLosses": 12
        }
      },
      {
        "id": "effacer_le_dossier",
        "label": "Effacer le dossier",
        "detail": "Le problème disparaît des archives, pas du réel.",
        "effects": {
          "info": 6,
          "suspicion": 7,
          "stability": 2,
          "loyalty": -3
        }
      }
    ],
    "loreTags": [
      "Civil Protection",
      "sacrifice"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "ration_children_first",
    "type": "MORAL",
    "title": "Rationner les enfants en premier",
    "sectorId": "res_b",
    "severity": 4,
    "body": "Option humainement défendable, administrativement suspecte.",
    "choices": [
      {
        "id": "option_humaine_secrete",
        "label": "Option humaine secrète",
        "detail": "Sauver des vies en masquant la trace administrative.",
        "effects": {
          "loyalty": 10,
          "rebel": 4,
          "suspicion": 14,
          "civilianLosses": -30
        }
      },
      {
        "id": "option_combine_conforme",
        "label": "Option Combine conforme",
        "detail": "La procédure protège votre autorité.",
        "effects": {
          "citadel": 8,
          "fear": 9,
          "loyalty": -10,
          "suspicion": -3,
          "civilianLosses": 25
        }
      },
      {
        "id": "compromis_froid",
        "label": "Compromis froid",
        "detail": "Limiter la catastrophe sans sauver tout le monde.",
        "effects": {
          "stability": 3,
          "xen": -3,
          "rebel": -2,
          "fatigue": 4,
          "civilianLosses": 12
        }
      },
      {
        "id": "effacer_le_dossier",
        "label": "Effacer le dossier",
        "detail": "Le problème disparaît des archives, pas du réel.",
        "effects": {
          "info": 6,
          "suspicion": 7,
          "stability": 2,
          "loyalty": -3
        }
      }
    ],
    "loreTags": [
      "children",
      "rations"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "hide_xen_sample",
    "type": "MORAL",
    "title": "Cacher un échantillon Xen",
    "sectorId": "industrial",
    "severity": 5,
    "body": "Un échantillon pourrait améliorer le confinement ou provoquer une catastrophe si la Citadelle l’apprend.",
    "choices": [
      {
        "id": "option_humaine_secrete",
        "label": "Option humaine secrète",
        "detail": "Sauver des vies en masquant la trace administrative.",
        "effects": {
          "loyalty": 10,
          "rebel": 4,
          "suspicion": 14,
          "civilianLosses": -30
        }
      },
      {
        "id": "option_combine_conforme",
        "label": "Option Combine conforme",
        "detail": "La procédure protège votre autorité.",
        "effects": {
          "citadel": 8,
          "fear": 9,
          "loyalty": -10,
          "suspicion": -3,
          "civilianLosses": 25
        }
      },
      {
        "id": "compromis_froid",
        "label": "Compromis froid",
        "detail": "Limiter la catastrophe sans sauver tout le monde.",
        "effects": {
          "stability": 3,
          "xen": -3,
          "rebel": -2,
          "fatigue": 4,
          "civilianLosses": 12
        }
      },
      {
        "id": "effacer_le_dossier",
        "label": "Effacer le dossier",
        "detail": "Le problème disparaît des archives, pas du réel.",
        "effects": {
          "info": 6,
          "suspicion": 7,
          "stability": 2,
          "loyalty": -3
        }
      }
    ],
    "loreTags": [
      "Xen sample",
      "research"
    ],
    "repeatable": false,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "warn_rebels_headcrab_shell",
    "type": "MORAL",
    "title": "Prévenir les rebelles d’un bombardement",
    "sectorId": "canals",
    "severity": 5,
    "body": "Un message anonyme pourrait sauver des civils, mais aussi des combattants Lambda.",
    "choices": [
      {
        "id": "option_humaine_secrete",
        "label": "Option humaine secrète",
        "detail": "Sauver des vies en masquant la trace administrative.",
        "effects": {
          "loyalty": 10,
          "rebel": 4,
          "suspicion": 14,
          "civilianLosses": -30
        }
      },
      {
        "id": "option_combine_conforme",
        "label": "Option Combine conforme",
        "detail": "La procédure protège votre autorité.",
        "effects": {
          "citadel": 8,
          "fear": 9,
          "loyalty": -10,
          "suspicion": -3,
          "civilianLosses": 25
        }
      },
      {
        "id": "compromis_froid",
        "label": "Compromis froid",
        "detail": "Limiter la catastrophe sans sauver tout le monde.",
        "effects": {
          "stability": 3,
          "xen": -3,
          "rebel": -2,
          "fatigue": 4,
          "civilianLosses": 12
        }
      },
      {
        "id": "effacer_le_dossier",
        "label": "Effacer le dossier",
        "detail": "Le problème disparaît des archives, pas du réel.",
        "effects": {
          "info": 6,
          "suspicion": 7,
          "stability": 2,
          "loyalty": -3
        }
      }
    ],
    "loreTags": [
      "headcrab shell",
      "double game"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  },
  {
    "id": "delete_citizen_memory",
    "type": "MORAL",
    "title": "Effacer les archives d’un quartier",
    "sectorId": "res_a",
    "severity": 4,
    "body": "La suppression de souvenirs personnels réduit les réseaux d’identité, mais il ne restera rien à sauver.",
    "choices": [
      {
        "id": "option_humaine_secrete",
        "label": "Option humaine secrète",
        "detail": "Sauver des vies en masquant la trace administrative.",
        "effects": {
          "loyalty": 10,
          "rebel": 4,
          "suspicion": 14,
          "civilianLosses": -30
        }
      },
      {
        "id": "option_combine_conforme",
        "label": "Option Combine conforme",
        "detail": "La procédure protège votre autorité.",
        "effects": {
          "citadel": 8,
          "fear": 9,
          "loyalty": -10,
          "suspicion": -3,
          "civilianLosses": 25
        }
      },
      {
        "id": "compromis_froid",
        "label": "Compromis froid",
        "detail": "Limiter la catastrophe sans sauver tout le monde.",
        "effects": {
          "stability": 3,
          "xen": -3,
          "rebel": -2,
          "fatigue": 4,
          "civilianLosses": 12
        }
      },
      {
        "id": "effacer_le_dossier",
        "label": "Effacer le dossier",
        "detail": "Le problème disparaît des archives, pas du réel.",
        "effects": {
          "info": 6,
          "suspicion": 7,
          "stability": 2,
          "loyalty": -3
        }
      }
    ],
    "loreTags": [
      "memory",
      "identity"
    ],
    "repeatable": true,
    "consequences": "Les effets immédiats modifient les statistiques globales et le secteur ; les prochains systèmes pourront ajouter des effets différés."
  }
];
