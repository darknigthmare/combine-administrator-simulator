import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const candidates = [root, path.join(root, 'combine-lore-upgrade')];
const packRoot = candidates.find((candidate) => fs.existsSync(path.join(candidate, 'src', 'App.tsx'))) ?? root;

const required = [
  'src/data/uxPolish.ts',
  'src/systems/uxPolishSystem.ts',
  'src/components/UxPolishScreen.tsx',
  'src/App.tsx',
  'src/index.css',
  'README_STEP44_UX_POLISH_TAURI.md',
];

const missing = required.filter((file) => !fs.existsSync(path.join(packRoot, file)));
const app = fs.readFileSync(path.join(packRoot, 'src/App.tsx'), 'utf8');
const css = fs.readFileSync(path.join(packRoot, 'src/index.css'), 'utf8');
const index = fs.readFileSync(path.join(packRoot, 'src/data/index.ts'), 'utf8');
const types = fs.readFileSync(path.join(packRoot, 'src/types/game.ts'), 'utf8');
const terminal = fs.readFileSync(path.join(packRoot, 'src/data/terminalInterfaces.ts'), 'utf8');

const checks = {
  requiredFiles: missing.length === 0,
  tabTypePresent: types.includes("'ux_polish'"),
  internalScreenHidden: !app.includes("game.tab === 'ux_polish'") && !app.includes("import { UxPolishScreen"),
  commandStripPresent: app.includes('ux-command-strip') && app.includes('buildUxPolishReport'),
  dataExported: index.includes('./uxPolish'),
  terminalRouteHidden: !terminal.includes("'ux_polish'"),
  cssPresent: css.includes('ux-command-strip') && css.includes('prefers-reduced-motion'),
};

const report = { packRoot, checks, missing };
console.log(JSON.stringify(report, null, 2));

if (Object.values(checks).some((ok) => !ok)) {
  process.exit(1);
}
