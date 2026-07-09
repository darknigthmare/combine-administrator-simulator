import type { CampaignId, DifficultyPresetId, GameState, OnboardingChapterId, OnboardingState, OnboardingTrackId, ProfileId, ScenarioId, Stats, TabId, TimelineId } from '../types/game';
import { onboardingChapters, onboardingFirstDayActions, onboardingTrackOrder, onboardingTracks, onboardingVersion } from '../data/onboarding';

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
  if (game.stats.xen > 55 || game.xenMutation.outbreakRisk > 60) warnings.push('Xen domine la journée : lire Quarantine Terminal avant toute opération CP.');
  if ((game.auditHeat ?? 0) > 60 || game.stats.suspicion > 65) warnings.push('Audit Advisor chaud : éviter les falsifications massives pendant le tutoriel.');
  if (game.rationEconomy.hungerIndex > 60) warnings.push('Faim élevée : le tutoriel recommande une stabilisation ration avant répression.');
  const recommendedNextChapter = onboardingChapters.find((chapter) => !completed.has(chapter.id))?.id ?? null;
  const recommendedTabs = Array.from(new Set([
    activeTrack.startingTab,
    ...onboardingChapters.filter((chapter) => !completed.has(chapter.id)).slice(0, 2).flatMap((chapter) => chapter.linkedTabs),
    'gameplay_balance' as TabId,
  ])).slice(0, 8);
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

export function completeOnboardingChapter(state: OnboardingState, chapterId: OnboardingChapterId): OnboardingState {
  const chapter = onboardingChapters.find((entry) => entry.id === chapterId);
  if (!chapter) return state;
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
  const statsDelta: Partial<Stats> = {
    info: 4,
    stability: game.stats.rebel > 60 || game.stats.xen > 60 ? 2 : 4,
    fatigue: -2,
    suspicion: active.id === 'sympathizer_double_game' ? 2 : -1,
    rations: active.id === 'alyx_quarantine_intake' ? -40 : -25,
  };
  if (active.id === 'uprising_survival_cell') {
    statsDelta.combine = 3;
    statsDelta.fear = 2;
    statsDelta.rebel = -2;
  }
  if (active.id === 'alyx_quarantine_intake') {
    statsDelta.xen = -2;
    statsDelta.info = 6;
  }
  if (active.id === 'nova_blackfile_intake') {
    statsDelta.suspicion = 3;
    statsDelta.fear = 2;
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
      `Première journée scriptée exécutée : ${active.title}.`,
      'Séquence appliquée : lecture COAN, inspection secteur, rationnement prudent, BreenCast mesuré, rapport prudent.',
      ...game.onboarding.briefingLog,
    ].slice(0, 60),
  };
  const logLines = [
    `COAN Intake : première journée guidée exécutée pour ${active.title}.`,
    'Séquence : dashboard → secteur critique → rationnement modéré → BreenCast mesuré → politique rapport prudente.',
    `Effet formation : info +${statsDelta.info ?? 0}, stabilité +${statsDelta.stability ?? 0}, fatigue ${statsDelta.fatigue ?? 0}.`,
  ];
  return { onboarding, statsDelta, logLines, suggestedTab: active.startingTab };
}
