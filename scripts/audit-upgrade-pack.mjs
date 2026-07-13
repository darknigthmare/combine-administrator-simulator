import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const candidates = [root, path.join(root, 'combine-lore-upgrade')];
const packRoot = candidates.find((candidate) => fs.existsSync(path.join(candidate, 'src', 'App.tsx'))) ?? root;

const required = [
  'src/App.tsx',
  'src/index.css',
  'src/types/game.ts',
  'src/data/index.ts',
  'src/data/systemAudit.ts',
  'src/data/onboarding.ts',
  'src/data/newGameIntake.ts',
  'src/data/uxPolish.ts',
  'src/systems/systemAuditSystem.ts',
  'src/components/SystemAuditScreen.tsx',
  'src/components/NewGameIntakeScreen.tsx',
  'src/components/UxPolishScreen.tsx',
  'src/components/TauriPackagingScreen.tsx',
  'src/data/tauriPackaging.ts',
  'src/systems/tauriPackagingSystem.ts',
  'scripts/coan-tauri-packaging-audit.mjs',
  'scripts/coan-release-notes.mjs',
  'scripts/coan-tauri-build-windows.ps1',
  'scripts/coan-tauri-build-windows.cmd',
  'src-tauri/tauri.windows-offline.conf.json',
  'src-tauri/tauri.release.conf.json',
  'src/components/DedicatedScreens.tsx',
  'src/components/SaveManagerScreen.tsx',
  'src/components/DecisionHistoryScreen.tsx',
  'src/components/LoreCodexScreen.tsx',
  'src/data/xenEcosystem.ts',
  'src/data/xenMutationChains.ts',
  'src/data/xenResearch.ts',
  'src/data/xenCatastrophes.ts',
  'src/data/finalChronicle.ts',
  'src/systems/finalVerdictSystem.ts',
  'src/systems/finalChronicleSystem.ts',
  'src/systems/onboardingSystem.ts',
  'src/systems/newGameIntakeSystem.ts',
  'src/systems/uxPolishSystem.ts',
  'src/systems/dailyOrderSystem.ts',
  'src/components/MainMenuScreen.tsx',
  'src-tauri/tauri.conf.json',
  'src-tauri/Cargo.toml',
  'package.tauri.patch.json',
  'scripts/apply-tauri-package-patch.mjs',
  'scripts/coan-new-game-audit.mjs',
  'scripts/coan-ux-polish-audit.mjs',
];

const readmeExpected = Array.from({ length: 45 }, (_, index) => `README_STEP${index + 1}`);
const existingFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else existingFiles.push(path.relative(packRoot, full).replaceAll('\\', '/'));
  }
}
walk(packRoot);

const missing = required.filter((file) => !fs.existsSync(path.join(packRoot, file)));
const readmeMissing = readmeExpected.filter((prefix) => !existingFiles.some((file) => path.basename(file).startsWith(prefix)));
const tsFiles = existingFiles.filter((file) => file.endsWith('.ts') || file.endsWith('.tsx'));
const dataFiles = existingFiles.filter((file) => file.startsWith('src/data/') && file.endsWith('.ts'));
const systemFiles = existingFiles.filter((file) => file.startsWith('src/systems/') && file.endsWith('.ts'));
const componentFiles = existingFiles.filter((file) => file.startsWith('src/components/') && file.endsWith('.tsx'));
const readmes = existingFiles.filter((file) => path.basename(file).startsWith('README_STEP'));

const app = fs.readFileSync(path.join(packRoot, 'src/App.tsx'), 'utf8');
const playerFlowOk = app.includes("game.tab === 'main_menu'") && app.includes('MainMenuScreen') && app.includes("game.tab === 'onboarding'") && app.includes('OnboardingScreen') && app.includes("game.tab === 'new_game'") && app.includes('NewGameIntakeScreen') && app.includes("game.tab === 'command_deck_v2'") && app.includes('UiuxV2CommandDeck');
const internalToolsHidden = !app.includes("game.tab === 'system_audit'") && !app.includes("game.tab === 'ux_polish'") && !app.includes("game.tab === 'tauri_packaging'") && !app.includes("game.tab === 'gameplay_balance'");
const tauriOk = fs.existsSync(path.join(packRoot, 'src-tauri/tauri.conf.json'));
const index = fs.readFileSync(path.join(packRoot, 'src/data/index.ts'), 'utf8');
const systemAuditExported = index.includes('./systemAudit');
const newGameExported = index.includes('./newGameIntake');
const uxPolishExported = index.includes('./uxPolish');
const tauriPackagingExported = index.includes('./tauriPackaging');

const report = {
  packRoot,
  totals: {
    files: existingFiles.length,
    tsFiles: tsFiles.length,
    dataFiles: dataFiles.length,
    systemFiles: systemFiles.length,
    componentFiles: componentFiles.length,
    readmes: readmes.length,
  },
  checks: {
    requiredFiles: missing.length === 0,
    readmeCoverage: readmeMissing.length === 0,
    playerFlowWired: playerFlowOk,
    internalToolsHidden,
    systemAuditDataExported: systemAuditExported,
    newGameIntakeExported: newGameExported,
    uxPolishExported,
    tauriPackagingExported,
    tauriScaffoldPresent: tauriOk,
  },
  missing,
  readmeMissing,
};

console.log(JSON.stringify(report, null, 2));

if (missing.length || readmeMissing.length || !playerFlowOk || !internalToolsHidden || !systemAuditExported || !newGameExported || !uxPolishExported || !tauriPackagingExported || !tauriOk) {
  process.exit(1);
}
