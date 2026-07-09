# Step 2 — Carte stratégique connectée

Cette passe transforme les secteurs en vraie topologie urbaine Half-Life / Combine.

## Objectif

Avant cette étape, les secteurs étaient surtout une grille de cartes. Après cette étape :

- chaque secteur possède des coordonnées de carte (`x`, `y`) ;
- chaque secteur possède une zone stratégique (`zone`) ;
- chaque secteur possède une valeur stratégique et un indicateur de goulot d'étranglement ;
- chaque secteur possède des connexions lore : surface, égouts, canaux, Razor Train, accès Citadel, sas de quarantaine ;
- l'onglet Secteurs affiche une carte SVG connectée ;
- cliquer un secteur montre ses routes, risques, contrôles et pressions voisines ;
- un système `sectorNetwork` centralise les calculs de liens et de pressions.

## Fichiers modifiés

```txt
src/types/game.ts
src/data/citySectors.ts
src/App.tsx
src/index.css
```

## Fichier ajouté

```txt
src/systems/sectorNetwork.ts
```

## Nouveaux champs de `Sector`

```ts
x: number;
y: number;
zone: 'Centre administratif' | 'Résidentiel' | 'Infrastructure' | 'Souterrain' | 'Quarantaine' | 'Citadelle' | 'Périphérie';
strategicValue: number;
chokePoint: boolean;
connections: SectorConnection[];
```

## Format d'une connexion

```ts
{
  to: 'sewers',
  type: 'sewer',
  label: 'descente d’entretien',
  risk: 72,
  controlledBy: 'Xen'
}
```

## Types de route

- `surface` : rues, avenues, checkpoints ;
- `canal` : canaux et routes semi-souterraines ;
- `sewer` : égouts et conduites techniques ;
- `rail` : Razor Train et fret Combine ;
- `citadel` : accès restreints liés à la Citadelle ;
- `quarantine` : sas biologiques, barrières de confinement ;
- `service` : maintenance, conduits, passages non déclarés.

## Contrôle de route

Chaque route peut être contrôlée par :

- `Combine` ;
- `Resistance` ;
- `Xen` ;
- `Contested`.

## Ce que l'UI affiche maintenant

Dans l'onglet `Secteurs` :

- une carte réseau avec liens colorés ;
- les routes actives autour du secteur sélectionné ;
- les routes de surface, égouts, rail, Citadel et quarantaine ;
- les pressions voisines : Lambda, Xen, isolement hors contrôle Combine, route la plus risquée ;
- la liste cliquable des secteurs voisins ;
- les notes de risque : route Lambda probable, vecteur biologique, routes surveillées.

## Pourquoi cette étape prépare l'étape 3

L'étape 3 pourra utiliser directement `getConnectedSectors()` et `getSectorPressure()` pour faire une vraie propagation :

- la Résistance passe surtout par canaux, service routes, blocs résidentiels et hôpital ;
- Xen passe surtout par égouts, quarantaine, périphérie et hôpital ;
- le Combine bloque mieux par Citadel, surface surveillée et Razor Train ;
- les goulots d'étranglement deviennent des points de contrôle stratégiques.

## Vérification locale

Après copie :

```bash
npm install
npm run dev
```

Puis ouvrir l'onglet `Secteurs` et vérifier :

1. la carte connectée apparaît ;
2. les secteurs sont cliquables ;
3. les routes autour du secteur sélectionné s'illuminent ;
4. le panneau de droite affiche les connexions opérationnelles ;
5. les actions existantes fonctionnent encore.
