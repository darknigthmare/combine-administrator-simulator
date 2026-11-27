import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ARENA_WIDTH, BOSS_CATALOG, BOSS_ORDER, FIGHTER_CATALOG, getBoss, getFighter, TICKS_PER_SECOND } from './catalog';
import { createBattle, nextEncounter, restartBattle, stepBattle } from './engine';
import { renderBattle, SCENE_HEIGHT } from './renderer';
import type { BattleInput, BattleMode, BattleState, BossId, Difficulty, FighterId } from './types';
import { FieldDossiers } from '../progression/FieldDossiers';
import { useFieldDossiers } from '../progression/useFieldDossiers';
import './BossBattleScreen.css';

const RECORD_KEY = 'resonance.bossBattle.records.v1';
type RecordEntry = { score: number; rank: string; activeTicks: number };
type LocalRecords = Record<string, RecordEntry>;
type Action = Exclude<keyof BattleInput, 'move'> | 'left' | 'right';
const MODE_LABELS: Record<BattleMode, string> = { single: 'Opération', rush: 'Boss Rush', training: 'Entraînement' };
const DIFFICULTY_LABELS: Record<Difficulty, string> = { story: 'Découverte', normal: 'Normal', hard: 'Vétéran' };
const FIGHTER_GLYPHS: Record<FighterId, string> = { gordon_hl2: 'λ', alyx_hl2: 'A', barney_hl2: 'B', shephard_op4: 'H', vortigaunt_hl2: 'V', combine_elite_hl2: '◎' };
const KEY_ACTIONS: Record<string, Action> = {
  ArrowLeft: 'left', KeyA: 'left', KeyQ: 'left', ArrowRight: 'right', KeyD: 'right',
  ArrowUp: 'jump', KeyW: 'jump', KeyZ: 'jump', Space: 'jump',
  KeyJ: 'light', KeyK: 'ranged', KeyL: 'special', KeyE: 'interact',
  ShiftLeft: 'dodge', ShiftRight: 'dodge', KeyR: 'target', Escape: 'pause', KeyP: 'pause', Enter: 'skipIntro',
};
const TOUCH_ACTIONS: { action: Action; key: string; label: string }[] = [
  { action: 'left', key: '← / Q', label: 'Gauche' }, { action: 'right', key: '→ / D', label: 'Droite' },
  { action: 'jump', key: 'ESPACE', label: 'Saut' }, { action: 'dodge', key: 'MAJ', label: 'Esquive' },
  { action: 'light', key: 'J', label: 'Frappe' }, { action: 'ranged', key: 'K', label: 'Tir' },
  { action: 'special', key: 'L', label: 'Technique' }, { action: 'interact', key: 'E', label: 'Interagir' },
];

function readRecords(): LocalRecords {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(RECORD_KEY) ?? 'null');
    if (!saved || typeof saved !== 'object' || !('version' in saved) || saved.version !== 1 || !('entries' in saved) || !saved.entries || typeof saved.entries !== 'object') return {};
    const safe: LocalRecords = {};
    for (const [key, value] of Object.entries(saved.entries).slice(0, 256)) {
      if (!/^[a-z0-9_]+\|[a-z0-9_]+\|(single|rush)\|(story|normal|hard)$/.test(key) || !value || typeof value !== 'object') continue;
      if ('score' in value && Number.isFinite(value.score) && (value.score as number) >= 0 && 'activeTicks' in value && Number.isFinite(value.activeTicks) && (value.activeTicks as number) >= 0 && 'rank' in value && ['S', 'A', 'B', 'C'].includes(String(value.rank))) {
        safe[key] = { score: value.score as number, rank: String(value.rank), activeTicks: value.activeTicks as number };
      }
    }
    return safe;
  } catch { return {}; }
}

function recordKey(fighterId: FighterId, bossId: BossId, mode: BattleMode, difficulty: Difficulty) {
  return `${fighterId}|${mode === 'rush' ? 'all' : bossId}|${mode}|${difficulty}`;
}

function minimumRank(results: readonly { rank: string }[]) {
  const ranks = ['S', 'A', 'B', 'C'];
  const indices = results.map((result) => ranks.indexOf(result.rank)).filter((index) => index >= 0);
  return indices.length ? ranks[Math.max(...indices)] : 'C';
}

