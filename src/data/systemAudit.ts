import type { TabId } from '../types/game';

export type SystemAuditSeverity = 'ok' | 'watch' | 'critical';

export type SystemAuditChecklistItem = {
  id: string;
  category: 'architecture' | 'simulation' | 'lore' | 'interface' | 'persistence' | 'desktop';
  label: string;
  expected: string;
  relatedTab?: TabId;
};

export const finalAuditVersion = 'COAN-AUDIT-45';

export const finalAuditChecklist: SystemAuditChecklistItem[] = [
  { id: 'new-game-intake', category: 'interface', label: 'Écran Nouvelle Partie premium', expected: 'Intake complet avec doctrines de départ, preview de pression, piste tutoriel et démarrage standard/guidé.', relatedTab: 'new_game' },
  { id: 'ux-polish', category: 'interface', label: 'Polish UX premium / Tauri', expected: 'Quick routes, tooltips lore, états vides, densité desktop et audit UX sont disponibles.', relatedTab: 'ux_polish' },
  { id: 'onboarding', category: 'interface', label: 'Tutoriel COAN premium', expected: 'Briefing interactif, pistes guidées, première journée scriptée et onboarding depuis le City Terminal.', relatedTab: 'onboarding' },
  { id: 'data-refactor', category: 'architecture', label: 'Données lore séparées du shell React', expected: 'src/data et src/types contiennent les datasets/modules au lieu de blocs inline dans App.tsx.', relatedTab: 'codex' },
  { id: 'connected-map', category: 'simulation', label: 'Carte stratégique connectée', expected: 'Les secteurs sont reliés par routes, canaux, égouts, rail et accès Citadel.', relatedTab: 'sectors' },
  { id: 'propagation', category: 'simulation', label: 'Propagation Lambda/Xen par réseau', expected: 'La Résistance et Xen utilisent les connexions sectorielles, pas un hasard global.', relatedTab: 'sectors' },
  { id: 'reports', category: 'simulation', label: 'Rapports falsifiables', expected: 'Dossier réel et transmission Citadel divergent avec risque Advisor.', relatedTab: 'reports' },
  { id: 'nova', category: 'lore', label: 'Nova Prospekt comme lieu séparé', expected: 'Terminal, politiques, opérations et logs propres au complexe externe.', relatedTab: 'nova' },
  { id: 'timeline', category: 'lore', label: 'Timelines Half-Life', expected: 'Époques jouables de la Guerre de Sept Heures à l’Uprising.', relatedTab: 'timeline' },
  { id: 'ration-population', category: 'simulation', label: 'Rations + population détaillée', expected: 'Faim, marché noir, groupes sociaux et registre civil influencent Lambda/CP.', relatedTab: 'rationing' },
  { id: 'cp-informants', category: 'simulation', label: 'Civil Protection vivante', expected: 'Corruption, brutalité, informateurs, fausses dénonciations et agents compromis.', relatedTab: 'civil_protection' },
  { id: 'citadel-tech', category: 'simulation', label: 'Directives + technologies Combine', expected: 'Branches Citadel et R&D modifient durablement la ville.', relatedTab: 'citadel' },
  { id: 'resistance-factions', category: 'lore', label: 'Résistance Lambda avancée', expected: 'Cellules, factions, Vortigaunts libres, routes et opérations simultanées.', relatedTab: 'resistance' },
  { id: 'xen-biosphere', category: 'lore', label: 'Xen comme biosphère dynamique', expected: 'Écosystème, mutations, quarantaines, R&D et catastrophes rares.', relatedTab: 'xen' },
  { id: 'campaigns', category: 'simulation', label: 'Campagnes longues et objectifs', expected: 'Campagnes, objectifs multiples, événements majeurs, verdict final et chronique.', relatedTab: 'campaigns' },
  { id: 'terminal-ui', category: 'interface', label: 'Terminaux spécialisés COAN', expected: 'City, Nova, Citadel et Quarantine Terminal filtrent navigation et ambiance.', relatedTab: 'dashboard' },
  { id: 'floating-os', category: 'interface', label: 'Fenêtres flottantes COAN OS', expected: 'Les dossiers critiques sont consultables en surcouche.', relatedTab: 'dashboard' },
  { id: 'audio-video', category: 'interface', label: 'Audio synthétique + archives vidéo', expected: 'Cues Web Audio et faux flux de surveillance sans assets officiels.', relatedTab: 'video_archives' },
  { id: 'save-history', category: 'persistence', label: 'Sauvegardes et historique', expected: 'Slots, import/export JSON, autosave et ledger de décisions.', relatedTab: 'save_system' },
  { id: 'codex-difficulty', category: 'lore', label: 'Codex et difficulté avancée', expected: 'Codex interne et scalaires de difficulté auditables.', relatedTab: 'codex' },
  { id: 'gameplay-balance', category: 'simulation', label: 'Équilibrage gameplay et QA longues parties', expected: 'Le module Équilibrage calcule les pressions Lambda/Xen/Citadel, la dette morale et les scénarios de playtest.', relatedTab: 'gameplay_balance' },
  { id: 'tauri', category: 'desktop', label: 'Préparation EXE Tauri', expected: 'src-tauri, scripts package patch et workflow Windows sont présents.', relatedTab: 'save_system' },
  { id: 'tauri-packaging-qa', category: 'desktop', label: 'QA packaging Windows Tauri', expected: 'Écran Packaging EXE, audit Tauri, release notes, scripts PowerShell et configs WebView2 sont présents.', relatedTab: 'tauri_packaging' },
];

