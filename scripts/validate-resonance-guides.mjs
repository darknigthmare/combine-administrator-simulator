import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const errors = [];
const check = (value, message) => { if (!value) errors.push(message); };
const unique = (values, label) => {
  check(values.every((id) => typeof id === 'string' && id.trim().length > 0), `${label}: empty id`);
  check(new Set(values).size === values.length, `${label}: duplicate id`);
};
const manifest = read('docs/resonance/guides/SOURCE_MANIFEST.json');
const matrix = read('docs/resonance/data/guide_coverage_20261127.json');
const doc = read('docs/resonance/data/combat_extensions_20261127.json');
const roster = read('docs/resonance/data/roster.json');
const extension = [
  ...read('docs/resonance/data/catalogue_extension_20261120.json').targets,
  ...read('docs/resonance/data/catalogue_extension_20261124.json').targets,
];
const fighterIds = new Set([
  ...roster.fighters.map((x) => x.id),
  ...roster.reserves.map((x) => x.id),
  ...extension.filter((x) => x.category === 'character').map((x) => x.id),
]);
const stageIds = new Set([
  ...read('docs/resonance/data/stages.json').stages.map((x) => x.id),
  ...extension.filter((x) => x.category === 'stage').map((x) => x.id),
]);
const bossIds = new Set(read('docs/resonance/data/boss_battle_catalog.json').bosses.map((x) => x.id));
const projectileIds = new Set(read('docs/resonance/data/projectile_catalog_20261124.json').targets.map((x) => x.id));
const targetIds = new Set([...fighterIds, ...stageIds, ...bossIds, ...projectileIds, ...extension.map((x) => x.id)]);
const storyIds = new Set(roster.story_chapters.map((x) => x.id));
const actionIds = new Set();
const visitIds = (value) => {
  if (!value || typeof value !== 'object') return;
  if (typeof value.id === 'string') actionIds.add(value.id);
  Object.values(value).forEach(visitIds);
};
visitIds(roster);
visitIds(read('docs/resonance/data/aperture_combat_design_20261120.json'));
const sourceIds = new Set([...doc.sources.map((x) => x.id), ...manifest.sources.map((x) => x.id)]);
const ruleIds = new Set(doc.unlock_rules.map((x) => x.id));
const teamIds = new Set(doc.team_profiles.map((x) => x.id));

function checkPath(path, label) {
  check(typeof path === 'string' && path.length > 0 && !isAbsolute(path) && !path.split('/').includes('..'), `${label}: expected safe repository-relative path`);
  check(existsSync(resolve(root, path)), `${label}: missing path ${path}`);
}

