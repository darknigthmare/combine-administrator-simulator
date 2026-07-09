# STEP 38 — Codex lore interne COAN

Cette passe ajoute un vrai codex lore consultable dans l’application, au lieu du mini panneau statique précédent.

## Nouveaux fichiers

```txt
src/data/loreCodex.ts
src/systems/loreCodexSystem.ts
src/components/LoreCodexScreen.tsx
README_STEP38_LORE_CODEX.md
```

## Fichiers modifiés

```txt
src/types/game.ts
src/data/index.ts
src/data/terminalInterfaces.ts
src/App.tsx
src/index.css
```

## Ce que le module ajoute

Nouvel écran `Codex Lore` avec :

- catégories : Timeline/canon, Combine/Citadel, citoyens/contrôle civil, Résistance Lambda, Xen/biosphère, Nova Prospekt/Biotics, règles gameplay lore ;
- recherche texte ;
- recommandations COAN selon l’état réel de City ;
- dossier détaillé avec résumé canon, doctrine opérationnelle, règles danger et erreurs à éviter ;
- liens directs vers les modules concernés ;
- export texte du codex filtré.

## Exemples d’entrées intégrées

- Guerre de Sept Heures
- City 17 comme modèle administratif
- Combine / Union Universelle
- Citadelle et Advisors
- Civil Protection
- Overwatch / Transhuman Arm
- BreenCast
- Rationnement
- Résistance Lambda
- Nova Prospekt
- Vortigaunts / Biotics
- Xen comme biosphère
- Headcrabs et zombies
- Barnacles / Antlions
- Quarantaine Ravenholm-like
- Recherche Xen / bioweapons
- Rapports falsifiés
- Archives vidéo COAN
- Frontière fan-made privée / pas d’assets propriétaires

## Logique dynamique

Le système recommande automatiquement les entrées pertinentes :

```txt
Lambda élevé      → Résistance Lambda / factions internes
Xen élevé         → Xen biosphère / headcrabs / Ravenholm-like
Nova instable     → Nova Prospekt / Vortigaunts-Biotics
Audit élevé       → Advisors / rapports falsifiés
Faim élevée       → Rationnement / Civil Protection
Fuite vidéo       → Archives vidéo / preuves
```

## Validation

```bash
npx tsc -p tsconfig.modules.json --noEmit
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step38.js
```

## Application

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP38_LORE_CODEX.md ./
npm run dev
```

## Commit conseillé

```bash
git add src README_STEP38_LORE_CODEX.md
git commit -m "Add internal Half-Life lore codex"
git push
```
