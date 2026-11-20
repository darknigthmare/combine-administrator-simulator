# Half Life Resonance — Boss Battle

Chapitre de bible, version 1.0 — 19 novembre 2026.

## 1. Objectif et état du mode

Boss Battle permet au personnage choisi d’affronter une menace hors du format du duel : synth tripode, aéronef, blindé, grande créature ou installation. Le mode reprend l’approche **Boss & Machines de CQC** : opérations dédiées, objectifs explicites, ressources, attaques annoncées, contre-mesures et bilan de mission. Le gabarit et le comportement de l’adversaire déterminent la rencontre. Un transporteur ne reçoit pas les règles d’un humanoïde agrandi.

Le premier module fonctionne avec **six pilotes, quatre rencontres et trois formats** : Opération libre, Boss Rush et Entraînement boss. Les quatre opérations sont Strider de Half-Life 2, Dropship et nacelle, Gunship et Gargantua de Half-Life 1998. Le catalogue complet documente **24 rencontres**, auxquelles s’ajoute **une archive Hydra désactivée**. Les vingt autres rencontres principales sont spécifiées, sans moteur de rencontre livré. Les versions Portal décrites plus bas ne sont donc pas jouables dans ce lot.

Le rendu schématique actuel utilise des décors candidats pour vérifier déplacements, immunités, objectifs et transitions. **Aucun sprite, décor ou cycle animé de boss n’est certifié fidèle 1:1.** Les dégâts, les trois phases d’une opération, les positions des équipements et les parcours transversaux sont des créations pour Resonance.

Les fichiers associés sont `data/boss_battle_catalog.json` pour les références, `data/boss_battle_rules.json` pour les règles et `data/boss_battle_production.json` pour les travaux visuels.

## 2. Accès, sélection et séparation des modes

L’entrée **Half Life Resonance · Boss Battle** ouvre le module depuis le menu principal. Le chemin direct est `?module=resonance-boss-battle`. La sélection présente le pilote, le format, la difficulté et, pour une opération simple, le boss. Son briefing annonce la vraie condition de victoire, l’équipement utile et la différence entre une cible vulnérable et une partie protégée.

Le combat utilise sa propre simulation et ses propres records, sans consommer les ressources de gestion ni modifier le duel compétitif. Les déblocages futurs seront des archives ou des cosmétiques ; ils n’augmenteront pas les dégâts du versus.

La cible de production est l’accès aux **24 combattants documentés**, puis aux extensions validées. Chaque arrivée exige un profil, ses animations, ses interactions d’équipement et un contrôle de toutes les conditions de victoire. Le nom d’un personnage dans le catalogue ne suffit pas à le rendre jouable. Les six pilotes actuels utilisent des profils mécaniques délimités ; leurs movesets complets de duel restent un autre chantier.

## 3. Pilotes et solutions accessibles

| Pilote actuel | Particularité mécanique présente | Spécial du prototype |
| --- | --- | --- |
| Gordon Freeman, HL2 | Profil polyvalent ; pied-de-biche et tir de SMG | Projection d’un débris contre les renforts |
| Alyx Vance, HL2 | Déplacement le plus rapide, vie plus faible | Percée, tir et récupération immédiate de l’esquive |
| Barney Calhoun, HL2 | Vie élevée et rythme plus prudent | Garde temporaire qui réduit les rafales blocables |
| Adrian Shephard, Opposing Force | Tir militaire et réponse explosive | Grenade, utile contre les renforts et Gargantua |
| Vortigaunt, HL2 | Décharge plus lente et plus forte | Arc concentré qui frappe et interrompt les renforts |
| Élite du Cartel, HL2 | Pression à distance | Orbe AR2, distincte de ses tirs ordinaires |

Le matériel indispensable appartient à l’arène lorsque le pilote ne le possède pas dans son identité. Le poste RPG commun permet ainsi au Vortigaunt d’actionner une installation sans lui attribuer un lance-roquettes inné. Les armes personnelles restent utiles contre les renforts et les cibles compatibles. Les orbes AR2 constituent une réponse valide au Strider et au Gunship ; une décharge vortale n’est pas automatiquement une orbe AR2.[^strider][^gunship]

Cette règle devra aussi couvrir les personnages uniquement de mêlée. Ils pourront activer un piège, manipuler une commande ou atteindre une arme montée. Pour White Forest, le dispositif Magnusson sera fourni par une station ; pour Aperture, un dispositif de terrain pourra assurer les redirections du mode libre. Ces équipements partagés sont des adaptations annoncées, pas des capacités ajoutées au canon.

