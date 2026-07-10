import { AlertTriangle, Archive, BadgeDollarSign, Biohazard, Factory, FileText, Gauge, Lock, Map, Radio, Shield, ShieldCheck, Users } from 'lucide-react';
import type { GameState, TabId } from '../types/game';
import { formatUiuxPhase } from '../systems/uiuxProgressionSystem';
import './UiuxV2CommandDeck.css';

const pct = (value: number) => `${Math.max(0, Math.min(100, Math.round(value)))}%`;

type ModuleCard = {
  icon: typeof Map;
  title: string;
  text: string;
  image: string;
  tab: TabId;
  tone: 'city' | 'overwatch' | 'lambda' | 'xen' | 'civil' | 'archive';
  locked?: boolean;
};

export function UiuxV2CommandDeck({ game, setTab, runAudit }: { game: GameState; setTab: (tab: TabId) => void; runAudit: () => void }) {
  const progression = game.uiuxProgression;
  const hottestSectors = [...game.sectors]
    .sort((a, b) => (b.rebel + b.xen + (100 - b.infrastructure)) - (a.rebel + a.xen + (100 - a.infrastructure)))
    .slice(0, 4);
  const latestReport = game.reports[0];
  const latestReportLine = latestReport?.transmittedLines?.[0] ?? latestReport?.lines?.[0];
  const riskScore = Math.round((game.stats.rebel + game.stats.xen + game.auditHeat + game.majorStoryEvents.citywideHeat) / 4);

  const modules: ModuleCard[] = [
    {
      icon: Map,
      title: 'Surveillance urbaine',
      text: 'Secteurs, statut terrain, infrastructures et priorites CP.',
      image: '/openai-visuals/city17-sector-grid.svg',
      tab: 'sectors',
      tone: 'city',
    },
    {
      icon: Shield,
      title: 'Commandement Overwatch',
      text: 'Unites CP, OTA, Airwatch, Synths et escalation militaire.',
      image: '/openai-visuals/unlocks/ota-command.png',
      tab: 'overwatch',
      tone: 'overwatch',
    },
    {
      icon: Radio,
      title: 'Resistance Lambda',
      text: 'Cellules, routes clandestines, agitation et pression Nova.',
      image: '/openai-visuals/breencast-archive-terminal.svg',
      tab: 'resistance',
      tone: 'lambda',
    },
    {
      icon: Biohazard,
      title: 'Biosphere Xen',
      text: 'Quarantaines, mutations, recherche et catastrophes organiques.',
      image: '/openai-visuals/unlocks/xen-bioscan.png',
      tab: 'xen',
      tone: 'xen',
      locked: !progression.unlocked.xen_bioscan,
    },
    {
      icon: Users,
      title: 'Citoyens & rations',
      text: 'Population, registre civil, rationnement et conformite locale.',
      image: '/openai-visuals/breencast-archive-terminal.svg',
      tab: 'population',
      tone: 'civil',
    },
    {
      icon: FileText,
      title: 'Archives & directives',
      text: 'Rapports, BreenCast, directives Citadel et audit Advisor.',
      image: '/openai-visuals/unlocks/nova-channel.png',
      tab: 'reports',
      tone: 'archive',
    },
    {
      icon: BadgeDollarSign,
      title: 'Requisitions Citadel',
      text: 'Autorisations OTA, Xen, Nova, Advisor, Razor Train et Synths.',
      image: '/openai-visuals/banners/citadel-requisitions.png',
      tab: 'progression',
      tone: 'archive',
    },
  ];

  return <section className="uiux-v2-deck">
    <header className="uiux-v2-hero">
      <div className="uiux-v2-hero-copy">
        <span className="uiux-v2-kicker"><Gauge size={15} /> UI/UX V4 / Command Deck</span>
        <h2>COAN Command Deck V4</h2>
        <p>
          Vue compartimentée pour City {game.city}. Phase {formatUiuxPhase(progression.phase)}, autorisations lore,
          entretien quotidien et audit de viabilité sont reliés à la vraie campagne.
        </p>
        <div className="uiux-v2-metrics">
          <Metric label="Stabilite" value={game.stats.stability} />
          <Metric label="Lambda" value={game.stats.rebel} danger />
          <Metric label={progression.unlocked.xen_bioscan ? 'Xen' : 'Bio-signal'} value={progression.unlocked.xen_bioscan ? game.stats.xen : 0} danger />
          <Metric label="Score long terme" value={progression.longTermScore} danger={progression.longTermScore < 45} />
        </div>
      </div>
      <div className="uiux-v2-hero-image">
        <img src="/openai-visuals/banners/command-deck.png" alt="Salle de commandement de la Citadelle surplombant City 17" />
      </div>
    </header>

    <div className="uiux-v2-grid">
      <article className="uiux-v2-panel uiux-v2-span-8">
        <div className="uiux-v2-panel-head">
          <div>
            <span className="uiux-v2-kicker">Modules prioritaires</span>
            <h3>Navigation par poles</h3>
          </div>
          <span className={`uiux-v2-chip ${riskScore > 65 ? 'bad' : riskScore > 45 ? 'warn' : 'good'}`}>Risque {riskScore}%</span>
        </div>
        <div className="uiux-v2-module-grid">
          {modules.map((module) => <button key={module.title} disabled={module.locked} className={`uiux-v2-card tone-${module.tone} ${module.locked ? 'locked' : ''}`} onClick={() => setTab(module.tab)}>
            <img src={module.image} alt="" aria-hidden="true" />
            <span>{module.locked ? <Lock size={16} /> : <module.icon size={16} />} {module.title}</span>
            <p>{module.locked ? 'Dossier masque. Acheter le Paquet Bioscan dans Requisitions.' : module.text}</p>
          </button>)}
        </div>
      </article>

      <article className="uiux-v2-panel uiux-v2-span-4">
        <div className="uiux-v2-panel-head">
          <div>
            <span className="uiux-v2-kicker"><AlertTriangle size={14} /> Priorites terrain</span>
            <h3>Secteurs sous tension</h3>
          </div>
        </div>
        <div className="uiux-v2-row-list">
          {hottestSectors.map((sector) => <button key={sector.id} className="uiux-v2-row" onClick={() => setTab('sectors')}>
            <strong>{sector.name}</strong>
            <span>{sector.status} / L {sector.rebel}% / {progression.unlocked.xen_bioscan ? `X ${sector.xen}%` : 'bio-signal masque'}</span>
          </button>)}
        </div>
      </article>

      <article className="uiux-v2-panel uiux-v2-span-4">
        <span className="uiux-v2-kicker"><Factory size={14} /> Production</span>
        <h3>Continuite administrative</h3>
        <div className="uiux-v2-row-list compact">
          <Info label="Production" value={pct(game.stats.production)} />
          <Info label="Rations" value={`${game.rationEconomy.reserves}/${game.rationEconomy.dailyNeed}`} />
          <Info label="Population" value={game.population.total.toLocaleString('fr-FR')} />
        </div>
      </article>

      <article className="uiux-v2-panel uiux-v2-span-4">
        <span className="uiux-v2-kicker"><Archive size={14} /> Rapport recent</span>
        <h3>{latestReport?.title ?? 'Aucun rapport cloture'}</h3>
        <p className="uiux-v2-muted">
          {latestReport
            ? `${latestReportLine ?? 'Transmission COAN archivee.'} / Audit ${latestReport.auditDiscovered ? 'compromis' : 'contenu'}.`
            : 'Lance une cloture de journee pour alimenter les archives et les rapports falsifies.'}
        </p>
        <button className="uiux-v2-action" onClick={() => setTab('reports')}>Ouvrir rapports</button>
      </article>

      <article className="uiux-v2-panel uiux-v2-span-4">
        <span className="uiux-v2-kicker"><ShieldCheck size={14} /> Audit V4</span>
        <h3>{formatUiuxPhase(progression.phase)} / HEAT {progression.heat}%</h3>
        <p className="uiux-v2-muted">
          {progression.lastAudit} Charge modules {progression.bureaucraticLoad}% / jours critiques {progression.consecutiveCriticalDays}.
        </p>
        <button className="uiux-v2-action warn" onClick={runAudit}>Lancer audit</button>
      </article>
    </div>
  </section>;
}

function Metric({ label, value, danger = false }: { label: string; value: number; danger?: boolean }) {
  return <div className="uiux-v2-metric">
    <small>{label}</small>
    <b>{pct(value)}</b>
    <i className={danger ? 'danger' : ''} style={{ width: pct(value) }} />
  </div>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="uiux-v2-info">
    <strong>{label}</strong>
    <span>{value}</span>
  </div>;
}
