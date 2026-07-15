import type { AdministratorAvatarId, Crisis, CrisisType, ProfileId } from '../types/game';

export type AdministratorAvatarDefinition = {
  id: AdministratorAvatarId;
  title: string;
  subtitle: string;
  image: string;
  recommendedProfiles: ProfileId[];
};

export const administratorAvatarOrder: AdministratorAvatarId[] = [
  'civil_director',
  'field_prefect',
  'combine_technocrat',
  'quarantine_director',
];

export const administratorAvatars: Record<AdministratorAvatarId, AdministratorAvatarDefinition> = {
  civil_director: {
    id: 'civil_director',
    title: 'Directeur civil',
    subtitle: 'Corporate, discipliné, présentable devant la Citadelle.',
    image: '/openai-visuals/administrators/civil-director.webp',
    recommendedProfiles: ['loyalist', 'collaborator'],
  },
  field_prefect: {
    id: 'field_prefect',
    title: 'Préfète de terrain',
    subtitle: 'Administration pratique, districts instables et crises locales.',
    image: '/openai-visuals/administrators/field-prefect.webp',
    recommendedProfiles: ['sympathizer', 'tyrant'],
  },
  combine_technocrat: {
    id: 'combine_technocrat',
    title: 'Technocrate intégré',
    subtitle: 'Interfaces Citadel, contrôle technique et conformité dure.',
    image: '/openai-visuals/administrators/combine-technocrat.webp',
    recommendedProfiles: ['technocrat', 'loyalist'],
  },
  quarantine_director: {
    id: 'quarantine_director',
    title: 'Directrice biosécurité',
    subtitle: 'Quarantaine, confinement exogène et continuité sanitaire.',
    image: '/openai-visuals/administrators/quarantine-director.webp',
    recommendedProfiles: ['quarantine', 'technocrat'],
  },
};

export function defaultAdministratorAvatar(profile: ProfileId): AdministratorAvatarId {
  return administratorAvatarOrder.find((id) => administratorAvatars[id].recommendedProfiles.includes(profile)) ?? 'civil_director';
}

const unitVisuals: Record<string, string> = {
  cp: '/openai-visuals/units/civil-protection.webp',
  scanner: '/openai-visuals/units/city-scanner.webp',
  manhack: '/openai-visuals/units/manhack-lore.webp',
  grunt: '/openai-visuals/units/combine-grunt-lore.webp',
  soldier: '/openai-visuals/units/overwatch-soldier.webp',
  ordinal: '/openai-visuals/units/combine-ordinal-lore.webp',
  suppressor: '/openai-visuals/units/combine-suppressor-lore.webp',
  elite: '/openai-visuals/units/combine-elite.webp',
  hunter: '/openai-visuals/units/hunter-lore.webp',
  strider: '/openai-visuals/units/strider.webp',
  dropship: '/openai-visuals/units/dropship-lore.webp',
  gunship: '/openai-visuals/units/gunship-lore.webp',
  bioquarantine: '/openai-visuals/units/bioquarantine-team-lore.webp',
  advisor: '/openai-visuals/units/advisor-lore.webp',
};

export function getUnitVisual(unitId: string) {
  return unitVisuals[unitId] ?? '/openai-visuals/unlocks/ota-command.webp';
}

export type DossierVisualId = 'lambda_courier' | 'suspected_citizen' | 'nova_detainee' | 'vortigaunt_biotic';

const dossierVisuals: Record<DossierVisualId, string> = {
  lambda_courier: '/openai-visuals/dossiers/lambda-courier.webp',
  suspected_citizen: '/openai-visuals/dossiers/suspected-citizen.webp',
  nova_detainee: '/openai-visuals/dossiers/nova-detainee.webp',
  vortigaunt_biotic: '/openai-visuals/dossiers/vortigaunt-biotic-lore.webp',
};

export function getDossierVisual(dossierId: DossierVisualId) {
  return dossierVisuals[dossierId];
}

const crisisVisuals: Record<CrisisType, string> = {
  REBELLION: '/openai-visuals/events/lambda-sabotage.webp',
  XEN: '/openai-visuals/events/xen-breach.webp',
  CITADEL: '/openai-visuals/events/citadel-audit.webp',
  CIVIL: '/openai-visuals/events/civilian-riot.webp',
  MORAL: '/openai-visuals/events/moral-quarantine.webp',
  COMBINE: '/openai-visuals/events/overwatch-pacification.webp',
  PROPAGANDA: '/openai-visuals/events/breencast-propaganda.webp',
  INFRASTRUCTURE: '/openai-visuals/events/infrastructure-failure.webp',
};

export function getCrisisVisual(crisis: Crisis | CrisisType) {
  if (typeof crisis === 'string') return crisisVisuals[crisis];

  const semanticKey = `${crisis.id} ${crisis.title} ${crisis.body} ${(crisis.loreTags ?? []).join(' ')}`.toLowerCase();

  if (semanticKey.includes('advisor') || semanticKey.includes('citadel')) return crisisVisuals.CITADEL;
  if (semanticKey.includes('breencast') || semanticKey.includes('propaganda')) return crisisVisuals.PROPAGANDA;
  if (semanticKey.includes('lambda') || semanticKey.includes('rebellion') || semanticKey.includes('sabotage')) return crisisVisuals.REBELLION;
  if (semanticKey.includes('xen') || semanticKey.includes('antlion') || semanticKey.includes('headcrab') || semanticKey.includes('quarantine')) {
    return crisis.type === 'MORAL' ? crisisVisuals.MORAL : crisisVisuals.XEN;
  }
  if (semanticKey.includes('ration') || semanticKey.includes('riot') || semanticKey.includes('citizen')) return crisisVisuals.CIVIL;
  if (semanticKey.includes('rail') || semanticKey.includes('power') || semanticKey.includes('relay') || semanticKey.includes('infrastructure')) {
    return crisisVisuals.INFRASTRUCTURE;
  }
  if (semanticKey.includes('overwatch') || semanticKey.includes('ota') || semanticKey.includes('pacification')) return crisisVisuals.COMBINE;

  return crisisVisuals[crisis.type];
}
