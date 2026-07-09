import { useEffect, useMemo, useState } from 'react';
import './index.css';

import type { AtmosphereSettings, SyntheticAudioDirectorSnapshot, CampaignId, DifficultyPresetId, DifficultyScalarKey, OnboardingChapterId, OnboardingTrackId, NewGameIntakeDoctrineId, CitizenAction, CitadelDirectiveNode, CombineTechnologyNode, Crisis, EventChoice, GameState, NovaOperation, NovaProspektState, ProfileId, InformantDoctrineId, InformantOperation, CivilProtectionDoctrineId, CivilProtectionOperation, RationOperation, RationPolicyId, ResistanceOperation, ResistanceNetworkState, ResistanceFactionDoctrineId, ResistanceFactionOperation, VortigauntDoctrineId, VortigauntOperation, XenEcosystemOperation, XenEcosystemPolicyId, XenMutationOperation, XenMutationPolicyId, QuarantineOperation, QuarantinePolicyId, XenResearchOperation, XenResearchPolicyId, XenCatastropheOperation, XenCatastrophePolicyId, MajorStoryOperation, MajorStoryPolicyId, VideoArchiveOperation, VideoArchivePolicyId, DecisionHistoryFilterId, Report, ReportPolicy, ScenarioId, TimelineId, Sector, SectorStatus, Stats, TabId, UiuxUnlockId, Unit, XenEntity } from './types/game';
import { baseSectors, baseStats, breencastStrategies, campaignOrder, citizenActions, crises, difficultyPresetOrder, difficultyPresets, directives, endings, civilProtectionOperations, informantOperations, novaOperations, profileEffects, rationOperations, resistanceOperations, resistanceFactionOperations, vortigauntOperations, xenEcosystemOperations, xenMutationOperations, quarantineOperations, xenResearchOperations, xenCatastropheOperations, majorStoryOperations, videoArchiveOperations, syntheticAudioCues, syntheticAudioCueOrder, scenarioEffects, timelineOrder, timelinePresets, unitTemplates, xenCodex, newGameIntakeDoctrines } from './data';
import { AUTOSAVE_STORAGE_KEY } from './data/saveSlots';
import { getConnectedSectors, getNetworkLinks, getSectorPressure } from './systems/sectorNetwork';
import { simulateConnectedPropagation } from './systems/propagationSimulation';
import { getEventCatalogueSummary, pickDirectedCrisis } from './systems/eventDirector';
import { buildTransmittedReport, reportPolicyDescriptions, reportPolicyLabels, resolveAdvisorAudit } from './systems/reportFalsification';
import { createInitialNovaProspektState, getNovaAtmosphere, processNovaProspektDay, resolveNovaOperation, setNovaPolicy } from './systems/novaProspektSystem';
import { buildDynamicBreencast, resolveBreencastStrategy } from './systems/dynamicBreencast';
import { applyTimelineDailyPressure, applyTimelineToSectors, applyTimelineToStats, applyTimelineToUnits, getTimelinePreset, getTimelineReportLines } from './systems/timelineSystem';
import { ArchivesScreen, CampaignScreen, MajorStoryEventsScreen, FinalVerdictScreen, FinalChronicleScreen, CitadelDirectivesScreen, CitizenRegistryScreen, CivilProtectionScreen, CombineTechnologyScreen, InformantNetworkScreen, OverwatchCommandScreen, PopulationScreen, RationingScreen, ResistanceOperationsScreen, VortigauntBioticsScreen, XenQuarantineScreen, XenCatastropheScreen, XenResearchScreen, VideoArchivesScreen } from './components/DedicatedScreens';
import { AtmosphereLayer } from './components/AtmosphereLayer';
import { FloatingWindowLayer } from './components/FloatingWindowLayer';
import { SaveManagerScreen } from './components/SaveManagerScreen';
import { DecisionHistoryScreen } from './components/DecisionHistoryScreen';
import { LoreCodexScreen } from './components/LoreCodexScreen';
import { DifficultySettingsScreen } from './components/DifficultySettingsScreen';
import { SystemAuditScreen } from './components/SystemAuditScreen';
import { GameplayBalanceScreen } from './components/GameplayBalanceScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { NewGameIntakeScreen } from './components/NewGameIntakeScreen';
import { UxPolishScreen } from './components/UxPolishScreen';
import { TauriPackagingScreen } from './components/TauriPackagingScreen';
import { UiuxV2CommandDeck } from './components/UiuxV2CommandDeck';
import { UiuxProgressionPanel } from './components/UiuxProgressionPanel';
import { defaultAtmosphereSettings, getAtmosphereProfile, mergeAtmosphereSettings } from './systems/atmosphereSystem';
import { changeRationPolicy, createInitialRationEconomy, migrateRationEconomy, resolveRationOperation, simulateRationDay } from './systems/rationEconomy';
import { createInitialPopulationState, migratePopulationState, simulatePopulationDay } from './systems/populationSimulation';
import { createInitialCitizenRegistry, migrateCitizenRegistry, resolveCitizenAction, simulateCitizenRegistryDay } from './systems/citizenRegistry';
import { createInitialInformantNetwork, migrateInformantNetwork, resolveInformantOperation, setInformantDoctrine, simulateInformantDay } from './systems/informantNetwork';
import { createInitialCivilProtectionState, migrateCivilProtectionState, resolveCivilProtectionOperation, setCivilProtectionDoctrine, simulateCivilProtectionDay } from './systems/civilProtectionSystem';
import { createInitialCitadelDirectiveTree, migrateCitadelDirectiveTree, resolveDirectiveNode, simulateCitadelDirectiveTreeDay } from './systems/citadelDirectiveTreeSystem';
import { createInitialCombineTechnologyState, migrateCombineTechnologyState, researchTechnologyNode, simulateCombineTechnologyDay } from './systems/combineTechnologySystem';
import { createInitialResistanceNetwork, migrateResistanceNetwork, resolveResistanceOperation, setResistanceDoctrine, simulateResistanceNetworkDay } from './systems/resistanceNetwork';
import { createInitialResistanceFactionState, migrateResistanceFactionState, resolveResistanceFactionOperation, setResistanceFactionDoctrine, simulateResistanceFactionDay } from './systems/resistanceFactions';
import { createInitialVortigauntState, migrateVortigauntState, resolveVortigauntOperation, setVortigauntDoctrine, simulateVortigauntDay } from './systems/vortigauntSystem';
import { createInitialXenEcosystem, migrateXenEcosystem, resolveXenEcosystemOperation, setXenEcosystemPolicy, simulateXenEcosystemDay } from './systems/xenEcosystemSystem';
import { createInitialXenMutationState, migrateXenMutationState, resolveXenMutationOperation, setXenMutationPolicy, simulateXenMutationDay } from './systems/xenMutationChainsSystem';
import { createInitialQuarantineZoneState, migrateQuarantineZoneState, resolveQuarantineOperation, setQuarantinePolicy, simulateQuarantineZoneDay } from './systems/quarantineZoneSystem';
import { createInitialXenResearchState, migrateXenResearchState, resolveXenResearchOperation, setXenResearchPolicy, simulateXenResearchDay } from './systems/xenResearchSystem';
import { createInitialXenCatastropheState, migrateXenCatastropheState, resolveXenCatastropheOperation, setXenCatastrophePolicy, simulateXenCatastropheDay } from './systems/xenCatastropheSystem';
import { applyCampaignToSectors, applyCampaignToStats, createInitialCampaignState, getCampaignPreset, migrateCampaignState, simulateCampaignDay } from './systems/campaignSystem';
import { createInitialCampaignMissionState, migrateCampaignMissionState, simulateCampaignMissionDay } from './systems/campaignObjectiveSystem';
import { createInitialMajorStoryEventState, migrateMajorStoryEventState, resolveMajorStoryOperation, setMajorStoryPolicy, simulateMajorStoryEventDay } from './systems/majorStoryEventSystem';
import { buildFinalVerdict } from './systems/finalVerdictSystem';
import { buildFinalChronicle } from './systems/finalChronicleSystem';
import { buildDashboardTerminal } from './systems/dashboardTerminalSystem';
import { terminalInterfaceOrder, terminalInterfaces } from './data/terminalInterfaces';
import { buildTerminalInterfaceStatus, getTerminalInterfaceForTab, getTerminalNavTabs, getTerminalSwitchTarget } from './systems/terminalInterfaceSystem';
import { buildSyntheticAudioDirector, playSyntheticAudioCue } from './systems/syntheticAudioSystem';
import { createInitialVideoArchiveState, migrateVideoArchiveState, resolveVideoArchiveOperation, setVideoArchivePolicy, simulateVideoArchiveDay } from './systems/videoArchiveSystem';
import { createInitialDecisionHistoryState, migrateDecisionHistoryState, reconcileDecisionHistory, setDecisionHistoryFilter } from './systems/decisionHistorySystem';
import { applyDifficultySectorEffects, applyDifficultyStartingEffects, createInitialDifficultySettings, migrateDifficultySettings, resetCustomDifficulty, setDifficultyPreset, simulateDifficultyDay, updateDifficultyScalar } from './systems/difficultySettingsSystem';
import { buildGuidedStartConfig, completeOnboardingChapter as completeOnboardingChapterState, createInitialOnboardingState, migrateOnboardingState, resetOnboardingFlow, resolveOnboardingFirstDay, selectOnboardingTrack } from './systems/onboardingSystem';
import { doctrineToConfig } from './systems/newGameIntakeSystem';
import { buildUxPolishReport } from './systems/uxPolishSystem';
import { createInitialUiuxProgressionState, isUiuxTabUnlocked, isUiuxUnitUnlocked, migrateUiuxProgressionState, purchaseUiuxUnlock, runUiuxAudit, simulateUiuxProgressionDay } from './systems/uiuxProgressionSystem';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const addStat = (base: Stats, effects: Partial<Stats>): Stats => ({
  ...base,
  stability: clamp(base.stability + (effects.stability ?? 0)),
  loyalty: clamp(base.loyalty + (effects.loyalty ?? 0)),
  fear: clamp(base.fear + (effects.fear ?? 0)),
  rebel: clamp(base.rebel + (effects.rebel ?? 0)),
  xen: clamp(base.xen + (effects.xen ?? 0)),
  combine: clamp(base.combine + (effects.combine ?? 0)),
  production: clamp(base.production + (effects.production ?? 0), 0, 120),
  rations: Math.max(0, Math.round(base.rations + (effects.rations ?? 0))),
  citadel: clamp(base.citadel + (effects.citadel ?? 0)),
  info: clamp(base.info + (effects.info ?? 0)),
  fatigue: clamp(base.fatigue + (effects.fatigue ?? 0)),
  civilianLosses: Math.max(0, Math.round(base.civilianLosses + (effects.civilianLosses ?? 0))),
  combineLosses: Math.max(0, Math.round(base.combineLosses + (effects.combineLosses ?? 0))),
  suspicion: clamp(base.suspicion + (effects.suspicion ?? 0)),
});

function pick<T>(arr: T[], day: number, offset = 0): T {
  return arr[Math.abs((day * 9301 + 49297 + offset) % arr.length)];
}

function createInitialGame(city: string, scenario: ScenarioId, timeline: TimelineId, profile: ProfileId, campaignId: CampaignId = 'custom_city_administration', difficultyPresetId: DifficultyPresetId = 'standard_occupation'): GameState {
  const difficultySettings = createInitialDifficultySettings(difficultyPresetId);
  let stats = applyDifficultyStartingEffects(applyCampaignToStats(applyTimelineToStats(addStat(addStat(baseStats, scenarioEffects[scenario]), profileEffects[profile]), timeline), campaignId), difficultySettings);
  const sectors = applyDifficultySectorEffects(applyCampaignToSectors(applyTimelineToSectors(baseSectors.map((s) => ({ ...s, units: { ...s.units } })), timeline), campaignId), difficultySettings);
  if (scenario === 'quarantine') {
    for (const sec of sectors.filter((s) => ['quarantine', 'sewers', 'hospital', 'periphery'].includes(s.id))) {
      sec.xen = clamp(sec.xen + 24);
      sec.status = sec.xen > 70 ? 'Infesté' : 'Contaminé';
    }
  }
  if (scenario === 'uprising' || scenario === 'post_nova') {
    for (const sec of sectors.filter((s) => ['canals', 'res_b', 'rail', 'hospital'].includes(s.id))) {
      sec.rebel = clamp(sec.rebel + 24);
      sec.status = sec.rebel > 70 ? 'Insurgé' : 'Saboté';
    }
  }
  const directive = pick(directives, city.length + stats.rebel);
  const campaign = createInitialCampaignState({ campaignId, stats, sectors });
  const novaProspekt = createInitialNovaProspektState(scenario, profile);
  const population = createInitialPopulationState({ scenario, profile, timeline, sectors });
  const citizenRegistry = createInitialCitizenRegistry({ sectors, population });
  const informantNetwork = createInitialInformantNetwork({ sectors, registry: citizenRegistry, profile });
  const vortigaunts = createInitialVortigauntState({ scenario, profile, timeline, nova: novaProspekt });
  const xenEcosystem = createInitialXenEcosystem({ scenario, profile, timeline, sectors });
  const xenMutation = createInitialXenMutationState({ scenario, profile, timeline, sectors, ecosystem: xenEcosystem });
  const quarantineZones = createInitialQuarantineZoneState({ sectors, ecosystem: xenEcosystem, mutation: xenMutation, profile, scenario });
  const xenResearch = createInitialXenResearchState({ scenario, profile, timeline, ecosystem: xenEcosystem, mutation: xenMutation, quarantine: quarantineZones });
  const xenCatastrophes = createInitialXenCatastropheState({ scenario, profile, timeline, sectors, ecosystem: xenEcosystem, mutation: xenMutation, quarantine: quarantineZones, research: xenResearch, nova: novaProspekt, vortigaunts, stats });
  const majorStoryEvents = createInitialMajorStoryEventState({ game: { scenario, timeline, profile, stats, sectors, campaign, novaProspekt, vortigaunts, xenEcosystem, xenMutation, quarantineZones, xenResearch, xenCatastrophes } });
  const videoArchives = createInitialVideoArchiveState({ scenario, timeline, profile, stats, sectors, campaign, novaProspekt, vortigaunts, xenEcosystem, xenMutation, quarantineZones, xenResearch, xenCatastrophes, majorStoryEvents });
  return {
    started: true,
    city,
    day: 1,
    scenario,
    timeline,
    profile,
    campaign,
    uiuxProgression: createInitialUiuxProgressionState(),
    difficultySettings,
    onboarding: createInitialOnboardingState({ scenario, timeline, profile, campaignId, difficultyPresetId }),
    campaignMission: createInitialCampaignMissionState({ campaignId, stats, sectors, game: { day: 1, campaign, stats, sectors, novaProspekt, population, citizenRegistry, informantNetwork, vortigaunts, xenEcosystem, xenMutation, quarantineZones, xenResearch, xenCatastrophes, majorStoryEvents } as Partial<GameState> }),
    tab: 'dashboard',
    stats,
    sectors,
    units: applyTimelineToUnits(unitTemplates.map((u) => ({ ...u })), timeline),
    directive,
    directiveDays: directive.days,
    crisis: null,
    reports: [],
    log: [
      `JOUR 001 — City ${city} placée sous supervision Civil Authority.`,
      `Campagne active : ${getCampaignPreset(campaignId).name}.`,
      `Timeline active : ${getTimelinePreset(timeline).name}.`,
      `Difficulté active : ${difficultySettings.startSummary}.`,
      `Directive active : ${directive.title}.`,
      'COAN Node connecté : surveillance civique, biologique et industrielle active.',
    ],
    ending: null,
    finalVerdict: null,
    finalChronicle: null,
    reportPolicy: profile === 'sympathizer' ? 'sympathizer_cover' : 'truthful',
    auditHeat: 0,
    novaProspekt,
    atmosphereSettings: defaultAtmosphereSettings,
    rationEconomy: createInitialRationEconomy({ scenario, profile, timeline, sectors, reserves: stats.rations }),
    population,
    citizenRegistry,
    informantNetwork,
    civilProtection: createInitialCivilProtectionState({ sectors, profile }),
    citadelDirectiveTree: createInitialCitadelDirectiveTree({ profile, timeline }),
    combineTechnology: createInitialCombineTechnologyState({ profile, timeline }),
    resistanceNetwork: createInitialResistanceNetwork({ scenario, profile, timeline }),
    resistanceFactions: createInitialResistanceFactionState({ scenario, profile, timeline }),
    vortigaunts,
    xenEcosystem,
    xenMutation,
    quarantineZones,
    xenResearch,
    xenCatastrophes,
    majorStoryEvents,
    videoArchives,
    decisionHistory: createInitialDecisionHistoryState(city),
  };
}


