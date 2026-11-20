import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const candidateDirectory = 'assets/resonance/candidates';
const registerPath = 'docs/resonance/data/generated_art_register.json';
const reportDirectory = resolve(root, 'docs/resonance/production');
const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log('Usage: node scripts/audit-resonance-production.mjs [--write-report]\nChecks the actual PNG files and their generation register. No visual fidelity is inferred.');
  process.exit(0);
}
if (args.some(argument => argument !== '--write-report')) {
  console.error('Unknown argument. Use --help.');
  process.exit(2);
}

const errors = [];
const warnings = [];
const issue = (collection, code, message, context = {}) => collection.push({ code, message, ...context });
const slash = value => value.split(sep).join('/');
const normalizeStatus = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase().replace(/[_-]+/g, ' ');
const within = (directory, path) => {
  const child = relative(directory, path);
  return child !== '' && child !== '..' && !child.startsWith(`..${sep}`) && !isAbsolute(child);
};
const candidateRoot = resolve(root, candidateDirectory);
const inventory = new Map();
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const colorModes = { 0: 'L', 2: 'RGB', 3: 'P', 4: 'LA', 6: 'RGBA' };

function inspectPng(path) {
  const repositoryPath = slash(relative(root, path));
  try {
    const bytes = readFileSync(path);
    const file = { repository_path: repositoryPath, byte_size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), width: null, height: null, color_mode: null, png_header_valid: false };
    if (bytes.length < 33 || !bytes.subarray(0, 8).equals(signature) || bytes.readUInt32BE(8) !== 13 || bytes.toString('ascii', 12, 16) !== 'IHDR') {
      issue(errors, 'invalid_png_header', 'PNG signature or IHDR header is invalid.', { repository_path: repositoryPath });
      return file;
    }
    file.width = bytes.readUInt32BE(16);
    file.height = bytes.readUInt32BE(20);
    file.bit_depth = bytes[24];
    file.color_type = bytes[25];
    file.color_mode = colorModes[file.color_type] ?? null;
    const allowedDepths = { 0: [1, 2, 4, 8, 16], 2: [8, 16], 3: [1, 2, 4, 8], 4: [8, 16], 6: [8, 16] };
    file.png_header_valid = file.width > 0 && file.height > 0 && (allowedDepths[file.color_type]?.includes(file.bit_depth) ?? false) && bytes[26] === 0 && bytes[27] === 0 && bytes[28] <= 1;
    if (!file.png_header_valid) issue(errors, 'invalid_png_ihdr', 'PNG IHDR values are invalid.', { repository_path: repositoryPath });
    return file;
  } catch (error) {
    issue(errors, 'unreadable_png', error.message, { repository_path: repositoryPath });
    return null;
  }
}

function scan(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))) {
    const path = resolve(directory, entry.name);
    if (entry.isSymbolicLink()) {
      issue(errors, 'candidate_symlink', 'Candidate symlinks are not followed.', { repository_path: slash(relative(root, path)) });
    } else if (entry.isDirectory()) {
      scan(path);
    } else if (entry.isFile() && /\.png$/i.test(entry.name)) {
      const file = inspectPng(path);
      if (file) inventory.set(file.repository_path, file);
    }
  }
}

if (!existsSync(candidateRoot)) issue(errors, 'missing_candidate_directory', 'The candidate directory does not exist.', { repository_path: candidateDirectory });
else if (!within(realpathSync(root), realpathSync(candidateRoot))) issue(errors, 'unsafe_candidate_directory', 'The candidate directory resolves outside the repository.');
else {
  try { scan(candidateRoot); }
  catch (error) { issue(errors, 'candidate_scan_failed', error.message); }
}

