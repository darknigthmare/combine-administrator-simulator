import { create } from 'zustand';
import { GameStats, CitySector, DayReport, HistoryLog, GameScenarioId, GovernanceProfileId, GameDifficulty, SectorStatus } from '../types/game';
import { CombineUnit, XenEntity, GovernanceProfile, Scenario } from '../types/lore';
import { GameEvent, CitadelDirective } from '../types/events';
import { citySectors as defaultSectors } from '../data/citySectors';
import { combineUnits as defaultUnits } from '../data/combineUnits';
import { governanceProfiles } from '../data/governanceProfiles';
import { directives as allDirectives } from '../data/directives';
import { saveGameState, loadGameState, clearGameState } from '../utils/storage';
import { SeededRandom } from '../systems/seededRandom';
import { runGameLoop } from '../systems/gameLoop';


interface GameSettings {
  soundEnabled: boolean;
  scanlinesEnabled: boolean;
}

export interface GameStoreState {
  // Game session parameters
  cityNumber: string;
  scenarioId: GameScenarioId;
  governanceProfileId: GovernanceProfileId;
  difficulty: GameDifficulty;
  seed: number;
  day: number;
  gameStarted: boolean;
  endingTriggered: string | null;

  // Global state statistics
  stats: GameStats;
  sectors: CitySector[];
  combineReserve: Record<string, number>; // unitId -> count in reserve

  // Directives and events
  activeDirective: CitadelDirective | null;
  activeDirectiveDaysLeft: number;
  directivesCompleted: number;
  directivesFailed: number;
  activeEvent: GameEvent | null;

  // Logs and history
  history: HistoryLog[];
  dayReports: DayReport[];
  recentAlerts: string[];

  // Settings
  settings: GameSettings;

  // Actions
  initializeGame: (
    cityNumber: string,
    scenarioId: GameScenarioId,
    profileId: GovernanceProfileId,
    difficulty: GameDifficulty,
    seed: number
  ) => void;
  deployUnit: (sectorId: string, unitId: string, count: number) => boolean;
  undeployUnit: (sectorId: string, unitId: string, count: number) => boolean;
  resolveActiveEvent: (choiceId: string) => void;
  executeSectorAction: (actionId: string, sectorId: string) => void;
  executeGlobalAction: (actionId: string) => void;
  nextDay: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  setScanlinesEnabled: (enabled: boolean) => void;
  resetGame: () => void;
  loadSavedGame: () => boolean;
}

const initialStats: GameStats = {
  stability: 60,
  loyalty: 30,
  fear: 50,
  rebelActivity: 20,
  xenContamination: 15,
  combinePresence: 50,
  industrialProduction: 60,
  rations: 1000,
  citadelEnergy: 80,
  infoControl: 50,
  civilianFatigue: 30,
  civilianCasualties: 0,
  combineCasualties: 0,
};

// Scenario stats modifications
const getScenarioSetup = (id: GameScenarioId): { stats: Partial<GameStats>; sectorStatus?: Record<string, SectorStatus>; xenBoost?: number; rebelBoost?: number } => {
  switch (id) {
    case 'dormant_rebellion':
      return {
        stats: { rebelActivity: 45, loyalty: 15, stability: 48, fear: 40 },
        rebelBoost: 20
      };
    case 'quarantine_zone':
      return {
        stats: { xenContamination: 45, stability: 45, fear: 60, combinePresence: 55 },
        xenBoost: 25
      };
    case 'citadel_instability':
      return {
        stats: { citadelEnergy: 40, stability: 50, fear: 55, combinePresence: 40 },
      };
    case 'post_nova_prospekt':
      return {
        stats: { stability: 35, rebelActivity: 60, loyalty: 10, fear: 65, combinePresence: 45 },
        rebelBoost: 30
      };
    case 'pre_hl2':
      return {
        stats: { loyalty: 35, fear: 60, rebelActivity: 10, stability: 70, infoControl: 75 },
      };
    case 'uprising':
      return {
        stats: { stability: 25, rebelActivity: 80, loyalty: 5, fear: 70, combinePresence: 70, industrialProduction: 40, rations: 600 },
        rebelBoost: 35
      };
    case 'standard':
    default:
      return { stats: {} };
  }
};

