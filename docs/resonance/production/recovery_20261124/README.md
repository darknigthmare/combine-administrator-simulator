# Half-Life Resonance — récupération des lots F et H

Date : **24 novembre 2026**. Ce rapport décrit le point de contrôle **avant le nouveau lot I**.

**94 PNG historiques supplémentaires sont récupérés sans modification des pixels : 31 du lot F et 63 du lot H.** Avec les 39 PNG déjà présents dans `master` au commit `b7f7eb8d469d0e336579c32401afeeb6761c81e9`, le registre contient **133 PNG**, **155 demandes** et **22 refus**. La récupération ne crée pas de nouvelles images et ne certifie pas leur fidélité 1:1.

## Comptes du point de contrôle

| Ensemble | Demandes | PNG présents | Refus sans fichier |
|---|---:|---:|---:|
| Base déjà publiée | 51 | 39 | 12 |
| Lot F complet | 36 | 31 | 5 |
| Lot H complet | 68 | 63 | 5 |
| **Total avant I** | **155** | **133** | **22** |

Les 133 PNG ont tous des contenus distincts d’après leur SHA-256. Les treize itérations générées puis non retenues restent décrites séparément; elles ne sont pas ajoutées au total des fichiers livrés. Le total historique des appels recensés, en incluant ces itérations, est 168.

## Portée consolidée du catalogue

Les deux catalogues locaux de projectiles ne sont pas additionnés comme s’ils désignaient des éléments tous différents. Après rapprochement, le périmètre actif contient **259 cibles**, dont **100 avec un fichier candidat associé** et **159 sans fichier directement associé**.

| Catégorie | Cibles | Avec fichier associé | Sans fichier associé |
|---|---:|---:|---:|
| Personnages et créatures | 86 | 30 | 56 |
| Costumes | 18 | 10 | 8 |
| Machines et boss | 28 | 16 | 12 |
| Stages | 50 | 19 | 31 |
| Projectiles, dispositifs et effets | 66 | 25 | 41 |
| Archives documentées | 11 | 0 | 11 |

Les costumes gardent une association propre : une image du personnage parent ne les complète pas automatiquement. La référence de corps du Snark lancé est conservée pour la créature, mais n’est pas comptée comme une pose idle du personnage. Les archives restent désactivées.

## Récupération du lot F

Les 31 PNG F comprennent des personnages, trois costumes, cinq machines/boss, sept maîtres de stage, quatre projectiles et cinq couches de décor. Le lot apporte notamment Gina Cross, Pit Drone, les variantes HECU masque à gaz, Nova Prospekt et Shotgun Soldier, APC, Hunter-Chopper, Gunship, Dropship et Antlion Guard. Les images F et H d’un même sujet restent des candidats distincts : leur présence ne crée pas plusieurs personnages.

Les cinq couches F complètent les fichiers candidats des Canaux et de Ravenholm. La revue historique conserve les limites de raccords et le décalage du sol de Ravenholm, estimé à environ 32 px. Six plans candidats ne valent pas six plans validés pour le défilement.

- [Registre F intact](../continuation_20261124_f/generation_register.json)
- [Revue des couches F](../continuation_20261124_f/stage_layer_review.md)
- [Références F](../continuation_20261124_f/source_reference_manifest.json)

## Six PNG et trois refus H retrouvés après son premier checkpoint

Le premier README H et son registre global s’arrêtaient à 57 nouveaux PNG. Les registres partiels et les fichiers présents établissent 63 PNG H au total. Les neuf entrées suivantes sont réintégrées au registre global :

| Entrée | Résultat récupéré |
|---|---|
| Eli Vance HL2 | PNG |
| Spore Opposing Force | PNG |
| Épine Pit Drone | PNG |
| Double Cross | PNG |
| Rust Mill | PNG |
| Xen DM | PNG |
| Judith Mossman HL2 | Refus, aucun PNG |
| Arne Magnusson | Refus, aucun PNG |
| Charge télécommandée HL1 | Refus, aucun PNG |

