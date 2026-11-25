# Lot K — revue des machines, boss et archives

Date : 2026-11-25. Références inspectées avant chaque appel. Les images candidates sont des poses statiques; aucune fidélité stricte 1:1, animation ou intégration au jeu n'est certifiée. Les archives restent désactivées au runtime et liées à une révision historique explicitement nommée.

## Compteurs

{
  "attempted": 24,
  "generated": 16,
  "confirmed_safety_refusals": 8,
  "tool_errors": 0,
  "deferred_targets": 2,
  "retries": 0
}

## Revue des transparences

Les 16 PNG ont été composés pour inspection sur fond clair #F2F2F2 et sombre #181C23, dans des vues diagnostiques séparées des livrables. Aucun pixel original n’a été modifié. Les larges halos suspectés initialement pour Cremator, Odell et la tourelle standard ne sont pas observés une fois l’alpha réellement appliqué; les notes ont été corrigées. Les franges fines, les proportions, les détails et l’affichage dans le moteur restent à valider.

## Entrées

### space_core_portal2

- Statut : refusé.
- Jeu : Portal 2. Propriétaire : support_machine.
- Références : https://theportalwiki.com/wiki/File:SpaceCore.png (SHA-256 216590c5968c934769669900f9ad2fd12eb8d08ad7b40b39184523a47a4e8ba5).
- Contrôle de référence : Original Portal 2 model reference inspected; preserve individual iris and shutter geometry.
- Résultat : Aucun fichier produit. image generation failed: http 400 Bad Request: Some("{\n  \"error\": {\n    \"message\": \"Your request was rejected by the safety system. If you believe this is an error, contact us at help.openai.com and include the request ID 1ce95b8f-5d87-4162-82c3-338b92e43eb7.\",\n    \"type\": \"image_generation_user_error\",\n    \"param\": null,\n    \"code\": \"moderation_blocked\",\n    \"moderation_details\": {\n      \"moderation_stage\": \"output\",\n      \"categories\": [\n        \"other\"\n      ]\n    }\n  }\n}")
- Revue visuelle : Aucune sortie disponible à examiner.

### adventure_core_portal2

- Statut : généré.
- Jeu : Portal 2. Propriétaire : support_machine.
- Références : https://theportalwiki.com/wiki/File:AdventureCore.png (SHA-256 debfd8944e13c257289e05118b9220e0ff953986b1878e6e46f8894a350e6b7f).
- Contrôle de référence : Original Portal 2 model reference inspected; preserve individual iris and shutter geometry.
- Résultat : assets/resonance/candidates/continuation_20261125_k/machines/adventure_core_portal2_idle_k.png; blob Git 486965dd97d33614217555f0d70f4f76dca3ff42; SHA-256 db21ebffaa6f70c1d1dfa23968ea367d15bc8fbfc8ba43f13aeb7a6d91cc5dfe.
- Revue visuelle : Un noyau entier isolé; grille verte, volet incliné, deux poignées et coque conservés. Comparaison visuelle avec la référence effectuée; micro-détails et proportions restent candidats. Marges inférieures à 10 %. Aucun détourage ou miroir ajouté.

### fact_core_portal2

- Statut : refusé.
- Jeu : Portal 2. Propriétaire : support_machine.
- Références : https://theportalwiki.com/wiki/File:FactCore.png (SHA-256 df01d7310b49aa57a8793e43977de7c10ff96c023b0f5df3dbff4e932a5b2276).
- Contrôle de référence : Original Portal 2 model reference inspected; preserve individual iris and shutter geometry.
- Résultat : Aucun fichier produit. image generation failed: http 400 Bad Request: Some("{\n  \"error\": {\n    \"message\": \"Your request was rejected by the safety system. If you believe this is an error, contact us at help.openai.com and include the request ID e83764fb-7705-4fb8-9340-dd82e23d3b4a.\",\n    \"type\": \"image_generation_user_error\",\n    \"param\": null,\n    \"code\": \"moderation_blocked\",\n    \"moderation_details\": {\n      \"moderation_stage\": \"output\",\n      \"categories\": [\n        \"other\"\n      ]\n    }\n  }\n}")
- Revue visuelle : Aucune sortie disponible à examiner.

