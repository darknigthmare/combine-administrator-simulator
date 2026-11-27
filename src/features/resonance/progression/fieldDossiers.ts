import { BOSS_CATALOG, BOSS_ORDER, FIGHTER_CATALOG } from '../bossBattle/catalog.ts';
import type { BattleState, BossId } from '../bossBattle/types.ts';
import { evaluateCondition } from './conditions.ts';
import type { UnlockCondition } from './conditions.ts';
import { resolveContentAccess } from './access.ts';

export type DossierId = `dossier_${BossId}`;
export interface FieldDossierDefinition {
  id: DossierId;
  bossId: BossId;
  ruleId: string;
  title: string;
  condition: UnlockCondition;
}

export const FIELD_DOSSIERS: readonly FieldDossierDefinition[] = BOSS_CATALOG.map<FieldDossierDefinition>((boss) => ({
  id: `dossier_${boss.id}`,
  bossId: boss.id,
  ruleId: `unlock_dossier_${boss.id}_v1`,
  title: boss.name,
  condition: {
    type: 'any',
    label: 'Une des deux voies suffit',
    conditions: [
      { type: 'counter', counter: `victory_${boss.id}`, atLeast: 1, label: `Réussir l’opération ${boss.name}` },
      { type: 'counter', counter: 'rush_complete', atLeast: 1, label: 'Terminer les quatre opérations du Boss Rush' },
    ],
  },
}));

export interface DossierGrant {
  ruleId: string;
  source: 'boss_battle_victory' | 'legacy_record';
  /** No fabricated victory date when recovering an old record. */
  acquiredAt: number | null;
}
export interface DossierProgress {
  version: 1;
  permanent: Partial<Record<DossierId, DossierGrant>>;
}
export const DOSSIER_STORAGE_KEY = 'resonance.progression.dossiers.v1';
export const emptyDossierProgress = (): DossierProgress => ({ version: 1, permanent: {} });
export type ProgressFacts = Readonly<Record<string, number>>;

/** Existing v1 records are created only for eligible victories by BossBattleScreen. */
export function factsFromLegacyRecords(entries: unknown): ProgressFacts {
  const facts: Record<string, number> = {};
  if (!entries || typeof entries !== 'object' || Array.isArray(entries)) return facts;
  for (const [key, value] of Object.entries(entries).slice(0, 256)) {
    const [fighter, boss, mode, difficulty, extra] = key.split('|');
    if (extra !== undefined || !FIGHTER_CATALOG.some((entry) => entry.id === fighter)
      || !['story', 'normal', 'hard'].includes(difficulty) || !value || typeof value !== 'object') continue;
    if (!('score' in value) || !Number.isFinite(value.score) || (value.score as number) < 0
      || !('activeTicks' in value) || !Number.isFinite(value.activeTicks) || (value.activeTicks as number) < 0
      || !('rank' in value) || !['S', 'A', 'B', 'C'].includes(String(value.rank))) continue;
    if (mode === 'single' && BOSS_ORDER.includes(boss as BossId)) facts[`victory_${boss}`] = 1;
    if (mode === 'rush' && boss === 'all') facts.rush_complete = 1;
  }
  return facts;
}

/** Called from completed simulation results, never from a button or a timer. */
export function factsFromBattle(state: Pick<BattleState, 'bossId' | 'mode' | 'status' | 'result' | 'rushResults'> | null): ProgressFacts {
  if (!state || !state.result?.eligibleForRecord || state.result.outcome !== 'victory') return {};
  if (state.mode === 'single' && state.status === 'victory') return { [`victory_${state.bossId}`]: 1 };
  if (state.mode === 'rush' && state.status === 'complete' && state.rushResults.length === BOSS_ORDER.length
    && state.rushResults.every((result) => result.eligibleForRecord && result.outcome === 'victory')) return { rush_complete: 1 };
  return {};
}

/** Idempotent: retain the original grant and date after retries, migration or replay. */
export function awardDossiers(
  progress: DossierProgress,
  facts: ProgressFacts,
  source: DossierGrant['source'],
  acquiredAt: number | null,
): { progress: DossierProgress; awarded: readonly DossierId[] } {
  const awarded = FIELD_DOSSIERS.filter((dossier) => !progress.permanent[dossier.id] && evaluateCondition(dossier.condition, facts).met);
  if (!awarded.length) return { progress, awarded: [] };
  const permanent = { ...progress.permanent };
  for (const dossier of awarded) permanent[dossier.id] = {
    ruleId: dossier.ruleId,
    source,
    acquiredAt: acquiredAt !== null && Number.isFinite(acquiredAt) && acquiredAt >= 0 ? acquiredAt : null,
  };
  return { progress: { version: 1, permanent }, awarded: awarded.map((dossier) => dossier.id) };
}

