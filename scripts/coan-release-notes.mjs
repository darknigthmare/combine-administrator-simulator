import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const candidates = [root, path.join(root, 'combine-lore-upgrade')];
const packRoot = candidates.find((candidate) => fs.existsSync(path.join(candidate, 'src-tauri', 'tauri.conf.json'))) ?? root;
const tauri = JSON.parse(fs.readFileSync(path.join(packRoot, 'src-tauri/tauri.conf.json'), 'utf8'));

const readmes = fs.readdirSync(packRoot).filter((name) => /^README_STEP\d+/.test(name)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
const notes = [
  `# ${tauri.productName} — Desktop Release ${tauri.version}`,
  '',
  '## Résumé',
  'Build privé desktop Tauri de Combine Administrator Simulator avec les modules COAN cumulés.',
  '',
  '## Contenu majeur',
  '- Terminaux spécialisés City / Nova / Citadel / Quarantine.',
  '- Simulation complète : rations, population, CP, informateurs, Lambda, Xen, Nova Prospekt, Vortigaunts, directives, technologies.',
  '- Campagnes, objectifs, événements majeurs, verdict enrichi et chronique finale.',
  '- Audio synthétique, archives vidéo, fenêtres flottantes COAN OS.',
  '- Sauvegardes multi-slots, import/export JSON, historique décisions, codex lore.',
  '- Packaging Windows Tauri NSIS/MSI avec audit COAN.',
  '',
  '## Artefacts attendus',
  '- `src-tauri/target/release/combine-administrator-simulator.exe`',
  '- `src-tauri/target/release/bundle/nsis/*-setup.exe`',
  '- `src-tauri/target/release/bundle/msi/*.msi`',
  '',
  '## Commandes QA recommandées',
  '```bash',
  'node scripts/apply-tauri-package-patch.mjs',
  'npm install',
  'npm run check:modules',
  'npm run audit:coan',
  'npm run audit:tauri',
  'npm run build',
  'npm run tauri:build',
  '```',
  '',
  '## Readmes inclus dans le pack',
  ...readmes.map((name) => `- ${name}`),
  '',
  '## Note privée',
  'Application fan-made privée. Ne pas bundler d’assets officiels protégés.',
  '',
];

const outPath = path.join(packRoot, 'RELEASE_NOTES_COAN_DESKTOP.md');
fs.writeFileSync(outPath, notes.join('\n'), 'utf8');
console.log(JSON.stringify({ ok: true, outPath, version: tauri.version }, null, 2));
