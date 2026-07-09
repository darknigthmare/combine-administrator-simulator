#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const candidates = [root, path.join(root, 'combine-lore-upgrade')];
const packRoot = candidates.find((candidate) => existsSync(path.join(candidate, 'src', 'App.tsx'))) ?? root;
const required = [
  'src/data/onboarding.ts',
  'src/systems/onboardingSystem.ts',
  'src/components/OnboardingScreen.tsx',
  'README_STEP42_PREMIUM_ONBOARDING.md',
];

const missing = required.filter((file) => !existsSync(path.join(packRoot, file)));
const app = existsSync(path.join(packRoot, 'src/App.tsx')) ? readFileSync(path.join(packRoot, 'src/App.tsx'), 'utf8') : '';
const types = existsSync(path.join(packRoot, 'src/types/game.ts')) ? readFileSync(path.join(packRoot, 'src/types/game.ts'), 'utf8') : '';
const data = existsSync(path.join(packRoot, 'src/data/index.ts')) ? readFileSync(path.join(packRoot, 'src/data/index.ts'), 'utf8') : '';
const terminals = existsSync(path.join(packRoot, 'src/data/terminalInterfaces.ts')) ? readFileSync(path.join(packRoot, 'src/data/terminalInterfaces.ts'), 'utf8') : '';

const checks = [
  ['required files', missing.length === 0, missing.join(', ') || 'all present'],
  ['tab typed', types.includes("'onboarding'") && types.includes('OnboardingState'), 'TabId + GameState onboarding state'],
  ['app wired', app.includes('OnboardingScreen') && app.includes("game.tab === 'onboarding'"), 'App import/render branch'],
  ['data exported', data.includes('./onboarding'), 'data barrel export'],
  ['terminal navigation', terminals.includes("'onboarding'") && app.includes('Tutoriel COAN'), 'City Terminal + nav label'],
  ['guided start', app.includes('startGuidedOnboarding') && app.includes('resolveOnboardingFirstDay'), 'guided new game + first day script'],
];

let ok = true;
console.log('COAN ONBOARDING AUDIT');
for (const [label, pass, detail] of checks) {
  ok &&= pass;
  console.log(`${pass ? 'OK ' : 'ERR'} ${label} — ${detail}`);
}

if (!ok) process.exit(1);
