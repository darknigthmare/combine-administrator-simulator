# Bible Resonance — Machines du Cartel et production des rencontres

Lot D du 20 novembre 2026 · référence de lecture du moteur : `25b3392`.

Ce chapitre précise la production de cinq rencontres déjà cataloguées : Strider, Dropship avec nacelle, Gunship, APC et Hunter Chopper. Il fournit leurs contrats de silhouette, de dégâts, de collision et d’animation, ainsi que les plans de six couches de Ravenholm, Nova Prospekt et des Canaux. Le fichier associé, `docs/resonance/data/combine_encounter_design_20261120.json`, contient les identifiants, budgets, paramètres et listes de vérification exploitables par la production.

**Ces profils ne livrent aucun nouveau comportement de jeu.** Le moteur Boss Battle observé possède toujours quatre boss : Strider, Dropship, Gunship et Gargantua. Dans ce chapitre, trois profils développent les prototypes existants ; APC et Hunter Chopper restent des rencontres documentaires. Aucun de ces cinq appareils ne reçoit une case de combattant jouable. Les illustrations produites dans d’autres travaux du lot D ont leur propre registre ; une pose, même retenue, ne valide ni les clips décrits ici, ni les hitboxes, ni les six fichiers d’un décor.

La métadonnée `source_game` des douze réserves a été intégrée séparément dans `roster.json`, avec sa provenance documentaire, puis vérifiée en lecture. Le présent chapitre conserve l’état d’origine dans `baseline_source_game_in_roster: null`, rattaché à `25b3392`. Les recommandations de modèles, de versions et de comportement restent documentaires. Cette attribution de jeu n’accorde aucune jouabilité et ne certifie aucune image.

## 1. Périmètre et conventions

| Livrable de conception | Quantité | Statut |
| --- | --- | --- |
| Profils de machines existantes | 5 | 3 prototypes déjà actifs, 2 documentaires |
| Profils de phases | 15 | Libellés du catalogue conservés |
| Profils d’attaque ou de déploiement | 13 | 6 relevés du prototype, 7 propositions |
| Zones de collision | 17 | Géométrie proposée, à ajuster aux images approuvées |
| Clips d’animation | 77 | Planifiés ; aucun clip produit par ce document |
| Dessins ciblés par orientation | 557 | Budget prévisionnel, distinct d’un nombre de fichiers livrés |
| Demandes de vues de référence des machines | 30 | 6 vues par machine ; mesures à acquérir |
| Stages / couches / props conservés | 3 / 18 / 12 | Plans de production, sans nouveau fond intégré |
| Réserves documentées | 12 | source_game intégré séparément ; autres champs proposés |
| Contrôles de production / scénarios de recette | 43 / 16 | À exécuter lors de la production et de l’intégration |
| Sources | 22 | Code officiel fixé par commit et attribution documentaire |

### Ce qui relève de Valve, du projet ou d’une proposition

Les résumés **source** décrivent uniquement les chemins consultés du code officiel. Ils ne remplacent pas la vérification d’un build commercial, d’un réglage de difficulté ou d’un script de carte. Les invariants visuels sont repris du catalogue existant et doivent être confrontés à des captures versionnées. Les champs `source_behavior_summary` et `source_ids` servent à retrouver ces preuves.

Les valeurs **observées dans Resonance** sont isolées dans `runtime_snapshot` et portent la référence `25b3392`. Les séquences 2D, jauges, récupérations, phases, contre-jeux et volumes proposés constituent du design original. Une entrée `proposed_not_implemented` ne décrit pas une fonction active. Les tableaux ci-dessous emploient les noms du catalogue, tandis que l’interface du prototype peut employer d’autres libellés de phase : les deux nomenclatures sont conservées dans le JSON.

**Temps :** 60 ticks logiques par seconde. Une valeur de 90 ticks correspond à 1,5 seconde de simulation. Les nombres de dessins indiqués pour les clips mesurent un budget artistique, pas une durée : huit dessins peuvent être tenus ou répartis sur une séquence de 90 ticks. Le lecteur d’animation ne crée jamais de dégâts par lui-même.

**Dégâts :** la colonne D indique les dégâts infligés au combattant dans l’échelle du prototype. Ses combattants possèdent entre 10 500 et 13 000 PV à la référence lue. Les boss utilisent une autre échelle, par exemple 1 200 PV pour le Strider ; comparer directement « 1 300 de rafale » et « 1 200 PV de boss » serait trompeur. La garde indiquée concerne uniquement le pattern de Resonance, pas une possibilité de parer ce véhicule dans Half-Life 2.

**Coordonnées :** le prototype Boss Battle possède une largeur logique de 1 280. Le contrat des stages de duel utilise un monde de 2 560, une fenêtre de 1 920 × 1 080 et un sol à y = 880. Tout rapprochement exige un adaptateur explicite. Les boîtes normalisées du JSON sont des guides pour les futures poses, pas des hitboxes extraites des modèles Valve.

### Cadence actuelle et limites de la lecture

Pour les six patterns existants, les valeurs présentées correspondent à la phase 0, difficulté normale. Le moteur applique ensuite `max(42, base + difficulté − phase × 5)` au télégraphe : histoire +20, normale 0, difficile −12. La récupération vaut `max(45, 115 − phase × 18 − ajustement difficile)`, ce dernier ajustement étant 18. Ces formules sont celles du projet ; elles ne sont pas attribuées au SDK.

Une interaction valide déclenche immédiatement le ravitaillement ou le tir et affiche l’état `interact` pendant 18 ticks. Le joueur porte au maximum trois roquettes ; le poste de ravitaillement possède une récupération de 100 ticks et le lanceur de 90 ticks. Une roquette inflige 300 dégâts à une cible admissible. Cette dotation appartient au terrain et permet aux profils autorisés de résoudre la rencontre sans leur ajouter un lanceur permanent. Toute nouvelle animation devra rendre l’accès, la prise et le tir lisibles sans déplacer ces événements de simulation.

## 2. Références, échelle et fichiers à produire

### Versionner la preuve avant la fidélité

Les références techniques principales sont les dépôts officiels `ValveSoftware/source-sdk-2013`, commit `3e957b70b167929f120360115d359d1ecb4c1699`, et `ValveSoftware/halflife`, commit `b1b5cf5892918535619b2937bb927e46cb097ba1`. Chaque fichier de code utilisé possède son empreinte SHA-256 et les symboles consultés dans le JSON. Une modification ultérieure de la branche distante ne change donc pas la référence de ce chapitre.

Le profil visuel `HL2_RETAIL_SOURCE_BASE_D01` vise la campagne de base Half-Life 2. Son identifiant de build reste à renseigner. Les six demandes par machine couvrent côté droit, côté gauche, face ou arrière pour les asymétries, attache d’arme, état endommagé et comparaison avec un humain dans une caméra comparable. Il faut enregistrer carte, position ou timecode, FOV, modèle, skin, bodygroup, rendu et empreinte de capture. La page officielle anniversaire fournit un contexte de référence ; elle n’établit pas à elle seule une dimension ou l’architecture exacte de chaque rencontre. [CB07]

Une référence d’Episode Two ne remplit pas automatiquement le dossier de `strider_hl2`. Elle peut servir à une cible de variante déjà identifiée, avec sa propre provenance. De même, un rendu de Gunship ne remplace pas le Hunter Chopper, même si certains chemins du SDK partagent des mécanismes de vol. Le nom d’une classe logicielle ne suffit pas à certifier une silhouette.

### Mesure par témoin humain

On définit H comme la hauteur du témoin humain dans une projection comparable. Les ratios suivants servent uniquement à préparer le cadrage 2D. **Ils ne constituent pas des dimensions canoniques mesurées.** Le JSON conserve `source_measured_ratios: null` et `measurement_status: not_measured`. La capture doit permettre de séparer profondeur, perspective et adaptation de caméra ; une réduction graphique pour faire tenir le boss à l’écran se consigne comme adaptation.

| Machine | Cibles de cadrage, non mesurées | Échelle source validée |
| --- | --- | --- |
| Strider de Cité 17 | hauteur debout : 4.6 H ; largeur d’appui : 3.4 H ; hauteur accroupie : 3.2 H | Non |
| Dropship et nacelle de débarquement | envergure du porteur : 5.4 H ; hauteur du porteur : 1.9 H ; longueur de nacelle : 2.7 H ; hauteur de nacelle : 1.25 H | Non |
| Gunship du Cartel | longueur du corps : 4.5 H ; hauteur du corps : 1.6 H ; diamètre du ventilateur : 1.05 H | Non |
| APC du Cartel | longueur du véhicule : 3.2 H ; hauteur de coque : 1.25 H ; hauteur avec tourelle : 1.7 H | Non |
| Hunter Chopper des canaux | longueur entière : 5.4 H ; diamètre du rotor principal : 4.0 H ; hauteur du fuselage : 1.65 H | Non |

### Contrat de fichiers individuels

Un fichier représente un sujet et une pose. Les acteurs utilisent un fond transparent ; le décor et la caméra restent hors de ces fichiers. Le chemin prévu est `assets/resonance/production/bosses/{target_id}/{orientation}/{state}/{frame:04d}.png`, avec `left` et `right` documentés séparément. Un miroir automatique ne vaut pas contrôle des asymétries. Chaque clip conserve son pivot, son rectangle de référence et les attaches des effets.

