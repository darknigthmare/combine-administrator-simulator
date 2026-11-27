# Archives — références et contrôle visuel, lot L

**Quatre cibles examinées, quatre PNG candidats produits en quatre appels distincts.** Aucun refus, aucune erreur outil, aucun report de cible dans cette passe. Les quatre images restent non certifiées et non intégrées. Les deux dossiers transparents présentent une limite matérielle majeure décrite ci-dessous.

Le lot reprend les quatre archives encore sans PNG au terme de K. Il complète les preuves de scène et de version ; il ne clôt pas les six portes de validation des [contrats d’archives](../../data/archive_reference_contracts_20261120.json). Les dossiers K restent consultables dans les [stages](../continuation_20261125_k/stage_reference_review.md) et les [machines](../continuation_20261125_k/machine_reference_review.md).

## Résultat par cible

| Cible | Sortie et version retenue | Limite principale |
|---|---|---|
| `archive_air_exchange_hl2` | Panorama du seul concept de réacteur attribué à Viktor Antonov, dans la version publiée par *Raising the Bar* en 2004. | Date de dessin et page imprimée exacte non vérifiées ; sol de combat ajouté. |
| `archive_arctic_ep3` | Panorama du seul concept `HL2Doc_Ep3_Concept05.jpg`, navire sombre contre glacier bleu, correspondant à l’échantillon officiel de 6800 s. | Concept recadré, pas une carte jouable ; seconde exacte d’extraction de la copie non vérifiée. |
| `archive_blob_ep3` | Une étude isolée de l’enveloppe et des formes intérieures visibles du Blob de la démonstration. | Le corps généré reste presque opaque ; transparence et déformation du prototype non reproduites. |
| `archive_icegun_ep3` | Une masse de glace isolée observée dans les tests gris du documentaire. | Matière presque opaque, forme adaptée ; aucune arme finale ni animation créée. |

Les propriétaires sont les quatre identifiants d’archive eux-mêmes, avec `owner_type: support_character`, conformément au rangement des cibles d’extension. Les deux panoramas ont la catégorie `stage_master`, le Blob `archive_character_key_pose`, la glace `archive_effect_key_frame`. Cette catégorie de rangement n’en fait pas une cible jouable.

## Preuves nouvelles et précision temporelle

