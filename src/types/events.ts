import { GameStats } from './game';

export interface GameEffects {
  stability?: number;
  loyalty?: number;
  fear?: number;
  rebelActivity?: number;
  xenContamination?: number;
  combinePresence?: number;
  industrialProduction?: number;
  rations?: number;
  citadelEnergy?: number;
  infoControl?: number;
  civilianFatigue?: number;
  civilianCasualties?: number;
  combineCasualties?: number;
  // Local sector impacts
  sectorLoyalty?: number;
  sectorFear?: number;
  sectorXen?: number;
  sectorRebel?: number;
  sectorInfrastructure?: number;
  message?: string;
}

export interface EventChoice {
  id: string;
  label: string;
  description: string;
  effects: GameEffects;
  delayedEffects?: GameEffects;
  risk?: number; // 0 to 100 percentage chance of fail or side effect
}

export type EventType =
  | 'Rebel'
  | 'Xen'
  | 'Combine'
  | 'Citizen'
  | 'Citadel'
  | 'Infrastructure'
  | 'Propaganda'
  | 'Quarantine'
  | 'Moral Crisis'
  | 'Advisor'
  | 'Breencast'
  | 'Sector Collapse';

export interface EventCondition {
  stat: keyof GameStats | 'day';
  operator: 'gt' | 'lt' | 'eq';
  value: number;
}

export interface GameEvent {
  id: string;
  title: string;
  type: EventType;
  sectorId?: string; // Optional sector context
  severity: 1 | 2 | 3 | 4 | 5;
  description: string;
  choices: EventChoice[];
  loreTags: string[];
  repeatable: boolean;
  conditions?: EventCondition[];
}

export interface CitadelDirective {
  id: string;
  title: string;
  description: string;
  duration: number; // Days to complete
  targetStat: keyof GameStats | 'rebelActivityUnder' | 'productionAbove' | 'xenContaminationUnder';
  targetValue: number;
  rewardEffects: GameEffects;
  penaltyEffects: GameEffects;
}