### reviver_hla

- Statut : généré.
- Jeu : Half-Life: Alyx. Propriétaire : support_character.
- Références : https://combineoverwiki.net/wiki/File:HLA_Reviver.png (SHA-256 9d1cc9d6c5cc876a7f81d481ce38c5f1a98ae92db13b253f12a7c25d68bfc588).
- Contrôle de référence : Modèle autonome retail gris-bleu avec appendice caudal en bourgeon; aucun hôte.
- Résultat : assets/resonance/candidates/continuation_20261125_k/machines/reviver_hla_idle_k.png; blob Git 34a41bc71b713f7e631cb42fd6f48a1119d79dc0; SHA-256 09fa3b16e070afc52b3b24c59c2e9f35bf569166e4abb54ad31ce33ed9bf5b49.
- Revue visuelle : Créature autonome entière orientée à droite, bouche basse, points bleus et appendice caudal à trois lobes présents. Aucun hôte ni effet électrique. Marges variables et nombre d'appendices partiellement occultés : comparer au modèle avant validation. Pixels originaux préservés.

### armored_headcrab_hla

- Statut : refusé.
- Jeu : Half-Life: Alyx. Propriétaire : support_character.
- Références : https://combineoverwiki.net/wiki/File:HLA_ArmoredHeadcrab.png (SHA-256 ea8cd804ca7503b6d88a336ba0ba8df416d8cf27e226997e6fca781712717c78).
- Contrôle de référence : Modèle retail avec carapace sombre et pointes rouges; concept rose exclu.
- Résultat : Aucun fichier produit. image generation failed: http 400 Bad Request: Some("{\n  \"error\": {\n    \"message\": \"Your request was rejected by the safety system. If you believe this is an error, contact us at help.openai.com and include the request ID 8884a3e1-05d1-4e35-b131-d11f062b9a5c.\",\n    \"type\": \"image_generation_user_error\",\n    \"param\": null,\n    \"code\": \"moderation_blocked\",\n    \"moderation_details\": {\n      \"moderation_stage\": \"output\",\n      \"categories\": [\n        \"other\"\n      ]\n    }\n  }\n}")
- Revue visuelle : Aucune sortie disponible à examiner.

### strider_hl2

- Statut : généré.
- Jeu : Half-Life 2. Propriétaire : boss.
- Références : https://combineoverwiki.net/wiki/File:Strider_secret.jpg (SHA-256 2f8110eb6aad4b0646c2d6b6f97772737e9d3d541cd93e32756902264752b432).
- Contrôle de référence : Rendu officiel HL2 ancien site, jambes longues et armes sous le corps observées.
- Résultat : assets/resonance/candidates/continuation_20261125_k/machines/strider_hl2_idle_k.png; blob Git 121a970e01b5f45f83709ed3a20c892fa753f643; SHA-256 3d477220bd2dbfb96cf307e13ae615cd8e2f432b007525df64239a8ffd3ba170.
- Revue visuelle : Trois longues jambes et pieds complets, deux armes sous le corps; orientation gauche conservée sans miroir. Cadrage serré en haut et en bas. De fines franges colorées apparaissent sur certains contours; composition alpha contrôlée sur deux fonds; intégration sur fond de jeu encore à valider. Aucun tir.

### strider_hla

- Statut : généré.
- Jeu : Half-Life Alyx. Propriétaire : boss.
- Références : https://combineoverwiki.net/wiki/File:Hlastriderintact.png (SHA-256 452bb6f759b76247dc60081dea6d96048a4da28943f0b85cd1bc108380d29155).
- Contrôle de référence : Modèle intact de combat Alyx, sans accessoires de construction; trois jambes et carapace tan observées.
- Résultat : assets/resonance/candidates/continuation_20261125_k/machines/strider_hla_idle_k.png; blob Git 20ed4f29b789d4a8ec8d0b57d4b5d53e67cd5127; SHA-256 2dc5116bed7fe63b4acc64640c51d15df39c5ba8095d852393ad94126201b52d.
- Revue visuelle : Modèle de combat distinct du HL2, trois jambes, genoux relevés et carapace large. Sujet entier orienté à droite, marge droite faible. Fines franges colorées visibles à quelques contours; aucune retouche appliquée. Aucune pièce de construction.

