import type { Sector, Stats, TimelineId, TimelinePreset, Unit } from '../types/game';
import { timelinePresets } from '../data/timelinePresets';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

function addStat(base: Stats, effects: Partial<Stats>): Stats {
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

export function getTimelinePreset(timeline: TimelineId): TimelinePreset {
  return timelinePresets[timeline] ?? timelinePresets.pre_hl2;
}

export function applyTimelineToStats(stats: Stats, timeline: TimelineId): Stats {
  return addStat(stats, getTimelinePreset(timeline).statEffects);
}

export function applyTimelineDailyPressure(stats: Stats, timeline: TimelineId): Stats {
  return addStat(stats, getTimelinePreset(timeline).dailyEffects);
}

export function applyTimelineToSectors(sectors: Sector[], timeline: TimelineId): Sector[] {
  const preset = getTimelinePreset(timeline);
  return sectors.map((sector) => {
    const matches = preset.sectorEffects.filter((effect) => effect.sectorIds.includes(sector.id));
    if (matches.length === 0) return sector;
    return matches.reduce<Sector>((current, effect) => ({
      ...current,
      rebel: clamp(current.rebel + (effect.rebel ?? 0)),
      xen: clamp(current.xen + (effect.xen ?? 0)),
      surveillance: clamp(current.surveillance + (effect.surveillance ?? 0)),
      infrastructure: clamp(current.infrastructure + (effect.infrastructure ?? 0)),
      loyalty: clamp(current.loyalty + (effect.loyalty ?? 0)),
      fear: clamp(current.fear + (effect.fear ?? 0)),
      status: effect.status ?? current.status,
    }), sector);
  });
}

export function applyTimelineToUnits(units: Unit[], timeline: TimelineId): Unit[] {
  const overrides = getTimelinePreset(timeline).unitReserveOverrides;
  return units.map((unit) => {
    if (!isUnitAvailableInTimeline(unit.id, timeline)) return { ...unit, reserve: 0 };
    return overrides[unit.id] === undefined ? unit : { ...unit, reserve: overrides[unit.id] ?? unit.reserve };
  });
}

const alyxEraUnits = new Set(['grunt', 'ordinal', 'suppressor']);
const episodeEraUnits = new Set(['hunter']);

export function isUnitAvailableInTimeline(unitId: string, timeline: TimelineId): boolean {
  if (alyxEraUnits.has(unitId)) return timeline === 'alyx_era';
  if (episodeEraUnits.has(unitId)) return ['post_nova_prospekt', 'uprising', 'citadel_collapse'].includes(timeline);
  if (unitId === 'elite') return !['seven_hour_aftermath', 'early_occupation', 'alyx_era'].includes(timeline);
  if (unitId === 'soldier') return timeline !== 'alyx_era';
  return true;
}

export function getUnitTimelineAvailabilityReason(unitId: string, timeline: TimelineId): string {
  if (isUnitAvailableInTimeline(unitId, timeline)) return 'Unité compatible avec la fenêtre chronologique active.';
  if (alyxEraUnits.has(unitId)) return 'Unité réservée à la période Half-Life: Alyx.';
  if (episodeEraUnits.has(unitId)) return 'Synthèse réservée aux périodes post-Nova Prospekt et Episodes.';
  return 'Modèle indisponible dans cette fenêtre chronologique.';
}

export function getTimelineDirectiveWeight(stat: keyof Stats, timeline: TimelineId): number {
  return getTimelinePreset(timeline).directiveBias.includes(stat) ? 2 : 1;
}

export function getTimelineReportLines(timeline: TimelineId): string[] {
  const preset = getTimelinePreset(timeline);
  return [
    `Fenêtre chronologique : ${preset.name}.`,
    `Contexte canonique : ${preset.canonWindow}.`,
    ...preset.availabilityNotes.map((note) => `Note disponibilité : ${note}`),
  ];
}

export function getTimelineThreatMultiplier(kind: 'rebellion' | 'xen' | 'citadel' | 'civil' | 'moral', timeline: TimelineId): number {
  return getTimelinePreset(timeline).eventBias[kind];
}
