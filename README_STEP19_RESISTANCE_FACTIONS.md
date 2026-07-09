# Step 19 — Factions internes de la Résistance

Cette passe transforme la Résistance Lambda en réseau idéologiquement et logistiquement divisé, au lieu d'un bloc unique.

## Ajouts

- `src/data/resistanceFactions.ts`
- `src/systems/resistanceFactions.ts`

## Fichiers modifiés

- `src/types/game.ts`
- `src/data/index.ts`
- `src/App.tsx`
- `src/components/DedicatedScreens.tsx`
- `src/index.css`

## Factions ajoutées

- Lambda scientifique
- Réseau Canaux / Razor auxiliaire
- Citoyens armés de bloc
- Vortigaunts libres
- Saboteurs industriels
- Cendres de Nova Prospekt
- Réfugiés Ravenholm-like

## Gameplay ajouté

Chaque faction possède :

- influence ;
- cohésion ;
- militance ;
- secret ;
- sympathie publique ;
- lien Vortigaunt ;
- valeur scientifique ;
- tolérance Xen ;
- traumatisme Nova Prospekt ;
- rivalités ;
- méthodes ;
- agenda actuel.

La simulation quotidienne calcule maintenant :

- faction dominante ;
- fragmentation interne ;
- menace scientifique Lambda ;
- contrôle des canaux ;
- mobilisation armée ;
- diplomatie Vortigaunt ;
- martyr Nova Prospekt ;
- panique Ravenholm-like.

## Nouvelles doctrines

- Fragmenter et isoler
- Leurre scientifique
- Déni canaux / égouts
- Confinement Vortigaunt
- Contre-récit Nova Prospekt
- Tolérance sélective

## Nouvelles opérations

- Exploiter rivalité interne
- Cibler laboratoire Lambda
- Inonder route des canaux
- Amnistie ouvrière conditionnelle
- Capturer contact Vortigaunt
- Discréditer les évadés Nova
- Brûler safehouse Ravenholm-like
- Fausse livraison Lambda

## Validation

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step19.js
```
