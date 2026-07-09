# Step 16 — Arbre de directives Citadel

Cette étape ajoute un vrai arbre de doctrines permanentes à l'écran **Citadel Directives**.

## Nouveaux fichiers

```text
src/data/citadelDirectiveTree.ts
src/systems/citadelDirectiveTreeSystem.ts
README_STEP16_CITADEL_DIRECTIVE_TREE.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Branches ajoutées

- Continuité industrielle
- Répression civique
- Quarantaine Xen
- BreenCast / doctrine civique
- Nova Prospekt
- Transhuman Arm
- Contrôle biologique
- Supervision Advisor

Chaque branche contient 5 protocoles progressifs, soit 40 protocoles permanents.

## Fonctionnement

Un protocole :

- a des prérequis ;
- a un coût administratif ou matériel ;
- applique des effets immédiats ;
- applique des effets quotidiens permanents ;
- augmente plus ou moins la pression Advisor ;
- déverrouille des capacités textuelles/lore.

Exemple :

```text
Répression civique → Couvre-feu par bloc → Quotas anti-citoyens → Punition collective → Mandat Overwatch → Ordonnance Strider
```

## Impact gameplay

L’ancienne directive courte existe toujours, mais elle devient un objectif temporaire.
L'arbre Citadel représente maintenant l’orientation profonde de City : production, terreur, quarantaine, propagande, Nova Prospekt, conversion transhumaine, biocontrôle ou survie sous Advisor.

À chaque fin de journée, les protocoles actifs modifient les stats de City.

## Validation

Commandes testées :

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step16.js
```
