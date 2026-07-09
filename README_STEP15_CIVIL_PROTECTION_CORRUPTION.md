# Step 15 — Corruption et brutalité de la Civil Protection

Cette passe ajoute une couche profonde à la Civil Protection : les Metro Cops ne sont plus seulement des unités de maintien de l’ordre. Ils deviennent une administration humaine collaboratrice, corruptible, brutale, infiltrable et politiquement dangereuse.

## Fichiers ajoutés

```text
src/data/civilProtection.ts
src/systems/civilProtectionSystem.ts
README_STEP15_CIVIL_PROTECTION_CORRUPTION.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Nouveaux concepts

Chaque poste Civil Protection possède maintenant :

```text
officiers
discipline
brutalité
corruption
moral
influence Lambda
fuite de rations
rapports d’abus
fausses accusations
arrestations du jour
rations saisies ou détournées
agents compromis
dernier incident
```

## Doctrines CP ajoutées

```text
Maintien d’ordre réglementé
Quotas anti-citoyens
Extorsion de rations tolérée
Privilèges loyalistes CP
Audit interne CP
Patrouilles de terreur
```

Chaque doctrine influence :

```text
brutalité
corruption
suppression rebelle
perte de loyauté civile
risque d’audit
fuite de rations
```

## Opérations ajoutées

```text
Balayage disciplinaire interne
Punir agents indisciplinés
Étendre contrôles et fouilles
Enquête sur fuite de rations
Utiliser escouade zélée
Placer observateurs COAN
Transférer agents compromis
Mise en scène de retenue publique
```

Ces opérations ciblent le poste CP du secteur sélectionné.

## Effets gameplay

- Une CP brutale réduit l’activité rebelle immédiate, mais augmente la mémoire traumatique civile.
- Une CP corrompue vole ou détourne les rations, nourrit le marché noir et baisse la loyauté.
- Les fausses accusations réduisent la fiabilité du renseignement.
- Les agents compromis augmentent l’infiltration Lambda dans l’appareil administratif.
- Les audits internes stabilisent les postes mais réduisent temporairement l’efficacité répressive.
- Nova Prospekt peut être utilisé pour retirer des agents compromis, avec coût politique.

## Validation effectuée

```bash
npx tsc -p tsconfig.modules.json
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step15.js
```

## Application

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP15_CIVIL_PROTECTION_CORRUPTION.md ./
npm run dev
```

## Commit suggéré

```bash
git add src README_STEP15_CIVIL_PROTECTION_CORRUPTION.md
git commit -m "Add Civil Protection corruption and brutality system"
git push
```
