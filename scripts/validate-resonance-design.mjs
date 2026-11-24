import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = resolve(root, 'docs/resonance/data');
const read = name => JSON.parse(readFileSync(resolve(data, name), 'utf8'));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const unique = (values, label) => {
  check(values.every(value => typeof value === 'string' && value.length > 0), `${label}: missing id`);
  check(new Set(values).size === values.length, `${label}: duplicate ids`);
};

const rules = read('combat_rules.json');
const roster = read('roster.json');
const stages = read('stages.json').stages;
const backlog = read('asset_backlog.json').rows;
const animation = read('animation_budget.json');
const art = read('generated_art_register.json');
const extension = read('catalogue_extension_20261120.json');
const extension20261124 = read('catalogue_extension_20261124.json');
const extensionTargets = [...extension.targets, ...extension20261124.targets];
const extensionIds = new Set(extensionTargets.map(target => target.id));
const projectileCatalog = read('projectile_catalog_20261124.json');
const projectileTargets = projectileCatalog.targets;
check(Array.isArray(projectileTargets), 'Projectile catalogue must expose targets[]');
if (!Array.isArray(projectileTargets)) throw new Error(errors.join('\n'));
const projectileIds = new Set(projectileTargets.map(target => target.id));
const projectileSourceIds = new Set(projectileCatalog.sources.map(source => source.id));
const bossIds = new Set([
  ...read('boss_battle_catalog.json').bosses.map(boss => boss.id),
  ...extensionTargets.filter(target => target.category === 'boss').map(target => target.id),
]);
const frameData = read('frame_data_pilote.json');
const fighters = roster.fighters;
check(Array.isArray(fighters), 'Roster must expose fighters[]');
if (!Array.isArray(fighters)) throw new Error(errors.join('\n'));
const fighterIds = new Set(fighters.map(fighter => fighter.id));
const reserveIds = new Set(roster.reserves.map(fighter => fighter.id));
const stageIds = new Set(stages.map(stage => stage.id));
// Artwork can also belong to documented extension stages; the original
// 24-stage production budget below remains scoped to the original catalogue.
const assetStageIds = new Set([
  ...stageIds,
  ...extensionTargets.filter(target => target.category === 'stage').map(target => target.id),
]);
unique(extensionTargets.map(target => target.id), 'extension targets');
unique(projectileTargets.map(target => target.id), 'projectile/FX targets');
unique(projectileCatalog.sources.map(source => source.id), 'projectile/FX sources');
check(projectileCatalog.counts.targets === projectileTargets.length, 'Projectile catalogue target count mismatch');
for (const [field, key] of [['by_effect_kind', 'effect_kind'], ['by_source_game', 'source_game']]) {
  const actual = Object.fromEntries([...new Set(projectileTargets.map(target => target[key]))].sort().map(value => [value, projectileTargets.filter(target => target[key] === value).length]));
  const declared = projectileCatalog.counts[field];
  check(declared && Object.keys(declared).length === Object.keys(actual).length && Object.entries(actual).every(([value, count]) => declared[value] === count), `Projectile catalogue ${field} mismatch`);
}
for (const target of projectileTargets) {
  check(!extensionIds.has(target.id) && !fighterIds.has(target.id) && !reserveIds.has(target.id) && !assetStageIds.has(target.id) && !bossIds.has(target.id), `${target.id}: projectile/FX target collides with another catalogue`);
  check(target.category === 'projectile' && target.runtime_enabled === false, `${target.id}: projectile/FX catalogue must remain documentary`);
  check(target.owner_id === target.id && target.certified_one_to_one === false, `${target.id}: invalid projectile identity or fidelity claim`);
  check(Array.isArray(target.source_ids) && target.source_ids.length > 0 && target.source_ids.every(id => projectileSourceIds.has(id)), `${target.id}: unresolved projectile reference`);
  check(['projectile', 'throwable', 'instant_trace', 'beam', 'impact', 'area', 'portal', 'device', 'weapon_fire'].includes(target.effect_kind), `${target.id}: unknown projectile/FX behavior`);
  check(Array.isArray(target.variants_required) && target.variants_required.length > 0 && target.variants_required.every(id => typeof id === 'string' && id.trim()) && new Set(target.variants_required).size === target.variants_required.length, `${target.id}: invalid visual state contract`);
}
unique([...fighters.map(fighter => fighter.id)], 'fighters');
unique(stages.map(stage => stage.id), 'stages');
unique(backlog.map(asset => asset.asset_id), 'production groups');
unique(art.assets.map(asset => asset.asset_id), 'art requests');
check(fighters.length === 24, 'Expected 24 specified fighters');
check(fighters.filter(fighter => fighter.wave === 1).length === 12, 'Expected 12 first-wave fighters');
check(fighters.filter(fighter => fighter.pilot).length === 6, 'Expected six pilot fighters');
check(roster.story_chapters.length === 12, 'Expected 12 story chapters');
check(roster.reserves.length === 12, 'Expected 12 reserves outside the main roster');
unique(roster.story_chapters.map(chapter => chapter.id), 'story chapters');
unique(roster.reserves.map(fighter => fighter.id), 'reserve fighters');
for (const reserve of roster.reserves) check(!fighterIds.has(reserve.id), `${reserve.id}: reserve duplicates main roster`);
const specials = fighters.flatMap(fighter => fighter.specials);
const exVariants = fighters.flatMap(fighter => fighter.ex_variants);
unique(specials.map(move => move.id), 'special techniques');
unique(exVariants.map(move => move.id), 'EX variants');
check(specials.length === 102, 'Expected 102 special techniques');
check(exVariants.length === 18, 'Expected 18 explicitly authored EX variants');
for (const fighter of fighters) {
  check(fighterIds.has(fighter.rival.id), `${fighter.id}: unresolved rival`);
  check(fighter.super.resonance_cost === 100 && fighter.ultimate.resonance_cost === 300, `${fighter.id}: super or ultimate cost`);
  check(fighter.super.input === '236236H' && fighter.ultimate.input === '236236S', `${fighter.id}: super or ultimate command`);
  check(fighter.ex_variants.length === (fighter.pilot ? 3 : 0), `${fighter.id}: EX specification scope`);
  unique(fighter.ex_variants.map(move => move.input), `${fighter.id} EX commands`);
  const bases = new Set(fighter.specials.map(move => move.id));
  for (const move of fighter.ex_variants) {
    check(bases.has(move.base_move_id), `${move.id}: unresolved base move`);
    check(move.resonance_cost === 50, `${move.id}: EX cost`);
  }
  for (const special of fighter.specials) {
    check(special.ex_available === fighter.ex_variants.some(move => move.base_move_id === special.id), `${special.id}: EX availability mismatch`);
  }
}
check(stages.length === 24, 'Expected 24 specified stages');
check(stages.filter(stage => stage.priority === 'P0').length === 8, 'Expected eight priority stages');
check(rules.simulation.ticks_per_second === 60, 'Simulation contract must be 60 Hz');
check(rules.duel.round_active_ticks === 99 * 60, '99 second round mismatch');
check(rules.defense.standing_guard_blocks.includes('overhead'), 'Overhead requires standing guard');
check(rules.tournament.grand_final_reset_if_losers_bracket_winner_wins_first_set, 'Missing double elimination reset');
for (const [kind, cost] of Object.entries(rules.resonance.costs_display_points)) {
  check(Number.isInteger(cost) && cost >= 0 && cost <= rules.resonance.display_max, `Invalid cost: ${kind}`);
}
for (const stage of stages) {
  check(stage.layers.length === 6, `${stage.id}: six layers required`);
  check(stage.layers.every((layer, i) => layer.parallax === [0, 0.12, 0.3, 0.55, 1, 1.1][i]), `${stage.id}: parallax coefficients`);
  check(stage.competitive.flat_ground && !stage.competitive.hazards && !stage.competitive.random_gameplay, `${stage.id}: competitive collision rules`);
  check(stage.separate_props.length === 4, `${stage.id}: four specified props`);
}
const counts = Object.fromEntries(['stage_layer', 'prop', 'animation_group'].map(category => [category, backlog.filter(asset => asset.category === category).length]));
check(counts.stage_layer === 144 && counts.prop === 96 && counts.animation_group === 318, 'Production group counts mismatch');
for (const asset of backlog) {
  check(asset.category === 'animation_group' ? fighterIds.has(asset.owner_id) : stageIds.has(asset.owner_id), `${asset.asset_id}: unresolved owner ${asset.owner_id}`);
  check(asset.status === 'spécifié', `${asset.asset_id}: generation journal must not close specified animations or stages`);
}
check(animation.sequences.length === 53, '53 animation sequences expected');
check(animation.sequences.reduce((sum, item) => sum + item.drawings, 0) === 547, 'Animation drawing budget mismatch');
check(animation.sequences.some(sequence => sequence.id === 'command_6H'), 'Missing 6H sequence');
check(animation.sequences.some(sequence => sequence.id === 'guard_air'), 'Missing air guard sequence');
check(animation.sequences.some(sequence => sequence.id === 'ultimate'), 'Missing ultimate sequence');

