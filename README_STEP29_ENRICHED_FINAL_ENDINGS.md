# Étape 29 — Système de fins enrichi

Cette passe transforme la fin de partie en **dossier final COAN** au lieu d'un simple texte de conclusion.

## Ajouts

- `src/data/finalVerdicts.ts`
- `src/systems/finalVerdictSystem.ts`
- nouvel onglet `Verdict final`
- nouvel écran `FinalVerdictScreen`
- nouveaux types `FinalVerdictState`, `FinalVerdictAxis`, `FinalEndingDefinition`
- sauvegarde du verdict final dans `GameState.finalVerdict`

## Ce que le verdict calcule

Le verdict lit les systèmes déjà ajoutés :

- statistiques globales de City ;
- secteurs perdus, scellés ou insurgés ;
- campagne et objectifs multiples ;
- rapports falsifiés et audit Advisor ;
- Nova Prospekt ;
- Vortigaunts / Biotics ;
- Résistance Lambda avancée et factions ;
- Civil Protection ;
- rationnement ;
- écosystème Xen, mutations, quarantaines, recherche et catastrophes ;
- événements scénarisés majeurs.

## Axes de verdict

Chaque fin affiche maintenant :

- contrôle de City ;
- survie civile ;
- statut Lambda ;
- héritage Xen ;
- état Nova Prospekt ;
- sort des Vortigaunts / Biotics ;
- intégrité des rapports ;
- mandat de campagne.

Chaque axe possède :

- score ;
- grade ;
- résumé ;
- détail chiffré ;
- tags lore.

## Fins enrichies ajoutées

- Insurrection Lambda ;
- Quarantine Zone totale ;
- Administrateur remplacé par supervision Advisor ;
- Effondrement industriel ;
- Terreur stérile ;
- Ville modèle Combine ;
- Humanité préservée / double jeu ;
- Nova Prospekt exposé ;
- Ravenholm-like ;
- Doctrine biologique Combine ;
- Règne direct de la Citadel ;
- Mandat de campagne achevé.

## Interface

Un nouvel onglet est disponible :

```text
Verdict final
```

Avant la fin, il affiche les conditions surveillées.
Après la fin, il affiche :

- conclusion publique transmise à la Citadelle ;
- vérité COAN cachée ;
- jugement Advisor ;
- axes de bilan ;
- archive finale ;
- recommandations post-verdict ;
- branches de fins secondaires débloquées.

## Application

Depuis la racine de ton dépôt :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP29_ENRICHED_FINAL_ENDINGS.md ./
npm run dev
```

## Validation effectuée

```bash
npx tsc -p tsconfig.modules.json --noEmit
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step29.js
```
