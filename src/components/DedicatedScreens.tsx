import { useState } from 'react';
import type { CitadelDirectiveNode, CivilProtectionDoctrineId, CivilProtectionOperation, CombineTechnologyBranchId, CombineTechnologyNode, GameState, PopulationGroupId, PopulationSectorState, RationOperation, RationPolicyId, ResistanceFactionDoctrineId, ResistanceFactionOperation, ResistanceNetworkState, ResistanceOperation, VortigauntDoctrineId, VortigauntOperation, XenEcosystemOperation, XenEcosystemPolicyId, XenMutationOperation, XenMutationPolicyId, QuarantineOperation, QuarantinePolicyId, XenResearchOperation, XenResearchPolicyId, XenCatastropheOperation, XenCatastrophePolicyId, MajorStoryOperation, MajorStoryPolicyId, VideoArchiveOperation, VideoArchivePolicyId, Sector, Unit } from '../types/game';
import { rationPolicies } from '../data/rationEconomy';
import { populationGroupDefinitions, populationGroupOrder } from '../data/populationGroups';
import { informantDoctrines } from '../data/informantNetwork';
import { civilProtectionDoctrines } from '../data/civilProtection';
import { citadelDirectiveBranches, citadelDirectiveNodes } from '../data/citadelDirectiveTree';
import { combineTechnologyBranches, combineTechnologyNodes } from '../data/combineTechnologies';
import { vortigauntDoctrines } from '../data/vortigaunts';
import { xenEcosystemPolicies, xenLayerDefinitions } from '../data/xenEcosystem';
import { xenMutationChainDefinitions, xenMutationPolicies } from '../data/xenMutationChains';
import { quarantinePolicies, quarantineStageDefinitions } from '../data/quarantineZones';
import { xenResearchPolicies, xenResearchPrograms } from '../data/xenResearch';
import { xenCatastropheDefinitions, xenCatastrophePolicies } from '../data/xenCatastrophes';
import { majorStoryEventDefinitions, majorStoryPolicies } from '../data/majorStoryEvents';
import { videoArchiveFeedOrder, videoArchiveFeeds, videoArchivePolicies } from '../data/videoArchives';
import { finalEndingDefinitions } from '../data/finalVerdicts';
import { finalChronicleClassifications } from '../data/finalChronicle';
import { campaignOrder, campaignPresets } from '../data/campaignScenarios';
import { getAvailableDirectiveNodes, getBranchCompletion } from '../systems/citadelDirectiveTreeSystem';
import { getAvailableTechnologyNodes, getTechnologyBranchProgress } from '../systems/combineTechnologySystem';
import { getPopulationRisk } from '../systems/populationSimulation';
import { reportPolicyLabels } from '../systems/reportFalsification';
import { getMajorStoryStageLabel, getMajorStoryStageRank, isMajorStoryEventAvailable } from '../systems/majorStoryEventSystem';
import { getDossierVisual, getUnitVisual } from '../data/visualAssets';
import { getTechnologyTimelineConflict } from '../systems/timelineSystem';
import { getCampaignLoreStatus } from '../systems/campaignSystem';

type GlobalAction = (action: 'breencast' | 'ration_plus' | 'ration_cut' | 'advisor' | 'shadow_help') => void;
type SectorAction = (action: 'curfew' | 'raid' | 'quarantine' | 'seal' | 'purge' | 'propaganda') => void;

type Deploy = (unit: Unit) => void;

const countMetricPattern = /^(jour|jour génération|jours restants|pertes civiles|ravenholm-like|non résolus|population|total|agents cp|agents compromis|officiers|protocoles|capacités|champs altérés|réserve|prod\/jour|besoin\/jour|alloué\/jour|autonomie|rapports|logs|événements|objectifs|compromis|captifs|libres|sujets|zones suivies|partielles|totales|scellées|zones perdues|civils piégés|hôtes|dossiers|conformes|suspects|flags nova|dossiers secteur|sources|sources brûlées|dénonciations|exploitables|fausses|cellules exposées|dépense rations|budget r&d|spécimens|parasites|extract|percées|échantillons|crises actives|clips|rations)$/i;

function MiniStat({ label, value, dangerHigh = false, unit = 'auto' }: { label: string; value: number | string; dangerHigh?: boolean; unit?: 'auto' | 'percent' | 'count' }) {
  const numeric = typeof value === 'number' ? value : 0;
  const danger = typeof value === 'number' && (dangerHigh ? numeric > 65 : numeric < 35);
  const showPercent = unit === 'percent' || (unit === 'auto' && !countMetricPattern.test(label));
  const suffix = typeof value === 'number' && showPercent ? '%' : '';
  return <span className={`module-mini-stat ${danger ? 'danger' : ''}`}><small>{label}</small><b>{value}{suffix}</b></span>;
}

