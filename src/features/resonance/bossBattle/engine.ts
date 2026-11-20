import { ARENA_WIDTH, BOSS_ORDER, getBoss, getFighter } from './catalog';
import type { ArenaStation, BattleInput, BattleOptions, BattleState, BossAttack, DamageKind } from './types';

const INTRO_TICKS = 150;
const TERMINAL = new Set(['victory', 'defeat', 'intermission', 'complete']);
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const dec = (n: number) => Math.max(0, n - 1);

function stationsFor(id: BattleState['bossId']): ArenaStation[] {
  if (id === 'gargantua_hl1') return [
    { id: 'generator-west', label: 'Générateur A', hint: 'E : armer le générateur A.', kind: 'coil', x: 220, charge: 0, cooldown: 0 },
    { id: 'discharge', label: 'Décharge', hint: 'E : décharger les deux générateurs dans la cage.', kind: 'coil', x: 410, charge: 0, cooldown: 0 },
    { id: 'generator-east', label: 'Générateur B', hint: 'E : armer le générateur B.', kind: 'coil', x: 570, charge: 0, cooldown: 0 },
  ];
  return [
    { id: 'supply', label: 'Réserve RPG', hint: 'E : récupérer trois roquettes pour le poste commun.', kind: 'supply', x: 120, charge: 3, cooldown: 0 },
    { id: 'launcher', label: 'Poste RPG', hint: 'E : tirer une roquette vers la cible sélectionnée.', kind: 'launcher', x: 310, charge: 1, cooldown: 0 },
  ];
}

export function createBattle(options: BattleOptions): BattleState {
  const mode = options.mode ?? 'single';
  const bossId = mode === 'rush' ? BOSS_ORDER[0] : options.bossId;
  const boss = getBoss(bossId);
  const fighter = getFighter(options.fighterId);
  const seed = (options.seed ?? 17011998) >>> 0;
  const immune = bossId === 'dropship_hl2';
  return {
    schemaVersion: 1, rulesVersion: 'boss-battle-prototype-1', bossId, fighterId: fighter.id,
    mode, difficulty: options.difficulty ?? 'normal', seed, rng: seed,
    status: 'intro', resumeStatus: 'intro', tick: 0, activeTicks: 0, introTicks: INTRO_TICKS,
    player: { x: 180, y: 0, vy: 0, facing: 1, hp: fighter.maxHp, maxHp: fighter.maxHp,
      ammo: 3, maxAmmo: 3, charge: 100, invulnerableTicks: 0, guardTicks: 0, cooldown: 0,
      dodgeCooldown: 0, action: 'idle', actionTicks: 0 },
    boss: { x: 950, y: bossId === 'gargantua_hl1' ? 110 : bossId === 'strider_hl2' ? 300 : 330,
      hp: boss.maxHp, maxHp: boss.maxHp, phase: 0, target: immune ? 1 : 0,
      parts: [
        { id: 'body', label: immune ? 'Corps — invulnérable' : 'Corps', hp: immune ? 1 : boss.maxHp, maxHp: immune ? 1 : boss.maxHp, immune, offsetX: 0, offsetY: 0 },
        ...(immune ? [{ id: 'container', label: 'Nacelle', hp: boss.maxHp, maxHp: boss.maxHp, immune: false, offsetX: 0, offsetY: -95 }] : []),
      ],
      attack: null, nextAttackTicks: 120, cycle: 0, retreatTicks: 0 },
    projectiles: [], effects: [], minions: [], stations: stationsFor(bossId),
    covers: bossId === 'gargantua_hl1' ? [] : [{ x: 425, width: 120 }, { x: 690, width: 105 }],
    objectiveProgress: 0, objectiveTarget: boss.maxHp,
    message: boss.counterplay, result: null, rushIndex: 0, continues: 0, rushResults: [],
    stats: { damageTaken: 0, shotsFired: 0, weakPointHits: 0, minionsDefeated: 0, dodges: 0 }, nextId: 1,
  };
}

