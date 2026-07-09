# Step 20 — Vortigaunts / Biotics

Cette passe ajoute un module complet **Vortigaunts / Biotics** à `combine-administrator-simulator`.

## Nouveaux fichiers

```text
src/data/vortigaunts.ts
src/systems/vortigauntSystem.ts
README_STEP20_VORTIGAUNTS_BIOTICS.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Ce que le module ajoute

Le jeu ne traite plus les Vortigaunts comme un simple bonus de la Résistance. Ils deviennent une couche de simulation à part entière :

- **Biotics asservis** par les Combine ;
- **cohortes Nova Prospekt** soumises à pression et traitement ;
- **handlers de quarantaine** capables de lire certains cycles Xen ;
- **cercles libres cachés** dans les égouts ;
- **cercles de soin Lambda** liés à la Résistance ;
- **groupes de résonance Xen** utilisés comme détecteurs biologiques non humains.

## Indicateurs ajoutés

Le nouvel onglet affiche :

- Vortessence ;
- pression Biotics ;
- lecture Xen ;
- aide quarantaine ;
- lien Lambda ;
- risque évasion ;
- intérêt Advisor ;
- abus Nova Prospekt.

## Doctrines jouables

```text
Contrôle Biotic productif
Suppression Vortessence
Coopération de quarantaine contrôlée
Extraction Nova Prospekt
Coexistence silencieuse
Libérations clandestines filtrées
```

Chaque doctrine modifie les groupes Vortigaunts, les stats globales et le risque Advisor.

## Opérations ajoutées

```text
Réaffecter Biotics vers quarantaine
Extraction de renseignement Vortessence
Supprimer cycle de chant
Transfert Biotics vers Nova Prospekt
Autoriser soins contrôlés
Marché avec cercle libre
Fausse libération piège
Rompre lien Lambda/Vortigaunt
Libération clandestine filtrée
Rotation de travail Biotics
```

Certaines opérations affectent aussi :

- Nova Prospekt ;
- factions Lambda ;
- Xen ;
- suspicion Citadel ;
- loyauté civile ;
- production.

## Simulation quotidienne

À chaque clôture de journée, le moteur calcule :

- évolution des groupes Vortigaunts ;
- pression causée par Nova Prospekt ;
- attraction Lambda/Vortessence ;
- aide ou perte de contrôle face à Xen ;
- risque d’évasion ;
- intérêt Advisor ;
- vision fragmentaire COAN.

Les rapports journaliers reçoivent maintenant des lignes du type :

```text
Vortigaunts/Biotics : 40 captifs, 14 libres estimés, cohérence Vortessence 62%.
Aide quarantaine 71% / pression Nova-Biotics 58% / risque évasion 63%.
Vision COAN : spores, plafond humide, voix humaines transformées dans un ancien couloir médical.
```

## Validation effectuée

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step20.js
```

## Installation

Depuis la racine du repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cpy combine-lore-upgrade/README_STEP20_VORTIGAUNTS_BIOTICS.md ./
npm run dev
```

Puis commit :

```bash
git add src README_STEP20_VORTIGAUNTS_BIOTICS.md
git commit -m "Add Vortigaunts and Biotics management system"
git push
```
