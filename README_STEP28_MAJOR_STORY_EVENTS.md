# STEP 28 — Événements scénarisés majeurs

Cette étape ajoute un **Major Story Director** : un système de jalons narratifs lourds qui transforme les campagnes en arcs Half-Life plus structurés.

## Nouveaux fichiers

```text
src/data/majorStoryEvents.ts
src/systems/majorStoryEventSystem.ts
README_STEP28_MAJOR_STORY_EVENTS.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Nouveau module UI

Un nouvel onglet est ajouté :

```text
Événements majeurs
```

Il affiche :

- chaleur narrative de City ;
- événements majeurs non résolus ;
- pression Advisor ;
- contradiction publique ;
- momentum Lambda ;
- pression Xen ;
- risque blackout Citadel ;
- doctrine active de gestion narrative ;
- arc dominant ;
- opérations recommandées ;
- journal scénarisé COAN.

## Événements majeurs ajoutés

```text
Arrivée d’un Advisor
Explosion d’un relais BreenCast
Perte d’un Razor Train
Évasion Nova Prospekt
Révolte interne Civil Protection
Faille Xen majeure
Assaut Lambda coordonné
Blackout local de la Citadelle
Pic de résonance Vortessence
Exposition publique Headcrab Shell
```

Chaque jalon possède :

- catégorie ;
- trigger ;
- signaux faibles ;
- secteurs préférés ;
- campagnes/timelines favorables ;
- chaleur ;
- secret ;
- containment ;
- visibilité publique ;
- attention Advisor ;
- opportunité Lambda ;
- instabilité Xen ;
- effets statistiques ;
- effets de secteur ;
- payoff narratif ;
- tags lore.

## Stades

```text
dormant
pré-alerte
actif
point de rupture
contenu
échec narratif
```

Un événement peut passer de simple signal faible à crise urbaine majeure si la pression correspondante monte.

## Doctrines ajoutées

```text
Censure préventive COAN
Escalade Overwatch immédiate
Délai classifié / dossier noir
Divulgation contrôlée sanitaire
Soumission directe Advisor
Détournement humanitaire clandestin
```

## Opérations ajoutées

```text
Lockdown de réception Advisor
Restauration forcée BreenCast
Sectionner manifeste Razor
Protocole chasse Nova Prospekt
Purger meneurs CP
Sceller faille Xen
Briser synchronisation Lambda
Récit de couverture dossier noir
Verrou sacrificiel de secteur
Évacuation civile silencieuse
```

## Intégrations système

Le système lit maintenant les autres modules :

- `campaign` et `campaignMission` ;
- `auditHeat` et rapports falsifiés ;
- `novaProspekt` ;
- `civilProtection` ;
- `resistanceNetwork` ;
- `resistanceFactions` ;
- `vortigaunts` ;
- `xenEcosystem` ;
- `xenMutation` ;
- `quarantineZones` ;
- `xenResearch` ;
- `xenCatastrophes` ;
- `combineTechnology`.

Exemples :

- si la suspicion et l’audit montent, l’arrivée d’un Advisor devient probable ;
- si BreenCast/info s’effondrent, un relais peut exploser ou être saboté ;
- si Nova Prospekt devient instable, une évasion ou mémoire de disparus peut devenir un arc majeur ;
- si Civil Protection est corrompue/infiltrée, une mutinerie locale peut apparaître ;
- si Xen, mutation, recherche et catastrophes montent, une faille Xen majeure ou une exposition Headcrab Shell peut basculer la campagne ;
- si Lambda est coordonné, un assaut multi-secteur peut dépasser les événements aléatoires classiques.

## Validation

Validation effectuée :

```bash
npx tsc -p tsconfig.modules.json --noEmit
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step28.js
```
