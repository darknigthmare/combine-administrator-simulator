import { describe, expect, it } from 'vitest';
import { BOSS_CATALOG, BOSS_ORDER, FIGHTER_CATALOG } from './catalog';
import { createBattle, nextEncounter, restartBattle, stepBattle } from './engine';
import type { BattleInput, BattleState, BossId, FighterId } from './types';

const active = (bossId: BossId = 'strider_hl2', fighterId: FighterId = 'gordon_hl2', mode: BattleState['mode'] = 'single') =>
  stepBattle(createBattle({ bossId, fighterId, mode, difficulty: 'story', seed: 8675309 }), { skipIntro: true });

function ticks(state: BattleState, count: number, input: BattleInput = {}): BattleState {
  for (let i = 0; i < count; i++) state = stepBattle(state, input);
  return state;
}

/** An input-only pilot proves that every operation can be completed with arena equipment. */
function clearEncounter(initial: BattleState): BattleState {
  let state = initial;
  for (let i = 0; i < 9000 && ['active', 'intro'].includes(state.status); i++) {
    if (state.status === 'intro') { state = stepBattle(state, { skipIntro: true }); continue; }
    let destination = 310;
    if (state.bossId === 'gargantua_hl1') {
      const unarmed = state.stations.find((s) => s.id.startsWith('generator-') && !s.charge);
      destination = unarmed?.x ?? 410;
    } else if (!state.player.ammo && state.boss.hp > 0) destination = 120;
    const move = Math.abs(state.player.x - destination) > 8 ? Math.sign(destination - state.player.x) as -1 | 1 : 0;
    const attack = state.boss.attack;
    state = stepBattle(state, {
      move,
      interact: !move && i % 3 === 0,
      ranged: state.bossId === 'dropship_hl2' && state.minions.length > 0,
      light: state.minions.some((m) => Math.abs(m.x - state.player.x) < 95) && i % 25 === 0,
      // Jump an announced ground wave; all other damage remains real in this pilot.
      jump: attack?.kind === 'shock' && attack.telegraphTicks === 15,
      target: state.bossId === 'dropship_hl2' && state.boss.target !== 1,
    });
  }
  return state;
}