La vérification examine les armes exclusives, les consommables perdus, les interactions inaccessibles et les passages masqués. Chaque rencontre conserve une solution répétable ou une reprise annoncée.

## 4. Actions et règles du prototype

| Action | Clavier initial | Fonction actuelle |
| --- | --- | --- |
| Déplacement | Flèches gauche/droite ; A/Q et D | Déplacement sur le plan latéral |
| Saut | Haut, W/Z ou Espace | Franchissement des ondes et repositionnement |
| Attaque légère | J | Coup de proximité, surtout utile contre les renforts |
| Tir | K | Projectile personnel ; cible les renforts proches lorsqu’ils sont présents |
| Spécial | L | Action propre au pilote, avec dépense de charge |
| Interaction | E | Ravitaillement, poste RPG, générateur ou décharge |
| Esquive | Majuscule | Déplacement bref avec protection limitée et récupération |
| Cible | R | Cycle entre les parties réellement disponibles |
| Pause | Échap ou P | Arrêt de la simulation active |
| Passer l’introduction | Entrée | Accès immédiat à la phase jouable |

Des commandes tactiles reproduisent ces actions. Déplacement et tir peuvent être maintenus ; les interactions, changements de cible et commandes de pause sont déclenchés par une pression. Le prototype ne présente pas une garde universelle capable d’arrêter tous les coups. Les couverts protègent des rafales compatibles ; la garde de Barney réduit ces attaques. Les canons, flammes et écrasements demandent une autre réponse.

La simulation avance à 60 ticks par seconde, indépendamment de l’affichage. L’introduction dure 150 ticks et ne fait pas avancer le temps de combat. La pause suspend positions, attaques, projectiles et horloge. La perte de focus entraîne une pause. Les dangers actifs sont décrits par une zone, une anticipation, une durée et une conséquence ; un même danger ne cumule pas des dégâts à chaque image.

Le poste RPG dispose de trois roquettes transportables et d’un temps de récupération entre tirs. La caisse réapprovisionne cette réserve. Les générateurs de Gargantua demandent deux armements, puis une décharge centrale ; celle-ci consomme les deux charges. L’interface doit désigner ces lieux par leurs noms et leurs repères visuels, jamais par des coordonnées techniques.

## 5. Déroulement, lecture et caméra

Une opération suit une introduction, un briefing court, une phase active, des évolutions de pression et un résultat. L’introduction place les acteurs sans attaque anticipée. Son saut doit produire exactement la même situation de départ que sa lecture complète. Aucun ennemi ne commence son attaque pendant que le joueur regarde encore le briefing.

Le prototype annonce les attaques par un texte et une zone au sol. Les productions finales ajouteront l’anticipation corporelle, le son et des formes distinctes. Une alerte de canon implique un déplacement ; une rafale suggère un couvert ; une onde au sol appelle un saut. La couleur complète ces signes, sans constituer l’unique information. Une montée de difficulté raccourcit des fenêtres dans une limite lisible et augmente les conséquences ; elle ne supprime pas les contre-mesures enseignées.

Le cadrage actuel garde l’arène entière lisible. La caméra de production devra suivre le personnage sans perdre la cible, son signal d’attaque ni le prochain refuge. Le Strider conserve sa hauteur ; Gonarch conserve son volume ; un aéronef garde sa trajectoire en hauteur. Les collisions restent dans le plan de jeu, tandis que l’échelle et la parallaxe donnent la profondeur. Une transition de zone ne déplace pas arbitrairement le joueur au contact d’un danger.

Une phase correspond à un changement de décision : rejoindre l’équipement, ouvrir une fenêtre, traiter un renfort ou finir un objectif. Elle n’exige pas systématiquement une nouvelle armure destructible. Pour le Dropship, la phase finale est le retrait et la sécurisation. Pour Jeff, ce sera l’enfermement et la sortie. Pour les Tentacules, ce sera l’allumage du dispositif.

## 6. Catalogue des 24 rencontres

Les phases ci-dessous sont des **adaptations 2D originales**. Les identités et comportements de référence sont sourcés ; leur découpage en trois étapes ne prétend pas reproduire des seuils officiels. « Prototype » signifie jouable avec rendu de travail ; « Prévu » signifie documenté, sans rencontre intégrée.