Les tracés de tir, fumées, impacts, ombres et projectiles sont des effets séparés. La nacelle reste un sujet distinct du porteur ; une bombe sortie de l’hélicoptère devient un acteur indépendant. Les débris de fin ne récupèrent pas implicitement une collision offensive. Le budget de 557 dessins par orientation, soit 1 114 pour deux orientations, est une estimation de travail pour 77 clips : aucune de ces unités n’est comptée comme image réalisée.

Pour chaque attaque, la simulation traverse les intervalles `[0,T)`, `[T,T+A)` et `[T+A,T+A+R)`. T est le télégraphe, A la fenêtre active, R la récupération. Les noms d’événements du JSON sont des points de raccordement ; leurs positions exactes dans les clips attendent les images approuvées. Une pause, un saut de frame ou une boucle visuelle ne doit produire ni second projectile, ni second soldat, ni seconde dose de dégâts.

Une application de dégâts est identifiée par le couple attaque/réservoir de santé. Plusieurs volumes partageant le même réservoir ne multiplient pas l’impact. Les patterns multiples proposés pour APC et hélicoptère sont plafonnés à une application par attaque au stade de cette conception ; une autre règle exigerait une décision d’équilibrage explicite.

## 3. Profils de rencontre

Dans les tableaux d’attaque, T/A/R sont les durées en ticks. « Observé » désigne le prototype Resonance à la référence lue ; « proposé » désigne le travail restant à intégrer. Les phases numérotées appartiennent au catalogue de rencontres, sans prétendre reproduire des chapitres ou scripts officiels.

### 3.1. Strider de Cité 17 — `strider_hl2`

Le Strider se lit d’abord par ses trois longues pattes, son corps haut et ses deux armes distinctes. La production doit conserver les trois chaînes d’appui pendant la marche, l’abaissement et la chute. Une patte cachée par la profondeur garde son existence dans la pose et la collision ; elle ne se transforme pas en quatrième membre au changement de vue.

**Source.** Le code officiel possède un traitement explicite des balles Combine, avec un chemin particulier pour l’AR2. Les explosions admissibles sont traitées sur le corps ; la branche de dégâts ordinaires placée sous `#if 0` est inactive. `BigGun` et `MiniGun` sont des attaches distinctes. Les chemins consultés n’établissent pas de santé indépendante pour un genou ou une patte. [CB01] [CB06]

**Adaptation de rencontre.** Le RPG et la réserve sont des équipements de terrain. La rafale enseigne l’usage du couvert ; l’écrasement impose un déplacement ; le canon demande de quitter la zone annoncée. Le joueur doit pouvoir relire le membre choisi avant l’impact. Le flash du canon ne remplace pas la forme de son télégraphe, afin que la réduction des effets lumineux conserve le même contre-jeu.

**Ancrage de catalogue :** `BBA_STRIDER_HL2`, stage de base `STG_11_HL2_STATION`, victoire `destroy_boss`. Le nouveau profil est `production_design_not_implemented` ; son existence ne change pas l’état du prototype.

#### Assemblage, réception et armes

| Élément | Volume proposé | Réservoir | Rôle et contrôle |
| --- | --- | --- | --- |
| Corps | ellipse | boss | Recevoir le RPG sur la masse centrale, jamais sur une tache rouge inventée. |
| Patte 1 | capsule | aucun | Capsule à reconstruire depuis chaque pose; pas de PV de genou. |
| Patte 2 | capsule | aucun | Même règle; pas de détachement à un seuil de dégâts. |
| Patte 3 | capsule | aucun | La troisième patte peut passer en profondeur, elle ne disparaît pas du cycle. |

Les coordonnées normalisées sont conservées dans le JSON et seront ajustées à chaque pose approuvée. Aucun de ces volumes ne possède un multiplicateur de point faible indépendant.

| Arme / événement | Attache logique | Règle de production |
| --- | --- | --- |
| Tir de suppression | `MiniGun` | Effet de bouche indépendant du corps; suivre orientation du canon. |
| Canon à distorsion | `BigGun` | La charge, le tir et l’impact sont des événements séparés. |
| Frappe de patte | `selected_foot_contact` | Le télégraphe indique l’appui choisi; aucune jambe surnuméraire pour l’animation. |

#### Télégraphes et fenêtres

| Pattern | Origine | T / A / R | D | Garde | Télégraphe et réponse |
| --- | --- | --- | --- | --- | --- |
| Rafale | observé | 70 / 34 / 115 | 1300 | oui | Orientation du MiniGun, ligne de secteur et signal bref. Couvert ou esquive; utiliser la récupération pour le RPG. |
| Écrasement | observé | 65 / 20 / 115 | 2100 | non | Patte identifiée levée et zone de contact bornée. S’éloigner de l’appui ou sauter selon la règle actuelle. |
| Canon à distorsion | observé | 90 / 18 / 115 | 2600 | non | Charge au BigGun et marque au sol; destination fixée à la création de l’attaque actuelle. Quitter la zone annoncée; la garde ne remplace pas le déplacement. |

#### Phases et transition de résultat

| Phase du catalogue | Objectif | Consigne de production |
| --- | --- | --- |
| 1 — Contact | Rejoindre le poste de tir | Faire découvrir couvert, réserve et poste RPG avant de demander une rotation de positions. |
| 2 — Contre attaque | Atteindre le corps au RPG | Cadrer les fenêtres après rafale/écrasement; aucune nouvelle faiblesse anatomique. |
| 3 — Pression finale | Détruire le Strider | Augmenter la pression par cadence prévue, jamais supprimer le télégraphe. |

**Lecture du prototype :** 1200 PV de boss ; libellés actuels : Patrouille, Suppression, Dernière avancée. Les deux seuils sont les deux tiers et le tiers de PV restants.

**Fin :** Valider la neutralisation puis jouer la chute; aucun écrasement tardif après résultat.

#### États et fichiers d’animation à produire

| Relation d’états proposée | Contrat |
| --- | --- |
| entry | enter → idle ou walk. Le déplacement conserve trois pistes de contact de patte. |
| attack | burst_aim → burst_fire → recover; cannon_charge → cannon_fire → recover; stomp_prepare → stomp_contact → recover. |
| height | crouch_down → crouch_idle → rise, sans lancer une seconde attaque pendant la transition. |
| interrupt | heavy_flinch suspend les demandes non engagées; les événements déjà partis restent attachés à leur identifiant. |
| terminal | death_fall → wreck_settle; aucune boucle de combat ne redémarre. |

| État / dossier | Dessins par orientation | Boucle | Finalité |
| --- | --- | --- | --- |
| `enter` | 8 | non | apparition entière |
| `idle` | 8 | oui | équilibre des trois pattes |
| `walk` | 12 | oui | contacts alternés sans glissement |
| `crouch_down` | 6 | non | corps abaissé sans raccourcir les membres |
| `crouch_idle` | 6 | oui | pose basse |
| `rise` | 6 | non | retour à la hauteur |
| `burst_aim` | 5 | non | axe MiniGun |
| `burst_fire` | 6 | oui | rafale |
| `cannon_charge` | 8 | non | charge du BigGun |
| `cannon_fire` | 5 | non | départ du canon |
| `stomp_prepare` | 6 | non | levée de patte |
| `stomp_contact` | 4 | non | impact local |
| `recover` | 6 | non | reprise d’appui |
| `heavy_flinch` | 6 | non | réaction du corps sans perte de patte |
| `death_fall` | 14 | non | chute de l’ensemble |
| `wreck_settle` | 5 | non | fin du mouvement |

Budget du profil : **16 clips**, **111 dessins par orientation**. Chaque ligne utilise le chemin de fichiers individuels défini en section 2 ; toutes restent `planned_not_generated` et `runtime_clip_wired: false`.

#### Liste de contrôle de production

- [ ] Compter exactement trois pattes sur toute la boucle.
- [ ] Comparer la hauteur debout et accroupie sans tricher par squash global.
- [ ] Aligner BigGun et MiniGun sur leurs événements.
- [ ] Séparer réception de projectiles sur le corps et frappe de patte.
- [ ] Ne produire ni genou rouge ni membre arraché comme faiblesse canonique.

### 3.2. Dropship et nacelle de débarquement — `dropship_hl2`

Le sujet est un transporteur invulnérable portant une nacelle attaquable, avec des soldats individualisés. Cette séparation gouverne le dessin, les pivots, la sélection de cible, les dégâts et la victoire. Aucun moteur rouge, canon supplémentaire sur le porteur ou état « transport abattu » n’est introduit pour rendre la rencontre plus conventionnelle.

**Source.** Le code crée `prop_dropship_container` séparément et l’attache au transport. Le chemin de dégâts du porteur renvoie zéro et peut transmettre l’impact à la nacelle. Celle-ci filtre notamment explosions et dégâts AIRBOAT ; le même impact peut être dédupliqué lorsqu’il traverse les deux chemins. Les attaches de tir sont lues sur la nacelle. Les flags de carte pouvant aussi protéger celle-ci doivent être distingués du choix d’une nacelle destructible dans cette rencontre. [CB02]

