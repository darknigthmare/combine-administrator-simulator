# Revue des références — effets Source / HLA, lot L

Date : 25 novembre 2026

Base : `8bf790147fad9a7af987526759fe165195a40455`

Périmètre : six cibles sans PNG, dossiers `continuation_20261125_l/source_fx` uniquement.

## Résultat et portée

Les six cibles ont une issue explicite : **deux PNG candidats**, **quatre différés sans génération**, **zéro refus** et **zéro erreur imagegen**. Deux appels de génération ont eu lieu. Aucun appel APC/RPG, aucun réessai après refus, aucune animation ou intégration moteur.

Chaque PNG représente un seul instant d’un seul effet. Le registre conserve les prompts exacts, les URL et empreintes de référence, les dimensions, les empreintes des originaux, les blobs GitHub et les limites de la revue. Les états visuels et les familles restent incomplets.

| Cible | Issue L | État produit / blocage |
| --- | --- | --- |
| `proj_antlion_worker_spit_ep2` | Différé, aucun appel | Référence de phase insuffisante pour large / medium / small / trail / impact. |
| `fx_strider_warp_hl2` | Différé, aucun appel | Aucune frame du canon lourd HL2 retail effectivement inspectée. |
| `fx_vortigaunt_zap_hl2` | Différé, aucun appel | Pas de charge, rayon ou impact offensif attribuable sans ambiguïté dans les bitmaps disponibles. |
| `fx_reviver_discharge_hla` | PNG candidat | `discharge` : filament environnemental autour du Reviver libre dans la cage d’ascenseur. |
| `proj_antlion_spit_hla` | Différé, aucun appel | Pas de frame inspectable du projectile propre au Spitter HLA. |
| `fx_pistol_fire_hl2` | PNG candidat | `muzzle` uniquement : flash de bouche d’après une capture personnelle de gameplay publiée en 2008. |

## 1. Reviver libre : décharge environnementale

Le contrat permet `charge`, `discharge` et `impact`. La capture retenue documente une décharge autour du Reviver libre dans la cage d’ascenseur de la carte `a3_hotel_lobby_basement`. Le filament généré relève donc de `discharge`, avec une portée explicitement environnementale.

Référence effectivement téléchargée et inspectée :

