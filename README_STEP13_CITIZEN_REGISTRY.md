# Step 13 — Dossiers citoyens / registre civil individuel

Cette étape ajoute un registre civil représentatif, fidèle à la logique administrative Combine : chaque citoyen important peut devenir un levier de contrôle, un faux positif, une source, un suspect Lambda, un exposé Xen ou un transfert Nova Prospekt.

## Fichiers ajoutés

- `src/data/citizenRegistry.ts`
- `src/systems/citizenRegistry.ts`
- `README_STEP13_CITIZEN_REGISTRY.md`

## Fichiers modifiés

- `src/types/game.ts`
- `src/data/index.ts`
- `src/App.tsx`
- `src/components/DedicatedScreens.tsx`
- `src/index.css`

## Fonctionnalités

Nouvel onglet : **Registre Civil**.

Chaque dossier contient :

- ID citoyen ;
- nom ;
- secteur assigné ;
- statut civil ;
- âge approximatif ;
- affectation de travail ;
- statut ration ;
- loyauté ;
- peur ;
- risque anti-citoyen ;
- fiabilité ;
- liens familiaux ;
- dernier contrôle Civil Protection ;
- flag Nova Prospekt ;
- exposition Xen ;
- marqueurs de risque ;
- notes COAN ;
- historique.

## Statuts ajoutés

- Conforme ;
- Neutre ;
- Suspect anti-citoyen ;
- Informateur CP ;
- Collaborateur civil ;
- Sympathisant Lambda ;
- Exposé Xen ;
- Transféré Nova Prospekt ;
- Décédé / dossier clos.

## Marqueurs de risque

- défaut de rationnement ;
- contact radio pirate ;
- proximité tunnels/canaux ;
- famille disparue ;
- témoin d’abus CP ;
- contact Xen ;
- contact Vortigaunt ;
- accès industriel ;
- flag Nova Prospekt ;
- risque de fausse dénonciation.

## Actions administratives

- bonus de ration conditionnel ;
- interrogatoire Civil Protection ;
- recrutement informateur ;
- marquage Nova Prospekt ;
- transfert Nova Prospekt immédiat ;
- quarantaine médicale ;
- falsification/effacement dossier ;
- récompense publique de conformité.

## Simulation quotidienne

À chaque fin de journée :

- les dossiers suspects peuvent basculer vers sympathie Lambda ;
- les zones Xen augmentent l’exposition biologique ;
- les dossiers trop risqués peuvent recevoir un flag Nova Prospekt ;
- les informateurs peu fiables augmentent les risques de fausse dénonciation ;
- le registre influence information, suspicion et activité rebelle.

## Installation

Depuis la racine du dépôt :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP13_CITIZEN_REGISTRY.md ./
npm run dev
```

## Commit conseillé

```bash
git add src README_STEP13_CITIZEN_REGISTRY.md
git commit -m "Add individual citizen registry dossiers"
git push
```
