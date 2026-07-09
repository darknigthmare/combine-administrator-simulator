import type { CampaignId, DifficultyPresetId, NewGameIntakeDoctrineId, OnboardingTrackId, ProfileId, ScenarioId, TabId, TimelineId } from '../types/game';
import { campaignOrder, campaignPresets, difficultyPresetOrder, difficultyPresets, newGameIntakeDoctrineOrder, newGameIntakeDoctrines, newGameIntakePhases, newGameIntakeProfileLabels, newGameIntakeRecommendedCombos, newGameIntakeScenarioLabels, newGameIntakeThreatLabels, onboardingTrackOrder, onboardingTracks, timelineOrder, timelinePresets } from '../data';
import { buildNewGameIntakePreview, doctrineToConfig } from '../systems/newGameIntakeSystem';

type Props = {
  cityInput: string;
  setCityInput: (value: string) => void;
  scenarioInput: ScenarioId;
  setScenarioInput: (value: ScenarioId) => void;
  timelineInput: TimelineId;
  setTimelineInput: (value: TimelineId) => void;
  campaignInput: CampaignId;
  setCampaignInput: (value: CampaignId) => void;
  difficultyInput: DifficultyPresetId;
  setDifficultyInput: (value: DifficultyPresetId) => void;
  profileInput: ProfileId;
  setProfileInput: (value: ProfileId) => void;
  doctrineInput: NewGameIntakeDoctrineId;
  setDoctrineInput: (value: NewGameIntakeDoctrineId) => void;
  onboardingTrackInput: OnboardingTrackId;
  setOnboardingTrackInput: (value: OnboardingTrackId) => void;
  useCampaignRecommendations: boolean;
  setUseCampaignRecommendations: (value: boolean) => void;
  applyDoctrine: (value: NewGameIntakeDoctrineId) => void;
  startGame: () => void;
  startGuidedGame: (trackId: OnboardingTrackId) => void;
  setTab: (tab: TabId) => void;
};

function Gauge({ label, value, band }: { label: string; value: number; band: keyof typeof newGameIntakeThreatLabels }) {
  return <div className={`intake-gauge band-${band}`}>
    <div><span>{label}</span><b>{value}%</b></div>
    <i><em style={{ width: `${Math.max(4, Math.min(100, value))}%` }} /></i>
    <small>{newGameIntakeThreatLabels[band]}</small>
  </div>;
}

