# Arènes et production visuelle

Ce chapitre définit 24 arènes et la production des images nécessaires à Half Life Resonance. Les lieux renvoient aux jeux identifiés dans chaque fiche. Le plateau de combat, les raccords entre arènes et les conclusions de match sont des adaptations originales pour ce mode annexe. Une image générée peut proposer une direction visuelle; elle ne prouve ni une reproduction exacte du lieu ni une intégration dans le moteur.

## Périmètre des références

La fidélité demandée porte sur la silhouette, les matières, les équipements, les proportions, l'époque et les signes distinctifs de chaque source. La conversion vers un combat de profil impose une composition nouvelle et un sol lisible. On conserve le lieu reconnu, puis on documente précisément cette adaptation. Les décors de Half-Life original ne sont pas remplacés silencieusement par ceux du jeu Black Mesa de Crowbar Collective, présenté par son éditeur comme une réinterprétation du jeu de Valve [A1, A5]. Les époques de Half-Life 2 et de Half-Life Alyx restent séparées; Valve place Alyx entre Half-Life et Half-Life 2 [A2, A6].

Chaque dossier de référence doit contenir au moins une vue générale, deux angles de détail, un relevé de palette et les éléments discriminants. Les références issues d'une autre version reçoivent leur propre identifiant. Les captures de jeu, lorsqu'elles seront disponibles, devront préciser jeu, version, chapitre, emplacement et date de capture. Les pages officielles consultées confirment le cadre des jeux; elles ne suffisent pas à certifier la géométrie exacte des 24 salles. La validation visuelle reste donc ouverte.

## Contrat commun des arènes

Toutes les arènes compétitives partagent une bande de sol horizontale et une géométrie de collision commune. La cible de mise en page utilise un écran logique de 1920 × 1080, un sol à y = 880 et une largeur d'arène de 2560 pixels logiques. Ces valeurs expriment une cible de présentation, à relier aux unités du moteur existant lors de l'intégration. Elles ne sont ni les dimensions des lieux canoniques ni des valeurs déjà implémentées.

Les six couches sont de véritables fichiers distincts. Un panorama maître sert à approuver la composition, puis chaque couche est produite et contrôlée séparément. Découper un panorama en six bandes horizontales ne produit pas une parallaxe correcte : les éléments masqués doivent exister derrière les autres plans, les trous doivent être transparents et les marges doivent couvrir le déplacement de caméra.

| Couche | Coefficient horizontal | Contenu et contrainte |
|---|---:|---|
| L00 Ambiance | 0,00 | Ciel, vide ou enveloppe lointaine; couvre tout le cadrage |
| L01 Lointain | 0,12 | Horizon, mégastructure ou relief très distant |
| L02 Intermédiaire | 0,30 | Architecture et volumes secondaires |
| L03 Proche | 0,55 | Façades, machines et silhouettes derrière les combattants |
| L04 Sol | 1,00 | Plateau visible aligné sur la collision; aucune pente cachée |
| L05 Avant plan | 1,10 | Détails bas et latéraux; jamais devant mains, visages ou projectiles |

Pour un point de référence, le déplacement affiché vaut le déplacement de caméra multiplié par le coefficient de couche. La géométrie jouable reste indépendante de cette animation. Les objets de décor ne deviennent des objets lançables que s'ils possèdent une définition de gameplay, une taille bornée et une règle symétrique. En classé et en tournoi standard, aucun danger, objet aléatoire ou changement de plateau ne s'active pendant un round.

Les variantes spectacle peuvent ajouter une séquence de fond, une transition ou un danger annoncé. Le menu indique ces règles avant le match. Le joueur peut conserver l'ambiance animée tout en désactivant les éléments dangereux. Une transition se joue après la validation du résultat de la manche; elle ne déplace pas un combattant pendant une interaction active. Les cinématiques de fin de stage ne changent jamais le score déjà acquis.

## Catalogue des vingt quatre arènes

Les noms sont des titres de travail propres au mode. Les huit arènes P0 forment le premier lot visuel; les seize P1 élargissent les époques et les ambiances. Chaque entrée possède dans stages.json six couches nommées, quatre props séparés, son ambiance, sa variante spectacle et sa conclusion sans gore.

