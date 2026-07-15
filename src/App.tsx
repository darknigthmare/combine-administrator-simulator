import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Archive, ChevronDown, Database, Gauge, Home, LayoutDashboard, LockKeyhole, Map as MapIcon, Menu, Radio, Save, Settings, Shield, Target, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './index.css';
import type { AdministratorAvatarId } from './types/game';
import { defaultAdministratorAvatar, getCrisisVisual, getDossierVisual, getUnitVisual } from './data/visualAssets';

import type { AtmosphereSettings, SyntheticAudioDirectorSnapshot, CampaignId, DifficultyPresetId, DifficultyScalarKey, DifficultyScalars, OnboardingChapterId, OnboardingTrackId, NewGameIntakeDoctrineId, CitizenAction, CitadelDirectiveNode, CombineTechnologyNode, Crisis, EventChoice, GameState, NovaOperation, NovaProspektState, ProfileId, InformantDoctrineId, InformantOperation, CivilProtectionDoctrineId, CivilProtectionOperation, RationOperation, RationPolicyId, ResistanceOperation, ResistanceNetworkState, ResistanceFactionDoctrineId, ResistanceFactionOperation, VortigauntDoctrineId, VortigauntOperation, XenEcosystemOperation, XenEcosystemPolicyId, XenMutationOperation, XenMutationPolicyId, QuarantineOperation, QuarantinePolicyId, XenResearchOperation, XenResearchPolicyId, XenCatastropheOperation, XenCatastrophePolicyId, MajorStoryOperation, MajorStoryPolicyId, VideoArchiveOperation, VideoArchivePolicyId, DecisionHistoryFilterId, Report, ReportPolicy, ScenarioId, TimelineId, Sector, SectorStatus, Stats, TabId, UiuxUnlockId, Unit } from './types/game';
import { baseSectors, baseStats, breencastStrategies, citizenActions, difficultyPresets, directives, endings, civilProtectionOperations, informantOperations, novaOperations, profileEffects, rationOperations, resistanceOperations, resistanceFactionOperations, vortigauntOperations, xenEcosystemOperations, xenMutationOperations, quarantineOperations, xenResearchOperations, xenCatastropheOperations, majorStoryOperations, videoArchiveOperations, syntheticAudioCues, syntheticAudioCueOrder, scenarioEffects, timelineOrder, timelinePresets, unitTemplates, newGameIntakeDoctrines } from './data';
import { AUTOSAVE_STORAGE_KEY } from './data/saveSlots';
import { getConnectedSectors, getNetworkLinks, getSectorPressure } from './systems/sectorNetwork';
import { simulateConnectedPropagation } from './systems/propagationSimulation';
import { getEventCatalogueSummary, pickDirectedCrisis } from './systems/eventDirector';
import { buildTransmittedReport, reportPolicyDescriptions, reportPolicyLabels, resolveAdvisorAudit } from './systems/reportFalsification';
import { createInitialNovaProspektState, getNovaAtmosphere, processNovaProspektDay, resolveNovaOperation, setNovaPolicy } from './systems/novaProspektSystem';
import { buildDynamicBreencast, resolveBreencastStrategy } from './systems/dynamicBreencast';
import { applyTimelineDailyPressure, applyTimelineToSectors, applyTimelineToStats, applyTimelineToUnits, filterSectorUnitsForTimeline, filterUnitsForTimeline, getPropagandaNetworkLabel, getTechnologyTimelineConflict, getTimelinePreset, getTimelineReportLines, getUnitTimelineAvailabilityReason, isUnitAvailableInTimeline } from './systems/timelineSystem';
import { AtmosphereLayer } from './components/AtmosphereLayer';
import { FloatingWindowLayer } from './components/FloatingWindowLayer';
import { SaveManagerScreen } from './components/SaveManagerScreen';
import { DecisionHistoryScreen } from './components/DecisionHistoryScreen';
import { LoreCodexScreen } from './components/LoreCodexScreen';
import { DifficultySettingsScreen } from './components/DifficultySettingsScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { NewGameIntakeScreen } from './components/NewGameIntakeScreen';
import { CampaignPrologueScreen } from './components/CampaignPrologueScreen';
import { UiuxV2CommandDeck } from './components/UiuxV2CommandDeck';
import { UiuxProgressionPanel } from './components/UiuxProgressionPanel';
import { MainMenuScreen } from './components/MainMenuScreen';
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
import { applyCampaignToSectors, applyCampaignToStats, createInitialCampaignState, getCampaignPreset, getNextCampaignDay, migrateCampaignState, simulateCampaignDay } from './systems/campaignSystem';
import { createInitialCampaignMissionState, migrateCampaignMissionState, simulateCampaignMissionDay } from './systems/campaignObjectiveSystem';
import { createInitialMajorStoryEventState, migrateMajorStoryEventState, resolveMajorStoryOperation, setMajorStoryPolicy, simulateMajorStoryEventDay } from './systems/majorStoryEventSystem';
import { buildFinalVerdict } from './systems/finalVerdictSystem';
import { buildFinalChronicle } from './systems/finalChronicleSystem';
import { terminalInterfaceOrder, terminalInterfaces } from './data/terminalInterfaces';
import { buildTerminalInterfaceStatus, getTerminalInterfaceForTab, getTerminalNavTabs, getTerminalSwitchTarget } from './systems/terminalInterfaceSystem';
import { buildSyntheticAudioDirector, playSyntheticAudioCue } from './systems/syntheticAudioSystem';
import { createInitialVideoArchiveState, migrateVideoArchiveState, resolveVideoArchiveOperation, setVideoArchivePolicy, simulateVideoArchiveDay } from './systems/videoArchiveSystem';
import { createInitialDecisionHistoryState, migrateDecisionHistoryState, reconcileDecisionHistory, setDecisionHistoryFilter } from './systems/decisionHistorySystem';
import { applyDifficultySectorEffects, applyDifficultyStartingEffects, createInitialDifficultySettings, migrateDifficultySettings, resetCustomDifficulty, setDifficultyPreset, simulateDifficultyDay, updateDifficultyScalar } from './systems/difficultySettingsSystem';
import { completeOnboardingChapter as completeOnboardingChapterState, createInitialOnboardingState, migrateOnboardingState, recordOnboardingAction, recordOnboardingTabVisit, resolveOnboardingFirstDay, selectOnboardingTrack } from './systems/onboardingSystem';
import { doctrineToConfig } from './systems/newGameIntakeSystem';
import { buildUxPolishReport } from './systems/uxPolishSystem';
import { createInitialUiuxProgressionState, formatUiuxPhase, isUiuxCapabilityActive, isUiuxTabUnlocked, isUiuxUnitUnlocked, migrateUiuxProgressionState, purchaseUiuxUnlock, setUiuxUnlockActive, simulateUiuxProgressionDay } from './systems/uiuxProgressionSystem';
import { createDailyOrderState, dailyOrderRefusal, migrateDailyOrderState, resetDailyOrders, spendDailyOrder } from './systems/dailyOrderSystem';

const ArchivesScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).ArchivesScreen }));
const CampaignScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).CampaignScreen }));
const MajorStoryEventsScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).MajorStoryEventsScreen }));
const FinalVerdictScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).FinalVerdictScreen }));
const FinalChronicleScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).FinalChronicleScreen }));
const CitadelDirectivesScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).CitadelDirectivesScreen }));
const CitizenRegistryScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).CitizenRegistryScreen }));
const CivilProtectionScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).CivilProtectionScreen }));
const CombineTechnologyScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).CombineTechnologyScreen }));
const InformantNetworkScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).InformantNetworkScreen }));
const OverwatchCommandScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).OverwatchCommandScreen }));
const PopulationScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).PopulationScreen }));
const RationingScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).RationingScreen }));
const ResistanceOperationsScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).ResistanceOperationsScreen }));
const VortigauntBioticsScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).VortigauntBioticsScreen }));
const XenQuarantineScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).XenQuarantineScreen }));
const XenCatastropheScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).XenCatastropheScreen }));
const XenResearchScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).XenResearchScreen }));
const VideoArchivesScreen = lazy(async () => ({ default: (await import('./components/DedicatedScreens')).VideoArchivesScreen }));

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

function capDailySimulationDrift(previous: Stats, next: Stats, day: number, pressureScalar: number): { stats: Stats; capped: string[] } {
  const phaseCap = day <= 7 ? 7 : day <= 20 ? 10 : 13;
  const capUp = Math.max(5, Math.round(phaseCap * Math.max(0.8, Math.min(1.4, pressureScalar))));
  const capDown = capUp + 3;
  const capped: string[] = [];
  const result = { ...next };
  const threats: Array<keyof Pick<Stats, 'rebel' | 'xen' | 'suspicion' | 'fatigue' | 'fear'>> = ['rebel', 'xen', 'suspicion', 'fatigue', 'fear'];
  const supports: Array<keyof Pick<Stats, 'stability' | 'loyalty' | 'production' | 'citadel' | 'info' | 'combine'>> = ['stability', 'loyalty', 'production', 'citadel', 'info', 'combine'];

  for (const key of threats) {
    const limited = Math.max(previous[key] - capDown, Math.min(previous[key] + capUp, next[key]));
    if (limited !== next[key]) capped.push(key);
    result[key] = limited;
  }
  for (const key of supports) {
    const limited = Math.max(previous[key] - capUp, Math.min(previous[key] + capDown, next[key]));
    if (limited !== next[key]) capped.push(key);
    result[key] = limited;
  }
  return { stats: result, capped };
}

function pick<T>(arr: T[], day: number, offset = 0): T {
  return arr[Math.abs((day * 9301 + 49297 + offset) % arr.length)];
}

type DayTransitionSummary = {
  day: number;
  stability: number;
  rebel: number;
  xen?: number;
  audit: number;
  directive: string;
  crisisTitle?: string;
};

type CrisisActionFeedback = {
  title: string;
  effects: string[];
  sectorStatus?: string;
};