| Rencontre | Source précise | Résolution attendue | État |
| --- | --- | --- | --- |
| Strider urbain | Half-Life 2 | Destruction par armement adapté | Prototype |
| Dropship et nacelle | Half-Life 2 | Nacelle, renforts puis retrait | Prototype |
| Gunship | Half-Life 2 / Episode One | Destruction de l’aéronef | Prototype HL2 |
| Gargantua de Power Up | Half-Life 1998 | Piège électrique | Prototype |
| Striders de White Forest | Episode Two | Défense et dispositifs Magnusson | Prévu |
| Strider du parking | Half-Life: Alyx | Rejoindre puis utiliser le canon monté | Prévu |
| Hunter-Chopper des canaux | Half-Life 2 | Riposte au canon d’airboat | Prévu |
| Hunter-Chopper de Station 21 | Episode Two | Renvoi de bombes | Prévu |
| APC Combine | Half-Life 2 | Neutralisation du véhicule | Prévu |
| Gonarch | Half-Life 1998 | Sac abdominal et poursuite entre zones | Prévu |
| Nihilanth | Half-Life 1998 | Cristaux, protection, crâne ouvert | Prévu |
| Tentacules de Blast Pit | Half-Life 1998 | Trois systèmes puis allumage | Prévu |
| Pit Worm | Opposing Force | Commandes du traitement toxique | Prévu |
| Gene Worm | Opposing Force | Yeux puis cavité abdominale | Prévu |
| Antlion Guard | Half-Life 2 | Combat et destruction | Prévu |
| Guardian des tunnels | Episode Two | Fuite avec objectif | Prévu |
| Jeff | Half-Life: Alyx | Distraction, piège et sortie | Prévu |
| Apache HECU | Half-Life 1998 | Destruction de l’hélicoptère | Prévu |
| Guardian en surface | Episode Two | Combat distinct des tunnels | Prévu |
| Advisor et extraction | Episode Two, rencontre originale | Sauvetage ou extraction | Prévu |
| GLaDOS | Portal | Cœurs et incinérateur | Prévu |
| Wheatley, corps central | Portal 2 | Cœurs, transfert et portail lunaire | Prévu |
| Abrams HECU | Half-Life 1998 | Neutralisation d’un emplacement immobile | Prévu |
| Bradley HECU | Half-Life 1998 | Destruction de la tourelle | Prévu |

### 6.1 Strider urbain — contact, contre-attaque, pression finale

La rencontre conserve le tripode, ses rafales, son canon et ses frappes de pattes. Les jambes ne deviennent ni des segments arrachables ni des points faibles rouges. La première phase conduit au poste RPG ; la deuxième organise tirs et ravitaillement sous couverture ; la dernière rapproche les attaques. Les orbes AR2 sont une autre réponse valide. La victoire exige la destruction du corps ; rester en vie ne suffit pas.[^strider]

### 6.2 Dropship — approche, interception, sécurisation

Le transport et sa nacelle sont séparés. Son corps aérien reste invulnérable aux armes du joueur ; la mitrailleuse appartient à la nacelle. Pendant l’approche, le joueur lit les rafales. Pendant l’interception, il sélectionne la nacelle et traite les soldats débarqués. Après destruction de la cargaison, il termine les renforts et attend le retrait. Le résultat s’intitule « Débarquement intercepté », jamais « Dropship abattu ».[^dropship_code][^dropship]

### 6.3 Gunship — repérage, interception, dernière passe

Le synth aérien conserve sa silhouette et son fonctionnement distinct du Hunter-Chopper. Le joueur observe la passe, attaque entre les rafales et recommence sous une pression accrue. Le prototype peut faire intercepter une roquette par une rafale ; il simplifie son guidage. RPG et orbes AR2 peuvent l’endommager. Il n’y a ni largage de bombes ni cœur ventral inventé. Le duel s’achève uniquement après sa destruction.[^gunship]

### 6.4 Gargantua — alimentation, placement, décharge

Le modèle ciblé est celui de 1998. Les balles ricochent ; les explosifs constituent une réponse valide et Power Up fournit la référence du piège électrique. Le joueur arme deux générateurs, prépare une fenêtre et déclenche la commande quand le monstre traverse la cage. Trois décharges suffisent dans le réglage actuel ; ce chiffre appartient au prototype. Les flammes imposent le recul, l’onde impose le saut. L’œil n’est pas un point faible.[^garg_code][^garg]

### 6.5 White Forest — escorte, fixation, défense