check(manifest.sources.length === 3, 'Three original guides required');
unique(manifest.sources.map((x) => x.id), 'guide source ids');
for (const source of manifest.sources) {
  checkPath(source.repository_path, source.id);
  const bytes = readFileSync(resolve(root, source.repository_path));
  check(bytes.length === source.size_bytes, `${source.id}: original size mismatch`);
  check(createHash('sha256').update(bytes).digest('hex') === source.sha256, `${source.id}: original SHA-256 mismatch`);
  check(/^https:\/\/drive\.google\.com\/file\/d\//.test(source.source_url), `${source.id}: missing original provider URL`);
  check(source.version === '1.0' && source.integration_status === 'original_file_preserved', `${source.id}: unexpected source version/status`);
}
const expectedSections = Array.from({ length: 68 }, (_, i) => String(i).padStart(2, '0'));
check(matrix.section_count === 68 && matrix.sections.length === 68, 'Expected 68 section rows');
unique(matrix.sections.map((x) => x.section), 'coverage sections');
check(JSON.stringify(matrix.sections.map((x) => x.section).sort()) === JSON.stringify(expectedSections), 'Missing or unexpected coverage section');
for (const row of matrix.sections) {
  check(matrix.decision_vocabulary.includes(row.decision), `${row.section}: invalid decision`);
  check(matrix.status_vocabulary.includes(row.actual_status), `${row.section}: invalid actual status`);
  check(sourceIds.has(row.source_id), `${row.section}: unresolved guide source`);
  check(typeof row.justification === 'string' && row.justification.length > 20, `${row.section}: insufficient justification`);
  check(typeof row.next_gate === 'string' && row.next_gate.length > 15, `${row.section}: missing next gate`);
  check(Array.isArray(row.application_paths) && row.application_paths.length > 0, `${row.section}: no application file`);
  row.application_paths.forEach((path) => checkPath(path, `section ${row.section}`));
  checkPath(row.source_path, `section ${row.section} source`);
  const sourceText = readFileSync(resolve(root, row.source_path), 'utf8');
  check(sourceText.includes(`${row.section}. ${row.title}`), `${row.section}: title does not match preserved original`);
}
for (const [countKey, property] of [['by_decision', 'decision'], ['by_status', 'actual_status']]) {
  const actual = {};
  matrix.sections.forEach((row) => { actual[row[property]] = (actual[row[property]] || 0) + 1; });
  check(Object.keys(actual).length === Object.keys(matrix.counts[countKey]).length && Object.entries(actual).every(([key, value]) => matrix.counts[countKey][key] === value), `matrix ${countKey} mismatch`);
}

check(doc.runtime_enabled === false && doc.status === 'specified_not_implemented', 'Design JSON must not claim runtime implementation');
check(doc.bible_version === '1.11' && matrix.bible_version === '1.11', 'Expected bible version 1.11');
check(doc.production_baseline.new_png_from_this_document === 0 && doc.production_baseline.new_completed_animation_clips === 0, 'Guide integration must not invent generated assets');
check(doc.fidelity_policy.one_to_one_certification_claimed === false, 'Unproven 1:1 claim');
check(doc.counts.new_catalogue_targets === 0 && doc.counts.new_png === 0 && doc.counts.completed_animations === 0, 'Incorrect production counts');
unique(doc.sources.map((x) => x.id), 'project sources');
for (const source of doc.sources) {
  if (source.repository_path) checkPath(source.repository_path, source.id);
  if (source.repository_evidence) checkPath(source.repository_evidence, source.id);
  check(typeof source.verified_scope === 'string' && source.verified_scope.length > 20, `${source.id}: missing reference scope`);
}

const families = [
  ['taunts', 'taunt_profiles'], ['selection_profiles', 'selection_profiles'], ['team_profiles', 'team_profiles'],
  ['assists', 'assist_profiles'], ['duo_techniques', 'duo_techniques'], ['clashes', 'clash_profiles'],
  ['entities', 'entity_profiles'], ['bonus_stages', 'bonus_profiles'], ['unlock_slots', 'unlock_slot_profiles'],
  ['unlock_rules', 'unlock_rules'],
];
const profiles = [];
for (const [key, countKey] of families) {
  check(Array.isArray(doc[key]) && doc.counts[countKey] === doc[key].length, `${key}: count mismatch`);
  profiles.push(...doc[key]);
}
profiles.push(doc.archive_hub, doc.support_policy);
unique(profiles.map((x) => x.id), 'production profile ids');
check(profiles.length === doc.counts.authored_production_profiles && profiles.length === 63, 'Expected 63 authored production profiles');

function refs(values, allowed, context) {
  check(Array.isArray(values), `${context}: expected array`);
  if (Array.isArray(values)) values.forEach((id) => check(allowed.has(id), `${context}: unresolved id ${id}`));
}
for (const profile of profiles) {
  check(profile.status === 'specified_not_implemented' && profile.runtime_enabled === false, `${profile.id}: designed feature falsely marked implemented`);
  check(profile.certified_one_to_one === false, `${profile.id}: unproven fidelity claim`);
  check(doc.fidelity_policy.allowed.includes(profile.lore_status), `${profile.id}: missing or invalid lore status`);
  refs(profile.source_ids, sourceIds, `${profile.id} sources`);
  if (profile.actor_id) check(fighterIds.has(profile.actor_id), `${profile.id}: unresolved actor`);
  if (profile.owner_id) check(fighterIds.has(profile.owner_id), `${profile.id}: unresolved owner`);
  if (profile.actor_ids) refs(profile.actor_ids, fighterIds, `${profile.id} actors`);
  if (profile.target_ids) refs(profile.target_ids, targetIds, `${profile.id} targets`);
  if (profile.opponent_ids) refs(profile.opponent_ids, targetIds, `${profile.id} opponents`);
  if (profile.dependency_ids) refs(profile.dependency_ids, targetIds, `${profile.id} dependencies`);
  if (profile.stage_id) check(stageIds.has(profile.stage_id), `${profile.id}: unresolved stage ${profile.stage_id}`);
  if (profile.stage_ids) refs(profile.stage_ids, stageIds, `${profile.id} stages`);
  if (profile.story_refs) refs(profile.story_refs, storyIds, `${profile.id} stories`);
  if (profile.base_action_id) check(actionIds.has(profile.base_action_id), `${profile.id}: unresolved base action`);
  if (profile.team_id) check(teamIds.has(profile.team_id), `${profile.id}: unresolved team`);
  if (profile.rule_id) check(ruleIds.has(profile.rule_id), `${profile.id}: unresolved unlock rule`);
  if (profile.reward_rule_id) check(ruleIds.has(profile.reward_rule_id), `${profile.id}: unresolved reward rule`);
  if (profile.grants) refs(profile.grants, targetIds, `${profile.id} grants`);
  if (profile.content_kind === 'existing_runtime_mode') check(['single','rush','training'].includes(profile.content_id) && profile.rule_id === null, `${profile.id}: existing mode must stay free`);
  else if (profile.content_id) check(targetIds.has(profile.content_id), `${profile.id}: content id is not in an existing catalogue`);
}

for (const taunt of doc.taunts) {
  check(taunt.total_ticks === taunt.entry_ticks + taunt.hold_ticks + taunt.exit_ticks, `${taunt.id}: taunt timing mismatch`);
  check(taunt.cancellable_from_tick >= taunt.entry_ticks + taunt.hold_ticks, `${taunt.id}: cancellation bypasses commitment`);
  check(taunt.damage === 0 && taunt.meter_gain === 0 && !taunt.invulnerable, `${taunt.id}: presentation taunt must not grant an unstated bonus`);
}
for (const profile of doc.selection_profiles) {
  unique(profile.states.map((x) => x.id), `${profile.id} states`);
  check(profile.states.length === 9 && profile.states.some((x) => x.id === 'deselect') && profile.states.some((x) => x.id === 'deselect_short'), `${profile.id}: incomplete selection cycle`);
  check(profile.cleanup.includes('preview_companion') && profile.cleanup.includes('voice_owner'), `${profile.id}: missing preview cleanup`);
}
for (const assist of doc.assists) {
  check(assist.total_ticks === assist.startup_ticks + assist.active_ticks + assist.recovery_ticks - 1, `${assist.id}: action timing mismatch`);
  check(assist.meter_cost === doc.team_system.meter.assist_cost && assist.vulnerable, `${assist.id}: invalid assist cost/vulnerability`);
}
for (const kind of ['super','finisher','dramatic']) check(doc.duo_techniques.filter((x) => x.kind === kind).length === 3, `${kind}: expected three pair-specific profiles`);
for (const technique of doc.duo_techniques) {
  check(technique.can_change_confirmed_match_winner === false && technique.participants_must_be_alive_and_available, `${technique.id}: invalid conclusion or partner policy`);
  check(technique.name_origin === 'original_for_resonance', `${technique.id}: new technique must not be labelled official`);
  if (technique.kind === 'super') check(technique.cinematic_on_confirmed_hit_only && technique.meter_cost === doc.team_system.meter.duo_super_cost, `${technique.id}: super must confirm hit and pay coordination cost`);
  else check(technique.damage === 0 && technique.meter_cost === 0, `${technique.id}: post-victory presentation changes combat`);
}
check(doc.team_system.meter.reserve_ko_auto_tag_cost === 0, 'KO survivor must not be blocked by insufficient meter');
check(doc.team_system.tag.shared_combo_history && doc.team_system.tag.character_resources_persist, 'Tag resets combo history or character resources');
for (const entity of doc.entities) {
  check(entity.max_instances > 0 && entity.lifetime_ticks > 0, `${entity.id}: missing entity budget`);
  for (const key of ['owner_hit','owner_reserved','owner_ko','stage_transition','round_end','cinematic','reflection','rollback']) check(typeof entity[key] === 'string' && entity[key].length > 10, `${entity.id}: missing ${key}`);
}
const hub = doc.archive_hub;
const areaIds = new Set(hub.areas.map((x) => x.id));
unique([...areaIds], 'hub areas');
check(hub.areas.length === 4 && hub.connections.length === 3 && doc.counts.hub_areas === 4 && doc.counts.hub_connections === 3, 'Hub counts mismatch');
check(hub.lore_status === 'original_compatible_ui' && hub.exploration_status === 'navigation_graph_designed_not_playable', 'Hub must remain an authored UI metaphor');
hub.areas.forEach((area) => refs(area.target_ids, targetIds, `${area.id} targets`));
for (const edge of hub.connections) check(areaIds.has(edge.from) && areaIds.has(edge.to) && edge.from !== edge.to && edge.bidirectional && edge.world_door_claim === false, 'Hub connection invalid or falsely canonical');
const reached = new Set([hub.entry_area]);
for (let i = 0; i < hub.areas.length; i++) for (const edge of hub.connections) {
  if (reached.has(edge.from)) reached.add(edge.to);
  if (edge.bidirectional && reached.has(edge.to)) reached.add(edge.from);
}
check(reached.size === hub.areas.length, 'Hub has inaccessible areas');
function expressionValid(expression) {
  if (expression.op === 'event') return typeof expression.event_id === 'string' && expression.event_id.length > 0;
  return ['all','any'].includes(expression.op) && Array.isArray(expression.children) && expression.children.length > 0 && expression.children.every(expressionValid);
}
doc.unlock_rules.forEach((rule) => check(expressionValid(rule.expression) && rule.runtime_event_wired === false, `${rule.id}: invalid future expression or false event wiring claim`));
check(doc.support_policy.provider === null && doc.support_policy.live_campaign_id === null && doc.support_policy.active_benefits.length === 0, 'Guide must not invent an active subscription catalogue');
check(doc.support_policy.server_integration_operational === false && doc.support_policy.subscription_offer_published === false, 'False subscription implementation claim');
check(doc.counts.runtime_dossier_crosswalks === 4 && doc.runtime_crosswalk.dossiers.length === 4, 'Expected four runtime dossier crosswalks');
doc.runtime_crosswalk.authority_paths.forEach((path) => checkPath(path, 'runtime dossier authority'));
const dossierCode = readFileSync(resolve(root, 'src/features/resonance/progression/fieldDossiers.ts'), 'utf8');
const runtimeCatalogCode = readFileSync(resolve(root, 'src/features/resonance/bossBattle/catalog.ts'), 'utf8');
const runtimeOrderLiteral = runtimeCatalogCode.match(/export const BOSS_ORDER[^=]*=\s*\[([^\]]+)\]/)?.[1] || '';
const runtimeBossIds = new Set([...runtimeOrderLiteral.matchAll(/'([^']+)'/g)].map((match) => match[1]));
for (const dossier of doc.runtime_crosswalk.dossiers) {
  check(bossIds.has(dossier.boss_id), `${dossier.id}: unresolved boss`);
  const mappedIdIsDeclared = dossierCode.includes('BOSS_CATALOG.map') && dossierCode.includes('id: `dossier_${boss.id}`') && runtimeBossIds.has(dossier.boss_id);
  check(dossier.id === `dossier_${dossier.boss_id}` && (dossierCode.includes(dossier.id) || mappedIdIsDeclared), `${dossier.id}: mismatch with runtime dossier id`);
}
check(doc.runtime_crosswalk.unlocked_playable_content_changed === false, 'Dossiers must not lock/unlock current playable roster');
for (const feature of ['tag','assist','duo_super','qte','explorable_hub','patreon_oauth']) check(doc.runtime_crosswalk.explicitly_not_implemented.includes(feature), `${feature}: missing implementation boundary`);
unique(doc.acceptance_scenarios.map((x) => x.id), 'acceptance scenarios');
check(doc.acceptance_scenarios.length === 26 && doc.counts.acceptance_scenarios === 26, 'Expected 26 planned acceptance scenarios');
doc.acceptance_scenarios.forEach((x) => check(x.status === 'planned_not_executed' && x.runtime_test_claim === false, `${x.id}: design scenario falsely recorded as executed`));

for (const path of ['docs/resonance/BIBLE.md','docs/resonance/README.md']) {
  const body = readFileSync(resolve(root, path), 'utf8');
  check(body.includes('CURRENT_GUIDE_INTEGRATION_20261127') && body.includes('guides/COVERAGE_68.md'), `${path}: missing integration links`);
}

if (errors.length) {
  errors.forEach((message) => console.error(`FAIL ${message}`));
  process.exit(1);
}
console.log(JSON.stringify({ result:'passed', source_files:3, original_sha256_verified:3, guide_sections:68, production_profiles:profiles.length, planned_acceptance_scenarios:26, runtime_dossier_references:4, new_png_from_guides:0, new_animation_clips_from_guides:0, scope:'Static integrity and documentary contracts only; gameplay, browser, visual fidelity and external services are not certified.' }, null, 2));
