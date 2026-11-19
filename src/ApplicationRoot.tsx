import { lazy, Suspense, useState } from 'react';
import App from './App';

const BossBattleScreen = lazy(() => import('./features/resonance/bossBattle/BossBattleScreen').then(module => ({ default: module.BossBattleScreen })));

/** A separate mount prevents combat inputs from invoking management save effects. */
export default function ApplicationRoot() {
  const [bossBattleOpen, setBossBattleOpen] = useState(() =>
    new URLSearchParams(window.location.search).get('module') === 'resonance-boss-battle',
  );

  const changeMode = (open: boolean) => {
    const url = new URL(window.location.href);
    if (open) url.searchParams.set('module', 'resonance-boss-battle');
    else url.searchParams.delete('module');
    window.history.replaceState(null, '', url);
    setBossBattleOpen(open);
  };

  return bossBattleOpen
    ? <Suspense fallback={<main className="panel" role="status">Ouverture de Half Life Resonance…</main>}>
        <BossBattleScreen onExit={() => changeMode(false)} />
      </Suspense>
    : <App onLaunchBossBattle={() => changeMode(true)} />;
}
