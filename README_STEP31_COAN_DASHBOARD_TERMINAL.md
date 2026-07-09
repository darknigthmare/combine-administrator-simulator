# STEP 31 — Refonte Dashboard façon terminal COAN complet

Cette passe transforme l'onglet Dashboard en **centre de monitoring Combine**. Il ne s'agit plus d'une simple page résumé : c'est une interface de commandement qui agrège les systèmes créés aux étapes précédentes.

## Fichiers ajoutés

```text
src/data/dashboardTerminal.ts
src/systems/dashboardTerminalSystem.ts
README_STEP31_COAN_DASHBOARD_TERMINAL.md
```

## Fichiers modifiés

```text
src/App.tsx
src/data/index.ts
src/index.css
```

## Nouveautés UI

L'onglet `Dashboard` devient `Terminal COAN` dans la navigation.

Le nouvel écran affiche :

- statut COAN global ;
- directive active / crise active / verdict final ;
- recommandation opérationnelle prioritaire ;
- ticker terminal en temps réel ;
- mini-carte persistante de City avec secteurs chauds ;
- flux d'alertes priorisées ;
- canaux de transmission Citadel / BreenCast / Nova / Quarantine / COAN ;
- dossiers administratifs multi-systèmes ;
- ordres COAN recommandés ;
- snapshot BreenCast ;
- suivi objectifs de campagne ;
- dernier rapport réel/transmis ;
- résumé du directeur événementiel.

## Systèmes pris en compte

Le dashboard lit maintenant :

```text
stats globales
secteurs connectés
campagne longue
objectifs multiples
rapports falsifiés
audit Advisor
Nova Prospekt
rationnement
Civil Protection
résistance Lambda avancée
factions de Résistance
Vortigaunts / Biotics
écosystème Xen
mutations Xen
quarantaines évolutives
recherche Xen
catastrophes Xen
événements majeurs
BreenCast dynamique
atmosphère visuelle
```

## Logique COAN ajoutée

Le fichier `dashboardTerminalSystem.ts` calcule :

- menace Lambda prioritaire ;
- menace Xen prioritaire ;
- chaleur Citadel/Advisor ;
- visibilité Nova Prospekt ;
- instabilité rationnement ;
- dérive Civil Protection ;
- risque mandat/objectifs ;
- chaleur événementielle majeure ;
- secteur le plus critique ;
- intégrité des transmissions.

Chaque alerte est reliée à un onglet cible. Depuis le dashboard, l'utilisateur peut donc ouvrir directement :

```text
Résistance
Quarantaine Xen
Rapports falsifiés
Nova Prospekt
Rationnement
Civil Protection
Citadel Directives
Événements majeurs
BreenCast
Carte de City
```

## Installation

Depuis la racine du repo existant :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP31_COAN_DASHBOARD_TERMINAL.md ./
npm run dev
```

## Validation effectuée

```bash
npx tsc -p tsconfig.modules.json --noEmit
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step31.js
```

## Commit conseillé

```bash
git add src README_STEP31_COAN_DASHBOARD_TERMINAL.md
git commit -m "Refactor dashboard into full COAN terminal"
git push
```