function timeLabel(ticks: number) {
  const seconds = Math.floor(ticks / TICKS_PER_SECOND);
  return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}

function bossCategory(id: BossId) {
  return id === 'strider_hl2' ? 'Synth terrestre' : id === 'dropship_hl2' ? 'Transport' : id === 'gunship_hl2' ? 'Synth aérien' : 'Créature Xen';
}

function briefCounterplay(id: BossId) {
  switch (id) {
    case 'strider_hl2': return 'Rejoindre le poste RPG, tirer, puis se remettre à couvert. Les tirs ordinaires ne percent pas son blindage.';
    case 'dropship_hl2': return 'Viser la nacelle, éliminer les renforts et intercepter le débarquement. Le transport lui-même est invulnérable.';
    case 'gunship_hl2': return 'Lancer les roquettes après ses rafales : le Gunship peut les intercepter. Lire les passes et conserver un abri.';
    case 'gargantua_hl1': return 'Armer les deux générateurs, puis déclencher la décharge quand Gargantua passe dans la cage. Éviter les flammes et sauter les ondes.';
  }
}

function Preview({ fighterId, bossId, reducedMotion }: { fighterId: FighterId; bossId: BossId; reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const state = createBattle({ fighterId, bossId });
    let frame = 0, animation = 0;
    let alive = true;
    const draw = () => {
      if (!alive || !canvasRef.current) return;
      renderBattle(canvasRef.current, { ...state, tick: reducedMotion ? 0 : frame++ }, { preview: true, reducedMotion });
      animation = requestAnimationFrame(draw);
    };
    draw();
    return () => { alive = false; cancelAnimationFrame(animation); };
  }, [fighterId, bossId, reducedMotion]);
  return <canvas ref={canvasRef} width={ARENA_WIDTH} height={SCENE_HEIGHT} aria-hidden="true" />;
}