**Adaptation de rencontre.** Le prototype donne 900 PV à l’objectif de cargaison. Sa phase de déploiement commence à 240 ticks actifs ; les renforts apparaissent actuellement un cycle sur deux, dans la limite de trois simultanés. Le déploiement de 72/24/90 ci-dessous est une proposition de synchronisation future, pas une animation déjà branchée. À zéro PV de cargaison, annuler les futures attaques et sorties de trappe, laisser les soldats présents continuer et montrer le retrait intact du transporteur. Le retrait actuel dure 180 ticks ; la victoire attend aussi l’élimination des renforts.

**Ancrage de catalogue :** `BBA_DROPSHIP_HL2`, stage de base `STG_15_HL2_NOVA`, victoire `destroy_cargo_and_clear_reinforcements`. Le nouveau profil est `production_design_not_implemented` ; son existence ne change pas l’état du prototype.

#### Assemblage, réception et armes

| Élément | Volume proposé | Réservoir | Rôle et contrôle |
| --- | --- | --- | --- |
| Porteur | ellipse | aucun | Sélection possible avec retour invulnérable; aucune jauge de moteur. |
| Nacelle | box | cargo | Seule santé de grande cible dans cette rencontre. |
| Canon de nacelle | capsule | cargo | Pas de tourelle détachable ni multiplicateur de point faible ajouté. |
| Sortie des renforts | box | aucun | Ne reçoit pas de dégâts; chaque renfort possède ensuite sa collision propre. |

Les coordonnées normalisées sont conservées dans le JSON et seront ajustées à chaque pose approuvée. Aucun de ces volumes ne possède un multiplicateur de point faible indépendant.

| Arme / événement | Attache logique | Règle de production |
| --- | --- | --- |
| Mitrailleuse de nacelle | `cargo.muzzle` | Le porteur n’a pas une deuxième mitrailleuse dessinée par erreur. |
| Débarquement | `cargo.deploy_landpoint` | Soldats individualisés, entrée et appui visibles. |

#### Télégraphes et fenêtres

| Pattern | Origine | T / A / R | D | Garde | Télégraphe et réponse |
| --- | --- | --- | --- | --- | --- |
| Rafale de nacelle | observé | 75 / 32 / 115 | 1200 | oui | Rotation du canon ventral, secteur de tir et bref signal. Changer de couvert; cibler explicitement la nacelle. |
| Débarquement visible | proposé | 72 / 24 / 90 | 0 | non | Nacelle stabilisée, trappe annoncée et aire d’arrivée visible. Intercepter le soldat après son apparition, sans frapper un marqueur vide. |

#### Phases et transition de résultat

| Phase du catalogue | Objectif | Consigne de production |
| --- | --- | --- |
| 1 — Approche | Lire les passes de la nacelle | Montrer porteur et nacelle comme deux cibles nommées. |
| 2 — Interception | Neutraliser la nacelle | Faire alterner tir sur cargaison et gestion des renforts; pas de double comptage de blast. |
| 3 — Sécurisation | Éliminer les renforts restants | Désactiver les attaques de nacelle, animer le départ intact et attendre les renforts restants. |

**Lecture du prototype :** 900 PV de nacelle ; libellés actuels : Approche, Débarquement, Retrait du transport. Les déclencheurs temporel et de destruction sont décrits ci-dessus.

**Fin :** Libellé d’interception ou débarquement neutralisé; ne jamais écrire Dropship abattu.

#### États et fichiers d’animation à produire

| Relation d’états proposée | Contrat |
| --- | --- |
| entry | carrier_approach → carrier_brake → carrier_hover_loaded; la nacelle suit une attache stable. |
| attack | cargo_aim → cargo_fire, indépendamment du maintien du porteur. |
| deploy | cargo_open → troop_exit → troop_land; un acteur n’est créé qu’une fois à l’événement de sortie. |
| cargo_loss | cargo_destroy puis carrier_release; supprimer feu et déploiements futurs, garder les soldats déjà présents. |
| terminal | carrier_hover_empty → carrier_depart; victoire après retrait et élimination des renforts. |

| État / dossier | Dessins par orientation | Boucle | Finalité |
| --- | --- | --- | --- |
| `carrier_approach` | 10 | oui | vol avec nacelle |
| `carrier_brake` | 6 | non | ralentissement |
| `carrier_hover_loaded` | 10 | oui | porteur avec attache chargée |
| `cargo_aim` | 5 | non | orientation du canon |
| `cargo_fire` | 5 | oui | bouche et recul |
| `cargo_open` | 6 | non | trappe |
| `troop_exit` | 8 | non | sortie un acteur par frame |
| `troop_land` | 4 | non | contact sol |
| `cargo_hit` | 5 | non | impact lourd |
| `cargo_smoke` | 6 | oui | fumée en FX séparé |
| `cargo_destroy` | 12 | non | destruction de nacelle seule |
| `carrier_release` | 6 | non | détachement |
| `carrier_hover_empty` | 8 | oui | porteur sans nacelle |
| `carrier_depart` | 10 | non | retrait intact |
| `cargo_debris_settle` | 6 | non | débris sans nouvelle collision offensive |

Budget du profil : **15 clips**, **107 dessins par orientation**. Chaque ligne utilise le chemin de fichiers individuels défini en section 2 ; toutes restent `planned_not_generated` et `runtime_clip_wired: false`.

#### Liste de contrôle de production

- [ ] Séparer les pivots porteur/nacelle et leur attache.
- [ ] Placer tous les FX de mitrailleuse sur la nacelle.
- [ ] Prévoir chargement et retrait sans nacelle; aucune explosion du porteur.
- [ ] Empêcher une double application d’explosion sur cargaison via plusieurs zones.
- [ ] Ne faire apparaître un renfort actif qu’au passage de sortie prévu.

### 3.3. Gunship du Cartel — `gunship_hl2`

Le Gunship doit conserver sa silhouette synthétique, son canon frontal et son ventilateur arrière. Il n’emprunte ni le rotor central d’un hélicoptère, ni la nacelle et les soldats d’un Dropship. Son mouvement organise la lecture des passes ; l’interception est une action de son canon, pas une arme additionnelle inventée.

**Source.** Les traces de balles ordinaires sont écartées et les explosions passent par un filtre de dégâts. La logique de tir inclut la défense contre les missiles. Le fichier contient aussi des variantes de modèle et d’attaque au sol, qui ne suffisent pas à établir leur présence dans la scène retail choisie. Les indicateurs anti-dissolution imposent de ne pas assimiler automatiquement l’orbe du prototype à toutes les interactions d’une balle Combine du jeu source. [CB03] [CB06]

**Adaptation de rencontre.** Le prototype travaille avec une trajectoire de RPG simplifiée. Pendant la rafale active, une roquette suffisamment proche peut être interceptée ; le seuil lu est de 200 unités logiques. Une fenêtre de repositionnement doit rendre la riposte compréhensible. Le joueur ne doit pas apprendre une règle visuelle fausse, par exemple viser le ventilateur comme un réservoir séparé. La chute finale reste à distance de la voie de déplacement après résolution du combat.

**Ancrage de catalogue :** `BBA_GUNSHIP_HL2`, stage de base `STG_15_HL2_NOVA`, victoire `destroy_boss`. Le nouveau profil est `production_design_not_implemented` ; son existence ne change pas l’état du prototype.

#### Assemblage, réception et armes

| Élément | Volume proposé | Réservoir | Rôle et contrôle |
| --- | --- | --- | --- |
| Corps | ellipse | boss | Réception sur le fuselage; pas de cockpit humain ajouté. |
| Ventilateur arrière | ellipse | boss | Animation mécanique distincte; aucune jauge ou casse indépendante. |
| Canon frontal | capsule | boss | Aligner visée et FX; pas de nacelle de transport. |

Les coordonnées normalisées sont conservées dans le JSON et seront ajustées à chaque pose approuvée. Aucun de ces volumes ne possède un multiplicateur de point faible indépendant.

| Arme / événement | Attache logique | Règle de production |
| --- | --- | --- |
| Canon frontal | `muzzle` | Canon unique servant également à l’interception. |
| Interception de roquette | `muzzle` | Action de défense de trajectoire; ne pas ajouter un second lance-missiles visuel. |

#### Télégraphes et fenêtres

| Pattern | Origine | T / A / R | D | Garde | Télégraphe et réponse |
| --- | --- | --- | --- | --- | --- |
| Rafale et interception | observé | 80 / 75 / 115 | 1500 | oui | Nez orienté et bande de suppression indiquée. Tirer après la salve; les roquettes proches peuvent être interceptées. |
| Passe à impulsions | observé | 70 / 24 / 115 | 2100 | oui | Inclinaison avant passe et bande prévue. Couverture ou esquive puis changement de poste. |

#### Phases et transition de résultat

| Phase du catalogue | Objectif | Consigne de production |
| --- | --- | --- |
| 1 — Repérage | Observer la passe de suppression | Enseigner couverture et perte possible d’une roquette pendant interception. |
| 2 — Interception | Faire parvenir une roquette | Montrer une fenêtre de repositionnement exploitable sans modifier le blindage. |
| 3 — Dernière passe | Confirmer la destruction | Changer de poste en conservant la distinction des passes; chute hors voie. |

