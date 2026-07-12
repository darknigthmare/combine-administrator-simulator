import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const app = read('src/App.tsx');
const types = read('src/types/game.ts');
const onboarding = read('src/components/OnboardingScreen.tsx');
const onboardingData = read('src/data/onboarding.ts');
const intake = read('src/components/NewGameIntakeScreen.tsx');
const campaign = read('src/components/DedicatedScreens.tsx');
const saves = read('src/components/SaveManagerScreen.tsx');
const terminals = read('src/data/terminalInterfaces.ts');

const fullNav = app.match(/const fullNav:[\s\S]*?;\r?\n/)?.[0] ?? '';
const checks = [
  ['prologue typed', types.includes("'new_game' | 'prologue' | 'onboarding'")],
  ['first launch opens intake', app.includes("tab: 'new_game'")],
  ['campaign launch opens prologue', app.includes("tab: 'prologue'")],
  ['prologue leads to tutorial', app.includes("continueToTutorial={() => setGame({ ...game, tab: 'onboarding' })}")],
  ['day transition mounted', app.includes('day-transition') && app.includes('setDayTransition')],
  ['campaign screen cannot restart', !campaign.includes('startCampaign: (campaignId: CampaignId)')],
  ['timeline is read only', !app.includes('setTimeline={(timeline) => setGame(createInitialGame')],
  ['tutorial cannot create a game', !onboarding.includes('startGuidedGame')],
  ['save manager has no new-game action', !saves.includes('openNewGame')],
  ['creation screen has no QA controls', !intake.includes('Combinaisons QA') && !intake.includes('newGameIntakeRecommendedCombos')],
  ['tutorial has no meta routes', !['gameplay_balance', 'tauri_packaging', 'ux_polish', 'system_audit'].some((tab) => onboardingData.includes(`'${tab}'`))],
  ['meta tabs absent from player nav', !['gameplay_balance', 'tauri_packaging', 'ux_polish', 'system_audit'].some((tab) => fullNav.includes(`'${tab}'`))],
  ['meta tabs absent from terminal menus', !['gameplay_balance', 'tauri_packaging', 'ux_polish', 'system_audit'].some((tab) => terminals.includes(`'${tab}'`))],
];

console.log('COAN SESSION FLOW AUDIT');
for (const [label, ok] of checks) console.log(`${ok ? 'OK ' : 'FAIL'} ${label}`);
const failed = checks.filter(([, ok]) => !ok);
if (failed.length) process.exitCode = 1;
