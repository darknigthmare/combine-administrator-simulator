# Archives — contrats de référence et de production, lot E

**20 novembre 2026 — documentation uniquement.** Ce chapitre approfondit huit des onze archives déjà présentes dans Resonance et inscrit les trois autres dans un suivi de recherche précis. Il ne crée aucune cible, aucun personnage jouable et aucun boss supplémentaire. Les onze cibles conservent `runtime_enabled=false` et `certified_one_to_one=false`.

Le livrable exploitable est le [contrat JSON](../data/archive_reference_contracts_20261120.json). Il complète le [catalogue d’extension](../data/catalogue_extension_20261120.json), la [file de production](../data/production_queue.json) et le [catalogue de rencontres](../data/boss_battle_catalog.json). Les noms de captures, dossiers et sorties ci-dessous sont des **demandes de production** ; aucun de ces fichiers n’est déclaré créé.

## 1. Périmètre et niveau de preuve

Une archive exige deux décisions distinctes : identifier le document, puis déterminer ce que ce document permet réellement de dessiner. Une vidéo officielle peut montrer un ancien modèle sans en donner le nom ; un wiki peut aider à identifier ce modèle sans transformer son interprétation en déclaration Valve. De même, un fichier public du SDK atteste le code à une révision précise, sans démontrer que le modèle montré dans une vidéo utilise exactement cette révision.

La recherche a commencé par les publications officielles Valve, les métadonnées des vidéos qu’elles diffusent et le dépôt officiel `ValveSoftware/source-sdk-2013`. Les sources secondaires servent à localiser et nommer les objets. Les données provenant de fuites ne sont pas incorporées comme comportement officiel ; aucun build divulgué n’a été téléchargé ou exécuté.

| Mesure documentaire | Résultat |
| --- | --- |
| Archives existantes lues | 11 |
| Fiches approfondies / dossiers en attente | 8 / 3 |
| Sources primaires / secondaires | 10 / 11 |
| Repères visuels inspectés | 16 |
| Éléments de capture demandés | 48 |
| Sorties individuelles proposées | 41, dont 12 couches pour deux études de lieux |
| Images candidates d’archives présentes au relevé | 0 |
| Captures natives acquises / animations terminées / entrées runtime ajoutées | 0 / 0 / 0 |

Les quatre boss du runtime restent `strider_hl2`, `dropship_hl2`, `gunship_hl2` et `gargantua_hl1`. Les étapes documentaires de l’Hydra ne constituent pas un cinquième combat intégré. Ces comptes concernent les archives de ce chapitre ; ils ne résument pas les images produites ailleurs dans le lot E.

### Ce qui a effectivement été inspecté

Les lecteurs officiels YouTube ont fourni leur titre, la chaîne **Valve**, leur durée et leurs miniatures de repérage. Les images inspectées sont des échantillons espacés de **10 secondes**, en **320 × 180** pour le documentaire et **240 × 180** pour E3 2002. Le JSON enregistre la planche, la case, l’empreinte du fichier consulté et le lien vers le temps correspondant. Le temps est celui d’un échantillon, sans prétendre être le début exact du plan.

Il n’y a eu ni visionnage continu validé, ni transcription audio exploitée, ni capture native haute résolution acquise. Les tentatives de récupération de certains JPEG de galeries secondaires n’ont pas abouti ; leur légende reste une métadonnée secondaire. Les miniatures suffisent à choisir des zones à capturer et à éviter plusieurs confusions de silhouettes. Elles ne suffisent pas pour certifier des doigts, un rig, un nombre de frames, une collision ou une vitesse.

### Versions qu’il faut maintenir distinctes

