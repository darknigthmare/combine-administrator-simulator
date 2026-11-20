# Vision du mode Half Life Resonance

## Identité et objectif

Half Life Resonance est le mode de combat latéral proposé pour Half Life Administrator. Il rassemble des combattants, des équipements et des lieux issus de Half-Life dans des duels lisibles, des parcours individuels, une campagne originale, des défis et des tournois. Sa personnalité vient des outils scientifiques détournés, des armes militaires, de la technologie du Cartel et des organismes Xen. Le pied-de-biche, le Gravity Gun, les décharges vortigaunt et les tirs secondaires doivent modifier la manière de jouer, au-delà de leur apparence.

Cette bible fixe une première cible de 24 combattants, dont 12 dans la première vague, et de 24 arènes, dont 8 prioritaires. Six combattants pilotes servent de référence de production. Le catalogue principal sépare les versions d'un même personnage lorsqu'elles changent son équipement ou son fonctionnement. Des réserves d'extension permettent d'élargir ensuite le bestiaire sans faire passer une idée sommaire pour une fiche de production terminée.

Le joueur doit pouvoir lancer un duel en quelques choix, comprendre pourquoi une attaque a touché, apprendre une réponse en entraînement et retrouver dans chaque personnage une identité reconnaissable. La qualité attendue porte autant sur le retour à la garde, les changements de direction, les réactions aux impacts et les transitions de pose que sur les attaques spectaculaires.

## Périmètre des jeux sources

Le périmètre principal réunit Half-Life, Opposing Force, Blue Shift, Decay, Half-Life 2, Episode One, Episode Two et Half-Life Alyx. Les pages officielles situent le premier jeu autour de l'incident de Black Mesa, Half-Life 2 dans la résistance à l'occupation du Cartel et Alyx entre ces deux périodes [S1 à S3]. Opposing Force et Blue Shift apportent leurs points de vue militaires et de sécurité à Black Mesa [S4 et S5]. Decay conserve ses deux protagonistes et son origine coopérative ; les détails de modèles et de décors demandent une référence directe à l'édition PlayStation 2.

Les contenus Uplink, Lost Coast et les cartes de deathmatch sont réservés à des dossiers supplémentaires identifiés. Half-Life Source ne crée pas automatiquement de nouveaux personnages. Les variantes de modèles basse définition, du pack haute définition et des versions console sont étiquetées au lieu d'être mélangées dans un même costume. Le jeu Black Mesa de Crowbar Collective constitue une interprétation visuelle distincte : ses formes et ses environnements ne servent pas à certifier silencieusement les assets de Half-Life 1998.

Le menu permet de filtrer par jeu source, faction, difficulté de prise en main et style de combat. Un filtre d'époque limite les affrontements à une sélection cohérente lorsqu'on le souhaite. Le versus libre accepte les rencontres transversales comme une règle du mode annexe. Les pages de récit annoncent clairement quand une rencontre est créée pour Resonance.

## Place dans Half Life Administrator

Le point d'entrée proposé est un bouton Half Life Resonance parmi les modes annexes du menu principal. Il ouvre un écran indépendant présentant Duel, Histoire, Arcade, Tournoi, Entraînement et Archives. Une entrée dans un terminal de l'administrateur peut donner accès au même mode après déblocage narratif, sans obliger à démarrer une campagne de gestion pour jouer localement.

Le retour quitte proprement la session de combat et restaure l'écran d'origine. Une partie de combat ne consomme ni journées, ni rations, ni crédits de la simulation de gestion. Les sauvegardes sont séparées et versionnées. Les succès peuvent ouvrir un portrait, un dossier ou une variante visuelle ; ils ne modifient pas les dégâts, les points de vie ou les règles du versus compétitif.

L'habillage raconte un programme d'archives et de simulations tactiques compromis par des phénomènes de résonance. Ce cadre est une invention du mode, pas une explication officielle des événements de la série. Les archives présentent les identités d'origine ; la campagne met en scène ce que produit le programme lorsqu'il reconstruit des confrontations incompatibles. Cette distinction permet des rivaux inattendus tout en gardant visibles les événements des jeux sources.

## Les principes de fidélité

