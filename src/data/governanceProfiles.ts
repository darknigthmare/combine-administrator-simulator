/** Initial stat modifiers for governance profiles. */
import type { ProfileId, Stats } from '../types/game';

export const profileEffects: Record<ProfileId, Partial<Stats>> = {
  loyalist: { combine: 12, fear: 8, loyalty: -8, suspicion: -8 },
  technocrat: { production: 10, rations: 250, fatigue: -4, combine: -4 },
  tyrant: { fear: 18, rebel: -6, loyalty: -16, suspicion: 5 },
  collaborator: { info: 9, rations: 150, suspicion: 4, loyalty: -6 },
  sympathizer: { loyalty: 12, suspicion: 20, combine: -6, rebel: 5 },
  quarantine: { xen: -10, production: -6, fatigue: 6, fear: 5 },
};
