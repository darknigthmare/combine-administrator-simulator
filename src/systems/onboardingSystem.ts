import type { CampaignId, DifficultyPresetId, GameState, OnboardingChapterId, OnboardingState, OnboardingTrackId, ProfileId, ScenarioId, Stats, TabId, TimelineId } from '../types/game';
import { onboardingChapters, onboardingFirstDayActions, onboardingTracks, onboardingVersion } from '../data/onboarding';

const now = () => new Date().toISOString();
const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

export type OnboardingStartConfig = {
  city: string;
  scenario: ScenarioId;
  timeline: TimelineId;
  profile: ProfileId;
  campaignId: CampaignId;
  difficultyPresetId: DifficultyPresetId;
  startingTab: TabId;
  lines: string[];
};

export type OnboardingView = {
  version: string;
  activeTrackId: OnboardingTrackId;
  activeTrack: typeof onboardingTracks[OnboardingTrackId];
  completedCount: number;
  totalChapters: number;
  progress: number;
  intakeScore: number;
  readyForFirstDay: boolean;
  recommendedNextChapter: OnboardingChapterId | null;
  chapters: typeof onboardingChapters;
  firstDayActions: typeof onboardingFirstDayActions;
  firstDayProgress: Array<{ action: (typeof onboardingFirstDayActions)[number]; completed: boolean }>;
  nextFirstDayAction: (typeof onboardingFirstDayActions)[number] | null;
  warnings: string[];
  recommendedTabs: TabId[];
};

export function inferOnboardingTrack(input: { scenario?: ScenarioId; timeline?: TimelineId; profile?: ProfileId; campaignId?: CampaignId; difficultyPresetId?: DifficultyPresetId }): OnboardingTrackId {
  if (input.profile === 'sympathizer' || input.timeline === 'citadel_collapse' || input.campaignId === 'isolated_citadel_city') return 'sympathizer_double_game';
  if (input.scenario === 'uprising' || input.timeline === 'uprising' || input.difficultyPresetId === 'uprising_nightmare') return 'uprising_survival_cell';
  if (input.scenario === 'post_nova' || input.timeline === 'post_nova_prospekt' || input.campaignId === 'post_nova_city') return 'nova_blackfile_intake';
  if (input.scenario === 'quarantine' || input.timeline === 'alyx_era' || input.difficultyPresetId === 'quarantine_blacksite') return 'alyx_quarantine_intake';
  return 'standard_command';
}

export function createInitialOnboardingState(input: { scenario: ScenarioId; timeline: TimelineId; profile: ProfileId; campaignId: CampaignId; difficultyPresetId: DifficultyPresetId }): OnboardingState {
  const activeTrackId = inferOnboardingTrack(input);
  return {
    schemaVersion: onboardingVersion,
    activeTrackId,
    completedChapterIds: [],
    visitedTabs: [],
    completedFirstDayActionIds: [],
    firstDayScriptArmed: false,
    firstDayScriptCompleted: false,
    intakeScore: 0,
    lastCompletedAt: null,
    briefingLog: [
      `COAN Intake initialisé : ${onboardingTracks[activeTrackId].title}.`,
      `Doctrine de départ : ${onboardingTracks[activeTrackId].doctrine}`,
    ],
  };
}

export function migrateOnboardingState(game: Partial<GameState>): OnboardingState {
  const fallback = createInitialOnboardingState({
    scenario: game.scenario ?? 'standard',
    timeline: game.timeline ?? 'pre_hl2',
    profile: game.profile ?? 'loyalist',
    campaignId: game.campaign?.activeCampaignId ?? 'custom_city_administration',
    difficultyPresetId: game.difficultySettings?.activePresetId ?? 'standard_occupation',
  });
  const existing = game.onboarding;
  if (!existing) return fallback;
  const activeTrackId = onboardingTracks[existing.activeTrackId] ? existing.activeTrackId : fallback.activeTrackId;
  const completedChapterIds = Array.from(new Set((existing.completedChapterIds ?? []).filter((id) => onboardingChapters.some((chapter) => chapter.id === id))));
  return {
    ...fallback,
    ...existing,
    schemaVersion: onboardingVersion,
    activeTrackId,
    completedChapterIds,
    visitedTabs: Array.from(new Set((existing.visitedTabs ?? []).filter(Boolean))),
    completedFirstDayActionIds: Array.from(new Set(existing.completedFirstDayActionIds ?? [])),
    firstDayScriptArmed: Boolean(existing.firstDayScriptArmed),
    firstDayScriptCompleted: Boolean(existing.firstDayScriptCompleted),
    intakeScore: clamp(existing.intakeScore ?? Math.round((completedChapterIds.length / onboardingChapters.length) * 100)),
    lastCompletedAt: existing.lastCompletedAt ?? null,
    briefingLog: (existing.briefingLog?.length ? existing.briefingLog : fallback.briefingLog).slice(0, 60),
  };
}

