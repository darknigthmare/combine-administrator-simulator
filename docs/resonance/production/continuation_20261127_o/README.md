# Lot O — poursuite des manquants, 27 novembre 2026

**25 nouveaux PNG originaux portent l’inventaire à 318 fichiers.** Le lot retient 20 candidats pour la prochaine revue et conserve cinq premières versions. Il complète les poses de présentation de Gina et Colette, propose six plans séparés pour Contamination et ajoute des composants ou instants d’effets. Une cible jusque-là vide reçoit son premier fichier : le rayon offensif Vortigaunt, référencé ici sur **Half-Life 2: Episode Two**.

[Galerie des 25 PNG](GALLERY.md) · [Registre consolidé](generation_register.json) · [Revue finale des cibles sans PNG](TARGET_REVIEW.md) · [File complète des manquants](../MISSING_TARGETS.md) · [Bible 1.12](../../BIBLE.md)

## État vérifiable

Le point de départ est le commit `4ae2ee9dcf1a2acedff4b628c70ee70a736553a0`, déjà publié dans la PR #7. Les nombres ci-dessous distinguent fichiers, cibles, états et réalisation en jeu.

| Mesure | Avant O | Après O | Sens du changement |
| --- | ---: | ---: | --- |
| PNG de production distincts présents | 293 | **318** | 25 sorties conservées, y compris cinq révisions historiques |
| Entrées du registre | 345 | **370** | Une entrée par nouvel appel et fichier |
| Cibles avec au moins un PNG | 241 / 259 | **242 / 259** | Premier rayon Vortigaunt épisodique |
| Cibles sans aucun PNG | 18 | **17** | Revue explicite de chacune, aucun compte fictif |
| Familles de projectiles/effets avec candidat | 57 / 66 | **58 / 66** | Le rayon Vortigaunt constitue la nouvelle famille couverte |
| Couples famille/état visuel avec candidat | 61 | **67** | Six états distincts ajoutés ; plusieurs PNG peuvent couvrir le même état |
| États visuels FX sans candidat | 134 | **128** | Présence d’une image seulement, pas état animé terminé |
| Plans de stage identifiés avec candidat | 19 | **25** | Six nouveaux identifiants de contrat pour Contamination |
| Plans sans fichier dans les contrats connus | 131 | **131** | Les six plans de Contamination n’étaient pas dans ces 131 |
| Stages sans contrat de plans | 25 | **24** | Le contrat de Contamination est désormais explicite |
| Images déclarées intégrées au jeu | 12 | **12** | Ce lot ajoute de la production, sans modification du runtime |
| Fidélités 1:1 certifiées / clips complets / stages complets | 0 / 0 / 0 | **0 / 0 / 0** | Aucun achèvement déduit du nombre de fichiers |

Les 36 refus historiques, quatre erreurs outil et douze sorties historiques indisponibles restent inchangés. Le lot O comporte **25 appels, 25 PNG, zéro nouveau refus et zéro erreur de génération**. Le compteur global des appels, incluant les anciennes itérations non conservées, passe de 354 à 379. Les cinq premières versions du lot O restent présentes : elles ne sont pas ajoutées au compteur des treize anciennes sorties non conservées.

| Groupe | PNG produits | Retenus pour revue | Premières versions conservées |
| --- | ---: | ---: | ---: |
| Personnages Decay | 8 | 7 | 1 |
| Plans de Contamination | 8 | 6 | 2 |
| Effets Gauss, Gluon, Houndeye et Vortigaunt | 9 | 7 | 2 |
| **Total** | **25** | **20** | **5** |

Les aperçus de référence GIF/PNG et les composites JPG de contrôle sont documentaires. Ils ne sont ni des PNG de production supplémentaires ni des appels imagegen.

## Gina et Colette : six poses et une base corrigée

Chaque personnage dispose désormais d’un candidat de sélection, de désélection et de taunt. Ces six poses sont reliées aux fiches `GUIDE_SELECT_*` et `GUIDE_TAUNT_*` dans [presentation_states.json](presentation_states.json). Les gestes constituent une adaptation pour Resonance ; ils ne sont pas présentés comme des animations originales de Decay.

La nouvelle garde de Colette utilise comme autorité visuelle le modèle de la campagne PS2. Son plastron asymétrique rouge rouille, le haut vert sombre, les parties noires nervurées et les plaques frontales brunes des genoux remplacent la lecture erronée de l’ancien candidat B. Ce dernier reste présent, avec `selected_for_next_review: false`, un lien `superseded_by` et une note de revue. Son PNG n’a pas été modifié.

