import { describe, expect, it } from 'vitest';
import { createBattle } from '../bossBattle/engine';
import type { BattleResult, BattleState } from '../bossBattle/types';
import {
  awardDossiers, DOSSIER_STORAGE_KEY, dossierAccess, emptyDossierProgress,
  factsFromBattle, factsFromLegacyRecords, FIELD_DOSSIERS, loadDossierProgress, persistDossierProgress, saveDossierProgress,
} from './fieldDossiers';
import type { DossierStorage } from './fieldDossiers';

const win: BattleResult = {
  outcome: 'victory', score: 5000, rank: 'B', activeTicks: 1000, damageTaken: 0,
  shotsFired: 6, weakPointHits: 6, objectiveLabel: 'Objectif accompli', eligibleForRecord: true,
};
const legacy = { score: 5000, rank: 'B', activeTicks: 1000 };
const victory = (): BattleState => ({ ...createBattle({ fighterId: 'gordon_hl2', bossId: 'strider_hl2' }), status: 'victory', result: win });

function memoryStorage(initial: string | null = null): DossierStorage & { writes: number; value: string | null } {
  return {
    writes: 0, value: initial,
    getItem(key) { expect(key).toBe(DOSSIER_STORAGE_KEY); return this.value; },
    setItem(key, value) { expect(key).toBe(DOSSIER_STORAGE_KEY); this.writes++; this.value = value; },
  };
}

