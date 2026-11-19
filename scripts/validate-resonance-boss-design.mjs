import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (name) => JSON.parse(readFileSync(resolve(root, 'docs/resonance/data', name), 'utf8'));
const catalog = read('boss_battle_catalog.json');
const rules = read('boss_battle_rules.json');
const production = read('boss_battle_production.json');
const fighters = new Set(read('roster.json').fighters.map(item => item.id));
const stages = new Set(read('stages.json').stages.map(item => item.id));
const sources = new Set(catalog.sources.map(item => item.id));
const bosses = new Map(catalog.bosses.map(item => [item.id, item]));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

check(bosses.size === catalog.bosses.length, 'Duplicate encounter identity.');
check(sources.size === catalog.sources.length, 'Duplicate source identity.');
check(catalog.bosses.filter(boss => boss.content_class !== 'cut_content_archive').length === catalog.main_encounter_count, 'Main encounter count mismatch.');
check(catalog.bosses.filter(boss => boss.content_class === 'cut_content_archive').length === catalog.archive_count, 'Archive count mismatch.');
check(catalog.runtime_boss_ids.length === 4, 'The playable slice must contain exactly four boss prototypes.');
check(rules.runtime_boss_ids.join('|') === catalog.runtime_boss_ids.join('|'), 'Rules and catalogue disagree on playable bosses.');
check(rules.runtime_fighter_ids.length === 6 && rules.runtime_fighter_ids.every(id => fighters.has(id)), 'Unknown pilot.');
check(rules.simulation_hz === 60 && rules.separate_from_management === true, 'Simulation isolation contract mismatch.');

for (const boss of catalog.bosses) {
  check(boss.source_ids.length > 0 && boss.source_ids.every(id => sources.has(id)), `${boss.id}: unresolved source.`);
  check(boss.source_urls.every(url => url.startsWith('https://')), `${boss.id}: malformed source URL.`);
  check(boss.base_stage_id === null || stages.has(boss.base_stage_id), `${boss.id}: unknown base stage.`);
  check(boss.phases.length >= 2 && boss.phases.every(phase => phase.player_counterplay && phase.status === 'original_2d_design'), `${boss.id}: missing counterplay or adaptation label.`);
  check(rules.victory_conditions.includes(boss.victory_condition), `${boss.id}: unresolved victory condition.`);
  check(boss.certified_one_to_one === false, `${boss.id}: unverified visual fidelity claim.`);
  check(boss.runtime_enabled === catalog.runtime_boss_ids.includes(boss.id), `${boss.id}: playable status mismatch.`);
  if (boss.runtime_enabled) check(boss.status === 'playable_mechanics_prototype', `${boss.id}: unsupported implementation claim.`);
  if (boss.content_class === 'cut_content_archive') check(!boss.runtime_enabled, `${boss.id}: archive exposed as a finished encounter.`);
}

check(bosses.get('dropship_hl2').victory_condition === 'destroy_cargo_and_clear_reinforcements', 'Dropship victory must preserve its invulnerable transport.');
check(bosses.get('guardian_tunnels_ep2').victory_condition === 'escape_with_objective', 'Underground Guardian must retain its escape objective.');
check(bosses.get('jeff_hla').victory_condition === 'trap_then_escape', 'Jeff cannot become an ordinary damage boss.');
check(bosses.get('pit_worm_op4').victory_condition === 'activate_toxic_waste_system', 'Pit Worm must retain its environmental resolution.');
check(production.items.length === production.group_count && new Set(production.items.map(item => item.id)).size === production.items.length, 'Production task count or identity mismatch.');
check(production.produced_groups === 0 && production.items.every(item => item.file === null && item.status === 'specified_not_produced' && bosses.has(item.owner_id)), 'Unproduced art is incorrectly marked complete.');
for (const id of catalog.runtime_boss_ids) check(production.items.filter(item => item.owner_id === id && item.category === 'arena_layer').length === 6, `${id}: expected six planned arena layers.`);

if (errors.length) {
  console.error(errors.map(error => `FAIL ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ status: 'passed', encounters: catalog.main_encounter_count, archives: catalog.archive_count, playableBosses: catalog.runtime_boss_ids.length, pilots: rules.runtime_fighter_ids.length, sources: catalog.sources.length, plannedArtGroups: production.group_count, finishedArtGroups: production.produced_groups, certifiedOneToOne: 0 }, null, 2));
}