| Identifiant | Jeu source | Arène | Priorité |
|---|---|---|---|
| STG 01 | Half-Life | Terminus du tram de Black Mesa | P1 |
| STG 02 | Half-Life | Chambre du spectromètre | P0 |
| STG 03 | Half-Life | Passerelle de Blast Pit | P1 |
| STG 04 | Half-Life | Anneau Lambda | P1 |
| STG 05 | Half-Life | Îlot frontière de Xen | P0 |
| STG 06 | Opposing Force | Dépôt sous occupation | P1 |
| STG 07 | Opposing Force | Chambre du portail Race X | P1 |
| STG 08 | Blue Shift | Cour de fret de Calhoun | P1 |
| STG 09 | Blue Shift | Laboratoire de Rosenberg | P1 |
| STG 10 | Decay | Installation de transfert Gamma | P1 |
| STG 11 | Half-Life 2 | Parvis de la gare de Cité 17 | P0 |
| STG 12 | Half-Life 2 | Écluse des canaux | P1 |
| STG 13 | Half-Life 2 | Cour de Black Mesa East | P1 |
| STG 14 | Half-Life 2 | Rue de Ravenholm | P0 |
| STG 15 | Half-Life 2 | Cour de Nova Prospekt | P0 |
| STG 16 | Half-Life 2 | Plateforme de la Citadelle | P0 |
| STG 17 | Episode One | Accès au cœur instable | P1 |
| STG 18 | Episode One | Quai d'évacuation | P1 |
| STG 19 | Episode Two | Galerie des fourmis lions | P1 |
| STG 20 | Episode Two | Hangar de White Forest | P0 |
| STG 21 | Half-Life Alyx | Toits de Cité 17 | P1 |
| STG 22 | Half-Life Alyx | Rue de la zone de quarantaine | P0 |
| STG 23 | Half-Life Alyx | Distillerie en quarantaine | P1 |
| STG 24 | Half-Life Alyx | Intérieur du Vault | P1 |

Les versions Opposing Force et Blue Shift ne sont pas de simples recolorations. Elles réemploient éventuellement un matériau industriel après contrôle de source, mais disposent de leur propre composition, signalétique et bibliothèque de props. La fiche Decay reste suspendue à l'examen des références PlayStation 2; le nom de travail ne constitue pas une certification de salle exacte. Gene Worm est un boss hors échelle représenté dans la profondeur d'une variante spécifique, pas un combattant humanoïde redimensionné.

## Chambre du spectromètre

Le plateau montre une tranche latérale de la salle de test : coque sombre fixe, charpente à 0,12, appareil central à 0,30, instrumentation à 0,55, passerelle à 1 et câbles périphériques à 1,10. Le volume principal demeure visible entre les combattants sans créer une cible concurrente. La passerelle est une adaptation de gameplay explicitement distincte d'un relevé exact de la salle.

Le chariot, le cristal, la console et les voyants sont exportés séparément. Le cristal ne doit pas être agrandi pour devenir une décoration générique dominante. Une animation de charge lente signale l'approche de la dernière manche; elle reste visuelle. Les décharges se produisent derrière l'appareil et leur luminance respecte le réglage d'effets réduits. La conclusion de stage ouvre un portail de confinement, transporte le perdant et le montre vivant derrière une vitre. Le maître de composition, le sol séparé et les cinq autres couches représentent sept livrables distincts.

## Îlot frontière de Xen

La direction vise le Xen de Half-Life original. Il faut verrouiller la forme des roches, le ciel, la végétation et la gamme lumineuse à partir de cette source avant d'ajouter de la définition. Les paysages du remake Black Mesa peuvent faire l'objet d'une variante nommée ultérieure; ils ne remplacent pas ce jeu source [A5].

