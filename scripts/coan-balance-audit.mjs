#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'src/data/gameplayBalance.ts',
  'src/systems/gameplayBalanceSystem.ts',
  'src/components/GameplayBalanceScreen.tsx',
  'README_STEP41_GAMEPLAY_BALANCE_QA.md',
];

const missing = required.filter((file) => !existsSync(path.join(root, file)));
const app = existsSync(path.join(root, 'src/App.tsx')) ? readFileSync(path.join(root, 'src/App.tsx'), 'utf8') : '';
const types = existsSync(path.join(root, 'src/types/game.ts')) ? readFileSync(path.join(root, 'src/types/game.ts'), 'utf8') : '';
const data = existsSync(path.join(root, 'src/data/index.ts')) ? readFileSync(path.join(root, 'src/data/index.ts'), 'utf8') : '';

const checks = [
  ['required files', missing.length === 0, missing.join(', ') || 'all present'],
  ['tab wired', types.includes("'gameplay_balance'") && app.includes("game.tab === 'gameplay_balance'"), 'TabId + render branch'],
  ['data exported', data.includes("./gameplayBalance"), 'data barrel export'],
  ['component imported', app.includes('GameplayBalanceScreen'), 'App import/render'],
  ['terminal navigation', app.includes('Équilibrage') || app.includes('gameplay_balance'), 'nav label present'],
];

let ok = true;
console.log('COAN BALANCE AUDIT');
for (const [label, pass, detail] of checks) {
  ok &&= pass;
  console.log(`${pass ? 'OK ' : 'ERR'} ${label} — ${detail}`);
}

if (!ok) process.exit(1);