let register = {};
let assets = [];
try {
  register = JSON.parse(readFileSync(resolve(root, registerPath), 'utf8'));
  if (!register || typeof register !== 'object') throw new Error('The register must be a JSON object or array.');
  // Minor revisions may rename the request array; field additions need no audit change.
  const entries = Array.isArray(register) ? register : register.assets ?? register.requests;
  if (!Array.isArray(entries)) throw new Error('The register must contain an assets[] or requests[] array.');
  assets = entries;
} catch (error) {
  if (!register || typeof register !== 'object') register = {};
  issue(errors, 'unreadable_register', error.message, { repository_path: registerPath });
}

function resolveCandidatePath(value, assetId, field) {
  if (typeof value !== 'string' || !value.trim() || value.includes('\0') || value.includes('\\') || isAbsolute(value) || /^[a-z][a-z0-9+.-]*:/i.test(value) || value.split('/').includes('..')) {
    issue(errors, 'unsafe_asset_path', 'Expected a safe repository-relative path.', { asset_id: assetId, field });
    return null;
  }
  const path = resolve(root, value);
  if (!within(candidateRoot, path) || !/\.png$/i.test(path)) {
    issue(errors, 'asset_path_outside_candidates', 'PNG assets must be inside the candidate directory.', { asset_id: assetId, field, repository_path: value });
    return null;
  }
  if (existsSync(path) && !within(realpathSync(candidateRoot), realpathSync(path))) {
    issue(errors, 'asset_symlink_escape', 'The asset resolves outside the candidate directory.', { asset_id: assetId, field, repository_path: value });
    return null;
  }
  return slash(relative(root, path));
}

const ids = new Set();
const referencedPaths = new Map();
const requests = [];
for (const [index, asset] of assets.entries()) {
  if (!asset || typeof asset !== 'object' || Array.isArray(asset)) {
    issue(errors, 'invalid_request', 'Every request must be an object.', { request_index: index });
    continue;
  }
  const assetId = asset.asset_id ?? asset.id;
  if (typeof assetId !== 'string' || !assetId.trim()) issue(errors, 'missing_asset_id', 'Every request needs a non-empty asset_id.', { request_index: index });
  else if (ids.has(assetId)) issue(errors, 'duplicate_asset_id', 'Asset IDs must be unique.', { asset_id: assetId });
  else ids.add(assetId);

  const status = normalizeStatus(asset.generation_status ?? asset.status);
  const generated = asset.generated === true || /^(genere|generated|produit|produced|success|succeeded|completed)(\b|$)/.test(status);
  const blocked = /\b(refus|refuse|refused|blocked|bloque|rejected|echec|failed|failure)\b/.test(status);
  const explicitlyUnproduced = blocked || /\b(non produit|not produced|not generated|non genere|pending|planned|planifie|queued|specifie|a generer|a produire)\b/.test(status);
  const errorCountBefore = errors.length;
  const pathFields = ['repository_path', 'file_path', 'path'].filter(field => asset[field] != null && asset[field] !== '');
  const resolvedPaths = pathFields.map(field => resolveCandidatePath(asset[field], assetId, field)).filter(Boolean);
  const uniquePaths = [...new Set(resolvedPaths)];
  if (uniquePaths.length > 1) issue(errors, 'inconsistent_asset_paths', 'Repository path fields refer to different PNGs.', { asset_id: assetId, repository_paths: uniquePaths });
  const repositoryPath = uniquePaths[0] ?? null;
  const file = repositoryPath ? inventory.get(repositoryPath) ?? null : null;
  if (repositoryPath) referencedPaths.set(repositoryPath, [...(referencedPaths.get(repositoryPath) ?? []), assetId ?? `request_${index}`]);
  if (pathFields.length && !file) issue(errors, 'missing_asset_file', 'The referenced PNG is absent from the scanned inventory.', { asset_id: assetId, repository_path: repositoryPath });
  if (generated && !file) issue(errors, 'generated_without_file', 'A generated request must have an actual PNG file.', { asset_id: assetId });
  if (explicitlyUnproduced && pathFields.length) issue(errors, 'unproduced_with_file_path', 'An unproduced request must not claim an output PNG.', { asset_id: assetId });
  if ((asset.certified_one_to_one === true || asset.integrated_in_game === true || asset.animation_clip_complete === true) && !file) issue(errors, 'completion_without_file', 'Certification, integration and completed-animation claims need a file.', { asset_id: assetId });

  if (file) {
    const expected = {
      width: asset.width ?? asset.dimensions?.width,
      height: asset.height ?? asset.dimensions?.height,
      byte_size: asset.byte_size ?? asset.size_bytes,
      sha256: asset.sha256,
      color_mode: asset.color_mode,
    };
    for (const [field, value] of Object.entries(expected)) {
      if (value == null) continue;
      const normalized = field === 'sha256' && typeof value === 'string' ? value.toLowerCase() : value;
      if (normalized !== file[field]) issue(errors, 'asset_metadata_mismatch', `Declared ${field} differs from the actual PNG.`, { asset_id: assetId, field, declared: value, actual: file[field] });
    }
    if (!generated && !explicitlyUnproduced) issue(warnings, 'unclassified_file_request', 'A PNG exists but the request has no recognized generation outcome.', { asset_id: assetId, generation_status: asset.generation_status ?? asset.status ?? null });
  }
  requests.push({
    asset_id: assetId ?? null,
    generation_status: asset.generation_status ?? asset.status ?? null,
    outcome: generated ? 'generated' : blocked ? 'blocked' : explicitlyUnproduced ? 'unproduced' : 'unclassified',
    repository_path: repositoryPath,
    file_present: Boolean(file),
    file_metadata_verified: Boolean(file?.png_header_valid) && errors.length === errorCountBefore,
    certified_one_to_one_declared: asset.certified_one_to_one === true,
    integrated_in_game_declared: asset.integrated_in_game === true,
    animation_clip_complete_declared: asset.animation_clip_complete === true,
  });
}