Le [documentaire officiel Valve](https://www.youtube.com/watch?v=YCjNT9qGjh4) et sa [page de publication officielle](https://www.half-life.com/en/halflife2/20th) sont identifiés. La page publique et la réponse du lecteur ont été récupérées. Les planches officielles 75 et 76 ont été obtenues en HTTP 200, puis inspectées. Leurs empreintes sont identiques à celles enregistrées dans le contrat du 20 novembre.

| Planche | Dimensions et cadence | SHA256 |
|---|---|---|
| 75 | 960 × 540, neuf cases de 320 × 180, un échantillon toutes les 10 s | `c409169b14a125eed5758045a52e53ecc426ea5918a8508dcea5091ce8956005` |
| 76 | 960 × 540, même grille et cadence | `2fff2f65446579aa5f1841156a3cf91fd103fd1c8052456af4a475b715c012f3` |

| Sujet | Repérage vérifié sur les miniatures officielles | Portée du rapprochement |
|---|---|---|
| Arctique | [6800 s — 1:53:20](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6800s), planche 75, case 5 à partir de zéro | Même composition du concept : coque oblique, glace à droite, montants centraux, lumière à gauche. |
| Glace | [6820 à 6850 s — 1:53:40 à 1:54:10](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6820s), échantillons des planches 75–76 | Même environnement de test gris et même famille d’effet. Les copies haute définition montrent des instants distincts des miniatures. |
| Blob | [6900 et 6910 s — 1:55:00 et 1:55:10](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6900s), planche 76 | Même démonstration industrielle, enveloppe translucide, planches, fûts et grille. Les vues de contexte à 6870 et 6880 s sont séparées des poses retenues. |

**Ces valeurs sont des repères d’échantillonnage à dix secondes.** Elles ne sont ni le début exact d’un plan, ni le timecode exact d’extraction des copies du wiki. Aucun visionnage continu, transcription audio, durée de mouvement ou correspondance octet pour octet avec un cadre vidéo natif n’est revendiqué. La tentative de récupération de métadonnées vidéo par le lecteur public a indiqué que seuls des formats image étaient disponibles ; aucun extrait vidéo n’a été téléchargé, et aucun autre client ni moyen de contournement n’a été employé.

## Air Exchange : une version de publication précise

La [fiche du concept](https://combineoverwiki.net/wiki/File:Airex_reactor.jpg) attribue `Airex_reactor.jpg` à Viktor Antonov et à *Half-Life 2: Raising the Bar*. La [copie entière inspectée](https://combineoverwiki.net/images/6/6a/Airex_reactor.jpg) mesure 800 × 517. Valve confirme sur la page anniversaire que l’édition originale du livre est parue en 2004. **2004 est la date de publication retenue ; la date de création du dessin reste inconnue.**

L’image fixe le gros réacteur brun, ses appuis inclinés, les masses industrielles sombres, les petits points cyan et la lumière ocre sur la gauche. Aucun élément des captures de cartes modifiées par des fans n’est utilisé. L’article Air Exchange renvoie à la page 174 pour le sujet en général ; cette page n’a pas été inspectée et son numéro n’est pas présenté comme la localisation prouvée de cette illustration. L’accès au répertoire ValveArchive a renvoyé 403 ; aucune autre requête à cet hébergeur n’a suivi.

Le panorama généré conserve ces grandes formes, mais accentue le contraste, les plaques et la lumière orange. Le sol horizontal en dalles est une adaptation de composition explicitement ajoutée. Sa ligne supérieure se situe vers 85,7 % de la hauteur, au lieu des 79 % demandés. Il n’est pas une géométrie de carte Valve validée.

## Arctique : concept complet inspecté, carte non démontrée

La [fiche `HL2Doc_Ep3_Concept05.jpg`](https://combineoverwiki.net/wiki/File:HL2Doc_Ep3_Concept05.jpg) et la [copie 2669 × 1674](https://combineoverwiki.net/images/4/46/HL2Doc_Ep3_Concept05.jpg) ont été récupérées en HTTP 200. Le contenu visible du concept correspond à la case officielle de 6800 s ; la copie est recadrée sur l’illustration et n’est pas le cadre vidéo entier. La signature est visible. Le wiki la transcrit « GBabbar 08.17.05 » et attribue l’image à Gautam Babbar : ces deux informations demeurent identifiées comme métadonnées secondaires, séparées du constat visuel.

Le candidat utilise cette seule illustration. Aucun concept de 6810 ou 6920 s, aucune version Borealis de 2002 et aucun décor de test Ice Gun ne sont fusionnés. La bande de neige du premier plan est une adaptation au combat latéral ; sa limite supérieure est vers 83,5 % de la hauteur. Coque, câbles, falaises et détails de glace sont réinterprétés. La seule sélection pour revue n’établit ni une carte jouable, ni une apparence finale de Half-Life 3, ni six plans de parallaxe.

## Blob et glace : matière encore à corriger

Les quatre copies de cadres du documentaire examinées dans K ont été réinspectées : [Blob proche](https://combineoverwiki.net/wiki/File:BlobCinderNom.jpg), [Blob près de la grille](https://combineoverwiki.net/wiki/File:BlobGratePass.jpg), [formation de glace](https://combineoverwiki.net/wiki/File:IceGunInAction.jpg) et [glace devant les marches](https://combineoverwiki.net/wiki/File:IceGunRamp.jpg). Elles mesurent 3840 × 2160 et conservent leur interface source. Ce sont des copies de publication hébergées par le wiki ; la résolution native du jeu filmé et leur instant exact d’extraction ne sont pas établis.

Le Blob généré montre une enveloppe ambrée arrondie et des formes intérieures rouges/sombres diffuses, sans visage, yeux, membres ni modèle Headcrab. Il ne livre pas une déformation, une absorption ou un passage de grille animé. La glace forme un seul obstacle bleu pâle aux sommets arrondis et aux fissures claires, sans fusil, rayon ni soldat. Sa base, son relief et sa présentation frontale sont adaptés ; aucune croissance, fonte, collision ou durée de gel n’est mesurée.

Les deux PNG RGBA ont été composés sur noir et blanc pour inspection, sans modifier les fichiers livrés. Leur fond est transparent, mais l’intérieur masque presque entièrement les deux fonds :

| Mesure | Blob | Masse de glace |
|---|---:|---:|
| Alpha central | 253 / 255 | 252 / 255 |
| Alpha médian des pixels du corps ayant alpha > 8 | 253 / 255 | 253 / 255 |
| Alpha moyen dans cette même zone | 251,763 / 255 | 251,135 / 255 |
| Pixels de résidus alpha entre 1 et 8 | 11 254 | 26 096 |

**La transparence matérielle du prototype n’est donc pas reproduite.** Les reflets et formes intérieures donnent un aspect translucide peint, qui ne suffit pas à reproduire la visibilité du décor à travers la matière. Les candidats sont conservés pour leur silhouette et leur matière à revoir ; ils ne sont pas prêts pour intégration. Les petits résidus colorés suggérés par l’aperçu RGB brut ne deviennent pas de grands halos sur les compositions alpha. Leurs empreintes restent celles des originaux.

## Fichiers et préservation

| Fichier candidat | Dimensions | Mode | Octets | SHA Git |
|---|---:|---|---:|---|
| `archive_air_exchange_hl2_concept_rtb2004_master_l.png` | 1672 × 941 | RGB | 1,871,736 | `b5dc72983114ea0df72b7e25698ff0189357ce20` |
| `archive_arctic_ep3_concept05_master_l.png` | 1672 × 941 | RGB | 2,148,810 | `4dfab80a02b02ac5d24ab2c3f4cd8998a1d9d0cd` |
| `archive_blob_ep3_envelope_pose_l.png` | 1448 × 1086 | RGBA | 1,443,047 | `9ae04b4e005891a7323652b4fa552e5ddfed907b` |
| `archive_icegun_ep3_ice_mass_l.png` | 1774 × 887 | RGBA | 1,552,826 | `92fd1574c8f2ef7e41bfbc153fab4e990195c2fe` |

Chaque résultat a été conservé immédiatement en mémoire de session, téléversé tel quel en blob GitHub, puis vérifié par le calcul de l’empreinte Git avant copie dans le dépôt. Les quatre signatures PNG, dimensions, tailles, SHA256 et SHA Git concordent. Les octets, dimensions et canaux alpha originaux sont préservés. Total : **7 016 419 octets**. Les aperçus de contrôle restent séparés des livrables.

Le [registre détaillé](archive_generation.json) conserve les prompts exacts, les URL et empreintes des références, les constats de sortie et les limites d’acquisition. Les quatre cibles ont une issue « candidat généré », avec `selected_for_next_review: true`. `certified_one_to_one`, `integrated_in_game`, `runtime_enabled`, `animation_clip_complete`, `visual_state_complete`, `completed_six_layer_stage` et `target_completed` restent à `false`. Aucune modification du moteur, des registres globaux, d’un commit ou d’une référence Git n’a été effectuée par ce sous-travail.
