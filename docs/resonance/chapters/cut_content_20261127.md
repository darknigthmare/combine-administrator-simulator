# Contenus coupés — bible de production du lot P

27 novembre 2026 · Half-Life Resonance

## Périmètre et état réel

Ce chapitre ajoute **81 cibles d’archives** à inventorier et produire, avec **80 références** et **694 tâches de production**. Il réexamine aussi les **11 cibles d’archives déjà présentes**, en conservant leurs identifiants. Une cible peut être un personnage, une variante, un équipement, une mécanique ou un lieu : ces nombres ne désignent pas des combattants terminés.

Le [catalogue structuré](../data/cut_content_catalog_20261127.json) est la source des verrous de référence et des tâches. Le [registre graphique](../data/generated_art_register.json) et l’[audit de production](../production/asset_audit.md) restent les sources des fichiers réellement livrés. Ce chapitre ne produit aucune image par lui-même, ne certifie aucune fidélité 1:1 et n’active aucune archive dans le jeu. Les générations du lot P sont suivies séparément avec leur résultat et leur revue.

| Famille | Nouvelles cibles |
|---|---:|
| Half-Life : alpha, concepts et modèles anciens | 14 |
| Half-Life: Decay : missions abandonnées | 3 |
| Half-Life 2 et épisodes : concepts, prototypes et fichiers | 47 |
| Half-Life: Alyx : Combine Recon | 1 |
| Portal, Still Alive, Portal 2 et F-Stop | 16 |
| **Total** | **81** |

| Domaine de production | Cibles |
|---|---:|
| Créatures | 11 |
| Personnages / PNJ | 15 |
| Lieux / pistes de lieux | 20 |
| Boss / concepts de boss | 5 |
| Machines | 4 |
| Armes / équipements | 18 |
| Véhicule | 1 |
| Mécaniques | 5 |
| Props | 2 |

Les cinq dernières pistes du catalogue restent une **liste de recherche ouverte**. Le périmètre public ne permet pas de garantir que tous les essais de développement de Valve et de ses partenaires sont connus.

## Principe de fidélité : une révision précise

Une représentation fidèle doit correspondre à un état précis du développement. Le nom « beta » ne suffit pas : deux fichiers appelés de la même manière peuvent concerner des corps, des textures ou des comportements distincts. Chaque fiche fixe donc sa version, ses preuves et ses inconnues avant la production finale.

Les codes du SDK cités sont verrouillés au commit `3e957b70b167929f120360115d359d1ecb4c1699` du dépôt officiel Valve. Ils permettent de vérifier des symboles et des expériences de comportement. Ils ne constituent pas automatiquement une capture du modèle utilisé dans une démonstration antérieure.

| Nature de la preuve | Ce qu’elle permet d’établir | Limite de production |
|---|---|---|
| Vidéo officielle d’un prototype | Ce qui apparaît dans les plans examinés | Les angles cachés, mouvements non vus et détails trop petits restent ouverts |
| Modèle ou image originale identifié | Silhouette et matière visibles de cette révision | La reconstruction des parties invisibles exige d’autres références |
| Concept d’auteur | Intention visuelle sur une feuille précise | Un concept n’est pas un modèle complet ni un comportement jouable |
| Code publié par Valve | Symboles, variables et logique de cette révision | Modèles, activation et apparence doivent être contrôlés séparément |
| Fichiers inutilisés d’une version publiée | Présence d’une ressource dans cette version | Une ressource présente peut être un placeholder ou ne servir à aucune scène |
| Article communautaire | Identification, pistes et liens vers les documents | Une reconstruction communautaire ne devient pas une preuve de géométrie originale |

