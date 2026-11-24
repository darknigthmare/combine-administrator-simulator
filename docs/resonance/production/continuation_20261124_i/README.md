# Half-Life Resonance — reprise, récupération F/H et nouveau lot I

> Instantané historique du lot I, antérieur au lot J. [État courant et poursuite](../continuation_20261124_j/README.md).

24 novembre 2026. **108 PNG ajoutés à la branche principale proposée : 94 récupérés et 14 nouvellement générés.** Le dépôt compte désormais **147 PNG distincts enregistrés**, issus de 172 demandes retenues au journal, dont 25 refus sans fichier. Les 13 itérations générées puis non retenues restent tracées séparément.

## Résultat du nouveau lot I

**17 demandes : 14 PNG, 3 refus.** Chaque fichier conserve les octets retournés par Imagegen, sans retouche ni redimensionnement. Les personnages, petites machines, boss, costume et effets sont individuels avec alpha ; les trois stages sont des panoramas opaques.

| Sujet | Cible | Dimensions | Fichier |
|---|---|---:|---|
| Rollermine HL2 — état déployé | `rollermine_hl2` | 1254 × 1254 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/machines/rollermine_hl2_active_i.png) |
| City Scanner HL2 | `city_scanner_hl2` | 1254 × 1254 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/machines/city_scanner_hl2_idle_i.png) |
| Pit Worm — partie émergée | `pit_worm_op4` | 1064 × 1478 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/bosses/pit_worm_op4_idle_i.png) |
| Gene Worm — partie émergée | `gene_worm_op4` | 1506 × 1045 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/bosses/gene_worm_op4_idle_i.png) |
| G-Man — costume Half-Life original | `costume_gman_hl1` | 1024 × 1536 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/costumes/costume_gman_hl1_idle_i.png) |
| Protection Civile — garde au bâton | `civil_protection_hl2` | 1039 × 1514 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/characters/civil_protection_hl2_guard_i.png) |
| Combine Grunt — Alyx | `combine_grunt_hla` | 906 × 1736 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/supplement/combine_grunt_hla_idle_i.png) |
| Combine Charger — Alyx | `combine_charger_hla` | 1024 × 1536 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/supplement/combine_charger_hla_idle_i.png) |
| Combine Suppressor — Alyx | `combine_suppressor_hla` | 1024 × 1536 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/supplement/combine_suppressor_hla_idle_i.png) |
| Terminus du tram de Black Mesa | `STG_01_HL1_TRAM` | 1672 × 941 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/stages/stage_tram_hl1_master_i.png) |
| Cour de Black Mesa East | `STG_13_HL2_BME` | 1672 × 941 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/stages/stage_black_mesa_east_hl2_master_i.png) |
| Relaxation Vault — Portal | `STG_EXT_PORTAL1_RELAXATION` | 1672 × 941 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/stages/stage_relaxation_vault_portal1_master_i.png) |
| Rayon primaire Tau/Gauss — Half-Life | `fx_gauss_beam_hl1` | 2172 × 724 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/effects/fx_gauss_primary_hl1_i.png) |
| Portail orange actif — Portal | `fx_portal_orange_portal1` | 1024 × 1536 | [PNG](../../../../assets/resonance/candidates/continuation_20261124_i/effects/fx_portal_orange_active_rim_portal1_i.png) |

Les 14 fichiers couvrent 14 cibles encore sans image après la récupération F/H. Le costume G-Man Half-Life a sa propre association, sans valider automatiquement l’apparence HL2. La Protection Civile est une réserve distincte du costume masqué de Barney.

## Récupération des travaux précédents

[Le rapport de récupération](../recovery_20261124/README.md) et [sa galerie de 94 PNG](../recovery_20261124/GALLERY.md) détaillent les lots F (31 PNG) et H (63 PNG). Six PNG H et trois refus tardifs avaient été omis du registre global ; ils sont récupérés depuis les registres partiels. Les deux catalogues de projectiles sont fusionnés sans perdre leurs contrats ni leur provenance ; 45 contrats F sont reliés aux 66 familles actives.