export function dossierAccess(progress: DossierProgress, dossier: FieldDossierDefinition) {
  return resolveContentAccess({
    contentId: dossier.id, kind: 'collectible', discovery: 'identified',
    sources: progress.permanent[dossier.id] ? { local_victory: { kind: 'permanent', state: 'active' } } : {},
    technical: { state: 'installed' }, compatibility: { state: 'allowed' }, now: 0,
  });
}

export interface DossierStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}
export interface LoadedDossiers {
  progress: DossierProgress;
  writable: boolean;
  warning: 'unavailable' | 'invalid' | 'unsupported_version' | null;
}

export function loadDossierProgress(storage: DossierStorage | null): LoadedDossiers {
  const empty = emptyDossierProgress();
  if (!storage) return { progress: empty, writable: false, warning: 'unavailable' };
  try {
    const raw = storage.getItem(DOSSIER_STORAGE_KEY);
    if (raw === null) return { progress: empty, writable: true, warning: null };
    let saved: unknown;
    try { saved = JSON.parse(raw); }
    catch { return { progress: empty, writable: true, warning: 'invalid' }; }
    if (!saved || typeof saved !== 'object' || Array.isArray(saved) || !('version' in saved)) return { progress: empty, writable: true, warning: 'invalid' };
    if (saved.version !== 1) return { progress: empty, writable: false, warning: 'unsupported_version' };
    if (!('permanent' in saved) || !saved.permanent || typeof saved.permanent !== 'object' || Array.isArray(saved.permanent)) return { progress: empty, writable: true, warning: 'invalid' };
    // Only known earned local dossiers are accepted, not arbitrary content or external grants.
    for (const dossier of FIELD_DOSSIERS) {
      if (!Object.hasOwn(saved.permanent, dossier.id)) continue;
      const grant: unknown = saved.permanent[dossier.id];
      if (!grant || typeof grant !== 'object' || !('ruleId' in grant) || grant.ruleId !== dossier.ruleId
        || !('source' in grant) || (grant.source !== 'boss_battle_victory' && grant.source !== 'legacy_record')
        || !('acquiredAt' in grant) || !(grant.acquiredAt === null || typeof grant.acquiredAt === 'number' && Number.isFinite(grant.acquiredAt) && grant.acquiredAt >= 0)) continue;
      empty.permanent[dossier.id] = { ruleId: dossier.ruleId, source: grant.source, acquiredAt: grant.acquiredAt as number | null };
    }
    return { progress: empty, writable: true, warning: null };
  } catch {
    // A blocked storage read leaves the combat module usable for the session.
    return { progress: empty, writable: false, warning: 'unavailable' };
  }
}

export function saveDossierProgress(storage: DossierStorage | null, progress: DossierProgress): boolean {
  return persistDossierProgress(storage, progress).saved;
}

/** The first valid persisted grant keeps its source and original acquisition date. */
export function mergeDossierProgress(primary: DossierProgress, additional: DossierProgress): DossierProgress {
  const missing = FIELD_DOSSIERS.filter((dossier) => !primary.permanent[dossier.id] && additional.permanent[dossier.id]);
  if (!missing.length) return primary;
  const permanent = { ...primary.permanent };
  for (const dossier of missing) permanent[dossier.id] = additional.permanent[dossier.id];
  return { version: 1, permanent };
}

export interface PersistedDossiers {
  progress: DossierProgress;
  saved: boolean;
  warning: LoadedDossiers['warning'];
}

/**
 * Re-read before every write: another tab may have earned a dossier since this
 * screen mounted. Unknown future schemas and unreadable storage stay protected.
 * The hook also merges storage events to reconcile concurrent browser tabs.
 */
export function persistDossierProgress(storage: DossierStorage | null, progress: DossierProgress): PersistedDossiers {
  const stored = loadDossierProgress(storage);
  if (!storage || !stored.writable) return { progress, saved: false, warning: stored.warning };
  const merged = mergeDossierProgress(stored.progress, progress);
  // Avoid redundant writes and storage-event loops once all rights are present.
  if (merged === stored.progress && stored.warning === null) return { progress: merged, saved: true, warning: null };
  try {
    storage.setItem(DOSSIER_STORAGE_KEY, JSON.stringify(merged));
    return { progress: merged, saved: true, warning: null };
  } catch {
    return { progress: merged, saved: false, warning: 'unavailable' };
  }
}