**Lecture du prototype :** 1000 PV de boss ; libellés actuels : Passe de reconnaissance, Feu de suppression, Rupture de trajectoire. Les deux seuils sont les deux tiers et le tiers de PV restants.

**Fin :** Neutralisation puis chute à distance; pas de collision tardive sur le héros après résultat.

#### États et fichiers d’animation à produire

| Relation d’états proposée | Contrat |
| --- | --- |
| entry | approach → hover; ventilateur et masse centrale restent cohérents pendant les inclinaisons. |
| attack | aim → burst → recover ou bank_left/bank_right → strafe_pass → recover. |
| defense | intercept_turn → intercept_fire → recover; même canon que la rafale. |
| interrupt | heavy_hit → damaged_flight; les traces de tir déjà engagées gardent leur propriétaire. |
| terminal | death_spiral → distant_impact; la piste du joueur n’acquiert pas un nouveau volume de crash. |

| État / dossier | Dessins par orientation | Boucle | Finalité |
| --- | --- | --- | --- |
| `approach` | 10 | oui | entrée en vol |
| `hover` | 10 | oui | maintien propulsif |
| `bank_left` | 7 | non | inclinaison |
| `bank_right` | 7 | non | inclinaison opposée |
| `aim` | 5 | non | nez et canon |
| `burst` | 6 | oui | rafale |
| `intercept_turn` | 6 | non | visée vers roquette |
| `intercept_fire` | 4 | non | tir défensif |
| `strafe_pass` | 10 | oui | passe latérale |
| `recover` | 7 | non | repositionnement |
| `heavy_hit` | 6 | non | déviation du fuselage |
| `damaged_flight` | 8 | oui | fumée distincte |
| `death_spiral` | 14 | non | chute distante |
| `distant_impact` | 7 | non | impact hors voie |

Budget du profil : **14 clips**, **107 dessins par orientation**. Chaque ligne utilise le chemin de fichiers individuels défini en section 2 ; toutes restent `planned_not_generated` et `runtime_clip_wired: false`.

#### Liste de contrôle de production

- [ ] Ne dessiner ni rotor central, ni nacelle de soldats, ni silhouette de Dropship.
- [ ] Maintenir le ventilateur arrière pendant toutes les inclinaisons.
- [ ] Faire sortir le tir offensif et défensif du même canon.
- [ ] Séparer l’interception réellement visible de la destruction de la roquette.
- [ ] Garder ground attack hors kit tant qu’une version/scène approuvée ne l’exige pas.

### 3.4. APC du Cartel — `apc_hl2`

L’APC reste une rencontre documentée, absente des identifiants jouables du moteur Boss Battle. Le profil prépare un véhicule roulant, sa coque, ses roues, sa tourelle, son tir et ses missiles. Le nombre et l’implantation des roues doivent être relevés dans la référence retenue, sans déduire l’autre flanc d’une silhouette incomplète.

**Source.** `CPropAPC::OnTakeDamage` traite notamment BLAST et AIRBOAT. Le code distingue les tirs du véhicule, les missiles et une séquence de tir lors de sa fin. Cela n’établit ni vulnérabilité d’un pneu, ni réacteur exposé, ni tourelle destructible séparée. Le modèle étant fourni dans le contexte de carte, le chemin de modèle proposé doit encore être confirmé par la capture retenue. [CB04]

**Adaptation de rencontre.** Un poste lourd ou un canon monté permet la riposte. Le véhicule prépare une salve dont les destinations se verrouillent avant le lancement. Les deux impacts annoncés laissent un corridor atteignable ; les dessins et numéros maintiennent cette information sans dépendre seulement de couleurs. La dernière attaque est un état vivant optionnel, entièrement résolu avant la confirmation de victoire. L’épave ne lance ensuite aucun projectile et ne bloque pas arbitrairement la sortie.

**Ancrage de catalogue :** `BBA_APC_HL2`, stage de base `STG_12_HL2_CANALS`, victoire `destroy_boss`. Le nouveau profil est `production_design_not_implemented` ; son existence ne change pas l’état du prototype.

#### Assemblage, réception et armes

| Élément | Volume proposé | Réservoir | Rôle et contrôle |
| --- | --- | --- | --- |
| Coque blindée | box | boss | Pas de noyau lumineux ajouté. |
| Roues visibles | capsule | boss | Nombre et essieux à relever dans la même référence; pas de pneus destructibles inventés. |
| Tourelle | box | boss | Attache de canon et missiles distincts, aucune barre de tourelle. |

Les coordonnées normalisées sont conservées dans le JSON et seront ajustées à chaque pose approuvée. Aucun de ces volumes ne possède un multiplicateur de point faible indépendant.

| Arme / événement | Attache logique | Règle de production |
| --- | --- | --- |
| Canon | `machinegun_muzzle` | Nom logique à aligner avec l’attache retenue dans le modèle. |
| Salve de missiles | `cannon_muzzle` | Projectile séparé du tracé du canon; sélection de côté et trajectoire explicites. |

#### Télégraphes et fenêtres

| Pattern | Origine | T / A / R | D | Garde | Télégraphe et réponse |
| --- | --- | --- | --- | --- | --- |
| Rafale de barrage | proposé | 78 / 36 / 102 | 1100 | oui | Tourelle tourne, bouche orientée, secteur marqué. Couvert; sortie après le dernier impact annoncé. |
| Salve de missiles | proposé | 96 / 42 / 126 | 1900 | non | Deux points d’impact successifs, ordre affiché par formes numérotées. Se déplacer vers le corridor libre; aucun suivi caché après verrouillage. |
| Dernier tir avant neutralisation | proposé | 108 / 24 / 144 | 2100 | non | Préparation plus longue et unique destination verrouillée. Réserver une fenêtre de tir lourd puis quitter le point annoncé. |

#### Phases et transition de résultat

| Phase du catalogue | Objectif | Consigne de production |
| --- | --- | --- |
| 1 — Barrage | Passer la salve de missiles | Accès au couvert et à un poste lourd avant la première salve. |
| 2 — Ouverture | Placer les dégâts lourds | Alternance canon/missiles, fenêtre de riposte après récupération. |
| 3 — Neutralisation | Détruire le véhicule | Dernier tir signalé avant résultat, puis aucune attaque post-victoire. |

**Lecture du prototype :** aucun profil actif, aucune jauge ni aucun seuil de phase intégré pour cette cible. Les durées proposées demandent une future recette de déplacement et de riposte.

**Fin :** Épave immobile, voie dégagée; aucune poursuite de dommages après le résultat.

#### États et fichiers d’animation à produire

| Relation d’états proposée | Contrat |
| --- | --- |
| entry | enter_drive → brake → idle; roues et coque partagent la vitesse de translation. |
| attack | turret_track → gun_prepare → gun_fire → recover ou missile_prepare → missile_launch → recover. |
| reposition | reposition revient à idle avant une nouvelle préparation; aucune visée téléportée. |
| damage | heavy_hit puis damaged_idle; aucune roue n’est retirée pour fabriquer un palier. |
| terminal | final_attack est un état vivant optionnel, ensuite destroy → wreck; aucune salve après victoire. |

| État / dossier | Dessins par orientation | Boucle | Finalité |
| --- | --- | --- | --- |
| `enter_drive` | 10 | oui | véhicule entier |
| `brake` | 5 | non | arrêt de roues et coque |
| `idle` | 6 | oui | tourelle stable |
| `turret_track` | 6 | oui | rotation sans glisser la coque |
| `gun_prepare` | 4 | non | orientation |
| `gun_fire` | 5 | oui | rafale |
| `missile_prepare` | 6 | non | ouverture/attache source à capturer |
| `missile_launch` | 5 | non | départ séparé |
| `recover` | 6 | non | reprise de visée |
| `reposition` | 10 | oui | translation sur roues |
| `heavy_hit` | 5 | non | réaction sans faux blindage arraché |
| `damaged_idle` | 6 | oui | fumée graduelle |
| `final_attack` | 7 | non | dernier tir avant résultat |
| `destroy` | 12 | non | neutralisation |
| `wreck` | 6 | oui | épave immobile |

Budget du profil : **15 clips**, **99 dessins par orientation**. Chaque ligne utilise le chemin de fichiers individuels défini en section 2 ; toutes restent `planned_not_generated` et `runtime_clip_wired: false`.

#### Liste de contrôle de production

- [ ] Fixer le nombre de roues et les essieux d’après la référence; pas de symétrie devinée.
- [ ] Canon, missiles et fumée possèdent leurs sorties propres.
- [ ] RPG et explosifs admissibles atteignent le même réservoir de vie.
- [ ] Aucune destruction séparée de roues ou canon n’est déclarée canonique.
- [ ] La salve finale se termine avant confirmation de victoire, sans projectiles hostiles résiduels.

### 3.5. Hunter Chopper des canaux — `hunter_chopper_hl2`

Le Hunter Chopper garde un rotor principal, un fuselage et un empennage d’hélicoptère, avec des bombes séparées. Le passage aérien ne transforme pas l’appareil en Gunship. Ce profil reste documentaire : ni ce boss, ni une section d’airboat complète ne sont ajoutés au moteur par le chapitre.