const moves = frameData.fighters.flatMap(fighter => fighter.moves);
unique(moves.map(move => move.move_id), 'pilot frame data');
check(moves.length === 66, '66 pilot moves expected');
for (const move of moves) {
  check(fighterIds.has(move.fighter_id), `${move.move_id}: unresolved fighter`);
  for (const key of ['startup_ticks', 'active_ticks', 'recovery_ticks']) check(Number.isInteger(move[key]) && move[key] >= 0, `${move.move_id}: ${key}`);
  if (move.category !== 'normal_throw') {
    const remaining = move.active_ticks - 1 + move.recovery_ticks;
    check(move.blockstun_ticks - remaining === move.first_active_block_advantage_ticks, `${move.move_id}: block advantage arithmetic`);
    check(move.hitstun_ticks - remaining === move.first_active_hit_advantage_ticks, `${move.move_id}: hit advantage arithmetic`);
    check(move.total_action_ticks_without_shared_hitfreeze === move.startup_ticks + move.active_ticks + move.recovery_ticks - 1, `${move.move_id}: total duration`);
    check(move.damage_on_block === 0 && move.resource_cost_resonance === 0, `${move.move_id}: ordinary normal cost or chip`);
    if (move.input === '2H') check(move.guard_type === 'mid' && !move.air_guard_allowed, `${move.move_id}: anti air guard contract`);
    if (move.input.startsWith('j.')) check(move.guard_type === 'overhead', `${move.move_id}: jumping guard contract`);
  } else {
    check(move.throw_tech_window_ticks === 7, `${move.move_id}: throw tech window`);
    check(move.hitstun_ticks === null && move.blockstun_ticks === null, `${move.move_id}: throw stun must be inapplicable`);
    check(move.defender_knockdown_after_release_ticks - move.attacker_recovery_after_release_ticks === move.post_release_advantage_ticks, `${move.move_id}: throw release advantage`);
  }
}

