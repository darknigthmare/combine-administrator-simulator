import cityBackgroundUrl from '../../../../assets/resonance/candidates/stage_city17_station_master.png';
import labBackgroundUrl from '../../../../assets/resonance/candidates/stage_black_mesa_testchamber_master.png';
import { ARENA_WIDTH, getBoss, getFighter } from './catalog';
import { BOSS_SPRITES, drawSprite, FIGHTER_SPRITES, getSpriteImage, spriteSourcePoint } from './spriteAssets';
import type { BattleState, BossId } from './types';

export const SCENE_HEIGHT = 650;
const FLOOR_Y = 555;
const backgrounds = new Map<string, HTMLImageElement>();

function background(url: string): HTMLImageElement | undefined {
  if (typeof Image === 'undefined') return undefined;
  if (!backgrounds.has(url)) {
    const img = new Image();
    img.src = url;
    backgrounds.set(url, img);
  }
  return backgrounds.get(url);
}

function line(ctx: CanvasRenderingContext2D, points: [number, number][], color: string, width = 2) {
  if (!points.length) return;
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (const [x, y] of points.slice(1)) ctx.lineTo(x, y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function oval(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, color: string, rotation = 0) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rotation, 0, Math.PI * 2);
  ctx.fill();
}

function polygon(ctx: CanvasRenderingContext2D, points: [number, number][], color: string, outline?: string) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (const [x, y] of points.slice(1)) ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  if (outline) { ctx.strokeStyle = outline; ctx.lineWidth = 2; ctx.stroke(); }
}

function drawStrider(ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) {
  const sway = Math.sin(frame / 50) * 4;
  const bodyY = y + sway;
  const toes: [number, number][] = [[x - 140, FLOOR_Y], [x + 155, FLOOR_Y], [x + 10, FLOOR_Y - 20]];
  const knees: [number, number][] = [[x - 155, bodyY + 120], [x + 125, bodyY + 98], [x + 55, bodyY + 155]];
  for (let i = 2; i >= 0; i--) {
    const points: [number, number][] = [[x + (i === 0 ? -30 : 34), bodyY + 19], knees[i], toes[i]];
    line(ctx, points, '#171e1d', i === 2 ? 17 : 22);
    line(ctx, points.map(([a, b]) => [a - 3, b] as [number, number]), i === 2 ? '#716b5b' : '#a7957d', i === 2 ? 8 : 11);
    oval(ctx, knees[i][0], knees[i][1], 14, 13, '#b9a48a');
    line(ctx, [toes[i], [toes[i][0] - 22, toes[i][1] + 3]], '#d0b9a0', 5);
  }
  oval(ctx, x + 1, bodyY + 1, 70, 45, '#292c27', -.12);
  oval(ctx, x - 12, bodyY - 7, 67, 36, '#ba9a80', -.12);
  oval(ctx, x - 33, bodyY - 6, 46, 30, '#c8ac8f', -.2);
  polygon(ctx, [[x - 71, bodyY + 2], [x - 110, bodyY + 18], [x - 64, bodyY + 23], [x - 45, bodyY + 11]], '#4e584d', '#c3baa0');
  oval(ctx, x - 91, bodyY + 17, 11, 8, '#7dd1df');
  line(ctx, [[x + 34, bodyY - 31], [x + 64, bodyY - 8], [x + 41, bodyY + 23]], '#5b6357', 8);
  for (let i = 0; i < 4; i++) line(ctx, [[x - 23 + i * 14, bodyY - 32], [x - 18 + i * 14, bodyY + 12]], '#806e5c', 4);
  line(ctx, [[x - 41, bodyY + 22], [x - 68, bodyY + 44], [x - 89, bodyY + 43]], '#a7b4a1', 9);
  oval(ctx, x - 91, bodyY + 43, 4, 4, '#ecf8c9');
}

