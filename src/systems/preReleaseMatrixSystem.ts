import { campaignOrder } from '../data/campaignScenarios';
import { difficultyPresetOrder, difficultyPresets } from '../data/difficultySettings';
import { finalEndingDefinitions, finalEndingOrder } from '../data/finalVerdicts';
import { newGameIntakeDoctrineOrder } from '../data/newGameIntake';
import type { CampaignId, DifficultyPresetId, NewGameIntakeDoctrineId } from '../types/game';
import { buildNewGameIntakePreview, doctrineToConfig } from './newGameIntakeSystem';
import { runLongRunVerification } from './longRunSimulation';

export type PreReleaseMatrixCase = {
  doctrineId: NewGameIntakeDoctrineId;
  campaignId: CampaignId;
  difficultyId: DifficultyPresetId;
  danger: number;
  stabilityForecast: number;
  pass: boolean;
};

const pressureKeys = ['lambda', 'xen', 'citadel', 'civil', 'rations', 'nova', 'stabilityForecast', 'overallDanger'] as const;

function matrixCase(
  doctrineId: NewGameIntakeDoctrineId,
  campaignId: CampaignId,
  difficultyId: DifficultyPresetId,
): PreReleaseMatrixCase {
  const base = doctrineToConfig(doctrineId);
  const preview = buildNewGameIntakePreview({
    ...base,
    campaignId,
    difficultyPresetId: difficultyId,
    difficultyScalars: difficultyId === 'custom' ? difficultyPresets.custom.scalars : undefined,
    useCampaignRecommendations: campaignId !== 'custom_city_administration',
  });
  const pressuresAreValid = pressureKeys.every((key) => Number.isFinite(preview.pressure[key])
    && preview.pressure[key] >= 0
    && preview.pressure[key] <= 100);
  const statsAreValid = Object.values(preview.stats).every(Number.isFinite)
    && preview.stats.rations >= 0
    && preview.resolved.city.length > 0;
  return {
    doctrineId,
    campaignId,
    difficultyId,
    danger: preview.pressure.overallDanger,
    stabilityForecast: preview.pressure.stabilityForecast,
    pass: pressuresAreValid && statsAreValid,
  };
}

export function runPreReleaseMatrix() {
  const cases = newGameIntakeDoctrineOrder.flatMap((doctrineId) => campaignOrder.flatMap((campaignId) => (
    difficultyPresetOrder.map((difficultyId) => matrixCase(doctrineId, campaignId, difficultyId))
  )));
  const canonical = matrixCase('canonical_city17', 'city17_pre_hl2', 'standard_occupation');
  const endingsComplete = finalEndingOrder.every((id) => {
    const ending = finalEndingDefinitions[id];
    return ending?.id === id
      && ending.title.length > 0
      && ending.publicConclusion.length > 0
      && ending.hiddenConclusion.length > 0
      && ending.archiveTags.length > 0;
  });
  const longRun = runLongRunVerification();
  const checks = [
    { label: `${cases.length}-configurations-initiales-valides`, pass: cases.every((entry) => entry.pass) },
    { label: 'premier-mandat-sans-crise-artificielle', pass: canonical.danger < 62 && canonical.stabilityForecast >= 35 },
    { label: `${finalEndingOrder.length}-verdicts-documentes`, pass: endingsComplete },
    { label: 'progression-longue-soutenable', pass: longRun.ok },
  ];
  return {
    ok: checks.every((check) => check.pass),
    checks,
    cases,
    canonical,
    endings: finalEndingOrder.length,
    longRun,
  };
}
