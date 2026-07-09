# STEP 39 — Paramètres avancés de difficulté COAN

Cette passe ajoute un vrai module de difficulté avancée à `combine-administrator-simulator`.

Le but n’est pas d’ajouter un simple bouton Facile/Moyen/Difficile, mais de permettre de régler finement la pression systémique de City : Lambda, Xen, Citadel, Advisor, rations, production, Civil Protection, Nova Prospekt, dette technologique, campagne et fragilité civile.

## Fichiers ajoutés

```text
src/data/difficultySettings.ts
src/systems/difficultySettingsSystem.ts
src/components/DifficultySettingsScreen.tsx
README_STEP39_ADVANCED_DIFFICULTY_SETTINGS.md
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
Difficulté
```

Ce module est disponible dans le City Terminal et le Citadel Terminal.

## Profils prédéfinis

```text
Observation civique
Occupation standard
City disciplinaire
Blacksite de quarantaine
Uprising cauchemar
Profil custom COAN
```

Chaque profil modifie :

```text
stats initiales
pression quotidienne
état des secteurs au démarrage
menace projetée
modificateur audit
journal difficulté
```

## Curseurs custom

Le profil custom permet d’ajuster :

```text
Force Lambda
Vitesse Xen
Sévérité Citadel
Tolérance Advisor
Rareté rations
Base production
Brutalité Civil Protection
Pression Nova Prospekt
Dette technologique
Pression campagne
Fragilité civile
Rigueur audit rapports
```

Tous les curseurs vont de `0.35` à `2.00`.

## Intégration simulation

La difficulté agit à trois niveaux :

1. **Nouvelle partie**
   - applique les effets de départ ;
   - modifie les secteurs initiaux ;
   - ajoute un résumé au log COAN.

2. **Chaque journée**
   - ajoute une pression Lambda/Xen/Citadel/rations/production ;
   - ajuste certains secteurs selon leur zone ;
   - ajoute des lignes au rapport quotidien.

3. **Sauvegardes**
   - le profil et les curseurs sont dans le `GameState` ;
   - les anciennes sauvegardes migrent vers `Occupation standard`.

## Notes lore

- `City disciplinaire` pousse la logique Civil Protection : peur rapide, abus, radicalisation différée.
- `Blacksite de quarantaine` pousse Xen, Biotics, recherche biologique et suspicion.
- `Uprising cauchemar` simule une City très proche de l’effondrement HL2 Episodes : Lambda coordonné, Citadel hostile, rations faibles.
- `Observation civique` sert au test et à la découverte des modules.

## Application

Depuis la racine du repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP39_ADVANCED_DIFFICULTY_SETTINGS.md ./
npm run dev
```

## Commit conseillé

```bash
git add src README_STEP39_ADVANCED_DIFFICULTY_SETTINGS.md
git commit -m "Add advanced COAN difficulty settings"
git push
```
