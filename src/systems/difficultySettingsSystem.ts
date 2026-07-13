import type { DifficultyPresetId, DifficultyScalarKey, DifficultySettingsState, GameState, Sector, Stats } from '../types/game';
import { difficultyPresets, difficultyScalarLabels } from '../data/difficultySettings';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const clampScalar = (value: number) => Math.max(0.35, Math.min(2.0, Number(value.toFixed(2))));

export const difficultyScalarKeys: DifficultyScalarKey[] = [
  'lambdaForce',
  'xenVelocity',
  'citadelSeverity',
  'advisorTolerance',
  'rationScarcity',
  'productionBase',
  'cpBrutality',
  'novaPressure',
  'technologyDebt',
  'campaignPressure',
  'citizenFragility',
  'reportAuditStrictness',
];

export function createInitialDifficultySettings(presetId: DifficultyPresetId = 'standard_occupation'): DifficultySettingsState {
  const preset = difficultyPresets[presetId] ?? difficultyPresets.standard_occupation;
  return {
    activePresetId: presetId,
    customName: presetId === 'custom' ? 'Profil custom COAN' : preset.name,
    scalars: { ...preset.scalars },
    lastAppliedDay: 0,
    projectedThreat: calculateDifficultyThreat(preset.scalars),
    auditModifier: calculateAuditModifier(preset.scalars),
    dailyPressure: calculateDailyPressure(preset.scalars),
    startSummary: buildStartSummary(presetId, preset.scalars),
    log: [`Profil difficulté initialisé : ${preset.name}.`],
  };
}

export function migrateDifficultySettings(game: Partial<GameState>): DifficultySettingsState {
  const existing = game.difficultySettings as DifficultySettingsState | undefined;
  if (!existing) return createInitialDifficultySettings('standard_occupation');
  const presetId = existing.activePresetId ?? 'standard_occupation';
  const base = createInitialDifficultySettings(presetId);
  const scalars = { ...base.scalars, ...(existing.scalars ?? {}) };
  return {
    ...base,
    ...existing,
    activePresetId: presetId,
    scalars,
    projectedThreat: calculateDifficultyThreat(scalars),
    auditModifier: calculateAuditModifier(scalars),
    dailyPressure: calculateDailyPressure(scalars),
    log: existing.log?.length ? existing.log : base.log,
  };
}

export function setDifficultyPreset(state: DifficultySettingsState, presetId: DifficultyPresetId): { difficultySettings: DifficultySettingsState; lines: string[] } {
  const preset = difficultyPresets[presetId] ?? difficultyPresets.standard_occupation;
  const scalars = { ...preset.scalars };
  const next: DifficultySettingsState = {
    ...state,
    activePresetId: presetId,
    customName: preset.name,
    scalars,
    projectedThreat: calculateDifficultyThreat(scalars),
    auditModifier: calculateAuditModifier(scalars),
    dailyPressure: calculateDailyPressure(scalars),
    startSummary: buildStartSummary(presetId, scalars),
    log: [`Profil difficulté sélectionné : ${preset.name}.`, ...state.log].slice(0, 50),
  };
  return { difficultySettings: next, lines: [`Profil difficulté sélectionné : ${preset.name}.`, preset.loreFrame] };
}

export function updateDifficultyScalar(state: DifficultySettingsState, key: DifficultyScalarKey, value: number): DifficultySettingsState {
  const scalars = { ...state.scalars, [key]: clampScalar(value) };
  const label = difficultyScalarLabels[key]?.label ?? key;
  return {
    ...state,
    activePresetId: 'custom',
    customName: 'Profil custom COAN',
    scalars,
    projectedThreat: calculateDifficultyThreat(scalars),
    auditModifier: calculateAuditModifier(scalars),
    dailyPressure: calculateDailyPressure(scalars),
    startSummary: buildStartSummary('custom', scalars),
    log: [`Curseur custom ajusté : ${label} ×${scalars[key].toFixed(2)}.`, ...state.log].slice(0, 50),
  };
}

export function resetCustomDifficulty(state: DifficultySettingsState): DifficultySettingsState {
  return setDifficultyPreset(state, 'standard_occupation').difficultySettings;
}

