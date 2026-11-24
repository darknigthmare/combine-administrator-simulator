# Audit des fichiers de production — Half Life Resonance

Exécuté le 2026-11-24T16:50:37.557Z. Résultat : **réussi**.

Le comptage porte sur les fichiers présents dans le dépôt au moment du contrôle. Les déclarations des anciennes conversations ne créent aucune entrée ni aucun fichier.

| Mesure | Nombre |
|---|---:|
| actual_png_files | 147 |
| valid_png_headers | 147 |
| distinct_png_contents | 147 |
| requests | 172 |
| generated_requests | 147 |
| generated_requests_with_verified_file | 147 |
| blocked_requests | 25 |
| unproduced_requests | 25 |
| unclassified_requests | 0 |
| requests_with_files | 147 |
| registered_png_files | 147 |
| unregistered_png_files | 0 |
| certified_one_to_one_declared | 0 |
| certified_one_to_one_with_verified_file | 0 |
| integrated_in_game_declared | 2 |
| completed_animation_clips_declared | 0 |

## Portée du contrôle

Présence, SHA-256, taille et en-tête PNG sont vérifiés. Le script ne décode pas les pixels et ne valide ni la qualité de transparence, ni la fidélité 1:1, ni une animation complète, ni l’intégration en jeu. Les valeurs de certification restent des déclarations du registre.

## Fichiers présents