export function BossBattleScreen({ onExit }: { onExit: () => void }) {
  const [fighterId, setFighterId] = useState<FighterId>('gordon_hl2');
  const [bossId, setBossId] = useState<BossId>('strider_hl2');
  const [mode, setMode] = useState<BattleMode>('single');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [snapshot, setSnapshot] = useState<BattleState | null>(null);
  const [records, setRecords] = useState<LocalRecords>(readRecords);
  const dossierCollection = useFieldDossiers(records, snapshot);
  const [recordSavingUnavailable, setRecordSavingUnavailable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const stateRef = useRef<BattleState | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const overlayButtonRef = useRef<HTMLButtonElement>(null);
  const heldRef = useRef(new Map<string, Action>());
  const queuedRef = useRef(new Set<Action>());
  const runSerial = useRef(0);
  const recordedRef = useRef('');
  const isPlaying = snapshot !== null;
  const battleStatus = snapshot?.status;
  const selectedBoss = getBoss(mode === 'rush' ? BOSS_ORDER[0] : bossId);
  const selectedFighter = getFighter(fighterId);
  const visibleBoss = snapshot ? getBoss(snapshot.bossId) : selectedBoss;
  const visibleFighter = snapshot ? getFighter(snapshot.fighterId) : selectedFighter;
  const record = records[recordKey(fighterId, bossId, mode, difficulty)];

  const clearInput = useCallback(() => { heldRef.current.clear(); queuedRef.current.clear(); }, []);

  const installState = useCallback((state: BattleState | null) => {
    clearInput();
    stateRef.current = state;
    setSnapshot(state);
  }, [clearInput]);

  const actionNow = useCallback((input: BattleInput) => {
    if (!stateRef.current) return;
    const next = stepBattle(stateRef.current, input);
    stateRef.current = next;
    setSnapshot(next);
  }, []);

  const start = useCallback(() => {
    runSerial.current += 1;
    installState(createBattle({ fighterId, bossId: mode === 'rush' ? BOSS_ORDER[0] : bossId, mode, difficulty, seed: 17011998 }));
  }, [fighterId, bossId, mode, difficulty, installState]);

  const leaveBattle = useCallback(() => { installState(null); }, [installState]);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const changed = () => setReducedMotion(media.matches);
    media.addEventListener('change', changed);
    return () => media.removeEventListener('change', changed);
  }, []);

  useEffect(() => {
    if (!isPlaying) { headingRef.current?.focus({ preventScroll: true }); return; }
    arenaRef.current?.focus({ preventScroll: true });
    let last = 0, accumulator = 0, lastPublish = 0, animation = 0;
    const interval = 1000 / TICKS_PER_SECOND;
    const frame = (now: number) => {
      const before = stateRef.current;
      if (!before) return;
      if (last === 0) last = now;
      accumulator += Math.min(100, Math.max(0, now - last));
      last = now;
      let next = before;
      while (accumulator >= interval) {
        const activeActions = new Set(heldRef.current.values());
        const left = activeActions.has('left') || queuedRef.current.has('left'), right = activeActions.has('right') || queuedRef.current.has('right');
        const input: BattleInput = { move: left === right ? 0 : left ? -1 : 1, ranged: activeActions.has('ranged') };
        for (const action of queuedRef.current) if (action !== 'left' && action !== 'right') input[action] = true;
        queuedRef.current.clear();
        next = stepBattle(next, input);
        accumulator -= interval;
      }
      stateRef.current = next;
      if (canvasRef.current) renderBattle(canvasRef.current, next, { reducedMotion });
      if (now - lastPublish >= 100 || before.status !== next.status) { setSnapshot(next); lastPublish = now; }
      animation = requestAnimationFrame(frame);
    };
    animation = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(animation); clearInput(); };
  }, [isPlaying, reducedMotion, clearInput]);

  useEffect(() => {
    if (!isPlaying) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.altKey || event.metaKey || event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) return;
      const action = KEY_ACTIONS[event.code];
      if (!action) return;
      if (event.target instanceof HTMLButtonElement && ['Space', 'Enter'].includes(event.code)) return;
      event.preventDefault();
      if (event.repeat) return;
      const state = stateRef.current;
      if (action === 'pause') { clearInput(); actionNow({ pause: true }); return; }
      if (state?.status === 'intro' && (action === 'skipIntro' || action === 'jump')) { actionNow({ skipIntro: true }); return; }
      if (state?.status !== 'active') return;
      heldRef.current.set(event.code, action);
      if (action !== 'left' && action !== 'right') queuedRef.current.add(action);
    };
    const keyup = (event: KeyboardEvent) => { heldRef.current.delete(event.code); };
    const pauseOnBlur = () => {
      clearInput();
      if (stateRef.current && ['active', 'intro'].includes(stateRef.current.status)) actionNow({ pause: true });
    };
    const visibility = () => { if (document.hidden) pauseOnBlur(); };
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    window.addEventListener('blur', pauseOnBlur);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.removeEventListener('keydown', keydown); window.removeEventListener('keyup', keyup);
      window.removeEventListener('blur', pauseOnBlur); document.removeEventListener('visibilitychange', visibility);
      clearInput();
    };
  }, [isPlaying, actionNow, clearInput]);

  useEffect(() => {
    if (battleStatus && ['intro', 'paused', 'victory', 'defeat', 'intermission', 'complete'].includes(battleStatus)) overlayButtonRef.current?.focus({ preventScroll: true });
    else if (battleStatus === 'active') arenaRef.current?.focus({ preventScroll: true });
  }, [battleStatus]);

  useEffect(() => {
    const state = snapshot;
    if (!state?.result?.eligibleForRecord || state.result.outcome !== 'victory' || (state.mode === 'rush' && state.status !== 'complete')) return;
    const fingerprint = `${runSerial.current}:${state.bossId}:${state.activeTicks}:${state.result.score}`;
    if (recordedRef.current === fingerprint) return;
    recordedRef.current = fingerprint;
    const results = state.mode === 'rush' && state.rushResults.length ? state.rushResults : [state.result];
    const entry: RecordEntry = {
      score: results.reduce((sum, result) => sum + result.score, 0),
      activeTicks: results.reduce((sum, result) => sum + result.activeTicks, 0), rank: state.mode === 'rush' ? minimumRank(results) : state.result.rank,
    };
    const key = recordKey(state.fighterId, state.bossId, state.mode, state.difficulty);
    if (records[key] && records[key].score > entry.score) return;
    if (records[key] && records[key].score === entry.score && records[key].activeTicks <= entry.activeTicks) return;
    const next = { ...records, [key]: entry };
    try { localStorage.setItem(RECORD_KEY, JSON.stringify({ version: 1, entries: next })); setRecordSavingUnavailable(false); }
    catch { setRecordSavingUnavailable(true); }
    setRecords(next);
  }, [snapshot, records]);

  const retry = () => {
    if (!stateRef.current) return;
    runSerial.current += 1;
    const previous = stateRef.current;
    installState(previous.mode === 'rush'
      ? createBattle({ fighterId: previous.fighterId, bossId: BOSS_ORDER[0], mode: 'rush', difficulty: previous.difficulty, seed: previous.seed })
      : restartBattle(previous));
  };

  const touchStart = (id: string, action: Action) => {
    if (stateRef.current?.status !== 'active') return;
    heldRef.current.set(id, action);
    if (action !== 'left' && action !== 'right') queuedRef.current.add(action);
  };
  const touchEnd = (id: string) => { heldRef.current.delete(id); };
  const activePart = snapshot?.boss.parts[snapshot.boss.target];
  const resultStates = ['victory', 'defeat', 'intermission', 'complete'];
  const result = snapshot?.result;
  const isFinalRush = snapshot?.mode === 'rush' && snapshot.status === 'complete';
  const resultScore = isFinalRush ? snapshot.rushResults.reduce((sum, value) => sum + value.score, 0) : result?.score ?? 0;
  const resultTicks = isFinalRush ? snapshot.rushResults.reduce((sum, value) => sum + value.activeTicks, 0) : result?.activeTicks ?? 0;
  const resultRank = isFinalRush ? minimumRank(snapshot.rushResults) : result?.rank ?? '';

  return <main className="bb-screen">
    <header className="bb-topbar">
      <div className="bb-brand"><b aria-hidden="true">λ</b> HALF-LIFE / RESONANCE</div>
      <span className="bb-status">PROTOCOLE D’ENGAGEMENT · SOLO LOCAL</span>
      <button className="bb-back" onClick={() => { clearInput(); onExit(); }}>← Menu principal</button>
    </header>

    <div className="bb-shell">
      {!snapshot ? <>
        <section className="bb-hero" aria-labelledby="boss-battle-title">
          <div className="bb-hero-copy">
            <span className="bb-overline">Mode annexe 02 / Opérations spéciales</span>
            <h1 id="boss-battle-title" aria-label="Boss Battle" ref={headingRef} tabIndex={-1}>BOSS<span>BATTLE</span></h1>
            <p>Choisissez votre combattant. Analysez la menace. Trouvez l’ouverture.</p>
            <div className="bb-hero-mark">06 COMBATTANTS &nbsp; / &nbsp; 04 OPÉRATIONS</div>
          </div>
          <div className="bb-preview">
            <Preview fighterId={fighterId} bossId={selectedBoss.id} reducedMotion={reducedMotion} />
            <span className="bb-preview-id">MENACE / {String(BOSS_ORDER.indexOf(selectedBoss.id) + 1).padStart(2, '0')}</span>
            <div className="bb-preview-heading"><span className="bb-overline">{selectedBoss.sourceGame} · {bossCategory(selectedBoss.id)}</span><b>{selectedBoss.name}</b><small>{selectedBoss.arena}</small></div>
          </div>
        </section>

        <div className="bb-selection-layout">
          <section className="bb-select-main" aria-label="Sélection du combattant et de la menace">
            <div className="bb-section-label"><h2>01 — Combattant</h2><small>Profils de combat pilotes</small></div>
            <div className="bb-fighters">
              {FIGHTER_CATALOG.map((fighter, index) => <button className="bb-fighter" key={fighter.id} aria-pressed={fighterId === fighter.id} onClick={() => setFighterId(fighter.id)} style={{ '--fighter-color': fighter.color } as CSSProperties}>
                <span className="bb-fighter-index">0{index + 1}</span><span className="bb-fighter-glyph" aria-hidden="true">{FIGHTER_GLYPHS[fighter.id]}</span>
                <span><b>{fighter.name}</b><small>{fighter.role}</small></span>
              </button>)}
            </div>
            <div className="bb-section-label"><h2>02 — Menace</h2><small>{mode === 'rush' ? 'Parcours de quatre opérations' : 'Choix libre'}</small></div>
            <div className="bb-bosses">
              {BOSS_CATALOG.map((boss, index) => <button className="bb-boss" key={boss.id} aria-pressed={selectedBoss.id === boss.id} disabled={mode === 'rush' && index > 0} onClick={() => setBossId(boss.id)}>
                <small>OP / 0{index + 1}</small><b>{boss.name}</b><span>{bossCategory(boss.id)}</span>
              </button>)}
            </div>
            {mode === 'rush' && <p className="bb-rush-note">Strider → Dropship → Gunship → Gargantua. Le rang final est le plus bas obtenu sur les quatre opérations.</p>}
          </section>

          <aside className="bb-mission" aria-label="Briefing de mission">
            <div className="bb-section-label"><h2>03 — Briefing</h2><small>{selectedBoss.sourceGame}</small></div>
            <h3>{selectedBoss.objective}</h3>
            <p>{selectedBoss.arena}</p>
            <div className="bb-counterplay"><b>Approche tactique</b>{briefCounterplay(selectedBoss.id)}</div>
            <p><strong>{selectedFighter.specialName}</strong> — {selectedFighter.specialHint}</p>
            <div className="bb-mission-form">
              <label htmlFor="bb-mode">Format<select id="bb-mode" value={mode} onChange={(event) => setMode(event.target.value as BattleMode)}><option value="single">Opération libre</option><option value="rush">Boss Rush · 4 boss</option><option value="training">Entraînement</option></select></label>
              <label htmlFor="bb-difficulty">Difficulté<select id="bb-difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value as Difficulty)}><option value="story">Découverte</option><option value="normal">Normal</option><option value="hard">Vétéran</option></select></label>
              <button className="bb-start" onClick={start}><span>Lancer {mode === 'rush' ? 'le Boss Rush' : mode === 'training' ? 'l’entraînement' : 'l’opération'}</span><span aria-hidden="true">↗</span></button>
            </div>
            {record && <div className="bb-record">RECORD LOCAL / {record.score.toLocaleString('fr-FR')} PTS · {timeLabel(record.activeTicks)} · RANG {record.rank}</div>}
          </aside>
        </div>
      </> : <>
        <section className="bb-fight-heading">
          <div><span className="bb-overline">{MODE_LABELS[snapshot.mode]} / {DIFFICULTY_LABELS[snapshot.difficulty]}{snapshot.mode === 'rush' ? ` / ${snapshot.rushIndex + 1} sur ${BOSS_ORDER.length}` : ''}</span><h1>{visibleBoss.name} <span aria-hidden="true">/</span> {visibleBoss.arena.split(' — ')[0]}</h1></div>
          <div><button className="bb-small-button" onClick={() => { clearInput(); actionNow({ pause: true }); }} disabled={!['active', 'intro', 'paused'].includes(snapshot.status)}>{snapshot.status === 'paused' ? 'Reprendre' : 'Pause'} · Échap</button><button className="bb-small-button" onClick={leaveBattle}>Sélection</button></div>
        </section>

        <div className="bb-hud" aria-label="État du combat">
          <div className="bb-hud-side"><div><b>{visibleFighter.name}</b><span>{Math.max(0, snapshot.player.hp).toLocaleString('fr-FR')}</span></div><div className="bb-meter" role="progressbar" aria-label="Vie du combattant" aria-valuenow={Math.max(0, snapshot.player.hp)} aria-valuemin={0} aria-valuemax={snapshot.player.maxHp}><i style={{ width: `${Math.max(0, snapshot.player.hp / snapshot.player.maxHp * 100)}%` }} /></div><small>MUNITIONS {snapshot.player.ammo}/{snapshot.player.maxAmmo} · TECHNIQUE {snapshot.player.charge}%</small></div>
          <div className="bb-clock"><strong>{timeLabel(snapshot.activeTicks)}</strong><small>TEMPS ACTIF</small></div>
          <div className="bb-hud-side"><div><b>{snapshot.bossId === 'dropship_hl2' ? 'Nacelle du Dropship' : visibleBoss.name}</b><span>{Math.max(0, Math.ceil(snapshot.boss.hp / snapshot.boss.maxHp * 100))}%</span></div><div className="bb-meter boss" role="progressbar" aria-label={snapshot.bossId === 'dropship_hl2' ? 'Intégrité de la nacelle' : 'Vie du boss'} aria-valuenow={Math.max(0, snapshot.boss.hp)} aria-valuemin={0} aria-valuemax={snapshot.boss.maxHp}><i style={{ width: `${Math.max(0, snapshot.boss.hp / snapshot.boss.maxHp * 100)}%` }} /></div><small>PHASE {snapshot.boss.phase + 1} · {visibleBoss.phases[snapshot.boss.phase]}</small></div>
        </div>

        <div className="bb-arena" ref={arenaRef} tabIndex={0} role="region" aria-label={`Arène de combat contre ${visibleBoss.name}. Commandes décrites sous l’arène.`}>
          <canvas ref={canvasRef} width={ARENA_WIDTH} height={SCENE_HEIGHT} aria-label={`Combat en cours contre ${visibleBoss.name}`} />
          <span className="bb-arena-caption">{visibleBoss.arena} / Visualisation tactique</span>
          {snapshot.status === 'active' && snapshot.boss.attack && <div className="bb-telegraph">{snapshot.boss.attack.telegraphTicks > 0 ? '⚠ ' : ''}{snapshot.boss.attack.label.toUpperCase()}</div>}

          {snapshot.status === 'intro' && <div className="bb-overlay"><section className="bb-overlay-card" aria-labelledby="bb-intro-title"><span className="bb-overline">Objectif de l’opération</span><h2 id="bb-intro-title">{visibleBoss.name}</h2><p>{visibleBoss.objective}</p><p className="bb-counterplay">{briefCounterplay(snapshot.bossId)}</p><button ref={overlayButtonRef} className="bb-start" onClick={() => actionNow({ skipIntro: true })}><span>Engager le combat</span><span aria-hidden="true">→</span></button></section></div>}

          {snapshot.status === 'paused' && <div className="bb-overlay"><section className="bb-overlay-card" aria-labelledby="bb-pause-title"><span className="bb-overline">Simulation suspendue</span><h2 id="bb-pause-title">Pause</h2><p>Le chronomètre et toutes les attaques sont arrêtés.</p><button ref={overlayButtonRef} className="bb-start" onClick={() => { clearInput(); actionNow({ pause: true }); }}><span>Reprendre le combat</span><span aria-hidden="true">→</span></button><button className="bb-small-button" onClick={retry}>{snapshot.mode === 'rush' ? 'Recommencer le parcours' : 'Recommencer'}</button></section></div>}

          {result && resultStates.includes(snapshot.status) && <div className="bb-overlay"><section className="bb-overlay-card" aria-labelledby="bb-result-title"><span className="bb-overline">{isFinalRush ? 'Boss Rush terminé' : result.outcome === 'victory' ? 'Rapport de mission' : 'Fin de tentative'}</span><h2 id="bb-result-title">{result.outcome === 'defeat' ? 'Opération échouée' : isFinalRush ? 'Parcours accompli' : snapshot.bossId === 'dropship_hl2' ? 'Débarquement intercepté' : 'Menace neutralisée'}</h2><p>{result.objectiveLabel}</p><div className="bb-result-grid"><div><strong>{resultScore.toLocaleString('fr-FR')}</strong><small>Points</small></div><div><strong>{timeLabel(resultTicks)}</strong><small>Temps actif</small></div><div><strong>{resultRank === 'TRAINING' ? '—' : resultRank}</strong><small>{snapshot.mode === 'training' ? 'Entraînement' : isFinalRush ? 'Rang du parcours' : 'Rang'}</small></div></div>{isFinalRush && <p>Le rang du parcours correspond au plus bas rang des quatre opérations.</p>}<p>{snapshot.mode === 'training' ? 'L’entraînement ne modifie pas les records.' : snapshot.status === 'intermission' ? 'L’étape suivante poursuit le même parcours.' : result.outcome === 'defeat' ? briefCounterplay(snapshot.bossId) : !result.eligibleForRecord ? 'Parcours avec reprise : cette tentative est hors records.' : recordSavingUnavailable ? 'Votre navigateur ne permet pas de conserver ce record.' : 'Meilleur score conservé localement pour ce combattant, ce format et cette difficulté.'}</p><div className="bb-overlay-actions">{snapshot.status === 'intermission' ? <button ref={overlayButtonRef} className="bb-start" onClick={() => { if (stateRef.current) installState(nextEncounter(stateRef.current)); }}><span>Opération suivante</span><span aria-hidden="true">→</span></button> : <button ref={overlayButtonRef} className="bb-start" onClick={retry}><span>{snapshot.mode === 'rush' ? 'Rejouer le parcours' : 'Réessayer'}</span><span aria-hidden="true">↻</span></button>}<button className="bb-small-button" onClick={leaveBattle}>Changer de sélection</button></div></section></div>}
        </div>

        <div className="bb-objective-strip"><p className="bb-live-message" aria-live="polite" aria-atomic="true">{snapshot.message}</p><span>{snapshot.bossId === 'dropship_hl2' ? `${snapshot.minions.filter((minion) => minion.hp > 0).length} RENFORTS` : 'ÉQUIPEMENT D’ARÈNE : E'}</span></div>
        <div className="bb-parts" aria-label="Cibles du boss">
          {snapshot.boss.parts.map((part, index) => <button key={part.id} aria-pressed={snapshot.boss.target === index} onClick={() => {
            const state = stateRef.current;
            if (!state || state.status !== 'active') return;
            let next = state;
            for (let i = 0; i < state.boss.parts.length && next.boss.target !== index; i++) next = stepBattle(next, { target: true });
            stateRef.current = next; setSnapshot(next);
          }} disabled={snapshot.status !== 'active'}>{snapshot.boss.target === index ? '◎ ' : '○ '}{part.label}<span>{part.immune ? 'Corps invulnérable' : part.hp <= 0 ? 'Neutralisée' : `${Math.ceil(part.hp / part.maxHp * 100)}% d’intégrité`}</span></button>)}
          <button onClick={() => queuedRef.current.add('target')} disabled={snapshot.status !== 'active'}>R — Changer de cible<span>{activePart?.label}</span></button>
        </div>
        <div className="bb-controls" aria-label="Commandes tactiles et clavier">
          {TOUCH_ACTIONS.map(({ action, key, label }) => <button key={action} disabled={snapshot.status !== 'active'} aria-label={label} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); touchStart(`pointer:${event.pointerId}`, action); }} onPointerUp={(event) => touchEnd(`pointer:${event.pointerId}`)} onPointerCancel={(event) => touchEnd(`pointer:${event.pointerId}`)} onLostPointerCapture={(event) => touchEnd(`pointer:${event.pointerId}`)} onClick={(event) => { if (event.detail === 0) queuedRef.current.add(action); }}><kbd>{key}</kbd>{label}</button>)}
        </div>
        <div className="bb-controls-help"><p>Flèches ou ZQSD / WASD · R : cible · Échap : pause. Approchez d’un poste puis appuyez sur E.</p><p>{visibleFighter.specialName} — {visibleFighter.specialHint}</p></div>
      </>}
      {snapshot && resultStates.includes(snapshot.status) && dossierCollection.newlyAwarded.length > 0 && <p className="bb-dossiers-result" role="status">{dossierCollection.newlyAwarded.length === 1 ? 'Un dossier de terrain est ouvert' : `${dossierCollection.newlyAwarded.length} dossiers de terrain sont ouverts`}. Consultez votre collection en revenant à la sélection.</p>}
      <FieldDossiers
        progress={dossierCollection.progress}
        visible={!isPlaying}
        reducedMotion={reducedMotion}
        newlyAwarded={dossierCollection.newlyAwarded}
        warning={dossierCollection.warning}
        onRevealComplete={dossierCollection.acknowledge}
        onSelectOperation={(id) => { setBossId(id); setMode('single'); headingRef.current?.focus(); }}
      />
      <footer className="bb-footer"><span>Prototype jouable • visuels de travail</span><span>Assets définitifs 1:1 à produire · Progression du mode indépendante</span></footer>
    </div>
  </main>;
}
