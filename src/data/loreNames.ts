import { CombineProtocol } from '../types/lore';

export const rebelCellNames: string[] = [
  'Cellule Lambda-3',
  'Réseau Canal Nord',
  'Station Six',
  'Groupe Black Mesa Est',
  'Les Voix du Tunnel',
  'Groupe Vortigaunt Libre',
  'Cellule Ravenholm',
  'Réseau Odessa',
  'Les Cendres de Nova Prospekt',
  'Cellule White Forest'
];

export const combineProtocols: CombineProtocol[] = [
  {
    code: 'PROTOCOLE STABILIZATION-17',
    name: 'Stabilisation Urbaine standard',
    description: 'Protocole de base visant à réguler l\'activité civile par des patrouilles et le rationnement.'
  },
  {
    code: 'PROTOCOLE ANTI-CITIZEN SWEEP',
    name: 'Purge des Anti-Citoyens',
    description: 'Raid généralisé et répression armée dans les secteurs présentant une activité rebelle élevée.'
  },
  {
    code: 'PROTOCOLE QUARANTINE LOCK',
    name: 'Verrouillage Sanitaire',
    description: 'Isolement physique hermétique d\'un secteur pour contenir la contamination Xen.'
  },
  {
    code: 'PROTOCOLE OVERWATCH RESPONSE',
    name: 'Déploiement Militaire Overwatch',
    description: 'Engagement des unités régulières Overwatch (Soldats, Elites) pour mater une insurrection.'
  },
  {
    code: 'PROTOCOLE HEADCRAB DENIAL',
    name: 'Bombardement Biologique Inverse',
    description: 'Nettoyage par le vide ou confinement extrême face à une pullulation parasitaire.'
  },
  {
    code: 'PROTOCOLE RATION CONTROL',
    name: 'Régulation Nutritionnelle',
    description: 'Ajustement drastique des allocations caloriques pour récompenser ou punir les citoyens.'
  },
  {
    code: 'PROTOCOLE BREENCAST SILENCE',
    name: 'Censure et Blocage d\'Ondes',
    description: 'Neutralisation des transmissions pirates et saturation des fréquences d\'information.'
  },
  {
    code: 'PROTOCOLE ADVISOR REVIEW',
    name: 'Surveillance Supérieure Advisor',
    description: 'Soumission des données administratives à la supervision directe des Advisors.'
  },
  {
    code: 'PROTOCOLE SECTOR SEAL',
    name: 'Mise sous scellés physique',
    description: 'Condamnation définitive des issues et grilles de liaison d\'un secteur avec le reste de la cité.'
  },
  {
    code: 'PROTOCOLE CIVIL MEMORY',
    name: 'Réaffectation et Lavage Cérébral',
    description: 'Transfert de citoyens indésirables vers Nova Prospekt pour reconditionnement.'
  }
];