export function buildOnboardingView(game: GameState): OnboardingView {
  const onboarding = migrateOnboardingState(game);
  const activeTrack = onboardingTracks[onboarding.activeTrackId] ?? onboardingTracks.standard_command;
  const completed = new Set(onboarding.completedChapterIds);
  const completedCount = onboardingChapters.filter((chapter) => completed.has(chapter.id)).length;
  const progress = clamp((completedCount / onboardingChapters.length) * 100);
  const warnings: string[] = [];
  if (game.stats.rebel > 65) warnings.push('Lambda est déjà trop haut : prioriser Carte de City, Résistance et Overwatch avant la théorie.');
  if (game.uiuxProgression.unlocked.xen_bioscan && (game.stats.xen > 55 || game.xenMutation.outbreakRisk > 60)) warnings.push('Xen domine la journée : lire Quarantine Terminal avant toute opération CP.');
  if ((game.auditHeat ?? 0) > 60 || game.stats.suspicion > 65) warnings.push('Audit Advisor chaud : éviter les falsifications massives pendant le tutoriel.');
  if (game.rationEconomy.hungerIndex > 60) warnings.push('Faim élevée : le tutoriel recommande une stabilisation ration avant répression.');
  const recommendedNextChapter = onboardingChapters.find((chapter) => !completed.has(chapter.id))?.id ?? null;
  const recommendedTabs = Array.from(new Set([
    activeTrack.startingTab,
    ...onboardingChapters.filter((chapter) => !completed.has(chapter.id)).slice(0, 2).flatMap((chapter) => chapter.linkedTabs),
  ])).slice(0, 8);
  const firstDayProgress = getOnboardingFirstDayProgress(game);
  return {
    version: onboardingVersion,
    activeTrackId: onboarding.activeTrackId,
    activeTrack,
    completedCount,
    totalChapters: onboardingChapters.length,
    progress,
    intakeScore: clamp(Math.round((progress * 0.7) + (onboarding.firstDayScriptCompleted ? 30 : onboarding.firstDayScriptArmed ? 12 : 0))),
    readyForFirstDay: completedCount >= 4 && !onboarding.firstDayScriptCompleted,
    recommendedNextChapter,
    chapters: onboardingChapters,
    firstDayActions: onboardingFirstDayActions,
    firstDayProgress,
    nextFirstDayAction: firstDayProgress.find((entry) => !entry.completed)?.action ?? null,
    warnings,
    recommendedTabs,
  };
}

export function selectOnboardingTrack(state: OnboardingState, trackId: OnboardingTrackId): OnboardingState {
  const track = onboardingTracks[trackId] ?? onboardingTracks.standard_command;
  return {
    ...state,
    schemaVersion: onboardingVersion,
    activeTrackId: track.id,
    firstDayScriptArmed: false,
    intakeScore: clamp(state.intakeScore - 8),
    briefingLog: [`COAN Intake : piste sélectionnée — ${track.title}.`, `Doctrine : ${track.doctrine}`, ...state.briefingLog].slice(0, 60),
  };
}

export function recordOnboardingTabVisit(state: OnboardingState, tab: TabId): OnboardingState {
  if (state.visitedTabs.includes(tab)) return state;
  return { ...state, visitedTabs: [...state.visitedTabs, tab] };
}

export function recordOnboardingAction(state: OnboardingState, actionId: string): OnboardingState {
  const completedId = actionId.startsWith('policy:ration') || actionId.startsWith('ration:')
    ? 'ration_small'
    : actionId.startsWith('breencast:') || actionId === 'global:breencast' || actionId.endsWith(':propaganda')
      ? 'breencast_soft'
      : actionId.startsWith('policy:report')
        ? 'report_policy'
        : null;
  if (!completedId || state.completedFirstDayActionIds.includes(completedId)) return state;
  return { ...state, completedFirstDayActionIds: [...state.completedFirstDayActionIds, completedId] };
}