Les Hunters menacent le dispositif Magnusson ; le Strider menace l’objectif à défendre. La première phase ouvre une route, la deuxième fixe puis déclenche un dispositif, la troisième force à prioriser le groupe suivant. La vie du silo devient une condition d’échec distincte de celle du combattant. Un projecteur physique de terrain permettra les sélections libres ; la reconstitution avec Gordon conservera son Gravity Gun. Le Magnusson reste un équipement fourni par station.[^ep2_commentary]

### 6.6 Strider de Half-Life: Alyx — traque, percée, riposte

Cette version garde ses propres proportions et sa séquence d’accès à l’arme montée. Traverser le parking et atteindre les couverts constituent les deux premières phases ; l’usage du canon lourd conclut la rencontre. L’arsenal porté d’Alyx ne remplace pas cette solution. Le mode ne réutilise donc pas automatiquement le poste RPG urbain. La caméra doit préserver la lecture des passages avant de cadrer la riposte.[^alyx_commentary]

### 6.7 Hunter-Chopper des canaux — poursuite, riposte, bombardement

La référence Water Hazard associe rafales, bombes et canon d’airboat. L’adaptation commence par l’accès au poste de riposte, poursuit par un suivi de trajectoire et termine par une passe de bombardement laissant des intervalles franchissables. Un poste fixe peut adapter le canon au combat latéral. Son usage est annoncé au briefing. La silhouette mécanique, les rotors et les attaques restent ceux du Hunter-Chopper.[^chopper]

### 6.8 Hunter-Chopper de Station 21 — pression, renvoi, répétition

Episode Two fournit une autre réponse : retourner ses bombes avec le Gravity Gun. Le joueur repère une bombe exploitable, prépare son renvoi, puis répète le cycle au milieu des autres dangers. La temporisation d’explosion reste visible ; aucune bombe n’est conservée indéfiniment. Un appareil de terrain pourra remplir ce rôle pour les autres combattants. Cette variante garde sa propre fiche et ne fusionne pas avec la solution airboat.[^chopper]

### 6.9 APC Combine — barrage, ouverture, neutralisation

Le véhicule utilise son canon et ses missiles ; explosifs, RPG ou canon d’airboat constituent des réponses adaptées. Le joueur traverse le barrage, place ses dégâts durant une récupération puis sécurise la neutralisation. La présence d’un blindage ne justifie pas un réacteur arrière rouge fictif. Les pièces destructibles ne seront ajoutées que si leur comportement est établi pour la version retenue. L’approvisionnement reste accessible à tous les pilotes.[^apc]

### 6.10 Gonarch — exposition, repli, dernière fosse

Le sac abdominal est la cible vulnérable, avec acide, frappes de pattes et petits Headcrabs comme pressions complémentaires. Le joueur cherche d’abord l’angle de tir, suit le repli vers la zone suivante, puis termine dans la dernière fosse. Chaque transfert conserve une issue lisible et un point de reprise. La référence demeure Half-Life 1998 : le modèle et la chorégraphie du remake Black Mesa demanderaient une variante séparée.[^gonarch]

### 6.11 Nihilanth — recharge, protection, crâne ouvert

La première phase traite les cristaux, la deuxième épuise la protection restante en gérant les téléportations et les ennemis, la troisième donne accès à l’intérieur du crâne. Des dispositifs de montée rendent l’angle final accessible au roster. La barre de progression doit expliquer pourquoi une cible reste protégée. Aucun coup ne traverse arbitrairement le crâne fermé. Les éléments ajoutés par d’autres adaptations ne sont pas fusionnés avec le combat de 1998.[^nihilanth][^nihilanth_code]

### 6.12 Tentacules — repérage sonore, circuits, allumage

Les tentacules réagissent au bruit et aux vibrations. Un leurre ouvre une traversée ; des trajets latéraux rétablissent oxygène, carburant et électricité ; le retour à la commande permet l’allumage. L’interface suit trois systèmes, pas trois barres de vie. Une interruption par dégâts crée une fenêtre sans résoudre la rencontre. La difficulté peut modifier les chemins et la pression, mais aucun circuit essentiel ne doit disparaître après consommation d’un objet.[^tentacle]

### 6.13 Pit Worm — observation, réseau, traitement

Le grand œil annonce le rayon. Tirer dessus provoque une interruption utile ; cela ne tue pas le boss. La rencontre consiste à lire cette menace, activer les commandes industrielles, puis déclencher le déversement toxique. Chaque traversée s’appuie sur une rétraction ou une protection solide. Le compteur principal représente l’avancement du dispositif. Le Pit Worm conserve sa solution environnementale au lieu de devenir une cible répétitive à points de vie.[^pitworm]

