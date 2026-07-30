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
  'Build desktop Tauri du jeu de gestion Combine Administrator Simulator.',
  '',
  '## Contenu majeur',
  '- Terminaux spécialisés City / Nova / Citadel / Quarantine.',
  '- Simulation complète : rations, population, CP, informateurs, Lambda, Xen, Nova Prospekt, Vortigaunts, directives, technologies.',
  '- Campagnes, objectifs, événements majeurs, verdict enrichi et chronique finale.',
  '- Audio synthétique, archives vidéo, fenêtres flottantes COAN OS.',
  '- Sauvegardes multi-slots, import/export JSON, historique décisions, codex lore.',
  '- Packaging Windows Tauri NSIS/MSI avec audit COAN.',
  '',
  '## Améliorations de cette version',
  '- Menu hors-session avec réglages audio, accessibilité, crédits et mentions.',
  '- Musique originale adaptative avec mix séparé pour musique et effets.',
  '- Création mobile compacte, prologue borné et tutoriel relié à la première journée.',
  '- Sauvegardes et Codex reformulés en interfaces joueur, sans jargon de développement.',
  '- Réquisitions filtrables, vues compacte/détaillée et densité d’information progressive.',
  '- Matrice pré-release : 252 configurations, 12 verdicts et simulation longue.',
  '- Équilibrage du premier mandat et des secteurs Lambda recalibré.',
  '- Versions frontend, Tauri et Cargo synchronisées.',
  '',
  '## Artefacts attendus',
  '- `src-tauri/target/release/combine-administrator-simulator.exe`',
  '- `src-tauri/target/release/bundle/nsis/*-setup.exe`',
  '- `src-tauri/target/release/bundle/msi/*.msi`',
  '',
  '## Commandes QA recommandées',
  '```bash',
  'npm ci',
  'npm run quality',
  'npm run audit:all',
  'npm run tauri:build',
  '```',
  '',
  '## Readmes inclus dans le pack',
  ...readmes.map((name) => `- ${name}`),
  '',
  '## Statut',
  'Fangame non commercial et non officiel. Aucun asset audio propriétaire de Half-Life n’est inclus.',
  '',
];

const outPath = path.join(packRoot, 'RELEASE_NOTES_COAN_DESKTOP.md');
fs.writeFileSync(outPath, notes.join('\n'), 'utf8');
console.log(JSON.stringify({ ok: true, outPath, version: tauri.version }, null, 2));
