# Audit du projet et état de production

## Base examinée

L'examen du 19 novembre 2026 porte sur le dépôt darknigthmare/combine-administrator-simulator, branche master, commit 63652852f030f6d76d5893845e326a60100d3c58. Le package annonce la version 0.47.0. Le dépôt a été lu et cloné ; ses consignes AGENTS ont été examinées. La recherche des demandes de fusion ouvertes n'a retourné aucun résultat au moment de l'examen.

Le projet existant est un jeu de gestion avec React, TypeScript, Vite, Zustand et un shell Tauri. Il dispose déjà d'une création de campagne, d'un prologue, d'écrans spécialisés et de visuels d'illustration. L'inventaire du répertoire public compte 74 fichiers, dont 67 images matricielles. Ces 67 images sont statiques. La recherche dans les sources et les documents n'a trouvé aucun module de combat 2D, moveset de versus ou dossier Resonance. Les occurrences de résonance existantes désignent notamment des événements vortigaunt de la gestion.

Les portraits, illustrations d'unités et panoramas existants peuvent servir au repérage ou à des écrans d'archives après contrôle. Ils ne sont pas comptés comme sprites de combat ou clips animés. La liste complète des chemins, dimensions et formats figure dans existing_visual_inventory.json.

## Premier lot graphique

Neuf demandes de génération ont été exécutées. Six ont produit une image. Trois ont été refusées automatiquement par le service de génération : Gordon, Alyx et le Vortigaunt. Aucune image n'a été reçue pour ces trois cibles, et elles restent non produites dans le journal.

| Asset livré | Format reçu | Usage prévu | Contrôle restant |
| --- | --- | --- | --- |
| Élite du Cartel en garde vers la gauche | PNG RGBA 1245 × 1263 | Pose clé individuelle | Comparer armure, arme, visage et proportions aux références |
| Chambre de test de Black Mesa | PNG RGB 2172 × 724 | Panorama maître | Vérifier architecture source et adapter le cadrage final |
| Gare de Cité 17 | PNG RGB 1774 × 887 | Panorama maître | Vérifier façade et composition sur référence |
| Sol de la chambre de test | PNG RGBA 2172 × 724 | Couche isolée issue du maître | Contrôler franges, raccords et pivot du sol |
| Ciel et Citadelle lointaine | PNG RGBA 1774 × 887 | Couche d'atmosphère candidate | Corriger la transition de brume et contrôler l'opacité |
| Chargeur HEV | PNG RGBA 1024 × 1536 | Accessoire candidat | Reprendre silhouette et marquages sur référence, nettoyer le fond résiduel |

Les quatre fichiers RGBA contiennent réellement des pixels transparents. Ce contrôle technique ne certifie pas la qualité de leur détourage ni leur fidélité. Le chargeur et la couche de brume nécessitent une révision visible. Les autres images restent des candidats à comparer aux références et à tester à l'échelle de jeu.

Le lot contient une pose individuelle, deux panoramas maîtres, deux couches candidates et un accessoire. Il ne contient aucun clip animé complet, aucun décor dont les six couches ont toutes été produites et aucun asset certifié 1:1. Les fichiers de tailles différentes n'ont pas été étirés silencieusement au format cible. L'ajustement devra préserver leurs proportions et leur cadrage.

## Contrôle de production

Le registre generated_art_register.json conserve les neuf demandes, les consignes exactes, le résultat, les dimensions, la transparence et les remarques visuelles. Le backlog d'assets représente des groupes de travail et non un nombre de fichiers déjà créés. Les comptes de dessins d'animation se rapportent à un costume et à une orientation. Les costumes supplémentaires, orientations asymétriques, cinématiques, effets et accessoires peuvent augmenter la charge.

Les documents et catalogues décrivent un mode à construire. Les contrats TypeScript définissent des structures et des vérifications de données ; ils ne constituent pas un moteur de combat ni un service réseau. Les objectifs de rollback, les formats de tournoi et les tests de performance restent des exigences de la bible jusqu'à leur réalisation et leur mesure.

## Références documentaires

Les sources ci-dessous fondent le périmètre des jeux et les identités générales. Elles ne remplacent pas les captures de modèles et de scènes nécessaires au contrôle 1:1. Les techniques, chiffres d'équilibrage, dialogues nouveaux, rivalités, fatalités et fins de parcours sont des créations de cette bible.

| Référence | Source et adresse | Usage et limite |
| --- | --- | --- |
| S1 | Valve Half-Life https://www.half-life.com/en/halflife/ | Incident de Black Mesa, Gordon et périmètre du premier jeu ; page consultée |
| S2 | Valve Half-Life 2 https://www.half-life.com/en/halflife2 | Cité 17, Gordon, Alyx et résistance au Cartel ; page consultée |
| S3 | Valve Half-Life Alyx https://www.half-life.com/en/alyx/ | Position avant Half-Life 2 et identité de la période Alyx ; page consultée |
| S4 | Steam Opposing Force https://store.steampowered.com/app/50/HalfLife_Opposing_Force/ | Extension Gearbox et perspective militaire à Black Mesa ; page consultée |
| S5 | Steam Blue Shift https://store.steampowered.com/app/130/HalfLife_Blue_Shift/ | Barney Calhoun et extension Gearbox ; page consultée |
| S6 | Manuel officiel PlayStation 2 archivé https://valvearchive.com/Games/Half-Life%20%28PlayStation%202%29/Documents/Manual.pdf | Référence repérée pour Decay ; accès direct bloqué, lecture complète non confirmée |
| S7 | Valve Half-Life 2 anniversaire https://www.half-life.com/en/halflife2/20th | Séparation jeu et épisodes, références de rendu ; contenu indexé consulté |
| P1 | Dépôt du projet https://github.com/darknigthmare/combine-administrator-simulator | README, package et sources examinés au commit indiqué |

Les changements de versions des jeux sources, de modèles ou de textures doivent entraîner une nouvelle vérification du dossier concerné, sans modifier rétroactivement la provenance d'un asset validé pour une autre édition.