**Source.** Le filtre consulté accepte notamment AIRBOAT et les entités classées missiles. La propriété d’une bombe intervient dans ses dégâts au propre hélicoptère ; une bombe simplement tombée ne devient donc pas automatiquement un projectile allié. Des règles de carte peuvent modifier l’invulnérabilité. Ces chemins ne décrivent pas le rotor comme une faiblesse indépendante. [CB05]

**Adaptation de rencontre.** La proposition emploie un canon inspiré de l’airboat sur un poste fixe, ou, si un futur mode l’assume, une section véhicule distincte. La version fixe est une transformation 2D déclarée. Trois trajectoires de bombes se verrouillent avant leurs départs et conservent une sortie sur toute la séquence, y compris pour le profil autorisé le moins rapide. Une éventuelle récupération de bombe exige sa propre prise, son transfert de propriétaire et ses règles de collision ; elle n’est pas activée par ce document. Un rotor dessiné ne crée pas non plus un danger au sol implicite.

**Ancrage de catalogue :** `BBA_HUNTER_CHOPPER_HL2`, stage de base `STG_12_HL2_CANALS`, victoire `destroy_boss`. Le nouveau profil est `production_design_not_implemented` ; son existence ne change pas l’état du prototype.

#### Assemblage, réception et armes

| Élément | Volume proposé | Réservoir | Rôle et contrôle |
| --- | --- | --- | --- |
| Fuselage | ellipse | boss | Pas de cockpit humain transparent ajouté. |
| Rotor principal | capsule | aucun | Garder hors du plan de collision du joueur; aucun disque létal implicite. |
| Trappe de bombes | box | aucun | Le marqueur n’est pas un point faible; bombes avec collision propre. |

Les coordonnées normalisées sont conservées dans le JSON et seront ajustées à chaque pose approuvée. Aucun de ces volumes ne possède un multiplicateur de point faible indépendant.

| Arme / événement | Attache logique | Règle de production |
| --- | --- | --- |
| Canon | `gun_muzzle` | Alignement exact du modèle à relever, canon indépendant du rotor. |
| Bombes | `bomb_release` | Objet distinct avec chute et signaux; jamais missile de Gunship. |

#### Télégraphes et fenêtres

| Pattern | Origine | T / A / R | D | Garde | Télégraphe et réponse |
| --- | --- | --- | --- | --- | --- |
| Rafale de poursuite | proposé | 84 / 36 / 96 | 1400 | oui | Fuselage incliné et axe de poursuite annoncé. Gagner la couverture puis le poste monté. |
| Ligne de bombes | proposé | 108 / 72 / 132 | 1800 | non | Trois trajectoires et impacts numérotés, corridor libre maintenu. Traverser l’intervalle préparé; ne pas suivre la première bombe. |
| Passe de bombardement finale | proposé | 120 / 84 / 156 | 2100 | non | Inclinaison et pattern final annoncés avant le premier largage. Sortir de la bande marquée puis reprendre le tir monté. |

#### Phases et transition de résultat

| Phase du catalogue | Objectif | Consigne de production |
| --- | --- | --- |
| 1 — Poursuite | Gagner le poste de riposte | Atteindre le canon monté sous les passes annoncées. |
| 2 — Riposte | Endommager l’appareil | Suivre le fuselage pendant une fenêtre de tir, sans viser un rotor faible fictif. |
| 3 — Bombardement | Survivre à la passe finale | Combiner sortie de pattern et riposte; chaque difficulté garde un intervalle atteignable. |

**Lecture du prototype :** aucun profil actif, aucune jauge ni aucun seuil de phase intégré pour cette cible. Les durées proposées demandent une future recette de déplacement et de riposte.

**Fin :** Crash hors piste et canal ouvert après résultat; aucun projectile oublié ne peut tuer le joueur pendant la sortie.

#### États et fichiers d’animation à produire

| Relation d’états proposée | Contrat |
| --- | --- |
| entry | approach → hover → bank; rotor et fuselage ne sont pas redimensionnés entre états. |
| attack | gun_track → gun_prepare → gun_fire → climb_recover. |
| bomb | bomb_prepare → bomb_release sur le porteur; chaque bombe suit bomb_fall → bomb_warning → bomb_explode dans un acteur séparé. |
| damage | heavy_hit → damaged_flight; final_pass réutilise un pattern annoncé et borné. |
| terminal | death_fall → distant_impact hors piste; les bombes engagées sont résolues avant confirmation du résultat. |

| État / dossier | Dessins par orientation | Boucle | Finalité |
| --- | --- | --- | --- |
| `approach` | 10 | oui | arrivée entière |
| `hover` | 10 | oui | rotor et stabilité |
| `bank` | 8 | non | inclinaison du fuselage |
| `gun_track` | 6 | oui | visée |
| `gun_prepare` | 5 | non | anticipation |
| `gun_fire` | 6 | oui | rafale |
| `bomb_prepare` | 6 | non | sortie sous fuselage |
| `bomb_release` | 5 | non | détachement de bombe |
| `bomb_fall` | 6 | oui | bombe isolée |
| `bomb_warning` | 5 | oui | alerte de l’objet, hors sprite du porteur |
| `bomb_explode` | 8 | non | FX isolé |
| `climb_recover` | 8 | non | sortie de passe |
| `heavy_hit` | 6 | non | réaction cohérente |
| `damaged_flight` | 10 | oui | vol endommagé |
| `final_pass` | 12 | oui | bombardement annoncé |
| `death_fall` | 14 | non | crash hors piste |
| `distant_impact` | 8 | non | effet après neutralisation |

Budget du profil : **17 clips**, **133 dessins par orientation**. Chaque ligne utilise le chemin de fichiers individuels défini en section 2 ; toutes restent `planned_not_generated` et `runtime_clip_wired: false`.

#### Liste de contrôle de production

- [ ] Conserver rotor principal, fuselage et empennage sans pièces de Gunship.
- [ ] Animer l’attache de bombe avant séparation; compter chaque bombe active.
- [ ] Garantir le corridor de fuite sur tout le pattern, pas seulement sur une frame.
- [ ] Ne pas autoriser le renvoi de bombe sans prise, transfert de propriété et collision dédiés.
- [ ] Le rotor ne devient pas un point faible ou un danger au sol implicite.

## 4. Stages : six plans physiques par lieu

Les trois plans suivants prolongent les entrées de `stages.json`. Ils ne prétendent pas qu’une image master a déjà été découpée. Une composition aplatie fournit un contrôle de perspective ; les six fichiers avec transparence et zones reconstruites derrière les occlusions restent une production distincte. Les références exactes de carte, build, éclairage et caméra restent à renseigner dans le dossier de chaque stage.

Le contrat compétitif conserve une voie plane, aucun danger, aucune variation aléatoire de gameplay et aucune transition pendant la manche. Les accessoires et interactions spectacle ont une activation explicite. Choisir le fond de Nova Prospekt ne fait apparaître ni cargaison vivante ni soldat ; choisir les Canaux ne crée pas un canon utilisable ; choisir Ravenholm ne rend pas sa scie létale.

### Canevas, parallaxe et recomposition

Les six ratios du catalogue sont conservés : 0 ; 0,12 ; 0,30 ; 0,55 ; 1 ; 1,10. Pour la fenêtre de 1 920 dans le monde de 2 560, le déplacement maximal de caméra vaut 640. Le premier plan à 1,10 demande donc 64 pixels logiques de réserve supplémentaire. La proposition de production utilise un canevas commun de **2 688 × 1 080**, avec **64 pixels de marge de chaque côté** et l’origine monde en **(64,0)**. La largeur jouable reste 2 560 ; ces marges ne l’allongent pas.

La position de dessin proposée est `x = −64 − caméra_x × parallaxe`. Le sol reste à y = 880 dans le monde. Les six images partagent dimensions et origine ; seule L00 peut être entièrement opaque. Les portions cachées du fond sont reconstruites pour éviter qu’un mouvement de caméra révèle une découpe vide. Ce choix de canevas est une spécification d’export future, pas une modification d’assets existants.

Les couches futures suivront `assets/resonance/production/stages/{stage_id}/{layer_id}.png`. Chaque fichier devra être contrôlé seul, puis recomposé aux deux limites de caméra, puis avec parallaxe désactivée. Une marge transparente au premier plan est acceptable tant que le fond complet reste couvert et que les repères de lecture ne disparaissent pas sans intention.

### 4.1. Rue de Ravenholm — `STG_14_HL2_RAVENHOLM`

L’intention du catalogue est une rue industrielle nocturne avec une voie continue. Les variations de lumière et les créatures restent derrière l’aire de combat dans le profil compétitif. La présence d’un atelier, d’une scie ou d’un moteur suspendu n’autorise pas à mélanger des architectures de plusieurs lieux sans documentation. Ce décor ne transforme pas une rencontre de Strider, d’APC ou de Gunship en scène officielle de Ravenholm.

Le piège optionnel est une règle originale de spectacle : Interaction près du mécanisme, 90 ticks de préparation, 24 d’activité, 180 de récupération, au maximum deux activations par joueur et par manche. La collision est désactivée par défaut. Le moteur suspendu, le levier et la zone de passage disposent de leurs propres fichiers et événements. Avant activation, il faut démontrer une issue atteignable et empêcher le décor proche de masquer le signal.

