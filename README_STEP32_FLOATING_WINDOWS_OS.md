# Étape 32 — Système de fenêtres flottantes COAN

Cette passe ajoute un mini système d’exploitation administratif Combine au-dessus de l’interface principale.

## Ajouts

- `src/data/floatingWindows.ts`
- `src/systems/floatingWindowSystem.ts`
- `src/components/FloatingWindowLayer.tsx`

## Modifications

- `src/types/game.ts`
- `src/data/index.ts`
- `src/App.tsx`
- `src/index.css`

## Fonctionnalités

Le bouton `COAN OS` apparaît en bas à droite et ouvre un dock de dossiers flottants.

Fenêtres disponibles :

- Dossier secteur
- Fiche citoyen
- Directive Citadel
- Signal BreenCast
- Dossier Nova Prospekt
- Biohazard Xen
- Cellule Lambda
- Fiche unité Combine
- Rapport réel / transmis
- Ledger rations
- Événement majeur
- Objectif de campagne
- Vortigaunt / Biotic
- Poste Civil Protection
- Protocole technologique
- Extrait chronique finale

Chaque fenêtre peut être :

- ouverte depuis le dock ;
- déplacée à la souris ;
- réduite dans un tray ;
- restaurée ;
- fermée ;
- épinglée ;
- envoyée vers son module d’origine avec le bouton `↗`.

## Logique

Les fenêtres ne sont pas statiques : leur contenu lit l’état réel de la partie.

Exemples :

- la fenêtre `Biohazard Xen` affiche la couche biologique la plus dangereuse ;
- la fenêtre `Lambda` affiche la cellule la plus chaude ;
- la fenêtre `Rapport` compare rapport réel et transmission Citadel ;
- la fenêtre `Nova` affiche l’instabilité et les contradictions de Nova Prospekt ;
- la fenêtre `CP` affiche le poste Civil Protection le plus corrompu/brutal ;
- la fenêtre `Objectif` affiche l’objectif actif le plus important.

## Vérifications effectuées

```bash
npx tsc -p tsconfig.modules.json --noEmit
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step32.js
```

## Application

Depuis la racine du repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP32_FLOATING_WINDOWS_OS.md ./
npm run dev
```

## Commit conseillé

```bash
git add src README_STEP32_FLOATING_WINDOWS_OS.md
git commit -m "Add COAN floating window dossier OS"
git push
```

## Suite logique

Étape 33 — Interfaces spécialisées `City Terminal / Nova Terminal / Citadel Terminal / Quarantine Terminal`, avec changement de peau, navigation et terminologie propre à chaque lieu/système.
