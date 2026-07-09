# Step 14 — Informateurs et réseau de délation

Cette passe ajoute un vrai système de sources civiles Civil Protection / COAN au simulateur Combine Administrator.

## Fichiers ajoutés

```text
src/data/informantNetwork.ts
src/systems/informantNetwork.ts
README_STEP14_INFORMANT_NETWORK.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Nouvel onglet

```text
Informateurs
```

## Fonctionnalités ajoutées

- Réseau d'informateurs persistant dans `GameState`.
- Sources civiles avec nom de code, couverture, motivation, fiabilité, risque, exposition Lambda et tendance aux fausses dénonciations.
- Doctrine active du réseau de délation.
- Simulation quotidienne des dénonciations.
- Distinction entre rapports exploitables et faux rapports opportunistes.
- Sources compromises par contre-renseignement Lambda.
- Dépense de rations en primes de délation.
- Backlash social si le système devient trop brutal ou trop mensonger.
- Impact direct sur info control, peur, loyauté, fatigue, rébellion, suspicion et rations.

## Doctrines ajoutées

```text
Prime de ration civique
Pression familiale contrôlée
Taupes CP dans les files Lambda
Dossiers silencieux
Double jeu Lambda surveillé
Délation par terreur
```

## Opérations ajoutées

```text
Recruter depuis le Registre Civil
Valider les sources existantes
Fausse cache Lambda
Purger les fausses accusations
Protéger familles de sources
Menace Nova Prospekt ciblée
Retourner un coursier Lambda
Récompense publique exemplaire
```

## Logique lore

Le système représente la délation comme une mécanique Combine cohérente : les citoyens ne dénoncent pas seulement par loyauté, mais aussi pour des rations, par peur, par privilège, par vengeance, par coercition ou parce qu'ils jouent double jeu pour Lambda.

Plus la ville est affamée et terrifiée, plus le réseau grossit. Mais plus il grossit vite, plus il produit de faux dossiers, de la paranoïa et des familles de disparus qui renforcent la radicalisation rebelle.

## Validation

Commandes exécutées :

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step14.js
```
