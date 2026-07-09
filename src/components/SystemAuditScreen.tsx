import { useMemo, useState } from 'react';
import type { GameState, TabId } from '../types/game';
import { buildSystemAudit } from '../systems/systemAuditSystem';
import { finalAuditRequiredFiles } from '../data/systemAudit';

export function SystemAuditScreen({ game, setTab }: { game: GameState; setTab: (tab: TabId) => void }) {
  const audit = useMemo(() => buildSystemAudit(game), [game]);
  const [copied, setCopied] = useState(false);

  async function copyAudit() {
    try {
      await navigator.clipboard.writeText(audit.exportText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="screen-stack audit-screen">
      <section className="panel audit-hero">
        <div>
          <span className="brand-kicker">{audit.version}</span>
          <h2>Audit final architecture / lore / build</h2>
          <p>{audit.headline}</p>
        </div>
        <div className={`audit-score ${audit.score >= 90 ? 'ok' : audit.score >= 75 ? 'watch' : 'critical'}`}>
          <strong>{audit.score}</strong>
          <span>{audit.statusLabel}</span>
        </div>
      </section>

      <section className="grid-4 audit-counts">
        {audit.counts.map((count) => (
          <div className="mini-card" key={count.label}>
            <span>{count.label}</span>
            <b>{count.value}</b>
            <small>{count.detail}</small>
          </div>
        ))}
      </section>

      {!!audit.warnings.length && (
        <section className="panel audit-warning-panel">
          <span className="brand-kicker">SURVEILLANCE COAN</span>
          <h3>Points à surveiller avant build final</h3>
          <ul className="compact-list">
            {audit.warnings.slice(0, 8).map((warning) => <li key={warning}>{warning}</li>)}
          </ul>
        </section>
      )}

      <section className="panel">
        <div className="section-head">
          <div>
            <span className="brand-kicker">CHECKLIST CUMULATIVE</span>
            <h3>Modules V1 → V4 contrôlés</h3>
          </div>
          <button onClick={copyAudit}>{copied ? 'Copié' : 'Copier audit'}</button>
        </div>
        <div className="audit-line-grid">
          {audit.lines.map((item) => (
            <article className={`audit-line ${item.status}`} key={item.id}>
              <div>
                <span>{item.category}</span>
                <h4>{item.label}</h4>
                <p>{item.detail}</p>
                <small>{item.evidence}</small>
              </div>
              {item.relatedTab && <button onClick={() => setTab(item.relatedTab!)}>Ouvrir ↗</button>}
            </article>
          ))}
        </div>
      </section>

      <section className="grid-2">
        <div className="panel">
          <span className="brand-kicker">RUNBOOK FINAL</span>
          <h3>Application dans le repo complet</h3>
          <ol className="compact-list numbered">
            {audit.runbook.map((step) => <li key={step}><code>{step}</code></li>)}
          </ol>
        </div>
        <div className="panel">
          <span className="brand-kicker">FICHIERS SENTINELLES</span>
          <h3>Présence attendue dans le pack</h3>
          <div className="sentinel-list">
            {finalAuditRequiredFiles.map((file) => <code key={file}>{file}</code>)}
          </div>
        </div>
      </section>

      <section className="panel">
        <span className="brand-kicker">EXPORT AUDIT</span>
        <textarea className="audit-export" readOnly value={audit.exportText} />
      </section>
    </div>
  );
}