export function NewGameIntakeScreen(props: Props) {
  const preview = buildNewGameIntakePreview({
    city: props.cityInput,
    doctrineId: props.doctrineInput,
    campaignId: props.campaignInput,
    scenario: props.scenarioInput,
    timeline: props.timelineInput,
    profile: props.profileInput,
    difficultyPresetId: props.difficultyInput,
    onboardingTrackId: props.onboardingTrackInput,
    useCampaignRecommendations: props.useCampaignRecommendations,
  });
  const resolved = preview.resolved;
  const lockManual = props.useCampaignRecommendations && props.campaignInput !== 'custom_city_administration';

  return <div className="new-game-intake-screen">
    <section className="panel intake-hero">
      <div>
        <span className="brand-kicker">COAN NEW ADMINISTRATION INTAKE</span>
        <h2>Nouvelle Partie — City {resolved.city}</h2>
        <p>{resolved.campaign.briefing}</p>
        <div className="tag-row">
          <span>{resolved.campaign.name}</span>
          <span>{timelinePresets[resolved.timeline].name}</span>
          <span>{resolved.difficulty.classification}</span>
          <span>{resolved.onboardingTrack.title}</span>
        </div>
      </div>
      <div className={`intake-danger-card band-${preview.bands.overall}`}>
        <span>Danger global</span>
        <b>{preview.pressure.overallDanger}%</b>
        <em>{newGameIntakeThreatLabels[preview.bands.overall]}</em>
      </div>
    </section>

    <section className="intake-phase-strip">
      {newGameIntakePhases.map((phase) => <article key={phase.id}>
        <span>{phase.label}</span>
        <strong>{phase.title}</strong>
        <p>{phase.description}</p>
      </article>)}
    </section>

    <section className="grid two">
      <div className="panel">
        <h3>Doctrine de départ</h3>
        <p>Choisis un préréglage cohérent. Tu peux ensuite modifier manuellement les paramètres avant de lancer.</p>
        <div className="intake-doctrine-grid">
          {newGameIntakeDoctrineOrder.map((id) => {
            const doctrine = newGameIntakeDoctrines[id];
            return <button key={id} className={`doctrine-card ${props.doctrineInput === id ? 'active' : ''}`} onClick={() => props.applyDoctrine(id)}>
              <span>{doctrine.subtitle}</span>
              <strong>{doctrine.title}</strong>
              <p>{doctrine.doctrineLine}</p>
              <small>{doctrine.riskLine}</small>
              <div className="tag-row">{doctrine.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </button>;
          })}
        </div>
      </div>

      <div className="panel intake-config-panel">
        <h3>Configuration administrative</h3>
        <label>Numéro de City</label>
        <input value={props.cityInput} onChange={(event) => props.setCityInput(event.target.value)} placeholder="17" />

        <label>Campagne longue</label>
        <select value={props.campaignInput} onChange={(event) => props.setCampaignInput(event.target.value as CampaignId)}>
          {campaignOrder.map((id) => <option key={id} value={id}>{campaignPresets[id].name}</option>)}
        </select>
        <label className="inline-check"><input type="checkbox" checked={props.useCampaignRecommendations} disabled={props.campaignInput === 'custom_city_administration'} onChange={(event) => props.setUseCampaignRecommendations(event.target.checked)} /> Verrouiller scénario/timeline/profil sur la campagne</label>

        <label>Scénario local</label>
        <select value={lockManual ? resolved.scenario : props.scenarioInput} disabled={lockManual} onChange={(event) => props.setScenarioInput(event.target.value as ScenarioId)}>
          {Object.entries(newGameIntakeScenarioLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select>

        <label>Timeline Half-Life</label>
        <select value={lockManual ? resolved.timeline : props.timelineInput} disabled={lockManual} onChange={(event) => props.setTimelineInput(event.target.value as TimelineId)}>
          {timelineOrder.map((id) => <option key={id} value={id}>{timelinePresets[id].name}</option>)}
        </select>

        <label>Profil de gouvernance</label>
        <select value={lockManual ? resolved.profile : props.profileInput} disabled={lockManual} onChange={(event) => props.setProfileInput(event.target.value as ProfileId)}>
          {Object.entries(newGameIntakeProfileLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select>

        <label>Difficulté avancée</label>
        <select value={props.difficultyInput} onChange={(event) => props.setDifficultyInput(event.target.value as DifficultyPresetId)}>
          {difficultyPresetOrder.map((id) => <option key={id} value={id}>{difficultyPresets[id].name}</option>)}
        </select>
        <small>{difficultyPresets[props.difficultyInput].subtitle}</small>

        <label>Piste tutoriel COAN</label>
        <select value={props.onboardingTrackInput} onChange={(event) => props.setOnboardingTrackInput(event.target.value as OnboardingTrackId)}>
          {onboardingTrackOrder.map((id) => <option key={id} value={id}>{onboardingTracks[id].title}</option>)}
        </select>
      </div>
    </section>

    <section className="grid two">
      <div className="panel">
        <h3>Aperçu conséquences</h3>
        <div className="intake-gauge-grid">
          <Gauge label="Lambda" value={preview.pressure.lambda} band={preview.bands.lambda} />
          <Gauge label="Xen" value={preview.pressure.xen} band={preview.bands.xen} />
          <Gauge label="Citadel" value={preview.pressure.citadel} band={preview.bands.citadel} />
          <Gauge label="Stress civil" value={preview.pressure.civil} band={preview.bands.civil} />
          <Gauge label="Rations" value={preview.pressure.rations} band={preview.bands.rations} />
          <Gauge label="Nova" value={preview.pressure.nova} band={preview.bands.nova} />
        </div>
        <div className="intake-stat-preview">
          <span>Stabilité <b>{preview.stats.stability}%</b></span>
          <span>Loyauté <b>{preview.stats.loyalty}%</b></span>
          <span>Peur <b>{preview.stats.fear}%</b></span>
          <span>Production <b>{preview.stats.production}%</b></span>
          <span>Rations <b>{preview.stats.rations}</b></span>
          <span>Suspicion <b>{preview.stats.suspicion}%</b></span>
        </div>
      </div>

      <div className="panel">
        <h3>Briefing et avertissements</h3>
        <div className="warning-stack">
          {preview.warnings.map((line) => <p key={line}>{line}</p>)}
        </div>
        <h4>Résumé COAN</h4>
        <div className="briefing-log">
          {preview.summary.map((line) => <p key={line}>{line}</p>)}
        </div>
        <h4>Modules recommandés après lancement</h4>
        <div className="tag-row">
          {preview.recommendedFirstTabs.map((tab) => <button className="link-chip" key={tab} onClick={() => props.setTab(tab)}>{tab}</button>)}
        </div>
      </div>
    </section>

    <section className="panel intake-launch-panel">
      <div>
        <h3>Initialisation</h3>
        <p>Le lancement standard démarre avec les paramètres ci-dessus. Le lancement guidé applique la piste tutoriel sélectionnée et ouvre directement le Tutoriel COAN.</p>
      </div>
      <div className="intake-launch-actions">
        <button className="primary" onClick={props.startGame}>Initialiser administration standard</button>
        <button onClick={() => props.startGuidedGame(props.onboardingTrackInput)}>Lancer avec tutoriel COAN</button>
      </div>
    </section>

    <section className="panel">
      <h3>Combinaisons QA recommandées</h3>
      <div className="recommended-combo-grid">
        {newGameIntakeRecommendedCombos.map((combo) => <button key={combo.label} onClick={() => {
          props.setCityInput(combo.city);
          props.setCampaignInput(combo.campaignId);
          props.setDifficultyInput(combo.difficultyPresetId);
          props.setUseCampaignRecommendations(true);
          const doctrineId = Object.values(newGameIntakeDoctrines).find((entry) => entry.campaignId === combo.campaignId)?.id ?? 'manual';
          props.setDoctrineInput(doctrineId);
          const resolvedConfig = doctrineToConfig(doctrineId, combo.city);
          props.setScenarioInput(resolvedConfig.scenario);
          props.setTimelineInput(resolvedConfig.timeline);
          props.setProfileInput(resolvedConfig.profile);
          props.setOnboardingTrackInput(resolvedConfig.onboardingTrackId);
        }}>
          <strong>{combo.label}</strong>
          <span>City {combo.city} · {campaignPresets[combo.campaignId].name}</span>
          <small>{combo.note}</small>
        </button>)}
      </div>
    </section>
  </div>;
}
