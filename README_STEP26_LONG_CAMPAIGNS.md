# STEP 26 — Scénarios de campagne longs

Cette passe ajoute un vrai module de campagnes longues au simulateur Combine Administrator.

## Nouveaux fichiers

```text
src/data/campaignScenarios.ts
src/systems/campaignSystem.ts
README_STEP26_LONG_CAMPAIGNS.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Nouvel onglet

```text
Campagnes
```

Il affiche :

- la campagne active ;
- le briefing lore ;
- le mandat administratif ;
- la durée de campagne ;
- la pression narrative ;
- les objectifs longs ;
- les jalons scénarisés ;
- les secteurs critiques ;
- les seuils d’échec narratif ;
- le journal de campagne.

## Campagnes ajoutées

```text
Administration libre de City
City 17 — Pré-Half-Life 2
City portuaire contaminée
City industrielle modèle
Après Nova Prospekt
City en Uprising
City isolée après chute Citadel
```

Chaque campagne a :

- City recommandée ;
- timeline recommandée ;
- scénario recommandé ;
- profil recommandé ;
- effets de départ ;
- effets quotidiens ;
- effets par secteur ;
- objectifs longs ;
- jalons scénarisés ;
- seuils d’échec ;
- finale narrative ;
- notes lore.

## Gameplay ajouté

À chaque fin de journée, le système campagne :

1. applique les effets quotidiens de la campagne ;
2. déclenche les jalons scénarisés au bon jour ;
3. met à jour les objectifs ;
4. calcule une pression narrative ;
5. ajoute des lignes au rapport journalier.

## Exemples de jalons

- contrôle de transit renforcé ;
- radio Lambda basse puissance ;
- prédation aquatique dans les canaux ;
- convoi Razor contaminé ;
- quota industriel augmenté ;
- liste de disparus Nova Prospekt ;
- exode civil par les canaux ;
- relais Citadel muet ;
- transmission Advisor fragmentaire.

## Application

Depuis ton repo existant :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP26_LONG_CAMPAIGNS.md ./
npm run dev
```

## Validation effectuée

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step26.js
```
