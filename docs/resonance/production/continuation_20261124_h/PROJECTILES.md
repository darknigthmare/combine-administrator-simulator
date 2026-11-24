# Catalogue des projectiles et effets — 24 novembre 2026

**62 familles ajoutées**, aucune présumée produite lors de la création du catalogue. Ce catalogue est reconstruit depuis les sources citées; il ne correspond pas à une récupération des 45 entrées évoquées dans les échanges précédents.

## Sens des catégories

| Type | Sens |
|---|---|
| projectile | Objet ou effet qui se déplace réellement entre émission et contact. |
| throwable | Objet lancé, avec trajectoire et éventuellement rebond. |
| instant_trace | Tir résolu immédiatement; le traceur est une représentation visuelle. |
| beam | Faisceau ou décharge, avec émission et extrémité distinctes. |
| impact | Éclaboussure ou effet de contact. |
| area | Zone persistante ou onde de proximité. |
| portal | Passage dont la destination doit être rendue dynamiquement. |

## Liste complète

Les liens de code Valve prouvent les contrats et les ressources nommées. Ils ne dispensent pas de vérifier les textures, couleurs, silhouettes et étapes sur les fichiers/captures originaux. Les entrées OF, HLA et plusieurs Portal restent en attente de références visuelles exactes.

### Half-Life (1998)