describe('Boss Battle deterministic combat', () => {
  it('does not mutate the input state and reproduces a seeded input stream', () => {
    let a = active('dropship_hl2');
    let b = active('dropship_hl2');
    const snapshot = JSON.stringify(a);
    const first = stepBattle(a, { move: 1, ranged: true });
    expect(JSON.stringify(a)).toBe(snapshot);
    expect(first).not.toBe(a);
    for (let i = 0; i < 1600; i++) {
      const input: BattleInput = { move: i % 240 < 120 ? 1 : -1, jump: i % 97 === 0, ranged: i % 4 === 0, special: i % 610 === 0 };
      a = stepBattle(a, input);
      b = stepBattle(b, input);
    }
    expect(a).toEqual(b);
    expect(a.activeTicks).toBeGreaterThan(0);
  });

  it('keeps damage and the active clock stopped throughout intro and pause', () => {
    const initial = createBattle({ bossId: 'strider_hl2', fighterId: 'gordon_hl2' });
    const intro = ticks(initial, 80, { ranged: true, interact: true });
    expect(intro.activeTicks).toBe(0);
    expect(intro.player.hp).toBe(initial.player.hp);
    expect(intro.projectiles).toHaveLength(0);
    const paused = stepBattle(intro, { pause: true });
    expect(ticks(paused, 200, { move: 1, ranged: true })).toBe(paused);
    const resumed = stepBattle(paused, { pause: true });
    expect(resumed.status).toBe('intro');
    const fight = stepBattle(resumed, { skipIntro: true });
    const pausedFight = stepBattle(fight, { pause: true });
    expect(ticks(pausedFight, 300)).toBe(pausedFight);
    expect(stepBattle(pausedFight, { pause: true }).activeTicks).toBe(0);
  });

  it('never lets ordinary shots kill a Strider or Gunship, or any shot hurt the Dropship body', () => {
    for (const bossId of ['strider_hl2', 'gunship_hl2', 'dropship_hl2'] as BossId[]) {
      let state = active(bossId, 'gordon_hl2', 'training');
      if (bossId === 'dropship_hl2') state = stepBattle(state, { target: true });
      const startHp = state.boss.hp;
      state = ticks(state, 250, { ranged: true });
      expect(state.boss.hp).toBe(startHp);
      expect(state.status).toBe('active');
      if (bossId === 'dropship_hl2') {
        while (state.player.x < 300) state = stepBattle(state, { move: 1 });
        state = stepBattle(state, { interact: true });
        state = ticks(state, 160);
        expect(state.boss.hp).toBe(startHp);
        expect(state.boss.parts.find((p) => p.id === 'body')?.hp).toBe(1);
      }
    }
  });

  it('does not award a survival victory against a live boss', () => {
    const state = ticks(active('gargantua_hl1', 'gordon_hl2', 'training'), 18000);
    expect(state.status).toBe('active');
    expect(state.boss.hp).toBe(state.boss.maxHp);
    expect(state.result).toBeNull();
    expect(state.player.hp).toBeGreaterThanOrEqual(1);
  });

  it('distinguishes effective AR2 orbs from ordinary energy and preserves Dropship body immunity', () => {
    for (const bossId of ['strider_hl2', 'gunship_hl2', 'dropship_hl2'] as BossId[]) {
      let state = active(bossId, 'combine_elite_hl2', 'training');
      const hp = state.boss.hp;
      state = ticks(stepBattle(state, { special: true }), 140);
      expect(state.boss.hp, `${bossId} should take an AR2 orb`).toBe(hp - 200);
    }
    let body = active('dropship_hl2', 'combine_elite_hl2', 'training');
    body = stepBattle(body, { target: true });
    body = ticks(stepBattle(body, { special: true }), 140);
    expect(body.boss.hp).toBe(body.boss.maxHp);
    expect(body.boss.parts[0].hp).toBe(1);
    const vort = ticks(stepBattle(active('strider_hl2', 'vortigaunt_hl2', 'training'), { special: true }), 140);
    expect(vort.boss.hp).toBe(vort.boss.maxHp);
  });

  it('allows a Gunship burst to intercept a rocket instead of granting damage', () => {
    const state = active('gunship_hl2');
    state.boss.attack = { id: 1, label: 'Rafale', kind: 'burst', x: 400, width: 200, telegraphTicks: 0, activeTicks: 30, damage: 1000, blockable: true, resolved: false };
    state.projectiles.push({ id: 2, x: state.boss.x - 20, y: state.boss.y, targetX: state.boss.x, targetY: state.boss.y, speed: 9, damage: 300, kind: 'rocket', targetPart: 'body', ttl: 10, owner: 'player', radius: 8 });
    const after = stepBattle(state);
    expect(after.boss.hp).toBe(state.boss.maxHp);
    expect(after.projectiles).toHaveLength(0);
    expect(after.effects.some((effect) => effect.label === 'Roquette interceptée')).toBe(true);
  });

  it('keeps the Gunship assault as covered pulse fire instead of a Strider distortion cannon', () => {
    let state = active('gunship_hl2', 'gordon_hl2', 'training');
    const attacks = new Map<number, NonNullable<BattleState['boss']['attack']>>();
    for (let i = 0; i < 1600; i++) {
      state = stepBattle(state);
      if (state.boss.attack) attacks.set(state.boss.attack.id, state.boss.attack);
    }
    expect([...attacks.values()].some(attack => attack.kind === 'strafe')).toBe(true);
    expect([...attacks.values()].every(attack => attack.kind !== 'cannon' && attack.blockable)).toBe(true);
  });

  it('requires both generators and resets them after an environmental discharge', () => {
    let state = active('gargantua_hl1');
    while (state.player.x < 410) state = stepBattle(state, { move: 1 });
    const hp = state.boss.hp;
    state = stepBattle(state, { interact: true });
    expect(state.boss.hp).toBe(hp);
    while (state.player.x > 220) state = stepBattle(state, { move: -1 });
    state = stepBattle(state, { interact: true });
    while (state.player.x < 570) state = stepBattle(state, { move: 1 });
    state = stepBattle(state, { interact: true });
    while (state.player.x > 410) state = stepBattle(state, { move: -1 });
    state = stepBattle(state, { interact: true });
    expect(state.boss.hp).toBe(hp - 400);
    expect(state.stations.filter((s) => s.id.startsWith('generator-')).every((s) => s.charge === 0)).toBe(true);
  });

  it('completes every boss with each of the six pilots using real inputs', () => {
    for (const fighter of FIGHTER_CATALOG) for (const boss of BOSS_CATALOG) {
      const state = clearEncounter(active(boss.id, fighter.id));
      expect(state.status, `${fighter.id} versus ${boss.id}`).toBe('victory');
      expect(state.result?.outcome).toBe('victory');
      expect(state.result?.eligibleForRecord).toBe(true);
      expect(state.objectiveProgress).toBe(state.objectiveTarget);
      if (boss.id === 'dropship_hl2') {
        expect(state.boss.parts[0].hp).toBe(1);
        expect(state.minions).toHaveLength(0);
        expect(state.result?.objectiveLabel).toContain('transport retiré');
      }
    }
  });

  it('creates a stable final result and cannot farm it with further ticks', () => {
    const cleared = clearEncounter(active());
    expect(ticks(cleared, 1000, { ranged: true, interact: true, pause: true })).toBe(cleared);
    expect(cleared.result?.score).toBeGreaterThan(0);
    const retry = restartBattle(cleared);
    expect(retry.status).toBe('intro');
    expect(retry.result).toBeNull();
    expect(retry.boss.hp).toBe(retry.boss.maxHp);
    expect(retry.activeTicks).toBe(0);
  });

  it('advances the entire rush, restores equipment, and preserves completed results', () => {
    let state = active('strider_hl2', 'gordon_hl2', 'rush');
    expect(nextEncounter(state)).toBe(state);
    for (let index = 0; index < BOSS_ORDER.length; index++) {
      expect(state.bossId).toBe(BOSS_ORDER[index]);
      state = clearEncounter(state);
      expect(state.rushResults).toHaveLength(index + 1);
      if (index < BOSS_ORDER.length - 1) {
        expect(state.status).toBe('intermission');
        const hp = state.player.hp;
        state = nextEncounter(state);
        expect(state.player.hp).toBe(Math.min(state.player.maxHp, hp + Math.floor(state.player.maxHp * 0.3)));
        expect(state.player.ammo).toBe(3);
      }
    }
    expect(state.status).toBe('complete');
    expect(nextEncounter(state)).toBe(state);
  });

  it('excludes training victories from records and produces a real defeat in standard play', () => {
    const training = clearEncounter(active('strider_hl2', 'gordon_hl2', 'training'));
    expect(training.status).toBe('victory');
    expect(training.result?.eligibleForRecord).toBe(false);
    expect(training.result?.rank).toBe('TRAINING');
    const defeat = ticks(active('strider_hl2'), 30000);
    expect(defeat.status).toBe('defeat');
    expect(defeat.player.hp).toBe(0);
    expect(defeat.result?.score).toBe(0);
  });

  it('lets a rush continue after failure without producing a ranked rush record', () => {
    const failed = ticks(active('strider_hl2', 'gordon_hl2', 'rush'), 30000);
    expect(failed.status).toBe('defeat');
    const retry = restartBattle(failed);
    expect(retry.continues).toBe(1);
    const cleared = clearEncounter(retry);
    expect(cleared.status).toBe('intermission');
    expect(cleared.result?.eligibleForRecord).toBe(false);
    expect(nextEncounter(cleared).continues).toBe(1);
  });
});
