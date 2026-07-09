/** Citadel directive tree: permanent doctrine branches imposed by the Combine hierarchy. */
import type { CitadelDirectiveBranch, CitadelDirectiveNode } from '../types/game';

export const citadelDirectiveBranches: CitadelDirectiveBranch[] = [
  {
    id: 'production',
    name: 'Continuité industrielle',
    description: 'Maintenir les chaînes de production, les Razor Trains, les ateliers de réaffectation et les quotas de matériel malgré faim, sabotage et quarantaine.',
    loreLine: 'La Citadelle tolère une population brisée si les indicateurs industriels restent exploitables.',
    colorLabel: 'amber',
  },
  {
    id: 'repression',
    name: 'Répression civique',
    description: 'Renforcer Civil Protection, quotas anti-citoyens, couvre-feux, raids de blocs et transfert des suspects.',
    loreLine: 'Une ville silencieuse n’est pas forcément loyale : elle peut seulement avoir trop peur pour parler.',
    colorLabel: 'red',
  },
  {
    id: 'quarantine',
    name: 'Quarantaine Xen',
    description: 'Protéger les blocs humains exploitables en scellant égouts, hôpitaux, nids headcrab, barnacle bloom et colonies antlion.',
    loreLine: 'Xen n’est pas une faction. C’est une pression biologique qui transforme la géographie en organisme.',
    colorLabel: 'green',
  },
  {
    id: 'propaganda',
    name: 'BreenCast / doctrine civique',
    description: 'Transformer rationnement, transferts, audits et pertes civiles en récit de stabilité rationnelle.',
    loreLine: 'Le langage administratif est une arme : nommer une disparition “réaffectation” retarde la panique.',
    colorLabel: 'blue',
  },
  {
    id: 'nova',
    name: 'Nova Prospekt',
    description: 'Développer les transferts, interrogatoires, dossiers silencieux, Biotics, conversion et effacement documentaire.',
    loreLine: 'Nova Prospekt n’est pas seulement une prison : c’est une machine à extraire peur, information et obéissance.',
    colorLabel: 'white',
  },
  {
    id: 'transhuman',
    name: 'Transhuman Arm',
    description: 'Préparer candidats, protocoles Overwatch, suppressors, ordinals et rendement militaire des corps réaffectés.',
    loreLine: 'L’Union Universelle ne recrute pas des soldats : elle reconfigure des restes humains utiles.',
    colorLabel: 'cyan',
  },
  {
    id: 'biocontrol',
    name: 'Contrôle biologique',
    description: 'Exploiter headcrabs, antlion extract, spores, spécimens, confinement parasite et armes biologiques sous supervision.',
    loreLine: 'Utiliser Xen contre Lambda revient à ouvrir une porte dans une pièce déjà en feu.',
    colorLabel: 'violet',
  },
  {
    id: 'advisor',
    name: 'Supervision Advisor',
    description: 'Réduire la marge de mensonge, améliorer transmission, conformité et capacité de survie sous audit direct.',
    loreLine: 'Un Advisor ne demande pas la vérité par morale. Il demande une carte précise de ce qu’il peut posséder.',
    colorLabel: 'cold',
  },
];