| ID | Famille | Type | Invariant | Source |
|---|---|---|---|---|
| `proj_rpg_rocket_hl1` | Roquette RPG — modèle HL1 | `projectile` | Corps rpgrocket.mdl; fumée séparée; ne pas utiliser le missile HL2. | [hl1_rpg](https://github.com/ValveSoftware/halflife/blob/master/dlls/rpg.cpp) |
| `proj_mp5_grenade_hl1` | Grenade secondaire MP5 | `projectile` | Grenade lancée par le MP5; modèle grenade.mdl distinct du paquet de munitions w_ARgrenade.mdl. | [hl1_mp5](https://github.com/ValveSoftware/halflife/blob/master/dlls/mp5.cpp) |
| `proj_hand_grenade_hl1` | Grenade à main HL1 | `throwable` | Version originale HL1, pas la grenade Combine de HL2. | [hl1_handgrenade](https://github.com/ValveSoftware/halflife/blob/master/dlls/handgrenade.cpp) |
| `proj_crossbow_bolt_hl1` | Carreau d’arbalète HL1 | `projectile` | Corps crossbow_bolt.mdl GoldSrc; conserver le carreau original, pas le fer incandescent HL2. | [hl1_crossbow](https://github.com/ValveSoftware/halflife/blob/master/dlls/crossbow.cpp) |
| `proj_hornet_hl1` | Frelon biologique Hivehand / Alien Grunt | `projectile` | Insecte hornet.mdl; types rouge et orange; traînée distincte. Une munition vivante, pas un missile mécanique. | [hl1_hornet](https://github.com/ValveSoftware/halflife/blob/master/dlls/hornet.cpp) |
| `proj_bullsquid_spit_hl1` | Crachat du Bullsquid | `projectile` | Sprite bigspit.spr; éclaboussures tinyspit.spr à produire séparément. | [hl1_bullsquid](https://github.com/ValveSoftware/halflife/blob/master/dlls/bullsquid.cpp) |
| `fx_bullsquid_spit_impact_hl1` | Impact du crachat Bullsquid | `impact` | Éclaboussures tinyspit.spr et marque de contact; pas une explosion de feu. | [hl1_bullsquid](https://github.com/ValveSoftware/halflife/blob/master/dlls/bullsquid.cpp) |
| `proj_controller_orb_hl1` | Orbes de l’Alien Controller | `projectile` | controller_energy_ball et controller_head_ball utilisent xspark4.spr; distinguer leurs comportements. | [hl1_controller](https://github.com/ValveSoftware/halflife/blob/master/dlls/controller.cpp) |
| `proj_nihilanth_energy_hl1` | Décharge du Nihilanth | `projectile` | nihilanth_energy_ball et effets électriques; ne pas fusionner avec la téléportation. | [hl1_nihilanth](https://github.com/ValveSoftware/halflife/blob/master/dlls/nihilanth.cpp) |
| `proj_nihilanth_teleport_hl1` | Orbe de téléportation Nihilanth | `projectile` | Mode de téléportation du boss; effets tele1/exit1 associés à vérifier sur séquence de jeu. | [hl1_nihilanth](https://github.com/ValveSoftware/halflife/blob/master/dlls/nihilanth.cpp) |
| `proj_gonarch_mortar_hl1` | Mortier organique Gonarch | `projectile` | bmortar, mommaspit.spr; éclaboussures mommaspout.spr et débris mommablob.spr. | [hl1_bigmomma](https://github.com/ValveSoftware/halflife/blob/master/dlls/bigmomma.cpp) |
| `proj_snark_hl1` | Snark lancé | `throwable` | Modèle w_squeak.mdl; réutiliser l’identité du personnage Snark et dessiner sa pose en vol. | [hl1_squeakgrenade](https://github.com/ValveSoftware/halflife/blob/master/dlls/squeakgrenade.cpp) |
| `proj_satchel_hl1` | Charge télécommandée lancée | `throwable` | Charge w_satchel.mdl; ne pas dessiner la télécommande comme projectile. | [hl1_satchel](https://github.com/ValveSoftware/halflife/blob/master/dlls/satchel.cpp) |
| `fx_tripmine_laser_hl1` | Rayon de mine laser HL1 | `beam` | Faisceau fixe cyan, couleur code 0,214,198; mine séparée. | [hl1_tripmine](https://github.com/ValveSoftware/halflife/blob/master/dlls/tripmine.cpp) |
| `fx_gauss_beam_hl1` | Rayon Tau / Gauss | `beam` | Rayon instantané et lueur hotglow; tir simple et chargé distincts; pas une boule lente. | [hl1_gauss](https://github.com/ValveSoftware/halflife/blob/master/dlls/gauss.cpp) |
| `fx_gluon_beam_hl1` | Faisceau Gluon / Egon | `beam` | Faisceau continu xbeam1 avec bruit et flare XSpark1; pas un projectile discret. | [hl1_egon](https://github.com/ValveSoftware/halflife/blob/master/dlls/egon.cpp) |
| `fx_vortigaunt_zap_hl1` | Décharge Vortigaunt HL1 | `beam` | lgtning.spr; arcs de charge et décharge vert-jaune séparés. | [hl1_islave](https://github.com/ValveSoftware/halflife/blob/master/dlls/islave.cpp) |
| `fx_houndeye_sonic_ring_hl1` | Double anneau sonique Houndeye | `area` | Deux TE_BEAMCYLINDER concentriques; couleur solo 188,220,255; ne pas transformer en boule. | [hl1_houndeye](https://github.com/ValveSoftware/halflife/blob/master/dlls/houndeye.cpp) |
| `fx_gargantua_flame_hl1` | Jets de flamme Gargantua | `beam` | Jets des deux mains avec cœur bleu et enveloppe chaude; rendu xbeam3. | [hl1_gargantua](https://github.com/ValveSoftware/halflife/blob/master/dlls/gargantua.cpp) |
| `fx_gargantua_stomp_hl1` | Onde au sol Gargantua | `area` | Trajet rasant du garg_stomp; ne pas remplacer par l’anneau Houndeye. | [hl1_gargantua](https://github.com/ValveSoftware/halflife/blob/master/dlls/gargantua.cpp) |
| `fx_bullet_tracer_hl1` | Traceur balistique GoldSrc | `instant_trace` | Le tir de balle se résout par trace; tracer optionnel visuel, aucune lente ogive physique. | [hl1_combat](https://github.com/ValveSoftware/halflife/blob/master/dlls/combat.cpp) |

### Half-Life: Opposing Force

| ID | Famille | Type | Invariant | Source |
|---|---|---|---|---|
| `proj_shock_bolt_opfor` | Décharge Shock Roach / Shock Trooper | `projectile` | Référence exacte de la décharge électrique Gearbox à capturer; ne pas emprunter le Vortigaunt HL1. | [opfor_release](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) |
| `proj_spore_opfor` | Spore du Spore Launcher | `projectile` | Spore organique; séparer tir direct et mode rebond dans les séquences. | [opfor_release](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) |
| `proj_displacer_orb_opfor` | Orbe Displacer | `projectile` | Orbe de déplacement et arrivée à capturer dans le jeu; pas un portail Aperture. | [opfor_release](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) |
| `proj_pit_drone_spine_opfor` | Épine Pit Drone | `projectile` | Dard organique crânien propre au Pit Drone; silhouette à verrouiller sur modèle. | [opfor_release](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) |
| `proj_voltigore_orb_opfor` | Décharge Voltigore | `projectile` | Attaque électrique du Voltigore; couleur et enveloppe à capturer. | [opfor_release](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) |
| `fx_pit_worm_beam_opfor` | Faisceau oculaire Pit Worm | `beam` | Émission depuis l’œil et balayage à vérifier dans la séquence du boss. | [opfor_release](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) |
| `proj_gene_worm_spit_opfor` | Projection Gene Worm | `projectile` | Attaque de la rencontre finale; référence primaire de séquence requise avant génération certifiable. | [opfor_release](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) |
| `proj_gonome_gut_opfor` | Projectile organique Gonome | `projectile` | Projectile lancé par le Gonome, distinct du crachat Bullsquid. | [opfor_release](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) |

### Half-Life 2

| ID | Famille | Type | Invariant | Source |
|---|---|---|---|---|
| `proj_rpg_rocket_hl2` | Missile RPG — modèle HL2 | `projectile` | w_missile_launch puis w_missile en vol; fumée et moteur séparés. | [hl2_weapon_rpg](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/weapon_rpg.cpp) |
| `proj_smg_grenade_hl2` | Grenade secondaire SMG1 | `projectile` | Entité grenade_ar2, modèle Weapons/ar2_grenade.mdl; le nom du fichier ne signifie pas munition secondaire AR2. | [hl2_grenade_ar2](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/grenade_ar2.cpp) |
| `proj_hand_grenade_hl2` | Grenade à fragmentation HL2 | `throwable` | Grenade HL2 et témoin de minuterie; pas la version HL1. | [hl2_grenade_frag](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/grenade_frag.cpp) |
| `proj_crossbow_bolt_hl2` | Carreau incandescent HL2 | `projectile` | crossbow_bolt.mdl; cœur métallique et incandescent lisibles séparément de la traînée. | [hl2_weapon_crossbow](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/weapon_crossbow.cpp) |
| `proj_ar2_energy_ball_hl2` | Orbe d’énergie secondaire AR2 | `projectile` | combineball.mdl et traînée dédiée; sphère d’énergie rebondissante, pas balle de tir primaire. | [hl2_prop_combine_ball](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/prop_combine_ball.cpp) |
| `proj_bugbait_hl2` | Phéropode lancé | `throwable` | w_bugbait.mdl; lancement, rupture et nuage signal distincts. | [hl2_grenade_bugbait](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/grenade_bugbait.cpp) |
| `proj_apc_missile_hl2` | Missile APC | `projectile` | Classe CAPCMissile du code RPG; trajectoire guidée et fumée; pas une orbe AR2. | [hl2_weapon_rpg](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/weapon_rpg.cpp) |
| `proj_helicopter_bomb_hl2` | Bombe Hunter-Chopper | `projectile` | Grenade d’hélicoptère issue du code AttackChopper; corps et clignotement à vérifier au modèle. | [hl2_npc_attackchopper](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/npc_attackchopper.cpp) |
| `fx_ar2_tracer_hl2` | Traceur de tir primaire AR2 | `instant_trace` | Tir primaire de l’AR2 par balle/trace; distinguer de la boule secondaire. | [hl2_weapon_ar2](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/weapon_ar2.cpp) |
| `fx_strider_warp_hl2` | Canon lourd Strider | `beam` | Charge, distorsion, tir lourd et blast de contact; pas l’orbe AR2. | [hl2_npc_strider](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/npc_strider.cpp) |
| `fx_gunship_tracer_hl2` | Traceur bleu Gunship | `instant_trace` | Tir de canon avec traceur bleu signé Gunship; ne pas utiliser un projectile energy_orb générique. | [hl2_npc_combinegunship](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/npc_combinegunship.cpp) |
| `fx_strider_tracer_hl2` | Traceur de canon léger Strider | `instant_trace` | StriderTracer produit par le tir léger; distinct du canon lourd. | [hl2_npc_strider](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/npc_strider.cpp) |

### Half-Life 2: Episode Two

| ID | Famille | Type | Invariant | Source |
|---|---|---|---|---|
| `proj_hunter_flechette_ep2` | Fléchette explosive Hunter | `projectile` | weapons/hunter_flechette.mdl; trail spécifique, fixation et explosion retardée. | [hl2_npc_hunter](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/episodic/npc_hunter.cpp) |
| `proj_antlion_worker_spit_ep2` | Crachat de Fourmilion ouvrier | `projectile` | spitball_large/medium/small.mdl et antlion_spit_trail; pas le bigspit HL1. | [hl2_grenade_spit](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/grenade_spit.cpp) |
| `proj_magnusson_device_ep2` | Dispositif Magnusson | `throwable` | magnusson_device.mdl; transport, lancement et fixation sur Strider distincts. | [hl2_weapon_striderbuster](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/episodic/weapon_striderbuster.cpp) |

### Half-Life 2: épisodes

| ID | Famille | Type | Invariant | Source |
|---|---|---|---|---|
| `fx_vortigaunt_zap_hl2` | Décharge Vortigaunt — épisodes | `beam` | Référence du code Vortigaunt des épisodes; charge, rayon et impact séparés; vérifier variante HL2 de base. | [hl2_npc_vortigaunt_episodic](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/npc_vortigaunt_episodic.cpp) |

### Portal

| ID | Famille | Type | Invariant | Source |
|---|---|---|---|---|
| `proj_energy_pellet_portal1` | Boulette d’énergie haute puissance | `projectile` | Orbe énergétique de test Portal 1; capture exacte pour lumière et traînée; ne pas copier aveuglément AR2. | [portal_release](https://store.steampowered.com/app/400/Portal/) |
| `proj_rocket_turret_missile_portal1` | Roquette Rocket Turret | `projectile` | Roquette redirigeable de la Rocket Turret; verrouiller le modèle original. | [portal_release](https://store.steampowered.com/app/400/Portal/) |
| `fx_portal_blue_portal1` | Portail bleu Portal 1 | `portal` | Contour bleu et surface transparente pour composition dynamique; aucun décor de destination baked-in. | [portal_release](https://store.steampowered.com/app/400/Portal/) |
| `fx_portal_orange_portal1` | Portail orange Portal 1 | `portal` | Contour orange distinct; destination dessinée par le moteur. | [portal_release](https://store.steampowered.com/app/400/Portal/) |

### Portal 2 — coopération

| ID | Famille | Type | Invariant | Source |
|---|---|---|---|---|
| `fx_portals_coop_portal2` | Portails de coopération ATLAS / P-body | `portal` | Famille de quatre couleurs à capturer séparément; ne pas compter une planche comme quatre assets. | [portal2_release](https://store.steampowered.com/app/620/Portal_2/) |

### Portal 2

| ID | Famille | Type | Invariant | Source |
|---|---|---|---|---|
| `fx_thermal_beam_portal2` | Faisceau de découragement thermique | `beam` | Faisceau continu de test rouge; source, tronçon et impact distincts. | [portal_thermal](https://www.thinkwithportals.com/media_04.html) |
| `fx_hard_light_bridge_portal2` | Pont de lumière solide | `area` | Surface lumineuse bleue stable et bords propres; zone solide persistante, pas un projectile. | [portal2_release](https://store.steampowered.com/app/620/Portal_2/) |
| `fx_excursion_funnel_portal2` | Tunnel d’excursion | `area` | Volume d’acheminement; séparer sens normal et inversé, texture animable. | [portal_media](https://www.thinkwithportals.com/media.php) |
| `proj_repulsion_gel_portal2` | Goutte de gel répulsif | `projectile` | Gel répulsif bleu; goutte et éclaboussure distinctes. | [portal_media](https://www.thinkwithportals.com/media.php) |
| `proj_propulsion_gel_portal2` | Goutte de gel propulsif | `projectile` | Gel propulsif orange; ne pas remplacer par gel répulsif recoloré sans comparaison de matière. | [portal_media](https://www.thinkwithportals.com/media.php) |
| `proj_conversion_gel_portal2` | Goutte de gel de conversion | `projectile` | Gel blanc de conversion; référence du chapitre exact requise. | [portal2_release](https://store.steampowered.com/app/620/Portal_2/) |
| `proj_aperture_bomb_portal2` | Bombe Aperture de Wheatley | `projectile` | Bombe de la rencontre finale; pas le futbol coupé en verre. | [portal2_release](https://store.steampowered.com/app/620/Portal_2/) |

### Half-Life: Alyx

| ID | Famille | Type | Invariant | Source |
|---|---|---|---|---|
| `proj_combine_grenade_hla` | Grenade Combine HLA | `throwable` | Modèle HLA et mécanisme d’armement à capturer; ne pas substituer la grenade HL2. | [alyx_release](https://www.half-life.com/en/alyx) |
| `proj_xen_grenade_hla` | Grenade Xen HLA | `throwable` | Organisme explosif de Xen; référence du modèle HLA requise. | [alyx_release](https://www.half-life.com/en/alyx) |
| `fx_reviver_discharge_hla` | Décharge du Reviver / Lightning Dog | `beam` | Charge et arcs propres au Reviver, vérifier la séquence exacte. | [alyx_release](https://www.half-life.com/en/alyx) |
| `proj_antlion_spit_hla` | Projectile de Fourmilion HLA | `projectile` | Variante biologique HLA à identifier sur capture avant production; pas de copie automatique Episode Two. | [alyx_release](https://www.half-life.com/en/alyx) |

### Aperture Desk Job

| ID | Famille | Type | Invariant | Source |
|---|---|---|---|---|
| `fx_deskjob_turret_tracer` | Tir de tourelle électroménagère | `instant_trace` | Traceurs et flashs du jeu; continuité alternative officielle conservée. | [deskjob_release](https://store.steampowered.com/app/1902490/Aperture_Desk_Job/) |

## Contrat de production

- Un élément ou une étape par image, fond réellement transparent, marges autour des traînées et des effets.
- Les séquences `body`, `trail`, `impact` ne sont pas fusionnées dans un sprite impossible à animer.
- Les variantes rouge/orange du Hornet, les trois tailles du crachat ouvrier et les quatre portails coop ont des fichiers distincts.
- Le Houndeye produit deux anneaux concentriques; le canon léger du Gunship est un traceur, pas une orbe AR2.
- La grenade SMG1 porte un nom technique `grenade_ar2`; ce nom ne doit pas inverser les armes dans le jeu.
- Les catégories officielles et la continuité alternative de Desk Job restent explicites.
- Les prototypes Ice Gun et Blob restent dans les archives existantes; aucune attaque HL3 finale n’est inventée.

## Sources primaires

- [rpg.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/rpg.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [mp5.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/mp5.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [handgrenade.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/handgrenade.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [crossbow.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/crossbow.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [hornet.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/hornet.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [bullsquid.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/bullsquid.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [controller.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/controller.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [nihilanth.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/nihilanth.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [bigmomma.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/bigmomma.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [squeakgrenade.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/squeakgrenade.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [gauss.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/gauss.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [egon.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/egon.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [islave.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/islave.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [houndeye.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/houndeye.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [gargantua.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/gargantua.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [combat.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/combat.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [tripmine.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/tripmine.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [satchel.cpp](https://github.com/ValveSoftware/halflife/blob/master/dlls/satchel.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [weapon_rpg.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/weapon_rpg.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [grenade_ar2.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/grenade_ar2.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [grenade_frag.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/grenade_frag.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [weapon_crossbow.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/weapon_crossbow.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [prop_combine_ball.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/prop_combine_ball.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [grenade_bugbait.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/grenade_bugbait.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [npc_attackchopper.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/npc_attackchopper.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [grenade_spit.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/grenade_spit.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [weapon_ar2.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/weapon_ar2.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [npc_strider.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/npc_strider.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [npc_combinegunship.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/npc_combinegunship.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [npc_vortigaunt_episodic.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/npc_vortigaunt_episodic.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [npc_hunter.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/episodic/npc_hunter.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [weapon_striderbuster.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/episodic/weapon_striderbuster.cpp) — Code officiel consulté : type, association et ressources. La couleur exacte et les détails visuels exigent encore les sprites/modèles du jeu.
- [Valve — Portal 2 media](https://www.thinkwithportals.com/media.php) — Page officielle consultée : vidéos de tourelles, gel répulsif, gel propulsif, faisceau thermique, excursion funnel. Le catalogue de liens ne remplace pas une capture annotée.
- [Valve — Thermal Discouragement Beam](https://www.thinkwithportals.com/media_04.html) — Page vidéo officielle consultée : faisceau thermique. Échantillon de frames et largeur de faisceau encore requis.
- [Valve — Portal](https://store.steampowered.com/app/400/Portal/) — Jeu officiel identifié. La fiche produit ne certifie pas les modèles d’orbes, roquettes ou portails; capture en jeu requise.
- [Valve — Portal 2](https://store.steampowered.com/app/620/Portal_2/) — Jeu officiel identifié. Captures exactes nécessaires pour bombe, gel de conversion, pont et couleurs de coopération.
- [Valve/Gearbox — Opposing Force](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) — Contexte du jeu seulement. Le code de Half-Life 1 ne prouve pas les attaques ajoutées par Gearbox; références d’armes et de monstres à capturer dans Opposing Force.
- [Valve — Half-Life: Alyx](https://www.half-life.com/en/alyx) — Jeu et contexte officiels. Captures de grenades et de leurs effets nécessaires; ne pas substituer les modèles HL2.
- [Valve — Aperture Desk Job](https://store.steampowered.com/app/1902490/Aperture_Desk_Job/) — Jeu officiel distinct. La mitrailleuse d’électroménager exige une capture du jeu; aucune boule d’énergie inventée.
