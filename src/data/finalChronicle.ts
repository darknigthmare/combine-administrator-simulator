import type { FinalChronicleChapterDefinition, FinalChronicleChapterId, FinalChronicleClassification } from '../types/game';

export const finalChronicleChapterOrder: FinalChronicleChapterId[] = [
  'executive_summary',
  'administration_record',
  'covered_crimes',
  'lost_sectors',
  'nova_prospekt',
  'xen_status',
  'resistance_survivors',
  'citadel_verdict',
  'historical_memory',
];

export const finalChronicleClassifications: Record<FinalChronicleClassification, string> = {
  public: 'Archive publique BreenCast',
  restricted: 'Archive restreinte COAN',
  blacksite: 'Dossier noir Citadel',
  erased: 'Archive à effacement recommandé',
};

export const finalChronicleChapterDefinitions: Record<FinalChronicleChapterId, FinalChronicleChapterDefinition> = {
  executive_summary: {
    id: 'executive_summary',
    title: 'Résumé exécutif de l’administration',
    subtitle: 'Lecture synthétique du mandat City Civil Authority',
    publicHeader: 'La continuité civique a été évaluée selon les standards de stabilité de l’Union Universelle.',
    restrictedHeader: 'Le résumé public masque les coûts humains, biologiques et politiques du mandat.',
    loreTags: ['COAN', 'Civil Authority', 'Citadel'],
  },
  administration_record: {
    id: 'administration_record',
    title: 'Historique administratif',
    subtitle: 'Décisions, doctrines et pression quotidienne',
    publicHeader: 'Les mesures administratives ont été appliquées pour préserver la productivité collective.',
    restrictedHeader: 'Les décisions quotidiennes révèlent la véritable méthode de contrôle : rationnement, surveillance, coercition et falsification.',
    loreTags: ['Directives', 'Rationing', 'Civil Protection'],
  },
  covered_crimes: {
    id: 'covered_crimes',
    title: 'Crimes couverts / pertes classifiées',
    subtitle: 'Écart entre rapport transmis et dossier réel',
    publicHeader: 'Les pertes ont été classées comme incidents de stabilisation ou dommages biologiques non imputables.',
    restrictedHeader: 'Les pertes civiles, disparitions Nova Prospekt et contradictions de rapport constituent le cœur du dossier noir.',
    loreTags: ['Advisor audit', 'falsified reports', 'anti-citizen records'],
  },
  lost_sectors: {
    id: 'lost_sectors',
    title: 'Secteurs perdus ou altérés',
    subtitle: 'Cartographie finale de City',
    publicHeader: 'Les secteurs difficiles ont été reclassés pour raisons sanitaires, logistiques ou anti-citoyennes.',
    restrictedHeader: 'La carte finale montre la vraie frontière entre contrôle Combine, insurrection Lambda et biosphère Xen.',
    loreTags: ['City sectors', 'Quarantine', 'Ravenholm-like'],
  },
  nova_prospekt: {
    id: 'nova_prospekt',
    title: 'Sort de Nova Prospekt',
    subtitle: 'Manifestes Razor Train, Biotics et transferts',
    publicHeader: 'Les transferts externes ont maintenu la continuité productive et la sécurité sanitaire.',
    restrictedHeader: 'Nova Prospekt reste la source principale de peur, de martyr Lambda et de corruption documentaire.',
    loreTags: ['Nova Prospekt', 'Razor Train', 'Biotics'],
  },
  xen_status: {
    id: 'xen_status',
    title: 'Statut biologique Xen',
    subtitle: 'Biosphère, mutations, recherche et catastrophes',
    publicHeader: 'Les anomalies biologiques ont été contenues ou reclassées sous protocole sanitaire.',
    restrictedHeader: 'Xen a laissé une empreinte écologique durable, parfois plus forte que l’autorité civile.',
    loreTags: ['Xen', 'Headcrabs', 'Antlions', 'Barnacles'],
  },
  resistance_survivors: {
    id: 'resistance_survivors',
    title: 'Résistance survivante',
    subtitle: 'Réseau Lambda, factions et mémoire insurgée',
    publicHeader: 'Les éléments anti-citoyens résiduels restent sous observation.',
    restrictedHeader: 'La Résistance survit surtout par routes, récits, familles de disparus, Vortigaunts et failles de propagande.',
    loreTags: ['Lambda', 'canals', 'Vortigaunts'],
  },
  citadel_verdict: {
    id: 'citadel_verdict',
    title: 'Verdict Citadel / Advisor',
    subtitle: 'Jugement supérieur du mandat',
    publicHeader: 'La Citadelle a reçu une synthèse normalisée de la performance administrative.',
    restrictedHeader: 'Le jugement Advisor compare la façade transmise à la vérité COAN.',
    loreTags: ['Citadel', 'Advisor', 'Overwatch'],
  },
  historical_memory: {
    id: 'historical_memory',
    title: 'Mémoire historique de City',
    subtitle: 'Ce que les citoyens, Lambda et les archives retiendront',
    publicHeader: 'La mémoire officielle de City sera conservée selon les besoins de stabilité.',
    restrictedHeader: 'La mémoire réelle survivra dans les tunnels, les familles, les radios Lambda et les zones scellées.',
    loreTags: ['BreenCast', 'civil memory', 'post-verdict'],
  },
};

export const chronicleTransitionLines = [
  'Le dossier suivant est assemblé depuis les journaux COAN, les rapports transmis, les contradictions d’audit et les traces supprimées des secteurs.',
  'La version publique doit rester compatible avec la doctrine BreenCast ; la version restreinte conserve les causes réelles.',
  'Toute lecture non autorisée expose l’opérateur à une reclassification anti-citoyenne.',
];
