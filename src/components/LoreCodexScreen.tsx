import { useMemo, useState } from 'react';
import { Download, Search } from 'lucide-react';
import type { GameState, LoreCodexCategoryId, LoreCodexEntry, TabId } from '../types/game';
import { loreCodexCategoryLabels, loreCodexCategoryOrder, loreCodexSourceLabels } from '../data/loreCodex';
import { buildLoreCodexExport, buildLoreCodexView } from '../systems/loreCodexSystem';

const linkedModuleLabels: Partial<Record<TabId, string>> = {
  archives: 'Archives',
  campaigns: 'Campagne active',
  citadel: 'Directives Citadel',
  civil_protection: 'Civil Protection',
  citizens: 'Registre civil',
  combine: 'Forces Combine',
  decision_history: 'Historique des décisions',
  informants: 'Informateurs',
  major_events: 'Événements majeurs',
  nova: 'Nova Prospekt',
  population: 'Population',
  propaganda: 'BreenCast',
  rationing: 'Rationnement',
  reports: 'Rapports',
  resistance: 'Résistance',
  sectors: 'Carte de City',
  timeline: 'Chronologie',
  video_archives: 'Archives vidéo',
  vortigaunts: 'Vortigaunts / Biotics',
  xen: 'Quarantaine Xen',
  xen_catastrophes: 'Catastrophes Xen',
  xen_research: 'Recherche Xen',
};

export function LoreCodexScreen({ game, setTab }: { game: GameState; setTab: (tab: TabId) => void }) {
  const [category, setCategory] = useState<LoreCodexCategoryId>('all');
  const [query, setQuery] = useState('');
  const view = useMemo(() => buildLoreCodexView(game, category, query), [game, category, query]);
  const [selectedId, setSelectedId] = useState<string>('combine-occupation');
  const recommendedIds = useMemo(() => new Set(view.recommendedEntries.map((entry) => entry.id)), [view.recommendedEntries]);
  const indexedEntries = view.filteredEntries.filter((entry) => !recommendedIds.has(entry.id));
  const selected = [...view.recommendedEntries, ...view.filteredEntries].find((entry) => entry.id === selectedId)
    ?? view.filteredEntries[0]
    ?? view.recommendedEntries[0];

  function exportCodex() {
    const content = buildLoreCodexExport(view.filteredEntries, game.city);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `coan-codex-city-${game.city}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return <section className="panel-grid dedicated-screen lore-codex-screen">
    <div className="panel module-command lore-codex-command wide">
      <span className="brand-kicker">COAN / ARCHIVES DOCTRINALES</span>
      <h2>Codex opérationnel</h2>
      <p>Chaque dossier relie une référence historique aux registres administratifs, aux risques actifs et aux interdictions de doctrine.</p>
      <div className="module-stat-grid">
        <MiniCodexStat label="Dossiers accessibles" value={view.categoryCounts.all} />
        <MiniCodexStat label="Complétude" value={`${view.completeness}%`} />
        <MiniCodexStat label="Risque doctrinal" value={`${view.loreRisk}%`} danger={view.loreRisk > 65} />
        <MiniCodexStat label="Recommandés" value={view.recommendedEntries.length} danger={view.recommendedEntries.length > 3} />
        <MiniCodexStat label="Filtre" value={loreCodexCategoryLabels[category]} />
      </div>
      {view.activeWarnings.length > 0 && <div className="coan-lines codex-warnings">
        {view.activeWarnings.map((line) => <p key={line}>▸ {line}</p>)}
      </div>}
    </div>

    <div className="panel lore-codex-filter-panel">
      <span className="brand-kicker">INDEX / FILTRE</span>
      <h2>Catégories</h2>
      <label className="codex-search-shell"><Search size={16} /><span className="sr-only">Rechercher dans le Codex</span><input className="codex-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Xen, Nova, Advisor, headcrab..." /></label>
      <div className="operation-list compact-orders codex-category-list">
        {loreCodexCategoryOrder.map((id) => <button key={id} className={category === id ? 'selected-operation' : ''} onClick={() => setCategory(id)}>
          <strong>{loreCodexCategoryLabels[id]}</strong>
          <span>{view.categoryCounts[id]} dossier(s)</span>
        </button>)}
      </div>
      <button className="codex-export-command" type="button" onClick={exportCodex}><Download size={15} /> Exporter la sélection</button>
    </div>

    <div className="panel lore-codex-recommendations">
      <span className="brand-kicker">COAN RECOMMANDE</span>
      <h2>Dossiers liés à la situation</h2>
      <div className="codex-recommendation-list">
        {view.recommendedEntries.length
          ? view.recommendedEntries.map((entry) => <CodexEntryButton key={entry.id} entry={entry} selected={selected?.id === entry.id} onClick={() => setSelectedId(entry.id)} />)
          : <p className="muted">Aucune recommandation prioritaire. City reste dans une marge doctrinale acceptable.</p>}
      </div>
    </div>

    <div className="panel lore-codex-index wide">
      <span className="brand-kicker">DOSSIERS FILTRÉS</span>
      <h2>{indexedEntries.length} autre(s) dossier(s)</h2>
      <div className="codex-entry-grid">
        {indexedEntries.map((entry) => <CodexEntryButton key={entry.id} entry={entry} selected={selected?.id === entry.id} onClick={() => setSelectedId(entry.id)} />)}
        {indexedEntries.length === 0 && <p className="muted">Tous les dossiers correspondants sont déjà affichés dans les recommandations.</p>}
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
        <article><h3>Cadre de référence</h3><p>{selected.canonSummary.replaceAll('{{CITY_NUMBER}}', game.city)}</p></article>
        <article><h3>Doctrine opérationnelle</h3><p>{selected.operationalDoctrine.replaceAll('{{CITY_NUMBER}}', game.city)}</p></article>
        <article><h3>Protocoles de risque</h3>{selected.dangerRules.map((line) => <p key={line}>▸ {line}</p>)}</article>
        <article><h3>Interdictions doctrinales</h3>{selected.avoidRules.map((line) => <p key={line}>▸ {line}</p>)}</article>
      </div>
      <div className="codex-linked-tabs">
        <strong>Modules liés</strong>
        {selected.connectedTabs.map((tab) => <button key={tab} onClick={() => setTab(tab)}>{linkedModuleLabels[tab] ?? tab.replaceAll('_', ' ')}</button>)}
      </div>
      <div className="event-tags">{selected.keywords.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </div>}
  </section>;
}

function MiniCodexStat({ label, value, danger = false }: { label: string; value: string | number; danger?: boolean }) {
  return <span className={`module-mini-stat ${danger ? 'danger' : ''}`}><small>{label}</small><b>{value}</b></span>;
}

function CodexEntryButton({ entry, selected, onClick }: { entry: LoreCodexEntry; selected: boolean; onClick: () => void }) {
  return <button className={`codex-entry-button ${selected ? 'selected-operation' : ''} cat-${entry.category}`} onClick={onClick}>
    <span>{entry.classification}</span>
    <strong>{entry.title}</strong>
    <em>{entry.subtitle}</em>
  </button>;
}
