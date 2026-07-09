# STEP 23 — Zones de quarantaine évolutives

Cette étape ajoute un vrai système de **quarantaine biologique évolutive** au simulateur Combine Administrator.

Xen ne transforme plus seulement une jauge ou une couche biologique : chaque secteur contaminé peut maintenant devenir un dossier administratif complet, avec statut, civils piégés, secret public, niveau de containment, mémoire Ravenholm-like et risque de contradiction politique.

## Fichiers ajoutés

```txt
src/data/quarantineZones.ts
src/systems/quarantineZoneSystem.ts
README_STEP23_EVOLVING_QUARANTINE_ZONES.md
```

## Fichiers modifiés

```txt
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Nouveaux statuts de quarantaine

```txt
Surveillance sanitaire
Quarantaine partielle
Quarantaine totale
Zone scellée
Zone abandonnée
Zone organique
Zone perdue
Ravenholm-like
```

Chaque statut possède :

```txt
label civil
label Combine
sévérité
masque public
résultat lore
rôle administratif
```

## Nouvelle doctrine de quarantaine

L’écran Xen / Quarantaine contient maintenant une doctrine active dédiée :

```txt
Confinement déclaré
Scellement silencieux
Production malgré biosignaux
Brûler et effacer
Masque humanitaire Biotics
Déni Ravenholm
```

Ces doctrines modifient :

```txt
progression des statuts
secrétisation
coût civil
coût industriel
risque Advisor
peur / loyauté / suspicion
```

## Nouvelles opérations

Opérations secteur :

```txt
Élever surveillance sanitaire
Basculer en quarantaine partielle
Quarantaine totale de secteur
Sceller accès et conduits
Évacuation contrôlée
Purge thermique de zone
Déclarer zone d’exclusion
Ouvrir dossier noir Ravenholm-like
```

Opérations réseau :

```txt
Grille sanitaire inter-secteurs
Embargo familles de disparus
Reconnaissance Biotic sous escorte
Protocole post-Headcrab Shell
```

## Ce que ça change en gameplay

- Une zone contaminée peut empirer progressivement jusqu’à devenir perdue.
- Les civils piégés deviennent une dette morale et politique.
- Les rapports publics peuvent masquer une zone, mais la contradiction publique monte.
- Les zones organiques abîment infrastructure, production et loyauté locale.
- Les zones Ravenholm-like deviennent un traumatisme narratif durable.
- Les Biotics/Vortigaunts peuvent limiter le désastre, mais augmentent l’attention Advisor.
- Le dashboard affiche maintenant le résumé des zones de quarantaine.
- Les rapports de fin de journée listent les secteurs les plus critiques.

## Validation

Validation effectuée :

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step23.js
```

## Application

Depuis la racine du repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP23_EVOLVING_QUARANTINE_ZONES.md ./
npm run dev
```

## Commit suggéré

```bash
git add src README_STEP23_EVOLVING_QUARANTINE_ZONES.md
git commit -m "Add evolving Xen quarantine zone system"
git push
```