function copy(state: BattleState): BattleState {
  return { ...state, player: { ...state.player }, boss: { ...state.boss, parts: state.boss.parts.map((p) => ({ ...p })), attack: state.boss.attack ? { ...state.boss.attack } : null },
    projectiles: state.projectiles.map((p) => ({ ...p })), effects: state.effects.map((e) => ({ ...e })),
    minions: state.minions.map((m) => ({ ...m })), stations: state.stations.map((s) => ({ ...s })),
    stats: { ...state.stats }, rushResults: [...state.rushResults] };
}

function random(state: BattleState): number {
  state.rng = (Math.imul(state.rng, 1664525) + 1013904223) >>> 0;
  return state.rng;
}

function effect(state: BattleState, label: string, kind: BattleState['effects'][number]['kind'], x = state.player.x, y = state.player.y + 80): void {
  state.effects.push({ id: state.nextId++, x, y, label, kind, ticks: 50 });
  if (state.effects.length > 18) state.effects.shift();
}

function playerAction(state: BattleState, action: BattleState['player']['action'], ticks: number): void {
  state.player.action = action;
  state.player.actionTicks = ticks;
}

function minionTarget(state: BattleState): string | null {
  const candidates = state.minions.filter((m) => m.hp > 0 && Math.abs(m.x - state.player.x) < 950);
  candidates.sort((a, b) => Math.abs(a.x - state.player.x) - Math.abs(b.x - state.player.x));
  return candidates.length ? `minion:${candidates[0].id}` : null;
}

function targetPosition(state: BattleState, target: string): { x: number; y: number } | null {
  if (target.startsWith('minion:')) {
    const m = state.minions.find((entry) => `minion:${entry.id}` === target && entry.hp > 0);
    return m ? { x: m.x, y: 45 } : null;
  }
  const part = state.boss.parts.find((p) => p.id === target);
  return part ? { x: state.boss.x + part.offsetX, y: state.boss.y + part.offsetY } : null;
}

function shoot(state: BattleState, damage: number, kind: DamageKind, fromStation = false): void {
  const selected = state.boss.parts[state.boss.target];
  const targetPart = !fromStation ? (minionTarget(state) ?? selected.id) : selected.id;
  const target = targetPosition(state, targetPart);
  if (!target) return;
  state.projectiles.push({ id: state.nextId++, x: fromStation ? 310 : state.player.x,
    y: fromStation ? 70 : state.player.y + 55, targetX: target.x, targetY: target.y,
    speed: kind === 'rocket' ? 9 : kind === 'explosive' ? 10 : 20, damage, kind, targetPart,
    ttl: 220, owner: 'player', radius: kind === 'rocket' || kind === 'explosive' ? 8 : 4 });
  state.stats.shotsFired++;
}

function hitBoss(state: BattleState, targetPart: string, damage: number, kind: DamageKind): void {
  const part = state.boss.parts.find((p) => p.id === targetPart);
  if (!part || part.hp <= 0) return;
  const vulnerable = !part.immune && (kind === 'rocket' || kind === 'environment'
    || (kind === 'energy_orb' && state.bossId !== 'gargantua_hl1')
    || (state.bossId === 'gargantua_hl1' && kind === 'explosive'));
  if (!vulnerable) {
    effect(state, part.immune ? 'Corps invulnérable' : 'Blindage : utiliser l’arène', 'immune', state.boss.x, state.boss.y);
    return;
  }
  const dealt = Math.min(part.hp, damage);
  part.hp -= dealt;
  state.boss.hp = part.hp;
  state.stats.weakPointHits++;
  state.objectiveProgress = state.boss.maxHp - state.boss.hp;
  effect(state, `−${dealt}`, 'hit', state.boss.x, state.boss.y);
  if (state.bossId === 'dropship_hl2' && part.hp <= 0) {
    state.boss.attack = null;
    state.boss.retreatTicks = 180;
    state.message = state.minions.length ? 'Nacelle détruite. Neutralisez les renforts ; le transport repart.' : 'Nacelle détruite. Le transport invulnérable se retire.';
  }
}

