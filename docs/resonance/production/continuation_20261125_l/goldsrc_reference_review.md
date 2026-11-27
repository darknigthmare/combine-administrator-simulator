# Lot L — références et contrôle GoldSrc / Opposing Force

Date : 25 novembre 2026. Sous-lot clos : **4 PNG candidats pour 4 cibles, 2 reports, 0 refus de génération**. Quatre appels imagegen réels, un par PNG. Les deux reports n’ont donné lieu à aucun appel ni fichier de substitution.

Le registre associé est `goldsrc_generation.json`. Il conserve les prompts exacts, références inspectées, empreintes, valeurs alpha et issues explicites des six cibles. Les quatre images sont des études candidates ; aucune ne certifie une fidélité 1:1, une animation complète, une intégration au jeu ou une activation runtime.

## Six issues explicites

| Cible | Issue | Portée exacte |
|---|---|---|
| `proj_mp5_grenade_hl1` | PNG candidat | Corps dérivé du véritable `grenade.mdl` de la démo Uplink ; pickup `w_ARgrenade.mdl` exclu. |
| `fx_bullsquid_spit_impact_hl1` | PNG candidat | Dépôt persistant `{SPIT1` seulement ; ni corps en vol, ni spray de contact, ni chronologie complète. |
| `proj_displacer_orb_opfor` | PNG candidat d’étude | Composant `exit1.spr` de la démo Uplink ; association au Displacer dans une implémentation communautaire OP4. |
| `proj_gene_worm_spit_opfor` | PNG candidat d’étude | Composant `ballsmoke.spr` de la démo Uplink, teinte verte documentée par l’implémentation communautaire OP4. |
| `fx_bullet_tracer_hl1` | Différé sans appel | Pas de bitmap retail du traceur inspecté avec une précision suffisante. |
| `proj_gonome_gut_opfor` | Différé sans appel | Rendu et teinte du projectile retail non résolus ; storyboards trop petits et code communautaire ambigu. |

## Provenance des ressources inspectées

