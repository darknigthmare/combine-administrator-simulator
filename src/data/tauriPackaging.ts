import type { TabId } from '../types/game';

export type TauriPackagingCheckStatus = 'ok' | 'watch' | 'blocked';
export type TauriPackagingCategory = 'config' | 'metadata' | 'icons' | 'scripts' | 'workflow' | 'windows' | 'release';

export type TauriPackagingChecklistItem = {
  id: string;
  category: TauriPackagingCategory;
  label: string;
  expected: string;
  remediation: string;
  severity: 1 | 2 | 3 | 4 | 5;
  relatedTab?: TabId;
};

export type TauriArtifactTarget = {
  id: string;
  label: string;
  path: string;
  note: string;
  preferredFor: string;
};

export type TauriReleaseChannel = {
  id: 'local' | 'qa' | 'private_release' | 'archive';
  label: string;
  versionSuffix: string;
  intent: string;
  guardrails: string[];
};

export type TauriBuildCommand = {
  id: string;
  label: string;
  command: string;
  purpose: string;
  platform: 'all' | 'windows';
};

export const tauriPackagingVersion = 'COAN-TAURI-PACKAGING-46';

export const tauriAppMetadata = {
  productName: 'Combine Administrator Simulator',
  identifier: 'com.darknigthmare.combine-administrator-simulator',
  version: '0.46.0',
  windowTitle: 'Combine Administrator Simulator',
  category: 'Game',
  shortDescription: 'Private Combine administration simulator',
  longDescription: 'Private fan-made strategic administration terminal for managing a Combine occupied city simulation.',
};

export const tauriArtifactTargets: TauriArtifactTarget[] = [
  {
    id: 'portable-exe',
    label: 'Executable Windows direct',
    path: 'src-tauri/target/release/combine-administrator-simulator.exe',
    note: 'Binaire direct généré par Cargo/Tauri. Pratique pour test local après build.',
    preferredFor: 'QA rapide sur la machine de build',
  },
  {
    id: 'nsis-setup',
    label: 'Installateur NSIS',
    path: 'src-tauri/target/release/bundle/nsis/*-setup.exe',
    note: 'Installateur setup Windows lisible pour distribution privée.',
    preferredFor: 'Partage privé simple',
  },
  {
    id: 'msi-installer',
    label: 'Installateur MSI',
    path: 'src-tauri/target/release/bundle/msi/*.msi',
    note: 'Installateur MSI Windows, utile pour archivage ou politiques système.',
    preferredFor: 'Installation propre / archive technique',
  },
  {
    id: 'release-notes',
    label: 'Release notes COAN',
    path: 'RELEASE_NOTES_COAN_DESKTOP.md',
    note: 'Notes de version générées par script avant release.',
    preferredFor: 'Joindre au ZIP/artefact GitHub Actions',
  },
];

export const tauriBuildCommands: TauriBuildCommand[] = [
  {
    id: 'patch-package',
    label: 'Appliquer scripts Tauri',
    command: 'node scripts/apply-tauri-package-patch.mjs',
    purpose: 'Ajoute/merge les scripts Tauri et audits COAN dans package.json.',
    platform: 'all',
  },
  {
    id: 'module-check',
    label: 'Contrôle modules',
    command: 'npm run check:modules',
    purpose: 'Vérifie TypeScript pour src/types, src/data et src/systems.',
    platform: 'all',
  },
  {
    id: 'tauri-audit',
    label: 'Audit packaging',
    command: 'npm run audit:tauri',
    purpose: 'Vérifie config Tauri, versions, icônes, workflow et scripts Windows.',
    platform: 'all',
  },
  {
    id: 'release-notes',
    label: 'Générer release notes',
    command: 'npm run release:notes',
    purpose: 'Produit RELEASE_NOTES_COAN_DESKTOP.md avec chemins de sortie et checklist.',
    platform: 'all',
  },
  {
    id: 'dev-desktop',
    label: 'Desktop dev',
    command: 'npm run tauri:dev',
    purpose: 'Lance Vite + shell Tauri pour tester la fenêtre desktop.',
    platform: 'all',
  },
  {
    id: 'win-package',
    label: 'Build Windows complet',
    command: 'npm run package:windows',
    purpose: 'Script PowerShell QA + build + listing des artefacts Windows.',
    platform: 'windows',
  },
  {
    id: 'tauri-build',
    label: 'Build Tauri standard',
    command: 'npm run tauri:build',
    purpose: 'Produit le binaire et les bundles activés dans tauri.conf.json.',
    platform: 'all',
  },
];