Le plateau rocheux est continu. Le vide visible derrière et sous le bord n'est pas une fosse jouable. Trois étages d'îles fournissent la profondeur; la végétation reste derrière la zone d'attaque. Un cristal, une plante, une roche organique et une membrane de sol forment les props. L'atmosphère peut respirer lentement, mais les hitboxes, le saut et la gravité demeurent identiques aux autres arènes. La conclusion téléporte le perdant sur une île éloignée, visible et sûre. Les autres îlots ne sont pas présentés comme des versions miniatures exactes de niveaux entiers.

## Parvis de la gare de Cité 17

La composition utilise le parvis extérieur : ciel gris à 0, Citadelle à 0,12, toits lointains à 0,30, façade néoclassique et postes Combine latéraux à 0,55, pavés à 1 et bordure à 1,10. Les passants éventuels restent dans la profondeur et ne sont jamais des cibles de finition. Les symboles et panneaux doivent être reproduits d’après la référence; on réserve une zone vide dans le rendu généré plutôt que d’accepter des lettres inventées. La typographie exacte sera ajoutée comme couche maîtrisée.

Le banc, la valise, la borne et la barrière sont détachés. Le scanner n'entre pas dans la silhouette d'un personnage et son éclairage ne blanchit pas les indications de garde. Les annonces de station sont des indications sonores originales pour le mode, pas des dialogues officiels fabriqués. La finition ferme une petite zone de contrôle autour du perdant. Le parvis conserve la texture de ses pavés sans multiplier les lignes obliques qui rendraient le placement des pieds ambigu. Le candidat de skyline généré associe encore ciel et Citadelle dans une seule image : il reste à scinder ou à régénérer pour obtenir deux couches indépendantes. Il ne valide donc pas simultanément L00 et L01.

## Rue de Ravenholm

L'arène utilise une rue de travail aux façades usées, bois, tôle et éclairages localisés. Le ciel et les cheminées restent calmes; la lumière chaude de l'atelier détache les personnages sans les transformer en silhouettes noires. La lame, le moteur, la bonbonne et le lampadaire sont quatre assets, avec versions intactes et activées lorsqu'une variante narrative le nécessite.

Le plateau classé ne possède aucune scie active, fosse ou attaque de zombie aléatoire. Le mode spectacle peut annoncer un piège avant le début du round; il conserve un état déterministe. Une silhouette en arrière-plan peut souligner le danger sans entrer dans la collision. La finition sans gore rabat une grille d'atelier qui immobilise le perdant dans un abri. Le traitement visuel évite d'introduire du sang décoratif qui contredirait un réglage de violence réduit.

## Cour de Nova Prospekt

La scène oppose la masse de la prison à la structure Combine qui la traverse. Les miradors appartiennent au plan lointain; les équipements proches sont rangés hors de la bande centrale. La lecture repose sur une palette minérale froide et quelques indicateurs lumineux, avec une valeur moyenne derrière les silhouettes sombres de l'Élite et des soldats.

Les props comprennent projecteur, barrière, caisson et porte de cellule. Le projecteur ne cherche pas réellement le joueur en compétitif : sa trajectoire reste une animation de fond. Les fourmis lions n'apparaissent que derrière une séparation et sans effet sur les dégâts. Une transition facultative mène au bloc de cellules entre manches. La finition enferme le perdant dans une cellule sous champ de sûreté. La clôture du premier plan doit rester suffisamment basse pour ne pas masquer les pieds ou la lecture d'un balayage.

## Plateforme de la Citadelle

L'impression de hauteur vient des piliers et des capsules, pas d'un cadrage qui réduit les sprites. Les machines verticales se déplacent dans la profondeur. La piste reste plane et fermée aux extrémités du volume jouable. Les silhouettes de métal ne produisent aucun coin supplémentaire où la collision deviendrait difficile à lire.

Les capsules de transport, consoles, rails lumineux et montants sont séparés. Une variante peut animer l'ascension entière du décor entre manches tout en conservant le même plateau logique. En combat, les paramètres de caméra sont stables. La finition enferme le perdant dans une capsule puis l'éloigne. La version Episode One reçoit des fichiers distincts pour le cœur instable : sa destruction et ses lumières ne contaminent pas cette version de Half-Life 2.

## Hangar de White Forest

