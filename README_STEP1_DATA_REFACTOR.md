# Step 1 — Data/Lore Refactor

Cette passe extrait les données lore et les tables de simulation hors de `src/App.tsx`.

## Objectif

Avant cette passe, `App.tsx` contenait à la fois :

- les types TypeScript ;
- les statistiques de départ ;
- les secteurs de City ;
- les unités Combine ;
- le codex Xen ;
- les directives Citadel ;
- les messages Breencast ;
- les crises narratives ;
- les profils de gouvernance ;
- les scénarios ;
- les fins.

Après cette passe, `App.tsx` conserve surtout la logique UI et la boucle de simulation existante. Les données sont déplacées dans `src/data/` et les types dans `src/types/`.

## Nouveaux fichiers

```txt
src/types/game.ts
src/data/index.ts
src/data/citySectors.ts
src/data/combineUnits.ts
src/data/xenEntities.ts
src/data/directives.ts
src/data/propagandaMessages.ts
src/data/crisisEvents.ts
src/data/governanceProfiles.ts
src/data/scenarioPresets.ts
src/data/endings.ts
```

## Rôle des fichiers

### `src/types/game.ts`
Source unique des types utilisés par l'application : `Stats`, `Sector`, `Unit`, `Crisis`, `Directive`, `GameState`, etc.

### `src/data/citySectors.ts`
Contient :

- `baseStats` ;
- `baseSectors`.

C'est ici qu'il faudra enrichir la carte de City lors de l'étape 2.

### `src/data/combineUnits.ts`
Contient `unitTemplates` : Civil Protection, scanners, manhacks, Overwatch, Ordinals, Suppressors, Elites, Hunters, Striders, Airwatch, unités de quarantaine, Advisor.

### `src/data/xenEntities.ts`
Contient `xenCodex` : headcrabs, barnacles, antlions, ichthyosaur, fungus, tentacle, etc.

### `src/data/directives.ts`
Contient les directives de la Citadel et des Advisors.

### `src/data/propagandaMessages.ts`
Contient les messages Breencast utilisés par la propagande.

### `src/data/crisisEvents.ts`
Contient les crises à choix : radio Lambda, nid de headcrabs, migration antlion, inspection Advisor, Vortigaunt capturé, sabotage Razor Train.

### `src/data/governanceProfiles.ts`
Contient les effets des profils : loyaliste, technocrate, tyran, collaborateur, sympathisant, gestionnaire quarantaine.

### `src/data/scenarioPresets.ts`
Contient les effets des scénarios : pré-HL2, standard, dormant, quarantine, post-Nova Prospekt, uprising.

### `src/data/endings.ts`
Contient les textes de fin.

### `src/data/index.ts`
Point d'entrée unique pour importer toutes les données depuis `App.tsx`.

## Pourquoi cette passe est importante

Cette extraction rend possible les prochaines étapes sans compresser l'application dans un seul fichier :

1. Carte stratégique connectée.
2. Propagation rebelle/Xen secteur par secteur.
3. Gros pack de 100 événements lore.
4. Rapports falsifiables.
5. Module Nova Prospekt avec interface dédiée.
6. BreenCast dynamique.
7. Timeline Half-Life.

## Test recommandé

Après copie dans ton repo :

```bash
npm install
npm run dev
```

Vérifie :

- l'écran d'accueil se lance ;
- une nouvelle partie démarre ;
- les secteurs s'affichent ;
- les unités Combine restent déployables ;
- les crises se résolvent ;
- le bouton fin de journée fonctionne ;
- les messages de propagande s'affichent ;
- les fins de partie s'affichent toujours.

## Commit recommandé

```bash
git add src/App.tsx src/types src/data README_STEP1_DATA_REFACTOR.md
git commit -m "Refactor lore data into dedicated TypeScript modules"
```