function drawDropship(ctx: CanvasRenderingContext2D, x: number, y: number, frame: number, containerHp: number) {
  const bob = Math.sin(frame / 45) * 5;
  ctx.save(); ctx.translate(x, y + bob);
  const limbs: [number, number][][] = [
    [[-90, 5], [-156, 53], [-184, 37]], [[-35, 28], [-64, 101], [-89, 101]],
    [[58, 8], [144, 58], [179, 33]], [[90, -10], [171, -43], [198, -22]],
    [[-5, -13], [-69, -57], [-140, -44]], [[56, 20], [85, 94], [118, 89]],
  ];
  limbs.forEach((p, index) => { line(ctx, p, '#1a2926', 22); line(ctx, p, index > 3 ? '#707c6b' : '#abb29a', 13); });
  oval(ctx, -12, -8, 112, 42, '#798976', -.07);
  oval(ctx, -38, -19, 87, 29, '#a9ad91', -.08);
  polygon(ctx, [[-97, -22], [-158, -13], [-139, 18], [-94, 18]], '#c0bd9f', '#677e74');
  oval(ctx, -133, 2, 8, 6, '#80d5dd');
  line(ctx, [[34, -32], [77, -16], [93, 12], [56, 19]], '#c4bf9e', 8);
  if (containerHp > 0) {
    line(ctx, [[-55, 19], [-63, 77]], '#577165', 11);
    line(ctx, [[56, 21], [61, 76]], '#577165', 11);
    polygon(ctx, [[-82, 65], [59, 65], [86, 82], [78, 133], [-81, 133], [-96, 115]], '#515e52', '#a1b8a1');
    ctx.fillStyle = '#263a34'; ctx.fillRect(-70, 79, 119, 42);
    for (let i = 0; i < 5; i++) { ctx.fillStyle = '#81937d'; ctx.fillRect(-67 + i * 24, 80, 5, 41); }
    ctx.fillStyle = '#bdc7a6'; ctx.fillRect(-90, 97, 17, 7);
    ctx.fillStyle = '#a2e0dd'; ctx.fillRect(47, 94, 12, 5);
  }
  ctx.restore();
}

function drawGunship(ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) {
  ctx.save(); ctx.translate(x, y + Math.sin(frame / 52) * 4);
  polygon(ctx, [[-15, -20], [92, -61], [161, -30], [90, 11], [1, 31]], '#707d6c', '#b5b49a');
  polygon(ctx, [[-30, -9], [-113, -58], [-160, -34], [-119, 17], [-31, 33]], '#4b645c', '#9aa391');
  oval(ctx, 16, 14, 77, 48, '#ad9c80', -.13);
  oval(ctx, -15, 5, 63, 38, '#c3af8d', -.13);
  oval(ctx, -46, 7, 27, 23, '#3b5651');
  oval(ctx, -54, 4, 13, 10, '#8dd8e0');
  polygon(ctx, [[61, -11], [125, 11], [167, 54], [111, 37], [67, 31]], '#95a08a', '#546f66');
  line(ctx, [[6, 31], [-20, 58], [-66, 57]], '#6f8272', 13);
  oval(ctx, -69, 57, 7, 7, '#e4f3bd');
  oval(ctx, 41, -33, 31, 10, '#dae4bd88');
  line(ctx, [[41, -40], [41, -56]], '#a8ad8e', 8);
  const rotor = Math.cos(frame / 4) * 71;
  line(ctx, [[41 - rotor, -54], [41 + rotor, -54]], '#c0cdab', 4);
  for (let i = 0; i < 4; i++) line(ctx, [[15 + i * 13, -18], [8 + i * 14, 26]], '#7a8973', 4);
  ctx.restore();
}