Les octets proviennent d’une **ressource de la démo Uplink, miroir communautaire** : [archive uplink.zip](https://raw.githubusercontent.com/x8BitRain/webXash/main/public/hl/uplink.zip) dans [x8BitRain/webXash](https://github.com/x8BitRain/webXash). L’archive téléchargée mesure 30 578 171 octets ; SHA256 `3ac735117a99b9a17d3d3a133b86a9f7b48b5ca82ff96ad6f7f764fa327d1088`.

Le nom d’un fichier partagé ne prouve pas son identité binaire avec une édition retail. Aucun fichier issu d’une installation retail Half-Life ou Opposing Force n’a été comparé octet par octet. Les PNG de référence sont des vues calculées ou des frames décodées de cette archive, **pas des captures en jeu**. La provenance communautaire n’est jamais présentée comme une publication officielle Valve ou Gearbox.

| Ressource extraite | Octets | SHA256 |
|---|---:|---|
| `valve/models/grenade.mdl` | 6 656 | `bc6126523037ed6442fdd44c0ed9f69e2b024bdcc8e2a60dbcc39f97bd847ec9` |
| `valve/sprites/tinyspit.spr` | 1 914 | `c233a501186fe9da4344b0ce3aa924eb738cb36069d82d9c4d5b9cb75f5478bb` |
| `valve/sprites/bigspit.spr` | 4 986 | `33c06d26d3af340b5211320e817d2227091df5930b1fa45e764e7b7d24d7231e` |
| `valve/sprites/exit1.spr` | 161 310 | `057e9ed2a9fcef4c9b71b56614ec172402771012440472a9551332bdc796538f` |
| `valve/sprites/ballsmoke.spr` | 54 318 | `5a3df03849babcf7cb0eee2f94d9981f32709c096c2515597ab7f9ef78dfaec7` |
| `valve/decals.wad` | 924 840 | `17726e8174729011c7ea4e1e37b4ccfe7a9aa4abb82c2aaca87872cbe0c106d0` |

### Modèle de la grenade MP5

Le [SDK officiel Valve, ggrenade.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/ggrenade.cpp) identifie `models/grenade.mdl` pour le corps créé par `CGrenade::Spawn`; [mp5.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/mp5.cpp) appelle `ShootContact`. La vue ne vient donc pas de l’illustration du pickup de munitions écartée au lot K.

Le modèle Uplink IDST version 10 a été décodé selon [studio.h officiel](https://github.com/ValveSoftware/halflife/blob/master/engine/studio.h). L’inspection retrouve 18 sommets, 32 triangles et deux textures indexées `Side1` et `Tip1`. Les bandes/fans de triangles et UV originaux sont rendus par projection orthographique, échantillonnage nearest et éclairage directionnel simple, dans l’espace de liaison du modèle. Deux vues latérale et trois quarts ont été réellement inspectées et fournies à imagegen. Cette méthode conserve une preuve de la géométrie et des textures ; elle ne constitue ni rendu moteur ni capture retail.

### Decal et sprites

Les fichiers IDSP version 2 ont été décodés avec leur palette. Pour `tinyspit` et `bigspit`, le mode index-alpha utilise l’index comme alpha et la dernière entrée de palette comme couleur : respectivement RGB 150/158/19 et 123/138/1. Leur première frame a été inspectée ; elles n’ont pas été substituées au decal de contact.

Le [SDK officiel bullsquid.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/bullsquid.cpp) distingue le corps `bigspit.spr`, les particules `tinyspit.spr` et les marques `DECAL_SPIT1/2`. Au contact d’une surface non endommageable, il dépose une marque puis émet séparément cinq particules. Le candidat représente seulement `{SPIT1`.

La prévisualisation du decal suit l’interprétation gradient décrite dans [img_wad.c](https://github.com/FWGS/xash3d-fwgs/blob/master/engine/common/imagelib/img_wad.c) et [img_utils.c](https://github.com/FWGS/xash3d-fwgs/blob/master/engine/common/imagelib/img_utils.c) du moteur communautaire Xash : couleur de palette 255, indice comme alpha, indice 255 transparent. `{SPIT1` est RGB 204/228/40 et `{SPIT2` RGB 182/248/54. Les deux previews ont été inspectés ; seul SPIT1 a servi à la génération. Cette vue calculée n’est pas une capture du moteur GoldSrc retail.

Les premières frames `exit1` et `ballsmoke` ont été inspectées avec leur palette originale et leur fond noir de ressource additive. Le noir sert de référence de compositing, sans devenir un fond opaque dans les PNG candidats.

### Limite Uplink → Opposing Force

[halflife-op4-updated](https://github.com/twhl-community/halflife-op4-updated/blob/master/README.md) se présente comme une implémentation de référence communautaire ; ce n’est pas le code source officiel Gearbox. Dans [CDisplacerBall.cpp](https://github.com/twhl-community/halflife-op4-updated/blob/master/dlls/weapons/CDisplacerBall.cpp), `CDisplacerBall::Spawn` utilise `exit1.spr`. Le candidat couvre cette base seulement. Les faisceaux `lgtning.spr`, l’anneau de contact `disp_ring.spr` et l’auto-téléportation sont exclus.

Dans [geneworm.cpp](https://github.com/twhl-community/halflife-op4-updated/blob/master/dlls/geneworm.cpp), `env_genewormcloud` utilise `ballsmoke.spr` et une couleur RGB 0/255/0. Le candidat applique cette teinte documentée à la frame inspectée. Il ne prouve pas le rendu retail complet du crachat, sa trajectoire, sa taille, sa durée ou son compositing.

L’association par nom de ressource est documentée, mais **l’égalité binaire Uplink–OP4 n’est pas vérifiée**. Les vues du portail du boss et de son apparition lumineuse restent exclues du crachat.

## Références bitmap utilisées pour les appels

| Preview réellement inspecté et fourni | Dimensions | SHA256 |
|---|---:|---|
| `uplink_grenade_side_preview.png` | 512 × 512 | `6214173dbf62701277088f9f18e90dc214018d43187a7581d8546cfda331192b` |
| `uplink_grenade_threequarter_preview.png` | 512 × 512 | `43be36015043f9b3572c058435ed4ec00d880ee089c36901bd161a36c17c750a` |
| `uplink_spit1_gradient_preview.png` | 32 × 32 | `e0cd060fdd68b60c4e9d1589182509c3e618ec257e74a3aa346374f2e2afbc2c` |
| `uplink_exit1_frame0.png` | 80 × 80 | `7d28e90f2db1ae8b6cd1271c8dcdd215f22813ed6026cb7a412b72af52420bca` |
| `uplink_ballsmoke_frame0.png` | 64 × 64 | `1effe171e6452d474110a148317d9ba4c6803a0c6400224870d495e82acc21b0` |

Les fichiers de travail restent dans le dossier de recherche dédié `resonance-l-work/goldsrc/references/`. Le registre conserve aussi l’URL et l’empreinte de la ressource source pour permettre de distinguer original, preview dérivé et PNG généré.

## Reports et recherches non concluantes

### Traceur Half-Life

Le constat K est conservé : tir instantané et effet visuel optionnel sont deux choses distinctes. Aucun bitmap retail exploitable du traceur n’a été inspecté. Les métadonnées du [showcase Classic and HD Models, Dat Mental Gamer](https://www.youtube.com/watch?v=obS5RitWxoY) ont été obtenues, avec séparation des sections Classic et HD, mais aucune frame de ce showcase n’est déclarée inspectée. Un effet générique, une balle lente, un laser de plugin ou un traceur de mod ne résoudrait pas la référence exacte demandée.

Prochaine preuve nécessaire : une frame nette accompagnée d’un court segment GoldSrc retail, version et configuration précisées, qui fixe forme, couleur et état temporel.

### Gut du Gonome

La première frame Uplink de `bigspit.spr` a été inspectée. [gonome.cpp communautaire](https://github.com/twhl-community/halflife-op4-updated/blob/master/dlls/gonome.cpp) associe cette ressource à `COFGonomeGuts`, mais écrit trois fois `rendercolor.x` ; un TODO signale cette anomalie. La suite de valeurs 128, 32, 128 ne permet donc pas d’annoncer une couleur RGB violette du jeu retail.

Les sept storyboards du [gameplay de Gameraiders101](https://www.youtube.com/watch?v=nxD66_quaA8) ont été réellement inspectés. Les vignettes, scènes sombres et autres effets visibles n’isolent pas le projectile assez précisément. La mention de « green stuff » dans le texte du vidéaste ne remplace pas une preuve bitmap. Aucun appel imagegen n’a été effectué pour cette cible.

Prochaine preuve nécessaire : vues nettes retail du gut en main, en vol puis au contact, avec locale/configuration et palette confirmées. Le modèle du monstre et les projectiles du joueur restent exclus.

### Pistes vérifiées mais écartées

Le catalogue communautaire [Half-Life-prepared-original-textures](https://rtxash.omgwtf.ru/Half-Life-RTX/Half-Life-prepared-original-textures) a permis d’identifier des ressources originales préparées, sans utiliser les remplacements PBR. Ses exports gris de sprites index-alpha ne suffisaient pas à déterminer la couleur ; les palettes des ressources Uplink ont été examinées ensuite.

Les storyboards du [showcase OP4](https://www.youtube.com/watch?v=F5hCh1t-YSg) et certaines planches du [combat Gene Worm](https://www.youtube.com/watch?v=Ogdnz4x15ik) ont été consultés, sans isoler de preuve nette de la phase recherchée. Dans le combat du boss, portail, spore du joueur et effets du boss ne sont pas confondus. Les téléchargements de segments vidéo ont retourné un refus HTTP 403 ; aucun contournement n’a été tenté.

Les miroirs FastDL essayés ont retourné 403 ou 503 ; l’exécutable Uplink sur Valve Archive a retourné 403. Aucun de ces téléchargements n’est présenté comme réussi. L’archive webXash accessible est la provenance effective des octets exploités.

## PNG et contrôle d’intégrité

Chaque résultat a été conservé en mémoire dès le retour imagegen, téléversé en blob GitHub, puis recopié localement après vérification du SHA Git calculé sur `blob <taille>\\0<octets>`. Les PNG originaux n’ont été ni recadrés, ni recolorés, ni réencodés. Les temporaires base64 ont été supprimés après validation. Les compositions de contrôle blanc/noir sont des fichiers de QA séparés.

| Asset | Dimensions | Octets | SHA256 | SHA blob Git |
|---|---:|---:|---|---|
| `proj_mp5_grenade_hl1_body_l` | 1774 × 887 | 848234 | `f2bb7ab092efbdbb2dd4543b606491695a429f374533b3c607ab5deb42493941` | `bb3b783864361ea1e7a1c04f192ea7e2ed54482e` |
| `fx_bullsquid_spit_impact_hl1_impact_decal_spit1_l` | 1536 × 1024 | 1355347 | `62c03db84cefacf585f4e2b24ed02b927700b72f4637dec9fdef224b670067c4` | `972355e385fa6721200f68c4699fcea5acb195c6` |
| `proj_displacer_orb_opfor_body_resource_study_l` | 1254 × 1254 | 933764 | `19406f0fbd0993afe926007b19ce109e1c30d693c084a06f3f48b4f7757a6e09` | `7936abc6277a84411b14628defa8e9064a777c3a` |
| `proj_gene_worm_spit_opfor_cloud_resource_study_l` | 1254 × 1254 | 523615 | `7c53573ddbdd9ac25425873f3f0a92ceb255c7df12ccf260221b8b25103bfe16` | `1615a6b297d23c6a87bab58103b17123fb16052e` |

### proj_mp5_grenade_hl1

Géométrie facettée, bandes rouges, corps olive-gris et capuchon concentrique correspondent à la vue calculée du modèle Uplink. Le rendu agrandit/réinterprète la texture et le relief du capuchon; les proportions semblent légèrement allongées par la perspective. Détourage lisible sur blanc/noir, marges amples autour de la silhouette utile; très faibles résidus alpha hors silhouette. Candidate d’étude Uplink : aucune identité binaire retail ni fidélité 1:1 déclarée.

Alpha : minimum 0, maximum 255; 948896 pixels entièrement transparents, 624270 partiellement transparents et 372 opaques. Boîte alpha > 8 : `[181,206,1545,699]`.

### fx_bullsquid_spit_impact_hl1

La silhouette asymétrique de {SPIT1 est reconnaissable : lobe supérieur gauche, branche droite et longue pointe inférieure gauche. Le générateur lisse et épaissit certaines zones, ajoute une texture nuageuse et un bord clair : ce n’est pas une reproduction pixel pour pixel. Les compositions blanc/noir montrent un decal détaché sans rectangle opaque; les très faibles pixels alpha autour de la forme ne doivent pas être confondus avec le RGB caché. Étude du dépôt persistant uniquement; spray de contact et chronologie exclus.

Alpha : minimum 0, maximum 254; 1121017 pixels entièrement transparents, 451847 partiellement transparents et 0 opaques. Boîte alpha > 8 : `[261,74,1272,959]`.

### proj_displacer_orb_opfor

Centre jaune pâle, zone orange et couronne verte irrégulière retrouvés. La granulation et la forme des lobes sont réinterprétées; la couronne est plus texturée que la petite frame inspectée. Transparence réelle lisible sur blanc/noir, sans fond noir conservé. Quelques pixels alpha très faibles atteignent les bords du canvas, tandis que la silhouette utile garde des marges. Étude du seul composant exit1 provenant d’Uplink, associé au Displacer par une implémentation communautaire; aucun rayon lgtning, anneau disp_ring, rendu retail OP4 ou correspondance binaire certifiée.

Alpha : minimum 0, maximum 254; 983869 pixels entièrement transparents, 588647 partiellement transparents et 0 opaques. Boîte alpha > 8 : `[202,172,1047,1035]`.

### proj_gene_worm_spit_opfor

Petit nuage vert diffus, partie supérieure plus lumineuse et ouvertures dans la partie basse; la disposition générale suit la frame ballsmoke inspectée, avec des volumes et des détails réinterprétés. Sur blanc/noir, les lobes restent translucides et aucun rectangle noir n’est conservé. Très faibles résidus alpha hors de la silhouette utile. Étude d’un seul composant ballsmoke d’Uplink auquel la teinte verte de l’implémentation communautaire OP4 est appliquée; le trajet, l’échelle, la durée et le rendu retail exact restent à vérifier.

Alpha : minimum 0, maximum 254; 1261108 pixels entièrement transparents, 311408 partiellement transparents et 0 opaques. Boîte alpha > 8 : `[334,315,902,903]`.

## État de livraison

Les six cibles ont une issue explicite. Quatre candidates sont sélectionnées pour une prochaine revue, avec `certified_one_to_one=false`, `integrated_in_game=false`, `runtime_enabled=false`, `visual_state_complete=false` et `animation_clip_complete=false`. Les deux reports conservent `generation_call_count=0`. Aucun registre global, catalogue, contrat de gameplay ou fichier runtime n’a été modifié dans ce sous-lot.

## Rattachement aux états contractuels — revue de consolidation

Le contrôle global a détecté trois libellés descriptifs qui n’étaient pas des identifiants du contrat. Les identifiants des assets, les prompts, les contrats et les PNG originaux restent inchangés; les composants sont désormais séparés de l’état auquel ils peuvent être rattachés.

| Cible | État contractuel candidat | Composant | Portée |
|---|---|---|---|
| Bullsquid | Aucun (`null`) | `persistent_decal_spit1` | La marque est identifiée, mais aucune chronologie ne permet de choisir `impact_start` ou `impact_end`; ces deux états restent sans candidat. |
| Displacer | `body` | `exit1_resource_study` | Étude du corps seulement; `displacement` et l’état complet restent à produire/valider. |
| Gene Worm | `body` | `ballsmoke_cloud_resource_study` | Étude du composant de corps seulement; `impact` et l’état complet restent à produire/valider. |

La grenade MP5 conserve `body`. Le lot GoldSrc livre quatre PNG pour quatre familles, mais seulement trois identifiants d’état contractuels avec candidat. Le contrôle ne complète aucune animation ou fidélité et ne déclenche aucun nouvel appel au générateur.