| Fichier | Dimensions | Octets | Recensé |
|---|---|---:|---|
| assets/resonance/candidates/combine_elite_hl2_idle_left.png | 1245 × 1263 | 1095642 | oui |
| assets/resonance/candidates/continuation_20261120_b/abrams_hl1_idle_left.png | 2172 × 724 | 1462551 | oui |
| assets/resonance/candidates/continuation_20261120_b/apache_hecu_hl1_hover_left.png | 2172 × 724 | 1045538 | oui |
| assets/resonance/candidates/continuation_20261120_b/colette_decay_idle_right.png | 1024 × 1536 | 1732456 | oui |
| assets/resonance/candidates/continuation_20261120_b/gman_hl2_idle_right.png | 1024 × 1536 | 1509587 | oui |
| assets/resonance/candidates/continuation_20261120_b/stage_whiteforest_ep2_hangar_master_v2.png | 2172 × 724 | 2561525 | oui |
| assets/resonance/candidates/continuation_20261120_b/stage_whiteforest_ep2_hangar_master.png | 2172 × 724 | 2888943 | oui |
| assets/resonance/candidates/continuation_20261120_c/chell_portal1_idle_c.png | 725 × 2170 | 1427826 | oui |
| assets/resonance/candidates/continuation_20261120_c/costume_chell_portal2_idle_c.png | 736 × 2135 | 1491548 | oui |
| assets/resonance/candidates/continuation_20261120_c/grady_deskjob_core_idle_c.png | 1448 × 1086 | 1291991 | oui |
| assets/resonance/candidates/continuation_20261120_c/layer_portal2_turret_factory_floor_c.png | 2172 × 724 | 580863 | oui |
| assets/resonance/candidates/continuation_20261120_c/rocket_turret_portal1_idle_left_c.png | 1060 × 1484 | 1658002 | oui |
| assets/resonance/candidates/continuation_20261120_c/rocket_turret_portal1_idle_left_v2_c.png | 1060 × 1484 | 1379728 | oui |
| assets/resonance/candidates/continuation_20261120_c/stage_portal2_turret_factory_master_c.png | 2172 × 724 | 1902840 | oui |
| assets/resonance/candidates/continuation_20261120_d/advisor_extraction_ep2_idle_right_d.png | 1254 × 1254 | 1377294 | oui |
| assets/resonance/candidates/continuation_20261120_d/antlion_hl2_idle_d.png | 1358 × 1158 | 1279083 | oui |
| assets/resonance/candidates/continuation_20261120_d/layer_canals_floor_d.png | 2172 × 724 | 732214 | oui |
| assets/resonance/candidates/continuation_20261120_d/overwatch_soldier_hl2_idle_left_d.png | 822 × 1914 | 1363467 | oui |
| assets/resonance/candidates/continuation_20261120_d/stage_canals_master_d.png | 2172 × 724 | 3197487 | oui |
| assets/resonance/candidates/continuation_20261120_d/stage_ravenholm_master_d.png | 2172 × 724 | 2679945 | oui |
| assets/resonance/candidates/continuation_20261120_d/strider_whiteforest_ep2_idle_left_d.png | 1049 × 1499 | 474464 | oui |
| assets/resonance/candidates/continuation_20261120_d/zombine_ep1_idle_d.png | 1081 × 1455 | 1143085 | oui |
| assets/resonance/candidates/continuation_20261120_e/antlion_worker_ep2_idle_e.png | 1536 × 1024 | 1878983 | oui |
| assets/resonance/candidates/continuation_20261120_e/boss_gargantua_hl1_rear_threequarter_e.png | 1312 × 1199 | 1307540 | oui |
| assets/resonance/candidates/continuation_20261120_e/costume_hecu_beret_hl1_guard_right_e.png | 1448 × 1086 | 943278 | oui |
| assets/resonance/candidates/continuation_20261120_e/dog_hl2_idle_e.png | 1312 × 1199 | 1889988 | oui |
| assets/resonance/candidates/continuation_20261120_e/hunter_ep2_idle_e.png | 1315 × 1196 | 830063 | oui |
| assets/resonance/candidates/continuation_20261120_e/layer_canals_far_city_e.png | 2172 × 724 | 535444 | oui |
| assets/resonance/candidates/continuation_20261120_e/layer_canals_mid_structure_e.png | 2172 × 724 | 1950267 | oui |
| assets/resonance/candidates/continuation_20261120_e/layer_canals_mid_structure_v2_e.png | 2172 × 724 | 1942184 | oui |
| assets/resonance/candidates/continuation_20261120_e/layer_canals_near_water_e.png | 2172 × 724 | 983823 | oui |
| assets/resonance/candidates/continuation_20261120_e/layer_canals_sky_e.png | 2172 × 724 | 1579557 | oui |
| assets/resonance/candidates/continuation_20261120_e/layer_ravenholm_floor_e.png | 2172 × 724 | 506677 | oui |
| assets/resonance/candidates/continuation_20261120_e/layer_ravenholm_sky_e.png | 2172 × 724 | 1448558 | oui |
| assets/resonance/candidates/continuation_20261124_f/antlion_guard_hl2_idle_left_f.png | 1312 × 1199 | 1223238 | oui |
| assets/resonance/candidates/continuation_20261124_f/apc_hl2_idle_left_f.png | 2172 × 724 | 1099380 | oui |
| assets/resonance/candidates/continuation_20261124_f/bullsquid_hl1_idle_left_f.png | 1737 × 906 | 1327387 | oui |
| assets/resonance/candidates/continuation_20261124_f/costume_hecu_gasmask_hl1_guard_left_f.png | 1199 × 1312 | 771790 | oui |
| assets/resonance/candidates/continuation_20261124_f/costume_nova_guard_hl2_guard_left_f.png | 1074 × 1465 | 1133144 | oui |
| assets/resonance/candidates/continuation_20261124_f/costume_shotgun_soldier_ep2_guard_left_f.png | 988 × 1591 | 1121428 | oui |
| assets/resonance/candidates/continuation_20261124_f/dropship_container_hl2_hover_right_f.png | 2172 × 724 | 1705070 | oui |
| assets/resonance/candidates/continuation_20261124_f/gina_decay_guard_f.png | 1024 × 1536 | 1400677 | oui |
| assets/resonance/candidates/continuation_20261124_f/grigori_hl2_guard_f.png | 1091 × 1441 | 1058047 | oui |
| assets/resonance/candidates/continuation_20261124_f/gunship_hl2_hover_left_f.png | 2172 × 724 | 1442668 | oui |
| assets/resonance/candidates/continuation_20261124_f/houndeye_hl1_idle_left_f.png | 1254 × 1254 | 1553107 | oui |
| assets/resonance/candidates/continuation_20261124_f/hunter_chopper_hl2_hover_left_f.png | 2172 × 724 | 1190079 | oui |
| assets/resonance/candidates/continuation_20261124_f/layer_canals_foreground_f.png | 2172 × 724 | 168160 | oui |
| assets/resonance/candidates/continuation_20261124_f/layer_ravenholm_far_f.png | 2172 × 724 | 604844 | oui |
| assets/resonance/candidates/continuation_20261124_f/layer_ravenholm_foreground_f.png | 2172 × 724 | 211604 | oui |
| assets/resonance/candidates/continuation_20261124_f/layer_ravenholm_mid_f.png | 2172 × 724 | 1234847 | oui |
| assets/resonance/candidates/continuation_20261124_f/layer_ravenholm_near_f.png | 2172 × 724 | 788856 | oui |
| assets/resonance/candidates/continuation_20261124_f/pit_drone_op4_guard_f.png | 1137 × 1383 | 789903 | oui |
| assets/resonance/candidates/continuation_20261124_f/projectile_ar2_ball_f.png | 1254 × 1254 | 1408274 | oui |
| assets/resonance/candidates/continuation_20261124_f/projectile_crossbow_bolt_hl2_f.png | 1254 × 1254 | 111374 | oui |
| assets/resonance/candidates/continuation_20261124_f/projectile_hunter_flechette_f.png | 1254 × 1254 | 138931 | oui |
| assets/resonance/candidates/continuation_20261124_f/projectile_smg1_grenade_hl2_f.png | 1254 × 1254 | 468571 | oui |
| assets/resonance/candidates/continuation_20261124_f/shephard_op4_guard_f.png | 1086 × 1448 | 511778 | oui |
| assets/resonance/candidates/continuation_20261124_f/shock_trooper_op4_guard_f.png | 992 × 1585 | 852892 | oui |
| assets/resonance/candidates/continuation_20261124_f/stage_blastpit_hl1_master_f.png | 2172 × 724 | 2494602 | oui |
| assets/resonance/candidates/continuation_20261124_f/stage_hldm_pool_party_master_f.png | 2172 × 724 | 2542560 | oui |
| assets/resonance/candidates/continuation_20261124_f/stage_hldm_rocket_frenzy_master_f.png | 2172 × 724 | 2882323 | oui |
| assets/resonance/candidates/continuation_20261124_f/stage_lostcoast_monastery_master_f.png | 2172 × 724 | 2513007 | oui |
| assets/resonance/candidates/continuation_20261124_f/stage_nova_courtyard_hl2_master_f.png | 2172 × 724 | 2046546 | oui |
| assets/resonance/candidates/continuation_20261124_f/stage_old_aperture_portal2_master_f.png | 2172 × 724 | 2296317 | oui |
| assets/resonance/candidates/continuation_20261124_f/stage_xen_hl1_master_f.png | 2172 × 724 | 1743588 | oui |
| assets/resonance/candidates/continuation_20261124_h/bosses/gonarch_hl1_idle_h_v2.png | 1536 × 1024 | 1949723 | oui |
| assets/resonance/candidates/continuation_20261124_h/bosses/gonarch_hl1_idle_h.png | 1536 × 1024 | 1746091 | oui |
| assets/resonance/candidates/continuation_20261124_h/bosses/nihilanth_hl1_idle_h.png | 1114 × 1412 | 795228 | oui |
| assets/resonance/candidates/continuation_20261124_h/bosses/tentacle_blastpit_hl1_idle_h.png | 1031 × 1526 | 767824 | oui |
| assets/resonance/candidates/continuation_20261124_h/characters/alien_controller_hl1_hover_h.png | 1183 × 1330 | 1062098 | oui |
| assets/resonance/candidates/continuation_20261124_h/characters/alien_grunt_hl1_idle_h.png | 1229 × 1280 | 1469656 | oui |
| assets/resonance/candidates/continuation_20261124_h/characters/bullsquid_hl1_idle_h.png | 1774 × 887 | 1267390 | oui |
| assets/resonance/candidates/continuation_20261124_h/characters/gonome_op4_idle_h.png | 1199 × 1312 | 1014170 | oui |
| assets/resonance/candidates/continuation_20261124_h/characters/headcrab_hl1_idle_v2_h.png | 1536 × 1024 | 1705935 | oui |
| assets/resonance/candidates/continuation_20261124_h/characters/houndeye_hl1_idle_v2_h.png | 1536 × 1024 | 2067721 | oui |
| assets/resonance/candidates/continuation_20261124_h/characters/manhack_hl2_hover_v2_h.png | 1360 × 1157 | 791066 | oui |
| assets/resonance/candidates/continuation_20261124_h/characters/scientist_slick_hl1_idle_h.png | 1024 × 1536 | 1553287 | oui |
| assets/resonance/candidates/continuation_20261124_h/characters/shock_trooper_op4_idle_h.png | 1024 × 1536 | 1910243 | oui |
| assets/resonance/candidates/continuation_20261124_h/costumes/costume_scientist_einstein_hl1_idle_h.png | 1024 × 1536 | 1583003 | oui |
| assets/resonance/candidates/continuation_20261124_h/costumes/costume_scientist_glasses_hl1_idle_h.png | 1024 × 1536 | 1516753 | oui |
| assets/resonance/candidates/continuation_20261124_h/costumes/costume_scientist_luther_hl1_idle_h.png | 1024 × 1536 | 1535888 | oui |
| assets/resonance/candidates/continuation_20261124_h/costumes/ivan_hl25_multiplayer_idle_h.png | 1024 × 1536 | 1701210 | oui |
| assets/resonance/candidates/continuation_20261124_h/costumes/proto_barney_hl25_multiplayer_idle_h.png | 1024 × 1536 | 1412321 | oui |
| assets/resonance/candidates/continuation_20261124_h/heroes/alyx_hl2_idle_h.png | 1024 × 1536 | 1770075 | oui |
| assets/resonance/candidates/continuation_20261124_h/heroes/barney_hl2_idle_h.png | 1060 × 1484 | 1114409 | oui |
| assets/resonance/candidates/continuation_20261124_h/heroes/breen_hl2_idle_h.png | 784 × 2005 | 1226368 | oui |
| assets/resonance/candidates/continuation_20261124_h/heroes/eli_hl2_idle_h.png | 1024 × 1536 | 1711288 | oui |
| assets/resonance/candidates/continuation_20261124_h/heroes/gordon_hl2_idle_h.png | 1148 × 1370 | 973665 | oui |
| assets/resonance/candidates/continuation_20261124_h/heroes/grigori_hl2_idle_h.png | 1154 × 1363 | 982194 | oui |
| assets/resonance/candidates/continuation_20261124_h/heroes/shephard_op4_idle_h.png | 1199 × 1312 | 793526 | oui |
| assets/resonance/candidates/continuation_20261124_h/heroes/vortigaunt_hl2_idle_h.png | 1234 × 1274 | 1124509 | oui |
| assets/resonance/candidates/continuation_20261124_h/machines/bradley_hl1_idle_h.png | 1774 × 887 | 1124376 | oui |
| assets/resonance/candidates/continuation_20261124_h/machines/osprey_hl1_hover_h.png | 1891 × 832 | 741898 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/fx_hard_light_bridge_portal2_h.png | 2172 × 724 | 262371 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/fx_houndeye_sonic_ring_hl1_h.png | 2172 × 724 | 972735 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/fx_portal_blue_portal1_h.png | 1024 × 1536 | 1518362 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/fx_thermal_beam_portal2_h.png | 2172 × 724 | 313047 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/fx_thermal_beam_portal2_v2_h.png | 2172 × 724 | 698290 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/fx_vortigaunt_zap_hl1_h.png | 2172 × 724 | 539431 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_ar2_energy_ball_hl2_h.png | 1536 × 1024 | 1180068 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_bullsquid_spit_hl1_h.png | 2172 × 724 | 317782 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_controller_orb_hl1_h.png | 1536 × 1024 | 1024076 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_conversion_gel_portal2_h.png | 1536 × 1024 | 1268223 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_crossbow_bolt_hl1_h.png | 1944 × 809 | 413662 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_crossbow_bolt_hl2_h.png | 2172 × 724 | 550012 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_energy_pellet_portal1_h.png | 1536 × 1024 | 1343524 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_gonarch_mortar_hl1_h.png | 1536 × 1024 | 1119459 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_hand_grenade_hl1_h.png | 1046 × 1504 | 1292290 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_hand_grenade_hl2_h.png | 1124 × 1399 | 1245530 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_helicopter_bomb_hl2_h.png | 1275 × 1233 | 1737714 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_hornet_hl1_h.png | 1973 × 797 | 672200 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_hunter_flechette_ep2_h.png | 2172 × 724 | 291720 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_pit_drone_spine_opfor_h.png | 2172 × 724 | 406021 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_propulsion_gel_portal2_h.png | 1536 × 1024 | 1445064 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_repulsion_gel_portal2_h.png | 1536 × 1024 | 1132618 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_rpg_rocket_hl1_h.png | 1905 × 826 | 911260 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_snark_hl1_h.png | 1312 × 1199 | 578013 | oui |
| assets/resonance/candidates/continuation_20261124_h/projectiles/proj_spore_opfor_h.png | 1372 × 1147 | 1141895 | oui |
| assets/resonance/candidates/continuation_20261124_h/stages/stage_blastpit_hl1_master_h.png | 2172 × 724 | 2972162 | oui |
| assets/resonance/candidates/continuation_20261124_h/stages/stage_contamination_hl25_master_h.png | 2172 × 724 | 2900782 | oui |
| assets/resonance/candidates/continuation_20261124_h/stages/stage_disposal_hl25_master_h.png | 2172 × 724 | 2631948 | oui |
| assets/resonance/candidates/continuation_20261124_h/stages/stage_double_cross_hl25_master_h.png | 2172 × 724 | 2251280 | oui |
| assets/resonance/candidates/continuation_20261124_h/stages/stage_lambda_hl1_master_h.png | 2172 × 724 | 2694099 | oui |
| assets/resonance/candidates/continuation_20261124_h/stages/stage_pool_party_hl25_master_h.png | 2172 × 724 | 2631944 | oui |
| assets/resonance/candidates/continuation_20261124_h/stages/stage_rocket_frenzy_hl25_master_h.png | 2172 × 724 | 2724529 | oui |
| assets/resonance/candidates/continuation_20261124_h/stages/stage_rust_mill_hl25_master_h.png | 2172 × 724 | 2341168 | oui |
| assets/resonance/candidates/continuation_20261124_h/stages/stage_xen_dm_hl25_master_h.png | 2172 × 724 | 2402580 | oui |
| assets/resonance/candidates/continuation_20261124_h/stages/stage_xen_hl1_master_h.png | 2172 × 724 | 1879837 | oui |
| assets/resonance/candidates/continuation_20261124_i/bosses/gene_worm_op4_idle_i.png | 1506 × 1045 | 1848219 | oui |
| assets/resonance/candidates/continuation_20261124_i/bosses/pit_worm_op4_idle_i.png | 1064 × 1478 | 1427445 | oui |
| assets/resonance/candidates/continuation_20261124_i/characters/civil_protection_hl2_guard_i.png | 1039 × 1514 | 998525 | oui |
| assets/resonance/candidates/continuation_20261124_i/costumes/costume_gman_hl1_idle_i.png | 1024 × 1536 | 1263090 | oui |
| assets/resonance/candidates/continuation_20261124_i/effects/fx_gauss_primary_hl1_i.png | 2172 × 724 | 182623 | oui |
| assets/resonance/candidates/continuation_20261124_i/effects/fx_portal_orange_active_rim_portal1_i.png | 1024 × 1536 | 1692184 | oui |
| assets/resonance/candidates/continuation_20261124_i/machines/city_scanner_hl2_idle_i.png | 1254 × 1254 | 1700926 | oui |
| assets/resonance/candidates/continuation_20261124_i/machines/rollermine_hl2_active_i.png | 1254 × 1254 | 1831779 | oui |
| assets/resonance/candidates/continuation_20261124_i/stages/stage_black_mesa_east_hl2_master_i.png | 1672 × 941 | 3086279 | oui |
| assets/resonance/candidates/continuation_20261124_i/stages/stage_relaxation_vault_portal1_master_i.png | 1672 × 941 | 2299168 | oui |
| assets/resonance/candidates/continuation_20261124_i/stages/stage_tram_hl1_master_i.png | 1672 × 941 | 2231631 | oui |
| assets/resonance/candidates/continuation_20261124_i/supplement/combine_charger_hla_idle_i.png | 1024 × 1536 | 2248920 | oui |
| assets/resonance/candidates/continuation_20261124_i/supplement/combine_grunt_hla_idle_i.png | 906 × 1736 | 1621197 | oui |
| assets/resonance/candidates/continuation_20261124_i/supplement/combine_suppressor_hla_idle_i.png | 1024 × 1536 | 2091304 | oui |
| assets/resonance/candidates/layer_black_mesa_floor.png | 2172 × 724 | 641901 | oui |
| assets/resonance/candidates/layer_city17_distant_skyline.png | 1774 × 887 | 1545440 | oui |
| assets/resonance/candidates/prop_hev_suit_charger.png | 1024 × 1536 | 2691794 | oui |
| assets/resonance/candidates/stage_black_mesa_testchamber_master.png | 2172 × 724 | 2408365 | oui |
| assets/resonance/candidates/stage_city17_station_master.png | 1774 × 887 | 2803658 | oui |

## Erreurs

Aucune.

## Avertissements

Aucun.

Les empreintes complètes, demandes non produites, valeurs déclarées et éventuels contenus identiques figurent dans `asset_audit.json`.