function drawGargantua(ctx: CanvasRenderingContext2D, x: number, frame: number, defeated: boolean) {
  const stride = defeated ? 0 : Math.sin(frame / 31) * 7;
  ctx.save(); ctx.translate(x, FLOOR_Y);
  line(ctx, [[-25, -103], [-40 - stride, -50], [-58 - stride, -4], [-82 - stride, -3]], '#172e35', 39);
  line(ctx, [[29, -101], [39 + stride, -55], [62 + stride, -4], [83 + stride, -3]], '#172e35', 40);
  line(ctx, [[-27, -97], [-41 - stride, -50], [-58 - stride, -6]], '#53808d', 26);
  line(ctx, [[30, -97], [42 + stride, -53], [61 + stride, -6]], '#6593a0', 26);
  oval(ctx, 0, -152, 61, 85, '#345d70', -.04);
  oval(ctx, -6, -167, 56, 70, '#6f99a3', -.04);
  for (let i = 0; i < 4; i++) line(ctx, [[-42, -183 + i * 21], [0, -174 + i * 21], [40, -184 + i * 21]], '#2f6170', 9);
  oval(ctx, -17, -224, 34, 27, '#316174');
  oval(ctx, -24, -230, 32, 21, '#73a2aa');
  oval(ctx, -38, -226, 11, 8, '#e56c3c');
  oval(ctx, -41, -228, 4, 4, '#ffe580');
  line(ctx, [[-46, -198], [-93, -144], [-101, -101]], '#193b4b', 40);
  line(ctx, [[-47, -198], [-91, -143], [-100, -102]], '#6c99a2', 27);
  line(ctx, [[50, -194], [91, -146], [82, -99]], '#1e4252', 42);
  line(ctx, [[50, -194], [88, -143], [80, -101]], '#71a1aa', 27);
  polygon(ctx, [[-114, -114], [-83, -111], [-84, -77], [-109, -83]], '#2a4853', '#99b1aa');
  polygon(ctx, [[66, -113], [96, -110], [99, -78], [75, -79]], '#2a4853', '#99b1aa');
  oval(ctx, -101, -85, 7, 5, '#e7a152'); oval(ctx, 87, -82, 7, 5, '#e7a152');
  ctx.restore();
}