const prototypeBackgroundIds = new Set(['stage_black_mesa_testchamber_master', 'stage_city17_station_master']);
const prototypeSpriteScope = 'boss_battle_static_candidate_sprite';
const prototypeSpriteAssets = new Map([
  ['gordon_hl2_idle_h', { ownerId: 'gordon_hl2', ownerType: 'fighter', path: 'assets/resonance/candidates/continuation_20261124_h/heroes/gordon_hl2_idle_h.png' }],
  ['alyx_hl2_idle_h', { ownerId: 'alyx_hl2', ownerType: 'fighter', path: 'assets/resonance/candidates/continuation_20261124_h/heroes/alyx_hl2_idle_h.png' }],
  ['barney_hl2_idle_h', { ownerId: 'barney_hl2', ownerType: 'fighter', path: 'assets/resonance/candidates/continuation_20261124_h/heroes/barney_hl2_idle_h.png' }],
  ['shephard_op4_idle_h', { ownerId: 'shephard_op4', ownerType: 'fighter', path: 'assets/resonance/candidates/continuation_20261124_h/heroes/shephard_op4_idle_h.png' }],
  ['vortigaunt_hl2_idle_h', { ownerId: 'vortigaunt_hl2', ownerType: 'fighter', path: 'assets/resonance/candidates/continuation_20261124_h/heroes/vortigaunt_hl2_idle_h.png' }],
  ['combine_elite_hl2_idle_left', { ownerId: 'combine_elite_hl2', ownerType: 'fighter', path: 'assets/resonance/candidates/combine_elite_hl2_idle_left.png' }],
  ['gunship_hl2_hover_left_f', { ownerId: 'gunship_hl2', ownerType: 'boss', path: 'assets/resonance/candidates/continuation_20261124_f/gunship_hl2_hover_left_f.png' }],
]);
const spriteModulePath = resolve(root, 'src/features/resonance/bossBattle/spriteAssets.ts');
const spriteModule = readFileSync(spriteModulePath, 'utf8');
const rendererModule = readFileSync(resolve(root, 'src/features/resonance/bossBattle/renderer.ts'), 'utf8');
const spriteImports = new Map([...spriteModule.matchAll(/import\s+(\w+)\s+from\s+'([^']+\.png)'/g)]
  .map(match => [match[1], resolve(dirname(spriteModulePath), match[2])]));