La page [Valve des vingt ans de Half-Life 2](https://www.half-life.com/en/halflife2/20th) identifie séparément les démonstrations E3 2002, E3 2003 et SIGGRAPH 2000. Leurs vidéos officielles sont des documents de développement; leur publication ne déclare pas les builds distribués. La [page officielle des vingt-cinq ans de Half-Life](https://www.half-life.com/en/halflife/25th) confirme quant à elle des modèles et contenus restaurés dans une version publiée.

### Collisions de noms et de versions résolues

| Dossiers | Décision |
|---|---|
| Ivan the Space Biker / Proto-Barney / Uplink / Lost Coast | Des versions officielles ont été publiées; seules de vraies différences de révision justifient une nouvelle archive. |
| Panther Eye rouge / Panther Eye bleu alpha | Même famille, deux cibles/révisions; pas de recoloration automatique. |
| Alien Assassin / Combine Assassin | Deux identités distinctes malgré réemploi du nom d’entité. |
| Combine Guard humain / Combine Guard Synth | Équipements et silhouettes séparés. |
| Hopwire HL2 / Hopwire vortex Episode One | Expériences distinctes; fonctions et modèles provisoires non interchangeables. |
| Borealis HL2 coupé / Borealis des épisodes | Ancien navire et fonction ultérieure du récit non mélangés. |
| Mel Valve / Portal Stories: Mel | Design du mod exclu comme preuve du placeholder Valve. |
| Diversity Vent E3 / Tubes de transport retail | Mécanique de puzzle abandonnée distincte de la tuyauterie conservée. |
| Depot / Wasteland / Citadelle | Seules les anciennes révisions spécifiées sont ici des archives. |

Le **Sand Barnacle appartient aux archives de Half-Life 2**, selon sa [fiche documentée](https://combineoverwiki.net/wiki/Sand_Barnacle). Le **Riverbed** est suivi comme [carte de style des épisodes](https://combineoverwiki.net/wiki/Riverbed). Le **Recon d’Alyx** reste un [modèle signalé sans textures](https://combineoverwiki.net/wiki/Combine_Recon); une palette finale ne peut pas être inventée puis certifiée.

## Catalogue détaillé des nouvelles cibles

Chaque ligne renvoie à une référence d’identification. Les captures précises, leur provenance et les parties réellement inspectées se trouvent dans `reference_capture` du JSON. Une source secondaire reste étiquetée comme telle même lorsqu’elle reproduit du matériel d’auteur.

### Half-Life : créatures, personnages et lieux anciens

| Cible | Verrou de production | Référence |
|---|---|---|
| **Panther Eye — révision rouge de Chuck Jones**<br>`archive_panther_eye_hl1` | Révision rouge du rendu auteur Diablopanther1 uniquement. Corps, œil, membres et palette ne sont pas mélangés avec l’alpha bleue, cataloguée séparément. | [Dossier](https://combineoverwiki.net/wiki/Panther_Eye) |
| **Panther Eye — révision alpha bleue**<br>`archive_panther_eye_hl1_alpha_blue` | Verrouiller Blue_Panther_Eye_model.jpg et ne pas importer anatomie/palette de la version rouge. Même famille d’identité, autre révision de modèle. | [Dossier](https://combineoverwiki.net/wiki/Panther_Eye) |
| **Archer — créature aquatique**<br>`archive_archer_hl1` | Utiliser le modèle original d’Archer et son état de nage identifié; aucun Ichthyosaur, monstre de mod ou anatomie ajoutée. | [Dossier](https://combineoverwiki.net/wiki/Archer) |
| **Stukabat — créature volante**<br>`archive_stukabat_hl1` | Séparer modèle d’archive et textures SDK ultérieures; ailes, pattes et tête sont verrouillées sur une référence unique. | [Dossier](https://combineoverwiki.net/wiki/Stukabat) |
| **Human Sergeant / Military Gunner**<br>`archive_human_sergeant_hl1` | Choisir explicitement concept M60/LAW ou dernière variante canon 20 mm/sac. Ne pas cumuler toutes les armes; couteau peint ne devient pas accessoire 3D attesté. | [Dossier](https://combineoverwiki.net/wiki/Human_Sergeant) |
| **Scientifique du X-Lab — personnage coupé**<br>`archive_female_scientist_hl1` | Ne pas remplacer par Gina, Colette ou Judith. Texture publiée, modèle aperçu et placeholder alpha sont trois preuves distinctes; dos manquant à documenter. | [Dossier](https://combineoverwiki.net/wiki/Female_Scientist) |
| **Flocking Floater / Bloater**<br>`archive_flocking_floater_hl1` | Conserver la créature originale; les réinterprétations de Black Mesa: Blue Shift ne constituent pas son apparence Valve. | [Dossier](https://combineoverwiki.net/wiki/Flocking_Floater) |
| **Charger de Xen — modèle SDK**<br>`archive_charger_xen_hl1` | Pas de confusion avec le Combine Charger d’Alyx. Distinguer les variantes de texture d’yeux; tout mouvement nouveau sera adaptation Resonance. | [Dossier](https://combineoverwiki.net/wiki/Charger_%28Xen_creature%29) |
| **The Portal Device — chapitre alpha**<br>`archive_portal_device_hl1_alpha` | Plan d’une carte alpha identifiée, pas Portal Gun Aperture ni Anti-Mass Spectrometer. Les fragments réutilisés ne rendent pas tout le chapitre retail. | [Dossier](https://combineoverwiki.net/wiki/The_Portal_Device) |
| **The Security Complex — chapitre alpha**<br>`archive_security_complex_hl1_alpha` | Fixer carte c1a3 et sous-carte, parcours et étage. Ne pas utiliser le chapitre retail We’ve Got Hostiles comme reconstruction exacte. | [Dossier](https://combineoverwiki.net/wiki/The_Security_Complex) |
| **Alien Research Lab — chapitre alpha**<br>`archive_alien_research_lab_hl1_alpha` | Choisir une carte c2a4 précise et ses volumes réels; ne pas fusionner LAB1/LAB2/LAB3 avec Questionable Ethics. | [Dossier](https://combineoverwiki.net/wiki/Alien_Research_Lab) |
| **Communications Center — chapitre alpha**<br>`archive_communications_center_hl1_alpha` | Verrouiller c3a1 alpha; ne pas mélanger versions Net Tests, retail, Uplink et Decay. Les ascenseurs/portes gardent leurs connexions observées. | [Dossier](https://combineoverwiki.net/wiki/Communications_Center) |
| **Reactor Lab — chapitre alpha**<br>`archive_reactor_lab_hl1_alpha` | Séparer c3a2 et c3a2a; les états prévus dans un texte ne sont pas déclarés exécutables. Ne pas copier Lambda Core retail à sa place. | [Dossier](https://combineoverwiki.net/wiki/Reactor_Lab) |
| **X-Lab — laboratoire acoustique**<br>`archive_xlab_audio_hl1` | Cible limitée au laboratoire son c3a3c et à l’Equivocator; géométrie absente à laisser inconnue, sans recomposer le X-Lab entier. | [Dossier](https://combineoverwiki.net/wiki/X-Lab) |

### Half-Life: Decay : trois missions abandonnées

| Cible | Verrou de production | Référence |
|---|---|---|
| **Decay — Central Transit Hub**<br>`archive_decay_central_transit_hub` | Distinguer captures originales, dialogues reconstitués et carte absente. Relever sat_keypad, sat_point et squish sans inventer tout le transit. | [Dossier](https://combineoverwiki.net/wiki/Cut_missions_from_Half-Life:_Decay) |
| **Decay — Hangar**<br>`archive_decay_hangar` | Verrouiller les captures du hangar coupé. Séparer hangar_idle, interogation1/2 et clutch_stomach des mêmes personnages en campagne finale. | [Dossier](https://combineoverwiki.net/wiki/Cut_missions_from_Half-Life:_Decay) |
| **Decay — Residue**<br>`archive_decay_residue` | Ne pas présenter la séquence comme événement retail. Relever tentacle_smash, cap_gordon et capped_fall; liaisons de cartes non établies restent ouvertes. | [Dossier](https://combineoverwiki.net/wiki/Cut_missions_from_Half-Life:_Decay) |

### Half-Life 2 et épisodes : êtres, machines et boss

| Cible | Verrou de production | Référence |
|---|---|---|
| **Combine Assassin — modèle féminin**<br>`archive_combine_assassin_hl2` | Ne pas mélanger fassassin, Alien Assassin, assassin Black Ops HL1 et variantes de textures plus tardives. Révision d’image à fixer avant production. | [Dossier](https://combineoverwiki.net/wiki/Combine_Assassin) |
| **Combine Guard — Synth**<br>`archive_combine_guard_synth_hl2` | Silhouette du Synth identifiée; aucune fusion avec le garde humain en manteau, Hunter, retail Elite ou toutes les esquisses Synth Elite. | [Dossier](https://combineoverwiki.net/wiki/Combine_Guard_%28Synth%29) |
| **Combine Guard — concept humain**<br>`archive_combine_guard_human_hl2` | Un concept précis de manteau/casque; ne pas compléter les volumes cachés à partir du modèle Synth. Arme non déterminée à laisser non résolue. | [Dossier](https://combineoverwiki.net/wiki/Combine_Guard_%28human%29) |
| **Alien Combine Soldier**<br>`archive_alien_combine_soldier_hl2` | Séparer esquisse vermiforme et version aux lentilles jaunes; le fouet ne s’ajoute qu’à la variante qui le montre. | [Dossier](https://combineoverwiki.net/wiki/Alien_Combine_Soldier) |
| **Combine Synth Elite Soldier**<br>`archive_synth_elite_soldier_hl2` | Une feuille d’auteur par variante; bras, jambes, arme et insignes ne sont pas mutualisés entre les esquisses. | [Dossier](https://combineoverwiki.net/wiki/Combine_Synth_Elite_Soldier) |
| **Combine Super Soldier**<br>`archive_super_soldier_hl2` | Choisir version blanche ou autre illustration documentée. Ne pas déduire une attaque finale de sa seule parenté visuelle avec le Strider. | [Dossier](https://combineoverwiki.net/wiki/Combine_Super_Soldier) |
| **Elite Metro Cop / supercop**<br>`archive_elite_metrocop_hl2` | Verrouiller casque, yeux, plastron et couleurs de la référence. Rôle et arme restent inconnus; pas d’AR2 ajouté automatiquement. | [Dossier](https://combineoverwiki.net/wiki/Elite_Metro_Cop) |
| **Conscript — unité générique**<br>`archive_conscript_hl2` | Un modèle générique documenté; Captain Vance possède une fiche distincte. Les têtes citoyennes hypothétiques ne sont pas des variantes confirmées. | [Dossier](https://combineoverwiki.net/wiki/Conscripts) |
| **Le Consul**<br>`archive_consul_hl2` | Référence d’affiche, portrait ou modèle précisée; ne pas habiller le modèle Breen retail et déclarer le Consul restitué. | [Dossier](https://combineoverwiki.net/wiki/The_Consul) |
| **Eli — ancien personnage / Junkman**<br>`archive_eli_junkman_hl2` | Référence du mécanicien retenue avec sa canne/outillage observés. Ne pas fusionner automatiquement son histoire avec Captain Vance. | [Dossier](https://combineoverwiki.net/wiki/Eli_%28early_character%29) |
| **Captain Vance**<br>`archive_captain_vance_hl2` | Modèle et uniforme de Vance, pas Eli Vance retail ni simple renommage d’un citoyen actuel; parenté limitée au scénario de cette révision. | [Dossier](https://combineoverwiki.net/wiki/Vance) |
| **Elena Mossman**<br>`archive_elena_mossman_hl2` | Textures/concept blond au costume violet distincts du modèle Judith retail. Ne pas prétendre reconstruire un modèle absent à partir du visage final. | [Dossier](https://combineoverwiki.net/wiki/Elena_Mossman) |
| **Samuel**<br>`archive_samuel_hl2` | Distinguer variante ancienne avec masque et apparence plus tardive; la restauration communautaire à masque n’est pas un modèle Valve complet attesté. Ne pas substituer Laszlo retail. | [Dossier](https://combineoverwiki.net/wiki/Samuel) |
| **Antlion King**<br>`archive_antlion_king_hl2` | Ne pas transformer l’Antlion Guardian retail en King. Silhouettes attribuées à des fuites non vérifiées ne valent pas modèle complet. | [Dossier](https://combineoverwiki.net/wiki/Antlion_King) |
| **Bullsquid — incarnation HL2 abandonnée**<br>`archive_bullsquid_hl2_cut` | Référence du modèle HL2 identifiée; jamais sprite HL1 recoloré. Un nom de modèle dans le SDK ne fixe pas sa texture de 2002/2003. | [Dossier](https://combineoverwiki.net/wiki/Bullsquid) |
| **Houndeye — incarnation HL2 abandonnée**<br>`archive_houndeye_hl2_cut` | Utiliser l’aperçu original du modèle HL2; pas Houndeye de Missing Information ni le modèle HL1. Séparer états de groupe des poses individuelles. | [Dossier](https://combineoverwiki.net/wiki/Houndeye) |
| **Wasteland Scanner**<br>`archive_wasteland_scanner_hl2` | Un scanner isolé par sprite; formation composée ensuite. Texture manquante d’un modèle de groupe ne s’invente pas à partir d’un autre. | [Dossier](https://combineoverwiki.net/wiki/Wasteland_Scanner) |
| **Combot — scanner ancien**<br>`archive_combot_hl2` | Verrouiller modèle/texture et longueur de queue anciens; ne pas prendre le City Scanner retail comme référence complète. | [Dossier](https://combineoverwiki.net/wiki/Combot) |
| **Sacktick**<br>`archive_sacktick_hl2` | Un concept précis, sac replié ou déployé explicitement choisi. Capsules de livraison et organisme restent fichiers distincts. | [Dossier](https://combineoverwiki.net/wiki/Sacktick) |
| **Zombie Assassin**<br>`archive_zombie_assassin_hl2` | Conserver statut inachevé: ne pas substituer le Fast Zombie ni certifier les réparations de textures d’une capture communautaire. | [Dossier](https://combineoverwiki.net/wiki/Zombie_Assassin) |
| **Sand Barnacle**<br>`archive_sand_barnacle_hl2` | Modèle original avec texture provisoire séparé des restaurations avec textures inutilisées appliquées. Ni IA ni animation originales affirmées. | [Dossier](https://combineoverwiki.net/wiki/Sand_Barnacle) |

### Half-Life 2 et épisodes : armes et véhicule

| Cible | Verrou de production | Référence |
|---|---|---|
| **AR1**<br>`archive_ar1_hl2` | Aucun modèle retail AR2 substitué; nom de code ne suffit pas à choisir le fusil/skin. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_ar1.cpp) |
| **SMG2**<br>`archive_smg2_hl2` | Séparer arme déclarée, ancien modèle et sons provisoires; ne pas déduire le rendu d’un nom commercial. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_smg2.cpp) |
| **Fusil de précision jouable**<br>`archive_sniper_rifle_hl2` | Ne pas confondre arme de joueur et NPC sniper retail; lunette, portée et verrou d’animation à observer. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_sniperrifle.cpp) |
| **Combine Guard Gun**<br>`archive_cguard_gun_hl2` | Modèle exact de l’arme distinct du Synth porteur; ne pas copier le canon du Strider parce qu’un effet est apparenté. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_cguard.cpp) |
| **Extincteur**<br>`archive_extinguisher_hl2` | Corps d’objet, buse, départ/flux/arrêt séparés; pas d’arme incendiaire transformée en extinction par recoloration. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_extinguisher.cpp) |
| **Flare Gun**<br>`archive_flaregun_hl2` | Séparer arme, fusée et halo; aucune fusée rouge générique déclarée originale sans inspection du matériau source. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_flaregun.cpp) |
| **Immolator — prototype du SDK**<br>`archive_immolator_hl2` | Le prototype publié ne fixe pas automatiquement le design/fluide de l’arme du Cremator 2002. Ne pas fusionner lanceur joueur et équipement du PNJ. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_immolator.cpp) |
| **IRifle**<br>`archive_irifle_hl2` | Le nom interne n’atteste pas un skin ou une géométrie finale; capter modèle et effets dans la même révision. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_irifle.cpp) |
| **Manhack — arme/dispositif du joueur**<br>`archive_manhack_weapon_hl2` | Distinguer dispositif manipulé, Manhack autonome et console Manhack Arcade; pas de nouveau drone inventé. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_manhack.cpp) |
| **Molotov — prototype**<br>`archive_molotov_hl2` | Étiquette/modèle TEMP conservés comme provisoires; ne pas promouvoir cette apparence en modèle définitif. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_molotov.cpp) |
| **Brickbat — objets lancés**<br>`archive_brickbat_hl2` | Objet de référence à choisir explicitement; la présence du fichier ne prouve pas une arme activable ou livrée. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_brickbat.cpp) |
| **Thumper — dispositif expérimental**<br>`archive_thumper_weapon_hl2` | Ne pas confondre cette arme/proto avec le grand Thumper environnemental retail. Verrouiller une branche de code et son modèle. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_thumper.cpp) |
| **Tripwire — dispositif expérimental**<br>`archive_tripwire_hl2` | Corps/fil/ancrage/armement séparés; ne pas copier automatiquement la Tripmine GoldSrc. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_tripwire.cpp) |
| **Hopwire Grenade — prototype HL2**<br>`archive_hopwire_hl2` | Version HL2 à verrouiller sur source originale; aucune singularité/vortex importé depuis Episode One. | [Dossier](https://combineoverwiki.net/wiki/Hopwire_Grenade) |
| **Hopwire vortex — expérience Episode One**<br>`archive_vortex_hopwire_ep1` | Modèles provisoires de grenade/Rollermine explicités; ne pas renommer le prototype HL2. Aucun canon antistrider nouveau inventé. | [Dossier](https://combineoverwiki.net/wiki/Vortex_Hopwire) |
| **Jetski — véhicule prototype**<br>`archive_jetski_hl2` | Séparer ce véhicule de l’Airboat retail; coque, commande, position pilote et effets aquatiques à capter sur une version précise. | [Source Valve](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/vehicle_jetski.cpp) |

### Half-Life 2 et épisodes : lieux et anciennes révisions

| Cible | Verrou de production | Référence |
|---|---|---|
| **Depot — ancienne révision**<br>`archive_depot_early_hl2` | Ne pas classer le Depot retail comme entièrement coupé. Choisir une feuille ou carte ancienne et marquer les éléments réellement observés. | [Dossier](https://combineoverwiki.net/wiki/Depot) |
| **Kraken Base**<br>`archive_kraken_base_hl2` | Choisir deep_01_011, proto_deep002 ou proto_deep002b; jamais réunir leurs plans en une carte supposée officielle. | [Dossier](https://combineoverwiki.net/wiki/Kraken_Base) |
| **Weather Control**<br>`archive_weather_control_hl2` | Le texte ne fixe pas un plan jouable complet. Une vue candidate reconstituée reste interprétation tant que géométrie et ouvertures ne sont pas attestées. | [Dossier](https://combineoverwiki.net/wiki/Weather_Control) |
| **Manhack Arcade**<br>`archive_manhack_arcade_hl2` | Choisir la carte/illustration de référence; ne pas fusionner c17_04, c17_05 et arcade_*. Bornes et connexions de manhacks sont documentées séparément. | [Dossier](https://combineoverwiki.net/wiki/Manhack_Arcade) |
| **Combine Factories**<br>`archive_combine_factories_hl2` | Une usine et une révision par décor; aucune scène de récit ou main-d’œuvre ajoutée à partir d’un simple nom de fichier. | [Dossier](https://combineoverwiki.net/wiki/Combine_Factories) |
| **Skyscraper / Vertigo**<br>`archive_skyscraper_hl2` | Vertigo est un alias de ce dossier, pas une cible en double. Étage, façade, crash et parcours doivent provenir de la même révision. | [Dossier](https://combineoverwiki.net/wiki/Skyscraper) |
| **Vance Headquarters**<br>`archive_vance_hq_hl2` | Référence VanceHQ limitée au périmètre attesté; pas d’annexion automatique de toute la Citadelle ou de la Cité 17 retail. | [Dossier](https://combineoverwiki.net/wiki/Vance_Headquarters) |
| **Wasteland — concepts antérieurs**<br>`archive_wasteland_early_hl2` | Choisir un concept abandonné distinct de Highway 17 retail. Pas de planète ou biome entièrement inventé au nom du Wasteland. | [Dossier](https://combineoverwiki.net/wiki/The_Wasteland) |
| **Citadelle — ancienne révision**<br>`archive_citadel_early_hl2` | Une révision datée par vue: 2001, E3 2002 et modèle retail séparés. Aucun œil/arme géante fusionné avec une tour qui ne le porte pas. | [Dossier](https://combineoverwiki.net/wiki/Citadel_design_evolution) |
| **Riverbed — cartes de style**<br>`archive_riverbed_episodes` | Verrouiller styleguide_riverbed ou styleguide_riverbed2; ne pas présenter comme chapitre retail Episode Two complet. | [Dossier](https://combineoverwiki.net/wiki/Riverbed) |

### Half-Life: Alyx

| Cible | Verrou de production | Référence |
|---|---|---|
| **Combine Recon — modèle inutilisé**<br>`archive_combine_recon_hla` | Ne pas inventer palette finale ni copier la tenue Grunt. Étude monochrome possible après inspection; version texturée bloquée. | [Dossier](https://combineoverwiki.net/wiki/Combine_Recon) |

### Portal, Still Alive et F-Stop

| Cible | Verrou de production | Référence |
|---|---|---|
| **Walking Turret**<br>`archive_walking_turret_portal` | Séparer posture ouverte et boule/fling; ne pas la remplacer par une Sentry Turret retail dotée de roues inventées. | [Dossier](https://theportalwiki.com/wiki/Walking_Turret) |
| **Portal Gun — ancienne forme pistolet**<br>`archive_portalgun_pistol` | Utiliser la seule révision pistolet documentée; ne pas fusionner les griffes et le corps du modèle gravité ultérieur. | [Dossier](https://theportalwiki.com/wiki/Unused_content) |
| **Portal Gun — ancienne forme gravité**<br>`archive_portalgun_gravity` | Fiche distincte du pistolet et de l’ASHPD retail; l’analogie visuelle ne donne pas les mêmes fonctions que le Gravity Gun. | [Dossier](https://theportalwiki.com/wiki/Unused_content) |
| **Betty / GLAaDOS**<br>`archive_betty_portal2` | Le prototype assemblé avec une lampe et un core reste un prototype; aucune coque finale inventée ni confusion avec GLaDOS. | [Dossier](https://theportalwiki.com/wiki/Betty) |
| **Mel — placeholder Valve**<br>`archive_mel_portal2` | Tenue/couleur du placeholder Valve; ne pas utiliser le design distinct du mod Portal Stories: Mel. Anciennes incarnations solo/coop non fusionnées. | [Dossier](https://theportalwiki.com/wiki/Mel) |
| **Adhesion Gel**<br>`archive_adhesion_gel_portal2` | Ne pas certifier violet comme couleur finale. Séparer tache, goutte, contact et orientation de gravité; restaurations communautaires ne font pas foi. | [Dossier](https://theportalwiki.com/wiki/Adhesion_Gel) |
| **Reflection Gel**<br>`archive_reflection_gel_portal2` | Révision Authoring Tools/Peer Review à préciser; ne pas donner automatiquement pouvoir de portail à une surface réfléchissante. | [Dossier](https://theportalwiki.com/wiki/Reflection_Gel) |
| **Pneumatic Diversity Vent — puzzle E3**<br>`archive_diversity_vent_portal2` | Cible = aspiration du puzzle de démonstration, pas toute la tuyauterie retail. Entrée/sortie/aspiration et caméra du plan à verrouiller. | [Source Valve](https://www.thinkwithportals.com/media_08.php) |
| **Hover Turret — prototype suspendu**<br>`archive_hover_turret_portal2` | Son nom ne permet pas de dessiner un drone libre: documenter câble/support et core exact. Ne pas valider un modèle ERROR ou une restauration de fan. | [Dossier](https://theportalwiki.com/wiki/Hover_Turret) |
| **Aperture Camera / F-Stop**<br>`archive_fstop_camera` | Une version documentée par source publique autorisée; ne pas importer un build divulgué ni inventer appareil ou interface finale. | [Dossier](https://theportalwiki.com/wiki/Unused_content) |
| **F-Stop — mannequin de test**<br>`archive_fstop_mannequin` | Une forme de mannequin observée; pas de fusion automatique avec Bendy PeTI ou le mannequin décoratif retail. Comportements racontés restent non observés. | [Dossier](https://theportalwiki.com/wiki/Unused_content) |
| **Futbol — dispositif et essai compétitif**<br>`archive_futbol_portal2` | Corps du dispositif, distributeur et essais de règles séparés; aucune arène originale complète déduite de la seule boule. | [Dossier](https://theportalwiki.com/wiki/Unused_content) |
| **Paint Gun — prototype Valve**<br>`archive_paintgun_portal2` | Exclure le modèle d’Aperture Tag et Tag: The Power of Paint comme preuves de l’arme Valve. Couleurs/types de peinture verrouillés par essai. | [Dossier](https://theportalwiki.com/wiki/Unused_content) |
| **Poulet géant — concept de développement**<br>`archive_giant_chicken_fstop` | Attribution et feuille originale à vérifier avant sprite. Aucun combat final, nom de boss ou histoire définitive inventé. | [Dossier](https://theportalwiki.com/wiki/Unused_content) |
| **Skull Cube — skin inutilisé**<br>`archive_skull_cube_still_alive` | Texture inutilisée du cube distincte du bouton à tête de mort publié; ne pas en faire un compagnon doté de pouvoirs sans source. | [Dossier](https://theportalwiki.com/wiki/Unused_content) |
| **Still Alive — piste de chambre 15**<br>`archive_chamber15_still_alive` | L’icône n’est pas un plan de niveau: génération d’une arène complète bloquée. La carte du mod Flash Version n’est pas une preuve du niveau final. | [Dossier](https://theportalwiki.com/wiki/Unused_content) |

## Archives existantes conservées

Les onze identifiants ci-dessous existent déjà dans les catalogues antérieurs. Le lot P ajoute du suivi à leur production sans les compter à nouveau parmi les 81 cibles.

| Identifiant existant | Suite de production |
|---|---|
| `archive_kingpin_hl1` | Compléter angles/animations/effets depuis la même variante, sans transposer un boss de mod. |
| `archive_mr_friendly_hl1` | L’étude existante ne termine pas anatomie/animation; les descriptions conceptuelles restent distinctes des images observées. |
| `archive_cremator_hl2_2002` | Conserver révision 2002; équipement et jet à comparer avant de les rapprocher du prototype weapon_immolator. |
| `archive_alien_assassin_hl2_2002` | Distinct de la Combine Assassin féminine; npc_assassin réutilisé ne démontre pas identité de modèle. |
| `archive_odell_hl2` | Distinct d’Odessa Cubbage; gestes et portrait sur même modèle d’archive. |
| `archive_air_exchange_hl2` | Master existant = étude de concept; plans, accès et parcours non validés. |
| `archive_borealis_hl2_cut` | Chapitre ancien distinct des références des épisodes; navire et intérieur de même révision. |
| `archive_blob_ep3` | Prototype officiel et code npc_blob sont des révisions indépendantes; état morphologique exact à documenter. |
| `archive_icegun_ep3` | Effet existant ne termine pas l’arme; appareil, glace, gel et déplacement à séparer. |
| `archive_arctic_ep3` | Chaque concept garde sa composition; aucune carte complète ni environnement final HL3 déduit. |
| `hydra_hl2_cut` | Verrou E3 2003; formes cachées, attaque et retrait nécessitent plans successifs. |

Le [dossier de référence antérieur](archive_reference_contracts_20261120.md) reste la source des repères déjà inspectés pour ces archives. Ses distinctions entre Hydra, Blob, Ice Gun, Air Exchange et le Borealis sont conservées.

## Tâches concrètes à produire

Les **694 tâches** sont des contrats de travail, pas des fichiers présents. Leur comptage se fait sur les identifiants uniques `target_id.template_id`. Le JSON fournit chaque instance, son statut et sa dépendance au verrou de référence. L’étape graphique réussie sera renseignée à partir d’un vrai fichier; la certification ne suivra qu’après comparaison.

| Tâche | Livrables et critère |
|---|---|
| **Verrou de référence** · `reference_lock` | Source originale/reproduction identifiée; Révision, image/plan précis, provenance et empreinte; Angles nécessaires ou inconnues déclarées. Aucune supposition ne remplit un angle ou une séquence manquants. |
| **Revue d’identité** · `identity_review` | Comparaison silhouette, proportions, textures, équipements; Variantes proches à exclure. La référence appartient au même état de développement que la cible. |
| **Image de base** · `single_sprite` | Un sujet, une pose, PNG alpha si sujet isolé; Dimensions, pivot, échelle et marges. Pas de planche multi-sujets; fichier livré et qualité visuelle suivis séparément. |
| **Cycle de mouvement** · `movement` | Entrée, déplacement, arrêt, retour; Images séparées, ordre et durée. Une image clé ne termine pas une animation. |
| **Actions et réactions** · `combat_actions` | Attaques attestées: anticipation/action/récupération; Recul et neutralisation; Adaptation Resonance explicite pour les mouvements nouveaux. Frame data originale uniquement si mesurée dans la version source. |
| **Projectiles et effets** · `effects` | Charge/départ, corps/flux si pertinent, impact, extinction; Effets séparés des acteurs. Pas de projectile de voyage pour un tir instantané; matière/couleur de même source. |
| **Présentation et menu** · `presentation` | Portrait; Sélection, désélection, taunt selon rôle; Silhouette de verrouillage. Gestes de combat = adaptation sauf animation source identifiée. |
| **Intro, rival, conclusion** · `narrative` | Contexte de révision; Dialogue/chronologie du scénario abandonné; Accès par archives. Rencontres entre versions incompatibles jamais présentées comme officielles. |
| **Son** · `sound` | Événements sonores; Provenance du son source ou mention de création. Son généré jamais enregistré comme original Valve. |
| **Rencontre de boss** · `boss_phases` | États et vulnérabilités attestés; Phases/caméra/réponses du joueur comme adaptation si nécessaire. Un concept de boss ne prouve pas une rencontre originale jouable. |
| **États objet/machine** · `device_states` | Inactif, activation, actif, arrêt, dégradé si attestés; Pièces mobiles et fixations. États absents de la source à concevoir explicitement. |
| **Vue maîtresse** · `master_stage` | Plan/capture précis; Vue latérale à l’échelle des acteurs; Sol et limites. Icône ou récit seuls ne justifient pas une arène complète. |
| **Plans décor** · `parallax_layers` | Fond lointain; Structure distante; Architecture intermédiaire; Sol jouable; Premier plan; Atmosphère si pertinente. Adapter les couches à la géométrie; cette liste ne signifie pas images produites. |
| **Topologie et accès** · `topology` | Portes, escaliers, ascenseurs, sorties; Niveau/sens de passage; Zones inconnues. Pas de porte sans support ou connexion. |
| **Props et interactions** · `stage_props` | Objets caractéristiques; Mécanismes et dangers; Occlusions/raccords. Seulement équipements visibles ou attestés dans cette révision. |
| **Règle de mécanique** · `mechanic_contract` | Condition de départ et de sortie; Effet observé vs adaptation; Cas limites/transitions. Présence de fichier ou entrée d’éditeur ≠ mécanique finalisée. |
| **Contrôle de livraison** · `export_qa` | Registre, SHA-256, comparaison; Alpha sur plusieurs fonds; Runtime et fidélité suivis séparément. Candidat possible sans certification ni intégration. |

### Personnages, créatures et boss

La production commence par une vue de combat unique, entièrement cadrée, dont la silhouette reste lisible à l’échelle prévue. Pour un personnage jouable envisagé, les portraits, états de sélection/désélection et taunts suivent le guide commun. Les PNJ et créatures ne reçoivent pas automatiquement une garde de combattant humanoïde.

Les attaques documentées doivent être séparées en anticipation, action et récupération. Les déplacements demandent des images cohérentes entre les poses et des pivots stables. Les réactions, neutralisations et sorties de caméra sont contrôlées indépendamment. Une pose statique candidate ne clôt aucune de ces séquences.

Le [prototype d’assassin conservé dans le SDK](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_assassin.cpp) sert de piste pour ses actions; sa géométrie féminine doit toujours provenir de la bonne référence. Le [code Houndeye](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_houndeye.cpp) permet d’étudier une logique de groupe, sans faire passer un effet HL1 existant pour un effet HL2 validé.

Les propositions de Boss Battle des nouvelles archives demandent un contrat de phases distinct. Taille, caméra, points vulnérables et réactions du joueur sont conçus pour Resonance lorsque la source n’établit aucun combat complet. Les concepts d’Antlion King, Synth Elite et Super Soldier gardent ce statut de concept.

### Armes, projectiles et effets

Chaque équipement reçoit une vue propre avant les états tenus, activés ou tirés. L’arme, le projectile et l’impact restent des fichiers séparés. Les flux continus, tirs instantanés et dispositifs posés n’utilisent pas le même contrat.

Les expériences **Brickbat**, **Molotov** et **Thumper** sont particulièrement sensibles aux placeholders et aux branches de code. La fiche précise ce qui est vérifié et ce qui n’est pas activé ou finalisé. L’Immolator du SDK n’est pas assimilé d’office à l’équipement exact du Cremator de 2002.

Les deux Hopwire ont des fiches séparées. Les références secondaires décrivent une [version HL2 à fils](https://combineoverwiki.net/wiki/Hopwire_Grenade) et une [expérience vortex d’Episode One](https://combineoverwiki.net/wiki/Vortex_Hopwire); le second nom est communautaire. Leur modèle de vue tenue peut aussi être provisoire. Une adaptation de jeu doit conserver ces limites dans ses métadonnées.

### Stages, parallaxe et raccords

Les vingt cibles de lieux ne représentent pas vingt arènes prêtes. Une carte de style, une icône ou un concept ne donnent pas nécessairement le plan complet. Le travail demandé comprend une vue maîtresse, le sol jouable, les plans visuels pertinents, les props et une carte des accès.

Les six emplacements de plans proposés — fond, structure distante, architecture, sol, premier plan, atmosphère — sont un cadre de production. Ils s’adaptent au lieu observé. Les ouvrir dans le catalogue ne les compte pas comme couches terminées.

Les portes doivent avoir un mur ou un support cohérent, une hauteur et une destination connues. Les escaliers et ascenseurs doivent relier des niveaux compatibles. Les éléments cachés par le cadrage sont des inconnues à résoudre. Les cartes `deep_01_011`, `proto_deep002` et `proto_deep002b` de Kraken restent des révisions différentes.

Dans Decay, les trois dossiers portent respectivement sur **Central Transit Hub**, **Hangar** et **Residue**. Ils conservent les restes d’animations identifiés comme pistes de production; les dialogues remontés et les reconstructions ne deviennent pas des captures du jeu original. Le sauvetage de Gordon de la mission abandonnée reste attaché à ce scénario abandonné.

### Portal et mécaniques de laboratoire

Le dossier **Pneumatic Diversity Vent** s’appuie sur la [page média officielle Valve](https://www.thinkwithportals.com/media_08.php). Il vise le puzzle montré dans la démonstration, tandis que le système de tubes de transport reste une autre utilisation. Activation, aspiration, sortie et objets traversant le conduit doivent être observés dans une séquence cohérente.

L’Adhesion Gel garde sa couleur provisoire, et le Reflection Gel reste distinct du gel de conversion. La Hover Turret demande une référence du support/câble; son nom seul ne justifie pas un drone libre.

**F-Stop**, les mannequins, le Paint Gun et le concept de poulet géant sont suivis à leur niveau de preuve actuel. La chambre 15 de Still Alive n’est qu’une piste d’interface: aucune arène complète n’est générée à partir de cette seule icône. Le modèle du mod Portal Stories: Mel reste exclu du verrou visuel de Mel Valve.

## Récit et intégration dans Resonance

Les archives peuvent recevoir une carte de contexte indiquant projet, période, révision et nature de preuve. Un épisode d’archives peut réunir plusieurs sujets dont les sources sont compatibles. Cette proposition d’interface et de récit est une conception de Resonance.

L’introduction précise l’état de développement. Une scène de rivalité ou une conclusion qui n’existe dans aucune source porte une mention d’adaptation dans ses données. Les filiations de design, comme Eli/Junkman et Captain Vance, ne donnent pas une généalogie commune au récit publié.

Les nouveaux dossiers peuvent réutiliser les exigences de portraits, sélection/désélection, taunts et déblocages décrites dans les deux extensions du guide. Leur présence dans ce chapitre ne déclare aucun slot fonctionnel, tag, super ou finisher implémenté. Le registre de production, la logique d’accès et les tests d’intégration restent des étapes distinctes.

## Conditions de validation

Une nouvelle sortie est enregistrée avec sa cible, sa révision, sa référence et son état de revue. Le contrôle vérifie sujet unique, cadrage, proportions, couleurs, détails d’équipement, alpha, échelle et pivot. Une version rejetée reste traçable et ne remplace pas silencieusement une référence ou un candidat antérieur.

La certification visuelle, l’animation complète, la rencontre fonctionnelle et la présence au runtime sont quatre décisions différentes. Tant qu’une condition manque, le fichier peut être livré comme candidat et le manque reste visible. Les archives sont déclarées `runtime_enabled: false` et `certified_one_to_one: false` dans ce catalogue.

## Pistes de recherche restant ouvertes

- **Autres créatures Quiver/HL1 (Fast Walker, Snapbug, Sphere, Jelly Bobber)** — Pistes à recouper sur images d’auteur; aucune anatomie finale affirmée. [Piste documentaire](https://combineoverwiki.net/wiki/Category:Cut_enemies).
- **Particle Storm** — Descriptions/sons insuffisants pour une silhouette complète; pas de boss/VFX final inventé. [Piste documentaire](https://combineoverwiki.net/wiki/Particle_Storm).
- **Anciennes variantes Alyx/Barney/citoyens, Stalker, Dog/Skitch et autres Synths** — Fiche par révision dès qu’une référence précise distingue réellement la cible. [Piste documentaire](https://combineoverwiki.net/wiki/Development_of_Half-Life_2).
- **Portal: Paint Fizzler, Self-Esteem Field, Android/Zombie audio-only, essais de compétition** — Qualifier fichiers/usage invisible/noms seuls avant de concevoir des visuels. [Piste documentaire](https://theportalwiki.com/wiki/Unused_content).
- **Hostile Takeover et épisodes de partenaires annulés** — Dossiers autonomes après contrôle de sources d’auteur, sans intégrer d’emblée les restitutions de fans. [Piste documentaire](https://combineoverwiki.net/wiki/Houndeye).

## Sources et traçabilité

Les **80 notices de sources** du JSON donnent URL, nature et périmètre examiné. Les références de code sont figées par commit. Les articles secondaires restent identifiables et ne sont jamais remplacés dans le catalogue par une fausse mention de capture directe.

Aucun livre non consulté, modèle non ouvert, animation non observée ou fichier non présent n’est déclaré vérifié. Les anciens guides et leurs fichiers originaux ne sont modifiés par ce chapitre.