function hydrateSavedGame(raw: unknown): GameState {
  if (!raw || typeof raw !== 'object') return createInitialGame('17', 'standard', 'pre_hl2', 'loyalist');
  const parsed = raw as Partial<GameState>;
  const scenario = parsed.scenario ?? 'standard';
  const timeline = parsed.timeline ?? 'pre_hl2';
  const profile = parsed.profile ?? 'loyalist';
  const campaignId = parsed.campaign?.activeCampaignId ?? 'custom_city_administration';
  const base = createInitialGame(parsed.city ?? '17', scenario, timeline, profile, campaignId);
  const merged = { ...base, ...parsed } as GameState;
  const uiuxProgression = migrateUiuxProgressionState(merged);
  return {
    ...merged,
    tab: isUiuxTabUnlocked(uiuxProgression, merged.tab) ? merged.tab : 'command_deck_v2',
    uiuxProgression,
    reportPolicy: merged.reportPolicy ?? 'truthful',
    auditHeat: merged.auditHeat ?? 0,
    timeline: merged.timeline ?? 'pre_hl2',
    campaign: migrateCampaignState(merged),
    difficultySettings: migrateDifficultySettings(merged),
    onboarding: migrateOnboardingState(merged),
    campaignMission: migrateCampaignMissionState(merged),
    novaProspekt: merged.novaProspekt ?? createInitialNovaProspektState(merged.scenario ?? 'standard', merged.profile ?? 'loyalist'),
    atmosphereSettings: mergeAtmosphereSettings(merged.atmosphereSettings),
    rationEconomy: migrateRationEconomy(merged),
    population: migratePopulationState(merged),
    citizenRegistry: migrateCitizenRegistry(merged),
    informantNetwork: migrateInformantNetwork(merged),
    civilProtection: migrateCivilProtectionState(merged),
    citadelDirectiveTree: migrateCitadelDirectiveTree(merged),
    combineTechnology: migrateCombineTechnologyState(merged),
    resistanceNetwork: migrateResistanceNetwork(merged),
    resistanceFactions: migrateResistanceFactionState(merged),
    vortigaunts: migrateVortigauntState(merged),
    xenEcosystem: migrateXenEcosystem(merged),
    xenMutation: migrateXenMutationState(merged),
    quarantineZones: migrateQuarantineZoneState(merged),
    xenResearch: migrateXenResearchState(merged),
    xenCatastrophes: migrateXenCatastropheState(merged),
    majorStoryEvents: migrateMajorStoryEventState(merged),
    videoArchives: migrateVideoArchiveState(merged),
    decisionHistory: migrateDecisionHistoryState(merged),
    finalVerdict: merged.finalVerdict ?? null,
    finalChronicle: merged.finalChronicle ?? null,
  };
}

function statusClass(status: SectorStatus) {
  if (status.includes('quarantaine') || status === 'Contaminé' || status === 'Infesté') return 'xen';
  if (status === 'Insurgé' || status === 'Saboté' || status === 'Zone de combat' || status === 'Contrôle rebelle') return 'rebel';
  if (status === 'Scellé' || status === 'Bombardé' || status === 'Abandonné') return 'critical';
  if (status === 'Contrôle Combine total' || status === 'Surveillé') return 'combine';
  return 'stable';
}

