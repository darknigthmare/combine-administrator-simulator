# Lot L — manquants, archives et couches de décors

**15 nouveaux PNG : 10 cibles jusque-là sans fichier reçoivent un premier candidat, et cinq couches sont ajoutées à l’usine à tourelles de Portal 2.** Les 28 cibles initialement manquantes ont toutes une issue documentée.

[Galerie des PNG](GALLERY.md) · [Revue de chaque cible](TARGET_REVIEW.md) · [Données de revue](target_review.json) · [Inventaire complet](../MISSING_TARGETS.md)

## Nouveaux fichiers

| Groupe L | PNG ajoutés | Cibles avec un premier PNG |
|---|---:|---:|
| Effets GoldSrc / Opposing Force | 4 | 4 |
| Effets Source / Alyx | 2 | 2 |
| Archives documentées | 4 | 4 |
| Couches de l’usine Portal 2 | 5 | 0 |
| **Total L** | **15** | **10** |

**Effets ajoutés :** Impact du crachat Bullsquid, Flash de bouche du pistolet HL2 — capture retail 2008, Arc environnemental du Reviver libre — cage d’ascenseur HLA, Orbe Displacer, Projection Gene Worm, Grenade secondaire MP5.

Les quatre archives Air Exchange, Arctique, Blob et Ice Gun disposent désormais d’une étude candidate. Elles restent distinctes des lieux et personnages commercialisés. Les cinq plans de l’usine complètent les identifiants candidats L1–L6 avec le sol du lot C; le stage conserve des corrections de composition ouvertes.

## Inventaire consolidé

L’inventaire atteint **286 PNG distincts**, **338 entrées**, **36 refus**, **4 erreurs outil** et **12 sorties historiques perdues**. **241 des 259 cibles ont un PNG; 18 restent sans PNG.**

| Catégorie | Cibles | Avec PNG | Sans PNG |
|---|---:|---:|---:|
| Personnages, créatures et petites machines | 86 | 79 | 7 |
| Costumes | 18 | 18 | 0 |
| Boss et grandes machines | 28 | 26 | 2 |
| Stages | 50 | 50 | 0 |
| Projectiles et effets | 66 | 57 | 9 |
| Archives | 11 | 11 | 0 |
| **Total** | **259** | **241** | **18** |

Le lot L comporte **15 appels réels**, 0 nouveau refus et 0 nouvelle erreur outil. Les **11 cibles avec un refus antérieur** n’ont pas été redemandées. Les **7 reports** sont des décisions sans appel; ils ne sont ni des PNG ni de nouveaux refus. Le total historique atteint 347 appels.

Les états d’effets comptent désormais **61 identifiants avec candidat** et **134 sans candidat**. Un fichier — le decal persistant du Bullsquid — reste sans état temporel attribué : il ne couvre ni impact_start ni impact_end. Les décors comptent **21 fichiers de couches**, **19 couples stage/plan identifiés**, **131 plans encore manquants dans les contrats connus**, et **25 stages sans contrat de couches**. Ces comptes de fichiers et d’identifiants ne mesurent pas une validation finale.

## Références et limites par groupe

- [GoldSrc / Opposing Force](goldsrc_reference_review.md) : identité des ressources, version de la démo Uplink lorsqu’elle est utilisée, composants fixes et états restant à documenter.
- [Source / Alyx](source_fx_reference_review.md) : flash du pistolet et arc environnemental du Reviver libre; quatre reports maintenus faute de frame suffisamment précise.
- [Archives](archive_reference_review.md) : concepts, prototypes et repères documentaires, avec les dates et la qualité d’attribution connues.
- [Couches Portal 2](layer_reference_review.md) : séparation générative, composites clair/sombre, comparaison avec le maître et défauts de raccord.

### Archives

Air Exchange est une adaptation d’un concept attribué à Viktor Antonov et publié dans Raising the Bar en 2004; 2004 n’est pas présenté comme la date de création du dessin. Les références Arctique, Blob et Ice Gun ont été rapprochées d’échantillons du documentaire officiel, espacés de dix secondes. Ces repères situent les scènes; ils ne deviennent pas les timecodes exacts des copies haute définition hébergées ailleurs.

Le Blob et la masse de glace ont un fond réellement transparent, mais leur corps généré reste presque opaque. Leur silhouette et leur matière sont des études; la transparence observée dans les prototypes n’est pas reproduite fidèlement. Aucun concept ne devient une apparence finale de Half-Life 3.

### Couches de l’usine

Les cinq nouveaux fichiers conservent le canevas 2172 × 724. La superposition nominale garde la voie de combat, mais simplifie les treillis et perd les détails du puits droit. L5 et L6 contiennent des câbles et de la façade en double : ils doivent être séparés avant un déplacement relatif. Les six identifiants ont un candidat; le décor n’est pas terminé et aucun mouvement de caméra n’est validé.

### Cibles encore sans PNG

Les **18 cibles restantes** sont énumérées dans [la revue du lot](TARGET_REVIEW.md). Les 11 refus antérieurs sont conservés sans nouvel appel. Les reports de référence précisent l’image ou la phase à obtenir. Le missile APC reste lié au modèle de vol RPG déjà refusé; aucun changement de nom ne sert de nouvelle tentative.

## Vérifications

- PNG originaux préservés, signatures et dimensions contrôlées; SHA256 et SHA Git vérifiés.
- Les 271 PNG et les 323 entrées du checkpoint K restent inchangés.
- Registre, catalogues, audit, file de production et revue des 28 cibles réconciliés.
- Validateur design, audit et synchronisation réussis; seul avertissement historique : skyline Cité 17 sans identifiant de plan.
- Les sources applicatives, scripts et dépendances restent identiques à K; les neuf images déjà déclarées dans le prototype restent les seules intégrations.

Les résultats détaillés figurent dans [validation.json](validation.json). Les contrôles CI distants portent sur le commit publié et sont consignés dans la description de la PR. Les tests runtime locaux historiques restent datés dans le lot J; aucune nouvelle validation navigateur n’est revendiquée ici.

**Aucune certification 1:1, animation complète ou arène à six couches n’est déclarée terminée.**
