# Step 34 — Sons synthétiques avancés

Cette passe ajoute une couche audio synthétique avancée à Combine Administrator Simulator, sans utiliser d'assets officiels Half-Life.

## Objectif

Transformer l'ancien système de petits bips Web Audio en un vrai **directeur audio COAN** capable de choisir automatiquement un signal selon l'état de City :

- Scanner synthétique pour Civil Protection / surveillance.
- Alarme Citadel pour effondrement, audit critique ou fin de partie.
- Drone Xen pour contamination, mutations et biosphère hostile.
- Basse Advisor pour audit, suspicion et jugement supérieur.
- Sirène couvre-feu pour répression et soulèvement Lambda.
- Chime BreenCast pour propagande et transmissions civiques.
- Grondement Razor Train pour transferts Nova Prospekt / rail contaminé.
- Verrou Nova Intake pour détention, manifestes et Biotics.
- Rattle Manhack pour zones confinées et répression CP.
- Footfall Strider pour escalade Overwatch.
- Accord Vortessence pour Vortigaunts / Biotics / lecture Xen.

## Fichiers ajoutés

```text
src/data/syntheticAudioCues.ts
src/systems/syntheticAudioSystem.ts
README_STEP34_ADVANCED_SYNTH_AUDIO.md
```

## Fichiers modifiés

```text
src/types/game.ts
src/data/index.ts
src/systems/atmosphereSystem.ts
src/components/AtmosphereLayer.tsx
src/App.tsx
src/index.css
```

## Nouveaux paramètres audio

Le type `AtmosphereSettings` contient maintenant :

```text
advancedAudioEnabled
ambientDrone
eventCues
uiCues
bassResponse
distortion
audioComplexity
cueCooldownMs
```

Les anciennes sauvegardes restent compatibles via `mergeAtmosphereSettings`.

## Fonctionnement

`buildSyntheticAudioDirector(game, atmosphereProfile)` lit l'état réel de la partie :

- stabilité ;
- activité Lambda ;
- contamination Xen ;
- audit Advisor ;
- Nova Prospekt ;
- Civil Protection ;
- rations ;
- catastrophes Xen ;
- événements majeurs ;
- terminal actif.

Il génère ensuite :

```text
activeCue
ambientCue
mixLabel
intensity
danger
routeLines
recommendedCues
```

`AtmosphereLayer` joue ensuite le cue actif avec cooldown, enveloppes Web Audio, filtres, bruit synthétique, basse optionnelle et drone court.

## Respect assets / lore

Aucun fichier audio officiel n'est inclus.
Tout est généré localement par oscillateurs, bruit filtré et enveloppes Web Audio.
L'ambiance vise le ton Half-Life : froid, administratif, Combine, Xen organique, Nova clinique, Advisor oppressant.

## Validation effectuée

```bash
npx tsc -p tsconfig.modules.json --noEmit
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step34.js
```

## Application

Depuis ton repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP34_ADVANCED_SYNTH_AUDIO.md ./
npm run dev
```

## Commit conseillé

```bash
git add src README_STEP34_ADVANCED_SYNTH_AUDIO.md
git commit -m "Add advanced synthetic audio director"
git push
```