La fidélité 1:1 est un critère d'acceptation à démontrer. Elle porte sur la silhouette, les proportions, les couleurs, les détails d'équipement, la latéralité, les matériaux, la manière de tenir les armes, les signes anatomiques et le contexte du costume. Elle ne peut pas être déduite du seul nom de personnage placé dans une consigne de génération.

Chaque costume reçoit une fiche de référence avec le jeu et sa version, plusieurs captures cohérentes, une liste d'invariants et les angles à vérifier. Pour Gordon, la combinaison Mark IV et la Mark V sont deux dossiers différents. Pour Alyx, la tenue de Half-Life 2 et celle d'Alyx restent distinctes. Pour l'Élite du Cartel, l'œil central rouge, l'armure claire et le fusil doivent tous passer le contrôle. Pour un Vortigaunt, les proportions, le troisième bras, les yeux et l'état libre ou captif doivent être contrôlés séparément.

Les durées d'attaque, les dégâts, le système de garde, la Résonance, les combos, les supers, les fins de parcours et les rencontres entre personnages sont des adaptations de game design. Elles sont documentées comme telles. Une technique inspirée d'une arme connue n'est pas présentée comme une animation extraite du jeu original.

Le processus de validation emploie les états spécifié, référence approuvée, généré, correction requise, validé visuellement, validé en animation et intégré. Une image peut être générée avec transparence et rester incorrecte sur le plan du costume. Une boucle peut être visuellement propre et rester inutilisable si ses pieds glissent ou si ses boîtes de collision ne correspondent pas au geste.

## Direction visuelle

Les combattants sont de grands sprites 2D détaillés, avec une projection latérale stable, des proportions proches des sources et une lecture immédiate du geste. Les volumes sont rendus avec des matériaux crédibles, un éclairage principal cohérent et des contours propres. Le rendu conserve les particularités des jeux sans ajouter une musculature ou des accessoires étrangers au personnage.

Chaque image de production contient un seul personnage et une seule pose. Les armes détachables, accessoires, effets et ombres sont des fichiers séparés quand l'animation le demande. Les planches de comparaison servent à la vérification, pas à remplacer les frames individuelles livrées au moteur. Les pivots sont définis avant l'export des animations ; ils ne sont pas recalculés à partir du rectangle visible à chaque frame.

Le nombre d'images dessinées ne doit pas être confondu avec la fréquence de simulation. Une simulation à 60 Hz peut utiliser une pose durant plusieurs ticks. Le travail d'animation se concentre sur l'anticipation, le contact, la récupération et le retour à l'état suivant. Les attaques rapides demandent une silhouette franche au moment du contact ; les grands mouvements demandent des intermédiaires qui évitent la téléportation des armes et des mains.

Les palettes du monde distinguent la chaleur industrielle de Black Mesa, les bleus froids du Cartel, les ocres de Cité 17 et les matières organiques de Xen. Les effets offensifs restent séparés des détails décoratifs. L'éclat d'un super ne masque pas la direction de fuite ni le résultat de l'impact. Les options d'accessibilité réduisent secousses, flashs, particules et flou indépendamment.

## Personnages et variantes

Le premier ensemble de six pilotes associe Gordon de Half-Life 2, Alyx de Half-Life 2, Barney de Half-Life 2, Adrian Shephard, un Vortigaunt libre et l'Élite du Cartel. Il couvre les armes et la physique, l'agilité, la défense tactique, le soldat polyvalent, l'énergie extraterrestre et le contrôle à distance. Ce groupe permet de tester des réponses différentes à un projectile, une approche aérienne et une pression de garde.

Les variantes de tenue sont regroupées selon trois catégories. Une tenue issue d'un jeu source possède ses références propres. Une palette de lisibilité garde les formes et sert au miroir. Une tenue imaginée pour le mode porte une mention adaptation. Un changement de matériau ou de couleur ne devient pas un nouveau personnage jouable. Un équipement qui modifie réellement les commandes justifie en revanche une variante de kit distincte.

Les costumes cassés ou endommagés sont des états visuels explicites. Ils ne doivent pas effacer les détails d'identification ni créer un avantage par réduction apparente du corps. Les portraits, petites icônes, poses de sélection, expressions d'intro et poses de victoire font partie du même dossier de référence.

