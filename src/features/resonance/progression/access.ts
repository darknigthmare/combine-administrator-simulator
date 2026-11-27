/** Four independent dimensions from Combat Games Extension 02, section 51. */
export type ContentKind = 'fighter' | 'partner' | 'costume' | 'stage' | 'mode' | 'collectible';
export type Discovery = 'secret' | 'hinted' | 'identified';
export type TechnicalAvailability =
  | { state: 'installed' }
  | { state: 'installation_required' | 'update_required' | 'unavailable'; reason: string };
export type MatchCompatibility = { state: 'allowed' } | { state: 'incompatible'; reason: string };

/**
 * Inputs from an authoritative source, not proof of a subscription.
 * This module performs no network verification. The local dossier store below
 * accepts only earned dossier rewards; it cannot persist external entitlements.
 */
export type EntitlementSource =
  | { kind: 'permanent'; state: 'active' | 'revoked' }
  | { kind: 'temporary'; state: 'verified'; validFrom: number; validUntil: number }
  | { kind: 'temporary'; state: 'pending' | 'unavailable' | 'revoked' };

export type EntitlementState = 'none' | 'claimable' | 'permanent' | 'temporary' | 'pending' | 'expired' | 'revoked';
export interface AccessDependency {
  contentId: string;
  usable: boolean;
  /** Caller must supply a spoiler-safe description, e.g. "Personnage requis". */
  reason: string;
}

export interface ContentAccessInput {
  contentId: string;
  kind: ContentKind;
  discovery: Discovery;
  /** Stable source IDs preserve independent ways of acquiring one content. */
  sources: Readonly<Record<string, EntitlementSource>>;
  claimable?: boolean;
  technical: TechnicalAvailability;
  compatibility: MatchCompatibility;
  dependencies?: readonly AccessDependency[];
  now: number;
}

export interface AccessBlocker {
  dimension: 'entitlement' | 'technical' | 'compatibility' | 'dependency';
  reason: string;
  contentId?: string;
}

export interface ContentAccess {
  contentId: string;
  kind: ContentKind;
  discovery: Discovery;
  entitlement: EntitlementState;
  technical: TechnicalAvailability;
  compatibility: MatchCompatibility;
  entitled: boolean;
  usable: boolean;
  canRevealIdentity: boolean;
  preview: 'neutral' | 'silhouette' | 'full';
  blockers: readonly AccessBlocker[];
}

const ENTITLEMENT_REASONS: Record<EntitlementState, string> = {
  none: 'À débloquer', claimable: 'Récompense disponible', permanent: 'Acquis',
  temporary: 'Accès temporaire actif', pending: 'Vérification en attente',
  expired: 'Accès temporaire terminé', revoked: 'Source d’accès retirée',
};

export function resolveContentAccess(input: ContentAccessInput): ContentAccess {
  const sources = Object.values(input.sources);
  const permanent = sources.some((source) => source.kind === 'permanent' && source.state === 'active');
  const verified = sources.filter((source): source is Extract<EntitlementSource, { state: 'verified' }> => source.kind === 'temporary' && source.state === 'verified');
  const validWindow = (source: typeof verified[number]) => Number.isFinite(input.now)
    && Number.isFinite(source.validFrom) && Number.isFinite(source.validUntil) && source.validUntil > source.validFrom;
  const temporary = verified.some((source) => validWindow(source) && source.validFrom <= input.now && input.now < source.validUntil);
  const pending = sources.some((source) => source.state === 'pending' || source.state === 'unavailable')
    || verified.some((source) => !validWindow(source) || source.validFrom > input.now);
  const expired = verified.some((source) => validWindow(source) && source.validUntil <= input.now);
  const revoked = sources.some((source) => source.state === 'revoked');
  const entitlement: EntitlementState = permanent ? 'permanent' : temporary ? 'temporary'
    : input.claimable ? 'claimable' : pending ? 'pending' : expired ? 'expired' : revoked ? 'revoked' : 'none';
  const entitled = entitlement === 'permanent' || entitlement === 'temporary';
  const blockers: AccessBlocker[] = [];
  if (!entitled) blockers.push({ dimension: 'entitlement', reason: ENTITLEMENT_REASONS[entitlement] });
  if (input.technical.state !== 'installed') blockers.push({ dimension: 'technical', reason: input.technical.reason });
  if (input.compatibility.state !== 'allowed') blockers.push({ dimension: 'compatibility', reason: input.compatibility.reason });
  for (const dependency of input.dependencies ?? []) {
    if (!dependency.usable) blockers.push({ dimension: 'dependency', contentId: dependency.contentId, reason: dependency.reason });
  }
  return {
    contentId: input.contentId, kind: input.kind, discovery: input.discovery,
    entitlement, technical: input.technical, compatibility: input.compatibility,
    entitled, usable: blockers.length === 0,
    canRevealIdentity: input.discovery === 'identified',
    preview: input.discovery === 'secret' ? 'neutral' : input.discovery === 'hinted' || !entitled ? 'silhouette' : 'full',
    blockers,
  };
}

/** Keep hidden identity out of accessible labels as well as the visual title. */
export function accessTitle(access: ContentAccess, identifiedTitle: string): string {
  return access.canRevealIdentity ? identifiedTitle : access.discovery === 'hinted' ? 'Identité à découvrir' : 'Contenu non révélé';
}
