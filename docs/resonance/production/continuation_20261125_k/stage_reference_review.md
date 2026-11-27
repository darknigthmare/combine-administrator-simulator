# Lot K — revue des références de décors

Date : 25 novembre 2026. Périmètre : 17 décors sans PNG et trois archives autorisées.

## Résultat

18 appels au générateur intégré ont produit 18 PNG, chacun pour une cible distincte. Deux archives sont reportées sans appel : Air Exchange et la scène arctique Episode Three. Les 20 cibles sont donc couvertes par une entrée de production ou de report.

Les 18 fichiers originaux mesurent chacun 1672 × 941 pixels, RGB 8 bits, sans canal alpha ; total : 42 576 673 octets. Tous les SHA-256 et SHA Git ont été recalculés depuis le disque après sauvegarde. Aucun réencodage, redimensionnement, détourage ou remplacement procédural n’a été appliqué.

Chaque PNG est un panorama maître aplati choisi pour la prochaine revue, sans certification de fidélité 1:1. Aucun des six plans de parallaxe, aucune animation complète et aucune intégration moteur ne sont déclarés terminés. `runtime_enabled`, `integrated_in_game`, `certified_one_to_one`, `animation_clip_complete` et `completed_six_layer_stage` restent faux, y compris pour l’archive Borealis.

## Méthode et conservation

Les captures sources ont été téléchargées avec leur fiche d’attribution, puis réellement inspectées avant l’appel. Le registre `stage_generation.json` conserve les URL originales, SHA-256 des captures, chemin de référence utilisé, prompt intégral, cible, propriétaire, dimensions, empreintes du PNG et observations visuelles. Les réponses `image_url` et spécifications ont été conservées immédiatement en mémoire de session. Les octets PNG ont ensuite été téléversés en blobs GitHub ; le SHA Git calculé localement dans l’orchestrateur a été comparé au SHA du connecteur avant la copie dans le dépôt. La vérification finale relit tous les PNG et recalcule les deux empreintes.

Les captures peuvent montrer des acteurs ou une interface du jeu source ; ces éléments sont exclus des panoramas. Les figurations peintes sur les panneaux zoologiques et les schémas industriels restent des éléments du décor. Le sol latéral continu est une adaptation pour le combat, pas la preuve d’une topologie identique au niveau d’origine.

## Couverture et sources retenues