### hunter_chopper_ep2

- Statut : généré.
- Jeu : Half-Life 2 Episode Two. Propriétaire : boss.
- Références : https://combineoverwiki.net/wiki/File:Hunter-Chopper.jpg (SHA-256 e08b8a25c1af04c908f9eaba8c7c3ff914d90eac29bbabe8284c9e01134ad7b8); https://combineoverwiki.net/wiki/File:00565086-photo-half-life-2-episode-two.jpg (SHA-256 d7f587d3ce9ffc6ee06e6dcb29aa6b891ae237b0f11ee211fb742e54d2ba2a41).
- Contrôle de référence : Modèle partagé HL2/EP2; scène Episode Two inspectée pour l'identité, sans réutiliser les explosions ni personnages.
- Résultat : assets/resonance/candidates/continuation_20261125_k/machines/hunter_chopper_ep2_idle_k.png; blob Git c0cbb8d704086ddd03eb67b97e5187d8d9ec33b6; SHA-256 f3d89e6cbf2ecf95b4856abb3277b2da2d674f0760cc5c908ac176ef0eeb7035.
- Revue visuelle : Hélicoptère entier orienté à droite, rotor principal, rotor de queue annulaire, canon inférieur et roues présents. La pale/traînée de rotor demeure une interprétation statique; inscriptions et petits composants à comparer au modèle. Aucun projectile ou décor.

### guardian_surface_ep2

- Statut : généré.
- Jeu : Half-Life 2 Episode Two. Propriétaire : boss.
- Références : https://combineoverwiki.net/wiki/File:Antlion_guardian.jpg (SHA-256 758d007ad6a48e30929f265a2a971adf42b2f1ed20cd2872e240a23a4d940763).
- Contrôle de référence : Même modèle retail Guardian dans les rencontres tunnels/surface; rendu sous lecture diurne. La capture complémentaire téléchargée montre une grotte : exclue du prompt et non présentée comme preuve de surface.
- Résultat : assets/resonance/candidates/continuation_20261125_k/machines/guardian_surface_ep2_idle_k.png; blob Git 7d1412050d11978fa158e1b21ffab2be316ae7fc; SHA-256 e3632e2cc52a269b02ecf146927f589fd5fb7b3c9ddc833af20cdc9706f8753d.
- Revue visuelle : Guardian entier isolé, modèle vert lumineux avec crête large et appendices dorsaux, orientation gauche conservée. Marges serrées et fines franges colorées. La sortie ne prouve pas une scène en surface et n'implique aucune nouvelle variante anatomique.

### wheatley_portal2

- Statut : refusé.
- Jeu : Portal 2. Propriétaire : boss.
- Références : https://theportalwiki.com/wiki/File:Portal2_Wheatley_Boss.png (SHA-256 41f306859fc4cfeae79a6dd6b83cbb9d2e54e36c5518f3bd63fa306f43d25bcb).
- Contrôle de référence : Référence modèle Portal 2 du corps central inspectée : petit noyau bleu en façade, corps noir suspendu et indicateurs rouges; sommet du support partiellement hors référence, terminaison candidate non certifiée.
- Résultat : Aucun fichier produit. image generation failed: http 400 Bad Request: Some("{\n  \"error\": {\n    \"message\": \"Your request was rejected by the safety system. If you believe this is an error, contact us at help.openai.com and include the request ID 0b020589-760f-4330-bfcc-96446bcadf28.\",\n    \"type\": \"image_generation_user_error\",\n    \"param\": null,\n    \"code\": \"moderation_blocked\",\n    \"moderation_details\": {\n      \"moderation_stage\": \"output\",\n      \"categories\": [\n        \"other\"\n      ]\n    }\n  }\n}")
- Revue visuelle : Aucune sortie disponible à examiner.

