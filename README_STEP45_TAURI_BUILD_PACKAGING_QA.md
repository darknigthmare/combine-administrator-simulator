# Étape 45 — QA build Tauri / packaging Windows

Cette étape ajoute une couche complète de QA desktop pour générer une version Windows privée de **Combine Administrator Simulator** avec Tauri.

## Objectif

Transformer la préparation Tauri ajoutée précédemment en vrai pipeline de build contrôlable :

- écran `Packaging EXE` dans l'app ;
- audit config Tauri/Cargo/package patch ;
- scripts Windows PowerShell/CMD ;
- release notes générables ;
- workflow GitHub Actions renforcé ;
- configs WebView2 standard et offline ;
- chemins d'artefacts documentés.

## Fichiers ajoutés

```text
src/data/tauriPackaging.ts
src/systems/tauriPackagingSystem.ts
src/components/TauriPackagingScreen.tsx
scripts/coan-tauri-packaging-audit.mjs
scripts/coan-release-notes.mjs
scripts/coan-tauri-build-windows.ps1
scripts/coan-tauri-build-windows.cmd
src-tauri/tauri.windows-offline.conf.json
src-tauri/tauri.release.conf.json
README_STEP45_TAURI_BUILD_PACKAGING_QA.md
```

## Fichiers modifiés

```text
src/App.tsx
src/types/game.ts
src/data/index.ts
src/data/terminalInterfaces.ts
src/data/systemAudit.ts
src/index.css
src-tauri/tauri.conf.json
src-tauri/Cargo.toml
.github/workflows/tauri-windows.yml
package.tauri.patch.json
scripts/audit-upgrade-pack.mjs
COAN_FINAL_AUDIT_REPORT.md
```

## Nouvelle interface

Onglet ajouté :

```text
Packaging EXE
```

Il affiche :

- readiness packaging ;
- risque release ;
- runbook Windows ;
- prérequis machine ;
- chemins attendus des artefacts ;
- commandes copiables ;
- checklist Tauri ;
- canaux de release privée ;
- preview release notes.

## Commandes recommandées

```bash
node scripts/apply-tauri-package-patch.mjs
npm install
npm run check:modules
npm run audit:coan
npm run audit:tauri
npm run release:notes
npm run dev
```

## Build Tauri

Mode développement desktop :

```bash
npm run tauri:dev
```

Build standard :

```bash
npm run tauri:build
```

Build Windows guidé avec QA :

```bash
npm run package:windows
```

Build Windows avec overlay WebView2 offline :

```bash
npm run package:windows:offline
```

## Artefacts attendus

```text
src-tauri/target/release/combine-administrator-simulator.exe
src-tauri/target/release/bundle/nsis/*-setup.exe
src-tauri/target/release/bundle/msi/*.msi
RELEASE_NOTES_COAN_DESKTOP.md
```

## Workflow GitHub Actions

Le workflow `.github/workflows/tauri-windows.yml` :

1. checkout ;
2. installe Node 22 ;
3. installe Rust stable ;
4. applique `package.tauri.patch.json` ;
5. installe les dépendances ;
6. lance les audits ;
7. génère les release notes ;
8. build Tauri ;
9. upload exe/nsis/msi/release notes.

## Prérequis Windows

- Node.js/npm ;
- Rust stable ;
- Microsoft C++ Build Tools / Visual Studio Build Tools ;
- WebView2 Runtime sur la machine cible, ou config offline si distribution autonome ;
- build lancé depuis la racine du repo.

## Notes

- Aucun asset officiel Half-Life n'est ajouté.
- Les sons restent générés par Web Audio.
- Le pack est cumulatif avec les étapes précédentes.