| Cible | Master et référence inspectée | Limite principale |
| --- | --- | --- |
| `STG_06_OP4_CARGO` | `stage_op4_cargo_master_k` — [Friendly_Fire4.jpg](https://combineoverwiki.net/wiki/File:Friendly_Fire4.jpg) | Cadrage frontal adapté ; missile, cradles et trame des murs simplifiés/recomposés. L’occupation militaire reste un contexte, aucun soldat n’est peint. Dimensions exactes du lieu et raccordement aux six couches non validés. |
| `STG_07_OP4_GENE_WORM` | `stage_op4_gene_worm_chamber_master_k` — [Gene_Worm_defeated.jpg](https://combineoverwiki.net/wiki/File:Gene_Worm_defeated.jpg) ; [Gene_Worm_enters.jpg](https://combineoverwiki.net/wiki/File:Gene_Worm_enters.jpg) | Portail et parois recomposés en symétrie ; sol à environ 82 % (au lieu des 78 % demandés). Surface libre continue mais hauteur de sol à recalibrer lors de l’intégration ; aucune certification géométrique. |
| `STG_18_EP1_EVAC` | `stage_ep1_evac_platform_master_k` — [Ep1_trainstation2.jpg](https://combineoverwiki.net/wiki/File:Ep1_trainstation2.jpg) | Vue élevée source convertie en élévation latérale ; ordre et espacement des conteneurs et supports réinterprétés. Voie de combat à environ 82 % ; six plans et métrique du lieu à réaliser. |
| `STG_22_HLA_QUARANTINE` | `stage_hla_quarantine_street_master_k` — [QuarantineZone.jpg](https://combineoverwiki.net/wiki/File:QuarantineZone.jpg) | Vue originale surélevée transformée en rue ; la chaussée libre commence vers 86 %, plus étroite que prévu. Dimensions et hauteur des ouvrages de pied de mur à revoir ; aucun parcours exact certifié. |
| `STG_23_HLA_DISTILLERY` | `stage_hla_distillery_master_k` — [HLA_Distillery03.jpg](https://combineoverwiki.net/wiki/File:HLA_Distillery03.jpg) | Implantation originale des cuves ramenée à une rangée presque symétrique ; le sol (~81 %) reste continu mais la profondeur du lieu est simplifiée. Aucun Jeff, aucune bouteille ou obstacle dans la voie. |
| `STG_EXT_UPLINK_COMMUNICATIONS` | `stage_uplink_communications_master_k` — [Uplink_transmitter.jpg](https://combineoverwiki.net/wiki/File:Uplink_transmitter.jpg) | L’architecture circulaire a été ouverte en vue latérale ; profondeur du puits peu visible. Sol continu vers 83 %, texture de plaques métalliques à la place de la grille fine du modèle source. |
| `STG_EXT_BS_XEN_RELAY` | `stage_bs_xen_focal_point_master_k` — [Ba_focuser03.jpg](https://combineoverwiki.net/wiki/File:Ba_focuser03.jpg) | Disposition réinterprétée en élévation latérale ; détails du châssis/boîtiers non vérifiés à l’échelle. Aucun Xénophore vivant ; arche végétale source conservée comme élément décoratif. |
| `STG_10_DECAY_GAMMA` | `stage_decay_gamma_ps2_master_k` — [Decay_PS2_blog_24.jpg](https://ticketdorado.blogspot.com/2021/11/el-dr-freeman-esta-llegando-tardede.html) | Source PS2 attribuée par l’article et HUD inspecté, définition 640 px. La machine reproduit l’état visuel choisi mais ses petites pièces restent interpolées. Sol trop haut (~70 %) ; calibrage du master requis, aucun cycle d’activation. |
| `STG_EXT_DECAY_DORMITORIES` | `stage_decay_dormitories_ps2_master_k` — [Decay_PS2_blog_21.jpg](https://ticketdorado.blogspot.com/2021/11/el-dr-freeman-esta-llegando-tardede.html) | Capture de couloir étroit à faible définition ; passage à cinq travées frontales et ordre des portes réinterprétés. Les noms et numéros des chambres sont volontairement omis. Sol ~74 % ; topologie ht05dorms non certifiée. |
| `STG_24_HLA_VAULT` | `stage_hla_vault_apartment_master_k` — [Vault_Apartment_Hallway.jpg](https://combineoverwiki.net/wiki/File:Vault_Apartment_Hallway.jpg) | Choix limité au couloir d’appartement a5_vault, pas à toute la cellule du Vault. Trois portes remises frontalement et bois de la voie consolidé ; effet de gravité statique, non animé. |
| `STG_EXT_HLA_ZOO` | `stage_hla_zoo_captivity_master_k` — [HLA_Zoo01.jpg](https://combineoverwiki.net/wiki/File:HLA_Zoo01.jpg) | Panneaux adaptés et signes décoratifs non textuels conservés ; très petits tracés ressemblant à de faux caractères sur le bas d’un panneau. Aucun acteur vivant ou mort. Espacement du vestibule recomposé. |
| `STG_EXT_PORTAL1_MAINTENANCE` | `stage_portal1_maintenance_master_k` — [Escape_000006.jpg](https://combineoverwiki.net/wiki/File:Escape_000006.jpg) | Les quatre pistons ont été alignés pour la lecture latérale ; leur hauteur et phase sont fixes, sans animation. Grille de combat ajoutée à l’avant de la fosse comme adaptation ; sol vers 84 %, profondeur utile à vérifier. |
| `STG_EXT_PORTAL2_PEER_REVIEW` | `stage_portal2_peer_review_chamber4_master_k` — [Portal_2_Co-op_Course_6_Chamber_4.png](https://theportalwiki.com/wiki/File:Portal_2_Co-op_Course_6_Chamber_4.png) | La disposition du puzzle est simplifiée pour une vue de combat ; le gel n’est pas simulé. La structure du pont lumineux reste visuellement schématique. Grille libre vers 83 %, aucune mécanique de test intégrée. |
| `STG_EXT_PORTAL2_COOP_HUB` | `stage_portal2_coop_hub_master_k` — [Mp_coop_lobby_30500.jpg](https://theportalwiki.com/wiki/File:Mp_coop_lobby_30500.jpg) | Scores et pictogrammes de l’écran retirés ; proportions de la plateforme et position des sorties simplifiées. Sol continu vers 84 %. Le décor ne représente pas la révision initiale mp_coop_lobby_2. |
| `STG_EXT_PORTAL2_COOP_VAULT` | `stage_portal2_human_vault_master_k` — [Human_vault.jpg](https://combineoverwiki.net/wiki/File:Human_vault.jpg) | Occupants supprimés ; les sièges et harnais restent humanoïdes par leur fonction, surtout à petite échelle. Une revue agrandie des capsules lointaines reste nécessaire. Passerelle élargie et mise de profil, garde-corps derrière la voie, sol vers 83 %. |
| `STG_EXT_DESKJOB_FACTORY` | `stage_deskjob_factory_master_k` — [ADJ_screenshot_05.jpg](https://combineoverwiki.net/wiki/File:ADJ_screenshot_05.jpg) | Le schéma sanitaire reste peint sur le panneau malgré la consigne de l’omettre ; aucune lettre lisible. Extension latérale de l’atelier et sol industriel inférés pour cadrage. Produit inerte sans acteur ni tir. |
| `STG_EXT_DESKJOB_OFFICE` | `stage_deskjob_cave_office_master_k` — [ADJ_Cave_Office.jpg](https://combineoverwiki.net/wiki/File:ADJ_Cave_Office.jpg) | Zone centrale autrefois masquée par la tête comblée par un mur sombre uni, explicitement non attesté. Mobilier repoussé derrière la voie. Le plafond et le parquet réinterprétés ne certifient pas la géométrie du jeu. |
| `archive_borealis_hl2_cut` | `archive_borealis_hl2_e3_2002_master_k` — [Borealis_E3_screen.jpg](https://combineoverwiki.net/wiki/File:Borealis_E3_screen.jpg) | Pont de combat extrapolé depuis une capture extérieure ; l’image peut se lire comme le navire vu depuis un quai plutôt que comme son propre pont. Nombre et placement des hublots ainsi que structures latérales non validés. Archive de développement uniquement, aucune apparence Episode Three/HL3 revendiquée. |
| `archive_air_exchange_hl2` | **Report sans appel** | Le verrou exige une carte ou un concept daté. La version dave/temp3 est datée de février 2002 par l’article, mais la capture disponible porte la catégorie Images with fan-made modifications ; la portée de ces modifications n’est pas établie. Le concept de Viktor Antonov provenant de Raising the Bar est authentiquement attribué mais sa date de création n’est pas attestée par la fiche. Aucun maître produit en mélangeant ces versions. |
| `archive_arctic_ep3` | **Report sans appel** | Le documentaire officiel et les expériences Episode Three sont identifiés, mais aucune image de scène arctique n’a été inspectée et reliée à un timecode exact. Les concepts reproduits sur le wiki ne satisfont pas à eux seuls le verrou scène + timecode ; le repère approximatif 1:53 ne sert pas de preuve visuelle. Aucun appel image_gen et aucune apparence finale HL3 inventée. |

## Verrou PS2 de Decay

La source utilisée est la [revue Ticket Dorado de novembre 2021](https://ticketdorado.blogspot.com/2021/11/el-dr-freeman-esta-llegando-tardede.html). Son auteur précise que les captures proviennent de la version PS2 originale, et explique les HUD blanc pour Cross et orange pour Green. Le HUD blanc et l’icône de coopération ont été inspectés sur les captures retenues. Cette attribution est conservée comme déclaration de la source ; il ne s’agit pas d’une acquisition directe par notre équipe sur une console.

Le couloir des dortoirs montre les portes à clavier, les deux bandes murales jaune/bleu et la moquette bleu nuit à losanges jaunes. La capture Gamma montre la balise jaune articulée, repliée, dans l’enceinte rocheuse. La capture de la balise activée a aussi été inspectée, mais n’est pas mélangée au prompt : le maître choisit l’état replié. Les captures font environ 640 pixels de large ; les détails interpolés et l’adaptation latérale interdisent une certification 1:1. Les images `Dy_*` du port PC n’ont pas servi de référence bitmap aux deux appels.

## Révisions à ne pas mélanger

- Le dépôt OP4 est verrouillé sur la baie de stockage de Friendly Fire, plutôt qu’un assemblage de scènes militaires. La chambre Race X conserve le portail magenta ; le Gene Worm est retiré.
- Le quai EP1 est celui de Technical Trainstation, `ep1_c17_06`, Exit 17.
- Le Vault Alyx choisit le couloir de l’appartement contenu, `a5_vault`, et non les concepts de Red Door Sequence ou la cellule externe. Le zoo choisit le vestibule décoré de Captivity.
- Le hub coop Portal 2 choisit `mp_coop_lobby_3`, la variante Peer Review. Le panorama Art Therapy choisit précisément la chambre 4, `mp_coop_2paints_1bridge`.
- Le Human Vault choisit l’intérieur du lieu final ; les occupants sont retirés. Les supports de sièges restent anthropomorphes par leur fonction et les capsules lointaines doivent être revues à pleine définition.
- Les deux lieux Desk Job gardent la classe `official_alternate_continuity`. Le bureau final ne contient pas la tête de Cave ; le mur sombre au centre reconstruit une région masquée dans la source et est expressément incertain.

## Archives

### Borealis — candidat produit

La seule référence utilisée est la [capture promotionnelle officielle E3 2002](https://combineoverwiki.net/wiki/File:Borealis_E3_screen.jpg). Le propriétaire est `archive_borealis_hl2_cut`, avec `owner_type: support_character` selon le contrat d’extension, et `category: stage_master` pour l’artefact. Le master appartient à la version de développement HL2/Odell. Il ne représente ni la version Episode Three ni une apparence finale de Half-Life 3.

La coque rouge, la passerelle blanche, le mât et la cheminée sont observés dans la capture. Le sol de combat est extrapolé depuis une vue extérieure ; le résultat peut être lu comme une vue depuis un quai. Cette limite est consignée, et aucune géométrie du pont n’est certifiée. La capture `Borealis_s15.jpg`, étiquetée comme modifiée par des fans, n’a pas été utilisée pour la génération.

### Air Exchange — report

La [fiche de la capture temp3](https://combineoverwiki.net/wiki/File:Temp3_airex_01.jpg) indique la carte `dave/temp3` ; l’[article Air Exchange](https://combineoverwiki.net/wiki/Air_Exchange) situe sa dernière modification en février 2002. Cependant, la fiche classe la capture dans « Images with fan-made modifications ». La portée de ces modifications n’est pas établie. Le [concept du réacteur de Viktor Antonov](https://combineoverwiki.net/wiki/File:Airex_reactor.jpg), attribué à Raising the Bar, a été inspecté, mais la date de création de ce dessin n’est pas fournie par la fiche.

Le contrat exige une carte ou un concept daté et interdit le mélange de variantes. Ni une capture modifiée présentée comme originale ni une date inventée pour le concept ne permettent de remplir ce contrat. Aucun appel n’a été fait. Prochaine preuve nécessaire : une capture non modifiée d’une révision datée, ou un concept dont la date de création est attestée.

### Arctique Episode Three — report

Le [documentaire officiel Valve](https://www.youtube.com/watch?v=YCjNT9qGjh4) et la [page du vingtième anniversaire](https://www.half-life.com/en/halflife2/20th) documentent des expériences Episode Three. Toutefois, aucune image de scène arctique n’a été inspectée et associée à un timecode exact dans ce travail. L’index des concepts de l’[article Episode Three](https://combineoverwiki.net/wiki/Episode_Three) ne remplace pas cette preuve ; un repère approximatif vers 1 h 53 ne constitue pas un timecode de scène vérifié.

Aucun appel image_gen n’a été fait pour cette cible. Il faut une capture inspectable du documentaire avec son timecode exact, et préciser s’il s’agit d’un concept ou d’un prototype. Aucun décor commercial Half-Life 3 n’est présumé.

## Contrôle visuel des sorties

Les 18 sorties ont été inspectées après génération. Le registre décrit la présence des repères de source, la continuité du sol, l’absence d’acteurs, la hauteur approximative du sol et les écarts observés. La consigne de bord de sol à 78 % n’est pas systématiquement respectée : les cas s’étendent d’environ 70 % pour Gamma à 86 % pour la quarantaine. Aucun alignement de collisions ou de parallaxe n’a donc été validé.

Deux détails sont retenus dans la revue : de petits tracés évoquant du texte restent sur un panneau du zoo, sans mots lisibles ; le schéma de produit reste sur le tableau Desk Job alors que le prompt demandait son omission. Ils sont signalés comme écarts plutôt que présentés comme parfaitement conformes.

## Validation finale

- 18 signatures PNG valides et 18 paires de dimensions vérifiées.
- 18 SHA-256 et 18 SHA Git vérifiés depuis les fichiers sauvegardés.
- 18 PNG RGB opaques, aucune modification de pixels après le générateur.
- 18 identifiants de cible distincts produits et deux reports distincts : couverture exacte des 20 cibles assignées.
- Aucun refus, aucune erreur d’appel image_gen et aucune sortie perdue dans ce périmètre.
- Aucune modification des registres globaux, du catalogue, du moteur ou de la PR effectuée par ce sous-travail.
