import { AlertTriangle, Archive, BadgeDollarSign, Biohazard, ClipboardList, Factory, FileText, Gauge, Lock, Map, Radio, Shield, ShieldCheck, Users } from 'lucide-react';
import type { GameState, TabId } from '../types/game';
import { formatUiuxPhase } from '../systems/uiuxProgressionSystem';
import { administratorAvatars } from '../data/visualAssets';
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

export function UiuxV2CommandDeck({ game, setTab }: { game: GameState; setTab: (tab: TabId) => void }) {
  const progression = game.uiuxProgression;
  const hottestSectors = [...game.sectors]
    .sort((a, b) => (b.rebel + (progression.unlocked.xen_bioscan ? b.xen : 0) + (100 - b.infrastructure)) - (a.rebel + (progression.unlocked.xen_bioscan ? a.xen : 0) + (100 - a.infrastructure)))
    .slice(0, 4);
  const latestReport = game.reports[0];
  const administrator = administratorAvatars[game.administratorAvatar];
  const latestReportLine = latestReport?.transmittedLines?.[0] ?? latestReport?.lines?.[0];
  const riskScore = Math.round((game.stats.rebel + (progression.unlocked.xen_bioscan ? game.stats.xen : 0) + game.auditHeat + game.majorStoryEvents.citywideHeat) / 4);

  const modules: ModuleCard[] = [
    {
      icon: Map,
      title: 'Surveillance urbaine',
      text: 'Secteurs, statut terrain, infrastructures et priorités CP.',
      image: '/openai-visuals/modules/city17-surveillance.webp',
      tab: 'sectors',
      tone: 'city',
    },
    {
      icon: Shield,
      title: 'Commandement Overwatch',
      text: 'Unités CP, OTA, Airwatch, Synths et escalade militaire.',
      image: '/openai-visuals/unlocks/ota-command.webp',
      tab: 'overwatch',
      tone: 'overwatch',
    },
    {
      icon: Radio,
      title: 'Résistance Lambda',
      text: 'Cellules, routes clandestines, agitation et signaux radio.',
      image: '/openai-visuals/events/lambda-sabotage.webp',
      tab: 'resistance',
      tone: 'lambda',
    },
    {
      icon: Biohazard,
      title: 'Biosphère Xen',
      text: 'Quarantaines, mutations, recherche et catastrophes organiques.',
      image: '/openai-visuals/unlocks/xen-bioscan.webp',
      tab: 'xen',
      tone: 'xen',
      locked: !progression.unlocked.xen_bioscan,
    },
    {
      icon: Users,
      title: 'Citoyens & rations',
      text: 'Population, registre civil, rationnement et conformité locale.',
      image: '/openai-visuals/dossiers/suspected-citizen.webp',
      tab: 'population',
      tone: 'civil',
    },
    {
      icon: FileText,
      title: 'Archives & directives',
      text: 'Rapports, BreenCast, directives Citadel et contrôles supérieurs.',
      image: '/openai-visuals/modules/breencast-archive.webp',
      tab: 'reports',
      tone: 'archive',
    },
    {
      icon: BadgeDollarSign,
      title: 'Réquisitions Citadel',
      text: 'Autorisations OTA, Xen, Nova, Advisor, Razor Train et Synths.',
      image: '/openai-visuals/banners/citadel-requisitions.webp',
      tab: 'progression',
      tone: 'archive',
    },
  ];

  return <section className="uiux-v2-deck">
    <header className="uiux-v2-hero">
      <div className="uiux-v2-hero-copy">
        <span className="uiux-v2-kicker"><Gauge size={15} /> CENTRE DE COMMANDEMENT</span>
        <h2>Command Deck de City {game.city}</h2>
        <p>
          Réseau administratif de City {game.city}. Phase {formatUiuxPhase(progression.phase)},
          mandat actif sous supervision Citadel.
        </p>
        <div className="uiux-v2-administrator">
          <img src={administrator.image} alt="" aria-hidden="true" decoding="async" />
          <span><small>Administrateur en fonction</small><strong>{administrator.title}</strong><em>{administrator.subtitle}</em></span>
        </div>
        <div className="uiux-v2-metrics">
          <Metric label="Stabilité" value={game.stats.stability} />
          <Metric label="Lambda" value={game.stats.rebel} danger />
          <Metric label={progression.unlocked.xen_bioscan ? 'Xen' : 'Bio-signal'} value={progression.unlocked.xen_bioscan ? game.stats.xen : 0} danger />
          <Metric label="Score long terme" value={progression.longTermScore} danger={progression.longTermScore < 45} />
        </div>
      </div>
      <div className="uiux-v2-hero-image">
        <img src="/openai-visuals/banners/command-deck.webp" alt="Salle de commandement de la Citadelle surplombant City 17" />
      </div>
    </header>

    <div className="uiux-v2-grid">
      <article className="uiux-v2-panel uiux-v2-span-8">
        <div className="uiux-v2-panel-head">
          <div>
            <span className="uiux-v2-kicker">Modules prioritaires</span>
            <h3>Navigation par pôles</h3>
          </div>
          <span className={`uiux-v2-chip ${riskScore > 65 ? 'bad' : riskScore > 45 ? 'warn' : 'good'}`}>Risque {riskScore}%</span>
        </div>
        <div className="uiux-v2-module-grid">
          {modules.map((module) => <button key={module.title} disabled={module.locked} className={`uiux-v2-card tone-${module.tone} ${module.locked ? 'locked' : ''}`} onClick={() => setTab(module.tab)}>
            <img src={module.image} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <span>{module.locked ? <Lock size={16} /> : <module.icon size={16} />} {module.title}</span>
            <p>{module.locked ? 'Dossier masqué. Autorisation Bioscan requise.' : module.text}</p>
          </button>)}
        </div>
      </article>

      <article className="uiux-v2-panel uiux-v2-span-4">
        <div className="uiux-v2-panel-head">
          <div>
            <span className="uiux-v2-kicker"><AlertTriangle size={14} /> Priorités terrain</span>
            <h3>Secteurs sous tension</h3>
          </div>
        </div>
        <div className="uiux-v2-row-list">
          {hottestSectors.map((sector) => <button key={sector.id} className="uiux-v2-row" onClick={() => setTab('sectors')}>
            <strong>{sector.name}</strong>
            <span>{!progression.unlocked.xen_bioscan && ['Contaminé', 'Infesté', 'En quarantaine'].includes(sector.status) ? 'Accès restreint' : sector.status} / L {sector.rebel}% / {progression.unlocked.xen_bioscan ? `X ${sector.xen}%` : 'bio-signal masqué'}</span>
          </button>)}
        </div>
      </article>

      <article className="uiux-v2-panel uiux-v2-span-4">
        <span className="uiux-v2-kicker"><ClipboardList size={14} /> Ordres du cycle</span>
        <h3>{game.dailyOrders.remaining}/{game.dailyOrders.total} créneaux disponibles</h3>
        <div className="uiux-v2-order-list" aria-live="polite">
          {game.dailyOrders.issuedLabels.length > 0
            ? game.dailyOrders.issuedLabels.slice(-3).map((label, index) => <span key={`${label}-${index}`}>{label}</span>)
            : <span>Aucun ordre transmis</span>}
        </div>
      </article>

      <article className="uiux-v2-panel uiux-v2-span-4">
        <span className="uiux-v2-kicker"><Factory size={14} /> Production</span>
        <h3>Continuité administrative</h3>
        <div className="uiux-v2-row-list compact">
          <Info label="Production" value={pct(game.stats.production)} />
          <Info label="Rations" value={`${game.rationEconomy.reserves}/${game.rationEconomy.dailyNeed}`} />
          <Info label="Population" value={game.population.total.toLocaleString('fr-FR')} />
        </div>
      </article>

      <article className="uiux-v2-panel uiux-v2-span-4">
        <span className="uiux-v2-kicker"><Archive size={14} /> Rapport récent</span>
        <h3>{latestReport?.title ?? 'Aucun rapport clôturé'}</h3>
        <p className="uiux-v2-muted">
          {latestReport
            ? `${latestReportLine ?? 'Transmission COAN archivée.'} / Audit ${latestReport.auditDiscovered ? 'compromis' : 'contenu'}.`
            : 'Archives en attente du premier cycle administratif clôturé.'}
        </p>
        <button className="uiux-v2-action" onClick={() => setTab('reports')}>Ouvrir rapports</button>
      </article>

      <article className="uiux-v2-panel uiux-v2-span-4">
        <span className="uiux-v2-kicker"><ShieldCheck size={14} /> Évaluation Citadel</span>
        <h3>{formatUiuxPhase(progression.phase)} / HEAT {progression.heat}%</h3>
        <p className="uiux-v2-muted">
          {progression.lastAudit} Charge modules {progression.bureaucraticLoad}% / jours critiques {progression.consecutiveCriticalDays}.
        </p>
        <button className="uiux-v2-action warn" onClick={() => setTab('progression')}>Ouvrir les réquisitions</button>
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
