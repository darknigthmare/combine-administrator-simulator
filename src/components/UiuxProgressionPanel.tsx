import { BadgeDollarSign, CheckCircle2, Lock, Scale, ShieldCheck } from 'lucide-react';
import type { GameState, UiuxUnlockId } from '../types/game';
import { canPurchaseUiuxUnlock, uiuxUnlockCatalog } from '../systems/uiuxProgressionSystem';
import './UiuxProgressionPanel.css';

export function UiuxProgressionPanel({
  game,
  purchaseUnlock,
  runAudit,
}: {
  game: GameState;
  purchaseUnlock: (id: UiuxUnlockId) => void;
  runAudit: () => void;
}) {
  const state = game.uiuxProgression;
  const acquired = Object.values(state.unlocked).filter(Boolean).length;

  return <section className="uiux-progression">
    <header className="uiux-progression-hero">
      <div>
        <span className="uiux-v2-kicker"><BadgeDollarSign size={14} /> UI/UX V4 / progression</span>
        <h2>Requisitions Citadel</h2>
        <p>Les dossiers sensibles sont des autorisations de campagne. Chaque canal ouvert augmente aussi l upkeep quotidien et la charge de supervision.</p>
      </div>
      <div className="uiux-progression-metrics">
        <Metric label="Requisition" value={state.resources.requisition} />
        <Metric label="Donnees" value={state.resources.data} />
        <Metric label="Conformite" value={state.resources.compliance} />
        <Metric label="Autorisations" value={`${acquired}/${uiuxUnlockCatalog.length}`} />
        <Metric label="Charge" value={`${state.bureaucraticLoad}%`} danger={state.bureaucraticLoad > 70} />
        <Metric label="Heat" value={`${state.heat}%`} danger={state.heat > 70} />
      </div>
    </header>

    <div className="uiux-progression-layout">
      <div className="uiux-progression-catalog">
        {uiuxUnlockCatalog.map((item) => {
          const bought = state.unlocked[item.id];
          const available = canPurchaseUiuxUnlock(state, item, game.day);
          return <article className={`uiux-unlock-card ${bought ? 'unlocked' : ''}`} key={item.id}>
            <img src={item.image} alt="" aria-hidden="true" />
            <div className="uiux-unlock-body">
              <span className={`uiux-v2-chip ${bought ? 'good' : available ? 'warn' : 'bad'}`}>{bought ? 'AUTORISE' : available ? 'DISPONIBLE' : 'VERROUILLE'}</span>
              <small>{item.faction}</small>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <dl>
                <div><dt>Cout</dt><dd>{item.cost.requisition} REQ / {item.cost.data} DATA / {item.cost.compliance} CONF</dd></div>
                <div><dt>Jour minimal</dt><dd>J{item.requiresDay}</dd></div>
                <div><dt>Entretien</dt><dd>{item.upkeep}</dd></div>
                <div><dt>Debloque</dt><dd>{item.unlocks}</dd></div>
              </dl>
              <button className="uiux-v2-action" disabled={bought || !available} onClick={() => purchaseUnlock(item.id)}>
                {bought ? <CheckCircle2 size={14} /> : <Lock size={14} />} {bought ? 'Autorisation active' : 'Acheter autorisation'}
              </button>
            </div>
          </article>;
        })}
      </div>

      <aside className="uiux-progression-audit">
        <span className="uiux-v2-kicker"><ShieldCheck size={14} /> audit stabilisation</span>
        <h3>Phase {state.phase.replace('_', ' ')}</h3>
        <p>{state.lastAudit}</p>
        <div className="uiux-progression-score">
          <Scale size={18} />
          <span>Viabilite long terme</span>
          <b>{state.longTermScore}%</b>
        </div>
        <button className="uiux-v2-action" onClick={runAudit}>Lancer audit V4</button>
        <div className="uiux-progression-rules">
          <p><strong>Xen</strong><span>Bio-signal masque avant Bioscan.</span></p>
          <p><strong>Nova Prospekt</strong><span>Liaison OTA puis canal penitentiaire.</span></p>
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
