# Audit des fichiers de production — Half Life Resonance

Exécuté le 2026-11-27T09:18:25.190Z. Résultat : **réussi**.

Le comptage porte sur les fichiers présents dans le dépôt au moment du contrôle. Les déclarations des anciennes conversations ne créent aucune entrée ni aucun fichier.

| Mesure | Nombre |
|---|---:|
| actual_png_files | 327 |
| valid_png_headers | 327 |
| distinct_png_contents | 327 |
| requests | 381 |
| generated_requests | 327 |
| generated_requests_with_verified_file | 327 |
| blocked_requests | 38 |
| tool_error_requests | 4 |
| output_unavailable_requests | 12 |
| unproduced_requests | 42 |
| unclassified_requests | 0 |
| requests_with_files | 327 |
| requests_without_files | 54 |
| registered_png_files | 327 |
| unregistered_png_files | 0 |
| certified_one_to_one_declared | 0 |
| certified_one_to_one_with_verified_file | 0 |
| integrated_in_game_declared | 12 |
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
| assets/resonance/candidates/continuation_20261124_j/characters/barney_blueshift_idle_j.png | 1024 × 1536 | 1481757 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/black_ops_hl1_idle_j.png | 1024 × 1536 | 1331733 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/costume_eli_hla_idle_j.png | 1024 × 1536 | 1754457 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/gordon_hl1_idle_j.png | 1199 × 1312 | 745612 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/griggs_ep2_idle_j.png | 1024 × 1536 | 1839409 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/hecu_engineer_op4_idle_j.png | 887 × 1774 | 1379724 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/hecu_hl1_idle_j.png | 1199 × 1312 | 810129 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/hecu_medic_op4_idle_j.png | 1024 × 1536 | 1883970 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/otis_op4_idle_j.png | 1024 × 1536 | 1782079 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/rosenberg_blueshift_idle_j.png | 1024 × 1536 | 1521743 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/sheckley_ep2_idle_j.png | 1024 × 1536 | 1824802 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/uriah_ep2_idle_framed_j.png | 846 × 1858 | 928634 | oui |
| assets/resonance/candidates/continuation_20261124_j/characters/uriah_ep2_idle_j.png | 925 × 1701 | 1527429 | oui |
| assets/resonance/candidates/continuation_20261124_j/effects/device_tripmine_hl1_body_resumed_j.png | 1697 × 927 | 1722467 | oui |
| assets/resonance/candidates/continuation_20261124_j/effects/fx_excursion_funnel_portal2_normal_resumed_j.png | 2172 × 724 | 1018797 | oui |
| assets/resonance/candidates/continuation_20261124_j/effects/fx_excursion_funnel_portal2_reverse_resumed_j.png | 2172 × 724 | 1048746 | oui |
| assets/resonance/candidates/continuation_20261124_j/effects/fx_gluon_beam_hl1_beam_resumed_j.png | 2172 × 724 | 403286 | oui |
| assets/resonance/candidates/continuation_20261124_j/effects/fx_tripmine_laser_hl1_beam_resumed_j.png | 2172 × 724 | 155931 | oui |
| assets/resonance/candidates/continuation_20261124_j/effects/proj_aperture_bomb_portal2_body_resumed_j.png | 1254 × 1254 | 1944611 | oui |
| assets/resonance/candidates/continuation_20261124_j/effects/proj_bugbait_hl2_body_resumed_j.png | 1319 × 1192 | 1749772 | oui |
| assets/resonance/candidates/continuation_20261124_j/effects/proj_headcrab_canister_hl2_opening_resumed_j.png | 1612 × 976 | 1039733 | oui |
| assets/resonance/candidates/continuation_20261124_j/effects/proj_magnusson_device_ep2_held_resumed_j.png | 1294 × 1216 | 2158418 | oui |
| assets/resonance/candidates/continuation_20261124_j/effects/proj_shock_bolt_opfor_body_resumed_j.png | 1774 × 887 | 266795 | oui |
| assets/resonance/candidates/continuation_20261124_j/machines/baby_voltigore_op4_idle_j.png | 1372 × 1147 | 1176768 | oui |
| assets/resonance/candidates/continuation_20261124_j/machines/barnacle_hl1_idle_j.png | 1024 × 1536 | 1340617 | oui |
| assets/resonance/candidates/continuation_20261124_j/machines/frankenturret_portal2_idle_j.png | 1312 × 1199 | 1122829 | oui |
| assets/resonance/candidates/continuation_20261124_j/machines/guardian_tunnels_ep2_idle_j.png | 1312 × 1199 | 1195118 | oui |
| assets/resonance/candidates/continuation_20261124_j/machines/ichthyosaur_hl1_idle_j.png | 1774 × 887 | 1065194 | oui |
| assets/resonance/candidates/continuation_20261124_j/machines/jeff_hla_idle_j.png | 1254 × 1254 | 1072410 | oui |
| assets/resonance/candidates/continuation_20261124_j/machines/shield_scanner_hl2_idle_j.png | 1466 × 1073 | 2143422 | oui |
| assets/resonance/candidates/continuation_20261124_j/machines/stalker_hl2_idle_j.png | 1024 × 1536 | 1587437 | oui |
| assets/resonance/candidates/continuation_20261124_j/machines/voltigore_op4_idle_j.png | 1448 × 1086 | 1373715 | oui |
| assets/resonance/candidates/continuation_20261124_j/recovered/stage_questionable_ethics_hl1_master_h_recovered.png | 2172 × 724 | 2306767 | oui |
| assets/resonance/candidates/continuation_20261124_j/stages/stage_antlion_gallery_ep2_master_j.png | 1672 × 941 | 2302473 | oui |
| assets/resonance/candidates/continuation_20261124_j/stages/stage_balcony_hla_master_j.png | 1672 × 941 | 2993532 | oui |
| assets/resonance/candidates/continuation_20261124_j/stages/stage_citadel_hl2_master_j.png | 1672 × 941 | 2210234 | oui |
| assets/resonance/candidates/continuation_20261124_j/stages/stage_core_ep1_master_j.png | 1672 × 941 | 2560221 | oui |
| assets/resonance/candidates/continuation_20261124_j/stages/stage_freight_blueshift_master_j.png | 1672 × 941 | 3067962 | oui |
| assets/resonance/candidates/continuation_20261124_j/stages/stage_northern_star_hla_master_j.png | 1672 × 941 | 2470980 | oui |
| assets/resonance/candidates/continuation_20261124_j/stages/stage_relaxation_portal2_master_j.png | 1672 × 941 | 2306350 | oui |
| assets/resonance/candidates/continuation_20261124_j/stages/stage_rosenberg_blueshift_master_j.png | 1672 × 941 | 2461416 | oui |
| assets/resonance/candidates/continuation_20261124_j/stages/stage_surface_dam_hl1_master_j_v2.png | 1672 × 941 | 2369551 | oui |
| assets/resonance/candidates/continuation_20261124_j/stages/stage_surface_dam_hl1_master_j.png | 1672 × 941 | 2453788 | oui |
| assets/resonance/candidates/continuation_20261124_j/stages/stage_test17_portal1_master_j.png | 1672 × 941 | 2491973 | oui |
| assets/resonance/candidates/continuation_20261125_k/archive_stages/archive_borealis_hl2_e3_2002_master_k.png | 1672 × 941 | 2121796 | oui |
| assets/resonance/candidates/continuation_20261125_k/archives/archive_alien_assassin_hl2_2002_idle_k.png | 1312 × 1199 | 1036923 | oui |
| assets/resonance/candidates/continuation_20261125_k/archives/archive_cremator_hl2_2002_idle_k.png | 1024 × 1536 | 1835584 | oui |
| assets/resonance/candidates/continuation_20261125_k/archives/archive_kingpin_hl1_idle_k.png | 1061 × 1483 | 1162393 | oui |
| assets/resonance/candidates/continuation_20261125_k/archives/archive_mr_friendly_hl1_idle_k.png | 1317 × 1194 | 1150062 | oui |
| assets/resonance/candidates/continuation_20261125_k/archives/archive_odell_hl2_idle_k.png | 1024 × 1536 | 1675915 | oui |
| assets/resonance/candidates/continuation_20261125_k/archives/hydra_hl2_cut_idle_k.png | 1153 × 1364 | 650783 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/alyx_hla_idle_k.png | 1199 × 1312 | 709998 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/bendy_peti_idle_k.png | 1001 × 1572 | 279161 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/black_ops_male_op4_idle_k.png | 887 × 1774 | 968803 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/combine_ordinal_hla_idle_k.png | 932 × 1688 | 1381760 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/doug_rattmann_labrat_idle_k.png | 1024 × 1536 | 1899272 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/fast_zombie_hl2_idle_k.png | 980 × 1605 | 1518306 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/gary_hla_idle_k.png | 1199 × 1312 | 944546 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/kleiner_hl2_idle_k.png | 807 × 1949 | 1381750 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/lamarr_hl2_idle_k.png | 1312 × 1199 | 1061979 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/larry_hla_idle_k.png | 1145 × 1374 | 911243 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/magnusson_ep2_idle_k.png | 778 × 2022 | 1395372 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/mossman_hl2_idle_k.png | 725 × 2170 | 1408828 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/odessa_hl2_idle_k.png | 757 × 2078 | 1552481 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/poison_zombie_hl2_idle_k.png | 1079 × 1457 | 1768188 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/richard_keller_decay_idle_k.png | 1254 × 1254 | 1017356 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/russell_hla_idle_k.png | 1145 × 1374 | 1025329 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/shock_roach_op4_idle_k.png | 1316 × 1195 | 751636 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/simmons_blueshift_idle_k.png | 1002 × 1570 | 880161 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/snark_hl1_idle_k.png | 1312 × 1199 | 768491 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/walter_bennet_blueshift_idle_k.png | 979 × 1606 | 798899 | oui |
| assets/resonance/candidates/continuation_20261125_k/characters/zombie_hl2_idle_k.png | 769 × 2045 | 1829811 | oui |
| assets/resonance/candidates/continuation_20261125_k/costumes/costume_barney_cp_helmet_idle_k.png | 790 × 1989 | 1417318 | oui |
| assets/resonance/candidates/continuation_20261125_k/costumes/costume_colette_headtohead_ps2_idle_k.png | 1024 × 1536 | 1577269 | oui |
| assets/resonance/candidates/continuation_20261125_k/costumes/costume_gman_hla_idle_k.png | 1199 × 1312 | 609726 | oui |
| assets/resonance/candidates/continuation_20261125_k/costumes/costume_mossman_arctic_idle_k.png | 731 × 2152 | 1250088 | oui |
| assets/resonance/candidates/continuation_20261125_k/costumes/skeleton_hl25_multiplayer_idle_k.png | 1199 × 1312 | 471516 | oui |
| assets/resonance/candidates/continuation_20261125_k/costumes/too_much_coffee_man_hl25_multiplayer_idle_k.png | 1199 × 1312 | 516736 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_ar2_tracer_hl2_trace_k.png | 2172 × 724 | 1021749 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_deskjob_turret_tracer_muzzle_k.png | 1536 × 1024 | 1178629 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_gargantua_flame_hl1_flame_sustain_k.png | 2172 × 724 | 810520 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_gargantua_stomp_hl1_ground_wave_particle_k.png | 1278 × 1230 | 542615 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_gunship_tracer_hl2_trace_k.png | 2172 × 724 | 246841 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_pit_worm_beam_opfor_beam_k.png | 2172 × 724 | 413734 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_portals_coop_portal2_atlas_blue_k.png | 1066 × 1476 | 637273 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_portals_coop_portal2_atlas_purple_k.png | 1070 × 1470 | 567108 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_portals_coop_portal2_pbody_red_k.png | 1070 × 1470 | 605098 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_portals_coop_portal2_pbody_yellow_k.png | 1070 × 1470 | 808888 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_portals_solo_portal2_blue_k.png | 1086 × 1448 | 537936 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_portals_solo_portal2_orange_k.png | 1072 × 1467 | 569990 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/fx_strider_tracer_hl2_trace_k.png | 2172 × 724 | 199311 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/proj_combine_grenade_hla_body_k.png | 1374 × 1145 | 2066439 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/proj_nihilanth_energy_hl1_body_k.png | 1288 × 1221 | 1133869 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/proj_nihilanth_teleport_hl1_body_k.png | 1271 × 1238 | 1493874 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/proj_rocket_turret_missile_portal1_body_k.png | 2172 × 724 | 876491 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/proj_voltigore_orb_opfor_charge_k.png | 2172 × 724 | 511541 | oui |
| assets/resonance/candidates/continuation_20261125_k/effects/proj_xen_grenade_hla_body_k.png | 1289 × 1221 | 2184010 | oui |
| assets/resonance/candidates/continuation_20261125_k/machines/adventure_core_portal2_idle_k.png | 1312 × 1199 | 1658372 | oui |
| assets/resonance/candidates/continuation_20261125_k/machines/appliance_turret_deskjob_idle_k.png | 1312 × 1199 | 1565973 | oui |
| assets/resonance/candidates/continuation_20261125_k/machines/defective_turret_portal2_idle_k.png | 1068 × 1473 | 1138193 | oui |
| assets/resonance/candidates/continuation_20261125_k/machines/glados_portal1_idle_k.png | 1124 × 1399 | 1327374 | oui |
| assets/resonance/candidates/continuation_20261125_k/machines/guardian_surface_ep2_idle_k.png | 1312 × 1199 | 1292856 | oui |
| assets/resonance/candidates/continuation_20261125_k/machines/hunter_chopper_ep2_idle_k.png | 1774 × 887 | 1334672 | oui |
| assets/resonance/candidates/continuation_20261125_k/machines/reviver_hla_idle_k.png | 1254 × 1254 | 903457 | oui |
| assets/resonance/candidates/continuation_20261125_k/machines/sentry_turret_portal2_idle_k.png | 1024 × 1536 | 1578273 | oui |
| assets/resonance/candidates/continuation_20261125_k/machines/strider_hl2_idle_k.png | 1086 × 1448 | 576442 | oui |
| assets/resonance/candidates/continuation_20261125_k/machines/strider_hla_idle_k.png | 1457 × 1080 | 660110 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_bs_xen_focal_point_master_k.png | 1672 × 941 | 2630370 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_decay_dormitories_ps2_master_k.png | 1672 × 941 | 2213346 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_decay_gamma_ps2_master_k.png | 1672 × 941 | 2558431 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_deskjob_cave_office_master_k.png | 1672 × 941 | 1906239 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_deskjob_factory_master_k.png | 1672 × 941 | 2262844 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_ep1_evac_platform_master_k.png | 1672 × 941 | 2600075 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_hla_distillery_master_k.png | 1672 × 941 | 2533242 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_hla_quarantine_street_master_k.png | 1672 × 941 | 2392218 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_hla_vault_apartment_master_k.png | 1672 × 941 | 2155080 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_hla_zoo_captivity_master_k.png | 1672 × 941 | 2488179 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_op4_cargo_master_k.png | 1672 × 941 | 2258013 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_op4_gene_worm_chamber_master_k.png | 1672 × 941 | 2877825 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_portal1_maintenance_master_k.png | 1672 × 941 | 2514371 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_portal2_coop_hub_master_k.png | 1672 × 941 | 2227993 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_portal2_human_vault_master_k.png | 1672 × 941 | 2168305 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_portal2_peer_review_chamber4_master_k.png | 1672 × 941 | 2405418 | oui |
| assets/resonance/candidates/continuation_20261125_k/stages/stage_uplink_communications_master_k.png | 1672 × 941 | 2262928 | oui |
| assets/resonance/candidates/continuation_20261125_l/archives/archive_air_exchange_hl2_concept_rtb2004_master_l.png | 1672 × 941 | 1871736 | oui |
| assets/resonance/candidates/continuation_20261125_l/archives/archive_arctic_ep3_concept05_master_l.png | 1672 × 941 | 2148810 | oui |
| assets/resonance/candidates/continuation_20261125_l/archives/archive_blob_ep3_envelope_pose_l.png | 1448 × 1086 | 1443047 | oui |
| assets/resonance/candidates/continuation_20261125_l/archives/archive_icegun_ep3_ice_mass_l.png | 1774 × 887 | 1552826 | oui |
| assets/resonance/candidates/continuation_20261125_l/goldsrc/fx_bullsquid_spit_impact_hl1_impact_decal_spit1_l.png | 1536 × 1024 | 1355347 | oui |
| assets/resonance/candidates/continuation_20261125_l/goldsrc/proj_displacer_orb_opfor_body_resource_study_l.png | 1254 × 1254 | 933764 | oui |
| assets/resonance/candidates/continuation_20261125_l/goldsrc/proj_gene_worm_spit_opfor_cloud_resource_study_l.png | 1254 × 1254 | 523615 | oui |
| assets/resonance/candidates/continuation_20261125_l/goldsrc/proj_mp5_grenade_hl1_body_l.png | 1774 × 887 | 848234 | oui |
| assets/resonance/candidates/continuation_20261125_l/layers/layer_portal2_turret_factory_assembly_line_l.png | 2172 × 724 | 972654 | oui |
| assets/resonance/candidates/continuation_20261125_l/layers/layer_portal2_turret_factory_atmosphere_l.png | 2172 × 724 | 1400304 | oui |
| assets/resonance/candidates/continuation_20261125_l/layers/layer_portal2_turret_factory_distant_trusses_l.png | 2172 × 724 | 384175 | oui |
| assets/resonance/candidates/continuation_20261125_l/layers/layer_portal2_turret_factory_foreground_edge_l.png | 2172 × 724 | 269201 | oui |
| assets/resonance/candidates/continuation_20261125_l/layers/layer_portal2_turret_factory_industrial_walls_l.png | 2172 × 724 | 1213381 | oui |
| assets/resonance/candidates/continuation_20261125_l/source_fx/fx_pistol_fire_hl2_muzzle_l.png | 1536 × 1024 | 1260524 | oui |
| assets/resonance/candidates/continuation_20261125_l/source_fx/fx_reviver_discharge_hla_discharge_l.png | 1199 × 1312 | 315218 | oui |
| assets/resonance/candidates/continuation_20261127_n/characters/grigori_hl2_deselected_n.png | 1091 × 1441 | 1089169 | oui |
| assets/resonance/candidates/continuation_20261127_n/characters/grigori_hl2_selected_n_v2.png | 1091 × 1441 | 779174 | oui |
| assets/resonance/candidates/continuation_20261127_n/characters/grigori_hl2_selected_n.png | 1091 × 1441 | 1053522 | oui |
| assets/resonance/candidates/continuation_20261127_n/characters/grigori_hl2_taunt_n.png | 1091 × 1441 | 1234005 | oui |
| assets/resonance/candidates/continuation_20261127_n/characters/shephard_op4_deselected_n.png | 1086 × 1448 | 734143 | oui |
| assets/resonance/candidates/continuation_20261127_n/characters/shephard_op4_selected_n.png | 1086 × 1448 | 765193 | oui |
| assets/resonance/candidates/continuation_20261127_n/characters/shephard_op4_taunt_n.png | 1086 × 1448 | 867501 | oui |
| assets/resonance/candidates/continuation_20261127_o/characters/colette_decay_deselected_o.png | 1060 × 1484 | 812145 | oui |
| assets/resonance/candidates/continuation_20261127_o/characters/colette_decay_guard_o.png | 1060 × 1484 | 810263 | oui |
| assets/resonance/candidates/continuation_20261127_o/characters/colette_decay_selected_o.png | 1024 × 1536 | 1638671 | oui |
| assets/resonance/candidates/continuation_20261127_o/characters/colette_decay_taunt_o.png | 1060 × 1484 | 904116 | oui |
| assets/resonance/candidates/continuation_20261127_o/characters/gina_decay_deselected_o_v2.png | 1024 × 1536 | 1669142 | oui |
| assets/resonance/candidates/continuation_20261127_o/characters/gina_decay_deselected_o.png | 1024 × 1536 | 1647969 | oui |
| assets/resonance/candidates/continuation_20261127_o/characters/gina_decay_selected_o.png | 1024 × 1536 | 1648341 | oui |
| assets/resonance/candidates/continuation_20261127_o/characters/gina_decay_taunt_o.png | 1024 × 1536 | 1742214 | oui |
| assets/resonance/candidates/continuation_20261127_o/fx/fx_gauss_beam_hl1_charged_o.png | 2172 × 724 | 626649 | oui |
| assets/resonance/candidates/continuation_20261127_o/fx/fx_gauss_beam_hl1_charged_v2_o.png | 2172 × 724 | 338760 | oui |
| assets/resonance/candidates/continuation_20261127_o/fx/fx_gauss_beam_hl1_impact_hotglow_o.png | 1254 × 1254 | 575750 | oui |
| assets/resonance/candidates/continuation_20261127_o/fx/fx_gluon_beam_hl1_fade_flare_o.png | 1254 × 1254 | 549752 | oui |
| assets/resonance/candidates/continuation_20261127_o/fx/fx_gluon_beam_hl1_tip_xspark1_o.png | 1254 × 1254 | 147863 | oui |
| assets/resonance/candidates/continuation_20261127_o/fx/fx_houndeye_sonic_ring_hl1_pack2_o.png | 2172 × 724 | 1367514 | oui |
| assets/resonance/candidates/continuation_20261127_o/fx/fx_houndeye_sonic_ring_hl1_pack4_o.png | 2172 × 724 | 1224043 | oui |
| assets/resonance/candidates/continuation_20261127_o/fx/fx_houndeye_sonic_ring_hl1_pack4_v2_o.png | 2172 × 724 | 1130987 | oui |
| assets/resonance/candidates/continuation_20261127_o/fx/fx_vortigaunt_zap_episodic_beam_o.png | 1774 × 887 | 237235 | oui |
| assets/resonance/candidates/continuation_20261127_o/layers/layer_contamination_hl25_buildings_o.png | 2172 × 724 | 1813039 | oui |
| assets/resonance/candidates/continuation_20261127_o/layers/layer_contamination_hl25_canyon_o.png | 2172 × 724 | 834007 | oui |
| assets/resonance/candidates/continuation_20261127_o/layers/layer_contamination_hl25_catwalks_rails_o.png | 2172 × 724 | 655650 | oui |
| assets/resonance/candidates/continuation_20261127_o/layers/layer_contamination_hl25_catwalks_rails_v2_o.png | 2172 × 724 | 607018 | oui |
| assets/resonance/candidates/continuation_20261127_o/layers/layer_contamination_hl25_floor_o.png | 2172 × 724 | 383036 | oui |
| assets/resonance/candidates/continuation_20261127_o/layers/layer_contamination_hl25_front_edge_o.png | 2172 × 724 | 140532 | oui |
| assets/resonance/candidates/continuation_20261127_o/layers/layer_contamination_hl25_front_edge_v2_o.png | 2172 × 724 | 124514 | oui |
| assets/resonance/candidates/continuation_20261127_o/layers/layer_contamination_hl25_sky_o.png | 2172 × 724 | 1627295 | oui |
| assets/resonance/candidates/continuation_20261127_p/hl1/archive_archer_hl1_legacy_swim_p.png | 1448 × 1086 | 674500 | oui |
| assets/resonance/candidates/continuation_20261127_p/hl1/archive_panther_eye_hl1_alpha_blue_pose_p.png | 1254 × 1254 | 1763646 | oui |
| assets/resonance/candidates/continuation_20261127_p/hl1/archive_panther_eye_hl1_alpha_blue_pose_v2_p.png | 1254 × 1254 | 939270 | oui |
| assets/resonance/candidates/continuation_20261127_p/hl1/archive_panther_eye_hl1_red_diablo_idle_p.png | 1448 × 1086 | 1370938 | oui |
| assets/resonance/candidates/continuation_20261127_p/hl2/archive_bullsquid_hl2_cut_idle_p.png | 1668 × 943 | 1156245 | oui |
| assets/resonance/candidates/continuation_20261127_p/hl2/archive_combine_assassin_hl2_guard_p.png | 1026 × 1532 | 1086559 | oui |
| assets/resonance/candidates/continuation_20261127_p/hl2/archive_combine_guard_synth_hl2_guard_p.png | 952 × 1652 | 1548452 | oui |
| assets/resonance/candidates/continuation_20261127_p/hl2/archive_houndeye_hl2_cut_front_p.png | 1060 × 1484 | 879084 | oui |
| assets/resonance/candidates/continuation_20261127_p/weapons/archive_combine_guard_gun_hl2_untextured_p.png | 1960 × 802 | 1293543 | oui |
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
