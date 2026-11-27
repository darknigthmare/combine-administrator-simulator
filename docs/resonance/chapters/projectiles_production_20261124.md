> **Contrat historique du lot F.** Les identifiants `PRJ_*` ci-dessous sont préservés pour la provenance. Le [catalogue actif](../data/projectile_catalog_20261124.json) fusionne F et H; la [table de correspondance](../production/recovery_20261124/projectile_catalog_merge.json) conserve chaque contrat sans double comptage.

# Projectiles et effets de tir — Half Life Resonance

Catalogue du **24 novembre 2026**. Il ajoute **45 groupes de production** aux 187 cibles historiques. Une cible est une identité visuelle ou une famille d’effets avec ses variantes; ce nombre ne compte ni armes nouvelles, ni images produites, ni animations achevées.

Les sources et contrats complets figurent dans [projectile_catalog_20261124.json](../data/projectile_catalog_20261124.json). Le suivi des fichiers réels reste calculé par [la file de production](../data/production_queue.json) et [la liste des manquants](../production/MISSING_TARGETS.md).

## Références et degré de vérification

Les sources Valve GoldSrc et Source SDK ont été lues à des révisions immuables. Elles confirment les classes, les chemins de ressources et plusieurs chemins de tir. Elles ne contiennent pas toutes les textures retail et ne certifient pas l’apparence finale d’un sprite. Deux captures officielles Portal 2 ont été examinées pour le gel répulsif et les faisceaux thermiques. Les autres pages de produit apportent seulement le contexte qu’elles documentent.

| Niveau de preuve | Cibles |
|---|---:|
| official_media_named_visual_capture_required | 1 |
| official_screenshot_observed | 2 |
| primary_context_only_specific_capture_required | 12 |
| sdk_entities_verified_visual_capture_pending | 30 |

Les cibles Opposing Force, Alyx et plusieurs effets Portal/Desk Job gardent une demande de capture précise. Le manuel original Opposing Force est indexé mais sa récupération a échoué; il n’est pas utilisé pour certifier le détail des spores. La description des médias Portal 2 identifie la démonstration E3 du gel propulsif, pas toutes les propriétés d’un modèle retail.

## Nature des éléments à produire

| Classe | Cibles | Contrat |
|---|---:|---|
| Rayon continu | 2 | Émission, segment et contact continus; la collision n’est pas déterminée par la longueur d’une image seule. |
| Volume de gel | 3 | Volume environnemental en mouvement et dépôt sur une surface; ne pas transformer le gel en munition explosive. |
| Effet de tir hitscan | 2 | Flash, éventuelle trace et contact illustrent un tir instantané établi par la source; aucun objet de gameplay mobile n’est créé par le catalogue. |
| Décharge ou rayon impulsionnel | 3 | Effet reliant origine et point visé pendant l’attaque; le délai éventuel reste propre au jeu et ne crée pas un projectile lent. |
| Projectile mobile | 23 | Objet ou volume suivi pendant son déplacement; sa trajectoire et ses collisions restent propres au jeu source. |
| Dispositif posé | 1 | Objet placé et indicateur ou faisceau associé; aucun état de vol de balle. |
| Effet de portails | 2 | Émission, arrivée et ouverture d’un portail; n’est pas classé comme munition infligeant des dégâts. |
| Objet lancé ou largué | 8 | Dispositif physique avec états de vol, contact et éventuelle activation; ne pas le compter comme une balle. |
| Effet de tir à caractériser | 1 | Réserver départ et contact en attendant de vérifier la simulation du jeu; aucune affirmation hitscan/ballistique. |

Le nom historique `grenade_ar2` mérite une attention particulière: le fichier `weapon_smg1.cpp` crée cette grenade pour le tir secondaire du SMG1. Le véritable tir secondaire de l’AR2 crée une boule Combine; son tir principal utilise `FireBullets`. Les trois productions sont donc distinctes. [Sources: weapon_smg1.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_smg1.cpp), [grenade_ar2.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/grenade_ar2.cpp), [weapon_ar2.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_ar2.cpp).

## Liste complète du périmètre

