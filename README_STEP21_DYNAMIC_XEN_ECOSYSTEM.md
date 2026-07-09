# Step 21 — Écosystème Xen dynamique

Cette passe transforme Xen d'une simple jauge globale en biosphère multi-couches qui se propage réellement dans City.

## Fichiers ajoutés

```text
src/data/xenEcosystem.ts
src/systems/xenEcosystemSystem.ts
README_STEP21_DYNAMIC_XEN_ECOSYSTEM.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Ce que ça ajoute

L'onglet **Quarantaine Xen** devient maintenant un module d'écologie dynamique.

Au lieu de seulement lire `stats.xen`, le jeu suit maintenant des couches biologiques :

```text
spores
biomasse murale
nids de headcrabs
barnacle bloom
tunnels organiques
colonies antlion
prédateurs aquatiques / ichthyosaur wetland
infection humaine
faune errante Xen
```

Chaque couche possède :

```text
secteur
stade : trace, active, bloom, dominante, zone perdue
biomasse
activité
propagation
confinement
pression mutation
exposition humaine
découverte ou non
dernier incident
```

## Nouvelles doctrines Xen

```text
Confinement équilibré
Protocole brûlage spores
Déni parasite headcrab
Suppression colonies antlion
Récolte spécimens contrôlée
Abandon de zones organiques
Cartographie Vortessence contrôlée
```

Ces doctrines modifient la biosphère et les stats globales.

Exemples :

```text
Déni parasite headcrab
- baisse headcrabs / infection humaine
- augmente peur
- baisse loyauté
- augmente pertes civiles
```

```text
Récolte spécimens contrôlée
- augmente production et faveur Citadel
- augmente mutation, suspicion et risque Advisor
```

```text
Cartographie Vortessence contrôlée
- réduit les surprises Xen
- utilise les Biotics / Vortigaunts
- augmente risque politique et lien Lambda
```

## Nouvelles opérations

```text
Balayage bioscanner mobile
Stérilisation thermique
Raclage plafond Barnacle
Déni nid headcrab
Grille thumper anti-antlion
Effondrer tunnel organique
Triage évacuation humaine
Leurre biologique anti-Lambda
Lecture Vortessence encadrée
Récolte spécimen contrôlée
```

## Simulation quotidienne

Chaque fin de journée calcule maintenant :

```text
croissance biomasse
propagation par connexions de secteurs
pression spores
pression parasites / headcrabs
pression antlion
infection humaine
faune errante
mutation
niveau de containment
risque de secteur perdu
impact infrastructure
pertes civiles
pertes Combine
```

Les couches très propagatrices peuvent maintenant ensemencer des secteurs voisins via les connexions existantes de la carte.

Exemple :

```text
Égouts techniques → Ancien hôpital via conduite médicale humide
Zone de quarantaine → Périphérie contaminée via lisière biologique
Canaux → Égouts via déversoirs inondés
```

## Effets gameplay

- Ignorer Xen crée des couches biologiques persistantes.
- Les spores passent mieux par ventilation, hôpitaux et zones humides.
- Les nids de headcrabs augmentent la conversion humaine.
- Les barnacles bloquent canaux et couloirs techniques.
- Les tunnels organiques créent des routes non cartographiées.
- Les colonies antlion menacent industrie et périphérie.
- Les Vortigaunts/Biotics peuvent aider à lire les signaux Xen.
- La recherche Combine peut exploiter Xen, mais augmente mutation et suspicion.

## Validation effectuée

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step21.js
```

## Installation

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP21_DYNAMIC_XEN_ECOSYSTEM.md ./
npm run dev
```

## Commit conseillé

```bash
git add src README_STEP21_DYNAMIC_XEN_ECOSYSTEM.md
git commit -m "Add dynamic Xen ecosystem simulation"
git push
```
