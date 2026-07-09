# STEP 8 — Timeline Half-Life jouable

Cette étape ajoute une couche chronologique complète au simulateur Combine.

## Objectif

Le scénario opérationnel dit ce qui arrive à ta City actuellement, tandis que la timeline dit **à quelle période du lore Half-Life** cette City existe.

Exemple :

- Scénario : `Zone de quarantaine`
- Timeline : `Période Half-Life: Alyx`

=> City avec crise sanitaire Xen forte, unités de quarantaine et Grunts/Ordinals plus présents, Résistance précoce mais déjà structurée.

## Nouveaux fichiers

```text
src/data/timelinePresets.ts
src/systems/timelineSystem.ts
README_STEP8_HALF_LIFE_TIMELINE.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/systems/eventDirector.ts
src/App.tsx
src/index.css
```

## Timelines ajoutées

```text
Après la Guerre de Sept Heures
Occupation consolidée
Période Half-Life: Alyx
Pré-Half-Life 2
Arrivée de Gordon Freeman
Après Nova Prospekt
Uprising / guerre urbaine
Effondrement local de la Citadelle
```

## Ce que chaque timeline modifie

Chaque époque peut changer :

- statistiques de départ ;
- pression quotidienne ;
- état initial des secteurs ;
- disponibilité des unités Combine ;
- poids des événements Résistance / Xen / Citadel / civils / moraux ;
- notes lore affichées au joueur ;
- tags d’unlocks narratifs.

## Nouvel onglet

Ajout d’un onglet :

```text
Timeline
```

Il affiche :

- la période active ;
- son contexte canonique ;
- ses effets de départ ;
- sa pression quotidienne ;
- ses secteurs affectés ;
- ses disponibilités lore ;
- les époques jouables.

Changer de timeline depuis cet onglet réinitialise la partie actuelle avec :

- même numéro de City ;
- même scénario ;
- même profil ;
- nouvelle époque appliquée proprement.

## Intégration gameplay

La timeline est maintenant stockée dans `GameState` :

```ts
timeline: TimelineId
```

Elle est appliquée dans :

- `createInitialGame()` pour les stats, secteurs et unités ;
- `nextDay()` pour la pression quotidienne ;
- `eventDirector.ts` pour biaiser les événements selon l’époque ;
- les rapports journaliers, qui affichent la fenêtre chronologique active.

## Exemples d’impact

### Période Alyx

- Xen plus actif.
- Quarantine Zone plus importante.
- Grunts, Ordinals et Suppressors plus disponibles.
- Événements Vortigaunt/Biotics plus probables.

### Pré-HL2

- Ville plus stable en façade.
- Résistance Lambda organisée dans canaux/égouts.
- Civil Protection et scanners très présents.

### Après Nova Prospekt

- Activité rebelle très haute.
- Suspicion et colère civile montent.
- Striders/Gunships plus disponibles.
- Événements moraux et insurrectionnels plus fréquents.

### Effondrement Citadelle

- Autorité Combine faible.
- Xen très dangereux.
- Résistance très forte.
- Production et rations en chute.
- Pertes Combine et civiles structurelles.

## Validation

Validation effectuée :

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app.js
```

Les modules TypeScript passent, et `App.tsx` est syntaxiquement bundlable.
