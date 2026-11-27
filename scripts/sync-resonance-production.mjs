import { existsSync, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataDirectory = 'docs/resonance/data';
const candidateRoot = resolve(root, 'assets/resonance/candidates');
const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log('Usage: node scripts/sync-resonance-production.mjs [--write]\nComputes a production queue from the catalogues and actual registered files. --write saves production_queue.json and MISSING_TARGETS.md only when validation passes.');
  process.exit(0);
}
if (args.some(value => value !== '--write')) { console.error('Unknown argument. Use --help.'); process.exit(2); }

const errors = [];
const warnings = [];
const fail = (code, message, details = {}) => errors.push({ code, message, ...details });
const warn = (code, message, details = {}) => warnings.push({ code, message, ...details });
const slash = value => value.split(sep).join('/');
const normalized = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[_-]+/g, ' ').trim();
const inside = (directory, path) => { const child = relative(directory, path); return child !== '' && child !== '..' && !child.startsWith(`..${sep}`) && !isAbsolute(child); };
const groupCounts = (rows, key) => Object.fromEntries([...new Set(rows.map(row => row[key] ?? 'unspecified'))].sort().map(value => [value, rows.filter(row => (row[key] ?? 'unspecified') === value).length]));
const read = name => {
  try { const value = JSON.parse(readFileSync(resolve(root, dataDirectory, name), 'utf8')); if (!value || typeof value !== 'object') throw new Error('Expected a JSON object.'); return value; }
  catch (error) { fail('unreadable_source', error.message, { source_file: `${dataDirectory}/${name}` }); return {}; }
};
const array = (value, label) => { if (Array.isArray(value)) return value; fail('missing_array', `Expected ${label} to be an array.`); return []; };
const roster = read('roster.json');
const stages = read('stages.json');
const bosses = read('boss_battle_catalog.json');
const extension = read('catalogue_extension_20261120.json');
const extension20261124 = read('catalogue_extension_20261124.json');
const projectiles = read('projectile_catalog_20261124.json');
const cutContent20261127 = read('cut_content_catalog_20261127.json');
const register = read('generated_art_register.json');
const projectileClasses = new Set(['moving_projectile', 'thrown_device', 'placed_device', 'instant_beam', 'continuous_beam', 'hitscan_trace', 'portal_effect', 'environmental_blob', 'weapon_fire_effect']);
const travelSpriteClasses = new Set(['moving_projectile', 'thrown_device', 'environmental_blob']);