export const citadelDirectiveNodes: CitadelDirectiveNode[] = [
  // Production
  { id: 'prod_quota_ration_link', branchId: 'production', tier: 1, title: 'Quota-ration coupling', body: 'Lier rations prioritaires aux blocs productifs pour préserver rendement et obéissance ouvrière.', cost: { rations: 120, citadel: 2 }, effects: { production: 7, loyalty: -3, fatigue: 3 }, dailyEffects: { production: 1 }, advisorRisk: 4, unlocks: ['Rationnement ouvrier renforcé'], prerequisites: [] },
  { id: 'prod_razor_manifest', branchId: 'production', tier: 2, title: 'Razor Train manifest lock', body: 'Verrouiller les manifestes ferroviaires contre sabotage Lambda et détournement de rations.', cost: { info: 4 }, effects: { production: 5, rebel: -4, info: 4 }, dailyEffects: { rebel: -1 }, advisorRisk: 6, unlocks: ['Contrôle des nœuds Razor Train'], prerequisites: ['prod_quota_ration_link'] },
  { id: 'prod_forced_shift', branchId: 'production', tier: 3, title: 'Cycles de travail forcés', body: 'Étendre les rotations industrielles sous supervision CP malgré fatigue civile.', cost: { loyalty: 5 }, effects: { production: 10, fatigue: 8, rebel: 4 }, dailyEffects: { production: 2, fatigue: 1 }, advisorRisk: 8, unlocks: ['Production de crise'], prerequisites: ['prod_razor_manifest'] },
  { id: 'prod_citadel_priority', branchId: 'production', tier: 4, title: 'Priorité matérielle Citadel', body: 'Sacrifier les besoins civils pour maintenir flux d’énergie, pièces et transfert vers la Citadelle.', cost: { rations: 260, loyalty: 6 }, effects: { citadel: 10, production: 8, fear: 4 }, dailyEffects: { citadel: 1, loyalty: -1 }, advisorRisk: 12, unlocks: ['Tolérance aux pertes civiles industrielles'], prerequisites: ['prod_forced_shift'] },
  { id: 'prod_model_city', branchId: 'production', tier: 5, title: 'City modèle productive', body: 'Présenter la ville comme nœud d’exploitation exemplaire auprès du haut commandement.', cost: { info: 8, production: 4 }, effects: { citadel: 14, suspicion: -6, production: 6 }, dailyEffects: { suspicion: -1 }, advisorRisk: 16, unlocks: ['Fin Ville modèle facilitée'], prerequisites: ['prod_citadel_priority'] },

  // Repression
  { id: 'rep_block_curfew', branchId: 'repression', tier: 1, title: 'Couvre-feu par bloc', body: 'Normaliser couvre-feux, fouilles et suspension de déplacement dans les blocs instables.', cost: { combine: 2 }, effects: { rebel: -6, fear: 6, loyalty: -4 }, dailyEffects: { rebel: -1, fear: 1 }, advisorRisk: 5, unlocks: ['Couvre-feu sectoriel renforcé'], prerequisites: [] },
  { id: 'rep_anti_citizen_quota', branchId: 'repression', tier: 2, title: 'Quotas anti-citoyens', body: 'Imposer objectifs d’arrestations CP pour produire des résultats visibles.', cost: { loyalty: 4 }, effects: { rebel: -7, fear: 8, fatigue: 5, suspicion: 2 }, dailyEffects: { fear: 1, loyalty: -1 }, advisorRisk: 8, unlocks: ['Arrestations quota CP'], prerequisites: ['rep_block_curfew'] },
  { id: 'rep_collective_punishment', branchId: 'repression', tier: 3, title: 'Punition collective', body: 'Répondre aux actes Lambda par rations suspendues, contrôles et humiliation de bloc.', cost: { loyalty: 8 }, effects: { rebel: -10, fear: 12, fatigue: 8 }, dailyEffects: { rebel: -1, fatigue: 1 }, advisorRisk: 12, unlocks: ['Répression exemplaire'], prerequisites: ['rep_anti_citizen_quota'] },
  { id: 'rep_overwatch_legalese', branchId: 'repression', tier: 4, title: 'Mandat Overwatch permanent', body: 'Donner couverture administrative aux déploiements militaires dans zones civiles.', cost: { citadel: 3 }, effects: { combine: 8, rebel: -12, civilianLosses: 35, suspicion: 4 }, dailyEffects: { combine: 1, rebel: -1 }, advisorRisk: 15, unlocks: ['Escalade Overwatch banalisée'], prerequisites: ['rep_collective_punishment'] },
  { id: 'rep_strider_ordinance', branchId: 'repression', tier: 5, title: 'Ordonnance Strider', body: 'Autoriser usage Strider pour briser insurrections de quartier avant coordination Lambda.', cost: { combine: 4 }, effects: { rebel: -18, fear: 18, stability: -5, civilianLosses: 80 }, dailyEffects: { rebel: -2, fear: 1 }, advisorRisk: 20, unlocks: ['Domination urbaine lourde'], prerequisites: ['rep_overwatch_legalese'] },

  // Quarantine
  { id: 'qua_sewer_seal', branchId: 'quarantine', tier: 1, title: 'Scellement collecteurs', body: 'Cartographier et sceller accès égouts utilisés par Xen et Lambda.', cost: { production: 2 }, effects: { xen: -6, rebel: -3 }, dailyEffects: { xen: -1 }, advisorRisk: 4, unlocks: ['Égouts sous protocole biologique'], prerequisites: [] },
  { id: 'qua_headcrab_burnline', branchId: 'quarantine', tier: 2, title: 'Ligne de brûlage headcrab', body: 'Créer zones de feu contrôlé pour parasites et zombies avant propagation résidentielle.', cost: { rations: 90 }, effects: { xen: -9, civilianLosses: 20, fear: 5 }, dailyEffects: { xen: -1 }, advisorRisk: 7, unlocks: ['Purge headcrab contrôlée'], prerequisites: ['qua_sewer_seal'] },
  { id: 'qua_barnacle_sweep', branchId: 'quarantine', tier: 3, title: 'Sweep Barnacle', body: 'Nettoyer passages verticaux, tunnels et hôpitaux infestés de prédateurs fixes.', cost: { combine: 2 }, effects: { xen: -8, combineLosses: 4, stability: 3 }, dailyEffects: { xen: -1, stability: 1 }, advisorRisk: 9, unlocks: ['Sécurité des tunnels'], prerequisites: ['qua_headcrab_burnline'] },
  { id: 'qua_antlion_vibration', branchId: 'quarantine', tier: 4, title: 'Contrôle vibratoire antlion', body: 'Réduire activités industrielles périphériques qui attirent colonies antlion.', cost: { production: 5 }, effects: { xen: -14, production: -5, stability: 4 }, dailyEffects: { xen: -2 }, advisorRisk: 13, unlocks: ['Barrières périphériques antlion'], prerequisites: ['qua_barnacle_sweep'] },
  { id: 'qua_total_lock', branchId: 'quarantine', tier: 5, title: 'Quarantaine hermétique', body: 'Sceller définitivement zones perdues, même avec civils encore présents.', cost: { loyalty: 10 }, effects: { xen: -22, fear: 10, civilianLosses: 120, suspicion: 4 }, dailyEffects: { xen: -2, loyalty: -1 }, advisorRisk: 18, unlocks: ['Sauvetage de City au prix des blocs condamnés'], prerequisites: ['qua_antlion_vibration'] },

  // Propaganda
  { id: 'pro_civic_continuity', branchId: 'propaganda', tier: 1, title: 'Continuité civique', body: 'Présenter la soumission comme seule forme rationnelle de survie post-Guerre de Sept Heures.', cost: { info: 2 }, effects: { info: 8, loyalty: 3, fear: 2 }, dailyEffects: { info: 1 }, advisorRisk: 3, unlocks: ['BreenCast de stabilité'], prerequisites: [] },
  { id: 'pro_anti_citizen_label', branchId: 'propaganda', tier: 2, title: 'Lexique anti-citoyen', body: 'Isoler Lambda par vocabulaire administratif : malcontents, parasites sociaux, risques de bloc.', cost: { loyalty: 2 }, effects: { info: 7, rebel: -4, fear: 4 }, dailyEffects: { info: 1, rebel: -1 }, advisorRisk: 5, unlocks: ['Contre-propagande Lambda réduite'], prerequisites: ['pro_civic_continuity'] },
  { id: 'pro_sanitary_mask', branchId: 'propaganda', tier: 3, title: 'Masque sanitaire', body: 'Dissimuler Xen, transferts et pertes sous vocabulaire médical et préservation collective.', cost: { info: 4 }, effects: { info: 9, xen: -2, suspicion: 5 }, dailyEffects: { fear: -1, suspicion: 1 }, advisorRisk: 8, unlocks: ['Justification des quarantaines'], prerequisites: ['pro_anti_citizen_label'] },
  { id: 'pro_ration_merit', branchId: 'propaganda', tier: 4, title: 'Mérite rationnaire', body: 'Transformer la faim en récompense civique, dénonciation et productivité.', cost: { rations: 80 }, effects: { info: 8, rations: 120, loyalty: -4 }, dailyEffects: { info: 1, fatigue: 1 }, advisorRisk: 11, unlocks: ['Rations comme langage politique'], prerequisites: ['pro_sanitary_mask'] },
  { id: 'pro_model_narrative', branchId: 'propaganda', tier: 5, title: 'Narratif City modèle', body: 'Synchroniser BreenCast, rapports falsifiés et statistiques pour vendre une stabilité fabriquée.', cost: { suspicion: 4 }, effects: { info: 12, citadel: 5, suspicion: 10 }, dailyEffects: { info: 2 }, advisorRisk: 17, unlocks: ['Couverture des rapports falsifiés'], prerequisites: ['pro_ration_merit'] },

  // Nova
  { id: 'nova_intake_manifest', branchId: 'nova', tier: 1, title: 'Manifeste Intake', body: 'Normaliser flux Razor Train de suspects, contaminés et témoins vers Nova Prospekt.', cost: { rations: 70 }, effects: { fear: 6, rebel: -4, suspicion: 4 }, dailyEffects: { fear: 1 }, advisorRisk: 5, unlocks: ['Transferts documentés Nova Prospekt'], prerequisites: [] },
  { id: 'nova_interrogation_sync', branchId: 'nova', tier: 2, title: 'Synchronisation interrogatoire', body: 'Relier dossiers informateurs, registre civil et interrogatoires pour exposer cellules Lambda.', cost: { info: 3 }, effects: { info: 8, rebel: -7, loyalty: -4 }, dailyEffects: { info: 1, rebel: -1 }, advisorRisk: 9, unlocks: ['Interrogatoire croisé Lambda'], prerequisites: ['nova_intake_manifest'] },
  { id: 'nova_biotics_pressure', branchId: 'nova', tier: 3, title: 'Pression Biotics', body: 'Exploiter Vortigaunts capturés pour quarantaine et renseignement biologique.', cost: { citadel: 2 }, effects: { xen: -6, info: 4, suspicion: 6 }, dailyEffects: { xen: -1, suspicion: 1 }, advisorRisk: 12, unlocks: ['Biotics sous contrainte'], prerequisites: ['nova_interrogation_sync'] },
  { id: 'nova_silent_disappearances', branchId: 'nova', tier: 4, title: 'Disparitions silencieuses', body: 'Effacer liens administratifs entre arrestations locales et transferts vers Nova Prospekt.', cost: { info: 6 }, effects: { rebel: -10, suspicion: 12, loyalty: -8, fear: 8 }, dailyEffects: { rebel: -1, suspicion: 1 }, advisorRisk: 16, unlocks: ['Dossiers effacés'], prerequisites: ['nova_biotics_pressure'] },
  { id: 'nova_conversion_pipeline', branchId: 'nova', tier: 5, title: 'Pipeline conversion', body: 'Préparer candidats utiles pour programmes transhumains et unités Overwatch.', cost: { civilianLosses: 50 }, effects: { combine: 12, citadel: 7, rebel: -8, suspicion: 8 }, dailyEffects: { combine: 1 }, advisorRisk: 20, unlocks: ['Candidats Transhuman Arm'], prerequisites: ['nova_silent_disappearances'] },

  // Transhuman
  { id: 'tra_candidate_screening', branchId: 'transhuman', tier: 1, title: 'Screening candidats', body: 'Identifier sujets utiles parmi CP, suspects, collaborateurs et détenus.', cost: { info: 3 }, effects: { combine: 5, suspicion: 2 }, dailyEffects: { combine: 1 }, advisorRisk: 5, unlocks: ['Candidats Overwatch repérés'], prerequisites: [] },
  { id: 'tra_ordinal_command', branchId: 'transhuman', tier: 2, title: 'Doctrine Ordinal', body: 'Améliorer coordination tactique des unités transhumaines dans les secteurs mixtes.', cost: { citadel: 2 }, effects: { combine: 7, rebel: -5 }, dailyEffects: { rebel: -1 }, advisorRisk: 8, unlocks: ['Commandement Ordinal'], prerequisites: ['tra_candidate_screening'] },
  { id: 'tra_suppressor_grid', branchId: 'transhuman', tier: 3, title: 'Suppressor Grid', body: 'Créer doctrine de suppression de barricades sans dépendre uniquement des Striders.', cost: { rations: 100 }, effects: { rebel: -9, fear: 5, combine: 5 }, dailyEffects: { rebel: -1 }, advisorRisk: 11, unlocks: ['Suppressors priorisés'], prerequisites: ['tra_ordinal_command'] },
  { id: 'tra_memory_scrub', branchId: 'transhuman', tier: 4, title: 'Memory scrub protocol', body: 'Réduire instabilité des candidats via effacement et réassignation documentaire.', cost: { suspicion: 3 }, effects: { combine: 8, loyalty: -5, citadel: 4 }, dailyEffects: { combine: 1, loyalty: -1 }, advisorRisk: 15, unlocks: ['Effacement identitaire'], prerequisites: ['tra_suppressor_grid'] },
  { id: 'tra_city_garrison', branchId: 'transhuman', tier: 5, title: 'Garrison transhumanisée', body: 'City devient banc d’essai de garnison Overwatch permanente.', cost: { production: 4 }, effects: { combine: 15, rebel: -15, fear: 12, civilianLosses: 40 }, dailyEffects: { combine: 2, rebel: -1 }, advisorRisk: 22, unlocks: ['Occupation militaire permanente'], prerequisites: ['tra_memory_scrub'] },

  // Biocontrol
  { id: 'bio_specimen_registry', branchId: 'biocontrol', tier: 1, title: 'Registre spécimens Xen', body: 'Cataloguer parasites, spores et biomasse au lieu de seulement brûler les zones.', cost: { info: 2 }, effects: { xen: -3, info: 5, suspicion: 2 }, dailyEffects: { xen: -1 }, advisorRisk: 5, unlocks: ['Codex biologique opérationnel'], prerequisites: [] },
  { id: 'bio_antlion_extract', branchId: 'biocontrol', tier: 2, title: 'Antlion extract harvest', body: 'Exploiter extract et colonies périphériques sous contrôle militarisé.', cost: { combine: 2 }, effects: { production: 5, xen: 4, citadel: 4 }, dailyEffects: { production: 1, xen: 1 }, advisorRisk: 10, unlocks: ['Exploitation Antlion risquée'], prerequisites: ['bio_specimen_registry'] },
  { id: 'bio_headcrab_denial', branchId: 'biocontrol', tier: 3, title: 'Headcrab denial doctrine', body: 'Retourner la menace parasite contre itinéraires Lambda en gardant un seuil de confinement.', cost: { loyalty: 4 }, effects: { rebel: -12, xen: 8, civilianLosses: 60, suspicion: 6 }, dailyEffects: { rebel: -1, xen: 1 }, advisorRisk: 14, unlocks: ['Arme biologique contrôlée'], prerequisites: ['bio_antlion_extract'] },
  { id: 'bio_spore_quarantine', branchId: 'biocontrol', tier: 4, title: 'Spore quarantine lattice', body: 'Installer réseau de sas et filtres biologiques dans hôpitaux, égouts et secteurs humides.', cost: { rations: 160, production: 3 }, effects: { xen: -12, stability: 5, production: -3 }, dailyEffects: { xen: -2 }, advisorRisk: 15, unlocks: ['Filtration Xen'], prerequisites: ['bio_headcrab_denial'] },
  { id: 'bio_contained_shell', branchId: 'biocontrol', tier: 5, title: 'Headcrab Shell contained use', body: 'Autoriser usage limité et documenté de headcrab shells contre poches Lambda extrêmes.', cost: { citadel: 4 }, effects: { rebel: -20, xen: 12, fear: 20, civilianLosses: 150, suspicion: 12 }, dailyEffects: { fear: 1, xen: 1 }, advisorRisk: 25, unlocks: ['Ravenholm-like risk'], prerequisites: ['bio_spore_quarantine'] },

  // Advisor
  { id: 'adv_clean_metrics', branchId: 'advisor', tier: 1, title: 'Métriques propres', body: 'Aligner dossier réel, transmission Citadel et indices COAN pour réduire contradictions auditables.', cost: { info: 4 }, effects: { suspicion: -6, citadel: 4 }, dailyEffects: { suspicion: -1 }, advisorRisk: 4, unlocks: ['Audit plus tolérant'], prerequisites: [] },
  { id: 'adv_controlled_truth', branchId: 'advisor', tier: 2, title: 'Vérité contrôlée', body: 'Transmettre assez de mauvaises nouvelles pour rendre les mensonges crédibles.', cost: { citadel: 2 }, effects: { suspicion: -8, info: 5, fear: 2 }, dailyEffects: { suspicion: -1 }, advisorRisk: 6, unlocks: ['Falsification plus stable'], prerequisites: ['adv_clean_metrics'] },
  { id: 'adv_inspection_route', branchId: 'advisor', tier: 3, title: 'Route inspection Advisor', body: 'Préparer secteurs vitrines et masquer blocs perdus derrière urgence sanitaire.', cost: { rations: 120, info: 4 }, effects: { citadel: 8, suspicion: -5, loyalty: -3 }, dailyEffects: { citadel: 1 }, advisorRisk: 10, unlocks: ['Inspection scénarisée'], prerequisites: ['adv_controlled_truth'] },
  { id: 'adv_sacrifice_report', branchId: 'advisor', tier: 4, title: 'Rapport de sacrifice', body: 'Offrir un échec local et un responsable sacrifiable pour protéger l’administration centrale.', cost: { combine: 4 }, effects: { suspicion: -14, citadel: 6 }, dailyEffects: { suspicion: -1, citadel: 1 }, advisorRisk: 14, unlocks: ['Fusible administratif'], prerequisites: ['adv_inspection_route'] },
  { id: 'adv_direct_rule', branchId: 'advisor', tier: 5, title: 'Co-gouvernance Advisor', body: 'Accepter supervision quasi directe pour survivre politiquement au prix de toute autonomie.', cost: { loyalty: 10 }, effects: { citadel: 18, suspicion: -18, fear: 15, stability: 4 }, dailyEffects: { citadel: 2, fear: 1 }, advisorRisk: 22, unlocks: ['Survie sous possession administrative'], prerequisites: ['adv_sacrifice_report'] },
];
