/**
 * Step 13 — Citizen Registry seed data.
 * Dossiers représentatifs, marqueurs de risque et actions administratives.
 * Aucun asset officiel requis : uniquement des données textuelles lore-compatible.
 */
import type { CitizenAction, CitizenRiskMarker, CitizenStatus, CitizenRecord } from '../types/game';

export const citizenStatuses: Record<CitizenStatus, { label: string; description: string; color: 'blue' | 'amber' | 'red' | 'green' | 'violet' }> = {
  compliant: {
    label: 'Conforme',
    description: 'Citoyen coopératif, utile pour façade statistique et travail industriel.',
    color: 'blue',
  },
  neutral: {
    label: 'Neutre',
    description: 'Citoyen sans anomalie officielle mais vulnérable à faim, rumeurs et propagande Lambda.',
    color: 'amber',
  },
  suspect: {
    label: 'Suspect anti-citoyen',
    description: 'Dossier marqué par dénonciation, déplacement irrégulier ou lien familial problématique.',
    color: 'red',
  },
  informant: {
    label: 'Informateur CP',
    description: 'Source civile rémunérée par rations, statut précaire et fiabilité variable.',
    color: 'green',
  },
  collaborator: {
    label: 'Collaborateur civil',
    description: 'Auxiliaire administratif, logisticien ou relais de quartier pro-Combine.',
    color: 'blue',
  },
  lambda_sympathizer: {
    label: 'Sympathisant Lambda',
    description: 'Soutien probable de la Résistance, pas forcément armé.',
    color: 'red',
  },
  xen_exposed: {
    label: 'Exposé Xen',
    description: 'Marqueur sanitaire : spores, morsure parasite, contact quarantaine ou symptôme non classifié.',
    color: 'violet',
  },
  transferred: {
    label: 'Transféré Nova Prospekt',
    description: 'Citoyen déplacé hors registre urbain. Le statut public peut être falsifié.',
    color: 'violet',
  },
  deceased: {
    label: 'Décédé / dossier clos',
    description: 'Perte civile officiellement classée accident, incident sanitaire ou activité anti-citoyenne.',
    color: 'red',
  },
};

export const riskMarkerDescriptions: Record<CitizenRiskMarker, string> = {
  ration_default: 'Défaut de rationnement ou présence récurrente en file non autorisée.',
  radio_contact: 'Exposition possible à radio pirate Lambda.',
  tunnel_proximity: 'Déplacements près des tunnels, canaux ou conduits de service.',
  family_disappeared: 'Lien familial avec disparu, transféré ou dossier scellé.',
  cp_abuse_witness: 'Témoin d’abus Civil Protection ; risque de radicalisation mémorielle.',
  xen_contact: 'Contact biologique ou proximité zone Xen.',
  vortigaunt_contact: 'Contact avec Biotics/Vortigaunt ou rumeur Vortessence.',
  industrial_access: 'Accès aux chaînes industrielles, générateurs ou Razor logistics.',
  nova_transfer_flag: 'Éligible au transfert, interrogatoire ou traitement Nova Prospekt.',
  false_denunciation_risk: 'Dossier possiblement issu d’une fausse dénonciation contre bonus ration.',
};