L'arène montre le contraste entre l'atelier de la résistance et la forêt. Les installations de lancement restent au fond. Les portes et la charpente donnent un cadre stable, le sol d'atelier reste suffisamment mat pour rendre les pieds lisibles. Le chariot, les caisses, les panneaux et les bidons composent les props, sans attribuer automatiquement une explosion au moindre objet.

Les événements de fond passent d'une préparation calme à une activité soutenue pendant les dernières manches. Aucun compte à rebours du décor ne concurrence le chronomètre. La variante extérieure change après le résultat du round. La finition transporte le perdant sur un chariot jusqu'à une zone médicale indiquée visuellement. Les personnages d'accompagnement peuvent rester hors champ; leur présence n'est pas requise pour valider le décor de base.

## Rue de la zone de quarantaine

Cette arène emploie l'époque de Half-Life Alyx, ses façades et son infestation. La Citadelle, lorsqu'elle apparaît, doit correspondre à cette période. Les spores et les surfaces organiques créent une profondeur contenue, sans filtres pleins écrans ni particules couvrant l'interface. Le sol de combat reçoit une bande dégagée crédible dans la rue.

Les barrières, caisses, pousses et panneaux sont quatre props distincts. Les organismes ne deviennent pas des hitboxes de manière implicite. La variante narrative peut isoler un passage derrière une porte; elle ne crée pas un second jeu de règles caché. La conclusion sans gore enferme le perdant dans une zone de confinement, puis confirme visuellement qu'il est vivant. La distillerie et le Vault constituent deux autres arènes avec leur propre logique; leur présence n'autorise pas une reconstruction complète des pouvoirs ou événements du jeu.

## Contrat des sprites individuels

Chaque image de personnage contient un seul combattant et une seule pose. Les planches réunissant plusieurs vues servent uniquement à la référence lorsqu'elles sont demandées. Le livrable moteur est un PNG RGBA individuel, avec alpha réel et marges transparentes. Une ombre peinte dans le fichier du combattant n'est pas retenue : l'ombre de contact possède un asset et une logique séparés.

Le cadrage utilise un canevas constant par gabarit, un pivot au sol et un registre de points d'attache. La hauteur logique d'un adulte standard vaut une unité de référence; on ajuste la taille des autres personnages à partir de leurs proportions documentées. Les doigts, lunettes, masques, plaques et armes sont contrôlés à la taille d'affichage réelle. Une résolution d'image élevée ne compense pas un équipement erroné.

Les deux orientations ne sont pas présumées identiques. Le logo HEV, les éléments du masque, la ceinture, les poches, l'arme et les détails asymétriques doivent conserver leur côté anatomique. Le miroir automatique est permis uniquement après audit. Sinon, on produit une contrepartie gauche ou une correction par pièces. Les textes et symboles ne sont jamais inversés pour économiser une variante.

Pour l'animation, on verrouille d'abord les poses clés, puis les entre-deux, puis les durées. Douze dessins d'attente ne constituent pas douze frames de simulation : certains dessins peuvent être maintenus plusieurs ticks. La simulation cible 60 Hz; l'animation reçoit une table de durées en ticks et ne décide pas de la fenêtre d'impact. Les pieds doivent rester ancrés lorsqu'ils portent le poids. Les déplacements de personnage viennent des données du mouvement, avec une tolérance visuelle contrôlée pour les gestes.

## Budget de dessins et séquences

Le budget de base propose 53 séquences et 547 dessins par combattant, pour un costume et une orientation dessinée. Les six pilotes représentent 3282 dessins avant contreparties asymétriques, armes détachées, effets, portraits et variantes de costume. C'est une cible de charge de production, pas un nombre d'images déjà fabriquées. Une pose d'attente générée ne clôt pas une séquence d'attente animée.

