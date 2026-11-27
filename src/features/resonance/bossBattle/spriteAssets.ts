import gordonUrl from '../../../../assets/resonance/candidates/continuation_20261124_h/heroes/gordon_hl2_idle_h.png';
import alyxUrl from '../../../../assets/resonance/candidates/continuation_20261124_h/heroes/alyx_hl2_idle_h.png';
import barneyUrl from '../../../../assets/resonance/candidates/continuation_20261124_h/heroes/barney_hl2_idle_h.png';
import shephardUrl from '../../../../assets/resonance/candidates/continuation_20261124_h/heroes/shephard_op4_idle_h.png';
import vortigauntUrl from '../../../../assets/resonance/candidates/continuation_20261124_h/heroes/vortigaunt_hl2_idle_h.png';
import eliteUrl from '../../../../assets/resonance/candidates/combine_elite_hl2_idle_left.png';
import gunshipUrl from '../../../../assets/resonance/candidates/continuation_20261124_f/gunship_hl2_hover_left_f.png';
import type { BossId, FighterId } from './types';

/** Audited static candidate poses, not animation clips or certified 1:1 art. */
export interface SpriteAsset {
  assetId: string;
  repositoryPath: string;
  url: string;
  sourceSize: readonly [number, number];
  /** Source pixels: alpha >= 16 bounds plus eight pixels of edge padding. */
  crop: { x: number; y: number; width: number; height: number };
  /** Normalized inside crop: midpoint of soles for fighters, body target for Gunship. */
  anchor: readonly [number, number];
  sourceFacing: -1 | 1;
  renderHeight: number;
  /** Optional attachment in full source pixels, without changing any gameplay target. */
  muzzleSource?: readonly [number, number];
}

export const FIGHTER_SPRITES = {
  gordon_hl2: {
    assetId: 'gordon_hl2_idle_h',
    repositoryPath: 'assets/resonance/candidates/continuation_20261124_h/heroes/gordon_hl2_idle_h.png',
    url: gordonUrl, sourceSize: [1148, 1370],
    crop: { x: 185, y: 57, width: 753, height: 1279 },
    anchor: [360 / 753, 1270 / 1279], sourceFacing: 1, renderHeight: 100,
  },
  alyx_hl2: {
    assetId: 'alyx_hl2_idle_h',
    repositoryPath: 'assets/resonance/candidates/continuation_20261124_h/heroes/alyx_hl2_idle_h.png',
    url: alyxUrl, sourceSize: [1024, 1536],
    crop: { x: 56, y: 25, width: 863, height: 1495 },
    anchor: [407.75 / 863, 1486 / 1495], sourceFacing: 1, renderHeight: 100,
  },
  barney_hl2: {
    assetId: 'barney_hl2_idle_h',
    repositoryPath: 'assets/resonance/candidates/continuation_20261124_h/heroes/barney_hl2_idle_h.png',
    url: barneyUrl, sourceSize: [1060, 1484],
    crop: { x: 73, y: 17, width: 908, height: 1457 },
    anchor: [423.75 / 908, 1448 / 1457], sourceFacing: 1, renderHeight: 100,
  },
  shephard_op4: {
    assetId: 'shephard_op4_idle_h',
    repositoryPath: 'assets/resonance/candidates/continuation_20261124_h/heroes/shephard_op4_idle_h.png',
    url: shephardUrl, sourceSize: [1199, 1312],
    crop: { x: 224, y: 67, width: 657, height: 1172 },
    anchor: [306 / 657, 1163 / 1172], sourceFacing: 1, renderHeight: 100,
  },
  vortigaunt_hl2: {
    assetId: 'vortigaunt_hl2_idle_h',
    repositoryPath: 'assets/resonance/candidates/continuation_20261124_h/heroes/vortigaunt_hl2_idle_h.png',
    url: vortigauntUrl, sourceSize: [1234, 1274],
    crop: { x: 67, y: 37, width: 1107, height: 1200 },
    anchor: [405.75 / 1107, 1191 / 1200], sourceFacing: 1, renderHeight: 100,
  },
  combine_elite_hl2: {
    assetId: 'combine_elite_hl2_idle_left',
    repositoryPath: 'assets/resonance/candidates/combine_elite_hl2_idle_left.png',
    url: eliteUrl, sourceSize: [1245, 1263],
    crop: { x: 81, y: 8, width: 1000, height: 1242 },
    anchor: [604.5 / 1000, 1234 / 1242], sourceFacing: -1, renderHeight: 100,
  },
} satisfies Record<FighterId, SpriteAsset>;

// Strider EP2 is not a substitute for HL2; the rear Gargantua and composite
// Dropship cannot represent their existing target parts and remain vector fallbacks.
export const BOSS_SPRITES = {
  gunship_hl2: {
    assetId: 'gunship_hl2_hover_left_f',
    repositoryPath: 'assets/resonance/candidates/continuation_20261124_f/gunship_hl2_hover_left_f.png',
    url: gunshipUrl, sourceSize: [2172, 724],
    crop: { x: 50, y: 33, width: 2079, height: 670 },
    anchor: [950 / 2079, 357 / 670], sourceFacing: -1, renderHeight: 108,
    muzzleSource: [58, 462],
  },
} satisfies Partial<Record<BossId, SpriteAsset>>;

const imageCache = new Map<string, { image: HTMLImageElement; failed: boolean }>();

/** Loading and failed images deliberately leave the vector rendering available. */
export function getSpriteImage(asset: SpriteAsset): HTMLImageElement | undefined {
  if (typeof Image === 'undefined') return undefined;
  let entry = imageCache.get(asset.url);
  if (!entry) {
    const image = new Image();
    const pending = { image, failed: false };
    imageCache.set(asset.url, pending);
    image.decoding = 'async';
    image.onerror = () => { pending.failed = true; };
    image.src = asset.url;
    entry = pending;
  }
  const { image, failed } = entry;
  if (failed || !image.complete || image.naturalWidth !== asset.sourceSize[0] || image.naturalHeight !== asset.sourceSize[1]) return undefined;
  return image;
}

/** Draw around an invariant world anchor; mirroring never shifts the feet. */
export function drawSprite(
  ctx: CanvasRenderingContext2D, asset: SpriteAsset, x: number, y: number,
  facing: -1 | 1, heightScale = 1,
): boolean {
  const image = getSpriteImage(asset);
  if (!image) return false;
  const { crop, anchor } = asset;
  const width = crop.width / crop.height * asset.renderHeight;
  const height = asset.renderHeight * heightScale;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing * asset.sourceFacing, 1);
  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, -anchor[0] * width, -anchor[1] * height, width, height);
  ctx.restore();
  return true;
}

/** Map a visible source attachment to the same transform used by drawSprite. */
export function spriteSourcePoint(asset: SpriteAsset, point: readonly [number, number], x: number, y: number, facing: -1 | 1): [number, number] {
  const scale = asset.renderHeight / asset.crop.height;
  return [
    x + (point[0] - asset.crop.x - asset.anchor[0] * asset.crop.width) * scale * facing * asset.sourceFacing,
    y + (point[1] - asset.crop.y - asset.anchor[1] * asset.crop.height) * scale,
  ];
}
