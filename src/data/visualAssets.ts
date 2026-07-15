import type { AdministratorAvatarId, Crisis, CrisisType, MajorStoryEventId, ProfileId } from '../types/game';

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

const majorStoryEventVisuals: Record<MajorStoryEventId, string> = {
  advisor_arrival: '/openai-visuals/events/major-advisor-arrival.webp',
  breencast_relay_blast: '/openai-visuals/events/major-breencast-relay-blast.webp',
  razor_train_loss: '/openai-visuals/events/major-razor-train-loss.webp',
  nova_prospekt_escape: '/openai-visuals/events/major-nova-prospekt-escape.webp',
  civil_protection_mutiny: '/openai-visuals/events/major-civil-protection-mutiny.webp',
  major_xen_rift: '/openai-visuals/events/major-xen-rift.webp',
  lambda_coordinated_assault: '/openai-visuals/events/major-lambda-coordinated-assault.webp',
  citadel_blackout: '/openai-visuals/events/major-citadel-blackout.webp',
  vortigaunt_resonance_burst: '/openai-visuals/events/major-vortessence-resonance.webp',
  headcrab_shell_exposure: '/openai-visuals/events/major-headcrab-shell-exposure.webp',
};

export function getMajorStoryEventVisual(eventId: MajorStoryEventId) {
  return majorStoryEventVisuals[eventId];
}

export function getCrisisVisual(crisis: Crisis | CrisisType) {
  if (typeof crisis === 'string') return crisisVisuals[crisis];

  const semanticKey = `${crisis.id} ${crisis.title} ${crisis.body} ${(crisis.loreTags ?? []).join(' ')}`.toLowerCase();

  if (semanticKey.includes('advisor')) return majorStoryEventVisuals.advisor_arrival;
  if (semanticKey.includes('breencast') && /(relay|relais|blast|explosion|signal failure|panne)/.test(semanticKey)) return majorStoryEventVisuals.breencast_relay_blast;
  if (semanticKey.includes('razor train') || semanticKey.includes('razor_train')) return majorStoryEventVisuals.razor_train_loss;
  if (semanticKey.includes('nova prospekt') && /(escape|evasion|évasion|detainee|detenu|détenu|prisoner)/.test(semanticKey)) return majorStoryEventVisuals.nova_prospekt_escape;
  if (semanticKey.includes('civil protection') && /(mutiny|revolte|révolte|corruption|desertion|désertion)/.test(semanticKey)) return majorStoryEventVisuals.civil_protection_mutiny;
  if (/(vortigaunt|vortessence|biotic)/.test(semanticKey)) return majorStoryEventVisuals.vortigaunt_resonance_burst;
  if (/(headcrab shell|headcrab_shell|canister|parasite rocket|ravenholm)/.test(semanticKey)) return majorStoryEventVisuals.headcrab_shell_exposure;
  if (/(blackout|grid failure|power loss|coupure citadelle)/.test(semanticKey)) return majorStoryEventVisuals.citadel_blackout;
  if (/(xen rift|faille xen|dimensional rift|bio-rift|poche xen)/.test(semanticKey)) return majorStoryEventVisuals.major_xen_rift;
  if (semanticKey.includes('lambda') && /(coordinated|coordonne|coordonné|multi-sector|uprising|soulèvement)/.test(semanticKey)) return majorStoryEventVisuals.lambda_coordinated_assault;
  if (semanticKey.includes('citadel')) return crisisVisuals.CITADEL;
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
