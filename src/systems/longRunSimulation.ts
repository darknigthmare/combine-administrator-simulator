import type { Stats, UiuxUnlockId } from '../types/game';
import { getNextCampaignDay } from './campaignSystem';
import { getCrisisCadence } from './eventDirector';
import { calculateUiuxIncome, calculateUiuxUpkeep, createInitialUiuxProgressionState, simulateUiuxProgressionDay } from './uiuxProgressionSystem';

const unlockIds: UiuxUnlockId[] = [
  'citizen_intake',
  'ota_command',
  'xen_bioscan',
  'nova_prospekt_link',
  'advisor_channel',
  'rail_network',
  'ravenholm_blacklist',
  'synth_requisition',
];

const baselineStats: Stats = {
  stability: 68,
  loyalty: 42,
  fear: 48,
  rebel: 32,
  xen: 20,
  combine: 66,
  production: 72,
  rations: 1600,
  citadel: 76,
  info: 68,
  fatigue: 28,
  civilianLosses: 0,
  combineLosses: 0,
  suspicion: 18,
};

function buildUnlockMap(activeIds: UiuxUnlockId[]) {
  const active = Object.fromEntries(unlockIds.map((id) => [id, activeIds.includes(id)])) as Record<UiuxUnlockId, boolean>;
  return active;
}

export type LongRunScenario = {
  name: string;
  days: number;
  stats: Stats;
  activeIds: UiuxUnlockId[];
};

export type LongRunResult = {
  name: string;
  days: number;
  crisisDays: number;
  quietDays: number;
  criticalPenaltyDays: number;
  minimumRawResource: number;
  finalResources: { requisition: number; data: number; compliance: number };
  dailyNet: { requisition: number; data: number; compliance: number };
  load: number;
};

export function simulateLongRunWindow(scenario: LongRunScenario): LongRunResult {
  const active = buildUnlockMap(scenario.activeIds);
  let progression = {
    ...createInitialUiuxProgressionState(),
    unlocked: { ...active },
    active: { ...active },
    resources: { requisition: 500, data: 300, compliance: 120 },
  };
  const upkeep = calculateUiuxUpkeep(active);
  const income = calculateUiuxIncome(active, scenario.stats);
  let crisisDays = 0;
  let criticalPenaltyDays = 0;
  let minimumRawResource = Number.POSITIVE_INFINITY;

  for (let day = 1; day <= scenario.days; day += 1) {
    if (getCrisisCadence({ stats: scenario.stats, day }).scheduled) crisisDays += 1;
    const raw = [
      progression.resources.requisition + income.requisition - upkeep.requisition,
      progression.resources.data + income.data - upkeep.data,
      progression.resources.compliance + income.compliance - upkeep.compliance,
    ];
    minimumRawResource = Math.min(minimumRawResource, ...raw);
    progression = simulateUiuxProgressionDay(progression, scenario.stats, day).state;
    if (progression.consecutiveCriticalDays >= 2) criticalPenaltyDays += 1;
  }

  return {
    name: scenario.name,
    days: scenario.days,
    crisisDays,
    quietDays: scenario.days - crisisDays,
    criticalPenaltyDays,
    minimumRawResource,
    finalResources: progression.resources,
    dailyNet: {
      requisition: income.requisition - upkeep.requisition,
      data: income.data - upkeep.data,
      compliance: income.compliance - upkeep.compliance,
    },
    load: upkeep.load,
  };
}

const scenarios: LongRunScenario[] = [
  {
    name: 'stabilisation-10j',
    days: 10,
    stats: { ...baselineStats, stability: 76, rebel: 24, xen: 14, suspicion: 10, fatigue: 20, production: 66 },
    activeIds: ['citizen_intake'],
  },
  {
    name: 'occupation-20j',
    days: 20,
    stats: { ...baselineStats, stability: 65, rebel: 40, xen: 28, suspicion: 20, fatigue: 32, production: 75 },
    activeIds: ['citizen_intake', 'ota_command', 'rail_network'],
  },
  {
    name: 'containment-30j',
    days: 30,
    stats: { ...baselineStats, stability: 50, rebel: 58, xen: 45, suspicion: 38, fatigue: 50, production: 92, info: 90, citadel: 100 },
    activeIds: ['citizen_intake', 'ota_command', 'xen_bioscan', 'nova_prospekt_link', 'advisor_channel', 'rail_network'],
  },
  {
    name: 'guerre-ouverte-50j',
    days: 50,
    stats: { ...baselineStats, stability: 35, rebel: 78, xen: 65, suspicion: 60, fatigue: 70, production: 100, info: 100, citadel: 100 },
    activeIds: ['citizen_intake', 'ota_command', 'xen_bioscan', 'nova_prospekt_link', 'advisor_channel', 'rail_network', 'synth_requisition'],
  },
];

function campaignCalendarIsExact(durationDays: number) {
  let day = 1;
  const processedDays: number[] = [];
  for (let index = 0; index < durationDays; index += 1) {
    processedDays.push(day);
    day = getNextCampaignDay(day, durationDays, index === durationDays - 1);
  }
  return day === durationDays && processedDays.every((processedDay, index) => processedDay === index + 1);
}

export function runLongRunVerification() {
  const results = scenarios.map(simulateLongRunWindow);
  const checks = [
    ...[10, 20, 30, 50].map((duration) => ({ label: `calendrier-${duration}j`, pass: campaignCalendarIsExact(duration) })),
    ...results.map((result) => ({ label: `${result.name}-jours-calmes`, pass: result.quietDays > 0 })),
    ...results.map((result) => ({ label: `${result.name}-ressources`, pass: result.minimumRawResource >= 0 })),
    ...results.map((result) => ({ label: `${result.name}-charge`, pass: result.load < 90 && result.criticalPenaltyDays === 0 })),
    { label: 'pression-produit-des-crises', pass: results.every((result) => result.crisisDays > 0) },
    { label: 'arsenal-complet-soutenable', pass: Object.values(results.at(-1)?.dailyNet ?? {}).every((value) => value >= 0) },
  ];
  return { ok: checks.every((check) => check.pass), checks, scenarios: results };
}