| Famille | Séquences | Dessins cibles par combattant |
|---|---:|---:|
| Attente et déplacements terrestres | 5 | 52 |
| Accroupissement | 3 | 7 |
| Saut et retournement | 6 | 22 |
| Garde au sol aérienne et réception de blocage | 5 | 28 |
| Réactions aux coups | 4 | 16 |
| Chute et relevée | 3 | 18 |
| Projections et déprojection | 4 | 48 |
| Normaux debout accroupis et aériens | 9 | 72 |
| Normal directionnel 6H | 1 | 10 |
| Spéciaux | 5 | 80 |
| Super et ultime | 2 | 56 |
| Intro provocation victoire défaite | 4 | 74 |
| Fatalité et conclusion non létale | 2 | 64 |
| Total | 53 | 547 |

Le normal directionnel commun est 6H. La garde aérienne dispose de sa propre séquence de dix dessins; aucune commande 6M ou 3H supplémentaire n’est présumée jouable. Les six pilotes possèdent chacun cinq spéciaux définis dans le roster, donc cinq séquences de seize dessins. Aucun sixième emplacement vide n’est conservé dans le budget. Une variation EX qui exige une pose réellement différente augmente le budget; une variation de durée ne le fait pas. Le budget comporte un super de 28 dessins et un ultime de 28 dessins, conformément aux commandes et coûts globaux; un second super distinct demanderait une ligne supplémentaire. Les armes disjointes possèdent leurs points d'attache et leur axe de rotation. L'origine des effets reste stable pour chaque main, canon ou point d'impact.

## Identifiants et suivi de production

La nomenclature associe personnage, jeu source, costume, orientation, action et numéro. Exemple : fighters/gordon_hl2/default/right/normal_5M/frame_0001.png. Un objet de décor utilise stages/hl2_station/props/prp_hl2_station_01_v001.png. Les versions de travail n'écrasent pas les fichiers validés; le manifeste décide du fichier courant.

Le suivi distingue la connaissance du besoin de l'état réel de l'image. Un asset peut être absent de l'audit local tout en existant ailleurs. La comparaison exhaustive au dépôt et aux branches reste nécessaire avant d'appeler cet asset manquant à l'échelle du projet.

| État | Condition de passage |
|---|---|
| À inventorier | Existence non déterminée dans le périmètre audité |
| Manquant | Recherche dans le périmètre défini sans fichier correspondant |
| Spécifié | Dimensions, sujet, références attendues et critères écrits |
| Demandé | Génération réellement lancée et identifiant de lot conservé |
| Échec de génération | Outil terminé sans livrable; raison conservée sans déclarer de succès |
| Généré | Fichier réellement retourné; qualité et fidélité encore ouvertes |
| Validé | Contrôles visuels, techniques et source approuvés |
| Intégré | Manifeste moteur relié et rendu observé dans le jeu |

Le backlog joint contient 558 tâches groupées : 144 couches de décor, 96 props et 318 séquences pour les six pilotes. Il s'agit d'une structure de production; les fichiers individuels seront créés lorsque les séquences seront validées. Les panoramas maîtres et les premières poses générées sont suivis séparément dans le journal de génération pour empêcher qu'ils ne fassent artificiellement baisser le nombre d'animations à produire.

## Douze briefs du premier lot

Chaque brief doit recevoir la référence exacte avant validation de fidélité. Les images de personnages ont un fond transparent réel; les maîtres de décor sont opaques. Les textures de sol et les props sont séparés lorsqu'ils sont prévus pour l'assemblage.

