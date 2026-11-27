import { useCallback, useEffect, useRef, useState } from 'react';
import type { BattleState } from '../bossBattle/types';
import {
  awardDossiers, DOSSIER_STORAGE_KEY, factsFromBattle, factsFromLegacyRecords, loadDossierProgress, persistDossierProgress,
} from './fieldDossiers';
import type { DossierGrant, DossierId, DossierStorage, ProgressFacts } from './fieldDossiers';

function browserStorage(): DossierStorage | null {
  try { return typeof window !== 'undefined' ? window.localStorage : null; }
  catch { return null; }
}

/** Local solo collection only. No account, remote payment or membership authority. */
export function useFieldDossiers(records: unknown, battle: BattleState | null) {
  const [loaded] = useState(() => loadDossierProgress(browserStorage()));
  const [progress, setProgress] = useState(loaded.progress);
  const [newlyAwarded, setNewlyAwarded] = useState<readonly DossierId[]>([]);
  const [warning, setWarning] = useState(loaded.warning);
  const current = useRef(loaded.progress);

  const grant = useCallback((facts: ProgressFacts, source: DossierGrant['source'], acquiredAt: number | null) => {
    const result = awardDossiers(current.current, facts, source, acquiredAt);
    if (!result.awarded.length) return;
    // The entitlement is stored before any reveal animation. A failed write does
    // not remove the in-memory reward or alter the existing combat records.
    const persisted = persistDossierProgress(browserStorage(), result.progress);
    current.current = persisted.progress;
    setWarning(persisted.warning);
    setProgress(persisted.progress);
    if (source === 'boss_battle_victory') setNewlyAwarded((previous) => [...new Set([...previous, ...result.awarded])]);
  }, []);

  useEffect(() => { grant(factsFromLegacyRecords(records), 'legacy_record', null); }, [records, grant]);
  useEffect(() => { grant(factsFromBattle(battle), 'boss_battle_victory', Date.now()); }, [battle, grant]);
  useEffect(() => {
    const synchronize = (event: StorageEvent) => {
      if (event.key !== DOSSIER_STORAGE_KEY || event.storageArea !== browserStorage()) return;
      const before = current.current;
      const persisted = persistDossierProgress(browserStorage(), before);
      current.current = persisted.progress;
      setProgress(persisted.progress);
      setWarning(persisted.warning);
    };
    window.addEventListener('storage', synchronize);
    return () => window.removeEventListener('storage', synchronize);
  }, []);
  const acknowledge = useCallback(() => setNewlyAwarded([]), []);
  return { progress, newlyAwarded, warning, acknowledge };
}
