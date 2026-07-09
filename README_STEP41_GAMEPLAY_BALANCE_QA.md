# STEP 41 — Gameplay balance / long-run QA

Cette passe ajoute un écran et un système de lecture d’équilibrage pour préparer la V5 polish/finalisation gameplay.

## Nouveaux fichiers

```text
src/data/gameplayBalance.ts
src/systems/gameplayBalanceSystem.ts
src/components/GameplayBalanceScreen.tsx
scripts/coan-balance-audit.mjs
README_STEP41_GAMEPLAY_BALANCE_QA.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/data/terminalInterfaces.ts
src/App.tsx
src/index.css
package.tauri.patch.json
```

## Nouveau module

```text
Équilibrage
```

Le module calcule une matrice de QA gameplay autour de huit axes :

- Pression Lambda ;
- Pression Xen ;
- Pression Citadel / Advisor ;
- Stress civil ;
- Viabilité économie/rations ;
- Appareil de contrôle ;
- Dette morale / mémoire noire ;
- Risque de spirale incontrôlable.

Chaque axe affiche :

- valeur actuelle ;
- cible recommandée ;
- bande : sous-pression, stable, tension haute, spirale critique ;
- drivers ;
- intention lore ;
- correction conseillée.

## Projection 30 jours

Le système ajoute une projection heuristique de 30 jours pour voir si City risque de basculer trop vite vers :

- insurrection Lambda ;
- biosphère Xen dominante ;
- effondrement civil ;
- audit Advisor ;
- collapse systémique.

Cette projection ne remplace pas la simulation réelle : elle sert au playtest et au réglage.

## Playtests recommandés

Quatre scénarios QA sont intégrés :

```text
City modèle / 30 jours
Quarantaine Alyx-era / 20 jours
Après Nova Prospekt / 15 jours
Uprising / survie 10 jours
```

Ils listent les arcs attendus et les signaux d’alerte, par exemple :

- City trop stable sans dette morale ;
- Xen trop faible en timeline Alyx ;
- Nova Prospekt sans martyr Lambda ;
- Uprising qui tue la partie avant que le joueur puisse réagir.

## Script d’audit

Après application du patch :

```bash
node scripts/coan-balance-audit.mjs
```

ou, si le patch package est appliqué :

```bash
npm run audit:balance
```

## Application

Depuis la racine de ton repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp -r combine-lore-upgrade/scripts ./scripts
cp combine-lore-upgrade/README_STEP41_GAMEPLAY_BALANCE_QA.md ./
node scripts/apply-tauri-package-patch.mjs
npm install
npm run check:modules
npm run audit:balance
npm run dev
```

## Commit conseillé

```bash
git add src scripts package.tauri.patch.json README_STEP41_GAMEPLAY_BALANCE_QA.md
git commit -m "Add COAN gameplay balance and long-run QA screen"
git push
```
