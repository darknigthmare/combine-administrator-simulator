#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'src/data/gameplayBalance.ts',
  'src/systems/gameplayBalanceSystem.ts',
  'src/components/GameplayBalanceScreen.tsx',
  'src/systems/dailyOrderSystem.ts',
  'README_STEP41_GAMEPLAY_BALANCE_QA.md',
];

const missing = required.filter((file) => !existsSync(path.join(root, file)));
const app = existsSync(path.join(root, 'src/App.tsx')) ? readFileSync(path.join(root, 'src/App.tsx'), 'utf8') : '';
const types = existsSync(path.join(root, 'src/types/game.ts')) ? readFileSync(path.join(root, 'src/types/game.ts'), 'utf8') : '';
const data = existsSync(path.join(root, 'src/data/index.ts')) ? readFileSync(path.join(root, 'src/data/index.ts'), 'utf8') : '';

const checks = [
  ['required files', missing.length === 0, missing.join(', ') || 'all present'],
  ['legacy tab typed', types.includes("'gameplay_balance'"), 'save compatibility'],
  ['data exported', data.includes("./gameplayBalance"), 'data barrel export'],
  ['internal tool hidden', !app.includes("game.tab === 'gameplay_balance'") && !app.includes("import { GameplayBalanceScreen"), 'absent from player runtime'],
  ['long-run controls', app.includes('createDailyOrderState') && app.includes('capDailySimulationDrift') && app.includes('catastrophicEndingRatio'), 'orders, drift cap, proportional endings'],
  ['terminal navigation clean', !app.includes("['gameplay_balance', 'Équilibrage']"), 'no QA route in player nav'],
];

let ok = true;
console.log('COAN BALANCE AUDIT');
for (const [label, pass, detail] of checks) {
  ok &&= pass;
  console.log(`${pass ? 'OK ' : 'ERR'} ${label} — ${detail}`);
}

if (!ok) process.exit(1);