- [Page du fichier HLA NorthernStar02](https://combineoverwiki.net/wiki/File:HLA_NorthernStar02.jpg.jpg).
- [Bitmap original](https://combineoverwiki.net/images/3/34/HLA_NorthernStar02.jpg.jpg), 1920 × 1080.
- SHA-256 : `702dff699d94aa6afc13fd9f241d592d4e6b3fe98314e46cc7aea43e45b9bd4b`.
- Copie de travail : `/tmp/resonance-l-source-fx/refs/reviver_northernstar.jpg`.

Le Reviver et les arcs cyan-blanc sont visibles dans la cage à gauche de l’image. Aucun zombie hôte n’y apparaît. Le prompt demande un seul filament inférieur, approximativement de (550, 540) à (660, 690), avec son halo contenu. Le nom, les notes et la portée du registre indiquent **arc environnemental** : la capture ne prouve pas une attaque dirigée contre le joueur, ni une phase de charge ou d’impact. Les arcs d’un zombie possédé déjà exclus au lot K restent exclus.

Cette image est une capture de jeu hébergée par une communauté. La page attribue la scène à Half-Life: Alyx et à la carte citée. Ses métadonnées signalent Photoshop CC 2019 : elle n’est pas certifiée comme framebuffer brut. Les images d’un autre guide consulté étaient inaccessibles et n’ont pas servi de référence.

Le PNG généré contient un filament cyan-blanc avec une petite branche, sans créature ni décor. Il est visible sur les deux fonds de diagnostic. Cette reconstruction ne certifie ni la géométrie exacte de l’arc retail, ni son animation.

## 2. Pistolet Half-Life 2 : flash de bouche

Le contrat autorise `muzzle`, une trace uniquement si elle est visible dans une référence, `impact` et `fade`. Seul `muzzle` est produit.

Référence effectivement téléchargée et inspectée :

- Patrick Lipo, [Weapons of Awesome Power (and Some Less So)](https://www.patricklipo.com/2008/06/19/weapons-of-awesome-power-and-some-less-so/), publié le 19 juin 2008. L’auteur explique avoir capturé les tirs des jeux comparés et identifie Half-Life 2 sur PC.
- [Capture du pistolet](https://www.patricklipo.com/wp-content/uploads/2008/06/hl2-pistol.jpg), native 256 × 170.
- SHA-256 : `42a651c0e2747224f60b68cc2487c2fda67fb8d96f9cc3c2015df619c6b77666`.
- Copie de travail : `/tmp/resonance-l-source-fx/refs/pistol_lipo.jpg`.

La capture montre un flash blanc-jaune/orange immédiatement devant le pistolet, vers (140, 90). Elle fixe les grandes masses lumineuses et la palette ; sa petite taille ne permet pas d’établir les détails fins, l’alpha ou la durée. Le filigrane, l’arme, la main, le décor et le HUD ne sont pas reproduits.

Le [code officiel de CWeaponPistol](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_pistol.cpp) a aussi été récupéré. Son SHA-256 est `61e67d66c5c6c375efd4c04c04fe086222fd9a16ebaeb91f7ffdebe16751b002`. `FireBullets` confirme le chemin hitscan, sans certifier les pixels du flash. Aucun projectile lent ou traceur n’a été produit.

Une autre [capture retail, HL2 CP10](https://combineoverwiki.net/wiki/File:HL2_CP10.jpg), a été inspectée puis exclue : le Metrocop tient son pistolet sur un balcon de `d3_c17_07`, mais aucun flash n’est visible. Ce fichier 1920 × 1080 porte le SHA-256 `3013b53cd3c50d95972776a9e9ac18997f4987a1da9a6b0bbf18d3db731fd7ce`.

Le candidat généré est un flash compact, lumineux et diffus. Sa texture est plus détaillée que la petite source : une revue de fidélité reste nécessaire, en particulier sur le volume et la forme du flash. Il ne vaut pas validation visuelle complète de l’état `muzzle`.

## 3. Crachat du Worker Episode Two : différé

Le contrat hérité identifie les modèles `spitball_large.mdl`, `spitball_medium.mdl`, `spitball_small.mdl` et `antlion_spit_trail` dans le [SDK officiel](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/grenade_spit.cpp). Le code fixe les ressources et leur association, pas leur rendu.

Le résultat du lot K est conservé : `Ep2_outland_01a0023.jpg` montre bien un Worker retail qui tire, mais le petit nuage vert ne permet pas de choisir une variante ou une phase. Une capture du modèle de l’insecte ne remplace pas celle de son projectile.

Le [guide This Vortal Coil](https://portforward.com/games/walkthroughs/Half-Life-2-Episode-Two/This-Vortal-Coil.htm) contient des légendes de combats pertinentes. Les six images tentées, numéros 54, 55, 60, 63, 83 et 96, ont toutes renvoyé HTTP 403. Le [guide IGN archivé](https://valvearchive.com/Games/Half-Life%202%20Episode%202/Documents/mb-ign_half_life_2_episode_2_pc.pdf) était également inaccessible. Des descriptions indexées de ces images ne constituent pas une inspection de pixels.

**Suite requise :** une capture retail ou une vue des ressources originales, distinguant clairement un des trois volumes, la traînée ou l’impact. Aucun appel imagegen n’a été effectué pour cette cible.

## 4. Canon lourd du Strider HL2 : différé

Les exclusions du lot K sont maintenues : `Strider_fire.jpg` montre le minigun ; `Warp_Cannon` et `Strider_Firing_Pulse_Cannon` appartiennent à Alyx ; `Strider_Immolator_Firing.jpg` représente une restauration de contenu coupé. Les images de MMod ou d’autres versions ne sont pas des références du canon retail HL2.

Une [vidéo intitulée Half Life 2 - Strider Warp Cannon Tutorial](https://www.youtube.com/watch?v=NlppLarRErA), publiée par Merlinin Kazanı, a été identifiée. Les métadonnées indiquent 218 secondes et sa description mentionne `setcannonattack`. Les médias publics ont renvoyé HTTP 403 ; aucune frame n’a été téléchargée ou inspectée. Aucun timecode de tir n’est donc validé.

**Suite requise :** capture lisible de charge, tir ou impact du canon lourd dans Half-Life 2 retail, avec map, séquence et instant documentés. Aucun appel imagegen.

## 5. Décharge offensive Vortigaunt des épisodes : différé

Deux nouveaux bitmaps ont été inspectés :

| Référence | Dimensions et SHA-256 | Conclusion |
| --- | --- | --- |
| [Griggs support](https://combineoverwiki.net/wiki/File:Griggs_support.jpg), `ep2_outland_02` | 1358 × 900 ; `765bc879bcba04863ec0d6b5f6ef49571f6e3c919a302ce6f57b7c21279d3403` | Combat visible, mais Griggs tire au SMG et le nuage vert autour d’un antlion n’est pas attribuable avec certitude au Vortigaunt. |
| [Vortigaunt mines](https://combineoverwiki.net/wiki/File:Vortigaunt_mines.jpg), `ep2_outland_04` | 780 × 645 ; `f116e50512996acc9a0fe430026189df133299a5e56a9f73979809cabd7289f0` | Portrait du Lone Vort sans charge, faisceau ou impact. |

La page [Worker vort in the mines](https://combineoverwiki.net/wiki/File:Worker_vort_in_the_mines.jpg) classe cette capture comme prerelease. Son bitmap n’a pas été utilisé. Les scènes de soin d’Alyx et de larve du lot K restent distinctes de l’attaque offensive.

Les captures de combat mentionnées dans les guides Portforward et IGN n’ont pas pu être inspectées en raison des réponses HTTP 403. Leurs descriptions ne suffisent pas à générer un rayon précis.

**Suite requise :** une frame retail d’Episode One ou Episode Two montrant un faisceau partant du Vortigaunt vers un ennemi, avec attribution nette de l’état charge, beam ou impact. Aucun appel imagegen.

## 6. Projectile du Spitter HLA : différé

La [page Antlion Spitter](https://combineoverwiki.net/wiki/Antlion_Spitter) identifie la variante HLA et ses attaques. Les modèles et la description de bile bleue ne fixent pas les pixels du projectile.

Une [vidéo du chapitre Revelations](https://www.youtube.com/watch?v=kKDsmlV9tdg) possède un repère à **11:10**, intitulé « Milking the Leggies / Leggy Spitters ». Il s’agit d’un marqueur de chapitre indexé, et non d’un timecode de projectile vérifié. Aucune frame de ce tir n’a été inspectée.

Les conversions communautaires vers HL2 ou GMod ne constituent pas une preuve du rendu HLA retail. Le crachat du Worker Episode Two n’a pas été repris.

**Suite requise :** capture de la variante Spitter dans Revelations ou Breaking and Entering, avec un instant précis montrant body, trail ou impact. Aucun appel imagegen.

## Originaux et contrôle alpha

| Asset | Dimensions | SHA-256 PNG | Blob Git / GitHub vérifié |
| --- | --- | --- | --- |
| `fx_reviver_discharge_hla_discharge_l` | 1199 × 1312 | `ee5abd9f4b6a2c7788f099e523588cc50a1db2c46369a63382203119687328d5` | `8b3b87f66c82f363c169598ed1a00d1c12133e77` |
| `fx_pistol_fire_hl2_muzzle_l` | 1536 × 1024 | `59ccd995b78661f20acc31c3ed11bc3bd7f64a4ec10f41ef031d0b1b68c2d558` | `a267ca0fd2b5ab4d0f7c1df3829f4ce0a48e7b7f` |

Les deux sorties sont RGBA. Les blobs ont été créés puis leur SHA Git vérifié avant la copie locale des PNG. Les octets originaux sont conservés ; les diagnostics n’ont modifié aucun livrable.

Les composites sur **#f2f2f2** et **#121820** ont été inspectés. Les deux effets restent lisibles sur les deux fonds. Le Reviver présente 1 429 834 pixels entièrement transparents et 143 254 pixels semi-transparents ; le pistolet présente 1 022 214 pixels entièrement transparents et 550 650 pixels semi-transparents. Aucun pixel n’a un alpha de 255 ; les maxima sont respectivement 253 et 254.

Les bords contiennent quelques traces très faibles : 7 pixels du Reviver et 176 pixels du pistolet à alpha 1. Aucun pixel de bord n’atteint alpha 16. Ces traces ont été documentées et conservées, sans recadrage ou retouche de l’original.

La revue porte sur ces deux fichiers candidats et leur transparence. Elle ne certifie pas leur fidélité 1:1, leur durée, une animation, les autres états des familles ou un rendu dans le moteur. Aucun fichier global, catalogue ou runtime n’a été modifié par cette sous-tâche ; aucun commit, ref ou PR n’a été créé ou modifié.