Les 39 PNG déjà présents sur master sont conservés strictement identiques. Aucun des 94 PNG récupérés n’est compté comme une nouvelle génération du lot I.

## Inventaire courant

| Catégorie | Cibles suivies | Avec PNG associé | Sans PNG |
|---|---:|---:|---:|
| Personnages, créatures et petites machines | 86 | 36 | 50 |
| Costumes | 18 | 11 | 7 |
| Machines et boss | 28 | 18 | 10 |
| Stages | 50 | 22 | 28 |
| Projectiles et effets | 66 | 27 | 39 |
| Archives | 11 | 0 | 11 |

**259 cibles : 114 avec fichier associé, 145 sans fichier.** Un fichier associé ne signifie pas qu’un personnage, un stage ou une famille d’effets est terminé. [Liste complète avec état de chaque cible](../MISSING_TARGETS.md) · [JSON de la file](../../data/production_queue.json).

## Fidélité et contrôle visuel

Les références sont attribuées au jeu et à sa version ; les rendus de modèles/captures ont été inspectés avant génération, sauf le rayon Tau primaire, guidé par le contrat du code client Valve (teinte 255/128/0, texture smoke.spr, largeur 1). La texture exacte de ce rayon reste à comparer à une capture retail. Le portail orange repose sur deux captures officielles Steam de Portal 1, distinctes des versions Portal 2.

Les silhouettes et détourages des sprites ont été contrôlés sur fonds clairs et sombres. Les halos suggérés par certains aperçus bruts ne se confirment pas sur la composition alpha des PNG. Les marges sont mesurées : elles ne sont pas toutes égales aux 10–12 % demandés. Le masque du soldat de Protection Civile est orienté vers la droite malgré la consigne gauche ; aucun miroir des insignes n’a été appliqué.

Pit Worm et Gene Worm représentent les portions émergées montrées par les modèles, sans anatomie souterraine inventée. Les trois stages sont des compositions de base adaptées à la vue de combat : le quai HL1 est bas dans le cadre, Black Mesa East et Relaxation Vault conservent un sol en perspective. La ligne de collision et les couches de parallaxe restent à produire/vérifier. Le défaut d’alignement historique du sol de Ravenholm demeure documenté dans F.

**Aucune certification visuelle 1:1 n’est déclarée, aucune animation complète et aucune intégration moteur nouvelle.** Les deux arrière-plans du prototype sont des intégrations historiques, distinctes de ce lot. Les onze archives ne sont pas activées et aucune apparence finale de Half-Life 3 n’est inventée.

## Demandes sans fichier

Les générations de **GLaDOS Portal 1**, **Combine Ordinal Alyx** et **Barney masqué** ont été refusées automatiquement. Les refus sont conservés dans les registres, sans relance ni fichier fictif. Le Shock Bolt Opposing Force est différé faute de référence exacte de sa décharge ; aucun appel n’a été compté pour lui.

## Vérifications

- 147 signatures PNG, dimensions et SHA-256 cohérents ; 147 contenus distincts, aucun fichier non enregistré.
- `validate-resonance-design.mjs` et `validate-resonance-boss-design.mjs` réussis.
- `audit-resonance-production.mjs --write-report` réussi : 0 erreur, 0 avertissement.
- `sync-resonance-production.mjs --write` réussi ; seul avertissement historique : skyline Cité 17 sans `layer_id`.
- Revue indépendante de la récupération : 45 contrats F mappés, 62 familles H conservées, 81 sources conservées, aucun ancien PNG supprimé ou remplacé.

[Galerie du nouveau lot](GALLERY.md) · [Registre du lot I](generation_register.json) · [Registre global](../../data/generated_art_register.json) · [Audit global](../asset_audit.md).
