import { describe, expect, it } from 'vitest';
import { accessTitle, resolveContentAccess } from './access';
import type { ContentAccessInput } from './access';
import { evaluateCondition } from './conditions';
import type { UnlockCondition } from './conditions';

const base: ContentAccessInput = {
  contentId: 'test_costume', kind: 'costume', discovery: 'identified', sources: {},
  technical: { state: 'installed' }, compatibility: { state: 'allowed' }, now: 100,
};
const earned = { kind: 'permanent', state: 'active' } as const;

describe('Independent collection access dimensions', () => {
  it('keeps a challenge reward after an independent temporary source expires or is revoked', () => {
    const expired = resolveContentAccess({ ...base, sources: { challenge: earned, membership: { kind: 'temporary', state: 'verified', validFrom: 0, validUntil: 90 } } });
    const revoked = resolveContentAccess({ ...base, sources: { challenge: earned, membership: { kind: 'temporary', state: 'revoked' } } });
    expect(expired.entitlement).toBe('permanent');
    expect(expired.usable).toBe(true);
    expect(revoked.usable).toBe(true);
  });

  it('keeps an unexpired temporary right until its actual boundary', () => {
    const sources = { temporary: { kind: 'temporary', state: 'verified', validFrom: 50, validUntil: 101 } } as const;
    expect(resolveContentAccess({ ...base, sources }).entitlement).toBe('temporary');
    expect(resolveContentAccess({ ...base, sources, now: 101 }).entitlement).toBe('expired');
    expect(resolveContentAccess({ ...base, sources, now: 101 }).usable).toBe(false);
  });

  it('distinguishes unavailable verification from confirmed expiry without inventing a right', () => {
    const unavailable = resolveContentAccess({ ...base, sources: { remote: { kind: 'temporary', state: 'unavailable' } } });
    const pending = resolveContentAccess({ ...base, sources: { remote: { kind: 'temporary', state: 'pending' } } });
    expect(unavailable.entitlement).toBe('pending');
    expect(pending.entitlement).toBe('pending');
    expect(unavailable.entitled).toBe(false);
    expect(unavailable.blockers[0].reason).not.toMatch(/terminé/);
  });

  it('fails closed on a malformed or future temporary window', () => {
    for (const source of [
      { kind: 'temporary', state: 'verified', validFrom: 0, validUntil: Number.NaN },
      { kind: 'temporary', state: 'verified', validFrom: 30, validUntil: 20 },
      { kind: 'temporary', state: 'verified', validFrom: 110, validUntil: 200 },
    ] as const) {
      const decision = resolveContentAccess({ ...base, sources: { source } });
      expect(decision.entitlement).toBe('pending');
      expect(decision.usable).toBe(false);
    }
  });

  it('retains the owned costume while its required fighter remains unavailable', () => {
    const decision = resolveContentAccess({ ...base, sources: { earned }, dependencies: [{ contentId: 'fighter', usable: false, reason: 'Personnage requis encore verrouillé' }] });
    expect(decision.entitlement).toBe('permanent');
    expect(decision.entitled).toBe(true);
    expect(decision.usable).toBe(false);
    expect(decision.blockers).toEqual([{ dimension: 'dependency', contentId: 'fighter', reason: 'Personnage requis encore verrouillé' }]);
  });

  it('reports missing installation and mode restrictions independently from ownership', () => {
    const decision = resolveContentAccess({ ...base, kind: 'stage', sources: { earned }, technical: { state: 'installation_required', reason: 'Installation nécessaire' }, compatibility: { state: 'incompatible', reason: 'Version hors de cette période' } });
    expect(decision.entitlement).toBe('permanent');
    expect(decision.blockers.map((blocker) => blocker.dimension)).toEqual(['technical', 'compatibility']);
    expect(decision.blockers.some((blocker) => /abonn|débloquer/.test(blocker.reason))).toBe(false);
  });

  it('keeps a claimable reward distinct from ownership', () => {
    const decision = resolveContentAccess({ ...base, claimable: true });
    expect(decision.entitlement).toBe('claimable');
    expect(decision.usable).toBe(false);
    expect(decision.preview).toBe('silhouette');
  });

  it('hides secret identity in both presentation and accessible text', () => {
    const secret = resolveContentAccess({ ...base, discovery: 'secret' });
    const hinted = resolveContentAccess({ ...base, discovery: 'hinted', sources: { earned } });
    expect(accessTitle(secret, 'Hidden name')).toBe('Contenu non révélé');
    expect(secret.preview).toBe('neutral');
    expect(accessTitle(hinted, 'Hidden name')).toBe('Identité à découvrir');
    expect(hinted.preview).toBe('silhouette');
  });
});

describe('Explicit AND / OR unlock conditions', () => {
  const rule: UnlockCondition = { type: 'all', label: 'Route et récompense', conditions: [
    { type: 'counter', counter: 'route', atLeast: 1, label: 'Terminer la route' },
    { type: 'any', label: 'Défi ou exploration', conditions: [
      { type: 'counter', counter: 'challenge', atLeast: 3, label: 'Trois victoires' },
      { type: 'counter', counter: 'chest', atLeast: 1, label: 'Archive découverte' },
    ] },
  ] };

  it('preserves nested alternatives instead of turning OR into a second obligation', () => {
    expect(evaluateCondition(rule, { route: 1, chest: 1 }).met).toBe(true);
    expect(evaluateCondition(rule, { route: 1, challenge: 3 }).met).toBe(true);
    expect(evaluateCondition(rule, { route: 0, challenge: 3, chest: 1 }).met).toBe(false);
    expect(evaluateCondition(rule, { route: 1, challenge: 2 }).met).toBe(false);
  });

  it('exposes each branch and measurable progress without granting a partial reward', () => {
    const result = evaluateCondition(rule, { route: 1, challenge: 2 });
    expect(result.children?.[1].operator).toBe('any');
    expect(result.children?.[1].children?.[0]).toMatchObject({ current: 2, target: 3, met: false });
  });

  it('does not grant malformed empty rules or nonfinite counters', () => {
    expect(evaluateCondition({ type: 'all', conditions: [], label: 'Invalid' }, {}).met).toBe(false);
    expect(evaluateCondition({ type: 'any', conditions: [], label: 'Invalid' }, {}).met).toBe(false);
    expect(evaluateCondition(rule, { route: Number.NaN, chest: Infinity }).met).toBe(false);
    expect(evaluateCondition({ type: 'counter', counter: 'wins', atLeast: 0, label: 'Invalid' }, { wins: 0 }).met).toBe(false);
  });
});
