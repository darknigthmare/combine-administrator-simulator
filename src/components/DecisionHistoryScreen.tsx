import type { DecisionHistoryFilterId, GameState } from '../types/game';
import { decisionHistoryCategoryLabels, decisionHistoryFilterLabels, decisionHistorySeverityLabels, decisionHistorySourceLabels } from '../data/decisionHistory';
import { buildDecisionHistoryExport, getFilteredDecisionEntries } from '../systems/decisionHistorySystem';

export function DecisionHistoryScreen({ game, setFilter }: { game: GameState; setFilter: (filter: DecisionHistoryFilterId) => void }) {
  const history = game.decisionHistory;
  const entries = getFilteredDecisionEntries(history);
  const exportText = buildDecisionHistoryExport(game);
  const newest = entries[0];

  return <section className="panel-grid dedicated-screen decision-history-screen">
    <div className="panel module-command decision-history-command wide">
      <span className="brand-kicker">COAN Decision Ledger / audit trail</span>
      <h2>Historique complet des décisions</h2>
      <p>Registre structuré des décisions opérateur, opérations automatiques, rapports réels, rapports transmis, conséquences différées et contradictions cachées.</p>
      <div className="module-stat-grid">
        <MiniLedger label="Entrées" value={history.entries.length} />
        <MiniLedger label="Risque élevé" value={history.highRiskCount} danger />
        <MiniLedger label="Cachées" value={history.hiddenConsequenceCount} danger />
        <MiniLedger label="Rapports" value={history.reportEntryCount} />
        <MiniLedger label="Falsification moy." value={`${history.averageFalsification}%`} danger={history.averageFalsification > 45} />
        <MiniLedger label="Filtre actif" value={decisionHistoryFilterLabels[history.activeFilter]} />
      </div>
      {newest && <p className="advice"><strong>Dernière entrée :</strong><br />{newest.title} — {newest.summary}</p>}
    </div>

    <div className="panel decision-filter-panel">
      <span className="brand-kicker">Filtres COAN</span>
      <h2>Vues d’audit</h2>
      <div className="operation-list compact-orders">
        {(Object.keys(decisionHistoryFilterLabels) as DecisionHistoryFilterId[]).map((filter) => <button key={filter} className={history.activeFilter === filter ? 'selected-operation' : ''} onClick={() => setFilter(filter)}>
          <strong>{decisionHistoryFilterLabels[filter]}</strong>
          <span>{describeFilter(filter)}</span>
        </button>)}
      </div>
    </div>

    <div className="panel decision-category-panel">
      <span className="brand-kicker">Répartition</span>
      <h2>Catégories de décisions</h2>
      <div className="decision-category-grid">
        {Object.entries(history.categoryCounts).filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1]).map(([category, count]) => <article key={category} className="decision-category-card">
          <span>{decisionHistoryCategoryLabels[category as keyof typeof decisionHistoryCategoryLabels]}</span>
          <b>{count}</b>
        </article>)}
      </div>
    </div>

    <div className="panel decision-entry-panel wide">
      <span className="brand-kicker">Ledger entries</span>
      <h2>{entries.length} entrées filtrées</h2>
      <div className="decision-entry-list">
        {entries.slice(0, 80).map((entry) => <article key={entry.id} className={`decision-entry-card severity-${entry.severity} cat-${entry.category}`}>
          <div className="decision-entry-head">
            <div>
              <span>#{entry.sequence} / JOUR {String(entry.day).padStart(3, '0')} / {decisionHistoryCategoryLabels[entry.category]}</span>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
            </div>
            <b>{decisionHistorySeverityLabels[entry.severity]}</b>
          </div>
          <div className="decision-entry-meta">
            <span>Source <b>{decisionHistorySourceLabels[entry.source]}</b></span>
            <span>Cible <b>{entry.targetLabel}</b></span>
            <span>Audit <b>{entry.auditRisk}%</b></span>
            <span>Falsification <b>{entry.falsificationScore}%</b></span>
          </div>
          <div className="decision-entry-body">
            <div>
              <strong>Intention opérateur</strong>
              <p>{entry.operatorIntent}</p>
            </div>
            <div>
              <strong>Effets immédiats</strong>
              {entry.immediateEffects.map((line) => <p key={line}>▸ {line}</p>)}
            </div>
            <div>
              <strong>Conséquences différées</strong>
              {entry.deferredConsequences.map((line) => <p key={line}>▸ {line}</p>)}
            </div>
            <div>
              <strong>Conséquences cachées</strong>
              {entry.hiddenConsequences.length ? entry.hiddenConsequences.map((line) => <p key={line}>▸ {line}</p>) : <p className="muted">Aucune contradiction cachée détectée.</p>}
            </div>
          </div>
          {entry.category === 'report' && <div className="decision-report-compare">
            <div><strong>Dossier réel COAN</strong>{entry.realReportExcerpt.map((line) => <p key={line}>▸ {line}</p>)}</div>
            <div><strong>Transmission Citadel</strong>{entry.transmittedReportExcerpt.length ? entry.transmittedReportExcerpt.map((line) => <p key={line}>▸ {line}</p>) : <p className="muted">Transmission identique ou non archivée.</p>}</div>
          </div>}
          <div className="event-tags">{entry.tags.map((tag) => <span key={`${entry.id}-${tag}`}>{tag}</span>)}</div>
        </article>)}
      </div>
    </div>

    <div className="panel decision-export-panel wide">
      <span className="brand-kicker">Export d’audit texte</span>
      <h2>Archive copiable</h2>
      <textarea readOnly value={exportText} />
    </div>
  </section>;
}

function MiniLedger({ label, value, danger = false }: { label: string; value: string | number; danger?: boolean }) {
  return <span className={`mini-stat ${danger ? 'danger' : ''}`}><small>{label}</small><b>{value}</b></span>;
}

function describeFilter(filter: DecisionHistoryFilterId): string {
  const map: Record<DecisionHistoryFilterId, string> = {
    all: 'Vue complète de tous les dossiers.',
    operator: 'Décisions directes et actions manuelles.',
    hidden: 'Dossiers noirs, contradictions et conséquences cachées.',
    reports: 'Rapports réels, transmissions et audits Advisor.',
    xen: 'Quarantaine, mutations, catastrophes et recherche Xen.',
    lambda: 'Résistance, factions et opérations anti-citoyennes.',
    nova: 'Transferts, Biotics, intake et disparitions.',
    citadel: 'Directives, technologies, audits et supervision.',
    civil: 'Population, rations, CP et registre civil.',
  };
  return map[filter];
}
