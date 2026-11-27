# Quatre masters de stages — lot H

Date : 24 novembre 2026. Générateur : image_gen intégré. **4 requêtes, 4 PNG produits, aucun refus.**

Les quatre fichiers sont des candidats de décor aplati. Les références ont été vues avant génération et les sorties ont été contrôlées visuellement. Les PNG ont été conservés à l’identique du générateur, sans recadrage, redimensionnement ou modification de pixels. Chaque fichier mesure **2 172 × 724 px**, ratio exact **3:1**, mode **RGB opaque**.

## Fichiers et contrôle

| Cible | Master | Bande de sol observée | Réserve principale |
|---|---|---:|---|
| STG_05_HL1_XEN | `assets/resonance/candidates/continuation_20261124_h/stages/stage_xen_hl1_master_h.png` | 15 % | Le sol continu et la redistribution des îles adaptent la géométrie du niveau 3D pour une lecture latérale. |
| STG_04_HL1_LAMBDA | `assets/resonance/candidates/continuation_20261124_h/stages/stage_lambda_hl1_master_h.png` | 10 % | Sol continu frontal et composition centrée adaptés; bande de sol visible environ 10 %, inférieure au souhait initial 16 %. Hauteur de terrain à valider avant intégration. |
| STG_03_HL1_BLAST_PIT | `assets/resonance/candidates/continuation_20261124_h/stages/stage_blastpit_hl1_master_h.png` | 10 % | Niveaux des coursives et projection du cylindre recomposés de profil; bande de sol visible environ 10 %, à valider avant intégration. |
| STG_EXT_HLDM_DISPOSAL | `assets/resonance/candidates/continuation_20261124_h/stages/stage_disposal_hl25_master_h.png` | 11 % | La passerelle continue est une adaptation 2D et non une reproduction de la topologie jouable 3D. Bande de sol visible environ 11 %, à valider avant intégration. |

Chaque image conserve un sol frontal horizontal et continu. Les coursives, puits, arches ou rampes visibles se trouvent derrière ce sol. Aucun personnage, boss ou projectile n’est peint dans ces masters.

La cible initiale était une bande de sol proche de 16 % de la hauteur. Xen atteint environ 15 % ; Lambda, Blast Pit et Disposal présentent environ 10–11 %. Cette divergence est conservée et documentée, sans modifier les pixels livrés. Le positionnement du terrain et la compatibilité avec les combattants doivent être validés avant intégration.

## Références

### Xen — îles et aiguilles

- [Capture et provenance](https://combineoverwiki.net/wiki/File:Xen_islands_1.jpg) · [Image source](https://combineoverwiki.net/images/f/f4/Xen_islands_1.jpg) · SHA-256 : `d1022a64c8b2f79380308748f4aa4e512514bb97b5cc5a7e70751d07c76bee19`.

Ciel vert à volutes saumon, îles flottantes aplaties, aiguilles striées et anneaux cyan conservés. Aucun personnage ou boss visible.

### Lambda — salle du téléporteur final

- [Capture et provenance](https://combineoverwiki.net/wiki/File:Sector_F_teleport.jpg) · [Image source](https://combineoverwiki.net/images/f/f3/Sector_F_teleport.jpg) · SHA-256 : `42a8a203f26d70b7c3e53849ce4298990d00d785d61483cc47f44f94bec16fac`.

Noyau jaune, arches gris-vert, émetteur circulaire de plafond, panneaux bleus striés et garde-corps rouges conservés. Salle finale inactive, sans mélange avec le puits à téléporteurs.

### Blast Pit — chambre de test vide

- [Capture et provenance](https://combineoverwiki.net/wiki/File:Tentacle_pit.jpg) · [Image source](https://combineoverwiki.net/images/d/de/Tentacle_pit.jpg) · SHA-256 : `f64f83b260dcdea78590dd6f6caadb5bef913a36bbbf82f624842cba82a7949d`.

Tôle rouillée rivetée, coursives, rayures de danger, échelle rouge et conduites rouge/bleue reconnaissables. Tentacules absents; ouverture du puits derrière la plateforme.

### Disposal — Processing Area3

- [Capture et provenance](https://www.half-life.com/en/halflife/25th/) · [Image source](https://cdn.fastly.steamstatic.com/half-life.com/images/halflife25/map_disposal.jpg) · SHA-256 : `fba7c755f1a4c8fae1dc525a3ad22a690ceb0f780fae4bd894472387cb064ab2`.

Capture Valve officielle reprise: contreforts obliques, chaînes et palans jaunes, tonneaux à bandes rouges, tour centrale, lampes rouges et éclairage toxique vert. Aucun joueur visible.

## Portée

La transformation d’une scène 3D en arène latérale modifie nécessairement sa géométrie. Les repères et matériaux sont ancrés aux captures, mais ces adaptations ne sont pas certifiées fidèles à 1:1. Aucun stage complet en six couches, fichier de collision, animation ou intégration runtime n’est déclaré livré. Les quatre candidats sont sélectionnés pour la prochaine revue.

`stage_generation.json` contient les prompts exacts, références, dimensions, octets, empreintes SHA-256, observations et limites. `stage_prompts.json` conserve les quatre requêtes de génération. Le registre global sera consolidé séparément.
