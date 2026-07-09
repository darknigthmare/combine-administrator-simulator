# STEP 11 — Advanced Ration Economy

Cette passe ajoute un vrai système d’économie alimentaire et sociale à **Combine Administrator Simulator**.

## Nouveaux fichiers

```text
src/data/rationEconomy.ts
src/systems/rationEconomy.ts
README_STEP11_ADVANCED_RATION_ECONOMY.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Fonctionnalités ajoutées

- État dédié `rationEconomy` dans `GameState`.
- Registre de rationnement par secteur.
- Besoin quotidien réel selon population, statut, zone et infrastructure.
- Production journalière convertie depuis production/stabilité globale.
- Allocation par politique active.
- Faim par secteur.
- Ratio calorique par secteur.
- Marché noir par secteur.
- Informateurs contre bonus de ration.
- Hoarding / corruption alimentaire.
- Fuites de stock.
- Autonomie alimentaire en jours.
- Effets réels sur loyauté, fatigue, rébellion, information, production et suspicion.

## Politiques de rationnement

- Distribution civique standard.
- Priorité aux blocs conformes.
- Priorité ouvrière industrielle.
- Coupe punitive anti-citoyenne.
- Tolérance marché noir contrôlé.
- Masque humanitaire BreenCast.
- Prime de dénonciation Civil Protection.

## Opérations directes

- Redistribution inter-blocs.
- Bonus calorique ouvriers.
- Coupe punitive de bloc.
- Coupons de dénonciation.
- Balayage marché noir.
- Secours clandestin discret.
- Réquisition Nova Prospekt.

## Impact gameplay

La faim devient un moteur de simulation :

- trop peu de rations → fatigue, marché noir, radicalisation Lambda ;
- rations ciblées → conformité visible, injustice sociale ;
- informateurs → meilleur contrôle informationnel, mais paranoïa et fausses dénonciations ;
- marché noir toléré → possibilité de cartographier les réseaux, mais risque de caches Lambda ;
- politique humanitaire → loyauté meilleure, mais consommation de stock et suspicion Citadel.

## Validation

Contrôles effectués :

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step11.js
```

## Application

Depuis la racine du repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP11_ADVANCED_RATION_ECONOMY.md ./
npm run dev
```

Puis :

```bash
git add src README_STEP11_ADVANCED_RATION_ECONOMY.md
git commit -m "Add advanced ration economy system"
git push
```