| Fichier de couche | Ratio | Contenu du catalogue | Tâche de production |
| --- | --- | --- | --- |
| `L00_ambience.png` | 0 | ciel nocturne | Ciel nocturne continu derrière chaque découpe de toiture; aucun crâne ou motif étranger. |
| `L01_far.png` | 0.12 | silhouettes de toits et cheminée | Relever les silhouettes de toits, cheminées et différences de hauteur du point de vue choisi. |
| `L02_mid.png` | 0.3 | façades lointaines | Reconstruire les façades cachées par la couche proche; conserver un contraste bas. |
| `L03_near.png` | 0.55 | façades proches et atelier | Atelier et façades latérales; fenêtres et portes suivent la même perspective. |
| `L04_ground.png` | 1 | portion de rue plane sans fosse | Rue plane continue; rigoles et pavés restent graphiques, sans trous de collision. |
| `L05_foreground.png` | 1.1 | grillage brisé et débris aux coins | Débris et grillage limités aux coins; ne pas recouvrir pieds, corps ou signaux de piège. |

| Prop conservé | Identifiant | Collision initiale |
| --- | --- | --- |
| lame de scie séparée | `PRP_HL2_RAVENHOLM_01` | aucune par défaut |
| moteur suspendu | `PRP_HL2_RAVENHOLM_02` | aucune par défaut |
| bonbonne | `PRP_HL2_RAVENHOLM_03` | aucune par défaut |
| lampadaire | `PRP_HL2_RAVENHOLM_04` | aucune par défaut |

**Ambiance proposée par le catalogue :** vent entre les tôles, bois qui craque et cloche distante.

**Fin de stage, adaptation Resonance après résultat :** Un mécanisme de fortune rabat une grille et enferme le perdant dans un abri éclairé. Cette séquence est une proposition de mise en scène ; elle ne change pas la collision de la manche terminée.

**Contrôles à réaliser :**

- [ ] Fixer carte, build, point de vue et lumière des captures.
- [ ] Conserver l’échelle du témoin humain et le sol à y=880 logique.
- [ ] Recomposer les six couches et comparer au master retenu.
- [ ] Tester déplacement de caméra aux deux limites et avec parallaxe désactivée.
- [ ] Maintenir un contraste suffisant derrière les silhouettes et télégraphes.
- [ ] Tournoi sans danger ni collision décorative aléatoire; règles spectacle explicitement distinctes.

### 4.2. Cour de Nova Prospekt — `STG_15_HL2_NOVA`

Le contrat vise une cour extérieure : ciel côtier, horizon, miradors, murs de prison et greffes Combine. Une capture de hall intérieur ne remplit pas ce dossier. Les six plans restent à produire à partir d’une référence compatible avec cette cour ; aucun master de Nova Prospekt n’est déclaré livré ou validé par ce chapitre.

Pour les rencontres Dropship et Gunship déjà associées à ce stage, les éléments actifs demeurent dans une surcouche de rencontre : couverture, poste lourd, nacelle, signaux et renforts. Le fond de prison ne porte aucune de leurs jauges. La proposition de débarquement annonce l’aire d’arrivée 72 ticks avant l’événement et conserve un plafond de trois renforts ; elle reste désactivée dans le duel de tournoi. Les fourmilions d’ambiance éventuels restent derrière une séparation lisible.

| Fichier de couche | Ratio | Contenu du catalogue | Tâche de production |
| --- | --- | --- | --- |
| `L00_ambience.png` | 0 | ciel côtier froid | Ciel côtier cohérent, luminosité verrouillée au même état du jeu. |
| `L01_far.png` | 0.12 | tours et horizon | Tours et horizon stables, sans y ajouter la Citadelle par automatisme. |
| `L02_mid.png` | 0.3 | murs de prison et miradors | Maçonnerie, tours et miradors de prison de la référence, distincts des ajouts Combine. |
| `L03_near.png` | 0.55 | barrière et machinerie Combine | Barrières et greffes Combine, réservant les corridors de lecture de nacelle et renforts. |
| `L04_ground.png` | 1 | cour bétonnée continue | Cour bétonnée d’un seul tenant; repères sol compatibles avec pieds et équipements. |
| `L05_foreground.png` | 1.1 | grillage proche hors silhouettes | Grillage très proche hors silhouettes; prévoir variante désactivée pour lisibilité. |

| Prop conservé | Identifiant | Collision initiale |
| --- | --- | --- |
| projecteur de prison | `PRP_HL2_NOVA_01` | aucune par défaut |
| barrière métallique | `PRP_HL2_NOVA_02` | aucune par défaut |
| caisson Combine | `PRP_HL2_NOVA_03` | aucune par défaut |
| porte de cellule | `PRP_HL2_NOVA_04` | aucune par défaut |

**Ambiance proposée par le catalogue :** vent côtier, annonces étouffées et verrouillages métalliques.

**Fin de stage, adaptation Resonance après résultat :** Le perdant est repoussé dans une cellule dont le champ de sûreté se réactive. Cette séquence est une proposition de mise en scène ; elle ne change pas la collision de la manche terminée.

**Contrôles à réaliser :**

- [ ] Fixer carte, build, point de vue et lumière des captures.
- [ ] Conserver l’échelle du témoin humain et le sol à y=880 logique.
- [ ] Recomposer les six couches et comparer au master retenu.
- [ ] Tester déplacement de caméra aux deux limites et avec parallaxe désactivée.
- [ ] Maintenir un contraste suffisant derrière les silhouettes et télégraphes.
- [ ] Tournoi sans danger ni collision décorative aléatoire; règles spectacle explicitement distinctes.

### 4.3. Écluse des canaux — `STG_12_HL2_CANALS`

Le chemin de halage fournit la piste continue ; l’eau, le canal inférieur et l’écluse organisent la profondeur. Les traces d’usure et les surfaces humides ne doivent pas créer une fausse pente de collision. Le pont et l’usine seront relevés dans la même référence de lieu, avec les parties cachées reconstruites lors de la séparation des plans.

La proposition de spectacle associe une vanne et un poste monté, avec 84 ticks de préparation pour l’interaction prévue. La vanne déplace l’eau derrière la piste. Un sol inondable ou une conduite complète d’airboat exigerait un mode distinct, avec ses propres règles. Les rencontres documentaires APC et Hunter Chopper peuvent réutiliser le vocabulaire du décor, mais leur présence n’est pas activée par sa sélection. Les marqueurs de bombe restent lisibles devant les herbes et les tuyaux du premier plan.

| Fichier de couche | Ratio | Contenu du catalogue | Tâche de production |
| --- | --- | --- | --- |
| `L00_ambience.png` | 0 | ciel urbain | Ciel urbain et brume en profondeur; limiter les contrastes sous les trajectoires aériennes. |
| `L01_far.png` | 0.12 | tours et cheminées | Tours et cheminées relevées; aucun bâtiment d’une autre époque ajouté. |
| `L02_mid.png` | 0.3 | pont et usine | Pont et usine cohérents avec l’écluse choisie; arches reconstruites derrière les couches proches. |
| `L03_near.png` | 0.55 | canal inférieur et muret | Eau du canal inférieur et muret; l’eau ne coupe pas la voie de duel. |
| `L04_ground.png` | 1 | chemin de halage plat | Chemin de halage plat; contact du personnage et des postes vérifié sur toute la largeur. |
| `L05_foreground.png` | 1.1 | herbes et tuyaux aux bords | Herbes, tuyaux et pneus aux bords seulement; aucune occultation des marqueurs de bombe. |

| Prop conservé | Identifiant | Collision initiale |
| --- | --- | --- |
| pneu | `PRP_HL2_CANALS_01` | aucune par défaut |
| bidon | `PRP_HL2_CANALS_02` | aucune par défaut |
| vanne d’écluse | `PRP_HL2_CANALS_03` | aucune par défaut |
| panneau usé | `PRP_HL2_CANALS_04` | aucune par défaut |

**Ambiance proposée par le catalogue :** eau, résonance de tunnel et hélicoptère distant.

**Fin de stage, adaptation Resonance après résultat :** Un jet d’eau emporte le perdant vers une plateforme de maintenance visible. Cette séquence est une proposition de mise en scène ; elle ne change pas la collision de la manche terminée.

**Contrôles à réaliser :**

- [ ] Fixer carte, build, point de vue et lumière des captures.
- [ ] Conserver l’échelle du témoin humain et le sol à y=880 logique.
- [ ] Recomposer les six couches et comparer au master retenu.
- [ ] Tester déplacement de caméra aux deux limites et avec parallaxe désactivée.
- [ ] Maintenir un contraste suffisant derrière les silhouettes et télégraphes.
- [ ] Tournoi sans danger ni collision décorative aléatoire; règles spectacle explicitement distinctes.

## 5. Les douze réserves : attribution de jeu et limites

Les douze identifiants ci-dessous existaient déjà à la référence `25b3392`, sans champ `source_game`. Les valeurs proposées sont maintenant intégrées à ce champ avec un lien vers la présente provenance. Aucun identifiant supplémentaire n’est créé. Les autres colonnes décrivent le dossier à compléter : la présence d’un nom de modèle dans un SDK ne constitue pas une image inspectée.

