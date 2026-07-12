import type { AdministratorAvatarId, CampaignId, DifficultyPresetId, NewGameIntakeDoctrineId, OnboardingTrackId, ProfileId, ScenarioId, TabId, TimelineId } from '../types/game';
import { campaignOrder, campaignPresets, difficultyPresetOrder, difficultyPresets, newGameIntakeDoctrineOrder, newGameIntakeDoctrines, newGameIntakePhases, newGameIntakeProfileLabels, newGameIntakeScenarioLabels, newGameIntakeThreatLabels, onboardingTrackOrder, onboardingTracks, timelineOrder, timelinePresets } from '../data';
import { administratorAvatarOrder, administratorAvatars, defaultAdministratorAvatar } from '../data/visualAssets';
import { buildNewGameIntakePreview } from '../systems/newGameIntakeSystem';

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
  administratorAvatarInput: AdministratorAvatarId;
  setAdministratorAvatarInput: (value: AdministratorAvatarId) => void;
  doctrineInput: NewGameIntakeDoctrineId;
  setDoctrineInput: (value: NewGameIntakeDoctrineId) => void;
  onboardingTrackInput: OnboardingTrackId;
  setOnboardingTrackInput: (value: OnboardingTrackId) => void;
  useCampaignRecommendations: boolean;
  setUseCampaignRecommendations: (value: boolean) => void;
  applyDoctrine: (value: NewGameIntakeDoctrineId) => void;
  startGame: () => void;
};

const intakeTabLabels: Partial<Record<TabId, string>> = {
  command_deck_v2: 'Command Deck',
  dashboard: 'Command Deck',
  resistance: 'Résistance',
  rationing: 'Rationnement',
  reports: 'Rapports',
  sectors: 'Carte de City',
  xen: 'Quarantaine Xen',
  nova: 'Nova Prospekt',
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
        <select value={lockManual ? resolved.profile : props.profileInput} disabled={lockManual} onChange={(event) => {
          const profile = event.target.value as ProfileId;
          props.setProfileInput(profile);
          props.setAdministratorAvatarInput(defaultAdministratorAvatar(profile));
        }}>
          {Object.entries(newGameIntakeProfileLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select>

        <label>Portrait administrateur</label>
        <div className="administrator-avatar-grid">
          {administratorAvatarOrder.map((id) => {
            const avatar = administratorAvatars[id];
            return <button type="button" key={id} aria-pressed={props.administratorAvatarInput === id} className={`administrator-avatar-option ${props.administratorAvatarInput === id ? 'active' : ''}`} onClick={() => props.setAdministratorAvatarInput(id)}>
              <img src={avatar.image} alt="" aria-hidden="true" />
              <span><strong>{avatar.title}</strong><small>{avatar.subtitle}</small></span>
            </button>;
          })}
        </div>

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
          {preview.recommendedFirstTabs.map((tab) => <span className="link-chip" key={tab}>{intakeTabLabels[tab] ?? tab}</span>)}
        </div>
      </div>
    </section>

    <section className="panel intake-launch-panel">
      <div>
        <h3>Initialisation</h3>
        <p>La validation crée définitivement le mandat, ouvre le prologue Citadel, puis conduit au tutoriel COAN sélectionné.</p>
      </div>
      <div className="intake-launch-actions">
        <button className="primary" onClick={props.startGame}>Valider le mandat et ouvrir le prologue</button>
      </div>
    </section>

  </div>;
}
