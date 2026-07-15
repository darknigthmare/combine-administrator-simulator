/**
 * Step 4 event director.
 * Chooses lore events according to the current city pressure instead of using a pure array pick.
 */
import type { Crisis, Sector, Stats, TimelineId, UiuxUnlockId } from '../types/game';
import { getTimelineThreatMultiplier, isBreenCastTimeline } from './timelineSystem';

type EventDirectorInput = {
  crises: Crisis[];
  sectors: Sector[];
  stats: Stats;
  day: number;
  timeline?: TimelineId;
  unlocked?: Record<UiuxUnlockId, boolean>;
  crisisHistory?: string[];
};

function deterministicNoise(seed: number, text: string) {
  let hash = seed * 131;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) % 9973;
  return hash % 37;
}

function typePressure(crisis: Crisis, stats: Stats) {
  switch (crisis.type) {
    case 'REBELLION': return stats.rebel * 1.35 + (100 - stats.loyalty) * 0.32 + stats.fatigue * 0.25;
    case 'XEN': return stats.xen * 1.45 + (100 - stats.stability) * 0.18;
    case 'CIVIL': return stats.fatigue * 0.7 + (100 - stats.loyalty) * 0.45 + Math.max(0, 900 - stats.rations) * 0.02;
    case 'MORAL': return stats.suspicion * 0.35 + stats.rebel * 0.35 + stats.xen * 0.35 + (100 - stats.loyalty) * 0.2;
    case 'CITADEL': return stats.suspicion * 0.75 + (100 - stats.citadel) * 0.65 + Math.max(0, stats.rebel - 35) * 0.4;
    case 'COMBINE': return stats.combine * 0.35 + stats.fear * 0.28 + stats.suspicion * 0.25;
    case 'PROPAGANDA': return (100 - stats.info) * 0.65 + stats.fear * 0.18 + stats.fatigue * 0.2;
    case 'INFRASTRUCTURE': return (100 - stats.production) * 0.75 + Math.max(0, 700 - stats.rations) * 0.03;
    default: return 20;
  }
}

function sectorPressure(crisis: Crisis, sectors: Sector[]) {
  const sector = sectors.find((item) => item.id === crisis.sectorId);
  if (!sector) return 0;
  let score = 0;
  if (crisis.type === 'REBELLION') score += sector.rebel * 1.15 + (100 - sector.loyalty) * 0.25 + sector.fear * 0.12;
  if (crisis.type === 'XEN') score += sector.xen * 1.25 + (100 - sector.infrastructure) * 0.2;
  if (crisis.type === 'CIVIL') score += (100 - sector.loyalty) * 0.55 + sector.fear * 0.25;
  if (crisis.type === 'MORAL') score += Math.max(sector.rebel, sector.xen) * 0.55 + (100 - sector.loyalty) * 0.2;
  if (crisis.type === 'CITADEL' || crisis.type === 'COMBINE') score += sector.surveillance * 0.35 + sector.strategicValue * 0.3;
  return score;
}

function crisisIsAvailable(crisis: Crisis, input: EventDirectorInput): boolean {
  const unlocked = input.unlocked;
  const history = input.crisisHistory ?? [];
  const lore = `${crisis.title} ${(crisis.loreTags ?? []).join(' ')}`.toLowerCase();

  if (history.slice(0, 3).includes(crisis.id)) return false;
  if (crisis.repeatable === false && history.includes(crisis.id)) return false;
  if (crisis.type === 'XEN' && unlocked && !unlocked.xen_bioscan) return false;
  if ((lore.includes('nova prospekt') || lore.includes('biotics')) && unlocked && !unlocked.nova_prospekt_link) return false;
  if (lore.includes('razor train') && unlocked && !unlocked.rail_network) return false;
  if (lore.includes('advisor') && unlocked && !unlocked.advisor_channel) return false;
  if (lore.includes('breencast') && input.timeline && !isBreenCastTimeline(input.timeline)) return false;
  if ((lore.includes('ordinal') || lore.includes('suppressor') || lore.includes('combine grunt')) && input.timeline !== 'alyx_era') return false;
  if (lore.includes('hunter') && input.timeline !== 'citadel_collapse') return false;
  return true;
}

export function getCrisisCadence({ stats, day }: Pick<EventDirectorInput, 'stats' | 'day'>) {
  const pressure = Math.max(stats.rebel, stats.xen, stats.suspicion, stats.fatigue, 100 - stats.stability);
  const chance = Math.min(95, Math.max(28, Math.round(28 + pressure * 0.62)));
  const roll = Math.abs((day * 37 + stats.rebel * 3 + stats.xen * 5 + stats.suspicion * 7 + stats.info) % 100);
  return { scheduled: roll < chance, chance, roll, pressure };
}

export function pickDirectedCrisis(input: EventDirectorInput): Crisis | null {
  if (!getCrisisCadence(input).scheduled) return null;
  const { crises, sectors, stats, day, timeline } = input;
  const timelineFactor = (crisis: Crisis) => {
    if (!timeline) return 1;
    if (crisis.type === 'REBELLION') return getTimelineThreatMultiplier('rebellion', timeline);
    if (crisis.type === 'XEN') return getTimelineThreatMultiplier('xen', timeline);
    if (crisis.type === 'CITADEL' || crisis.type === 'COMBINE' || crisis.type === 'PROPAGANDA') return getTimelineThreatMultiplier('citadel', timeline);
    if (crisis.type === 'CIVIL' || crisis.type === 'INFRASTRUCTURE') return getTimelineThreatMultiplier('civil', timeline);
    if (crisis.type === 'MORAL') return getTimelineThreatMultiplier('moral', timeline);
    return 1;
  };
  const availableCrises = crises.filter((crisis) => crisisIsAvailable(crisis, input));
  const scored = availableCrises.map((crisis) => ({
    crisis,
    score: (typePressure(crisis, stats) + sectorPressure(crisis, sectors)) * timelineFactor(crisis) + (crisis.severity ?? 2) * 8 + deterministicNoise(day, crisis.id),
  }));

  scored.sort((a, b) => b.score - a.score);
  const topWindow = scored.slice(0, Math.min(12, scored.length));
  if (topWindow.length === 0) return null;
  const index = Math.abs((day * 17 + stats.rebel + stats.xen + stats.suspicion) % topWindow.length);
  return topWindow[index].crisis;
}

export function getEventCatalogueSummary(crises: Crisis[]) {
  return crises.reduce<Record<string, number>>((acc, crisis) => {
    acc[crisis.type] = (acc[crisis.type] ?? 0) + 1;
    return acc;
  }, {});
}