export const citizenActions: CitizenAction[] = [
  {
    id: 'ration_bonus',
    name: 'Bonus de ration conditionnel',
    description: 'Attribuer coupons supplémentaires contre coopération visible et présence aux briefings BreenCast.',
    targetStatuses: ['neutral', 'informant', 'compliant'],
    effects: { loyalty: 3, fatigue: -2, rations: -45 },
    registryEffects: { riskDelta: -4, loyaltyDelta: 8, rationDelta: 18, reliabilityDelta: 4 },
    logLine: 'Bonus calorique attribué : conformité affichée renforcée.',
  },
  {
    id: 'cp_interrogation',
    name: 'Interrogatoire Civil Protection',
    description: 'Extraire information locale via pression CP. Efficace, brutal, générateur de faux positifs.',
    targetStatuses: ['suspect', 'lambda_sympathizer', 'neutral'],
    effects: { fear: 5, loyalty: -4, rebel: -2, suspicion: 2 },
    registryEffects: { riskDelta: 7, fearDelta: 12, loyaltyDelta: -10, reliabilityDelta: -3 },
    logLine: 'Interrogatoire CP enregistré : données utiles mais traumatisme social accru.',
  },
  {
    id: 'recruit_informant',
    name: 'Recruter comme informateur',
    description: 'Convertir un citoyen vulnérable en source civile rémunérée en rations.',
    targetStatuses: ['neutral', 'suspect'],
    effects: { info: 4, rations: -25, loyalty: -1, fear: 2 },
    registryEffects: { riskDelta: 2, loyaltyDelta: -3, rationDelta: 12, reliabilityDelta: 14, newStatus: 'informant' },
    logLine: 'Source civile activée : délation locale augmentée.',
  },
  {
    id: 'mark_nova',
    name: 'Marquer pour Nova Prospekt',
    description: 'Ajouter un flag de transfert discret : interrogatoire, disparition administrative ou traitement externe.',
    targetStatuses: ['suspect', 'lambda_sympathizer', 'xen_exposed', 'informant'],
    effects: { fear: 7, loyalty: -6, rebel: -2, suspicion: 5 },
    registryEffects: { riskDelta: 12, fearDelta: 15, loyaltyDelta: -15, addMarkers: ['nova_transfer_flag'], novaFlag: true },
    logLine: 'Dossier marqué pour transfert Nova Prospekt.',
  },
  {
    id: 'transfer_nova',
    name: 'Transfert immédiat Nova Prospekt',
    description: 'Retirer le citoyen du registre urbain par Razor logistics. Réduit menace locale, aggrave familles de disparus.',
    targetStatuses: ['suspect', 'lambda_sympathizer', 'xen_exposed'],
    effects: { fear: 9, loyalty: -9, rebel: -3, suspicion: 7 },
    registryEffects: { riskDelta: 0, fearDelta: 20, loyaltyDelta: -20, newStatus: 'transferred', novaFlag: true },
    logLine: 'Transfert Nova Prospekt effectué : dossier urbain scellé.',
  },
  {
    id: 'medical_quarantine',
    name: 'Quarantaine médicale',
    description: 'Isoler le dossier pour observation biologique : utile contre Xen, brutal socialement.',
    targetStatuses: ['xen_exposed', 'neutral', 'suspect'],
    effects: { xen: -2, fear: 4, fatigue: 2, loyalty: -3 },
    registryEffects: { riskDelta: 5, fearDelta: 8, loyaltyDelta: -5, addMarkers: ['xen_contact'], newStatus: 'xen_exposed' },
    logLine: 'Quarantaine médicale imposée : risque biologique classé.',
  },
  {
    id: 'erase_record',
    name: 'Effacer / falsifier dossier',
    description: 'Masquer une anomalie dans les archives COAN. Utile pour double jeu, dangereux en audit.',
    targetStatuses: ['suspect', 'lambda_sympathizer', 'xen_exposed', 'informant'],
    effects: { suspicion: 6, info: -2, loyalty: 2 },
    registryEffects: { riskDelta: -15, reliabilityDelta: -9, loyaltyDelta: 5 },
    logLine: 'Dossier falsifié : cohérence Citadel diminuée, trace locale effacée.',
  },
  {
    id: 'public_reward',
    name: 'Récompense publique de conformité',
    description: 'Mettre un citoyen en exemple pour stabiliser les blocs et alimenter la propagande.',
    targetStatuses: ['compliant', 'collaborator', 'informant'],
    effects: { info: 3, loyalty: 2, fatigue: 1, rations: -35 },
    registryEffects: { riskDelta: -6, loyaltyDelta: 10, rationDelta: 10, fearDelta: 2 },
    logLine: 'Citoyen affiché comme modèle civique : conformité publique renforcée.',
  },
];

export const seedCitizenNames = [
  'M. Arendt', 'L. Vance', 'P. Koller', 'D. Novák', 'S. Marek', 'E. Rask', 'I. Petrov', 'N. Varga', 'A. Keller', 'R. Dima',
  'K. Orlov', 'T. Novak', 'J. Halek', 'V. Sokol', 'C. Morrow', 'B. Steiner', 'O. Iliescu', 'H. Grigor', 'F. Alin', 'Y. Dragan',
  'M. Kvas', 'S. Moroz', 'A. Toma', 'D. Vasile', 'E. Havel', 'L. Anton', 'P. Radu', 'N. Kirov', 'I. Marek', 'R. Stahl',
];

export const representativeCitizenTemplates: Array<Partial<CitizenRecord>> = [
  { name: 'M. Arendt', status: 'informant', loyaltyScore: 52, fearScore: 71, rationStatus: 'Bonus informateur', markers: ['false_denunciation_risk', 'ration_default'] },
  { name: 'L. Vance', status: 'lambda_sympathizer', loyaltyScore: 18, fearScore: 46, rationStatus: 'Restreint', markers: ['radio_contact', 'tunnel_proximity', 'family_disappeared'] },
  { name: 'P. Koller', status: 'collaborator', loyaltyScore: 77, fearScore: 63, rationStatus: 'Prioritaire', markers: ['industrial_access'] },
  { name: 'D. Novák', status: 'xen_exposed', loyaltyScore: 39, fearScore: 82, rationStatus: 'Quarantaine', markers: ['xen_contact'] },
  { name: 'S. Marek', status: 'suspect', loyaltyScore: 25, fearScore: 58, rationStatus: 'Suspendu', markers: ['cp_abuse_witness', 'radio_contact'] },
];
