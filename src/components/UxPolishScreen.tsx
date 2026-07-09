import { useMemo, useState } from 'react';
import type { GameState, TabId } from '../types/game';
import { uxDensityPresets } from '../data/uxPolish';
import { buildUxPolishReport } from '../systems/uxPolishSystem';

export function UxPolishScreen({ game, nav, setTab }: { game: GameState; nav: Array<[TabId, string]>; setTab: (tab: TabId) => void }) {
  const report = useMemo(() => buildUxPolishReport(game, nav), [game, nav]);
  const [copied, setCopied] = useState(false);

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(report.exportText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return <div className="screen-stack ux-polish-screen">
    <section className="panel ux-polish-hero">
      <div>
        <span className="brand-kicker">{report.version} / INTERFACE QUALITY PASS</span>
        <h2>Polish UX premium / Tauri desktop</h2>
        <p>{report.headline}</p>
        <p className="lore-note">Objectif : garder l’interface brutale, bureaucratique et froide, mais exploitable pendant une partie longue.</p>
      </div>
      <div className={`ux-score ${report.score >= 88 ? 'ok' : report.score >= 74 ? 'watch' : report.score >= 58 ? 'risk' : 'critical'}`}>
        <strong>{report.score}</strong>
        <span>{report.statusLabel}</span>
      </div>
    </section>

    <section className="grid-3 ux-density-panel">
      {Object.entries(uxDensityPresets).map(([id, density]) => <article key={id} className={`panel density-card ${report.density === id ? 'active' : ''}`}>
        <span className="brand-kicker">{report.density === id ? 'MODE ACTIF' : 'MODE UX'}</span>
        <h3>{density.label}</h3>
        <p>{density.description}</p>
        <code>{density.cssClass}</code>
      </article>)}
    </section>

    {!!report.warnings.length && <section className="panel ux-warning-panel">
      <span className="brand-kicker">WARNINGS COAN</span>
      <h3>Points de friction avant build final</h3>
      <ul className="compact-list">
        {report.warnings.map((warning) => <li key={warning}>{warning}</li>)}
      </ul>
    </section>}

    <section className="ux-metric-grid">
      {report.metrics.map((metric) => <article key={metric.id} className={`panel ux-metric ${metric.severity}`}>
        <div className="ux-metric-head">
          <div>
            <span className="brand-kicker">{metric.severity.toUpperCase()}</span>
            <h3>{metric.label}</h3>
          </div>
          <b>{metric.value}%</b>
        </div>
        <div className="ux-meter"><i style={{ width: `${metric.value}%` }} /></div>
        <p>{metric.description}</p>
        <p className="advice"><strong>Polish conseillé :</strong><br />{metric.recommendation}</p>
      </article>)}
    </section>

    <section className="grid-2">
      <div className="panel">
        <div className="section-head">
          <div>
            <span className="brand-kicker">Quick routes dynamiques</span>
            <h3>Accès prioritaires selon la crise</h3>
          </div>
          <button onClick={copyReport}>{copied ? 'Copié' : 'Copier rapport UX'}</button>
        </div>
        <div className="ux-route-grid">
          {report.quickRoutes.map((route) => <button key={route.id} className={`ux-route tone-${route.tone} ${route.active ? 'active' : ''}`} onClick={() => setTab(route.targetTab)}>
            <strong>{route.shortLabel}</strong>
            <span>{route.label}</span>
            <em>{route.reason}</em>
          </button>)}
        </div>
      </div>
      <div className="panel">
        <span className="brand-kicker">Groupes de modules</span>
        <h3>Architecture de navigation</h3>
        <div className="ux-group-list">
          {report.moduleGroups.map((group) => <article key={group.id}>
            <div><strong>{group.label}</strong><span>{group.active}/{group.total} visibles</span></div>
            <p>{group.intent}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="panel wide">
      <span className="brand-kicker">Tooltips lore / modules</span>
      <h3>Infobulles prêtes pour les écrans principaux</h3>
      <div className="ux-tooltip-grid">
        {report.navHints.map((hint) => <button key={hint.tab} onClick={() => setTab(hint.tab)}>
          <strong>{hint.label}</strong>
          <span>{hint.tooltip}</span>
          <em>{hint.loreHint}</em>
        </button>)}
      </div>
    </section>

    <section className="grid-2">
      <div className="panel">
        <span className="brand-kicker">États vides</span>
        <h3>Éviter les écrans morts</h3>
        <div className="empty-state-list">
          {report.emptyStates.map((state) => <article key={state.id}>
            <strong>{state.title}</strong>
            <p>{state.body}</p>
            <button onClick={() => setTab(state.actionTab)}>{state.actionLabel}</button>
          </article>)}
        </div>
      </div>
      <div className="panel">
        <span className="brand-kicker">Runbook polish</span>
        <h3>Checklist avant Tauri</h3>
        <ol className="compact-list numbered">
          {report.runbook.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </div>
    </section>

    <section className="panel">
      <span className="brand-kicker">Export UX</span>
      <textarea className="audit-export" readOnly value={report.exportText} />
    </section>
  </div>;
}