### 6.14 Gene Worm — yeux, cavité, renforts

Les deux lasers fixes neutralisent les yeux avant l’ouverture abdominale. Pendant cette fenêtre, le joueur vise le fond de la cavité ; l’orbe du portail n’est pas la surface de dégâts. Les renforts compliquent ensuite l’accès aux lasers et relancent le cycle. Le HUD doit distinguer yeux, ouverture et cible valide. Les angles de visée en 2D seront vérifiés avec chaque gabarit avant d’ouvrir la rencontre au roster complet.[^geneworm]

### 6.15 Antlion Guard — charge, réponse, pression

Le Guard peut être tué. Ses charges, coups et projections d’objets structurent le combat : provoquer l’engagement, éviter la trajectoire, frapper pendant la récupération. Les renforts de la dernière phase sont une proposition de mission, à identifier comme telle. Le Bugbait ne donne pas un contrôle gratuit du Guard. Les objets physiques et explosifs du terrain permettent des réponses différentes sans modifier son identité.[^guard]

### 6.16 Guardian des tunnels — réveil, poursuite, extraction

La version souterraine d’Episode Two est invulnérable pendant la poursuite. Les refuges et passages étroits constituent la réponse au gabarit du monstre. Le joueur identifie d’abord un abri, traverse entre les charges, puis atteint la sortie avec l’objectif. Les indicateurs présentent distance, sécurité et progression ; aucune barre de vie trompeuse ne suggère une victoire par dégâts. Cette fiche possède des règles séparées de la version de surface.[^guardian]

### 6.17 Jeff — distraction, manœuvre, piège

Jeff est aveugle, suit les sons et ne meurt pas par tirs ordinaires. Les bouteilles éloignent sa recherche ; les interactions et les spores mettent le déplacement sous pression. La dernière phase l’enferme et ouvre la sortie. Le compactage est une conclusion facultative, avec la même récompense que l’enfermement suivi d’une fuite. Les réactions au bruit doivent être expliquées sans transformer sa détection en poursuite omnisciente.[^jeff][^alyx_commentary]

### 6.18 Apache HECU — survol, tir lourd, destruction

L’Apache de Surface Tension conserve son matériel militaire et ses rotors. Le RPG et le Tau Cannon chargé sont des réponses pertinentes ; les résistances exactes doivent être contrôlées sur la version source avant d’imposer des immunités. Le joueur rejoint un couvert, suit l’appareil pendant l’ouverture et change d’abri pendant la riposte. Un poste d’armement compense les kits incompatibles. L’hélicoptère ne reçoit aucune anatomie de synth.[^apache]

### 6.19 Guardian en surface — sortie, affrontement, passage sûr

La rencontre de Freeman Pontifex permet de vaincre le Guardian et inclut un Antlion Guard. La première phase expose les trajectoires, la deuxième combine les deux menaces et les objets physiques, la dernière sécurise le passage. Le combat ne reprend pas l’invulnérabilité des tunnels. La visibilité de surface et les distances d’engagement justifient une arène propre, avec suffisamment d’espace pour distinguer les charges simultanées.[^guardian][^ep2_commentary]

### 6.20 Advisor — présence, interruption, extraction

L’identité de l’Advisor comprend télékinésie et capture ; les séquences publiées ne fournissent pas un duel standard avec un cœur vulnérable démontré. La rencontre proposée est donc explicitement **un scénario original** : identifier la zone de capture, provoquer une interruption conçue pour la mission, puis extraire une personne ou atteindre la sortie. Aucun moyen de tuer l’Advisor n’est déclaré canonique. Les interactions précises doivent encore être prototypées.[^advisor]

### 6.21 GLaDOS de Portal — découverte, redirection, dernier cœur

Le premier cœur détaché doit être incinéré ; les roquettes redirigées par portails détachent les suivants. La progression traite les quatre cœurs sous contrainte de neurotoxine et de temps. La première phase apprend l’incinérateur, la deuxième organise les redirections, la dernière conclut le cycle. Le corps reste celui de Portal. Les adaptations d’équipement pour les autres personnages sont prévues, sans leur attribuer silencieusement un Portal Gun.[^glados][^portal_chamber]

### 6.22 Wheatley — bombes, cœurs, transfert

La finale de Portal 2 combine conduite de gel de conversion, bombes redirigées, trois cœurs corrompus, transfert, bouton piégé et portail lunaire. Les trois phases du mode regroupent ces étapes sans les remplacer par des dégâts de mêlée. La conclusion éjecte Wheatley dans l’espace ; elle ne le déclare pas tué. Les cœurs, la chambre et le corps endommagé restent distincts de ceux de Portal.[^wheatley][^portal2_commentary]