function hitMinion(state: BattleState, id: number, damage: number): void {
  const minion = state.minions.find((m) => m.id === id);
  if (!minion || minion.hp <= 0) return;
  minion.hp = Math.max(0, minion.hp - damage);
  effect(state, `−${damage}`, 'hit', minion.x, 70);
  if (!minion.hp) state.stats.minionsDefeated++;
}

function resolveProjectiles(state: BattleState): void {
  for (const p of state.projectiles) {
    p.ttl--;
    const target = targetPosition(state, p.targetPart);
    if (!target) { p.ttl = 0; continue; }
    p.targetX = target.x;
    p.targetY = target.y;
    const dx = target.x - p.x;
    const dy = target.y - p.y;
    const distance = Math.hypot(dx, dy);
    const burst = state.boss.attack;
    if (state.bossId === 'gunship_hl2' && p.kind === 'rocket' && distance < 200 && burst?.kind === 'burst' && burst.telegraphTicks === 0 && burst.activeTicks > 0) {
      effect(state, 'Roquette interceptée', 'warning', p.x, p.y);
      p.ttl = 0;
      continue;
    }
    if (distance <= p.speed + 5) {
      if (p.targetPart.startsWith('minion:')) hitMinion(state, Number(p.targetPart.slice(7)), p.damage);
      else hitBoss(state, p.targetPart, p.damage, p.kind);
      p.ttl = 0;
    } else {
      p.x += Math.round(dx / distance * p.speed);
      p.y += Math.round(dy / distance * p.speed);
    }
  }
  state.projectiles = state.projectiles.filter((p) => p.ttl > 0);
  state.minions = state.minions.filter((m) => m.hp > 0);
}

function takeDamage(state: BattleState, amount: number, blockable = false): void {
  if (state.player.invulnerableTicks > 0) return;
  if (blockable && state.player.y < 45 && state.covers.some((c) => Math.abs(c.x - state.player.x) <= c.width / 2)) {
    effect(state, 'À couvert', 'supply');
    return;
  }
  const difficulty = state.difficulty === 'story' ? 0.55 : state.difficulty === 'hard' ? 1.35 : 1;
  const guard = blockable && state.player.guardTicks > 0 ? 0.25 : 1;
  const hpFloor = state.mode === 'training' ? 1 : 0;
  const dealt = Math.min(Math.max(0, state.player.hp - hpFloor), Math.round(amount * difficulty * guard));
  state.player.hp -= dealt;
  state.stats.damageTaken += dealt;
  state.player.invulnerableTicks = 35;
  playerAction(state, 'hurt', 15);
  effect(state, dealt ? `−${dealt}` : 'Entraînement', 'warning');
}

function interact(state: BattleState): void {
  const station = state.stations.filter((s) => Math.abs(s.x - state.player.x) <= 70 && state.player.y < 35)
    .sort((a, b) => Math.abs(a.x - state.player.x) - Math.abs(b.x - state.player.x))[0];
  if (!station) { state.message = 'Approchez-vous d’un équipement de l’arène et appuyez sur Interaction.'; return; }
  if (station.cooldown > 0) { state.message = `${station.label} : récupération en cours.`; return; }
  playerAction(state, 'interact', 18);
  if (station.kind === 'supply') {
    state.player.ammo = state.player.maxAmmo;
    station.cooldown = 100;
    effect(state, '+3 roquettes', 'supply');
    state.message = 'Réserve remplie. Le poste RPG est à droite.';
    return;
  }
  if (station.kind === 'launcher') {
    if (state.player.ammo <= 0) { state.message = 'Réserve RPG vide : ravitaillement à gauche.'; return; }
    if (state.boss.hp <= 0) { state.message = 'Nacelle neutralisée : occupez-vous des renforts.'; return; }
    state.player.ammo--;
    station.cooldown = 90;
    shoot(state, 300, 'rocket', true);
    state.message = 'Roquette lancée. Restez mobile pendant la préparation de l’attaque suivante.';
    return;
  }
  if (station.id !== 'discharge') {
    station.charge = 1;
    effect(state, 'Générateur armé', 'supply', station.x, 80);
    state.message = 'Armez les deux générateurs, puis utilisez la commande centrale quand Gargantua entre dans la cage.';
    return;
  }
  const generators = state.stations.filter((s) => s.id.startsWith('generator-'));
  if (generators.some((s) => !s.charge)) { state.message = 'Il faut armer les deux générateurs avant la décharge.'; return; }
  if (state.boss.x < 780 || state.boss.x > 1060) { state.message = 'Attendez que Gargantua soit entre les pylônes de la cage.'; return; }
  for (const generator of generators) generator.charge = 0;
  station.cooldown = 180;
  hitBoss(state, 'body', 400, 'environment');
  state.boss.attack = null;
  state.boss.nextAttackTicks = 120;
  effect(state, 'DÉCHARGE', 'special', state.boss.x, 150);
  state.message = 'Décharge confirmée. Réarmez les deux générateurs pour le prochain cycle.';
}

