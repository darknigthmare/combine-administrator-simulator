/** Boss Battle mechanics prototype. No generated art is certified 1:1. */
export type BossId = 'strider_hl2' | 'dropship_hl2' | 'gunship_hl2' | 'gargantua_hl1';
export type FighterId = 'gordon_hl2' | 'alyx_hl2' | 'barney_hl2' | 'shephard_op4' | 'vortigaunt_hl2' | 'combine_elite_hl2';
export type BattleMode = 'single' | 'rush' | 'training';
export type Difficulty = 'story' | 'normal' | 'hard';
export type BattleStatus = 'intro' | 'active' | 'paused' | 'victory' | 'defeat' | 'intermission' | 'complete';
export type DamageKind = 'bullet' | 'melee' | 'energy' | 'energy_orb' | 'explosive' | 'rocket' | 'environment';

export interface FighterDefinition {
  id: FighterId;
  name: string;
  sourceGame: string;
  role: string;
  maxHp: number;
  speed: number;
  color: string;
  lightName: string;
  rangedName: string;
  specialName: string;
  specialHint: string;
  rangedDamage: number;
  rangedCooldown: number;
  rangedKind: DamageKind;
}

export interface BossDefinition {
  id: BossId;
  name: string;
  sourceGame: string;
  arena: string;
  objective: string;
  counterplay: string;
  phases: string[];
  colors: { primary: string; secondary: string; sky: string };
  maxHp: number;
  width: number;
  height: number;
  canonicalRule: string;
  sourceUrls: string[];
}

export interface BattleOptions {
  fighterId: FighterId;
  bossId: BossId;
  mode?: BattleMode;
  difficulty?: Difficulty;
  seed?: number;
}

/** Movement/ranged may be held. UI sends all other boolean actions on key-down edges. */
export interface BattleInput {
  move?: -1 | 0 | 1;
  jump?: boolean;
  light?: boolean;
  ranged?: boolean;
  special?: boolean;
  interact?: boolean;
  dodge?: boolean;
  target?: boolean;
  pause?: boolean;
  skipIntro?: boolean;
}

export interface BossPart {
  id: string;
  label: string;
  hp: number;
  maxHp: number;
  immune: boolean;
  offsetX: number;
  offsetY: number;
}

export interface BossAttack {
  id: number;
  label: string;
  kind: 'burst' | 'strafe' | 'cannon' | 'stomp' | 'bomb' | 'flame' | 'shock';
  x: number;
  width: number;
  telegraphTicks: number;
  activeTicks: number;
  damage: number;
  blockable: boolean;
  /** A single hazard can hit at most once; no per-frame damage stacking. */
  resolved: boolean;
}

export interface ArenaStation {
  id: string;
  label: string;
  hint: string;
  x: number;
  kind: 'supply' | 'launcher' | 'coil';
  charge: number;
  cooldown: number;
}

export interface BattleProjectile {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  damage: number;
  kind: DamageKind;
  targetPart: string;
  ttl: number;
  owner: 'player';
  radius: number;
}

export interface BattleEffect {
  id: number;
  x: number;
  y: number;
  label: string;
  kind: 'hit' | 'immune' | 'supply' | 'special' | 'warning' | 'light';
  ticks: number;
}

export interface BattleMinion {
  id: number;
  x: number;
  hp: number;
  maxHp: number;
  cooldown: number;
  telegraphTicks: number;
}

export interface BattleResult {
  outcome: 'victory' | 'defeat';
  score: number;
  rank: 'S' | 'A' | 'B' | 'C' | 'TRAINING';
  activeTicks: number;
  damageTaken: number;
  shotsFired: number;
  weakPointHits: number;
  objectiveLabel: string;
  eligibleForRecord: boolean;
}

export interface BattleState {
  schemaVersion: 1;
  rulesVersion: 'boss-battle-prototype-1';
  bossId: BossId;
  fighterId: FighterId;
  mode: BattleMode;
  difficulty: Difficulty;
  seed: number;
  rng: number;
  status: BattleStatus;
  resumeStatus: 'intro' | 'active';
  /** Total simulation calls excluding pause. Active clock excludes introduction. */
  tick: number;
  activeTicks: number;
  introTicks: number;
  player: {
    x: number;
    y: number;
    vy: number;
    facing: -1 | 1;
    hp: number;
    maxHp: number;
    ammo: number;
    maxAmmo: number;
    charge: number;
    invulnerableTicks: number;
    guardTicks: number;
    cooldown: number;
    dodgeCooldown: number;
    action: 'idle' | 'walk' | 'jump' | 'light' | 'ranged' | 'special' | 'dodge' | 'hurt' | 'interact';
    actionTicks: number;
  };
  boss: {
    x: number;
    y: number;
    hp: number;
    maxHp: number;
    phase: number;
    target: number;
    parts: BossPart[];
    attack: BossAttack | null;
    nextAttackTicks: number;
    cycle: number;
    retreatTicks: number;
  };
  projectiles: BattleProjectile[];
  effects: BattleEffect[];
  minions: BattleMinion[];
  stations: ArenaStation[];
  covers: { x: number; width: number }[];
  objectiveProgress: number;
  objectiveTarget: number;
  message: string;
  result: BattleResult | null;
  rushIndex: number;
  /** Continuing a failed rush is allowed, but cannot produce a ranked rush record. */
  continues: number;
  rushResults: BattleResult[];
  stats: { damageTaken: number; shotsFired: number; weakPointHits: number; minionsDefeated: number; dodges: number };
  nextId: number;
}