export const finalAuditRequiredFiles = [
  'src/App.tsx',
  'src/types/game.ts',
  'src/data/index.ts',
  'src/components/DedicatedScreens.tsx',
  'src/components/AtmosphereLayer.tsx',
  'src/components/FloatingWindowLayer.tsx',
  'src/components/SaveManagerScreen.tsx',
  'src/components/DecisionHistoryScreen.tsx',
  'src/components/LoreCodexScreen.tsx',
  'src/components/DifficultySettingsScreen.tsx',
  'src/components/GameplayBalanceScreen.tsx',
  'src/components/OnboardingScreen.tsx',
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
  'src/data/onboarding.ts',
  'src/data/newGameIntake.ts',
  'src/data/uxPolish.ts',
  'src/data/citySectors.ts',
  'src/data/novaProspekt.ts',
  'src/data/resistanceNetwork.ts',
  'src/data/xenEcosystem.ts',
  'src/data/finalChronicle.ts',
  'src/systems/propagationSimulation.ts',
  'src/systems/reportFalsification.ts',
  'src/systems/novaProspektSystem.ts',
  'src/systems/xenEcosystemSystem.ts',
  'src/systems/finalVerdictSystem.ts',
  'src/systems/finalChronicleSystem.ts',
  'src/systems/gameplayBalanceSystem.ts',
  'src/systems/onboardingSystem.ts',
  'src/systems/newGameIntakeSystem.ts',
  'src/systems/uxPolishSystem.ts',
  'src-tauri/tauri.conf.json',
  'src-tauri/Cargo.toml',
  'scripts/apply-tauri-package-patch.mjs',
  'package.tauri.patch.json',
] as const;

export const finalAuditRunbook = [
  'cp -r combine-lore-upgrade/src/* ./src/',
  'cp -r combine-lore-upgrade/src-tauri ./src-tauri',
  'cp combine-lore-upgrade/package.tauri.patch.json ./',
  'cp -r combine-lore-upgrade/scripts ./scripts',
  'node scripts/apply-tauri-package-patch.mjs',
  'npm install',
  'npm run audit:onboarding',
  'npm run audit:newgame',
  'npm run audit:ux',
  'npm run audit:tauri',
  'npm run release:notes',
  'npm run dev',
  'npm run build',
  'npm run package:windows',
];