function special(state: BattleState): void {
  if (state.player.charge < 100 || state.player.cooldown > 0) return;
  state.player.charge = 0;
  state.player.cooldown = 36;
  playerAction(state, 'special', 26);
  const fighter = getFighter(state.fighterId);
  effect(state, fighter.specialName, 'special');
  switch (state.fighterId) {
    case 'gordon_hl2':
      shoot(state, 180, 'melee');
      break;
    case 'alyx_hl2':
      state.player.x = clamp(state.player.x + state.player.facing * 90, 45, ARENA_WIDTH - 45);
      state.player.invulnerableTicks = Math.max(state.player.invulnerableTicks, 16);
      state.player.dodgeCooldown = 0;
      shoot(state, 120, 'bullet');
      break;
    case 'barney_hl2':
      state.player.guardTicks = 180;
      shoot(state, 90, 'bullet');
      break;
    case 'shephard_op4':
      shoot(state, 150, 'explosive');
      break;
    case 'vortigaunt_hl2':
      for (const minion of state.minions) if (Math.abs(minion.x - state.player.x) <= 700) {
        hitMinion(state, minion.id, 150);
        minion.cooldown = 160;
        minion.telegraphTicks = 0;
      }
      if (!state.minions.length) shoot(state, 150, 'energy');
      break;
    case 'combine_elite_hl2':
      shoot(state, 200, 'energy_orb');
      state.projectiles[state.projectiles.length - 1].speed = 11;
      state.projectiles[state.projectiles.length - 1].radius = 12;
      break;
  }
}