const unregistered = [...inventory.keys()].filter(path => !referencedPaths.has(path));
for (const path of unregistered) issue(errors, 'unregistered_png', 'The actual PNG has no generation-register entry.', { repository_path: path });
for (const [path, assetIds] of referencedPaths) if (assetIds.length > 1) issue(warnings, 'shared_file_reference', 'Multiple requests refer to one PNG; it counts as one physical file.', { repository_path: path, asset_ids: assetIds });

const contentGroups = new Map();
for (const file of inventory.values()) contentGroups.set(file.sha256, [...(contentGroups.get(file.sha256) ?? []), file.repository_path]);
const duplicateContents = [...contentGroups].filter(([, paths]) => paths.length > 1).map(([sha256, paths]) => ({ sha256, repository_paths: paths }));
const counts = {
  actual_png_files: inventory.size,
  valid_png_headers: [...inventory.values()].filter(file => file.png_header_valid).length,
  distinct_png_contents: contentGroups.size,
  requests: assets.length,
  generated_requests: requests.filter(request => request.outcome === 'generated').length,
  generated_requests_with_verified_file: requests.filter(request => request.outcome === 'generated' && request.file_metadata_verified).length,
  blocked_requests: requests.filter(request => request.outcome === 'blocked').length,
  unproduced_requests: requests.filter(request => ['blocked', 'unproduced'].includes(request.outcome)).length,
  unclassified_requests: requests.filter(request => request.outcome === 'unclassified').length,
  requests_with_files: requests.filter(request => request.file_present).length,
  registered_png_files: [...inventory.keys()].filter(path => referencedPaths.has(path)).length,
  unregistered_png_files: unregistered.length,
  certified_one_to_one_declared: requests.filter(request => request.certified_one_to_one_declared).length,
  certified_one_to_one_with_verified_file: requests.filter(request => request.certified_one_to_one_declared && request.file_metadata_verified).length,
  integrated_in_game_declared: requests.filter(request => request.integrated_in_game_declared).length,
  completed_animation_clips_declared: requests.filter(request => request.animation_clip_complete_declared).length,
};
const comparableCounts = { requests: counts.requests, generated: counts.generated_requests, blocked: counts.blocked_requests, certified_one_to_one: counts.certified_one_to_one_declared, integrated_in_game: counts.integrated_in_game_declared, completed_animation_clips: counts.completed_animation_clips_declared };
for (const [field, actual] of Object.entries(comparableCounts)) {
  if (register.counts?.[field] != null && register.counts[field] !== actual) issue(warnings, 'declared_count_mismatch', 'Stored summary differs from the actual request entries; the audit uses computed values.', { field, declared: register.counts[field], actual });
}