function UnitButton({ unit, sector, deploy }: { unit: Unit; sector: Sector; deploy: Deploy }) {
  const stationed = sector.units[unit.id] ?? 0;
  return <button className="module-unit-button" disabled={unit.reserve <= 0} onClick={() => deploy(unit)}>
    <img src={getUnitVisual(unit.id)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
    <strong>{unit.name}</strong>
    <span>{unit.category} — réserve {unit.reserve} / secteur {stationed}</span>
    <em>Déployer vers {sector.name}</em>
  </button>;
}




export function FinalVerdictScreen({ game }: { game: GameState }) {
  const verdict = game.finalVerdict;
  const unlocked = verdict?.unlockedEndingIds.map((id) => finalEndingDefinitions[id]).filter(Boolean) ?? [];
  const latestReport = game.reports[0];

  if (!verdict) {
    return <section className="panel-grid dedicated-screen final-verdict-screen">
      <div className="panel module-command final-verdict-command">
        <span className="brand-kicker">COAN Final Archive / dormant</span>
        <h2>Aucun verdict final déclenché</h2>
        <p>Le dossier final reste en attente. La clôture sera évaluée selon le contrôle de City, l’héritage Lambda, Xen, Nova Prospekt, les Advisors, les objectifs de campagne et les rapports falsifiés.</p>
        <div className="module-stat-grid">
          <MiniStat label="Jour" value={game.day} unit="count" />
          <MiniStat label="Mandat" value={game.campaignMission.mandateScore} />
          <MiniStat label="Audit" value={game.auditHeat} dangerHigh />
          <MiniStat label="Xen" value={game.stats.xen} dangerHigh />
          <MiniStat label="Lambda" value={game.stats.rebel} dangerHigh />
        </div>
        <p className="lore-note">Le verdict final ne sera plus un simple texte : il générera une archive COAN avec axes d’évaluation, vérité publique, vérité cachée et recommandations Advisor.</p>
      </div>
    </section>;
  }

  return <section className={`panel-grid dedicated-screen final-verdict-screen verdict-${verdict.classification}`}>
    <div className="panel module-command final-verdict-command wide">
      <span className="brand-kicker">COAN Final Archive / Verdict verrouillé</span>
      <h2>{verdict.title}</h2>
      <p>{verdict.subtitle}</p>
      <div className="module-stat-grid">
        <MiniStat label="Score final" value={verdict.finalScore} />
        <MiniStat label="Mandat" value={verdict.mandateScore} />
        <MiniStat label="Contrôle" value={verdict.combineControlIndex} />
        <MiniStat label="Coût humain" value={verdict.humanCostIndex} dangerHigh />
        <MiniStat label="Héritage Xen" value={verdict.xenLegacyIndex} dangerHigh />
        <MiniStat label="Héritage Lambda" value={verdict.lambdaLegacyIndex} dangerHigh />
        <MiniStat label="Intégrité rapport" value={verdict.reportIntegrity} />
      </div>
      <p className="lore-note"><b>Classification :</b> {verdict.classification.toUpperCase()} / {verdict.tone}</p>
      <p className="advice"><strong>Déclencheur :</strong><br />{verdict.triggeredBy}</p>
    </div>

    <div className="panel final-public-panel">
      <span className="brand-kicker">Version publique transmise</span>
      <h2>Conclusion Citadel</h2>
      <p>{verdict.publicVerdict}</p>
      <p className="lore-note">Dernière politique de transmission : {game.reportPolicy}. Dernier audit : {latestReport?.auditRisk ?? 0}% / falsification {latestReport?.falsificationScore ?? 0}%.</p>
    </div>

    <div className="panel final-hidden-panel">
      <span className="brand-kicker">Vérité COAN non transmise</span>
      <h2>Archive cachée</h2>
      <p>{verdict.hiddenTruth}</p>
      <p className="advice"><strong>{verdict.advisorJudgement}</strong></p>
    </div>

    <div className="panel final-axis-panel wide">
      <span className="brand-kicker">Axes de verdict</span>
      <h2>Bilan multi-système</h2>
      <div className="final-axis-grid">
        {verdict.axes.map((axis) => <article key={axis.id} className={`final-axis-card grade-${axis.grade}`}>
          <div><strong>{axis.label}</strong><span>{axis.summary}</span><small>{axis.detail}</small></div>
          <b>{axis.score}%</b>
          <i><em style={{ width: `${axis.score}%` }} /></i>
          <div className="event-tags">{axis.loreTags.map((tag) => <span key={`${axis.id}-${tag}`}>{tag}</span>)}</div>
        </article>)}
      </div>
    </div>

    <div className="panel final-archive-panel">
      <span className="brand-kicker">Archive finale</span>
      <h2>Lignes classifiées</h2>
      <div className="feed compact-feed">
        {verdict.archiveLines.map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
      </div>
    </div>

    <div className="panel final-recommendation-panel">
      <span className="brand-kicker">Recommandations post-verdict</span>
      <h2>Actions qui auraient limité le coût</h2>
      {verdict.recommendations.map((item) => <p key={item}>▸ {item}</p>)}
    </div>

    <div className="panel final-unlocked-panel wide">
      <span className="brand-kicker">Fins possibles détectées</span>
      <h2>Branches de verdict débloquées</h2>
      <div className="ending-branch-grid">
        {unlocked.length ? unlocked.map((ending) => <article key={ending.id} className={`ending-branch-card class-${ending.classification}`}>
          <strong>{ending.title}</strong>
          <span>{ending.subtitle}</span>
          <small>{ending.archiveTags.join(' / ')}</small>
        </article>) : <p className="muted">Aucune branche secondaire débloquée.</p>}
      </div>
    </div>
  </section>;
}


export function FinalChronicleScreen({ game }: { game: GameState }) {
  const chronicle = game.finalChronicle;
  const verdict = game.finalVerdict;

  if (!chronicle) {
    return <section className="panel-grid dedicated-screen final-chronicle-screen">
      <div className="panel module-command final-chronicle-command">
        <span className="brand-kicker">COAN Historical Archive / dormant</span>
        <h2>Chronique finale non générée</h2>
        <p>La chronique longue sera générée au moment du verdict final. Elle transformera les données de City en archive historique : version publique, vérité COAN, secteurs perdus, Nova Prospekt, Xen, Lambda survivante et jugement Citadel.</p>
        <div className="module-stat-grid">
          <MiniStat label="Jour" value={game.day} />
          <MiniStat label="Mandat" value={game.campaignMission.mandateScore} />
          <MiniStat label="Pertes civiles" value={game.stats.civilianLosses} dangerHigh />
          <MiniStat label="Xen" value={game.stats.xen} dangerHigh />
          <MiniStat label="Lambda" value={game.stats.rebel} dangerHigh />
          <MiniStat label="Audit" value={game.auditHeat} dangerHigh />
        </div>
        <p className="lore-note">Le module reste en attente d’un déclencheur de fin : insurrection, quarantaine totale, remplacement Advisor, effondrement, ville modèle, double jeu ou mandat achevé.</p>
      </div>
    </section>;
  }

  return <section className={`panel-grid dedicated-screen final-chronicle-screen chronicle-${chronicle.archivalClassification}`}>
    <div className="panel module-command final-chronicle-command wide">
      <span className="brand-kicker">COAN Historical Archive / Chronicle generated</span>
      <h2>{chronicle.title}</h2>
      <p>{chronicle.subtitle}</p>
      <div className="module-stat-grid">
        <MiniStat label="Jour génération" value={chronicle.generatedDay} />
        <MiniStat label="Classification" value={finalChronicleClassifications[chronicle.archivalClassification]} />
        <MiniStat label="Mandat" value={chronicle.ledger.mandateScore} />
        <MiniStat label="Audit" value={chronicle.ledger.auditHeat} dangerHigh />
        <MiniStat label="Falsification" value={chronicle.ledger.falsificationIndex} dangerHigh />
        <MiniStat label="Ravenholm-like" value={chronicle.ledger.ravenholmLikeSectors} dangerHigh />
      </div>
      <p className="lore-note"><b>Signature finale :</b> {chronicle.finalSignature}</p>
      <p className="advice">{chronicle.openingStatement}</p>
    </div>

    <div className="panel chronicle-public-panel">
      <span className="brand-kicker">Version publique BreenCast</span>
      <h2>Archive transmissible</h2>
      <p>{chronicle.publicArchive}</p>
      {verdict && <p className="lore-note">Verdict : {verdict.title} / classification {verdict.classification.toUpperCase()}.</p>}
    </div>

    <div className="panel chronicle-restricted-panel">
      <span className="brand-kicker">Version restreinte COAN</span>
      <h2>Vérité classifiée</h2>
      <p>{chronicle.restrictedArchive}</p>
    </div>

    <div className="panel chronicle-ledger-panel wide">
      <span className="brand-kicker">Ledger final</span>
      <h2>Pertes, transferts, quarantaines, mensonges</h2>
      <div className="chronicle-ledger-grid">
        <span>Pertes civiles <b>{chronicle.ledger.civilianLosses}</b></span>
        <span>Pertes Combine <b>{chronicle.ledger.combineLosses}</b></span>
        <span>Transferts Nova <b>{chronicle.ledger.novaTransfers}</b></span>
        <span>Évadés Nova <b>{chronicle.ledger.novaEscapes}</b></span>
        <span>Civils piégés <b>{chronicle.ledger.trappedCivilians}</b></span>
        <span>Secteurs Xen perdus <b>{chronicle.ledger.xenLostSectors}</b></span>
        <span>Ravenholm-like <b>{chronicle.ledger.ravenholmLikeSectors}</b></span>
        <span>Falsification <b>{chronicle.ledger.falsificationIndex}%</b></span>
      </div>
    </div>

    <div className="panel chronicle-chapters-panel wide">
      <span className="brand-kicker">Chronique narrative</span>
      <h2>Chapitres d’archive</h2>
      <div className="chronicle-chapter-grid">
        {chronicle.chapters.map((chapter) => <article key={chapter.id} className={`chronicle-chapter-card class-${chapter.classification}`}>
          <div className="chronicle-chapter-header">
            <div><strong>{chapter.title}</strong><span>{chapter.subtitle}</span></div>
            <b>{finalChronicleClassifications[chapter.classification]}</b>
          </div>
          <p>{chapter.publicText}</p>
          <p className="chronicle-restricted-text">{chapter.restrictedText}</p>
          <div className="chronicle-evidence-list">
            {chapter.evidence.slice(0, 5).map((line, index) => <span key={`${chapter.id}-evidence-${index}`}>Preuve — {line}</span>)}
            {chapter.consequences.slice(0, 4).map((line, index) => <span key={`${chapter.id}-consequence-${index}`}>Conséquence — {line}</span>)}
          </div>
          <div className="event-tags">{chapter.loreTags.map((tag) => <span key={`${chapter.id}-${tag}`}>{tag}</span>)}</div>
        </article>)}
      </div>
    </div>

    <div className="panel chronicle-sector-panel wide">
      <span className="brand-kicker">Carte mémoire finale</span>
      <h2>Secteurs retenus par l’histoire</h2>
      <div className="chronicle-sector-grid">
        {chronicle.sectorLedger.map((sector) => <article key={sector.sectorId} className={`chronicle-sector-card memory-${sector.controllingMemory.toLowerCase()}`}>
          <strong>{sector.name}</strong>
          <span>{sector.finalStatus} / mémoire {sector.controllingMemory}</span>
          <small>Population {sector.populationRemaining} — infra {sector.infrastructure}% — Lambda {sector.rebel}% — Xen {sector.xen}%</small>
          <p>{sector.note}</p>
        </article>)}
      </div>
    </div>

    <div className="panel chronicle-timeline-panel">
      <span className="brand-kicker">Timeline condensée</span>
      <h2>Jalons historiques</h2>
      <div className="feed compact-feed">
        {chronicle.timeline.map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
      </div>
    </div>

    <div className="panel chronicle-export-panel">
      <span className="brand-kicker">Export texte</span>
      <h2>Archive complète copiable</h2>
      <textarea readOnly value={chronicle.exportText} />
      <button className="primary" onClick={() => navigator.clipboard?.writeText(chronicle.exportText)}>Copier l’archive</button>
    </div>
  </section>;
}

export function MajorStoryEventsScreen({ game, operations, changePolicy, applyOperation }: { game: GameState; operations: MajorStoryOperation[]; changePolicy: (policy: MajorStoryPolicyId) => void; applyOperation: (operation: MajorStoryOperation, eventId?: string) => void }) {
  const state = game.majorStoryEvents;
  const sortedEvents = state.events
    .filter((event) => isMajorStoryEventAvailable(event.eventId, game))
    .sort((a, b) => (getMajorStoryStageRank(b.stage) * 100 + b.heat + b.publicAwareness) - (getMajorStoryStageRank(a.stage) * 100 + a.heat + a.publicAwareness));
  const current = sortedEvents[0];
  const currentDef = current ? majorStoryEventDefinitions[current.eventId] : null;
  const activeOrWorse = sortedEvents.filter((event) => getMajorStoryStageRank(event.stage) >= 2);
  const sectorName = (sectorId: string) => game.sectors.find((sector) => sector.id === sectorId)?.name ?? sectorId;
  const recommendedOperations = operations.filter((operation) => current && operation.bestAgainst.includes(current.eventId)).slice(0, 4);
  const genericOperations = operations.filter((operation) => !current || !operation.bestAgainst.includes(current.eventId)).slice(0, 6);

  return <section className="panel-grid dedicated-screen major-story-screen">
    <div className="panel module-command major-story-command">
      <span className="brand-kicker">COAN / JALONS STRATÉGIQUES</span>
      <h2>Événements scénarisés majeurs</h2>
      <p>Le registre consolide uniquement les jalons déclassifiés pour le mandat actif et ses autorisations courantes.</p>
      <div className="module-stat-grid">
        <MiniStat label="Chaleur ville" value={state.citywideHeat} dangerHigh />
        <MiniStat label="Non résolus" value={state.unresolvedMajorEvents} dangerHigh />
        <MiniStat label="Pression Advisor" value={state.advisorNarrativePressure} dangerHigh />
        <MiniStat label="Contradiction publique" value={state.publicContradiction} dangerHigh />
        <MiniStat label="Momentum Lambda" value={state.lambdaNarrativeMomentum} dangerHigh />
        <MiniStat label="Pression Xen" value={state.xenNarrativePressure} dangerHigh />
        <MiniStat label="Risque blackout" value={state.blackoutRisk} dangerHigh />
      </div>
      <p className="lore-note">COAN : {state.lastMajorEvent}</p>
    </div>

    <div className="panel major-policy-panel">
      <span className="brand-kicker">Doctrine de gestion narrative</span>
      <h2>Politique active</h2>
      <div className="operation-list">
        {majorStoryPolicies.map((policy) => <button key={policy.id} className={state.activePolicy === policy.id ? 'selected-operation' : ''} onClick={() => changePolicy(policy.id)}>
          <strong>{policy.name}</strong>
          <span>{policy.description}</span>
          <em>{policy.publicLine}</em>
        </button>)}
      </div>
    </div>

    {current && currentDef && <div className="panel major-current-panel">
      <span className="brand-kicker">Arc dominant</span>
      <h2>{currentDef.title}</h2>
      <p>{currentDef.description}</p>
      <div className="module-stat-grid">
        <MiniStat label="Stade" value={getMajorStoryStageLabel(current.stage)} />
        <MiniStat label="Chaleur" value={current.heat} dangerHigh />
        <MiniStat label="Containment" value={current.containment} />
        <MiniStat label="Secret" value={current.secrecy} />
        <MiniStat label="Visibilité" value={current.publicAwareness} dangerHigh />
        <MiniStat label="Advisor" value={current.advisorAttention} dangerHigh />
      </div>
      <p className="lore-note"><b>Déclencheur :</b> {currentDef.trigger}</p>
      <p className="lore-note"><b>Signal :</b> {currentDef.warningSigns.join(' / ')}</p>
      <p className="advice"><strong>Payoff narratif :</strong><br />{currentDef.narrativePayoff}</p>
      <div className="event-tags">{currentDef.loreTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </div>}

    <div className="panel major-recommended-panel">
      <span className="brand-kicker">Réponse recommandée</span>
      <h2>Opérations contre l’arc dominant</h2>
      <div className="operation-list">
        {[...recommendedOperations, ...genericOperations].slice(0, 8).map((operation) => <button key={operation.id} onClick={() => applyOperation(operation, current?.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Risque {operation.risk}% — cible {operation.target}</em>
        </button>)}
      </div>
    </div>

    <div className="panel major-event-list-panel wide">
      <span className="brand-kicker">Table des jalons déclassifiés</span>
      <h2>État des arcs majeurs</h2>
      <div className="major-event-grid">
        {sortedEvents.map((event) => {
          const def = majorStoryEventDefinitions[event.eventId];
          return <article key={event.id} className={`major-event-card stage-${event.stage}`}>
            <div>
              <strong>{def.title}</strong>
              <span>{def.combineLabel}</span>
              <small>{sectorName(event.sectorId)} — {def.category} — {getMajorStoryStageLabel(event.stage)}</small>
            </div>
            <div className="module-row-metrics"><b>Heat {event.heat}%</b><b>Contain {event.containment}%</b><b>Public {event.publicAwareness}%</b></div>
            <i><em style={{ width: `${event.heat}%` }} /></i>
            <p>{event.lastReport}</p>
            <div className="event-tags">{def.loreTags.slice(0, 4).map((tag) => <span key={`${event.id}-${tag}`}>{tag}</span>)}</div>
          </article>;
        })}
      </div>
    </div>

    <div className="panel major-active-panel">
      <span className="brand-kicker">Crises actives / point de rupture</span>
      <h2>Arcs à traiter maintenant</h2>
      {activeOrWorse.length ? activeOrWorse.map((event) => {
        const def = majorStoryEventDefinitions[event.eventId];
        return <article key={`${event.id}-hot`} className="module-row-card critical-row">
          <div><strong>{def.title}</strong><span>{sectorName(event.sectorId)} — {getMajorStoryStageLabel(event.stage)}</span></div>
          <div className="module-row-metrics"><b>{event.heat}%</b><b>Advisor {event.advisorAttention}%</b></div>
        </article>;
      }) : <p className="muted">Aucun arc majeur au-dessus du seuil actif.</p>}
    </div>

    <div className="panel feed major-story-log-panel">
      <span className="brand-kicker">Major Story log</span>
      <h2>Journal scénarisé</h2>
      {state.log.slice(0, 14).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}


export function CampaignScreen({ game }: { game: GameState }) {
  const [activeView, setActiveView] = useState<'overview' | 'objectives' | 'timeline' | 'archive'>('overview');
  const active = campaignPresets[game.campaign.activeCampaignId];
  const loreStatus = getCampaignLoreStatus(game.campaign.activeCampaignId);
  const upcomingMilestone = active.milestones.find((milestone, index) => index >= game.campaign.milestoneIndex);
  const mission = game.campaignMission;
  const visibleMissionObjectives = mission.objectives.filter((objective) => objective.discovered);
  const primaryMission = visibleMissionObjectives.filter((objective) => objective.kind === 'primary');
  const secondaryMission = visibleMissionObjectives.filter((objective) => objective.kind === 'secondary');
  const hiddenMission = visibleMissionObjectives.filter((objective) => objective.kind === 'hidden');
  const failureMission = visibleMissionObjectives.filter((objective) => objective.kind === 'failure');
  const missionClass = (status: string, kind: string) => `campaign-mission-objective ${kind} ${status}`;
  const hotSectors = [...game.sectors]
    .sort((a, b) => (b.rebel + b.xen + (100 - b.infrastructure) + b.fear) - (a.rebel + a.xen + (100 - a.infrastructure) + a.fear))
    .slice(0, 6);

  return <section className={`panel-grid dedicated-screen campaign-screen campaign-view-${activeView}`}>
    <div className="screen-view-tabs" role="tablist" aria-label="Vues de la campagne">
      {[
        ['overview', 'Aperçu'],
        ['objectives', 'Objectifs'],
        ['timeline', 'Chronologie'],
        ['archive', 'Archives'],
      ].map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={activeView === id} className={activeView === id ? 'active' : ''} onClick={() => setActiveView(id as typeof activeView)}>{label}</button>)}
    </div>
    <div className="panel module-command campaign-command-panel">
      <span className="brand-kicker">Long Campaign Director / City Narrative Arc</span>
      <h2>{active.name}</h2>
      <p>{active.briefing}</p>
      <div className="module-stat-grid">
        <MiniStat label="Jour campagne" value={`${game.campaign.dayInCampaign}/${game.campaign.durationDays}`} />
        <MiniStat label="Pression" value={game.campaign.pressure} dangerHigh />
        <MiniStat label="Chaleur narrative" value={game.campaign.narrativeHeat} dangerHigh />
        <MiniStat label="Mandat" value={mission.mandateScore} />
        <MiniStat label="Risque échec" value={mission.failureRisk} dangerHigh />
        <MiniStat label="Objectifs" value={`${mission.completedCount}/${visibleMissionObjectives.length}`} />
      </div>
      <p className="lore-note">Mandat : {active.adminMandate}</p>
      <p className={`campaign-lore-status tone-${loreStatus.tone}`}><strong>{loreStatus.label}</strong> — {loreStatus.detail}</p>
      <div className="event-tags">{active.loreNotes.map((note) => <span key={note}>{note}</span>)}</div>
    </div>

    <div className="panel campaign-selector-panel">
      <span className="brand-kicker">Campagnes disponibles</span>
      <h2>Archives des arcs narratifs</h2>
      <p>Le mandat actif est verrouillé. Les autres campagnes sont consultables ici, mais ne peuvent être choisies qu’avant l’intake d’une nouvelle administration.</p>
      <div className="campaign-card-list">
        {campaignOrder.map((id) => {
          const preset = campaignPresets[id];
          const presetLore = getCampaignLoreStatus(id);
          return <article key={id} className={id === game.campaign.activeCampaignId ? 'active campaign-preset-card' : 'campaign-preset-card'}>
            <strong>{preset.name}</strong>
            <span>{preset.subtitle}</span>
            <em>City {preset.recommendedCity} — {preset.durationDays} jours — {preset.recommendedTimeline}</em>
            <small className={`campaign-lore-status tone-${presetLore.tone}`}>{presetLore.label}</small>
          </article>;
        })}
      </div>
    </div>

    <div className="panel campaign-mission-panel">
      <span className="brand-kicker">Objectifs multiples / Mandat opérationnel</span>
      <h2>Principaux, secondaires, cachés et échecs</h2>
      <div className="module-stat-grid">
        <MiniStat label="Primaires" value={`${primaryMission.filter((objective) => objective.status === 'completed').length}/${primaryMission.length}`} />
        <MiniStat label="Secondaires" value={`${secondaryMission.filter((objective) => objective.status === 'completed').length}/${secondaryMission.length}`} />
        <MiniStat label="Cachés révélés" value={`${mission.revealedHiddenCount}/${mission.hiddenCount}`} />
        <MiniStat label="Compromis" value={mission.failedCount} dangerHigh />
      </div>
      <div className="campaign-mission-groups">
        {[['primary', 'Objectifs principaux', primaryMission], ['secondary', 'Objectifs secondaires', secondaryMission], ['hidden', 'Objectifs cachés révélés', hiddenMission], ['failure', 'Conditions d’échec', failureMission]].map(([kind, title, list]) => (
          <div className="campaign-mission-group" key={String(kind)}>
            <h3>{String(title)}</h3>
            {(list as typeof visibleMissionObjectives).length ? (list as typeof visibleMissionObjectives).map((objective) => <article key={objective.id} className={missionClass(objective.status, objective.kind)}>
              <div>
                <strong>{objective.title}</strong>
                <span>{objective.description}</span>
                <small>{objective.detail}</small>
                <div className="event-tags">{objective.loreTags.map((tag) => <span key={`${objective.id}-${tag}`}>{tag}</span>)}</div>
              </div>
              <b>{objective.status.toUpperCase()}</b>
              <i><em style={{ width: `${objective.progress}%` }} /></i>
            </article>) : <p className="muted">Aucun dossier visible.</p>}
          </div>
        ))}
      </div>
    </div>

    <div className="panel campaign-milestones-panel">
      <span className="brand-kicker">Jalons scénarisés</span>
      <h2>Timeline interne</h2>
      {upcomingMilestone ? <div className="advice">
        <strong>Prochain jalon — jour {upcomingMilestone.day} : {upcomingMilestone.title}</strong><br />
        {upcomingMilestone.description}
      </div> : <div className="advice"><strong>Cycle complet</strong><br />Tous les jalons de cette campagne ont été déclenchés. Le verdict final dépend maintenant des systèmes globaux.</div>}
      <div className="campaign-milestone-list">
        {active.milestones.map((milestone, index) => <article key={milestone.title} className={index < game.campaign.milestoneIndex ? 'milestone resolved' : 'milestone'}>
          <strong>Jour {milestone.day} — {milestone.title}</strong>
          <span>{milestone.description}</span>
        </article>)}
      </div>
    </div>

    <div className="panel campaign-sector-panel">
      <span className="brand-kicker">Secteurs sous tension de campagne</span>
      <h2>Lecture COAN</h2>
      {hotSectors.map((sector) => <article key={sector.id} className="module-row-card">
        <div><strong>{sector.name}</strong><span>{sector.status} — {sector.zone}</span></div>
        <div className="module-row-metrics"><b>Λ {sector.rebel}%</b><b>Xen {sector.xen}%</b><b>Infra {sector.infrastructure}%</b></div>
      </article>)}
    </div>

    <div className="panel campaign-failure-panel">
      <span className="brand-kicker">Seuils d’échec narratif</span>
      <h2>Risques majeurs</h2>
      {active.failureWarnings.map((warning) => <p key={warning}>▸ {warning}</p>)}
      <div className="advice"><strong>Finale prévue :</strong><br />{active.finale}</div>
    </div>

    <div className="panel feed campaign-log-panel">
      <span className="brand-kicker">Campaign log</span>
      <h2>Journal d’arc</h2>
      {[...mission.log.slice(0, 8), ...game.campaign.log.slice(0, 10)].map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}

function groupPercent(sectorPop: PopulationSectorState, groupId: PopulationGroupId) {
  return Math.round((sectorPop.groups[groupId] / Math.max(1, sectorPop.total)) * 100);
}

export function PopulationScreen({ game, selectedSectorId, setSelectedSector }: { game: GameState; selectedSectorId: string; setSelectedSector: (id: string) => void }) {
  const population = game.population;
  const selected = population.sectors.find((item) => item.sectorId === selectedSectorId) ?? population.sectors[0];
  const selectedSector = game.sectors.find((item) => item.id === selected?.sectorId) ?? game.sectors[0];
  const riskySectors = [...population.sectors]
    .map((sectorPop) => ({ sectorPop, sector: game.sectors.find((sector) => sector.id === sectorPop.sectorId), risk: getPopulationRisk(sectorPop) }))
    .filter((item): item is { sectorPop: PopulationSectorState; sector: Sector; risk: number } => !!item.sector)
    .sort((a, b) => b.risk - a.risk)
    .slice(0, 9);
  const topGroups = populationGroupOrder
    .map((id) => ({ id, count: population.groups[id], def: populationGroupDefinitions[id] }))
    .sort((a, b) => b.count - a.count);

  return <section className="panel-grid dedicated-screen population-screen">
    <div className="panel module-command population-command">
      <span className="brand-kicker">Civil Registry / Population Stratification</span>
      <h2>Population détaillée par secteurs</h2>
      <p>La population brute est maintenant découpée en groupes sociaux exploitables : citoyens conformes, neutres, affamés, suspects, collaborateurs, informateurs, familles de disparus, travailleurs, réfugiés internes, sympathisants Lambda et exposés Xen.</p>
      <div className="module-stat-grid population-stat-grid">
        <MiniStat label="Population" value={population.total} />
        <MiniStat label="Conformité" value={population.complianceIndex} />
        <MiniStat label="Sympathie Lambda" value={population.lambdaSupportIndex} dangerHigh />
        <MiniStat label="Exposition Xen" value={population.xenExposureIndex} dangerHigh />
        <MiniStat label="Informateurs" value={population.informantDensityIndex} dangerHigh />
        <MiniStat label="Force travail" value={population.workforce} />
        <MiniStat label="Vulnérables" value={population.vulnerable} dangerHigh />
      </div>
      <p className="lore-note">COAN : la faim, les disparitions et les quarantaines déplacent les citoyens d’un groupe à l’autre chaque journée.</p>
    </div>

    <div className="panel population-groups-panel">
      <span className="brand-kicker">Répartition sociale globale</span>
      <h2>Groupes civils</h2>
      <div className="population-group-list">
        {topGroups.map(({ id, count, def }) => <article key={id} className={`population-group-card group-${id}`}>
          <div><strong>{def.name}</strong><span>{def.combineLabel}</span></div>
          <b>{count}</b>
          <i><span style={{ width: `${Math.round((count / Math.max(1, population.total)) * 100)}%` }} /></i>
          <p>{def.description}</p>
        </article>)}
      </div>
    </div>

    <div className="panel population-sector-panel">
      <span className="brand-kicker">Secteurs à risque social</span>
      <h2>Lecture par bloc</h2>
      <div className="population-sector-list">
        {riskySectors.map(({ sectorPop, sector, risk }) => <button key={sectorPop.sectorId} className={sectorPop.sectorId === selected?.sectorId ? 'active population-sector-card' : 'population-sector-card'} onClick={() => setSelectedSector(sectorPop.sectorId)}>
          <strong>{sector.name}</strong>
          <span>{sector.status} — risque social {risk}%</span>
          <div className="module-row-metrics"><b>Λ {sectorPop.lambdaSupport}%</b><b>Xen {sectorPop.xenExposure}%</b><b>Conf {sectorPop.compliance}%</b></div>
          <em>{sectorPop.lastChange}</em>
        </button>)}
      </div>
    </div>

    {selected && selectedSector && <div className="panel selected-population-panel">
      <span className="brand-kicker">Dossier secteur sélectionné</span>
      <h2>{selectedSector.name}</h2>
      <p>{selectedSector.role}</p>
      <div className="module-stat-grid">
        <MiniStat label="Total" value={selected.total} />
        <MiniStat label="Conformité" value={selected.compliance} />
        <MiniStat label="Lambda" value={selected.lambdaSupport} dangerHigh />
        <MiniStat label="Xen" value={selected.xenExposure} dangerHigh />
        <MiniStat label="Informants" value={selected.informantDensity} dangerHigh />
        <MiniStat label="Travail" value={selected.workforce} />
      </div>
      <div className="sector-pop-breakdown">
        {populationGroupOrder.map((id) => <article key={id}>
          <span>{populationGroupDefinitions[id].name}</span>
          <b>{selected.groups[id]}</b>
          <i><em style={{ width: `${groupPercent(selected, id)}%` }} /></i>
        </article>)}
      </div>
      <div className="lore-note">▸ {selected.lastChange}</div>
    </div>}

    <div className="panel feed population-log-panel">
      <span className="brand-kicker">Population drift log</span>
      <h2>Derniers mouvements sociaux</h2>
      {population.log.slice(0, 12).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}

export function CivilProtectionScreen({ game, sector, sectorAction, deploy, operations, changeDoctrine, applyOperation }: { game: GameState; sector: Sector; sectorAction: SectorAction; deploy: Deploy; operations: CivilProtectionOperation[]; changeDoctrine: (id: CivilProtectionDoctrineId) => void; applyOperation: (operation: CivilProtectionOperation) => void }) {
  const cpUnits = game.units.filter((unit) => unit.category === 'Civil Protection' || ['scanner', 'manhack'].includes(unit.id));
  const cp = game.civilProtection;
  const activeDoctrine = civilProtectionDoctrines.find((item) => item.id === cp.activeDoctrine) ?? civilProtectionDoctrines[0];
  const selectedPost = cp.posts.find((post) => post.sectorId === sector.id) ?? cp.posts[0];
  const worstPosts = [...cp.posts]
    .sort((a, b) => (b.corruption + b.brutality + b.lambdaInfluence + b.abuseReports) - (a.corruption + a.brutality + a.lambdaInfluence + a.abuseReports))
    .slice(0, 6);
  const districts = [...game.sectors]
    .sort((a, b) => (b.rebel + b.fear + (100 - b.loyalty)) - (a.rebel + a.fear + (100 - a.loyalty)))
    .slice(0, 6);

  return <section className="panel-grid dedicated-screen civil-protection-screen cp-deep-screen">
    <div className="panel module-command cp-command-panel">
      <span className="brand-kicker">Civil Protection Directorate / Human Collaborator Layer</span>
      <h2>Corruption, brutalité et discipline CP</h2>
      <p>La Protection Civile n’est plus un simple bouton de répression : chaque poste possède ses agents, sa discipline, sa brutalité, sa corruption, ses fuites de rations, ses fausses accusations et son niveau d’infiltration Lambda.</p>
      <div className="module-stat-grid">
        <MiniStat label="Agents CP" value={cp.totalOfficers} />
        <MiniStat label="Discipline" value={cp.disciplineIndex} />
        <MiniStat label="Brutalité" value={cp.brutalityIndex} dangerHigh />
        <MiniStat label="Corruption" value={cp.corruptionIndex} dangerHigh />
        <MiniStat label="Fuites ration" value={cp.rationLeakageIndex} dangerHigh />
        <MiniStat label="Faux dossiers" value={cp.falseChargeIndex} dangerHigh />
        <MiniStat label="Infiltration Λ" value={cp.lambdaInfiltration} dangerHigh />
        <MiniStat label="Agents compromis" value={cp.compromisedOfficers} dangerHigh />
      </div>
      <p className="lore-note">COAN : une CP trop libre devient une milice corrompue. Une CP trop brutale réduit les rues au silence, mais fabrique des témoins, familles de disparus et sympathisants Lambda.</p>
    </div>

    <div className="panel cp-doctrine-panel">
      <span className="brand-kicker">Doctrine active</span>
      <h2>{activeDoctrine.name}</h2>
      <p>{activeDoctrine.description}</p>
      <div className="policy-list compact-policy-list">
        {civilProtectionDoctrines.map((doctrine) => <button key={doctrine.id} className={doctrine.id === cp.activeDoctrine ? 'active policy-card' : 'policy-card'} onClick={() => changeDoctrine(doctrine.id)}>
          <strong>{doctrine.name}</strong>
          <span>{doctrine.publicLine}</span>
          <em>Brutalité {doctrine.brutalityBias >= 0 ? '+' : ''}{doctrine.brutalityBias} / Corruption {doctrine.corruptionBias >= 0 ? '+' : ''}{doctrine.corruptionBias} / Audit {doctrine.auditRisk >= 0 ? '+' : ''}{doctrine.auditRisk}</em>
        </button>)}
      </div>
    </div>

    <div className="panel cp-post-panel">
      <span className="brand-kicker">Poste lié au secteur sélectionné</span>
      <h2>{selectedPost?.name ?? 'Aucun poste local'}</h2>
      {selectedPost && <>
        <p>{sector.name} — {sector.status} — {sector.zone}</p>
        <div className="module-stat-grid">
          <MiniStat label="Officiers" value={selectedPost.officers} />
          <MiniStat label="Discipline" value={selectedPost.discipline} />
          <MiniStat label="Brutalité" value={selectedPost.brutality} dangerHigh />
          <MiniStat label="Corruption" value={selectedPost.corruption} dangerHigh />
          <MiniStat label="Fuite ration" value={selectedPost.rationLeakage} dangerHigh />
          <MiniStat label="Abus" value={selectedPost.abuseReports} dangerHigh />
          <MiniStat label="Faux dossiers" value={selectedPost.falseCharges} dangerHigh />
          <MiniStat label="Influence Λ" value={selectedPost.lambdaInfluence} dangerHigh />
        </div>
        <div className="lore-note">▸ {selectedPost.lastIncident}</div>
      </>}
      <div className="actions module-actions">
        <button onClick={() => sectorAction('curfew')}>Couvre-feu local</button>
        <button onClick={() => sectorAction('raid')}>Raid d’appartements</button>
        <button onClick={() => sectorAction('propaganda')}>Annonce CP / BreenCast local</button>
      </div>
    </div>

    <div className="panel cp-operations-panel">
      <span className="brand-kicker">Opérations internes CP</span>
      <h2>Actions sur le poste sélectionné</h2>
      <div className="operation-list">
        {operations.map((operation) => <button key={operation.id} className="operation-card cp-operation-card" onClick={() => applyOperation(operation)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Coût {operation.cost} rations / risque incident {operation.risk}%</em>
        </button>)}
      </div>
    </div>

    <div className="panel cp-risk-panel">
      <span className="brand-kicker">Postes problématiques</span>
      <h2>Corruption / abus / Lambda</h2>
      <div className="population-sector-list cp-post-list">
        {worstPosts.map((post) => {
          const linkedSector = game.sectors.find((item) => item.id === post.sectorId);
          const risk = Math.min(100, Math.round(post.corruption * 0.28 + post.brutality * 0.24 + post.lambdaInfluence * 0.25 + post.abuseReports * 0.18 + post.falseCharges * 0.12));
          return <article key={post.id} className="population-sector-card cp-post-card">
            <strong>{post.name}</strong>
            <span>{linkedSector?.name ?? post.sectorId} — risque interne {risk}%</span>
            <div className="module-row-metrics"><b>Corr {post.corruption}%</b><b>Brut {post.brutality}%</b><b>Λ {post.lambdaInfluence}%</b></div>
            <em>{post.lastIncident}</em>
          </article>;
        })}
      </div>
    </div>

    <div className="panel module-tactical-list">
      <span className="brand-kicker">Secteurs à pacifier</span>
      <h2>Priorité maintien de l’ordre</h2>
      {districts.map((item) => <article key={item.id} className="module-row-card">
        <div><strong>{item.name}</strong><span>{item.status} — {item.zone}</span></div>
        <div className="module-row-metrics"><b>Λ {item.rebel}%</b><b>Peur {item.fear}%</b><b>Loyauté {item.loyalty}%</b></div>
      </article>)}
    </div>

    <div className="panel module-deployments">
      <span className="brand-kicker">Unités urbaines</span>
      <h2>Déploiements CP vers {sector.name}</h2>
      <div className="operation-list">{cpUnits.map((unit) => <UnitButton key={unit.id} unit={unit} sector={sector} deploy={deploy} />)}</div>
    </div>

    <div className="panel feed module-doctrine cp-log-panel">
      <span className="brand-kicker">Journal CP / Internal Affairs</span>
      <h2>Derniers incidents</h2>
      {cp.log.slice(0, 12).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}

export function OverwatchCommandScreen({ game, sector, deploy, globalAction }: { game: GameState; sector: Sector; deploy: Deploy; globalAction: GlobalAction }) {
  const overwatchUnits = game.units.filter((unit) => unit.category === 'Overwatch' || unit.category === 'Synth' || unit.category === 'Airwatch' || unit.category === 'Authority');
  const combatZones = [...game.sectors].sort((a, b) => (b.rebel + b.xen + (100 - b.infrastructure)) - (a.rebel + a.xen + (100 - a.infrastructure))).slice(0, 5);
  const escalation = Math.min(100, Math.round(game.stats.combine * 0.35 + game.stats.fear * 0.25 + game.stats.civilianLosses / 35 + game.stats.suspicion * 0.2));

  return <section className="panel-grid dedicated-screen overwatch-screen">
    <div className="panel module-command">
      <span className="brand-kicker">Overwatch Command Authority</span>
      <h2>Réponse militaire transhumaine</h2>
      <p>Overwatch doit rester une escalade : efficace contre Lambda et les brèches Xen, mais politiquement visible, destructeur et surveillé par la Citadelle.</p>
      <div className="module-stat-grid">
        <MiniStat label="Escalade" value={escalation} dangerHigh />
        <MiniStat label="Combine" value={game.stats.combine} />
        <MiniStat label="Citadelle" value={game.stats.citadel} />
        <MiniStat label="Suspicion" value={game.stats.suspicion} dangerHigh />
      </div>
      <div className="actions module-actions">
        <button onClick={() => globalAction('advisor')}>Demander validation Advisor</button>
        <button onClick={() => globalAction('breencast')}>Justifier l’opération au public</button>
      </div>
    </div>

    <div className="panel module-deployments">
      <span className="brand-kicker">Réserves tactiques</span>
      <h2>Déploiement vers {sector.name}</h2>
      <div className="operation-list">{overwatchUnits.map((unit) => <UnitButton key={unit.id} unit={unit} sector={sector} deploy={deploy} />)}</div>
    </div>

    <div className="panel module-tactical-list">
      <span className="brand-kicker">Zones de combat probables</span>
      <h2>Priorités Overwatch</h2>
      {combatZones.map((item) => <article key={item.id} className="module-row-card">
        <div><strong>{item.name}</strong><span>{item.status}</span></div>
        <div className="module-row-metrics"><b>Λ {item.rebel}%</b><b>Xen {item.xen}%</b><b>Infra {item.infrastructure}%</b></div>
      </article>)}
    </div>

    <div className="panel feed module-doctrine">
      <span className="brand-kicker">Protocoles lourds</span>
      <h2>Limites administratives</h2>
      <p>▸ Strider : domination immédiate, dégâts d’infrastructure massifs.</p>
      <p>▸ Hunter : chasse mobile et protection Advisor, coût élevé.</p>
      <p>▸ Suppressor / Elite : brise les barricades mais augmente la mémoire traumatique civile.</p>
      <p>▸ Airwatch : contrôle des axes, mais consomme l’autorité énergétique de la Citadelle.</p>
    </div>
  </section>;
}

export function CitadelDirectivesScreen({ game, globalAction, activateProtocol }: { game: GameState; globalAction: GlobalAction; activateProtocol: (node: CitadelDirectiveNode) => void }) {
  const progress = game.directive.mode === 'above'
    ? Math.round((game.stats[game.directive.stat] / game.directive.target) * 100)
    : Math.round(((100 - game.stats[game.directive.stat]) / Math.max(1, 100 - game.directive.target)) * 100);
  const pressure = Math.min(100, Math.round((100 - game.stats.citadel) * 0.45 + game.stats.suspicion * 0.45 + game.auditHeat * 0.35 + game.citadelDirectiveTree.advisorAttention * 0.25));
  const latest = game.reports[0];
  const tree = game.citadelDirectiveTree;
  const branches = getBranchCompletion(tree);
  const available = getAvailableDirectiveNodes(tree).sort((a, b) => a.tier - b.tier).slice(0, 12);
  const completed = citadelDirectiveNodes.filter((node) => tree.completedNodes.includes(node.id)).slice(-12).reverse();
  const activeBranch = citadelDirectiveBranches.find((branch) => branch.id === tree.activeBranch) ?? citadelDirectiveBranches[0];

  return <section className="panel-grid dedicated-screen citadel-screen citadel-tree-screen">
    <div className="panel module-command citadel-command">
      <span className="brand-kicker">Citadel Directive Stack</span>
      <h2>{game.directive.title}</h2>
      <p>{game.directive.body}</p>
      <div className="module-stat-grid">
        <MiniStat label="Progression" value={Math.min(160, progress)} />
        <MiniStat label="Jours restants" value={game.directiveDays} />
        <MiniStat label="Pression Advisor" value={pressure} dangerHigh />
        <MiniStat label="Citadelle" value={game.stats.citadel} />
      </div>
      <div className="advice">Objectif court terme : {game.directive.stat} {game.directive.mode === 'above' ? '≥' : '≤'} {game.directive.target}. Les protocoles ci-dessous sont permanents et modifient City chaque journée.</div>
      <div className="actions module-actions"><button onClick={() => globalAction('advisor')}>Provoquer revue Advisor</button><button onClick={() => globalAction('breencast')}>Aligner BreenCast</button></div>
    </div>

    <div className="panel citadel-tree-overview">
      <span className="brand-kicker">Arbre de doctrine permanent</span>
      <h2>{activeBranch.name}</h2>
      <p>{activeBranch.description}</p>
      <blockquote>{activeBranch.loreLine}</blockquote>
      <div className="module-stat-grid">
        <MiniStat label="Protocoles" value={tree.completedNodes.length} />
        <MiniStat label="Pression branche" value={tree.branchPressure} dangerHigh />
        <MiniStat label="Attention Advisor" value={tree.advisorAttention} dangerHigh />
        <MiniStat label="Capacités" value={tree.unlockedCapabilities.length} />
      </div>
      <p className="lore-note">Mandat COAN : {tree.dailyMandate}</p>
    </div>

    <div className="panel citadel-branches-panel">
      <span className="brand-kicker">Branches Citadel</span>
      <h2>Progression doctrinale</h2>
      <div className="citadel-branch-grid">
        {branches.map(({ branch, completed, available, percent }) => <article key={branch.id} className={`citadel-branch-card branch-${branch.colorLabel} ${tree.activeBranch === branch.id ? 'active' : ''}`}>
          <div><strong>{branch.name}</strong><span>{completed.length}/5 protocoles</span></div>
          <i><em style={{ width: `${percent}%` }} /></i>
          <p>{branch.description}</p>
          <small>{available.length} protocole(s) disponible(s)</small>
        </article>)}
      </div>
    </div>

    <div className="panel available-directives-panel">
      <span className="brand-kicker">Protocoles disponibles</span>
      <h2>Choisir une orientation permanente</h2>
      <div className="directive-node-list">
        {available.map((node) => <button key={node.id} className={`directive-node node-${node.branchId}`} onClick={() => activateProtocol(node)}>
          <span>Niveau {node.tier}/5 — {citadelDirectiveBranches.find((b) => b.id === node.branchId)?.name}</span>
          <strong>{node.title}</strong>
          <em>{node.body}</em>
          <small>Coût : {Object.entries(node.cost).map(([k, v]) => `${k} ${v}`).join(', ') || 'aucun'} · Risque Advisor {node.advisorRisk}%</small>
        </button>)}
      </div>
    </div>

    <div className="panel completed-directives-panel">
      <span className="brand-kicker">Protocoles actifs</span>
      <h2>Effets quotidiens permanents</h2>
      {completed.length ? <div className="directive-node-list compact">
        {completed.map((node) => <article key={node.id} className={`directive-node node-${node.branchId}`}>
          <span>Niveau {node.tier} — {citadelDirectiveBranches.find((b) => b.id === node.branchId)?.name}</span>
          <strong>{node.title}</strong>
          <small>Effet quotidien : {Object.entries(node.dailyEffects).map(([k, v]) => `${k} ${v > 0 ? '+' : ''}${v}`).join(', ') || 'aucun'}</small>
        </article>)}
      </div> : <p>Aucun protocole permanent encore verrouillé.</p>}
    </div>

    <div className="panel module-tactical-list">
      <span className="brand-kicker">Statut des rapports</span>
      <h2>Transmission Citadel</h2>
      <p>Politique active : <b>{reportPolicyLabels[game.reportPolicy]}</b></p>
      {latest ? <>
        <div className="module-stat-grid"><MiniStat label="Falsification" value={latest.falsificationScore ?? 0} dangerHigh /><MiniStat label="Audit" value={latest.auditRisk ?? 0} dangerHigh /><MiniStat label="Champs altérés" value={latest.falsifiedFields?.length ?? 0} dangerHigh /></div>
        {(latest.auditLines ?? []).map((line) => <p key={line}>▸ {line}</p>)}
      </> : <p>Aucun rapport encore transmis.</p>}
    </div>

    <div className="panel feed module-doctrine">
      <span className="brand-kicker">Capacités déverrouillées</span>
      <h2>Doctrine enregistrée</h2>
      {tree.unlockedCapabilities.slice().reverse().slice(0, 12).map((capability) => <p key={capability}>▸ {capability}</p>)}
      <hr />
      {tree.log.slice(0, 8).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}

export function RationingScreen({ game, globalAction, operations, setPolicy, applyOperation }: { game: GameState; globalAction: GlobalAction; operations: RationOperation[]; setPolicy: (policyId: RationPolicyId) => void; applyOperation: (operation: RationOperation) => void }) {
  const economy = game.rationEconomy;
  const activePolicy = rationPolicies.find((policy) => policy.id === economy.activePolicy) ?? rationPolicies[0];
  const worstHunger = [...economy.ledgers]
    .map((ledger) => ({ ledger, sector: game.sectors.find((sector) => sector.id === ledger.sectorId) }))
    .filter((item): item is { ledger: typeof economy.ledgers[number]; sector: Sector } => !!item.sector)
    .sort((a, b) => (b.ledger.hunger + b.ledger.blackMarket + b.ledger.hoarding) - (a.ledger.hunger + a.ledger.blackMarket + a.ledger.hoarding))
    .slice(0, 8);
  const privileged = economy.ledgers.filter((ledger) => ledger.priority === 'Citadel' || ledger.priority === 'Industry').length;
  const punished = economy.ledgers.filter((ledger) => ledger.priority === 'Punished' || ledger.priority === 'Underclass').length;

  return <section className="panel-grid dedicated-screen rationing-screen advanced-rationing-screen">
    <div className="panel module-command ration-command">
      <span className="brand-kicker">Ration Control Office</span>
      <h2>Économie avancée des rations</h2>
      <p>Les rations sont désormais simulées secteur par secteur : besoin réel, allocation, ratio calorique, faim, marché noir, informateurs, hoarding et bonus de conformité. C’est un levier Combine : nourrir, punir, acheter les dénonciations ou maquiller la pénurie.</p>
      <div className="module-stat-grid ration-stat-grid">
        <MiniStat label="Réserve" value={economy.reserves} />
        <MiniStat label="Prod/jour" value={economy.dailyProduction} />
        <MiniStat label="Besoin/jour" value={economy.dailyNeed} />
        <MiniStat label="Alloué/jour" value={economy.dailyAllocated} />
        <MiniStat label="Autonomie" value={economy.autonomyDays} dangerHigh />
        <MiniStat label="Faim" value={economy.hungerIndex} dangerHigh />
        <MiniStat label="Marché noir" value={economy.blackMarketIndex} dangerHigh />
        <MiniStat label="Informateurs" value={economy.informantIndex} dangerHigh />
      </div>
      <div className="ration-policy-box">
        <label>Politique active</label>
        <select value={economy.activePolicy} onChange={(event) => setPolicy(event.target.value as RationPolicyId)}>
          {rationPolicies.map((policy) => <option key={policy.id} value={policy.id}>{policy.name}</option>)}
        </select>
        <p><b>{activePolicy.name}</b> — {activePolicy.description}</p>
        <p className="lore-note">Justification BreenCast : {activePolicy.publicJustification}</p>
      </div>
      <div className="actions module-actions"><button onClick={() => globalAction('breencast')}>Justifier au BreenCast</button><button onClick={() => globalAction('advisor')}>Faire valider par Advisor</button><button onClick={() => globalAction('shadow_help')}>Aide clandestine hors registre</button></div>
    </div>

    <div className="panel ration-ledger-panel">
      <span className="brand-kicker">Secteurs affamés / instables</span>
      <h2>Registre calorique par bloc</h2>
      <div className="ration-ledger-list">
        {worstHunger.map(({ ledger, sector }) => <article key={ledger.sectorId} className={`ration-ledger-card priority-${ledger.priority.toLowerCase()}`}>
          <div className="ration-ledger-head"><strong>{sector.name}</strong><span>{ledger.priority} / {sector.status}</span></div>
          <div className="module-row-metrics"><b>Besoin {ledger.dailyNeed}</b><b>Alloué {ledger.allocated}</b><b>Ratio {ledger.caloricRatio}%</b></div>
          <div className="ration-bars"><label>Faim<i><b style={{ width: `${ledger.hunger}%` }} /></i></label><label>Marché noir<i><b style={{ width: `${ledger.blackMarket}%` }} /></i></label><label>Dénonciations<i><b style={{ width: `${ledger.informants}%` }} /></i></label></div>
          <p>{ledger.lastIncident}</p>
        </article>)}
      </div>
    </div>

    <div className="panel operation-panel">
      <span className="brand-kicker">Opérations alimentaires</span>
      <h2>Actions directes</h2>
      <div className="operation-list ration-operation-list">
        {operations.map((operation) => <button key={operation.id} className="module-unit-button ration-operation" onClick={() => applyOperation(operation)}>
          <strong>{operation.name}</strong>
          <span>Coût réserve : {operation.cost > 0 ? '-' : '+'}{Math.abs(operation.cost)} / risque {operation.risk}%</span>
          <em>{operation.description}</em>
        </button>)}
      </div>
    </div>

    <div className="panel feed module-doctrine ration-doctrine">
      <span className="brand-kicker">COAN food stability</span>
      <h2>Diagnostic Combine</h2>
      <p>▸ Autonomie estimée : {economy.autonomyDays} jours.</p>
      <p>▸ Blocs privilégiés : {privileged}. Blocs punis / sous-classe : {punished}.</p>
      <p>▸ Déficit quotidien : {economy.dailyDeficit} unités. Fuite corruption/hoarding : {economy.corruptionLeakage}%.</p>
      <p>▸ Une pénurie visible crée des files de rationnement, puis du troc, puis des caches Lambda.</p>
      <p>▸ Les primes de dénonciation améliorent l’information mais dégradent la cohésion civile.</p>
      <h3>Journal RCO</h3>
      {economy.log.slice(0, 8).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}

export function ArchivesScreen({ game, eventSummary }: { game: GameState; eventSummary: Record<string, number> }) {
  const latest = game.reports[0];
  return <section className="panel-grid dedicated-screen archives-screen">
    <div className="panel module-command">
      <span className="brand-kicker">Civil Authority Archives</span>
      <h2>Archives opérationnelles</h2>
      <p>Historique consolidé de City {game.city} : décisions, rapports, crises, falsifications, Nova Prospekt et état de fin potentiel.</p>
      <div className="module-stat-grid">
        <MiniStat label="Jour" value={game.day} />
        <MiniStat label="Rapports" value={game.reports.length} />
        <MiniStat label="Logs" value={game.log.length} />
        <MiniStat label="Événements" value={Object.values(eventSummary).reduce((a, b) => a + b, 0)} />
      </div>
    </div>

    <div className="panel feed archive-feed">
      <span className="brand-kicker">Dernier rapport</span>
      <h2>{latest?.title ?? 'Aucun rapport archivé'}</h2>
      {latest ? latest.lines.slice(0, 12).map((line) => <p key={line}>▸ {line}</p>) : <p>Clôture une journée pour générer un dossier.</p>}
    </div>

    <div className="panel feed archive-feed">
      <span className="brand-kicker">Journal COAN</span>
      <h2>Dernières entrées</h2>
      {game.log.slice(0, 24).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>

    <div className="panel module-tactical-list">
      <span className="brand-kicker">Catalogue de crise</span>
      <h2>Répartition active</h2>
      {Object.entries(eventSummary).map(([type, count]) => <article key={type} className="module-row-card"><div><strong>{type}</strong><span>événements disponibles</span></div><div className="module-row-metrics"><b>{count}</b></div></article>)}
    </div>
  </section>;
}

export function ResistanceOperationsScreen({ game, operations, applyOperation, changeDoctrine, factionOperations, applyFactionOperation, changeFactionDoctrine }: { game: GameState; operations: ResistanceOperation[]; applyOperation: (operation: ResistanceOperation) => void; changeDoctrine: (doctrine: ResistanceNetworkState['activeDoctrine']) => void; factionOperations: ResistanceFactionOperation[]; applyFactionOperation: (operation: ResistanceFactionOperation) => void; changeFactionDoctrine: (doctrine: ResistanceFactionDoctrineId) => void }) {
  const network = game.resistanceNetwork;
  const cells = [...network.cells].sort((a, b) => (b.heat + b.weapons + b.manpower) - (a.heat + a.weapons + a.manpower));
  const routes = [...network.routes].sort((a, b) => (b.risk + b.throughput) - (a.risk + a.throughput));
  const factionState = game.resistanceFactions;
  const dominantFaction = factionState.factions.find((faction) => faction.id === factionState.dominantFactionId) ?? factionState.factions[0];
  const doctrineLabels: Record<ResistanceNetworkState['activeDoctrine'], string> = {
    standard_counterinsurgency: 'Contre-insurrection standard',
    decapitation: 'Décapitation des chefs Lambda',
    route_denial: 'Déni canaux / égouts',
    radio_silence: 'Silence radio pirate',
    controlled_tolerance: 'Tolérance contrôlée / filature',
    sympathizer_shadow: 'Couverture clandestine sympathisante',
  };
  return <section className="panel-grid dedicated-screen resistance-screen advanced-resistance-screen">
    <div className="panel module-command resistance-command">
      <img className="dossier-header-visual" src={getDossierVisual('lambda_courier')} alt="" aria-hidden="true" />
      <span className="brand-kicker">Anti-Citizen Network / Lambda Grid</span>
      <h2>Résistance Lambda avancée</h2>
      <p>Le réseau n’est plus une jauge unique : cellules nommées, chefs, safehouses, routes d’exfiltration, radios pirates, caches d’armes, labos clandestins et support Vortigaunt évoluent chaque journée.</p>
      <div className="module-stat-grid">
        <MiniStat label="Cohésion" value={network.networkCohesion} dangerHigh />
        <MiniStat label="Capacité armée" value={network.armedCapacity} dangerHigh />
        <MiniStat label="Safehouses" value={network.safehouseIntegrity} dangerHigh />
        <MiniStat label="Radio libre" value={network.radioFreedom} dangerHigh />
        <MiniStat label="Mobilité tunnels" value={network.tunnelMobility} dangerHigh />
        <MiniStat label="Ops simultanées" value={network.simultaneousOpsRisk} dangerHigh />
      </div>
      <label>Doctrine active</label>
      <select value={network.activeDoctrine} onChange={(event) => changeDoctrine(event.target.value as ResistanceNetworkState['activeDoctrine'])}>
        {Object.entries(doctrineLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
      </select>
      <p className="lore-note">COAN : les canaux, égouts et routes de service sont des multiplicateurs. Les cellules ne deviennent dangereuses que lorsqu’elles se coordonnent.</p>
    </div>

    <div className="panel resistance-factions-panel">
      <span className="brand-kicker">Factions internes Lambda</span>
      <h2>Courants, rivalités et méthodes</h2>
      <p className="lore-note">Faction dominante : <b>{dominantFaction?.name}</b> — {dominantFaction?.currentAgenda}</p>
      <div className="module-stat-grid">
        <MiniStat label="Fragmentation" value={factionState.fragmentationIndex} dangerHigh />
        <MiniStat label="Science Lambda" value={factionState.scientificThreat} dangerHigh />
        <MiniStat label="Canaux" value={factionState.canalControl} dangerHigh />
        <MiniStat label="Mobilisation" value={factionState.armedMobilization} dangerHigh />
        <MiniStat label="Vortigaunts" value={factionState.vortigauntDiplomacy} dangerHigh />
        <MiniStat label="Martyr Nova" value={factionState.novaMartyrdom} dangerHigh />
      </div>
      <label>Doctrine anti-factions</label>
      <select value={factionState.activeDoctrine} onChange={(event) => changeFactionDoctrine(event.target.value as ResistanceFactionDoctrineId)}>
        <option value="fragment_and_isolate">Fragmenter et isoler</option>
        <option value="scientific_decoy">Leurre scientifique</option>
        <option value="canal_denial">Déni canaux / égouts</option>
        <option value="vortigaunt_containment">Confinement Vortigaunt</option>
        <option value="nova_counter_narrative">Contre-récit Nova Prospekt</option>
        <option value="selective_tolerance">Tolérance sélective</option>
      </select>
      <div className="resistance-faction-list">
        {factionState.factions.map((faction) => <article key={faction.id} className={`resistance-faction-card ${faction.discovered ? 'discovered' : ''} ${faction.suppressed ? 'suppressed' : ''}`}>
          <div className="technology-node-head"><span>{faction.combineLabel}</span><strong>{faction.name}</strong></div>
          <p>{faction.doctrine}</p>
          <div className="mini-grid">
            <span>Influence <b>{faction.influence}%</b></span>
            <span>Cohésion <b>{faction.cohesion}%</b></span>
            <span>Militance <b>{faction.militancy}%</b></span>
            <span>Secret <b>{faction.secrecy}%</b></span>
            <span>Sympathie <b>{faction.publicSympathy}%</b></span>
            <span>Nova <b>{faction.novaTrauma}%</b></span>
          </div>
          <p className="lore-note">Méthodes : {faction.methods.join(' / ')}</p>
        </article>)}
      </div>
    </div>

    <div className="panel resistance-faction-ops-panel">
      <span className="brand-kicker">Contre-factions</span>
      <h2>Actions ciblées par courant</h2>
      <div className="technology-node-list compact">
        {factionOperations.map((operation) => <button key={operation.id} className="directive-node node-repression" onClick={() => applyFactionOperation(operation)}>
          <span>{operation.targetFaction}</span>
          <strong>{operation.name}</strong>
          <em>{operation.description}</em>
          <small>{operation.logLine}</small>
        </button>)}
      </div>
    </div>

    <div className="panel resistance-cells-panel">
      <span className="brand-kicker">Cellules Lambda</span>
      <h2>Chefs, caches et stade opérationnel</h2>
      <div className="resistance-cell-list">
        {cells.map((cell) => <article key={cell.id} className={`resistance-cell-card stage-${cell.stage} ${cell.discovered ? 'discovered' : ''} ${cell.compromised ? 'compromised' : ''}`}>
          <div className="technology-node-head"><span>{cell.type}</span><strong>{cell.name}</strong></div>
          <p><b>{cell.leaderAlias}</b> — {cell.notes}</p>
          <div className="mini-grid">
            <span>Stade <b>{cell.stage}</b></span>
            <span>Secret <b>{cell.secrecy}%</b></span>
            <span>Effectifs <b>{cell.manpower}%</b></span>
            <span>Armes <b>{cell.weapons}%</b></span>
            <span>Radio <b>{cell.radioReach}%</b></span>
            <span>Chaleur <b>{cell.heat}%</b></span>
          </div>
          <p className="lore-note">Prochaine opération : {cell.nextOperation}</p>
        </article>)}
      </div>
    </div>

    <div className="panel resistance-routes-panel">
      <span className="brand-kicker">Canaux / Égouts / Routes</span>
      <h2>Axes d’exfiltration</h2>
      {routes.map((route) => {
        const from = game.sectors.find((sector) => sector.id === route.fromSectorId)?.name ?? route.fromSectorId;
        const to = game.sectors.find((sector) => sector.id === route.toSectorId)?.name ?? route.toSectorId;
        return <article key={route.id} className="module-row-card resistance-route-card">
          <div><strong>{route.label}</strong><span>{from} → {to} / {route.type} / contrôle {route.controlledBy}</span></div>
          <div className="module-row-metrics"><b>Secret {route.secrecy}%</b><b>Débit {route.throughput}%</b><b>Risque {route.risk}%</b></div>
        </article>;
      })}
    </div>

    <div className="panel resistance-operations-panel">
      <span className="brand-kicker">Opérations anti-Lambda</span>
      <h2>Actions ciblées</h2>
      <div className="technology-node-list compact">
        {operations.map((operation) => <button key={operation.id} className="directive-node node-repression" onClick={() => applyOperation(operation)}>
          <span>{operation.target}</span>
          <strong>{operation.name}</strong>
          <em>{operation.description}</em>
          <small>Effets : {Object.entries(operation.effects).map(([k, v]) => `${k} ${v > 0 ? '+' : ''}${v}`).join(', ')}</small>
        </button>)}
      </div>
    </div>

    <div className="panel feed resistance-log-panel">
      <span className="brand-kicker">Lambda Watch</span>
      <h2>Journal réseau</h2>
      <div className="module-stat-grid"><MiniStat label="Découvertes" value={network.discoveredCells} dangerHigh /><MiniStat label="Compromises" value={network.compromisedCells} dangerHigh /><MiniStat label="Soulèvement" value={network.openUprisingCells} dangerHigh /><MiniStat label="Vortigaunts" value={network.vortigauntInfluence} dangerHigh /></div>
      {factionState.log.slice(0, 8).map((line, index) => <p key={`faction-${line}-${index}`}>▸ {line}</p>)}{network.log.slice(0, 12).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}


export function VortigauntBioticsScreen({ game, operations, changeDoctrine, applyOperation }: { game: GameState; operations: VortigauntOperation[]; changeDoctrine: (doctrine: VortigauntDoctrineId) => void; applyOperation: (operation: VortigauntOperation, groupId?: string) => void }) {
  const [selectedGroupId, setSelectedGroupId] = useState(game.vortigaunts.groups[0]?.id ?? '');
  const state = game.vortigaunts;
  const selectedGroup = state.groups.find((group) => group.id === selectedGroupId) ?? state.groups[0];
  const activeDoctrine = vortigauntDoctrines.find((doctrine) => doctrine.id === state.activeDoctrine) ?? vortigauntDoctrines[0];
  const pressureGroups = [...state.groups]
    .sort((a, b) => (b.escapeRisk + b.resistanceLink + b.novaPressure + b.vortessenceSignal) - (a.escapeRisk + a.resistanceLink + a.novaPressure + a.vortessenceSignal));
  const statusLabels: Record<string, string> = {
    enslaved_biotics: 'Biotics asservis',
    controlled_asset: 'Actif contrôlé',
    nova_processed: 'Traitement Nova',
    contained_watch: 'Confinement observé',
    free_hidden: 'Cercle libre caché',
    resistance_allied: 'Allié Lambda',
  };
  const networkOperations = operations.filter((operation) => operation.target === 'network');
  const groupOperations = operations.filter((operation) => operation.target === 'group');

  return <section className="panel-grid dedicated-screen vortigaunt-screen biotics-screen">
    <div className="panel module-command vort-command-panel">
      <img className="dossier-header-visual" src={getDossierVisual('vortigaunt_biotic')} alt="" aria-hidden="true" />
      <span className="brand-kicker">VORTIGAUNT / BIOTIC CONTROL OFFICE</span>
      <h2>Vortigaunts, Biotics et Vortessence</h2>
      <p>Ce module sépare les Vortigaunts du simple réseau Lambda : les Biotics captifs servent de main-d’œuvre, d’outil de quarantaine et de sujet Nova Prospekt, tandis que les cercles libres soignent, cachent et relient la Résistance via la Vortessence.</p>
      <div className="module-stat-grid">
        <MiniStat label="Captifs" value={state.totalCaptive} />
        <MiniStat label="Libres" value={state.totalFree} dangerHigh />
        <MiniStat label="Vortessence" value={state.vortessenceCoherence} dangerHigh />
        <MiniStat label="Pression Biotics" value={state.bioticPressure} dangerHigh />
        <MiniStat label="Lecture Xen" value={state.xenInsight} />
        <MiniStat label="Aide quarantaine" value={state.quarantineAid} />
        <MiniStat label="Lien Lambda" value={state.resistanceSympathy} dangerHigh />
        <MiniStat label="Intérêt Advisor" value={state.advisorInterest} dangerHigh />
      </div>
      <p className="lore-note">COAN : les Vortigaunts sont un risque non local. Les isoler casse Lambda, mais réduit la capacité à comprendre Xen. Les exploiter à Nova Prospekt crée des martyrs et des signaux synchronisés.</p>
    </div>

    <div className="panel vort-doctrine-panel">
      <span className="brand-kicker">Doctrine active</span>
      <h2>{activeDoctrine.name}</h2>
      <p>{activeDoctrine.description}</p>
      <div className="policy-list compact-policy-list">
        {vortigauntDoctrines.map((doctrine) => <button key={doctrine.id} className={doctrine.id === state.activeDoctrine ? 'active policy-card' : 'policy-card'} onClick={() => changeDoctrine(doctrine.id)}>
          <strong>{doctrine.name}</strong>
          <span>{doctrine.publicLine}</span>
          <em>Risque Advisor {doctrine.advisorRisk}% / effets : {Object.entries(doctrine.effects).map(([key, value]) => `${key} ${value}`).join(' · ')}</em>
        </button>)}
      </div>
    </div>

    <div className="panel vort-groups-panel">
      <span className="brand-kicker">Groupes Vortigaunt suivis</span>
      <h2>Biotics, cercles libres et confinement</h2>
      <div className="vort-group-list">
        {pressureGroups.map((group) => <button key={group.id} className={group.id === selectedGroup?.id ? `active vort-group-card status-${group.status}` : `vort-group-card status-${group.status}`} onClick={() => setSelectedGroupId(group.id)}>
          <div><strong>{group.name}</strong><span>{statusLabels[group.status] ?? group.status} — {group.location}</span></div>
          <div className="module-row-metrics"><b>Signal {group.vortessenceSignal}%</b><b>Λ {group.resistanceLink}%</b><b>Xen {group.xenInsight}%</b></div>
          <em>{group.lastIncident}</em>
        </button>)}
      </div>
    </div>

    {selectedGroup && <div className="panel vort-selected-panel">
      <span className="brand-kicker">Dossier groupe sélectionné</span>
      <h2>{selectedGroup.name}</h2>
      <p>{selectedGroup.notes}</p>
      <div className="module-stat-grid">
        <MiniStat label="Sujets" value={selectedGroup.count} />
        <MiniStat label="Condition" value={selectedGroup.condition} />
        <MiniStat label="Coercition" value={selectedGroup.coercion} dangerHigh />
        <MiniStat label="Signal" value={selectedGroup.vortessenceSignal} dangerHigh />
        <MiniStat label="Lien Lambda" value={selectedGroup.resistanceLink} dangerHigh />
        <MiniStat label="Lecture Xen" value={selectedGroup.xenInsight} />
        <MiniStat label="Usage quarantaine" value={selectedGroup.containmentUse} />
        <MiniStat label="Risque fuite" value={selectedGroup.escapeRisk} dangerHigh />
      </div>
      <p className="lore-note">▸ {selectedGroup.lastIncident}</p>
      <h3>Actions sur ce groupe</h3>
      <div className="operation-list vort-operation-list compact">
        {groupOperations.map((operation) => <button key={operation.id} className="operation-card vort-operation-card" onClick={() => applyOperation(operation, selectedGroup.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>{operation.logLine}</em>
        </button>)}
      </div>
    </div>}

    <div className="panel vort-network-panel">
      <span className="brand-kicker">Opérations réseau Vortessence</span>
      <h2>Actions globales</h2>
      <div className="operation-list vort-operation-list">
        {networkOperations.map((operation) => <button key={operation.id} className="operation-card vort-operation-card" onClick={() => applyOperation(operation)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>{operation.logLine}</em>
        </button>)}
      </div>
    </div>

    <div className="panel vort-vision-panel">
      <span className="brand-kicker">COAN / Vortessence interpretation</span>
      <h2>Vision fragmentaire</h2>
      <blockquote>{state.lastVision}</blockquote>
      <div className="mini-grid">
        <span>Nova Biotics <b>{game.novaProspekt.bioticsPressure}%</b></span>
        <span>Instabilité Nova <b>{game.novaProspekt.instability}%</b></span>
        <span>Diplomatie Vortigaunt Λ <b>{game.resistanceFactions.vortigauntDiplomacy}%</b></span>
        <span>Quarantaine globale <b>{game.stats.xen}%</b></span>
      </div>
      <p className="lore-note">Les visions ne sont pas des ordres clairs : elles servent de signal de risque, de présage Xen ou de trace Lambda.</p>
    </div>

    <div className="panel feed vort-log-panel">
      <span className="brand-kicker">Vort/Biotics log</span>
      <h2>Journal du bureau Biotics</h2>
      {state.log.slice(0, 14).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}

export function XenQuarantineScreen({ game, sector, sectorAction, operations, changePolicy, applyOperation, mutationOperations, changeMutationPolicy, applyMutationOperation, quarantineOperations, changeQuarantinePolicy, applyQuarantineOperation }: { game: GameState; sector: Sector; sectorAction: SectorAction; operations: XenEcosystemOperation[]; changePolicy: (policy: XenEcosystemPolicyId) => void; applyOperation: (operation: XenEcosystemOperation, layerId?: string) => void; mutationOperations: XenMutationOperation[]; changeMutationPolicy: (policy: XenMutationPolicyId) => void; applyMutationOperation: (operation: XenMutationOperation, chainId?: string) => void; quarantineOperations: QuarantineOperation[]; changeQuarantinePolicy: (policy: QuarantinePolicyId) => void; applyQuarantineOperation: (operation: QuarantineOperation) => void }) {
  const [activeView, setActiveView] = useState<'overview' | 'quarantine' | 'ecosystem' | 'mutations'>('overview');
  const [selectedLayerId, setSelectedLayerId] = useState(game.xenEcosystem.layers[0]?.id ?? '');
  const [selectedChainId, setSelectedChainId] = useState(game.xenMutation.chains[0]?.id ?? '');
  const ecosystem = game.xenEcosystem;
  const mutation = game.xenMutation;
  const activePolicy = xenEcosystemPolicies.find((policy) => policy.id === ecosystem.activePolicy) ?? xenEcosystemPolicies[0];
  const activeMutationPolicy = xenMutationPolicies.find((policy) => policy.id === mutation.activePolicy) ?? xenMutationPolicies[0];
  const hotLayers = [...ecosystem.layers].sort((a, b) => (b.biomass + b.spread + b.mutationPressure + b.humanExposure) - (a.biomass + a.spread + a.mutationPressure + a.humanExposure)).slice(0, 12);
  const hotChains = [...mutation.chains].sort((a, b) => (b.progress + b.conversionLoad + b.mutationLoad + b.hostPool) - (a.progress + a.conversionLoad + a.mutationLoad + a.hostPool)).slice(0, 12);
  const selectedLayer = ecosystem.layers.find((layer) => layer.id === selectedLayerId) ?? hotLayers[0] ?? ecosystem.layers[0];
  const selectedChain = mutation.chains.find((chain) => chain.id === selectedChainId) ?? hotChains[0] ?? mutation.chains[0];
  const selectedLayerDefinition = selectedLayer ? xenLayerDefinitions[selectedLayer.layerId] : null;
  const selectedChainDefinition = selectedChain ? xenMutationChainDefinitions[selectedChain.chainId] : null;
  const selectedLayerSector = selectedLayer ? game.sectors.find((item) => item.id === selectedLayer.sectorId) : null;
  const selectedChainSector = selectedChain ? game.sectors.find((item) => item.id === selectedChain.sectorId) : null;
  const vectors = [...game.sectors].sort((a, b) => b.xen - a.xen).slice(0, 7);
  const biologicalPressure = Math.min(100, Math.round(game.stats.xen * 0.45 + ecosystem.totalBiomass * 0.25 + ecosystem.networkSpread * 0.15 + ecosystem.mutationPressure * 0.15));
  const mutationPressure = Math.min(100, Math.round(mutation.outbreakRisk * 0.32 + mutation.hostConversionIndex * 0.25 + mutation.mutationVelocity * 0.28 + mutation.quarantineDebt * 0.15));
  const layerOperations = operations.filter((operation) => operation.target === 'layer');
  const sectorOperations = operations.filter((operation) => operation.target === 'sector');
  const networkOperations = operations.filter((operation) => operation.target === 'network');
  const chainOperations = mutationOperations.filter((operation) => operation.target === 'chain');
  const mutationSectorOperations = mutationOperations.filter((operation) => operation.target === 'sector');
  const mutationNetworkOperations = mutationOperations.filter((operation) => operation.target === 'network');
  const stageLabel: Record<string, string> = { trace: 'Trace', active: 'Active', bloom: 'Bloom', dominant: 'Dominante', lost: 'Zone perdue' };
  const chainStageLabel: Record<string, string> = { latent: 'Latente', triggered: 'Déclenchée', accelerating: 'Accélération', outbreak: 'Flambée', catastrophic: 'Catastrophique' };
  const quarantine = game.quarantineZones;
  const activeQuarantinePolicy = quarantinePolicies.find((policy) => policy.id === quarantine.activePolicy) ?? quarantinePolicies[0];
  const criticalZones = [...quarantine.zones]
    .sort((a, b) => (quarantineStageDefinitions[b.stage].severity * 100 + b.exposure + b.ravenholmMemory) - (quarantineStageDefinitions[a.stage].severity * 100 + a.exposure + a.ravenholmMemory))
    .slice(0, 10);
  const selectedQuarantineZone = quarantine.zones.find((zone) => zone.sectorId === sector.id) ?? criticalZones[0];
  const selectedQuarantineSector = selectedQuarantineZone ? game.sectors.find((item) => item.id === selectedQuarantineZone.sectorId) : null;
  const selectedQuarantineDefinition = selectedQuarantineZone ? quarantineStageDefinitions[selectedQuarantineZone.stage] : null;
  const sectorQuarantineOperations = quarantineOperations.filter((operation) => operation.target === 'sector');
  const networkQuarantineOperations = quarantineOperations.filter((operation) => operation.target === 'network');

  return <section className={`panel-grid dedicated-screen xen-quarantine-screen xen-ecosystem-screen xen-view-${activeView}`}>
    <div className="screen-view-tabs" role="tablist" aria-label="Vues Xen">
      {[
        ['overview', 'Aperçu'],
        ['quarantine', 'Quarantaine'],
        ['ecosystem', 'Écosystème'],
        ['mutations', 'Mutations'],
      ].map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={activeView === id} className={activeView === id ? 'active' : ''} onClick={() => setActiveView(id as typeof activeView)}>{label}</button>)}
    </div>
    <div className="panel module-command xen-ecosystem-command">
      <span className="brand-kicker">Xen Quarantine Authority / Dynamic Biosphere</span>
      <h2>Écosystème Xen dynamique</h2>
      <p>Xen n’est plus une simple jauge : la ville possède des couches biologiques qui vivent, se propagent et transforment les secteurs. Spores, nids parasites, barnacles, biomasse murale, tunnels organiques, colonies antlion et infection humaine interagissent avec rations, Vortigaunts, CP et infrastructures.</p>
      <div className="module-stat-grid">
        <MiniStat label="Pression bio" value={biologicalPressure} dangerHigh />
        <MiniStat label="Biomasse" value={ecosystem.totalBiomass} dangerHigh />
        <MiniStat label="Spores" value={ecosystem.sporeIndex} dangerHigh />
        <MiniStat label="Parasites" value={ecosystem.parasiteIndex} dangerHigh />
        <MiniStat label="Antlions" value={ecosystem.antlionPressure} dangerHigh />
        <MiniStat label="Infection" value={ecosystem.humanInfectionIndex} dangerHigh />
        <MiniStat label="Mutation" value={ecosystem.mutationPressure} dangerHigh />
        <MiniStat label="Containment" value={ecosystem.containmentIndex} />
        <MiniStat label="Chaînes" value={mutationPressure} dangerHigh />
        <MiniStat label="Conversion" value={mutation.hostConversionIndex} dangerHigh />
        <MiniStat label="Flambée" value={mutation.outbreakRisk} dangerHigh />
        <MiniStat label="Dette quar." value={mutation.quarantineDebt} dangerHigh />
      </div>
      <div className="actions module-actions"><button onClick={() => sectorAction('quarantine')}>Quarantaine {sector.name}</button><button onClick={() => sectorAction('seal')}>Sceller secteur</button><button onClick={() => sectorAction('purge')}>Purge thermique</button></div>
      <p className="lore-note">Dernière flambée : {ecosystem.lastOutbreak}</p>
      <p className="lore-note">Dernière chaîne mutagénique : {mutation.lastChainEvent}</p>
    </div>

    <div className="panel quarantine-zone-command-panel">
      <span className="brand-kicker">Sector Quarantine Evolution / Ravenholm Risk</span>
      <h2>Zones de quarantaine évolutives</h2>
      <p>Chaque secteur contaminé évolue maintenant par état administratif : surveillance sanitaire, quarantaine partielle, quarantaine totale, zone scellée, zone organique, zone perdue et dossier Ravenholm-like.</p>
      <div className="module-stat-grid">
        <MiniStat label="Zones suivies" value={quarantine.zones.length} />
        <MiniStat label="Partielles" value={quarantine.partialCount} dangerHigh />
        <MiniStat label="Totales" value={quarantine.fullCount} dangerHigh />
        <MiniStat label="Scellées" value={quarantine.sealedCount} dangerHigh />
        <MiniStat label="Zones perdues" value={quarantine.lostCount} dangerHigh />
        <MiniStat label="Ravenholm" value={quarantine.ravenholmLikeCount} dangerHigh />
        <MiniStat label="Civils piégés" value={quarantine.trappedCivilianEstimate} dangerHigh />
        <MiniStat label="Contradiction" value={quarantine.publicContradictionRisk} dangerHigh />
      </div>
      <p className="lore-note">COAN : plus une zone est scellée ou mentie, plus elle cesse d’être un problème sanitaire et devient une mémoire politique exploitable par Lambda.</p>
    </div>

    <div className="panel quarantine-policy-panel">
      <span className="brand-kicker">Doctrine quarantaine active</span>
      <h2>{activeQuarantinePolicy.name}</h2>
      <p>{activeQuarantinePolicy.description}</p>
      <blockquote>{activeQuarantinePolicy.publicLine}</blockquote>
      <div className="policy-list compact-policy-list">
        {quarantinePolicies.map((policy) => <button key={policy.id} className={policy.id === quarantine.activePolicy ? 'active policy-card' : 'policy-card'} onClick={() => changeQuarantinePolicy(policy.id)}>
          <strong>{policy.name}</strong>
          <span>{policy.description}</span>
          <em>Stage {policy.stageBias > 0 ? '+' : ''}{policy.stageBias} / secret {policy.secrecyDelta > 0 ? '+' : ''}{policy.secrecyDelta} / Advisor {policy.advisorRisk}%</em>
        </button>)}
      </div>
    </div>

    <div className="panel quarantine-zone-list-panel">
      <span className="brand-kicker">Secteurs sous statut biologique</span>
      <h2>Échelle de quarantaine</h2>
      <div className="xen-layer-list quarantine-zone-list">
        {criticalZones.map((zone) => {
          const zoneSector = game.sectors.find((item) => item.id === zone.sectorId);
          const def = quarantineStageDefinitions[zone.stage];
          return <article key={zone.id} className={`xen-layer-card quarantine-zone-card qstage-${zone.stage}`}>
            <div><strong>{zoneSector?.name ?? zone.sectorId}</strong><span>{def.label} — {def.combineLabel}</span></div>
            <div className="module-row-metrics"><b>Expo {zone.exposure}%</b><b>Cont {zone.containment}%</b><b>Piégés {zone.civilianTrapped}</b></div>
            <em>{zone.lastDecision}</em>
          </article>;
        })}
      </div>
    </div>

    {selectedQuarantineZone && selectedQuarantineDefinition && <div className="panel quarantine-selected-panel">
      <span className="brand-kicker">Dossier quarantaine sélectionné</span>
      <h2>{selectedQuarantineDefinition.combineLabel}</h2>
      <p>{selectedQuarantineSector?.name ?? selectedQuarantineZone.sectorId} — {selectedQuarantineDefinition.description}</p>
      <div className="module-stat-grid">
        <MiniStat label="Exposition" value={selectedQuarantineZone.exposure} dangerHigh />
        <MiniStat label="Containment" value={selectedQuarantineZone.containment} />
        <MiniStat label="Secret" value={selectedQuarantineZone.secrecy} dangerHigh />
        <MiniStat label="Civils piégés" value={selectedQuarantineZone.civilianTrapped} dangerHigh />
        <MiniStat label="Évacuation" value={selectedQuarantineZone.evacuationProgress} />
        <MiniStat label="Mémoire Ravenholm" value={selectedQuarantineZone.ravenholmMemory} dangerHigh />
      </div>
      <p><b>Masque public :</b> {selectedQuarantineDefinition.publicMask}</p>
      <p className="lore-note">{selectedQuarantineDefinition.loreOutcome}</p>
      <h3>Opérations secteur</h3>
      <div className="operation-list compact quarantine-operation-list">
        {sectorQuarantineOperations.map((operation) => <button key={operation.id} className="operation-card xen-operation-card quarantine-operation-card" onClick={() => applyQuarantineOperation(operation)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Risque {operation.risk}% — {operation.logLine}</em>
        </button>)}
      </div>
    </div>}

    <div className="panel quarantine-network-ops-panel">
      <span className="brand-kicker">Opérations réseau quarantaine</span>
      <h2>Coordination inter-secteurs</h2>
      <div className="operation-list quarantine-operation-list">
        {networkQuarantineOperations.map((operation) => <button key={operation.id} className="operation-card xen-operation-card quarantine-operation-card" onClick={() => applyQuarantineOperation(operation)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Risque {operation.risk}% — {operation.logLine}</em>
        </button>)}
      </div>
    </div>

    <div className="panel xen-policy-panel">
      <span className="brand-kicker">Doctrine biosécurité</span>
      <h2>{activePolicy.name}</h2>
      <p>{activePolicy.description}</p>
      <blockquote>{activePolicy.publicLine}</blockquote>
      <div className="policy-list compact-policy-list">
        {xenEcosystemPolicies.map((policy) => <button key={policy.id} className={policy.id === ecosystem.activePolicy ? 'active policy-card' : 'policy-card'} onClick={() => changePolicy(policy.id)}>
          <strong>{policy.name}</strong>
          <span>{policy.description}</span>
          <em>Containment {policy.containmentBias > 0 ? '+' : ''}{policy.containmentBias} / mutation {policy.mutationRisk > 0 ? '+' : ''}{policy.mutationRisk} / Advisor {policy.advisorRisk}%</em>
        </button>)}
      </div>
    </div>

    <div className="panel xen-layers-panel">
      <span className="brand-kicker">Couches biologiques actives</span>
      <h2>Biomasse, spores, parasites</h2>
      <div className="xen-layer-list">
        {hotLayers.map((layer) => {
          const def = xenLayerDefinitions[layer.layerId];
          const sourceSector = game.sectors.find((item) => item.id === layer.sectorId);
          return <button key={layer.id} className={layer.id === selectedLayer?.id ? `active xen-layer-card stage-${layer.stage}` : `xen-layer-card stage-${layer.stage}`} onClick={() => setSelectedLayerId(layer.id)}>
            <div><strong>{def.name}</strong><span>{sourceSector?.name ?? layer.sectorId} — {stageLabel[layer.stage]}</span></div>
            <div className="module-row-metrics"><b>Bio {layer.biomass}%</b><b>Spread {layer.spread}%</b><b>Mut {layer.mutationPressure}%</b></div>
            <em>{layer.discovered ? layer.lastIncident : 'Signature non confirmée / brouillage biologique.'}</em>
          </button>;
        })}
      </div>
    </div>

    {selectedLayer && selectedLayerDefinition && <div className="panel xen-selected-layer-panel">
      <span className="brand-kicker">Dossier couche sélectionnée</span>
      <h2>{selectedLayerDefinition.combineLabel}</h2>
      <p>{selectedLayerDefinition.description}</p>
      <div className="module-stat-grid">
        <MiniStat label="Biomasse" value={selectedLayer.biomass} dangerHigh />
        <MiniStat label="Activité" value={selectedLayer.activity} dangerHigh />
        <MiniStat label="Propagation" value={selectedLayer.spread} dangerHigh />
        <MiniStat label="Containment" value={selectedLayer.containment} />
        <MiniStat label="Mutation" value={selectedLayer.mutationPressure} dangerHigh />
        <MiniStat label="Hôtes" value={selectedLayer.humanExposure} dangerHigh />
      </div>
      <p><b>Secteur :</b> {selectedLayerSector?.name ?? selectedLayer.sectorId} / <b>stade :</b> {stageLabel[selectedLayer.stage]} / <b>découvert :</b> {selectedLayer.discovered ? 'oui' : 'non'}</p>
      <p className="lore-note">Confinement recommandé : {selectedLayerDefinition.containmentHint}</p>
      <h3>Actions ciblées</h3>
      <div className="operation-list compact xen-operation-list">
        {layerOperations.map((operation) => <button key={operation.id} className="operation-card xen-operation-card" onClick={() => applyOperation(operation, selectedLayer.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Risque {operation.risk}% — {operation.logLine}</em>
        </button>)}
      </div>
    </div>}

    <div className="panel xen-sector-ops-panel">
      <span className="brand-kicker">Opérations secteur</span>
      <h2>{sector.name}</h2>
      <p>{sector.role}</p>
      <div className="module-stat-grid"><MiniStat label="Xen secteur" value={sector.xen} dangerHigh /><MiniStat label="Infra" value={sector.infrastructure} /><MiniStat label="Peur" value={sector.fear} dangerHigh /><MiniStat label="Surveillance" value={sector.surveillance} /></div>
      <div className="operation-list compact xen-operation-list">
        {sectorOperations.map((operation) => <button key={operation.id} className="operation-card xen-operation-card" onClick={() => applyOperation(operation, selectedLayer?.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>{operation.logLine}</em>
        </button>)}
      </div>
    </div>

    <div className="panel xen-network-ops-panel">
      <span className="brand-kicker">Opérations réseau Xen</span>
      <h2>Biosphère inter-secteurs</h2>
      <div className="operation-list xen-operation-list">
        {networkOperations.map((operation) => <button key={operation.id} className="operation-card xen-operation-card" onClick={() => applyOperation(operation, selectedLayer?.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Risque {operation.risk}% — {operation.logLine}</em>
        </button>)}
      </div>
    </div>

    <div className="panel xen-mutation-policy-panel">
      <span className="brand-kicker">Doctrine chaînes mutagéniques</span>
      <h2>{activeMutationPolicy.name}</h2>
      <p>{activeMutationPolicy.description}</p>
      <blockquote>{activeMutationPolicy.publicLine}</blockquote>
      <div className="policy-list compact-policy-list">
        {xenMutationPolicies.map((policy) => <button key={policy.id} className={policy.id === mutation.activePolicy ? 'active policy-card' : 'policy-card'} onClick={() => changeMutationPolicy(policy.id)}>
          <strong>{policy.name}</strong>
          <span>{policy.description}</span>
          <em>Containment {policy.containmentBias > 0 ? '+' : ''}{policy.containmentBias} / coût civil {policy.civilianCost} / Advisor {policy.advisorRisk}%</em>
        </button>)}
      </div>
    </div>

    <div className="panel xen-mutation-chain-panel">
      <span className="brand-kicker">Chaînes biologiques cause/effet</span>
      <h2>Mutations actives</h2>
      <div className="module-stat-grid">
        <MiniStat label="Zombies" value={mutation.zombieIndex} dangerHigh />
        <MiniStat label="Fast" value={mutation.fastZombieIndex} dangerHigh />
        <MiniStat label="Poison" value={mutation.poisonZombieIndex} dangerHigh />
        <MiniStat label="Ruche antlion" value={mutation.antlionHivePressure} dangerHigh />
        <MiniStat label="Blocage log." value={mutation.logisticsBlockage} dangerHigh />
        <MiniStat label="Vitesse mut." value={mutation.mutationVelocity} dangerHigh />
      </div>
      <div className="xen-layer-list xen-chain-list">
        {hotChains.map((chain) => {
          const def = xenMutationChainDefinitions[chain.chainId];
          const sourceSector = game.sectors.find((item) => item.id === chain.sectorId);
          return <button key={chain.id} className={chain.id === selectedChain?.id ? `active xen-layer-card xen-chain-card stage-${chain.stage}` : `xen-layer-card xen-chain-card stage-${chain.stage}`} onClick={() => setSelectedChainId(chain.id)}>
            <div><strong>{def.name}</strong><span>{sourceSector?.name ?? chain.sectorId} — {chainStageLabel[chain.stage]}</span></div>
            <div className="module-row-metrics"><b>Prog {chain.progress}%</b><b>Hôtes {chain.hostPool}%</b><b>Conv {chain.conversionLoad}%</b></div>
            <em>{chain.discovered ? chain.lastMutation : 'Chaîne suspectée / non confirmée par COAN.'}</em>
          </button>;
        })}
      </div>
    </div>

    {selectedChain && selectedChainDefinition && <div className="panel xen-selected-chain-panel">
      <span className="brand-kicker">Dossier chaîne sélectionnée</span>
      <h2>{selectedChainDefinition.combineLabel}</h2>
      <p>{selectedChainDefinition.description}</p>
      <p><b>Déclencheur :</b> {selectedChainDefinition.trigger}</p>
      <p><b>Chaîne lore :</b> {selectedChainDefinition.loreChain.join(' → ')}</p>
      <div className="module-stat-grid">
        <MiniStat label="Progression" value={selectedChain.progress} dangerHigh />
        <MiniStat label="Déclencheur" value={selectedChain.triggerPressure} dangerHigh />
        <MiniStat label="Containment" value={selectedChain.containment} />
        <MiniStat label="Hôtes" value={selectedChain.hostPool} dangerHigh />
        <MiniStat label="Conversion" value={selectedChain.conversionLoad} dangerHigh />
        <MiniStat label="Mutation" value={selectedChain.mutationLoad} dangerHigh />
      </div>
      <p><b>Secteur :</b> {selectedChainSector?.name ?? selectedChain.sectorId} / <b>stade :</b> {chainStageLabel[selectedChain.stage]} / <b>découvert :</b> {selectedChain.discovered ? 'oui' : 'non'}</p>
      <p className="lore-note">Confinement recommandé : {selectedChainDefinition.containmentHint}</p>
      <h3>Actions sur chaîne</h3>
      <div className="operation-list compact xen-operation-list xen-mutation-operation-list">
        {chainOperations.map((operation) => <button key={operation.id} className="operation-card xen-operation-card" onClick={() => applyMutationOperation(operation, selectedChain.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Risque {operation.risk}% — {operation.logLine}</em>
        </button>)}
      </div>
    </div>}

    <div className="panel xen-mutation-ops-panel">
      <span className="brand-kicker">Opérations mutation secteur/réseau</span>
      <h2>Déni biologique actif</h2>
      <div className="operation-list compact xen-operation-list">
        {mutationSectorOperations.map((operation) => <button key={operation.id} className="operation-card xen-operation-card" onClick={() => applyMutationOperation(operation, selectedChain?.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>{operation.logLine}</em>
        </button>)}
        {mutationNetworkOperations.map((operation) => <button key={operation.id} className="operation-card xen-operation-card" onClick={() => applyMutationOperation(operation, selectedChain?.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Réseau — {operation.logLine}</em>
        </button>)}
      </div>
    </div>

    <div className="panel module-tactical-list xen-vector-panel">
      <span className="brand-kicker">Vecteurs secteur</span>
      <h2>Secteurs contaminés</h2>
      {vectors.map((item) => <article key={item.id} className="module-row-card"><div><strong>{item.name}</strong><span>{item.status} — {item.zone}</span></div><div className="module-row-metrics"><b>Xen {item.xen}%</b><b>Infra {item.infrastructure}%</b><b>Peur {item.fear}%</b></div></article>)}
    </div>

    <div className="panel feed xen-ecosystem-log-panel">
      <span className="brand-kicker">Xen ecology log</span>
      <h2>Journal biosphère</h2>
      <div className="module-stat-grid"><MiniStat label="Barnacles" value={ecosystem.barnacleDensity} dangerHigh /><MiniStat label="Dégâts organiques" value={ecosystem.organicInfrastructureDamage} dangerHigh /><MiniStat label="Faune errante" value={ecosystem.roamingFaunaIndex} dangerHigh /><MiniStat label="Secteur perdu" value={ecosystem.lostSectorRisk} dangerHigh /></div>
      {ecosystem.log.slice(0, 10).map((line, index) => <p key={`eco-${line}-${index}`}>▸ {line}</p>)}
      <h3>Chaînes mutagéniques</h3>
      {mutation.log.slice(0, 10).map((line, index) => <p key={`mut-${line}-${index}`}>▸ {line}</p>)}
      <h3>Zones de quarantaine</h3>
      {quarantine.log.slice(0, 10).map((line, index) => <p key={`qz-${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}

import type { CitizenAction, CitizenRecord, CitizenStatus } from '../types/game';
import { citizenStatuses, riskMarkerDescriptions } from '../data/citizenRegistry';
import { selectHighRiskCitizens } from '../systems/citizenRegistry';

function citizenStatusClass(status: CitizenStatus) {
  const color = citizenStatuses[status]?.color ?? 'amber';
  return `citizen-status ${color}`;
}

function CitizenDossierCard({ record, active, onSelect }: { record: CitizenRecord; active: boolean; onSelect: () => void }) {
  return <button className={active ? 'citizen-dossier-card active' : 'citizen-dossier-card'} onClick={onSelect}>
    <div><strong>{record.id}</strong><span>{record.name}</span></div>
    <em className={citizenStatusClass(record.status)}>{citizenStatuses[record.status].label}</em>
    <div className="module-row-metrics"><b>Risque {record.antiCitizenRisk}%</b><b>Loyauté {record.loyaltyScore}%</b><b>Xen {record.xenExposure}%</b></div>
    <small>{record.workAssignment} — {record.rationStatus}</small>
  </button>;
}

export function CitizenRegistryScreen({ game, actions, applyAction }: { game: GameState; actions: CitizenAction[]; applyAction: (action: CitizenAction, citizenId: string) => void }) {
  const registry = game.citizenRegistry;
  const [localSelectedId, setLocalSelectedId] = useState(registry.selectedId ?? registry.records[0]?.id ?? null);
  const selected = registry.records.find((record) => record.id === localSelectedId) ?? registry.records.find((record) => record.id === registry.selectedId) ?? registry.records[0];
  const highRisk = selectHighRiskCitizens(registry, 10);
  const sector = selected ? game.sectors.find((item) => item.id === selected.sectorId) : null;
  const sectorRecords = selected ? registry.records.filter((record) => record.sectorId === selected.sectorId) : [];
  const availableActions = selected ? actions.filter((action) => action.targetStatuses.includes(selected.status)) : [];
  const statusEntries = Object.entries(citizenStatuses) as Array<[CitizenStatus, typeof citizenStatuses[CitizenStatus]]>;

  return <section className="panel-grid dedicated-screen citizen-registry-screen">
    <div className="panel module-command citizen-registry-command">
      <img className="dossier-header-visual" src={getDossierVisual('suspected_citizen')} alt="" aria-hidden="true" />
      <span className="brand-kicker">Civil Registry / Individual Dossiers</span>
      <h2>Registre civil individuel</h2>
      <p>Le registre ne remplace pas la population globale : il extrait des dossiers représentatifs que la Civil Authority peut manipuler, interroger, récompenser, falsifier ou transférer vers Nova Prospekt.</p>
      <div className="module-stat-grid">
        <MiniStat label="Dossiers" value={registry.total} />
        <MiniStat label="Conformes" value={registry.compliantCount} />
        <MiniStat label="Suspects" value={registry.suspectCount} dangerHigh />
        <MiniStat label="Informateurs" value={registry.informantCount} />
        <MiniStat label="Lambda" value={registry.lambdaCount} dangerHigh />
        <MiniStat label="Xen exposés" value={registry.xenExposedCount} dangerHigh />
        <MiniStat label="Flags Nova" value={registry.novaFlaggedCount} dangerHigh />
        <MiniStat label="Fausse délation" value={registry.falseDenunciationIndex} dangerHigh />
      </div>
      <p className="lore-note">COAN : chaque dossier est un levier. Trop d’interrogatoires créent des familles de disparus ; trop de primes créent des faux rapports ; trop de transferts Nova Prospekt chauffent les audits Advisor.</p>
    </div>

    <div className="panel citizen-risk-panel">
      <span className="brand-kicker">Priorité anti-citoyenne</span>
      <h2>Dossiers à risque</h2>
      <div className="citizen-dossier-list">
        {highRisk.map((record) => <CitizenDossierCard key={record.id} record={record} active={record.id === selected?.id} onSelect={() => setLocalSelectedId(record.id)} />)}
      </div>
      <p className="lore-note">Sélection UI locale : clique un dossier, puis utilise les actions sur le panneau central.</p>
    </div>

    {selected && <div className="panel citizen-file-panel">
      <span className="brand-kicker">Dossier citoyen sélectionné</span>
      <h2>{selected.id} — {selected.name}</h2>
      <div className="citizen-file-header">
        <em className={citizenStatusClass(selected.status)}>{citizenStatuses[selected.status].label}</em>
        {selected.novaProspektFlag && <em className="citizen-status violet">NOVA PROSPEKT FLAG</em>}
      </div>
      <p>{citizenStatuses[selected.status].description}</p>
      <div className="module-stat-grid">
        <MiniStat label="Risque anti-citoyen" value={selected.antiCitizenRisk} dangerHigh />
        <MiniStat label="Loyauté" value={selected.loyaltyScore} />
        <MiniStat label="Peur" value={selected.fearScore} dangerHigh />
        <MiniStat label="Fiabilité" value={selected.reliability} />
        <MiniStat label="Exposition Xen" value={selected.xenExposure} dangerHigh />
        <MiniStat label="Âge" value={selected.ageBand} />
      </div>
      <div className="citizen-fields">
        <p><b>Secteur :</b> {sector?.name ?? selected.sectorId}</p>
        <p><b>Affectation :</b> {selected.workAssignment}</p>
        <p><b>Rationnement :</b> {selected.rationStatus}</p>
        <p><b>Dernier contrôle CP :</b> {selected.lastCpCheck}</p>
        <p><b>Liens familiaux :</b> {selected.familyLinks.join(' / ')}</p>
        <p><b>Note COAN :</b> {selected.notes}</p>
      </div>
      <h3>Marqueurs</h3>
      <div className="citizen-marker-list">
        {selected.markers.map((marker) => <span key={marker} title={riskMarkerDescriptions[marker]}>{marker}</span>)}
      </div>
      <h3>Actions administratives</h3>
      <div className="operation-list citizen-action-list">
        {availableActions.map((action) => <button key={action.id} onClick={() => applyAction(action, selected.id)}>
          <strong>{action.name}</strong>
          <span>{action.description}</span>
        </button>)}
        {!availableActions.length && <p className="lore-note">Aucune action compatible avec ce statut.</p>}
      </div>
    </div>}

    <div className="panel citizen-sector-panel">
      <span className="brand-kicker">Secteur du dossier</span>
      <h2>{sector?.name ?? 'Secteur inconnu'}</h2>
      <p>{sector?.role}</p>
      <div className="module-stat-grid">
        <MiniStat label="Dossiers secteur" value={sectorRecords.length} />
        <MiniStat label="Rébellion secteur" value={sector?.rebel ?? 0} dangerHigh />
        <MiniStat label="Xen secteur" value={sector?.xen ?? 0} dangerHigh />
        <MiniStat label="Surveillance" value={sector?.surveillance ?? 0} />
      </div>
      <div className="citizen-dossier-list compact">
        {sectorRecords.map((record) => <CitizenDossierCard key={record.id} record={record} active={record.id === selected?.id} onSelect={() => setLocalSelectedId(record.id)} />)}
      </div>
    </div>

    <div className="panel citizen-status-panel">
      <span className="brand-kicker">Taxonomie Combine</span>
      <h2>Statuts citoyens</h2>
      <div className="citizen-status-grid">
        {statusEntries.map(([status, meta]) => <article key={status}>
          <em className={citizenStatusClass(status)}>{meta.label}</em>
          <p>{meta.description}</p>
        </article>)}
      </div>
    </div>

    <div className="panel feed citizen-registry-log">
      <span className="brand-kicker">Civil file audit trail</span>
      <h2>Journal registre</h2>
      {registry.log.slice(0, 14).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
      {selected && <><h3>Historique dossier</h3>{selected.history.map((line, index) => <p key={`${selected.id}-hist-${index}`}>▸ {line}</p>)}</>}
    </div>
  </section>;
}

export function InformantNetworkScreen({ game, operations, changeDoctrine, applyOperation }: { game: GameState; operations: import('../types/game').InformantOperation[]; changeDoctrine: (id: import('../types/game').InformantDoctrineId) => void; applyOperation: (operation: import('../types/game').InformantOperation) => void }) {
  const { informantNetwork: network } = game;
  const activeDoctrine = informantDoctrines.find((item) => item.id === network.activeDoctrine) ?? informantDoctrines[0];
  const riskySources = [...network.sources].sort((a, b) => b.risk - a.risk).slice(0, 8);
  const usefulRatio = Math.round((network.usefulReports / Math.max(1, network.dailyReports)) * 100);
  const compromisedRatio = Math.round((network.compromisedSources / Math.max(1, network.sources.length)) * 100);

  return <section className="panel-grid dedicated-screen informant-screen">
    <div className="panel module-command informant-command">
      <span className="brand-kicker">Civil Protection / Denunciation Grid</span>
      <h2>Réseau d’informateurs et de délation</h2>
      <p>Les sources civiles ne sont plus un simple bonus d’information : elles peuvent être achetées en rations, forcées par peur, retournées par Lambda ou polluées par de fausses dénonciations.</p>
      <div className="module-stat-grid">
        <MiniStat label="Sources" value={network.totalInformants} />
        <MiniStat label="Fiabilité" value={network.reliabilityIndex} />
        <MiniStat label="Faux rapports" value={network.falseReportIndex} dangerHigh />
        <MiniStat label="Pénétration Λ" value={network.lambdaPenetration} />
        <MiniStat label="Compromises" value={network.compromisedSources} dangerHigh />
        <MiniStat label="Backlash" value={network.backlashIndex} dangerHigh />
        <MiniStat label="Rapports utiles" value={usefulRatio} />
        <MiniStat label="Sources brûlées" value={compromisedRatio} dangerHigh />
      </div>
      <p className="lore-note">COAN : plus la faim et la peur montent, plus la délation augmente ; plus elle est forcée, plus les faux dossiers et la radicalisation Lambda progressent.</p>
    </div>

    <div className="panel informant-doctrine-panel">
      <span className="brand-kicker">Doctrine CP active</span>
      <h2>{activeDoctrine.name}</h2>
      <p>{activeDoctrine.description}</p>
      <blockquote>{activeDoctrine.publicLine}</blockquote>
      <select value={network.activeDoctrine} onChange={(event) => changeDoctrine(event.target.value as import('../types/game').InformantDoctrineId)}>
        {informantDoctrines.map((doctrine) => <option key={doctrine.id} value={doctrine.id}>{doctrine.name}</option>)}
      </select>
      <div className="mini-grid">
        <span>Recrutement <b>{activeDoctrine.recruitmentBias > 0 ? '+' : ''}{activeDoctrine.recruitmentBias}</b></span>
        <span>Fiabilité <b>{activeDoctrine.reliabilityBias > 0 ? '+' : ''}{activeDoctrine.reliabilityBias}</b></span>
        <span>Faux rapports <b>{activeDoctrine.falseReportBias > 0 ? '+' : ''}{activeDoctrine.falseReportBias}</b></span>
        <span>Backlash <b>{activeDoctrine.backlashRisk}%</b></span>
      </div>
    </div>

    <div className="panel informant-ops-panel">
      <span className="brand-kicker">Opérations de source</span>
      <h2>Actions informateurs</h2>
      <div className="operation-list informant-operation-list">
        {operations.map((operation) => <button key={operation.id} onClick={() => applyOperation(operation)}>
          <strong>{operation.name}</strong>
          <span>Coût {operation.cost} rations — risque {operation.risk}%</span>
          <em>{operation.description}</em>
        </button>)}
      </div>
    </div>

    <div className="panel informant-sources-panel">
      <span className="brand-kicker">Sources à risque</span>
      <h2>Dossiers de sources</h2>
      <div className="informant-source-list">
        {riskySources.map((source) => {
          const sector = game.sectors.find((item) => item.id === source.sectorId);
          return <article key={source.id} className={`informant-source-card ${source.compromised ? 'compromised' : ''}`}>
            <h3>{source.codename}</h3>
            <span>{sector?.name ?? source.sectorId} — {source.cover}</span>
            <p>{source.lastReport}</p>
            <div className="mini-grid">
              <span>Motif <b>{source.motivation}</b></span>
              <span>Fiabilité <b>{source.reliability}%</b></span>
              <span>Risque <b>{source.risk}%</b></span>
              <span>Exposition Λ <b>{source.lambdaExposure}%</b></span>
              <span>Faux rapports <b>{source.falseReportTendency}%</b></span>
              <span>Statut <b>{source.compromised ? 'COMPROMISE' : 'ACTIVE'}</b></span>
            </div>
          </article>;
        })}
      </div>
    </div>

    <div className="panel informant-intel-panel">
      <span className="brand-kicker">Renseignement journalier</span>
      <h2>Flux de dénonciations</h2>
      <div className="module-stat-grid">
        <MiniStat label="Dénonciations" value={network.dailyReports} />
        <MiniStat label="Exploitables" value={network.usefulReports} />
        <MiniStat label="Fausses" value={network.falseReports} dangerHigh />
        <MiniStat label="Cellules exposées" value={network.exposedCells} />
        <MiniStat label="Dépense rations" value={network.rationBountySpend} dangerHigh />
      </div>
      <p className="lore-note">Les faux rapports peuvent faire arrêter des innocents, nourrir les familles de disparus et donner à Lambda un récit de recrutement plus fort.</p>
    </div>

    <div className="panel feed informant-log-panel">
      <span className="brand-kicker">CP source archive</span>
      <h2>Journal réseau</h2>
      {network.log.slice(0, 14).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}


export function CombineTechnologyScreen({ game, researchTechnology }: { game: GameState; researchTechnology: (node: CombineTechnologyNode) => void }) {
  const tech = game.combineTechnology;
  const branches = combineTechnologyBranches;
  const [activeBranchId, setActiveBranchId] = useState<CombineTechnologyBranchId>(tech.activeBranch);
  const activeBranch = branches.find((branch) => branch.id === activeBranchId) ?? branches[0];
  const available = getAvailableTechnologyNodes(tech);
  const activeNodes = combineTechnologyNodes.filter((node) => node.branchId === activeBranchId).sort((a, b) => a.tier - b.tier);
  const availableIds = new Set(available.map((node) => node.id));
  const researchedIds = new Set(tech.researchedNodes);
  const completedCount = tech.researchedNodes.length;
  const totalCost = activeNodes.reduce((sum, node) => sum + node.cost, 0);


  return <section className="panel-grid dedicated-screen technology-screen">
    <div className="panel module-command technology-command">
      <span className="brand-kicker">Combine Research Authority / Local Applied Doctrine</span>
      <h2>Technologies Combine</h2>
      <p>Cette couche transforme les protocoles Citadel en moyens techniques : maillage scanners, barrières énergétiques, bioscanners Xen, manhacks/Overwatch, Airwatch, BreenCast, Nova Prospekt et infrastructure de production.</p>
      <div className="module-stat-grid">
        <MiniStat label="Budget R&D" value={tech.researchBudget} />
        <MiniStat label="Protocoles" value={`${completedCount}/${combineTechnologyNodes.length}`} />
        <MiniStat label="Scan" value={tech.scanEfficiency} />
        <MiniStat label="Confinement" value={tech.containmentGrid} />
        <MiniStat label="Overwatch" value={tech.overwatchIntegration} />
        <MiniStat label="BreenCast" value={tech.propagandaBandwidth} />
        <MiniStat label="Nova Link" value={tech.novaIntegration} dangerHigh />
        <MiniStat label="Dette tech" value={tech.maintenanceDebt} dangerHigh />
        <MiniStat label="Suspicion" value={tech.techSuspicion} dangerHigh />
      </div>
      <p className="lore-note">COAN : plus la ville empile des systèmes avancés, plus la maintenance et la supervision Advisor augmentent. Une technologie efficace peut stabiliser City tout en révélant tes mensonges.</p>
    </div>

    <div className="panel technology-branches-panel">
      <span className="brand-kicker">Branches de recherche</span>
      <h2>Orientation technique</h2>
      <div className="technology-branch-grid">
        {branches.map((branch) => {
          const progress = getTechnologyBranchProgress(tech, branch.id);
          return <button key={branch.id} className={`technology-branch-card ${branch.id === activeBranchId ? 'active' : ''} branch-${branch.colorLabel}`} onClick={() => setActiveBranchId(branch.id)}>
            <strong>{branch.name}</strong>
            <span>{progress.completed}/{progress.total} protocoles — {progress.percent}%</span>
            <i><em style={{ width: `${progress.percent}%` }} /></i>
            <p>{branch.description}</p>
          </button>;
        })}
      </div>
      <p className="lore-note">{activeBranch.loreLine}</p>
    </div>

    <div className="panel technology-node-panel">
      <span className="brand-kicker">Branche active</span>
      <h2>{activeBranch.name}</h2>
      <p>{activeBranch.description}</p>
      <div className="technology-node-list">
        {activeNodes.map((node) => {
          const researched = researchedIds.has(node.id);
          const unlocked = availableIds.has(node.id);
          const affordable = tech.researchBudget >= node.cost;
          const timelineConflict = getTechnologyTimelineConflict(node, game.timeline);
          return <article key={node.id} className={`technology-node-card tier-${node.tier} ${researched ? 'researched' : ''} ${unlocked ? 'available' : 'locked'}`}>
            <div className="technology-node-head">
              <span>Tier {node.tier}</span>
              <strong>{node.title}</strong>
            </div>
            <p>{node.body}</p>
            <div className="mini-grid">
              <span>Coût <b>{node.cost}</b></span>
              <span>Maintenance <b>{node.maintenance}%</b></span>
              <span>Risque Advisor <b>{node.risk}%</b></span>
              <span>Prérequis <b>{node.prerequisites.length ? node.prerequisites.length : 'aucun'}</b></span>
            </div>
            <div className="event-tags">{node.unlocks.map((unlock) => <span key={unlock}>{unlock}</span>)}</div>
            {node.prerequisites.length > 0 && <p className="lore-note">Prérequis : {node.prerequisites.join(', ')}</p>}
            {timelineConflict && <p className="lore-note negative">{timelineConflict}</p>}
            <button disabled={researched || !unlocked || !affordable || Boolean(timelineConflict)} onClick={() => researchTechnology(node)}>
              {researched ? 'PROTOCOLE ACTIF' : !unlocked ? 'VERROUILLÉ' : !affordable ? 'BUDGET INSUFFISANT' : 'RECHERCHER / ACTIVER'}
            </button>
          </article>;
        })}
      </div>
    </div>

    <div className="panel technology-capabilities-panel">
      <span className="brand-kicker">Capacités déverrouillées</span>
      <h2>Fonctions Combine actives</h2>
      <div className="capability-list">
        {tech.unlockedCapabilities.length === 0 ? <p>Aucune capacité avancée.</p> : tech.unlockedCapabilities.map((capability) => <span key={capability}>{capability}</span>)}
      </div>
      <div className="mini-grid">
        <span>Coût branche active <b>{totalCost}</b></span>
        <span>Disponibles <b>{available.filter((node) => node.branchId === activeBranchId).length}</b></span>
        <span>Maintenance future <b>{activeNodes.reduce((sum, node) => sum + (researchedIds.has(node.id) ? node.maintenance : 0), 0)}%</b></span>
        <span>Reserve tech <b>{game.units.reduce((sum, unit) => sum + unit.reserve, 0)}</b></span>
      </div>
    </div>

    <div className="panel feed technology-log-panel">
      <span className="brand-kicker">Tech archive</span>
      <h2>Journal R&D local</h2>
      {tech.log.slice(0, 16).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}

export function XenResearchScreen({ game, sector, operations, changePolicy, applyOperation }: { game: GameState; sector: Sector; operations: XenResearchOperation[]; changePolicy: (policy: XenResearchPolicyId) => void; applyOperation: (operation: XenResearchOperation, programId?: string) => void }) {
  const [selectedProgramId, setSelectedProgramId] = useState(game.xenResearch.programs[0]?.id ?? '');
  const research = game.xenResearch;
  const activePolicy = xenResearchPolicies.find((policy) => policy.id === research.activePolicy) ?? xenResearchPolicies[0];
  const hotPrograms = [...research.programs].sort((a, b) => (b.progress + b.weaponization + b.liveSpecimens + Math.max(0, 100 - b.containment)) - (a.progress + a.weaponization + a.liveSpecimens + Math.max(0, 100 - a.containment)));
  const selectedProgram = research.programs.find((program) => program.id === selectedProgramId) ?? hotPrograms[0] ?? research.programs[0];
  const selectedDefinition = selectedProgram ? xenResearchPrograms[selectedProgram.programId] : null;
  const programOperations = operations.filter((operation) => operation.target === 'program');
  const networkOperations = operations.filter((operation) => operation.target === 'network');
  const stageLabels = {
    field_samples: 'Échantillons terrain',
    contained_study: 'Étude confinée',
    active_trial: 'Essai actif',
    weaponized: 'Militarisation',
    blacksite_catastrophe: 'Catastrophe blacksite',
  } as const;

  return <section className="panel-grid dedicated-screen xen-research-screen">
    <div className="panel module-command xen-research-command">
      <span className="brand-kicker">Xen Research / Combine exploitation office</span>
      <h2>Recherche Xen / exploitation Combine</h2>
      <p>Ce module transforme les zones contaminées en laboratoire administratif : capture de spécimens, antlion extract, cultures de spores, stockage headcrab, blacksite Nova Prospekt, biocontrôle et risque d’incident laboratoire.</p>
      <div className="module-stat-grid">
        <MiniStat label="Progression" value={research.researchProgressIndex} />
        <MiniStat label="Confinement" value={research.containmentIntegrity} />
        <MiniStat label="Spécimens" value={research.liveSpecimenCount} dangerHigh />
        <MiniStat label="Parasites" value={research.parasiteStock} dangerHigh />
        <MiniStat label="Extract" value={research.antlionExtract} />
        <MiniStat label="Arme bio" value={research.bioweaponReadiness} dangerHigh />
        <MiniStat label="Incident" value={research.labIncidentRisk} dangerHigh />
        <MiniStat label="Advisor" value={research.advisorInterest} dangerHigh />
        <MiniStat label="Dette morale" value={research.ethicalDebt} dangerHigh />
        <MiniStat label="Percées" value={research.breakthroughCount} />
      </div>
      <p className="lore-note">COAN : la biosphère Xen peut être contenue, étudiée ou exploitée. Chaque spécimen vivant est aussi une preuve, une arme potentielle et une rupture de sas en attente.</p>
      <p className="lore-note">Dernier incident : {research.lastIncident}</p>
    </div>

    <div className="panel xen-research-policy-panel">
      <span className="brand-kicker">Doctrine R&D active</span>
      <h2>{activePolicy.name}</h2>
      <p>{activePolicy.description}</p>
      <blockquote>{activePolicy.publicLine}</blockquote>
      <div className="policy-list compact-policy-list">
        {xenResearchPolicies.map((policy) => <button key={policy.id} className={policy.id === research.activePolicy ? 'active policy-card' : 'policy-card'} onClick={() => changePolicy(policy.id)}>
          <strong>{policy.name}</strong>
          <span>{policy.description}</span>
          <em>Progrès {policy.progressBias > 0 ? '+' : ''}{policy.progressBias} / confinement {policy.containmentBias > 0 ? '+' : ''}{policy.containmentBias} / militarisation {policy.weaponizationBias > 0 ? '+' : ''}{policy.weaponizationBias} / Advisor {policy.advisorRisk}%</em>
        </button>)}
      </div>
    </div>

    <div className="panel xen-research-programs-panel">
      <span className="brand-kicker">Programmes actifs</span>
      <h2>Spécimens, biomasse, biocontrôle</h2>
      <div className="xen-research-program-list">
        {hotPrograms.map((program) => {
          const definition = xenResearchPrograms[program.programId];
          return <button key={program.id} className={program.id === selectedProgram?.id ? `active xen-research-program-card stage-${program.stage}` : `xen-research-program-card stage-${program.stage}`} onClick={() => setSelectedProgramId(program.id)}>
            <div><strong>{definition.name}</strong><span>{definition.combineLabel}</span></div>
            <div className="module-row-metrics"><b>Prog {program.progress}%</b><b>Conf {program.containment}%</b><b>Live {program.liveSpecimens}</b><b>Arme {program.weaponization}%</b></div>
            <em>{stageLabels[program.stage]} — {program.lastFinding}</em>
          </button>;
        })}
      </div>
    </div>

    {selectedProgram && selectedDefinition && <div className="panel xen-research-selected-panel">
      <span className="brand-kicker">Dossier programme sélectionné</span>
      <h2>{selectedDefinition.combineLabel}</h2>
      <p>{selectedDefinition.description}</p>
      <div className="module-stat-grid">
        <MiniStat label="Progression" value={selectedProgram.progress} />
        <MiniStat label="Échantillons" value={selectedProgram.samples} />
        <MiniStat label="Confinement" value={selectedProgram.containment} />
        <MiniStat label="Spécimens" value={selectedProgram.liveSpecimens} dangerHigh />
        <MiniStat label="Militarisation" value={selectedProgram.weaponization} dangerHigh />
        <MiniStat label="Usage indus." value={selectedProgram.industrialUse} />
        <MiniStat label="Dette" value={selectedProgram.ethicalDebt} dangerHigh />
        <MiniStat label="Flag Advisor" value={selectedProgram.advisorFlag} dangerHigh />
      </div>
      <p><b>Focus échantillon :</b> {selectedDefinition.sampleFocus}</p>
      <p><b>Risque :</b> {selectedDefinition.riskProfile}</p>
      <p className="lore-note"><b>Percée :</b> {selectedDefinition.breakthrough}</p>
      <div className="event-tags">
        {selectedDefinition.relatedLayers.map((tag) => <span key={tag}>{tag}</span>)}
        {selectedDefinition.relatedChains.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <h3>Opérations ciblées</h3>
      <div className="operation-list compact xen-research-operation-list">
        {programOperations.map((operation) => <button key={operation.id} className="operation-card xen-operation-card xen-research-operation-card" onClick={() => applyOperation(operation, selectedProgram.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Risque {operation.risk}% — {operation.logLine}</em>
        </button>)}
      </div>
    </div>}

    <div className="panel xen-research-stocks-panel">
      <span className="brand-kicker">Inventaire biologique</span>
      <h2>Stocks R&D blacksite</h2>
      <div className="mini-grid">
        <span>Parasites <b>{research.parasiteStock}</b></span>
        <span>Extract antlion <b>{research.antlionExtract}</b></span>
        <span>Spores <b>{research.sporeSamples}</b></span>
        <span>Biomasse <b>{research.biomassSamples}</b></span>
        <span>Secret blacksite <b>{research.blackSiteSecrecy}%</b></span>
        <span>Rendement industriel <b>{research.industrialYield}%</b></span>
      </div>
      <p className="lore-note">Les stocks ne sont pas neutres : ils nourrissent production, armes biologiques, audits Advisor et risques de rupture de confinement.</p>
    </div>

    <div className="panel xen-research-network-ops-panel">
      <span className="brand-kicker">Opérations réseau R&D</span>
      <h2>Laboratoires, Nova Prospekt, manifestes</h2>
      <div className="operation-list xen-research-operation-list">
        {networkOperations.map((operation) => <button key={operation.id} className="operation-card xen-operation-card xen-research-operation-card" onClick={() => applyOperation(operation, selectedProgram?.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Risque {operation.risk}% — {operation.logLine}</em>
        </button>)}
      </div>
    </div>

    <div className="panel xen-research-context-panel">
      <span className="brand-kicker">Contexte opérationnel</span>
      <h2>{sector.name}</h2>
      <div className="module-stat-grid">
        <MiniStat label="Xen secteur" value={sector.xen} dangerHigh />
        <MiniStat label="Surveillance" value={sector.surveillance} />
        <MiniStat label="Infrastructure" value={sector.infrastructure} />
        <MiniStat label="Quarantaine" value={game.quarantineZones.biologicalExclusionIndex} dangerHigh />
        <MiniStat label="Mutation" value={game.xenMutation.outbreakRisk} dangerHigh />
        <MiniStat label="Vort Insight" value={game.vortigaunts.xenInsight} />
      </div>
      <p className="lore-note">Les opérations ciblées utilisent le secteur sélectionné sur la carte de City. Pour récolter/risquer ailleurs, sélectionne d’abord un autre secteur.</p>
    </div>

    <div className="panel feed xen-research-log-panel">
      <span className="brand-kicker">Xen R&D log</span>
      <h2>Journal laboratoire / blacksite</h2>
      {research.log.slice(0, 18).map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
    </div>
  </section>;
}


export function XenCatastropheScreen({ game, operations, changePolicy, applyOperation }: { game: GameState; operations: XenCatastropheOperation[]; changePolicy: (policy: XenCatastrophePolicyId) => void; applyOperation: (operation: XenCatastropheOperation, eventId?: string) => void }) {
  const [selectedEventId, setSelectedEventId] = useState(game.xenCatastrophes.events[0]?.id ?? '');
  const state = game.xenCatastrophes;
  const selected = state.events.find((event) => event.id === selectedEventId) ?? [...state.events].sort((a, b) => stageRank(b.stage) - stageRank(a.stage) || b.intensity - a.intensity)[0];
  const selectedDef = selected ? xenCatastropheDefinitions[selected.catastropheId] : null;
  const selectedSector = selected ? game.sectors.find((sector) => sector.id === selected.sectorId) : null;
  const topEvents = [...state.events].sort((a, b) => (stageRank(b.stage) * 100 + b.intensity + b.probability) - (stageRank(a.stage) * 100 + a.intensity + a.probability));
  const activePolicy = xenCatastrophePolicies.find((policy) => policy.id === state.activePolicy) ?? xenCatastrophePolicies[0];

  return <section className="panel-grid dedicated-screen xen-catastrophe-screen">
    <div className="panel module-command catastrophe-command">
      <span className="brand-kicker">Catastrophe Watch / Xen Event Escalation</span>
      <h2>Catastrophes Xen rares</h2>
      <p>Ce module suit les ruptures biologiques majeures : Tentacle industriel, alarme Gonarch, migration Antlion, Razor Train contaminé, hôpital-nid, effondrement organique, retour de flamme Headcrab Shell et brèche Nova.</p>
      <div className="module-stat-grid">
        <MiniStat label="Risque global" value={state.totalCatastropheRisk} dangerHigh />
        <MiniStat label="Crises actives" value={state.activeEventCount} dangerHigh />
        <MiniStat label="Citywide" value={state.citywideRisk} dangerHigh />
        <MiniStat label="Advisor" value={state.advisorEmergency} dangerHigh />
        <MiniStat label="Collapse infra" value={state.infrastructureCollapse} dangerHigh />
        <MiniStat label="Ravenholm" value={state.ravenholmProbability} dangerHigh />
      </div>
      <p className="lore-note">COAN : une catastrophe Xen n’est pas une vague. C’est une rupture de géographie, de logistique et de mensonge administratif.</p>
    </div>

    <div className="panel catastrophe-policy-panel">
      <span className="brand-kicker">Doctrine urgence</span>
      <h2>{activePolicy.name}</h2>
      <p>{activePolicy.description}</p>
      <div className="policy-grid">
        {xenCatastrophePolicies.map((policy) => <button key={policy.id} className={policy.id === state.activePolicy ? 'active policy-card' : 'policy-card'} onClick={() => changePolicy(policy.id)}>
          <strong>{policy.name}</strong>
          <span>{policy.publicLine}</span>
          <small>Contain {policy.containmentBias} / secret {policy.secrecyBias} / sacrifice {policy.sacrificeBias}</small>
        </button>)}
      </div>
    </div>

    <div className="panel catastrophe-event-list-panel">
      <span className="brand-kicker">Dossiers de rupture</span>
      <h2>Événements surveillés</h2>
      <div className="catastrophe-event-list">
        {topEvents.map((event) => {
          const def = xenCatastropheDefinitions[event.catastropheId];
          const sector = game.sectors.find((item) => item.id === event.sectorId);
          return <button key={event.id} className={event.id === selected?.id ? `active catastrophe-card stage-${event.stage}` : `catastrophe-card stage-${event.stage}`} onClick={() => setSelectedEventId(event.id)}>
            <strong>{def.name}</strong>
            <span>{def.combineLabel}</span>
            <em>{sector?.name ?? event.sectorId} — {stageLabel(event.stage)}</em>
            <div className="module-row-metrics"><b>Prob {event.probability}%</b><b>Int {event.intensity}%</b><b>Cont {event.containment}%</b></div>
          </button>;
        })}
      </div>
    </div>

    {selected && selectedDef && <div className={`panel catastrophe-selected-panel stage-${selected.stage}`}>
      <span className="brand-kicker">Dossier sélectionné</span>
      <h2>{selectedDef.name}</h2>
      <p>{selectedDef.description}</p>
      <div className="module-stat-grid">
        <MiniStat label="Probabilité" value={selected.probability} dangerHigh />
        <MiniStat label="Intensité" value={selected.intensity} dangerHigh />
        <MiniStat label="Containment" value={selected.containment} />
        <MiniStat label="Civils exposés" value={selected.civilianExposure} dangerHigh />
        <MiniStat label="Engagement" value={selected.combineCommitment} />
        <MiniStat label="Couverture" value={selected.publicCover} />
      </div>
      <div className="module-detail-block">
        <strong>Secteur</strong>
        <p>{selectedSector?.name ?? selected.sectorId} — {selectedSector?.status ?? 'registre inconnu'}</p>
        <strong>Trigger lore</strong>
        <p>{selectedDef.trigger}</p>
        <strong>Signe visible</strong>
        <p>{selectedDef.visibleSign}</p>
        <strong>Protocole</strong>
        <p>{selectedDef.containmentProtocol}</p>
        <strong>Issue lore</strong>
        <p>{selectedDef.loreOutcome}</p>
      </div>
      <p className="lore-note">▸ Dernier rapport : {selected.lastReport}</p>
    </div>}

    <div className="panel catastrophe-operations-panel">
      <span className="brand-kicker">Opérations d’urgence</span>
      <h2>Réponses COAN / Overwatch</h2>
      <div className="operation-grid">
        {operations.map((operation) => <button key={operation.id} className="operation-card" onClick={() => applyOperation(operation, selected?.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Risque {operation.risk}% — cible {operation.target}</em>
        </button>)}
      </div>
    </div>

    <div className="panel catastrophe-log-panel">
      <span className="brand-kicker">Catastrophe log</span>
      <h2>Alertes biologiques</h2>
      <div className="module-log-list">
        {state.log.slice(0, 12).map((line, index) => <p key={index}>{line}</p>)}
      </div>
    </div>
  </section>;
}

function stageRank(stage: import('../types/game').XenCatastropheStage) {
  return { watch: 0, warning: 1, active: 2, citywide: 3, catastrophic: 4 }[stage];
}

function stageLabel(stage: import('../types/game').XenCatastropheStage) {
  const labels: Record<import('../types/game').XenCatastropheStage, string> = {
    watch: 'Surveillance',
    warning: 'Pré-alerte',
    active: 'Incident actif',
    citywide: 'Crise urbaine',
    catastrophic: 'Catastrophe',
  };
  return labels[stage];
}


export function VideoArchivesScreen({ game, operations, changePolicy, applyOperation }: { game: GameState; operations: VideoArchiveOperation[]; changePolicy: (policy: VideoArchivePolicyId) => void; applyOperation: (operation: VideoArchiveOperation, feedId?: string) => void }) {
  const [selectedFeedId, setSelectedFeedId] = useState(game.videoArchives.feeds[0]?.id ?? '');
  const state = game.videoArchives;
  const selected = state.feeds.find((feed) => feed.id === selectedFeedId) ?? state.feeds[0];
  const selectedDef = selected ? videoArchiveFeeds[selected.feedId] : null;
  const selectedSector = selected ? game.sectors.find((sector) => sector.id === selected.sectorId) : null;
  const hottestFeeds = [...state.feeds].sort((a, b) => (b.publicExposure + b.evidenceValue + b.corruption + b.lambdaNoise + b.xenNoise) - (a.publicExposure + a.evidenceValue + a.corruption + a.lambdaNoise + a.xenNoise));

  return <section className="panel-grid dedicated-screen video-archives-screen">
    <div className="panel module-command video-command wide">
      <span className="brand-kicker">COAN Visual Archive / synthetic feeds</span>
      <h2>Mode archives vidéo</h2>
      <p>Les flux ne sont pas de vraies vidéos : ce sont des reconstructions terminal Combine avec timecodes, corruption, caméras fixes, logs visuels et dossiers de surveillance. Chaque clip peut devenir preuve Advisor, propagande BreenCast, fuite Lambda ou dossier noir Nova.</p>
      <div className="module-stat-grid">
        <MiniStat label="Intégrité signal" value={state.signalIntegrity} />
        <MiniStat label="Corruption" value={state.archiveCorruption} dangerHigh />
        <MiniStat label="Backlog preuves" value={state.evidenceBacklog} dangerHigh />
        <MiniStat label="Risque fuite" value={state.publicLeakRisk} dangerHigh />
        <MiniStat label="Demande Advisor" value={state.advisorEvidenceDemand} dangerHigh />
        <MiniStat label="Clips" value={state.archivedClipsTotal} />
      </div>
      <p className="advice"><strong>Dernier clip critique :</strong><br />{state.lastClip}</p>
    </div>

    <div className="panel video-policy-panel">
      <span className="brand-kicker">Doctrine de capture</span>
      <h2>{videoArchivePolicies[state.activePolicy].name}</h2>
      <p>{videoArchivePolicies[state.activePolicy].description}</p>
      <div className="operation-list compact-orders">
        {Object.values(videoArchivePolicies).map((policy) => <button key={policy.id} className={state.activePolicy === policy.id ? 'active' : ''} onClick={() => changePolicy(policy.id)}>
          <strong>{policy.name}</strong>
          <span>{policy.description}</span>
        </button>)}
      </div>
    </div>

    <div className="panel video-feed-wall wide">
      <span className="brand-kicker">Feed wall / City {game.city}</span>
      <h2>Caméras corrompues</h2>
      <div className="video-grid-wall">
        {videoArchiveFeedOrder.map((feedId) => {
          const feed = state.feeds.find((item) => item.feedId === feedId);
          const def = videoArchiveFeeds[feedId];
          if (!feed) return null;
          const sector = game.sectors.find((item) => item.id === feed.sectorId);
          return <button key={feed.id} className={`video-feed-card category-${def.category} ${feed.id === selected?.id ? 'active' : ''} ${feed.locked ? 'locked' : ''}`} onClick={() => setSelectedFeedId(feed.id)}>
            <div className="fake-video-frame">
              <span className="frame-code">{def.sourceCode}</span>
              <span className="frame-status">{feed.recording ? 'REC' : feed.locked ? 'LOCK' : 'IDLE'}</span>
              <i className="frame-glitch" style={{ opacity: Math.min(0.82, (feed.corruption + feed.xenNoise) / 180) }} />
              <b>{sector?.name ?? feed.sectorId}</b>
              <em>{def.visualSignature}</em>
            </div>
            <strong>{def.label}</strong>
            <span>{sector?.status ?? 'secteur inconnu'} / clips {feed.archivedClips}</span>
            <div className="module-row-metrics"><b>Int {feed.integrity}%</b><b>Cor {feed.corruption}%</b><b>Exp {feed.publicExposure}%</b></div>
          </button>;
        })}
      </div>
    </div>

    {selected && selectedDef && <div className={`panel video-selected-panel category-${selectedDef.category}`}>
      <span className="brand-kicker">Flux sélectionné</span>
      <h2>{selectedDef.sourceCode}</h2>
      <p>{selectedDef.description}</p>
      <div className="module-stat-grid">
        <MiniStat label="Intégrité" value={selected.integrity} />
        <MiniStat label="Corruption" value={selected.corruption} dangerHigh />
        <MiniStat label="Exposition" value={selected.publicExposure} dangerHigh />
        <MiniStat label="Preuve" value={selected.evidenceValue} />
        <MiniStat label="Lambda-noise" value={selected.lambdaNoise} dangerHigh />
        <MiniStat label="Xen-noise" value={selected.xenNoise} dangerHigh />
        <MiniStat label="Scrutiny" value={selected.citadelScrutiny} dangerHigh />
        <MiniStat label="Clips" value={selected.archivedClips} />
      </div>
      <div className="module-detail-block">
        <strong>Secteur</strong>
        <p>{selectedSector?.name ?? selected.sectorId} — {selectedSector?.status ?? 'statut inconnu'}</p>
        <strong>Signature visuelle</strong>
        <p>{selectedDef.visualSignature}</p>
        <strong>Artefacts</strong>
        <p>{selectedDef.signalArtifacts.join(' / ')}</p>
        <strong>Sensibilité</strong>
        <p>{selectedDef.sensitiveBecause}</p>
        <strong>Dernière frame</strong>
        <p>{selected.lastFrame}</p>
      </div>
      <div className="event-tags">{selectedDef.loreTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </div>}

    <div className="panel video-ops-panel">
      <span className="brand-kicker">Opérations visuelles</span>
      <h2>Modifier / exploiter le flux</h2>
      <div className="operation-grid">
        {operations.map((operation) => <button key={operation.id} className="operation-card" onClick={() => applyOperation(operation, selected?.id)}>
          <strong>{operation.name}</strong>
          <span>{operation.description}</span>
          <em>Risque {operation.risk}% — cible {operation.target}</em>
        </button>)}
      </div>
    </div>

    <div className="panel video-hotlist-panel">
      <span className="brand-kicker">Hotlist visuelle</span>
      <h2>Flux à surveiller</h2>
      <div className="module-list">
        {hottestFeeds.slice(0, 7).map((feed) => {
          const def = videoArchiveFeeds[feed.feedId];
          return <button key={feed.id} className={`module-list-row category-${def.category}`} onClick={() => setSelectedFeedId(feed.id)}>
            <strong>{def.sourceCode}</strong>
            <span>{def.label}</span>
            <em>preuve {feed.evidenceValue}% / fuite {feed.publicExposure}% / corruption {feed.corruption}%</em>
          </button>;
        })}
      </div>
    </div>

    <div className="panel video-log-panel wide">
      <span className="brand-kicker">Visual archive log</span>
      <h2>Journal de surveillance</h2>
      <div className="module-log-list">
        {state.log.slice(0, 16).map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
      </div>
    </div>
  </section>;
}