function sourceMap(rows, namespace) {
  const map = new Map();
  for (const source of array(rows, `${namespace}.sources`)) {
    if (!source || typeof source.id !== 'string' || !source.id) { fail('missing_source_id', 'Every named reference needs an ID.', { namespace }); continue; }
    if (map.has(source.id)) fail('duplicate_source_id', 'Reference IDs must be unique within their source catalogue.', { namespace, source_id: source.id });
    if (typeof source.url !== 'string' || !/^https?:\/\//.test(source.url)) fail('invalid_source_url', 'A reference needs an HTTP(S) URL.', { namespace, source_id: source.id });
    map.set(source.id, { namespace, source_id: source.id, title: source.title ?? null, url: source.url ?? null, kind: source.kind ?? null, checked_scope: source.checked_scope ?? source.evidence_scope ?? source.note ?? null, reference_status: source.reference_status ?? null });
  }
  return map;
}
const bossSources = sourceMap(bosses.sources, 'boss_battle_catalog');
const extensionSources = sourceMap(extension.sources, 'catalogue_extension_20261120');
const extension20261124Sources = sourceMap(extension20261124.sources, 'catalogue_extension_20261124');
const projectileSources = sourceMap(projectiles.sources, 'projectile_catalog_20261124');
const cutContent20261127Sources = sourceMap(cutContent20261127.sources, 'cut_content_catalog_20261127');
const rosterReferences = array(roster.source_notes, 'roster.source_notes').map((source, index) => ({ namespace: 'roster', source_id: `source_note_${index + 1}`, title: source.title ?? null, url: source.url ?? null, kind: 'catalogue_context_only', checked_scope: source.verification ?? null }));
const targetMap = new Map();
const sourceEntries = [
  ['roster.fighters', 'roster.json', 'character', array(roster.fighters, 'roster.fighters'), null],
  ['roster.reserves', 'roster.json', 'character', array(roster.reserves, 'roster.reserves'), null],
  ['stages.stages', 'stages.json', 'stage', array(stages.stages, 'stages.stages'), null],
  ['boss_battle_catalog.bosses', 'boss_battle_catalog.json', 'boss', array(bosses.bosses, 'boss_battle_catalog.bosses'), bossSources],
  ['catalogue_extension_20261120.targets', 'catalogue_extension_20261120.json', null, array(extension.targets, 'catalogue_extension_20261120.targets'), extensionSources],
  ['catalogue_extension_20261124.targets', 'catalogue_extension_20261124.json', null, array(extension20261124.targets, 'catalogue_extension_20261124.targets'), extension20261124Sources],
  ['projectile_catalog_20261124.targets', 'projectile_catalog_20261124.json', 'projectile', array(projectiles.targets, 'projectile_catalog_20261124.targets'), projectileSources],
  ['cut_content_catalog_20261127.targets', 'cut_content_catalog_20261127.json', 'archive', array(cutContent20261127.targets, 'cut_content_catalog_20261127.targets'), cutContent20261127Sources],
];

for (const [bucket, filename, defaultCategory, rows, sources] of sourceEntries) {
  for (const row of rows) {
    if (!row || typeof row.id !== 'string' || !row.id.trim()) { fail('missing_target_id', 'Every catalogue target needs an ID.', { source_bucket: bucket }); continue; }
    if (targetMap.has(row.id)) { fail('target_id_collision', 'An ID appears more than once across the input catalogues.', { target_id: row.id, source_bucket: bucket, previous_bucket: targetMap.get(row.id).source_bucket }); continue; }
    const archive = defaultCategory === 'archive' || row.category === 'archive' || /archive|cut.content/.test(row.content_class ?? '') || row.category === 'archive_creature';
    const category = archive ? 'archive' : defaultCategory ?? row.category;
    if (!['character', 'costume', 'stage', 'boss', 'archive', 'projectile'].includes(category)) fail('unknown_category', 'Unknown production category.', { target_id: row.id, category });
    if (archive && row.runtime_enabled !== false) fail('archive_runtime_enabled', 'Archives must explicitly remain runtime_enabled=false.', { target_id: row.id });
    const visualStateIds = category === 'projectile' ? array(row.variants_required, `${row.id}.variants_required`) : [];
    if (category === 'projectile') {
      if (!['projectile', 'throwable', 'instant_trace', 'beam', 'impact', 'area', 'portal', 'device', 'weapon_fire'].includes(row.effect_kind)) fail('unknown_effect_kind', 'Projectile/FX target has an unknown behavior type.', { target_id: row.id, effect_kind: row.effect_kind });
      if (!visualStateIds.length || visualStateIds.some(id => typeof id !== 'string' || !id.trim()) || new Set(visualStateIds).size !== visualStateIds.length) fail('invalid_visual_state_contract', 'Visual state IDs must be non-empty, unique strings.', { target_id: row.id });
      if (row.projectile_class != null) {
        if (!projectileClasses.has(row.projectile_class)) fail('unknown_projectile_class', 'Recovered projectile class is unknown.', { target_id: row.id, projectile_class: row.projectile_class });
        if (row.requires_travel_sprite !== travelSpriteClasses.has(row.projectile_class)) fail('projectile_travel_contract_mismatch', 'The recovered travel-sprite requirement differs from its projectile class.', { target_id: row.id });
      }
    }
    const refs = [];
    if (sources) {
      for (const sourceId of array(row.source_ids, `${row.id}.source_ids`)) {
        if (!sources.has(sourceId)) fail('unresolved_source_id', 'The target references an absent source in its catalogue.', { target_id: row.id, source_id: sourceId });
        else refs.push(sources.get(sourceId));
      }
    } else if (bucket === 'stages.stages' && row.evidence?.url) {
      refs.push({ namespace: 'stages', source_id: `${row.id}:evidence`, title: row.evidence.title ?? null, url: row.evidence.url, kind: 'stage_catalogue_reference', checked_scope: row.evidence.checked_scope ?? null });
    } else if (bucket.startsWith('roster.')) refs.push(...rosterReferences);
    targetMap.set(row.id, {
      target_id: row.id, source_bucket: bucket, source_file: `${dataDirectory}/${filename}`,
      category, source_category: row.category ?? null, owner_id: row.owner_id ?? row.id,
      ...(category === 'archive' && row.archive_kind ? { archive_kind: row.archive_kind } : {}),
      name: row.name_fr ?? row.name ?? row.id, source_game: row.source_game ?? null,
      content_class: row.content_class ?? null, priority: row.priority ?? null,
      identity_lock: row.identity_lock ?? row.visual_invariants ?? null,
      source_refs: refs, reference_capture: row.reference_capture ?? null,
      reference_status: row.visual_reference_status ?? row.reference_status ?? 'not_specified_in_source',
      effect_kind: row.effect_kind ?? null, effect_kind_provisional: row.effect_kind_provisional === true,
      projectile_class: row.projectile_class ?? null, requires_travel_sprite: row.requires_travel_sprite ?? null,
      primary_evidence_status: row.primary_evidence_status ?? null,
      legacy_target_ids: row.legacy_target_ids ?? [], legacy_reference_contracts: row.legacy_reference_contracts ?? [],
      required_visual_state_ids: visualStateIds,
      runtime_enabled_declared: typeof row.runtime_enabled === 'boolean' ? row.runtime_enabled : null,
      target_certified_one_to_one_declared: row.certified_one_to_one === true,
      required_layer_ids: category === 'stage' && Array.isArray(row.layers) ? row.layers.map(layer => layer.id) : [],
      actual_assets: [], refused_requests: [], tool_error_requests: [], output_unavailable_requests: [], other_unproduced_requests: [],
    });
  }
}

for (const target of targetMap.values()) if (!targetMap.has(target.owner_id)) fail('unresolved_target_owner', 'The target owner is absent from all catalogues.', { target_id: target.target_id, owner_id: target.owner_id });
const runtimeBossIds = array(bosses.runtime_boss_ids, 'boss_battle_catalog.runtime_boss_ids');
if (new Set(runtimeBossIds).size !== runtimeBossIds.length) fail('duplicate_runtime_boss_id', 'Runtime boss IDs must be unique.');
for (const id of runtimeBossIds) if (targetMap.get(id)?.source_bucket !== 'boss_battle_catalog.bosses' || targetMap.get(id)?.runtime_enabled_declared !== true) fail('unresolved_runtime_boss', 'Runtime boss ID has no enabled boss-catalogue entry.', { target_id: id });
for (const target of targetMap.values()) if (target.source_bucket === 'boss_battle_catalog.bosses' && target.runtime_enabled_declared && !runtimeBossIds.includes(target.target_id)) fail('missing_runtime_boss_id', 'An enabled boss is absent from runtime_boss_ids.', { target_id: target.target_id });

function actualFile(asset) {
  const path = asset.repository_path ?? asset.file_path;
  if (path == null || path === '') return null;
  if (typeof path !== 'string' || path.includes('\0') || path.includes('\\') || isAbsolute(path) || /^[a-z][a-z0-9+.-]*:/i.test(path) || path.split('/').includes('..')) { fail('unsafe_asset_path', 'Asset path must be repository-relative.', { asset_id: asset.asset_id }); return null; }
  const absolute = resolve(root, path);
  if (!inside(candidateRoot, absolute) || !/\.png$/i.test(path)) { fail('asset_outside_candidates', 'Asset must be a PNG inside assets/resonance/candidates.', { asset_id: asset.asset_id, repository_path: path }); return null; }
  try {
    if (!existsSync(absolute) || !statSync(absolute).isFile()) { fail('missing_asset_file', 'The registered PNG is absent.', { asset_id: asset.asset_id, repository_path: path }); return null; }
    if (!inside(realpathSync(candidateRoot), realpathSync(absolute))) { fail('unsafe_asset_destination', 'The asset resolves outside the candidate directory.', { asset_id: asset.asset_id }); return null; }
    return { repository_path: slash(relative(root, absolute)), byte_size_actual: statSync(absolute).size };
  } catch (error) { fail('unreadable_asset_file', error.message, { asset_id: asset.asset_id }); return null; }
}

const requests = array(register.assets ?? register.requests, 'generated_art_register.assets');
const assetIds = new Set();
const physicalFiles = new Set();
const refusalsByOwner = {};
const unassignedRequests = [];
let generatedRequests = 0;
let refusedRequests = 0;
let toolErrorRequests = 0;
let outputUnavailableRequests = 0;
let requestsWithoutFiles = 0;
for (const asset of requests) {
  if (!asset || typeof asset !== 'object') { fail('invalid_asset_request', 'A generation request must be an object.'); continue; }
  const id = asset.asset_id ?? asset.id;
  if (typeof id !== 'string' || !id.trim()) fail('missing_asset_id', 'Every generation request needs an asset ID.');
  else if (assetIds.has(id)) fail('duplicate_asset_id', 'Generation request IDs must be unique.', { asset_id: id });
  else assetIds.add(id);
  if (!targetMap.has(asset.owner_id) && asset.owner_type !== 'shared_collection') fail('unresolved_asset_owner', 'The generation request owner is not a catalogue target or declared shared collection.', { asset_id: id, owner_id: asset.owner_id });
  const status = normalized(asset.generation_status ?? asset.status);
  // Keep unavailable historical outputs and tool errors distinct from confirmed refusals.
  const outputUnavailable = /\b(sortie indisponible apres interruption|output unavailable)\b/.test(status);
  const explicitToolError = /\b(erreur outil|tool error)\b/.test(status) || asset.error_classification === 'tool_call_rejected_reason_unavailable';
  const refused = !outputUnavailable && !explicitToolError && /\b(refus|refuse|refused|blocked|bloque)\b/.test(status);
  const toolError = !outputUnavailable && !refused && (explicitToolError || /\b(echec|failed|failure|rejected|erreur)\b/.test(status));
  const generated = !outputUnavailable && !toolError && !refused && (asset.generated === true || /^(genere|generated|produit|produced|success|succeeded|completed)(\b|$)/.test(status));
  const outcome = outputUnavailable ? 'output_unavailable' : toolError ? 'tool_error' : refused ? 'blocked' : generated ? 'generated' : 'unproduced';
  if (generated) generatedRequests += 1;
  if (refused) refusedRequests += 1;
  if (toolError) toolErrorRequests += 1;
  if (outputUnavailable) outputUnavailableRequests += 1;
  const file = actualFile(asset);
  if (!file) requestsWithoutFiles += 1;
  if (generated && !file) fail('generated_without_file', 'A generated request cannot pass without an actual PNG.', { asset_id: id });
  if (refused && file) fail('refused_with_output', 'A refused request must not claim a produced output file.', { asset_id: id });
  if ((toolError || outputUnavailable) && ['repository_path', 'file_path', 'path'].some(field => asset[field] != null && asset[field] !== '')) fail('unavailable_with_file_path', 'A tool error or unavailable output must not claim an available PNG path.', { asset_id: id });
  if (file) physicalFiles.add(file.repository_path);
  const explicitlyTargeted = asset.target_ids != null || asset.target_id != null;
  const linkedIds = asset.target_ids != null ? array(asset.target_ids, `${id}.target_ids`) : asset.target_id != null ? [asset.target_id] : [];
  if (new Set(linkedIds).size !== linkedIds.length) fail('duplicate_asset_target', 'A request repeats a target ID.', { asset_id: id });
  for (const targetId of linkedIds) {
    const target = targetMap.get(targetId);
    if (!target) fail('unresolved_asset_target', 'The request names an absent target.', { asset_id: id, target_id: targetId });
    else if (asset.owner_id !== target.owner_id && asset.owner_id !== target.target_id) fail('asset_target_owner_mismatch', 'The request owner does not match its explicit target.', { asset_id: id, target_id: targetId, owner_id: asset.owner_id });
  }
  // Owner fallback is for base appearances only. A costume always needs its own target ID.
  const linkedTargets = explicitlyTargeted
    ? [...new Set(linkedIds)].map(targetId => targetMap.get(targetId)).filter(Boolean)
    : [...targetMap.values()].filter(target => target.category !== 'costume' && target.target_id === asset.owner_id);
  const requestSummary = { asset_id: id ?? null, owner_id: asset.owner_id ?? null, generation_status: asset.generation_status ?? asset.status ?? null, outcome, notes: asset.notes ?? null };
  if (refused) (refusalsByOwner[asset.owner_id ?? 'unspecified'] ??= []).push(requestSummary);
  if (!linkedTargets.length) unassignedRequests.push({ ...requestSummary, reason: asset.owner_type === 'shared_collection' ? 'shared_collection_outside_target_queue' : 'no_exact_target_association', repository_path: file?.repository_path ?? null });
  for (const target of linkedTargets) {
    if (target.category === 'archive' && asset.runtime_enabled === true) fail('archive_asset_runtime_enabled', 'An archive asset must not enable runtime content.', { asset_id: id, target_id: target.target_id });
    if (target.category === 'stage') {
      const layerId = asset.layer_id;
      if (layerId != null && (typeof layerId !== 'string' || !layerId.trim())) fail('invalid_layer_id', 'A declared layer_id must be a non-empty string.', { asset_id: id, target_id: target.target_id });
      else if (layerId != null && target.required_layer_ids.length && !target.required_layer_ids.includes(layerId)) fail('unknown_stage_layer_id', 'The declared layer_id is absent from this stage contract.', { asset_id: id, target_id: target.target_id, layer_id: layerId, required_layer_ids: target.required_layer_ids });
      if (file && /stage_layer/.test(asset.category ?? '') && layerId == null) warn('layer_id_missing', 'A legacy layer file has no declared layer_id; it counts as a file, not an identified stage plane.', { asset_id: id, target_id: target.target_id, repository_path: file.repository_path });
    }
    if (target.category === 'projectile' && asset.visual_state_id != null && !target.required_visual_state_ids.includes(asset.visual_state_id)) fail('unknown_projectile_visual_state', 'The declared visual_state_id is absent from this projectile/FX contract.', { asset_id: id, target_id: target.target_id, visual_state_id: asset.visual_state_id });
    if (file) target.actual_assets.push({ asset_id: id, ...file, category: asset.category ?? null, layer_id: asset.layer_id ?? null, visual_state_id: asset.visual_state_id ?? null, visual_state: asset.visual_state ?? null, selected_for_next_review: typeof asset.selected_for_next_review === 'boolean' ? asset.selected_for_next_review : null, revision_of: asset.revision_of ?? asset.supersedes ?? null, superseded_by: asset.superseded_by ?? null, qa_status: asset.qa_status ?? null, certified_one_to_one_declared: asset.certified_one_to_one === true, animation_clip_complete_declared: asset.animation_clip_complete === true, integrated_in_game_declared: asset.integrated_in_game === true, association: explicitlyTargeted ? 'explicit_target_id' : 'base_owner_id' });
    else if (refused) target.refused_requests.push(requestSummary);
    else if (toolError) target.tool_error_requests.push(requestSummary);
    else if (outputUnavailable) target.output_unavailable_requests.push(requestSummary);
    else target.other_unproduced_requests.push(requestSummary);
  }
}

for (const target of targetMap.values()) {
  target.actual_file_count = new Set(target.actual_assets.map(asset => asset.repository_path)).size;
  const selectedAssets = target.actual_assets.filter(asset => asset.selected_for_next_review === true);
  target.selected_candidate_file_count = new Set(selectedAssets.map(asset => asset.repository_path)).size;
  target.selected_candidate_asset_ids = selectedAssets.map(asset => asset.asset_id);
  target.master_candidate_count = new Set(target.actual_assets.filter(asset => /^stage_master(?:_|$)/.test(asset.category ?? '')).map(asset => asset.repository_path)).size;
  target.selected_master_candidate_count = new Set(selectedAssets.filter(asset => /^stage_master(?:_|$)/.test(asset.category ?? '')).map(asset => asset.repository_path)).size;
  const layerAssets = target.actual_assets.filter(asset => /stage_layer/.test(asset.category ?? ''));
  target.layer_candidate_count = new Set(layerAssets.map(asset => asset.repository_path)).size;
  if (target.category === 'stage') {
    const fileLayerIds = new Map();
    for (const asset of layerAssets) {
      if (!fileLayerIds.has(asset.repository_path)) fileLayerIds.set(asset.repository_path, new Set());
      if (typeof asset.layer_id === 'string' && asset.layer_id.trim()) fileLayerIds.get(asset.repository_path).add(asset.layer_id);
    }
    // Revisions of one plane count once; one physical file cannot supply two planes.
    for (const [path, ids] of fileLayerIds) if (ids.size > 1) fail('conflicting_file_layer_ids', 'One PNG is assigned to multiple planes of the same stage.', { target_id: target.target_id, repository_path: path, layer_ids: [...ids] });
    target.layer_contract_known = target.required_layer_ids.length > 0;
    target.layer_candidate_ids = [...new Set([...fileLayerIds.values()].filter(ids => ids.size === 1).flatMap(ids => [...ids]))].filter(id => !target.layer_contract_known || target.required_layer_ids.includes(id)).sort();
    target.layer_candidate_id_count = target.layer_candidate_ids.length;
    target.selected_layer_candidate_ids = [...new Set(selectedAssets.filter(asset => /stage_layer/.test(asset.category ?? '') && target.layer_candidate_ids.includes(asset.layer_id)).map(asset => asset.layer_id))].sort();
    target.layer_candidate_files_without_id_count = [...fileLayerIds.values()].filter(ids => ids.size === 0).length;
    target.missing_layer_ids = target.layer_contract_known ? target.required_layer_ids.filter(id => !target.layer_candidate_ids.includes(id)) : null;
    target.missing_layer_id_count = target.missing_layer_ids?.length ?? null;
  }
  if (target.category === 'projectile') {
    target.candidate_visual_state_ids = [...new Set(target.actual_assets.map(asset => asset.visual_state_id).filter(id => target.required_visual_state_ids.includes(id)))].sort();
    target.selected_visual_state_ids = [...new Set(selectedAssets.map(asset => asset.visual_state_id).filter(id => target.required_visual_state_ids.includes(id)))].sort();
    target.missing_visual_state_ids = target.required_visual_state_ids.filter(id => !target.candidate_visual_state_ids.includes(id));
    target.visual_state_files_without_id_count = new Set(target.actual_assets.filter(asset => asset.visual_state_id == null).map(asset => asset.repository_path)).size;
  }
  target.certified_asset_count_declared = target.actual_assets.filter(asset => asset.certified_one_to_one_declared).length;
  target.production_status = target.actual_file_count ? 'candidate_files_present_work_remaining' : target.refused_requests.length ? 'no_file_refusal_recorded' : target.output_unavailable_requests.length ? 'no_file_output_unavailable' : target.tool_error_requests.length ? 'no_file_tool_error' : 'no_file';
  target.completion_note = 'No target, animation, visual-fidelity review or six-layer stage is closed by this queue.';
  const next = [];
  if (!target.source_game) next.push('Documenter explicitement le jeu et la version dans le catalogue source.');
  if (target.category === 'archive') next.push('Identifier la révision et les captures d’archive; conserver runtime_enabled=false.');
  if (!target.reference_capture) next.push('Ajouter des captures du modèle ou du lieu exact et vérifier les invariants visuels.');
  if (!target.actual_file_count) next.push(target.refused_requests.length ? 'Conserver les refus enregistrés; la première image candidate reste à produire.' : 'Produire une première image candidate individuelle après fixation des références.');
  else next.push('Comparer chaque candidat aux références et corriger les écarts avant validation 1:1.');
  if (target.category === 'stage') next.push('Produire, aligner et contrôler six plans de parallaxe distincts; un panorama maître ne termine pas ces plans.');
  else if (target.category === 'character' || target.category === 'costume') next.push('Produire et vérifier les poses, transitions et animations prévues; une pose isolée ne termine pas le personnage ou le costume.');
  else if (target.category === 'boss') next.push('Produire les poses et animations du boss puis valider ses phases, son échelle et ses interactions.');
  else if (target.category === 'projectile') {
    next.push('Produire séparément corps, traînée, impact et variantes indiquées; attribuer un visual_state_id exact à chaque fichier.');
    if (target.primary_evidence_status === 'primary_context_only_specific_capture_required') next.push('La page produit confirme seulement le contexte; obtenir une capture primaire spécifique de cet effet.');
    if (target.effect_kind_provisional) next.push('Vérifier le type d’effet et sa séquence dans le jeu source avant de fixer le contrat visuel.');
    if (target.effect_kind === 'instant_trace') next.push('Conserver un tir instantané; le traceur visuel ne devient pas un projectile lent.');
    else if (target.effect_kind === 'portal') next.push('Rendre la destination du portail dynamiquement; le sprite ne contient que son contour et ses transitions.');
    else if (['beam', 'area'].includes(target.effect_kind)) next.push('Respecter le faisceau ou la zone; un effet continu ne devient pas une boule mobile.');
    else if (target.effect_kind === 'device') next.push('Produire le boîtier posé et ses états; son faisceau est une cible distincte et aucun vol n’est présumé.');
    else if (target.effect_kind === 'weapon_fire') next.push('Relever départ, trace éventuelle et contact sans présumer un modèle de collision hitscan ou projectile.');
    next.push('Vérifier alpha, couleurs, durée, orientation et interaction avant intégration; une image ne termine pas une famille.');
  }
  target.next_work = next;
}

const targets = [...targetMap.values()];
const stageTargets = targets.filter(target => target.category === 'stage');
const projectileTargets = targets.filter(target => target.category === 'projectile');
const stageLayerAssets = stageTargets.flatMap(target => target.actual_assets.filter(asset => /stage_layer/.test(asset.category ?? '')));
const counts = {
  targets: targets.length, by_source_bucket: groupCounts(targets, 'source_bucket'), by_category: groupCounts(targets, 'category'), by_content_class: groupCounts(targets, 'content_class'),
  targets_with_files: targets.filter(target => target.actual_file_count > 0).length,
  targets_without_files: targets.filter(target => target.actual_file_count === 0).length,
  targets_with_refusals: targets.filter(target => target.refused_requests.length > 0).length,
  selected_candidate_files: new Set(targets.flatMap(target => target.actual_assets.filter(asset => asset.selected_for_next_review === true).map(asset => asset.repository_path))).size,
  costume_targets_with_exactly_associated_files: targets.filter(target => target.category === 'costume' && target.actual_file_count > 0).length,
  generation_requests: requests.length, generated_requests: generatedRequests, refused_requests: refusedRequests,
  tool_error_requests: toolErrorRequests, output_unavailable_requests: outputUnavailableRequests, requests_without_files: requestsWithoutFiles,
  distinct_registered_png_files_present: physicalFiles.size,
  requests_outside_target_queue: unassignedRequests.length,
  stage_layer_candidate_files: new Set(stageLayerAssets.map(asset => asset.repository_path)).size,
  stage_layer_candidate_ids: stageTargets.reduce((sum, target) => sum + target.layer_candidate_id_count, 0),
  stage_layer_files_without_id: new Set(stageLayerAssets.filter(asset => asset.layer_id == null).map(asset => asset.repository_path)).size,
  stage_layer_missing_ids_in_known_contracts: stageTargets.reduce((sum, target) => sum + (target.missing_layer_id_count ?? 0), 0),
  stages_without_layer_contract: stageTargets.filter(target => !target.layer_contract_known).length,
  projectile_targets: projectileTargets.length,
  projectile_targets_with_files: projectileTargets.filter(target => target.actual_file_count > 0).length,
  projectile_targets_without_files: projectileTargets.filter(target => target.actual_file_count === 0).length,
  projectile_targets_by_effect_kind: groupCounts(projectileTargets, 'effect_kind'),
  projectile_visual_state_candidate_ids: projectileTargets.reduce((sum, target) => sum + target.candidate_visual_state_ids.length, 0),
  projectile_visual_state_missing_ids: projectileTargets.reduce((sum, target) => sum + target.missing_visual_state_ids.length, 0),
  projectile_files_without_visual_state_id: new Set(projectileTargets.flatMap(target => target.actual_assets.filter(asset => asset.visual_state_id == null).map(asset => asset.repository_path))).size,
  archives: targets.filter(target => target.category === 'archive').length,
  archives_runtime_enabled: targets.filter(target => target.category === 'archive' && target.runtime_enabled_declared === true).length,
  targets_automatically_completed: 0,
};
if (targets.some(target => !target.source_game)) warn('source_game_missing', 'Some historical reserve entries omit source_game. The queue preserves null instead of inferring it from an ID.', { target_ids: targets.filter(target => !target.source_game).map(target => target.target_id) });
const queue = {
  schema_version: '1.2', generated_at: new Date().toISOString(), module: 'Half Life Resonance', status: errors.length ? 'failed' : 'passed',
  input_files: [...new Set(sourceEntries.map(([, filename]) => `${dataDirectory}/${filename}`)), `${dataDirectory}/generated_art_register.json`],
  semantics: { generation_outcomes: 'Explicit refusals, tool errors and unavailable historical outputs are separate. An unavailable output has no current PNG; historical measures belong to lost_output and do not supply a file. Explicit unavailable/error statuses override stale generated flags.', target_count: 'Catalogue targets, not playable characters or produced sprites.', physical_files: 'Only registered PNG paths that currently exist. See asset_audit.json for header and checksum validation.', stage_layers: 'layer_candidate_count counts distinct PNG paths; layer_candidate_ids counts declared plane IDs once per stage, regardless of revisions. Files without layer_id identify no plane. Missing IDs refer only to known contracts and remain null for unknown contracts. A candidate plane is not a validated or completed plane.', costumes: 'Explicit own target_ids required; base-owner artwork is never inherited.', projectiles: 'One target is a projectile/FX family. effect_kind distinguishes projectiles, thrown objects, instant traces, beams, impacts, areas and portals. Visual state IDs count once regardless of revisions; a file without an ID covers no specified state.', selection: 'Only selected_for_next_review=true counts as selected. Selection is a production decision, never a fidelity certification; historical revisions remain counted as physical files.', references: 'Source IDs resolve within their own catalogue namespace; roster-wide references remain labelled catalogue context. A code resource or product page does not certify a visual model.', completion: 'Candidate files never automatically complete fidelity, animation or stage production.' },
  counts, targets, refusals_by_owner: refusalsByOwner, requests_outside_target_queue: unassignedRequests, errors, warnings,
};

if (args.includes('--write') && !errors.length) {
  const cell = value => String(value ?? 'à documenter').replaceAll('|', '\\|').replaceAll('\n', ' ');
  const markdown = [
    '# Cibles à poursuivre — Half Life Resonance', '',
    `État calculé le ${queue.generated_at} depuis les catalogues et les chemins PNG existants.`, '',
    `**${counts.targets} cibles documentées** : ${counts.targets_with_files} avec au moins un fichier candidat associé et ${counts.targets_without_files} sans fichier associé. ${counts.distinct_registered_png_files_present} PNG distincts par chemin sont présents dans le registre; les accessoires partagés peuvent se trouver hors de cette file de cibles.`, '',
    `${counts.refused_requests} refus, ${counts.tool_error_requests} erreurs d’outil et ${counts.output_unavailable_requests} sorties historiques indisponibles sont suivis séparément; ces entrées ne fournissent aucun fichier.`, '',
    'Une cible ne représente pas nécessairement un combattant jouable. Les costumes utilisent leurs propres identifiants et ne récupèrent pas automatiquement les images du personnage parent. Les refus restent visibles. Aucun de ces totaux ne certifie une fidélité 1:1, une animation complète ou un stage à six plans.', '',
    `${counts.projectile_targets} familles de projectiles et effets sont suivies séparément : ${counts.projectile_targets_with_files} disposent d’un candidat. Les traces instantanées, faisceaux, zones et portails conservent leur propre fonctionnement. Les fichiers sélectionnés pour la prochaine revue sont distingués des révisions historiques; aucune sélection ne vaut certification.`, '',
    '## Répartition', '', '| Catégorie | Cibles |', '|---|---:|',
    ...Object.entries(counts.by_category).map(([key, count]) => `| ${key} | ${count} |`), '',
    '| Catalogue source | Cibles |', '|---|---:|',
    ...Object.entries(counts.by_source_bucket).map(([key, count]) => `| ${key} | ${count} |`), '',
    '## Liste et prochaine étape', '',
  ];
  for (const [bucket] of sourceEntries) {
    markdown.push(`### ${bucket}`, '', '| ID / nom | Catégorie / jeu / classe | PNG / refus | Prochaine étape |', '|---|---|---|---|');
    for (const target of targets.filter(item => item.source_bucket === bucket)) markdown.push(`| \`${cell(target.target_id)}\` — ${cell(target.name)} | ${cell(target.category)}${target.archive_kind ? ` / ${cell(target.archive_kind)}` : ''} · ${cell(target.source_game)} · ${cell(target.content_class)} | ${target.actual_file_count} / ${target.refused_requests.length} | ${cell(target.next_work.join(' '))} |`);
    markdown.push('');
  }
  markdown.push('## Fichiers réellement associés', '', '| Cible | Fichier | État / sélection | État QA déclaré |', '|---|---|---|---|');
  for (const target of targets) for (const asset of target.actual_assets) markdown.push(`| \`${cell(target.target_id)}\` | \`${cell(asset.repository_path)}\` | ${cell(asset.layer_id ?? asset.visual_state_id ?? 'non identifié')} / ${asset.selected_for_next_review === true ? 'retenu pour revue' : asset.selected_for_next_review === false ? 'non retenu' : 'non précisé'} | ${cell(asset.qa_status)} |`);
  markdown.push('', '## Refus par propriétaire', '');
  if (!Object.keys(refusalsByOwner).length) markdown.push('Aucun refus enregistré.');
  for (const [owner, rows] of Object.entries(refusalsByOwner)) markdown.push(`- **${cell(owner)}** : ${rows.map(row => `\`${cell(row.asset_id)}\``).join(', ')}.`);
  markdown.push('', '## Références et limites', '', 'Les références détaillées de chaque cible, leur portée, les fichiers sources, les classes de contenu et les demandes non produites figurent dans `docs/resonance/data/production_queue.json`. Les sources générales du roster restent distinguées des preuves visuelles propres à une apparence.', '', `${counts.archives} archives sont isolées et ${counts.archives_runtime_enabled} sont activées dans le runtime. Les champs source absents restent à documenter; ils ne sont pas remplis par déduction.`, '', 'Génération de ce document : `node scripts/sync-resonance-production.mjs --write`.', '');
  mkdirSync(resolve(root, 'docs/resonance/production'), { recursive: true });
  writeFileSync(resolve(root, dataDirectory, 'production_queue.json'), `${JSON.stringify(queue, null, 2)}\n`);
  writeFileSync(resolve(root, 'docs/resonance/production/MISSING_TARGETS.md'), markdown.join('\n'));
}

console.log(JSON.stringify({ status: queue.status, counts, errors: errors.length, warnings: warnings.length, written: args.includes('--write') && !errors.length }));
for (const error of errors.slice(0, 12)) console.error(`FAIL ${error.code}: ${error.target_id ?? error.asset_id ?? error.source_id ?? ''} ${error.message}`);
for (const warning of warnings.filter(item => item.code === 'layer_id_missing').slice(0, 12)) console.warn(`WARN ${warning.code}: ${warning.asset_id} ${warning.message}`);
if (errors.length > 12) console.error(`... ${errors.length - 12} further validation errors.`);
if (errors.length) process.exitCode = 1;
