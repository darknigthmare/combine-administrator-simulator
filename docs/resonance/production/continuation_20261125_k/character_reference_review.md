# Lot K — références et revue des personnages et costumes

Date : 25 novembre 2026. Lot : `continuation_20261125_k`.

## Résultat et portée

28 cibles prévues ont chacune une issue explicite : **27 PNG originaux** (21 personnages et 6 costumes), **1 refus de génération**, **0 cible différée**. 28 appels distincts ont été effectués, un seul par cible dans cette reprise. Les refus historiques restent dans le suivi global ; ils ne sont pas effacés par une nouvelle candidate.

Chaque PNG contient une seule pose de base individuelle. Ce lot ne produit aucune animation terminée. Les images restent des candidates à comparer : `certified_one_to_one=false`, `integrated_in_game=false` et `runtime_enabled=false`. Leur présence couvre la livraison d'une candidate, pas l'acceptation artistique finale.

Le registre `character_generation.json` conserve les prompts exacts, les associations cible/propriétaire, les sources et leur portée, les SHA-256 des références, les dimensions, les statistiques alpha, les SHA-256 des PNG et les SHA Git des blobs.

## Préservation et contrôle

Chaque résultat a été enregistré en mémoire puis téléversé comme blob GitHub avant sa copie locale. Le SHA Git calculé sur les octets PNG a été comparé au retour du dépôt avant écriture. Aucun redimensionnement, recadrage, repeinture ou autre modification des PNG originaux n'a été effectué.

Les 27 PNG sont RGBA et possèdent des pixels entièrement transparents. Chacun a été inspecté sur un composite blanc et un composite noir, conservés uniquement comme supports de contrôle. Les composites ne remplacent pas les PNG. Les franges claires, les détails reconstruits et les marges plus petites que les 10 % demandés sont consignés ci-dessous ; le contrôle alpha ne constitue pas une validation de fidélité.

Les références bitmap indiquées ont été ouvertes et inspectées avant leur appel de génération. Leur URL et leur empreinte permettent de retrouver la même source. Les chemins locaux de référence du registre sont des chemins de travail ; ils ne prétendent pas que ces bitmaps tiers sont livrés dans le dépôt.

## Issues par cible

| Cible | Propriétaire | Type de propriétaire | Catégorie de l'asset | Issue |
| --- | --- | --- | --- | --- |
| `zombie_hl2` | `zombie_hl2` | `fighter` | `fighter_key_pose` | PNG candidat |
| `alyx_hla` | `alyx_hla` | `fighter` | `fighter_key_pose` | PNG candidat |
| `combine_ordinal_hla` | `combine_ordinal_hla` | `fighter` | `fighter_key_pose` | PNG candidat |
| `fast_zombie_hl2` | `fast_zombie_hl2` | `reserve_character` | `reserve_character_key_pose` | PNG candidat |
| `poison_zombie_hl2` | `poison_zombie_hl2` | `reserve_character` | `reserve_character_key_pose` | PNG candidat |
| `kleiner_hl2` | `kleiner_hl2` | `support_character` | `support_character_key_pose` | PNG candidat |
| `mossman_hl2` | `mossman_hl2` | `support_character` | `support_character_key_pose` | PNG candidat |
| `odessa_hl2` | `odessa_hl2` | `support_character` | `support_character_key_pose` | PNG candidat |
| `lamarr_hl2` | `lamarr_hl2` | `support_character` | `support_character_key_pose` | PNG candidat |
| `magnusson_ep2` | `magnusson_ep2` | `support_character` | `support_character_key_pose` | PNG candidat |
| `fisherman_lostcoast` | `fisherman_lostcoast` | `support_character` | `support_character_key_pose` | Refus, aucun PNG |
| `russell_hla` | `russell_hla` | `support_character` | `support_character_key_pose` | PNG candidat |
| `larry_hla` | `larry_hla` | `support_character` | `support_character_key_pose` | PNG candidat |
| `gary_hla` | `gary_hla` | `support_character` | `support_character_key_pose` | PNG candidat |
| `simmons_blueshift` | `simmons_blueshift` | `support_character` | `support_character_key_pose` | PNG candidat |
| `walter_bennet_blueshift` | `walter_bennet_blueshift` | `support_character` | `support_character_key_pose` | PNG candidat |
| `richard_keller_decay` | `richard_keller_decay` | `support_character` | `support_character_key_pose` | PNG candidat |
| `black_ops_male_op4` | `black_ops_male_op4` | `support_character` | `support_character_key_pose` | PNG candidat |
| `shock_roach_op4` | `shock_roach_op4` | `support_character` | `support_character_key_pose` | PNG candidat |
| `snark_hl1` | `snark_hl1` | `support_character` | `support_character_key_pose` | PNG candidat |
| `doug_rattmann_labrat` | `doug_rattmann_labrat` | `support_character` | `support_character_key_pose` | PNG candidat |
| `bendy_peti` | `bendy_peti` | `support_character` | `support_character_key_pose` | PNG candidat |
| `costume_gman_hla` | `gman_hl2` | `support_character` | `costume_key_pose` | PNG candidat |
| `costume_mossman_arctic` | `mossman_hl2` | `support_character` | `costume_key_pose` | PNG candidat |
| `costume_barney_cp_helmet` | `barney_hl2` | `fighter` | `costume_key_pose` | PNG candidat |
| `costume_colette_headtohead_ps2` | `colette_decay` | `fighter` | `costume_key_pose` | PNG candidat |
| `skeleton_hl25_multiplayer` | `skeleton_hl25_multiplayer` | `support_character` | `costume_key_pose` | PNG candidat |
| `too_much_coffee_man_hl25_multiplayer` | `too_much_coffee_man_hl25_multiplayer` | `support_character` | `costume_key_pose` | PNG candidat |