function App() {
  const [game, setGame] = useState<GameState>(() => {
    const saved = localStorage.getItem(AUTOSAVE_STORAGE_KEY);
    if (!saved) return createInitialGame('17', 'standard', 'pre_hl2', 'loyalist');
    try {
      return hydrateSavedGame(JSON.parse(saved));
    } catch {
      return createInitialGame('17', 'standard', 'pre_hl2', 'loyalist');
    }
  });
  const [cityInput, setCityInput] = useState('17');
  const [scenarioInput, setScenarioInput] = useState<ScenarioId>('standard');
  const [timelineInput, setTimelineInput] = useState<TimelineId>('pre_hl2');
  const [campaignInput, setCampaignInput] = useState<CampaignId>('custom_city_administration');
  const [difficultyInput, setDifficultyInput] = useState<DifficultyPresetId>('standard_occupation');
  const [profileInput, setProfileInput] = useState<ProfileId>('loyalist');
  const [newGameDoctrineInput, setNewGameDoctrineInput] = useState<NewGameIntakeDoctrineId>('canonical_city17');
  const [onboardingTrackInput, setOnboardingTrackInput] = useState<OnboardingTrackId>('standard_command');
  const [useCampaignRecommendations, setUseCampaignRecommendations] = useState(true);
  const [selectedSector, setSelectedSector] = useState<string>('admin');

  useEffect(() => {
    localStorage.setItem(AUTOSAVE_STORAGE_KEY, JSON.stringify(game));
  }, [game]);

  useEffect(() => {
    const reconciled = reconcileDecisionHistory(game);
    if (reconciled.changed) {
      setGame({ ...game, decisionHistory: reconciled.decisionHistory });
    }
  }, [game]);

  const sector = useMemo(() => game.sectors.find((s) => s.id === selectedSector) ?? game.sectors[0], [game.sectors, selectedSector]);
  const dynamicBreencast = useMemo(() => buildDynamicBreencast(game), [game]);
  const timelinePreset = useMemo(() => getTimelinePreset(game.timeline), [game.timeline]);
  const atmosphereProfile = useMemo(() => getAtmosphereProfile(game), [game]);
  const audioDirector = useMemo(() => buildSyntheticAudioDirector(game, atmosphereProfile), [game, atmosphereProfile]);
  const activeTerminal = useMemo(() => getTerminalInterfaceForTab(game.tab), [game.tab]);
  const terminalStatus = useMemo(() => buildTerminalInterfaceStatus(game, activeTerminal.id), [game, activeTerminal.id]);
  const atmosphereCueKey = `${game.day}-${game.crisis?.id ?? 'clear'}-${game.ending ?? 'live'}-${atmosphereProfile.mode}-${audioDirector.activeCue}-${game.tab}-${activeTerminal.id}`;
  const randomPropaganda = dynamicBreencast.recommended.publicLine;
  const eventSummary = useMemo(() => getEventCatalogueSummary(crises), []);


  function applyNewGameDoctrine(doctrineId: NewGameIntakeDoctrineId) {
    const config = doctrineToConfig(doctrineId, cityInput);
    setNewGameDoctrineInput(doctrineId);
    setCityInput(config.city);
    setCampaignInput(config.campaignId);
    setScenarioInput(config.scenario);
    setTimelineInput(config.timeline);
    setProfileInput(config.profile);
    setDifficultyInput(config.difficultyPresetId);
    setOnboardingTrackInput(config.onboardingTrackId);
    setUseCampaignRecommendations(config.useCampaignRecommendations);
  }


  function startGame() {
    const campaign = getCampaignPreset(campaignInput);
    const shouldUseCampaign = useCampaignRecommendations && campaignInput !== 'custom_city_administration';
    const selectedScenario = shouldUseCampaign ? campaign.recommendedScenario : scenarioInput;
    const selectedTimeline = shouldUseCampaign ? campaign.recommendedTimeline : timelineInput;
    const selectedProfile = shouldUseCampaign ? campaign.recommendedProfile : profileInput;
    const selectedCity = (cityInput.trim() || (shouldUseCampaign ? campaign.recommendedCity : newGameIntakeDoctrines[newGameDoctrineInput]?.citySuggestion) || '17').replace(/^City\s*/i, '');
    const next = createInitialGame(selectedCity, selectedScenario, selectedTimeline, selectedProfile, campaignInput, difficultyInput);
    setGame({
      ...next,
      tab: 'dashboard',
      onboarding: selectOnboardingTrack(next.onboarding, onboardingTrackInput),
      log: [
        `JOUR 001 — Intake Nouvelle Partie : ${newGameIntakeDoctrines[newGameDoctrineInput]?.title ?? 'Configuration COAN'}.`,
        `JOUR 001 — Paramètres : City ${selectedCity}, ${campaign.name}, difficulté ${difficultyPresets[difficultyInput].name}.`,
        ...next.log,
      ].slice(0, 100),
    });
    setSelectedSector('admin');
  }

  function startCampaign(campaignId: CampaignId) {
    const campaign = getCampaignPreset(campaignId);
    setCampaignInput(campaignId);
    setUseCampaignRecommendations(campaignId !== 'custom_city_administration');
    setScenarioInput(campaign.recommendedScenario);
    setTimelineInput(campaign.recommendedTimeline);
    setProfileInput(campaign.recommendedProfile);
    setCityInput(campaign.recommendedCity);
    setGame(createInitialGame(campaign.recommendedCity, campaign.recommendedScenario, campaign.recommendedTimeline, campaign.recommendedProfile, campaignId, difficultyInput));
    setSelectedSector('admin');
  }


  function loadGameFromSave(savedGame: GameState, source: string) {
    const hydrated = hydrateSavedGame(savedGame);
    setGame({
      ...hydrated,
      tab: 'dashboard',
      log: [`JOUR ${String(hydrated.day).padStart(3, '0')} — Sauvegarde chargée : ${source}.`, ...hydrated.log].slice(0, 100),
    });
    setSelectedSector(hydrated.sectors[0]?.id ?? 'admin');
  }

  function resolveCrisis(choice: EventChoice) {
    if (!game.crisis) return;
    const crisis = game.crisis;
    let nextStats = addStat(game.stats, choice.effects);
    const sectors = game.sectors.map((s) => {
      if (s.id !== crisis.sectorId) return s;
      return {
        ...s,
        rebel: clamp(s.rebel + (choice.effects.sectorRebel ?? 0)),
        xen: clamp(s.xen + (choice.effects.sectorXen ?? 0)),
        fear: clamp(s.fear + (choice.effects.sectorFear ?? 0)),
        loyalty: clamp(s.loyalty + (choice.effects.sectorLoyalty ?? 0)),
        infrastructure: clamp(s.infrastructure + (choice.effects.sectorInfrastructure ?? 0)),
        status: choice.status ?? s.status,
      };
    });
    setGame({
      ...game,
      stats: nextStats,
      sectors,
      crisis: null,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Décision : ${choice.label} / ${crisis.title}.`, ...game.log].slice(0, 80),
    });
  }

  function sectorAction(action: 'curfew' | 'raid' | 'quarantine' | 'seal' | 'purge' | 'propaganda') {
    const effects: Record<typeof action, { stats: Partial<Stats>; sector: Partial<Sector>; log: string }> = {
      curfew: { stats: { fear: 5, production: -3, fatigue: 4 }, sector: { status: 'Sous couvre-feu', rebel: clamp(sector.rebel - 13), fear: clamp(sector.fear + 10) }, log: `Couvre-feu total décrété dans ${sector.name}.` },
      raid: { stats: { rebel: -6, fear: 8, loyalty: -7, rations: -60, civilianLosses: 16 }, sector: { rebel: clamp(sector.rebel - 22), fear: clamp(sector.fear + 14), loyalty: clamp(sector.loyalty - 12) }, log: `Raid Civil Protection exécuté dans ${sector.name}.` },
      quarantine: { stats: { xen: -5, fear: 5, fatigue: 5, production: -3 }, sector: { status: 'En quarantaine', xen: clamp(sector.xen - 18), fear: clamp(sector.fear + 12) }, log: `Protocole Quarantine Lock imposé dans ${sector.name}.` },
      seal: { stats: { xen: -12, rebel: -8, stability: -10, loyalty: -15, fear: 18, civilianLosses: Math.ceil(sector.population * 0.55) }, sector: { status: 'Scellé', xen: 0, rebel: 0, population: Math.ceil(sector.population * 0.12), infrastructure: clamp(sector.infrastructure - 15) }, log: `Scellement hermétique de ${sector.name}. Rapport civil classifié.` },
      purge: { stats: { xen: -10, rebel: -10, stability: -12, fear: 16, loyalty: -18, civilianLosses: Math.ceil(sector.population * 0.24) }, sector: { status: 'Bombardé', xen: 0, rebel: 0, population: Math.ceil(sector.population * 0.76), infrastructure: clamp(sector.infrastructure - 45) }, log: `Purge thermique / bombardement local sur ${sector.name}.` },
      propaganda: { stats: { info: 10, fatigue: 4, loyalty: -2 }, sector: { fear: clamp(sector.fear + 4), loyalty: clamp(sector.loyalty + 2), surveillance: clamp(sector.surveillance + 5) }, log: `Breencast local imposé sur ${sector.name}.` },
    } as const;
    const selected = effects[action];
    setGame({
      ...game,
      stats: addStat(game.stats, selected.stats),
      sectors: game.sectors.map((s) => (s.id === sector.id ? { ...s, ...selected.sector } : s)),
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${selected.log}`, ...game.log].slice(0, 80),
    });
  }

  function globalAction(action: 'breencast' | 'ration_plus' | 'ration_cut' | 'advisor' | 'shadow_help') {
    if (action === 'advisor' && !game.uiuxProgression.unlocked.advisor_channel) {
      setGame({ ...game, log: [`JOUR ${String(game.day).padStart(3, '0')} - Inspection Advisor refusee : canal direct non autorise.`, ...game.log].slice(0, 80) });
      return;
    }
    const map = {
      breencast: { effects: dynamicBreencast.recommended.effects, log: `BreenCast dynamique [${dynamicBreencast.recommended.title}] : « ${randomPropaganda} »` },
      ration_plus: { effects: { rations: -260, loyalty: 10, fatigue: -8, rebel: -3 }, log: 'Rations supplémentaires distribuées aux blocs productifs.' },
      ration_cut: { effects: { rations: 320, loyalty: -16, fatigue: 10, rebel: 9, fear: 4 }, log: 'Rationnement sévère imposé : suppléments caloriques suspendus.' },
      advisor: { effects: { citadel: 10, suspicion: 14, fear: 12, combine: 8 }, log: 'Inspection Advisor demandée. Autorité renforcée, surveillance personnelle accrue.' },
      shadow_help: { effects: { loyalty: 9, rebel: 6, suspicion: 16, xen: -4, civilianLosses: -20 }, log: 'Aide clandestine à des civils via réseau médical non déclaré.' },
    } satisfies Record<string, { effects: Partial<Stats>; log: string }>;
    setGame({ ...game, stats: addStat(game.stats, map[action].effects), log: [`JOUR ${String(game.day).padStart(3, '0')} — ${map[action].log}`, ...game.log].slice(0, 80) });
  }

  function deploy(unit: Unit) {
    if (unit.reserve <= 0) return;
    if (!isUiuxUnitUnlocked(game.uiuxProgression, unit.id)) {
      setGame({ ...game, log: [`JOUR ${String(game.day).padStart(3, '0')} - Deploiement refuse : autorisation requise pour ${unit.name}.`, ...game.log].slice(0, 80) });
      return;
    }
    const weight = unit.category === 'Synth' ? 18 : unit.category === 'Overwatch' ? 10 : unit.category === 'Biocontrol' ? 8 : unit.category === 'Airwatch' ? 12 : 5;
    setGame({
      ...game,
      units: game.units.map((u) => (u.id === unit.id ? { ...u, reserve: u.reserve - 1 } : u)),
      sectors: game.sectors.map((s) => s.id === sector.id ? { ...s, units: { ...s.units, [unit.id]: (s.units[unit.id] ?? 0) + 1 }, surveillance: clamp(s.surveillance + weight / 2), rebel: clamp(s.rebel - weight), xen: unit.category === 'Biocontrol' ? clamp(s.xen - 15) : s.xen, fear: clamp(s.fear + Math.ceil(weight / 2)) } : s),
      stats: addStat(game.stats, { combine: 2, fear: unit.category === 'Synth' ? 6 : 2, citadel: unit.category === 'Airwatch' ? -2 : 0, suspicion: unit.id === 'advisor' ? 12 : 0 }),
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${unit.name} déployé vers ${sector.name}.`, ...game.log].slice(0, 80),
    });
  }

  function buyUiuxUnlock(id: UiuxUnlockId) {
    const result = purchaseUiuxUnlock(game.uiuxProgression, id, game.day);
    setGame({
      ...game,
      uiuxProgression: result.state,
      log: [`JOUR ${String(game.day).padStart(3, '0')} - ${result.message}`, ...game.log].slice(0, 100),
    });
  }

  function auditUiuxProgression() {
    const uiuxProgression = runUiuxAudit(game.uiuxProgression, game.stats, game.day);
    setGame({
      ...game,
      uiuxProgression,
      log: [`JOUR ${String(game.day).padStart(3, '0')} - ${uiuxProgression.lastAudit}`, ...game.log].slice(0, 100),
    });
  }

  function navigateToTab(tab: TabId) {
    if (!isUiuxTabUnlocked(game.uiuxProgression, tab)) {
      setGame({ ...game, tab: 'progression', log: [`JOUR ${String(game.day).padStart(3, '0')} - Dossier ${tab} verrouille : autorisation requise.`, ...game.log].slice(0, 100) });
      return;
    }
    setGame({ ...game, tab });
  }

  function nextDay() {
    const propagation = simulateConnectedPropagation({
      sectors: game.sectors,
      units: game.units,
      stats: game.stats,
      scenario: game.scenario,
      profile: game.profile,
      day: game.day,
    });
    let sectors = propagation.sectors;
    const casualties = propagation.casualties;
    const combineLosses = propagation.combineLosses;
    const avgRebel = propagation.avgRebel;
    const avgXen = propagation.avgXen;
    const avgSurveillance = propagation.avgSurveillance;
    let stats = addStat(game.stats, {
      rebel: avgRebel - game.stats.rebel + Math.round((100 - game.stats.info) * 0.05),
      xen: avgXen - game.stats.xen,
      combine: avgSurveillance - game.stats.combine,
      civilianLosses: casualties,
      combineLosses,
    });
    const rationDaily = simulateRationDay({ state: game.rationEconomy, sectors, stats, day: game.day, timeline: game.timeline });
    sectors = rationDaily.sectors;
    stats = addStat(stats, rationDaily.statsDelta);
    const populationDaily = simulatePopulationDay({ population: game.population, sectors, rationEconomy: rationDaily.rationEconomy, stats, day: game.day });
    sectors = populationDaily.sectors;
    stats = addStat(stats, populationDaily.statsDelta);
    const citizenDaily = simulateCitizenRegistryDay({ registry: game.citizenRegistry, sectors, stats, day: game.day });
    stats = addStat(stats, citizenDaily.statsDelta);
    const informantDaily = simulateInformantDay({ state: game.informantNetwork, sectors, stats, day: game.day });
    stats = addStat(stats, informantDaily.statsDelta);
    const civilProtectionDaily = simulateCivilProtectionDay({ state: game.civilProtection, sectors, stats, day: game.day });
    sectors = civilProtectionDaily.sectors;
    stats = addStat(stats, civilProtectionDaily.statsDelta);
    const resistanceDaily = simulateResistanceNetworkDay({ state: game.resistanceNetwork, sectors, stats, day: game.day });
    stats = addStat(stats, resistanceDaily.statsDelta);
    const resistanceFactionDaily = simulateResistanceFactionDay({ state: game.resistanceFactions, stats, day: game.day, networkPressure: resistanceDaily.resistanceNetwork.networkCohesion });
    stats = addStat(stats, resistanceFactionDaily.statsDelta);
    const vortigauntDaily = simulateVortigauntDay({ state: game.vortigaunts, stats, nova: game.novaProspekt, resistanceFactions: resistanceFactionDaily.resistanceFactions, day: game.day });
    stats = addStat(stats, vortigauntDaily.statsDelta);
    const xenEcosystemDaily = simulateXenEcosystemDay({ state: game.xenEcosystem, sectors, stats, vortigaunts: vortigauntDaily.vortigaunts, population: populationDaily.population, day: game.day });
    sectors = xenEcosystemDaily.sectors;
    stats = addStat(stats, xenEcosystemDaily.statsDelta);
    const xenMutationDaily = simulateXenMutationDay({ state: game.xenMutation, sectors, stats, ecosystem: xenEcosystemDaily.xenEcosystem, vortigaunts: vortigauntDaily.vortigaunts, population: populationDaily.population, day: game.day });
    sectors = xenMutationDaily.sectors;
    stats = addStat(stats, xenMutationDaily.statsDelta);
    const quarantineZoneDaily = simulateQuarantineZoneDay({ state: game.quarantineZones, sectors, stats, ecosystem: xenEcosystemDaily.xenEcosystem, mutation: xenMutationDaily.xenMutation, population: populationDaily.population, vortigaunts: vortigauntDaily.vortigaunts, day: game.day });
    sectors = quarantineZoneDaily.sectors;
    stats = addStat(stats, quarantineZoneDaily.statsDelta);
    const xenResearchDaily = simulateXenResearchDay({ state: game.xenResearch, stats, sectors, ecosystem: xenEcosystemDaily.xenEcosystem, mutation: xenMutationDaily.xenMutation, quarantine: quarantineZoneDaily.quarantineZones, vortigaunts: vortigauntDaily.vortigaunts, nova: game.novaProspekt, day: game.day });
    stats = addStat(stats, xenResearchDaily.statsDelta);
    const xenCatastropheDaily = simulateXenCatastropheDay({ state: game.xenCatastrophes, sectors, stats, ecosystem: xenEcosystemDaily.xenEcosystem, mutation: xenMutationDaily.xenMutation, quarantine: quarantineZoneDaily.quarantineZones, research: xenResearchDaily.xenResearch, nova: game.novaProspekt, vortigaunts: vortigauntDaily.vortigaunts, day: game.day });
    sectors = xenCatastropheDaily.sectors;
    stats = addStat(stats, xenCatastropheDaily.statsDelta);
    stats = applyTimelineDailyPressure(stats, game.timeline);
    const timelineLines = getTimelineReportLines(game.timeline);
    const difficultyDaily = simulateDifficultyDay({ difficulty: game.difficultySettings, stats, sectors, day: game.day });
    sectors = difficultyDaily.sectors;
    stats = addStat(stats, difficultyDaily.statsDelta);
    const stabilityTarget = 100 - stats.rebel * 0.45 - stats.xen * 0.35 - stats.fatigue * 0.22 + stats.info * 0.12;
    stats = addStat(stats, { stability: Math.round(stabilityTarget - stats.stability), production: stats.fatigue > 66 ? -6 : stats.stability > 70 ? 3 : -1 });

    let directive = game.directive;
    let directiveDays = game.directiveDays - 1;
    const lines = [
      ...timelineLines,
      ...difficultyDaily.lines,
      ...rationDaily.lines,
      ...populationDaily.lines,
      ...citizenDaily.lines,
      ...informantDaily.lines,
      ...civilProtectionDaily.lines,
      ...resistanceDaily.lines,
      ...resistanceFactionDaily.lines,
      ...vortigauntDaily.lines,
      ...xenEcosystemDaily.lines,
      ...xenMutationDaily.lines,
      ...quarantineZoneDaily.lines,
      ...xenResearchDaily.lines,
      ...xenCatastropheDaily.lines,
      `Pertes civiles signalées : ${casualties}.`,
      `Pertes Combine : ${combineLosses}.`,
      `Activité rebelle moyenne : ${avgRebel}%.`,
      `Contamination Xen moyenne : ${avgXen}%.`,
      `Propagation Lambda : ${propagation.rebelSpreadEvents} secteurs ont reçu une pression voisine significative.`,
      `Propagation Xen : ${propagation.xenSpreadEvents} secteurs ont reçu un vecteur biologique notable.`,
      ...propagation.lambdaVectors.slice(0, 2),
      ...propagation.xenVectors.slice(0, 2),
      ...propagation.flashpoints.slice(0, 2),
    ];
    const novaDaily = processNovaProspektDay(game.novaProspekt, stats, game.day);
    stats = addStat(stats, novaDaily.statsDelta);
    lines.push(...novaDaily.lines);

    const citadelTreeDaily = simulateCitadelDirectiveTreeDay({ state: game.citadelDirectiveTree, stats, day: game.day });
    stats = addStat(stats, citadelTreeDaily.statsDelta);
    lines.push(...citadelTreeDaily.lines);

    const technologyDaily = simulateCombineTechnologyDay({ state: game.combineTechnology, stats, day: game.day });
    stats = addStat(stats, technologyDaily.statsDelta);
    lines.push(...technologyDaily.lines);

    const campaignDaily = simulateCampaignDay({ game, stats, sectors });
    stats = campaignDaily.stats;
    sectors = campaignDaily.sectors;
    lines.push(...campaignDaily.lines);

    const missionDaily = simulateCampaignMissionDay({
      game: {
        ...game,
        stats,
        sectors,
        campaign: campaignDaily.campaign,
        novaProspekt: novaDaily.nova,
        rationEconomy: rationDaily.rationEconomy,
        population: populationDaily.population,
        citizenRegistry: citizenDaily.citizenRegistry,
        informantNetwork: informantDaily.informantNetwork,
        civilProtection: civilProtectionDaily.civilProtection,
        citadelDirectiveTree: citadelTreeDaily.tree,
        combineTechnology: technologyDaily.technology,
        resistanceNetwork: resistanceDaily.resistanceNetwork,
        resistanceFactions: resistanceFactionDaily.resistanceFactions,
        vortigaunts: vortigauntDaily.vortigaunts,
        xenEcosystem: xenEcosystemDaily.xenEcosystem,
        xenMutation: xenMutationDaily.xenMutation,
        quarantineZones: quarantineZoneDaily.quarantineZones,
        xenResearch: xenResearchDaily.xenResearch,
        xenCatastrophes: xenCatastropheDaily.xenCatastrophes,
      },
      stats,
      sectors,
    });
    stats = missionDaily.stats;
    lines.push(...missionDaily.lines);

    const majorStoryDaily = simulateMajorStoryEventDay({
      state: game.majorStoryEvents,
      game: {
        ...game,
        stats,
        sectors,
        campaign: campaignDaily.campaign,
        campaignMission: missionDaily.campaignMission,
        novaProspekt: novaDaily.nova,
        rationEconomy: rationDaily.rationEconomy,
        population: populationDaily.population,
        citizenRegistry: citizenDaily.citizenRegistry,
        informantNetwork: informantDaily.informantNetwork,
        civilProtection: civilProtectionDaily.civilProtection,
        citadelDirectiveTree: citadelTreeDaily.tree,
        combineTechnology: technologyDaily.technology,
        resistanceNetwork: resistanceDaily.resistanceNetwork,
        resistanceFactions: resistanceFactionDaily.resistanceFactions,
        vortigaunts: vortigauntDaily.vortigaunts,
        xenEcosystem: xenEcosystemDaily.xenEcosystem,
        xenMutation: xenMutationDaily.xenMutation,
        quarantineZones: quarantineZoneDaily.quarantineZones,
        xenResearch: xenResearchDaily.xenResearch,
        xenCatastrophes: xenCatastropheDaily.xenCatastrophes,
      },
      sectors,
      stats,
      day: game.day,
    });
    sectors = majorStoryDaily.sectors;
    stats = addStat(stats, majorStoryDaily.statsDelta);
    lines.push(...majorStoryDaily.lines);

    const videoArchiveDaily = simulateVideoArchiveDay({
      state: game.videoArchives,
      game: {
        ...game,
        stats,
        sectors,
        campaign: campaignDaily.campaign,
        campaignMission: missionDaily.campaignMission,
        novaProspekt: novaDaily.nova,
        rationEconomy: rationDaily.rationEconomy,
        population: populationDaily.population,
        citizenRegistry: citizenDaily.citizenRegistry,
        informantNetwork: informantDaily.informantNetwork,
        civilProtection: civilProtectionDaily.civilProtection,
        citadelDirectiveTree: citadelTreeDaily.tree,
        combineTechnology: technologyDaily.technology,
        resistanceNetwork: resistanceDaily.resistanceNetwork,
        resistanceFactions: resistanceFactionDaily.resistanceFactions,
        vortigaunts: vortigauntDaily.vortigaunts,
        xenEcosystem: xenEcosystemDaily.xenEcosystem,
        xenMutation: xenMutationDaily.xenMutation,
        quarantineZones: quarantineZoneDaily.quarantineZones,
        xenResearch: xenResearchDaily.xenResearch,
        xenCatastrophes: xenCatastropheDaily.xenCatastrophes,
        majorStoryEvents: majorStoryDaily.majorStoryEvents,
      },
      sectors,
      stats,
      day: game.day,
    });
    stats = addStat(stats, videoArchiveDaily.statsDelta);
    lines.push(...videoArchiveDaily.lines);

    const uiuxProgressionDaily = simulateUiuxProgressionDay(game.uiuxProgression, stats, game.day);
    stats = addStat(stats, uiuxProgressionDaily.statsDelta);
    lines.push(...uiuxProgressionDaily.lines);

    if (directiveDays <= 0) {
      const current = stats[directive.stat];
      const ok = directive.mode === 'above' ? current >= directive.target : current <= directive.target;
      stats = addStat(stats, ok ? directive.reward : directive.penalty);
      lines.push(ok ? `DIRECTIVE RÉUSSIE : ${directive.title}.` : `DIRECTIVE ÉCHOUÉE : ${directive.title}. Sanctions appliquées.`);
      directive = pick(directives, game.day, Math.round(stats.suspicion + stats.citadel));
      directiveDays = directive.days;
      lines.push(`Nouvelle directive : ${directive.title}.`);
    } else {
      lines.push(`Directive active : ${directive.title} (${directiveDays} jours restants).`);
    }

    let ending: string | null = null;
    if (stats.rebel >= 100) ending = 'uprising';
    else if (stats.xen >= 88) ending = 'xen';
    else if (stats.suspicion >= 100 || stats.citadel <= 0) ending = 'replaced';
    else if (stats.production <= 0 && stats.rations <= 0) ending = 'collapse';
    else if (game.day >= 30 && stats.stability > 76 && stats.rebel < 8 && stats.loyalty < 8 && stats.fear > 86) ending = 'terror';
    else if (game.day >= 35 && stats.stability > 80 && stats.rebel < 12 && stats.xen < 12 && stats.production > 78) ending = 'model';
    else if (game.day >= 32 && game.profile === 'sympathizer' && stats.loyalty > 58 && stats.civilianLosses < 900 && stats.suspicion < 80) ending = 'humanity';

    const transmission = buildTransmittedReport({ realStats: stats, realLines: lines, policy: game.reportPolicy, day: game.day, city: game.city });
    const audit = resolveAdvisorAudit({
      day: game.day,
      auditRisk: transmission.auditRisk,
      suspicion: stats.suspicion,
      falsificationScore: transmission.falsificationScore,
      policy: game.reportPolicy,
    });
    stats = addStat(stats, { ...audit.effects, suspicion: (audit.effects.suspicion ?? 0) + transmission.suspicionDelta });
    const auditHeat = clamp((game.auditHeat ?? 0) + transmission.auditRisk * 0.08 + (audit.discovered ? 24 : audit.triggered ? 8 : -4));
    if (!ending && (stats.suspicion >= 100 || stats.citadel <= 0)) ending = 'replaced';

    const verdictSnapshot: GameState = {
      ...game,
      day: game.day,
      stats,
      sectors,
      auditHeat,
      uiuxProgression: uiuxProgressionDaily.state,
      novaProspekt: novaDaily.nova,
      rationEconomy: rationDaily.rationEconomy,
      population: populationDaily.population,
      citizenRegistry: citizenDaily.citizenRegistry,
      informantNetwork: informantDaily.informantNetwork,
      civilProtection: civilProtectionDaily.civilProtection,
      citadelDirectiveTree: citadelTreeDaily.tree,
      combineTechnology: technologyDaily.technology,
      resistanceNetwork: resistanceDaily.resistanceNetwork,
      resistanceFactions: resistanceFactionDaily.resistanceFactions,
      vortigaunts: vortigauntDaily.vortigaunts,
      xenEcosystem: xenEcosystemDaily.xenEcosystem,
      xenMutation: xenMutationDaily.xenMutation,
      quarantineZones: quarantineZoneDaily.quarantineZones,
      xenResearch: xenResearchDaily.xenResearch,
      xenCatastrophes: xenCatastropheDaily.xenCatastrophes,
      campaign: campaignDaily.campaign,
      campaignMission: missionDaily.campaignMission,
      difficultySettings: difficultyDaily.difficultySettings,
      majorStoryEvents: majorStoryDaily.majorStoryEvents,
      videoArchives: videoArchiveDaily.videoArchives,
      decisionHistory: game.decisionHistory,
    };
    const finalVerdict = buildFinalVerdict(verdictSnapshot, stats, sectors, ending);
    if (finalVerdict) {
      ending = finalVerdict.endingId;
      lines.push(`VERDICT FINAL : ${finalVerdict.title} / score COAN ${finalVerdict.finalScore}%.`);
    }

    const crisis = finalVerdict ? null : pickDirectedCrisis({ crises, sectors, stats, day: game.day, timeline: game.timeline });
    const nextReport: Report = {
      day: game.day,
      title: `RAPPORT JOUR ${String(game.day).padStart(3, '0')} — CITY ${game.city}`,
      lines,
      stats,
      transmittedLines: transmission.transmittedLines,
      transmittedStats: transmission.transmittedStats,
      falsificationScore: transmission.falsificationScore,
      auditRisk: transmission.auditRisk,
      falsifiedFields: transmission.falsifiedFields,
      auditLines: audit.lines,
      auditTriggered: audit.triggered,
      auditDiscovered: audit.discovered,
    };
    const finalChronicle = finalVerdict
      ? buildFinalChronicle({ ...verdictSnapshot, reports: [nextReport, ...game.reports], finalVerdict }, finalVerdict, nextReport)
      : null;
    setGame({
      ...game,
      day: game.day + 1,
      stats,
      sectors,
      directive,
      directiveDays,
      crisis: finalVerdict ? null : (ending ? null : crisis),
      reports: [nextReport, ...game.reports].slice(0, 30),
      log: [`${nextReport.title} archivé. Rapport transmis : ${reportPolicyLabels[game.reportPolicy]} / audit ${transmission.auditRisk}%.`, ...(finalChronicle ? [finalChronicle.finalSignature] : []), ...(finalVerdict ? finalVerdict.archiveLines : []), ...audit.lines, ...game.log].slice(0, 100),
      tab: finalVerdict ? 'chronicle' : game.tab,
      ending,
      finalVerdict,
      finalChronicle,
      auditHeat,
      uiuxProgression: uiuxProgressionDaily.state,
      novaProspekt: novaDaily.nova,
      rationEconomy: rationDaily.rationEconomy,
      population: populationDaily.population,
      citizenRegistry: citizenDaily.citizenRegistry,
      informantNetwork: informantDaily.informantNetwork,
      civilProtection: civilProtectionDaily.civilProtection,
      citadelDirectiveTree: citadelTreeDaily.tree,
      combineTechnology: technologyDaily.technology,
      resistanceNetwork: resistanceDaily.resistanceNetwork,
      resistanceFactions: resistanceFactionDaily.resistanceFactions,
      vortigaunts: vortigauntDaily.vortigaunts,
      xenEcosystem: xenEcosystemDaily.xenEcosystem,
      xenMutation: xenMutationDaily.xenMutation,
      quarantineZones: quarantineZoneDaily.quarantineZones,
      xenResearch: xenResearchDaily.xenResearch,
      xenCatastrophes: xenCatastropheDaily.xenCatastrophes,
      campaign: campaignDaily.campaign,
      campaignMission: missionDaily.campaignMission,
      difficultySettings: difficultyDaily.difficultySettings,
      majorStoryEvents: majorStoryDaily.majorStoryEvents,
      videoArchives: videoArchiveDaily.videoArchives,
      decisionHistory: game.decisionHistory,
    });
  }

  function setReportPolicy(policy: ReportPolicy) {
    setGame({
      ...game,
      reportPolicy: policy,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Politique de rapport Citadel : ${reportPolicyLabels[policy]}.`, ...game.log].slice(0, 80),
    });
  }


  function setRationPolicy(policyId: RationPolicyId) {
    const result = changeRationPolicy(game.rationEconomy, policyId);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      rationEconomy: result.rationEconomy,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyRationOperation(operation: RationOperation) {
    const result = resolveRationOperation({ state: game.rationEconomy, operation, sectors: game.sectors, stats: game.stats, day: game.day });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      rationEconomy: result.rationEconomy,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyNovaOperation(operation: NovaOperation) {
    const result = resolveNovaOperation({ state: game.novaProspekt, operation, day: game.day });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      novaProspekt: result.nova,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeNovaPolicy(policyId: string) {
    const result = setNovaPolicy(game.novaProspekt, policyId);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      novaProspekt: result.nova,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyBreencastStrategy(strategyId: string) {
    const strategy = breencastStrategies.find((item) => item.id === strategyId);
    if (!strategy) return;
    const result = resolveBreencastStrategy({ game, strategy });
    setGame({
      ...game,
      stats: result.stats,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }



  function applyCitizenAction(action: CitizenAction, citizenId: string) {
    const result = resolveCitizenAction({ registry: game.citizenRegistry, action, recordId: citizenId, day: game.day });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      citizenRegistry: result.citizenRegistry,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }


  function changeInformantDoctrine(doctrineId: InformantDoctrineId) {
    const result = setInformantDoctrine(game.informantNetwork, doctrineId);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      informantNetwork: result.informantNetwork,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyInformantOperation(operation: InformantOperation) {
    const result = resolveInformantOperation({ state: game.informantNetwork, operation, sectors: game.sectors, registry: game.citizenRegistry, stats: game.stats, day: game.day });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      informantNetwork: result.informantNetwork,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeCivilProtectionDoctrine(doctrineId: CivilProtectionDoctrineId) {
    const result = setCivilProtectionDoctrine(game.civilProtection, doctrineId);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      civilProtection: result.civilProtection,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyCivilProtectionOperation(operation: CivilProtectionOperation) {
    const result = resolveCivilProtectionOperation({ state: game.civilProtection, operation, sectors: game.sectors, selectedSectorId: sector.id, stats: game.stats, day: game.day });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      civilProtection: result.civilProtection,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }


  function activateCitadelDirectiveProtocol(node: CitadelDirectiveNode) {
    const result = resolveDirectiveNode({ state: game.citadelDirectiveTree, stats: game.stats, nodeId: node.id, day: game.day });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      citadelDirectiveTree: result.tree,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }


  function researchCombineTechnology(node: CombineTechnologyNode) {
    const result = researchTechnologyNode({ state: game.combineTechnology, stats: game.stats, units: game.units, sectors: game.sectors, nodeId: node.id, day: game.day });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      units: result.units,
      sectors: result.sectors,
      combineTechnology: result.technology,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }


  function applyResistanceOperation(operation: ResistanceOperation) {
    const targetCell = game.resistanceNetwork.cells.find((cell) => cell.discovered) ?? game.resistanceNetwork.cells[0];
    const targetRoute = game.resistanceNetwork.routes.sort((a, b) => b.risk - a.risk)[0];
    const result = resolveResistanceOperation({
      state: game.resistanceNetwork,
      operation,
      sectors: game.sectors,
      selectedCellId: targetCell?.id,
      selectedRouteId: targetRoute?.id,
      selectedSectorId: targetCell?.sectorId ?? selectedSector,
      stats: game.stats,
      day: game.day,
    });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      resistanceNetwork: result.resistanceNetwork,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeResistanceDoctrine(doctrine: ResistanceNetworkState['activeDoctrine']) {
    const result = setResistanceDoctrine(game.resistanceNetwork, doctrine);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      resistanceNetwork: result.resistanceNetwork,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }



  function applyResistanceFactionOperation(operation: ResistanceFactionOperation) {
    const result = resolveResistanceFactionOperation({
      state: game.resistanceFactions,
      operation,
      stats: game.stats,
    });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      resistanceFactions: result.resistanceFactions,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeResistanceFactionDoctrine(doctrine: ResistanceFactionDoctrineId) {
    const result = setResistanceFactionDoctrine(game.resistanceFactions, doctrine);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      resistanceFactions: result.resistanceFactions,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeVortigauntDoctrine(doctrine: VortigauntDoctrineId) {
    const result = setVortigauntDoctrine(game.vortigaunts, doctrine);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      vortigaunts: result.vortigaunts,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyVortigauntOperation(operation: VortigauntOperation, groupId?: string) {
    const result = resolveVortigauntOperation({
      state: game.vortigaunts,
      operation,
      stats: game.stats,
      nova: game.novaProspekt,
      resistanceFactions: game.resistanceFactions,
      selectedGroupId: groupId,
      day: game.day,
    });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      novaProspekt: result.novaProspekt,
      resistanceFactions: result.resistanceFactions,
      vortigaunts: result.vortigaunts,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }



  function changeXenEcosystemPolicy(policy: XenEcosystemPolicyId) {
    const result = setXenEcosystemPolicy(game.xenEcosystem, policy);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      xenEcosystem: result.xenEcosystem,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyXenEcosystemOperation(operation: XenEcosystemOperation, layerId?: string) {
    const result = resolveXenEcosystemOperation({
      state: game.xenEcosystem,
      operation,
      sectors: game.sectors,
      selectedLayerId: layerId,
      selectedSectorId: selectedSector,
      stats: game.stats,
      day: game.day,
    });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      xenEcosystem: result.xenEcosystem,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeXenMutationPolicy(policy: XenMutationPolicyId) {
    const result = setXenMutationPolicy(game.xenMutation, policy);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      xenMutation: result.xenMutation,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyXenMutationOperation(operation: XenMutationOperation, chainId?: string) {
    const result = resolveXenMutationOperation({
      state: game.xenMutation,
      operation,
      sectors: game.sectors,
      selectedChainId: chainId,
      selectedSectorId: selectedSector,
      stats: game.stats,
      day: game.day,
    });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      xenMutation: result.xenMutation,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeQuarantinePolicy(policy: QuarantinePolicyId) {
    const result = setQuarantinePolicy(game.quarantineZones, policy);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      quarantineZones: result.quarantineZones,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyQuarantineOperation(operation: QuarantineOperation) {
    const result = resolveQuarantineOperation({
      state: game.quarantineZones,
      operation,
      sectors: game.sectors,
      selectedSectorId: selectedSector,
      stats: game.stats,
      day: game.day,
    });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      quarantineZones: result.quarantineZones,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }


  function changeXenResearchPolicy(policy: XenResearchPolicyId) {
    const result = setXenResearchPolicy(game.xenResearch, policy);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      xenResearch: result.xenResearch,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyXenResearchOperation(operation: XenResearchOperation, programId?: string) {
    const result = resolveXenResearchOperation({
      state: game.xenResearch,
      operation,
      sectors: game.sectors,
      selectedProgramId: programId,
      selectedSectorId: selectedSector,
      stats: game.stats,
      nova: game.novaProspekt,
      day: game.day,
    });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      novaProspekt: result.novaProspekt ?? game.novaProspekt,
      xenResearch: result.xenResearch,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }



  function changeXenCatastrophePolicy(policy: XenCatastrophePolicyId) {
    const result = setXenCatastrophePolicy(game.xenCatastrophes, policy);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      xenCatastrophes: result.xenCatastrophes,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyXenCatastropheOperation(operation: XenCatastropheOperation, eventId?: string) {
    const result = resolveXenCatastropheOperation({
      state: game.xenCatastrophes,
      operation,
      sectors: game.sectors,
      selectedEventId: eventId,
      selectedSectorId: selectedSector,
      stats: game.stats,
      day: game.day,
    });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      xenCatastrophes: result.xenCatastrophes,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeMajorStoryPolicy(policy: MajorStoryPolicyId) {
    const result = setMajorStoryPolicy(game.majorStoryEvents, policy);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      majorStoryEvents: result.majorStoryEvents,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyMajorStoryOperation(operation: MajorStoryOperation, eventId?: string) {
    const result = resolveMajorStoryOperation({
      state: game.majorStoryEvents,
      operation,
      sectors: game.sectors,
      selectedEventId: eventId,
      selectedSectorId: selectedSector,
      stats: game.stats,
      day: game.day,
    });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      majorStoryEvents: result.majorStoryEvents,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeVideoArchivePolicy(policy: VideoArchivePolicyId) {
    const result = setVideoArchivePolicy(game.videoArchives, policy);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      videoArchives: result.videoArchives,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyVideoArchiveOperation(operation: VideoArchiveOperation, feedId?: string) {
    const result = resolveVideoArchiveOperation({
      state: game.videoArchives,
      operation,
      selectedFeedId: feedId,
      stats: game.stats,
      nova: game.novaProspekt,
    });
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      videoArchives: result.videoArchives,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function updateAtmosphereSettings(patch: Partial<AtmosphereSettings>) {
    setGame({
      ...game,
      atmosphereSettings: mergeAtmosphereSettings({ ...game.atmosphereSettings, ...patch }),
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Paramètres sensoriels mis à jour.`, ...game.log].slice(0, 80),
    });
  }

  function setDecisionHistoryView(filter: DecisionHistoryFilterId) {
    setGame({
      ...game,
      decisionHistory: setDecisionHistoryFilter(game.decisionHistory, filter),
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Filtre historique décisions : ${filter}.`, ...game.log].slice(0, 80),
    });
  }

  function applyDifficultyPreset(presetId: DifficultyPresetId) {
    const result = setDifficultyPreset(game.difficultySettings, presetId);
    setGame({
      ...game,
      difficultySettings: result.difficultySettings,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function setDifficultyScalarValue(key: DifficultyScalarKey, value: number) {
    const difficultySettings = updateDifficultyScalar(game.difficultySettings, key, value);
    setGame({
      ...game,
      difficultySettings,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Difficulté custom : ${key} ×${difficultySettings.scalars[key].toFixed(2)}.`, ...game.log].slice(0, 80),
    });
  }

  function resetDifficultySettings() {
    const difficultySettings = resetCustomDifficulty(game.difficultySettings);
    setGame({
      ...game,
      difficultySettings,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Difficulté restaurée : occupation standard.`, ...game.log].slice(0, 80),
    });
  }

  function startGuidedOnboarding(trackId: OnboardingTrackId) {
    const config = buildGuidedStartConfig(trackId, cityInput, difficultyInput);
    setCampaignInput(config.campaignId);
    setUseCampaignRecommendations(config.campaignId !== 'custom_city_administration');
    const doctrineId = Object.values(newGameIntakeDoctrines).find((entry) => entry.onboardingTrackId === trackId)?.id ?? 'manual';
    setNewGameDoctrineInput(doctrineId);
    setOnboardingTrackInput(trackId);
    setScenarioInput(config.scenario);
    setTimelineInput(config.timeline);
    setProfileInput(config.profile);
    setDifficultyInput(config.difficultyPresetId);
    setCityInput(config.city);
    const next = createInitialGame(config.city, config.scenario, config.timeline, config.profile, config.campaignId, config.difficultyPresetId);
    setGame({
      ...next,
      tab: 'onboarding',
      onboarding: selectOnboardingTrack(next.onboarding, trackId),
      log: [...config.lines.map((line) => `JOUR 001 — ${line}`), ...next.log].slice(0, 100),
    });
    setSelectedSector('admin');
  }

  function chooseOnboardingTrack(trackId: OnboardingTrackId) {
    const nextOnboarding = selectOnboardingTrack(game.onboarding, trackId);
    setGame({
      ...game,
      onboarding: nextOnboarding,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Tutoriel COAN : piste ${trackId} sélectionnée.`, ...game.log].slice(0, 80),
    });
  }

  function completeOnboardingChapter(chapterId: OnboardingChapterId) {
    const nextOnboarding = completeOnboardingChapterState(game.onboarding, chapterId);
    setGame({
      ...game,
      onboarding: nextOnboarding,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Tutoriel COAN : chapitre ${chapterId} validé.`, ...game.log].slice(0, 80),
    });
  }

  function resetOnboardingStatus() {
    setGame({
      ...game,
      onboarding: resetOnboardingFlow(game),
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Tutoriel COAN réinitialisé.`, ...game.log].slice(0, 80),
    });
  }

  function runOnboardingFirstDayScript() {
    const result = resolveOnboardingFirstDay(game);
    setGame({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      onboarding: result.onboarding,
      tab: result.suggestedTab,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.logLines[0]}`, ...result.logLines.slice(1), ...game.log].slice(0, 100),
    });
  }

  const fullNav: Array<[TabId, string]> = [['onboarding', 'Tutoriel COAN'], ['dashboard', 'Terminal COAN'], ['command_deck_v2', 'Command Deck V4'], ['progression', 'Requisitions'], ['campaigns', 'Campagnes'], ['major_events', 'Événements majeurs'], ['finale', 'Verdict final'], ['chronicle', 'Chronique finale'], ['timeline', 'Timeline'], ['sectors', 'Carte de City'], ['population', 'Population'], ['citizens', 'Registre Civil'], ['informants', 'Informateurs'], ['civil_protection', 'Civil Protection'], ['overwatch', 'Overwatch Command'], ['citadel', 'Citadel Directives'], ['technology', 'Technologies Combine'], ['combine', 'Forces Combine'], ['resistance', 'Résistance'], ['vortigaunts', 'Vortigaunts / Biotics'], ['xen', 'Quarantaine Xen'], ['xen_research', 'Recherche Xen'], ['xen_catastrophes', 'Catastrophes Xen'], ['rationing', 'Rationnement'], ['nova', 'Nova Prospekt'], ['propaganda', 'BreenCast'], ['reports', 'Rapports falsifiés'], ['archives', 'Archives'], ['video_archives', 'Archives vidéo'], ['save_system', 'Sauvegardes'], ['decision_history', 'Historique décisions'], ['difficulty', 'Difficulté'], ['gameplay_balance', 'Équilibrage'], ['atmosphere', 'Atmosphère'], ['tauri_packaging', 'Packaging EXE'], ['ux_polish', 'Polish UX'], ['codex', 'Codex Lore'], ['system_audit', 'Audit final']];
  const nav = getTerminalNavTabs(activeTerminal.id, fullNav);
  const uxPolish = useMemo(() => buildUxPolishReport(game, nav), [game, nav]);
  const navHintMap = useMemo(() => new Map(uxPolish.navHints.map((hint) => [hint.tab, `${hint.tooltip} — ${hint.loreHint}`])), [uxPolish]);

  return (
    <div className={`app-shell ux-density-${uxPolish.density} ${atmosphereProfile.bodyClass} alert-${atmosphereProfile.alertLevel}`}>
      <AtmosphereLayer profile={atmosphereProfile} settings={game.atmosphereSettings} cueKey={atmosphereCueKey} audioDirector={audioDirector} />
      <FloatingWindowLayer game={game} selectedSectorId={selectedSector} setTab={navigateToTab} />
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-kicker">COMBINE CIVIL AUTHORITY</span>
          <h1>City {game.city}</h1>
          <p>{activeTerminal.label} — {activeTerminal.subtitle}</p>
        </div>
        <div className="terminal-switcher">
          {terminalInterfaceOrder.map((id) => {
            const terminal = terminalInterfaces[id];
            const status = buildTerminalInterfaceStatus(game, id);
            const target = getTerminalSwitchTarget(id);
            const locked = !isUiuxTabUnlocked(game.uiuxProgression, target);
            return <button key={id} disabled={locked} title={locked ? 'Autorisation requise dans Requisitions' : terminal.label} className={`terminal-switch tone-${terminal.tone} ${activeTerminal.id === id ? 'active' : ''}`} onClick={() => navigateToTab(target)}>
              <strong>{terminal.shortLabel}</strong>
              <span>{locked ? 'LOCK / requisition' : `${status.integrity}% / risque ${status.risk}%`}</span>
            </button>;
          })}
        </div>
        <nav>
          {nav.map(([id, label]) => {
            const locked = !isUiuxTabUnlocked(game.uiuxProgression, id);
            return <button key={id} disabled={locked} title={locked ? 'Autorisation requise dans Requisitions' : (navHintMap.get(id) ?? label)} className={`${game.tab === id ? 'active' : ''} ${locked ? 'locked' : ''}`} onClick={() => navigateToTab(id)}>{locked ? `${label} / LOCK` : label}</button>;
          })}
        </nav>
        <div className="start-card intake-sidebar-card">
          <span className="brand-kicker">SESSION V4</span>
          <strong>Phase {game.uiuxProgression.phase.replace('_', ' ')}</strong>
          <small>Viabilite {game.uiuxProgression.longTermScore}% / charge {game.uiuxProgression.bureaucraticLoad}%</small>
          <button className="primary" onClick={() => navigateToTab('progression')}>Ouvrir Requisitions</button>
          <button onClick={() => navigateToTab('save_system')}>Sauvegardes</button>
        </div>
      </aside>

      <main className={`main terminal-${activeTerminal.id} terminal-tone-${activeTerminal.tone} ${game.atmosphereSettings.scanlines ? 'scanlines' : ''} ${game.tab === 'nova' || activeTerminal.id === 'nova' ? 'nova-interface' : ''} ${atmosphereProfile.bodyClass}`}>
        <header className="topbar terminal-topbar">
          <div><strong>{activeTerminal.commandHeader}</strong><span>JOUR {String(game.day).padStart(3, '0')}</span><span>Campagne : {getCampaignPreset(game.campaign.activeCampaignId).name}</span><span>Phase : {game.uiuxProgression.phase.replace('_', ' ')}</span><span>HEAT {game.uiuxProgression.heat}% / REQ {game.uiuxProgression.resources.requisition}</span><span>Difficulté : {difficultyPresets[game.difficultySettings.activePresetId].name}</span><span>Directive : {game.directive.title} / {game.directiveDays} j</span><span className="atmosphere-status">{atmosphereProfile.label} — alerte {atmosphereProfile.alertLevel}/5</span></div>
          <button className="end-day" onClick={nextDay} disabled={!!game.ending || !!game.crisis}>Clôturer la journée</button>
        </header>

        <section className={`terminal-interface-banner tone-${activeTerminal.tone}`}>
          <div>
            <span className="brand-kicker">{activeTerminal.classification}</span>
            <h2>{activeTerminal.label}</h2>
            <p>{activeTerminal.operatorBrief}</p>
          </div>
          <div className="terminal-status-grid">
            <span>Intégrité <b>{terminalStatus.integrity}%</b></span>
            <span>Risque <b>{terminalStatus.risk}%</b></span>
            <span>Focus <b>{terminalStatus.recommendedTab}</b></span>
          </div>
          <div className="terminal-lexicon">
            {activeTerminal.statusVocabulary.map((item) => <em key={item}>{item}</em>)}
          </div>
          <p className="terminal-warning-line">{terminalStatus.warningLine}</p>
        </section>

        <section className={`ux-command-strip score-${uxPolish.score >= 88 ? 'ok' : uxPolish.score >= 74 ? 'watch' : uxPolish.score >= 58 ? 'risk' : 'critical'}`}>
          <div>
            <span className="brand-kicker">UX POLISH / {uxPolish.statusLabel}</span>
            <strong>{uxPolish.headline}</strong>
          </div>
          <div className="ux-command-routes">
            {uxPolish.quickRoutes.slice(0, 5).map((route) => <button key={route.id} disabled={!isUiuxTabUnlocked(game.uiuxProgression, route.targetTab)} title={route.reason} className={`tone-${route.tone} ${route.active ? 'active' : ''}`} onClick={() => navigateToTab(route.targetTab)}>
              <b>{route.shortLabel}</b>
              <span>{route.priority}</span>
            </button>)}
          </div>
          <button className="ghost" onClick={() => setGame({ ...game, tab: 'ux_polish' })}>Audit UX</button>
        </section>

        <section className="stats-grid">
          <Stat label="Stabilité" value={game.stats.stability} />
          <Stat label="Loyauté" value={game.stats.loyalty} />
          <Stat label="Peur" value={game.stats.fear} dangerHigh />
          <Stat label="Rébellion" value={game.stats.rebel} dangerHigh />
          <Stat label={game.uiuxProgression.unlocked.xen_bioscan ? 'Xen' : 'Bio-signal masque'} value={game.uiuxProgression.unlocked.xen_bioscan ? game.stats.xen : 0} dangerHigh xen />
          <Stat label="Combine" value={game.stats.combine} />
          <Stat label="Production" value={game.stats.production} />
          <Stat label="Citadelle" value={game.stats.citadel} />
          <Stat label="Info" value={game.stats.info} />
          <Stat label="Fatigue" value={game.stats.fatigue} dangerHigh />
          <Stat label="Suspicion" value={game.stats.suspicion} dangerHigh />
          <Stat label="Audit" value={game.auditHeat ?? 0} dangerHigh />
          <Stat label="Difficulté" value={game.difficultySettings.projectedThreat} dangerHigh />
          <Stat label="Campagne" value={game.campaign.pressure} dangerHigh />
          <Stat label="Mandat obj." value={game.campaignMission.mandateScore} />
          <Stat label="Risque obj." value={game.campaignMission.failureRisk} dangerHigh />
          <Stat label="Événements majeurs" value={game.majorStoryEvents.citywideHeat} dangerHigh />
          <div className="stat"><span>Rations</span><b>{game.stats.rations}</b></div>
          <Stat label="Faim" value={game.rationEconomy.hungerIndex} dangerHigh />
          <Stat label="Marché noir" value={game.rationEconomy.blackMarketIndex} dangerHigh />
          <Stat label="Conformité" value={game.population.complianceIndex} />
          <Stat label="Sympathie Λ" value={game.population.lambdaSupportIndex} dangerHigh />
          <Stat label="Vortessence" value={game.vortigaunts.vortessenceCoherence} dangerHigh />
          <Stat label="Biotics" value={game.vortigaunts.bioticPressure} dangerHigh />
          {game.uiuxProgression.unlocked.xen_bioscan && <Stat label="Exposition bio" value={game.population.xenExposureIndex} dangerHigh xen />}
          {game.uiuxProgression.unlocked.xen_bioscan && <Stat label="Mutations" value={game.xenMutation.outbreakRisk} dangerHigh xen />}
          {game.uiuxProgression.unlocked.xen_bioscan && <Stat label="Conversion" value={game.xenMutation.hostConversionIndex} dangerHigh xen />}
          {game.uiuxProgression.unlocked.xen_bioscan && <Stat label="R&D Xen" value={game.xenResearch.labIncidentRisk} dangerHigh xen />}
          <Stat label="Tech" value={game.combineTechnology.scanEfficiency} />
          <Stat label="Dette tech" value={game.combineTechnology.maintenanceDebt} dangerHigh />
        </section>

        {game.ending && <div className="ending"><h2>PROTOCOLE DE FIN ACTIVÉ</h2><p>{game.finalVerdict ? `${game.finalVerdict.title} — ${game.finalVerdict.subtitle}` : (endings[game.ending] ?? endings.replaced).replaceAll('{city}', game.city)}</p></div>}

        {game.crisis && (
          <div className="crisis-modal">
            <div className="crisis-box">
              <span className="brand-kicker">ALERTE {game.crisis.type}</span>
              <h2>{game.crisis.title}</h2>
              <p>{game.crisis.body}</p>
              {game.crisis.loreTags && <div className="event-tags">{game.crisis.loreTags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
              {game.crisis.severity && <p className="severity-line">Gravité protocolaire : {game.crisis.severity}/5</p>}
              <div className="choice-grid">
                {game.crisis.choices.map((c) => <button key={c.id} onClick={() => resolveCrisis(c)}><strong>{c.label}</strong><span>{c.detail}</span></button>)}
              </div>
            </div>
          </div>
        )}

        {game.tab === 'new_game' && <NewGameIntakeScreen
          cityInput={cityInput}
          setCityInput={setCityInput}
          scenarioInput={scenarioInput}
          setScenarioInput={setScenarioInput}
          timelineInput={timelineInput}
          setTimelineInput={setTimelineInput}
          campaignInput={campaignInput}
          setCampaignInput={setCampaignInput}
          difficultyInput={difficultyInput}
          setDifficultyInput={setDifficultyInput}
          profileInput={profileInput}
          setProfileInput={setProfileInput}
          doctrineInput={newGameDoctrineInput}
          setDoctrineInput={setNewGameDoctrineInput}
          onboardingTrackInput={onboardingTrackInput}
          setOnboardingTrackInput={setOnboardingTrackInput}
          useCampaignRecommendations={useCampaignRecommendations}
          setUseCampaignRecommendations={setUseCampaignRecommendations}
          applyDoctrine={applyNewGameDoctrine}
          startGame={startGame}
          startGuidedGame={startGuidedOnboarding}
          setTab={(tab) => setGame({ ...game, tab })}
        />}
        {game.tab === 'onboarding' && <OnboardingScreen game={game} startGuidedGame={startGuidedOnboarding} selectTrack={chooseOnboardingTrack} completeChapter={completeOnboardingChapter} resetOnboarding={resetOnboardingStatus} runFirstDayScript={runOnboardingFirstDayScript} setTab={(tab) => setGame({ ...game, tab })} />}
        {game.tab === 'dashboard' && <Dashboard game={game} dynamicBreencast={dynamicBreencast} timelinePreset={timelinePreset} atmosphereProfile={atmosphereProfile} globalAction={globalAction} eventSummary={eventSummary} setTab={(tab) => setGame({ ...game, tab })} />}
        {game.tab === 'command_deck_v2' && <UiuxV2CommandDeck game={game} setTab={navigateToTab} runAudit={auditUiuxProgression} />}
        {game.tab === 'progression' && <UiuxProgressionPanel game={game} purchaseUnlock={buyUiuxUnlock} runAudit={auditUiuxProgression} />}
        {game.tab === 'campaigns' && <CampaignScreen game={game} startCampaign={startCampaign} />}
        {game.tab === 'major_events' && <MajorStoryEventsScreen game={game} operations={majorStoryOperations} changePolicy={changeMajorStoryPolicy} applyOperation={applyMajorStoryOperation} />}
        {game.tab === 'finale' && <FinalVerdictScreen game={game} />}
        {game.tab === 'chronicle' && <FinalChronicleScreen game={game} />}
        {game.tab === 'timeline' && <TimelinePanel game={game} current={timelinePreset} setTimeline={(timeline) => setGame(createInitialGame(game.city, game.scenario, timeline, game.profile, game.campaign.activeCampaignId, game.difficultySettings.activePresetId))} />}
        {game.tab === 'sectors' && <Sectors game={game} selectedSector={selectedSector} setSelectedSector={setSelectedSector} sector={sector} sectorAction={sectorAction} deploy={deploy} />}
        {game.tab === 'population' && <PopulationScreen game={game} selectedSectorId={selectedSector} setSelectedSector={setSelectedSector} />}
        {game.tab === 'citizens' && <CitizenRegistryScreen game={game} actions={citizenActions} applyAction={applyCitizenAction} />}
        {game.tab === 'informants' && <InformantNetworkScreen game={game} operations={informantOperations} changeDoctrine={changeInformantDoctrine} applyOperation={applyInformantOperation} />}
        {game.tab === 'civil_protection' && <CivilProtectionScreen game={game} sector={sector} sectorAction={sectorAction} deploy={deploy} operations={civilProtectionOperations} changeDoctrine={changeCivilProtectionDoctrine} applyOperation={applyCivilProtectionOperation} />}
        {game.tab === 'overwatch' && <OverwatchCommandScreen game={{ ...game, units: game.units.filter((unit) => isUiuxUnitUnlocked(game.uiuxProgression, unit.id)) }} sector={sector} deploy={deploy} globalAction={globalAction} />}
        {game.tab === 'citadel' && <CitadelDirectivesScreen game={game} globalAction={globalAction} activateProtocol={activateCitadelDirectiveProtocol} />}
        {game.tab === 'technology' && <CombineTechnologyScreen game={game} researchTechnology={researchCombineTechnology} />}
        {game.tab === 'combine' && <Combine units={game.units.filter((unit) => isUiuxUnitUnlocked(game.uiuxProgression, unit.id))} sector={sector} deploy={deploy} />}
        {game.tab === 'resistance' && <ResistanceOperationsScreen game={game} operations={resistanceOperations} applyOperation={applyResistanceOperation} changeDoctrine={changeResistanceDoctrine} factionOperations={resistanceFactionOperations} applyFactionOperation={applyResistanceFactionOperation} changeFactionDoctrine={changeResistanceFactionDoctrine} />}
        {game.tab === 'vortigaunts' && <VortigauntBioticsScreen game={game} operations={vortigauntOperations} changeDoctrine={changeVortigauntDoctrine} applyOperation={applyVortigauntOperation} />}
        {game.tab === 'xen' && <XenQuarantineScreen game={game} sector={sector} sectorAction={sectorAction} operations={xenEcosystemOperations} changePolicy={changeXenEcosystemPolicy} applyOperation={applyXenEcosystemOperation} mutationOperations={xenMutationOperations} changeMutationPolicy={changeXenMutationPolicy} applyMutationOperation={applyXenMutationOperation} quarantineOperations={quarantineOperations} changeQuarantinePolicy={changeQuarantinePolicy} applyQuarantineOperation={applyQuarantineOperation} />}
        {game.tab === 'xen_research' && <XenResearchScreen game={game} sector={sector} operations={xenResearchOperations} changePolicy={changeXenResearchPolicy} applyOperation={applyXenResearchOperation} />}
        {game.tab === 'xen_catastrophes' && <XenCatastropheScreen game={game} operations={xenCatastropheOperations} changePolicy={changeXenCatastrophePolicy} applyOperation={applyXenCatastropheOperation} />}
        {game.tab === 'rationing' && <RationingScreen game={game} globalAction={globalAction} operations={rationOperations} setPolicy={setRationPolicy} applyOperation={applyRationOperation} />}
        {game.tab === 'nova' && <NovaProspektPanel nova={game.novaProspekt} operations={novaOperations} applyOperation={applyNovaOperation} changePolicy={changeNovaPolicy} />}
        {game.tab === 'propaganda' && <Propaganda dynamicBreencast={dynamicBreencast} strategies={breencastStrategies} globalAction={globalAction} applyStrategy={applyBreencastStrategy} />}
        {game.tab === 'reports' && <Reports reports={game.reports} log={game.log} policy={game.reportPolicy} setPolicy={setReportPolicy} />}
        {game.tab === 'archives' && <ArchivesScreen game={game} eventSummary={eventSummary} />}
        {game.tab === 'video_archives' && <VideoArchivesScreen game={game} operations={videoArchiveOperations} changePolicy={changeVideoArchivePolicy} applyOperation={applyVideoArchiveOperation} />}
        {game.tab === 'save_system' && <SaveManagerScreen game={game} loadGame={loadGameFromSave} />}
        {game.tab === 'decision_history' && <DecisionHistoryScreen game={game} setFilter={setDecisionHistoryView} />}
        {game.tab === 'difficulty' && <DifficultySettingsScreen game={game} applyPreset={applyDifficultyPreset} updateScalar={setDifficultyScalarValue} resetCustom={resetDifficultySettings} />}
        {game.tab === 'gameplay_balance' && <GameplayBalanceScreen game={game} />}
        {game.tab === 'atmosphere' && <AtmosphereScreen profile={atmosphereProfile} audioDirector={audioDirector} settings={game.atmosphereSettings} updateSettings={updateAtmosphereSettings} />}
        {game.tab === 'tauri_packaging' && <TauriPackagingScreen game={game} />}
        {game.tab === 'codex' && <LoreCodexScreen game={game} setTab={(tab) => setGame({ ...game, tab })} />}
        {game.tab === 'ux_polish' && <UxPolishScreen game={game} nav={nav} setTab={(tab) => setGame({ ...game, tab })} />}
        {game.tab === 'system_audit' && <SystemAuditScreen game={game} setTab={(tab) => setGame({ ...game, tab })} />}
      </main>
    </div>
  );
}

function Stat({ label, value, dangerHigh = false, xen = false }: { label: string; value: number; dangerHigh?: boolean; xen?: boolean }) {
  const danger = dangerHigh ? value > 65 : value < 35;
  return <div className={`stat ${danger ? 'danger' : ''} ${xen ? 'xen-stat' : ''}`}><span>{label}</span><b>{value}%</b><i style={{ width: `${clamp(value)}%` }} /></div>;
}

function Dashboard({ game, dynamicBreencast, timelinePreset, atmosphereProfile, globalAction, eventSummary, setTab }: { game: GameState; dynamicBreencast: ReturnType<typeof buildDynamicBreencast>; timelinePreset: ReturnType<typeof getTimelinePreset>; atmosphereProfile: ReturnType<typeof getAtmosphereProfile>; globalAction: (a: 'breencast' | 'ration_plus' | 'ration_cut' | 'advisor' | 'shadow_help') => void; eventSummary: Record<string, number>; setTab: (tab: TabId) => void }) {
  const terminal = useMemo(() => buildDashboardTerminal(game), [game]);
  const latestReport = game.reports[0];
  const activeObjectives = game.campaignMission.objectives.filter((objective) => objective.discovered && objective.status === 'active').slice(0, 4);
  const criticalAlerts = terminal.alerts.filter((alert) => alert.severity === 'critical' || alert.severity === 'urgent').slice(0, 5);

  return <section className="coan-dashboard">
    <div className="coan-hero panel">
      <div className="coan-hero-main">
        <span className="brand-kicker">COAN CENTRAL MONITORING GRID</span>
        <h2>{terminal.commandStatus}</h2>
        <p>{terminal.coanRecommendation}</p>
        <div className="coan-directive-line"><b>{terminal.primaryThreat}</b><span>{terminal.commandDirective}</span></div>
        <div className="terminal-ticker">{terminal.ticker.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
      <div className="coan-hero-metrics">
        <div><span>Grid integrity</span><b>{terminal.gridIntegrity}%</b><i style={{ width: `${terminal.gridIntegrity}%` }} /></div>
        <div><span>City pulse</span><b>{terminal.cityPulse}%</b><i style={{ width: `${terminal.cityPulse}%` }} /></div>
        <div><span>Atmosphere</span><b>{atmosphereProfile.alertLevel}/5</b><i style={{ width: `${atmosphereProfile.intensity}%` }} /></div>
        <div><span>Mandat objectif</span><b>{game.campaignMission.mandateScore}%</b><i style={{ width: `${game.campaignMission.mandateScore}%` }} /></div>
      </div>
    </div>

    <div className="coan-layout">
      <div className="panel coan-map-panel">
        <span className="brand-kicker">Mini-carte persistante</span>
        <h2>City {game.city} / secteurs chauds</h2>
        <div className="terminal-city-map">
          <div className="terminal-map-grid" />
          {terminal.mapNodes.map((node) => <button
            key={node.sectorId}
            className={`terminal-map-node tone-${node.tone}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            title={`${node.name} — risque ${node.risk}%`}
            onClick={() => setTab('sectors')}
          >
            <span>{node.name.split(' ')[0]}</span>
            <b>{node.risk}</b>
          </button>)}
        </div>
        <div className="priority-sector-list">
          {terminal.prioritySectors.map((node) => <button key={node.sectorId} className={`priority-sector tone-${node.tone}`} onClick={() => setTab('sectors')}>
            <strong>{node.name}</strong>
            <span>{node.status} / risque {node.risk}%</span>
            <em>Λ {node.rebel}% · Xen {node.xen}% · surveillance {node.surveillance}%</em>
          </button>)}
        </div>
      </div>

      <div className="panel coan-alert-feed">
        <span className="brand-kicker">Flux d’alertes priorisées</span>
        <h2>Dossiers urgents</h2>
        {criticalAlerts.length === 0 && <p>Aucune urgence critique. Les alertes de surveillance restent actives.</p>}
        {(criticalAlerts.length ? criticalAlerts : terminal.alerts.slice(0, 5)).map((alert) => <article key={alert.id} className={`coan-alert severity-${alert.severity} tone-${alert.tone}`}>
          <div><span>{alert.source}</span><b>{alert.score}%</b></div>
          <h3>{alert.label}</h3>
          <p>{alert.body}</p>
          <button onClick={() => setTab(alert.targetTab)}>Ouvrir module</button>
        </article>)}
      </div>

      <div className="panel coan-transmissions">
        <span className="brand-kicker">Transmission stack</span>
        <h2>Canaux administratifs</h2>
        <div className="transmission-grid">
          {terminal.transmissions.map((channel) => <article key={channel.id} className={`transmission-card tone-${channel.tone}`}>
            <span>{channel.label}</span>
            <strong>{channel.status}</strong>
            <i style={{ width: `${channel.integrity}%` }} />
            <p>{channel.detail}</p>
          </article>)}
        </div>
      </div>

      <div className="panel coan-command-orders">
        <span className="brand-kicker">Ordres COAN recommandés</span>
        <h2>Priorité opérateur</h2>
        <div className="operation-list compact-orders">
          {terminal.commandOrders.map((order) => <button key={`${order.label}-${order.targetTab}`} className={`tone-${order.tone}`} onClick={() => setTab(order.targetTab)}>
            <strong>{order.label}</strong>
            <span>{order.detail}</span>
          </button>)}
        </div>
      </div>

      <div className="panel coan-dossiers wide">
        <span className="brand-kicker">Dossiers ouverts</span>
        <h2>Vue administrative multi-systèmes</h2>
        <div className="dossier-grid">
          {terminal.dossiers.map((dossier) => <button key={dossier.id} className={`dossier-card tone-${dossier.tone}`} onClick={() => setTab(dossier.targetTab)}>
            <span>{dossier.title}</span>
            <strong>{dossier.score}%</strong>
            <p>{dossier.subtitle}</p>
            <div>{dossier.metrics.map((metric) => <em key={metric.label}>{metric.label} <b>{metric.value}</b></em>)}</div>
          </button>)}
        </div>
      </div>

      <div className="panel coan-breencast">
        <span className="brand-kicker">BreenCast adaptatif</span>
        <h2>{dynamicBreencast.recommended.title}</h2>
        <blockquote>{dynamicBreencast.recommended.publicLine}</blockquote>
        <p className="lore-note"><b>Intention cachée :</b> {dynamicBreencast.recommended.hiddenIntent}</p>
        <div className="actions"><button onClick={() => globalAction('breencast')}>Diffuser ligne officielle</button><button onClick={() => setTab('propaganda')}>Ouvrir doctrine BreenCast</button></div>
      </div>

      <div className="panel coan-campaign-objectives">
        <span className="brand-kicker">Campagne / objectifs</span>
        <h2>{game.campaign.currentMandate}</h2>
        <p>{game.campaign.currentBriefing}</p>
        {activeObjectives.map((objective) => <div key={objective.id} className={`objective-strip status-${objective.status}`}>
          <span>{objective.kind.toUpperCase()}</span>
          <strong>{objective.title}</strong>
          <i style={{ width: `${objective.progress}%` }} />
          <em>{objective.detail}</em>
        </div>)}
        <button onClick={() => setTab('campaigns')}>Ouvrir campagnes</button>
      </div>

      <div className="panel coan-report-snapshot">
        <span className="brand-kicker">Dernier dossier COAN</span>
        <h2>{latestReport ? latestReport.title : 'Aucun rapport archivé'}</h2>
        {latestReport ? <>
          <div className="mini-grid">
            <span>Falsification <b>{latestReport.falsificationScore ?? 0}%</b></span>
            <span>Audit <b>{latestReport.auditRisk ?? 0}%</b></span>
            <span>Champs <b>{latestReport.falsifiedFields?.length ?? 0}</b></span>
            <span>Découvert <b>{latestReport.auditDiscovered ? 'Oui' : 'Non'}</b></span>
          </div>
          {(latestReport.auditLines ?? latestReport.lines).slice(0, 4).map((line) => <p key={line}>▸ {line}</p>)}
          <button onClick={() => setTab('reports')}>Ouvrir rapports falsifiés</button>
        </> : <p>Clôture une journée pour générer la première archive réelle/transmise.</p>}
      </div>

      <div className="panel coan-event-catalogue">
        <span className="brand-kicker">Catalogue événementiel</span>
        <h2>Directeur narratif actif</h2>
        <div className="event-summary terminal-event-summary">{Object.entries(eventSummary).map(([type, count]) => <span key={type}>{type} {count}</span>)}</div>
        <p className="lore-note">Les événements majeurs, catastrophes Xen, campagnes et objectifs s’ajoutent maintenant au flux COAN plutôt qu’à un simple hasard de crise.</p>
      </div>

      <div className="panel coan-timeline">
        <span className="brand-kicker">Timeline Half-Life</span>
        <h2>{timelinePreset.name}</h2>
        <p>{timelinePreset.subtitle}</p>
        <p className="lore-note">{timelinePreset.canonWindow}</p>
        <div className="event-tags">{timelinePreset.unlocks.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </div>
  </section>;
}

function TimelinePanel({ game, current, setTimeline }: { game: GameState; current: ReturnType<typeof getTimelinePreset>; setTimeline: (timeline: TimelineId) => void }) {
  const ordered = timelineOrder.map((id) => timelinePresets[id]);
  return <section className="panel-grid timeline-layout">
    <div className="panel timeline-command">
      <span className="brand-kicker">Half-Life chronology control</span>
      <h2>{current.name}</h2>
      <p>{current.subtitle}</p>
      <p className="lore-note">{current.briefing}</p>
      <div className="mini-grid">
        <span>Fenêtre canonique <b>{current.canonWindow}</b></span>
        <span>Rébellion x<b>{current.eventBias.rebellion}</b></span>
        <span>Xen x<b>{current.eventBias.xen}</b></span>
        <span>Citadelle x<b>{current.eventBias.citadel}</b></span>
      </div>
      <div className="advice">Changer de timeline réinitialise la partie courante avec le même numéro de City, le même scénario opérationnel et le même profil, mais applique une époque différente.</div>
    </div>

    <div className="panel timeline-list">
      <span className="brand-kicker">Sélection d’époque</span>
      <h2>Chronologie jouable</h2>
      <div className="operation-list">
        {ordered.map((preset) => <button key={preset.id} className={game.timeline === preset.id ? 'selected-operation' : ''} onClick={() => setTimeline(preset.id)}>
          <strong>{preset.name}</strong>
          <span>{preset.canonWindow}</span>
          <em>{preset.subtitle}</em>
        </button>)}
      </div>
    </div>

    <div className="panel timeline-effects">
      <span className="brand-kicker">Modificateurs de départ</span>
      <h2>Effets administratifs</h2>
      <div className="effect-cloud">
        {Object.entries(current.statEffects).map(([key, value]) => <span key={key} className={(value ?? 0) >= 0 ? 'positive' : 'negative'}>{key} {value && value > 0 ? '+' : ''}{value}</span>)}
      </div>
      <h3>Pression quotidienne</h3>
      <div className="effect-cloud">
        {Object.entries(current.dailyEffects).map(([key, value]) => <span key={key} className={(value ?? 0) >= 0 ? 'positive' : 'negative'}>{key} {value && value > 0 ? '+' : ''}{value}/jour</span>)}
      </div>
    </div>

    <div className="panel timeline-sectors">
      <span className="brand-kicker">Secteurs affectés</span>
      <h2>Empreinte sur City {game.city}</h2>
      <div className="broadcast-list">
        {current.sectorEffects.map((effect, index) => <article key={`${effect.sectorIds.join('-')}-${index}`} className="broadcast-card">
          <h3>{effect.sectorIds.map((id) => game.sectors.find((s) => s.id === id)?.name ?? id).join(' / ')}</h3>
          <p>Statut : {effect.status ?? 'inchangé'}</p>
          <div className="effect-cloud">
            {Object.entries(effect).filter(([key]) => key !== 'sectorIds' && key !== 'status').map(([key, value]) => <span key={key} className={(value as number) >= 0 ? 'positive' : 'negative'}>{key} {(value as number) > 0 ? '+' : ''}{String(value)}</span>)}
          </div>
        </article>)}
      </div>
    </div>

    <div className="panel timeline-unlocks">
      <span className="brand-kicker">Disponibilités lore</span>
      <h2>Ce que cette époque change</h2>
      {current.availabilityNotes.map((note) => <p key={note}>▸ {note}</p>)}
      <div className="event-tags">{current.unlocks.map((unlock) => <span key={unlock}>{unlock}</span>)}</div>
    </div>
  </section>;
}

function Sectors({ game, selectedSector, setSelectedSector, sector, sectorAction, deploy }: { game: GameState; selectedSector: string; setSelectedSector: (s: string) => void; sector: Sector; sectorAction: (a: 'curfew' | 'raid' | 'quarantine' | 'seal' | 'purge' | 'propaganda') => void; deploy: (u: Unit) => void }) {
  const links = getNetworkLinks(game.sectors);
  const connected = getConnectedSectors(game.sectors, sector.id);
  const pressure = getSectorPressure(game.sectors, sector.id);

  return <section className="panel-grid map-layout">
    <div className="panel map-panel">
      <div className="map-header">
        <div><span className="brand-kicker">City topology</span><h2>Carte stratégique connectée</h2></div>
        <p>Les lignes représentent les routes réelles : surface, canaux, égouts, Razor Train, accès Citadel et sas de quarantaine.</p>
      </div>
      <div className="city-network">
        <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {links.map((link) => {
            const from = game.sectors.find((item) => item.id === link.from);
            const to = game.sectors.find((item) => item.id === link.to);
            if (!from || !to) return null;
            const active = from.id === selectedSector || to.id === selectedSector;
            return <line key={`${link.from}-${link.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={`route route-${link.type} ${active ? 'active' : ''} route-${link.controlledBy.toLowerCase()}`} />;
          })}
        </svg>
        {game.sectors.map((s) => <button key={s.id} onClick={() => setSelectedSector(s.id)} style={{ left: `${s.x}%`, top: `${s.y}%` }} className={`sector-node ${statusClass(s.status)} ${selectedSector === s.id ? 'selected' : ''}`}><strong>{s.name}</strong><span>{s.status}</span><small>Λ {s.rebel}% / Xen {s.xen}%</small></button>)}
      </div>
      <div className="legend-grid"><span><i className="legend surface" /> Surface</span><span><i className="legend sewer" /> Égouts</span><span><i className="legend rail" /> Razor Train</span><span><i className="legend quarantine" /> Quarantaine/Xen</span><span><i className="legend citadel" /> Citadel</span></div>
    </div>
    <div className="panel sector-detail"><span className="brand-kicker">Dossier secteur connecté</span><h2>{sector.name}</h2><p>{sector.role}</p><p>{sector.notes}</p><div className="mini-grid"><span>Population <b>{sector.population}</b></span><span>Zone <b>{sector.zone}</b></span><span>Valeur stratégique <b>{sector.strategicValue}%</b></span><span>Goulot <b>{sector.chokePoint ? 'Oui' : 'Non'}</b></span><span>Surveillance <b>{sector.surveillance}%</b></span><span>Infrastructure <b>{sector.infrastructure}%</b></span><span>Loyauté <b>{sector.loyalty}%</b></span><span>Peur <b>{sector.fear}%</b></span></div><div className="pressure-grid"><span>Pression Lambda voisine <b>{pressure.rebelPressure}%</b></span><span>Pression Xen voisine <b>{pressure.xenPressure}%</b></span><span>Isolement hors contrôle Combine <b>{pressure.combineIsolation}%</b></span><span>Route la plus risquée <b>{pressure.highestRiskRoute}%</b></span></div><h3>Connexions opérationnelles</h3><div className="route-list">{connected.map(({ sector: target, connection }) => <button key={`${target.id}-${connection.label}`} onClick={() => setSelectedSector(target.id)}><strong>{target.name}</strong><span>{connection.label} — {connection.type} — contrôle {connection.controlledBy} — risque {connection.risk}%</span></button>)}</div><div className="lore-note">{pressure.notes.map((note) => <p key={note}>▸ {note}</p>)}</div><div className="actions"><button onClick={() => sectorAction('curfew')}>Couvre-feu</button><button onClick={() => sectorAction('raid')}>Raid CP</button><button onClick={() => sectorAction('quarantine')}>Quarantaine</button><button onClick={() => sectorAction('seal')}>Sceller</button><button onClick={() => sectorAction('purge')}>Purge</button><button onClick={() => sectorAction('propaganda')}>Breencast local</button></div><h3>Déploiement rapide</h3><div className="actions">{game.units.filter((u) => u.reserve > 0).slice(0, 8).map((u) => <button key={u.id} onClick={() => deploy(u)}>{u.name} ({u.reserve})</button>)}</div></div>
  </section>;
}

function Combine({ units, sector, deploy }: { units: Unit[]; sector: Sector; deploy: (u: Unit) => void }) {
  return <section className="cards">{units.map((u) => <article className="panel card" key={u.id}><span className="brand-kicker">{u.category}</span><h2>{u.name}</h2><p>{u.description}</p><p><b>Force :</b> {u.strength}</p><p><b>Limite :</b> {u.weakness}</p><p className="lore-note">{u.lore}</p><button disabled={u.reserve <= 0} onClick={() => deploy(u)}>Déployer vers {sector.name} — Réserve {u.reserve}</button></article>)}</section>;
}

function Resistance({ sectors }: { sectors: Sector[] }) {
  const hot = [...sectors].sort((a, b) => b.rebel - a.rebel).slice(0, 6);
  return <section className="panel-grid two"><div className="panel"><h2>Réseaux Lambda probables</h2><p>La Résistance doit rester clandestine au départ : radios pirates, canaux, caches, Vortigaunts, récupération d’armes et extraction de civils.</p>{hot.map((s) => <div className="row" key={s.id}><span>{s.name}</span><b>Λ {s.rebel}%</b></div>)}</div><div className="panel"><h2>Cellules connues</h2>{['Cellule Lambda-3', 'Réseau Canal Nord', 'Station Six', 'Les Voix du Tunnel', 'Groupe Vortigaunt Libre', 'Les Cendres de Nova Prospekt'].map((c) => <p key={c}>• {c}</p>)}</div></section>;
}

function XenPanel({ xenCodex, sectors }: { xenCodex: XenEntity[]; sectors: Sector[] }) {
  return <section className="panel-grid two"><div className="panel"><h2>Secteurs biologiquement compromis</h2>{[...sectors].sort((a, b) => b.xen - a.xen).slice(0, 6).map((s) => <div className="row" key={s.id}><span>{s.name}</span><b>Xen {s.xen}%</b></div>)}</div><div className="cards nested">{xenCodex.map((x) => <article className="panel card" key={x.name}><h2>{x.name}</h2><p>{x.ecology}</p><p><b>Biotope :</b> {x.preferred}</p><p><b>Confinement :</b> {x.containment}</p><div className="dangerline"><i style={{ width: `${x.danger}%` }} /></div></article>)}</div></section>;
}


function NovaProspektPanel({ nova, operations, applyOperation, changePolicy }: { nova: NovaProspektState; operations: NovaOperation[]; applyOperation: (operation: NovaOperation) => void; changePolicy: (policyId: string) => void }) {
  const atmosphere = getNovaAtmosphere(nova);
  const selectedPolicy = nova.policies.find((policy) => policy.id === nova.activePolicy) ?? nova.policies[0];
  const intakeRatio = Math.round((nova.zones.reduce((acc, zone) => acc + zone.detainees, 0) / Math.max(1, nova.zones.reduce((acc, zone) => acc + zone.capacity, 0))) * 100);

  return <section className="nova-layout">
    <div className="nova-hero panel">
      <div>
        <span className="brand-kicker">REMOTE FACILITY UPLINK</span>
        <h2>NOVA PROSPEKT</h2>
        <p>{atmosphere}</p>
      </div>
      <div className="nova-stamp">DETENTION / BIOTICS / TRANSHUMAN ARM</div>
    </div>

    <div className="nova-stats">
      <Stat label="Autorité NP" value={nova.authority} />
      <Stat label="Sécurité" value={nova.security} />
      <Stat label="Secret" value={nova.secrecy} />
      <Stat label="Renseignement" value={nova.intelligence} />
      <Stat label="Instabilité" value={nova.instability} dangerHigh />
      <Stat label="Humanité" value={nova.humaneIndex} />
      <Stat label="Risque Xen" value={nova.xenBreachRisk} dangerHigh xen />
      <div className="stat"><span>Transferts</span><b>{nova.totalTransferred}</b></div>
      <div className="stat"><span>Évasions</span><b>{nova.escaped}</b></div>
      <div className="stat"><span>Candidats OW</span><b>{nova.convertedCandidates}</b></div>
    </div>

    <div className="panel-grid nova-grid">
      <div className="panel nova-console">
        <span className="brand-kicker">Policy director</span>
        <h2>Doctrine du complexe</h2>
        <p>Nova Prospekt fonctionne comme un lieu séparé de City : ce que tu y fais améliore le renseignement, la peur et le contrôle, mais peut créer martyrs, évasions, rupture Xen ou audit Advisor.</p>
        <label>Politique active</label>
        <select value={nova.activePolicy} onChange={(event) => changePolicy(event.target.value)}>
          {nova.policies.map((policy) => <option key={policy.id} value={policy.id}>{policy.name}</option>)}
        </select>
        <div className="advice"><strong>{selectedPolicy.name}</strong><br />{selectedPolicy.description}</div>
        <div className="mini-grid">
          <span>Occupation globale <b>{intakeRatio}%</b></span>
          <span>Transferts aujourd’hui <b>{nova.transferredToday}</b></span>
          <span>Pression Biotics <b>{nova.bioticsPressure}%</b></span>
          <span>Mode interface <b>Complexe externe</b></span>
        </div>
      </div>

      <div className="panel nova-map">
        <span className="brand-kicker">Facility topology</span>
        <h2>Plan opérationnel Nova Prospekt</h2>
        <div className="facility-grid">
          {nova.zones.map((zone) => <article key={zone.id} className={`facility-zone ${zone.instability > 60 ? 'unstable' : ''} ${zone.secrecy > 90 ? 'classified' : ''}`}>
            <h3>{zone.name}</h3>
            <p>{zone.function}</p>
            <div className="mini-grid">
              <span>Sécurité <b>{zone.security}%</b></span>
              <span>Instabilité <b>{zone.instability}%</b></span>
              <span>Secret <b>{zone.secrecy}%</b></span>
              <span>Détenus <b>{zone.detainees}/{zone.capacity || '—'}</b></span>
            </div>
            <p className="lore-note">{zone.notes}</p>
          </article>)}
        </div>
      </div>

      <div className="panel nova-ops">
        <span className="brand-kicker">Operations queue</span>
        <h2>Actions Nova Prospekt</h2>
        <div className="operation-list">
          {operations.map((operation) => {
            const zone = nova.zones.find((item) => item.id === operation.zoneId);
            return <button key={operation.id} onClick={() => applyOperation(operation)}>
              <strong>{operation.name}</strong>
              <span>{zone?.name ?? 'Zone inconnue'} — risque {operation.risk}% — durée {operation.duration}j</span>
              <em>{operation.description}</em>
            </button>;
          })}
        </div>
      </div>

      <div className="panel nova-detainees">
        <span className="brand-kicker">Detainee registry</span>
        <h2>Dossiers sensibles</h2>
        <div className="detainee-list">
          {nova.detainees.map((detainee) => <article key={detainee.id} className="detainee-card">
            <h3>{detainee.name}</h3>
            <span>{detainee.category}</span>
            <p>{detainee.notes}</p>
            <div className="mini-grid">
              <span>Valeur <b>{detainee.value}%</b></span>
              <span>Risque <b>{detainee.risk}%</b></span>
              <span>Condition <b>{detainee.condition}%</b></span>
            </div>
          </article>)}
        </div>
      </div>

      <div className="panel feed nova-log">
        <span className="brand-kicker">Nova archive</span>
        <h2>Journal du complexe</h2>
        {nova.log.map((line, index) => <p key={`${line}-${index}`}>▸ {line}</p>)}
      </div>
    </div>
  </section>;
}

function Propaganda({ dynamicBreencast, strategies, globalAction, applyStrategy }: { dynamicBreencast: ReturnType<typeof buildDynamicBreencast>; strategies: typeof breencastStrategies; globalAction: (a: 'breencast' | 'ration_plus' | 'ration_cut' | 'advisor' | 'shadow_help') => void; applyStrategy: (strategyId: string) => void }) {
  return <section className="panel-grid propaganda-layout">
    <div className="panel breencast-main">
      <span className="brand-kicker">BreenCast synthesis node</span>
      <h2>{dynamicBreencast.recommended.title}</h2>
      <blockquote>{dynamicBreencast.recommended.publicLine}</blockquote>
      <p className="lore-note"><b>Intention cachée :</b> {dynamicBreencast.recommended.hiddenIntent}</p>
      <div className="mini-grid">
        <span>Crise dominante <b>{dynamicBreencast.dominantCrisis}</b></span>
        <span>Gravité rhétorique <b>{dynamicBreencast.recommended.severity}%</b></span>
        <span>Impact info <b>{dynamicBreencast.recommended.effects.info ?? 0}</b></span>
        <span>Risque social <b>{Math.max(0, (dynamicBreencast.recommended.effects.rebel ?? 0) + (dynamicBreencast.recommended.effects.fatigue ?? 0))}</b></span>
      </div>
      <div className="actions"><button onClick={() => globalAction('breencast')}>Diffuser ce BreenCast</button><button onClick={() => globalAction('ration_cut')}>Associer au rationnement</button><button onClick={() => globalAction('advisor')}>Valider par Citadelle</button></div>
    </div>

    <div className="panel feed breencast-diagnosis">
      <span className="brand-kicker">Diagnostic COAN</span>
      <h2>Pourquoi ce message</h2>
      {dynamicBreencast.diagnosis.map((line) => <p key={line}>▸ {line}</p>)}
    </div>

    <div className="panel breencast-queue">
      <span className="brand-kicker">Messages alternatifs</span>
      <h2>File de diffusion adaptative</h2>
      <div className="broadcast-list">
        {dynamicBreencast.queue.map((message) => <article key={message.id} className="broadcast-card">
          <h3>{message.title}</h3>
          <blockquote>{message.publicLine}</blockquote>
          <p>{message.hiddenIntent}</p>
          <div className="event-tags">{message.loreTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </article>)}
      </div>
    </div>

    <div className="panel doctrine-panel">
      <span className="brand-kicker">Doctrine de propagande</span>
      <h2>Campagnes actives</h2>
      <div className="operation-list">
        {strategies.map((strategy) => <button key={strategy.id} onClick={() => applyStrategy(strategy.id)}>
          <strong>{strategy.name}</strong>
          <span>Risque backlash {strategy.risk}% — tags {strategy.bestAgainst.join(', ')}</span>
          <em>{strategy.description}</em>
        </button>)}
      </div>
    </div>
  </section>;
}

function Reports({ reports, log, policy, setPolicy }: { reports: Report[]; log: string[]; policy: ReportPolicy; setPolicy: (policy: ReportPolicy) => void }) {
  const latest = reports[0];
  const policies = Object.keys(reportPolicyLabels) as ReportPolicy[];
  return <section className="panel-grid reports-layout">
    <div className="panel report-control">
      <span className="brand-kicker">Citadel transmission control</span>
      <h2>Rapports falsifiables</h2>
      <p>Chaque clôture de journée produit maintenant deux dossiers : le rapport réel COAN et la transmission envoyée à la Citadelle. Plus tu nettoies les chiffres, plus le risque d’audit Advisor augmente.</p>
      <label>Politique de transmission active</label>
      <select value={policy} onChange={(event) => setPolicy(event.target.value as ReportPolicy)}>
        {policies.map((item) => <option key={item} value={item}>{reportPolicyLabels[item]}</option>)}
      </select>
      <div className="advice">{reportPolicyDescriptions[policy]}</div>
      {latest && <div className="report-risk"><span>Dernier score falsification <b>{latest.falsificationScore ?? 0}%</b></span><span>Dernier risque audit <b>{latest.auditRisk ?? 0}%</b></span><span>Audit <b>{latest.auditDiscovered ? 'falsification détectée' : latest.auditTriggered ? 'contrôle superficiel' : 'aucun'}</b></span></div>}
    </div>

    <div className="panel feed report-compare">
      <h2>Rapports journaliers</h2>
      {reports.length === 0 ? <p>Aucun rapport archivé. Clôture une journée.</p> : reports.map((r) => <article key={`${r.day}-${r.title}`} className={`report ${r.auditDiscovered ? 'audit-discovered' : ''}`}>
        <h3>{r.title}</h3>
        <div className="dual-report">
          <div>
            <span className="brand-kicker">Dossier réel COAN</span>
            {r.lines.map((l) => <p key={`real-${l}`}>• {l}</p>)}
          </div>
          <div>
            <span className="brand-kicker">Transmission Citadel</span>
            {(r.transmittedLines ?? ['Ancienne archive sans transmission séparée.']).map((l) => <p key={`sent-${l}`}>• {l}</p>)}
          </div>
        </div>
        {r.falsifiedFields && r.falsifiedFields.length > 0 && <p className="falsified-fields">Champs altérés : {r.falsifiedFields.join(', ')}</p>}
        {r.auditLines && <div className="audit-lines">{r.auditLines.map((line) => <p key={line}>▸ {line}</p>)}</div>}
      </article>)}
    </div>

    <div className="panel feed"><h2>Journal COAN</h2>{log.map((l, i) => <p key={`${l}-${i}`}>▸ {l}</p>)}</div>
  </section>;
}


function AtmosphereScreen({ profile, audioDirector, settings, updateSettings }: { profile: ReturnType<typeof getAtmosphereProfile>; audioDirector: SyntheticAudioDirectorSnapshot; settings: AtmosphereSettings; updateSettings: (patch: Partial<AtmosphereSettings>) => void }) {
  const toggles: Array<[keyof AtmosphereSettings, string, string]> = [
    ['enabled', 'Couche visuelle active', 'Active/désactive l’habillage sensoriel global.'],
    ['audioEnabled', 'Audio synthétique actif', 'Active les sons générés localement par Web Audio après interaction utilisateur.'],
    ['advancedAudioEnabled', 'Moteur audio avancé', 'Utilise les cues multicouches, bruit filtré, basses et ambiance contextuelle.'],
    ['ambientDrone', 'Drone ambiant court', 'Ajoute une couche discrète selon l’ambiance dominante : Xen, Advisor, Nova ou Lambda.'],
    ['eventCues', 'Cues événementiels', 'Autorise les sons de crise au changement de jour, événement, terminal ou statut.'],
    ['uiCues', 'Cues UI / navigation', 'Autorise les bips courts de terminal lors des changements de contexte.'],
    ['bassResponse', 'Réponse basse Citadel', 'Renforce les graves pour Advisor, Strider, Citadel et verrouillage.'],
    ['distortion', 'Saturation contrôlée', 'Ajoute une distorsion légère aux alarmes et vecteurs de crise.'],
    ['scanlines', 'Scanlines terminal', 'Lignes de balayage façon terminal de surveillance.'],
    ['glitch', 'Glitch selon crise', 'Augmente les perturbations quand Xen, Lambda ou Citadel deviennent critiques.'],
    ['chromatic', 'Aberration chromatique', 'Accentue l’instabilité visuelle sans copier d’assets officiels.'],
    ['ambientPulse', 'Pulsation ambiante', 'Respiration lumineuse Citadel/Xen/Nova selon le mode.'],
    ['reducedMotion', 'Réduire les animations', 'Garde l’ambiance mais coupe les mouvements longs.'],
  ];
  const activeCue = syntheticAudioCues[audioDirector.activeCue];
  const ambientCue = syntheticAudioCues[audioDirector.ambientCue];
  const recommended = audioDirector.recommendedCues.map((id) => syntheticAudioCues[id]);
  return <section className="panel-grid atmosphere-layout audio-layout">
    <div className="panel atmosphere-console audio-director-console">
      <span className="brand-kicker">SYNTHETIC AUDIO / VISUAL DIRECTOR</span>
      <h2>{profile.label}</h2>
      <p>{profile.reason}</p>
      <div className="mini-grid">
        <span>Mode <b>{profile.mode}</b></span>
        <span>Mix <b>{audioDirector.mixLabel}</b></span>
        <span>Alerte <b>{profile.alertLevel}/5</b></span>
        <span>Intensité visuelle <b>{profile.intensity}%</b></span>
        <span>Danger audio <b>{audioDirector.danger}%</b></span>
        <span>Cue actif <b>{activeCue.label}</b></span>
      </div>
      <div className="alert-meter"><i style={{ width: `${Math.max(profile.intensity, audioDirector.intensity)}%` }} /></div>
      <div className="ticker-preview atmospheric">{profile.ticker.map((item) => <span key={item}>{item}</span>)}</div>
      <div className="coan-lines">{audioDirector.routeLines.map((line) => <p key={line}>▸ {line}</p>)}</div>
    </div>

    <div className="panel atmosphere-switches audio-switches">
      <span className="brand-kicker">Paramètres</span>
      <h2>Contrôle de l’immersion</h2>
      <div className="settings-list">
        {toggles.map(([key, label, description]) => <label key={key} className="toggle-row">
          <input type="checkbox" checked={Boolean(settings[key])} onChange={(event) => updateSettings({ [key]: event.target.checked } as Partial<AtmosphereSettings>)} />
          <span><strong>{label}</strong><em>{description}</em></span>
        </label>)}
      </div>
      <label>Volume maître synthétique : {settings.masterVolume}%</label>
      <input type="range" min="0" max="100" value={settings.masterVolume} onChange={(event) => updateSettings({ masterVolume: Number(event.target.value) })} />
      <label>Cooldown cue : {settings.cueCooldownMs} ms</label>
      <input type="range" min="150" max="2200" step="50" value={settings.cueCooldownMs} onChange={(event) => updateSettings({ cueCooldownMs: Number(event.target.value) })} />
      <label>Complexité audio</label>
      <select value={settings.audioComplexity} onChange={(event) => updateSettings({ audioComplexity: event.target.value as AtmosphereSettings['audioComplexity'] })}>
        <option value="minimal">Minimal — signaux courts</option>
        <option value="standard">Standard — couches principales</option>
        <option value="dense">Dense — couches complètes</option>
      </select>
      <button type="button" onClick={() => playSyntheticAudioCue(audioDirector.activeCue, { ...settings, audioEnabled: true, eventCues: true }, audioDirector)}>Tester cue actif</button>
      <p className="lore-note">L’audio est généré localement par oscillateurs, bruit filtré et enveloppes Web Audio. Aucun fichier sonore propriétaire Half-Life n’est inclus.</p>
    </div>

    <div className="panel audio-cue-current">
      <span className="brand-kicker">Cue actif</span>
      <h2>{activeCue.label}</h2>
      <p>{activeCue.description}</p>
      <div className="mini-grid">
        <span>Tag <b>{activeCue.terminalTag}</b></span>
        <span>Catégorie <b>{activeCue.category}</b></span>
        <span>Priorité <b>{activeCue.priority}/5</b></span>
        <span>Segments <b>{activeCue.segments.length}</b></span>
      </div>
      <p className="lore-note">Déclencheur : {activeCue.trigger}</p>
      <button type="button" onClick={() => playSyntheticAudioCue(activeCue.id, { ...settings, audioEnabled: true, eventCues: true }, audioDirector)}>Pré-écouter {activeCue.label}</button>
    </div>

    <div className="panel audio-cue-current ambient">
      <span className="brand-kicker">Drone ambiant recommandé</span>
      <h2>{ambientCue.label}</h2>
      <p>{ambientCue.description}</p>
      <div className="alert-meter"><i style={{ width: `${audioDirector.intensity}%` }} /></div>
      <p className="lore-note">Utilisé comme couche courte si “Drone ambiant court” est actif.</p>
      <button type="button" onClick={() => playSyntheticAudioCue(ambientCue.id, { ...settings, audioEnabled: true, eventCues: true }, audioDirector)}>Pré-écouter ambiance</button>
    </div>

    <div className="panel atmosphere-rules audio-library">
      <span className="brand-kicker">Bibliothèque synthétique</span>
      <h2>Cues avancés</h2>
      <div className="broadcast-list audio-cue-list">
        {syntheticAudioCueOrder.map((id) => {
          const cue = syntheticAudioCues[id];
          const isRecommended = recommended.some((item) => item.id === id);
          return <article key={cue.id} className={`broadcast-card audio-cue-card ${cue.id === activeCue.id ? 'active' : ''} ${isRecommended ? 'recommended' : ''}`}>
            <span className="brand-kicker" style={{ color: cue.color }}>{cue.terminalTag}</span>
            <h3>{cue.label}</h3>
            <p>{cue.description}</p>
            <small>{cue.trigger}</small>
            <button type="button" onClick={() => playSyntheticAudioCue(cue.id, { ...settings, audioEnabled: true, eventCues: true }, audioDirector)}>Test</button>
          </article>;
        })}
      </div>
    </div>

    <div className="panel atmosphere-rules">
      <span className="brand-kicker">Règles de bascule</span>
      <h2>Quand l’interface change</h2>
      <div className="broadcast-list">
        <article className="broadcast-card"><h3>Scanner synthétique</h3><p>CP, registre, informateurs ou contrôle urbain : balayage court, froid et administratif.</p></article>
        <article className="broadcast-card"><h3>Uprising / couvre-feu</h3><p>Rébellion dominante : sirène orange, tension de bloc, risque de raids et manhacks.</p></article>
        <article className="broadcast-card"><h3>Vecteur Xen</h3><p>Contamination ou mutation : drone vert/violet, bruit organique filtré, basse instable.</p></article>
        <article className="broadcast-card"><h3>Nova Prospekt</h3><p>Transferts Razor, intake détenus, Biotics et dossiers noirs : séquences cliniques.</p></article>
        <article className="broadcast-card"><h3>Pression Advisor</h3><p>Suspicion, audit ou rapport falsifié : basse froide et sensation de jugement.</p></article>
        <article className="broadcast-card"><h3>Effondrement</h3><p>City Failure Protocol : alarme Citadel, bruit filtré et verrouillage final.</p></article>
      </div>
    </div>
  </section>;
}

function Codex() {
  return <section className="panel-grid two"><div className="panel"><h2>Règles lore verrouillées</h2>{['Les Combine sont une occupation multidimensionnelle, pas une armée humaine classique.', 'Civil Protection = collaborateurs humains, utiles mais corruptibles.', 'Overwatch = force militarisée/transhumaine, politiquement lourde.', 'Xen = biosphère parasite et écologique, pas faction militaire.', 'Headcrab shells et quarantaines doivent avoir coût moral massif.', 'La Résistance commence clandestine puis devient insurrection si trop réprimée.', 'La Citadelle et les Advisors doivent peser comme autorité distante et écrasante.'].map((r) => <p key={r}>• {r}</p>)}</div><div className="panel"><h2>À éviter</h2>{['Pas de factions inventées hors ton Half-Life.', 'Pas de victoire propre sans coût humain.', 'Pas de zombies génériques : toujours expliquer le parasitisme Xen.', 'Pas de magie ou technologie fantasy.', 'Pas de morale héroïque automatique : le joueur est un rouage administratif sous pression.'].map((r) => <p key={r}>• {r}</p>)}</div></section>;
}

export default App;
