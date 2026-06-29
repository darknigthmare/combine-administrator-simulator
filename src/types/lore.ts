import { GameStats, SectorStatus } from './game';

export interface CombineUnit {
  id: string;
  name: string;
  role: string;
  description: string;
  cost: number;                  // Cost in industrial power or rations
  power: number;                 // Combat effectiveness
  surveillanceBoost: number;     // Surveillance rating added per unit
  fearFactor: number;            // Fear generated when deployed
  loyaltyImpact: number;         // Impact on loyalty per unit
  collateralRisk: number;        // Risk of collateral damage (0 to 10)
  category: 'cp' | 'overwatch' | 'heavy' | 'support' | 'advisor';
}

export interface XenEntity {
  id: string;
  name: string;
  danger: number;                // 0 to 100
  spreadRate: number;            // 0 to 100
  fearGenerated: number;
  infrastructureDamage: number;
  combatRisk: number;            // Risk to Combine forces
  civilianRisk: number;          // Risk to civilians
  preferredSectors: string[];    // Sector names or ids preferred
  confinementMethod: string;
}

export interface GovernanceProfile {
  id: string;
  name: string;
  description: string;
  bonuses: string[];
  penalties: string[];
  statModifiers: Partial<GameStats>;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  difficultyMultiplier: number;
  initialStats: GameStats;
  sectorOverrides?: Record<string, {
    status?: SectorStatus;
    xenContamination?: number;
    rebelRisk?: number;
    surveillance?: number;
  }>;
}

export interface CombineProtocol {
  code: string;
  name: string;
  description: string;
}

export interface RebelCell {
  name: string;
  status: 'dormant' | 'active' | 'hunted' | 'eliminated';
  influence: number;
  baseSector: string;
}
