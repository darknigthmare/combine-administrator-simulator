import { useMemo, useState } from 'react';
import { BadgeDollarSign, CheckCircle2, Grid2X2, List, Lock, Power, Scale, Search, ShieldCheck } from 'lucide-react';
import type { GameState, UiuxUnlockId } from '../types/game';
import { calculateUiuxIncome, calculateUiuxUpkeep, canPurchaseUiuxUnlock, formatUiuxPhase, getUiuxUnlockLockReason, uiuxUnlockCatalog } from '../systems/uiuxProgressionSystem';
import './UiuxProgressionPanel.css';

type StatusFilter = 'all' | 'available' | 'acquired' | 'locked';

export function UiuxProgressionPanel({ game, purchaseUnlock, toggleUnlock }: {
  game: GameState;
  purchaseUnlock: (id: UiuxUnlockId) => void;
  toggleUnlock: (id: UiuxUnlockId, enabled: boolean) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const [compact, setCompact] = useState(true);
  const state = game.uiuxProgression;
  const acquired = Object.values(state.unlocked).filter(Boolean).length;
  const activeCount = Object.entries(state.active).filter(([id, active]) => active && id !== 'ravenholm_blacklist').length;
  const upkeep = calculateUiuxUpkeep(state.active);
  const income = calculateUiuxIncome(state.active, game.stats);
  const netRequisition = income.requisition - upkeep.requisition;

  const visibleUnlocks = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('fr-FR');
    return uiuxUnlockCatalog.filter((item) => {
      const bought = state.unlocked[item.id];
      const available = canPurchaseUiuxUnlock(state, item, game.day);
      const matchesStatus = statusFilter === 'all'
        || statusFilter === 'acquired' && bought
        || statusFilter === 'available' && !bought && available
        || statusFilter === 'locked' && !bought && !available;
      const matchesQuery = !needle || [item.title, item.faction, item.description, item.unlocks].join(' ').toLocaleLowerCase('fr-FR').includes(needle);
      return matchesStatus && matchesQuery;
    });
  }, [game.day, query, state, statusFilter]);

  return <section className={`uiux-progression ${compact ? 'compact-catalog' : ''}`}>
    <header className="uiux-progression-hero">
      <div>
        <span className="uiux-v2-kicker"><BadgeDollarSign size={14} /> AUTORISATIONS CITADEL</span>
        <h2>Réquisitions Citadel</h2>
        <p>Ouvrez seulement les canaux nécessaires au mandat. Chaque autorisation active augmente l’entretien et la supervision.</p>
      </div>
      <div className="uiux-progression-metrics">
        <Metric label="Réquisition" value={state.resources.requisition} />
        <Metric label="Données" value={state.resources.data} />
        <Metric label="Conformité" value={state.resources.compliance} />
        <Metric label="Autorisations" value={`${acquired}/${uiuxUnlockCatalog.length}`} />
        <Metric label="Actives" value={activeCount} />
        <Metric label="Charge" value={`${state.bureaucraticLoad}%`} danger={state.bureaucraticLoad > 70} />
        <Metric label="Solde REQ/j" value={`${netRequisition >= 0 ? '+' : ''}${netRequisition}`} danger={netRequisition < 0} />
      </div>
    </header>

    <div className="uiux-progression-toolbar" aria-label="Filtres des autorisations">
      <label className="uiux-progression-search"><Search size={16} /><span className="sr-only">Rechercher une autorisation</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un canal..." /></label>
      <div className="uiux-progression-segments">
        {([['all', 'Toutes'], ['available', 'Disponibles'], ['acquired', 'Acquises'], ['locked', 'Verrouillées']] as Array<[StatusFilter, string]>).map(([id, label]) => <button key={id} aria-pressed={statusFilter === id} onClick={() => setStatusFilter(id)}>{label}</button>)}
      </div>
      <div className="uiux-progression-view">
        <button className={compact ? 'active' : ''} aria-label="Vue compacte" title="Vue compacte" aria-pressed={compact} onClick={() => setCompact(true)}><List size={17} /></button>
        <button className={!compact ? 'active' : ''} aria-label="Vue détaillée" title="Vue détaillée" aria-pressed={!compact} onClick={() => setCompact(false)}><Grid2X2 size={17} /></button>
      </div>
    </div>

    <div className="uiux-progression-layout">
      <div>
        <p className="uiux-progression-result-count">{visibleUnlocks.length} dossier(s) affiché(s)</p>
        <div className="uiux-progression-catalog">
          {visibleUnlocks.map((item) => {
            const bought = state.unlocked[item.id];
            const active = state.active[item.id];
            const available = canPurchaseUiuxUnlock(state, item, game.day);
            const lockReason = getUiuxUnlockLockReason(state, item, game.day);
            const projectedActive = { ...state.active, [item.id]: true };
            const projectedUpkeep = calculateUiuxUpkeep(projectedActive);
            const projectedIncome = calculateUiuxIncome(projectedActive, game.stats);
            const projectedNet = projectedIncome.requisition - projectedUpkeep.requisition;
            return <article className={`uiux-unlock-card ${bought ? 'unlocked' : ''} ${bought && !active ? 'suspended' : ''}`} key={item.id}>
              <img src={item.image} alt="" aria-hidden="true" />
              <div className="uiux-unlock-body">
                <span className={`uiux-v2-chip ${bought && active ? 'good' : available || bought ? 'warn' : 'bad'}`}>{bought ? active ? 'ACTIVE' : 'SUSPENDUE' : available ? 'DISPONIBLE' : 'VERROUILLÉ'}</span>
                <small>{item.faction}</small>
                <h3>{item.title}</h3>
                <p className="uiux-unlock-description">{item.description}</p>
                <p className="uiux-unlock-summary"><strong>{item.cost.requisition} REQ · {item.cost.data} DATA · {item.cost.compliance} CONF</strong><span>J{item.requiresDay} · {item.unlocks}</span></p>
                <dl>
                  <div><dt>Coût</dt><dd>{item.cost.requisition} REQ / {item.cost.data} DATA / {item.cost.compliance} CONF</dd></div>
                  <div><dt>Jour minimal</dt><dd>J{item.requiresDay}</dd></div>
                  <div><dt>Projection active</dt><dd>{projectedUpkeep.requisition} REQ / {projectedUpkeep.data} DATA / {projectedUpkeep.compliance} CONF — solde REQ {projectedNet >= 0 ? '+' : ''}{projectedNet}</dd></div>
                  <div><dt>Débloque</dt><dd>{item.unlocks}</dd></div>
                </dl>
                {!available && !bought && <p className="uiux-unlock-reason"><Lock size={13} /> {lockReason}</p>}
                {bought && !item.narrative ? <button className="uiux-v2-action" aria-pressed={active} aria-label={`${active ? 'Suspendre' : 'Réactiver'} : ${item.title}`} onClick={() => toggleUnlock(item.id, !active)}>
                  <Power size={14} /> {active ? 'Suspendre' : 'Réactiver'}
                </button> : <button className="uiux-v2-action" aria-label={`${available ? 'Acheter autorisation' : 'Autorisation verrouillée'} : ${item.title}`} disabled={bought || !available} onClick={() => purchaseUnlock(item.id)}>
                  {bought ? <CheckCircle2 size={14} /> : <Lock size={14} />} {bought ? 'Archive narrative active' : item.narrative ? 'Découverte narrative requise' : 'Acheter'}
                </button>}
              </div>
            </article>;
          })}
          {visibleUnlocks.length === 0 && <p className="uiux-progression-empty">Aucun dossier ne correspond à ces filtres.</p>}
        </div>
      </div>

      <aside className="uiux-progression-audit">
        <span className="uiux-v2-kicker"><ShieldCheck size={14} /> ÉVALUATION DE STABILITÉ</span>
        <h3>Phase {formatUiuxPhase(state.phase)}</h3>
        <p>{state.lastAudit}</p>
        <div className="uiux-progression-score"><Scale size={18} /><span>Viabilité long terme</span><b>{state.longTermScore}%</b></div>
        <div className="uiux-progression-rules">
          <p><strong>Xen</strong><span>Bio-signal masqué avant Bioscan.</span></p>
          <p><strong>Nova Prospekt</strong><span>Liaison OTA puis canal pénitentiaire.</span></p>
          <p><strong>Advisor</strong><span>Canal direct obligatoire.</span></p>
          <p><strong>Synths</strong><span>OTA et Advisor requis.</span></p>
          <p><strong>Ravenholm</strong><span>Archive blacklist, jamais secteur ordinaire.</span></p>
        </div>
      </aside>
    </div>
  </section>;
}

function Metric({ label, value, danger = false }: { label: string; value: string | number; danger?: boolean }) {
  return <div className={`uiux-progression-metric ${danger ? 'danger' : ''}`}><small>{label}</small><b>{value}</b></div>;
}
