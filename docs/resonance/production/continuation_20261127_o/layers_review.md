# Contamination — six plans candidats du lot O

## Résultat et périmètre

**Huit appels imagegen ont produit huit PNG originaux : six plans sélectionnés et deux premières versions conservées.** Aucun refus, aucune erreur de génération et aucun remplacement de PNG historique. Tous les fichiers font **2172 × 724 px**. Le ciel est opaque ; les cinq autres plans sélectionnés ont un alpha réel. Les empreintes et prompts complets figurent dans [layers_generation.json](layers_generation.json).

Le [contrat de six plans](contamination_layer_contract.json) est nouveau pour `STG_EXT_HLDM_CONTAMINATION`. À la base `4ae2ee9dcf1a2acedff4b628c70ee70a736553a0`, la queue ne lui attribuait aucun `required_layer_ids`, même si son maître existait. **Ces six identifiants n’appartenaient donc pas aux 131 plans manquants déjà suivis : produire cette pile ne soustrait pas six à ces 131.** Les identifiants sont qualifiés par leur stage.

Ce lot livre une pile candidate et sa configuration de lecture proposée. Il ne livre ni une arène intégrée, ni une parallaxe validée, ni une certification 1:1.

## Références effectivement inspectées

| Référence | Rôle | Contrôle |
| --- | --- | --- |
| Maître H `stage_contamination_hl25_master_h` | Cible d’édition, composition et coordonnées | 2172 × 724 ; SHA256 `891062e6c7aa98bf8e5086f7deb8774f215709467d13cb9f7003ebeeda65c4c5`. PNG historique inchangé. |
| [Capture officielle Valve de Contamination](https://cdn.fastly.steamstatic.com/half-life.com/images/halflife25/map_contamination.jpg) | Matériaux, architecture et identité de version | 2560 × 1600 ; SHA256 `ff57e6909e48c9e4f2e403c6ed4ed2827b6e4fb5348d790bbbc8064675a79167`, identique à la référence H. |
| [Page officielle Half-Life 25th Anniversary](https://www.half-life.com/en/halflife/25th/) | Identification de la carte commercialisée et de sa provenance Valve | Contamination est une des quatre nouvelles cartes multijoueur de cette mise à jour. Elle reste distincte de Disposal, Pool Party et Rocket Frenzy. |

Le maître présente déjà une transposition latérale de la géométrie 3D. Les nouveaux plans préservent ses grands repères : béton usé, cabine orange rivetée, passerelles et garde-corps rouges, tour arrondie à panneaux verticaux, falaises et ciel mauve. La séparation générative réinterprète des textures et certaines formes ; elle ne transforme pas cette géométrie adaptée en topologie canonique.

## Pile sélectionnée

| Plan | Facteur proposé | Candidat retenu | Observation |
| --- | ---: | --- | --- |
| `L00_ambience` | 0 | `layer_contamination_hl25_sky_o` | Ciel seul opaque, prolongé derrière les structures retirées. |
| `L01_far` | 0,12 | `layer_contamination_hl25_canyon_o` | Falaises sur alpha ; parties occultées complétées générativement. |
| `L02_mid` | 0,30 | `layer_contamination_hl25_buildings_o` | Bâtiments, pont supérieur et porte orange murale. |
| `L03_near` | 0,55 | `layer_contamination_hl25_catwalks_rails_v2_o` | Passerelles proches, escalier et garde-corps ; doublon de porte supprimé. |
| `L04_ground` | 1 | `layer_contamination_hl25_floor_o` | Sol continu et ligne jaune ; lecture proposée jusqu’à la ligne 712 incluse. |
| `L05_foreground` | 1,10 | `layer_contamination_hl25_front_edge_v2_o` | Liseré inférieur minimal ; lecture proposée des lignes 713–723. Aucun prop inventé. |

Les noms précédents correspondent aux PNG présents dans `assets/resonance/candidates/continuation_20261127_o/layers/`. La première version de L03 et la première version de L05 restent dans le même dossier, avec `selected_for_next_review: false` et leur succession explicite dans le registre.

## Corrections et mesures du raccord

La première génération L03 reproduisait la porte orange derrière le garde-corps bas. Cette porte est encastrée dans le mur et appartient à L02. Une édition imagegen ciblée l’a supprimée de L03 v2, y compris dans les intervalles entre barreaux ; elle ne subsiste donc que dans le plan du bâtiment.

Le premier L05 commençait à y703, au lieu du liseré demandé en bas du canevas. Une seconde édition a réduit sa hauteur, mais sa limite significative reste y705. Le chevauchement brut avec L04, mesuré quand les deux alpha valent au moins 16, passe de **23 899 à 17 434 pixels**. Les huit PNG restent intacts ; aucune correction de pixels, découpe ou réencodage n’a été appliqué en Python ou avec un autre outil.

Le contrat propose donc des **rectangles de lecture pour le futur renderer**, séparés des fichiers :

| Plan | Rectangle source `(x, y, largeur, hauteur)` | Rectangle de destination |
| --- | --- | --- |
| L04 | `(0, 0, 2172, 713)` | Identique, avant transformation de caméra |
| L05 v2 | `(0, 713, 2172, 11)` | Identique, avant transformation de caméra |

La première coupure envisagée était y714. L’analyse a montré que la ligne 713 de L04 avait déjà un alpha affaibli : minimum 74, médiane 130. La même ligne de L05 v2 a un alpha minimum 251. Le choix y713 utilise donc la bonne surface sans conserver une rangée presque transparente. À la jonction retenue, l’alpha minimal vaut 227 sur la dernière ligne de L04, puis 251 sur la première de L05. Il n’existe aucun pixel d’alpha inférieur à 16 dans la bande utile y650–723 après cette lecture, et aucun recouvrement des rectangles.

Cette configuration a été rendue avec Canvas et inspectée. Elle supprime le chevauchement à l’affichage sans changer les PNG. Le détail des dalles présente encore une différence de texture à fort grossissement ; **absence de trou d’alpha ne signifie pas raccord de texture certifié**. `runtime_enabled` reste faux : aucun code du jeu n’utilise encore ces rectangles.

La ligne supérieure du sol sélectionné, sur les 80 % centraux et au seuil alpha 128, est à y639. L’ancrage des pieds et le transform image/monde restent à définir ; la ligne logique générique y880/1080 ne doit pas être appliquée mécaniquement.

## Diagnostics de rendu

Les JPG ci-dessous sont des rendus de contrôle par `Canvas.drawImage` des PNG originaux, pas des assets de production ni des sorties imagegen supplémentaires.

- [Maître historique et composition brute](contamination_comparison.jpg).
- [Composition brute et rectangles de lecture proposés](contamination_raw_vs_clipped.jpg).
- [Jonction du sol agrandie verticalement](contamination_ground_seam_diagnostic.jpg).
- [Plans alpha sur blanc et noir](contamination_alpha_diagnostic.jpg).
- [Mesures machine](contamination_layers_qa.json).

Les composites blanc/noir ne montrent pas les aplats rouges visibles dans l’aperçu des pixels RGB presque transparents. Les garde-corps ont des intervalles transparents, le centre de combat est dégagé, et la composition nominale conserve les masses majeures du maître.

## Points restant à contrôler

Le petit volume cylindrique industriel en profondeur, visible au centre derrière le pont dans le maître, est absent de la pile. Les panneaux et proportions de plusieurs structures sont réinterprétés, et les éclairages du mur et de la passerelle demandent une attribution plus stricte avant leur mouvement relatif. Le raccord de texture du liseré doit être apprécié à l’échelle finale. Aucun débord de canevas n’a été produit pour accompagner une translation de caméra.

La configuration proposée prépare la prochaine QA : intégration des rectangles, ancrage des pieds, inspection des lumières et des occlusions, marge de parallaxe et comparaison de fidélité. Aucun test de caméra, collision, animation, intégration runtime ou certification du stage complet n’est revendiqué.

## Incident de transport sans perte

L’appel de L02 a renvoyé le PNG complet sans chemin de sauvegarde automatique. Les **1 813 039 octets** ont été récupérés directement depuis le payload image renvoyé, puis copiés sans réencodage. Il n’y a eu ni nouvel appel ni image reconstituée. Le SHA256 du PNG livré est `2137e1733bace95d52b4b738f27776ca89e9c6dba6bc88ac2c5aad12ef1158f1`.
