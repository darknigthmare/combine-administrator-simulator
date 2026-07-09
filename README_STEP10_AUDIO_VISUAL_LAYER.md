# STEP 10 — Couche sonore et visuelle réactive

Cette étape ajoute une couche d’ambiance réactive sans utiliser d’assets officiels Half-Life.
Tout est généré par CSS, React et Web Audio local.

## Fichiers ajoutés

- `src/systems/atmosphereSystem.ts`
- `src/components/AtmosphereLayer.tsx`
- `README_STEP10_AUDIO_VISUAL_LAYER.md`

## Fichiers modifiés

- `src/types/game.ts`
- `src/App.tsx`
- `src/index.css`

## Nouveautés

### Directeur d’atmosphère

Le système lit l’état réel de la partie et choisit automatiquement un profil visuel :

- `combine` : contrôle Combine standard ;
- `quiet_control` : City disciplinée, froide, stable ;
- `uprising` : rébellion Lambda dominante ;
- `xen` : contamination Xen dominante ;
- `nova` : uplink Nova Prospekt ;
- `citadel_alert` : suspicion/audit Advisor élevé ;
- `collapse` : effondrement administratif ou fin de partie.

### Couche visuelle

La couche ajoute :

- vignette dynamique ;
- scanlines réglables ;
- grille de terminal ;
- glitch selon crise ;
- pulsation lumineuse ;
- teintes spécifiques pour Xen, Lambda, Nova Prospekt, Citadel Alert et Collapse ;
- ticker de statut sensoriel.

### Couche audio

Audio optionnel et désactivé par défaut.
Les sons sont générés localement via Web Audio :

- bip terminal ;
- alarme effondrement ;
- cue Xen ;
- cue Nova Prospekt ;
- cue Advisor ;
- cue soulèvement.

Aucun fichier audio officiel n’est utilisé.

### Nouvel onglet

Un nouvel onglet `Atmosphère` permet de régler :

- activation de la couche visuelle ;
- activation audio ;
- scanlines ;
- glitch ;
- aberration chromatique ;
- pulse ambiant ;
- réduction des animations ;
- volume maître.

## Application

Copier le contenu du pack dans le repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP10_AUDIO_VISUAL_LAYER.md ./
npm run dev
```

Commit conseillé :

```bash
git add src README_STEP10_AUDIO_VISUAL_LAYER.md
git commit -m "Add reactive audio visual atmosphere layer"
git push
```

## Validation effectuée

Compilation TypeScript des modules non React :

```bash
npx tsc -p tsconfig.modules.json
```

Bundle syntaxique React via esbuild :

```bash
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step10.js
```