1. Gordon Freeman de Half-Life 2 en HEV Mark V, un seul personnage entier en profil droit, pose d'attente lisible, pied de biche conforme à la référence, pas d'arme supplémentaire et aucune scène de fond.
2. Alyx Vance de Half-Life 2, un seul personnage entier en profil droit, équipement de cette version, proportions adultes, pas de gants gravitationnels ajoutés depuis Half-Life Alyx.
3. Combine Elite de Half-Life 2, un seul personnage entier en profil gauche, armure blanche et masque de cette version, silhouette complète et arme à contrôler sur la référence.
4. Vortigaunt de Half-Life 2, un seul sujet entier en profil droit, anatomie conforme à la source, mains et membre ventral lisibles, aucun effet masquant le corps.
5. Chambre du spectromètre de Half-Life original, panorama maître de combat latéral, plateau vide et continu, machine identifiable en arrière-plan, aucune interface, aucun combattant.
6. Parvis extérieur de la gare de Cité 17 de Half-Life 2, panorama maître latéral, pavés dégagés, façade néoclassique, postes Combine latéraux et Citadelle au loin, aucun personnage, aucun faux texte dans les panneaux.
7. Sol de la chambre du spectromètre dérivé du maître approuvé, seulement passerelle et bord avant, transparence autour, perspective et lumière inchangées.
8. Horizon distant du parvis de la gare dérivé du maître approuvé, uniquement silhouettes lointaines; séparer le ciel de la Citadelle pour les coefficients 0 et 0,12, sans pavés ni mobilier, alpha réel autour des volumes isolés.
9. Chargeur HEV mural de la version de Half-Life choisie, un seul prop isolé, vue adaptée à la scène, sans mur inventé ni ajout d'accessoires, signes et proportions à comparer à la référence.
10. Pied de biche de Gordon de Half-Life 2, une seule arme isolée, orientation de profil et pivot au manche, aucune main et aucune étincelle.
11. Lame de scie de Ravenholm, un seul prop de profil cohérent avec le plan de combat, matière et dents lisibles, pas de sang ajouté.
12. Caisse industrielle de la gare de Cité 17, un seul prop au même angle et à la même échelle que le maître, version intacte, fond transparent réel.

Ces briefs sont des spécifications; le journal réel fait foi pour les appels effectivement réussis ou échoués. Les prompts exacts, leurs références et les dates sont conservés avec le lot pour permettre une reprise ciblée.

## Contrôle avant intégration

Le contrôle du personnage compare d'abord identité et version, puis silhouette, proportions et accessoires. Il vérifie ensuite alpha, cadrage, pivot, continuité de pose, orientation et possibilité d'attacher les effets. Un rendu acceptable comme illustration peut être refusé comme frame si les pieds changent d'échelle, si le masque se déforme ou si le personnage change de costume entre deux images.

Le contrôle d'arène charge les six couches avec les coefficients réels et simule l'ensemble du déplacement de caméra. Aucun bord vide ne doit apparaître. Les points de fuite et l'éclairage ne changent pas lorsqu'une couche se déplace. Les deux combattants sont testés à chaque bord et au centre, dans leurs costumes les plus clairs et les plus sombres. Le mode effets réduits conserve toutes les informations utiles au combat. La conclusion de stage doit produire le même gagnant que sa version ignorée.

La première étape jouable peut se limiter à deux personnages, une arène et les actions fondamentales, mais chaque élément de cette étape doit être réel. Une animation absente reste indiquée comme absente, même si une pose fixe permet temporairement de vérifier le combat. Les couches et les séquences deviennent intégrées seulement après observation dans le moteur du projet.

## Sources des références visuelles

[A1] Valve, Half-Life, https://www.half-life.com/en/halflife. Consulté le 19 novembre 2026. Cadre de Black Mesa et expérience à l'origine de l'incident.

[A2] Valve, Half-Life 2, https://www.half-life.com/en/halflife2. Consulté le 19 novembre 2026. Cité 17, occupation Combine et résistance.

[A3] Gearbox Software et Valve, Half-Life Opposing Force sur Steam, https://store.steampowered.com/app/50/HalfLife_Opposing_Force/. Consulté le 19 novembre 2026. Jeu source distinct, perspective militaire à Black Mesa.

[A4] Gearbox Software et Valve, Half-Life Blue Shift sur Steam, https://store.steampowered.com/app/130/HalfLife_Blue_Shift/. Consulté le 19 novembre 2026. Jeu source distinct et rôle de Barney Calhoun.

[A5] Crowbar Collective, Black Mesa sur Steam, https://store.steampowered.com/app/362890/Black_Mesa. Consulté le 19 novembre 2026. Identification du remake comme réinterprétation, à distinguer de la source Half-Life.

[A6] Valve, Half-Life Alyx, https://www.half-life.com/en/alyx. Consulté le 19 novembre 2026. Époque intermédiaire, Cité 17 et résistance d'Alyx et Eli. Les topologies de niveaux et les équipements exacts doivent encore être validés dans les jeux sources.
