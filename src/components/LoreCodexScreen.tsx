import { useMemo, useState } from 'react';
import type { GameState, LoreCodexCategoryId, LoreCodexEntry, TabId } from '../types/game';
import { loreCodexCategoryLabels, loreCodexCategoryOrder, loreCodexSourceLabels } from '../data/loreCodex';
import { buildLoreCodexExport, buildLoreCodexView } from '../systems/loreCodexSystem';

export function LoreCodexScreen({ game, setTab }: { game: GameState; setTab: (tab: TabId) => void }) {
  const [category, setCategory] = useState<LoreCodexCategoryId>('all');
  const [query, setQuery] = useState('');
  const view = useMemo(() => buildLoreCodexView(game, category, query), [game, category, query]);
  const [selectedId, setSelectedId] = useState<string>('combine-occupation');
  const selected = view.filteredEntries.find((entry) => entry.id === selectedId) ?? view.filteredEntries[0] ?? view.recommendedEntries[0];
  const exportText = buildLoreCodexExport(view.filteredEntries);

  return <section className="panel-grid dedicated-screen lore-codex-screen">
    <div className="panel module-command lore-codex-command wide">
      <span className="brand-kicker">COAN / ARCHIVES DOCTRINALES</span>
      <h2>Codex opérationnel</h2>
      <p>Chaque dossier relie une référence historique aux registres administratifs, aux risques actifs et aux interdictions de doctrine.</p>
      <div className="module-stat-grid">
        <MiniCodexStat label="Entrées" value={view.totalEntries} />
        <MiniCodexStat label="Complétude" value={`${view.completeness}%`} />
        <MiniCodexStat label="Risque doctrinal" value={`${view.loreRisk}%`} danger={view.loreRisk > 65} />
        <MiniCodexStat label="Recommandées" value={view.recommendedEntries.length} danger={view.recommendedEntries.length > 3} />
        <MiniCodexStat label="Filtre" value={loreCodexCategoryLabels[category]} />
      </div>
      {view.activeWarnings.length > 0 && <div className="coan-lines codex-warnings">
        {view.activeWarnings.map((line) => <p key={line}>▸ {line}</p>)}
      </div>}
    </div>

    <div className="panel lore-codex-filter-panel">
      <span className="brand-kicker">Index / filtre</span>
      <h2>Catégories</h2>
      <input className="codex-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Recherche : Xen, Nova, Advisor, headcrab..." />
      <div className="operation-list compact-orders codex-category-list">
        {loreCodexCategoryOrder.map((id) => <button key={id} className={category === id ? 'selected-operation' : ''} onClick={() => setCategory(id)}>
          <strong>{loreCodexCategoryLabels[id]}</strong>
          <span>{view.categoryCounts[id]} dossier(s)</span>
        </button>)}
      </div>
    </div>

    <div className="panel lore-codex-recommendations">
      <span className="brand-kicker">COAN recommande</span>
      <h2>Dossiers liés à la crise actuelle</h2>
      <div className="codex-recommendation-list">
        {view.recommendedEntries.length ? view.recommendedEntries.map((entry) => <CodexEntryButton key={entry.id} entry={entry} selected={selected?.id === entry.id} onClick={() => setSelectedId(entry.id)} />) : <p className="muted">Aucune recommandation prioritaire. City reste dans une marge doctrinale acceptable.</p>}
      </div>
    </div>

    <div className="panel lore-codex-index wide">
      <span className="brand-kicker">Dossiers filtrés</span>
      <h2>{view.filteredEntries.length} entrée(s)</h2>
      <div className="codex-entry-grid">
        {view.filteredEntries.map((entry) => <CodexEntryButton key={entry.id} entry={entry} selected={selected?.id === entry.id} onClick={() => setSelectedId(entry.id)} />)}
      </div>
    </div>

    {selected && <div className="panel lore-codex-detail wide">
      <div className="codex-detail-head">
        <div>
          <span className="brand-kicker">{selected.classification}</span>
          <h2>{selected.title}</h2>
          <p>{selected.subtitle}</p>
        </div>
        <b>{loreCodexSourceLabels[selected.sourceType]}</b>
      </div>
      <div className="codex-detail-body">
        <article>
          <h3>Cadre de référence</h3>
          <p>{selected.canonSummary.replaceAll('{{CITY_NUMBER}}', game.city)}</p>
        </article>
        <article>
          <h3>Doctrine opérationnelle</h3>
          <p>{selected.operationalDoctrine.replaceAll('{{CITY_NUMBER}}', game.city)}</p>
        </article>
        <article>
          <h3>Protocoles de risque</h3>
          {selected.dangerRules.map((line) => <p key={line}>▸ {line}</p>)}
        </article>
        <article>
          <h3>Interdictions doctrinales</h3>
          {selected.avoidRules.map((line) => <p key={line}>▸ {line}</p>)}
        </article>
      </div>
      <div className="codex-linked-tabs">
        <strong>Modules liés</strong>
        {selected.connectedTabs.map((tab) => <button key={tab} onClick={() => setTab(tab)}>{tab}</button>)}
      </div>
      <div className="event-tags">{selected.keywords.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </div>}

    <div className="panel lore-codex-export wide">
      <span className="brand-kicker">Export codex</span>
      <h2>Archive texte filtrée</h2>
      <textarea readOnly value={exportText} />
    </div>
  </section>;
}

function MiniCodexStat({ label, value, danger = false }: { label: string; value: string | number; danger?: boolean }) {
  return <span className={`mini-stat ${danger ? 'danger' : ''}`}><small>{label}</small><b>{value}</b></span>;
}

function CodexEntryButton({ entry, selected, onClick }: { entry: LoreCodexEntry; selected: boolean; onClick: () => void }) {
  return <button className={`codex-entry-button ${selected ? 'selected-operation' : ''} cat-${entry.category}`} onClick={onClick}>
    <span>{entry.classification}</span>
    <strong>{entry.title}</strong>
    <em>{entry.subtitle}</em>
  </button>;
}
