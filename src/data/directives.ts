/** Citadel and Advisor directive templates. */
import type { Directive } from '../types/game';

export const directives: Directive[] = [
  { title: 'Directive Citadel : Anti-Citizen Sweep', body: 'Réduire l’activité rebelle avant révision Overwatch.', stat: 'rebel', mode: 'below', target: 25, days: 4, reward: { combine: 8, info: 5 }, penalty: { citadel: -12, suspicion: 10, stability: -8 } },
  { title: 'Directive Citadel : Industrial Continuity', body: 'Préserver la production malgré rationnement et quarantaines.', stat: 'production', mode: 'above', target: 70, days: 5, reward: { rations: 250, citadel: 6 }, penalty: { rations: -220, citadel: -10, suspicion: 8 } },
  { title: 'Directive Advisor : Xen Denial', body: 'Aucune expansion biologique ne doit atteindre les secteurs administratifs.', stat: 'xen', mode: 'below', target: 18, days: 5, reward: { citadel: 8, stability: 5 }, penalty: { suspicion: 12, combine: -6, stability: -10 } },
  { title: 'Directive Breencast : Civic Narrative', body: 'Maintenir le contrôle informationnel et isoler les radios Lambda.', stat: 'info', mode: 'above', target: 66, days: 3, reward: { loyalty: 3, fear: 4 }, penalty: { rebel: 10, suspicion: 6 } },
  { title: 'Directive Suppression Field : Quiet Blocks', body: 'Faire baisser la fatigue apparente des blocs productifs.', stat: 'fatigue', mode: 'below', target: 42, days: 5, reward: { production: 5 }, penalty: { rebel: 7, loyalty: -6 } },
];