Les sources de code officiel établissent les classes et modèles cités pour Half-Life et Half-Life 2. Le rattachement du Zombine à Episode One combine une attribution de jeu et un dossier technique distincts. Pour Opposing Force, les sources consultées suffisent à l’attribution de la réserve ; elles ne fondent aucun comportement technique nouveau. Les chemins d’entité et de modèle de ces deux cibles restent donc nuls dans la proposition.

| Réserve existante | source_game intégré | Classe / modèle vérifiés ou limite | Provenance |
| --- | --- | --- | --- |
| `civil_protection_hl2` | Half-Life 2 | `npc_metropolice` ; `models/police.mdl` | [RS01] [CB07] |
| `overwatch_soldier_hl2` | Half-Life 2 | `npc_combine_s` ; `models/combine_soldier.mdl` | [RS02] [CB07] |
| `fast_zombie_hl2` | Half-Life 2 | `npc_fastzombie` ; `models/zombie/fast.mdl` | [RS03] [CB07] |
| `poison_zombie_hl2` | Half-Life 2 | `npc_poisonzombie` ; `models/zombie/poison.mdl` | [RS04] [CB07] |
| `zombine_ep1` | Half-Life 2: Episode One | `npc_zombine` ; `models/zombie/zombie_soldier.mdl` | [RS05] [RS11] [CB08] |
| `bullsquid_hl1` | Half-Life | `monster_bullchicken` ; `models/bullsquid.mdl` | [RS07] |
| `houndeye_hl1` | Half-Life | `monster_houndeye` ; `models/houndeye.mdl` | [RS08] |
| `shock_trooper_op4` | Half-Life: Opposing Force | Modèle et classe à relever ; aucun chemin déclaré vérifié | [RS12] [RS14] |
| `alien_controller_hl1` | Half-Life | `monster_alien_controller` ; `models/controller.mdl` | [RS09] |
| `headcrab_hl1` | Half-Life | `monster_headcrab` ; `models/headcrab.mdl` | [RS10] |
| `gonome_op4` | Half-Life: Opposing Force | Modèle et classe à relever ; aucun chemin déclaré vérifié | [RS13] [RS14] |
| `antlion_hl2` | Half-Life 2 | `npc_antlion` ; `models/antlion.mdl` | [RS06] [CB07] |

**Niveau de preuve particulier.** La page de capture du Shock Trooper identifie Opposing Force et une carte source ; ce n’est pas un SDK technique officiel. La page Gonome n’a pas été entièrement récupérée : seule l’attribution de jeu de l’extrait indexé a été retenue, et cette limite est inscrite dans la source RS13. Le code de mods ou de réimplémentations communautaires n’a pas été présenté comme celui de Valve. Les pages Steam officielles établissent l’existence et le contexte des jeux concernés, pas les dimensions des monstres. [RS12] [RS13] [RS14] [CB08]

Pour une production fidèle, chaque réserve conserve sa version de référence et ses exclusions :

| Réserve | Version proposée | Contrôle d’identité |
| --- | --- | --- |
| Civil Protection | Source, modèle retail de Civil Protection | Séparer Civil Protection, garde Overwatch et costume infiltré de Barney. |
| Overwatch Soldier | Source, soldat Overwatch standard | Exclure Élite, shotgun et Nova Prospekt de la pose standard. |
| Fast Zombie | Source, Fast Zombie corps entier | Torse séparé et modèle des épisodes ne remplacent pas la référence entière. |
| Poison Zombie | Source, Poison Zombie | Le headcrab noir porté doit avoir son propre suivi lorsque détaché. |
| Zombine | Source, apparition Episode One retenue | Conserver la grenade comme état/objet dédié; pas de variante fast ou poison inventée. |
| Bullsquid | GoldSrc, modèle original; HD et remake séparés | Ne pas importer le modèle Black Mesa dans la cible HL1. |
| Houndeye | GoldSrc, modèle original; HD et remake séparés | Conserver le gabarit et les appuis du modèle source; ne pas lui donner un squelette canin générique. |
| Shock Trooper | GoldSrc, campagne Opposing Force | Source de capture identifiée; modèle exact et géométrie à relever. Aucun code communautaire présenté comme SDK officiel. |
| Alien Controller | GoldSrc, Alien Controller original | Position aérienne et boules d’énergie relèvent de fichiers distincts; aucune fusion avec Advisor. |
| Headcrab | GoldSrc, Headcrab standard original | Ni baby_headcrab, ni headcrab rapide/poison de HL2. |
| Gonome | GoldSrc, campagne Opposing Force | Attribution du jeu documentée par l’extrait consulté; référence de modèle et source technique restent à acquérir. |
| Fourmilion standard | Source, Fourmilion standard | Séparer worker, guard et variantes des épisodes. |

Les éventuelles images réalisées ailleurs dans le lot D se consultent dans leur registre graphique. Le statut `capture_required` de ces propositions concerne le dossier de références décrit ici ; il n’efface ni ne certifie les fichiers graphiques d’un autre sous-lot. Le contrôle d’intégration a comparé seulement les douze valeurs `source_game` au roster, sans écrire dans celui-ci.

## 6. Points ouverts avant intégration de la conception

### Orbes AR2 : garder la règle actuelle et sa provenance distinctes

Le prototype autorise `energy_orb` sur le Strider, le Gunship et la nacelle du Dropship. Le Strider possède un traitement explicite dans le SDK consulté. Pour Gunship et nacelle, les chemins lus ne démontrent pas cette équivalence ; les filtres de dégâts et de dissolution demandent une vérification de scène et de version. Le chapitre conserve donc ce comportement comme **adaptation actuelle à revoir**, sans le transformer en faiblesse canonique et sans modifier le moteur. Une décision ultérieure devra soit apporter une preuve retail précise, soit changer séparément la règle et ses contrôles. [CB01] [CB02] [CB03] [CB06]

### Autres contrôles ouverts

| Point | Cibles | Décision requise |
| --- | --- | --- |
| CB_REVIEW_02 | gunship_hl2 | Ne pas ajouter ces modes à la cible Gunship retail choisie sans référence de scène/version. |
| CB_REVIEW_03 | dropship_hl2 | Dédupliquer par identifiant de projectile/explosion et réservoir de santé; ne compter qu’une application sur cargo. |
| CB_REVIEW_04 | strider_hl2, dropship_hl2, gunship_hl2, apc_hl2, hunter_chopper_hl2 | Remplir les mesures du profil de référence avant d’annoncer 1:1. |

### Recettes futures, distinctes de la vérification documentaire

Les seize scénarios suivants sont préparés pour l’intégration. Ils ne sont pas déclarés exécutés. Ils visent les risques concrets du changement : faux points faibles, double application de dégâts, interruption, obstacles de caméra, absence de sortie et résultat contradictoire. Aucun test artificiel reproduisant le JSON n’est ajouté au dépôt.

| Scénario | Critère à démontrer |
| --- | --- |
| CB_TEST_COLLISION_HEAVY | Vérifier bullets/melee puis RPG sur chaque zone; aucun contact normal ne crée une faiblesse de genou, moteur, roue ou rotor. |
| CB_TEST_DROPSHIP_BODY | Frappes sur porteur: zéro perte de vie du porteur, aucun état de mort, aucun compteur Dropship abattu. |
| CB_TEST_DROPSHIP_CARGO | Une explosion chevauchant porteur et nacelle ne retire qu’une dose à cargo. |
| CB_TEST_DROPSHIP_VICTORY | Cargaison nulle avec renfort vivant: pas de victoire; retrait achevé et renforts nuls: interception réussie. |
| CB_TEST_GUNSHIP_INTERCEPT | Roquette avant, pendant et après la fenêtre: signal et issue cohérents, aucune interception invisible hors fenêtre prévue. |
| CB_TEST_STRIDER_LEGS | Lire une boucle complète dans les deux orientations: trois pattes, appuis stables, aucune quatrième patte de transition. |
| CB_TEST_STATION_ACCESS | Chaque profil autorisé peut atteindre réserve et arme lourde sans posséder personnellement l’équipement. |
| CB_TEST_APC_PHASE | Les salves ont un ordre figé et une sortie atteignable; dernière attaque terminée avant résultat. |
| CB_TEST_CHOPPER_PATTERN | Pour chaque vitesse de profil et difficulté, vérifier le corridor libre sur toute la suite de bombes. |
| CB_TEST_CHOPPER_OWNERSHIP | Bombe propre non récupérée et bombe reprise ont un propriétaire distinct; aucune réflexion gratuite activée par simple collision. |
| CB_TEST_PAUSE_EVENTS | Pause à la frame précédant fire/contact/spawn: reprise ne duplique ni projectile, ni soldat, ni dégâts. |
| CB_TEST_RESULT_CLEANUP | Après victoire, aucun événement hostile différé ne modifie HP ou résultat. |
| CB_TEST_STAGE_CANVAS | Six couches partagent dimensions/origine; limites caméra sans trous ni décalage du sol. |
| CB_TEST_STAGE_TOURNAMENT | Les trois fonds n’activent ni piège, ni nacelle, ni canon par leur seule sélection en tournoi. |
| CB_TEST_ACCESSIBILITY | Télégraphes reconnus sans couleur et avec réduction de flashs; réduire FX ne change jamais collisions ni durées. |
| CB_TEST_PRODUCTION_ACCOUNTING | Une pose reste une pose; un master reste un master; budget de dessins et fichiers générés ne sont jamais additionnés. |

