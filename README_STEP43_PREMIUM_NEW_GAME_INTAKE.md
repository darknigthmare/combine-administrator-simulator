# STEP 43 — Premium New Game Intake

Cette étape remplace le démarrage basique par un vrai écran **Nouvelle Partie / COAN Intake**.

## Ajouts

- `src/data/newGameIntake.ts`
- `src/systems/newGameIntakeSystem.ts`
- `src/components/NewGameIntakeScreen.tsx`
- `scripts/coan-new-game-audit.mjs`

## Fonctionnalités

- choix du numéro de City ;
- doctrines de départ cohérentes lore ;
- choix campagne / scénario / timeline / profil / difficulté ;
- verrouillage optionnel des recommandations de campagne ;
- choix de piste tutoriel COAN ;
- preview des pressions initiales : Lambda, Xen, Citadel, stress civil, rations, Nova ;
- preview des stats initiales ;
- avertissements contextualisés ;
- lancement standard ou lancement avec tutoriel ;
- combinaisons QA rapides.

## Application

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp -r combine-lore-upgrade/scripts ./scripts
cp combine-lore-upgrade/package.tauri.patch.json ./
cp combine-lore-upgrade/README_STEP43_PREMIUM_NEW_GAME_INTAKE.md ./
node scripts/apply-tauri-package-patch.mjs
npm install
npm run audit:newgame
npm run check:modules
npm run dev
```

## Commit conseillé

```bash
git add src scripts package.tauri.patch.json README_STEP43_PREMIUM_NEW_GAME_INTAKE.md COAN_FINAL_AUDIT_REPORT.md
git commit -m "Add premium COAN new game intake screen"
git push
```
