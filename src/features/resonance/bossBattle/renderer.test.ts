import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createBattle } from './engine';
import type { FighterId } from './types';

class TestImage {
  static instances: TestImage[] = [];
  src = '';
  decoding = '';
  complete = false;
  naturalWidth = 0;
  naturalHeight = 0;
  width = 0;
  height = 0;
  onerror: (() => void) | null = null;
  constructor() { TestImage.instances.push(this); }
  finish(width: number, height: number) {
    this.width = this.naturalWidth = width;
    this.height = this.naturalHeight = height;
    this.complete = true;
  }
}

function context() {
  const methods = ['save', 'restore', 'translate', 'scale', 'drawImage', 'beginPath', 'moveTo', 'lineTo', 'closePath', 'stroke', 'fill', 'ellipse', 'arc', 'fillRect', 'strokeRect', 'fillText', 'setLineDash'];
  const spies = Object.fromEntries(methods.map(method => [method, vi.fn()]));
  return {
    ...spies,
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  } as unknown as CanvasRenderingContext2D;
}

beforeEach(() => {
  vi.resetModules();
  TestImage.instances = [];
  vi.stubGlobal('Image', TestImage);
});
afterEach(() => vi.unstubAllGlobals());

describe('Boss Battle static candidate sprite rendering', () => {
  it('keeps a fallback while loading, after a failed image, and without browser Image', async () => {
    const { drawSprite, FIGHTER_SPRITES } = await import('./spriteAssets');
    const ctx = context();
    const asset = FIGHTER_SPRITES.gordon_hl2;
    expect(drawSprite(ctx, asset, 180, 555, 1)).toBe(false);
    expect(drawSprite(ctx, asset, 180, 555, 1)).toBe(false);
    expect(TestImage.instances).toHaveLength(1);
    expect(ctx.drawImage).not.toHaveBeenCalled();
    const image = TestImage.instances[0];
    image.complete = true;
    image.onerror?.();
    // Even a later spurious load cannot replace a known failed source.
    image.finish(...asset.sourceSize);
    expect(drawSprite(ctx, asset, 180, 555, 1)).toBe(false);
    expect(TestImage.instances).toHaveLength(1);
    vi.stubGlobal('Image', undefined);
    expect(drawSprite(ctx, FIGHTER_SPRITES.alyx_hl2, 180, 555, 1)).toBe(false);
  });

  it('rejects unexpected source dimensions instead of applying obsolete crop coordinates', async () => {
    const { drawSprite, FIGHTER_SPRITES } = await import('./spriteAssets');
    const ctx = context();
    const asset = FIGHTER_SPRITES.barney_hl2;
    drawSprite(ctx, asset, 180, 555, 1);
    TestImage.instances[0].finish(100, 100);
    expect(drawSprite(ctx, asset, 180, 555, 1)).toBe(false);
    expect(ctx.drawImage).not.toHaveBeenCalled();
  });

  it('keeps measured sole anchors on the same floor when facing either way or dodging', async () => {
    const { drawSprite, FIGHTER_SPRITES } = await import('./spriteAssets');
    // Independently measured from alpha >= 128, bottom 10% of each source pose.
    const soles: Record<FighterId, [number, number]> = {
      gordon_hl2: [545, 1327], alyx_hl2: [463.75, 1511], barney_hl2: [496.75, 1465],
      shephard_op4: [530, 1230], vortigaunt_hl2: [472.75, 1228], combine_elite_hl2: [685.5, 1242],
    };
    for (const id of Object.keys(soles) as FighterId[]) {
      const asset = FIGHTER_SPRITES[id];
      const ctx = context();
      drawSprite(ctx, asset, 180, 555, 1);
      TestImage.instances.at(-1)!.finish(...asset.sourceSize);
      for (const facing of [-1, 1] as const) for (const heightScale of [1, .78]) {
        vi.mocked(ctx.drawImage).mockClear();
        expect(drawSprite(ctx, asset, 180, 555, facing, heightScale)).toBe(true);
        const args = vi.mocked(ctx.drawImage).mock.calls[0];
        const [, sx, sy, sw, sh, dx, dy, dw, dh] = args as unknown as [TestImage, number, number, number, number, number, number, number, number];
        const localX = dx + (soles[id][0] - sx) / sw * dw;
        const localY = dy + (soles[id][1] - sy) / sh * dh;
        expect(localX).toBeCloseTo(0, 8);
        expect(localY).toBeCloseTo(0, 8);
        expect(ctx.translate).toHaveBeenLastCalledWith(180, 555);
        expect(ctx.scale).toHaveBeenLastCalledWith(facing * (id === 'combine_elite_hl2' ? -1 : 1), 1);
        expect(dh).toBe(100 * heightScale);
      }
    }
  });

  it('draws the seven audited images without changing combat state or suppressing timing cues', async () => {
    const { renderBattle } = await import('./renderer');
    const { FIGHTER_SPRITES, BOSS_SPRITES } = await import('./spriteAssets');
    for (const fighterId of Object.keys(FIGHTER_SPRITES) as FighterId[]) {
      const state = createBattle({ bossId: 'gunship_hl2', fighterId });
      state.player.action = 'special';
      state.player.invulnerableTicks = 4;
      state.effects.push({ id: 77, x: 180, y: 70, label: 'Impact', kind: 'hit', ticks: 12 });
      const before = JSON.stringify(state);
      const ctx = context();
      const canvas = { width: 0, height: 0, getContext: () => ctx } as unknown as HTMLCanvasElement;
      renderBattle(canvas, state);
      for (const asset of [FIGHTER_SPRITES[fighterId], BOSS_SPRITES.gunship_hl2]) {
        TestImage.instances.find(image => image.src === asset.url)!.finish(...asset.sourceSize);
      }
      vi.mocked(ctx.drawImage).mockClear();
      renderBattle(canvas, state, { reducedMotion: true });
      expect(vi.mocked(ctx.drawImage).mock.calls.map(args => (args[0] as unknown as TestImage).src)).toEqual([
        BOSS_SPRITES.gunship_hl2.url, FIGHTER_SPRITES[fighterId].url,
      ]);
      expect(ctx.strokeRect).toHaveBeenCalledWith(-30, -88, 60, 92);
      expect(ctx.lineTo).toHaveBeenCalledWith(57, -56);
      expect(vi.mocked(ctx.fillText).mock.calls.some(args => args[0] === 'Impact')).toBe(true);
      expect(JSON.stringify(state)).toBe(before);
      vi.mocked(ctx.drawImage).mockClear();
      renderBattle(canvas, state, { preview: true, reducedMotion: true });
      expect(vi.mocked(ctx.drawImage).mock.calls.map(args => (args[0] as unknown as TestImage).src)).toEqual([BOSS_SPRITES.gunship_hl2.url]);
    }
  });

  it('anchors the Gunship body on its target and fires visual traces from its nose', async () => {
    const { BOSS_SPRITES, spriteSourcePoint } = await import('./spriteAssets');
    const { renderBattle } = await import('./renderer');
    const asset = BOSS_SPRITES.gunship_hl2;
    expect(spriteSourcePoint(asset, [1000, 390], 950, 225, -1)).toEqual([950, 225]);
    const muzzle = spriteSourcePoint(asset, [58, 462], 950, 225, -1);
    expect(muzzle[0]).toBeCloseTo(950 - 942 * 108 / 670);
    expect(muzzle[1]).toBeCloseTo(225 + 72 * 108 / 670);
    expect(spriteSourcePoint(asset, [58, 462], 950, 225, 1)[0]).toBeGreaterThan(950);
    const state = createBattle({ bossId: 'gunship_hl2', fighterId: 'alyx_hl2' });
    state.boss.attack = { id: 1, label: 'Burst', kind: 'burst', x: 180, width: 290, telegraphTicks: 0, activeTicks: 20, damage: 1500, blockable: true, resolved: false };
    const before = JSON.stringify(state);
    const ctx = context();
    const canvas = { width: 0, height: 0, getContext: () => ctx } as unknown as HTMLCanvasElement;
    renderBattle(canvas, state, { reducedMotion: true });
    expect(ctx.moveTo).toHaveBeenCalledWith(900, 225);
    TestImage.instances.find(image => image.src === asset.url)!.finish(...asset.sourceSize);
    vi.mocked(ctx.moveTo).mockClear();
    renderBattle(canvas, state, { reducedMotion: true });
    expect(ctx.moveTo).toHaveBeenCalledWith(...muzzle);
    expect(JSON.stringify(state)).toBe(before);
  });

  it('uses the existing vector fighter on a failed source and leaves unaudited bosses as vectors', async () => {
    const { renderBattle } = await import('./renderer');
    const { FIGHTER_SPRITES, BOSS_SPRITES } = await import('./spriteAssets');
    expect(Object.keys(BOSS_SPRITES)).toEqual(['gunship_hl2']);
    for (const bossId of ['strider_hl2', 'dropship_hl2', 'gargantua_hl1'] as const) {
      const state = createBattle({ bossId, fighterId: 'gordon_hl2' });
      const ctx = context();
      const canvas = { width: 0, height: 0, getContext: () => ctx } as unknown as HTMLCanvasElement;
      renderBattle(canvas, state);
      const failed = TestImage.instances.find(image => image.src === FIGHTER_SPRITES.gordon_hl2.url)!;
      failed.complete = true;
      failed.onerror?.();
      renderBattle(canvas, state);
      expect(ctx.drawImage).not.toHaveBeenCalled();
      expect(ctx.fillText).toHaveBeenCalledWith('λ', -6, -50);
      expect(ctx.ellipse).toHaveBeenCalled();
    }
  });
});