function scheduleAttack(state: BattleState): void {
  const cycle = state.boss.cycle++;
  const phase = state.boss.phase;
  const playerX = state.player.x;
  let attack: Omit<BossAttack, 'id' | 'resolved'>;
  if (state.bossId === 'strider_hl2') {
    attack = cycle % 3 === 2
      ? { label: 'Canon à distorsion : quittez la zone', kind: 'cannon', x: playerX, width: 280, telegraphTicks: 90, activeTicks: 18, damage: 2600, blockable: false }
      : cycle % 3 === 1
        ? { label: 'Écrasement : éloignez-vous ou sautez', kind: 'stomp', x: state.boss.x, width: 290, telegraphTicks: 65, activeTicks: 20, damage: 2100, blockable: false }
        : { label: 'Rafale : couverture ou esquive', kind: 'burst', x: playerX, width: 220, telegraphTicks: 70, activeTicks: 34, damage: 1300, blockable: true };
  } else if (state.bossId === 'gunship_hl2') {
    attack = cycle % 3 === 2
      ? { label: 'Passe à impulsions : couverture ou esquive', kind: 'strafe', x: playerX, width: 340, telegraphTicks: 70, activeTicks: 24, damage: 2100, blockable: true }
      : { label: 'Rafale et interception des roquettes', kind: 'burst', x: playerX, width: 290, telegraphTicks: 80, activeTicks: 75, damage: 1500, blockable: true };
  } else if (state.bossId === 'dropship_hl2') {
    attack = { label: 'Mitrailleuse de nacelle : cherchez un couvert', kind: 'burst', x: playerX, width: 240, telegraphTicks: 75, activeTicks: 32, damage: 1200, blockable: true };
    if (cycle % 2 === 1 && state.minions.length < 3 && state.boss.hp > 0) {
      state.minions.push({ id: state.nextId++, x: 850 + random(state) % 110, hp: 210, maxHp: 210, cooldown: 100, telegraphTicks: 0 });
      effect(state, 'Renfort débarqué', 'warning', state.boss.x, 120);
    }
  } else {
    attack = cycle % 2 === 0
      ? { label: 'Souffle de flammes : reculez', kind: 'flame', x: state.boss.x - 190, width: 430, telegraphTicks: 85, activeTicks: 32, damage: 1900, blockable: false }
      : { label: 'Onde au sol : sautez', kind: 'shock', x: ARENA_WIDTH / 2, width: ARENA_WIDTH, telegraphTicks: 80, activeTicks: 12, damage: 1600, blockable: false };
  }
  const difficulty = state.difficulty === 'story' ? 20 : state.difficulty === 'hard' ? -12 : 0;
  attack.telegraphTicks = Math.max(42, attack.telegraphTicks + difficulty - phase * 5);
  state.boss.attack = { ...attack, id: state.nextId++, resolved: false };
  state.message = attack.label;
}

function updateBoss(state: BattleState): void {
  const b = state.boss;
  b.phase = state.bossId === 'dropship_hl2'
    ? b.hp <= 0 ? 2 : state.activeTicks >= 240 ? 1 : 0
    : b.hp <= b.maxHp / 3 ? 2 : b.hp <= b.maxHp * 2 / 3 ? 1 : 0;
  if (state.bossId === 'gunship_hl2') {
    const t = state.activeTicks % 480;
    b.x = 800 + Math.round((t <= 240 ? t : 480 - t) * 1.25);
    b.y = 315 + Math.floor((state.activeTicks % 180) / 6);
  } else if (state.bossId === 'gargantua_hl1') {
    const t = state.activeTicks % 540;
    b.x = 760 + Math.round((t <= 270 ? t : 540 - t) * 0.9);
  } else if (state.bossId === 'dropship_hl2' && b.hp <= 0) {
    b.retreatTicks = dec(b.retreatTicks);
    b.x += 3;
    b.y += 1;
    b.phase = 2;
    return;
  }
  if (!b.attack) {
    b.nextAttackTicks = dec(b.nextAttackTicks);
    if (!b.nextAttackTicks && b.hp > 0) scheduleAttack(state);
    return;
  }
  const attack = b.attack;
  if (attack.telegraphTicks > 0) { attack.telegraphTicks--; return; }
  if (!attack.resolved) {
    const hitX = Math.abs(state.player.x - attack.x) <= attack.width / 2 + 16;
    const clearsGroundAttack = (attack.kind === 'shock' || attack.kind === 'stomp') && state.player.y > 45;
    if (hitX && !clearsGroundAttack) {
      attack.resolved = true;
      takeDamage(state, attack.damage, attack.blockable);
    }
  }
  attack.activeTicks = dec(attack.activeTicks);
  if (!attack.activeTicks) {
    b.attack = null;
    b.nextAttackTicks = Math.max(45, 115 - b.phase * 18 - (state.difficulty === 'hard' ? 18 : 0));
  }
}

function updateMinions(state: BattleState): void {
  for (const minion of state.minions) {
    if (minion.hp <= 0) continue;
    if (minion.telegraphTicks > 0) {
      minion.telegraphTicks--;
      if (!minion.telegraphTicks) {
        if (Math.abs(minion.x - state.player.x) < 600) takeDamage(state, 450, true);
        minion.cooldown = 150;
      }
    } else if (minion.cooldown > 0) minion.cooldown--;
    else minion.telegraphTicks = 50;
    if (!minion.telegraphTicks && Math.abs(minion.x - state.player.x) > 250) minion.x += Math.sign(state.player.x - minion.x) * 2;
  }
  state.minions = state.minions.filter((m) => m.hp > 0);
}

