import type { AdministratorAvatarId, ProfileId } from '../types/game';

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
    image: '/openai-visuals/administrators/civil-director.png',
    recommendedProfiles: ['loyalist', 'collaborator'],
  },
  field_prefect: {
    id: 'field_prefect',
    title: 'Préfète de terrain',
    subtitle: 'Administration pratique, districts instables et crises locales.',
    image: '/openai-visuals/administrators/field-prefect.png',
    recommendedProfiles: ['sympathizer', 'tyrant'],
  },
  combine_technocrat: {
    id: 'combine_technocrat',
    title: 'Technocrate intégré',
    subtitle: 'Interfaces Citadel, contrôle technique et conformité dure.',
    image: '/openai-visuals/administrators/combine-technocrat.png',
    recommendedProfiles: ['technocrat', 'loyalist'],
  },
  quarantine_director: {
    id: 'quarantine_director',
    title: 'Directrice biosécurité',
    subtitle: 'Quarantaine, confinement exogène et continuité sanitaire.',
    image: '/openai-visuals/administrators/quarantine-director.png',
    recommendedProfiles: ['quarantine', 'technocrat'],
  },
};

export function defaultAdministratorAvatar(profile: ProfileId): AdministratorAvatarId {
  return administratorAvatarOrder.find((id) => administratorAvatars[id].recommendedProfiles.includes(profile)) ?? 'civil_director';
}

const unitVisuals: Record<string, string> = {
  cp: '/openai-visuals/units/civil-protection.png',
  scanner: '/openai-visuals/units/city-scanner.png',
  manhack: '/openai-visuals/units/manhack.png',
  grunt: '/openai-visuals/units/overwatch-soldier.png',
  soldier: '/openai-visuals/units/overwatch-soldier.png',
  ordinal: '/openai-visuals/units/overwatch-soldier.png',
  suppressor: '/openai-visuals/units/overwatch-soldier.png',
  elite: '/openai-visuals/units/combine-elite.png',
  hunter: '/openai-visuals/units/hunter.png',
  strider: '/openai-visuals/units/strider.png',
  dropship: '/openai-visuals/unlocks/ota-command.png',
  gunship: '/openai-visuals/units/gunship.png',
  bioquarantine: '/openai-visuals/units/bioquarantine-team.png',
  advisor: '/openai-visuals/units/advisor.png',
};

export function getUnitVisual(unitId: string) {
  return unitVisuals[unitId] ?? '/openai-visuals/unlocks/ota-command.png';
}