export const tauriPackagingChecklist: TauriPackagingChecklistItem[] = [
  {
    id: 'metadata-version',
    category: 'metadata',
    label: 'Version synchronisée',
    expected: 'package.json, src-tauri/tauri.conf.json et src-tauri/Cargo.toml utilisent la même version 0.46.0.',
    remediation: 'Modifier les deux fichiers en même temps avant chaque release.',
    severity: 5,
    relatedTab: 'tauri_packaging',
  },
  {
    id: 'bundle-targets',
    category: 'windows',
    label: 'Bundles Windows actifs',
    expected: 'Les targets nsis et msi sont activées dans bundle.targets.',
    remediation: 'Garder nsis pour setup.exe et msi pour installateur Windows classique.',
    severity: 5,
    relatedTab: 'tauri_packaging',
  },
  {
    id: 'frontend-dist',
    category: 'config',
    label: 'Frontend Vite connecté',
    expected: 'frontendDist pointe vers ../dist et beforeBuildCommand exécute npm run build.',
    remediation: 'Ne pas déplacer dist sans mettre à jour tauri.conf.json.',
    severity: 4,
    relatedTab: 'system_audit',
  },
  {
    id: 'icons-present',
    category: 'icons',
    label: 'Icônes desktop présentes',
    expected: '32x32, 128x128, 128x128@2x et icon.ico existent dans src-tauri/icons.',
    remediation: 'Régénérer les icônes Tauri depuis une image source si elles sont remplacées.',
    severity: 4,
    relatedTab: 'ux_polish',
  },
  {
    id: 'workflow-windows',
    category: 'workflow',
    label: 'Workflow Windows GitHub Actions',
    expected: 'Le workflow applique le patch package, audite Tauri, build puis upload NSIS/MSI.',
    remediation: 'Lancer workflow_dispatch ou tag v* pour tester la chaîne.',
    severity: 4,
    relatedTab: 'tauri_packaging',
  },
  {
    id: 'audit-scripts',
    category: 'scripts',
    label: 'Scripts QA packaging',
    expected: 'audit:tauri, release:notes et package:windows sont disponibles après patch.',
    remediation: 'Relancer node scripts/apply-tauri-package-patch.mjs après mise à jour.',
    severity: 4,
    relatedTab: 'tauri_packaging',
  },
  {
    id: 'offline-webview-config',
    category: 'windows',
    label: 'Config offline WebView2 disponible',
    expected: 'Une config src-tauri/tauri.windows-offline.conf.json existe pour builds privés sans téléchargement WebView2.',
    remediation: 'Utiliser npm run tauri:build -- --config src-tauri/tauri.windows-offline.conf.json si nécessaire.',
    severity: 3,
    relatedTab: 'tauri_packaging',
  },
  {
    id: 'release-notes',
    category: 'release',
    label: 'Release notes générables',
    expected: 'npm run release:notes produit un markdown joignable au build.',
    remediation: 'Générer les notes avant chaque upload ou release GitHub.',
    severity: 3,
    relatedTab: 'archives',
  },
];

export const tauriReleaseChannels: TauriReleaseChannel[] = [
  {
    id: 'local',
    label: 'Local dev',
    versionSuffix: 'dev',
    intent: 'Tester la fenêtre Tauri et les modules COAN sans générer de bundle final.',
    guardrails: ['npm run tauri:dev', 'ne pas utiliser pour archive', 'logs console visibles'],
  },
  {
    id: 'qa',
    label: 'QA privée',
    versionSuffix: 'qa',
    intent: 'Vérifier sauvegardes, navigation, Tauri, audio/visuel et parties longues avant release.',
    guardrails: ['npm run audit:tauri', 'npm run check:modules', 'tester une nouvelle partie + chargement slot'],
  },
  {
    id: 'private_release',
    label: 'Release privée',
    versionSuffix: 'stable',
    intent: 'Build Windows propre à conserver ou installer localement.',
    guardrails: ['générer release notes', 'conserver setup.exe + msi', 'ne pas inclure assets officiels protégés'],
  },
  {
    id: 'archive',
    label: 'Archive COAN',
    versionSuffix: 'archive',
    intent: 'Conserver un état complet du simulateur avec notes, audit et checksum manuel.',
    guardrails: ['joindre COAN_FINAL_AUDIT_REPORT.md', 'joindre RELEASE_NOTES_COAN_DESKTOP.md', 'tag Git recommandé'],
  },
];

export const tauriWindowsPrerequisites = [
  'Node.js + npm installés.',
  'Rust stable installé et disponible dans le terminal.',
  'Microsoft C++ Build Tools / Visual Studio Build Tools disponibles pour compiler la cible MSVC.',
  'WebView2 Runtime disponible sur la machine cible, ou build avec config offlineInstaller si distribution privée autonome.',
  'Lancer les commandes depuis la racine du dépôt, après application du package patch.',
];

export const tauriReleaseRunbook = [
  'node scripts/apply-tauri-package-patch.mjs',
  'npm install',
  'npm run check:modules',
  'npm run audit:coan',
  'npm run audit:tauri',
  'npm run release:notes',
  'npm run build',
  'npm run tauri:build',
  'vérifier src-tauri/target/release/bundle/nsis/*-setup.exe',
  'vérifier src-tauri/target/release/bundle/msi/*.msi',
];
