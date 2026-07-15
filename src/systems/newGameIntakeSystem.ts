import type { DifficultyPresetId, NewGameIntakeConfig, NewGameIntakeDoctrineId, NewGameIntakePreview, NewGameIntakeResolvedConfig, NewGameIntakeThreatBand, OnboardingTrackId, ProfileId, ScenarioId, Stats, TimelineId } from '../types/game';
import { baseStats, campaignPresets, difficultyPresets, newGameIntakeDoctrines, onboardingTracks, profileEffects, scenarioEffects, timelinePresets } from '../data';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const addStats = (base: Stats, effects: Partial<Stats>): Stats => ({
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

const band = (value: number): NewGameIntakeThreatBand => {
  if (value >= 82) return 'extreme';
  if (value >= 62) return 'high';
  if (value >= 36) return 'medium';
  return 'low';
};

const cleanCity = (city: string, fallback: string) => (city.trim() || fallback || '17').replace(/^City\s*/i, '').trim() || '17';

export function doctrineToConfig(doctrineId: NewGameIntakeDoctrineId, cityOverride = ''): NewGameIntakeConfig {
  const doctrine = newGameIntakeDoctrines[doctrineId] ?? newGameIntakeDoctrines.canonical_city17;
  return {
    city: cleanCity(cityOverride, doctrine.citySuggestion),
    doctrineId,
    campaignId: doctrine.campaignId,
    scenario: doctrine.scenario,
    timeline: doctrine.timeline,
    profile: doctrine.profile,
    difficultyPresetId: doctrine.difficultyPresetId,
    onboardingTrackId: doctrine.onboardingTrackId,
    useCampaignRecommendations: doctrine.campaignId !== 'custom_city_administration',
  };
}

export function resolveNewGameIntakeConfig(config: NewGameIntakeConfig): NewGameIntakeResolvedConfig {
  const doctrine = newGameIntakeDoctrines[config.doctrineId] ?? newGameIntakeDoctrines.manual;
  const campaign = campaignPresets[config.campaignId] ?? campaignPresets.custom_city_administration;
  const track = onboardingTracks[config.onboardingTrackId] ?? onboardingTracks.standard_command;
  const useCampaignRecommendations = config.useCampaignRecommendations && config.campaignId !== 'custom_city_administration';
  const city = cleanCity(config.city, useCampaignRecommendations ? campaign.recommendedCity : doctrine.citySuggestion);
  const scenario: ScenarioId = useCampaignRecommendations ? campaign.recommendedScenario : config.scenario;
  const timeline: TimelineId = useCampaignRecommendations ? campaign.recommendedTimeline : config.timeline;
  const profile: ProfileId = useCampaignRecommendations ? campaign.recommendedProfile : config.profile;
  const difficultyPresetId: DifficultyPresetId = difficultyPresets[config.difficultyPresetId] ? config.difficultyPresetId : 'standard_occupation';
  const difficulty = difficultyPresetId === 'custom' && config.difficultyScalars
    ? { ...difficultyPresets.custom, scalars: { ...config.difficultyScalars } }
    : difficultyPresets[difficultyPresetId];
  const onboardingTrackId: OnboardingTrackId = onboardingTracks[config.onboardingTrackId] ? config.onboardingTrackId : track.id;
  return {
    city,
    doctrine,
    campaign,
    scenario,
    timeline,
    profile,
    difficulty,
    onboardingTrack: onboardingTracks[onboardingTrackId],
    useCampaignRecommendations,
  };
}

export function buildNewGameIntakePreview(config: NewGameIntakeConfig): NewGameIntakePreview {
  const resolved = resolveNewGameIntakeConfig(config);
  let stats = { ...baseStats };
  stats = addStats(stats, scenarioEffects[resolved.scenario] ?? {});
  stats = addStats(stats, timelinePresets[resolved.timeline]?.statEffects ?? {});
  stats = addStats(stats, resolved.campaign.startingEffects ?? {});
  stats = addStats(stats, profileEffects[resolved.profile] ?? {});
  stats = addStats(stats, resolved.difficulty.startingEffects ?? {});

  const s = resolved.difficulty.scalars;
  const lambdaPressure = clamp(stats.rebel * s.lambdaForce + (resolved.campaign.dailyEffects.rebel ?? 0) * 5 + (resolved.scenario === 'post_nova' ? 10 : 0));
  const xenPressure = clamp(stats.xen * s.xenVelocity + (resolved.campaign.dailyEffects.xen ?? 0) * 6 + (resolved.timeline === 'alyx_era' ? 8 : 0));
  const citadelPressure = clamp((100 - stats.citadel) * resolved.difficulty.scalars.citadelSeverity + stats.suspicion * resolved.difficulty.scalars.reportAuditStrictness * 0.65);
  const civilStress = clamp((stats.fear * 0.28) + ((100 - stats.loyalty) * 0.32) + stats.fatigue * resolved.difficulty.scalars.citizenFragility * 0.35 + (resolved.difficulty.scalars.rationScarcity - 1) * 20);
  const rationRisk = clamp((resolved.difficulty.scalars.rationScarcity * 42) + (stats.rations < 1200 ? 22 : stats.rations < 1800 ? 8 : -8) + (100 - stats.production) * 0.18);
  const novaRisk = clamp((resolved.scenario === 'post_nova' ? 34 : 10) + (resolved.timeline === 'post_nova_prospekt' ? 24 : 0) + resolved.difficulty.scalars.novaPressure * 22 + (resolved.profile === 'collaborator' ? 8 : 0));
  const stabilityForecast = clamp(stats.stability - lambdaPressure * 0.16 - xenPressure * 0.14 - civilStress * 0.12 - citadelPressure * 0.08 + stats.combine * 0.06);
  const overallDanger = clamp(lambdaPressure * 0.18 + xenPressure * 0.18 + citadelPressure * 0.16 + civilStress * 0.18 + rationRisk * 0.14 + novaRisk * 0.12 + (100 - stabilityForecast) * 0.18);

  const warnings: string[] = [];
  if (resolved.useCampaignRecommendations) warnings.push('Campagne verrouillée : scénario, timeline et profil suivent les recommandations lore de la campagne.');
  if (lambdaPressure > 70) warnings.push('Lambda peut atteindre une coordination dangereuse dès les premières journées.');
  if (xenPressure > 70) warnings.push('Xen démarre comme biosphère active : mutations/quarantaines prioritaires.');
  if (citadelPressure > 65) warnings.push('Attention Advisor : rapports falsifiés et directives échouées seront moins tolérés.');
  if (rationRisk > 65) warnings.push('Rations fragiles : marché noir et faim peuvent nourrir Lambda avant même les raids.');
  if (novaRisk > 65) warnings.push('Nova Prospekt sera politiquement visible : les transferts peuvent devenir mémoire publique.');
  if (warnings.length === 0) warnings.push('Mandat lisible : les systèmes restent tendus mais administrables pour une première session.');

  const recommendedFirstTabs = Array.from(new Set([
    resolved.onboardingTrack.startingTab,
    overallDanger > 75 ? 'gameplay_balance' : 'dashboard',
    lambdaPressure > xenPressure ? 'resistance' : 'xen',
    rationRisk > 55 ? 'rationing' : 'sectors',
    novaRisk > 60 ? 'nova' : 'reports',
  ] as const));

  return {
    resolved,
    stats,
    pressure: {
      lambda: lambdaPressure,
      xen: xenPressure,
      citadel: citadelPressure,
      civil: civilStress,
      rations: rationRisk,
      nova: novaRisk,
      stabilityForecast,
      overallDanger,
    },
    bands: {
      lambda: band(lambdaPressure),
      xen: band(xenPressure),
      citadel: band(citadelPressure),
      civil: band(civilStress),
      rations: band(rationRisk),
      nova: band(novaRisk),
      overall: band(overallDanger),
    },
    warnings,
    recommendedFirstTabs,
    summary: [
      `City ${resolved.city} — ${resolved.campaign.name}`,
      `${timelinePresets[resolved.timeline]?.name ?? resolved.timeline} / ${resolved.difficulty.name}`,
      `Doctrine : ${resolved.doctrine.doctrineLine}`,
      `Prévision stabilité : ${stabilityForecast}% / danger global ${overallDanger}%.`,
    ],
  };
}