### 6.23 Abrams HECU — barrage, position de riposte, neutralisation

L’Abrams de Half-Life 1998 est un emplacement immobile construit dans la géométrie du niveau. Sa tourelle, son canon et les éventuelles armes associées organisent les lignes de tir. Le joueur lit leur rotation, atteint une position de riposte et neutralise la variante retenue. Le profil de dégâts dépend de la carte source : il reste à vérifier. Aucune poursuite roulante ni immunité universelle aux balles n’est ajoutée par principe.[^abrams]

### 6.24 Bradley HECU — interdiction, manœuvre, tourelle détruite

Une configuration choisit le canon de 25 mm ou le lanceur de missiles ; les deux variantes ne sont pas cumulées arbitrairement. La tourelle est destructible et une approche au corps à corps, notamment au pied-de-biche, est possible. La variante missile permet un contre lié au guidage RPG. La rencontre passe du couvert à l’angle d’attaque, puis à la destruction de tourelle. Les explosifs ne sont donc pas l’unique réponse imposée.[^bradley]

## 7. Archive Hydra et périmètre des extensions

L’Hydra appartient au contenu abandonné de Half-Life 2. Code, prototypes et démonstrations permettent de documenter des formes et des mouvements, sans fournir un combat finalisé livré dans le jeu. Sa fiche reste désactivée : recherche des références, prototype isolé puis validation. Toute phase inventée sera étiquetée reconstruction originale. Elle n’entre pas dans le Rush des versions publiées.[^hydra][^hl2_anniversary]

Les futurs dossiers devront distinguer contenu officiel publié, contenu coupé attesté et création alternative. Cette bible ne présente pas Half-Life 3 comme un jeu disponible ni comme une source visuelle acquise. Une annonce, un document de développement ou un concept isolé ne clôture jamais la validation d’un personnage, d’une arène ou d’un boss.

## 8. Formats, difficulté et résultats

**Opération libre** lance la rencontre choisie. **Entraînement boss** conserve au minimum un point de vie et exclut ses résultats des records. **Boss Rush** enchaîne réellement Strider, Dropship, Gunship et Gargantua, avec un bilan intermédiaire et une action explicite pour poursuivre. Il restaure 30 % de la vie maximale, ajoute 30 points de charge et remplit la réserve RPG entre deux rencontres, dans les limites des jauges.

Le bouton de rejeu du Rush lance un nouveau parcours depuis le premier boss. Le moteur possède aussi une reprise d’étape qui incrémente le nombre de continuations et exclut le parcours des records ; ce mécanisme ne doit pas être confondu avec un départ neuf. Une défaite interrompt la tentative. Une victoire confirmée fige son résultat et empêche de gagner encore des points en laissant tourner l’écran final.

Les difficultés Découverte, Normal et Vétéran modifient dégâts reçus et anticipations, sans changer l’objectif. Les records locaux sont séparés par personnage, opération ou parcours, format et difficulté. Le score récompense victoire, vie restante, temps actif et renforts neutralisés. Le Rush cumule scores et temps ; son rang global est le plus faible des quatre rangs de rencontre. Aucun classement réseau n’est livré.

**Chroniques par jeu**, **relais de trois personnages**, **coopération à deux** et **opérations personnalisées** sont uniquement spécifiés. La coopération devra donner des tâches complémentaires et une caméra commune lisible ; le relais devra placer ses changements à une défaite ou un checkpoint autorisé. Aucun tag instantané, service en ligne ou rollback n’est revendiqué. Les parcours narratifs seront des simulations originales clairement identifiées.

## 9. Introductions et fins des six pilotes

Les propositions suivantes sont des **séquences narratives à produire**, distinctes du briefing jouable actuel. Elles ne constituent pas des scènes officielles. Chaque intro prépare un objectif ; chaque fin répond à l’action accomplie. Les versions non verbales de Gordon et Shephard sont conservées.

