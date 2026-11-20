# Audit des fichiers de production — Half Life Resonance

Exécuté le 2026-11-20T15:37:25.176Z. Résultat : **réussi**.

Le comptage porte sur les fichiers présents dans le dépôt au moment du contrôle. Les déclarations des anciennes conversations ne créent aucune entrée ni aucun fichier.

| Mesure | Nombre |
|---|---:|
| actual_png_files | 27 |
| valid_png_headers | 27 |
| distinct_png_contents | 27 |
| requests | 39 |
| generated_requests | 27 |
| generated_requests_with_verified_file | 27 |
| blocked_requests | 12 |
| unproduced_requests | 12 |
| unclassified_requests | 0 |
| requests_with_files | 27 |
| registered_png_files | 27 |
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