### cave_head_deskjob

- Statut : refusé.
- Jeu : Aperture Desk Job. Propriétaire : support_machine.
- Références : https://combineoverwiki.net/wiki/File:ADJ_Cave_Metal.jpg (SHA-256 3b92d0d13498a5120b21fc865ceee4f53fad23ddcabc8b594d61d0d389cccf91); https://combineoverwiki.net/wiki/File:ADJ_Cave_Clay.jpg (SHA-256 4707f6fbe3e26bb5e57e417f62e84dea2b9018d89360fe4c339cf91e1cdb456b).
- Contrôle de référence : Deux captures retail Desk Job inspectées; choix explicite de la tête métallique révélée. Capture de tête en argile utilisée seulement pour silhouette complète. Continuité officielle alternative, pas un boss de la campagne Half-Life.
- Résultat : Aucun fichier produit. image generation failed: http 400 Bad Request: Some("{\n  \"error\": {\n    \"message\": \"Your request was rejected by the safety system. If you believe this is an error, contact us at help.openai.com and include the request ID 9e83a91b-dddf-43d6-8e7c-ac86f9aeb383.\",\n    \"type\": \"image_generation_user_error\",\n    \"param\": null,\n    \"code\": \"moderation_blocked\",\n    \"moderation_details\": {\n      \"moderation_stage\": \"output\",\n      \"categories\": [\n        \"other\"\n      ]\n    }\n  }\n}")
- Revue visuelle : Aucune sortie disponible à examiner.

### appliance_turret_deskjob

- Statut : généré.
- Jeu : Aperture Desk Job. Propriétaire : support_machine.
- Références : https://combineoverwiki.net/wiki/File:ADJ_screenshot_07.jpg (SHA-256 18232d1f26d191cb7b8ba6b8e770b6335394759c8607d584b12cf93fada24dbe).
- Contrôle de référence : Capture officielle Steam de Desk Job. Appareil choisi : sèche-linge fermé visible à gauche; état de base uniquement, armement non visible donc non inventé. Aucun appel pour un autre modèle d'appareil.
- Résultat : assets/resonance/candidates/continuation_20261125_k/machines/appliance_turret_deskjob_idle_k.png; blob Git e598cc95167cec8dea7fb088e5759cb9ebfae253; SHA-256 b4a16e3e2b10d79ade5f12b6c1968d25bf87972b595858481b92163bc55c828a.
- Revue visuelle : Un sèche-linge fermé isolé, couleur saumon et panneau bleu-gris; aucun Grady ni arme ajoutée. Quatre voyants apparaissent malgré la consigne de trois et le marquage Aperture est reproduit approximativement. Pose d'appareil fermé uniquement : aucune animation de tourelle validée. Fines franges colorées : contrôle sur fonds clair et sombre réalisé, revue moteur encore nécessaire.

### archive_kingpin_hl1

- Statut : généré.
- Jeu : Half-Life — développement. Propriétaire : support_character.
- Références : https://combineoverwiki.net/wiki/File:Kingpin-model.jpg (SHA-256 ee87ff25454df206b1c30e42ffc298bd2e5a6c8932319830c4ffcc6215db1677).
- Contrôle de référence : Modèle Kingpin prépublication Half-Life, capture historique Kingpin-model.jpg inspectée. Révision exacte limitée au fichier visuel cité; aucune version de mod ou interprétation finale revendiquée.
- Résultat : assets/resonance/candidates/continuation_20261125_k/archives/archive_kingpin_hl1_idle_k.png; blob Git dd50b0de5d27a17817d025c8ea4b60be60f5af2b; SHA-256 1de0ed45b2492f5d3380af314af4fe2c7fd11d8ece4a79ad081311cb88095fc2.
- Revue visuelle : Silhouette d'archive entière avec grand crâne, deux stalks latéraux, bras en faux et queue repliée. Textures fortement détaillées par génération; aucun modèle inédit déclaré. Orientation et proportion de la queue restent à comparer à l'original. Quelques artefacts colorés isolés près du contour supérieur; fichier non retouché.