function finish(state: BattleState, outcome: 'victory' | 'defeat'): void {
  if (state.result) return;
  const hpRatio = state.player.hp / state.player.maxHp;
  const seconds = Math.floor(state.activeTicks / 60);
  const score = outcome === 'victory' ? Math.max(0, 15000 + Math.floor(hpRatio * 10000) + Math.max(0, 12000 - seconds * 30) + state.stats.minionsDefeated * 250) : 0;
  const rank = state.mode === 'training' ? 'TRAINING' : outcome === 'defeat' ? 'C' : hpRatio > 0.85 && seconds < 120 ? 'S' : hpRatio > 0.55 ? 'A' : hpRatio > 0.25 ? 'B' : 'C';
  state.result = { outcome, score, rank, activeTicks: state.activeTicks, damageTaken: state.stats.damageTaken,
    shotsFired: state.stats.shotsFired, weakPointHits: state.stats.weakPointHits,
    objectiveLabel: outcome === 'defeat' ? 'Opération interrompue' : state.bossId === 'dropship_hl2' ? 'Débarquement neutralisé — transport retiré' : 'Menace neutralisée',
    eligibleForRecord: state.mode !== 'training' && outcome === 'victory' && !(state.mode === 'rush' && state.continues > 0) };
  if (outcome === 'defeat') state.status = 'defeat';
  else if (state.mode === 'rush') {
    state.rushResults.push(state.result);
    state.status = state.rushIndex === BOSS_ORDER.length - 1 ? 'complete' : 'intermission';
  } else state.status = 'victory';
  state.boss.attack = null;
  state.projectiles = [];
  state.message = state.result.objectiveLabel;
}

/** One immutable deterministic 1/60s step. No wall clock, DOM, storage or management state. */
export function stepBattle(previous: BattleState, input: BattleInput = {}): BattleState {
  if (TERMINAL.has(previous.status)) return previous;
  if (input.pause) {
    const state = copy(previous);
    if (state.status === 'paused') state.status = state.resumeStatus;
    else { state.resumeStatus = state.status === 'intro' ? 'intro' : 'active'; state.status = 'paused'; }
    return state;
  }
  if (previous.status === 'paused') return previous;
  const state = copy(previous);
  state.tick++;
  if (state.status === 'intro') {
    state.introTicks = input.skipIntro ? 0 : dec(state.introTicks);
    if (!state.introTicks) { state.status = 'active'; state.resumeStatus = 'active'; }
    return state;
  }
  state.activeTicks++;
  const p = state.player;
  const fighter = getFighter(state.fighterId);
  p.cooldown = dec(p.cooldown);
  p.dodgeCooldown = dec(p.dodgeCooldown);
  p.invulnerableTicks = dec(p.invulnerableTicks);
  p.guardTicks = dec(p.guardTicks);
  p.actionTicks = dec(p.actionTicks);
  for (const station of state.stations) station.cooldown = dec(station.cooldown);
  state.effects = state.effects.map((e) => ({ ...e, ticks: e.ticks - 1 })).filter((e) => e.ticks > 0);
  if (state.activeTicks % 12 === 0) p.charge = Math.min(100, p.charge + 1);
  const move = input.move === -1 || input.move === 1 ? input.move : 0;
  if (move) { p.facing = move; p.x = clamp(p.x + move * fighter.speed, 45, ARENA_WIDTH - 45); }
  if (input.jump && p.y === 0) { p.vy = 18; playerAction(state, 'jump', 12); }
  if (p.y > 0 || p.vy > 0) { p.y = Math.max(0, p.y + p.vy); p.vy--; if (!p.y) p.vy = 0; }
  if (input.dodge && !p.dodgeCooldown) {
    p.x = clamp(p.x + (move || p.facing) * 85, 45, ARENA_WIDTH - 45);
    p.invulnerableTicks = 18;
    p.dodgeCooldown = 75;
    state.stats.dodges++;
    playerAction(state, 'dodge', 18);
  }
  if (input.target) {
    state.boss.target = (state.boss.target + 1) % state.boss.parts.length;
    state.message = `Cible : ${state.boss.parts[state.boss.target].label}`;
  }
  if (input.interact) interact(state);
  if (input.special) special(state);
  else if (input.light && !p.cooldown) {
    p.cooldown = 22;
    playerAction(state, 'light', 15);
    effect(state, fighter.lightName, 'light');
    for (const minion of state.minions) if (Math.abs(minion.x - p.x) < 115) hitMinion(state, minion.id, 95);
    if (Math.abs(state.boss.x - p.x) < 160) hitBoss(state, state.boss.parts[state.boss.target].id, 75, 'melee');
  } else if (input.ranged && !p.cooldown && state.projectiles.length < 4) {
    p.cooldown = fighter.rangedCooldown;
    playerAction(state, 'ranged', 10);
    shoot(state, fighter.rangedDamage, fighter.rangedKind);
  }
  if (!p.actionTicks) p.action = p.y > 0 ? 'jump' : move ? 'walk' : 'idle';
  resolveProjectiles(state);
  // A confirmed lethal hit stops offensive logic immediately, before new hazards can spawn.
  if (state.boss.hp <= 0 && state.bossId !== 'dropship_hl2') { finish(state, 'victory'); return state; }
  updateBoss(state);
  updateMinions(state);
  if (p.hp <= 0) finish(state, 'defeat');
  else if (state.bossId === 'dropship_hl2' && state.boss.hp <= 0 && !state.boss.retreatTicks && !state.minions.length) finish(state, 'victory');
  return state;
}