export function applyDifficultyStartingEffects(stats: Stats, difficulty: DifficultySettingsState): Stats {
  const preset = difficultyPresets[difficulty.activePresetId] ?? difficultyPresets.standard_occupation;
  const scalars = difficulty.scalars;
  const scalarEffects: Partial<Stats> = {
    rebel: Math.round((scalars.lambdaForce - 1) * 18),
    xen: Math.round((scalars.xenVelocity - 1) * 18),
    citadel: Math.round((1 - scalars.citadelSeverity) * 10 + (scalars.advisorTolerance - 1) * 8),
    suspicion: Math.round((scalars.reportAuditStrictness - 1) * 14 + (1 - scalars.advisorTolerance) * 18),
    rations: Math.round((1 - scalars.rationScarcity) * 800),
    production: Math.round((scalars.productionBase - 1) * 20 - (scalars.technologyDebt - 1) * 8),
    fear: Math.round((scalars.cpBrutality - 1) * 12 + (scalars.novaPressure - 1) * 8),
    loyalty: Math.round((1 - scalars.citizenFragility) * 10 - (scalars.cpBrutality - 1) * 8),
    fatigue: Math.round((scalars.campaignPressure - 1) * 12 + (scalars.rationScarcity - 1) * 10),
  };
  return applyStatsDelta(applyStatsDelta(stats, preset.startingEffects), scalarEffects);
}

export function applyDifficultySectorEffects(sectors: Sector[], difficulty: DifficultySettingsState): Sector[] {
  const preset = difficultyPresets[difficulty.activePresetId] ?? difficultyPresets.standard_occupation;
  const scalars = difficulty.scalars;
  return sectors.map((sector) => {
    const lambdaZoneBias = ['Souterrain', 'Résidentiel', 'Infrastructure'].includes(sector.zone) ? 1.15 : 0.75;
    const xenZoneBias = ['Souterrain', 'Quarantaine', 'Périphérie'].includes(sector.zone) ? 1.2 : 0.65;
    const rebelDelta = Math.round((preset.sectorEffects.rebel ?? 0) + (scalars.lambdaForce - 1) * 16 * lambdaZoneBias);
    const xenDelta = Math.round((preset.sectorEffects.xen ?? 0) + (scalars.xenVelocity - 1) * 16 * xenZoneBias);
    const surveillanceDelta = Math.round((preset.sectorEffects.surveillance ?? 0) + (scalars.cpBrutality - 1) * 9 - (scalars.lambdaForce - 1) * 4);
    const infrastructureDelta = Math.round((preset.sectorEffects.infrastructure ?? 0) + (scalars.productionBase - 1) * 8 - (scalars.technologyDebt - 1) * 6 - (scalars.xenVelocity - 1) * 5);
    const loyaltyDelta = Math.round((preset.sectorEffects.loyalty ?? 0) - (scalars.rationScarcity - 1) * 7 - (scalars.cpBrutality - 1) * 7 - (scalars.novaPressure - 1) * 4);
    const fearDelta = Math.round((preset.sectorEffects.fear ?? 0) + (scalars.cpBrutality - 1) * 9 + (scalars.xenVelocity - 1) * 6 + (scalars.novaPressure - 1) * 4);
    const nextXen = clamp(sector.xen + xenDelta);
    const nextRebel = clamp(sector.rebel + rebelDelta);
    const status = nextXen > 78 ? 'Infesté' : nextXen > 55 ? 'Contaminé' : nextRebel > 78 ? 'Insurgé' : nextRebel > 55 ? 'Saboté' : sector.status;
    return {
      ...sector,
      rebel: nextRebel,
      xen: nextXen,
      surveillance: clamp(sector.surveillance + surveillanceDelta),
      infrastructure: clamp(sector.infrastructure + infrastructureDelta),
      loyalty: clamp(sector.loyalty + loyaltyDelta),
      fear: clamp(sector.fear + fearDelta),
      status,
    };
  });
}