describe('Earned local field dossiers', () => {
  it('awards the defeated boss dossier and keeps its first grant on duplicate result delivery', () => {
    const facts = factsFromBattle(victory());
    const first = awardDossiers(emptyDossierProgress(), facts, 'boss_battle_victory', 1000);
    expect(first.awarded).toEqual(['dossier_strider_hl2']);
    const duplicate = awardDossiers(first.progress, facts, 'boss_battle_victory', 2000);
    expect(duplicate.progress).toBe(first.progress);
    expect(duplicate.awarded).toEqual([]);
    expect(first.progress.permanent.dossier_strider_hl2?.acquiredAt).toBe(1000);
  });

  it('never awards training, defeat, incomplete rush or a result ineligible for records', () => {
    const battle = victory();
    for (const state of [
      { ...battle, mode: 'training' as const },
      { ...battle, status: 'defeat' as const, result: { ...win, outcome: 'defeat' as const } },
      { ...battle, result: { ...win, eligibleForRecord: false } },
      { ...battle, mode: 'rush' as const, status: 'intermission' as const, rushResults: [win] },
      { ...battle, mode: 'rush' as const, status: 'complete' as const, rushResults: [win, win, win] },
    ]) expect(awardDossiers(emptyDossierProgress(), factsFromBattle(state), 'boss_battle_victory', 1).awarded).toEqual([]);
  });

  it('awards all four dossiers only for an eligible completed four-boss rush', () => {
    const completed: BattleState = { ...victory(), mode: 'rush', status: 'complete', rushResults: [win, win, win, win] };
    expect(awardDossiers(emptyDossierProgress(), factsFromBattle(completed), 'boss_battle_victory', 10).awarded).toHaveLength(4);
    completed.rushResults = [win, win, win, { ...win, eligibleForRecord: false }];
    expect(factsFromBattle(completed)).toEqual({});
  });

  it('recovers existing single and rush records retroactively without inventing a timestamp', () => {
    const facts = factsFromLegacyRecords({
      'alyx_hl2|dropship_hl2|single|story': legacy,
      'gordon_hl2|all|rush|hard': legacy,
    });
    const result = awardDossiers(emptyDossierProgress(), facts, 'legacy_record', null);
    expect(result.awarded).toHaveLength(4);
    expect(result.progress.permanent.dossier_dropship_hl2).toMatchObject({ source: 'legacy_record', acquiredAt: null });
  });

  it('rejects malformed, unsupported and training records during migration', () => {
    const facts = factsFromLegacyRecords({
      'gordon_hl2|strider_hl2|training|normal': legacy,
      'unknown|dropship_hl2|single|normal': legacy,
      'gordon_hl2|unknown|single|normal': legacy,
      'gordon_hl2|strider_hl2|single|normal|extra': legacy,
      'gordon_hl2|gunship_hl2|single|normal': { ...legacy, activeTicks: Infinity },
      'gordon_hl2|gargantua_hl1|single|normal': { ...legacy, rank: 'TRAINING' },
      'gordon_hl2|all|rush|unknown': legacy,
      'gordon_hl2|strider_hl2|rush|normal': legacy,
    });
    expect(facts).toEqual({});
  });

  it('keeps earned dossiers even if records later disappear', () => {
    const earned = awardDossiers(emptyDossierProgress(), { victory_strider_hl2: 1 }, 'boss_battle_victory', 1).progress;
    const recovered = awardDossiers(earned, factsFromLegacyRecords({}), 'legacy_record', null);
    expect(dossierAccess(recovered.progress, FIELD_DOSSIERS[0]).usable).toBe(true);
  });

  it('round-trips one atomic collection write without touching the management save', () => {
    const storage = memoryStorage();
    const earned = awardDossiers(emptyDossierProgress(), { rush_complete: 1 }, 'boss_battle_victory', 42).progress;
    expect(saveDossierProgress(storage, earned)).toBe(true);
    expect(storage.writes).toBe(1);
    expect(loadDossierProgress(storage).progress).toEqual(earned);
  });

  it('recovers malformed JSON from old valid records and remains idempotent after reload', () => {
    const storage = memoryStorage('{bad json');
    const loaded = loadDossierProgress(storage);
    expect(loaded.warning).toBe('invalid');
    expect(loaded.writable).toBe(true);
    const facts = factsFromLegacyRecords({ 'gordon_hl2|strider_hl2|single|normal': legacy });
    const recovered = awardDossiers(loaded.progress, facts, 'legacy_record', null);
    expect(saveDossierProgress(storage, recovered.progress)).toBe(true);
    expect(awardDossiers(loadDossierProgress(storage).progress, facts, 'legacy_record', null).awarded).toEqual([]);
  });

  it('does not interpret a local subscription flag or arbitrary catalogue ID as an earned right', () => {
    const storage = memoryStorage(JSON.stringify({ version: 1, subscriber: true, permanent: {
      dossier_strider_hl2: { ruleId: 'unlock_dossier_strider_hl2_v1', source: 'patreon', acquiredAt: 42 },
      nonexistent: { ruleId: 'anything', source: 'legacy_record', acquiredAt: null },
    } }));
    expect(loadDossierProgress(storage).progress).toEqual(emptyDossierProgress());
  });

  it('protects an unknown future save version instead of downgrading it', () => {
    const storage = memoryStorage(JSON.stringify({ version: 2, permanent: {} }));
    const loaded = loadDossierProgress(storage);
    expect(loaded.warning).toBe('unsupported_version');
    expect(loaded.writable).toBe(false);
    expect(storage.writes).toBe(0);
  });

  it('retains session rewards when storage reads or writes are denied', () => {
    const blocked = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); } };
    const loaded = loadDossierProgress(blocked);
    expect(loaded.warning).toBe('unavailable');
    const earned = awardDossiers(loaded.progress, { victory_strider_hl2: 1 }, 'boss_battle_victory', 1).progress;
    expect(saveDossierProgress(blocked, earned)).toBe(false);
    expect(dossierAccess(earned, FIELD_DOSSIERS[0]).usable).toBe(true);
    expect(loadDossierProgress(null).warning).toBe('unavailable');
  });

  it('unions rewards earned by two tabs loaded before either tab saved', () => {
    const storage = memoryStorage();
    const tabA = loadDossierProgress(storage).progress;
    const tabB = loadDossierProgress(storage).progress;
    const earnedA = awardDossiers(tabA, { victory_strider_hl2: 1 }, 'boss_battle_victory', 1000).progress;
    const earnedB = awardDossiers(tabB, { victory_dropship_hl2: 1 }, 'boss_battle_victory', 2000).progress;
    expect(saveDossierProgress(storage, earnedA)).toBe(true);
    const savedB = persistDossierProgress(storage, earnedB);
    expect(savedB.saved).toBe(true);
    expect(Object.keys(savedB.progress.permanent).sort()).toEqual(['dossier_dropship_hl2', 'dossier_strider_hl2']);
    expect(loadDossierProgress(storage).progress).toEqual(savedB.progress);
  });

  it('preserves the first stored grant when a second tab awards the same dossier', () => {
    const storage = memoryStorage();
    const earnedA = awardDossiers(emptyDossierProgress(), { victory_strider_hl2: 1 }, 'boss_battle_victory', 1000).progress;
    const earnedB = awardDossiers(emptyDossierProgress(), { victory_strider_hl2: 1, victory_gunship_hl2: 1 }, 'legacy_record', null).progress;
    saveDossierProgress(storage, earnedA);
    const merged = persistDossierProgress(storage, earnedB);
    expect(merged.progress.permanent.dossier_strider_hl2).toEqual(earnedA.permanent.dossier_strider_hl2);
    expect(merged.progress.permanent.dossier_gunship_hl2).toBeDefined();
    const writes = storage.writes;
    persistDossierProgress(storage, earnedA);
    expect(storage.writes).toBe(writes);
  });

  it('reconciles a concurrent storage-event overwrite with the tab’s in-memory permanent rights', () => {
    const storage = memoryStorage();
    const earnedA = awardDossiers(emptyDossierProgress(), { victory_strider_hl2: 1 }, 'boss_battle_victory', 1000).progress;
    const earnedB = awardDossiers(emptyDossierProgress(), { victory_dropship_hl2: 1 }, 'boss_battle_victory', 2000).progress;
    // Simulate a write already in flight in another context before our storage event.
    storage.value = JSON.stringify(earnedB);
    const mergedA = persistDossierProgress(storage, earnedA);
    const mergedB = persistDossierProgress(storage, earnedB);
    expect(mergedB.progress).toEqual(mergedA.progress);
    expect(Object.keys(mergedA.progress.permanent)).toHaveLength(2);
    expect(storage.writes).toBe(1);
  });

  it('rechecks the future-version guard when a newer client writes after this tab loaded', () => {
    const storage = memoryStorage();
    const oldTab = loadDossierProgress(storage);
    expect(oldTab.writable).toBe(true);
    const future = JSON.stringify({ version: 2, permanent: { preserved: true } });
    storage.value = future;
    const earned = awardDossiers(oldTab.progress, { victory_strider_hl2: 1 }, 'boss_battle_victory', 1000).progress;
    const result = persistDossierProgress(storage, earned);
    expect(result.saved).toBe(false);
    expect(result.warning).toBe('unsupported_version');
    expect(storage.value).toBe(future);
    expect(dossierAccess(result.progress, FIELD_DOSSIERS[0]).usable).toBe(true);
  });
});