| Pilote | Introduction originale prévue | Fin originale prévue |
| --- | --- | --- |
| Gordon | Une roquette roule jusqu’à ses bottes. Il vérifie le poste, regarde le passage menacé et pose le pied-de-biche contre la caisse. | Il coupe le relais qui reconstruisait les menaces, récupère son arme et ouvre la porte aux silhouettes restées à couvert. |
| Alyx | Elle remet une commande en service, repère deux abris et teste le trajet jusqu’à la sortie. | Elle efface le verrouillage du secteur, transmet la route sûre et quitte l’arène avant que le système ne relance un cycle. |
| Barney | Il fait passer un civil, ferme la grille derrière lui et constate que le poste de tir demeure accessible. | Il maintient le passage jusqu’au dernier évacué, vérifie la liste et éteint son indicatif radio. |
| Shephard | Il inspecte une caisse de munitions, vérifie l’itinéraire et marque au sol le point de repli. Aucun dialogue ajouté. | Il laisse le matériel utile près des survivants, récupère sa clé à griffe et disparaît dans le couloir de service. |
| Vortigaunt | Il approche d’une installation endommagée, en suit les impulsions et libère sa commande bloquée. | Il rompt la boucle du relais, guide les prisonniers vers le passage et laisse l’installation devenir silencieuse. |
| Élite | Un ordre de neutralisation vise une anomalie de simulation. L’unité calibre son AR2 et inspecte le poste lourd. | Le relais demande un nouveau cycle ; l’unité coupe son alimentation. La scène laisse cette décision ouverte, sans la déclarer évolution canonique du Cartel. |

Des variations couvrent destruction, interception, désactivation et extraction. Ces fins restent des récits de Resonance, sans attribuer au personnage une participation aux événements officiels.

## 10. Conclusions, fatalités et présentation non violente

Une finition de boss intervient après acquisition du résultat. Elle ne peut pas voler une victoire, consommer une ressource nécessaire ou modifier le score. La compatibilité dépend de la rencontre : chute d’un Strider, perte de contrôle d’un aéronef, effondrement d’une nacelle, extinction d’un mécanisme ou fermeture d’un piège. Une animation de projection humaine ne s’applique pas à une machine hors échelle.

Le Dropship repart ; Wheatley est éjecté ; un Guardian souterrain est dépassé ; Jeff peut rester enfermé. Ces résolutions ne sont pas remplacées par une exécution générique. La variante non violente utilise une évacuation, une silhouette distante, une extinction de lumière ou un retour sur le personnage après l’événement. Elle conserve durée utile, résultat et récompense. Les cinématiques de finition restent à produire ; le prototype dispose d’un écran de résultat.

## 11. Fidélité visuelle, animation et production

Chaque boss possède une fiche verrouillant jeu, édition, silhouette, échelle, anatomie, matériaux, armement, orientation et comportement. Les versions HL2, Episode Two et Alyx d’un Strider ne partagent pas automatiquement un modèle. Les modèles basse définition, haute définition, console et remake ne sont pas mélangés dans une même référence. Une source textuelle établit une règle, mais ne remplace pas les captures nécessaires à une validation visuelle.

La production respecte **un sujet et une pose par image**. Les frames restent individuelles ; les armes détachables, nacelles, effets et ombres peuvent être des fichiers séparés. Un élément démontable ne devient pas pour autant destructible en jeu. Les pivots, points d’attache et boîtes de collision doivent conserver leur position entre les frames, même lorsque la silhouette dépasse le cadrage ordinaire d’un combattant.

Chaque attaque comprend anticipation, activité, récupération et retour à l’attente. Arrivée, locomotion, réaction valide, réaction sur blindage, changement de phase et départ ou défaite demandent des séquences distinctes. Le déplacement des pattes d’un Strider doit conserver ses appuis ; un aéronef doit garder une trajectoire lisible ; une nacelle doit rester attachée jusqu’à sa rupture prévue. La fréquence de simulation ne remplace pas les dessins intermédiaires.

Les arènes utilisent six couches : **L00 ambiance, L01 lointain, L02 intermédiaire, L03 proche, L04 sol et L05 premier plan**. Les couches décoratives ne portent pas les collisions. Les postes, refuges et surfaces interactives disposent de repères stables ; les effets de brouillard ne masquent pas une zone de danger. Le premier plan s’efface si nécessaire pour laisser lire une interaction.

Le lot initial recense **72 groupes de travail : 12 groupes de références ou d’animation et 6 couches d’arène pour chacun des quatre boss**. Leur état est « spécifié, non produit » : **zéro groupe graphique terminé** dans ce registre. Le rendu schématique ne clôture aucun groupe. La certification 1:1 exige comparaison source, correction des détails, vérification de mouvement, intégration puis observation en jeu.

## 12. Vérification et critères d’extension

