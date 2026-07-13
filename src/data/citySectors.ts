/** Base city state and connected strategic map lore data.
 *
 * Step 2 turns City into a real topology: every sector has coordinates and explicit routes.
 * Connections are one-way in data only for readability; the UI/systems normalize them as undirected links.
 */
import type { Sector, Stats } from '../types/game';

export const baseStats: Stats = {
  stability: 58,
  loyalty: 27,
  fear: 61,
  rebel: 24,
  xen: 13,
  combine: 54,
  production: 62,
  rations: 1650,
  citadel: 78,
  info: 57,
  fatigue: 38,
  civilianLosses: 0,
  combineLosses: 0,
  suspicion: 18,
};

export const baseSectors: Sector[] = [
  {
    id: 'station', name: 'Gare de transit', zone: 'Infrastructure', x: 18, y: 22, strategicValue: 88, chokePoint: true,
    role: 'Tri des citoyens, trains de relocalisation, contrôle des arrivants.', population: 2800, status: 'Surveillé', rebel: 22, xen: 2, surveillance: 73, infrastructure: 74, loyalty: 24, fear: 66, units: { cp: 8, scanner: 2 },
    notes: 'Secteur sensible : tout incident ferroviaire se propage politiquement et bloque les transferts.',
    connections: [
      { to: 'admin', type: 'surface', label: 'avenue de transit surveillée', risk: 28, controlledBy: 'Combine' },
      { to: 'rail', type: 'rail', label: 'ligne Razor Train', risk: 45, controlledBy: 'Combine' },
      { to: 'res_a', type: 'surface', label: 'passage résidentiel filtré', risk: 34, controlledBy: 'Contested' },
      { to: 'canals', type: 'service', label: 'accès maintenance non déclaré', risk: 76, controlledBy: 'Resistance' },
    ],
  },
  {
    id: 'admin', name: 'Place administrative', zone: 'Centre administratif', x: 42, y: 27, strategicValue: 95, chokePoint: true,
    role: 'Rationnement, fichiers citoyens, relais Breencast.', population: 1900, status: 'Contrôle Combine total', rebel: 12, xen: 0, surveillance: 86, infrastructure: 82, loyalty: 31, fear: 72, units: { cp: 12, ordinal: 1 },
    notes: 'Symbole du régime. Sa chute déclenche une crise de légitimité et une revue Citadel.',
    connections: [
      { to: 'res_a', type: 'surface', label: 'files de rationnement', risk: 38, controlledBy: 'Contested' },
      { to: 'res_b', type: 'surface', label: 'checkpoint civique B', risk: 44, controlledBy: 'Combine' },
      { to: 'citadel', type: 'citadel', label: 'couloir administratif restreint', risk: 10, controlledBy: 'Combine' },
      { to: 'industrial', type: 'surface', label: 'boulevard logistique', risk: 33, controlledBy: 'Combine' },
    ],
  },
  {
    id: 'res_a', name: 'Bloc résidentiel A', zone: 'Résidentiel', x: 25, y: 46, strategicValue: 70, chokePoint: false,
    role: 'Logements citoyens, inspections, répartition de rations.', population: 7600, status: 'Stable', rebel: 31, xen: 4, surveillance: 44, infrastructure: 66, loyalty: 29, fear: 51, units: { cp: 4 },
    notes: 'Rumeurs de caches Lambda dans les cages d’escalier et faux plafonds.',
    connections: [
      { to: 'res_b', type: 'surface', label: 'coursives communes', risk: 58, controlledBy: 'Contested' },
      { to: 'hospital', type: 'service', label: 'passage médical clandestin', risk: 66, controlledBy: 'Resistance' },
      { to: 'sewers', type: 'sewer', label: 'descente d’entretien', risk: 72, controlledBy: 'Xen' },
    ],
  },
  {
    id: 'res_b', name: 'Bloc résidentiel B', zone: 'Résidentiel', x: 50, y: 50, strategicValue: 78, chokePoint: false,
    role: 'Densité civile élevée, marché noir, dortoirs de travailleurs.', population: 8100, status: 'Surveillé', rebel: 38, xen: 7, surveillance: 49, infrastructure: 61, loyalty: 22, fear: 58, units: { cp: 5, manhack: 1 },
    notes: 'Plusieurs plaintes de brutalité Civil Protection. Fort potentiel de martyr rebelle.',
    connections: [
      { to: 'industrial', type: 'surface', label: 'navette ouvrière', risk: 52, controlledBy: 'Contested' },
      { to: 'hospital', type: 'service', label: 'corridor d’évacuation civile', risk: 70, controlledBy: 'Resistance' },
      { to: 'sewers', type: 'sewer', label: 'conduites d’habitation', risk: 68, controlledBy: 'Contested' },
    ],
  },
  {
    id: 'industrial', name: 'Complexe industriel', zone: 'Infrastructure', x: 68, y: 39, strategicValue: 91, chokePoint: true,
    role: 'Production, pièces de synthèse, conditionnement des rations.', population: 3300, status: 'Stable', rebel: 27, xen: 9, surveillance: 52, infrastructure: 72, loyalty: 20, fear: 55, units: { cp: 4, grunt: 2 },
    notes: 'Les vibrations lourdes attirent parfois les antlions depuis la périphérie.',
    connections: [
      { to: 'rail', type: 'rail', label: 'fret Razor Train', risk: 40, controlledBy: 'Combine' },
      { to: 'periphery', type: 'surface', label: 'route de déchets industriels', risk: 71, controlledBy: 'Xen' },
      { to: 'quarantine', type: 'quarantine', label: 'sas biologique scellable', risk: 74, controlledBy: 'Contested' },
      { to: 'citadel', type: 'citadel', label: 'flux énergie/synthèse', risk: 22, controlledBy: 'Combine' },
    ],
  },
  {
    id: 'canals', name: 'Canaux', zone: 'Souterrain', x: 14, y: 72, strategicValue: 83, chokePoint: false,
    role: 'Réseau semi-souterrain, fuite civile, routes de la Résistance.', population: 500, status: 'Saboté', rebel: 64, xen: 19, surveillance: 18, infrastructure: 44, loyalty: 9, fear: 37, units: {},
    notes: 'Les scanners y perdent souvent le signal. Probable réseau Lambda relié aux safehouses.',
    connections: [
      { to: 'sewers', type: 'canal', label: 'déversoirs inondés', risk: 82, controlledBy: 'Contested' },
      { to: 'hospital', type: 'canal', label: 'tunnel d’extraction médicale', risk: 79, controlledBy: 'Resistance' },
      { to: 'periphery', type: 'canal', label: 'fuite hors ville', risk: 88, controlledBy: 'Resistance' },
    ],
  },
  {
    id: 'sewers', name: 'Égouts techniques', zone: 'Souterrain', x: 36, y: 72, strategicValue: 76, chokePoint: false,
    role: 'Maintenance, humidité, faune Xen opportuniste, circulation clandestine.', population: 180, status: 'Contaminé', rebel: 44, xen: 42, surveillance: 22, infrastructure: 39, loyalty: 12, fear: 67, units: { manhack: 2 },
    notes: 'Barnacles et headcrabs signalés par équipes de maintenance. Route naturelle entre civils et Xen.',
    connections: [
      { to: 'quarantine', type: 'sewer', label: 'collecteur contaminé', risk: 90, controlledBy: 'Xen' },
      { to: 'hospital', type: 'sewer', label: 'conduite médicale humide', risk: 78, controlledBy: 'Contested' },
    ],
  },
  {
    id: 'quarantine', name: 'Zone de quarantaine', zone: 'Quarantaine', x: 60, y: 77, strategicValue: 86, chokePoint: true,
    role: 'Ruines biologiques, croissance Xen, exclusion civile.', population: 950, status: 'En quarantaine', rebel: 18, xen: 66, surveillance: 57, infrastructure: 25, loyalty: 5, fear: 91, units: { suppressor: 1, scanner: 2 },
    notes: 'Le confinement tient, mais les murs organiques progressent derrière les cloisons.',
    connections: [
      { to: 'hospital', type: 'quarantine', label: 'barrière sanitaire fissurée', risk: 86, controlledBy: 'Xen' },
      { to: 'periphery', type: 'quarantine', label: 'lisière biologique', risk: 92, controlledBy: 'Xen' },
      { to: 'citadel', type: 'service', label: 'conduit d’analyse scellé', risk: 64, controlledBy: 'Combine' },
    ],
  },
  {
    id: 'hospital', name: 'Ancien hôpital', zone: 'Quarantaine', x: 38, y: 88, strategicValue: 72, chokePoint: false,
    role: 'Abri clandestin, fournitures médicales, spores et blessés non déclarés.', population: 1200, status: 'Contaminé', rebel: 48, xen: 35, surveillance: 29, infrastructure: 51, loyalty: 17, fear: 71, units: {},
    notes: 'Des civils cherchent des soins hors du rationnement officiel. Terrain parfait pour Vortigaunt aid.',
    connections: [
      { to: 'periphery', type: 'surface', label: 'sortie ambulance effondrée', risk: 84, controlledBy: 'Contested' },
    ],
  },
  {
    id: 'rail', name: 'Nœud Razor Train', zone: 'Infrastructure', x: 82, y: 22, strategicValue: 92, chokePoint: true,
    role: 'Convoyage, transfert, logistique Combine.', population: 900, status: 'Surveillé', rebel: 33, xen: 4, surveillance: 68, infrastructure: 78, loyalty: 23, fear: 70, units: { cp: 3, soldier: 2 },
    notes: 'Sabotage potentiel à haut impact : pertes de rations, transferts interrompus, panique politique.',
    connections: [
      { to: 'citadel', type: 'rail', label: 'voie blindée Citadel', risk: 26, controlledBy: 'Combine' },
      { to: 'periphery', type: 'rail', label: 'ligne externe instable', risk: 67, controlledBy: 'Contested' },
    ],
  },
  {
    id: 'periphery', name: 'Périphérie extérieure', zone: 'Périphérie', x: 86, y: 72, strategicValue: 68, chokePoint: false,
    role: 'Lisière urbaine, sols meubles, antlions, exfiltration rebelle.', population: 650, status: 'Infesté', rebel: 21, xen: 74, surveillance: 35, infrastructure: 31, loyalty: 8, fear: 84, units: { hunter: 1 },
    notes: 'Les vibrations de véhicules lourds peuvent provoquer une migration antlion.',
    connections: [
      { to: 'citadel', type: 'surface', label: 'périmètre externe surveillé', risk: 55, controlledBy: 'Combine' },
    ],
  },
  {
    id: 'citadel', name: 'Zone proche Citadelle', zone: 'Citadelle', x: 82, y: 50, strategicValue: 100, chokePoint: true,
    role: 'Autorité supérieure, énergie, accès restreint, supervision Advisor.', population: 300, status: 'Contrôle Combine total', rebel: 5, xen: 0, surveillance: 100, infrastructure: 94, loyalty: 2, fear: 96, units: { elite: 2, ordinal: 1 },
    notes: 'Toute faiblesse ici déclenche une revue Advisor. Toute contamination est politiquement inacceptable.',
    connections: [],
  },
];