G-Man, les grandes entités et les machines hors échelle ne reçoivent pas arbitrairement une taille humaine et un kit ordinaire. Ils interviennent dans les cinématiques, les épreuves ou les combats de boss. Dog, le Hunter et les autres gabarits particuliers demandent une caméra et des tests de collision dédiés, avec une homologation explicite avant tout usage compétitif.

## Narration et mise en scène

Le mode histoire suit douze chapitres avec des transitions courtes, des objectifs de combat distincts et des checkpoints. Il accompagne le joueur vers les règles avancées : placement, garde, projection, gestion des tirs, ressources, accessoires et phases de boss. Un chapitre n'impose pas plusieurs fois un tutoriel déjà validé. Les séquences peuvent être revues depuis les archives.

Le parcours arcade individuel s'ouvre sur une intention claire, présente un rival propre au personnage et se termine par une fin originale. Une intro contextuelle est choisie lorsque la paire de combattants dispose d'une scène dédiée ; sinon, une entrée générale est utilisée. Gordon et Adrian s'expriment par gestes, regard, sons d'équipement et montage. On n'invente pas de répliques pour remplir leurs silences.

Une séquence d'avant combat comporte quatre événements techniques : apparition, placement, interaction éventuelle, retour à la pose neutre. Elle possède un état de saut propre qui place les deux combattants correctement sans rester bloqué dans une animation. Les séquences de victoire et de fin disposent de la même garantie. En ligne, le saut d'une scène est synchronisé et ne modifie pas l'instant de départ de la manche.

Les fatalités sont des conclusions optionnelles après le résultat acquis. Chaque combattant doit disposer d'une conclusion de signature, d'une alternative sans exécution et d'une sortie courte. Le jeu choisit des conclusions compatibles avec la relation entre les adversaires et le type de victime. Un duo allié en contexte d'entraînement utilise un désarmement, un sauvetage, une expulsion ou une capture. Les réglages de contenu peuvent remplacer une scène violente sans changer la récompense ni le résultat.

## Audio et sensation de jeu

Le paysage sonore distingue le contact d'une arme, le blocage, l'armure, la matière organique, l'énergie et le décor. La préparation d'un tir lourd produit un signal reconnaissable avant son départ. La balance du mix garde les commandes vocales et les signaux utiles audibles pendant la musique. Les sous-titres d'intro restent lisibles et leur taille est indépendante du HUD.

Le moteur utilise des événements sonores déterministes pour décider quoi jouer, puis laisse le mélange audio au rendu. Une restauration d'état lors d'un rollback ne doit pas rejouer plusieurs fois le même impact. Les voix nouvelles ne sont pas déclarées comme des enregistrements officiels. Les fichiers distribués doivent avoir une provenance connue et compatible avec le projet.

La musique peut progresser entre neutralité, tension, dernière manche et victoire. Une option autorise une piste fixe par arène pour le tournoi. Le menu propose des réglages séparés pour musique, effets, dialogues et annonceur. Les sons compétitifs ne sont pas remplacés par des effets silencieux lorsqu'on change de costume.

## Livrables et progression de production

La première étape jouable à réaliser réunit deux combattants, une arène sans danger, le cycle complet de manche, un entraînement avec enregistrement et les commandes essentielles. Elle doit confirmer le temps de réponse et les règles avant d'étendre le roster. Le deuxième lot ajoute les six pilotes et leurs interactions. Le troisième ajoute les douze combattants de première vague, les huit arènes prioritaires, les parcours arcade et le tournoi local. Les systèmes en ligne, les grandes campagnes et les extensions sont validés sur cette base.

Cette progression n'efface aucun contenu prévu : elle fixe les dépendances qui empêchent de multiplier des images ou des kits incompatibles. Les conditions de sortie sont observables : intégrité des sauvegardes, rejouabilité des entrées, absence de boucles infinies, stabilité des transitions, lisibilité à faible résolution et cohérence des variantes. Le registre de production garde la distinction entre la cible complète et les fichiers réellement disponibles.