Le moteur livré possède des tests de déterminisme, d’absence de mutation, d’arrêt pendant les pauses et introductions, d’immunités, d’interception des roquettes, de circuits électriques et de résultats stables. Un pilote commandé par entrées réalise les 24 associations des six personnages et des quatre boss en difficulté Découverte. Cette vérification ne valide pas l’équilibrage en Normal ou Vétéran. Le Rush complet, l’entraînement et les continuations hors records sont également vérifiés. Ces contrôles ne certifient ni qualité d’animation ni équilibrage final.

Une nouvelle rencontre ne devient sélectionnable qu’après validation de sa vraie condition de victoire, d’une issue pour tous les personnages autorisés, de sa reprise après échec et de la lisibilité de chaque danger. Les objectifs environnementaux doivent être testés avec ressources manquantes, ordre d’interaction différent et changement de phase. Une extension ne transforme pas une fiche d’archive ou une idée alternative en contenu officiel.

## Références

Les identifiants ci-dessous correspondent au registre de sources du catalogue, consulté le 19 novembre 2026. Les commentaires Valve sont conservés sous forme de transcriptions ; les pages communautaires servent de références secondaires. Les captures directes de la version choisie restent nécessaires à l’acceptation visuelle.

[^strider]: [Strider et variantes](https://www.combineoverwiki.net/wiki/Strider).

[^ep2_commentary]: [Commentaires Valve Episode Two](https://combineoverwiki.net/wiki/Developer_commentary/Half-Life_2:_Episode_Two).

[^alyx_commentary]: [Commentaires Valve Half-Life Alyx](https://combineoverwiki.net/wiki/Developer_commentary/Half-Life:_Alyx).

[^dropship_code]: [Valve Source SDK Dropship](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/hl2/npc_combinedropship.cpp).

[^dropship]: [Dropship et nacelle](https://www.combineoverwiki.net/wiki/Combine_Dropship).

[^gunship]: [Gunship](https://www.combineoverwiki.net/wiki/Combine_Gunship).

[^chopper]: [Hunter Chopper](https://www.combineoverwiki.net/wiki/Hunter-Chopper).

[^apc]: [APC du Cartel](https://www.combineoverwiki.net/wiki/Armored_Personnel_Carrier).

[^garg_code]: [Valve Half Life Gargantua](https://github.com/ValveSoftware/halflife/blob/master/dlls/gargantua.cpp).

[^garg]: [Gargantua et rencontres](https://www.combineoverwiki.net/wiki/Gargantua).

[^gonarch]: [Gonarch](https://www.combineoverwiki.net/wiki/Gonarch).

[^nihilanth]: [Nihilanth](https://www.combineoverwiki.net/wiki/Nihilanth).

[^nihilanth_code]: [Valve Half Life Nihilanth](https://github.com/ValveSoftware/halflife/blob/master/dlls/nihilanth.cpp).

[^tentacle]: [Tentacles et Blast Pit](https://www.combineoverwiki.net/wiki/Tentacle).

[^pitworm]: [Pit Worm](https://combineoverwiki.net/wiki/Pit_Worm).

[^geneworm]: [Gene Worm](https://combineoverwiki.net/wiki/Gene_Worm).

[^guard]: [Antlion Guard](https://www.combineoverwiki.net/wiki/Antlion_Guard).

[^guardian]: [Antlion Guardian](https://combineoverwiki.net/wiki/Antlion_Guardian).

[^jeff]: [Jeff](https://combineoverwiki.net/wiki/Jeff).

[^apache]: [AH 64 Apache](https://www.combineoverwiki.net/wiki/AH-64_Apache).

[^advisor]: [Advisor](https://combineoverwiki.net/wiki/Advisor).

[^glados]: [GLaDOS](https://theportalwiki.com/wiki/GLaDOS).

[^wheatley]: [Wheatley](https://theportalwiki.com/wiki/Wheatley).

[^abrams]: [M1A1 Abrams](https://combineoverwiki.net/wiki/M1A1_Abrams).

[^bradley]: [M2A3 Bradley](https://combineoverwiki.net/wiki/M2A3_Bradley).

[^hydra]: [Hydra cut content](https://combineoverwiki.net/wiki/Hydra).

[^portal_chamber]: [Finale de Portal escape_02](https://theportalwiki.com/wiki/Portal_GLaDOS%27_Chamber).

[^portal2_commentary]: [Commentaires Valve Portal 2](https://theportalwiki.com/wiki/Portal_2_developer_commentary).

[^hl2_anniversary]: [Valve Half Life 2 vingtième anniversaire](https://www.half-life.com/fr/halflife2/20th/).
