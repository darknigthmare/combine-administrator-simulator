export interface GameStats {
  stability: number;          // 0 to 100
  loyalty: number;            // 0 to 100
  fear: number;               // 0 to 100
  rebelActivity: number;      // 0 to 100
  xenContamination: number;   // 0 to 100
  combinePresence: number;    // 0 to 100
  industrialProduction: number; // 0 to 100
  rations: number;            // Numeric units
  citadelEnergy: number;      // 0 to 100
  infoControl: number;        // 0 to 100
  civilianFatigue: number;    // 0 to 100
  civilianCasualties: number; // Cumulative
  combineCasualties: number;  // Cumulative
}

export type GameDifficulty = 'easy' | 'medium' | 'hard';

export type GameScenarioId = 
  | 'standard' 
  | 'dormant_rebellion' 
  | 'quarantine_zone' 
  | 'citadel_instability' 
  | 'post_nova_prospekt' 
  | 'pre_hl2' 
  | 'uprising';

export type GovernanceProfileId = 
  | 'loyalist' 
  | 'technocrat' 
  | 'tyrant' 
  | 'collaborator' 
  | 'sympathizer' 
  | 'quarantine_manager';

export type SectorStatus =
  | 'Stable'
  | 'Surveillé'
  | 'Sous couvre-feu'
  | 'Insurgé'
  | 'Saboté'
  | 'Contaminé'
  | 'Infesté'
  | 'En quarantaine'
  | 'Scellé'
  | 'Bombardé'
  | 'Abandonné'
  | 'Zone de combat'
  | 'Contrôle rebelle'
  | 'Contrôle Combine total';

export interface CitySector {
  id: string;
  name: string;
  population: number;
  strategicImportance: 'Low' | 'Medium' | 'High' | 'Critical';
  surveillance: number;        // 0 to 100
  cpPresence: number;          // 0 to 100
  overwatchPresence: number;   // 0 to 100
  rebelRisk: number;           // 0 to 100
  xenContamination: number;    // 0 to 100
  infrastructureStatus: number; // 0 to 100 (health)
  rations: number;             // ration units in sector
  fear: number;                // local fear
  loyalty: number;             // local loyalty
  status: SectorStatus;
  unitsDeployed: Record<string, number>; // unitId -> count
  connections: string[];       // neighbor IDs
}

export interface DayReport {
  day: number;
  globalStats: GameStats;
  incidents: string[];
  civilianCasualties: number;
  combineCasualties: number;
  rationsChange: number;
  productionChange: number;
  directiveProgress: string;
}

export interface HistoryLog {
  day: number;
  type: 'event' | 'action' | 'directive' | 'warning';
  message: string;
}
