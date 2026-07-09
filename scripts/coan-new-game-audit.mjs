import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packRoot = fs.existsSync(path.join(root, 'combine-lore-upgrade', 'src')) ? path.join(root, 'combine-lore-upgrade') : root;
const required = [
  'src/data/newGameIntake.ts',
  'src/systems/newGameIntakeSystem.ts',
  'src/components/NewGameIntakeScreen.tsx',
  'src/types/game.ts',
  'src/App.tsx',
  'README_STEP43_PREMIUM_NEW_GAME_INTAKE.md',
];
const missing = required.filter((file) => !fs.existsSync(path.join(packRoot, file)));
const app = fs.existsSync(path.join(packRoot, 'src/App.tsx')) ? fs.readFileSync(path.join(packRoot, 'src/App.tsx'), 'utf8') : '';
const types = fs.existsSync(path.join(packRoot, 'src/types/game.ts')) ? fs.readFileSync(path.join(packRoot, 'src/types/game.ts'), 'utf8') : '';
const index = fs.existsSync(path.join(packRoot, 'src/data/index.ts')) ? fs.readFileSync(path.join(packRoot, 'src/data/index.ts'), 'utf8') : '';
const checks = {
  filesPresent: missing.length === 0,
  tabRegistered: types.includes("'new_game'") && app.includes("game.tab === 'new_game'"),
  componentWired: app.includes('NewGameIntakeScreen') && app.includes('applyNewGameDoctrine'),
  dataExported: index.includes('./newGameIntake'),
  auditScript: fs.existsSync(path.join(packRoot, 'scripts/coan-new-game-audit.mjs')),
};
const report = { packRoot, checks, missing };
console.log(JSON.stringify(report, null, 2));
if (missing.length || Object.values(checks).some((value) => !value)) process.exit(1);