### Conditions de passage en production validée

- [ ] **CB_GATE_REF :** Référence de modèle/build, vues opposées, armes et mesure d’échelle enregistrées.
- [ ] **CB_GATE_VISUAL :** Frames individuelles inspectées, proportions et détails comparés aux captures.
- [ ] **CB_GATE_MOTION :** Pivots, appuis, transitions, événements et FX synchronisés.
- [ ] **CB_GATE_COLLISION :** Zones liées au réservoir approprié; aucun faux point faible; explosion dédupliquée.
- [ ] **CB_GATE_PLAY :** Recettes de contre-jeu, accès à l’arsenal et nettoyage du résultat exécutées.

Ces conditions restent toutes en attente. La validation statique du présent lot porte sur les données et leur cohérence avec le catalogue ; elle ne prétend pas remplacer une comparaison de pixels, une lecture de boucle d’animation ou une session de jeu.

## 7. Sources consultées et traçabilité

Les codes CB désignent les références des machines et du contexte Half-Life 2 ; les codes RS désignent les preuves d’attribution des réserves. Les liens de code sont fixés par commit. Les empreintes complètes, méthodes de lecture, symboles et limites de chaque source figurent dans le JSON associé. Les contenus d’architecture et les noms de phase sont repris des catalogues internes cités en section 1 ; les nombres de design de ce chapitre sont des valeurs Resonance.

| Source | Document | Nature et limite |
| --- | --- | --- |
| CB01 | [Valve — npc_strider.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_strider.cpp) | primary_official_source_code — Dégâts filtrés, traitement explicite des orbes, canon et attaches BigGun/MiniGun. La branche de dégâts ordinaires sous #if 0 est inactive. |
| CB02 | [Valve — npc_combinedropship.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_combinedropship.cpp) | primary_official_source_code — Porteur et nacelle distincts; transmission de dégâts sans mort du porteur; filtrage nacelle BLAST/AIRBOAT; déduplication d’une même explosion; attaches de canon sur la nacelle. |
| CB03 | [Valve — npc_combinegunship.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_combinegunship.cpp) | primary_official_source_code — Filtrage des balles, seuil explosif, interception de missiles et flags anti-dissolution. Des variantes de modèle/ground attack existent dans le SDK sans prouver leur usage dans la scène retail choisie. |
| CB04 | [Valve — vehicle_apc.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/vehicle_apc.cpp) | primary_official_source_code — Dégâts BLAST/AIRBOAT, canon et missiles séparés; le code de salve de mort ne vaut pas autorisation de poursuivre les collisions après résultat dans Resonance. |
| CB05 | [Valve — npc_attackchopper.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_attackchopper.cpp) | primary_official_source_code — Canon d’airboat et missiles; filtres de propriété des bombes et état indestructible; modèles du fuselage et des bombes. |
| CB06 | [Valve — prop_combine_ball.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/prop_combine_ball.cpp) | primary_official_source_code — Distinction entre contact de balle Combine, dissolution et cas Strider. Un tag energy_orb du prototype ne constitue pas une preuve d’équivalence avec tous les chemins SDK. |
| RS01 | [Valve — npc_metropolice.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_metropolice.cpp) | primary_official_source_code — Entité Civil Protection et référence models/police.mdl. |
| RS02 | [Valve — npc_combines.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_combines.cpp) | primary_official_source_code — Entité soldat Overwatch et modèles de soldat; séparer variante standard, Élite et Nova Prospekt. |
| RS03 | [Valve — npc_fastzombie.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_fastzombie.cpp) | primary_official_source_code — Entité Fast Zombie, modèle de corps entier distinct du torse. |
| RS04 | [Valve — npc_PoisonZombie.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_PoisonZombie.cpp) | primary_official_source_code — Entité Poison Zombie et modèle poison.mdl. |
| RS05 | [Valve — npc_zombine.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_zombine.cpp) | primary_official_source_code — Entité Zombine et modèle zombie_soldier.mdl; l’attribution Episode One est recoupée par RS11. |
| RS06 | [Valve — npc_antlion.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_antlion.cpp) | primary_official_source_code — Fourmilion standard et distinction du modèle worker. |
| RS07 | [Valve — bullsquid.cpp](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/bullsquid.cpp) | primary_official_source_code — Identité de l’entité et modèle dans le SDK Half-Life GoldSrc; ne constitue pas une référence au remake Black Mesa ou à une version HD. |
| RS08 | [Valve — houndeye.cpp](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/houndeye.cpp) | primary_official_source_code — Identité de l’entité et modèle dans le SDK Half-Life GoldSrc; ne constitue pas une référence au remake Black Mesa ou à une version HD. |
| RS09 | [Valve — controller.cpp](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/controller.cpp) | primary_official_source_code — Identité de l’entité et modèle dans le SDK Half-Life GoldSrc; ne constitue pas une référence au remake Black Mesa ou à une version HD. |
| RS10 | [Valve — headcrab.cpp](https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/headcrab.cpp) | primary_official_source_code — Identité de l’entité et modèle dans le SDK Half-Life GoldSrc; ne constitue pas une référence au remake Black Mesa ou à une version HD. |
| RS11 | [Combine OverWiki — Zombine](https://www.combineoverwiki.net/wiki/Zombine) | secondary_reference — Attribution de la première rencontre à Episode One, chapitre Lowlife; aucune extrapolation sur les états mentaux de l’hôte. |
| RS12 | [Combine OverWiki — capture Shock Trooper of1a5b](https://combineoverwiki.net/wiki/File:Of1a5b_trooper.jpg) | secondary_documented_game_capture — Métadonnées de capture: Shock Trooper, carte of1a5b, Half-Life: Opposing Force. La capture complète reste à examiner pour production visuelle. |
| RS13 | [Combine OverWiki — Gonome](https://www.combineoverwiki.net/wiki/Gonome) | secondary_reference_search_excerpt — Extrait indexé consulté identifie le Gonome à Opposing Force. Page complète indisponible pendant cette lecture; aucun comportement technique déduit de cette source. |
| RS14 | [Valve / Gearbox — Half-Life: Opposing Force sur Steam](https://store.steampowered.com/app/50/HalfLife_Opposing_Force/) | primary_official_product — Identité du jeu et attribution Gearbox/Valve; la page produit ne constitue pas un catalogue détaillé des monstres. |
| CB07 | [Valve — Half-Life 2, 20e anniversaire](https://www.half-life.com/en/halflife2/20th) | primary_official_product — Version anniversaire, choix visuels et contenu retail. Chaque capture doit enregistrer le build et les options; une archive E3 ne remplace pas la référence retail. |
| CB08 | [Valve — Half-Life 2: Episode One sur Steam](https://store.steampowered.com/app/380/HalfLife_2_Episode_One/) | primary_official_product — Épisode officiel distinct; ne suffit pas à identifier seul un modèle d’ennemi. |

## 8. Vérification documentaire du livrable

Le contrôle compare les cinq identifiants de machine, leurs trois phases et leurs statuts au catalogue existant ; les trois stages à leurs six couches et ratios d’origine ; les douze réserves au roster et à leurs valeurs `source_game` intégrées séparément. Il vérifie aussi les liens de sources, les empreintes des fichiers consultés, l’unicité des identifiants de clips, les bornes des volumes normalisés, la cohérence des durées et les compteurs de production.

Le transporteur Dropship conserve son immunité et aucun clip de mort du porteur. Les armes et appendices ne reçoivent aucune faiblesse indépendante. Les exports de stage restent des chemins prévus, les 77 clips restent non produits, les mesures restent non renseignées et APC/Hunter Chopper restent hors du moteur. Les scénarios de jeu et les contrôles visuels attendent des assets et une intégration concrète.

Résultat détaillé de la vérification statique : voir `document_validation` dans le JSON. Le périmètre de ce document reste strictement la conception et la provenance ; il n’annonce ni nouvelle image, ni nouveau boss actif, ni validation 1:1.

[CB01]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_strider.cpp

[CB02]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_combinedropship.cpp

[CB03]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_combinegunship.cpp

[CB04]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/vehicle_apc.cpp

[CB05]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_attackchopper.cpp

[CB06]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/prop_combine_ball.cpp

[RS01]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_metropolice.cpp

[RS02]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_combines.cpp

[RS03]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_fastzombie.cpp

[RS04]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_PoisonZombie.cpp

[RS05]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_zombine.cpp

[RS06]: https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_antlion.cpp

[RS07]: https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/bullsquid.cpp

[RS08]: https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/houndeye.cpp

[RS09]: https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/controller.cpp

[RS10]: https://github.com/ValveSoftware/halflife/blob/b1b5cf5892918535619b2937bb927e46cb097ba1/dlls/headcrab.cpp

[RS11]: https://www.combineoverwiki.net/wiki/Zombine

[RS12]: https://combineoverwiki.net/wiki/File:Of1a5b_trooper.jpg

[RS13]: https://www.combineoverwiki.net/wiki/Gonome

[RS14]: https://store.steampowered.com/app/50/HalfLife_Opposing_Force/

[CB07]: https://www.half-life.com/en/halflife2/20th

[CB08]: https://store.steampowered.com/app/380/HalfLife_2_Episode_One/