## Portée des sources et recompositions

La majorité des images sources sont des rendus de modèles ou des captures de jeu hébergés par Combine OverWiki, une source communautaire. Leur hébergement n'est jamais présenté comme une publication officielle Valve. Les différences de version (GoldSrc, PS2, HL2 retail, Episode One/Two, HLA, comic et multijoueur) sont conservées dans chaque entrée.

- **Alyx HLA** : le corps est tiré du modèle cinématique HLA ; les Russells proviennent de deux vues distinctes de gants du même jeu. Le screenshot promotionnel est identifié comme tel tout en conservant son hébergement communautaire. Il n'existe pas ici de capture unique montrant ce corps complet avec ces gants. Les poignets, articulations, câblages et surfaces cachées sont des reconstructions à vérifier.
- **Barney masqué** : la capture de la gare détermine le casque et le masque ; le modèle retail démasqué apporte le corps de la même tenue. Le raccord tête/cou et la forme du casque demandent un contrôle. Les références de fuite/ancienne version ne sont pas utilisées.
- **Simmons et Walter Bennet** : les portraits nommés et les captures Blue Shift du même personnage guident la recomposition d'un corps entier. Certaines faces cachées de la blouse et du pantalon ne sont pas directement documentées. Walter n'est pas remplacé par le modèle PS2 portant un nom proche.
- **Doug Rattmann** : [la page 8 du comic officiel Valve](https://www.thinkwithportals.com/comic/#8) et une reproduction communautaire de sa course documentent l'apparence hirsute actuelle. La pose debout est une adaptation nouvelle du dessin. L'image de flashback rasé, bien qu'inspectée, n'est pas utilisée. Le rendu n'est pas présenté comme un modèle de jeu retail.
- **Skeleton et Too Much Coffee Man** : [la page officielle du 25e anniversaire](https://www.half-life.com/en/halflife/25th) a servi à vérifier le contexte de sortie ; les bitmaps fournis au générateur restent des rendus/captures hébergés par la communauté. La teinte rouge des yeux du squelette est un choix de palette de cette candidate, pas une couleur canonique unique.
- **Mossman arctique et Colette** : le manteau utilisé est celui de la version publiée Episode One, sans emprunt aux concepts Episode Three. La Colette rouge correspond au modèle PS2 Head-to-Head, distinct de sa tenue Decay principale.
- **Bendy** : le résultat conserve une silhouette noire schématique, avec la pose du modèle. Son absence de contraste sur noir est attendue et ne signale pas un échec du canal alpha.

## Détail des références et points de revue

### zombie_hl2

Jeu/source : Half-Life 2. Propriétaire : `zombie_hl2` (`fighter`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/zombie_hl2_idle_k.png` — 769 × 2045, RGBA. SHA Git : `d26d22327e14217a033f42e7922f8f4496b6bad1`.

Revue : Silhouette, chemise, jean et headcrab classique cohérents avec le rendu source inspecté. La texture et les doigts sont réinterprétés; faible marge autour des chaussures et du sommet. Pose source conservée, pas encore une garde latérale de gameplay. Candidat, comparaison 1:1 toujours requise.

Références inspectées :

- [Zombie_HL2.jpg](https://combineoverwiki.net/images/8/83/Zombie_HL2.jpg) — `community_wiki_game_model_render`. Exact released Half-Life 2 variant; source image inspected before generation. Empreinte SHA-256 : `ce4e2857ab58835379f21cd0b332e24e7fdde5b9b1709168136ac97787b8a6ff`.

### alyx_hla

Jeu/source : Half-Life Alyx. Propriétaire : `alyx_hla` (`fighter`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/alyx_hla_idle_k.png` — 1199 × 1312, RGBA. SHA Git : `3ebc19f52737a3fd50d429c05817d09592506420`.

Revue : Recomposition explicite de sources HLA distinctes : corps cinématique et gants VR. Pose de base entière; modèle facial et vêtements cohérents, HUD sur le gant gauche anatomique. Articulations, câblages, volumes des Russells et raccords aux poignets partiellement reconstruits; les surfaces cachées restent à comparer. Aucune capture unique corps+gants ni certification 1:1. Composites blanc/noir inspectés, marge haute très faible.

Références inspectées :

- [HLA_Alyx.png](https://combineoverwiki.net/images/8/83/HLA_Alyx.png) — `community_wiki_game_model_or_trailer_capture`. HLA cinematic full body, no Russells present in this model render. Empreinte SHA-256 : `0a83cfd68adf0e6ccfcc95b75e90cc3559e34bac0b69f85dcdf187f2120a6075`.
- [GRAVITY_GLOVES_4K.png](https://combineoverwiki.net/images/5/5b/GRAVITY_GLOVES_4K.png) — `official_game_screenshot_hosted_by_community_wiki`. Separate HLA Gravity Gloves reference, no whole body captured. Empreinte SHA-256 : `7a34b5090f6b177d8e9041f3e3ad9c82216f30d85b58adf5e61a313b7f8e7875`.
- [Gravity_Gloves_trailer_1.jpg](https://combineoverwiki.net/images/d/d9/Gravity_Gloves_trailer_1.jpg) — `community_wiki_game_model_or_trailer_capture`. Separate HLA Gravity Gloves reference, no whole body captured. Empreinte SHA-256 : `ff083392976cd006f292b18388f5c112f0f52188b525d24de647259f3117d1ee`.

### combine_ordinal_hla

Jeu/source : Half-Life Alyx. Propriétaire : `combine_ordinal_hla` (`fighter`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/combine_ordinal_hla_idle_k.png` — 932 × 1688, RGBA. SHA Git : `c0e6488a439ce1bcbbd717bbf3ad3b721e205233`.

Revue : Modèle final Ordinal, masque noir, optiques vertes, insignes jaunes, sac et antenne conservés. Armement prêt sans tir; détails d’insigne, chargeur et sangles réinterprétés, antenne proche du bord haut. Composites blanc/noir lisibles. Un seul appel K; refus historique conservé ailleurs.

Références inspectées :

- [CombineOrdinal.png](https://combineoverwiki.net/images/4/4a/CombineOrdinal.png) — `community_wiki_game_model_or_trailer_capture`. Exact retail game model. Empreinte SHA-256 : `f02025e783a8d335afe00e969fe9a7f3fa5c8f70f059aa3463a456e25d8886b8`.

### fast_zombie_hl2

Jeu/source : Half-Life 2. Propriétaire : `fast_zombie_hl2` (`reserve_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/fast_zombie_hl2_idle_k.png` — 980 × 1605, RGBA. SHA Git : `cc23ad3fff03258f229d13a978e8f926f82d0391`.

Revue : Proportions allongées, headcrab rapide et posture courbée conservés. Détails fins des doigts/orteils et des côtes réinterprétés, marges étroites. Aucun mélange visuel avec les deux autres zombies; candidat non certifié.

Références inspectées :

- [Fast_zombie.jpg](https://combineoverwiki.net/images/0/00/Fast_zombie.jpg) — `community_wiki_game_model_render`. Exact released Half-Life 2 variant; source image inspected before generation. Empreinte SHA-256 : `939018bc6b1dda7f5e7ac0b37f8ff244e5d68486c96cf3421065b435ea616b37`.

### poison_zombie_hl2

Jeu/source : Half-Life 2. Propriétaire : `poison_zombie_hl2` (`reserve_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/poison_zombie_hl2_idle_k.png` — 1079 × 1457, RGBA. SHA Git : `7bdafdbbe790f5eedec318ba2972dfa4d2f4bc6b`.

Revue : Hôte massif et headcrabs sombres sur tête/dos conformes à la silhouette source. Nombre et articulation exacts des pattes imbriquées et texture du torse doivent encore être comparés; marges étroites. Candidat non certifié.

Références inspectées :

- [Poison_zombie.jpg](https://combineoverwiki.net/images/0/06/Poison_zombie.jpg) — `community_wiki_game_model_render`. Exact released Half-Life 2 variant; source image inspected before generation. Empreinte SHA-256 : `0f0034827c5aabface80bfe81bca2dc36ddb0105a19ca18c091ca6984ed76533`.

### kleiner_hl2

Jeu/source : Half-Life 2. Propriétaire : `kleiner_hl2` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/kleiner_hl2_idle_k.png` — 807 × 1949, RGBA. SHA Git : `4bde650b2aa536770b6e8ccf65b72f053849451a`.

Revue : Kleiner retail HL2 et sa tenue conservés; geste transformé en pose neutre. Visage plus lisse, mains et plis nouvellement reconstruits; quelques franges claires de la blouse sur noir. Corps complet sans emprunt au modèle HLA abandonné. Un seul appel K; refus historiques conservés.

Références inspectées :

- [Kleiner_model.jpg](https://combineoverwiki.net/images/c/c9/Kleiner_model.jpg) — `community_wiki_game_model_or_trailer_capture`. Exact retail game model. Empreinte SHA-256 : `8a8bd67762376d7b9e5514d8b1912f6ae628c1b273d595cb6d74096b89e0a8c1`.

### mossman_hl2

Jeu/source : Half-Life 2. Propriétaire : `mossman_hl2` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/mossman_hl2_idle_k.png` — 725 × 2170, RGBA. SHA Git : `c2220b2ed482e06fc2ab06d705a075cd67bf49d0`.

Revue : Modèle retail HL2 en col roulé, pantalon olive-brun et chaussures bordeaux conservé. Visage, mains et plis affinés/reconstruits; comparer les proportions du visage, le bracelet et l'usure du pull à la capture. Corps complet, marge basse et haute inférieure aux 10 % demandés. Aucun rectangle de fond visible sur composites blanc et noir. Un seul appel K; refus historiques conservés.

Références inspectées :

- [Mossman_model.jpg](https://combineoverwiki.net/images/8/87/Mossman_model.jpg) — `community_wiki_game_model_or_capture`. Exact retail outfit and model. Empreinte SHA-256 : `43d45ebd9e59cba089ca9dc36ee423b26514ebdf664343bdfd6fa333dd7c85c0`.

### odessa_hl2

Jeu/source : Half-Life 2. Propriétaire : `odessa_hl2` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/odessa_hl2_idle_k.png` — 757 × 2078, RGBA. SHA Git : `aba04ab325174c1996b726f461887a1bb3f516af`.

Revue : Bonnet, moustache, veste bleue, écusson de bras et barre de décorations du modèle retail conservés. Visage et texture de veste affinés; motifs des décorations et texte d'écusson non certifiés. Pose frontale détendue reconstituée, mains et chaussures à comparer. Corps complet avec marges plus faibles que demandé; composites blanc/noir sans fond opaque visible. Un seul appel K; refus historique conservé.

Références inspectées :

- [Odessa_model.jpg](https://combineoverwiki.net/images/7/72/Odessa_model.jpg) — `community_wiki_game_model_or_capture`. Exact retail outfit and model. Empreinte SHA-256 : `dde0516147ff3ade9b69bc1e91caa5d337e240f9d8eb1adc5e9b44040ae778f8`.

### lamarr_hl2

Jeu/source : Half-Life 2. Propriétaire : `lamarr_hl2` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/lamarr_hl2_idle_k.png` — 1312 × 1199, RGBA. SHA Git : `ece3bb8a5dc42849b9838321948a310c1967744c`.

Revue : Lamarr identifiée par son modèle et les captures de Kleiner. Silhouette et teinte conservées; reflets de peau plus marqués que la source et emplacement exact des pattes à comparer. Aucun collier ni bec ajouté; composites blanc/noir inspectés.

Références inspectées :

- [Lamarr.jpg](https://combineoverwiki.net/images/9/99/Lamarr.jpg) — `community_wiki_game_render_or_capture`. Specific Lamarr model plus released HL2 laboratory identification captures. Empreinte SHA-256 : `fed50656e93bc463a3db3dbc20a13c292f9c6461475933646fd6de5970a1950e`.
- [Lamarr_and_Kleiner.jpg](https://combineoverwiki.net/images/c/c4/Lamarr_and_Kleiner.jpg) — `community_wiki_game_render_or_capture`. Specific Lamarr model plus released HL2 laboratory identification captures. Empreinte SHA-256 : `5851921b2d498619a584f92d4b08ce14c6ef35674cfef30d1cb5e6be8f97e011`.
- [HL2_DebeakedLamarr.jpg](https://combineoverwiki.net/images/f/f4/HL2_DebeakedLamarr.jpg) — `community_wiki_game_render_or_capture`. Specific Lamarr model plus released HL2 laboratory identification captures. Empreinte SHA-256 : `d46d84ab89632ab888d94935e9dd6874882f4059547f239a213e77d7d37722e8`.

### magnusson_ep2

Jeu/source : Half-Life 2: Episode Two. Propriétaire : `magnusson_ep2` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/magnusson_ep2_idle_k.png` — 778 × 2022, RGBA. SHA Git : `91fa4c0880802dcdbfbcbd49f2e1f31f59a0b0c8`.

Revue : Silhouette Episode Two, blouse bleu-gris, cravate rose, stylos et badge conservés. Le visage, la photo du badge et les mains sont réinterprétés; les rayures fines de cravate sont atténuées. Comparer aussi la coupe de veste et les chaussures. Corps complet, marges inférieures aux 10 % demandés; composites blanc/noir lisibles. Aucun dispositif Magnusson ajouté. Un seul appel K; refus historique conservé.

Références inspectées :

- [Magnusson_model.jpg](https://combineoverwiki.net/images/b/bb/Magnusson_model.jpg) — `community_wiki_game_model_or_capture`. Exact retail outfit and model. Empreinte SHA-256 : `71e2821a7ff69e172989f38a0763dd5fd0c7036819e09cc43e124e00c823b73c`.

### fisherman_lostcoast

Jeu/source : Half-Life 2: Lost Coast. Propriétaire : `fisherman_lostcoast` (`support_character`).

**Refus à la sortie du service** (`moderation_blocked`, catégorie `other`). Aucun PNG livré. Identifiant de requête : `0a4ea57e-d8e0-4371-8ca1-69d9d7d92d94`. Un seul appel, aucun réessai ni reformulation ; le prompt exact et l'erreur retournée sont conservés dans le registre.

Références inspectées :

- [Fisherman.jpg](https://combineoverwiki.net/images/a/ac/Fisherman.jpg) — `community_wiki_game_model_render`. Exact released model and outfit; source bitmaps inspected before generation. Empreinte SHA-256 : `46bd97e5dc4353572425b67a7089d99493b223b568cb76521471fcf3a2919874`.

### russell_hla

Jeu/source : Half-Life: Alyx. Propriétaire : `russell_hla` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/russell_hla_idle_k.png` — 1145 × 1374, RGBA. SHA Git : `7940f97de5b866690c12db94c7ff6b71e8cce584`.

Revue : Tenue retail, casque audio, casquette et brassard identifiables. Visage légèrement réinterprété et marquage du brassard à comparer; détails d’usure affinés. Corps entier, marge verticale très mince; candidat non certifié.

Références inspectées :

- [HLA_Russell.png](https://combineoverwiki.net/images/b/be/HLA_Russell.png) — `community_wiki_game_model_render`. Exact released model and outfit; source bitmaps inspected before generation. Empreinte SHA-256 : `52f9780604c585ab7174528e26c29a67f5bfe6d8d62242ab1d7c5ec97863c915`.

### larry_hla

Jeu/source : Half-Life: Alyx. Propriétaire : `larry_hla` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/larry_hla_idle_k.png` — 1145 × 1374, RGBA. SHA Git : `c22e3a21a9f3b36ed6b0811eb0050e13d30b751f`.

Revue : Casque à clous, lunettes, couleurs des vêtements et équipement de sac visibles. Le rendu montre deux bouteilles vertes (une latérale et une plus haute), à comparer aux vues sources; visage et disposition exacte des clous encore à vérifier. Marges verticales très étroites.

Références inspectées :

- [HLA_Larry02.png](https://combineoverwiki.net/images/8/88/HLA_Larry02.png) — `community_wiki_game_model_render`. Exact released model and outfit; source bitmaps inspected before generation. Empreinte SHA-256 : `8d9d36f93bcc58cfb6b80ecf9d9696a952057f0c92cbbda7b2d5e9d2fb837666`.
- [HLA_Larry01.png](https://combineoverwiki.net/images/b/be/HLA_Larry01.png) — `community_wiki_game_model_render`. Exact released model and outfit; source bitmaps inspected before generation. Empreinte SHA-256 : `0eb853c84a8e185906d390cc660806336b9d6d9ca8d44b2348e7cd5b98cd4395`.

### gary_hla

Jeu/source : Half-Life: Alyx. Propriétaire : `gary_hla` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/gary_hla_idle_k.png` — 1199 × 1312, RGBA. SHA Git : `b5a3fbd238e0f61ab80e4736313c2164277f0420`.

Revue : Gary HLA reconnaissable : bandages, fixations et trois bras conservés. Visage, grains de peau et épaisseur des doigts légèrement réinterprétés. Composite blanc/noir inspecté, silhouette complète, marge basse étroite. Candidat sans certification 1:1.

Références inspectées :

- [HLA_Gary.png](https://combineoverwiki.net/images/6/60/HLA_Gary.png) — `community_wiki_game_model_render`. Exact released world/model variant inspected before generation. Empreinte SHA-256 : `f3e04373ac76c6cfa91fcbe618c12becbb5dd2ad107b95919a50668bb9059e98`.

### simmons_blueshift

Jeu/source : Half-Life: Blue Shift. Propriétaire : `simmons_blueshift` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/simmons_blueshift_idle_k.png` — 1002 × 1570, RGBA. SHA Git : `9838bb853cb09e926e1f0a485a36f809bb1a0bdc`.

Revue : Visage nommé de Simmons, chemise bleue et cravate rayée conservés. Corps entier reconstruit à partir du portrait et de la vue arrière; bas de blouse frontal, mains et détails du pantalon à contrôler. Petite frange claire du vêtement visible sur noir. Source Blue Shift, pas scientifique générique.

Références inspectées :

- [Simmons_idle.jpg](https://combineoverwiki.net/images/9/91/Simmons_idle.jpg) — `community_wiki_game_capture`. Named character portrait plus same-game clothing/body captures; hidden front garment details still require review. Empreinte SHA-256 : `168309219293719c814fb72025ed571a0394dfb92aa01492920af89efde79d82`.
- [BS_Simmons01.jpg](https://combineoverwiki.net/images/e/e9/BS_Simmons01.jpg) — `community_wiki_game_capture`. Named character portrait plus same-game clothing/body captures; hidden front garment details still require review. Empreinte SHA-256 : `a189c750045a6509a08ebf1847e05cd057970de3dcc6a7fd96c24214d694eb83`.

### walter_bennet_blueshift

Jeu/source : Half-Life: Blue Shift. Propriétaire : `walter_bennet_blueshift` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/walter_bennet_blueshift_idle_k.png` — 979 × 1606, RGBA. SHA Git : `0e627fa69eed1a1646826c3fbf63eb2a72336345`.

Revue : Visage étroit, calvitie et lunettes du Walter de Blue Shift conservés. Bas du corps reconstruit à partir de captures du même jeu, sans emprunt au Dr. Walter PS2; longueur de blouse, plis et mains à comparer. Composite noir révèle quelques franges claires fines, sans rectangle de fond.

Références inspectées :

- [Walter.jpg](https://combineoverwiki.net/images/f/f0/Walter.jpg) — `community_wiki_game_capture`. Named character portrait plus same-game clothing/body captures; hidden front garment details still require review. Empreinte SHA-256 : `2e7cd90c4ddabc447e8a069dedbe90eae5d7547af1c8dae0e439413f1c038fdd`.
- [Walter_crowbar.jpg](https://combineoverwiki.net/images/0/01/Walter_crowbar.jpg) — `community_wiki_game_capture`. Named character portrait plus same-game clothing/body captures; hidden front garment details still require review. Empreinte SHA-256 : `74886b5425ccc7d730321424d9758439f0c87ecb85917e01c37c6d12fb8f7885`.
- [Ba_teleport20027.jpg](https://combineoverwiki.net/images/e/ee/Ba_teleport20027.jpg) — `community_wiki_game_capture`. Named character portrait plus same-game clothing/body captures; hidden front garment details still require review. Empreinte SHA-256 : `834868fe53bbd16c58998ef3afe4eaca49b74bfcc1d0c10c359b9fec9d2973f3`.

### richard_keller_decay

Jeu/source : Half-Life: Decay. Propriétaire : `richard_keller_decay` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/richard_keller_decay_idle_k.png` — 1254 × 1254, RGBA. SHA Git : `30ac28d39306dc56bc93a1060f1b6c64902f533f`.

Revue : Fauteuil entier avec repose-pieds et roues conservé, Keller reste assis. Géométrie des roues et tête affinées par génération; petite frange claire ponctuelle sur l’épaule gauche visible sur noir. Taille relative du fauteuil à comparer au modèle PS2. Candidat non certifié.

Références inspectées :

- [Hldy_keller.png](https://combineoverwiki.net/images/4/43/Hldy_keller.png) — `community_wiki_game_model_render`. Exact source variant; supplied bitmaps inspected before generation. Empreinte SHA-256 : `e3c9c8a0059f2557f4843ba62d698f8f16b6dd35f8a319b2ee0a968cb966c36d`.
- [Hldy_wheelchair01.png](https://combineoverwiki.net/images/c/c6/Hldy_wheelchair01.png) — `community_wiki_game_model_render`. Exact source variant; supplied bitmaps inspected before generation. Empreinte SHA-256 : `b54ccc249399b6251a09138bb0647482ee7b9f52adcc662e487991d9a2565e3e`.

### black_ops_male_op4

Jeu/source : Half-Life: Opposing Force. Propriétaire : `black_ops_male_op4` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/black_ops_male_op4_idle_k.png` — 887 × 1774, RGBA. SHA Git : `fe57e8f74e23c218d119fedf67e8636a475cb310`.

Revue : Uniforme, cagoule et arme abaissée correspondent au Black Ops masculin Opposing Force. Visage, boucles et textures sont plus détaillés que la source LD; proportions du chargeur et pièces de ceinture à vérifier. Composites blanc/noir inspectés.

Références inspectées :

- [Assassin_male01.png](https://combineoverwiki.net/images/c/c9/Assassin_male01.png) — `community_wiki_game_model_render`. Exact source variant; supplied bitmaps inspected before generation. Empreinte SHA-256 : `d85aa7434b0703bcf40a29e756b2dad76b9e4c84be96a363a7be161b346658ea`.

### shock_roach_op4

Jeu/source : Half-Life: Opposing Force. Propriétaire : `shock_roach_op4` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/shock_roach_op4_idle_k.png` — 1316 × 1195, RGBA. SHA Git : `2bba5f5727d0d1e4aeaf65c7c4af423869303cd8`.

Revue : Silhouette angulaire GoldSrc et trois longues pointes antérieures conservées. Le détail interne de l’extrémité bleue est inventé/précisé au-delà de la petite source et doit être comparé. Composites blanc/noir lisibles; candidat non certifié.

Références inspectées :

- [Shock_Roach.jpg](https://combineoverwiki.net/images/4/4a/Shock_Roach.jpg) — `community_wiki_game_model_render`. Exact released world/model variant inspected before generation. Empreinte SHA-256 : `cfebf73ea39ab4b2d6b874f86970e92bd27f1f4a0bfb1d8bd4462e6d4ac8cfcf`.

### snark_hl1

Jeu/source : Half-Life. Propriétaire : `snark_hl1` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/snark_hl1_idle_k.png` — 1312 × 1199, RGBA. SHA Git : `62328ac6a6df49facd828c1e7cbd430bf64fc313`.

Revue : Modèle LD rouge/noir avec œil vert conservé, sans mélange HLA. Texture agrandie et lissée; contours et proportion exacte des appendices restent à comparer. Détourage lisible sur blanc/noir, candidat non certifié.

Références inspectées :

- [Snark_w.jpg](https://combineoverwiki.net/images/6/62/Snark_w.jpg) — `community_wiki_game_model_render`. Exact released world/model variant inspected before generation. Empreinte SHA-256 : `9e041e7cc134acdad2f29c0c1717d6a078f8b2d93fde2a680a46b0f238ff43a8`.

### doug_rattmann_labrat

Jeu/source : Portal 2: Lab Rat. Propriétaire : `doug_rattmann_labrat` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/doug_rattmann_labrat_idle_k.png` — 1024 × 1536, RGBA. SHA Git : `8bd5ca4fbdbb5a0b389e56794724fd12fd5af748`.

Revue : Adaptation de pose idle du Doug hirsute du comic officiel, distinct du flashback rasé. Le dessin conserve les hachures, la blouse et le Cube; harnais thoracique et boucles ajoutés/reconstruits par la génération au-delà des vues disponibles. Visage, sangles, échelle du Cube et pose à contrôler. Composites blanc/noir sans fond opaque; alpha max 254.

Références inspectées :

- [Valve_Lab_Rat_p08.jpg](https://media.steampowered.com/apps/portal2/comic/part1/p08.jpg) — `primary_valve_official_comic`. Present-day dishevelled comic appearance, explicitly adapted to a new idle pose; not a released game model. Empreinte SHA-256 : `0cfcc4217cda79d1582c172e3e1227c99e40590d2ef220157f20f94ab582e363`.
- [Doug_running.jpg](https://combineoverwiki.net/images/5/5b/Doug_running.jpg) — `community_wiki_official_comic_reproduction`. Present-day dishevelled comic appearance, explicitly adapted to a new idle pose; not a released game model. Empreinte SHA-256 : `b5cbec380763111850a98e6ddad5b232725bbc51cb8d84eed11cf6be33f2479e`.

### bendy_peti

Jeu/source : Portal 2: Perpetual Testing Initiative. Propriétaire : `bendy_peti` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/characters/bendy_peti_idle_k.png` — 1001 × 1572, RGBA. SHA Git : `d722ab598e8e3b5398782b6adb0bff391569a71f`.

Revue : Silhouette noire schématique conforme à la vue modèle, sans visage ni corps réaliste. Compositing blanc valide la tête ronde, le bras levé et les jambes; disparition sur noir attendue pour un aplat noir. Pose du modèle retenue, absence de portal gun volontaire pour cette pose de base.

Références inspectées :

- [Bendy.png](https://combineoverwiki.net/images/9/92/Bendy.png) — `community_wiki_model_or_ingame_capture`. Exact source variant; supplied bitmaps inspected before generation. Empreinte SHA-256 : `3ad7686956a74f6a88dc5904baf0d085467dc199b5cc1a1892c0709e2164644b`.
- [Bendy_PETI.png](https://combineoverwiki.net/images/8/83/Bendy_PETI.png) — `community_wiki_model_or_ingame_capture`. Exact source variant; supplied bitmaps inspected before generation. Empreinte SHA-256 : `b4d44f74d12c430d00c98d982d721a3b5a99ddfd80044547a860492611e28596`.

### costume_gman_hla

Jeu/source : Half-Life: Alyx. Propriétaire : `gman_hl2` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/costumes/costume_gman_hla_idle_k.png` — 1199 × 1312, RGBA. SHA Git : `89dc2d2e9b0971cddc99859c188faf891f4049b3`.

Revue : Version HLA : suit bleu-gris, cravate violette et mallette conservés. Visage et plis affinés par génération; forme exacte des poches et mallette à comparer. Détourage complet inspecté sur blanc/noir; candidat non certifié.

Références inspectées :

- [HLA_Gman.png](https://combineoverwiki.net/images/c/cc/HLA_Gman.png) — `community_wiki_game_model_render`. Exact released costume variant inspected before generation. Empreinte SHA-256 : `9e57af507a23bace8afa3d0c33c3a6e13a5c97bc7f47fbde42f5e3a2a3d60832`.

### costume_mossman_arctic

Jeu/source : Half-Life 2: Episode One / Episode Two. Propriétaire : `mossman_hl2` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/costumes/costume_mossman_arctic_idle_k.png` — 731 × 2152, RGBA. SHA Git : `cc8dfceea0ebbcb2b69e5d2a0535413a26233f17`.

Revue : Tenue retail Episode One : manteau vert, col écru, gants noirs et pantalon kaki conservés. Visage et volumes réinterprétés, distinction explicite avec les concepts Episode Three. Pieds complets, marge basse étroite; composites blanc/noir inspectés.

Références inspectées :

- [Mossman_model_ep1.jpg](https://combineoverwiki.net/images/e/e0/Mossman_model_ep1.jpg) — `community_wiki_game_model_render`. Exact released costume variant inspected before generation. Empreinte SHA-256 : `7b8b4a023f3b11a86ae9abd6a3cc9b489dfd84c221d6c809b808fe4da3438acc`.

### costume_barney_cp_helmet

Jeu/source : Half-Life 2. Propriétaire : `barney_hl2` (`fighter`).

PNG : `assets/resonance/candidates/continuation_20261125_k/costumes/costume_barney_cp_helmet_idle_k.png` — 790 × 1989, RGBA. SHA Git : `e1883a68fb8b9a6053b87c2f1ea547cf51cde227`.

Revue : Recomposition explicite de la capture de Barney masqué à la gare et du modèle retail démasqué pour le corps. Aucun visage exposé; tenue sombre, épaules claires, brassard, deux ceintures, pantalon vert et bottes conservés. La calotte paraît plus arrondie; les lentilles, respirateurs et jonction casque/cou doivent être comparés de près à la capture, ainsi que les poches. Pose bras baissés reconstituée. Corps complet sans rectangle de fond sur composites blanc/noir; marges inférieures aux 10 % demandés. Un seul appel K; refus historique conservé.

Références inspectées :

- [Disguised_Metrocop_Barney.jpg](https://combineoverwiki.net/images/a/a6/Disguised_Metrocop_Barney.jpg) — `community_wiki_game_model_or_capture`. Released Point Insertion masked disguise, cropped body screenshot. Empreinte SHA-256 : `658baad5da6306ef5783e11f1dbc0d24a0b258d2f5e3a3b1ba037189d72837f9`.
- [Barney_hl2.jpg](https://combineoverwiki.net/images/0/0b/Barney_hl2.jpg) — `community_wiki_game_model_or_capture`. Unmasked retail model used only for the matching full body uniform. Empreinte SHA-256 : `82153457a56ad1164150d5fc5f3eb9288461f7bd84c639ba69908977d62f6a07`.

### costume_colette_headtohead_ps2

Jeu/source : Half-Life — PlayStation 2. Propriétaire : `colette_decay` (`fighter`).

PNG : `assets/resonance/candidates/continuation_20261125_k/costumes/costume_colette_headtohead_ps2_idle_k.png` — 1024 × 1536, RGBA. SHA Git : `fafd0f0e24f8e41f5c53a277e79a7968729cf133`.

Revue : Palette rouge du modèle PS2 Head-to-Head et construction HEV cohérentes. Visage plus réaliste et proportions d’armure modifiées par rapport au modèle polygonal; comparaison exacte requise. Brume visible dans l’aperçu RGB située hors silhouette transparente; composites blanc/noir ne montrent pas de fond opaque. Alpha maximal 254, franges faibles consignées.

Références inspectées :

- [PS2_HtHPortrait_Colette.png](https://combineoverwiki.net/images/6/6e/PS2_HtHPortrait_Colette.png) — `community_wiki_game_model_render`. Exact released costume variant inspected before generation. Empreinte SHA-256 : `d7f9607fbfa785779f258b0dcb44fedabdf25dd14aba5297b7f96159fdeea168`.
- [Ps2_colette_dm.png](https://combineoverwiki.net/images/b/be/Ps2_colette_dm.png) — `community_wiki_game_model_render`. Exact released costume variant inspected before generation. Empreinte SHA-256 : `d3676557f368702c1c1954157459b6efc10ec5e918af001988c4701de5ed0765`.

### skeleton_hl25_multiplayer

Jeu/source : Half-Life Deathmatch — 25th Anniversary / Further Data. Propriétaire : `skeleton_hl25_multiplayer` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/costumes/skeleton_hl25_multiplayer_idle_k.png` — 1199 × 1312, RGBA. SHA Git : `b57b0480c403e7a42178f089243843c986c92e84`.

Revue : Structure polygonale et articulations caractéristiques conservées; rouge retenu comme teinte d’yeux réglable de cette candidate. Forme du bassin et nombre de côtes texturées doivent être comparés; aucun équipement inventé. Composites blanc/noir inspectés.

Références inspectées :

- [Dm_skeleton_25upd.png](https://combineoverwiki.net/images/0/02/Dm_skeleton_25upd.png) — `community_wiki_game_render_or_capture`. Released multiplayer model/25th Anniversary selection reference. Primary Valve update description separately checked; community hosting retained. Empreinte SHA-256 : `e1391022ebf4ddb8e6b5bb01ab17fd5f852231beaabc96fce5b5a7a6cae437f2`.
- [Dm_skeleton_preview_25upd.png](https://combineoverwiki.net/images/7/7e/Dm_skeleton_preview_25upd.png) — `community_wiki_game_render_or_capture`. Released multiplayer model/25th Anniversary selection reference. Primary Valve update description separately checked; community hosting retained. Empreinte SHA-256 : `bc65bbee652330fa245a2d3c78989ee7bd210ff3784ff7cd2ea4ba17e8f03b17`.

### too_much_coffee_man_hl25_multiplayer

Jeu/source : Half-Life Deathmatch — 25th Anniversary / Further Data. Propriétaire : `too_much_coffee_man_hl25_multiplayer` (`support_character`).

PNG : `assets/resonance/candidates/continuation_20261125_k/costumes/too_much_coffee_man_hl25_multiplayer_idle_k.png` — 1199 × 1312, RGBA. SHA Git : `c98dec12841763b946e983343b263e8e87e2c9c9`.

Revue : Modèle multijoueur GoldSrc, yeux saillants et grande tasse supérieure conservés. Motif jaune TM/CM partiellement déformé et volume de la tasse à revoir; fine frange claire au bord supérieur sur noir. Aucune confusion revendiquée avec une illustration originale du comic.

Références inspectées :

- [Dm_tmcm.png](https://combineoverwiki.net/images/4/44/Dm_tmcm.png) — `community_wiki_game_render_or_capture`. Released multiplayer model/25th Anniversary selection reference. Primary Valve update description separately checked; community hosting retained. Empreinte SHA-256 : `334bd8191aa4ee0cfa1955393cf72859ad82a4513772b220d038e626467e1c11`.
- [Dm_tmcm_preview_25upd.png](https://combineoverwiki.net/images/a/ad/Dm_tmcm_preview_25upd.png) — `community_wiki_game_render_or_capture`. Released multiplayer model/25th Anniversary selection reference. Primary Valve update description separately checked; community hosting retained. Empreinte SHA-256 : `b622b87fdae1a4cbd8853bb1be3091ac5a35eb25c7ac2d3de3df197d659a4429`.
- [HL1_25th_Anniversary_Promo_Playermodels.jpg](https://combineoverwiki.net/images/f/f3/HL1_25th_Anniversary_Promo_Playermodels.jpg) — `community_wiki_game_render_or_capture`. Released multiplayer model/25th Anniversary selection reference. Primary Valve update description separately checked; community hosting retained. Empreinte SHA-256 : `283fb5e970dddf12c05283021b9f295e03ec0a87705d231cda529c084ddacc16`.

## État final de ce registre partiel

La couverture des 28 cibles est exhaustive au niveau des issues : 27 candidates et 1 refus. Le Pêcheur de Lost Coast reste sans PNG dans ce lot. Aucun fichier fictif, aucune référence non inspectée présentée comme inspectée, et aucun report compté comme un appel de génération.

Les catégories et propriétaires sont conservés : `fighter`, `reserve_character` et `support_character` ; les costumes sont associés à leurs propriétaires déclarés. La consolidation des catalogues, l'intégration runtime et la publication du PR relèvent du travail global, hors de ce registre partiel.
