import type { GameState, OnboardingChapterId, OnboardingTrackId, TabId } from '../types/game';
import { onboardingQuickLinks, onboardingTrackOrder, onboardingTracks } from '../data/onboarding';
import { buildOnboardingView } from '../systems/onboardingSystem';

export function OnboardingScreen({ game, startGuidedGame, selectTrack, completeChapter, resetOnboarding, runFirstDayScript, setTab }: {
  game: GameState;
  startGuidedGame: (trackId: OnboardingTrackId) => void;
  selectTrack: (trackId: OnboardingTrackId) => void;
  completeChapter: (chapterId: OnboardingChapterId) => void;
  resetOnboarding: () => void;
  runFirstDayScript: () => void;
  setTab: (tab: TabId) => void;
}) {
  const view = buildOnboardingView(game);
  const completed = new Set(game.onboarding.completedChapterIds);

  return (
    <section className="screen onboarding-screen">
      <div className="section-heading onboarding-hero">
        <div>
          <span className="brand-kicker">COAN INTAKE / ADMINISTRATOR TRAINING</span>
          <h2>Tutoriel d’intro premium</h2>
          <p>{view.activeTrack.subtitle}</p>
        </div>
        <div className="onboarding-score-card">
          <span>Progression intake</span>
          <b>{view.progress}%</b>
          <small>{view.completedCount}/{view.totalChapters} dossiers validés</small>
        </div>
      </div>

      <div className="onboarding-progress-shell">
        <div className="onboarding-progress-bar" style={{ width: `${view.progress}%` }} />
      </div>

      {view.warnings.length > 0 && (
        <div className="warning-stack">
          {view.warnings.map((warning) => <p key={warning}>⚠ {warning}</p>)}
        </div>
      )}

      <div className="grid two">
        <article className="panel onboarding-active-track">
          <span className="brand-kicker">PISTE ACTIVE</span>
          <h3>{view.activeTrack.title}</h3>
          <p>{view.activeTrack.doctrine}</p>
          <div className="tag-row">{view.activeTrack.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <ul>
            {view.activeTrack.briefingLines.map((line) => <li key={line}>{line}</li>)}
          </ul>
          <div className="action-row">
            <button onClick={() => startGuidedGame(view.activeTrackId)}>Nouvelle partie guidée</button>
            <button className="secondary" onClick={resetOnboarding}>Réinitialiser intake</button>
          </div>
        </article>

        <article className="panel onboarding-first-day">
          <span className="brand-kicker">PREMIÈRE JOURNÉE SCRIPTÉE</span>
          <h3>{game.onboarding.firstDayScriptCompleted ? 'Script déjà exécuté' : view.readyForFirstDay ? 'Script prêt' : 'Script verrouillé'}</h3>
          <p>Cette séquence applique une ouverture prudente : observation, secteur critique, rationnement modéré, BreenCast mesuré et rapport non-suicidaire.</p>
          <div className="mini-metrics">
            <span>Score intake <b>{view.intakeScore}%</b></span>
            <span>Track <b>{view.activeTrackId}</b></span>
            <span>Tab départ <b>{view.activeTrack.startingTab}</b></span>
          </div>
          <button disabled={!view.readyForFirstDay || game.onboarding.firstDayScriptCompleted} onClick={runFirstDayScript}>Exécuter journée guidée</button>
        </article>
      </div>

      <section className="panel">
        <div className="section-heading compact">
          <div><span className="brand-kicker">PISTES GUIDÉES</span><h3>Choix rapide de doctrine</h3></div>
        </div>
        <div className="track-grid">
          {onboardingTrackOrder.map((trackId) => {
            const track = onboardingTracks[trackId];
            const active = trackId === view.activeTrackId;
            return (
              <article key={track.id} className={`track-card ${active ? 'active' : ''}`}>
                <span>{track.recommendedCity ? `City ${track.recommendedCity}` : 'City custom'}</span>
                <h4>{track.title}</h4>
                <p>{track.subtitle}</p>
                <div className="track-meta">
                  <b>{track.timeline}</b><b>{track.scenario}</b><b>{track.profile}</b>
                </div>
                <div className="action-row">
                  <button onClick={() => selectTrack(track.id)}>{active ? 'Piste active' : 'Sélectionner'}</button>
                  <button className="secondary" onClick={() => startGuidedGame(track.id)}>Démarrer</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading compact">
          <div><span className="brand-kicker">BRIEFING PROGRESSIF</span><h3>Dossiers à comprendre avant de jouer vite</h3></div>
        </div>
        <div className="onboarding-chapter-list">
          {view.chapters.map((chapter) => {
            const done = completed.has(chapter.id);
            return (
              <article key={chapter.id} className={`chapter-card ${done ? 'done' : ''}`}>
                <div className="chapter-index">{String(chapter.order).padStart(2, '0')}</div>
                <div>
                  <span className="brand-kicker">{chapter.stage.toUpperCase()}</span>
                  <h4>{chapter.title}</h4>
                  <p>{chapter.body}</p>
                  <p className="lesson-line">{chapter.operatorLesson}</p>
                  <div className="tag-row">{chapter.linkedTabs.map((tab) => <button key={tab} className="link-chip" onClick={() => setTab(tab)}>{tab}</button>)}</div>
                </div>
                <button disabled={done} onClick={() => completeChapter(chapter.id)}>{done ? 'Validé' : 'Valider'}</button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid two">
        <article className="panel">
          <span className="brand-kicker">PLAN JOUR 001</span>
          <h3>Séquence recommandée</h3>
          <div className="first-day-list">
            {view.firstDayActions.map((action) => (
              <button key={action.id} className="first-day-action" onClick={() => setTab(action.relatedTab)}>
                <b>{action.order}. {action.title}</b>
                <span>{action.moduleLabel} — {action.description}</span>
                <small>{action.expectedEffect}</small>
              </button>
            ))}
          </div>
        </article>

        <article className="panel">
          <span className="brand-kicker">RACCOURCIS COAN</span>
          <h3>Modules à ouvrir sans te perdre</h3>
          <div className="quick-link-list">
            {onboardingQuickLinks.map((link) => <button key={link.tab} onClick={() => setTab(link.tab)}><b>{link.label}</b><span>{link.reason}</span></button>)}
          </div>
          <div className="briefing-log">
            {game.onboarding.briefingLog.slice(0, 8).map((line) => <p key={line}>{line}</p>)}
          </div>
        </article>
      </section>
    </section>
  );
}
