# STEP 37 — Historique complet des décisions COAN

Cette passe ajoute un registre décisionnel complet à l’application **Combine Administrator Simulator**.

## Objectif

Tracer chaque décision et chaque clôture de journée dans un ledger consultable :

- actions opérateur ;
- opérations Civil Protection, rations, Nova Prospekt, Xen, Lambda, BreenCast, technologies ;
- rapports réels et rapports transmis à la Citadelle ;
- falsification, risque audit et contradictions Advisor ;
- conséquences immédiates ;
- conséquences différées ;
- conséquences cachées ;
- export texte d’audit COAN.

## Fichiers ajoutés

```text
src/data/decisionHistory.ts
src/systems/decisionHistorySystem.ts
src/components/DecisionHistoryScreen.tsx
README_STEP37_DECISION_HISTORY.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/data/terminalInterfaces.ts
src/App.tsx
src/index.css
```

## Nouveau module

```text
Historique décisions
```

Le module affiche :

- nombre total d’entrées ;
- dossiers à haut risque ;
- conséquences cachées détectées ;
- nombre de rapports archivés ;
- moyenne de falsification ;
- filtres d’audit ;
- cartes détaillées par décision ;
- comparaison dossier réel / transmission Citadel pour les rapports ;
- export texte complet.

## Filtres COAN

```text
Tous les dossiers
Décisions opérateur
Conséquences cachées
Rapports / falsification
Xen / quarantaine
Lambda / résistance
Nova Prospekt
Citadel / Advisor
Population / CP / rations
```

## Intégration technique

Le système ne force pas chaque bouton à gérer l’historique manuellement. Il observe les nouveaux logs et rapports déjà produits par les modules existants, puis les transforme en entrées structurées.

Cela permet de couvrir automatiquement :

```text
BreenCast
Rationnement
Nova Prospekt
Registre civil
Informateurs
Civil Protection
Citadel Directive Tree
Technologies Combine
Résistance Lambda
Factions internes
Vortigaunts / Biotics
Xen ecosystem
Mutations Xen
Zones de quarantaine
Recherche Xen
Catastrophes Xen
Événements majeurs
Archives vidéo
Sauvegardes
Rapports falsifiés
```

## Données enregistrées par entrée

Chaque entrée contient :

```text
jour
séquence
source
catégorie
titre
résumé
intention opérateur
cible
classification
sévérité
snapshot stats
stats delta estimé
effets immédiats
conséquences différées
conséquences cachées
rapport réel extrait
rapport transmis extrait
score falsification
risque audit
tags lore
fingerprint anti-duplication
```

## Compatibilité sauvegardes

Les anciennes sauvegardes sont migrées automatiquement. Si `decisionHistory` n’existe pas, un ledger initial est créé et les derniers logs/rapports sont reconvertis en entrées.

## Validation

```bash
npx tsc -p tsconfig.modules.json --noEmit
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step37.js
```

## Application

Depuis la racine du repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP37_DECISION_HISTORY.md ./
npm run dev
```

## Commit conseillé

```bash
git add src README_STEP37_DECISION_HISTORY.md
git commit -m "Add full COAN decision history ledger"
git push
```