function drawFighter(ctx: CanvasRenderingContext2D, state: BattleState) {
  const player = state.player;
  const fighter = getFighter(state.fighterId);
  const x = player.x, y = FLOOR_Y - player.y;
  ctx.save();
  if (player.hp <= 0) ctx.globalAlpha = .5;
  ctx.translate(x, y);
  const spriteDrawn = drawSprite(ctx, FIGHTER_SPRITES[state.fighterId], 0, 0, player.facing, player.action === 'dodge' ? .78 : 1);
  ctx.scale(player.facing, 1);
  const stride = player.action === 'walk' ? Math.sin(state.tick / 4) * 10 : 4;
  const duck = player.action === 'dodge' ? 22 : 0;
  if (player.invulnerableTicks > 0) {
    oval(ctx, 0, -39, 35, 45, '#bedb7c20');
    ctx.strokeStyle = '#c2e9ab'; ctx.lineWidth = 1; ctx.strokeRect(-30, -88, 60, 92);
  }
  if (!spriteDrawn) {
    ctx.translate(0, duck);
    line(ctx, [[-7, -36], [-12 - stride, -16], [-13 - stride, 0]], '#152320', 12);
    line(ctx, [[7, -36], [9 + stride, -18], [13 + stride, 0]], '#152320', 12);
    line(ctx, [[-7, -36], [-12 - stride, -16], [-13 - stride, 0]], '#829280', 5);
    line(ctx, [[7, -36], [9 + stride, -18], [13 + stride, 0]], '#788672', 5);
    polygon(ctx, [[-14, -67], [10, -70], [17, -38], [-12, -35]], fighter.color, '#c3cba777');
    oval(ctx, 0, -79, 10, 12, state.fighterId === 'vortigaunt_hl2' ? '#8b9270' : '#c1ac8d');
    if (state.fighterId === 'gordon_hl2') {
      line(ctx, [[3, -81], [12, -80]], '#253d36', 3);
      polygon(ctx, [[1, -71], [8, -74], [5, -68]], '#34392c');
      ctx.fillStyle = '#fff1ba'; ctx.font = 'bold 14px Arial'; ctx.fillText('λ', -6, -50);
    } else if (state.fighterId === 'combine_elite_hl2') {
      oval(ctx, 0, -79, 12, 14, '#dfdfcf');
      oval(ctx, 7, -80, 4, 3, '#e46e57');
    } else if (state.fighterId === 'vortigaunt_hl2') {
      oval(ctx, 6, -80, 4, 3, '#e18146');
      line(ctx, [[0, -53], [14, -48], [23, -51]], '#9dad7a', 5);
    } else if (state.fighterId === 'shephard_op4') {
      oval(ctx, 0, -85, 13, 7, '#72805b');
      oval(ctx, 6, -77, 7, 8, '#37443b');
      oval(ctx, 9, -81, 4, 3, '#b3c9ad');
    } else if (state.fighterId === 'alyx_hl2') {
      oval(ctx, -2, -87, 11, 5, '#373d2c');
      ctx.fillStyle = '#a88c77'; ctx.fillRect(-10, -85, 19, 3);
    }
    const isAttack = ['light', 'ranged', 'special'].includes(player.action);
    line(ctx, [[8, -62], [20, -52], [isAttack ? 43 : 29, -56]], '#26372d', 10);
    line(ctx, [[8, -62], [20, -52], [isAttack ? 43 : 29, -56]], fighter.color, 5);
    if (state.fighterId !== 'vortigaunt_hl2') {
      line(ctx, [[28, -57], [isAttack ? 58 : 43, -57]], '#b9bfaa', 5);
      if (player.action === 'light' && state.fighterId === 'gordon_hl2') line(ctx, [[42, -55], [68, -88], [76, -84]], '#ae483e', 4);
    } else if (isAttack) oval(ctx, 44, -56, 8, 8, '#cff27f');
  } else if (['light', 'ranged', 'special'].includes(player.action)) {
    // A timing cue accompanies the fixed pose; this is not a limb animation.
    ctx.strokeStyle = player.action === 'special' ? '#cff27f' : '#f6d890';
    ctx.lineWidth = player.action === 'special' ? 4 : 2;
    ctx.beginPath();
    if (player.action === 'light') ctx.arc(27, -56, 26, -1.3, 1.1);
    else { ctx.moveTo(33, -56); ctx.lineTo(57, -56); }
    ctx.stroke();
    if (player.action !== 'light') oval(ctx, 44, -56, 6, 6, player.action === 'special' ? '#cff27f' : '#f6d890');
  }
  ctx.restore();
  ctx.fillStyle = '#f6d890'; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'center';
  ctx.fillText('VOUS', x, y - 104);
  ctx.textAlign = 'left';
}