/** A retry restarts this encounter; rush progress before the encounter is retained. */
export function restartBattle(previous: BattleState): BattleState {
  const state = createBattle({ fighterId: previous.fighterId, bossId: previous.bossId, mode: 'single', difficulty: previous.difficulty, seed: previous.seed });
  state.mode = previous.mode;
  state.rushIndex = previous.rushIndex;
  state.continues = previous.mode === 'rush' ? previous.continues + 1 : 0;
  state.rushResults = previous.rushResults.slice(0, previous.rushIndex);
  return state;
}

/** Only a completed rush encounter can advance. HP heals by 30%; equipment refills. */
export function nextEncounter(previous: BattleState): BattleState {
  if (previous.mode !== 'rush' || previous.status !== 'intermission' || !previous.result || previous.rushIndex >= BOSS_ORDER.length - 1) return previous;
  const state = createBattle({ fighterId: previous.fighterId, bossId: BOSS_ORDER[previous.rushIndex + 1], mode: 'single', difficulty: previous.difficulty, seed: previous.rng });
  state.mode = 'rush';
  state.rushIndex = previous.rushIndex + 1;
  state.continues = previous.continues;
  state.rushResults = [...previous.rushResults];
  state.player.hp = Math.min(state.player.maxHp, previous.player.hp + Math.floor(state.player.maxHp * 0.3));
  state.player.charge = Math.min(100, previous.player.charge + 30);
  state.message = 'Rencontre suivante : +30 % de vie maximale, +30 de charge, réserve RPG restaurée.';
  return state;
}

export function rushTotalScore(state: BattleState): number {
  return state.rushResults.reduce((sum, result) => sum + result.score, 0);
}

export function currentTarget(state: BattleState) {
  return state.boss.parts[state.boss.target];
}

export function nearestStation(state: BattleState): ArenaStation | null {
  return state.stations.filter((station) => Math.abs(station.x - state.player.x) <= 70 && state.player.y < 35)
    .sort((a, b) => Math.abs(a.x - state.player.x) - Math.abs(b.x - state.player.x))[0] ?? null;
}
