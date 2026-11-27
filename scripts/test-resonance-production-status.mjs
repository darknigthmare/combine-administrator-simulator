import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Exercise the real audit and sync entry points in an isolated temporary repository.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fixture = mkdtempSync(join(tmpdir(), 'resonance-status-check-'));
const scripts = ['audit-resonance-production.mjs', 'sync-resonance-production.mjs'];
const dataFiles = ['roster.json', 'stages.json', 'boss_battle_catalog.json', 'catalogue_extension_20261120.json', 'catalogue_extension_20261124.json', 'projectile_catalog_20261124.json', 'cut_content_catalog_20261127.json'];
const dataPath = join(fixture, 'docs/resonance/data');
const candidatePath = 'assets/resonance/candidates/status_fixture.png';
const readJson = path => JSON.parse(readFileSync(path, 'utf8'));
const run = (script, args = []) => {
  const result = spawnSync(process.execPath, [join(fixture, 'scripts', script), ...args], { cwd: fixture, encoding: 'utf8' });
  assert.equal(result.error, undefined, result.error?.message);
  return { ...result, summary: JSON.parse(result.stdout.trim()) };
};
try {
  mkdirSync(join(fixture, 'scripts'), { recursive: true });
  mkdirSync(dataPath, { recursive: true });
  mkdirSync(join(fixture, 'assets/resonance/candidates'), { recursive: true });
  for (const script of scripts) copyFileSync(join(root, 'scripts', script), join(fixture, 'scripts', script));
  for (const name of dataFiles) copyFileSync(join(root, 'docs/resonance/data', name), join(dataPath, name));
  const ownerId = readJson(join(dataPath, 'roster.json')).fighters[0].id;
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aO6kAAAAASUVORK5CYII=', 'base64');
  writeFileSync(join(fixture, candidatePath), png);
  const entry = (id, status, extra = {}) => ({
    asset_id: id, owner_id: ownerId, owner_type: 'fighter', target_ids: [ownerId],
    generation_status: status, file_path: null, repository_path: null,
    certified_one_to_one: false, integrated_in_game: false, animation_clip_complete: false, ...extra,
  });
  const assets = [
    entry('present', 'généré', { file_path: candidatePath, repository_path: candidatePath, width: 1, height: 1, sha256: createHash('sha256').update(png).digest('hex') }),
    entry('historical_refusal', 'refus automatique'),
    entry('tool_error_with_stale_flag', 'erreur outil', { generated: true }),
    entry('lost_with_stale_flag', 'sortie indisponible après interruption', { generated: true, lost_output: { width: 100, height: 200, sha256: 'historical-output-only' } }),
    entry('generic_failure', 'failed'),
    entry('unavailable_alias', 'output_unavailable', { generated: true }),
    entry('unclassified_rejection', 'rejected'),
    entry('explicit_block', 'blocked'),
  ];
  const save = (rows, counts) => writeFileSync(join(dataPath, 'generated_art_register.json'), JSON.stringify({ schema_version: '1.0', assets: rows, ...(counts ? { counts } : {}) }));
  save(assets);
  const audit = run(scripts[0], ['--write-report']);
  const sync = run(scripts[1], ['--write']);
  assert.equal(audit.status, 0, audit.stderr);
  assert.equal(sync.status, 0, sync.stderr);
  assert.equal(audit.summary.generated_requests, 1);
  assert.equal(audit.summary.blocked_requests, 2);
  assert.equal(audit.summary.tool_error_requests, 3);
  assert.equal(audit.summary.output_unavailable_requests, 2);
  assert.equal(audit.summary.unproduced_requests, 5);
  assert.equal(audit.summary.unclassified_requests, 0);
  assert.equal(audit.summary.requests_without_files, 7);
  assert.equal(sync.summary.counts.generated_requests, 1);
  assert.equal(sync.summary.counts.refused_requests, 2);
  assert.equal(sync.summary.counts.tool_error_requests, 3);
  assert.equal(sync.summary.counts.output_unavailable_requests, 2);
  assert.equal(sync.summary.counts.requests_without_files, 7);
  assert.equal(sync.summary.counts.distinct_registered_png_files_present, 1);
  const queue = readJson(join(dataPath, 'production_queue.json'));
  const target = queue.targets.find(row => row.target_id === ownerId);
  assert.equal(target.refused_requests.length, 2);
  assert.equal(target.tool_error_requests.length, 3);
  assert.equal(target.output_unavailable_requests.length, 2);
  assert.equal(target.other_unproduced_requests.length, 0);

  // Every target from the cut-content catalogue stays an archive, even if its
  // individual metadata is accidentally relabelled as released content.
  const cutCataloguePath = join(dataPath, 'cut_content_catalog_20261127.json');
  const cutCatalogue = readJson(cutCataloguePath);
  assert.ok(cutCatalogue.targets.length > 0, 'The cut-content fixture must contain a target.');
  const cutTarget = queue.targets.find(row => row.target_id === cutCatalogue.targets[0].id);
  assert.equal(cutTarget?.category, 'archive');
  assert.equal(cutTarget.runtime_enabled_declared, false);
  const invalidCutCatalogue = structuredClone(cutCatalogue);
  Object.assign(invalidCutCatalogue.targets[0], { category: 'character', content_class: 'official_released', runtime_enabled: true });
  writeFileSync(cutCataloguePath, JSON.stringify(invalidCutCatalogue));
  const archiveRuntimeLeak = run(scripts[1]);
  assert.equal(archiveRuntimeLeak.status, 1);
  assert.match(archiveRuntimeLeak.stderr, /archive_runtime_enabled/);
  writeFileSync(cutCataloguePath, JSON.stringify(cutCatalogue));

  // Declared counter checks use the canonical keys actually written by the register.
  save(assets, { tool_error_requests: 99, output_unavailable_requests: 99 });
  const incorrectCounts = run(scripts[0], ['--write-report']);
  assert.equal(incorrectCounts.status, 0, incorrectCounts.stderr);
  const countWarnings = readJson(join(fixture, 'docs/resonance/production/asset_audit.json')).warnings.filter(warning => warning.code === 'declared_count_mismatch');
  assert.deepEqual(countWarnings.map(warning => warning.field).sort(), ['output_unavailable_requests', 'tool_error_requests']);

  // An error/unavailable status never licenses a nonexistent or existing output path.
  for (const status of ['erreur outil', 'sortie indisponible après interruption']) {
    for (const path of ['assets/resonance/candidates/does-not-exist.png', candidatePath]) {
      save([...assets, entry('invalid_claim', status, { file_path: path, repository_path: path })]);
      for (const script of scripts) {
        const failed = run(script);
        assert.equal(failed.status, 1, script + ' accepted an output path for ' + status);
        assert.match(failed.stderr, script === scripts[0] ? /unproduced_with_file_path/ : /unavailable_with_file_path/);
        if (path.endsWith('does-not-exist.png')) assert.match(failed.stderr, /missing_asset_file/);
      }
    }
  }
  save([...assets, entry('missing_generated', 'généré', { file_path: 'assets/resonance/candidates/absent.png', repository_path: 'assets/resonance/candidates/absent.png' })]);
  for (const script of scripts) {
    const failed = run(script);
    assert.equal(failed.status, 1);
    assert.match(failed.stderr, /missing_asset_file/);
    assert.match(failed.stderr, /generated_without_file/);
  }
  console.log(JSON.stringify({ status: 'passed', checks: ['outcome separation', 'stale generated flag priority', 'per-target outcome separation', 'cut-content archive runtime guard', 'declared error/unavailable counters', 'missing and existing invalid output paths', 'missing generated PNG remains an error'], scripts }));
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
