# STEP 22 — Mutations et chaînes biologiques Xen

Cette passe ajoute un système de **chaînes biologiques cause/effet** au-dessus de l'écosystème Xen dynamique.

Avant cette étape, Xen possédait déjà des couches écologiques : spores, biomasse murale, nids headcrab, barnacles, tunnels organiques, colonies antlion, infection humaine et faune errante.

Maintenant, ces couches peuvent former des chaînes précises et lore-friendly :

- `headcrab + civil = zombie classique`
- `fast headcrab + hôte paniqué = fast zombie`
- `poison headcrab + zone dense = poison zombie / crise sanitaire`
- `spores + hôpital = surge mutagénique`
- `barnacle bloom + tunnel = verrou logistique`
- `antlion + périphérie/vibrations = ruche`
- `biomasse + tunnels = métastase organique`
- `faune aquatique + canaux = prédation Ichthyosaur`
- `faune errante + cadavres = boucle charognarde`
- `nid headcrab dominant + mutation haute = alarme Gonarch / catastrophe rare`

## Fichiers ajoutés

```text
src/data/xenMutationChains.ts
src/systems/xenMutationChainsSystem.ts
README_STEP22_XEN_MUTATION_CHAINS.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Nouveaux types principaux

```ts
XenMutationChainId
XenMutationStage
XenMutationPolicyId
XenMutationOperationId
XenMutationChainDefinition
XenMutationChainState
XenMutationPolicy
XenMutationOperation
XenMutationState
```

## État ajouté au GameState

```ts
xenMutation: XenMutationState;
```

## Chaînes biologiques ajoutées

```text
Conversion zombie classique
Conversion fast zombie
Conversion poison zombie
Mutation par floraison de spores
Surge mutagénique hospitalier
Verrou logistique barnacle
Émergence de ruche antlion
Métastase de tunnels organiques
Prédation aquatique Ichthyosaur
Boucle charognarde de faune errante
Alarme Gonarch / nid maternel
```

## Doctrines mutation ajoutées

```text
Triage hôtes prioritaire
Déni parasite agressif
Brûlage des sites mutagéniques
Récolte d’échantillons mutagéniques
Masque humanitaire de triage
Lecture Vortessence encadrée
```

## Opérations ajoutées

```text
Balayage des hôtes potentiels
Décapiter chaîne parasite
Confinement fast zombie
Lock biohazard poison
Stériliser cluster hospitalier
Nettoyer goulot Barnacle
Déployer grille Thumper
Effondrer tunnel mutagénique
Purge des prédateurs aquatiques
Capturer échantillon mutagénique
Lecture de chaîne Vortessence
Déclarer zone de déni Ravenholm-like
```

## Gameplay ajouté

Chaque fin de journée calcule maintenant :

- si les couches Xen créent de nouvelles chaînes ;
- la progression de chaque chaîne ;
- son stade : latente, déclenchée, accélération, flambée, catastrophique ;
- le pool d’hôtes disponibles ;
- la charge de conversion ;
- la charge de mutation ;
- le containment local ;
- les pertes civiles/Combine liées ;
- la pression de quarantaine ;
- le risque Ravenholm-like.

Le système s’appuie sur :

- `xenEcosystem` ;
- population détaillée ;
- exposition Xen par secteur ;
- rations/fatigue ;
- Vortigaunts/Biotics ;
- surveillance Combine ;
- état des secteurs.

## UI

L’écran **Quarantaine Xen** affiche maintenant aussi :

- pression des chaînes ;
- conversion humaine ;
- risque de flambée ;
- dette de quarantaine ;
- doctrine mutation active ;
- liste des chaînes biologiques ;
- dossier de chaîne sélectionnée ;
- opérations mutation ciblées, secteur ou réseau ;
- log des chaînes mutagéniques.

## Validation effectuée

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step22.js
```

## Installation

Depuis la racine du repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP22_XEN_MUTATION_CHAINS.md ./
npm run dev
```

## Commit conseillé

```bash
git add src README_STEP22_XEN_MUTATION_CHAINS.md
git commit -m "Add Xen mutation chain simulation"
git push
```