### archive_mr_friendly_hl1

- Statut : généré.
- Jeu : Half-Life — développement. Propriétaire : support_character.
- Références : https://combineoverwiki.net/wiki/File:Hl_friendly.png (SHA-256 fec9f63841e96fcc93870ac8697dfa6b5c4adde5dee3aa4e6590b36acd33d7b8).
- Contrôle de référence : Modèle Mr. Friendly de Half-Life prépublication inspecté. Travail limité à la silhouette historique visible; aucune mécanique abandonnée ni contenu narratif associé représenté.
- Résultat : assets/resonance/candidates/continuation_20261125_k/archives/archive_mr_friendly_hl1_idle_k.png; blob Git b67536368aaf1bab34d91d536c0ff988e24336d1; SHA-256 f7a58904eadc5a9837a930f26355bf46f0f973553be524324085a811c6316738.
- Revue visuelle : Silhouette historique accroupie, deux longs membres angulaires antérieurs et dos arqué. Pose proche de la capture; aucun autre personnage ou action. Détails de peau interprétés; extrémités et proportion du dos à valider. Artefacts colorés isolés près de certains contours conservés.

### hydra_hl2_cut

- Statut : généré.
- Jeu : Half-Life 2 contenu coupé. Propriétaire : boss.
- Références : https://combineoverwiki.net/wiki/File:E3hydra_model.jpg (SHA-256 a79ffa8601cc3dc9d5ae030af12dee88bad4d8561ce65b52a49eb9f90f699601).
- Contrôle de référence : Archive E3hydra_model.jpg : capture du modèle de la fuite HL2 2003, et non modèle retail. Une tige principale visible; sa base est hors cadre dans la source et la terminaison du candidat devra rester non certifiée.
- Résultat : assets/resonance/candidates/continuation_20261125_k/archives/hydra_hl2_cut_idle_k.png; blob Git 006d90b48592afece9754e287fd17058db8f32e7; SHA-256 c9857225d9a75a470f4c826b2fec65f2876d20496de63a29dfae1829af4c08fc.
- Revue visuelle : Une tige Hydra bleue/cyan, renflement jaune-vert et longue pointe barbelée conformes à la silhouette retenue. La terminaison inférieure est plane et reste une interprétation puisque la référence était tronquée. Quelques pixels périphériques bleus; translucidité interne examinée sur deux fonds, à valider ensuite dans le moteur. Aucun corps inventé.

### archive_cremator_hl2_2002

- Statut : généré.
- Jeu : Half-Life 2 — développement. Propriétaire : support_character.
- Références : https://combineoverwiki.net/wiki/File:2002_Cremator_02.jpg (SHA-256 01f5f96f91cbbb3b5d47bb9ea1788adadba115ed5b7b85951b21e75284f5d9af); https://combineoverwiki.net/wiki/File:2002_Cremator_01.jpg (SHA-256 3c83c260421c062c126b66b071b98f061b137417698707383f2a523762d22786).
- Contrôle de référence : Deux cadres documentaires attribués explicitement au build HL2 2002, dont capture de silhouette entière. Révision 2002 conservée; citoyen et arme posée au sol exclus. Timecode précis du documentaire non établi; identité fixée par les deux bitmaps et leurs empreintes.
- Résultat : assets/resonance/candidates/continuation_20261125_k/archives/archive_cremator_hl2_2002_idle_k.png; blob Git dfa86b632bead69b3b2201b8f4a99d3d542fa4b3; SHA-256 03d658bff69170cc5ff8597a35b6f00d11556255104780ee9123eee5299ba32c.
- Revue visuelle : Silhouette 2002 entière, tête à trois ouvertures, manteau vert à haut col, ventre circulaire et bras longs présents. Le large halo gris suspecté dans l’aperçu brut est absent lorsque le canal alpha est réellement composé sur fonds clair et sombre. Observation initiale corrigée, sans modifier aucun pixel. Petites sangles de gants et détails de surface interprétés; la silhouette reste candidate.