const report = {
  schema_version: '1.0',
  audited_at: new Date().toISOString(),
  scope: { candidate_directory: candidateDirectory, register: registerPath, register_schema_version: register.schema_version ?? null },
  status: errors.length ? 'failed' : 'passed',
  limits: 'File presence, SHA-256, byte size and PNG headers are checked. Pixel decoding, transparency quality, source fidelity, animations and runtime integration are not certified by this audit.',
  counts,
  declared_counts: register.counts ?? null,
  files: [...inventory.values()].sort((left, right) => left.repository_path.localeCompare(right.repository_path)),
  requests,
  unregistered_png_files: unregistered,
  duplicate_png_contents: duplicateContents,
  errors,
  warnings,
};

if (args.includes('--write-report')) {
  const escape = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
  const markdown = [
    '# Audit des fichiers de production — Half Life Resonance', '',
    `Exécuté le ${report.audited_at}. Résultat : **${report.status === 'passed' ? 'réussi' : 'échec'}**.`, '',
    'Le comptage porte sur les fichiers présents dans le dépôt au moment du contrôle. Les déclarations des anciennes conversations ne créent aucune entrée ni aucun fichier.', '',
    '| Mesure | Nombre |', '|---|---:|',
    ...Object.entries(counts).map(([key, value]) => `| ${key} | ${value} |`), '',
    '## Portée du contrôle', '',
    'Présence, SHA-256, taille et en-tête PNG sont vérifiés. Le script ne décode pas les pixels et ne valide ni la qualité de transparence, ni la fidélité 1:1, ni une animation complète, ni l’intégration en jeu. Les valeurs de certification restent des déclarations du registre.', '',
    '## Fichiers présents', '',
    '| Fichier | Dimensions | Octets | Recensé |', '|---|---|---:|---|',
    ...report.files.map(file => `| ${escape(file.repository_path)} | ${file.width ?? '?'} × ${file.height ?? '?'} | ${file.byte_size} | ${referencedPaths.has(file.repository_path) ? 'oui' : 'non'} |`), '',
    '## Erreurs', '',
    ...(errors.length ? errors.map(error => `- **${error.code}** : ${escape(error.asset_id ?? error.repository_path ?? '')} — ${escape(error.message)}`) : ['Aucune.']), '',
    '## Avertissements', '',
    ...(warnings.length ? warnings.map(warning => `- **${warning.code}** : ${escape(warning.asset_id ?? warning.repository_path ?? warning.field ?? '')} — ${escape(warning.message)}`) : ['Aucun.']), '',
    'Les empreintes complètes, demandes non produites, valeurs déclarées et éventuels contenus identiques figurent dans `asset_audit.json`.', '',
  ].join('\n');
  mkdirSync(reportDirectory, { recursive: true });
  writeFileSync(resolve(reportDirectory, 'asset_audit.json'), `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(resolve(reportDirectory, 'asset_audit.md'), markdown);
}

console.log(JSON.stringify({ status: report.status, ...counts, errors: errors.length, warnings: warnings.length, report_written: args.includes('--write-report') }));
for (const error of errors.slice(0, 12)) console.error(`FAIL ${error.code}: ${error.asset_id ?? error.repository_path ?? ''} ${error.message}`);
if (errors.length > 12) console.error(`... ${errors.length - 12} additional errors; use --write-report for the full audit.`);
if (errors.length) process.exitCode = 1;
