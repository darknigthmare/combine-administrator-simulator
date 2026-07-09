# STEP 36 — Système de sauvegardes multiples COAN

Cette passe ajoute un vrai module de sauvegardes locales à l'application Combine Administrator Simulator.

## Nouveaux fichiers

```text
src/data/saveSlots.ts
src/systems/saveSlotSystem.ts
src/components/SaveManagerScreen.tsx
README_STEP36_MULTI_SAVE_SYSTEM.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/data/terminalInterfaces.ts
src/App.tsx
src/index.css
```

## Nouvel onglet

```text
Sauvegardes
```

Il est disponible depuis le City Terminal et le Citadel Terminal.

## Fonctionnalités

- Autosave existante conservée via `combine-city-lore-upgrade`.
- 6 slots manuels COAN.
- Slot spécialisé pour : mandat principal, branche alternative, Nova Prospekt, quarantaine Xen, double jeu Lambda, archive finale.
- Export JSON de la session active.
- Export JSON d'un slot précis.
- Export JSON de tous les slots manuels.
- Import d'un fichier `.coan-save.json`.
- Import d'anciens exports `GameState` directs.
- Stockage d'un import dans un slot choisi.
- Chargement immédiat d'un import.
- Migration au chargement avec les fonctions `migrate*` déjà existantes.
- Checksum COAN court pour reconnaître les dossiers.

## Ce qui est sauvegardé

Le payload contient le `GameState` complet, donc tous les modules créés avant cette étape :

```text
City / secteurs
rapports falsifiés
audit Advisor
campagnes et objectifs
citoyens
informateurs
Civil Protection
rations
Nova Prospekt
Vortigaunts / Biotics
Résistance Lambda avancée
factions internes Lambda
Xen ecosystem
mutations Xen
quarantaines évolutives
recherche Xen
catastrophes Xen
événements majeurs
verdict final
chronique finale
terminaux spécialisés
archives vidéo
atmosphère/audio
```

## Stockage local

Clés localStorage utilisées :

```text
combine-city-lore-upgrade
combine-city-lore-manual-slots-v36
```

La première clé reste l'autosave historique pour garder la compatibilité avec les étapes précédentes.

## Validation effectuée

```bash
npx tsc -p tsconfig.modules.json --noEmit
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step36.js
```

## Application

Depuis la racine du repo existant :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP36_MULTI_SAVE_SYSTEM.md ./
npm run dev
```

## Commit conseillé

```bash
git add src README_STEP36_MULTI_SAVE_SYSTEM.md
git commit -m "Add multi-slot COAN save and import export system"
git push
```

## Limites prévues pour plus tard

- Pas encore de cloud sync.
- Pas encore de SQLite/Tauri local DB.
- Pas encore de sauvegarde chiffrée.
- Les fichiers importés sont validés par forme et migrés, mais il n'y a pas encore de signature cryptographique.