### archive_alien_assassin_hl2_2002

- Statut : généré.
- Jeu : Half-Life 2 — développement. Propriétaire : support_character.
- Références : https://combineoverwiki.net/wiki/File:2002_AlienAssassin.jpg (SHA-256 d1ce301feab030351652c80943d2acad0c4f586fc86ed217daaae2dcca2830f6).
- Contrôle de référence : Cadre du documentaire explicitement attribué au build HL2 2002; deux lentilles vertes sur supports, silhouette complète accroupie inspectée. Timecode exact non établi; cadre et empreinte fixent la révision retenue.
- Résultat : assets/resonance/candidates/continuation_20261125_k/archives/archive_alien_assassin_hl2_2002_idle_k.png; blob Git f9ca65f435be70aacd4a75368f8c86e3c2739389; SHA-256 cf29ce4fc77b4082ebed3e19d2f8775d6fb2fda4961a3a35bd874526c98bc044.
- Revue visuelle : Silhouette accroupie et deux lentilles vertes sur supports conservées, griffes, armor et asymétrie du poignet présentes. Cadrage supérieur très serré; fines franges colorées et détail des plaques interprété. Révision 2002 uniquement, sans animation.

### archive_odell_hl2

- Statut : généré.
- Jeu : Half-Life 2 — développement. Propriétaire : support_character.
- Références : https://combineoverwiki.net/wiki/File:2002_Odell.jpg (SHA-256 9233e3a266dac6565a17fdcb5b7de3105d615d20491a88430b135aa03805ba2b).
- Contrôle de référence : Cadre explicitement identifié comme Odell build HL2 2002 dans le documentaire Valve; combinaison orange et bottes grises, modèle distinct d'Odessa. Capture et empreinte fixées; timecode exact non établi.
- Résultat : assets/resonance/candidates/continuation_20261125_k/archives/archive_odell_hl2_idle_k.png; blob Git 5751e03a5b111ff5b44553f693c83782ca03ceee; SHA-256 3560505305e74d6c95f35e6aa70f8a41935c0e4de273aaf772644f62a15417c7.
- Revue visuelle : Personnage entier avec tenue orange, bonnet, gants et bottes grises, sans moustache; visage interprété d’après la capture. Le large halo orange/gris suspecté dans l’aperçu brut est absent après composition réelle du canal alpha sur les deux fonds. Observation initiale corrigée; aucun pixel retouché.

### atlas_portal2

- Statut : refusé.
- Jeu : Portal 2 — coopération. Propriétaire : support_machine.
- Références : https://theportalwiki.com/wiki/File:Atlas.png (SHA-256 bdecd308ddb015d437e5e42bf362983ac950c5c3f5d5c6098be81b368bffbd5c).
- Contrôle de référence : Modèle officiel Portal 2 Atlas inspecté; changement demandé limité à une pose de base relâchée, proportions sphériques et œil bleu conservés.
- Résultat : Aucun fichier produit. image generation failed: http 400 Bad Request: Some("{\n  \"error\": {\n    \"message\": \"Your request was rejected by the safety system. If you believe this is an error, contact us at help.openai.com and include the request ID 8bf6599b-ba65-42e5-a4ca-9696e8ace604.\",\n    \"type\": \"image_generation_user_error\",\n    \"param\": null,\n    \"code\": \"moderation_blocked\",\n    \"moderation_details\": {\n      \"moderation_stage\": \"output\",\n      \"categories\": [\n        \"other\"\n      ]\n    }\n  }\n}")
- Revue visuelle : Aucune sortie disponible à examiner.

### pbody_portal2

