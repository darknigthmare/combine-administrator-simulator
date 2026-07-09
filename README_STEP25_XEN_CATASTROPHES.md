# Étape 25 — Catastrophes Xen rares

Cette passe ajoute un module **Catastrophes Xen** au simulateur Combine Administrator.

Contrairement aux jauges Xen progressives des étapes précédentes, ce système suit des ruptures biologiques majeures qui peuvent transformer un secteur entier :

- Tentacle industriel ;
- alarme Gonarch / nœud reproductif parasite ;
- migration massive Antlion ;
- Razor Train contaminé ;
- ancien hôpital transformé en nid ;
- effondrement organique souterrain ;
- retour de flamme Headcrab Shell ;
- brèche Ichthyosaur dans les canaux ;
- bloom Barnacle de plafond ;
- évasion de spécimen Nova Prospekt.

## Fichiers ajoutés

```text
src/data/xenCatastrophes.ts
src/systems/xenCatastropheSystem.ts
README_STEP25_XEN_CATASTROPHES.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Nouveau module

Un onglet est ajouté :

```text
Catastrophes Xen
```

Il affiche :

- risque global de catastrophe ;
- nombre de crises actives ;
- risque citywide ;
- alerte Advisor ;
- probabilité Ravenholm-like ;
- liste des scénarios catastrophiques ;
- stade de chaque événement ;
- secteur concerné ;
- opérations d’urgence.

## Stades d’escalade

Chaque événement passe par :

```text
watch → warning → active → citywide → catastrophic
```

La transition dépend de :

- la biosphère Xen dynamique ;
- les chaînes de mutation ;
- les zones de quarantaine ;
- la recherche Xen ;
- Nova Prospekt ;
- les Vortigaunts/Biotics ;
- les stats globales : Xen, Combine, info, fatigue, suspicion.

## Doctrines ajoutées

```text
Verrouillage préventif
Confinement classifié
Sacrifice sectoriel
Exploitation offensive
Masque sanitaire public
Lecture Vortessence d’urgence
```

## Opérations ajoutées

```text
Déployer containment lourd
Ordre de scellement Advisor
Ligne Thumper d’urgence
Évacuer personnel clé
Brûler noyau de nid
Sectionner manifeste Razor
Nettoyage déni Headcrab Shell
Stabilisation Vortessence
Attribuer la crise à Lambda
Abandonner secteur / dossier noir
Lockdown Nova-Bio
Exercice rupture de confinement
```

## Effets gameplay

- Les catastrophes peuvent modifier directement les secteurs.
- Une escalade peut dégrader infrastructures, population, peur, loyauté et suspicion.
- Certaines catastrophes augmentent fortement le risque Ravenholm-like.
- La recherche Xen et les Headcrab Shells peuvent devenir des facteurs de retour de flamme.
- Nova Prospekt peut absorber un dossier, mais devient aussi source potentielle de rupture biologique.
- Les Vortigaunts peuvent aider à lire les signaux Xen, au prix d’un risque Advisor et Lambda.

## Application

Depuis la racine de ton repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP25_XEN_CATASTROPHES.md ./
npm run dev
```

## Validation faite

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step25.js
```