const spriteBindings = [...spriteModule.matchAll(/^  (\w+): \{\r?\n([\s\S]*?)^  \},?$/gm)].map(match => ({
  runtimeId: match[1],
  assetId: match[2].match(/assetId:\s*'([^']+)'/)?.[1],
  repositoryPath: match[2].match(/repositoryPath:\s*'([^']+)'/)?.[1],
  importName: match[2].match(/\burl:\s*(\w+)/)?.[1],
}));
unique(spriteBindings.map(binding => binding.assetId), 'prototype sprite bindings');
check(spriteBindings.length === prototypeSpriteAssets.size && spriteImports.size === prototypeSpriteAssets.size, 'Prototype sprite imports must remain the seven audited static poses');
check(/drawSprite\(ctx,\s*FIGHTER_SPRITES\[state\.fighterId\]/.test(rendererModule), 'Fighter sprite bindings are not consumed by the renderer');
check(/drawSprite\(ctx,\s*BOSS_SPRITES\.gunship_hl2/.test(rendererModule), 'Gunship sprite binding is not consumed by the renderer');
for (const binding of spriteBindings) {
  const expected = prototypeSpriteAssets.get(binding.assetId);
  check(Boolean(expected), `${binding.assetId}: unaudited runtime sprite binding`);
  if (!expected) continue;
  check(binding.runtimeId === expected.ownerId && binding.repositoryPath === expected.path, `${binding.assetId}: runtime sprite owner/path mismatch`);
  check(spriteImports.get(binding.importName) === resolve(root, expected.path), `${binding.assetId}: runtime import differs from the registered image`);
}
for (const [assetId, expected] of prototypeSpriteAssets) {
  const asset = art.assets.find(candidate => candidate.asset_id === assetId);
  check(Boolean(asset), `${assetId}: missing static runtime sprite registration`);
  if (!asset) continue;
  check(asset.integrated_in_game === true && asset.runtime_enabled === true && asset.integration_scope === prototypeSpriteScope, `${assetId}: incomplete static prototype integration scope`);
  check(asset.repository_path === expected.path && asset.owner_id === expected.ownerId && asset.owner_type === expected.ownerType, `${assetId}: static prototype image identity mismatch`);
  check(asset.generation_status === 'généré' && asset.animation_clip_complete === false, `${assetId}: static candidate integration cannot claim an animation clip`);
}

let generated = 0;
for (const asset of art.assets) {
  check(asset.certified_one_to_one === false, `${asset.asset_id}: unsupported fidelity claim`);
  if (asset.integrated_in_game) {
    const isBackground = prototypeBackgroundIds.has(asset.asset_id);
    check(isBackground || prototypeSpriteAssets.has(asset.asset_id), `${asset.asset_id}: unexpected prototype integration`);
    check(asset.integration_scope === (isBackground ? 'boss_battle_prototype_background' : prototypeSpriteScope), `${asset.asset_id}: unspecified prototype integration scope`);
  }
  if (asset.runtime_enabled === true) check(asset.integrated_in_game === true, `${asset.asset_id}: runtime-enabled artwork must declare its precise integration`);
  if (asset.owner_type === 'fighter') check(fighterIds.has(asset.owner_id), `${asset.asset_id}: unknown fighter owner`);
  if (asset.owner_type === 'reserve_character') check(reserveIds.has(asset.owner_id), `${asset.asset_id}: unknown reserve owner`);
  if (asset.owner_type === 'stage') check(assetStageIds.has(asset.owner_id), `${asset.asset_id}: unknown stage owner`);
  if (asset.owner_type === 'boss') check(bossIds.has(asset.owner_id), `${asset.asset_id}: unknown boss owner`);
  if (['support_character', 'support_machine'].includes(asset.owner_type)) check(extensionIds.has(asset.owner_id), `${asset.asset_id}: unknown extension owner`);
  if (asset.owner_type === 'projectile_effect') {
    check(projectileIds.has(asset.owner_id), `${asset.asset_id}: unknown projectile/FX owner`);
    const targets = asset.target_ids ?? (asset.target_id != null ? [asset.target_id] : []);
    check(Array.isArray(targets) && targets.includes(asset.owner_id), `${asset.asset_id}: projectile/FX artwork needs an explicit owner target`);
    if (asset.target_id != null) check(asset.target_id === asset.owner_id, `${asset.asset_id}: conflicting projectile target alias`);
  }
  if (projectileIds.has(asset.owner_id)) check(asset.owner_type === 'projectile_effect', `${asset.asset_id}: wrong projectile/FX owner type`);
  check(['fighter', 'reserve_character', 'stage', 'boss', 'support_character', 'support_machine', 'projectile_effect', 'shared_collection'].includes(asset.owner_type), `${asset.asset_id}: unknown owner type`);
  if (asset.generation_status !== 'généré') {
    check(asset.file_path === null && asset.repository_path === null, `${asset.asset_id}: failed request has an asset path`);
    continue;
  }
  generated += 1;
  const path = resolve(root, asset.repository_path);
  check(path.startsWith(root + '/'), `${asset.asset_id}: path escapes repository`);
  if (!existsSync(path)) { errors.push(`${asset.asset_id}: missing returned image`); continue; }
  const bytes = readFileSync(path);
  check(bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])), `${asset.asset_id}: PNG signature`);
  check(bytes.readUInt32BE(16) === asset.width && bytes.readUInt32BE(20) === asset.height, `${asset.asset_id}: dimensions differ from manifest`);
  check(createHash('sha256').update(bytes).digest('hex') === asset.sha256, `${asset.asset_id}: image checksum`);
  if (asset.alpha_check === 'présent') check(bytes[25] === 6 || bytes[25] === 4, `${asset.asset_id}: alpha channel missing`);
}
check(generated === art.counts.generated && art.assets.length === art.counts.requests, 'Image generation journal count mismatch');
check(art.assets.filter(asset => asset.generation_status === 'refus automatique').length === art.counts.blocked, 'Blocked generation journal count mismatch');
check(art.assets.filter(asset => asset.integrated_in_game).length === art.counts.integrated_in_game, 'Prototype integration journal count mismatch');
if (errors.length) {
  console.error(errors.map(error => `FAIL ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ status: 'passed', fighters: fighters.length, storyChapters: roster.story_chapters.length, specialTechniques: specials.length, exVariants: exVariants.length, stages: stages.length, productionGroups: backlog.length, animationSequencesPerPilot: animation.sequences.length, drawingsPerPilotOneFacing: 547, pilotMoves: moves.length, generatedImages: generated, prototypeBackgrounds: art.assets.filter(asset => asset.integrated_in_game && prototypeBackgroundIds.has(asset.asset_id)).length, prototypeStaticSprites: art.assets.filter(asset => asset.integrated_in_game && prototypeSpriteAssets.has(asset.asset_id)).length, certifiedOneToOne: 0, note: 'Design data, image provenance and seven static candidate sprite bindings validated. The Boss Battle simulation has its own tests; no animation clip, network implementation or final visual fidelity is asserted.' }, null, 2));
}