| Document ou version | Usage retenu | Source |
| --- | --- | --- |
| E3 2002 | Démonstration préparée mais non montrée à l’E3 à l’époque ; publication vidéo officielle ultérieure. Pas de build jouable déclaré livré. | [Valve — Half-Life 2, 20th Anniversary](https://www.half-life.com/en/halflife2/20th) ; [Half Life 2 Anniversary Archive: E3 2002 Demo](https://www.youtube.com/watch?v=8CoMdbnJwvE) |
| E3 2003 | Démo historique et capture officielle distinctes de 2002. Ne pas identifier les vidéos à partir du seul ordre des iframes de la page. | [Valve — Half-Life 2, 20th Anniversary](https://www.half-life.com/en/halflife2/20th) ; [Half Life 2 Anniversary Archive: E3 2003 Demo](https://www.youtube.com/watch?v=CaHtOISsLT4) |
| Hydra / Blob / Assassin du SDK | Conserver commit et modèle déclaré. Un nom d’entité commun ne démontre pas une identité visuelle commune. | [ValveSoftware/source-sdk-2013 — npc_hydra.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_hydra.cpp) ; [ValveSoftware/source-sdk-2013 — npc_blob.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_blob.cpp) ; [ValveSoftware/source-sdk-2013 — npc_assassin.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_assassin.cpp) |
| Concepts et expériences du troisième épisode | Support concept ou test noté plan par plan ; aucune apparence définitive de Half-Life 3 dérivée de ce corpus. | [Half-Life 2: 20th Anniversary Documentary](https://www.youtube.com/watch?v=YCjNT9qGjh4) ; [Valve — Half-Life 2, 20th Anniversary](https://www.half-life.com/en/halflife2/20th) |
| Contenus anniversaire explicitement livrés | Uplink, skins HL1 restaurés et intégration des Episodes/Lost Coast relèvent des annonces de versions publiées. Aucun de ces exemples ne valide les onze archives. | [Valve — Half-Life, 25th Anniversary](https://www.half-life.com/en/halflife/25th) ; [Valve — Half-Life 2, 20th Anniversary](https://www.half-life.com/en/halflife2/20th) |
| Raising the Bar | La page officielle est une piste vers une publication ; aucune page du livre ni disponibilité actuelle n’est revendiquée comme vérifiée ici. | [Valve — Half-Life 2, 20th Anniversary](https://www.half-life.com/en/halflife2/20th) |

Le titre exact des vidéos a été vérifié dans leurs métadonnées : **E3 2002 = `8CoMdbnJwvE`**, **E3 2003 = `CaHtOISsLT4`** et **documentaire = `YCjNT9qGjh4`**. L’ordre des iframes dans une extraction de page n’est pas utilisé pour les attribuer. Une capture directe publiée en 2024 ne signifie pas que le build ancien a été distribué au public.

## 2. Fiches de référence

Dans chaque fiche, « observé » désigne seulement l’image inspectée. « Rapporté » désigne l’apport secondaire à vérifier. Toutes les propositions d’animation, de calques et d’interaction sont des adaptations Resonance à produire ultérieurement. Les dégâts, points de vie et données à 60 Hz restent indéfinis : leur donner des valeurs maintenant fabriquerait une précision sans référence ni prototype.


### 2.1. Hydra des versions abandonnées — `hydra_hl2_cut`

**Version retenue.** Démonstration E3 2002 publiée par Valve ; détail anatomique à verrouiller avec une capture native. Le code SDK constitue un dossier technique distinct, figé au commit indiqué.

**État de preuve.** Identité de code primaire ; apparence primaire repérée à distance ; continuité code/modèle/film non démontrée.

**Base documentaire.** Le SDK publié contient une entité Hydra et un modèle nommé Hydra.mdl. Le client calcule la pose le long d’une spline. La référence filmée choisie est le repère E3 2002 ; le dossier ne le remplace pas par un montage de fans comprenant des plans supplémentaires. Sources : [Half Life 2 Anniversary Archive: E3 2002 Demo](https://www.youtube.com/watch?v=8CoMdbnJwvE) ; [ValveSoftware/source-sdk-2013 — npc_hydra.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_hydra.cpp) ; [ValveSoftware/source-sdk-2013 — npc_hydra.h](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_hydra.h) ; [ValveSoftware/source-sdk-2013 — c_npc_hydra.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/client/hl2/c_npc_hydra.cpp) ; [Combine OverWiki — Hydra](https://combineoverwiki.net/wiki/Hydra).

| Repère inspecté | Observation | Limite |
| --- | --- | --- |
| [20:20](https://www.youtube.com/watch?v=8CoMdbnJwvE&t=1220s) | Dans un égout sombre, une forme étroite cyan et translucide est visible à distance. | Attribution Hydra croisée avec le catalogue, le SDK et la référence secondaire ; nombre et forme détaillée des extrémités non résolus par cette miniature. |

**Invariants visuels utilisables.** Forme cyan et translucide dans le plan inspecté ; fond sombre nécessaire pour lire sa présence. Le volume étroit et souple doit rester distinct du Tentacle de Half-Life ; aucun corps humanoïde ajouté.

**Détails rapportés, encore à vérifier.** La source secondaire décrit plusieurs tentacules et extrémités différentes ; leur nombre exact reste à confirmer sur la révision filmée retenue.

**Preuves absentes.** Aucun gros plan natif, dos ou échelle mesurée acquis. Aucun combat complet livré servant de référence, aucune vulnérabilité finale, aucun timing de frappe validé. La correspondance entre le code SDK actuel et le binaire de la démonstration 2002 n’est pas établie.

**Mélanges à éviter.**

- Ne pas fusionner les plans E3 2002 et 2003 sans marquer leur version.
- Ne pas transférer les réactions au son, le bec ou le combat du Tentacle.
- Ne pas transformer les étapes Références / Prototype isolé / Validation du catalogue en trois phases de boss canoniques.

**Dossier de captures requis.** Dossier proposé : `references/resonance/archives/hydra_hl2_cut/`.

| Fichier demandé | Vérification attendue |
| --- | --- |
| `context_e3_2002_1220.png` | Conserver un cadre natif complet autour du repère 20:20, avec les repères du décor. |
| `silhouette_same_revision.png` | Choisir le plan le moins occulté ; relever chaque extrémité réellement visible. |
| `material_same_revision.png` | Comparer bords, cœur translucide et lumière ambiante sans supprimer le fond source. |
| `motion_window_same_revision.mp4` | Relever émergence, courbure et éventuelle attaque dans une séquence continue ; noter ce qui n’apparaît pas. |
| `scale_same_frame.png` | Mesurer uniquement une proportion par rapport à un personnage ou élément visible dans le même plan. |
| `provenance.json` | URL, temps exact, format natif, empreinte, version et limites ; joindre le commit séparé pour les observations de code. |

**Sorties individuelles proposées.** Dossier proposé : `assets/resonance/candidates/archives/hydra_hl2_cut/`. Tous les fichiers ci-dessous restent au plan.

| Sortie proposée | Condition de production |
| --- | --- |
| `identity_candidate.png` | Un sujet complet sur transparence ; nombre d’appendices déterminé seulement après verrou anatomique. |
| `curve_rest_000.png` | Pose de repos originale 2D gardant le volume interne lisible. |
| `curve_anticipation_000.png` | Pose de préparation hypothétique, séparée de la référence vidéo et étiquetée adaptation. |
| `curve_extension_000.png` | Extension sans section détachée inventée ; portée uniquement lors d’un prototype ultérieur. |
| `curve_retract_000.png` | Repli vers l’ancrage ; pas de mort canonique fabriquée. |

**Compatibilité du catalogue Hydra.** `BBA_HYDRA_HL2_CUT` reste son identifiant documentaire, sans `base_stage_id`. Les intitulés **Références → Prototype isolé → Validation** décrivent un travail de recherche et de conception. Ils ne sont ni des phases attestées, ni une victoire débloquée dans le Boss Rush.

**Idée originale Resonance, facultative et non intégrée.** Laboratoire d’esquive : une courbe s’arme vers une zone annoncée, puis traverse cette zone et se retire. La sortie dépendrait d’un passage ouvert, sans supposer que l’Hydra puisse être tuée. Cette idée ne décrit aucune rencontre Valve.

**Décision de production.** Recherche primaire partiellement acquise. Autoriser le relevé et les annotations ; retenir toute génération fidèle tant que les extrémités restent indéterminées.


### 2.2. Cremator — révision HL2 2002 — `archive_cremator_hl2_2002`

**Version retenue.** Silhouette ancienne montrée à environ 12:50 dans le documentaire officiel ; attribution au build 2002 rapportée par la légende secondaire. L’appartenance à la vidéo autonome E3 2002 n’est pas prouvée.

**État de preuve.** Publication visuelle primaire ; identification et année corroborées secondairement ; gros plans et build précis encore requis.

**Base documentaire.** Le plan officiel inspecté montre une silhouette en tenue longue dans une rue. La légende secondaire date ce matériel de 2002. Le verrou du catalogue mentionne une démonstration 2002 ; il reste ouvert tant que la provenance exacte de ce plan n’a pas été établie. Sources : [Half-Life 2: 20th Anniversary Documentary](https://www.youtube.com/watch?v=YCjNT9qGjh4) ; [Combine OverWiki — Cremator](https://combineoverwiki.net/wiki/Cremator) ; [Combine OverWiki — légende 2002 Cremator 01](https://combineoverwiki.net/wiki/File:2002_Cremator_01.jpg).

| Repère inspecté | Observation | Limite |
| --- | --- | --- |
| [12:50](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=770s) | Silhouette haute à vêtement long sombre et petite tête claire, dans une rue verdâtre. | Identification Cremator et date 2002 appuyées par la légende secondaire ; tuyau, doigts et arme non certifiés à cette résolution. |

**Invariants visuels utilisables.** Silhouette haute, manteau sombre allongé, petite tête claire ; conserver ces rapports au lieu d’un soldat standard en armure.

**Détails rapportés, encore à vérifier.** Col haut, bras longs, gros abdomen, tuyau vers l’arme et doigts sont décrits par la référence secondaire ; ils doivent être visibles sur la même révision avant d’être fixés.

**Preuves absentes.** Aucun gros plan natif de la liaison arme/abdomen ni des mains. Dimensions métriques, couleur exacte du tir et règles de résistance non validées. Aucune preuve de ce lot ne relie le plan à un fichier de map ou à une IA officiellement publiée.

**Mélanges à éviter.**

- Pas de combinaison avec un concept de Half-Life: Alyx.
- Pas de mod moderne utilisé pour finir les parties cachées.
- Pas de tête conservée en laboratoire utilisée comme preuve d’un corps animé retail.
- Pas de propriétés déduites de scripts divulgués présentées comme comportement livré.

**Dossier de captures requis.** Dossier proposé : `references/resonance/archives/archive_cremator_hl2_2002/`.

| Fichier demandé | Vérification attendue |
| --- | --- |
| `context_documentary_0770.png` | Cadre natif complet du personnage dans la rue, avec quelques secondes de contexte avant et après. |
| `full_body_same_revision.png` | Pieds, tête et arme dans un même plan ; mesurer la silhouette sans inventer l’arrière. |
| `head_hands_hose_detail.png` | Détails séparés de la tête, des mains et du raccord d’arme, tous de cette révision. |
| `weapon_state_window.mp4` | Vérifier si le film montre déplacement, armement ou tir ; marquer les états non observés. |
| `relative_scale.png` | Comparer un personnage proche si la perspective le permet ; garder la taille canonique inconnue sinon. |
| `provenance.json` | Séparer date de publication 2024, année de build rapportée 2002 et date précise inconnue ; ne pas écrire E3 sans preuve. |

**Sorties individuelles proposées.** Dossier proposé : `assets/resonance/candidates/archives/archive_cremator_hl2_2002/`. Tous les fichiers ci-dessous restent au plan.

| Sortie proposée | Condition de production |
| --- | --- |
| `identity_candidate.png` | Un personnage intégral et son équipement attesté, fond transparent. |
| `idle_000.png` | Pose originale de repos, taille relative à confirmer. |
| `walk_contact_000.png` | Contact au sol ; ne pas réduire le manteau à une jupe générique. |
| `weapon_ready_000.png` | Pose d’arme seulement après validation du raccord et du côté de port. |
| `effect_candidate_000.png` | Effet isolé à produire uniquement après fixation de la couleur et de la forme de référence. |

**Idée originale Resonance, facultative et non intégrée.** Une adaptation pourrait annoncer un couloir de nettoyage au sol, puis laisser une fenêtre de déplacement. Le type d’effet, les dégâts et un éventuel point faible resteraient des décisions originales ultérieures ; aucun réservoir explosif obligatoire n’est présumé.

**Décision de production.** Contrat de silhouette exploitable pour recherche ; génération d’un modèle fidèle suspendue au plan natif et au contrôle du couple arme/abdomen.


### 2.3. Alien Assassin — révision HL2 2002 — `archive_alien_assassin_hl2_2002`

**Version retenue.** Modèle ancien repéré vers 11:40 dans le documentaire ; le nom Alien Assassin et la révision 2002 sont rapprochés du dossier secondaire. Ne pas confondre avec la classe npc_assassin du SDK actuel.

**État de preuve.** Silhouette primaire visible ; identification secondaire et détails anatomiques incomplets ; contrôle de code négatif explicite.

**Base documentaire.** Le modèle filmé inspecté présente une posture accroupie et des membres allongés. Dans le SDK officiel épinglé, npc_assassin charge fassassin.mdl. Ce fichier n’établit donc pas les capacités de l’Alien Assassin de cette archive. Sources : [Half-Life 2: 20th Anniversary Documentary](https://www.youtube.com/watch?v=YCjNT9qGjh4) ; [Combine OverWiki — Alien Assassin](https://combineoverwiki.net/wiki/Alien_Assassin) ; [ValveSoftware/source-sdk-2013 — npc_assassin.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_assassin.cpp).

| Repère inspecté | Observation | Limite |
| --- | --- | --- |
| [11:40](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=700s) | Humanoïde accroupi, membres allongés, tête portant des accents rouges, dans une pièce de brique. | Rapprochement avec l’Alien Assassin documenté secondairement ; masque, doigts, orteils et datation précise du build restent à confirmer en capture native. |

**Invariants visuels utilisables.** Membres longs et posture ramassée ; accents rouges sur la tête dans l’image de repérage.

**Détails rapportés, encore à vérifier.** Masque respiratoire, griffes, tuyaux et nombre d’orteils sont des détails rapportés à confirmer sur une capture native. La marche sur cordes, fumigènes, pièges et autres équipements décrits secondairement ne sont pas des capacités livrées établies ici.

**Preuves absentes.** Aucun relevé natif fiable des mains, pieds et côtés du masque. Aucune séquence continue d’attaque validée. Aucune correspondance démontrée entre ce modèle et le code de l’assassin féminin du SDK.

**Mélanges à éviter.**

- Pas de Shock Trooper Race X, malgré un alias historique rapporté.
- Pas d’armure et de pistolets du Combine Assassin importés depuis fassassin.mdl.
- Pas de squelette de Fast Zombie adopté comme preuve du modèle source.
- Pas de miroir automatique des mains tant que les asymétries sont inconnues.

**Dossier de captures requis.** Dossier proposé : `references/resonance/archives/archive_alien_assassin_hl2_2002/`.

| Fichier demandé | Vérification attendue |
| --- | --- |
| `context_documentary_0700.png` | Cadre natif complet de la pièce en brique ; conserver la posture entière. |
| `silhouette_front_three_quarter.png` | Choisir les angles réellement montrés ; annoter le dos inconnu. |
| `mask_hands_feet.png` | Relever masque, crêtes, doigts et orteils séparément, avec la même provenance. |
| `locomotion_window.mp4` | Relever les changements d’appui visibles ; aucune cadence déduite de miniatures espacées. |
| `asymmetry_and_scale.png` | Table gauche/droite et proportions dans le même plan ; aucune taille métrique inventée. |
| `provenance.json` | Nom documentaire, attribution secondaire et contrôle npc_assassin/fassassin à trois entrées distinctes. |

**Sorties individuelles proposées.** Dossier proposé : `assets/resonance/candidates/archives/archive_alien_assassin_hl2_2002/`. Tous les fichiers ci-dessous restent au plan.

| Sortie proposée | Condition de production |
| --- | --- |
| `identity_candidate.png` | Corps entier ; silhouette de la révision retenue et non celle d’un autre assassin. |
| `crouch_000.png` | Pose de référence transposée en 2D, sans équipement ajouté. |
| `step_contact_000.png` | Premier appui proposé ; longueur des membres verrouillée avant animation. |
| `turn_000.png` | Vue opposée à dessiner séparément si les détails sont asymétriques. |
| `leap_anticipation_000.png` | Uniquement une adaptation originale éventuelle ; ne constitue pas la restitution d’une animation Valve. |

**Idée originale Resonance, facultative et non intégrée.** Duel de mobilité envisageable : prise d’appui très lisible, bond sur un point annoncé, récupération. Ces trois états sont une proposition originale ; téléportation, invisibilité et gadgets n’en sont pas déduits.

**Décision de production.** Relevé anatomique prioritaire. Aucun kit de tir ou d’invisibilité n’est approuvé par le simple nom assassin.


### 2.4. Odell — `archive_odell_hl2`

**Version retenue.** Odell du chapitre de développement HL2 ; révision de modèle et capture primaire encore à sélectionner. Ne pas certifier la galerie secondaire comme extraction Valve déjà inspectée.

**État de preuve.** Identité documentée secondairement ; aucune vue primaire nominativement verrouillée dans ce lot.

**Base documentaire.** La source secondaire distingue Odell d’Odessa et rapporte une combinaison orange ainsi qu’un modèle de visage réutilisé. Aucun plan de repérage inspecté n’est retenu ici comme preuve suffisante de l’identité visuelle d’Odell. Sources : [Combine OverWiki — Odell](https://combineoverwiki.net/wiki/Odell) ; [Half-Life 2: 20th Anniversary Documentary](https://www.youtube.com/watch?v=YCjNT9qGjh4) ; [Half Life 2 Anniversary Archive: E3 2002 Demo](https://www.youtube.com/watch?v=8CoMdbnJwvE).

**Aucune observation visuelle primaire attribuée à cette cible n’est validée.** Les captures demandées commencent par l’identification du plan.

**Invariants visuels utilisables.** Aucun invariant primaire n’est certifié dans ce lot ; la liste suivante sert uniquement de contrôle de recherche.

**Détails rapportés, encore à vérifier.** Combinaison de survie orange, bonnet sombre, barbe grise et bandage au genou droit : liste de vérification secondaire, pas silhouette certifiée. Le rôle d’ingénieur et les usages d’un chalumeau sont des pistes de scénario de développement, pas un kit de combat livré.

**Preuves absentes.** Capture native officielle clairement attribuée à Odell. Position exacte des détails, dos et tenue à la révision choisie. Preuve continue du geste d’outil ; voix, lignes de dialogue et trajectoire narrative ne sont pas validées dans ce dossier.

**Mélanges à éviter.**

- Pas de veste, insignes ou RPG d’Odessa Cubbage.
- Pas de modèle de fuite corrigé par un tiers présenté comme modèle Valve publié.
- Pas d’apparence de doublure ou de simple placeholder utilisée comme identité définitive.
- Pas de mort, de destination ou de lien scénaristique repris comme fait canon.

**Dossier de captures requis.** Dossier proposé : `references/resonance/archives/archive_odell_hl2/`.

| Fichier demandé | Vérification attendue |
| --- | --- |
| `primary_context_to_locate.png` | Trouver et identifier un plan officiel ; laisser le temps nul tant que ce travail n’est pas fait. |
| `full_body_selected_revision.png` | Fixer costume, bottes et bonnet sur un seul modèle sourcé. |
| `face_knee_tool_details.png` | Vérifier la barbe, le côté du bandage et l’outil effectivement visible. |
| `gesture_window.mp4` | Capturer le mouvement montré ou déclarer explicitement qu’aucun geste de référence n’est disponible. |
| `odell_odessa_comparison.json` | Documenter les différences sans fondre les deux identités ni ajouter Odessa à cette production. |
| `provenance.json` | Identifier source, révision, temps exact, auteur et statut éventuel de reconstruction ; une piste de galerie ne suffit pas. |

**Sorties individuelles proposées.** Dossier proposé : `assets/resonance/candidates/archives/archive_odell_hl2/`. Tous les fichiers ci-dessous restent au plan.

| Sortie proposée | Condition de production |
| --- | --- |
| `identity_candidate.png` | À produire seulement après acquisition de la première capture primaire. |
| `idle_000.png` | Posture neutre de personnage de récit, sans arme ajoutée. |
| `inspect_door_000.png` | Geste original éventuel ; ne pas déclarer une animation retrouvée. |
| `tool_overlay_000.png` | Accessoire séparé uniquement si la révision le montre. |

**Idée originale Resonance, facultative et non intégrée.** Rôle de soutien possible : signaler une porte puis travailler sur un mécanisme pendant que le joueur garde un espace libre. Pas de slot jouable, de compétence RPG ni de route canonique créée.

**Décision de production.** Dossier détaillé de recherche ; blocage de production visuelle tant que l’identité primaire n’est pas acquise. Il reste une fiche utile, pas une validation du modèle.


### 2.5. Borealis — chapitre abandonné HL2 — `archive_borealis_hl2_cut`

**Version retenue.** Navire de la vidéo officielle E3 2002, repères 10:30 à 13:00. Sélection visuelle proposée : pont extérieur à 11:00 ; intérieurs conservés comme vues distinctes de cette séquence.

**État de preuve.** Architecture primaire inspectée ; nom du navire attribué par recoupement secondaire ; nom de map et métrique inconnus.

**Base documentaire.** La vidéo officielle 2002 montre un navire rouge et clair, son pont et des espaces industriels. L’attribution au chapitre Borealis abandonné est documentaire ; cette séquence ne constitue pas un décor jouable publié d’Episode Three. Sources : [Half Life 2 Anniversary Archive: E3 2002 Demo](https://www.youtube.com/watch?v=8CoMdbnJwvE) ; [Valve — Half-Life 2, 20th Anniversary](https://www.half-life.com/en/halflife2/20th) ; [Combine OverWiki — Borealis — cut ship](https://combineoverwiki.net/wiki/Borealis_(cut_ship)).

| Repère inspecté | Observation | Limite |
| --- | --- | --- |
| [10:30](https://www.youtube.com/watch?v=8CoMdbnJwvE&t=630s) | Navire : coque inférieure rouge, superstructure claire, numéro 02 visible. | Attribution au Borealis abandonné par le contexte documentaire secondaire ; aucun logo Aperture déduit. |
| [11:00](https://www.youtube.com/watch?v=8CoMdbnJwvE&t=660s) | Pont extérieur, parois métalliques claires, hublot, garde-corps et escalier. | Un angle filmé ; pas de géométrie arrière complète ni d’échelle métrique démontrée. |
| [11:50](https://www.youtube.com/watch?v=8CoMdbnJwvE&t=710s) | Intérieur industriel, poteaux et caisses ; feu visible au fond. | Le plan ne fournit ni déclencheur de feu ni collision jouable vérifiée. |
| [13:00](https://www.youtube.com/watch?v=8CoMdbnJwvE&t=780s) | Passerelle intérieure bordée de tuyaux et de rails clairs. | Aucun nom de fichier de carte établi à partir de l’image. |

**Invariants visuels utilisables.** Coque rouge et superstructure claire pour la vue extérieure retenue. Rails, hublots, marches et surfaces métalliques du pont visibles dans le plan de 11:00.

**Détails rapportés, encore à vérifier.** Les différents noms et versions de cartes cités secondairement ne sont pas assignés aux plans sans preuve de correspondance.

**Preuves absentes.** Nom de la carte exécutée, révision binaire et fichier de build. Relevé métrique et faces hors caméra. Preuve de continuité spatiale entre toutes les salles du montage ; aucun parcours complet jouable établi.

**Mélanges à éviter.**

- Pas de logos Aperture ou de matériel d’Episode Two ajouté au pont 2002.
- Pas de glace des concepts EP3 collée au navire pour fabriquer une version finale.
- Pas de pièces de mods ou de maps de fuite comblant les zones invisibles.
- Ne pas ajouter un stage runtime ni un identifiant STG inventé.

**Dossier de captures requis.** Dossier proposé : `references/resonance/archives/archive_borealis_hl2_cut/`.

| Fichier demandé | Vérification attendue |
| --- | --- |
| `context_e3_2002_0630.png` | Vue générale de coque, dans son format natif 4:3. |
| `deck_e3_2002_0660.png` | Ancre de composition : pont, escalier et hublot à 11:00. |
| `deck_detail_same_view.png` | Relever rails, joints et usure ; limiter les détails aux surfaces visibles. |
| `interior_e3_2002_0710.png` | Archiver la vue intérieure comme alternative séparée, sans fusion de perspective. |
| `layout_and_occlusion.json` | Lister surfaces vues, inconnues et extensions 2D originales ; pas de carte prétendue exacte. |
| `provenance.json` | Vidéo E3 2002, temps exact, rapport 4:3, identité attribuée et map inconnue. |

**Sorties individuelles proposées.** Dossier proposé : `assets/resonance/candidates/archives/archive_borealis_hl2_cut/`. Tous les fichiers ci-dessous restent au plan.

| Sortie proposée | Condition de production |
| --- | --- |
| `layer_01_atmosphere.png` | Ciel visible dans la vue du pont ; aucune tempête arctique ajoutée comme fait. |
| `layer_02_far_structure.png` | Silhouettes lointaines présentes ; garder transparent ce qui n’est pas attesté. |
| `layer_03_ship_structure.png` | Paroi, hublot et volume clair choisis dans le même point de vue. |
| `layer_04_deck.png` | Surface de lecture du combat éventuel : extension 2D originale explicitement étiquetée. |
| `layer_05_near_rail.png` | Premier plan limité aux rails attestés, sans masquer les appuis du joueur. |
| `layer_06_effects.png` | Éclairage ou atmosphère optionnels ; aucun feu de l’intérieur transféré automatiquement sur le pont. |

**Idée originale Resonance, facultative et non intégrée.** Une scène latérale pourrait réserver une bande stable du pont et utiliser une porte comme objectif d’évacuation. L’extension de perspective, les limites de déplacement et l’objectif seraient des choix Resonance, sans nouveau chapitre canonique.

**Décision de production.** Ancre de lieu suffisamment repérée pour demander une capture native. Un plan à six couches est proposé ; aucune couche ni arène n’est produite ou complète.


### 2.6. Blob — `archive_blob_ep3`

**Version retenue.** Expérience translucide de l’épilogue du documentaire, repère visuel 1:55:00 ; dossier séparé du npc_blob du SDK.

**État de preuve.** Matière et volume primaires repérés ; nom et comportement détaillé recoupés secondairement, non mesurés.

**Base documentaire.** Le documentaire montre une forme translucide arrondie avec une structure intérieure dans une séquence de démonstration technique. Le fichier SDK npc_blob contient un modèle de test headcrab.mdl et INT_MAX. Ces choix techniques ne sont pas un contrat d’apparence ou de santé de la version filmée. Sources : [Half-Life 2: 20th Anniversary Documentary](https://www.youtube.com/watch?v=YCjNT9qGjh4) ; [ValveSoftware/source-sdk-2013 — npc_blob.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_blob.cpp) ; [Combine OverWiki — Blob](https://combineoverwiki.net/wiki/Blob).

| Repère inspecté | Observation | Limite |
| --- | --- | --- |
| [1:54:30](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6870s) | Séquence industrielle portant le libellé Tech Demo. | Le libellé décrit une démonstration ; il ne certifie pas un contenu livré. |
| [1:54:40](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6880s) | Masse verdâtre ou cyan sous une structure industrielle. | Pas de causalité de division ou de passage à travers une grille établie par une image isolée. |
| [1:55:00](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6900s) | Volume arrondi translucide avec structure intérieure sombre et rouge ; canon à gravité au premier plan. | Nom Blob attribué en croisant le contexte et la source secondaire ; matière lisible, détails internes incomplets. |

**Invariants visuels utilisables.** Enveloppe translucide distincte du fond ; structure sombre/rouge intérieure dans le plan retenu. Pas de visage, d’yeux expressifs ou de carapace de Headcrab attestés pour cette version filmée.

**Détails rapportés, encore à vérifier.** Absorption, division et passage par des grilles sont des comportements rapportés ; leur séquence exacte doit être relevée dans le film continu avant toute restitution.

**Preuves absentes.** Masque d’alpha natif, vues opposées, détails internes nets. Chronométrage de déformation, absorption et séparation. Lien de version démontré entre l’expérience filmée et ce commit SDK ; résistance finale et contre canonique inconnus.

**Mélanges à éviter.**

- Pas d’error.mdl, de Headcrab ou de Snarks comme apparence officielle EP3.
- Pas d’INT_MAX converti en points de vie du jeu de combat.
- Pas de gels Portal ajoutés sur la base d’une filiation technique rapportée.
- Pas de segmentation visible inventée pour justifier une attaque.

**Dossier de captures requis.** Dossier proposé : `references/resonance/archives/archive_blob_ep3/`.

| Fichier demandé | Vérification attendue |
| --- | --- |
| `context_documentary_6900.png` | Cadre natif complet avec l’objet et l’environnement de contraste. |
| `envelope_and_interior.png` | Séparer visuellement enveloppe, reflet et structure interne sans fabriquer ce qui est masqué. |
| `contrasting_backgrounds.png` | Acquérir plusieurs fonds de la même version afin d’étudier la transparence réelle. |
| `continuous_deformation_window.mp4` | Documenter les transformations réellement visibles et leur ordre ; aucune extrapolation depuis deux miniatures. |
| `scale_and_contacts.json` | Relever rapports à une caisse, un fût ou un personnage du même plan ; identifier contact et simple recouvrement. |
| `provenance.json` | Vidéo, repères, résolution, nom attribué ; maintenir un volet séparé pour le code SDK. |

**Sorties individuelles proposées.** Dossier proposé : `assets/resonance/candidates/archives/archive_blob_ep3/`. Tous les fichiers ci-dessous restent au plan.

| Sortie proposée | Condition de production |
| --- | --- |
| `envelope_candidate_000.png` | Volume translucide isolé, testé sur fond sombre et clair. |
| `interior_candidate_000.png` | Structure intérieure seulement après validation des détails. |
| `compress_000.png` | Déformation originale éventuelle sans supposer un rig humanoïde. |
| `stretch_000.png` | Étirement original éventuel ; préserver la lecture du volume. |
| `reform_000.png` | Retour proposé à un volume lisible, pas une résurrection canonique. |

**Idée originale Resonance, facultative et non intégrée.** Prototype éventuel de contrôle d’espace : une masse avance vers un appât annoncé puis laisse temporairement un passage. Le jeu pourrait mesurer l’ouverture du passage plutôt qu’un nombre de dégâts ; c’est une proposition originale, sans faiblesse élémentaire canonique.

**Décision de production.** Étude de matière avant animation. Une image fixe ne clôt ni l’effet de transparence ni la mécanique de déformation.


### 2.7. Ice Gun — effet prototype — `archive_icegun_ep3`

**Version retenue.** Effet de glace dans les pièces grises de test de l’épilogue, repères 1:53:40–1:54:10 ; aucune forme d’arme finale choisie.

**État de preuve.** Formations de glace et environnement de test repérés dans la source primaire ; modes et durées à revoir en mouvement.

**Base documentaire.** Les images inspectées montrent des masses de glace dans un blockout à la première personne. Aucun modèle unique final d’Ice Gun n’est validé par ce dossier ; le nom d’entité rapporté depuis des fichiers divulgués n’est pas traité comme du code Valve officiellement publié. Sources : [Half-Life 2: 20th Anniversary Documentary](https://www.youtube.com/watch?v=YCjNT9qGjh4) ; [Combine OverWiki — Ice Gun](https://combineoverwiki.net/wiki/Ice_Gun).

| Repère inspecté | Observation | Limite |
| --- | --- | --- |
| [1:53:40](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6820s) | Vue à la première personne dans un espace gris de test ; masses claires de glace au premier plan. | Le fonctionnement continu et les modes d’entrée ne sont pas mesurables avec cette image. |
| [1:53:50](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6830s) | Autre vue du test avec une formation de glace et une arme à l’écran. | Aucun modèle final unique d’Ice Gun n’est établi par ce plan. |
| [1:54:10](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6850s) | Espace de test gris avec silhouettes de soldats et géométrie simple. | L’effet précis sur les ennemis demande la séquence continue ; aucune valeur de gel ou de dégâts déduite. |

**Invariants visuels utilisables.** Glace claire et irrégulière sur un décor gris ; conserver la séparation entre effet et arme affichée. L’environnement de test n’autorise pas à inventer une carte arctique finie.

**Détails rapportés, encore à vérifier.** Création de murs, rampes et gel d’ennemis sont décrits secondairement ; ils doivent être rattachés à des séquences continues pour être transposés comme gestes observés.

**Preuves absentes.** Géométrie d’une arme complète, vue à la troisième personne et modèle de prise en main. Timings, consommation, fonte, collisions et dégâts officiels. Code publié correspondant précisément à la démonstration filmée.

**Mélanges à éviter.**

- Pas de fusil nouveau appelé modèle officiel ou 1:1.
- Pas de mélange du décor gris et d’une peinture EP3 pour présenter une carte finie.
- Pas de weapon_icegun provenant d’un leak requalifié en SDK public.
- Pas de projectile élémentaire générique ajouté sans le déclarer adaptation.

**Dossier de captures requis.** Dossier proposé : `references/resonance/archives/archive_icegun_ep3/`.

| Fichier demandé | Vérification attendue |
| --- | --- |
| `context_documentary_6820.png` | Vue native complète du test, en conservant l’interface et l’arme visible. |
| `ice_form_documentary_6830.png` | Ancrage principal de forme ; pas de lissage qui transforme le matériau en cristal décoratif. |
| `effect_contact_detail.png` | Point d’apparition, liaison au sol et bord de l’effet sur une seule révision. |
| `creation_and_change_window.mp4` | Relever apparition, croissance et éventuel changement ; séparer mécanisme vu et commentaire entendu. |
| `collision_evidence.json` | Documenter ce qui prouve une collision ou une rampe ; inscrire inconnu si seule l’image est disponible. |
| `provenance.json` | Conserver le nom d’expérience et la limite : modèle final d’arme non établi. |

**Sorties individuelles proposées.** Dossier proposé : `assets/resonance/candidates/archives/archive_icegun_ep3/`. Tous les fichiers ci-dessous restent au plan.

| Sortie proposée | Condition de production |
| --- | --- |
| `effect_start_000.png` | Amorce d’effet proposée, indépendante de tout nouveau fusil. |
| `ice_mass_000.png` | Masse de glace isolée inspirée de la vue fixée. |
| `ice_edge_000.png` | Jonction au sol, sans collision moteur automatique. |
| `effect_end_000.png` | Fin d’effet originale éventuelle, marquée comme telle. |
| `readability_preview.png` | Aperçu de l’effet sur fond gris ; ne pas le comptabiliser comme arme jouable. |

**Idée originale Resonance, facultative et non intégrée.** Une règle originale pourrait créer un obstacle temporaire de hauteur limitée, clairement annoncé, avec une durée fixée lors d’un prototype ultérieur. L’obstacle n’est ni un gel universel des ennemis ni une compétence canonique livrée.

**Décision de production.** Production limitée à l’étude d’effet après capture native. Aucun sprite d’arme complet n’est demandé tant que la source n’en fournit pas.


### 2.8. Environnement arctique du prototype — `archive_arctic_ep3`

**Version retenue.** Une seule illustration publiée dans le documentaire : navire et massif de glace au repère 1:53:20. Le champ source_game du catalogue est conservé, mais le support précis est un concept, pas une capture de prototype jouable.

**État de preuve.** Concept primaire inspecté en miniature ; auteur, date de dessin et fichier natif non confirmés.

**Base documentaire.** Le documentaire présente des illustrations de neige, de glace et de structures ; l’ancre choisie est le navire contre le massif de glace. Le corpus examiné ne fixe aucune apparence officielle définitive d’un produit nommé Half-Life 3. Sources : [Half-Life 2: 20th Anniversary Documentary](https://www.youtube.com/watch?v=YCjNT9qGjh4) ; [Valve — Half-Life 2, 20th Anniversary](https://www.half-life.com/en/halflife2/20th).

| Repère inspecté | Observation | Limite |
| --- | --- | --- |
| [1:53:20](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6800s) | Illustration d’un navire sombre pris près d’un massif de glace bleu et blanc. | Concept montré officiellement ; pas une capture de carte jouable ni une apparence commerciale définitive de Half-Life 3. |
| [1:53:30](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6810s) | Autre illustration de figures et de structures dans la neige. | Plan distinct ; ne complète pas automatiquement la géométrie du concept à 6800 s. |
| [1:55:20](https://www.youtube.com/watch?v=YCjNT9qGjh4&t=6920s) | Illustration d’une arche rocheuse et glacée près de la mer. | Illustration alternative ; ne pas l’assembler au navire de 6800 s comme un même lieu attesté. |

**Invariants visuels utilisables.** Grandes masses de glace bleues/blanches et navire sombre pour le concept à 6800 s. Conserver le contraste et la direction de composition de cette illustration seule.

**Détails rapportés, encore à vérifier.** Des attributions d’auteur et dates de concept existent dans des galeries secondaires ; elles ne sont pas reprises comme métadonnées vérifiées de cette image.

**Preuves absentes.** Concept natif haute résolution et légende complète. Auteur et date confirmés par publication primaire. Géométrie cachée, échelle jouable, emplacement exact, nom de map et liens spatiaux aux autres images.

**Mélanges à éviter.**

- Pas d’assemblage des concepts 6800, 6810 et 6920 présenté comme un lieu continu.
- Pas de pont 2002 ni de blockout Ice Gun greffés comme version finale.
- Pas de personnages, ennemis ou logos ajoutés en prétendant qu’ils étaient dans le plan.
- Pas de nom de carte ou de version commerciale HL3 inventé.

**Dossier de captures requis.** Dossier proposé : `references/resonance/archives/archive_arctic_ep3/`.

| Fichier demandé | Vérification attendue |
| --- | --- |
| `concept_documentary_6800.png` | Relever le concept entier, sans crop esthétique supprimant sa composition. |
| `concept_caption_context.png` | Capturer titre, crédit et contexte s’ils sont présents ; garder auteur/date inconnus sinon. |
| `structure_detail.png` | Relever uniquement les formes lisibles du navire et des falaises de cette illustration. |
| `depth_partition.json` | Décrire les plans réellement séparables ; tous les espaces nouvellement révélés sont des reconstructions originales. |
| `unknown_geometry_mask.png` | Annoter la zone de sol et les faces absentes ; empêcher leur certification comme architecture Valve. |
| `provenance.json` | Support concept, vidéo, temps exact ; aucun nom de map ni build joué. |

**Sorties individuelles proposées.** Dossier proposé : `assets/resonance/candidates/archives/archive_arctic_ep3/`. Tous les fichiers ci-dessous restent au plan.

| Sortie proposée | Condition de production |
| --- | --- |
| `layer_01_sky.png` | Ciel transposé depuis le concept sélectionné ; texture originale signalée. |
| `layer_02_far_ice.png` | Massif lointain, sans ajout d’un autre concept. |
| `layer_03_ship.png` | Volume du navire visible ; face cachée non reconstituée comme officielle. |
| `layer_04_play_plane.png` | Sol latéral éventuel : géométrie originale Resonance et collision future distincte. |
| `layer_05_near_ice.png` | Premier plan seulement à partir des masses visibles ; ne pas masquer toute la zone de lecture. |
| `layer_06_atmosphere.png` | Effets facultatifs explicitement originaux ; le concept ne prouve pas une simulation de blizzard. |

**Lecture du champ existant.** `source_game` reste « Half-Life 2: Episode Three — prototype » dans le catalogue ; le contrat affine le support de cette fiche en **illustration conceptuelle montrée officiellement**. Il ne modifie pas silencieusement l’entrée partagée.

**Idée originale Resonance, facultative et non intégrée.** Scène d’étude envisageable autour d’un objectif de traverse sur sol stable. Vent, glace glissante, effondrement et disparition du navire restent exclus tant qu’un design original séparé ne les définit pas ; ils ne sont pas inférés de l’illustration.

**Décision de production.** Contrat de concept sélectionné ; une transposition à six couches serait une interprétation artistique. Aucun stage officiel achevé ni master produit dans ce dossier.


## 3. Trois dossiers conservés en recherche

Ces cibles ont été lues et rapprochées de leurs sources existantes. Elles ne sont pas supprimées et ne sont pas comptées parmi les huit contrats approfondis. Le manque d’une référence primaire fixée est enregistré comme une tâche précise, sans inventer une version pour remplir un quota.

| Cible existante | Pourquoi elle reste en recherche | Prochaine acquisition | Source secondaire |
| --- | --- | --- | --- |
| **Kingpin** — `archive_kingpin_hl1` | Plusieurs révisions anatomiques sont rapportées ; aucune planche primaire précise n’a été inspectée et choisie. | Retrouver une publication Valve ou un concept dûment attribué avec sa page, sa date et sa légende. Choisir une seule révision et relever silhouette, appendices et vues manquantes. Écarter les captures de mods comme preuve du modèle original. | [Combine OverWiki — Kingpin](https://combineoverwiki.net/wiki/Kingpin) |
| **Mr. Friendly** — `archive_mr_friendly_hl1` | Identité secondaire disponible, mais aucune capture native primaire de la révision à produire. | Acquérir un concept ou rendu de publication primaire avec crédit et légende. Fixer la silhouette et ses asymétries ; inscrire inconnu pour les parties cachées. Limiter ce dossier au modèle visuel, conformément au verrou existant. | [Combine OverWiki — Mr. Friendly](https://combineoverwiki.net/wiki/Mr._Friendly) |
| **Air Exchange** — `archive_air_exchange_hl2` | La source secondaire mélange des concepts et des variantes de cartes ; aucun point de vue primaire daté n’est encore choisi. | Choisir une seule illustration ou démonstration officielle et en vérifier l’attribution Air Exchange. Distinguer concept pictural, scène de démonstration et carte de développement décrite par un tiers. Acquérir un cadre entier et les limites spatiales avant de dessiner un master ou des couches. | [Combine OverWiki — Air Exchange](https://combineoverwiki.net/wiki/Air_Exchange) |

**Kingpin : verrou de version.** Ne pas fusionner différentes dispositions de pattes et de queue ; aucune apparition retail déduite d’un bestiaire communautaire.

**Mr. Friendly : verrou de version.** Ne pas transformer les intentions abandonnées ou la reconstruction d’un mod en mécanismes validés.

**Air Exchange : verrou de version.** Ne pas reconstruire une usine unique à partir de plans, cartes divulguées et concepts incompatibles.


La mise à jour anniversaire de Half-Life fournit un exemple utile de différence de statut : Valve décrit expressément des skins multijoueurs restaurés et Uplink. Elle ne donne pas, par simple proximité thématique, une preuve de livraison des deux créatures HL1 de cette liste. Le dossier n’ajoute aucun nouvel identifiant pour ces exemples. Source : [Valve — Half-Life, 25th Anniversary](https://www.half-life.com/en/halflife/25th).


## 4. Checklist de production commune

Les portes suivantes se ferment **pour chaque cible**, indépendamment du fait que d’autres images du lot E aient été produites. Un fichier candidat ne peut pas transformer une hypothèse de référence en fait établi.

- [ ] **ARCHIVE_GATE_01 — Provenance précise.** Une référence primaire identifiée, son support, sa version et son temps ou numéro de page sont enregistrés ; identification secondaire explicitement séparée.
- [ ] **ARCHIVE_GATE_02 — Image native.** Au moins un cadre natif entier est acquis ; résolution, recadrage éventuel et empreinte sont enregistrés. Une miniature du lecteur ne suffit pas à fermer ce point.
- [ ] **ARCHIVE_GATE_03 — Anatomie ou architecture.** Les détails déterminants sont visibles ou déclarés inconnus ; aucune reconstruction de parties cachées présentée comme preuve.
- [ ] **ARCHIVE_GATE_04 — Version unique.** Chaque élément du candidat appartient à la même révision choisie ; variantes, leaks, concepts et mods restent dans des dossiers distincts.
- [ ] **ARCHIVE_GATE_05 — Traduction 2D contrôlée.** Un sujet par fichier, corps entier pour un acteur, alpha vérifié sur deux fonds ; une vue d’archive n’est pas un clip animé ; une image de décor n’est pas six couches.
- [ ] **ARCHIVE_GATE_06 — Statut lisible.** Le candidat porte archive / adaptation selon le cas ; runtime_enabled reste false et aucune entrée jouable ou donnée de combat canonique n’est créée par ce dossier.


### Métadonnées à joindre aux captures

Le sidecar `provenance.json` doit indiquer l’identifiant existant, le document source, son URL, le type de support, le libellé de version, le temps exact ou la page, les dimensions, le rapport d’image original, le recadrage éventuel, l’empreinte et la date de capture. Il doit aussi séparer observations directes, identification secondaire, détails inconnus et surfaces reconstruites. Les temps absents restent `null` ; une approximation ne doit pas être transformée en timecode exact.

Les cadres sources sont conservés entiers. Un détail recadré et une annotation restent des dérivés reliés à ce cadre. Pour un acteur, le candidat montre un seul sujet entier et garde un fond transparent ; l’étude d’une seconde orientation doit respecter les asymétries attestées. Pour un lieu, un master peut aider à choisir la composition, mais les couches séparées restent nécessaires et les zones révélées par la parallaxe sont identifiées comme reconstruction.

### Revue utile avant un premier candidat

- [ ] La révision est identifiable sans se fier seulement à un nom de fichier communautaire.
- [ ] Les détails déterminants sont lisibles à la résolution source ; une miniature agrandie n’est pas traitée comme un détail neuf.
- [ ] Les parties inconnues restent hors certification ; elles ne sont pas complétées par un autre jeu, un mod ou un concept voisin.
- [ ] Les couleurs proviennent du même plan ; éclairage verdâtre et matériau de base ne sont pas confondus.
- [ ] Le masque alpha d’un volume translucide garde une lecture sur fond clair et sombre, sans trou intérieur artificiel.
- [ ] Les phases d’une interaction proposée sont étiquetées adaptation originale ; aucun test de combat n’est annoncé avant implémentation.
- [ ] Le résultat est compté comme un fichier candidat individuel. Ni une planche, ni un rendu maître, ni un seul état d’effet ne ferme une animation ou une arène complète.

## 5. Contrôles documentaires et limites restantes

Les **124 contrôles de cohérence** vérifient la couverture exacte des onze identifiants, la répartition 8 + 3, les valeurs `source_game` reprises sans modification, les liens internes de sources et d’observations, la correspondance temps/planche/case des repères, les empreintes des cinq fichiers SDK, les 48 éléments de capture et le statut exclusivement proposé des sorties. Les quatre boss runtime du catalogue restent inchangés. Aucun test artificiel, compilation du SDK ou test de gameplay n’a été ajouté.


La première décision utile pour poursuivre est l’acquisition de cadres natifs aux repères indiqués. Odell requiert d’abord l’identification d’un plan ; Kingpin, Mr. Friendly et Air Exchange requièrent une sélection primaire de version. Les recherches satisfont ainsi un objectif borné : réduire les erreurs de provenance et fournir des demandes de production exécutables, sans déclarer terminé ce que les sources ou les fichiers ne permettent pas encore de vérifier.

## 6. Répertoire des sources

Le JSON contient les périmètres de vérification, les limites et les empreintes des copies effectivement consultées. Les URLs suivantes sont les points de publication ; les images temporaires de repérage ne sont pas promises comme fichiers livrés par le dépôt.

| Identifiant | Classe | Publication |
| --- | --- | --- |
| `valve_hl2_anniversary` | primary_official_page | [Valve — Half-Life 2, 20th Anniversary](https://www.half-life.com/en/halflife2/20th) |
| `valve_hl1_anniversary` | primary_official_page | [Valve — Half-Life, 25th Anniversary](https://www.half-life.com/en/halflife/25th) |
| `valve_documentary` | primary_official_video | [Half-Life 2: 20th Anniversary Documentary](https://www.youtube.com/watch?v=YCjNT9qGjh4) |
| `valve_e3_2002` | primary_official_video | [Half Life 2 Anniversary Archive: E3 2002 Demo](https://www.youtube.com/watch?v=8CoMdbnJwvE) |
| `valve_e3_2003` | primary_official_video | [Half Life 2 Anniversary Archive: E3 2003 Demo](https://www.youtube.com/watch?v=CaHtOISsLT4) |
| `sdk_hydra_server` | primary_published_source_code | [ValveSoftware/source-sdk-2013 — npc_hydra.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_hydra.cpp) |
| `sdk_hydra_header` | primary_published_source_code | [ValveSoftware/source-sdk-2013 — npc_hydra.h](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_hydra.h) |
| `sdk_hydra_client` | primary_published_source_code | [ValveSoftware/source-sdk-2013 — c_npc_hydra.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/client/hl2/c_npc_hydra.cpp) |
| `sdk_blob_server` | primary_published_source_code | [ValveSoftware/source-sdk-2013 — npc_blob.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_blob.cpp) |
| `sdk_assassin_control` | primary_published_source_code | [ValveSoftware/source-sdk-2013 — npc_assassin.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_assassin.cpp) |
| `secondary_hydra` | secondary_reference | [Combine OverWiki — Hydra](https://combineoverwiki.net/wiki/Hydra) |
| `secondary_cremator` | secondary_reference | [Combine OverWiki — Cremator](https://combineoverwiki.net/wiki/Cremator) |
| `secondary_alien_assassin` | secondary_reference | [Combine OverWiki — Alien Assassin](https://combineoverwiki.net/wiki/Alien_Assassin) |
| `secondary_odell` | secondary_reference | [Combine OverWiki — Odell](https://combineoverwiki.net/wiki/Odell) |
| `secondary_borealis` | secondary_reference | [Combine OverWiki — Borealis — cut ship](https://combineoverwiki.net/wiki/Borealis_(cut_ship)) |
| `secondary_blob` | secondary_reference | [Combine OverWiki — Blob](https://combineoverwiki.net/wiki/Blob) |
| `secondary_icegun` | secondary_reference | [Combine OverWiki — Ice Gun](https://combineoverwiki.net/wiki/Ice_Gun) |
| `secondary_kingpin` | secondary_reference | [Combine OverWiki — Kingpin](https://combineoverwiki.net/wiki/Kingpin) |
| `secondary_friendly` | secondary_reference | [Combine OverWiki — Mr. Friendly](https://combineoverwiki.net/wiki/Mr._Friendly) |
| `secondary_air_exchange` | secondary_reference | [Combine OverWiki — Air Exchange](https://combineoverwiki.net/wiki/Air_Exchange) |
| `secondary_cremator_2002_caption` | secondary_image_metadata | [Combine OverWiki — légende 2002 Cremator 01](https://combineoverwiki.net/wiki/File:2002_Cremator_01.jpg) |

Le code est fixé au commit `3e957b70b167929f120360115d359d1ecb4c1699`. Les noms d’entités et modèles qu’il contient sont des données de cette révision ; toute utilisation future doit conserver cette provenance au lieu de les attribuer indistinctement à une « bêta HL2 ».
