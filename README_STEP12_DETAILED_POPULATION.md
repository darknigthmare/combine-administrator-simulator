# STEP 12 — Population détaillée par secteurs

Cette passe transforme la population brute en registre civil exploitable par la simulation Combine.

## Fichiers ajoutés

- `src/data/populationGroups.ts`
- `src/systems/populationSimulation.ts`
- `README_STEP12_DETAILED_POPULATION.md`

## Fichiers modifiés

- `src/types/game.ts`
- `src/data/index.ts`
- `src/App.tsx`
- `src/components/DedicatedScreens.tsx`
- `src/index.css`

## Nouveautés gameplay

Chaque secteur possède maintenant des groupes sociaux :

- Citoyens conformes
- Citoyens neutres
- Citoyens affamés
- Citoyens suspects
- Collaborateurs civils
- Informateurs
- Familles de disparus
- Travailleurs industriels
- Réfugiés internes
- Sympathisants Lambda
- Exposés Xen

La simulation quotidienne fait évoluer ces groupes selon :

- faim locale ;
- marché noir ;
- informateurs ;
- peur ;
- surveillance ;
- loyauté ;
- rébellion locale ;
- contamination Xen ;
- infrastructure ;
- statut du secteur.

## Effets sur le jeu

- La faim transforme des neutres en citoyens affamés.
- Les citoyens affamés peuvent devenir sympathisants Lambda.
- Les familles de disparus deviennent plus suspectes sous répression.
- Les primes de rationnement recrutent des informateurs.
- Les secteurs contaminés créent des exposés Xen.
- Les infrastructures détruites créent des réfugiés internes.
- La population influence désormais loyauté, rébellion, exposition Xen, info control, fatigue et production.

## Nouvel onglet

Un onglet `Population` a été ajouté.

Il affiche :

- conformité globale ;
- sympathie Lambda ;
- exposition Xen ;
- densité d’informateurs ;
- force de travail ;
- population vulnérable ;
- répartition globale des groupes ;
- secteurs à risque social ;
- dossier détaillé du secteur sélectionné ;
- journal des mouvements sociaux.

## Validation

Commandes passées :

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step12.js
```
