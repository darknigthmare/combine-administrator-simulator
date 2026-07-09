# Étape 33 — Terminaux spécialisés + build Tauri Windows

Cette passe ajoute deux axes :

1. **Interfaces spécialisées** : l'application n'a plus une seule peau de terminal. Elle route maintenant les modules dans quatre terminaux opérationnels.
2. **Préparation Tauri v2** : le pack contient un `src-tauri/` prêt à fusionner pour générer une application desktop Windows avec installateurs NSIS/MSI.

## Terminaux ajoutés

### City Terminal
Administration civique : dashboard, campagnes, timeline, secteurs, population, registre civil, informateurs, Civil Protection, rationnement, BreenCast, rapports, archives, atmosphère et codex.

### Nova Terminal
Détention et transfert : Nova Prospekt, Vortigaunts/Biotics, citoyens, informateurs, Civil Protection, rapports, archives et chronique finale.

### Citadel Terminal
Commandement supérieur : directives Citadel, technologies Combine, Overwatch, forces Combine, événements majeurs, verdict final, chronique, rapports et archives.

### Quarantine Terminal
Biosécurité : quarantaine Xen, recherche Xen, catastrophes Xen, Vortigaunts, secteurs, population, rapports, archives et codex.

Chaque terminal possède :

- vocabulaire propre ;
- classification propre ;
- peau visuelle propre ;
- navigation filtrée ;
- bannière de statut ;
- intégrité système ;
- risque opérationnel ;
- ligne d'avertissement COAN.

## Fichiers ajoutés

```text
src/data/terminalInterfaces.ts
src/systems/terminalInterfaceSystem.ts
src-tauri/Cargo.toml
src-tauri/build.rs
src-tauri/src/main.rs
src-tauri/src/lib.rs
src-tauri/tauri.conf.json
src-tauri/icons/32x32.png
src-tauri/icons/128x128.png
src-tauri/icons/128x128@2x.png
src-tauri/icons/icon.ico
package.tauri.patch.json
scripts/apply-tauri-package-patch.mjs
vite.config.tauri.example.ts
.github/workflows/tauri-windows.yml
README_STEP33_SPECIALIZED_TERMINALS_TAURI.md
```

## Fichiers modifiés

```text
src/App.tsx
src/data/index.ts
src/index.css
```

## Application du pack

Depuis la racine de ton dépôt :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp -r combine-lore-upgrade/src-tauri ./
cp -r combine-lore-upgrade/.github ./
cp combine-lore-upgrade/package.tauri.patch.json ./
mkdir -p scripts && cp combine-lore-upgrade/scripts/apply-tauri-package-patch.mjs ./scripts/
cp combine-lore-upgrade/vite.config.tauri.example.ts ./
cp combine-lore-upgrade/README_STEP33_SPECIALIZED_TERMINALS_TAURI.md ./
```

## Fusion `package.json`

Le fichier `package.tauri.patch.json` n'est pas censé remplacer ton `package.json`. Il indique quoi ajouter/fusionner :

```json
{
  "scripts": {
    "tauri": "tauri",
    "tauri:dev": "tauri dev",
    "tauri:build": "tauri build",
    "tauri:build:windows": "tauri build --target x86_64-pc-windows-msvc"
  },
  "devDependencies": {
    "@tauri-apps/cli": "^2.0.0"
  }
}
```

Si ton `package.json` a déjà `dev`, `build` et `preview`, garde-les. Tu peux appliquer le patch automatiquement avec :

```bash
node scripts/apply-tauri-package-patch.mjs
```

## Lancement desktop local

Prérequis Windows :

- Node.js ;
- Rust via rustup ;
- Microsoft C++ Build Tools avec “Desktop development with C++” ;
- WebView2 Runtime si ton Windows ne l'a pas déjà.

Puis :

```bash
npm install
npm run tauri:dev
```

## Générer l'exe/installateur Windows

Sur Windows :

```bash
npm run tauri:build
```

Sorties attendues :

```text
src-tauri/target/release/combine-administrator-simulator.exe
src-tauri/target/release/bundle/nsis/*-setup.exe
src-tauri/target/release/bundle/msi/*.msi
```

## GitHub Actions

Le workflow ajouté permet de générer les installateurs Windows depuis GitHub Actions :

```text
.github/workflows/tauri-windows.yml
```

Tu peux le lancer manuellement avec `workflow_dispatch` ou en poussant un tag `v*`.

## Note importante

Le pack ne contient pas un clone complet de ton repo : il contient le dossier `src/` modifié, le scaffold `src-tauri/`, le patch package et les README. Il faut donc l'appliquer sur ton dépôt existant.
