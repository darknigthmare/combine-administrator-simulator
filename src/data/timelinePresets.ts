import type { Stats, TimelinePreset } from '../types/game';

/**
 * Canonical-era modifiers.
 * The timeline is deliberately separated from scenario presets:
 * - scenario = current operational crisis in this City
 * - timeline = where the City sits inside the Half-Life chronology
 */
export const timelinePresets: Record<string, TimelinePreset> = {
  seven_hour_aftermath: {
    id: 'seven_hour_aftermath',
    name: 'Après la Guerre de Sept Heures',
    subtitle: 'Occupation fraîche, humanité traumatisée, Résistance embryonnaire.',
    canonWindow: 'Immédiatement après la capitulation de la Terre face à l’Union Universelle.',
    briefing:
      'Les infrastructures humaines sont brisées, la population est sidérée et les premiers administrateurs civils apprennent à traduire les ordres Combine en procédures humaines. La Résistance existe surtout sous forme de survivants, de scientifiques dispersés et de premiers refus silencieux.',
    statEffects: { stability: -8, loyalty: -14, fear: 22, rebel: -10, xen: 6, combine: 18, production: -20, rations: -420, citadel: 8, info: 10, fatigue: 14, suspicion: -6 },
    dailyEffects: { production: -1, fatigue: 2, rebel: 1 },
    sectorEffects: [
      { sectorIds: ['station', 'admin', 'industrial', 'rail'], infrastructure: -18, fear: 15, surveillance: 18, status: 'Surveillé' },
      { sectorIds: ['canals', 'sewers', 'periphery'], rebel: 8, xen: 6, loyalty: -8 },
      { sectorIds: ['citadel'], surveillance: 22, fear: 18, status: 'Contrôle Combine total' },
    ],
    unitReserveOverrides: { strider: 1, hunter: 0, advisor: 1, grunt: 4, soldier: 3, elite: 1, scanner: 6, cp: 10 },
    directiveBias: ['production', 'loyalty', 'info'],
    eventBias: { rebellion: 0.65, xen: 0.9, citadel: 1.25, civil: 1.25, moral: 1.05 },
    availabilityNotes: ['Protection Civile encore en consolidation.', 'Peu de cellules Lambda structurées.', 'Citadelle priorise inventaire humain, rations et pacification.'],
    unlocks: ['Premiers recensements civiques', 'Réaffectations massives', 'Occupation militaire visible'],
  },
  early_occupation: {
    id: 'early_occupation',
    name: 'Occupation consolidée',
    subtitle: 'La bureaucratie Combine remplace progressivement les anciennes institutions.',
    canonWindow: 'Années suivant la Guerre de Sept Heures, avant les événements d’Alyx.',
    briefing:
      'La ville a cessé de ressembler à une zone de guerre ouverte. Les postes Civil Protection, les terminaux de rationnement, les logements assignés et les annonces publiques installent une normalité forcée.',
    statEffects: { stability: 8, loyalty: -8, fear: 12, rebel: 4, xen: 2, combine: 12, production: 5, rations: -120, citadel: 6, info: 12, fatigue: 8 },
    dailyEffects: { fatigue: 1, rebel: 1, info: 1 },
    sectorEffects: [
      { sectorIds: ['res_a', 'res_b', 'industrial'], surveillance: 12, fear: 9, loyalty: -8, status: 'Surveillé' },
      { sectorIds: ['canals', 'sewers'], rebel: 10, surveillance: -6 },
      { sectorIds: ['quarantine', 'hospital'], xen: 5, status: 'Contaminé' },
    ],
    unitReserveOverrides: { cp: 14, scanner: 8, manhack: 6, grunt: 5, soldier: 4, suppressor: 1, ordinal: 1, strider: 1 },
    directiveBias: ['info', 'rations', 'production'],
    eventBias: { rebellion: 0.9, xen: 0.9, citadel: 1.1, civil: 1.2, moral: 1 },
    availabilityNotes: ['Rationnement et logements assignés pleinement actifs.', 'Résistance encore fragmentée.', 'Premiers transferts réguliers vers complexes externes.'],
    unlocks: ['BreenCast local constant', 'Checkpoints étendus', 'Marché noir naissant'],
  },
  alyx_era: {
    id: 'alyx_era',
    name: 'Période Half-Life: Alyx',
    subtitle: 'Résistance précoce, Quarantine Zone active, technologies Combine en surveillance rapprochée.',
    canonWindow: 'Quelques années avant l’arrivée de Gordon Freeman à City 17.',
    briefing:
      'Les citoyens savent déjà comment survivre entre raids, rationnement, tunnels et rumeurs de Vortigaunts. Les quarantaines urbaines et les incidents Xen deviennent un langage administratif courant.',
    statEffects: { stability: -4, loyalty: -6, fear: 10, rebel: 12, xen: 16, combine: 10, production: -6, rations: -180, citadel: 4, info: 8, fatigue: 12, suspicion: 4 },
    dailyEffects: { xen: 1, rebel: 1, fatigue: 1 },
    sectorEffects: [
      { sectorIds: ['quarantine', 'hospital', 'sewers', 'periphery'], xen: 20, infrastructure: -14, status: 'En quarantaine' },
      { sectorIds: ['canals', 'res_b', 'periphery'], rebel: 16, loyalty: -6 },
      { sectorIds: ['station', 'admin'], surveillance: 14, fear: 8 },
    ],
    unitReserveOverrides: { grunt: 8, ordinal: 2, suppressor: 2, bioquarantine: 5, scanner: 10, manhack: 7, advisor: 1 },
    directiveBias: ['xen', 'info', 'rebel'],
    eventBias: { rebellion: 1.15, xen: 1.35, citadel: 1.05, civil: 1.05, moral: 1.15 },
    availabilityNotes: ['Quarantine Zone politiquement sensible.', 'Grunts/Ordinals/Suppressors plus présents.', 'Biotics et Vortigaunts deviennent des dossiers à haute valeur.'],
    unlocks: ['Quarantine Zone étendue', 'Interventions Grunt/Ordinal', 'Dossiers Vortigaunt sensibles'],
  },
  pre_hl2: {
    id: 'pre_hl2',
    name: 'Pré-Half-Life 2',
    subtitle: 'City sous contrôle apparent, Résistance clandestine mais organisée.',
    canonWindow: 'Juste avant le retour de Gordon Freeman.',
    briefing:
      'Les écrans publics, le rationnement et les patrouilles donnent une impression d’ordre. Sous la surface, les canaux, laboratoires cachés et safehouses Lambda sont déjà capables de faire circuler personnes, armes et informations.',
    statEffects: { stability: 10, loyalty: -10, fear: 12, rebel: 18, xen: 8, combine: 14, production: 4, rations: -80, citadel: 7, info: 10, fatigue: 12, suspicion: 2 },
    dailyEffects: { rebel: 1, fatigue: 1 },
    sectorEffects: [
      { sectorIds: ['station', 'admin', 'citadel'], surveillance: 18, fear: 10, status: 'Surveillé' },
      { sectorIds: ['canals', 'sewers', 'res_b', 'hospital'], rebel: 20, loyalty: -10 },
      { sectorIds: ['quarantine'], xen: 12, status: 'En quarantaine' },
    ],
    unitReserveOverrides: { cp: 16, soldier: 7, elite: 2, scanner: 10, manhack: 8, strider: 2, gunship: 1, dropship: 2 },
    directiveBias: ['rebel', 'loyalty', 'info'],
    eventBias: { rebellion: 1.25, xen: 1, citadel: 1.1, civil: 1, moral: 1.1 },
    availabilityNotes: ['Réseau Lambda organisé mais discret.', 'Civil Protection omniprésente.', 'La gare et les canaux sont des points sensibles.'],
    unlocks: ['Réseau Lambda dormant', 'Canaux stratégiques', 'Contrôle ferroviaire Razor Train'],
  },
  hl2_arrival: {
    id: 'hl2_arrival',
    name: 'Arrivée de Gordon Freeman',
    subtitle: 'L’anomalie humaine déclenche instabilité, panique administrative et mobilisation Overwatch.',
    canonWindow: 'Début de Half-Life 2, autour du retour de Freeman à City 17.',
    briefing:
      'Un individu anormalement résilient rompt la routine de contrôle. Les rapports se contredisent, la Résistance s’agite et Overwatch exige des réponses immédiates sans comprendre l’ampleur du symbole qui vient d’apparaître.',
    statEffects: { stability: -14, loyalty: 2, fear: 8, rebel: 26, xen: 8, combine: 18, production: -8, rations: -120, citadel: -2, info: -8, fatigue: 12, suspicion: 16 },
    dailyEffects: { rebel: 2, suspicion: 2, production: -1 },
    sectorEffects: [
      { sectorIds: ['station', 'canals', 'sewers'], rebel: 28, surveillance: 16, fear: 12, status: 'Zone de combat' },
      { sectorIds: ['admin', 'citadel'], surveillance: 25, fear: 16, status: 'Contrôle Combine total' },
      { sectorIds: ['res_a', 'res_b'], rebel: 16, loyalty: 8 },
    ],
    unitReserveOverrides: { cp: 18, soldier: 9, elite: 3, scanner: 12, manhack: 10, strider: 3, gunship: 2, dropship: 3, advisor: 1 },
    directiveBias: ['rebel', 'info', 'stability'],
    eventBias: { rebellion: 1.55, xen: 0.95, citadel: 1.35, civil: 1, moral: 1.2 },
    availabilityNotes: ['Freeman n’est pas contrôlable par l’administration locale.', 'Les canaux deviennent route d’évasion prioritaire.', 'Overwatch exige résultats rapides.'],
    unlocks: ['Alerte anti-citizen majeure', 'Canaux en chasse active', 'Soutien Overwatch renforcé'],
  },
  post_nova_prospekt: {
    id: 'post_nova_prospekt',
    name: 'Après Nova Prospekt',
    subtitle: 'La peur des transferts devient colère ouverte, la ville bascule vers le soulèvement.',
    canonWindow: 'Après la rupture politique et symbolique liée à Nova Prospekt.',
    briefing:
      'Le mythe d’un ordre administratif stable se fissure. Les familles relient les disparitions, les détenus, les Biotics et les mensonges. Les citoyens ordinaires commencent à devenir logistique rebelle.',
    statEffects: { stability: -22, loyalty: 8, fear: -4, rebel: 38, xen: 12, combine: 14, production: -16, rations: -260, citadel: -8, info: -12, fatigue: 18, suspicion: 24 },
    dailyEffects: { rebel: 3, suspicion: 2, stability: -1, production: -1 },
    sectorEffects: [
      { sectorIds: ['res_a', 'res_b', 'industrial', 'canals', 'rail'], rebel: 34, loyalty: 12, status: 'Insurgé' },
      { sectorIds: ['admin', 'citadel'], surveillance: 28, fear: 18, status: 'Contrôle Combine total' },
      { sectorIds: ['quarantine', 'hospital'], xen: 12, infrastructure: -8 },
    ],
    unitReserveOverrides: { cp: 12, soldier: 10, elite: 4, suppressor: 4, strider: 4, hunter: 2, gunship: 3, dropship: 4, advisor: 2 },
    directiveBias: ['rebel', 'stability', 'citadel'],
    eventBias: { rebellion: 1.85, xen: 1.05, citadel: 1.45, civil: 1.15, moral: 1.4 },
    availabilityNotes: ['Nova Prospekt devient un foyer narratif majeur.', 'Les disparitions ne peuvent plus être totalement cachées.', 'Soulèvement local probable.'],
    unlocks: ['Émeutes de détenus', 'Martyrs anti-citoyens', 'Réponse Strider/Gunship'],
  },
  uprising: {
    id: 'uprising',
    name: 'Uprising / guerre urbaine',
    subtitle: 'Les citoyens ne sont plus seulement administrés : ils se battent dans les rues.',
    canonWindow: 'Période d’insurrection ouverte de Half-Life 2 et Episodes.',
    briefing:
      'La City n’est plus une machine d’obéissance mais un champ de bataille vertical : barricades, tirs de suppression, Striders, routes aériennes, tunnels effondrés, citoyens armés et derniers ordres paniqués de la Citadelle.',
    statEffects: { stability: -36, loyalty: 18, fear: 6, rebel: 56, xen: 18, combine: 22, production: -34, rations: -520, citadel: -18, info: -22, fatigue: 28, suspicion: 18, civilianLosses: 120, combineLosses: 30 },
    dailyEffects: { rebel: 3, xen: 1, production: -2, civilianLosses: 20, combineLosses: 6 },
    sectorEffects: [
      { sectorIds: ['res_a', 'res_b', 'industrial', 'canals', 'rail', 'periphery'], rebel: 45, infrastructure: -20, status: 'Zone de combat' },
      { sectorIds: ['citadel', 'admin'], surveillance: 35, fear: 25, status: 'Contrôle Combine total' },
      { sectorIds: ['quarantine', 'sewers', 'periphery'], xen: 20, status: 'Infesté' },
    ],
    unitReserveOverrides: { cp: 8, soldier: 12, elite: 5, suppressor: 5, strider: 5, hunter: 4, gunship: 4, dropship: 5, advisor: 2, bioquarantine: 2 },
    directiveBias: ['rebel', 'stability', 'citadel'],
    eventBias: { rebellion: 2, xen: 1.2, citadel: 1.6, civil: 1.25, moral: 1.55 },
    availabilityNotes: ['La Résistance agit comme force urbaine ouverte.', 'Striders et Gunships deviennent politiquement ordinaires.', 'Les pertes civiles sont structurelles.'],
    unlocks: ['Barricades rebelles', 'Déploiement Strider massif', 'Guerre de rues'],
  },
  citadel_collapse: {
    id: 'citadel_collapse',
    name: 'Effondrement local de la Citadelle',
    subtitle: 'La hiérarchie Combine se fragmente, Xen et Résistance exploitent le vide.',
    canonWindow: 'Période post-effondrement local / scénario étendu compatible Episodes.',
    briefing:
      'Le signal d’autorité n’est plus continu. Les unités obéissent à des directives contradictoires, les Advisors priorisent leur survie, les secteurs scellés s’ouvrent mal, et la biosphère Xen regagne des interstices.',
    statEffects: { stability: -44, loyalty: 22, fear: -10, rebel: 64, xen: 30, combine: -18, production: -42, rations: -650, citadel: -48, info: -30, fatigue: 34, suspicion: -10, civilianLosses: 180, combineLosses: 90 },
    dailyEffects: { xen: 2, rebel: 2, citadel: -2, production: -2, civilianLosses: 28, combineLosses: 10 },
    sectorEffects: [
      { sectorIds: ['citadel', 'admin'], infrastructure: -38, surveillance: -18, status: 'Zone de combat' },
      { sectorIds: ['quarantine', 'sewers', 'hospital', 'periphery'], xen: 32, infrastructure: -18, status: 'Infesté' },
      { sectorIds: ['res_a', 'res_b', 'canals', 'industrial'], rebel: 42, loyalty: 18, status: 'Contrôle rebelle' },
    ],
    unitReserveOverrides: { cp: 4, soldier: 6, elite: 2, suppressor: 2, strider: 2, hunter: 3, gunship: 1, dropship: 2, advisor: 1, bioquarantine: 1 },
    directiveBias: ['citadel', 'xen', 'stability'],
    eventBias: { rebellion: 1.7, xen: 1.8, citadel: 1.8, civil: 1.35, moral: 1.7 },
    availabilityNotes: ['Autorité centrale intermittente.', 'Unités Combine rares ou en retraite.', 'Xen peut devenir plus dangereux que la Résistance.'],
    unlocks: ['Directives contradictoires', 'Évacuation Advisor', 'Secteurs sans maître'],
  },
};

export const timelineOrder = Object.keys(timelinePresets) as Array<keyof typeof timelinePresets>;