export function getOnboardingFirstDayProgress(game: GameState): OnboardingView['firstDayProgress'] {
  const visited = new Set(game.onboarding.visitedTabs);
  const completed = new Set(game.onboarding.completedFirstDayActionIds);
  return onboardingFirstDayActions.map((action) => ({
    action,
    completed: action.id === 'read_coan'
      ? visited.has('command_deck_v2')
      : action.id === 'inspect_sector'
        ? visited.has('sectors')
        : action.id === 'finish_day'
          ? game.day > 1
          : completed.has(action.id),
  }));
}

export function completeOnboardingChapter(state: OnboardingState, chapterId: OnboardingChapterId): OnboardingState {
  const chapter = onboardingChapters.find((entry) => entry.id === chapterId);
  if (!chapter) return state;
  if (!chapter.linkedTabs.some((tab) => state.visitedTabs.includes(tab))) return state;
  const completed = Array.from(new Set([...state.completedChapterIds, chapterId]));
  return {
    ...state,
    schemaVersion: onboardingVersion,
    completedChapterIds: completed,
    lastCompletedAt: now(),
    intakeScore: clamp((completed.length / onboardingChapters.length) * 100),
    firstDayScriptArmed: completed.length >= 4 ? true : state.firstDayScriptArmed,
    briefingLog: [`Chapitre validé : ${chapter.title}.`, `Leçon opérateur : ${chapter.operatorLesson}`, ...state.briefingLog].slice(0, 60),
  };
}

export function resetOnboardingFlow(game: GameState): OnboardingState {
  return createInitialOnboardingState({
    scenario: game.scenario,
    timeline: game.timeline,
    profile: game.profile,
    campaignId: game.campaign.activeCampaignId,
    difficultyPresetId: game.difficultySettings.activePresetId,
  });
}

export function buildGuidedStartConfig(trackId: OnboardingTrackId, cityFallback: string, difficultyOverride?: DifficultyPresetId): OnboardingStartConfig {
  const track = onboardingTracks[trackId] ?? onboardingTracks.standard_command;
  const city = (cityFallback.trim() || track.recommendedCity || '17').replace(/^City\s*/i, '');
  return {
    city,
    scenario: track.scenario,
    timeline: track.timeline,
    profile: track.profile,
    campaignId: track.campaignId,
    difficultyPresetId: difficultyOverride ?? track.difficultyPresetId,
    startingTab: 'onboarding',
    lines: [
      `COAN Intake guidé : ${track.title}.`,
      `City ${city} initialisée selon doctrine : ${track.doctrine}.`,
      ...track.briefingLines.slice(0, 2),
    ],
  };
}

export function resolveOnboardingFirstDay(game: GameState): { onboarding: OnboardingState; statsDelta: Partial<Stats>; logLines: string[]; suggestedTab: TabId } {
  const view = buildOnboardingView(game);
  const active = view.activeTrack;
  const statsDelta: Partial<Stats> = {};
  if (view.firstDayProgress.some((entry) => !entry.completed)) {
    return {
      onboarding: game.onboarding,
      statsDelta,
      logLines: ['COAN Intake : la boucle de première journée doit être exécutée manuellement.'],
      suggestedTab: view.nextFirstDayAction?.relatedTab ?? active.startingTab,
    };
  }
  const onboarding = {
    ...game.onboarding,
    schemaVersion: onboardingVersion,
    activeTrackId: active.id,
    completedChapterIds: Array.from(new Set([...game.onboarding.completedChapterIds, 'first_day' as OnboardingChapterId])),
    firstDayScriptArmed: true,
    firstDayScriptCompleted: true,
    intakeScore: 100,
    lastCompletedAt: now(),
    briefingLog: [
      `Première journée validée : ${active.title}.`,
      'Séquence exécutée par le joueur : lecture COAN, inspection secteur, rationnement, propagande mesurée, rapport prudent et clôture de cycle.',
      ...game.onboarding.briefingLog,
    ].slice(0, 60),
  };
  const logLines = [
    `COAN Intake : première journée validée pour ${active.title}.`,
    'Aucun bonus artificiel appliqué : les résultats proviennent des décisions réellement exécutées.',
  ];
  return { onboarding, statsDelta, logLines, suggestedTab: active.startingTab };
}
