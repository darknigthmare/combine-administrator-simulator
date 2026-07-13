import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { GameState, OnboardingChapterId, TabId } from '../types/game';
import { buildOnboardingView } from '../systems/onboardingSystem';

export function OnboardingScreen({ game, completeChapter, runFirstDayScript, setTab }: {
  game: GameState;
  completeChapter: (chapterId: OnboardingChapterId) => void;
  runFirstDayScript: () => void;
  setTab: (tab: TabId) => void;
}) {
  const view = buildOnboardingView(game);
  const completed = new Set(game.onboarding.completedChapterIds);
  const currentChapter = view.chapters.find((chapter) => !completed.has(chapter.id)) ?? view.chapters[view.chapters.length - 1];
  const currentDone = completed.has(currentChapter.id);

  return (
    <section className="screen onboarding-screen">
      <div className="section-heading onboarding-hero">
        <div>
          <span className="brand-kicker">FORMATION ADMINISTRATEUR / JOUR 001</span>
          <h2>Prise de fonction</h2>
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
          {view.warnings.map((warning) => <p key={warning}><AlertTriangle size={15} /> {warning}</p>)}
        </div>
      )}

      <div className="grid two">
        <article className="panel onboarding-active-track">
          <span className="brand-kicker">DOSSIER {String(currentChapter.order).padStart(2, '0')} / {currentChapter.stage.toUpperCase()}</span>
          <h3>{currentChapter.title}</h3>
          <p>{currentChapter.body}</p>
          <p className="lesson-line">{currentChapter.operatorLesson}</p>
          <div className="tag-row">{currentChapter.linkedTabs.map((tab) => <button key={tab} className="link-chip" onClick={() => setTab(tab)}>{tab}</button>)}</div>
          <button className="primary" disabled={currentDone} onClick={() => completeChapter(currentChapter.id)}>
            {currentDone ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />} {currentDone ? 'Dossier validé' : 'Valider et ouvrir le dossier suivant'}
          </button>
        </article>

        <article className="panel onboarding-first-day">
          <span className="brand-kicker">MANDAT {view.activeTrack.title}</span>
          <h3>{game.onboarding.firstDayScriptCompleted ? 'Briefing terminé' : view.readyForFirstDay ? 'Ordres guidés disponibles' : 'Formation en cours'}</h3>
          <p>{view.activeTrack.doctrine}</p>
          <div className="mini-metrics">
            <span>Score intake <b>{view.intakeScore}%</b></span>
            <span>Dossiers <b>{view.completedCount}/{view.totalChapters}</b></span>
            <span>Ordres préparés <b>3</b></span>
          </div>
          <button className="primary" disabled={!view.readyForFirstDay || game.onboarding.firstDayScriptCompleted} onClick={runFirstDayScript}>Appliquer les ordres guidés</button>
        </article>
      </div>
    </section>
  );
}
