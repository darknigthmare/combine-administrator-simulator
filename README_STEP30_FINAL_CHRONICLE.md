# STEP 30 — Chronique finale générée

Cette passe ajoute une archive narrative finale complète, générée automatiquement quand le système de verdict final se déclenche.

## Ajouts

- `src/data/finalChronicle.ts`
  - Définitions des chapitres de chronique.
  - Ordre narratif : résumé exécutif, administration, crimes couverts, secteurs perdus, Nova Prospekt, Xen, Lambda, verdict Citadel, mémoire historique.
  - Classifications : archive publique, restreinte, blacksite, effacement recommandé.

- `src/systems/finalChronicleSystem.ts`
  - Génère la chronique finale à partir de l’état réel de la partie.
  - Utilise le verdict enrichi, les rapports falsifiés, Nova Prospekt, Xen, Lambda, Civil Protection, rations, Vortigaunts, campagnes et secteurs.
  - Produit une version publique et une version COAN restreinte.
  - Produit un export texte complet copiable.

## Modifications

- `src/types/game.ts`
  - Ajout des types `FinalChronicleState`, `FinalChronicleChapter`, `FinalChronicleSectorEntry`, `FinalChronicleLedger`.
  - Ajout de `finalChronicle` dans `GameState`.
  - Ajout du nouvel onglet `chronicle`.

- `src/App.tsx`
  - La chronique est générée au moment où le verdict final est verrouillé.
  - L’interface bascule automatiquement vers l’onglet `Chronique finale`.
  - Les anciennes sauvegardes migrent avec `finalChronicle: null`.

- `src/components/DedicatedScreens.tsx`
  - Nouvel écran `FinalChronicleScreen`.
  - Affichage de la version publique, de la vérité restreinte, du ledger, des chapitres, de la carte mémoire finale et de l’export texte.

- `src/index.css`
  - Styles dédiés à l’archive finale : blacksite, erased, chapitres, ledger, secteurs mémoire, textarea d’export.

## Comportement

Quand une fin se déclenche, l’app génère maintenant :

- un verdict final court ;
- une chronique finale longue ;
- un ledger des pertes et falsifications ;
- une carte mémoire des secteurs ;
- une timeline condensée ;
- une archive copiable/exportable en texte.

La chronique tient compte de :

- City / secteurs ;
- campagne active ;
- objectifs de campagne ;
- rapports falsifiés ;
- audit Advisor ;
- Nova Prospekt ;
- Vortigaunts / Biotics ;
- Résistance Lambda ;
- factions internes ;
- Civil Protection ;
- économie des rations ;
- écosystème Xen ;
- mutations Xen ;
- zones de quarantaine ;
- recherche Xen ;
- catastrophes Xen ;
- événements majeurs ;
- score final du verdict.

## Installation

Depuis la racine de ton repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP30_FINAL_CHRONICLE.md ./
npm run dev
```

## Validation effectuée

```bash
npx tsc -p tsconfig.modules.json --noEmit
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step30.js
```