Les mises à jour tardives de QA de Breen, de la grenade et du carreau HL1 et du Snark sont préservées avec leur provenance. Ce sont les revues consignées lors de la production précédente; elles ne sont pas présentées comme de nouvelles inspections visuelles réalisées pendant cette récupération.

Barney HL2 possède bien un PNG H. Son refus F antérieur reste conservé comme demande séparée. Les refus historiques ne sont ni supprimés ni transformés en réussites.

- [Checkpoint H historique](../continuation_20261124_h/README.md)
- [Registre héros H complet](../continuation_20261124_h/hero_generation.json)
- [Registre projectiles H complet](../continuation_20261124_h/projectile_generation.json)
- [Registre stages H complet](../continuation_20261124_h/stage_generation.json)

## Rapprochement des contrats de projectiles

Le catalogue F contenait 45 groupes avec des identifiants `PRJ_*`. Le catalogue H contenait 62 familles avec des identifiants `proj_*` ou `fx_*` et des états visuels explicites. Les originaux sont conservés dans leurs dossiers de lot.

Le schéma actif reprend H et atteint **66 familles** en conservant quatre contrats F absents : le boîtier de la mine laser, la capsule de headcrabs HL2, les effets du pistolet HL2 et les portails solo Portal 2. Le rayon de la mine reste distinct de son boîtier. Les deux orbes du Controller restent deux variantes explicites d’une famille. Les portails Portal 1 et les palettes solo/coop Portal 2 conservent des variantes séparées.

Les anciennes identités F sont conservées dans `legacy_target_ids` et dans les contrats de provenance. Les sources F sont préfixées pour empêcher les collisions d’identifiants. Le type de tir des tourelles Desk Job reste à vérifier : aucune classification hitscan certaine n’est déduite de la seule page produit.

- [Catalogue actif de 66 familles](../../data/projectile_catalog_20261124.json)
- [Table complète des 45 correspondances F](projectile_catalog_merge.json)
- [Original F](../continuation_20261124_f/projectile_catalog_original.json)
- [Original H](../continuation_20261124_h/projectile_catalog_original.json)

## Vérifications

- Les 94 PNG récupérés ont été décodés et vérifiés avec Pillow; leurs copies sont identiques par SHA-256 aux fichiers d’origine.
- Le validateur de conception réussit avec 133 PNG et conserve les 24 combattants spécifiés, 12 réserves et 24 stages du budget initial.
- Le validateur Boss Battle réussit; quatre rencontres restent jouables dans le prototype existant.
- La synchronisation du catalogue réussit. Seul demeure l’avertissement historique de skyline de Cité 17 sans identifiant de plan.
- L’audit exact du checkpoint base+F+H réussit : 133 fichiers, 155 demandes, 22 refus, aucune erreur ni avertissement. Il a été exécuté sur un instantané isolé des fichiers enregistrés, tandis que le nouveau lot I était en cours de production. Aucun filtre permissif n’a été ajouté à l’auditeur.
- `git diff --check` réussit.

L’audit global doit être relancé une fois le lot I enregistré; les [rapports globaux](../asset_audit.md) et la [liste actuelle des manquants](../MISSING_TARGETS.md) peuvent donc afficher des comptes plus récents que ce checkpoint.

## État de livraison

Aucun PNG F/H n’est modifié, aucun clip d’animation complet n’est déclaré, aucune arène à six plans n’est automatiquement terminée et aucune nouvelle intégration moteur n’est créée. Les deux arrière-plans historiquement intégrés au prototype restent les seuls comptés comme intégrés à ce point de contrôle. Le travail sur les identités, proportions, détourage, orientations et raccords reste tracé dans les revues de chaque lot.

- [Audit immuable du checkpoint](checkpoint_asset_audit.md)
- [Audit JSON du checkpoint](checkpoint_asset_audit.json)
- [Manifeste de récupération avec SHA-256](recovery_manifest.json)
- [Galerie des fichiers récupérés](GALLERY.md)