- Statut : refusé.
- Jeu : Portal 2 — coopération. Propriétaire : support_machine.
- Références : https://theportalwiki.com/wiki/File:P-body.png (SHA-256 b021bb9c3d18664dd4f19ca5a7c94cf8fce9c74e9db4577da39bc87818942c49).
- Contrôle de référence : Modèle officiel Portal 2 P-body inspecté; œil orange, très longues jambes et coque étroite ovale, silhouette distincte d'Atlas.
- Résultat : Aucun fichier produit. image generation failed: http 400 Bad Request: Some("{\n  \"error\": {\n    \"message\": \"Your request was rejected by the safety system. If you believe this is an error, contact us at help.openai.com and include the request ID fda8fd7a-9c85-4b1a-b1ef-0a4105eb7bba.\",\n    \"type\": \"image_generation_user_error\",\n    \"param\": null,\n    \"code\": \"moderation_blocked\",\n    \"moderation_details\": {\n      \"moderation_stage\": \"output\",\n      \"categories\": [\n        \"other\"\n      ]\n    }\n  }\n}")
- Revue visuelle : Aucune sortie disponible à examiner.

### glados_portal1

- Statut : généré.
- Jeu : Portal. Propriétaire : boss.
- Références : https://theportalwiki.com/wiki/File:GLaDOS_P1.png (SHA-256 1592687176d889d28cde8f66e4187adbde6404f002c9778cba44c7f49d0a31a6).
- Contrôle de référence : Reference bitmap inspected: original Portal chamber screenshot shows GLaDOS curled hanging body with black upper cables, white side framework and four attached personality cores. Background scenery excluded. Screenshot is partly occluded and does not supply a full turnaround; no exact unseen construction certified.
- Résultat : assets/resonance/candidates/continuation_20261125_k/machines/glados_portal1_idle_k.png; blob Git a315ffa04c6866fd3b623df387e91a85109418b8; SHA-256 c7c859a84d610e07bdb4aaf46ddffece89b1d1c5d7bfd08d50f1cc06bd9b05fa.
- Revue visuelle : Un ensemble GLaDOS Portal 1 suspendu avec quatre modules de personnalité attachés; tête basse et construction lisibles. Petites franges possibles sur les câbles et contours. Les surfaces masquées dans la capture n’ont pas de vue de contrôle indépendante. Aucune animation ni intégration.

### wheatley_core_portal2

- Statut : refusé.
- Jeu : Portal 2. Propriétaire : support_machine.
- Références : https://theportalwiki.com/wiki/File:Wheatley.png (SHA-256 4e58a1c2f179619d505c6b1fe38a21fd63856fa69771f7bee99b730582960eab).
- Contrôle de référence : Reference bitmap inspected: scratched off-white spherical portable core with blue dotted eye, dark circular side recess and grey handles above/below. This is the mobile Wheatley identity, separate from Wheatley attached to the central facility chassis.
- Résultat : Aucun fichier produit. image generation failed: http 400 Bad Request: Some("{\n  \"error\": {\n    \"message\": \"Your request was rejected by the safety system. If you believe this is an error, contact us at help.openai.com and include the request ID 39be5fab-3fcd-40af-8a49-bb22d3cedc1b.\",\n    \"type\": \"image_generation_user_error\",\n    \"param\": null,\n    \"code\": \"moderation_blocked\",\n    \"moderation_details\": {\n      \"moderation_stage\": \"output\",\n      \"categories\": [\n        \"other\"\n      ]\n    }\n  }\n}")
- Revue visuelle : Aucune sortie disponible à examiner.

### sentry_turret_portal2

- Statut : généré.
- Jeu : Portal 2. Propriétaire : support_machine.
- Références : https://theportalwiki.com/wiki/File:Portal2_Turret_Standard.png (SHA-256 9d12427500895a4082605726cd1623a6e374a0b56767a2ff1483a6253f33f859).
- Contrôle de référence : Inspected original model capture: standard white shell is shown OPEN, exposing dark weapon housings; red spoke-like iris, pointed tripod legs, antenna. This prompt preserves that documented open-shell state rather than inventing the closed pose from incomplete views.
- Résultat : assets/resonance/candidates/continuation_20261125_k/machines/sentry_turret_portal2_idle_k.png; blob Git 5679448f622e9c799499f6cc24dc8112ca803b03; SHA-256 077e9de49506c06ed5dd107a29c59d3b9fc4d6879d862c0eab097084708b3804.
- Revue visuelle : Une tourelle standard Portal 2 dans l’état à coques ouvertes documenté par la référence. Le large halo gris suspecté dans l’aperçu brut est absent après composition réelle sur les deux fonds. Observation initiale corrigée. Lettrage approximatif et détails mécaniques à valider; aucune intégration.