const crisisEffectLabels: Record<string, string> = {
  stability: 'Stabilité',
  loyalty: 'Loyauté',
  fear: 'Peur',
  rebel: 'Pression Lambda',
  xen: 'Pression Xen',
  combine: 'Contrôle Combine',
  production: 'Production',
  rations: 'Rations',
  citadel: 'Approbation Citadel',
  info: 'Renseignement',
  fatigue: 'Fatigue',
  civilianLosses: 'Pertes civiles',
  combineLosses: 'Pertes Combine',
  suspicion: 'Suspicion',
  sectorRebel: 'Lambda secteur',
  sectorXen: 'Xen secteur',
  sectorFear: 'Peur secteur',
  sectorLoyalty: 'Loyauté secteur',
  sectorInfrastructure: 'Infrastructure secteur',
};

function describeCrisisEffects(effects: EventChoice['effects']): string[] {
  return Object.entries(effects).flatMap(([key, value]) => {
    if (typeof value !== 'number' || value === 0) return [];
    return [`${crisisEffectLabels[key] ?? key} ${value > 0 ? '+' : ''}${value}`];
  });
}

function createInitialGame(city: string, scenario: ScenarioId, timeline: TimelineId, profile: ProfileId, campaignId: CampaignId = 'custom_city_administration', difficultyPresetId: DifficultyPresetId = 'standard_occupation', customDifficultyScalars?: DifficultyScalars): GameState {
  const difficultySettings = createInitialDifficultySettings(difficultyPresetId, customDifficultyScalars);
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
    administratorAvatar: defaultAdministratorAvatar(profile),
    campaign,
    uiuxProgression: createInitialUiuxProgressionState({ scenario, timeline }),
    dailyOrders: createDailyOrderState(1, difficultyPresetId),
    crisisHistory: [],
    difficultySettings,
    onboarding: createInitialOnboardingState({ scenario, timeline, profile, campaignId, difficultyPresetId }),
    campaignMission: createInitialCampaignMissionState({ campaignId, stats, sectors, game: { day: 1, campaign, stats, sectors, novaProspekt, population, citizenRegistry, informantNetwork, vortigaunts, xenEcosystem, xenMutation, quarantineZones, xenResearch, xenCatastrophes, majorStoryEvents } as Partial<GameState> }),
    tab: 'command_deck_v2',
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


const hiddenRuntimeTabs: TabId[] = ['dashboard', 'gameplay_balance', 'tauri_packaging', 'system_audit', 'ux_polish'];

function normalizeSavedTab(tab: TabId | undefined, progression: GameState['uiuxProgression'], ending: string | null | undefined): TabId {
  if (!tab || hiddenRuntimeTabs.includes(tab) || ['main_menu', 'new_game', 'prologue'].includes(tab)) return ending ? 'chronicle' : 'command_deck_v2';
  return isUiuxTabUnlocked(progression, tab) ? tab : 'progression';
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
    administratorAvatar: merged.administratorAvatar ?? defaultAdministratorAvatar(profile),
    tab: normalizeSavedTab(merged.tab, uiuxProgression, merged.ending),
    sectors: filterSectorUnitsForTimeline(merged.sectors.map((sector) => sector.id === 'periphery' ? { ...sector, name: 'Périphérie extérieure' } : sector), timeline),
    units: filterUnitsForTimeline(merged.units, timeline),
    uiuxProgression,
    dailyOrders: migrateDailyOrderState(merged),
    crisisHistory: merged.crisisHistory ?? [],
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

const sidebarPrimaryTabs: TabId[] = ['command_deck_v2', 'progression', 'sectors', 'reports', 'save_system'];

const sidebarNavGroups: Array<{ id: string; label: string; icon: LucideIcon; tabs: TabId[] }> = [
  { id: 'campaign', label: 'Campagne', icon: Target, tabs: ['onboarding', 'campaigns', 'major_events', 'finale', 'chronicle', 'timeline'] },
  { id: 'civil', label: 'Administration civile', icon: Database, tabs: ['population', 'citizens', 'informants', 'civil_protection', 'rationing', 'propaganda'] },
  { id: 'forces', label: 'Forces et menaces', icon: Shield, tabs: ['overwatch', 'citadel', 'technology', 'combine', 'resistance', 'vortigaunts', 'xen', 'xen_research', 'xen_catastrophes', 'nova'] },
  { id: 'archives', label: 'Archives', icon: Archive, tabs: ['archives', 'video_archives', 'decision_history'] },
  { id: 'system', label: 'Système', icon: Settings, tabs: ['difficulty', 'gameplay_balance', 'atmosphere', 'tauri_packaging', 'ux_polish', 'codex', 'system_audit'] },
];

const primaryNavIcons: Partial<Record<TabId, LucideIcon>> = {
  command_deck_v2: LayoutDashboard,
  progression: Target,
  sectors: MapIcon,
  reports: Archive,
  save_system: Save,
};

const canonicalNewGameConfig = doctrineToConfig('canonical_city17', '17');

function App() {
  const [game, setGame] = useState<GameState>(() => {
    const saved = localStorage.getItem(AUTOSAVE_STORAGE_KEY);
    if (!saved) return {
      ...createInitialGame(canonicalNewGameConfig.city, canonicalNewGameConfig.scenario, canonicalNewGameConfig.timeline, canonicalNewGameConfig.profile, canonicalNewGameConfig.campaignId, canonicalNewGameConfig.difficultyPresetId),
      started: false,
      tab: 'main_menu',
    };
    try {
      return { ...hydrateSavedGame(JSON.parse(saved)), tab: 'main_menu' };
    } catch {
      return {
        ...createInitialGame(canonicalNewGameConfig.city, canonicalNewGameConfig.scenario, canonicalNewGameConfig.timeline, canonicalNewGameConfig.profile, canonicalNewGameConfig.campaignId, canonicalNewGameConfig.difficultyPresetId),
        started: false,
        tab: 'main_menu',
      };
    }
  });
  const [cityInput, setCityInput] = useState('17');
  const [scenarioInput, setScenarioInput] = useState<ScenarioId>(canonicalNewGameConfig.scenario);
  const [timelineInput, setTimelineInput] = useState<TimelineId>(canonicalNewGameConfig.timeline);
  const [campaignInput, setCampaignInput] = useState<CampaignId>(canonicalNewGameConfig.campaignId);
  const [difficultyInput, setDifficultyInput] = useState<DifficultyPresetId>(canonicalNewGameConfig.difficultyPresetId);
  const [customDifficultyScalars, setCustomDifficultyScalars] = useState<DifficultyScalars>({ ...difficultyPresets.custom.scalars });
  const [profileInput, setProfileInput] = useState<ProfileId>(canonicalNewGameConfig.profile);
  const [administratorAvatarInput, setAdministratorAvatarInput] = useState<AdministratorAvatarId>('civil_director');
  const [newGameDoctrineInput, setNewGameDoctrineInput] = useState<NewGameIntakeDoctrineId>('canonical_city17');
  const [onboardingTrackInput, setOnboardingTrackInput] = useState<OnboardingTrackId>('standard_command');
  const [useCampaignRecommendations, setUseCampaignRecommendations] = useState(true);
  const [selectedSector, setSelectedSector] = useState<string>('admin');
  const [telemetryOpen, setTelemetryOpen] = useState(false);
  const [telemetryDetailOpen, setTelemetryDetailOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [crisisCatalog, setCrisisCatalog] = useState<Crisis[]>([]);
  const [dayTransition, setDayTransition] = useState<DayTransitionSummary | null>(null);
  const [endDayConfirmOpen, setEndDayConfirmOpen] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<CrisisActionFeedback | null>(null);

  useEffect(() => {
    if (!game.started || game.tab === 'main_menu' || game.tab === 'new_game') return;
    localStorage.setItem(AUTOSAVE_STORAGE_KEY, JSON.stringify(game));
  }, [game]);

  useEffect(() => {
    if (!game.started || crisisCatalog.length > 0) return;
    let active = true;
    import('./data/crisisEvents').then((module) => {
      if (active) setCrisisCatalog(module.crises);
    });
    return () => {
      active = false;
    };
  }, [game.started, crisisCatalog.length]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.querySelector<HTMLElement>('.main')?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [game.tab]);

  useEffect(() => {
    if (!endDayConfirmOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setEndDayConfirmOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [endDayConfirmOpen]);

  useEffect(() => {
    const surface = document.querySelector<HTMLElement>('[data-modal-surface="true"]');
    if (!surface) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusFirstControl = () => {
      const first = surface.querySelector<HTMLElement>(focusableSelector);
      (first ?? surface).focus();
    };
    const frame = window.requestAnimationFrame(focusFirstControl);
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(surface.querySelectorAll<HTMLElement>(focusableSelector));
      if (controls.length === 0) {
        event.preventDefault();
        surface.focus();
        return;
      }
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', trapFocus);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', trapFocus);
      previouslyFocused?.focus();
    };
  }, [endDayConfirmOpen, game.crisis?.id, dayTransition?.day]);

  useEffect(() => {
    const reconciled = reconcileDecisionHistory(game);
    if (reconciled.changed) {
      setGame({ ...game, decisionHistory: reconciled.decisionHistory });
    }
  }, [game]);

  const sector = useMemo(() => game.sectors.find((s) => s.id === selectedSector) ?? game.sectors[0], [game.sectors, selectedSector]);
  const dynamicBreencast = useMemo(() => buildDynamicBreencast(game), [game]);
  const propagandaNetworkLabel = useMemo(() => getPropagandaNetworkLabel(game.timeline), [game.timeline]);
  const timelinePreset = useMemo(() => getTimelinePreset(game.timeline), [game.timeline]);
  const atmosphereProfile = useMemo(() => getAtmosphereProfile(game), [game]);
  const audioDirector = useMemo(() => buildSyntheticAudioDirector(game, atmosphereProfile), [game, atmosphereProfile]);
  const activeTerminal = useMemo(() => getTerminalInterfaceForTab(game.tab), [game.tab]);
  const terminalStatus = useMemo(() => buildTerminalInterfaceStatus(game, activeTerminal.id), [game, activeTerminal.id]);
  const atmosphereCueKey = `${game.day}-${game.crisis?.id ?? 'clear'}-${game.ending ?? 'live'}-${atmosphereProfile.mode}-${audioDirector.activeCue}-${game.tab}-${activeTerminal.id}`;
  const randomPropaganda = dynamicBreencast.recommended.publicLine;
  const eventSummary = useMemo(() => getEventCatalogueSummary(crisisCatalog), [crisisCatalog]);

  function canIssueOrder(actionId: string, label: string, cost = 1) {
    const refusal = dailyOrderRefusal(game.dailyOrders, actionId, cost);
    if (!refusal) return true;
    setGame({ ...game, log: [`JOUR ${String(game.day).padStart(3, '0')} - ${label} refusé : ${refusal}`, ...game.log].slice(0, 100) });
    return false;
  }

  function withIssuedOrder(next: GameState, actionId: string, label: string, cost = 1): GameState {
    return {
      ...next,
      onboarding: recordOnboardingAction(next.onboarding, actionId),
      dailyOrders: spendDailyOrder(game.dailyOrders, actionId, label, cost),
    };
  }

  function commitIssuedOrder(actionId: string, label: string, next: GameState, cost = 1) {
    if (!canIssueOrder(actionId, label, cost)) return;
    setGame(withIssuedOrder(next, actionId, label, cost));
  }


  function applyNewGameDoctrine(doctrineId: NewGameIntakeDoctrineId) {
    const config = doctrineToConfig(doctrineId, cityInput);
    setNewGameDoctrineInput(doctrineId);
    setCityInput(config.city);
    setCampaignInput(config.campaignId);
    setScenarioInput(config.scenario);
    setTimelineInput(config.timeline);
    setProfileInput(config.profile);
    setAdministratorAvatarInput(defaultAdministratorAvatar(config.profile));
    setDifficultyInput(config.difficultyPresetId);
    setOnboardingTrackInput(config.onboardingTrackId);
    setUseCampaignRecommendations(config.useCampaignRecommendations);
  }


  function startGame() {
    if (game.started && !window.confirm('Valider ce nouveau mandat remplacera la campagne active. Continuer ?')) return;
    const campaign = getCampaignPreset(campaignInput);
    const shouldUseCampaign = useCampaignRecommendations && campaignInput !== 'custom_city_administration';
    const selectedScenario = shouldUseCampaign ? campaign.recommendedScenario : scenarioInput;
    const selectedTimeline = shouldUseCampaign ? campaign.recommendedTimeline : timelineInput;
    const selectedProfile = shouldUseCampaign ? campaign.recommendedProfile : profileInput;
    const selectedCity = (cityInput.trim() || (shouldUseCampaign ? campaign.recommendedCity : newGameIntakeDoctrines[newGameDoctrineInput]?.citySuggestion) || '17').replace(/^City\s*/i, '');
    const next = createInitialGame(selectedCity, selectedScenario, selectedTimeline, selectedProfile, campaignInput, difficultyInput, difficultyInput === 'custom' ? customDifficultyScalars : undefined);
    setGame({
      ...next,
      administratorAvatar: administratorAvatarInput,
      tab: 'prologue',
      onboarding: selectOnboardingTrack(next.onboarding, onboardingTrackInput),
      log: [
        `JOUR 001 — Intake Nouvelle Partie : ${newGameIntakeDoctrines[newGameDoctrineInput]?.title ?? 'Configuration COAN'}.`,
        `JOUR 001 — Paramètres : City ${selectedCity}, ${campaign.name}, difficulté ${difficultyPresets[difficultyInput].name}.`,
        ...next.log,
      ].slice(0, 100),
    });
    setSelectedSector('admin');
    setEndDayConfirmOpen(false);
    setActionFeedback(null);
  }

  function openNewCampaign() {
    applyNewGameDoctrine('canonical_city17');
    setDayTransition(null);
    setEndDayConfirmOpen(false);
    setActionFeedback(null);
    setTelemetryOpen(false);
    setGame({ ...game, tab: 'new_game' });
  }

  function continueCampaign() {
    setGame({ ...game, tab: game.ending ? 'chronicle' : 'command_deck_v2' });
  }

  function returnToMainMenu() {
    setDayTransition(null);
    setEndDayConfirmOpen(false);
    setActionFeedback(null);
    setTelemetryOpen(false);
    setGame({ ...game, tab: 'main_menu' });
  }

  function loadGameFromSave(savedGame: GameState, source: string) {
    const hydrated = hydrateSavedGame(savedGame);
    setEndDayConfirmOpen(false);
    setActionFeedback(null);
    setGame({
      ...hydrated,
      tab: 'command_deck_v2',
      log: [`JOUR ${String(hydrated.day).padStart(3, '0')} — Sauvegarde chargée : ${source}.`, ...hydrated.log].slice(0, 100),
    });
    setSelectedSector(hydrated.sectors[0]?.id ?? 'admin');
  }

  function resolveCrisis(choice: EventChoice) {
    if (!game.crisis) return;
    const crisis = game.crisis;
    const actionId = `crisis:${crisis.id}`;
    if (!canIssueOrder(actionId, `Réponse à ${crisis.title}`)) return;
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
    setGame(withIssuedOrder({
      ...game,
      stats: nextStats,
      sectors,
      crisis: null,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Décision : ${choice.label} / ${crisis.title}.`, ...game.log].slice(0, 80),
      crisisHistory: [crisis.id, ...game.crisisHistory].slice(0, 60),
    }, actionId, `Crise : ${choice.label}`));
    setActionFeedback({
      title: `${crisis.title} : ${choice.label}`,
      effects: describeCrisisEffects(choice.effects),
      sectorStatus: choice.status,
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
    const selected = action === 'propaganda'
      ? { ...effects[action], log: `${propagandaNetworkLabel} local impose sur ${sector.name}.` }
      : effects[action];
    const actionId = `sector:${sector.id}:${action}`;
    const cost = action === 'seal' || action === 'purge' ? 2 : 1;
    if (!canIssueOrder(actionId, selected.log, cost)) return;
    setGame(withIssuedOrder({
      ...game,
      stats: addStat(game.stats, selected.stats),
      sectors: game.sectors.map((s) => (s.id === sector.id ? { ...s, ...selected.sector } : s)),
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${selected.log}`, ...game.log].slice(0, 80),
    }, actionId, selected.log, cost));
  }

  function globalAction(action: 'breencast' | 'ration_plus' | 'ration_cut' | 'advisor' | 'shadow_help') {
    if (action === 'advisor' && !isUiuxCapabilityActive(game.uiuxProgression, 'advisor_channel')) {
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
    if (action === 'breencast') map.breencast.log = `${propagandaNetworkLabel} dynamique [${dynamicBreencast.recommended.title}] : ${randomPropaganda}`;
    const actionId = `global:${action}`;
    const cost = action === 'advisor' ? 2 : 1;
    if (!canIssueOrder(actionId, map[action].log, cost)) return;
    setGame(withIssuedOrder({ ...game, stats: addStat(game.stats, map[action].effects), log: [`JOUR ${String(game.day).padStart(3, '0')} — ${map[action].log}`, ...game.log].slice(0, 80) }, actionId, map[action].log, cost));
  }

  function deploy(unit: Unit) {
    if (unit.reserve <= 0) return;
    if (!isUiuxUnitUnlocked(game.uiuxProgression, unit.id)) {
      setGame({ ...game, log: [`JOUR ${String(game.day).padStart(3, '0')} - Deploiement refuse : autorisation requise pour ${unit.name}.`, ...game.log].slice(0, 80) });
      return;
    }
    if (!isUnitAvailableInTimeline(unit.id, game.timeline)) {
      setGame({ ...game, log: [`JOUR ${String(game.day).padStart(3, '0')} - Déploiement refusé : ${getUnitTimelineAvailabilityReason(unit.id, game.timeline)}`, ...game.log].slice(0, 80) });
      return;
    }
    const actionId = `deploy:${unit.id}:${sector.id}`;
    if (!canIssueOrder(actionId, `Déployer ${unit.name}`)) return;
    const weight = unit.category === 'Synth' ? 18 : unit.category === 'Overwatch' ? 10 : unit.category === 'Biocontrol' ? 8 : unit.category === 'Airwatch' ? 12 : 5;
    setGame(withIssuedOrder({
      ...game,
      units: game.units.map((u) => (u.id === unit.id ? { ...u, reserve: u.reserve - 1 } : u)),
      sectors: game.sectors.map((s) => s.id === sector.id ? { ...s, units: { ...s.units, [unit.id]: (s.units[unit.id] ?? 0) + 1 }, surveillance: clamp(s.surveillance + weight / 2), rebel: clamp(s.rebel - weight), xen: unit.category === 'Biocontrol' ? clamp(s.xen - 15) : s.xen, fear: clamp(s.fear + Math.ceil(weight / 2)) } : s),
      stats: addStat(game.stats, { combine: 2, fear: unit.category === 'Synth' ? 6 : 2, citadel: unit.category === 'Airwatch' ? -2 : 0, suspicion: unit.id === 'advisor' ? 12 : 0 }),
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${unit.name} déployé vers ${sector.name}.`, ...game.log].slice(0, 80),
    }, actionId, `Déploiement : ${unit.name}`));
  }

  function buyUiuxUnlock(id: UiuxUnlockId) {
    const result = purchaseUiuxUnlock(game.uiuxProgression, id, game.day);
    if (!result.ok) {
      setGame({ ...game, log: [`JOUR ${String(game.day).padStart(3, '0')} - ${result.message}`, ...game.log].slice(0, 100) });
      return;
    }
    const actionId = `unlock:${id}`;
    if (!canIssueOrder(actionId, result.message)) return;
    setGame(withIssuedOrder({
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      uiuxProgression: result.state,
      log: [`JOUR ${String(game.day).padStart(3, '0')} - ${result.message}`, ...game.log].slice(0, 100),
    }, actionId, result.message));
  }

  function navigateToTab(tab: TabId) {
    const target = tab === 'dashboard' ? 'command_deck_v2' : tab;
    setMobileNavOpen(false);
    if (!isUiuxTabUnlocked(game.uiuxProgression, target)) {
      setGame({ ...game, tab: 'progression', log: [`JOUR ${String(game.day).padStart(3, '0')} - Dossier ${tab} verrouille : autorisation requise.`, ...game.log].slice(0, 100) });
      return;
    }
    setGame({ ...game, tab: target, onboarding: recordOnboardingTabVisit(game.onboarding, target) });
  }

  function requestNextDay() {
    if (game.dailyOrders.remaining > 0) {
      setEndDayConfirmOpen(true);
      return;
    }
    nextDay();
  }

  function toggleUiuxUnlock(id: UiuxUnlockId, enabled: boolean) {
    const result = setUiuxUnlockActive(game.uiuxProgression, id, enabled);
    setGame({
      ...game,
      uiuxProgression: result.state,
      log: [`JOUR ${String(game.day).padStart(3, '0')} - ${result.message}`, ...game.log].slice(0, 100),
    });
  }

  function nextDay() {
    setEndDayConfirmOpen(false);
    setActionFeedback(null);
    const xenUnlocked = isUiuxCapabilityActive(game.uiuxProgression, 'xen_bioscan');
    const novaUnlocked = isUiuxCapabilityActive(game.uiuxProgression, 'nova_prospekt_link');
    const propagation = simulateConnectedPropagation({
      sectors: game.sectors,
      units: game.units,
      stats: game.stats,
      scenario: game.scenario,
      profile: game.profile,
      day: game.day,
      xenEnabled: xenUnlocked,
    });
    let sectors = propagation.sectors;
    const casualties = propagation.casualties;
    const combineLosses = propagation.combineLosses;
    const avgRebel = propagation.avgRebel;
    const avgXen = propagation.avgXen;
    const avgSurveillance = propagation.avgSurveillance;
    let stats = addStat(game.stats, {
      rebel: avgRebel - game.stats.rebel + Math.round((100 - game.stats.info) * 0.05),
      xen: xenUnlocked ? avgXen - game.stats.xen : 0,
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
    const xenEcosystemDaily = xenUnlocked
      ? simulateXenEcosystemDay({ state: game.xenEcosystem, sectors, stats, vortigaunts: vortigauntDaily.vortigaunts, population: populationDaily.population, day: game.day })
      : { sectors, statsDelta: {}, xenEcosystem: game.xenEcosystem, lines: [] };
    sectors = xenEcosystemDaily.sectors;
    stats = addStat(stats, xenEcosystemDaily.statsDelta);
    const xenMutationDaily = xenUnlocked
      ? simulateXenMutationDay({ state: game.xenMutation, sectors, stats, ecosystem: xenEcosystemDaily.xenEcosystem, vortigaunts: vortigauntDaily.vortigaunts, population: populationDaily.population, day: game.day })
      : { sectors, statsDelta: {}, xenMutation: game.xenMutation, lines: [] };
    sectors = xenMutationDaily.sectors;
    stats = addStat(stats, xenMutationDaily.statsDelta);
    const quarantineZoneDaily = xenUnlocked
      ? simulateQuarantineZoneDay({ state: game.quarantineZones, sectors, stats, ecosystem: xenEcosystemDaily.xenEcosystem, mutation: xenMutationDaily.xenMutation, population: populationDaily.population, vortigaunts: vortigauntDaily.vortigaunts, day: game.day })
      : { sectors, statsDelta: {}, quarantineZones: game.quarantineZones, lines: [] };
    sectors = quarantineZoneDaily.sectors;
    stats = addStat(stats, quarantineZoneDaily.statsDelta);
    const xenResearchDaily = xenUnlocked
      ? simulateXenResearchDay({ state: game.xenResearch, stats, sectors, ecosystem: xenEcosystemDaily.xenEcosystem, mutation: xenMutationDaily.xenMutation, quarantine: quarantineZoneDaily.quarantineZones, vortigaunts: vortigauntDaily.vortigaunts, nova: game.novaProspekt, day: game.day })
      : { statsDelta: {}, xenResearch: game.xenResearch, lines: [] };
    stats = addStat(stats, xenResearchDaily.statsDelta);
    const xenCatastropheDaily = xenUnlocked
      ? simulateXenCatastropheDay({ state: game.xenCatastrophes, sectors, stats, ecosystem: xenEcosystemDaily.xenEcosystem, mutation: xenMutationDaily.xenMutation, quarantine: quarantineZoneDaily.quarantineZones, research: xenResearchDaily.xenResearch, nova: game.novaProspekt, vortigaunts: vortigauntDaily.vortigaunts, day: game.day })
      : { sectors, statsDelta: {}, xenCatastrophes: game.xenCatastrophes, lines: [] };
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
      `Propagation Lambda : ${propagation.rebelSpreadEvents} secteurs ont reçu une pression voisine significative.`,
      ...propagation.lambdaVectors.slice(0, 2),
      ...(xenUnlocked ? [
        `Contamination Xen moyenne : ${avgXen}%.`,
        `Propagation Xen : ${propagation.xenSpreadEvents} secteurs ont reçu un vecteur biologique notable.`,
        ...propagation.xenVectors.slice(0, 2),
      ] : ['Bio-signaux classifiés : aucune donnée Xen exploitée sans autorisation Bioscan.']),
      ...propagation.flashpoints.slice(0, 2),
    ];
    const novaDaily = novaUnlocked
      ? processNovaProspektDay(game.novaProspekt, stats, game.day)
      : { nova: game.novaProspekt, statsDelta: {}, lines: [] };
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

    if (!xenUnlocked) {
      const previousXenBySector = new Map(game.sectors.map((sector) => [sector.id, sector.xen]));
      stats = { ...stats, xen: game.stats.xen };
      sectors = sectors.map((sector) => ({ ...sector, xen: previousXenBySector.get(sector.id) ?? sector.xen }));
    }

    const driftControl = capDailySimulationDrift(game.stats, stats, game.day, game.difficultySettings.scalars.campaignPressure);
    stats = driftControl.stats;
    if (driftControl.capped.length) lines.push(`Régulation de cycle : dérive quotidienne amortie sur ${driftControl.capped.join(', ')} pour préserver une campagne jouable.`);

    const catastrophicEndingRatio = game.difficultySettings.activePresetId === 'civil_observer'
      ? 0.9
      : game.difficultySettings.activePresetId === 'standard_occupation' || game.difficultySettings.activePresetId === 'custom'
        ? 0.75
        : game.difficultySettings.activePresetId === 'uprising_nightmare'
          ? 0.4
          : 0.6;
    const minimumEndingDay = Math.max(8, Math.round(game.campaign.durationDays * catastrophicEndingRatio));
    const campaignComplete = campaignDaily.campaign.dayInCampaign >= campaignDaily.campaign.durationDays;
    let ending: string | null = null;
    if (game.day >= minimumEndingDay && stats.rebel >= 100) ending = 'uprising';
    else if (xenUnlocked && game.day >= minimumEndingDay && stats.xen >= 88) ending = 'xen';
    else if (game.day >= minimumEndingDay && (stats.suspicion >= 100 || stats.citadel <= 0)) ending = 'replaced';
    else if (game.day >= minimumEndingDay && stats.production <= 0 && stats.rations <= 0) ending = 'collapse';
    else if (campaignComplete && game.profile === 'sympathizer' && stats.loyalty > 58 && stats.civilianLosses < 900 && stats.suspicion < 80) ending = 'humanity';
    else if (campaignComplete && stats.stability > 76 && stats.rebel < 12 && stats.loyalty < 12 && stats.fear > 82) ending = 'terror';
    else if (campaignComplete && stats.stability > 72 && stats.rebel < 28 && (!xenUnlocked || stats.xen < 28) && stats.production > 62) ending = 'model';
    else if (campaignComplete && stats.rebel >= 58) ending = 'uprising';
    else if (campaignComplete && xenUnlocked && stats.xen >= 58) ending = 'xen';
    else if (campaignComplete && (stats.production < 36 || stats.rations <= 0)) ending = 'collapse';
    else if (campaignComplete) ending = 'replaced';

    const transmission = buildTransmittedReport({ realStats: stats, realLines: lines, policy: game.reportPolicy, day: game.day, city: game.city });
    const audit = resolveAdvisorAudit({
      day: game.day,
      auditRisk: transmission.auditRisk,
      suspicion: stats.suspicion,
      falsificationScore: transmission.falsificationScore,
      policy: game.reportPolicy,
    });
    stats = addStat(stats, { ...audit.effects, suspicion: (audit.effects.suspicion ?? 0) + transmission.suspicionDelta });
    const rawAuditHeat = clamp((game.auditHeat ?? 0) + transmission.auditRisk * 0.08 + (audit.discovered ? 24 : audit.triggered ? 8 : -4));
    const auditHeat = Math.min((game.auditHeat ?? 0) + (game.day <= 7 ? 10 : 14), rawAuditHeat);
    if (!ending && game.day >= minimumEndingDay && (stats.suspicion >= 100 || stats.citadel <= 0)) ending = 'replaced';

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

    const crisis = finalVerdict ? null : pickDirectedCrisis({
      crises: crisisCatalog,
      sectors,
      stats,
      day: game.day,
      timeline: game.timeline,
      unlocked: uiuxProgressionDaily.state.active,
      crisisHistory: game.crisisHistory,
    });
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
    if (!finalVerdict) {
      setDayTransition({
        day: game.day + 1,
        stability: stats.stability - game.stats.stability,
        rebel: stats.rebel - game.stats.rebel,
        xen: xenUnlocked ? stats.xen - game.stats.xen : undefined,
        audit: auditHeat - game.auditHeat,
        directive: directive.title,
        crisisTitle: crisis?.title,
      });
    }
    setGame({
      ...game,
      day: finalVerdict ? game.day : game.day + 1,
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
      dailyOrders: finalVerdict ? game.dailyOrders : resetDailyOrders(game, game.day + 1),
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
      campaign: finalVerdict ? campaignDaily.campaign : {
        ...campaignDaily.campaign,
        dayInCampaign: getNextCampaignDay(campaignDaily.campaign.dayInCampaign, campaignDaily.campaign.durationDays, Boolean(finalVerdict)),
      },
      campaignMission: missionDaily.campaignMission,
      difficultySettings: difficultyDaily.difficultySettings,
      majorStoryEvents: majorStoryDaily.majorStoryEvents,
      videoArchives: videoArchiveDaily.videoArchives,
      decisionHistory: game.decisionHistory,
    });
  }

  function setReportPolicy(policy: ReportPolicy) {
    commitIssuedOrder('policy:report', `Politique de rapport : ${reportPolicyLabels[policy]}`, {
      ...game,
      reportPolicy: policy,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Politique de rapport Citadel : ${reportPolicyLabels[policy]}.`, ...game.log].slice(0, 80),
    });
  }


  function setRationPolicy(policyId: RationPolicyId) {
    const result = changeRationPolicy(game.rationEconomy, policyId);
    commitIssuedOrder('policy:ration', result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      rationEconomy: result.rationEconomy,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyRationOperation(operation: RationOperation) {
    const result = resolveRationOperation({ state: game.rationEconomy, operation, sectors: game.sectors, stats: game.stats, day: game.day });
    commitIssuedOrder(`ration:${operation.id}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      rationEconomy: result.rationEconomy,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyNovaOperation(operation: NovaOperation) {
    const result = resolveNovaOperation({ state: game.novaProspekt, operation, day: game.day });
    commitIssuedOrder(`nova:${operation.id}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      novaProspekt: result.nova,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeNovaPolicy(policyId: string) {
    const result = setNovaPolicy(game.novaProspekt, policyId);
    commitIssuedOrder('policy:nova', result.lines[0], {
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
    commitIssuedOrder(`breencast:${strategyId}`, result.lines[0], {
      ...game,
      stats: result.stats,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }



  function applyCitizenAction(action: CitizenAction, citizenId: string) {
    const result = resolveCitizenAction({ registry: game.citizenRegistry, action, recordId: citizenId, day: game.day });
    commitIssuedOrder(`citizen:${citizenId}:${action.id}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      citizenRegistry: result.citizenRegistry,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }


  function changeInformantDoctrine(doctrineId: InformantDoctrineId) {
    const result = setInformantDoctrine(game.informantNetwork, doctrineId);
    commitIssuedOrder('policy:informants', result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      informantNetwork: result.informantNetwork,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyInformantOperation(operation: InformantOperation) {
    const result = resolveInformantOperation({ state: game.informantNetwork, operation, sectors: game.sectors, registry: game.citizenRegistry, stats: game.stats, day: game.day });
    commitIssuedOrder(`informant:${operation.id}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      informantNetwork: result.informantNetwork,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeCivilProtectionDoctrine(doctrineId: CivilProtectionDoctrineId) {
    const result = setCivilProtectionDoctrine(game.civilProtection, doctrineId);
    commitIssuedOrder('policy:civil-protection', result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      civilProtection: result.civilProtection,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function applyCivilProtectionOperation(operation: CivilProtectionOperation) {
    const result = resolveCivilProtectionOperation({ state: game.civilProtection, operation, sectors: game.sectors, selectedSectorId: sector.id, stats: game.stats, day: game.day });
    commitIssuedOrder(`civil-protection:${operation.id}:${sector.id}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      civilProtection: result.civilProtection,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }


  function activateCitadelDirectiveProtocol(node: CitadelDirectiveNode) {
    if (node.branchId === 'advisor' && !isUiuxCapabilityActive(game.uiuxProgression, 'advisor_channel')) {
      setGame({ ...game, tab: 'progression', log: [`JOUR ${String(game.day).padStart(3, '0')} - Protocole Advisor refuse : canal direct requis.`, ...game.log].slice(0, 80) });
      return;
    }
    const result = resolveDirectiveNode({ state: game.citadelDirectiveTree, stats: game.stats, nodeId: node.id, day: game.day });
    commitIssuedOrder(`directive:${node.id}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      citadelDirectiveTree: result.tree,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }


  function researchCombineTechnology(node: CombineTechnologyNode) {
    const timelineConflict = getTechnologyTimelineConflict(node, game.timeline);
    if (timelineConflict) {
      setGame({ ...game, log: [`JOUR ${String(game.day).padStart(3, '0')} - Recherche ${node.title} refusee : ${timelineConflict}`, ...game.log].slice(0, 80) });
      return;
    }
    const requiredUnlock = node.branchId === 'overwatch' || node.branchId === 'airwatch'
      ? 'ota_command'
      : node.branchId === 'biocontrol'
        ? 'xen_bioscan'
        : node.branchId === 'nova'
          ? 'nova_prospekt_link'
          : null;
    if (requiredUnlock && !isUiuxCapabilityActive(game.uiuxProgression, requiredUnlock)) {
      setGame({ ...game, tab: 'progression', log: [`JOUR ${String(game.day).padStart(3, '0')} - Recherche ${node.title} refusee : autorisation ${requiredUnlock} requise.`, ...game.log].slice(0, 80) });
      return;
    }
    const result = researchTechnologyNode({ state: game.combineTechnology, stats: game.stats, units: game.units, sectors: game.sectors, nodeId: node.id, day: game.day });
    commitIssuedOrder(`technology:${node.id}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      units: filterUnitsForTimeline(result.units, game.timeline),
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
    commitIssuedOrder(`resistance:${operation.id}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      resistanceNetwork: result.resistanceNetwork,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeResistanceDoctrine(doctrine: ResistanceNetworkState['activeDoctrine']) {
    const result = setResistanceDoctrine(game.resistanceNetwork, doctrine);
    commitIssuedOrder('policy:resistance-network', result.lines[0], {
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
    commitIssuedOrder(`resistance-faction:${operation.id}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      resistanceFactions: result.resistanceFactions,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeResistanceFactionDoctrine(doctrine: ResistanceFactionDoctrineId) {
    const result = setResistanceFactionDoctrine(game.resistanceFactions, doctrine);
    commitIssuedOrder('policy:resistance-factions', result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      resistanceFactions: result.resistanceFactions,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeVortigauntDoctrine(doctrine: VortigauntDoctrineId) {
    const result = setVortigauntDoctrine(game.vortigaunts, doctrine);
    commitIssuedOrder('policy:vortigaunts', result.lines[0], {
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
    commitIssuedOrder(`vortigaunt:${operation.id}:${groupId ?? 'network'}`, result.lines[0], {
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
    commitIssuedOrder('policy:xen-ecosystem', result.lines[0], {
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
    commitIssuedOrder(`xen-ecosystem:${operation.id}:${layerId ?? selectedSector}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      xenEcosystem: result.xenEcosystem,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeXenMutationPolicy(policy: XenMutationPolicyId) {
    const result = setXenMutationPolicy(game.xenMutation, policy);
    commitIssuedOrder('policy:xen-mutation', result.lines[0], {
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
    commitIssuedOrder(`xen-mutation:${operation.id}:${chainId ?? selectedSector}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      xenMutation: result.xenMutation,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeQuarantinePolicy(policy: QuarantinePolicyId) {
    const result = setQuarantinePolicy(game.quarantineZones, policy);
    commitIssuedOrder('policy:quarantine', result.lines[0], {
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
    commitIssuedOrder(`quarantine:${operation.id}:${selectedSector}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      quarantineZones: result.quarantineZones,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }


  function changeXenResearchPolicy(policy: XenResearchPolicyId) {
    const result = setXenResearchPolicy(game.xenResearch, policy);
    commitIssuedOrder('policy:xen-research', result.lines[0], {
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
    commitIssuedOrder(`xen-research:${operation.id}:${programId ?? selectedSector}`, result.lines[0], {
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
    commitIssuedOrder('policy:xen-catastrophe', result.lines[0], {
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
    commitIssuedOrder(`xen-catastrophe:${operation.id}:${eventId ?? selectedSector}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      xenCatastrophes: result.xenCatastrophes,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeMajorStoryPolicy(policy: MajorStoryPolicyId) {
    const result = setMajorStoryPolicy(game.majorStoryEvents, policy);
    commitIssuedOrder('policy:major-story', result.lines[0], {
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
    commitIssuedOrder(`major-story:${operation.id}:${eventId ?? selectedSector}`, result.lines[0], {
      ...game,
      stats: addStat(game.stats, result.statsDelta),
      sectors: result.sectors,
      majorStoryEvents: result.majorStoryEvents,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — ${result.lines[0]}`, ...result.lines.slice(1), ...game.log].slice(0, 80),
    });
  }

  function changeVideoArchivePolicy(policy: VideoArchivePolicyId) {
    const result = setVideoArchivePolicy(game.videoArchives, policy);
    commitIssuedOrder('policy:video-archives', result.lines[0], {
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
    commitIssuedOrder(`video-archive:${operation.id}:${feedId ?? 'network'}`, result.lines[0], {
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

  function completeOnboardingChapter(chapterId: OnboardingChapterId) {
    const nextOnboarding = completeOnboardingChapterState(game.onboarding, chapterId);
    if (nextOnboarding === game.onboarding) {
      setGame({
        ...game,
        log: [`JOUR ${String(game.day).padStart(3, '0')} — Tutoriel COAN : ouvrez au moins un module lié avant de valider ce dossier.`, ...game.log].slice(0, 80),
      });
      return;
    }
    setGame({
      ...game,
      onboarding: nextOnboarding,
      log: [`JOUR ${String(game.day).padStart(3, '0')} — Tutoriel COAN : chapitre ${chapterId} validé.`, ...game.log].slice(0, 80),
    });
  }

  function runOnboardingFirstDayScript() {
    const result = resolveOnboardingFirstDay(game);
    if (result.onboarding === game.onboarding) {
      navigateToTab(result.suggestedTab);
      return;
    }
    setGame({
      ...game,
      onboarding: result.onboarding,
      tab: 'onboarding',
      log: [
        `JOUR ${String(game.day).padStart(3, '0')} — ${result.logLines[0]}`,
        ...result.logLines.slice(1),
        ...game.log,
      ].slice(0, 100),
    });
  }

  const fullNav: Array<[TabId, string]> = [['onboarding', 'Tutoriel COAN'], ['command_deck_v2', 'Command Deck'], ['progression', 'Requisitions'], ['campaigns', 'Campagne active'], ['major_events', 'Événements majeurs'], ['finale', 'Verdict final'], ['chronicle', 'Chronique finale'], ['timeline', 'Chronologie'], ['sectors', 'Carte de City'], ['population', 'Population'], ['citizens', 'Registre Civil'], ['informants', 'Informateurs'], ['civil_protection', 'Civil Protection'], ['overwatch', 'Overwatch Command'], ['citadel', 'Citadel Directives'], ['technology', 'Technologies Combine'], ['combine', 'Forces Combine'], ['resistance', 'Résistance'], ['vortigaunts', 'Vortigaunts / Biotics'], ['xen', 'Quarantaine Xen'], ['xen_research', 'Recherche Xen'], ['xen_catastrophes', 'Catastrophes Xen'], ['rationing', 'Rationnement'], ['nova', 'Nova Prospekt'], ['propaganda', 'BreenCast'], ['reports', 'Rapports'], ['archives', 'Archives'], ['video_archives', 'Archives vidéo'], ['save_system', 'Sauvegardes'], ['decision_history', 'Historique décisions'], ['difficulty', 'Mandat de difficulté'], ['atmosphere', 'Son & ambiance'], ['codex', 'Codex Lore']];
  const nav = getTerminalNavTabs(activeTerminal.id, fullNav).map(([id, label]) => [
    id,
    id === 'progression' ? 'Réquisitions' : label,
  ] as [TabId, string]);
  const uxPolish = useMemo(() => buildUxPolishReport(game, nav), [game, nav]);
  const navHintMap = useMemo(() => new Map(uxPolish.navHints.map((hint) => [hint.tab, `${hint.tooltip} — ${hint.loreHint}`])), [uxPolish]);
  const navMap = new Map(nav);
  const primaryNav = sidebarPrimaryTabs.flatMap((id) => navMap.has(id) ? [[id, navMap.get(id)!] as [TabId, string]] : []);
  const groupedNav = sidebarNavGroups.map((group) => ({
    ...group,
    items: group.tabs.flatMap((id) => navMap.has(id) ? [[id, navMap.get(id)!] as [TabId, string]] : []),
  })).filter((group) => group.items.length > 0);
  const preSession = ['main_menu', 'new_game', 'prologue'].includes(game.tab);

  return (
    <div className={`app-shell ${preSession ? 'pre-session-shell' : ''} ux-density-${uxPolish.density} ${atmosphereProfile.bodyClass} alert-${atmosphereProfile.alertLevel}`}>
      <AtmosphereLayer profile={atmosphereProfile} settings={game.atmosphereSettings} cueKey={atmosphereCueKey} audioDirector={audioDirector} />
      {!preSession && <FloatingWindowLayer game={game} selectedSectorId={selectedSector} setTab={navigateToTab} />}
      <aside className={`sidebar ${mobileNavOpen ? 'nav-open' : 'nav-closed'}`}>
        <div className="brand">
          <div className="brand-row">
            <div><span className="brand-kicker">COMBINE CIVIL AUTHORITY</span><h1>City {game.city}</h1></div>
            <button className="sidebar-menu-toggle" aria-label={mobileNavOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)}>
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          <p>{activeTerminal.label} — {activeTerminal.subtitle}</p>
        </div>
        <div className="terminal-switcher">
          {terminalInterfaceOrder.map((id) => {
            const terminal = terminalInterfaces[id];
            const status = buildTerminalInterfaceStatus(game, id);
            const target = getTerminalSwitchTarget(id);
            const locked = !isUiuxTabUnlocked(game.uiuxProgression, target);
            return <button key={id} aria-label={locked ? `${terminal.label}, verrouillé. Ouvrir Requisitions.` : terminal.label} title={locked ? 'Autorisation requise dans Requisitions' : terminal.label} className={`terminal-switch tone-${terminal.tone} ${activeTerminal.id === id ? 'active' : ''} ${locked ? 'locked' : ''}`} onClick={() => navigateToTab(target)}>
              <strong>{terminal.shortLabel}</strong>
              <span>{locked ? 'LOCK / requisition' : `${status.integrity}% / risque ${status.risk}%`}</span>
            </button>;
          })}
        </div>
        <nav className="sidebar-nav" aria-label="Navigation principale">
          <div className="sidebar-primary-nav">
          {primaryNav.map(([id, label]) => {
            const locked = !isUiuxTabUnlocked(game.uiuxProgression, id);
            const Icon = primaryNavIcons[id] ?? Gauge;
            return <button key={id} aria-label={locked ? `${label}, verrouillé. Ouvrir Requisitions.` : label} title={locked ? 'Autorisation requise dans Requisitions' : (navHintMap.get(id) ?? label)} className={`sidebar-primary-link ${game.tab === id ? 'active' : ''} ${locked ? 'locked' : ''}`} onClick={() => navigateToTab(id)}>
              <Icon size={17} /><span>{label}</span>{locked && <LockKeyhole size={13} />}
            </button>;
          })}
          </div>
          <div className="sidebar-nav-groups">
            {groupedNav.map((group) => {
              const GroupIcon = group.icon;
              const containsActive = group.items.some(([id]) => id === game.tab);
              return <details key={group.id} className="sidebar-nav-group" open={containsActive || undefined}>
                <summary><GroupIcon size={15} /><span>{group.label}</span><b>{group.items.length}</b><ChevronDown size={14} /></summary>
                <div>
                  {group.items.map(([id, label]) => {
                    const locked = !isUiuxTabUnlocked(game.uiuxProgression, id);
                    return <button key={id} aria-label={locked ? `${label}, verrouillé. Ouvrir Requisitions.` : label} title={locked ? 'Autorisation requise dans Requisitions' : (navHintMap.get(id) ?? label)} className={`${game.tab === id ? 'active' : ''} ${locked ? 'locked' : ''}`} onClick={() => navigateToTab(id)}>
                      <span>{label}</span>{locked && <LockKeyhole size={12} />}
                    </button>;
                  })}
                </div>
              </details>;
            })}
          </div>
        </nav>
        <div className="sidebar-session-status">
          <span>Phase {formatUiuxPhase(game.uiuxProgression.phase)}</span>
          <b>{game.uiuxProgression.longTermScore}% viable</b>
          <small>Charge {game.uiuxProgression.bureaucraticLoad}%</small>
        </div>
      </aside>

      <main className={`main terminal-${activeTerminal.id} terminal-tone-${activeTerminal.tone} ${game.atmosphereSettings.scanlines ? 'scanlines' : ''} ${game.tab === 'nova' || activeTerminal.id === 'nova' ? 'nova-interface' : ''} ${atmosphereProfile.bodyClass}`}>
        {!preSession && <header className="topbar terminal-topbar">
          <div className="topbar-command" title={`${getCampaignPreset(game.campaign.activeCampaignId).name} / ${difficultyPresets[game.difficultySettings.activePresetId].name}`}>
            <span className="brand-kicker">{activeTerminal.shortLabel} / CITY {game.city}</span>
            <strong>{activeTerminal.commandHeader}</strong>
          </div>
          <div className="topbar-status">
            <span>J{String(game.day).padStart(3, '0')}</span>
            <span>{formatUiuxPhase(game.uiuxProgression.phase)}</span>
            <span className={game.uiuxProgression.heat > 65 ? 'danger' : ''}>HEAT {game.uiuxProgression.heat}%</span>
            <span>REQ {game.uiuxProgression.resources.requisition}</span>
            <span className={game.dailyOrders.remaining === 0 ? 'danger' : ''}>ORDRES {game.dailyOrders.remaining}/{game.dailyOrders.total}</span>
            <span className={game.stats.rebel > 65 ? 'danger' : ''}><Radio size={13} /> Λ {game.stats.rebel}%</span>
            <button className="telemetry-toggle" aria-expanded={telemetryOpen} onClick={() => setTelemetryOpen((open) => { if (open) setTelemetryDetailOpen(false); return !open; })}><Gauge size={15} /> {telemetryOpen ? 'Masquer' : 'Télémétrie'}</button>
            <button className="meta-menu-button" title="Menu principal" aria-label="Ouvrir le menu principal" onClick={returnToMainMenu}><Home size={15} /></button>
            <button className="end-day" title={`Clôturer le jour ${game.day}`} onClick={requestNextDay} disabled={!!game.ending || !!game.crisis || !!dayTransition}>Clôturer la journée</button>
          </div>
        </header>}

        {!preSession && actionFeedback && <div className="action-feedback" role="status" aria-live="polite">
          <div>
            <span className="brand-kicker">ORDRE EXÉCUTÉ / SOLDE {game.dailyOrders.remaining}/{game.dailyOrders.total}</span>
            <strong>{actionFeedback.title}</strong>
            <div className="action-feedback-effects">
              {actionFeedback.effects.length > 0 ? actionFeedback.effects.map((effect) => <span key={effect}>{effect}</span>) : <span>Aucune variation immédiate</span>}
              {actionFeedback.sectorStatus && <span>Statut secteur : {actionFeedback.sectorStatus}</span>}
            </div>
          </div>
          <button type="button" aria-label="Fermer le compte rendu de l'ordre" onClick={() => setActionFeedback(null)}><X size={16} /></button>
        </div>}

        {telemetryOpen && <div className="telemetry-drawer">
        <section className={`terminal-interface-banner tone-${activeTerminal.tone}`}>
          <div>
            <span className="brand-kicker">{activeTerminal.classification}</span>
            <h2>{activeTerminal.label}</h2>
            <p>{activeTerminal.operatorBrief}</p>
          </div>
          <div className="terminal-status-grid">
            <span>Intégrité <b>{terminalStatus.integrity}%</b></span>
            <span>Risque <b>{terminalStatus.risk}%</b></span>
            <span>Focus <b>{navMap.get(terminalStatus.recommendedTab) ?? terminalStatus.recommendedTab}</b></span>
          </div>
          <div className="terminal-lexicon">
            {activeTerminal.statusVocabulary.map((item) => <em key={item}>{item}</em>)}
          </div>
          <p className="terminal-warning-line">{terminalStatus.warningLine}</p>
        </section>

        <section className={`ux-command-strip score-${uxPolish.score >= 88 ? 'ok' : uxPolish.score >= 74 ? 'watch' : uxPolish.score >= 58 ? 'risk' : 'critical'}`}>
          <div>
            <span className="brand-kicker">PRIORITÉS COAN / {uxPolish.statusLabel}</span>
            <strong>{uxPolish.headline}</strong>
          </div>
          <div className="ux-command-routes">
            {uxPolish.quickRoutes.slice(0, 5).map((route) => {
              const locked = !isUiuxTabUnlocked(game.uiuxProgression, route.targetTab);
              return <button key={route.id} aria-label={locked ? `${route.shortLabel}, verrouillé. Ouvrir Requisitions.` : route.shortLabel} title={route.reason} className={`tone-${route.tone} ${route.active ? 'active' : ''} ${locked ? 'locked' : ''}`} onClick={() => navigateToTab(route.targetTab)}>
              <b>{route.shortLabel}</b>
              <span>{route.priority}</span>
              </button>;
            })}
          </div>
        </section>

        <section className="stats-grid telemetry-priority-grid" aria-label="Indicateurs prioritaires">
          <Stat label="Stabilité" value={game.stats.stability} />
          <Stat label="Rébellion" value={game.stats.rebel} dangerHigh />
          <Stat label={isUiuxCapabilityActive(game.uiuxProgression, 'xen_bioscan') ? 'Xen' : 'Bio-signal masqué'} value={isUiuxCapabilityActive(game.uiuxProgression, 'xen_bioscan') ? game.stats.xen : 0} dangerHigh xen />
          <Stat label="Production" value={game.stats.production} />
          <Stat label="Citadelle" value={game.stats.citadel} />
          <Stat label="Suspicion" value={game.stats.suspicion} dangerHigh />
          <Stat label="Mandat" value={game.campaignMission.mandateScore} />
          <div className="stat"><span>Rations</span><b>{game.stats.rations}</b></div>
        </section>
        <button type="button" className="telemetry-detail-toggle" aria-expanded={telemetryDetailOpen} onClick={() => setTelemetryDetailOpen((open) => !open)}>
          <ChevronDown size={15} /> {telemetryDetailOpen ? 'Masquer les systèmes secondaires' : 'Afficher les systèmes secondaires'}
        </button>
        {telemetryDetailOpen && <section className="stats-grid telemetry-detail-grid" aria-label="Indicateurs systèmes secondaires">
          <Stat label="Loyauté" value={game.stats.loyalty} />
          <Stat label="Peur" value={game.stats.fear} dangerHigh />
          <Stat label="Combine" value={game.stats.combine} />
          <Stat label="Info" value={game.stats.info} />
          <Stat label="Fatigue" value={game.stats.fatigue} dangerHigh />
          <Stat label="Audit" value={game.auditHeat ?? 0} dangerHigh />
          <Stat label="Difficulté" value={game.difficultySettings.projectedThreat} dangerHigh />
          <Stat label="Campagne" value={game.campaign.pressure} dangerHigh />
          <Stat label="Risque obj." value={game.campaignMission.failureRisk} dangerHigh />
          <Stat label="Événements majeurs" value={game.majorStoryEvents.citywideHeat} dangerHigh />
          <Stat label="Faim" value={game.rationEconomy.hungerIndex} dangerHigh />
          <Stat label="Marché noir" value={game.rationEconomy.blackMarketIndex} dangerHigh />
          <Stat label="Conformité" value={game.population.complianceIndex} />
          <Stat label="Sympathie Λ" value={game.population.lambdaSupportIndex} dangerHigh />
          <Stat label="Vortessence" value={game.vortigaunts.vortessenceCoherence} dangerHigh />
          <Stat label="Biotics" value={game.vortigaunts.bioticPressure} dangerHigh />
          {isUiuxCapabilityActive(game.uiuxProgression, 'xen_bioscan') && <Stat label="Exposition bio" value={game.population.xenExposureIndex} dangerHigh xen />}
          {isUiuxCapabilityActive(game.uiuxProgression, 'xen_bioscan') && <Stat label="Mutations" value={game.xenMutation.outbreakRisk} dangerHigh xen />}
          {isUiuxCapabilityActive(game.uiuxProgression, 'xen_bioscan') && <Stat label="Conversion" value={game.xenMutation.hostConversionIndex} dangerHigh xen />}
          {isUiuxCapabilityActive(game.uiuxProgression, 'xen_bioscan') && <Stat label="R&D Xen" value={game.xenResearch.labIncidentRisk} dangerHigh xen />}
          <Stat label="Tech" value={game.combineTechnology.scanEfficiency} />
          <Stat label="Dette tech" value={game.combineTechnology.maintenanceDebt} dangerHigh />
        </section>}
        </div>}

        {game.ending && !preSession && <div className="ending"><div><h2>PROTOCOLE DE FIN ACTIVÉ</h2><p>{game.finalVerdict ? `${game.finalVerdict.title} — ${game.finalVerdict.subtitle}` : (endings[game.ending] ?? endings.replaced).replaceAll('{city}', game.city)}</p></div><button onClick={returnToMainMenu}><Home size={16} /> Retour au menu</button></div>}

        {!preSession && endDayConfirmOpen && !game.crisis && !dayTransition && <div className="confirmation-modal">
          <section className="confirmation-box" role="dialog" aria-modal="true" aria-labelledby="end-day-confirm-title" aria-describedby="end-day-confirm-description" data-modal-surface="true" tabIndex={-1}>
            <span className="brand-kicker">FIN DE CYCLE / JOUR {String(game.day).padStart(3, '0')}</span>
            <h2 id="end-day-confirm-title">{game.dailyOrders.remaining} {game.dailyOrders.remaining > 1 ? 'ordres seront abandonnés' : 'ordre sera abandonné'}</h2>
            <p id="end-day-confirm-description">Le passage au jour {game.day + 1} réinitialise le quota. Les ordres inutilisés ne sont ni stockés ni convertis en ressources.</p>
            <div className="confirmation-actions">
              <button type="button" autoFocus onClick={() => setEndDayConfirmOpen(false)}>Continuer les opérations</button>
              <button type="button" className="primary" onClick={nextDay}>Clôturer malgré tout</button>
            </div>
          </section>
        </div>}

        {dayTransition && <div className="day-transition" role="dialog" aria-modal="true" aria-labelledby="day-transition-title" aria-describedby="day-transition-description">
          <div className="day-transition-scan" />
          <div className="day-transition-content" data-modal-surface="true" tabIndex={-1}>
            <span className="brand-kicker">CYCLE ADMINISTRATIF SYNCHRONISÉ</span>
            <h2 id="day-transition-title">JOUR {String(dayTransition.day).padStart(3, '0')}</h2>
            <p id="day-transition-description" aria-live="polite">{dayTransition.crisisTitle ? `Alerte en attente : ${dayTransition.crisisTitle}` : `Directive active : ${dayTransition.directive}`}</p>
            <div className="day-transition-deltas">
              <DayDelta label="Stabilité" value={dayTransition.stability} inverse />
              <DayDelta label="Lambda" value={dayTransition.rebel} />
              {dayTransition.xen !== undefined && <DayDelta label="Xen" value={dayTransition.xen} />}
              <DayDelta label="Audit" value={dayTransition.audit} />
            </div>
            <button onClick={() => setDayTransition(null)}>Ouvrir le Command Deck</button>
          </div>
        </div>}

        {!preSession && game.crisis && !dayTransition && (
          <div className="crisis-modal">
            <div className="crisis-box" role="dialog" aria-modal="true" aria-labelledby="crisis-dialog-title" data-modal-surface="true" tabIndex={-1}>
                <img className="crisis-event-visual" src={getCrisisVisual(game.crisis)} alt="" aria-hidden="true" />
              <span className="brand-kicker">ALERTE {game.crisis.type}</span>
              <h2 id="crisis-dialog-title">{game.crisis.title}</h2>
              <p>{game.crisis.body}</p>
              {game.crisis.loreTags && <div className="event-tags">{game.crisis.loreTags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
              {game.crisis.severity && <p className="severity-line">Gravité protocolaire : {game.crisis.severity}/5</p>}
              <div className="choice-grid">
                {game.crisis.choices.map((c) => {
                  const effects = describeCrisisEffects(c.effects);
                  return <button key={c.id} onClick={() => resolveCrisis(c)}>
                    <strong>{c.label}</strong>
                    <span>{c.detail}</span>
                    <span className="choice-order-cost">Coût : 1 ordre · Solde après décision : {Math.max(0, game.dailyOrders.remaining - 1)}/{game.dailyOrders.total}</span>
                    <span className="choice-effect-label">Effets immédiats</span>
                    <span className="choice-effects">{effects.length > 0 ? effects.join(' · ') : 'Aucune variation directe'}{c.status ? ` · Statut : ${c.status}` : ''}</span>
                  </button>;
                })}
              </div>
            </div>
          </div>
        )}

        <Suspense fallback={<section className="panel module-loading" role="status">Connexion au terminal en cours...</section>}>
        {game.tab === 'main_menu' && <MainMenuScreen
          hasCampaign={game.started}
          campaignEnded={!!game.ending}
          city={game.city}
          day={game.day}
          administratorAvatar={game.administratorAvatar}
          continueCampaign={continueCampaign}
          createCampaign={openNewCampaign}
        />}
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
          customDifficultyScalars={customDifficultyScalars}
          setCustomDifficultyScalar={(key, value) => setCustomDifficultyScalars((current) => ({ ...current, [key]: value }))}
          profileInput={profileInput}
          setProfileInput={setProfileInput}
          administratorAvatarInput={administratorAvatarInput}
          setAdministratorAvatarInput={setAdministratorAvatarInput}
          doctrineInput={newGameDoctrineInput}
          setDoctrineInput={setNewGameDoctrineInput}
          onboardingTrackInput={onboardingTrackInput}
          setOnboardingTrackInput={setOnboardingTrackInput}
          useCampaignRecommendations={useCampaignRecommendations}
          setUseCampaignRecommendations={setUseCampaignRecommendations}
          applyDoctrine={applyNewGameDoctrine}
          startGame={startGame}
          cancelCreation={returnToMainMenu}
        />}
        {game.tab === 'prologue' && <CampaignPrologueScreen game={game} continueToTutorial={() => setGame({ ...game, tab: 'onboarding' })} />}
        {game.tab === 'onboarding' && <OnboardingScreen game={game} completeChapter={completeOnboardingChapter} runFirstDayScript={runOnboardingFirstDayScript} setTab={navigateToTab} />}
        {game.tab === 'command_deck_v2' && <UiuxV2CommandDeck game={game} setTab={navigateToTab} />}
        {game.tab === 'progression' && <UiuxProgressionPanel game={game} purchaseUnlock={buyUiuxUnlock} toggleUnlock={toggleUiuxUnlock} />}
        {game.tab === 'campaigns' && <CampaignScreen game={game} />}
        {game.tab === 'major_events' && <MajorStoryEventsScreen game={game} operations={majorStoryOperations} changePolicy={changeMajorStoryPolicy} applyOperation={applyMajorStoryOperation} />}
        {game.tab === 'finale' && <FinalVerdictScreen game={game} />}
        {game.tab === 'chronicle' && <FinalChronicleScreen game={game} />}
        {game.tab === 'timeline' && <TimelinePanel game={game} current={timelinePreset} />}
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
        {game.tab === 'propaganda' && <Propaganda networkLabel={propagandaNetworkLabel} dynamicBreencast={dynamicBreencast} strategies={breencastStrategies} globalAction={globalAction} applyStrategy={applyBreencastStrategy} />}
        {game.tab === 'reports' && <Reports reports={game.reports} log={game.log} policy={game.reportPolicy} setPolicy={setReportPolicy} />}
        {game.tab === 'archives' && <ArchivesScreen game={game} eventSummary={eventSummary} />}
        {game.tab === 'video_archives' && <VideoArchivesScreen game={game} operations={videoArchiveOperations} changePolicy={changeVideoArchivePolicy} applyOperation={applyVideoArchiveOperation} />}
        {game.tab === 'save_system' && <SaveManagerScreen game={game} loadGame={loadGameFromSave} />}
        {game.tab === 'decision_history' && <DecisionHistoryScreen game={game} setFilter={setDecisionHistoryView} />}
        {game.tab === 'difficulty' && <DifficultySettingsScreen game={game} applyPreset={applyDifficultyPreset} updateScalar={setDifficultyScalarValue} resetCustom={resetDifficultySettings} readOnly />}
        {game.tab === 'atmosphere' && <AtmosphereScreen profile={atmosphereProfile} audioDirector={audioDirector} settings={game.atmosphereSettings} updateSettings={updateAtmosphereSettings} />}
        {game.tab === 'codex' && <LoreCodexScreen game={game} setTab={(tab) => setGame({ ...game, tab })} />}
        </Suspense>
      </main>
    </div>
  );
}

function Stat({ label, value, dangerHigh = false, xen = false }: { label: string; value: number; dangerHigh?: boolean; xen?: boolean }) {
  const danger = dangerHigh ? value > 65 : value < 35;
  return <div className={`stat ${danger ? 'danger' : ''} ${xen ? 'xen-stat' : ''}`}><span>{label}</span><b>{value}%</b><i style={{ width: `${clamp(value)}%` }} /></div>;
}

function TimelinePanel({ game, current }: { game: GameState; current: ReturnType<typeof getTimelinePreset> }) {
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
      <div className="advice">Timeline verrouillée par le mandat initial. Elle ne peut être choisie que pendant la création de campagne.</div>
    </div>

    <div className="panel timeline-list">
      <span className="brand-kicker">Archives chronologiques</span>
      <h2>Époques consultables</h2>
      <div className="operation-list">
        {ordered.map((preset) => <article key={preset.id} className={game.timeline === preset.id ? 'selected-operation directive-node' : 'directive-node'}>
          <strong>{preset.name}</strong>
          <span>{preset.canonWindow}</span>
          <em>{preset.subtitle}</em>
        </article>)}
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
  const networkLabel = getPropagandaNetworkLabel(game.timeline);
  const garrison = Object.entries(sector.units)
    .filter(([, count]) => count > 0)
    .map(([unitId, count]) => ({ unit: game.units.find((item) => item.id === unitId), unitId, count }));

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
    <div className="panel sector-detail"><span className="brand-kicker">Dossier secteur connecté</span><h2>{sector.name}</h2><p>{sector.role}</p><p>{sector.notes}</p><div className="mini-grid"><span>Population <b>{sector.population}</b></span><span>Zone <b>{sector.zone}</b></span><span>Valeur stratégique <b>{sector.strategicValue}%</b></span><span>Goulot <b>{sector.chokePoint ? 'Oui' : 'Non'}</b></span><span>Surveillance <b>{sector.surveillance}%</b></span><span>Infrastructure <b>{sector.infrastructure}%</b></span><span>Loyauté <b>{sector.loyalty}%</b></span><span>Peur <b>{sector.fear}%</b></span></div><div className="pressure-grid"><span>Pression Lambda voisine <b>{pressure.rebelPressure}%</b></span><span>Pression Xen voisine <b>{pressure.xenPressure}%</b></span><span>Isolement hors contrôle Combine <b>{pressure.combineIsolation}%</b></span><span>Route la plus risquée <b>{pressure.highestRiskRoute}%</b></span></div><h3>Connexions opérationnelles</h3><div className="route-list">{connected.map(({ sector: target, connection }) => <button key={`${target.id}-${connection.label}`} onClick={() => setSelectedSector(target.id)}><strong>{target.name}</strong><span>{connection.label} — {connection.type} — contrôle {connection.controlledBy} — risque {connection.risk}%</span></button>)}</div><div className="lore-note">{pressure.notes.map((note) => <p key={note}>▸ {note}</p>)}</div><div className="actions"><button onClick={() => sectorAction('curfew')}>Couvre-feu</button><button onClick={() => sectorAction('raid')}>Raid CP</button><button onClick={() => sectorAction('quarantine')}>Quarantaine</button><button onClick={() => sectorAction('seal')}>Sceller</button><button onClick={() => sectorAction('purge')}>Purge</button><button onClick={() => sectorAction('propaganda')}>{networkLabel} local</button></div><h3>Déploiement rapide</h3><div className="actions">{game.units.filter((u) => u.reserve > 0).slice(0, 8).map((u) => <button key={u.id} onClick={() => deploy(u)}>{u.name} ({u.reserve})</button>)}</div></div>
    <div className="panel sector-garrison-panel">
      <span className="brand-kicker">Garnison active</span>
      <h2>Unités stationnées — {sector.name}</h2>
      {garrison.length ? <div className="garrison-list">{garrison.map(({ unit, unitId, count }) => <span key={unitId}><strong>{unit?.name ?? unitId}</strong><b>{count}</b></span>)}</div> : <p className="muted">Aucune unité stationnée dans ce secteur.</p>}
      <p className="lore-note">Ces unités influencent directement surveillance, propagation Lambda et confinement Xen.</p>
    </div>
  </section>;
}

function Combine({ units, sector, deploy }: { units: Unit[]; sector: Sector; deploy: (u: Unit) => void }) {
  return <section className="cards unit-visual-grid">{units.map((u) => <article className="panel card unit-visual-card" key={u.id}><img src={getUnitVisual(u.id)} alt="" aria-hidden="true" loading="lazy" decoding="async" /><span className="brand-kicker">{u.category}</span><h2>{u.name}</h2><p>{u.description}</p><p><b>Force :</b> {u.strength}</p><p><b>Limite :</b> {u.weakness}</p><p className="lore-note">{u.lore}</p><button disabled={u.reserve <= 0} onClick={() => deploy(u)}>Déployer vers {sector.name} — Réserve {u.reserve}</button></article>)}</section>;
}

function DayDelta({ label, value, inverse = false }: { label: string; value: number; inverse?: boolean }) {
  const good = inverse ? value >= 0 : value <= 0;
  return <span className={value === 0 ? 'neutral' : good ? 'good' : 'bad'}><small>{label}</small><b>{value > 0 ? '+' : ''}{value}</b></span>;
}

function NovaProspektPanel({ nova, operations, applyOperation, changePolicy }: { nova: NovaProspektState; operations: NovaOperation[]; applyOperation: (operation: NovaOperation) => void; changePolicy: (policyId: string) => void }) {
  const atmosphere = getNovaAtmosphere(nova);
  const selectedPolicy = nova.policies.find((policy) => policy.id === nova.activePolicy) ?? nova.policies[0];
  const intakeRatio = Math.round((nova.zones.reduce((acc, zone) => acc + zone.detainees, 0) / Math.max(1, nova.zones.reduce((acc, zone) => acc + zone.capacity, 0))) * 100);

  return <section className="nova-layout">
    <div className="nova-hero panel">
      <img className="dossier-header-visual" src={getDossierVisual('nova_detainee')} alt="" aria-hidden="true" />
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

function Propaganda({ networkLabel, dynamicBreencast, strategies, globalAction, applyStrategy }: { networkLabel: string; dynamicBreencast: ReturnType<typeof buildDynamicBreencast>; strategies: typeof breencastStrategies; globalAction: (a: 'breencast' | 'ration_plus' | 'ration_cut' | 'advisor' | 'shadow_help') => void; applyStrategy: (strategyId: string) => void }) {
  return <section className="panel-grid propaganda-layout">
    <div className="panel breencast-main">
      <span className="brand-kicker">{networkLabel} synthesis node</span>
      <h2>{dynamicBreencast.recommended.title}</h2>
      <blockquote>{dynamicBreencast.recommended.publicLine}</blockquote>
      <p className="lore-note"><b>Intention cachée :</b> {dynamicBreencast.recommended.hiddenIntent}</p>
      <div className="mini-grid">
        <span>Crise dominante <b>{dynamicBreencast.dominantCrisis}</b></span>
        <span>Gravité rhétorique <b>{dynamicBreencast.recommended.severity}%</b></span>
        <span>Impact info <b>{dynamicBreencast.recommended.effects.info ?? 0}</b></span>
        <span>Risque social <b>{Math.max(0, (dynamicBreencast.recommended.effects.rebel ?? 0) + (dynamicBreencast.recommended.effects.fatigue ?? 0))}</b></span>
      </div>
      <div className="actions"><button onClick={() => globalAction('breencast')}>Diffuser via {networkLabel}</button><button onClick={() => globalAction('ration_cut')}>Associer au rationnement</button><button onClick={() => globalAction('advisor')}>Valider par Citadelle</button></div>
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

export default App;