| ID | Élément | Jeu | Nature | Référence |
|---|---|---|---|---|
| `PRJ_HL1_CROSSBOW_BOLT` | Carreau d’arbalète — HL1 | Half-Life (1998, GoldSrc) | Projectile mobile | [PJ_HL1_CROSSBOW](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/crossbow.cpp) |
| `PRJ_HL1_RPG_ROCKET` | Roquette RPG — HL1 | Half-Life (1998, GoldSrc) | Projectile mobile | [PJ_HL1_RPG](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/rpg.cpp) |
| `PRJ_HL1_MP5_GRENADE` | Grenade du MP5 — HL1 | Half-Life (1998, GoldSrc) | Projectile mobile | [PJ_HL1_MP5](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/mp5.cpp) |
| `PRJ_HL1_FRAG_GRENADE` | Grenade à main — HL1 | Half-Life (1998, GoldSrc) | Objet lancé ou largué | [PJ_HL1_HANDGRENADE](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/handgrenade.cpp) |
| `PRJ_HL1_SATCHEL_CHARGE` | Charge télécommandée — HL1 | Half-Life (1998, GoldSrc) | Objet lancé ou largué | [PJ_HL1_SATCHEL](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/satchel.cpp) |
| `PRJ_HL1_TRIPMINE` | Mine laser et faisceau — HL1 | Half-Life (1998, GoldSrc) | Dispositif posé | [PJ_HL1_TRIPMINE](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/tripmine.cpp) |
| `PRJ_HL1_HORNET` | Frelon de Hivehand — HL1 | Half-Life (1998, GoldSrc) | Projectile mobile | [PJ_HL1_HORNET](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/hornet.cpp) / [PJ_HL1_HORNETGUN](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/hornetgun.cpp) |
| `PRJ_HL1_GAUSS_BEAM` | Rayon du canon Tau/Gauss — HL1 | Half-Life (1998, GoldSrc) | Décharge ou rayon impulsionnel | [PJ_HL1_GAUSS](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/gauss.cpp) |
| `PRJ_HL1_GLUON_BEAM` | Rayon du canon à gluons — HL1 | Half-Life (1998, GoldSrc) | Rayon continu | [PJ_HL1_EGON](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/egon.cpp) |
| `PRJ_HL1_VORTIGAUNT_ZAP` | Décharge du Vortigaunt — HL1 | Half-Life (1998, GoldSrc) | Décharge ou rayon impulsionnel | [PJ_HL1_ISLAVE](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/islave.cpp) |
| `PRJ_HL1_BULLSQUID_SPIT` | Crachat de Bullsquid — HL1 | Half-Life (1998, GoldSrc) | Projectile mobile | [PJ_HL1_BULLSQUID](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/bullsquid.cpp) |
| `PRJ_HL1_CONTROLLER_ENERGY_BALL` | Petite boule d’énergie du Controller — HL1 | Half-Life (1998, GoldSrc) | Projectile mobile | [PJ_HL1_CONTROLLER](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/controller.cpp) |
| `PRJ_HL1_CONTROLLER_HEAD_BALL` | Boule émise par la tête du Controller — HL1 | Half-Life (1998, GoldSrc) | Projectile mobile | [PJ_HL1_CONTROLLER](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/controller.cpp) |
| `PRJ_HL1_NIHILANTH_ZAP` | Orbe offensif du Nihilanth — HL1 | Half-Life (1998, GoldSrc) | Projectile mobile | [PJ_HL1_NIHILANTH](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/nihilanth.cpp) |
| `PRJ_HL1_NIHILANTH_TELEPORT` | Orbe de téléportation du Nihilanth — HL1 | Half-Life (1998, GoldSrc) | Projectile mobile | [PJ_HL1_NIHILANTH](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/nihilanth.cpp) |
| `PRJ_HL2_RPG_MISSILE` | Missile RPG — HL2 | Half-Life 2 | Projectile mobile | [PJ_HL2_WEAPON_RPG](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_rpg.cpp) |
| `PRJ_HL2_AR2_COMBINE_BALL` | Boule d’énergie AR2 — HL2 | Half-Life 2 | Projectile mobile | [PJ_HL2_WEAPON_AR2](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_ar2.cpp) / [PJ_HL2_PROP_COMBINE_BALL](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/prop_combine_ball.cpp) / [PJ_HL2_C_PROP_COMBINE_BALL](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/client/hl2/c_prop_combine_ball.cpp) |
| `PRJ_HL2_CROSSBOW_BOLT` | Carreau chauffé d’arbalète — HL2 | Half-Life 2 | Projectile mobile | [PJ_HL2_WEAPON_CROSSBOW](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_crossbow.cpp) |
| `PRJ_HL2_SMG1_GRENADE` | Grenade secondaire du SMG1 — HL2 | Half-Life 2 | Projectile mobile | [PJ_HL2_WEAPON_SMG1](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_smg1.cpp) / [PJ_HL2_GRENADE_AR2](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/grenade_ar2.cpp) |
| `PRJ_HL2_FRAG_GRENADE` | Grenade à fragmentation — HL2 | Half-Life 2 | Objet lancé ou largué | [PJ_HL2_GRENADE_FRAG](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/grenade_frag.cpp) |
| `PRJ_HL2_BUGBAIT_POD` | Phéropode lancé — HL2 | Half-Life 2 | Objet lancé ou largué | [PJ_HL2_WEAPON_BUGBAIT](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_bugbait.cpp) / [PJ_HL2_GRENADE_BUGBAIT](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/grenade_bugbait.cpp) |
| `PRJ_HL2_APC_MISSILE` | Missile de l’APC — HL2 | Half-Life 2 | Projectile mobile | [PJ_HL2_VEHICLE_APC](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/vehicle_apc.cpp) / [PJ_HL2_WEAPON_RPG](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_rpg.cpp) |
| `PRJ_HL2_HUNTER_CHOPPER_BOMB` | Bombe du Hunter-Chopper — HL2 | Half-Life 2 | Objet lancé ou largué | [PJ_HL2_NPC_ATTACKCHOPPER](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_attackchopper.cpp) |
| `PRJ_EP2_HUNTER_FLECHETTE` | Fléchette du Hunter — Episode Two | Half-Life 2: Episode Two | Projectile mobile | [PJ_HL2_NPC_HUNTER](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/episodic/npc_hunter.cpp) |
| `PRJ_EP2_ANTLION_WORKER_SPIT` | Acide du fourmilion ouvrier — Episode Two | Half-Life 2: Episode Two | Projectile mobile | [PJ_HL2_NPC_ANTLION](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_antlion.cpp) / [PJ_HL2_GRENADE_SPIT](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/grenade_spit.cpp) |
| `PRJ_EP2_MAGNUSSON_DEVICE` | Dispositif Magnusson — Episode Two | Half-Life 2: Episode Two | Objet lancé ou largué | [PJ_HL2_WEAPON_STRIDERBUSTER](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/episodic/weapon_striderbuster.cpp) |
| `PRJ_HL2_HEADCRAB_CANISTER` | Capsule de headcrabs — HL2 | Half-Life 2 | Projectile mobile | [PJ_HL2_ENV_HEADCRABCANISTER](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/env_headcrabcanister.cpp) |
| `PRJ_HL2_STRIDER_CANNON` | Canon du Strider — HL2 | Half-Life 2 | Décharge ou rayon impulsionnel | [PJ_HL2_NPC_STRIDER](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_strider.cpp) |
| `PRJ_HL2_AR2_PRIMARY_TRACE` | Trace du tir primaire AR2 — HL2 | Half-Life 2 | Effet de tir hitscan | [PJ_HL2_WEAPON_AR2](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_ar2.cpp) |
| `PRJ_HL2_PISTOL_FIRE_EFFECT` | Effets du tir de pistolet — HL2 | Half-Life 2 | Effet de tir hitscan | [PJ_HL2_WEAPON_PISTOL](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_pistol.cpp) |
| `PRJ_OP4_SPORE` | Spore du Spore Launcher — Opposing Force | Half-Life: Opposing Force | Projectile mobile | [PJ_OP4_STORE](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) |
| `PRJ_OP4_SHOCK_BOLT` | Décharge du Shock Roach — Opposing Force | Half-Life: Opposing Force | Projectile mobile | [PJ_OP4_STORE](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) |
| `PRJ_OP4_DISPLACER_ORB` | Orbe du Displacer — Opposing Force | Half-Life: Opposing Force | Projectile mobile | [PJ_OP4_STORE](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) |
| `PRJ_ALYX_FRAG_GRENADE` | Grenade à fragmentation — Alyx | Half-Life: Alyx | Objet lancé ou largué | [PJ_ALYX_OFFICIAL](https://www.half-life.com/en/alyx) |
| `PRJ_ALYX_XEN_GRENADE` | Grenade Xen — Alyx | Half-Life: Alyx | Objet lancé ou largué | [PJ_ALYX_OFFICIAL](https://www.half-life.com/en/alyx) |
| `PRJ_PORTAL1_HIGH_ENERGY_PELLET` | Boule d’énergie haute intensité — Portal | Portal | Projectile mobile | [PJ_PORTAL_STORE](https://store.steampowered.com/app/400/Portal/) |
| `PRJ_PORTAL1_ROCKET_TURRET_MISSILE` | Roquette de la Rocket Turret — Portal | Portal | Projectile mobile | [PJ_PORTAL_STORE](https://store.steampowered.com/app/400/Portal/) |
| `PRJ_PORTAL1_PORTAL_EFFECT` | Émission et ouverture de portails — Portal | Portal | Effet de portails | [PJ_PORTAL_STORE](https://store.steampowered.com/app/400/Portal/) |
| `PRJ_PORTAL2_PORTAL_EFFECT` | Effets de portails solo et coop — Portal 2 | Portal 2 | Effet de portails | [PJ_PORTAL2_STORE](https://store.steampowered.com/app/620/Portal_2/) |
| `PRJ_PORTAL2_THERMAL_BEAM` | Thermal Discouragement Beam — Portal 2 | Portal 2 | Rayon continu | [PJ_PORTAL2_STORE](https://store.steampowered.com/app/620/Portal_2/) / [PJ_PORTAL2_MEDIA](https://www.thinkwithportals.com/media.php) / [PJ_PORTAL2_LASER_SCREENSHOT](https://store.steampowered.com/api/appdetails?appids=620&l=english) |
| `PRJ_PORTAL2_REPULSION_GEL` | Gel répulsif — Portal 2 | Portal 2 | Volume de gel | [PJ_PORTAL2_STORE](https://store.steampowered.com/app/620/Portal_2/) / [PJ_PORTAL2_MEDIA](https://www.thinkwithportals.com/media.php) / [PJ_PORTAL2_GEL_SCREENSHOT](https://store.steampowered.com/api/appdetails?appids=620&l=english) |
| `PRJ_PORTAL2_PROPULSION_GEL` | Gel propulsif — Portal 2 | Portal 2 | Volume de gel | [PJ_PORTAL2_STORE](https://store.steampowered.com/app/620/Portal_2/) / [PJ_PORTAL2_MEDIA](https://www.thinkwithportals.com/media.php) |
| `PRJ_PORTAL2_CONVERSION_GEL` | Gel de conversion — Portal 2 | Portal 2 | Volume de gel | [PJ_PORTAL2_STORE](https://store.steampowered.com/app/620/Portal_2/) |
| `PRJ_PORTAL2_WHEATLEY_BOMB` | Bombe du combat final — Portal 2 | Portal 2 | Projectile mobile | [PJ_PORTAL2_STORE](https://store.steampowered.com/app/620/Portal_2/) |
| `PRJ_DESKJOB_TURRET_FIRE` | Effets de tir des tourelles — Aperture Desk Job | Aperture Desk Job | Effet de tir à caractériser | [PJ_DESKJOB_STORE](https://store.steampowered.com/app/1902490/Aperture_Desk_Job/) / [PJ_DESKJOB_TRAILER](https://www.youtube.com/watch?v=mVDFJRM6F9k) |

## Six cibles prioritaires déjà reliées au SDK

La boule AR2, le missile RPG, le carreau d’arbalète, la grenade SMG1, la grenade à fragmentation et la fléchette du Hunter ont une identité technique référencée. Leur premier PNG reste un candidat tant que sa silhouette et ses matériaux n’ont pas été comparés à une capture du modèle exact. La spore Opposing Force est conservée en priorité P2 faute de preuve visuelle primaire suffisamment précise dans cette recherche.

## Production et intégration

Le champ machine est `projectile_class` dans le catalogue et dans la file synchronisée. `requires_travel_sprite` indique si le groupe a besoin d’un objet en déplacement; `required_states` et `required_variants` définissent ce qui reste à produire. Les fichiers du registre portent `owner_type: "projectile"`, un `owner_id` égal à l’ID `PRJ_*` et `target_ids: [ce même ID]`. Le validateur contrôle cette association et les compteurs du catalogue.

Pour un projectile mobile, produire la pose de vol puis les états de vol, traînée, contact et disparition que montre réellement la référence. Pour un dispositif lancé, relever aussi repos, activation et éventuel rebond. Pour les rayons, prévoir origine, segment et contact. Un tir hitscan reçoit des effets visuels de départ/contact sans devenir une balle lente. Les effets de portails et les gels gardent leur fonction de dispositif ou de matière environnementale.

Chaque état ou variante possède son propre PNG transparent; les pivots, orientations et marges sont enregistrés avec les fichiers. Une image isolée ne termine pas une animation. Le runtime reste désactivé pour les 45 nouvelles cibles: ce catalogue et la synchronisation de la file ne créent pas de comportements de combat.

Le script de synchronisation accepte désormais cette source et expose le nombre de cibles par classe de projectile, les cibles avec ou sans fichier, les demandes refusées et les références spécifiques. Il ne modifie pas la sémantique des costumes, des archives ou des six plans de stage. La certification 1:1 reste une revue distincte.

## Portée restante

Ce catalogue ne prétend pas épuiser tous les tirs de monstres, jets de débris et effets environnementaux de la franchise. Les flammes et l’onde au sol du Gargantua, les ondes du Houndeye, les roquettes Apache, les attaques Pit Drone/Voltigore/Gonome, les projectiles de certains systèmes Alyx, les variantes du Gravity Gun et les impacts par matériau demandent une extension sourcée propre. Les références beta/cut content et Episode Three restent séparées; aucun contenu Half-Life 3 n’est présenté comme une apparence officielle.

## Vérification des documents

La génération des listes utilise le registre et les chemins PNG existants. Les sources SKU/SDK ne sont ni copiées en tant qu’assets du jeu, ni remplacées par des détails imaginés. Commande prévue pour le bilan à jour: `node scripts/sync-resonance-production.mjs --write`.
