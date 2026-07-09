import { useMemo, useState } from 'react';
import type { GameState } from '../types/game';
import { gameplayBalanceBands } from '../data/gameplayBalance';
import { buildGameplayBalanceReport } from '../systems/gameplayBalanceSystem';

export function GameplayBalanceScreen({ game }: { game: GameState }) {
  const report = useMemo(() => buildGameplayBalanceReport(game), [game]);
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

  return <div className="screen-stack balance-screen">
    <section className="panel balance-hero">
      <div>
        <span className="brand-kicker">{report.version} / PLAYTEST MATRIX</span>
        <h2>Équilibrage gameplay & tests longues parties</h2>
        <p>{report.headline}</p>
      </div>
      <div className={`balance-score ${report.score >= 85 ? 'ok' : report.score >= 70 ? 'watch' : report.score >= 50 ? 'danger' : 'critical'}`}>
        <strong>{report.score}</strong>
        <span>{report.statusLabel}</span>
      </div>
    </section>

    <section className="balance-metric-grid">
      {report.metrics.map((metric) => <article key={metric.id} className={`panel balance-metric ${metric.band}`}>
        <div className="balance-metric-head">
          <div>
            <span className="brand-kicker">{metric.bandLabel}</span>
            <h3>{metric.label}</h3>
          </div>
          <b>{metric.value}%</b>
        </div>
        <div className="balance-meter"><i style={{ width: `${metric.value}%` }} /><em style={{ left: `${metric.targetLow}%`, width: `${metric.targetHigh - metric.targetLow}%` }} /></div>
        <p>{metric.description}</p>
        <p className="lore-note"><strong>Intention lore :</strong> {metric.loreIntent}</p>
        <ul className="compact-list">
          {metric.drivers.map((line) => <li key={line}>{line}</li>)}
        </ul>
        <p className="advice"><strong>Réglage conseillé :</strong><br />{metric.recommendation}</p>
      </article>)}
    </section>

    <section className="grid-2">
      <div className="panel">
        <div className="section-head">
          <div>
            <span className="brand-kicker">Recommandations directes</span>
            <h3>Corrections avant playtest</h3>
          </div>
          <button onClick={copyReport}>{copied ? 'Copié' : 'Copier rapport'}</button>
        </div>
        <div className="feed compact-feed">
          {report.recommendations.map((line) => <p key={line}>▸ {line}</p>)}
        </div>
      </div>
      <div className="panel">
        <span className="brand-kicker">Légende des bandes</span>
        <h3>Lecture COAN</h3>
        <div className="balance-band-list">
          {Object.entries(gameplayBalanceBands).map(([id, band]) => <div key={id} className={`balance-band ${id}`}>
            <strong>{band.label}</strong>
            <span>{band.description}</span>
          </div>)}
        </div>
      </div>
    </section>

    <section className="panel wide">
      <span className="brand-kicker">Projection heuristique</span>
      <h3>Risque 30 jours sans correction lourde</h3>
      <div className="projection-table">
        <div className="projection-row head"><span>Jour</span><span>Lambda</span><span>Xen</span><span>Civil</span><span>Audit</span><span>Collapse</span></div>
        {report.projection.map((point) => <div className="projection-row" key={point.day}>
          <span>J{point.day}</span>
          <b>{point.lambda}%</b>
          <b>{point.xen}%</b>
          <b>{point.civil}%</b>
          <b>{point.audit}%</b>
          <b className={point.collapseRisk > 70 ? 'danger-text' : ''}>{point.collapseRisk}%</b>
        </div>)}
      </div>
      <p className="lore-note">Projection indicative : elle sert au QA/design, pas à prédire exactement la simulation finale.</p>
    </section>

    <section className="panel wide">
      <span className="brand-kicker">Playtests recommandés</span>
      <h3>Scénarios longs à tester</h3>
      <div className="playtest-grid">
        {report.playtestScenarios.map((scenario) => <article className="playtest-card" key={scenario.id}>
          <h4>{scenario.name}</h4>
          <p><strong>Setup :</strong> {scenario.setup}</p>
          <p><strong>Arc attendu :</strong> {scenario.expectedArc}</p>
          <ul className="compact-list">
            {scenario.warningSigns.map((sign) => <li key={sign}>{sign}</li>)}
          </ul>
        </article>)}
      </div>
    </section>

    <section className="grid-2">
      <div className="panel">
        <span className="brand-kicker">Runbook QA</span>
        <h3>Ordre de test conseillé</h3>
        <ol className="compact-list numbered">
          {report.runbook.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </div>
      <div className="panel">
        <span className="brand-kicker">Export</span>
        <h3>Rapport brut</h3>
        <textarea className="audit-export" readOnly value={report.exportText} />
      </div>
    </section>
  </div>;
}