export function renderBattle(canvas: HTMLCanvasElement, state: BattleState, options: { preview?: boolean; reducedMotion?: boolean } = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  if (canvas.width !== ARENA_WIDTH || canvas.height !== SCENE_HEIGHT) { canvas.width = ARENA_WIDTH; canvas.height = SCENE_HEIGHT; }
  const boss = getBoss(state.bossId);
  const frame = options.reducedMotion ? 0 : state.tick;
  const sky = ctx.createLinearGradient(0, 0, 0, SCENE_HEIGHT);
  sky.addColorStop(0, boss.colors.sky); sky.addColorStop(1, '#101b12');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, ARENA_WIDTH, SCENE_HEIGHT);
  const img = background(state.bossId === 'gargantua_hl1' ? labBackgroundUrl : cityBackgroundUrl);
  if (img?.complete && img.naturalWidth) {
    ctx.save(); ctx.globalAlpha = options.preview ? .34 : .24;
    const imageScale = Math.max(ARENA_WIDTH / img.width, FLOOR_Y / img.height);
    ctx.drawImage(img, (ARENA_WIDTH - img.width * imageScale) / 2, FLOOR_Y - img.height * imageScale, img.width * imageScale, img.height * imageScale);
    ctx.restore();
  }
  // Static candidate sprites and vector fallbacks share the same combat coordinates.
  ctx.fillStyle = '#233a3166';
  for (let i = 0; i < 13; i++) ctx.fillRect(i * 111 - 31, 200 + (i * 59) % 140, 60 + (i * 13) % 37, 350);
  line(ctx, [[0, 356], [ARENA_WIDTH, 356]], '#9fbb9566', 1);
  ctx.fillStyle = '#101910'; ctx.fillRect(0, FLOOR_Y, ARENA_WIDTH, SCENE_HEIGHT - FLOOR_Y);
  ctx.fillStyle = '#aab994'; ctx.fillRect(0, FLOOR_Y, ARENA_WIDTH, 2);
  for (let i = 0; i < 14; i++) line(ctx, [[i * 100, FLOOR_Y + 4], [i * 106 - 40, SCENE_HEIGHT]], '#66855b30', 1);
  line(ctx, [[0, FLOOR_Y + 36], [ARENA_WIDTH, FLOOR_Y + 36]], '#8eab7330', 1);

  if (state.bossId === 'gargantua_hl1') {
    ctx.fillStyle = '#c5bd7020'; ctx.fillRect(780, FLOOR_Y - 12, 280, 12);
    line(ctx, [[780, FLOOR_Y - 4], [780, 240]], '#667d5b', 6);
    line(ctx, [[1060, FLOOR_Y - 4], [1060, 240]], '#667d5b', 6);
    line(ctx, [[780, 240], [1060, 240]], '#879a70', 5);
    ctx.fillStyle = '#c8cf9c'; ctx.font = '10px ui-monospace, monospace'; ctx.fillText('ZONE DE DÉCHARGE', 841, FLOOR_Y + 20);
  }

  for (const cover of state.covers) {
    const x = cover.x - cover.width / 2;
    polygon(ctx, [[x, FLOOR_Y], [x, FLOOR_Y - 47], [x + 13, FLOOR_Y - 59], [x + cover.width, FLOOR_Y - 55], [x + cover.width, FLOOR_Y]], '#344435', '#879877');
    ctx.fillStyle = '#637252'; ctx.fillRect(x + 10, FLOOR_Y - 42, cover.width - 20, 5);
    for (let i = 0; i < cover.width - 20; i += 24) line(ctx, [[x + 12 + i, FLOOR_Y - 26], [x + 20 + i, FLOOR_Y - 12]], '#c2b56d', 5);
    ctx.fillStyle = '#c4cfb0'; ctx.font = '9px ui-monospace, monospace'; ctx.fillText('COUVERT', x + 9, FLOOR_Y + 18);
  }

  for (const station of state.stations) {
    const near = Math.abs(state.player.x - station.x) < 72 && state.player.y < 24;
    const color = station.cooldown > 0 ? '#89967b' : station.charge > 0 ? '#c3d696' : '#e7bd76';
    const height = station.kind === 'coil' ? 82 : 46;
    ctx.fillStyle = '#1b2922'; ctx.fillRect(station.x - 20, FLOOR_Y - height, 40, height);
    ctx.strokeStyle = near ? '#f5d78e' : '#829c70'; ctx.lineWidth = near ? 3 : 1; ctx.strokeRect(station.x - 20, FLOOR_Y - height, 40, height);
    if (station.kind === 'launcher') {
      line(ctx, [[station.x - 7, FLOOR_Y - 18], [station.x + 4, FLOOR_Y - 65]], '#9daa89', 10);
      line(ctx, [[station.x + 1, FLOOR_Y - 62], [station.x + 39, FLOOR_Y - 76]], '#c1cbb1', 11);
    } else if (station.kind === 'coil') {
      for (let j = 0; j < 6; j++) line(ctx, [[station.x - 16, FLOOR_Y - height + 12 + j * 9], [station.x + 16, FLOOR_Y - height + 12 + j * 9]], '#9aab77', 3);
    } else {
      ctx.fillStyle = color; ctx.fillRect(station.x - 12, FLOOR_Y - 36, 24, 17);
      ctx.fillStyle = '#253522'; ctx.fillRect(station.x - 2, FLOOR_Y - 33, 4, 11); ctx.fillRect(station.x - 6, FLOOR_Y - 29, 12, 3);
    }
    oval(ctx, station.x, FLOOR_Y - height - 7, 4, 4, color);
    ctx.textAlign = 'center'; ctx.font = '10px ui-monospace, monospace'; ctx.fillStyle = color;
    ctx.fillText(station.label.toUpperCase(), station.x, FLOOR_Y + 35);
    if (near) { ctx.fillStyle = '#ffe0a0'; ctx.font = 'bold 14px ui-monospace, monospace'; ctx.fillText('[E]', station.x, FLOOR_Y - height - 26); }
    ctx.textAlign = 'left';
  }

  const gunshipPose = BOSS_SPRITES.gunship_hl2;
  const gunshipMuzzle = state.bossId === 'gunship_hl2' && getSpriteImage(gunshipPose)
    ? spriteSourcePoint(gunshipPose, gunshipPose.muzzleSource, state.boss.x, FLOOR_Y - state.boss.y + Math.sin(frame / 52) * 4, -1)
    : null;
  const attack = state.boss.attack;
  if (attack) {
    const ready = attack.telegraphTicks <= 0;
    ctx.fillStyle = ready ? '#ec7f4a55' : '#dcb05428';
    ctx.fillRect(attack.x - attack.width / 2, FLOOR_Y - 5, attack.width, 10);
    ctx.strokeStyle = ready ? '#ef835a' : '#d3b369'; ctx.setLineDash(ready ? [] : [10, 9]);
    ctx.strokeRect(attack.x - attack.width / 2, FLOOR_Y - 115, attack.width, 116);
    ctx.setLineDash([]);
    if (ready) {
      if (attack.kind === 'cannon') line(ctx, [[state.boss.x - 70, FLOOR_Y - state.boss.y + 22], [attack.x, FLOOR_Y]], '#d0f5ed', 12);
      else if (attack.kind === 'flame') polygon(ctx, [[state.boss.x - 90, FLOOR_Y - 115], [attack.x - attack.width / 2, FLOOR_Y], [attack.x + attack.width / 2, FLOOR_Y]], '#edaa4844');
      else if (attack.kind === 'strafe') {
        const [ox, oy] = gunshipMuzzle ?? [state.boss.x - 69, FLOOR_Y - state.boss.y + 57];
        for (let j = 0; j < 7; j++) {
          const progress = ((frame * .075 + j * .14) % 1);
          const tx = attack.x - attack.width / 2 + (j % 4) * attack.width / 3;
          const dx = tx - ox, dy = FLOOR_Y - oy;
          const tail = Math.max(0, progress - .035);
          line(ctx, [[ox + dx * tail, oy + dy * tail], [ox + dx * progress, oy + dy * progress]], '#9de3e9', 3);
          oval(ctx, ox + dx * progress, oy + dy * progress, 3, 3, '#ddf7dd');
        }
      }
      else if (attack.kind === 'burst') for (let j = 0; j < 4; j++) line(ctx, [gunshipMuzzle ?? [state.boss.x - 50, FLOOR_Y - state.boss.y], [attack.x - attack.width / 2 + j * attack.width / 3, FLOOR_Y]], '#d8d4a550', 2);
      else if (attack.kind === 'shock') oval(ctx, attack.x, FLOOR_Y - 12, attack.width / 2, 16, '#f2b66977');
      else oval(ctx, attack.x, FLOOR_Y - 32, attack.width / 2, 40, '#d9904c66');
    }
  }

  ctx.save();
  if (state.boss.hp <= 0 && state.bossId !== 'dropship_hl2') ctx.globalAlpha = .5;
  const bx = state.boss.x, by = FLOOR_Y - state.boss.y;
  switch (state.bossId as BossId) {
    case 'strider_hl2': drawStrider(ctx, bx, by, frame); break;
    case 'dropship_hl2': drawDropship(ctx, bx, by, frame, state.boss.parts.find((part) => !part.immune)?.hp ?? state.boss.hp); break;
    case 'gunship_hl2':
      if (!drawSprite(ctx, BOSS_SPRITES.gunship_hl2, bx, by + Math.sin(frame / 52) * 4, -1)) drawGunship(ctx, bx, by, frame);
      break;
    case 'gargantua_hl1': drawGargantua(ctx, bx, frame, state.boss.hp <= 0); break;
  }
  ctx.restore();

  for (const minion of state.minions) {
    if (minion.hp <= 0) continue;
    const x = minion.x;
    line(ctx, [[x - 8, FLOOR_Y], [x - 4, FLOOR_Y - 26], [x + 5, FLOOR_Y - 28], [x + 10, FLOOR_Y]], '#b0b99c', 7);
    ctx.fillStyle = '#5d7869'; ctx.fillRect(x - 11, FLOOR_Y - 54, 23, 30);
    oval(ctx, x, FLOOR_Y - 63, 10, 11, '#9aa890');
    line(ctx, [[x - 6, FLOOR_Y - 46], [x - 31, FLOOR_Y - 43]], '#c6cbb5', 5);
    ctx.fillStyle = '#e59c6f'; ctx.fillRect(x - 16, FLOOR_Y - 82, 32 * minion.hp / minion.maxHp, 3);
    if (minion.telegraphTicks > 0) { ctx.fillStyle = '#ffcc75'; ctx.font = 'bold 18px sans-serif'; ctx.fillText('!', x - 3, FLOOR_Y - 90); }
  }

  if (!options.preview) drawFighter(ctx, state);
  for (const p of state.projectiles) {
    const color = p.kind === 'energy_orb' ? '#e5f7ff' : p.kind === 'energy' ? '#c0e685' : p.kind === 'rocket' ? '#f7d599' : '#e0e9c3';
    oval(ctx, p.x, FLOOR_Y - p.y, p.radius * 1.8, p.radius * 1.8, color + '30');
    oval(ctx, p.x, FLOOR_Y - p.y, Math.max(3, p.radius), Math.max(2, p.radius / 2), color);
    if (p.kind === 'rocket') line(ctx, [[p.x - 18, FLOOR_Y - p.y + 3], [p.x - 7, FLOOR_Y - p.y]], '#dca862', 3);
  }
  if (!options.preview && ['active', 'intro'].includes(state.status)) {
    const part = state.boss.parts[state.boss.target];
    if (part && part.hp > 0) {
      const x = state.boss.x + part.offsetX, y = FLOOR_Y - state.boss.y - part.offsetY;
      const color = part.immune ? '#b8c5b0' : '#f8c96e';
      const r = 29;
      ctx.strokeStyle = color; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x, y, 18, 0, Math.PI * 2); ctx.stroke();
      for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        line(ctx, [[x + sx * r, y + sy * (r - 8)], [x + sx * r, y + sy * r], [x + sx * (r - 8), y + sy * r]], color, 2);
      }
      ctx.fillStyle = color; ctx.font = '11px ui-monospace, monospace'; ctx.textAlign = 'center';
      ctx.fillText(part.immune ? `${part.label.toUpperCase()} · BLINDÉ` : part.label.toUpperCase(), x, y - 42); ctx.textAlign = 'left';
    }
  }
  for (const effect of state.effects) {
    ctx.save(); ctx.globalAlpha = Math.min(1, effect.ticks / 12);
    ctx.fillStyle = effect.kind === 'immune' ? '#bfcbb6' : effect.kind === 'hit' ? '#ffe3a2' : '#d6f1b2';
    ctx.font = 'bold 13px ui-monospace, monospace'; ctx.textAlign = 'center';
    ctx.fillText(effect.label, effect.x, FLOOR_Y - effect.y - 18 - (42 - Math.min(42, effect.ticks)) / 2);
    ctx.restore();
  }
  const vignette = ctx.createLinearGradient(0, 0, 0, SCENE_HEIGHT);
  vignette.addColorStop(0, '#0b150c55'); vignette.addColorStop(.25, '#00000000'); vignette.addColorStop(.8, '#00000000'); vignette.addColorStop(1, '#030903aa');
  ctx.fillStyle = vignette; ctx.fillRect(0, 0, ARENA_WIDTH, SCENE_HEIGHT);
}
