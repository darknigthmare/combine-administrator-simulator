# Step 4 — Pack de 100 événements lore Half-Life

Cette étape ajoute un vrai catalogue événementiel pour que la simulation ne tourne plus sur quelques crises répétées.

## Fichiers ajoutés/modifiés

- `src/data/crisisEvents.ts` : catalogue complet de 100 événements structurés.
- `src/systems/eventDirector.ts` : directeur d'événements pondéré par l'état réel de la ville.
- `src/types/game.ts` : type `Crisis` enrichi avec sévérité, tags lore, conséquences, types supplémentaires.
- `src/App.tsx` : utilise le directeur d'événements au lieu d'un simple tirage brut.
- `src/index.css` : affichage des tags lore, sévérité et résumé du catalogue.

## Répartition du catalogue

- 30 événements Résistance / Lambda.
- 30 événements Xen / quarantaine / parasites / biosphère.
- 20 événements civils / rationnement / propagande / fatigue sociale.
- 10 événements Citadel / Combine / Advisor / Breencast.
- 10 crises morales lourdes.

## Logique ajoutée

Le nouveau `pickDirectedCrisis` choisit les événements selon :

- l'activité rebelle globale ;
- la contamination Xen globale ;
- la loyauté et la fatigue civile ;
- la suspicion Advisor ;
- l'énergie Citadel ;
- l'état du secteur lié à l'événement ;
- la gravité de l'événement ;
- un bruit déterministe basé sur le jour.

Exemples :

- Si Xen monte, les événements headcrab, barnacle, antlion, spores et quarantaine deviennent plus probables.
- Si la loyauté chute et les rations sont basses, les événements civils se multiplient.
- Si la suspicion augmente, les inspections Advisor, audits Citadel et falsifications deviennent plus probables.
- Si la Résistance monte, les événements Lambda, canaux, radios pirates, safehouses et sabotage deviennent dominants.

## Application

Copier le contenu du dossier `combine-lore-upgrade/src` dans le `src` du projet :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP4_100_LORE_EVENTS.md ./
npm run dev
```

## Commit conseillé

```bash
git add src README_STEP4_100_LORE_EVENTS.md
git commit -m "Add 100 lore-driven Half-Life crisis events"
git push
```

## Suite préparée

Cette étape prépare l'étape 5 : rapports falsifiables / mensonge administratif.
Le catalogue contient déjà les événements et tags nécessaires pour détecter les cas où l'administrateur ment à la Citadel, couvre une purge, maquille une quarantaine ou efface des pertes civiles.
