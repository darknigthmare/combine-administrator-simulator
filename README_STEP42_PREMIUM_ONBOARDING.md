# STEP 42 — Tutoriel d’intro premium / onboarding COAN

Cette passe ajoute un vrai module de démarrage guidé pour éviter que le joueur soit noyé par les nombreux systèmes de l’application.

## Nouveaux fichiers

```text
src/data/onboarding.ts
src/systems/onboardingSystem.ts
src/components/OnboardingScreen.tsx
scripts/coan-onboarding-audit.mjs
README_STEP42_PREMIUM_ONBOARDING.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/data/terminalInterfaces.ts
src/data/systemAudit.ts
src/App.tsx
src/index.css
scripts/audit-upgrade-pack.mjs
package.tauri.patch.json
```

## Nouveau module

```text
Tutoriel COAN
```

Il est disponible dans le **City Terminal** et ajoute :

- briefing interactif COAN ;
- pistes guidées de nouvelle partie ;
- progression d’apprentissage ;
- modules recommandés ;
- première journée scriptée ;
- raccourcis vers les systèmes essentiels ;
- journal d’intake COAN ;
- migration des anciennes sauvegardes.

## Pistes guidées ajoutées

```text
Mandat standard — administrateur de City
Intake Quarantine — période Alyx
Black File — Nova Prospekt
Survie Uprising — corridor Citadel
Double jeu — humanité préservée
```

Chaque piste définit :

- City recommandée ;
- campagne ;
- scénario ;
- timeline ;
- profil de gouvernance ;
- difficulté ;
- onglet de départ ;
- lignes de briefing ;
- risques pédagogiques.

## Chapitres de briefing

```text
Mandat COAN : administrer, pas sauver
Carte connectée : les crises passent par les routes
Population : la loyauté n’est pas l’obéissance
Escalade Combine : force, coût, dette
Nova Prospekt : le secret est une ressource
Xen : biosphère, hôtes et mémoire organique
Rapports : dossier réel contre transmission Citadel
Première journée scriptée : ne pas tout ouvrir
```

## Première journée scriptée

La journée guidée applique une ouverture prudente :

```text
lecture COAN
inspection d’un secteur critique
rationnement modéré
BreenCast mesuré
politique de rapport prudente
lecture de l’historique
```

Elle applique de petits effets d’apprentissage : plus d’information, un peu de stabilité, moins de fatigue, sans court-circuiter les systèmes existants.

## Audit ajouté

Après application du patch `package.json` :

```bash
npm run audit:onboarding
```

Ou directement :

```bash
node scripts/coan-onboarding-audit.mjs
```

## Validation locale

```bash
npx tsc -p tsconfig.modules.json --noEmit
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step42.js
node scripts/coan-onboarding-audit.mjs
node scripts/audit-upgrade-pack.mjs
```

## Application dans ton repo

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp -r combine-lore-upgrade/scripts ./scripts
cp combine-lore-upgrade/package.tauri.patch.json ./
cp combine-lore-upgrade/README_STEP42_PREMIUM_ONBOARDING.md ./
node scripts/apply-tauri-package-patch.mjs
npm install
npm run audit:onboarding
npm run check:modules
npm run dev
```

## Commit conseillé

```bash
git add src scripts package.tauri.patch.json README_STEP42_PREMIUM_ONBOARDING.md
git commit -m "Add premium COAN onboarding tutorial"
git push
```
