/** Initial stat modifiers for timeline/scenario presets. */
import type { ScenarioId, Stats } from '../types/game';

export const scenarioEffects: Record<ScenarioId, Partial<Stats>> = {
  pre_hl2: { stability: 12, info: 15, rebel: -12, fear: 7, xen: -4 },
  standard: {},
  dormant: { rebel: 20, loyalty: -8, stability: -8 },
  quarantine: { xen: 28, fear: 12, production: -6, stability: -10 },
  post_nova: { rebel: 36, loyalty: -15, fear: 12, stability: -22, combine: -6 },
  uprising: { rebel: 55, fear: 20, stability: -35, production: -25, rations: -450, combine: 14 },
};
