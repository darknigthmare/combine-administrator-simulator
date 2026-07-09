# Step 35 — Mode archives vidéo COAN

Cette passe ajoute un module **Archives vidéo** au simulateur Combine Administrator.

Le but n'est pas d'intégrer de vraies vidéos ni d'assets Half-Life officiels. Le module crée des **faux flux de surveillance** générés par interface : cadres vidéo synthétiques, timecodes, corruption, scanlines, logs visuels et dossiers COAN.

## Fichiers ajoutés

```txt
src/data/videoArchives.ts
src/systems/videoArchiveSystem.ts
README_STEP35_VIDEO_ARCHIVES.md
```

## Fichiers modifiés

```txt
src/types/game.ts
src/data/index.ts
src/data/terminalInterfaces.ts
src/App.tsx
src/components/DedicatedScreens.tsx
src/index.css
```

## Nouvel onglet

```txt
Archives vidéo
```

Il affiche :

- mur de faux flux de caméra ;
- feed sélectionné avec intégrité/corruption/exposition/preuve ;
- doctrine active de capture ;
- opérations visuelles ;
- hotlist des flux les plus dangereux ;
- journal COAN des clips critiques.

## Flux ajoutés

```txt
CAM-RES-A-17          Bloc résidentiel A / surveillance civique
CP-CHECKPOINT-11      Checkpoint Civil Protection
RAZOR-INTAKE-04       Razor Train / manifeste de transfert
NOVA-BLOCK-B          Nova Prospekt / détention B
XEN-CONTAIN-02        Sas biologique Xen
CITADEL-SPIRE-LINK    Liaison Citadel / Advisor
CANAL-LAMBDA-SHADOW   Canaux / traces Lambda
HOSP-QZONE-CAM        Ancien hôpital / quarantaine
INDUSTRIAL-BIOCAM     Complexe industriel / biosécurité
VORT-SIG-NULL         Interférence Vortessence
```

## Doctrines vidéo

```txt
Monitoring passif COAN
Priorité surveillance Civil Protection
Blackout Nova Prospekt
Priorité biofeed Xen
Piège signal Lambda
Nettoyage de preuves Citadel
Fuite anonymisée clandestine
```

Chaque doctrine agit sur :

- intégrité des flux ;
- corruption d'archive ;
- exposition publique ;
- valeur de preuve ;
- bruit Lambda ;
- bruit Xen ;
- scrutiny Citadel/Advisor ;
- statistiques globales de City.

## Opérations ajoutées

```txt
Restaurer intégrité flux
Effacer images compromettantes
Taguer suspect Lambda
Isoler frames Xen
Exporter preuves Advisor
Injecter faux horodatage
Router vers Nova Intake
Fuite clip anonymisé
Trianguler source de corruption
Verrouiller cluster caméras
```

## Simulation quotidienne

À chaque clôture de journée, le système lit :

- statistiques globales ;
- secteurs ;
- rationnement ;
- Civil Protection ;
- Nova Prospekt ;
- Résistance Lambda ;
- factions internes ;
- Vortigaunts/Biotics ;
- Xen ecosystem ;
- mutations ;
- quarantaines ;
- recherche Xen ;
- catastrophes Xen ;
- événements majeurs ;
- audit Advisor.

Il produit ensuite :

```txt
Archives vidéo : intégrité X% / corruption Y% / risque fuite Z%.
Flux COAN : Lambda X% / Xen-noise Y% / demande Advisor Z%.
Archive vidéo : CAM-... a généré N clip(s) critique(s).
```

## Logique lore

Le module est pensé comme un vrai système Combine :

- les images CP peuvent prouver la brutalité et nourrir Lambda ;
- les flux Nova doivent être noirs, mais les trous d'archive attirent les Advisors ;
- les caméras Xen ne montrent pas juste des monstres, elles montrent une biosphère étrangère qui corrompt le signal ;
- les feeds Vortessence ne respectent pas totalement le temps linéaire ;
- un faux horodatage peut sauver le récit public mais fragilise le dossier réel ;
- une fuite anonymisée peut préserver une mémoire humaine, au risque de trahison administrative.

## Validation effectuée

```bash
npx tsc -p tsconfig.modules.json --noEmit
npx esbuild src/App.tsx --bundle --platform=browser --format=esm --external:react --external:react/jsx-runtime --external:./index.css --outfile=/tmp/app-step35.js
```

## Application

Depuis la racine de ton repo :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP35_VIDEO_ARCHIVES.md ./
npm run dev
```

Commit conseillé :

```bash
git add src README_STEP35_VIDEO_ARCHIVES.md
git commit -m "Add COAN video archive surveillance mode"
git push
```