### defective_turret_portal2

- Statut : généré.
- Jeu : Portal 2. Propriétaire : support_machine.
- Références : https://theportalwiki.com/wiki/File:Portal2_Turret_Defective.png (SHA-256 6398971bce1367dc90bca6b5d481a8b3df756ed18277937d13544e2bbe19f01c).
- Contrôle de référence : Inspected retail model capture of shell-less defective turret: dark perforated oval frames, red radial eye, pale rectangular plate above eye, reddish circular speaker below, exposed blue inner pieces and three dark legs. Campaign defective identity selected; no Oracle or co-op functional variant asserted.
- Résultat : assets/resonance/candidates/continuation_20261125_k/machines/defective_turret_portal2_idle_k.png; blob Git 190153f043a8a13488153be9680e3060f64f099c; SHA-256 c122ae8d61d3b7a92928c74bfe29bc66756186a69c370864467844bdbabd1af3.
- Revue visuelle : Une tourelle défectueuse de la campagne Portal 2 sans coques, avec œil rouge radial, haut-parleur, composants bleus et structure tripode. Contours lisibles sur les deux fonds; fines franges possibles, lettrage et mécanique non certifiés.

## Cibles différées sans appel

### archive_blob_ep3

Les deux cadres inspectés montrent la masse translucide, le noyau rouge et des ramifications internes. Leur provenance est attribuée au documentaire officiel Valve, mais aucun timecode exact et vérifié du cadre n'a été établi. Le contrat d'archive demande image et timecode avant génération; cible différée sans appel. La tentative de consultation d'un miroir documentaire public a répondu HTTP 403 et n'a pas été contournée. Aucune espèce finale Episode Three ou HL3 n'est inventée.

Sources : https://www.youtube.com/watch?v=YCjNT9qGjh4; https://www.half-life.com/en/halflife2/20th/; https://combineoverwiki.net/wiki/File:BlobCinderNom.jpg; https://combineoverwiki.net/wiki/File:BlobGratePass.jpg

### archive_icegun_ep3

Les cadres inspectés montrent un rayon cyan créant une paroi/rampe de glace; des modèles temporaires SMG et Pulse Rifle sont visibles, aucun fusil Ice Gun final unique. Aucun timecode exact et vérifié n'a été établi. Le contrat d'archive demande image et timecode avant génération; cible différée sans appel. Le miroir documentaire public a répondu HTTP 403 et n'a pas été contourné. Une éventuelle reprise devra représenter uniquement l'effet prototype observé, jamais inventer un fusil final.

Sources : https://www.youtube.com/watch?v=YCjNT9qGjh4; https://www.half-life.com/en/halflife2/20th/; https://combineoverwiki.net/wiki/File:IceGunInAction.jpg; https://combineoverwiki.net/wiki/File:IceGunRamp.jpg


## Vérification finale

Contrôle ciblé des 26 identités, des compteurs, des 16 PNG, de leurs dimensions et de leurs empreintes SHA-256/Git, des 31 références effectivement utilisées et des statuts sans fichier : zéro erreur. Les 24 appels et les 2 décisions différées couvrent exactement les 26 cibles assignées. Aucun réessai en K.

## Limites

Les sites de communauté hébergent des captures du jeu et des cadres documentaires; ils ne constituent pas une certification de fidélité du candidat. Les cadres du documentaire Valve doivent conserver leur statut de prototype non publié. Les PNG ne sont jamais recadrés, recolorés ni retouchés après génération. Les refus sont consignés sans réessai dans cette reprise.