export function simulateDifficultyDay({ difficulty, stats: _stats, sectors, day }: { difficulty: DifficultySettingsState; stats: Stats; sectors: Sector[]; day: number }): { statsDelta: Partial<Stats>; sectors: Sector[]; difficultySettings: DifficultySettingsState; lines: string[] } {
  const s = difficulty.scalars;
  const statsDelta: Partial<Stats> = {
    rebel: Math.round((s.lambdaForce - 1) * 3 + (s.citizenFragility - 1) * 2 + (s.rationScarcity - 1) * 2),
    xen: Math.round((s.xenVelocity - 1) * 3 + (s.technologyDebt - 1) * 1),
    suspicion: Math.round((s.reportAuditStrictness - 1) * 2 + (1 - s.advisorTolerance) * 3 + (s.citadelSeverity - 1) * 2),
    fatigue: Math.round((s.campaignPressure - 1) * 2 + (s.rationScarcity - 1) * 2 + (s.citizenFragility - 1) * 2),
    production: Math.round((s.productionBase - 1) * 2 - (s.technologyDebt - 1) * 2 - (s.rationScarcity - 1) * 1),
    loyalty: Math.round((1 - s.citizenFragility) * 1 - (s.cpBrutality - 1) * 2 - (s.novaPressure - 1) * 1),
    fear: Math.round((s.cpBrutality - 1) * 2 + (s.xenVelocity - 1) * 1 + (s.citadelSeverity - 1) * 1),
    rations: Math.round((1 - s.rationScarcity) * 120 + (s.productionBase - 1) * 80),
    citadel: Math.round((1 - s.citadelSeverity) * 1 + (s.advisorTolerance - 1) * 1),
  };
  const adjustedSectors = sectors.map((sector) => {
    const underground = ['Souterrain', 'Quarantaine', 'Périphérie'].includes(sector.zone);
    const residential = sector.zone === 'Résidentiel';
    return {
      ...sector,
      rebel: clamp(sector.rebel + Math.round((s.lambdaForce - 1) * (residential ? 2 : 1))),
      xen: clamp(sector.xen + Math.round((s.xenVelocity - 1) * (underground ? 2 : 1))),
      fear: clamp(sector.fear + Math.round((s.cpBrutality - 1) * 1 + (s.xenVelocity - 1) * (underground ? 1 : 0))),
      loyalty: clamp(sector.loyalty - Math.max(0, Math.round((s.rationScarcity - 1) * (residential ? 2 : 1)))) ,
    };
  });
  const pressure = calculateDailyPressure(s);
  const threat = calculateDifficultyThreat(s);
  const next: DifficultySettingsState = {
    ...difficulty,
    lastAppliedDay: day,
    projectedThreat: threat,
    auditModifier: calculateAuditModifier(s),
    dailyPressure: pressure,
    log: [`JOUR ${String(day).padStart(3, '0')} — Pression difficulté appliquée : menace ${threat}%, pression ${pressure}%.`, ...difficulty.log].slice(0, 50),
  };
  const lines = [
    `Difficulté COAN : ${difficultyPresets[difficulty.activePresetId]?.name ?? difficulty.customName} / menace projetée ${threat}% / pression quotidienne ${pressure}%.`,
    `Modulateurs : Lambda ×${s.lambdaForce.toFixed(2)}, Xen ×${s.xenVelocity.toFixed(2)}, Citadel ×${s.citadelSeverity.toFixed(2)}, Advisor tolerance ×${s.advisorTolerance.toFixed(2)}.`,
  ];
  return { statsDelta, sectors: adjustedSectors, difficultySettings: next, lines };
}

export function calculateDifficultyThreat(scalars: DifficultySettingsState['scalars']): number {
  const hostile = scalars.lambdaForce + scalars.xenVelocity + scalars.citadelSeverity + scalars.rationScarcity + scalars.cpBrutality + scalars.novaPressure + scalars.technologyDebt + scalars.campaignPressure + scalars.citizenFragility + scalars.reportAuditStrictness;
  const relief = scalars.productionBase + scalars.advisorTolerance;
  return clamp(((hostile / 10) * 62) - ((relief / 2) * 18) + 38);
}

export function calculateAuditModifier(scalars: DifficultySettingsState['scalars']): number {
  return clamp((scalars.reportAuditStrictness * 46) + ((1 / Math.max(0.35, scalars.advisorTolerance)) * 34) + (scalars.citadelSeverity * 20) - 45);
}

export function calculateDailyPressure(scalars: DifficultySettingsState['scalars']): number {
  return clamp((scalars.lambdaForce * 12) + (scalars.xenVelocity * 12) + (scalars.rationScarcity * 9) + (scalars.campaignPressure * 11) + (scalars.citizenFragility * 8) + (scalars.citadelSeverity * 8) - (scalars.productionBase * 8) - (scalars.advisorTolerance * 4));
}

function buildStartSummary(presetId: DifficultyPresetId, scalars: DifficultySettingsState['scalars']): string {
  const preset = difficultyPresets[presetId] ?? difficultyPresets.standard_occupation;
  return `${preset.name} — Lambda ×${scalars.lambdaForce.toFixed(2)}, Xen ×${scalars.xenVelocity.toFixed(2)}, rations ×${scalars.rationScarcity.toFixed(2)}, audit ×${scalars.reportAuditStrictness.toFixed(2)}.`;
}

function applyStatsDelta(base: Stats, effects: Partial<Stats>): Stats {
  return {
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
  };
}