La première désélection de Gina changeait de main porteuse. Une édition ciblée a rétabli la continuité du pied-de-biche : sur les six poses retenues et la nouvelle garde Colette, il est du côté droit de l’image, correspondant au bras gauche anatomique dans ces vues. La première version est conservée et non sélectionnée.

Les références principales sont les captures des modèles campagne PS2 [Gina](https://combineoverwiki.net/wiki/File:Ps2_gina_decay.png) et [Colette](https://combineoverwiki.net/wiki/File:Ps2_colette_decay.png), hébergées par Combine OverWiki. Leur origine de modèle de jeu est distinguée de leur hébergement communautaire. Les prompts, chemins d’entrée, empreintes et inspections figurent dans [characters_generation.json](characters_generation.json) et [characters_prompts.json](characters_prompts.json).

La [revue indépendante](character_independent_review.json) a confirmé la continuité de main et rétracté un premier signalement erroné concernant les genoux de Colette : les plaques frontales du modèle source sont bien brunes, avec pourtour rouge et joints noirs. Aucune recoloration rouge n’a été appliquée.

**Travail encore ouvert :** visages et petits détails, cohérence d’échelle, canevas, pivots, transitions et retour à la garde. Gina utilise 1024 × 1536 px ; Colette alterne 1024 × 1536 et 1060 × 1484 px. Le taunt Gina conserve une marge supérieure de 15 px au seuil alpha 16, sans coupe observée. Ces poses fixes ne terminent aucun clip.

## Contamination : six plans candidats et raccord documenté

Le maître du lot H et la [capture officielle Valve](https://cdn.fastly.steamstatic.com/half-life.com/images/halflife25/map_contamination.jpg) ont servi à séparer ciel, falaises, bâtiments, passerelles, sol et liseré de premier plan. Les huit sorties font 2172 × 724 px ; le ciel est opaque et les cinq autres plans retenus ont un alpha réel.

Le doublon de la porte orange entre bâtiments et passerelles a été retiré de la révision des passerelles. La porte appartient désormais uniquement au plan des bâtiments. La seconde correction a réduit le débord du liseré inférieur, sans éliminer tout chevauchement dans les fichiers bruts.

Le [contrat de plans](contamination_layer_contract.json) propose donc des rectangles de lecture : L04 couvre les lignes 0–712 et L05 les lignes 713–723. Le diagnostic Canvas ne montre aucun trou d’alpha dans la bande utile du sol avec cette configuration. **Ces rectangles restent une proposition de rendu : aucun code du jeu ne les applique.** Les fichiers générés sont conservés sans découpe, retouche ou réencodage.

La [revue détaillée](layers_review.md), les [mesures](contamination_layers_qa.json) et la [comparaison brute/lecture proposée](contamination_raw_vs_clipped.jpg) conservent les défauts visibles. Un petit volume industriel en profondeur manque encore ; plusieurs proportions et matériaux sont réinterprétés. Les lumières, occlusions, ancrages des pieds et marges de parallaxe restent à contrôler en mouvement. La pile n’est ni certifiée 1:1 ni déclarée stage complet.

## Effets : six états distincts, avec limites de phase

| Famille et état du catalogue | Candidats retenus | Portée réelle |
| --- | --- | --- |
| Houndeye HL1 — `pack_color_variants` | Meutes de deux et quatre, version quatre corrigée | Deux variantes du même état ; couleur orientée par le SDK, géométrie et rendu moteur à vérifier |
| Gauss HL1 — `charged` | Rayon chargé v2 | Rayon blanc plus fin ; les pixels du PNG ne prouvent pas la largeur du moteur |
| Gauss HL1 — `impact` | `hotglow` | Composant de contact uniquement, sans impact complet |
| Gluon HL1 — `tip` | `XSpark1` | Composant flare au point de contact uniquement |
| Gluon HL1 — `fade` | Flare agrandi et atténué | Instant représentatif de la fin en mode `FIRE_WIDE`, sans faisceau résiduel inventé |
| Vortigaunt épisodique — `beam` | Rayon isolé sur alpha | Premier candidat de cette famille ; charge et impact restent manquants |

La révision Houndeye ouvre les espaces entre anneaux. La révision Gauss réduit la hauteur utile du rayon de 165 à 70 px au seuil alpha 16, contre 39 px pour le candidat primaire. Le rapport PNG de 1,79 n’est pas équivalent au rapport de paramètres SDK de 2,5 : aucune largeur exacte n’est déclarée validée.

La provenance distingue quatre fichiers de code officiels Valve à un commit fixé et trois petits aperçus communautaires de sprites. Le code établit les identités et certains comportements, tandis que ces aperçus n’établissent pas une équivalence binaire avec les sprites du jeu. Voir [fx_generation.json](fx_generation.json), le [manifeste de références](fx_references/manifest.json) et la [revue indépendante des neuf FX](fx_independent_review.json).

Le nouveau rayon Vortigaunt est fondé sur une capture de gameplay publiée page 5 du [guide Half-Life 2: Episode Two d’Asthalis](https://asthalis.fr/fichiers/pc/hl2e2/hl2e2_solution.pdf), inspectée à sa résolution native. Le Vortigaunt de droite émet le rayon offensif ; le soin d’Alyx à gauche et le flash terminal sont exclus de l’image produite. La capture est une source secondaire, sans certification des réglages ou de la version binaire. Elle permet d’isoler cette phase, pas de certifier la charge, l’impact ou la variante HL2 de base. [Provenance complète](vortigaunt_beam_generation.json) et [recherche de phases](phase_reference_review.json).

## Les manquants restent explicites

La [revue des 18 cibles au départ](missing_targets_before.json) est conservée. La [revue finale](TARGET_REVIEW.md) en suit encore 17 sans image : onze cibles avec refus antérieur, une dépendant du même modèle déjà refusé, et cinq dont la phase visuelle n’a pas été établie par une référence exploitable. Aucun de ces douze blocages n’a été relancé sous un nouveau nom.

Les cinq recherches encore nécessaires concernent le traceur HL1, le projectile du Gonome, le crachat du Fourmilion ouvrier d’Episode Two, le canon à distorsion du Strider et le crachat de Fourmilion d’Alyx. Les images d’un autre jeu, d’un mod, d’une autre attaque ou d’une phase ambiguë ne sont pas utilisées comme preuve d’apparence. Les variantes et les effets de soin restent séparés des attaques.

Au-delà des premières images, **128 états FX, 131 identifiants de plans déjà contractualisés et 24 contrats de stage** restent ouverts. Les fiches de combat, animations, transitions et kits complets conservent leurs statuts de conception. Le lot M annoncé dans un historique antérieur n’a toujours pas été récupéré ; ses 24 PNG ne sont pas ajoutés au total.

## Intégrité et validation

L’[audit de préservation](preservation_audit.json) compare l’état au commit de départ : les **293 anciens PNG ont exactement les mêmes SHA-256**. Sur 345 anciennes entrées du registre, 344 sont inchangées. La seule modification de métadonnées concerne la mise à l’écart documentée de l’ancien candidat Colette B. Les refus, erreurs et sorties perdues historiques restent conservés.

Les trois fichiers originaux du [guide et de ses deux extensions](../../guides/README.md) restent inchangés. Leur édition d’intégration demeure 1.11, avec 68 sections couvertes et 63 fiches de conception. La bible passe en 1.12 pour ce point de production ; aucun changement de version ne transforme ces fiches en fonctions jouables.

Contrôles reproductibles depuis la racine du dépôt :

```bash
node scripts/validate-resonance-guides.mjs
node scripts/validate-resonance-design.mjs
node scripts/validate-resonance-boss-design.mjs
node scripts/audit-resonance-production.mjs
node scripts/sync-resonance-production.mjs
node scripts/test-resonance-production-status.mjs
git diff --check
```

L’audit physique vérifie 318 PNG distincts enregistrés, sans erreur ni avertissement. La synchronisation conserve un avertissement historique : le calque de skyline de Cité 17 ne possède pas d’identifiant de plan. Il compte comme fichier, sans fournir artificiellement un plan identifié.

Le code du jeu n’est pas modifié par ce lot. La base `4ae2ee9` dispose d’une [CI réussie](https://github.com/darknigthmare/combine-administrator-simulator/actions/runs/45948747638), avec 60 tests unitaires, 10 tests de parcours navigateur, la matrice de 252 configurations et la compilation. La CI de la nouvelle révision est suivie dans la [PR #7](https://github.com/darknigthmare/combine-administrator-simulator/pull/7). Ces vérifications techniques ne certifient pas les pixels, le lore ou le rendu animé des nouveaux candidats.