export const useGameStore = create<GameStoreState>((set, get) => ({
  // Defaults
  cityNumber: '17',
  scenarioId: 'standard',
  governanceProfileId: 'loyalist',
  difficulty: 'medium',
  seed: 42,
  day: 1,
  gameStarted: false,
  endingTriggered: null,
  stats: { ...initialStats },
  sectors: [],
  combineReserve: {},
  activeDirective: null,
  activeDirectiveDaysLeft: 0,
  directivesCompleted: 0,
  directivesFailed: 0,
  activeEvent: null,
  history: [],
  dayReports: [],
  recentAlerts: [],
  settings: {
    soundEnabled: true,
    scanlinesEnabled: true,
  },

  initializeGame: (cityNumber, scenarioId, profileId, difficulty, seed) => {
    const random = new SeededRandom(seed);
    const setup = getScenarioSetup(scenarioId);

    // Initial reserves of units
    const reserve: Record<string, number> = {};
    defaultUnits.forEach(unit => {
      // Base count depends on unit type and profile/difficulty
      let count = 5;
      if (unit.id === 'cp_metro') count = 25;
      else if (unit.id === 'scanner') count = 12;
      else if (unit.id === 'manhack') count = 10;
      else if (unit.id === 'grunt') count = 8;
      else if (unit.id === 'soldier') count = 10;
      else if (unit.id === 'ordinal') count = 3;
      else if (unit.id === 'charger') count = 4;
      else if (unit.id === 'suppressor') count = 3;
      else if (unit.id === 'elite') count = 2;
      else if (unit.id === 'apc') count = 2;
      else if (unit.id === 'hunter') count = 2;
      else if (unit.id === 'dropship') count = 3;
      else if (unit.id === 'gunship') count = 1;
      else if (unit.id === 'strider') count = 1;
      else if (unit.id === 'advisor') count = 0;

      // Adjust based on difficulty
      if (difficulty === 'easy') count = Math.ceil(count * 1.3);
      if (difficulty === 'hard') count = Math.ceil(count * 0.8);

      reserve[unit.id] = count;
    });

    // Load sectors
    const sectorsCopy: CitySector[] = defaultSectors.map(s => {
      let risk = s.rebelRisk;
      let xen = s.xenContamination;
      let status = s.status;

      // Apply scenario modifiers
      if (setup.rebelBoost && s.id !== 'admin_plaza' && s.id !== 'cp_outpost') {
        risk = Math.min(100, risk + setup.rebelBoost);
        if (risk > 50 && status === 'Stable') status = 'Surveillé';
      }
      if (setup.xenBoost && (s.id === 'quarantine_zone' || s.id === 'sewers' || s.id === 'periphery' || s.id === 'abandoned_hosp')) {
        xen = Math.min(100, xen + setup.xenBoost);
        status = 'Contaminé';
      }
      if (scenarioId === 'quarantine_zone' && s.id === 'abandoned_hosp') {
        status = 'En quarantaine';
      }

      // Deduct deployed units from reserve
      Object.entries(s.unitsDeployed).forEach(([unitId, count]) => {
        if (reserve[unitId] !== undefined) {
          reserve[unitId] = Math.max(0, reserve[unitId] - count);
        }
      });

      return {
        ...s,
        rebelRisk: risk,
        xenContamination: xen,
        status
      };
    });

    // Governance profile modifications
    const profile = governanceProfiles.find(p => p.id === profileId);
    const profileStats = profile ? profile.statModifiers : {};

    // Combine starting stats
    const mergedStats = {
      ...initialStats,
      ...setup.stats,
      ...profileStats,
    };

    // Rations adjustments for technocrat/difficulty
    if (profileId === 'technocrat') {
      mergedStats.rations += 200;
    }
    if (difficulty === 'easy') {
      mergedStats.rations += 300;
      mergedStats.stability = Math.min(100, mergedStats.stability + 10);
    }
    if (difficulty === 'hard') {
      mergedStats.rations = Math.max(200, mergedStats.rations - 200);
      mergedStats.stability = Math.max(30, mergedStats.stability - 10);
    }

    // Select initial directive
    const initialDir = random.choice(allDirectives);

    const history: HistoryLog[] = [
      { day: 1, type: 'action', message: `Initialisation de l'administration civile Combine - Cité ${cityNumber}.` },
      { day: 1, type: 'directive', message: `Directive reçue de la Citadel : ${initialDir.title}` }
    ];

    const state = {
      cityNumber,
      scenarioId,
      governanceProfileId: profileId,
      difficulty,
      seed,
      day: 1,
      gameStarted: true,
      endingTriggered: null,
      stats: mergedStats,
      sectors: sectorsCopy,
      combineReserve: reserve,
      activeDirective: initialDir,
      activeDirectiveDaysLeft: initialDir.duration,
      directivesCompleted: 0,
      directivesFailed: 0,
      activeEvent: null,
      history,
      dayReports: [],
      recentAlerts: ['Système initialisé. Surveillance COAN active.'],
    };

    set(state);
    saveGameState(state);
  },

  deployUnit: (sectorId, unitId, count) => {
    const { combineReserve, sectors } = get();
    const available = combineReserve[unitId] || 0;
    if (available < count) return false;

    const sectorIndex = sectors.findIndex(s => s.id === sectorId);
    if (sectorIndex === -1) return false;

    const updatedSectors = [...sectors];
    const sector = { ...updatedSectors[sectorIndex] };
    const sectorUnits = { ...sector.unitsDeployed };

    sectorUnits[unitId] = (sectorUnits[unitId] || 0) + count;
    sector.unitsDeployed = sectorUnits;
    updatedSectors[sectorIndex] = sector;

    const updatedReserve = {
      ...combineReserve,
      [unitId]: available - count
    };

    set({
      sectors: updatedSectors,
      combineReserve: updatedReserve,
      history: [
        ...get().history,
        { day: get().day, type: 'action', message: `Déploiement de ${count}x ${unitId} vers ${sector.name}.` }
      ]
    });

    saveGameState(get());
    return true;
  },

  undeployUnit: (sectorId, unitId, count) => {
    const { combineReserve, sectors } = get();
    const sectorIndex = sectors.findIndex(s => s.id === sectorId);
    if (sectorIndex === -1) return false;

    const updatedSectors = [...sectors];
    const sector = { ...updatedSectors[sectorIndex] };
    const sectorUnits = { ...sector.unitsDeployed };

    const deployed = sectorUnits[unitId] || 0;
    if (deployed < count) return false;

    sectorUnits[unitId] = deployed - count;
    if (sectorUnits[unitId] === 0) {
      delete sectorUnits[unitId];
    }
    sector.unitsDeployed = sectorUnits;
    updatedSectors[sectorIndex] = sector;

    const updatedReserve = {
      ...combineReserve,
      [unitId]: (combineReserve[unitId] || 0) + count
    };

    set({
      sectors: updatedSectors,
      combineReserve: updatedReserve,
      history: [
        ...get().history,
        { day: get().day, type: 'action', message: `Retrait de ${count}x ${unitId} depuis ${sector.name}.` }
      ]
    });

    saveGameState(get());
    return true;
  },

  resolveActiveEvent: (choiceId) => {
    const { activeEvent, stats, sectors, history, day } = get();
    if (!activeEvent) return;

    const choice = activeEvent.choices.find(c => c.id === choiceId);
    if (!choice) return;

    // Apply effects
    const eff = choice.effects;
    const nextStats = { ...stats };

    if (eff.stability !== undefined) nextStats.stability = Math.max(0, Math.min(100, nextStats.stability + eff.stability));
    if (eff.loyalty !== undefined) nextStats.loyalty = Math.max(0, Math.min(100, nextStats.loyalty + eff.loyalty));
    if (eff.fear !== undefined) nextStats.fear = Math.max(0, Math.min(100, nextStats.fear + eff.fear));
    if (eff.rebelActivity !== undefined) nextStats.rebelActivity = Math.max(0, Math.min(100, nextStats.rebelActivity + eff.rebelActivity));
    if (eff.xenContamination !== undefined) nextStats.xenContamination = Math.max(0, Math.min(100, nextStats.xenContamination + eff.xenContamination));
    if (eff.combinePresence !== undefined) nextStats.combinePresence = Math.max(0, Math.min(100, nextStats.combinePresence + eff.combinePresence));
    if (eff.industrialProduction !== undefined) nextStats.industrialProduction = Math.max(0, Math.min(100, nextStats.industrialProduction + eff.industrialProduction));
    if (eff.rations !== undefined) nextStats.rations = Math.max(0, nextStats.rations + eff.rations);
    if (eff.citadelEnergy !== undefined) nextStats.citadelEnergy = Math.max(0, Math.min(100, nextStats.citadelEnergy + eff.citadelEnergy));
    if (eff.infoControl !== undefined) nextStats.infoControl = Math.max(0, Math.min(100, nextStats.infoControl + eff.infoControl));
    if (eff.civilianFatigue !== undefined) nextStats.civilianFatigue = Math.max(0, Math.min(100, nextStats.civilianFatigue + eff.civilianFatigue));
    if (eff.civilianCasualties !== undefined) nextStats.civilianCasualties += eff.civilianCasualties;
    if (eff.combineCasualties !== undefined) nextStats.combineCasualties += eff.combineCasualties;

    // Apply sector modifications if applicable
    let updatedSectors = [...sectors];
    if (activeEvent.sectorId) {
      const idx = sectors.findIndex(s => s.id === activeEvent.sectorId);
      if (idx !== -1) {
        const sec = { ...sectors[idx] };
        if (eff.sectorLoyalty !== undefined) sec.loyalty = Math.max(0, Math.min(100, sec.loyalty + eff.sectorLoyalty));
        if (eff.sectorFear !== undefined) sec.fear = Math.max(0, Math.min(100, sec.fear + eff.sectorFear));
        if (eff.sectorXen !== undefined) sec.xenContamination = Math.max(0, Math.min(100, sec.xenContamination + eff.sectorXen));
        if (eff.sectorRebel !== undefined) sec.rebelRisk = Math.max(0, Math.min(100, sec.rebelRisk + eff.sectorRebel));
        if (eff.sectorInfrastructure !== undefined) sec.infrastructureStatus = Math.max(0, Math.min(100, sec.infrastructureStatus + eff.sectorInfrastructure));
        
        // Handle direct status changes
        if (choiceId.includes('seal') || choiceId.includes('quarantine')) {
          if (choiceId.includes('seal')) sec.status = 'Scellé';
          else sec.status = 'En quarantaine';
        }

        updatedSectors[idx] = sec;
      }
    }

    const logMsg = `Décision prise : "${choice.label}". Résolution de la crise "${activeEvent.title}".`;

    set({
      stats: nextStats,
      sectors: updatedSectors,
      activeEvent: null,
      history: [
        ...history,
        { day, type: 'event', message: logMsg }
      ]
    });

    saveGameState(get());
  },

  executeSectorAction: (actionId, sectorId) => {
    const { sectors, stats, history, day } = get();
    const idx = sectors.findIndex(s => s.id === sectorId);
    if (idx === -1) return;

    const updatedSectors = [...sectors];
    const sec = { ...updatedSectors[idx] };
    const nextStats = { ...stats };
    let message = '';

    // Sector administrative operations
    if (actionId === 'seal_sector') {
      sec.status = 'Scellé';
      sec.population = Math.ceil(sec.population * 0.1); // 90% lost/trapped
      sec.xenContamination = Math.max(0, sec.xenContamination - 20);
      sec.rebelRisk = Math.max(0, sec.rebelRisk - 15);
      nextStats.stability = Math.max(0, nextStats.stability - 8);
      nextStats.civilianCasualties += Math.ceil(sec.population * 0.9);
      message = `Le secteur ${sec.name} a été scellé hermétiquement. Issues bloquées.`;
    } else if (actionId === 'quarantine_sector') {
      sec.status = 'En quarantaine';
      sec.xenContamination = Math.max(0, sec.xenContamination - 10);
      nextStats.civilianFatigue = Math.min(100, nextStats.civilianFatigue + 5);
      nextStats.fear = Math.min(100, nextStats.fear + 4);
      message = `Le secteur ${sec.name} est mis sous protocole de quarantaine stricte.`;
    } else if (actionId === 'burn_sector') {
      sec.status = 'Bombardé';
      sec.xenContamination = 0;
      sec.rebelRisk = 0;
      nextStats.civilianCasualties += Math.ceil(sec.population * 0.5);
      sec.population = Math.ceil(sec.population * 0.5);
      sec.infrastructureStatus = Math.ceil(sec.infrastructureStatus * 0.2);
      nextStats.stability = Math.max(0, nextStats.stability - 12);
      nextStats.rations = Math.max(0, nextStats.rations - 100);
      message = `Purge thermique par plasma lancée sur ${sec.name}. Secteur dévasté.`;
    } else if (actionId === 'curfew_sector') {
      sec.status = 'Sous couvre-feu';
      sec.rebelRisk = Math.max(0, sec.rebelRisk - 15);
      sec.fear = Math.min(100, sec.fear + 10);
      nextStats.industrialProduction = Math.max(0, nextStats.industrialProduction - 5);
      message = `Couvre-feu total décrété pour le secteur ${sec.name}.`;
    } else if (actionId === 'lift_curfew') {
      sec.status = 'Surveillé';
      nextStats.industrialProduction = Math.min(100, nextStats.industrialProduction + 3);
      message = `Couvre-feu levé pour le secteur ${sec.name}.`;
    } else if (actionId === 'raid_sector') {
      sec.rebelRisk = Math.max(0, sec.rebelRisk - 25);
      sec.fear = Math.min(100, sec.fear + 12);
      sec.loyalty = Math.max(0, sec.loyalty - 10);
      nextStats.rations = Math.max(0, nextStats.rations - 50);
      message = `Raid de la Civil Protection mené dans le secteur ${sec.name}. Caches d'armes fouillées.`;
    }

    updatedSectors[idx] = sec;

    set({
      sectors: updatedSectors,
      stats: nextStats,
      history: [
        ...history,
        { day, type: 'action', message }
      ]
    });

    saveGameState(get());
  },

  executeGlobalAction: (actionId) => {
    const { stats, history, day } = get();
    const nextStats = { ...stats };
    let message = '';

    if (actionId === 'breencast_broadcast') {
      nextStats.infoControl = Math.min(100, nextStats.infoControl + 15);
      nextStats.loyalty = Math.max(0, Math.min(100, nextStats.loyalty - 2)); // slight fatigue/resentment
      nextStats.civilianFatigue = Math.min(100, nextStats.civilianFatigue + 4);
      nextStats.rations = Math.max(0, nextStats.rations - 30);
      message = `Diffusion d'une allocution d'urgence du Dr. Wallace Breen sur tous les réseaux publics.`;
    } else if (actionId === 'ration_increase') {
      nextStats.rations = Math.max(0, nextStats.rations - 200);
      nextStats.loyalty = Math.min(100, nextStats.loyalty + 12);
      nextStats.civilianFatigue = Math.max(0, nextStats.civilianFatigue - 10);
      message = `Augmentation exceptionnelle des allocations caloriques de supplément civil.`;
    } else if (actionId === 'ration_cut') {
      nextStats.rations += 250;
      nextStats.loyalty = Math.max(0, nextStats.loyalty - 18);
      nextStats.rebelActivity = Math.min(100, nextStats.rebelActivity + 10);
      nextStats.civilianFatigue = Math.min(100, nextStats.civilianFatigue + 8);
      message = `Rationnement sévère décrété. Les suppléments caloriques civils sont suspendus.`;
    }

    set({
      stats: nextStats,
      history: [
        ...history,
        { day, type: 'action', message }
      ]
    });

    saveGameState(get());
  },

  nextDay: () => {
    const nextState = runGameLoop(get() as any);
    set(nextState as any);
    saveGameState(get());
  },

  setSoundEnabled: (enabled) => {
    set(state => ({
      settings: { ...state.settings, soundEnabled: enabled }
    }));
    saveGameState(get());
  },

  setScanlinesEnabled: (enabled) => {
    set(state => ({
      settings: { ...state.settings, scanlinesEnabled: enabled }
    }));
    saveGameState(get());
  },

  resetGame: () => {
    clearGameState();
    set({
      gameStarted: false,
      endingTriggered: null,
      dayReports: [],
      history: []
    });
  },

  loadSavedGame: () => {
    const saved = loadGameState();
    if (saved && saved.gameStarted) {
      set(saved);
      return true;
    }
    return false;
  }
}));
